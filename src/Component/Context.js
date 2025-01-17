import {  useContext, createContext } from 'react'
const MyContext = createContext();
function Aelem(props) {
    return (
        <div>
            <button type='button'>这是A组件</button>
        </div>
    )
}
function Belem(props) {
    const value = useContext(MyContext)

    return (
        <div>
            <h1>子组件获取刀Context值：{value}</h1>
        </div>
    )
}

export const ContextElem = function () {
    return (
        <MyContext.Provider value='我是MyContext中的值'>
            <Aelem />
            <Belem />
        </MyContext.Provider>

    )
}