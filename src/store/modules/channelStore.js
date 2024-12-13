import { createSlice } from '@reduxjs/toolkit'

const ChannelStore = createSlice({
    name: 'channel',
    //创建一个状态
    initialState: {
        channelList: [],
    },
    // 修改状态同步方法
    reducers: {
        setList: (state, action) => {
            state.channelList = action.payload
        }
    }
})
// 按需导出{ setList }方法
export const { setList } = ChannelStore.actions
//设置异步请求
export const getList = () => {
    return async (dispatch) => {
        const res = await fetch('http://localhost:3000/article/list', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resJson = await res.json()
        dispatch(setList(resJson.data.list))
    }
}
// 默认导出reducer
export default ChannelStore.reducer