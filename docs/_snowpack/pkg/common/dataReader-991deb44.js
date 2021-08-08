import { S as Scalar, Q as Quaternion, a as Vector3, V as Vector2, Z as Size, C as Color3, b as Color4, M as Matrix, F as SerializationHelper, aJ as WebRequest, _ as _TypeStore, N as Node, T as TmpVectors, c as __extends, q as Space, k as ArrayTools, i as Scene, O as Observable, P as PrecisionDate, E as EngineStore, o as Mesh, L as Logger, g as AbstractScene, f as Engine, az as _DevTools, u as Tools, af as ThinEngine, W as InternalTexture, R as InternalTextureSource, J as Texture, D as DeepCopier, m as Camera, K as KeyboardEventTypes, s as __decorate, t as serialize, j as PointerEventTypes, bb as Coordinate, e as Epsilon, r as Axis, x as serializeAsVector3, y as serializeAsMeshReference, aD as Light, aj as serializeAsColor3, a0 as VertexBuffer, a9 as MaterialHelper, v as __assign, d as Vector4, aa as Material, aq as EffectFallbacks, bE as FileTools, B as Effect, G as PostProcess, ar as BaseTexture, at as SphericalPolynomial, b5 as SceneLoaderFlags, aY as FilesInputStore, al as serializeAsTexture, au as StringTools, aW as serializeAsMatrix, ap as SmartArray, n as VertexData } from './pbrMaterial-e2c29195.js';

/**
 * Enum for the animation key frame interpolation type
 */
var AnimationKeyInterpolation;

(function (AnimationKeyInterpolation) {
  /**
   * Do not interpolate between keys and use the start key value only. Tangents are ignored
   */
  AnimationKeyInterpolation[AnimationKeyInterpolation["STEP"] = 1] = "STEP";
})(AnimationKeyInterpolation || (AnimationKeyInterpolation = {}));

/**
 * Represents the range of an animation
 */
var AnimationRange = function () {
  /**
   * Initializes the range of an animation
   * @param name The name of the animation range
   * @param from The starting frame of the animation
   * @param to The ending frame of the animation
   */
  function AnimationRange(
  /**The name of the animation range**/
  name,
  /**The starting frame of the animation */
  from,
  /**The ending frame of the animation*/
  to) {
    this.name = name;
    this.from = from;
    this.to = to;
  }
  /**
   * Makes a copy of the animation range
   * @returns A copy of the animation range
   */


  AnimationRange.prototype.clone = function () {
    return new AnimationRange(this.name, this.from, this.to);
  };

  return AnimationRange;
}();

/**
 * @hidden
 */

var _IAnimationState = function () {
  function _IAnimationState() {}

  return _IAnimationState;
}();
/**
 * Class used to store any kind of animation
 */

var Animation = function () {
  /**
   * Initializes the animation
   * @param name Name of the animation
   * @param targetProperty Property to animate
   * @param framePerSecond The frames per second of the animation
   * @param dataType The data type of the animation
   * @param loopMode The loop mode of the animation
   * @param enableBlending Specifies if blending should be enabled
   */
  function Animation(
  /**Name of the animation */
  name,
  /**Property to animate */
  targetProperty,
  /**The frames per second of the animation */
  framePerSecond,
  /**The data type of the animation */
  dataType,
  /**The loop mode of the animation */
  loopMode,
  /**Specifies if blending should be enabled */
  enableBlending) {
    this.name = name;
    this.targetProperty = targetProperty;
    this.framePerSecond = framePerSecond;
    this.dataType = dataType;
    this.loopMode = loopMode;
    this.enableBlending = enableBlending;
    /**
     * @hidden Internal use only
     */

    this._runtimeAnimations = new Array();
    /**
     * The set of event that will be linked to this animation
     */

    this._events = new Array();
    /**
     * Stores the blending speed of the animation
     */

    this.blendingSpeed = 0.01;
    /**
     * Stores the animation ranges for the animation
     */

    this._ranges = {};
    this.targetPropertyPath = targetProperty.split(".");
    this.dataType = dataType;
    this.loopMode = loopMode === undefined ? Animation.ANIMATIONLOOPMODE_CYCLE : loopMode;
  }
  /**
   * @hidden Internal use
   */


  Animation._PrepareAnimation = function (name, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction) {
    var dataType = undefined;

    if (!isNaN(parseFloat(from)) && isFinite(from)) {
      dataType = Animation.ANIMATIONTYPE_FLOAT;
    } else if (from instanceof Quaternion) {
      dataType = Animation.ANIMATIONTYPE_QUATERNION;
    } else if (from instanceof Vector3) {
      dataType = Animation.ANIMATIONTYPE_VECTOR3;
    } else if (from instanceof Vector2) {
      dataType = Animation.ANIMATIONTYPE_VECTOR2;
    } else if (from instanceof Color3) {
      dataType = Animation.ANIMATIONTYPE_COLOR3;
    } else if (from instanceof Color4) {
      dataType = Animation.ANIMATIONTYPE_COLOR4;
    } else if (from instanceof Size) {
      dataType = Animation.ANIMATIONTYPE_SIZE;
    }

    if (dataType == undefined) {
      return null;
    }

    var animation = new Animation(name, targetProperty, framePerSecond, dataType, loopMode);
    var keys = [{
      frame: 0,
      value: from
    }, {
      frame: totalFrame,
      value: to
    }];
    animation.setKeys(keys);

    if (easingFunction !== undefined) {
      animation.setEasingFunction(easingFunction);
    }

    return animation;
  };
  /**
   * Sets up an animation
   * @param property The property to animate
   * @param animationType The animation type to apply
   * @param framePerSecond The frames per second of the animation
   * @param easingFunction The easing function used in the animation
   * @returns The created animation
   */


  Animation.CreateAnimation = function (property, animationType, framePerSecond, easingFunction) {
    var animation = new Animation(property + "Animation", property, framePerSecond, animationType, Animation.ANIMATIONLOOPMODE_CONSTANT);
    animation.setEasingFunction(easingFunction);
    return animation;
  };
  /**
   * Create and start an animation on a node
   * @param name defines the name of the global animation that will be run on all nodes
   * @param node defines the root node where the animation will take place
   * @param targetProperty defines property to animate
   * @param framePerSecond defines the number of frame per second yo use
   * @param totalFrame defines the number of frames in total
   * @param from defines the initial value
   * @param to defines the final value
   * @param loopMode defines which loop mode you want to use (off by default)
   * @param easingFunction defines the easing function to use (linear by default)
   * @param onAnimationEnd defines the callback to call when animation end
   * @returns the animatable created for this animation
   */


  Animation.CreateAndStartAnimation = function (name, node, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
    var animation = Animation._PrepareAnimation(name, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);

    if (!animation) {
      return null;
    }

    return node.getScene().beginDirectAnimation(node, [animation], 0, totalFrame, animation.loopMode === 1, 1.0, onAnimationEnd);
  };
  /**
   * Create and start an animation on a node and its descendants
   * @param name defines the name of the global animation that will be run on all nodes
   * @param node defines the root node where the animation will take place
   * @param directDescendantsOnly if true only direct descendants will be used, if false direct and also indirect (children of children, an so on in a recursive manner) descendants will be used
   * @param targetProperty defines property to animate
   * @param framePerSecond defines the number of frame per second to use
   * @param totalFrame defines the number of frames in total
   * @param from defines the initial value
   * @param to defines the final value
   * @param loopMode defines which loop mode you want to use (off by default)
   * @param easingFunction defines the easing function to use (linear by default)
   * @param onAnimationEnd defines the callback to call when an animation ends (will be called once per node)
   * @returns the list of animatables created for all nodes
   * @example https://www.babylonjs-playground.com/#MH0VLI
   */


  Animation.CreateAndStartHierarchyAnimation = function (name, node, directDescendantsOnly, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
    var animation = Animation._PrepareAnimation(name, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);

    if (!animation) {
      return null;
    }

    var scene = node.getScene();
    return scene.beginDirectHierarchyAnimation(node, directDescendantsOnly, [animation], 0, totalFrame, animation.loopMode === 1, 1.0, onAnimationEnd);
  };
  /**
   * Creates a new animation, merges it with the existing animations and starts it
   * @param name Name of the animation
   * @param node Node which contains the scene that begins the animations
   * @param targetProperty Specifies which property to animate
   * @param framePerSecond The frames per second of the animation
   * @param totalFrame The total number of frames
   * @param from The frame at the beginning of the animation
   * @param to The frame at the end of the animation
   * @param loopMode Specifies the loop mode of the animation
   * @param easingFunction (Optional) The easing function of the animation, which allow custom mathematical formulas for animations
   * @param onAnimationEnd Callback to run once the animation is complete
   * @returns Nullable animation
   */


  Animation.CreateMergeAndStartAnimation = function (name, node, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
    var animation = Animation._PrepareAnimation(name, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);

    if (!animation) {
      return null;
    }

    node.animations.push(animation);
    return node.getScene().beginAnimation(node, 0, totalFrame, animation.loopMode === 1, 1.0, onAnimationEnd);
  };
  /**
   * Convert the keyframes for all animations belonging to the group to be relative to a given reference frame.
   * @param sourceAnimation defines the Animation containing keyframes to convert
   * @param referenceFrame defines the frame that keyframes in the range will be relative to
   * @param range defines the name of the AnimationRange belonging to the Animation to convert
   * @param cloneOriginal defines whether or not to clone the animation and convert the clone or convert the original animation (default is false)
   * @param clonedName defines the name of the resulting cloned Animation if cloneOriginal is true
   * @returns a new Animation if cloneOriginal is true or the original Animation if cloneOriginal is false
   */


  Animation.MakeAnimationAdditive = function (sourceAnimation, referenceFrame, range, cloneOriginal, clonedName) {
    if (referenceFrame === void 0) {
      referenceFrame = 0;
    }

    if (cloneOriginal === void 0) {
      cloneOriginal = false;
    }

    var animation = sourceAnimation;

    if (cloneOriginal) {
      animation = sourceAnimation.clone();
      animation.name = clonedName || animation.name;
    }

    if (!animation._keys.length) {
      return animation;
    }

    referenceFrame = referenceFrame >= 0 ? referenceFrame : 0;
    var startIndex = 0;
    var firstKey = animation._keys[0];
    var endIndex = animation._keys.length - 1;
    var lastKey = animation._keys[endIndex];
    var valueStore = {
      referenceValue: firstKey.value,
      referencePosition: TmpVectors.Vector3[0],
      referenceQuaternion: TmpVectors.Quaternion[0],
      referenceScaling: TmpVectors.Vector3[1],
      keyPosition: TmpVectors.Vector3[2],
      keyQuaternion: TmpVectors.Quaternion[1],
      keyScaling: TmpVectors.Vector3[3]
    };
    var referenceFound = false;
    var from = firstKey.frame;
    var to = lastKey.frame;

    if (range) {
      var rangeValue = animation.getRange(range);

      if (rangeValue) {
        from = rangeValue.from;
        to = rangeValue.to;
      }
    }

    var fromKeyFound = firstKey.frame === from;
    var toKeyFound = lastKey.frame === to; // There's only one key, so use it

    if (animation._keys.length === 1) {
      var value = animation._getKeyValue(animation._keys[0]);

      valueStore.referenceValue = value.clone ? value.clone() : value;
      referenceFound = true;
    } // Reference frame is before the first frame, so just use the first frame
    else if (referenceFrame <= firstKey.frame) {
      var value = animation._getKeyValue(firstKey.value);

      valueStore.referenceValue = value.clone ? value.clone() : value;
      referenceFound = true;
    } // Reference frame is after the last frame, so just use the last frame
    else if (referenceFrame >= lastKey.frame) {
      var value = animation._getKeyValue(lastKey.value);

      valueStore.referenceValue = value.clone ? value.clone() : value;
      referenceFound = true;
    } // Find key bookends, create them if they don't exist


    var index = 0;

    while (!referenceFound || !fromKeyFound || !toKeyFound && index < animation._keys.length - 1) {
      var currentKey = animation._keys[index];
      var nextKey = animation._keys[index + 1]; // If reference frame wasn't found yet, check if we can interpolate to it

      if (!referenceFound && referenceFrame >= currentKey.frame && referenceFrame <= nextKey.frame) {
        var value = void 0;

        if (referenceFrame === currentKey.frame) {
          value = animation._getKeyValue(currentKey.value);
        } else if (referenceFrame === nextKey.frame) {
          value = animation._getKeyValue(nextKey.value);
        } else {
          var animationState = {
            key: index,
            repeatCount: 0,
            loopMode: this.ANIMATIONLOOPMODE_CONSTANT
          };
          value = animation._interpolate(referenceFrame, animationState);
        }

        valueStore.referenceValue = value.clone ? value.clone() : value;
        referenceFound = true;
      } // If from key wasn't found yet, check if we can interpolate to it


      if (!fromKeyFound && from >= currentKey.frame && from <= nextKey.frame) {
        if (from === currentKey.frame) {
          startIndex = index;
        } else if (from === nextKey.frame) {
          startIndex = index + 1;
        } else {
          var animationState = {
            key: index,
            repeatCount: 0,
            loopMode: this.ANIMATIONLOOPMODE_CONSTANT
          };

          var value = animation._interpolate(from, animationState);

          var key = {
            frame: from,
            value: value.clone ? value.clone() : value
          };

          animation._keys.splice(index + 1, 0, key);

          startIndex = index + 1;
        }

        fromKeyFound = true;
      } // If to key wasn't found yet, check if we can interpolate to it


      if (!toKeyFound && to >= currentKey.frame && to <= nextKey.frame) {
        if (to === currentKey.frame) {
          endIndex = index;
        } else if (to === nextKey.frame) {
          endIndex = index + 1;
        } else {
          var animationState = {
            key: index,
            repeatCount: 0,
            loopMode: this.ANIMATIONLOOPMODE_CONSTANT
          };

          var value = animation._interpolate(to, animationState);

          var key = {
            frame: to,
            value: value.clone ? value.clone() : value
          };

          animation._keys.splice(index + 1, 0, key);

          endIndex = index + 1;
        }

        toKeyFound = true;
      }

      index++;
    } // Conjugate the quaternion


    if (animation.dataType === Animation.ANIMATIONTYPE_QUATERNION) {
      valueStore.referenceValue.normalize().conjugateInPlace();
    } // Decompose matrix and conjugate the quaternion
    else if (animation.dataType === Animation.ANIMATIONTYPE_MATRIX) {
      valueStore.referenceValue.decompose(valueStore.referenceScaling, valueStore.referenceQuaternion, valueStore.referencePosition);
      valueStore.referenceQuaternion.normalize().conjugateInPlace();
    } // Subtract the reference value from all of the key values


    for (var index = startIndex; index <= endIndex; index++) {
      var key = animation._keys[index]; // If this key was duplicated to create a frame 0 key, skip it because its value has already been updated

      if (index && animation.dataType !== Animation.ANIMATIONTYPE_FLOAT && key.value === firstKey.value) {
        continue;
      }

      switch (animation.dataType) {
        case Animation.ANIMATIONTYPE_MATRIX:
          key.value.decompose(valueStore.keyScaling, valueStore.keyQuaternion, valueStore.keyPosition);
          valueStore.keyPosition.subtractInPlace(valueStore.referencePosition);
          valueStore.keyScaling.divideInPlace(valueStore.referenceScaling);
          valueStore.referenceQuaternion.multiplyToRef(valueStore.keyQuaternion, valueStore.keyQuaternion);
          Matrix.ComposeToRef(valueStore.keyScaling, valueStore.keyQuaternion, valueStore.keyPosition, key.value);
          break;

        case Animation.ANIMATIONTYPE_QUATERNION:
          valueStore.referenceValue.multiplyToRef(key.value, key.value);
          break;

        case Animation.ANIMATIONTYPE_VECTOR2:
        case Animation.ANIMATIONTYPE_VECTOR3:
        case Animation.ANIMATIONTYPE_COLOR3:
        case Animation.ANIMATIONTYPE_COLOR4:
          key.value.subtractToRef(valueStore.referenceValue, key.value);
          break;

        case Animation.ANIMATIONTYPE_SIZE:
          key.value.width -= valueStore.referenceValue.width;
          key.value.height -= valueStore.referenceValue.height;
          break;

        default:
          key.value -= valueStore.referenceValue;
      }
    }

    return animation;
  };
  /**
   * Transition property of an host to the target Value
   * @param property The property to transition
   * @param targetValue The target Value of the property
   * @param host The object where the property to animate belongs
   * @param scene Scene used to run the animation
   * @param frameRate Framerate (in frame/s) to use
   * @param transition The transition type we want to use
   * @param duration The duration of the animation, in milliseconds
   * @param onAnimationEnd Callback trigger at the end of the animation
   * @returns Nullable animation
   */


  Animation.TransitionTo = function (property, targetValue, host, scene, frameRate, transition, duration, onAnimationEnd) {
    if (onAnimationEnd === void 0) {
      onAnimationEnd = null;
    }

    if (duration <= 0) {
      host[property] = targetValue;

      if (onAnimationEnd) {
        onAnimationEnd();
      }

      return null;
    }

    var endFrame = frameRate * (duration / 1000);
    transition.setKeys([{
      frame: 0,
      value: host[property].clone ? host[property].clone() : host[property]
    }, {
      frame: endFrame,
      value: targetValue
    }]);

    if (!host.animations) {
      host.animations = [];
    }

    host.animations.push(transition);
    var animation = scene.beginAnimation(host, 0, endFrame, false);
    animation.onAnimationEnd = onAnimationEnd;
    return animation;
  };

  Object.defineProperty(Animation.prototype, "runtimeAnimations", {
    /**
     * Return the array of runtime animations currently using this animation
     */
    get: function () {
      return this._runtimeAnimations;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Animation.prototype, "hasRunningRuntimeAnimations", {
    /**
     * Specifies if any of the runtime animations are currently running
     */
    get: function () {
      for (var _i = 0, _a = this._runtimeAnimations; _i < _a.length; _i++) {
        var runtimeAnimation = _a[_i];

        if (!runtimeAnimation.isStopped) {
          return true;
        }
      }

      return false;
    },
    enumerable: false,
    configurable: true
  }); // Methods

  /**
   * Converts the animation to a string
   * @param fullDetails support for multiple levels of logging within scene loading
   * @returns String form of the animation
   */

  Animation.prototype.toString = function (fullDetails) {
    var ret = "Name: " + this.name + ", property: " + this.targetProperty;
    ret += ", datatype: " + ["Float", "Vector3", "Quaternion", "Matrix", "Color3", "Vector2"][this.dataType];
    ret += ", nKeys: " + (this._keys ? this._keys.length : "none");
    ret += ", nRanges: " + (this._ranges ? Object.keys(this._ranges).length : "none");

    if (fullDetails) {
      ret += ", Ranges: {";
      var first = true;

      for (var name in this._ranges) {
        if (first) {
          ret += ", ";
          first = false;
        }

        ret += name;
      }

      ret += "}";
    }

    return ret;
  };
  /**
   * Add an event to this animation
   * @param event Event to add
   */


  Animation.prototype.addEvent = function (event) {
    this._events.push(event);

    this._events.sort(function (a, b) {
      return a.frame - b.frame;
    });
  };
  /**
   * Remove all events found at the given frame
   * @param frame The frame to remove events from
   */


  Animation.prototype.removeEvents = function (frame) {
    for (var index = 0; index < this._events.length; index++) {
      if (this._events[index].frame === frame) {
        this._events.splice(index, 1);

        index--;
      }
    }
  };
  /**
   * Retrieves all the events from the animation
   * @returns Events from the animation
   */


  Animation.prototype.getEvents = function () {
    return this._events;
  };
  /**
   * Creates an animation range
   * @param name Name of the animation range
   * @param from Starting frame of the animation range
   * @param to Ending frame of the animation
   */


  Animation.prototype.createRange = function (name, from, to) {
    // check name not already in use; could happen for bones after serialized
    if (!this._ranges[name]) {
      this._ranges[name] = new AnimationRange(name, from, to);
    }
  };
  /**
   * Deletes an animation range by name
   * @param name Name of the animation range to delete
   * @param deleteFrames Specifies if the key frames for the range should also be deleted (true) or not (false)
   */


  Animation.prototype.deleteRange = function (name, deleteFrames) {
    if (deleteFrames === void 0) {
      deleteFrames = true;
    }

    var range = this._ranges[name];

    if (!range) {
      return;
    }

    if (deleteFrames) {
      var from = range.from;
      var to = range.to; // this loop MUST go high to low for multiple splices to work

      for (var key = this._keys.length - 1; key >= 0; key--) {
        if (this._keys[key].frame >= from && this._keys[key].frame <= to) {
          this._keys.splice(key, 1);
        }
      }
    }

    this._ranges[name] = null; // said much faster than 'delete this._range[name]'
  };
  /**
   * Gets the animation range by name, or null if not defined
   * @param name Name of the animation range
   * @returns Nullable animation range
   */


  Animation.prototype.getRange = function (name) {
    return this._ranges[name];
  };
  /**
   * Gets the key frames from the animation
   * @returns The key frames of the animation
   */


  Animation.prototype.getKeys = function () {
    return this._keys;
  };
  /**
   * Gets the highest frame rate of the animation
   * @returns Highest frame rate of the animation
   */


  Animation.prototype.getHighestFrame = function () {
    var ret = 0;

    for (var key = 0, nKeys = this._keys.length; key < nKeys; key++) {
      if (ret < this._keys[key].frame) {
        ret = this._keys[key].frame;
      }
    }

    return ret;
  };
  /**
   * Gets the easing function of the animation
   * @returns Easing function of the animation
   */


  Animation.prototype.getEasingFunction = function () {
    return this._easingFunction;
  };
  /**
   * Sets the easing function of the animation
   * @param easingFunction A custom mathematical formula for animation
   */


  Animation.prototype.setEasingFunction = function (easingFunction) {
    this._easingFunction = easingFunction;
  };
  /**
   * Interpolates a scalar linearly
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated scalar value
   */


  Animation.prototype.floatInterpolateFunction = function (startValue, endValue, gradient) {
    return Scalar.Lerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a scalar cubically
   * @param startValue Start value of the animation curve
   * @param outTangent End tangent of the animation
   * @param endValue End value of the animation curve
   * @param inTangent Start tangent of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated scalar value
   */


  Animation.prototype.floatInterpolateFunctionWithTangents = function (startValue, outTangent, endValue, inTangent, gradient) {
    return Scalar.Hermite(startValue, outTangent, endValue, inTangent, gradient);
  };
  /**
   * Interpolates a quaternion using a spherical linear interpolation
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated quaternion value
   */


  Animation.prototype.quaternionInterpolateFunction = function (startValue, endValue, gradient) {
    return Quaternion.Slerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a quaternion cubically
   * @param startValue Start value of the animation curve
   * @param outTangent End tangent of the animation curve
   * @param endValue End value of the animation curve
   * @param inTangent Start tangent of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated quaternion value
   */


  Animation.prototype.quaternionInterpolateFunctionWithTangents = function (startValue, outTangent, endValue, inTangent, gradient) {
    return Quaternion.Hermite(startValue, outTangent, endValue, inTangent, gradient).normalize();
  };
  /**
   * Interpolates a Vector3 linearl
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated scalar value
   */


  Animation.prototype.vector3InterpolateFunction = function (startValue, endValue, gradient) {
    return Vector3.Lerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a Vector3 cubically
   * @param startValue Start value of the animation curve
   * @param outTangent End tangent of the animation
   * @param endValue End value of the animation curve
   * @param inTangent Start tangent of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns InterpolatedVector3 value
   */


  Animation.prototype.vector3InterpolateFunctionWithTangents = function (startValue, outTangent, endValue, inTangent, gradient) {
    return Vector3.Hermite(startValue, outTangent, endValue, inTangent, gradient);
  };
  /**
   * Interpolates a Vector2 linearly
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated Vector2 value
   */


  Animation.prototype.vector2InterpolateFunction = function (startValue, endValue, gradient) {
    return Vector2.Lerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a Vector2 cubically
   * @param startValue Start value of the animation curve
   * @param outTangent End tangent of the animation
   * @param endValue End value of the animation curve
   * @param inTangent Start tangent of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated Vector2 value
   */


  Animation.prototype.vector2InterpolateFunctionWithTangents = function (startValue, outTangent, endValue, inTangent, gradient) {
    return Vector2.Hermite(startValue, outTangent, endValue, inTangent, gradient);
  };
  /**
   * Interpolates a size linearly
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated Size value
   */


  Animation.prototype.sizeInterpolateFunction = function (startValue, endValue, gradient) {
    return Size.Lerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a Color3 linearly
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated Color3 value
   */


  Animation.prototype.color3InterpolateFunction = function (startValue, endValue, gradient) {
    return Color3.Lerp(startValue, endValue, gradient);
  };
  /**
   * Interpolates a Color4 linearly
   * @param startValue Start value of the animation curve
   * @param endValue End value of the animation curve
   * @param gradient Scalar amount to interpolate
   * @returns Interpolated Color3 value
   */


  Animation.prototype.color4InterpolateFunction = function (startValue, endValue, gradient) {
    return Color4.Lerp(startValue, endValue, gradient);
  };
  /**
   * @hidden Internal use only
   */


  Animation.prototype._getKeyValue = function (value) {
    if (typeof value === "function") {
      return value();
    }

    return value;
  };
  /**
   * @hidden Internal use only
   */


  Animation.prototype._interpolate = function (currentFrame, state) {
    if (state.loopMode === Animation.ANIMATIONLOOPMODE_CONSTANT && state.repeatCount > 0) {
      return state.highLimitValue.clone ? state.highLimitValue.clone() : state.highLimitValue;
    }

    var keys = this._keys;

    if (keys.length === 1) {
      return this._getKeyValue(keys[0].value);
    }

    var startKeyIndex = state.key;

    if (keys[startKeyIndex].frame >= currentFrame) {
      while (startKeyIndex - 1 >= 0 && keys[startKeyIndex].frame >= currentFrame) {
        startKeyIndex--;
      }
    }

    for (var key = startKeyIndex; key < keys.length; key++) {
      var endKey = keys[key + 1];

      if (endKey.frame >= currentFrame) {
        state.key = key;
        var startKey = keys[key];

        var startValue = this._getKeyValue(startKey.value);

        if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
          return startValue;
        }

        var endValue = this._getKeyValue(endKey.value);

        var useTangent = startKey.outTangent !== undefined && endKey.inTangent !== undefined;
        var frameDelta = endKey.frame - startKey.frame; // gradient : percent of currentFrame between the frame inf and the frame sup

        var gradient = (currentFrame - startKey.frame) / frameDelta; // check for easingFunction and correction of gradient

        var easingFunction = this.getEasingFunction();

        if (easingFunction != null) {
          gradient = easingFunction.ease(gradient);
        }

        switch (this.dataType) {
          // Float
          case Animation.ANIMATIONTYPE_FLOAT:
            var floatValue = useTangent ? this.floatInterpolateFunctionWithTangents(startValue, startKey.outTangent * frameDelta, endValue, endKey.inTangent * frameDelta, gradient) : this.floatInterpolateFunction(startValue, endValue, gradient);

            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return floatValue;

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return state.offsetValue * state.repeatCount + floatValue;
            }

            break;
          // Quaternion

          case Animation.ANIMATIONTYPE_QUATERNION:
            var quatValue = useTangent ? this.quaternionInterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.quaternionInterpolateFunction(startValue, endValue, gradient);

            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return quatValue;

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return quatValue.addInPlace(state.offsetValue.scale(state.repeatCount));
            }

            return quatValue;
          // Vector3

          case Animation.ANIMATIONTYPE_VECTOR3:
            var vec3Value = useTangent ? this.vector3InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.vector3InterpolateFunction(startValue, endValue, gradient);

            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return vec3Value;

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return vec3Value.add(state.offsetValue.scale(state.repeatCount));
            }

          // Vector2

          case Animation.ANIMATIONTYPE_VECTOR2:
            var vec2Value = useTangent ? this.vector2InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.vector2InterpolateFunction(startValue, endValue, gradient);

            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return vec2Value;

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return vec2Value.add(state.offsetValue.scale(state.repeatCount));
            }

          // Size

          case Animation.ANIMATIONTYPE_SIZE:
            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return this.sizeInterpolateFunction(startValue, endValue, gradient);

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return this.sizeInterpolateFunction(startValue, endValue, gradient).add(state.offsetValue.scale(state.repeatCount));
            }

          // Color3

          case Animation.ANIMATIONTYPE_COLOR3:
            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return this.color3InterpolateFunction(startValue, endValue, gradient);

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return this.color3InterpolateFunction(startValue, endValue, gradient).add(state.offsetValue.scale(state.repeatCount));
            }

          // Color4

          case Animation.ANIMATIONTYPE_COLOR4:
            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                return this.color4InterpolateFunction(startValue, endValue, gradient);

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return this.color4InterpolateFunction(startValue, endValue, gradient).add(state.offsetValue.scale(state.repeatCount));
            }

          // Matrix

          case Animation.ANIMATIONTYPE_MATRIX:
            switch (state.loopMode) {
              case Animation.ANIMATIONLOOPMODE_CYCLE:
              case Animation.ANIMATIONLOOPMODE_CONSTANT:
                if (Animation.AllowMatricesInterpolation) {
                  return this.matrixInterpolateFunction(startValue, endValue, gradient, state.workValue);
                }

              case Animation.ANIMATIONLOOPMODE_RELATIVE:
                return startValue;
            }
        }

        break;
      }
    }

    return this._getKeyValue(keys[keys.length - 1].value);
  };
  /**
   * Defines the function to use to interpolate matrices
   * @param startValue defines the start matrix
   * @param endValue defines the end matrix
   * @param gradient defines the gradient between both matrices
   * @param result defines an optional target matrix where to store the interpolation
   * @returns the interpolated matrix
   */


  Animation.prototype.matrixInterpolateFunction = function (startValue, endValue, gradient, result) {
    if (Animation.AllowMatrixDecomposeForInterpolation) {
      if (result) {
        Matrix.DecomposeLerpToRef(startValue, endValue, gradient, result);
        return result;
      }

      return Matrix.DecomposeLerp(startValue, endValue, gradient);
    }

    if (result) {
      Matrix.LerpToRef(startValue, endValue, gradient, result);
      return result;
    }

    return Matrix.Lerp(startValue, endValue, gradient);
  };
  /**
   * Makes a copy of the animation
   * @returns Cloned animation
   */


  Animation.prototype.clone = function () {
    var clone = new Animation(this.name, this.targetPropertyPath.join("."), this.framePerSecond, this.dataType, this.loopMode);
    clone.enableBlending = this.enableBlending;
    clone.blendingSpeed = this.blendingSpeed;

    if (this._keys) {
      clone.setKeys(this._keys);
    }

    if (this._ranges) {
      clone._ranges = {};

      for (var name in this._ranges) {
        var range = this._ranges[name];

        if (!range) {
          continue;
        }

        clone._ranges[name] = range.clone();
      }
    }

    return clone;
  };
  /**
   * Sets the key frames of the animation
   * @param values The animation key frames to set
   */


  Animation.prototype.setKeys = function (values) {
    this._keys = values.slice(0);
  };
  /**
   * Serializes the animation to an object
   * @returns Serialized object
   */


  Animation.prototype.serialize = function () {
    var serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.property = this.targetProperty;
    serializationObject.framePerSecond = this.framePerSecond;
    serializationObject.dataType = this.dataType;
    serializationObject.loopBehavior = this.loopMode;
    serializationObject.enableBlending = this.enableBlending;
    serializationObject.blendingSpeed = this.blendingSpeed;
    var dataType = this.dataType;
    serializationObject.keys = [];
    var keys = this.getKeys();

    for (var index = 0; index < keys.length; index++) {
      var animationKey = keys[index];
      var key = {};
      key.frame = animationKey.frame;

      switch (dataType) {
        case Animation.ANIMATIONTYPE_FLOAT:
          key.values = [animationKey.value];

          if (animationKey.inTangent !== undefined) {
            key.values.push(animationKey.inTangent);
          }

          if (animationKey.outTangent !== undefined) {
            if (animationKey.inTangent === undefined) {
              key.values.push(undefined);
            }

            key.values.push(animationKey.outTangent);
          }

          break;

        case Animation.ANIMATIONTYPE_QUATERNION:
        case Animation.ANIMATIONTYPE_MATRIX:
        case Animation.ANIMATIONTYPE_VECTOR3:
        case Animation.ANIMATIONTYPE_COLOR3:
        case Animation.ANIMATIONTYPE_COLOR4:
          key.values = animationKey.value.asArray();

          if (animationKey.inTangent != undefined) {
            key.values.push(animationKey.inTangent.asArray());
          }

          if (animationKey.outTangent != undefined) {
            if (animationKey.inTangent === undefined) {
              key.values.push(undefined);
            }

            key.values.push(animationKey.outTangent.asArray());
          }

          break;
      }

      serializationObject.keys.push(key);
    }

    serializationObject.ranges = [];

    for (var name in this._ranges) {
      var source = this._ranges[name];

      if (!source) {
        continue;
      }

      var range = {};
      range.name = name;
      range.from = source.from;
      range.to = source.to;
      serializationObject.ranges.push(range);
    }

    return serializationObject;
  };
  /** @hidden */


  Animation._UniversalLerp = function (left, right, amount) {
    var constructor = left.constructor;

    if (constructor.Lerp) {
      // Lerp supported
      return constructor.Lerp(left, right, amount);
    } else if (constructor.Slerp) {
      // Slerp supported
      return constructor.Slerp(left, right, amount);
    } else if (left.toFixed) {
      // Number
      return left * (1.0 - amount) + amount * right;
    } else {
      // Blending not supported
      return right;
    }
  };
  /**
   * Parses an animation object and creates an animation
   * @param parsedAnimation Parsed animation object
   * @returns Animation object
   */


  Animation.Parse = function (parsedAnimation) {
    var animation = new Animation(parsedAnimation.name, parsedAnimation.property, parsedAnimation.framePerSecond, parsedAnimation.dataType, parsedAnimation.loopBehavior);
    var dataType = parsedAnimation.dataType;
    var keys = [];
    var data;
    var index;

    if (parsedAnimation.enableBlending) {
      animation.enableBlending = parsedAnimation.enableBlending;
    }

    if (parsedAnimation.blendingSpeed) {
      animation.blendingSpeed = parsedAnimation.blendingSpeed;
    }

    for (index = 0; index < parsedAnimation.keys.length; index++) {
      var key = parsedAnimation.keys[index];
      var inTangent;
      var outTangent;

      switch (dataType) {
        case Animation.ANIMATIONTYPE_FLOAT:
          data = key.values[0];

          if (key.values.length >= 1) {
            inTangent = key.values[1];
          }

          if (key.values.length >= 2) {
            outTangent = key.values[2];
          }

          break;

        case Animation.ANIMATIONTYPE_QUATERNION:
          data = Quaternion.FromArray(key.values);

          if (key.values.length >= 8) {
            var _inTangent = Quaternion.FromArray(key.values.slice(4, 8));

            if (!_inTangent.equals(Quaternion.Zero())) {
              inTangent = _inTangent;
            }
          }

          if (key.values.length >= 12) {
            var _outTangent = Quaternion.FromArray(key.values.slice(8, 12));

            if (!_outTangent.equals(Quaternion.Zero())) {
              outTangent = _outTangent;
            }
          }

          break;

        case Animation.ANIMATIONTYPE_MATRIX:
          data = Matrix.FromArray(key.values);
          break;

        case Animation.ANIMATIONTYPE_COLOR3:
          data = Color3.FromArray(key.values);
          break;

        case Animation.ANIMATIONTYPE_COLOR4:
          data = Color4.FromArray(key.values);
          break;

        case Animation.ANIMATIONTYPE_VECTOR3:
        default:
          data = Vector3.FromArray(key.values);
          break;
      }

      var keyData = {};
      keyData.frame = key.frame;
      keyData.value = data;

      if (inTangent != undefined) {
        keyData.inTangent = inTangent;
      }

      if (outTangent != undefined) {
        keyData.outTangent = outTangent;
      }

      keys.push(keyData);
    }

    animation.setKeys(keys);

    if (parsedAnimation.ranges) {
      for (index = 0; index < parsedAnimation.ranges.length; index++) {
        data = parsedAnimation.ranges[index];
        animation.createRange(data.name, data.from, data.to);
      }
    }

    return animation;
  };
  /**
   * Appends the serialized animations from the source animations
   * @param source Source containing the animations
   * @param destination Target to store the animations
   */


  Animation.AppendSerializedAnimations = function (source, destination) {
    SerializationHelper.AppendSerializedAnimations(source, destination);
  };
  /**
   * Creates a new animation or an array of animations from a snippet saved in a remote file
   * @param name defines the name of the animation to create (can be null or empty to use the one from the json data)
   * @param url defines the url to load from
   * @returns a promise that will resolve to the new animation or an array of animations
   */


  Animation.ParseFromFileAsync = function (name, url) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var request = new WebRequest();
      request.addEventListener("readystatechange", function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var serializationObject = JSON.parse(request.responseText);

            if (serializationObject.length) {
              var output = new Array();

              for (var _i = 0, serializationObject_1 = serializationObject; _i < serializationObject_1.length; _i++) {
                var serializedAnimation = serializationObject_1[_i];
                output.push(_this.Parse(serializedAnimation));
              }

              resolve(output);
            } else {
              var output = _this.Parse(serializationObject);

              if (name) {
                output.name = name;
              }

              resolve(output);
            }
          } else {
            reject("Unable to load the animation");
          }
        }
      });
      request.open("GET", url);
      request.send();
    });
  };
  /**
   * Creates an animation or an array of animations from a snippet saved by the Inspector
   * @param snippetId defines the snippet to load
   * @returns a promise that will resolve to the new animation or a new array of animations
   */


  Animation.CreateFromSnippetAsync = function (snippetId) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var request = new WebRequest();
      request.addEventListener("readystatechange", function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var snippet = JSON.parse(JSON.parse(request.responseText).jsonPayload);

            if (snippet.animations) {
              var serializationObject = JSON.parse(snippet.animations);
              var output = new Array();

              for (var _i = 0, serializationObject_2 = serializationObject; _i < serializationObject_2.length; _i++) {
                var serializedAnimation = serializationObject_2[_i];
                output.push(_this.Parse(serializedAnimation));
              }

              resolve(output);
            } else {
              var serializationObject = JSON.parse(snippet.animation);

              var output = _this.Parse(serializationObject);

              output.snippetId = snippetId;
              resolve(output);
            }
          } else {
            reject("Unable to load the snippet " + snippetId);
          }
        }
      });
      request.open("GET", _this.SnippetUrl + "/" + snippetId.replace(/#/g, "/"));
      request.send();
    });
  };
  /**
   * Use matrix interpolation instead of using direct key value when animating matrices
   */


  Animation.AllowMatricesInterpolation = false;
  /**
   * When matrix interpolation is enabled, this boolean forces the system to use Matrix.DecomposeLerp instead of Matrix.Lerp. Interpolation is more precise but slower
   */

  Animation.AllowMatrixDecomposeForInterpolation = true;
  /** Define the Url to load snippets */

  Animation.SnippetUrl = "https://snippet.babylonjs.com"; // Statics

  /**
   * Float animation type
   */

  Animation.ANIMATIONTYPE_FLOAT = 0;
  /**
   * Vector3 animation type
   */

  Animation.ANIMATIONTYPE_VECTOR3 = 1;
  /**
   * Quaternion animation type
   */

  Animation.ANIMATIONTYPE_QUATERNION = 2;
  /**
   * Matrix animation type
   */

  Animation.ANIMATIONTYPE_MATRIX = 3;
  /**
   * Color3 animation type
   */

  Animation.ANIMATIONTYPE_COLOR3 = 4;
  /**
   * Color3 animation type
   */

  Animation.ANIMATIONTYPE_COLOR4 = 7;
  /**
   * Vector2 animation type
   */

  Animation.ANIMATIONTYPE_VECTOR2 = 5;
  /**
   * Size animation type
   */

  Animation.ANIMATIONTYPE_SIZE = 6;
  /**
   * Relative Loop Mode
   */

  Animation.ANIMATIONLOOPMODE_RELATIVE = 0;
  /**
   * Cycle Loop Mode
   */

  Animation.ANIMATIONLOOPMODE_CYCLE = 1;
  /**
   * Constant Loop Mode
   */

  Animation.ANIMATIONLOOPMODE_CONSTANT = 2;
  return Animation;
}();
_TypeStore.RegisteredTypes["BABYLON.Animation"] = Animation;

Node._AnimationRangeFactory = function (name, from, to) {
  return new AnimationRange(name, from, to);
};

// Quaternion

var _staticOffsetValueQuaternion = Object.freeze(new Quaternion(0, 0, 0, 0)); // Vector3


var _staticOffsetValueVector3 = Object.freeze(Vector3.Zero()); // Vector2


var _staticOffsetValueVector2 = Object.freeze(Vector2.Zero()); // Size


var _staticOffsetValueSize = Object.freeze(Size.Zero()); // Color3


var _staticOffsetValueColor3 = Object.freeze(Color3.Black());
/**
 * Defines a runtime animation
 */


var RuntimeAnimation = function () {
  /**
   * Create a new RuntimeAnimation object
   * @param target defines the target of the animation
   * @param animation defines the source animation object
   * @param scene defines the hosting scene
   * @param host defines the initiating Animatable
   */
  function RuntimeAnimation(target, animation, scene, host) {
    var _this = this;

    this._events = new Array();
    /**
     * The current frame of the runtime animation
     */

    this._currentFrame = 0;
    /**
     * The original value of the runtime animation
     */

    this._originalValue = new Array();
    /**
     * The original blend value of the runtime animation
     */

    this._originalBlendValue = null;
    /**
     * The offsets cache of the runtime animation
     */

    this._offsetsCache = {};
    /**
     * The high limits cache of the runtime animation
     */

    this._highLimitsCache = {};
    /**
     * Specifies if the runtime animation has been stopped
     */

    this._stopped = false;
    /**
     * The blending factor of the runtime animation
     */

    this._blendingFactor = 0;
    /**
     * The current value of the runtime animation
     */

    this._currentValue = null;
    this._currentActiveTarget = null;
    this._directTarget = null;
    /**
     * The target path of the runtime animation
     */

    this._targetPath = "";
    /**
     * The weight of the runtime animation
     */

    this._weight = 1.0;
    /**
     * The ratio offset of the runtime animation
     */

    this._ratioOffset = 0;
    /**
     * The previous delay of the runtime animation
     */

    this._previousDelay = 0;
    /**
     * The previous ratio of the runtime animation
     */

    this._previousRatio = 0;
    this._targetIsArray = false;
    this._animation = animation;
    this._target = target;
    this._scene = scene;
    this._host = host;
    this._activeTargets = [];

    animation._runtimeAnimations.push(this); // State


    this._animationState = {
      key: 0,
      repeatCount: 0,
      loopMode: this._getCorrectLoopMode()
    };

    if (this._animation.dataType === Animation.ANIMATIONTYPE_MATRIX) {
      this._animationState.workValue = Matrix.Zero();
    } // Limits


    this._keys = this._animation.getKeys();
    this._minFrame = this._keys[0].frame;
    this._maxFrame = this._keys[this._keys.length - 1].frame;
    this._minValue = this._keys[0].value;
    this._maxValue = this._keys[this._keys.length - 1].value; // Add a start key at frame 0 if missing

    if (this._minFrame !== 0) {
      var newKey = {
        frame: 0,
        value: this._minValue
      };

      this._keys.splice(0, 0, newKey);
    } // Check data


    if (this._target instanceof Array) {
      var index = 0;

      for (var _i = 0, _a = this._target; _i < _a.length; _i++) {
        var target_1 = _a[_i];

        this._preparePath(target_1, index);

        this._getOriginalValues(index);

        index++;
      }

      this._targetIsArray = true;
    } else {
      this._preparePath(this._target);

      this._getOriginalValues();

      this._targetIsArray = false;
      this._directTarget = this._activeTargets[0];
    } // Cloning events locally


    var events = animation.getEvents();

    if (events && events.length > 0) {
      events.forEach(function (e) {
        _this._events.push(e._clone());
      });
    }

    this._enableBlending = target && target.animationPropertiesOverride ? target.animationPropertiesOverride.enableBlending : this._animation.enableBlending;
  }

  Object.defineProperty(RuntimeAnimation.prototype, "currentFrame", {
    /**
     * Gets the current frame of the runtime animation
     */
    get: function () {
      return this._currentFrame;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RuntimeAnimation.prototype, "weight", {
    /**
     * Gets the weight of the runtime animation
     */
    get: function () {
      return this._weight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RuntimeAnimation.prototype, "currentValue", {
    /**
     * Gets the current value of the runtime animation
     */
    get: function () {
      return this._currentValue;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RuntimeAnimation.prototype, "targetPath", {
    /**
     * Gets the target path of the runtime animation
     */
    get: function () {
      return this._targetPath;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RuntimeAnimation.prototype, "target", {
    /**
     * Gets the actual target of the runtime animation
     */
    get: function () {
      return this._currentActiveTarget;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RuntimeAnimation.prototype, "isAdditive", {
    /**
     * Gets the additive state of the runtime animation
     */
    get: function () {
      return this._host && this._host.isAdditive;
    },
    enumerable: false,
    configurable: true
  });

  RuntimeAnimation.prototype._preparePath = function (target, targetIndex) {
    if (targetIndex === void 0) {
      targetIndex = 0;
    }

    var targetPropertyPath = this._animation.targetPropertyPath;

    if (targetPropertyPath.length > 1) {
      var property = target[targetPropertyPath[0]];

      for (var index = 1; index < targetPropertyPath.length - 1; index++) {
        property = property[targetPropertyPath[index]];
      }

      this._targetPath = targetPropertyPath[targetPropertyPath.length - 1];
      this._activeTargets[targetIndex] = property;
    } else {
      this._targetPath = targetPropertyPath[0];
      this._activeTargets[targetIndex] = target;
    }
  };

  Object.defineProperty(RuntimeAnimation.prototype, "animation", {
    /**
     * Gets the animation from the runtime animation
     */
    get: function () {
      return this._animation;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Resets the runtime animation to the beginning
   * @param restoreOriginal defines whether to restore the target property to the original value
   */

  RuntimeAnimation.prototype.reset = function (restoreOriginal) {
    if (restoreOriginal === void 0) {
      restoreOriginal = false;
    }

    if (restoreOriginal) {
      if (this._target instanceof Array) {
        var index = 0;

        for (var _i = 0, _a = this._target; _i < _a.length; _i++) {
          var target = _a[_i];

          if (this._originalValue[index] !== undefined) {
            this._setValue(target, this._activeTargets[index], this._originalValue[index], -1, index);
          }

          index++;
        }
      } else {
        if (this._originalValue[0] !== undefined) {
          this._setValue(this._target, this._directTarget, this._originalValue[0], -1, 0);
        }
      }
    }

    this._offsetsCache = {};
    this._highLimitsCache = {};
    this._currentFrame = 0;
    this._blendingFactor = 0; // Events

    for (var index = 0; index < this._events.length; index++) {
      this._events[index].isDone = false;
    }
  };
  /**
   * Specifies if the runtime animation is stopped
   * @returns Boolean specifying if the runtime animation is stopped
   */


  RuntimeAnimation.prototype.isStopped = function () {
    return this._stopped;
  };
  /**
   * Disposes of the runtime animation
   */


  RuntimeAnimation.prototype.dispose = function () {
    var index = this._animation.runtimeAnimations.indexOf(this);

    if (index > -1) {
      this._animation.runtimeAnimations.splice(index, 1);
    }
  };
  /**
   * Apply the interpolated value to the target
   * @param currentValue defines the value computed by the animation
   * @param weight defines the weight to apply to this value (Defaults to 1.0)
   */


  RuntimeAnimation.prototype.setValue = function (currentValue, weight) {
    if (this._targetIsArray) {
      for (var index = 0; index < this._target.length; index++) {
        var target = this._target[index];

        this._setValue(target, this._activeTargets[index], currentValue, weight, index);
      }

      return;
    }

    this._setValue(this._target, this._directTarget, currentValue, weight, 0);
  };

  RuntimeAnimation.prototype._getOriginalValues = function (targetIndex) {
    if (targetIndex === void 0) {
      targetIndex = 0;
    }

    var originalValue;
    var target = this._activeTargets[targetIndex];

    if (target.getRestPose && this._targetPath === "_matrix") {
      // For bones
      originalValue = target.getRestPose();
    } else {
      originalValue = target[this._targetPath];
    }

    if (originalValue && originalValue.clone) {
      this._originalValue[targetIndex] = originalValue.clone();
    } else {
      this._originalValue[targetIndex] = originalValue;
    }
  };

  RuntimeAnimation.prototype._setValue = function (target, destination, currentValue, weight, targetIndex) {
    // Set value
    this._currentActiveTarget = destination;
    this._weight = weight;

    if (this._enableBlending && this._blendingFactor <= 1.0) {
      if (!this._originalBlendValue) {
        var originalValue = destination[this._targetPath];

        if (originalValue.clone) {
          this._originalBlendValue = originalValue.clone();
        } else {
          this._originalBlendValue = originalValue;
        }
      }

      if (this._originalBlendValue.m) {
        // Matrix
        if (Animation.AllowMatrixDecomposeForInterpolation) {
          if (this._currentValue) {
            Matrix.DecomposeLerpToRef(this._originalBlendValue, currentValue, this._blendingFactor, this._currentValue);
          } else {
            this._currentValue = Matrix.DecomposeLerp(this._originalBlendValue, currentValue, this._blendingFactor);
          }
        } else {
          if (this._currentValue) {
            Matrix.LerpToRef(this._originalBlendValue, currentValue, this._blendingFactor, this._currentValue);
          } else {
            this._currentValue = Matrix.Lerp(this._originalBlendValue, currentValue, this._blendingFactor);
          }
        }
      } else {
        this._currentValue = Animation._UniversalLerp(this._originalBlendValue, currentValue, this._blendingFactor);
      }

      var blendingSpeed = target && target.animationPropertiesOverride ? target.animationPropertiesOverride.blendingSpeed : this._animation.blendingSpeed;
      this._blendingFactor += blendingSpeed;
    } else {
      this._currentValue = currentValue;
    }

    if (weight !== -1.0) {
      this._scene._registerTargetForLateAnimationBinding(this, this._originalValue[targetIndex]);
    } else {
      destination[this._targetPath] = this._currentValue;
    }

    if (target.markAsDirty) {
      target.markAsDirty(this._animation.targetProperty);
    }
  };
  /**
   * Gets the loop pmode of the runtime animation
   * @returns Loop Mode
   */


  RuntimeAnimation.prototype._getCorrectLoopMode = function () {
    if (this._target && this._target.animationPropertiesOverride) {
      return this._target.animationPropertiesOverride.loopMode;
    }

    return this._animation.loopMode;
  };
  /**
   * Move the current animation to a given frame
   * @param frame defines the frame to move to
   */


  RuntimeAnimation.prototype.goToFrame = function (frame) {
    var keys = this._animation.getKeys();

    if (frame < keys[0].frame) {
      frame = keys[0].frame;
    } else if (frame > keys[keys.length - 1].frame) {
      frame = keys[keys.length - 1].frame;
    } // Need to reset animation events


    var events = this._events;

    if (events.length) {
      for (var index = 0; index < events.length; index++) {
        if (!events[index].onlyOnce) {
          // reset events in the future
          events[index].isDone = events[index].frame < frame;
        }
      }
    }

    this._currentFrame = frame;

    var currentValue = this._animation._interpolate(frame, this._animationState);

    this.setValue(currentValue, -1);
  };
  /**
   * @hidden Internal use only
   */


  RuntimeAnimation.prototype._prepareForSpeedRatioChange = function (newSpeedRatio) {
    var newRatio = this._previousDelay * (this._animation.framePerSecond * newSpeedRatio) / 1000.0;
    this._ratioOffset = this._previousRatio - newRatio;
  };
  /**
   * Execute the current animation
   * @param delay defines the delay to add to the current frame
   * @param from defines the lower bound of the animation range
   * @param to defines the upper bound of the animation range
   * @param loop defines if the current animation must loop
   * @param speedRatio defines the current speed ratio
   * @param weight defines the weight of the animation (default is -1 so no weight)
   * @param onLoop optional callback called when animation loops
   * @returns a boolean indicating if the animation is running
   */


  RuntimeAnimation.prototype.animate = function (delay, from, to, loop, speedRatio, weight) {
    if (weight === void 0) {
      weight = -1.0;
    }

    var animation = this._animation;
    var targetPropertyPath = animation.targetPropertyPath;

    if (!targetPropertyPath || targetPropertyPath.length < 1) {
      this._stopped = true;
      return false;
    }

    var returnValue = true; // Check limits

    if (from < this._minFrame || from > this._maxFrame) {
      from = this._minFrame;
    }

    if (to < this._minFrame || to > this._maxFrame) {
      to = this._maxFrame;
    }

    var range = to - from;
    var offsetValue; // Compute ratio which represents the frame delta between from and to

    var ratio = delay * (animation.framePerSecond * speedRatio) / 1000.0 + this._ratioOffset;
    var highLimitValue = 0;
    this._previousDelay = delay;
    this._previousRatio = ratio;

    if (!loop && to >= from && ratio >= range) {
      // If we are out of range and not looping get back to caller
      returnValue = false;
      highLimitValue = animation._getKeyValue(this._maxValue);
    } else if (!loop && from >= to && ratio <= range) {
      returnValue = false;
      highLimitValue = animation._getKeyValue(this._minValue);
    } else if (this._animationState.loopMode !== Animation.ANIMATIONLOOPMODE_CYCLE) {
      var keyOffset = to.toString() + from.toString();

      if (!this._offsetsCache[keyOffset]) {
        this._animationState.repeatCount = 0;
        this._animationState.loopMode = Animation.ANIMATIONLOOPMODE_CYCLE;

        var fromValue = animation._interpolate(from, this._animationState);

        var toValue = animation._interpolate(to, this._animationState);

        this._animationState.loopMode = this._getCorrectLoopMode();

        switch (animation.dataType) {
          // Float
          case Animation.ANIMATIONTYPE_FLOAT:
            this._offsetsCache[keyOffset] = toValue - fromValue;
            break;
          // Quaternion

          case Animation.ANIMATIONTYPE_QUATERNION:
            this._offsetsCache[keyOffset] = toValue.subtract(fromValue);
            break;
          // Vector3

          case Animation.ANIMATIONTYPE_VECTOR3:
            this._offsetsCache[keyOffset] = toValue.subtract(fromValue);
          // Vector2

          case Animation.ANIMATIONTYPE_VECTOR2:
            this._offsetsCache[keyOffset] = toValue.subtract(fromValue);
          // Size

          case Animation.ANIMATIONTYPE_SIZE:
            this._offsetsCache[keyOffset] = toValue.subtract(fromValue);
          // Color3

          case Animation.ANIMATIONTYPE_COLOR3:
            this._offsetsCache[keyOffset] = toValue.subtract(fromValue);
        }

        this._highLimitsCache[keyOffset] = toValue;
      }

      highLimitValue = this._highLimitsCache[keyOffset];
      offsetValue = this._offsetsCache[keyOffset];
    }

    if (offsetValue === undefined) {
      switch (animation.dataType) {
        // Float
        case Animation.ANIMATIONTYPE_FLOAT:
          offsetValue = 0;
          break;
        // Quaternion

        case Animation.ANIMATIONTYPE_QUATERNION:
          offsetValue = _staticOffsetValueQuaternion;
          break;
        // Vector3

        case Animation.ANIMATIONTYPE_VECTOR3:
          offsetValue = _staticOffsetValueVector3;
          break;
        // Vector2

        case Animation.ANIMATIONTYPE_VECTOR2:
          offsetValue = _staticOffsetValueVector2;
          break;
        // Size

        case Animation.ANIMATIONTYPE_SIZE:
          offsetValue = _staticOffsetValueSize;
          break;
        // Color3

        case Animation.ANIMATIONTYPE_COLOR3:
          offsetValue = _staticOffsetValueColor3;
      }
    } // Compute value


    var currentFrame;

    if (this._host && this._host.syncRoot) {
      var syncRoot = this._host.syncRoot;
      var hostNormalizedFrame = (syncRoot.masterFrame - syncRoot.fromFrame) / (syncRoot.toFrame - syncRoot.fromFrame);
      currentFrame = from + (to - from) * hostNormalizedFrame;
    } else {
      currentFrame = returnValue && range !== 0 ? from + ratio % range : to;
    } // Reset events if looping


    var events = this._events;

    if (range > 0 && this.currentFrame > currentFrame || range < 0 && this.currentFrame < currentFrame) {
      this._onLoop(); // Need to reset animation events


      if (events.length) {
        for (var index = 0; index < events.length; index++) {
          if (!events[index].onlyOnce) {
            // reset event, the animation is looping
            events[index].isDone = false;
          }
        }
      }
    }

    this._currentFrame = currentFrame;
    this._animationState.repeatCount = range === 0 ? 0 : ratio / range >> 0;
    this._animationState.highLimitValue = highLimitValue;
    this._animationState.offsetValue = offsetValue;

    var currentValue = animation._interpolate(currentFrame, this._animationState); // Set value


    this.setValue(currentValue, weight); // Check events

    if (events.length) {
      for (var index = 0; index < events.length; index++) {
        // Make sure current frame has passed event frame and that event frame is within the current range
        // Also, handle both forward and reverse animations
        if (range > 0 && currentFrame >= events[index].frame && events[index].frame >= from || range < 0 && currentFrame <= events[index].frame && events[index].frame <= from) {
          var event = events[index];

          if (!event.isDone) {
            // If event should be done only once, remove it.
            if (event.onlyOnce) {
              events.splice(index, 1);
              index--;
            }

            event.isDone = true;
            event.action(currentFrame);
          } // Don't do anything if the event has already be done.

        }
      }
    }

    if (!returnValue) {
      this._stopped = true;
    }

    return returnValue;
  };

  return RuntimeAnimation;
}();

/**
 * Class used to store bone information
 * @see https://doc.babylonjs.com/how_to/how_to_use_bones_and_skeletons
 */

var Bone = function (_super) {
  __extends(Bone, _super);
  /**
   * Create a new bone
   * @param name defines the bone name
   * @param skeleton defines the parent skeleton
   * @param parentBone defines the parent (can be null if the bone is the root)
   * @param localMatrix defines the local matrix
   * @param restPose defines the rest pose matrix
   * @param baseMatrix defines the base matrix
   * @param index defines index of the bone in the hiearchy
   */


  function Bone(
  /**
   * defines the bone name
   */
  name, skeleton, parentBone, localMatrix, restPose, baseMatrix, index) {
    if (parentBone === void 0) {
      parentBone = null;
    }

    if (localMatrix === void 0) {
      localMatrix = null;
    }

    if (restPose === void 0) {
      restPose = null;
    }

    if (baseMatrix === void 0) {
      baseMatrix = null;
    }

    if (index === void 0) {
      index = null;
    }

    var _this = _super.call(this, name, skeleton.getScene()) || this;

    _this.name = name;
    /**
     * Gets the list of child bones
     */

    _this.children = new Array();
    /** Gets the animations associated with this bone */

    _this.animations = new Array();
    /**
     * @hidden Internal only
     * Set this value to map this bone to a different index in the transform matrices
     * Set this value to -1 to exclude the bone from the transform matrices
     */

    _this._index = null;
    _this._absoluteTransform = new Matrix();
    _this._invertedAbsoluteTransform = new Matrix();
    _this._scalingDeterminant = 1;
    _this._worldTransform = new Matrix();
    _this._needToDecompose = true;
    _this._needToCompose = false;
    /** @hidden */

    _this._linkedTransformNode = null;
    /** @hidden */

    _this._waitingTransformNodeId = null;
    _this._skeleton = skeleton;
    _this._localMatrix = localMatrix ? localMatrix.clone() : Matrix.Identity();
    _this._restPose = restPose ? restPose : _this._localMatrix.clone();
    _this._bindPose = _this._localMatrix.clone();
    _this._baseMatrix = baseMatrix ? baseMatrix : _this._localMatrix.clone();
    _this._index = index;
    skeleton.bones.push(_this);

    _this.setParent(parentBone, false);

    if (baseMatrix || localMatrix) {
      _this._updateDifferenceMatrix();
    }

    return _this;
  }

  Object.defineProperty(Bone.prototype, "_matrix", {
    /** @hidden */
    get: function () {
      this._compose();

      return this._localMatrix;
    },

    /** @hidden */
    set: function (value) {
      this._localMatrix.copyFrom(value);

      this._needToDecompose = true;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the current object class name.
   * @return the class name
   */

  Bone.prototype.getClassName = function () {
    return "Bone";
  }; // Members

  /**
   * Gets the parent skeleton
   * @returns a skeleton
   */


  Bone.prototype.getSkeleton = function () {
    return this._skeleton;
  };
  /**
   * Gets parent bone
   * @returns a bone or null if the bone is the root of the bone hierarchy
   */


  Bone.prototype.getParent = function () {
    return this._parent;
  };
  /**
   * Returns an array containing the root bones
   * @returns an array containing the root bones
   */


  Bone.prototype.getChildren = function () {
    return this.children;
  };
  /**
   * Gets the node index in matrix array generated for rendering
   * @returns the node index
   */


  Bone.prototype.getIndex = function () {
    return this._index === null ? this.getSkeleton().bones.indexOf(this) : this._index;
  };
  /**
   * Sets the parent bone
   * @param parent defines the parent (can be null if the bone is the root)
   * @param updateDifferenceMatrix defines if the difference matrix must be updated
   */


  Bone.prototype.setParent = function (parent, updateDifferenceMatrix) {
    if (updateDifferenceMatrix === void 0) {
      updateDifferenceMatrix = true;
    }

    if (this._parent === parent) {
      return;
    }

    if (this._parent) {
      var index = this._parent.children.indexOf(this);

      if (index !== -1) {
        this._parent.children.splice(index, 1);
      }
    }

    this._parent = parent;

    if (this._parent) {
      this._parent.children.push(this);
    }

    if (updateDifferenceMatrix) {
      this._updateDifferenceMatrix();
    }

    this.markAsDirty();
  };
  /**
   * Gets the local matrix
   * @returns a matrix
   */


  Bone.prototype.getLocalMatrix = function () {
    this._compose();

    return this._localMatrix;
  };
  /**
   * Gets the base matrix (initial matrix which remains unchanged)
   * @returns a matrix
   */


  Bone.prototype.getBaseMatrix = function () {
    return this._baseMatrix;
  };
  /**
   * Gets the rest pose matrix
   * @returns a matrix
   */


  Bone.prototype.getRestPose = function () {
    return this._restPose;
  };
  /**
   * Sets the rest pose matrix
   * @param matrix the local-space rest pose to set for this bone
   */


  Bone.prototype.setRestPose = function (matrix) {
    this._restPose.copyFrom(matrix);
  };
  /**
   * Gets the bind pose matrix
   * @returns the bind pose matrix
   */


  Bone.prototype.getBindPose = function () {
    return this._bindPose;
  };
  /**
   * Sets the bind pose matrix
   * @param matrix the local-space bind pose to set for this bone
   */


  Bone.prototype.setBindPose = function (matrix) {
    this._bindPose.copyFrom(matrix);
  };
  /**
   * Gets a matrix used to store world matrix (ie. the matrix sent to shaders)
   */


  Bone.prototype.getWorldMatrix = function () {
    return this._worldTransform;
  };
  /**
   * Sets the local matrix to rest pose matrix
   */


  Bone.prototype.returnToRest = function () {
    if (this._skeleton._numBonesWithLinkedTransformNode > 0) {
      this.updateMatrix(this._restPose, false, false);
    } else {
      this.updateMatrix(this._restPose, false, true);
    }
  };
  /**
   * Gets the inverse of the absolute transform matrix.
   * This matrix will be multiplied by local matrix to get the difference matrix (ie. the difference between original state and current state)
   * @returns a matrix
   */


  Bone.prototype.getInvertedAbsoluteTransform = function () {
    return this._invertedAbsoluteTransform;
  };
  /**
   * Gets the absolute transform matrix (ie base matrix * parent world matrix)
   * @returns a matrix
   */


  Bone.prototype.getAbsoluteTransform = function () {
    return this._absoluteTransform;
  };
  /**
   * Links with the given transform node.
   * The local matrix of this bone is copied from the transform node every frame.
   * @param transformNode defines the transform node to link to
   */


  Bone.prototype.linkTransformNode = function (transformNode) {
    if (this._linkedTransformNode) {
      this._skeleton._numBonesWithLinkedTransformNode--;
    }

    this._linkedTransformNode = transformNode;

    if (this._linkedTransformNode) {
      this._skeleton._numBonesWithLinkedTransformNode++;
    }
  }; // Properties (matches AbstractMesh properties)

  /**
   * Gets the node used to drive the bone's transformation
   * @returns a transform node or null
   */


  Bone.prototype.getTransformNode = function () {
    return this._linkedTransformNode;
  };

  Object.defineProperty(Bone.prototype, "position", {
    /** Gets or sets current position (in local space) */
    get: function () {
      this._decompose();

      return this._localPosition;
    },
    set: function (newPosition) {
      this._decompose();

      this._localPosition.copyFrom(newPosition);

      this._markAsDirtyAndCompose();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bone.prototype, "rotation", {
    /** Gets or sets current rotation (in local space) */
    get: function () {
      return this.getRotation();
    },
    set: function (newRotation) {
      this.setRotation(newRotation);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bone.prototype, "rotationQuaternion", {
    /** Gets or sets current rotation quaternion (in local space) */
    get: function () {
      this._decompose();

      return this._localRotation;
    },
    set: function (newRotation) {
      this.setRotationQuaternion(newRotation);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bone.prototype, "scaling", {
    /** Gets or sets current scaling (in local space) */
    get: function () {
      return this.getScale();
    },
    set: function (newScaling) {
      this.setScale(newScaling);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bone.prototype, "animationPropertiesOverride", {
    /**
     * Gets the animation properties override
     */
    get: function () {
      return this._skeleton.animationPropertiesOverride;
    },
    enumerable: false,
    configurable: true
  }); // Methods

  Bone.prototype._decompose = function () {
    if (!this._needToDecompose) {
      return;
    }

    this._needToDecompose = false;

    if (!this._localScaling) {
      this._localScaling = Vector3.Zero();
      this._localRotation = Quaternion.Zero();
      this._localPosition = Vector3.Zero();
    }

    this._localMatrix.decompose(this._localScaling, this._localRotation, this._localPosition);
  };

  Bone.prototype._compose = function () {
    if (!this._needToCompose) {
      return;
    }

    if (!this._localScaling) {
      this._needToCompose = false;
      return;
    }

    this._needToCompose = false;
    Matrix.ComposeToRef(this._localScaling, this._localRotation, this._localPosition, this._localMatrix);
  };
  /**
   * Update the base and local matrices
   * @param matrix defines the new base or local matrix
   * @param updateDifferenceMatrix defines if the difference matrix must be updated
   * @param updateLocalMatrix defines if the local matrix should be updated
   */


  Bone.prototype.updateMatrix = function (matrix, updateDifferenceMatrix, updateLocalMatrix) {
    if (updateDifferenceMatrix === void 0) {
      updateDifferenceMatrix = true;
    }

    if (updateLocalMatrix === void 0) {
      updateLocalMatrix = true;
    }

    this._baseMatrix.copyFrom(matrix);

    if (updateDifferenceMatrix) {
      this._updateDifferenceMatrix();
    }

    if (updateLocalMatrix) {
      this._needToCompose = false; // in case there was a pending compose

      this._localMatrix.copyFrom(matrix);

      this._markAsDirtyAndDecompose();
    } else {
      this.markAsDirty();
    }
  };
  /** @hidden */


  Bone.prototype._updateDifferenceMatrix = function (rootMatrix, updateChildren) {
    if (updateChildren === void 0) {
      updateChildren = true;
    }

    if (!rootMatrix) {
      rootMatrix = this._baseMatrix;
    }

    if (this._parent) {
      rootMatrix.multiplyToRef(this._parent._absoluteTransform, this._absoluteTransform);
    } else {
      this._absoluteTransform.copyFrom(rootMatrix);
    }

    this._absoluteTransform.invertToRef(this._invertedAbsoluteTransform);

    if (updateChildren) {
      for (var index = 0; index < this.children.length; index++) {
        this.children[index]._updateDifferenceMatrix();
      }
    }

    this._scalingDeterminant = this._absoluteTransform.determinant() < 0 ? -1 : 1;
  };
  /**
   * Flag the bone as dirty (Forcing it to update everything)
   */


  Bone.prototype.markAsDirty = function () {
    this._currentRenderId++;
    this._childUpdateId++;

    this._skeleton._markAsDirty();
  };
  /** @hidden */


  Bone.prototype._markAsDirtyAndCompose = function () {
    this.markAsDirty();
    this._needToCompose = true;
  };

  Bone.prototype._markAsDirtyAndDecompose = function () {
    this.markAsDirty();
    this._needToDecompose = true;
  };
  /**
   * Translate the bone in local or world space
   * @param vec The amount to translate the bone
   * @param space The space that the translation is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   */


  Bone.prototype.translate = function (vec, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    var lm = this.getLocalMatrix();

    if (space == Space.LOCAL) {
      lm.addAtIndex(12, vec.x);
      lm.addAtIndex(13, vec.y);
      lm.addAtIndex(14, vec.z);
    } else {
      var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

      if (mesh) {
        wm = mesh.getWorldMatrix();
      }

      this._skeleton.computeAbsoluteTransforms();

      var tmat = Bone._tmpMats[0];
      var tvec = Bone._tmpVecs[0];

      if (this._parent) {
        if (mesh && wm) {
          tmat.copyFrom(this._parent.getAbsoluteTransform());
          tmat.multiplyToRef(wm, tmat);
        } else {
          tmat.copyFrom(this._parent.getAbsoluteTransform());
        }
      } else {
        Matrix.IdentityToRef(tmat);
      }

      tmat.setTranslationFromFloats(0, 0, 0);
      tmat.invert();
      Vector3.TransformCoordinatesToRef(vec, tmat, tvec);
      lm.addAtIndex(12, tvec.x);
      lm.addAtIndex(13, tvec.y);
      lm.addAtIndex(14, tvec.z);
    }

    this._markAsDirtyAndDecompose();
  };
  /**
   * Set the postion of the bone in local or world space
   * @param position The position to set the bone
   * @param space The space that the position is in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   */


  Bone.prototype.setPosition = function (position, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    var lm = this.getLocalMatrix();

    if (space == Space.LOCAL) {
      lm.setTranslationFromFloats(position.x, position.y, position.z);
    } else {
      var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

      if (mesh) {
        wm = mesh.getWorldMatrix();
      }

      this._skeleton.computeAbsoluteTransforms();

      var tmat = Bone._tmpMats[0];
      var vec = Bone._tmpVecs[0];

      if (this._parent) {
        if (mesh && wm) {
          tmat.copyFrom(this._parent.getAbsoluteTransform());
          tmat.multiplyToRef(wm, tmat);
        } else {
          tmat.copyFrom(this._parent.getAbsoluteTransform());
        }

        tmat.invert();
      } else {
        Matrix.IdentityToRef(tmat);
      }

      Vector3.TransformCoordinatesToRef(position, tmat, vec);
      lm.setTranslationFromFloats(vec.x, vec.y, vec.z);
    }

    this._markAsDirtyAndDecompose();
  };
  /**
   * Set the absolute position of the bone (world space)
   * @param position The position to set the bone
   * @param mesh The mesh that this bone is attached to
   */


  Bone.prototype.setAbsolutePosition = function (position, mesh) {
    this.setPosition(position, Space.WORLD, mesh);
  };
  /**
   * Scale the bone on the x, y and z axes (in local space)
   * @param x The amount to scale the bone on the x axis
   * @param y The amount to scale the bone on the y axis
   * @param z The amount to scale the bone on the z axis
   * @param scaleChildren sets this to true if children of the bone should be scaled as well (false by default)
   */


  Bone.prototype.scale = function (x, y, z, scaleChildren) {
    if (scaleChildren === void 0) {
      scaleChildren = false;
    }

    var locMat = this.getLocalMatrix(); // Apply new scaling on top of current local matrix

    var scaleMat = Bone._tmpMats[0];
    Matrix.ScalingToRef(x, y, z, scaleMat);
    scaleMat.multiplyToRef(locMat, locMat); // Invert scaling matrix and apply the inverse to all children

    scaleMat.invert();

    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
      var child = _a[_i];
      var cm = child.getLocalMatrix();
      cm.multiplyToRef(scaleMat, cm);
      cm.multiplyAtIndex(12, x);
      cm.multiplyAtIndex(13, y);
      cm.multiplyAtIndex(14, z);

      child._markAsDirtyAndDecompose();
    }

    this._markAsDirtyAndDecompose();

    if (scaleChildren) {
      for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
        var child = _c[_b];
        child.scale(x, y, z, scaleChildren);
      }
    }
  };
  /**
   * Set the bone scaling in local space
   * @param scale defines the scaling vector
   */


  Bone.prototype.setScale = function (scale) {
    this._decompose();

    this._localScaling.copyFrom(scale);

    this._markAsDirtyAndCompose();
  };
  /**
   * Gets the current scaling in local space
   * @returns the current scaling vector
   */


  Bone.prototype.getScale = function () {
    this._decompose();

    return this._localScaling;
  };
  /**
   * Gets the current scaling in local space and stores it in a target vector
   * @param result defines the target vector
   */


  Bone.prototype.getScaleToRef = function (result) {
    this._decompose();

    result.copyFrom(this._localScaling);
  };
  /**
   * Set the yaw, pitch, and roll of the bone in local or world space
   * @param yaw The rotation of the bone on the y axis
   * @param pitch The rotation of the bone on the x axis
   * @param roll The rotation of the bone on the z axis
   * @param space The space that the axes of rotation are in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   */


  Bone.prototype.setYawPitchRoll = function (yaw, pitch, roll, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space === Space.LOCAL) {
      var quat = Bone._tmpQuat;
      Quaternion.RotationYawPitchRollToRef(yaw, pitch, roll, quat);
      this.setRotationQuaternion(quat, space, mesh);
      return;
    }

    var rotMatInv = Bone._tmpMats[0];

    if (!this._getNegativeRotationToRef(rotMatInv, mesh)) {
      return;
    }

    var rotMat = Bone._tmpMats[1];
    Matrix.RotationYawPitchRollToRef(yaw, pitch, roll, rotMat);
    rotMatInv.multiplyToRef(rotMat, rotMat);

    this._rotateWithMatrix(rotMat, space, mesh);
  };
  /**
   * Add a rotation to the bone on an axis in local or world space
   * @param axis The axis to rotate the bone on
   * @param amount The amount to rotate the bone
   * @param space The space that the axis is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   */


  Bone.prototype.rotate = function (axis, amount, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    var rmat = Bone._tmpMats[0];
    rmat.setTranslationFromFloats(0, 0, 0);
    Matrix.RotationAxisToRef(axis, amount, rmat);

    this._rotateWithMatrix(rmat, space, mesh);
  };
  /**
   * Set the rotation of the bone to a particular axis angle in local or world space
   * @param axis The axis to rotate the bone on
   * @param angle The angle that the bone should be rotated to
   * @param space The space that the axis is in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   */


  Bone.prototype.setAxisAngle = function (axis, angle, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space === Space.LOCAL) {
      var quat = Bone._tmpQuat;
      Quaternion.RotationAxisToRef(axis, angle, quat);
      this.setRotationQuaternion(quat, space, mesh);
      return;
    }

    var rotMatInv = Bone._tmpMats[0];

    if (!this._getNegativeRotationToRef(rotMatInv, mesh)) {
      return;
    }

    var rotMat = Bone._tmpMats[1];
    Matrix.RotationAxisToRef(axis, angle, rotMat);
    rotMatInv.multiplyToRef(rotMat, rotMat);

    this._rotateWithMatrix(rotMat, space, mesh);
  };
  /**
   * Set the euler rotation of the bone in local or world space
   * @param rotation The euler rotation that the bone should be set to
   * @param space The space that the rotation is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   */


  Bone.prototype.setRotation = function (rotation, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    this.setYawPitchRoll(rotation.y, rotation.x, rotation.z, space, mesh);
  };
  /**
   * Set the quaternion rotation of the bone in local or world space
   * @param quat The quaternion rotation that the bone should be set to
   * @param space The space that the rotation is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   */


  Bone.prototype.setRotationQuaternion = function (quat, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space === Space.LOCAL) {
      this._decompose();

      this._localRotation.copyFrom(quat);

      this._markAsDirtyAndCompose();

      return;
    }

    var rotMatInv = Bone._tmpMats[0];

    if (!this._getNegativeRotationToRef(rotMatInv, mesh)) {
      return;
    }

    var rotMat = Bone._tmpMats[1];
    Matrix.FromQuaternionToRef(quat, rotMat);
    rotMatInv.multiplyToRef(rotMat, rotMat);

    this._rotateWithMatrix(rotMat, space, mesh);
  };
  /**
   * Set the rotation matrix of the bone in local or world space
   * @param rotMat The rotation matrix that the bone should be set to
   * @param space The space that the rotation is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   */


  Bone.prototype.setRotationMatrix = function (rotMat, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space === Space.LOCAL) {
      var quat = Bone._tmpQuat;
      Quaternion.FromRotationMatrixToRef(rotMat, quat);
      this.setRotationQuaternion(quat, space, mesh);
      return;
    }

    var rotMatInv = Bone._tmpMats[0];

    if (!this._getNegativeRotationToRef(rotMatInv, mesh)) {
      return;
    }

    var rotMat2 = Bone._tmpMats[1];
    rotMat2.copyFrom(rotMat);
    rotMatInv.multiplyToRef(rotMat, rotMat2);

    this._rotateWithMatrix(rotMat2, space, mesh);
  };

  Bone.prototype._rotateWithMatrix = function (rmat, space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    var lmat = this.getLocalMatrix();
    var lx = lmat.m[12];
    var ly = lmat.m[13];
    var lz = lmat.m[14];
    var parent = this.getParent();
    var parentScale = Bone._tmpMats[3];
    var parentScaleInv = Bone._tmpMats[4];

    if (parent && space == Space.WORLD) {
      if (mesh) {
        parentScale.copyFrom(mesh.getWorldMatrix());
        parent.getAbsoluteTransform().multiplyToRef(parentScale, parentScale);
      } else {
        parentScale.copyFrom(parent.getAbsoluteTransform());
      }

      parentScaleInv.copyFrom(parentScale);
      parentScaleInv.invert();
      lmat.multiplyToRef(parentScale, lmat);
      lmat.multiplyToRef(rmat, lmat);
      lmat.multiplyToRef(parentScaleInv, lmat);
    } else {
      if (space == Space.WORLD && mesh) {
        parentScale.copyFrom(mesh.getWorldMatrix());
        parentScaleInv.copyFrom(parentScale);
        parentScaleInv.invert();
        lmat.multiplyToRef(parentScale, lmat);
        lmat.multiplyToRef(rmat, lmat);
        lmat.multiplyToRef(parentScaleInv, lmat);
      } else {
        lmat.multiplyToRef(rmat, lmat);
      }
    }

    lmat.setTranslationFromFloats(lx, ly, lz);
    this.computeAbsoluteTransforms();

    this._markAsDirtyAndDecompose();
  };

  Bone.prototype._getNegativeRotationToRef = function (rotMatInv, mesh) {
    var scaleMatrix = Bone._tmpMats[2];
    rotMatInv.copyFrom(this.getAbsoluteTransform());

    if (mesh) {
      rotMatInv.multiplyToRef(mesh.getWorldMatrix(), rotMatInv);
      Matrix.ScalingToRef(mesh.scaling.x, mesh.scaling.y, mesh.scaling.z, scaleMatrix);
    }

    rotMatInv.invert();

    if (isNaN(rotMatInv.m[0])) {
      // Matrix failed to invert.
      // This can happen if scale is zero for example.
      return false;
    }

    scaleMatrix.multiplyAtIndex(0, this._scalingDeterminant);
    rotMatInv.multiplyToRef(scaleMatrix, rotMatInv);
    return true;
  };
  /**
   * Get the position of the bone in local or world space
   * @param space The space that the returned position is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   * @returns The position of the bone
   */


  Bone.prototype.getPosition = function (space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    var pos = Vector3.Zero();
    this.getPositionToRef(space, mesh, pos);
    return pos;
  };
  /**
   * Copy the position of the bone to a vector3 in local or world space
   * @param space The space that the returned position is in
   * @param mesh The mesh that this bone is attached to. This is only used in world space
   * @param result The vector3 to copy the position to
   */


  Bone.prototype.getPositionToRef = function (space, mesh, result) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space == Space.LOCAL) {
      var lm = this.getLocalMatrix();
      result.x = lm.m[12];
      result.y = lm.m[13];
      result.z = lm.m[14];
    } else {
      var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

      if (mesh) {
        wm = mesh.getWorldMatrix();
      }

      this._skeleton.computeAbsoluteTransforms();

      var tmat = Bone._tmpMats[0];

      if (mesh && wm) {
        tmat.copyFrom(this.getAbsoluteTransform());
        tmat.multiplyToRef(wm, tmat);
      } else {
        tmat = this.getAbsoluteTransform();
      }

      result.x = tmat.m[12];
      result.y = tmat.m[13];
      result.z = tmat.m[14];
    }
  };
  /**
   * Get the absolute position of the bone (world space)
   * @param mesh The mesh that this bone is attached to
   * @returns The absolute position of the bone
   */


  Bone.prototype.getAbsolutePosition = function (mesh) {
    if (mesh === void 0) {
      mesh = null;
    }

    var pos = Vector3.Zero();
    this.getPositionToRef(Space.WORLD, mesh, pos);
    return pos;
  };
  /**
   * Copy the absolute position of the bone (world space) to the result param
   * @param mesh The mesh that this bone is attached to
   * @param result The vector3 to copy the absolute position to
   */


  Bone.prototype.getAbsolutePositionToRef = function (mesh, result) {
    this.getPositionToRef(Space.WORLD, mesh, result);
  };
  /**
   * Compute the absolute transforms of this bone and its children
   */


  Bone.prototype.computeAbsoluteTransforms = function () {
    this._compose();

    if (this._parent) {
      this._localMatrix.multiplyToRef(this._parent._absoluteTransform, this._absoluteTransform);
    } else {
      this._absoluteTransform.copyFrom(this._localMatrix);

      var poseMatrix = this._skeleton.getPoseMatrix();

      if (poseMatrix) {
        this._absoluteTransform.multiplyToRef(poseMatrix, this._absoluteTransform);
      }
    }

    var children = this.children;
    var len = children.length;

    for (var i = 0; i < len; i++) {
      children[i].computeAbsoluteTransforms();
    }
  };
  /**
   * Get the world direction from an axis that is in the local space of the bone
   * @param localAxis The local direction that is used to compute the world direction
   * @param mesh The mesh that this bone is attached to
   * @returns The world direction
   */


  Bone.prototype.getDirection = function (localAxis, mesh) {
    if (mesh === void 0) {
      mesh = null;
    }

    var result = Vector3.Zero();
    this.getDirectionToRef(localAxis, mesh, result);
    return result;
  };
  /**
   * Copy the world direction to a vector3 from an axis that is in the local space of the bone
   * @param localAxis The local direction that is used to compute the world direction
   * @param mesh The mesh that this bone is attached to
   * @param result The vector3 that the world direction will be copied to
   */


  Bone.prototype.getDirectionToRef = function (localAxis, mesh, result) {
    if (mesh === void 0) {
      mesh = null;
    }

    var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

    if (mesh) {
      wm = mesh.getWorldMatrix();
    }

    this._skeleton.computeAbsoluteTransforms();

    var mat = Bone._tmpMats[0];
    mat.copyFrom(this.getAbsoluteTransform());

    if (mesh && wm) {
      mat.multiplyToRef(wm, mat);
    }

    Vector3.TransformNormalToRef(localAxis, mat, result);
    result.normalize();
  };
  /**
   * Get the euler rotation of the bone in local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @returns The euler rotation
   */


  Bone.prototype.getRotation = function (space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    var result = Vector3.Zero();
    this.getRotationToRef(space, mesh, result);
    return result;
  };
  /**
   * Copy the euler rotation of the bone to a vector3.  The rotation can be in either local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @param result The vector3 that the rotation should be copied to
   */


  Bone.prototype.getRotationToRef = function (space, mesh, result) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    var quat = Bone._tmpQuat;
    this.getRotationQuaternionToRef(space, mesh, quat);
    quat.toEulerAnglesToRef(result);
  };
  /**
   * Get the quaternion rotation of the bone in either local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @returns The quaternion rotation
   */


  Bone.prototype.getRotationQuaternion = function (space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    var result = Quaternion.Identity();
    this.getRotationQuaternionToRef(space, mesh, result);
    return result;
  };
  /**
   * Copy the quaternion rotation of the bone to a quaternion.  The rotation can be in either local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @param result The quaternion that the rotation should be copied to
   */


  Bone.prototype.getRotationQuaternionToRef = function (space, mesh, result) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    if (space == Space.LOCAL) {
      this._decompose();

      result.copyFrom(this._localRotation);
    } else {
      var mat = Bone._tmpMats[0];
      var amat = this.getAbsoluteTransform();

      if (mesh) {
        amat.multiplyToRef(mesh.getWorldMatrix(), mat);
      } else {
        mat.copyFrom(amat);
      }

      mat.multiplyAtIndex(0, this._scalingDeterminant);
      mat.multiplyAtIndex(1, this._scalingDeterminant);
      mat.multiplyAtIndex(2, this._scalingDeterminant);
      mat.decompose(undefined, result, undefined);
    }
  };
  /**
   * Get the rotation matrix of the bone in local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @returns The rotation matrix
   */


  Bone.prototype.getRotationMatrix = function (space, mesh) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    var result = Matrix.Identity();
    this.getRotationMatrixToRef(space, mesh, result);
    return result;
  };
  /**
   * Copy the rotation matrix of the bone to a matrix.  The rotation can be in either local or world space
   * @param space The space that the rotation should be in
   * @param mesh The mesh that this bone is attached to.  This is only used in world space
   * @param result The quaternion that the rotation should be copied to
   */


  Bone.prototype.getRotationMatrixToRef = function (space, mesh, result) {
    if (space === void 0) {
      space = Space.LOCAL;
    }

    if (space == Space.LOCAL) {
      this.getLocalMatrix().getRotationMatrixToRef(result);
    } else {
      var mat = Bone._tmpMats[0];
      var amat = this.getAbsoluteTransform();

      if (mesh) {
        amat.multiplyToRef(mesh.getWorldMatrix(), mat);
      } else {
        mat.copyFrom(amat);
      }

      mat.multiplyAtIndex(0, this._scalingDeterminant);
      mat.multiplyAtIndex(1, this._scalingDeterminant);
      mat.multiplyAtIndex(2, this._scalingDeterminant);
      mat.getRotationMatrixToRef(result);
    }
  };
  /**
   * Get the world position of a point that is in the local space of the bone
   * @param position The local position
   * @param mesh The mesh that this bone is attached to
   * @returns The world position
   */


  Bone.prototype.getAbsolutePositionFromLocal = function (position, mesh) {
    if (mesh === void 0) {
      mesh = null;
    }

    var result = Vector3.Zero();
    this.getAbsolutePositionFromLocalToRef(position, mesh, result);
    return result;
  };
  /**
   * Get the world position of a point that is in the local space of the bone and copy it to the result param
   * @param position The local position
   * @param mesh The mesh that this bone is attached to
   * @param result The vector3 that the world position should be copied to
   */


  Bone.prototype.getAbsolutePositionFromLocalToRef = function (position, mesh, result) {
    if (mesh === void 0) {
      mesh = null;
    }

    var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

    if (mesh) {
      wm = mesh.getWorldMatrix();
    }

    this._skeleton.computeAbsoluteTransforms();

    var tmat = Bone._tmpMats[0];

    if (mesh && wm) {
      tmat.copyFrom(this.getAbsoluteTransform());
      tmat.multiplyToRef(wm, tmat);
    } else {
      tmat = this.getAbsoluteTransform();
    }

    Vector3.TransformCoordinatesToRef(position, tmat, result);
  };
  /**
   * Get the local position of a point that is in world space
   * @param position The world position
   * @param mesh The mesh that this bone is attached to
   * @returns The local position
   */


  Bone.prototype.getLocalPositionFromAbsolute = function (position, mesh) {
    if (mesh === void 0) {
      mesh = null;
    }

    var result = Vector3.Zero();
    this.getLocalPositionFromAbsoluteToRef(position, mesh, result);
    return result;
  };
  /**
   * Get the local position of a point that is in world space and copy it to the result param
   * @param position The world position
   * @param mesh The mesh that this bone is attached to
   * @param result The vector3 that the local position should be copied to
   */


  Bone.prototype.getLocalPositionFromAbsoluteToRef = function (position, mesh, result) {
    if (mesh === void 0) {
      mesh = null;
    }

    var wm = null; //mesh.getWorldMatrix() needs to be called before skeleton.computeAbsoluteTransforms()

    if (mesh) {
      wm = mesh.getWorldMatrix();
    }

    this._skeleton.computeAbsoluteTransforms();

    var tmat = Bone._tmpMats[0];
    tmat.copyFrom(this.getAbsoluteTransform());

    if (mesh && wm) {
      tmat.multiplyToRef(wm, tmat);
    }

    tmat.invert();
    Vector3.TransformCoordinatesToRef(position, tmat, result);
  };
  /**
   * Set the current local matrix as the restPose for this bone.
   */


  Bone.prototype.setCurrentPoseAsRest = function () {
    this.setRestPose(this.getLocalMatrix());
  };

  Bone._tmpVecs = ArrayTools.BuildArray(2, Vector3.Zero);
  Bone._tmpQuat = Quaternion.Identity();
  Bone._tmpMats = ArrayTools.BuildArray(5, Matrix.Identity);
  return Bone;
}(Node);

/**
 * Class used to store an actual running animation
 */

var Animatable = function () {
  /**
   * Creates a new Animatable
   * @param scene defines the hosting scene
   * @param target defines the target object
   * @param fromFrame defines the starting frame number (default is 0)
   * @param toFrame defines the ending frame number (default is 100)
   * @param loopAnimation defines if the animation must loop (default is false)
   * @param speedRatio defines the factor to apply to animation speed (default is 1)
   * @param onAnimationEnd defines a callback to call when animation ends if it is not looping
   * @param animations defines a group of animation to add to the new Animatable
   * @param onAnimationLoop defines a callback to call when animation loops
   * @param isAdditive defines whether the animation should be evaluated additively
   */
  function Animatable(scene,
  /** defines the target object */
  target,
  /** defines the starting frame number (default is 0) */
  fromFrame,
  /** defines the ending frame number (default is 100) */
  toFrame,
  /** defines if the animation must loop (default is false)  */
  loopAnimation, speedRatio,
  /** defines a callback to call when animation ends if it is not looping */
  onAnimationEnd, animations,
  /** defines a callback to call when animation loops */
  onAnimationLoop,
  /** defines whether the animation should be evaluated additively */
  isAdditive) {
    if (fromFrame === void 0) {
      fromFrame = 0;
    }

    if (toFrame === void 0) {
      toFrame = 100;
    }

    if (loopAnimation === void 0) {
      loopAnimation = false;
    }

    if (speedRatio === void 0) {
      speedRatio = 1.0;
    }

    if (isAdditive === void 0) {
      isAdditive = false;
    }

    this.target = target;
    this.fromFrame = fromFrame;
    this.toFrame = toFrame;
    this.loopAnimation = loopAnimation;
    this.onAnimationEnd = onAnimationEnd;
    this.onAnimationLoop = onAnimationLoop;
    this.isAdditive = isAdditive;
    this._localDelayOffset = null;
    this._pausedDelay = null;
    this._runtimeAnimations = new Array();
    this._paused = false;
    this._speedRatio = 1;
    this._weight = -1.0;
    this._syncRoot = null;
    /**
     * Gets or sets a boolean indicating if the animatable must be disposed and removed at the end of the animation.
     * This will only apply for non looping animation (default is true)
     */

    this.disposeOnEnd = true;
    /**
     * Gets a boolean indicating if the animation has started
     */

    this.animationStarted = false;
    /**
     * Observer raised when the animation ends
     */

    this.onAnimationEndObservable = new Observable();
    /**
     * Observer raised when the animation loops
     */

    this.onAnimationLoopObservable = new Observable();
    this._scene = scene;

    if (animations) {
      this.appendAnimations(target, animations);
    }

    this._speedRatio = speedRatio;

    scene._activeAnimatables.push(this);
  }

  Object.defineProperty(Animatable.prototype, "syncRoot", {
    /**
     * Gets the root Animatable used to synchronize and normalize animations
     */
    get: function () {
      return this._syncRoot;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Animatable.prototype, "masterFrame", {
    /**
     * Gets the current frame of the first RuntimeAnimation
     * Used to synchronize Animatables
     */
    get: function () {
      if (this._runtimeAnimations.length === 0) {
        return 0;
      }

      return this._runtimeAnimations[0].currentFrame;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Animatable.prototype, "weight", {
    /**
     * Gets or sets the animatable weight (-1.0 by default meaning not weighted)
     */
    get: function () {
      return this._weight;
    },
    set: function (value) {
      if (value === -1) {
        // -1 is ok and means no weight
        this._weight = -1;
        return;
      } // Else weight must be in [0, 1] range


      this._weight = Math.min(Math.max(value, 0), 1.0);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Animatable.prototype, "speedRatio", {
    /**
     * Gets or sets the speed ratio to apply to the animatable (1.0 by default)
     */
    get: function () {
      return this._speedRatio;
    },
    set: function (value) {
      for (var index = 0; index < this._runtimeAnimations.length; index++) {
        var animation = this._runtimeAnimations[index];

        animation._prepareForSpeedRatioChange(value);
      }

      this._speedRatio = value;
    },
    enumerable: false,
    configurable: true
  }); // Methods

  /**
   * Synchronize and normalize current Animatable with a source Animatable
   * This is useful when using animation weights and when animations are not of the same length
   * @param root defines the root Animatable to synchronize with
   * @returns the current Animatable
   */

  Animatable.prototype.syncWith = function (root) {
    this._syncRoot = root;

    if (root) {
      // Make sure this animatable will animate after the root
      var index = this._scene._activeAnimatables.indexOf(this);

      if (index > -1) {
        this._scene._activeAnimatables.splice(index, 1);

        this._scene._activeAnimatables.push(this);
      }
    }

    return this;
  };
  /**
   * Gets the list of runtime animations
   * @returns an array of RuntimeAnimation
   */


  Animatable.prototype.getAnimations = function () {
    return this._runtimeAnimations;
  };
  /**
   * Adds more animations to the current animatable
   * @param target defines the target of the animations
   * @param animations defines the new animations to add
   */


  Animatable.prototype.appendAnimations = function (target, animations) {
    var _this = this;

    for (var index = 0; index < animations.length; index++) {
      var animation = animations[index];
      var newRuntimeAnimation = new RuntimeAnimation(target, animation, this._scene, this);

      newRuntimeAnimation._onLoop = function () {
        _this.onAnimationLoopObservable.notifyObservers(_this);

        if (_this.onAnimationLoop) {
          _this.onAnimationLoop();
        }
      };

      this._runtimeAnimations.push(newRuntimeAnimation);
    }
  };
  /**
   * Gets the source animation for a specific property
   * @param property defines the propertyu to look for
   * @returns null or the source animation for the given property
   */


  Animatable.prototype.getAnimationByTargetProperty = function (property) {
    var runtimeAnimations = this._runtimeAnimations;

    for (var index = 0; index < runtimeAnimations.length; index++) {
      if (runtimeAnimations[index].animation.targetProperty === property) {
        return runtimeAnimations[index].animation;
      }
    }

    return null;
  };
  /**
   * Gets the runtime animation for a specific property
   * @param property defines the propertyu to look for
   * @returns null or the runtime animation for the given property
   */


  Animatable.prototype.getRuntimeAnimationByTargetProperty = function (property) {
    var runtimeAnimations = this._runtimeAnimations;

    for (var index = 0; index < runtimeAnimations.length; index++) {
      if (runtimeAnimations[index].animation.targetProperty === property) {
        return runtimeAnimations[index];
      }
    }

    return null;
  };
  /**
   * Resets the animatable to its original state
   */


  Animatable.prototype.reset = function () {
    var runtimeAnimations = this._runtimeAnimations;

    for (var index = 0; index < runtimeAnimations.length; index++) {
      runtimeAnimations[index].reset(true);
    }

    this._localDelayOffset = null;
    this._pausedDelay = null;
  };
  /**
   * Allows the animatable to blend with current running animations
   * @see https://doc.babylonjs.com/babylon101/animations#animation-blending
   * @param blendingSpeed defines the blending speed to use
   */


  Animatable.prototype.enableBlending = function (blendingSpeed) {
    var runtimeAnimations = this._runtimeAnimations;

    for (var index = 0; index < runtimeAnimations.length; index++) {
      runtimeAnimations[index].animation.enableBlending = true;
      runtimeAnimations[index].animation.blendingSpeed = blendingSpeed;
    }
  };
  /**
   * Disable animation blending
   * @see https://doc.babylonjs.com/babylon101/animations#animation-blending
   */


  Animatable.prototype.disableBlending = function () {
    var runtimeAnimations = this._runtimeAnimations;

    for (var index = 0; index < runtimeAnimations.length; index++) {
      runtimeAnimations[index].animation.enableBlending = false;
    }
  };
  /**
   * Jump directly to a given frame
   * @param frame defines the frame to jump to
   */


  Animatable.prototype.goToFrame = function (frame) {
    var runtimeAnimations = this._runtimeAnimations;

    if (runtimeAnimations[0]) {
      var fps = runtimeAnimations[0].animation.framePerSecond;
      var currentFrame = runtimeAnimations[0].currentFrame;
      var delay = this.speedRatio === 0 ? 0 : (frame - currentFrame) / fps * 1000 / this.speedRatio;

      if (this._localDelayOffset === null) {
        this._localDelayOffset = 0;
      }

      this._localDelayOffset -= delay;
    }

    for (var index = 0; index < runtimeAnimations.length; index++) {
      runtimeAnimations[index].goToFrame(frame);
    }
  };
  /**
   * Pause the animation
   */


  Animatable.prototype.pause = function () {
    if (this._paused) {
      return;
    }

    this._paused = true;
  };
  /**
   * Restart the animation
   */


  Animatable.prototype.restart = function () {
    this._paused = false;
  };

  Animatable.prototype._raiseOnAnimationEnd = function () {
    if (this.onAnimationEnd) {
      this.onAnimationEnd();
    }

    this.onAnimationEndObservable.notifyObservers(this);
  };
  /**
   * Stop and delete the current animation
   * @param animationName defines a string used to only stop some of the runtime animations instead of all
   * @param targetMask - a function that determines if the animation should be stopped based on its target (all animations will be stopped if both this and animationName are empty)
   */


  Animatable.prototype.stop = function (animationName, targetMask) {
    if (animationName || targetMask) {
      var idx = this._scene._activeAnimatables.indexOf(this);

      if (idx > -1) {
        var runtimeAnimations = this._runtimeAnimations;

        for (var index = runtimeAnimations.length - 1; index >= 0; index--) {
          var runtimeAnimation = runtimeAnimations[index];

          if (animationName && runtimeAnimation.animation.name != animationName) {
            continue;
          }

          if (targetMask && !targetMask(runtimeAnimation.target)) {
            continue;
          }

          runtimeAnimation.dispose();
          runtimeAnimations.splice(index, 1);
        }

        if (runtimeAnimations.length == 0) {
          this._scene._activeAnimatables.splice(idx, 1);

          this._raiseOnAnimationEnd();
        }
      }
    } else {
      var index = this._scene._activeAnimatables.indexOf(this);

      if (index > -1) {
        this._scene._activeAnimatables.splice(index, 1);

        var runtimeAnimations = this._runtimeAnimations;

        for (var index = 0; index < runtimeAnimations.length; index++) {
          runtimeAnimations[index].dispose();
        }

        this._raiseOnAnimationEnd();
      }
    }
  };
  /**
   * Wait asynchronously for the animation to end
   * @returns a promise which will be fullfilled when the animation ends
   */


  Animatable.prototype.waitAsync = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.onAnimationEndObservable.add(function () {
        resolve(_this);
      }, undefined, undefined, _this, true);
    });
  };
  /** @hidden */


  Animatable.prototype._animate = function (delay) {
    if (this._paused) {
      this.animationStarted = false;

      if (this._pausedDelay === null) {
        this._pausedDelay = delay;
      }

      return true;
    }

    if (this._localDelayOffset === null) {
      this._localDelayOffset = delay;
      this._pausedDelay = null;
    } else if (this._pausedDelay !== null) {
      this._localDelayOffset += delay - this._pausedDelay;
      this._pausedDelay = null;
    }

    if (this._weight === 0) {
      // We consider that an animation with a weight === 0 is "actively" paused
      return true;
    } // Animating


    var running = false;
    var runtimeAnimations = this._runtimeAnimations;
    var index;

    for (index = 0; index < runtimeAnimations.length; index++) {
      var animation = runtimeAnimations[index];
      var isRunning = animation.animate(delay - this._localDelayOffset, this.fromFrame, this.toFrame, this.loopAnimation, this._speedRatio, this._weight);
      running = running || isRunning;
    }

    this.animationStarted = running;

    if (!running) {
      if (this.disposeOnEnd) {
        // Remove from active animatables
        index = this._scene._activeAnimatables.indexOf(this);

        this._scene._activeAnimatables.splice(index, 1); // Dispose all runtime animations


        for (index = 0; index < runtimeAnimations.length; index++) {
          runtimeAnimations[index].dispose();
        }
      }

      this._raiseOnAnimationEnd();

      if (this.disposeOnEnd) {
        this.onAnimationEnd = null;
        this.onAnimationLoop = null;
        this.onAnimationLoopObservable.clear();
        this.onAnimationEndObservable.clear();
      }
    }

    return running;
  };

  return Animatable;
}();

Scene.prototype._animate = function () {
  if (!this.animationsEnabled) {
    return;
  } // Getting time


  var now = PrecisionDate.Now;

  if (!this._animationTimeLast) {
    if (this._pendingData.length > 0) {
      return;
    }

    this._animationTimeLast = now;
  }

  this.deltaTime = this.useConstantAnimationDeltaTime ? 16.0 : (now - this._animationTimeLast) * this.animationTimeScale;
  this._animationTimeLast = now;
  var animatables = this._activeAnimatables;

  if (animatables.length === 0) {
    return;
  }

  this._animationTime += this.deltaTime;
  var animationTime = this._animationTime;

  for (var index = 0; index < animatables.length; index++) {
    var animatable = animatables[index];

    if (!animatable._animate(animationTime) && animatable.disposeOnEnd) {
      index--; // Array was updated
    }
  } // Late animation bindings


  this._processLateAnimationBindings();
};

Scene.prototype.beginWeightedAnimation = function (target, from, to, weight, loop, speedRatio, onAnimationEnd, animatable, targetMask, onAnimationLoop, isAdditive) {
  if (weight === void 0) {
    weight = 1.0;
  }

  if (speedRatio === void 0) {
    speedRatio = 1.0;
  }

  if (isAdditive === void 0) {
    isAdditive = false;
  }

  var returnedAnimatable = this.beginAnimation(target, from, to, loop, speedRatio, onAnimationEnd, animatable, false, targetMask, onAnimationLoop, isAdditive);
  returnedAnimatable.weight = weight;
  return returnedAnimatable;
};

Scene.prototype.beginAnimation = function (target, from, to, loop, speedRatio, onAnimationEnd, animatable, stopCurrent, targetMask, onAnimationLoop, isAdditive) {
  if (speedRatio === void 0) {
    speedRatio = 1.0;
  }

  if (stopCurrent === void 0) {
    stopCurrent = true;
  }

  if (isAdditive === void 0) {
    isAdditive = false;
  }

  if (from > to && speedRatio > 0) {
    speedRatio *= -1;
  }

  if (stopCurrent) {
    this.stopAnimation(target, undefined, targetMask);
  }

  if (!animatable) {
    animatable = new Animatable(this, target, from, to, loop, speedRatio, onAnimationEnd, undefined, onAnimationLoop, isAdditive);
  }

  var shouldRunTargetAnimations = targetMask ? targetMask(target) : true; // Local animations

  if (target.animations && shouldRunTargetAnimations) {
    animatable.appendAnimations(target, target.animations);
  } // Children animations


  if (target.getAnimatables) {
    var animatables = target.getAnimatables();

    for (var index = 0; index < animatables.length; index++) {
      this.beginAnimation(animatables[index], from, to, loop, speedRatio, onAnimationEnd, animatable, stopCurrent, targetMask, onAnimationLoop);
    }
  }

  animatable.reset();
  return animatable;
};

Scene.prototype.beginHierarchyAnimation = function (target, directDescendantsOnly, from, to, loop, speedRatio, onAnimationEnd, animatable, stopCurrent, targetMask, onAnimationLoop, isAdditive) {
  if (speedRatio === void 0) {
    speedRatio = 1.0;
  }

  if (stopCurrent === void 0) {
    stopCurrent = true;
  }

  if (isAdditive === void 0) {
    isAdditive = false;
  }

  var children = target.getDescendants(directDescendantsOnly);
  var result = [];
  result.push(this.beginAnimation(target, from, to, loop, speedRatio, onAnimationEnd, animatable, stopCurrent, targetMask, undefined, isAdditive));

  for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
    var child = children_1[_i];
    result.push(this.beginAnimation(child, from, to, loop, speedRatio, onAnimationEnd, animatable, stopCurrent, targetMask, undefined, isAdditive));
  }

  return result;
};

Scene.prototype.beginDirectAnimation = function (target, animations, from, to, loop, speedRatio, onAnimationEnd, onAnimationLoop, isAdditive) {
  if (isAdditive === void 0) {
    isAdditive = false;
  }

  if (speedRatio === undefined) {
    speedRatio = 1.0;
  }

  if (from > to && speedRatio > 0) {
    speedRatio *= -1;
  }

  var animatable = new Animatable(this, target, from, to, loop, speedRatio, onAnimationEnd, animations, onAnimationLoop, isAdditive);
  return animatable;
};

Scene.prototype.beginDirectHierarchyAnimation = function (target, directDescendantsOnly, animations, from, to, loop, speedRatio, onAnimationEnd, onAnimationLoop, isAdditive) {
  if (isAdditive === void 0) {
    isAdditive = false;
  }

  var children = target.getDescendants(directDescendantsOnly);
  var result = [];
  result.push(this.beginDirectAnimation(target, animations, from, to, loop, speedRatio, onAnimationEnd, onAnimationLoop, isAdditive));

  for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
    var child = children_2[_i];
    result.push(this.beginDirectAnimation(child, animations, from, to, loop, speedRatio, onAnimationEnd, onAnimationLoop, isAdditive));
  }

  return result;
};

Scene.prototype.getAnimatableByTarget = function (target) {
  for (var index = 0; index < this._activeAnimatables.length; index++) {
    if (this._activeAnimatables[index].target === target) {
      return this._activeAnimatables[index];
    }
  }

  return null;
};

Scene.prototype.getAllAnimatablesByTarget = function (target) {
  var result = [];

  for (var index = 0; index < this._activeAnimatables.length; index++) {
    if (this._activeAnimatables[index].target === target) {
      result.push(this._activeAnimatables[index]);
    }
  }

  return result;
};
/**
 * Will stop the animation of the given target
 * @param target - the target
 * @param animationName - the name of the animation to stop (all animations will be stopped if both this and targetMask are empty)
 * @param targetMask - a function that determines if the animation should be stopped based on its target (all animations will be stopped if both this and animationName are empty)
 */


Scene.prototype.stopAnimation = function (target, animationName, targetMask) {
  var animatables = this.getAllAnimatablesByTarget(target);

  for (var _i = 0, animatables_1 = animatables; _i < animatables_1.length; _i++) {
    var animatable = animatables_1[_i];
    animatable.stop(animationName, targetMask);
  }
};
/**
 * Stops and removes all animations that have been applied to the scene
 */


Scene.prototype.stopAllAnimations = function () {
  if (this._activeAnimatables) {
    for (var i = 0; i < this._activeAnimatables.length; i++) {
      this._activeAnimatables[i].stop();
    }

    this._activeAnimatables = [];
  }

  for (var _i = 0, _a = this.animationGroups; _i < _a.length; _i++) {
    var group = _a[_i];
    group.stop();
  }
};

Scene.prototype._registerTargetForLateAnimationBinding = function (runtimeAnimation, originalValue) {
  var target = runtimeAnimation.target;

  this._registeredForLateAnimationBindings.pushNoDuplicate(target);

  if (!target._lateAnimationHolders) {
    target._lateAnimationHolders = {};
  }

  if (!target._lateAnimationHolders[runtimeAnimation.targetPath]) {
    target._lateAnimationHolders[runtimeAnimation.targetPath] = {
      totalWeight: 0,
      totalAdditiveWeight: 0,
      animations: [],
      additiveAnimations: [],
      originalValue: originalValue
    };
  }

  if (runtimeAnimation.isAdditive) {
    target._lateAnimationHolders[runtimeAnimation.targetPath].additiveAnimations.push(runtimeAnimation);

    target._lateAnimationHolders[runtimeAnimation.targetPath].totalAdditiveWeight += runtimeAnimation.weight;
  } else {
    target._lateAnimationHolders[runtimeAnimation.targetPath].animations.push(runtimeAnimation);

    target._lateAnimationHolders[runtimeAnimation.targetPath].totalWeight += runtimeAnimation.weight;
  }
};

Scene.prototype._processLateAnimationBindingsForMatrices = function (holder) {
  if (holder.totalWeight === 0 && holder.totalAdditiveWeight === 0) {
    return holder.originalValue;
  }

  var normalizer = 1.0;
  var finalPosition = TmpVectors.Vector3[0];
  var finalScaling = TmpVectors.Vector3[1];
  var finalQuaternion = TmpVectors.Quaternion[0];
  var startIndex = 0;
  var originalAnimation = holder.animations[0];
  var originalValue = holder.originalValue;
  var scale = 1;
  var skipOverride = false;

  if (holder.totalWeight < 1.0) {
    // We need to mix the original value in
    scale = 1.0 - holder.totalWeight;
    originalValue.decompose(finalScaling, finalQuaternion, finalPosition);
  } else {
    startIndex = 1; // We need to normalize the weights

    normalizer = holder.totalWeight;
    scale = originalAnimation.weight / normalizer;

    if (scale == 1) {
      if (holder.totalAdditiveWeight) {
        skipOverride = true;
      } else {
        return originalAnimation.currentValue;
      }
    }

    originalAnimation.currentValue.decompose(finalScaling, finalQuaternion, finalPosition);
  } // Add up the override animations


  if (!skipOverride) {
    finalScaling.scaleInPlace(scale);
    finalPosition.scaleInPlace(scale);
    finalQuaternion.scaleInPlace(scale);

    for (var animIndex = startIndex; animIndex < holder.animations.length; animIndex++) {
      var runtimeAnimation = holder.animations[animIndex];

      if (runtimeAnimation.weight === 0) {
        continue;
      }

      var scale = runtimeAnimation.weight / normalizer;
      var currentPosition = TmpVectors.Vector3[2];
      var currentScaling = TmpVectors.Vector3[3];
      var currentQuaternion = TmpVectors.Quaternion[1];
      runtimeAnimation.currentValue.decompose(currentScaling, currentQuaternion, currentPosition);
      currentScaling.scaleAndAddToRef(scale, finalScaling);
      currentQuaternion.scaleAndAddToRef(scale, finalQuaternion);
      currentPosition.scaleAndAddToRef(scale, finalPosition);
    }
  } // Add up the additive animations


  for (var animIndex_1 = 0; animIndex_1 < holder.additiveAnimations.length; animIndex_1++) {
    var runtimeAnimation = holder.additiveAnimations[animIndex_1];

    if (runtimeAnimation.weight === 0) {
      continue;
    }

    var currentPosition = TmpVectors.Vector3[2];
    var currentScaling = TmpVectors.Vector3[3];
    var currentQuaternion = TmpVectors.Quaternion[1];
    runtimeAnimation.currentValue.decompose(currentScaling, currentQuaternion, currentPosition);
    currentScaling.multiplyToRef(finalScaling, currentScaling);
    Vector3.LerpToRef(finalScaling, currentScaling, runtimeAnimation.weight, finalScaling);
    finalQuaternion.multiplyToRef(currentQuaternion, currentQuaternion);
    Quaternion.SlerpToRef(finalQuaternion, currentQuaternion, runtimeAnimation.weight, finalQuaternion);
    currentPosition.scaleAndAddToRef(runtimeAnimation.weight, finalPosition);
  }

  var workValue = originalAnimation ? originalAnimation._animationState.workValue : TmpVectors.Matrix[0].clone();
  Matrix.ComposeToRef(finalScaling, finalQuaternion, finalPosition, workValue);
  return workValue;
};

Scene.prototype._processLateAnimationBindingsForQuaternions = function (holder, refQuaternion) {
  if (holder.totalWeight === 0 && holder.totalAdditiveWeight === 0) {
    return refQuaternion;
  }

  var originalAnimation = holder.animations[0];
  var originalValue = holder.originalValue;
  var cumulativeQuaternion = refQuaternion;

  if (holder.totalWeight === 0 && holder.totalAdditiveWeight > 0) {
    cumulativeQuaternion.copyFrom(originalValue);
  } else if (holder.animations.length === 1) {
    Quaternion.SlerpToRef(originalValue, originalAnimation.currentValue, Math.min(1.0, holder.totalWeight), cumulativeQuaternion);

    if (holder.totalAdditiveWeight === 0) {
      return cumulativeQuaternion;
    }
  } else if (holder.animations.length > 1) {
    // Add up the override animations
    var normalizer = 1.0;
    var quaternions = void 0;
    var weights = void 0;

    if (holder.totalWeight < 1.0) {
      var scale = 1.0 - holder.totalWeight;
      quaternions = [];
      weights = [];
      quaternions.push(originalValue);
      weights.push(scale);
    } else {
      if (holder.animations.length === 2) {
        // Slerp as soon as we can
        Quaternion.SlerpToRef(holder.animations[0].currentValue, holder.animations[1].currentValue, holder.animations[1].weight / holder.totalWeight, refQuaternion);

        if (holder.totalAdditiveWeight === 0) {
          return refQuaternion;
        }
      }

      quaternions = [];
      weights = [];
      normalizer = holder.totalWeight;
    }

    for (var animIndex = 0; animIndex < holder.animations.length; animIndex++) {
      var runtimeAnimation = holder.animations[animIndex];
      quaternions.push(runtimeAnimation.currentValue);
      weights.push(runtimeAnimation.weight / normalizer);
    } // https://gamedev.stackexchange.com/questions/62354/method-for-interpolation-between-3-quaternions


    var cumulativeAmount = 0;

    for (var index = 0; index < quaternions.length;) {
      if (!index) {
        Quaternion.SlerpToRef(quaternions[index], quaternions[index + 1], weights[index + 1] / (weights[index] + weights[index + 1]), refQuaternion);
        cumulativeQuaternion = refQuaternion;
        cumulativeAmount = weights[index] + weights[index + 1];
        index += 2;
        continue;
      }

      cumulativeAmount += weights[index];
      Quaternion.SlerpToRef(cumulativeQuaternion, quaternions[index], weights[index] / cumulativeAmount, cumulativeQuaternion);
      index++;
    }
  } // Add up the additive animations


  for (var animIndex_2 = 0; animIndex_2 < holder.additiveAnimations.length; animIndex_2++) {
    var runtimeAnimation = holder.additiveAnimations[animIndex_2];

    if (runtimeAnimation.weight === 0) {
      continue;
    }

    cumulativeQuaternion.multiplyToRef(runtimeAnimation.currentValue, TmpVectors.Quaternion[0]);
    Quaternion.SlerpToRef(cumulativeQuaternion, TmpVectors.Quaternion[0], runtimeAnimation.weight, cumulativeQuaternion);
  }

  return cumulativeQuaternion;
};

Scene.prototype._processLateAnimationBindings = function () {
  if (!this._registeredForLateAnimationBindings.length) {
    return;
  }

  for (var index = 0; index < this._registeredForLateAnimationBindings.length; index++) {
    var target = this._registeredForLateAnimationBindings.data[index];

    for (var path in target._lateAnimationHolders) {
      var holder = target._lateAnimationHolders[path];
      var originalAnimation = holder.animations[0];
      var originalValue = holder.originalValue;
      var matrixDecomposeMode = Animation.AllowMatrixDecomposeForInterpolation && originalValue.m; // ie. data is matrix

      var finalValue = target[path];

      if (matrixDecomposeMode) {
        finalValue = this._processLateAnimationBindingsForMatrices(holder);
      } else {
        var quaternionMode = originalValue.w !== undefined;

        if (quaternionMode) {
          finalValue = this._processLateAnimationBindingsForQuaternions(holder, finalValue || Quaternion.Identity());
        } else {
          var startIndex = 0;
          var normalizer = 1.0;

          if (holder.totalWeight < 1.0) {
            // We need to mix the original value in
            if (originalAnimation && originalValue.scale) {
              finalValue = originalValue.scale(1.0 - holder.totalWeight);
            } else if (originalAnimation) {
              finalValue = originalValue * (1.0 - holder.totalWeight);
            } else if (originalValue.clone) {
              finalValue = originalValue.clone();
            } else {
              finalValue = originalValue;
            }
          } else if (originalAnimation) {
            // We need to normalize the weights
            normalizer = holder.totalWeight;
            var scale_1 = originalAnimation.weight / normalizer;

            if (scale_1 !== 1) {
              if (originalAnimation.currentValue.scale) {
                finalValue = originalAnimation.currentValue.scale(scale_1);
              } else {
                finalValue = originalAnimation.currentValue * scale_1;
              }
            } else {
              finalValue = originalAnimation.currentValue;
            }

            startIndex = 1;
          } // Add up the override animations


          for (var animIndex = startIndex; animIndex < holder.animations.length; animIndex++) {
            var runtimeAnimation = holder.animations[animIndex];
            var scale = runtimeAnimation.weight / normalizer;

            if (!scale) {
              continue;
            } else if (runtimeAnimation.currentValue.scaleAndAddToRef) {
              runtimeAnimation.currentValue.scaleAndAddToRef(scale, finalValue);
            } else {
              finalValue += runtimeAnimation.currentValue * scale;
            }
          } // Add up the additive animations


          for (var animIndex_3 = 0; animIndex_3 < holder.additiveAnimations.length; animIndex_3++) {
            var runtimeAnimation = holder.additiveAnimations[animIndex_3];
            var scale = runtimeAnimation.weight;

            if (!scale) {
              continue;
            } else if (runtimeAnimation.currentValue.scaleAndAddToRef) {
              runtimeAnimation.currentValue.scaleAndAddToRef(scale, finalValue);
            } else {
              finalValue += runtimeAnimation.currentValue * scale;
            }
          }
        }
      }

      target[path] = finalValue;
    }

    target._lateAnimationHolders = {};
  }

  this._registeredForLateAnimationBindings.reset();
};

Bone.prototype.copyAnimationRange = function (source, rangeName, frameOffset, rescaleAsRequired, skelDimensionsRatio) {
  if (rescaleAsRequired === void 0) {
    rescaleAsRequired = false;
  }

  if (skelDimensionsRatio === void 0) {
    skelDimensionsRatio = null;
  } // all animation may be coming from a library skeleton, so may need to create animation


  if (this.animations.length === 0) {
    this.animations.push(new Animation(this.name, "_matrix", source.animations[0].framePerSecond, Animation.ANIMATIONTYPE_MATRIX, 0));
    this.animations[0].setKeys([]);
  } // get animation info / verify there is such a range from the source bone


  var sourceRange = source.animations[0].getRange(rangeName);

  if (!sourceRange) {
    return false;
  }

  var from = sourceRange.from;
  var to = sourceRange.to;
  var sourceKeys = source.animations[0].getKeys(); // rescaling prep

  var sourceBoneLength = source.length;
  var sourceParent = source.getParent();
  var parent = this.getParent();
  var parentScalingReqd = rescaleAsRequired && sourceParent && sourceBoneLength && this.length && sourceBoneLength !== this.length;
  var parentRatio = parentScalingReqd && parent && sourceParent ? parent.length / sourceParent.length : 1;
  var dimensionsScalingReqd = rescaleAsRequired && !parent && skelDimensionsRatio && (skelDimensionsRatio.x !== 1 || skelDimensionsRatio.y !== 1 || skelDimensionsRatio.z !== 1);
  var destKeys = this.animations[0].getKeys(); // loop vars declaration

  var orig;
  var origTranslation;
  var mat;

  for (var key = 0, nKeys = sourceKeys.length; key < nKeys; key++) {
    orig = sourceKeys[key];

    if (orig.frame >= from && orig.frame <= to) {
      if (rescaleAsRequired) {
        mat = orig.value.clone(); // scale based on parent ratio, when bone has parent

        if (parentScalingReqd) {
          origTranslation = mat.getTranslation();
          mat.setTranslation(origTranslation.scaleInPlace(parentRatio)); // scale based on skeleton dimension ratio when root bone, and value is passed
        } else if (dimensionsScalingReqd && skelDimensionsRatio) {
          origTranslation = mat.getTranslation();
          mat.setTranslation(origTranslation.multiplyInPlace(skelDimensionsRatio)); // use original when root bone, and no data for skelDimensionsRatio
        } else {
          mat = orig.value;
        }
      } else {
        mat = orig.value;
      }

      destKeys.push({
        frame: orig.frame + frameOffset,
        value: mat
      });
    }
  }

  this.animations[0].createRange(rangeName, from + frameOffset, to + frameOffset);
  return true;
};

/**
 * This class defines the direct association between an animation and a target
 */

var TargetedAnimation = function () {
  function TargetedAnimation() {}
  /**
   * Returns the string "TargetedAnimation"
   * @returns "TargetedAnimation"
   */


  TargetedAnimation.prototype.getClassName = function () {
    return "TargetedAnimation";
  };
  /**
   * Serialize the object
   * @returns the JSON object representing the current entity
   */


  TargetedAnimation.prototype.serialize = function () {
    var serializationObject = {};
    serializationObject.animation = this.animation.serialize();
    serializationObject.targetId = this.target.id;
    return serializationObject;
  };

  return TargetedAnimation;
}();
/**
 * Use this class to create coordinated animations on multiple targets
 */

var AnimationGroup = function () {
  /**
   * Instantiates a new Animation Group.
   * This helps managing several animations at once.
   * @see https://doc.babylonjs.com/how_to/group
   * @param name Defines the name of the group
   * @param scene Defines the scene the group belongs to
   */
  function AnimationGroup(
  /** The name of the animation group */
  name, scene) {
    if (scene === void 0) {
      scene = null;
    }

    this.name = name;
    this._targetedAnimations = new Array();
    this._animatables = new Array();
    this._from = Number.MAX_VALUE;
    this._to = -Number.MAX_VALUE;
    this._speedRatio = 1;
    this._loopAnimation = false;
    this._isAdditive = false;
    /**
     * This observable will notify when one animation have ended
     */

    this.onAnimationEndObservable = new Observable();
    /**
     * Observer raised when one animation loops
     */

    this.onAnimationLoopObservable = new Observable();
    /**
     * Observer raised when all animations have looped
     */

    this.onAnimationGroupLoopObservable = new Observable();
    /**
     * This observable will notify when all animations have ended.
     */

    this.onAnimationGroupEndObservable = new Observable();
    /**
     * This observable will notify when all animations have paused.
     */

    this.onAnimationGroupPauseObservable = new Observable();
    /**
     * This observable will notify when all animations are playing.
     */

    this.onAnimationGroupPlayObservable = new Observable();
    this._scene = scene || EngineStore.LastCreatedScene;
    this.uniqueId = this._scene.getUniqueId();

    this._scene.addAnimationGroup(this);
  }

  Object.defineProperty(AnimationGroup.prototype, "from", {
    /**
     * Gets the first frame
     */
    get: function () {
      return this._from;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "to", {
    /**
     * Gets the last frame
     */
    get: function () {
      return this._to;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "isStarted", {
    /**
     * Define if the animations are started
     */
    get: function () {
      return this._isStarted;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "isPlaying", {
    /**
     * Gets a value indicating that the current group is playing
     */
    get: function () {
      return this._isStarted && !this._isPaused;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "speedRatio", {
    /**
     * Gets or sets the speed ratio to use for all animations
     */
    get: function () {
      return this._speedRatio;
    },

    /**
     * Gets or sets the speed ratio to use for all animations
     */
    set: function (value) {
      if (this._speedRatio === value) {
        return;
      }

      this._speedRatio = value;

      for (var index = 0; index < this._animatables.length; index++) {
        var animatable = this._animatables[index];
        animatable.speedRatio = this._speedRatio;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "loopAnimation", {
    /**
     * Gets or sets if all animations should loop or not
     */
    get: function () {
      return this._loopAnimation;
    },
    set: function (value) {
      if (this._loopAnimation === value) {
        return;
      }

      this._loopAnimation = value;

      for (var index = 0; index < this._animatables.length; index++) {
        var animatable = this._animatables[index];
        animatable.loopAnimation = this._loopAnimation;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "isAdditive", {
    /**
     * Gets or sets if all animations should be evaluated additively
     */
    get: function () {
      return this._isAdditive;
    },
    set: function (value) {
      if (this._isAdditive === value) {
        return;
      }

      this._isAdditive = value;

      for (var index = 0; index < this._animatables.length; index++) {
        var animatable = this._animatables[index];
        animatable.isAdditive = this._isAdditive;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "targetedAnimations", {
    /**
     * Gets the targeted animations for this animation group
     */
    get: function () {
      return this._targetedAnimations;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "animatables", {
    /**
     * returning the list of animatables controlled by this animation group.
     */
    get: function () {
      return this._animatables;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AnimationGroup.prototype, "children", {
    /**
     * Gets the list of target animations
     */
    get: function () {
      return this._targetedAnimations;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Add an animation (with its target) in the group
   * @param animation defines the animation we want to add
   * @param target defines the target of the animation
   * @returns the TargetedAnimation object
   */

  AnimationGroup.prototype.addTargetedAnimation = function (animation, target) {
    var targetedAnimation = new TargetedAnimation();
    targetedAnimation.animation = animation;
    targetedAnimation.target = target;
    var keys = animation.getKeys();

    if (this._from > keys[0].frame) {
      this._from = keys[0].frame;
    }

    if (this._to < keys[keys.length - 1].frame) {
      this._to = keys[keys.length - 1].frame;
    }

    this._targetedAnimations.push(targetedAnimation);

    return targetedAnimation;
  };
  /**
   * This function will normalize every animation in the group to make sure they all go from beginFrame to endFrame
   * It can add constant keys at begin or end
   * @param beginFrame defines the new begin frame for all animations or the smallest begin frame of all animations if null (defaults to null)
   * @param endFrame defines the new end frame for all animations or the largest end frame of all animations if null (defaults to null)
   * @returns the animation group
   */


  AnimationGroup.prototype.normalize = function (beginFrame, endFrame) {
    if (beginFrame === void 0) {
      beginFrame = null;
    }

    if (endFrame === void 0) {
      endFrame = null;
    }

    if (beginFrame == null) {
      beginFrame = this._from;
    }

    if (endFrame == null) {
      endFrame = this._to;
    }

    for (var index = 0; index < this._targetedAnimations.length; index++) {
      var targetedAnimation = this._targetedAnimations[index];
      var keys = targetedAnimation.animation.getKeys();
      var startKey = keys[0];
      var endKey = keys[keys.length - 1];

      if (startKey.frame > beginFrame) {
        var newKey = {
          frame: beginFrame,
          value: startKey.value,
          inTangent: startKey.inTangent,
          outTangent: startKey.outTangent,
          interpolation: startKey.interpolation
        };
        keys.splice(0, 0, newKey);
      }

      if (endKey.frame < endFrame) {
        var newKey = {
          frame: endFrame,
          value: endKey.value,
          inTangent: endKey.inTangent,
          outTangent: endKey.outTangent,
          interpolation: endKey.interpolation
        };
        keys.push(newKey);
      }
    }

    this._from = beginFrame;
    this._to = endFrame;
    return this;
  };

  AnimationGroup.prototype._processLoop = function (animatable, targetedAnimation, index) {
    var _this = this;

    animatable.onAnimationLoop = function () {
      _this.onAnimationLoopObservable.notifyObservers(targetedAnimation);

      if (_this._animationLoopFlags[index]) {
        return;
      }

      _this._animationLoopFlags[index] = true;
      _this._animationLoopCount++;

      if (_this._animationLoopCount === _this._targetedAnimations.length) {
        _this.onAnimationGroupLoopObservable.notifyObservers(_this);

        _this._animationLoopCount = 0;
        _this._animationLoopFlags = [];
      }
    };
  };
  /**
   * Start all animations on given targets
   * @param loop defines if animations must loop
   * @param speedRatio defines the ratio to apply to animation speed (1 by default)
   * @param from defines the from key (optional)
   * @param to defines the to key (optional)
   * @param isAdditive defines the additive state for the resulting animatables (optional)
   * @returns the current animation group
   */


  AnimationGroup.prototype.start = function (loop, speedRatio, from, to, isAdditive) {
    var _this = this;

    if (loop === void 0) {
      loop = false;
    }

    if (speedRatio === void 0) {
      speedRatio = 1;
    }

    if (this._isStarted || this._targetedAnimations.length === 0) {
      return this;
    }

    this._loopAnimation = loop;
    this._animationLoopCount = 0;
    this._animationLoopFlags = [];

    var _loop_1 = function () {
      var targetedAnimation = this_1._targetedAnimations[index];

      var animatable = this_1._scene.beginDirectAnimation(targetedAnimation.target, [targetedAnimation.animation], from !== undefined ? from : this_1._from, to !== undefined ? to : this_1._to, loop, speedRatio, undefined, undefined, isAdditive !== undefined ? isAdditive : this_1._isAdditive);

      animatable.onAnimationEnd = function () {
        _this.onAnimationEndObservable.notifyObservers(targetedAnimation);

        _this._checkAnimationGroupEnded(animatable);
      };

      this_1._processLoop(animatable, targetedAnimation, index);

      this_1._animatables.push(animatable);
    };

    var this_1 = this;

    for (var index = 0; index < this._targetedAnimations.length; index++) {
      _loop_1();
    }

    this._speedRatio = speedRatio;

    if (from !== undefined && to !== undefined) {
      if (from < to && this._speedRatio < 0) {
        var temp = to;
        to = from;
        from = temp;
      } else if (from > to && this._speedRatio > 0) {
        this._speedRatio = -speedRatio;
      }
    }

    this._isStarted = true;
    this._isPaused = false;
    this.onAnimationGroupPlayObservable.notifyObservers(this);
    return this;
  };
  /**
   * Pause all animations
   * @returns the animation group
   */


  AnimationGroup.prototype.pause = function () {
    if (!this._isStarted) {
      return this;
    }

    this._isPaused = true;

    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.pause();
    }

    this.onAnimationGroupPauseObservable.notifyObservers(this);
    return this;
  };
  /**
   * Play all animations to initial state
   * This function will start() the animations if they were not started or will restart() them if they were paused
   * @param loop defines if animations must loop
   * @returns the animation group
   */


  AnimationGroup.prototype.play = function (loop) {
    // only if all animatables are ready and exist
    if (this.isStarted && this._animatables.length === this._targetedAnimations.length) {
      if (loop !== undefined) {
        this.loopAnimation = loop;
      }

      this.restart();
    } else {
      this.stop();
      this.start(loop, this._speedRatio);
    }

    this._isPaused = false;
    return this;
  };
  /**
   * Reset all animations to initial state
   * @returns the animation group
   */


  AnimationGroup.prototype.reset = function () {
    if (!this._isStarted) {
      this.play();
      this.goToFrame(0);
      this.stop();
      return this;
    }

    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.reset();
    }

    return this;
  };
  /**
   * Restart animations from key 0
   * @returns the animation group
   */


  AnimationGroup.prototype.restart = function () {
    if (!this._isStarted) {
      return this;
    }

    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.restart();
    }

    this.onAnimationGroupPlayObservable.notifyObservers(this);
    return this;
  };
  /**
   * Stop all animations
   * @returns the animation group
   */


  AnimationGroup.prototype.stop = function () {
    if (!this._isStarted) {
      return this;
    }

    var list = this._animatables.slice();

    for (var index = 0; index < list.length; index++) {
      list[index].stop();
    }

    this._isStarted = false;
    return this;
  };
  /**
   * Set animation weight for all animatables
   * @param weight defines the weight to use
   * @return the animationGroup
   * @see https://doc.babylonjs.com/babylon101/animations#animation-weights
   */


  AnimationGroup.prototype.setWeightForAllAnimatables = function (weight) {
    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.weight = weight;
    }

    return this;
  };
  /**
   * Synchronize and normalize all animatables with a source animatable
   * @param root defines the root animatable to synchronize with
   * @return the animationGroup
   * @see https://doc.babylonjs.com/babylon101/animations#animation-weights
   */


  AnimationGroup.prototype.syncAllAnimationsWith = function (root) {
    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.syncWith(root);
    }

    return this;
  };
  /**
   * Goes to a specific frame in this animation group
   * @param frame the frame number to go to
   * @return the animationGroup
   */


  AnimationGroup.prototype.goToFrame = function (frame) {
    if (!this._isStarted) {
      return this;
    }

    for (var index = 0; index < this._animatables.length; index++) {
      var animatable = this._animatables[index];
      animatable.goToFrame(frame);
    }

    return this;
  };
  /**
   * Dispose all associated resources
   */


  AnimationGroup.prototype.dispose = function () {
    this._targetedAnimations = [];
    this._animatables = [];

    var index = this._scene.animationGroups.indexOf(this);

    if (index > -1) {
      this._scene.animationGroups.splice(index, 1);
    }

    this.onAnimationEndObservable.clear();
    this.onAnimationGroupEndObservable.clear();
    this.onAnimationGroupPauseObservable.clear();
    this.onAnimationGroupPlayObservable.clear();
    this.onAnimationLoopObservable.clear();
    this.onAnimationGroupLoopObservable.clear();
  };

  AnimationGroup.prototype._checkAnimationGroupEnded = function (animatable) {
    // animatable should be taken out of the array
    var idx = this._animatables.indexOf(animatable);

    if (idx > -1) {
      this._animatables.splice(idx, 1);
    } // all animatables were removed? animation group ended!


    if (this._animatables.length === 0) {
      this._isStarted = false;
      this.onAnimationGroupEndObservable.notifyObservers(this);
    }
  };
  /**
   * Clone the current animation group and returns a copy
   * @param newName defines the name of the new group
   * @param targetConverter defines an optional function used to convert current animation targets to new ones
   * @returns the new aniamtion group
   */


  AnimationGroup.prototype.clone = function (newName, targetConverter) {
    var newGroup = new AnimationGroup(newName || this.name, this._scene);

    for (var _i = 0, _a = this._targetedAnimations; _i < _a.length; _i++) {
      var targetAnimation = _a[_i];
      newGroup.addTargetedAnimation(targetAnimation.animation.clone(), targetConverter ? targetConverter(targetAnimation.target) : targetAnimation.target);
    }

    return newGroup;
  };
  /**
   * Serializes the animationGroup to an object
   * @returns Serialized object
   */


  AnimationGroup.prototype.serialize = function () {
    var serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.from = this.from;
    serializationObject.to = this.to;
    serializationObject.targetedAnimations = [];

    for (var targetedAnimationIndex = 0; targetedAnimationIndex < this.targetedAnimations.length; targetedAnimationIndex++) {
      var targetedAnimation = this.targetedAnimations[targetedAnimationIndex];
      serializationObject.targetedAnimations[targetedAnimationIndex] = targetedAnimation.serialize();
    }

    return serializationObject;
  }; // Statics

  /**
   * Returns a new AnimationGroup object parsed from the source provided.
   * @param parsedAnimationGroup defines the source
   * @param scene defines the scene that will receive the animationGroup
   * @returns a new AnimationGroup
   */


  AnimationGroup.Parse = function (parsedAnimationGroup, scene) {
    var animationGroup = new AnimationGroup(parsedAnimationGroup.name, scene);

    for (var i = 0; i < parsedAnimationGroup.targetedAnimations.length; i++) {
      var targetedAnimation = parsedAnimationGroup.targetedAnimations[i];
      var animation = Animation.Parse(targetedAnimation.animation);
      var id = targetedAnimation.targetId;

      if (targetedAnimation.animation.property === "influence") {
        // morph target animation
        var morphTarget = scene.getMorphTargetById(id);

        if (morphTarget) {
          animationGroup.addTargetedAnimation(animation, morphTarget);
        }
      } else {
        var targetNode = scene.getNodeByID(id);

        if (targetNode != null) {
          animationGroup.addTargetedAnimation(animation, targetNode);
        }
      }
    }

    if (parsedAnimationGroup.from !== null && parsedAnimationGroup.to !== null) {
      animationGroup.normalize(parsedAnimationGroup.from, parsedAnimationGroup.to);
    }

    return animationGroup;
  };
  /**
   * Convert the keyframes for all animations belonging to the group to be relative to a given reference frame.
   * @param sourceAnimationGroup defines the AnimationGroup containing animations to convert
   * @param referenceFrame defines the frame that keyframes in the range will be relative to
   * @param range defines the name of the AnimationRange belonging to the animations in the group to convert
   * @param cloneOriginal defines whether or not to clone the group and convert the clone or convert the original group (default is false)
   * @param clonedName defines the name of the resulting cloned AnimationGroup if cloneOriginal is true
   * @returns a new AnimationGroup if cloneOriginal is true or the original AnimationGroup if cloneOriginal is false
   */


  AnimationGroup.MakeAnimationAdditive = function (sourceAnimationGroup, referenceFrame, range, cloneOriginal, clonedName) {
    if (referenceFrame === void 0) {
      referenceFrame = 0;
    }

    if (cloneOriginal === void 0) {
      cloneOriginal = false;
    }

    var animationGroup = sourceAnimationGroup;

    if (cloneOriginal) {
      animationGroup = sourceAnimationGroup.clone(clonedName || animationGroup.name);
    }

    var targetedAnimations = animationGroup.targetedAnimations;

    for (var index = 0; index < targetedAnimations.length; index++) {
      var targetedAnimation = targetedAnimations[index];
      Animation.MakeAnimationAdditive(targetedAnimation.animation, referenceFrame, range);
    }

    animationGroup.isAdditive = true;
    return animationGroup;
  };
  /**
   * Returns the string "AnimationGroup"
   * @returns "AnimationGroup"
   */


  AnimationGroup.prototype.getClassName = function () {
    return "AnimationGroup";
  };
  /**
   * Creates a detailled string about the object
   * @param fullDetails defines if the output string will support multiple levels of logging within scene loading
   * @returns a string representing the object
   */


  AnimationGroup.prototype.toString = function (fullDetails) {
    var ret = "Name: " + this.name;
    ret += ", type: " + this.getClassName();

    if (fullDetails) {
      ret += ", from: " + this._from;
      ret += ", to: " + this._to;
      ret += ", isStarted: " + this._isStarted;
      ret += ", speedRatio: " + this._speedRatio;
      ret += ", targetedAnimations length: " + this._targetedAnimations.length;
      ret += ", animatables length: " + this._animatables;
    }

    return ret;
  };

  return AnimationGroup;
}();

/**
 * Composed of a frame, and an action function
 */
var AnimationEvent = function () {
  /**
   * Initializes the animation event
   * @param frame The frame for which the event is triggered
   * @param action The event to perform when triggered
   * @param onlyOnce Specifies if the event should be triggered only once
   */
  function AnimationEvent(
  /** The frame for which the event is triggered **/
  frame,
  /** The event to perform when triggered **/
  action,
  /** Specifies if the event should be triggered only once**/
  onlyOnce) {
    this.frame = frame;
    this.action = action;
    this.onlyOnce = onlyOnce;
    /**
     * Specifies if the animation event is done
     */

    this.isDone = false;
  }
  /** @hidden */


  AnimationEvent.prototype._clone = function () {
    return new AnimationEvent(this.frame, this.action, this.onlyOnce);
  };

  return AnimationEvent;
}();

/**
 * Set of assets to keep when moving a scene into an asset container.
 */

var KeepAssets = function (_super) {
  __extends(KeepAssets, _super);

  function KeepAssets() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return KeepAssets;
}(AbstractScene);
/**
 * Class used to store the output of the AssetContainer.instantiateAllMeshesToScene function
 */

var InstantiatedEntries = function () {
  function InstantiatedEntries() {
    /**
     * List of new root nodes (eg. nodes with no parent)
     */
    this.rootNodes = [];
    /**
     * List of new skeletons
     */

    this.skeletons = [];
    /**
     * List of new animation groups
     */

    this.animationGroups = [];
  }

  return InstantiatedEntries;
}();
/**
 * Container with a set of assets that can be added or removed from a scene.
 */

var AssetContainer = function (_super) {
  __extends(AssetContainer, _super);
  /**
   * Instantiates an AssetContainer.
   * @param scene The scene the AssetContainer belongs to.
   */


  function AssetContainer(scene) {
    var _this = _super.call(this) || this;

    _this._wasAddedToScene = false;
    _this.scene = scene;
    _this["sounds"] = [];
    _this["effectLayers"] = [];
    _this["layers"] = [];
    _this["lensFlareSystems"] = [];
    _this["proceduralTextures"] = [];
    _this["reflectionProbes"] = [];
    scene.onDisposeObservable.add(function () {
      if (!_this._wasAddedToScene) {
        _this.dispose();
      }
    });
    return _this;
  }
  /**
   * Instantiate or clone all meshes and add the new ones to the scene.
   * Skeletons and animation groups will all be cloned
   * @param nameFunction defines an optional function used to get new names for clones
   * @param cloneMaterials defines an optional boolean that defines if materials must be cloned as well (false by default)
   * @returns a list of rootNodes, skeletons and aniamtion groups that were duplicated
   */


  AssetContainer.prototype.instantiateModelsToScene = function (nameFunction, cloneMaterials) {
    var _this = this;

    if (cloneMaterials === void 0) {
      cloneMaterials = false;
    }

    var convertionMap = {};
    var storeMap = {};
    var result = new InstantiatedEntries();
    var alreadySwappedSkeletons = [];
    var alreadySwappedMaterials = [];
    var options = {
      doNotInstantiate: true
    };

    var onClone = function (source, clone) {
      convertionMap[source.uniqueId] = clone.uniqueId;
      storeMap[clone.uniqueId] = clone;

      if (nameFunction) {
        clone.name = nameFunction(source.name);
      }

      if (clone instanceof Mesh) {
        var clonedMesh = clone;

        if (clonedMesh.morphTargetManager) {
          var oldMorphTargetManager = source.morphTargetManager;
          clonedMesh.morphTargetManager = oldMorphTargetManager.clone();

          for (var index = 0; index < oldMorphTargetManager.numTargets; index++) {
            var oldTarget = oldMorphTargetManager.getTarget(index);
            var newTarget = clonedMesh.morphTargetManager.getTarget(index);
            convertionMap[oldTarget.uniqueId] = newTarget.uniqueId;
            storeMap[newTarget.uniqueId] = newTarget;
          }
        }
      }
    };

    this.transformNodes.forEach(function (o) {
      if (!o.parent) {
        var newOne = o.instantiateHierarchy(null, options, function (source, clone) {
          onClone(source, clone);
        });

        if (newOne) {
          result.rootNodes.push(newOne);
        }
      }
    });
    this.meshes.forEach(function (o) {
      if (!o.parent) {
        var newOne = o.instantiateHierarchy(null, options, function (source, clone) {
          onClone(source, clone);

          if (clone.material) {
            var mesh = clone;

            if (mesh.material) {
              if (cloneMaterials) {
                var sourceMaterial = source.material;

                if (alreadySwappedMaterials.indexOf(sourceMaterial) === -1) {
                  var swap = sourceMaterial.clone(nameFunction ? nameFunction(sourceMaterial.name) : "Clone of " + sourceMaterial.name);
                  alreadySwappedMaterials.push(sourceMaterial);
                  convertionMap[sourceMaterial.uniqueId] = swap.uniqueId;
                  storeMap[swap.uniqueId] = swap;

                  if (sourceMaterial.getClassName() === "MultiMaterial") {
                    var multi = sourceMaterial;

                    for (var _i = 0, _a = multi.subMaterials; _i < _a.length; _i++) {
                      var material = _a[_i];

                      if (!material) {
                        continue;
                      }

                      swap = material.clone(nameFunction ? nameFunction(material.name) : "Clone of " + material.name);
                      alreadySwappedMaterials.push(material);
                      convertionMap[material.uniqueId] = swap.uniqueId;
                      storeMap[swap.uniqueId] = swap;
                    }

                    multi.subMaterials = multi.subMaterials.map(function (m) {
                      return m && storeMap[convertionMap[m.uniqueId]];
                    });
                  }
                }

                mesh.material = storeMap[convertionMap[sourceMaterial.uniqueId]];
              } else {
                if (mesh.material.getClassName() === "MultiMaterial") {
                  if (_this.scene.multiMaterials.indexOf(mesh.material) === -1) {
                    _this.scene.addMultiMaterial(mesh.material);
                  }
                } else {
                  if (_this.scene.materials.indexOf(mesh.material) === -1) {
                    _this.scene.addMaterial(mesh.material);
                  }
                }
              }
            }
          }
        });

        if (newOne) {
          result.rootNodes.push(newOne);
        }
      }
    });
    this.skeletons.forEach(function (s) {
      var clone = s.clone(nameFunction ? nameFunction(s.name) : "Clone of " + s.name);

      if (s.overrideMesh) {
        clone.overrideMesh = storeMap[convertionMap[s.overrideMesh.uniqueId]];
      }

      for (var _i = 0, _a = _this.meshes; _i < _a.length; _i++) {
        var m = _a[_i];

        if (m.skeleton === s && !m.isAnInstance) {
          var copy = storeMap[convertionMap[m.uniqueId]];
          copy.skeleton = clone;

          if (alreadySwappedSkeletons.indexOf(clone) !== -1) {
            continue;
          }

          alreadySwappedSkeletons.push(clone); // Check if bones are mesh linked

          for (var _b = 0, _c = clone.bones; _b < _c.length; _b++) {
            var bone = _c[_b];

            if (bone._linkedTransformNode) {
              bone._linkedTransformNode = storeMap[convertionMap[bone._linkedTransformNode.uniqueId]];
            }
          }
        }
      }

      result.skeletons.push(clone);
    });
    this.animationGroups.forEach(function (o) {
      var clone = o.clone(o.name, function (oldTarget) {
        var newTarget = storeMap[convertionMap[oldTarget.uniqueId]];
        return newTarget || oldTarget;
      });
      result.animationGroups.push(clone);
    });
    return result;
  };
  /**
   * Adds all the assets from the container to the scene.
   */


  AssetContainer.prototype.addAllToScene = function () {
    var _this = this;

    this._wasAddedToScene = true;
    this.cameras.forEach(function (o) {
      _this.scene.addCamera(o);
    });
    this.lights.forEach(function (o) {
      _this.scene.addLight(o);
    });
    this.meshes.forEach(function (o) {
      _this.scene.addMesh(o);
    });
    this.skeletons.forEach(function (o) {
      _this.scene.addSkeleton(o);
    });
    this.animations.forEach(function (o) {
      _this.scene.addAnimation(o);
    });
    this.animationGroups.forEach(function (o) {
      _this.scene.addAnimationGroup(o);
    });
    this.multiMaterials.forEach(function (o) {
      _this.scene.addMultiMaterial(o);
    });
    this.materials.forEach(function (o) {
      _this.scene.addMaterial(o);
    });
    this.morphTargetManagers.forEach(function (o) {
      _this.scene.addMorphTargetManager(o);
    });
    this.geometries.forEach(function (o) {
      _this.scene.addGeometry(o);
    });
    this.transformNodes.forEach(function (o) {
      _this.scene.addTransformNode(o);
    });
    this.actionManagers.forEach(function (o) {
      _this.scene.addActionManager(o);
    });
    this.textures.forEach(function (o) {
      _this.scene.addTexture(o);
    });
    this.reflectionProbes.forEach(function (o) {
      _this.scene.addReflectionProbe(o);
    });

    if (this.environmentTexture) {
      this.scene.environmentTexture = this.environmentTexture;
    }

    for (var _i = 0, _a = this.scene._serializableComponents; _i < _a.length; _i++) {
      var component = _a[_i];
      component.addFromContainer(this);
    }
  };
  /**
   * Removes all the assets in the container from the scene
   */


  AssetContainer.prototype.removeAllFromScene = function () {
    var _this = this;

    this._wasAddedToScene = false;
    this.cameras.forEach(function (o) {
      _this.scene.removeCamera(o);
    });
    this.lights.forEach(function (o) {
      _this.scene.removeLight(o);
    });
    this.meshes.forEach(function (o) {
      _this.scene.removeMesh(o);
    });
    this.skeletons.forEach(function (o) {
      _this.scene.removeSkeleton(o);
    });
    this.animations.forEach(function (o) {
      _this.scene.removeAnimation(o);
    });
    this.animationGroups.forEach(function (o) {
      _this.scene.removeAnimationGroup(o);
    });
    this.multiMaterials.forEach(function (o) {
      _this.scene.removeMultiMaterial(o);
    });
    this.materials.forEach(function (o) {
      _this.scene.removeMaterial(o);
    });
    this.morphTargetManagers.forEach(function (o) {
      _this.scene.removeMorphTargetManager(o);
    });
    this.geometries.forEach(function (o) {
      _this.scene.removeGeometry(o);
    });
    this.transformNodes.forEach(function (o) {
      _this.scene.removeTransformNode(o);
    });
    this.actionManagers.forEach(function (o) {
      _this.scene.removeActionManager(o);
    });
    this.textures.forEach(function (o) {
      _this.scene.removeTexture(o);
    });
    this.reflectionProbes.forEach(function (o) {
      _this.scene.removeReflectionProbe(o);
    });

    if (this.environmentTexture === this.scene.environmentTexture) {
      this.scene.environmentTexture = null;
    }

    for (var _i = 0, _a = this.scene._serializableComponents; _i < _a.length; _i++) {
      var component = _a[_i];
      component.removeFromContainer(this);
    }
  };
  /**
   * Disposes all the assets in the container
   */


  AssetContainer.prototype.dispose = function () {
    this.cameras.forEach(function (o) {
      o.dispose();
    });
    this.cameras = [];
    this.lights.forEach(function (o) {
      o.dispose();
    });
    this.lights = [];
    this.meshes.forEach(function (o) {
      o.dispose();
    });
    this.meshes = [];
    this.skeletons.forEach(function (o) {
      o.dispose();
    });
    this.skeletons = [];
    this.animationGroups.forEach(function (o) {
      o.dispose();
    });
    this.animationGroups = [];
    this.multiMaterials.forEach(function (o) {
      o.dispose();
    });
    this.multiMaterials = [];
    this.materials.forEach(function (o) {
      o.dispose();
    });
    this.materials = [];
    this.geometries.forEach(function (o) {
      o.dispose();
    });
    this.geometries = [];
    this.transformNodes.forEach(function (o) {
      o.dispose();
    });
    this.transformNodes = [];
    this.actionManagers.forEach(function (o) {
      o.dispose();
    });
    this.actionManagers = [];
    this.textures.forEach(function (o) {
      o.dispose();
    });
    this.textures = [];
    this.reflectionProbes.forEach(function (o) {
      o.dispose();
    });
    this.reflectionProbes = [];

    if (this.environmentTexture) {
      this.environmentTexture.dispose();
      this.environmentTexture = null;
    }

    for (var _i = 0, _a = this.scene._serializableComponents; _i < _a.length; _i++) {
      var component = _a[_i];
      component.removeFromContainer(this, true);
    }
  };

  AssetContainer.prototype._moveAssets = function (sourceAssets, targetAssets, keepAssets) {
    if (!sourceAssets) {
      return;
    }

    for (var _i = 0, sourceAssets_1 = sourceAssets; _i < sourceAssets_1.length; _i++) {
      var asset = sourceAssets_1[_i];
      var move = true;

      if (keepAssets) {
        for (var _a = 0, keepAssets_1 = keepAssets; _a < keepAssets_1.length; _a++) {
          var keepAsset = keepAssets_1[_a];

          if (asset === keepAsset) {
            move = false;
            break;
          }
        }
      }

      if (move) {
        targetAssets.push(asset);
      }
    }
  };
  /**
   * Removes all the assets contained in the scene and adds them to the container.
   * @param keepAssets Set of assets to keep in the scene. (default: empty)
   */


  AssetContainer.prototype.moveAllFromScene = function (keepAssets) {
    this._wasAddedToScene = false;

    if (keepAssets === undefined) {
      keepAssets = new KeepAssets();
    }

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        this[key] = this[key] || (key === "environmentTexture" ? null : []);

        this._moveAssets(this.scene[key], this[key], keepAssets[key]);
      }
    }

    this.environmentTexture = this.scene.environmentTexture;
    this.removeAllFromScene();
  };
  /**
   * Adds all meshes in the asset container to a root mesh that can be used to position all the contained meshes. The root mesh is then added to the front of the meshes in the assetContainer.
   * @returns the root mesh
   */


  AssetContainer.prototype.createRootMesh = function () {
    var rootMesh = new Mesh("assetContainerRootMesh", this.scene);
    this.meshes.forEach(function (m) {
      if (!m.parent) {
        rootMesh.addChild(m);
      }
    });
    this.meshes.unshift(rootMesh);
    return rootMesh;
  };
  /**
   * Merge animations (direct and animation groups) from this asset container into a scene
   * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
   * @param animatables set of animatables to retarget to a node from the scene
   * @param targetConverter defines a function used to convert animation targets from the asset container to the scene (default: search node by name)
   * @returns an array of the new AnimationGroup added to the scene (empty array if none)
   */


  AssetContainer.prototype.mergeAnimationsTo = function (scene, animatables, targetConverter) {
    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (targetConverter === void 0) {
      targetConverter = null;
    }

    if (!scene) {
      Logger.Error("No scene available to merge animations to");
      return [];
    }

    var _targetConverter = targetConverter ? targetConverter : function (target) {
      var node = null;
      var targetProperty = target.animations.length ? target.animations[0].targetProperty : "";
      /*
          BabylonJS adds special naming to targets that are children of nodes.
          This name attempts to remove that special naming to get the parent nodes name in case the target
          can't be found in the node tree
            Ex: Torso_primitive0 likely points to a Mesh primitive. We take away primitive0 and are left with "Torso" which is the name
          of the primitive's parent.
      */

      var name = target.name.split(".").join("").split("_primitive")[0];

      switch (targetProperty) {
        case "position":
        case "rotationQuaternion":
          node = scene.getTransformNodeByName(target.name) || scene.getTransformNodeByName(name);
          break;

        case "influence":
          node = scene.getMorphTargetByName(target.name) || scene.getMorphTargetByName(name);
          break;

        default:
          node = scene.getNodeByName(target.name) || scene.getNodeByName(name);
      }

      return node;
    }; // Copy new node animations


    var nodesInAC = this.getNodes();
    nodesInAC.forEach(function (nodeInAC) {
      var nodeInScene = _targetConverter(nodeInAC);

      if (nodeInScene !== null) {
        var _loop_1 = function (animationInAC) {
          // Doing treatment on an array for safety measure
          var animationsWithSameProperty = nodeInScene.animations.filter(function (animationInScene) {
            return animationInScene.targetProperty === animationInAC.targetProperty;
          });

          for (var _i = 0, animationsWithSameProperty_1 = animationsWithSameProperty; _i < animationsWithSameProperty_1.length; _i++) {
            var animationWithSameProperty = animationsWithSameProperty_1[_i];
            var index = nodeInScene.animations.indexOf(animationWithSameProperty, 0);

            if (index > -1) {
              nodeInScene.animations.splice(index, 1);
            }
          }
        }; // Remove old animations with same target property as a new one


        for (var _i = 0, _a = nodeInAC.animations; _i < _a.length; _i++) {
          var animationInAC = _a[_i];

          _loop_1(animationInAC);
        } // Append new animations


        nodeInScene.animations = nodeInScene.animations.concat(nodeInAC.animations);
      }
    });
    var newAnimationGroups = new Array(); // Copy new animation groups

    this.animationGroups.slice().forEach(function (animationGroupInAC) {
      // Clone the animation group and all its animatables
      newAnimationGroups.push(animationGroupInAC.clone(animationGroupInAC.name, _targetConverter)); // Remove animatables related to the asset container

      animationGroupInAC.animatables.forEach(function (animatable) {
        animatable.stop();
      });
    }); // Retarget animatables

    animatables.forEach(function (animatable) {
      var target = _targetConverter(animatable.target);

      if (target) {
        // Clone the animatable and retarget it
        scene.beginAnimation(target, animatable.fromFrame, animatable.toFrame, animatable.loopAnimation, animatable.speedRatio, animatable.onAnimationEnd ? animatable.onAnimationEnd : undefined, undefined, true, undefined, animatable.onAnimationLoop ? animatable.onAnimationLoop : undefined); // Stop animation for the target in the asset container

        scene.stopAnimation(animatable.target);
      }
    });
    return newAnimationGroups;
  };

  return AssetContainer;
}(AbstractScene);

/**
 * Defines a sound that can be played in the application.
 * The sound can either be an ambient track or a simple sound played in reaction to a user action.
 * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music
 */

var Sound = function () {
  /**
   * Create a sound and attach it to a scene
   * @param name Name of your sound
   * @param urlOrArrayBuffer Url to the sound to load async or ArrayBuffer, it also works with MediaStreams
   * @param scene defines the scene the sound belongs to
   * @param readyToPlayCallback Provide a callback function if you'd like to load your code once the sound is ready to be played
   * @param options Objects to provide with the current available options: autoplay, loop, volume, spatialSound, maxDistance, rolloffFactor, refDistance, distanceModel, panningModel, streaming
   */
  function Sound(name, urlOrArrayBuffer, scene, readyToPlayCallback, options) {
    var _this = this;

    if (readyToPlayCallback === void 0) {
      readyToPlayCallback = null;
    }

    var _a, _b, _c, _d;
    /**
     * Does the sound autoplay once loaded.
     */


    this.autoplay = false;
    /**
     * Does the sound loop after it finishes playing once.
     */

    this.loop = false;
    /**
     * Does the sound use a custom attenuation curve to simulate the falloff
     * happening when the source gets further away from the camera.
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-your-own-custom-attenuation-function
     */

    this.useCustomAttenuation = false;
    /**
     * Is this sound currently played.
     */

    this.isPlaying = false;
    /**
     * Is this sound currently paused.
     */

    this.isPaused = false;
    /**
     * Does this sound enables spatial sound.
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
     */

    this.spatialSound = false;
    /**
     * Define the reference distance the sound should be heard perfectly.
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
     */

    this.refDistance = 1;
    /**
     * Define the roll off factor of spatial sounds.
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
     */

    this.rolloffFactor = 1;
    /**
     * Define the max distance the sound should be heard (intensity just became 0 at this point).
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
     */

    this.maxDistance = 100;
    /**
     * Define the distance attenuation model the sound will follow.
     * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
     */

    this.distanceModel = "linear";
    /**
     * Gets or sets an object used to store user defined information for the sound.
     */

    this.metadata = null;
    /**
     * Observable event when the current playing sound finishes.
     */

    this.onEndedObservable = new Observable();
    this._panningModel = "equalpower";
    this._playbackRate = 1;
    this._streaming = false;
    this._startTime = 0;
    this._startOffset = 0;
    this._position = Vector3.Zero();
    /** @hidden */

    this._positionInEmitterSpace = false;
    this._localDirection = new Vector3(1, 0, 0);
    this._volume = 1;
    this._isReadyToPlay = false;
    this._isDirectional = false; // Used if you'd like to create a directional sound.
    // If not set, the sound will be omnidirectional

    this._coneInnerAngle = 360;
    this._coneOuterAngle = 360;
    this._coneOuterGain = 0;
    this._isOutputConnected = false;
    this._urlType = "Unknown";
    this.name = name;
    this._scene = scene;

    Sound._SceneComponentInitialization(scene);

    this._readyToPlayCallback = readyToPlayCallback; // Default custom attenuation function is a linear attenuation

    this._customAttenuationFunction = function (currentVolume, currentDistance, maxDistance, refDistance, rolloffFactor) {
      if (currentDistance < maxDistance) {
        return currentVolume * (1 - currentDistance / maxDistance);
      } else {
        return 0;
      }
    };

    if (options) {
      this.autoplay = options.autoplay || false;
      this.loop = options.loop || false; // if volume === 0, we need another way to check this option

      if (options.volume !== undefined) {
        this._volume = options.volume;
      }

      this.spatialSound = (_a = options.spatialSound) !== null && _a !== void 0 ? _a : false;
      this.maxDistance = (_b = options.maxDistance) !== null && _b !== void 0 ? _b : 100;
      this.useCustomAttenuation = (_c = options.useCustomAttenuation) !== null && _c !== void 0 ? _c : false;
      this.rolloffFactor = options.rolloffFactor || 1;
      this.refDistance = options.refDistance || 1;
      this.distanceModel = options.distanceModel || "linear";
      this._playbackRate = options.playbackRate || 1;
      this._streaming = (_d = options.streaming) !== null && _d !== void 0 ? _d : false;
      this._length = options.length;
      this._offset = options.offset;
    }

    if (Engine.audioEngine.canUseWebAudio && Engine.audioEngine.audioContext) {
      this._soundGain = Engine.audioEngine.audioContext.createGain();
      this._soundGain.gain.value = this._volume;
      this._inputAudioNode = this._soundGain;
      this._outputAudioNode = this._soundGain;

      if (this.spatialSound) {
        this._createSpatialParameters();
      }

      this._scene.mainSoundTrack.addSound(this);

      var validParameter = true; // if no parameter is passed, you need to call setAudioBuffer yourself to prepare the sound

      if (urlOrArrayBuffer) {
        try {
          if (typeof urlOrArrayBuffer === "string") {
            this._urlType = "String";
          } else if (urlOrArrayBuffer instanceof ArrayBuffer) {
            this._urlType = "ArrayBuffer";
          } else if (urlOrArrayBuffer instanceof MediaStream) {
            this._urlType = "MediaStream";
          } else if (Array.isArray(urlOrArrayBuffer)) {
            this._urlType = "Array";
          }

          var urls = [];
          var codecSupportedFound = false;

          switch (this._urlType) {
            case "MediaStream":
              this._streaming = true;
              this._isReadyToPlay = true;
              this._streamingSource = Engine.audioEngine.audioContext.createMediaStreamSource(urlOrArrayBuffer);

              if (this.autoplay) {
                this.play(0, this._offset, this._length);
              }

              if (this._readyToPlayCallback) {
                this._readyToPlayCallback();
              }

              break;

            case "ArrayBuffer":
              if (urlOrArrayBuffer.byteLength > 0) {
                codecSupportedFound = true;

                this._soundLoaded(urlOrArrayBuffer);
              }

              break;

            case "String":
              urls.push(urlOrArrayBuffer);

            case "Array":
              if (urls.length === 0) {
                urls = urlOrArrayBuffer;
              } // If we found a supported format, we load it immediately and stop the loop


              for (var i = 0; i < urls.length; i++) {
                var url = urls[i];
                codecSupportedFound = options && options.skipCodecCheck || url.indexOf(".mp3", url.length - 4) !== -1 && Engine.audioEngine.isMP3supported || url.indexOf(".ogg", url.length - 4) !== -1 && Engine.audioEngine.isOGGsupported || url.indexOf(".wav", url.length - 4) !== -1 || url.indexOf(".m4a", url.length - 4) !== -1 || url.indexOf("blob:") !== -1;

                if (codecSupportedFound) {
                  // Loading sound using XHR2
                  if (!this._streaming) {
                    this._scene._loadFile(url, function (data) {
                      _this._soundLoaded(data);
                    }, undefined, true, true, function (exception) {
                      if (exception) {
                        Logger.Error("XHR " + exception.status + " error on: " + url + ".");
                      }

                      Logger.Error("Sound creation aborted.");

                      _this._scene.mainSoundTrack.removeSound(_this);
                    });
                  } // Streaming sound using HTML5 Audio tag
                  else {
                    this._htmlAudioElement = new Audio(url);
                    this._htmlAudioElement.controls = false;
                    this._htmlAudioElement.loop = this.loop;
                    Tools.SetCorsBehavior(url, this._htmlAudioElement);
                    this._htmlAudioElement.preload = "auto";

                    this._htmlAudioElement.addEventListener("canplaythrough", function () {
                      _this._isReadyToPlay = true;

                      if (_this.autoplay) {
                        _this.play(0, _this._offset, _this._length);
                      }

                      if (_this._readyToPlayCallback) {
                        _this._readyToPlayCallback();
                      }
                    });

                    document.body.appendChild(this._htmlAudioElement);

                    this._htmlAudioElement.load();
                  }

                  break;
                }
              }

              break;

            default:
              validParameter = false;
              break;
          }

          if (!validParameter) {
            Logger.Error("Parameter must be a URL to the sound, an Array of URLs (.mp3 & .ogg) or an ArrayBuffer of the sound.");
          } else {
            if (!codecSupportedFound) {
              this._isReadyToPlay = true; // Simulating a ready to play event to avoid breaking code path

              if (this._readyToPlayCallback) {
                window.setTimeout(function () {
                  if (_this._readyToPlayCallback) {
                    _this._readyToPlayCallback();
                  }
                }, 1000);
              }
            }
          }
        } catch (ex) {
          Logger.Error("Unexpected error. Sound creation aborted.");

          this._scene.mainSoundTrack.removeSound(this);
        }
      }
    } else {
      // Adding an empty sound to avoid breaking audio calls for non Web Audio browsers
      this._scene.mainSoundTrack.addSound(this);

      if (!Engine.audioEngine.WarnedWebAudioUnsupported) {
        Logger.Error("Web Audio is not supported by your browser.");
        Engine.audioEngine.WarnedWebAudioUnsupported = true;
      } // Simulating a ready to play event to avoid breaking code for non web audio browsers


      if (this._readyToPlayCallback) {
        window.setTimeout(function () {
          if (_this._readyToPlayCallback) {
            _this._readyToPlayCallback();
          }
        }, 1000);
      }
    }
  }

  Object.defineProperty(Sound.prototype, "currentTime", {
    /**
     * Gets the current time for the sound.
     */
    get: function () {
      if (this._htmlAudioElement) {
        return this._htmlAudioElement.currentTime;
      }

      var currentTime = this._startOffset;

      if (this.isPlaying && Engine.audioEngine.audioContext) {
        currentTime += Engine.audioEngine.audioContext.currentTime - this._startTime;
      }

      return currentTime;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Release the sound and its associated resources
   */

  Sound.prototype.dispose = function () {
    if (Engine.audioEngine.canUseWebAudio) {
      if (this.isPlaying) {
        this.stop();
      }

      this._isReadyToPlay = false;

      if (this.soundTrackId === -1) {
        this._scene.mainSoundTrack.removeSound(this);
      } else if (this._scene.soundTracks) {
        this._scene.soundTracks[this.soundTrackId].removeSound(this);
      }

      if (this._soundGain) {
        this._soundGain.disconnect();

        this._soundGain = null;
      }

      if (this._soundPanner) {
        this._soundPanner.disconnect();

        this._soundPanner = null;
      }

      if (this._soundSource) {
        this._soundSource.disconnect();

        this._soundSource = null;
      }

      this._audioBuffer = null;

      if (this._htmlAudioElement) {
        this._htmlAudioElement.pause();

        this._htmlAudioElement.src = "";
        document.body.removeChild(this._htmlAudioElement);
      }

      if (this._streamingSource) {
        this._streamingSource.disconnect();
      }

      if (this._connectedTransformNode && this._registerFunc) {
        this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc);

        this._connectedTransformNode = null;
      }
    }
  };
  /**
   * Gets if the sounds is ready to be played or not.
   * @returns true if ready, otherwise false
   */


  Sound.prototype.isReady = function () {
    return this._isReadyToPlay;
  };

  Sound.prototype._soundLoaded = function (audioData) {
    var _this = this;

    if (!Engine.audioEngine.audioContext) {
      return;
    }

    Engine.audioEngine.audioContext.decodeAudioData(audioData, function (buffer) {
      _this._audioBuffer = buffer;
      _this._isReadyToPlay = true;

      if (_this.autoplay) {
        _this.play(0, _this._offset, _this._length);
      }

      if (_this._readyToPlayCallback) {
        _this._readyToPlayCallback();
      }
    }, function (err) {
      Logger.Error("Error while decoding audio data for: " + _this.name + " / Error: " + err);
    });
  };
  /**
   * Sets the data of the sound from an audiobuffer
   * @param audioBuffer The audioBuffer containing the data
   */


  Sound.prototype.setAudioBuffer = function (audioBuffer) {
    if (Engine.audioEngine.canUseWebAudio) {
      this._audioBuffer = audioBuffer;
      this._isReadyToPlay = true;
    }
  };
  /**
   * Updates the current sounds options such as maxdistance, loop...
   * @param options A JSON object containing values named as the object properties
   */


  Sound.prototype.updateOptions = function (options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    if (options) {
      this.loop = (_a = options.loop) !== null && _a !== void 0 ? _a : this.loop;
      this.maxDistance = (_b = options.maxDistance) !== null && _b !== void 0 ? _b : this.maxDistance;
      this.useCustomAttenuation = (_c = options.useCustomAttenuation) !== null && _c !== void 0 ? _c : this.useCustomAttenuation;
      this.rolloffFactor = (_d = options.rolloffFactor) !== null && _d !== void 0 ? _d : this.rolloffFactor;
      this.refDistance = (_e = options.refDistance) !== null && _e !== void 0 ? _e : this.refDistance;
      this.distanceModel = (_f = options.distanceModel) !== null && _f !== void 0 ? _f : this.distanceModel;
      this._playbackRate = (_g = options.playbackRate) !== null && _g !== void 0 ? _g : this._playbackRate;
      this._length = (_h = options.length) !== null && _h !== void 0 ? _h : undefined;
      this._offset = (_j = options.offset) !== null && _j !== void 0 ? _j : undefined;

      this._updateSpatialParameters();

      if (this.isPlaying) {
        if (this._streaming && this._htmlAudioElement) {
          this._htmlAudioElement.playbackRate = this._playbackRate;

          if (this._htmlAudioElement.loop !== this.loop) {
            this._htmlAudioElement.loop = this.loop;
          }
        } else {
          if (this._soundSource) {
            this._soundSource.playbackRate.value = this._playbackRate;

            if (this._soundSource.loop !== this.loop) {
              this._soundSource.loop = this.loop;
            }

            if (this._offset !== undefined && this._soundSource.loopStart !== this._offset) {
              this._soundSource.loopStart = this._offset;
            }

            if (this._length !== undefined && this._length !== this._soundSource.loopEnd) {
              this._soundSource.loopEnd = (this._offset | 0) + this._length;
            }
          }
        }
      }
    }
  };

  Sound.prototype._createSpatialParameters = function () {
    if (Engine.audioEngine.canUseWebAudio && Engine.audioEngine.audioContext) {
      if (this._scene.headphone) {
        this._panningModel = "HRTF";
      }

      this._soundPanner = Engine.audioEngine.audioContext.createPanner();

      if (this._soundPanner && this._outputAudioNode) {
        this._updateSpatialParameters();

        this._soundPanner.connect(this._outputAudioNode);

        this._inputAudioNode = this._soundPanner;
      }
    }
  };

  Sound.prototype._updateSpatialParameters = function () {
    if (this.spatialSound && this._soundPanner) {
      if (this.useCustomAttenuation) {
        // Tricks to disable in a way embedded Web Audio attenuation
        this._soundPanner.distanceModel = "linear";
        this._soundPanner.maxDistance = Number.MAX_VALUE;
        this._soundPanner.refDistance = 1;
        this._soundPanner.rolloffFactor = 1;
        this._soundPanner.panningModel = this._panningModel;
      } else {
        this._soundPanner.distanceModel = this.distanceModel;
        this._soundPanner.maxDistance = this.maxDistance;
        this._soundPanner.refDistance = this.refDistance;
        this._soundPanner.rolloffFactor = this.rolloffFactor;
        this._soundPanner.panningModel = this._panningModel;
      }
    }
  };
  /**
   * Switch the panning model to HRTF:
   * Renders a stereo output of higher quality than equalpower — it uses a convolution with measured impulse responses from human subjects.
   * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
   */


  Sound.prototype.switchPanningModelToHRTF = function () {
    this._panningModel = "HRTF";

    this._switchPanningModel();
  };
  /**
   * Switch the panning model to Equal Power:
   * Represents the equal-power panning algorithm, generally regarded as simple and efficient. equalpower is the default value.
   * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-a-spatial-3d-sound
   */


  Sound.prototype.switchPanningModelToEqualPower = function () {
    this._panningModel = "equalpower";

    this._switchPanningModel();
  };

  Sound.prototype._switchPanningModel = function () {
    if (Engine.audioEngine.canUseWebAudio && this.spatialSound && this._soundPanner) {
      this._soundPanner.panningModel = this._panningModel;
    }
  };
  /**
   * Connect this sound to a sound track audio node like gain...
   * @param soundTrackAudioNode the sound track audio node to connect to
   */


  Sound.prototype.connectToSoundTrackAudioNode = function (soundTrackAudioNode) {
    if (Engine.audioEngine.canUseWebAudio && this._outputAudioNode) {
      if (this._isOutputConnected) {
        this._outputAudioNode.disconnect();
      }

      this._outputAudioNode.connect(soundTrackAudioNode);

      this._isOutputConnected = true;
    }
  };
  /**
   * Transform this sound into a directional source
   * @param coneInnerAngle Size of the inner cone in degree
   * @param coneOuterAngle Size of the outer cone in degree
   * @param coneOuterGain Volume of the sound outside the outer cone (between 0.0 and 1.0)
   */


  Sound.prototype.setDirectionalCone = function (coneInnerAngle, coneOuterAngle, coneOuterGain) {
    if (coneOuterAngle < coneInnerAngle) {
      Logger.Error("setDirectionalCone(): outer angle of the cone must be superior or equal to the inner angle.");
      return;
    }

    this._coneInnerAngle = coneInnerAngle;
    this._coneOuterAngle = coneOuterAngle;
    this._coneOuterGain = coneOuterGain;
    this._isDirectional = true;

    if (this.isPlaying && this.loop) {
      this.stop();
      this.play(0, this._offset, this._length);
    }
  };

  Object.defineProperty(Sound.prototype, "directionalConeInnerAngle", {
    /**
     * Gets or sets the inner angle for the directional cone.
     */
    get: function () {
      return this._coneInnerAngle;
    },

    /**
     * Gets or sets the inner angle for the directional cone.
     */
    set: function (value) {
      if (value != this._coneInnerAngle) {
        if (this._coneOuterAngle < value) {
          Logger.Error("directionalConeInnerAngle: outer angle of the cone must be superior or equal to the inner angle.");
          return;
        }

        this._coneInnerAngle = value;

        if (Engine.audioEngine.canUseWebAudio && this.spatialSound && this._soundPanner) {
          this._soundPanner.coneInnerAngle = this._coneInnerAngle;
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Sound.prototype, "directionalConeOuterAngle", {
    /**
     * Gets or sets the outer angle for the directional cone.
     */
    get: function () {
      return this._coneOuterAngle;
    },

    /**
     * Gets or sets the outer angle for the directional cone.
     */
    set: function (value) {
      if (value != this._coneOuterAngle) {
        if (value < this._coneInnerAngle) {
          Logger.Error("directionalConeOuterAngle: outer angle of the cone must be superior or equal to the inner angle.");
          return;
        }

        this._coneOuterAngle = value;

        if (Engine.audioEngine.canUseWebAudio && this.spatialSound && this._soundPanner) {
          this._soundPanner.coneOuterAngle = this._coneOuterAngle;
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Sets the position of the emitter if spatial sound is enabled
   * @param newPosition Defines the new posisiton
   */

  Sound.prototype.setPosition = function (newPosition) {
    this._position = newPosition;

    if (Engine.audioEngine.canUseWebAudio && this.spatialSound && this._soundPanner && !isNaN(this._position.x) && !isNaN(this._position.y) && !isNaN(this._position.z)) {
      this._soundPanner.setPosition(this._position.x, this._position.y, this._position.z);
    }
  };
  /**
   * Sets the local direction of the emitter if spatial sound is enabled
   * @param newLocalDirection Defines the new local direction
   */


  Sound.prototype.setLocalDirectionToMesh = function (newLocalDirection) {
    this._localDirection = newLocalDirection;

    if (Engine.audioEngine.canUseWebAudio && this._connectedTransformNode && this.isPlaying) {
      this._updateDirection();
    }
  };

  Sound.prototype._updateDirection = function () {
    if (!this._connectedTransformNode || !this._soundPanner) {
      return;
    }

    var mat = this._connectedTransformNode.getWorldMatrix();

    var direction = Vector3.TransformNormal(this._localDirection, mat);
    direction.normalize();

    this._soundPanner.setOrientation(direction.x, direction.y, direction.z);
  };
  /** @hidden */


  Sound.prototype.updateDistanceFromListener = function () {
    if (Engine.audioEngine.canUseWebAudio && this._connectedTransformNode && this.useCustomAttenuation && this._soundGain && this._scene.activeCamera) {
      var distance = this._connectedTransformNode.getDistanceToCamera(this._scene.activeCamera);

      this._soundGain.gain.value = this._customAttenuationFunction(this._volume, distance, this.maxDistance, this.refDistance, this.rolloffFactor);
    }
  };
  /**
   * Sets a new custom attenuation function for the sound.
   * @param callback Defines the function used for the attenuation
   * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#creating-your-own-custom-attenuation-function
   */


  Sound.prototype.setAttenuationFunction = function (callback) {
    this._customAttenuationFunction = callback;
  };
  /**
   * Play the sound
   * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
   * @param offset (optional) Start the sound at a specific time in seconds
   * @param length (optional) Sound duration (in seconds)
   */


  Sound.prototype.play = function (time, offset, length) {
    var _this = this;

    if (this._isReadyToPlay && this._scene.audioEnabled && Engine.audioEngine.audioContext) {
      try {
        if (this._startOffset < 0) {
          time = -this._startOffset;
          this._startOffset = 0;
        }

        var startTime = time ? Engine.audioEngine.audioContext.currentTime + time : Engine.audioEngine.audioContext.currentTime;

        if (!this._soundSource || !this._streamingSource) {
          if (this.spatialSound && this._soundPanner) {
            if (!isNaN(this._position.x) && !isNaN(this._position.y) && !isNaN(this._position.z)) {
              this._soundPanner.setPosition(this._position.x, this._position.y, this._position.z);
            }

            if (this._isDirectional) {
              this._soundPanner.coneInnerAngle = this._coneInnerAngle;
              this._soundPanner.coneOuterAngle = this._coneOuterAngle;
              this._soundPanner.coneOuterGain = this._coneOuterGain;

              if (this._connectedTransformNode) {
                this._updateDirection();
              } else {
                this._soundPanner.setOrientation(this._localDirection.x, this._localDirection.y, this._localDirection.z);
              }
            }
          }
        }

        if (this._streaming) {
          if (!this._streamingSource) {
            this._streamingSource = Engine.audioEngine.audioContext.createMediaElementSource(this._htmlAudioElement);

            this._htmlAudioElement.onended = function () {
              _this._onended();
            };

            this._htmlAudioElement.playbackRate = this._playbackRate;
          }

          this._streamingSource.disconnect();

          if (this._inputAudioNode) {
            this._streamingSource.connect(this._inputAudioNode);
          }

          if (this._htmlAudioElement) {
            // required to manage properly the new suspended default state of Chrome
            // When the option 'streaming: true' is used, we need first to wait for
            // the audio engine to be unlocked by a user gesture before trying to play
            // an HTML Audio elememt
            var tryToPlay = function () {
              if (Engine.audioEngine.unlocked) {
                var playPromise = _this._htmlAudioElement.play(); // In browsers that don’t yet support this functionality,
                // playPromise won’t be defined.


                if (playPromise !== undefined) {
                  playPromise.catch(function (error) {
                    // Automatic playback failed.
                    // Waiting for the audio engine to be unlocked by user click on unmute
                    Engine.audioEngine.lock();

                    if (_this.loop || _this.autoplay) {
                      Engine.audioEngine.onAudioUnlockedObservable.addOnce(function () {
                        tryToPlay();
                      });
                    }
                  });
                }
              } else {
                if (_this.loop || _this.autoplay) {
                  Engine.audioEngine.onAudioUnlockedObservable.addOnce(function () {
                    tryToPlay();
                  });
                }
              }
            };

            tryToPlay();
          }
        } else {
          var tryToPlay = function () {
            if (Engine.audioEngine.audioContext) {
              length = length || _this._length;
              offset = offset || _this._offset;

              if (_this._soundSource) {
                var oldSource_1 = _this._soundSource;

                oldSource_1.onended = function () {
                  oldSource_1.disconnect();
                };
              }

              _this._soundSource = Engine.audioEngine.audioContext.createBufferSource();

              if (_this._soundSource && _this._inputAudioNode) {
                _this._soundSource.buffer = _this._audioBuffer;

                _this._soundSource.connect(_this._inputAudioNode);

                _this._soundSource.loop = _this.loop;

                if (offset !== undefined) {
                  _this._soundSource.loopStart = offset;
                }

                if (length !== undefined) {
                  _this._soundSource.loopEnd = (offset | 0) + length;
                }

                _this._soundSource.playbackRate.value = _this._playbackRate;

                _this._soundSource.onended = function () {
                  _this._onended();
                };

                startTime = time ? Engine.audioEngine.audioContext.currentTime + time : Engine.audioEngine.audioContext.currentTime;
                var actualOffset = _this.isPaused ? _this._startOffset % _this._soundSource.buffer.duration : offset ? offset : 0;

                _this._soundSource.start(startTime, actualOffset, _this.loop ? undefined : length);
              }
            }
          };

          if (Engine.audioEngine.audioContext.state === "suspended") {
            // Wait a bit for FF as context seems late to be ready.
            setTimeout(function () {
              if (Engine.audioEngine.audioContext.state === "suspended") {
                // Automatic playback failed.
                // Waiting for the audio engine to be unlocked by user click on unmute
                Engine.audioEngine.lock();

                if (_this.loop || _this.autoplay) {
                  Engine.audioEngine.onAudioUnlockedObservable.addOnce(function () {
                    tryToPlay();
                  });
                }
              } else {
                tryToPlay();
              }
            }, 500);
          } else {
            tryToPlay();
          }
        }

        this._startTime = startTime;
        this.isPlaying = true;
        this.isPaused = false;
      } catch (ex) {
        Logger.Error("Error while trying to play audio: " + this.name + ", " + ex.message);
      }
    }
  };

  Sound.prototype._onended = function () {
    this.isPlaying = false;
    this._startOffset = 0;

    if (this.onended) {
      this.onended();
    }

    this.onEndedObservable.notifyObservers(this);
  };
  /**
   * Stop the sound
   * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
   */


  Sound.prototype.stop = function (time) {
    var _this = this;

    if (this.isPlaying) {
      if (this._streaming) {
        if (this._htmlAudioElement) {
          this._htmlAudioElement.pause(); // Test needed for Firefox or it will generate an Invalid State Error


          if (this._htmlAudioElement.currentTime > 0) {
            this._htmlAudioElement.currentTime = 0;
          }
        } else {
          this._streamingSource.disconnect();
        }

        this.isPlaying = false;
      } else if (Engine.audioEngine.audioContext && this._soundSource) {
        var stopTime = time ? Engine.audioEngine.audioContext.currentTime + time : Engine.audioEngine.audioContext.currentTime;

        this._soundSource.stop(stopTime);

        this._soundSource.onended = function () {
          _this.isPlaying = false;
        };

        if (!this.isPaused) {
          this._startOffset = 0;
        }
      }
    }
  };
  /**
   * Put the sound in pause
   */


  Sound.prototype.pause = function () {
    if (this.isPlaying) {
      this.isPaused = true;

      if (this._streaming) {
        if (this._htmlAudioElement) {
          this._htmlAudioElement.pause();
        } else {
          this._streamingSource.disconnect();
        }
      } else if (Engine.audioEngine.audioContext) {
        this.stop(0);
        this._startOffset += Engine.audioEngine.audioContext.currentTime - this._startTime;
      }
    }
  };
  /**
   * Sets a dedicated volume for this sounds
   * @param newVolume Define the new volume of the sound
   * @param time Define time for gradual change to new volume
   */


  Sound.prototype.setVolume = function (newVolume, time) {
    if (Engine.audioEngine.canUseWebAudio && this._soundGain) {
      if (time && Engine.audioEngine.audioContext) {
        this._soundGain.gain.cancelScheduledValues(Engine.audioEngine.audioContext.currentTime);

        this._soundGain.gain.setValueAtTime(this._soundGain.gain.value, Engine.audioEngine.audioContext.currentTime);

        this._soundGain.gain.linearRampToValueAtTime(newVolume, Engine.audioEngine.audioContext.currentTime + time);
      } else {
        this._soundGain.gain.value = newVolume;
      }
    }

    this._volume = newVolume;
  };
  /**
   * Set the sound play back rate
   * @param newPlaybackRate Define the playback rate the sound should be played at
   */


  Sound.prototype.setPlaybackRate = function (newPlaybackRate) {
    this._playbackRate = newPlaybackRate;

    if (this.isPlaying) {
      if (this._streaming && this._htmlAudioElement) {
        this._htmlAudioElement.playbackRate = this._playbackRate;
      } else if (this._soundSource) {
        this._soundSource.playbackRate.value = this._playbackRate;
      }
    }
  };
  /**
   * Gets the volume of the sound.
   * @returns the volume of the sound
   */


  Sound.prototype.getVolume = function () {
    return this._volume;
  };
  /**
   * Attach the sound to a dedicated mesh
   * @param transformNode The transform node to connect the sound with
   * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#attaching-a-sound-to-a-mesh
   */


  Sound.prototype.attachToMesh = function (transformNode) {
    var _this = this;

    if (this._connectedTransformNode && this._registerFunc) {
      this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc);

      this._registerFunc = null;
    }

    this._connectedTransformNode = transformNode;

    if (!this.spatialSound) {
      this.spatialSound = true;

      this._createSpatialParameters();

      if (this.isPlaying && this.loop) {
        this.stop();
        this.play(0, this._offset, this._length);
      }
    }

    this._onRegisterAfterWorldMatrixUpdate(this._connectedTransformNode);

    this._registerFunc = function (transformNode) {
      return _this._onRegisterAfterWorldMatrixUpdate(transformNode);
    };

    this._connectedTransformNode.registerAfterWorldMatrixUpdate(this._registerFunc);
  };
  /**
   * Detach the sound from the previously attached mesh
   * @see https://doc.babylonjs.com/how_to/playing_sounds_and_music#attaching-a-sound-to-a-mesh
   */


  Sound.prototype.detachFromMesh = function () {
    if (this._connectedTransformNode && this._registerFunc) {
      this._connectedTransformNode.unregisterAfterWorldMatrixUpdate(this._registerFunc);

      this._registerFunc = null;
      this._connectedTransformNode = null;
    }
  };

  Sound.prototype._onRegisterAfterWorldMatrixUpdate = function (node) {
    if (this._positionInEmitterSpace) {
      node.worldMatrixFromCache.invertToRef(TmpVectors.Matrix[0]);
      this.setPosition(TmpVectors.Matrix[0].getTranslation());
    } else {
      if (!node.getBoundingInfo) {
        this.setPosition(node.absolutePosition);
      } else {
        var mesh = node;
        var boundingInfo = mesh.getBoundingInfo();
        this.setPosition(boundingInfo.boundingSphere.centerWorld);
      }
    }

    if (Engine.audioEngine.canUseWebAudio && this._isDirectional && this.isPlaying) {
      this._updateDirection();
    }
  };
  /**
   * Clone the current sound in the scene.
   * @returns the new sound clone
   */


  Sound.prototype.clone = function () {
    var _this = this;

    if (!this._streaming) {
      var setBufferAndRun = function () {
        if (_this._isReadyToPlay) {
          clonedSound._audioBuffer = _this.getAudioBuffer();
          clonedSound._isReadyToPlay = true;

          if (clonedSound.autoplay) {
            clonedSound.play(0, _this._offset, _this._length);
          }
        } else {
          window.setTimeout(setBufferAndRun, 300);
        }
      };

      var currentOptions = {
        autoplay: this.autoplay,
        loop: this.loop,
        volume: this._volume,
        spatialSound: this.spatialSound,
        maxDistance: this.maxDistance,
        useCustomAttenuation: this.useCustomAttenuation,
        rolloffFactor: this.rolloffFactor,
        refDistance: this.refDistance,
        distanceModel: this.distanceModel
      };
      var clonedSound = new Sound(this.name + "_cloned", new ArrayBuffer(0), this._scene, null, currentOptions);

      if (this.useCustomAttenuation) {
        clonedSound.setAttenuationFunction(this._customAttenuationFunction);
      }

      clonedSound.setPosition(this._position);
      clonedSound.setPlaybackRate(this._playbackRate);
      setBufferAndRun();
      return clonedSound;
    } // Can't clone a streaming sound
    else {
      return null;
    }
  };
  /**
   * Gets the current underlying audio buffer containing the data
   * @returns the audio buffer
   */


  Sound.prototype.getAudioBuffer = function () {
    return this._audioBuffer;
  };
  /**
   * Gets the WebAudio AudioBufferSourceNode, lets you keep track of and stop instances of this Sound.
   * @returns the source node
   */


  Sound.prototype.getSoundSource = function () {
    return this._soundSource;
  };
  /**
   * Gets the WebAudio GainNode, gives you precise control over the gain of instances of this Sound.
   * @returns the gain node
   */


  Sound.prototype.getSoundGain = function () {
    return this._soundGain;
  };
  /**
   * Serializes the Sound in a JSON representation
   * @returns the JSON representation of the sound
   */


  Sound.prototype.serialize = function () {
    var serializationObject = {
      name: this.name,
      url: this.name,
      autoplay: this.autoplay,
      loop: this.loop,
      volume: this._volume,
      spatialSound: this.spatialSound,
      maxDistance: this.maxDistance,
      rolloffFactor: this.rolloffFactor,
      refDistance: this.refDistance,
      distanceModel: this.distanceModel,
      playbackRate: this._playbackRate,
      panningModel: this._panningModel,
      soundTrackId: this.soundTrackId,
      metadata: this.metadata
    };

    if (this.spatialSound) {
      if (this._connectedTransformNode) {
        serializationObject.connectedMeshId = this._connectedTransformNode.id;
      }

      serializationObject.position = this._position.asArray();
      serializationObject.refDistance = this.refDistance;
      serializationObject.distanceModel = this.distanceModel;
      serializationObject.isDirectional = this._isDirectional;
      serializationObject.localDirectionToMesh = this._localDirection.asArray();
      serializationObject.coneInnerAngle = this._coneInnerAngle;
      serializationObject.coneOuterAngle = this._coneOuterAngle;
      serializationObject.coneOuterGain = this._coneOuterGain;
    }

    return serializationObject;
  };
  /**
   * Parse a JSON representation of a sound to innstantiate in a given scene
   * @param parsedSound Define the JSON representation of the sound (usually coming from the serialize method)
   * @param scene Define the scene the new parsed sound should be created in
   * @param rootUrl Define the rooturl of the load in case we need to fetch relative dependencies
   * @param sourceSound Define a cound place holder if do not need to instantiate a new one
   * @returns the newly parsed sound
   */


  Sound.Parse = function (parsedSound, scene, rootUrl, sourceSound) {
    var soundName = parsedSound.name;
    var soundUrl;

    if (parsedSound.url) {
      soundUrl = rootUrl + parsedSound.url;
    } else {
      soundUrl = rootUrl + soundName;
    }

    var options = {
      autoplay: parsedSound.autoplay,
      loop: parsedSound.loop,
      volume: parsedSound.volume,
      spatialSound: parsedSound.spatialSound,
      maxDistance: parsedSound.maxDistance,
      rolloffFactor: parsedSound.rolloffFactor,
      refDistance: parsedSound.refDistance,
      distanceModel: parsedSound.distanceModel,
      playbackRate: parsedSound.playbackRate
    };
    var newSound;

    if (!sourceSound) {
      newSound = new Sound(soundName, soundUrl, scene, function () {
        scene._removePendingData(newSound);
      }, options);

      scene._addPendingData(newSound);
    } else {
      var setBufferAndRun = function () {
        if (sourceSound._isReadyToPlay) {
          newSound._audioBuffer = sourceSound.getAudioBuffer();
          newSound._isReadyToPlay = true;

          if (newSound.autoplay) {
            newSound.play(0, newSound._offset, newSound._length);
          }
        } else {
          window.setTimeout(setBufferAndRun, 300);
        }
      };

      newSound = new Sound(soundName, new ArrayBuffer(0), scene, null, options);
      setBufferAndRun();
    }

    if (parsedSound.position) {
      var soundPosition = Vector3.FromArray(parsedSound.position);
      newSound.setPosition(soundPosition);
    }

    if (parsedSound.isDirectional) {
      newSound.setDirectionalCone(parsedSound.coneInnerAngle || 360, parsedSound.coneOuterAngle || 360, parsedSound.coneOuterGain || 0);

      if (parsedSound.localDirectionToMesh) {
        var localDirectionToMesh = Vector3.FromArray(parsedSound.localDirectionToMesh);
        newSound.setLocalDirectionToMesh(localDirectionToMesh);
      }
    }

    if (parsedSound.connectedMeshId) {
      var connectedMesh = scene.getMeshByID(parsedSound.connectedMeshId);

      if (connectedMesh) {
        newSound.attachToMesh(connectedMesh);
      }
    }

    if (parsedSound.metadata) {
      newSound.metadata = parsedSound.metadata;
    }

    return newSound;
  };
  /** @hidden */


  Sound._SceneComponentInitialization = function (_) {
    throw _DevTools.WarnImport("AudioSceneComponent");
  };

  return Sound;
}();

/**
 * Wraps one or more Sound objects and selects one with random weight for playback.
 */

var WeightedSound = function () {
  /**
   * Creates a new WeightedSound from the list of sounds given.
   * @param loop When true a Sound will be selected and played when the current playing Sound completes.
   * @param sounds Array of Sounds that will be selected from.
   * @param weights Array of number values for selection weights; length must equal sounds, values will be normalized to 1
   */
  function WeightedSound(loop, sounds, weights) {
    var _this = this;
    /** When true a Sound will be selected and played when the current playing Sound completes. */


    this.loop = false;
    this._coneInnerAngle = 360;
    this._coneOuterAngle = 360;
    this._volume = 1;
    /** A Sound is currently playing. */

    this.isPlaying = false;
    /** A Sound is currently paused. */

    this.isPaused = false;
    this._sounds = [];
    this._weights = [];

    if (sounds.length !== weights.length) {
      throw new Error('Sounds length does not equal weights length');
    }

    this.loop = loop;
    this._weights = weights; // Normalize the weights

    var weightSum = 0;

    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
      var weight = weights_1[_i];
      weightSum += weight;
    }

    var invWeightSum = weightSum > 0 ? 1 / weightSum : 0;

    for (var i = 0; i < this._weights.length; i++) {
      this._weights[i] *= invWeightSum;
    }

    this._sounds = sounds;

    for (var _a = 0, _b = this._sounds; _a < _b.length; _a++) {
      var sound = _b[_a];
      sound.onEndedObservable.add(function () {
        _this._onended();
      });
    }
  }

  Object.defineProperty(WeightedSound.prototype, "directionalConeInnerAngle", {
    /**
     * The size of cone in degrees for a directional sound in which there will be no attenuation.
     */
    get: function () {
      return this._coneInnerAngle;
    },

    /**
     * The size of cone in degress for a directional sound in which there will be no attenuation.
     */
    set: function (value) {
      if (value !== this._coneInnerAngle) {
        if (this._coneOuterAngle < value) {
          Logger.Error("directionalConeInnerAngle: outer angle of the cone must be superior or equal to the inner angle.");
          return;
        }

        this._coneInnerAngle = value;

        for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
          var sound = _a[_i];
          sound.directionalConeInnerAngle = value;
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WeightedSound.prototype, "directionalConeOuterAngle", {
    /**
     * Size of cone in degrees for a directional sound outside of which there will be no sound.
     * Listener angles between innerAngle and outerAngle will falloff linearly.
     */
    get: function () {
      return this._coneOuterAngle;
    },

    /**
     * Size of cone in degrees for a directional sound outside of which there will be no sound.
     * Listener angles between innerAngle and outerAngle will falloff linearly.
     */
    set: function (value) {
      if (value !== this._coneOuterAngle) {
        if (value < this._coneInnerAngle) {
          Logger.Error("directionalConeOuterAngle: outer angle of the cone must be superior or equal to the inner angle.");
          return;
        }

        this._coneOuterAngle = value;

        for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
          var sound = _a[_i];
          sound.directionalConeOuterAngle = value;
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WeightedSound.prototype, "volume", {
    /**
     * Playback volume.
     */
    get: function () {
      return this._volume;
    },

    /**
     * Playback volume.
     */
    set: function (value) {
      if (value !== this._volume) {
        for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
          var sound = _a[_i];
          sound.setVolume(value);
        }
      }
    },
    enumerable: false,
    configurable: true
  });

  WeightedSound.prototype._onended = function () {
    if (this._currentIndex !== undefined) {
      this._sounds[this._currentIndex].autoplay = false;
    }

    if (this.loop && this.isPlaying) {
      this.play();
    } else {
      this.isPlaying = false;
    }
  };
  /**
   * Suspend playback
   */


  WeightedSound.prototype.pause = function () {
    this.isPaused = true;

    if (this._currentIndex !== undefined) {
      this._sounds[this._currentIndex].pause();
    }
  };
  /**
   * Stop playback
   */


  WeightedSound.prototype.stop = function () {
    this.isPlaying = false;

    if (this._currentIndex !== undefined) {
      this._sounds[this._currentIndex].stop();
    }
  };
  /**
   * Start playback.
   * @param startOffset Position the clip head at a specific time in seconds.
   */


  WeightedSound.prototype.play = function (startOffset) {
    if (!this.isPaused) {
      this.stop();
      var randomValue = Math.random();
      var total = 0;

      for (var i = 0; i < this._weights.length; i++) {
        total += this._weights[i];

        if (randomValue <= total) {
          this._currentIndex = i;
          break;
        }
      }
    }

    var sound = this._sounds[this._currentIndex];

    if (sound.isReady()) {
      sound.play(0, this.isPaused ? undefined : startOffset);
    } else {
      sound.autoplay = true;
    }

    this.isPlaying = true;
    this.isPaused = false;
  };

  return WeightedSound;
}();

ThinEngine.prototype.updateRawTexture = function (texture, data, format, invertY, compression, type) {
  if (compression === void 0) {
    compression = null;
  }

  if (type === void 0) {
    type = 0;
  }

  if (!texture) {
    return;
  } // Babylon's internalSizedFomat but gl's texImage2D internalFormat


  var internalSizedFomat = this._getRGBABufferInternalSizedFormat(type, format); // Babylon's internalFormat but gl's texImage2D format


  var internalFormat = this._getInternalFormat(format);

  var textureType = this._getWebGLTextureType(type);

  this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);

  this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

  if (!this._doNotHandleContextLost) {
    texture._bufferView = data;
    texture.format = format;
    texture.type = type;
    texture.invertY = invertY;
    texture._compression = compression;
  }

  if (texture.width % 4 !== 0) {
    this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
  }

  if (compression && data) {
    this._gl.compressedTexImage2D(this._gl.TEXTURE_2D, 0, this.getCaps().s3tc[compression], texture.width, texture.height, 0, data);
  } else {
    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, data);
  }

  if (texture.generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_2D);
  }

  this._bindTextureDirectly(this._gl.TEXTURE_2D, null); //  this.resetTextureCache();


  texture.isReady = true;
};

ThinEngine.prototype.createRawTexture = function (data, width, height, format, generateMipMaps, invertY, samplingMode, compression, type) {
  if (compression === void 0) {
    compression = null;
  }

  if (type === void 0) {
    type = 0;
  }

  var texture = new InternalTexture(this, InternalTextureSource.Raw);
  texture.baseWidth = width;
  texture.baseHeight = height;
  texture.width = width;
  texture.height = height;
  texture.format = format;
  texture.generateMipMaps = generateMipMaps;
  texture.samplingMode = samplingMode;
  texture.invertY = invertY;
  texture._compression = compression;
  texture.type = type;

  if (!this._doNotHandleContextLost) {
    texture._bufferView = data;
  }

  this.updateRawTexture(texture, data, format, invertY, compression, type);

  this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true); // Filters


  var filters = this._getSamplingParameters(samplingMode, generateMipMaps);

  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, filters.mag);

  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, filters.min);

  if (generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_2D);
  }

  this._bindTextureDirectly(this._gl.TEXTURE_2D, null);

  this._internalTexturesCache.push(texture);

  return texture;
};

ThinEngine.prototype.createRawCubeTexture = function (data, size, format, type, generateMipMaps, invertY, samplingMode, compression) {
  if (compression === void 0) {
    compression = null;
  }

  var gl = this._gl;
  var texture = new InternalTexture(this, InternalTextureSource.CubeRaw);
  texture.isCube = true;
  texture.format = format;
  texture.type = type;

  if (!this._doNotHandleContextLost) {
    texture._bufferViewArray = data;
  }

  var textureType = this._getWebGLTextureType(type);

  var internalFormat = this._getInternalFormat(format);

  if (internalFormat === gl.RGB) {
    internalFormat = gl.RGBA;
  } // Mipmap generation needs a sized internal format that is both color-renderable and texture-filterable


  if (textureType === gl.FLOAT && !this._caps.textureFloatLinearFiltering) {
    generateMipMaps = false;
    samplingMode = 1;
    Logger.Warn("Float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
  } else if (textureType === this._gl.HALF_FLOAT_OES && !this._caps.textureHalfFloatLinearFiltering) {
    generateMipMaps = false;
    samplingMode = 1;
    Logger.Warn("Half float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
  } else if (textureType === gl.FLOAT && !this._caps.textureFloatRender) {
    generateMipMaps = false;
    Logger.Warn("Render to float textures is not supported. Mipmap generation forced to false.");
  } else if (textureType === gl.HALF_FLOAT && !this._caps.colorBufferFloat) {
    generateMipMaps = false;
    Logger.Warn("Render to half float textures is not supported. Mipmap generation forced to false.");
  }

  var width = size;
  var height = width;
  texture.width = width;
  texture.height = height; // Double check on POT to generate Mips.

  var isPot = !this.needPOTTextures || Tools.IsExponentOfTwo(texture.width) && Tools.IsExponentOfTwo(texture.height);

  if (!isPot) {
    generateMipMaps = false;
  } // Upload data if needed. The texture won't be ready until then.


  if (data) {
    this.updateRawCubeTexture(texture, data, format, type, invertY, compression);
  }

  this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, texture, true); // Filters


  if (data && generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
  }

  var filters = this._getSamplingParameters(samplingMode, generateMipMaps);

  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, filters.mag);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, filters.min);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);

  texture.generateMipMaps = generateMipMaps;
  return texture;
};

ThinEngine.prototype.updateRawCubeTexture = function (texture, data, format, type, invertY, compression, level) {
  if (compression === void 0) {
    compression = null;
  }

  if (level === void 0) {
    level = 0;
  }

  texture._bufferViewArray = data;
  texture.format = format;
  texture.type = type;
  texture.invertY = invertY;
  texture._compression = compression;
  var gl = this._gl;

  var textureType = this._getWebGLTextureType(type);

  var internalFormat = this._getInternalFormat(format);

  var internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);

  var needConversion = false;

  if (internalFormat === gl.RGB) {
    internalFormat = gl.RGBA;
    needConversion = true;
  }

  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);

  this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

  if (texture.width % 4 !== 0) {
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  } // Data are known to be in +X +Y +Z -X -Y -Z


  for (var faceIndex = 0; faceIndex < 6; faceIndex++) {
    var faceData = data[faceIndex];

    if (compression) {
      gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, this.getCaps().s3tc[compression], texture.width, texture.height, 0, faceData);
    } else {
      if (needConversion) {
        faceData = _convertRGBtoRGBATextureData(faceData, texture.width, texture.height, type);
      }

      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, faceData);
    }
  }

  var isPot = !this.needPOTTextures || Tools.IsExponentOfTwo(texture.width) && Tools.IsExponentOfTwo(texture.height);

  if (isPot && texture.generateMipMaps && level === 0) {
    this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
  }

  this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null); // this.resetTextureCache();


  texture.isReady = true;
};

ThinEngine.prototype.createRawCubeTextureFromUrl = function (url, scene, size, format, type, noMipmap, callback, mipmapGenerator, onLoad, onError, samplingMode, invertY) {
  var _this = this;

  if (onLoad === void 0) {
    onLoad = null;
  }

  if (onError === void 0) {
    onError = null;
  }

  if (samplingMode === void 0) {
    samplingMode = 3;
  }

  if (invertY === void 0) {
    invertY = false;
  }

  var gl = this._gl;
  var texture = this.createRawCubeTexture(null, size, format, type, !noMipmap, invertY, samplingMode, null);
  scene === null || scene === void 0 ? void 0 : scene._addPendingData(texture);
  texture.url = url;

  this._internalTexturesCache.push(texture);

  var onerror = function (request, exception) {
    scene === null || scene === void 0 ? void 0 : scene._removePendingData(texture);

    if (onError && request) {
      onError(request.status + " " + request.statusText, exception);
    }
  };

  var internalCallback = function (data) {
    var width = texture.width;
    var faceDataArrays = callback(data);

    if (!faceDataArrays) {
      return;
    }

    if (mipmapGenerator) {
      var textureType = _this._getWebGLTextureType(type);

      var internalFormat = _this._getInternalFormat(format);

      var internalSizedFomat = _this._getRGBABufferInternalSizedFormat(type);

      var needConversion = false;

      if (internalFormat === gl.RGB) {
        internalFormat = gl.RGBA;
        needConversion = true;
      }

      _this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);

      _this._unpackFlipY(false);

      var mipData = mipmapGenerator(faceDataArrays);

      for (var level = 0; level < mipData.length; level++) {
        var mipSize = width >> level;

        for (var faceIndex = 0; faceIndex < 6; faceIndex++) {
          var mipFaceData = mipData[level][faceIndex];

          if (needConversion) {
            mipFaceData = _convertRGBtoRGBATextureData(mipFaceData, mipSize, mipSize, type);
          }

          gl.texImage2D(faceIndex, level, internalSizedFomat, mipSize, mipSize, 0, internalFormat, textureType, mipFaceData);
        }
      }

      _this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
    } else {
      _this.updateRawCubeTexture(texture, faceDataArrays, format, type, invertY);
    }

    texture.isReady = true; // this.resetTextureCache();

    scene === null || scene === void 0 ? void 0 : scene._removePendingData(texture);

    if (onLoad) {
      onLoad();
    }
  };

  this._loadFile(url, function (data) {
    internalCallback(data);
  }, undefined, scene === null || scene === void 0 ? void 0 : scene.offlineProvider, true, onerror);

  return texture;
};
/** @hidden */


function _convertRGBtoRGBATextureData(rgbData, width, height, textureType) {
  // Create new RGBA data container.
  var rgbaData;

  if (textureType === 1) {
    rgbaData = new Float32Array(width * height * 4);
  } else {
    rgbaData = new Uint32Array(width * height * 4);
  } // Convert each pixel.


  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var index = (y * width + x) * 3;
      var newIndex = (y * width + x) * 4; // Map Old Value to new value.

      rgbaData[newIndex + 0] = rgbData[index + 0];
      rgbaData[newIndex + 1] = rgbData[index + 1];
      rgbaData[newIndex + 2] = rgbData[index + 2]; // Add fully opaque alpha channel.

      rgbaData[newIndex + 3] = 1;
    }
  }

  return rgbaData;
}
/**
 * Create a function for createRawTexture3D/createRawTexture2DArray
 * @param is3D true for TEXTURE_3D and false for TEXTURE_2D_ARRAY
 * @hidden
 */


function _makeCreateRawTextureFunction(is3D) {
  return function (data, width, height, depth, format, generateMipMaps, invertY, samplingMode, compression, textureType) {
    if (compression === void 0) {
      compression = null;
    }

    if (textureType === void 0) {
      textureType = 0;
    }

    var target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;
    var source = is3D ? InternalTextureSource.Raw3D : InternalTextureSource.Raw2DArray;
    var texture = new InternalTexture(this, source);
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.baseDepth = depth;
    texture.width = width;
    texture.height = height;
    texture.depth = depth;
    texture.format = format;
    texture.type = textureType;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;

    if (is3D) {
      texture.is3D = true;
    } else {
      texture.is2DArray = true;
    }

    if (!this._doNotHandleContextLost) {
      texture._bufferView = data;
    }

    if (is3D) {
      this.updateRawTexture3D(texture, data, format, invertY, compression, textureType);
    } else {
      this.updateRawTexture2DArray(texture, data, format, invertY, compression, textureType);
    }

    this._bindTextureDirectly(target, texture, true); // Filters


    var filters = this._getSamplingParameters(samplingMode, generateMipMaps);

    this._gl.texParameteri(target, this._gl.TEXTURE_MAG_FILTER, filters.mag);

    this._gl.texParameteri(target, this._gl.TEXTURE_MIN_FILTER, filters.min);

    if (generateMipMaps) {
      this._gl.generateMipmap(target);
    }

    this._bindTextureDirectly(target, null);

    this._internalTexturesCache.push(texture);

    return texture;
  };
}

ThinEngine.prototype.createRawTexture2DArray = _makeCreateRawTextureFunction(false);
ThinEngine.prototype.createRawTexture3D = _makeCreateRawTextureFunction(true);
/**
 * Create a function for updateRawTexture3D/updateRawTexture2DArray
 * @param is3D true for TEXTURE_3D and false for TEXTURE_2D_ARRAY
 * @hidden
 */

function _makeUpdateRawTextureFunction(is3D) {
  return function (texture, data, format, invertY, compression, textureType) {
    if (compression === void 0) {
      compression = null;
    }

    if (textureType === void 0) {
      textureType = 0;
    }

    var target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;

    var internalType = this._getWebGLTextureType(textureType);

    var internalFormat = this._getInternalFormat(format);

    var internalSizedFomat = this._getRGBABufferInternalSizedFormat(textureType, format);

    this._bindTextureDirectly(target, texture, true);

    this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

    if (!this._doNotHandleContextLost) {
      texture._bufferView = data;
      texture.format = format;
      texture.invertY = invertY;
      texture._compression = compression;
    }

    if (texture.width % 4 !== 0) {
      this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
    }

    if (compression && data) {
      this._gl.compressedTexImage3D(target, 0, this.getCaps().s3tc[compression], texture.width, texture.height, texture.depth, 0, data);
    } else {
      this._gl.texImage3D(target, 0, internalSizedFomat, texture.width, texture.height, texture.depth, 0, internalFormat, internalType, data);
    }

    if (texture.generateMipMaps) {
      this._gl.generateMipmap(target);
    }

    this._bindTextureDirectly(target, null); // this.resetTextureCache();


    texture.isReady = true;
  };
}

ThinEngine.prototype.updateRawTexture2DArray = _makeUpdateRawTextureFunction(false);
ThinEngine.prototype.updateRawTexture3D = _makeUpdateRawTextureFunction(true);

/**
 * Raw texture can help creating a texture directly from an array of data.
 * This can be super useful if you either get the data from an uncompressed source or
 * if you wish to create your texture pixel by pixel.
 */

var RawTexture = function (_super) {
  __extends(RawTexture, _super);
  /**
   * Instantiates a new RawTexture.
   * Raw texture can help creating a texture directly from an array of data.
   * This can be super useful if you either get the data from an uncompressed source or
   * if you wish to create your texture pixel by pixel.
   * @param data define the array of data to use to create the texture
   * @param width define the width of the texture
   * @param height define the height of the texture
   * @param format define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps define whether mip maps should be generated or not
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   */


  function RawTexture(data, width, height,
  /**
   * Define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
   */
  format, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    if (type === void 0) {
      type = 0;
    }

    var _this = _super.call(this, null, sceneOrEngine, !generateMipMaps, invertY) || this;

    _this.format = format;

    if (!_this._engine) {
      return _this;
    }

    _this._texture = _this._engine.createRawTexture(data, width, height, format, generateMipMaps, invertY, samplingMode, null, type);
    _this.wrapU = Texture.CLAMP_ADDRESSMODE;
    _this.wrapV = Texture.CLAMP_ADDRESSMODE;
    return _this;
  }
  /**
   * Updates the texture underlying data.
   * @param data Define the new data of the texture
   */


  RawTexture.prototype.update = function (data) {
    this._getEngine().updateRawTexture(this._texture, data, this._texture.format, this._texture.invertY, null, this._texture.type);
  };
  /**
   * Creates a luminance texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the luminance texture
   */


  RawTexture.CreateLuminanceTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    return new RawTexture(data, width, height, 1, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  };
  /**
   * Creates a luminance alpha texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the luminance alpha texture
   */


  RawTexture.CreateLuminanceAlphaTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    return new RawTexture(data, width, height, 2, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  };
  /**
   * Creates an alpha texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the alpha texture
   */


  RawTexture.CreateAlphaTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    return new RawTexture(data, width, height, 0, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  };
  /**
   * Creates a RGB texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @returns the RGB alpha texture
   */


  RawTexture.CreateRGBTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    if (type === void 0) {
      type = 0;
    }

    return new RawTexture(data, width, height, 4, sceneOrEngine, generateMipMaps, invertY, samplingMode, type);
  };
  /**
   * Creates a RGBA texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @returns the RGBA texture
   */


  RawTexture.CreateRGBATexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    if (type === void 0) {
      type = 0;
    }

    return new RawTexture(data, width, height, 5, sceneOrEngine, generateMipMaps, invertY, samplingMode, type);
  };
  /**
   * Creates a R texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @returns the R texture
   */


  RawTexture.CreateRTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
    if (generateMipMaps === void 0) {
      generateMipMaps = true;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = Texture.TRILINEAR_SAMPLINGMODE;
    }

    if (type === void 0) {
      type = 1;
    }

    return new RawTexture(data, width, height, 6, sceneOrEngine, generateMipMaps, invertY, samplingMode, type);
  };

  return RawTexture;
}(Texture);

/**
 * Class used to handle skinning animations
 * @see https://doc.babylonjs.com/how_to/how_to_use_bones_and_skeletons
 */

var Skeleton = function () {
  /**
   * Creates a new skeleton
   * @param name defines the skeleton name
   * @param id defines the skeleton Id
   * @param scene defines the hosting scene
   */
  function Skeleton(
  /** defines the skeleton name */
  name,
  /** defines the skeleton Id */
  id, scene) {
    this.name = name;
    this.id = id;
    /**
     * Defines the list of child bones
     */

    this.bones = new Array();
    /**
     * Defines a boolean indicating if the root matrix is provided by meshes or by the current skeleton (this is the default value)
     */

    this.needInitialSkinMatrix = false;
    /**
     * Defines a mesh that override the matrix used to get the world matrix (null by default).
     */

    this.overrideMesh = null;
    this._isDirty = true;
    this._meshesWithPoseMatrix = new Array();
    this._identity = Matrix.Identity();
    this._ranges = {};
    this._lastAbsoluteTransformsUpdateId = -1;
    this._canUseTextureForBones = false;
    this._uniqueId = 0;
    /** @hidden */

    this._numBonesWithLinkedTransformNode = 0;
    /** @hidden */

    this._hasWaitingData = null;
    /** @hidden */

    this._waitingOverrideMeshId = null;
    /**
     * Specifies if the skeleton should be serialized
     */

    this.doNotSerialize = false;
    this._useTextureToStoreBoneMatrices = true;
    this._animationPropertiesOverride = null; // Events

    /**
     * An observable triggered before computing the skeleton's matrices
     */

    this.onBeforeComputeObservable = new Observable();
    this.bones = [];
    this._scene = scene || EngineStore.LastCreatedScene;
    this._uniqueId = this._scene.getUniqueId();

    this._scene.addSkeleton(this); //make sure it will recalculate the matrix next time prepare is called.


    this._isDirty = true;

    var engineCaps = this._scene.getEngine().getCaps();

    this._canUseTextureForBones = engineCaps.textureFloat && engineCaps.maxVertexTextureImageUnits > 0;
  }

  Object.defineProperty(Skeleton.prototype, "useTextureToStoreBoneMatrices", {
    /**
     * Gets or sets a boolean indicating that bone matrices should be stored as a texture instead of using shader uniforms (default is true).
     * Please note that this option is not available if the hardware does not support it
     */
    get: function () {
      return this._useTextureToStoreBoneMatrices;
    },
    set: function (value) {
      this._useTextureToStoreBoneMatrices = value;

      this._markAsDirty();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Skeleton.prototype, "animationPropertiesOverride", {
    /**
     * Gets or sets the animation properties override
     */
    get: function () {
      if (!this._animationPropertiesOverride) {
        return this._scene.animationPropertiesOverride;
      }

      return this._animationPropertiesOverride;
    },
    set: function (value) {
      this._animationPropertiesOverride = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Skeleton.prototype, "isUsingTextureForMatrices", {
    /**
     * Gets a boolean indicating that the skeleton effectively stores matrices into a texture
     */
    get: function () {
      return this.useTextureToStoreBoneMatrices && this._canUseTextureForBones;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Skeleton.prototype, "uniqueId", {
    /**
     * Gets the unique ID of this skeleton
     */
    get: function () {
      return this._uniqueId;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the current object class name.
   * @return the class name
   */

  Skeleton.prototype.getClassName = function () {
    return "Skeleton";
  };
  /**
   * Returns an array containing the root bones
   * @returns an array containing the root bones
   */


  Skeleton.prototype.getChildren = function () {
    return this.bones.filter(function (b) {
      return !b.getParent();
    });
  }; // Members

  /**
   * Gets the list of transform matrices to send to shaders (one matrix per bone)
   * @param mesh defines the mesh to use to get the root matrix (if needInitialSkinMatrix === true)
   * @returns a Float32Array containing matrices data
   */


  Skeleton.prototype.getTransformMatrices = function (mesh) {
    if (this.needInitialSkinMatrix && mesh._bonesTransformMatrices) {
      return mesh._bonesTransformMatrices;
    }

    if (!this._transformMatrices) {
      this.prepare();
    }

    return this._transformMatrices;
  };
  /**
   * Gets the list of transform matrices to send to shaders inside a texture (one matrix per bone)
   * @param mesh defines the mesh to use to get the root matrix (if needInitialSkinMatrix === true)
   * @returns a raw texture containing the data
   */


  Skeleton.prototype.getTransformMatrixTexture = function (mesh) {
    if (this.needInitialSkinMatrix && mesh._transformMatrixTexture) {
      return mesh._transformMatrixTexture;
    }

    return this._transformMatrixTexture;
  };
  /**
   * Gets the current hosting scene
   * @returns a scene object
   */


  Skeleton.prototype.getScene = function () {
    return this._scene;
  }; // Methods

  /**
   * Gets a string representing the current skeleton data
   * @param fullDetails defines a boolean indicating if we want a verbose version
   * @returns a string representing the current skeleton data
   */


  Skeleton.prototype.toString = function (fullDetails) {
    var ret = "Name: " + this.name + ", nBones: " + this.bones.length;
    ret += ", nAnimationRanges: " + (this._ranges ? Object.keys(this._ranges).length : "none");

    if (fullDetails) {
      ret += ", Ranges: {";
      var first = true;

      for (var name_1 in this._ranges) {
        if (first) {
          ret += ", ";
          first = false;
        }

        ret += name_1;
      }

      ret += "}";
    }

    return ret;
  };
  /**
  * Get bone's index searching by name
  * @param name defines bone's name to search for
  * @return the indice of the bone. Returns -1 if not found
  */


  Skeleton.prototype.getBoneIndexByName = function (name) {
    for (var boneIndex = 0, cache = this.bones.length; boneIndex < cache; boneIndex++) {
      if (this.bones[boneIndex].name === name) {
        return boneIndex;
      }
    }

    return -1;
  };
  /**
   * Creater a new animation range
   * @param name defines the name of the range
   * @param from defines the start key
   * @param to defines the end key
   */


  Skeleton.prototype.createAnimationRange = function (name, from, to) {
    // check name not already in use
    if (!this._ranges[name]) {
      this._ranges[name] = new AnimationRange(name, from, to);

      for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
        if (this.bones[i].animations[0]) {
          this.bones[i].animations[0].createRange(name, from, to);
        }
      }
    }
  };
  /**
   * Delete a specific animation range
   * @param name defines the name of the range
   * @param deleteFrames defines if frames must be removed as well
   */


  Skeleton.prototype.deleteAnimationRange = function (name, deleteFrames) {
    if (deleteFrames === void 0) {
      deleteFrames = true;
    }

    for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
      if (this.bones[i].animations[0]) {
        this.bones[i].animations[0].deleteRange(name, deleteFrames);
      }
    }

    this._ranges[name] = null; // said much faster than 'delete this._range[name]'
  };
  /**
   * Gets a specific animation range
   * @param name defines the name of the range to look for
   * @returns the requested animation range or null if not found
   */


  Skeleton.prototype.getAnimationRange = function (name) {
    return this._ranges[name] || null;
  };
  /**
   * Gets the list of all animation ranges defined on this skeleton
   * @returns an array
   */


  Skeleton.prototype.getAnimationRanges = function () {
    var animationRanges = [];
    var name;

    for (name in this._ranges) {
      animationRanges.push(this._ranges[name]);
    }

    return animationRanges;
  };
  /**
   * Copy animation range from a source skeleton.
   * This is not for a complete retargeting, only between very similar skeleton's with only possible bone length differences
   * @param source defines the source skeleton
   * @param name defines the name of the range to copy
   * @param rescaleAsRequired defines if rescaling must be applied if required
   * @returns true if operation was successful
   */


  Skeleton.prototype.copyAnimationRange = function (source, name, rescaleAsRequired) {
    if (rescaleAsRequired === void 0) {
      rescaleAsRequired = false;
    }

    if (this._ranges[name] || !source.getAnimationRange(name)) {
      return false;
    }

    var ret = true;
    var frameOffset = this._getHighestAnimationFrame() + 1; // make a dictionary of source skeleton's bones, so exact same order or doublely nested loop is not required

    var boneDict = {};
    var sourceBones = source.bones;
    var nBones;
    var i;

    for (i = 0, nBones = sourceBones.length; i < nBones; i++) {
      boneDict[sourceBones[i].name] = sourceBones[i];
    }

    if (this.bones.length !== sourceBones.length) {
      Logger.Warn("copyAnimationRange: this rig has " + this.bones.length + " bones, while source as " + sourceBones.length);
      ret = false;
    }

    var skelDimensionsRatio = rescaleAsRequired && this.dimensionsAtRest && source.dimensionsAtRest ? this.dimensionsAtRest.divide(source.dimensionsAtRest) : null;

    for (i = 0, nBones = this.bones.length; i < nBones; i++) {
      var boneName = this.bones[i].name;
      var sourceBone = boneDict[boneName];

      if (sourceBone) {
        ret = ret && this.bones[i].copyAnimationRange(sourceBone, name, frameOffset, rescaleAsRequired, skelDimensionsRatio);
      } else {
        Logger.Warn("copyAnimationRange: not same rig, missing source bone " + boneName);
        ret = false;
      }
    } // do not call createAnimationRange(), since it also is done to bones, which was already done


    var range = source.getAnimationRange(name);

    if (range) {
      this._ranges[name] = new AnimationRange(name, range.from + frameOffset, range.to + frameOffset);
    }

    return ret;
  };
  /**
   * Forces the skeleton to go to rest pose
   */


  Skeleton.prototype.returnToRest = function () {
    var _localScaling = TmpVectors.Vector3[0];
    var _localRotation = TmpVectors.Quaternion[0];
    var _localPosition = TmpVectors.Vector3[1];

    for (var index = 0; index < this.bones.length; index++) {
      var bone = this.bones[index];

      if (bone._index !== -1) {
        bone.returnToRest();

        if (bone._linkedTransformNode) {
          bone.getRestPose().decompose(_localScaling, _localRotation, _localPosition);
          bone._linkedTransformNode.position = _localPosition.clone();
          bone._linkedTransformNode.rotationQuaternion = _localRotation.clone();
          bone._linkedTransformNode.scaling = _localScaling.clone();
        }
      }
    }
  };

  Skeleton.prototype._getHighestAnimationFrame = function () {
    var ret = 0;

    for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
      if (this.bones[i].animations[0]) {
        var highest = this.bones[i].animations[0].getHighestFrame();

        if (ret < highest) {
          ret = highest;
        }
      }
    }

    return ret;
  };
  /**
   * Begin a specific animation range
   * @param name defines the name of the range to start
   * @param loop defines if looping must be turned on (false by default)
   * @param speedRatio defines the speed ratio to apply (1 by default)
   * @param onAnimationEnd defines a callback which will be called when animation will end
   * @returns a new animatable
   */


  Skeleton.prototype.beginAnimation = function (name, loop, speedRatio, onAnimationEnd) {
    var range = this.getAnimationRange(name);

    if (!range) {
      return null;
    }

    return this._scene.beginAnimation(this, range.from, range.to, loop, speedRatio, onAnimationEnd);
  };
  /**
   * Convert the keyframes for a range of animation on a skeleton to be relative to a given reference frame.
   * @param skeleton defines the Skeleton containing the animation range to convert
   * @param referenceFrame defines the frame that keyframes in the range will be relative to
   * @param range defines the name of the AnimationRange belonging to the Skeleton to convert
   * @returns the original skeleton
   */


  Skeleton.MakeAnimationAdditive = function (skeleton, referenceFrame, range) {
    if (referenceFrame === void 0) {
      referenceFrame = 0;
    }

    var rangeValue = skeleton.getAnimationRange(range); // We can't make a range additive if it doesn't exist

    if (!rangeValue) {
      return null;
    } // Find any current scene-level animatable belonging to the target that matches the range


    var sceneAnimatables = skeleton._scene.getAllAnimatablesByTarget(skeleton);

    var rangeAnimatable = null;

    for (var index = 0; index < sceneAnimatables.length; index++) {
      var sceneAnimatable = sceneAnimatables[index];

      if (sceneAnimatable.fromFrame === (rangeValue === null || rangeValue === void 0 ? void 0 : rangeValue.from) && sceneAnimatable.toFrame === (rangeValue === null || rangeValue === void 0 ? void 0 : rangeValue.to)) {
        rangeAnimatable = sceneAnimatable;
        break;
      }
    } // Convert the animations belonging to the skeleton to additive keyframes


    var animatables = skeleton.getAnimatables();

    for (var index = 0; index < animatables.length; index++) {
      var animatable = animatables[index];
      var animations = animatable.animations;

      if (!animations) {
        continue;
      }

      for (var animIndex = 0; animIndex < animations.length; animIndex++) {
        Animation.MakeAnimationAdditive(animations[animIndex], referenceFrame, range);
      }
    } // Mark the scene-level animatable as additive


    if (rangeAnimatable) {
      rangeAnimatable.isAdditive = true;
    }

    return skeleton;
  };
  /** @hidden */


  Skeleton.prototype._markAsDirty = function () {
    this._isDirty = true;
  };
  /** @hidden */


  Skeleton.prototype._registerMeshWithPoseMatrix = function (mesh) {
    this._meshesWithPoseMatrix.push(mesh);
  };
  /** @hidden */


  Skeleton.prototype._unregisterMeshWithPoseMatrix = function (mesh) {
    var index = this._meshesWithPoseMatrix.indexOf(mesh);

    if (index > -1) {
      this._meshesWithPoseMatrix.splice(index, 1);
    }
  };

  Skeleton.prototype._computeTransformMatrices = function (targetMatrix, initialSkinMatrix) {
    this.onBeforeComputeObservable.notifyObservers(this);

    for (var index = 0; index < this.bones.length; index++) {
      var bone = this.bones[index];
      bone._childUpdateId++;
      var parentBone = bone.getParent();

      if (parentBone) {
        bone.getLocalMatrix().multiplyToRef(parentBone.getWorldMatrix(), bone.getWorldMatrix());
      } else {
        if (initialSkinMatrix) {
          bone.getLocalMatrix().multiplyToRef(initialSkinMatrix, bone.getWorldMatrix());
        } else {
          bone.getWorldMatrix().copyFrom(bone.getLocalMatrix());
        }
      }

      if (bone._index !== -1) {
        var mappedIndex = bone._index === null ? index : bone._index;
        bone.getInvertedAbsoluteTransform().multiplyToArray(bone.getWorldMatrix(), targetMatrix, mappedIndex * 16);
      }
    }

    this._identity.copyToArray(targetMatrix, this.bones.length * 16);
  };
  /**
   * Build all resources required to render a skeleton
   */


  Skeleton.prototype.prepare = function () {
    // Update the local matrix of bones with linked transform nodes.
    if (this._numBonesWithLinkedTransformNode > 0) {
      for (var _i = 0, _a = this.bones; _i < _a.length; _i++) {
        var bone_1 = _a[_i];

        if (bone_1._linkedTransformNode) {
          // Computing the world matrix also computes the local matrix.
          bone_1._linkedTransformNode.computeWorldMatrix();

          bone_1._matrix = bone_1._linkedTransformNode._localMatrix;
          bone_1.markAsDirty();
        }
      }
    }

    if (!this._isDirty) {
      return;
    }

    if (this.needInitialSkinMatrix) {
      for (var index = 0; index < this._meshesWithPoseMatrix.length; index++) {
        var mesh = this._meshesWithPoseMatrix[index];
        var poseMatrix = mesh.getPoseMatrix();

        if (!mesh._bonesTransformMatrices || mesh._bonesTransformMatrices.length !== 16 * (this.bones.length + 1)) {
          mesh._bonesTransformMatrices = new Float32Array(16 * (this.bones.length + 1));
        }

        if (this._synchronizedWithMesh !== mesh) {
          this._synchronizedWithMesh = mesh; // Prepare bones

          for (var boneIndex = 0; boneIndex < this.bones.length; boneIndex++) {
            var bone = this.bones[boneIndex];

            if (!bone.getParent()) {
              var matrix = bone.getBaseMatrix();
              matrix.multiplyToRef(poseMatrix, TmpVectors.Matrix[1]);

              bone._updateDifferenceMatrix(TmpVectors.Matrix[1]);
            }
          }

          if (this.isUsingTextureForMatrices) {
            var textureWidth = (this.bones.length + 1) * 4;

            if (!mesh._transformMatrixTexture || mesh._transformMatrixTexture.getSize().width !== textureWidth) {
              if (mesh._transformMatrixTexture) {
                mesh._transformMatrixTexture.dispose();
              }

              mesh._transformMatrixTexture = RawTexture.CreateRGBATexture(mesh._bonesTransformMatrices, (this.bones.length + 1) * 4, 1, this._scene, false, false, 1, 1);
            }
          }
        }

        this._computeTransformMatrices(mesh._bonesTransformMatrices, poseMatrix);

        if (this.isUsingTextureForMatrices && mesh._transformMatrixTexture) {
          mesh._transformMatrixTexture.update(mesh._bonesTransformMatrices);
        }
      }
    } else {
      if (!this._transformMatrices || this._transformMatrices.length !== 16 * (this.bones.length + 1)) {
        this._transformMatrices = new Float32Array(16 * (this.bones.length + 1));

        if (this.isUsingTextureForMatrices) {
          if (this._transformMatrixTexture) {
            this._transformMatrixTexture.dispose();
          }

          this._transformMatrixTexture = RawTexture.CreateRGBATexture(this._transformMatrices, (this.bones.length + 1) * 4, 1, this._scene, false, false, 1, 1);
        }
      }

      this._computeTransformMatrices(this._transformMatrices, null);

      if (this.isUsingTextureForMatrices && this._transformMatrixTexture) {
        this._transformMatrixTexture.update(this._transformMatrices);
      }
    }

    this._isDirty = false;

    this._scene._activeBones.addCount(this.bones.length, false);
  };
  /**
   * Gets the list of animatables currently running for this skeleton
   * @returns an array of animatables
   */


  Skeleton.prototype.getAnimatables = function () {
    if (!this._animatables || this._animatables.length !== this.bones.length) {
      this._animatables = [];

      for (var index = 0; index < this.bones.length; index++) {
        this._animatables.push(this.bones[index]);
      }
    }

    return this._animatables;
  };
  /**
   * Clone the current skeleton
   * @param name defines the name of the new skeleton
   * @param id defines the id of the new skeleton
   * @returns the new skeleton
   */


  Skeleton.prototype.clone = function (name, id) {
    var result = new Skeleton(name, id || name, this._scene);
    result.needInitialSkinMatrix = this.needInitialSkinMatrix;
    result.overrideMesh = this.overrideMesh;

    for (var index = 0; index < this.bones.length; index++) {
      var source = this.bones[index];
      var parentBone = null;
      var parent_1 = source.getParent();

      if (parent_1) {
        var parentIndex = this.bones.indexOf(parent_1);
        parentBone = result.bones[parentIndex];
      }

      var bone = new Bone(source.name, result, parentBone, source.getBaseMatrix().clone(), source.getRestPose().clone());
      bone._index = source._index;

      if (source._linkedTransformNode) {
        bone.linkTransformNode(source._linkedTransformNode);
      }

      DeepCopier.DeepCopy(source.animations, bone.animations);
    }

    if (this._ranges) {
      result._ranges = {};

      for (var rangeName in this._ranges) {
        var range = this._ranges[rangeName];

        if (range) {
          result._ranges[rangeName] = range.clone();
        }
      }
    }

    this._isDirty = true;
    return result;
  };
  /**
   * Enable animation blending for this skeleton
   * @param blendingSpeed defines the blending speed to apply
   * @see https://doc.babylonjs.com/babylon101/animations#animation-blending
   */


  Skeleton.prototype.enableBlending = function (blendingSpeed) {
    if (blendingSpeed === void 0) {
      blendingSpeed = 0.01;
    }

    this.bones.forEach(function (bone) {
      bone.animations.forEach(function (animation) {
        animation.enableBlending = true;
        animation.blendingSpeed = blendingSpeed;
      });
    });
  };
  /**
   * Releases all resources associated with the current skeleton
   */


  Skeleton.prototype.dispose = function () {
    this._meshesWithPoseMatrix = []; // Animations

    this.getScene().stopAnimation(this); // Remove from scene

    this.getScene().removeSkeleton(this);

    if (this._transformMatrixTexture) {
      this._transformMatrixTexture.dispose();

      this._transformMatrixTexture = null;
    }
  };
  /**
   * Serialize the skeleton in a JSON object
   * @returns a JSON object
   */


  Skeleton.prototype.serialize = function () {
    var _a, _b;

    var serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.id = this.id;

    if (this.dimensionsAtRest) {
      serializationObject.dimensionsAtRest = this.dimensionsAtRest.asArray();
    }

    serializationObject.bones = [];
    serializationObject.needInitialSkinMatrix = this.needInitialSkinMatrix;
    serializationObject.overrideMeshId = (_a = this.overrideMesh) === null || _a === void 0 ? void 0 : _a.id;

    for (var index = 0; index < this.bones.length; index++) {
      var bone = this.bones[index];
      var parent_2 = bone.getParent();
      var serializedBone = {
        parentBoneIndex: parent_2 ? this.bones.indexOf(parent_2) : -1,
        index: bone.getIndex(),
        name: bone.name,
        matrix: bone.getBaseMatrix().toArray(),
        rest: bone.getRestPose().toArray(),
        linkedTransformNodeId: (_b = bone.getTransformNode()) === null || _b === void 0 ? void 0 : _b.id
      };
      serializationObject.bones.push(serializedBone);

      if (bone.length) {
        serializedBone.length = bone.length;
      }

      if (bone.metadata) {
        serializedBone.metadata = bone.metadata;
      }

      if (bone.animations && bone.animations.length > 0) {
        serializedBone.animation = bone.animations[0].serialize();
      }

      serializationObject.ranges = [];

      for (var name in this._ranges) {
        var source = this._ranges[name];

        if (!source) {
          continue;
        }

        var range = {};
        range.name = name;
        range.from = source.from;
        range.to = source.to;
        serializationObject.ranges.push(range);
      }
    }

    return serializationObject;
  };
  /**
   * Creates a new skeleton from serialized data
   * @param parsedSkeleton defines the serialized data
   * @param scene defines the hosting scene
   * @returns a new skeleton
   */


  Skeleton.Parse = function (parsedSkeleton, scene) {
    var skeleton = new Skeleton(parsedSkeleton.name, parsedSkeleton.id, scene);

    if (parsedSkeleton.dimensionsAtRest) {
      skeleton.dimensionsAtRest = Vector3.FromArray(parsedSkeleton.dimensionsAtRest);
    }

    skeleton.needInitialSkinMatrix = parsedSkeleton.needInitialSkinMatrix;

    if (parsedSkeleton.overrideMeshId) {
      skeleton._hasWaitingData = true;
      skeleton._waitingOverrideMeshId = parsedSkeleton.overrideMeshId;
    }

    var index;

    for (index = 0; index < parsedSkeleton.bones.length; index++) {
      var parsedBone = parsedSkeleton.bones[index];
      var parsedBoneIndex = parsedSkeleton.bones[index].index;
      var parentBone = null;

      if (parsedBone.parentBoneIndex > -1) {
        parentBone = skeleton.bones[parsedBone.parentBoneIndex];
      }

      var rest = parsedBone.rest ? Matrix.FromArray(parsedBone.rest) : null;
      var bone = new Bone(parsedBone.name, skeleton, parentBone, Matrix.FromArray(parsedBone.matrix), rest, null, parsedBoneIndex);

      if (parsedBone.id !== undefined && parsedBone.id !== null) {
        bone.id = parsedBone.id;
      }

      if (parsedBone.length) {
        bone.length = parsedBone.length;
      }

      if (parsedBone.metadata) {
        bone.metadata = parsedBone.metadata;
      }

      if (parsedBone.animation) {
        bone.animations.push(Animation.Parse(parsedBone.animation));
      }

      if (parsedBone.linkedTransformNodeId !== undefined && parsedBone.linkedTransformNodeId !== null) {
        skeleton._hasWaitingData = true;
        bone._waitingTransformNodeId = parsedBone.linkedTransformNodeId;
      }
    } // placed after bones, so createAnimationRange can cascade down


    if (parsedSkeleton.ranges) {
      for (index = 0; index < parsedSkeleton.ranges.length; index++) {
        var data = parsedSkeleton.ranges[index];
        skeleton.createAnimationRange(data.name, data.from, data.to);
      }
    }

    return skeleton;
  };
  /**
   * Compute all node absolute transforms
   * @param forceUpdate defines if computation must be done even if cache is up to date
   */


  Skeleton.prototype.computeAbsoluteTransforms = function (forceUpdate) {
    if (forceUpdate === void 0) {
      forceUpdate = false;
    }

    var renderId = this._scene.getRenderId();

    if (this._lastAbsoluteTransformsUpdateId != renderId || forceUpdate) {
      this.bones[0].computeAbsoluteTransforms();
      this._lastAbsoluteTransformsUpdateId = renderId;
    }
  };
  /**
   * Gets the root pose matrix
   * @returns a matrix
   */


  Skeleton.prototype.getPoseMatrix = function () {
    var poseMatrix = null;

    if (this._meshesWithPoseMatrix.length > 0) {
      poseMatrix = this._meshesWithPoseMatrix[0].getPoseMatrix();
    }

    return poseMatrix;
  };
  /**
   * Sorts bones per internal index
   */


  Skeleton.prototype.sortBones = function () {
    var bones = new Array();
    var visited = new Array(this.bones.length);

    for (var index = 0; index < this.bones.length; index++) {
      this._sortBones(index, bones, visited);
    }

    this.bones = bones;
  };

  Skeleton.prototype._sortBones = function (index, bones, visited) {
    if (visited[index]) {
      return;
    }

    visited[index] = true;
    var bone = this.bones[index];

    if (bone._index === undefined) {
      bone._index = index;
    }

    var parentBone = bone.getParent();

    if (parentBone) {
      this._sortBones(this.bones.indexOf(parentBone), bones, visited);
    }

    bones.push(bone);
  };
  /**
   * Set the current local matrix as the restPose for all bones in the skeleton.
   */


  Skeleton.prototype.setCurrentPoseAsRest = function () {
    this.bones.forEach(function (b) {
      b.setCurrentPoseAsRest();
    });
  };

  return Skeleton;
}();

/**
 * @ignore
 * This is a list of all the different input types that are available in the application.
 * Fo instance: ArcRotateCameraGamepadInput...
 */

var CameraInputTypes = {};
/**
 * This represents the input manager used within a camera.
 * It helps dealing with all the different kind of input attached to a camera.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */

var CameraInputsManager = function () {
  /**
   * Instantiate a new Camera Input Manager.
   * @param camera Defines the camera the input manager blongs to
   */
  function CameraInputsManager(camera) {
    /**
     * Defines the dom element the camera is collecting inputs from.
     * This is null if the controls have not been attached.
     */
    this.attachedToElement = false;
    this.attached = {};
    this.camera = camera;

    this.checkInputs = function () {};
  }
  /**
   * Add an input method to a camera
   * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
   * @param input camera input method
   */


  CameraInputsManager.prototype.add = function (input) {
    var type = input.getSimpleName();

    if (this.attached[type]) {
      Logger.Warn("camera input of type " + type + " already exists on camera");
      return;
    }

    this.attached[type] = input;
    input.camera = this.camera; //for checkInputs, we are dynamically creating a function
    //the goal is to avoid the performance penalty of looping for inputs in the render loop

    if (input.checkInputs) {
      this.checkInputs = this._addCheckInputs(input.checkInputs.bind(input));
    }

    if (this.attachedToElement) {
      input.attachControl();
    }
  };
  /**
   * Remove a specific input method from a camera
   * example: camera.inputs.remove(camera.inputs.attached.mouse);
   * @param inputToRemove camera input method
   */


  CameraInputsManager.prototype.remove = function (inputToRemove) {
    for (var cam in this.attached) {
      var input = this.attached[cam];

      if (input === inputToRemove) {
        input.detachControl();
        input.camera = null;
        delete this.attached[cam];
        this.rebuildInputCheck();
      }
    }
  };
  /**
   * Remove a specific input type from a camera
   * example: camera.inputs.remove("ArcRotateCameraGamepadInput");
   * @param inputType the type of the input to remove
   */


  CameraInputsManager.prototype.removeByType = function (inputType) {
    for (var cam in this.attached) {
      var input = this.attached[cam];

      if (input.getClassName() === inputType) {
        input.detachControl();
        input.camera = null;
        delete this.attached[cam];
        this.rebuildInputCheck();
      }
    }
  };

  CameraInputsManager.prototype._addCheckInputs = function (fn) {
    var current = this.checkInputs;
    return function () {
      current();
      fn();
    };
  };
  /**
   * Attach the input controls to the currently attached dom element to listen the events from.
   * @param input Defines the input to attach
   */


  CameraInputsManager.prototype.attachInput = function (input) {
    if (this.attachedToElement) {
      input.attachControl(this.noPreventDefault);
    }
  };
  /**
   * Attach the current manager inputs controls to a specific dom element to listen the events from.
   * @param element Defines the dom element to collect the events from
   * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */


  CameraInputsManager.prototype.attachElement = function (noPreventDefault) {
    if (noPreventDefault === void 0) {
      noPreventDefault = false;
    }

    if (this.attachedToElement) {
      return;
    }

    noPreventDefault = Camera.ForceAttachControlToAlwaysPreventDefault ? false : noPreventDefault;
    this.attachedToElement = true;
    this.noPreventDefault = noPreventDefault;

    for (var cam in this.attached) {
      this.attached[cam].attachControl(noPreventDefault);
    }
  };
  /**
   * Detach the current manager inputs controls from a specific dom element.
   * @param element Defines the dom element to collect the events from
   * @param disconnect Defines whether the input should be removed from the current list of attached inputs
   */


  CameraInputsManager.prototype.detachElement = function (disconnect) {
    if (disconnect === void 0) {
      disconnect = false;
    }

    for (var cam in this.attached) {
      this.attached[cam].detachControl();

      if (disconnect) {
        this.attached[cam].camera = null;
      }
    }

    this.attachedToElement = false;
  };
  /**
   * Rebuild the dynamic inputCheck function from the current list of
   * defined inputs in the manager.
   */


  CameraInputsManager.prototype.rebuildInputCheck = function () {
    this.checkInputs = function () {};

    for (var cam in this.attached) {
      var input = this.attached[cam];

      if (input.checkInputs) {
        this.checkInputs = this._addCheckInputs(input.checkInputs.bind(input));
      }
    }
  };
  /**
   * Remove all attached input methods from a camera
   */


  CameraInputsManager.prototype.clear = function () {
    if (this.attachedToElement) {
      this.detachElement(true);
    }

    this.attached = {};
    this.attachedToElement = false;

    this.checkInputs = function () {};
  };
  /**
   * Serialize the current input manager attached to a camera.
   * This ensures than once parsed,
   * the input associated to the camera will be identical to the current ones
   * @param serializedCamera Defines the camera serialization JSON the input serialization should write to
   */


  CameraInputsManager.prototype.serialize = function (serializedCamera) {
    var inputs = {};

    for (var cam in this.attached) {
      var input = this.attached[cam];
      var res = SerializationHelper.Serialize(input);
      inputs[input.getClassName()] = res;
    }

    serializedCamera.inputsmgr = inputs;
  };
  /**
   * Parses an input manager serialized JSON to restore the previous list of inputs
   * and states associated to a camera.
   * @param parsedCamera Defines the JSON to parse
   */


  CameraInputsManager.prototype.parse = function (parsedCamera) {
    var parsedInputs = parsedCamera.inputsmgr;

    if (parsedInputs) {
      this.clear();

      for (var n in parsedInputs) {
        var construct = CameraInputTypes[n];

        if (construct) {
          var parsedinput = parsedInputs[n];
          var input = SerializationHelper.Parse(function () {
            return new construct();
          }, parsedinput, null);
          this.add(input);
        }
      }
    } else {
      //2016-03-08 this part is for managing backward compatibility
      for (var n in this.attached) {
        var construct = CameraInputTypes[this.attached[n].getClassName()];

        if (construct) {
          var input = SerializationHelper.Parse(function () {
            return new construct();
          }, parsedCamera, null);
          this.remove(this.attached[n]);
          this.add(input);
        }
      }
    }
  };

  return CameraInputsManager;
}();

/**
 * Manage the keyboard inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */

var FreeCameraKeyboardMoveInput = function () {
  function FreeCameraKeyboardMoveInput() {
    /**
     * Gets or Set the list of keyboard keys used to control the forward move of the camera.
     */
    this.keysUp = [38];
    /**
     * Gets or Set the list of keyboard keys used to control the upward move of the camera.
     */

    this.keysUpward = [33];
    /**
     * Gets or Set the list of keyboard keys used to control the backward move of the camera.
     */

    this.keysDown = [40];
    /**
     * Gets or Set the list of keyboard keys used to control the downward move of the camera.
     */

    this.keysDownward = [34];
    /**
     * Gets or Set the list of keyboard keys used to control the left strafe move of the camera.
     */

    this.keysLeft = [37];
    /**
     * Gets or Set the list of keyboard keys used to control the right strafe move of the camera.
     */

    this.keysRight = [39];
    this._keys = new Array();
  }
  /**
   * Attach the input controls to a specific dom element to get the input from.
   * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */


  FreeCameraKeyboardMoveInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;

    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);

    if (this._onCanvasBlurObserver) {
      return;
    }

    this._scene = this.camera.getScene();
    this._engine = this._scene.getEngine();
    this._onCanvasBlurObserver = this._engine.onCanvasBlurObservable.add(function () {
      _this._keys = [];
    });
    this._onKeyboardObserver = this._scene.onKeyboardObservable.add(function (info) {
      var evt = info.event;

      if (!evt.metaKey) {
        if (info.type === KeyboardEventTypes.KEYDOWN) {
          if (_this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1 || _this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1 || _this.keysUpward.indexOf(evt.keyCode) !== -1 || _this.keysDownward.indexOf(evt.keyCode) !== -1) {
            var index = _this._keys.indexOf(evt.keyCode);

            if (index === -1) {
              _this._keys.push(evt.keyCode);
            }

            if (!noPreventDefault) {
              evt.preventDefault();
            }
          }
        } else {
          if (_this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1 || _this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1 || _this.keysUpward.indexOf(evt.keyCode) !== -1 || _this.keysDownward.indexOf(evt.keyCode) !== -1) {
            var index = _this._keys.indexOf(evt.keyCode);

            if (index >= 0) {
              _this._keys.splice(index, 1);
            }

            if (!noPreventDefault) {
              evt.preventDefault();
            }
          }
        }
      }
    });
  };
  /**
   * Detach the current controls from the specified dom element.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   */


  FreeCameraKeyboardMoveInput.prototype.detachControl = function (ignored) {
    if (this._scene) {
      if (this._onKeyboardObserver) {
        this._scene.onKeyboardObservable.remove(this._onKeyboardObserver);
      }

      if (this._onCanvasBlurObserver) {
        this._engine.onCanvasBlurObservable.remove(this._onCanvasBlurObserver);
      }

      this._onKeyboardObserver = null;
      this._onCanvasBlurObserver = null;
    }

    this._keys = [];
  };
  /**
   * Update the current camera state depending on the inputs that have been used this frame.
   * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
   */


  FreeCameraKeyboardMoveInput.prototype.checkInputs = function () {
    if (this._onKeyboardObserver) {
      var camera = this.camera; // Keyboard

      for (var index = 0; index < this._keys.length; index++) {
        var keyCode = this._keys[index];

        var speed = camera._computeLocalCameraSpeed();

        if (this.keysLeft.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(-speed, 0, 0);
        } else if (this.keysUp.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(0, 0, speed);
        } else if (this.keysRight.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(speed, 0, 0);
        } else if (this.keysDown.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(0, 0, -speed);
        } else if (this.keysUpward.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(0, speed, 0);
        } else if (this.keysDownward.indexOf(keyCode) !== -1) {
          camera._localDirection.copyFromFloats(0, -speed, 0);
        }

        if (camera.getScene().useRightHandedSystem) {
          camera._localDirection.z *= -1;
        }

        camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
        Vector3.TransformNormalToRef(camera._localDirection, camera._cameraTransformMatrix, camera._transformedDirection);
        camera.cameraDirection.addInPlace(camera._transformedDirection);
      }
    }
  };
  /**
   * Gets the class name of the current intput.
   * @returns the class name
   */


  FreeCameraKeyboardMoveInput.prototype.getClassName = function () {
    return "FreeCameraKeyboardMoveInput";
  };
  /** @hidden */


  FreeCameraKeyboardMoveInput.prototype._onLostFocus = function () {
    this._keys = [];
  };
  /**
   * Get the friendly name associated with the input class.
   * @returns the input friendly name
   */


  FreeCameraKeyboardMoveInput.prototype.getSimpleName = function () {
    return "keyboard";
  };

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysUp", void 0);

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysUpward", void 0);

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysDown", void 0);

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysDownward", void 0);

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysLeft", void 0);

  __decorate([serialize()], FreeCameraKeyboardMoveInput.prototype, "keysRight", void 0);

  return FreeCameraKeyboardMoveInput;
}();
CameraInputTypes["FreeCameraKeyboardMoveInput"] = FreeCameraKeyboardMoveInput;

/**
 * Manage the mouse inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */

var FreeCameraMouseInput = function () {
  /**
   * Manage the mouse inputs to control the movement of a free camera.
   * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
   * @param touchEnabled Defines if touch is enabled or not
   */
  function FreeCameraMouseInput(
  /**
   * Define if touch is enabled in the mouse input
   */
  touchEnabled) {
    if (touchEnabled === void 0) {
      touchEnabled = true;
    }

    this.touchEnabled = touchEnabled;
    /**
     * Defines the buttons associated with the input to handle camera move.
     */

    this.buttons = [0, 1, 2];
    /**
     * Defines the pointer angular sensibility  along the X and Y axis or how fast is the camera rotating.
     */

    this.angularSensibility = 2000.0;
    this.previousPosition = null;
    /**
     * Observable for when a pointer move event occurs containing the move offset
     */

    this.onPointerMovedObservable = new Observable();
    /**
     * @hidden
     * If the camera should be rotated automatically based on pointer movement
     */

    this._allowCameraRotation = true;
  }
  /**
   * Attach the input controls to a specific dom element to get the input from.
   * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */


  FreeCameraMouseInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;

    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();

    if (!this._pointerInput) {
      this._pointerInput = function (p) {
        var evt = p.event;

        if (engine.isInVRExclusivePointerMode) {
          return;
        }

        if (!_this.touchEnabled && evt.pointerType === "touch") {
          return;
        }

        if (p.type !== PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1) {
          return;
        }

        var srcElement = evt.srcElement || evt.target;

        if (p.type === PointerEventTypes.POINTERDOWN && srcElement) {
          try {
            srcElement.setPointerCapture(evt.pointerId);
          } catch (e) {//Nothing to do with the error. Execution will continue.
          }

          _this.previousPosition = {
            x: evt.clientX,
            y: evt.clientY
          };

          if (!noPreventDefault) {
            evt.preventDefault();
            element && element.focus();
          } // This is required to move while pointer button is down


          if (engine.isPointerLock && _this._onMouseMove) {
            _this._onMouseMove(p.event);
          }
        } else if (p.type === PointerEventTypes.POINTERUP && srcElement) {
          try {
            srcElement.releasePointerCapture(evt.pointerId);
          } catch (e) {//Nothing to do with the error.
          }

          _this.previousPosition = null;

          if (!noPreventDefault) {
            evt.preventDefault();
          }
        } else if (p.type === PointerEventTypes.POINTERMOVE) {
          if (!_this.previousPosition) {
            if (engine.isPointerLock && _this._onMouseMove) {
              _this._onMouseMove(p.event);
            }

            return;
          }

          var offsetX = evt.clientX - _this.previousPosition.x;
          var offsetY = evt.clientY - _this.previousPosition.y;

          if (_this.camera.getScene().useRightHandedSystem) {
            offsetX *= -1;
          }

          if (_this.camera.parent && _this.camera.parent._getWorldMatrixDeterminant() < 0) {
            offsetX *= -1;
          }

          if (_this._allowCameraRotation) {
            _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
            _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
          }

          _this.onPointerMovedObservable.notifyObservers({
            offsetX: offsetX,
            offsetY: offsetY
          });

          _this.previousPosition = {
            x: evt.clientX,
            y: evt.clientY
          };

          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
    }

    this._onMouseMove = function (evt) {
      if (!engine.isPointerLock) {
        return;
      }

      if (engine.isInVRExclusivePointerMode) {
        return;
      }

      var offsetX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || evt.msMovementX || 0;

      if (_this.camera.getScene().useRightHandedSystem) {
        offsetX *= -1;
      }

      if (_this.camera.parent && _this.camera.parent._getWorldMatrixDeterminant() < 0) {
        offsetX *= -1;
      }

      _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
      var offsetY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || evt.msMovementY || 0;
      _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
      _this.previousPosition = null;

      if (!noPreventDefault) {
        evt.preventDefault();
      }
    };

    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);
    element && element.addEventListener("contextmenu", this.onContextMenu.bind(this), false);
  };
  /**
   * Called on JS contextmenu event.
   * Override this method to provide functionality.
   */


  FreeCameraMouseInput.prototype.onContextMenu = function (evt) {
    evt.preventDefault();
  };
  /**
   * Detach the current controls from the specified dom element.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   */


  FreeCameraMouseInput.prototype.detachControl = function (ignored) {
    if (this._observer) {
      this.camera.getScene().onPointerObservable.remove(this._observer);

      if (this.onContextMenu) {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        element && element.removeEventListener("contextmenu", this.onContextMenu);
      }

      if (this.onPointerMovedObservable) {
        this.onPointerMovedObservable.clear();
      }

      this._observer = null;
      this._onMouseMove = null;
      this.previousPosition = null;
    }
  };
  /**
   * Gets the class name of the current intput.
   * @returns the class name
   */


  FreeCameraMouseInput.prototype.getClassName = function () {
    return "FreeCameraMouseInput";
  };
  /**
   * Get the friendly name associated with the input class.
   * @returns the input friendly name
   */


  FreeCameraMouseInput.prototype.getSimpleName = function () {
    return "mouse";
  };

  __decorate([serialize()], FreeCameraMouseInput.prototype, "buttons", void 0);

  __decorate([serialize()], FreeCameraMouseInput.prototype, "angularSensibility", void 0);

  return FreeCameraMouseInput;
}();
CameraInputTypes["FreeCameraMouseInput"] = FreeCameraMouseInput;

/**
 * Base class for mouse wheel input..
 * See FollowCameraMouseWheelInput in src/Cameras/Inputs/freeCameraMouseWheelInput.ts
 * for example usage.
 */

var BaseCameraMouseWheelInput = function () {
  function BaseCameraMouseWheelInput() {
    /**
     * How fast is the camera moves in relation to X axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    this.wheelPrecisionX = 3.0;
    /**
     * How fast is the camera moves in relation to Y axis mouseWheel events.
     * Use negative value to reverse direction.
     */

    this.wheelPrecisionY = 3.0;
    /**
     * How fast is the camera moves in relation to Z axis mouseWheel events.
     * Use negative value to reverse direction.
     */

    this.wheelPrecisionZ = 3.0;
    /**
     * Observable for when a mouse wheel move event occurs.
     */

    this.onChangedObservable = new Observable();
    /**
     * Incremental value of multiple mouse wheel movements of the X axis.
     * Should be zero-ed when read.
     */

    this._wheelDeltaX = 0;
    /**
     * Incremental value of multiple mouse wheel movements of the Y axis.
     * Should be zero-ed when read.
     */

    this._wheelDeltaY = 0;
    /**
     * Incremental value of multiple mouse wheel movements of the Z axis.
     * Should be zero-ed when read.
     */

    this._wheelDeltaZ = 0;
    /**
     * Firefox uses a different scheme to report scroll distances to other
     * browsers. Rather than use complicated methods to calculate the exact
     * multiple we need to apply, let's just cheat and use a constant.
     * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
     * https://stackoverflow.com/questions/20110224/what-is-the-height-of-a-line-in-a-wheel-event-deltamode-dom-delta-line
     */

    this._ffMultiplier = 12;
    /**
     * Different event attributes for wheel data fall into a few set ranges.
     * Some relevant but dated date here:
     * https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers
     */

    this._normalize = 120;
  }
  /**
   * Attach the input controls to a specific dom element to get the input from.
   * @param noPreventDefault Defines whether event caught by the controls
   *   should call preventdefault().
   *   (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */


  BaseCameraMouseWheelInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;

    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);

    this._wheel = function (pointer) {
      // sanity check - this should be a PointerWheel event.
      if (pointer.type !== PointerEventTypes.POINTERWHEEL) {
        return;
      }

      var event = pointer.event;
      var platformScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? _this._ffMultiplier : 1;

      if (event.deltaY !== undefined) {
        // Most recent browsers versions have delta properties.
        // Firefox >= v17  (Has WebGL >= v4)
        // Chrome >=  v31  (Has WebGL >= v8)
        // Edge >=    v12  (Has WebGl >= v12)
        // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
        _this._wheelDeltaX += _this.wheelPrecisionX * platformScale * event.deltaX / _this._normalize;
        _this._wheelDeltaY -= _this.wheelPrecisionY * platformScale * event.deltaY / _this._normalize;
        _this._wheelDeltaZ += _this.wheelPrecisionZ * platformScale * event.deltaZ / _this._normalize;
      } else if (event.wheelDeltaY !== undefined) {
        // Unsure whether these catch anything more. Documentation
        // online is contradictory.
        _this._wheelDeltaX += _this.wheelPrecisionX * platformScale * event.wheelDeltaX / _this._normalize;
        _this._wheelDeltaY -= _this.wheelPrecisionY * platformScale * event.wheelDeltaY / _this._normalize;
        _this._wheelDeltaZ += _this.wheelPrecisionZ * platformScale * event.wheelDeltaZ / _this._normalize;
      } else if (event.wheelDelta) {
        // IE >= v9   (Has WebGL >= v11)
        // Maybe others?
        _this._wheelDeltaY -= _this.wheelPrecisionY * event.wheelDelta / _this._normalize;
      }

      if (event.preventDefault) {
        if (!noPreventDefault) {
          event.preventDefault();
        }
      }
    };

    this._observer = this.camera.getScene().onPointerObservable.add(this._wheel, PointerEventTypes.POINTERWHEEL);
  };
  /**
   * Detach the current controls from the specified dom element.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   */


  BaseCameraMouseWheelInput.prototype.detachControl = function (ignored) {
    if (this._observer) {
      this.camera.getScene().onPointerObservable.remove(this._observer);
      this._observer = null;
      this._wheel = null;
    }

    if (this.onChangedObservable) {
      this.onChangedObservable.clear();
    }
  };
  /**
   * Called for each rendered frame.
   */


  BaseCameraMouseWheelInput.prototype.checkInputs = function () {
    this.onChangedObservable.notifyObservers({
      wheelDeltaX: this._wheelDeltaX,
      wheelDeltaY: this._wheelDeltaY,
      wheelDeltaZ: this._wheelDeltaZ
    }); // Clear deltas.

    this._wheelDeltaX = 0;
    this._wheelDeltaY = 0;
    this._wheelDeltaZ = 0;
  };
  /**
   * Gets the class name of the current intput.
   * @returns the class name
   */


  BaseCameraMouseWheelInput.prototype.getClassName = function () {
    return "BaseCameraMouseWheelInput";
  };
  /**
   * Get the friendly name associated with the input class.
   * @returns the input friendly name
   */


  BaseCameraMouseWheelInput.prototype.getSimpleName = function () {
    return "mousewheel";
  };

  __decorate([serialize()], BaseCameraMouseWheelInput.prototype, "wheelPrecisionX", void 0);

  __decorate([serialize()], BaseCameraMouseWheelInput.prototype, "wheelPrecisionY", void 0);

  __decorate([serialize()], BaseCameraMouseWheelInput.prototype, "wheelPrecisionZ", void 0);

  return BaseCameraMouseWheelInput;
}();

var _CameraProperty;

(function (_CameraProperty) {
  _CameraProperty[_CameraProperty["MoveRelative"] = 0] = "MoveRelative";
  _CameraProperty[_CameraProperty["RotateRelative"] = 1] = "RotateRelative";
  _CameraProperty[_CameraProperty["MoveScene"] = 2] = "MoveScene";
})(_CameraProperty || (_CameraProperty = {}));
/**
 * Manage the mouse wheel inputs to control a free camera.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */


var FreeCameraMouseWheelInput = function (_super) {
  __extends(FreeCameraMouseWheelInput, _super);

  function FreeCameraMouseWheelInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._moveRelative = Vector3.Zero();
    _this._rotateRelative = Vector3.Zero();
    _this._moveScene = Vector3.Zero();
    /**
     * These are set to the desired default behaviour.
     */

    _this._wheelXAction = _CameraProperty.MoveRelative;
    _this._wheelXActionCoordinate = Coordinate.X;
    _this._wheelYAction = _CameraProperty.MoveRelative;
    _this._wheelYActionCoordinate = Coordinate.Z;
    _this._wheelZAction = null;
    _this._wheelZActionCoordinate = null;
    return _this;
  }
  /**
   * Gets the class name of the current input.
   * @returns the class name
   */


  FreeCameraMouseWheelInput.prototype.getClassName = function () {
    return "FreeCameraMouseWheelInput";
  };

  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelXMoveRelative", {
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's X axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelXAction !== _CameraProperty.MoveRelative) {
        return null;
      }

      return this._wheelXActionCoordinate;
    },

    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's X axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelXAction !== _CameraProperty.MoveRelative) {
        // Attempting to clear different _wheelXAction.
        return;
      }

      this._wheelXAction = _CameraProperty.MoveRelative;
      this._wheelXActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelYMoveRelative", {
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's Y axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelYAction !== _CameraProperty.MoveRelative) {
        return null;
      }

      return this._wheelYActionCoordinate;
    },

    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's Y axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelYAction !== _CameraProperty.MoveRelative) {
        // Attempting to clear different _wheelYAction.
        return;
      }

      this._wheelYAction = _CameraProperty.MoveRelative;
      this._wheelYActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelZMoveRelative", {
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's Z axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelZAction !== _CameraProperty.MoveRelative) {
        return null;
      }

      return this._wheelZActionCoordinate;
    },

    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's Z axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelZAction !== _CameraProperty.MoveRelative) {
        // Attempting to clear different _wheelZAction.
        return;
      }

      this._wheelZAction = _CameraProperty.MoveRelative;
      this._wheelZActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelXRotateRelative", {
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's X axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelXAction !== _CameraProperty.RotateRelative) {
        return null;
      }

      return this._wheelXActionCoordinate;
    },

    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's X axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelXAction !== _CameraProperty.RotateRelative) {
        // Attempting to clear different _wheelXAction.
        return;
      }

      this._wheelXAction = _CameraProperty.RotateRelative;
      this._wheelXActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelYRotateRelative", {
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's Y axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelYAction !== _CameraProperty.RotateRelative) {
        return null;
      }

      return this._wheelYActionCoordinate;
    },

    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's Y axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelYAction !== _CameraProperty.RotateRelative) {
        // Attempting to clear different _wheelYAction.
        return;
      }

      this._wheelYAction = _CameraProperty.RotateRelative;
      this._wheelYActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelZRotateRelative", {
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's Z axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelZAction !== _CameraProperty.RotateRelative) {
        return null;
      }

      return this._wheelZActionCoordinate;
    },

    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's Z axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelZAction !== _CameraProperty.RotateRelative) {
        // Attempting to clear different _wheelZAction.
        return;
      }

      this._wheelZAction = _CameraProperty.RotateRelative;
      this._wheelZActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelXMoveScene", {
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * X axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelXAction !== _CameraProperty.MoveScene) {
        return null;
      }

      return this._wheelXActionCoordinate;
    },

    /**
     * Set which movement axis (relative to the scene) the mouse wheel's X axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelXAction !== _CameraProperty.MoveScene) {
        // Attempting to clear different _wheelXAction.
        return;
      }

      this._wheelXAction = _CameraProperty.MoveScene;
      this._wheelXActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelYMoveScene", {
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * Y axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelYAction !== _CameraProperty.MoveScene) {
        return null;
      }

      return this._wheelYActionCoordinate;
    },

    /**
     * Set which movement axis (relative to the scene) the mouse wheel's Y axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelYAction !== _CameraProperty.MoveScene) {
        // Attempting to clear different _wheelYAction.
        return;
      }

      this._wheelYAction = _CameraProperty.MoveScene;
      this._wheelYActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCameraMouseWheelInput.prototype, "wheelZMoveScene", {
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * Z axis controls.
     * @returns The configured axis or null if none.
     */
    get: function () {
      if (this._wheelZAction !== _CameraProperty.MoveScene) {
        return null;
      }

      return this._wheelZActionCoordinate;
    },

    /**
     * Set which movement axis (relative to the scene) the mouse wheel's Z axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set: function (axis) {
      if (axis === null && this._wheelZAction !== _CameraProperty.MoveScene) {
        // Attempting to clear different _wheelZAction.
        return;
      }

      this._wheelZAction = _CameraProperty.MoveScene;
      this._wheelZActionCoordinate = axis;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Called for each rendered frame.
   */

  FreeCameraMouseWheelInput.prototype.checkInputs = function () {
    if (this._wheelDeltaX === 0 && this._wheelDeltaY === 0 && this._wheelDeltaZ == 0) {
      return;
    } // Clear the camera properties that we might be updating.


    this._moveRelative.setAll(0);

    this._rotateRelative.setAll(0);

    this._moveScene.setAll(0); // Set the camera properties that are to be updated.


    this._updateCamera();

    if (this.camera.getScene().useRightHandedSystem) {
      // TODO: Does this need done for worldUpdate too?
      this._moveRelative.z *= -1;
    } // Convert updates relative to camera to world position update.


    var cameraTransformMatrix = Matrix.Zero();
    this.camera.getViewMatrix().invertToRef(cameraTransformMatrix);
    var transformedDirection = Vector3.Zero();
    Vector3.TransformNormalToRef(this._moveRelative, cameraTransformMatrix, transformedDirection); // Apply updates to camera position.

    this.camera.cameraRotation.x += this._rotateRelative.x / 200;
    this.camera.cameraRotation.y += this._rotateRelative.y / 200;
    this.camera.cameraDirection.addInPlace(transformedDirection);
    this.camera.cameraDirection.addInPlace(this._moveScene); // Call the base class implementation to handle observers and do cleanup.

    _super.prototype.checkInputs.call(this);
  };
  /**
   * Update the camera according to any configured properties for the 3
   * mouse-wheel axis.
   */


  FreeCameraMouseWheelInput.prototype._updateCamera = function () {
    var moveRelative = this._moveRelative;
    var rotateRelative = this._rotateRelative;
    var moveScene = this._moveScene;

    var updateCameraProperty = function (
    /* Mouse-wheel delta. */
    value,
    /* Camera property to be changed. */
    cameraProperty,
    /* Axis of Camera property to be changed. */
    coordinate) {
      if (value === 0) {
        // Mouse wheel has not moved.
        return;
      }

      if (cameraProperty === null || coordinate === null) {
        // Mouse wheel axis not configured.
        return;
      }

      var action = null;

      switch (cameraProperty) {
        case _CameraProperty.MoveRelative:
          action = moveRelative;
          break;

        case _CameraProperty.RotateRelative:
          action = rotateRelative;
          break;

        case _CameraProperty.MoveScene:
          action = moveScene;
          break;
      }

      switch (coordinate) {
        case Coordinate.X:
          action.set(value, 0, 0);
          break;

        case Coordinate.Y:
          action.set(0, value, 0);
          break;

        case Coordinate.Z:
          action.set(0, 0, value);
          break;
      }
    }; // Do the camera updates for each of the 3 touch-wheel axis.


    updateCameraProperty(this._wheelDeltaX, this._wheelXAction, this._wheelXActionCoordinate);
    updateCameraProperty(this._wheelDeltaY, this._wheelYAction, this._wheelYActionCoordinate);
    updateCameraProperty(this._wheelDeltaZ, this._wheelZAction, this._wheelZActionCoordinate);
  };

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelXMoveRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelYMoveRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelZMoveRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelXRotateRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelYRotateRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelZRotateRelative", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelXMoveScene", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelYMoveScene", null);

  __decorate([serialize()], FreeCameraMouseWheelInput.prototype, "wheelZMoveScene", null);

  return FreeCameraMouseWheelInput;
}(BaseCameraMouseWheelInput);
CameraInputTypes["FreeCameraMouseWheelInput"] = FreeCameraMouseWheelInput;

/**
 * Manage the touch inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */

var FreeCameraTouchInput = function () {
  /**
   * Manage the touch inputs to control the movement of a free camera.
   * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
   * @param allowMouse Defines if mouse events can be treated as touch events
   */
  function FreeCameraTouchInput(
  /**
   * Define if mouse events can be treated as touch events
   */
  allowMouse) {
    if (allowMouse === void 0) {
      allowMouse = false;
    }

    this.allowMouse = allowMouse;
    /**
     * Defines the touch sensibility for rotation.
     * The higher the faster.
     */

    this.touchAngularSensibility = 200000.0;
    /**
     * Defines the touch sensibility for move.
     * The higher the faster.
     */

    this.touchMoveSensibility = 250.0;
    this._offsetX = null;
    this._offsetY = null;
    this._pointerPressed = new Array();
  }
  /**
   * Attach the input controls to a specific dom element to get the input from.
   * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */


  FreeCameraTouchInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;

    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
    var previousPosition = null;

    if (this._pointerInput === undefined) {
      this._onLostFocus = function () {
        _this._offsetX = null;
        _this._offsetY = null;
      };

      this._pointerInput = function (p) {
        var evt = p.event;
        var isMouseEvent = !_this.camera.getEngine().hostInformation.isMobile && evt instanceof MouseEvent;

        if (!_this.allowMouse && (evt.pointerType === "mouse" || isMouseEvent)) {
          return;
        }

        if (p.type === PointerEventTypes.POINTERDOWN) {
          if (!noPreventDefault) {
            evt.preventDefault();
          }

          _this._pointerPressed.push(evt.pointerId);

          if (_this._pointerPressed.length !== 1) {
            return;
          }

          previousPosition = {
            x: evt.clientX,
            y: evt.clientY
          };
        } else if (p.type === PointerEventTypes.POINTERUP) {
          if (!noPreventDefault) {
            evt.preventDefault();
          }

          var index = _this._pointerPressed.indexOf(evt.pointerId);

          if (index === -1) {
            return;
          }

          _this._pointerPressed.splice(index, 1);

          if (index != 0) {
            return;
          }

          previousPosition = null;
          _this._offsetX = null;
          _this._offsetY = null;
        } else if (p.type === PointerEventTypes.POINTERMOVE) {
          if (!noPreventDefault) {
            evt.preventDefault();
          }

          if (!previousPosition) {
            return;
          }

          var index = _this._pointerPressed.indexOf(evt.pointerId);

          if (index != 0) {
            return;
          }

          _this._offsetX = evt.clientX - previousPosition.x;
          _this._offsetY = -(evt.clientY - previousPosition.y);
        }
      };
    }

    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);

    if (this._onLostFocus) {
      var engine = this.camera.getEngine();
      var element = engine.getInputElement();
      element && element.addEventListener("blur", this._onLostFocus);
    }
  };
  /**
   * Detach the current controls from the specified dom element.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   */


  FreeCameraTouchInput.prototype.detachControl = function (ignored) {
    if (this._pointerInput) {
      if (this._observer) {
        this.camera.getScene().onPointerObservable.remove(this._observer);
        this._observer = null;
      }

      if (this._onLostFocus) {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        element && element.removeEventListener("blur", this._onLostFocus);
        this._onLostFocus = null;
      }

      this._pointerPressed = [];
      this._offsetX = null;
      this._offsetY = null;
    }
  };
  /**
   * Update the current camera state depending on the inputs that have been used this frame.
   * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
   */


  FreeCameraTouchInput.prototype.checkInputs = function () {
    if (this._offsetX === null || this._offsetY === null) {
      return;
    }

    if (this._offsetX === 0 && this._offsetY === 0) {
      return;
    }

    var camera = this.camera;
    camera.cameraRotation.y = this._offsetX / this.touchAngularSensibility;

    if (this._pointerPressed.length > 1) {
      camera.cameraRotation.x = -this._offsetY / this.touchAngularSensibility;
    } else {
      var speed = camera._computeLocalCameraSpeed();

      var direction = new Vector3(0, 0, speed * this._offsetY / this.touchMoveSensibility);
      Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, camera._cameraRotationMatrix);
      camera.cameraDirection.addInPlace(Vector3.TransformCoordinates(direction, camera._cameraRotationMatrix));
    }
  };
  /**
   * Gets the class name of the current intput.
   * @returns the class name
   */


  FreeCameraTouchInput.prototype.getClassName = function () {
    return "FreeCameraTouchInput";
  };
  /**
   * Get the friendly name associated with the input class.
   * @returns the input friendly name
   */


  FreeCameraTouchInput.prototype.getSimpleName = function () {
    return "touch";
  };

  __decorate([serialize()], FreeCameraTouchInput.prototype, "touchAngularSensibility", void 0);

  __decorate([serialize()], FreeCameraTouchInput.prototype, "touchMoveSensibility", void 0);

  return FreeCameraTouchInput;
}();
CameraInputTypes["FreeCameraTouchInput"] = FreeCameraTouchInput;

/**
 * Default Inputs manager for the FreeCamera.
 * It groups all the default supported inputs for ease of use.
 * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
 */

var FreeCameraInputsManager = function (_super) {
  __extends(FreeCameraInputsManager, _super);
  /**
   * Instantiates a new FreeCameraInputsManager.
   * @param camera Defines the camera the inputs belong to
   */


  function FreeCameraInputsManager(camera) {
    var _this = _super.call(this, camera) || this;
    /**
     * @hidden
     */


    _this._mouseInput = null;
    /**
     * @hidden
     */

    _this._mouseWheelInput = null;
    return _this;
  }
  /**
   * Add keyboard input support to the input manager.
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.addKeyboard = function () {
    this.add(new FreeCameraKeyboardMoveInput());
    return this;
  };
  /**
   * Add mouse input support to the input manager.
   * @param touchEnabled if the FreeCameraMouseInput should support touch (default: true)
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.addMouse = function (touchEnabled) {
    if (touchEnabled === void 0) {
      touchEnabled = true;
    }

    if (!this._mouseInput) {
      this._mouseInput = new FreeCameraMouseInput(touchEnabled);
      this.add(this._mouseInput);
    }

    return this;
  };
  /**
   * Removes the mouse input support from the manager
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.removeMouse = function () {
    if (this._mouseInput) {
      this.remove(this._mouseInput);
    }

    return this;
  };
  /**
   * Add mouse wheel input support to the input manager.
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.addMouseWheel = function () {
    if (!this._mouseWheelInput) {
      this._mouseWheelInput = new FreeCameraMouseWheelInput();
      this.add(this._mouseWheelInput);
    }

    return this;
  };
  /**
   * Removes the mouse wheel input support from the manager
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.removeMouseWheel = function () {
    if (this._mouseWheelInput) {
      this.remove(this._mouseWheelInput);
    }

    return this;
  };
  /**
   * Add touch input support to the input manager.
   * @returns the current input manager
   */


  FreeCameraInputsManager.prototype.addTouch = function () {
    this.add(new FreeCameraTouchInput());
    return this;
  };
  /**
   * Remove all attached input methods from a camera
   */


  FreeCameraInputsManager.prototype.clear = function () {
    _super.prototype.clear.call(this);

    this._mouseInput = null;
  };

  return FreeCameraInputsManager;
}(CameraInputsManager);

/**
 * A target camera takes a mesh or position as a target and continues to look at it while it moves.
 * This is the base of the follow, arc rotate cameras and Free camera
 * @see https://doc.babylonjs.com/features/cameras
 */

var TargetCamera = function (_super) {
  __extends(TargetCamera, _super);
  /**
   * Instantiates a target camera that takes a mesh or position as a target and continues to look at it while it moves.
   * This is the base of the follow, arc rotate cameras and Free camera
   * @see https://doc.babylonjs.com/features/cameras
   * @param name Defines the name of the camera in the scene
   * @param position Defines the start position of the camera in the scene
   * @param scene Defines the scene the camera belongs to
   * @param setActiveOnSceneIfNoneActive Defines wheter the camera should be marked as active if not other active cameras have been defined
   */


  function TargetCamera(name, position, scene, setActiveOnSceneIfNoneActive) {
    if (setActiveOnSceneIfNoneActive === void 0) {
      setActiveOnSceneIfNoneActive = true;
    }

    var _this = _super.call(this, name, position, scene, setActiveOnSceneIfNoneActive) || this;

    _this._tmpUpVector = Vector3.Zero();
    _this._tmpTargetVector = Vector3.Zero();
    /**
     * Define the current direction the camera is moving to
     */

    _this.cameraDirection = new Vector3(0, 0, 0);
    /**
     * Define the current rotation the camera is rotating to
     */

    _this.cameraRotation = new Vector2(0, 0);
    /** Gets or sets a boolean indicating that the scaling of the parent hierarchy will not be taken in account by the camera */

    _this.ignoreParentScaling = false;
    /**
     * When set, the up vector of the camera will be updated by the rotation of the camera
     */

    _this.updateUpVectorFromRotation = false;
    _this._tmpQuaternion = new Quaternion();
    /**
     * Define the current rotation of the camera
     */

    _this.rotation = new Vector3(0, 0, 0);
    /**
     * Define the current speed of the camera
     */

    _this.speed = 2.0;
    /**
     * Add constraint to the camera to prevent it to move freely in all directions and
     * around all axis.
     */

    _this.noRotationConstraint = false;
    /**
     * Reverses mouselook direction to 'natural' panning as opposed to traditional direct
     * panning
     */

    _this.invertRotation = false;
    /**
     * Speed multiplier for inverse camera panning
     */

    _this.inverseRotationSpeed = 0.2;
    /**
     * Define the current target of the camera as an object or a position.
     */

    _this.lockedTarget = null;
    /** @hidden */

    _this._currentTarget = Vector3.Zero();
    /** @hidden */

    _this._initialFocalDistance = 1;
    /** @hidden */

    _this._viewMatrix = Matrix.Zero();
    /** @hidden */

    _this._camMatrix = Matrix.Zero();
    /** @hidden */

    _this._cameraTransformMatrix = Matrix.Zero();
    /** @hidden */

    _this._cameraRotationMatrix = Matrix.Zero();
    /** @hidden */

    _this._referencePoint = new Vector3(0, 0, 1);
    /** @hidden */

    _this._transformedReferencePoint = Vector3.Zero();
    _this._defaultUp = Vector3.Up();
    _this._cachedRotationZ = 0;
    _this._cachedQuaternionRotationZ = 0;
    return _this;
  }
  /**
   * Gets the position in front of the camera at a given distance.
   * @param distance The distance from the camera we want the position to be
   * @returns the position
   */


  TargetCamera.prototype.getFrontPosition = function (distance) {
    this.getWorldMatrix();
    var direction = this.getTarget().subtract(this.position);
    direction.normalize();
    direction.scaleInPlace(distance);
    return this.globalPosition.add(direction);
  };
  /** @hidden */


  TargetCamera.prototype._getLockedTargetPosition = function () {
    if (!this.lockedTarget) {
      return null;
    }

    if (this.lockedTarget.absolutePosition) {
      this.lockedTarget.computeWorldMatrix();
    }

    return this.lockedTarget.absolutePosition || this.lockedTarget;
  };
  /**
   * Store current camera state of the camera (fov, position, rotation, etc..)
   * @returns the camera
   */


  TargetCamera.prototype.storeState = function () {
    this._storedPosition = this.position.clone();
    this._storedRotation = this.rotation.clone();

    if (this.rotationQuaternion) {
      this._storedRotationQuaternion = this.rotationQuaternion.clone();
    }

    return _super.prototype.storeState.call(this);
  };
  /**
   * Restored camera state. You must call storeState() first
   * @returns whether it was successful or not
   * @hidden
   */


  TargetCamera.prototype._restoreStateValues = function () {
    if (!_super.prototype._restoreStateValues.call(this)) {
      return false;
    }

    this.position = this._storedPosition.clone();
    this.rotation = this._storedRotation.clone();

    if (this.rotationQuaternion) {
      this.rotationQuaternion = this._storedRotationQuaternion.clone();
    }

    this.cameraDirection.copyFromFloats(0, 0, 0);
    this.cameraRotation.copyFromFloats(0, 0);
    return true;
  };
  /** @hidden */


  TargetCamera.prototype._initCache = function () {
    _super.prototype._initCache.call(this);

    this._cache.lockedTarget = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    this._cache.rotation = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    this._cache.rotationQuaternion = new Quaternion(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  };
  /** @hidden */


  TargetCamera.prototype._updateCache = function (ignoreParentClass) {
    if (!ignoreParentClass) {
      _super.prototype._updateCache.call(this);
    }

    var lockedTargetPosition = this._getLockedTargetPosition();

    if (!lockedTargetPosition) {
      this._cache.lockedTarget = null;
    } else {
      if (!this._cache.lockedTarget) {
        this._cache.lockedTarget = lockedTargetPosition.clone();
      } else {
        this._cache.lockedTarget.copyFrom(lockedTargetPosition);
      }
    }

    this._cache.rotation.copyFrom(this.rotation);

    if (this.rotationQuaternion) {
      this._cache.rotationQuaternion.copyFrom(this.rotationQuaternion);
    }
  }; // Synchronized

  /** @hidden */


  TargetCamera.prototype._isSynchronizedViewMatrix = function () {
    if (!_super.prototype._isSynchronizedViewMatrix.call(this)) {
      return false;
    }

    var lockedTargetPosition = this._getLockedTargetPosition();

    return (this._cache.lockedTarget ? this._cache.lockedTarget.equals(lockedTargetPosition) : !lockedTargetPosition) && (this.rotationQuaternion ? this.rotationQuaternion.equals(this._cache.rotationQuaternion) : this._cache.rotation.equals(this.rotation));
  }; // Methods

  /** @hidden */


  TargetCamera.prototype._computeLocalCameraSpeed = function () {
    var engine = this.getEngine();
    return this.speed * Math.sqrt(engine.getDeltaTime() / (engine.getFps() * 100.0));
  }; // Target

  /**
   * Defines the target the camera should look at.
   * @param target Defines the new target as a Vector or a mesh
   */


  TargetCamera.prototype.setTarget = function (target) {
    this.upVector.normalize();
    this._initialFocalDistance = target.subtract(this.position).length();

    if (this.position.z === target.z) {
      this.position.z += Epsilon;
    }

    this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance);

    Matrix.LookAtLHToRef(this.position, target, this._defaultUp, this._camMatrix);

    this._camMatrix.invert();

    this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
    var vDir = target.subtract(this.position);

    if (vDir.x >= 0.0) {
      this.rotation.y = -Math.atan(vDir.z / vDir.x) + Math.PI / 2.0;
    } else {
      this.rotation.y = -Math.atan(vDir.z / vDir.x) - Math.PI / 2.0;
    }

    this.rotation.z = 0;

    if (isNaN(this.rotation.x)) {
      this.rotation.x = 0;
    }

    if (isNaN(this.rotation.y)) {
      this.rotation.y = 0;
    }

    if (isNaN(this.rotation.z)) {
      this.rotation.z = 0;
    }

    if (this.rotationQuaternion) {
      Quaternion.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
    }
  };

  Object.defineProperty(TargetCamera.prototype, "target", {
    /**
     * Defines the target point of the camera.
     * The camera looks towards it form the radius distance.
     */
    get: function () {
      return this.getTarget();
    },
    set: function (value) {
      this.setTarget(value);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Return the current target position of the camera. This value is expressed in local space.
   * @returns the target position
   */

  TargetCamera.prototype.getTarget = function () {
    return this._currentTarget;
  };
  /** @hidden */


  TargetCamera.prototype._decideIfNeedsToMove = function () {
    return Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
  };
  /** @hidden */


  TargetCamera.prototype._updatePosition = function () {
    if (this.parent) {
      this.parent.getWorldMatrix().invertToRef(TmpVectors.Matrix[0]);
      Vector3.TransformNormalToRef(this.cameraDirection, TmpVectors.Matrix[0], TmpVectors.Vector3[0]);
      this.position.addInPlace(TmpVectors.Vector3[0]);
      return;
    }

    this.position.addInPlace(this.cameraDirection);
  };
  /** @hidden */


  TargetCamera.prototype._checkInputs = function () {
    var directionMultiplier = this.invertRotation ? -this.inverseRotationSpeed : 1.0;

    var needToMove = this._decideIfNeedsToMove();

    var needToRotate = Math.abs(this.cameraRotation.x) > 0 || Math.abs(this.cameraRotation.y) > 0; // Move

    if (needToMove) {
      this._updatePosition();
    } // Rotate


    if (needToRotate) {
      //rotate, if quaternion is set and rotation was used
      if (this.rotationQuaternion) {
        this.rotationQuaternion.toEulerAnglesToRef(this.rotation);
      }

      this.rotation.x += this.cameraRotation.x * directionMultiplier;
      this.rotation.y += this.cameraRotation.y * directionMultiplier; // Apply constraints

      if (!this.noRotationConstraint) {
        var limit = 1.570796;

        if (this.rotation.x > limit) {
          this.rotation.x = limit;
        }

        if (this.rotation.x < -limit) {
          this.rotation.x = -limit;
        }
      } //rotate, if quaternion is set and rotation was used


      if (this.rotationQuaternion) {
        var len = this.rotation.lengthSquared();

        if (len) {
          Quaternion.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
        }
      }
    } // Inertia


    if (needToMove) {
      if (Math.abs(this.cameraDirection.x) < this.speed * Epsilon) {
        this.cameraDirection.x = 0;
      }

      if (Math.abs(this.cameraDirection.y) < this.speed * Epsilon) {
        this.cameraDirection.y = 0;
      }

      if (Math.abs(this.cameraDirection.z) < this.speed * Epsilon) {
        this.cameraDirection.z = 0;
      }

      this.cameraDirection.scaleInPlace(this.inertia);
    }

    if (needToRotate) {
      if (Math.abs(this.cameraRotation.x) < this.speed * Epsilon) {
        this.cameraRotation.x = 0;
      }

      if (Math.abs(this.cameraRotation.y) < this.speed * Epsilon) {
        this.cameraRotation.y = 0;
      }

      this.cameraRotation.scaleInPlace(this.inertia);
    }

    _super.prototype._checkInputs.call(this);
  };

  TargetCamera.prototype._updateCameraRotationMatrix = function () {
    if (this.rotationQuaternion) {
      this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix);
    } else {
      Matrix.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
    }
  };
  /**
   * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
   * @returns the current camera
   */


  TargetCamera.prototype._rotateUpVectorWithCameraRotationMatrix = function () {
    Vector3.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector);
    return this;
  };
  /** @hidden */


  TargetCamera.prototype._getViewMatrix = function () {
    if (this.lockedTarget) {
      this.setTarget(this._getLockedTargetPosition());
    } // Compute


    this._updateCameraRotationMatrix(); // Apply the changed rotation to the upVector


    if (this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z) {
      this._rotateUpVectorWithCameraRotationMatrix();

      this._cachedQuaternionRotationZ = this.rotationQuaternion.z;
    } else if (this._cachedRotationZ != this.rotation.z) {
      this._rotateUpVectorWithCameraRotationMatrix();

      this._cachedRotationZ = this.rotation.z;
    }

    Vector3.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint); // Computing target and final matrix

    this.position.addToRef(this._transformedReferencePoint, this._currentTarget);

    if (this.updateUpVectorFromRotation) {
      if (this.rotationQuaternion) {
        Axis.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector);
      } else {
        Quaternion.FromEulerVectorToRef(this.rotation, this._tmpQuaternion);
        Axis.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector);
      }
    }

    this._computeViewMatrix(this.position, this._currentTarget, this.upVector);

    return this._viewMatrix;
  };

  TargetCamera.prototype._computeViewMatrix = function (position, target, up) {
    if (this.ignoreParentScaling) {
      if (this.parent) {
        var parentWorldMatrix = this.parent.getWorldMatrix();
        Vector3.TransformCoordinatesToRef(position, parentWorldMatrix, this._globalPosition);
        Vector3.TransformCoordinatesToRef(target, parentWorldMatrix, this._tmpTargetVector);
        Vector3.TransformNormalToRef(up, parentWorldMatrix, this._tmpUpVector);

        this._markSyncedWithParent();
      } else {
        this._globalPosition.copyFrom(position);

        this._tmpTargetVector.copyFrom(target);

        this._tmpUpVector.copyFrom(up);
      }

      if (this.getScene().useRightHandedSystem) {
        Matrix.LookAtRHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
      } else {
        Matrix.LookAtLHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
      }

      return;
    }

    if (this.getScene().useRightHandedSystem) {
      Matrix.LookAtRHToRef(position, target, up, this._viewMatrix);
    } else {
      Matrix.LookAtLHToRef(position, target, up, this._viewMatrix);
    }

    if (this.parent) {
      var parentWorldMatrix = this.parent.getWorldMatrix();

      this._viewMatrix.invert();

      this._viewMatrix.multiplyToRef(parentWorldMatrix, this._viewMatrix);

      this._viewMatrix.getTranslationToRef(this._globalPosition);

      this._viewMatrix.invert();

      this._markSyncedWithParent();
    } else {
      this._globalPosition.copyFrom(position);
    }
  };
  /**
   * @hidden
   */


  TargetCamera.prototype.createRigCamera = function (name, cameraIndex) {
    if (this.cameraRigMode !== Camera.RIG_MODE_NONE) {
      var rigCamera = new TargetCamera(name, this.position.clone(), this.getScene());
      rigCamera.isRigCamera = true;
      rigCamera.rigParent = this;

      if (this.cameraRigMode === Camera.RIG_MODE_VR || this.cameraRigMode === Camera.RIG_MODE_WEBVR) {
        if (!this.rotationQuaternion) {
          this.rotationQuaternion = new Quaternion();
        }

        rigCamera._cameraRigParams = {};
        rigCamera.rotationQuaternion = new Quaternion();
      }

      return rigCamera;
    }

    return null;
  };
  /**
   * @hidden
   */


  TargetCamera.prototype._updateRigCameras = function () {
    var camLeft = this._rigCameras[0];
    var camRight = this._rigCameras[1];
    this.computeWorldMatrix();

    switch (this.cameraRigMode) {
      case Camera.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
      case Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
      case Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
      case Camera.RIG_MODE_STEREOSCOPIC_OVERUNDER:
      case Camera.RIG_MODE_STEREOSCOPIC_INTERLACED:
        //provisionnaly using _cameraRigParams.stereoHalfAngle instead of calculations based on _cameraRigParams.interaxialDistance:
        var leftSign = this.cameraRigMode === Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1;
        var rightSign = this.cameraRigMode === Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;

        this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * leftSign, camLeft);

        this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * rightSign, camRight);

        break;

      case Camera.RIG_MODE_VR:
        if (camLeft.rotationQuaternion) {
          camLeft.rotationQuaternion.copyFrom(this.rotationQuaternion);
          camRight.rotationQuaternion.copyFrom(this.rotationQuaternion);
        } else {
          camLeft.rotation.copyFrom(this.rotation);
          camRight.rotation.copyFrom(this.rotation);
        }

        camLeft.position.copyFrom(this.position);
        camRight.position.copyFrom(this.position);
        break;
    }

    _super.prototype._updateRigCameras.call(this);
  };

  TargetCamera.prototype._getRigCamPositionAndTarget = function (halfSpace, rigCamera) {
    var target = this.getTarget();
    target.subtractToRef(this.position, TargetCamera._TargetFocalPoint);

    TargetCamera._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);

    var newFocalTarget = TargetCamera._TargetFocalPoint.addInPlace(this.position);

    Matrix.TranslationToRef(-newFocalTarget.x, -newFocalTarget.y, -newFocalTarget.z, TargetCamera._TargetTransformMatrix);

    TargetCamera._TargetTransformMatrix.multiplyToRef(Matrix.RotationAxis(rigCamera.upVector, halfSpace), TargetCamera._RigCamTransformMatrix);

    Matrix.TranslationToRef(newFocalTarget.x, newFocalTarget.y, newFocalTarget.z, TargetCamera._TargetTransformMatrix);

    TargetCamera._RigCamTransformMatrix.multiplyToRef(TargetCamera._TargetTransformMatrix, TargetCamera._RigCamTransformMatrix);

    Vector3.TransformCoordinatesToRef(this.position, TargetCamera._RigCamTransformMatrix, rigCamera.position);
    rigCamera.setTarget(newFocalTarget);
  };
  /**
   * Gets the current object class name.
   * @return the class name
   */


  TargetCamera.prototype.getClassName = function () {
    return "TargetCamera";
  };

  TargetCamera._RigCamTransformMatrix = new Matrix();
  TargetCamera._TargetTransformMatrix = new Matrix();
  TargetCamera._TargetFocalPoint = new Vector3();

  __decorate([serializeAsVector3()], TargetCamera.prototype, "rotation", void 0);

  __decorate([serialize()], TargetCamera.prototype, "speed", void 0);

  __decorate([serializeAsMeshReference("lockedTargetId")], TargetCamera.prototype, "lockedTarget", void 0);

  return TargetCamera;
}(Camera);

/**
 * This represents a free type of camera. It can be useful in First Person Shooter game for instance.
 * Please consider using the new UniversalCamera instead as it adds more functionality like the gamepad.
 * @see https://doc.babylonjs.com/features/cameras#universal-camera
 */

var FreeCamera = function (_super) {
  __extends(FreeCamera, _super);
  /**
   * Instantiates a Free Camera.
   * This represents a free type of camera. It can be useful in First Person Shooter game for instance.
   * Please consider using the new UniversalCamera instead as it adds more functionality like touch to this camera.
   * @see https://doc.babylonjs.com/features/cameras#universal-camera
   * @param name Define the name of the camera in the scene
   * @param position Define the start position of the camera in the scene
   * @param scene Define the scene the camera belongs to
   * @param setActiveOnSceneIfNoneActive Defines wheter the camera should be marked as active if not other active cameras have been defined
   */


  function FreeCamera(name, position, scene, setActiveOnSceneIfNoneActive) {
    if (setActiveOnSceneIfNoneActive === void 0) {
      setActiveOnSceneIfNoneActive = true;
    }

    var _this = _super.call(this, name, position, scene, setActiveOnSceneIfNoneActive) || this;
    /**
     * Define the collision ellipsoid of the camera.
     * This is helpful to simulate a camera body like the player body around the camera
     * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity#arcrotatecamera
     */


    _this.ellipsoid = new Vector3(0.5, 1, 0.5);
    /**
     * Define an offset for the position of the ellipsoid around the camera.
     * This can be helpful to determine the center of the body near the gravity center of the body
     * instead of its head.
     */

    _this.ellipsoidOffset = new Vector3(0, 0, 0);
    /**
     * Enable or disable collisions of the camera with the rest of the scene objects.
     */

    _this.checkCollisions = false;
    /**
     * Enable or disable gravity on the camera.
     */

    _this.applyGravity = false;
    _this._needMoveForGravity = false;
    _this._oldPosition = Vector3.Zero();
    _this._diffPosition = Vector3.Zero();
    _this._newPosition = Vector3.Zero(); // Collisions

    _this._collisionMask = -1;

    _this._onCollisionPositionChange = function (collisionId, newPosition, collidedMesh) {
      if (collidedMesh === void 0) {
        collidedMesh = null;
      }

      var updatePosition = function (newPos) {
        _this._newPosition.copyFrom(newPos);

        _this._newPosition.subtractToRef(_this._oldPosition, _this._diffPosition);

        if (_this._diffPosition.length() > Engine.CollisionsEpsilon) {
          _this.position.addInPlace(_this._diffPosition);

          if (_this.onCollide && collidedMesh) {
            _this.onCollide(collidedMesh);
          }
        }
      };

      updatePosition(newPosition);
    };

    _this.inputs = new FreeCameraInputsManager(_this);

    _this.inputs.addKeyboard().addMouse();

    return _this;
  }

  Object.defineProperty(FreeCamera.prototype, "angularSensibility", {
    /**
     * Gets the input sensibility for a mouse input. (default is 2000.0)
     * Higher values reduce sensitivity.
     */
    get: function () {
      var mouse = this.inputs.attached["mouse"];

      if (mouse) {
        return mouse.angularSensibility;
      }

      return 0;
    },

    /**
     * Sets the input sensibility for a mouse input. (default is 2000.0)
     * Higher values reduce sensitivity.
     */
    set: function (value) {
      var mouse = this.inputs.attached["mouse"];

      if (mouse) {
        mouse.angularSensibility = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysUp", {
    /**
     * Gets or Set the list of keyboard keys used to control the forward move of the camera.
     */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysUp;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysUp = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysUpward", {
    /**
     * Gets or Set the list of keyboard keys used to control the upward move of the camera.
     */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysUpward;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysUpward = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysDown", {
    /**
     * Gets or Set the list of keyboard keys used to control the backward move of the camera.
     */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysDown;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysDown = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysDownward", {
    /**
    * Gets or Set the list of keyboard keys used to control the downward move of the camera.
    */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysDownward;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysDownward = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysLeft", {
    /**
     * Gets or Set the list of keyboard keys used to control the left strafe move of the camera.
     */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysLeft;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysLeft = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FreeCamera.prototype, "keysRight", {
    /**
     * Gets or Set the list of keyboard keys used to control the right strafe move of the camera.
     */
    get: function () {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        return keyboard.keysRight;
      }

      return [];
    },
    set: function (value) {
      var keyboard = this.inputs.attached["keyboard"];

      if (keyboard) {
        keyboard.keysRight = value;
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Attached controls to the current camera.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   */

  FreeCamera.prototype.attachControl = function (ignored, noPreventDefault) {
    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
    this.inputs.attachElement(noPreventDefault);
  };
  /**
   * Detach the current controls from the specified dom element.
   * @param ignored defines an ignored parameter kept for backward compatibility. If you want to define the source input element, you can set engine.inputElement before calling camera.attachControl
   */


  FreeCamera.prototype.detachControl = function (ignored) {
    this.inputs.detachElement();
    this.cameraDirection = new Vector3(0, 0, 0);
    this.cameraRotation = new Vector2(0, 0);
  };

  Object.defineProperty(FreeCamera.prototype, "collisionMask", {
    /**
     * Define a collision mask to limit the list of object the camera can collide with
     */
    get: function () {
      return this._collisionMask;
    },
    set: function (mask) {
      this._collisionMask = !isNaN(mask) ? mask : -1;
    },
    enumerable: false,
    configurable: true
  });
  /** @hidden */

  FreeCamera.prototype._collideWithWorld = function (displacement) {
    var globalPosition;

    if (this.parent) {
      globalPosition = Vector3.TransformCoordinates(this.position, this.parent.getWorldMatrix());
    } else {
      globalPosition = this.position;
    }

    globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPosition);

    this._oldPosition.addInPlace(this.ellipsoidOffset);

    var coordinator = this.getScene().collisionCoordinator;

    if (!this._collider) {
      this._collider = coordinator.createCollider();
    }

    this._collider._radius = this.ellipsoid;
    this._collider.collisionMask = this._collisionMask; //no need for clone, as long as gravity is not on.

    var actualDisplacement = displacement; //add gravity to the direction to prevent the dual-collision checking

    if (this.applyGravity) {
      //this prevents mending with cameraDirection, a global variable of the free camera class.
      actualDisplacement = displacement.add(this.getScene().gravity);
    }

    coordinator.getNewPosition(this._oldPosition, actualDisplacement, this._collider, 3, null, this._onCollisionPositionChange, this.uniqueId);
  };
  /** @hidden */


  FreeCamera.prototype._checkInputs = function () {
    if (!this._localDirection) {
      this._localDirection = Vector3.Zero();
      this._transformedDirection = Vector3.Zero();
    }

    this.inputs.checkInputs();

    _super.prototype._checkInputs.call(this);
  };
  /** @hidden */


  FreeCamera.prototype._decideIfNeedsToMove = function () {
    return this._needMoveForGravity || Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
  };
  /** @hidden */


  FreeCamera.prototype._updatePosition = function () {
    if (this.checkCollisions && this.getScene().collisionsEnabled) {
      this._collideWithWorld(this.cameraDirection);
    } else {
      _super.prototype._updatePosition.call(this);
    }
  };
  /**
   * Destroy the camera and release the current resources hold by it.
   */


  FreeCamera.prototype.dispose = function () {
    this.inputs.clear();

    _super.prototype.dispose.call(this);
  };
  /**
   * Gets the current object class name.
   * @return the class name
   */


  FreeCamera.prototype.getClassName = function () {
    return "FreeCamera";
  };

  __decorate([serializeAsVector3()], FreeCamera.prototype, "ellipsoid", void 0);

  __decorate([serializeAsVector3()], FreeCamera.prototype, "ellipsoidOffset", void 0);

  __decorate([serialize()], FreeCamera.prototype, "checkCollisions", void 0);

  __decorate([serialize()], FreeCamera.prototype, "applyGravity", void 0);

  return FreeCamera;
}(TargetCamera);

Node.AddNodeConstructor("Light_Type_3", function (name, scene) {
  return function () {
    return new HemisphericLight(name, Vector3.Zero(), scene);
  };
});
/**
 * The HemisphericLight simulates the ambient environment light,
 * so the passed direction is the light reflection direction, not the incoming direction.
 */

var HemisphericLight = function (_super) {
  __extends(HemisphericLight, _super);
  /**
   * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
   * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
   * The HemisphericLight can't cast shadows.
   * Documentation : https://doc.babylonjs.com/babylon101/lights
   * @param name The friendly name of the light
   * @param direction The direction of the light reflection
   * @param scene The scene the light belongs to
   */


  function HemisphericLight(name, direction, scene) {
    var _this = _super.call(this, name, scene) || this;
    /**
     * The groundColor is the light in the opposite direction to the one specified during creation.
     * You can think of the diffuse and specular light as coming from the centre of the object in the given direction and the groundColor light in the opposite direction.
     */


    _this.groundColor = new Color3(0.0, 0.0, 0.0);
    _this.direction = direction || Vector3.Up();
    return _this;
  }

  HemisphericLight.prototype._buildUniformLayout = function () {
    this._uniformBuffer.addUniform("vLightData", 4);

    this._uniformBuffer.addUniform("vLightDiffuse", 4);

    this._uniformBuffer.addUniform("vLightSpecular", 4);

    this._uniformBuffer.addUniform("vLightGround", 3);

    this._uniformBuffer.addUniform("shadowsInfo", 3);

    this._uniformBuffer.addUniform("depthValues", 2);

    this._uniformBuffer.create();
  };
  /**
   * Returns the string "HemisphericLight".
   * @return The class name
   */


  HemisphericLight.prototype.getClassName = function () {
    return "HemisphericLight";
  };
  /**
   * Sets the HemisphericLight direction towards the passed target (Vector3).
   * Returns the updated direction.
   * @param target The target the direction should point to
   * @return The computed direction
   */


  HemisphericLight.prototype.setDirectionToTarget = function (target) {
    this.direction = Vector3.Normalize(target.subtract(Vector3.Zero()));
    return this.direction;
  };
  /**
   * Returns the shadow generator associated to the light.
   * @returns Always null for hemispheric lights because it does not support shadows.
   */


  HemisphericLight.prototype.getShadowGenerator = function () {
    return null;
  };
  /**
   * Sets the passed Effect object with the HemisphericLight normalized direction and color and the passed name (string).
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The hemispheric light
   */


  HemisphericLight.prototype.transferToEffect = function (effect, lightIndex) {
    var normalizeDirection = Vector3.Normalize(this.direction);

    this._uniformBuffer.updateFloat4("vLightData", normalizeDirection.x, normalizeDirection.y, normalizeDirection.z, 0.0, lightIndex);

    this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), lightIndex);

    return this;
  };

  HemisphericLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
    var normalizeDirection = Vector3.Normalize(this.direction);
    effect.setFloat3(lightDataUniformName, normalizeDirection.x, normalizeDirection.y, normalizeDirection.z);
    return this;
  };
  /**
   * Computes the world matrix of the node
   * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
   * @param useWasUpdatedFlag defines a reserved property
   * @returns the world matrix
   */


  HemisphericLight.prototype.computeWorldMatrix = function () {
    if (!this._worldMatrix) {
      this._worldMatrix = Matrix.Identity();
    }

    return this._worldMatrix;
  };
  /**
   * Returns the integer 3.
   * @return The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */


  HemisphericLight.prototype.getTypeID = function () {
    return Light.LIGHTTYPEID_HEMISPHERICLIGHT;
  };
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */


  HemisphericLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
    defines["HEMILIGHT" + lightIndex] = true;
  };

  __decorate([serializeAsColor3()], HemisphericLight.prototype, "groundColor", void 0);

  __decorate([serializeAsVector3()], HemisphericLight.prototype, "direction", void 0);

  return HemisphericLight;
}(Light);

var onCreatedEffectParameters = {
  effect: null,
  subMesh: null
};
/**
 * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
 *
 * This returned material effects how the mesh will look based on the code in the shaders.
 *
 * @see https://doc.babylonjs.com/how_to/shader_material
 */

var ShaderMaterial = function (_super) {
  __extends(ShaderMaterial, _super);
  /**
   * Instantiate a new shader material.
   * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
   * This returned material effects how the mesh will look based on the code in the shaders.
   * @see https://doc.babylonjs.com/how_to/shader_material
   * @param name Define the name of the material in the scene
   * @param scene Define the scene the material belongs to
   * @param shaderPath Defines  the route to the shader code in one of three ways:
   *  * object: { vertex: "custom", fragment: "custom" }, used with Effect.ShadersStore["customVertexShader"] and Effect.ShadersStore["customFragmentShader"]
   *  * object: { vertexElement: "vertexShaderCode", fragmentElement: "fragmentShaderCode" }, used with shader code in script tags
   *  * object: { vertexSource: "vertex shader code string", fragmentSource: "fragment shader code string" } using with strings containing the shaders code
   *  * string: "./COMMON_NAME", used with external files COMMON_NAME.vertex.fx and COMMON_NAME.fragment.fx in index.html folder.
   * @param options Define the options used to create the shader
   */


  function ShaderMaterial(name, scene, shaderPath, options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this, name, scene) || this;

    _this._textures = {};
    _this._textureArrays = {};
    _this._floats = {};
    _this._ints = {};
    _this._floatsArrays = {};
    _this._colors3 = {};
    _this._colors3Arrays = {};
    _this._colors4 = {};
    _this._colors4Arrays = {};
    _this._vectors2 = {};
    _this._vectors3 = {};
    _this._vectors4 = {};
    _this._matrices = {};
    _this._matrixArrays = {};
    _this._matrices3x3 = {};
    _this._matrices2x2 = {};
    _this._vectors2Arrays = {};
    _this._vectors3Arrays = {};
    _this._vectors4Arrays = {};
    _this._cachedWorldViewMatrix = new Matrix();
    _this._cachedWorldViewProjectionMatrix = new Matrix();
    _this._multiview = false;
    _this._shaderPath = shaderPath;
    _this._options = __assign({
      needAlphaBlending: false,
      needAlphaTesting: false,
      attributes: ["position", "normal", "uv"],
      uniforms: ["worldViewProjection"],
      uniformBuffers: [],
      samplers: [],
      defines: []
    }, options);
    return _this;
  }

  Object.defineProperty(ShaderMaterial.prototype, "shaderPath", {
    /**
     * Gets the shader path used to define the shader code
     * It can be modified to trigger a new compilation
     */
    get: function () {
      return this._shaderPath;
    },

    /**
     * Sets the shader path used to define the shader code
     * It can be modified to trigger a new compilation
     */
    set: function (shaderPath) {
      this._shaderPath = shaderPath;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ShaderMaterial.prototype, "options", {
    /**
     * Gets the options used to compile the shader.
     * They can be modified to trigger a new compilation
     */
    get: function () {
      return this._options;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the current class name of the material e.g. "ShaderMaterial"
   * Mainly use in serialization.
   * @returns the class name
   */

  ShaderMaterial.prototype.getClassName = function () {
    return "ShaderMaterial";
  };
  /**
   * Specifies if the material will require alpha blending
   * @returns a boolean specifying if alpha blending is needed
   */


  ShaderMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0 || this._options.needAlphaBlending;
  };
  /**
   * Specifies if this material should be rendered in alpha test mode
   * @returns a boolean specifying if an alpha test is needed.
   */


  ShaderMaterial.prototype.needAlphaTesting = function () {
    return this._options.needAlphaTesting;
  };

  ShaderMaterial.prototype._checkUniform = function (uniformName) {
    if (this._options.uniforms.indexOf(uniformName) === -1) {
      this._options.uniforms.push(uniformName);
    }
  };
  /**
   * Set a texture in the shader.
   * @param name Define the name of the uniform samplers as defined in the shader
   * @param texture Define the texture to bind to this sampler
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setTexture = function (name, texture) {
    if (this._options.samplers.indexOf(name) === -1) {
      this._options.samplers.push(name);
    }

    this._textures[name] = texture;
    return this;
  };
  /**
   * Set a texture array in the shader.
   * @param name Define the name of the uniform sampler array as defined in the shader
   * @param textures Define the list of textures to bind to this sampler
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setTextureArray = function (name, textures) {
    if (this._options.samplers.indexOf(name) === -1) {
      this._options.samplers.push(name);
    }

    this._checkUniform(name);

    this._textureArrays[name] = textures;
    return this;
  };
  /**
   * Set a float in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setFloat = function (name, value) {
    this._checkUniform(name);

    this._floats[name] = value;
    return this;
  };
  /**
   * Set a int in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setInt = function (name, value) {
    this._checkUniform(name);

    this._ints[name] = value;
    return this;
  };
  /**
   * Set an array of floats in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setFloats = function (name, value) {
    this._checkUniform(name);

    this._floatsArrays[name] = value;
    return this;
  };
  /**
   * Set a vec3 in the shader from a Color3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setColor3 = function (name, value) {
    this._checkUniform(name);

    this._colors3[name] = value;
    return this;
  };
  /**
   * Set a vec3 array in the shader from a Color3 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setColor3Array = function (name, value) {
    this._checkUniform(name);

    this._colors3Arrays[name] = value.reduce(function (arr, color) {
      color.toArray(arr, arr.length);
      return arr;
    }, []);
    return this;
  };
  /**
   * Set a vec4 in the shader from a Color4.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setColor4 = function (name, value) {
    this._checkUniform(name);

    this._colors4[name] = value;
    return this;
  };
  /**
   * Set a vec4 array in the shader from a Color4 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setColor4Array = function (name, value) {
    this._checkUniform(name);

    this._colors4Arrays[name] = value.reduce(function (arr, color) {
      color.toArray(arr, arr.length);
      return arr;
    }, []);
    return this;
  };
  /**
   * Set a vec2 in the shader from a Vector2.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setVector2 = function (name, value) {
    this._checkUniform(name);

    this._vectors2[name] = value;
    return this;
  };
  /**
   * Set a vec3 in the shader from a Vector3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setVector3 = function (name, value) {
    this._checkUniform(name);

    this._vectors3[name] = value;
    return this;
  };
  /**
   * Set a vec4 in the shader from a Vector4.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setVector4 = function (name, value) {
    this._checkUniform(name);

    this._vectors4[name] = value;
    return this;
  };
  /**
   * Set a mat4 in the shader from a Matrix.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setMatrix = function (name, value) {
    this._checkUniform(name);

    this._matrices[name] = value;
    return this;
  };
  /**
   * Set a float32Array in the shader from a matrix array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setMatrices = function (name, value) {
    this._checkUniform(name);

    var float32Array = new Float32Array(value.length * 16);

    for (var index = 0; index < value.length; index++) {
      var matrix = value[index];
      matrix.copyToArray(float32Array, index * 16);
    }

    this._matrixArrays[name] = float32Array;
    return this;
  };
  /**
   * Set a mat3 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setMatrix3x3 = function (name, value) {
    this._checkUniform(name);

    this._matrices3x3[name] = value;
    return this;
  };
  /**
   * Set a mat2 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setMatrix2x2 = function (name, value) {
    this._checkUniform(name);

    this._matrices2x2[name] = value;
    return this;
  };
  /**
   * Set a vec2 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setArray2 = function (name, value) {
    this._checkUniform(name);

    this._vectors2Arrays[name] = value;
    return this;
  };
  /**
   * Set a vec3 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setArray3 = function (name, value) {
    this._checkUniform(name);

    this._vectors3Arrays[name] = value;
    return this;
  };
  /**
   * Set a vec4 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @return the material itself allowing "fluent" like uniform updates
   */


  ShaderMaterial.prototype.setArray4 = function (name, value) {
    this._checkUniform(name);

    this._vectors4Arrays[name] = value;
    return this;
  };

  ShaderMaterial.prototype._checkCache = function (mesh, useInstances) {
    if (!mesh) {
      return true;
    }

    if (this._effect && this._effect.defines.indexOf("#define INSTANCES") !== -1 !== useInstances) {
      return false;
    }

    return true;
  };
  /**
   * Specifies that the submesh is ready to be used
   * @param mesh defines the mesh to check
   * @param subMesh defines which submesh to check
   * @param useInstances specifies that instances should be used
   * @returns a boolean indicating that the submesh is ready or not
   */


  ShaderMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    return this.isReady(mesh, useInstances);
  };
  /**
   * Checks if the material is ready to render the requested mesh
   * @param mesh Define the mesh to render
   * @param useInstances Define whether or not the material is used with instances
   * @returns true if ready, otherwise false
   */


  ShaderMaterial.prototype.isReady = function (mesh, useInstances) {
    var _a, _b;

    if (this._effect && this.isFrozen) {
      if (this._effect._wasPreviouslyReady) {
        return true;
      }
    }

    var scene = this.getScene();
    var engine = scene.getEngine();

    if (!this.checkReadyOnEveryCall) {
      if (this._renderId === scene.getRenderId()) {
        if (this._checkCache(mesh, useInstances)) {
          return true;
        }
      }
    } // Instances


    var defines = [];
    var attribs = [];
    var fallbacks = new EffectFallbacks(); // global multiview

    if (engine.getCaps().multiview && scene.activeCamera && scene.activeCamera.outputRenderTarget && scene.activeCamera.outputRenderTarget.getViewCount() > 1) {
      this._multiview = true;
      defines.push("#define MULTIVIEW");

      if (this._options.uniforms.indexOf("viewProjection") !== -1 && this._options.uniforms.push("viewProjectionR") === -1) {
        this._options.uniforms.push("viewProjectionR");
      }
    }

    for (var index = 0; index < this._options.defines.length; index++) {
      defines.push(this._options.defines[index]);
    }

    for (var index = 0; index < this._options.attributes.length; index++) {
      attribs.push(this._options.attributes[index]);
    }

    if (mesh && mesh.isVerticesDataPresent(VertexBuffer.ColorKind)) {
      attribs.push(VertexBuffer.ColorKind);
      defines.push("#define VERTEXCOLOR");
    }

    if (useInstances) {
      defines.push("#define INSTANCES");
      MaterialHelper.PushAttributesForInstances(attribs);

      if (mesh === null || mesh === void 0 ? void 0 : mesh.hasThinInstances) {
        defines.push("#define THIN_INSTANCES");
      }
    } // Bones


    var numInfluencers = 0;

    if (mesh && mesh.useBones && mesh.computeBonesUsingShaders && mesh.skeleton) {
      attribs.push(VertexBuffer.MatricesIndicesKind);
      attribs.push(VertexBuffer.MatricesWeightsKind);

      if (mesh.numBoneInfluencers > 4) {
        attribs.push(VertexBuffer.MatricesIndicesExtraKind);
        attribs.push(VertexBuffer.MatricesWeightsExtraKind);
      }

      var skeleton = mesh.skeleton;
      numInfluencers = mesh.numBoneInfluencers;
      defines.push("#define NUM_BONE_INFLUENCERS " + numInfluencers);
      fallbacks.addCPUSkinningFallback(0, mesh);

      if (skeleton.isUsingTextureForMatrices) {
        defines.push("#define BONETEXTURE");

        if (this._options.uniforms.indexOf("boneTextureWidth") === -1) {
          this._options.uniforms.push("boneTextureWidth");
        }

        if (this._options.samplers.indexOf("boneSampler") === -1) {
          this._options.samplers.push("boneSampler");
        }
      } else {
        defines.push("#define BonesPerMesh " + (skeleton.bones.length + 1));

        if (this._options.uniforms.indexOf("mBones") === -1) {
          this._options.uniforms.push("mBones");
        }
      }
    } else {
      defines.push("#define NUM_BONE_INFLUENCERS 0");
    } // Textures


    for (var name in this._textures) {
      if (!this._textures[name].isReady()) {
        return false;
      }
    } // Alpha test


    if (mesh && this._shouldTurnAlphaTestOn(mesh)) {
      defines.push("#define ALPHATEST");
    }

    var shaderName = this._shaderPath,
        uniforms = this._options.uniforms,
        uniformBuffers = this._options.uniformBuffers,
        samplers = this._options.samplers;

    if (this.customShaderNameResolve) {
      uniforms = uniforms.slice();
      uniformBuffers = uniformBuffers.slice();
      samplers = samplers.slice();
      shaderName = this.customShaderNameResolve(shaderName, uniforms, uniformBuffers, samplers, defines, attribs);
    }

    var previousEffect = this._effect;
    var join = defines.join("\n");

    if (this._cachedDefines !== join) {
      this._cachedDefines = join;
      this._effect = engine.createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousMorphTargets: numInfluencers
        }
      }, engine);

      if (this._onEffectCreatedObservable) {
        onCreatedEffectParameters.effect = this._effect;

        this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
      }
    }

    if ((_b = !((_a = this._effect) === null || _a === void 0 ? void 0 : _a.isReady())) !== null && _b !== void 0 ? _b : true) {
      return false;
    }

    if (previousEffect !== this._effect) {
      scene.resetCachedMaterial();
    }

    this._renderId = scene.getRenderId();
    this._effect._wasPreviouslyReady = true;
    return true;
  };
  /**
   * Binds the world matrix to the material
   * @param world defines the world transformation matrix
   * @param effectOverride - If provided, use this effect instead of internal effect
   */


  ShaderMaterial.prototype.bindOnlyWorldMatrix = function (world, effectOverride) {
    var scene = this.getScene();
    var effect = effectOverride !== null && effectOverride !== void 0 ? effectOverride : this._effect;

    if (!effect) {
      return;
    }

    if (this._options.uniforms.indexOf("world") !== -1) {
      effect.setMatrix("world", world);
    }

    if (this._options.uniforms.indexOf("worldView") !== -1) {
      world.multiplyToRef(scene.getViewMatrix(), this._cachedWorldViewMatrix);
      effect.setMatrix("worldView", this._cachedWorldViewMatrix);
    }

    if (this._options.uniforms.indexOf("worldViewProjection") !== -1) {
      world.multiplyToRef(scene.getTransformMatrix(), this._cachedWorldViewProjectionMatrix);
      effect.setMatrix("worldViewProjection", this._cachedWorldViewProjectionMatrix);
    }
  };
  /**
   * Binds the submesh to this material by preparing the effect and shader to draw
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh containing the submesh
   * @param subMesh defines the submesh to bind the material to
   */


  ShaderMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    this.bind(world, mesh, subMesh._effectOverride);
  };
  /**
   * Binds the material to the mesh
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh to bind the material to
   * @param effectOverride - If provided, use this effect instead of internal effect
   */


  ShaderMaterial.prototype.bind = function (world, mesh, effectOverride) {
    // Std values
    this.bindOnlyWorldMatrix(world, effectOverride);
    var effect = effectOverride !== null && effectOverride !== void 0 ? effectOverride : this._effect;

    if (effect && this.getScene().getCachedMaterial() !== this) {
      if (this._options.uniforms.indexOf("view") !== -1) {
        effect.setMatrix("view", this.getScene().getViewMatrix());
      }

      if (this._options.uniforms.indexOf("projection") !== -1) {
        effect.setMatrix("projection", this.getScene().getProjectionMatrix());
      }

      if (this._options.uniforms.indexOf("viewProjection") !== -1) {
        effect.setMatrix("viewProjection", this.getScene().getTransformMatrix());

        if (this._multiview) {
          effect.setMatrix("viewProjectionR", this.getScene()._transformMatrixR);
        }
      }

      if (this.getScene().activeCamera && this._options.uniforms.indexOf("cameraPosition") !== -1) {
        effect.setVector3("cameraPosition", this.getScene().activeCamera.globalPosition);
      } // Bones


      MaterialHelper.BindBonesParameters(mesh, effect);
      var name; // Texture

      for (name in this._textures) {
        effect.setTexture(name, this._textures[name]);
      } // Texture arrays


      for (name in this._textureArrays) {
        effect.setTextureArray(name, this._textureArrays[name]);
      } // Int


      for (name in this._ints) {
        effect.setInt(name, this._ints[name]);
      } // Float


      for (name in this._floats) {
        effect.setFloat(name, this._floats[name]);
      } // Floats


      for (name in this._floatsArrays) {
        effect.setArray(name, this._floatsArrays[name]);
      } // Color3


      for (name in this._colors3) {
        effect.setColor3(name, this._colors3[name]);
      } // Color3Array


      for (name in this._colors3Arrays) {
        effect.setArray3(name, this._colors3Arrays[name]);
      } // Color4


      for (name in this._colors4) {
        var color = this._colors4[name];
        effect.setFloat4(name, color.r, color.g, color.b, color.a);
      } // Color4Array


      for (name in this._colors4Arrays) {
        effect.setArray4(name, this._colors4Arrays[name]);
      } // Vector2


      for (name in this._vectors2) {
        effect.setVector2(name, this._vectors2[name]);
      } // Vector3


      for (name in this._vectors3) {
        effect.setVector3(name, this._vectors3[name]);
      } // Vector4


      for (name in this._vectors4) {
        effect.setVector4(name, this._vectors4[name]);
      } // Matrix


      for (name in this._matrices) {
        effect.setMatrix(name, this._matrices[name]);
      } // MatrixArray


      for (name in this._matrixArrays) {
        effect.setMatrices(name, this._matrixArrays[name]);
      } // Matrix 3x3


      for (name in this._matrices3x3) {
        effect.setMatrix3x3(name, this._matrices3x3[name]);
      } // Matrix 2x2


      for (name in this._matrices2x2) {
        effect.setMatrix2x2(name, this._matrices2x2[name]);
      } // Vector2Array


      for (name in this._vectors2Arrays) {
        effect.setArray2(name, this._vectors2Arrays[name]);
      } // Vector3Array


      for (name in this._vectors3Arrays) {
        effect.setArray3(name, this._vectors3Arrays[name]);
      } // Vector4Array


      for (name in this._vectors4Arrays) {
        effect.setArray4(name, this._vectors4Arrays[name]);
      }
    }

    var seffect = this._effect;
    this._effect = effect; // make sure the active effect is the right one if there are some observers for onBind that would need to get the current effect

    this._afterBind(mesh);

    this._effect = seffect;
  };

  ShaderMaterial.prototype._afterBind = function (mesh) {
    _super.prototype._afterBind.call(this, mesh);

    this.getScene()._cachedEffect = this._effect;
  };
  /**
   * Gets the active textures from the material
   * @returns an array of textures
   */


  ShaderMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    for (var name in this._textures) {
      activeTextures.push(this._textures[name]);
    }

    for (var name in this._textureArrays) {
      var array = this._textureArrays[name];

      for (var index = 0; index < array.length; index++) {
        activeTextures.push(array[index]);
      }
    }

    return activeTextures;
  };
  /**
   * Specifies if the material uses a texture
   * @param texture defines the texture to check against the material
   * @returns a boolean specifying if the material uses the texture
   */


  ShaderMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    for (var name in this._textures) {
      if (this._textures[name] === texture) {
        return true;
      }
    }

    for (var name in this._textureArrays) {
      var array = this._textureArrays[name];

      for (var index = 0; index < array.length; index++) {
        if (array[index] === texture) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * Makes a duplicate of the material, and gives it a new name
   * @param name defines the new name for the duplicated material
   * @returns the cloned material
   */


  ShaderMaterial.prototype.clone = function (name) {
    var _this = this;

    var result = SerializationHelper.Clone(function () {
      return new ShaderMaterial(name, _this.getScene(), _this._shaderPath, _this._options);
    }, this);
    result.name = name;
    result.id = name; // Shader code path

    if (typeof result._shaderPath === 'object') {
      result._shaderPath = __assign({}, result._shaderPath);
    } // Options


    this._options = __assign({}, this._options);
    Object.keys(this._options).forEach(function (propName) {
      var propValue = _this._options[propName];

      if (Array.isArray(propValue)) {
        _this._options[propName] = propValue.slice(0);
      }
    }); // Texture

    for (var key in this._textures) {
      result.setTexture(key, this._textures[key]);
    } // Float


    for (var key in this._floats) {
      result.setFloat(key, this._floats[key]);
    } // Floats


    for (var key in this._floatsArrays) {
      result.setFloats(key, this._floatsArrays[key]);
    } // Color3


    for (var key in this._colors3) {
      result.setColor3(key, this._colors3[key]);
    } // Color4


    for (var key in this._colors4) {
      result.setColor4(key, this._colors4[key]);
    } // Vector2


    for (var key in this._vectors2) {
      result.setVector2(key, this._vectors2[key]);
    } // Vector3


    for (var key in this._vectors3) {
      result.setVector3(key, this._vectors3[key]);
    } // Vector4


    for (var key in this._vectors4) {
      result.setVector4(key, this._vectors4[key]);
    } // Matrix


    for (var key in this._matrices) {
      result.setMatrix(key, this._matrices[key]);
    } // Matrix 3x3


    for (var key in this._matrices3x3) {
      result.setMatrix3x3(key, this._matrices3x3[key]);
    } // Matrix 2x2


    for (var key in this._matrices2x2) {
      result.setMatrix2x2(key, this._matrices2x2[key]);
    }

    return result;
  };
  /**
   * Disposes the material
   * @param forceDisposeEffect specifies if effects should be forcefully disposed
   * @param forceDisposeTextures specifies if textures should be forcefully disposed
   * @param notBoundToMesh specifies if the material that is being disposed is known to be not bound to any mesh
   */


  ShaderMaterial.prototype.dispose = function (forceDisposeEffect, forceDisposeTextures, notBoundToMesh) {
    if (forceDisposeTextures) {
      var name;

      for (name in this._textures) {
        this._textures[name].dispose();
      }

      for (name in this._textureArrays) {
        var array = this._textureArrays[name];

        for (var index = 0; index < array.length; index++) {
          array[index].dispose();
        }
      }
    }

    this._textures = {};

    _super.prototype.dispose.call(this, forceDisposeEffect, forceDisposeTextures, notBoundToMesh);
  };
  /**
   * Serializes this material in a JSON representation
   * @returns the serialized material object
   */


  ShaderMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.ShaderMaterial";
    serializationObject.options = this._options;
    serializationObject.shaderPath = this._shaderPath;
    var name; // Texture

    serializationObject.textures = {};

    for (name in this._textures) {
      serializationObject.textures[name] = this._textures[name].serialize();
    } // Texture arrays


    serializationObject.textureArrays = {};

    for (name in this._textureArrays) {
      serializationObject.textureArrays[name] = [];
      var array = this._textureArrays[name];

      for (var index = 0; index < array.length; index++) {
        serializationObject.textureArrays[name].push(array[index].serialize());
      }
    } // Float


    serializationObject.floats = {};

    for (name in this._floats) {
      serializationObject.floats[name] = this._floats[name];
    } // Floats


    serializationObject.FloatArrays = {};

    for (name in this._floatsArrays) {
      serializationObject.FloatArrays[name] = this._floatsArrays[name];
    } // Color3


    serializationObject.colors3 = {};

    for (name in this._colors3) {
      serializationObject.colors3[name] = this._colors3[name].asArray();
    } // Color3 array


    serializationObject.colors3Arrays = {};

    for (name in this._colors3Arrays) {
      serializationObject.colors3Arrays[name] = this._colors3Arrays[name];
    } // Color4


    serializationObject.colors4 = {};

    for (name in this._colors4) {
      serializationObject.colors4[name] = this._colors4[name].asArray();
    } // Color4 array


    serializationObject.colors4Arrays = {};

    for (name in this._colors4Arrays) {
      serializationObject.colors4Arrays[name] = this._colors4Arrays[name];
    } // Vector2


    serializationObject.vectors2 = {};

    for (name in this._vectors2) {
      serializationObject.vectors2[name] = this._vectors2[name].asArray();
    } // Vector3


    serializationObject.vectors3 = {};

    for (name in this._vectors3) {
      serializationObject.vectors3[name] = this._vectors3[name].asArray();
    } // Vector4


    serializationObject.vectors4 = {};

    for (name in this._vectors4) {
      serializationObject.vectors4[name] = this._vectors4[name].asArray();
    } // Matrix


    serializationObject.matrices = {};

    for (name in this._matrices) {
      serializationObject.matrices[name] = this._matrices[name].asArray();
    } // MatrixArray


    serializationObject.matrixArray = {};

    for (name in this._matrixArrays) {
      serializationObject.matrixArray[name] = this._matrixArrays[name];
    } // Matrix 3x3


    serializationObject.matrices3x3 = {};

    for (name in this._matrices3x3) {
      serializationObject.matrices3x3[name] = this._matrices3x3[name];
    } // Matrix 2x2


    serializationObject.matrices2x2 = {};

    for (name in this._matrices2x2) {
      serializationObject.matrices2x2[name] = this._matrices2x2[name];
    } // Vector2Array


    serializationObject.vectors2Arrays = {};

    for (name in this._vectors2Arrays) {
      serializationObject.vectors2Arrays[name] = this._vectors2Arrays[name];
    } // Vector3Array


    serializationObject.vectors3Arrays = {};

    for (name in this._vectors3Arrays) {
      serializationObject.vectors3Arrays[name] = this._vectors3Arrays[name];
    } // Vector4Array


    serializationObject.vectors4Arrays = {};

    for (name in this._vectors4Arrays) {
      serializationObject.vectors4Arrays[name] = this._vectors4Arrays[name];
    }

    return serializationObject;
  };
  /**
   * Creates a shader material from parsed shader material data
   * @param source defines the JSON represnetation of the material
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a new material
   */


  ShaderMaterial.Parse = function (source, scene, rootUrl) {
    var material = SerializationHelper.Parse(function () {
      return new ShaderMaterial(source.name, scene, source.shaderPath, source.options);
    }, source, scene, rootUrl);
    var name; // Texture

    for (name in source.textures) {
      material.setTexture(name, Texture.Parse(source.textures[name], scene, rootUrl));
    } // Texture arrays


    for (name in source.textureArrays) {
      var array = source.textureArrays[name];
      var textureArray = new Array();

      for (var index = 0; index < array.length; index++) {
        textureArray.push(Texture.Parse(array[index], scene, rootUrl));
      }

      material.setTextureArray(name, textureArray);
    } // Float


    for (name in source.floats) {
      material.setFloat(name, source.floats[name]);
    } // Float s


    for (name in source.floatsArrays) {
      material.setFloats(name, source.floatsArrays[name]);
    } // Color3


    for (name in source.colors3) {
      material.setColor3(name, Color3.FromArray(source.colors3[name]));
    } // Color3 arrays


    for (name in source.colors3Arrays) {
      var colors = source.colors3Arrays[name].reduce(function (arr, num, i) {
        if (i % 3 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }

        return arr;
      }, []).map(function (color) {
        return Color3.FromArray(color);
      });
      material.setColor3Array(name, colors);
    } // Color4


    for (name in source.colors4) {
      material.setColor4(name, Color4.FromArray(source.colors4[name]));
    } // Color4 arrays


    for (name in source.colors4Arrays) {
      var colors = source.colors4Arrays[name].reduce(function (arr, num, i) {
        if (i % 4 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }

        return arr;
      }, []).map(function (color) {
        return Color4.FromArray(color);
      });
      material.setColor4Array(name, colors);
    } // Vector2


    for (name in source.vectors2) {
      material.setVector2(name, Vector2.FromArray(source.vectors2[name]));
    } // Vector3


    for (name in source.vectors3) {
      material.setVector3(name, Vector3.FromArray(source.vectors3[name]));
    } // Vector4


    for (name in source.vectors4) {
      material.setVector4(name, Vector4.FromArray(source.vectors4[name]));
    } // Matrix


    for (name in source.matrices) {
      material.setMatrix(name, Matrix.FromArray(source.matrices[name]));
    } // MatrixArray


    for (name in source.matrixArray) {
      material._matrixArrays[name] = new Float32Array(source.matrixArray[name]);
    } // Matrix 3x3


    for (name in source.matrices3x3) {
      material.setMatrix3x3(name, source.matrices3x3[name]);
    } // Matrix 2x2


    for (name in source.matrices2x2) {
      material.setMatrix2x2(name, source.matrices2x2[name]);
    } // Vector2Array


    for (name in source.vectors2Arrays) {
      material.setArray2(name, source.vectors2Arrays[name]);
    } // Vector3Array


    for (name in source.vectors3Arrays) {
      material.setArray3(name, source.vectors3Arrays[name]);
    } // Vector4Array


    for (name in source.vectors4Arrays) {
      material.setArray4(name, source.vectors4Arrays[name]);
    }

    return material;
  };
  /**
   * Creates a new ShaderMaterial from a snippet saved in a remote file
   * @param name defines the name of the ShaderMaterial to create (can be null or empty to use the one from the json data)
   * @param url defines the url to load from
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a promise that will resolve to the new ShaderMaterial
   */


  ShaderMaterial.ParseFromFileAsync = function (name, url, scene, rootUrl) {
    var _this = this;

    if (rootUrl === void 0) {
      rootUrl = "";
    }

    return new Promise(function (resolve, reject) {
      var request = new WebRequest();
      request.addEventListener("readystatechange", function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var serializationObject = JSON.parse(request.responseText);

            var output = _this.Parse(serializationObject, scene || Engine.LastCreatedScene, rootUrl);

            if (name) {
              output.name = name;
            }

            resolve(output);
          } else {
            reject("Unable to load the ShaderMaterial");
          }
        }
      });
      request.open("GET", url);
      request.send();
    });
  };
  /**
   * Creates a ShaderMaterial from a snippet saved by the Inspector
   * @param snippetId defines the snippet to load
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a promise that will resolve to the new ShaderMaterial
   */


  ShaderMaterial.CreateFromSnippetAsync = function (snippetId, scene, rootUrl) {
    var _this = this;

    if (rootUrl === void 0) {
      rootUrl = "";
    }

    return new Promise(function (resolve, reject) {
      var request = new WebRequest();
      request.addEventListener("readystatechange", function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var snippet = JSON.parse(JSON.parse(request.responseText).jsonPayload);
            var serializationObject = JSON.parse(snippet.shaderMaterial);

            var output = _this.Parse(serializationObject, scene || Engine.LastCreatedScene, rootUrl);

            output.snippetId = snippetId;
            resolve(output);
          } else {
            reject("Unable to load the snippet " + snippetId);
          }
        }
      });
      request.open("GET", _this.SnippetUrl + "/" + snippetId.replace(/#/g, "/"));
      request.send();
    });
  };
  /** Define the Url to load snippets */


  ShaderMaterial.SnippetUrl = "https://snippet.babylonjs.com";
  return ShaderMaterial;
}(Material);
_TypeStore.RegisteredTypes["BABYLON.ShaderMaterial"] = ShaderMaterial;

ThinEngine.prototype._createDepthStencilCubeTexture = function (size, options) {
  var internalTexture = new InternalTexture(this, InternalTextureSource.Unknown);
  internalTexture.isCube = true;

  if (this.webGLVersion === 1) {
    Logger.Error("Depth cube texture is not supported by WebGL 1.");
    return internalTexture;
  }

  var internalOptions = __assign({
    bilinearFiltering: false,
    comparisonFunction: 0,
    generateStencil: false
  }, options);

  var gl = this._gl;

  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, internalTexture, true);

  this._setupDepthStencilTexture(internalTexture, size, internalOptions.generateStencil, internalOptions.bilinearFiltering, internalOptions.comparisonFunction); // Create the depth/stencil buffer


  for (var face = 0; face < 6; face++) {
    if (internalOptions.generateStencil) {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.DEPTH24_STENCIL8, size, size, 0, gl.DEPTH_STENCIL, gl.UNSIGNED_INT_24_8, null);
    } else {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.DEPTH_COMPONENT24, size, size, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
    }
  }

  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);

  return internalTexture;
};

ThinEngine.prototype._partialLoadFile = function (url, index, loadedFiles, onfinish, onErrorCallBack) {
  if (onErrorCallBack === void 0) {
    onErrorCallBack = null;
  }

  var onload = function (data) {
    loadedFiles[index] = data;
    loadedFiles._internalCount++;

    if (loadedFiles._internalCount === 6) {
      onfinish(loadedFiles);
    }
  };

  var onerror = function (request, exception) {
    if (onErrorCallBack && request) {
      onErrorCallBack(request.status + " " + request.statusText, exception);
    }
  };

  this._loadFile(url, onload, undefined, undefined, true, onerror);
};

ThinEngine.prototype._cascadeLoadFiles = function (scene, onfinish, files, onError) {
  if (onError === void 0) {
    onError = null;
  }

  var loadedFiles = [];
  loadedFiles._internalCount = 0;

  for (var index = 0; index < 6; index++) {
    this._partialLoadFile(files[index], index, loadedFiles, onfinish, onError);
  }
};

ThinEngine.prototype._cascadeLoadImgs = function (scene, onfinish, files, onError, mimeType) {
  if (onError === void 0) {
    onError = null;
  }

  var loadedImages = [];
  loadedImages._internalCount = 0;

  for (var index = 0; index < 6; index++) {
    this._partialLoadImg(files[index], index, loadedImages, scene, onfinish, onError, mimeType);
  }
};

ThinEngine.prototype._partialLoadImg = function (url, index, loadedImages, scene, onfinish, onErrorCallBack, mimeType) {
  if (onErrorCallBack === void 0) {
    onErrorCallBack = null;
  }

  var img;

  var onload = function () {
    if (img) {
      loadedImages[index] = img;
      loadedImages._internalCount++;

      if (scene) {
        scene._removePendingData(img);
      }
    }

    if (loadedImages._internalCount === 6) {
      onfinish(loadedImages);
    }
  };

  var onerror = function (message, exception) {
    if (scene) {
      scene._removePendingData(img);
    }

    if (onErrorCallBack) {
      onErrorCallBack(message, exception);
    }
  };

  img = FileTools.LoadImage(url, onload, onerror, scene ? scene.offlineProvider : null, mimeType);

  if (scene && img) {
    scene._addPendingData(img);
  }
};

ThinEngine.prototype._setCubeMapTextureParams = function (texture, loadMipmap) {
  var gl = this._gl;
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, loadMipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  texture.samplingMode = loadMipmap ? 3 : 2;

  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
};

ThinEngine.prototype.createCubeTexture = function (rootUrl, scene, files, noMipmap, onLoad, onError, format, forcedExtension, createPolynomials, lodScale, lodOffset, fallback, loaderOptions) {
  var _this = this;

  if (onLoad === void 0) {
    onLoad = null;
  }

  if (onError === void 0) {
    onError = null;
  }

  if (forcedExtension === void 0) {
    forcedExtension = null;
  }

  if (createPolynomials === void 0) {
    createPolynomials = false;
  }

  if (lodScale === void 0) {
    lodScale = 0;
  }

  if (lodOffset === void 0) {
    lodOffset = 0;
  }

  if (fallback === void 0) {
    fallback = null;
  }

  var gl = this._gl;
  var texture = fallback ? fallback : new InternalTexture(this, InternalTextureSource.Cube);
  texture.isCube = true;
  texture.url = rootUrl;
  texture.generateMipMaps = !noMipmap;
  texture._lodGenerationScale = lodScale;
  texture._lodGenerationOffset = lodOffset;

  if (!this._doNotHandleContextLost) {
    texture._extension = forcedExtension;
    texture._files = files;
  }

  var originalRootUrl = rootUrl;

  if (this._transformTextureUrl && !fallback) {
    rootUrl = this._transformTextureUrl(rootUrl);
  }

  var lastDot = rootUrl.lastIndexOf('.');
  var extension = forcedExtension ? forcedExtension : lastDot > -1 ? rootUrl.substring(lastDot).toLowerCase() : "";
  var loader = null;

  for (var _i = 0, _a = ThinEngine._TextureLoaders; _i < _a.length; _i++) {
    var availableLoader = _a[_i];

    if (availableLoader.canLoad(extension)) {
      loader = availableLoader;
      break;
    }
  }

  var onInternalError = function (request, exception) {
    if (rootUrl === originalRootUrl) {
      if (onError && request) {
        onError(request.status + " " + request.statusText, exception);
      }
    } else {
      // fall back to the original url if the transformed url fails to load
      Logger.Warn("Failed to load " + rootUrl + ", falling back to the " + originalRootUrl);

      _this.createCubeTexture(originalRootUrl, scene, files, noMipmap, onLoad, onError, format, forcedExtension, createPolynomials, lodScale, lodOffset, texture, loaderOptions);
    }
  };

  if (loader) {
    var onloaddata_1 = function (data) {
      _this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);

      loader.loadCubeData(data, texture, createPolynomials, onLoad, onError);
    };

    if (files && files.length === 6) {
      if (loader.supportCascades) {
        this._cascadeLoadFiles(scene, function (images) {
          return onloaddata_1(images.map(function (image) {
            return new Uint8Array(image);
          }));
        }, files, onError);
      } else {
        if (onError) {
          onError("Textures type does not support cascades.");
        } else {
          Logger.Warn("Texture loader does not support cascades.");
        }
      }
    } else {
      this._loadFile(rootUrl, function (data) {
        return onloaddata_1(new Uint8Array(data));
      }, undefined, undefined, true, onInternalError);
    }
  } else {
    if (!files) {
      throw new Error("Cannot load cubemap because files were not defined");
    }

    this._cascadeLoadImgs(scene, function (imgs) {
      var width = _this.needPOTTextures ? ThinEngine.GetExponentOfTwo(imgs[0].width, _this._caps.maxCubemapTextureSize) : imgs[0].width;
      var height = width;
      var faces = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];

      _this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);

      _this._unpackFlipY(false);

      var internalFormat = format ? _this._getInternalFormat(format) : _this._gl.RGBA;

      for (var index = 0; index < faces.length; index++) {
        if (imgs[index].width !== width || imgs[index].height !== height) {
          _this._prepareWorkingCanvas();

          if (!_this._workingCanvas || !_this._workingContext) {
            Logger.Warn("Cannot create canvas to resize texture.");
            return;
          }

          _this._workingCanvas.width = width;
          _this._workingCanvas.height = height;

          _this._workingContext.drawImage(imgs[index], 0, 0, imgs[index].width, imgs[index].height, 0, 0, width, height);

          gl.texImage2D(faces[index], 0, internalFormat, internalFormat, gl.UNSIGNED_BYTE, _this._workingCanvas);
        } else {
          gl.texImage2D(faces[index], 0, internalFormat, internalFormat, gl.UNSIGNED_BYTE, imgs[index]);
        }
      }

      if (!noMipmap) {
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      }

      _this._setCubeMapTextureParams(texture, !noMipmap);

      texture.width = width;
      texture.height = height;
      texture.isReady = true;

      if (format) {
        texture.format = format;
      }

      texture.onLoadedObservable.notifyObservers(texture);
      texture.onLoadedObservable.clear();

      if (onLoad) {
        onLoad();
      }
    }, files, onError);
  }

  this._internalTexturesCache.push(texture);

  return texture;
};

var name = 'rgbdEncodePixelShader';
var shader = "\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n#include<helperFunctions>\nvoid main(void)\n{\ngl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);\n}";
Effect.ShadersStore[name] = shader;

/**
 * Sets of helpers addressing the serialization and deserialization of environment texture
 * stored in a BabylonJS env file.
 * Those files are usually stored as .env files.
 */

var EnvironmentTextureTools = function () {
  function EnvironmentTextureTools() {}
  /**
   * Gets the environment info from an env file.
   * @param data The array buffer containing the .env bytes.
   * @returns the environment file info (the json header) if successfully parsed.
   */


  EnvironmentTextureTools.GetEnvInfo = function (data) {
    var dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
    var pos = 0;

    for (var i = 0; i < EnvironmentTextureTools._MagicBytes.length; i++) {
      if (dataView.getUint8(pos++) !== EnvironmentTextureTools._MagicBytes[i]) {
        Logger.Error('Not a babylon environment map');
        return null;
      }
    } // Read json manifest - collect characters up to null terminator


    var manifestString = '';
    var charCode = 0x00;

    while (charCode = dataView.getUint8(pos++)) {
      manifestString += String.fromCharCode(charCode);
    }

    var manifest = JSON.parse(manifestString);

    if (manifest.specular) {
      // Extend the header with the position of the payload.
      manifest.specular.specularDataPosition = pos; // Fallback to 0.8 exactly if lodGenerationScale is not defined for backward compatibility.

      manifest.specular.lodGenerationScale = manifest.specular.lodGenerationScale || 0.8;
    }

    return manifest;
  };
  /**
   * Creates an environment texture from a loaded cube texture.
   * @param texture defines the cube texture to convert in env file
   * @return a promise containing the environment data if succesfull.
   */


  EnvironmentTextureTools.CreateEnvTextureAsync = function (texture) {
    var _this = this;

    var internalTexture = texture.getInternalTexture();

    if (!internalTexture) {
      return Promise.reject("The cube texture is invalid.");
    }

    var engine = internalTexture.getEngine();

    if (engine && engine.premultipliedAlpha) {
      return Promise.reject("Env texture can only be created when the engine is created with the premultipliedAlpha option set to false.");
    }

    if (texture.textureType === 0) {
      return Promise.reject("The cube texture should allow HDR (Full Float or Half Float).");
    }

    var canvas = engine.getRenderingCanvas();

    if (!canvas) {
      return Promise.reject("Env texture can only be created when the engine is associated to a canvas.");
    }

    var textureType = 1;

    if (!engine.getCaps().textureFloatRender) {
      textureType = 2;

      if (!engine.getCaps().textureHalfFloatRender) {
        return Promise.reject("Env texture can only be created when the browser supports half float or full float rendering.");
      }
    }

    var cubeWidth = internalTexture.width;
    var hostingScene = new Scene(engine);
    var specularTextures = {};
    var promises = []; // Read and collect all mipmaps data from the cube.

    var mipmapsCount = Scalar.Log2(internalTexture.width);
    mipmapsCount = Math.round(mipmapsCount);

    var _loop_1 = function (i) {
      var faceWidth = Math.pow(2, mipmapsCount - i);

      var _loop_2 = function (face) {
        var data = texture.readPixels(face, i); // Creates a temp texture with the face data.

        var tempTexture = engine.createRawTexture(data, faceWidth, faceWidth, 5, false, false, 1, null, textureType); // And rgbdEncode them.

        var promise = new Promise(function (resolve, reject) {
          var rgbdPostProcess = new PostProcess("rgbdEncode", "rgbdEncode", null, null, 1, null, 1, engine, false, undefined, 0, undefined, null, false);
          rgbdPostProcess.getEffect().executeWhenCompiled(function () {
            rgbdPostProcess.onApply = function (effect) {
              effect._bindTexture("textureSampler", tempTexture);
            }; // As the process needs to happen on the main canvas, keep track of the current size


            var currentW = engine.getRenderWidth();
            var currentH = engine.getRenderHeight(); // Set the desired size for the texture

            engine.setSize(faceWidth, faceWidth);
            hostingScene.postProcessManager.directRender([rgbdPostProcess], null); // Reading datas from WebGL

            Tools.ToBlob(canvas, function (blob) {
              var fileReader = new FileReader();

              fileReader.onload = function (event) {
                var arrayBuffer = event.target.result;
                specularTextures[i * 6 + face] = arrayBuffer;
                resolve();
              };

              fileReader.readAsArrayBuffer(blob);
            }); // Reapply the previous canvas size

            engine.setSize(currentW, currentH);
          });
        });
        promises.push(promise);
      }; // All faces of the cube.


      for (var face = 0; face < 6; face++) {
        _loop_2(face);
      }
    };

    for (var i = 0; i <= mipmapsCount; i++) {
      _loop_1(i);
    } // Once all the textures haves been collected as RGBD stored in PNGs


    return Promise.all(promises).then(function () {
      // We can delete the hosting scene keeping track of all the creation objects
      hostingScene.dispose(); // Creates the json header for the env texture

      var info = {
        version: 1,
        width: cubeWidth,
        irradiance: _this._CreateEnvTextureIrradiance(texture),
        specular: {
          mipmaps: [],
          lodGenerationScale: texture.lodGenerationScale
        }
      }; // Sets the specular image data information

      var position = 0;

      for (var i = 0; i <= mipmapsCount; i++) {
        for (var face = 0; face < 6; face++) {
          var byteLength = specularTextures[i * 6 + face].byteLength;
          info.specular.mipmaps.push({
            length: byteLength,
            position: position
          });
          position += byteLength;
        }
      } // Encode the JSON as an array buffer


      var infoString = JSON.stringify(info);
      var infoBuffer = new ArrayBuffer(infoString.length + 1);
      var infoView = new Uint8Array(infoBuffer); // Limited to ascii subset matching unicode.

      for (var i = 0, strLen = infoString.length; i < strLen; i++) {
        infoView[i] = infoString.charCodeAt(i);
      } // Ends up with a null terminator for easier parsing


      infoView[infoString.length] = 0x00; // Computes the final required size and creates the storage

      var totalSize = EnvironmentTextureTools._MagicBytes.length + position + infoBuffer.byteLength;
      var finalBuffer = new ArrayBuffer(totalSize);
      var finalBufferView = new Uint8Array(finalBuffer);
      var dataView = new DataView(finalBuffer); // Copy the magic bytes identifying the file in

      var pos = 0;

      for (var i = 0; i < EnvironmentTextureTools._MagicBytes.length; i++) {
        dataView.setUint8(pos++, EnvironmentTextureTools._MagicBytes[i]);
      } // Add the json info


      finalBufferView.set(new Uint8Array(infoBuffer), pos);
      pos += infoBuffer.byteLength; // Finally inserts the texture data

      for (var i = 0; i <= mipmapsCount; i++) {
        for (var face = 0; face < 6; face++) {
          var dataBuffer = specularTextures[i * 6 + face];
          finalBufferView.set(new Uint8Array(dataBuffer), pos);
          pos += dataBuffer.byteLength;
        }
      } // Voila


      return finalBuffer;
    });
  };
  /**
   * Creates a JSON representation of the spherical data.
   * @param texture defines the texture containing the polynomials
   * @return the JSON representation of the spherical info
   */


  EnvironmentTextureTools._CreateEnvTextureIrradiance = function (texture) {
    var polynmials = texture.sphericalPolynomial;

    if (polynmials == null) {
      return null;
    }

    return {
      x: [polynmials.x.x, polynmials.x.y, polynmials.x.z],
      y: [polynmials.y.x, polynmials.y.y, polynmials.y.z],
      z: [polynmials.z.x, polynmials.z.y, polynmials.z.z],
      xx: [polynmials.xx.x, polynmials.xx.y, polynmials.xx.z],
      yy: [polynmials.yy.x, polynmials.yy.y, polynmials.yy.z],
      zz: [polynmials.zz.x, polynmials.zz.y, polynmials.zz.z],
      yz: [polynmials.yz.x, polynmials.yz.y, polynmials.yz.z],
      zx: [polynmials.zx.x, polynmials.zx.y, polynmials.zx.z],
      xy: [polynmials.xy.x, polynmials.xy.y, polynmials.xy.z]
    };
  };
  /**
   * Creates the ArrayBufferViews used for initializing environment texture image data.
   * @param data the image data
   * @param info parameters that determine what views will be created for accessing the underlying buffer
   * @return the views described by info providing access to the underlying buffer
   */


  EnvironmentTextureTools.CreateImageDataArrayBufferViews = function (data, info) {
    if (info.version !== 1) {
      throw new Error("Unsupported babylon environment map version \"" + info.version + "\"");
    }

    var specularInfo = info.specular; // Double checks the enclosed info

    var mipmapsCount = Scalar.Log2(info.width);
    mipmapsCount = Math.round(mipmapsCount) + 1;

    if (specularInfo.mipmaps.length !== 6 * mipmapsCount) {
      throw new Error("Unsupported specular mipmaps number \"" + specularInfo.mipmaps.length + "\"");
    }

    var imageData = new Array(mipmapsCount);

    for (var i = 0; i < mipmapsCount; i++) {
      imageData[i] = new Array(6);

      for (var face = 0; face < 6; face++) {
        var imageInfo = specularInfo.mipmaps[i * 6 + face];
        imageData[i][face] = new Uint8Array(data.buffer, data.byteOffset + specularInfo.specularDataPosition + imageInfo.position, imageInfo.length);
      }
    }

    return imageData;
  };
  /**
   * Uploads the texture info contained in the env file to the GPU.
   * @param texture defines the internal texture to upload to
   * @param data defines the data to load
   * @param info defines the texture info retrieved through the GetEnvInfo method
   * @returns a promise
   */


  EnvironmentTextureTools.UploadEnvLevelsAsync = function (texture, data, info) {
    if (info.version !== 1) {
      throw new Error("Unsupported babylon environment map version \"" + info.version + "\"");
    }

    var specularInfo = info.specular;

    if (!specularInfo) {
      // Nothing else parsed so far
      return Promise.resolve();
    }

    texture._lodGenerationScale = specularInfo.lodGenerationScale;
    var imageData = EnvironmentTextureTools.CreateImageDataArrayBufferViews(data, info);
    return EnvironmentTextureTools.UploadLevelsAsync(texture, imageData);
  };

  EnvironmentTextureTools._OnImageReadyAsync = function (image, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture) {
    return new Promise(function (resolve, reject) {
      if (expandTexture) {
        var tempTexture_1 = engine.createTexture(null, true, true, null, 1, null, function (message) {
          reject(message);
        }, image);
        rgbdPostProcess.getEffect().executeWhenCompiled(function () {
          // Uncompress the data to a RTT
          rgbdPostProcess.onApply = function (effect) {
            effect._bindTexture("textureSampler", tempTexture_1);

            effect.setFloat2("scale", 1, 1);
          };

          engine.scenes[0].postProcessManager.directRender([rgbdPostProcess], cubeRtt, true, face, i); // Cleanup

          engine.restoreDefaultFramebuffer();
          tempTexture_1.dispose();
          URL.revokeObjectURL(url);
          resolve();
        });
      } else {
        engine._uploadImageToTexture(texture, image, face, i); // Upload the face to the non lod texture support


        if (generateNonLODTextures) {
          var lodTexture = lodTextures[i];

          if (lodTexture) {
            engine._uploadImageToTexture(lodTexture._texture, image, face, 0);
          }
        }

        resolve();
      }
    });
  };
  /**
   * Uploads the levels of image data to the GPU.
   * @param texture defines the internal texture to upload to
   * @param imageData defines the array buffer views of image data [mipmap][face]
   * @returns a promise
   */


  EnvironmentTextureTools.UploadLevelsAsync = function (texture, imageData) {
    var _this = this;

    if (!Tools.IsExponentOfTwo(texture.width)) {
      throw new Error("Texture size must be a power of two");
    }

    var mipmapsCount = Math.round(Scalar.Log2(texture.width)) + 1; // Gets everything ready.

    var engine = texture.getEngine();
    var expandTexture = false;
    var generateNonLODTextures = false;
    var rgbdPostProcess = null;
    var cubeRtt = null;
    var lodTextures = null;
    var caps = engine.getCaps();
    texture.format = 5;
    texture.type = 0;
    texture.generateMipMaps = true;
    texture._cachedAnisotropicFilteringLevel = null;
    engine.updateTextureSamplingMode(3, texture); // Add extra process if texture lod is not supported

    if (!caps.textureLOD) {
      expandTexture = false;
      generateNonLODTextures = true;
      lodTextures = {};
    } // in webgl 1 there are no ways to either render or copy lod level information for float textures.
    else if (engine.webGLVersion < 2) {
      expandTexture = false;
    } // If half float available we can uncompress the texture
    else if (caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering) {
      expandTexture = true;
      texture.type = 2;
    } // If full float available we can uncompress the texture
    else if (caps.textureFloatRender && caps.textureFloatLinearFiltering) {
      expandTexture = true;
      texture.type = 1;
    } // Expand the texture if possible


    if (expandTexture) {
      // Simply run through the decode PP
      rgbdPostProcess = new PostProcess("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, engine, false, undefined, texture.type, undefined, null, false);
      texture._isRGBD = false;
      texture.invertY = false;
      cubeRtt = engine.createRenderTargetCubeTexture(texture.width, {
        generateDepthBuffer: false,
        generateMipMaps: true,
        generateStencilBuffer: false,
        samplingMode: 3,
        type: texture.type,
        format: 5
      });
    } else {
      texture._isRGBD = true;
      texture.invertY = true; // In case of missing support, applies the same patch than DDS files.

      if (generateNonLODTextures) {
        var mipSlices = 3;
        var scale = texture._lodGenerationScale;
        var offset = texture._lodGenerationOffset;

        for (var i = 0; i < mipSlices; i++) {
          //compute LOD from even spacing in smoothness (matching shader calculation)
          var smoothness = i / (mipSlices - 1);
          var roughness = 1 - smoothness;
          var minLODIndex = offset; // roughness = 0

          var maxLODIndex = (mipmapsCount - 1) * scale + offset; // roughness = 1 (mipmaps start from 0)

          var lodIndex = minLODIndex + (maxLODIndex - minLODIndex) * roughness;
          var mipmapIndex = Math.round(Math.min(Math.max(lodIndex, 0), maxLODIndex));
          var glTextureFromLod = new InternalTexture(engine, InternalTextureSource.Temp);
          glTextureFromLod.isCube = true;
          glTextureFromLod.invertY = true;
          glTextureFromLod.generateMipMaps = false;
          engine.updateTextureSamplingMode(2, glTextureFromLod); // Wrap in a base texture for easy binding.

          var lodTexture = new BaseTexture(null);
          lodTexture.isCube = true;
          lodTexture._texture = glTextureFromLod;
          lodTextures[mipmapIndex] = lodTexture;

          switch (i) {
            case 0:
              texture._lodTextureLow = lodTexture;
              break;

            case 1:
              texture._lodTextureMid = lodTexture;
              break;

            case 2:
              texture._lodTextureHigh = lodTexture;
              break;
          }
        }
      }
    }

    var promises = [];

    var _loop_3 = function (i) {
      var _loop_4 = function (face) {
        // Constructs an image element from image data
        var bytes = imageData[i][face];
        var blob = new Blob([bytes], {
          type: 'image/png'
        });
        var url = URL.createObjectURL(blob);
        var promise = void 0;

        if (typeof Image === "undefined") {
          promise = createImageBitmap(blob).then(function (img) {
            return _this._OnImageReadyAsync(img, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture);
          });
        } else {
          var image_1 = new Image();
          image_1.src = url; // Enqueue promise to upload to the texture.

          promise = new Promise(function (resolve, reject) {
            image_1.onload = function () {
              _this._OnImageReadyAsync(image_1, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture).then(function () {
                return resolve();
              }).catch(function (reason) {
                reject(reason);
              });
            };

            image_1.onerror = function (error) {
              reject(error);
            };
          });
        }

        promises.push(promise);
      }; // All faces


      for (var face = 0; face < 6; face++) {
        _loop_4(face);
      }
    }; // All mipmaps up to provided number of images


    for (var i = 0; i < imageData.length; i++) {
      _loop_3(i);
    } // Fill remaining mipmaps with black textures.


    if (imageData.length < mipmapsCount) {
      var data = void 0;
      var size = Math.pow(2, mipmapsCount - 1 - imageData.length);
      var dataLength = size * size * 4;

      switch (texture.type) {
        case 0:
          {
            data = new Uint8Array(dataLength);
            break;
          }

        case 2:
          {
            data = new Uint16Array(dataLength);
            break;
          }

        case 1:
          {
            data = new Float32Array(dataLength);
            break;
          }
      }

      for (var i = imageData.length; i < mipmapsCount; i++) {
        for (var face = 0; face < 6; face++) {
          engine._uploadArrayBufferViewToTexture(texture, data, face, i);
        }
      }
    } // Once all done, finishes the cleanup and return


    return Promise.all(promises).then(function () {
      // Release temp RTT.
      if (cubeRtt) {
        engine._releaseFramebufferObjects(cubeRtt);

        engine._releaseTexture(texture);

        cubeRtt._swapAndDie(texture);
      } // Release temp Post Process.


      if (rgbdPostProcess) {
        rgbdPostProcess.dispose();
      } // Flag internal texture as ready in case they are in use.


      if (generateNonLODTextures) {
        if (texture._lodTextureHigh && texture._lodTextureHigh._texture) {
          texture._lodTextureHigh._texture.isReady = true;
        }

        if (texture._lodTextureMid && texture._lodTextureMid._texture) {
          texture._lodTextureMid._texture.isReady = true;
        }

        if (texture._lodTextureLow && texture._lodTextureLow._texture) {
          texture._lodTextureLow._texture.isReady = true;
        }
      }
    });
  };
  /**
   * Uploads spherical polynomials information to the texture.
   * @param texture defines the texture we are trying to upload the information to
   * @param info defines the environment texture info retrieved through the GetEnvInfo method
   */


  EnvironmentTextureTools.UploadEnvSpherical = function (texture, info) {
    if (info.version !== 1) {
      Logger.Warn('Unsupported babylon environment map version "' + info.version + '"');
    }

    var irradianceInfo = info.irradiance;

    if (!irradianceInfo) {
      return;
    }

    var sp = new SphericalPolynomial();
    Vector3.FromArrayToRef(irradianceInfo.x, 0, sp.x);
    Vector3.FromArrayToRef(irradianceInfo.y, 0, sp.y);
    Vector3.FromArrayToRef(irradianceInfo.z, 0, sp.z);
    Vector3.FromArrayToRef(irradianceInfo.xx, 0, sp.xx);
    Vector3.FromArrayToRef(irradianceInfo.yy, 0, sp.yy);
    Vector3.FromArrayToRef(irradianceInfo.zz, 0, sp.zz);
    Vector3.FromArrayToRef(irradianceInfo.yz, 0, sp.yz);
    Vector3.FromArrayToRef(irradianceInfo.zx, 0, sp.zx);
    Vector3.FromArrayToRef(irradianceInfo.xy, 0, sp.xy);
    texture._sphericalPolynomial = sp;
  };
  /** @hidden */


  EnvironmentTextureTools._UpdateRGBDAsync = function (internalTexture, data, sphericalPolynomial, lodScale, lodOffset) {
    internalTexture._source = InternalTextureSource.CubeRawRGBD;
    internalTexture._bufferViewArrayArray = data;
    internalTexture._lodGenerationScale = lodScale;
    internalTexture._lodGenerationOffset = lodOffset;
    internalTexture._sphericalPolynomial = sphericalPolynomial;
    return EnvironmentTextureTools.UploadLevelsAsync(internalTexture, data).then(function () {
      internalTexture.isReady = true;
    });
  };
  /**
   * Magic number identifying the env file.
   */


  EnvironmentTextureTools._MagicBytes = [0x86, 0x16, 0x87, 0x96, 0xf6, 0xd6, 0x96, 0x36];
  return EnvironmentTextureTools;
}();

InternalTexture._UpdateRGBDAsync = EnvironmentTextureTools._UpdateRGBDAsync;

/**
 * Mode that determines how to handle old animation groups before loading new ones.
 */

var SceneLoaderAnimationGroupLoadingMode;

(function (SceneLoaderAnimationGroupLoadingMode) {
  /**
   * Reset all old animations to initial state then dispose them.
   */
  SceneLoaderAnimationGroupLoadingMode[SceneLoaderAnimationGroupLoadingMode["Clean"] = 0] = "Clean";
  /**
   * Stop all old animations.
   */

  SceneLoaderAnimationGroupLoadingMode[SceneLoaderAnimationGroupLoadingMode["Stop"] = 1] = "Stop";
  /**
   * Restart old animations from first frame.
   */

  SceneLoaderAnimationGroupLoadingMode[SceneLoaderAnimationGroupLoadingMode["Sync"] = 2] = "Sync";
  /**
   * Old animations remains untouched.
   */

  SceneLoaderAnimationGroupLoadingMode[SceneLoaderAnimationGroupLoadingMode["NoSync"] = 3] = "NoSync";
})(SceneLoaderAnimationGroupLoadingMode || (SceneLoaderAnimationGroupLoadingMode = {}));
/**
 * Class used to load scene from various file formats using registered plugins
 * @see https://doc.babylonjs.com/how_to/load_from_any_file_type
 */


var SceneLoader = function () {
  function SceneLoader() {}

  Object.defineProperty(SceneLoader, "ForceFullSceneLoadingForIncremental", {
    /**
     * Gets or sets a boolean indicating if entire scene must be loaded even if scene contains incremental data
     */
    get: function () {
      return SceneLoaderFlags.ForceFullSceneLoadingForIncremental;
    },
    set: function (value) {
      SceneLoaderFlags.ForceFullSceneLoadingForIncremental = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SceneLoader, "ShowLoadingScreen", {
    /**
     * Gets or sets a boolean indicating if loading screen must be displayed while loading a scene
     */
    get: function () {
      return SceneLoaderFlags.ShowLoadingScreen;
    },
    set: function (value) {
      SceneLoaderFlags.ShowLoadingScreen = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SceneLoader, "loggingLevel", {
    /**
     * Defines the current logging level (while loading the scene)
     * @ignorenaming
     */
    get: function () {
      return SceneLoaderFlags.loggingLevel;
    },
    set: function (value) {
      SceneLoaderFlags.loggingLevel = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SceneLoader, "CleanBoneMatrixWeights", {
    /**
     * Gets or set a boolean indicating if matrix weights must be cleaned upon loading
     */
    get: function () {
      return SceneLoaderFlags.CleanBoneMatrixWeights;
    },
    set: function (value) {
      SceneLoaderFlags.CleanBoneMatrixWeights = value;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the default plugin (used to load Babylon files)
   * @returns the .babylon plugin
   */

  SceneLoader.GetDefaultPlugin = function () {
    return SceneLoader._registeredPlugins[".babylon"];
  };

  SceneLoader._GetPluginForExtension = function (extension) {
    var registeredPlugin = SceneLoader._registeredPlugins[extension];

    if (registeredPlugin) {
      return registeredPlugin;
    }

    Logger.Warn("Unable to find a plugin to load " + extension + " files. Trying to use .babylon default plugin. To load from a specific filetype (eg. gltf) see: https://doc.babylonjs.com/how_to/load_from_any_file_type");
    return SceneLoader.GetDefaultPlugin();
  };

  SceneLoader._GetPluginForDirectLoad = function (data) {
    for (var extension in SceneLoader._registeredPlugins) {
      var plugin = SceneLoader._registeredPlugins[extension].plugin;

      if (plugin.canDirectLoad && plugin.canDirectLoad(data)) {
        return SceneLoader._registeredPlugins[extension];
      }
    }

    return SceneLoader.GetDefaultPlugin();
  };

  SceneLoader._GetPluginForFilename = function (sceneFilename) {
    var queryStringPosition = sceneFilename.indexOf("?");

    if (queryStringPosition !== -1) {
      sceneFilename = sceneFilename.substring(0, queryStringPosition);
    }

    var dotPosition = sceneFilename.lastIndexOf(".");
    var extension = sceneFilename.substring(dotPosition, sceneFilename.length).toLowerCase();
    return SceneLoader._GetPluginForExtension(extension);
  };

  SceneLoader._GetDirectLoad = function (sceneFilename) {
    if (sceneFilename.substr(0, 5) === "data:") {
      return sceneFilename.substr(5);
    }

    return null;
  };

  SceneLoader._LoadData = function (fileInfo, scene, onSuccess, onProgress, onError, onDispose, pluginExtension) {
    var directLoad = SceneLoader._GetDirectLoad(fileInfo.name);

    var registeredPlugin = pluginExtension ? SceneLoader._GetPluginForExtension(pluginExtension) : directLoad ? SceneLoader._GetPluginForDirectLoad(fileInfo.name) : SceneLoader._GetPluginForFilename(fileInfo.name);
    var plugin;

    if (registeredPlugin.plugin.createPlugin !== undefined) {
      plugin = registeredPlugin.plugin.createPlugin();
    } else {
      plugin = registeredPlugin.plugin;
    }

    if (!plugin) {
      throw "The loader plugin corresponding to the file type you are trying to load has not been found. If using es6, please import the plugin you wish to use before.";
    }

    SceneLoader.OnPluginActivatedObservable.notifyObservers(plugin);

    if (directLoad) {
      if (plugin.directLoad) {
        var result = plugin.directLoad(scene, directLoad);

        if (result.then) {
          result.then(function (data) {
            onSuccess(plugin, data);
          }).catch(function (error) {
            onError("Error in directLoad of _loadData: " + error, error);
          });
        } else {
          onSuccess(plugin, result);
        }
      } else {
        onSuccess(plugin, directLoad);
      }

      return plugin;
    }

    var useArrayBuffer = registeredPlugin.isBinary;

    var dataCallback = function (data, responseURL) {
      if (scene.isDisposed) {
        onError("Scene has been disposed");
        return;
      }

      onSuccess(plugin, data, responseURL);
    };

    var request = null;
    var pluginDisposed = false;
    var onDisposeObservable = plugin.onDisposeObservable;

    if (onDisposeObservable) {
      onDisposeObservable.add(function () {
        pluginDisposed = true;

        if (request) {
          request.abort();
          request = null;
        }

        onDispose();
      });
    }

    var manifestChecked = function () {
      if (pluginDisposed) {
        return;
      }

      var successCallback = function (data, request) {
        dataCallback(data, request ? request.responseURL : undefined);
      };

      var errorCallback = function (error) {
        onError(error.message, error);
      };

      request = plugin.requestFile ? plugin.requestFile(scene, fileInfo.url, successCallback, onProgress, useArrayBuffer, errorCallback) : scene._requestFile(fileInfo.url, successCallback, onProgress, true, useArrayBuffer, errorCallback);
    };

    var file = fileInfo.file || FilesInputStore.FilesToLoad[fileInfo.name.toLowerCase()];

    if (fileInfo.rootUrl.indexOf("file:") === -1 || fileInfo.rootUrl.indexOf("file:") !== -1 && !file) {
      var engine = scene.getEngine();
      var canUseOfflineSupport = engine.enableOfflineSupport;

      if (canUseOfflineSupport) {
        // Also check for exceptions
        var exceptionFound = false;

        for (var _i = 0, _a = scene.disableOfflineSupportExceptionRules; _i < _a.length; _i++) {
          var regex = _a[_i];

          if (regex.test(fileInfo.url)) {
            exceptionFound = true;
            break;
          }
        }

        canUseOfflineSupport = !exceptionFound;
      }

      if (canUseOfflineSupport && Engine.OfflineProviderFactory) {
        // Checking if a manifest file has been set for this scene and if offline mode has been requested
        scene.offlineProvider = Engine.OfflineProviderFactory(fileInfo.url, manifestChecked, engine.disableManifestCheck);
      } else {
        manifestChecked();
      }
    } // Loading file from disk via input file or drag'n'drop
    else {
      if (file) {
        var errorCallback = function (error) {
          onError(error.message, error);
        };

        request = plugin.readFile ? plugin.readFile(scene, file, dataCallback, onProgress, useArrayBuffer, errorCallback) : scene._readFile(file, dataCallback, onProgress, useArrayBuffer, errorCallback);
      } else {
        onError("Unable to find file named " + fileInfo.name);
      }
    }

    return plugin;
  };

  SceneLoader._GetFileInfo = function (rootUrl, sceneFilename) {
    var url;
    var name;
    var file = null;

    if (!sceneFilename) {
      url = rootUrl;
      name = Tools.GetFilename(rootUrl);
      rootUrl = Tools.GetFolderPath(rootUrl);
    } else if (sceneFilename.name) {
      var sceneFile = sceneFilename;
      url = rootUrl + sceneFile.name;
      name = sceneFile.name;
      file = sceneFile;
    } else {
      var filename = sceneFilename;

      if (filename.substr(0, 1) === "/") {
        Tools.Error("Wrong sceneFilename parameter");
        return null;
      }

      url = rootUrl + filename;
      name = filename;
    }

    return {
      url: url,
      rootUrl: rootUrl,
      name: name,
      file: file
    };
  }; // Public functions

  /**
   * Gets a plugin that can load the given extension
   * @param extension defines the extension to load
   * @returns a plugin or null if none works
   */


  SceneLoader.GetPluginForExtension = function (extension) {
    return SceneLoader._GetPluginForExtension(extension).plugin;
  };
  /**
   * Gets a boolean indicating that the given extension can be loaded
   * @param extension defines the extension to load
   * @returns true if the extension is supported
   */


  SceneLoader.IsPluginForExtensionAvailable = function (extension) {
    return !!SceneLoader._registeredPlugins[extension];
  };
  /**
   * Adds a new plugin to the list of registered plugins
   * @param plugin defines the plugin to add
   */


  SceneLoader.RegisterPlugin = function (plugin) {
    if (typeof plugin.extensions === "string") {
      var extension = plugin.extensions;
      SceneLoader._registeredPlugins[extension.toLowerCase()] = {
        plugin: plugin,
        isBinary: false
      };
    } else {
      var extensions = plugin.extensions;
      Object.keys(extensions).forEach(function (extension) {
        SceneLoader._registeredPlugins[extension.toLowerCase()] = {
          plugin: plugin,
          isBinary: extensions[extension].isBinary
        };
      });
    }
  };
  /**
   * Import meshes into a scene
   * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene the instance of BABYLON.Scene to append to
   * @param onSuccess a callback with a list of imported meshes, particleSystems, skeletons, and animationGroups when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded plugin
   */


  SceneLoader.ImportMesh = function (meshNames, rootUrl, sceneFilename, scene, onSuccess, onProgress, onError, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onSuccess === void 0) {
      onSuccess = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    if (!scene) {
      Logger.Error("No scene available to import mesh to");
      return null;
    }

    var fileInfo = SceneLoader._GetFileInfo(rootUrl, sceneFilename);

    if (!fileInfo) {
      return null;
    }

    var loadingToken = {};

    scene._addPendingData(loadingToken);

    var disposeHandler = function () {
      scene._removePendingData(loadingToken);
    };

    var errorHandler = function (message, exception) {
      var errorMessage = "Unable to import meshes from " + fileInfo.url + ": " + message;

      if (onError) {
        onError(scene, errorMessage, exception);
      } else {
        Logger.Error(errorMessage); // should the exception be thrown?
      }

      disposeHandler();
    };

    var progressHandler = onProgress ? function (event) {
      try {
        onProgress(event);
      } catch (e) {
        errorHandler("Error in onProgress callback: " + e, e);
      }
    } : undefined;

    var successHandler = function (meshes, particleSystems, skeletons, animationGroups, transformNodes, geometries, lights) {
      scene.importedMeshesFiles.push(fileInfo.url);

      if (onSuccess) {
        try {
          onSuccess(meshes, particleSystems, skeletons, animationGroups, transformNodes, geometries, lights);
        } catch (e) {
          errorHandler("Error in onSuccess callback: " + e, e);
        }
      }

      scene._removePendingData(loadingToken);
    };

    return SceneLoader._LoadData(fileInfo, scene, function (plugin, data, responseURL) {
      if (plugin.rewriteRootURL) {
        fileInfo.rootUrl = plugin.rewriteRootURL(fileInfo.rootUrl, responseURL);
      }

      if (plugin.importMesh) {
        var syncedPlugin = plugin;
        var meshes = new Array();
        var particleSystems = new Array();
        var skeletons = new Array();

        if (!syncedPlugin.importMesh(meshNames, scene, data, fileInfo.rootUrl, meshes, particleSystems, skeletons, errorHandler)) {
          return;
        }

        scene.loadingPluginName = plugin.name;
        successHandler(meshes, particleSystems, skeletons, [], [], [], []);
      } else {
        var asyncedPlugin = plugin;
        asyncedPlugin.importMeshAsync(meshNames, scene, data, fileInfo.rootUrl, progressHandler, fileInfo.name).then(function (result) {
          scene.loadingPluginName = plugin.name;
          successHandler(result.meshes, result.particleSystems, result.skeletons, result.animationGroups, result.transformNodes, result.geometries, result.lights);
        }).catch(function (error) {
          errorHandler(error.message, error);
        });
      }
    }, progressHandler, errorHandler, disposeHandler, pluginExtension);
  };
  /**
   * Import meshes into a scene
   * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene the instance of BABYLON.Scene to append to
   * @param onProgress a callback with a progress event for each file being loaded
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded list of imported meshes, particle systems, skeletons, and animation groups
   */


  SceneLoader.ImportMeshAsync = function (meshNames, rootUrl, sceneFilename, scene, onProgress, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    return new Promise(function (resolve, reject) {
      SceneLoader.ImportMesh(meshNames, rootUrl, sceneFilename, scene, function (meshes, particleSystems, skeletons, animationGroups, transformNodes, geometries, lights) {
        resolve({
          meshes: meshes,
          particleSystems: particleSystems,
          skeletons: skeletons,
          animationGroups: animationGroups,
          transformNodes: transformNodes,
          geometries: geometries,
          lights: lights
        });
      }, onProgress, function (scene, message, exception) {
        reject(exception || new Error(message));
      }, pluginExtension);
    });
  };
  /**
   * Load a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param engine is the instance of BABYLON.Engine to use to create the scene
   * @param onSuccess a callback with the scene when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded plugin
   */


  SceneLoader.Load = function (rootUrl, sceneFilename, engine, onSuccess, onProgress, onError, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (engine === void 0) {
      engine = EngineStore.LastCreatedEngine;
    }

    if (onSuccess === void 0) {
      onSuccess = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    if (!engine) {
      Tools.Error("No engine available");
      return null;
    }

    return SceneLoader.Append(rootUrl, sceneFilename, new Scene(engine), onSuccess, onProgress, onError, pluginExtension);
  };
  /**
   * Load a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param engine is the instance of BABYLON.Engine to use to create the scene
   * @param onProgress a callback with a progress event for each file being loaded
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded scene
   */


  SceneLoader.LoadAsync = function (rootUrl, sceneFilename, engine, onProgress, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (engine === void 0) {
      engine = EngineStore.LastCreatedEngine;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    return new Promise(function (resolve, reject) {
      SceneLoader.Load(rootUrl, sceneFilename, engine, function (scene) {
        resolve(scene);
      }, onProgress, function (scene, message, exception) {
        reject(exception || new Error(message));
      }, pluginExtension);
    });
  };
  /**
   * Append a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene is the instance of BABYLON.Scene to append to
   * @param onSuccess a callback with the scene when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded plugin
   */


  SceneLoader.Append = function (rootUrl, sceneFilename, scene, onSuccess, onProgress, onError, pluginExtension) {
    var _this = this;

    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onSuccess === void 0) {
      onSuccess = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    if (!scene) {
      Logger.Error("No scene available to append to");
      return null;
    }

    var fileInfo = SceneLoader._GetFileInfo(rootUrl, sceneFilename);

    if (!fileInfo) {
      return null;
    }

    if (SceneLoader.ShowLoadingScreen && !this._showingLoadingScreen) {
      this._showingLoadingScreen = true;
      scene.getEngine().displayLoadingUI();
      scene.executeWhenReady(function () {
        scene.getEngine().hideLoadingUI();
        _this._showingLoadingScreen = false;
      });
    }

    var loadingToken = {};

    scene._addPendingData(loadingToken);

    var disposeHandler = function () {
      scene._removePendingData(loadingToken);
    };

    var errorHandler = function (message, exception) {
      var errorMessage = "Unable to load from " + fileInfo.url + (message ? ": " + message : "");

      if (onError) {
        onError(scene, errorMessage, exception);
      } else {
        Logger.Error(errorMessage); // should the exception be thrown?
      }

      disposeHandler();
    };

    var progressHandler = onProgress ? function (event) {
      try {
        onProgress(event);
      } catch (e) {
        errorHandler("Error in onProgress callback", e);
      }
    } : undefined;

    var successHandler = function () {
      if (onSuccess) {
        try {
          onSuccess(scene);
        } catch (e) {
          errorHandler("Error in onSuccess callback", e);
        }
      }

      scene._removePendingData(loadingToken);
    };

    return SceneLoader._LoadData(fileInfo, scene, function (plugin, data) {
      if (plugin.load) {
        var syncedPlugin = plugin;

        if (!syncedPlugin.load(scene, data, fileInfo.rootUrl, errorHandler)) {
          return;
        }

        scene.loadingPluginName = plugin.name;
        successHandler();
      } else {
        var asyncedPlugin = plugin;
        asyncedPlugin.loadAsync(scene, data, fileInfo.rootUrl, progressHandler, fileInfo.name).then(function () {
          scene.loadingPluginName = plugin.name;
          successHandler();
        }).catch(function (error) {
          errorHandler(error.message, error);
        });
      }
    }, progressHandler, errorHandler, disposeHandler, pluginExtension);
  };
  /**
   * Append a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene is the instance of BABYLON.Scene to append to
   * @param onProgress a callback with a progress event for each file being loaded
   * @param pluginExtension the extension used to determine the plugin
   * @returns The given scene
   */


  SceneLoader.AppendAsync = function (rootUrl, sceneFilename, scene, onProgress, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    return new Promise(function (resolve, reject) {
      SceneLoader.Append(rootUrl, sceneFilename, scene, function (scene) {
        resolve(scene);
      }, onProgress, function (scene, message, exception) {
        reject(exception || new Error(message));
      }, pluginExtension);
    });
  };
  /**
   * Load a scene into an asset container
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
   * @param onSuccess a callback with the scene when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded plugin
   */


  SceneLoader.LoadAssetContainer = function (rootUrl, sceneFilename, scene, onSuccess, onProgress, onError, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onSuccess === void 0) {
      onSuccess = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    if (!scene) {
      Logger.Error("No scene available to load asset container to");
      return null;
    }

    var fileInfo = SceneLoader._GetFileInfo(rootUrl, sceneFilename);

    if (!fileInfo) {
      return null;
    }

    var loadingToken = {};

    scene._addPendingData(loadingToken);

    var disposeHandler = function () {
      scene._removePendingData(loadingToken);
    };

    var errorHandler = function (message, exception) {
      var errorMessage = "Unable to load assets from " + fileInfo.url + (message ? ": " + message : "");

      if (exception && exception.message) {
        errorMessage += " (" + exception.message + ")";
      }

      if (onError) {
        onError(scene, errorMessage, exception);
      } else {
        Logger.Error(errorMessage); // should the exception be thrown?
      }

      disposeHandler();
    };

    var progressHandler = onProgress ? function (event) {
      try {
        onProgress(event);
      } catch (e) {
        errorHandler("Error in onProgress callback", e);
      }
    } : undefined;

    var successHandler = function (assets) {
      if (onSuccess) {
        try {
          onSuccess(assets);
        } catch (e) {
          errorHandler("Error in onSuccess callback", e);
        }
      }

      scene._removePendingData(loadingToken);
    };

    return SceneLoader._LoadData(fileInfo, scene, function (plugin, data) {
      if (plugin.loadAssetContainer) {
        var syncedPlugin = plugin;
        var assetContainer = syncedPlugin.loadAssetContainer(scene, data, fileInfo.rootUrl, errorHandler);

        if (!assetContainer) {
          return;
        }

        scene.loadingPluginName = plugin.name;
        successHandler(assetContainer);
      } else if (plugin.loadAssetContainerAsync) {
        var asyncedPlugin = plugin;
        asyncedPlugin.loadAssetContainerAsync(scene, data, fileInfo.rootUrl, progressHandler, fileInfo.name).then(function (assetContainer) {
          scene.loadingPluginName = plugin.name;
          successHandler(assetContainer);
        }).catch(function (error) {
          errorHandler(error.message, error);
        });
      } else {
        errorHandler("LoadAssetContainer is not supported by this plugin. Plugin did not provide a loadAssetContainer or loadAssetContainerAsync method.");
      }
    }, progressHandler, errorHandler, disposeHandler, pluginExtension);
  };
  /**
   * Load a scene into an asset container
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene (default: empty string)
   * @param scene is the instance of Scene to append to
   * @param onProgress a callback with a progress event for each file being loaded
   * @param pluginExtension the extension used to determine the plugin
   * @returns The loaded asset container
   */


  SceneLoader.LoadAssetContainerAsync = function (rootUrl, sceneFilename, scene, onProgress, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    return new Promise(function (resolve, reject) {
      SceneLoader.LoadAssetContainer(rootUrl, sceneFilename, scene, function (assetContainer) {
        resolve(assetContainer);
      }, onProgress, function (scene, message, exception) {
        reject(exception || new Error(message));
      }, pluginExtension);
    });
  };
  /**
   * Import animations from a file into a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
   * @param overwriteAnimations when true, animations are cleaned before importing new ones. Animations are appended otherwise
   * @param animationGroupLoadingMode defines how to handle old animations groups before importing new ones
   * @param targetConverter defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
   * @param onSuccess a callback with the scene when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   */


  SceneLoader.ImportAnimations = function (rootUrl, sceneFilename, scene, overwriteAnimations, animationGroupLoadingMode, targetConverter, onSuccess, onProgress, onError, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (overwriteAnimations === void 0) {
      overwriteAnimations = true;
    }

    if (animationGroupLoadingMode === void 0) {
      animationGroupLoadingMode = SceneLoaderAnimationGroupLoadingMode.Clean;
    }

    if (targetConverter === void 0) {
      targetConverter = null;
    }

    if (onSuccess === void 0) {
      onSuccess = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    if (!scene) {
      Logger.Error("No scene available to load animations to");
      return;
    }

    if (overwriteAnimations) {
      // Reset, stop and dispose all animations before loading new ones
      for (var _i = 0, _a = scene.animatables; _i < _a.length; _i++) {
        var animatable = _a[_i];
        animatable.reset();
      }

      scene.stopAllAnimations();
      scene.animationGroups.slice().forEach(function (animationGroup) {
        animationGroup.dispose();
      });
      var nodes = scene.getNodes();
      nodes.forEach(function (node) {
        if (node.animations) {
          node.animations = [];
        }
      });
    } else {
      switch (animationGroupLoadingMode) {
        case SceneLoaderAnimationGroupLoadingMode.Clean:
          scene.animationGroups.slice().forEach(function (animationGroup) {
            animationGroup.dispose();
          });
          break;

        case SceneLoaderAnimationGroupLoadingMode.Stop:
          scene.animationGroups.forEach(function (animationGroup) {
            animationGroup.stop();
          });
          break;

        case SceneLoaderAnimationGroupLoadingMode.Sync:
          scene.animationGroups.forEach(function (animationGroup) {
            animationGroup.reset();
            animationGroup.restart();
          });
          break;

        case SceneLoaderAnimationGroupLoadingMode.NoSync:
          // nothing to do
          break;

        default:
          Logger.Error("Unknown animation group loading mode value '" + animationGroupLoadingMode + "'");
          return;
      }
    }

    var startingIndexForNewAnimatables = scene.animatables.length;

    var onAssetContainerLoaded = function (container) {
      container.mergeAnimationsTo(scene, scene.animatables.slice(startingIndexForNewAnimatables), targetConverter);
      container.dispose();
      scene.onAnimationFileImportedObservable.notifyObservers(scene);

      if (onSuccess) {
        onSuccess(scene);
      }
    };

    this.LoadAssetContainer(rootUrl, sceneFilename, scene, onAssetContainerLoaded, onProgress, onError, pluginExtension);
  };
  /**
   * Import animations from a file into a scene
   * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
   * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
   * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
   * @param overwriteAnimations when true, animations are cleaned before importing new ones. Animations are appended otherwise
   * @param animationGroupLoadingMode defines how to handle old animations groups before importing new ones
   * @param targetConverter defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
   * @param onSuccess a callback with the scene when import succeeds
   * @param onProgress a callback with a progress event for each file being loaded
   * @param onError a callback with the scene, a message, and possibly an exception when import fails
   * @param pluginExtension the extension used to determine the plugin
   * @returns the updated scene with imported animations
   */


  SceneLoader.ImportAnimationsAsync = function (rootUrl, sceneFilename, scene, overwriteAnimations, animationGroupLoadingMode, targetConverter, onSuccess, onProgress, onError, pluginExtension) {
    if (sceneFilename === void 0) {
      sceneFilename = "";
    }

    if (scene === void 0) {
      scene = EngineStore.LastCreatedScene;
    }

    if (overwriteAnimations === void 0) {
      overwriteAnimations = true;
    }

    if (animationGroupLoadingMode === void 0) {
      animationGroupLoadingMode = SceneLoaderAnimationGroupLoadingMode.Clean;
    }

    if (targetConverter === void 0) {
      targetConverter = null;
    }

    if (onProgress === void 0) {
      onProgress = null;
    }

    if (pluginExtension === void 0) {
      pluginExtension = null;
    }

    return new Promise(function (resolve, reject) {
      SceneLoader.ImportAnimations(rootUrl, sceneFilename, scene, overwriteAnimations, animationGroupLoadingMode, targetConverter, function (_scene) {
        resolve(_scene);
      }, onProgress, function (_scene, message, exception) {
        reject(exception || new Error(message));
      }, pluginExtension);
    });
  };
  /**
   * No logging while loading
   */


  SceneLoader.NO_LOGGING = 0;
  /**
   * Minimal logging while loading
   */

  SceneLoader.MINIMAL_LOGGING = 1;
  /**
   * Summary logging while loading
   */

  SceneLoader.SUMMARY_LOGGING = 2;
  /**
   * Detailled logging while loading
   */

  SceneLoader.DETAILED_LOGGING = 3; // Members

  /**
   * Event raised when a plugin is used to load a scene
   */

  SceneLoader.OnPluginActivatedObservable = new Observable();
  SceneLoader._registeredPlugins = {};
  SceneLoader._showingLoadingScreen = false;
  return SceneLoader;
}();

/**
 * Base implementation IShadowLight
 * It groups all the common behaviour in order to reduce dupplication and better follow the DRY pattern.
 */

var ShadowLight = function (_super) {
  __extends(ShadowLight, _super);

  function ShadowLight() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._needProjectionMatrixCompute = true;
    return _this;
  }

  ShadowLight.prototype._setPosition = function (value) {
    this._position = value;
  };

  Object.defineProperty(ShadowLight.prototype, "position", {
    /**
     * Sets the position the shadow will be casted from. Also use as the light position for both
     * point and spot lights.
     */
    get: function () {
      return this._position;
    },

    /**
     * Sets the position the shadow will be casted from. Also use as the light position for both
     * point and spot lights.
     */
    set: function (value) {
      this._setPosition(value);
    },
    enumerable: false,
    configurable: true
  });

  ShadowLight.prototype._setDirection = function (value) {
    this._direction = value;
  };

  Object.defineProperty(ShadowLight.prototype, "direction", {
    /**
     * In 2d mode (needCube being false), gets the direction used to cast the shadow.
     * Also use as the light direction on spot and directional lights.
     */
    get: function () {
      return this._direction;
    },

    /**
     * In 2d mode (needCube being false), sets the direction used to cast the shadow.
     * Also use as the light direction on spot and directional lights.
     */
    set: function (value) {
      this._setDirection(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ShadowLight.prototype, "shadowMinZ", {
    /**
     * Gets the shadow projection clipping minimum z value.
     */
    get: function () {
      return this._shadowMinZ;
    },

    /**
     * Sets the shadow projection clipping minimum z value.
     */
    set: function (value) {
      this._shadowMinZ = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ShadowLight.prototype, "shadowMaxZ", {
    /**
     * Sets the shadow projection clipping maximum z value.
     */
    get: function () {
      return this._shadowMaxZ;
    },

    /**
     * Gets the shadow projection clipping maximum z value.
     */
    set: function (value) {
      this._shadowMaxZ = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
   * @returns true if the information has been computed, false if it does not need to (no parenting)
   */

  ShadowLight.prototype.computeTransformedInformation = function () {
    if (this.parent && this.parent.getWorldMatrix) {
      if (!this.transformedPosition) {
        this.transformedPosition = Vector3.Zero();
      }

      Vector3.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this.transformedPosition); // In case the direction is present.

      if (this.direction) {
        if (!this.transformedDirection) {
          this.transformedDirection = Vector3.Zero();
        }

        Vector3.TransformNormalToRef(this.direction, this.parent.getWorldMatrix(), this.transformedDirection);
      }

      return true;
    }

    return false;
  };
  /**
   * Return the depth scale used for the shadow map.
   * @returns the depth scale.
   */


  ShadowLight.prototype.getDepthScale = function () {
    return 50.0;
  };
  /**
   * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
   * @param faceIndex The index of the face we are computed the direction to generate shadow
   * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
   */


  ShadowLight.prototype.getShadowDirection = function (faceIndex) {
    return this.transformedDirection ? this.transformedDirection : this.direction;
  };
  /**
   * Returns the ShadowLight absolute position in the World.
   * @returns the position vector in world space
   */


  ShadowLight.prototype.getAbsolutePosition = function () {
    return this.transformedPosition ? this.transformedPosition : this.position;
  };
  /**
   * Sets the ShadowLight direction toward the passed target.
   * @param target The point to target in local space
   * @returns the updated ShadowLight direction
   */


  ShadowLight.prototype.setDirectionToTarget = function (target) {
    this.direction = Vector3.Normalize(target.subtract(this.position));
    return this.direction;
  };
  /**
   * Returns the light rotation in euler definition.
   * @returns the x y z rotation in local space.
   */


  ShadowLight.prototype.getRotation = function () {
    this.direction.normalize();
    var xaxis = Vector3.Cross(this.direction, Axis.Y);
    var yaxis = Vector3.Cross(xaxis, this.direction);
    return Vector3.RotationFromAxis(xaxis, yaxis, this.direction);
  };
  /**
   * Returns whether or not the shadow generation require a cube texture or a 2d texture.
   * @returns true if a cube texture needs to be use
   */


  ShadowLight.prototype.needCube = function () {
    return false;
  };
  /**
   * Detects if the projection matrix requires to be recomputed this frame.
   * @returns true if it requires to be recomputed otherwise, false.
   */


  ShadowLight.prototype.needProjectionMatrixCompute = function () {
    return this._needProjectionMatrixCompute;
  };
  /**
   * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
   */


  ShadowLight.prototype.forceProjectionMatrixCompute = function () {
    this._needProjectionMatrixCompute = true;
  };
  /** @hidden */


  ShadowLight.prototype._initCache = function () {
    _super.prototype._initCache.call(this);

    this._cache.position = Vector3.Zero();
  };
  /** @hidden */


  ShadowLight.prototype._isSynchronized = function () {
    if (!this._cache.position.equals(this.position)) {
      return false;
    }

    return true;
  };
  /**
   * Computes the world matrix of the node
   * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
   * @returns the world matrix
   */


  ShadowLight.prototype.computeWorldMatrix = function (force) {
    if (!force && this.isSynchronized()) {
      this._currentRenderId = this.getScene().getRenderId();
      return this._worldMatrix;
    }

    this._updateCache();

    this._cache.position.copyFrom(this.position);

    if (!this._worldMatrix) {
      this._worldMatrix = Matrix.Identity();
    }

    Matrix.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix);

    if (this.parent && this.parent.getWorldMatrix) {
      this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(), this._worldMatrix);

      this._markSyncedWithParent();
    } // Cache the determinant


    this._worldMatrixDeterminantIsDirty = true;
    return this._worldMatrix;
  };
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */


  ShadowLight.prototype.getDepthMinZ = function (activeCamera) {
    return this.shadowMinZ !== undefined ? this.shadowMinZ : activeCamera.minZ;
  };
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */


  ShadowLight.prototype.getDepthMaxZ = function (activeCamera) {
    return this.shadowMaxZ !== undefined ? this.shadowMaxZ : activeCamera.maxZ;
  };
  /**
   * Sets the shadow projection matrix in parameter to the generated projection matrix.
   * @param matrix The materix to updated with the projection information
   * @param viewMatrix The transform matrix of the light
   * @param renderList The list of mesh to render in the map
   * @returns The current light
   */


  ShadowLight.prototype.setShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
    if (this.customProjectionMatrixBuilder) {
      this.customProjectionMatrixBuilder(viewMatrix, renderList, matrix);
    } else {
      this._setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }

    return this;
  };

  __decorate([serializeAsVector3()], ShadowLight.prototype, "position", null);

  __decorate([serializeAsVector3()], ShadowLight.prototype, "direction", null);

  __decorate([serialize()], ShadowLight.prototype, "shadowMinZ", null);

  __decorate([serialize()], ShadowLight.prototype, "shadowMaxZ", null);

  return ShadowLight;
}(Light);

Node.AddNodeConstructor("Light_Type_1", function (name, scene) {
  return function () {
    return new DirectionalLight(name, Vector3.Zero(), scene);
  };
});
/**
 * A directional light is defined by a direction (what a surprise!).
 * The light is emitted from everywhere in the specified direction, and has an infinite range.
 * An example of a directional light is when a distance planet is lit by the apparently parallel lines of light from its sun. Light in a downward direction will light the top of an object.
 * Documentation: https://doc.babylonjs.com/babylon101/lights
 */

var DirectionalLight = function (_super) {
  __extends(DirectionalLight, _super);
  /**
   * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
   * The directional light is emitted from everywhere in the given direction.
   * It can cast shadows.
   * Documentation : https://doc.babylonjs.com/babylon101/lights
   * @param name The friendly name of the light
   * @param direction The direction of the light
   * @param scene The scene the light belongs to
   */


  function DirectionalLight(name, direction, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this._shadowFrustumSize = 0;
    _this._shadowOrthoScale = 0.1;
    /**
     * Automatically compute the projection matrix to best fit (including all the casters)
     * on each frame.
     */

    _this.autoUpdateExtends = true;
    /**
     * Automatically compute the shadowMinZ and shadowMaxZ for the projection matrix to best fit (including all the casters)
     * on each frame. autoUpdateExtends must be set to true for this to work
     */

    _this.autoCalcShadowZBounds = false; // Cache

    _this._orthoLeft = Number.MAX_VALUE;
    _this._orthoRight = Number.MIN_VALUE;
    _this._orthoTop = Number.MIN_VALUE;
    _this._orthoBottom = Number.MAX_VALUE;
    _this.position = direction.scale(-1.0);
    _this.direction = direction;
    return _this;
  }

  Object.defineProperty(DirectionalLight.prototype, "shadowFrustumSize", {
    /**
     * Fix frustum size for the shadow generation. This is disabled if the value is 0.
     */
    get: function () {
      return this._shadowFrustumSize;
    },

    /**
     * Specifies a fix frustum size for the shadow generation.
     */
    set: function (value) {
      this._shadowFrustumSize = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DirectionalLight.prototype, "shadowOrthoScale", {
    /**
     * Gets the shadow projection scale against the optimal computed one.
     * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
     * This does not impact in fixed frustum size (shadowFrustumSize being set)
     */
    get: function () {
      return this._shadowOrthoScale;
    },

    /**
     * Sets the shadow projection scale against the optimal computed one.
     * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
     * This does not impact in fixed frustum size (shadowFrustumSize being set)
     */
    set: function (value) {
      this._shadowOrthoScale = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Returns the string "DirectionalLight".
   * @return The class name
   */

  DirectionalLight.prototype.getClassName = function () {
    return "DirectionalLight";
  };
  /**
   * Returns the integer 1.
   * @return The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */


  DirectionalLight.prototype.getTypeID = function () {
    return Light.LIGHTTYPEID_DIRECTIONALLIGHT;
  };
  /**
   * Sets the passed matrix "matrix" as projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   */


  DirectionalLight.prototype._setDefaultShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
    if (this.shadowFrustumSize > 0) {
      this._setDefaultFixedFrustumShadowProjectionMatrix(matrix);
    } else {
      this._setDefaultAutoExtendShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }
  };
  /**
   * Sets the passed matrix "matrix" as fixed frustum projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   */


  DirectionalLight.prototype._setDefaultFixedFrustumShadowProjectionMatrix = function (matrix) {
    var activeCamera = this.getScene().activeCamera;

    if (!activeCamera) {
      return;
    }

    Matrix.OrthoLHToRef(this.shadowFrustumSize, this.shadowFrustumSize, this.shadowMinZ !== undefined ? this.shadowMinZ : activeCamera.minZ, this.shadowMaxZ !== undefined ? this.shadowMaxZ : activeCamera.maxZ, matrix);
  };
  /**
   * Sets the passed matrix "matrix" as auto extend projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   */


  DirectionalLight.prototype._setDefaultAutoExtendShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
    var activeCamera = this.getScene().activeCamera;

    if (!activeCamera) {
      return;
    } // Check extends


    if (this.autoUpdateExtends || this._orthoLeft === Number.MAX_VALUE) {
      var tempVector3 = Vector3.Zero();
      this._orthoLeft = Number.MAX_VALUE;
      this._orthoRight = Number.MIN_VALUE;
      this._orthoTop = Number.MIN_VALUE;
      this._orthoBottom = Number.MAX_VALUE;
      var shadowMinZ = Number.MAX_VALUE;
      var shadowMaxZ = Number.MIN_VALUE;

      for (var meshIndex = 0; meshIndex < renderList.length; meshIndex++) {
        var mesh = renderList[meshIndex];

        if (!mesh) {
          continue;
        }

        var boundingInfo = mesh.getBoundingInfo();
        var boundingBox = boundingInfo.boundingBox;

        for (var index = 0; index < boundingBox.vectorsWorld.length; index++) {
          Vector3.TransformCoordinatesToRef(boundingBox.vectorsWorld[index], viewMatrix, tempVector3);

          if (tempVector3.x < this._orthoLeft) {
            this._orthoLeft = tempVector3.x;
          }

          if (tempVector3.y < this._orthoBottom) {
            this._orthoBottom = tempVector3.y;
          }

          if (tempVector3.x > this._orthoRight) {
            this._orthoRight = tempVector3.x;
          }

          if (tempVector3.y > this._orthoTop) {
            this._orthoTop = tempVector3.y;
          }

          if (this.autoCalcShadowZBounds) {
            if (tempVector3.z < shadowMinZ) {
              shadowMinZ = tempVector3.z;
            }

            if (tempVector3.z > shadowMaxZ) {
              shadowMaxZ = tempVector3.z;
            }
          }
        }
      }

      if (this.autoCalcShadowZBounds) {
        this._shadowMinZ = shadowMinZ;
        this._shadowMaxZ = shadowMaxZ;
      }
    }

    var xOffset = this._orthoRight - this._orthoLeft;
    var yOffset = this._orthoTop - this._orthoBottom;
    Matrix.OrthoOffCenterLHToRef(this._orthoLeft - xOffset * this.shadowOrthoScale, this._orthoRight + xOffset * this.shadowOrthoScale, this._orthoBottom - yOffset * this.shadowOrthoScale, this._orthoTop + yOffset * this.shadowOrthoScale, this.shadowMinZ !== undefined ? this.shadowMinZ : activeCamera.minZ, this.shadowMaxZ !== undefined ? this.shadowMaxZ : activeCamera.maxZ, matrix);
  };

  DirectionalLight.prototype._buildUniformLayout = function () {
    this._uniformBuffer.addUniform("vLightData", 4);

    this._uniformBuffer.addUniform("vLightDiffuse", 4);

    this._uniformBuffer.addUniform("vLightSpecular", 4);

    this._uniformBuffer.addUniform("shadowsInfo", 3);

    this._uniformBuffer.addUniform("depthValues", 2);

    this._uniformBuffer.create();
  };
  /**
   * Sets the passed Effect object with the DirectionalLight transformed position (or position if not parented) and the passed name.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The directional light
   */


  DirectionalLight.prototype.transferToEffect = function (effect, lightIndex) {
    if (this.computeTransformedInformation()) {
      this._uniformBuffer.updateFloat4("vLightData", this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z, 1, lightIndex);

      return this;
    }

    this._uniformBuffer.updateFloat4("vLightData", this.direction.x, this.direction.y, this.direction.z, 1, lightIndex);

    return this;
  };

  DirectionalLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
    if (this.computeTransformedInformation()) {
      effect.setFloat3(lightDataUniformName, this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z);
      return this;
    }

    effect.setFloat3(lightDataUniformName, this.direction.x, this.direction.y, this.direction.z);
    return this;
  };
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */


  DirectionalLight.prototype.getDepthMinZ = function (activeCamera) {
    return 1;
  };
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */


  DirectionalLight.prototype.getDepthMaxZ = function (activeCamera) {
    return 1;
  };
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */


  DirectionalLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
    defines["DIRLIGHT" + lightIndex] = true;
  };

  __decorate([serialize()], DirectionalLight.prototype, "shadowFrustumSize", null);

  __decorate([serialize()], DirectionalLight.prototype, "shadowOrthoScale", null);

  __decorate([serialize()], DirectionalLight.prototype, "autoUpdateExtends", void 0);

  __decorate([serialize()], DirectionalLight.prototype, "autoCalcShadowZBounds", void 0);

  return DirectionalLight;
}(ShadowLight);

Node.AddNodeConstructor("Light_Type_2", function (name, scene) {
  return function () {
    return new SpotLight(name, Vector3.Zero(), Vector3.Zero(), 0, 0, scene);
  };
});
/**
 * A spot light is defined by a position, a direction, an angle, and an exponent.
 * These values define a cone of light starting from the position, emitting toward the direction.
 * The angle, in radians, defines the size (field of illumination) of the spotlight's conical beam,
 * and the exponent defines the speed of the decay of the light with distance (reach).
 * Documentation: https://doc.babylonjs.com/babylon101/lights
 */

var SpotLight = function (_super) {
  __extends(SpotLight, _super);
  /**
   * Creates a SpotLight object in the scene. A spot light is a simply light oriented cone.
   * It can cast shadows.
   * Documentation : https://doc.babylonjs.com/babylon101/lights
   * @param name The light friendly name
   * @param position The position of the spot light in the scene
   * @param direction The direction of the light in the scene
   * @param angle The cone angle of the light in Radians
   * @param exponent The light decay speed with the distance from the emission spot
   * @param scene The scene the lights belongs to
   */


  function SpotLight(name, position, direction, angle, exponent, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this._innerAngle = 0;
    _this._projectionTextureMatrix = Matrix.Zero();
    _this._projectionTextureLightNear = 1e-6;
    _this._projectionTextureLightFar = 1000.0;
    _this._projectionTextureUpDirection = Vector3.Up();
    _this._projectionTextureViewLightDirty = true;
    _this._projectionTextureProjectionLightDirty = true;
    _this._projectionTextureDirty = true;
    _this._projectionTextureViewTargetVector = Vector3.Zero();
    _this._projectionTextureViewLightMatrix = Matrix.Zero();
    _this._projectionTextureProjectionLightMatrix = Matrix.Zero();
    _this._projectionTextureScalingMatrix = Matrix.FromValues(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);
    _this.position = position;
    _this.direction = direction;
    _this.angle = angle;
    _this.exponent = exponent;
    return _this;
  }

  Object.defineProperty(SpotLight.prototype, "angle", {
    /**
     * Gets the cone angle of the spot light in Radians.
     */
    get: function () {
      return this._angle;
    },

    /**
     * Sets the cone angle of the spot light in Radians.
     */
    set: function (value) {
      this._angle = value;
      this._cosHalfAngle = Math.cos(value * 0.5);
      this._projectionTextureProjectionLightDirty = true;
      this.forceProjectionMatrixCompute();

      this._computeAngleValues();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "innerAngle", {
    /**
     * Only used in gltf falloff mode, this defines the angle where
     * the directional falloff will start before cutting at angle which could be seen
     * as outer angle.
     */
    get: function () {
      return this._innerAngle;
    },

    /**
     * Only used in gltf falloff mode, this defines the angle where
     * the directional falloff will start before cutting at angle which could be seen
     * as outer angle.
     */
    set: function (value) {
      this._innerAngle = value;

      this._computeAngleValues();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "shadowAngleScale", {
    /**
     * Allows scaling the angle of the light for shadow generation only.
     */
    get: function () {
      return this._shadowAngleScale;
    },

    /**
     * Allows scaling the angle of the light for shadow generation only.
     */
    set: function (value) {
      this._shadowAngleScale = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "projectionTextureMatrix", {
    /**
    * Allows reading the projecton texture
    */
    get: function () {
      return this._projectionTextureMatrix;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "projectionTextureLightNear", {
    /**
     * Gets the near clip of the Spotlight for texture projection.
     */
    get: function () {
      return this._projectionTextureLightNear;
    },

    /**
     * Sets the near clip of the Spotlight for texture projection.
     */
    set: function (value) {
      this._projectionTextureLightNear = value;
      this._projectionTextureProjectionLightDirty = true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "projectionTextureLightFar", {
    /**
     * Gets the far clip of the Spotlight for texture projection.
     */
    get: function () {
      return this._projectionTextureLightFar;
    },

    /**
     * Sets the far clip of the Spotlight for texture projection.
     */
    set: function (value) {
      this._projectionTextureLightFar = value;
      this._projectionTextureProjectionLightDirty = true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "projectionTextureUpDirection", {
    /**
     * Gets the Up vector of the Spotlight for texture projection.
     */
    get: function () {
      return this._projectionTextureUpDirection;
    },

    /**
     * Sets the Up vector of the Spotlight for texture projection.
     */
    set: function (value) {
      this._projectionTextureUpDirection = value;
      this._projectionTextureProjectionLightDirty = true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SpotLight.prototype, "projectionTexture", {
    /**
     * Gets the projection texture of the light.
    */
    get: function () {
      return this._projectionTexture;
    },

    /**
    * Sets the projection texture of the light.
    */
    set: function (value) {
      var _this = this;

      if (this._projectionTexture === value) {
        return;
      }

      this._projectionTexture = value;
      this._projectionTextureDirty = true;

      if (this._projectionTexture && !this._projectionTexture.isReady()) {
        if (SpotLight._IsProceduralTexture(this._projectionTexture)) {
          this._projectionTexture.getEffect().executeWhenCompiled(function () {
            _this._markMeshesAsLightDirty();
          });
        } else if (SpotLight._IsTexture(this._projectionTexture)) {
          this._projectionTexture.onLoadObservable.addOnce(function () {
            _this._markMeshesAsLightDirty();
          });
        }
      }
    },
    enumerable: false,
    configurable: true
  });

  SpotLight._IsProceduralTexture = function (texture) {
    return texture.onGeneratedObservable !== undefined;
  };

  SpotLight._IsTexture = function (texture) {
    return texture.onLoadObservable !== undefined;
  };
  /**
   * Returns the string "SpotLight".
   * @returns the class name
   */


  SpotLight.prototype.getClassName = function () {
    return "SpotLight";
  };
  /**
   * Returns the integer 2.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */


  SpotLight.prototype.getTypeID = function () {
    return Light.LIGHTTYPEID_SPOTLIGHT;
  };
  /**
   * Overrides the direction setter to recompute the projection texture view light Matrix.
   */


  SpotLight.prototype._setDirection = function (value) {
    _super.prototype._setDirection.call(this, value);

    this._projectionTextureViewLightDirty = true;
  };
  /**
   * Overrides the position setter to recompute the projection texture view light Matrix.
   */


  SpotLight.prototype._setPosition = function (value) {
    _super.prototype._setPosition.call(this, value);

    this._projectionTextureViewLightDirty = true;
  };
  /**
   * Sets the passed matrix "matrix" as perspective projection matrix for the shadows and the passed view matrix with the fov equal to the SpotLight angle and and aspect ratio of 1.0.
   * Returns the SpotLight.
   */


  SpotLight.prototype._setDefaultShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
    var activeCamera = this.getScene().activeCamera;

    if (!activeCamera) {
      return;
    }

    this._shadowAngleScale = this._shadowAngleScale || 1;
    var angle = this._shadowAngleScale * this._angle;
    Matrix.PerspectiveFovLHToRef(angle, 1.0, this.getDepthMinZ(activeCamera), this.getDepthMaxZ(activeCamera), matrix);
  };

  SpotLight.prototype._computeProjectionTextureViewLightMatrix = function () {
    this._projectionTextureViewLightDirty = false;
    this._projectionTextureDirty = true;
    this.position.addToRef(this.direction, this._projectionTextureViewTargetVector);
    Matrix.LookAtLHToRef(this.position, this._projectionTextureViewTargetVector, this._projectionTextureUpDirection, this._projectionTextureViewLightMatrix);
  };

  SpotLight.prototype._computeProjectionTextureProjectionLightMatrix = function () {
    this._projectionTextureProjectionLightDirty = false;
    this._projectionTextureDirty = true;
    var light_far = this.projectionTextureLightFar;
    var light_near = this.projectionTextureLightNear;
    var P = light_far / (light_far - light_near);
    var Q = -P * light_near;
    var S = 1.0 / Math.tan(this._angle / 2.0);
    var A = 1.0;
    Matrix.FromValuesToRef(S / A, 0.0, 0.0, 0.0, 0.0, S, 0.0, 0.0, 0.0, 0.0, P, 1.0, 0.0, 0.0, Q, 0.0, this._projectionTextureProjectionLightMatrix);
  };
  /**
   * Main function for light texture projection matrix computing.
   */


  SpotLight.prototype._computeProjectionTextureMatrix = function () {
    this._projectionTextureDirty = false;

    this._projectionTextureViewLightMatrix.multiplyToRef(this._projectionTextureProjectionLightMatrix, this._projectionTextureMatrix);

    if (this._projectionTexture instanceof Texture) {
      var u = this._projectionTexture.uScale / 2.0;
      var v = this._projectionTexture.vScale / 2.0;
      Matrix.FromValuesToRef(u, 0.0, 0.0, 0.0, 0.0, v, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0, this._projectionTextureScalingMatrix);
    }

    this._projectionTextureMatrix.multiplyToRef(this._projectionTextureScalingMatrix, this._projectionTextureMatrix);
  };

  SpotLight.prototype._buildUniformLayout = function () {
    this._uniformBuffer.addUniform("vLightData", 4);

    this._uniformBuffer.addUniform("vLightDiffuse", 4);

    this._uniformBuffer.addUniform("vLightSpecular", 4);

    this._uniformBuffer.addUniform("vLightDirection", 3);

    this._uniformBuffer.addUniform("vLightFalloff", 4);

    this._uniformBuffer.addUniform("shadowsInfo", 3);

    this._uniformBuffer.addUniform("depthValues", 2);

    this._uniformBuffer.create();
  };

  SpotLight.prototype._computeAngleValues = function () {
    this._lightAngleScale = 1.0 / Math.max(0.001, Math.cos(this._innerAngle * 0.5) - this._cosHalfAngle);
    this._lightAngleOffset = -this._cosHalfAngle * this._lightAngleScale;
  };
  /**
   * Sets the passed Effect "effect" with the Light textures.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The light
   */


  SpotLight.prototype.transferTexturesToEffect = function (effect, lightIndex) {
    if (this.projectionTexture && this.projectionTexture.isReady()) {
      if (this._projectionTextureViewLightDirty) {
        this._computeProjectionTextureViewLightMatrix();
      }

      if (this._projectionTextureProjectionLightDirty) {
        this._computeProjectionTextureProjectionLightMatrix();
      }

      if (this._projectionTextureDirty) {
        this._computeProjectionTextureMatrix();
      }

      effect.setMatrix("textureProjectionMatrix" + lightIndex, this._projectionTextureMatrix);
      effect.setTexture("projectionLightSampler" + lightIndex, this.projectionTexture);
    }

    return this;
  };
  /**
   * Sets the passed Effect object with the SpotLight transfomed position (or position if not parented) and normalized direction.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The spot light
   */


  SpotLight.prototype.transferToEffect = function (effect, lightIndex) {
    var normalizeDirection;

    if (this.computeTransformedInformation()) {
      this._uniformBuffer.updateFloat4("vLightData", this.transformedPosition.x, this.transformedPosition.y, this.transformedPosition.z, this.exponent, lightIndex);

      normalizeDirection = Vector3.Normalize(this.transformedDirection);
    } else {
      this._uniformBuffer.updateFloat4("vLightData", this.position.x, this.position.y, this.position.z, this.exponent, lightIndex);

      normalizeDirection = Vector3.Normalize(this.direction);
    }

    this._uniformBuffer.updateFloat4("vLightDirection", normalizeDirection.x, normalizeDirection.y, normalizeDirection.z, this._cosHalfAngle, lightIndex);

    this._uniformBuffer.updateFloat4("vLightFalloff", this.range, this._inverseSquaredRange, this._lightAngleScale, this._lightAngleOffset, lightIndex);

    return this;
  };

  SpotLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
    var normalizeDirection;

    if (this.computeTransformedInformation()) {
      normalizeDirection = Vector3.Normalize(this.transformedDirection);
    } else {
      normalizeDirection = Vector3.Normalize(this.direction);
    }

    if (this.getScene().useRightHandedSystem) {
      effect.setFloat3(lightDataUniformName, -normalizeDirection.x, -normalizeDirection.y, -normalizeDirection.z);
    } else {
      effect.setFloat3(lightDataUniformName, normalizeDirection.x, normalizeDirection.y, normalizeDirection.z);
    }

    return this;
  };
  /**
   * Disposes the light and the associated resources.
   */


  SpotLight.prototype.dispose = function () {
    _super.prototype.dispose.call(this);

    if (this._projectionTexture) {
      this._projectionTexture.dispose();
    }
  };
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */


  SpotLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
    defines["SPOTLIGHT" + lightIndex] = true;
    defines["PROJECTEDLIGHTTEXTURE" + lightIndex] = this.projectionTexture && this.projectionTexture.isReady() ? true : false;
  };

  __decorate([serialize()], SpotLight.prototype, "angle", null);

  __decorate([serialize()], SpotLight.prototype, "innerAngle", null);

  __decorate([serialize()], SpotLight.prototype, "shadowAngleScale", null);

  __decorate([serialize()], SpotLight.prototype, "exponent", void 0);

  __decorate([serialize()], SpotLight.prototype, "projectionTextureLightNear", null);

  __decorate([serialize()], SpotLight.prototype, "projectionTextureLightFar", null);

  __decorate([serialize()], SpotLight.prototype, "projectionTextureUpDirection", null);

  __decorate([serializeAsTexture("projectedLightTexture")], SpotLight.prototype, "_projectionTexture", void 0);

  return SpotLight;
}(ShadowLight);

/**
 * Class for creating a cube texture
 */

var CubeTexture = function (_super) {
  __extends(CubeTexture, _super);
  /**
   * Creates a cube texture to use with reflection for instance. It can be based upon dds or six images as well
   * as prefiltered data.
   * @param rootUrl defines the url of the texture or the root name of the six images
   * @param null defines the scene or engine the texture is attached to
   * @param extensions defines the suffixes add to the picture name in case six images are in use like _px.jpg...
   * @param noMipmap defines if mipmaps should be created or not
   * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
   * @param onLoad defines a callback triggered at the end of the file load if no errors occured
   * @param onError defines a callback triggered in case of error during load
   * @param format defines the internal format to use for the texture once loaded
   * @param prefiltered defines whether or not the texture is created from prefiltered data
   * @param forcedExtension defines the extensions to use (force a special type of file to load) in case it is different from the file name
   * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
   * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
   * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
   * @param loaderOptions options to be passed to the loader
   * @return the cube texture
   */


  function CubeTexture(rootUrl, sceneOrEngine, extensions, noMipmap, files, onLoad, onError, format, prefiltered, forcedExtension, createPolynomials, lodScale, lodOffset, loaderOptions) {
    if (extensions === void 0) {
      extensions = null;
    }

    if (noMipmap === void 0) {
      noMipmap = false;
    }

    if (files === void 0) {
      files = null;
    }

    if (onLoad === void 0) {
      onLoad = null;
    }

    if (onError === void 0) {
      onError = null;
    }

    if (format === void 0) {
      format = 5;
    }

    if (prefiltered === void 0) {
      prefiltered = false;
    }

    if (forcedExtension === void 0) {
      forcedExtension = null;
    }

    if (createPolynomials === void 0) {
      createPolynomials = false;
    }

    if (lodScale === void 0) {
      lodScale = 0.8;
    }

    if (lodOffset === void 0) {
      lodOffset = 0;
    }

    var _a;

    var _this = _super.call(this, sceneOrEngine) || this;
    /**
     * Observable triggered once the texture has been loaded.
     */


    _this.onLoadObservable = new Observable();
    /**
     * Gets or sets the center of the bounding box associated with the cube texture.
     * It must define where the camera used to render the texture was set
     * @see https://doc.babylonjs.com/how_to/reflect#using-local-cubemap-mode
     */

    _this.boundingBoxPosition = Vector3.Zero();
    _this._rotationY = 0;
    _this._files = null;
    _this._forcedExtension = null;
    _this._extensions = null;
    _this.name = rootUrl;
    _this.url = rootUrl;
    _this._noMipmap = noMipmap;
    _this.hasAlpha = false;
    _this._format = format;
    _this.isCube = true;
    _this._textureMatrix = Matrix.Identity();
    _this._createPolynomials = createPolynomials;
    _this.coordinatesMode = Texture.CUBIC_MODE;
    _this._extensions = extensions;
    _this._files = files;
    _this._forcedExtension = forcedExtension;
    _this._loaderOptions = loaderOptions;

    if (!rootUrl && !files) {
      return _this;
    }

    var lastDot = rootUrl.lastIndexOf(".");
    var extension = forcedExtension ? forcedExtension : lastDot > -1 ? rootUrl.substring(lastDot).toLowerCase() : "";
    var isDDS = extension === ".dds";
    var isEnv = extension === ".env";

    if (isEnv) {
      _this.gammaSpace = false;
      _this._prefiltered = false;
      _this.anisotropicFilteringLevel = 1;
    } else {
      _this._prefiltered = prefiltered;

      if (prefiltered) {
        _this.gammaSpace = false;
        _this.anisotropicFilteringLevel = 1;
      }
    }

    _this._texture = _this._getFromCache(rootUrl, noMipmap);

    if (!files) {
      if (!isEnv && !isDDS && !extensions) {
        extensions = ["_px.jpg", "_py.jpg", "_pz.jpg", "_nx.jpg", "_ny.jpg", "_nz.jpg"];
      }

      files = [];

      if (extensions) {
        for (var index = 0; index < extensions.length; index++) {
          files.push(rootUrl + extensions[index]);
        }
      }
    }

    _this._files = files;

    var onLoadProcessing = function () {
      _this.onLoadObservable.notifyObservers(_this);

      if (onLoad) {
        onLoad();
      }
    };

    if (!_this._texture) {
      var scene = _this.getScene();

      if (!(scene === null || scene === void 0 ? void 0 : scene.useDelayedTextureLoading)) {
        if (prefiltered) {
          _this._texture = _this._getEngine().createPrefilteredCubeTexture(rootUrl, scene, lodScale, lodOffset, onLoad, onError, format, forcedExtension, _this._createPolynomials);
        } else {
          _this._texture = _this._getEngine().createCubeTexture(rootUrl, scene, files, noMipmap, onLoad, onError, _this._format, forcedExtension, false, lodScale, lodOffset, null, loaderOptions);
        }

        (_a = _this._texture) === null || _a === void 0 ? void 0 : _a.onLoadedObservable.add(function () {
          return _this.onLoadObservable.notifyObservers(_this);
        });
      } else {
        _this.delayLoadState = 4;
      }
    } else {
      if (_this._texture.isReady) {
        Tools.SetImmediate(function () {
          return onLoadProcessing();
        });
      } else {
        _this._texture.onLoadedObservable.add(function () {
          return onLoadProcessing();
        });
      }
    }

    return _this;
  }

  Object.defineProperty(CubeTexture.prototype, "boundingBoxSize", {
    /**
     * Returns the bounding box size
     * @see https://doc.babylonjs.com/how_to/reflect#using-local-cubemap-mode
     */
    get: function () {
      return this._boundingBoxSize;
    },

    /**
     * Gets or sets the size of the bounding box associated with the cube texture
     * When defined, the cubemap will switch to local mode
     * @see https://community.arm.com/graphics/b/blog/posts/reflections-based-on-local-cubemaps-in-unity
     * @example https://www.babylonjs-playground.com/#RNASML
     */
    set: function (value) {
      if (this._boundingBoxSize && this._boundingBoxSize.equals(value)) {
        return;
      }

      this._boundingBoxSize = value;
      var scene = this.getScene();

      if (scene) {
        scene.markAllMaterialsAsDirty(1);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CubeTexture.prototype, "rotationY", {
    /**
     * Gets texture matrix rotation angle around Y axis radians.
     */
    get: function () {
      return this._rotationY;
    },

    /**
     * Sets texture matrix rotation angle around Y axis in radians.
     */
    set: function (value) {
      this._rotationY = value;
      this.setReflectionTextureMatrix(Matrix.RotationY(this._rotationY));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CubeTexture.prototype, "noMipmap", {
    /**
     * Are mip maps generated for this texture or not.
     */
    get: function () {
      return this._noMipmap;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Creates a cube texture from an array of image urls
   * @param files defines an array of image urls
   * @param scene defines the hosting scene
   * @param noMipmap specifies if mip maps are not used
   * @returns a cube texture
   */

  CubeTexture.CreateFromImages = function (files, scene, noMipmap) {
    var rootUrlKey = "";
    files.forEach(function (url) {
      return rootUrlKey += url;
    });
    return new CubeTexture(rootUrlKey, scene, null, noMipmap, files);
  };
  /**
   * Creates and return a texture created from prefilterd data by tools like IBL Baker or Lys.
   * @param url defines the url of the prefiltered texture
   * @param scene defines the scene the texture is attached to
   * @param forcedExtension defines the extension of the file if different from the url
   * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
   * @return the prefiltered texture
   */


  CubeTexture.CreateFromPrefilteredData = function (url, scene, forcedExtension, createPolynomials) {
    if (forcedExtension === void 0) {
      forcedExtension = null;
    }

    if (createPolynomials === void 0) {
      createPolynomials = true;
    }

    var oldValue = scene.useDelayedTextureLoading;
    scene.useDelayedTextureLoading = false;
    var result = new CubeTexture(url, scene, null, false, null, null, null, undefined, true, forcedExtension, createPolynomials);
    scene.useDelayedTextureLoading = oldValue;
    return result;
  };
  /**
   * Get the current class name of the texture useful for serialization or dynamic coding.
   * @returns "CubeTexture"
   */


  CubeTexture.prototype.getClassName = function () {
    return "CubeTexture";
  };
  /**
   * Update the url (and optional buffer) of this texture if url was null during construction.
   * @param url the url of the texture
   * @param forcedExtension defines the extension to use
   * @param onLoad callback called when the texture is loaded  (defaults to null)
   * @param prefiltered Defines whether the updated texture is prefiltered or not
   */


  CubeTexture.prototype.updateURL = function (url, forcedExtension, onLoad, prefiltered) {
    var _a;

    if (prefiltered === void 0) {
      prefiltered = false;
    }

    if (this.url) {
      this.releaseInternalTexture();
      (_a = this.getScene()) === null || _a === void 0 ? void 0 : _a.markAllMaterialsAsDirty(1);
    }

    if (!this.name || StringTools.StartsWith(this.name, "data:")) {
      this.name = url;
    }

    this.url = url;
    this.delayLoadState = 4;
    this._prefiltered = prefiltered;

    if (this._prefiltered) {
      this.gammaSpace = false;
      this.anisotropicFilteringLevel = 1;
    }

    this._forcedExtension = forcedExtension || null;

    if (onLoad) {
      this._delayedOnLoad = onLoad;
    }

    this.delayLoad(forcedExtension);
  };
  /**
   * Delays loading of the cube texture
   * @param forcedExtension defines the extension to use
   */


  CubeTexture.prototype.delayLoad = function (forcedExtension) {
    var _this = this;

    var _a;

    if (this.delayLoadState !== 4) {
      return;
    }

    this.delayLoadState = 1;
    this._texture = this._getFromCache(this.url, this._noMipmap);

    if (!this._texture) {
      var scene = this.getScene();

      if (this._prefiltered) {
        this._texture = this._getEngine().createPrefilteredCubeTexture(this.url, scene, 0.8, 0, this._delayedOnLoad, undefined, this._format, forcedExtension, this._createPolynomials);
      } else {
        this._texture = this._getEngine().createCubeTexture(this.url, scene, this._files, this._noMipmap, this._delayedOnLoad, null, this._format, forcedExtension, false, 0, 0, null, this._loaderOptions);
      }

      (_a = this._texture) === null || _a === void 0 ? void 0 : _a.onLoadedObservable.add(function () {
        return _this.onLoadObservable.notifyObservers(_this);
      });
    }
  };
  /**
   * Returns the reflection texture matrix
   * @returns the reflection texture matrix
   */


  CubeTexture.prototype.getReflectionTextureMatrix = function () {
    return this._textureMatrix;
  };
  /**
   * Sets the reflection texture matrix
   * @param value Reflection texture matrix
   */


  CubeTexture.prototype.setReflectionTextureMatrix = function (value) {
    var _this = this;

    var _a;

    if (value.updateFlag === this._textureMatrix.updateFlag) {
      return;
    }

    if (value.isIdentity() !== this._textureMatrix.isIdentity()) {
      (_a = this.getScene()) === null || _a === void 0 ? void 0 : _a.markAllMaterialsAsDirty(1, function (mat) {
        return mat.getActiveTextures().indexOf(_this) !== -1;
      });
    }

    this._textureMatrix = value;
  };
  /**
   * Parses text to create a cube texture
   * @param parsedTexture define the serialized text to read from
   * @param scene defines the hosting scene
   * @param rootUrl defines the root url of the cube texture
   * @returns a cube texture
   */


  CubeTexture.Parse = function (parsedTexture, scene, rootUrl) {
    var texture = SerializationHelper.Parse(function () {
      var prefiltered = false;

      if (parsedTexture.prefiltered) {
        prefiltered = parsedTexture.prefiltered;
      }

      return new CubeTexture(rootUrl + parsedTexture.name, scene, parsedTexture.extensions, false, parsedTexture.files || null, null, null, undefined, prefiltered, parsedTexture.forcedExtension);
    }, parsedTexture, scene); // Local Cubemaps

    if (parsedTexture.boundingBoxPosition) {
      texture.boundingBoxPosition = Vector3.FromArray(parsedTexture.boundingBoxPosition);
    }

    if (parsedTexture.boundingBoxSize) {
      texture.boundingBoxSize = Vector3.FromArray(parsedTexture.boundingBoxSize);
    } // Animations


    if (parsedTexture.animations) {
      for (var animationIndex = 0; animationIndex < parsedTexture.animations.length; animationIndex++) {
        var parsedAnimation = parsedTexture.animations[animationIndex];

        var internalClass = _TypeStore.GetClass("BABYLON.Animation");

        if (internalClass) {
          texture.animations.push(internalClass.Parse(parsedAnimation));
        }
      }
    }

    return texture;
  };
  /**
   * Makes a clone, or deep copy, of the cube texture
   * @returns a new cube texture
   */


  CubeTexture.prototype.clone = function () {
    var _this = this;

    var uniqueId = 0;
    var newCubeTexture = SerializationHelper.Clone(function () {
      var cubeTexture = new CubeTexture(_this.url, _this.getScene() || _this._getEngine(), _this._extensions, _this._noMipmap, _this._files);
      uniqueId = cubeTexture.uniqueId;
      return cubeTexture;
    }, this);
    newCubeTexture.uniqueId = uniqueId;
    return newCubeTexture;
  };

  __decorate([serialize()], CubeTexture.prototype, "url", void 0);

  __decorate([serialize("rotationY")], CubeTexture.prototype, "rotationY", null);

  __decorate([serialize("files")], CubeTexture.prototype, "_files", void 0);

  __decorate([serialize("forcedExtension")], CubeTexture.prototype, "_forcedExtension", void 0);

  __decorate([serialize("extensions")], CubeTexture.prototype, "_extensions", void 0);

  __decorate([serializeAsMatrix("textureMatrix")], CubeTexture.prototype, "_textureMatrix", void 0);

  return CubeTexture;
}(BaseTexture);
Texture._CubeTextureParser = CubeTexture.Parse; // Some exporters relies on Tools.Instantiate

_TypeStore.RegisteredTypes["BABYLON.CubeTexture"] = CubeTexture;

/**
 * Helper class to push actions to a pool of workers.
 */
var WorkerPool = function () {
  /**
   * Constructor
   * @param workers Array of workers to use for actions
   */
  function WorkerPool(workers) {
    this._pendingActions = new Array();
    this._workerInfos = workers.map(function (worker) {
      return {
        worker: worker,
        active: false
      };
    });
  }
  /**
   * Terminates all workers and clears any pending actions.
   */


  WorkerPool.prototype.dispose = function () {
    for (var _i = 0, _a = this._workerInfos; _i < _a.length; _i++) {
      var workerInfo = _a[_i];
      workerInfo.worker.terminate();
    }

    this._workerInfos = [];
    this._pendingActions = [];
  };
  /**
   * Pushes an action to the worker pool. If all the workers are active, the action will be
   * pended until a worker has completed its action.
   * @param action The action to perform. Call onComplete when the action is complete.
   */


  WorkerPool.prototype.push = function (action) {
    for (var _i = 0, _a = this._workerInfos; _i < _a.length; _i++) {
      var workerInfo = _a[_i];

      if (!workerInfo.active) {
        this._execute(workerInfo, action);

        return;
      }
    }

    this._pendingActions.push(action);
  };

  WorkerPool.prototype._execute = function (workerInfo, action) {
    var _this = this;

    workerInfo.active = true;
    action(workerInfo.worker, function () {
      workerInfo.active = false;

      var nextAction = _this._pendingActions.shift();

      if (nextAction) {
        _this._execute(workerInfo, nextAction);
      }
    });
  };

  return WorkerPool;
}();

Node.AddNodeConstructor("Light_Type_0", function (name, scene) {
  return function () {
    return new PointLight(name, Vector3.Zero(), scene);
  };
});
/**
 * A point light is a light defined by an unique point in world space.
 * The light is emitted in every direction from this point.
 * A good example of a point light is a standard light bulb.
 * Documentation: https://doc.babylonjs.com/babylon101/lights
 */

var PointLight = function (_super) {
  __extends(PointLight, _super);
  /**
   * Creates a PointLight object from the passed name and position (Vector3) and adds it in the scene.
   * A PointLight emits the light in every direction.
   * It can cast shadows.
   * If the scene camera is already defined and you want to set your PointLight at the camera position, just set it :
   * ```javascript
   * var pointLight = new PointLight("pl", camera.position, scene);
   * ```
   * Documentation : https://doc.babylonjs.com/babylon101/lights
   * @param name The light friendly name
   * @param position The position of the point light in the scene
   * @param scene The scene the lights belongs to
   */


  function PointLight(name, position, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this._shadowAngle = Math.PI / 2;
    _this.position = position;
    return _this;
  }

  Object.defineProperty(PointLight.prototype, "shadowAngle", {
    /**
     * Getter: In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
     * This specifies what angle the shadow will use to be created.
     *
     * It default to 90 degrees to work nicely with the cube texture generation for point lights shadow maps.
     */
    get: function () {
      return this._shadowAngle;
    },

    /**
     * Setter: In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
     * This specifies what angle the shadow will use to be created.
     *
     * It default to 90 degrees to work nicely with the cube texture generation for point lights shadow maps.
     */
    set: function (value) {
      this._shadowAngle = value;
      this.forceProjectionMatrixCompute();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(PointLight.prototype, "direction", {
    /**
     * Gets the direction if it has been set.
     * In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
     */
    get: function () {
      return this._direction;
    },

    /**
     * In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
     */
    set: function (value) {
      var previousNeedCube = this.needCube();
      this._direction = value;

      if (this.needCube() !== previousNeedCube && this._shadowGenerator) {
        this._shadowGenerator.recreateShadowMap();
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Returns the string "PointLight"
   * @returns the class name
   */

  PointLight.prototype.getClassName = function () {
    return "PointLight";
  };
  /**
   * Returns the integer 0.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */


  PointLight.prototype.getTypeID = function () {
    return Light.LIGHTTYPEID_POINTLIGHT;
  };
  /**
   * Specifies wether or not the shadowmap should be a cube texture.
   * @returns true if the shadowmap needs to be a cube texture.
   */


  PointLight.prototype.needCube = function () {
    return !this.direction;
  };
  /**
   * Returns a new Vector3 aligned with the PointLight cube system according to the passed cube face index (integer).
   * @param faceIndex The index of the face we are computed the direction to generate shadow
   * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
   */


  PointLight.prototype.getShadowDirection = function (faceIndex) {
    if (this.direction) {
      return _super.prototype.getShadowDirection.call(this, faceIndex);
    } else {
      switch (faceIndex) {
        case 0:
          return new Vector3(1.0, 0.0, 0.0);

        case 1:
          return new Vector3(-1.0, 0.0, 0.0);

        case 2:
          return new Vector3(0.0, -1.0, 0.0);

        case 3:
          return new Vector3(0.0, 1.0, 0.0);

        case 4:
          return new Vector3(0.0, 0.0, 1.0);

        case 5:
          return new Vector3(0.0, 0.0, -1.0);
      }
    }

    return Vector3.Zero();
  };
  /**
   * Sets the passed matrix "matrix" as a left-handed perspective projection matrix with the following settings :
   * - fov = PI / 2
   * - aspect ratio : 1.0
   * - z-near and far equal to the active camera minZ and maxZ.
   * Returns the PointLight.
   */


  PointLight.prototype._setDefaultShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
    var activeCamera = this.getScene().activeCamera;

    if (!activeCamera) {
      return;
    }

    Matrix.PerspectiveFovLHToRef(this.shadowAngle, 1.0, this.getDepthMinZ(activeCamera), this.getDepthMaxZ(activeCamera), matrix);
  };

  PointLight.prototype._buildUniformLayout = function () {
    this._uniformBuffer.addUniform("vLightData", 4);

    this._uniformBuffer.addUniform("vLightDiffuse", 4);

    this._uniformBuffer.addUniform("vLightSpecular", 4);

    this._uniformBuffer.addUniform("vLightFalloff", 4);

    this._uniformBuffer.addUniform("shadowsInfo", 3);

    this._uniformBuffer.addUniform("depthValues", 2);

    this._uniformBuffer.create();
  };
  /**
   * Sets the passed Effect "effect" with the PointLight transformed position (or position, if none) and passed name (string).
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The point light
   */


  PointLight.prototype.transferToEffect = function (effect, lightIndex) {
    if (this.computeTransformedInformation()) {
      this._uniformBuffer.updateFloat4("vLightData", this.transformedPosition.x, this.transformedPosition.y, this.transformedPosition.z, 0.0, lightIndex);
    } else {
      this._uniformBuffer.updateFloat4("vLightData", this.position.x, this.position.y, this.position.z, 0, lightIndex);
    }

    this._uniformBuffer.updateFloat4("vLightFalloff", this.range, this._inverseSquaredRange, 0, 0, lightIndex);

    return this;
  };

  PointLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
    if (this.computeTransformedInformation()) {
      effect.setFloat3(lightDataUniformName, this.transformedPosition.x, this.transformedPosition.y, this.transformedPosition.z);
    } else {
      effect.setFloat3(lightDataUniformName, this.position.x, this.position.y, this.position.z);
    }

    return this;
  };
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */


  PointLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
    defines["POINTLIGHT" + lightIndex] = true;
  };

  __decorate([serialize()], PointLight.prototype, "shadowAngle", null);

  return PointLight;
}(ShadowLight);

/**
 * Defines a target to use with MorphTargetManager
 * @see https://doc.babylonjs.com/how_to/how_to_use_morphtargets
 */

var MorphTarget = function () {
  /**
   * Creates a new MorphTarget
   * @param name defines the name of the target
   * @param influence defines the influence to use
   * @param scene defines the scene the morphtarget belongs to
   */
  function MorphTarget(
  /** defines the name of the target */
  name, influence, scene) {
    if (influence === void 0) {
      influence = 0;
    }

    if (scene === void 0) {
      scene = null;
    }

    this.name = name;
    /**
     * Gets or sets the list of animations
     */

    this.animations = new Array();
    this._positions = null;
    this._normals = null;
    this._tangents = null;
    this._uvs = null;
    this._uniqueId = 0;
    /**
     * Observable raised when the influence changes
     */

    this.onInfluenceChanged = new Observable();
    /** @hidden */

    this._onDataLayoutChanged = new Observable();
    this._animationPropertiesOverride = null;
    this._scene = scene || EngineStore.LastCreatedScene;
    this.influence = influence;

    if (this._scene) {
      this._uniqueId = this._scene.getUniqueId();
    }
  }

  Object.defineProperty(MorphTarget.prototype, "influence", {
    /**
     * Gets or sets the influence of this target (ie. its weight in the overall morphing)
     */
    get: function () {
      return this._influence;
    },
    set: function (influence) {
      if (this._influence === influence) {
        return;
      }

      var previous = this._influence;
      this._influence = influence;

      if (this.onInfluenceChanged.hasObservers()) {
        this.onInfluenceChanged.notifyObservers(previous === 0 || influence === 0);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "animationPropertiesOverride", {
    /**
     * Gets or sets the animation properties override
     */
    get: function () {
      if (!this._animationPropertiesOverride && this._scene) {
        return this._scene.animationPropertiesOverride;
      }

      return this._animationPropertiesOverride;
    },
    set: function (value) {
      this._animationPropertiesOverride = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "uniqueId", {
    /**
     * Gets the unique ID of this manager
     */
    get: function () {
      return this._uniqueId;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "hasPositions", {
    /**
     * Gets a boolean defining if the target contains position data
     */
    get: function () {
      return !!this._positions;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "hasNormals", {
    /**
     * Gets a boolean defining if the target contains normal data
     */
    get: function () {
      return !!this._normals;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "hasTangents", {
    /**
     * Gets a boolean defining if the target contains tangent data
     */
    get: function () {
      return !!this._tangents;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTarget.prototype, "hasUVs", {
    /**
     * Gets a boolean defining if the target contains texture coordinates data
     */
    get: function () {
      return !!this._uvs;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Affects position data to this target
   * @param data defines the position data to use
   */

  MorphTarget.prototype.setPositions = function (data) {
    var hadPositions = this.hasPositions;
    this._positions = data;

    if (hadPositions !== this.hasPositions) {
      this._onDataLayoutChanged.notifyObservers(undefined);
    }
  };
  /**
   * Gets the position data stored in this target
   * @returns a FloatArray containing the position data (or null if not present)
   */


  MorphTarget.prototype.getPositions = function () {
    return this._positions;
  };
  /**
   * Affects normal data to this target
   * @param data defines the normal data to use
   */


  MorphTarget.prototype.setNormals = function (data) {
    var hadNormals = this.hasNormals;
    this._normals = data;

    if (hadNormals !== this.hasNormals) {
      this._onDataLayoutChanged.notifyObservers(undefined);
    }
  };
  /**
   * Gets the normal data stored in this target
   * @returns a FloatArray containing the normal data (or null if not present)
   */


  MorphTarget.prototype.getNormals = function () {
    return this._normals;
  };
  /**
   * Affects tangent data to this target
   * @param data defines the tangent data to use
   */


  MorphTarget.prototype.setTangents = function (data) {
    var hadTangents = this.hasTangents;
    this._tangents = data;

    if (hadTangents !== this.hasTangents) {
      this._onDataLayoutChanged.notifyObservers(undefined);
    }
  };
  /**
   * Gets the tangent data stored in this target
   * @returns a FloatArray containing the tangent data (or null if not present)
   */


  MorphTarget.prototype.getTangents = function () {
    return this._tangents;
  };
  /**
   * Affects texture coordinates data to this target
   * @param data defines the texture coordinates data to use
   */


  MorphTarget.prototype.setUVs = function (data) {
    var hadUVs = this.hasUVs;
    this._uvs = data;

    if (hadUVs !== this.hasUVs) {
      this._onDataLayoutChanged.notifyObservers(undefined);
    }
  };
  /**
   * Gets the texture coordinates data stored in this target
   * @returns a FloatArray containing the texture coordinates data (or null if not present)
   */


  MorphTarget.prototype.getUVs = function () {
    return this._uvs;
  };
  /**
   * Clone the current target
   * @returns a new MorphTarget
   */


  MorphTarget.prototype.clone = function () {
    var _this = this;

    var newOne = SerializationHelper.Clone(function () {
      return new MorphTarget(_this.name, _this.influence, _this._scene);
    }, this);
    newOne._positions = this._positions;
    newOne._normals = this._normals;
    newOne._tangents = this._tangents;
    newOne._uvs = this._uvs;
    return newOne;
  };
  /**
   * Serializes the current target into a Serialization object
   * @returns the serialized object
   */


  MorphTarget.prototype.serialize = function () {
    var serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.influence = this.influence;
    serializationObject.positions = Array.prototype.slice.call(this.getPositions());

    if (this.id != null) {
      serializationObject.id = this.id;
    }

    if (this.hasNormals) {
      serializationObject.normals = Array.prototype.slice.call(this.getNormals());
    }

    if (this.hasTangents) {
      serializationObject.tangents = Array.prototype.slice.call(this.getTangents());
    }

    if (this.hasUVs) {
      serializationObject.uvs = Array.prototype.slice.call(this.getUVs());
    } // Animations


    SerializationHelper.AppendSerializedAnimations(this, serializationObject);
    return serializationObject;
  };
  /**
   * Returns the string "MorphTarget"
   * @returns "MorphTarget"
   */


  MorphTarget.prototype.getClassName = function () {
    return "MorphTarget";
  }; // Statics

  /**
   * Creates a new target from serialized data
   * @param serializationObject defines the serialized data to use
   * @returns a new MorphTarget
   */


  MorphTarget.Parse = function (serializationObject) {
    var result = new MorphTarget(serializationObject.name, serializationObject.influence);
    result.setPositions(serializationObject.positions);

    if (serializationObject.id != null) {
      result.id = serializationObject.id;
    }

    if (serializationObject.normals) {
      result.setNormals(serializationObject.normals);
    }

    if (serializationObject.tangents) {
      result.setTangents(serializationObject.tangents);
    }

    if (serializationObject.uvs) {
      result.setUVs(serializationObject.uvs);
    } // Animations


    if (serializationObject.animations) {
      for (var animationIndex = 0; animationIndex < serializationObject.animations.length; animationIndex++) {
        var parsedAnimation = serializationObject.animations[animationIndex];

        var internalClass = _TypeStore.GetClass("BABYLON.Animation");

        if (internalClass) {
          result.animations.push(internalClass.Parse(parsedAnimation));
        }
      }
    }

    return result;
  };
  /**
   * Creates a MorphTarget from mesh data
   * @param mesh defines the source mesh
   * @param name defines the name to use for the new target
   * @param influence defines the influence to attach to the target
   * @returns a new MorphTarget
   */


  MorphTarget.FromMesh = function (mesh, name, influence) {
    if (!name) {
      name = mesh.name;
    }

    var result = new MorphTarget(name, influence, mesh.getScene());
    result.setPositions(mesh.getVerticesData(VertexBuffer.PositionKind));

    if (mesh.isVerticesDataPresent(VertexBuffer.NormalKind)) {
      result.setNormals(mesh.getVerticesData(VertexBuffer.NormalKind));
    }

    if (mesh.isVerticesDataPresent(VertexBuffer.TangentKind)) {
      result.setTangents(mesh.getVerticesData(VertexBuffer.TangentKind));
    }

    if (mesh.isVerticesDataPresent(VertexBuffer.UVKind)) {
      result.setUVs(mesh.getVerticesData(VertexBuffer.UVKind));
    }

    return result;
  };

  __decorate([serialize()], MorphTarget.prototype, "id", void 0);

  return MorphTarget;
}();

/**
 * This class is used to deform meshes using morphing between different targets
 * @see https://doc.babylonjs.com/how_to/how_to_use_morphtargets
 */

var MorphTargetManager = function () {
  /**
   * Creates a new MorphTargetManager
   * @param scene defines the current scene
   */
  function MorphTargetManager(scene) {
    if (scene === void 0) {
      scene = null;
    }

    this._targets = new Array();
    this._targetInfluenceChangedObservers = new Array();
    this._targetDataLayoutChangedObservers = new Array();
    this._activeTargets = new SmartArray(16);
    this._supportsNormals = false;
    this._supportsTangents = false;
    this._supportsUVs = false;
    this._vertexCount = 0;
    this._uniqueId = 0;
    this._tempInfluences = new Array();
    /**
     * Gets or sets a boolean indicating if normals must be morphed
     */

    this.enableNormalMorphing = true;
    /**
     * Gets or sets a boolean indicating if tangents must be morphed
     */

    this.enableTangentMorphing = true;
    /**
     * Gets or sets a boolean indicating if UV must be morphed
     */

    this.enableUVMorphing = true;

    if (!scene) {
      scene = EngineStore.LastCreatedScene;
    }

    this._scene = scene;

    if (this._scene) {
      this._scene.morphTargetManagers.push(this);

      this._uniqueId = this._scene.getUniqueId();
    }
  }

  Object.defineProperty(MorphTargetManager.prototype, "uniqueId", {
    /**
     * Gets the unique ID of this manager
     */
    get: function () {
      return this._uniqueId;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "vertexCount", {
    /**
     * Gets the number of vertices handled by this manager
     */
    get: function () {
      return this._vertexCount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "supportsNormals", {
    /**
     * Gets a boolean indicating if this manager supports morphing of normals
     */
    get: function () {
      return this._supportsNormals && this.enableNormalMorphing;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "supportsTangents", {
    /**
     * Gets a boolean indicating if this manager supports morphing of tangents
     */
    get: function () {
      return this._supportsTangents && this.enableTangentMorphing;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "supportsUVs", {
    /**
     * Gets a boolean indicating if this manager supports morphing of texture coordinates
     */
    get: function () {
      return this._supportsUVs && this.enableUVMorphing;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "numTargets", {
    /**
     * Gets the number of targets stored in this manager
     */
    get: function () {
      return this._targets.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "numInfluencers", {
    /**
     * Gets the number of influencers (ie. the number of targets with influences > 0)
     */
    get: function () {
      return this._activeTargets.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MorphTargetManager.prototype, "influences", {
    /**
     * Gets the list of influences (one per target)
     */
    get: function () {
      return this._influences;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the active target at specified index. An active target is a target with an influence > 0
   * @param index defines the index to check
   * @returns the requested target
   */

  MorphTargetManager.prototype.getActiveTarget = function (index) {
    return this._activeTargets.data[index];
  };
  /**
   * Gets the target at specified index
   * @param index defines the index to check
   * @returns the requested target
   */


  MorphTargetManager.prototype.getTarget = function (index) {
    return this._targets[index];
  };
  /**
   * Add a new target to this manager
   * @param target defines the target to add
   */


  MorphTargetManager.prototype.addTarget = function (target) {
    var _this = this;

    this._targets.push(target);

    this._targetInfluenceChangedObservers.push(target.onInfluenceChanged.add(function (needUpdate) {
      _this._syncActiveTargets(needUpdate);
    }));

    this._targetDataLayoutChangedObservers.push(target._onDataLayoutChanged.add(function () {
      _this._syncActiveTargets(true);
    }));

    this._syncActiveTargets(true);
  };
  /**
   * Removes a target from the manager
   * @param target defines the target to remove
   */


  MorphTargetManager.prototype.removeTarget = function (target) {
    var index = this._targets.indexOf(target);

    if (index >= 0) {
      this._targets.splice(index, 1);

      target.onInfluenceChanged.remove(this._targetInfluenceChangedObservers.splice(index, 1)[0]);

      target._onDataLayoutChanged.remove(this._targetDataLayoutChangedObservers.splice(index, 1)[0]);

      this._syncActiveTargets(true);
    }
  };
  /**
   * Clone the current manager
   * @returns a new MorphTargetManager
   */


  MorphTargetManager.prototype.clone = function () {
    var copy = new MorphTargetManager(this._scene);

    for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
      var target = _a[_i];
      copy.addTarget(target.clone());
    }

    copy.enableNormalMorphing = this.enableNormalMorphing;
    copy.enableTangentMorphing = this.enableTangentMorphing;
    copy.enableUVMorphing = this.enableUVMorphing;
    return copy;
  };
  /**
   * Serializes the current manager into a Serialization object
   * @returns the serialized object
   */


  MorphTargetManager.prototype.serialize = function () {
    var serializationObject = {};
    serializationObject.id = this.uniqueId;
    serializationObject.targets = [];

    for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
      var target = _a[_i];
      serializationObject.targets.push(target.serialize());
    }

    return serializationObject;
  };

  MorphTargetManager.prototype._syncActiveTargets = function (needUpdate) {
    var influenceCount = 0;

    this._activeTargets.reset();

    this._supportsNormals = true;
    this._supportsTangents = true;
    this._supportsUVs = true;
    this._vertexCount = 0;

    for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
      var target = _a[_i];

      if (target.influence === 0) {
        continue;
      }

      this._activeTargets.push(target);

      this._tempInfluences[influenceCount++] = target.influence;
      this._supportsNormals = this._supportsNormals && target.hasNormals;
      this._supportsTangents = this._supportsTangents && target.hasTangents;
      this._supportsUVs = this._supportsUVs && target.hasUVs;
      var positions = target.getPositions();

      if (positions) {
        var vertexCount = positions.length / 3;

        if (this._vertexCount === 0) {
          this._vertexCount = vertexCount;
        } else if (this._vertexCount !== vertexCount) {
          Logger.Error("Incompatible target. Targets must all have the same vertices count.");
          return;
        }
      }
    }

    if (!this._influences || this._influences.length !== influenceCount) {
      this._influences = new Float32Array(influenceCount);
    }

    for (var index = 0; index < influenceCount; index++) {
      this._influences[index] = this._tempInfluences[index];
    }

    if (needUpdate) {
      this.synchronize();
    }
  };
  /**
   * Syncrhonize the targets with all the meshes using this morph target manager
   */


  MorphTargetManager.prototype.synchronize = function () {
    if (!this._scene) {
      return;
    } // Flag meshes as dirty to resync with the active targets


    for (var _i = 0, _a = this._scene.meshes; _i < _a.length; _i++) {
      var mesh = _a[_i];

      if (mesh.morphTargetManager === this) {
        mesh._syncGeometryWithMorphTargetManager();
      }
    }
  }; // Statics

  /**
   * Creates a new MorphTargetManager from serialized data
   * @param serializationObject defines the serialized data
   * @param scene defines the hosting scene
   * @returns the new MorphTargetManager
   */


  MorphTargetManager.Parse = function (serializationObject, scene) {
    var result = new MorphTargetManager(scene);
    result._uniqueId = serializationObject.id;

    for (var _i = 0, _a = serializationObject.targets; _i < _a.length; _i++) {
      var targetData = _a[_i];
      result.addTarget(MorphTarget.Parse(targetData));
    }

    return result;
  };

  return MorphTargetManager;
}();

/**
 * Raw cube texture where the raw buffers are passed in
 */

var RawCubeTexture = function (_super) {
  __extends(RawCubeTexture, _super);
  /**
   * Creates a cube texture where the raw buffers are passed in.
   * @param scene defines the scene the texture is attached to
   * @param data defines the array of data to use to create each face
   * @param size defines the size of the textures
   * @param format defines the format of the data
   * @param type defines the type of the data (like Engine.TEXTURETYPE_UNSIGNED_INT)
   * @param generateMipMaps  defines if the engine should generate the mip levels
   * @param invertY defines if data must be stored with Y axis inverted
   * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
   * @param compression defines the compression used (null by default)
   */


  function RawCubeTexture(scene, data, size, format, type, generateMipMaps, invertY, samplingMode, compression) {
    if (format === void 0) {
      format = 5;
    }

    if (type === void 0) {
      type = 0;
    }

    if (generateMipMaps === void 0) {
      generateMipMaps = false;
    }

    if (invertY === void 0) {
      invertY = false;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    if (compression === void 0) {
      compression = null;
    }

    var _this = _super.call(this, "", scene) || this;

    _this._texture = scene.getEngine().createRawCubeTexture(data, size, format, type, generateMipMaps, invertY, samplingMode, compression);
    return _this;
  }
  /**
   * Updates the raw cube texture.
   * @param data defines the data to store
   * @param format defines the data format
   * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_INT by default)
   * @param invertY defines if data must be stored with Y axis inverted
   * @param compression defines the compression used (null by default)
   * @param level defines which level of the texture to update
   */


  RawCubeTexture.prototype.update = function (data, format, type, invertY, compression) {
    if (compression === void 0) {
      compression = null;
    }

    this._texture.getEngine().updateRawCubeTexture(this._texture, data, format, type, invertY, compression);
  };
  /**
   * Updates a raw cube texture with RGBD encoded data.
   * @param data defines the array of data [mipmap][face] to use to create each face
   * @param sphericalPolynomial defines the spherical polynomial for irradiance
   * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
   * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
   * @returns a promsie that resolves when the operation is complete
   */


  RawCubeTexture.prototype.updateRGBDAsync = function (data, sphericalPolynomial, lodScale, lodOffset) {
    if (sphericalPolynomial === void 0) {
      sphericalPolynomial = null;
    }

    if (lodScale === void 0) {
      lodScale = 0.8;
    }

    if (lodOffset === void 0) {
      lodOffset = 0;
    }

    return RawCubeTexture._UpdateRGBDAsync(this._texture, data, sphericalPolynomial, lodScale, lodOffset);
  };
  /**
   * Clones the raw cube texture.
   * @return a new cube texture
   */


  RawCubeTexture.prototype.clone = function () {
    var _this = this;

    return SerializationHelper.Clone(function () {
      var scene = _this.getScene();

      var internalTexture = _this._texture;
      var texture = new RawCubeTexture(scene, internalTexture._bufferViewArray, internalTexture.width, internalTexture.format, internalTexture.type, internalTexture.generateMipMaps, internalTexture.invertY, internalTexture.samplingMode, internalTexture._compression);

      if (internalTexture.source === InternalTextureSource.CubeRawRGBD) {
        texture.updateRGBDAsync(internalTexture._bufferViewArrayArray, internalTexture._sphericalPolynomial, internalTexture._lodGenerationScale, internalTexture._lodGenerationOffset);
      }

      return texture;
    }, this);
  };
  /** @hidden */


  RawCubeTexture._UpdateRGBDAsync = function (internalTexture, data, sphericalPolynomial, lodScale, lodOffset) {
    internalTexture._source = InternalTextureSource.CubeRawRGBD;
    internalTexture._bufferViewArrayArray = data;
    internalTexture._lodGenerationScale = lodScale;
    internalTexture._lodGenerationOffset = lodOffset;
    internalTexture._sphericalPolynomial = sphericalPolynomial;
    return EnvironmentTextureTools.UploadLevelsAsync(internalTexture, data).then(function () {
      internalTexture.isReady = true;
    });
  };

  return RawCubeTexture;
}(CubeTexture);

function createDecoderAsync(wasmBinary) {
  return new Promise(function (resolve) {
    DracoDecoderModule({
      wasmBinary: wasmBinary
    }).then(function (module) {
      resolve({
        module: module
      });
    });
  });
}

function decodeMesh(decoderModule, dataView, attributes, onIndicesData, onAttributeData) {
  var buffer = new decoderModule.DecoderBuffer();
  buffer.Init(dataView, dataView.byteLength);
  var decoder = new decoderModule.Decoder();
  var geometry;
  var status;

  try {
    var type = decoder.GetEncodedGeometryType(buffer);

    switch (type) {
      case decoderModule.TRIANGULAR_MESH:
        geometry = new decoderModule.Mesh();
        status = decoder.DecodeBufferToMesh(buffer, geometry);
        break;

      case decoderModule.POINT_CLOUD:
        geometry = new decoderModule.PointCloud();
        status = decoder.DecodeBufferToPointCloud(buffer, geometry);
        break;

      default:
        throw new Error("Invalid geometry type " + type);
    }

    if (!status.ok() || !geometry.ptr) {
      throw new Error(status.error_msg());
    }

    if (type === decoderModule.TRIANGULAR_MESH) {
      var numFaces = geometry.num_faces();
      var numIndices = numFaces * 3;
      var byteLength = numIndices * 4;

      var ptr = decoderModule._malloc(byteLength);

      try {
        decoder.GetTrianglesUInt32Array(geometry, byteLength, ptr);
        var indices = new Uint32Array(numIndices);
        indices.set(new Uint32Array(decoderModule.HEAPF32.buffer, ptr, numIndices));
        onIndicesData(indices);
      } finally {
        decoderModule._free(ptr);
      }
    }

    var processAttribute = function (kind, attribute) {
      var numComponents = attribute.num_components();
      var numPoints = geometry.num_points();
      var numValues = numPoints * numComponents;
      var byteLength = numValues * Float32Array.BYTES_PER_ELEMENT;

      var ptr = decoderModule._malloc(byteLength);

      try {
        decoder.GetAttributeDataArrayForAllPoints(geometry, attribute, decoderModule.DT_FLOAT32, byteLength, ptr);
        var values = new Float32Array(decoderModule.HEAPF32.buffer, ptr, numValues);

        if (kind === "color" && numComponents === 3) {
          var babylonData = new Float32Array(numPoints * 4);

          for (var i = 0, j = 0; i < babylonData.length; i += 4, j += numComponents) {
            babylonData[i + 0] = values[j + 0];
            babylonData[i + 1] = values[j + 1];
            babylonData[i + 2] = values[j + 2];
            babylonData[i + 3] = 1;
          }

          onAttributeData(kind, babylonData);
        } else {
          var babylonData = new Float32Array(numValues);
          babylonData.set(new Float32Array(decoderModule.HEAPF32.buffer, ptr, numValues));
          onAttributeData(kind, babylonData);
        }
      } finally {
        decoderModule._free(ptr);
      }
    };

    if (attributes) {
      for (var kind in attributes) {
        var id = attributes[kind];
        var attribute = decoder.GetAttributeByUniqueId(geometry, id);
        processAttribute(kind, attribute);
      }
    } else {
      var nativeAttributeTypes = {
        "position": "POSITION",
        "normal": "NORMAL",
        "color": "COLOR",
        "uv": "TEX_COORD"
      };

      for (var kind in nativeAttributeTypes) {
        var id = decoder.GetAttributeId(geometry, decoderModule[nativeAttributeTypes[kind]]);

        if (id !== -1) {
          var attribute = decoder.GetAttribute(geometry, id);
          processAttribute(kind, attribute);
        }
      }
    }
  } finally {
    if (geometry) {
      decoderModule.destroy(geometry);
    }

    decoderModule.destroy(decoder);
    decoderModule.destroy(buffer);
  }
}
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 */


function worker() {
  var decoderPromise;

  onmessage = function (event) {
    var data = event.data;

    switch (data.id) {
      case "init":
        {
          var decoder = data.decoder;

          if (decoder.url) {
            importScripts(decoder.url);
            decoderPromise = DracoDecoderModule({
              wasmBinary: decoder.wasmBinary
            });
          }

          postMessage("done");
          break;
        }

      case "decodeMesh":
        {
          if (!decoderPromise) {
            throw new Error("Draco decoder module is not available");
          }

          decoderPromise.then(function (decoder) {
            decodeMesh(decoder, data.dataView, data.attributes, function (indices) {
              postMessage({
                id: "indices",
                value: indices
              }, [indices.buffer]);
            }, function (kind, data) {
              postMessage({
                id: kind,
                value: data
              }, [data.buffer]);
            });
            postMessage("done");
          });
          break;
        }
    }
  };
}

function getAbsoluteUrl(url) {
  if (typeof document !== "object" || typeof url !== "string") {
    return url;
  }

  return Tools.GetAbsoluteUrl(url);
}
/**
 * Draco compression (https://google.github.io/draco/)
 *
 * This class wraps the Draco module.
 *
 * **Encoder**
 *
 * The encoder is not currently implemented.
 *
 * **Decoder**
 *
 * By default, the configuration points to a copy of the Draco decoder files for glTF from the babylon.js preview cdn https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js.
 *
 * To update the configuration, use the following code:
 * ```javascript
 *     DracoCompression.Configuration = {
 *         decoder: {
 *             wasmUrl: "<url to the WebAssembly library>",
 *             wasmBinaryUrl: "<url to the WebAssembly binary>",
 *             fallbackUrl: "<url to the fallback JavaScript library>",
 *         }
 *     };
 * ```
 *
 * Draco has two versions, one for WebAssembly and one for JavaScript. The decoder configuration can be set to only support Webssembly or only support the JavaScript version.
 * Decoding will automatically fallback to the JavaScript version if WebAssembly version is not configured or if WebAssembly is not supported by the browser.
 * Use `DracoCompression.DecoderAvailable` to determine if the decoder configuration is available for the current context.
 *
 * To decode Draco compressed data, get the default DracoCompression object and call decodeMeshAsync:
 * ```javascript
 *     var vertexData = await DracoCompression.Default.decodeMeshAsync(data);
 * ```
 *
 * @see https://www.babylonjs-playground.com/#N3EK4B#0
 */


var DracoCompression = function () {
  /**
   * Constructor
   * @param numWorkers The number of workers for async operations. Specify `0` to disable web workers and run synchronously in the current context.
   */
  function DracoCompression(numWorkers) {
    if (numWorkers === void 0) {
      numWorkers = DracoCompression.DefaultNumWorkers;
    }

    var decoder = DracoCompression.Configuration.decoder;
    var decoderInfo = decoder.wasmUrl && decoder.wasmBinaryUrl && typeof WebAssembly === "object" ? {
      url: decoder.wasmUrl,
      wasmBinaryPromise: Tools.LoadFileAsync(getAbsoluteUrl(decoder.wasmBinaryUrl))
    } : {
      url: decoder.fallbackUrl,
      wasmBinaryPromise: Promise.resolve(undefined)
    };

    if (numWorkers && typeof Worker === "function") {
      this._workerPoolPromise = decoderInfo.wasmBinaryPromise.then(function (decoderWasmBinary) {
        var workerContent = decodeMesh + "(" + worker + ")()";
        var workerBlobUrl = URL.createObjectURL(new Blob([workerContent], {
          type: "application/javascript"
        }));
        var workerPromises = new Array(numWorkers);

        for (var i = 0; i < workerPromises.length; i++) {
          workerPromises[i] = new Promise(function (resolve, reject) {
            var worker = new Worker(workerBlobUrl);

            var onError = function (error) {
              worker.removeEventListener("error", onError);
              worker.removeEventListener("message", onMessage);
              reject(error);
            };

            var onMessage = function (message) {
              if (message.data === "done") {
                worker.removeEventListener("error", onError);
                worker.removeEventListener("message", onMessage);
                resolve(worker);
              }
            };

            worker.addEventListener("error", onError);
            worker.addEventListener("message", onMessage);
            worker.postMessage({
              id: "init",
              decoder: {
                url: getAbsoluteUrl(decoderInfo.url),
                wasmBinary: decoderWasmBinary
              }
            });
          });
        }

        return Promise.all(workerPromises).then(function (workers) {
          return new WorkerPool(workers);
        });
      });
    } else {
      this._decoderModulePromise = decoderInfo.wasmBinaryPromise.then(function (decoderWasmBinary) {
        if (!decoderInfo.url) {
          throw new Error("Draco decoder module is not available");
        }

        return Tools.LoadScriptAsync(decoderInfo.url).then(function () {
          return createDecoderAsync(decoderWasmBinary);
        });
      });
    }
  }

  Object.defineProperty(DracoCompression, "DecoderAvailable", {
    /**
     * Returns true if the decoder configuration is available.
     */
    get: function () {
      var decoder = DracoCompression.Configuration.decoder;
      return !!(decoder.wasmUrl && decoder.wasmBinaryUrl && typeof WebAssembly === "object" || decoder.fallbackUrl);
    },
    enumerable: false,
    configurable: true
  });

  DracoCompression.GetDefaultNumWorkers = function () {
    if (typeof navigator !== "object" || !navigator.hardwareConcurrency) {
      return 1;
    } // Use 50% of the available logical processors but capped at 4.


    return Math.min(Math.floor(navigator.hardwareConcurrency * 0.5), 4);
  };

  Object.defineProperty(DracoCompression, "Default", {
    /**
     * Default instance for the draco compression object.
     */
    get: function () {
      if (!DracoCompression._Default) {
        DracoCompression._Default = new DracoCompression();
      }

      return DracoCompression._Default;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Stop all async operations and release resources.
   */

  DracoCompression.prototype.dispose = function () {
    if (this._workerPoolPromise) {
      this._workerPoolPromise.then(function (workerPool) {
        workerPool.dispose();
      });
    }

    delete this._workerPoolPromise;
    delete this._decoderModulePromise;
  };
  /**
   * Returns a promise that resolves when ready. Call this manually to ensure draco compression is ready before use.
   * @returns a promise that resolves when ready
   */


  DracoCompression.prototype.whenReadyAsync = function () {
    if (this._workerPoolPromise) {
      return this._workerPoolPromise.then(function () {});
    }

    if (this._decoderModulePromise) {
      return this._decoderModulePromise.then(function () {});
    }

    return Promise.resolve();
  };
  /**
    * Decode Draco compressed mesh data to vertex data.
    * @param data The ArrayBuffer or ArrayBufferView for the Draco compression data
    * @param attributes A map of attributes from vertex buffer kinds to Draco unique ids
    * @returns A promise that resolves with the decoded vertex data
    */


  DracoCompression.prototype.decodeMeshAsync = function (data, attributes) {
    var dataView = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

    if (this._workerPoolPromise) {
      return this._workerPoolPromise.then(function (workerPool) {
        return new Promise(function (resolve, reject) {
          workerPool.push(function (worker, onComplete) {
            var vertexData = new VertexData();

            var onError = function (error) {
              worker.removeEventListener("error", onError);
              worker.removeEventListener("message", onMessage);
              reject(error);
              onComplete();
            };

            var onMessage = function (message) {
              if (message.data === "done") {
                worker.removeEventListener("error", onError);
                worker.removeEventListener("message", onMessage);
                resolve(vertexData);
                onComplete();
              } else if (message.data.id === "indices") {
                vertexData.indices = message.data.value;
              } else {
                vertexData.set(message.data.value, message.data.id);
              }
            };

            worker.addEventListener("error", onError);
            worker.addEventListener("message", onMessage);
            var dataViewCopy = new Uint8Array(dataView.byteLength);
            dataViewCopy.set(new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength));
            worker.postMessage({
              id: "decodeMesh",
              dataView: dataViewCopy,
              attributes: attributes
            }, [dataViewCopy.buffer]);
          });
        });
      });
    }

    if (this._decoderModulePromise) {
      return this._decoderModulePromise.then(function (decoder) {
        var vertexData = new VertexData();
        decodeMesh(decoder.module, dataView, attributes, function (indices) {
          vertexData.indices = indices;
        }, function (kind, data) {
          vertexData.set(data, kind);
        });
        return vertexData;
      });
    }

    throw new Error("Draco decoder module is not available");
  };
  /**
   * The configuration. Defaults to the following urls:
   * - wasmUrl: "https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js"
   * - wasmBinaryUrl: "https://preview.babylonjs.com/draco_decoder_gltf.wasm"
   * - fallbackUrl: "https://preview.babylonjs.com/draco_decoder_gltf.js"
   */


  DracoCompression.Configuration = {
    decoder: {
      wasmUrl: "https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js",
      wasmBinaryUrl: "https://preview.babylonjs.com/draco_decoder_gltf.wasm",
      fallbackUrl: "https://preview.babylonjs.com/draco_decoder_gltf.js"
    }
  };
  /**
   * Default number of workers to create when creating the draco compression object.
   */

  DracoCompression.DefaultNumWorkers = DracoCompression.GetDefaultNumWorkers();
  DracoCompression._Default = null;
  return DracoCompression;
}();

/**
 * Wrapper class for promise with external resolve and reject.
 */
var Deferred = function () {
  /**
   * Constructor for this deferred object.
   */
  function Deferred() {
    var _this = this;

    this.promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
  }

  Object.defineProperty(Deferred.prototype, "resolve", {
    /**
     * The resolve method of the promise associated with this deferred object.
     */
    get: function () {
      return this._resolve;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Deferred.prototype, "reject", {
    /**
     * The reject method of the promise associated with this deferred object.
     */
    get: function () {
      return this._reject;
    },
    enumerable: false,
    configurable: true
  });
  return Deferred;
}();

/**
 * Utility class for reading from a data buffer
 */

var DataReader = function () {
  /**
   * Constructor
   * @param buffer The buffer to read
   */
  function DataReader(buffer) {
    /**
     * The current byte offset from the beginning of the data buffer.
     */
    this.byteOffset = 0;
    this.buffer = buffer;
  }
  /**
   * Loads the given byte length.
   * @param byteLength The byte length to load
   * @returns A promise that resolves when the load is complete
   */


  DataReader.prototype.loadAsync = function (byteLength) {
    var _this = this;

    return this.buffer.readAsync(this.byteOffset, byteLength).then(function (data) {
      _this._dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      _this._dataByteOffset = 0;
    });
  };
  /**
   * Read a unsigned 32-bit integer from the currently loaded data range.
   * @returns The 32-bit integer read
   */


  DataReader.prototype.readUint32 = function () {
    var value = this._dataView.getUint32(this._dataByteOffset, true);

    this._dataByteOffset += 4;
    this.byteOffset += 4;
    return value;
  };
  /**
   * Read a byte array from the currently loaded data range.
   * @param byteLength The byte length to read
   * @returns The byte array read
   */


  DataReader.prototype.readUint8Array = function (byteLength) {
    var value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._dataByteOffset, byteLength);
    this._dataByteOffset += byteLength;
    this.byteOffset += byteLength;
    return value;
  };
  /**
   * Read a string from the currently loaded data range.
   * @param byteLength The byte length to read
   * @returns The string read
   */


  DataReader.prototype.readString = function (byteLength) {
    return StringTools.Decode(this.readUint8Array(byteLength));
  };
  /**
   * Skips the given byte length the currently loaded data range.
   * @param byteLength The byte length to skip
   */


  DataReader.prototype.skipBytes = function (byteLength) {
    this._dataByteOffset += byteLength;
    this.byteOffset += byteLength;
  };

  return DataReader;
}();

export { Animation as A, Bone as B, CameraInputTypes as C, DirectionalLight as D, EnvironmentTextureTools as E, FreeCameraInputsManager as F, DataReader as G, HemisphericLight as H, InstantiatedEntries as I, KeepAssets as K, MorphTargetManager as M, PointLight as P, RawTexture as R, Sound as S, TargetCamera as T, WorkerPool as W, _IAnimationState as _, CameraInputsManager as a, FreeCamera as b, ShaderMaterial as c, SceneLoader as d, SpotLight as e, CubeTexture as f, Skeleton as g, AssetContainer as h, AnimationGroup as i, Animatable as j, TargetedAnimation as k, RuntimeAnimation as l, AnimationEvent as m, AnimationKeyInterpolation as n, AnimationRange as o, WeightedSound as p, FreeCameraKeyboardMoveInput as q, FreeCameraMouseInput as r, FreeCameraMouseWheelInput as s, FreeCameraTouchInput as t, ShadowLight as u, SceneLoaderAnimationGroupLoadingMode as v, RawCubeTexture as w, DracoCompression as x, MorphTarget as y, Deferred as z };
