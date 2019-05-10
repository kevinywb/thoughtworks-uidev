import styles from './card.less';
import {
    Component
} from '../../framework/app';

/**
 * card
 */
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'card', // card or table
            title: 'Title',
            titles: ['A', 'B', 'C'],
            value: 0,
            values: [1, 2, 3],
            icon: '',
            backgroundColor: '#fff',
            animate: false,
            ...props
        }
    }

    /**
     * mount component after
     */
    componentDidMount() {
        if (this.state.animate) {
            let startIndex = 0;
            const i = this.find('i');
            setInterval(() => {
                if (startIndex >= 360) {
                    startIndex = 0;
                }
                i.style['transform'] = "rotate(" + (startIndex) + "deg)";
                startIndex += 5;
            }, 50);
        }
    }

    /**
     * render
     */
    render() {
        let content = `      
                <div class="${styles.title}">${this.state.title}</div>
                <div class="${styles.value}">${this.state.value}</div>
                <span class="${styles.icon}"><i class="${this.state.icon}"></i></span>
            `;

        switch (this.state.type) {
            case 'table':
                content = `
                    <div class="${styles.table}">
                        <div class="row">
                            <span class="col">${this.state.titles[0]}</span>
                            <span class="col">${this.state.titles[1]}</span>
                            <span class="col">${this.state.titles[2]}</span>
                        </div>
                        <div class="row">
                            <span class="col">${this.state.values[0]}</span>
                            <span class="col">${this.state.values[1]}</span>
                            <span class="col">${this.state.values[2]}</span>
                        </div>
                    </div>
                    <div class="${styles.table2}">
                        <div class="row">
                            <span class="col">${this.state.titles[0]}</span>
                            <span class="col">${this.state.values[0]}</span>
                        </div>
                        <div class="row">
                            <span class="col">${this.state.titles[1]}</span>
                            <span class="col">${this.state.values[1]}</span>
                        </div>
                        <div class="row">
                            <span class="col">${this.state.titles[2]}</span>
                            <span class="col">${this.state.values[2]}</span>
                        </div>        
                    </div>
                `;
                break;
        }

        return (`
            <div class="${styles.card}" style="background:${this.state.backgroundColor}">
                ${content}
            </div>
        `)
    }
}

export default Card;