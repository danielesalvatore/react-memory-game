import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message}) =>
    (<div>
        <p><b>Ops... That's embarrassing...</b></p>
        <p>Error: {message}</p>
    </div>);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorMessage;
