import React from "react";
import '../styles/index.css'

const Notification = (data) => {
    let notification = data.notification
    if (notification.message === null) {
        return null
    }

    return (
        <div className={notification.type}>
            {notification.message}
        </div>
    )
}

export default Notification