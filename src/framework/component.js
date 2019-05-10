import _ from './core';

/**
 * internal props
 */
let _componentProps = {};

/**
 * remove spaces, line breaks, etc.
 * @param {*} html 
 */
const _formatHtml = (html) => {
    return html.replace(/ *[\r|\n] */g, '');
}

/**
 * create a standard html element
 * @param {*} html - html template string
 * @param {*} events - html events
 */
const _createElement = (html, events) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = _formatHtml(html);
    _addEventListener(wrap.firstElementChild, events);
    return wrap.firstElementChild;
};

/**
 * remove element
 * @param {*} element - html element
 */
const _removeElement = (element) => {
    element.remove ? element.remove() : element.removeNode(true);
}

/**
 * add events to this element
 * @param {*} element - html element
 * @param {*} events - html events
 */
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

/**
 * keep the focus state
 * @param {*} element - html element
 */
const _autofocus = (element) => {
    const focusElement = element.querySelector('[autofocus]');
    focusElement && focusElement.focus();
}

/**
 * find a element
 * @param {*} element - html element
 * @param {*} any - html query selector
 */
const _find = (element, any) => {
    return element.querySelector(any);
}

/**
 * mount a element on the container
 * @param {*} element - html element 
 * @param {*} container - container element 
 * @param {*} reset - reset this element children
 */
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

/**
 * need to update element
 * @param {*} prevElement - previous element
 * @param {*} nextElement - subsequent element
 */
const _shouldComponentUpdate = (prevElement, nextElement) => {
    return prevElement.outerHTML !== nextElement.outerHTML;
}

/**
 * update element
 * @param {*} prevElement - previous element
 * @param {*} nextElement - subsequent element 
 */
const _updateElement = (prevElement, nextElement) => {
    const parent = prevElement.parentNode;
    const diff = (prevNode, nextNode) => {
        _removeElement(prevNode);
        if (parent) {
            parent.appendChild(nextNode);
        }
    }
    diff(prevElement, nextElement);
}

/**
 * merge the element chilren
 * @param {*} prevChildren - previous children 
 * @param {*} nextElement - subsequent element 
 */
const _mergeChildren = (prevChildren, nextElement) => {
    Object.keys(prevChildren).forEach(key => {
        const element = nextElement.querySelector(`[children="${key}"]`);
        element.appendChild(prevChildren[key].element);
    });
}

/**
 * component class
 */
class Component {
    constructor(props) {
        this.element = document.createElement('div');
        this.children = {};
        _componentProps = _.clone(props || {});
    }

    /**
     * singleton
     * @param {*} props - pass props
     */
    static getComponent(props) {
        return this.instance ? this.instance :
            this.instance = new this(props);
    }

    /**
     * destroy
     */
    destroy() {
        _removeElement(this.element);
    }

    /**
     * component mount before
     */
    componentWillMount() {

    }

    /**
     * component mount after
     */
    componentDidMount() {

    }

    /**
     * find a element
     * @param {*} any - query selector
     */
    find(any) {
        return _find(this.element, any);
    }

    /**
     * update the state
     * @param {*} newState - pass new state
     */
    setState(newState) {
        const state = {
            ...this.state,
            ...newState
        };
        if (_.isEquals(_componentProps, state)) {
            return true;
        }
        this.state = state;
        const newElement = _createElement(this.render(), this);
        if (_shouldComponentUpdate(this.element, newElement)) {
            _updateElement(this.element, newElement);
            _mergeChildren(this.children, newElement);
            _autofocus(newElement);
            this.element = newElement;
        }
        _componentProps = _.clone(this.state);
    }

    /**
     * mount this element on the container
     * @param {*} container - container element
     * @param {*} reset - reset this element children
     */
    mountElement(container, reset) {
        return _mountElement(this.element, container, reset);
    }

    /**
     * render the component
     */
    render() {
        return ('<div></div>')
    }

    /**
     * render as a standard DOM
     * @param {*} children - children element
     */
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