import express from 'express';
import passport from 'passport';


const authRouter = express.Router();


authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));
authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
    try {
        console.log(req.user)
        res.redirect(process.env.FRONT_END_URI);
    } catch (error) {
        console.log(error.message);
    }
})

authRouter.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
authRouter.get('/github/callback', passport.authenticate('github'), (req, res) => {
    try {
        console.log(req.user)
        res.redirect(process.env.FRONT_END_URI);
    } catch (error) {
        console.log(error.message);
    }
})

authRouter.get('/logout', (req, res) => {
   req.logout( (err) => {
       if (err) {
           return next(err);
       }
       res.redirect('/login');
       console.log('logged out');    
   });
})

export default authRouter