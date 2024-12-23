import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';


const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");

    const allPaste = useSelector((state) => state.paste.pastes);

    const dispatch = useDispatch();

    useEffect(() => {
        if (pasteId) {
            const paste=allPaste.find((p)=>p._id===pasteId)
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])


    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toString(),
        }


        if (pasteId) {
            //update
            dispatch(updateToPaste(paste));
        }
        else {
            //create
            dispatch(addToPaste(paste));

        }

        // after updation and creation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div >
            <div className='flex flex-row gap-7 place-content-between'>
                <input className='p-2 rounded-2xl mt-2 w-[67%] pl-4'
                    type="text"
                    placeholder='enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <button className='p-2 rounded-2xl mt-2'
                    onClick={createPaste}>
                    {
                        pasteId ? "Update my Paste"
                            : "Create my Paste"
                    }
                </button>
            </div>

            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[500px] p-4'
                    value={value}
                    placeholder='enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20} />
            </div>

        </div>
    )
}

export default Home
