import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE_react_native_12525679__ from "react-native";
/******/ var __webpack_modules__ = ({

/***/ "../../node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "../../node_modules/react/jsx-runtime.js":
/*!***********************************************!*\
  !*** ../../node_modules/react/jsx-runtime.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "../../node_modules/react/cjs/react-jsx-runtime.development.js");
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
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
    const [isHovered, setIsHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
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
    const title_ = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
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
    const header_ = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        if (headerStyle)
            Object.assign(styles.header, headerStyle);
        if (header) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.header, children: header });
        }
        else
            return null;
    }, [header, styles.header]);
    const footer_ = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        if (footerStyle)
            Object.assign(styles.footer, footerStyle);
        if (footer) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: styles.footer, children: footer });
        }
        else
            return null;
    }, [footer, styles.footer]);
    const body = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ "react-native");
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
    const tab = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return tabRenderer(config, index, isSelected, setSelected);
    }, [isSelected, tabRenderer, config, index]);
    // let tabContainerClass = `prismal-tab-container`;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.TouchableHighlight, { onPress: () => setSelected(config.name), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_2__.View, { style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tabContainer, children: tab }) });
};
// TODO: Consider accepting children prop that represent tabs
const Tabs = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
    const { data, tabRenderer = defaultRenderer, 
    // className, tabClass, tabsClass, tabContentClass,
    accent, accentDark, accentLight, style, 
    // borderRadius, elevation,
    children, content, contentRenderer } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data.find(t => t.default)?.name ||
        (data.length > 0) ? data[0].name : undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({ name: selected }), [selected]);
    // let tabsClass_ = "prismal-tabs";
    // if (tabsClass) tabsClass_ = `${tabsClass_} ${tabsClass}`;
    // let className_ = "prismal-tabs-container";
    // if (className) className_ = `${className_} ${className}`;
    // let tabContentClass_ = "prismal-tab-content";
    // if (tabContentClass) tabContentClass_ = `${tabContentClass_} ${tabContentClass}`;
    const tabs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return data.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabContainer, { index: index, isSelected: isSelected, setSelected: setSelected, config: tabConfig, style: _styles__WEBPACK_IMPORTED_MODULE_3__["default"].tab, tabRenderer: tabRenderer }, tabConfig.name);
        });
    }, [data, selected, tabRenderer, setSelected]);
    const tabContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
    const style: { [key: string]: any } = useMemo(() => {
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

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-native":
/*!*******************************!*\
  !*** external "react-native" ***!
  \*******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_native_12525679__;

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

const __webpack_exports__Button = __webpack_exports__.Button;
const __webpack_exports__Card = __webpack_exports__.Card;
const __webpack_exports__Tabs = __webpack_exports__.Tabs;
export { __webpack_exports__Button as Button, __webpack_exports__Card as Card, __webpack_exports__Tabs as Tabs };

//# sourceMappingURL=index.js.map