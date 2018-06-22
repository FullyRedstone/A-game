;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// build script for generating processing.js

var Browser = {
  isDomPresent: true,
  navigator: navigator,
  window: window,
  document: document,
  ajax: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain");
    }
    xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");
    xhr.send(null);
    // failed request?
    if (xhr.status !== 200 && xhr.status !== 0) { throw ("XMLHttpRequest failed, status code " + xhr.status); }
    return xhr.responseText;
  }
};

window.Processing = require('./src/')(Browser);

},{"./src/":27}],2:[function(require,module,exports){
module.exports={
  "name": "Processing.js",
  "version": "1.4.8",
  "dependencies": {
    "argv": "~0.0.2",
    "browserify": "~2.18.1",
    "express": "~3.3.3",
    "node-minify": "~0.7.3",
    "nunjucks": "~0.1.9",
    "open": "0.0.3"
  },
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-cli": "~0.1.8",
    "grunt-contrib-jshint": "~0.4.3"
  }
}

},{}],3:[function(require,module,exports){
/**
* A ObjectIterator is an iterator wrapper for objects. If passed object contains
* the iterator method, the object instance will be replaced by the result returned by
* this method call. If passed object is an array, the ObjectIterator instance iterates
* through its items.
*
* @param {Object} obj The object to be iterated.
*/
module.exports = function ObjectIterator(obj) {
  if (obj instanceof Array) {
    // iterate through array items
    var index = -1;
    this.hasNext = function() {
      return ++index < obj.length;
    };
    this.next = function() {
      return obj[index];
    };
  } else if (obj.iterator instanceof Function) {
    return obj.iterator();
  } else {
    throw "Unable to iterate: " + obj;
  }
};

},{}],4:[function(require,module,exports){
/**
 * Processing.js environment constants
 */
module.exports = {
    X: 0,
    Y: 1,
    Z: 2,

    R: 3,
    G: 4,
    B: 5,
    A: 6,

    U: 7,
    V: 8,

    NX: 9,
    NY: 10,
    NZ: 11,

    EDGE: 12,

    // Stroke
    SR: 13,
    SG: 14,
    SB: 15,
    SA: 16,

    SW: 17,

    // Transformations (2D and 3D)
    TX: 18,
    TY: 19,
    TZ: 20,

    VX: 21,
    VY: 22,
    VZ: 23,
    VW: 24,

    // Material properties
    AR: 25,
    AG: 26,
    AB: 27,

    DR: 3,
    DG: 4,
    DB: 5,
    DA: 6,

    SPR: 28,
    SPG: 29,
    SPB: 30,

    SHINE: 31,

    ER: 32,
    EG: 33,
    EB: 34,

    BEEN_LIT: 35,

    VERTEX_FIELD_COUNT: 36,

    // Renderers
    P2D:    1,
    JAVA2D: 1,
    WEBGL:  2,
    P3D:    2,
    OPENGL: 2,
    PDF:    0,
    DXF:    0,

    // Platform IDs
    OTHER:   0,
    WINDOWS: 1,
    MAXOSX:  2,
    LINUX:   3,

    EPSILON: 0.0001,

    MAX_FLOAT:  3.4028235e+38,
    MIN_FLOAT: -3.4028235e+38,
    MAX_INT:    2147483647,
    MIN_INT:   -2147483648,

    PI:         Math.PI,
    TWO_PI:     2 * Math.PI,
    TAU:        2 * Math.PI,
    HALF_PI:    Math.PI / 2,
    THIRD_PI:   Math.PI / 3,
    QUARTER_PI: Math.PI / 4,

    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,

    WHITESPACE: " \t\n\r\f\u00A0",

    // Color modes
    RGB:   1,
    ARGB:  2,
    HSB:   3,
    ALPHA: 4,
    CMYK:  5,

    // Image file types
    TIFF:  0,
    TARGA: 1,
    JPEG:  2,
    GIF:   3,

    // Filter/convert types
    BLUR:      11,
    GRAY:      12,
    INVERT:    13,
    OPAQUE:    14,
    POSTERIZE: 15,
    THRESHOLD: 16,
    ERODE:     17,
    DILATE:    18,

    // Blend modes
    REPLACE:    0,
    BLEND:      1 << 0,
    ADD:        1 << 1,
    SUBTRACT:   1 << 2,
    LIGHTEST:   1 << 3,
    DARKEST:    1 << 4,
    DIFFERENCE: 1 << 5,
    EXCLUSION:  1 << 6,
    MULTIPLY:   1 << 7,
    SCREEN:     1 << 8,
    OVERLAY:    1 << 9,
    HARD_LIGHT: 1 << 10,
    SOFT_LIGHT: 1 << 11,
    DODGE:      1 << 12,
    BURN:       1 << 13,

    // Color component bit masks
    ALPHA_MASK: 0xff000000,
    RED_MASK:   0x00ff0000,
    GREEN_MASK: 0x0000ff00,
    BLUE_MASK:  0x000000ff,

    // Projection matrices
    CUSTOM:       0,
    ORTHOGRAPHIC: 2,
    PERSPECTIVE:  3,

    // Shapes
    POINT:          2,
    POINTS:         2,
    LINE:           4,
    LINES:          4,
    TRIANGLE:       8,
    TRIANGLES:      9,
    TRIANGLE_STRIP: 10,
    TRIANGLE_FAN:   11,
    QUAD:           16,
    QUADS:          16,
    QUAD_STRIP:     17,
    POLYGON:        20,
    PATH:           21,
    RECT:           30,
    ELLIPSE:        31,
    ARC:            32,
    SPHERE:         40,
    BOX:            41,

    GROUP:          0,
    PRIMITIVE:      1,
    //PATH:         21, // shared with Shape PATH
    GEOMETRY:       3,

    // Shape Vertex
    VERTEX:        0,
    BEZIER_VERTEX: 1,
    CURVE_VERTEX:  2,
    BREAK:         3,
    CLOSESHAPE:    4,

    // Shape closing modes
    OPEN:  1,
    CLOSE: 2,

    // Shape drawing modes
    CORNER:          0, // Draw mode convention to use (x, y) to (width, height)
    CORNERS:         1, // Draw mode convention to use (x1, y1) to (x2, y2) coordinates
    RADIUS:          2, // Draw mode from the center, and using the radius
    CENTER_RADIUS:   2, // Deprecated! Use RADIUS instead
    CENTER:          3, // Draw from the center, using second pair of values as the diameter
    DIAMETER:        3, // Synonym for the CENTER constant. Draw from the center
    CENTER_DIAMETER: 3, // Deprecated! Use DIAMETER instead

    // Text vertical alignment modes
    BASELINE: 0,   // Default vertical alignment for text placement
    TOP:      101, // Align text to the top
    BOTTOM:   102, // Align text from the bottom, using the baseline

    // UV Texture coordinate modes
    NORMAL:     1,
    NORMALIZED: 1,
    IMAGE:      2,

    // Text placement modes
    MODEL: 4,
    SHAPE: 5,

    // Stroke modes
    SQUARE:  'butt',
    ROUND:   'round',
    PROJECT: 'square',
    MITER:   'miter',
    BEVEL:   'bevel',

    // Lighting modes
    AMBIENT:     0,
    DIRECTIONAL: 1,
    //POINT:     2, Shared with Shape constant
    SPOT:        3,

    // Key constants

    // Both key and keyCode will be equal to these values
    BACKSPACE: 8,
    TAB:       9,
    ENTER:     10,
    RETURN:    13,
    ESC:       27,
    DELETE:    127,
    CODED:     0xffff,

    // p.key will be CODED and p.keyCode will be this value
    SHIFT:     16,
    CONTROL:   17,
    ALT:       18,
    CAPSLK:    20,
    PGUP:      33,
    PGDN:      34,
    END:       35,
    HOME:      36,
    LEFT:      37,
    UP:        38,
    RIGHT:     39,
    DOWN:      40,
    F1:        112,
    F2:        113,
    F3:        114,
    F4:        115,
    F5:        116,
    F6:        117,
    F7:        118,
    F8:        119,
    F9:        120,
    F10:       121,
    F11:       122,
    F12:       123,
    NUMLK:     144,
    META:      157,
    INSERT:    155,

    // Cursor types
    ARROW:    'default',
    CROSS:    'crosshair',
    HAND:     'pointer',
    MOVE:     'move',
    TEXT:     'text',
    WAIT:     'wait',
    NOCURSOR: "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",

    // Hints
    DISABLE_OPENGL_2X_SMOOTH:     1,
    ENABLE_OPENGL_2X_SMOOTH:     -1,
    ENABLE_OPENGL_4X_SMOOTH:      2,
    ENABLE_NATIVE_FONTS:          3,
    DISABLE_DEPTH_TEST:           4,
    ENABLE_DEPTH_TEST:           -4,
    ENABLE_DEPTH_SORT:            5,
    DISABLE_DEPTH_SORT:          -5,
    DISABLE_OPENGL_ERROR_REPORT:  6,
    ENABLE_OPENGL_ERROR_REPORT:  -6,
    ENABLE_ACCURATE_TEXTURES:     7,
    DISABLE_ACCURATE_TEXTURES:   -7,
    HINT_COUNT:                  10,

    // PJS defined constants
    SINCOS_LENGTH:      720,       // every half degree
    PRECISIONB:         15,        // fixed point precision is limited to 15 bits!!
    PRECISIONF:         1 << 15,
    PREC_MAXVAL:        (1 << 15) - 1,
    PREC_ALPHA_SHIFT:   24 - 15,
    PREC_RED_SHIFT:     16 - 15,
    NORMAL_MODE_AUTO:   0,
    NORMAL_MODE_SHAPE:  1,
    NORMAL_MODE_VERTEX: 2,
    MAX_LIGHTS:         8
};

},{}],5:[function(require,module,exports){
/**
 * Processing.js default scope
 */
module.exports = function(options) {

  // Building defaultScope. Changing of the prototype protects
  // internal Processing code from the changes in defaultScope
  function DefaultScope() {}
  DefaultScope.prototype = options.PConstants;

  var defaultScope = new DefaultScope();

  // copy over all known Object types and helper objects
  Object.keys(options).forEach(function(prop) {
    defaultScope[prop] = options[prop];
  });

  ////////////////////////////////////////////////////////////////////////////
  // Class inheritance helper methods
  ////////////////////////////////////////////////////////////////////////////

  defaultScope.defineProperty = function(obj, name, desc) {
    if("defineProperty" in Object) {
      Object.defineProperty(obj, name, desc);
    } else {
      if (desc.hasOwnProperty("get")) {
        obj.__defineGetter__(name, desc.get);
      }
      if (desc.hasOwnProperty("set")) {
        obj.__defineSetter__(name, desc.set);
      }
    }
  };

  /**
   * class overloading, part 1
   */
  function overloadBaseClassFunction(object, name, basefn) {
    if (!object.hasOwnProperty(name) || typeof object[name] !== 'function') {
      // object method is not a function or just inherited from Object.prototype
      object[name] = basefn;
      return;
    }
    var fn = object[name];
    if ("$overloads" in fn) {
      // the object method already overloaded (see defaultScope.addMethod)
      // let's just change a fallback method
      fn.$defaultOverload = basefn;
      return;
    }
    if (!("$overloads" in basefn) && fn.length === basefn.length) {
      // special case when we just overriding the method
      return;
    }
    var overloads, defaultOverload;
    if ("$overloads" in basefn) {
      // let's inherit base class overloads to speed up things
      overloads = basefn.$overloads.slice(0);
      overloads[fn.length] = fn;
      defaultOverload = basefn.$defaultOverload;
    } else {
      overloads = [];
      overloads[basefn.length] = basefn;
      overloads[fn.length] = fn;
      defaultOverload = fn;
    }
    var hubfn = function() {
      var fn = hubfn.$overloads[arguments.length] ||
               ("$methodArgsIndex" in hubfn && arguments.length > hubfn.$methodArgsIndex ?
               hubfn.$overloads[hubfn.$methodArgsIndex] : null) ||
               hubfn.$defaultOverload;
      return fn.apply(this, arguments);
    };
    hubfn.$overloads = overloads;
    if ("$methodArgsIndex" in basefn) {
      hubfn.$methodArgsIndex = basefn.$methodArgsIndex;
    }
    hubfn.$defaultOverload = defaultOverload;
    hubfn.name = name;
    object[name] = hubfn;
  }

  /**
   * class overloading, part 2
   */

  function extendClass(subClass, baseClass) {
    function extendGetterSetter(propertyName) {
      defaultScope.defineProperty(subClass, propertyName, {
        get: function() {
          return baseClass[propertyName];
        },
        set: function(v) {
          baseClass[propertyName]=v;
        },
        enumerable: true
      });
    }

    var properties = [];
    for (var propertyName in baseClass) {
      if (typeof baseClass[propertyName] === 'function') {
        overloadBaseClassFunction(subClass, propertyName, baseClass[propertyName]);
      } else if(propertyName.charAt(0) !== "$" && !(propertyName in subClass)) {
        // Delaying the properties extension due to the IE9 bug (see #918).
        properties.push(propertyName);
      }
    }
    while (properties.length > 0) {
      extendGetterSetter(properties.shift());
    }

    subClass.$super = baseClass;
  }

  /**
   * class overloading, part 3
   */
  defaultScope.extendClassChain = function(base) {
    var path = [base];
    for (var self = base.$upcast; self; self = self.$upcast) {
      extendClass(self, base);
      path.push(self);
      base = self;
    }
    while (path.length > 0) {
      path.pop().$self=base;
    }
  };

  // static
  defaultScope.extendStaticMembers = function(derived, base) {
    extendClass(derived, base);
  };

  // interface
  defaultScope.extendInterfaceMembers = function(derived, base) {
    extendClass(derived, base);
  };

  /**
   * Java methods and JavaScript functions differ enough that
   * we need a special function to make sure it all links up
   * as classical hierarchical class chains.
   */
  defaultScope.addMethod = function(object, name, fn, hasMethodArgs) {
    var existingfn = object[name];
    if (existingfn || hasMethodArgs) {
      var args = fn.length;
      // builds the overload methods table
      if ("$overloads" in existingfn) {
        existingfn.$overloads[args] = fn;
      } else {
        var hubfn = function() {
          var fn = hubfn.$overloads[arguments.length] ||
                   ("$methodArgsIndex" in hubfn && arguments.length > hubfn.$methodArgsIndex ?
                   hubfn.$overloads[hubfn.$methodArgsIndex] : null) ||
                   hubfn.$defaultOverload;
          return fn.apply(this, arguments);
        };
        var overloads = [];
        if (existingfn) {
          overloads[existingfn.length] = existingfn;
        }
        overloads[args] = fn;
        hubfn.$overloads = overloads;
        hubfn.$defaultOverload = existingfn || fn;
        if (hasMethodArgs) {
          hubfn.$methodArgsIndex = args;
        }
        hubfn.name = name;
        object[name] = hubfn;
      }
    } else {
      object[name] = fn;
    }
  };

  // internal helper function
  function isNumericalJavaType(type) {
    if (typeof type !== "string") {
      return false;
    }
    return ["byte", "int", "char", "color", "float", "long", "double"].indexOf(type) !== -1;
  }

  /**
   * Java's arrays are pre-filled when declared with
   * an initial size, but no content. JS arrays are not.
   */
  defaultScope.createJavaArray = function(type, bounds) {
    var result = null,
        defaultValue = null;
    if (typeof type === "string") {
      if (type === "boolean") {
        defaultValue = false;
      } else if (isNumericalJavaType(type)) {
        defaultValue = 0;
      }
    }
    if (typeof bounds[0] === 'number') {
      var itemsCount = 0 | bounds[0];
      if (bounds.length <= 1) {
        result = [];
        result.length = itemsCount;
        for (var i = 0; i < itemsCount; ++i) {
          result[i] = defaultValue;
        }
      } else {
        result = [];
        var newBounds = bounds.slice(1);
        for (var j = 0; j < itemsCount; ++j) {
          result.push(defaultScope.createJavaArray(type, newBounds));
        }
      }
    }
    return result;
  };

  // screenWidth and screenHeight are shared by all instances.
  // and return the width/height of the browser's viewport.
  defaultScope.defineProperty(defaultScope, 'screenWidth',
    { get: function() { return window.innerWidth; } });

  defaultScope.defineProperty(defaultScope, 'screenHeight',
    { get: function() { return window.innerHeight; } });

  return defaultScope;
};

},{}],6:[function(require,module,exports){
/**
 * Finalise the Processing.js object.
 */
module.exports = function finalizeProcessing(Processing, options) {

  // unpack options
  var window = options.window,
      document = options.document,
      XMLHttpRequest = window.XMLHttpRequest,
      noop = options.noop,
      isDOMPresent = options.isDOMPresent,
      version = options.version,
      undef;

  // versioning
  Processing.version = (version ? version : "@DEV-VERSION@");

  // Share lib space
  Processing.lib = {};

  /**
   * External libraries can be added to the global Processing
   * objects with the `registerLibrary` function.
   */
  Processing.registerLibrary = function(name, library) {
    Processing.lib[name] = library;
    if(library.hasOwnProperty("init")) {
      library.init(defaultScope);
    }
  };

  /**
   * This is the object that acts as our version of PApplet.
   * This can be called as Processing.Sketch() or as
   * Processing.Sketch(function) in which case the function
   * must be an already-compiled-to-JS sketch function.
   */
  Processing.Sketch = function(attachFunction) {
    this.attachFunction = attachFunction;
    this.options = {
      pauseOnBlur: false,
      globalKeyEvents: false
    };

    /* Optional Sketch event hooks:
     *   onLoad       - parsing/preloading is done, before sketch starts
     *   onSetup      - setup() has been called, before first draw()
     *   onPause      - noLoop() has been called, pausing draw loop
     *   onLoop       - loop() has been called, resuming draw loop
     *   onFrameStart - draw() loop about to begin
     *   onFrameEnd   - draw() loop finished
     *   onExit       - exit() done being called
     */
    this.onLoad = noop;
    this.onSetup = noop;
    this.onPause = noop;
    this.onLoop = noop;
    this.onFrameStart = noop;
    this.onFrameEnd = noop;
    this.onExit = noop;

    this.params = {};
    this.imageCache = {
      pending: 0,
      images: {},
      // Opera requires special administration for preloading
      operaCache: {},
      // Specify an optional img arg if the image is already loaded in the DOM,
      // otherwise href will get loaded.
      add: function(href, img) {
        // Prevent muliple loads for an image, in case it gets
        // preloaded more than once, or is added via JS and then preloaded.
        if (this.images[href]) {
          return;
        }

        if (!isDOMPresent) {
          this.images[href] = null;
        }

        // No image in the DOM, kick-off a background load
        if (!img) {
          img = new Image();
          img.onload = (function(owner) {
            return function() {
              owner.pending--;
            };
          }(this));
          this.pending++;
          img.src = href;
        }

        this.images[href] = img;

        // Opera will not load images until they are inserted into the DOM.
        if (window.opera) {
          var div = document.createElement("div");
          div.appendChild(img);
          // we can't use "display: none", since that makes it invisible, and thus not load
          div.style.position = "absolute";
          div.style.opacity = 0;
          div.style.width = "1px";
          div.style.height= "1px";
          if (!this.operaCache[href]) {
            document.body.appendChild(div);
            this.operaCache[href] = div;
          }
        }
      }
    };

    this.sourceCode = undefined;
    this.attach = function(processing) {
      // either attachFunction or sourceCode must be present on attach
      if(typeof this.attachFunction === "function") {
        this.attachFunction(processing);
      } else if(this.sourceCode) {
        var func = ((new Function("return (" + this.sourceCode + ");"))());
        func(processing);
        this.attachFunction = func;
      } else {
        throw "Unable to attach sketch to the processing instance";
      }
    };

    this.toString = function() {
      var i;
      var code = "((function(Sketch) {\n";
      code += "var sketch = new Sketch(\n" + this.sourceCode + ");\n";
      for(i in this.options) {
        if(this.options.hasOwnProperty(i)) {
          var value = this.options[i];
          code += "sketch.options." + i + " = " +
            (typeof value === 'string' ? '\"' + value + '\"' : "" + value) + ";\n";
        }
      }
      for(i in this.imageCache) {
        if(this.options.hasOwnProperty(i)) {
          code += "sketch.imageCache.add(\"" + i + "\");\n";
        }
      }
      // TODO serialize fonts
      code += "return sketch;\n})(Processing.Sketch))";
      return code;
    };
  };

  /**
   * aggregate all source code into a single file, then rewrite that
   * source and bind to canvas via new Processing(canvas, sourcestring).
   * @param {CANVAS} canvas The html canvas element to bind to
   * @param {String[]} source The array of files that must be loaded
   */
  var loadSketchFromSources = Processing.loadSketchFromSources = function(canvas, sources) {
    var code = [], errors = [], sourcesCount = sources.length, loaded = 0;

    function ajaxAsync(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var error;
          if (xhr.status !== 200 && xhr.status !== 0) {
            error = "Invalid XHR status " + xhr.status;
          } else if (xhr.responseText === "") {
            // Give a hint when loading fails due to same-origin issues on file:/// urls
            if ( ("withCredentials" in new XMLHttpRequest()) &&
                 (new XMLHttpRequest()).withCredentials === false &&
                 window.location.protocol === "file:" ) {
              error = "XMLHttpRequest failure, possibly due to a same-origin policy violation. You can try loading this page in another browser, or load it from http://localhost using a local webserver. See the Processing.js README for a more detailed explanation of this problem and solutions.";
            } else {
              error = "File is empty.";
            }
          }

          callback(xhr.responseText, error);
        }
      };
      xhr.open("GET", url, true);
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType("application/json");
      }
      xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT"); // no cache
      xhr.send(null);
    }

    function loadBlock(index, filename) {
      function callback(block, error) {
        code[index] = block;
        ++loaded;
        if (error) {
          errors.push(filename + " ==> " + error);
        }
        if (loaded === sourcesCount) {
          if (errors.length === 0) {
            try {
              return new Processing(canvas, code.join("\n"));
            } catch(e) {
              console.log("Processing.js: Unable to execute pjs sketch.");
              throw e;
            }
          } else {
            throw "Processing.js: Unable to load pjs sketch files: " + errors.join("\n");
          }
        }
      }
      if (filename.charAt(0) === '#') {
        // trying to get script from the element
        var scriptElement = document.getElementById(filename.substring(1));
        if (scriptElement) {
          callback(scriptElement.text || scriptElement.textContent);
        } else {
          callback("", "Unable to load pjs sketch: element with id \'" + filename.substring(1) + "\' was not found");
        }
        return;
      }

      ajaxAsync(filename, callback);
    }

    for (var i = 0; i < sourcesCount; ++i) {
      loadBlock(i, sources[i]);
    }
  };

  /**
   * Automatic initialization function.
   */
  var init = function() {
    document.removeEventListener('DOMContentLoaded', init, false);

    // before running through init, clear the instances list, to prevent
    // sketch duplication when page content is dynamically swapped without
    // swapping out processing.js
    processingInstances = [];
    Processing.instances = processingInstances;

    var canvas = document.getElementsByTagName('canvas'),
      filenames;

    for (var i = 0, l = canvas.length; i < l; i++) {
      // datasrc and data-src are deprecated.
      var processingSources = canvas[i].getAttribute('data-processing-sources');
      if (processingSources === null) {
        // Temporary fallback for datasrc and data-src
        processingSources = canvas[i].getAttribute('data-src');
        if (processingSources === null) {
          processingSources = canvas[i].getAttribute('datasrc');
        }
      }
      if (processingSources) {
        filenames = processingSources.split(/\s+/g);
        for (var j = 0; j < filenames.length;) {
          if (filenames[j]) {
            j++;
          } else {
            filenames.splice(j, 1);
          }
        }
        loadSketchFromSources(canvas[i], filenames);
      }
    }

    // also process all <script>-indicated sketches, if there are any
    var s, last, source, instance,
        nodelist = document.getElementsByTagName('script'),
        scripts=[];

    // snapshot the DOM, as the nodelist is only a DOM view, and is
    // updated instantly when a script element is added or removed.
    for (s = nodelist.length - 1; s >= 0; s--) {
      scripts.push(nodelist[s]);
    }

    // iterate over all script elements to see if they contain Processing code
    for (s = 0, last = scripts.length; s < last; s++) {
      var script = scripts[s];
      if (!script.getAttribute) {
        continue;
      }

      var type = script.getAttribute("type");
      if (type && (type.toLowerCase() === "text/processing" || type.toLowerCase() === "application/processing")) {
        var target = script.getAttribute("data-processing-target");
        canvas = undef;
        if (target) {
          canvas = document.getElementById(target);
        } else {
          var nextSibling = script.nextSibling;
          while (nextSibling && nextSibling.nodeType !== 1) {
            nextSibling = nextSibling.nextSibling;
          }
          if (nextSibling && nextSibling.nodeName.toLowerCase() === "canvas") {
            canvas = nextSibling;
          }
        }

        if (canvas) {
          if (script.getAttribute("src")) {
            filenames = script.getAttribute("src").split(/\s+/);
            loadSketchFromSources(canvas, filenames);
            continue;
          }
          source =  script.textContent || script.text;
          instance = new Processing(canvas, source);
        }
      }
    }
  };

  /**
   * automatic loading of all sketches on the page
   */
  document.addEventListener('DOMContentLoaded', init, false);

  /**
   * Make Processing run through init after already having
   * been set up for a page. This function exists mostly for pages
   * that swap content in/out without reloading a page.
   */
  Processing.reload = function() {
    if (processingInstances.length > 0) {
      // unload sketches
      for (var i = processingInstances.length - 1; i >= 0; i--) {
        if (processingInstances[i]) {
          processingInstances[i].exit();
        }
      }
    }
    // rerun init() to scan the DOM for sketches
    init();
  };

  /**
   * Disable the automatic loading of all sketches on the page.
   * This will work as long as it's issued before DOMContentLoaded.
   */
  Processing.disableInit = function() {
    document.removeEventListener('DOMContentLoaded', init, false);
  };

  // done.
  return Processing;
};
},{}],7:[function(require,module,exports){
/**
 * Returns Java equals() result for two objects. If the first object
 * has the "equals" function, it preforms the call of this function.
 * Otherwise the method uses the JavaScript === operator.
 *
 * @param {Object} obj          The first object.
 * @param {Object} other        The second object.
 *
 * @returns {boolean}           true if the objects are equal.
 */
module.exports = function virtEquals(obj, other) {
  if (obj === null || other === null) {
    return (obj === null) && (other === null);
  }
  if (typeof (obj) === "string") {
    return obj === other;
  }
  if (typeof(obj) !== "object") {
    return obj === other;
  }
  if (obj.equals instanceof Function) {
    return obj.equals(other);
  }
  return obj === other;
};

},{}],8:[function(require,module,exports){
/**
 * Returns Java hashCode() result for the object. If the object has the "hashCode" function,
 * it preforms the call of this function. Otherwise it uses/creates the "$id" property,
 * which is used as the hashCode.
 *
 * @param {Object} obj          The object.
 * @returns {int}               The object's hash code.
 */
module.exports = function virtHashCode(obj, undef) {
  if (typeof(obj) === "string") {
    var hash = 0;
    for (var i = 0; i < obj.length; ++i) {
      hash = (hash * 31 + obj.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  }
  if (typeof(obj) !== "object") {
    return obj & 0xFFFFFFFF;
  }
  if (obj.hashCode instanceof Function) {
    return obj.hashCode();
  }
  if (obj.$id === undef) {
      obj.$id = ((Math.floor(Math.random() * 0x10000) - 0x8000) << 16) | Math.floor(Math.random() * 0x10000);
  }
  return obj.$id;
};

},{}],9:[function(require,module,exports){
/**
 * An ArrayList stores a variable number of objects.
 *
 * @param {int} initialCapacity optional defines the initial capacity of the list, it's empty by default
 *
 * @returns {ArrayList} new ArrayList object
 */
module.exports = function(options) {
  var virtHashCode = options.virtHashCode,
      virtEquals = options.virtEquals;

  function Iterator(array) {
    var index = -1;
    this.hasNext = function() {
      return (index + 1) < array.length;
    };

    this.next = function() {
      return array[++index];
    };

    this.remove = function() {
      array.splice(index--, 1);
    };
  }

  function ArrayList(a) {
    var array = [];

    if (a && a.toArray) {
      array = a.toArray();
    }

    /**
     * @member ArrayList
     * ArrayList.get() Returns the element at the specified position in this list.
     *
     * @param {int} i index of element to return
     *
     * @returns {Object} the element at the specified position in this list.
     */
    this.get = function(i) {
      return array[i];
    };
    /**
     * @member ArrayList
     * ArrayList.contains() Returns true if this list contains the specified element.
     *
     * @param {Object} item element whose presence in this List is to be tested.
     *
     * @returns {boolean} true if the specified element is present; false otherwise.
     */
    this.contains = function(item) {
      return this.indexOf(item)>-1;
    };
    /**
     * @member ArrayList
     * ArrayList.indexOf() Returns the position this element takes in the list, or -1 if the element is not found.
     *
     * @param {Object} item element whose position in this List is to be tested.
     *
     * @returns {int} the list position that the first match for this element holds in the list, or -1 if it is not in the list.
     */
    this.indexOf = function(item) {
      for (var i = 0, len = array.length; i < len; ++i) {
        if (virtEquals(item, array[i])) {
          return i;
        }
      }
      return -1;
    };
    /**
     * @member ArrayList
     * ArrayList.lastIndexOf() Returns the index of the last occurrence of the specified element in this list,
     * or -1 if this list does not contain the element. More formally, returns the highest index i such that
     * (o==null ? get(i)==null : o.equals(get(i))), or -1 if there is no such index.
     *
     * @param {Object} item element to search for.
     *
     * @returns {int} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
     */
    this.lastIndexOf = function(item) {
      for (var i = array.length-1; i >= 0; --i) {
        if (virtEquals(item, array[i])) {
          return i;
        }
      }
      return -1;
    };
    /**
     * @member ArrayList
     * ArrayList.add() Adds the specified element to this list.
     *
     * @param {int}    index  optional index at which the specified element is to be inserted
     * @param {Object} object element to be added to the list
     */
    this.add = function() {
      if (arguments.length === 1) {
        array.push(arguments[0]); // for add(Object)
      } else if (arguments.length === 2) {
        var arg0 = arguments[0];
        if (typeof arg0 === 'number') {
          if (arg0 >= 0 && arg0 <= array.length) {
            array.splice(arg0, 0, arguments[1]); // for add(i, Object)
          } else {
            throw(arg0 + " is not a valid index");
          }
        } else {
          throw(typeof arg0 + " is not a number");
        }
      } else {
        throw("Please use the proper number of parameters.");
      }
    };
    /**
     * @member ArrayList
     * ArrayList.addAll(collection) appends all of the elements in the specified
     * Collection to the end of this list, in the order that they are returned by
     * the specified Collection's Iterator.
     *
     * When called as addAll(index, collection) the elements are inserted into
     * this list at the position indicated by index.
     *
     * @param {index} Optional; specifies the position the colletion should be inserted at
     * @param {collection} Any iterable object (ArrayList, HashMap.keySet(), etc.)
     * @throws out of bounds error for negative index, or index greater than list size.
     */
    this.addAll = function(arg1, arg2) {
      // addAll(int, Collection)
      var it;
      if (typeof arg1 === "number") {
        if (arg1 < 0 || arg1 > array.length) {
          throw("Index out of bounds for addAll: " + arg1 + " greater or equal than " + array.length);
        }
        it = new ObjectIterator(arg2);
        while (it.hasNext()) {
          array.splice(arg1++, 0, it.next());
        }
      }
      // addAll(Collection)
      else {
        it = new ObjectIterator(arg1);
        while (it.hasNext()) {
          array.push(it.next());
        }
      }
    };
    /**
     * @member ArrayList
     * ArrayList.set() Replaces the element at the specified position in this list with the specified element.
     *
     * @param {int}    index  index of element to replace
     * @param {Object} object element to be stored at the specified position
     */
    this.set = function() {
      if (arguments.length === 2) {
        var arg0 = arguments[0];
        if (typeof arg0 === 'number') {
          if (arg0 >= 0 && arg0 < array.length) {
            array.splice(arg0, 1, arguments[1]);
          } else {
            throw(arg0 + " is not a valid index.");
          }
        } else {
          throw(typeof arg0 + " is not a number");
        }
      } else {
        throw("Please use the proper number of parameters.");
      }
    };

    /**
     * @member ArrayList
     * ArrayList.size() Returns the number of elements in this list.
     *
     * @returns {int} the number of elements in this list
     */
    this.size = function() {
      return array.length;
    };

    /**
     * @member ArrayList
     * ArrayList.clear() Removes all of the elements from this list. The list will be empty after this call returns.
     */
    this.clear = function() {
      array.length = 0;
    };

    /**
     * @member ArrayList
     * ArrayList.remove() Removes an element either based on index, if the argument is a number, or
     * by equality check, if the argument is an object.
     *
     * @param {int|Object} item either the index of the element to be removed, or the element itself.
     *
     * @returns {Object|boolean} If removal is by index, the element that was removed, or null if nothing was removed. If removal is by object, true if removal occurred, otherwise false.
     */
    this.remove = function(item) {
      if (typeof item === 'number') {
        return array.splice(item, 1)[0];
      }
      item = this.indexOf(item);
      if (item > -1) {
        array.splice(item, 1);
        return true;
      }
      return false;
    };

     /**
     * @member ArrayList
     * ArrayList.removeAll Removes from this List all of the elements from
     * the current ArrayList which are present in the passed in paramater ArrayList 'c'.
     * Shifts any succeeding elements to the left (reduces their index).
     *
     * @param {ArrayList} the ArrayList to compare to the current ArrayList
     *
     * @returns {boolean} true if the ArrayList had an element removed; false otherwise
     */
    this.removeAll = function(c) {
      var i, x, item,
          newList = new ArrayList();
      newList.addAll(this);
      this.clear();
      // For every item that exists in the original ArrayList and not in the c ArrayList
      // copy it into the empty 'this' ArrayList to create the new 'this' Array.
      for (i = 0, x = 0; i < newList.size(); i++) {
        item = newList.get(i);
        if (!c.contains(item)) {
          this.add(x++, item);
        }
      }
      if (this.size() < newList.size()) {
        return true;
      }
      return false;
    };

    /**
     * @member ArrayList
     * ArrayList.isEmpty() Tests if this list has no elements.
     *
     * @returns {boolean} true if this list has no elements; false otherwise
     */
    this.isEmpty = function() {
       return !array.length;
    };

    /**
     * @member ArrayList
     * ArrayList.clone() Returns a shallow copy of this ArrayList instance. (The elements themselves are not copied.)
     *
     * @returns {ArrayList} a clone of this ArrayList instance
     */
    this.clone = function() {
      return new ArrayList(this);
    };

    /**
     * @member ArrayList
     * ArrayList.toArray() Returns an array containing all of the elements in this list in the correct order.
     *
     * @returns {Object[]} Returns an array containing all of the elements in this list in the correct order
     */
    this.toArray = function() {
      return array.slice(0);
    };

    this.iterator = function() {
      return new Iterator(array);
    };
  }

  return ArrayList;
};

},{}],10:[function(require,module,exports){
module.exports = (function(charMap, undef) {

  var Char = function(chr) {
    if (typeof chr === 'string' && chr.length === 1) {
      this.code = chr.charCodeAt(0);
    } else if (typeof chr === 'number') {
      this.code = chr;
    } else if (chr instanceof Char) {
      this.code = chr;
    } else {
      this.code = NaN;
    }
    return (charMap[this.code] === undef) ? charMap[this.code] = this : charMap[this.code];
  };

  Char.prototype.toString = function() {
    return String.fromCharCode(this.code);
  };

  Char.prototype.valueOf = function() {
    return this.code;
  };

  return Char;
}({}));

},{}],11:[function(require,module,exports){
/**
* A HashMap stores a collection of objects, each referenced by a key. This is similar to an Array, only
* instead of accessing elements with a numeric index, a String  is used. (If you are familiar with
* associative arrays from other languages, this is the same idea.)
*
* @param {int} initialCapacity          defines the initial capacity of the map, it's 16 by default
* @param {float} loadFactor             the load factor for the map, the default is 0.75
* @param {Map} m                        gives the new HashMap the same mappings as this Map
*/
module.exports = function(options) {
  var virtHashCode = options.virtHashCode,
      virtEquals = options.virtEquals;

  /**
  * @member HashMap
  * A HashMap stores a collection of objects, each referenced by a key. This is similar to an Array, only
  * instead of accessing elements with a numeric index, a String  is used. (If you are familiar with
  * associative arrays from other languages, this is the same idea.)
  *
  * @param {int} initialCapacity          defines the initial capacity of the map, it's 16 by default
  * @param {float} loadFactor             the load factor for the map, the default is 0.75
  * @param {Map} m                        gives the new HashMap the same mappings as this Map
  */
  function HashMap() {
    if (arguments.length === 1 && arguments[0] instanceof HashMap) {
      return arguments[0].clone();
    }

    var initialCapacity = arguments.length > 0 ? arguments[0] : 16;
    var loadFactor = arguments.length > 1 ? arguments[1] : 0.75;
    var buckets = [];
    buckets.length = initialCapacity;
    var count = 0;
    var hashMap = this;

    function getBucketIndex(key) {
      var index = virtHashCode(key) % buckets.length;
      return index < 0 ? buckets.length + index : index;
    }
    function ensureLoad() {
      if (count <= loadFactor * buckets.length) {
        return;
      }
      var allEntries = [];
      for (var i = 0; i < buckets.length; ++i) {
        if (buckets[i] !== undefined) {
          allEntries = allEntries.concat(buckets[i]);
        }
      }
      var newBucketsLength = buckets.length * 2;
      buckets = [];
      buckets.length = newBucketsLength;
      for (var j = 0; j < allEntries.length; ++j) {
        var index = getBucketIndex(allEntries[j].key);
        var bucket = buckets[index];
        if (bucket === undefined) {
          buckets[index] = bucket = [];
        }
        bucket.push(allEntries[j]);
      }
    }

    function Iterator(conversion, removeItem) {
      var bucketIndex = 0;
      var itemIndex = -1;
      var endOfBuckets = false;
      var currentItem;

      function findNext() {
        while (!endOfBuckets) {
          ++itemIndex;
          if (bucketIndex >= buckets.length) {
            endOfBuckets = true;
          } else if (buckets[bucketIndex] === undefined || itemIndex >= buckets[bucketIndex].length) {
            itemIndex = -1;
            ++bucketIndex;
          } else {
            return;
          }
        }
      }

      /*
      * @member Iterator
      * Checks if the Iterator has more items
      */
      this.hasNext = function() {
        return !endOfBuckets;
      };

      /*
      * @member Iterator
      * Return the next Item
      */
      this.next = function() {
        currentItem = conversion(buckets[bucketIndex][itemIndex]);
        findNext();
        return currentItem;
      };

      /*
      * @member Iterator
      * Remove the current item
      */
      this.remove = function() {
        if (currentItem !== undefined) {
          removeItem(currentItem);
          --itemIndex;
          findNext();
        }
      };

      findNext();
    }

    function Set(conversion, isIn, removeItem) {
      this.clear = function() {
        hashMap.clear();
      };

      this.contains = function(o) {
        return isIn(o);
      };

      this.containsAll = function(o) {
        var it = o.iterator();
        while (it.hasNext()) {
          if (!this.contains(it.next())) {
            return false;
          }
        }
        return true;
      };

      this.isEmpty = function() {
        return hashMap.isEmpty();
      };

      this.iterator = function() {
        return new Iterator(conversion, removeItem);
      };

      this.remove = function(o) {
        if (this.contains(o)) {
          removeItem(o);
          return true;
        }
        return false;
      };

      this.removeAll = function(c) {
        var it = c.iterator();
        var changed = false;
        while (it.hasNext()) {
          var item = it.next();
          if (this.contains(item)) {
            removeItem(item);
            changed = true;
          }
        }
        return true;
      };

      this.retainAll = function(c) {
        var it = this.iterator();
        var toRemove = [];
        while (it.hasNext()) {
          var entry = it.next();
          if (!c.contains(entry)) {
            toRemove.push(entry);
          }
        }
        for (var i = 0; i < toRemove.length; ++i) {
          removeItem(toRemove[i]);
        }
        return toRemove.length > 0;
      };

      this.size = function() {
        return hashMap.size();
      };

      this.toArray = function() {
        var result = [];
        var it = this.iterator();
        while (it.hasNext()) {
          result.push(it.next());
        }
        return result;
      };
    }

    function Entry(pair) {
      this._isIn = function(map) {
        return map === hashMap && (pair.removed === undefined);
      };

      this.equals = function(o) {
        return virtEquals(pair.key, o.getKey());
      };

      this.getKey = function() {
        return pair.key;
      };

      this.getValue = function() {
        return pair.value;
      };

      this.hashCode = function(o) {
        return virtHashCode(pair.key);
      };

      this.setValue = function(value) {
        var old = pair.value;
        pair.value = value;
        return old;
      };
    }

    this.clear = function() {
      count = 0;
      buckets = [];
      buckets.length = initialCapacity;
    };

    this.clone = function() {
      var map = new HashMap();
      map.putAll(this);
      return map;
    };

    this.containsKey = function(key) {
      var index = getBucketIndex(key);
      var bucket = buckets[index];
      if (bucket === undefined) {
        return false;
      }
      for (var i = 0; i < bucket.length; ++i) {
        if (virtEquals(bucket[i].key, key)) {
          return true;
        }
      }
      return false;
    };

    this.containsValue = function(value) {
      for (var i = 0; i < buckets.length; ++i) {
        var bucket = buckets[i];
        if (bucket === undefined) {
          continue;
        }
        for (var j = 0; j < bucket.length; ++j) {
          if (virtEquals(bucket[j].value, value)) {
            return true;
          }
        }
      }
      return false;
    };

    this.entrySet = function() {
      return new Set(

      function(pair) {
        return new Entry(pair);
      },

      function(pair) {
        return (pair instanceof Entry) && pair._isIn(hashMap);
      },

      function(pair) {
        return hashMap.remove(pair.getKey());
      });
    };

    this.get = function(key) {
      var index = getBucketIndex(key);
      var bucket = buckets[index];
      if (bucket === undefined) {
        return null;
      }
      for (var i = 0; i < bucket.length; ++i) {
        if (virtEquals(bucket[i].key, key)) {
          return bucket[i].value;
        }
      }
      return null;
    };

    this.isEmpty = function() {
      return count === 0;
    };

    this.keySet = function() {
      return new Set(
        // get key from pair
        function(pair) {
          return pair.key;
        },
        // is-in test
        function(key) {
          return hashMap.containsKey(key);
        },
        // remove from hashmap by key
        function(key) {
          return hashMap.remove(key);
        }
      );
    };

    this.values = function() {
      return new Set(
        // get value from pair
        function(pair) {
          return pair.value;
        },
        // is-in test
        function(value) {
          return hashMap.containsValue(value);
        },
        // remove from hashmap by value
        function(value) {
          return hashMap.removeByValue(value);
        }
      );
    };

    this.put = function(key, value) {
      var index = getBucketIndex(key);
      var bucket = buckets[index];
      if (bucket === undefined) {
        ++count;
        buckets[index] = [{
          key: key,
          value: value
        }];
        ensureLoad();
        return null;
      }
      for (var i = 0; i < bucket.length; ++i) {
        if (virtEquals(bucket[i].key, key)) {
          var previous = bucket[i].value;
          bucket[i].value = value;
          return previous;
        }
      }
      ++count;
      bucket.push({
        key: key,
        value: value
      });
      ensureLoad();
      return null;
    };

    this.putAll = function(m) {
      var it = m.entrySet().iterator();
      while (it.hasNext()) {
        var entry = it.next();
        this.put(entry.getKey(), entry.getValue());
      }
    };

    this.remove = function(key) {
      var index = getBucketIndex(key);
      var bucket = buckets[index];
      if (bucket === undefined) {
        return null;
      }
      for (var i = 0; i < bucket.length; ++i) {
        if (virtEquals(bucket[i].key, key)) {
          --count;
          var previous = bucket[i].value;
          bucket[i].removed = true;
          if (bucket.length > 1) {
            bucket.splice(i, 1);
          } else {
            buckets[index] = undefined;
          }
          return previous;
        }
      }
      return null;
    };

    this.removeByValue = function(value) {
      var bucket, i, ilen, pair;
      for (bucket in buckets) {
        if (buckets.hasOwnProperty(bucket)) {
          for (i = 0, ilen = buckets[bucket].length; i < ilen; i++) {
            pair = buckets[bucket][i];
            // removal on values is based on identity, not equality
            if (pair.value === value) {
              buckets[bucket].splice(i, 1);
              return true;
            }
          }
        }
      }
      return false;
    };

    this.size = function() {
      return count;
    };
  }

  return HashMap;
};

},{}],12:[function(require,module,exports){
// module export
module.exports = function(options,undef) {
  var window = options.Browser.window,
      document = options.Browser.document,
      noop = options.noop;

  /**
   * [internal function] computeFontMetrics() calculates various metrics for text
   * placement. Currently this function computes the ascent, descent and leading
   * (from "lead", used for vertical space) values for the currently active font.
   */
  function computeFontMetrics(pfont) {
    var emQuad = 250,
        correctionFactor = pfont.size / emQuad,
        canvas = document.createElement("canvas");
    canvas.width = 2*emQuad;
    canvas.height = 2*emQuad;
    canvas.style.opacity = 0;
    var cfmFont = pfont.getCSSDefinition(emQuad+"px", "normal"),
        ctx = canvas.getContext("2d");
    ctx.font = cfmFont;

    // Size the canvas using a string with common max-ascent and max-descent letters.
    // Changing the canvas dimensions resets the context, so we must reset the font.
    var protrusions = "dbflkhyjqpg";
    canvas.width = ctx.measureText(protrusions).width;
    ctx.font = cfmFont;

    // for text lead values, we meaure a multiline text container.
    var leadDiv = document.createElement("div");
    leadDiv.style.position = "absolute";
    leadDiv.style.opacity = 0;
    leadDiv.style.fontFamily = '"' + pfont.name + '"';
    leadDiv.style.fontSize = emQuad + "px";
    leadDiv.innerHTML = protrusions + "<br/>" + protrusions;
    document.body.appendChild(leadDiv);

    var w = canvas.width,
        h = canvas.height,
        baseline = h/2;

    // Set all canvas pixeldata values to 255, with all the content
    // data being 0. This lets us scan for data[i] != 255.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "black";
    ctx.fillText(protrusions, 0, baseline);
    var pixelData = ctx.getImageData(0, 0, w, h).data;

    // canvas pixel data is w*4 by h*4, because R, G, B and A are separate,
    // consecutive values in the array, rather than stored as 32 bit ints.
    var i = 0,
        w4 = w * 4,
        len = pixelData.length;

    // Finding the ascent uses a normal, forward scanline
    while (++i < len && pixelData[i] === 255) {
      noop();
    }
    var ascent = Math.round(i / w4);

    // Finding the descent uses a reverse scanline
    i = len - 1;
    while (--i > 0 && pixelData[i] === 255) {
      noop();
    }
    var descent = Math.round(i / w4);

    // set font metrics
    pfont.ascent = correctionFactor * (baseline - ascent);
    pfont.descent = correctionFactor * (descent - baseline);

    // Then we try to get the real value from the browser
    if (document.defaultView.getComputedStyle) {
      var leadDivHeight = document.defaultView.getComputedStyle(leadDiv,null).getPropertyValue("height");
      leadDivHeight = correctionFactor * leadDivHeight.replace("px","");
      if (leadDivHeight >= pfont.size * 2) {
        pfont.leading = Math.round(leadDivHeight/2);
      }
    }
    document.body.removeChild(leadDiv);

    // if we're caching, cache the context used for this pfont
    if (pfont.caching) {
      return ctx;
    }
  }

  /**
   * Constructor for a system or from-file (non-SVG) font.
   */
  function PFont(name, size) {
    // according to the P5 API, new PFont() is legal (albeit completely useless)
    if (name === undef) {
      name = "";
    }
    this.name = name;
    if (size === undef) {
      size = 0;
    }
    this.size = size;
    this.glyph = false;
    this.ascent = 0;
    this.descent = 0;
    // For leading, the "safe" value uses the standard TEX ratio
    this.leading = 1.2 * size;

    // Note that an italic, bold font must used "... Bold Italic"
    // in P5. "... Italic Bold" is treated as normal/normal.
    var illegalIndicator = name.indexOf(" Italic Bold");
    if (illegalIndicator !== -1) {
      name = name.substring(0, illegalIndicator);
    }

    // determine font style
    this.style = "normal";
    var italicsIndicator = name.indexOf(" Italic");
    if (italicsIndicator !== -1) {
      name = name.substring(0, italicsIndicator);
      this.style = "italic";
    }

    // determine font weight
    this.weight = "normal";
    var boldIndicator = name.indexOf(" Bold");
    if (boldIndicator !== -1) {
      name = name.substring(0, boldIndicator);
      this.weight = "bold";
    }

    // determine font-family name
    this.family = "sans-serif";
    if (name !== undef) {
      switch(name) {
        case "sans-serif":
        case "serif":
        case "monospace":
        case "fantasy":
        case "cursive":
          this.family = name;
          break;
        default:
          this.family = '"' + name + '", sans-serif';
          break;
      }
    }
    // Calculate the ascent/descent/leading value based on
    // how the browser renders this font.
    this.context2d = computeFontMetrics(this);
    this.css = this.getCSSDefinition();
    if (this.context2d) {
      this.context2d.font = this.css;
    }
  }

  /**
   * regulates whether or not we're caching the canvas
   * 2d context for quick text width computation.
   */
  PFont.prototype.caching = true;

  /**
   * This function generates the CSS "font" string for this PFont
   */
  PFont.prototype.getCSSDefinition = function(fontSize, lineHeight) {
    if(fontSize===undef) {
      fontSize = this.size + "px";
    }
    if(lineHeight===undef) {
      lineHeight = this.leading + "px";
    }
    // CSS "font" definition: font-style font-variant font-weight font-size/line-height font-family
    var components = [this.style, "normal", this.weight, fontSize + "/" + lineHeight, this.family];
    return components.join(" ");
  };

  /**
   * Rely on the cached context2d measureText function.
   */
  PFont.prototype.measureTextWidth = function(string) {
    return this.context2d.measureText(string).width;
  };

  /**
   * FALLBACK FUNCTION -- replaces Pfont.prototype.measureTextWidth
   * when the font cache becomes too large. This contructs a new
   * canvas 2d context object for calling measureText on.
   */
  PFont.prototype.measureTextWidthFallback = function(string) {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
    ctx.font = this.css;
    return ctx.measureText(string).width;
  };

  /**
   * Global "loaded fonts" list, internal to PFont
   */
  PFont.PFontCache = { length: 0 };

  /**
   * This function acts as single access point for getting and caching
   * fonts across all sketches handled by an instance of Processing.js
   */
  PFont.get = function(fontName, fontSize) {
    // round fontSize to one decimal point
    fontSize = ((fontSize*10)+0.5|0)/10;
    var cache = PFont.PFontCache,
        idx = fontName+"/"+fontSize;
    if (!cache[idx]) {
      cache[idx] = new PFont(fontName, fontSize);
      cache.length++;

      // FALLBACK FUNCTIONALITY 1:
      // If the cache has become large, switch over from full caching
      // to caching only the static metrics for each new font request.
      if (cache.length === 50) {
        PFont.prototype.measureTextWidth = PFont.prototype.measureTextWidthFallback;
        PFont.prototype.caching = false;
        // clear contexts stored for each cached font
        var entry;
        for (entry in cache) {
          if (entry !== "length") {
            cache[entry].context2d = null;
          }
        }
        return new PFont(fontName, fontSize);
      }

      // FALLBACK FUNCTIONALITY 2:
      // If the cache has become too large, switch off font caching entirely.
      if (cache.length === 400) {
        PFont.PFontCache = {};
        PFont.get = PFont.getFallback;
        return new PFont(fontName, fontSize);
      }
    }
    return cache[idx];
  };

  /**
   * FALLBACK FUNCTION -- replaces PFont.get when the font cache
   * becomes too large. This function bypasses font caching entirely.
   */
  PFont.getFallback = function(fontName, fontSize) {
    return new PFont(fontName, fontSize);
  };

  /**
   * Lists all standard fonts. Due to browser limitations, this list is
   * not the system font list, like in P5, but the CSS "genre" list.
   */
  PFont.list = function() {
    return ["sans-serif", "serif", "monospace", "fantasy", "cursive"];
  };

  /**
   * Loading external fonts through @font-face rules is handled by PFont,
   * to ensure fonts loaded in this way are globally available.
   */
  PFont.preloading = {
    // template element used to compare font sizes
    template: {},
    // indicates whether or not the reference tiny font has been loaded
    initialized: false,
    // load the reference tiny font via a css @font-face rule
    initialize: function() {
      var generateTinyFont = function() {
        var encoded = "#E3KAI2wAgT1MvMg7Eo3VmNtYX7ABi3CxnbHlm" +
                      "7Abw3kaGVhZ7ACs3OGhoZWE7A53CRobXR47AY3" +
                      "AGbG9jYQ7G03Bm1heH7ABC3CBuYW1l7Ae3AgcG" +
                      "9zd7AI3AE#B3AQ2kgTY18PPPUACwAg3ALSRoo3" +
                      "#yld0xg32QAB77#E777773B#E3C#I#Q77773E#" +
                      "Q7777777772CMAIw7AB77732B#M#Q3wAB#g3B#" +
                      "E#E2BB//82BB////w#B7#gAEg3E77x2B32B#E#" +
                      "Q#MTcBAQ32gAe#M#QQJ#E32M#QQJ#I#g32Q77#";
        var expand = function(input) {
                       return "AAAAAAAA".substr(~~input ? 7-input : 6);
                     };
        return encoded.replace(/[#237]/g, expand);
      };
      var fontface = document.createElement("style");
      fontface.setAttribute("type","text/css");
      fontface.innerHTML =  "@font-face {\n" +
                            '  font-family: "PjsEmptyFont";' + "\n" +
                            "  src: url('data:application/x-font-ttf;base64,"+generateTinyFont()+"')\n" +
                            "       format('truetype');\n" +
                            "}";
      document.head.appendChild(fontface);

      // set up the template element
      var element = document.createElement("span");
      element.style.cssText = 'position: absolute; top: 0; left: 0; opacity: 0; font-family: "PjsEmptyFont", fantasy;';
      element.innerHTML = "AAAAAAAA";
      document.body.appendChild(element);
      this.template = element;

      this.initialized = true;
    },
    // Shorthand function to get the computed width for an element.
    getElementWidth: function(element) {
      return document.defaultView.getComputedStyle(element,"").getPropertyValue("width");
    },
    // time taken so far in attempting to load a font
    timeAttempted: 0,
    // returns false if no fonts are pending load, or true otherwise.
    pending: function(intervallength) {
      if (!this.initialized) {
        this.initialize();
      }
      var element,
          computedWidthFont,
          computedWidthRef = this.getElementWidth(this.template);
      for (var i = 0; i < this.fontList.length; i++) {
        // compares size of text in pixels. if equal, custom font is not yet loaded
        element = this.fontList[i];
        computedWidthFont = this.getElementWidth(element);
        if (this.timeAttempted < 4000 && computedWidthFont === computedWidthRef) {
          this.timeAttempted += intervallength;
          return true;
        } else {
          document.body.removeChild(element);
          this.fontList.splice(i--, 1);
          this.timeAttempted = 0;
        }
      }
      // if there are no more fonts to load, pending is false
      if (this.fontList.length === 0) {
        return false;
      }
      // We should have already returned before getting here.
      // But, if we do get here, length!=0 so fonts are pending.
      return true;
    },
    // fontList contains elements to compare font sizes against a template
    fontList: [],
    // addedList contains the fontnames of all the fonts loaded via @font-face
    addedList: {},
    // adds a font to the font cache
    // creates an element using the font, to start loading the font,
    // and compare against a default font to see if the custom font is loaded
    add: function(fontSrc) {
      if (!this.initialized) {
       this.initialize();
      }
      // fontSrc can be a string or a javascript object
      // acceptable fonts are .ttf, .otf, and data uri
      var fontName = (typeof fontSrc === 'object' ? fontSrc.fontFace : fontSrc),
          fontUrl = (typeof fontSrc === 'object' ? fontSrc.url : fontSrc);

      // check whether we already created the @font-face rule for this font
      if (this.addedList[fontName]) {
        return;
      }

      // if we didn't, create the @font-face rule
      var style = document.createElement("style");
      style.setAttribute("type","text/css");
      style.innerHTML = "@font-face{\n  font-family: '" + fontName + "';\n  src:  url('" + fontUrl + "');\n}\n";
      document.head.appendChild(style);
      this.addedList[fontName] = true;

      // also create the element to load and compare the new font
      var element = document.createElement("span");
      element.style.cssText = "position: absolute; top: 0; left: 0; opacity: 0;";
      element.style.fontFamily = '"' + fontName + '", "PjsEmptyFont", fantasy';
      element.innerHTML = "AAAAAAAA";
      document.body.appendChild(element);
      this.fontList.push(element);
    }
  };

  return PFont;
};
},{}],13:[function(require,module,exports){
module.exports = function(options, undef) {

  // FIXME: hack
  var p = options.p;

  /**
   * PMatrix2D is a 3x2 affine matrix implementation. The constructor accepts another PMatrix2D or a list of six float elements.
   * If no parameters are provided the matrix is set to the identity matrix.
   *
   * @param {PMatrix2D} matrix  the initial matrix to set to
   * @param {float} m00         the first element of the matrix
   * @param {float} m01         the second element of the matrix
   * @param {float} m02         the third element of the matrix
   * @param {float} m10         the fourth element of the matrix
   * @param {float} m11         the fifth element of the matrix
   * @param {float} m12         the sixth element of the matrix
   */
  var PMatrix2D = function() {
    if (arguments.length === 0) {
      this.reset();
    } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
      this.set(arguments[0].array());
    } else if (arguments.length === 6) {
      this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
  };

  /**
   * PMatrix2D methods
   */
  PMatrix2D.prototype = {
    /**
     * @member PMatrix2D
     * The set() function sets the matrix elements. The function accepts either another PMatrix2D, an array of elements, or a list of six floats.
     *
     * @param {PMatrix2D} matrix    the matrix to set this matrix to
     * @param {float[]} elements    an array of elements to set this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the third element of the matrix
     * @param {float} m10           the fourth element of the matrix
     * @param {float} m11           the fith element of the matrix
     * @param {float} m12           the sixth element of the matrix
     */
    set: function() {
      if (arguments.length === 6) {
        var a = arguments;
        this.set([a[0], a[1], a[2],
                  a[3], a[4], a[5]]);
      } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
        this.elements = arguments[0].array();
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        this.elements = arguments[0].slice();
      }
    },
    /**
     * @member PMatrix2D
     * The get() function returns a copy of this PMatrix2D.
     *
     * @return {PMatrix2D} a copy of this PMatrix2D
     */
    get: function() {
      var outgoing = new PMatrix2D();
      outgoing.set(this.elements);
      return outgoing;
    },
    /**
     * @member PMatrix2D
     * The reset() function sets this PMatrix2D to the identity matrix.
     */
    reset: function() {
      this.set([1, 0, 0, 0, 1, 0]);
    },
    /**
     * @member PMatrix2D
     * The array() function returns a copy of the element values.
     * @addon
     *
     * @return {float[]} returns a copy of the element values
     */
    array: function array() {
      return this.elements.slice();
    },
    /**
     * @member PMatrix2D
     * The translate() function translates this matrix by moving the current coordinates to the location specified by tx and ty.
     *
     * @param {float} tx  the x-axis coordinate to move to
     * @param {float} ty  the y-axis coordinate to move to
     */
    translate: function(tx, ty) {
      this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
      this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
    },
    /**
     * @member PMatrix2D
     * The invTranslate() function translates this matrix by moving the current coordinates to the negative location specified by tx and ty.
     *
     * @param {float} tx  the x-axis coordinate to move to
     * @param {float} ty  the y-axis coordinate to move to
     */
    invTranslate: function(tx, ty) {
      this.translate(-tx, -ty);
    },
     /**
     * @member PMatrix2D
     * The transpose() function is not used in processingjs.
     */
    transpose: function() {
      // Does nothing in Processing.
    },
    /**
     * @member PMatrix2D
     * The mult() function multiplied this matrix.
     * If two array elements are passed in the function will multiply a two element vector against this matrix.
     * If target is null or not length four, a new float array will be returned.
     * The values for vec and target can be the same (though that's less efficient).
     * If two PVectors are passed in the function multiply the x and y coordinates of a PVector against this matrix.
     *
     * @param {PVector} source, target  the PVectors used to multiply this matrix
     * @param {float[]} source, target  the arrays used to multiply this matrix
     *
     * @return {PVector|float[]} returns a PVector or an array representing the new matrix
     */
    mult: function(source, target) {
      var x, y;
      if (source instanceof PVector) {
        x = source.x;
        y = source.y;
        if (!target) {
          target = new PVector();
        }
      } else if (source instanceof Array) {
        x = source[0];
        y = source[1];
        if (!target) {
          target = [];
        }
      }
      if (target instanceof Array) {
        target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2];
        target[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5];
      } else if (target instanceof PVector) {
        target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2];
        target.y = this.elements[3] * x + this.elements[4] * y + this.elements[5];
        target.z = 0;
      }
      return target;
    },
    /**
     * @member PMatrix2D
     * The multX() function calculates the x component of a vector from a transformation.
     *
     * @param {float} x the x component of the vector being transformed
     * @param {float} y the y component of the vector being transformed
     *
     * @return {float} returnes the result of the calculation
     */
    multX: function(x, y) {
      return (x * this.elements[0] + y * this.elements[1] + this.elements[2]);
    },
    /**
     * @member PMatrix2D
     * The multY() function calculates the y component of a vector from a transformation.
     *
     * @param {float} x the x component of the vector being transformed
     * @param {float} y the y component of the vector being transformed
     *
     * @return {float} returnes the result of the calculation
     */
    multY: function(x, y) {
      return (x * this.elements[3] + y * this.elements[4] + this.elements[5]);
    },
    /**
     * @member PMatrix2D
     * The skewX() function skews the matrix along the x-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    skewX: function(angle) {
      this.apply(1, 0, 1, angle, 0, 0);
    },
    /**
     * @member PMatrix2D
     * The skewY() function skews the matrix along the y-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    skewY: function(angle) {
      this.apply(1, 0, 1,  0, angle, 0);
    },
    /**
     * @member PMatrix2D
     * The shearX() function shears the matrix along the x-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    shearX: function(angle) {
      this.apply(1, 0, 1, Math.tan(angle) , 0, 0);
    },
    /**
     * @member PMatrix2D
     * The shearY() function shears the matrix along the y-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    shearY: function(angle) {
      this.apply(1, 0, 1,  0, Math.tan(angle), 0);
    },
    /**
     * @member PMatrix2D
     * The determinant() function calvculates the determinant of this matrix.
     *
     * @return {float} the determinant of the matrix
     */
    determinant: function() {
      return (this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3]);
    },
    /**
     * @member PMatrix2D
     * The invert() function inverts this matrix
     *
     * @return {boolean} true if successful
     */
    invert: function() {
      var d = this.determinant();
      if (Math.abs( d ) > PConstants.MIN_INT) {
        var old00 = this.elements[0];
        var old01 = this.elements[1];
        var old02 = this.elements[2];
        var old10 = this.elements[3];
        var old11 = this.elements[4];
        var old12 = this.elements[5];
        this.elements[0] =  old11 / d;
        this.elements[3] = -old10 / d;
        this.elements[1] = -old01 / d;
        this.elements[4] =  old00 / d;
        this.elements[2] = (old01 * old12 - old11 * old02) / d;
        this.elements[5] = (old10 * old02 - old00 * old12) / d;
        return true;
      }
      return false;
    },
    /**
     * @member PMatrix2D
     * The scale() function increases or decreases the size of a shape by expanding and contracting vertices. When only one parameter is specified scale will occur in all dimensions.
     * This is equivalent to a two parameter call.
     *
     * @param {float} sx  the amount to scale on the x-axis
     * @param {float} sy  the amount to scale on the y-axis
     */
    scale: function(sx, sy) {
      if (sx && !sy) {
        sy = sx;
      }
      if (sx && sy) {
        this.elements[0] *= sx;
        this.elements[1] *= sy;
        this.elements[3] *= sx;
        this.elements[4] *= sy;
      }
    },
     /**
      * @member PMatrix2D
      * The invScale() function decreases or increases the size of a shape by contracting and expanding vertices. When only one parameter is specified scale will occur in all dimensions.
      * This is equivalent to a two parameter call.
      *
      * @param {float} sx  the amount to scale on the x-axis
      * @param {float} sy  the amount to scale on the y-axis
      */
    invScale: function(sx, sy) {
      if (sx && !sy) {
        sy = sx;
      }
      this.scale(1 / sx, 1 / sy);
    },
    /**
     * @member PMatrix2D
     * The apply() function multiplies the current matrix by the one specified through the parameters. Note that either a PMatrix2D or a list of floats can be passed in.
     *
     * @param {PMatrix2D} matrix    the matrix to apply this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the third element of the matrix
     * @param {float} m10           the fourth element of the matrix
     * @param {float} m11           the fith element of the matrix
     * @param {float} m12           the sixth element of the matrix
     */
    apply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
        source = arguments[0].array();
      } else if (arguments.length === 6) {
        source = Array.prototype.slice.call(arguments);
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        source = arguments[0];
      }

      var result = [0, 0, this.elements[2],
                    0, 0, this.elements[5]];
      var e = 0;
      for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 3; col++, e++) {
          result[e] += this.elements[row * 3 + 0] * source[col + 0] +
                       this.elements[row * 3 + 1] * source[col + 3];
        }
      }
      this.elements = result.slice();
    },
    /**
     * @member PMatrix2D
     * The preApply() function applies another matrix to the left of this one. Note that either a PMatrix2D or elements of a matrix can be passed in.
     *
     * @param {PMatrix2D} matrix    the matrix to apply this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the third element of the matrix
     * @param {float} m10           the fourth element of the matrix
     * @param {float} m11           the fith element of the matrix
     * @param {float} m12           the sixth element of the matrix
     */
    preApply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
        source = arguments[0].array();
      } else if (arguments.length === 6) {
        source = Array.prototype.slice.call(arguments);
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        source = arguments[0];
      }
      var result = [0, 0, source[2],
                    0, 0, source[5]];
      result[2] = source[2] + this.elements[2] * source[0] + this.elements[5] * source[1];
      result[5] = source[5] + this.elements[2] * source[3] + this.elements[5] * source[4];
      result[0] = this.elements[0] * source[0] + this.elements[3] * source[1];
      result[3] = this.elements[0] * source[3] + this.elements[3] * source[4];
      result[1] = this.elements[1] * source[0] + this.elements[4] * source[1];
      result[4] = this.elements[1] * source[3] + this.elements[4] * source[4];
      this.elements = result.slice();
    },
    /**
     * @member PMatrix2D
     * The rotate() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotate: function(angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var temp1 = this.elements[0];
      var temp2 = this.elements[1];
      this.elements[0] =  c * temp1 + s * temp2;
      this.elements[1] = -s * temp1 + c * temp2;
      temp1 = this.elements[3];
      temp2 = this.elements[4];
      this.elements[3] =  c * temp1 + s * temp2;
      this.elements[4] = -s * temp1 + c * temp2;
    },
    /**
     * @member PMatrix2D
     * The rotateZ() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotateZ: function(angle) {
      this.rotate(angle);
    },
    /**
     * @member PMatrix2D
     * The invRotateZ() function rotates the matrix in opposite direction.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    invRotateZ: function(angle) {
      this.rotateZ(angle - Math.PI);
    },
    /**
     * @member PMatrix2D
     * The print() function prints out the elements of this matrix
     */
    print: function() {
      var digits = printMatrixHelper(this.elements);
      var output = "" + p.nfs(this.elements[0], digits, 4) + " " +
                        p.nfs(this.elements[1], digits, 4) + " " +
                        p.nfs(this.elements[2], digits, 4) + "\n" +
                        p.nfs(this.elements[3], digits, 4) + " " +
                        p.nfs(this.elements[4], digits, 4) + " " +
                        p.nfs(this.elements[5], digits, 4) + "\n\n";
      p.println(output);
    }
  };

  return PMatrix2D;
};

},{}],14:[function(require,module,exports){
module.exports = function(options, undef) {

  // FIXME: hack
  var p = options.p;

  /**
   * PMatrix3D is a 4x4  matrix implementation. The constructor accepts another PMatrix3D or a list of six or sixteen float elements.
   * If no parameters are provided the matrix is set to the identity matrix.
   */
  var PMatrix3D = function() {
    // When a matrix is created, it is set to an identity matrix
    this.reset();
  };

  /**
   * PMatrix3D methods
   */
  PMatrix3D.prototype = {
    /**
     * @member PMatrix2D
     * The set() function sets the matrix elements. The function accepts either another PMatrix3D, an array of elements, or a list of six or sixteen floats.
     *
     * @param {PMatrix3D} matrix    the initial matrix to set to
     * @param {float[]} elements    an array of elements to set this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the second element of the matrix
     * @param {float} m02           the third element of the matrix
     * @param {float} m03           the fourth element of the matrix
     * @param {float} m10           the fifth element of the matrix
     * @param {float} m11           the sixth element of the matrix
     * @param {float} m12           the seventh element of the matrix
     * @param {float} m13           the eight element of the matrix
     * @param {float} m20           the nineth element of the matrix
     * @param {float} m21           the tenth element of the matrix
     * @param {float} m22           the eleventh element of the matrix
     * @param {float} m23           the twelveth element of the matrix
     * @param {float} m30           the thirteenth element of the matrix
     * @param {float} m31           the fourtheenth element of the matrix
     * @param {float} m32           the fivetheenth element of the matrix
     * @param {float} m33           the sixteenth element of the matrix
     */
    set: function() {
      if (arguments.length === 16) {
        this.elements = Array.prototype.slice.call(arguments);
      } else if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
        this.elements = arguments[0].array();
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        this.elements = arguments[0].slice();
      }
    },
    /**
     * @member PMatrix3D
     * The get() function returns a copy of this PMatrix3D.
     *
     * @return {PMatrix3D} a copy of this PMatrix3D
     */
    get: function() {
      var outgoing = new PMatrix3D();
      outgoing.set(this.elements);
      return outgoing;
    },
    /**
     * @member PMatrix3D
     * The reset() function sets this PMatrix3D to the identity matrix.
     */
    reset: function() {
      this.elements = [1,0,0,0,
                       0,1,0,0,
                       0,0,1,0,
                       0,0,0,1];
    },
    /**
     * @member PMatrix3D
     * The array() function returns a copy of the element values.
     * @addon
     *
     * @return {float[]} returns a copy of the element values
     */
    array: function array() {
      return this.elements.slice();
    },
    /**
     * @member PMatrix3D
     * The translate() function translates this matrix by moving the current coordinates to the location specified by tx, ty, and tz.
     *
     * @param {float} tx  the x-axis coordinate to move to
     * @param {float} ty  the y-axis coordinate to move to
     * @param {float} tz  the z-axis coordinate to move to
     */
    translate: function(tx, ty, tz) {
      if (tz === undef) {
        tz = 0;
      }

      this.elements[3]  += tx * this.elements[0]  + ty * this.elements[1]  + tz * this.elements[2];
      this.elements[7]  += tx * this.elements[4]  + ty * this.elements[5]  + tz * this.elements[6];
      this.elements[11] += tx * this.elements[8]  + ty * this.elements[9]  + tz * this.elements[10];
      this.elements[15] += tx * this.elements[12] + ty * this.elements[13] + tz * this.elements[14];
    },
    /**
     * @member PMatrix3D
     * The transpose() function transpose this matrix.
     */
    transpose: function() {
      var temp = this.elements[4];
      this.elements[4] = this.elements[1];
      this.elements[1] = temp;

      temp = this.elements[8];
      this.elements[8] = this.elements[2];
      this.elements[2] = temp;

      temp = this.elements[6];
      this.elements[6] = this.elements[9];
      this.elements[9] = temp;

      temp = this.elements[3];
      this.elements[3] = this.elements[12];
      this.elements[12] = temp;

      temp = this.elements[7];
      this.elements[7] = this.elements[13];
      this.elements[13] = temp;

      temp = this.elements[11];
      this.elements[11] = this.elements[14];
      this.elements[14] = temp;
    },
    /**
     * @member PMatrix3D
     * The mult() function multiplied this matrix.
     * If two array elements are passed in the function will multiply a two element vector against this matrix.
     * If target is null or not length four, a new float array will be returned.
     * The values for vec and target can be the same (though that's less efficient).
     * If two PVectors are passed in the function multiply the x and y coordinates of a PVector against this matrix.
     *
     * @param {PVector} source, target  the PVectors used to multiply this matrix
     * @param {float[]} source, target  the arrays used to multiply this matrix
     *
     * @return {PVector|float[]} returns a PVector or an array representing the new matrix
     */
    mult: function(source, target) {
      var x, y, z, w;
      if (source instanceof PVector) {
        x = source.x;
        y = source.y;
        z = source.z;
        w = 1;
        if (!target) {
          target = new PVector();
        }
      } else if (source instanceof Array) {
        x = source[0];
        y = source[1];
        z = source[2];
        w = source[3] || 1;

        if ( !target || (target.length !== 3 && target.length !== 4) ) {
          target = [0, 0, 0];
        }
      }

      if (target instanceof Array) {
        if (target.length === 3) {
          target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
          target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
          target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        } else if (target.length === 4) {
          target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
          target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
          target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
          target[3] = this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
        }
      }
      if (target instanceof PVector) {
        target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
        target.y = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
        target.z = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
      }
      return target;
    },
    /**
     * @member PMatrix3D
     * The preApply() function applies another matrix to the left of this one. Note that either a PMatrix3D or elements of a matrix can be passed in.
     *
     * @param {PMatrix3D} matrix    the matrix to apply this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the second element of the matrix
     * @param {float} m02           the third element of the matrix
     * @param {float} m03           the fourth element of the matrix
     * @param {float} m10           the fifth element of the matrix
     * @param {float} m11           the sixth element of the matrix
     * @param {float} m12           the seventh element of the matrix
     * @param {float} m13           the eight element of the matrix
     * @param {float} m20           the nineth element of the matrix
     * @param {float} m21           the tenth element of the matrix
     * @param {float} m22           the eleventh element of the matrix
     * @param {float} m23           the twelveth element of the matrix
     * @param {float} m30           the thirteenth element of the matrix
     * @param {float} m31           the fourtheenth element of the matrix
     * @param {float} m32           the fivetheenth element of the matrix
     * @param {float} m33           the sixteenth element of the matrix
     */
    preApply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
        source = arguments[0].array();
      } else if (arguments.length === 16) {
        source = Array.prototype.slice.call(arguments);
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        source = arguments[0];
      }

      var result = [0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0];
      var e = 0;
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++, e++) {
          result[e] += this.elements[col + 0] * source[row * 4 + 0] + this.elements[col + 4] *
                       source[row * 4 + 1] + this.elements[col + 8] * source[row * 4 + 2] +
                       this.elements[col + 12] * source[row * 4 + 3];
        }
      }
      this.elements = result.slice();
    },
    /**
     * @member PMatrix3D
     * The apply() function multiplies the current matrix by the one specified through the parameters. Note that either a PMatrix3D or a list of floats can be passed in.
     *
     * @param {PMatrix3D} matrix    the matrix to apply this matrix to
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the second element of the matrix
     * @param {float} m02           the third element of the matrix
     * @param {float} m03           the fourth element of the matrix
     * @param {float} m10           the fifth element of the matrix
     * @param {float} m11           the sixth element of the matrix
     * @param {float} m12           the seventh element of the matrix
     * @param {float} m13           the eight element of the matrix
     * @param {float} m20           the nineth element of the matrix
     * @param {float} m21           the tenth element of the matrix
     * @param {float} m22           the eleventh element of the matrix
     * @param {float} m23           the twelveth element of the matrix
     * @param {float} m30           the thirteenth element of the matrix
     * @param {float} m31           the fourtheenth element of the matrix
     * @param {float} m32           the fivetheenth element of the matrix
     * @param {float} m33           the sixteenth element of the matrix
     */
    apply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
        source = arguments[0].array();
      } else if (arguments.length === 16) {
        source = Array.prototype.slice.call(arguments);
      } else if (arguments.length === 1 && arguments[0] instanceof Array) {
        source = arguments[0];
      }

      var result = [0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0];
      var e = 0;
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++, e++) {
          result[e] += this.elements[row * 4 + 0] * source[col + 0] + this.elements[row * 4 + 1] *
                       source[col + 4] + this.elements[row * 4 + 2] * source[col + 8] +
                       this.elements[row * 4 + 3] * source[col + 12];
        }
      }
      this.elements = result.slice();
    },
    /**
     * @member PMatrix3D
     * The rotate() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotate: function(angle, v0, v1, v2) {
      if (!v1) {
        this.rotateZ(angle);
      } else {
        // TODO should make sure this vector is normalized
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1.0 - c;

        this.apply((t * v0 * v0) + c,
                   (t * v0 * v1) - (s * v2),
                   (t * v0 * v2) + (s * v1),
                   0,
                   (t * v0 * v1) + (s * v2),
                   (t * v1 * v1) + c,
                   (t * v1 * v2) - (s * v0),
                   0,
                   (t * v0 * v2) - (s * v1),
                   (t * v1 * v2) + (s * v0),
                   (t * v2 * v2) + c,
                   0,
                   0, 0, 0, 1);
      }
    },
    /**
     * @member PMatrix3D
     * The invApply() function applies the inverted matrix to this matrix.
     *
     * @param {float} m00           the first element of the matrix
     * @param {float} m01           the second element of the matrix
     * @param {float} m02           the third element of the matrix
     * @param {float} m03           the fourth element of the matrix
     * @param {float} m10           the fifth element of the matrix
     * @param {float} m11           the sixth element of the matrix
     * @param {float} m12           the seventh element of the matrix
     * @param {float} m13           the eight element of the matrix
     * @param {float} m20           the nineth element of the matrix
     * @param {float} m21           the tenth element of the matrix
     * @param {float} m22           the eleventh element of the matrix
     * @param {float} m23           the twelveth element of the matrix
     * @param {float} m30           the thirteenth element of the matrix
     * @param {float} m31           the fourtheenth element of the matrix
     * @param {float} m32           the fivetheenth element of the matrix
     * @param {float} m33           the sixteenth element of the matrix
     *
     * @return {boolean} returns true if the operation was successful.
     */
    invApply: function() {
      if (inverseCopy === undef) {
        inverseCopy = new PMatrix3D();
      }
      var a = arguments;
      inverseCopy.set(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8],
                      a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

      if (!inverseCopy.invert()) {
        return false;
      }
      this.preApply(inverseCopy);
      return true;
    },
    /**
     * @member PMatrix3D
     * The rotateZ() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotateX: function(angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.apply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
    },
    /**
     * @member PMatrix3D
     * The rotateY() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotateY: function(angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.apply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
    },
    /**
     * @member PMatrix3D
     * The rotateZ() function rotates the matrix.
     *
     * @param {float} angle         the angle of rotation in radiants
     */
    rotateZ: function(angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.apply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    },
    /**
     * @member PMatrix3D
     * The scale() function increases or decreases the size of a matrix by expanding and contracting vertices. When only one parameter is specified scale will occur in all dimensions.
     * This is equivalent to a three parameter call.
     *
     * @param {float} sx  the amount to scale on the x-axis
     * @param {float} sy  the amount to scale on the y-axis
     * @param {float} sz  the amount to scale on the z-axis
     */
    scale: function(sx, sy, sz) {
      if (sx && !sy && !sz) {
        sy = sz = sx;
      } else if (sx && sy && !sz) {
        sz = 1;
      }

      if (sx && sy && sz) {
        this.elements[0]  *= sx;
        this.elements[1]  *= sy;
        this.elements[2]  *= sz;
        this.elements[4]  *= sx;
        this.elements[5]  *= sy;
        this.elements[6]  *= sz;
        this.elements[8]  *= sx;
        this.elements[9]  *= sy;
        this.elements[10] *= sz;
        this.elements[12] *= sx;
        this.elements[13] *= sy;
        this.elements[14] *= sz;
      }
    },
    /**
     * @member PMatrix3D
     * The skewX() function skews the matrix along the x-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    skewX: function(angle) {
      var t = Math.tan(angle);
      this.apply(1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    /**
     * @member PMatrix3D
     * The skewY() function skews the matrix along the y-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of skew specified in radians
     */
    skewY: function(angle) {
      var t = Math.tan(angle);
      this.apply(1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    /**
     * @member PMatrix3D
     * The shearX() function shears the matrix along the x-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of shear specified in radians
     */
    shearX: function(angle) {
      var t = Math.tan(angle);
      this.apply(1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    /**
     * @member PMatrix3D
     * The shearY() function shears the matrix along the y-axis the amount specified by the angle parameter.
     * Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the <b>radians()</b> function.
     *
     * @param {float} angle  angle of shear specified in radians
     */
    shearY: function(angle) {
      var t = Math.tan(angle);
      this.apply(1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    multX: function(x, y, z, w) {
      if (!z) {
        return this.elements[0] * x + this.elements[1] * y + this.elements[3];
      }
      if (!w) {
        return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
      }
      return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
    },
    multY: function(x, y, z, w) {
      if (!z) {
        return this.elements[4] * x + this.elements[5] * y + this.elements[7];
      }
      if (!w) {
        return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
      }
      return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
    },
    multZ: function(x, y, z, w) {
      if (!w) {
        return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
      }
      return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
    },
    multW: function(x, y, z, w) {
      if (!w) {
        return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15];
      }
      return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
    },
    /**
     * @member PMatrix3D
     * The invert() function inverts this matrix
     *
     * @return {boolean} true if successful
     */
    invert: function() {
      var fA0 = this.elements[0] * this.elements[5] - this.elements[1] * this.elements[4];
      var fA1 = this.elements[0] * this.elements[6] - this.elements[2] * this.elements[4];
      var fA2 = this.elements[0] * this.elements[7] - this.elements[3] * this.elements[4];
      var fA3 = this.elements[1] * this.elements[6] - this.elements[2] * this.elements[5];
      var fA4 = this.elements[1] * this.elements[7] - this.elements[3] * this.elements[5];
      var fA5 = this.elements[2] * this.elements[7] - this.elements[3] * this.elements[6];
      var fB0 = this.elements[8] * this.elements[13] - this.elements[9] * this.elements[12];
      var fB1 = this.elements[8] * this.elements[14] - this.elements[10] * this.elements[12];
      var fB2 = this.elements[8] * this.elements[15] - this.elements[11] * this.elements[12];
      var fB3 = this.elements[9] * this.elements[14] - this.elements[10] * this.elements[13];
      var fB4 = this.elements[9] * this.elements[15] - this.elements[11] * this.elements[13];
      var fB5 = this.elements[10] * this.elements[15] - this.elements[11] * this.elements[14];

      // Determinant
      var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;

      // Account for a very small value
      // return false if not successful.
      if (Math.abs(fDet) <= 1e-9) {
        return false;
      }

      var kInv = [];
      kInv[0]  = +this.elements[5] * fB5 - this.elements[6] * fB4 + this.elements[7] * fB3;
      kInv[4]  = -this.elements[4] * fB5 + this.elements[6] * fB2 - this.elements[7] * fB1;
      kInv[8]  = +this.elements[4] * fB4 - this.elements[5] * fB2 + this.elements[7] * fB0;
      kInv[12] = -this.elements[4] * fB3 + this.elements[5] * fB1 - this.elements[6] * fB0;
      kInv[1]  = -this.elements[1] * fB5 + this.elements[2] * fB4 - this.elements[3] * fB3;
      kInv[5]  = +this.elements[0] * fB5 - this.elements[2] * fB2 + this.elements[3] * fB1;
      kInv[9]  = -this.elements[0] * fB4 + this.elements[1] * fB2 - this.elements[3] * fB0;
      kInv[13] = +this.elements[0] * fB3 - this.elements[1] * fB1 + this.elements[2] * fB0;
      kInv[2]  = +this.elements[13] * fA5 - this.elements[14] * fA4 + this.elements[15] * fA3;
      kInv[6]  = -this.elements[12] * fA5 + this.elements[14] * fA2 - this.elements[15] * fA1;
      kInv[10] = +this.elements[12] * fA4 - this.elements[13] * fA2 + this.elements[15] * fA0;
      kInv[14] = -this.elements[12] * fA3 + this.elements[13] * fA1 - this.elements[14] * fA0;
      kInv[3]  = -this.elements[9] * fA5 + this.elements[10] * fA4 - this.elements[11] * fA3;
      kInv[7]  = +this.elements[8] * fA5 - this.elements[10] * fA2 + this.elements[11] * fA1;
      kInv[11] = -this.elements[8] * fA4 + this.elements[9] * fA2 - this.elements[11] * fA0;
      kInv[15] = +this.elements[8] * fA3 - this.elements[9] * fA1 + this.elements[10] * fA0;

      // Inverse using Determinant
      var fInvDet = 1.0 / fDet;
      kInv[0]  *= fInvDet;
      kInv[1]  *= fInvDet;
      kInv[2]  *= fInvDet;
      kInv[3]  *= fInvDet;
      kInv[4]  *= fInvDet;
      kInv[5]  *= fInvDet;
      kInv[6]  *= fInvDet;
      kInv[7]  *= fInvDet;
      kInv[8]  *= fInvDet;
      kInv[9]  *= fInvDet;
      kInv[10] *= fInvDet;
      kInv[11] *= fInvDet;
      kInv[12] *= fInvDet;
      kInv[13] *= fInvDet;
      kInv[14] *= fInvDet;
      kInv[15] *= fInvDet;

      this.elements = kInv.slice();
      return true;
    },
    toString: function() {
      var str = "";
      for (var i = 0; i < 15; i++) {
        str += this.elements[i] + ", ";
      }
      str += this.elements[15];
      return str;
    },
    /**
     * @member PMatrix3D
     * The print() function prints out the elements of this matrix
     */
    print: function() {
      var digits = printMatrixHelper(this.elements);

      var output = ""   + p.nfs(this.elements[0], digits, 4)  + " " + p.nfs(this.elements[1], digits, 4)  +
                   " "  + p.nfs(this.elements[2], digits, 4)  + " " + p.nfs(this.elements[3], digits, 4)  +
                   "\n" + p.nfs(this.elements[4], digits, 4)  + " " + p.nfs(this.elements[5], digits, 4)  +
                   " "  + p.nfs(this.elements[6], digits, 4)  + " " + p.nfs(this.elements[7], digits, 4)  +
                   "\n" + p.nfs(this.elements[8], digits, 4)  + " " + p.nfs(this.elements[9], digits, 4)  +
                   " "  + p.nfs(this.elements[10], digits, 4) + " " + p.nfs(this.elements[11], digits, 4) +
                   "\n" + p.nfs(this.elements[12], digits, 4) + " " + p.nfs(this.elements[13], digits, 4) +
                   " "  + p.nfs(this.elements[14], digits, 4) + " " + p.nfs(this.elements[15], digits, 4) + "\n\n";
      p.println(output);
    },
    invTranslate: function(tx, ty, tz) {
      this.preApply(1, 0, 0, -tx, 0, 1, 0, -ty, 0, 0, 1, -tz, 0, 0, 0, 1);
    },
    invRotateX: function(angle) {
      var c = Math.cos(-angle);
      var s = Math.sin(-angle);
      this.preApply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
    },
    invRotateY: function(angle) {
      var c = Math.cos(-angle);
      var s = Math.sin(-angle);
      this.preApply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
    },
    invRotateZ: function(angle) {
      var c = Math.cos(-angle);
      var s = Math.sin(-angle);
      this.preApply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    },
    invScale: function(x, y, z) {
      this.preApply([1 / x, 0, 0, 0, 0, 1 / y, 0, 0, 0, 0, 1 / z, 0, 0, 0, 0, 1]);
    }
  };

  return PMatrix3D;
};
},{}],15:[function(require,module,exports){
module.exports = function(options) {
  var PConstants = options.PConstants,
      PMatrix2D = options.PMatrix2D,
      PMatrix3D = options.PMatrix3D;

  /**
   * Datatype for storing shapes. Processing can currently load and display SVG (Scalable Vector Graphics) shapes.
   * Before a shape is used, it must be loaded with the <b>loadShape()</b> function. The <b>shape()</b> function is used to draw the shape to the display window.
   * The <b>PShape</b> object contain a group of methods, linked below, that can operate on the shape data.
   * <br><br>The <b>loadShape()</b> method supports SVG files created with Inkscape and Adobe Illustrator.
   * It is not a full SVG implementation, but offers some straightforward support for handling vector data.
   *
   * @param {int} family the shape type, one of GROUP, PRIMITIVE, PATH, or GEOMETRY
   *
   * @see #shape()
   * @see #loadShape()
   * @see #shapeMode()
   */
  var PShape = function(family) {
    this.family    = family || PConstants.GROUP;
    this.visible   = true;
    this.style     = true;
    this.children  = [];
    this.nameTable = [];
    this.params    = [];
    this.name      = "";
    this.image     = null;  //type PImage
    this.matrix    = null;
    this.kind      = null;
    this.close     = null;
    this.width     = null;
    this.height    = null;
    this.parent    = null;
  };
  /**
    * PShape methods
    * missing: findChild(), apply(), contains(), findChild(), getPrimitive(), getParams(), getVertex() , getVertexCount(),
    * getVertexCode() , getVertexCodes() , getVertexCodeCount(), getVertexX(), getVertexY(), getVertexZ()
    */
  PShape.prototype = {
    /**
     * @member PShape
     * The isVisible() function returns a boolean value "true" if the image is set to be visible, "false" if not. This is modified with the <b>setVisible()</b> parameter.
     * <br><br>The visibility of a shape is usually controlled by whatever program created the SVG file.
     * For instance, this parameter is controlled by showing or hiding the shape in the layers palette in Adobe Illustrator.
     *
     * @return {boolean}  returns "true" if the image is set to be visible, "false" if not
     */
    isVisible: function(){
      return this.visible;
    },
    /**
     * @member PShape
     * The setVisible() function sets the shape to be visible or invisible. This is determined by the value of the <b>visible</b> parameter.
     * <br><br>The visibility of a shape is usually controlled by whatever program created the SVG file.
     * For instance, this parameter is controlled by showing or hiding the shape in the layers palette in Adobe Illustrator.
     *
     * @param {boolean} visible "false" makes the shape invisible and "true" makes it visible
     */
    setVisible: function (visible){
      this.visible = visible;
    },
    /**
     * @member PShape
     * The disableStyle() function disables the shape's style data and uses Processing's current styles. Styles include attributes such as colors, stroke weight, and stroke joints.
     * Overrides this shape's style information and uses PGraphics styles and colors. Identical to ignoreStyles(true). Also disables styles for all child shapes.
     */
    disableStyle: function(){
      this.style = false;
      for(var i = 0, j=this.children.length; i<j; i++) {
        this.children[i].disableStyle();
      }
    },
    /**
     * @member PShape
     * The enableStyle() function enables the shape's style data and ignores Processing's current styles. Styles include attributes such as colors, stroke weight, and stroke joints.
     */
    enableStyle: function(){
      this.style = true;
      for(var i = 0, j=this.children.length; i<j; i++) {
        this.children[i].enableStyle();
      }
    },
    /**
     * @member PShape
     * The getFamily function returns the shape type
     *
     * @return {int} the shape type, one of GROUP, PRIMITIVE, PATH, or GEOMETRY
     */
    getFamily: function(){
      return this.family;
    },
    /**
     * @member PShape
     * The getWidth() function gets the width of the drawing area (not necessarily the shape boundary).
     */
    getWidth: function(){
      return this.width;
    },
    /**
     * @member PShape
     * The getHeight() function gets the height of the drawing area (not necessarily the shape boundary).
     */
    getHeight: function(){
      return this.height;
    },
    /**
     * @member PShape
     * The setName() function sets the name of the shape
     *
     * @param {String} name the name of the shape
     */
    setName: function(name){
      this.name = name;
    },
    /**
     * @member PShape
     * The getName() function returns the name of the shape
     *
     * @return {String} the name of the shape
     */
    getName: function(){
      return this.name;
    },
    /**
     * @member PShape
     * Called by the following (the shape() command adds the g)
     * PShape s = loadShapes("blah.svg");
     * shape(s);
     */
    draw: function(renderContext) {
      if(!renderContext) {
        throw "render context missing for draw() in PShape";
      }
      if (this.visible) {
        this.pre(renderContext);
        this.drawImpl(renderContext);
        this.post(renderContext);
      }
    },
    /**
     * @member PShape
     * the drawImpl() function draws the SVG document.
     */
    drawImpl: function(renderContext) {
      if (this.family === PConstants.GROUP) {
        this.drawGroup(renderContext);
      } else if (this.family === PConstants.PRIMITIVE) {
        this.drawPrimitive(renderContext);
      } else if (this.family === PConstants.GEOMETRY) {
        this.drawGeometry(renderContext);
      } else if (this.family === PConstants.PATH) {
        this.drawPath(renderContext);
      }
    },
    /**
     * @member PShape
     * The drawPath() function draws the <path> part of the SVG document.
     */
    drawPath: function(renderContext) {
      var i, j;
      if (this.vertices.length === 0) { return; }
      renderContext.beginShape();
      if (this.vertexCodes.length === 0) {  // each point is a simple vertex
        if (this.vertices[0].length === 2) {  // drawing 2D vertices
          for (i = 0, j = this.vertices.length; i < j; i++) {
            renderContext.vertex(this.vertices[i][0], this.vertices[i][1]);
          }
        } else {  // drawing 3D vertices
          for (i = 0, j = this.vertices.length; i < j; i++) {
            renderContext.vertex(this.vertices[i][0],
                                 this.vertices[i][1],
                                 this.vertices[i][2]);
          }
        }
      } else {  // coded set of vertices
        var index = 0;
        if (this.vertices[0].length === 2) {  // drawing a 2D path
          for (i = 0, j = this.vertexCodes.length; i < j; i++) {
            if (this.vertexCodes[i] === PConstants.VERTEX) {
              renderContext.vertex(this.vertices[index][0], this.vertices[index][1], this.vertices[index].moveTo);
              renderContext.breakShape = false;
              index++;
            } else if (this.vertexCodes[i] === PConstants.BEZIER_VERTEX) {
              renderContext.bezierVertex(this.vertices[index+0][0],
                                         this.vertices[index+0][1],
                                         this.vertices[index+1][0],
                                         this.vertices[index+1][1],
                                         this.vertices[index+2][0],
                                         this.vertices[index+2][1]);
              index += 3;
            } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
              renderContext.curveVertex(this.vertices[index][0],
                                        this.vertices[index][1]);
              index++;
            } else if (this.vertexCodes[i] ===  PConstants.BREAK) {
              renderContext.breakShape = true;
            }
          }
        } else {  // drawing a 3D path
          for (i = 0, j = this.vertexCodes.length; i < j; i++) {
            if (this.vertexCodes[i] === PConstants.VERTEX) {
              renderContext.vertex(this.vertices[index][0],
                                   this.vertices[index][1],
                                   this.vertices[index][2]);
              if (this.vertices[index].moveTo === true) {
                vertArray[vertArray.length-1].moveTo = true;
              } else if (this.vertices[index].moveTo === false) {
                vertArray[vertArray.length-1].moveTo = false;
              }
              renderContext.breakShape = false;
            } else if (this.vertexCodes[i] ===  PConstants.BEZIER_VERTEX) {
              renderContext.bezierVertex(this.vertices[index+0][0],
                                         this.vertices[index+0][1],
                                         this.vertices[index+0][2],
                                         this.vertices[index+1][0],
                                         this.vertices[index+1][1],
                                         this.vertices[index+1][2],
                                         this.vertices[index+2][0],
                                         this.vertices[index+2][1],
                                         this.vertices[index+2][2]);
              index += 3;
            } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
              renderContext.curveVertex(this.vertices[index][0],
                                        this.vertices[index][1],
                                        this.vertices[index][2]);
              index++;
            } else if (this.vertexCodes[i] === PConstants.BREAK) {
              renderContext.breakShape = true;
            }
          }
        }
      }
      renderContext.endShape(this.close ? PConstants.CLOSE : PConstants.OPEN);
    },
    /**
     * @member PShape
     * The drawGeometry() function draws the geometry part of the SVG document.
     */
    drawGeometry: function(renderContext) {
      var i, j;
      renderContext.beginShape(this.kind);
      if (this.style) {
        for (i = 0, j = this.vertices.length; i < j; i++) {
          renderContext.vertex(this.vertices[i]);
        }
      } else {
        for (i = 0, j = this.vertices.length; i < j; i++) {
          var vert = this.vertices[i];
          if (vert[2] === 0) {
            renderContext.vertex(vert[0], vert[1]);
          } else {
            renderContext.vertex(vert[0], vert[1], vert[2]);
          }
        }
      }
      renderContext.endShape();
    },
    /**
     * @member PShape
     * The drawGroup() function draws the <g> part of the SVG document.
     */
    drawGroup: function(renderContext) {
      for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].draw(renderContext);
      }
    },
    /**
     * @member PShape
     * The drawPrimitive() function draws SVG document shape elements. These can be point, line, triangle, quad, rect, ellipse, arc, box, or sphere.
     */
    drawPrimitive: function(renderContext) {
      if (this.kind === PConstants.POINT) {
        renderContext.point(this.params[0], this.params[1]);
      } else if (this.kind === PConstants.LINE) {
        if (this.params.length === 4) {  // 2D
          renderContext.line(this.params[0], this.params[1],
                            this.params[2], this.params[3]);
        } else {  // 3D
          renderContext.line(this.params[0], this.params[1], this.params[2],
                             this.params[3], this.params[4], this.params[5]);
        }
      } else if (this.kind === PConstants.TRIANGLE) {
        renderContext.triangle(this.params[0], this.params[1],
                               this.params[2], this.params[3],
                               this.params[4], this.params[5]);
      } else if (this.kind === PConstants.QUAD) {
        renderContext.quad(this.params[0], this.params[1],
                           this.params[2], this.params[3],
                           this.params[4], this.params[5],
                           this.params[6], this.params[7]);
      } else if (this.kind === PConstants.RECT) {
        if (this.image !== null) {
          var imMode = imageModeConvert;
          renderContext.imageMode(PConstants.CORNER);
          renderContext.image(this.image,
                              this.params[0],
                              this.params[1],
                              this.params[2],
                              this.params[3]);
          imageModeConvert = imMode;
        } else {
          var rcMode = renderContext.curRectMode;
          renderContext.rectMode(PConstants.CORNER);
          renderContext.rect(this.params[0],
                             this.params[1],
                             this.params[2],
                             this.params[3]);
          renderContext.curRectMode = rcMode;
        }
      } else if (this.kind === PConstants.ELLIPSE) {
        var elMode = renderContext.curEllipseMode;
        renderContext.ellipseMode(PConstants.CORNER);
        renderContext.ellipse(this.params[0],
                              this.params[1],
                              this.params[2],
                              this.params[3]);
        renderContext.curEllipseMode = elMode;
      } else if (this.kind === PConstants.ARC) {
        var eMode = curEllipseMode;
        renderContext.ellipseMode(PConstants.CORNER);
        renderContext.arc(this.params[0],
                          this.params[1],
                          this.params[2],
                          this.params[3],
                          this.params[4],
                          this.params[5]);
        curEllipseMode = eMode;
      } else if (this.kind === PConstants.BOX) {
        if (this.params.length === 1) {
          renderContext.box(this.params[0]);
        } else {
          renderContext.box(this.params[0], this.params[1], this.params[2]);
        }
      } else if (this.kind === PConstants.SPHERE) {
        renderContext.sphere(this.params[0]);
      }
    },
    /**
     * @member PShape
     * The pre() function performs the preparations before the SVG is drawn. This includes doing transformations and storing previous styles.
     */
    pre: function(renderContext) {
      if (this.matrix) {
        renderContext.pushMatrix();
        renderContext.transform(this.matrix);
      }
      if (this.style) {
        renderContext.pushStyle();
        this.styles(renderContext);
      }
    },
    /**
     * @member PShape
     * The post() function performs the necessary actions after the SVG is drawn. This includes removing transformations and removing added styles.
     */
    post: function(renderContext) {
      if (this.matrix) {
        renderContext.popMatrix();
      }
      if (this.style) {
        renderContext.popStyle();
      }
    },
    /**
     * @member PShape
     * The styles() function changes the Processing's current styles
     */
    styles: function(renderContext) {
      if (this.stroke) {
        renderContext.stroke(this.strokeColor);
        renderContext.strokeWeight(this.strokeWeight);
        renderContext.strokeCap(this.strokeCap);
        renderContext.strokeJoin(this.strokeJoin);
      } else {
        renderContext.noStroke();
      }

      if (this.fill) {
        renderContext.fill(this.fillColor);

      } else {
        renderContext.noFill();
      }
    },
    /**
     * @member PShape
     * The getChild() function extracts a child shape from a parent shape. Specify the name of the shape with the <b>target</b> parameter or the
     * layer position of the shape to get with the <b>index</b> parameter.
     * The shape is returned as a <b>PShape</b> object, or <b>null</b> is returned if there is an error.
     *
     * @param {String} target   the name of the shape to get
     * @param {int} index   the layer position of the shape to get
     *
     * @return {PShape} returns a child element of a shape as a PShape object or null if there is an error
     */
    getChild: function(child) {
      var i, j;
      if (typeof child === 'number') {
        return this.children[child];
      }
      var found;
      if(child === "" || this.name === child){
        return this;
      }
      if(this.nameTable.length > 0) {
        for(i = 0, j = this.nameTable.length; i < j || found; i++) {
          if(this.nameTable[i].getName === child) {
            found = this.nameTable[i];
            break;
          }
        }
        if (found) { return found; }
      }
      for(i = 0, j = this.children.length; i < j; i++) {
        found = this.children[i].getChild(child);
        if(found) { return found; }
      }
      return null;
    },
    /**
     * @member PShape
     * The getChildCount() returns the number of children
     *
     * @return {int} returns a count of children
     */
    getChildCount: function () {
      return this.children.length;
    },
    /**
     * @member PShape
     * The addChild() adds a child to the PShape.
     *
     * @param {PShape} child the child to add
     */
    addChild: function( child ) {
      this.children.push(child);
      child.parent = this;
      if (child.getName() !== null) {
        this.addName(child.getName(), child);
      }
    },
    /**
     * @member PShape
     * The addName() functions adds a shape to the name lookup table.
     *
     * @param {String} name   the name to be added
     * @param {PShape} shape  the shape
     */
    addName: function(name,  shape) {
      if (this.parent !== null) {
        this.parent.addName( name, shape );
      } else {
        this.nameTable.push( [name, shape] );
      }
    },
    /**
     * @member PShape
     * The translate() function specifies an amount to displace the shape. The <b>x</b> parameter specifies left/right translation, the <b>y</b> parameter specifies up/down translation, and the <b>z</b> parameter specifies translations toward/away from the screen.
     * Subsequent calls to the method accumulates the effect. For example, calling <b>translate(50, 0)</b> and then <b>translate(20, 0)</b> is the same as <b>translate(70, 0)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * <br><br>Using this method with the <b>z</b> parameter requires using the P3D or OPENGL parameter in combination with size.
     *
     * @param {int|float} x left/right translation
     * @param {int|float} y up/down translation
     * @param {int|float} z forward/back translation
     *
     * @see PMatrix2D#translate
     * @see PMatrix3D#translate
     */
    translate: function() {
      if(arguments.length === 2)
      {
        this.checkMatrix(2);
        this.matrix.translate(arguments[0], arguments[1]);
      } else {
        this.checkMatrix(3);
        this.matrix.translate(arguments[0], arguments[1], 0);
      }
    },
    /**
     * @member PShape
     * The checkMatrix() function makes sure that the shape's matrix is 1) not null, and 2) has a matrix
     * that can handle <em>at least</em> the specified number of dimensions.
     *
     * @param {int} dimensions the specified number of dimensions
     */
    checkMatrix: function(dimensions) {
      if(this.matrix === null) {
        if(dimensions === 2) {
          this.matrix = new PMatrix2D();
        } else {
          this.matrix = new PMatrix3D();
        }
      }else if(dimensions === 3 && this.matrix instanceof PMatrix2D) {
        this.matrix = new PMatrix3D();
      }
    },
    /**
     * @member PShape
     * The rotateX() function rotates a shape around the x-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
     * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
     * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateX(HALF_PI)</b> and then <b>rotateX(HALF_PI)</b> is the same as <b>rotateX(PI)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
     *
     * @param {float}angle angle of rotation specified in radians
     *
     * @see PMatrix3D#rotateX
     */
    rotateX: function(angle) {
      this.rotate(angle, 1, 0, 0);
    },
    /**
     * @member PShape
     * The rotateY() function rotates a shape around the y-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
     * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
     * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateY(HALF_PI)</b> and then <b>rotateY(HALF_PI)</b> is the same as <b>rotateY(PI)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
     *
     * @param {float}angle angle of rotation specified in radians
     *
     * @see PMatrix3D#rotateY
     */
    rotateY: function(angle) {
      this.rotate(angle, 0, 1, 0);
    },
    /**
     * @member PShape
     * The rotateZ() function rotates a shape around the z-axis the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
     * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
     * Subsequent calls to the method accumulates the effect. For example, calling <b>rotateZ(HALF_PI)</b> and then <b>rotateZ(HALF_PI)</b> is the same as <b>rotateZ(PI)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * <br><br>This method requires a 3D renderer. You need to pass P3D or OPENGL as a third parameter into the <b>size()</b> method as shown in the example above.
     *
     * @param {float}angle angle of rotation specified in radians
     *
     * @see PMatrix3D#rotateZ
     */
    rotateZ: function(angle) {
      this.rotate(angle, 0, 0, 1);
    },
    /**
     * @member PShape
     * The rotate() function rotates a shape the amount specified by the <b>angle</b> parameter. Angles should be specified in radians (values from 0 to TWO_PI) or converted to radians with the <b>radians()</b> method.
     * <br><br>Shapes are always rotated around the upper-left corner of their bounding box. Positive numbers rotate objects in a clockwise direction.
     * Transformations apply to everything that happens after and subsequent calls to the method accumulates the effect.
     * For example, calling <b>rotate(HALF_PI)</b> and then <b>rotate(HALF_PI)</b> is the same as <b>rotate(PI)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * If optional parameters x,y,z are supplied, the rotate is about the point (x, y, z).
     *
     * @param {float}angle  angle of rotation specified in radians
     * @param {float}x      x-coordinate of the point
     * @param {float}y      y-coordinate of the point
     * @param {float}z      z-coordinate of the point
     * @see PMatrix2D#rotate
     * @see PMatrix3D#rotate
     */
    rotate: function() {
      if(arguments.length === 1){
        this.checkMatrix(2);
        this.matrix.rotate(arguments[0]);
      } else {
        this.checkMatrix(3);
        this.matrix.rotate(arguments[0],
                           arguments[1],
                           arguments[2],
                           arguments[3]);
      }
    },
    /**
     * @member PShape
     * The scale() function increases or decreases the size of a shape by expanding and contracting vertices. Shapes always scale from the relative origin of their bounding box.
     * Scale values are specified as decimal percentages. For example, the method call <b>scale(2.0)</b> increases the dimension of a shape by 200%.
     * Subsequent calls to the method multiply the effect. For example, calling <b>scale(2.0)</b> and then <b>scale(1.5)</b> is the same as <b>scale(3.0)</b>.
     * This transformation is applied directly to the shape, it's not refreshed each time <b>draw()</b> is run.
     * <br><br>Using this fuction with the <b>z</b> parameter requires passing P3D or OPENGL into the size() parameter.
     *
     * @param {float}s      percentage to scale the object
     * @param {float}x      percentage to scale the object in the x-axis
     * @param {float}y      percentage to scale the object in the y-axis
     * @param {float}z      percentage to scale the object in the z-axis
     *
     * @see PMatrix2D#scale
     * @see PMatrix3D#scale
     */
    scale: function() {
      if(arguments.length === 2) {
        this.checkMatrix(2);
        this.matrix.scale(arguments[0], arguments[1]);
      } else if (arguments.length === 3) {
        this.checkMatrix(2);
        this.matrix.scale(arguments[0], arguments[1], arguments[2]);
      } else {
        this.checkMatrix(2);
        this.matrix.scale(arguments[0]);
      }
    },
    /**
     * @member PShape
     * The resetMatrix() function resets the matrix
     *
     * @see PMatrix2D#reset
     * @see PMatrix3D#reset
     */
    resetMatrix: function() {
      this.checkMatrix(2);
      this.matrix.reset();
    },
    /**
     * @member PShape
     * The applyMatrix() function multiplies this matrix by another matrix of type PMatrix3D or PMatrix2D.
     * Individual elements can also be provided
     *
     * @param {PMatrix3D|PMatrix2D} matrix   the matrix to multiply by
     *
     * @see PMatrix2D#apply
     * @see PMatrix3D#apply
     */
    applyMatrix: function(matrix) {
      if (arguments.length === 1) {
        this.applyMatrix(matrix.elements[0],
                         matrix.elements[1], 0,
                         matrix.elements[2],
                         matrix.elements[3],
                         matrix.elements[4], 0,
                         matrix.elements[5],
                         0, 0, 1, 0,
                         0, 0, 0, 1);
      } else if (arguments.length === 6) {
        this.checkMatrix(2);
        this.matrix.apply(arguments[0], arguments[1], arguments[2], 0,
                          arguments[3], arguments[4], arguments[5], 0,
                          0,   0,   1,   0,
                          0,   0,   0,   1);

      } else if (arguments.length === 16) {
        this.checkMatrix(3);
        this.matrix.apply(arguments[0],
                          arguments[1],
                          arguments[2],
                          arguments[3],
                          arguments[4],
                          arguments[5],
                          arguments[6],
                          arguments[7],
                          arguments[8],
                          arguments[9],
                          arguments[10],
                          arguments[11],
                          arguments[12],
                          arguments[13],
                          arguments[14],
                          arguments[15]);
      }
    }
  };

  return PShape;
};
},{}],16:[function(require,module,exports){
/**
 * SVG stands for Scalable Vector Graphics, a portable graphics format. It is
 * a vector format so it allows for infinite resolution and relatively small
 * file sizes. Most modern media software can view SVG files, including Adobe
 * products, Firefox, etc. Illustrator and Inkscape can edit SVG files.
 *
 * @param {PApplet} parent     typically use "this"
 * @param {String} filename    name of the SVG file to load
 * @param {XMLElement} xml     an XMLElement element
 * @param {PShapeSVG} parent   the parent PShapeSVG
 *
 * @see PShape
 */
module.exports = function(options) {
  var CommonFunctions = options.CommonFunctions,
      PConstants = options.PConstants,
      PShape = options.PShape,
      XMLElement = options.XMLElement,
      colors = options.colors;

  var PShapeSVG = function() {
    PShape.call(this);                // PShape is the base class.
    if (arguments.length === 1) {     // xml element coming in
      this.element  = arguments[0];

      // set values to their defaults according to the SVG spec
      this.vertexCodes         = [];
      this.vertices            = [];
      this.opacity             = 1;

      this.stroke              = false;
      this.strokeColor         = PConstants.ALPHA_MASK;
      this.strokeWeight        = 1;
      this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
      this.strokeJoin          = PConstants.MITER;
      this.strokeGradient      = null;
      this.strokeGradientPaint = null;
      this.strokeName          = null;
      this.strokeOpacity       = 1;

      this.fill                = true;
      this.fillColor           = PConstants.ALPHA_MASK;
      this.fillGradient        = null;
      this.fillGradientPaint   = null;
      this.fillName            = null;
      this.fillOpacity         = 1;

      if (this.element.getName() !== "svg") {
        throw("root is not <svg>, it's <" + this.element.getName() + ">");
      }
    }
    else if (arguments.length === 2) {
      if (typeof arguments[1] === 'string') {
        if (arguments[1].indexOf(".svg") > -1) { //its a filename
          this.element = new XMLElement(true, arguments[1]);
          // set values to their defaults according to the SVG spec
          this.vertexCodes         = [];
          this.vertices            = [];
          this.opacity             = 1;

          this.stroke              = false;
          this.strokeColor         = PConstants.ALPHA_MASK;
          this.strokeWeight        = 1;
          this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
          this.strokeJoin          = PConstants.MITER;
          this.strokeGradient      = "";
          this.strokeGradientPaint = "";
          this.strokeName          = "";
          this.strokeOpacity       = 1;

          this.fill                = true;
          this.fillColor           = PConstants.ALPHA_MASK;
          this.fillGradient        = null;
          this.fillGradientPaint   = null;
          this.fillOpacity         = 1;

        }
      } else { // XMLElement
        if (arguments[0]) { // PShapeSVG
          this.element             = arguments[1];
          this.vertexCodes         = arguments[0].vertexCodes.slice();
          this.vertices            = arguments[0].vertices.slice();

          this.stroke              = arguments[0].stroke;
          this.strokeColor         = arguments[0].strokeColor;
          this.strokeWeight        = arguments[0].strokeWeight;
          this.strokeCap           = arguments[0].strokeCap;
          this.strokeJoin          = arguments[0].strokeJoin;
          this.strokeGradient      = arguments[0].strokeGradient;
          this.strokeGradientPaint = arguments[0].strokeGradientPaint;
          this.strokeName          = arguments[0].strokeName;

          this.fill                = arguments[0].fill;
          this.fillColor           = arguments[0].fillColor;
          this.fillGradient        = arguments[0].fillGradient;
          this.fillGradientPaint   = arguments[0].fillGradientPaint;
          this.fillName            = arguments[0].fillName;
          this.strokeOpacity       = arguments[0].strokeOpacity;
          this.fillOpacity         = arguments[0].fillOpacity;
          this.opacity             = arguments[0].opacity;
        }
      }
    }

    this.name      = this.element.getStringAttribute("id");
    var displayStr = this.element.getStringAttribute("display", "inline");
    this.visible   = displayStr !== "none";
    var str = this.element.getAttribute("transform");
    if (str) {
      this.matrix = this.parseMatrix(str);
    }
    // not proper parsing of the viewBox, but will cover us for cases where
    // the width and height of the object is not specified
    var viewBoxStr = this.element.getStringAttribute("viewBox");
    if ( viewBoxStr !== null ) {
      var viewBox = viewBoxStr.split(" ");
      this.width  = viewBox[2];
      this.height = viewBox[3];
    }

    // TODO if viewbox is not same as width/height, then use it to scale
    // the original objects. for now, viewbox only used when width/height
    // are empty values (which by the spec means w/h of "100%"
    var unitWidth  = this.element.getStringAttribute("width");
    var unitHeight = this.element.getStringAttribute("height");
    if (unitWidth !== null) {
      this.width  = this.parseUnitSize(unitWidth);
      this.height = this.parseUnitSize(unitHeight);
    } else {
      if ((this.width === 0) || (this.height === 0)) {
        // For the spec, the default is 100% and 100%. For purposes
        // here, insert a dummy value because this is prolly just a
        // font or something for which the w/h doesn't matter.
        this.width  = 1;
        this.height = 1;

        //show warning
        throw("The width and/or height is not " +
              "readable in the <svg> tag of this file.");
      }
    }
    this.parseColors(this.element);
    this.parseChildren(this.element);

  };
  /**
   * PShapeSVG methods
   * missing: getChild(), print(), parseStyleAttributes(), styles() - deals with strokeGradient and fillGradient
   */
  PShapeSVG.prototype = new PShape();
  /**
   * @member PShapeSVG
   * The parseMatrix() function parses the specified SVG matrix into a PMatrix2D. Note that PMatrix2D
   * is rotated relative to the SVG definition, so parameters are rearranged
   * here. More about the transformation matrices in
   * <a href="http://www.w3.org/TR/SVG/coords.html#TransformAttribute">this section</a>
   * of the SVG documentation.
   *
   * @param {String} str text of the matrix param.
   *
   * @return {PMatrix2D} a PMatrix2D
   */
  PShapeSVG.prototype.parseMatrix = (function() {
    function getCoords(s) {
      var m = [];
      s.replace(/\((.*?)\)/, (function() {
        return function(all, params) {
          // get the coordinates that can be separated by spaces or a comma
          m = params.replace(/,+/g, " ").split(/\s+/);
        };
      }()));
      return m;
    }

    return function(str) {
      this.checkMatrix(2);
      var pieces = [];
      str.replace(/\s*(\w+)\((.*?)\)/g, function(all) {
        // get a list of transform definitions
        pieces.push(CommonFunctions.trim(all));
      });
      if (pieces.length === 0) {
        return null;
      }

      for (var i = 0, j = pieces.length; i < j; i++) {
        var m = getCoords(pieces[i]);

        if (pieces[i].indexOf("matrix") !== -1) {
          this.matrix.set(m[0], m[2], m[4], m[1], m[3], m[5]);
        } else if (pieces[i].indexOf("translate") !== -1) {
          var tx = m[0];
          var ty = (m.length === 2) ? m[1] : 0;
          this.matrix.translate(tx,ty);
        } else if (pieces[i].indexOf("scale") !== -1) {
          var sx = m[0];
          var sy = (m.length === 2) ? m[1] : m[0];
          this.matrix.scale(sx,sy);
        } else if (pieces[i].indexOf("rotate") !== -1) {
          var angle = m[0];
          if (m.length === 1) {
            this.matrix.rotate(CommonFunctions.radians(angle));
          } else if (m.length === 3) {
            this.matrix.translate(m[1], m[2]);
            this.matrix.rotate(CommonFunctions.radians(m[0]));
            this.matrix.translate(-m[1], -m[2]);
          }
        } else if (pieces[i].indexOf("skewX") !== -1) {
          this.matrix.skewX(parseFloat(m[0]));
        } else if (pieces[i].indexOf("skewY") !== -1) {
          this.matrix.skewY(m[0]);
        } else if (pieces[i].indexOf("shearX") !== -1) {
          this.matrix.shearX(m[0]);
        } else if (pieces[i].indexOf("shearY") !== -1) {
          this.matrix.shearY(m[0]);
        }
      }
      return this.matrix;
    };
  }());

  /**
   * @member PShapeSVG
   * The parseChildren() function parses the specified XMLElement
   *
   * @param {XMLElement}element the XMLElement to parse
   */
  PShapeSVG.prototype.parseChildren = function(element) {
    var newelement = element.getChildren();
    var base = new PShape();
    var i, j;
    for (i = 0, j = newelement.length; i < j; i++) {
      var kid = this.parseChild(newelement[i]);
      if (kid) {
        base.addChild(kid);
      }
    }
    for (i = 0, j = base.children.length; i < j; i++) {
      this.children.push(base.children[i]);
    }
  };
  /**
   * @member PShapeSVG
   * The getName() function returns the name
   *
   * @return {String} the name
   */
  PShapeSVG.prototype.getName = function() {
    return this.name;
  };
  /**
   * @member PShapeSVG
   * The parseChild() function parses a child XML element.
   *
   * @param {XMLElement} elem the element to parse
   *
   * @return {PShape} the newly created PShape
   */
  PShapeSVG.prototype.parseChild = function( elem ) {
    var name = elem.getName();
    var shape;
    if (name === "g") {
      shape = new PShapeSVG(this, elem);
    } else if (name === "defs") {
      // generally this will contain gradient info, so may
      // as well just throw it into a group element for parsing
      shape = new PShapeSVG(this, elem);
    } else if (name === "line") {
      shape = new PShapeSVG(this, elem);
      shape.parseLine();
    } else if (name === "circle") {
      shape = new PShapeSVG(this, elem);
      shape.parseEllipse(true);
    } else if (name === "ellipse") {
      shape = new PShapeSVG(this, elem);
      shape.parseEllipse(false);
    } else if (name === "rect") {
      shape = new PShapeSVG(this, elem);
      shape.parseRect();
    } else if (name === "polygon") {
      shape = new PShapeSVG(this, elem);
      shape.parsePoly(true);
    } else if (name === "polyline") {
      shape = new PShapeSVG(this, elem);
      shape.parsePoly(false);
    } else if (name === "path") {
      shape = new PShapeSVG(this, elem);
      shape.parsePath();
    } else if (name === "radialGradient") {
      //return new RadialGradient(this, elem);
      unimplemented('PShapeSVG.prototype.parseChild, name = radialGradient');
    } else if (name === "linearGradient") {
      //return new LinearGradient(this, elem);
      unimplemented('PShapeSVG.prototype.parseChild, name = linearGradient');
    } else if (name === "text") {
      unimplemented('PShapeSVG.prototype.parseChild, name = text');
    } else if (name === "filter") {
      unimplemented('PShapeSVG.prototype.parseChild, name = filter');
    } else if (name === "mask") {
      unimplemented('PShapeSVG.prototype.parseChild, name = mask');
    } else {
      // ignoring
    }
    return shape;
  };
  /**
   * @member PShapeSVG
   * The parsePath() function parses the <path> element of the svg file
   * A path is defined by including a path element which contains a d="(path data)" attribute, where the d attribute contains
   * the moveto, line, curve (both cubic and quadratic Beziers), arc and closepath instructions.
   **/
  PShapeSVG.prototype.parsePath = function() {
    this.family = PConstants.PATH;
    this.kind = 0;
    var pathDataChars = [];
    var c;
    //change multiple spaces and commas to single space
    var pathData = CommonFunctions.trim(this.element.getStringAttribute("d").replace(/[\s,]+/g,' '));
    if (pathData === null) {
      return;
    }
    pathData = pathData.split('');
    var cx     = 0,
        cy     = 0,
        ctrlX  = 0,
        ctrlY  = 0,
        ctrlX1 = 0,
        ctrlX2 = 0,
        ctrlY1 = 0,
        ctrlY2 = 0,
        endX   = 0,
        endY   = 0,
        ppx    = 0,
        ppy    = 0,
        px     = 0,
        py     = 0,
        i      = 0,
        valOf  = 0;
    var str = "";
    var tmpArray = [];
    var flag = false;
    var lastInstruction;
    var command;
    var j, k;
    while (i< pathData.length) {
      valOf = pathData[i].charCodeAt(0);
      if ((valOf >= 65 && valOf <= 90) || (valOf >= 97 && valOf <= 122)) {
        // if it's a letter
        // populate the tmpArray with coordinates
        j = i;
        i++;
        if (i < pathData.length) { // don't go over boundary of array
          tmpArray = [];
          valOf = pathData[i].charCodeAt(0);
          while (!((valOf >= 65 && valOf <= 90) ||
                   (valOf >= 97 && valOf <= 100) ||
                   (valOf >= 102 && valOf <= 122)) && flag === false) { // if its NOT a letter
            if (valOf === 32) { //if its a space and the str isn't empty
              // sometimes you get a space after the letter
              if (str !== "") {
                tmpArray.push(parseFloat(str));
                str = "";
              }
              i++;
            } else if (valOf === 45) { //if it's a -
              // allow for 'e' notation in numbers, e.g. 2.10e-9
              if (pathData[i-1].charCodeAt(0) === 101) {
                str += pathData[i].toString();
                i++;
              } else {
                // sometimes no space separator after (ex: 104.535-16.322)
                if (str !== "") {
                  tmpArray.push(parseFloat(str));
                }
                str = pathData[i].toString();
                i++;
              }
            } else {
              str += pathData[i].toString();
              i++;
            }
            if (i === pathData.length) { // don't go over boundary of array
              flag = true;
            } else {
              valOf = pathData[i].charCodeAt(0);
            }
          }
        }
        if (str !== "") {
          tmpArray.push(parseFloat(str));
          str = "";
        }
        command = pathData[j];
        valOf = command.charCodeAt(0);
        if (valOf === 77) {  // M - move to (absolute)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            cx = tmpArray[0];
            cy = tmpArray[1];
            this.parsePathMoveto(cx, cy);
            if (tmpArray.length > 2) {
              for (j = 2, k = tmpArray.length; j < k; j+=2) {
                // absolute line to
                cx = tmpArray[j];
                cy = tmpArray[j+1];
                this.parsePathLineto(cx,cy);
              }
            }
          }
        } else if (valOf === 109) {  // m - move to (relative)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            cx += tmpArray[0];
            cy += tmpArray[1];
            this.parsePathMoveto(cx,cy);
            if (tmpArray.length > 2) {
              for (j = 2, k = tmpArray.length; j < k; j+=2) {
                // relative line to
                cx += tmpArray[j];
                cy += tmpArray[j + 1];
                this.parsePathLineto(cx,cy);
              }
            }
          }
        } else if (valOf === 76) { // L - lineto (absolute)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=2) {
              cx = tmpArray[j];
              cy = tmpArray[j + 1];
              this.parsePathLineto(cx,cy);
            }
          }
        } else if (valOf === 108) { // l - lineto (relative)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=2) {
              cx += tmpArray[j];
              cy += tmpArray[j+1];
              this.parsePathLineto(cx,cy);
            }
          }
        } else if (valOf === 72) { // H - horizontal lineto (absolute)
          for (j = 0, k = tmpArray.length; j < k; j++) {
            // multiple x co-ordinates can be provided
            cx = tmpArray[j];
            this.parsePathLineto(cx, cy);
          }
        } else if (valOf === 104) { // h - horizontal lineto (relative)
          for (j = 0, k = tmpArray.length; j < k; j++) {
            // multiple x co-ordinates can be provided
            cx += tmpArray[j];
            this.parsePathLineto(cx, cy);
          }
        } else if (valOf === 86) { // V - vertical lineto (absolute)
          for (j = 0, k = tmpArray.length; j < k; j++) {
            // multiple y co-ordinates can be provided
            cy = tmpArray[j];
            this.parsePathLineto(cx, cy);
          }
        } else if (valOf === 118) { // v - vertical lineto (relative)
          for (j = 0, k = tmpArray.length; j < k; j++) {
            // multiple y co-ordinates can be provided
            cy += tmpArray[j];
            this.parsePathLineto(cx, cy);
          }
        } else if (valOf === 67) { // C - curve to (absolute)
          if (tmpArray.length >= 6 && tmpArray.length % 6 === 0) {
            // need one+ multiples of 6 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=6) {
              ctrlX1 = tmpArray[j];
              ctrlY1 = tmpArray[j + 1];
              ctrlX2 = tmpArray[j + 2];
              ctrlY2 = tmpArray[j + 3];
              endX   = tmpArray[j + 4];
              endY   = tmpArray[j + 5];
              this.parsePathCurveto(ctrlX1,
                                    ctrlY1,
                                    ctrlX2,
                                    ctrlY2,
                                    endX,
                                    endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 99) { // c - curve to (relative)
          if (tmpArray.length >= 6 && tmpArray.length % 6 === 0) {
            // need one+ multiples of 6 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=6) {
              ctrlX1 = cx + tmpArray[j];
              ctrlY1 = cy + tmpArray[j + 1];
              ctrlX2 = cx + tmpArray[j + 2];
              ctrlY2 = cy + tmpArray[j + 3];
              endX   = cx + tmpArray[j + 4];
              endY   = cy + tmpArray[j + 5];
              this.parsePathCurveto(ctrlX1,
                                    ctrlY1,
                                    ctrlX2,
                                    ctrlY2,
                                    endX,
                                    endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 83) { // S - curve to shorthand (absolute)
          if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
            // need one+ multiples of 4 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=4) {
              if (lastInstruction.toLowerCase() ===  "c" ||
                  lastInstruction.toLowerCase() ===  "s") {
                ppx    = this.vertices[ this.vertices.length-2 ][0];
                ppy    = this.vertices[ this.vertices.length-2 ][1];
                px     = this.vertices[ this.vertices.length-1 ][0];
                py     = this.vertices[ this.vertices.length-1 ][1];
                ctrlX1 = px + (px - ppx);
                ctrlY1 = py + (py - ppy);
              } else {
                //If there is no previous curve,
                //the current point will be used as the first control point.
                ctrlX1 = this.vertices[this.vertices.length-1][0];
                ctrlY1 = this.vertices[this.vertices.length-1][1];
              }
              ctrlX2 = tmpArray[j];
              ctrlY2 = tmpArray[j + 1];
              endX   = tmpArray[j + 2];
              endY   = tmpArray[j + 3];
              this.parsePathCurveto(ctrlX1,
                                    ctrlY1,
                                    ctrlX2,
                                    ctrlY2,
                                    endX,
                                    endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 115) { // s - curve to shorthand (relative)
          if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
            // need one+ multiples of 4 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=4) {
              if (lastInstruction.toLowerCase() ===  "c" ||
                  lastInstruction.toLowerCase() ===  "s") {
                ppx    = this.vertices[this.vertices.length-2][0];
                ppy    = this.vertices[this.vertices.length-2][1];
                px     = this.vertices[this.vertices.length-1][0];
                py     = this.vertices[this.vertices.length-1][1];
                ctrlX1 = px + (px - ppx);
                ctrlY1 = py + (py - ppy);
              } else {
                //If there is no previous curve,
                //the current point will be used as the first control point.
                ctrlX1 = this.vertices[this.vertices.length-1][0];
                ctrlY1 = this.vertices[this.vertices.length-1][1];
              }
              ctrlX2 = cx + tmpArray[j];
              ctrlY2 = cy + tmpArray[j + 1];
              endX   = cx + tmpArray[j + 2];
              endY   = cy + tmpArray[j + 3];
              this.parsePathCurveto(ctrlX1,
                                    ctrlY1,
                                    ctrlX2,
                                    ctrlY2,
                                    endX,
                                    endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 81) { // Q - quadratic curve to (absolute)
          if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
            // need one+ multiples of 4 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=4) {
              ctrlX = tmpArray[j];
              ctrlY = tmpArray[j + 1];
              endX  = tmpArray[j + 2];
              endY  = tmpArray[j + 3];
              this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 113) { // q - quadratic curve to (relative)
          if (tmpArray.length >= 4 && tmpArray.length % 4 === 0) {
            // need one+ multiples of 4 co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=4) {
              ctrlX = cx + tmpArray[j];
              ctrlY = cy + tmpArray[j + 1];
              endX  = cx + tmpArray[j + 2];
              endY  = cy + tmpArray[j + 3];
              this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 84) {
          // T - quadratic curve to shorthand (absolute)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=2) {
              if (lastInstruction.toLowerCase() ===  "q" ||
                  lastInstruction.toLowerCase() ===  "t") {
                ppx   = this.vertices[this.vertices.length-2][0];
                ppy   = this.vertices[this.vertices.length-2][1];
                px    = this.vertices[this.vertices.length-1][0];
                py    = this.vertices[this.vertices.length-1][1];
                ctrlX = px + (px - ppx);
                ctrlY = py + (py - ppy);
              } else {
                // If there is no previous command or if the previous command
                // was not a Q, q, T or t, assume the control point is
                // coincident with the current point.
                ctrlX = cx;
                ctrlY = cy;
              }
              endX  = tmpArray[j];
              endY  = tmpArray[j + 1];
              this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 116) {
          // t - quadratic curve to shorthand (relative)
          if (tmpArray.length >= 2 && tmpArray.length % 2 === 0) {
            // need one+ pairs of co-ordinates
            for (j = 0, k = tmpArray.length; j < k; j+=2) {
              if (lastInstruction.toLowerCase() ===  "q" ||
                  lastInstruction.toLowerCase() ===  "t") {
                ppx   = this.vertices[this.vertices.length-2][0];
                ppy   = this.vertices[this.vertices.length-2][1];
                px    = this.vertices[this.vertices.length-1][0];
                py    = this.vertices[this.vertices.length-1][1];
                ctrlX = px + (px - ppx);
                ctrlY = py + (py - ppy);
              } else {
                // If there is no previous command or if the previous command
                // was not a Q, q, T or t, assume the control point is
                // coincident with the current point.
                ctrlX = cx;
                ctrlY = cy;
              }
              endX  = cx + tmpArray[j];
              endY  = cy + tmpArray[j + 1];
              this.parsePathQuadto(cx, cy, ctrlX, ctrlY, endX, endY);
              cx = endX;
              cy = endY;
            }
          }
        } else if (valOf === 90 || valOf === 122) { // Z or z (these do the same thing)
          this.close = true;
        }
        lastInstruction = command.toString();
      } else { i++;}
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parsePath() helper function
   *
   * @see PShapeSVG#parsePath
   */
  PShapeSVG.prototype.parsePathQuadto = function(x1, y1, cx, cy, x2, y2) {
    if (this.vertices.length > 0) {
      this.parsePathCode(PConstants.BEZIER_VERTEX);
      // x1/y1 already covered by last moveto, lineto, or curveto
      this.parsePathVertex(x1 + ((cx-x1)*2/3), y1 + ((cy-y1)*2/3));
      this.parsePathVertex(x2 + ((cx-x2)*2/3), y2 + ((cy-y2)*2/3));
      this.parsePathVertex(x2, y2);
    } else {
      throw ("Path must start with M/m");
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parsePath() helper function
   *
   * @see PShapeSVG#parsePath
   */
  PShapeSVG.prototype.parsePathCurveto = function(x1,  y1, x2, y2, x3, y3) {
    if (this.vertices.length > 0) {
      this.parsePathCode(PConstants.BEZIER_VERTEX );
      this.parsePathVertex(x1, y1);
      this.parsePathVertex(x2, y2);
      this.parsePathVertex(x3, y3);
    } else {
      throw ("Path must start with M/m");
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parsePath() helper function
   *
   * @see PShapeSVG#parsePath
   */
  PShapeSVG.prototype.parsePathLineto = function(px, py) {
    if (this.vertices.length > 0) {
      this.parsePathCode(PConstants.VERTEX);
      this.parsePathVertex(px, py);
      // add property to distinguish between curContext.moveTo
      // or curContext.lineTo
      this.vertices[this.vertices.length-1].moveTo = false;
    } else {
      throw ("Path must start with M/m");
    }
  };

  PShapeSVG.prototype.parsePathMoveto = function(px, py) {
    if (this.vertices.length > 0) {
      this.parsePathCode(PConstants.BREAK);
    }
    this.parsePathCode(PConstants.VERTEX);
    this.parsePathVertex(px, py);
    // add property to distinguish between curContext.moveTo
    // or curContext.lineTo
    this.vertices[this.vertices.length-1].moveTo = true;
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parsePath() helper function
   *
   * @see PShapeSVG#parsePath
   */
  PShapeSVG.prototype.parsePathVertex = function(x,  y) {
    var verts = [];
    verts[0]  = x;
    verts[1]  = y;
    this.vertices.push(verts);
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parsePath() helper function
   *
   * @see PShapeSVG#parsePath
   */
  PShapeSVG.prototype.parsePathCode = function(what) {
    this.vertexCodes.push(what);
  };
  /**
   * @member PShapeSVG
   * The parsePoly() function parses a polyline or polygon from an SVG file.
   *
   * @param {boolean}val true if shape is closed (polygon), false if not (polyline)
   */
  PShapeSVG.prototype.parsePoly = function(val) {
    this.family    = PConstants.PATH;
    this.close     = val;
    var pointsAttr = CommonFunctions.trim(this.element.getStringAttribute("points").replace(/[,\s]+/g,' '));
    if (pointsAttr !== null) {
      //split into array
      var pointsBuffer = pointsAttr.split(" ");
      if (pointsBuffer.length % 2 === 0) {
        for (var i = 0, j = pointsBuffer.length; i < j; i++) {
          var verts = [];
          verts[0]  = pointsBuffer[i];
          verts[1]  = pointsBuffer[++i];
          this.vertices.push(verts);
        }
      } else {
        throw("Error parsing polygon points: odd number of coordinates provided");
      }
    }
  };
  /**
   * @member PShapeSVG
   * The parseRect() function parses a rect from an SVG file.
   */
  PShapeSVG.prototype.parseRect = function() {
    this.kind      = PConstants.RECT;
    this.family    = PConstants.PRIMITIVE;
    this.params    = [];
    this.params[0] = this.element.getFloatAttribute("x");
    this.params[1] = this.element.getFloatAttribute("y");
    this.params[2] = this.element.getFloatAttribute("width");
    this.params[3] = this.element.getFloatAttribute("height");
    if (this.params[2] < 0 || this.params[3] < 0) {
      throw("svg error: negative width or height found while parsing <rect>");
    }
  };
  /**
   * @member PShapeSVG
   * The parseEllipse() function handles parsing ellipse and circle tags.
   *
   * @param {boolean}val true if this is a circle and not an ellipse
   */
  PShapeSVG.prototype.parseEllipse = function(val) {
    this.kind   = PConstants.ELLIPSE;
    this.family = PConstants.PRIMITIVE;
    this.params = [];

    this.params[0] = this.element.getFloatAttribute("cx") | 0 ;
    this.params[1] = this.element.getFloatAttribute("cy") | 0;

    var rx, ry;
    if (val) {
      rx = ry = this.element.getFloatAttribute("r");
      if (rx < 0) {
        throw("svg error: negative radius found while parsing <circle>");
      }
    } else {
      rx = this.element.getFloatAttribute("rx");
      ry = this.element.getFloatAttribute("ry");
      if (rx < 0 || ry < 0) {
        throw("svg error: negative x-axis radius or y-axis radius found while parsing <ellipse>");
      }
    }
    this.params[0] -= rx;
    this.params[1] -= ry;

    this.params[2] = rx*2;
    this.params[3] = ry*2;
  };
  /**
   * @member PShapeSVG
   * The parseLine() function handles parsing line tags.
   *
   * @param {boolean}val true if this is a circle and not an ellipse
   */
  PShapeSVG.prototype.parseLine = function() {
    this.kind = PConstants.LINE;
    this.family = PConstants.PRIMITIVE;
    this.params = [];
    this.params[0] = this.element.getFloatAttribute("x1");
    this.params[1] = this.element.getFloatAttribute("y1");
    this.params[2] = this.element.getFloatAttribute("x2");
    this.params[3] = this.element.getFloatAttribute("y2");
  };
  /**
   * @member PShapeSVG
   * The parseColors() function handles parsing the opacity, strijem stroke-width, stroke-linejoin,stroke-linecap, fill, and style attributes
   *
   * @param {XMLElement}element the element of which attributes to parse
   */
  PShapeSVG.prototype.parseColors = function(element) {
    if (element.hasAttribute("opacity")) {
      this.setOpacity(element.getAttribute("opacity"));
    }
    if (element.hasAttribute("stroke")) {
      this.setStroke(element.getAttribute("stroke"));
    }
    if (element.hasAttribute("stroke-width")) {
      // if NaN (i.e. if it's 'inherit') then default
      // back to the inherit setting
      this.setStrokeWeight(element.getAttribute("stroke-width"));
    }
    if (element.hasAttribute("stroke-linejoin") ) {
      this.setStrokeJoin(element.getAttribute("stroke-linejoin"));
    }
    if (element.hasAttribute("stroke-linecap")) {
      this.setStrokeCap(element.getStringAttribute("stroke-linecap"));
    }
    // fill defaults to black (though stroke defaults to "none")
    // http://www.w3.org/TR/SVG/painting.html#FillProperties
    if (element.hasAttribute("fill")) {
      this.setFill(element.getStringAttribute("fill"));
    }
    if (element.hasAttribute("style")) {
      var styleText   = element.getStringAttribute("style");
      var styleTokens = styleText.toString().split( ";" );

      for (var i = 0, j = styleTokens.length; i < j; i++) {
        var tokens = CommonFunctions.trim(styleTokens[i].split( ":" ));
        if (tokens[0] === "fill") {
            this.setFill(tokens[1]);
        } else if (tokens[0] === "fill-opacity") {
            this.setFillOpacity(tokens[1]);
        } else if (tokens[0] === "stroke") {
            this.setStroke(tokens[1]);
        } else if (tokens[0] === "stroke-width") {
            this.setStrokeWeight(tokens[1]);
        } else if (tokens[0] === "stroke-linecap") {
            this.setStrokeCap(tokens[1]);
        } else if (tokens[0] === "stroke-linejoin") {
            this.setStrokeJoin(tokens[1]);
        } else if (tokens[0] === "stroke-opacity") {
            this.setStrokeOpacity(tokens[1]);
        } else if (tokens[0] === "opacity") {
            this.setOpacity(tokens[1]);
        } // Other attributes are not yet implemented
      }
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} opacityText the value of fillOpacity
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setFillOpacity = function(opacityText) {
    this.fillOpacity = parseFloat(opacityText);
    this.fillColor   = this.fillOpacity * 255  << 24 |
                       this.fillColor & 0xFFFFFF;
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} fillText the value of fill
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setFill = function (fillText) {
    var opacityMask = this.fillColor & 0xFF000000;
    if (fillText === "none") {
      this.fill = false;
    } else if (fillText.indexOf("#") === 0) {
      this.fill      = true;
      if (fillText.length === 4) {
        // convert #00F to #0000FF
        fillText = fillText.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3");
      }
      this.fillColor = opacityMask |
                       (parseInt(fillText.substring(1), 16 )) &
                       0xFFFFFF;
    } else if (fillText.indexOf("rgb") === 0) {
      this.fill      = true;
      this.fillColor = opacityMask | this.parseRGB(fillText);
    } else if (fillText.indexOf("url(#") === 0) {
      this.fillName = fillText.substring(5, fillText.length - 1 );
    } else if (colors[fillText]) {
      this.fill      = true;
      this.fillColor = opacityMask |
                       (parseInt(colors[fillText].substring(1), 16)) &
                       0xFFFFFF;
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} opacity the value of opacity
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setOpacity = function(opacity) {
    this.strokeColor = parseFloat(opacity) * 255 << 24 |
                       this.strokeColor & 0xFFFFFF;
    this.fillColor   = parseFloat(opacity) * 255 << 24 |
                       this.fillColor & 0xFFFFFF;
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} strokeText the value to set stroke to
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setStroke = function(strokeText) {
    var opacityMask = this.strokeColor & 0xFF000000;
    if (strokeText === "none") {
      this.stroke = false;
    } else if (strokeText.charAt( 0 ) === "#") {
      this.stroke      = true;
      if (strokeText.length === 4) {
        // convert #00F to #0000FF
        strokeText = strokeText.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3");
      }
      this.strokeColor = opacityMask |
                         (parseInt( strokeText.substring( 1 ), 16 )) &
                         0xFFFFFF;
    } else if (strokeText.indexOf( "rgb" ) === 0 ) {
      this.stroke = true;
      this.strokeColor = opacityMask | this.parseRGB(strokeText);
    } else if (strokeText.indexOf( "url(#" ) === 0) {
      this.strokeName = strokeText.substring(5, strokeText.length - 1);
    } else if (colors[strokeText]) {
      this.stroke      = true;
      this.strokeColor = opacityMask |
                         (parseInt(colors[strokeText].substring(1), 16)) &
                         0xFFFFFF;
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} weight the value to set strokeWeight to
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setStrokeWeight = function(weight) {
    this.strokeWeight = this.parseUnitSize(weight);
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} linejoin the value to set strokeJoin to
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setStrokeJoin = function(linejoin) {
    if (linejoin === "miter") {
      this.strokeJoin = PConstants.MITER;

    } else if (linejoin === "round") {
      this.strokeJoin = PConstants.ROUND;

    } else if (linejoin === "bevel") {
      this.strokeJoin = PConstants.BEVEL;
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} linecap the value to set strokeCap to
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setStrokeCap = function (linecap) {
    if (linecap === "butt") {
      this.strokeCap = PConstants.SQUARE;

    } else if (linecap === "round") {
      this.strokeCap = PConstants.ROUND;

    } else if (linecap === "square") {
      this.strokeCap = PConstants.PROJECT;
    }
  };
  /**
   * @member PShapeSVG
   * PShapeSVG.parseColors() helper function
   *
   * @param {String} opacityText the value to set stroke opacity to
   *
   * @see PShapeSVG#parseColors
   */
  PShapeSVG.prototype.setStrokeOpacity =  function (opacityText) {
    this.strokeOpacity = parseFloat(opacityText);
    this.strokeColor   = this.strokeOpacity * 255 << 24 |
                         this.strokeColor &
                         0xFFFFFF;
  };
  /**
   * @member PShapeSVG
   * The parseRGB() function parses an rbg() color string and returns a color int
   *
   * @param {String} color the color to parse in rbg() format
   *
   * @return {int} the equivalent color int
   */
  PShapeSVG.prototype.parseRGB = function(color) {
    var sub    = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
    var values = sub.split(", ");
    return (values[0] << 16) | (values[1] << 8) | (values[2]);
  };
  /**
   * @member PShapeSVG
   * The parseUnitSize() function parse a size that may have a suffix for its units.
   * Ignoring cases where this could also be a percentage.
   * The <A HREF="http://www.w3.org/TR/SVG/coords.html#Units">units</A> spec:
   * <UL>
   * <LI>"1pt" equals "1.25px" (and therefore 1.25 user units)
   * <LI>"1pc" equals "15px" (and therefore 15 user units)
   * <LI>"1mm" would be "3.543307px" (3.543307 user units)
   * <LI>"1cm" equals "35.43307px" (and therefore 35.43307 user units)
   * <LI>"1in" equals "90px" (and therefore 90 user units)
   * </UL>
   */
  PShapeSVG.prototype.parseUnitSize = function (text) {
    var len = text.length - 2;
    if (len < 0) { return text; }
    if (text.indexOf("pt") === len) {
      return parseFloat(text.substring(0, len)) * 1.25;
    }
    if (text.indexOf("pc") === len) {
      return parseFloat( text.substring( 0, len)) * 15;
    }
    if (text.indexOf("mm") === len) {
      return parseFloat( text.substring(0, len)) * 3.543307;
    }
    if (text.indexOf("cm") === len) {
      return parseFloat(text.substring(0, len)) * 35.43307;
    }
    if (text.indexOf("in") === len) {
      return parseFloat(text.substring(0, len)) * 90;
    }
    if (text.indexOf("px") === len) {
      return parseFloat(text.substring(0, len));
    }
    return parseFloat(text);
  };

  return PShapeSVG;
};

},{}],17:[function(require,module,exports){
module.exports = function(options, undef) {
  var PConstants = options.PConstants;

  function PVector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  PVector.fromAngle = function(angle, v) {
    if (v === undef || v === null) {
      v = new PVector();
    }
    v.x = Math.cos(angle);
    v.y = Math.sin(angle);
    return v;
  };

  PVector.random2D = function(v) {
    return PVector.fromAngle(Math.random() * PConstants.TWO_PI, v);
  };

  PVector.random3D = function(v) {
    var angle = Math.random() * PConstants.TWO_PI;
    var vz = Math.random() * 2 - 1;
    var mult = Math.sqrt(1 - vz * vz);
    var vx = mult * Math.cos(angle);
    var vy = mult * Math.sin(angle);
    if (v === undef || v === null) {
      v = new PVector(vx, vy, vz);
    } else {
      v.set(vx, vy, vz);
    }
    return v;
  };

  PVector.dist = function(v1, v2) {
    return v1.dist(v2);
  };

  PVector.dot = function(v1, v2) {
    return v1.dot(v2);
  };

  PVector.cross = function(v1, v2) {
    return v1.cross(v2);
  };

  PVector.sub = function(v1, v2) {
    return new PVector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  };

  PVector.angleBetween = function(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };

  PVector.lerp = function(v1, v2, amt) {
    // non-static lerp mutates object, but this version returns a new vector
    var retval = new PVector(v1.x, v1.y, v1.z);
    retval.lerp(v2, amt);
    return retval;
  };

  // Common vector operations for PVector
  PVector.prototype = {
    set: function(v, y, z) {
      if (arguments.length === 1) {
        this.set(v.x || v[0] || 0,
                 v.y || v[1] || 0,
                 v.z || v[2] || 0);
      } else {
        this.x = v;
        this.y = y;
        this.z = z;
      }
    },
    get: function() {
      return new PVector(this.x, this.y, this.z);
    },
    mag: function() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return Math.sqrt(x * x + y * y + z * z);
    },
    magSq: function() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return (x * x + y * y + z * z);
    },
    setMag: function(v_or_len, len) {
      if (len === undef) {
        len = v_or_len;
        this.normalize();
        this.mult(len);
      } else {
        var v = v_or_len;
        v.normalize();
        v.mult(len);
        return v;
      }
    },
    add: function(v, y, z) {
      if (arguments.length === 1) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      } else {
        this.x += v;
        this.y += y;
        this.z += z;
      }
    },
    sub: function(v, y, z) {
      if (arguments.length === 1) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
      } else {
        this.x -= v;
        this.y -= y;
        this.z -= z;
      }
    },
    mult: function(v) {
      if (typeof v === 'number') {
        this.x *= v;
        this.y *= v;
        this.z *= v;
      } else {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
      }
    },
    div: function(v) {
      if (typeof v === 'number') {
        this.x /= v;
        this.y /= v;
        this.z /= v;
      } else {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
      }
    },
    rotate: function(angle) {
      var prev_x = this.x;
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.x = c * this.x - s * this.y;
      this.y = s * prev_x + c * this.y;
    },
    dist: function(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    dot: function(v, y, z) {
      if (arguments.length === 1) {
        return (this.x * v.x + this.y * v.y + this.z * v.z);
      }
      return (this.x * v + this.y * y + this.z * z);
    },
    cross: function(v) {
      var x = this.x,
          y = this.y,
          z = this.z;
      return new PVector(y * v.z - v.y * z,
                         z * v.x - v.z * x,
                         x * v.y - v.x * y);
    },
    lerp: function(v_or_x, amt_or_y, z, amt) {
      var lerp_val = function(start, stop, amt) {
        return start + (stop - start) * amt;
      };
      var x, y;
      if (arguments.length === 2) {
        // given vector and amt
        amt = amt_or_y;
        x = v_or_x.x;
        y = v_or_x.y;
        z = v_or_x.z;
      } else {
        // given x, y, z and amt
        x = v_or_x;
        y = amt_or_y;
      }
      this.x = lerp_val(this.x, x, amt);
      this.y = lerp_val(this.y, y, amt);
      this.z = lerp_val(this.z, z, amt);
    },
    normalize: function() {
      var m = this.mag();
      if (m > 0) {
        this.div(m);
      }
    },
    limit: function(high) {
      if (this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
    },
    heading: function() {
      return (-Math.atan2(-this.y, this.x));
    },
    heading2D: function() {
      return this.heading();
    },
    toString: function() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    },
    array: function() {
      return [this.x, this.y, this.z];
    }
  };

  function createPVectorMethod(method) {
    return function(v1, v2) {
      var v = v1.get();
      v[method](v2);
      return v;
    };
  }

  for (var method in PVector.prototype) {
    if (PVector.prototype.hasOwnProperty(method) && !PVector.hasOwnProperty(method)) {
      PVector[method] = createPVectorMethod(method);
    }
  }

  return PVector;
};


},{}],18:[function(require,module,exports){
/**
 * XMLAttribute is an attribute of a XML element.
 *
 * @param {String} fname     the full name of the attribute
 * @param {String} n         the short name of the attribute
 * @param {String} namespace the namespace URI of the attribute
 * @param {String} v         the value of the attribute
 * @param {String }t         the type of the attribute
 *
 * @see XMLElement
 */
module.exports = function() {

  var XMLAttribute = function (fname, n, nameSpace, v, t){
    this.fullName = fname || "";
    this.name = n || "";
    this.namespace = nameSpace || "";
    this.value = v;
    this.type = t;
  };

  XMLAttribute.prototype = {
    /**
     * @member XMLAttribute
     * The getName() function returns the short name of the attribute
     *
     * @return {String} the short name of the attribute
     */
    getName: function() {
      return this.name;
    },
    /**
     * @member XMLAttribute
     * The getFullName() function returns the full name of the attribute
     *
     * @return {String} the full name of the attribute
     */
    getFullName: function() {
      return this.fullName;
    },
    /**
     * @member XMLAttribute
     * The getNamespace() function returns the namespace of the attribute
     *
     * @return {String} the namespace of the attribute
     */
    getNamespace: function() {
      return this.namespace;
    },
    /**
     * @member XMLAttribute
     * The getValue() function returns the value of the attribute
     *
     * @return {String} the value of the attribute
     */
    getValue: function() {
      return this.value;
    },
    /**
     * @member XMLAttribute
     * The getValue() function returns the type of the attribute
     *
     * @return {String} the type of the attribute
     */
    getType: function() {
      return this.type;
    },
    /**
     * @member XMLAttribute
     * The setValue() function sets the value of the attribute
     *
     * @param {String} newval the new value
     */
    setValue: function(newval) {
      this.value = newval;
    }
  };

  return XMLAttribute;
};

},{}],19:[function(require,module,exports){
/**
 * XMLElement is a representation of an XML object. The object is able to parse XML code
 *
 * @param {PApplet} parent   typically use "this"
 * @param {String} filename  name of the XML/SVG file to load
 * @param {String} xml       the xml/svg string
 * @param {String} fullname  the full name of the element
 * @param {String} namespace the namespace  of the URI
 * @param {String} systemID  the system ID of the XML data where the element starts
 * @param {Integer }lineNr   the line in the XML data where the element starts
 */
module.exports = function(options, undef) {

  var Browser = options.Browser,
      ajax = Browser.ajax,
      window = Browser.window,
      XMLHttpRequest = window.XMLHttpRequest,
      DOMParser = window.DOMParser,
      XMLAttribute = options. XMLAttribute;

  var XMLElement = function(selector, uri, sysid, line) {
    this.attributes = [];
    this.children   = [];
    this.fullName   = null;
    this.name       = null;
    this.namespace  = "";
    this.content = null;
    this.parent    = null;
    this.lineNr     = "";
    this.systemID   = "";
    this.type = "ELEMENT";

    if (selector) {
      if (typeof selector === "string") {
        if (uri === undef && selector.indexOf("<") > -1) {
          // load XML from text string
          this.parse(selector);
        } else {
          // XMLElement(fullname, namespace, sysid, line) format
          this.fullName = selector;
          this.namespace = uri;
          this.systemId = sysid;
          this.lineNr = line;
        }
      } else {
        // XMLElement(this,file) format
        this.parse(uri);
      }
    }
  };
  /**
   * XMLElement methods
   * missing: enumerateAttributeNames(), enumerateChildren(),
   * NOTE: parse does not work when a url is passed in
   */
  XMLElement.prototype = {
    /**
     * @member XMLElement
     * The parse() function retrieves the file via ajax() and uses DOMParser()
     * parseFromString method to make an XML document
     * @addon
     *
     * @param {String} filename name of the XML/SVG file to load
     *
     * @throws ExceptionType Error loading document
     *
     * @see XMLElement#parseChildrenRecursive
     */
    parse: function(textstring) {
      var xmlDoc;
      try {
        var extension = textstring.substring(textstring.length-4);
        if (extension === ".xml" || extension === ".svg") {
          textstring = ajax(textstring);
        }
        xmlDoc = new DOMParser().parseFromString(textstring, "text/xml");
        var elements = xmlDoc.documentElement;
        if (elements) {
          this.parseChildrenRecursive(null, elements);
        } else {
          throw ("Error loading document");
        }
        return this;
      } catch(e) {
        throw(e);
      }
    },
    /**
     * @member XMLElement
     * Internal helper function for parse().
     * Loops through the
     * @addon
     *
     * @param {XMLElement} parent                      the parent node
     * @param {XML document childNodes} elementpath    the remaining nodes that need parsing
     *
     * @return {XMLElement} the new element and its children elements
     */
    parseChildrenRecursive: function (parent, elementpath){
      var xmlelement,
        xmlattribute,
        tmpattrib,
        l, m,
        child;
      if (!parent) { // this element is the root element
        this.fullName = elementpath.localName;
        this.name     = elementpath.nodeName;
        xmlelement    = this;
      } else { // this element has a parent
        xmlelement         = new XMLElement(elementpath.nodeName);
        xmlelement.parent  = parent;
      }

      // if this is a text node, return a PCData element (parsed character data)
      if (elementpath.nodeType === 3 && elementpath.textContent !== "") {
        return this.createPCDataElement(elementpath.textContent);
      }

      // if this is a CDATA node, return a CData element (unparsed character data)
      if (elementpath.nodeType === 4) {
       return this.createCDataElement(elementpath.textContent);
      }

      // bind all attributes, if there are any
      if (elementpath.attributes) {
        for (l = 0, m = elementpath.attributes.length; l < m; l++) {
          tmpattrib    = elementpath.attributes[l];
          xmlattribute = new XMLAttribute(tmpattrib.getname,
                                          tmpattrib.nodeName,
                                          tmpattrib.namespaceURI,
                                          tmpattrib.nodeValue,
                                          tmpattrib.nodeType);
          xmlelement.attributes.push(xmlattribute);
        }
      }

      // bind all children, if there are any
      if (elementpath.childNodes) {
        for (l = 0, m = elementpath.childNodes.length; l < m; l++) {
          var node = elementpath.childNodes[l];
          child = xmlelement.parseChildrenRecursive(xmlelement, node);
          if (child !== null) {
            xmlelement.children.push(child);
          }
        }
      }

      return xmlelement;
    },
    /**
     * @member XMLElement
     * The createElement() function Creates an empty element
     *
     * @param {String} fullName   the full name of the element
     * @param {String} namespace  the namespace URI
     * @param {String} systemID   the system ID of the XML data where the element starts
     * @param {int} lineNr    the line in the XML data where the element starts
     */
    createElement: function (fullname, namespaceuri, sysid, line) {
      if (sysid === undef) {
        return new XMLElement(fullname, namespaceuri);
      }
      return new XMLElement(fullname, namespaceuri, sysid, line);
    },
    /**
     * @member XMLElement
     * The createPCDataElement() function creates an element to be used for #PCDATA content.
     * Because Processing discards whitespace TEXT nodes, this method will not build an element
     * if the passed content is empty after trimming for whitespace.
     *
     * @return {XMLElement} new "pcdata" XMLElement, or null if content consists only of whitespace
     */
    createPCDataElement: function (content, isCDATA) {
      if (content.replace(/^\s+$/g,"") === "") {
        return null;
      }
      var pcdata = new XMLElement();
      pcdata.type = "TEXT";
      pcdata.content = content;
      return pcdata;
    },
    /**
     * @member XMLElement
     * The createCDataElement() function creates an element to be used for CDATA content.
     *
     * @return {XMLElement} new "cdata" XMLElement, or null if content consists only of whitespace
     */
    createCDataElement: function (content) {
      var cdata = this.createPCDataElement(content);
      if (cdata === null) {
        return null;
      }

      cdata.type = "CDATA";
      var htmlentities = {"<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;"},
          entity;
      for (entity in htmlentities) {
        if (!Object.hasOwnProperty(htmlentities,entity)) {
          content = content.replace(new RegExp(entity, "g"), htmlentities[entity]);
        }
      }
      cdata.cdata = content;
      return cdata;
    },
    /**
     * @member XMLElement
     * The hasAttribute() function returns whether an attribute exists
     *
     * @param {String} name      name of the attribute
     * @param {String} namespace the namespace URI of the attribute
     *
     * @return {boolean} true if the attribute exists
     */
    hasAttribute: function () {
      if (arguments.length === 1) {
        return this.getAttribute(arguments[0]) !== null;
      }
      if (arguments.length === 2) {
        return this.getAttribute(arguments[0],arguments[1]) !== null;
      }
    },
    /**
     * @member XMLElement
     * The equals() function checks to see if the XMLElement being passed in equals another XMLElement
     *
     * @param {XMLElement} rawElement the element to compare to
     *
     * @return {boolean} true if the element equals another element
     */
    equals: function(other) {
      if (!(other instanceof XMLElement)) {
        return false;
      }
      var i, j;
      if (this.fullName !== other.fullName) { return false; }
      if (this.attributes.length !== other.getAttributeCount()) { return false; }
      // attributes may be ordered differently
      if (this.attributes.length !== other.attributes.length) { return false; }
      var attr_name, attr_ns, attr_value, attr_type, attr_other;
      for (i = 0, j = this.attributes.length; i < j; i++) {
        attr_name = this.attributes[i].getName();
        attr_ns = this.attributes[i].getNamespace();
        attr_other = other.findAttribute(attr_name, attr_ns);
        if (attr_other === null) { return false; }
        if (this.attributes[i].getValue() !== attr_other.getValue()) { return false; }
        if (this.attributes[i].getType() !== attr_other.getType()) { return false; }
      }
      // children must be ordered identically
      if (this.children.length !== other.getChildCount()) { return false; }
      if (this.children.length>0) {
        var child1, child2;
        for (i = 0, j = this.children.length; i < j; i++) {
          child1 = this.getChild(i);
          child2 = other.getChild(i);
          if (!child1.equals(child2)) { return false; }
        }
        return true;
      }
      return (this.content === other.content);
    },
    /**
     * @member XMLElement
     * The getContent() function returns the content of an element. If there is no such content, null is returned
     *
     * @return {String} the (possibly null) content
     */
    getContent: function(){
      if (this.type === "TEXT" || this.type === "CDATA") {
        return this.content;
      }
      var children = this.children;
      if (children.length === 1 && (children[0].type === "TEXT" || children[0].type === "CDATA")) {
        return children[0].content;
      }
      return null;
    },
    /**
     * @member XMLElement
     * The getAttribute() function returns the value of an attribute
     *
     * @param {String} name         the non-null full name of the attribute
     * @param {String} namespace    the namespace URI, which may be null
     * @param {String} defaultValue the default value of the attribute
     *
     * @return {String} the value, or defaultValue if the attribute does not exist
     */
    getAttribute: function (){
      var attribute;
      if (arguments.length === 2) {
        attribute = this.findAttribute(arguments[0]);
        if (attribute) {
          return attribute.getValue();
        }
        return arguments[1];
      } else if (arguments.length === 1) {
        attribute = this.findAttribute(arguments[0]);
        if (attribute) {
          return attribute.getValue();
        }
        return null;
      } else if (arguments.length === 3) {
        attribute = this.findAttribute(arguments[0],arguments[1]);
        if (attribute) {
          return attribute.getValue();
        }
        return arguments[2];
      }
    },
    /**
     * @member XMLElement
     * The getStringAttribute() function returns the string attribute of the element
     * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
     * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
     *
     * @param name         the name of the attribute
     * @param defaultValue value returned if the attribute is not found
     *
     * @return {String} the value, or defaultValue if the attribute does not exist
     */
    getStringAttribute: function() {
      if (arguments.length === 1) {
        return this.getAttribute(arguments[0]);
      }
      if (arguments.length === 2) {
        return this.getAttribute(arguments[0], arguments[1]);
      }
      return this.getAttribute(arguments[0], arguments[1],arguments[2]);
    },
    /**
     * Processing 1.5 XML API wrapper for the generic String
     * attribute getter. This may only take one argument.
     */
    getString: function(attributeName) {
      return this.getStringAttribute(attributeName);
    },
    /**
     * @member XMLElement
     * The getFloatAttribute() function returns the float attribute of the element.
     * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
     * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
     *
     * @param name         the name of the attribute
     * @param defaultValue value returned if the attribute is not found
     *
     * @return {float} the value, or defaultValue if the attribute does not exist
     */
    getFloatAttribute: function() {
      if (arguments.length === 1 ) {
        return parseFloat(this.getAttribute(arguments[0], 0));
      }
      if (arguments.length === 2 ) {
        return this.getAttribute(arguments[0], arguments[1]);
      }
      return this.getAttribute(arguments[0], arguments[1],arguments[2]);
    },
    /**
     * Processing 1.5 XML API wrapper for the generic float
     * attribute getter. This may only take one argument.
     */
    getFloat: function(attributeName) {
      return this.getFloatAttribute(attributeName);
    },
    /**
     * @member XMLElement
     * The getIntAttribute() function returns the integer attribute of the element.
     * If the <b>defaultValue</b> parameter is used and the attribute doesn't exist, the <b>defaultValue</b> value is returned.
     * When calling the function without the <b>defaultValue</b> parameter, if the attribute doesn't exist, the value 0 is returned.
     *
     * @param name         the name of the attribute
     * @param defaultValue value returned if the attribute is not found
     *
     * @return {int} the value, or defaultValue if the attribute does not exist
     */
    getIntAttribute: function () {
      if (arguments.length === 1) {
        return this.getAttribute( arguments[0], 0 );
      }
      if (arguments.length === 2) {
        return this.getAttribute(arguments[0], arguments[1]);
      }
      return this.getAttribute(arguments[0], arguments[1],arguments[2]);
    },
    /**
     * Processing 1.5 XML API wrapper for the generic int
     * attribute getter. This may only take one argument.
     */
    getInt: function(attributeName) {
      return this.getIntAttribute(attributeName);
    },
    /**
     * @member XMLElement
     * The hasChildren() function returns whether the element has children.
     *
     * @return {boolean} true if the element has children.
     */
    hasChildren: function () {
      return this.children.length > 0 ;
    },
    /**
     * @member XMLElement
     * The addChild() function adds a child element
     *
     * @param {XMLElement} child the non-null child to add.
     */
    addChild: function (child) {
      if (child !== null) {
        child.parent = this;
        this.children.push(child);
      }
    },
    /**
     * @member XMLElement
     * The insertChild() function inserts a child element at the index provided
     *
     * @param {XMLElement} child  the non-null child to add.
     * @param {int} index     where to put the child.
     */
    insertChild: function (child, index) {
      if (child) {
        if ((child.getLocalName() === null) && (! this.hasChildren())) {
          var lastChild = this.children[this.children.length -1];
          if (lastChild.getLocalName() === null) {
              lastChild.setContent(lastChild.getContent() + child.getContent());
              return;
          }
        }
        child.parent = this;
        this.children.splice(index,0,child);
      }
    },
    /**
     * @member XMLElement
     * The getChild() returns the child XMLElement as specified by the <b>index</b> parameter.
     * The value of the <b>index</b> parameter must be less than the total number of children to avoid going out of the array storing the child elements.
     * When the <b>path</b> parameter is specified, then it will return all children that match that path. The path is a series of elements and sub-elements, separated by slashes.
     *
     * @param {int} index     where to put the child.
     * @param {String} path       path to a particular element
     *
     * @return {XMLElement} the element
     */
    getChild: function (selector) {
      if (typeof selector === "number") {
        return this.children[selector];
      }
      if (selector.indexOf('/') !== -1) {
        // path traversal is required
        return this.getChildRecursive(selector.split("/"), 0);
      }
      var kid, kidName;
      for (var i = 0, j = this.getChildCount(); i < j; i++) {
        kid = this.getChild(i);
        kidName = kid.getName();
        if (kidName !== null && kidName === selector) {
            return kid;
        }
      }
      return null;
    },
    /**
     * @member XMLElement
     * The getChildren() returns all of the children as an XMLElement array.
     * When the <b>path</b> parameter is specified, then it will return all children that match that path.
     * The path is a series of elements and sub-elements, separated by slashes.
     *
     * @param {String} path       element name or path/to/element
     *
     * @return {XMLElement} array of child elements that match
     *
     * @see XMLElement#getChildCount()
     * @see XMLElement#getChild()
     */
    getChildren: function(){
      if (arguments.length === 1) {
        if (typeof arguments[0] === "number") {
          return this.getChild( arguments[0]);
        }
        if (arguments[0].indexOf('/') !== -1) { // path was given
          return this.getChildrenRecursive( arguments[0].split("/"), 0);
        }
        var matches = [];
        var kid, kidName;
        for (var i = 0, j = this.getChildCount(); i < j; i++) {
          kid = this.getChild(i);
          kidName = kid.getName();
          if (kidName !== null && kidName === arguments[0]) {
            matches.push(kid);
          }
        }
        return matches;
      }
      return this.children;
    },
    /**
     * @member XMLElement
     * The getChildCount() returns the number of children for the element.
     *
     * @return {int} the count
     *
     * @see XMLElement#getChild()
     * @see XMLElement#getChildren()
     */
    getChildCount: function() {
      return this.children.length;
    },
    /**
     * @member XMLElement
     * Internal helper function for getChild().
     *
     * @param {String[]} items   result of splitting the query on slashes
     * @param {int} offset   where in the items[] array we're currently looking
     *
     * @return {XMLElement} matching element or null if no match
     */
    getChildRecursive: function (items, offset) {
      // terminating clause: we are the requested candidate
      if (offset === items.length) {
        return this;
      }
      // continuation clause
      var kid, kidName, matchName = items[offset];
      for(var i = 0, j = this.getChildCount(); i < j; i++) {
          kid = this.getChild(i);
          kidName = kid.getName();
          if (kidName !== null && kidName === matchName) {
            return kid.getChildRecursive(items, offset+1);
          }
      }
      return null;
    },
    /**
     * @member XMLElement
     * Internal helper function for getChildren().
     *
     * @param {String[]} items   result of splitting the query on slashes
     * @param {int} offset   where in the items[] array we're currently looking
     *
     * @return {XMLElement[]} matching elements or empty array if no match
     */
    getChildrenRecursive: function (items, offset) {
      if (offset === items.length-1) {
        return this.getChildren(items[offset]);
      }
      var matches = this.getChildren(items[offset]);
      var kidMatches = [];
      for (var i = 0; i < matches.length; i++) {
        kidMatches = kidMatches.concat(matches[i].getChildrenRecursive(items, offset+1));
      }
      return kidMatches;
    },
    /**
     * @member XMLElement
     * The isLeaf() function returns whether the element is a leaf element.
     *
     * @return {boolean} true if the element has no children.
     */
    isLeaf: function() {
      return !this.hasChildren();
    },
    /**
     * @member XMLElement
     * The listChildren() function put the names of all children into an array. Same as looping through
     * each child and calling getName() on each XMLElement.
     *
     * @return {String[]} a list of element names.
     */
    listChildren: function() {
      var arr = [];
      for (var i = 0, j = this.children.length; i < j; i++) {
        arr.push( this.getChild(i).getName());
      }
      return arr;
    },
    /**
     * @member XMLElement
     * The removeAttribute() function removes an attribute
     *
     * @param {String} name        the non-null name of the attribute.
     * @param {String} namespace   the namespace URI of the attribute, which may be null.
     */
    removeAttribute: function (name , namespace) {
      this.namespace = namespace || "";
      for (var i = 0, j = this.attributes.length; i < j; i++) {
        if (this.attributes[i].getName() === name && this.attributes[i].getNamespace() === this.namespace) {
          this.attributes.splice(i, 1);
          break;
        }
      }
    },
    /**
     * @member XMLElement
     * The removeChild() removes a child element.
     *
     * @param {XMLElement} child      the the non-null child to be renoved
     */
    removeChild: function(child) {
      if (child) {
        for (var i = 0, j = this.children.length; i < j; i++) {
          if (this.children[i].equals(child)) {
            this.children.splice(i, 1);
            break;
          }
        }
      }
    },
    /**
     * @member XMLElement
     * The removeChildAtIndex() removes the child located at a certain index
     *
     * @param {int} index      the index of the child, where the first child has index 0
     */
    removeChildAtIndex: function(index) {
      if (this.children.length > index) { //make sure its not outofbounds
        this.children.splice(index, 1);
      }
    },
    /**
     * @member XMLElement
     * The findAttribute() function searches an attribute
     *
     * @param {String} name        fullName the non-null full name of the attribute
     * @param {String} namespace   the name space, which may be null
     *
     * @return {XMLAttribute} the attribute, or null if the attribute does not exist.
     */
    findAttribute: function (name, namespace) {
      this.namespace = namespace || "";
      for (var i = 0, j = this.attributes.length; i < j; i++) {
        if (this.attributes[i].getName() === name && this.attributes[i].getNamespace() === this.namespace) {
           return this.attributes[i];
        }
      }
      return null;
    },
    /**
     * @member XMLElement
     * The setAttribute() function sets an attribute.
     *
     * @param {String} name        the non-null full name of the attribute
     * @param {String} namespace   the non-null value of the attribute
     */
    setAttribute: function() {
      var attr;
      if (arguments.length === 3) {
        var index = arguments[0].indexOf(':');
        var name  = arguments[0].substring(index + 1);
        attr      = this.findAttribute(name, arguments[1]);
        if (attr) {
          attr.setValue(arguments[2]);
        } else {
          attr = new XMLAttribute(arguments[0], name, arguments[1], arguments[2], "CDATA");
          this.attributes.push(attr);
        }
      } else {
        attr = this.findAttribute(arguments[0]);
        if (attr) {
          attr.setValue(arguments[1]);
        } else {
          attr = new XMLAttribute(arguments[0], arguments[0], null, arguments[1], "CDATA");
          this.attributes.push(attr);
        }
      }
    },
    /**
     * Processing 1.5 XML API wrapper for the generic String
     * attribute setter. This must take two arguments.
     */
    setString: function(attribute, value) {
      this.setAttribute(attribute, value);
    },
    /**
     * Processing 1.5 XML API wrapper for the generic int
     * attribute setter. This must take two arguments.
     */
    setInt: function(attribute, value) {
      this.setAttribute(attribute, value);
    },
    /**
     * Processing 1.5 XML API wrapper for the generic float
     * attribute setter. This must take two arguments.
     */
    setFloat: function(attribute, value) {
      this.setAttribute(attribute, value);
    },
    /**
     * @member XMLElement
     * The setContent() function sets the #PCDATA content. It is an error to call this method with a
     * non-null value if there are child objects.
     *
     * @param {String} content     the (possibly null) content
     */
    setContent: function(content) {
      if (this.children.length > 0) {
        Processing.debug("Tried to set content for XMLElement with children"); }
      this.content = content;
    },
    /**
     * @member XMLElement
     * The setName() function sets the full name. This method also sets the short name and clears the
     * namespace URI.
     *
     * @param {String} name        the non-null name
     * @param {String} namespace   the namespace URI, which may be null.
     */
    setName: function() {
      if (arguments.length === 1) {
        this.name      = arguments[0];
        this.fullName  = arguments[0];
        this.namespace = null;
      } else {
        var index = arguments[0].indexOf(':');
        if ((arguments[1] === null) || (index < 0)) {
            this.name = arguments[0];
        } else {
            this.name = arguments[0].substring(index + 1);
        }
        this.fullName  = arguments[0];
        this.namespace = arguments[1];
      }
    },
    /**
     * @member XMLElement
     * The getName() function returns the full name (i.e. the name including an eventual namespace
     * prefix) of the element.
     *
     * @return {String} the name, or null if the element only contains #PCDATA.
     */
    getName: function() {
      return this.fullName;
    },
    /**
     * @member XMLElement
     * The getLocalName() function returns the local name (i.e. the name excluding an eventual namespace
     * prefix) of the element.
     *
     * @return {String} the name, or null if the element only contains #PCDATA.
     */
    getLocalName: function() {
      return this.name;
    },
    /**
     * @member XMLElement
     * The getAttributeCount() function returns the number of attributes for the node
     * that this XMLElement represents.
     *
     * @return {int} the number of attributes in this XMLElement
     */
    getAttributeCount: function() {
      return this.attributes.length;
    },
    /**
     * @member XMLElement
     * The toString() function returns the XML definition of an XMLElement.
     *
     * @return {String} the XML definition of this XMLElement
     */
    toString: function() {
      // shortcut for text and cdata nodes
      if (this.type === "TEXT") {
        return this.content;
      }

      if (this.type === "CDATA") {
        return this.cdata;
      }

      // real XMLElements
      var tagstring = this.fullName;
      var xmlstring =  "<" + tagstring;
      var a,c;

      // serialize the attributes to XML string
      for (a = 0; a<this.attributes.length; a++) {
        var attr = this.attributes[a];
        xmlstring += " "  + attr.getName() + "=" + '"' + attr.getValue() + '"';
      }

      // serialize all children to XML string
      if (this.children.length === 0) {
        if (this.content==="") {
          xmlstring += "/>";
        } else {
          xmlstring += ">" + this.content + "</"+tagstring+">";
        }
      } else {
        xmlstring += ">";
        for (c = 0; c<this.children.length; c++) {
          xmlstring += this.children[c].toString();
        }
        xmlstring += "</" + tagstring + ">";
      }
      return xmlstring;
     }
  };

  /**
   * static Processing 1.5 XML API wrapper for the
   * parse method. This may only take one argument.
   */
  XMLElement.parse = function(xmlstring) {
    var element = new XMLElement();
    element.parse(xmlstring);
    return element;
  };

  return XMLElement;
};

},{}],20:[function(require,module,exports){
/**
 * web colors, by name
 */
module.exports = {
    aliceblue:            "#f0f8ff",
    antiquewhite:         "#faebd7",
    aqua:                 "#00ffff",
    aquamarine:           "#7fffd4",
    azure:                "#f0ffff",
    beige:                "#f5f5dc",
    bisque:               "#ffe4c4",
    black:                "#000000",
    blanchedalmond:       "#ffebcd",
    blue:                 "#0000ff",
    blueviolet:           "#8a2be2",
    brown:                "#a52a2a",
    burlywood:            "#deb887",
    cadetblue:            "#5f9ea0",
    chartreuse:           "#7fff00",
    chocolate:            "#d2691e",
    coral:                "#ff7f50",
    cornflowerblue:       "#6495ed",
    cornsilk:             "#fff8dc",
    crimson:              "#dc143c",
    cyan:                 "#00ffff",
    darkblue:             "#00008b",
    darkcyan:             "#008b8b",
    darkgoldenrod:        "#b8860b",
    darkgray:             "#a9a9a9",
    darkgreen:            "#006400",
    darkkhaki:            "#bdb76b",
    darkmagenta:          "#8b008b",
    darkolivegreen:       "#556b2f",
    darkorange:           "#ff8c00",
    darkorchid:           "#9932cc",
    darkred:              "#8b0000",
    darksalmon:           "#e9967a",
    darkseagreen:         "#8fbc8f",
    darkslateblue:        "#483d8b",
    darkslategray:        "#2f4f4f",
    darkturquoise:        "#00ced1",
    darkviolet:           "#9400d3",
    deeppink:             "#ff1493",
    deepskyblue:          "#00bfff",
    dimgray:              "#696969",
    dodgerblue:           "#1e90ff",
    firebrick:            "#b22222",
    floralwhite:          "#fffaf0",
    forestgreen:          "#228b22",
    fuchsia:              "#ff00ff",
    gainsboro:            "#dcdcdc",
    ghostwhite:           "#f8f8ff",
    gold:                 "#ffd700",
    goldenrod:            "#daa520",
    gray:                 "#808080",
    green:                "#008000",
    greenyellow:          "#adff2f",
    honeydew:             "#f0fff0",
    hotpink:              "#ff69b4",
    indianred:            "#cd5c5c",
    indigo:               "#4b0082",
    ivory:                "#fffff0",
    khaki:                "#f0e68c",
    lavender:             "#e6e6fa",
    lavenderblush:        "#fff0f5",
    lawngreen:            "#7cfc00",
    lemonchiffon:         "#fffacd",
    lightblue:            "#add8e6",
    lightcoral:           "#f08080",
    lightcyan:            "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey:            "#d3d3d3",
    lightgreen:           "#90ee90",
    lightpink:            "#ffb6c1",
    lightsalmon:          "#ffa07a",
    lightseagreen:        "#20b2aa",
    lightskyblue:         "#87cefa",
    lightslategray:       "#778899",
    lightsteelblue:       "#b0c4de",
    lightyellow:          "#ffffe0",
    lime:                 "#00ff00",
    limegreen:            "#32cd32",
    linen:                "#faf0e6",
    magenta:              "#ff00ff",
    maroon:               "#800000",
    mediumaquamarine:     "#66cdaa",
    mediumblue:           "#0000cd",
    mediumorchid:         "#ba55d3",
    mediumpurple:         "#9370d8",
    mediumseagreen:       "#3cb371",
    mediumslateblue:      "#7b68ee",
    mediumspringgreen:    "#00fa9a",
    mediumturquoise:      "#48d1cc",
    mediumvioletred:      "#c71585",
    midnightblue:         "#191970",
    mintcream:            "#f5fffa",
    mistyrose:            "#ffe4e1",
    moccasin:             "#ffe4b5",
    navajowhite:          "#ffdead",
    navy:                 "#000080",
    oldlace:              "#fdf5e6",
    olive:                "#808000",
    olivedrab:            "#6b8e23",
    orange:               "#ffa500",
    orangered:            "#ff4500",
    orchid:               "#da70d6",
    palegoldenrod:        "#eee8aa",
    palegreen:            "#98fb98",
    paleturquoise:        "#afeeee",
    palevioletred:        "#d87093",
    papayawhip:           "#ffefd5",
    peachpuff:            "#ffdab9",
    peru:                 "#cd853f",
    pink:                 "#ffc0cb",
    plum:                 "#dda0dd",
    powderblue:           "#b0e0e6",
    purple:               "#800080",
    red:                  "#ff0000",
    rosybrown:            "#bc8f8f",
    royalblue:            "#4169e1",
    saddlebrown:          "#8b4513",
    salmon:               "#fa8072",
    sandybrown:           "#f4a460",
    seagreen:             "#2e8b57",
    seashell:             "#fff5ee",
    sienna:               "#a0522d",
    silver:               "#c0c0c0",
    skyblue:              "#87ceeb",
    slateblue:            "#6a5acd",
    slategray:            "#708090",
    snow:                 "#fffafa",
    springgreen:          "#00ff7f",
    steelblue:            "#4682b4",
    tan:                  "#d2b48c",
    teal:                 "#008080",
    thistle:              "#d8bfd8",
    tomato:               "#ff6347",
    turquoise:            "#40e0d0",
    violet:               "#ee82ee",
    wheat:                "#f5deb3",
    white:                "#ffffff",
    whitesmoke:           "#f5f5f5",
    yellow:               "#ffff00",
    yellowgreen:          "#9acd32"
  };

},{}],21:[function(require,module,exports){
module.exports = function(virtHashCode, virtEquals, undef) {

  return function withProxyFunctions(p, removeFirstArgument) {
    /**
     * The contains(string) function returns true if the string passed in the parameter
     * is a substring of this string. It returns false if the string passed
     * in the parameter is not a substring of this string.
     *
     * @param {String} The string to look for in the current string
     *
     * @return {boolean} returns true if this string contains
     * the string passed as parameter. returns false, otherwise.
     *
     */
    p.__contains = function (subject, subStr) {
      if (typeof subject !== "string") {
        return subject.contains.apply(subject, removeFirstArgument(arguments));
      }
      //Parameter is not null AND
      //The type of the parameter is the same as this object (string)
      //The javascript function that finds a substring returns 0 or higher
      return (
        (subject !== null) &&
        (subStr !== null) &&
        (typeof subStr === "string") &&
        (subject.indexOf(subStr) > -1)
      );
    };

    /**
     * The __replaceAll() function searches all matches between a substring (or regular expression) and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject    a substring
     * @param {String} regex      a substring or a regular expression
     * @param {String} replace    the string to replace the found value
     *
     * @return {String} returns result
     *
     * @see #match
     */
    p.__replaceAll = function(subject, regex, replacement) {
      if (typeof subject !== "string") {
        return subject.replaceAll.apply(subject, removeFirstArgument(arguments));
      }

      return subject.replace(new RegExp(regex, "g"), replacement);
    };

    /**
     * The __replaceFirst() function searches first matche between a substring (or regular expression) and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject    a substring
     * @param {String} regex      a substring or a regular expression
     * @param {String} replace    the string to replace the found value
     *
     * @return {String} returns result
     *
     * @see #match
     */
    p.__replaceFirst = function(subject, regex, replacement) {
      if (typeof subject !== "string") {
        return subject.replaceFirst.apply(subject, removeFirstArgument(arguments));
      }

      return subject.replace(new RegExp(regex, ""), replacement);
    };

    /**
     * The __replace() function searches all matches between a substring and a string,
     * and replaces the matched substring with a new substring
     *
     * @param {String} subject         a substring
     * @param {String} what         a substring to find
     * @param {String} replacement    the string to replace the found value
     *
     * @return {String} returns result
     */
    p.__replace = function(subject, what, replacement) {
      if (typeof subject !== "string") {
        return subject.replace.apply(subject, removeFirstArgument(arguments));
      }
      if (what instanceof RegExp) {
        return subject.replace(what, replacement);
      }

      if (typeof what !== "string") {
        what = what.toString();
      }
      if (what === "") {
        return subject;
      }

      var i = subject.indexOf(what);
      if (i < 0) {
        return subject;
      }

      var j = 0, result = "";
      do {
        result += subject.substring(j, i) + replacement;
        j = i + what.length;
      } while ( (i = subject.indexOf(what, j)) >= 0);
      return result + subject.substring(j);
    };

    /**
     * The __equals() function compares two strings (or objects) to see if they are the same.
     * This method is necessary because it's not possible to compare strings using the equality operator (==).
     * Returns true if the strings are the same and false if they are not.
     *
     * @param {String} subject  a string used for comparison
     * @param {String} other  a string used for comparison with
     *
     * @return {boolean} true is the strings are the same false otherwise
     */
    p.__equals = function(subject, other) {
      if (subject.equals instanceof Function) {
        return subject.equals.apply(subject, removeFirstArgument(arguments));
      }

      return virtEquals(subject, other);
    };

    /**
     * The __equalsIgnoreCase() function compares two strings to see if they are the same.
     * Returns true if the strings are the same, either when forced to all lower case or
     * all upper case.
     *
     * @param {String} subject  a string used for comparison
     * @param {String} other  a string used for comparison with
     *
     * @return {boolean} true is the strings are the same, ignoring case. false otherwise
     */
    p.__equalsIgnoreCase = function(subject, other) {
      if (typeof subject !== "string") {
        return subject.equalsIgnoreCase.apply(subject, removeFirstArgument(arguments));
      }

      return subject.toLowerCase() === other.toLowerCase();
    };

    /**
     * The __toCharArray() function splits the string into a char array.
     *
     * @param {String} subject The string
     *
     * @return {Char[]} a char array
     */
    p.__toCharArray = function(subject) {
      if (typeof subject !== "string") {
        return subject.toCharArray.apply(subject, removeFirstArgument(arguments));
      }

      var chars = [];
      for (var i = 0, len = subject.length; i < len; ++i) {
        chars[i] = new Char(subject.charAt(i));
      }
      return chars;
    };

    /**
     * The __split() function splits a string using the regex delimiter
     * specified. If limit is specified, the resultant array will have number
     * of elements equal to or less than the limit.
     *
     * @param {String} subject string to be split
     * @param {String} regexp  regex string used to split the subject
     * @param {int}    limit   max number of tokens to be returned
     *
     * @return {String[]} an array of tokens from the split string
     */
    p.__split = function(subject, regex, limit) {
      if (typeof subject !== "string") {
        return subject.split.apply(subject, removeFirstArgument(arguments));
      }

      var pattern = new RegExp(regex);

      // If limit is not specified, use JavaScript's built-in String.split.
      if ((limit === undef) || (limit < 1)) {
        return subject.split(pattern);
      }

      // If limit is specified, JavaScript's built-in String.split has a
      // different behaviour than Java's. A Java-compatible implementation is
      // provided here.
      var result = [], currSubject = subject, pos;
      while (((pos = currSubject.search(pattern)) !== -1) && (result.length < (limit - 1))) {
        var match = pattern.exec(currSubject).toString();
        result.push(currSubject.substring(0, pos));
        currSubject = currSubject.substring(pos + match.length);
      }
      if ((pos !== -1) || (currSubject !== "")) {
        result.push(currSubject);
      }
      return result;
    };

    /**
     * The codePointAt() function returns the unicode value of the character at a given index of a string.
     *
     * @param  {int} idx         the index of the character
     *
     * @return {String} code     the String containing the unicode value of the character
     */
    p.__codePointAt = function(subject, idx) {
      var code = subject.charCodeAt(idx),
          hi,
          low;
      if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = subject.charCodeAt(idx + 1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      return code;
    };

    /**
     * The matches() function checks whether or not a string matches a given regular expression.
     *
     * @param {String} str      the String on which the match is tested
     * @param {String} regexp   the regexp for which a match is tested
     *
     * @return {boolean} true if the string fits the regexp, false otherwise
     */
    p.__matches = function(str, regexp) {
      return (new RegExp(regexp)).test(str);
    };

    /**
     * The startsWith() function tests if a string starts with the specified prefix.  If the prefix
     * is the empty String or equal to the subject String, startsWith() will also return true.
     *
     * @param {String} prefix   the String used to compare against the start of the subject String.
     * @param {int}    toffset  (optional) an offset into the subject String where searching should begin.
     *
     * @return {boolean} true if the subject String starts with the prefix.
     */
    p.__startsWith = function(subject, prefix, toffset) {
      if (typeof subject !== "string") {
        return subject.startsWith.apply(subject, removeFirstArgument(arguments));
      }

      toffset = toffset || 0;
      if (toffset < 0 || toffset > subject.length) {
        return false;
      }
      return (prefix === '' || prefix === subject) ? true : (subject.indexOf(prefix) === toffset);
    };

    /**
     * The endsWith() function tests if a string ends with the specified suffix.  If the suffix
     * is the empty String, endsWith() will also return true.
     *
     * @param {String} suffix   the String used to compare against the end of the subject String.
     *
     * @return {boolean} true if the subject String starts with the prefix.
     */
    p.__endsWith = function(subject, suffix) {
      if (typeof subject !== "string") {
        return subject.endsWith.apply(subject, removeFirstArgument(arguments));
      }

      var suffixLen = suffix ? suffix.length : 0;
      return (suffix === '' || suffix === subject) ? true :
        (subject.indexOf(suffix) === subject.length - suffixLen);
    };

    /**
     * The returns hash code of the.
     *
     * @param {Object} subject The string
     *
     * @return {int} a hash code
     */
    p.__hashCode = function(subject) {
      if (subject.hashCode instanceof Function) {
        return subject.hashCode.apply(subject, removeFirstArgument(arguments));
      }
      return virtHashCode(subject);
    };

    /**
     * The __printStackTrace() prints stack trace to the console.
     *
     * @param {Exception} subject The error
     */
    p.__printStackTrace = function(subject) {
      p.println("Exception: " + subject.toString() );
    };
  };

};

},{}],22:[function(require,module,exports){
/**
 * For many "math" functions, we can delegate
 * to the Math object. For others, we can't.
 */
module.exports = function withMath(p, undef) {
  var internalRandomGenerator = function() { return Math.random(); };

  /**
  * Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.
  *
  * @param {int|float} value   int or float
  *
  * @returns {int|float}
  */
  p.abs = Math.abs;

  /**
  * Calculates the closest int value that is greater than or equal to the value of the parameter.
  * For example, ceil(9.03) returns the value 10.
  *
  * @param {float} value   float
  *
  * @returns {int}
  *
  * @see floor
  * @see round
  */
  p.ceil = Math.ceil;

  /**
  * Returns Euler's number e (2.71828...) raised to the power of the value parameter.
  *
  * @param {int|float} value   int or float: the exponent to raise e to
  *
  * @returns {float}
  */
  p.exp = Math.exp;

  /**
  * Calculates the closest int value that is less than or equal to the value of the parameter.
  *
  * @param {int|float} value        the value to floor
  *
  * @returns {int|float}
  *
  * @see ceil
  * @see round
  */
  p.floor = Math.floor;

  /**
  * Calculates the natural logarithm (the base-e logarithm) of a number. This function
  * expects the values greater than 0.0.
  *
  * @param {int|float} value        int or float: number must be greater then 0.0
  *
  * @returns {float}
  */
  p.log = Math.log;

  /**
  * Facilitates exponential expressions. The pow() function is an efficient way of
  * multiplying numbers by themselves (or their reciprocal) in large quantities.
  * For example, pow(3, 5) is equivalent to the expression 3*3*3*3*3 and pow(3, -5)
  * is equivalent to 1 / 3*3*3*3*3.
  *
  * @param {int|float} num        base of the exponential expression
  * @param {int|float} exponent   power of which to raise the base
  *
  * @returns {float}
  *
  * @see sqrt
  */
  p.pow = Math.pow;

  /**
  * Calculates the integer closest to the value parameter. For example, round(9.2) returns the value 9.
  *
  * @param {float} value        number to round
  *
  * @returns {int}
  *
  * @see floor
  * @see ceil
  */
  p.round = Math.round;
  /**
  * Calculates the square root of a number. The square root of a number is always positive,
  * even though there may be a valid negative root. The square root s of number a is such
  * that s*s = a. It is the opposite of squaring.
  *
  * @param {float} value        int or float, non negative
  *
  * @returns {float}
  *
  * @see pow
  * @see sq
  */

  p.sqrt = Math.sqrt;

  // Trigonometry
  /**
  * The inverse of cos(), returns the arc cosine of a value. This function expects the
  * values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
  *
  * @param {float} value        the value whose arc cosine is to be returned
  *
  * @returns {float}
  *
  * @see cos
  * @see asin
  * @see atan
  */
  p.acos = Math.acos;

  /**
  * The inverse of sin(), returns the arc sine of a value. This function expects the values
  * in the range of -1 to 1 and values are returned in the range -PI/2 to PI/2.
  *
  * @param {float} value        the value whose arc sine is to be returned
  *
  * @returns {float}
  *
  * @see sin
  * @see acos
  * @see atan
  */
  p.asin = Math.asin;

  /**
  * The inverse of tan(), returns the arc tangent of a value. This function expects the values
  * in the range of -Infinity to Infinity (exclusive) and values are returned in the range -PI/2 to PI/2 .
  *
  * @param {float} value        -Infinity to Infinity (exclusive)
  *
  * @returns {float}
  *
  * @see tan
  * @see asin
  * @see acos
  */
  p.atan = Math.atan;

  /**
  * Calculates the angle (in radians) from a specified point to the coordinate origin as measured from
  * the positive x-axis. Values are returned as a float in the range from PI to -PI. The atan2() function
  * is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the
  * point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
  *
  * @param {float} y        y-coordinate of the point
  * @param {float} x        x-coordinate of the point
  *
  * @returns {float}
  *
  * @see tan
  */
  p.atan2 = Math.atan2;

  /**
  * Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided
  * in radians (values from 0 to PI*2). Values are returned in the range -1 to 1.
  *
  * @param {float} value        an angle in radians
  *
  * @returns {float}
  *
  * @see tan
  * @see sin
  */
  p.cos = Math.cos;

  /**
  * Calculates the sine of an angle. This function expects the values of the angle parameter to be provided in
  * radians (values from 0 to 6.28). Values are returned in the range -1 to 1.
  *
  * @param {float} value        an angle in radians
  *
  * @returns {float}
  *
  * @see cos
  * @see radians
  */
  p.sin = Math.sin;

  /**
  * Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle
  * parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range infinity to -infinity.
  *
  * @param {float} value        an angle in radians
  *
  * @returns {float}
  *
  * @see cos
  * @see sin
  * @see radians
  */
  p.tan = Math.tan;

  /**
  * Constrains a value to not exceed a maximum and minimum value.
  *
  * @param {int|float} value   the value to constrain
  * @param {int|float} value   minimum limit
  * @param {int|float} value   maximum limit
  *
  * @returns {int|float}
  *
  * @see max
  * @see min
  */
  p.constrain = function(aNumber, aMin, aMax) {
    return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
  };

  /**
  * Calculates the distance between two points.
  *
  * @param {int|float} x1     int or float: x-coordinate of the first point
  * @param {int|float} y1     int or float: y-coordinate of the first point
  * @param {int|float} z1     int or float: z-coordinate of the first point
  * @param {int|float} x2     int or float: x-coordinate of the second point
  * @param {int|float} y2     int or float: y-coordinate of the second point
  * @param {int|float} z2     int or float: z-coordinate of the second point
  *
  * @returns {float}
  */
  p.dist = function() {
    var dx, dy, dz;
    if (arguments.length === 4) {
      dx = arguments[0] - arguments[2];
      dy = arguments[1] - arguments[3];
      return Math.sqrt(dx * dx + dy * dy);
    }
    if (arguments.length === 6) {
      dx = arguments[0] - arguments[3];
      dy = arguments[1] - arguments[4];
      dz = arguments[2] - arguments[5];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
  };

  /**
  * Calculates a number between two numbers at a specific increment. The amt  parameter is the
  * amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very
  * near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for
  * creating motion along a straight path and for drawing dotted lines.
  *
  * @param {int|float} value1       float or int: first value
  * @param {int|float} value2       float or int: second value
  * @param {int|float} amt          float: between 0.0 and 1.0
  *
  * @returns {float}
  *
  * @see curvePoint
  * @see bezierPoint
  */
  p.lerp = function(value1, value2, amt) {
    return ((value2 - value1) * amt) + value1;
  };

  /**
  * Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly
  * used in computer graphics and linear algebra. Because it has no "start" position, the magnitude
  * of a vector can be thought of as the distance from coordinate (0,0) to its (x,y) value.
  * Therefore, mag() is a shortcut for writing "dist(0, 0, x, y)".
  *
  * @param {int|float} a       float or int: first value
  * @param {int|float} b       float or int: second value
  * @param {int|float} c       float or int: third value
  *
  * @returns {float}
  *
  * @see dist
  */
  p.mag = function(a, b, c) {
    if (c) {
      return Math.sqrt(a * a + b * b + c * c);
    }

    return Math.sqrt(a * a + b * b);
  };

  /**
  * Re-maps a number from one range to another. In the example above, the number '25' is converted from
  * a value in the range 0..100 into a value that ranges from the left edge (0) to the right edge (width) of the screen.
  * Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.
  *
  * @param {float} value        The incoming value to be converted
  * @param {float} istart       Lower bound of the value's current range
  * @param {float} istop        Upper bound of the value's current range
  * @param {float} ostart       Lower bound of the value's target range
  * @param {float} ostop        Upper bound of the value's target range
  *
  * @returns {float}
  *
  * @see norm
  * @see lerp
  */
  p.map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };

  /**
  * Determines the largest value in a sequence of numbers.
  *
  * @param {int|float} value1         int or float
  * @param {int|float} value2         int or float
  * @param {int|float} value3         int or float
  * @param {int|float} array          int or float array
  *
  * @returns {int|float}
  *
  * @see min
  */
  p.max = function() {
    if (arguments.length === 2) {
      return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
    }
    var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
    if (! ("length" in numbers && numbers.length > 0)) {
      throw "Non-empty array is expected";
    }
    var max = numbers[0],
      count = numbers.length;
    for (var i = 1; i < count; ++i) {
      if (max < numbers[i]) {
        max = numbers[i];
      }
    }
    return max;
  };

  /**
  * Determines the smallest value in a sequence of numbers.
  *
  * @param {int|float} value1         int or float
  * @param {int|float} value2         int or float
  * @param {int|float} value3         int or float
  * @param {int|float} array          int or float array
  *
  * @returns {int|float}
  *
  * @see max
  */
  p.min = function() {
    if (arguments.length === 2) {
      return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
    }
    var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
    if (! ("length" in numbers && numbers.length > 0)) {
      throw "Non-empty array is expected";
    }
    var min = numbers[0],
      count = numbers.length;
    for (var i = 1; i < count; ++i) {
      if (min > numbers[i]) {
        min = numbers[i];
      }
    }
    return min;
  };

  /**
  * Normalizes a number from another range into a value between 0 and 1.
  * Identical to map(value, low, high, 0, 1);
  * Numbers outside the range are not clamped to 0 and 1, because out-of-range
  * values are often intentional and useful.
  *
  * @param {float} aNumber    The incoming value to be converted
  * @param {float} low        Lower bound of the value's current range
  * @param {float} high       Upper bound of the value's current range
  *
  * @returns {float}
  *
  * @see map
  * @see lerp
  */
  p.norm = function(aNumber, low, high) {
    return (aNumber - low) / (high - low);
  };

  /**
  * Squares a number (multiplies a number by itself). The result is always a positive number,
  * as multiplying two negative numbers always yields a positive result. For example, -1 * -1 = 1.
  *
  * @param {float} value        int or float
  *
  * @returns {float}
  *
  * @see sqrt
  */
  p.sq = function(aNumber) {
    return aNumber * aNumber;
  };

  /**
  * Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of
  * measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example,
  * 90 degrees = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
  *
  * @param {int|float} value        an angle in radians
  *
  * @returns {float}
  *
  * @see radians
  */
  p.degrees = function(aAngle) {
    return (aAngle * 180) / Math.PI;
  };

  /**
  * Generates random numbers. Each time the random() function is called, it returns an unexpected value within
  * the specified range. If one parameter is passed to the function it will return a float between zero and the
  * value of the high parameter. The function call random(5) returns values between 0 and 5 (starting at zero,
  * up to but not including 5). If two parameters are passed, it will return a float with a value between the
  * parameters. The function call random(-5, 10.2) returns values starting at -5 up to (but not including) 10.2.
  * To convert a floating-point random number to an integer, use the int() function.
  *
  * @param {int|float} value1         if one parameter is used, the top end to random from, if two params the low end
  * @param {int|float} value2         the top end of the random range
  *
  * @returns {float}
  *
  * @see randomSeed
  * @see noise
  */
  p.random = function() {
    if(arguments.length === 0) {
      return internalRandomGenerator();
    }
    if(arguments.length === 1) {
      return internalRandomGenerator() * arguments[0];
    }
    var aMin = arguments[0], aMax = arguments[1];
    return internalRandomGenerator() * (aMax - aMin) + aMin;
  };

  // Pseudo-random generator
  function Marsaglia(i1, i2) {
    // from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
    var z=i1 || 362436069, w= i2 || 521288629;
    var intGenerator = function() {
      z=(36969*(z&65535)+(z>>>16)) & 0xFFFFFFFF;
      w=(18000*(w&65535)+(w>>>16)) & 0xFFFFFFFF;
      return (((z&0xFFFF)<<16) | (w&0xFFFF)) & 0xFFFFFFFF;
    };

    this.doubleGenerator = function() {
      var i = intGenerator() / 4294967296;
      return i < 0 ? 1 + i : i;
    };
    this.intGenerator = intGenerator;
  }

  Marsaglia.createRandomized = function() {
    var now = new Date();
    return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
  };

  /**
  * Sets the seed value for random(). By default, random() produces different results each time the
  * program is run. Set the value parameter to a constant to return the same pseudo-random numbers
  * each time the software is run.
  *
  * @param {int|float} seed         int
  *
  * @see random
  * @see noise
  * @see noiseSeed
  */
  p.randomSeed = function(seed) {
    internalRandomGenerator = (new Marsaglia(seed)).doubleGenerator;
    this.haveNextNextGaussian = false;
  };

  /**
  * Returns a float from a random series of numbers having a mean of 0 and standard deviation of 1. Each time
  * the randomGaussian() function is called, it returns a number fitting a Gaussian, or normal, distribution.
  * There is theoretically no minimum or maximum value that randomGaussian() might return. Rather, there is just a
  * very low probability that values far from the mean will be returned; and a higher probability that numbers
  * near the mean will be returned.
  *
  * @returns {float}
  *
  * @see random
  * @see noise
  */
  p.randomGaussian = function() {
    if (this.haveNextNextGaussian) {
      this.haveNextNextGaussian = false;
      return this.nextNextGaussian;
    }
    var v1, v2, s;
    do {
      v1 = 2 * internalRandomGenerator() - 1; // between -1.0 and 1.0
      v2 = 2 * internalRandomGenerator() - 1; // between -1.0 and 1.0
      s = v1 * v1 + v2 * v2;
    }
    while (s >= 1 || s === 0);

    var multiplier = Math.sqrt(-2 * Math.log(s) / s);
    this.nextNextGaussian = v2 * multiplier;
    this.haveNextNextGaussian = true;

    return v1 * multiplier;
  };

  // Noise functions and helpers
  function PerlinNoise(seed) {
    var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
    var i, j;
    // http://www.noisemachine.com/talk1/17b.html
    // http://mrl.nyu.edu/~perlin/noise/
    // generate permutation
    var perm = new Uint8Array(512);
    for(i=0;i<256;++i) { perm[i] = i; }
    for(i=0;i<256;++i) { var t = perm[j = rnd.intGenerator() & 0xFF]; perm[j] = perm[i]; perm[i] = t; }
    // copy to avoid taking mod in perm[0];
    for(i=0;i<256;++i) { perm[i + 256] = perm[i]; }

    function grad3d(i,x,y,z) {
      var h = i & 15; // convert into 12 gradient directions
      var u = h<8 ? x : y,
          v = h<4 ? y : h===12||h===14 ? x : z;
      return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v);
    }

    function grad2d(i,x,y) {
      var v = (i & 1) === 0 ? x : y;
      return (i&2) === 0 ? -v : v;
    }

    function grad1d(i,x) {
      return (i&1) === 0 ? -x : x;
    }

    function lerp(t,a,b) { return a + t * (b - a); }

    this.noise3d = function(x, y, z) {
      var X = Math.floor(x)&255, Y = Math.floor(y)&255, Z = Math.floor(z)&255;
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y, fz = (3-2*z)*z*z;
      var p0 = perm[X]+Y, p00 = perm[p0] + Z, p01 = perm[p0 + 1] + Z,
          p1 = perm[X + 1] + Y, p10 = perm[p1] + Z, p11 = perm[p1 + 1] + Z;
      return lerp(fz,
        lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x-1, y, z)),
                 lerp(fx, grad3d(perm[p01], x, y-1, z), grad3d(perm[p11], x-1, y-1,z))),
        lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z-1), grad3d(perm[p10 + 1], x-1, y, z-1)),
                 lerp(fx, grad3d(perm[p01 + 1], x, y-1, z-1), grad3d(perm[p11 + 1], x-1, y-1,z-1))));
    };

    this.noise2d = function(x, y) {
      var X = Math.floor(x)&255, Y = Math.floor(y)&255;
      x -= Math.floor(x); y -= Math.floor(y);
      var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y;
      var p0 = perm[X]+Y, p1 = perm[X + 1] + Y;
      return lerp(fy,
        lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x-1, y)),
        lerp(fx, grad2d(perm[p0 + 1], x, y-1), grad2d(perm[p1 + 1], x-1, y-1)));
    };

    this.noise1d = function(x) {
      var X = Math.floor(x)&255;
      x -= Math.floor(x);
      var fx = (3-2*x)*x*x;
      return lerp(fx, grad1d(perm[X], x), grad1d(perm[X+1], x-1));
    };
  }

  // processing defaults
  var noiseProfile = { generator: undef, octaves: 4, fallout: 0.5, seed: undef};

  /**
  * Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence
  * generator producing a more natural ordered, harmonic succession of numbers compared to the
  * standard random() function. It was invented by Ken Perlin in the 1980s and been used since
  * in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.
  * The main difference to the random() function is that Perlin noise is defined in an infinite
  * n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value
  * (fixed only for the lifespan of the program). The resulting value will always be between 0.0
  * and 1.0. Processing can compute 1D, 2D and 3D noise, depending on the number of coordinates
  * given. The noise value can be animated by moving through the noise space as demonstrated in
  * the example above. The 2nd and 3rd dimension can also be interpreted as time.
  * The actual noise is structured similar to an audio signal, in respect to the function's use
  * of frequencies. Similar to the concept of harmonics in physics, perlin noise is computed over
  * several octaves which are added together for the final result.
  * Another way to adjust the character of the resulting sequence is the scale of the input
  * coordinates. As the function works within an infinite space the value of the coordinates
  * doesn't matter as such, only the distance between successive coordinates does (eg. when using
  * noise() within a loop). As a general rule the smaller the difference between coordinates, the
  * smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications,
  * but this will differ depending on use.
  *
  * @param {float} x          x coordinate in noise space
  * @param {float} y          y coordinate in noise space
  * @param {float} z          z coordinate in noise space
  *
  * @returns {float}
  *
  * @see random
  * @see noiseDetail
  */
  p.noise = function(x, y, z) {
    if(noiseProfile.generator === undef) {
      // caching
      noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
    }
    var generator = noiseProfile.generator;
    var effect = 1, k = 1, sum = 0;
    for(var i=0; i<noiseProfile.octaves; ++i) {
      effect *= noiseProfile.fallout;
      switch (arguments.length) {
      case 1:
        sum += effect * (1 + generator.noise1d(k*x))/2; break;
      case 2:
        sum += effect * (1 + generator.noise2d(k*x, k*y))/2; break;
      case 3:
        sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; break;
      }
      k *= 2;
    }
    return sum;
  };

  /**
  * Adjusts the character and level of detail produced by the Perlin noise function.
  * Similar to harmonics in physics, noise is computed over several octaves. Lower octaves
  * contribute more to the output signal and as such define the overal intensity of the noise,
  * whereas higher octaves create finer grained details in the noise sequence. By default,
  * noise is computed over 4 octaves with each octave contributing exactly half than its
  * predecessor, starting at 50% strength for the 1st octave. This falloff amount can be
  * changed by adding an additional function parameter. Eg. a falloff factor of 0.75 means
  * each octave will now have 75% impact (25% less) of the previous lower octave. Any value
  * between 0.0 and 1.0 is valid, however note that values greater than 0.5 might result in
  * greater than 1.0 values returned by noise(). By changing these parameters, the signal
  * created by the noise() function can be adapted to fit very specific needs and characteristics.
  *
  * @param {int} octaves          number of octaves to be used by the noise() function
  * @param {float} falloff        falloff factor for each octave
  *
  * @see noise
  */
  p.noiseDetail = function(octaves, fallout) {
    noiseProfile.octaves = octaves;
    if(fallout !== undef) {
      noiseProfile.fallout = fallout;
    }
  };

  /**
  * Sets the seed value for noise(). By default, noise() produces different results each
  * time the program is run. Set the value parameter to a constant to return the same
  * pseudo-random numbers each time the software is run.
  *
  * @param {int} seed         int
  *
  * @returns {float}
  *
  * @see random
  * @see radomSeed
  * @see noise
  * @see noiseDetail
  */
  p.noiseSeed = function(seed) {
    noiseProfile.seed = seed;
    noiseProfile.generator = undef;
  };
};

},{}],23:[function(require,module,exports){
/**
 * Common functions traditionally on "p" that should be class functions
 * that get bound to "p" when an instance is actually built, instead.
 */
module.exports = (function commonFunctions(undef) {

  var CommonFunctions = {
    /**
     * Remove whitespace characters from the beginning and ending
     * of a String or a String array. Works like String.trim() but includes the
     * unicode nbsp character as well. If an array is passed in the function will return a new array not effecting the array passed in.
     *
     * @param {String} str    the string to trim
     * @param {String[]} str  the string array to trim
     *
     * @return {String|String[]} retrurns a string or an array will removed whitespaces
     */
    trim: function(str) {
      if (str instanceof Array) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
          arr.push(str[i].replace(/^\s*/, '').replace(/\s*$/, '').replace(/\r*$/, ''));
        }
        return arr;
      }
      return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\r*$/, '');
    },

    /**
     * Converts a degree measurement to its corresponding value in radians. Radians and degrees are two ways of
     * measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example,
     * 90 degrees = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
     *
     * @param {int|float} value        an angle in radians
     *
     * @returns {float}
     *
     * @see degrees
     */
    radians: function(aAngle) {
      return (aAngle / 180) * Math.PI;
    },

    /**
     * Number-to-String formatting function. Prepends "plus" or "minus" depending
     * on whether the value is positive or negative, respectively, after padding
     * the value with zeroes on the left and right, the number of zeroes used dictated
     * by the values 'leftDigits' and 'rightDigits'. 'value' cannot be an array.
     *
     * @param {int|float} value                 the number to format
     * @param {String} plus                     the prefix for positive numbers
     * @param {String} minus                    the prefix for negative numbers
     * @param {int} left                        number of digits to the left of the decimal point
     * @param {int} right                       number of digits to the right of the decimal point
     * @param {String} group                    string delimited for groups, such as the comma in "1,000"
     *
     * @returns {String or String[]}
     *
     * @see nfCore
     */
    nfCoreScalar: function (value, plus, minus, leftDigits, rightDigits, group) {
      var sign = (value < 0) ? minus : plus;
      var autoDetectDecimals = rightDigits === 0;
      var rightDigitsOfDefault = (rightDigits === undef || rightDigits < 0) ? 0 : rightDigits;

      var absValue = Math.abs(value);
      if (autoDetectDecimals) {
        rightDigitsOfDefault = 1;
        absValue *= 10;
        while (Math.abs(Math.round(absValue) - absValue) > 1e-6 && rightDigitsOfDefault < 7) {
          ++rightDigitsOfDefault;
          absValue *= 10;
        }
      } else if (rightDigitsOfDefault !== 0) {
        absValue *= Math.pow(10, rightDigitsOfDefault);
      }

      // Using Java's default rounding policy HALF_EVEN. This policy is based
      // on the idea that 0.5 values round to the nearest even number, and
      // everything else is rounded normally.
      var number, doubled = absValue * 2;
      if (Math.floor(absValue) === absValue) {
        number = absValue;
      } else if (Math.floor(doubled) === doubled) {
        var floored = Math.floor(absValue);
        number = floored + (floored % 2);
      } else {
        number = Math.round(absValue);
      }

      var buffer = "";
      var totalDigits = leftDigits + rightDigitsOfDefault;
      while (totalDigits > 0 || number > 0) {
        totalDigits--;
        buffer = "" + (number % 10) + buffer;
        number = Math.floor(number / 10);
      }
      if (group !== undef) {
        var i = buffer.length - 3 - rightDigitsOfDefault;
        while(i > 0) {
          buffer = buffer.substring(0,i) + group + buffer.substring(i);
          i-=3;
        }
      }
      if (rightDigitsOfDefault > 0) {
        return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) +
               "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
      }
      return sign + buffer;
    },

    /**
    * Number-to-String formatting function. Prepends "plus" or "minus" depending
    * on whether the value is positive or negative, respectively, after padding
    * the value with zeroes on the left and right, the number of zeroes used dictated
    * by the values 'leftDigits' and 'rightDigits'. 'value' can be an array;
    * if the input is an array, each value in it is formatted separately, and
    * an array with formatted values is returned.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {String} plus                     the prefix for positive numbers
    * @param {String} minus                    the prefix for negative numbers
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    * @param {String} group                    string delimited for groups, such as the comma in "1,000"
    *
    * @returns {String or String[]}
    *
    * @see nfCoreScalar
    */
    nfCore: function(value, plus, minus, leftDigits, rightDigits, group) {
      if (value instanceof Array) {
        var arr = [];
        for (var i = 0, len = value.length; i < len; i++) {
          arr.push(CommonFunctions.nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
        }
        return arr;
      }
      return CommonFunctions.nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
    },

    /**
    * Utility function for formatting numbers into strings. There are two versions, one for
    * formatting floats and one for formatting ints. The values for the digits, left, and
    * right parameters should always be positive integers.
    * As shown in the above example, nf() is used to add zeros to the left and/or right
    * of a number. This is typically for aligning a list of numbers. To remove digits from
    * a floating-point number, use the int(), ceil(), floor(), or round() functions.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nfs
    * @see nfp
    * @see nfc
    */
    nf: function(value, leftDigits, rightDigits) {
      return CommonFunctions.nfCore(value, "", "-", leftDigits, rightDigits);
    },

    /**
    * Utility function for formatting numbers into strings. Similar to nf()  but leaves a blank space in front
    * of positive numbers so they align with negative numbers in spite of the minus symbol. There are two
    * versions, one for formatting floats and one for formatting ints. The values for the digits, left,
    * and right parameters should always be positive integers.
    *
    * @param {int|int[]|float|float[]} value   the number(s) to format
    * @param {int} left                        number of digits to the left of the decimal point
    * @param {int} right                       number of digits to the right of the decimal point
    *
    * @returns {String or String[]}
    *
    * @see nf
    * @see nfp
    * @see nfc
    */
    nfs: function(value, leftDigits, rightDigits) {
      return CommonFunctions.nfCore(value, " ", "-", leftDigits, rightDigits);
    },

    /**
    * Utility function for formatting numbers into strings. Similar to nf()  but puts a "+" in front of
    * positive numbers and a "-" in front of negative numbers. There are two versions, one for formatting
    
