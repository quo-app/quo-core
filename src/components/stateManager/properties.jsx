import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { pick } from 'lodash'

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { getCards, getPropsOfCard } from 'quo-parser/componentProps';

import PropCards from 'quo-components/propCards';


class Properties extends Component {
  dispatchAction(){
    const { dispatch } = this.props;
    return ( payload => dispatch(actions.UPDATE_COMPONENT_PROPS({id:this.props.id, props:payload})) )
  }
  render = () => {
    return (
      <Fragment>
      {
        this.props.cards.map((PropCard, i) => {
          console.log(PropCard)
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
  // let selections = selectors.selectedComponents(state)
  // let states = selectors.componentStates(state, { id: selections[0]}).toJS()
  // let convertedStates = _.mapValues(states, eachState => {
  //   return { text: eachState.title, icon: eachState.active }
  // })

  // console.log(convertedStates)

  // return {
  //   states: convertedStates
  // }

  // change this!!!
  const currentState = selectors.currentState(state);
  const selectedComponents = selectors.selectedComponents(state);
  // case where there is no selection
  if(selectedComponents.length === 0){
    return { cards: []}
  }
  // case where there is a single selection
  if(selectedComponents.length === 1){
    let id = selectedComponents[0];
    let props = selectors.componentStateProps(state, { id, stateID: currentState !== '' ? currentState : 'default'}).toJS()
    let type = selectors.componentStateType(state, { id, stateID: currentState !== '' ? currentState : 'default'})
    let cards = getCards(type).map( c => ({
        card: PropCards[c],
        props: pick(props, getPropsOfCard(c, type))
      }));
    console.log(cards)
    return { cards, id}
  }
  // case where there is a multiple selection
  if(selectedComponents.length > 1){
    return { cards: []}
  }
  // let component = domain.components[id];
  // if (!component) return { cards: []};
  // let cards = getCards(component).map( c => ({
  //   card: PropCards[c],
  //   props: getPropsOfSelection(state, getPropsOfCard(c,component))
  // }));
  // return { cards, id:component.id }
}

export default connect(mapStateToProps)(Properties)
