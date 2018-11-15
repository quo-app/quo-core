const commonTranslators = {
  id:(v)=>{return v},
  sketch:{
    abstract:{
      color:(o)=>{ return {
        a:o.alpha,
        r:parseInt(o.red * 255),
        g:parseInt(o.green * 255),
        b:parseInt(o.blue * 255),
      }}
    },
  },
  abstract:{
    css:{
      int2px: v => v + 'px',
      color: o => `rgba(${o.r},${o.g},${o.b},${o.a})`,
      int2string: v => `${v}`,
    },
  }
}

export const router = {
  sketch:{
    abstract:{
      width:{
       prop:'width',
       translate:commonTranslators.id,
      },
      height:{
        prop:'height',
        translate:commonTranslators.id,
      },
      x:{
        prop:'x',
        translate:commonTranslators.id,
      },
      y:{
        prop:'y',
        translate:commonTranslators.id,
      },
      border:{
       thickness:{
         parent:'border',
         prop:'width',
         translate:commonTranslators.id,
       },
       color:{
         parent:'border',
         prop:'color',
         translate:commonTranslators.sketch.abstract.color,
       },
       radius:{
         parent:'border',
         prop:'radius',
         translate:commonTranslators.id,
       },
       style:{
         parent:'border',
         prop:'style',
         translate:commonTranslators.id,
       }
      },
      borderRadius: {
        prop:'borderRadius',
        translate: commonTranslators.id,
      },
      rotation:{
        parent:'transform',
        prop:'rotation',
        translate:commonTranslators.id,
      },
      shadow:{
        offsetX:{
          parent:'shadow',
          prop:'offset-x',
          translate:commonTranslators.id,
        },
        offsetY:{
          parent:'shadow',
          prop:'offset-y',
          translate:commonTranslators.id
        },
        blurRadius:{
          parent:'shadow',
          prop:'blur',
          translate:commonTranslators.id,
        },
        spread:{
          parent:'shadow',
          prop:'spread',
          translate:commonTranslators.id,
        },
        color:{
          parent:'shadow',
          prop:'color',
          translate:commonTranslators.sketch.abstract.color,
        },
      },
      backgroundColor:{
        prop:'background',
        translate:commonTranslators.sketch.abstract.color,
      },
      fill:{
        prop:'fill',
        translate: commonTranslators.sketch.abstract.color,
      },
      fillOpacity:{
        prop:'fillOpacity',
        translate: commonTranslators.id,
      },
      strokeColor: {
        prop: 'strokeColor',
        translate: commonTranslators.sketch.abstract.color
      },
      strokeWidth: {
        prop: 'strokeWidth',
        translate: commonTranslators.id,
      },
      textString:{
        prop:'textString',
        translate: commonTranslators.id,
      },
      fontColor: {
        prop:'fontColor',
        translate: commonTranslators.sketch.abstract.color,
      },
      fontFamily: {
        prop: 'fontFamily',
        translate: commonTranslators.id,
      },
      fontSize: {
        prop: 'fontSize',
        translate:commonTranslators.id,
      }
      //
    }
  },
  abstract:{
    css:{
      'width':{
       prop: 'width',
       translate: commonTranslators.abstract.css.int2px,
      },
      'height':{
        prop:'height',
        translate: commonTranslators.abstract.css.int2px,
      },
      'x':{
        prop:'left',
        translate: commonTranslators.abstract.css.int2px,
      },
      'y':{
        prop:'top',
        translate: commonTranslators.abstract.css.int2px,
      },
      fill:{
        prop:'fill',
        translate: v => `rgb(${v.r},${v.g},${v.b})`
      },
      fillOpacity:{
        prop:'fillOpacity',
        translate: commonTranslators.abstract.css.int2string,
      },
      textString:{
        disallow:true
      },
      border:{
        prop:'border',
        translate:(v)=>{
          let returnObj = {}
          if(v.thickness && v.color && v.style){
            returnObj['border'] = `${commonTranslators.abstract.css.int2px(v.thickness)} ${v.style} ${commonTranslators.abstract.css.color(v.color)}`
          }
          //add border-radius here later;
          return returnObj
        }
      },
      borderRadius: {
        prop:'borderRadius',
        translate: v => ({ borderRadius: v.map(commonTranslators.abstract.css.int2px).join(' ')})
      },
      strokeColor: {
        prop:'stroke',
        translate:commonTranslators.abstract.css.color,
      },
      strokeWidth: {
        prop:'strokeWidth',
        translate: commonTranslators.abstract.css.int2px,
      },
      fontColor: {
        prop:'color',
        translate: commonTranslators.abstract.css.color,
      },
      fontFamily: {
        prop: 'fontFamily',
        translate: (v) => `"${v}", sans-serif`,
      },
      fontSize: {
        prop: 'fontSize',
        translate: commonTranslators.abstract.css.int2px,
      }
    },
    textProps:{
      textString:{
        prop:'textString',
        translate:commonTranslators.id
      }
    }
  }
}
