import Component from '../src/framework/component';

describe('component', () => {
    test('getComponent', () => {
        const a = Component.getComponent(),
            b = Component.getComponent();
        expect(a).toEqual(b);
    });

    test('find', () => {
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

    test('render', () => {
        expect(new Component().render()).toBeDefined();
    });

    test('mountElement', () => {
        const component = new Component(),
            container = document.createElement('div');
        component.mountElement();
        expect(container.childElementCount).toEqual(0);
        component.mountElement(container);
        expect(container.childElementCount).toEqual(1);
    })

    test('destroy', () => {
        const component = new Component(),
            container = document.createElement('div');
        component.mountElement(container);
        expect(container.childElementCount).toEqual(1);
        component.destroy();
        expect(container.childElementCount).toEqual(0);
    })

    test('setState', () => {
        const component = new Component();
        component.setState({
            a: 1
        });
        expect(component.state.a).toEqual(1);
    })
});