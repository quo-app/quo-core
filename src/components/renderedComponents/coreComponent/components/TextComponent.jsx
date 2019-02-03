import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import selectors from 'quo-redux/selectors';
import { translatePropData } from 'quo-parser/propTranslator';

import CoreComponent from './CoreComponent';

class TextComponent extends CoreComponent{

    state = {
        editMode: false
    }

    getFontFamily(){
        // return (
        //     `"${this.state.textData.fontName}", sans-serif`
        // )
    }

    // handleDoubleClick(){
    //     this.setState({editMode:true});
    //     this.props.changeDrag(false);
    // }

    // deselect(){
    //     this.setState({editMode:false},()=>{
    //         this.dispatchTextStringUpdate(this.newText)
    //         this.props.changeDrag(true);
    //     })
    // }

    // dispatchTextStringUpdate(string){
    //     const { dispatch } = this.props;
    //     dispatch(TEXT_STRING_UPDATE({textString:string,id:this.state.data.id}));
    // }

    // selectThis(){
    //     const { dispatch } = this.props;
    //     dispatch(COMPONENT_SELECT(this.state.data.id));
    // }

    componentWillReceiveProps(nextProps){
        // if(nextProps.selection !== this.state.data.id && this.state.editMode){
        //     this.setState({editMode:false},()=>{
        //         this.dispatchTextStringUpdate(this.newText)
        //         this.props.changeDrag(true);
        //         this.selectThis();
        //     })
        // }
        // if(!this.state.editMode) this.setState({data:nextProps.data});

    }

    getStyle (props) {
        return this.getPropData(props, 'css', ['fontColor', 'fontFamily', 'fontSize', 'textAlignment' ]);
    }

    getTextString (props) {
        return this.getPropData(props, 'textProps', ['textString']).textString;
    }

    getPropData (props, to, filter) {
        return translatePropData('abstract', to, pick(props, filter));
    }

    handleDoubleClick = e => {
      if (this.props.selectedComponents.includes(this.props.id)) {
        window.alert('edit!')
        e.stopPropagation();
        return false
      }
    }

    //things that change(width,height,string)

    // renderTextElement(){
    //     if(this.state.editMode && this.props.selection === this.state.data.id){
    //         let editStates = this.state.data.editStates;
    //         let style = editStates[this.props.editState].style
    //         let string = editStates[this.props.editState].textString
    //         let w = style.width;
    //         let h = style.height;
    //         return (
    //             <span className='text-outer edit-mode'>
    //             <TextArea className='text-inner'
    //             width={w}
    //             height={h}
    //             value={string}
    //             deselect={this.deselect.bind(this)}
    //             textUpdate={this.textUpdate.bind(this)}
    //             style={{
    //                 fontFamily:style.fontFamily,
    //                 fontSize:style.fontSize,
    //             }
    //         }
    //         />
    //         </span>
    //         )
    //     }
    //     else{
    //         return(
    //             <span className='text-outer'
    //             onDoubleClick={this.handleDoubleClick}
    //             >
    //             <p className='text-inner'>
    //             {this.getText()}
    //             </p>
    //             </span>
    //         )
    //     }
    // }
    render () {
      console.log(this.props.selectedComponents, this.props.id);
      const props = this.props.props;
      return (
        <p className='text-inner' style={this.getStyle(props)} onDoubleClickCapture={this.handleDoubleClick}>
            { this.getTextString(props) }
        </p>
      )
    }
}

const mapStateToProps = state => ({
  selectedComponents: selectors.selectedComponents(state)
})

TextComponent = connect(mapStateToProps)(TextComponent)

export default TextComponent
