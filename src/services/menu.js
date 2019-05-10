import axios from '../framework/axios';

/**
 * get menu list
 */
const getMenuList = () => {
    return axios.get('menus').then(res => {
        return res.data;
    })
    // return [{
    //         name: 'dashboard',
    //         text: 'DASHBOARD',
    //         icon: 'icon-dashboard'
    //     },
    //     {
    //         name: 'agent',
    //         text: 'AGENT',
    //         icon: 'icon-sitemap',
    //         active: true
    //     },
    //     {
    //         name: 'mycruise',
    //         text: 'MY CRUISE',
    //         icon: 'icon-boat'
    //     },
    //     {
    //         name: 'help',
    //         text: 'HELP',
    //         icon: 'icon-life-bouy'
    //     }
    // ];
}

export {
    getMenuList
}