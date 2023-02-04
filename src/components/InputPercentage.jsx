import React from 'react'
import PropTypes from 'prop-types'

function InputPercentage({label, type, className, onChange, disabled, field}) {

    const handleChange = (val) => {        
        let result = val.replace(/\D/g, '')
        
        if (result < 0) result = 0;
        if (result >= 100) result = 100;
        
        onChange(result)
    } 

    return (
        <div className="form-group mt-5">
            <label className="form-label -mb-2">{label}</label>
            <input 
                {...field}
                type={type} 
                className={className} 
                onChange={(e)=>handleChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

InputPercentage.propTypes = {
    className : PropTypes.string,
    onChange : PropTypes.func.isRequired,
    type : PropTypes.string,
    disabled : PropTypes.bool,
    field : PropTypes.object.isRequired
}

InputPercentage.defaultProps = {
    className : 'form-control dark:bg-gray-500 dark:border-gray-400 focus:dark:outline-gray-100',
    disabled : false,
    type : 'text',
}

export default InputPercentage