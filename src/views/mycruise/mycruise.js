import {
    Component,
    Connect
} from '../../framework/app';

class MyCruise extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (`<h1>My Cruise</h1>`)
    }
}

export default Connect()(MyCruise);