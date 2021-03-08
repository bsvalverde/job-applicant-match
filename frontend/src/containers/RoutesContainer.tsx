import { Redirect, Route, Switch } from 'react-router-dom';

const RoutesContainer = () => {
  return (
    <Switch>
      <Route path="/jobs">
        <p>jobs</p>
      </Route>
      <Route path="/applicants">
        <p>applicants</p>
      </Route>
      <Route path="/">
        <Redirect to="/applicants" />
      </Route>
    </Switch>
  );
};

export default RoutesContainer;
