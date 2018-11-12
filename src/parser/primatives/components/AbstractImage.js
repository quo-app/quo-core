import { PropCompositor } from 'quo-redux/helpers';

export default class AbstractImage {
    constructor(data) {
        this.initCoreProps(data);
    }

    initCoreProps(data) {
        this.data = data.image;
        this.name = data.name;
        this.id = this.generateId(data.name.split('.')[0]);
        this.class = 'image';

        //styling
        this.initStates(data);
        //linking
        this.initLinkingStructure();
    }

    generateId(str) {
        let hash = 0;
        if (!str.length) return hash;
        str.split('').forEach(s => {
            const char = s.charCodeAt(0);
            hash = ((hash << 5 ) - hash) + char;
            hash |= 0;
        });
        return hash;
    }

    initStates(data) {
        let diffProps = {}
        let states = {
            'composite':{
              props:{},
              modifiers:['_base']
            },
            '_base':{},
            'none':{},
            'hover':{},
            'pressed':{},
            'focused':{},
        }

        states.composite.props = PropCompositor.bakeProps(states.composite.modifiers.map(v => states[v]));

        this.state = {
            current:'composite',
            states
        }
    }

    initLinkingStructure() { }
}