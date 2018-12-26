import React, { Component } from 'react';

import TextInput from 'quo-ui/textInput';

import PropCardWrapper from '../PropCardWrapper';
import TwoValueCard from '../twoValue';

class Position extends TwoValueCard {

  updateX = (val, title, isFinal) => this.updateValues(val, 'x', isFinal)

  updateY = (val, title, isFinal) => this.updateValues(val, 'y', isFinal)

  render () {
    return (
      typeof(this.props.x) === 'number' && typeof(this.props.y) === 'number' ?
      <PropCardWrapper title='Position' key={this.props.id}>
        <TextInput title='X' text={this.props.x} type='number' after="" onChange={this.updateX}/>
        <TextInput title='Y' text={this.props.y} type='number' after="" onChange={this.updateY}/>
      </PropCardWrapper>
      :
      null
    )
  }
}

export default Position
