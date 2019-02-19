import React, { Component } from 'react';

import TextInput from 'quo-ui/textInput';

import PropCardWrapper from '../PropCardWrapper';

class Text extends Component {

  updateText = (val, title, isFinal) => {
    if(isFinal) {
      this.props.update({ textString: val })
    }
  }

  render(){
    return(
      <PropCardWrapper title='Text'>
        <TextInput fullWidth title='text' text={this.props.textString} type='string' after="" onChange={this.updateText}/>
      </PropCardWrapper>
    )
  }
}

export default Text