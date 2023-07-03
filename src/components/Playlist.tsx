import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PlaylistSongs from "./PlaylistSongs.tsx"
import PlaylistActionButtons from './PlaylistActionButtons.tsx'
import AddSongForm from './AddSongForm.tsx';

export interface PlaylistInterface {
    _id: string;
    name: string;
    songs: Array<SongInterface>;
}

export interface SongInterface {
    spotifyId: string;
    name: string;
    artist: string;
    previewUrl: string;
    imageUrl: string;
}

export default function Playlist({ updatePlaylistName, deletePlaylist, playlists, fetchPlaylists }: {updatePlaylistName: (id: string | undefined, updatedPlaylistName: string) => void, deletePlaylist: (id: string | undefined) => void, playlists: Array<PlaylistInterface>, fetchPlaylists: () => void}) {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({} as PlaylistInterface);
    const [disableComponent, setDisableComponent] = useState(false)
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement>()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState<SongInterface | undefined>(undefined)

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

    const handlePreview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => {
      e.stopPropagation()
      if(isPlaying && currentSong) {
          console.log('current song: ', currentSong, 'clicked song: ', song)
          if(currentSong.spotifyId === song.spotifyId) {
              setIsPlaying(false)
              setCurrentSong(undefined)
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
        setAudioPlayer(undefined)
        setIsPlaying(false)
    }
  },[playlist])


  useEffect(() => {
    fetchPlaylist();
    console.log('playlist fetched', playlists)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlists, id]);

  useEffect(() => {
    console.log(playlist)
  },[playlist])



    const fetchPlaylist = () => {
      fetch(`${process.env.BACK_END_URI}/playlists/${id}`)
        .then(response => response.json())
        .then(data => {
          setPlaylist(data)
        })
    }


    const addSongToPlaylist = (song: SongInterface) => {
      if(playlist) {
        const songExists = playlist.songs.some(playlistSong => playlistSong.name === song.name)
        setDisableComponent(true)
        setIsPlaying(false)
        if (!songExists) {
          fetch(`${process.env.BACK_END_URI}/playlists/addSong/${id}`, {
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

    const deleteSongFromPlaylist = (songId : SongInterface["spotifyId"]) => {
      setIsPlaying(false)
      fetch(`${process.env.BACK_END_URI}/playlists/deleteSong/${id}/${songId}`, {
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

