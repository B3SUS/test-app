import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemsData, removeItemOption} from "../redux/slices/testAppSlice";
import Overlay from "../components/Overlay";
import {Link} from "react-router-dom";
import DeleteOverlay from "../components/DeleteOverlay";
import Sort from "../components/Sort";

const MainPage = () =>{


    const dispatch = useDispatch();

    useEffect(()=>{
        if (!localStorage.getItem('itemsOptions')) dispatch(fetchItemsData())
    },[])

    const{
        itemsOptions
    } = useSelector((state)=>state.testApp)

    const [visible, setVisible] = useState(false)
    const [deleteVisibility, setDeleteVisibility] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)


    const handleClick = () =>{
        setVisible(!visible)
    }

    const handleDeleteClick = (id) => {
        setSelectedItem(id)
        setDeleteVisibility(!deleteVisibility)
    }

    const [filterOption, setFilterOption] = useState('name')

    return(
        <div className={'flex flex-col items-center mx-auto mt-[100px] w-screen gap-[10px]'}>
            <Overlay visible={visible} setVisible={setVisible}/>
            <DeleteOverlay deleteVisibility={deleteVisibility} setDeleteVisibility={setDeleteVisibility} selectedItem={selectedItem}/>
            <Sort/>
            <button onClick={handleClick} className={'bg-gray-500 w-[200px] h-[40px] rounded-[15px] text-white'}>
                Add item
            </button>
            <div className={'flex flex-wrap gap-[30px] w-[800px] mt-[60px]'}>
                {
                    itemsOptions.map((obj)=> (
                        <div className={'w-[200px] h-[150px]'}>
                            <Link to={`/product-page/${obj.id}`} className={'flex flex-col w-full gap-[10px] bg-blue-300 rounded-[20px] px-[20px] py-[10px] '}>
                                <p>Name: {obj.name} </p>
                                <p>Count: {obj.count}</p>
                            </Link>
                            <button className={'bg-gray-500 rounded-[20px] text-[25px] p-[5px] w-full'} onClick={() => handleDeleteClick(obj.id)}>delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default MainPage