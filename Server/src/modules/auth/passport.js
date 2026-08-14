import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { findOrCreateGoogleUser } from "./auth.service.js";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        process.env.GOOGLE_CALLBACK_URL,
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const email =
          profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error(
              "Google account email not available."
            )
          );
        }

        const user =
          await findOrCreateGoogleUser({
            googleId: profile.id,

            email,

            displayName:
              profile.displayName ||
              profile.name?.givenName ||
              "User",

            profilePicture:
              profile.photos?.[0]?.value ||
              "",
          });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;