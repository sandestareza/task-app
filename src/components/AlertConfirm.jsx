import React from 'react'

function AlertConfirm(props) {
    return (
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
                <button className="btn-cancel">Cancel</button>
                <button className="btn-delete">{props.button}</button>
            </div>
        </div>
    )
}

export default AlertConfirm