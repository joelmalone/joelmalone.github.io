import { af as ThinEngine, W as InternalTexture, R as InternalTextureSource, c as __extends, L as Logger, J as Texture, a1 as CanvasGenerator, B as Effect } from './pbrMaterial-e2c29195.js';

ThinEngine.prototype.createDynamicTexture = function (width, height, generateMipMaps, samplingMode) {
  var texture = new InternalTexture(this, InternalTextureSource.Dynamic);
  texture.baseWidth = width;
  texture.baseHeight = height;

  if (generateMipMaps) {
    width = this.needPOTTextures ? ThinEngine.GetExponentOfTwo(width, this._caps.maxTextureSize) : width;
    height = this.needPOTTextures ? ThinEngine.GetExponentOfTwo(height, this._caps.maxTextureSize) : height;
  } //  this.resetTextureCache();


  texture.width = width;
  texture.height = height;
  texture.isReady = false;
  texture.generateMipMaps = generateMipMaps;
  texture.samplingMode = samplingMode;
  this.updateTextureSamplingMode(samplingMode, texture);

  this._internalTexturesCache.push(texture);

  return texture;
};

ThinEngine.prototype.updateDynamicTexture = function (texture, source, invertY, premulAlpha, format, forceBindTexture) {
  if (premulAlpha === void 0) {
    premulAlpha = false;
  }

  if (forceBindTexture === void 0) {
    forceBindTexture = false;
  }

  if (!texture) {
    return;
  }

  var gl = this._gl;
  var target = gl.TEXTURE_2D;

  var wasPreviouslyBound = this._bindTextureDirectly(target, texture, true, forceBindTexture);

  this._unpackFlipY(invertY === undefined ? texture.invertY : invertY);

  if (premulAlpha) {
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
  }

  var textureType = this._getWebGLTextureType(texture.type);

  var glformat = this._getInternalFormat(format ? format : texture.format);

  var internalFormat = this._getRGBABufferInternalSizedFormat(texture.type, glformat);

  gl.texImage2D(target, 0, internalFormat, glformat, textureType, source);

  if (texture.generateMipMaps) {
    gl.generateMipmap(target);
  }

  if (!wasPreviouslyBound) {
    this._bindTextureDirectly(target, null);
  }

  if (premulAlpha) {
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
  }

  texture.isReady = true;
};

/**
 * A class extending Texture allowing drawing on a texture
 * @see https://doc.babylonjs.com/how_to/dynamictexture
 */

var DynamicTexture = function (_super) {
  __extends(DynamicTexture, _super);
  /**
   * Creates a DynamicTexture
   * @param name defines the name of the texture
   * @param options provides 3 alternatives for width and height of texture, a canvas, object with width and height properties, number for both width and height
   * @param scene defines the scene where you want the texture
   * @param generateMipMaps defines the use of MinMaps or not (default is false)
   * @param samplingMode defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
   * @param format defines the texture format to use (default is Engine.TEXTUREFORMAT_RGBA)
   * @param invertY defines if the texture needs to be inverted on the y axis during loading
   */


  function DynamicTexture(name, options, scene, generateMipMaps, samplingMode, format, invertY) {
    if (scene === void 0) {
      scene = null;
    }

    if (samplingMode === void 0) {
      samplingMode = 3;
    }

    if (format === void 0) {
      format = 5;
    }

    var _this = _super.call(this, null, scene, !generateMipMaps, invertY, samplingMode, undefined, undefined, undefined, undefined, format) || this;

    _this.name = name;
    _this.wrapU = Texture.CLAMP_ADDRESSMODE;
    _this.wrapV = Texture.CLAMP_ADDRESSMODE;
    _this._generateMipMaps = generateMipMaps;

    var engine = _this._getEngine();

    if (!engine) {
      return _this;
    }

    if (options.getContext) {
      _this._canvas = options;
      _this._texture = engine.createDynamicTexture(options.width, options.height, generateMipMaps, samplingMode);
    } else {
      _this._canvas = CanvasGenerator.CreateCanvas(1, 1);

      if (options.width || options.width === 0) {
        _this._texture = engine.createDynamicTexture(options.width, options.height, generateMipMaps, samplingMode);
      } else {
        _this._texture = engine.createDynamicTexture(options, options, generateMipMaps, samplingMode);
      }
    }

    var textureSize = _this.getSize();

    _this._canvas.width = textureSize.width;
    _this._canvas.height = textureSize.height;
    _this._context = _this._canvas.getContext("2d");
    return _this;
  }
  /**
   * Get the current class name of the texture useful for serialization or dynamic coding.
   * @returns "DynamicTexture"
   */


  DynamicTexture.prototype.getClassName = function () {
    return "DynamicTexture";
  };

  Object.defineProperty(DynamicTexture.prototype, "canRescale", {
    /**
     * Gets the current state of canRescale
     */
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });

  DynamicTexture.prototype._recreate = function (textureSize) {
    this._canvas.width = textureSize.width;
    this._canvas.height = textureSize.height;
    this.releaseInternalTexture();
    this._texture = this._getEngine().createDynamicTexture(textureSize.width, textureSize.height, this._generateMipMaps, this.samplingMode);
  };
  /**
   * Scales the texture
   * @param ratio the scale factor to apply to both width and height
   */


  DynamicTexture.prototype.scale = function (ratio) {
    var textureSize = this.getSize();
    textureSize.width *= ratio;
    textureSize.height *= ratio;

    this._recreate(textureSize);
  };
  /**
   * Resizes the texture
   * @param width the new width
   * @param height the new height
   */


  DynamicTexture.prototype.scaleTo = function (width, height) {
    var textureSize = this.getSize();
    textureSize.width = width;
    textureSize.height = height;

    this._recreate(textureSize);
  };
  /**
   * Gets the context of the canvas used by the texture
   * @returns the canvas context of the dynamic texture
   */


  DynamicTexture.prototype.getContext = function () {
    return this._context;
  };
  /**
   * Clears the texture
   */


  DynamicTexture.prototype.clear = function () {
    var size = this.getSize();

    this._context.fillRect(0, 0, size.width, size.height);
  };
  /**
   * Updates the texture
   * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
   * @param premulAlpha defines if alpha is stored as premultiplied (default is false)
   */


  DynamicTexture.prototype.update = function (invertY, premulAlpha) {
    if (premulAlpha === void 0) {
      premulAlpha = false;
    }

    this._getEngine().updateDynamicTexture(this._texture, this._canvas, invertY === undefined ? true : invertY, premulAlpha, this._format || undefined);
  };
  /**
   * Draws text onto the texture
   * @param text defines the text to be drawn
   * @param x defines the placement of the text from the left
   * @param y defines the placement of the text from the top when invertY is true and from the bottom when false
   * @param font defines the font to be used with font-style, font-size, font-name
   * @param color defines the color used for the text
   * @param clearColor defines the color for the canvas, use null to not overwrite canvas
   * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
   * @param update defines whether texture is immediately update (default is true)
   */


  DynamicTexture.prototype.drawText = function (text, x, y, font, color, clearColor, invertY, update) {
    if (update === void 0) {
      update = true;
    }

    var size = this.getSize();

    if (clearColor) {
      this._context.fillStyle = clearColor;

      this._context.fillRect(0, 0, size.width, size.height);
    }

    this._context.font = font;

    if (x === null || x === undefined) {
      var textSize = this._context.measureText(text);

      x = (size.width - textSize.width) / 2;
    }

    if (y === null || y === undefined) {
      var fontSize = parseInt(font.replace(/\D/g, ''));
      y = size.height / 2 + fontSize / 3.65;
    }

    this._context.fillStyle = color || "";

    this._context.fillText(text, x, y);

    if (update) {
      this.update(invertY);
    }
  };
  /**
   * Clones the texture
   * @returns the clone of the texture.
   */


  DynamicTexture.prototype.clone = function () {
    var scene = this.getScene();

    if (!scene) {
      return this;
    }

    var textureSize = this.getSize();
    var newTexture = new DynamicTexture(this.name, textureSize, scene, this._generateMipMaps); // Base texture

    newTexture.hasAlpha = this.hasAlpha;
    newTexture.level = this.level; // Dynamic Texture

    newTexture.wrapU = this.wrapU;
    newTexture.wrapV = this.wrapV;
    return newTexture;
  };
  /**
   * Serializes the dynamic texture.  The scene should be ready before the dynamic texture is serialized
   * @returns a serialized dynamic texture object
   */


  DynamicTexture.prototype.serialize = function () {
    var scene = this.getScene();

    if (scene && !scene.isReady()) {
      Logger.Warn("The scene must be ready before serializing the dynamic texture");
    }

    var serializationObject = _super.prototype.serialize.call(this);

    if (this._IsCanvasElement(this._canvas)) {
      serializationObject.base64String = this._canvas.toDataURL();
    }

    serializationObject.invertY = this._invertY;
    serializationObject.samplingMode = this.samplingMode;
    return serializationObject;
  };

  DynamicTexture.prototype._IsCanvasElement = function (canvas) {
    return canvas.toDataURL !== undefined;
  };
  /** @hidden */


  DynamicTexture.prototype._rebuild = function () {
    this.update();
  };

  return DynamicTexture;
}(Texture);

var name = 'imageProcessingCompatibility';
var shader = "#ifdef IMAGEPROCESSINGPOSTPROCESS\ngl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));\n#endif";
Effect.IncludesShadersStore[name] = shader;

export { DynamicTexture as D };
