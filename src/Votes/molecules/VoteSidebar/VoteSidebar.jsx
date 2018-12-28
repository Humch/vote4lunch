import React, { Component } from 'react';

import './VoteSidebar.scss';

import { CloseIcon, HamburgerIcon, VoteSidebarContent } from '../..';

class VoteSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState(state => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  }

  render() {
    const { sidebarOpen } = this.state;

    let colWidth;
    if (sidebarOpen) {
      colWidth = 'col-4';
    } else {
      colWidth = 'col-1 col-small';
    }

    return (
      <div className="VoteSidebar row h-100">
        <div className={`VoteSidebarContent ${colWidth}`}>
          <div className="row justify-content-end">
            <div className="col text-right">
              { sidebarOpen
                ? (
                  <CloseIcon
                    onClickEvent={this.toggleSidebar}
                  />
                )
                : (
                  <HamburgerIcon
                    onClickEvent={this.toggleSidebar}
                  />
                )
              }
            </div>
          </div>
          { sidebarOpen
            ? (
              <VoteSidebarContent />
            )
            : ''
              }

        </div>
      </div>
    );
  }
}

export default VoteSidebar;
