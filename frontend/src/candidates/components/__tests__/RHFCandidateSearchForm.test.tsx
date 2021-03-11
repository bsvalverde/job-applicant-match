import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import RHFCandidateSearchForm from '../RHFCandidateSearchForm';

configure({ adapter: new Adapter() });

describe('<RHFCandidateSearchForm />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RHFCandidateSearchForm onSubmit={() => {}} loading={false} error={''} />,
    );
  });

  describe('loading prop', () => {
    describe('Is true', () => {
      beforeEach(() => {
        wrapper.setProps({ loading: true });
      });

      it('Should render a <CircularProgress />', () => {
        expect(wrapper.exists(CircularProgress)).toBeTruthy();
      });

      it('Should not render a submit button', () => {
        expect(wrapper.find({ type: 'submit' }).exists()).toBeFalsy();
      });
    });

    describe('Is false', () => {
      beforeEach(() => {
        wrapper.setProps({ loading: false });
      });

      it('Should not render a <CircularProgress />', () => {
        expect(wrapper.exists(CircularProgress)).toBeFalsy();
      });

      it('Should render a submit button', () => {
        const submitButton = wrapper.find({ type: 'submit' });
        expect(submitButton.exists()).toBeTruthy();
        expect(submitButton.type()).toEqual(IconButton);
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
