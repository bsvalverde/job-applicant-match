import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import JobCard from '../JobCard';
import JobList from '../JobList';

configure({ adapter: new Adapter() });

describe('<JobList />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <JobList jobs={[]} loading={false} error={''} onJobClick={() => {}} />,
    );
  });

  describe('jobs prop', () => {
    describe('Is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ jobs: [] });
      });

      it('Should render a card with a no results found message', () => {
        const message = wrapper.find(FormattedMessage);
        expect(message.exists()).toBeTruthy();
        expect(message.prop('id')).toBe('noJobsToShow');
      });

      it('Should not render a <JobCard />', () => {
        expect(wrapper.find(JobCard).exists()).toBeFalsy();
      });
    });

    describe('Is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({
          jobs: [
            {
              _id: '1',
              city: 'city1',
              minExperience: 1,
              maxExperience: 2,
              technologies: [],
            },
            {
              _id: '2',
              city: 'city2',
              minExperience: 2,
              maxExperience: 3,
              technologies: [],
            },
            {
              _id: '3',
              city: 'city3',
              minExperience: 3,
              maxExperience: 4,
              technologies: [],
            },
          ],
        });
      });

      it('Should not render a message', () => {
        expect(wrapper.exists(FormattedMessage)).toBeFalsy();
      });

      it('Should render as many <JobCard /> components as there are candidates', () => {
        expect(wrapper.find(JobCard).length).toBe(3);
      });
    });
  });

  describe('loading prop', () => {
    describe('Is true', () => {
      beforeEach(() => {
        wrapper.setProps({ loading: true });
      });

      it('Should render a <CircularProgress />', () => {
        expect(wrapper.exists(CircularProgress)).toBeTruthy();
      });
    });

    describe('Is false', () => {
      beforeEach(() => {
        wrapper.setProps({ loading: false });
      });

      it('Should not render a <CircularProgress />', () => {
        expect(wrapper.exists(CircularProgress)).toBeFalsy();
      });
    });
  });

  describe('error prop', () => {
    describe('Is provided', () => {
      beforeEach(() => {
        wrapper.setProps({ error: 'errorMessageId' });
      });

      it('Should render an error message', () => {
        const errorMessage = wrapper.find({ color: 'error' });
        expect(errorMessage.exists()).toBeTruthy();
        expect(errorMessage.type()).toEqual(Typography);
      });
    });

    describe('Is not provided', () => {
      beforeEach(() => {
        wrapper.setProps({ error: null });
      });

      it('Should not render an error message', () => {
        expect(wrapper.find({ color: 'error' }).exists()).toBeFalsy();
      });
    });
  });
});
