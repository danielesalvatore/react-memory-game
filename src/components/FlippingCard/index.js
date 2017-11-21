import React from 'react';
import ReactCardFlip from 'react-card-flip';
import {CARD_FLIP_SPEED} from '../../config'

const FlippingCard = ({isFlipped, flipSpeedBackToFront = CARD_FLIP_SPEED, flipSpeedFrontToBack = CARD_FLIP_SPEED, Front, Back}) =>
    ( <ReactCardFlip
        isFlipped={isFlipped}
        flipSpeedBackToFront={flipSpeedBackToFront}
        flipSpeedFrontToBack={flipSpeedFrontToBack}
    >

        {Front}
        {Back}
    </ReactCardFlip>);

export default FlippingCard;
