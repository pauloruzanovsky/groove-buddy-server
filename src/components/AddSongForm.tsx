import { useState } from 'react';
import SpotifySongList from './SpotifySongList.js';


export default function AddSongForm(props) {
    const [songNameInput, setSongNameInput] = useState('');
    const { addSongToPlaylist, playlist, disableComponent, audioPlayer, isPlaying, currentSong, handlePreview } = props
    

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
            audioPlayer={audioPlayer}
            isPlaying={isPlaying}
            currentSong={currentSong}
            handlePreview={handlePreview}
            />
        </div>
    );
}