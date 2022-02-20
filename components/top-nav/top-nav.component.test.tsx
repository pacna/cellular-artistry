import React from 'react';
import { TopNav } from './top-nav.component';
import { shallow } from 'enzyme';

describe('TopNav', () => {
    it('should display React Game of Life', () => {
        // ARRANGE
        const wrapper = shallow(<TopNav />);
        
        // ASSERT
        expect(wrapper.text()).toBe('React Game of Life');
    })
});