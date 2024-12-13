import { configureStore } from '@reduxjs/toolkit'
//导入子模块的reducer
import counterReducer from './modules/counterStore'
import channelReducer from './modules/channelStore'
const store = configureStore({
    reducer: {
        counter: counterReducer,
        channel: channelReducer
    },
})
export default store