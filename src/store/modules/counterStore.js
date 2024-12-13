import { createSlice } from '@reduxjs/toolkit'

const CounterStore = createSlice({
    name: 'counter',
    //创建一个状态
    initialState: {
        value: 0,
    },
    // 修改状态同步方法
    reducers: {
        increment: (state) => {
            state.value += 1

        },
        decrement: (state) => {
            state.value -= 1

        },
        addToValue: (state, actions) => {
            state.value = actions.payload
        }
    }
})
// 按需导出{ increment, decrement }方法
export const { increment, decrement, addToValue } = CounterStore.actions
// 默认导出reducer
export default CounterStore.reducer