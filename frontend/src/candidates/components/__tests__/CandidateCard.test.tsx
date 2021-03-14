import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TechnologyBadge from '../../../components/TechnologyBadge';
import CandidateCard from '../CandidateCard';

configure({ adapter: new Adapter() });

describe('<CandidateCard />', () => {
  let wrapper: ShallowWrapper;
  const candidate = {
    _id: '1',
    city: 'city1',
    experience: 2,
    technologies: [],
  };
  const technologies = [
    { name: 'tech1', isMainTech: true },
    { name: 'tech2', isMainTech: false },
    { name: 'tech1', isMainTech: false },
  ];

  beforeEach(() => {
    wrapper = shallow(<CandidateCard candidate={candidate} />);
  });

  describe('candidate prop', () => {
    describe('Has no associated technologies', () => {
      beforeEach(() => {
        wrapper.setProps({ candidate });
      });

      it('Should not render a <TechnologyBadge />', () => {
        expect(wrapper.find(TechnologyBadge).exists()).toBeFalsy();
      });
    });

    describe('Has associated technologies', () => {
      beforeEach(() => {
        wrapper.setProps({
          candidate: { ...candidate, technologies },
        });
      });

      it('Should render as many <TechnologyBadge /> components as there are technologies', () => {
        expect(wrapper.find(TechnologyBadge).length).toBe(3);
      });
    });
  });
});
