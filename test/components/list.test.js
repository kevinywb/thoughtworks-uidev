import List from '../../src/components/list/list';

describe('List', () => {
    it('renders correctly', () => {
        const list = new List();
        list.renderDOM();
        expect(list).toMatchSnapshot();
    });

    const allExist = (attr) => {
        switch (attr) {
            case 'val':
                return 1;
            case 'opt':
                return 'Firefox';
        }
    }

    const NoOneExist = (attr) => {
        switch (attr) {
            case 'val':
                return 0;
            case 'opt':
                return 'None';
        }
    }

    const optNotExist = (attr) => {
        switch (attr) {
            case 'val':
                return 1;
            case 'opt':
                return 'None';
        }
    }

    it('options can be deleted', () => {
        const list = new List();
        list.onDeleteClick({
            getAttr: allExist
        });
        expect(list.onDeleted).toBeUndefined();
        list.onDeleted = (opt) => {
            list.removeOpts(opt);
            const deleteOpt = list.state.items.find(item => {
                return item.opts.indexOf('Firefox') < 0;
            })
            expect(deleteOpt).toBeDefined();
        };
        //item and opts are exist
        list.onDeleteClick({
            getAttr: allExist
        });
        //item and opts are not exist
        list.onDeleteClick({
            getAttr: NoOneExist
        });
        //only item is exists
        list.onDeleteClick({
            getAttr: optNotExist
        });
    });

    it('options can be added', () => {
        const list = new List({
            items: [{
                id: 1,
                opts: [],
                deny: true
            }]
        });
        list.addOpts('Firefox');
        expect(list.state.items[0].opts[0]).toEqual('Firefox');
        list.onAddClick({
            getAttr: allExist
        });
        expect(list.onAdded).toBeUndefined();
        list.onAdded = (element) => {
            expect(element).toBeDefined();
            //duplicate verification 
            list.addOpts('Firefox');
            expect(list.state.items[0].opts.length).toBe(1);
        };
        //item and opts are exist
        list.onAddClick({
            getAttr: allExist,
            element: {}
        });
        //item and opts are not exist
        list.onAddClick({
            getAttr: NoOneExist,
            element: {}
        });
        //only item is exists
        list.onAddClick({
            getAttr: optNotExist,
            element: {}
        });
    });
});