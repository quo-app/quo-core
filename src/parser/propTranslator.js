import _ from 'lodash';
import { router } from './translatorRouter';

const convertProps = (from,to,prop,val) => {

  let path = router[from][to]
  let propObj = {...path};

  //find the property obj by going through the list
  prop.split(' ').forEach( p => {
    propObj = propObj[p];
  });

  //if it is a nested value
  if(propObj.parent){
    let newNode = {};
    newNode[propObj.parent] = {}
    newNode[propObj.parent][propObj.prop] = propObj.translate(val);
    return newNode
  }

  //if its alone
  return { [propObj.prop]:propObj.translate(val) }

}

const pickEnabledProp = (props) => {
  let results = props.filter((prop)=>{return prop.isEnabled})
  if(results.length === 1){
    return results[0]
  }
  return undefined
}

class Translator {
  static abstract = (to,data) => {
    let allProps = {};
    _.forEach(data, (val, prop) =>{
      if(router['abstract'][to][prop].disallow) return;
      //if there are inner values corresponding
      let res = router['abstract'][to][prop].translate(val)
      //if it's a single css rule add it alone
      if(typeof res === 'string'){
        allProps[router['abstract'][to][prop].prop] = res;
      }
      //if it's multiple css rules, merge them all
      else{
        _.merge(allProps,router['abstract'][to][prop].translate(val))
      }
    })
    return allProps;
  }

  static sketch = (to,data) => {
    let allProps = {};
    const addProp = (prop,val) => {
      _.merge(allProps, convertProps('sketch',to,prop,val));
    }

    if(data.frame){
      let f = data.frame;

      addProp('height',f.height);
      addProp('width',f.width);

      addProp('x',f.x);
      addProp('y',f.y);

    }
    if(data.style){
      let s = data.style;
      if(s.borders){
        let eProp = pickEnabledProp(s.borders);
        if(eProp){
          if(['rectangle','oval','triangle','polygon','star', 'shapePath'].includes(data._class)){
            addProp('strokeWidth', eProp.thickness);
            addProp('strokeColor', eProp.color);
          }
          else{
            addProp('border thickness', eProp.thickness);
            addProp('border color', eProp.color);
            addProp('border style','solid');
          }

          //update height/width x/y here since there is a thickness

          let f = data.frame;

          addProp('height',f.height + eProp.thickness / 2);
          addProp('width',f.width + eProp.thickness / 2);

          addProp('x',f.x - eProp.thickness / 2);
          addProp('y',f.y - eProp.thickness / 2);

        }
      }
      //border radius
      if(data.points){
        let corners = data.points.map(o => o.cornerRadius);
        addProp('borderRadius', corners);
      }
      if(s.fills){
        let eProp = pickEnabledProp(s.fills);
        if(eProp){
          addProp('fill', eProp.color)
          addProp('fillOpacity', eProp.color.alpha)
        }
        // no enabled fill
        else {
          addProp('fillOpacity', 0)
        }
      }
      // no fill on the path
      else {
        addProp('fillOpacity', 0)
      }
      //continue this
    }

    if(data._class === 'text'){
      addProp('textString', data.attributedString.string);
      //gets the first attribute blob
      let attributes = data.attributedString.attributes[0].attributes;

      if(attributes){
        let color = attributes.MSAttributedStringColorAttribute
        let font = attributes.MSAttributedStringFontAttribute
        if(color) addProp('fontColor', color);
        if(font){
          const fontName = font.attributes.name;
          const fontSize = font.attributes.size;
          if(fontName) addProp('fontFamily', fontName);
          if(fontSize) addProp('fontSize', fontSize)
        }
      }

      // paragraphStyle
      // alignment = 0 => left align
      // aligment = 1 => right align
      // alignment = 2 => center align
      let alignment = 0;
      if(data.style.textStyle.encodedAttributes.paragraphStyle.alignment !== undefined) {
        alignment = data.style.textStyle.encodedAttributes.paragraphStyle.alignment;
      }
      addProp('textAlignment', alignment);
    }

    //add border radius for rectangular shapes
    //the border also exists for non-rectangular shapes
    //come back to this later

    // if(data.points && data.points.length === 4){
    //   let points = data.points;
    //   let cornerRadii = points.map((p)=>{return p.cornerRadius})
    // }

    return allProps
  }
}

export const translatePropData = (from, to, data) => {
  switch(from){
    case 'sketch':
      return Translator.sketch(to,data);
    case 'abstract':
      return Translator.abstract(to,data);
    default:
      return {}
  }
}
