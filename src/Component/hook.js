//自定义hook函数，封装可复用功能，以use开头
import { useState } from 'react';
//自定hook函数
/**
 * 1.hook函数只能在组件内部使用
 * 2. 不能再使用条件语句，循环语句，嵌套函数定义等
 */
function UseMyToogle() {
    const [state, setState] = useState(true)
    function toggle() {
        setState(!state)
    }
    return [state, toggle]
}

export const MyHook = function () {
    //使用
    const [state, toggle] = UseMyToogle()
    return (
        <div>
            {state && <div>自定hook显示隐藏元素</div>}
            <button type='button' onClick={toggle}>显示隐藏以上元素</button>
        </div>
    )
}