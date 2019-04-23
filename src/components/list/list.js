import styles from './list.less';
import {
    Component
} from '../../framework/app';

let selectedItemId = 0;
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                id: 1,
                logo: './assets/osicons/windows.png',
                title: 'bjstdmngbgr01.thoughworks.com',
                tag: 'idle',
                ip: '127.0.0.1',
                path: '/var/lib/cruise-agent',
                opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: false
            }]
        }
    }

    removeOpts(opt) {
        const items = this.state.items.map(item => {
            if (item.id == selectedItemId) {
                const i = item.opts.findIndex(o => {
                    return o === opt
                });
                item.opts.splice(i, 1);
            }
            return item;
        });
        this.setState({
            items: items
        });
    }

    addOpts(opt) {
        const items = this.state.items.map(item => {
            if (item.id == selectedItemId) {
                const i = item.opts.findIndex(o => {
                    return o === opt
                });
                if (i < 0) {
                    item.opts.push(opt);
                }
            }
            return item;
        });
        this.setState({
            items: items
        });
    }

    onAddClick(e) {
        selectedItemId = e.getAttr('val');
        if (this.onAdded) this.onAdded(e.element);
    }

    onDeleteClick(e) {
        selectedItemId = e.getAttr('val');
        if (this.onDeleted) this.onDeleted(e.getAttr('val'), e.getAttr('opt'));
    }

    onDenyClick(e) {

    }

    render() {
        const contents = [];
        let opts = [];
        this.state.items.forEach(item => {
            if (item.opts) {
                opts = [];
                item.opts.forEach(opt => {
                    opts.push(`<a>${opt} <i val="${item.id}" opt="${opt}" onclick="onDeleteClick" class="icon-trash"></i></a>`);
                })
            }
            contents.push(`
                <div class="${styles.item} ${item.tag === 'idle' ? styles.idle : styles.warning}">
                    <img class="${styles.logo}" src="${item.logo}" />
                    <div class="row">
                        <span class="col ${styles.title}">
                            <a><i class="icon-desktop"></i>&nbsp;${item.title}</a>
                        </span>
                        <span class="col ${styles.tag}"> 
                            <span class="${item.tag === 'idle' ? 'bg-success' : 'bg-warning'}">${item.tag}</span>
                        </span>
                        <span class="col ${styles.ip}"><i class="icon-info"></i>&nbsp;${item.ip}</span>
                        <span class="col ${styles.path}"><i class="icon-folder"></i>&nbsp;${item.path}</span>
                    </div>
                    <div class="row ${styles.op}">
                        <div class="col ${styles.add}">
                            <a val="${item.id}" onclick="onAddClick"><i class="icon-plus"></i></a>
                        </div>
                        <div class="col ${styles.opts}">
                            ${opts.join('')}
                        </div>
                        <div class="col ${styles.deny}">
                            ${item.deny?`<a onclick="onDenyClick"><i class="icon-deny"></i> Deny</a>`:''}
                        </div>
                    </div>
                </div>`);
        });
        return `
            <div>
                ${contents.join('')}
            </div>
        `;
    }
}

export default List;