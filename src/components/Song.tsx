import { Pause, Play } from 'lucide-react'
import { SongInterface } from './Playlist';

function Song({ song, onPreview, isPlaying, currentSong } : { song: SongInterface, onPreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => void, isPlaying: boolean, currentSong: SongInterface | undefined}) {

    const handlePreview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => {
        console.log(song)
        onPreview(e, song);
      };

    return (
        <div className='flex align-middle max-h-12 gap-1 '>
            <img src={song.imageUrl} className='h-full'/>
            <div>
                <div>{song.name}</div>
                <div className=' text-xs'>{song.artist}</div>
            </div>
            <button disabled={!song.previewUrl} className={`${!song.previewUrl ? 'opacity-20 cursor-not-allowed' : ''} ml-auto hover:brightness-200`} onClick={(e) => {handlePreview(e, song)}}>{currentSong && currentSong.spotifyId === song.spotifyId && isPlaying ? <Pause size={18} /> : <Play size={18}/>}</button>
        </div>
    );
}

export default Song;

