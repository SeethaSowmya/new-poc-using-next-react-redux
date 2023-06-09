import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username" },
        password: { label: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials, "GGGGGGGGGGG");
        // Implement your own logic to validate the credentials and authorize the user
        const { username, password } = credentials;
        // Example validation logic, replace it with your own
        //api call
        if (username === "sowmya" && password === "12345") {
          // Return the user object if the credentials are valid
          return Promise.resolve({ id: 1, name: 'sowmya'});
        } else {
          // Return null if the credentials are invalid
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut:'/login'
  },

  // callbacks: {
  //   async jwt({ token, user ,session}) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     console.log(session,"tike", user,"kkkkkk");
  //     // var jwt = require("jsonwebtoken");
  //     // var token = jwt.sign({ foo: "bar" }, "shhhhh");
  //     return { user };
  //   },

  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     console.log(session,"user",user)
  //     session.user = session.user.name;

  //     return session;
  //   },
  // },
});
