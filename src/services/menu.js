import {
    Request
} from '../framework/app';

const getMenuList = () => {
    return Request('menus').then(res => {
        return res;
    })
}

export {
    getMenuList
}