import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap'
import PropTypes from 'prop-types';

class Board extends Component {

    createItem(item, index) {

        const {Item, onItemClick} = this.props;

        return ( <Col key={index} sm={3} xs={3}>
            <Item model={item} onClick={onItemClick}/>
        </Col>)
    }

    render() {

        const {items} = this.props;

        return (
            <Row>
                {items.map(this.createItem.bind(this))}
            </Row>
        );
    }
}

Board.propTypes = {
    onItemClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        matched: PropTypes.bool.isRequired,
        isFlipped: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })),
    Item: PropTypes.func.isRequired,
};

export default Board;
