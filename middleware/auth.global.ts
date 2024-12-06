import { getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser() as User
  
  if (!user) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    if (process.dev) {
      console.log('test')
      await signInWithPopup(auth, provider)
    }else{
      signInWithRedirect(auth, provider);
    }
  }
});
