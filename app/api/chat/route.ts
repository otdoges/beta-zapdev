import { streamOpenRouterResponse, getMultiModelResponses, getTokenUsageStats } from '@/lib/openrouter';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

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

    // For now, we'll just handle the AI chat without storing messages
    // This allows the app to function while the database migration is in progress
    let finalChatId = chatId || `chat_${Date.now()}`;

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