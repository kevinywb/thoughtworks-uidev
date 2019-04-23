import {
    Component,
    Connect
} from '../../framework/app';

class Help extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (`<h1>Help</h1>`)
    }
}

export default Connect()(Help);