import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

// Function to get the correct base URL based on current origin
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [polarClient()],
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession, 
  getSession 
} = authClient; 