import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { priceId } = await request.json();
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(request.url).origin}/video?membership={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/video`,
      metadata: {
        type: 'video_membership',
      },
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
