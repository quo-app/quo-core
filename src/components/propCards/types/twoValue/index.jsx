import React, { Component } from 'react';

export default class TwoValueCard extends Component {

  isOneOff = (next, prev) => Math.abs(parseInt(next) - prev) === 1

  isGoodValue = val => !isNaN(parseInt(val))

  /*
    update the property in the store
    if:
      - it is a valid(non-NaN) number
    and:
      - the text input is final or
        the text input is one off +1, -1
  */

  updateValues = (val, key, isFinal) => {
    if(this.isGoodValue(val) && (isFinal || this.isOneOff(val, this.props[key]))) {
      this.props.update({[key]: parseInt(val)})
    }
  }

  render () {
    return null
  }
}