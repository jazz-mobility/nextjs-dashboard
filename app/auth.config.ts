import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;


export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      return isOnDashboard ? isLoggedIn : true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login
      return url.startsWith(baseUrl) ? `${baseUrl}/dashboard` : url;
    },
  },
  providers: [], // Define providers in auth.ts
} satisfies NextAuthConfig;