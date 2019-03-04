import dialog from './dialog'

function listxs(opts) {
    const listxs = $('<div>').attr('class', 'list-xs');
    for (var i in opts.items) {
        const item = $('<div>').attr('class', 'list-xs-item');
        item.html('<p><i class="icon-desktop"></i><span class="list-xs-item-title"> ' + opts.items[i].title + '</p>' +
            '<p><i class="icon-info"></i> ' + opts.items[i].ip + '</p>' +
            '<p><i class="icon-folder"></i> ' + opts.items[i].path + '</p>'
        );
        opts.items[i].tag == 'idle' ? item.css('border-color', '#7FBC39') : item.css('border-color', '#FF9A2A')
        listxs.append(item);

        const op = $('<div>').attr('class', 'list-xs-item-op');
        const add = $('<a>').attr('class', 'btn bg-primary').on('click', function () {
            dialog.render({
                title: 'Separate multiple resources name with commas',
                type: 'input',
                placeholder: 'e.g. Chrome, Firefox',
                btns: [{
                    name: 'add',
                    text: 'Add Resources',
                    class: 'bg-primary',
                }, {
                    name: 'cancel',
                    class: 'bg-dark',
                    text: 'Cancel'
                }],
                callback: function (name, val) {
                    switch (name) {
                        case 'add':
                            const arr = val.split(',');
                            for (var i in arr) {
                                opgroup.append(_addtag(arr[i]));
                            }
                            break;
                    }
                }
            });
        }).html('<i class="icon-plus"></i>');
        op.append(add);

        const opgroup = $('<span>');
        for (var j in opts.items[i].subs) {
            opgroup.append(_addtag(opts.items[i].subs[j] + ' '));
        }
        op.append(opgroup);
        item.append(op);

        const footer = $('<div>').attr('class', 'list-xs-footer');
        const deny = $('<a>').attr('class', 'list-xs-item-deny bg-primary').html('<i class="icon-deny"></i> Deny');

        footer.append(deny);
        item.append(footer);
    }

    function _addtag(val) {
        const env = $('<a>').attr('class', 'tag bg-normal').html(val + ' ');
        const trash = $('<i>').attr('class', 'icon-trash').on('click', function () {
            this.parentNode.remove();
        });
        return env.append(trash);
    }

    return listxs;
}

export default listxs