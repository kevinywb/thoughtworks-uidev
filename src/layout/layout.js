import styles from './layout.less';
import {
    Component,
    Connect,
    Router
} from '../framework/app';
import nav from './nav';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            collapsed: true,
            dropdown: false
        }
    }

    componentDidMount() {
        nav.onActived = (name) => {
            Router(this.children.router, `./views/${name}/${name}`);
        }
        nav.onClosed = () => {
            this.onMenuClick();
        }
    }

    onMenuClick() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    onOptsClick() {
        this.setState({
            dropdown: true
        })
    }

    onDropdown() {
        this.setState({
            dropdown: false
        })
    }

    render() {
        return (`
            <div>
                <div class="row ${styles.header}">
                    <div class="col ${styles.btn}">
                        <a onclick="onMenuClick"><i class="icon-navicon"></i></a>
                    </div>
                    <div class="col ${styles.logo}"></div>
                    <div class="col">
                        <span class="${styles.opts}"><i onclick="onOptsClick" class="icon-angle-down"></i>                
                            <ul ${this.state.dropdown?'':'hidden'}>
                                <li onclick="onDropdown"><a><i class="icon-id-card"></i> Profile</a></li>
                                <li onclick="onDropdown"><a><i class="icon-sign-in"></i> Sign Out</a></li>
                            </ul>             
                        </span>
                        <span class="${styles.avatar}"></span>
                    </div>
                </div>
                <div class="${styles.content}">
                    <div class="${styles.nav} ${this.state.collapsed ? styles.collapsed : ''}" children="nav"></div>
                    <div class="${styles.view}" children="router"></div>
                </div>
                <div class="${styles.footer}">
                    <span class="${styles.copyright}">© Copyright 2017 ThoughtWorks</span>
                </div>
            </div>
        `);
    }
}

export default Connect([], {
    nav,
    router: new Component()
})(Layout);