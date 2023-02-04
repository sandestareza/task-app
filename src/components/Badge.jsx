import React from 'react'

function Badge(props) {
    
    return (
        <div className={`badge ${props.bgcolor} ${props.bdcolor} dark:bg-gray-700 dark:border-gray-500 dark:text-zinc-100`}>
            <span>Group {props.title}</span>
        </div>
    )
}

export default Badge