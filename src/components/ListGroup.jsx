import React from 'react'
import { FaArrowRight, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

function ListGroup({onEdit, onDelete, onMouseLeave}) {

    return (
        <div className="list-group absolute z-50 dark:bg-gray-500 dark:border-gray-400 dark:text-zinc-100" onMouseLeave={()=>onMouseLeave()}>
            <ul>
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