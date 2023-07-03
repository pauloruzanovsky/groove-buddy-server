import { Link } from 'react-router-dom'
import NewPlaylistModal from './NewPlaylistModal';
import { UserInterface } from './Context'

export default function Header({userObject, playlistInput, setPlaylistInput, createPlaylist} : {userObject: UserInterface | undefined, playlistInput: string, setPlaylistInput: React.Dispatch<React.SetStateAction<string>>, createPlaylist: (e: React.FormEvent, playlistInput: string) => void}) {
    const logout = () => {
       fetch(`${process.env.BACK_END_URI}/auth/logout`, {
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
