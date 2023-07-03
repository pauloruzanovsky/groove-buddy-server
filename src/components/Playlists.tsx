import { Link } from 'react-router-dom';
import { SongInterface } from './Playlist';

interface PlaylistInterface {
    _id: string;
    name: string;
    songs: Array<SongInterface>;
}

export default function Playlists({ playlists } : {playlists: Array<PlaylistInterface>}) {

    const imagesArray = playlists.map(playlist => playlist.songs.map(song => song.imageUrl))
    console.log(imagesArray)
    return(
        <div className='p-2 text-base-content'>
            <div className='flex'>
                <div className='font-bold'>Your playlists</div>
            </div>
            <div className='flex gap-4 mt-3'>
                {playlists.map((playlist : PlaylistInterface) => (
                        <Link key={playlist._id} to={`/playlists/${playlist._id}`}>
                        <div className="card card-compact w-48 h-72 bg-base-200 text-base-content shadow-xl">
                                <figure>
                                    <div>
                                        <img className='' src={playlist.songs[0] && playlist.songs[0].imageUrl}/>
                                        <img className='' src={playlist.songs[1] && playlist.songs[1].imageUrl}/>
                                    </div>
                                    <div>
                                        <img className='' src={playlist.songs[2] && playlist.songs[2].imageUrl}/>
                                        <img className='' src={playlist.songs[3] && playlist.songs[3].imageUrl}/>
                                    </div>
                                    </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{playlist.name}</h2>
                                    <p>{playlist.songs.length} {playlist.songs.length > 1 ? 'songs' : 'song'}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                        </Link>))}
            </div>
                    
        </div>
    )
}