import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import Modal from '../Modal'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Smile from '../../components/Smile'
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

class App extends Component {

    fetchCards() {
        const {fetchCards} = this.props;

        fetchCards();
    }

    componentDidMount() {
        const {cards} = this.props;

        if (!cards.length) {
            this.fetchCards();
        }
    }

    onCardClick(id) {
        const {flipCard, checkMatchingCards, checkingMatchingCards} = this.props;

        if (!checkingMatchingCards) {
            flipCard(id);
            checkMatchingCards();
        }

    }

    render() {

        const {cards, isFetching, errorMessage, victory, waitingForPair, status} = this.props;

        if (!!isFetching) {
            return <Loading/>
        }

        if (!!errorMessage) {
            return <ErrorMessage message={errorMessage}/>
        }

        return (
            <Grid>
                <h1 className="text-center">Memory game</h1>
                <hr/>
                <Row>
                    <Col xs={3}>

                        <Smile victory={victory} waitingForPair={waitingForPair}/>

                        <hr/>

                        <Toolbar status={status} onRestart={this.fetchCards.bind(this)}/>

                    </Col>
                    <Col xs={9}>
                        <Board items={cards} Item={Card} onItemClick={this.onCardClick.bind(this)}/>
                    </Col>
                </Row>
                <hr/>
                <Footer/>

                <Modal isOpen={victory} status={status}/>

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
        status: getStatus(state)

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
