import React, {Component} from 'react';
import {Panel, Image} from 'react-bootstrap'
import PropTypes from 'prop-types';
import "./css/index.css"
import FlippingCard from '../../components/FlippingCard';

class Card extends Component {

    handleClick() {
        const {model, onClick} = this.props;

        if (!!model.isFlipped) {
            onClick(model.id);
        }

    }

    render() {
        const {model} = this.props;

        return (
            <FlippingCard
                className="card-holder"
                isFlipped={model.isFlipped}
                Front={<Panel key="front" onClick={this.handleClick.bind(this)}><Image src={model.image}/>
                </Panel>}
                Back={<Panel key="back" onClick={this.handleClick.bind(this)}/>}
            />
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
