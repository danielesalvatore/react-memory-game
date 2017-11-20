import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip'
import {Panel, Image} from 'react-bootstrap'
import {CARD_FLIP_SPEED} from '../../config'
import PropTypes from 'prop-types';
import "./css/index.css"


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

            <div className="card-holder">
                <ReactCardFlip
                    isFlipped={model.isFlipped}
                    flipSpeedBackToFront={CARD_FLIP_SPEED}
                    flipSpeedFrontToBack={CARD_FLIP_SPEED}
                >

                    <Panel key="front" onClick={this.handleClick.bind(this)} >
                        <Image src={model.image} />
                    </Panel>

                    <Panel key="back" onClick={this.handleClick.bind(this)} />

                </ReactCardFlip>
            </div>

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
