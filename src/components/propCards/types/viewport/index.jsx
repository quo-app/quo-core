import React, { Component } from 'react';
import PropCardWrapper from '../PropCardWrapper';
import TwoValue from '../twoValue';
import { isNumber } from 'lodash';
import TextInput from 'quo-ui/textInput';

class Viewport extends Component {
  constructor (props) {
    super(props);
    this.deviceSelection = React.createRef();
  }

  setToCustom () {
    this.deviceSelection.current.setToCustom();
  }

  render () {
      return (
        <PropCardWrapper title='Viewport'>
          <DeviceSelection/>
          <WidthAndHeightValues
            innerWidth={this.props.innerWidth}
            innerHeight={this.props.innerHeight}
            update={this.update}
          />
        </PropCardWrapper>
      )
  }
}

class DeviceSelection extends Component {
  devices = {
    iphone5: {
      text: 'Iphone 5',
      value: () => [1000, 1000]
    },
    iphone6: {
      text: 'Iphone 6',
      value: () => [900, 900]
    },
    custom: {
      text: 'Custom',
      value: () => [this.props.innerWidth, this.props.innerHeight]
    }
  }
  setToCustom () {

  }

  render () {
    return null;
  }
}

class WidthAndHeightValues extends TwoValue {

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

export default Viewport