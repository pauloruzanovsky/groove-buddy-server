import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PlaylistSongs from "./PlaylistSongs.tsx"
import PlaylistActionButtons from './PlaylistActionButtons.tsx'
import AddSongForm from './AddSongForm.tsx';

interface Playlist {
    _id: string;
    name: string;
    songs: Array<string>;
}

export default function Playlist(props) {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({} as Playlist);
    const { updatePlaylistName, deletePlaylist, playlists, fetchPlaylists } = props
    const [disableComponent, setDisableComponent] = useState(false)
    const [audioPlayer, setAudioPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
        if(audioPlayer) {
            if(isPlaying && currentSong) {
                audioPlayer.pause();
                audioPlayer.src = currentSong.previewUrl
                audioPlayer.volume = 0.01
                audioPlayer.play()
            } 
            else {
                audioPlayer.pause();
            }
        }
    },[isPlaying, currentSong, audioPlayer])

    const handlePreview = (e, song) => {
      e.stopPropagation()
      if(isPlaying) {
          console.log('current song: ', currentSong, 'clicked song: ', song)
          if(currentSong.spotifyId === song.spotifyId) {
              setIsPlaying(false)
              setCurrentSong(null)
          } else {
              setCurrentSong(song)
          }
      } else {
          setCurrentSong(song)
          setIsPlaying(true)
      }
  }

  useEffect(() => {
    const audio = new Audio();
    setAudioPlayer(audio)
    return () => {
        audio.pause()
        audio.src = ''
        setAudioPlayer(null)
        setIsPlaying(false)
    }
  },[playlist])


  useEffect(() => {
    fetchPlaylist();
    console.log('playlist fetched', playlists)
  }, [playlists, id]);

  useEffect(() => {
    console.log(playlist)
  },[playlist])



    const fetchPlaylist = () => {
      fetch(`http://localhost:5000/playlists/${id}`)
        .then(response => response.json())
        .then(data => {
          setPlaylist(data)
        })
    }


    const addSongToPlaylist = (song) => {
      if(playlist) {
        const songExists = playlist.songs.some(playlistSong => playlistSong.name === song.name)
        setDisableComponent(true)
        setIsPlaying(false)
        if (!songExists) {
          fetch(`http://localhost:5000/playlists/addSong/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              song: song,
          })})
          .then(() => {
            console.log('song added to playlist')
            fetchPlaylists()
            setTimeout(() => {
              setDisableComponent(false)
            }, 1000)
          })
        } else {
          console.log('song already in playlist')
        }
      }
    }

    const deleteSongFromPlaylist = (songId) => {
      setIsPlaying(false)
      fetch(`http://localhost:5000/playlists/deleteSong/${id}/${songId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },

      }).then(() => {
        console.log('deleted song')
        fetchPlaylists()
      })
      .catch((error) => {
        console.log(error)
      })
  }
    
    return(
        <div className='grid grid-cols-2 gap-4 text-base-content'>
          <div className='bg-base-300 rounded p-4 '>
            <div className='flex items-center justify-between mb-3 pb-2'>
              <h2 className='font-bold text-5xl '>{playlist.name}</h2>
              <PlaylistActionButtons id={id} updatePlaylistName={updatePlaylistName} deletePlaylist={deletePlaylist}/>
            </div>
           <PlaylistSongs 
            deleteSongFromPlaylist={deleteSongFromPlaylist} 
            playlist={playlist}
            audioPlayer={audioPlayer}
            isPlaying={isPlaying}
            currentSong={currentSong}
            handlePreview={handlePreview}/>
          </div>
          <AddSongForm 
            addSongToPlaylist={addSongToPlaylist} 
            disableComponent={disableComponent} 
            playlist={playlist} 
            audioPlayer={audioPlayer}
            isPlaying={isPlaying}
            currentSong={currentSong}
            handlePreview={handlePreview}/>
        </div>
    )
}

