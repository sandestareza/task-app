import React from 'react'
import PropTypes from 'prop-types'
import {FiSave} from 'react-icons/fi'

function ModalForm(props) {
    return (
        <div className='bg-slate-900 bg-opacity-80 top-0 left-0 fixed flex items-center justify-center transition-opacity duration-500 ease-in-out z-50 w-full h-full'>
            <div className="card dark:bg-gray-500 dark:border-gray-400 dark:text-zinc-100">
                <div className="card-header border-b border-dashed">
                    <div className="card-title">
                        <span className="font-bold">{props.title}</span>
                    </div>
                </div>    
                <form onSubmit={props.onSubmit}>
                    <div className="card-body">
                        { props.children }
                    </div>
                    <div className="card-footer">
                        <button type='reset' onClick={props.resetForm} className="btn-cancel dark:bg-gray-600 dark:border-gray-700 hover:dark:bg-gray-500">Cancel</button>
                        <button type='submit' className="btn-save dark:bg-teal-700 hover:dark:bg-teal-900 dark:border-teal-900"><FiSave className="mr-1"/>Save</button>
                    </div>
                </form>            
            </div>
        </div>
        
    )
}

ModalForm.propTypes = {
    title : PropTypes.string.isRequired,
    onSubmit : PropTypes.func.isRequired
}

export default ModalForm