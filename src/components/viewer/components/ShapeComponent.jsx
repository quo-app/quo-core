import React from 'react';
import CoreComponent from './CoreComponent';
import { pick } from 'lodash';
import { translatePropData } from 'quo-parser/propTranslator';

class ShapeComponent extends CoreComponent {

  getCurrentProps(obj){
    return obj.state.states[obj.state.current].props
  }

  getDimensionsCSS(props){
    return translatePropData('abstract','css',pick(props,['width','height']));
  }

  getStyleCSS(props){
    return translatePropData('abstract','css', pick(props,['fill','strokeColor','strokeWidth']));
  }

  render(){

    const props = this.getCurrentProps(this.props.component);
    const style = this.getStyleCSS(props);
    const dimensions = this.getDimensionsCSS(props);

    return(
      <svg style={{...dimensions,...style, strokeLineJoin:'round'}}>
        { this.props.component.svgComponent }
      </svg>
    )
  }
}

export default ShapeComponent
