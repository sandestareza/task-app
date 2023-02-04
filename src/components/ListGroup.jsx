import React from 'react'
import { FaArrowRight, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

function ListGroup({onEdit, onDelete, ordering, onMouseLeave, length, onMoveLeft, onMoveRigth}) {

    return (
        <div className="list-group absolute z-50 dark:bg-gray-500 dark:border-gray-400 dark:text-zinc-100" onMouseLeave={()=>onMouseLeave()}>
            <ul>
                {
                    ordering !== 1 &&   
                    <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={()=>onMoveLeft()}>
                        <span><FaArrowLeft /></span>
                        <span>Move Left</span>
                    </li>
                }
                {
                   ( length !== 1 && ordering !== length) &&
                    <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={()=>onMoveRigth()}>
                        <span><FaArrowRight /></span>
                        <span>Move Right</span>
                    </li>
                }
                <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={()=>onEdit()}>
                    <span><FaEdit /></span>
                    <span>Edit</span>
                </li>
                <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={()=>onDelete()}>
                    <span><FaTrash /></span>
                    <span>Delete</span>
                </li>
            </ul>
        </div>
    )
}

export default ListGroup