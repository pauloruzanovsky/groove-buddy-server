
function NewPlaylistModal(props: {createPlaylist: (e: React.FormEvent, playlistInput: string) => void, playlistInput: string, setPlaylistInput: React.Dispatch<React.SetStateAction<string>>}) {
    const { createPlaylist, setPlaylistInput, playlistInput } = props

    return (
        <details className="dropdown">
        <summary tabIndex={0} className="btn btn-ghost m-1">new playlist</summary>
            <form method="dialog" className="modal-box flex gap-4 dropdown-content z-[1] outline-2 bg-base-300  " onSubmit={(e) => {createPlaylist(e,playlistInput)}}>
                <input onChange={(e) => setPlaylistInput(e.target.value)} value={playlistInput} type="text" placeholder="Playlist name" className="input input-bordered w-full max-w-xs" />
                <button type='submit' className={`${!playlistInput ? 'opacity-50 cursor-not-allowed' : ''} btn btn-accent `}>Create playlist</button>
            </form>
        </details>
    );
}

export default NewPlaylistModal;