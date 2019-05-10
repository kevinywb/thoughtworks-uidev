import {
    Component,
    Connect
} from '../../framework/app';

/**
 * dashboard
 */
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * render
     */
    render() {
        return (`<h1>Dashboard</h1>`)
    }
}

export default Connect()(Dashboard);