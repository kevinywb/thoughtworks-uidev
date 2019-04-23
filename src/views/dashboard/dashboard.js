import {
    Component,
    Connect
} from '../../framework/app';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (`<h1>Dashboard</h1>`)
    }
}

export default Connect()(Dashboard);