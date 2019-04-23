module.exports = {
    'GET /api/menus': (req, res) => {
        res.json({
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
    },
    'GET /api/menus2': (req, res) => {
        res.send('test');
    }
}