import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import Form from './form';
import Scores from '../Scores'
import moment from 'moment';
import {submitVictory, close} from './actions'
import FlippingCard from '../../components/FlippingCard'
import {Row, Col, Button} from 'react-bootstrap'
import './css/index.css'

class MyModal extends Component {

    getMatchDuration() {

        const {status} = this.props;
        const {startAt, finishAt} = status;
        return moment.duration(moment(finishAt).diff(moment(startAt))).asSeconds();


    }

    onSubmit(payload) {
        const {status, onSubmit} = this.props;
        const time = this.getMatchDuration();

        onSubmit({...payload, time, moves: status.moves});
    }

    onPlayAgain() {

        const {onReset, close} = this.props;

        onReset();
        close();

    }

    render() {
        const {isOpen, close, status = {},} = this.props;
        const {moves} = status;
        const time = this.getMatchDuration();

        return (
            <Modal
                isOpen={isOpen}
                contentLabel="Modal"
            >
                <Row>
                    <Col xs={12} className="text-center">

                        <h1>Congratulations!
                            <Button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={close}
                            >
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </h1>

                        <p>You completed the game in {`${time}`} seconds with {`${moves}`} moves.</p>

                        <FlippingCard
                            className="card-holder center-block"
                            isFlipped={status.victorySubmitted}
                            Front={<Form key="front"
                                         onSubmit={this.onSubmit.bind(this)}
                                         onCancel={close}
                            />}
                            Back={<div key="back">
                                <Scores/>

                                <Button
                                    type="button"
                                    className="close pull-left"
                                    aria-label="Reset"
                                    onClick={this.onPlayAgain.bind(this)}>Play again!</Button>

                                <Button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={close}>Close</Button>
                            </div>}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }
}

const onSubmit = (payload) => (dispatch) => {
    submitVictory({payload, dispatch});
};

MyModal = connect(
    undefined,
    {onSubmit, close}
)(MyModal);

export default MyModal;
