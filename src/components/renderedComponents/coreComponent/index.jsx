import React, { PureComponent } from 'react';

import ImageComponent from './components/ImageComponent';
import ShapeComponent from './components/ShapeComponent';
import TextComponent from './components/TextComponent';

class ComponentRenderCore extends PureComponent {
  render = () => {
    switch (this.props.component.get('type')) {
      case 'shape':
        return (<ShapeComponent component={ this.props.component } propsSelector={this.props.propsSelector}></ShapeComponent>)
      case 'text':
        return (<TextComponent component={ this.props.component } propsSelector={this.props.propsSelector}></TextComponent>)
      case 'image':
        return <ImageComponent component={this.props.component} propsSelector={this.props.propsSelector}/>
      default:
        const Wrapper = this.props.wrapper
        return (
          <React.Fragment>
            {
              this.props.component.get('children').map(id => {
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
