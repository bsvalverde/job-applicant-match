import { Redirect, Route, Switch } from 'react-router-dom';
import CandidateSearchContainer from '../candidates/containers/CandidateSearchContainer';
import JobsContainer from '../jobs/containers/JobsContainer';

const RoutesContainer = () => {
  return (
    <Switch>
      <Route path="/jobs">
        <JobsContainer />
      </Route>
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
