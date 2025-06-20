# Polar Payment Integration with BetterAuth - Setup Guide

## Overview

This document describes the complete integration of Polar payments with BetterAuth in your ZapDev application. Polar provides a modern, developer-friendly payment system with built-in support for subscriptions, usage-based billing, and customer management.

## ✅ **What's Been Implemented**

### 1. **Package Installation**
- ✅ Installed `@polar-sh/better-auth` - BetterAuth plugin for Polar
- ✅ Installed `@polar-sh/sdk` - Core Polar SDK
- ✅ Installed `@polar-sh/nextjs` - Next.js utilities
- ✅ Updated `zod` for validation

### 2. **Environment Configuration**
Added the following variables to `.env.local`:
```bash
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
SUCCESS_URL=http://localhost:3000/success
```

### 3. **Authentication Integration**
- ✅ Updated `lib/auth.ts` with Polar plugin configuration
- ✅ Added checkout, portal, usage, and webhooks plugins
- ✅ Configured automatic customer creation on signup
- ✅ Updated `lib/auth-client.ts` with Polar client

### 4. **New Components**
- ✅ `components/pricing-plans.tsx` - Complete pricing interface
- ✅ `components/customer-portal.tsx` - Subscription management
- ✅ `app/success/page.tsx` - Enhanced checkout success page
- ✅ `app/pricing/page.tsx` - Updated pricing page

### 5. **API Routes**
- ✅ `app/api/polar/webhooks/route.ts` - Webhook handling (auto-configured by BetterAuth)

## 🚀 **Setup Instructions**

### Step 1: Polar Account Setup

1. **Create a Polar Account**
   - Go to [polar.sh](https://polar.sh)
   - Sign up and create your organization
   - Choose "Sandbox" for testing (recommended to start)

2. **Create Products**
   In your Polar dashboard, create products with these IDs:
   - `zapdev-pro-monthly` - Monthly Pro subscription
   - `zapdev-pro-yearly` - Yearly Pro subscription  
   - `zapdev-enterprise` - Enterprise plan

3. **Get API Keys**
   - Go to Organization Settings → API
   - Create an "Organization Access Token"
   - Copy the token for your environment

### Step 2: Environment Variables

Update your `.env.local` file:

```bash
# Polar Configuration
POLAR_ACCESS_TOKEN=polar_at_xxxxxxxxxxxxxxxxxxxxx
POLAR_WEBHOOK_SECRET=polar_wh_xxxxxxxxxxxxxxxxxxxxx

# Success URL (update for production)
SUCCESS_URL=http://localhost:3000/success

# Existing variables...
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

### Step 3: Webhook Configuration

1. **In Polar Dashboard**:
   - Go to Organization Settings → Webhooks
   - Add new webhook endpoint: `https://your-domain.com/api/auth/polar/webhooks`
   - For local development: `http://localhost:3000/api/auth/polar/webhooks`
   - Copy the webhook secret

2. **Events to Subscribe**:
   - `customer.created`
   - `customer.updated`
   - `order.paid`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.active`
   - `subscription.canceled`

### Step 4: Update Product IDs

In `lib/auth.ts`, update the product IDs to match your Polar products:

```typescript
products: [
  {
    productId: "your-actual-product-id-1", // Replace with real Polar product ID
    slug: "pro-monthly"
  },
  {
    productId: "your-actual-product-id-2", 
    slug: "pro-yearly"
  },
  {
    productId: "your-actual-product-id-3",
    slug: "enterprise"
  }
],
```

## 🛠 **Available Features**

### Checkout Integration
```typescript
// Trigger checkout programmatically
await authClient.checkout({
  slug: "pro-monthly", // or product ID
})

// Or with product ID directly
await authClient.checkout({
  products: ["prod_xxxxxxxxxx"],
})
```

### Customer Portal
```typescript
// Open customer portal for subscription management
await authClient.customer.portal()

// Get customer state
const { data: customerState } = await authClient.customer.state()
```

### Usage-Based Billing
```typescript
// Ingest usage events
await authClient.usage.ingest({
  event: "api-calls",
  metadata: { count: 1 }
})

// Get customer meters
const { data: meters } = await authClient.usage.meters.list()
```

### Subscription Management
```typescript
// List customer subscriptions
const { data: subscriptions } = await authClient.customer.subscriptions.list({
  query: { active: true }
})

// List orders
const { data: orders } = await authClient.customer.orders.list()

// List benefits
const { data: benefits } = await authClient.customer.benefits.list()
```

## 📱 **UI Components**

### Pricing Plans
The `PricingPlans` component provides:
- Beautiful pricing cards with animations
- Automatic checkout integration
- Authentication requirement enforcement
- Loading states and error handling

### Customer Portal
The `CustomerPortal` component includes:
- Subscription overview
- Order history
- Active benefits display
- Usage metrics
- Direct portal access

## 🔧 **Customization**

### Styling
All components use Tailwind CSS with:
- Dark theme with purple/violet gradients
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design

### Webhook Handlers
Add custom logic in `lib/auth.ts`:

```typescript
webhooks({
  secret: process.env.POLAR_WEBHOOK_SECRET,
  onOrderPaid: (payload) => {
    // Custom logic for successful payments
    console.log('Order paid:', payload)
  },
  onSubscriptionActive: (payload) => {
    // Handle active subscriptions
    console.log('Subscription active:', payload)
  },
  // ... other handlers
})
```

## 🚀 **Production Deployment**

### Environment Setup
1. **Switch to Production**:
   ```typescript
   server: 'production' // in lib/auth.ts
   ```

2. **Update URLs**:
   ```bash
   BETTER_AUTH_URL=https://yourdomain.com
   SUCCESS_URL=https://yourdomain.com/success
   ```

3. **Create Production Products** in Polar dashboard

### Security
- Use production webhook secrets
- Validate all environment variables
- Set up proper error monitoring
- Test webhook delivery

## 🔍 **Testing**

### Local Testing
1. Use Polar Sandbox environment
2. Test with Polar's test payment methods
3. Use ngrok for webhook testing: `ngrok http 3000`

### Webhook Testing
1. Use Polar's webhook testing tools
2. Monitor webhook delivery in dashboard
3. Check application logs for processing

## 📚 **Documentation**

- [Polar Documentation](https://docs.polar.sh)
- [BetterAuth Integration](https://docs.polar.sh/integrations/better-auth)
- [Polar SDKs](https://docs.polar.sh/sdk)

## 🆘 **Troubleshooting**

### Common Issues

1. **"Invalid customer" errors**
   - Ensure `createCustomerOnSignUp: true`
   - Check environment variables

2. **Webhook not received**
   - Verify webhook URL is accessible
   - Check webhook secret matches
   - Ensure proper HTTP method (POST)

3. **Checkout redirect issues**
   - Verify success URL is correct
   - Check product IDs match Polar dashboard

4. **Authentication errors**
   - Verify Polar access token
   - Check token permissions in dashboard

### Debug Mode
Enable debug logging in development:

```typescript
// In lib/auth.ts
onPayload: (payload) => {
  console.log('Polar webhook received:', payload)
}
```

## 🎉 **Success!**

Your ZapDev application now has:
- ✅ Complete Polar payment integration
- ✅ Subscription management
- ✅ Usage-based billing capabilities
- ✅ Customer portal
- ✅ Webhook handling
- ✅ Beautiful UI components

Users can now:
- Browse pricing plans
- Start subscriptions
- Manage billing
- Track usage
- Access premium features

**Next Steps:**
1. Configure your actual Polar products
2. Test the complete flow
3. Deploy to production
4. Monitor analytics and customer behavior
</rewritten_file> 