import React, {Component} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap'
import Modal from '../Modal'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Smile from '../../components/Smile'
import Scores from '../Scores'
import Board from '../Board'
import Loading from '../../components/Loading'
import Footer from '../../components/Footer'
import Toolbar from '../../components/Toolbar'
import ErrorMessage from '../../components/ErrorMessage'
import * as actions from './actions'
import Card from '../Card'
import {
    getCards,
    getErrorMessage,
    getIsFetching,
    getCheckingMatchingCards,
    getVictory,
    getWaitingForPair,
    getStatus
} from './selectors';
import {getIsOpen} from "../Modal/selectors";
import {version} from '../../../package.json';

class App extends Component {

    fetchCards() {
        const {fetchCards} = this.props;

        fetchCards();
    }

    onCardClick(id) {
        const {flipCard, checkMatchingCards, checkingMatchingCards} = this.props;

        if (!checkingMatchingCards) {
            flipCard(id);
            checkMatchingCards();
        }

    }

    render() {

        const {cards, isFetching, errorMessage, victory, modalIsOpen, waitingForPair, status} = this.props;

        if (!!isFetching) {
            return <Loading/>
        }

        if (!!errorMessage) {
            return <ErrorMessage message={errorMessage}/>
        }

        return (
            <Grid>

                <h1 className="text-center">Memory game v{version}</h1>

                <hr/>

                <Row>

                    <Col xs={3}>

                        <Smile victory={victory} waitingForPair={waitingForPair}/>

                        <hr/>

                        <Toolbar status={status} victory={victory} onRestart={this.fetchCards.bind(this)}/>

                        <hr/>

                        <Scores/>

                    </Col>

                    <Col xs={9}>
                        {cards && <Board items={cards} Item={Card} onItemClick={this.onCardClick.bind(this)}/>}

                        {!cards && <Button onClick={this.fetchCards.bind(this)}> Start a match now!</Button>}

                    </Col>
                </Row>

                <hr/>

                <Footer/>

                <Modal isOpen={modalIsOpen} onReset={this.fetchCards.bind(this)} status={status}/>

            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: getCards(state),
        isFetching: getIsFetching(state),
        errorMessage: getErrorMessage(state),
        checkingMatchingCards: getCheckingMatchingCards(state),
        victory: getVictory(state),
        waitingForPair: getWaitingForPair(state),
        status: getStatus(state),
        modalIsOpen: getIsOpen(state)
    }
};

App.propTypes = {
    fetchCards: PropTypes.func.isRequired,
    checkingMatchingCards: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        matched: PropTypes.bool.isRequired,
        isFlipped: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })),
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

export default connect(
    mapStateToProps,
    actions
)(App)
