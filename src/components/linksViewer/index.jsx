import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getState } from 'quo-redux/state';

import { VerticalListCard } from 'quo-ui/cards';

/**
 * Renders a single card of the links viewer.
 * 
 * @class
 */
class LinksOfAComponent extends Component {
  static propTypes = {
    sourceComponent: PropTypes.object,
    targetComponents: PropTypes.arrayOf(PropTypes.object),
  }

  generateCard(){
    let srcComp  = this.props.sourceComponent
    let targetIds = this.props.sourceComponent.links.targetStateIds;

    let links = this.props.targetComponents.map( component => {
      console.log(component)
      let linkStateId = targetIds[component.id];
      // find the state that is related to the sourceComponent
      let linkState = component.state.states[linkStateId]
      return {
        text: `${linkState.title} - (${component.name})`,
        id: linkState.id,
      }
    })

    return (
      <VerticalListCard
        title={srcComp.name}
        values={links}
        onOptionClick={()=>{}}
      />
    )
  }
  render () {
    return this.generateCard();
  }
}

class LinksViewer extends Component {
  static propTypes = {
    linkMappings: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    linkMappings: []
  }

  renderEmptyLinks () {
    return (
      <div class='no-link-description'>
        <div class='text-primary'>
          No links found
        </div>
        <div class='text-secondary'>
          Create a new link to connect components
        </div>
      </div>

    )
  }

  renderLinks () {
    return (
      this.props.linkMappings.map((mapping, id) => {
        return (
          <LinksOfAComponent 
            sourceComponent={mapping.sourceComponent}
            targetComponents={mapping.targetComponents}
            key={id}
          />
        )})
    )
  }

  render () {
    return ( 
      this.props.linkMappings.length > 0 ? this.renderLinks() : this.renderEmptyLinks()
    )
  }
}

/**
 * Filters out the components that don't have any link triggers
 * @param {Object} components 
 * 
 * @returns {Object}
 */
const filterLinkTriggerComponents = (components) => {
  if(!components) return {}
  return _.pickBy(components, obj => _.keys(obj.links.targetStateIds).length > 0 )
}

/**
 * Loops through the link trigger components,
 * combines the target ids into an array, and 
 * creates a mapping from the link trigger to the
 * target components.
 * @param {Object} components 
 * 
 * @returns {Object}
 */
const createLinkMappings = allComponents => {
  let components = filterLinkTriggerComponents(allComponents);
  return _.values(components).map( component => {
    let targetComponents = _.keys(component.links.targetStateIds).map( id => allComponents[id]);
    return {sourceComponent: component, targetComponents: targetComponents};
  }) 
}

/**
 * Returns the components of the current tab 
 * that have links.
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
  const domain = getState(state,'domain');
  // currently returns all components
  return { linkMappings: createLinkMappings(domain.components)}
}

export default connect(mapStateToProps)(LinksViewer)


