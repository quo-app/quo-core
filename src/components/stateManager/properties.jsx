import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { pick } from 'lodash'

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { getCards, getPropsOfCard } from 'quo-parser/componentProps';

import PropCards from 'quo-components/propCards';


class Properties extends Component {
  // an update requires the component id, state id and the props
  // both of the component id and the state id will be provided from the
  // mapStateToProps function
  dispatchAction () {
    const { dispatch, id, currentState } = this.props;
    return props => dispatch(actions.EDIT_COMPONENT_PROPS_UPDATE({id, stateID: currentState, props}))
  }
  render = () => {
    return (
      <Fragment>
      {
        this.props.cards.map((PropCard, i) => {
          if(!PropCard.card) return null
          return (
            <PropCard.card key={i} update={this.dispatchAction()} {...PropCard.props}/>
          )
        })
      }
      </Fragment>
    )
  }
}


const mapStateToProps = state => {
  const currentState = selectors.currentState(state);
  const selectedComponents = selectors.selectedComponents(state);
  // case where there is no selection
  if(selectedComponents.length === 0){
    return { cards: []}
  }
  // case where there is a single selection
  if(selectedComponents.length === 1){
    let id = selectedComponents[0];
    const determineCurrentState = () => currentState !== '' ? currentState : 'default'
    const accessors = { id, stateID: determineCurrentState()}
    // if current state is not set return default which is the case while development
    let props = selectors.componentStateProps(state, accessors).toJS()
    let type = selectors.componentStateType(state, accessors)
    let cards = getCards(type).map( c => ({
        card: PropCards[c],
        props: pick(props, getPropsOfCard(c, type))
      }));
    return { cards, id, currentState: determineCurrentState() }
  }
  // case where there is a multiple selection
  if(selectedComponents.length > 1){
    return { cards: []}
  }
}

export default connect(mapStateToProps)(Properties)
