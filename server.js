import express from 'express';
import authRouter  from './routes/authRoutes.js';
import playlistRouter from './routes/playlistRoutes.js';
import spotifyRouter from './routes/spotifyRoutes.js';
import googleSetup from './auths/google-setup.js';
import githubSetup from './auths/github-setup.js';
import cors from 'cors'
import dotenv from 'dotenv';
import spotifyApi from './auths/spotifyAuth.js';
import mongoose from 'mongoose';
dotenv.config({ path: './config/config.env' });

const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://pauloruzanovsky:qweqwe123@cluster0.nrp1h9n.mongodb.net/?retryWrites=true&w=majority");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

const app = express();
app.use(cors( {
    origin: 'https://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.enable("trust proxy");

googleSetup(app);
githubSetup(app)

app.use('/auth', authRouter);
app.use('/playlists', playlistRouter);
app.use('/spotify', spotifyRouter);

app.get('/getuser', (req, res) => {
    res.send(req.user);
})

app.get('/', (req, res) => {
    res.send('hello!')
})

spotifyApi.clientCredentialsGrant()
.then((data) => {
spotifyApi.setAccessToken(data.body['access_token']);
const songName = 'num'
spotifyApi.searchTracks(songName, {limit: 1}).then((data) => {
    const songsArray = data.body.tracks.items.map(song => ({name:song.name, artist:song.artists[0].name,  }))
    console.log('a: ',data.body.tracks.items[0].id)
}).catch((err) => {
console.log(err);
})})
  
const PORT = 3000;

connectDB().then(() => {
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
})
