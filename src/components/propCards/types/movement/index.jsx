import React, { Component } from 'react';

import SliderCore from 'quo-ui/slider';
import TextInput from 'quo-ui/textInput';

import Base from '../base';

export default class Movement extends Component {
  render () {
    return(
      <Base title='Movement'>
        <SliderCore title='Amount' step={0.1} min={0} max={5} value={1}/>
        <TextInput title='X' text='1' type='number'/>
        <TextInput title='Y' text='1' type='number'/>
      </Base>
    )
  }
}
