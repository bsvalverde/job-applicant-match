import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CandidateCard from '../CandidateCard';
import CandidateList from '../CandidateList';

configure({ adapter: new Adapter() });

describe('<CandidateList />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CandidateList candidates={[]} />);
  });

  describe('candidates prop', () => {
    describe('Is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ candidates: [] });
      });

      it('Should render a card with a no results found message', () => {
        const message = wrapper.find(FormattedMessage);
        expect(message.exists()).toBeTruthy();
        expect(message.prop('id')).toBe('noCandidatesToShow');
      });

      it('Should not render a <CandidateCard />', () => {
        expect(wrapper.find(CandidateCard).exists()).toBeFalsy();
      });
    });

    describe('Is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({
          candidates: [
            {
              id: '1',
              city: 'city1',
              experience: '',
              technologies: [],
            },
            {
              id: '2',
              city: 'city2',
              experience: '',
              technologies: [],
            },
            {
              id: '3',
              city: 'city3',
              experience: '',
              technologies: [],
            },
          ],
        });
      });

      it('Should not render a message', () => {
        expect(wrapper.exists(FormattedMessage)).toBeFalsy();
      });

      it('Should render as many <CandidateCard /> components as there are candidates', () => {
        expect(wrapper.find(CandidateCard).length).toBe(3);
      });
    });
  });
});
