import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap'
import moment from 'moment'

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.state = {elapsed: 0};
    }

    tick() {
        const {status = {}, victory} = this.props;
        const {startAt} = status;
        const elapsed = Math.floor(moment(moment()).diff(startAt) / 1000);

        if (!victory) {
            this.setState({elapsed})
        }

    }

    startInterval() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    stopInterval() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.startInterval();
    }

    componentWillUnmount() {
        this.stopInterval()
    }

    render() {
        const {onRestart, status} = this.props;
        const {elapsed} = this.state;

        return ( <div ref="root" className="center-block">

            <p><strong>Elapsed Time:</strong> {elapsed} </p>
            <p><strong>Matched cards:</strong> {status.matchedCardsAmount}</p>
            <p><strong>Moves:</strong> {status.moves}</p>

            <Button onClick={onRestart} className="center-block">
                <Glyphicon glyph=" glyphicon glyphicon-refresh"/>
            </Button>

        </div>);
    }
}

export default Toolbar;

