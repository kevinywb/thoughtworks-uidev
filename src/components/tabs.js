function tabs(opts) {
    const tabs = $('<div>').attr('class', 'tabs');
    for (var i in opts.items) {
        switch (opts.items[i].type) {
            case 'search':
                const search = $('<span>').attr('class', 'tab-search');
                search.html('<span><i class="icon-search"></i><input /></span>');
                tabs.append(search);
                break;
            case 'button':
                const button = $('<span>').attr('class', 'tab-button' + (opts.items[i].active ? ' active' : ''));
                button.html('<span><i class="' + (opts.items[i].icon || '') + '"></span>');
                tabs.append(button);
                break;
            case 'text':
                const item = $('<span>').attr('class', 'tab-item' + (opts.items[i].active ? ' active' : ''));
                item.html(opts.items[i].text);
                tabs.append(item);
                break;
        }
    }
    return tabs;
}

export default tabs