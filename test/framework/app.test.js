import {
    App,
    Component,
    Connect,
    Create,
    Router
} from '../../src/framework/app';

describe('app', () => {

    const app = App.getApp();

    it('singleton mode correctly', () => {
        const app2 = App.getApp();
        expect(app2).toEqual(app);
    });

    it('able to be configured', () => {
        const config = app.config({
            a: 1
        });
        expect(config.a === 1).toBe(true);
    });

    it('middleware correctly', () => {
        const a = () => next => action => {
                let val = next(action);
                return val;
            },
            middlewares = app.middlewares([a]);
        expect(middlewares).toContain(a);
    });

    it('router correctly', (done) => {
        app.config({
            historyTracker: false
        });
        Router(new Component(), '../views/help/help').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    it('router with history correctly', (done) => {
        app.config({
            historyTracker: true
        });
        Router(new Component(), '../views/help/help').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    it('able to be started', (done) => {
        app.config({
            providerPath: '../layout/layout'
        })
        app.start('body').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    it('connect correctly', () => {
        const model = {
            namespace: 'test',
            state: {
                text: 'No'
            },
            reducers: {
                getText(state, {
                    payload
                }) {
                    return {
                        ...state,
                        ...{
                            text: payload
                        },
                    };
                }
            },
            effects: {
                getText: async () => {
                    const res = await new Promise((resolve) => {
                        return resolve('Yes')
                    });
                    return res;
                }
            }
        }
        class Parent extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    text: ''
                };
            }
            componentWillMount() {}
            componentDidMount() {
                this.dispatch({
                    type: 'test/getText'
                });
                //no exist type test
                this.dispatch({
                    type: 'none'
                });
            }
            render() {
                return (`
                    <div>
                        ${this.state.text}:
                        <div children="sub"></div>
                    </div>`)
            }
        }
        class Children extends Component {};
        const children = new Children();
        children.renderDOM();
        expect(children.element).toBeDefined();
        const component = Connect([
            model
        ], {
            sub: children
        })(Parent);
        expect(component).toBeDefined();
    });

    it('able to be created', () => {
        class StatelessComponent extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    text: 'hello',
                }
            }
        }
        const a = Create({
                text: 'a',
            })(StatelessComponent),
            b = Create()(StatelessComponent);
        expect(a.state.text).toBe('a');
        expect(b.state.text).toBe('hello');
    });
});