# Video Player with Stripe Membership Integration

## Features

- **1-minute free viewing limit** for non-members
- **Unlimited access** for paid members
- **Stripe payment integration** for one-time membership purchase
- **Cookie-based authentication** (no login required)
- **Membership reset functionality** via URL parameter

## Setup Instructions

### 1. Install Dependencies

```bash
npm install stripe
```

### 2. Stripe Configuration

1. **Create a Stripe account** at https://stripe.com
2. **Get your API keys** from https://dashboard.stripe.com/apikeys
3. **Create a product and price** in your Stripe Dashboard:
   - Go to Products → Add Product
   - Set name: "Video Membership"
   - Set price: $4.99 (one-time payment)
   - Copy the Price ID (starts with `price_`)

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Stripe credentials:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_PRICE_ID=price_your_price_id_here
   ```

### 4. Update Stripe Keys in Code

Update the Stripe publishable key in `/src/pages/video.astro`:

```javascript
// Find these lines and replace with your actual keys:
const stripe = (window as any).Stripe('pk_test_your_stripe_key_here');
```

Also update the price ID in the API call:
```javascript
priceId: 'price_your_price_id_here',
```

## How It Works

### For Free Users:
1. Videos play for 1 minute, then show upgrade prompt
2. Upgrade button redirects to Stripe checkout
3. After payment, user returns with membership token
4. Token is stored in secure cookie for 1 year

### For Members:
1. Timer is automatically bypassed
2. Unlimited video access
3. Membership status shown in top-right corner

## URLs

- **Main video page**: `/video`
- **Membership activation**: `/video?membership={CHECKOUT_SESSION_ID}` (automatic from Stripe)
- **Reset membership**: `/video?reset_membership=true`

## Security Features

- **Secure cookies**: HttpOnly, SameSite=Strict
- **Token expiration**: 1-year automatic expiry
- **URL cleanup**: Membership tokens removed from URL after activation
- **No personal data stored**: Only anonymous membership token

## Customization

### Change Time Limit
Edit `PLAYBACK_LIMIT_MS` in `/src/pages/video.astro`:
```javascript
const PLAYBACK_LIMIT_MS = 60000; // 1 minute in milliseconds
```

### Change Price
Update your Stripe product price and replace the price ID in the code.

### Styling
Modify the CSS in the `<style>` section of `/src/pages/video.astro`.

## Testing

1. **Test with Stripe Test Mode** (keys starting with `pk_test_` and `sk_test_`)
2. **Use test card numbers** from https://stripe.com/docs/testing
3. **Test membership reset** by visiting `/video?reset_membership=true`

## Production Deployment

1. **Switch to live Stripe keys** (remove `_test` from keys)
2. **Update webhook endpoints** if using Stripe webhooks
3. **Test payment flow** with real card details
4. **Monitor Stripe Dashboard** for payments

## Support

For issues with:
- **Stripe integration**: Check Stripe Dashboard logs
- **Cookie issues**: Clear browser cookies and test
- **Payment failures**: Check Stripe webhook logs
