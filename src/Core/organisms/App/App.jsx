import React from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import {
  Footer,
  NotFound,
  Header,
  About,
} from '..';

import { CreateAVote, BeginVote, AddPlace } from '../../../VoteCreator';
import { GetUsersVotes, VoteView } from '../../../Votes';
import { LogoutView, SignUp, SignIn } from '../../../Accounts';

export default withRouter(({ location }) => (
  <div className="App">
    { !location.pathname.match(/\/vote\/[a-zA-Z0-9]+/g) ? <Header /> : ''}
    <Switch>
      <Route exact path="/" component={BeginVote} />
      <Route exact path="/create-a-vote" component={CreateAVote} />
      <Route exact path="/add-place" component={AddPlace} />
      <Route exact path="/vote/:url" component={VoteView} />
      <Route exact path="/my-votes" component={GetUsersVotes} />
      <Route exact path="/logout" component={LogoutView} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/apropos" component={About} />
      <Route path="*" component={NotFound} status={404} />
    </Switch>
    { !location.pathname.match(/\/vote\/[a-zA-Z0-9]+/g) ? <Footer /> : ''}
  </div>
));
