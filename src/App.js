import { useState, useRef, useEffect } from 'react';

import { Commint } from './commint';
import { APassB } from './Component/child';
import { ContextElem } from './Component/Context';
import { MyUseEffect } from './Component/MyUseEffect';
import { MyHook } from './Component/hook';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToValue } from './store/modules/counterStore';
import { getList } from './store/modules/channelStore';
function add(x, y) {
	return x + y;
}
const list = [
	{
		name: '张三',
	},
	{
		name: '李四',
	},
	{
		name: '王五',
	},
];

function isDom(key) {
	if (key === 1) {
		return <div>一张图</div>;
	} else if (key === 2) {
		return <div>三张图</div>;
	} else {
		return <div>无图</div>;
	}
}
//创建组件
function Button() {
	// 组件逻辑
	return <button type="button">自定义组件</button>;
}
//子组件
function Child(props) {
	console.log(props);
	return <div>子组件接收消息:{props.name}</div>;
}
//子传父组件
function Parent({ ParentFunc, ParentText }) {
	let childData = '我将要传递给父组件';
	return (
		<div>
			<div>我是父组件数据：{ParentText}</div>
			<div>
				<button type="button" onClick={() => ParentFunc(childData)}>
					我是子组件按钮
				</button>
			</div>
		</div>
	);
}
function App() {
	//useDispatch 钩子函数，用于派发action
	const dispatch = useDispatch();
	const value = useSelector((state) => state.counter.value);
	const channelList = useSelector((state) => state.channel.channelList);
	// 获取异步数据
	useEffect(() => {
		dispatch(getList());
	}, [dispatch]);
	// useState 钩子函数,不能在顶层调用只能在函数组件中调用
	/**
	 * 1. state:定义状态
	 * 2. setState:更新状态方法，接收一个新的状态值
	 * 3. useState:这个参数就是状态的初始值
	 */
	const [state, setState] = useState(0);
	const [obj, setObj] = useState({
		name: '张三',
		age: 18,
	});
	const handleClick = (e, text) => {
		console.log(e, '事件对象');
		console.log(text, '自定义传参');
	};
	const [inputValue, setValue] = useState('空');
	//获取DOM节点
	const inputRef = useRef(null);
	//通过点击执行该函数获取inputdom节点
	const getDom = () => {
		console.dir('input节点对象：', inputRef.current);
		console.log(inputRef.current.value);
	};
	const [ParText, setParText] = useState('ParentText');
	const count1 = 0;
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
				{list.map((item, index) => (
					<li key={index}>{item.name}</li>
				))}
			</ul>
			{/* 逻辑与 */}
			{count1 > 10 && <div>大于10</div>}
			{/* 条件语法 */}
			{count1 > 10 ? <div>大于10</div> : <div>小于10</div>}
			{/* 条件渲染,通过函数进行渲染复杂的结构 */}
			{isDom(1)}
			{/* 事件绑定 */}
			<button onClick={(e) => handleClick(e, '我的自定义传参')}>点击按钮</button>
			{/* 调用组件 */}
			<Button />
			{/* 闭合调用 */}
			<Button></Button>
			{/* 受控组件 */}
			<button onClick={() => setState(state + 1)}>{state}点击</button>
			{/* 修改对象 */}
			<div>{obj.name}</div>
			<button onClick={() => setObj({ ...obj, name: '李四' })}>修改名字</button>
			{/* className控制样式 */}
			<div className={state > 10 ? 'red' : 'blue'}></div>
			{/* 点评 */}
			<Commint />
			{/* 受控表单绑定 */}
			<input type="text" value={inputValue} onChange={(e) => setValue(e.target.value)} />
			{/* 获取DOm
        1. 使用useref生成ref对象
        2. dom对象赋值给ref对象的current属性
       */}
			<input type="text" ref={inputRef} />
			<button onClick={getDom}>获取DOM</button>
			{/* 组件通信 */}
			{/* 
        可以向子组件传递任何数据，包括对象、数组、函数等，html模板
        子组件只能只读props属性，不能修改
        1. 父组件向子组件传递数据，在标签上设置属性
        2. 子组件接收数据，通过props接收
        3. 嵌套传递时默认在属性中children中接收
       */}

			<Child name="父组件传递的参数">
				<span>嵌套传递</span>
			</Child>
			{/* 子传父 */}
			<Parent
				ParentText={ParText}
				ParentFunc={(data) => {
					setParText(data);
					console.log('子组件通过该方法传递子组件参数给父组件中，并修改了父组件的数据');
				}}
			/>
			{/* 兄弟组件传递消息 */}
			{/* 
        1. 通过子传父的方式传递给父组件的一个状态变量
        2. 父组件通过该变量向兄弟组件传递消息
       */}
			<APassB />
			{/* Context跨层组件通信 */}
			<ContextElem />
			{/* UseEffect钩子函数 */}

			<MyUseEffect />
			{/* 自定义hook */}
			<MyHook />
			{/* Redux Toolkit 状态管理库 */}
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				计数器：{value}
				<button onClick={() => dispatch(decrement())}>-</button>
				{/* 传递参数： */}
				<button onClick={() => dispatch(addToValue(100))}>传递参数:100</button>
			</div>
			{/* Redux Toolkit异步获取数据 */}
			<ul>
				{channelList.map((item, index) => (
					<li key={index}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
