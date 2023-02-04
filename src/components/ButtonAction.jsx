import React from 'react'
import PropTypes from 'prop-types'

const ButtonAction = ({children, type, className, onClick, disabled}) => {

    if (type === 'submit') {
        return (
            <button 
                type={type} 
                className={className}
                disabled={disabled}
            >
                { children }
            </button>
        )
    }

    return (
        <button 
            type={type} 
            className={className} 
            onClick={(e)=>onClick(e)}
            disabled={disabled}
        >
            { children }
        </button>
    )
}

ButtonAction.propTypes = {
    className : PropTypes.string,
    onClick : PropTypes.func,
    disabled : PropTypes.bool
}

ButtonAction.defaultProps = {
    className : 'btn-add',
    disabled : false,
    type : 'button'
}

export default ButtonAction