import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import * as actions from './actions'

import {
    getScores,
    getErrorMessage,
    getIsFetching,
} from './selectors';

class Scores extends Component {

    fetchScoresIfNeeded() {
        const {scores, fetchScores} = this.props;

        if (!scores) {
            fetchScores();
        }
    }

    componentDidMount() {
        this.fetchScoresIfNeeded();
    }

    componentDidUpdate() {
        this.fetchScoresIfNeeded();
    }

    renderTableRow(row, index) {
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.time}</td>
            <td>{row.moves}</td>
        </tr>)
    }

    render() {

        const {scores, isFetching, errorMessage} = this.props;

        if (!!isFetching) {
            return <Loading/>
        }

        if (!!errorMessage) {
            return <ErrorMessage message={errorMessage}/>
        }

        if (!scores || (scores && !scores.length)) {
            return <p>Be the first to play!</p>
        }

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Moves</th>
                </tr>
                </thead>
                <tbody>

                {scores.map(this.renderTableRow)}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        scores: getScores(state),
        isFetching: getIsFetching(state),
        errorMessage: getErrorMessage(state)
    }
};

// Scores.propTypes = {
//     fetchScores: PropTypes.func.isRequired,
//     checkingMatchingscores: PropTypes.bool.isRequired,
//     scores: PropTypes.arrayOf(PropTypes.shape({
//         matched: PropTypes.bool.isRequired,
//         isFlipped: PropTypes.bool.isRequired,
//         id: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//     })),
//     isFetching: PropTypes.bool.isRequired,
//     errorMessage: PropTypes.string,
// };

export default connect(
    mapStateToProps,
    actions
)(Scores)
