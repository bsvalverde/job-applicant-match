import { Redirect, Route, Switch } from 'react-router-dom';
import CandidateSearchContainer from '../candidates/containers/CandidateSearchContainer';

const RoutesContainer = () => {
  return (
    <Switch>
      {/* <Route path="/jobs">
        <p>jobs</p>
      </Route> */}
      <Route path="/candidates">
        <CandidateSearchContainer />
      </Route>
      <Route path="/">
        <Redirect to="/candidates" />
      </Route>
    </Switch>
  );
};

export default RoutesContainer;
