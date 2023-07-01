import express from 'express';
import playlistControllers from '../controllers/playlistControllers.js'

const spotifyRouter = express.Router();

spotifyRouter.get('/:input', playlistControllers.filterSongs)

export default spotifyRouter