import React from 'react';
import { StyleCard } from '../styleCard';
import SliderCore from '../../inputElements/slider/sliderCore'

export default class Border extends React.Component{
  render(){
    return(
      <StyleCard title='Border'>
        <SliderCore title='Amount' step={0.1} min={0} max={5} value={1}/>
      </StyleCard>
    )
  }
}
