import dialog from './dialog'

function list(opts) {
    const list = $('<div>').attr('class', 'list');
    for (var i in opts.items) {
        const item = $('<div>').attr('class', 'list-item');
        item.html('<img class="list-item-logo" src="' + opts.items[i].logo + '" />' +
            '<span><i class="icon-desktop"></i> <span class="list-item-title">' + opts.items[i].title + '</span></span>' +
            '<span class="list-item-tag"> <span class="' + (opts.items[i].tag == "idle" ? 'bg-success' : 'bg-warning') + '">' + opts.items[i].tag + '</span></span>' +
            '<span><i class="icon-info"></i> ' + opts.items[i].ip + '</span>' +
            '<span><i class="icon-folder"></i> ' + opts.items[i].path + '</span>'
        );

        const op = $('<div>').attr('class', 'list-item-op');
        const add = $('<a>').attr('class', 'btn bg-primary').on('click', function () {
            dialog.render({
                to: this,
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

        const deny = $('<a>').attr('class', 'list-item-deny bg-primary').html('<i class="icon-deny"></i> Deny');
        op.append(deny);

        item.append(op);

        list.append(item);
    }

    function _addtag(val) {
        const env = $('<a>').attr('class', 'tag bg-normal').html(val + ' ');
        const trash = $('<i>').attr('class', 'icon-trash').on('click', function () {
            this.parentNode.remove();
        });
        return env.append(trash);
    }

    return list;
}

export default list