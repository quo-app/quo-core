import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getState } from 'quo-redux/state';
import actions from 'quo-redux/actions';
import { getSelectionFirstID, getPropsOfSelection} from 'quo-redux/helpers';
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
  let domain = getState(state,'domain');
  let id = getSelectionFirstID(state);
  let component = domain.components[id];
  if (!component) return { cards: []};
  let cards = getCards(component).map( c => ({
    card: PropCards[c],
    props: getPropsOfSelection(state, getPropsOfCard(c,component))
  }));
  return { cards, id:component.id }
}

export default connect(mapStateToProps)(Properties)