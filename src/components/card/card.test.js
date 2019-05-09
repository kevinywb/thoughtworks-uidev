import Card from './card';

describe('card', () => {
    jest.useFakeTimers();
    it('renders correctly', () => {
        const card = new Card();
        card.componentDidMount();
        card.renderDOM();
        expect(card).toMatchSnapshot();
    });

    it('animation render correctly', () => {
        const card = new Card();
        card.setState({
            animate: true
        });
        const spyFn = jest.spyOn(card, 'componentDidMount');
        card.componentDidMount();
        jest.advanceTimersByTime(5000);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it('type of table render correctly', () => {
        const card = new Card({
            type: 'table',
            titles: ['ALL', 'PHYSICAL', 'VIRTUAL'],
            values: [8, 4, 4],
        });
        card.renderDOM();
        expect(card).toMatchSnapshot();
    })
});