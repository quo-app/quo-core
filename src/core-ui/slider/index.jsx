import React, { Component} from 'react';
import 'react-rangeslider/lib/index.css';
import Slider from 'react-rangeslider';

export default class SliderCore extends Component {

  constructor(props, context) {
    super(props, context)

    //required props
    //min max, steps

    this.state = {
      //change this later
      value: this.props.value
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({value:nextProps.value})
  }

  handleOnChange = (value) => {
    this.setState({
      value: +parseFloat(value).toFixed(2)
    })
    this.props.handleOnChange(value);
  }

  render(){
    let { step, min, max } = this.props;
    let { title, value } = this.state;
    return(
      <div className='slider'>
        <Slider
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={this.handleOnChange}
        />
        <div className='slider-title'>{title}</div>
      </div>
    )
  }

}
