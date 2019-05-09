import styles from './agent.less';
import {
    Component,
    Connect,
    Create
} from '../../framework/app';
import Card from '../../components/card/card';
import Tabs from '../../components/tabs/tabs';
import List from '../../components/list/list';
import Dialog from '../../components/dialog/dialog';
import devops from '../../models/devops';

//card create
const cardOne = Create({
        title: 'Building',
        value: 3,
        icon: 'icon-cog',
        backgroundColor: '#FF9A2A',
        animate: true,
    })(Card),
    cardTwo = Create({
        title: 'Idle',
        value: 5,
        icon: 'icon-coffee',
        backgroundColor: '#7FBC39'
    })(Card),
    cardThree = Create({
        type: 'table',
        titles: ['ALL', 'PHYSICAL', 'VIRTUAL'],
        values: [8, 4, 4]
    })(Card);

//tab create
const tabs = Create()(Tabs);

//default opts
const opts = [{
    text: 'Firefox'
}, {
    text: 'Safari'
}, {
    text: 'Ubuntu'
}, {
    text: 'Chrome'
}];

//list create
const list = Create()(List);

//dialog crate
const dialog = Create({
    title: 'Separate multiple resources name with commas',
    placeholder: 'e.g. Chrome, Firefox',
    data: opts
})(Dialog);

class Agent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devops: []
        }
    }

    componentDidMount() {
        //tabs events
        tabs.onSearched = (value) => {}
        tabs.onTabActived = (name) => {}
        tabs.onTagActived = (name) => {}

        //list events
        list.onAdded = (element) => {
            dialog.reset();
            dialog.showTo(element);
        }
        list.onDeleted = (opt) => {
            list.removeOpts(opt);
        }

        //dialog events
        dialog.onAdded = (data) => {
            data.forEach(item => {
                list.addOpts(item.text);
            })
            return true;
        }

        //get devops
        this.dispatch({
            type: 'devops/getAll'
        });
    }

    updateList() {
        list.setState({
            items: this.state.devops
        });
    }

    render() {
        this.updateList();
        return (
            `<div>
                <div class="row">
                    <div class="col ${styles.span}" children="cardOne"></div>
                    <div class="col ${styles.span}" children="cardTwo"></div>
                    <div class="col ${styles.span}" children="cardThree"></div>
                </div>
                <br/>
                <div class="row">
                    <div class="col" children="tabs"></div>
                </div>
                <div class="row">
                    <div class="col" children="list"></div>
                    <div children="dialog"></div>
                </div>
            </div>`
        )
    }
}

export default Connect([
    devops
], {
    cardOne,
    cardTwo,
    cardThree,
    tabs,
    list,
    dialog
})(Agent);