import Tabs from './tabs';

describe('Tabs', () => {
    it('renders correctly', () => {
        const tab = new Tabs();
        tab.renderDOM();
        expect(tab).toMatchSnapshot();
    });

    it('able to be searched', () => {
        const tab = new Tabs();
        tab.onSearch({
            value: 'test'
        });
        expect(tab.onSearched).toBeUndefined();
        tab.onSearched = (val) => {
            expect(val).toEqual('test');
        }
        tab.onSearch({
            value: 'test'
        });
    });

    it('able to be switched', () => {
        const tab = new Tabs();
        tab.onTabChange({
            getAttr: () => {
                return 'all'
            }
        });
        expect(tab.onTabActived).toBeUndefined();
        tab.onTabActived = (name) => {
            expect(name).toEqual('all');
        }
        tab.onTabChange({
            getAttr: () => {
                return 'all'
            }
        });
    });

    it('able to be sorted', () => {
        const tab = new Tabs();
        tab.onTagChange({
            getAttr: () => {
                return 'list'
            }
        });
        expect(tab.onTagActived).toBeUndefined();
        tab.onTagActived = (name) => {
            expect(name).toEqual('list');
        }
        tab.onTagChange({
            getAttr: () => {
                return 'list'
            }
        });
    });
});