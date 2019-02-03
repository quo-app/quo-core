import React, { PureComponent } from 'react';

import ImageComponent from './components/ImageComponent';
import ShapeComponent from './components/ShapeComponent';
import TextComponent from './components/TextComponent';

class ComponentRenderCore extends PureComponent {
  render = () => {
    switch (this.props.type) {
      case 'shape':
        return (<ShapeComponent props={ this.props.props }></ShapeComponent>)
      case 'text':
        return (<TextComponent props={ this.props.props } id={this.props.id}></TextComponent>)
      case 'image':
        return <ImageComponent props={ this.props.props }/>
      default:
        const Wrapper = this.props.wrapper
        return (
          <React.Fragment>
            {
              this.props.children.map(id => {
                return (
                  <Wrapper
                    id={id}
                    key={id}
                    selector={this.props.selector}
                    propsSelector={this.props.propsSelector}
                  />
                )
              })
            }
          </React.Fragment>
        )
    }
  }
}

export default ComponentRenderCore
