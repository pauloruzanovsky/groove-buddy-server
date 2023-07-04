import express from 'express';
import passport from 'passport';


const authRouter = express.Router();


authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('https://groove-buddy-server.cyclic.app/');
})

authRouter.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
authRouter.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('https://groove-buddy-server.cyclic.app/');
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