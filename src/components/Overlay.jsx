import {useDispatch} from "react-redux";
import {addItemOption} from "../redux/slices/testAppSlice";
import {useState} from "react";

const Overlay = ({visible, setVisible}) =>{

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [count, setCount] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const handleAddItem = (e) =>{
        e.preventDefault()
        if (!name || !imageUrl || !count || !weight || !width || !height){
            alert('Input everything')
            return
        }

        const newItem ={
            id: Date.now(),
            name,
            imageUrl,
            count: parseInt(count, 10),
            size:{
                width: parseInt(width, 10),
                height: parseInt(height, 10)
            },
            weight
        }

        dispatch(addItemOption(newItem))
        setName('')
        setImageUrl('')
        setCount('')
        setWidth('')
        setHeight('')
        setWeight('')
        setVisible(!visible)
    }

    const handleCloseOverlay = (e) =>{
        e.preventDefault()
        setName('')
        setImageUrl('')
        setCount('')
        setWidth('')
        setHeight('')
        setWeight('')
        setVisible(!visible)
    }

    return(
        <div className={`fixed z-50 rounded-[15px] border-black-500 p-[15px] top-0 left-0 bg-gray-500 ${visible ? 'visible' : 'hidden'}`}>
            <form className={'flex flex-col gap-[10px]'}>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={'input name'}/>
                <input required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder={'input imageUrl'}/>
                <input required value={count} onChange={(e) => setCount(e.target.value)} placeholder={'input count'}/>
                <input required value={width} onChange={(e) => setWidth(e.target.value)} placeholder={'input width'}/>
                <input required value={height} onChange={(e) => setHeight(e.target.value)} placeholder={'input height'}/>
                <input required value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={'input weight'}/>
                <div className={'flex flex-row gap-[10px]'}>
                    <button onClick={handleAddItem}>Add</button>
                    <button onClick={handleCloseOverlay}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default Overlay