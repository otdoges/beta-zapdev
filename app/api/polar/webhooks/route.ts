import { auth } from "@/lib/auth";

// The Polar webhooks are handled automatically by the BetterAuth Polar plugin
// This route is automatically created by the plugin at /api/auth/polar/webhooks
// But we can also create a dedicated route if needed

export const POST = async (request: Request) => {
  // The webhook handling is done by the BetterAuth plugin automatically
  // You can add additional logging or processing here if needed
  return new Response("OK", { status: 200 });
}; 