import Drawer from '@material-ui/core/Drawer';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import PageLayout from '../PageLayout';

configure({ adapter: new Adapter() });

describe('<PageLayout />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PageLayout isDrawerOpen={false} toggleDrawer={() => {}}>
        <></>
      </PageLayout>,
    );
  });

  describe('isDrawerOpen prop', () => {
    describe('Is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isDrawerOpen: true });
      });

      it('Should render a <Drawer /> with the open prop set to true', () => {
        expect(wrapper.find(Drawer).prop('open')).toBe(true);
      });
    });

    describe('Is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isDrawerOpen: false });
      });

      it('Should render a <Drawer /> with the open prop set to false', () => {
        expect(wrapper.find(Drawer).prop('open')).toBe(false);
      });
    });
  });
});
