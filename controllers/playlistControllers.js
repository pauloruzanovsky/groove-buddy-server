import PlaylistModel from '../models/PlaylistModel.js';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';
import 'dotenv/config'
import spotifyApi from '../auths/spotifyAuth.js';


const collection = db.collection('playlists');

export const listPlaylists = asyncHandler(async (req, res) => {
  const playlists = await collection.find().sort({ name: 1 }).toArray();
    res.json(playlists);

});

export const getPlaylist = asyncHandler(async (req, res) => {
    try{    
        console.log('current id:', req.params.id)

        const playlist = await collection.find({ _id: new ObjectId(req.params.id) } ).toArray()
        console.log('playlist updated')
        res.send(playlist[0])
    } catch (error) {
        console.log(error)
    }


});

export const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = new PlaylistModel(
      {
          name: req.body.name,
          songs: []
      }
  )
  const checkIfExist = await collection.findOne({name: playlist.name})
  if (checkIfExist) {
      res.send('Playlist already exists')
  } else {
      try {             
          const result = await collection.insertOne(playlist)
          console.log('result', result)
          res.send(`Playlist ${result.insertedId} created`)
      } catch (error) {
          console.log(error)
      }
  }

  
})

export const updatePlaylist = asyncHandler(async (req, res) => {
  try {
      const filter = { _id: new ObjectId(req.params.id) }
      const playlistUpdate = {
          $set: {
              name: req.body.name
          }
      }
  
      const result = await collection.updateOne(filter, playlistUpdate)
      console.log(result)
      console.log(`Playlist ${req.params.id} updated`)
  } catch (error) {
      console.log(error)
  }
})

export const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        const filter = { _id: new ObjectId(req.params.id) }
        collection.deleteOne(filter)
        console.log(`Playlist ${req.params.id} deleted`)
    } catch (error) {
        console.log(error)
    }
   

})

export const addSong = asyncHandler(async (req, res) => {
   
  try {
      const filter = { _id: new ObjectId(req.params.id) }
      const playlistUpdate = {
          $push: {
              songs: req.body.song
          }
      }
  
      const result = await collection.updateOne(filter, playlistUpdate)
      console.log(result)
      console.log(`${req.body.song.name} added to playlist`)
      res.status(200).send(result)
  } catch (error) {
      console.log(error)
  }
})

export const deleteSong = asyncHandler(async (req, res) => {
  try {
      const filter = { _id: new ObjectId(req.params.id) }
      const playlistUpdate = {
          $pull: {
              songs: { spotifyId: req.params.songId }
          }
      }
      const result = await collection.updateOne(filter, playlistUpdate)
      console.log(result)
      console.log(`Song ${req.params.songId} removed from playlist`)
      res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})

export const filterSongs = asyncHandler(async (req, res) => {
    spotifyApi.clientCredentialsGrant()
    .then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('req: ', req.query)
    const songName = req.query.songName
    const existingSongs = JSON.parse(req.query.existingSongs).map(song => song.spotifyId)
    console.log('existingSongs: ', existingSongs)

    spotifyApi.searchTracks(songName, {limit: 10}).then((data) => {
        const songsArray = data.body.tracks.items.map(song => (
            {
                spotifyId:song.id, 
                name:song.name, 
                artist:song.artists[0].name,
                imageUrl:song.album.images[0].url,
                previewUrl: song.preview_url
            }))
        res.send(songsArray)
        })

    

}).catch((err) => {
    console.log(err);
})
})
export default {
  listPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  deleteSong,
  filterSongs
};
