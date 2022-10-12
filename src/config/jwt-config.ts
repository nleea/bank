import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import { prisma } from "../database/db";

const opt: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

export const jwtAuthenticate = passport.use(
  new JwtStrategy(opt, async (payload, done) => {
    try {
      const user = await prisma.tbl_client.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        done(null, false);
      } else done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
