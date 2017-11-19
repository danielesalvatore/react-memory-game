import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip'
import {Image} from 'react-bootstrap'
import cardBack from './images/back.jpg';
import PropTypes from 'prop-types';

const styles = {
    card: {
        border: '1px solid #eeeeee',
        borderRadius: '3px',
        padding: '15px',
        width: '250px'
    }
};

class Card extends Component {

    handleClick() {
        const {model, flipCard, checkMatchingCards} = this.props;

        if (model.isFlipped) {
            flipCard(model.id);
            checkMatchingCards();
        }

    }

    render() {
        const {model} = this.props;

        return (
            <ReactCardFlip isFlipped={model.isFlipped}>
                <div key="front" onClick={this.handleClick.bind(this)} style={styles.card}>
                    <Image src={model.image}/>
                </div>

                <div key="back" onClick={this.handleClick.bind(this)} style={styles.card}>
                    <Image src={cardBack}/>
                </div>
            </ReactCardFlip>

        );
    }
}

Card.propTypes = {
    flipCard: PropTypes.func.isRequired
};

export default Card;
