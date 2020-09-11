import { Beer } from '../components/Beer.jsx';
import React from 'react';
import { shallow } from 'enzyme';

const mockProps = {
    name: 'PropTypes.string',
    description: 'PropTypes.string',
    tips: 'PropTypes.string',
    by: 'PropTypes.string',
    firstBrewed: 'PropTypes.string',
    image: 'PropTypes.string',
    volume: {
        unit: 'string', value: 23
    },
    foodPairing: [],
    ingredients: {
        malt: [{
            name: 'name',
            amount: {
                value: 10,
                unit: 'liter',
            },
        }],
        hops: [{
            name: 'name',
            attribute: 'attribute',
            amount: {
                value: 10,
                unit: 'liter',
            },
        }],
    },
    method: {
        fermentation: {
            temp: {
                value: 10,
                unit: 'liter,'
            },
        },
        mash_temp: [{
            temp: {
                value: 10,
                unit: 'liter,'
            },
        }]
    },
}

describe('Beers test', () => {

    it('should render properly', () => {
        const wrapper = shallow(<Beer {...mockProps}/>)
        expect(wrapper).toMatchSnapshot();
    })


})