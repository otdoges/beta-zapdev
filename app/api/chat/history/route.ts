import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const chatUuid = searchParams.get('chatUuid');

    if (chatUuid) {
      // Get specific chat with its messages
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .select(`
          id,
          chat_uuid,
          title,
          created_at,
          updated_at,
          messages (
            id,
            content,
            role,
            created_at
          )
        `)
        .eq('chat_uuid', chatUuid)
        .eq('user_id', userId)
        .single();

      if (chatError) {
        console.error('Error fetching chat:', chatError);
        return new Response("Chat not found", { status: 404 });
      }

      return new Response(JSON.stringify(chat), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Get all chats for the user (without messages)
      const { data: chats, error: chatsError } = await supabase
        .from('chats')
        .select('id, chat_uuid, title, created_at, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (chatsError) {
        console.error('Error fetching chats:', chatsError);
        return new Response("Error fetching chats", { status: 500 });
      }

      return new Response(JSON.stringify({ chats }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error in chat history API:', error);
    return new Response("Internal server error", { status: 500 });
  }
} 