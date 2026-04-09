import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearStoredSession,
  fetchCurrentUser,
  getStoredSession,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function hydrateSession() {
      const storedSession = getStoredSession();

      if (!storedSession?.access_token) {
        if (!ignore) {
          setLoading(false);
        }
        return;
      }

      try {
        const currentUser = await fetchCurrentUser(storedSession.access_token);
        if (!ignore) {
          setSession(storedSession);
          setUser(currentUser);
        }
      } catch {
        clearStoredSession();
        if (!ignore) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    hydrateSession();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      async signIn(credentials) {
        const newSession = await signInWithEmail(credentials);
        const currentUser = await fetchCurrentUser(newSession.access_token);
        setSession(newSession);
        setUser(currentUser);
        return currentUser;
      },
      async signUp(credentials) {
        const payload = await signUpWithEmail(credentials);

        if (payload.session?.access_token) {
          const currentUser = await fetchCurrentUser(payload.session.access_token);
          setSession(payload.session);
          setUser(currentUser);
          return { user: currentUser, requiresEmailConfirmation: false };
        }

        return { user: payload.user || null, requiresEmailConfirmation: true };
      },
      async signOut() {
        if (session?.access_token) {
          await signOutUser(session.access_token);
        } else {
          clearStoredSession();
        }

        setSession(null);
        setUser(null);
      },
    }),
    [loading, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
