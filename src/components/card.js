function card(opts) {
    const card = $('<div>').attr('class', 'col card');
    card.css('background-color', opts.backgroundColor || '#fff');
    switch (opts.type) {
        case 'col-3':
            const col3 = $('<div>').attr('class', 'card-col3');
            col3.html('<div class="row">' +
                '<div class="col">' + (opts.titles[0] || '') + '</div>' +
                '<div class="col">' + (opts.titles[1] || '') + '</div>' +
                '<div class="col">' + (opts.titles[2] || '') + '</div></div>' +
                '<div class="row">' +
                '<div class="col">' + (opts.values[0] || '') + '</div>' +
                '<div class="col">' + (opts.values[1] || '') + '</div>' +
                '<div class="col">' + (opts.values[2] || '') + '</div></div>'
            )
            card.append(col3);
            break;
        default:
            const title = $('<div>').attr('class', 'card-title');
            title.html(opts.title || '');
            const value = $('<div>').attr('class', 'card-value');
            value.html(opts.value || '');
            const icon = $('<span>').attr('class', 'card-icon ' + opts.icon || '');
            card.append(title);
            card.append(value);
            card.append(icon);
            if (opts.animate) {
                $.animation(icon.el).start();
            }
            break;
    }
    return card;
}

export default card