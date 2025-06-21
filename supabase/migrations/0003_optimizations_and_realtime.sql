-- Add indexes for performance optimization
create index if not exists idx_users_polar_customer_id on public.users(polar_customer_id);
create index if not exists idx_users_polar_subscription_id on public.users(polar_subscription_id);
create index if not exists idx_chats_user_id on public.chats(user_id);
create index if not exists idx_messages_chat_id on public.messages(chat_id);

-- Add tables to the realtime publication
alter publication supabase_realtime add table public.chats, public.messages; 