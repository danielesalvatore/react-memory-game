import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap'
import Card from '../Card'

class Board extends Component {

    createItem(card, index) {
        const {flipCard, checkMatchingCards} = this.props;
        return ( <Col key={index} sm={3} xs={3}>
            <Card model={card} flipCard={flipCard} checkMatchingCards={checkMatchingCards}/>
        </Col>)
    }

    render() {

        const {cards} = this.props;

        return (
            <Row>
                {cards.map(this.createItem.bind(this))}
            </Row>
        );
    }
}

export default Board;
