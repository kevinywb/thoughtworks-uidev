import {
    App,
    Component,
    Connect,
    Create,
    Router,
    Request
} from '../src/framework/app';

const app = App.getApp();

describe('app', () => {
    test('getApp', () => {
        const app2 = App.getApp();
        expect(app2).toEqual(app);
    })

    test('config', () => {
        const config = app.config({
            historyTracker: true,
            providerPath: './components/layout/layout',
            apiBaseUrl: 'http://localhost/api',
        });
        expect(config.historyTracker === true).toBe(true);
        expect(config.providerPath === './components/layout/layout').toBe(true);
        expect(config.apiBaseUrl === 'http://localhost/api').toBe(true);
    });

    test('middlewares', () => {
        const a = () => next => action => {
                let val = next(action);
                return val;
            },
            middlewares = app.middlewares([a]);
        expect(middlewares).toContain(a);
    });

    test('router', (done) => {
        app.config({
            historyTracker: false
        });
        Router(new Component(), '../views/help/help').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    test('router with history', (done) => {
        app.config({
            historyTracker: true
        });
        Router(new Component(), '../views/help/help').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    test('request', (done) => {
        Request('menus').then(res => {
            expect(res.success).toBe(true);
            done();
        });
    })

    test('start', (done) => {
        app.config({
            providerPath: '../views/mycruise/mycruise'
        })
        app.start('body').then(res => {
            expect(res).toBeDefined();
            done();
        });
    });

    test('connect', () => {
        const model = {
            namespace: 'test',
            state: {
                btnName: 'hello',
                text: 'No'
            },
            reducers: {
                getAsnycText(state, {
                    payload
                }) {
                    return {
                        ...state,
                        ...{
                            text: payload
                        },
                    };
                },
                getBtnName(state, {
                    payload
                }) {
                    return {
                        ...state,
                        ...{
                            test: payload
                        },
                    };
                }
            },
            effects: {
                getAsnycText: async () => {
                    const res = await new Promise((resolve) => {
                        return resolve('Yes')
                    });
                    return res;
                },
                getBtnName: () => {
                    return 'Test';
                }
            }
        }
        class Parent extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    btnName: 'Hello'
                };
            }
            componentWillMount() {
                console.log('will mount');
            }
            componentDidMount() {
                this.dispatch({
                    type: 'test/getBtnName',
                    payload: {
                        callback: (res) => {
                            expect(res === 'Test').toBe(true);
                        }
                    }
                });
                this.dispatch({
                    type: 'test/getText'
                })
                this.element.click();
            }
            onClick(e) {
                e.getAttr('name');
                console.log(e.val);
            }
            render() {
                return (`
                    <div name="test" onclick="onClick">
                        <input autofocus />
                        <a>${this.state.btnName}</a>
                        <div children="a"></div>
                    </div>`)
            }
        }
        class Children extends Component {
            componentDidMount() {
                this.dispatch({
                    type: 'test2/get'
                });
            }
        }
        const children = Connect([{
            namespace: 'test2',
            state: {},
            reducers: {
                get(state, {
                    payload
                }) {
                    return {
                        ...state,
                        ...payload
                    };
                }
            },
            effects: {}
        }], {})(Children);
        expect(children).toBeDefined();
        const component = Connect([
            model
        ], {
            a: children
        })(Parent);
        expect(component).toBeDefined();
    });

    test('create', () => {
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