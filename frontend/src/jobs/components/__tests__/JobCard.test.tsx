import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TechnologyBadge from '../../../components/TechnologyBadge';
import Chip from '../../../components/UI/Chip';
import JobCard from '../JobCard';

configure({ adapter: new Adapter() });

describe('<JobCard />', () => {
  let wrapper: ShallowWrapper;
  const job = {
    _id: '1',
    city: 'city1',
    isRemote: false,
    minExperience: 2,
    maxExperience: 4,
    technologies: [],
  };
  const technologies = ['tech1', 'tech2', 'tech1'];

  beforeEach(() => {
    wrapper = shallow(<JobCard job={job} />);
  });

  describe('job prop', () => {
    describe('Is not a remote job', () => {
      beforeEach(() => {
        wrapper.setProps({ job: { ...job, isRemote: false } });
      });

      it('Should not render a <Chip />', () => {
        expect(wrapper.find(Chip).exists()).toBeFalsy();
      });
    });

    describe('Is a remote job', () => {
      beforeEach(() => {
        wrapper.setProps({ job: { ...job, isRemote: true } });
      });

      it('Should render a <Chip /> with a remote label', () => {
        const chip = wrapper.find(Chip);
        expect(chip.exists()).toBeTruthy();
        const chipLabel = chip.prop('label') as React.ReactElement;
        expect(chipLabel?.props?.id).toEqual('remote');
      });
    });

    describe('Has no associated technologies', () => {
      beforeEach(() => {
        wrapper.setProps({ job });
      });

      it('Should not render a <TechnologyBadge />', () => {
        expect(wrapper.find(TechnologyBadge).exists()).toBeFalsy();
      });
    });

    describe('Has associated technologies', () => {
      beforeEach(() => {
        wrapper.setProps({
          job: { ...job, technologies },
        });
      });

      it('Should render as many <TechnologyBadge /> components as there are technologies', () => {
        expect(wrapper.find(TechnologyBadge).length).toBe(3);
      });
    });
  });
});
