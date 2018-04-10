import React from 'react';

const RequestNotification = (props) => {
    const notificationType = props.notificationType === "success"
        ? "success"
        : "danger";

    if (props.remove) {
        props.cancelNotification();
    }
    
    return (
        <div className="text-center mb-4">
            <div className={"alert alert-" + notificationType} role="alert">
                {props.message}
            </div>
        </div>
    );
}

export default RequestNotification;