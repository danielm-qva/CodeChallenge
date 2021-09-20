import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Loading = () => {
    return (
        <div className="loading">
            <FontAwesomeIcon className="loading-icon" icon={faClock} spin={true} />
            Loading
        </div>
    )
}

export default Loading