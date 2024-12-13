import { useEffect, useState } from 'react'
export const MyUseEffect = function () {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0)
    /**
    *  1. 不传依赖项时，在第一次渲染时执行，组件每次渲染都会执行。
    *  2. 依赖项只传一个空数组时，在第一次渲染时执行。
    *  3. 如果传入依赖项，则依赖项发生变化时执行。
    */
    useEffect(() => {
        console.log('执行请求')

        async function getData() {
            try {
                const res = await fetch('http://localhost:3000/article/list', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const resJson = await res.json()
                setList(resJson.data.list)
            } catch (error) {
                console.error(error,'请求错误' )
            }
           
        }
        getData()

    }, [])
    useEffect(() => {
        console.log('count发生变化', count)
    }, [count])
    return (
        <div>
            <h1>useEffect 钩子函数</h1>
            <button type='button' onClick={() => setCount(count + 1)}>加{count}</button>
            <ul>
                {list.map((item, index) => <li key={item.id}>{item.title}</li>)}
            </ul>
        </div>
    )
}