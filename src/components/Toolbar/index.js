import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap'
import moment from 'moment'

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.state = {elapsed: 0};
    }

    updateTimer() {

        const {status = {}} = this.props;
        const {elapsed} = status;

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            this.setState({
                elapsed: moment(elapsed).diff(moment())
            })
        }, 1000);

    }

    componentDidUpdate() {
        //this.updateTimer();
    }

    componentDidMount() {
        // if(this.refs.root) {
        //     this.updateTimer();
        // }
    }

    render() {
        const {onRestart, status} = this.props;
        const {elapsed} = this.state;

        return ( <div ref="root" className="center-block">

            <p><strong>Elapsed Time:</strong> {elapsed} </p>
            <p><strong>Matched cards:</strong> {status.matchedCardsAmount}</p>

            <Button onClick={onRestart} className="center-block">
                <Glyphicon glyph=" glyphicon glyphicon-refresh"/>
            </Button>

        </div>);
    }
}

export default Toolbar;

