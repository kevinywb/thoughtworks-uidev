import styles from './nav.less';
import {
    Component,
    Connect
} from '../framework/app';
import menu from '../models/menu';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            histories: [{
                id: 2,
                text: 'bjstdmngbgr02/Acceptance_test'
            }, {
                id: 3,
                text: 'bjstdmngbgr03/Acceptance_test'
            }, {
                id: 4,
                text: 'bjstdmngbgr04/Acceptance_test'
            }, {
                id: 5,
                text: 'bjstdmngbgr05/Acceptance_test'
            }, {
                id: 6,
                text: 'bjstdmngbgr06/Acceptance_test'
            }, {
                id: 7,
                text: 'bjstdmngbgr07/Acceptance_test'
            }, {
                id: 8,
                text: 'bjstdmngbgr08/Acceptance_test'
            }, {
                id: 9,
                text: 'bjstdmngbgr09/Acceptance_test'
            }, {
                id: 11,
                text: 'bjstdmngbgr11/Acceptance_test'
            }, {
                id: 12,
                text: 'bjstdmngbgr12/Acceptance_test'
            }, {
                id: 13,
                text: 'bjstdmngbgr13/Acceptance_test'
            }]
        }
    }

    componentDidMount() {
        this.dispatch({
            type: 'menu/getAll',
            payload: {
                callback: (res) => {
                    if (res.success && res.data) {
                        res.data.find(item => {
                            item.active && this.onActived && this.onActived(item.name);
                        });
                    }
                }
            }
        });
    }

    onClick(e) {
        const name = e.getAttr('name');
        const menus = this.state.menus;
        menus.find(item => {
            item.name == name ? item.active = true : item.active = false;
        });
        this.setState({
            menus: menus
        });
        if (this.onActived) this.onActived(name);
    }

    onClose() {
        if (this.onClosed) this.onClosed();
    }

    render() {
        const menus = [],
            histories = [];
        this.state.menus.forEach(menu => {
            menus.push(
                `<li name="${menu.name}" 
                    ${menu.active ? `class="${styles.active}"` : ''} onclick="onClick">
                    <i class="${menu.icon}"> ${menu.text}</i>
                </li>`);
        });
        this.state.histories.forEach(history => {
            histories.push(`<li><a>${history.text}</a></li>`);
        });
        return (`
            <div>
                <a class="${styles.close}" onclick="onClose"><i class="icon-close"></i></a>
                <ul class="${styles.menus}">
                    ${menus.join('')}
                </ul>
                <div class="${styles.history}">
                    <label>History</label>
                    <ul>
                        ${histories.join('')}
                    </ul>
                </div>
            </div>
        `);
    }
}

export default Connect([
    menu
])(Nav);