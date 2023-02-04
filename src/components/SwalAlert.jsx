import React from 'react'
import PropTypes from 'prop-types'

function SwalAlert(props) {
    return (
        <div className='bg-slate-900 bg-opacity-60 w-screen h-screen absolute flex items-center justify-center transition-opacity duration-500 ease-in-out'>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <span>Icon</span>
                        <span className="ml-8">{props.title}</span>
                    </div>
                    <div className="p-5">
                        <span>Icon Close</span>
                    </div>
                </div>
                <div className="card-body">
                    <p>
                        { props.body }
                    </p>
                </div>
                <div className="card-footer">
                    <button type='button' className="btn-add" onClick={()=>props.onClick()}>Oke</button>
                </div>
            </div>
        </div>
    )
}

SwalAlert.propTypes = {
    title : PropTypes.string.isRequired,
    body : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired
}

export default SwalAlert