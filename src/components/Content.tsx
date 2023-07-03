import { useContext, useEffect, useState } from 'react';
import { myContext } from './Context.tsx'
import Header from './Header.tsx'
import Playlists from './Playlists.tsx'
import Playlist from './Playlist.tsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.tsx';
import {PlaylistInterface} from './Playlist.tsx'

function Content () {
    const userObject = useContext(myContext)
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate()
    const [playlistInput, setPlaylistInput] = useState('');

    const fetchPlaylists = () => {
            fetch(`${process.env.BACK_END_URI}/playlists`)
                .then(response => response.json())
                .then(data => {
                    setPlaylists(data)
                    console.log('playlists fetched and updated')
                })
      };

    useEffect(() => {
        fetchPlaylists();
    },[])

    const createPlaylist = (e: React.FormEvent, playlistInput: string) => {
        e.preventDefault();
        if(playlistInput) {
            const newPlaylist =  {
                name: playlistInput,
                songs: []
            }
    
            fetch(`${process.env.BACK_END_URI}/playlists/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlaylist)
            }).then(() => 
            {
                fetchPlaylists()
                setPlaylistInput('')
                document.querySelector('summary')?.click()
            })
        }
    }   

    const updatePlaylistName = (id: string | undefined, updatedPlaylistName: string) => {
        if(playlists.filter((playlist:PlaylistInterface) => playlist.name === updatedPlaylistName).length === 0) {
            fetch(`${process.env.BACK_END_URI}/playlists/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: updatedPlaylistName,
                }),
            })

            const newPlaylists = [...playlists]
            
                newPlaylists.forEach((playlist:PlaylistInterface) => {
                if (playlist._id === id) {
                    playlist.name = updatedPlaylistName
                }
                })
            setPlaylists(newPlaylists)
          }
    }

    const deletePlaylist = (id: string | undefined) => {
        fetch(`${process.env.BACK_END_URI}/playlists/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: '',
            }),
          }).then(fetchPlaylists)
          navigate('/')
          const newPlaylists = playlists.filter((playlist:PlaylistInterface) => playlist._id !== id)
          setPlaylists(newPlaylists)

    }



    return (
        <>
        <Header userObject={userObject}
                playlistInput={playlistInput} 
                setPlaylistInput={setPlaylistInput} 
                createPlaylist={createPlaylist}
        />
        <main className='p-3 bg-base-100'>
        <Routes>
            <Route path='/' element={<PrivateRoute><Playlists playlists={playlists}/></PrivateRoute>}/>
            <Route path='/playlists/:id' element={<PrivateRoute><Playlist updatePlaylistName={updatePlaylistName} 
                                                                            deletePlaylist={deletePlaylist} 
                                                                            fetchPlaylists={fetchPlaylists} 
                                                                            playlists={playlists}/></PrivateRoute>}/>
        </Routes>
        </main>
        </>
    );
}

export default Content;