import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
var handler = null;
try {
  handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session }) {
        const sessionUser = await User.findOne({ email: session.user.email });

        session.user.id = sessionUser._id.toString();
        return session;
      },

      async signIn({ profile }) {
        try {
          console.log("trying to ccheck");
          await connectToDB();
          // user exists
          let userExists = "";
          try {
            userExists = await User.findOne({ email: profile.email });
          } catch (err) {
            console.log("error in finding user: " + err);
          }

          //new user
          if (!userExists) {
            console.log("Trying to create new user");
            try {
              await User.create({
                email: profile.email,
                username: profile.name
                  .replace(" ", "_")
                  .toLowerCase()
                  .substring(0, 20),
                image: profile.picture,
              });
            } catch (err) {
              console.log("error in user creation: " + err);
            }
          } else {
            console.log("User already exists");
          }

          return true;
        } catch (err) {
          console.log("ERROR from route.js:failed to connect to db" + err);
          return false;
        }
      },
    },
    // debug: true,
  });
} catch (err) {
  console.log("error came from route: " + err);
}
export { handler as GET, handler as POST };
