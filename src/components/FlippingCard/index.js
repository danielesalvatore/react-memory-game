import React from 'react';
import ReactCardFlip from 'react-card-flip';
import {CARD_FLIP_SPEED} from '../../config'
import PropTypes from 'prop-types';

const FlippingCard = ({isFlipped, className, flipSpeedBackToFront = CARD_FLIP_SPEED, flipSpeedFrontToBack = CARD_FLIP_SPEED, Front, Back}) =>
    (<div className={className}>
        <ReactCardFlip
            isFlipped={isFlipped}
            flipSpeedBackToFront={flipSpeedBackToFront}
            flipSpeedFrontToBack={flipSpeedFrontToBack}
        >
            {Front}
            {Back}
        </ReactCardFlip>
    </div> );

FlippingCard.propTypes = {
    isFlipped: PropTypes.bool,
    className: PropTypes.string,
    flipSpeedBackToFront:  PropTypes.number,
    flipSpeedFrontToBack:  PropTypes.number
};

export default FlippingCard;
