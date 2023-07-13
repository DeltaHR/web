import { getAuth, signInWithRedirect, GoogleAuthProvider, User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser() as User
  
  if (!user) {
    
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithRedirect(auth, provider);

    }
  })