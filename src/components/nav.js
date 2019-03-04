class Nav {
    render(root) {
        const data_menus = [{
                name: 'dashboard',
                text: 'DASHBOARD',
                icon: 'icon-dashboard'
            },
            {
                name: 'agent',
                text: 'AGENT',
                icon: 'icon-sitemap',
                active: true
            },
            {
                name: 'mycruise',
                text: 'MY CRUISE',
                icon: 'icon-boat'
            },
            {
                name: 'help',
                text: 'HELP',
                icon: 'icon-life-bouy'
            }
        ];

        const data_history = [{
            id: 1,
            text: 'bjstdmngbgr01/Acceptance_test'
        }, {
            id: 2,
            text: 'bjstdmngbgr02/Acceptance_test'
        }, {
            id: 3,
            text: 'bjstdmngbgr03/Acceptance_test'
        }, {
            id: 4,
            text: 'bjstdmngbgr04/Acceptance_test'
        }]

        const nav = $('<div>').attr('class', 'nav');
        const menus = $('<ul>').attr('class', 'menus');
        nav.append(menus);

        for (var i in data_menus) {
            const li = $('<li>').attr('name', data_menus[i].name).on('click', function () {
                const list = $.findAll('ul.menus li');
                for (var i in list) {
                    $.removeClass(list[i], 'active');
                }
                $.addClass(this, 'active');
                $.go($.attr(this, 'name'));
            });
            li.html('<i class="' + data_menus[i].icon + '"></i>' + data_menus[i].text + '</li>');
            if (data_menus[i].active) {
                li.attr('class', 'active');
                $.go(data_menus[i].name);
            }
            menus.append(li);
        }
        root.append(nav);

        const history = $('<div>').attr('class', 'history');
        const label = $('<label>').html('History');
        history.append(label);
        nav.append(history);

        const history_ul = $('<ul>');
        for (var i in data_history) {
            const li = $('<li>').attr('id', data_history[i].id);
            li.html('<a>' + data_history[i].text + '</a></li>');
            history_ul.append(li);
        }
        history.append(history_ul);
    }
}

export default new Nav()