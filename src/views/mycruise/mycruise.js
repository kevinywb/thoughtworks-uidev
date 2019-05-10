import {
    Component,
    Connect
} from '../../framework/app';

/**
 * my cruise
 */
class MyCruise extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * render
     */
    render() {
        return (`<h1>My Cruise</h1>`)
    }
}

export default Connect()(MyCruise);