import React from 'react';

const ErrorMessage = ({message}) =>
    (<div>
        <b>Ops... That's embarrassing...</b><br/>
        {message}
    </div>);

export default ErrorMessage;
