import React from "react";


function Error ({ message }){
    return(
        <div className="itemls-fullpage-text">
            <p>{message}</p>
        </div>
    );
}

Error.defaultProps = {
    message: "Sorry, a server error occurred. Please Try."
};

export default Error;