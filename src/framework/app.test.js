import {
    App,
    Component,
    Connect,
    Create,
    Router
} from './app';

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
            componentWillMount() {}
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