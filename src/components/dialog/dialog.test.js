import Dialog from './dialog';

describe('Dialog', () => {
    it('renders correctly', () => {
        const dialog = new Dialog();
        dialog.renderDOM();
        expect(dialog).toMatchSnapshot();
    });

    it('reset the select state', () => {
        const dialog = new Dialog();
        dialog.reset();
        const item = dialog.state.data.find(item => {
            return item.selected;
        })
        expect(item).toBeUndefined();
    });

    it('show and hide the dialog', () => {
        const dialog = new Dialog();
        expect(dialog.state.show).toBe(false);
        dialog.show();
        expect(dialog.state.show).toBe(true);
        dialog.hide();
        expect(dialog.state.show).toBe(false);
    });

    it('show the dialog on some element', () => {
        const dialog = new Dialog();
        expect(dialog.state.show).toBe(false);
        expect(dialog.state.to).toBeNull();
        dialog.showTo(document.querySelector('body'));
        expect(dialog.state.show).toBe(true);
        expect(dialog.state.to).toBeDefined();
    });

    it('trigger add event', () => {
        const dialog = new Dialog();
        dialog.onAdd({
            value: 'Item-1'
        });
        dialog.onAdded = (data) => {
            expect(data).toBeDefined();
            data.forEach(item => {
                expect(item.selected).toBe(true);
            });
            return true;
        };
        dialog.onAdd({
            value: 'Item-2'
        });
    });

    it('trigger cancel event', () => {
        const dialog = new Dialog();
        dialog.onCancel();
        expect(dialog.state.show).toBe(false);
    });

    it('trigger close event', () => {
        const dialog = new Dialog();
        dialog.onClose();
        expect(dialog.state.show).toBe(false);
    });

    it('trigger input focus event', () => {
        const dialog = new Dialog();
        dialog.onFocus();
        expect(dialog.state.autoselect).toBe(true);
    });

    it('trigger input change event', () => {
        const dialog = new Dialog();
        dialog.onChange({
            value: 'Item-1'
        });
        dialog.onChange({
            getAttr: () => {
                return 'Item-2'
            }
        });
        const items = dialog.state.data.filter(item => {
            return item.selected;
        })
        expect(items.length).toBe(2);
    });
});