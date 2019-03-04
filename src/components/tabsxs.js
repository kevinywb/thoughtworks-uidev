function tabsxs(opts) {
    const tabsxs = $('<div>').attr('class', 'tabs-xs');
    const row = $('<div>').attr('class', 'row tabs-xs-row');
    const searchrow = $('<div>').attr('class', 'row tabs-xs-row');
    for (var i in opts.items) {
        switch (opts.items[i].type) {
            case 'search':
                const search = $('<span>').attr('class', 'col tab-xs-search');
                search.html('<span><i class="icon-search"></i><input /></span>');
                searchrow.append(search);
                break;
            case 'text':
                const item = $('<span>').attr('class', 'col tab-xs-item' + (opts.items[i].active ? ' active' : ''));
                item.html(opts.items[i].text);
                row.append(item);
                break;
        }
    }
    tabsxs.append(searchrow);
    tabsxs.append(row);
    return tabsxs
}
export default tabsxs