import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


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
        this.props.cards.map( (PropCard,i) => {
          if(!PropCard) return null
          return (
            <PropCard.card key={i} update={this.dispatchAction()} {...PropCard.props}/>
          )
        })
      }
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  const selectedComponents = selectors.selectedComponents(state);
  // case where there is no selection
  if(selectedComponents.length === 0){
    return { cards: []}
  }
  // case where there is a single selection
  if(selectedComponents.length === 1){
    let id = selectedComponents[0];
    // fix this as well
    // let cards = getCards(component).map( c => ({
    //     card: PropCards[c],
    //     props: getPropsOfSelection(state, getPropsOfCard(c,component))
    //   }));
    // let component = selectors.component(state, { id: selectedComponents[0] });
    return { id, cards: []}
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
