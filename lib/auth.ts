import { betterAuth } from "better-auth";
import { convexAdapter } from "@better-auth-kit/convex";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

// Defensive Convex client creation
const createConvexClient = () => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl || convexUrl === "your-convex-url-here") {
    console.warn("NEXT_PUBLIC_CONVEX_URL not properly configured, using placeholder");
    return new ConvexHttpClient("https://placeholder.convex.cloud");
  }
  return new ConvexHttpClient(convexUrl);
};

// Default environment values for development
const getEnvOrDefault = (key: string, defaultValue: string) => {
  const value = process.env[key];
  if (!value || value.startsWith('your-')) {
    console.warn(`Environment variable ${key} not configured, using default`);
    return defaultValue;
  }
  return value;
};

// Initialize Polar client
const polarClient = new Polar({
  accessToken: getEnvOrDefault('POLAR_ACCESS_TOKEN', ''),
  server: 'sandbox', // Use 'production' for live environment
});

export const auth = betterAuth({
  secret: getEnvOrDefault('BETTER_AUTH_SECRET', 'development-secret-key-for-build'),
  baseURL: getEnvOrDefault('BETTER_AUTH_URL', 'http://localhost:3000'),
  
  // Use the official Convex adapter with defensive client initialization
  database: convexAdapter(createConvexClient()),
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  
  socialProviders: {
    github: {
      clientId: getEnvOrDefault('GITHUB_CLIENT_ID', ''),
      clientSecret: getEnvOrDefault('GITHUB_CLIENT_SECRET', ''),
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
    google: {
      clientId: getEnvOrDefault('GOOGLE_CLIENT_ID', ''),
      clientSecret: getEnvOrDefault('GOOGLE_CLIENT_SECRET', ''),
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },

  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      getCustomerCreateParams: ({ user }) => ({
        // Add any custom customer metadata here
        source: 'zapdev-app',
        platform: 'web',
      }),
      use: [
        checkout({
          products: [
            {
              productId: "zapdev-pro-monthly", // Replace with actual Polar product IDs
              slug: "pro-monthly"
            },
            {
              productId: "zapdev-pro-yearly", 
              slug: "pro-yearly"
            },
            {
              productId: "zapdev-enterprise",
              slug: "enterprise"
            }
          ],
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true
        }),
        portal(),
        usage(),
        webhooks({
          secret: getEnvOrDefault('POLAR_WEBHOOK_SECRET', ''),
          onCustomerStateChanged: (payload) => {
            console.log('Customer state changed:', payload);
            // Handle customer state changes
          },
          onOrderPaid: (payload) => {
            console.log('Order paid:', payload);
            // Handle successful payments
          },
          onSubscriptionCreated: (payload) => {
            console.log('Subscription created:', payload);
            // Handle new subscriptions
          },
          onSubscriptionActive: (payload) => {
            console.log('Subscription active:', payload);
            // Handle active subscriptions
          },
          onSubscriptionCanceled: (payload) => {
            console.log('Subscription canceled:', payload);
            // Handle subscription cancellations
          },
          onPayload: (payload) => {
            console.log('Polar webhook received:', payload);
            // Catch-all handler for all events
          }
        })
      ],
    })
  ],
  
  // Add database hooks to sync all user sign-ups to custom users table
  databaseHooks: {
    user: {
      create: {
        after: async (user: any) => {
          // Sync all users to custom users table
          if (!user.email) {
            console.warn("User created without email, skipping Convex sync");
            return;
          }
          
          const convexClient = createConvexClient();
          try {
            // Only sync if Convex is properly configured
            if (process.env.NEXT_PUBLIC_CONVEX_URL && 
                !process.env.NEXT_PUBLIC_CONVEX_URL.includes('placeholder')) {
              await convexClient.mutation(api.users.createOrUpdateUser, {
                email: user.email,
                name: user.name || user.email.split('@')[0],
                avatar: user.image || "",
                provider: user.provider || (user.image ? "oauth" : "email"),
              });
            }
          } catch (error) {
            console.error("Failed to sync user to Convex:", {
              email: user.email,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        },
      },
    },
  },
  
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session; 