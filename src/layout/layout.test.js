import layout from './layout';

describe('layout', () => {
    it('trigger menu click event', () => {
        layout.onMenuClick();
        expect(layout.state.collapsed).toBe(false);
    });

    it('trigger opts click event', () => {
        layout.onOptsClick();
        expect(layout.state.dropdown).toBe(true);
    });

    it('trigger dropdown event', () => {
        layout.onDropdown();
        expect(layout.state.dropdown).toBe(false);
    });

    it('trigger nav click event', () => {
        const nav = layout.children.nav;
        nav.setState({
            menus: [{
                    name: 'dashboard',
                    text: 'DASHBOARD',
                    icon: 'icon-dashboard'
                },
                {
                    name: 'agent',
                    text: 'AGENT',
                    icon: 'icon-sitemap',
                    active: true
                }
            ]
        });
        nav.onClick({
            getAttr: () => {
                return 'dashboard'
            }
        });
    });

    it('trigger nav close event', () => {
        const nav = layout.children.nav;
        nav.onClose();
        expect(layout.state.collapsed).toBe(true);
    });
})