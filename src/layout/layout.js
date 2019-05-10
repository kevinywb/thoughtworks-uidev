import styles from './layout.less';
import {
    Component,
    Connect,
    Router
} from '../framework/app';
import nav from './nav';

/**
 * layout
 */
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            dropdown: false,
            ...props
        }
    }

    /**
     * mount component after
     */
    componentDidMount() {
        nav.onActived = (name) => {
            Router(this.children.router, `./views/${name}/${name}`);
        }
        nav.onClosed = () => {
            this.onMenuClick();
        }
    }

    /**
     * menu click event
     */
    onMenuClick() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    /**
     * opts click event
     */
    onOptsClick() {
        this.setState({
            dropdown: true
        })
    }

    /**
     * dropdown event
     */
    onDropdown() {
        this.setState({
            dropdown: false
        })
    }

    /**
     * render
     */
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