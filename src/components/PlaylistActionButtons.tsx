import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import UpdatePlaylistModal from './UpdatePlaylistModal'
declare global {
    interface Window {
      customFunctions: {
        update_playlist_modal: () => void;
        showModal: () => void;
      };
    }
  }

function PlaylistActionButtons({ id, updatePlaylistName, deletePlaylist } : {id: string | undefined, updatePlaylistName: (id: string | undefined, updatedPlaylistName: string) => void, deletePlaylist: (id: string | undefined) => void }) {
    const [updatedPlaylistName, setUpdatedPlaylistName] = useState('' as string);
    const updateModal = document.getElementById('update_playlist_modal') as HTMLDialogElement
    return (
        <div>
            <button onClick={()=>updateModal.showModal()}> <Edit size={18}/></button>
            <UpdatePlaylistModal id={id} updatedPlaylistName={updatedPlaylistName} updatePlaylistName={updatePlaylistName} setUpdatedPlaylistName={setUpdatedPlaylistName}/>
         <button onClick={() => {deletePlaylist(id)}}><Trash2 size={18}/></button>
         </div>
    );
}

export default PlaylistActionButtons;