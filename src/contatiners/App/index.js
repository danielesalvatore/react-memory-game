import React, {Component} from 'react';
import {Grid, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../../components/Header'
import Board from '../Board'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import * as actions from './actions'
import Card from '../Card'
import {
    getCards,
    getErrorMessage,
    getIsFetching,
    getCheckingMatchingCards,
    getVictory,
    getWaitingForPair
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

        const {cards, isFetching, errorMessage, victory, waitingForPair} = this.props;

        if (!!isFetching) {
            return <Loading/>
        }

        if (!!errorMessage) {
            return <ErrorMessage message={errorMessage}/>
        }

        return (
            <Grid>
                <Button onClick={this.fetchCards.bind(this)}> Restart </Button>
                <Board items={cards} Item={Card} onItemClick={this.onCardClick.bind(this)}/>
                <Header victory={victory} waitingForPair={waitingForPair}/>
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
        waitingForPair: getWaitingForPair(state)

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