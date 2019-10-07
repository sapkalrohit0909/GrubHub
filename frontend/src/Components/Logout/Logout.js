import React from 'react';
import {withRouter} from 'react-router-dom';
var logout=(props)=>{
    localStorage.clear();
    props.history.push("/");
    return (
        <h1>Logged out</h1>
    );
}
export default withRouter(logout);

