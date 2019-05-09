import Component from './component';

describe('component', () => {
    it('get a component correctly', () => {
        const a = Component.getComponent(),
            b = Component.getComponent();
        expect(a).toEqual(b);
    });

    it('find a element correctly', () => {
        class CustomComponent extends Component {
            render() {
                return '<div><a></a></div>'
            }
        }
        const component = new CustomComponent();
        component.renderDOM();
        const element = component.find('a');
        expect(element).toBeDefined();
    });

    it('renders correctly', () => {
        expect(new Component().render()).toBeDefined();
    });

    it('mount a element correctly', () => {
        const component = new Component(),
            component2 = new Component(),
            container = document.createElement('div');
        component.mountElement();
        expect(container.childElementCount).toEqual(0);
        component.mountElement(container);
        component2.mountElement(container, true);
        expect(container.childElementCount).toEqual(1);
    })

    it('destroy correctly', () => {
        const component = new Component(),
            container = document.createElement('div');
        component.mountElement(container);
        expect(container.childElementCount).toEqual(1);
        component.destroy();
        expect(container.childElementCount).toEqual(0);
        component.element.remove = null;
        component.element.removeNode = () => {};
        component.destroy();
        expect(container.childElementCount).toEqual(0);
    })

    it('set component state correctly', () => {
        const component = new Component();
        component.setState({
            a: 1
        });
        expect(component.state.a).toEqual(1);
    })
});