import { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
import { Edit, Trash2 } from 'lucide-react';
import UpdatePlaylistModal from './UpdatePlaylistModal'


function PlaylistActionButtons(props) {
    const { id, updatePlaylistName, deletePlaylist } = props
    const [updatedPlaylistName, setUpdatedPlaylistName] = useState('' as string);

    return (
        <div>
            <button onClick={()=>window.my_modal_2.showModal()}> <Edit size={18}/></button>
            <UpdatePlaylistModal id={id} updatedPlaylistName={updatedPlaylistName} updatePlaylistName={updatePlaylistName} setUpdatedPlaylistName={setUpdatedPlaylistName}/>
         <button onClick={() => {deletePlaylist(id)}}><Trash2 size={18}/></button>
         </div>
    );
}

export default PlaylistActionButtons;