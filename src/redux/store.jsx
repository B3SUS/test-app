import { configureStore } from '@reduxjs/toolkit'
import testAppReducer from './slices/testAppSlice'

const store = configureStore({
    reducer: {
        testApp: testAppReducer,
    }
})

export default store;