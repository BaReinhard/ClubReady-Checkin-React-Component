import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Index from '../index';
function setup() {
    let props = {
        store: 1234,
        token: '123123-123123',
    };
    return shallow(<Index {...props} />);
}
describe('Index Testing', () => {
    it('Ensure Index Renders', () => {
        const wrapper = setup();

        expect(wrapper).toExist();
    });
});
