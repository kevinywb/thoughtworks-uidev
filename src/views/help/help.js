import {
    Component,
    Connect
} from '../../framework/app';

/**
 * help
 */
class Help extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * render
     */
    render() {
        return (`<h1>Help</h1>`)
    }
}

export default Connect()(Help);