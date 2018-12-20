/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import FormInput from './FormInput';

describe('FormInput (Shallow)', () => {
  let wrapper;
  const handleFieldChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<FormInput onChange={handleFieldChange} />);
  });

  it('render the component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Test input change', () => {
    const input = wrapper.find('input');
    const event = { target: { value: 'bla bla bla' } };
    input.props().onChange(event);

    expect(handleFieldChange).toHaveBeenCalled();
  });
});
