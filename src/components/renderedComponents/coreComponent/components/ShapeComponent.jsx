import React from 'react';
import { pick } from 'lodash';

import { translatePropData } from 'quo-parser/propTranslator';

import CoreComponent from './CoreComponent';

class ShapeComponent extends CoreComponent {

  getCurrentProps(obj){
    return this.props.propsSelector(obj)
  }

  getDimensionsCSS(props){
    return translatePropData('abstract','css', pick(props,['width','height']));
  }

  getStyleCSS(props){
    return translatePropData('abstract','css', pick(props,['fill','fillOpacity','strokeColor','strokeWidth']));
  }

  render(){

    const props = this.getCurrentProps(this.props.component);
    const style = this.getStyleCSS(props);
    const dimensions = this.getDimensionsCSS(props);

    return(
      <svg style={{...dimensions, ...style }}>
        <path d={this.props.component.get('path')}/>
      </svg>
    )
  }
}

export default ShapeComponent
