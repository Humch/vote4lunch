import React from 'react';

import { Route, Switch } from 'react-router-dom';

import {
  Footer,
  NotFound,
  Header,
  About,
} from '.';

import { CreateAVote, BeginVote, AddPlace } from '../../VoteCreator';
import { AddAVoice, GetUsersVotes } from '../../Votes';
import { LogoutView, SignUp, SignIn } from '../../Accounts';

export default () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={BeginVote} />
      <Route exact path="/create-a-vote" component={CreateAVote} />
      <Route exact path="/add-place" component={AddPlace} />
      <Route exact path="/vote/:url" component={AddAVoice} />
      <Route exact path="/my-votes" component={GetUsersVotes} />
      <Route exact path="/logout" component={LogoutView} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/apropos" component={About} />
      <Route path="*" component={NotFound} status={404} />
    </Switch>
    <Footer />
  </div>
);
