import { useState } from 'react'
function Aelem(props) {
    let textValue = '我是A组件中的值，要修改B组件中的值'
    return (
        <div>
            <button type='button' onClick={() => props.onPass(textValue)}>这是A组件</button>
        </div>
    )
}
function Belem(props) {
    return (
        <div>
            <h1>兄弟组件传递消息：{props.value}</h1>
        </div>
    )
}

export const APassB = function () {
    const [value, setValue] = useState('通信兄弟组件')
    function Parent(text) {
        console.log('接收子组件消息：', text)
        setValue(text)
    }
    return (
        <div>
            <Aelem onPass={Parent} />
            <Belem value={value} />
        </div>

    )
}