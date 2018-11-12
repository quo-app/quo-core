import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import _ from 'lodash';
import PropTypes from 'prop-types';

import { getState } from 'quo-redux/state';

/**
 * Renders a single card of the links viewer.
 * 
 * @class
 */
class LinksOfAComponent extends Component {
  static PropTypes = {
    component: PropTypes.
  }
  render () {
    return <div>{this.props.component.id}</div>
  }
}

 class LinksViewer extends Component {
  render () {
    return ( 
      <div>
        { _.values(this.props.components).map( (component, id) => <LinksOfAComponent component={component} key={id}/>) }
      </div>
    )
  }
}
/**
 * Filters out the components that don't have any links.
 * @param {Object} components 
 * 
 * @returns {Object}
 */
const filterLinkedComponents = (components) => {
  if(!components) return {}
  return _.pickBy(components, obj => _.keys(obj.links.targetStateIds).length > 0 )
}

/**
 * Returns the components of the current tab 
 * that have links.
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
  const domain = getState(state,'domain');
  let components = {};
  if(domain.tabs.activeTab){
    components = filterLinkedComponents(domain.tabs.allTabs[domain.tabs.activeTab].components);
  }
  return { components }
}

export default connect(mapStateToProps)(LinksViewer)


