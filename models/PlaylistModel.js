import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: String,
    songs: []

})

const PlaylistModel = mongoose.model('Playlist', playlistSchema, 'playlists');

export default PlaylistModel