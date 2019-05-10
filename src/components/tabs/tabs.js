import styles from './tabs.less';
import {
    Component
} from '../../framework/app';

/**
 * tabs
 */
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                    type: 'tab',
                    name: 'all',
                    text: 'All',
                    active: true
                },
                {
                    type: 'tab',
                    name: 'physical',
                    text: 'Physical'
                },
                {
                    type: 'tab',
                    name: 'virtual',
                    text: 'Virtual'
                },
                {
                    type: 'search'
                },
                {
                    type: 'tag',
                    name: 'list',
                    icon: 'icon-th-list',
                    active: true
                }, {
                    type: 'tag',
                    name: 'card',
                    icon: 'icon-th-card'
                }
            ],
            ...props
        }
    }

    /**
     * search event
     * @param {*} e - event
     */
    onSearch(e) {
        if (this.onSearched) this.onSearched(e.value);
    }

    /**
     * tab change event
     * @param {*} e - event
     */
    onTabChange(e) {
        const name = e.getAttr('name');
        const items = this.state.items;
        items.find(item => {
            if (item.type === 'tab') {
                item.name == name ? item.active = true : item.active = false;
            }
        });
        this.setState({
            items: items
        });
        if (this.onTabActived) this.onTabActived(name);
    }

    /**
     * tag change event
     * @param {*} e - event
     */
    onTagChange(e) {
        const name = e.getAttr('name');
        const items = this.state.items;
        items.find(item => {
            if (item.type === 'tag') {
                item.name == name ? item.active = true : item.active = false;
            }
        });
        this.setState({
            items: items
        });
        if (this.onTagActived) this.onTagActived(name);
    }

    /**
     * render
     */
    render() {
        const contents = [];
        let searchContent = '';
        let tabContents = [];
        this.state.items.forEach(item => {
            switch (item.type) {
                case 'tab':
                    const tabContent = `
                        <a class="${styles.tab} ${item.active ? `${styles.active}` : ''}" 
                            name="${item.name}"
                            onclick="onTabChange"
                        >
                            ${item.text}
                        </a>`
                    tabContents.push(tabContent);
                    contents.push(tabContent);
                    break;
                case 'search':
                    searchContent =
                        `<span class="${styles.search}">
                            <i class="icon-search"></i><input onchange="onSearch" />
                        </span>`
                    contents.push(searchContent);
                    break;
                case 'tag':
                    contents.push(`
                        <a class="${styles.button} ${item.active ? `${styles.active}` : ''}"
                            name="${item.name}"
                            onclick="onTagChange"
                        >
                            <i class="${item.icon}"></i>
                        </a>`);
                    break;
            }
        })
        return `
            <div>
                <div class="${styles.xstabs}">
                    ${searchContent}
                </div>
                <div class="${styles.xstabs}">
                    ${tabContents.join('')}
                </div>
                <div class="${styles.tabs}">
                    ${contents.join('')}
                </div>
            </div>
        `
    }
}

export default Tabs;