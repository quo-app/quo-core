import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { getCards, getPropsOfCard } from 'quo-parser/componentProps';

import PropCards from 'quo-components/propCards';


class Properties extends Component {
  // an update requires the component id, state id and the props
  // both of the component id and the state id will be provided from the
  // mapStateToProps function

  dispatchAction = () => {
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
            <PropCard.card key={i} update={this.dispatchAction()} id={this.props.id} currentState={this.props.currentState} {...PropCard.props}/>
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

    const id = selectedComponents[0];
    const accessors = { id, stateID: currentState}

    // if current state is not set return default which is the case while development
    const type = selectors.componentStateType(state, accessors)
    const stateProps = selectors.componentStateProps(state, accessors)
    const defaultProps = selectors.componentStateProps(state, {...accessors, stateID: 'default'})

    const retrieveProps = propArr => {
      let obj = {}
      propArr.forEach(prop => {
        obj[prop] = stateProps.get(prop) || defaultProps.get(prop)
      })
      return obj
    }

    const cards = getCards(type).map( c => ({
        card: PropCards[c],
        props: retrieveProps(getPropsOfCard(c, type))
      }));
    return { cards, id, currentState}
  }
  // case where there is a multiple selection
  if(selectedComponents.length > 1){
    return { cards: []}
  }
}

export default connect(mapStateToProps)(Properties)
