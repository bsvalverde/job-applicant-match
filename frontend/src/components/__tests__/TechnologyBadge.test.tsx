import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TechnologyBadge from '../TechnologyBadge';
import Chip from '../UI/Chip';

configure({ adapter: new Adapter() });

describe('<TechnologyBadge />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<TechnologyBadge name="name" isMainTech={false} />);
  });

  describe('isMainTech prop', () => {
    describe('Is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isMainTech: true });
      });

      it('Should render a filled chip', () => {
        expect(wrapper.find(Chip).prop('variant')).toBe('default');
      });
    });

    describe('Is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isMainTech: false });
      });

      it('Should render an outlined chip', () => {
        expect(wrapper.find(Chip).prop('variant')).toBe('outlined');
      });
    });
  });
});
