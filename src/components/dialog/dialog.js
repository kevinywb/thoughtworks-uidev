import styles from './dialog.less';
import {
    Component
} from '../../framework/app';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: null,
            show: false,
            autoselect: false,
            title: 'Title',
            placeholder: 'Placeholder',
            input: '',
            data: [{
                text: 'Item-1',
                selected: false,
            }, {
                text: 'Item-2',
                selected: true
            }]
        };
    }

    clear() {
        this.state.data.forEach(item => {
            item.selected = false;
        });
    }

    show() {
        this.setState({
            show: true
        });
    }

    showTo(element) {
        this.setState({
            to: element,
            show: true
        });
    }

    hide() {
        this.setState({
            show: false
        });
    }

    onAdd(e) {
        const data = this.state.data.filter(item => {
            return item.selected === true;
        })
        if (this.onAdded && this.onAdded(data)) {
            this.hide();
        }
    }

    onCancel(e) {
        this.hide();
    }

    onClose() {
        this.hide();
    }

    onChange(e) {
        const val = e.value || e.getAttr('val'),
            data = this.state.data;
        data.forEach(item => {
            if (val.indexOf(item.text) >= 0) {
                item.selected = true;
            }
        })
        this.setState({
            data: data,
            autoselect: false
        });
    }

    onKeyup(e) {
        if (e.keyCode === 8) {
            const data = this.state.data;
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].selected) {
                    data[i].selected = false;
                    break;
                }
            }
            this.setState({
                data: data
            });
        }
    }

    onFocus(e) {
        this.setState({
            autoselect: true
        })
    }

    render() {
        const inputs = [],
            datalist = [];
        this.state.data.forEach(item => {
            if (item.selected) {
                inputs.push(item.text);
            } else {
                datalist.push(`<li val="${item.text}" onclick="onChange">${item.text}</li>`);
            }
        });
        this.state.input = inputs.join(',');
        const content = `
            <div class="${styles.header}">
                <span>${this.state.title}</span><a onclick="onClose"><i class="icon-close"></i></a>
            </div>
            <div class="${styles.content}">
                <span class="${styles.select}">
                    <input readonly onchange="onChange" 
                        onfocus="onFocus" 
                        placeholder="${this.state.placeholder}" 
                        value="${this.state.input}"
                    />
                    <ul ${this.state.autoselect?'':'hidden'}>
                        ${datalist.join('')}
                    </ul>
                </span>
            </div>
            <div class="${styles.footer}">
                <a class="btn bg-primary" onclick="onAdd">Add Resources</a>
                <a class="btn bg-dark" onclick="onCancel">Cancel</a>
            </div>`;
        return `
            <div ${this.state.show?'':'hidden'}>
                <div class="${this.state.to?`${styles.dialogto}`:`${styles.dialog}`}" 
                    ${this.state.to?`style="top:${this.state.to.offsetTop+60}px;left:${this.state.to.offsetLeft-20}px;"`:''}    
                >
                    ${content}
                </div>
                <div class="${styles.xsdialog}">
                    ${content}
                </div>
            </div>
        `;
    }
}

export default Dialog;