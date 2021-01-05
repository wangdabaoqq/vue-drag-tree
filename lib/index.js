module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "018d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a3f9441-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueDragTree/src/tree.vue?vue&type=template&id=13e73320&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"org-tree-container"},[_c('div',{staticClass:"org-tree",class:[
      {
        'el-tree--highlight-current': _vm.highlightCurrent,
        'is-dragging': !!_vm.dragState.draggingNode,
        'is-drop-not-allow': _vm.dragState.allowDrop,
      },
      _vm.direction
    ],attrs:{"role":"tree"}},[_vm._l((_vm.root.childNodes),function(child){return _c('tree-node',{key:_vm.getNodeKey(child),attrs:{"node":child,"props":_vm.props,"render-after-expand":_vm.renderAfterExpand,"render-content":_vm.renderContent},on:{"node-expand":_vm.handleNodeExpand}})}),(_vm.isEmpty)?_c('div',{staticClass:"el-tree-node__empty-block"},[_c('span',{staticClass:"el-tree-node__empty-text"},[_vm._v(_vm._s(_vm.emptyText))])]):_vm._e()],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueDragTree/src/tree.vue?vue&type=template&id=13e73320&

// CONCATENATED MODULE: ./packages/vueDragTree/model/util.js
var NODE_KEY = '$treeNodeId';
var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};
var util_getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
var findNearestComponent = function findNearestComponent(element, componentName) {
  var target = element;

  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }

    target = target.parentNode;
  }

  return null;
};
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
}
/* istanbul ignore next */

function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }

  if (!el.classList) {
    el.className = trim(curClass);
  }
}
// CONCATENATED MODULE: ./packages/vueDragTree/model/node.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // import objectAssign from 'element-ui/src/utils/merge';


 // import { arrayFindIndex } from 'element-ui/src/utils/util';

function objectAssign(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};

    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];

        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}

var arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }

  return -1;
};

var getChildState = function getChildState(node) {
  var all = true;
  var none = true;
  var allWithoutDisable = true;

  for (var i = 0, j = node.length; i < j; i++) {
    var n = node[i];

    if (n.checked !== true || n.indeterminate) {
      all = false;

      if (!n.disabled) {
        allWithoutDisable = false;
      }
    }

    if (n.checked !== false || n.indeterminate) {
      none = false;
    }
  }

  return {
    all: all,
    none: none,
    allWithoutDisable: allWithoutDisable,
    half: !all && !none
  };
}; // const reInitChecked = function(node) {
//   if (node.childNodes.length === 0) return;
//   const {all, none, half} = getChildState(node.childNodes);
//   if (all) {
//     node.checked = true;
//     node.indeterminate = false;
//   } else if (half) {
//     node.checked = false;
//     node.indeterminate = true;
//   } else if (none) {
//     node.checked = false;
//     node.indeterminate = false;
//   }
//   const parent = node.parent;
//   if (!parent || parent.level === 0) return;
//   if (!node.store.checkStrictly) {
//     reInitChecked(parent);
//   }
// };


var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};

var nodeIdSeed = 0;

var node_Node = /*#__PURE__*/function () {
  function Node(options) {
    _classCallCheck(this, Node);

    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;
    this.isCurrent = false;

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    } // internal


    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    var store = this.store;

    if (!store) {
      throw new Error('[Node]store is required!');
    }

    store.registerNode(this);
    var props = store.props;

    if (props && typeof props.isLeaf !== 'undefined') {
      var isLeaf = getPropertyFromData(this, 'isLeaf');

      if (typeof isLeaf === 'boolean') {
        this.isLeafByUser = isLeaf;
      }
    } // console.log(store.defaultExpandAll)


    if (this.data) {
      this.setData(this.data);

      if (store.defaultExpandAll) {
        // this.forEachNodeState(this)
        this.expanded = true; // console.log(store)
      } else {
        this.forEachNodeState(this);
      } // console.log(store, this)

    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
      this.expand();
    }

    if (!Array.isArray(this.data)) {
      markNodeData(this, this.data);
    }

    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;

    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, store.autoExpandParent);
    }

    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    } // if (store.lazy) {
    //   store._initDefaultCheckedNode(this);
    // }


    this.updateLeafState();
  } // 遍历


  _createClass(Node, [{
    key: "forEachNodeState",
    value: function forEachNodeState(node) {
      // console.log(node)
      if (node.childNodes.length > 0) {
        // console.log(node)
        node.expanded = false;
      } else {
        node.expanded = true;
      }
    }
  }, {
    key: "setData",
    value: function setData(data) {
      if (!Array.isArray(data)) {
        markNodeData(this, data);
      }

      this.data = data;
      this.childNodes = [];
      var children;

      if (this.level === 0 && this.data instanceof Array) {
        children = this.data;
      } else {
        children = getPropertyFromData(this, 'children') || [];
      }

      for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({
          data: children[i]
        });
      }
    }
  }, {
    key: "contains",
    value: function contains(target) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var walk = function walk(parent) {
        var children = parent.childNodes || [];
        var result = false;

        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];

          if (child === target || deep && walk(child)) {
            result = true;
            break;
          }
        }

        return result;
      };

      return walk(this);
    }
  }, {
    key: "remove",
    value: function remove() {
      var parent = this.parent;

      if (parent) {
        parent.removeChild(this);
      }
    }
  }, {
    key: "insertChild",
    value: function insertChild(child, index, batch) {
      if (!child) throw new Error('insertChild error: child is required.');

      if (!(child instanceof Node)) {
        if (!batch) {
          var children = this.getChildren(true);

          if (children.indexOf(child.data) === -1) {
            if (typeof index === 'undefined' || index < 0) {
              children.push(child.data);
            } else {
              children.splice(index, 0, child.data);
            }
          }
        }

        objectAssign(child, {
          parent: this,
          store: this.store
        });
        child = new Node(child);
      }

      child.level = this.level + 1;

      if (typeof index === 'undefined' || index < 0) {
        this.childNodes.push(child);
      } else {
        this.childNodes.splice(index, 0, child);
      }

      this.updateLeafState();
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, ref) {
      var index;

      if (ref) {
        index = this.childNodes.indexOf(ref);
      }

      this.insertChild(child, index);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(child, ref) {
      var index;

      if (ref) {
        index = this.childNodes.indexOf(ref);
        if (index !== -1) index += 1;
      }

      this.insertChild(child, index);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var children = this.getChildren() || [];
      var dataIndex = children.indexOf(child.data);

      if (dataIndex > -1) {
        children.splice(dataIndex, 1);
      }

      var index = this.childNodes.indexOf(child);

      if (index > -1) {
        this.store && this.store.deregisterNode(child);
        child.parent = null;
        this.childNodes.splice(index, 1);
      }

      this.updateLeafState();
    }
  }, {
    key: "removeChildByData",
    value: function removeChildByData(data) {
      var targetNode = null;

      for (var i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes[i].data === data) {
          targetNode = this.childNodes[i];
          break;
        }
      }

      if (targetNode) {
        this.removeChild(targetNode);
      }
    }
  }, {
    key: "expand",
    value: function expand(callback, expandParent) {
      var _this = this; // console.log('test1111')


      var done = function done() {
        if (expandParent) {
          var parent = _this.parent;

          while (parent.level > 0) {
            parent.expanded = true;
            parent = parent.parent;
          }
        } // console.log(this)


        _this.expanded = true;
        if (callback) callback();
      }; // if (this.shouldLoadData()) {
      //   this.loadData((data) => {
      //     if (data instanceof Array) {
      //       if (this.checked) {
      //         this.setChecked(true, true);
      //       } else if (!this.store.checkStrictly) {
      //         reInitChecked(this);
      //       }
      //       done();
      //     }
      //   });
      // } else {


      done(); // }
    }
  }, {
    key: "doCreateChildren",
    value: function doCreateChildren(array) {
      var _this2 = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      array.forEach(function (item) {
        _this2.insertChild(objectAssign({
          data: item
        }, defaultProps), undefined, true);
      });
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.expanded = false;
    }
  }, {
    key: "shouldLoadData",
    value: function shouldLoadData() {
      return this.store.lazy === true && this.store.load && !this.loaded;
    }
  }, {
    key: "updateLeafState",
    value: function updateLeafState() {
      if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
        this.isLeaf = this.isLeafByUser;
        return;
      }

      var childNodes = this.childNodes;

      if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
        this.isLeaf = !childNodes || childNodes.length === 0;
        return;
      }

      this.isLeaf = false;
    } // setChecked(value, deep, recursion, passValue) {
    //   this.indeterminate = value === 'half';
    //   this.checked = value === true;
    //   if (this.store.checkStrictly) return;
    //   if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
    //     let { all, allWithoutDisable } = getChildState(this.childNodes);
    //     if (!this.isLeaf && (!all && allWithoutDisable)) {
    //       this.checked = false;
    //       value = false;
    //     }
    //     const handleDescendants = () => {
    //       if (deep) {
    //         const childNodes = this.childNodes;
    //         for (let i = 0, j = childNodes.length; i < j; i++) {
    //           const child = childNodes[i];
    //           passValue = passValue || value !== false;
    //           const isCheck = child.disabled ? child.checked : passValue;
    //           child.setChecked(isCheck, deep, true, passValue);
    //         }
    //         const { half, all } = getChildState(childNodes);
    //         if (!all) {
    //           this.checked = all;
    //           this.indeterminate = half;
    //         }
    //       }
    //     };
    //     if (this.shouldLoadData()) {
    //       // Only work on lazy load data.
    //       this.loadData(() => {
    //         handleDescendants();
    //         reInitChecked(this);
    //       }, {
    //         checked: value !== false
    //       });
    //       return;
    //     } else {
    //       handleDescendants();
    //     }
    //   }
    //   const parent = this.parent;
    //   if (!parent || parent.level === 0) return;
    //   if (!recursion) {
    //     reInitChecked(parent);
    //   }
    // }

  }, {
    key: "getChildren",
    value: function getChildren() {
      var forceInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; // this is data

      if (this.level === 0) return this.data;
      var data = this.data;
      if (!data) return null;
      var props = this.store.props;
      var children = 'children';

      if (props) {
        children = props.children || 'children';
      }

      if (data[children] === undefined) {
        data[children] = null;
      }

      if (forceInit && !data[children]) {
        data[children] = [];
      }

      return data[children];
    }
  }, {
    key: "updateChildren",
    value: function updateChildren() {
      var _this3 = this;

      var newData = this.getChildren() || [];
      var oldData = this.childNodes.map(function (node) {
        return node.data;
      });
      var newDataMap = {};
      var newNodes = [];
      newData.forEach(function (item, index) {
        var key = item[NODE_KEY];
        var isNodeExists = !!key && arrayFindIndex(oldData, function (data) {
          return data[NODE_KEY] === key;
        }) >= 0;

        if (isNodeExists) {
          newDataMap[key] = {
            index: index,
            data: item
          };
        } else {
          newNodes.push({
            index: index,
            data: item
          });
        }
      });

      if (!this.store.lazy) {
        oldData.forEach(function (item) {
          if (!newDataMap[item[NODE_KEY]]) _this3.removeChildByData(item);
        });
      }

      newNodes.forEach(function (_ref) {
        var index = _ref.index,
            data = _ref.data;

        _this3.insertChild({
          data: data
        }, index);
      });
      this.updateLeafState();
    }
  }, {
    key: "loadData",
    value: function loadData(callback) {
      var _this4 = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
        this.loading = true;

        var resolve = function resolve(children) {
          _this4.loaded = true;
          _this4.loading = false;
          _this4.childNodes = [];

          _this4.doCreateChildren(children, defaultProps);

          _this4.updateLeafState();

          if (callback) {
            callback.call(_this4, children);
          }
        };

        this.store.load(this, resolve);
      } else {
        if (callback) {
          callback.call(this);
        }
      }
    }
  }, {
    key: "label",
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }, {
    key: "key",
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: "disabled",
    get: function get() {
      return getPropertyFromData(this, 'disabled');
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var parent = this.parent;

      if (parent) {
        var index = parent.childNodes.indexOf(this);

        if (index > -1) {
          return parent.childNodes[index + 1];
        }
      }

      return null;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var parent = this.parent;

      if (parent) {
        var index = parent.childNodes.indexOf(this);

        if (index > -1) {
          return index > 0 ? parent.childNodes[index - 1] : null;
        }
      }

      return null;
    }
  }]);

  return Node;
}();


// CONCATENATED MODULE: ./packages/vueDragTree/model/tree-store.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function tree_store_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function tree_store_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function tree_store_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) tree_store_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) tree_store_defineProperties(Constructor, staticProps);
  return Constructor;
}




var tree_store_TreeStore = /*#__PURE__*/function () {
  function TreeStore(options) {
    var _this = this;

    tree_store_classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.nodesMap = {};
    this.root = new node_Node({
      data: this.data,
      store: this
    });

    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this.root.doCreateChildren(data);

        _this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }

  tree_store_createClass(TreeStore, [{
    key: "filter",
    value: function filter(value) {
      var filterNodeMethod = this.filterNodeMethod;
      var lazy = this.lazy;

      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach(function (child) {
          child.visible = filterNodeMethod.call(child, value, child.data, child);
          traverse(child);
        });

        if (!node.visible && childNodes.length) {
          var allHidden = true;
          allHidden = !childNodes.some(function (child) {
            return child.visible;
          });

          if (node.root) {
            node.root.visible = allHidden === false;
          } else {
            node.visible = allHidden === false;
          }
        }

        if (!value) return; // node.expand()

        if (node.visible && !node.isLeaf && !lazy) node.expand();
      };

      traverse(this);
    }
  }, {
    key: "setData",
    value: function setData(newVal) {
      var instanceChanged = newVal !== this.root.data;

      if (instanceChanged) {
        this.root.setData(newVal);

        this._initDefaultCheckedNodes();
      } else {
        this.root.updateChildren();
      }
    }
  }, {
    key: "getNode",
    value: function getNode(data) {
      if (data instanceof node_Node) return data;
      var key = _typeof(data) !== 'object' ? data : util_getNodeKey(this.key, data);
      return this.nodesMap[key] || null;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertBefore({
        data: data
      }, refNode);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertAfter({
        data: data
      }, refNode);
    }
  }, {
    key: "remove",
    value: function remove(data) {
      var node = this.getNode(data);

      if (node && node.parent) {
        if (node === this.currentNode) {
          this.currentNode = null;
        }

        node.parent.removeChild(node);
      }
    }
  }, {
    key: "append",
    value: function append(data, parentData) {
      var parentNode = parentData ? this.getNode(parentData) : this.root;

      if (parentNode) {
        parentNode.insertChild({
          data: data
        });
      }
    }
  }, {
    key: "_initDefaultCheckedNodes",
    value: function _initDefaultCheckedNodes() {
      var _this2 = this;

      var defaultCheckedKeys = this.defaultCheckedKeys || [];
      var nodesMap = this.nodesMap;
      defaultCheckedKeys.forEach(function (checkedKey) {
        var node = nodesMap[checkedKey];

        if (node) {
          node.setChecked(true, !_this2.checkStrictly);
        }
      });
    }
  }, {
    key: "_initDefaultCheckedNode",
    value: function _initDefaultCheckedNode(node) {
      var defaultCheckedKeys = this.defaultCheckedKeys || [];

      if (defaultCheckedKeys.indexOf(node.key) !== -1) {
        node.setChecked(true, !this.checkStrictly);
      }
    }
  }, {
    key: "setDefaultCheckedKey",
    value: function setDefaultCheckedKey(newVal) {
      if (newVal !== this.defaultCheckedKeys) {
        this.defaultCheckedKeys = newVal;

        this._initDefaultCheckedNodes();
      }
    }
  }, {
    key: "registerNode",
    value: function registerNode(node) {
      var key = this.key;
      if (!key || !node || !node.data) return;
      var nodeKey = node.key;
      if (nodeKey !== undefined) this.nodesMap[node.key] = node;
    }
  }, {
    key: "deregisterNode",
    value: function deregisterNode(node) {
      var _this3 = this;

      var key = this.key;
      if (!key || !node || !node.data) return;
      node.childNodes.forEach(function (child) {
        _this3.deregisterNode(child);
      });
      delete this.nodesMap[node.key];
    } // getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
    //   const checkedNodes = [];
    //   const traverse = function(node) {
    //     const childNodes = node.root ? node.root.childNodes : node.childNodes;
    //     childNodes.forEach((child) => {
    //       if ((child.checked || (includeHalfChecked && child.indeterminate)) && (!leafOnly || (leafOnly && child.isLeaf))) {
    //         checkedNodes.push(child.data);
    //       }
    //       traverse(child);
    //     });
    //   };
    //   traverse(this);
    //   return checkedNodes;
    // }
    // getCheckedKeys(leafOnly = false) {
    //   return this.getCheckedNodes(leafOnly).map((data) => (data || {})[this.key]);
    // }

  }, {
    key: "getHalfCheckedNodes",
    value: function getHalfCheckedNodes() {
      var nodes = [];

      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach(function (child) {
          if (child.indeterminate) {
            nodes.push(child.data);
          }

          traverse(child);
        });
      };

      traverse(this);
      return nodes;
    }
  }, {
    key: "getHalfCheckedKeys",
    value: function getHalfCheckedKeys() {
      var _this4 = this;

      return this.getHalfCheckedNodes().map(function (data) {
        return (data || {})[_this4.key];
      });
    }
  }, {
    key: "_getAllNodes",
    value: function _getAllNodes() {
      var allNodes = [];
      var nodesMap = this.nodesMap;

      for (var nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey)) {
          allNodes.push(nodesMap[nodeKey]);
        }
      }

      return allNodes;
    }
  }, {
    key: "updateChildren",
    value: function updateChildren(key, data) {
      var node = this.nodesMap[key];
      if (!node) return;
      var childNodes = node.childNodes;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        var child = childNodes[i];
        this.remove(child.data);
      }

      for (var _i = 0, j = data.length; _i < j; _i++) {
        var _child = data[_i];
        this.append(_child, node.data);
      }
    }
  }, {
    key: "_setCheckedKeys",
    value: function _setCheckedKeys(key) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var checkedKeys = arguments.length > 2 ? arguments[2] : undefined;

      var allNodes = this._getAllNodes().sort(function (a, b) {
        return b.level - a.level;
      });

      var cache = Object.create(null);
      var keys = Object.keys(checkedKeys);
      allNodes.forEach(function (node) {
        return node.setChecked(false, false);
      });

      for (var i = 0, j = allNodes.length; i < j; i++) {
        var node = allNodes[i];
        var nodeKey = node.data[key].toString();
        var checked = keys.indexOf(nodeKey) > -1;

        if (!checked) {
          if (node.checked && !cache[nodeKey]) {
            node.setChecked(false, false);
          }

          continue;
        }

        var parent = node.parent;

        while (parent && parent.level > 0) {
          cache[parent.data[key]] = true;
          parent = parent.parent;
        }

        if (node.isLeaf || this.checkStrictly) {
          node.setChecked(true, false);
          continue;
        }

        node.setChecked(true, true);

        if (leafOnly) {
          (function () {
            node.setChecked(false, false);

            var traverse = function traverse(node) {
              var childNodes = node.childNodes;
              childNodes.forEach(function (child) {
                if (!child.isLeaf) {
                  child.setChecked(false, false);
                }

                traverse(child);
              });
            };

            traverse(node);
          })();
        }
      }
    }
  }, {
    key: "setCheckedNodes",
    value: function setCheckedNodes(array) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var key = this.key;
      var checkedKeys = {};
      array.forEach(function (item) {
        checkedKeys[(item || {})[key]] = true;
      });

      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: "setCheckedKeys",
    value: function setCheckedKeys(keys) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.defaultCheckedKeys = keys;
      var key = this.key;
      var checkedKeys = {};
      keys.forEach(function (key) {
        checkedKeys[key] = true;
      });

      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: "setDefaultExpandedKeys",
    value: function setDefaultExpandedKeys(keys) {
      var _this5 = this;

      keys = keys || [];
      this.defaultExpandedKeys = keys;
      keys.forEach(function (key) {
        var node = _this5.getNode(key);

        if (node) node.expand(null, _this5.autoExpandParent);
      });
    }
  }, {
    key: "setChecked",
    value: function setChecked(data, checked, deep) {
      var node = this.getNode(data);

      if (node) {
        node.setChecked(!!checked, deep);
      }
    }
  }, {
    key: "getCurrentNode",
    value: function getCurrentNode() {
      return this.currentNode;
    }
  }, {
    key: "setCurrentNode",
    value: function setCurrentNode(currentNode) {
      var prevCurrentNode = this.currentNode;

      if (prevCurrentNode) {
        prevCurrentNode.isCurrent = false;
      }

      this.currentNode = currentNode;
      this.currentNode.isCurrent = true;
    }
  }, {
    key: "setUserCurrentNode",
    value: function setUserCurrentNode(node) {
      var key = node[this.key];
      var currNode = this.nodesMap[key];
      this.setCurrentNode(currNode);
    }
  }, {
    key: "setCurrentNodeKey",
    value: function setCurrentNodeKey(key) {
      if (key === null || key === undefined) {
        this.currentNode && (this.currentNode.isCurrent = false);
        this.currentNode = null;
        return;
      }

      var node = this.getNode(key);

      if (node) {
        this.setCurrentNode(node);
      }
    }
  }]);

  return TreeStore;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a3f9441-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueDragTree/src/tree-node.vue?vue&type=template&id=3e1f9f8e&
var tree_nodevue_type_template_id_3e1f9f8e_render = function () {
var this$1 = this;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.node.visible),expression:"node.visible"}],ref:"node",staticClass:"org-tree-node",class:{
    collapsed:!_vm.expanded,
    'is-hidden': !_vm.node.visible,
    'is-leaf': _vm.expanded
  },attrs:{"role":"treeitem","aria-expanded":_vm.expanded,"aria-disabled":_vm.node.disabled,"draggable":_vm.tree.draggable},on:{"contextmenu":function ($event) { return this$1.handleContextMenu($event); },"dragstart":function($event){$event.stopPropagation();return _vm.handleDragStart($event)},"dragover":function($event){$event.stopPropagation();return _vm.handleDragOver($event)},"dragend":function($event){$event.stopPropagation();return _vm.handleDragEnd($event)},"drop":function($event){$event.stopPropagation();return _vm.handleDrop($event)}}},[_c('div',{ref:"nodelabel",staticClass:"org-tree-node-label",on:{"click":_vm.handleClick}},[(_vm.node.childNodes && _vm.node.childNodes.length > 0)?_c('span',{class:[
        'org-tree-node-btn',
        { 'is-leaf': _vm.node.isLeaf, expanded: !_vm.node.isLeaf && _vm.expanded },
        'org-tree-node__expand-icon'
      ],on:{"click":function($event){$event.stopPropagation();return _vm.handleExpandIconClick($event)}}}):_vm._e(),_c('node-content',{attrs:{"node":_vm.node}})],1),((!_vm.renderAfterExpand || _vm.childNodeRendered) && _vm.node.childNodes.length > 0)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.expanded),expression:"expanded"}],staticClass:"org-tree-node-children",attrs:{"role":"group","aria-expanded":_vm.expanded}},_vm._l((_vm.node.childNodes),function(child){return _c('tree-node',{key:_vm.getNodeKey(child),attrs:{"render-content":_vm.renderContent,"render-after-expand":_vm.renderAfterExpand,"node":child},on:{"node-expand":_vm.handleChildNodeExpand}})}),1):_vm._e()])}
var tree_nodevue_type_template_id_3e1f9f8e_staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueDragTree/src/tree-node.vue?vue&type=template&id=3e1f9f8e&

// CONCATENATED MODULE: ./packages/vueDragTree/model/emiter.js
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

/* harmony default export */ var emiter = ({
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueDragTree/src/node-content.vue?vue&type=script&lang=js&
/* harmony default export */ var node_contentvue_type_script_lang_js_ = ({
  name: 'NodeContent',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  render: function render(h) {
    var parent = this.$parent;
    var tree = parent.tree;
    var node = this.node;
    var data = node.data,
        store = node.store;
    return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
      _self: tree.$vnode.context,
      node: node,
      data: data,
      store: store
    }) : tree.$scopedSlots.default ? tree.$scopedSlots.default({
      node: node,
      data: data
    }) : h('span', {
      class: 'org-tree-node-label-inner'
    }, [node.label]);
  }
});
// CONCATENATED MODULE: ./packages/vueDragTree/src/node-content.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_node_contentvue_type_script_lang_js_ = (node_contentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/vueDragTree/src/node-content.vue
var node_content_render, node_content_staticRenderFns




/* normalize component */

var component = normalizeComponent(
  src_node_contentvue_type_script_lang_js_,
  node_content_render,
  node_content_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var node_content = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueDragTree/src/tree-node.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
// import ElCheckbox from 'element-ui/packages/checkbox';



/* harmony default export */ var tree_nodevue_type_script_lang_js_ = ({
  name: 'TreeNode',
  componentName: 'TreeNode',
  components: {
    // ElCollapseTransition,
    // ElCheckbox,
    NodeContent: node_content
  },
  mixins: [emiter],
  props: {
    node: {
      default: function _default() {
        return {};
      }
    },
    props: {},
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      leaf: false // oldChecked: null,
      // oldIndeterminate: null

    };
  },
  watch: {
    'node.expanded': function nodeExpanded(val) {
      var _this = this;

      this.$nextTick(function () {
        _this.expanded = val; // this.expanded =
        // if (val) {
        //   this.expanded = false
        // } else {
        //   this.expanded = true
        // }
        // if (val && this.node.childNodes.length > 0) {
        //   this.expanded = false
        // } else {
        //   console.log(this.node.childNodes)
        //   this.expanded = true
        // }
      });

      if (val) {
        this.childNodeRendered = true;
      } // if (this.node.childNodes && this.node.childNodes.length > 0) {
      //   this.leaf = false
      // } else {
      //   this.leaf = true
      // }

    }
  },
  created: function created() {
    var _this2 = this;

    var parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    var tree = this.tree;

    if (!tree) {}

    var props = tree.props || {};
    var childrenKey = props['children'] || 'children';
    this.$watch("node.data.".concat(childrenKey), function () {
      _this2.node.updateChildren();
    });

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', function (node) {
        // console.log(this.node, node)
        if (_this2.node !== node && _this2.node.childNodes.length > 0) {
          _this2.node.collapse();
        }
      });
    }
  },
  methods: {
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.tree.nodeKey, node.data);
    },
    // handleSelectChange(checked, indeterminate) {
    //   if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
    //     this.tree.$emit('check-change', this.node.data, checked, indeterminate)
    //   }
    //   this.oldChecked = checked
    //   this.indeterminate = indeterminate
    // },
    handleClick: function handleClick() {
      var store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      this.tree.currentNode = this;

      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      } // if (this.tree.checkOnClickNode && !this.node.disabled) {
      //   this.handleCheckChange(null, {
      //     target: { checked: !this.node.checked }
      //   })
      // }


      this.tree.$emit('node-click', this.node.data, this.node, this);
    },
    handleContextMenu: function handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }

      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
    },
    handleExpandIconClick: function handleExpandIconClick() {
      if (this.node.isLeaf) return;

      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
        this.node.collapse();
      } else {
        this.node.expand();
        this.$emit('node-expand', this.node.data, this.node, this);
      }
    },
    // handleCheckChange(value, ev) {
    //   this.node.setChecked(ev.target.checked, !this.tree.checkStrictly)
    //   this.$nextTick(() => {
    //     const store = this.tree.store
    //     this.tree.$emit('check', this.node.data, {
    //       checkedNodes: store.getCheckedNodes(),
    //       checkedKeys: store.getCheckedKeys(),
    //       halfCheckedNodes: store.getHalfCheckedNodes(),
    //       halfCheckedKeys: store.getHalfCheckedKeys()
    //     })
    //   })
    // },
    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('TreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    },
    handleDragStart: function handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver: function handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop: function handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd: function handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueDragTree/src/tree-node.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tree_nodevue_type_script_lang_js_ = (tree_nodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/vueDragTree/src/tree-node.vue





/* normalize component */

var tree_node_component = normalizeComponent(
  src_tree_nodevue_type_script_lang_js_,
  tree_nodevue_type_template_id_3e1f9f8e_render,
  tree_nodevue_type_template_id_3e1f9f8e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tree_node = (tree_node_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueDragTree/src/tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // import {t} from 'element-ui/src/locale';


/* harmony default export */ var treevue_type_script_lang_js_ = ({
  name: 'VueDragTreeOrg',
  components: {
    TreeNode: tree_node
  },
  mixins: [emiter],
  props: {
    data: {
      type: Array
    },
    direction: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    emptyText: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    nodeKey: String,
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    // checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    // defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    // showCheckbox: {
    //   type: Boolean,
    //   default: false
    // },
    draggable: {
      type: Boolean,
      default: false
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default: function _default() {
        return {
          children: 'children',
          label: 'label'
        };
      }
    },
    // lazy: {
    //   type: Boolean,
    //   default: false
    // },
    highlightCurrent: Boolean,
    // load: Function,
    // filterNodeMethod: Function,
    accordion: Boolean,
    // indent: {
    //   type: Number,
    //   default: 18
    // },
    iconClass: String
  },
  data: function data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: [],
      dragState: {
        // showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true
      }
    };
  },
  computed: {
    children: {
      set: function set(value) {
        this.data = value;
      },
      get: function get() {
        return this.data;
      }
    },
    treeItemArray: function treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },
    isEmpty: function isEmpty() {
      var childNodes = this.root.childNodes;
      return !childNodes || childNodes.length === 0 || childNodes.every(function (_ref) {
        var visible = _ref.visible;
        return !visible;
      });
    }
  },
  watch: {
    // defaultCheckedKeys(newVal) {
    //   this.store.setDefaultCheckedKey(newVal)
    // }
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    data: function data(newVal) {
      this.store.setData(newVal);
    },
    checkboxItems: function checkboxItems(val) {
      Array.prototype.forEach.call(val, function (checkbox) {
        checkbox.setAttribute('tabindex', -1);
      });
    }
  },
  created: function created() {
    var _this = this;

    this.isTree = true;
    this.store = new tree_store_TreeStore({
      key: this.nodeKey,
      data: this.data,
      // lazy: this.lazy,
      props: this.props,
      // load: this.load,
      currentNodeKey: this.currentNodeKey,
      // checkDescendants: this.checkDescendants,
      // defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll // filterNodeMethod: this.filterNodeMethod

    });
    this.root = this.store.root;
    var dragState = this.dragState;
    this.$on('tree-node-drag-start', function (event, treeNode) {
      if (typeof _this.allowDrag === 'function' && !_this.allowDrag(treeNode.node)) {
        event.preventDefault();
        return false;
      }

      event.dataTransfer.effectAllowed = 'move'; // wrap in try catch to address IE's error when first param is 'text/plain'

      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '');
      } catch (e) {}

      dragState.draggingNode = treeNode;

      _this.$emit('node-drag-start', treeNode.node, event);
    });
    this.$on('tree-node-drag-over', function (event, treeNode) {
      var dropNode = findNearestComponent(event.target, 'TreeNode'); // console.log(dropNode, dragState, 1111)

      var oldDropNode = dragState.dropNode;

      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$refs.nodelabel, 'is-drop-inner');
      }

      var draggingNode = dragState.draggingNode;
      if (!draggingNode || !dropNode) return;
      var dropPrev = true;
      var dropInner = true;
      var dropNext = true;
      var userAllowDropInner = true;

      if (typeof _this.allowDrop === 'function') {
        dropPrev = _this.allowDrop(draggingNode.node, dropNode.node, 'prev');
        userAllowDropInner = dropInner = _this.allowDrop(draggingNode.node, dropNode.node, 'inner');
        dropNext = _this.allowDrop(draggingNode.node, dropNode.node, 'next');
      }

      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';

      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          _this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
        }

        _this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
      }

      if (dropPrev || dropInner || dropNext) {
        dragState.dropNode = dropNode;
      }

      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false;
      }

      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false;
      }

      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false;
      }

      if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
        dropPrev = false;
        dropInner = false;
        dropNext = false;
      }

      var targetPosition = dropNode.$refs.nodelabel.getBoundingClientRect(); // const treePosition = this.$el.getBoundingClientRect()

      var dropType;
      var prevPercent = dropPrev ? dropInner ? 0.25 : dropNext ? 0.45 : 1 : -1;
      var nextPercent = dropNext ? dropInner ? 0.75 : dropPrev ? 0.55 : 0 : 1; // let indicatorTop = -9999

      var distance = event.clientY - targetPosition.top;

      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before';
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after';
      } else if (dropInner) {
        dropType = 'inner';
      } else {
        dropType = 'none';
      } // const iconPosition = dropNode.$el
      // .querySelector('.org-tree-node-label')
      // .getBoundingClientRect()
      // const dropIndicator = this.$refs.dropIndicator
      // if (dropType === 'before') {
      //   indicatorTop = iconPosition.top - treePosition.top
      // } else if (dropType === 'after') {
      //   indicatorTop = iconPosition.bottom - treePosition.top
      // }
      // dropIndicator.style.top = indicatorTop + 'px'
      // dropIndicator.style.left = iconPosition.right - treePosition.left + 'px'


      if (dropType === 'inner') {
        addClass(dropNode.$refs.nodelabel, 'is-drop-inner');
      } else {
        removeClass(dropNode.$refs.nodelabel, 'is-drop-inner');
      }

      dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
      dragState.dropType = dropType;

      _this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
    });
    this.$on('tree-node-drag-end', function (event) {
      var draggingNode = dragState.draggingNode,
          dropType = dragState.dropType,
          dropNode = dragState.dropNode;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      if (draggingNode && dropNode) {
        var draggingNodeCopy = {
          data: draggingNode.node.data
        };

        if (dropType !== 'none') {
          draggingNode.node.remove();
        }

        if (dropType === 'before') {
          dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
        } else if (dropType === 'after') {
          dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
        } else if (dropType === 'inner') {
          dropNode.node.insertChild(draggingNodeCopy);
        }

        if (dropType !== 'none') {
          _this.store.registerNode(draggingNodeCopy);
        }

        removeClass(dropNode.$refs.nodelabel, 'is-drop-inner');

        _this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);

        if (dropType !== 'none') {
          _this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
        }
      }

      if (draggingNode && !dropNode) {
        _this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
      } // dragState.showDropIndicator = false


      dragState.draggingNode = null;
      dragState.dropNode = null;
      dragState.allowDrop = true;
    });
  },
  mounted: function mounted() {// this.initTabIndex()
    // this.$el.addEventListener('keydown', this.handleKeydown)
  },
  updated: function updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]'); // this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
  },
  methods: {
    // filter(value) {
    //   if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter')
    //   this.store.filter(value)
    // },
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },
    getNodePath: function getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
      var node = this.store.getNode(data);
      if (!node) return [];
      var path = [node.data];
      var parent = node.parent;

      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }

      return path.reverse();
    },
    getCheckedNodes: function getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    getHalfCheckedNodes: function getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes();
    },
    getHalfCheckedKeys: function getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys();
    },
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
      this.store.setUserCurrentNode(node);
    },
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
      this.store.setCurrentNodeKey(key);
    },
    getNode: function getNode(data) {
      return this.store.getNode(data);
    },
    remove: function remove(data) {
      this.store.remove(data);
    },
    append: function append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
      this.broadcast('TreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueDragTree/src/tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_treevue_type_script_lang_js_ = (treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/vueDragTree/src/tree.vue





/* normalize component */

var tree_component = normalizeComponent(
  src_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tree = (tree_component.exports);
// EXTERNAL MODULE: ./packages/style/index.styl
var style = __webpack_require__("018d");

// CONCATENATED MODULE: ./packages/vueDragTree/index.js

 // import '../../lib/theme/drag-module.css'

function install(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component(tree.name, tree);
}
tree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(tree);
}

/* harmony default export */ var vueDragTree = (tree);
// CONCATENATED MODULE: ./src/index.js
// import FileHandle from '../packages/file-handle/index'
// import TestModule from '../packages/test-module/index'
 // import { version } from '../package.json'

var components = [vueDragTree];

var src_install = function install(Vue) {
  // 判断是否安装
  if (install.installed) {
    return;
  }

  components.forEach(function (component) {
    Vue.component(component.name, component);
    Vue.use(component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  src_install(window.Vue);
}

/* harmony default export */ var src = (vueDragTree);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });