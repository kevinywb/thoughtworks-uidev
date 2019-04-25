import _ from './core';

let _componentProps = {};

const _formatHtml = (html) => {
    return html.replace(/ *[\r|\n] */g, '');
}

const _createElement = (html, events) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = _formatHtml(html);
    _addEventListener(wrap.firstElementChild, events);
    return wrap.firstElementChild;
};

const _removeElement = (element) => {
    element.remove ? element.remove() : element.removeNode(true);
}

const _addEventListener = (element, events) => {
    if (element.attributes) {
        Object.values(element.attributes).forEach(attr => {
            if (!attr.name.startsWith('on') || typeof events[attr.value] !== 'function') return;
            const key = attr.value;
            element.removeAttribute(attr.name);
            element[attr.name] = (e) => {
                events[key]({
                    element: e.currentTarget,
                    value: e.currentTarget.value,
                    getAttr: e.currentTarget.getAttribute.bind(e.currentTarget),
                    keyCode: e.keyCode
                });
                e.stopPropagation();
                e.preventDefault();
            }
        });
    }
    if (element.childElementCount > 0) {
        for (let i in element.children) {
            _addEventListener(element.children[i], events);
        }
    }
}

const _autofocus = (element) => {
    const focusElement = element.querySelector('[autofocus]');
    focusElement && focusElement.focus();
}

const _find = (element, any) => {
    return element.querySelector(any);
}

const _mountElement = (element, container, reset) => {
    if (container) {
        if (reset && container.childElementCount > 0) {
            for (let i = container.childNodes.length - 1; i >= 0; i--) {
                _removeElement(container.childNodes[i]);
            }
        }
        container.appendChild(element);
    }
    _autofocus(element);
    return element;
}

const _shouldComponentUpdate = (prevElement, nextElement) => {
    return prevElement.outerHTML !== nextElement.outerHTML;
}

const _updateElement = (prevElement, nextElement) => {
    const parent = prevElement.parentNode;
    const diff = (prevNode, nextNode) => {
        _removeElement(prevNode);
        parent.appendChild(nextNode);
    }
    diff(prevElement, nextElement);
}

const _margeChildren = (prevChildren, nextElement) => {
    Object.keys(prevChildren).forEach(key => {
        const element = nextElement.querySelector(`[children="${key}"]`);
        element.appendChild(prevChildren[key].element);
    });
}

class Component {
    constructor(props) {
        this.element = document.createElement('div');
        this.children = {};
        _componentProps = _.clone(props || {});
    }

    static getComponent(props) {
        return this.instance ? this.instance :
            this.instance = new this(props);
    }

    destroy() {
        _removeElement(this.element);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    find(any) {
        return _find(this.element, any);
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        if (_.isEquals(_componentProps, this.state)) {
            return true;
        }
        const newElement = _createElement(this.render(), this);
        if (_shouldComponentUpdate(this.element, newElement)) {
            _updateElement(this.element, newElement);
            _margeChildren(this.children, newElement);
            this.element = newElement;
            _componentProps = _.clone(this.state);
            _autofocus(this.element);
        }
    }

    mountElement(container, reset) {
        return _mountElement(this.element, container, reset);
    }

    render() {
        return ('<div></div>')
    }

    renderDOM(children) {
        const newElement = _createElement(this.render(), this);
        if (children) {
            Object.keys(children).forEach(key => {
                _mountElement(children[key].element, _find(newElement, `[children=${key}]`));
                this.children[key] = children[key];
                children[key].parent = this;
            });
        }
        this.element = newElement;
        return this;
    }
}

export default Component;