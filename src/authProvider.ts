import { AuthBindings } from "@refinedev/core";
import { auth } from "./client/api";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    try {
      await auth.login({ usr: username ?? email, pwd: password });
      localStorage.setItem(TOKEN_KEY, username ?? email);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  logout: async () => {
    await auth.logout();
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return await auth.whoami();
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
