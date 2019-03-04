import nav from './nav'

class Layout {
    left() {
        return $('.left');
    }

    render() {
        const layout = $('.layout');

        const header = $('<div>').attr('class', 'header');
        header.html('<span class="nav-btn-xs"><i class="icon-navicon"></i></span><span class="logo"></span><span class="opts"><i class="icon-angle-down"></i></span><span class="avatar"></span>');
        layout.append(header);

        const content = $('<div>').attr('class', 'content');
        layout.append(content);

        const left = $('<div>').attr('class', 'left');
        nav.render(left);
        content.append(left);

        const view = $('<div>').attr('class', 'view');
        content.append(view);

        const footer = $('<div>').attr('class', 'footer');
        footer.html('<span class="copyright">© Copyright 2017 ThoughtWorks</span>');

        layout.append(footer);
    }
}

export default new Layout()