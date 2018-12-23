import React, { Component} from 'react';

import TextInput from 'quo-ui/textInput';

import PropCardWrapper from '../PropCardWrapper';

class Size extends Component{
  constructor (props) {
    super(props)
    this.state = {
      w: this.props.width,
      h: this.props.height
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      w: this.props.width,
      h: this.props.height
    })
  }

  updateW (val, title, isFinal) {
    //set the state and update
    this.setState({w:parseInt(val)},()=>{
      if (isFinal) this.props.update({width:this.state.w})
    });
  }

  updateH (val, title, isFinal) {
    this.setState({h:parseInt(val)},()=>{
      if (isFinal) this.props.update({height:this.state.h})
    });
  }

  render(){
    return(
      this.props.width && this.props.height ?
      <PropCardWrapper title='Size'>
        <TextInput title='W' text={this.state.w} type='number' after="" onChange={this.updateW.bind(this)}/>
        <TextInput title='H' text={this.state.h} type='number' after="" onChange={this.updateH.bind(this)}/>
      </PropCardWrapper>
      :
      <PropCardWrapper title='Size'>
        <TextInput title='W' text='0' type='number'/>
        <TextInput title='H' text='0' type='number'/>
      </PropCardWrapper>

    )
  }
}

export default Size