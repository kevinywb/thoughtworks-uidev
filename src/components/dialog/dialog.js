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
            title: 'Title',
            placeholder: 'Placeholder',
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
            // to: element,
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
        const data = this.state.data;
        data.forEach(item => {
            if (item.text === e.value) {
                item.selected = true;
            }
        })
        this.setState({
            data: data
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

    onInput(e) {
        const data = this.state.data.find(item => {
            return item.text === e.value;
        })
        if (!data) e.element.value = '';
    }

    render() {
        const inputs = [],
            datalist = [];
        this.state.data.forEach(item => {
            if (item.selected) {
                inputs.push(item.text);
            } else {
                datalist.push(`<option value="${item.text}" />`);
            }
        });

        const content = `
            <div class="${styles.header}">
                <span>${this.state.title}</span><a onclick="onClose"><i class="icon-close"></i></a>
            </div>
            <div class="${styles.content}">
                <input placeholder="${this.state.placeholder}" value="${inputs.join(',')}" />
                <input autofocus onchange="onChange" onkeyup="onKeyup" oninput="onInput" class="${styles.select}" list="${styles.select}" />
                <datalist id="${styles.select}">   
                    ${datalist.join('')}
                </datalist>
            </div>
            <div class="${styles.footer}">
                <a class="btn bg-primary" onclick="onAdd">Add Resources</a>
                <a class="btn bg-dark" onclick="onCancel">Cancel</a>
            </div>`;
        return `
            <div  ${this.state.show?'':'hidden'}>
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