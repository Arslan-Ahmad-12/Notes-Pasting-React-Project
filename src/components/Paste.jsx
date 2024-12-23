import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchterm] = useState('');
    const dispatch = useDispatch();
    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
       
        dispatch(removeFromPaste(pasteId));
    }



    return (
        <div>
            <input type="search"
                className='p-2 rounded-2xl min-w-[600px] mt-5'
                placeholder='search here'
                value={searchTerm}
                onChange={(e) => setSearchterm(e.target.value)} />
            <div className='flex flex-col gap-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='border mt-3' key={paste._id}>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row gap-5'>
                                        <button>
                                        <NavLink to={`/?pasteId=${paste._id}`}>
                                                    Edit
                                              </NavLink>
                                        </button>
                                        <button>
                                             <NavLink to={`/pastes/${paste._id}`}>
                                                    View
                                              </NavLink>
                                        </button>
                                        <button onClick={()=>handleDelete(paste._id)}>
                                            
                                            Delete
                                        </button>
                                        <button onClick={() => {navigator.clipboard.writeText(paste?.content)
                                            toast.success("Copied to clipboard")
                                        }}>
                                            Copy
                                        </button>
                                        <button>
                                            Share
                                        </button>
                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>
                                </div>
                            )
                        }
                    )
                }

            </div>
        </div>
    )
}

export default Paste
