"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * redux
 */
var store = Redux.createStore(function (state, action) {
    if (!state) return {
        heroes: [{
            id: 1,
            name: "Batman"
        }, {
            id: 2,
            name: "Spider man"
        }, {
            id: 3,
            name: "Magneto"
        }, {
            id: 4,
            name: "X-men"
        }, {
            id: 5,
            name: "Super man"
        }, {
            id: 6,
            name: "Robocop"
        }, {
            id: 7,
            name: "Jako"
        }, {
            id: 8,
            name: "Dr Dre"
        }]
    };

    switch (action.type) {
        case "ROUTE":
            if (["dashboard", "heroes"].indexOf(action.page) !== -1) {
                return Object.assign({}, state, {
                    selectedHero: null,
                    previousPage: action.page,
                    page: action.page
                });
            } else return Object.assign({}, state, {
                page: state.previousPage
            });
        case "SELECT_HERO":
            return Object.assign({}, state, {
                selectedHero: action.hero,
                page: 'detail'
            });
        case "ADD_HERO":
            state.heroes.push({
                id: state.heroes[state.heroes.length - 1].id + 1,
                name: action.heroName
            });
            return state;
        case "UPDATE_HERO":
            state.heroes.forEach(function (hero) {
                if (hero.id === action.hero.id) hero.name = action.hero.name;
            });
            return Object.assign({}, state, {
                page: state.previousPage
            });
        case "REMOVE_HERO":
            state.heroes.forEach(function (hero, idx) {
                if (hero.id === action.hero.id) state.heroes.splice(idx, 1);
            });
            return state;
        default:
            return state;
    }
});

var XDashboard = function (_React$Component) {
    _inherits(XDashboard, _React$Component);

    function XDashboard(props) {
        _classCallCheck(this, XDashboard);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = { heroes: store.getState().heroes, topHeroes: store.getState().heroes.slice(0, 4) };
        store.subscribe(function (_) {
            _this.setState({ heroes: store.getState().heroes });
        });
        return _this;
    }

    XDashboard.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "main-dashboard" },
            React.createElement(
                "h3",
                null,
                "Top Heroes"
            ),
            React.createElement(
                "div",
                { className: "grid" },
                this.state.topHeroes.map(function (hero) {
                    return React.createElement(
                        "div",
                        { className: "grid-item", onClick: function onClick(_) {
                            store.dispatch({
                                type: "SELECT_HERO",
                                hero: hero
                            });
                        } },
                        React.createElement(
                            "h4",
                            null,
                            hero.name
                        )
                    );
                })
            ),
            React.createElement(XHeroSearch, null)
        );
    };

    return XDashboard;
}(React.Component);

var XHeroSearch = function (_React$Component2) {
    _inherits(XHeroSearch, _React$Component2);

    function XHeroSearch(props) {
        _classCallCheck(this, XHeroSearch);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = { heroes: store.getState().heroes, results: [] };
        store.subscribe(function (_) {
            _this2.setState({ heroes: store.getState().heroes });
        });
        return _this2;
    }

    XHeroSearch.prototype.render = function render() {
        var _this3 = this;

        return React.createElement(
            "div",
            { className: "x-hero-search" },
            React.createElement(
                "h4",
                null,
                "Hero Search"
            ),
            React.createElement("input", { onChange: function onChange(e) {
                _this3.setState({ results: _this3.state.heroes.filter(function (item) {
                    return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 && e.target.value !== '';
                }) });
            } }),
            React.createElement(
                "div",
                null,
                this.state.results.map(function (hero) {
                    return React.createElement(
                        "div",
                        { className: "search-result", onClick: function onClick(_) {
                            store.dispatch({
                                type: "SELECT_HERO",
                                hero: hero
                            });
                        } },
                        hero.name
                    );
                })
            )
        );
    };

    return XHeroSearch;
}(React.Component);

var XHeroes = function (_React$Component3) {
    _inherits(XHeroes, _React$Component3);

    function XHeroes(props) {
        _classCallCheck(this, XHeroes);

        var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        _this4.state = { heroes: store.getState().heroes };
        store.subscribe(function (_) {
            _this4.setState({ heroes: store.getState().heroes });
        });
        return _this4;
    }

    XHeroes.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "x-heroes" },
            React.createElement(
                "h2",
                null,
                "My Heroes"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "Hero name:"
                ),
                React.createElement("input", { onKeyUp: function onKeyUp(e) {
                    if (e.keyCode === 13 && e.target.value !== '') {
                        store.dispatch({
                            type: "ADD_HERO",
                            heroName: e.target.value
                        });
                        e.target.value = "";
                    }
                } })
            ),
            React.createElement(
                "ul",
                { className: "heroes" },
                this.state.heroes.map(function (hero) {
                    return React.createElement(
                        "li",
                        { onClick: function onClick(_) {
                            store.dispatch({
                                type: "SELECT_HERO",
                                hero: hero
                            });
                        } },
                        React.createElement(
                            "span",
                            { className: "badge" },
                            hero.id
                        ),
                        React.createElement(
                            "span",
                            null,
                            hero.name
                        ),
                        React.createElement(
                            "button",
                            { className: "delete", onClick: function onClick(e) {
                                e.stopPropagation();
                                store.dispatch({
                                    type: "REMOVE_HERO",
                                    hero: hero
                                });
                            } },
                            "x"
                        )
                    );
                })
            )
        );
    };

    return XHeroes;
}(React.Component);

var XDetail = function (_React$Component4) {
    _inherits(XDetail, _React$Component4);

    function XDetail(props) {
        _classCallCheck(this, XDetail);

        var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this5.state = {
            id: store.getState().selectedHero.id,
            name: store.getState().selectedHero.name,
            title: store.getState().selectedHero.name
        };
        return _this5;
    }

    XDetail.prototype.render = function render() {
        var _this6 = this;

        return React.createElement(
            "div",
            { className: "x-detail" },
            React.createElement(
                "h2",
                null,
                this.state.title,
                " details!"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "id: "
                ),
                React.createElement(
                    "span",
                    null,
                    this.state.id
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "name: "
                ),
                React.createElement("input", { placeholder: "name", value: this.state.name, onChange: function onChange(e) {
                    _this6.setState({ name: e.target.value });
                } })
            ),
            React.createElement(
                "button",
                { onClick: function onClick(_) {
                    store.dispatch({
                        type: 'ROUTE',
                        page: 'back'
                    });
                } },
                "Back"
            ),
            React.createElement(
                "button",
                { onClick: function onClick(_) {
                    store.dispatch({
                        type: 'UPDATE_HERO',
                        hero: _this6.state
                    });
                } },
                "Save"
            )
        );
    };

    return XDetail;
}(React.Component);

var XApp = function (_React$Component5) {
    _inherits(XApp, _React$Component5);

    function XApp(props) {
        _classCallCheck(this, XApp);

        var _this7 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

        _this7.state = { pageView: store.getState().page || "dashboard" };
        store.subscribe(function (_) {
            _this7.setState({ pageView: store.getState().page || "dashboard" });
        });
        return _this7;
    }

    XApp.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "main-app" },
            React.createElement(
                "h1",
                null,
                "Tour of Heroes"
            ),
            React.createElement(
                "nav",
                null,
                React.createElement(
                    "a",
                    { className: this.state.pageView == 'dashboard' ? 'active' : null, onClick: function onClick(_) {
                        store.dispatch({
                            type: 'ROUTE',
                            page: 'dashboard'
                        });
                    } },
                    "Dashboard"
                ),
                React.createElement(
                    "a",
                    { className: this.state.pageView == 'heroes' ? 'active' : null, onClick: function onClick(_) {
                        store.dispatch({
                            type: 'ROUTE',
                            page: 'heroes'
                        });
                    } },
                    "Heroes"
                )
            ),
            React.createElement(
                "div",
                null,
                this.state.pageView == 'dashboard' ? React.createElement(XDashboard, null) : null,
                this.state.pageView == 'heroes' ? React.createElement(XHeroes, null) : null,
                this.state.pageView == 'detail' ? React.createElement(XDetail, null) : null
            )
        );
    };

    return XApp;
}(React.Component);

ReactDOM.render(React.createElement(XApp, null), document.getElementById("application"));