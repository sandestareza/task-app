import React, { useRef, useState } from 'react'
import { FaCheckCircle} from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

import ProgressBar from './ProgressBar'
import ListGroup from './ListGroup';

function CardItems({listTodos, ordering, length, item, showModalEdit, onDelete, listItems, setListItems, onMoveLeft, onMoveRigth}) {
    
    const card = useRef(null)
     
    const [visibleMenu, setVisibleMenu] = useState(false)

    const handleOnDragStart = e => {
        
        e.dataTransfer.setData("data", JSON.stringify(item))  
    }

    const handleOnDragEnd = e => {
        if (e.dataTransfer.dropEffect === 'copy') {
            const temp = listItems.filter(val =>  val.id !== item.id)
            setListItems(temp)
        }
    }

    const handleOnMoveLeft = () => {
        const temp = listItems.filter(val =>  val.id === item.id)
        const order = listTodos.filter(val=> val.ordering === ordering - 1)
        
        onMoveLeft(temp, order)
    }

    const handleOnMoveRigth = () => {
        const temp = listItems.filter(val =>  val.id === item.id)
        const order = listTodos.filter(val=> val.ordering === ordering + 1)

        onMoveRigth(temp, order)
    }

    return (
        <div ref={card}
            className='bg-gray-100 border border-gray-200 mt-3 mx-5 rounded py-3 px-5 dark:bg-gray-500 dark:border-gray-400 dark:text-zinc-100' 
            draggable="true" id={`dragtarget_${item.id}`}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
            >
            <div className='flex flex-col gap-3'>
                <span className='text-sm font-medium'>{item.name}</span>
                <div className='border border-dashed'></div>
                <div className='flex justify-between items-center gap-x-5'>
                    <ProgressBar 
                        color='bg-teal-900'
                        percentage={item.progress_percentage}
                    />
                    {
                        item.progress_percentage === 100 ?
                        <FaCheckCircle className='text-teal-900 text-xl'/>
                        :
                        <span className='text-slate-600 font-semibold dark:text-zinc-100'>{item.progress_percentage}%</span>
                    }
                    <div className='relative'>
                        <button type='button' onClick={()=>setVisibleMenu(!visibleMenu)}>
                            <HiDotsHorizontal className='text-slate-800 text-2xl dark:text-zinc-100'/>
                        </button>
                        {
                            visibleMenu &&
                            <ListGroup 
                                ordering={ordering}
                                length={length}
                                onEdit={()=>{
                                    setVisibleMenu(false)
                                    showModalEdit()
                                }}
                                onDelete={()=>onDelete()}
                                onMouseLeave={()=>setVisibleMenu(false)}
                                onMoveLeft={()=>handleOnMoveLeft()}
                                onMoveRigth={()=>handleOnMoveRigth()}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItems