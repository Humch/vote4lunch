import React from 'react';

import { Route, Switch } from 'react-router-dom';


import Footer from './Footer'

import NotFound from './NotFound'
import About from './About'

import CreateAVote from '../containers/CreateAVote';
import AddAVoice from '../containers/AddAVoice';
import Header from '../containers/Header';
import GetUsersVotes from '../containers/GetUsersVotes';
import BeginVote from '../containers/BeginVote';
import AddPlace from '../containers/AddPlace';
import LogoutView from '../containers/LogoutView';

const App = () => {

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/" component={BeginVote} />
        <Route exact path="/create-a-vote" component={CreateAVote} />
        <Route exact path="/add-place" component={AddPlace} />
        <Route exact path="/vote/:url" component={AddAVoice} />
        <Route exact path="/my-votes" component={GetUsersVotes} />
        <Route exact path="/logout" component={LogoutView} />
        <Route exact path="/apropos" component={About} />
        <Route path="*" component={NotFound} status={404} />
      </Switch>
      <Footer/>
    </div>
  );
};

export default App;