import { useEffect, useState } from 'react';
import Song from './Song';
import { PlaylistInterface, SongInterface } from './Playlist';

function SpotifySongList({ songNameInput, addSongToPlaylist, playlist, disableComponent, handlePreview, isPlaying, currentSong } : {songNameInput: string, addSongToPlaylist: (song: SongInterface) => void, playlist: PlaylistInterface, disableComponent: boolean, handlePreview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, song: SongInterface) => void, isPlaying: boolean, currentSong: SongInterface | undefined}) {
    const [songList, setSongList] = useState<Array<SongInterface>>([]);
    const [searchingSongs, setSearchingSongs] = useState(false)

    useEffect(() => {
        if(songNameInput.length === 0) {
            setSongList([])
        } else {
            const queryParams = `existingSongs=${encodeURIComponent(JSON.stringify(playlist.songs))}&songName=${encodeURIComponent(songNameInput)}`
            setSearchingSongs(true)
            fetch(`${process.env.BACK_END_URI}/spotify/suggestionList?${queryParams}`)
            .then(res => res.json())
            .then(data => {
                setSongList(data)
                setSearchingSongs(false)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[songNameInput])

    const playlistSongs = playlist.songs ? playlist.songs.map((song: SongInterface) => {
        return song.name
    }) : []

    const songListElement = searchingSongs ? <div>Searching...</div> : songList.filter(song => !playlistSongs.includes(song.name))
                                    .map((song: SongInterface) => {
                                    return (
                                        <div className={`cursor-pointer flex ${ disableComponent ? 'opacity-50 cursor-not-allowed' : ''} flex cursor-default justify-between align-middle hover:text-white hover:outline hover: outline-1 outline-base-content rounded p-1`} onClick={() => {!disableComponent && addSongToPlaylist(song)}} key={song.spotifyId}>
                                           <Song song={song} onPreview={handlePreview} isPlaying={isPlaying} currentSong={currentSong}/>
                                        </div> 
                                    )
                                    })
                                    

    return (
        <div className='flex flex-col gap-2'>
            {songListElement}
        </div>
    );
}

export default SpotifySongList;