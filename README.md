# react-basic

## 创建项目

```shell
pnpm create vite antd-demo
```

## 基础语法

```jsx
function App() {
    const count1 = 0;
    functon handleClick(e,msg){
        console.log('点击了按钮', e, msg);
    }
    
    return (
    <div className="App">
        {/* 字符串 */}
        {'Hello World'}
        {/* 变量 */}
        {count1}
        {/* 表达式 */}
        {count1 + 1}
        {/* 函数 */}
        {add(1, 2)}
        {/* 内联样式 */}
        <div style={{ color: 'red' }}>22222</div>
        {/* 列表渲染 */}
        <ul>
        {list.map((item, index) => <li key={index}>{item.name}</li>)}
        </ul>
        {/* 逻辑与 */}
        {count1 > 10 && <div>大于10</div>}
        {/* 条件语法 */}
        {count1 > 10 ? <div>大于10</div> : <div>小于10</div>}
        {/* 条件渲染,通过函数进行渲染复杂的结构 */}
        {isDom(1)}
        {/* 事件绑定 */}
        <button onClick={handleClick}>无需传参事件</button>
        <button onClick={(e) => handleClick(e, '我的自定义传参')}>点击按钮</button>
        
    </div>
    )
}
```

## useState 状态

> useState 钩子函数,不能在顶层调用只能在函数组件中调用

使用`useState`定义状态，`useState`接收一个参数作为初始值，返回一个数组，数组的第一个元素是状态的值，第二个元素是修改状态的方法

```jsx
import { useState } from 'react';
function App() {
    // 定义状态count和修改状态的方法setCount
    const [count, setCount] = useState(0);
    //定义对象
    const [obj, setObj] = useState({ name: '张三', age: 18 });
    //受控表单值和修改方法
    const [inputValue,setValue] = useState('');
    //修改count方法
    function handleClick() {
        setCount(count + 1);
    }
    //修改对象方法
    function editorSetObj() {
        setObj({...obj, name: '王大锤' });
    }
    return (
        <div className="App">
            <div>当前计数：{count}</div>
            <button onClick={handleClick}>点击按钮</button>
            <div>当前对象：{obj.name}</div>
            <button onClick={editorSetObj}>修改对象</button>
            {/* 受控表单绑定 */}
            <input type='text' value={inputValue} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
```

## useRef() 函数

 使用 `useRef()` 函数可以获取到 `DOM` 元素的引用。
 获取到的`DOM`元素存在在`current`属性上

 ```jsx
import { useRef } from 'react';
const inputRef = useRef(null);
function App() {
    // 定义useRef 函数,等待DOM渲染完成后获取DOM元素的引用
    const inputRef = useRef(null);
    function handleClick() {
        //通过inputRef.current.focus() 可以调用DOM元素的获取焦点的方法
        inputRef.current.focus();
    }
    return (
        <div className="App">
            <input type='text' ref={inputRef} />
            <button onClick={handleClick}>获取焦点</button>
        </div>
    )
}
 ```

## 组件通信

可以向子组件传递任何数据，包括对象、数组、函数等，`html`模板子组件只能只读`props`属性，不能修改

1. 父组件向子组件传递数据，在标签上设置属性
2. 子组件接收数据，通过`props`接收
3. 嵌套传递时默认在属性中`children`中接收
4. 所有组件首字母大写

### 父组件向子组件传递数据

```jsx
import { useState } from 'react';
//子组件
function Child(props) {
    return (
        <div>
            <div>当前计数：{props.count}</div>
            <div>
            {props.children}
            </div>
        </div>
    )
}
// 父组件
function App() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div className="App">
            <div>当前计数：{count}</div>
            <button onClick={handleClick}>点击按钮</button>
            <Child count={count} >
                <div>子组件</div>
            </Child>
        </div>
    )
}

```

### 子组件向父组件传递数据

子组件向父组件传递数据，需要在父组件中定义一个函数，子组件通过`props`接收函数，调用函数并传递数据

```jsx
import { useState } from 'react';
//子组件
function Child(props) {
    return (
        <div>
            <div>父组件数据：{props.ParText}</div>
            <button onClick={() => props.ParentFunc('子组件修改了父组件的数据')}>点击按钮</button>
        </div>
    )
}
// 父组件
function App() {
    const [ParText, setParText] = useState('这是父组件数据');
    return (
        <div className="App">
        <Child ParentText={ParText} ParentFunc={(data) => {
        setParText(data)
        console.log('子组件通过该方法传递子组件参数给父组件中，并修改了父组件的数据')
      }} />
      </div>
    )
}
```

### 兄弟组件通信

1. 通过子传父的方式传递给父组件的一个状态变量
2. 父组件通过该变量向兄弟组件传递消息
3. `Context`跨层组件通信

```jsx
import { useState } from 'react';
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
function App() {
    const [value, setValue] = useState('');
    return (
        <div className="App">
            <Aelem onPass={(data) => setValue(data)} />
            <Belem value={value} />
        </div>
    )
}
```

### Context 跨层组件通信

```jsx
import { useState, useContext, createContext } from 'react'
// 创建Context
const MyContext = createContext('默认值');
function Aelem(props) {
     //获取到Context的值
    const value = useContext(MyContext)
    return (
        <div>
           <h1>子组件获取刀Context值：{value}</h1>
        </div>
    )
}
function Belem(props) {
    //获取到Context的值
    const value = useContext(MyContext)
    return (
        <div>
            <h1>子组件获取刀Context值：{value}</h1>
        </div>
    )
}

 function App() {
    // MyContext.Provider 是一个组件，它可以将值注入到子组件。
    const [contextVal,setContextVal] = useState('我是MyContext中的值')
    return (
        <button onClick={()=>setContextVal('我被修改了')}>在顶层修改</button>
        <MyContext.Provider value={contextVal}>
            <Aelem />
            <Belem />
        </MyContext.Provider>

    )
}
```

## react-redux状态管理库

在多个组件都需要使用同一个状态时，可以使用`redux`状态管理库。

> 这里需要安装`@reduxjs/toolkit`配合使用

### 安装react-redux

```shell
pnpm install @reduxjs/toolkit react-redux
```

### 创建store

创建`store`模块：`store/modules/counterStore`

```jsx
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
```

将创建好`store`模块统一导入`index.js`由`configureStore`导出。
路径：`store/index.js`

```jsx
import { configureStore } from '@reduxjs/toolkit'
//导入子模块的reducer
import counterReducer from './modules/counterStore'
const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})
export default store
```

### 在入口文件中引入store

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
```

### 在组件中使用

```jsx
import { useSelector } from 'react-redux';
import { increment, decrement, addToValue } from './store/modules/counterStore';
function App(){
    const value = useSelector((state) => state.counter.value);
    return(
    <div>
        <button onClick={() => dispatch(increment())}>+</button>
        计数器：{value}
        <button onClick={() => dispatch(decrement())}>-</button>
        {/* 传递参数： */}
        <button onClick={() => dispatch(addToValue(100))}>传递参数:100</button>
    </div>
    )
}
```

## 路由

### 安装react-router-dom

```shell
pnpm install react-router-dom
````
