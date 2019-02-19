import React, { Component } from 'react';

import { isNumber } from 'lodash';

import TextInput from 'quo-ui/textInput';

import PropCardWrapper from '../PropCardWrapper';
import TwoValueCard from '../twoValue';

class InnerSize extends TwoValueCard {

  updateW = (val, title, isFinal) => this.updateValues(val, 'innerWidth', isFinal)

  updateH = (val, title, isFinal) => this.updateValues(val, 'innerHeight', isFinal)

  valuesExist = () => isNumber(this.props.innerWidth) && isNumber(this.props.innerHeight)

  render() {
    return(
      this.valuesExist() ?
      <PropCardWrapper title='Inner Size'>
        <TextInput title='W' text={this.props.innerWidth} type='number' after="" onChange={this.updateW}/>
        <TextInput title='H' text={this.props.innerHeight} type='number' after="" onChange={this.updateH}/>
      </PropCardWrapper>
      : null
    )
  }
}

export default InnerSize