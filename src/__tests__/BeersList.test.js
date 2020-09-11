import { BeersList } from '../components/BeersList.jsx';
import React from 'react';
import { shallow } from 'enzyme';

import styles from '../styles/BeersList.module.css';

const mockProps = {
    beerCount: 6,
    beerList: [
        {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, {
            name: 'beer',
            contributed_by: 'someone',
            first_brewed: '2020'
        }, 
    ],
    per_page: 5,
    current_page: 1,
    createBeer: jest.fn(),
    goPreviousPage: jest.fn(),
    goNextPage: jest.fn(),
}

describe('BeersList test', () => {

    it('should render properly', () => {
        const wrapper = shallow(<BeersList {...mockProps} />)
        expect(wrapper).toMatchSnapshot();
    })

    it('should call the function createBeer() ', () => {
        const wrapper = shallow(<BeersList {...mockProps} />)

        wrapper.find('#'+styles.createBeer_button).simulate('click')

        expect(mockProps.createBeer).toHaveBeenCalled();
    })

    it('should call the function goPreviousPage() ', () => {
        const thisProps = {...mockProps, current_page: 2,}

        const wrapper = shallow(<BeersList {...thisProps} />)

        wrapper.find('#'+styles.goPreviousPage_button).simulate('click')

        expect(thisProps.goPreviousPage).toHaveBeenCalled();
    })

    it('should call the function goNextPage() ', () => {
        const wrapper = shallow(<BeersList {...mockProps} />)

        wrapper.find('#'+styles.goNextPage_button).simulate('click')

        expect(mockProps.goNextPage).toHaveBeenCalled();
    })

})