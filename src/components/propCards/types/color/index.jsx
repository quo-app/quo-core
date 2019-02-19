import React, { Component } from 'react';
import { connect } from 'react-redux';

import SliderCore from 'quo-ui/slider';
import TextInput from 'quo-ui/textInput';
import ColorPicker from 'quo-ui/colorPicker';

import PropCardWrapper from '../PropCardWrapper';

import { SketchPicker } from 'react-color';

class Color extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayColorPicker:false,
      color: this.props.fontColor || { r: 0, g:0, b:0, a:0 }
    }
  }

  getProp = () => 'fontColor'

  updateStore = () => {
    let props = {[this.getProp()]:this.state.color}
    if(this.getProp() === 'fill') {
      props.fillOpacity =  this.state.color.a
    }
    this.props.update(props)
  }

  handleChange = color => {
    this.setState({ color: color.rgb }, this.updateStore)
  }

  handleSliderChange = alpha => {
    let color = {...this.state.color}
    color.a = alpha / 100;
    this.setState({ color }, this.updateStore);
  };

  handleClick = () => this.setState({ displayColorPicker: !this.state.displayColorPicker })

  render () {
    return(
      <div>
        <PropCardWrapper title='Color'>

           <ColorPicker title='Color' color={ this.state.color } handleClick={ this.handleClick }/>
           <SliderCore title='Opacity' step={1} min={0} max={100} value={parseInt(this.state.color.a * 100)} handleOnChange={this.handleSliderChange}/>
          <TextInput title='' text={parseInt(this.state.color.a * 100)} type='percentage' after="%"/>
        </PropCardWrapper>
        {
          this.state.displayColorPicker
            ?
              <SketchPicker color={ this.state.color } onChange={ this.handleChange }/>
            :
          null
        }

      </div>
    )
  }
}

export default connect()(Color)
