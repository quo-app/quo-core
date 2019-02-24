import React, { Component } from 'react';
import PropCardWrapper from '../PropCardWrapper';
import _ from 'lodash';
import Icons from 'quo-ui/icons';
import TwoValue from '../twoValue';
import { isNumber } from 'lodash';
import TextInput from 'quo-ui/textInput';
import { Button } from 'quo-ui/buttons';
import { Card } from 'quo-ui/cards';
import { RightSidebarModal } from 'quo-components/sidebarModal';

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
          <div className='viewport-row-wrapper'>
            <DeviceSelection/>
            <div className='card-divider'/>
            <WidthAndHeightValues
              innerWidth={this.props.innerWidth}
              innerHeight={this.props.innerHeight}
              update={this.update}
            />
          </div>
        </PropCardWrapper>
      )
  }
}

class DeviceSelection extends Component {
  devices = {
    iphone7: {
      key: 'iphone7',
      text: 'Apple iPhone 7',
      value: () => [1080, 1920]
    },
    iphone6plus: {
      key: 'iphone6plus',
      text: 'Apple iPhone 6+',
      value: () => [1080, 1920]
    },
    iphone6s: {
      key: 'iphone6s',
      text: 'Apple iPhone 6s',
      value: () => [750, 1134]
    },
    iphone6: {
      key: 'iphone6',
      text: 'Apple iPhone 6',
      value: () => [750, 1134]
    },
    iphone5: {
      key: 'iphone5',
      text: 'Apple iPhone 5',
      value: () => [640, 1136]
    },
    pixel: {
      key: 'pixel',
      text: 'Google Pixel',
      value: () => [1080, 1920]
    },
    pixel2: {
      key: 'pixel2',
      text: 'Google Pixel 2',
      value: () => [1080, 1920]
    },
    custom: {
      notAnOption: true,
      key: 'custom',
      text: 'Custom',
      value: () => [this.props.innerWidth, this.props.innerHeight]
    }
  }

  state = {
    modalVisible: false,
    current: 'custom'
  }

  setToCustom () {
    this.setState({ current: 'custom' })
  }

  modalView () {
    return (
      <RightSidebarModal>
        <div className='device-selection'>
          <div className='device-list'>
            <Card title='devices'>
              {
                Object.values(this.devices).map(entry => {
                  return (
                    entry.notAnOption ? null :
                    <div className='device-entry' onClick={() => {
                      this.setState({
                        current: entry.key,
                        modalVisible: false
                      })
                    }}>
                      <div className='entry-name'>
                        { entry.text }
                      </div>
                      <div className='entry-dimensions'>
                        { `${entry.value()[0]}x${entry.value()[1]}` }
                      </div>
                    </div>
                  )
                })
              }
            </Card>
          </div>
          <Button onClick={()=> this.setState({ modalVisible: false})}> Cancel </Button>
          </div>
        </RightSidebarModal>
    )
  }

  render () {
    return (
      this.state.modalVisible ?
        this.modalView()
      :
        <div className='devices-row' onClick={() => this.setState({ modalVisible: true})}>
          <div className='device-row-value'>
          { this.devices[this.state.current].text }{<Icons.KeyboardArrowDown/>}
          </div>
          <div className='device-row-title'> Type </div>
        </div>
    )
  }
}

class WidthAndHeightValues extends TwoValue {

  updateW = (val, title, isFinal) => this.updateValues(val, 'innerWidth', isFinal)

  updateH = (val, title, isFinal) => this.updateValues(val, 'innerHeight', isFinal)

  valuesExist = () => isNumber(this.props.innerWidth) && isNumber(this.props.innerHeight)

  render() {
    return(
      this.valuesExist() ?
      <div className='values-row'>
        <TextInput title='W' text={this.props.innerWidth} type='number' after="" onChange={this.updateW}/>
        <TextInput title='H' text={this.props.innerHeight} type='number' after="" onChange={this.updateH}/>
      </div>
      : null
    )
  }
}

export default Viewport