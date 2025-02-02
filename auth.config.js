 
export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  },
  callbacks: {
    authorized( { auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) return true;
      return false;
    }
  },
  providers: []
};