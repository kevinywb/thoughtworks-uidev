/**
 * utils.js
 */

(function (w) {
    function dom(val) {
        function _dom(val) {
            if (('' + val).indexOf('<') < 0) {
                this.el = document.querySelector(val);
            } else {
                val = val.replace('<', '').replace('>', '');
                this.el = document.createElement(val);
            }
            return this;
        }
        _dom.prototype.find = function (val) {
            this.el = this.el.querySelector(val);
            return this;
        }
        _dom.prototype.append = function (val) {
            this.el.appendChild(val.el);
            return this;
        }
        _dom.prototype.insert = function (val) {
            this.el.parentNode.insertBefore(val.el, this.el);
            return this;
        }
        _dom.prototype.html = function (val) {
            this.el.innerHTML = val;
            return this;
        }
        _dom.prototype.attr = function (key, val) {
            this.el.setAttribute(key, val);
            return this;
        }
        _dom.prototype.css = function (key, val) {
            this.el.style[key] = val;
            return this;
        }
        _dom.prototype.on = function (event, fun) {
            this.el.addEventListener(event, fun, false);
            return this;
        }
        _dom.prototype.remove = function () {
            this.el.remove();
            return this;
        }
        _dom.prototype.val = function (val) {
            if (val) {
                this.el.value = val;
                return this;
            }
            return this.el.value;
        }
        return new _dom(val);
    }

    function go(val) {
        var view = val.replace('#', '');
        import('../views/' + view + '/' + view).then(
            m => m.default.render($('.view'))
        );
        window.location.hash = view;
    }

    function attr(el, key) {
        return el.getAttribute(key);
    }

    function findAll(val) {
        return document.querySelectorAll(val);
    }

    function addClass(el, val) {
        var c = '' + el.className,
            added = (c != '') ? c + ' ' + val : val;
        el.className = added;
    }

    function removeClass(el, val) {
        var c = '' + el.className;
        removed = c.replace(val, '');
        el.className = removed;
    }

    function animation(el, opts) {
        function _anim(el, opts) {
            this.timer = null;
            this.el = el;
            this.opts = opts || {
                delay: 50,
                direction: true,
                startIndex: 0,
                endIndex: 360
            }
            return this;
        }
        _anim.prototype.start = function () {
            this.stop();
            this.timer = setInterval(() => {
                var startIndex = this.opts.startIndex;
                if (startIndex == 360) {
                    this.opts.startIndex = 0;
                }
                this.el.style['transform'] = "rotate(" + (startIndex) + "deg)";
                this.opts.startIndex += 5;
            }, this.opts.delay);
        }
        _anim.prototype.stop = function () {
            if (this.timer != null) {
                clearInterval(this.timer);
            }
        }
        return new _anim(el, opts);
    }

    function getElementPos(el) {
        var x = 0,
            y = 0;
        while (el != null) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
        }
        return {
            x: x,
            y: y
        };
    }

    w.onhashchange = function () {}

    w.onpopstate = function () {}

    w.onload = function () {}

    w.onresize = function () {}

    w.onscroll = function () {}

    w.onerror = function (msg, url, line) {}

    w.$ = dom;
    w.$.go = go;
    w.$.attr = attr;
    w.$.findAll = findAll;
    w.$.addClass = addClass;
    w.$.removeClass = removeClass;

    w.$.animation = animation;
    w.$.getElementPos = getElementPos;

})(window);