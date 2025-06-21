import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { allowedEvents } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const stripe = getStripeClient();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Check if this is an event type we want to handle
  if (!allowedEvents.includes(event.type as any)) {
    return NextResponse.json(
      { received: true, message: `Skipping unhandled event type: ${event.type}` }
    );
  }

  try {
    // For now, just log the events
    // TODO: Implement Supabase integration for subscription management
    console.log(`Stripe webhook received: ${event.type}`, event.data.object);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 