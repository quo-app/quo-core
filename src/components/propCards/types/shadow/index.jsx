import React, { Component } from 'react';

import SliderCore from 'ui-components/inputElements/slider';
import TextInput from 'ui-components/inputElements/textInput';

import PropCardWrapper from '../PropCardWrapper';

export default class Shadow extends React.Component{
  render(){
    return(
      <PropCardWrapper title='Shadow'>
        <SliderCore title='Amount' step={0.1} min={0} max={5} value={1}/>
        {/* <TextInput title='x' text='1' type='number'/>
        <TextInput title='y' text='1' type='number'/> */}
        <TextInput title='blur' text='1' type='number'/>
        <TextInput title='spread' text='1' type='number'/>
      </PropCardWrapper>
    )
  }
}
