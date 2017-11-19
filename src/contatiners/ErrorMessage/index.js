import React, {Component} from 'react';

class ErrorMessage extends Component {

    render() {
        const {message} = this.props;
        return (

            <div>
                <b>Ops... That's embarrassing...</b><br/>
                {message}
            </div>

        );
    }
}

export default ErrorMessage;
