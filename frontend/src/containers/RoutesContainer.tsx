import { Redirect, Route, Switch } from 'react-router-dom';
import ApplicantSearchContainer from '../applicants/containers/ApplicantSearchContainer';

const RoutesContainer = () => {
  return (
    <Switch>
      <Route path="/jobs">
        <p>jobs</p>
      </Route>
      <Route path="/applicants">
        <ApplicantSearchContainer />
      </Route>
      <Route path="/">
        <Redirect to="/applicants" />
      </Route>
    </Switch>
  );
};

export default RoutesContainer;
