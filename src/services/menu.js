import {
    Request
} from '../framework/app';

const getMenuList = () => {
    return new Promise((reslove) => {
        return reslove({
            error: '',
            success: true,
            data: [{
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
            ]
        })
    })
    // return Request('menus').then(res => {
    //     return res;
    // })
}

export {
    getMenuList
}