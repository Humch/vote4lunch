import React from 'react';

import './VoteContent.scss';

import { VoteHeader, VoteSidebar } from '../..';

const VoteContent = () => (
  <div className="VoteContent container-fluid h-100 d-flex flex-column">
    <VoteHeader />
    <VoteSidebar />
  </div>
);

export default VoteContent;
