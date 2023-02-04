import React from 'react'
import PropTypes from 'prop-types'

function InputTextArea({label, className, onChange, disabled, field}) {
    return (
        <div className="form-group mt-5">
            <label className="form-label">{label}</label>
            <textarea 
                {...field}
                className={className} 
                onChange={(e)=>onChange(e.target.value)} 
                disabled={disabled} rows="4">                    
            </textarea>
        </div>
    )
}

InputTextArea.propTypes = {
    className : PropTypes.string,
    onChange : PropTypes.func.isRequired,
    disabled : PropTypes.bool,
    field : PropTypes.object.isRequired
}

InputTextArea.defaultProps = {
    className : 'form-control dark:bg-gray-500 dark:border-gray-400 focus:dark:outline-gray-100',
    disabled : false
}

export default InputTextArea