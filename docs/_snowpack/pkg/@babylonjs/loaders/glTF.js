import { u as Tools, L as Logger, O as Observable, au as StringTools, M as Matrix, d as Vector4, a as Vector3, V as Vector2, J as Texture, B as Effect, b as Color4, p as AbstractMesh, a2 as StandardMaterial, C as Color3, aa as Material, a$ as Constants, Q as Quaternion, m as Camera, o as Mesh, aH as MultiMaterial, aG as Geometry, aR as SubMesh, n as VertexData, a0 as VertexBuffer, c as __extends, a7 as TransformNode, aT as Buffer, ax as PBRMaterial, bB as LoadFileError, T as TmpVectors, a8 as BoundingInfo, bd as SphericalHarmonics, at as SphericalPolynomial, S as Scalar, aD as Light, v as __assign, U as RenderTargetTexture } from '../../common/pbrMaterial-e2c29195.js';
import { G as DataReader, h as AssetContainer, d as SceneLoader, c as ShaderMaterial, g as Skeleton, A as Animation, H as HemisphericLight, D as DirectionalLight, P as PointLight, e as SpotLight, b as FreeCamera, B as Bone, M as MorphTargetManager, y as MorphTarget, i as AnimationGroup, z as Deferred, n as AnimationKeyInterpolation, w as RawCubeTexture, x as DracoCompression, p as WeightedSound, m as AnimationEvent, S as Sound } from '../../common/dataReader-991deb44.js';

function validateAsync(data, rootUrl, fileName, getExternalResource) {
  var options = {
    externalResourceFunction: function (uri) {
      return getExternalResource(uri).then(function (value) {
        return new Uint8Array(value);
      });
    }
  };

  if (fileName) {
    options.uri = rootUrl === "file:" ? fileName : rootUrl + fileName;
  }

  return data instanceof ArrayBuffer ? GLTFValidator.validateBytes(new Uint8Array(data), options) : GLTFValidator.validateString(data, options);
}
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 */


function workerFunc() {
  var pendingExternalResources = [];

  onmessage = function (message) {
    var data = message.data;

    switch (data.id) {
      case "init":
        {
          importScripts(data.url);
          break;
        }

      case "validate":
        {
          validateAsync(data.data, data.rootUrl, data.fileName, function (uri) {
            return new Promise(function (resolve, reject) {
              var index = pendingExternalResources.length;
              pendingExternalResources.push({
                resolve: resolve,
                reject: reject
              });
              postMessage({
                id: "getExternalResource",
                index: index,
                uri: uri
              });
            });
          }).then(function (value) {
            postMessage({
              id: "validate.resolve",
              value: value
            });
          }, function (reason) {
            postMessage({
              id: "validate.reject",
              reason: reason
            });
          });
          break;
        }

      case "getExternalResource.resolve":
        {
          pendingExternalResources[data.index].resolve(data.value);
          break;
        }

      case "getExternalResource.reject":
        {
          pendingExternalResources[data.index].reject(data.reason);
          break;
        }
    }
  };
}
/**
 * glTF validation
 */


var GLTFValidation = function () {
  function GLTFValidation() {}
  /**
   * Validate a glTF asset using the glTF-Validator.
   * @param data The JSON of a glTF or the array buffer of a binary glTF
   * @param rootUrl The root url for the glTF
   * @param fileName The file name for the glTF
   * @param getExternalResource The callback to get external resources for the glTF validator
   * @returns A promise that resolves with the glTF validation results once complete
   */


  GLTFValidation.ValidateAsync = function (data, rootUrl, fileName, getExternalResource) {
    var _this = this;

    if (typeof Worker === "function") {
      return new Promise(function (resolve, reject) {
        var workerContent = validateAsync + "(" + workerFunc + ")()";
        var workerBlobUrl = URL.createObjectURL(new Blob([workerContent], {
          type: "application/javascript"
        }));
        var worker = new Worker(workerBlobUrl);

        var onError = function (error) {
          worker.removeEventListener("error", onError);
          worker.removeEventListener("message", onMessage);
          reject(error);
        };

        var onMessage = function (message) {
          var data = message.data;

          switch (data.id) {
            case "getExternalResource":
              {
                getExternalResource(data.uri).then(function (value) {
                  worker.postMessage({
                    id: "getExternalResource.resolve",
                    index: data.index,
                    value: value
                  }, [value]);
                }, function (reason) {
                  worker.postMessage({
                    id: "getExternalResource.reject",
                    index: data.index,
                    reason: reason
                  });
                });
                break;
              }

            case "validate.resolve":
              {
                worker.removeEventListener("error", onError);
                worker.removeEventListener("message", onMessage);
                resolve(data.value);
                break;
              }

            case "validate.reject":
              {
                worker.removeEventListener("error", onError);
                worker.removeEventListener("message", onMessage);
                reject(data.reason);
              }
          }
        };

        worker.addEventListener("error", onError);
        worker.addEventListener("message", onMessage);
        worker.postMessage({
          id: "init",
          url: Tools.GetAbsoluteUrl(_this.Configuration.url)
        });
        worker.postMessage({
          id: "validate",
          data: data,
          rootUrl: rootUrl,
          fileName: fileName
        });
      });
    } else {
      if (!this._LoadScriptPromise) {
        this._LoadScriptPromise = Tools.LoadScriptAsync(this.Configuration.url);
      }

      return this._LoadScriptPromise.then(function () {
        return validateAsync(data, rootUrl, fileName, getExternalResource);
      });
    }
  };
  /**
   * The configuration. Defaults to `{ url: "https://preview.babylonjs.com/gltf_validator.js" }`.
   */


  GLTFValidation.Configuration = {
    url: "https://preview.babylonjs.com/gltf_validator.js"
  };
  return GLTFValidation;
}();

/**
 * Mode that determines the coordinate system to use.
 */

var GLTFLoaderCoordinateSystemMode;

(function (GLTFLoaderCoordinateSystemMode) {
  /**
   * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
   */
  GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["AUTO"] = 0] = "AUTO";
  /**
   * Sets the useRightHandedSystem flag on the scene.
   */

  GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["FORCE_RIGHT_HANDED"] = 1] = "FORCE_RIGHT_HANDED";
})(GLTFLoaderCoordinateSystemMode || (GLTFLoaderCoordinateSystemMode = {}));
/**
 * Mode that determines what animations will start.
 */


var GLTFLoaderAnimationStartMode;

(function (GLTFLoaderAnimationStartMode) {
  /**
   * No animation will start.
   */
  GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["NONE"] = 0] = "NONE";
  /**
   * The first animation will start.
   */

  GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["FIRST"] = 1] = "FIRST";
  /**
   * All animations will start.
   */

  GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["ALL"] = 2] = "ALL";
})(GLTFLoaderAnimationStartMode || (GLTFLoaderAnimationStartMode = {}));
/**
 * Loader state.
 */


var GLTFLoaderState;

(function (GLTFLoaderState) {
  /**
   * The asset is loading.
   */
  GLTFLoaderState[GLTFLoaderState["LOADING"] = 0] = "LOADING";
  /**
   * The asset is ready for rendering.
   */

  GLTFLoaderState[GLTFLoaderState["READY"] = 1] = "READY";
  /**
   * The asset is completely loaded.
   */

  GLTFLoaderState[GLTFLoaderState["COMPLETE"] = 2] = "COMPLETE";
})(GLTFLoaderState || (GLTFLoaderState = {}));
/**
 * File loader for loading glTF files into a scene.
 */


var GLTFFileLoader = function () {
  function GLTFFileLoader() {
    // --------------
    // Common options
    // --------------

    /**
     * Raised when the asset has been parsed
     */
    this.onParsedObservable = new Observable(); // ----------
    // V2 options
    // ----------

    /**
     * The coordinate system mode. Defaults to AUTO.
     */

    this.coordinateSystemMode = GLTFLoaderCoordinateSystemMode.AUTO;
    /**
    * The animation start mode. Defaults to FIRST.
    */

    this.animationStartMode = GLTFLoaderAnimationStartMode.FIRST;
    /**
     * Defines if the loader should compile materials before raising the success callback. Defaults to false.
     */

    this.compileMaterials = false;
    /**
     * Defines if the loader should also compile materials with clip planes. Defaults to false.
     */

    this.useClipPlane = false;
    /**
     * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
     */

    this.compileShadowGenerators = false;
    /**
     * Defines if the Alpha blended materials are only applied as coverage.
     * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
     * If true, no extra effects are applied to transparent pixels.
     */

    this.transparencyAsCoverage = false;
    /**
     * Defines if the loader should use range requests when load binary glTF files from HTTP.
     * Enabling will disable offline support and glTF validator.
     * Defaults to false.
     */

    this.useRangeRequests = false;
    /**
     * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
     */

    this.createInstances = true;
    /**
     * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
     */

    this.alwaysComputeBoundingBox = false;
    /**
     * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
     */

    this.loadAllMaterials = false;
    /**
     * Function called before loading a url referenced by the asset.
     */

    this.preprocessUrlAsync = function (url) {
      return Promise.resolve(url);
    };
    /**
     * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */


    this.onMeshLoadedObservable = new Observable();
    /**
     * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
     */

    this.onTextureLoadedObservable = new Observable();
    /**
     * Observable raised when the loader creates a material after parsing the glTF properties of the material.
     */

    this.onMaterialLoadedObservable = new Observable();
    /**
     * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
     */

    this.onCameraLoadedObservable = new Observable();
    /**
     * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */

    this.onCompleteObservable = new Observable();
    /**
     * Observable raised when an error occurs.
     */

    this.onErrorObservable = new Observable();
    /**
     * Observable raised after the loader is disposed.
     */

    this.onDisposeObservable = new Observable();
    /**
     * Observable raised after a loader extension is created.
     * Set additional options for a loader extension in this event.
     */

    this.onExtensionLoadedObservable = new Observable();
    /**
     * Defines if the loader should validate the asset.
     */

    this.validate = false;
    /**
     * Observable raised after validation when validate is set to true. The event data is the result of the validation.
     */

    this.onValidatedObservable = new Observable();
    this._loader = null;
    this._requests = new Array();
    /**
     * Name of the loader ("gltf")
     */

    this.name = "gltf";
    /** @hidden */

    this.extensions = {
      ".gltf": {
        isBinary: false
      },
      ".glb": {
        isBinary: true
      }
    };
    this._logIndentLevel = 0;
    this._loggingEnabled = false;
    /** @hidden */

    this._log = this._logDisabled;
    this._capturePerformanceCounters = false;
    /** @hidden */

    this._startPerformanceCounter = this._startPerformanceCounterDisabled;
    /** @hidden */

    this._endPerformanceCounter = this._endPerformanceCounterDisabled;
  }

  Object.defineProperty(GLTFFileLoader.prototype, "onParsed", {
    /**
     * Raised when the asset has been parsed
     */
    set: function (callback) {
      if (this._onParsedObserver) {
        this.onParsedObservable.remove(this._onParsedObserver);
      }

      this._onParsedObserver = this.onParsedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onMeshLoaded", {
    /**
     * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    set: function (callback) {
      if (this._onMeshLoadedObserver) {
        this.onMeshLoadedObservable.remove(this._onMeshLoadedObserver);
      }

      this._onMeshLoadedObserver = this.onMeshLoadedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onTextureLoaded", {
    /**
     * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    set: function (callback) {
      if (this._onTextureLoadedObserver) {
        this.onTextureLoadedObservable.remove(this._onTextureLoadedObserver);
      }

      this._onTextureLoadedObserver = this.onTextureLoadedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onMaterialLoaded", {
    /**
     * Callback raised when the loader creates a material after parsing the glTF properties of the material.
     */
    set: function (callback) {
      if (this._onMaterialLoadedObserver) {
        this.onMaterialLoadedObservable.remove(this._onMaterialLoadedObserver);
      }

      this._onMaterialLoadedObserver = this.onMaterialLoadedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onCameraLoaded", {
    /**
     * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    set: function (callback) {
      if (this._onCameraLoadedObserver) {
        this.onCameraLoadedObservable.remove(this._onCameraLoadedObserver);
      }

      this._onCameraLoadedObserver = this.onCameraLoadedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onComplete", {
    /**
     * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */
    set: function (callback) {
      if (this._onCompleteObserver) {
        this.onCompleteObservable.remove(this._onCompleteObserver);
      }

      this._onCompleteObserver = this.onCompleteObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onError", {
    /**
     * Callback raised when an error occurs.
     */
    set: function (callback) {
      if (this._onErrorObserver) {
        this.onErrorObservable.remove(this._onErrorObserver);
      }

      this._onErrorObserver = this.onErrorObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onDispose", {
    /**
     * Callback raised after the loader is disposed.
     */
    set: function (callback) {
      if (this._onDisposeObserver) {
        this.onDisposeObservable.remove(this._onDisposeObserver);
      }

      this._onDisposeObserver = this.onDisposeObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onExtensionLoaded", {
    /**
     * Callback raised after a loader extension is created.
     */
    set: function (callback) {
      if (this._onExtensionLoadedObserver) {
        this.onExtensionLoadedObservable.remove(this._onExtensionLoadedObserver);
      }

      this._onExtensionLoadedObserver = this.onExtensionLoadedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "loggingEnabled", {
    /**
     * Defines if the loader logging is enabled.
     */
    get: function () {
      return this._loggingEnabled;
    },
    set: function (value) {
      if (this._loggingEnabled === value) {
        return;
      }

      this._loggingEnabled = value;

      if (this._loggingEnabled) {
        this._log = this._logEnabled;
      } else {
        this._log = this._logDisabled;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "capturePerformanceCounters", {
    /**
     * Defines if the loader should capture performance counters.
     */
    get: function () {
      return this._capturePerformanceCounters;
    },
    set: function (value) {
      if (this._capturePerformanceCounters === value) {
        return;
      }

      this._capturePerformanceCounters = value;

      if (this._capturePerformanceCounters) {
        this._startPerformanceCounter = this._startPerformanceCounterEnabled;
        this._endPerformanceCounter = this._endPerformanceCounterEnabled;
      } else {
        this._startPerformanceCounter = this._startPerformanceCounterDisabled;
        this._endPerformanceCounter = this._endPerformanceCounterDisabled;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFFileLoader.prototype, "onValidated", {
    /**
     * Callback raised after a loader extension is created.
     */
    set: function (callback) {
      if (this._onValidatedObserver) {
        this.onValidatedObservable.remove(this._onValidatedObserver);
      }

      this._onValidatedObserver = this.onValidatedObservable.add(callback);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Disposes the loader, releases resources during load, and cancels any outstanding requests.
   */

  GLTFFileLoader.prototype.dispose = function () {
    if (this._loader) {
      this._loader.dispose();

      this._loader = null;
    }

    for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
      var request = _a[_i];
      request.abort();
    }

    this._requests.length = 0;
    delete this._progressCallback;

    this.preprocessUrlAsync = function (url) {
      return Promise.resolve(url);
    };

    this.onMeshLoadedObservable.clear();
    this.onTextureLoadedObservable.clear();
    this.onMaterialLoadedObservable.clear();
    this.onCameraLoadedObservable.clear();
    this.onCompleteObservable.clear();
    this.onExtensionLoadedObservable.clear();
    this.onDisposeObservable.notifyObservers(undefined);
    this.onDisposeObservable.clear();
  };
  /** @hidden */


  GLTFFileLoader.prototype.requestFile = function (scene, url, onSuccess, onProgress, useArrayBuffer, onError) {
    var _this = this;

    this._progressCallback = onProgress;

    if (useArrayBuffer) {
      if (this.useRangeRequests) {
        if (this.validate) {
          Logger.Warn("glTF validation is not supported when range requests are enabled");
        }

        var fileRequest_1 = {
          abort: function () {},
          onCompleteObservable: new Observable()
        };
        var dataBuffer = {
          readAsync: function (byteOffset, byteLength) {
            return new Promise(function (resolve, reject) {
              _this._requestFile(url, scene, function (data) {
                resolve(new Uint8Array(data));
              }, true, function (error) {
                reject(error);
              }, function (webRequest) {
                webRequest.setRequestHeader("Range", "bytes=" + byteOffset + "-" + (byteOffset + byteLength - 1));
              });
            });
          },
          byteLength: 0
        };

        this._unpackBinaryAsync(new DataReader(dataBuffer)).then(function (loaderData) {
          fileRequest_1.onCompleteObservable.notifyObservers(fileRequest_1);
          onSuccess(loaderData);
        }, onError);

        return fileRequest_1;
      }

      return this._requestFile(url, scene, function (data, request) {
        var arrayBuffer = data;

        _this._unpackBinaryAsync(new DataReader({
          readAsync: function (byteOffset, byteLength) {
            return Promise.resolve(new Uint8Array(arrayBuffer, byteOffset, byteLength));
          },
          byteLength: arrayBuffer.byteLength
        })).then(function (loaderData) {
          onSuccess(loaderData, request);
        }, onError);
      }, true, onError);
    }

    return this._requestFile(url, scene, function (data, request) {
      _this._validate(scene, data, Tools.GetFolderPath(url), Tools.GetFilename(url));

      onSuccess({
        json: _this._parseJson(data)
      }, request);
    }, useArrayBuffer, onError);
  };
  /** @hidden */


  GLTFFileLoader.prototype.readFile = function (scene, file, onSuccess, onProgress, useArrayBuffer, onError) {
    var _this = this;

    return scene._readFile(file, function (data) {
      _this._validate(scene, data, "file:", file.name);

      if (useArrayBuffer) {
        var arrayBuffer_1 = data;

        _this._unpackBinaryAsync(new DataReader({
          readAsync: function (byteOffset, byteLength) {
            return Promise.resolve(new Uint8Array(arrayBuffer_1, byteOffset, byteLength));
          },
          byteLength: arrayBuffer_1.byteLength
        })).then(onSuccess, onError);
      } else {
        onSuccess({
          json: _this._parseJson(data)
        });
      }
    }, onProgress, useArrayBuffer, onError);
  };
  /** @hidden */


  GLTFFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl, onProgress, fileName) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this.onParsedObservable.notifyObservers(data);

      _this.onParsedObservable.clear();

      _this._log("Loading " + (fileName || ""));

      _this._loader = _this._getLoader(data);
      return _this._loader.importMeshAsync(meshesNames, scene, false, data, rootUrl, onProgress, fileName);
    });
  };
  /** @hidden */


  GLTFFileLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress, fileName) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this.onParsedObservable.notifyObservers(data);

      _this.onParsedObservable.clear();

      _this._log("Loading " + (fileName || ""));

      _this._loader = _this._getLoader(data);
      return _this._loader.loadAsync(scene, data, rootUrl, onProgress, fileName);
    });
  };
  /** @hidden */


  GLTFFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl, onProgress, fileName) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this.onParsedObservable.notifyObservers(data);

      _this.onParsedObservable.clear();

      _this._log("Loading " + (fileName || ""));

      _this._loader = _this._getLoader(data); // Prepare the asset container.

      var container = new AssetContainer(scene); // Get materials/textures when loading to add to container

      var materials = [];

      _this.onMaterialLoadedObservable.add(function (material) {
        materials.push(material);
        material.onDisposeObservable.addOnce(function () {
          var index = container.materials.indexOf(material);

          if (index > -1) {
            container.materials.splice(index, 1);
          }

          index = materials.indexOf(material);

          if (index > -1) {
            materials.splice(index, 1);
          }
        });
      });

      var textures = [];

      _this.onTextureLoadedObservable.add(function (texture) {
        textures.push(texture);
        texture.onDisposeObservable.addOnce(function () {
          var index = container.textures.indexOf(texture);

          if (index > -1) {
            container.textures.splice(index, 1);
          }

          index = textures.indexOf(texture);

          if (index > -1) {
            textures.splice(index, 1);
          }
        });
      });

      var cameras = [];

      _this.onCameraLoadedObservable.add(function (camera) {
        cameras.push(camera);
      });

      return _this._loader.importMeshAsync(null, scene, true, data, rootUrl, onProgress, fileName).then(function (result) {
        Array.prototype.push.apply(container.geometries, result.geometries);
        Array.prototype.push.apply(container.meshes, result.meshes);
        Array.prototype.push.apply(container.particleSystems, result.particleSystems);
        Array.prototype.push.apply(container.skeletons, result.skeletons);
        Array.prototype.push.apply(container.animationGroups, result.animationGroups);
        Array.prototype.push.apply(container.materials, materials);
        Array.prototype.push.apply(container.textures, textures);
        Array.prototype.push.apply(container.lights, result.lights);
        Array.prototype.push.apply(container.transformNodes, result.transformNodes);
        Array.prototype.push.apply(container.cameras, cameras);
        return container;
      });
    });
  };
  /** @hidden */


  GLTFFileLoader.prototype.canDirectLoad = function (data) {
    return data.indexOf("asset") !== -1 && data.indexOf("version") !== -1 || StringTools.StartsWith(data, "data:base64," + GLTFFileLoader.magicBase64Encoded) || StringTools.StartsWith(data, "data:application/octet-stream;base64," + GLTFFileLoader.magicBase64Encoded) || StringTools.StartsWith(data, "data:model/gltf-binary;base64," + GLTFFileLoader.magicBase64Encoded);
  };
  /** @hidden */


  GLTFFileLoader.prototype.directLoad = function (scene, data) {
    if (StringTools.StartsWith(data, "base64," + GLTFFileLoader.magicBase64Encoded) || StringTools.StartsWith(data, "application/octet-stream;base64," + GLTFFileLoader.magicBase64Encoded) || StringTools.StartsWith(data, "model/gltf-binary;base64," + GLTFFileLoader.magicBase64Encoded)) {
      var arrayBuffer_2 = Tools.DecodeBase64(data);

      this._validate(scene, arrayBuffer_2);

      return this._unpackBinaryAsync(new DataReader({
        readAsync: function (byteOffset, byteLength) {
          return Promise.resolve(new Uint8Array(arrayBuffer_2, byteOffset, byteLength));
        },
        byteLength: arrayBuffer_2.byteLength
      }));
    }

    this._validate(scene, data);

    return Promise.resolve({
      json: this._parseJson(data)
    });
  };
  /** @hidden */


  GLTFFileLoader.prototype.createPlugin = function () {
    return new GLTFFileLoader();
  };

  Object.defineProperty(GLTFFileLoader.prototype, "loaderState", {
    /**
     * The loader state or null if the loader is not active.
     */
    get: function () {
      return this._loader ? this._loader.state : null;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Returns a promise that resolves when the asset is completely loaded.
   * @returns a promise that resolves when the asset is completely loaded.
   */

  GLTFFileLoader.prototype.whenCompleteAsync = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.onCompleteObservable.addOnce(function () {
        resolve();
      });

      _this.onErrorObservable.addOnce(function (reason) {
        reject(reason);
      });
    });
  };
  /** @hidden */


  GLTFFileLoader.prototype._loadFile = function (url, scene, onSuccess, useArrayBuffer, onError) {
    var _this = this;

    var request = scene._loadFile(url, onSuccess, function (event) {
      _this._onProgress(event, request);
    }, undefined, useArrayBuffer, onError);

    request.onCompleteObservable.add(function (request) {
      _this._requests.splice(_this._requests.indexOf(request), 1);
    });

    this._requests.push(request);

    return request;
  };
  /** @hidden */


  GLTFFileLoader.prototype._requestFile = function (url, scene, onSuccess, useArrayBuffer, onError, onOpened) {
    var _this = this;

    var request = scene._requestFile(url, onSuccess, function (event) {
      _this._onProgress(event, request);
    }, undefined, useArrayBuffer, onError, onOpened);

    request.onCompleteObservable.add(function (request) {
      _this._requests.splice(_this._requests.indexOf(request), 1);
    });

    this._requests.push(request);

    return request;
  };

  GLTFFileLoader.prototype._onProgress = function (event, request) {
    if (!this._progressCallback) {
      return;
    }

    request._lengthComputable = event.lengthComputable;
    request._loaded = event.loaded;
    request._total = event.total;
    var lengthComputable = true;
    var loaded = 0;
    var total = 0;

    for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
      var request_1 = _a[_i];

      if (request_1._lengthComputable === undefined || request_1._loaded === undefined || request_1._total === undefined) {
        return;
      }

      lengthComputable = lengthComputable && request_1._lengthComputable;
      loaded += request_1._loaded;
      total += request_1._total;
    }

    this._progressCallback({
      lengthComputable: lengthComputable,
      loaded: loaded,
      total: lengthComputable ? total : 0
    });
  };

  GLTFFileLoader.prototype._validate = function (scene, data, rootUrl, fileName) {
    var _this = this;

    if (rootUrl === void 0) {
      rootUrl = "";
    }

    if (fileName === void 0) {
      fileName = "";
    }

    if (!this.validate) {
      return;
    }

    this._startPerformanceCounter("Validate JSON");

    GLTFValidation.ValidateAsync(data, rootUrl, fileName, function (uri) {
      return _this.preprocessUrlAsync(rootUrl + uri).then(function (url) {
        return scene._loadFileAsync(url, undefined, true, true);
      });
    }).then(function (result) {
      _this._endPerformanceCounter("Validate JSON");

      _this.onValidatedObservable.notifyObservers(result);

      _this.onValidatedObservable.clear();
    }, function (reason) {
      _this._endPerformanceCounter("Validate JSON");

      Tools.Warn("Failed to validate: " + reason.message);

      _this.onValidatedObservable.clear();
    });
  };

  GLTFFileLoader.prototype._getLoader = function (loaderData) {
    var asset = loaderData.json.asset || {};

    this._log("Asset version: " + asset.version);

    asset.minVersion && this._log("Asset minimum version: " + asset.minVersion);
    asset.generator && this._log("Asset generator: " + asset.generator);

    var version = GLTFFileLoader._parseVersion(asset.version);

    if (!version) {
      throw new Error("Invalid version: " + asset.version);
    }

    if (asset.minVersion !== undefined) {
      var minVersion = GLTFFileLoader._parseVersion(asset.minVersion);

      if (!minVersion) {
        throw new Error("Invalid minimum version: " + asset.minVersion);
      }

      if (GLTFFileLoader._compareVersion(minVersion, {
        major: 2,
        minor: 0
      }) > 0) {
        throw new Error("Incompatible minimum version: " + asset.minVersion);
      }
    }

    var createLoaders = {
      1: GLTFFileLoader._CreateGLTF1Loader,
      2: GLTFFileLoader._CreateGLTF2Loader
    };
    var createLoader = createLoaders[version.major];

    if (!createLoader) {
      throw new Error("Unsupported version: " + asset.version);
    }

    return createLoader(this);
  };

  GLTFFileLoader.prototype._parseJson = function (json) {
    this._startPerformanceCounter("Parse JSON");

    this._log("JSON length: " + json.length);

    var parsed = JSON.parse(json);

    this._endPerformanceCounter("Parse JSON");

    return parsed;
  };

  GLTFFileLoader.prototype._unpackBinaryAsync = function (dataReader) {
    var _this = this;

    this._startPerformanceCounter("Unpack Binary"); // Read magic + version + length + json length + json format


    return dataReader.loadAsync(20).then(function () {
      var Binary = {
        Magic: 0x46546C67
      };
      var magic = dataReader.readUint32();

      if (magic !== Binary.Magic) {
        throw new Error("Unexpected magic: " + magic);
      }

      var version = dataReader.readUint32();

      if (_this.loggingEnabled) {
        _this._log("Binary version: " + version);
      }

      var length = dataReader.readUint32();

      if (dataReader.buffer.byteLength !== 0 && length !== dataReader.buffer.byteLength) {
        throw new Error("Length in header does not match actual data length: " + length + " != " + dataReader.buffer.byteLength);
      }

      var unpacked;

      switch (version) {
        case 1:
          {
            unpacked = _this._unpackBinaryV1Async(dataReader, length);
            break;
          }

        case 2:
          {
            unpacked = _this._unpackBinaryV2Async(dataReader, length);
            break;
          }

        default:
          {
            throw new Error("Unsupported version: " + version);
          }
      }

      _this._endPerformanceCounter("Unpack Binary");

      return unpacked;
    });
  };

  GLTFFileLoader.prototype._unpackBinaryV1Async = function (dataReader, length) {
    var ContentFormat = {
      JSON: 0
    };
    var contentLength = dataReader.readUint32();
    var contentFormat = dataReader.readUint32();

    if (contentFormat !== ContentFormat.JSON) {
      throw new Error("Unexpected content format: " + contentFormat);
    }

    var bodyLength = length - dataReader.byteOffset;
    var data = {
      json: this._parseJson(dataReader.readString(contentLength)),
      bin: null
    };

    if (bodyLength !== 0) {
      var startByteOffset_1 = dataReader.byteOffset;
      data.bin = {
        readAsync: function (byteOffset, byteLength) {
          return dataReader.buffer.readAsync(startByteOffset_1 + byteOffset, byteLength);
        },
        byteLength: bodyLength
      };
    }

    return Promise.resolve(data);
  };

  GLTFFileLoader.prototype._unpackBinaryV2Async = function (dataReader, length) {
    var _this = this;

    var ChunkFormat = {
      JSON: 0x4E4F534A,
      BIN: 0x004E4942
    }; // Read the JSON chunk header.

    var chunkLength = dataReader.readUint32();
    var chunkFormat = dataReader.readUint32();

    if (chunkFormat !== ChunkFormat.JSON) {
      throw new Error("First chunk format is not JSON");
    } // Bail if there are no other chunks.


    if (dataReader.byteOffset + chunkLength === length) {
      return dataReader.loadAsync(chunkLength).then(function () {
        return {
          json: _this._parseJson(dataReader.readString(chunkLength)),
          bin: null
        };
      });
    } // Read the JSON chunk and the length and type of the next chunk.


    return dataReader.loadAsync(chunkLength + 8).then(function () {
      var data = {
        json: _this._parseJson(dataReader.readString(chunkLength)),
        bin: null
      };

      var readAsync = function () {
        var chunkLength = dataReader.readUint32();
        var chunkFormat = dataReader.readUint32();

        switch (chunkFormat) {
          case ChunkFormat.JSON:
            {
              throw new Error("Unexpected JSON chunk");
            }

          case ChunkFormat.BIN:
            {
              var startByteOffset_2 = dataReader.byteOffset;
              data.bin = {
                readAsync: function (byteOffset, byteLength) {
                  return dataReader.buffer.readAsync(startByteOffset_2 + byteOffset, byteLength);
                },
                byteLength: chunkLength
              };
              dataReader.skipBytes(chunkLength);
              break;
            }

          default:
            {
              // ignore unrecognized chunkFormat
              dataReader.skipBytes(chunkLength);
              break;
            }
        }

        if (dataReader.byteOffset !== length) {
          return dataReader.loadAsync(8).then(readAsync);
        }

        return Promise.resolve(data);
      };

      return readAsync();
    });
  };

  GLTFFileLoader._parseVersion = function (version) {
    if (version === "1.0" || version === "1.0.1") {
      return {
        major: 1,
        minor: 0
      };
    }

    var match = (version + "").match(/^(\d+)\.(\d+)/);

    if (!match) {
      return null;
    }

    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2])
    };
  };

  GLTFFileLoader._compareVersion = function (a, b) {
    if (a.major > b.major) {
      return 1;
    }

    if (a.major < b.major) {
      return -1;
    }

    if (a.minor > b.minor) {
      return 1;
    }

    if (a.minor < b.minor) {
      return -1;
    }

    return 0;
  };
  /** @hidden */


  GLTFFileLoader.prototype._logOpen = function (message) {
    this._log(message);

    this._logIndentLevel++;
  };
  /** @hidden */


  GLTFFileLoader.prototype._logClose = function () {
    --this._logIndentLevel;
  };

  GLTFFileLoader.prototype._logEnabled = function (message) {
    var spaces = GLTFFileLoader._logSpaces.substr(0, this._logIndentLevel * 2);

    Logger.Log("" + spaces + message);
  };

  GLTFFileLoader.prototype._logDisabled = function (message) {};

  GLTFFileLoader.prototype._startPerformanceCounterEnabled = function (counterName) {
    Tools.StartPerformanceCounter(counterName);
  };

  GLTFFileLoader.prototype._startPerformanceCounterDisabled = function (counterName) {};

  GLTFFileLoader.prototype._endPerformanceCounterEnabled = function (counterName) {
    Tools.EndPerformanceCounter(counterName);
  };

  GLTFFileLoader.prototype._endPerformanceCounterDisabled = function (counterName) {}; // ----------
  // V1 options
  // ----------

  /**
   * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
   * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
   * Defaults to true.
   * @hidden
   */


  GLTFFileLoader.IncrementalLoading = true;
  /**
   * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
   * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
   * @hidden
   */

  GLTFFileLoader.HomogeneousCoordinates = false;
  GLTFFileLoader.magicBase64Encoded = "Z2xURg"; // "glTF" base64 encoded (without the quotes!)

  GLTFFileLoader._logSpaces = "                                ";
  return GLTFFileLoader;
}();

if (SceneLoader) {
  SceneLoader.RegisterPlugin(new GLTFFileLoader());
}

/**
* Enums
* @hidden
*/
var EComponentType;

(function (EComponentType) {
  EComponentType[EComponentType["BYTE"] = 5120] = "BYTE";
  EComponentType[EComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  EComponentType[EComponentType["SHORT"] = 5122] = "SHORT";
  EComponentType[EComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  EComponentType[EComponentType["FLOAT"] = 5126] = "FLOAT";
})(EComponentType || (EComponentType = {}));
/** @hidden */


var EShaderType;

(function (EShaderType) {
  EShaderType[EShaderType["FRAGMENT"] = 35632] = "FRAGMENT";
  EShaderType[EShaderType["VERTEX"] = 35633] = "VERTEX";
})(EShaderType || (EShaderType = {}));
/** @hidden */


var EParameterType;

(function (EParameterType) {
  EParameterType[EParameterType["BYTE"] = 5120] = "BYTE";
  EParameterType[EParameterType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  EParameterType[EParameterType["SHORT"] = 5122] = "SHORT";
  EParameterType[EParameterType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  EParameterType[EParameterType["INT"] = 5124] = "INT";
  EParameterType[EParameterType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  EParameterType[EParameterType["FLOAT"] = 5126] = "FLOAT";
  EParameterType[EParameterType["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
  EParameterType[EParameterType["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
  EParameterType[EParameterType["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
  EParameterType[EParameterType["INT_VEC2"] = 35667] = "INT_VEC2";
  EParameterType[EParameterType["INT_VEC3"] = 35668] = "INT_VEC3";
  EParameterType[EParameterType["INT_VEC4"] = 35669] = "INT_VEC4";
  EParameterType[EParameterType["BOOL"] = 35670] = "BOOL";
  EParameterType[EParameterType["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
  EParameterType[EParameterType["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
  EParameterType[EParameterType["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
  EParameterType[EParameterType["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
  EParameterType[EParameterType["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
  EParameterType[EParameterType["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
  EParameterType[EParameterType["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
})(EParameterType || (EParameterType = {}));
/** @hidden */


var ETextureWrapMode;

(function (ETextureWrapMode) {
  ETextureWrapMode[ETextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
  ETextureWrapMode[ETextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
  ETextureWrapMode[ETextureWrapMode["REPEAT"] = 10497] = "REPEAT";
})(ETextureWrapMode || (ETextureWrapMode = {}));
/** @hidden */


var ETextureFilterType;

(function (ETextureFilterType) {
  ETextureFilterType[ETextureFilterType["NEAREST"] = 9728] = "NEAREST";
  ETextureFilterType[ETextureFilterType["LINEAR"] = 9728] = "LINEAR";
  ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
  ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
  ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
  ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
})(ETextureFilterType || (ETextureFilterType = {}));
/** @hidden */


var ETextureFormat;

(function (ETextureFormat) {
  ETextureFormat[ETextureFormat["ALPHA"] = 6406] = "ALPHA";
  ETextureFormat[ETextureFormat["RGB"] = 6407] = "RGB";
  ETextureFormat[ETextureFormat["RGBA"] = 6408] = "RGBA";
  ETextureFormat[ETextureFormat["LUMINANCE"] = 6409] = "LUMINANCE";
  ETextureFormat[ETextureFormat["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
})(ETextureFormat || (ETextureFormat = {}));
/** @hidden */


var ECullingType;

(function (ECullingType) {
  ECullingType[ECullingType["FRONT"] = 1028] = "FRONT";
  ECullingType[ECullingType["BACK"] = 1029] = "BACK";
  ECullingType[ECullingType["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
})(ECullingType || (ECullingType = {}));
/** @hidden */


var EBlendingFunction;

(function (EBlendingFunction) {
  EBlendingFunction[EBlendingFunction["ZERO"] = 0] = "ZERO";
  EBlendingFunction[EBlendingFunction["ONE"] = 1] = "ONE";
  EBlendingFunction[EBlendingFunction["SRC_COLOR"] = 768] = "SRC_COLOR";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
  EBlendingFunction[EBlendingFunction["DST_COLOR"] = 774] = "DST_COLOR";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
  EBlendingFunction[EBlendingFunction["SRC_ALPHA"] = 770] = "SRC_ALPHA";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
  EBlendingFunction[EBlendingFunction["DST_ALPHA"] = 772] = "DST_ALPHA";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
  EBlendingFunction[EBlendingFunction["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
  EBlendingFunction[EBlendingFunction["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
  EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
  EBlendingFunction[EBlendingFunction["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
})(EBlendingFunction || (EBlendingFunction = {}));

/**
* Utils functions for GLTF
* @hidden
*/

var GLTFUtils = function () {
  function GLTFUtils() {}
  /**
   * Sets the given "parameter" matrix
   * @param scene: the Scene object
   * @param source: the source node where to pick the matrix
   * @param parameter: the GLTF technique parameter
   * @param uniformName: the name of the shader's uniform
   * @param shaderMaterial: the shader material
   */


  GLTFUtils.SetMatrix = function (scene, source, parameter, uniformName, shaderMaterial) {
    var mat = null;

    if (parameter.semantic === "MODEL") {
      mat = source.getWorldMatrix();
    } else if (parameter.semantic === "PROJECTION") {
      mat = scene.getProjectionMatrix();
    } else if (parameter.semantic === "VIEW") {
      mat = scene.getViewMatrix();
    } else if (parameter.semantic === "MODELVIEWINVERSETRANSPOSE") {
      mat = Matrix.Transpose(source.getWorldMatrix().multiply(scene.getViewMatrix()).invert());
    } else if (parameter.semantic === "MODELVIEW") {
      mat = source.getWorldMatrix().multiply(scene.getViewMatrix());
    } else if (parameter.semantic === "MODELVIEWPROJECTION") {
      mat = source.getWorldMatrix().multiply(scene.getTransformMatrix());
    } else if (parameter.semantic === "MODELINVERSE") {
      mat = source.getWorldMatrix().invert();
    } else if (parameter.semantic === "VIEWINVERSE") {
      mat = scene.getViewMatrix().invert();
    } else if (parameter.semantic === "PROJECTIONINVERSE") {
      mat = scene.getProjectionMatrix().invert();
    } else if (parameter.semantic === "MODELVIEWINVERSE") {
      mat = source.getWorldMatrix().multiply(scene.getViewMatrix()).invert();
    } else if (parameter.semantic === "MODELVIEWPROJECTIONINVERSE") {
      mat = source.getWorldMatrix().multiply(scene.getTransformMatrix()).invert();
    } else if (parameter.semantic === "MODELINVERSETRANSPOSE") {
      mat = Matrix.Transpose(source.getWorldMatrix().invert());
    } else {
      debugger;
    }

    if (mat) {
      switch (parameter.type) {
        case EParameterType.FLOAT_MAT2:
          shaderMaterial.setMatrix2x2(uniformName, Matrix.GetAsMatrix2x2(mat));
          break;

        case EParameterType.FLOAT_MAT3:
          shaderMaterial.setMatrix3x3(uniformName, Matrix.GetAsMatrix3x3(mat));
          break;

        case EParameterType.FLOAT_MAT4:
          shaderMaterial.setMatrix(uniformName, mat);
          break;
      }
    }
  };
  /**
   * Sets the given "parameter" matrix
   * @param shaderMaterial: the shader material
   * @param uniform: the name of the shader's uniform
   * @param value: the value of the uniform
   * @param type: the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
   */


  GLTFUtils.SetUniform = function (shaderMaterial, uniform, value, type) {
    switch (type) {
      case EParameterType.FLOAT:
        shaderMaterial.setFloat(uniform, value);
        return true;

      case EParameterType.FLOAT_VEC2:
        shaderMaterial.setVector2(uniform, Vector2.FromArray(value));
        return true;

      case EParameterType.FLOAT_VEC3:
        shaderMaterial.setVector3(uniform, Vector3.FromArray(value));
        return true;

      case EParameterType.FLOAT_VEC4:
        shaderMaterial.setVector4(uniform, Vector4.FromArray(value));
        return true;

      default:
        return false;
    }
  };
  /**
  * Returns the wrap mode of the texture
  * @param mode: the mode value
  */


  GLTFUtils.GetWrapMode = function (mode) {
    switch (mode) {
      case ETextureWrapMode.CLAMP_TO_EDGE:
        return Texture.CLAMP_ADDRESSMODE;

      case ETextureWrapMode.MIRRORED_REPEAT:
        return Texture.MIRROR_ADDRESSMODE;

      case ETextureWrapMode.REPEAT:
        return Texture.WRAP_ADDRESSMODE;

      default:
        return Texture.WRAP_ADDRESSMODE;
    }
  };
  /**
   * Returns the byte stride giving an accessor
   * @param accessor: the GLTF accessor objet
   */


  GLTFUtils.GetByteStrideFromType = function (accessor) {
    // Needs this function since "byteStride" isn't requiered in glTF format
    var type = accessor.type;

    switch (type) {
      case "VEC2":
        return 2;

      case "VEC3":
        return 3;

      case "VEC4":
        return 4;

      case "MAT2":
        return 4;

      case "MAT3":
        return 9;

      case "MAT4":
        return 16;

      default:
        return 1;
    }
  };
  /**
   * Returns the texture filter mode giving a mode value
   * @param mode: the filter mode value
   */


  GLTFUtils.GetTextureFilterMode = function (mode) {
    switch (mode) {
      case ETextureFilterType.LINEAR:
      case ETextureFilterType.LINEAR_MIPMAP_NEAREST:
      case ETextureFilterType.LINEAR_MIPMAP_LINEAR:
        return Texture.TRILINEAR_SAMPLINGMODE;

      case ETextureFilterType.NEAREST:
      case ETextureFilterType.NEAREST_MIPMAP_NEAREST:
        return Texture.NEAREST_SAMPLINGMODE;

      default:
        return Texture.BILINEAR_SAMPLINGMODE;
    }
  };

  GLTFUtils.GetBufferFromBufferView = function (gltfRuntime, bufferView, byteOffset, byteLength, componentType) {
    var byteOffset = bufferView.byteOffset + byteOffset;
    var loadedBufferView = gltfRuntime.loadedBufferViews[bufferView.buffer];

    if (byteOffset + byteLength > loadedBufferView.byteLength) {
      throw new Error("Buffer access is out of range");
    }

    var buffer = loadedBufferView.buffer;
    byteOffset += loadedBufferView.byteOffset;

    switch (componentType) {
      case EComponentType.BYTE:
        return new Int8Array(buffer, byteOffset, byteLength);

      case EComponentType.UNSIGNED_BYTE:
        return new Uint8Array(buffer, byteOffset, byteLength);

      case EComponentType.SHORT:
        return new Int16Array(buffer, byteOffset, byteLength);

      case EComponentType.UNSIGNED_SHORT:
        return new Uint16Array(buffer, byteOffset, byteLength);

      default:
        return new Float32Array(buffer, byteOffset, byteLength);
    }
  };
  /**
   * Returns a buffer from its accessor
   * @param gltfRuntime: the GLTF runtime
   * @param accessor: the GLTF accessor
   */


  GLTFUtils.GetBufferFromAccessor = function (gltfRuntime, accessor) {
    var bufferView = gltfRuntime.bufferViews[accessor.bufferView];
    var byteLength = accessor.count * GLTFUtils.GetByteStrideFromType(accessor);
    return GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, accessor.byteOffset, byteLength, accessor.componentType);
  };
  /**
   * Decodes a buffer view into a string
   * @param view: the buffer view
   */


  GLTFUtils.DecodeBufferToText = function (view) {
    var result = "";
    var length = view.byteLength;

    for (var i = 0; i < length; ++i) {
      result += String.fromCharCode(view[i]);
    }

    return result;
  };
  /**
   * Returns the default material of gltf. Related to
   * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
   * @param scene: the Babylon.js scene
   */


  GLTFUtils.GetDefaultMaterial = function (scene) {
    if (!GLTFUtils._DefaultMaterial) {
      Effect.ShadersStore["GLTFDefaultMaterialVertexShader"] = ["precision highp float;", "", "uniform mat4 worldView;", "uniform mat4 projection;", "", "attribute vec3 position;", "", "void main(void)", "{", "    gl_Position = projection * worldView * vec4(position, 1.0);", "}"].join("\n");
      Effect.ShadersStore["GLTFDefaultMaterialPixelShader"] = ["precision highp float;", "", "uniform vec4 u_emission;", "", "void main(void)", "{", "    gl_FragColor = u_emission;", "}"].join("\n");
      var shaderPath = {
        vertex: "GLTFDefaultMaterial",
        fragment: "GLTFDefaultMaterial"
      };
      var options = {
        attributes: ["position"],
        uniforms: ["worldView", "projection", "u_emission"],
        samplers: new Array(),
        needAlphaBlending: false
      };
      GLTFUtils._DefaultMaterial = new ShaderMaterial("GLTFDefaultMaterial", scene, shaderPath, options);

      GLTFUtils._DefaultMaterial.setColor4("u_emission", new Color4(0.5, 0.5, 0.5, 1.0));
    }

    return GLTFUtils._DefaultMaterial;
  }; // The GLTF default material


  GLTFUtils._DefaultMaterial = null;
  return GLTFUtils;
}();

/**
* Tokenizer. Used for shaders compatibility
* Automatically map world, view, projection, worldViewProjection, attributes and so on
*/

var ETokenType;

(function (ETokenType) {
  ETokenType[ETokenType["IDENTIFIER"] = 1] = "IDENTIFIER";
  ETokenType[ETokenType["UNKNOWN"] = 2] = "UNKNOWN";
  ETokenType[ETokenType["END_OF_INPUT"] = 3] = "END_OF_INPUT";
})(ETokenType || (ETokenType = {}));

var Tokenizer = function () {
  function Tokenizer(toParse) {
    this._pos = 0;
    this.currentToken = ETokenType.UNKNOWN;
    this.currentIdentifier = "";
    this.currentString = "";
    this.isLetterOrDigitPattern = /^[a-zA-Z0-9]+$/;
    this._toParse = toParse;
    this._maxPos = toParse.length;
  }

  Tokenizer.prototype.getNextToken = function () {
    if (this.isEnd()) {
      return ETokenType.END_OF_INPUT;
    }

    this.currentString = this.read();
    this.currentToken = ETokenType.UNKNOWN;

    if (this.currentString === "_" || this.isLetterOrDigitPattern.test(this.currentString)) {
      this.currentToken = ETokenType.IDENTIFIER;
      this.currentIdentifier = this.currentString;

      while (!this.isEnd() && (this.isLetterOrDigitPattern.test(this.currentString = this.peek()) || this.currentString === "_")) {
        this.currentIdentifier += this.currentString;
        this.forward();
      }
    }

    return this.currentToken;
  };

  Tokenizer.prototype.peek = function () {
    return this._toParse[this._pos];
  };

  Tokenizer.prototype.read = function () {
    return this._toParse[this._pos++];
  };

  Tokenizer.prototype.forward = function () {
    this._pos++;
  };

  Tokenizer.prototype.isEnd = function () {
    return this._pos >= this._maxPos;
  };

  return Tokenizer;
}();
/**
* Values
*/


var glTFTransforms = ["MODEL", "VIEW", "PROJECTION", "MODELVIEW", "MODELVIEWPROJECTION", "JOINTMATRIX"];
var babylonTransforms = ["world", "view", "projection", "worldView", "worldViewProjection", "mBones"];
var glTFAnimationPaths = ["translation", "rotation", "scale"];
var babylonAnimationPaths = ["position", "rotationQuaternion", "scaling"];
/**
* Parse
*/

var parseBuffers = function (parsedBuffers, gltfRuntime) {
  for (var buf in parsedBuffers) {
    var parsedBuffer = parsedBuffers[buf];
    gltfRuntime.buffers[buf] = parsedBuffer;
    gltfRuntime.buffersCount++;
  }
};

var parseShaders = function (parsedShaders, gltfRuntime) {
  for (var sha in parsedShaders) {
    var parsedShader = parsedShaders[sha];
    gltfRuntime.shaders[sha] = parsedShader;
    gltfRuntime.shaderscount++;
  }
};

var parseObject = function (parsedObjects, runtimeProperty, gltfRuntime) {
  for (var object in parsedObjects) {
    var parsedObject = parsedObjects[object];
    gltfRuntime[runtimeProperty][object] = parsedObject;
  }
};
/**
* Utils
*/


var normalizeUVs = function (buffer) {
  if (!buffer) {
    return;
  }

  for (var i = 0; i < buffer.length / 2; i++) {
    buffer[i * 2 + 1] = 1.0 - buffer[i * 2 + 1];
  }
};

var getAttribute = function (attributeParameter) {
  if (attributeParameter.semantic === "NORMAL") {
    return "normal";
  } else if (attributeParameter.semantic === "POSITION") {
    return "position";
  } else if (attributeParameter.semantic === "JOINT") {
    return "matricesIndices";
  } else if (attributeParameter.semantic === "WEIGHT") {
    return "matricesWeights";
  } else if (attributeParameter.semantic === "COLOR") {
    return "color";
  } else if (attributeParameter.semantic && attributeParameter.semantic.indexOf("TEXCOORD_") !== -1) {
    var channel = Number(attributeParameter.semantic.split("_")[1]);
    return "uv" + (channel === 0 ? "" : channel + 1);
  }

  return null;
};
/**
* Loads and creates animations
*/


var loadAnimations = function (gltfRuntime) {
  for (var anim in gltfRuntime.animations) {
    var animation = gltfRuntime.animations[anim];

    if (!animation.channels || !animation.samplers) {
      continue;
    }

    var lastAnimation = null;

    for (var i = 0; i < animation.channels.length; i++) {
      // Get parameters and load buffers
      var channel = animation.channels[i];
      var sampler = animation.samplers[channel.sampler];

      if (!sampler) {
        continue;
      }

      var inputData = null;
      var outputData = null;

      if (animation.parameters) {
        inputData = animation.parameters[sampler.input];
        outputData = animation.parameters[sampler.output];
      } else {
        inputData = sampler.input;
        outputData = sampler.output;
      }

      var bufferInput = GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[inputData]);
      var bufferOutput = GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[outputData]);
      var targetID = channel.target.id;
      var targetNode = gltfRuntime.scene.getNodeByID(targetID);

      if (targetNode === null) {
        targetNode = gltfRuntime.scene.getNodeByName(targetID);
      }

      if (targetNode === null) {
        Tools.Warn("Creating animation named " + anim + ". But cannot find node named " + targetID + " to attach to");
        continue;
      }

      var isBone = targetNode instanceof Bone; // Get target path (position, rotation or scaling)

      var targetPath = channel.target.path;
      var targetPathIndex = glTFAnimationPaths.indexOf(targetPath);

      if (targetPathIndex !== -1) {
        targetPath = babylonAnimationPaths[targetPathIndex];
      } // Determine animation type


      var animationType = Animation.ANIMATIONTYPE_MATRIX;

      if (!isBone) {
        if (targetPath === "rotationQuaternion") {
          animationType = Animation.ANIMATIONTYPE_QUATERNION;
          targetNode.rotationQuaternion = new Quaternion();
        } else {
          animationType = Animation.ANIMATIONTYPE_VECTOR3;
        }
      } // Create animation and key frames


      var babylonAnimation = null;
      var keys = [];
      var arrayOffset = 0;
      var modifyKey = false;

      if (isBone && lastAnimation && lastAnimation.getKeys().length === bufferInput.length) {
        babylonAnimation = lastAnimation;
        modifyKey = true;
      }

      if (!modifyKey) {
        gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;
        babylonAnimation = new Animation(anim, isBone ? "_matrix" : targetPath, 1, animationType, Animation.ANIMATIONLOOPMODE_CYCLE);
        gltfRuntime.scene._blockEntityCollection = false;
      } // For each frame


      for (var j = 0; j < bufferInput.length; j++) {
        var value = null;

        if (targetPath === "rotationQuaternion") {
          // VEC4
          value = Quaternion.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2], bufferOutput[arrayOffset + 3]]);
          arrayOffset += 4;
        } else {
          // Position and scaling are VEC3
          value = Vector3.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2]]);
          arrayOffset += 3;
        }

        if (isBone) {
          var bone = targetNode;
          var translation = Vector3.Zero();
          var rotationQuaternion = new Quaternion();
          var scaling = Vector3.Zero(); // Warning on decompose

          var mat = bone.getBaseMatrix();

          if (modifyKey && lastAnimation) {
            mat = lastAnimation.getKeys()[j].value;
          }

          mat.decompose(scaling, rotationQuaternion, translation);

          if (targetPath === "position") {
            translation = value;
          } else if (targetPath === "rotationQuaternion") {
            rotationQuaternion = value;
          } else {
            scaling = value;
          }

          value = Matrix.Compose(scaling, rotationQuaternion, translation);
        }

        if (!modifyKey) {
          keys.push({
            frame: bufferInput[j],
            value: value
          });
        } else if (lastAnimation) {
          lastAnimation.getKeys()[j].value = value;
        }
      } // Finish


      if (!modifyKey && babylonAnimation) {
        babylonAnimation.setKeys(keys);
        targetNode.animations.push(babylonAnimation);
      }

      lastAnimation = babylonAnimation;
      gltfRuntime.scene.stopAnimation(targetNode);
      gltfRuntime.scene.beginAnimation(targetNode, 0, bufferInput[bufferInput.length - 1], true, 1.0);
    }
  }
};
/**
* Returns the bones transformation matrix
*/


var configureBoneTransformation = function (node) {
  var mat = null;

  if (node.translation || node.rotation || node.scale) {
    var scale = Vector3.FromArray(node.scale || [1, 1, 1]);
    var rotation = Quaternion.FromArray(node.rotation || [0, 0, 0, 1]);
    var position = Vector3.FromArray(node.translation || [0, 0, 0]);
    mat = Matrix.Compose(scale, rotation, position);
  } else {
    mat = Matrix.FromArray(node.matrix);
  }

  return mat;
};
/**
* Returns the parent bone
*/


var getParentBone = function (gltfRuntime, skins, jointName, newSkeleton) {
  // Try to find
  for (var i = 0; i < newSkeleton.bones.length; i++) {
    if (newSkeleton.bones[i].name === jointName) {
      return newSkeleton.bones[i];
    }
  } // Not found, search in gltf nodes


  var nodes = gltfRuntime.nodes;

  for (var nde in nodes) {
    var node = nodes[nde];

    if (!node.jointName) {
      continue;
    }

    var children = node.children;

    for (var i = 0; i < children.length; i++) {
      var child = gltfRuntime.nodes[children[i]];

      if (!child.jointName) {
        continue;
      }

      if (child.jointName === jointName) {
        var mat = configureBoneTransformation(node);
        var bone = new Bone(node.name || "", newSkeleton, getParentBone(gltfRuntime, skins, node.jointName, newSkeleton), mat);
        bone.id = nde;
        return bone;
      }
    }
  }

  return null;
};
/**
* Returns the appropriate root node
*/


var getNodeToRoot = function (nodesToRoot, id) {
  for (var i = 0; i < nodesToRoot.length; i++) {
    var nodeToRoot = nodesToRoot[i];

    for (var j = 0; j < nodeToRoot.node.children.length; j++) {
      var child = nodeToRoot.node.children[j];

      if (child === id) {
        return nodeToRoot.bone;
      }
    }
  }

  return null;
};
/**
* Returns the node with the joint name
*/


var getJointNode = function (gltfRuntime, jointName) {
  var nodes = gltfRuntime.nodes;
  var node = nodes[jointName];

  if (node) {
    return {
      node: node,
      id: jointName
    };
  }

  for (var nde in nodes) {
    node = nodes[nde];

    if (node.jointName === jointName) {
      return {
        node: node,
        id: nde
      };
    }
  }

  return null;
};
/**
* Checks if a nodes is in joints
*/


var nodeIsInJoints = function (skins, id) {
  for (var i = 0; i < skins.jointNames.length; i++) {
    if (skins.jointNames[i] === id) {
      return true;
    }
  }

  return false;
};
/**
* Fills the nodes to root for bones and builds hierarchy
*/


var getNodesToRoot = function (gltfRuntime, newSkeleton, skins, nodesToRoot) {
  // Creates nodes for root
  for (var nde in gltfRuntime.nodes) {
    var node = gltfRuntime.nodes[nde];
    var id = nde;

    if (!node.jointName || nodeIsInJoints(skins, node.jointName)) {
      continue;
    } // Create node to root bone


    var mat = configureBoneTransformation(node);
    var bone = new Bone(node.name || "", newSkeleton, null, mat);
    bone.id = id;
    nodesToRoot.push({
      bone: bone,
      node: node,
      id: id
    });
  } // Parenting


  for (var i = 0; i < nodesToRoot.length; i++) {
    var nodeToRoot = nodesToRoot[i];
    var children = nodeToRoot.node.children;

    for (var j = 0; j < children.length; j++) {
      var child = null;

      for (var k = 0; k < nodesToRoot.length; k++) {
        if (nodesToRoot[k].id === children[j]) {
          child = nodesToRoot[k];
          break;
        }
      }

      if (child) {
        child.bone._parent = nodeToRoot.bone;
        nodeToRoot.bone.children.push(child.bone);
      }
    }
  }
};
/**
* Imports a skeleton
*/


var importSkeleton = function (gltfRuntime, skins, mesh, newSkeleton, id) {
  if (!newSkeleton) {
    newSkeleton = new Skeleton(skins.name || "", "", gltfRuntime.scene);
  }

  if (!skins.babylonSkeleton) {
    return newSkeleton;
  } // Find the root bones


  var nodesToRoot = [];
  var nodesToRootToAdd = [];
  getNodesToRoot(gltfRuntime, newSkeleton, skins, nodesToRoot);
  newSkeleton.bones = []; // Joints

  for (var i = 0; i < skins.jointNames.length; i++) {
    var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);

    if (!jointNode) {
      continue;
    }

    var node = jointNode.node;

    if (!node) {
      Tools.Warn("Joint named " + skins.jointNames[i] + " does not exist");
      continue;
    }

    var id = jointNode.id; // Optimize, if the bone already exists...

    var existingBone = gltfRuntime.scene.getBoneByID(id);

    if (existingBone) {
      newSkeleton.bones.push(existingBone);
      continue;
    } // Search for parent bone


    var foundBone = false;
    var parentBone = null;

    for (var j = 0; j < i; j++) {
      var jointNode_1 = getJointNode(gltfRuntime, skins.jointNames[j]);

      if (!jointNode_1) {
        continue;
      }

      var joint = jointNode_1.node;

      if (!joint) {
        Tools.Warn("Joint named " + skins.jointNames[j] + " does not exist when looking for parent");
        continue;
      }

      var children = joint.children;

      if (!children) {
        continue;
      }

      foundBone = false;

      for (var k = 0; k < children.length; k++) {
        if (children[k] === id) {
          parentBone = getParentBone(gltfRuntime, skins, skins.jointNames[j], newSkeleton);
          foundBone = true;
          break;
        }
      }

      if (foundBone) {
        break;
      }
    } // Create bone


    var mat = configureBoneTransformation(node);

    if (!parentBone && nodesToRoot.length > 0) {
      parentBone = getNodeToRoot(nodesToRoot, id);

      if (parentBone) {
        if (nodesToRootToAdd.indexOf(parentBone) === -1) {
          nodesToRootToAdd.push(parentBone);
        }
      }
    }

    var bone = new Bone(node.jointName || "", newSkeleton, parentBone, mat);
    bone.id = id;
  } // Polish


  var bones = newSkeleton.bones;
  newSkeleton.bones = [];

  for (var i = 0; i < skins.jointNames.length; i++) {
    var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);

    if (!jointNode) {
      continue;
    }

    for (var j = 0; j < bones.length; j++) {
      if (bones[j].id === jointNode.id) {
        newSkeleton.bones.push(bones[j]);
        break;
      }
    }
  }

  newSkeleton.prepare(); // Finish

  for (var i = 0; i < nodesToRootToAdd.length; i++) {
    newSkeleton.bones.push(nodesToRootToAdd[i]);
  }

  return newSkeleton;
};
/**
* Imports a mesh and its geometries
*/


var importMesh = function (gltfRuntime, node, meshes, id, newMesh) {
  if (!newMesh) {
    gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;
    newMesh = new Mesh(node.name || "", gltfRuntime.scene);
    gltfRuntime.scene._blockEntityCollection = false;
    newMesh.id = id;
  }

  if (!node.babylonNode) {
    return newMesh;
  }

  var subMaterials = [];
  var vertexData = null;
  var verticesStarts = new Array();
  var verticesCounts = new Array();
  var indexStarts = new Array();
  var indexCounts = new Array();

  for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
    var meshID = meshes[meshIndex];
    var mesh = gltfRuntime.meshes[meshID];

    if (!mesh) {
      continue;
    } // Positions, normals and UVs


    for (var i = 0; i < mesh.primitives.length; i++) {
      // Temporary vertex data
      var tempVertexData = new VertexData();
      var primitive = mesh.primitives[i];

      if (primitive.mode !== 4) ;

      var attributes = primitive.attributes;
      var accessor = null;
      var buffer = null; // Set positions, normal and uvs

      for (var semantic in attributes) {
        // Link accessor and buffer view
        accessor = gltfRuntime.accessors[attributes[semantic]];
        buffer = GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);

        if (semantic === "NORMAL") {
          tempVertexData.normals = new Float32Array(buffer.length);
          tempVertexData.normals.set(buffer);
        } else if (semantic === "POSITION") {
          if (GLTFFileLoader.HomogeneousCoordinates) {
            tempVertexData.positions = new Float32Array(buffer.length - buffer.length / 4);

            for (var j = 0; j < buffer.length; j += 4) {
              tempVertexData.positions[j] = buffer[j];
              tempVertexData.positions[j + 1] = buffer[j + 1];
              tempVertexData.positions[j + 2] = buffer[j + 2];
            }
          } else {
            tempVertexData.positions = new Float32Array(buffer.length);
            tempVertexData.positions.set(buffer);
          }

          verticesCounts.push(tempVertexData.positions.length);
        } else if (semantic.indexOf("TEXCOORD_") !== -1) {
          var channel = Number(semantic.split("_")[1]);
          var uvKind = VertexBuffer.UVKind + (channel === 0 ? "" : channel + 1);
          var uvs = new Float32Array(buffer.length);
          uvs.set(buffer);
          normalizeUVs(uvs);
          tempVertexData.set(uvs, uvKind);
        } else if (semantic === "JOINT") {
          tempVertexData.matricesIndices = new Float32Array(buffer.length);
          tempVertexData.matricesIndices.set(buffer);
        } else if (semantic === "WEIGHT") {
          tempVertexData.matricesWeights = new Float32Array(buffer.length);
          tempVertexData.matricesWeights.set(buffer);
        } else if (semantic === "COLOR") {
          tempVertexData.colors = new Float32Array(buffer.length);
          tempVertexData.colors.set(buffer);
        }
      } // Indices


      accessor = gltfRuntime.accessors[primitive.indices];

      if (accessor) {
        buffer = GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);
        tempVertexData.indices = new Int32Array(buffer.length);
        tempVertexData.indices.set(buffer);
        indexCounts.push(tempVertexData.indices.length);
      } else {
        // Set indices on the fly
        var indices = [];

        for (var j = 0; j < tempVertexData.positions.length / 3; j++) {
          indices.push(j);
        }

        tempVertexData.indices = new Int32Array(indices);
        indexCounts.push(tempVertexData.indices.length);
      }

      if (!vertexData) {
        vertexData = tempVertexData;
      } else {
        vertexData.merge(tempVertexData);
      } // Sub material


      var material_1 = gltfRuntime.scene.getMaterialByID(primitive.material);
      subMaterials.push(material_1 === null ? GLTFUtils.GetDefaultMaterial(gltfRuntime.scene) : material_1); // Update vertices start and index start

      verticesStarts.push(verticesStarts.length === 0 ? 0 : verticesStarts[verticesStarts.length - 1] + verticesCounts[verticesCounts.length - 2]);
      indexStarts.push(indexStarts.length === 0 ? 0 : indexStarts[indexStarts.length - 1] + indexCounts[indexCounts.length - 2]);
    }
  }

  var material;
  gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;

  if (subMaterials.length > 1) {
    material = new MultiMaterial("multimat" + id, gltfRuntime.scene);
    material.subMaterials = subMaterials;
  } else {
    material = new StandardMaterial("multimat" + id, gltfRuntime.scene);
  }

  if (subMaterials.length === 1) {
    material = subMaterials[0];
  }

  if (!newMesh.material) {
    newMesh.material = material;
  } // Apply geometry


  new Geometry(id, gltfRuntime.scene, vertexData, false, newMesh);
  newMesh.computeWorldMatrix(true);
  gltfRuntime.scene._blockEntityCollection = false; // Apply submeshes

  newMesh.subMeshes = [];
  var index = 0;

  for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
    var meshID = meshes[meshIndex];
    var mesh = gltfRuntime.meshes[meshID];

    if (!mesh) {
      continue;
    }

    for (var i = 0; i < mesh.primitives.length; i++) {
      if (mesh.primitives[i].mode !== 4) ;

      SubMesh.AddToMesh(index, verticesStarts[index], verticesCounts[index], indexStarts[index], indexCounts[index], newMesh, newMesh, true);
      index++;
    }
  } // Finish


  return newMesh;
};
/**
* Configure node transformation from position, rotation and scaling
*/


var configureNode = function (newNode, position, rotation, scaling) {
  if (newNode.position) {
    newNode.position = position;
  }

  if (newNode.rotationQuaternion || newNode.rotation) {
    newNode.rotationQuaternion = rotation;
  }

  if (newNode.scaling) {
    newNode.scaling = scaling;
  }
};
/**
* Configures node from transformation matrix
*/


var configureNodeFromMatrix = function (newNode, node, parent) {
  if (node.matrix) {
    var position = new Vector3(0, 0, 0);
    var rotation = new Quaternion();
    var scaling = new Vector3(0, 0, 0);
    var mat = Matrix.FromArray(node.matrix);
    mat.decompose(scaling, rotation, position);
    configureNode(newNode, position, rotation, scaling);
  } else if (node.translation && node.rotation && node.scale) {
    configureNode(newNode, Vector3.FromArray(node.translation), Quaternion.FromArray(node.rotation), Vector3.FromArray(node.scale));
  }

  newNode.computeWorldMatrix(true);
};
/**
* Imports a node
*/


var importNode = function (gltfRuntime, node, id, parent) {
  var lastNode = null;

  if (gltfRuntime.importOnlyMeshes && (node.skin || node.meshes)) {
    if (gltfRuntime.importMeshesNames && gltfRuntime.importMeshesNames.length > 0 && gltfRuntime.importMeshesNames.indexOf(node.name || "") === -1) {
      return null;
    }
  } // Meshes


  if (node.skin) {
    if (node.meshes) {
      var skin = gltfRuntime.skins[node.skin];
      var newMesh = importMesh(gltfRuntime, node, node.meshes, id, node.babylonNode);
      newMesh.skeleton = gltfRuntime.scene.getLastSkeletonByID(node.skin);

      if (newMesh.skeleton === null) {
        newMesh.skeleton = importSkeleton(gltfRuntime, skin, newMesh, skin.babylonSkeleton, node.skin);

        if (!skin.babylonSkeleton) {
          skin.babylonSkeleton = newMesh.skeleton;
        }
      }

      lastNode = newMesh;
    }
  } else if (node.meshes) {
    /**
    * Improve meshes property
    */
    var newMesh = importMesh(gltfRuntime, node, node.mesh ? [node.mesh] : node.meshes, id, node.babylonNode);
    lastNode = newMesh;
  } // Lights
  else if (node.light && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
    var light = gltfRuntime.lights[node.light];

    if (light) {
      if (light.type === "ambient") {
        var ambienLight = light[light.type];
        var hemiLight = new HemisphericLight(node.light, Vector3.Zero(), gltfRuntime.scene);
        hemiLight.name = node.name || "";

        if (ambienLight.color) {
          hemiLight.diffuse = Color3.FromArray(ambienLight.color);
        }

        lastNode = hemiLight;
      } else if (light.type === "directional") {
        var directionalLight = light[light.type];
        var dirLight = new DirectionalLight(node.light, Vector3.Zero(), gltfRuntime.scene);
        dirLight.name = node.name || "";

        if (directionalLight.color) {
          dirLight.diffuse = Color3.FromArray(directionalLight.color);
        }

        lastNode = dirLight;
      } else if (light.type === "point") {
        var pointLight = light[light.type];
        var ptLight = new PointLight(node.light, Vector3.Zero(), gltfRuntime.scene);
        ptLight.name = node.name || "";

        if (pointLight.color) {
          ptLight.diffuse = Color3.FromArray(pointLight.color);
        }

        lastNode = ptLight;
      } else if (light.type === "spot") {
        var spotLight = light[light.type];
        var spLight = new SpotLight(node.light, Vector3.Zero(), Vector3.Zero(), 0, 0, gltfRuntime.scene);
        spLight.name = node.name || "";

        if (spotLight.color) {
          spLight.diffuse = Color3.FromArray(spotLight.color);
        }

        if (spotLight.fallOfAngle) {
          spLight.angle = spotLight.fallOfAngle;
        }

        if (spotLight.fallOffExponent) {
          spLight.exponent = spotLight.fallOffExponent;
        }

        lastNode = spLight;
      }
    }
  } // Cameras
  else if (node.camera && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
    var camera = gltfRuntime.cameras[node.camera];

    if (camera) {
      gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;

      if (camera.type === "orthographic") {
        var orthoCamera = new FreeCamera(node.camera, Vector3.Zero(), gltfRuntime.scene, false);
        orthoCamera.name = node.name || "";
        orthoCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        orthoCamera.attachControl();
        lastNode = orthoCamera;
      } else if (camera.type === "perspective") {
        var perspectiveCamera = camera[camera.type];
        var persCamera = new FreeCamera(node.camera, Vector3.Zero(), gltfRuntime.scene, false);
        persCamera.name = node.name || "";
        persCamera.attachControl();

        if (!perspectiveCamera.aspectRatio) {
          perspectiveCamera.aspectRatio = gltfRuntime.scene.getEngine().getRenderWidth() / gltfRuntime.scene.getEngine().getRenderHeight();
        }

        if (perspectiveCamera.znear && perspectiveCamera.zfar) {
          persCamera.maxZ = perspectiveCamera.zfar;
          persCamera.minZ = perspectiveCamera.znear;
        }

        lastNode = persCamera;
      }

      gltfRuntime.scene._blockEntityCollection = false;
    }
  } // Empty node


  if (!node.jointName) {
    if (node.babylonNode) {
      return node.babylonNode;
    } else if (lastNode === null) {
      gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;
      var dummy = new Mesh(node.name || "", gltfRuntime.scene);
      gltfRuntime.scene._blockEntityCollection = false;
      node.babylonNode = dummy;
      lastNode = dummy;
    }
  }

  if (lastNode !== null) {
    if (node.matrix && lastNode instanceof Mesh) {
      configureNodeFromMatrix(lastNode, node);
    } else {
      var translation = node.translation || [0, 0, 0];
      var rotation = node.rotation || [0, 0, 0, 1];
      var scale = node.scale || [1, 1, 1];
      configureNode(lastNode, Vector3.FromArray(translation), Quaternion.FromArray(rotation), Vector3.FromArray(scale));
    }

    lastNode.updateCache(true);
    node.babylonNode = lastNode;
  }

  return lastNode;
};
/**
* Traverses nodes and creates them
*/


var traverseNodes = function (gltfRuntime, id, parent, meshIncluded) {
  if (meshIncluded === void 0) {
    meshIncluded = false;
  }

  var node = gltfRuntime.nodes[id];
  var newNode = null;

  if (gltfRuntime.importOnlyMeshes && !meshIncluded && gltfRuntime.importMeshesNames) {
    if (gltfRuntime.importMeshesNames.indexOf(node.name || "") !== -1 || gltfRuntime.importMeshesNames.length === 0) {
      meshIncluded = true;
    } else {
      meshIncluded = false;
    }
  } else {
    meshIncluded = true;
  }

  if (!node.jointName && meshIncluded) {
    newNode = importNode(gltfRuntime, node, id);

    if (newNode !== null) {
      newNode.id = id;
      newNode.parent = parent;
    }
  }

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      traverseNodes(gltfRuntime, node.children[i], newNode, meshIncluded);
    }
  }
};
/**
* do stuff after buffers, shaders are loaded (e.g. hook up materials, load animations, etc.)
*/


var postLoad = function (gltfRuntime) {
  // Nodes
  var currentScene = gltfRuntime.currentScene;

  if (currentScene) {
    for (var i = 0; i < currentScene.nodes.length; i++) {
      traverseNodes(gltfRuntime, currentScene.nodes[i], null);
    }
  } else {
    for (var thing in gltfRuntime.scenes) {
      currentScene = gltfRuntime.scenes[thing];

      for (var i = 0; i < currentScene.nodes.length; i++) {
        traverseNodes(gltfRuntime, currentScene.nodes[i], null);
      }
    }
  } // Set animations


  loadAnimations(gltfRuntime);

  for (var i = 0; i < gltfRuntime.scene.skeletons.length; i++) {
    var skeleton = gltfRuntime.scene.skeletons[i];
    gltfRuntime.scene.beginAnimation(skeleton, 0, Number.MAX_VALUE, true, 1.0);
  }
};
/**
* onBind shaderrs callback to set uniforms and matrices
*/


var onBindShaderMaterial = function (mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess) {
  var materialValues = material.values || technique.parameters;

  for (var unif in unTreatedUniforms) {
    var uniform = unTreatedUniforms[unif];
    var type = uniform.type;

    if (type === EParameterType.FLOAT_MAT2 || type === EParameterType.FLOAT_MAT3 || type === EParameterType.FLOAT_MAT4) {
      if (uniform.semantic && !uniform.source && !uniform.node) {
        GLTFUtils.SetMatrix(gltfRuntime.scene, mesh, uniform, unif, shaderMaterial.getEffect());
      } else if (uniform.semantic && (uniform.source || uniform.node)) {
        var source = gltfRuntime.scene.getNodeByName(uniform.source || uniform.node || "");

        if (source === null) {
          source = gltfRuntime.scene.getNodeByID(uniform.source || uniform.node || "");
        }

        if (source === null) {
          continue;
        }

        GLTFUtils.SetMatrix(gltfRuntime.scene, source, uniform, unif, shaderMaterial.getEffect());
      }
    } else {
      var value = materialValues[technique.uniforms[unif]];

      if (!value) {
        continue;
      }

      if (type === EParameterType.SAMPLER_2D) {
        var texture = gltfRuntime.textures[material.values ? value : uniform.value].babylonTexture;

        if (texture === null || texture === undefined) {
          continue;
        }

        shaderMaterial.getEffect().setTexture(unif, texture);
      } else {
        GLTFUtils.SetUniform(shaderMaterial.getEffect(), unif, value, type);
      }
    }
  }

  onSuccess(shaderMaterial);
};
/**
* Prepare uniforms to send the only one time
* Loads the appropriate textures
*/


var prepareShaderMaterialUniforms = function (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms) {
  var materialValues = material.values || technique.parameters;
  var techniqueUniforms = technique.uniforms;
  /**
  * Prepare values here (not matrices)
  */

  for (var unif in unTreatedUniforms) {
    var uniform = unTreatedUniforms[unif];
    var type = uniform.type;
    var value = materialValues[techniqueUniforms[unif]];

    if (value === undefined) {
      // In case the value is the same for all materials
      value = uniform.value;
    }

    if (!value) {
      continue;
    }

    var onLoadTexture = function (uniformName) {
      return function (texture) {
        if (uniform.value && uniformName) {
          // Static uniform
          shaderMaterial.setTexture(uniformName, texture);
          delete unTreatedUniforms[uniformName];
        }
      };
    }; // Texture (sampler2D)


    if (type === EParameterType.SAMPLER_2D) {
      GLTFLoaderExtension.LoadTextureAsync(gltfRuntime, material.values ? value : uniform.value, onLoadTexture(unif), function () {
        return onLoadTexture(null);
      });
    } // Others
    else {
      if (uniform.value && GLTFUtils.SetUniform(shaderMaterial, unif, material.values ? value : uniform.value, type)) {
        // Static uniform
        delete unTreatedUniforms[unif];
      }
    }
  }
};
/**
* Shader compilation failed
*/


var onShaderCompileError = function (program, shaderMaterial, onError) {
  return function (effect, error) {
    shaderMaterial.dispose(true);
    onError("Cannot compile program named " + program.name + ". Error: " + error + ". Default material will be applied");
  };
};
/**
* Shader compilation success
*/


var onShaderCompileSuccess = function (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess) {
  return function (_) {
    prepareShaderMaterialUniforms(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms);

    shaderMaterial.onBind = function (mesh) {
      onBindShaderMaterial(mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess);
    };
  };
};
/**
* Returns the appropriate uniform if already handled by babylon
*/


var parseShaderUniforms = function (tokenizer, technique, unTreatedUniforms) {
  for (var unif in technique.uniforms) {
    var uniform = technique.uniforms[unif];
    var uniformParameter = technique.parameters[uniform];

    if (tokenizer.currentIdentifier === unif) {
      if (uniformParameter.semantic && !uniformParameter.source && !uniformParameter.node) {
        var transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);

        if (transformIndex !== -1) {
          delete unTreatedUniforms[unif];
          return babylonTransforms[transformIndex];
        }
      }
    }
  }

  return tokenizer.currentIdentifier;
};
/**
* All shaders loaded. Create materials one by one
*/


var importMaterials = function (gltfRuntime) {
  // Create materials
  for (var mat in gltfRuntime.materials) {
    GLTFLoaderExtension.LoadMaterialAsync(gltfRuntime, mat, function (material) {}, function () {});
  }
};
/**
* Implementation of the base glTF spec
* @hidden
*/


var GLTFLoaderBase = function () {
  function GLTFLoaderBase() {}

  GLTFLoaderBase.CreateRuntime = function (parsedData, scene, rootUrl) {
    var gltfRuntime = {
      extensions: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      meshes: {},
      lights: {},
      cameras: {},
      nodes: {},
      images: {},
      textures: {},
      shaders: {},
      programs: {},
      samplers: {},
      techniques: {},
      materials: {},
      animations: {},
      skins: {},
      extensionsUsed: [],
      scenes: {},
      buffersCount: 0,
      shaderscount: 0,
      scene: scene,
      rootUrl: rootUrl,
      loadedBufferCount: 0,
      loadedBufferViews: {},
      loadedShaderCount: 0,
      importOnlyMeshes: false,
      dummyNodes: [],
      forAssetContainer: false
    }; // Parse

    if (parsedData.extensions) {
      parseObject(parsedData.extensions, "extensions", gltfRuntime);
    }

    if (parsedData.extensionsUsed) {
      parseObject(parsedData.extensionsUsed, "extensionsUsed", gltfRuntime);
    }

    if (parsedData.buffers) {
      parseBuffers(parsedData.buffers, gltfRuntime);
    }

    if (parsedData.bufferViews) {
      parseObject(parsedData.bufferViews, "bufferViews", gltfRuntime);
    }

    if (parsedData.accessors) {
      parseObject(parsedData.accessors, "accessors", gltfRuntime);
    }

    if (parsedData.meshes) {
      parseObject(parsedData.meshes, "meshes", gltfRuntime);
    }

    if (parsedData.lights) {
      parseObject(parsedData.lights, "lights", gltfRuntime);
    }

    if (parsedData.cameras) {
      parseObject(parsedData.cameras, "cameras", gltfRuntime);
    }

    if (parsedData.nodes) {
      parseObject(parsedData.nodes, "nodes", gltfRuntime);
    }

    if (parsedData.images) {
      parseObject(parsedData.images, "images", gltfRuntime);
    }

    if (parsedData.textures) {
      parseObject(parsedData.textures, "textures", gltfRuntime);
    }

    if (parsedData.shaders) {
      parseShaders(parsedData.shaders, gltfRuntime);
    }

    if (parsedData.programs) {
      parseObject(parsedData.programs, "programs", gltfRuntime);
    }

    if (parsedData.samplers) {
      parseObject(parsedData.samplers, "samplers", gltfRuntime);
    }

    if (parsedData.techniques) {
      parseObject(parsedData.techniques, "techniques", gltfRuntime);
    }

    if (parsedData.materials) {
      parseObject(parsedData.materials, "materials", gltfRuntime);
    }

    if (parsedData.animations) {
      parseObject(parsedData.animations, "animations", gltfRuntime);
    }

    if (parsedData.skins) {
      parseObject(parsedData.skins, "skins", gltfRuntime);
    }

    if (parsedData.scenes) {
      gltfRuntime.scenes = parsedData.scenes;
    }

    if (parsedData.scene && parsedData.scenes) {
      gltfRuntime.currentScene = parsedData.scenes[parsedData.scene];
    }

    return gltfRuntime;
  };

  GLTFLoaderBase.LoadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
    var buffer = gltfRuntime.buffers[id];

    if (Tools.IsBase64(buffer.uri)) {
      setTimeout(function () {
        return onSuccess(new Uint8Array(Tools.DecodeBase64(buffer.uri)));
      });
    } else {
      Tools.LoadFile(gltfRuntime.rootUrl + buffer.uri, function (data) {
        return onSuccess(new Uint8Array(data));
      }, onProgress, undefined, true, function (request) {
        if (request) {
          onError(request.status + " " + request.statusText);
        }
      });
    }
  };

  GLTFLoaderBase.LoadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
    var texture = gltfRuntime.textures[id];

    if (!texture || !texture.source) {
      onError("");
      return;
    }

    if (texture.babylonTexture) {
      onSuccess(null);
      return;
    }

    var source = gltfRuntime.images[texture.source];

    if (Tools.IsBase64(source.uri)) {
      setTimeout(function () {
        return onSuccess(new Uint8Array(Tools.DecodeBase64(source.uri)));
      });
    } else {
      Tools.LoadFile(gltfRuntime.rootUrl + source.uri, function (data) {
        return onSuccess(new Uint8Array(data));
      }, undefined, undefined, true, function (request) {
        if (request) {
          onError(request.status + " " + request.statusText);
        }
      });
    }
  };

  GLTFLoaderBase.CreateTextureAsync = function (gltfRuntime, id, buffer, onSuccess, onError) {
    var texture = gltfRuntime.textures[id];

    if (texture.babylonTexture) {
      onSuccess(texture.babylonTexture);
      return;
    }

    var sampler = gltfRuntime.samplers[texture.sampler];
    var createMipMaps = sampler.minFilter === ETextureFilterType.NEAREST_MIPMAP_NEAREST || sampler.minFilter === ETextureFilterType.NEAREST_MIPMAP_LINEAR || sampler.minFilter === ETextureFilterType.LINEAR_MIPMAP_NEAREST || sampler.minFilter === ETextureFilterType.LINEAR_MIPMAP_LINEAR;
    var samplingMode = Texture.BILINEAR_SAMPLINGMODE;
    var blob = buffer == null ? new Blob() : new Blob([buffer]);
    var blobURL = URL.createObjectURL(blob);

    var revokeBlobURL = function () {
      return URL.revokeObjectURL(blobURL);
    };

    var newTexture = new Texture(blobURL, gltfRuntime.scene, !createMipMaps, true, samplingMode, revokeBlobURL, revokeBlobURL);

    if (sampler.wrapS !== undefined) {
      newTexture.wrapU = GLTFUtils.GetWrapMode(sampler.wrapS);
    }

    if (sampler.wrapT !== undefined) {
      newTexture.wrapV = GLTFUtils.GetWrapMode(sampler.wrapT);
    }

    newTexture.name = id;
    texture.babylonTexture = newTexture;
    onSuccess(newTexture);
  };

  GLTFLoaderBase.LoadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
    var shader = gltfRuntime.shaders[id];

    if (Tools.IsBase64(shader.uri)) {
      var shaderString = atob(shader.uri.split(",")[1]);

      if (onSuccess) {
        onSuccess(shaderString);
      }
    } else {
      Tools.LoadFile(gltfRuntime.rootUrl + shader.uri, onSuccess, undefined, undefined, false, function (request) {
        if (request && onError) {
          onError(request.status + " " + request.statusText);
        }
      });
    }
  };

  GLTFLoaderBase.LoadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
    var material = gltfRuntime.materials[id];

    if (!material.technique) {
      if (onError) {
        onError("No technique found.");
      }

      return;
    }

    var technique = gltfRuntime.techniques[material.technique];

    if (!technique) {
      gltfRuntime.scene._blockEntityCollection = gltfRuntime.forAssetContainer;
      var defaultMaterial = new StandardMaterial(id, gltfRuntime.scene);
      gltfRuntime.scene._blockEntityCollection = false;
      defaultMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
      defaultMaterial.sideOrientation = Material.CounterClockWiseSideOrientation;
      onSuccess(defaultMaterial);
      return;
    }

    var program = gltfRuntime.programs[technique.program];
    var states = technique.states;
    var vertexShader = Effect.ShadersStore[program.vertexShader + "VertexShader"];
    var pixelShader = Effect.ShadersStore[program.fragmentShader + "PixelShader"];
    var newVertexShader = "";
    var newPixelShader = "";
    var vertexTokenizer = new Tokenizer(vertexShader);
    var pixelTokenizer = new Tokenizer(pixelShader);
    var unTreatedUniforms = {};
    var uniforms = [];
    var attributes = [];
    var samplers = []; // Fill uniform, sampler2D and attributes

    for (var unif in technique.uniforms) {
      var uniform = technique.uniforms[unif];
      var uniformParameter = technique.parameters[uniform];
      unTreatedUniforms[unif] = uniformParameter;

      if (uniformParameter.semantic && !uniformParameter.node && !uniformParameter.source) {
        var transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);

        if (transformIndex !== -1) {
          uniforms.push(babylonTransforms[transformIndex]);
          delete unTreatedUniforms[unif];
        } else {
          uniforms.push(unif);
        }
      } else if (uniformParameter.type === EParameterType.SAMPLER_2D) {
        samplers.push(unif);
      } else {
        uniforms.push(unif);
      }
    }

    for (var attr in technique.attributes) {
      var attribute = technique.attributes[attr];
      var attributeParameter = technique.parameters[attribute];

      if (attributeParameter.semantic) {
        var name_1 = getAttribute(attributeParameter);

        if (name_1) {
          attributes.push(name_1);
        }
      }
    } // Configure vertex shader


    while (!vertexTokenizer.isEnd() && vertexTokenizer.getNextToken()) {
      var tokenType = vertexTokenizer.currentToken;

      if (tokenType !== ETokenType.IDENTIFIER) {
        newVertexShader += vertexTokenizer.currentString;
        continue;
      }

      var foundAttribute = false;

      for (var attr in technique.attributes) {
        var attribute = technique.attributes[attr];
        var attributeParameter = technique.parameters[attribute];

        if (vertexTokenizer.currentIdentifier === attr && attributeParameter.semantic) {
          newVertexShader += getAttribute(attributeParameter);
          foundAttribute = true;
          break;
        }
      }

      if (foundAttribute) {
        continue;
      }

      newVertexShader += parseShaderUniforms(vertexTokenizer, technique, unTreatedUniforms);
    } // Configure pixel shader


    while (!pixelTokenizer.isEnd() && pixelTokenizer.getNextToken()) {
      var tokenType = pixelTokenizer.currentToken;

      if (tokenType !== ETokenType.IDENTIFIER) {
        newPixelShader += pixelTokenizer.currentString;
        continue;
      }

      newPixelShader += parseShaderUniforms(pixelTokenizer, technique, unTreatedUniforms);
    } // Create shader material


    var shaderPath = {
      vertex: program.vertexShader + id,
      fragment: program.fragmentShader + id
    };
    var options = {
      attributes: attributes,
      uniforms: uniforms,
      samplers: samplers,
      needAlphaBlending: states && states.enable && states.enable.indexOf(3042) !== -1
    };
    Effect.ShadersStore[program.vertexShader + id + "VertexShader"] = newVertexShader;
    Effect.ShadersStore[program.fragmentShader + id + "PixelShader"] = newPixelShader;
    var shaderMaterial = new ShaderMaterial(id, gltfRuntime.scene, shaderPath, options);
    shaderMaterial.onError = onShaderCompileError(program, shaderMaterial, onError);
    shaderMaterial.onCompiled = onShaderCompileSuccess(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess);
    shaderMaterial.sideOrientation = Material.CounterClockWiseSideOrientation;

    if (states && states.functions) {
      var functions = states.functions;

      if (functions.cullFace && functions.cullFace[0] !== ECullingType.BACK) {
        shaderMaterial.backFaceCulling = false;
      }

      var blendFunc = functions.blendFuncSeparate;

      if (blendFunc) {
        if (blendFunc[0] === EBlendingFunction.SRC_ALPHA && blendFunc[1] === EBlendingFunction.ONE_MINUS_SRC_ALPHA && blendFunc[2] === EBlendingFunction.ONE && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_COMBINE;
        } else if (blendFunc[0] === EBlendingFunction.ONE && blendFunc[1] === EBlendingFunction.ONE && blendFunc[2] === EBlendingFunction.ZERO && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_ONEONE;
        } else if (blendFunc[0] === EBlendingFunction.SRC_ALPHA && blendFunc[1] === EBlendingFunction.ONE && blendFunc[2] === EBlendingFunction.ZERO && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_ADD;
        } else if (blendFunc[0] === EBlendingFunction.ZERO && blendFunc[1] === EBlendingFunction.ONE_MINUS_SRC_COLOR && blendFunc[2] === EBlendingFunction.ONE && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_SUBTRACT;
        } else if (blendFunc[0] === EBlendingFunction.DST_COLOR && blendFunc[1] === EBlendingFunction.ZERO && blendFunc[2] === EBlendingFunction.ONE && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_MULTIPLY;
        } else if (blendFunc[0] === EBlendingFunction.SRC_ALPHA && blendFunc[1] === EBlendingFunction.ONE_MINUS_SRC_COLOR && blendFunc[2] === EBlendingFunction.ONE && blendFunc[3] === EBlendingFunction.ONE) {
          shaderMaterial.alphaMode = Constants.ALPHA_MAXIMIZED;
        }
      }
    }
  };

  return GLTFLoaderBase;
}();
/**
* glTF V1 Loader
* @hidden
*/

var GLTFLoader = function () {
  function GLTFLoader() {
    this.state = null;
  }

  GLTFLoader.RegisterExtension = function (extension) {
    if (GLTFLoader.Extensions[extension.name]) {
      Tools.Error("Tool with the same name \"" + extension.name + "\" already exists");
      return;
    }

    GLTFLoader.Extensions[extension.name] = extension;
  };

  GLTFLoader.prototype.dispose = function () {// do nothing
  };

  GLTFLoader.prototype._importMeshAsync = function (meshesNames, scene, data, rootUrl, forAssetContainer, onSuccess, onProgress, onError) {
    var _this = this;

    scene.useRightHandedSystem = true;
    GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, function (gltfRuntime) {
      gltfRuntime.forAssetContainer = forAssetContainer;
      gltfRuntime.importOnlyMeshes = true;

      if (meshesNames === "") {
        gltfRuntime.importMeshesNames = [];
      } else if (typeof meshesNames === "string") {
        gltfRuntime.importMeshesNames = [meshesNames];
      } else if (meshesNames && !(meshesNames instanceof Array)) {
        gltfRuntime.importMeshesNames = [meshesNames];
      } else {
        gltfRuntime.importMeshesNames = [];
        Tools.Warn("Argument meshesNames must be of type string or string[]");
      } // Create nodes


      _this._createNodes(gltfRuntime);

      var meshes = new Array();
      var skeletons = new Array(); // Fill arrays of meshes and skeletons

      for (var nde in gltfRuntime.nodes) {
        var node = gltfRuntime.nodes[nde];

        if (node.babylonNode instanceof AbstractMesh) {
          meshes.push(node.babylonNode);
        }
      }

      for (var skl in gltfRuntime.skins) {
        var skin = gltfRuntime.skins[skl];

        if (skin.babylonSkeleton instanceof Skeleton) {
          skeletons.push(skin.babylonSkeleton);
        }
      } // Load buffers, shaders, materials, etc.


      _this._loadBuffersAsync(gltfRuntime, function () {
        _this._loadShadersAsync(gltfRuntime, function () {
          importMaterials(gltfRuntime);
          postLoad(gltfRuntime);

          if (!GLTFFileLoader.IncrementalLoading && onSuccess) {
            onSuccess(meshes, skeletons);
          }
        });
      }, onProgress);

      if (GLTFFileLoader.IncrementalLoading && onSuccess) {
        onSuccess(meshes, skeletons);
      }
    }, onError);
    return true;
  };
  /**
  * Imports one or more meshes from a loaded gltf file and adds them to the scene
  * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
  * @param scene the scene the meshes should be added to
  * @param forAssetContainer defines if the entities must be stored in the scene
  * @param data gltf data containing information of the meshes in a loaded file
  * @param rootUrl root url to load from
  * @param onProgress event that fires when loading progress has occured
  * @returns a promise containg the loaded meshes, particles, skeletons and animations
  */


  GLTFLoader.prototype.importMeshAsync = function (meshesNames, scene, forAssetContainer, data, rootUrl, onProgress) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this._importMeshAsync(meshesNames, scene, data, rootUrl, forAssetContainer, function (meshes, skeletons) {
        resolve({
          meshes: meshes,
          particleSystems: [],
          skeletons: skeletons,
          animationGroups: [],
          lights: [],
          transformNodes: [],
          geometries: []
        });
      }, onProgress, function (message) {
        reject(new Error(message));
      });
    });
  };

  GLTFLoader.prototype._loadAsync = function (scene, data, rootUrl, forAssetContainer, onSuccess, onProgress, onError) {
    var _this = this;

    scene.useRightHandedSystem = true;
    GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, function (gltfRuntime) {
      // Load runtime extensios
      GLTFLoaderExtension.LoadRuntimeExtensionsAsync(gltfRuntime, function () {
        // Create nodes
        _this._createNodes(gltfRuntime); // Load buffers, shaders, materials, etc.


        _this._loadBuffersAsync(gltfRuntime, function () {
          _this._loadShadersAsync(gltfRuntime, function () {
            importMaterials(gltfRuntime);
            postLoad(gltfRuntime);

            if (!GLTFFileLoader.IncrementalLoading) {
              onSuccess();
            }
          });
        });

        if (GLTFFileLoader.IncrementalLoading) {
          onSuccess();
        }
      }, onError);
    }, onError);
  };
  /**
  * Imports all objects from a loaded gltf file and adds them to the scene
  * @param scene the scene the objects should be added to
  * @param data gltf data containing information of the meshes in a loaded file
  * @param rootUrl root url to load from
  * @param onProgress event that fires when loading progress has occured
  * @returns a promise which completes when objects have been loaded to the scene
  */


  GLTFLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this._loadAsync(scene, data, rootUrl, false, function () {
        resolve();
      }, onProgress, function (message) {
        reject(new Error(message));
      });
    });
  };

  GLTFLoader.prototype._loadShadersAsync = function (gltfRuntime, onload) {
    var hasShaders = false;

    var processShader = function (sha, shader) {
      GLTFLoaderExtension.LoadShaderStringAsync(gltfRuntime, sha, function (shaderString) {
        if (shaderString instanceof ArrayBuffer) {
          return;
        }

        gltfRuntime.loadedShaderCount++;

        if (shaderString) {
          Effect.ShadersStore[sha + (shader.type === EShaderType.VERTEX ? "VertexShader" : "PixelShader")] = shaderString;
        }

        if (gltfRuntime.loadedShaderCount === gltfRuntime.shaderscount) {
          onload();
        }
      }, function () {
        Tools.Error("Error when loading shader program named " + sha + " located at " + shader.uri);
      });
    };

    for (var sha in gltfRuntime.shaders) {
      hasShaders = true;
      var shader = gltfRuntime.shaders[sha];

      if (shader) {
        processShader.bind(this, sha, shader)();
      } else {
        Tools.Error("No shader named: " + sha);
      }
    }

    if (!hasShaders) {
      onload();
    }
  };

  GLTFLoader.prototype._loadBuffersAsync = function (gltfRuntime, onLoad, onProgress) {
    var hasBuffers = false;

    var processBuffer = function (buf, buffer) {
      GLTFLoaderExtension.LoadBufferAsync(gltfRuntime, buf, function (bufferView) {
        gltfRuntime.loadedBufferCount++;

        if (bufferView) {
          if (bufferView.byteLength != gltfRuntime.buffers[buf].byteLength) {
            Tools.Error("Buffer named " + buf + " is length " + bufferView.byteLength + ". Expected: " + buffer.byteLength); // Improve error message
          }

          gltfRuntime.loadedBufferViews[buf] = bufferView;
        }

        if (gltfRuntime.loadedBufferCount === gltfRuntime.buffersCount) {
          onLoad();
        }
      }, function () {
        Tools.Error("Error when loading buffer named " + buf + " located at " + buffer.uri);
      });
    };

    for (var buf in gltfRuntime.buffers) {
      hasBuffers = true;
      var buffer = gltfRuntime.buffers[buf];

      if (buffer) {
        processBuffer.bind(this, buf, buffer)();
      } else {
        Tools.Error("No buffer named: " + buf);
      }
    }

    if (!hasBuffers) {
      onLoad();
    }
  };

  GLTFLoader.prototype._createNodes = function (gltfRuntime) {
    var currentScene = gltfRuntime.currentScene;

    if (currentScene) {
      // Only one scene even if multiple scenes are defined
      for (var i = 0; i < currentScene.nodes.length; i++) {
        traverseNodes(gltfRuntime, currentScene.nodes[i], null);
      }
    } else {
      // Load all scenes
      for (var thing in gltfRuntime.scenes) {
        currentScene = gltfRuntime.scenes[thing];

        for (var i = 0; i < currentScene.nodes.length; i++) {
          traverseNodes(gltfRuntime, currentScene.nodes[i], null);
        }
      }
    }
  };

  GLTFLoader.Extensions = {};
  return GLTFLoader;
}();
/** @hidden */

var GLTFLoaderExtension = function () {
  function GLTFLoaderExtension(name) {
    this._name = name;
  }

  Object.defineProperty(GLTFLoaderExtension.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  /**
  * Defines an override for loading the runtime
  * Return true to stop further extensions from loading the runtime
  */

  GLTFLoaderExtension.prototype.loadRuntimeAsync = function (scene, data, rootUrl, onSuccess, onError) {
    return false;
  };
  /**
   * Defines an onverride for creating gltf runtime
   * Return true to stop further extensions from creating the runtime
   */


  GLTFLoaderExtension.prototype.loadRuntimeExtensionsAsync = function (gltfRuntime, onSuccess, onError) {
    return false;
  };
  /**
  * Defines an override for loading buffers
  * Return true to stop further extensions from loading this buffer
  */


  GLTFLoaderExtension.prototype.loadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
    return false;
  };
  /**
  * Defines an override for loading texture buffers
  * Return true to stop further extensions from loading this texture data
  */


  GLTFLoaderExtension.prototype.loadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
    return false;
  };
  /**
  * Defines an override for creating textures
  * Return true to stop further extensions from loading this texture
  */


  GLTFLoaderExtension.prototype.createTextureAsync = function (gltfRuntime, id, buffer, onSuccess, onError) {
    return false;
  };
  /**
  * Defines an override for loading shader strings
  * Return true to stop further extensions from loading this shader data
  */


  GLTFLoaderExtension.prototype.loadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
    return false;
  };
  /**
  * Defines an override for loading materials
  * Return true to stop further extensions from loading this material
  */


  GLTFLoaderExtension.prototype.loadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
    return false;
  }; // ---------
  // Utilities
  // ---------


  GLTFLoaderExtension.LoadRuntimeAsync = function (scene, data, rootUrl, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadRuntimeAsync(scene, data, rootUrl, onSuccess, onError);
    }, function () {
      setTimeout(function () {
        if (!onSuccess) {
          return;
        }

        onSuccess(GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
      });
    });
  };

  GLTFLoaderExtension.LoadRuntimeExtensionsAsync = function (gltfRuntime, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError);
    }, function () {
      setTimeout(function () {
        onSuccess();
      });
    });
  };

  GLTFLoaderExtension.LoadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
    }, function () {
      GLTFLoaderBase.LoadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
    });
  };

  GLTFLoaderExtension.LoadTextureAsync = function (gltfRuntime, id, onSuccess, onError) {
    GLTFLoaderExtension.LoadTextureBufferAsync(gltfRuntime, id, function (buffer) {
      if (buffer) {
        GLTFLoaderExtension.CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
      }
    }, onError);
  };

  GLTFLoaderExtension.LoadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
    }, function () {
      GLTFLoaderBase.LoadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
    });
  };

  GLTFLoaderExtension.LoadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadMaterialAsync(gltfRuntime, id, onSuccess, onError);
    }, function () {
      GLTFLoaderBase.LoadMaterialAsync(gltfRuntime, id, onSuccess, onError);
    });
  };

  GLTFLoaderExtension.LoadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.loadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
    }, function () {
      GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
    });
  };

  GLTFLoaderExtension.CreateTextureAsync = function (gltfRuntime, id, buffer, onSuccess, onError) {
    GLTFLoaderExtension.ApplyExtensions(function (loaderExtension) {
      return loaderExtension.createTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
    }, function () {
      GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
    });
  };

  GLTFLoaderExtension.ApplyExtensions = function (func, defaultFunc) {
    for (var extensionName in GLTFLoader.Extensions) {
      var loaderExtension = GLTFLoader.Extensions[extensionName];

      if (func(loaderExtension)) {
        return;
      }
    }

    defaultFunc();
  };

  return GLTFLoaderExtension;
}();

GLTFFileLoader._CreateGLTF1Loader = function () {
  return new GLTFLoader();
};

var BinaryExtensionBufferName = "binary_glTF";
/** @hidden */

var GLTFBinaryExtension = function (_super) {
  __extends(GLTFBinaryExtension, _super);

  function GLTFBinaryExtension() {
    return _super.call(this, "KHR_binary_glTF") || this;
  }

  GLTFBinaryExtension.prototype.loadRuntimeAsync = function (scene, data, rootUrl, onSuccess, onError) {
    var extensionsUsed = data.json.extensionsUsed;

    if (!extensionsUsed || extensionsUsed.indexOf(this.name) === -1 || !data.bin) {
      return false;
    }

    this._bin = data.bin;
    onSuccess(GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
    return true;
  };

  GLTFBinaryExtension.prototype.loadBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
    if (gltfRuntime.extensionsUsed.indexOf(this.name) === -1) {
      return false;
    }

    if (id !== BinaryExtensionBufferName) {
      return false;
    }

    this._bin.readAsync(0, this._bin.byteLength).then(onSuccess, function (error) {
      return onError(error.message);
    });

    return true;
  };

  GLTFBinaryExtension.prototype.loadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
    var texture = gltfRuntime.textures[id];
    var source = gltfRuntime.images[texture.source];

    if (!source.extensions || !(this.name in source.extensions)) {
      return false;
    }

    var sourceExt = source.extensions[this.name];
    var bufferView = gltfRuntime.bufferViews[sourceExt.bufferView];
    var buffer = GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, EComponentType.UNSIGNED_BYTE);
    onSuccess(buffer);
    return true;
  };

  GLTFBinaryExtension.prototype.loadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
    var shader = gltfRuntime.shaders[id];

    if (!shader.extensions || !(this.name in shader.extensions)) {
      return false;
    }

    var binaryExtensionShader = shader.extensions[this.name];
    var bufferView = gltfRuntime.bufferViews[binaryExtensionShader.bufferView];
    var shaderBytes = GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, EComponentType.UNSIGNED_BYTE);
    setTimeout(function () {
      var shaderString = GLTFUtils.DecodeBufferToText(shaderBytes);
      onSuccess(shaderString);
    });
    return true;
  };

  return GLTFBinaryExtension;
}(GLTFLoaderExtension);
GLTFLoader.RegisterExtension(new GLTFBinaryExtension());

/** @hidden */

var GLTFMaterialsCommonExtension = function (_super) {
  __extends(GLTFMaterialsCommonExtension, _super);

  function GLTFMaterialsCommonExtension() {
    return _super.call(this, "KHR_materials_common") || this;
  }

  GLTFMaterialsCommonExtension.prototype.loadRuntimeExtensionsAsync = function (gltfRuntime, onSuccess, onError) {
    if (!gltfRuntime.extensions) {
      return false;
    }

    var extension = gltfRuntime.extensions[this.name];

    if (!extension) {
      return false;
    } // Create lights


    var lights = extension.lights;

    if (lights) {
      for (var thing in lights) {
        var light = lights[thing];

        switch (light.type) {
          case "ambient":
            var ambientLight = new HemisphericLight(light.name, new Vector3(0, 1, 0), gltfRuntime.scene);
            var ambient = light.ambient;

            if (ambient) {
              ambientLight.diffuse = Color3.FromArray(ambient.color || [1, 1, 1]);
            }

            break;

          case "point":
            var pointLight = new PointLight(light.name, new Vector3(10, 10, 10), gltfRuntime.scene);
            var point = light.point;

            if (point) {
              pointLight.diffuse = Color3.FromArray(point.color || [1, 1, 1]);
            }

            break;

          case "directional":
            var dirLight = new DirectionalLight(light.name, new Vector3(0, -1, 0), gltfRuntime.scene);
            var directional = light.directional;

            if (directional) {
              dirLight.diffuse = Color3.FromArray(directional.color || [1, 1, 1]);
            }

            break;

          case "spot":
            var spot = light.spot;

            if (spot) {
              var spotLight = new SpotLight(light.name, new Vector3(0, 10, 0), new Vector3(0, -1, 0), spot.fallOffAngle || Math.PI, spot.fallOffExponent || 0.0, gltfRuntime.scene);
              spotLight.diffuse = Color3.FromArray(spot.color || [1, 1, 1]);
            }

            break;

          default:
            Tools.Warn("GLTF Material Common extension: light type \"" + light.type + "\” not supported");
            break;
        }
      }
    }

    return false;
  };

  GLTFMaterialsCommonExtension.prototype.loadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
    var material = gltfRuntime.materials[id];

    if (!material || !material.extensions) {
      return false;
    }

    var extension = material.extensions[this.name];

    if (!extension) {
      return false;
    }

    var standardMaterial = new StandardMaterial(id, gltfRuntime.scene);
    standardMaterial.sideOrientation = Material.CounterClockWiseSideOrientation;

    if (extension.technique === "CONSTANT") {
      standardMaterial.disableLighting = true;
    }

    standardMaterial.backFaceCulling = extension.doubleSided === undefined ? false : !extension.doubleSided;
    standardMaterial.alpha = extension.values.transparency === undefined ? 1.0 : extension.values.transparency;
    standardMaterial.specularPower = extension.values.shininess === undefined ? 0.0 : extension.values.shininess; // Ambient

    if (typeof extension.values.ambient === "string") {
      this._loadTexture(gltfRuntime, extension.values.ambient, standardMaterial, "ambientTexture", onError);
    } else {
      standardMaterial.ambientColor = Color3.FromArray(extension.values.ambient || [0, 0, 0]);
    } // Diffuse


    if (typeof extension.values.diffuse === "string") {
      this._loadTexture(gltfRuntime, extension.values.diffuse, standardMaterial, "diffuseTexture", onError);
    } else {
      standardMaterial.diffuseColor = Color3.FromArray(extension.values.diffuse || [0, 0, 0]);
    } // Emission


    if (typeof extension.values.emission === "string") {
      this._loadTexture(gltfRuntime, extension.values.emission, standardMaterial, "emissiveTexture", onError);
    } else {
      standardMaterial.emissiveColor = Color3.FromArray(extension.values.emission || [0, 0, 0]);
    } // Specular


    if (typeof extension.values.specular === "string") {
      this._loadTexture(gltfRuntime, extension.values.specular, standardMaterial, "specularTexture", onError);
    } else {
      standardMaterial.specularColor = Color3.FromArray(extension.values.specular || [0, 0, 0]);
    }

    return true;
  };

  GLTFMaterialsCommonExtension.prototype._loadTexture = function (gltfRuntime, id, material, propertyPath, onError) {
    // Create buffer from texture url
    GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, function (buffer) {
      // Create texture from buffer
      GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, function (texture) {
        return material[propertyPath] = texture;
      }, onError);
    }, onError);
  };

  return GLTFMaterialsCommonExtension;
}(GLTFLoaderExtension);
GLTFLoader.RegisterExtension(new GLTFMaterialsCommonExtension());

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GLTFBinaryExtension: GLTFBinaryExtension,
  GLTFLoaderBase: GLTFLoaderBase,
  GLTFLoader: GLTFLoader,
  GLTFLoaderExtension: GLTFLoaderExtension,
  get EComponentType () { return EComponentType; },
  get EShaderType () { return EShaderType; },
  get EParameterType () { return EParameterType; },
  get ETextureWrapMode () { return ETextureWrapMode; },
  get ETextureFilterType () { return ETextureFilterType; },
  get ETextureFormat () { return ETextureFormat; },
  get ECullingType () { return ECullingType; },
  get EBlendingFunction () { return EBlendingFunction; },
  GLTFUtils: GLTFUtils,
  GLTFMaterialsCommonExtension: GLTFMaterialsCommonExtension
});

/**
 * Helper class for working with arrays when loading the glTF asset
 */

var ArrayItem = function () {
  function ArrayItem() {}
  /**
   * Gets an item from the given array.
   * @param context The context when loading the asset
   * @param array The array to get the item from
   * @param index The index to the array
   * @returns The array item
   */


  ArrayItem.Get = function (context, array, index) {
    if (!array || index == undefined || !array[index]) {
      throw new Error(context + ": Failed to find index (" + index + ")");
    }

    return array[index];
  };
  /**
   * Assign an `index` field to each item of the given array.
   * @param array The array of items
   */


  ArrayItem.Assign = function (array) {
    if (array) {
      for (var index = 0; index < array.length; index++) {
        array[index].index = index;
      }
    }
  };

  return ArrayItem;
}();
/**
 * The glTF 2.0 loader
 */

var GLTFLoader$1 = function () {
  /** @hidden */
  function GLTFLoader(parent) {
    /** @hidden */
    this._completePromises = new Array();
    /** @hidden */

    this._forAssetContainer = false;
    /** Storage */

    this._babylonLights = [];
    /** @hidden */

    this._disableInstancedMesh = 0;
    this._disposed = false;
    this._state = null;
    this._extensions = new Array();
    this._defaultBabylonMaterialData = {};
    this._parent = parent;
  }
  /**
   * Registers a loader extension.
   * @param name The name of the loader extension.
   * @param factory The factory function that creates the loader extension.
   */


  GLTFLoader.RegisterExtension = function (name, factory) {
    if (GLTFLoader.UnregisterExtension(name)) {
      Logger.Warn("Extension with the name '" + name + "' already exists");
    }

    GLTFLoader._RegisteredExtensions[name] = {
      factory: factory
    };
  };
  /**
   * Unregisters a loader extension.
   * @param name The name of the loader extension.
   * @returns A boolean indicating whether the extension has been unregistered
   */


  GLTFLoader.UnregisterExtension = function (name) {
    if (!GLTFLoader._RegisteredExtensions[name]) {
      return false;
    }

    delete GLTFLoader._RegisteredExtensions[name];
    return true;
  };

  Object.defineProperty(GLTFLoader.prototype, "state", {
    /**
     * The loader state.
     */
    get: function () {
      return this._state;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFLoader.prototype, "gltf", {
    /**
     * The object that represents the glTF JSON.
     */
    get: function () {
      return this._gltf;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFLoader.prototype, "bin", {
    /**
     * The BIN chunk of a binary glTF.
     */
    get: function () {
      return this._bin;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFLoader.prototype, "parent", {
    /**
     * The parent file loader.
     */
    get: function () {
      return this._parent;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFLoader.prototype, "babylonScene", {
    /**
     * The Babylon scene when loading the asset.
     */
    get: function () {
      return this._babylonScene;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GLTFLoader.prototype, "rootBabylonMesh", {
    /**
     * The root Babylon mesh when loading the asset.
     */
    get: function () {
      return this._rootBabylonMesh;
    },
    enumerable: false,
    configurable: true
  });
  /** @hidden */

  GLTFLoader.prototype.dispose = function () {
    if (this._disposed) {
      return;
    }

    this._disposed = true;
    this._completePromises.length = 0;

    for (var name_1 in this._extensions) {
      var extension = this._extensions[name_1];
      extension.dispose && extension.dispose();
      delete this._extensions[name_1];
    }

    this._gltf = null;
    this._babylonScene = null;
    this._rootBabylonMesh = null;

    this._parent.dispose();
  };
  /** @hidden */


  GLTFLoader.prototype.importMeshAsync = function (meshesNames, scene, forAssetContainer, data, rootUrl, onProgress, fileName) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this._babylonScene = scene;
      _this._rootUrl = rootUrl;
      _this._fileName = fileName || "scene";
      _this._forAssetContainer = forAssetContainer;

      _this._loadData(data);

      var nodes = null;

      if (meshesNames) {
        var nodeMap_1 = {};

        if (_this._gltf.nodes) {
          for (var _i = 0, _a = _this._gltf.nodes; _i < _a.length; _i++) {
            var node = _a[_i];

            if (node.name) {
              nodeMap_1[node.name] = node.index;
            }
          }
        }

        var names = meshesNames instanceof Array ? meshesNames : [meshesNames];
        nodes = names.map(function (name) {
          var node = nodeMap_1[name];

          if (node === undefined) {
            throw new Error("Failed to find node '" + name + "'");
          }

          return node;
        });
      }

      return _this._loadAsync(nodes, function () {
        return {
          meshes: _this._getMeshes(),
          particleSystems: [],
          skeletons: _this._getSkeletons(),
          animationGroups: _this._getAnimationGroups(),
          lights: _this._babylonLights,
          transformNodes: _this._getTransformNodes(),
          geometries: _this._getGeometries()
        };
      });
    });
  };
  /** @hidden */


  GLTFLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress, fileName) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this._babylonScene = scene;
      _this._rootUrl = rootUrl;
      _this._fileName = fileName || "scene";

      _this._loadData(data);

      return _this._loadAsync(null, function () {
        return undefined;
      });
    });
  };

  GLTFLoader.prototype._loadAsync = function (nodes, resultFunc) {
    var _this = this;

    return Promise.resolve().then(function () {
      _this._uniqueRootUrl = _this._rootUrl.indexOf("file:") === -1 && _this._fileName ? _this._rootUrl : "" + _this._rootUrl + Date.now() + "/";

      _this._loadExtensions();

      _this._checkExtensions();

      var loadingToReadyCounterName = GLTFLoaderState[GLTFLoaderState.LOADING] + " => " + GLTFLoaderState[GLTFLoaderState.READY];
      var loadingToCompleteCounterName = GLTFLoaderState[GLTFLoaderState.LOADING] + " => " + GLTFLoaderState[GLTFLoaderState.COMPLETE];

      _this._parent._startPerformanceCounter(loadingToReadyCounterName);

      _this._parent._startPerformanceCounter(loadingToCompleteCounterName);

      _this._setState(GLTFLoaderState.LOADING);

      _this._extensionsOnLoading();

      var promises = new Array(); // Block the marking of materials dirty until the scene is loaded.

      var oldBlockMaterialDirtyMechanism = _this._babylonScene.blockMaterialDirtyMechanism;
      _this._babylonScene.blockMaterialDirtyMechanism = true;

      if (nodes) {
        promises.push(_this.loadSceneAsync("/nodes", {
          nodes: nodes,
          index: -1
        }));
      } else if (_this._gltf.scene != undefined || _this._gltf.scenes && _this._gltf.scenes[0]) {
        var scene = ArrayItem.Get("/scene", _this._gltf.scenes, _this._gltf.scene || 0);
        promises.push(_this.loadSceneAsync("/scenes/" + scene.index, scene));
      }

      if (_this.parent.loadAllMaterials && _this._gltf.materials) {
        for (var m = 0; m < _this._gltf.materials.length; ++m) {
          var material = _this._gltf.materials[m];
          var context_1 = "/materials/" + m;
          var babylonDrawMode = Material.TriangleFillMode;
          promises.push(_this._loadMaterialAsync(context_1, material, null, babylonDrawMode, function (material) {}));
        }
      } // Restore the blocking of material dirty.


      _this._babylonScene.blockMaterialDirtyMechanism = oldBlockMaterialDirtyMechanism;

      if (_this._parent.compileMaterials) {
        promises.push(_this._compileMaterialsAsync());
      }

      if (_this._parent.compileShadowGenerators) {
        promises.push(_this._compileShadowGeneratorsAsync());
      }

      var resultPromise = Promise.all(promises).then(function () {
        if (_this._rootBabylonMesh) {
          _this._rootBabylonMesh.setEnabled(true);
        }

        _this._extensionsOnReady();

        _this._setState(GLTFLoaderState.READY);

        _this._startAnimations();

        return resultFunc();
      });
      resultPromise.then(function () {
        _this._parent._endPerformanceCounter(loadingToReadyCounterName);

        Tools.SetImmediate(function () {
          if (!_this._disposed) {
            Promise.all(_this._completePromises).then(function () {
              _this._parent._endPerformanceCounter(loadingToCompleteCounterName);

              _this._setState(GLTFLoaderState.COMPLETE);

              _this._parent.onCompleteObservable.notifyObservers(undefined);

              _this._parent.onCompleteObservable.clear();

              _this.dispose();
            }, function (error) {
              _this._parent.onErrorObservable.notifyObservers(error);

              _this._parent.onErrorObservable.clear();

              _this.dispose();
            });
          }
        });
      });
      return resultPromise;
    }).catch(function (error) {
      if (!_this._disposed) {
        _this._parent.onErrorObservable.notifyObservers(error);

        _this._parent.onErrorObservable.clear();

        _this.dispose();
      }

      throw error;
    });
  };

  GLTFLoader.prototype._loadData = function (data) {
    this._gltf = data.json;

    this._setupData();

    if (data.bin) {
      var buffers = this._gltf.buffers;

      if (buffers && buffers[0] && !buffers[0].uri) {
        var binaryBuffer = buffers[0];

        if (binaryBuffer.byteLength < data.bin.byteLength - 3 || binaryBuffer.byteLength > data.bin.byteLength) {
          Logger.Warn("Binary buffer length (" + binaryBuffer.byteLength + ") from JSON does not match chunk length (" + data.bin.byteLength + ")");
        }

        this._bin = data.bin;
      } else {
        Logger.Warn("Unexpected BIN chunk");
      }
    }
  };

  GLTFLoader.prototype._setupData = function () {
    ArrayItem.Assign(this._gltf.accessors);
    ArrayItem.Assign(this._gltf.animations);
    ArrayItem.Assign(this._gltf.buffers);
    ArrayItem.Assign(this._gltf.bufferViews);
    ArrayItem.Assign(this._gltf.cameras);
    ArrayItem.Assign(this._gltf.images);
    ArrayItem.Assign(this._gltf.materials);
    ArrayItem.Assign(this._gltf.meshes);
    ArrayItem.Assign(this._gltf.nodes);
    ArrayItem.Assign(this._gltf.samplers);
    ArrayItem.Assign(this._gltf.scenes);
    ArrayItem.Assign(this._gltf.skins);
    ArrayItem.Assign(this._gltf.textures);

    if (this._gltf.nodes) {
      var nodeParents = {};

      for (var _i = 0, _a = this._gltf.nodes; _i < _a.length; _i++) {
        var node = _a[_i];

        if (node.children) {
          for (var _b = 0, _c = node.children; _b < _c.length; _b++) {
            var index = _c[_b];
            nodeParents[index] = node.index;
          }
        }
      }

      var rootNode = this._createRootNode();

      for (var _d = 0, _e = this._gltf.nodes; _d < _e.length; _d++) {
        var node = _e[_d];
        var parentIndex = nodeParents[node.index];
        node.parent = parentIndex === undefined ? rootNode : this._gltf.nodes[parentIndex];
      }
    }
  };

  GLTFLoader.prototype._loadExtensions = function () {
    for (var name_2 in GLTFLoader._RegisteredExtensions) {
      var extension = GLTFLoader._RegisteredExtensions[name_2].factory(this);

      if (extension.name !== name_2) {
        Logger.Warn("The name of the glTF loader extension instance does not match the registered name: " + extension.name + " !== " + name_2);
      }

      this._extensions.push(extension);

      this._parent.onExtensionLoadedObservable.notifyObservers(extension);
    }

    this._extensions.sort(function (a, b) {
      return (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE);
    });

    this._parent.onExtensionLoadedObservable.clear();
  };

  GLTFLoader.prototype._checkExtensions = function () {
    if (this._gltf.extensionsRequired) {
      var _loop_1 = function (name_3) {
        var available = this_1._extensions.some(function (extension) {
          return extension.name === name_3 && extension.enabled;
        });

        if (!available) {
          throw new Error("Require extension " + name_3 + " is not available");
        }
      };

      var this_1 = this;

      for (var _i = 0, _a = this._gltf.extensionsRequired; _i < _a.length; _i++) {
        var name_3 = _a[_i];

        _loop_1(name_3);
      }
    }
  };

  GLTFLoader.prototype._setState = function (state) {
    this._state = state;
    this.log(GLTFLoaderState[this._state]);
  };

  GLTFLoader.prototype._createRootNode = function () {
    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    this._rootBabylonMesh = new Mesh("__root__", this._babylonScene);
    this._babylonScene._blockEntityCollection = false;

    this._rootBabylonMesh.setEnabled(false);

    var rootNode = {
      _babylonTransformNode: this._rootBabylonMesh,
      index: -1
    };

    switch (this._parent.coordinateSystemMode) {
      case GLTFLoaderCoordinateSystemMode.AUTO:
        {
          if (!this._babylonScene.useRightHandedSystem) {
            rootNode.rotation = [0, 1, 0, 0];
            rootNode.scale = [1, 1, -1];

            GLTFLoader._LoadTransform(rootNode, this._rootBabylonMesh);
          }

          break;
        }

      case GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED:
        {
          this._babylonScene.useRightHandedSystem = true;
          break;
        }

      default:
        {
          throw new Error("Invalid coordinate system mode (" + this._parent.coordinateSystemMode + ")");
        }
    }

    this._parent.onMeshLoadedObservable.notifyObservers(this._rootBabylonMesh);

    return rootNode;
  };
  /**
   * Loads a glTF scene.
   * @param context The context when loading the asset
   * @param scene The glTF scene property
   * @returns A promise that resolves when the load is complete
   */


  GLTFLoader.prototype.loadSceneAsync = function (context, scene) {
    var _this = this;

    var extensionPromise = this._extensionsLoadSceneAsync(context, scene);

    if (extensionPromise) {
      return extensionPromise;
    }

    var promises = new Array();
    this.logOpen(context + " " + (scene.name || ""));

    if (scene.nodes) {
      for (var _i = 0, _a = scene.nodes; _i < _a.length; _i++) {
        var index = _a[_i];
        var node = ArrayItem.Get(context + "/nodes/" + index, this._gltf.nodes, index);
        promises.push(this.loadNodeAsync("/nodes/" + node.index, node, function (babylonMesh) {
          babylonMesh.parent = _this._rootBabylonMesh;
        }));
      }
    } // Link all Babylon bones for each glTF node with the corresponding Babylon transform node.
    // A glTF joint is a pointer to a glTF node in the glTF node hierarchy similar to Unity3D.


    if (this._gltf.nodes) {
      for (var _b = 0, _c = this._gltf.nodes; _b < _c.length; _b++) {
        var node = _c[_b];

        if (node._babylonTransformNode && node._babylonBones) {
          for (var _d = 0, _e = node._babylonBones; _d < _e.length; _d++) {
            var babylonBone = _e[_d];
            babylonBone.linkTransformNode(node._babylonTransformNode);
          }
        }
      }
    }

    promises.push(this._loadAnimationsAsync());
    this.logClose();
    return Promise.all(promises).then(function () {});
  };

  GLTFLoader.prototype._forEachPrimitive = function (node, callback) {
    if (node._primitiveBabylonMeshes) {
      for (var _i = 0, _a = node._primitiveBabylonMeshes; _i < _a.length; _i++) {
        var babylonMesh = _a[_i];
        callback(babylonMesh);
      }
    }
  };

  GLTFLoader.prototype._getGeometries = function () {
    var geometries = new Array();
    var nodes = this._gltf.nodes;

    if (nodes) {
      for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];

        this._forEachPrimitive(node, function (babylonMesh) {
          var geometry = babylonMesh.geometry;

          if (geometry && geometries.indexOf(geometry) === -1) {
            geometries.push(geometry);
          }
        });
      }
    }

    return geometries;
  };

  GLTFLoader.prototype._getMeshes = function () {
    var meshes = new Array(); // Root mesh is always first.

    meshes.push(this._rootBabylonMesh);
    var nodes = this._gltf.nodes;

    if (nodes) {
      for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
        var node = nodes_2[_i];

        this._forEachPrimitive(node, function (babylonMesh) {
          meshes.push(babylonMesh);
        });
      }
    }

    return meshes;
  };

  GLTFLoader.prototype._getTransformNodes = function () {
    var transformNodes = new Array();
    var nodes = this._gltf.nodes;

    if (nodes) {
      for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
        var node = nodes_3[_i];

        if (node._babylonTransformNode && node._babylonTransformNode.getClassName() === "TransformNode") {
          transformNodes.push(node._babylonTransformNode);
        }
      }
    }

    return transformNodes;
  };

  GLTFLoader.prototype._getSkeletons = function () {
    var skeletons = new Array();
    var skins = this._gltf.skins;

    if (skins) {
      for (var _i = 0, skins_1 = skins; _i < skins_1.length; _i++) {
        var skin = skins_1[_i];

        if (skin._data) {
          skeletons.push(skin._data.babylonSkeleton);
        }
      }
    }

    return skeletons;
  };

  GLTFLoader.prototype._getAnimationGroups = function () {
    var animationGroups = new Array();
    var animations = this._gltf.animations;

    if (animations) {
      for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
        var animation = animations_1[_i];

        if (animation._babylonAnimationGroup) {
          animationGroups.push(animation._babylonAnimationGroup);
        }
      }
    }

    return animationGroups;
  };

  GLTFLoader.prototype._startAnimations = function () {
    switch (this._parent.animationStartMode) {
      case GLTFLoaderAnimationStartMode.NONE:
        {
          // do nothing
          break;
        }

      case GLTFLoaderAnimationStartMode.FIRST:
        {
          var babylonAnimationGroups = this._getAnimationGroups();

          if (babylonAnimationGroups.length !== 0) {
            babylonAnimationGroups[0].start(true);
          }

          break;
        }

      case GLTFLoaderAnimationStartMode.ALL:
        {
          var babylonAnimationGroups = this._getAnimationGroups();

          for (var _i = 0, babylonAnimationGroups_1 = babylonAnimationGroups; _i < babylonAnimationGroups_1.length; _i++) {
            var babylonAnimationGroup = babylonAnimationGroups_1[_i];
            babylonAnimationGroup.start(true);
          }

          break;
        }

      default:
        {
          Logger.Error("Invalid animation start mode (" + this._parent.animationStartMode + ")");
          return;
        }
    }
  };
  /**
   * Loads a glTF node.
   * @param context The context when loading the asset
   * @param node The glTF node property
   * @param assign A function called synchronously after parsing the glTF properties
   * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
   */


  GLTFLoader.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    if (assign === void 0) {
      assign = function () {};
    }

    var extensionPromise = this._extensionsLoadNodeAsync(context, node, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    if (node._babylonTransformNode) {
      throw new Error(context + ": Invalid recursive node hierarchy");
    }

    var promises = new Array();
    this.logOpen(context + " " + (node.name || ""));

    var loadNode = function (babylonTransformNode) {
      GLTFLoader.AddPointerMetadata(babylonTransformNode, context);

      GLTFLoader._LoadTransform(node, babylonTransformNode);

      if (node.camera != undefined) {
        var camera = ArrayItem.Get(context + "/camera", _this._gltf.cameras, node.camera);
        promises.push(_this.loadCameraAsync("/cameras/" + camera.index, camera, function (babylonCamera) {
          babylonCamera.parent = babylonTransformNode;
        }));
      }

      if (node.children) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
          var index = _a[_i];
          var childNode = ArrayItem.Get(context + "/children/" + index, _this._gltf.nodes, index);
          promises.push(_this.loadNodeAsync("/nodes/" + childNode.index, childNode, function (childBabylonMesh) {
            childBabylonMesh.parent = babylonTransformNode;
          }));
        }
      }

      assign(babylonTransformNode);
    };

    if (node.mesh == undefined) {
      var nodeName = node.name || "node" + node.index;
      this._babylonScene._blockEntityCollection = this._forAssetContainer;
      node._babylonTransformNode = new TransformNode(nodeName, this._babylonScene);
      this._babylonScene._blockEntityCollection = false;
      loadNode(node._babylonTransformNode);
    } else {
      var mesh = ArrayItem.Get(context + "/mesh", this._gltf.meshes, node.mesh);
      promises.push(this._loadMeshAsync("/meshes/" + mesh.index, node, mesh, loadNode));
    }

    this.logClose();
    return Promise.all(promises).then(function () {
      _this._forEachPrimitive(node, function (babylonMesh) {
        if (babylonMesh.geometry && babylonMesh.geometry.useBoundingInfoFromGeometry) {
          // simply apply the world matrices to the bounding info - the extends are already ok
          babylonMesh._updateBoundingInfo();
        } else {
          babylonMesh.refreshBoundingInfo(true);
        }
      });

      return node._babylonTransformNode;
    });
  };

  GLTFLoader.prototype._loadMeshAsync = function (context, node, mesh, assign) {
    var primitives = mesh.primitives;

    if (!primitives || !primitives.length) {
      throw new Error(context + ": Primitives are missing");
    }

    if (primitives[0].index == undefined) {
      ArrayItem.Assign(primitives);
    }

    var promises = new Array();
    this.logOpen(context + " " + (mesh.name || ""));
    var name = node.name || "node" + node.index;

    if (primitives.length === 1) {
      var primitive = mesh.primitives[0];
      promises.push(this._loadMeshPrimitiveAsync(context + "/primitives/" + primitive.index, name, node, mesh, primitive, function (babylonMesh) {
        node._babylonTransformNode = babylonMesh;
        node._primitiveBabylonMeshes = [babylonMesh];
      }));
    } else {
      this._babylonScene._blockEntityCollection = this._forAssetContainer;
      node._babylonTransformNode = new TransformNode(name, this._babylonScene);
      this._babylonScene._blockEntityCollection = false;
      node._primitiveBabylonMeshes = [];

      for (var _i = 0, primitives_1 = primitives; _i < primitives_1.length; _i++) {
        var primitive = primitives_1[_i];
        promises.push(this._loadMeshPrimitiveAsync(context + "/primitives/" + primitive.index, name + "_primitive" + primitive.index, node, mesh, primitive, function (babylonMesh) {
          babylonMesh.parent = node._babylonTransformNode;

          node._primitiveBabylonMeshes.push(babylonMesh);
        }));
      }
    }

    if (node.skin != undefined) {
      var skin = ArrayItem.Get(context + "/skin", this._gltf.skins, node.skin);
      promises.push(this._loadSkinAsync("/skins/" + skin.index, node, skin));
    }

    assign(node._babylonTransformNode);
    this.logClose();
    return Promise.all(promises).then(function () {
      return node._babylonTransformNode;
    });
  };
  /**
   * @hidden Define this method to modify the default behavior when loading data for mesh primitives.
   * @param context The context when loading the asset
   * @param name The mesh name when loading the asset
   * @param node The glTF node when loading the asset
   * @param mesh The glTF mesh when loading the asset
   * @param primitive The glTF mesh primitive property
   * @param assign A function called synchronously after parsing the glTF properties
   * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
   */


  GLTFLoader.prototype._loadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
    var _this = this;

    var extensionPromise = this._extensionsLoadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    this.logOpen("" + context);
    var shouldInstance = this._disableInstancedMesh === 0 && this._parent.createInstances && node.skin == undefined && !mesh.primitives[0].targets;
    var babylonAbstractMesh;
    var promise;

    if (shouldInstance && primitive._instanceData) {
      babylonAbstractMesh = primitive._instanceData.babylonSourceMesh.createInstance(name);
      promise = primitive._instanceData.promise;
    } else {
      var promises = new Array();
      this._babylonScene._blockEntityCollection = this._forAssetContainer;
      var babylonMesh_1 = new Mesh(name, this._babylonScene);
      this._babylonScene._blockEntityCollection = false;
      babylonMesh_1.overrideMaterialSideOrientation = this._babylonScene.useRightHandedSystem ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;

      this._createMorphTargets(context, node, mesh, primitive, babylonMesh_1);

      promises.push(this._loadVertexDataAsync(context, primitive, babylonMesh_1).then(function (babylonGeometry) {
        return _this._loadMorphTargetsAsync(context, primitive, babylonMesh_1, babylonGeometry).then(function () {
          _this._babylonScene._blockEntityCollection = _this._forAssetContainer;
          babylonGeometry.applyToMesh(babylonMesh_1);
          _this._babylonScene._blockEntityCollection = false;
        });
      }));

      var babylonDrawMode = GLTFLoader._GetDrawMode(context, primitive.mode);

      if (primitive.material == undefined) {
        var babylonMaterial = this._defaultBabylonMaterialData[babylonDrawMode];

        if (!babylonMaterial) {
          babylonMaterial = this._createDefaultMaterial("__GLTFLoader._default", babylonDrawMode);

          this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);

          this._defaultBabylonMaterialData[babylonDrawMode] = babylonMaterial;
        }

        babylonMesh_1.material = babylonMaterial;
      } else {
        var material = ArrayItem.Get(context + "/material", this._gltf.materials, primitive.material);
        promises.push(this._loadMaterialAsync("/materials/" + material.index, material, babylonMesh_1, babylonDrawMode, function (babylonMaterial) {
          babylonMesh_1.material = babylonMaterial;
        }));
      }

      promise = Promise.all(promises);

      if (shouldInstance) {
        primitive._instanceData = {
          babylonSourceMesh: babylonMesh_1,
          promise: promise
        };
      }

      babylonAbstractMesh = babylonMesh_1;
    }

    GLTFLoader.AddPointerMetadata(babylonAbstractMesh, context);

    this._parent.onMeshLoadedObservable.notifyObservers(babylonAbstractMesh);

    assign(babylonAbstractMesh);
    this.logClose();
    return promise.then(function () {
      return babylonAbstractMesh;
    });
  };

  GLTFLoader.prototype._loadVertexDataAsync = function (context, primitive, babylonMesh) {
    var _this = this;

    var extensionPromise = this._extensionsLoadVertexDataAsync(context, primitive, babylonMesh);

    if (extensionPromise) {
      return extensionPromise;
    }

    var attributes = primitive.attributes;

    if (!attributes) {
      throw new Error(context + ": Attributes are missing");
    }

    var promises = new Array();
    var babylonGeometry = new Geometry(babylonMesh.name, this._babylonScene);

    if (primitive.indices == undefined) {
      babylonMesh.isUnIndexed = true;
    } else {
      var accessor = ArrayItem.Get(context + "/indices", this._gltf.accessors, primitive.indices);
      promises.push(this._loadIndicesAccessorAsync("/accessors/" + accessor.index, accessor).then(function (data) {
        babylonGeometry.setIndices(data);
      }));
    }

    var loadAttribute = function (attribute, kind, callback) {
      if (attributes[attribute] == undefined) {
        return;
      }

      babylonMesh._delayInfo = babylonMesh._delayInfo || [];

      if (babylonMesh._delayInfo.indexOf(kind) === -1) {
        babylonMesh._delayInfo.push(kind);
      }

      var accessor = ArrayItem.Get(context + "/attributes/" + attribute, _this._gltf.accessors, attributes[attribute]);
      promises.push(_this._loadVertexAccessorAsync("/accessors/" + accessor.index, accessor, kind).then(function (babylonVertexBuffer) {
        if (babylonVertexBuffer.getKind() === VertexBuffer.PositionKind && !_this.parent.alwaysComputeBoundingBox && !babylonMesh.skeleton) {
          var mmin = accessor.min,
              mmax = accessor.max;

          if (mmin !== undefined && mmax !== undefined) {
            var min = TmpVectors.Vector3[0],
                max = TmpVectors.Vector3[1];
            min.copyFromFloats.apply(min, mmin);
            max.copyFromFloats.apply(max, mmax);
            babylonGeometry._boundingInfo = new BoundingInfo(min, max);
            babylonGeometry.useBoundingInfoFromGeometry = true;
          }
        }

        babylonGeometry.setVerticesBuffer(babylonVertexBuffer, accessor.count);
      }));

      if (kind == VertexBuffer.MatricesIndicesExtraKind) {
        babylonMesh.numBoneInfluencers = 8;
      }

      if (callback) {
        callback(accessor);
      }
    };

    loadAttribute("POSITION", VertexBuffer.PositionKind);
    loadAttribute("NORMAL", VertexBuffer.NormalKind);
    loadAttribute("TANGENT", VertexBuffer.TangentKind);
    loadAttribute("TEXCOORD_0", VertexBuffer.UVKind);
    loadAttribute("TEXCOORD_1", VertexBuffer.UV2Kind);
    loadAttribute("JOINTS_0", VertexBuffer.MatricesIndicesKind);
    loadAttribute("WEIGHTS_0", VertexBuffer.MatricesWeightsKind);
    loadAttribute("JOINTS_1", VertexBuffer.MatricesIndicesExtraKind);
    loadAttribute("WEIGHTS_1", VertexBuffer.MatricesWeightsExtraKind);
    loadAttribute("COLOR_0", VertexBuffer.ColorKind, function (accessor) {
      if (accessor.type === "VEC4"
      /* VEC4 */
      ) {
        babylonMesh.hasVertexAlpha = true;
      }
    });
    return Promise.all(promises).then(function () {
      return babylonGeometry;
    });
  };

  GLTFLoader.prototype._createMorphTargets = function (context, node, mesh, primitive, babylonMesh) {
    if (!primitive.targets) {
      return;
    }

    if (node._numMorphTargets == undefined) {
      node._numMorphTargets = primitive.targets.length;
    } else if (primitive.targets.length !== node._numMorphTargets) {
      throw new Error(context + ": Primitives do not have the same number of targets");
    }

    var targetNames = mesh.extras ? mesh.extras.targetNames : null;
    babylonMesh.morphTargetManager = new MorphTargetManager(babylonMesh.getScene());

    for (var index = 0; index < primitive.targets.length; index++) {
      var weight = node.weights ? node.weights[index] : mesh.weights ? mesh.weights[index] : 0;
      var name_4 = targetNames ? targetNames[index] : "morphTarget" + index;
      babylonMesh.morphTargetManager.addTarget(new MorphTarget(name_4, weight, babylonMesh.getScene())); // TODO: tell the target whether it has positions, normals, tangents
    }
  };

  GLTFLoader.prototype._loadMorphTargetsAsync = function (context, primitive, babylonMesh, babylonGeometry) {
    if (!primitive.targets) {
      return Promise.resolve();
    }

    var promises = new Array();
    var morphTargetManager = babylonMesh.morphTargetManager;

    for (var index = 0; index < morphTargetManager.numTargets; index++) {
      var babylonMorphTarget = morphTargetManager.getTarget(index);
      promises.push(this._loadMorphTargetVertexDataAsync(context + "/targets/" + index, babylonGeometry, primitive.targets[index], babylonMorphTarget));
    }

    return Promise.all(promises).then(function () {});
  };

  GLTFLoader.prototype._loadMorphTargetVertexDataAsync = function (context, babylonGeometry, attributes, babylonMorphTarget) {
    var _this = this;

    var promises = new Array();

    var loadAttribute = function (attribute, kind, setData) {
      if (attributes[attribute] == undefined) {
        return;
      }

      var babylonVertexBuffer = babylonGeometry.getVertexBuffer(kind);

      if (!babylonVertexBuffer) {
        return;
      }

      var accessor = ArrayItem.Get(context + "/" + attribute, _this._gltf.accessors, attributes[attribute]);
      promises.push(_this._loadFloatAccessorAsync("/accessors/" + accessor.index, accessor).then(function (data) {
        setData(babylonVertexBuffer, data);
      }));
    };

    loadAttribute("POSITION", VertexBuffer.PositionKind, function (babylonVertexBuffer, data) {
      var positions = new Float32Array(data.length);
      babylonVertexBuffer.forEach(data.length, function (value, index) {
        positions[index] = data[index] + value;
      });
      babylonMorphTarget.setPositions(positions);
    });
    loadAttribute("NORMAL", VertexBuffer.NormalKind, function (babylonVertexBuffer, data) {
      var normals = new Float32Array(data.length);
      babylonVertexBuffer.forEach(normals.length, function (value, index) {
        normals[index] = data[index] + value;
      });
      babylonMorphTarget.setNormals(normals);
    });
    loadAttribute("TANGENT", VertexBuffer.TangentKind, function (babylonVertexBuffer, data) {
      var tangents = new Float32Array(data.length / 3 * 4);
      var dataIndex = 0;
      babylonVertexBuffer.forEach(data.length / 3 * 4, function (value, index) {
        // Tangent data for morph targets is stored as xyz delta.
        // The vertexData.tangent is stored as xyzw.
        // So we need to skip every fourth vertexData.tangent.
        if ((index + 1) % 4 !== 0) {
          tangents[dataIndex] = data[dataIndex] + value;
          dataIndex++;
        }
      });
      babylonMorphTarget.setTangents(tangents);
    });
    return Promise.all(promises).then(function () {});
  };

  GLTFLoader._LoadTransform = function (node, babylonNode) {
    // Ignore the TRS of skinned nodes.
    // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
    if (node.skin != undefined) {
      return;
    }

    var position = Vector3.Zero();
    var rotation = Quaternion.Identity();
    var scaling = Vector3.One();

    if (node.matrix) {
      var matrix = Matrix.FromArray(node.matrix);
      matrix.decompose(scaling, rotation, position);
    } else {
      if (node.translation) {
        position = Vector3.FromArray(node.translation);
      }

      if (node.rotation) {
        rotation = Quaternion.FromArray(node.rotation);
      }

      if (node.scale) {
        scaling = Vector3.FromArray(node.scale);
      }
    }

    babylonNode.position = position;
    babylonNode.rotationQuaternion = rotation;
    babylonNode.scaling = scaling;
  };

  GLTFLoader.prototype._loadSkinAsync = function (context, node, skin) {
    var _this = this;

    var extensionPromise = this._extensionsLoadSkinAsync(context, node, skin);

    if (extensionPromise) {
      return extensionPromise;
    }

    var assignSkeleton = function (skeleton) {
      _this._forEachPrimitive(node, function (babylonMesh) {
        babylonMesh.skeleton = skeleton;
      });
    };

    if (skin._data) {
      assignSkeleton(skin._data.babylonSkeleton);
      return skin._data.promise;
    }

    var skeletonId = "skeleton" + skin.index;
    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    var babylonSkeleton = new Skeleton(skin.name || skeletonId, skeletonId, this._babylonScene);
    this._babylonScene._blockEntityCollection = false; // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)

    babylonSkeleton.overrideMesh = this._rootBabylonMesh;

    this._loadBones(context, skin, babylonSkeleton);

    assignSkeleton(babylonSkeleton);

    var promise = this._loadSkinInverseBindMatricesDataAsync(context, skin).then(function (inverseBindMatricesData) {
      _this._updateBoneMatrices(babylonSkeleton, inverseBindMatricesData);
    });

    skin._data = {
      babylonSkeleton: babylonSkeleton,
      promise: promise
    };
    return promise;
  };

  GLTFLoader.prototype._loadBones = function (context, skin, babylonSkeleton) {
    var babylonBones = {};

    for (var _i = 0, _a = skin.joints; _i < _a.length; _i++) {
      var index = _a[_i];
      var node = ArrayItem.Get(context + "/joints/" + index, this._gltf.nodes, index);

      this._loadBone(node, skin, babylonSkeleton, babylonBones);
    }
  };

  GLTFLoader.prototype._loadBone = function (node, skin, babylonSkeleton, babylonBones) {
    var babylonBone = babylonBones[node.index];

    if (babylonBone) {
      return babylonBone;
    }

    var babylonParentBone = null;

    if (node.parent && node.parent._babylonTransformNode !== this._rootBabylonMesh) {
      babylonParentBone = this._loadBone(node.parent, skin, babylonSkeleton, babylonBones);
    }

    var boneIndex = skin.joints.indexOf(node.index);
    babylonBone = new Bone(node.name || "joint" + node.index, babylonSkeleton, babylonParentBone, this._getNodeMatrix(node), null, null, boneIndex);
    babylonBones[node.index] = babylonBone;
    node._babylonBones = node._babylonBones || [];

    node._babylonBones.push(babylonBone);

    return babylonBone;
  };

  GLTFLoader.prototype._loadSkinInverseBindMatricesDataAsync = function (context, skin) {
    if (skin.inverseBindMatrices == undefined) {
      return Promise.resolve(null);
    }

    var accessor = ArrayItem.Get(context + "/inverseBindMatrices", this._gltf.accessors, skin.inverseBindMatrices);
    return this._loadFloatAccessorAsync("/accessors/" + accessor.index, accessor);
  };

  GLTFLoader.prototype._updateBoneMatrices = function (babylonSkeleton, inverseBindMatricesData) {
    for (var _i = 0, _a = babylonSkeleton.bones; _i < _a.length; _i++) {
      var babylonBone = _a[_i];
      var baseMatrix = Matrix.Identity();
      var boneIndex = babylonBone._index;

      if (inverseBindMatricesData && boneIndex !== -1) {
        Matrix.FromArrayToRef(inverseBindMatricesData, boneIndex * 16, baseMatrix);
        baseMatrix.invertToRef(baseMatrix);
      }

      var babylonParentBone = babylonBone.getParent();

      if (babylonParentBone) {
        baseMatrix.multiplyToRef(babylonParentBone.getInvertedAbsoluteTransform(), baseMatrix);
      }

      babylonBone.setBindPose(baseMatrix);
      babylonBone.updateMatrix(baseMatrix, false, false);

      babylonBone._updateDifferenceMatrix(undefined, false);
    }
  };

  GLTFLoader.prototype._getNodeMatrix = function (node) {
    return node.matrix ? Matrix.FromArray(node.matrix) : Matrix.Compose(node.scale ? Vector3.FromArray(node.scale) : Vector3.One(), node.rotation ? Quaternion.FromArray(node.rotation) : Quaternion.Identity(), node.translation ? Vector3.FromArray(node.translation) : Vector3.Zero());
  };
  /**
   * Loads a glTF camera.
   * @param context The context when loading the asset
   * @param camera The glTF camera property
   * @param assign A function called synchronously after parsing the glTF properties
   * @returns A promise that resolves with the loaded Babylon camera when the load is complete
   */


  GLTFLoader.prototype.loadCameraAsync = function (context, camera, assign) {
    if (assign === void 0) {
      assign = function () {};
    }

    var extensionPromise = this._extensionsLoadCameraAsync(context, camera, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    var promises = new Array();
    this.logOpen(context + " " + (camera.name || ""));
    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    var babylonCamera = new FreeCamera(camera.name || "camera" + camera.index, Vector3.Zero(), this._babylonScene, false);
    this._babylonScene._blockEntityCollection = false;
    babylonCamera.ignoreParentScaling = true;
    babylonCamera.rotation = new Vector3(0, Math.PI, 0);

    switch (camera.type) {
      case "perspective"
      /* PERSPECTIVE */
      :
        {
          var perspective = camera.perspective;

          if (!perspective) {
            throw new Error(context + ": Camera perspective properties are missing");
          }

          babylonCamera.fov = perspective.yfov;
          babylonCamera.minZ = perspective.znear;
          babylonCamera.maxZ = perspective.zfar || Number.MAX_VALUE;
          break;
        }

      case "orthographic"
      /* ORTHOGRAPHIC */
      :
        {
          if (!camera.orthographic) {
            throw new Error(context + ": Camera orthographic properties are missing");
          }

          babylonCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
          babylonCamera.orthoLeft = -camera.orthographic.xmag;
          babylonCamera.orthoRight = camera.orthographic.xmag;
          babylonCamera.orthoBottom = -camera.orthographic.ymag;
          babylonCamera.orthoTop = camera.orthographic.ymag;
          babylonCamera.minZ = camera.orthographic.znear;
          babylonCamera.maxZ = camera.orthographic.zfar;
          break;
        }

      default:
        {
          throw new Error(context + ": Invalid camera type (" + camera.type + ")");
        }
    }

    GLTFLoader.AddPointerMetadata(babylonCamera, context);

    this._parent.onCameraLoadedObservable.notifyObservers(babylonCamera);

    assign(babylonCamera);
    this.logClose();
    return Promise.all(promises).then(function () {
      return babylonCamera;
    });
  };

  GLTFLoader.prototype._loadAnimationsAsync = function () {
    var animations = this._gltf.animations;

    if (!animations) {
      return Promise.resolve();
    }

    var promises = new Array();

    for (var index = 0; index < animations.length; index++) {
      var animation = animations[index];
      promises.push(this.loadAnimationAsync("/animations/" + animation.index, animation));
    }

    return Promise.all(promises).then(function () {});
  };
  /**
   * Loads a glTF animation.
   * @param context The context when loading the asset
   * @param animation The glTF animation property
   * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
   */


  GLTFLoader.prototype.loadAnimationAsync = function (context, animation) {
    var promise = this._extensionsLoadAnimationAsync(context, animation);

    if (promise) {
      return promise;
    }

    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    var babylonAnimationGroup = new AnimationGroup(animation.name || "animation" + animation.index, this._babylonScene);
    this._babylonScene._blockEntityCollection = false;
    animation._babylonAnimationGroup = babylonAnimationGroup;
    var promises = new Array();
    ArrayItem.Assign(animation.channels);
    ArrayItem.Assign(animation.samplers);

    for (var _i = 0, _a = animation.channels; _i < _a.length; _i++) {
      var channel = _a[_i];
      promises.push(this._loadAnimationChannelAsync(context + "/channels/" + channel.index, context, animation, channel, babylonAnimationGroup));
    }

    return Promise.all(promises).then(function () {
      babylonAnimationGroup.normalize(0);
      return babylonAnimationGroup;
    });
  };
  /**
   * @hidden Loads a glTF animation channel.
   * @param context The context when loading the asset
   * @param animationContext The context of the animation when loading the asset
   * @param animation The glTF animation property
   * @param channel The glTF animation channel property
   * @param babylonAnimationGroup The babylon animation group property
   * @param animationTargetOverride The babylon animation channel target override property. My be null.
   * @returns A void promise when the channel load is complete
   */


  GLTFLoader.prototype._loadAnimationChannelAsync = function (context, animationContext, animation, channel, babylonAnimationGroup, animationTargetOverride) {
    var _this = this;

    if (animationTargetOverride === void 0) {
      animationTargetOverride = null;
    }

    if (channel.target.node == undefined) {
      return Promise.resolve();
    }

    var targetNode = ArrayItem.Get(context + "/target/node", this._gltf.nodes, channel.target.node); // Ignore animations that have no animation targets.

    if (channel.target.path === "weights"
    /* WEIGHTS */
    && !targetNode._numMorphTargets || channel.target.path !== "weights"
    /* WEIGHTS */
    && !targetNode._babylonTransformNode) {
      return Promise.resolve();
    }

    var sampler = ArrayItem.Get(context + "/sampler", animation.samplers, channel.sampler);
    return this._loadAnimationSamplerAsync(animationContext + "/samplers/" + channel.sampler, sampler).then(function (data) {
      var targetPath;
      var animationType;

      switch (channel.target.path) {
        case "translation"
        /* TRANSLATION */
        :
          {
            targetPath = "position";
            animationType = Animation.ANIMATIONTYPE_VECTOR3;
            break;
          }

        case "rotation"
        /* ROTATION */
        :
          {
            targetPath = "rotationQuaternion";
            animationType = Animation.ANIMATIONTYPE_QUATERNION;
            break;
          }

        case "scale"
        /* SCALE */
        :
          {
            targetPath = "scaling";
            animationType = Animation.ANIMATIONTYPE_VECTOR3;
            break;
          }

        case "weights"
        /* WEIGHTS */
        :
          {
            targetPath = "influence";
            animationType = Animation.ANIMATIONTYPE_FLOAT;
            break;
          }

        default:
          {
            throw new Error(context + "/target/path: Invalid value (" + channel.target.path + ")");
          }
      }

      var outputBufferOffset = 0;
      var getNextOutputValue;

      switch (targetPath) {
        case "position":
          {
            getNextOutputValue = function () {
              var value = Vector3.FromArray(data.output, outputBufferOffset);
              outputBufferOffset += 3;
              return value;
            };

            break;
          }

        case "rotationQuaternion":
          {
            getNextOutputValue = function () {
              var value = Quaternion.FromArray(data.output, outputBufferOffset);
              outputBufferOffset += 4;
              return value;
            };

            break;
          }

        case "scaling":
          {
            getNextOutputValue = function () {
              var value = Vector3.FromArray(data.output, outputBufferOffset);
              outputBufferOffset += 3;
              return value;
            };

            break;
          }

        case "influence":
          {
            getNextOutputValue = function () {
              var value = new Array(targetNode._numMorphTargets);

              for (var i = 0; i < targetNode._numMorphTargets; i++) {
                value[i] = data.output[outputBufferOffset++];
              }

              return value;
            };

            break;
          }
      }

      var getNextKey;

      switch (data.interpolation) {
        case "STEP"
        /* STEP */
        :
          {
            getNextKey = function (frameIndex) {
              return {
                frame: data.input[frameIndex],
                value: getNextOutputValue(),
                interpolation: AnimationKeyInterpolation.STEP
              };
            };

            break;
          }

        case "LINEAR"
        /* LINEAR */
        :
          {
            getNextKey = function (frameIndex) {
              return {
                frame: data.input[frameIndex],
                value: getNextOutputValue()
              };
            };

            break;
          }

        case "CUBICSPLINE"
        /* CUBICSPLINE */
        :
          {
            getNextKey = function (frameIndex) {
              return {
                frame: data.input[frameIndex],
                inTangent: getNextOutputValue(),
                value: getNextOutputValue(),
                outTangent: getNextOutputValue()
              };
            };

            break;
          }
      }

      var keys = new Array(data.input.length);

      for (var frameIndex = 0; frameIndex < data.input.length; frameIndex++) {
        keys[frameIndex] = getNextKey(frameIndex);
      }

      if (targetPath === "influence") {
        var _loop_2 = function (targetIndex) {
          var animationName = babylonAnimationGroup.name + "_channel" + babylonAnimationGroup.targetedAnimations.length;
          var babylonAnimation = new Animation(animationName, targetPath, 1, animationType);
          babylonAnimation.setKeys(keys.map(function (key) {
            return {
              frame: key.frame,
              inTangent: key.inTangent ? key.inTangent[targetIndex] : undefined,
              value: key.value[targetIndex],
              outTangent: key.outTangent ? key.outTangent[targetIndex] : undefined
            };
          }));

          _this._forEachPrimitive(targetNode, function (babylonAbstractMesh) {
            var babylonMesh = babylonAbstractMesh;
            var morphTarget = babylonMesh.morphTargetManager.getTarget(targetIndex);
            var babylonAnimationClone = babylonAnimation.clone();
            morphTarget.animations.push(babylonAnimationClone);
            babylonAnimationGroup.addTargetedAnimation(babylonAnimationClone, morphTarget);
          });
        };

        for (var targetIndex = 0; targetIndex < targetNode._numMorphTargets; targetIndex++) {
          _loop_2(targetIndex);
        }
      } else {
        var animationName = babylonAnimationGroup.name + "_channel" + babylonAnimationGroup.targetedAnimations.length;
        var babylonAnimation = new Animation(animationName, targetPath, 1, animationType);
        babylonAnimation.setKeys(keys);

        if (animationTargetOverride != null && animationTargetOverride.animations != null) {
          animationTargetOverride.animations.push(babylonAnimation);
          babylonAnimationGroup.addTargetedAnimation(babylonAnimation, animationTargetOverride);
        } else {
          targetNode._babylonTransformNode.animations.push(babylonAnimation);

          babylonAnimationGroup.addTargetedAnimation(babylonAnimation, targetNode._babylonTransformNode);
        }
      }
    });
  };

  GLTFLoader.prototype._loadAnimationSamplerAsync = function (context, sampler) {
    if (sampler._data) {
      return sampler._data;
    }

    var interpolation = sampler.interpolation || "LINEAR"
    /* LINEAR */
    ;

    switch (interpolation) {
      case "STEP"
      /* STEP */
      :
      case "LINEAR"
      /* LINEAR */
      :
      case "CUBICSPLINE"
      /* CUBICSPLINE */
      :
        {
          break;
        }

      default:
        {
          throw new Error(context + "/interpolation: Invalid value (" + sampler.interpolation + ")");
        }
    }

    var inputAccessor = ArrayItem.Get(context + "/input", this._gltf.accessors, sampler.input);
    var outputAccessor = ArrayItem.Get(context + "/output", this._gltf.accessors, sampler.output);
    sampler._data = Promise.all([this._loadFloatAccessorAsync("/accessors/" + inputAccessor.index, inputAccessor), this._loadFloatAccessorAsync("/accessors/" + outputAccessor.index, outputAccessor)]).then(function (_a) {
      var inputData = _a[0],
          outputData = _a[1];
      return {
        input: inputData,
        interpolation: interpolation,
        output: outputData
      };
    });
    return sampler._data;
  };

  GLTFLoader.prototype._loadBufferAsync = function (context, buffer, byteOffset, byteLength) {
    var extensionPromise = this._extensionsLoadBufferAsync(context, buffer, byteOffset, byteLength);

    if (extensionPromise) {
      return extensionPromise;
    }

    if (!buffer._data) {
      if (buffer.uri) {
        buffer._data = this.loadUriAsync(context + "/uri", buffer, buffer.uri);
      } else {
        if (!this._bin) {
          throw new Error(context + ": Uri is missing or the binary glTF is missing its binary chunk");
        }

        buffer._data = this._bin.readAsync(0, buffer.byteLength);
      }
    }

    return buffer._data.then(function (data) {
      try {
        return new Uint8Array(data.buffer, data.byteOffset + byteOffset, byteLength);
      } catch (e) {
        throw new Error(context + ": " + e.message);
      }
    });
  };
  /**
   * Loads a glTF buffer view.
   * @param context The context when loading the asset
   * @param bufferView The glTF buffer view property
   * @returns A promise that resolves with the loaded data when the load is complete
   */


  GLTFLoader.prototype.loadBufferViewAsync = function (context, bufferView) {
    var extensionPromise = this._extensionsLoadBufferViewAsync(context, bufferView);

    if (extensionPromise) {
      return extensionPromise;
    }

    if (bufferView._data) {
      return bufferView._data;
    }

    var buffer = ArrayItem.Get(context + "/buffer", this._gltf.buffers, bufferView.buffer);
    bufferView._data = this._loadBufferAsync("/buffers/" + buffer.index, buffer, bufferView.byteOffset || 0, bufferView.byteLength);
    return bufferView._data;
  };

  GLTFLoader.prototype._loadAccessorAsync = function (context, accessor, constructor) {
    var _this = this;

    if (accessor._data) {
      return accessor._data;
    }

    var numComponents = GLTFLoader._GetNumComponents(context, accessor.type);

    var byteStride = numComponents * VertexBuffer.GetTypeByteLength(accessor.componentType);
    var length = numComponents * accessor.count;

    if (accessor.bufferView == undefined) {
      accessor._data = Promise.resolve(new constructor(length));
    } else {
      var bufferView_1 = ArrayItem.Get(context + "/bufferView", this._gltf.bufferViews, accessor.bufferView);
      accessor._data = this.loadBufferViewAsync("/bufferViews/" + bufferView_1.index, bufferView_1).then(function (data) {
        if (accessor.componentType === 5126
        /* FLOAT */
        && !accessor.normalized && (!bufferView_1.byteStride || bufferView_1.byteStride === byteStride)) {
          return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, length);
        } else {
          var typedArray_1 = new constructor(length);
          VertexBuffer.ForEach(data, accessor.byteOffset || 0, bufferView_1.byteStride || byteStride, numComponents, accessor.componentType, typedArray_1.length, accessor.normalized || false, function (value, index) {
            typedArray_1[index] = value;
          });
          return typedArray_1;
        }
      });
    }

    if (accessor.sparse) {
      var sparse_1 = accessor.sparse;
      accessor._data = accessor._data.then(function (data) {
        var typedArray = data;
        var indicesBufferView = ArrayItem.Get(context + "/sparse/indices/bufferView", _this._gltf.bufferViews, sparse_1.indices.bufferView);
        var valuesBufferView = ArrayItem.Get(context + "/sparse/values/bufferView", _this._gltf.bufferViews, sparse_1.values.bufferView);
        return Promise.all([_this.loadBufferViewAsync("/bufferViews/" + indicesBufferView.index, indicesBufferView), _this.loadBufferViewAsync("/bufferViews/" + valuesBufferView.index, valuesBufferView)]).then(function (_a) {
          var indicesData = _a[0],
              valuesData = _a[1];

          var indices = GLTFLoader._GetTypedArray(context + "/sparse/indices", sparse_1.indices.componentType, indicesData, sparse_1.indices.byteOffset, sparse_1.count);

          var sparseLength = numComponents * sparse_1.count;
          var values;

          if (accessor.componentType === 5126
          /* FLOAT */
          && !accessor.normalized) {
            values = GLTFLoader._GetTypedArray(context + "/sparse/values", accessor.componentType, valuesData, sparse_1.values.byteOffset, sparseLength);
          } else {
            var sparseData = GLTFLoader._GetTypedArray(context + "/sparse/values", accessor.componentType, valuesData, sparse_1.values.byteOffset, sparseLength);

            values = new constructor(sparseLength);
            VertexBuffer.ForEach(sparseData, 0, byteStride, numComponents, accessor.componentType, values.length, accessor.normalized || false, function (value, index) {
              values[index] = value;
            });
          }

          var valuesIndex = 0;

          for (var indicesIndex = 0; indicesIndex < indices.length; indicesIndex++) {
            var dataIndex = indices[indicesIndex] * numComponents;

            for (var componentIndex = 0; componentIndex < numComponents; componentIndex++) {
              typedArray[dataIndex++] = values[valuesIndex++];
            }
          }

          return typedArray;
        });
      });
    }

    return accessor._data;
  };
  /** @hidden */


  GLTFLoader.prototype._loadFloatAccessorAsync = function (context, accessor) {
    return this._loadAccessorAsync(context, accessor, Float32Array);
  };

  GLTFLoader.prototype._loadIndicesAccessorAsync = function (context, accessor) {
    if (accessor.type !== "SCALAR"
    /* SCALAR */
    ) {
      throw new Error(context + "/type: Invalid value " + accessor.type);
    }

    if (accessor.componentType !== 5121
    /* UNSIGNED_BYTE */
    && accessor.componentType !== 5123
    /* UNSIGNED_SHORT */
    && accessor.componentType !== 5125
    /* UNSIGNED_INT */
    ) {
      throw new Error(context + "/componentType: Invalid value " + accessor.componentType);
    }

    if (accessor._data) {
      return accessor._data;
    }

    if (accessor.sparse) {
      var constructor = GLTFLoader._GetTypedArrayConstructor(context + "/componentType", accessor.componentType);

      accessor._data = this._loadAccessorAsync(context, accessor, constructor);
    } else {
      var bufferView = ArrayItem.Get(context + "/bufferView", this._gltf.bufferViews, accessor.bufferView);
      accessor._data = this.loadBufferViewAsync("/bufferViews/" + bufferView.index, bufferView).then(function (data) {
        return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, accessor.count);
      });
    }

    return accessor._data;
  };

  GLTFLoader.prototype._loadVertexBufferViewAsync = function (bufferView, kind) {
    var _this = this;

    if (bufferView._babylonBuffer) {
      return bufferView._babylonBuffer;
    }

    bufferView._babylonBuffer = this.loadBufferViewAsync("/bufferViews/" + bufferView.index, bufferView).then(function (data) {
      return new Buffer(_this._babylonScene.getEngine(), data, false);
    });
    return bufferView._babylonBuffer;
  };

  GLTFLoader.prototype._loadVertexAccessorAsync = function (context, accessor, kind) {
    var _this = this;

    if (accessor._babylonVertexBuffer) {
      return accessor._babylonVertexBuffer;
    }

    if (accessor.sparse) {
      accessor._babylonVertexBuffer = this._loadFloatAccessorAsync("/accessors/" + accessor.index, accessor).then(function (data) {
        return new VertexBuffer(_this._babylonScene.getEngine(), data, kind, false);
      });
    } // HACK: If byte offset is not a multiple of component type byte length then load as a float array instead of using Babylon buffers.
    else if (accessor.byteOffset && accessor.byteOffset % VertexBuffer.GetTypeByteLength(accessor.componentType) !== 0) {
      Logger.Warn("Accessor byte offset is not a multiple of component type byte length");
      accessor._babylonVertexBuffer = this._loadFloatAccessorAsync("/accessors/" + accessor.index, accessor).then(function (data) {
        return new VertexBuffer(_this._babylonScene.getEngine(), data, kind, false);
      });
    } // Load joint indices as a float array since the shaders expect float data but glTF uses unsigned byte/short.
    // This prevents certain platforms (e.g. D3D) from having to convert the data to float on the fly.
    else if (kind === VertexBuffer.MatricesIndicesKind || kind === VertexBuffer.MatricesIndicesExtraKind) {
      accessor._babylonVertexBuffer = this._loadFloatAccessorAsync("/accessors/" + accessor.index, accessor).then(function (data) {
        return new VertexBuffer(_this._babylonScene.getEngine(), data, kind, false);
      });
    } else {
      var bufferView_2 = ArrayItem.Get(context + "/bufferView", this._gltf.bufferViews, accessor.bufferView);
      accessor._babylonVertexBuffer = this._loadVertexBufferViewAsync(bufferView_2, kind).then(function (babylonBuffer) {
        var size = GLTFLoader._GetNumComponents(context, accessor.type);

        return new VertexBuffer(_this._babylonScene.getEngine(), babylonBuffer, kind, false, false, bufferView_2.byteStride, false, accessor.byteOffset, size, accessor.componentType, accessor.normalized, true, 1, true);
      });
    }

    return accessor._babylonVertexBuffer;
  };

  GLTFLoader.prototype._loadMaterialMetallicRoughnessPropertiesAsync = function (context, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();

    if (properties) {
      if (properties.baseColorFactor) {
        babylonMaterial.albedoColor = Color3.FromArray(properties.baseColorFactor);
        babylonMaterial.alpha = properties.baseColorFactor[3];
      } else {
        babylonMaterial.albedoColor = Color3.White();
      }

      babylonMaterial.metallic = properties.metallicFactor == undefined ? 1 : properties.metallicFactor;
      babylonMaterial.roughness = properties.roughnessFactor == undefined ? 1 : properties.roughnessFactor;

      if (properties.baseColorTexture) {
        promises.push(this.loadTextureInfoAsync(context + "/baseColorTexture", properties.baseColorTexture, function (texture) {
          texture.name = babylonMaterial.name + " (Base Color)";
          babylonMaterial.albedoTexture = texture;
        }));
      }

      if (properties.metallicRoughnessTexture) {
        properties.metallicRoughnessTexture.nonColorData = true;
        promises.push(this.loadTextureInfoAsync(context + "/metallicRoughnessTexture", properties.metallicRoughnessTexture, function (texture) {
          texture.name = babylonMaterial.name + " (Metallic Roughness)";
          babylonMaterial.metallicTexture = texture;
        }));
        babylonMaterial.useMetallnessFromMetallicTextureBlue = true;
        babylonMaterial.useRoughnessFromMetallicTextureGreen = true;
        babylonMaterial.useRoughnessFromMetallicTextureAlpha = false;
      }
    }

    return Promise.all(promises).then(function () {});
  };
  /** @hidden */


  GLTFLoader.prototype._loadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
    if (assign === void 0) {
      assign = function () {};
    }

    var extensionPromise = this._extensionsLoadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    material._data = material._data || {};
    var babylonData = material._data[babylonDrawMode];

    if (!babylonData) {
      this.logOpen(context + " " + (material.name || ""));
      var babylonMaterial = this.createMaterial(context, material, babylonDrawMode);
      babylonData = {
        babylonMaterial: babylonMaterial,
        babylonMeshes: [],
        promise: this.loadMaterialPropertiesAsync(context, material, babylonMaterial)
      };
      material._data[babylonDrawMode] = babylonData;
      GLTFLoader.AddPointerMetadata(babylonMaterial, context);

      this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);

      this.logClose();
    }

    if (babylonMesh) {
      babylonData.babylonMeshes.push(babylonMesh);
      babylonMesh.onDisposeObservable.addOnce(function () {
        var index = babylonData.babylonMeshes.indexOf(babylonMesh);

        if (index !== -1) {
          babylonData.babylonMeshes.splice(index, 1);
        }
      });
    }

    assign(babylonData.babylonMaterial);
    return babylonData.promise.then(function () {
      return babylonData.babylonMaterial;
    });
  };

  GLTFLoader.prototype._createDefaultMaterial = function (name, babylonDrawMode) {
    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    var babylonMaterial = new PBRMaterial(name, this._babylonScene);
    this._babylonScene._blockEntityCollection = false; // Moved to mesh so user can change materials on gltf meshes: babylonMaterial.sideOrientation = this._babylonScene.useRightHandedSystem ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;

    babylonMaterial.fillMode = babylonDrawMode;
    babylonMaterial.enableSpecularAntiAliasing = true;
    babylonMaterial.useRadianceOverAlpha = !this._parent.transparencyAsCoverage;
    babylonMaterial.useSpecularOverAlpha = !this._parent.transparencyAsCoverage;
    babylonMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_OPAQUE;
    babylonMaterial.metallic = 1;
    babylonMaterial.roughness = 1;
    return babylonMaterial;
  };
  /**
   * Creates a Babylon material from a glTF material.
   * @param context The context when loading the asset
   * @param material The glTF material property
   * @param babylonDrawMode The draw mode for the Babylon material
   * @returns The Babylon material
   */


  GLTFLoader.prototype.createMaterial = function (context, material, babylonDrawMode) {
    var extensionPromise = this._extensionsCreateMaterial(context, material, babylonDrawMode);

    if (extensionPromise) {
      return extensionPromise;
    }

    var name = material.name || "material" + material.index;

    var babylonMaterial = this._createDefaultMaterial(name, babylonDrawMode);

    return babylonMaterial;
  };
  /**
   * Loads properties from a glTF material into a Babylon material.
   * @param context The context when loading the asset
   * @param material The glTF material property
   * @param babylonMaterial The Babylon material
   * @returns A promise that resolves when the load is complete
   */


  GLTFLoader.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var extensionPromise = this._extensionsLoadMaterialPropertiesAsync(context, material, babylonMaterial);

    if (extensionPromise) {
      return extensionPromise;
    }

    var promises = new Array();
    promises.push(this.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));

    if (material.pbrMetallicRoughness) {
      promises.push(this._loadMaterialMetallicRoughnessPropertiesAsync(context + "/pbrMetallicRoughness", material.pbrMetallicRoughness, babylonMaterial));
    }

    this.loadMaterialAlphaProperties(context, material, babylonMaterial);
    return Promise.all(promises).then(function () {});
  };
  /**
   * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
   * @param context The context when loading the asset
   * @param material The glTF material property
   * @param babylonMaterial The Babylon material
   * @returns A promise that resolves when the load is complete
   */


  GLTFLoader.prototype.loadMaterialBasePropertiesAsync = function (context, material, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();
    babylonMaterial.emissiveColor = material.emissiveFactor ? Color3.FromArray(material.emissiveFactor) : new Color3(0, 0, 0);

    if (material.doubleSided) {
      babylonMaterial.backFaceCulling = false;
      babylonMaterial.twoSidedLighting = true;
    }

    if (material.normalTexture) {
      material.normalTexture.nonColorData = true;
      promises.push(this.loadTextureInfoAsync(context + "/normalTexture", material.normalTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Normal)";
        babylonMaterial.bumpTexture = texture;
      }));
      babylonMaterial.invertNormalMapX = !this._babylonScene.useRightHandedSystem;
      babylonMaterial.invertNormalMapY = this._babylonScene.useRightHandedSystem;

      if (material.normalTexture.scale != undefined) {
        babylonMaterial.bumpTexture.level = material.normalTexture.scale;
      }

      babylonMaterial.forceIrradianceInFragment = true;
    }

    if (material.occlusionTexture) {
      material.occlusionTexture.nonColorData = true;
      promises.push(this.loadTextureInfoAsync(context + "/occlusionTexture", material.occlusionTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Occlusion)";
        babylonMaterial.ambientTexture = texture;
      }));
      babylonMaterial.useAmbientInGrayScale = true;

      if (material.occlusionTexture.strength != undefined) {
        babylonMaterial.ambientTextureStrength = material.occlusionTexture.strength;
      }
    }

    if (material.emissiveTexture) {
      promises.push(this.loadTextureInfoAsync(context + "/emissiveTexture", material.emissiveTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Emissive)";
        babylonMaterial.emissiveTexture = texture;
      }));
    }

    return Promise.all(promises).then(function () {});
  };
  /**
   * Loads the alpha properties from a glTF material into a Babylon material.
   * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
   * @param context The context when loading the asset
   * @param material The glTF material property
   * @param babylonMaterial The Babylon material
   */


  GLTFLoader.prototype.loadMaterialAlphaProperties = function (context, material, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var alphaMode = material.alphaMode || "OPAQUE"
    /* OPAQUE */
    ;

    switch (alphaMode) {
      case "OPAQUE"
      /* OPAQUE */
      :
        {
          babylonMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_OPAQUE;
          break;
        }

      case "MASK"
      /* MASK */
      :
        {
          babylonMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHATEST;
          babylonMaterial.alphaCutOff = material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff;

          if (babylonMaterial.albedoTexture) {
            babylonMaterial.albedoTexture.hasAlpha = true;
          }

          break;
        }

      case "BLEND"
      /* BLEND */
      :
        {
          babylonMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;

          if (babylonMaterial.albedoTexture) {
            babylonMaterial.albedoTexture.hasAlpha = true;
            babylonMaterial.useAlphaFromAlbedoTexture = true;
          }

          break;
        }

      default:
        {
          throw new Error(context + "/alphaMode: Invalid value (" + material.alphaMode + ")");
        }
    }
  };
  /**
   * Loads a glTF texture info.
   * @param context The context when loading the asset
   * @param textureInfo The glTF texture info property
   * @param assign A function called synchronously after parsing the glTF properties
   * @returns A promise that resolves with the loaded Babylon texture when the load is complete
   */


  GLTFLoader.prototype.loadTextureInfoAsync = function (context, textureInfo, assign) {
    var _this = this;

    if (assign === void 0) {
      assign = function () {};
    }

    var extensionPromise = this._extensionsLoadTextureInfoAsync(context, textureInfo, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    this.logOpen("" + context);

    if (textureInfo.texCoord >= 2) {
      throw new Error(context + "/texCoord: Invalid value (" + textureInfo.texCoord + ")");
    }

    var texture = ArrayItem.Get(context + "/index", this._gltf.textures, textureInfo.index);
    texture._textureInfo = textureInfo;

    var promise = this._loadTextureAsync("/textures/" + textureInfo.index, texture, function (babylonTexture) {
      babylonTexture.coordinatesIndex = textureInfo.texCoord || 0;
      GLTFLoader.AddPointerMetadata(babylonTexture, context);

      _this._parent.onTextureLoadedObservable.notifyObservers(babylonTexture);

      assign(babylonTexture);
    });

    this.logClose();
    return promise;
  };
  /** @hidden */


  GLTFLoader.prototype._loadTextureAsync = function (context, texture, assign) {
    if (assign === void 0) {
      assign = function () {};
    }

    var extensionPromise = this._extensionsLoadTextureAsync(context, texture, assign);

    if (extensionPromise) {
      return extensionPromise;
    }

    this.logOpen(context + " " + (texture.name || ""));
    var sampler = texture.sampler == undefined ? GLTFLoader.DefaultSampler : ArrayItem.Get(context + "/sampler", this._gltf.samplers, texture.sampler);
    var image = ArrayItem.Get(context + "/source", this._gltf.images, texture.source);

    var promise = this._createTextureAsync(context, sampler, image, assign);

    this.logClose();
    return promise;
  };
  /** @hidden */


  GLTFLoader.prototype._createTextureAsync = function (context, sampler, image, assign, textureLoaderOptions) {
    var _this = this;

    if (assign === void 0) {
      assign = function () {};
    }

    var samplerData = this._loadSampler("/samplers/" + sampler.index, sampler);

    var promises = new Array();
    var deferred = new Deferred();
    this._babylonScene._blockEntityCollection = this._forAssetContainer;
    var babylonTexture = new Texture(null, this._babylonScene, samplerData.noMipMaps, false, samplerData.samplingMode, function () {
      if (!_this._disposed) {
        deferred.resolve();
      }
    }, function (message, exception) {
      if (!_this._disposed) {
        deferred.reject(new Error(context + ": " + (exception && exception.message ? exception.message : message || "Failed to load texture")));
      }
    }, undefined, undefined, undefined, image.mimeType, textureLoaderOptions);
    this._babylonScene._blockEntityCollection = false;
    promises.push(deferred.promise);
    promises.push(this.loadImageAsync("/images/" + image.index, image).then(function (data) {
      var name = image.uri || _this._fileName + "#image" + image.index;
      var dataUrl = "data:" + _this._uniqueRootUrl + name;
      babylonTexture.updateURL(dataUrl, data);
    }));
    babylonTexture.wrapU = samplerData.wrapU;
    babylonTexture.wrapV = samplerData.wrapV;
    assign(babylonTexture);
    return Promise.all(promises).then(function () {
      return babylonTexture;
    });
  };

  GLTFLoader.prototype._loadSampler = function (context, sampler) {
    if (!sampler._data) {
      sampler._data = {
        noMipMaps: sampler.minFilter === 9728
        /* NEAREST */
        || sampler.minFilter === 9729
        /* LINEAR */
        ,
        samplingMode: GLTFLoader._GetTextureSamplingMode(context, sampler),
        wrapU: GLTFLoader._GetTextureWrapMode(context + "/wrapS", sampler.wrapS),
        wrapV: GLTFLoader._GetTextureWrapMode(context + "/wrapT", sampler.wrapT)
      };
    }

    return sampler._data;
  };
  /**
   * Loads a glTF image.
   * @param context The context when loading the asset
   * @param image The glTF image property
   * @returns A promise that resolves with the loaded data when the load is complete
   */


  GLTFLoader.prototype.loadImageAsync = function (context, image) {
    if (!image._data) {
      this.logOpen(context + " " + (image.name || ""));

      if (image.uri) {
        image._data = this.loadUriAsync(context + "/uri", image, image.uri);
      } else {
        var bufferView = ArrayItem.Get(context + "/bufferView", this._gltf.bufferViews, image.bufferView);
        image._data = this.loadBufferViewAsync("/bufferViews/" + bufferView.index, bufferView);
      }

      this.logClose();
    }

    return image._data;
  };
  /**
   * Loads a glTF uri.
   * @param context The context when loading the asset
   * @param property The glTF property associated with the uri
   * @param uri The base64 or relative uri
   * @returns A promise that resolves with the loaded data when the load is complete
   */


  GLTFLoader.prototype.loadUriAsync = function (context, property, uri) {
    var _this = this;

    var extensionPromise = this._extensionsLoadUriAsync(context, property, uri);

    if (extensionPromise) {
      return extensionPromise;
    }

    if (!GLTFLoader._ValidateUri(uri)) {
      throw new Error(context + ": '" + uri + "' is invalid");
    }

    if (Tools.IsBase64(uri)) {
      var data = new Uint8Array(Tools.DecodeBase64(uri));
      this.log("Decoded " + uri.substr(0, 64) + "... (" + data.length + " bytes)");
      return Promise.resolve(data);
    }

    this.log("Loading " + uri);
    return this._parent.preprocessUrlAsync(this._rootUrl + uri).then(function (url) {
      return new Promise(function (resolve, reject) {
        _this._parent._loadFile(url, _this._babylonScene, function (data) {
          if (!_this._disposed) {
            _this.log("Loaded " + uri + " (" + data.byteLength + " bytes)");

            resolve(new Uint8Array(data));
          }
        }, true, function (request) {
          reject(new LoadFileError(context + ": Failed to load '" + uri + "'" + (request ? ": " + request.status + " " + request.statusText : ""), request));
        });
      });
    });
  };
  /**
   * Adds a JSON pointer to the metadata of the Babylon object at `<object>.metadata.gltf.pointers`.
   * @param babylonObject the Babylon object with metadata
   * @param pointer the JSON pointer
   */


  GLTFLoader.AddPointerMetadata = function (babylonObject, pointer) {
    var metadata = babylonObject.metadata = babylonObject.metadata || {};
    var gltf = metadata.gltf = metadata.gltf || {};
    var pointers = gltf.pointers = gltf.pointers || [];
    pointers.push(pointer);
  };

  GLTFLoader._GetTextureWrapMode = function (context, mode) {
    // Set defaults if undefined
    mode = mode == undefined ? 10497
    /* REPEAT */
    : mode;

    switch (mode) {
      case 33071
      /* CLAMP_TO_EDGE */
      :
        return Texture.CLAMP_ADDRESSMODE;

      case 33648
      /* MIRRORED_REPEAT */
      :
        return Texture.MIRROR_ADDRESSMODE;

      case 10497
      /* REPEAT */
      :
        return Texture.WRAP_ADDRESSMODE;

      default:
        Logger.Warn(context + ": Invalid value (" + mode + ")");
        return Texture.WRAP_ADDRESSMODE;
    }
  };

  GLTFLoader._GetTextureSamplingMode = function (context, sampler) {
    // Set defaults if undefined
    var magFilter = sampler.magFilter == undefined ? 9729
    /* LINEAR */
    : sampler.magFilter;
    var minFilter = sampler.minFilter == undefined ? 9987
    /* LINEAR_MIPMAP_LINEAR */
    : sampler.minFilter;

    if (magFilter === 9729
    /* LINEAR */
    ) {
      switch (minFilter) {
        case 9728
        /* NEAREST */
        :
          return Texture.LINEAR_NEAREST;

        case 9729
        /* LINEAR */
        :
          return Texture.LINEAR_LINEAR;

        case 9984
        /* NEAREST_MIPMAP_NEAREST */
        :
          return Texture.LINEAR_NEAREST_MIPNEAREST;

        case 9985
        /* LINEAR_MIPMAP_NEAREST */
        :
          return Texture.LINEAR_LINEAR_MIPNEAREST;

        case 9986
        /* NEAREST_MIPMAP_LINEAR */
        :
          return Texture.LINEAR_NEAREST_MIPLINEAR;

        case 9987
        /* LINEAR_MIPMAP_LINEAR */
        :
          return Texture.LINEAR_LINEAR_MIPLINEAR;

        default:
          Logger.Warn(context + "/minFilter: Invalid value (" + minFilter + ")");
          return Texture.LINEAR_LINEAR_MIPLINEAR;
      }
    } else {
      if (magFilter !== 9728
      /* NEAREST */
      ) {
        Logger.Warn(context + "/magFilter: Invalid value (" + magFilter + ")");
      }

      switch (minFilter) {
        case 9728
        /* NEAREST */
        :
          return Texture.NEAREST_NEAREST;

        case 9729
        /* LINEAR */
        :
          return Texture.NEAREST_LINEAR;

        case 9984
        /* NEAREST_MIPMAP_NEAREST */
        :
          return Texture.NEAREST_NEAREST_MIPNEAREST;

        case 9985
        /* LINEAR_MIPMAP_NEAREST */
        :
          return Texture.NEAREST_LINEAR_MIPNEAREST;

        case 9986
        /* NEAREST_MIPMAP_LINEAR */
        :
          return Texture.NEAREST_NEAREST_MIPLINEAR;

        case 9987
        /* LINEAR_MIPMAP_LINEAR */
        :
          return Texture.NEAREST_LINEAR_MIPLINEAR;

        default:
          Logger.Warn(context + "/minFilter: Invalid value (" + minFilter + ")");
          return Texture.NEAREST_NEAREST_MIPNEAREST;
      }
    }
  };

  GLTFLoader._GetTypedArrayConstructor = function (context, componentType) {
    switch (componentType) {
      case 5120
      /* BYTE */
      :
        return Int8Array;

      case 5121
      /* UNSIGNED_BYTE */
      :
        return Uint8Array;

      case 5122
      /* SHORT */
      :
        return Int16Array;

      case 5123
      /* UNSIGNED_SHORT */
      :
        return Uint16Array;

      case 5125
      /* UNSIGNED_INT */
      :
        return Uint32Array;

      case 5126
      /* FLOAT */
      :
        return Float32Array;

      default:
        throw new Error(context + ": Invalid component type " + componentType);
    }
  };

  GLTFLoader._GetTypedArray = function (context, componentType, bufferView, byteOffset, length) {
    var buffer = bufferView.buffer;
    byteOffset = bufferView.byteOffset + (byteOffset || 0);

    var constructor = GLTFLoader._GetTypedArrayConstructor(context + "/componentType", componentType);

    try {
      return new constructor(buffer, byteOffset, length);
    } catch (e) {
      throw new Error(context + ": " + e);
    }
  };

  GLTFLoader._GetNumComponents = function (context, type) {
    switch (type) {
      case "SCALAR":
        return 1;

      case "VEC2":
        return 2;

      case "VEC3":
        return 3;

      case "VEC4":
        return 4;

      case "MAT2":
        return 4;

      case "MAT3":
        return 9;

      case "MAT4":
        return 16;
    }

    throw new Error(context + ": Invalid type (" + type + ")");
  };

  GLTFLoader._ValidateUri = function (uri) {
    return Tools.IsBase64(uri) || uri.indexOf("..") === -1;
  };
  /** @hidden */


  GLTFLoader._GetDrawMode = function (context, mode) {
    if (mode == undefined) {
      mode = 4
      /* TRIANGLES */
      ;
    }

    switch (mode) {
      case 0
      /* POINTS */
      :
        return Material.PointListDrawMode;

      case 1
      /* LINES */
      :
        return Material.LineListDrawMode;

      case 2
      /* LINE_LOOP */
      :
        return Material.LineLoopDrawMode;

      case 3
      /* LINE_STRIP */
      :
        return Material.LineStripDrawMode;

      case 4
      /* TRIANGLES */
      :
        return Material.TriangleFillMode;

      case 5
      /* TRIANGLE_STRIP */
      :
        return Material.TriangleStripDrawMode;

      case 6
      /* TRIANGLE_FAN */
      :
        return Material.TriangleFanDrawMode;
    }

    throw new Error(context + ": Invalid mesh primitive mode (" + mode + ")");
  };

  GLTFLoader.prototype._compileMaterialsAsync = function () {
    var _this = this;

    this._parent._startPerformanceCounter("Compile materials");

    var promises = new Array();

    if (this._gltf.materials) {
      for (var _i = 0, _a = this._gltf.materials; _i < _a.length; _i++) {
        var material = _a[_i];

        if (material._data) {
          for (var babylonDrawMode in material._data) {
            var babylonData = material._data[babylonDrawMode];

            for (var _b = 0, _c = babylonData.babylonMeshes; _b < _c.length; _b++) {
              var babylonMesh = _c[_b]; // Ensure nonUniformScaling is set if necessary.

              babylonMesh.computeWorldMatrix(true);
              var babylonMaterial = babylonData.babylonMaterial;
              promises.push(babylonMaterial.forceCompilationAsync(babylonMesh));
              promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, {
                useInstances: true
              }));

              if (this._parent.useClipPlane) {
                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, {
                  clipPlane: true
                }));
                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, {
                  clipPlane: true,
                  useInstances: true
                }));
              }
            }
          }
        }
      }
    }

    return Promise.all(promises).then(function () {
      _this._parent._endPerformanceCounter("Compile materials");
    });
  };

  GLTFLoader.prototype._compileShadowGeneratorsAsync = function () {
    var _this = this;

    this._parent._startPerformanceCounter("Compile shadow generators");

    var promises = new Array();
    var lights = this._babylonScene.lights;

    for (var _i = 0, lights_1 = lights; _i < lights_1.length; _i++) {
      var light = lights_1[_i];
      var generator = light.getShadowGenerator();

      if (generator) {
        promises.push(generator.forceCompilationAsync());
      }
    }

    return Promise.all(promises).then(function () {
      _this._parent._endPerformanceCounter("Compile shadow generators");
    });
  };

  GLTFLoader.prototype._forEachExtensions = function (action) {
    for (var _i = 0, _a = this._extensions; _i < _a.length; _i++) {
      var extension = _a[_i];

      if (extension.enabled) {
        action(extension);
      }
    }
  };

  GLTFLoader.prototype._applyExtensions = function (property, functionName, actionAsync) {
    for (var _i = 0, _a = this._extensions; _i < _a.length; _i++) {
      var extension = _a[_i];

      if (extension.enabled) {
        var id = extension.name + "." + functionName;
        var loaderProperty = property;
        loaderProperty._activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions || {};
        var activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions;

        if (!activeLoaderExtensionFunctions[id]) {
          activeLoaderExtensionFunctions[id] = true;

          try {
            var result = actionAsync(extension);

            if (result) {
              return result;
            }
          } finally {
            delete activeLoaderExtensionFunctions[id];
          }
        }
      }
    }

    return null;
  };

  GLTFLoader.prototype._extensionsOnLoading = function () {
    this._forEachExtensions(function (extension) {
      return extension.onLoading && extension.onLoading();
    });
  };

  GLTFLoader.prototype._extensionsOnReady = function () {
    this._forEachExtensions(function (extension) {
      return extension.onReady && extension.onReady();
    });
  };

  GLTFLoader.prototype._extensionsLoadSceneAsync = function (context, scene) {
    return this._applyExtensions(scene, "loadScene", function (extension) {
      return extension.loadSceneAsync && extension.loadSceneAsync(context, scene);
    });
  };

  GLTFLoader.prototype._extensionsLoadNodeAsync = function (context, node, assign) {
    return this._applyExtensions(node, "loadNode", function (extension) {
      return extension.loadNodeAsync && extension.loadNodeAsync(context, node, assign);
    });
  };

  GLTFLoader.prototype._extensionsLoadCameraAsync = function (context, camera, assign) {
    return this._applyExtensions(camera, "loadCamera", function (extension) {
      return extension.loadCameraAsync && extension.loadCameraAsync(context, camera, assign);
    });
  };

  GLTFLoader.prototype._extensionsLoadVertexDataAsync = function (context, primitive, babylonMesh) {
    return this._applyExtensions(primitive, "loadVertexData", function (extension) {
      return extension._loadVertexDataAsync && extension._loadVertexDataAsync(context, primitive, babylonMesh);
    });
  };

  GLTFLoader.prototype._extensionsLoadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
    return this._applyExtensions(primitive, "loadMeshPrimitive", function (extension) {
      return extension._loadMeshPrimitiveAsync && extension._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign);
    });
  };

  GLTFLoader.prototype._extensionsLoadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
    return this._applyExtensions(material, "loadMaterial", function (extension) {
      return extension._loadMaterialAsync && extension._loadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign);
    });
  };

  GLTFLoader.prototype._extensionsCreateMaterial = function (context, material, babylonDrawMode) {
    return this._applyExtensions(material, "createMaterial", function (extension) {
      return extension.createMaterial && extension.createMaterial(context, material, babylonDrawMode);
    });
  };

  GLTFLoader.prototype._extensionsLoadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    return this._applyExtensions(material, "loadMaterialProperties", function (extension) {
      return extension.loadMaterialPropertiesAsync && extension.loadMaterialPropertiesAsync(context, material, babylonMaterial);
    });
  };

  GLTFLoader.prototype._extensionsLoadTextureInfoAsync = function (context, textureInfo, assign) {
    return this._applyExtensions(textureInfo, "loadTextureInfo", function (extension) {
      return extension.loadTextureInfoAsync && extension.loadTextureInfoAsync(context, textureInfo, assign);
    });
  };

  GLTFLoader.prototype._extensionsLoadTextureAsync = function (context, texture, assign) {
    return this._applyExtensions(texture, "loadTexture", function (extension) {
      return extension._loadTextureAsync && extension._loadTextureAsync(context, texture, assign);
    });
  };

  GLTFLoader.prototype._extensionsLoadAnimationAsync = function (context, animation) {
    return this._applyExtensions(animation, "loadAnimation", function (extension) {
      return extension.loadAnimationAsync && extension.loadAnimationAsync(context, animation);
    });
  };

  GLTFLoader.prototype._extensionsLoadSkinAsync = function (context, node, skin) {
    return this._applyExtensions(skin, "loadSkin", function (extension) {
      return extension._loadSkinAsync && extension._loadSkinAsync(context, node, skin);
    });
  };

  GLTFLoader.prototype._extensionsLoadUriAsync = function (context, property, uri) {
    return this._applyExtensions(property, "loadUri", function (extension) {
      return extension._loadUriAsync && extension._loadUriAsync(context, property, uri);
    });
  };

  GLTFLoader.prototype._extensionsLoadBufferViewAsync = function (context, bufferView) {
    return this._applyExtensions(bufferView, "loadBufferView", function (extension) {
      return extension.loadBufferViewAsync && extension.loadBufferViewAsync(context, bufferView);
    });
  };

  GLTFLoader.prototype._extensionsLoadBufferAsync = function (context, buffer, byteOffset, byteLength) {
    return this._applyExtensions(buffer, "loadBuffer", function (extension) {
      return extension.loadBufferAsync && extension.loadBufferAsync(context, buffer, byteOffset, byteLength);
    });
  };
  /**
   * Helper method called by a loader extension to load an glTF extension.
   * @param context The context when loading the asset
   * @param property The glTF property to load the extension from
   * @param extensionName The name of the extension to load
   * @param actionAsync The action to run
   * @returns The promise returned by actionAsync or null if the extension does not exist
   */


  GLTFLoader.LoadExtensionAsync = function (context, property, extensionName, actionAsync) {
    if (!property.extensions) {
      return null;
    }

    var extensions = property.extensions;
    var extension = extensions[extensionName];

    if (!extension) {
      return null;
    }

    return actionAsync(context + "/extensions/" + extensionName, extension);
  };
  /**
   * Helper method called by a loader extension to load a glTF extra.
   * @param context The context when loading the asset
   * @param property The glTF property to load the extra from
   * @param extensionName The name of the extension to load
   * @param actionAsync The action to run
   * @returns The promise returned by actionAsync or null if the extra does not exist
   */


  GLTFLoader.LoadExtraAsync = function (context, property, extensionName, actionAsync) {
    if (!property.extras) {
      return null;
    }

    var extras = property.extras;
    var extra = extras[extensionName];

    if (!extra) {
      return null;
    }

    return actionAsync(context + "/extras/" + extensionName, extra);
  };
  /**
   * Checks for presence of an extension.
   * @param name The name of the extension to check
   * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
   */


  GLTFLoader.prototype.isExtensionUsed = function (name) {
    return !!this._gltf.extensionsUsed && this._gltf.extensionsUsed.indexOf(name) !== -1;
  };
  /**
   * Increments the indentation level and logs a message.
   * @param message The message to log
   */


  GLTFLoader.prototype.logOpen = function (message) {
    this._parent._logOpen(message);
  };
  /**
   * Decrements the indentation level.
   */


  GLTFLoader.prototype.logClose = function () {
    this._parent._logClose();
  };
  /**
   * Logs a message
   * @param message The message to log
   */


  GLTFLoader.prototype.log = function (message) {
    this._parent._log(message);
  };
  /**
   * Starts a performance counter.
   * @param counterName The name of the performance counter
   */


  GLTFLoader.prototype.startPerformanceCounter = function (counterName) {
    this._parent._startPerformanceCounter(counterName);
  };
  /**
   * Ends a performance counter.
   * @param counterName The name of the performance counter
   */


  GLTFLoader.prototype.endPerformanceCounter = function (counterName) {
    this._parent._endPerformanceCounter(counterName);
  };

  GLTFLoader._RegisteredExtensions = {};
  /**
   * The default glTF sampler.
   */

  GLTFLoader.DefaultSampler = {
    index: -1
  };
  return GLTFLoader;
}();

GLTFFileLoader._CreateGLTF2Loader = function (parent) {
  return new GLTFLoader$1(parent);
};

var NAME = "EXT_lights_image_based";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
 */

var EXT_lights_image_based = function () {
  /** @hidden */
  function EXT_lights_image_based(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME);
  }
  /** @hidden */


  EXT_lights_image_based.prototype.dispose = function () {
    this._loader = null;
    delete this._lights;
  };
  /** @hidden */


  EXT_lights_image_based.prototype.onLoading = function () {
    var extensions = this._loader.gltf.extensions;

    if (extensions && extensions[this.name]) {
      var extension = extensions[this.name];
      this._lights = extension.lights;
    }
  };
  /** @hidden */


  EXT_lights_image_based.prototype.loadSceneAsync = function (context, scene) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, scene, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadSceneAsync(context, scene));

      _this._loader.logOpen("" + extensionContext);

      var light = ArrayItem.Get(extensionContext + "/light", _this._lights, extension.light);
      promises.push(_this._loadLightAsync("/extensions/" + _this.name + "/lights/" + extension.light, light).then(function (texture) {
        _this._loader.babylonScene.environmentTexture = texture;
      }));

      _this._loader.logClose();

      return Promise.all(promises).then(function () {});
    });
  };

  EXT_lights_image_based.prototype._loadLightAsync = function (context, light) {
    var _this = this;

    if (!light._loaded) {
      var promises = new Array();

      this._loader.logOpen("" + context);

      var imageData_1 = new Array(light.specularImages.length);

      var _loop_1 = function (mipmap) {
        var faces = light.specularImages[mipmap];
        imageData_1[mipmap] = new Array(faces.length);

        var _loop_2 = function (face) {
          var specularImageContext = context + "/specularImages/" + mipmap + "/" + face;

          this_1._loader.logOpen("" + specularImageContext);

          var index = faces[face];
          var image = ArrayItem.Get(specularImageContext, this_1._loader.gltf.images, index);
          promises.push(this_1._loader.loadImageAsync("/images/" + index, image).then(function (data) {
            imageData_1[mipmap][face] = data;
          }));

          this_1._loader.logClose();
        };

        for (var face = 0; face < faces.length; face++) {
          _loop_2(face);
        }
      };

      var this_1 = this;

      for (var mipmap = 0; mipmap < light.specularImages.length; mipmap++) {
        _loop_1(mipmap);
      }

      this._loader.logClose();

      light._loaded = Promise.all(promises).then(function () {
        var babylonTexture = new RawCubeTexture(_this._loader.babylonScene, null, light.specularImageSize);
        babylonTexture.name = light.name || "environment";
        light._babylonTexture = babylonTexture;

        if (light.intensity != undefined) {
          babylonTexture.level = light.intensity;
        }

        if (light.rotation) {
          var rotation = Quaternion.FromArray(light.rotation); // Invert the rotation so that positive rotation is counter-clockwise.

          if (!_this._loader.babylonScene.useRightHandedSystem) {
            rotation = Quaternion.Inverse(rotation);
          }

          Matrix.FromQuaternionToRef(rotation, babylonTexture.getReflectionTextureMatrix());
        }

        var sphericalHarmonics = SphericalHarmonics.FromArray(light.irradianceCoefficients);
        sphericalHarmonics.scaleInPlace(light.intensity);
        sphericalHarmonics.convertIrradianceToLambertianRadiance();
        var sphericalPolynomial = SphericalPolynomial.FromHarmonics(sphericalHarmonics); // Compute the lod generation scale to fit exactly to the number of levels available.

        var lodGenerationScale = (imageData_1.length - 1) / Scalar.Log2(light.specularImageSize);
        return babylonTexture.updateRGBDAsync(imageData_1, sphericalPolynomial, lodGenerationScale);
      });
    }

    return light._loaded.then(function () {
      return light._babylonTexture;
    });
  };

  return EXT_lights_image_based;
}();
GLTFLoader$1.RegisterExtension(NAME, function (loader) {
  return new EXT_lights_image_based(loader);
});

var NAME$1 = "EXT_mesh_gpu_instancing";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1691)
 * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
 * !!! Experimental Extension Subject to Changes !!!
 */

var EXT_mesh_gpu_instancing = function () {
  /** @hidden */
  function EXT_mesh_gpu_instancing(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$1;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$1);
  }
  /** @hidden */


  EXT_mesh_gpu_instancing.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  EXT_mesh_gpu_instancing.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
      _this._loader._disableInstancedMesh++;

      var promise = _this._loader.loadNodeAsync("/nodes/" + node.index, node, assign);

      _this._loader._disableInstancedMesh--;

      if (!node._primitiveBabylonMeshes) {
        return promise;
      }

      var promises = new Array();
      var instanceCount = 0;

      var loadAttribute = function (attribute) {
        if (extension.attributes[attribute] == undefined) {
          promises.push(Promise.resolve(null));
          return;
        }

        var accessor = ArrayItem.Get(extensionContext + "/attributes/" + attribute, _this._loader.gltf.accessors, extension.attributes[attribute]);
        promises.push(_this._loader._loadFloatAccessorAsync("/accessors/" + accessor.bufferView, accessor));

        if (instanceCount === 0) {
          instanceCount = accessor.count;
        } else if (instanceCount !== accessor.count) {
          throw new Error(extensionContext + "/attributes: Instance buffer accessors do not have the same count.");
        }
      };

      loadAttribute("TRANSLATION");
      loadAttribute("ROTATION");
      loadAttribute("SCALE");
      return promise.then(function (babylonTransformNode) {
        return Promise.all(promises).then(function (_a) {
          var translationBuffer = _a[0],
              rotationBuffer = _a[1],
              scaleBuffer = _a[2];
          var matrices = new Float32Array(instanceCount * 16);
          TmpVectors.Vector3[0].copyFromFloats(0, 0, 0); // translation

          TmpVectors.Quaternion[0].copyFromFloats(0, 0, 0, 1); // rotation

          TmpVectors.Vector3[1].copyFromFloats(1, 1, 1); // scale

          for (var i = 0; i < instanceCount; ++i) {
            translationBuffer && Vector3.FromArrayToRef(translationBuffer, i * 3, TmpVectors.Vector3[0]);
            rotationBuffer && Quaternion.FromArrayToRef(rotationBuffer, i * 4, TmpVectors.Quaternion[0]);
            scaleBuffer && Vector3.FromArrayToRef(scaleBuffer, i * 3, TmpVectors.Vector3[1]);
            Matrix.ComposeToRef(TmpVectors.Vector3[1], TmpVectors.Quaternion[0], TmpVectors.Vector3[0], TmpVectors.Matrix[0]);
            TmpVectors.Matrix[0].copyToArray(matrices, i * 16);
          }

          for (var _i = 0, _b = node._primitiveBabylonMeshes; _i < _b.length; _i++) {
            var babylonMesh = _b[_i];
            babylonMesh.thinInstanceSetBuffer("matrix", matrices, 16, true);
          }

          return babylonTransformNode;
        });
      });
    });
  };

  return EXT_mesh_gpu_instancing;
}();
GLTFLoader$1.RegisterExtension(NAME$1, function (loader) {
  return new EXT_mesh_gpu_instancing(loader);
});

var NAME$2 = "EXT_texture_webp";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_texture_webp/)
 */

var EXT_texture_webp = function () {
  /** @hidden */
  function EXT_texture_webp(loader) {
    /** The name of this extension. */
    this.name = NAME$2;
    this._loader = loader;
    this.enabled = loader.isExtensionUsed(NAME$2);
  }
  /** @hidden */


  EXT_texture_webp.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  EXT_texture_webp.prototype._loadTextureAsync = function (context, texture, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, texture, this.name, function (extensionContext, extension) {
      var sampler = texture.sampler == undefined ? GLTFLoader$1.DefaultSampler : ArrayItem.Get(context + "/sampler", _this._loader.gltf.samplers, texture.sampler);
      var image = ArrayItem.Get(extensionContext + "/source", _this._loader.gltf.images, extension.source);
      return _this._loader._createTextureAsync(context, sampler, image, function (babylonTexture) {
        assign(babylonTexture);
      });
    });
  };

  return EXT_texture_webp;
}();
GLTFLoader$1.RegisterExtension(NAME$2, function (loader) {
  return new EXT_texture_webp(loader);
});

var NAME$3 = "KHR_draco_mesh_compression";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression)
 */

var KHR_draco_mesh_compression = function () {
  /** @hidden */
  function KHR_draco_mesh_compression(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$3;
    this._loader = loader;
    this.enabled = DracoCompression.DecoderAvailable && this._loader.isExtensionUsed(NAME$3);
  }
  /** @hidden */


  KHR_draco_mesh_compression.prototype.dispose = function () {
    delete this.dracoCompression;
    this._loader = null;
  };
  /** @hidden */


  KHR_draco_mesh_compression.prototype._loadVertexDataAsync = function (context, primitive, babylonMesh) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, primitive, this.name, function (extensionContext, extension) {
      if (primitive.mode != undefined) {
        if (primitive.mode !== 5
        /* TRIANGLE_STRIP */
        && primitive.mode !== 4
        /* TRIANGLES */
        ) {
          throw new Error(context + ": Unsupported mode " + primitive.mode);
        } // TODO: handle triangle strips


        if (primitive.mode === 5
        /* TRIANGLE_STRIP */
        ) {
          throw new Error(context + ": Mode " + primitive.mode + " is not currently supported");
        }
      }

      var attributes = {};

      var loadAttribute = function (name, kind) {
        var uniqueId = extension.attributes[name];

        if (uniqueId == undefined) {
          return;
        }

        babylonMesh._delayInfo = babylonMesh._delayInfo || [];

        if (babylonMesh._delayInfo.indexOf(kind) === -1) {
          babylonMesh._delayInfo.push(kind);
        }

        attributes[kind] = uniqueId;
      };

      loadAttribute("POSITION", VertexBuffer.PositionKind);
      loadAttribute("NORMAL", VertexBuffer.NormalKind);
      loadAttribute("TANGENT", VertexBuffer.TangentKind);
      loadAttribute("TEXCOORD_0", VertexBuffer.UVKind);
      loadAttribute("TEXCOORD_1", VertexBuffer.UV2Kind);
      loadAttribute("JOINTS_0", VertexBuffer.MatricesIndicesKind);
      loadAttribute("WEIGHTS_0", VertexBuffer.MatricesWeightsKind);
      loadAttribute("COLOR_0", VertexBuffer.ColorKind);
      var bufferView = ArrayItem.Get(extensionContext, _this._loader.gltf.bufferViews, extension.bufferView);

      if (!bufferView._dracoBabylonGeometry) {
        bufferView._dracoBabylonGeometry = _this._loader.loadBufferViewAsync("/bufferViews/" + bufferView.index, bufferView).then(function (data) {
          var dracoCompression = _this.dracoCompression || DracoCompression.Default;
          return dracoCompression.decodeMeshAsync(data, attributes).then(function (babylonVertexData) {
            var babylonGeometry = new Geometry(babylonMesh.name, _this._loader.babylonScene);
            babylonVertexData.applyToGeometry(babylonGeometry);
            return babylonGeometry;
          }).catch(function (error) {
            throw new Error(context + ": " + error.message);
          });
        });
      }

      return bufferView._dracoBabylonGeometry;
    });
  };

  return KHR_draco_mesh_compression;
}();
GLTFLoader$1.RegisterExtension(NAME$3, function (loader) {
  return new KHR_draco_mesh_compression(loader);
});

var NAME$4 = "KHR_lights_punctual";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual)
 */

var KHR_lights = function () {
  /** @hidden */
  function KHR_lights(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$4;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$4);
  }
  /** @hidden */


  KHR_lights.prototype.dispose = function () {
    this._loader = null;
    delete this._lights;
  };
  /** @hidden */


  KHR_lights.prototype.onLoading = function () {
    var extensions = this._loader.gltf.extensions;

    if (extensions && extensions[this.name]) {
      var extension = extensions[this.name];
      this._lights = extension.lights;
    }
  };
  /** @hidden */


  KHR_lights.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
      return _this._loader.loadNodeAsync(context, node, function (babylonMesh) {
        var babylonLight;
        var light = ArrayItem.Get(extensionContext, _this._lights, extension.light);
        var name = light.name || babylonMesh.name;
        _this._loader.babylonScene._blockEntityCollection = _this._loader._forAssetContainer;

        switch (light.type) {
          case "directional"
          /* DIRECTIONAL */
          :
            {
              babylonLight = new DirectionalLight(name, Vector3.Backward(), _this._loader.babylonScene);
              break;
            }

          case "point"
          /* POINT */
          :
            {
              babylonLight = new PointLight(name, Vector3.Zero(), _this._loader.babylonScene);
              break;
            }

          case "spot"
          /* SPOT */
          :
            {
              var babylonSpotLight = new SpotLight(name, Vector3.Zero(), Vector3.Backward(), 0, 1, _this._loader.babylonScene);
              babylonSpotLight.angle = (light.spot && light.spot.outerConeAngle || Math.PI / 4) * 2;
              babylonSpotLight.innerAngle = (light.spot && light.spot.innerConeAngle || 0) * 2;
              babylonLight = babylonSpotLight;
              break;
            }

          default:
            {
              _this._loader.babylonScene._blockEntityCollection = false;
              throw new Error(extensionContext + ": Invalid light type (" + light.type + ")");
            }
        }

        _this._loader.babylonScene._blockEntityCollection = false;
        babylonLight.falloffType = Light.FALLOFF_GLTF;
        babylonLight.diffuse = light.color ? Color3.FromArray(light.color) : Color3.White();
        babylonLight.intensity = light.intensity == undefined ? 1 : light.intensity;
        babylonLight.range = light.range == undefined ? Number.MAX_VALUE : light.range;
        babylonLight.parent = babylonMesh;

        _this._loader._babylonLights.push(babylonLight);

        GLTFLoader$1.AddPointerMetadata(babylonLight, extensionContext);
        assign(babylonMesh);
      });
    });
  };

  return KHR_lights;
}();
GLTFLoader$1.RegisterExtension(NAME$4, function (loader) {
  return new KHR_lights(loader);
});

var NAME$5 = "KHR_materials_pbrSpecularGlossiness";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness)
 */

var KHR_materials_pbrSpecularGlossiness = function () {
  /** @hidden */
  function KHR_materials_pbrSpecularGlossiness(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$5;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 200;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$5);
  }
  /** @hidden */


  KHR_materials_pbrSpecularGlossiness.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_pbrSpecularGlossiness.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadSpecularGlossinessPropertiesAsync(extensionContext, material, extension, babylonMaterial));

      _this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);

      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_pbrSpecularGlossiness.prototype._loadSpecularGlossinessPropertiesAsync = function (context, material, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();
    babylonMaterial.metallic = null;
    babylonMaterial.roughness = null;

    if (properties.diffuseFactor) {
      babylonMaterial.albedoColor = Color3.FromArray(properties.diffuseFactor);
      babylonMaterial.alpha = properties.diffuseFactor[3];
    } else {
      babylonMaterial.albedoColor = Color3.White();
    }

    babylonMaterial.reflectivityColor = properties.specularFactor ? Color3.FromArray(properties.specularFactor) : Color3.White();
    babylonMaterial.microSurface = properties.glossinessFactor == undefined ? 1 : properties.glossinessFactor;

    if (properties.diffuseTexture) {
      promises.push(this._loader.loadTextureInfoAsync(context + "/diffuseTexture", properties.diffuseTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Diffuse)";
        babylonMaterial.albedoTexture = texture;
      }));
    }

    if (properties.specularGlossinessTexture) {
      properties.specularGlossinessTexture.nonColorData = true;
      promises.push(this._loader.loadTextureInfoAsync(context + "/specularGlossinessTexture", properties.specularGlossinessTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Specular Glossiness)";
        babylonMaterial.reflectivityTexture = texture;
      }));
      babylonMaterial.reflectivityTexture.hasAlpha = true;
      babylonMaterial.useMicroSurfaceFromReflectivityMapAlpha = true;
    }

    return Promise.all(promises).then(function () {});
  };

  return KHR_materials_pbrSpecularGlossiness;
}();
GLTFLoader$1.RegisterExtension(NAME$5, function (loader) {
  return new KHR_materials_pbrSpecularGlossiness(loader);
});

var NAME$6 = "KHR_materials_unlit";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit)
 */

var KHR_materials_unlit = function () {
  /** @hidden */
  function KHR_materials_unlit(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$6;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 210;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$6);
  }
  /** @hidden */


  KHR_materials_unlit.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_unlit.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function () {
      return _this._loadUnlitPropertiesAsync(context, material, babylonMaterial);
    });
  };

  KHR_materials_unlit.prototype._loadUnlitPropertiesAsync = function (context, material, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();
    babylonMaterial.unlit = true;
    var properties = material.pbrMetallicRoughness;

    if (properties) {
      if (properties.baseColorFactor) {
        babylonMaterial.albedoColor = Color3.FromArray(properties.baseColorFactor);
        babylonMaterial.alpha = properties.baseColorFactor[3];
      } else {
        babylonMaterial.albedoColor = Color3.White();
      }

      if (properties.baseColorTexture) {
        promises.push(this._loader.loadTextureInfoAsync(context + "/baseColorTexture", properties.baseColorTexture, function (texture) {
          texture.name = babylonMaterial.name + " (Base Color)";
          babylonMaterial.albedoTexture = texture;
        }));
      }
    }

    if (material.doubleSided) {
      babylonMaterial.backFaceCulling = false;
      babylonMaterial.twoSidedLighting = true;
    }

    this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);

    return Promise.all(promises).then(function () {});
  };

  return KHR_materials_unlit;
}();
GLTFLoader$1.RegisterExtension(NAME$6, function (loader) {
  return new KHR_materials_unlit(loader);
});

var NAME$7 = "KHR_materials_clearcoat";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
 */

var KHR_materials_clearcoat = function () {
  /** @hidden */
  function KHR_materials_clearcoat(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$7;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 190;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$7);
  }
  /** @hidden */


  KHR_materials_clearcoat.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_clearcoat.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadClearCoatPropertiesAsync(extensionContext, extension, babylonMaterial));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_clearcoat.prototype._loadClearCoatPropertiesAsync = function (context, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();
    babylonMaterial.clearCoat.isEnabled = true;
    babylonMaterial.clearCoat.useRoughnessFromMainTexture = false;
    babylonMaterial.clearCoat.remapF0OnInterfaceChange = false;

    if (properties.clearcoatFactor != undefined) {
      babylonMaterial.clearCoat.intensity = properties.clearcoatFactor;
    } else {
      babylonMaterial.clearCoat.intensity = 0;
    }

    if (properties.clearcoatTexture) {
      promises.push(this._loader.loadTextureInfoAsync(context + "/clearcoatTexture", properties.clearcoatTexture, function (texture) {
        texture.name = babylonMaterial.name + " (ClearCoat Intensity)";
        babylonMaterial.clearCoat.texture = texture;
      }));
    }

    if (properties.clearcoatRoughnessFactor != undefined) {
      babylonMaterial.clearCoat.roughness = properties.clearcoatRoughnessFactor;
    } else {
      babylonMaterial.clearCoat.roughness = 0;
    }

    if (properties.clearcoatRoughnessTexture) {
      properties.clearcoatRoughnessTexture.nonColorData = true;
      promises.push(this._loader.loadTextureInfoAsync(context + "/clearcoatRoughnessTexture", properties.clearcoatRoughnessTexture, function (texture) {
        texture.name = babylonMaterial.name + " (ClearCoat Roughness)";
        babylonMaterial.clearCoat.textureRoughness = texture;
      }));
    }

    if (properties.clearcoatNormalTexture) {
      properties.clearcoatNormalTexture.nonColorData = true;
      promises.push(this._loader.loadTextureInfoAsync(context + "/clearcoatNormalTexture", properties.clearcoatNormalTexture, function (texture) {
        texture.name = babylonMaterial.name + " (ClearCoat Normal)";
        babylonMaterial.clearCoat.bumpTexture = texture;
      }));
      babylonMaterial.invertNormalMapX = !babylonMaterial.getScene().useRightHandedSystem;
      babylonMaterial.invertNormalMapY = babylonMaterial.getScene().useRightHandedSystem;

      if (properties.clearcoatNormalTexture.scale != undefined) {
        babylonMaterial.clearCoat.bumpTexture.level = properties.clearcoatNormalTexture.scale;
      }
    }

    return Promise.all(promises).then(function () {});
  };

  return KHR_materials_clearcoat;
}();
GLTFLoader$1.RegisterExtension(NAME$7, function (loader) {
  return new KHR_materials_clearcoat(loader);
});

var NAME$8 = "KHR_materials_sheen";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1688)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_sheen = function () {
  /** @hidden */
  function KHR_materials_sheen(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$8;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 190;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$8);
  }
  /** @hidden */


  KHR_materials_sheen.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_sheen.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadSheenPropertiesAsync(extensionContext, extension, babylonMaterial));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_sheen.prototype._loadSheenPropertiesAsync = function (context, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();
    babylonMaterial.sheen.isEnabled = true;
    babylonMaterial.sheen.intensity = 1;

    if (properties.sheenColorFactor != undefined) {
      babylonMaterial.sheen.color = Color3.FromArray(properties.sheenColorFactor);
    } else {
      babylonMaterial.sheen.color = Color3.Black();
    }

    if (properties.sheenColorTexture) {
      promises.push(this._loader.loadTextureInfoAsync(context + "/sheenColorTexture", properties.sheenColorTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Sheen Color)";
        babylonMaterial.sheen.texture = texture;
      }));
    }

    if (properties.sheenRoughnessFactor !== undefined) {
      babylonMaterial.sheen.roughness = properties.sheenRoughnessFactor;
    } else {
      babylonMaterial.sheen.roughness = 0;
    }

    if (properties.sheenRoughnessTexture) {
      properties.sheenRoughnessTexture.nonColorData = true;
      promises.push(this._loader.loadTextureInfoAsync(context + "/sheenRoughnessTexture", properties.sheenRoughnessTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Sheen Roughness)";
        babylonMaterial.sheen.textureRoughness = texture;
      }));
    }

    babylonMaterial.sheen.albedoScaling = true;
    babylonMaterial.sheen.useRoughnessFromMainTexture = false;
    return Promise.all(promises).then(function () {});
  };

  return KHR_materials_sheen;
}();
GLTFLoader$1.RegisterExtension(NAME$8, function (loader) {
  return new KHR_materials_sheen(loader);
});

var NAME$9 = "KHR_materials_specular";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1719)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_specular = function () {
  /** @hidden */
  function KHR_materials_specular(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$9;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 190;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$9);
  }
  /** @hidden */


  KHR_materials_specular.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_specular.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadSpecularPropertiesAsync(extensionContext, extension, babylonMaterial));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_specular.prototype._loadSpecularPropertiesAsync = function (context, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var promises = new Array();

    if (properties.specularFactor !== undefined) {
      babylonMaterial.metallicF0Factor = properties.specularFactor;
    }

    if (properties.specularColorFactor !== undefined) {
      babylonMaterial.metallicReflectanceColor = Color3.FromArray(properties.specularColorFactor);
    }

    if (properties.specularTexture) {
      properties.specularTexture.nonColorData = true;
      promises.push(this._loader.loadTextureInfoAsync(context + "/specularTexture", properties.specularTexture, function (texture) {
        texture.name = babylonMaterial.name + " (Specular F0 Color)";
        babylonMaterial.metallicReflectanceTexture = texture;
      }));
    }

    return Promise.all(promises).then(function () {});
  };

  return KHR_materials_specular;
}();
GLTFLoader$1.RegisterExtension(NAME$9, function (loader) {
  return new KHR_materials_specular(loader);
});

var NAME$a = "KHR_materials_ior";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1718)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_ior = function () {
  /** @hidden */
  function KHR_materials_ior(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$a;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 180;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$a);
  }
  /** @hidden */


  KHR_materials_ior.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_ior.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadIorPropertiesAsync(extensionContext, extension, babylonMaterial));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_ior.prototype._loadIorPropertiesAsync = function (context, properties, babylonMaterial) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    if (properties.ior !== undefined) {
      babylonMaterial.indexOfRefraction = properties.ior;
    } else {
      babylonMaterial.indexOfRefraction = KHR_materials_ior._DEFAULT_IOR;
    }

    return Promise.resolve();
  };
  /**
   * Default ior Value from the spec.
   */


  KHR_materials_ior._DEFAULT_IOR = 1.5;
  return KHR_materials_ior;
}();
GLTFLoader$1.RegisterExtension(NAME$a, function (loader) {
  return new KHR_materials_ior(loader);
});

var NAME$b = "KHR_materials_variants";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1681)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_variants = function () {
  /** @hidden */
  function KHR_materials_variants(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$b;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$b);
  }
  /** @hidden */


  KHR_materials_variants.prototype.dispose = function () {
    this._loader = null;
  };
  /**
   * Gets the list of available variant names for this asset.
   * @param rootMesh The glTF root mesh
   * @returns the list of all the variant names for this model
   */


  KHR_materials_variants.GetAvailableVariants = function (rootMesh) {
    var extensionMetadata = this._GetExtensionMetadata(rootMesh);

    if (!extensionMetadata) {
      return [];
    }

    return Object.keys(extensionMetadata.variants);
  };
  /**
   * Gets the list of available variant names for this asset.
   * @param rootMesh The glTF root mesh
   * @returns the list of all the variant names for this model
   */


  KHR_materials_variants.prototype.getAvailableVariants = function (rootMesh) {
    return KHR_materials_variants.GetAvailableVariants(rootMesh);
  };
  /**
   * Select a variant given a variant name or a list of variant names.
   * @param rootMesh The glTF root mesh
   * @param variantName The variant name(s) to select.
   */


  KHR_materials_variants.SelectVariant = function (rootMesh, variantName) {
    var extensionMetadata = this._GetExtensionMetadata(rootMesh);

    if (!extensionMetadata) {
      throw new Error("Cannot select variant on a glTF mesh that does not have the " + NAME$b + " extension");
    }

    var select = function (variantName) {
      var entries = extensionMetadata.variants[variantName];

      if (entries) {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
          var entry = entries_1[_i];
          entry.mesh.material = entry.material;
        }
      }
    };

    if (variantName instanceof Array) {
      for (var _i = 0, variantName_1 = variantName; _i < variantName_1.length; _i++) {
        var name_1 = variantName_1[_i];
        select(name_1);
      }
    } else {
      select(variantName);
    }

    extensionMetadata.lastSelected = variantName;
  };
  /**
   * Select a variant given a variant name or a list of variant names.
   * @param rootMesh The glTF root mesh
   * @param variantName The variant name(s) to select.
   */


  KHR_materials_variants.prototype.selectVariant = function (rootMesh, variantName) {
    return KHR_materials_variants.SelectVariant(rootMesh, variantName);
  };
  /**
   * Reset back to the original before selecting a variant.
   * @param rootMesh The glTF root mesh
   */


  KHR_materials_variants.Reset = function (rootMesh) {
    var extensionMetadata = this._GetExtensionMetadata(rootMesh);

    if (!extensionMetadata) {
      throw new Error("Cannot reset on a glTF mesh that does not have the " + NAME$b + " extension");
    }

    for (var _i = 0, _a = extensionMetadata.original; _i < _a.length; _i++) {
      var entry = _a[_i];
      entry.mesh.material = entry.material;
    }

    extensionMetadata.lastSelected = null;
  };
  /**
   * Reset back to the original before selecting a variant.
   * @param rootMesh The glTF root mesh
   */


  KHR_materials_variants.prototype.reset = function (rootMesh) {
    return KHR_materials_variants.Reset(rootMesh);
  };
  /**
   * Gets the last selected variant name(s) or null if original.
   * @param rootMesh The glTF root mesh
   * @returns The selected variant name(s).
   */


  KHR_materials_variants.GetLastSelectedVariant = function (rootMesh) {
    var extensionMetadata = this._GetExtensionMetadata(rootMesh);

    if (!extensionMetadata) {
      throw new Error("Cannot get the last selected variant on a glTF mesh that does not have the " + NAME$b + " extension");
    }

    return extensionMetadata.lastSelected;
  };
  /**
   * Gets the last selected variant name(s) or null if original.
   * @param rootMesh The glTF root mesh
   * @returns The selected variant name(s).
   */


  KHR_materials_variants.prototype.getLastSelectedVariant = function (rootMesh) {
    return KHR_materials_variants.GetLastSelectedVariant(rootMesh);
  };

  KHR_materials_variants._GetExtensionMetadata = function (rootMesh) {
    var _a, _b;

    return ((_b = (_a = rootMesh === null || rootMesh === void 0 ? void 0 : rootMesh.metadata) === null || _a === void 0 ? void 0 : _a.gltf) === null || _b === void 0 ? void 0 : _b[NAME$b]) || null;
  };
  /** @hidden */


  KHR_materials_variants.prototype.onLoading = function () {
    var extensions = this._loader.gltf.extensions;

    if (extensions && extensions[this.name]) {
      var extension = extensions[this.name];
      this._variants = extension.variants;
    }
  };
  /** @hidden */


  KHR_materials_variants.prototype._loadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, primitive, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, function (babylonMesh) {
        assign(babylonMesh);

        if (babylonMesh instanceof Mesh) {
          var babylonDrawMode = GLTFLoader$1._GetDrawMode(context, primitive.mode);

          var root = _this._loader.rootBabylonMesh;
          var metadata = root.metadata = root.metadata || {};
          var gltf = metadata.gltf = metadata.gltf || {};
          var extensionMetadata = gltf[NAME$b] = gltf[NAME$b] || {
            lastSelected: null,
            original: [],
            variants: {}
          }; // Store the original material.

          extensionMetadata.original.push({
            mesh: babylonMesh,
            material: babylonMesh.material
          }); // For each mapping, look at the variants and make a new entry for them.

          var variants_1 = extensionMetadata.variants;

          for (var _i = 0, _a = extension.mappings; _i < _a.length; _i++) {
            var mapping = _a[_i];

            var _loop_1 = function (variantIndex) {
              var variant = ArrayItem.Get(extensionContext + "/mapping/" + variantIndex, _this._variants, variantIndex);
              var material = ArrayItem.Get("#/materials/", _this._loader.gltf.materials, mapping.material);
              promises.push(_this._loader._loadMaterialAsync("#/materials/" + mapping.material, material, babylonMesh, babylonDrawMode, function (babylonMaterial) {
                variants_1[variant.name] = variants_1[variant.name] || [];
                variants_1[variant.name].push({
                  mesh: babylonMesh,
                  material: babylonMaterial
                });
              }));
            };

            for (var _b = 0, _c = mapping.variants; _b < _c.length; _b++) {
              var variantIndex = _c[_b];

              _loop_1(variantIndex);
            }
          }
        }
      }));
      return Promise.all(promises).then(function (_a) {
        var babylonMesh = _a[0];
        return babylonMesh;
      });
    });
  };

  return KHR_materials_variants;
}();
GLTFLoader$1.RegisterExtension(NAME$b, function (loader) {
  return new KHR_materials_variants(loader);
});

/**
 * A class to handle setting up the rendering of opaque objects to be shown through transmissive objects.
 */

var TransmissionHelper = function () {
  /**
   * constructor
   * @param options Defines the options we want to customize the helper
   * @param scene The scene to add the material to
   */
  function TransmissionHelper(options, scene) {
    var _this = this;

    this._opaqueRenderTarget = null;
    this._opaqueMeshesCache = [];
    this._transparentMeshesCache = [];
    this._options = __assign(__assign({}, TransmissionHelper._getDefaultOptions()), options);
    this._scene = scene;
    this._scene._transmissionHelper = this;
    this.onErrorObservable = new Observable();

    this._scene.onDisposeObservable.addOnce(function (scene) {
      _this.dispose();
    });

    this._parseScene();

    this._setupRenderTargets();
  }
  /**
   * Creates the default options for the helper.
   */


  TransmissionHelper._getDefaultOptions = function () {
    return {
      renderSize: 512
    };
  };
  /**
   * Updates the background according to the new options
   * @param options
   */


  TransmissionHelper.prototype.updateOptions = function (options) {
    var _this = this; // First check if any options are actually being changed. If not, exit.


    var newValues = Object.keys(options).filter(function (key) {
      return _this._options[key] !== options[key];
    });

    if (!newValues.length) {
      return;
    }

    var newOptions = __assign(__assign({}, this._options), options);

    var oldOptions = this._options;
    this._options = newOptions; // If size changes, recreate everything

    if (newOptions.renderSize !== oldOptions.renderSize) {
      this._setupRenderTargets();
    }
  };

  TransmissionHelper.prototype.getOpaqueTarget = function () {
    return this._opaqueRenderTarget;
  };

  TransmissionHelper.prototype.shouldRenderAsTransmission = function (material) {
    if (!material) {
      return false;
    }

    if (material instanceof PBRMaterial && material.subSurface.isRefractionEnabled) {
      return true;
    }

    return false;
  };

  TransmissionHelper.prototype._addMesh = function (mesh) {
    if (mesh instanceof Mesh) {
      mesh.onMaterialChangedObservable.add(this.onMeshMaterialChanged.bind(this));

      if (this.shouldRenderAsTransmission(mesh.material)) {
        this._transparentMeshesCache.push(mesh);
      } else {
        this._opaqueMeshesCache.push(mesh);
      }
    }
  };

  TransmissionHelper.prototype._removeMesh = function (mesh) {
    if (mesh instanceof Mesh) {
      mesh.onMaterialChangedObservable.remove(this.onMeshMaterialChanged.bind(this));

      var idx = this._transparentMeshesCache.indexOf(mesh);

      if (idx !== -1) {
        this._transparentMeshesCache.splice(idx, 1);
      }

      idx = this._opaqueMeshesCache.indexOf(mesh);

      if (idx !== -1) {
        this._opaqueMeshesCache.splice(idx, 1);
      }
    }
  };

  TransmissionHelper.prototype._parseScene = function () {
    this._scene.meshes.forEach(this._addMesh.bind(this)); // Listen for when a mesh is added to the scene and add it to our cache lists.


    this._scene.onNewMeshAddedObservable.add(this._addMesh.bind(this)); // Listen for when a mesh is removed from to the scene and remove it from our cache lists.


    this._scene.onMeshRemovedObservable.add(this._removeMesh.bind(this));
  }; // When one of the meshes in the scene has its material changed, make sure that it's in the correct cache list.


  TransmissionHelper.prototype.onMeshMaterialChanged = function (mesh) {
    if (mesh instanceof Mesh) {
      var transparentIdx = this._transparentMeshesCache.indexOf(mesh);

      var opaqueIdx = this._opaqueMeshesCache.indexOf(mesh); // If the material is transparent, make sure that it's added to the transparent list and removed from the opaque list


      var useTransmission = this.shouldRenderAsTransmission(mesh.material);

      if (useTransmission) {
        if (mesh.material instanceof PBRMaterial) {
          mesh.material.subSurface.refractionTexture = this._opaqueRenderTarget;
        }

        if (opaqueIdx !== -1) {
          this._opaqueMeshesCache.splice(opaqueIdx, 1);

          this._transparentMeshesCache.push(mesh);
        } else if (transparentIdx === -1) {
          this._transparentMeshesCache.push(mesh);
        } // If the material is opaque, make sure that it's added to the opaque list and removed from the transparent list

      } else {
        if (transparentIdx !== -1) {
          this._transparentMeshesCache.splice(transparentIdx, 1);

          this._opaqueMeshesCache.push(mesh);
        } else if (opaqueIdx === -1) {
          this._opaqueMeshesCache.push(mesh);
        }
      }
    }
  };
  /**
   * Setup the render targets according to the specified options.
   */


  TransmissionHelper.prototype._setupRenderTargets = function () {
    var _this = this;

    var opaqueRTIndex = -1; // Remove any layers rendering to the opaque scene.

    if (this._scene.layers && this._opaqueRenderTarget) {
      for (var _i = 0, _a = this._scene.layers; _i < _a.length; _i++) {
        var layer = _a[_i];
        var idx = layer.renderTargetTextures.indexOf(this._opaqueRenderTarget);

        if (idx >= 0) {
          layer.renderTargetTextures.splice(idx, 1);
        }
      }
    } // Remove opaque render target


    if (this._opaqueRenderTarget) {
      opaqueRTIndex = this._scene.customRenderTargets.indexOf(this._opaqueRenderTarget);

      this._opaqueRenderTarget.dispose();
    }

    this._opaqueRenderTarget = new RenderTargetTexture("opaqueSceneTexture", this._options.renderSize, this._scene, true);
    this._opaqueRenderTarget.renderList = this._opaqueMeshesCache; // this._opaqueRenderTarget.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);

    this._opaqueRenderTarget.gammaSpace = true;
    this._opaqueRenderTarget.lodGenerationScale = 1;
    this._opaqueRenderTarget.lodGenerationOffset = -4;

    if (opaqueRTIndex >= 0) {
      this._scene.customRenderTargets.splice(opaqueRTIndex, 0, this._opaqueRenderTarget);
    } else {
      opaqueRTIndex = this._scene.customRenderTargets.length;

      this._scene.customRenderTargets.push(this._opaqueRenderTarget);
    } // If there are other layers, they should be included in the render of the opaque background.


    if (this._scene.layers && this._opaqueRenderTarget) {
      for (var _b = 0, _c = this._scene.layers; _b < _c.length; _b++) {
        var layer = _c[_b];
        layer.renderTargetTextures.push(this._opaqueRenderTarget);
      }
    }

    this._transparentMeshesCache.forEach(function (mesh) {
      if (_this.shouldRenderAsTransmission(mesh.material) && mesh.material instanceof PBRMaterial) {
        mesh.material.refractionTexture = _this._opaqueRenderTarget;
      }
    });
  };
  /**
   * Dispose all the elements created by the Helper.
   */


  TransmissionHelper.prototype.dispose = function () {
    this._scene._transmissionHelper = undefined;

    if (this._opaqueRenderTarget) {
      this._opaqueRenderTarget.dispose();

      this._opaqueRenderTarget = null;
    }

    this._transparentMeshesCache = [];
    this._opaqueMeshesCache = [];
  };

  return TransmissionHelper;
}();

var NAME$c = "KHR_materials_transmission";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1698)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_transmission = function () {
  /** @hidden */
  function KHR_materials_transmission(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$c;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 175;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$c);

    if (this.enabled) {
      loader.parent.transparencyAsCoverage = true;
    }
  }
  /** @hidden */


  KHR_materials_transmission.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_transmission.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadTransparentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_transmission.prototype._loadTransparentPropertiesAsync = function (context, material, babylonMaterial, extension) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var pbrMaterial = babylonMaterial; // Enables "refraction" texture which represents transmitted light.

    pbrMaterial.subSurface.isRefractionEnabled = true; // Since this extension models thin-surface transmission only, we must make IOR = 1.0

    pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0; // Albedo colour will tint transmission.

    pbrMaterial.subSurface.useAlbedoToTintRefraction = true;

    if (extension.transmissionFactor !== undefined) {
      pbrMaterial.subSurface.refractionIntensity = extension.transmissionFactor;
      var scene = pbrMaterial.getScene();

      if (pbrMaterial.subSurface.refractionIntensity && !scene._transmissionHelper) {
        new TransmissionHelper({}, pbrMaterial.getScene());
      }
    } else {
      pbrMaterial.subSurface.refractionIntensity = 0.0;
      pbrMaterial.subSurface.isRefractionEnabled = false;
      return Promise.resolve();
    }

    if (extension.transmissionTexture) {
      extension.transmissionTexture.nonColorData = true;
      return this._loader.loadTextureInfoAsync(context + "/transmissionTexture", extension.transmissionTexture, undefined).then(function (texture) {
        pbrMaterial.subSurface.thicknessTexture = texture;
        pbrMaterial.subSurface.useMaskFromThicknessTextureGltf = true;
      });
    } else {
      return Promise.resolve();
    }
  };

  return KHR_materials_transmission;
}();
GLTFLoader$1.RegisterExtension(NAME$c, function (loader) {
  return new KHR_materials_transmission(loader);
});

var NAME$d = "KHR_materials_translucency";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_materials_translucency = function () {
  /** @hidden */
  function KHR_materials_translucency(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$d;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 175;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$d);

    if (this.enabled) {
      loader.parent.transparencyAsCoverage = true;
    }
  }
  /** @hidden */


  KHR_materials_translucency.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_materials_translucency.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
      promises.push(_this._loadTranslucentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
      return Promise.all(promises).then(function () {});
    });
  };

  KHR_materials_translucency.prototype._loadTranslucentPropertiesAsync = function (context, material, babylonMaterial, extension) {
    if (!(babylonMaterial instanceof PBRMaterial)) {
      throw new Error(context + ": Material type not supported");
    }

    var pbrMaterial = babylonMaterial; // Enables "translucency" texture which represents diffusely-transmitted light.

    pbrMaterial.subSurface.isTranslucencyEnabled = true; // Since this extension models thin-surface transmission only, we must make the
    // internal IOR == 1.0 and set the thickness to 0.

    pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
    pbrMaterial.subSurface.minimumThickness = 0.0;
    pbrMaterial.subSurface.maximumThickness = 0.0; // Albedo colour will tint transmission.

    pbrMaterial.subSurface.useAlbedoToTintRefraction = true;

    if (extension.translucencyFactor !== undefined) {
      pbrMaterial.subSurface.translucencyIntensity = extension.translucencyFactor;
    } else {
      pbrMaterial.subSurface.translucencyIntensity = 0.0;
      pbrMaterial.subSurface.isTranslucencyEnabled = false;
      return Promise.resolve();
    }

    if (extension.translucencyTexture) {
      return this._loader.loadTextureInfoAsync(context + "/translucencyTexture", extension.translucencyTexture).then(function (texture) {
        pbrMaterial.subSurface.thicknessTexture = texture;
        pbrMaterial.subSurface.useMaskFromThicknessTextureGltf = true;
      });
    } else {
      return Promise.resolve();
    }
  };

  return KHR_materials_translucency;
}();
GLTFLoader$1.RegisterExtension(NAME$d, function (loader) {
  return new KHR_materials_translucency(loader);
});

var NAME$e = "KHR_mesh_quantization";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization)
 */

var KHR_mesh_quantization = function () {
  /** @hidden */
  function KHR_mesh_quantization(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$e;
    this.enabled = loader.isExtensionUsed(NAME$e);
  }
  /** @hidden */


  KHR_mesh_quantization.prototype.dispose = function () {};

  return KHR_mesh_quantization;
}();
GLTFLoader$1.RegisterExtension(NAME$e, function (loader) {
  return new KHR_mesh_quantization(loader);
});

var NAME$f = "KHR_texture_basisu";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1751)
 * !!! Experimental Extension Subject to Changes !!!
 */

var KHR_texture_basisu = function () {
  /** @hidden */
  function KHR_texture_basisu(loader) {
    /** The name of this extension. */
    this.name = NAME$f;
    this._loader = loader;
    this.enabled = loader.isExtensionUsed(NAME$f);
  }
  /** @hidden */


  KHR_texture_basisu.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_texture_basisu.prototype._loadTextureAsync = function (context, texture, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, texture, this.name, function (extensionContext, extension) {
      var sampler = texture.sampler == undefined ? GLTFLoader$1.DefaultSampler : ArrayItem.Get(context + "/sampler", _this._loader.gltf.samplers, texture.sampler);
      var image = ArrayItem.Get(extensionContext + "/source", _this._loader.gltf.images, extension.source);
      return _this._loader._createTextureAsync(context, sampler, image, function (babylonTexture) {
        assign(babylonTexture);
      }, texture._textureInfo.nonColorData ? {
        useRGBAIfASTCBC7NotAvailableWhenUASTC: true
      } : undefined);
    });
  };

  return KHR_texture_basisu;
}();
GLTFLoader$1.RegisterExtension(NAME$f, function (loader) {
  return new KHR_texture_basisu(loader);
});

var NAME$g = "KHR_texture_transform";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_texture_transform)
 */

var KHR_texture_transform = function () {
  /** @hidden */
  function KHR_texture_transform(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$g;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$g);
  }
  /** @hidden */


  KHR_texture_transform.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  KHR_texture_transform.prototype.loadTextureInfoAsync = function (context, textureInfo, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, textureInfo, this.name, function (extensionContext, extension) {
      return _this._loader.loadTextureInfoAsync(context, textureInfo, function (babylonTexture) {
        if (!(babylonTexture instanceof Texture)) {
          throw new Error(extensionContext + ": Texture type not supported");
        }

        if (extension.offset) {
          babylonTexture.uOffset = extension.offset[0];
          babylonTexture.vOffset = extension.offset[1];
        } // Always rotate around the origin.


        babylonTexture.uRotationCenter = 0;
        babylonTexture.vRotationCenter = 0;

        if (extension.rotation) {
          babylonTexture.wAng = -extension.rotation;
        }

        if (extension.scale) {
          babylonTexture.uScale = extension.scale[0];
          babylonTexture.vScale = extension.scale[1];
        }

        if (extension.texCoord != undefined) {
          babylonTexture.coordinatesIndex = extension.texCoord;
        }

        assign(babylonTexture);
      });
    });
  };

  return KHR_texture_transform;
}();
GLTFLoader$1.RegisterExtension(NAME$g, function (loader) {
  return new KHR_texture_transform(loader);
});

var NAME$h = "MSFT_audio_emitter";
/**
 * [Specification](https://github.com/najadojo/glTF/tree/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter)
 */

var MSFT_audio_emitter = function () {
  /** @hidden */
  function MSFT_audio_emitter(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$h;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$h);
  }
  /** @hidden */


  MSFT_audio_emitter.prototype.dispose = function () {
    this._loader = null;
    this._clips = null;
    this._emitters = null;
  };
  /** @hidden */


  MSFT_audio_emitter.prototype.onLoading = function () {
    var extensions = this._loader.gltf.extensions;

    if (extensions && extensions[this.name]) {
      var extension = extensions[this.name];
      this._clips = extension.clips;
      this._emitters = extension.emitters;
      ArrayItem.Assign(this._clips);
      ArrayItem.Assign(this._emitters);
    }
  };
  /** @hidden */


  MSFT_audio_emitter.prototype.loadSceneAsync = function (context, scene) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, scene, this.name, function (extensionContext, extension) {
      var promises = new Array();
      promises.push(_this._loader.loadSceneAsync(context, scene));

      for (var _i = 0, _a = extension.emitters; _i < _a.length; _i++) {
        var emitterIndex = _a[_i];
        var emitter = ArrayItem.Get(extensionContext + "/emitters", _this._emitters, emitterIndex);

        if (emitter.refDistance != undefined || emitter.maxDistance != undefined || emitter.rolloffFactor != undefined || emitter.distanceModel != undefined || emitter.innerAngle != undefined || emitter.outerAngle != undefined) {
          throw new Error(extensionContext + ": Direction or Distance properties are not allowed on emitters attached to a scene");
        }

        promises.push(_this._loadEmitterAsync(extensionContext + "/emitters/" + emitter.index, emitter));
      }

      return Promise.all(promises).then(function () {});
    });
  };
  /** @hidden */


  MSFT_audio_emitter.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
      var promises = new Array();
      return _this._loader.loadNodeAsync(extensionContext, node, function (babylonMesh) {
        var _loop_1 = function (emitterIndex) {
          var emitter = ArrayItem.Get(extensionContext + "/emitters", _this._emitters, emitterIndex);
          promises.push(_this._loadEmitterAsync(extensionContext + "/emitters/" + emitter.index, emitter).then(function () {
            for (var _i = 0, _a = emitter._babylonSounds; _i < _a.length; _i++) {
              var sound = _a[_i];
              sound.attachToMesh(babylonMesh);

              if (emitter.innerAngle != undefined || emitter.outerAngle != undefined) {
                sound.setLocalDirectionToMesh(Vector3.Forward());
                sound.setDirectionalCone(2 * Tools.ToDegrees(emitter.innerAngle == undefined ? Math.PI : emitter.innerAngle), 2 * Tools.ToDegrees(emitter.outerAngle == undefined ? Math.PI : emitter.outerAngle), 0);
              }
            }
          }));
        };

        for (var _i = 0, _a = extension.emitters; _i < _a.length; _i++) {
          var emitterIndex = _a[_i];

          _loop_1(emitterIndex);
        }

        assign(babylonMesh);
      }).then(function (babylonMesh) {
        return Promise.all(promises).then(function () {
          return babylonMesh;
        });
      });
    });
  };
  /** @hidden */


  MSFT_audio_emitter.prototype.loadAnimationAsync = function (context, animation) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, animation, this.name, function (extensionContext, extension) {
      return _this._loader.loadAnimationAsync(context, animation).then(function (babylonAnimationGroup) {
        var promises = new Array();
        ArrayItem.Assign(extension.events);

        for (var _i = 0, _a = extension.events; _i < _a.length; _i++) {
          var event_1 = _a[_i];
          promises.push(_this._loadAnimationEventAsync(extensionContext + "/events/" + event_1.index, context, animation, event_1, babylonAnimationGroup));
        }

        return Promise.all(promises).then(function () {
          return babylonAnimationGroup;
        });
      });
    });
  };

  MSFT_audio_emitter.prototype._loadClipAsync = function (context, clip) {
    if (clip._objectURL) {
      return clip._objectURL;
    }

    var promise;

    if (clip.uri) {
      promise = this._loader.loadUriAsync(context, clip, clip.uri);
    } else {
      var bufferView = ArrayItem.Get(context + "/bufferView", this._loader.gltf.bufferViews, clip.bufferView);
      promise = this._loader.loadBufferViewAsync("/bufferViews/" + bufferView.index, bufferView);
    }

    clip._objectURL = promise.then(function (data) {
      return URL.createObjectURL(new Blob([data], {
        type: clip.mimeType
      }));
    });
    return clip._objectURL;
  };

  MSFT_audio_emitter.prototype._loadEmitterAsync = function (context, emitter) {
    var _this = this;

    emitter._babylonSounds = emitter._babylonSounds || [];

    if (!emitter._babylonData) {
      var clipPromises = new Array();
      var name_1 = emitter.name || "emitter" + emitter.index;
      var options_1 = {
        loop: false,
        autoplay: false,
        volume: emitter.volume == undefined ? 1 : emitter.volume
      };

      var _loop_2 = function (i) {
        var clipContext = "/extensions/" + this_1.name + "/clips";
        var clip = ArrayItem.Get(clipContext, this_1._clips, emitter.clips[i].clip);
        clipPromises.push(this_1._loadClipAsync(clipContext + "/" + emitter.clips[i].clip, clip).then(function (objectURL) {
          var sound = emitter._babylonSounds[i] = new Sound(name_1, objectURL, _this._loader.babylonScene, null, options_1);
          sound.refDistance = emitter.refDistance || 1;
          sound.maxDistance = emitter.maxDistance || 256;
          sound.rolloffFactor = emitter.rolloffFactor || 1;
          sound.distanceModel = emitter.distanceModel || 'exponential';
          sound._positionInEmitterSpace = true;
        }));
      };

      var this_1 = this;

      for (var i = 0; i < emitter.clips.length; i++) {
        _loop_2(i);
      }

      var promise = Promise.all(clipPromises).then(function () {
        var weights = emitter.clips.map(function (clip) {
          return clip.weight || 1;
        });
        var weightedSound = new WeightedSound(emitter.loop || false, emitter._babylonSounds, weights);

        if (emitter.innerAngle) {
          weightedSound.directionalConeInnerAngle = 2 * Tools.ToDegrees(emitter.innerAngle);
        }

        if (emitter.outerAngle) {
          weightedSound.directionalConeOuterAngle = 2 * Tools.ToDegrees(emitter.outerAngle);
        }

        if (emitter.volume) {
          weightedSound.volume = emitter.volume;
        }

        emitter._babylonData.sound = weightedSound;
      });
      emitter._babylonData = {
        loaded: promise
      };
    }

    return emitter._babylonData.loaded;
  };

  MSFT_audio_emitter.prototype._getEventAction = function (context, sound, action, time, startOffset) {
    switch (action) {
      case "play"
      /* play */
      :
        {
          return function (currentFrame) {
            var frameOffset = (startOffset || 0) + (currentFrame - time);
            sound.play(frameOffset);
          };
        }

      case "stop"
      /* stop */
      :
        {
          return function (currentFrame) {
            sound.stop();
          };
        }

      case "pause"
      /* pause */
      :
        {
          return function (currentFrame) {
            sound.pause();
          };
        }

      default:
        {
          throw new Error(context + ": Unsupported action " + action);
        }
    }
  };

  MSFT_audio_emitter.prototype._loadAnimationEventAsync = function (context, animationContext, animation, event, babylonAnimationGroup) {
    var _this = this;

    if (babylonAnimationGroup.targetedAnimations.length == 0) {
      return Promise.resolve();
    }

    var babylonAnimation = babylonAnimationGroup.targetedAnimations[0];
    var emitterIndex = event.emitter;
    var emitter = ArrayItem.Get("/extensions/" + this.name + "/emitters", this._emitters, emitterIndex);
    return this._loadEmitterAsync(context, emitter).then(function () {
      var sound = emitter._babylonData.sound;

      if (sound) {
        var babylonAnimationEvent = new AnimationEvent(event.time, _this._getEventAction(context, sound, event.action, event.time, event.startOffset));
        babylonAnimation.animation.addEvent(babylonAnimationEvent); // Make sure all started audio stops when this animation is terminated.

        babylonAnimationGroup.onAnimationGroupEndObservable.add(function () {
          sound.stop();
        });
        babylonAnimationGroup.onAnimationGroupPauseObservable.add(function () {
          sound.pause();
        });
      }
    });
  };

  return MSFT_audio_emitter;
}();
GLTFLoader$1.RegisterExtension(NAME$h, function (loader) {
  return new MSFT_audio_emitter(loader);
});

var NAME$i = "MSFT_lod";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_lod)
 */

var MSFT_lod = function () {
  /** @hidden */
  function MSFT_lod(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$i;
    /**
     * Defines a number that determines the order the extensions are applied.
     */

    this.order = 100;
    /**
     * Maximum number of LODs to load, starting from the lowest LOD.
     */

    this.maxLODsToLoad = 10;
    /**
     * Observable raised when all node LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */

    this.onNodeLODsLoadedObservable = new Observable();
    /**
     * Observable raised when all material LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */

    this.onMaterialLODsLoadedObservable = new Observable();
    this._bufferLODs = new Array();
    this._nodeIndexLOD = null;
    this._nodeSignalLODs = new Array();
    this._nodePromiseLODs = new Array();
    this._nodeBufferLODs = new Array();
    this._materialIndexLOD = null;
    this._materialSignalLODs = new Array();
    this._materialPromiseLODs = new Array();
    this._materialBufferLODs = new Array();
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$i);
  }
  /** @hidden */


  MSFT_lod.prototype.dispose = function () {
    this._loader = null;
    this._nodeIndexLOD = null;
    this._nodeSignalLODs.length = 0;
    this._nodePromiseLODs.length = 0;
    this._nodeBufferLODs.length = 0;
    this._materialIndexLOD = null;
    this._materialSignalLODs.length = 0;
    this._materialPromiseLODs.length = 0;
    this._materialBufferLODs.length = 0;
    this.onMaterialLODsLoadedObservable.clear();
    this.onNodeLODsLoadedObservable.clear();
  };
  /** @hidden */


  MSFT_lod.prototype.onReady = function () {
    var _this = this;

    var _loop_1 = function (indexLOD) {
      var promise = Promise.all(this_1._nodePromiseLODs[indexLOD]).then(function () {
        if (indexLOD !== 0) {
          _this._loader.endPerformanceCounter("Node LOD " + indexLOD);

          _this._loader.log("Loaded node LOD " + indexLOD);
        }

        _this.onNodeLODsLoadedObservable.notifyObservers(indexLOD);

        if (indexLOD !== _this._nodePromiseLODs.length - 1) {
          _this._loader.startPerformanceCounter("Node LOD " + (indexLOD + 1));

          _this._loadBufferLOD(_this._nodeBufferLODs, indexLOD + 1);

          if (_this._nodeSignalLODs[indexLOD]) {
            _this._nodeSignalLODs[indexLOD].resolve();
          }
        }
      });

      this_1._loader._completePromises.push(promise);
    };

    var this_1 = this;

    for (var indexLOD = 0; indexLOD < this._nodePromiseLODs.length; indexLOD++) {
      _loop_1(indexLOD);
    }

    var _loop_2 = function (indexLOD) {
      var promise = Promise.all(this_2._materialPromiseLODs[indexLOD]).then(function () {
        if (indexLOD !== 0) {
          _this._loader.endPerformanceCounter("Material LOD " + indexLOD);

          _this._loader.log("Loaded material LOD " + indexLOD);
        }

        _this.onMaterialLODsLoadedObservable.notifyObservers(indexLOD);

        if (indexLOD !== _this._materialPromiseLODs.length - 1) {
          _this._loader.startPerformanceCounter("Material LOD " + (indexLOD + 1));

          _this._loadBufferLOD(_this._materialBufferLODs, indexLOD + 1);

          if (_this._materialSignalLODs[indexLOD]) {
            _this._materialSignalLODs[indexLOD].resolve();
          }
        }
      });

      this_2._loader._completePromises.push(promise);
    };

    var this_2 = this;

    for (var indexLOD = 0; indexLOD < this._materialPromiseLODs.length; indexLOD++) {
      _loop_2(indexLOD);
    }
  };
  /** @hidden */


  MSFT_lod.prototype.loadSceneAsync = function (context, scene) {
    var promise = this._loader.loadSceneAsync(context, scene);

    this._loadBufferLOD(this._bufferLODs, 0);

    return promise;
  };
  /** @hidden */


  MSFT_lod.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    return GLTFLoader$1.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
      var firstPromise;

      var nodeLODs = _this._getLODs(extensionContext, node, _this._loader.gltf.nodes, extension.ids);

      _this._loader.logOpen("" + extensionContext);

      var _loop_3 = function (indexLOD) {
        var nodeLOD = nodeLODs[indexLOD];

        if (indexLOD !== 0) {
          _this._nodeIndexLOD = indexLOD;
          _this._nodeSignalLODs[indexLOD] = _this._nodeSignalLODs[indexLOD] || new Deferred();
        }

        var assign_1 = function (babylonTransformNode) {
          babylonTransformNode.setEnabled(false);
        };

        var promise = _this._loader.loadNodeAsync("/nodes/" + nodeLOD.index, nodeLOD, assign_1).then(function (babylonMesh) {
          if (indexLOD !== 0) {
            // TODO: should not rely on _babylonTransformNode
            var previousNodeLOD = nodeLODs[indexLOD - 1];

            if (previousNodeLOD._babylonTransformNode) {
              _this._disposeTransformNode(previousNodeLOD._babylonTransformNode);

              delete previousNodeLOD._babylonTransformNode;
            }
          }

          babylonMesh.setEnabled(true);
          return babylonMesh;
        });

        _this._nodePromiseLODs[indexLOD] = _this._nodePromiseLODs[indexLOD] || [];

        if (indexLOD === 0) {
          firstPromise = promise;
        } else {
          _this._nodeIndexLOD = null;

          _this._nodePromiseLODs[indexLOD].push(promise);
        }
      };

      for (var indexLOD = 0; indexLOD < nodeLODs.length; indexLOD++) {
        _loop_3(indexLOD);
      }

      _this._loader.logClose();

      return firstPromise;
    });
  };
  /** @hidden */


  MSFT_lod.prototype._loadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
    var _this = this; // Don't load material LODs if already loading a node LOD.


    if (this._nodeIndexLOD) {
      return null;
    }

    return GLTFLoader$1.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
      var firstPromise;

      var materialLODs = _this._getLODs(extensionContext, material, _this._loader.gltf.materials, extension.ids);

      _this._loader.logOpen("" + extensionContext);

      var _loop_4 = function (indexLOD) {
        var materialLOD = materialLODs[indexLOD];

        if (indexLOD !== 0) {
          _this._materialIndexLOD = indexLOD;
        }

        var promise = _this._loader._loadMaterialAsync("/materials/" + materialLOD.index, materialLOD, babylonMesh, babylonDrawMode, function (babylonMaterial) {
          if (indexLOD === 0) {
            assign(babylonMaterial);
          }
        }).then(function (babylonMaterial) {
          if (indexLOD !== 0) {
            assign(babylonMaterial); // TODO: should not rely on _data

            var previousDataLOD = materialLODs[indexLOD - 1]._data;

            if (previousDataLOD[babylonDrawMode]) {
              _this._disposeMaterials([previousDataLOD[babylonDrawMode].babylonMaterial]);

              delete previousDataLOD[babylonDrawMode];
            }
          }

          return babylonMaterial;
        });

        _this._materialPromiseLODs[indexLOD] = _this._materialPromiseLODs[indexLOD] || [];

        if (indexLOD === 0) {
          firstPromise = promise;
        } else {
          _this._materialIndexLOD = null;

          _this._materialPromiseLODs[indexLOD].push(promise);
        }
      };

      for (var indexLOD = 0; indexLOD < materialLODs.length; indexLOD++) {
        _loop_4(indexLOD);
      }

      _this._loader.logClose();

      return firstPromise;
    });
  };
  /** @hidden */


  MSFT_lod.prototype._loadUriAsync = function (context, property, uri) {
    var _this = this; // Defer the loading of uris if loading a node or material LOD.


    if (this._nodeIndexLOD !== null) {
      this._loader.log("deferred");

      var previousIndexLOD = this._nodeIndexLOD - 1;
      this._nodeSignalLODs[previousIndexLOD] = this._nodeSignalLODs[previousIndexLOD] || new Deferred();
      return this._nodeSignalLODs[this._nodeIndexLOD - 1].promise.then(function () {
        return _this._loader.loadUriAsync(context, property, uri);
      });
    } else if (this._materialIndexLOD !== null) {
      this._loader.log("deferred");

      var previousIndexLOD = this._materialIndexLOD - 1;
      this._materialSignalLODs[previousIndexLOD] = this._materialSignalLODs[previousIndexLOD] || new Deferred();
      return this._materialSignalLODs[previousIndexLOD].promise.then(function () {
        return _this._loader.loadUriAsync(context, property, uri);
      });
    }

    return null;
  };
  /** @hidden */


  MSFT_lod.prototype.loadBufferAsync = function (context, buffer, byteOffset, byteLength) {
    if (this._loader.parent.useRangeRequests && !buffer.uri) {
      if (!this._loader.bin) {
        throw new Error(context + ": Uri is missing or the binary glTF is missing its binary chunk");
      }

      var loadAsync = function (bufferLODs, indexLOD) {
        var start = byteOffset;
        var end = start + byteLength - 1;
        var bufferLOD = bufferLODs[indexLOD];

        if (bufferLOD) {
          bufferLOD.start = Math.min(bufferLOD.start, start);
          bufferLOD.end = Math.max(bufferLOD.end, end);
        } else {
          bufferLOD = {
            start: start,
            end: end,
            loaded: new Deferred()
          };
          bufferLODs[indexLOD] = bufferLOD;
        }

        return bufferLOD.loaded.promise.then(function (data) {
          return new Uint8Array(data.buffer, data.byteOffset + byteOffset - bufferLOD.start, byteLength);
        });
      };

      this._loader.log("deferred");

      if (this._nodeIndexLOD !== null) {
        return loadAsync(this._nodeBufferLODs, this._nodeIndexLOD);
      } else if (this._materialIndexLOD !== null) {
        return loadAsync(this._materialBufferLODs, this._materialIndexLOD);
      } else {
        return loadAsync(this._bufferLODs, 0);
      }
    }

    return null;
  };

  MSFT_lod.prototype._loadBufferLOD = function (bufferLODs, indexLOD) {
    var bufferLOD = bufferLODs[indexLOD];

    if (bufferLOD) {
      this._loader.log("Loading buffer range [" + bufferLOD.start + "-" + bufferLOD.end + "]");

      this._loader.bin.readAsync(bufferLOD.start, bufferLOD.end - bufferLOD.start + 1).then(function (data) {
        bufferLOD.loaded.resolve(data);
      }, function (error) {
        bufferLOD.loaded.reject(error);
      });
    }
  };
  /**
   * Gets an array of LOD properties from lowest to highest.
   */


  MSFT_lod.prototype._getLODs = function (context, property, array, ids) {
    if (this.maxLODsToLoad <= 0) {
      throw new Error("maxLODsToLoad must be greater than zero");
    }

    var properties = new Array();

    for (var i = ids.length - 1; i >= 0; i--) {
      properties.push(ArrayItem.Get(context + "/ids/" + ids[i], array, ids[i]));

      if (properties.length === this.maxLODsToLoad) {
        return properties;
      }
    }

    properties.push(property);
    return properties;
  };

  MSFT_lod.prototype._disposeTransformNode = function (babylonTransformNode) {
    var _this = this;

    var babylonMaterials = new Array();
    var babylonMaterial = babylonTransformNode.material;

    if (babylonMaterial) {
      babylonMaterials.push(babylonMaterial);
    }

    for (var _i = 0, _a = babylonTransformNode.getChildMeshes(); _i < _a.length; _i++) {
      var babylonMesh = _a[_i];

      if (babylonMesh.material) {
        babylonMaterials.push(babylonMesh.material);
      }
    }

    babylonTransformNode.dispose();
    var babylonMaterialsToDispose = babylonMaterials.filter(function (babylonMaterial) {
      return _this._loader.babylonScene.meshes.every(function (mesh) {
        return mesh.material != babylonMaterial;
      });
    });

    this._disposeMaterials(babylonMaterialsToDispose);
  };

  MSFT_lod.prototype._disposeMaterials = function (babylonMaterials) {
    var babylonTextures = {};

    for (var _i = 0, babylonMaterials_1 = babylonMaterials; _i < babylonMaterials_1.length; _i++) {
      var babylonMaterial = babylonMaterials_1[_i];

      for (var _a = 0, _b = babylonMaterial.getActiveTextures(); _a < _b.length; _a++) {
        var babylonTexture = _b[_a];
        babylonTextures[babylonTexture.uniqueId] = babylonTexture;
      }

      babylonMaterial.dispose();
    }

    for (var uniqueId in babylonTextures) {
      for (var _c = 0, _d = this._loader.babylonScene.materials; _c < _d.length; _c++) {
        var babylonMaterial = _d[_c];

        if (babylonMaterial.hasTexture(babylonTextures[uniqueId])) {
          delete babylonTextures[uniqueId];
        }
      }
    }

    for (var uniqueId in babylonTextures) {
      babylonTextures[uniqueId].dispose();
    }
  };

  return MSFT_lod;
}();
GLTFLoader$1.RegisterExtension(NAME$i, function (loader) {
  return new MSFT_lod(loader);
});

var NAME$j = "MSFT_minecraftMesh";
/** @hidden */

var MSFT_minecraftMesh = function () {
  function MSFT_minecraftMesh(loader) {
    this.name = NAME$j;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$j);
  }

  MSFT_minecraftMesh.prototype.dispose = function () {
    this._loader = null;
  };

  MSFT_minecraftMesh.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtraAsync(context, material, this.name, function (extraContext, extra) {
      if (extra) {
        if (!(babylonMaterial instanceof PBRMaterial)) {
          throw new Error(extraContext + ": Material type not supported");
        }

        var promise = _this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);

        if (babylonMaterial.needAlphaBlending()) {
          babylonMaterial.forceDepthWrite = true;
          babylonMaterial.separateCullingPass = true;
        }

        babylonMaterial.backFaceCulling = babylonMaterial.forceDepthWrite;
        babylonMaterial.twoSidedLighting = true;
        return promise;
      }

      return null;
    });
  };

  return MSFT_minecraftMesh;
}();
GLTFLoader$1.RegisterExtension(NAME$j, function (loader) {
  return new MSFT_minecraftMesh(loader);
});

var NAME$k = "MSFT_sRGBFactors";
/** @hidden */

var MSFT_sRGBFactors = function () {
  function MSFT_sRGBFactors(loader) {
    this.name = NAME$k;
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(NAME$k);
  }

  MSFT_sRGBFactors.prototype.dispose = function () {
    this._loader = null;
  };

  MSFT_sRGBFactors.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
    var _this = this;

    return GLTFLoader$1.LoadExtraAsync(context, material, this.name, function (extraContext, extra) {
      if (extra) {
        if (!(babylonMaterial instanceof PBRMaterial)) {
          throw new Error(extraContext + ": Material type not supported");
        }

        var promise = _this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);

        if (!babylonMaterial.albedoTexture) {
          babylonMaterial.albedoColor.toLinearSpaceToRef(babylonMaterial.albedoColor);
        }

        if (!babylonMaterial.reflectivityTexture) {
          babylonMaterial.reflectivityColor.toLinearSpaceToRef(babylonMaterial.reflectivityColor);
        }

        return promise;
      }

      return null;
    });
  };

  return MSFT_sRGBFactors;
}();
GLTFLoader$1.RegisterExtension(NAME$k, function (loader) {
  return new MSFT_sRGBFactors(loader);
});

var NAME$l = "ExtrasAsMetadata";
/**
 * Store glTF extras (if present) in BJS objects' metadata
 */

var ExtrasAsMetadata = function () {
  /** @hidden */
  function ExtrasAsMetadata(loader) {
    /**
     * The name of this extension.
     */
    this.name = NAME$l;
    /**
     * Defines whether this extension is enabled.
     */

    this.enabled = true;
    this._loader = loader;
  }

  ExtrasAsMetadata.prototype._assignExtras = function (babylonObject, gltfProp) {
    if (gltfProp.extras && Object.keys(gltfProp.extras).length > 0) {
      var metadata = babylonObject.metadata = babylonObject.metadata || {};
      var gltf = metadata.gltf = metadata.gltf || {};
      gltf.extras = gltfProp.extras;
    }
  };
  /** @hidden */


  ExtrasAsMetadata.prototype.dispose = function () {
    this._loader = null;
  };
  /** @hidden */


  ExtrasAsMetadata.prototype.loadNodeAsync = function (context, node, assign) {
    var _this = this;

    return this._loader.loadNodeAsync(context, node, function (babylonTransformNode) {
      _this._assignExtras(babylonTransformNode, node);

      assign(babylonTransformNode);
    });
  };
  /** @hidden */


  ExtrasAsMetadata.prototype.loadCameraAsync = function (context, camera, assign) {
    var _this = this;

    return this._loader.loadCameraAsync(context, camera, function (babylonCamera) {
      _this._assignExtras(babylonCamera, camera);

      assign(babylonCamera);
    });
  };
  /** @hidden */


  ExtrasAsMetadata.prototype.createMaterial = function (context, material, babylonDrawMode) {
    var babylonMaterial = this._loader.createMaterial(context, material, babylonDrawMode);

    this._assignExtras(babylonMaterial, material);

    return babylonMaterial;
  };

  return ExtrasAsMetadata;
}();
GLTFLoader$1.RegisterExtension(NAME$l, function (loader) {
  return new ExtrasAsMetadata(loader);
});

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArrayItem: ArrayItem,
  GLTFLoader: GLTFLoader$1,
  EXT_lights_image_based: EXT_lights_image_based,
  EXT_mesh_gpu_instancing: EXT_mesh_gpu_instancing,
  EXT_texture_webp: EXT_texture_webp,
  KHR_draco_mesh_compression: KHR_draco_mesh_compression,
  KHR_lights: KHR_lights,
  KHR_materials_pbrSpecularGlossiness: KHR_materials_pbrSpecularGlossiness,
  KHR_materials_unlit: KHR_materials_unlit,
  KHR_materials_clearcoat: KHR_materials_clearcoat,
  KHR_materials_sheen: KHR_materials_sheen,
  KHR_materials_specular: KHR_materials_specular,
  KHR_materials_ior: KHR_materials_ior,
  KHR_materials_variants: KHR_materials_variants,
  KHR_materials_transmission: KHR_materials_transmission,
  KHR_materials_translucency: KHR_materials_translucency,
  KHR_mesh_quantization: KHR_mesh_quantization,
  KHR_texture_basisu: KHR_texture_basisu,
  KHR_texture_transform: KHR_texture_transform,
  MSFT_audio_emitter: MSFT_audio_emitter,
  MSFT_lod: MSFT_lod,
  MSFT_minecraftMesh: MSFT_minecraftMesh,
  MSFT_sRGBFactors: MSFT_sRGBFactors,
  ExtrasAsMetadata: ExtrasAsMetadata
});

export { index as GLTF1, index$1 as GLTF2, GLTFFileLoader, GLTFLoaderAnimationStartMode, GLTFLoaderCoordinateSystemMode, GLTFLoaderState, GLTFValidation };
