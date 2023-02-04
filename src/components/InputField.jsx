import React from 'react'
import PropTypes from 'prop-types'

function InputField({label, type, className, onChange, disabled, field}) {
    return (
        <div className="form-group mt-5">
            <label className="form-label -mb-2">{label}</label>
            <input 
                {...field}
                type={type} 
                className={className} 
                onChange={(e)=>onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

InputField.propTypes = {
    className : PropTypes.string,
    onChange : PropTypes.func.isRequired,
    type : PropTypes.string,
    disabled : PropTypes.bool,
    field : PropTypes.object.isRequired
}

InputField.defaultProps = {
    className : 'form-control dark:bg-gray-500 dark:border-gray-400 focus:dark:outline-gray-100',
    disabled : false,
    type : 'text',
}

export default InputField