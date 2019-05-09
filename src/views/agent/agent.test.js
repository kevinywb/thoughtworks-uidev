import Agent from './agent';

describe('Agent', () => {
    it('renders correctly', () => {
        expect(Agent).toMatchSnapshot();
    });

    it('list render correctly', () => {
        const list = Agent.children.list;
        list.onAdded(document.querySelector('body'));
        list.onDeleted('Firefox');
        expect(list).toMatchSnapshot();
    });

    it('dialog render correctly', () => {
        const dialog = Agent.children.dialog;
        dialog.onAdded(['Firefox']);
        expect(dialog).toMatchSnapshot();
    });
});