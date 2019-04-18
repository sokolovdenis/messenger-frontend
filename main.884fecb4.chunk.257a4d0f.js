// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"static/js/main.884fecb4.chunk.js":[function(require,module,exports) {
(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
  10: function _(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQ7SURBVFiFxZdbbBRVGMd/38yZvfVCGyDbQqvipQ3GSiJy04QImj7YB2pQYiQmvkiMSRORELko6wKpwcZAxPiCj/RBjdpyqUqAJhgJiol4iZigqSFim1DYbpfu7uzOzPFhSynbbXdbCPyeZs755vv+cyZzzv8TrTWlEF0X9alMWYvgPQy6AaQBaAB8CP1o+kHOI153hR062dbTZpeSV4oJiK6Llis7sEGEN0Hml6QWEkAnprNz2xfb+osKSLe2voSIb/yEjek7bc99NYXV5CH+yRIoSxGTEP1UFJpOAnuz8dTuSG8kPZWAIWBW0feahF8Jc5wHpojQP1hZo3Xz0c0D+TPGTItOD1mWtfTZXa17mu6SAADqTKSno6Wj5m4JAKjLWl5XdFU0UFSALnBd2g9bDFlmzQq+fZMAjZj5YRuuBfgg5eNoRvFcIsi/nvBCIshB27odKja2r22vHRPgaAnkRyy3XB5VHgtMjxXKZbZoViiXRtO7HQJCuGoHgLzx1LtVkcpfYgGZeeLiv2FBEhWZ4FwjIN6OGVe+NSoS/uRqpV132XSfdLIOQ/6r1O2rBWApgyxlcNoKervrNxna09Neu9tFxjbnGa7nzr5bAhzHqFbVc6r5RD8OBU7FeCzOEv9Vmstzy+sinNNhjg+FCN9j8xoTtvZp4TpGlRKRdEZU+QR1WYdkFhZXDQNwgdmc4l6GtJ+4e4Vy7d5S8RyeYyAUPK9TyRQLKx1c0+IzHuEwjcSZsF3chJ2BDzsVfZeE3h8NPj9mEhsW9h1UXI7JhHjL5w2onJPhofzJUFkIRyk6qSl5Cx6MCV+dNLlvnubMbwYX+4UH6zVdJ0xWLPKYW31zJp/fG1Ag50GvzE9mKpOrBEssnWN+WHPkI5uyILSsdHFc8Pvg6Me5sXz8IXfAQLzuaVUpwvVCppkrPn4sn2DI+dOosEMnyXm4O8q1uOUyEn7PGHWvnXdawMW/K79dvCGSzPkB09lJzkDeEbIZQw9cqXwdxtny9tb3dwPbiz2stSadTFNW4bBo+RAAnufhC9g0LRmhpj4zFtt/Mci509Vj9yKCshRi6k+fbtv7IoAaUxVP7bZmBZ4BmfJwEhGCZUE8D34+fcOKO47D8S9HWNA4zJpXBqmtzxCen+bC7zVcG75hYjT6WIPv/vW0jeYb35h0tHTUZC19FqgrthKTYadt0iNJnmhO0Pz8ZX46Fea7r8fS/WU43tItR7bExl4ovzPa1bqnyUR6bkXE9c9UNUfx2JOXOXNiHlrrS4Jq3tq16Y/xsQVbs9xKeF3FPkfJguAbxzNfjhzaNME0TNobRldFA6PudSMQmmFtR9DvbO1+aw+68I5etDltX9teO2og10PhBrAA/yEc0I51YPvhjZemCiwq4Dr7n93vT/iTq9HGGtALEWrR1AKOhj5B/yMifXh8nxlOHYr0RpxS8v4PSp+mS+za9TsAAAAASUVORK5CYII=";
  },
  11: function _(e, t, n) {
    e.exports = n(18);
  },
  17: function _(e, t, n) {},
  18: function _(e, t, n) {
    "use strict";

    n.r(t);
    var a = n(0),
        s = n.n(a),
        o = n(9),
        i = n.n(o),
        r = (n(17), n(2)),
        c = n(3),
        l = n(5),
        u = n(4),
        m = n(6),
        h = n(1),
        d = "http://messenger.westeurope.cloudapp.azure.com/api/",
        p = "authentication/signin",
        g = "authentication/signup",
        b = "users/",
        f = "conversations",
        v = "users";

    function k(e, t) {
      return fetch(d + b + e, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + t
        }
      });
    }

    function O(e, t, n, a) {
      return fetch(d + "conversations/" + e + "/messages?From=" + n + "&Count=" + a, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + t
        }
      });
    }

    var j = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          login: "",
          password: ""
        }, n.handleChangeLogin = n.handleChangeLogin.bind(Object(h.a)(Object(h.a)(n))), n.handleChangePassword = n.handleChangePassword.bind(Object(h.a)(Object(h.a)(n))), n.handleSubmit = n.handleSubmit.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleChangeLogin",
        value: function value(e) {
          this.setState({
            login: e.target.value
          });
        }
      }, {
        key: "handleChangePassword",
        value: function value(e) {
          this.setState({
            password: e.target.value
          });
        }
      }, {
        key: "handleSubmit",
        value: function value(e) {
          var t,
              n,
              a = this;
          e.preventDefault(), (t = this.state.login, n = this.state.password, fetch(d + p, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              login: t,
              password: n
            })
          })).then(function (e) {
            if (e.ok) return e.json();
            throw e;
          }).then(function (e) {
            a.props.updateToken(e.token, e.expires);
          }).catch(function (e) {
            console.log(e), void 0 === e.statusText ? (alert("\u041E\u0448\u0438\u0431\u043A\u0430 API (\u043D\u0430\u0432\u0435\u0440\u043D\u043E\u0435)"), console.log(e)) : e.text().then(function (e) {
              document.getElementById("infoText").innerHTML = e;
            });
          });
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement("form", {
            className: "main",
            onSubmit: this.handleSubmit
          }, s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("h2", {
            id: "login-form-h2"
          }, "\u0412\u0445\u043E\u0434")), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "login",
            name: "login",
            placeholder: "\u041B\u043E\u0433\u0438\u043D",
            type: "text",
            className: "inputText",
            value: this.state.login,
            onChange: this.handleChangeLogin
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "password",
            name: "password",
            placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
            type: "password",
            className: "inputText",
            value: this.state.password,
            onChange: this.handleChangePassword
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("label", {
            id: "infoText",
            className: "infoText"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "submitButton",
            type: "submit",
            value: "\u0412\u043E\u0439\u0442\u0438"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button",
            onClick: this.props.onClick
          }, "\u0412\u043F\u0435\u0440\u0432\u044B\u0435? \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442!")));
        }
      }]), t;
    }(s.a.Component),
        C = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          name: "",
          login: "",
          password: ""
        }, n.handleChangeName = n.handleChangeName.bind(Object(h.a)(Object(h.a)(n))), n.handleChangeLogin = n.handleChangeLogin.bind(Object(h.a)(Object(h.a)(n))), n.handleChangePassword = n.handleChangePassword.bind(Object(h.a)(Object(h.a)(n))), n.handleSubmit = n.handleSubmit.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleChangeName",
        value: function value(e) {
          this.setState({
            name: e.target.value
          });
        }
      }, {
        key: "handleChangeLogin",
        value: function value(e) {
          this.setState({
            login: e.target.value
          });
        }
      }, {
        key: "handleChangePassword",
        value: function value(e) {
          this.setState({
            password: e.target.value
          });
        }
      }, {
        key: "handleSubmit",
        value: function value(e) {
          var t,
              n,
              a,
              s = this;
          e.preventDefault(), console.log(this.state.login), (t = this.state.login, n = this.state.password, a = this.state.name, fetch(d + g, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              login: t,
              password: n,
              name: a
            })
          })).then(function (e) {
            if (e.status >= 200 && e.status <= 400) return e;
            var t = new Error(e.statusText);
            throw t.response = e, t;
          }).then(function (e) {
            return e.json();
          }).then(function (e) {
            400 === e.status ? ("undefined" != typeof e.errors.Name ? document.getElementById("infoText-Name").innerHTML = e.errors.Name : document.getElementById("infoText-Name").innerHTML = "", "undefined" != typeof e.errors.Login ? document.getElementById("infoText-Login").innerHTML = e.errors.Login : document.getElementById("infoText-Login").innerHTML = "", "undefined" != typeof e.errors.Password ? document.getElementById("infoText-Password").innerHTML = e.errors.Password : document.getElementById("infoText-Password").innerHTML = "") : s.props.updateToken(e.token, e.expires);
          }).catch(function (e) {});
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement("form", {
            className: "main",
            onSubmit: this.handleSubmit
          }, s.a.createElement("div", {
            id: "login-form",
            className: "element"
          }, s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("h2", {
            id: "login-form-h2"
          }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "name",
            name: "name",
            placeholder: "\u0418\u043C\u044F",
            type: "text",
            className: "inputText",
            value: this.state.name,
            onChange: this.handleChangeName
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("label", {
            id: "infoText-Name",
            className: "infoText"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "login",
            name: "login",
            placeholder: "\u041B\u043E\u0433\u0438\u043D",
            type: "text",
            className: "inputText",
            value: this.state.login,
            onChange: this.handleChangeLogin
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("label", {
            id: "infoText-Login",
            className: "infoText"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "password",
            name: "password",
            placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
            type: "password",
            className: "inputText",
            value: this.state.password,
            onChange: this.handleChangePassword
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("label", {
            id: "infoText-Password",
            className: "infoText"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("label", {
            id: "infoText",
            className: "infoText"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("input", {
            id: "submitButton",
            type: "submit",
            value: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442"
          })), s.a.createElement("div", {
            className: "login-form-element"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button",
            onClick: this.props.onClick
          }, "\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442? \u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0445\u043E\u0434"))));
        }
      }]), t;
    }(s.a.Component),
        N = n(7),
        y = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          text: ""
        }, n.handleChangeTest = n.handleChangeTest.bind(Object(h.a)(Object(h.a)(n))), n.handleSubmit = n.handleSubmit.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleChangeTest",
        value: function value(e) {
          this.setState({
            text: e.target.value
          });
        }
      }, {
        key: "handleSubmit",
        value: function value(e) {
          e.preventDefault(), this.state.text && (this.props.onSubmit(this.state.text), this.setState({
            text: ""
          }));
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement("form", {
            className: "sendMessagePanel",
            onSubmit: this.handleSubmit
          }, s.a.createElement("input", {
            id: "password",
            name: "password",
            placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441\u044E\u0434\u0430",
            className: "inputText",
            value: this.state.text,
            onChange: this.handleChangeTest
          }), s.a.createElement("input", {
            id: "submitButton",
            type: "submit",
            value: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"
          }));
        }
      }]), t;
    }(s.a.Component),
        E = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).formatDate = n.formatDate.bind(Object(h.a)(Object(h.a)(n))), n.onClickHandle = n.onClickHandle.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "formatDate",
        value: function value(e) {
          var t = new Date(e),
              n = "" + (t.getMonth() + 1),
              a = "" + t.getDate(),
              s = t.getFullYear(),
              o = t.getHours(),
              i = t.getMinutes(),
              r = t.getSeconds();
          return n.length < 2 && (n = "0" + n), a.length < 2 && (a = "0" + a), [o, i, r].join(":") + " " + [s, n, a].join("-");
        }
      }, {
        key: "messageStyle",
        value: function value(e) {
          return e ? {
            "flex-direction": "row-reverse"
          } : "";
        }
      }, {
        key: "onClickHandle",
        value: function value() {
          this.props.newConversation(this.props.userId);
        }
      }, {
        key: "render",
        value: function value() {
          var e = this.formatDate(this.props.timestamp),
              t = String(this.props.userId).substring(0, 6),
              n = {
            borderColor: "#" + t,
            background: "#" + t
          };
          return this.props.myMessage ? s.a.createElement(s.a.Fragment, null, s.a.createElement("div", {
            className: "messageTimestampMy"
          }, this.props.userName, " (", e, ")"), s.a.createElement("div", {
            className: "messageMy",
            id: this.props.id
          }, s.a.createElement("div", {
            className: "messageTextMy",
            style: n
          }, this.props.content))) : s.a.createElement(s.a.Fragment, null, s.a.createElement("div", {
            className: "messageTimestamp"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button",
            onClick: this.onClickHandle
          }, this.props.userName, " (", e, ")")), s.a.createElement("div", {
            className: "message",
            id: this.props.id
          }, s.a.createElement("div", {
            className: "messageText",
            style: n
          }, this.props.content)));
        }
      }]), t;
    }(s.a.Component),
        S = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).thisMyMessage = n.thisMyMessage.bind(Object(h.a)(Object(h.a)(n))), n.handleSubmitPostMessage = n.handleSubmitPostMessage.bind(Object(h.a)(Object(h.a)(n))), n.newConversation = n.newConversation.bind(Object(h.a)(Object(h.a)(n))), n.findUserName = n.findUserName.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "componentWillUpdate",
        value: function value() {
          var e = document.getElementById("messagesDiv");
          e.scrollTop = e.scrollHeight;
        }
      }, {
        key: "findUserName",
        value: function value(e) {
          var t = [];
          return this.props.userNames && (t = this.props.userNames.filter(function (t) {
            return t.id === e;
          })), 0 === t.length ? "\u043F\u043E\u0438\u0441\u043A..." : t[0].name;
        }
      }, {
        key: "newConversation",
        value: function value(e) {
          this.props.newConversation(e);
        }
      }, {
        key: "thisMyMessage",
        value: function value(e) {
          return this.props.thisUserId === e;
        }
      }, {
        key: "handleSubmitPostMessage",
        value: function value(e) {
          (function (e, t, n) {
            return fetch(d + "conversations/" + e + "/messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t
              },
              body: JSON.stringify({
                content: n
              })
            });
          })(this.props.conversionId, this.props.token, e).then(function (e) {
            if (200 === e.status) return e;
            alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          }).then(function (e) {
            return e.json();
          }).then(function (e) {}).catch(function (e) {
            console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "render",
        value: function value() {
          var e = this;
          return s.a.createElement("div", {
            className: "ChatPanel"
          }, s.a.createElement("h1", null, this.props.conversionName), s.a.createElement("div", {
            className: "messages",
            id: "messagesDiv"
          }, this.props.messages ? this.props.messages.map(function (t) {
            return s.a.createElement(E, {
              key: e.props.conversionId + t.id + t.timestamp,
              content: t.content,
              timestamp: t.timestamp,
              userId: t.user,
              myMessage: e.thisMyMessage(t.user),
              messageId: t.id,
              token: e.props.token,
              newConversation: e.newConversation,
              id: e.props.conversionId + t.id + t.timestamp,
              userName: e.findUserName(t.user)
            });
          }) : s.a.createElement("div", null, "\u041F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A\u0443 \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u043F\u0438\u0448\u0435\u0442.")), s.a.createElement(y, {
            onSubmit: this.handleSubmitPostMessage
          }));
        }
      }]), t;
    }(s.a.Component),
        w = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).formatDate = n.formatDate.bind(Object(h.a)(Object(h.a)(n))), n.onClickHandle = n.onClickHandle.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "formatDate",
        value: function value(e) {
          if (!e) return "";
          var t = new Date(e),
              n = "" + (t.getMonth() + 1),
              a = "" + t.getDate(),
              s = t.getFullYear(),
              o = t.getHours(),
              i = t.getMinutes(),
              r = t.getSeconds();
          return n.length < 2 && (n = "0" + n), a.length < 2 && (a = "0" + a), [o, i, r].join(":") + " " + [s, n, a].join("-");
        }
      }, {
        key: "onClickHandle",
        value: function value() {
          this.props.newConversation(this.props.userId);
        }
      }, {
        key: "render",
        value: function value() {
          return this.props.userId ? s.a.createElement("div", null, s.a.createElement("div", {
            className: "contactItem"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button-contact",
            onClick: this.onClickHandle
          }, s.a.createElement("div", {
            className: "contactItem-Name"
          }, this.props.userName)), " ", s.a.createElement("div", {
            className: "contactItem-LastContent"
          }, this.props.content.substring(0, 20), this.props.content.length > 20 ? "..." : ""), s.a.createElement("div", {
            className: "contactItem-timestamp"
          }, this.formatDate(this.props.timestamp)))) : s.a.createElement("div", null, s.a.createElement("div", {
            className: "contactItem-public"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button-contact",
            onClick: this.onClickHandle
          }, s.a.createElement("div", {
            className: "contactItem-Name"
          }, "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0439 \u0447\u0430\u0442")), s.a.createElement("div", {
            className: "contactItem-LastContent"
          }, this.props.content.substring(0, 20), this.props.content.length > 20 ? "..." : ""), s.a.createElement("div", {
            className: "contactItem-timestamp"
          }, this.formatDate(this.props.timestamp))));
        }
      }]), t;
    }(s.a.Component),
        I = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).newConversation = n.newConversation.bind(Object(h.a)(Object(h.a)(n))), n.findUserName = n.findUserName.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "findUserName",
        value: function value(e) {
          var t = [];
          return this.props.userNames && (t = this.props.userNames.filter(function (t) {
            return t.id === e;
          })), 0 === t.length ? "\u043F\u043E\u0438\u0441\u043A..." : t[0].name;
        }
      }, {
        key: "newConversation",
        value: function value(e) {
          this.props.newConversation(e);
        }
      }, {
        key: "render",
        value: function value() {
          var e = this;
          return s.a.createElement("div", {
            id: "contactListItems"
          }, this.props.conversations.map(function (t) {
            return s.a.createElement(w, {
              key: t.id,
              token: e.props.token,
              userId: t.participant,
              content: t.lastMessage.content,
              timestamp: t.lastMessage.timestamp,
              newConversation: e.newConversation,
              userName: e.findUserName(t.participant)
            });
          }));
        }
      }]), t;
    }(s.a.Component),
        T = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          text: "",
          findUsers: []
        }, n.handleChangeTest = n.handleChangeTest.bind(Object(h.a)(Object(h.a)(n))), n.handleSubmit = n.handleSubmit.bind(Object(h.a)(Object(h.a)(n))), n.findUsers = n.findUsers.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleChangeTest",
        value: function value(e) {
          this.setState({
            text: e.target.value
          });
        }
      }, {
        key: "handleSubmit",
        value: function value(e) {
          if (e.preventDefault(), this.state.text.length > 0) this.findUsers();else {
            this.setState({
              findUsers: [{
                id: null,
                name: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442"
              }]
            });
          }
        }
      }, {
        key: "findUsers",
        value: function value() {
          var e,
              t,
              n = this;
          (e = this.state.text, t = this.props.token, fetch(d + v + "?query=" + e, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            }
          })).then(function (e) {
            if (e.ok) return e.json();
            throw e;
          }).then(function (e) {
            if (e.length > 0) e.sort(function (e, t) {
              return e.name > t.name ? 1 : t.name > e.name ? -1 : 0;
            }), n.setState({
              findUsers: e
            });else {
              n.setState({
                findUsers: [{
                  id: null,
                  name: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"
                }]
              });
            }
          }).catch(function (e) {
            if (404 === e.status) {
              n.setState({
                findUsers: [{
                  id: null,
                  name: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"
                }]
              });
            } else console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u0445 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "render",
        value: function value() {
          var e = this;
          return console.log(this.state.findUsers), s.a.createElement("div", {
            className: "popup"
          }, s.a.createElement("div", {
            className: "popup_inner"
          }, s.a.createElement("h1", null, "\u041F\u043E\u0438\u0441\u043A"), s.a.createElement("form", {
            className: "popupFindButtonForm",
            onSubmit: this.handleSubmit
          }, s.a.createElement("input", {
            id: "password",
            name: "password",
            placeholder: "\u0418\u043C\u044F \u0438\u043B\u0438 \u043B\u043E\u0433\u0438\u043D",
            className: "inputText",
            value: this.state.text,
            onChange: this.handleChangeTest
          }), s.a.createElement("input", {
            id: "submitButton",
            type: "submit",
            value: "\u041D\u0430\u0439\u0442\u0438"
          })), s.a.createElement("hr", null), s.a.createElement("ul", {
            className: "listFindResult"
          }, this.state.findUsers.map(function (t) {
            return t.id ? s.a.createElement("li", {
              className: "link-button",
              key: t.id,
              name: t.name,
              onClick: function onClick() {
                return e.props.userInFindClickHandle(t.id, t.name);
              }
            }, t.name, " (", t.id, ")") : s.a.createElement("li", {
              key: t.id
            }, t.name);
          })), s.a.createElement("button", {
            className: "popupCloseButton",
            onClick: this.props.closePopup
          }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")));
        }
      }]), t;
    }(s.a.Component),
        x = function (e) {
      function t(e) {
        var n;
        Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          currentConversionId: "public",
          conversations: [],
          userNames: [],
          messages: [],
          showPopup: !1,
          connected: !1
        }, n.newConversation = n.newConversation.bind(Object(h.a)(Object(h.a)(n))), n.getConversations = n.getConversations.bind(Object(h.a)(Object(h.a)(n))), n.getMessage = n.getMessage.bind(Object(h.a)(Object(h.a)(n))), n.getOnlyNewMessage = n.getOnlyNewMessage.bind(Object(h.a)(Object(h.a)(n))), n.getUserName = n.getUserName.bind(Object(h.a)(Object(h.a)(n))), n.findConversionName = n.findConversionName.bind(Object(h.a)(Object(h.a)(n))), n.togglePopup = n.togglePopup.bind(Object(h.a)(Object(h.a)(n))), n.userInFindClickHandle = n.userInFindClickHandle.bind(Object(h.a)(Object(h.a)(n)));
        var a = "ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + n.props.token;
        return n.socket = new WebSocket(a), n.socket.onopen = function () {
          console.log("socket connected"), n.setState({
            connected: !0
          });
        }, n.socketEmit = n.socketEmit.bind(Object(h.a)(Object(h.a)(n))), n.newSocketMessage = n.newSocketMessage.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "socketEmit",
        value: function value() {
          var e = this;
          this.state.connected && (console.log("\u0441\u043E\u043A\u0435\u0442 \u0436\u0438\u0432"), this.socket.onmessage = function (t) {
            var n = t.data;
            return e.newSocketMessage(n);
          });
        }
      }, {
        key: "newSocketMessage",
        value: function value(e) {
          var t = JSON.parse(e);
          if (console.log("newSocketMessage"), console.log(t), console.log(this.props.thisUserId), console.log(t.User), console.log(this.state.currentConversionId), console.log(this.state.messages.length), t.User === this.props.thisUserId) return this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1), void console.log("\u043F\u0440\u0438\u043B\u043E \u0442.\u043A. \u0441\u0432\u043E\u0451");
          "public" === t.ConversationId ? "public" === this.state.currentConversionId && this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1) : t.User === this.state.currentConversionId ? (this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1), console.log("\u043F\u0440\u0438\u043B\u043E \u0442.\u043A. \u0442\u044B \u0432 \u043D\u0443\u0436\u043D\u043E \u0447\u0430\u0442\u0435")) : (console.log("\u043F\u0440\u0438\u043B\u043E \u043D\u043E \u0442\u044B \u043D\u0435 \u0432 \u0442\u043E\u043C \u0447\u0430\u0442\u0435"), this.getConversations());
        }
      }, {
        key: "componentDidMount",
        value: function value() {
          var e = this;
          this.getConversations(), this.getMessage(this.state.currentConversionId, this.props.token), this.timerID = setInterval(function () {
            return e.socketEmit();
          }, 500);
        }
      }, {
        key: "getUserName",
        value: function value(e) {
          var t = this;
          k(e, this.props.token).then(function (e) {
            if (e.ok) return e.json();
            throw e;
          }).then(function (e) {
            t.setState(function (t) {
              return {
                userNames: [].concat(Object(N.a)(t.userNames), [e])
              };
            });
          }).catch(function (e) {
            console.log(e), e.statusText, console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "getConversations",
        value: function value() {
          var e,
              t = this;
          (e = this.props.token, fetch(d + f, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + e
            }
          })).then(function (e) {
            if (e.ok) return e.json();
            throw e;
          }).then(function (e) {
            e.sort(function (e, t) {
              return (e.participant ? e.participant : "") > t.participant ? 1 : t.participant > (e.participant ? e.participant : "") ? -1 : 0;
            }), t.setState({
              conversations: e
            }), console.log(e), e.map(function (e) {
              return t.getUserName(e.participant ? e.participant : "me");
            });
          }).catch(function (e) {
            console.log(e), void 0 === e.statusText ? (console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u0445 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0431\u043A\u0430!")) : (console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u0445 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!"));
          });
        }
      }, {
        key: "newConversation",
        value: function value(e) {
          if (e) {
            var t = [];

            if (this.state.conversations && (t = this.state.conversations.filter(function (t) {
              return t.participant === e;
            })), 0 === t.length) {
              var n = {
                participant: e,
                id: e,
                lastMessage: {
                  timestamp: "",
                  content: "\u043D\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439"
                }
              };
              this.getUserName(e || "me"), this.setState(function (e) {
                return {
                  conversations: [].concat(Object(N.a)(e.conversations), [n])
                };
              });
            }

            this.setState({
              currentConversionId: e || "public"
            });
          } else console.log("\u043C\u0435\u043D\u044F\u0435\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0447\u0430\u0442"), this.setState({
            currentConversionId: e || "public"
          });

          this.getMessage(e || "public", this.props.token);
        }
      }, {
        key: "getMessage",
        value: function value(e, t, n, a) {
          var s = this;
          O(e, t, n, a).then(function (e) {
            if (200 === e.status) return e;
            alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          }).then(function (e) {
            return e.json();
          }).then(function (e) {
            console.log("\u043F\u0440\u0438\u0448\u043B\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"), console.log(e), s.setState({
              messages: e
            }), e.map(function (e) {
              return s.getUserName(e.user);
            });
          }).catch(function (e) {
            console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "getOnlyNewMessage",
        value: function value(e, t, n, a) {
          var s = this;
          O(e, t, n, a).then(function (e) {
            if (200 === e.status) return e;
            alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          }).then(function (e) {
            return e.json();
          }).then(function (e) {
            console.log("\u043F\u0440\u0438\u0448\u043B\u0438 \u043D\u043E\u0432\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"), s.setState(function (t) {
              return {
                messages: [].concat(Object(N.a)(t.messages), Object(N.a)(e))
              };
            }), console.log(s.state.messages), e.map(function (e) {
              return s.getUserName(e.user);
            });
          }).catch(function (e) {
            console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "togglePopup",
        value: function value() {
          this.setState({
            showPopup: !this.state.showPopup
          });
        }
      }, {
        key: "userInFindClickHandle",
        value: function value(e, t) {
          this.props.thisUserId !== e ? this.newConversation(e, t) : alert("\u0427\u0430\u0441 \u0441 \u0441\u0430\u043C\u0438 \u0441\u043E\u0431\u043E\u0439 \u0432\u0435\u0434\u044C \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u0441\u043C\u044B\u0441\u043B\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \"\u0437\u0430\u043C\u0435\u0442\u043A\u0438\" \u0432 \u0412\u0430\u0448\u0435\u043C \u0441\u043C\u0430\u0440\u0442\u0444\u043E\u043D\u0435."), this.togglePopup();
        }
      }, {
        key: "findConversionName",
        value: function value(e) {
          if (!e || "public" === e) return "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0439 \u0447\u0430\u0442";
          var t = [];
          return this.state.userNames && (t = this.state.userNames.filter(function (t) {
            return t.id === e;
          })), 0 === t.length ? "\u043F\u043E\u0438\u0441\u043A..." : t[0].name;
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement("div", {
            className: "MessengerPage"
          }, s.a.createElement("div", {
            className: "contactList"
          }, s.a.createElement("h1", null, "\u0427\u0430\u0442\u044B"), s.a.createElement("div", {
            className: "buttonFindUserPopup",
            onClick: this.togglePopup.bind(this)
          }, "\u041F\u043E\u0438\u0441\u043A"), this.state.showPopup ? s.a.createElement(T, {
            closePopup: this.togglePopup.bind(this),
            token: this.props.token,
            userInFindClickHandle: this.userInFindClickHandle
          }) : null, s.a.createElement(I, {
            token: this.props.token,
            conversations: this.state.conversations,
            newConversation: this.newConversation,
            userNames: this.state.userNames
          })), s.a.createElement("div", {
            className: "chatControl"
          }, s.a.createElement(S, {
            token: this.props.token,
            thisUserId: this.props.thisUserId,
            conversionId: this.state.currentConversionId,
            conversionName: this.findConversionName(this.state.currentConversionId),
            newConversation: this.newConversation,
            addNewUserName: this.addNewUserName,
            userNames: this.state.userNames,
            messages: this.state.messages
          })));
        }
      }]), t;
    }(s.a.Component),
        A = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          loginFortSignin: !0
        }, n.updateToken = n.updateToken.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "updateToken",
        value: function value(e, t) {
          this.props.updateToken(e, t);
        }
      }, {
        key: "handleClick",
        value: function value() {
          this.setState({
            loginFortSignin: !this.state.loginFortSignin
          });
        }
      }, {
        key: "render",
        value: function value() {
          var e = this;
          return this.props.token ? s.a.createElement(x, {
            token: this.props.token,
            thisUserId: this.props.thisUserId
          }) : this.state.loginFortSignin ? s.a.createElement("div", {
            className: "login-logup"
          }, s.a.createElement(j, {
            onClick: function onClick() {
              return e.handleClick();
            },
            updateToken: this.updateToken
          })) : s.a.createElement("div", {
            className: "login-logup"
          }, s.a.createElement(C, {
            onClick: function onClick() {
              return e.handleClick();
            },
            updateToken: this.updateToken
          }));
        }
      }]), t;
    }(s.a.Component),
        P = n(10),
        U = n.n(P),
        M = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).handleSingOutButtonOnClick = n.handleSingOutButtonOnClick.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleSingOutButtonOnClick",
        value: function value() {
          this.props.singOut();
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement("header", {
            id: "header"
          }, s.a.createElement("h1", null, s.a.createElement("img", {
            src: U.a,
            alt: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F"
          }), "\u0427\u0430\u0442 2019"), s.a.createElement(B, {
            userName: this.props.userName,
            handleSingOutButtonOnClick: this.handleSingOutButtonOnClick
          }));
        }
      }]), t;
    }(s.a.Component),
        B = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).handleSingOutButtonOnClick = n.handleSingOutButtonOnClick.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "handleSingOutButtonOnClick",
        value: function value() {
          this.props.handleSingOutButtonOnClick();
        }
      }, {
        key: "render",
        value: function value() {
          return "" === this.props.userName ? s.a.createElement("div", null) : s.a.createElement("div", {
            id: "ProfileInfo"
          }, s.a.createElement("div", {
            id: "ProfileInfo-UserName",
            className: "ProfileInfoLabel"
          }, this.props.userName), s.a.createElement("div", {
            id: "ProfileInfo-id",
            className: "ProfileInfoLabel"
          }, s.a.createElement("button", {
            type: "button",
            className: "link-button-signout",
            onClick: this.handleSingOutButtonOnClick
          }, "\u0412\u044B\u0445\u043E\u0434")));
        }
      }]), t;
    }(s.a.Component),
        F = function (e) {
      function t() {
        return Object(r.a)(this, t), Object(l.a)(this, Object(u.a)(t).apply(this, arguments));
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "render",
        value: function value() {
          return s.a.createElement("footer", {
            id: "footer"
          }, s.a.createElement("div", {
            id: "footer-text"
          }, "\xa9 2019 Ilya Dyakovetskiy"), s.a.createElement("div", {
            id: "footer-mailto"
          }, s.a.createElement("a", {
            href: "mailto:Ilya.Dyakovetskiy@abbyy.com"
          }, "Ilya.Dyakovetskiy@abbyy.com")));
        }
      }]), t;
    }(s.a.Component),
        H = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(l.a)(this, Object(u.a)(t).call(this, e))).state = {
          login: "",
          token: localStorage.getItem("token"),
          tokenExpires: localStorage.getItem("expires"),
          userName: "",
          userId: ""
        }, n.updateToken = n.updateToken.bind(Object(h.a)(Object(h.a)(n))), n.singOut = n.singOut.bind(Object(h.a)(Object(h.a)(n))), n;
      }

      return Object(m.a)(t, e), Object(c.a)(t, [{
        key: "componentDidMount",
        value: function value() {
          new Date(this.state.tokenExpires) < new Date() && (localStorage.removeItem("token"), localStorage.removeItem("expires"), this.setState({
            token: null,
            tokenExpires: null,
            userID: "",
            userName: ""
          })), this.state.token && this.loadUserInfo(this.state.token, "me");
        }
      }, {
        key: "updateToken",
        value: function value(e, t) {
          localStorage.setItem("token", e), localStorage.setItem("expires", t), this.loadUserInfo(e, "me"), this.setState({
            token: e,
            tokenExpires: t
          });
        }
      }, {
        key: "loadUserInfo",
        value: function value(e, t) {
          var n = this;
          k(t, e).then(function (e) {
            if (e.ok) return e.json();
            throw e;
          }).then(function (e) {
            console.log("my id: " + e.id), n.setState({
              userName: e.name,
              userId: e.id
            });
          }).catch(function (e) {
            e.statusText, console.log(e), alert("\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!");
          });
        }
      }, {
        key: "singOut",
        value: function value() {
          localStorage.removeItem("token"), localStorage.removeItem("expires"), this.setState({
            token: null,
            tokenExpires: null,
            userID: "",
            userName: ""
          });
        }
      }, {
        key: "render",
        value: function value() {
          return s.a.createElement(s.a.Fragment, null, s.a.createElement(M, {
            token: this.state.token,
            userName: this.state.userName,
            singOut: this.singOut
          }), s.a.createElement(A, {
            updateToken: this.updateToken,
            token: this.state.token,
            thisUserId: this.state.userId
          }), s.a.createElement(F, null));
        }
      }]), t;
    }(s.a.Component);

    i.a.render(s.a.createElement(H, null), document.getElementById("main-div"));
  }
}, [[11, 1, 2]]]);
},{}],"../../../Users/Илья/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50578" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/Илья/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","static/js/main.884fecb4.chunk.js"], null)
//# sourceMappingURL=/main.884fecb4.chunk.257a4d0f.js.map