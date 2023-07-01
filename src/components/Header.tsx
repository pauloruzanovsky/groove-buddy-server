import { Link } from 'react-router-dom'
import NewPlaylistModal from './NewPlaylistModal';

interface userObjectProps {
    _id: string;
    email: string;
    googleId?: string;
    githubId?: string;
    name: string;
    picture: string;

}
export default function Header({userObject, playlistInput, setPlaylistInput, createPlaylist} : {userObject: userObjectProps, playlistInput: string, setPlaylistInput: () => void, createPlaylist: () => void }) {
    const logout = () => {
       fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
       })
       .then(() => {
        window.location.reload()
        }   
        
       ).catch(err => {
        console.log(err)
       })
    }
    return (
        <header className='flex justify-between items-center bg-base-300 text-base-content'>
          <div className='flex'>
            <Link to='/' className='btn btn-ghost text-base-content normal-case text-xl'>GrooveBuddy.</Link>
            <NewPlaylistModal playlistInput={playlistInput} setPlaylistInput={setPlaylistInput} createPlaylist={createPlaylist}/>
          </div>
          <div className='flex gap-3'>
            <div className='flex items-center'>Hello, {userObject && userObject.name}</div>
            {userObject && <Link to='/login'><button className='btn btn-ghost' onClick={logout}>Logout</button></Link>}
          </div>
        </header>
    )
}
