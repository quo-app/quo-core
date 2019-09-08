import React from 'react';
import { pick } from 'lodash';
import { translatePropData } from 'quo-parser/propTranslator';

import CoreComponent from './CoreComponent';

class ShapeComponent extends CoreComponent {
  getDimensionsCSS (props) {
    return translatePropData('abstract','css', pick(props,['width', 'height']));
  }

  getStyleCSS (props) {
    return translatePropData('abstract','css', pick(props,['fill', 'fillOpacity', 'strokeColor', 'strokeWidth']));
  }

  render () {
    const props = this.props.props
    const style = this.getStyleCSS(props);
    const dimensions = this.getDimensionsCSS(props);
    return(
      <svg style={{...dimensions, ...style }}>
        <path d={this.props.props.path}/>
      </svg>
    )
  }
}

export default ShapeComponent
