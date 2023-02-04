import React from 'react'

function Loading({darktext, darkbg}) {
    return (
        <div className='w-full h-screen p-0 m-0'>
            <div className='wrapper'>
                <div className={`circle ${darkbg}`}></div>
                <div className={`circle ${darkbg}`}></div>
                <div className={`circle ${darkbg}`}></div>
                <div className='shadows'></div>
                <div className='shadows'></div>
                <div className='shadows'></div>
                <span className={darktext}>Loading</span>
            </div>
        </div>
    )
}

export default Loading