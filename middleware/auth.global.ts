import { getAuth, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  if (!user) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithRedirect(auth, provider);
  }
});
