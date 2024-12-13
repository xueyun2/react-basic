import './css/commint.css'
import { useState,useRef } from 'react'
import commintData from './data/commint';
export const Commint = () => {
    const currentUserId = 3;
    const [list, setList] = useState(commintData)
    const [value, setValue] = useState('')
    const refElement = useRef(null)
    //发送点评
    const send = () => {

        if (value) {
            const newItem = {
                id: list.length + 1,
                text: value,
                likes: 0,
                user: {
                    id: currentUserId,
                },
            }
            setList([...list, newItem])
            setValue('')
            refElement.current.focus();
        }
    }
    //删除
    const del = (id) => {
        const newList = list.filter((item) => {
            return item.id !== id
        })
        setList(newList)
    }
    //点击排序
    const [tabData] = useState([{
        tab: 'latest',
        name: '最新',
    }, {
        tab: 'popular',
        name: '最热',
    }])
    const [currentIndex, setCurrentIndex] = useState('latest')
    const sort = (type) => {
        const newList = [...list]
        if (type === 'latest') {
            newList.sort((a, b) => {
                return b.id - a.id
            })
        } else if (type === 'popular') {
            newList.sort((a, b) => {
                return b.likes - a.likes
            })
        }
        setCurrentIndex(type);
        setList(newList)
    }
    return (
        <div className="review-container">
            <h1>点评功能</h1>

            {/*  排序选项  */}
            <div className="sort-options">
                {tabData.map((item) => {
                    return (
                        <button key={item.tab} id={`sort-${item.tab}`} className={currentIndex === item.tab ? 'active' : ''} onClick={() => sort(item.tab)}>{item.name}</button>
                    )
                })}

            </div>

            {/*  点评列表  */}
            <ul className="review-list" id="review-list">
                {/*  点评项示例  */}
                {list.map((item) => {
                    return (
                        <li className="review-item" key={item.id} data-likes={item.likes}>
                            <span className="review-text">{item.text}</span>
                            <span className="review-likes">{item.likes} 赞</span>
                            {currentUserId === item.user.id && <button className="delete-btn" onClick={() => del(item.id)}>删除</button>}
                        </li>
                    )
                })}
            </ul>

            {/* 添加点评 */}
            <div className="add-review">
                <textarea ref={refElement} value={value} onChange={(e) => setValue(e.target.value)} id="review-input" placeholder="写下你的点评..."></textarea>
                <button id="add-review-btn" onClick={send}>发送点评</button>
            </div>
        </div>

    )
}