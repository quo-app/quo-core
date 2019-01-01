import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import selectors from 'quo-redux/selectors';

import LinksDropdown from './linksDropdown';
import LinksContent from './linksContent'



class LinksManager extends Component {
  // refine this later
  state = {
    link: _.values(this.props.links)[0] || {}
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(_.isEmpty(prevState.link) && !_.isEmpty(nextProps.links)) {
      return { link : _.values(nextProps.links)[0] }
    }
    return null
 }

  changeCurrentLink = id => {
    this.setState({ link: this.props.links[id] })
  }

  render = () => {
    const displayEmpty = Object.keys(this.props.links).length === 0;
    return (
      <div className='links-wrapper'>
        <LinksDropdown links={this.props.links} linkID={this.state.link.id} id={this.props.id} onSelection={this.changeCurrentLink}/>
        <LinksContent link={this.state.link} displayEmpty={displayEmpty}/>
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