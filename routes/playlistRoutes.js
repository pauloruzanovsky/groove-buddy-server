import express from 'express';
import playlistControllers from '../controllers/playlistControllers.js'

const playlistRouter = express.Router();

// List of playlists GET
playlistRouter.get('/', playlistControllers.listPlaylists)

// Details of one playlist GET
playlistRouter.get('/:id', playlistControllers.getPlaylist)

// Create a playlist POST
playlistRouter.post('/create', playlistControllers.createPlaylist)

// Update a playlist PUT
playlistRouter.put('/:id', playlistControllers.updatePlaylist )

// Delete a playlist POST
playlistRouter.delete('/:id', playlistControllers.deletePlaylist)

playlistRouter.put('/addSong/:id', playlistControllers.addSong)

playlistRouter.put('/deleteSong/:id/:songId', playlistControllers.deleteSong)


export default playlistRouter