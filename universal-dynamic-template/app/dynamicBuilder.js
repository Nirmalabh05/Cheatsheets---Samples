/**
 *
 * Scaffold the application
 * @description
 */
try {
  var ce = new window.CustomEvent('test');
  ce.preventDefault();
  if (ce.defaultPrevented !== true) {
    // IE has problems with .preventDefault() on custom events
    // http://stackoverflow.com/questions/23349191
    throw new Error('Could not prevent default');
  }
} catch (e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    origPrevent = evt.preventDefault;
    evt.preventDefault = function() {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function() {
            return true;
          }
        });
      } catch (e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}
var app = app || {};
app.dom = {};
app.timeouts = [];
var dynamicBuilder = {};
dynamicBuilder.data = [];
/**
 *
 * Function that iterates over the data, building all root level elements
 * @description
 */
function buildDOM(target, data, loop) {
  dynamicBuilder.data = data;
  if (loop !== null) {
    var holdingArray = [];
    for (var j = 0; j < loop; j++) {
      for (var k = 0; k < data.length; k++) {
        if (data[k].t === 'f') {
          holdingArray.push(data[k]);
        }
        if (j === loop - 1 && k === data.length - 1) {
          var holdingString = JSON.stringify(holdingArray);
          var newHoldingString = holdingString.substring(
            1,
            holdingString.length - 1
          );
          var dataString = JSON.stringify(dynamicBuilder.data);
          var newDataString =
            dataString.substring(0, dataString.length - 1) + ',';
          var combinedString = newDataString + newHoldingString + ']';
          dynamicBuilder.data = JSON.parse(combinedString);
          console.log(dynamicBuilder.data);
        }
      }
    }
  }
  app.dom.container = document.querySelector(target);
  app.dom.elements = [];
  for (var i = 0; i < dynamicBuilder.data.length; i++) {
    switch (dynamicBuilder.data[i].t) {
      case 'j':
        writeInScripts(target, i);
        break;
      case 's':
        writeInStyles(target, i);
        break;
      case 'f':
        buildFrame(i);
        break;
      case 'e':
        buildItem(i, null);
        break;
      default:
        console.error('Type is missing');
    }
  }
  dispatchJavascriptLoad();
}

function dispatchJavascriptLoad() {
  if (typeof CustomEvent === 'function') {
    app.dom.javascript = new CustomEvent('javascriptLoad');
    app.dom.container.dispatchEvent(app.dom.javascript);
  } else {
    setTimeout(function() {
      dispatchJavascriptLoad();
    }, 100);
  }
}

function dispatchCreativeEnd() {
  if (typeof CustomEvent === 'function') {
    app.dom.container.dispatchEvent(new CustomEvent('creativeEnd'));
  } else {
    setTimeout(function() {
      dispatchCreativeEnd();
    }, 100);
  }
}

function writeInStyles(target, i) {
  var newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode(dynamicBuilder.data[i].s));
  document.querySelector(target).appendChild(newStyle);
  app.dom.elements.push('addedStyles');
}

function writeInScripts(target, i) {
  app.dom.container.addEventListener('javascriptLoad', function() {
    var newScript = document.createElement('script');
    newScript.appendChild(
      document.createTextNode(atob(dynamicBuilder.data[i].s))
    );
    app.dom.container.appendChild(newScript);
  });
  app.dom.elements.push('addedScripts');
}
/**
 *
 * Function that builds the frames before building any sub elements
 * @param {integer} frameIndex
 * @description
 */
function buildFrame(frameIndex) {
  var frame = document.createElement('div');
  if (dynamicBuilder.data[frameIndex].hasOwnProperty('i')) {
    frame.id = dynamicBuilder.data[frameIndex].i;
  }
  if (
    dynamicBuilder.data[frameIndex].hasOwnProperty('c') &&
    dynamicBuilder.data[frameIndex].c !== ''
  ) {
    frame.className += ' ' + dynamicBuilder.data[frameIndex].c;
  }
  if (dynamicBuilder.data[frameIndex].hasOwnProperty('s')) {
    frame.style.cssText = dynamicBuilder.data[frameIndex].s;
  }
  iterateOverProperties(dynamicBuilder.data[frameIndex], frame);
  app.dom.container.appendChild(frame);
  var array = [];
  array.push(frame);
  app.dom.elements.push(array);
  for (var j = 0; j < dynamicBuilder.data[frameIndex].e.length; j++) {
    buildItem(frameIndex, j);
  }
  if (dynamicBuilder.data[frameIndex].hasOwnProperty('j')) {
    if (dynamicBuilder.data[frameIndex].j.hasOwnProperty('u')) {
      app.dom.container.addEventListener('javascriptLoad', function() {
        if (!dynamicBuilder.data[frameIndex].j.u) {
          return;
        }
        var uniqueElementClass = 'frame-' + frameIndex;
        app.dom.elements[frameIndex][0].className += ' ' + uniqueElementClass;
        var newScript = document.createElement('script');
        newScript.appendChild(
          document.createTextNode(
            'var parentNode = document.querySelector(".' +
              uniqueElementClass +
              '");'
          )
        );
        newScript.appendChild(
          document.createTextNode(atob(dynamicBuilder.data[frameIndex].j.u))
        );
        app.dom.container.appendChild(newScript);
      });
    }
  }
}
/**
 *
 * Function that builds both root level and nested elements
 * @param {integer} frameIndex
 * @param {integer} itemIndex
 * @description
 */
function buildItem(frameIndex, itemIndex) {
  var dataRoot;
  var item;
  if (itemIndex !== null) {
    var frame = app.dom.elements[frameIndex][0];
    dataRoot = dynamicBuilder.data[frameIndex].e[itemIndex];
    item = document.createElement('div');
    iterateOverProperties(dataRoot, item);
    frame.appendChild(item);
    app.dom.elements[frameIndex].push(item);
  } else {
    dataRoot = dynamicBuilder.data[frameIndex];
    item = document.createElement('div');
    iterateOverProperties(dataRoot, item);
    app.dom.container.appendChild(item);
    app.dom.elements.push(item);
  }
}
/**
 *
 * Function that applies all properties specified in the array to its respective element
 * @param {object} dataRoot
 * @param {element} item
 * @description
 */
function iterateOverProperties(dataRoot, item) {
  if (dataRoot.hasOwnProperty('i')) {
    item.id = dataRoot.i;
  }
  if (dataRoot.hasOwnProperty('c') && dataRoot.c !== '') {
    item.className += ' ' + dataRoot.c;
  }
  if (dataRoot.hasOwnProperty('h')) {
    decodeEntities(item, dataRoot.h);
  }
  if (dataRoot.hasOwnProperty('s')) {
    item.style.cssText = dataRoot.s;
  }
}

function decodeEntities(item, data) {
  var entities = [
    {
      e: /&lt;/g,
      r: '<'
    },
    {
      e: /&gt;/g,
      r: '>'
    },
    {
      e: /&amp;/g,
      r: '&'
    }
  ];
  for (var i = 0; i < entities.length; i++) {
    data = data.replace(entities[i].e, entities[i].r);
  }
  item.innerHTML = data;
}
function clearAnimation() {
  for (var i = 0; i < app.timeouts.length; i++) {
    clearTimeout(app.timeouts[i]);
  }
  app.timeouts = [];
}
/**
 *
 * Function that will start the animation based on data from the array
 * @param {integer} i
 * @description
 */
function startAnimation(i, target) {
  if (!target) {
    target = '.dynamicAdvertContainer';
  }
  if (parseInt(i) === 0) {
    clearAnimation();
  }
  // Animation for global elements
  switch (dynamicBuilder.data[i].t) {
    case 'e':
      globalElementEnterAnimation(i, target);
      globalElementExitAnimation(i, target);
      i++;
      if (i < dynamicBuilder.data.length) {
        startAnimation(i, target);
      }
      break;
    case 'f':
      // Animation for frames
      // javascript
      if (dynamicBuilder.data[i].hasOwnProperty('j')) {
        if (dynamicBuilder.data[i].j.hasOwnProperty('s')) {
          var enterScript = document.createElement('script');
          var uniqueElementClass = 'frame-' + i;
          app.dom.elements[i][0].className += ' ' + uniqueElementClass;
          enterScript.appendChild(
            document.createTextNode(
              'var parentNode = document.querySelector(".' +
                uniqueElementClass +
                '");'
            )
          );
          enterScript.appendChild(
            document.createTextNode(atob(dynamicBuilder.data[i].j.s))
          );
          document.querySelector(target).appendChild(enterScript);
        }
      }
      if (dynamicBuilder.data[i].hasOwnProperty('a')) {
        if (dynamicBuilder.data[i].a.hasOwnProperty('n')) {
          if (Array.isArray(app.dom.elements[i])) {
            app.dom.elements[i][0].style.transition =
              dynamicBuilder.data[i].a.n;
            app.dom.elements[i][0].style.setProperty(
              '-webkit-transition',
              dynamicBuilder.data[i].a.n
            );
          } else {
            app.dom.elements[i].style.transition = dynamicBuilder.data[i].a.n;
            app.dom.elements[i].style.setProperty(
              '-webkit-transition',
              dynamicBuilder.data[i].a.n
            );
          }
        }
        if (dynamicBuilder.data[i].a.hasOwnProperty('b')) {
          if (Array.isArray(app.dom.elements[i])) {
            app.dom.elements[i][0].style.cssText += dynamicBuilder.data[i].a.b;
          } else {
            app.dom.elements[i].style.cssText += dynamicBuilder.data[i].a.b;
          }
        }
      }
      for (var j = 0; j < dynamicBuilder.data[i].e.length; j++) {
        // Animation for frame elements
        elementEnterAnimation(i, j, target);
        elementExitAnimation(i, j, target);
      }
      app.timeouts.push(
        setTimeout(function() {
          // Exit animation for frames
          // javascript
          if (dynamicBuilder.data[i].hasOwnProperty('j')) {
            if (dynamicBuilder.data[i].j.hasOwnProperty('e')) {
              var enterScript = document.createElement('script');
              var uniqueElementClass = 'frame-' + i;
              app.dom.elements[i][0].className += ' ' + uniqueElementClass;
              enterScript.appendChild(
                document.createTextNode(
                  'var parentNode = document.querySelector(".' +
                    uniqueElementClass +
                    '");'
                )
              );
              enterScript.appendChild(
                document.createTextNode(atob(dynamicBuilder.data[i].j.s))
              );
              document.querySelector(target).appendChild(enterScript);
            }
          }
          if (dynamicBuilder.data[i].hasOwnProperty('a')) {
            if (dynamicBuilder.data[i].a.hasOwnProperty('x')) {
              app.dom.elements[i][0].style.transition =
                dynamicBuilder.data[i].a.x;
              app.dom.elements[i][0].style.setProperty(
                '-webkit-transition',
                dynamicBuilder.data[i].a.x
              );
            }
            if (dynamicBuilder.data[i].a.hasOwnProperty('a')) {
              app.dom.elements[i][0].style.cssText +=
                dynamicBuilder.data[i].a.a;
            }
          }
          i++;
          if (i < dynamicBuilder.data.length) {
            // Loop for all frames
            startAnimation(i, target);
          } else {
            dispatchCreativeEnd();
          }
        }, dynamicBuilder.data[i].d)
      );
      break;
    case 'j':
      i++;
      if (i < dynamicBuilder.data.length) {
        startAnimation(i, target);
      }
      break;
    case 's':
      i++;
      if (i < dynamicBuilder.data.length) {
        startAnimation(i, target);
      }
      break;
  }
}
/**
 *
 * Function to set element entry animation
 * @param {integer} i
 * @param {integer} j
 * @description
 */
function elementEnterAnimation(i, j, target) {
  if (dynamicBuilder.data[i].e[j].hasOwnProperty('a')) {
    if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('s')) {
      app.timeouts.push(
        setTimeout(function() {
          // javascript
          if (dynamicBuilder.data[i].e[j].hasOwnProperty('j')) {
            if (dynamicBuilder.data[i].e[j].j.hasOwnProperty('s')) {
              var enterScript = document.createElement('script');
              var uniqueElementClass = 'elements-' + i + '-' + (j + 1);
              app.dom.elements[i][j + 1].className += ' ' + uniqueElementClass;
              enterScript.appendChild(
                document.createTextNode(
                  'var parentNode = document.querySelector(".' +
                    uniqueElementClass +
                    '");'
                )
              );
              enterScript.appendChild(
                document.createTextNode(atob(dynamicBuilder.data[i].e[j].j.s))
              );
              document.querySelector(target).appendChild(enterScript);
            }
          }
          // animation
          if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('n')) {
            app.dom.elements[i][j + 1].style.transition =
              dynamicBuilder.data[i].e[j].a.n;
            app.dom.elements[i][j + 1].style.setProperty(
              '-webkit-transition',
              dynamicBuilder.data[i].e[j].a.n
            );
          }
          if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('b')) {
            app.dom.elements[i][j + 1].style.cssText +=
              dynamicBuilder.data[i].e[j].a.b;
          }
        }, dynamicBuilder.data[i].e[j].a.s)
      );
    }
  }
}
/**
 *
 * Function to set element exit animation
 * @param {integer} i
 * @param {integer} j
 * @description
 */
function elementExitAnimation(i, j, target) {
  if (dynamicBuilder.data[i].e[j].hasOwnProperty('a')) {
    if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('e')) {
      app.timeouts.push(
        setTimeout(function() {
          // javascript
          if (dynamicBuilder.data[i].e[j].hasOwnProperty('j')) {
            if (dynamicBuilder.data[i].e[j].j.hasOwnProperty('e')) {
              var exitScript = document.createElement('script');
              var uniqueElementClass = 'elements-' + i + '-' + (j + 1);
              app.dom.elements[i][j + 1].className += ' ' + uniqueElementClass;
              exitScript.appendChild(
                document.createTextNode(
                  'var parentNode = document.querySelector(".' +
                    uniqueElementClass +
                    '");'
                )
              );
              exitScript.appendChild(
                document.createTextNode(atob(dynamicBuilder.data[i].e[j].j.e))
              );
              document.querySelector(target).appendChild(exitScript);
            }
          }
          // animation
          if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('x')) {
            app.dom.elements[i][j + 1].style.transition =
              dynamicBuilder.data[i].e[j].a.x;
            app.dom.elements[i][j + 1].style.setProperty(
              '-webkit-transition',
              dynamicBuilder.data[i].e[j].a.x
            );
          }
          if (dynamicBuilder.data[i].e[j].a.hasOwnProperty('a')) {
            app.dom.elements[i][j + 1].style.cssText +=
              dynamicBuilder.data[i].e[j].a.a;
          }
        }, dynamicBuilder.data[i].e[j].a.e)
      );
    }
  }
}
/**
 *
 * Function to set global element entry animation
 * @param {integer} i
 * @description
 */
function globalElementEnterAnimation(i, target) {
  if (dynamicBuilder.data[i].hasOwnProperty('a')) {
    if (dynamicBuilder.data[i].a.hasOwnProperty('s')) {
      app.timeouts.push(
        setTimeout(function() {
          // javascript
          if (dynamicBuilder.data[i].hasOwnProperty('j')) {
            if (dynamicBuilder.data[i].j.hasOwnProperty('s')) {
              var enterScript = document.createElement('script');
              var uniqueElementClass = 'elements-' + i;
              app.dom.elements[i].className += ' ' + uniqueElementClass;
              enterScript.appendChild(
                document.createTextNode(
                  'var parentNode = document.querySelector(".' +
                    uniqueElementClass +
                    '");'
                )
              );
              enterScript.appendChild(
                document.createTextNode(atob(dynamicBuilder.data[i].j.s))
              );
              document.querySelector(target).appendChild(enterScript);
            }
          }
          // animation
          if (dynamicBuilder.data[i].a.hasOwnProperty('n')) {
            if (Array.isArray(app.dom.elements[i])) {
              app.dom.elements[i][0].style.transition =
                dynamicBuilder.data[i].a.n;
              app.dom.elements[i][0].style.setProperty(
                '-webkit-transition',
                dynamicBuilder.data[i].a.n
              );
            } else {
              app.dom.elements[i].style.transition = dynamicBuilder.data[i].a.n;
              app.dom.elements[i].style.setProperty(
                '-webkit-transition',
                dynamicBuilder.data[i].a.n
              );
            }
          }
          if (dynamicBuilder.data[i].a.hasOwnProperty('b')) {
            if (Array.isArray(app.dom.elements[i])) {
              app.dom.elements[i][0].style.cssText +=
                dynamicBuilder.data[i].a.b;
            } else {
              app.dom.elements[i].style.cssText += dynamicBuilder.data[i].a.b;
            }
          }
        }, dynamicBuilder.data[i].a.s)
      );
    }
  }
}
/**
 *
 * Function to set global element exit animation
 * @param {integer} i
 * @description
 */
function globalElementExitAnimation(i, target) {
  if (dynamicBuilder.data[i].hasOwnProperty('a')) {
    if (dynamicBuilder.data[i].a.hasOwnProperty('e')) {
      app.timeouts.push(
        setTimeout(function() {
          // javascript
          if (dynamicBuilder.data[i].hasOwnProperty('j')) {
            if (dynamicBuilder.data[i].j.hasOwnProperty('e')) {
              var exitScript = document.createElement('script');
              var uniqueElementClass = 'elements-' + i;
              app.dom.elements[i].className += ' ' + uniqueElementClass;
              exitScript.appendChild(
                document.createTextNode(
                  'var parentNode = document.querySelector(".' +
                    uniqueElementClass +
                    '");'
                )
              );
              exitScript.appendChild(
                document.createTextNode(atob(dynamicBuilder.data[i].j.e))
              );
              document.querySelector(target).appendChild(exitScript);
            }
          }
          // animation
          if (dynamicBuilder.data[i].a.hasOwnProperty('x')) {
            if (Array.isArray(app.dom.elements[i])) {
              app.dom.elements[i][0].style.transition =
                dynamicBuilder.data[i].a.x;
              app.dom.elements[i][0].style.setProperty(
                '-webkit-transition',
                dynamicBuilder.data[i].a.x
              );
            } else {
              app.dom.elements[i].style.transition = dynamicBuilder.data[i].a.x;
              app.dom.elements[i].style.setProperty(
                '-webkit-transition',
                dynamicBuilder.data[i].a.x
              );
            }
          }
          if (dynamicBuilder.data[i].a.hasOwnProperty('a')) {
            if (Array.isArray(app.dom.elements[i])) {
              app.dom.elements[i][0].style.cssText +=
                dynamicBuilder.data[i].a.a;
            } else {
              app.dom.elements[i].style.cssText += dynamicBuilder.data[i].a.a;
            }
          }
        }, dynamicBuilder.data[i].a.e)
      );
    }
  }
}
