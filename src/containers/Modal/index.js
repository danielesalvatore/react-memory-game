import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import Form from './form';
import moment from 'moment';
import {submitVictory} from './actions'
import FlippingCard from '../../components/FlippingCard'
import {Row, Col} from 'react-bootstrap'
import './css/index.css'

class MyModal extends Component {

    onSubmit(payload) {
        const {status, onSubmit} = this.props;
        const {startAt, finishAt} = status;
        const time = moment.duration(moment(finishAt).diff(moment(startAt))).asSeconds();

        onSubmit({...payload, time})
    }

    render() {
        const {isOpen, status = {},} = this.props;
        const {startAt, finishAt} = status;
        const time = moment.duration(moment(finishAt).diff(moment(startAt))).asSeconds();

        return (

            <Modal
                isOpen={isOpen}
                contentLabel="Modal"
            >
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Congratulations!</h1>
                        <p>You completed the game in {`${time}`} seconds.</p>
                        <div className="card-holder center-block">
                            <FlippingCard
                                isFlipped={status.victorySubmitted}
                                Front={<Form key="front" onSubmit={this.onSubmit.bind(this)}/>}
                                Back={<div key="back">Ranking add button to close modal</div>}
                            />
                        </div>
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
    {onSubmit}
)(MyModal);

export default MyModal;
