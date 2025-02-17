import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchItemsData = createAsyncThunk(
    'testApp/FetchItemsData',
    async (_,{dispatch})=>{
        const data = await axios.get('https://67b329b7bc0165def8d0238e.mockapi.io/items')

        dispatch(setItemsOptions(data))
    }
)

const initialState={
    itemsOptions: JSON.parse(localStorage.getItem('itemsOptions')) || []
}

export const testAppSlice = createSlice({
    name: 'testApp',
    initialState,
    reducers:{
        setItemsOptions(state, action){
            state.itemsOptions = action.payload
            localStorage.setItem('itemsOptions', JSON.stringify((state.itemsOptions)))
        },
        addItemOption(state, action){
            state.itemsOptions.push(action.payload)
            localStorage.setItem('itemsOptions', JSON.stringify(state.itemsOptions))
        },
        removeItemOption(state, action){
            state.itemsOptions = state.itemsOptions.filter(item => item.id !== action.payload)
            localStorage.setItem('itemsOptions', JSON.stringify((state.itemsOptions)))
        },
        addComment(state, action){
            const {productId, comment} = action.payload
            const product = state.itemsOptions.find(item => item.id === productId)
            if(product){
                if (!product.comments){
                    product.comments = []
                }
                product.comments.push(comment)
                localStorage.setItem('itemsOptions', JSON.stringify(state.itemsOptions))
            }
        },
        removeComment(state,action){
            const {productId, commentId} = action.payload
            const product = state.itemsOptions.find(item => item.id === productId)
            if(product){
                product.comments = product.comments.filter(
                    (comment) => comment.date !== commentId
                )
                localStorage.setItem('itemsOptions', JSON.stringify(state.itemsOptions))
            }
        }
    }
})
export const{
    setItemsOptions,
    addItemOption,
    removeItemOption,
    addComment,
    removeComment
} = testAppSlice.actions

export default testAppSlice.reducer