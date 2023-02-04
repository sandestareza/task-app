import React from 'react'
import PropTypes from 'prop-types'

function ProgressBar({percentage, color}) {


    return (
        <div className='w-full bg-gray-200 rounded-full h-3.5'>
            <div className={`h-3.5 ${color} dark:bg-zinc-700 rounded-full transition-all duration-500 ease-in`} style={{width : percentage+'%'}}></div>
        </div>
    )
}

ProgressBar.propTypes = {
    percentage : PropTypes.number.isRequired,
    color : PropTypes.string.isRequired
}


export default ProgressBar