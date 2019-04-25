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

const cardOne = Create({
    title: 'Building',
    value: 3,
    icon: 'icon-cog',
    backgroundColor: '#FF9A2A',
    animate: true,
})(Card);

const cardTwo = Create({
    title: 'Idle',
    value: 5,
    icon: 'icon-coffee',
    backgroundColor: '#7FBC39'
})(Card);

const cardThree = Create({
    type: 'table',
    titles: ['ALL', 'PHYSICAL', 'VIRTUAL'],
    values: [8, 4, 4]
})(Card);

const tabs = Create()(Tabs);
tabs.onSearched = (value) => {
    value ? alert(`Search result is ${value}`) : alert(`Search result is empty`)
}
tabs.onTabActived = (name) => {
    console.log(name);
}
tabs.onTagActived = (name) => {
    console.log(name);
}

const todos = [{
    id: 1,
    logo: './assets/osicons/windows.png',
    title: 'bjstdmngbgr01.thoughworks.com',
    tag: 'idle',
    ip: '192.168.1.102',
    path: '/var/lib/cruise-agent',
    opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    deny: false
}, {
    id: 2,
    logo: './assets/osicons/windows.png',
    title: 'bjstdmngbgr08.thoughworks.com',
    tag: 'building',
    ip: '192.168.1.243',
    path: '/var/lib/cruise-agent',
    opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    deny: true
}, {
    id: 3,
    logo: './assets/osicons/ubuntu.png',
    title: 'bjstdmngbgr10.thoughworks.com',
    tag: 'building',
    ip: '192.168.1.80',
    path: '/var/lib/cruise-agent',
    opts: ['Firefox', 'Safari'],
    deny: true
}, {
    id: 4,
    logo: './assets/osicons/debin.png',
    title: 'bjstdmngbgr11.thoughworks.com',
    tag: 'building',
    ip: '192.168.1.117',
    path: '/var/lib/cruise-agent',
    opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    deny: true
}, {
    id: 5,
    logo: './assets/osicons/suse.png',
    title: 'bjstdmngbgr15.thoughworks.com',
    tag: 'idle',
    ip: '192.168.1.110',
    path: '/var/lib/cruise-agent',
    opts: [],
    deny: false
}, {
    id: 6,
    logo: './assets/osicons/cent_os.png',
    title: 'bjstdmngbgr01.thoughworks.com',
    tag: 'idle',
    ip: '192.168.1.102',
    path: '/var/lib/cruise-agent',
    opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    deny: false
}];

const opts = [{
    text: 'Firefox'
}, {
    text: 'Safari'
}, {
    text: 'Ubuntu'
}, {
    text: 'Chrome'
}];

const list = Create({
    items: todos
})(List);
list.onAdded = (element) => {
    dialog.clear();
    dialog.showTo(element);
}
list.onDeleted = (opt) => {
    list.removeOpts(opt);
}

const dialog = Create({
    title: 'Separate multiple resources name with commas',
    placeholder: 'e.g. Chrome, Firefox',
    data: opts
})(Dialog);
dialog.onAdded = (data) => {
    data.forEach(item => {
        list.addOpts(item.text);
    })
    return true;
}

class Agent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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

export default Connect([], {
    cardOne,
    cardTwo,
    cardThree,
    tabs,
    list,
    dialog
})(Agent);