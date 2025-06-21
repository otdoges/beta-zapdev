import { streamOpenRouterResponse, getMultiModelResponses, getTokenUsageStats } from '@/lib/openrouter';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

// Helper function to save messages to database
async function saveMessageToDatabase(supabase: any, userId: string, chatUuid: string, message: string, role: string, title?: string) {
  try {
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
        return;
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
    await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        content: message,
        role: role
      });

  } catch (error) {
    console.error('Error saving message to database:', error);
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages, modelId, chatId, useMultipleModels = false } = await req.json();
    const userId = session.user.id;

    // Check token usage before proceeding
    const tokenStats = getTokenUsageStats();
    if (tokenStats.percentage > 95) {
      return new Response(
        JSON.stringify({ 
          error: 'Token limit reached. Please try again later.', 
          usage: tokenStats 
        }), 
        { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate a UUID for the chat if not provided
    let finalChatId = chatId || uuidv4();

    // Save the user's message to the database
    const userMessage = messages[messages.length - 1]; // Get the latest user message
    if (userMessage && userMessage.role === 'user') {
      await saveMessageToDatabase(supabase, userId, finalChatId, userMessage.content, 'user');
    }

    // Use multiple models if requested
    if (useMultipleModels) {
      try {
        const multiModelResponses = await getMultiModelResponses({
          chatHistory: messages,
          primaryModelId: modelId,
          maxTokens: 1024
        });

        // Get the best response (first successful one)
        const bestResponse = multiModelResponses.find(r => r.success);
        if (bestResponse && bestResponse.response) {
          // Save assistant's response to database
          await saveMessageToDatabase(supabase, userId, finalChatId, bestResponse.response, 'assistant');
          
          return new Response(
            JSON.stringify({
              response: bestResponse.response,
              modelUsed: bestResponse.modelName,
              chatId: finalChatId,
              tokenUsage: getTokenUsageStats(),
              alternatives: multiModelResponses.filter(r => r.success && r !== bestResponse)
            }),
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );
        } else {
          throw new Error('All models failed to generate response');
        }
      } catch (error) {
        console.error('Multi-model generation failed, falling back to single model:', error);
        // Fall back to single model
      }
    }

    // Single model streaming response
    const result = await streamOpenRouterResponse({
      chatHistory: messages,
      modelId,
      maxTokens: 1024
    });

    // Get the stream response
    const streamResponse = result.toDataStreamResponse();
    
    // Add chat ID to response headers if available
    const headers = new Headers(streamResponse.headers);
    if (finalChatId) {
      headers.set('X-Chat-ID', finalChatId.toString());
    }
    
    // Add thinking indicator headers for real-time display
    headers.set('X-Thinking', 'true');
    headers.set('X-Model', modelId || 'auto');

    // For streaming responses, we'll need to save the assistant's response
    // when the stream completes. We'll pass the necessary data in headers
    // so the client can call the save-message endpoint when done.
    headers.set('X-Save-Response', 'true');
    headers.set('X-User-ID', userId);
    headers.set('X-Chat-UUID', finalChatId);

    return new Response(streamResponse.body, {
      headers,
      status: streamResponse.status
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ error: 'An unknown error occurred' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 