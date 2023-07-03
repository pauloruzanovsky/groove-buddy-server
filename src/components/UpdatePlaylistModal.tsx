import React, { useEffect } from 'react'

function UpdatePlaylistModal({ id, updatePlaylistName, updatedPlaylistName, setUpdatedPlaylistName } : { id: string | undefined, updatePlaylistName: (id: string | undefined, updatedPlaylistName: string) => void, updatedPlaylistName: string, setUpdatedPlaylistName: React.Dispatch<React.SetStateAction<string>>}) {

useEffect(() => {
console.log(id, updatedPlaylistName)

})
return (
        <dialog id="update_playlist_modal" className="modal">
        <form method="dialog" className="modal-box max-w-xs flex flex-col gap-2 bg-base-200">
            <input className='input input-sm'
                id="name"
                placeholder='New playlist name...'
                onChange={(e) => setUpdatedPlaylistName(e.target.value)}
                value={updatedPlaylistName}/>
        <button type='submit' className='btn btn-accent btn-sm' onClick={() => {updatePlaylistName(id, updatedPlaylistName)}}>Update</button>
        </form>
        <form method="dialog" className="modal-backdrop opacity-30">
            <button>close</button>
        </form>
        </dialog>
    );
}

export default UpdatePlaylistModal;