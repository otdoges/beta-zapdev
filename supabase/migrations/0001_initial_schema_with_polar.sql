-- Create a table for public profiles
create table users (
  id uuid not null references auth.users on delete cascade,
  name text,
  avatar_url text,
  -- Polar fields
  polar_customer_id text,
  polar_subscription_id text,
  polar_subscription_status text,
  polar_current_period_end timestamp with time zone,
  polar_price_id text,
  
  primary key (id)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table users
  enable row level security;

create policy "Public profiles are viewable by everyone." on users
  for select using (true);

create policy "Users can insert their own profile." on users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on users
  for update using (auth.uid() = id);

-- Create a table for chats
create table chats (
  id bigserial primary key,
  user_id uuid not null references public.users on delete cascade,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS to chats table
alter table chats
  enable row level security;

create policy "Users can view their own chats." on chats
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chats." on chats
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own chats." on chats
  for update using (auth.uid() = user_id);

create policy "Users can delete their own chats." on chats
  for delete using (auth.uid() = user_id);

-- Create a table for messages
create table messages (
  id bigserial primary key,
  chat_id bigint not null references public.chats on delete cascade,
  content text not null,
  role text not null check (role in ('user', 'assistant')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS to messages table
alter table messages
  enable row level security;

create policy "Users can view messages in their own chats." on messages
  for select using (exists (
    select 1
    from chats
    where chats.id = messages.chat_id and chats.user_id = auth.uid()
  ));

create policy "Users can insert messages in their own chats." on messages
  for insert with check (exists (
    select 1
    from chats
    where chats.id = messages.chat_id and chats.user_id = auth.uid()
  ));

create policy "Users can update messages in their own chats." on messages
  for update using (exists (
    select 1
    from chats
    where chats.id = messages.chat_id and chats.user_id = auth.uid()
  ));

create policy "Users can delete messages in their own chats." on messages
  for delete using (exists (
    select 1
    from chats
    where chats.id = messages.chat_id and chats.user_id = auth.uid()
  ));


-- This trigger automatically updates the updated_at column on chats table
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger on_chat_updated
  before update on chats
  for each row
  execute procedure handle_updated_at();

-- Function to automatically create a user profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function when a new user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 