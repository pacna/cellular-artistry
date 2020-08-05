import React from 'react';
import { GameOfLife } from './game-of-life.component';
import { createShallow } from '@material-ui/core/test-utils';
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    FormHelperText,
    ButtonGroup,
    Button
} from '@material-ui/core';

describe('GameOfLife', () => {
    let shallow;
    
    beforeEach(() => {
        shallow = createShallow();
    })

    it('buttons should be disabled by default', () => {
        // ARRANGE
        const wrapper = shallow(<GameOfLife />);
        const buttonGroup = wrapper.find(ButtonGroup);
        const isDisabled = buttonGroup.props().disabled;

        // ASSERT
        expect(isDisabled).toBe(true);
    })
});