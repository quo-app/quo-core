import React, { Component } from 'react'
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { Button } from 'quo-ui/buttons';
import Icons from 'quo-ui/icons';

import TopBar from '../topBar';
import { AddNewProjectCard } from 'quo-components/projectCard';

class ProjectsTopBar extends Component {
  setAppMode = (mode) => {
    const { dispatch } = this.props;
    if(this.props.appMode === mode) return;
    dispatch(actions.SET_APP_MODE(mode));
  }

  render () {
    return (
      <React.Fragment>
        <TopBar className='projects-top-bar'>
          <div className='left-group'>
            <Icons.Games/>
            <Button>New Project</Button>
          </div>

          <div className='center-group'>
            <div className='link'>Projects</div>
            <div className='link'>Links</div>
          </div>

          <div className='right-group'>
            <div className='profile-circle'>

            </div>
          </div>
        </TopBar>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

// export default connect(mapStateToProps)(EditorTopBar);
export default ProjectsTopBar;
