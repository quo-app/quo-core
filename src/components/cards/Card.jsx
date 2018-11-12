import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bool2s, fSafe } from 'utils'; 


export default class Card extends Component {

    static propTypes = {
      title: PropTypes.string.isRequired,
      className: PropTypes.string,
      id: PropTypes.string,
      disabled: PropTypes.bool,
      collapsed: PropTypes.bool,
      headerIcon: PropTypes.element,
      onHeaderIconClick: PropTypes.func,
    }
  
    static defaultProps = {
      disabled: false,
      collapsed: false,
      className: '',
      id: '',
    }
  
    render(){
  
      let disabled = bool2s(this.props,'disabled');
      let collapsed = bool2s(this.props,'collapsed');
  
      return(
        <div className={`card ${this.props.className} ${disabled} ${collapsed}`} id={`${this.props.id}`}>
          <div className='card-header'>
            {this.props.title}
            {this.props.headerIcon
              ?
                <div onClick={ () => fSafe(this.props.onHeaderIconClick.bind(this)) }>
                  { this.props.headerIcon }
                </div>
              : 
                null }
          </div>
          <div className='card-body'>
            {this.props.children}
          </div>
        </div>
      )
    }
  }