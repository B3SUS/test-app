import {useDispatch} from "react-redux";
import {addItemOption, removeItemOption} from "../redux/slices/testAppSlice";
import {useState} from "react";

const DeleteOverlay = ({deleteVisibility, setDeleteVisibility, selectedItem}) =>{

    const dispatch = useDispatch()
    const handleDeleteOption = () =>{
        dispatch(removeItemOption(selectedItem))
        setDeleteVisibility(false)
    }


    return(
        <div className={`fixed z-50 rounded-[15px] border-black-500 p-[15px] left-[30px] bg-gray-500 mt-[200px] flex gap-[30px] ${deleteVisibility ? 'visible' : 'hidden'}`}>
            <button onClick={handleDeleteOption}>Confirm</button>
            <button onClick={()=> setDeleteVisibility(false)}>Abort</button>
        </div>
    )
}

export default DeleteOverlay