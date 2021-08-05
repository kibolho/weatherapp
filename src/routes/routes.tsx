import { Route, Switch } from "react-router-dom";

import Home from "src/screens/home";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/:dayOfWeek" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  );
};
