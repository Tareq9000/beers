import { App } from '../components/App.jsx';
import React from 'react';
import { shallow } from 'enzyme';

describe('App test', () => {

  it('should render properly', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot();
  })

})