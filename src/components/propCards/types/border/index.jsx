import React, { Component} from 'react';

import SliderCore from 'quo-ui/slider'

import Base from '../base';


export default class Border extends Component {
  render(){
    return(
      <Base title='Border'>
        <SliderCore title='Amount' step={0.1} min={0} max={5} value={1}/>
      </Base>
    )
  }
}
