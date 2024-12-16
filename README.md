# react-basic

## 创建项目

```shell
npx create-react-app react-basic
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
        <div style={{ color: 'red' }}> 22222</div>
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
