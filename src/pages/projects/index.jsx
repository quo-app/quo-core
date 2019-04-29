import React, { Component } from 'react';
import { getProject } from 'quo-db/projects';

class Projects extends Component {
  state = {
    initialMountFired: false
  }

  componentDidMount () {
    if (!this.state.initialMountFired) {
      // this.retrieveOrLoadNewProject();
      this.setState({ initialMountFired: true });
    }
  }

  retrieveProjects () {
    // const id = this.props.match.params.editorId;
    // const { dispatch } = this.props;
    // getProject(id).then(project => {
    //   // set the project id
    //   dispatch(actions.PROJECT_ID_UPDATE(id));

    //   if(project) {
    //     // project exists
    //     this.hydrateDomain(JSON.parse(project[id].data));
    //   } else {
    //     dispatch(actions.PROJECT_PUSH_TO_CLOUD(id));
    //   }
    // })
  }

  render () {
    return (
      <main className="quo-content projects">
        <h1> Projects </h1>
      </main>
    )
  }
}

export default Projects;