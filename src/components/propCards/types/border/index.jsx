import React, { Component} from 'react';

import SliderCore from 'ui-components/inputElements/slider'

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
