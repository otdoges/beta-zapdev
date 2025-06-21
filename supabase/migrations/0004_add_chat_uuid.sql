-- Add UUID field to chats table for external chat references
alter table public.chats 
add column if not exists chat_uuid uuid default gen_random_uuid() unique;

-- Create index for chat_uuid
create index if not exists idx_chats_chat_uuid on public.chats(chat_uuid);

-- Add column to users table to track their active/current chat
alter table public.users
add column if not exists current_chat_uuid uuid references public.chats(chat_uuid) on delete set null;

-- Create index for user's current chat
create index if not exists idx_users_current_chat_uuid on public.users(current_chat_uuid); 