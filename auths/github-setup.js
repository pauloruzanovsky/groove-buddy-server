import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import session from 'express-session'
import dotenv from 'dotenv'
import UserModel from '../models/UserModel.js'
import { db } from '../config/database.js';

dotenv.config({ path: './config/config.env' });

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/auth/github/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await db.collection('users').findOne({ githubId: profile.node_id })
            try {
                if(user) {
                    done(null, user)
                } else {
                    user = new UserModel ({
                        githubId: profile.nodeId,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile.photos[0].value
                    })
                    db.collection('users').insertOne(user)
                    done(null, user)
                }
            } catch (error) {
                done(error, false)
            }
        }
    )
)

console.log('githubpassport')

passport.serializeUser((user,done) => {
    done(null, user.githubId)
})

passport.deserializeUser(async (id,done) => {
    const doc = await db.collection('users').findOne({githubId: id})
    return done(null,doc)
})

export default function githubSetup(app) {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
}