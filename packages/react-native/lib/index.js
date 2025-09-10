/******/ var __webpack_modules__ = ({

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch (
          ("number" === typeof type.tag &&
            console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ),
          type.$$typeof)
        ) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type ||
              ((type = innerType.displayName || innerType.name || ""),
              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
            return type;
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType
                ? innerType
                : getComponentNameFromType(type.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = !1;
      } catch (e) {
        JSCompiler_inline_result = !0;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 =
          ("function" === typeof Symbol &&
            Symbol.toStringTag &&
            value[Symbol.toStringTag]) ||
          value.constructor.name ||
          "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if (
        "object" === typeof type &&
        null !== type &&
        type.$$typeof === REACT_LAZY_TYPE
      )
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return !1;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown ||
          ((specialPropKeyWarningShown = !0),
          console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
      }
      warnAboutAccessingKey.isReactWarning = !0;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: !0
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] ||
        ((didWarnAboutElementRef[componentName] = !0),
        console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(
      type,
      key,
      self,
      source,
      owner,
      props,
      debugStack,
      debugTask
    ) {
      self = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        props: props,
        _owner: owner
      };
      null !== (void 0 !== self ? self : null)
        ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
          })
        : Object.defineProperty(type, "ref", { enumerable: !1, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(
      type,
      config,
      maybeKey,
      isStaticChildren,
      source,
      self,
      debugStack,
      debugTask
    ) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (
              isStaticChildren = 0;
              isStaticChildren < children.length;
              isStaticChildren++
            )
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function (k) {
          return "key" !== k;
        });
        isStaticChildren =
          0 < keys.length
            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
            : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] ||
          ((keys =
            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
          console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ),
          (didWarnAboutKeySpread[children + isStaticChildren] = !0));
      }
      children = null;
      void 0 !== maybeKey &&
        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
      hasValidKey(config) &&
        (checkKeyStringCoercion(config.key), (children = "" + config.key));
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children &&
        defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type
            ? type.displayName || type.name || "Unknown"
            : type
        );
      return ReactElement(
        type,
        children,
        self,
        source,
        getOwner(),
        maybeKey,
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      "object" === typeof node &&
        null !== node &&
        node.$$typeof === REACT_ELEMENT_TYPE &&
        node._store &&
        (node._store.validated = 1);
    }
    var React = __webpack_require__(/*! react */ "react"),
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      isArrayImpl = Array.isArray,
      createTask = console.createTask
        ? console.createTask
        : function () {
            return null;
          };
    React = {
      react_stack_bottom_frame: function (callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = function (type, config, maybeKey, source, self) {
      var trackActualOwner =
        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        !1,
        source,
        self,
        trackActualOwner
          ? Error("react-stack-top-frame")
          : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    exports.jsxs = function (type, config, maybeKey, source, self) {
      var trackActualOwner =
        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        !0,
        source,
        self,
        trackActualOwner
          ? Error("react-stack-top-frame")
          : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  })();


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./src/components/Button/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Button/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.ts");
/* harmony import */ var _styles_vars__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/vars */ "./src/styles/vars.ts");


// import Icon from 'components/Icon';



const Button = (props) => {
    const { name, iconName, onPress, disabled = false, children, type = 'default', shape = 'default-shape', title, style, accent = _styles_vars__WEBPACK_IMPORTED_MODULE_4__.COLORS.primary, accentDark, accentLight = _styles_vars__WEBPACK_IMPORTED_MODULE_4__.COLORS.primaryLight, elevation = 0, borderRadius } = props;
    const borderRadius_ = (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.getBorderRadius)(borderRadius);
    const boxShadow_ = (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.getBoxElevation)(elevation);
    const styles = {
        component: {
            padding: 5,
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
            height: 20,
            minWidth: 15,
            borderRadius: borderRadius_,
            boxShadow: boxShadow_[0],
            boxSizing: 'border-box',
        }
    };
    if (type == "default") {
        styles.component = { ...styles.component,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: accent
        };
    }
    else if (type == "primary") {
        // [TODO]
    }
    else if (type == "text") {
        // [TODO]
    }
    const [isHovered, setIsHovered] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const componentStyle = ({ pressed }) => {
        return [
            styles.component,
            {
                backgroundColor: isHovered ? accent : (pressed ? accent : 'white'),
            },
        ];
    };
    // let btnClass = `prismal-btn btn-${type} btn-${shape}`; 
    // if ( className ) btnClass = `${btnClass} ${className}`;
    // if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    // else if ( elevation ) btnClass = `${btnClass} btn-elevated`;
    // else btnClass = `${btnClass} btn-anim`;
    // let style_: {[key: string]: any} = {};
    // setAccentStyle(style_, {accent, accentLight, accentDark});
    // setBorderRadius(style_, borderRadius);
    // setBoxElevation(style_, elevation);
    // // Merge and override with provided style
    // style_ = {...style_, ...style};
    if (style)
        Object.assign(styles.component, style);
    const title_ = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        if (title) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.Text, { children: title });
        }
        else
            return null;
    }, [title]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.Pressable, { onPress: onPress, onHoverIn: () => setIsHovered(true), onHoverOut: () => setIsHovered(false), style: componentStyle, children: title_ || children });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ "./src/components/Card/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Card/index.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");



// import { setAccentStyle } from '../../utils/colors';

const Card = (props) => {
    const { header, headerStyle, footer, footerStyle, accent, accentDark, accentLight, children, bodyStyle, padding = "s", orientation = "column", style, elevation = 1, borderRadius = "small" } = props;
    const boxElevation = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getBoxElevation)(elevation);
    const borderRadius_ = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getBorderRadius)(borderRadius);
    const boxPadding = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getPadding)(padding);
    const styles = {
        component: {
            display: "flex",
            flexDirection: orientation,
            backgroundColor: "white",
            boxShadow: boxElevation[0],
            borderRadius: borderRadius_,
            overflow: "hidden",
            padding: boxPadding,
        },
        body: {
            padding: 5,
            flex: 1
        },
        header: {},
        footer: {},
    };
    if (style)
        Object.assign(styles.component, style);
    // let style: {[key: string]: any} = setAccentStyle({}, {accent, accentLight, accentDark});
    const header_ = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        if (headerStyle)
            Object.assign(styles.header, headerStyle);
        if (header) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.header, children: header });
        }
        else
            return null;
    }, [header, styles.header]);
    const footer_ = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        if (footerStyle)
            Object.assign(styles.footer, footerStyle);
        if (footer) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.footer, children: footer });
        }
        else
            return null;
    }, [footer, styles.footer]);
    const body = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        if (bodyStyle)
            Object.assign(styles.body, bodyStyle);
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.body, children: children });
    }, [children, bodyStyle]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.component, children: [header_, body, footer_] });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ "./src/components/Tabs/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Tabs/index.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles */ "./src/components/Tabs/styles.ts");


// import {setAccentStyle, getBorderRadius} from "../../utils"
// import Icon from "../Icon";


const Tab = (props) => {
    const { name, label, iconName, disabled, selected, style } = props;
    // let tabClass = "prismal-tab";
    // if (className) tabClass = `${tabClass} ${className}`;
    // if (disabled) tabClass = `${tabClass} disabled`;
    // if (selected) tabClass = `${tabClass} selected`;
    let tabStyle = _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tab;
    if (selected) {
        tabStyle = Object.assign({ ...tabStyle }, _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabSelected);
    }
    if (style)
        tabStyle = Object.assign({ ...tabStyle }, style);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { "data-key": name, style: tabStyle, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.Text, { children: label }) });
};
const defaultRenderer = (tab, index, isSelected) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Tab, { selected: isSelected, ...tab });
const TabContainer = (props) => {
    const { tabRenderer, index, isSelected, config, setSelected } = props;
    const tab = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        return tabRenderer(config, index, isSelected, setSelected);
    }, [isSelected, tabRenderer, config, index]);
    // let tabContainerClass = `prismal-tab-container`;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.TouchableHighlight, { onPress: () => setSelected(config.name), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabContainer, children: tab }) });
};
// TODO: Consider accepting children prop that represent tabs
const Tabs = react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef((props, ref) => {
    const { data, tabRenderer = defaultRenderer, 
    // className, tabClass, tabsClass, tabContentClass,
    accent, accentDark, accentLight, style, 
    // borderRadius, elevation,
    children, content, contentRenderer } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(data.find(t => t.default)?.name ||
        (data.length > 0) ? data[0].name : undefined);
    react__WEBPACK_IMPORTED_MODULE_1___default().useImperativeHandle(ref, () => ({ name: selected }), [selected]);
    // let tabsClass_ = "prismal-tabs";
    // if (tabsClass) tabsClass_ = `${tabsClass_} ${tabsClass}`;
    // let className_ = "prismal-tabs-container";
    // if (className) className_ = `${className_} ${className}`;
    // let tabContentClass_ = "prismal-tab-content";
    // if (tabContentClass) tabContentClass_ = `${tabContentClass_} ${tabContentClass}`;
    const tabs = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        return data.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabContainer, { index: index, isSelected: isSelected, setSelected: setSelected, config: tabConfig, style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tab, tabRenderer: tabRenderer }, tabConfig.name);
        });
    }, [data, selected, tabRenderer, setSelected]);
    const tabContent = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        let component;
        if (selected && children) {
            component = children.find((el) => {
                return el.props["data-tab"] == selected;
            });
        }
        else if (selected && contentRenderer) {
            component = contentRenderer(selected);
        }
        else if (selected && content) {
            const selectedContent = content[selected];
            // TODO: Consider adding a fallback content
            component = selectedContent;
        }
        if (component) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabContent, children: component });
        }
        else {
            return null;
        }
    }, [selected, content, children, contentRenderer]);
    /*
    const style: { [key: string]: any } = React.useMemo(() => {
        let _style: { [key: string]: any } = {}
        // _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        // _style = getBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark]);
    */
    let tabContainerStyle = _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabsContainer;
    if (style)
        tabContainerStyle = Object.assign({ ...tabContainerStyle }, style);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabContainer, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabs, children: tabs }), tabContent] });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);


/***/ }),

/***/ "./src/components/Tabs/styles.ts":
/*!***************************************!*\
  !*** ./src/components/Tabs/styles.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_vars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/vars */ "./src/styles/vars.ts");

 // Adjust the import path
const styles = react_native__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
    // .prismal-tabs-container
    tabsContainer: {
    // This is a top-level container, no style in the original was applied directly here, but we may need one
    },
    // .prismal-tabs
    tabs: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.COLORS.light,
        gap: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.gap,
        justifyContent: 'space-evenly',
        // The web has 'overflow-x: auto' which on mobile is a ScrollView
        // The 'overflow-y: clip' is default behavior in RN's View
        borderRadius: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.borderRadius,
        // RN doesn't support 'font-family' directly without linking a custom font
        // font-family: vars.$font-body;
    },
    // To replicate the `::after` pseudo-element for the bottom line
    // We'll create a separate style object for a dedicated View component.
    tabsBottomLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.COLORS.grey,
    },
    // .prismal-tab-container
    tabContainer: {
        flex: 1,
        position: 'relative',
    },
    // .prismal-tab
    tab: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.minTabWidth,
        height: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.tabHeight,
        borderRadius: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.borderRadius,
        color: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.COLORS.dark, // Color for the Text component
        // 'cursor: pointer' is a web-specific property. In RN, you would use a TouchableOpacity
    },
    // &.selected { ... }
    tabSelected: {
        color: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.COLORS.primary,
        fontWeight: 'bold',
    },
    // &.selected::after { ... }
    // We need a separate component for this, positioned absolutely inside the tab
    selectedIndicator: {
        position: 'absolute',
        bottom: 0,
        width: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.selectedIndicatorWidth,
        height: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.selectedIndicatorHeight,
        backgroundColor: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.COLORS.primary,
        // To center the indicator, you need to use `alignSelf: 'center'`
        alignSelf: 'center',
    },
    // .prismal-tab-content
    tabContent: {
        padding: _styles_vars__WEBPACK_IMPORTED_MODULE_1__.SIZES.padding, // 1rem becomes a dp value
    },
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ "./src/styles/vars.ts":
/*!****************************!*\
  !*** ./src/styles/vars.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLORS: () => (/* binding */ COLORS),
/* harmony export */   SIZES: () => (/* binding */ SIZES)
/* harmony export */ });
// theme.js
const COLORS = {
    light: '#FFFFFF',
    dark: '#333333',
    primary: '#007BFF',
    primaryLight: '#7fbdff',
    grey: 'grey',
};
const SIZES = {
    // Border radius, converted from a CSS variable
    borderRadius: 8,
    // Rem values converted to dp (e.g., 1rem ≈ 16dp)
    gap: 16,
    minTabWidth: 96,
    tabHeight: 40,
    borderWidth: 1,
    selectedIndicatorWidth: 64,
    selectedIndicatorHeight: 3,
    padding: 16,
};


/***/ }),

/***/ "./src/utils/colors/index.ts":
/*!***********************************!*\
  !*** ./src/utils/colors/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accentStyle: () => (/* binding */ accentStyle),
/* harmony export */   hex2rgba: () => (/* binding */ hex2rgba),
/* harmony export */   setAccentStyle: () => (/* binding */ setAccentStyle)
/* harmony export */ });
const setAccentStyle = (style, conf) => {
    return Object.assign(style, accentStyle(conf));
};
const accentStyle = (conf) => {
    const { accent, accentLight, accentDark } = conf;
    let style = {};
    if (accent) {
        style['--color-primary'] = accent;
        // style['--color-primary-light'] = lighten(accent, 0.15);
        // style['--color-primary-dark'] = darken(accent, 0.15)
    }
    if (accentLight) {
        style['--color-primary-light'] = accentLight;
    }
    if (accentDark) {
        style['--color-primary-dark'] = accentDark;
    }
    return style;
};
/**
 * Takes a 3 or 6-digit hex color code,
 * and an optional loating-point number representing the alpha value (0-1)
*/
const hex2rgba = (hex, alpha) => {
    if (hex[0] !== '#')
        return undefined;
    const stringValues = (hex.length === 4)
        ? [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)].map(n => `${n}${n}`)
        : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
    const intValues = stringValues.map(n => parseInt(n, 16));
    return (typeof alpha === 'number' && alpha >= 0 && alpha <= 1)
        ? `rgba(${intValues.join(', ')}, ${alpha})`
        : `rgb(${intValues.join(', ')})`;
};



/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accentStyle: () => (/* reexport safe */ _colors__WEBPACK_IMPORTED_MODULE_0__.accentStyle),
/* harmony export */   getBorderRadius: () => (/* binding */ getBorderRadius),
/* harmony export */   getBoxElevation: () => (/* binding */ getBoxElevation),
/* harmony export */   getPadding: () => (/* binding */ getPadding),
/* harmony export */   hex2rgba: () => (/* reexport safe */ _colors__WEBPACK_IMPORTED_MODULE_0__.hex2rgba),
/* harmony export */   setAccentStyle: () => (/* reexport safe */ _colors__WEBPACK_IMPORTED_MODULE_0__.setAccentStyle),
/* harmony export */   setElevation: () => (/* binding */ setElevation)
/* harmony export */ });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/utils/colors/index.ts");

const setElevation = (className, elevation = 0) => {
    let _className = `${className}  elevation-${elevation < 6 ? elevation : 5}`;
    return _className;
};
const getBoxElevation = (elevation = 0) => {
    let boxShadowPrimary = "0", boxShadowSecondary = "0";
    switch (elevation) {
        case 0:
            boxShadowPrimary = "0";
            boxShadowSecondary = "0";
            break;
        case 1:
            boxShadowPrimary = "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px";
            boxShadowSecondary = "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
            break;
        case 2:
            boxShadowPrimary = "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
            boxShadowSecondary = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px";
            break;
        case 3:
            boxShadowPrimary = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px";
            boxShadowSecondary = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px";
            break;
        case 4:
            boxShadowPrimary = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px";
            boxShadowSecondary = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";
            break;
        // case 5:
        //    boxShadowPrimary = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
        //    break;
        default:
            boxShadowPrimary = "0";
    }
    return [boxShadowPrimary, boxShadowSecondary];
};
const getPadding = (padding) => {
    let padding_ = 0.25;
    switch (padding) {
        case "xs":
            padding_ = 0.25;
            break;
        case "s":
            padding_ = 0.5;
            break;
        case "m":
            padding_ = 0.75;
            break;
        case "l":
            padding_ = 1;
            break;
        default:
            padding_ = 0.25;
    }
    return padding_;
};
const getBorderRadius = (borderRadius = "extra-small") => {
    let _borderRadius;
    switch (borderRadius) {
        case "none":
            _borderRadius = "0";
            break;
        case "extra-small":
            _borderRadius = ".25rem";
            break;
        case "small":
            _borderRadius = ".5rem";
            break;
        case "medium":
            _borderRadius = ".5rem";
            break;
        case "large":
            _borderRadius = ".75rem";
            break;
        case "extra-large":
            _borderRadius = "1rem";
            break;
        case "full":
            _borderRadius = "2.5rem";
            break;
    }
    return _borderRadius;
};


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-native":
/*!*******************************!*\
  !*** external "react-native" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-native");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* reexport safe */ _components_Button__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Card: () => (/* reexport safe */ _components_Card__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Tabs: () => (/* reexport safe */ _components_Tabs__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Card */ "./src/components/Card/index.tsx");
/* harmony import */ var _components_Tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Tabs */ "./src/components/Tabs/index.tsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Button */ "./src/components/Button/index.tsx");
// import Button from "./components/Button";





})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });

//# sourceMappingURL=index.js.map