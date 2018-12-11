import AbstractComponent, { initAbstractComponent } from './AbstractComponent';

initAbstractComponent();

export default class AbstractText extends AbstractComponent {
    constructor(data){
        super(data);
        this.class = 'text';
    }
}
