import axios from '../framework/axios';

/**
 * get devops list
 */
const getDevOpsList = () => {
    return axios.get('devops').then(res => {
        return res.data;
    });
    // return [{
    //     id: 1,
    //     logo: './assets/osicons/windows.png',
    //     title: 'bjstdmngbgr01.thoughworks.com',
    //     tag: 'idle',
    //     ip: '192.168.1.102',
    //     path: '/var/lib/cruise-agent',
    //     opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    //     deny: false
    // }, {
    //     id: 2,
    //     logo: './assets/osicons/windows.png',
    //     title: 'bjstdmngbgr08.thoughworks.com',
    //     tag: 'building',
    //     ip: '192.168.1.243',
    //     path: '/var/lib/cruise-agent',
    //     opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    //     deny: true
    // }, {
    //     id: 3,
    //     logo: './assets/osicons/ubuntu.png',
    //     title: 'bjstdmngbgr10.thoughworks.com',
    //     tag: 'building',
    //     ip: '192.168.1.80',
    //     path: '/var/lib/cruise-agent',
    //     opts: ['Firefox', 'Safari'],
    //     deny: true
    // }, {
    //     id: 4,
    //     logo: './assets/osicons/debin.png',
    //     title: 'bjstdmngbgr11.thoughworks.com',
    //     tag: 'building',
    //     ip: '192.168.1.117',
    //     path: '/var/lib/cruise-agent',
    //     opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    //     deny: true
    // }, {
    //     id: 5,
    //     logo: './assets/osicons/suse.png',
    //     title: 'bjstdmngbgr15.thoughworks.com',
    //     tag: 'idle',
    //     ip: '192.168.1.110',
    //     path: '/var/lib/cruise-agent',
    //     opts: [],
    //     deny: false
    // }, {
    //     id: 6,
    //     logo: './assets/osicons/cent_os.png',
    //     title: 'bjstdmngbgr01.thoughworks.com',
    //     tag: 'idle',
    //     ip: '192.168.1.102',
    //     path: '/var/lib/cruise-agent',
    //     opts: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
    //     deny: false
    // }];
}

export {
    getDevOpsList
}