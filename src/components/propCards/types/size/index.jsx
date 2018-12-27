import React, { Component} from 'react';

import { isNumber } from 'lodash';

import TextInput from 'quo-ui/textInput';

import PropCardWrapper from '../PropCardWrapper';
import TwoValueCard from '../twoValue';

class Size extends TwoValueCard {

  updateW = (val, title, isFinal) => this.updateValues(val, 'width', isFinal)

  updateH = (val, title, isFinal) => this.updateValues(val, 'height', isFinal)

  valuesExist = () => isNumber(this.props.width) && isNumber(this.props.height)

  render(){
    return(
      this.valuesExist() ?
      <PropCardWrapper title='Size'>
        <TextInput title='W' text={this.props.width} type='number' after="" onChange={this.updateW}/>
        <TextInput title='H' text={this.props.height} type='number' after="" onChange={this.updateH}/>
      </PropCardWrapper>
      : null
    )
  }
}

export default Size