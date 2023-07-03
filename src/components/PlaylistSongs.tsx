import { Trash2 } from 'lucide-react';
import Song from './Song.tsx'
import { PlaylistInterface, SongInterface } from './Playlist.tsx';

function PlaylistSongs({ playlist, deleteSongFromPlaylist, isPlaying, currentSong, handlePreview } : { playlist: PlaylistInterface, deleteSongFromPlaylist: (songId: SongInterface["spotifyId"]) => void, isPlaying: boolean, currentSong: SongInterface | undefined, handlePreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => void }) {
  let playlistElement = [] as Array<JSX.Element>;
  if(playlist.songs) {
      playlistElement = playlist.songs
      .sort((a,b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;})
      .map((song) => (
      <li className='flex cursor-default justify-between align-middle hover:outline hover: outline-1 rounded p-1' key={song.spotifyId}>
        <Song song={song} onPreview={handlePreview} isPlaying={isPlaying} currentSong={currentSong}/>
        <button className='hover:brightness-200' onClick={() => {deleteSongFromPlaylist(song.spotifyId)}}><Trash2 size={18}/></button>
      </li>))
  }

    return (
        <div>
          <ul className='flex flex-col gap-2'>
            {playlistElement}
          </ul>
      </div>
    );
}

export default PlaylistSongs;