import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

import { fSafe, bool2s } from 'quo-utils'; 

import Card from './Card';

export default class VerticalListCard extends Component {
  
    static propTypes = {
      //core props
      title: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      collapsed: PropTypes.bool,
      //data
      headerIcon: PropTypes.node,
      headerMiddleText: PropTypes.string,
      optionIcon: PropTypes.node,
      values: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.string,
        selected: PropTypes.bool,
        icon: PropTypes.bool,
      })).isRequired,
      optionIconOrientation: PropTypes.oneOf(['left', 'right']),
      //funcs
      onHeaderIconClick: PropTypes.func,
      onOptionClick: PropTypes.func.isRequired,
      onOptionIconClick: PropTypes.func,
    }
  
    static defaultProps = {
      disabled: false,
      collapsed: true,
      optionOrientationOrientation: 'right',
      values: {},
    }
  
    renderList() {
      return ( _.keys(this.props.values).map( id => {

        let v = this.props.values[id];

        let selected = bool2s(v,'selected','');
        let iconVisible = bool2s(v,'icon','visible');
        let iconOrientation = `icon-${this.props.optionIconOrientation}`;
  
        return (
          <li className={`vertical-list-option ${selected} ${iconOrientation}`}
              onClick={ () => fSafe(this.props.onOptionClick.bind(this), id) } 
              key={id}>
            <div className='text'>
              {v.text}
            </div>
            <div onClick={ () => fSafe(this.props.onOptionClick.bind(this), id) }
                className={`option-icon ${iconVisible}`}>
              {this.props.optionIcon}
            </div>
          </li>
        )
      })
      )
    }
    render(){
      return(
        <Card { ...this.props } className='vertical-list-card'>
          <div className='card-vertical-list-wrapper'>
              <ul>
                {
                  this.renderList()
                }
              </ul>
            </div>
        </Card>
      )
    }
  }