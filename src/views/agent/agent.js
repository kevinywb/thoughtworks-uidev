import card from '../../components/card'
import tabs from '../../components/tabs'
import tabsxs from '../../components/tabsxs'
import list from '../../components/list'
import listxs from '../../components/listxs'

class Agent {
    render(root) {
        root.html('');

        /**
         * cards
         */
        const cardgroup = $('<div>').attr('class', 'row');
        const c1 = card({
            title: 'Building',
            value: 3,
            icon: 'icon-cog',
            animate: true,
            backgroundColor: '#FF9A2A'
        });
        const c2 = card({
            title: 'Idle',
            value: 5,
            icon: 'icon-coffee',
            backgroundColor: '#7FBC39'
        });
        const c3 = card({
            type: 'col-3',
            titles: ['ALL', 'PHYSICAL', 'VIRTUAL'],
            values: [8, 4, 4]
        });
        cardgroup.append(c1);
        cardgroup.append(c2);
        cardgroup.append(c3);
        root.append(cardgroup);

        /**
         * tabs
         */
        const tabs_opts = {
            items: [{
                    type: 'text',
                    text: 'All',
                    active: true
                },
                {
                    type: 'text',
                    text: 'Physical'
                },
                {
                    type: 'text',
                    text: 'Virtual'
                },
                {
                    type: 'search'
                },
                {
                    type: 'button',
                    icon: 'icon-th-list',
                    active: true
                }, {
                    type: 'button',
                    icon: 'icon-th-card'

                }
            ]
        }
        const tabscontrol = tabs(tabs_opts);
        root.append(tabscontrol);


        /**
         * response tabs
         */
        const tabsxscontrol = tabsxs(tabs_opts);
        root.append(tabsxscontrol);

        /**
         * list
         */
        const list_opts = {
            items: [{
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/windows.png',
                title: 'bjstdmngbgr01.thoughworks.com',
                tag: 'idle',
                ip: '192.168.1.102',
                path: '/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: false
            }, {
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/windows.png',
                title: 'bjstdmngbgr08.thoughworks.com',
                tag: 'building',
                ip: '192.168.1.243',
                path: 'http://yanwenbo.cn/thoughtworks/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: true
            }, {
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/ubuntu.png',
                title: 'bjstdmngbgr10.thoughworks.com',
                tag: 'building',
                ip: '192.168.1.80',
                path: '/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: true
            }, {
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/debin.png',
                title: 'bjstdmngbgr11.thoughworks.com',
                tag: 'building',
                ip: '192.168.1.117',
                path: '/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: true
            }, {
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/suse.png',
                title: 'bjstdmngbgr15.thoughworks.com',
                tag: 'idle',
                ip: '192.168.1.110',
                path: 'http://yanwenbo.cn/thoughtworks/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: false
            }, {
                logo: 'http://yanwenbo.cn/thoughtworks/assets/osicons/cent_os.png',
                title: 'bjstdmngbgr01.thoughworks.com',
                tag: 'idle',
                ip: '192.168.1.102',
                path: '/var/lib/cruise-agent',
                subs: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
                deny: false
            }]
        };
        const listcontrol = list(list_opts);
        root.append(listcontrol);

        /**
         * response list
         */
        const listxscontrol = listxs(list_opts);
        root.append(listxscontrol);
    }
}

export default new Agent()