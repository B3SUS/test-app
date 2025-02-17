import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setItemsOptions} from "../redux/slices/testAppSlice";

const Sort = () =>{
    const dispatch = useDispatch()

    const {itemsOptions} = useSelector((state) => state.testApp)

    const [sortParam, setSortParam] = useState('name')

    const sortedItems = [...itemsOptions].sort((a,b)=>{
        if (sortParam === 'name'){
            return a.name.localeCompare(b.name)
        }
        if(sortParam === 'count'){
            return a.count - b.count;
        }
        if(sortParam === 'size'){
            return a.size.width * a.size.height - b.size.width * b.size.height
        }
    })

    const handleSortChange = (e) =>{
        setSortParam(e.target.value)
        dispatch(setItemsOptions(sortedItems))
    }

    return(
        <div>
            <select value={sortParam} onChange={handleSortChange}>
                <option value='name'>Name</option>
                <option value='count'>Count</option>
                <option value='size'>Size</option>
            </select>
        </div>
    )
}
export default Sort