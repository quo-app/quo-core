import _ from 'lodash';

const allComponents = ['dock', 'shape', 'group', 'text']

const componentProps = {
    x: allComponents,
    y: allComponents,
    width: allComponents,
    height: allComponents,
    border: allComponents,
    strokeWidth: ['shape'],
    strokeColor: ['shape'],
    fill: ['shape'],
    textString: ['text'],
    fontColor: ['text'],
    innerWidth: ['dock'],
    innerHeight: ['dock']
}

const propsOfCards = {
    Position: {
        requires:{
            all: ['x','y']
        }
    },
    Size: {
        requires: {
            all: ['width', 'height']
        }
    },
    Viewport: {
        requires: {
            dock: ['innerWidth', 'innerHeight']
        }
    },
    Fill: {
        requires: {
            all: ['backgroundColor'],
            shape: ['fill', 'fillOpacity']
        }
    },
    Text: {
        requires: {
            all: ['textString']
        }
    },
    Color: {
        requires: {
            text: ['fontColor']
        }
    }
}

const propCardProps = {
    width: 'Size',
    height: 'Size',
    x: 'Position',
    y: 'Position',
    fill: 'Fill',
    fillOpacity: 'Fill',
    backgroundColor: 'Fill',
    fontColor: 'Color',
    textString: 'Text',
    innerWidth: 'Viewport',
    innerHeight: 'Viewport'
}

const getPropsOf = type => _.keys(_.pickBy(componentProps, prop => prop.includes(type)))
const getCardsOf = props => _.chain(propCardProps).pick(props).values().uniq().value()
export const getCards = type => getCardsOf(getPropsOf(type))
export const getPropsOfCard = (card, type) => {
    let requires = propsOfCards[card].requires;
    // if the component has a unique prop
    // that is used in the card, return that.
    // Otherwise return the common properties
    // that are used.
    return requires[type] || requires.all
}