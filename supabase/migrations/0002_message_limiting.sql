-- Add columns to users table for message tracking
alter table public.users
add column if not exists daily_message_count integer default 0,
add column if not exists last_message_date date default current_date;

-- Function to check and update message count before inserting a new message
create or replace function public.check_daily_message_limit()
returns trigger as $$
declare
  chat_user_id uuid;
  user_message_count integer;
  user_last_message_date date;
begin
  -- Get the user_id from the chats table linked to the new message's chat_id
  select user_id into chat_user_id from public.chats where id = new.chat_id;

  -- We only want to count user messages, not assistant responses.
  if new.role = 'user' then
    -- Get current message count and last message date for the user
    select daily_message_count, last_message_date into user_message_count, user_last_message_date
    from public.users where id = chat_user_id;

    -- Check if it's a new day
    if user_last_message_date is null or user_last_message_date < current_date then
      -- Reset count for the new day
      update public.users
      set daily_message_count = 1, last_message_date = current_date
      where id = chat_user_id;
    else
      -- It's the same day, check the limit
      if user_message_count >= 10 then
        raise exception 'Daily message limit exceeded. You can send up to 10 messages per day.';
      end if;

      -- Increment the message count
      update public.users
      set daily_message_count = daily_message_count + 1
      where id = chat_user_id;
    end if;
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function before a message is inserted
create trigger on_before_message_insert
  before insert on public.messages
  for each row execute procedure public.check_daily_message_limit(); 