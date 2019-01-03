import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import LinksDropdown from './linksDropdown';
import LinksContent from './linksContent';

class LinksManager extends Component {
  // refine this later
  state = {
    linkID: _.values(this.props.links)[0] ? _.values(this.props.links)[0].id :  ''
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.linkID === '' && !_.isEmpty(nextProps.links)) {
      nextProps.dispatch(actions.ACTIVE_LINK_UPDATE({
        linkSource: nextProps.id,
        linkID: _.values(nextProps.links)[0].id
      }))
      return { linkID : _.values(nextProps.links)[0].id }
    }
    return null
 }

 updateActiveLinkStore = (linkSource, linkID) => {
  this.props.dispatch(actions.ACTIVE_LINK_UPDATE({ linkSource, linkID }));
 }

  changeCurrentLink = linkID => {
    this.setState({ linkID });
    this.updateActiveLinkStore(this.props.id, linkID);
  }

  render = () => {
    const displayEmpty = Object.keys(this.props.links).length === 0;
    return (
      <div className='links-wrapper'>
        <LinksDropdown links={this.props.links} linkID={this.state.linkID} id={this.props.id} onSelection={this.changeCurrentLink}/>
        <LinksContent link={this.props.links[this.state.linkID]} id={this.props.id} displayEmpty={displayEmpty} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // make this better
  const selection = selectors.selectedComponents(state)[0];

  if(!selection){
    return { links: {} }
  }
  const allLinks = selectors.links(state);
  if(!allLinks.has(selection)) {
    return { links: {}, id: selection }
  }
  const links = allLinks.get(selection).toJS()
  // retrieve links and shove them in to the links
  return { links, id: selection }
}

export default connect(mapStateToProps)(LinksManager)