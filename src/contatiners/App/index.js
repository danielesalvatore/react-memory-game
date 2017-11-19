import React, {Component} from 'react';
import {Grid} from 'react-bootstrap'
import Board from '../Board'
import {connect} from 'react-redux';
import {getCards, getErrorMessage, getIsFetching} from './selectors';
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import * as actions from './actions'

class App extends Component {

    fetchCards() {
        const {fetchCards} = this.props;

        if (typeof fetchCards === 'function') {
            fetchCards();
        }
    }

    componentDidMount() {
        const {cards} = this.props;

        if (!cards.length) {
            this.fetchCards();
        }
    }

    render() {

        const {cards, flipCard, isFetching, errorMessage, checkMatchingCards} = this.props;

        if (!!isFetching) {
            return <Loading/>
        }

        if (!!errorMessage) {
            return <ErrorMessage message={errorMessage}/>
        }

        return (
            <Grid>
                <Board cards={cards} flipCard={flipCard} checkMatchingCards={checkMatchingCards}/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: getCards(state),
        isFetching: getIsFetching(state),
        errorMessage: getErrorMessage(state)
    }
};

export default connect(
    mapStateToProps,
    actions
)(App)
