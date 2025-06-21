import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { chatUuid, message, role, title } = await req.json();
    const userId = session.user.id;

    if (!chatUuid || !message || !role) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Check if chat exists, if not create it
    let { data: chat, error: chatFetchError } = await supabase
      .from('chats')
      .select('id, chat_uuid')
      .eq('chat_uuid', chatUuid)
      .eq('user_id', userId)
      .single();

    let chatId: number;

    if (chatFetchError || !chat) {
      // Create new chat
      const { data: newChat, error: chatCreateError } = await supabase
        .from('chats')
        .insert({
          user_id: userId,
          title: title || 'New Chat',
          chat_uuid: chatUuid
        })
        .select('id, chat_uuid')
        .single();

      if (chatCreateError) {
        console.error('Error creating chat:', chatCreateError);
        return new Response("Error creating chat", { status: 500 });
      }

      chatId = newChat.id;
      
      // Update user's current chat UUID
      await supabase
        .from('users')
        .update({ current_chat_uuid: chatUuid })
        .eq('id', userId);
    } else {
      chatId = chat.id;
    }

    // Save the message
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        content: message,
        role: role
      });

    if (messageError) {
      console.error('Error saving message:', messageError);
      return new Response("Error saving message", { status: 500 });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      chatId: chatId,
      chatUuid: chatUuid 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in save-message API:', error);
    return new Response("Internal server error", { status: 500 });
  }
} 