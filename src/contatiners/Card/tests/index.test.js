import React from 'react';
import Card from '../index'
import renderer from 'react-test-renderer';

describe('Card', () => {

    const onClick = () => {
        console.log();
    };
    const model = {
        matched: false,
        isFlipped: false,
        id: "fake",
        image: "http://myimg.com"
    };

    it('should match snapshot', () => {
        const tree = renderer.create(<Card onClick={onClick} model={model}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});