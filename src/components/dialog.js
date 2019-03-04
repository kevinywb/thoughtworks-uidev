class Dialog {
    render(opts) {
        const point = {};
        const dialog = $('<div>');
        if (opts.to) {
            const point = $.getElementPos(opts.to);
            dialog.attr('class', 'dialog-to');
            dialog.css('left', (point.x - 20) + 'px').css('top', (point.y + 50) + 'px');
        } else {
            dialog.attr('class', 'dialog');
        }
        const header = $('<div>').attr('class', 'row dialog-header').html('<p class="col">' + opts.title + '</p>');
        const close = $('<a>').on('click', function () {
            dialog.remove();
            opts.callback('close');
        }).attr('class', 'col').html('<i class="icon-close"></i>');
        const content = $('<div').attr('class', 'row dialog-content');
        const input = $('<input>').attr('class', 'col').attr('placeholder', opts.placeholder).attr('autofocus', 'autofocus');
        const footer = $('<div>').attr('class', 'row dialog-footer');
        for (var i in opts.btns) {
            const btn = $('<a>').on('click', function () {
                dialog.remove();
                opts.callback($.attr(this, 'name'), input.val());
            }).attr('name', opts.btns[i].name).attr('class', 'btn' + (opts.btns[i].class ? ' ' + opts.btns[i].class : '')).html(opts.btns[i].text);
            footer.append(btn);
        }
        header.append(close);
        content.append(input);
        dialog.append(header);
        dialog.append(content);
        dialog.append(footer);
        $('body').append(dialog);
    }
}

export default new Dialog()