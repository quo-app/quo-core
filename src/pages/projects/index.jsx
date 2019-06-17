import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ProjectsTopBar } from 'quo-components/topBar';
import { AddNewProjectCard, ExistingProjectCard } from 'quo-components/projectCard';
import { auth, projects } from 'quo-db';
import { createReduxStructure } from 'quo-redux';

class Projects extends Component {
  state = {
    initialMountFired: false,
    projects: []
  }
  constructor(props) {
    super(props);
    this.state = {
      initialMountFired: false,
      projects: []
    }
    this.store = createReduxStructure({});
  }

  componentDidMount () {
    this.retrieveProjects();
  }

  retrieveProjects () {
    projects.getProjectsOfUser(auth().currentUser.uid).then(data => {
      console.log(data);
      this.setState({ projects: data });
    })
  }

  renderExistingProjects () {
    if (this.state.projects.length === 0) return null;

    console.log(this.state.projects.map(({ data, id }) => (<ExistingProjectCard data={data} projectId={id} key={id} />)))

    return (
      this.state.projects.map(({ data, id }) => (<ExistingProjectCard data={data} projectId={id} key={id} />))
    )
  }

  render () {
    return (
      <Provider store={this.store}>
        <main className="quo-content projects">
          <ProjectsTopBar/>
          <div className='projects-main'>
            <AddNewProjectCard/>
            { this.renderExistingProjects() }
          </div>
        </main>
      </Provider>
    )
  }
}

export default Projects;
