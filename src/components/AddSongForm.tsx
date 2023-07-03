import { useState } from 'react';
import SpotifySongList from './SpotifySongList.js';
import { SongInterface } from './Playlist'
import { PlaylistInterface } from './Playlist'


export default function AddSongForm(props: { addSongToPlaylist: (song : SongInterface) => void, playlist: PlaylistInterface, disableComponent: boolean, audioPlayer: HTMLAudioElement | undefined, isPlaying: boolean, currentSong: SongInterface | undefined, handlePreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => void }) {
    const [songNameInput, setSongNameInput] = useState('');
    const { addSongToPlaylist, playlist, disableComponent, isPlaying, currentSong, handlePreview } = props
    

    return (
        <div className='bg-base-300 rounded p-4'>
        <form>
            <div className='font-bold text-2xl mb-2'>Add new songs to your playlist</div>
            <input placeholder='Find a new song...' type="text" className='input border-slate-900 border-1 mb-2' value={songNameInput} onChange={ (e) => setSongNameInput(e.target.value)}/>
        </form>
        <SpotifySongList 
            disableComponent={disableComponent} 
            playlist={playlist} 
            songNameInput={songNameInput} 
            addSongToPlaylist={addSongToPlaylist} 
            isPlaying={isPlaying}
            currentSong={currentSong}
            handlePreview={handlePreview}
            />
        </div>
    );
}