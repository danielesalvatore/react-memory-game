import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip'
import {Image} from 'react-bootstrap'
import cardBack from './images/back.jpg';
import {CARD_FLIP_SPEED} from '../../config'
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
        const {model, onClick} = this.props;

        if (model.isFlipped) {
            onClick(model.id);
        }

    }

    render() {
        const {model} = this.props;

        return (
            <ReactCardFlip
                isFlipped={model.isFlipped}
                flipSpeedBackToFront={CARD_FLIP_SPEED}
                flipSpeedFrontToBack={CARD_FLIP_SPEED}>

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
    onClick: PropTypes.func.isRequired,
    model: PropTypes.shape({
        matched: PropTypes.bool.isRequired,
        isFlipped: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })
};

export default Card;
