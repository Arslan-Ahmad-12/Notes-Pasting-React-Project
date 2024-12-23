import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
  },
  reducers: {
   
    addToPaste: (state, action) => {
      const paste=action.payload;
      //adding check is paste already exist
      //---
      state.pastes.push(paste);
      localStorage.setItem("pastes",
        JSON.stringify(state.pastes));
      
      toast.success("Paste created Successfully!");
      
      
    },
    updateToPaste: (state, action) => {
        const paste=action.payload
        const index=state.pastes.findIndex((item)=>item._id===paste._id)
        if(index>=0){
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Updated")
        }
      
    },
    resetAllPaste: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes")
    },
    removeFromPaste: (state, action) => {
      const pasteId=action.payload;
      console.log("pasted")
      console.log(pasteId)
      const index=state.pastes.findIndex((item)=>item._id===pasteId)
      if (index>=0) {
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes))
        toast.success("Paste Deleted")
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste,removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer