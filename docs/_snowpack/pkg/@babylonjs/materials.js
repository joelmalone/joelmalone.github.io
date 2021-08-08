import { B as Effect, c as __extends, ai as MaterialFlags, a9 as MaterialHelper, a0 as VertexBuffer, i as Scene, F as SerializationHelper, s as __decorate, al as serializeAsTexture, ak as expandToProperty, aj as serializeAsColor3, t as serialize, an as PushMaterial, _ as _TypeStore, ao as MaterialDefines, C as Color3, aq as EffectFallbacks, a2 as StandardMaterial, ax as PBRMaterial, bx as Tags, J as Texture, a as Vector3, x as serializeAsVector3, d as Vector4, $ as ImageProcessingConfiguration, U as RenderTargetTexture, a$ as Constants, M as Matrix, a3 as Plane, o as Mesh, ah as serializeAsVector2, V as Vector2, ap as SmartArray } from '../common/pbrMaterial-e2c29195.js';
import { D as DynamicTexture } from '../common/imageProcessingCompatibility-dc363e89.js';

var name$1 = 'cellPixelShader';
var shader = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\n\nvec3 computeCustomDiffuseLighting(lightingInfo info,vec3 diffuseBase,float shadow)\n{\ndiffuseBase=info.diffuse*shadow;\n#ifdef CELLBASIC\nfloat level=1.0;\nif (info.ndl<0.5)\nlevel=0.5;\ndiffuseBase.rgb*vec3(level,level,level);\n#else\nfloat ToonThresholds[4];\nToonThresholds[0]=0.95;\nToonThresholds[1]=0.5;\nToonThresholds[2]=0.2;\nToonThresholds[3]=0.03;\nfloat ToonBrightnessLevels[5];\nToonBrightnessLevels[0]=1.0;\nToonBrightnessLevels[1]=0.8;\nToonBrightnessLevels[2]=0.6;\nToonBrightnessLevels[3]=0.35;\nToonBrightnessLevels[4]=0.2;\nif (info.ndl>ToonThresholds[0])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[0];\n}\nelse if (info.ndl>ToonThresholds[1])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[1];\n}\nelse if (info.ndl>ToonThresholds[2])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[2];\n}\nelse if (info.ndl>ToonThresholds[3])\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[3];\n}\nelse\n{\ndiffuseBase.rgb*=ToonBrightnessLevels[4];\n}\n#endif\nreturn max(diffuseBase,vec3(0.2));\n}\nvoid main(void)\n{\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nlightingInfo info;\nvec3 diffuseBase=vec3(0.,0.,0.);\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$1] = shader;

var name$2 = 'cellVertexShader';
var shader$1 = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$2] = shader$1;

var CellMaterialDefines = function (_super) {
  __extends(CellMaterialDefines, _super);

  function CellMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.NDOTL = true;
    _this.CUSTOMUSERLIGHTING = true;
    _this.CELLBASIC = true;
    _this.DEPTHPREPASS = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return CellMaterialDefines;
}(MaterialDefines);

var CellMaterial = function (_super) {
  __extends(CellMaterial, _super);

  function CellMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this._computeHighLevel = false;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  CellMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  CellMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  CellMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  CellMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new CellMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
          if (!this._diffuseTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.DIFFUSE = true;
          }
        }
      }
    } // High level


    defines.CELLBASIC = !this.computeHighLevel; // Misc.

    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines);
      var shaderName = "cell";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix"];
      var samplers = ["diffuseSampler"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights - 1
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  CellMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility); // Lights


    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this._maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  CellMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0) {
      results.push(this._diffuseTexture);
    }

    return results;
  };

  CellMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    return activeTextures;
  };

  CellMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    return this._diffuseTexture === texture;
  };

  CellMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this._diffuseTexture) {
      this._diffuseTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  CellMaterial.prototype.getClassName = function () {
    return "CellMaterial";
  };

  CellMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new CellMaterial(name, _this.getScene());
    }, this);
  };

  CellMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.CellMaterial";
    return serializationObject;
  }; // Statics


  CellMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new CellMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("diffuseTexture")], CellMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], CellMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsColor3("diffuse")], CellMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize("computeHighLevel")], CellMaterial.prototype, "_computeHighLevel", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], CellMaterial.prototype, "computeHighLevel", void 0);

  __decorate([serialize("disableLighting")], CellMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], CellMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], CellMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], CellMaterial.prototype, "maxSimultaneousLights", void 0);

  return CellMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.CellMaterial"] = CellMaterial;

var ShaderSpecialParts = function () {
  function ShaderSpecialParts() {}

  return ShaderSpecialParts;
}();

var CustomMaterial = function (_super) {
  __extends(CustomMaterial, _super);

  function CustomMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.CustomParts = new ShaderSpecialParts();
    _this.customShaderNameResolve = _this.Builder;
    _this.FragmentShader = Effect.ShadersStore["defaultPixelShader"];
    _this.VertexShader = Effect.ShadersStore["defaultVertexShader"];
    return _this;
  }

  CustomMaterial.prototype.AttachAfterBind = function (mesh, effect) {
    if (this._newUniformInstances) {
      for (var el in this._newUniformInstances) {
        var ea = el.toString().split('-');

        if (ea[0] == 'vec2') {
          effect.setVector2(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'vec3') {
          effect.setVector3(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'vec4') {
          effect.setVector4(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'mat4') {
          effect.setMatrix(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'float') {
          effect.setFloat(ea[1], this._newUniformInstances[el]);
        }
      }
    }

    if (this._newSamplerInstances) {
      for (var el in this._newSamplerInstances) {
        var ea = el.toString().split('-');

        if (ea[0] == 'sampler2D' && this._newSamplerInstances[el].isReady && this._newSamplerInstances[el].isReady()) {
          effect.setTexture(ea[1], this._newSamplerInstances[el]);
        }
      }
    }
  };

  CustomMaterial.prototype.ReviewUniform = function (name, arr) {
    if (name == "uniform" && this._newUniforms) {
      for (var ind = 0; ind < this._newUniforms.length; ind++) {
        if (this._customUniform[ind].indexOf('sampler') == -1) {
          arr.push(this._newUniforms[ind]);
        }
      }
    }

    if (name == "sampler" && this._newUniforms) {
      for (var ind = 0; ind < this._newUniforms.length; ind++) {
        if (this._customUniform[ind].indexOf('sampler') != -1) {
          arr.push(this._newUniforms[ind]);
        }
      }
    }

    return arr;
  };

  CustomMaterial.prototype.Builder = function (shaderName, uniforms, uniformBuffers, samplers, defines, attributes) {
    var _this = this;

    if (attributes && this._customAttributes && this._customAttributes.length > 0) {
      attributes.push.apply(attributes, this._customAttributes);
    }

    this.ReviewUniform("uniform", uniforms);
    this.ReviewUniform("sampler", samplers);

    if (this._isCreatedShader) {
      return this._createdShaderName;
    }

    this._isCreatedShader = false;
    CustomMaterial.ShaderIndexer++;
    var name = "custom_" + CustomMaterial.ShaderIndexer;

    var fn_afterBind = this._afterBind.bind(this);

    this._afterBind = function (m, e) {
      if (!e) {
        return;
      }

      _this.AttachAfterBind(m, e);

      try {
        fn_afterBind(m, e);
      } catch (e) {}
    };

    Effect.ShadersStore[name + "VertexShader"] = this.VertexShader.replace('#define CUSTOM_VERTEX_BEGIN', this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace('#define CUSTOM_VERTEX_DEFINITIONS', (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace('#define CUSTOM_VERTEX_MAIN_BEGIN', this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace('#define CUSTOM_VERTEX_UPDATE_POSITION', this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace('#define CUSTOM_VERTEX_UPDATE_NORMAL', this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace('#define CUSTOM_VERTEX_MAIN_END', this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : "");

    if (this.CustomParts.Vertex_After_WorldPosComputed) {
      Effect.ShadersStore[name + "VertexShader"] = Effect.ShadersStore[name + "VertexShader"].replace('#define CUSTOM_VERTEX_UPDATE_WORLDPOS', this.CustomParts.Vertex_After_WorldPosComputed);
    }

    Effect.ShadersStore[name + "PixelShader"] = this.FragmentShader.replace('#define CUSTOM_FRAGMENT_BEGIN', this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace('#define CUSTOM_FRAGMENT_MAIN_BEGIN', this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace('#define CUSTOM_FRAGMENT_DEFINITIONS', (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace('#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE', this.CustomParts.Fragment_Custom_Diffuse ? this.CustomParts.Fragment_Custom_Diffuse : "").replace('#define CUSTOM_FRAGMENT_UPDATE_ALPHA', this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace('#define CUSTOM_FRAGMENT_BEFORE_LIGHTS', this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace('#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR', this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "");

    if (this.CustomParts.Fragment_Before_Fog) {
      Effect.ShadersStore[name + "PixelShader"] = Effect.ShadersStore[name + "PixelShader"].replace('#define CUSTOM_FRAGMENT_BEFORE_FOG', this.CustomParts.Fragment_Before_Fog);
    }

    this._isCreatedShader = true;
    this._createdShaderName = name;
    return name;
  };

  CustomMaterial.prototype.AddUniform = function (name, kind, param) {
    if (!this._customUniform) {
      this._customUniform = new Array();
      this._newUniforms = new Array();
      this._newSamplerInstances = {};
      this._newUniformInstances = {};
    }

    if (param) {
      if (kind.indexOf("sampler") != -1) {
        this._newSamplerInstances[kind + "-" + name] = param;
      } else {
        this._newUniformInstances[kind + "-" + name] = param;
      }
    }

    this._customUniform.push("uniform " + kind + " " + name + ";");

    this._newUniforms.push(name);

    return this;
  };

  CustomMaterial.prototype.AddAttribute = function (name) {
    if (!this._customAttributes) {
      this._customAttributes = [];
    }

    this._customAttributes.push(name);

    return this;
  };

  CustomMaterial.prototype.Fragment_Begin = function (shaderPart) {
    this.CustomParts.Fragment_Begin = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Fragment_Definitions = function (shaderPart) {
    this.CustomParts.Fragment_Definitions = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Fragment_MainBegin = function (shaderPart) {
    this.CustomParts.Fragment_MainBegin = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Fragment_Custom_Diffuse = function (shaderPart) {
    this.CustomParts.Fragment_Custom_Diffuse = shaderPart.replace("result", "diffuseColor");
    return this;
  };

  CustomMaterial.prototype.Fragment_Custom_Alpha = function (shaderPart) {
    this.CustomParts.Fragment_Custom_Alpha = shaderPart.replace("result", "alpha");
    return this;
  };

  CustomMaterial.prototype.Fragment_Before_Lights = function (shaderPart) {
    this.CustomParts.Fragment_Before_Lights = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Fragment_Before_Fog = function (shaderPart) {
    this.CustomParts.Fragment_Before_Fog = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Fragment_Before_FragColor = function (shaderPart) {
    this.CustomParts.Fragment_Before_FragColor = shaderPart.replace("result", "color");
    return this;
  };

  CustomMaterial.prototype.Vertex_Begin = function (shaderPart) {
    this.CustomParts.Vertex_Begin = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Vertex_Definitions = function (shaderPart) {
    this.CustomParts.Vertex_Definitions = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Vertex_MainBegin = function (shaderPart) {
    this.CustomParts.Vertex_MainBegin = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Vertex_Before_PositionUpdated = function (shaderPart) {
    this.CustomParts.Vertex_Before_PositionUpdated = shaderPart.replace("result", "positionUpdated");
    return this;
  };

  CustomMaterial.prototype.Vertex_Before_NormalUpdated = function (shaderPart) {
    this.CustomParts.Vertex_Before_NormalUpdated = shaderPart.replace("result", "normalUpdated");
    return this;
  };

  CustomMaterial.prototype.Vertex_After_WorldPosComputed = function (shaderPart) {
    this.CustomParts.Vertex_After_WorldPosComputed = shaderPart;
    return this;
  };

  CustomMaterial.prototype.Vertex_MainEnd = function (shaderPart) {
    this.CustomParts.Vertex_MainEnd = shaderPart;
    return this;
  };

  CustomMaterial.ShaderIndexer = 1;
  return CustomMaterial;
}(StandardMaterial);
_TypeStore.RegisteredTypes["BABYLON.CustomMaterial"] = CustomMaterial;

var ShaderAlebdoParts = function () {
  function ShaderAlebdoParts() {}

  return ShaderAlebdoParts;
}();

var PBRCustomMaterial = function (_super) {
  __extends(PBRCustomMaterial, _super);

  function PBRCustomMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.CustomParts = new ShaderAlebdoParts();
    _this.customShaderNameResolve = _this.Builder;
    _this.FragmentShader = Effect.ShadersStore["pbrPixelShader"];
    _this.VertexShader = Effect.ShadersStore["pbrVertexShader"];
    _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g, Effect.IncludesShadersStore["pbrBlockAlbedoOpacity"]);
    _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockReflectivity>/g, Effect.IncludesShadersStore["pbrBlockReflectivity"]);
    _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g, Effect.IncludesShadersStore["pbrBlockFinalColorComposition"]);
    return _this;
  }

  PBRCustomMaterial.prototype.AttachAfterBind = function (mesh, effect) {
    if (this._newUniformInstances) {
      for (var el in this._newUniformInstances) {
        var ea = el.toString().split('-');

        if (ea[0] == 'vec2') {
          effect.setVector2(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'vec3') {
          effect.setVector3(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'vec4') {
          effect.setVector4(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'mat4') {
          effect.setMatrix(ea[1], this._newUniformInstances[el]);
        } else if (ea[0] == 'float') {
          effect.setFloat(ea[1], this._newUniformInstances[el]);
        }
      }
    }

    if (this._newSamplerInstances) {
      for (var el in this._newSamplerInstances) {
        var ea = el.toString().split('-');

        if (ea[0] == 'sampler2D' && this._newSamplerInstances[el].isReady && this._newSamplerInstances[el].isReady()) {
          effect.setTexture(ea[1], this._newSamplerInstances[el]);
        }
      }
    }
  };

  PBRCustomMaterial.prototype.ReviewUniform = function (name, arr) {
    if (name == "uniform" && this._newUniforms) {
      for (var ind = 0; ind < this._newUniforms.length; ind++) {
        if (this._customUniform[ind].indexOf('sampler') == -1) {
          arr.push(this._newUniforms[ind]);
        }
      }
    }

    if (name == "sampler" && this._newUniforms) {
      for (var ind = 0; ind < this._newUniforms.length; ind++) {
        if (this._customUniform[ind].indexOf('sampler') != -1) {
          arr.push(this._newUniforms[ind]);
        }
      }
    }

    return arr;
  };

  PBRCustomMaterial.prototype.Builder = function (shaderName, uniforms, uniformBuffers, samplers, defines, attributes) {
    var _this = this;

    if (attributes && this._customAttributes && this._customAttributes.length > 0) {
      attributes.push.apply(attributes, this._customAttributes);
    }

    this.ReviewUniform("uniform", uniforms);
    this.ReviewUniform("sampler", samplers);

    if (this._isCreatedShader) {
      return this._createdShaderName;
    }

    this._isCreatedShader = false;
    PBRCustomMaterial.ShaderIndexer++;
    var name = "custom_" + PBRCustomMaterial.ShaderIndexer;

    var fn_afterBind = this._afterBind.bind(this);

    this._afterBind = function (m, e) {
      if (!e) {
        return;
      }

      _this.AttachAfterBind(m, e);

      try {
        fn_afterBind(m, e);
      } catch (e) {}
    };

    Effect.ShadersStore[name + "VertexShader"] = this.VertexShader.replace('#define CUSTOM_VERTEX_BEGIN', this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace('#define CUSTOM_VERTEX_DEFINITIONS', (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace('#define CUSTOM_VERTEX_MAIN_BEGIN', this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace('#define CUSTOM_VERTEX_UPDATE_POSITION', this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace('#define CUSTOM_VERTEX_UPDATE_NORMAL', this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace('#define CUSTOM_VERTEX_MAIN_END', this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : "");

    if (this.CustomParts.Vertex_After_WorldPosComputed) {
      Effect.ShadersStore[name + "VertexShader"] = Effect.ShadersStore[name + "VertexShader"].replace('#define CUSTOM_VERTEX_UPDATE_WORLDPOS', this.CustomParts.Vertex_After_WorldPosComputed);
    }

    Effect.ShadersStore[name + "PixelShader"] = this.FragmentShader.replace('#define CUSTOM_FRAGMENT_BEGIN', this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace('#define CUSTOM_FRAGMENT_MAIN_BEGIN', this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace('#define CUSTOM_FRAGMENT_DEFINITIONS', (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace('#define CUSTOM_FRAGMENT_UPDATE_ALBEDO', this.CustomParts.Fragment_Custom_Albedo ? this.CustomParts.Fragment_Custom_Albedo : "").replace('#define CUSTOM_FRAGMENT_UPDATE_ALPHA', this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace('#define CUSTOM_FRAGMENT_BEFORE_LIGHTS', this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace('#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS', this.CustomParts.Fragment_Custom_MetallicRoughness ? this.CustomParts.Fragment_Custom_MetallicRoughness : "").replace('#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE', this.CustomParts.Fragment_Custom_MicroSurface ? this.CustomParts.Fragment_Custom_MicroSurface : "").replace('#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR', this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "");

    if (this.CustomParts.Fragment_Before_Fog) {
      Effect.ShadersStore[name + "PixelShader"] = Effect.ShadersStore[name + "PixelShader"].replace('#define CUSTOM_FRAGMENT_BEFORE_FOG', this.CustomParts.Fragment_Before_Fog);
    }

    this._isCreatedShader = true;
    this._createdShaderName = name;
    return name;
  };

  PBRCustomMaterial.prototype.AddUniform = function (name, kind, param) {
    if (!this._customUniform) {
      this._customUniform = new Array();
      this._newUniforms = new Array();
      this._newSamplerInstances = {};
      this._newUniformInstances = {};
    }

    if (param) {
      if (kind.indexOf("sampler") != -1) {
        this._newSamplerInstances[kind + "-" + name] = param;
      } else {
        this._newUniformInstances[kind + "-" + name] = param;
      }
    }

    this._customUniform.push("uniform " + kind + " " + name + ";");

    this._newUniforms.push(name);

    return this;
  };

  PBRCustomMaterial.prototype.AddAttribute = function (name) {
    if (!this._customAttributes) {
      this._customAttributes = [];
    }

    this._customAttributes.push(name);

    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Begin = function (shaderPart) {
    this.CustomParts.Fragment_Begin = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Definitions = function (shaderPart) {
    this.CustomParts.Fragment_Definitions = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_MainBegin = function (shaderPart) {
    this.CustomParts.Fragment_MainBegin = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Custom_Albedo = function (shaderPart) {
    this.CustomParts.Fragment_Custom_Albedo = shaderPart.replace("result", "surfaceAlbedo");
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Custom_Alpha = function (shaderPart) {
    this.CustomParts.Fragment_Custom_Alpha = shaderPart.replace("result", "alpha");
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Before_Lights = function (shaderPart) {
    this.CustomParts.Fragment_Before_Lights = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Custom_MetallicRoughness = function (shaderPart) {
    this.CustomParts.Fragment_Custom_MetallicRoughness = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Custom_MicroSurface = function (shaderPart) {
    this.CustomParts.Fragment_Custom_MicroSurface = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Before_Fog = function (shaderPart) {
    this.CustomParts.Fragment_Before_Fog = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Fragment_Before_FragColor = function (shaderPart) {
    this.CustomParts.Fragment_Before_FragColor = shaderPart.replace("result", "color");
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_Begin = function (shaderPart) {
    this.CustomParts.Vertex_Begin = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_Definitions = function (shaderPart) {
    this.CustomParts.Vertex_Definitions = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_MainBegin = function (shaderPart) {
    this.CustomParts.Vertex_MainBegin = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_Before_PositionUpdated = function (shaderPart) {
    this.CustomParts.Vertex_Before_PositionUpdated = shaderPart.replace("result", "positionUpdated");
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_Before_NormalUpdated = function (shaderPart) {
    this.CustomParts.Vertex_Before_NormalUpdated = shaderPart.replace("result", "normalUpdated");
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_After_WorldPosComputed = function (shaderPart) {
    this.CustomParts.Vertex_After_WorldPosComputed = shaderPart;
    return this;
  };

  PBRCustomMaterial.prototype.Vertex_MainEnd = function (shaderPart) {
    this.CustomParts.Vertex_MainEnd = shaderPart;
    return this;
  };

  PBRCustomMaterial.ShaderIndexer = 1;
  return PBRCustomMaterial;
}(PBRMaterial);
_TypeStore.RegisteredTypes["BABYLON.PBRCustomMaterial"] = PBRCustomMaterial;

var name$3 = 'firePixelShader';
var shader$2 = "precision highp float;\n\nuniform vec3 vEyePosition;\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\nuniform sampler2D distortionSampler;\nuniform sampler2D opacitySampler;\n#ifdef DIFFUSE\nvarying vec2 vDistortionCoords1;\nvarying vec2 vDistortionCoords2;\nvarying vec2 vDistortionCoords3;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvec4 bx2(vec4 x)\n{\nreturn vec4(2.0)*x-vec4(1.0);\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\n\nfloat alpha=1.0;\n#ifdef DIFFUSE\n\nconst float distortionAmount0=0.092;\nconst float distortionAmount1=0.092;\nconst float distortionAmount2=0.092;\nvec2 heightAttenuation=vec2(0.3,0.39);\nvec4 noise0=texture2D(distortionSampler,vDistortionCoords1);\nvec4 noise1=texture2D(distortionSampler,vDistortionCoords2);\nvec4 noise2=texture2D(distortionSampler,vDistortionCoords3);\nvec4 noiseSum=bx2(noise0)*distortionAmount0+bx2(noise1)*distortionAmount1+bx2(noise2)*distortionAmount2;\nvec4 perturbedBaseCoords=vec4(vDiffuseUV,0.0,1.0)+noiseSum*(vDiffuseUV.y*heightAttenuation.x+heightAttenuation.y);\nvec4 opacityColor=texture2D(opacitySampler,perturbedBaseCoords.xy);\n#ifdef ALPHATEST\nif (opacityColor.r<0.1)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor=texture2D(diffuseSampler,perturbedBaseCoords.xy)*2.0;\nbaseColor*=opacityColor;\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(1.0,1.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n\nvec4 color=vec4(baseColor.rgb,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$3] = shader$2;

var name$4 = 'fireVertexShader';
var shader$3 = "precision highp float;\n\nattribute vec3 position;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n\nuniform float time;\nuniform float speed;\n#ifdef DIFFUSE\nvarying vec2 vDistortionCoords1;\nvarying vec2 vDistortionCoords2;\nvarying vec2 vDistortionCoords3;\n#endif\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n\n#ifdef DIFFUSE\nvDiffuseUV=uv;\nvDiffuseUV.y-=0.2;\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n#ifdef DIFFUSE\n\nvec3 layerSpeed=vec3(-0.2,-0.52,-0.1)*speed;\nvDistortionCoords1.x=uv.x;\nvDistortionCoords1.y=uv.y+layerSpeed.x*time/1000.0;\nvDistortionCoords2.x=uv.x;\nvDistortionCoords2.y=uv.y+layerSpeed.y*time/1000.0;\nvDistortionCoords3.x=uv.x;\nvDistortionCoords3.y=uv.y+layerSpeed.z*time/1000.0;\n#endif\n}\n";
Effect.ShadersStore[name$4] = shader$3;

var FireMaterialDefines = function (_super) {
  __extends(FireMaterialDefines, _super);

  function FireMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.UV1 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.BonesPerMesh = 0;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return FireMaterialDefines;
}(MaterialDefines);

var FireMaterial = function (_super) {
  __extends(FireMaterial, _super);

  function FireMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this.speed = 1.0;
    _this._scaledDiffuse = new Color3();
    _this._lastTime = 0;
    return _this;
  }

  FireMaterial.prototype.needAlphaBlending = function () {
    return false;
  };

  FireMaterial.prototype.needAlphaTesting = function () {
    return true;
  };

  FireMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  FireMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new FireMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        if (!this._diffuseTexture.isReady()) {
          return false;
        } else {
          defines._needUVs = true;
          defines.DIFFUSE = true;
        }
      }
    }

    defines.ALPHATEST = this._opacityTexture ? true : false; // Misc.

    if (defines._areMiscDirty) {
      defines.POINTSIZE = this.pointsCloud || scene.forcePointsCloud;
      defines.FOG = scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE && this.fogEnabled;
    } // Values that need to be evaluated on every frame


    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "fire";
      var join = defines.toString();
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: ["world", "view", "viewProjection", "vEyePosition", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix", // Fire
        "time", "speed"],
        uniformBuffersNames: [],
        samplers: ["diffuseSampler", // Fire
        "distortionSampler", "opacitySampler"],
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: null,
        maxSimultaneousLights: 4,
        transformFeedbackVaryings: null
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  FireMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());

        this._activeEffect.setTexture("distortionSampler", this._distortionTexture);

        this._activeEffect.setTexture("opacitySampler", this._opacityTexture);
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this._scaledDiffuse, this.alpha * mesh.visibility); // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect); // Time

    this._lastTime += scene.getEngine().getDeltaTime();

    this._activeEffect.setFloat("time", this._lastTime); // Speed


    this._activeEffect.setFloat("speed", this.speed);

    this._afterBind(mesh, this._activeEffect);
  };

  FireMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0) {
      results.push(this._diffuseTexture);
    }

    if (this._distortionTexture && this._distortionTexture.animations && this._distortionTexture.animations.length > 0) {
      results.push(this._distortionTexture);
    }

    if (this._opacityTexture && this._opacityTexture.animations && this._opacityTexture.animations.length > 0) {
      results.push(this._opacityTexture);
    }

    return results;
  };

  FireMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    if (this._distortionTexture) {
      activeTextures.push(this._distortionTexture);
    }

    if (this._opacityTexture) {
      activeTextures.push(this._opacityTexture);
    }

    return activeTextures;
  };

  FireMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this._diffuseTexture === texture) {
      return true;
    }

    if (this._distortionTexture === texture) {
      return true;
    }

    if (this._opacityTexture === texture) {
      return true;
    }

    return false;
  };

  FireMaterial.prototype.getClassName = function () {
    return "FireMaterial";
  };

  FireMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this._diffuseTexture) {
      this._diffuseTexture.dispose();
    }

    if (this._distortionTexture) {
      this._distortionTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  FireMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new FireMaterial(name, _this.getScene());
    }, this);
  };

  FireMaterial.prototype.serialize = function () {
    var serializationObject = _super.prototype.serialize.call(this);

    serializationObject.customType = "BABYLON.FireMaterial";
    serializationObject.diffuseColor = this.diffuseColor.asArray();
    serializationObject.speed = this.speed;

    if (this._diffuseTexture) {
      serializationObject._diffuseTexture = this._diffuseTexture.serialize();
    }

    if (this._distortionTexture) {
      serializationObject._distortionTexture = this._distortionTexture.serialize();
    }

    if (this._opacityTexture) {
      serializationObject._opacityTexture = this._opacityTexture.serialize();
    }

    return serializationObject;
  };

  FireMaterial.Parse = function (source, scene, rootUrl) {
    var material = new FireMaterial(source.name, scene);
    material.diffuseColor = Color3.FromArray(source.diffuseColor);
    material.speed = source.speed;
    material.alpha = source.alpha;
    material.id = source.id;
    Tags.AddTagsTo(material, source.tags);
    material.backFaceCulling = source.backFaceCulling;
    material.wireframe = source.wireframe;

    if (source._diffuseTexture) {
      material._diffuseTexture = Texture.Parse(source._diffuseTexture, scene, rootUrl);
    }

    if (source._distortionTexture) {
      material._distortionTexture = Texture.Parse(source._distortionTexture, scene, rootUrl);
    }

    if (source._opacityTexture) {
      material._opacityTexture = Texture.Parse(source._opacityTexture, scene, rootUrl);
    }

    return material;
  };

  __decorate([serializeAsTexture("diffuseTexture")], FireMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], FireMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsTexture("distortionTexture")], FireMaterial.prototype, "_distortionTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], FireMaterial.prototype, "distortionTexture", void 0);

  __decorate([serializeAsTexture("opacityTexture")], FireMaterial.prototype, "_opacityTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], FireMaterial.prototype, "opacityTexture", void 0);

  __decorate([serializeAsColor3("diffuse")], FireMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize()], FireMaterial.prototype, "speed", void 0);

  return FireMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.FireMaterial"] = FireMaterial;

var name$5 = 'furPixelShader';
var shader$4 = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nuniform vec4 furColor;\nuniform float furLength;\nvarying vec3 vPositionW;\nvarying float vfur_length;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef HIGHLEVEL\nuniform float furOffset;\nuniform float furOcclusion;\nuniform sampler2D furTexture;\nvarying vec2 vFurUV;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<fogFragmentDeclaration>\n#include<clipPlaneFragmentDeclaration>\nfloat Rand(vec3 rv) {\nfloat x=dot(rv,vec3(12.9898,78.233,24.65487));\nreturn fract(sin(x)*43758.5453);\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=furColor;\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor*=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef HIGHLEVEL\n\nvec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));\nif (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {\ndiscard;\n}\nfloat occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);\nbaseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);\n\n#ifdef HIGHLEVEL\nvec4 color=vec4(finalDiffuse,alpha);\n#else\nfloat r=vfur_length/furLength*0.5;\nvec4 color=vec4(finalDiffuse*(0.5+r),alpha);\n#endif\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$5] = shader$4;

var name$6 = 'furVertexShader';
var shader$5 = "precision highp float;\n\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\nuniform float furLength;\nuniform float furAngle;\n#ifdef HIGHLEVEL\nuniform float furOffset;\nuniform vec3 furGravity;\nuniform float furTime;\nuniform float furSpacing;\nuniform float furDensity;\n#endif\n#ifdef HEIGHTMAP\nuniform sampler2D heightTexture;\n#endif\n#ifdef HIGHLEVEL\nvarying vec2 vFurUV;\n#endif\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\nvarying float vfur_length;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nfloat Rand(vec3 rv) {\nfloat x=dot(rv,vec3(12.9898,78.233,24.65487));\nreturn fract(sin(x)*43758.5453);\n}\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\n\nfloat r=Rand(position);\n#ifdef HEIGHTMAP\n#if __VERSION__>100\nvfur_length=furLength*texture(heightTexture,uv).x;\n#else\nvfur_length=furLength*texture2D(heightTexture,uv).r;\n#endif\n#else\nvfur_length=(furLength*r);\n#endif\nvec3 tangent1=vec3(normal.y,-normal.x,0);\nvec3 tangent2=vec3(-normal.z,0,normal.x);\nr=Rand(tangent1*r);\nfloat J=(2.0+4.0*r);\nr=Rand(tangent2*r);\nfloat K=(2.0+2.0*r);\ntangent1=tangent1*J+tangent2*K;\ntangent1=normalize(tangent1);\nvec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);\n#ifdef HIGHLEVEL\n\nvec3 forceDirection=vec3(0.0,0.0,0.0);\nforceDirection.x=sin(furTime+position.x*0.05)*0.2;\nforceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;\nforceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;\nvec3 displacement=vec3(0.0,0.0,0.0);\ndisplacement=furGravity+forceDirection;\nfloat displacementFactor=pow(furOffset,3.0);\nvec3 aNormal=normal;\naNormal.xyz+=displacement*displacementFactor;\nnewPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);\n#endif\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\ngl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);\nvec4 worldPos=finalWorld*vec4(newPosition,1.0);\nvPositionW=vec3(worldPos);\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#ifdef HIGHLEVEL\nvFurUV=vDiffuseUV*furDensity;\n#endif\n#else\n#ifdef HIGHLEVEL\nvFurUV=uv*furDensity;\n#endif\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$6] = shader$5;

var FurMaterialDefines = function (_super) {
  __extends(FurMaterialDefines, _super);

  function FurMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.HEIGHTMAP = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.HIGHLEVEL = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return FurMaterialDefines;
}(MaterialDefines);

var FurMaterial = function (_super) {
  __extends(FurMaterial, _super);

  function FurMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this.furLength = 1;
    _this.furAngle = 0;
    _this.furColor = new Color3(0.44, 0.21, 0.02);
    _this.furOffset = 0.0;
    _this.furSpacing = 12;
    _this.furGravity = new Vector3(0, 0, 0);
    _this.furSpeed = 100;
    _this.furDensity = 20;
    _this.furOcclusion = 0.0;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    _this.highLevelFur = true;
    _this._furTime = 0;
    return _this;
  }

  Object.defineProperty(FurMaterial.prototype, "furTime", {
    get: function () {
      return this._furTime;
    },
    set: function (furTime) {
      this._furTime = furTime;
    },
    enumerable: false,
    configurable: true
  });

  FurMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  FurMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  FurMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  };

  FurMaterial.prototype.updateFur = function () {
    for (var i = 1; i < this._meshes.length; i++) {
      var offsetFur = this._meshes[i].material;
      offsetFur.furLength = this.furLength;
      offsetFur.furAngle = this.furAngle;
      offsetFur.furGravity = this.furGravity;
      offsetFur.furSpacing = this.furSpacing;
      offsetFur.furSpeed = this.furSpeed;
      offsetFur.furColor = this.furColor;
      offsetFur.diffuseTexture = this.diffuseTexture;
      offsetFur.furTexture = this.furTexture;
      offsetFur.highLevelFur = this.highLevelFur;
      offsetFur.furTime = this.furTime;
      offsetFur.furDensity = this.furDensity;
    }
  }; // Methods


  FurMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new FurMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      if (scene.texturesEnabled) {
        if (this.diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
          if (!this.diffuseTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.DIFFUSE = true;
          }
        }

        if (this.heightTexture && engine.getCaps().maxVertexTextureImageUnits) {
          if (!this.heightTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.HEIGHTMAP = true;
          }
        }
      }
    } // High level


    if (this.highLevelFur !== defines.HIGHLEVEL) {
      defines.HIGHLEVEL = true;
      defines.markAsUnprocessed();
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "fur";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix", "furLength", "furAngle", "furColor", "furOffset", "furGravity", "furTime", "furSpacing", "furDensity", "furOcclusion"];
      var samplers = ["diffuseSampler", "heightTexture", "furTexture"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  FurMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (scene.getCachedMaterial() !== this) {
      // Textures
      if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());
      }

      if (this._heightTexture) {
        this._activeEffect.setTexture("heightTexture", this._heightTexture);
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._activeEffect.setFloat("furLength", this.furLength);

    this._activeEffect.setFloat("furAngle", this.furAngle);

    this._activeEffect.setColor4("furColor", this.furColor, 1.0);

    if (this.highLevelFur) {
      this._activeEffect.setVector3("furGravity", this.furGravity);

      this._activeEffect.setFloat("furOffset", this.furOffset);

      this._activeEffect.setFloat("furSpacing", this.furSpacing);

      this._activeEffect.setFloat("furDensity", this.furDensity);

      this._activeEffect.setFloat("furOcclusion", this.furOcclusion);

      this._furTime += this.getScene().getEngine().getDeltaTime() / this.furSpeed;

      this._activeEffect.setFloat("furTime", this._furTime);

      this._activeEffect.setTexture("furTexture", this.furTexture);
    }

    this._afterBind(mesh, this._activeEffect);
  };

  FurMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
      results.push(this.diffuseTexture);
    }

    if (this.heightTexture && this.heightTexture.animations && this.heightTexture.animations.length > 0) {
      results.push(this.heightTexture);
    }

    return results;
  };

  FurMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    if (this._heightTexture) {
      activeTextures.push(this._heightTexture);
    }

    return activeTextures;
  };

  FurMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this.diffuseTexture === texture) {
      return true;
    }

    if (this._heightTexture === texture) {
      return true;
    }

    return false;
  };

  FurMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.diffuseTexture) {
      this.diffuseTexture.dispose();
    }

    if (this._meshes) {
      for (var i = 1; i < this._meshes.length; i++) {
        var mat = this._meshes[i].material;

        if (mat) {
          mat.dispose(forceDisposeEffect);
        }

        this._meshes[i].dispose();
      }
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  FurMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new FurMaterial(name, _this.getScene());
    }, this);
  };

  FurMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.FurMaterial";

    if (this._meshes) {
      serializationObject.sourceMeshName = this._meshes[0].name;
      serializationObject.quality = this._meshes.length;
    }

    return serializationObject;
  };

  FurMaterial.prototype.getClassName = function () {
    return "FurMaterial";
  }; // Statics


  FurMaterial.Parse = function (source, scene, rootUrl) {
    var material = SerializationHelper.Parse(function () {
      return new FurMaterial(source.name, scene);
    }, source, scene, rootUrl);

    if (source.sourceMeshName && material.highLevelFur) {
      scene.executeWhenReady(function () {
        var sourceMesh = scene.getMeshByName(source.sourceMeshName);

        if (sourceMesh) {
          var furTexture = FurMaterial.GenerateTexture("Fur Texture", scene);
          material.furTexture = furTexture;
          FurMaterial.FurifyMesh(sourceMesh, source.quality);
        }
      });
    }

    return material;
  };

  FurMaterial.GenerateTexture = function (name, scene) {
    // Generate fur textures
    var texture = new DynamicTexture("FurTexture " + name, 256, scene, true);
    var context = texture.getContext();

    for (var i = 0; i < 20000; ++i) {
      context.fillStyle = "rgba(255, " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)";
      context.fillRect(Math.random() * texture.getSize().width, Math.random() * texture.getSize().height, 2, 2);
    }

    texture.update(false);
    texture.wrapU = Texture.WRAP_ADDRESSMODE;
    texture.wrapV = Texture.WRAP_ADDRESSMODE;
    return texture;
  }; // Creates and returns an array of meshes used as shells for the Fur Material
  // that can be disposed later in your code
  // The quality is in interval [0, 100]


  FurMaterial.FurifyMesh = function (sourceMesh, quality) {
    var meshes = [sourceMesh];
    var mat = sourceMesh.material;
    var i;

    if (!(mat instanceof FurMaterial)) {
      throw "The material of the source mesh must be a Fur Material";
    }

    for (i = 1; i < quality; i++) {
      var offsetFur = new FurMaterial(mat.name + i, sourceMesh.getScene());
      sourceMesh.getScene().materials.pop();
      Tags.EnableFor(offsetFur);
      Tags.AddTagsTo(offsetFur, "furShellMaterial");
      offsetFur.furLength = mat.furLength;
      offsetFur.furAngle = mat.furAngle;
      offsetFur.furGravity = mat.furGravity;
      offsetFur.furSpacing = mat.furSpacing;
      offsetFur.furSpeed = mat.furSpeed;
      offsetFur.furColor = mat.furColor;
      offsetFur.diffuseTexture = mat.diffuseTexture;
      offsetFur.furOffset = i / quality;
      offsetFur.furTexture = mat.furTexture;
      offsetFur.highLevelFur = mat.highLevelFur;
      offsetFur.furTime = mat.furTime;
      offsetFur.furDensity = mat.furDensity;
      var offsetMesh = sourceMesh.clone(sourceMesh.name + i);
      offsetMesh.material = offsetFur;
      offsetMesh.skeleton = sourceMesh.skeleton;
      offsetMesh.position = Vector3.Zero();
      meshes.push(offsetMesh);
    }

    for (i = 1; i < meshes.length; i++) {
      meshes[i].parent = sourceMesh;
    }

    sourceMesh.material._meshes = meshes;
    return meshes;
  };

  __decorate([serializeAsTexture("diffuseTexture")], FurMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], FurMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsTexture("heightTexture")], FurMaterial.prototype, "_heightTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], FurMaterial.prototype, "heightTexture", void 0);

  __decorate([serializeAsColor3()], FurMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furLength", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furAngle", void 0);

  __decorate([serializeAsColor3()], FurMaterial.prototype, "furColor", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furOffset", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furSpacing", void 0);

  __decorate([serializeAsVector3()], FurMaterial.prototype, "furGravity", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furSpeed", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furDensity", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furOcclusion", void 0);

  __decorate([serialize("disableLighting")], FurMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], FurMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], FurMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], FurMaterial.prototype, "maxSimultaneousLights", void 0);

  __decorate([serialize()], FurMaterial.prototype, "highLevelFur", void 0);

  __decorate([serialize()], FurMaterial.prototype, "furTime", null);

  return FurMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.FurMaterial"] = FurMaterial;

var name$7 = 'gradientPixelShader';
var shader$6 = "precision highp float;\n\nuniform vec3 vEyePosition;\n\nuniform vec4 topColor;\nuniform vec4 bottomColor;\nuniform float offset;\nuniform float scale;\nuniform float smoothness;\n\nvarying vec3 vPositionW;\nvarying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\nfloat h=vPosition.y*scale+offset;\nfloat mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));\nvec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));\n\nvec3 diffuseColor=baseColor.rgb;\n\nfloat alpha=baseColor.a;\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\n#ifdef EMISSIVE\nvec3 diffuseBase=baseColor.rgb;\n#else\nvec3 diffuseBase=vec3(0.,0.,0.);\n#endif\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";
Effect.ShadersStore[name$7] = shader$6;

var name$8 = 'gradientVertexShader';
var shader$7 = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\nvarying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\nvPosition=position;\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$8] = shader$7;

var GradientMaterialDefines = function (_super) {
  __extends(GradientMaterialDefines, _super);

  function GradientMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.EMISSIVE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return GradientMaterialDefines;
}(MaterialDefines);

var GradientMaterial = function (_super) {
  __extends(GradientMaterial, _super);

  function GradientMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this._maxSimultaneousLights = 4; // The gradient top color, red by default

    _this.topColor = new Color3(1, 0, 0);
    _this.topColorAlpha = 1.0; // The gradient top color, blue by default

    _this.bottomColor = new Color3(0, 0, 1);
    _this.bottomColorAlpha = 1.0; // Gradient offset

    _this.offset = 0;
    _this.scale = 1.0;
    _this.smoothness = 1.0;
    _this._disableLighting = false;
    return _this;
  }

  GradientMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0 || this.topColorAlpha < 1.0 || this.bottomColorAlpha < 1.0;
  };

  GradientMaterial.prototype.needAlphaTesting = function () {
    return true;
  };

  GradientMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  GradientMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new GradientMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine();
    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);
    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);
    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
    defines.EMISSIVE = this._disableLighting; // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "gradient";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "topColor", "bottomColor", "offset", "smoothness", "scale"];
      var samplers = [];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: 4
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  GradientMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, effect);

    if (this._mustRebind(scene, effect)) {
      // Clip plane
      MaterialHelper.BindClipPlane(effect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._activeEffect.setColor4("topColor", this.topColor, this.topColorAlpha);

    this._activeEffect.setColor4("bottomColor", this.bottomColor, this.bottomColorAlpha);

    this._activeEffect.setFloat("offset", this.offset);

    this._activeEffect.setFloat("scale", this.scale);

    this._activeEffect.setFloat("smoothness", this.smoothness);

    this._afterBind(mesh, this._activeEffect);
  };

  GradientMaterial.prototype.getAnimatables = function () {
    return [];
  };

  GradientMaterial.prototype.dispose = function (forceDisposeEffect) {
    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  GradientMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new GradientMaterial(name, _this.getScene());
    }, this);
  };

  GradientMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.GradientMaterial";
    return serializationObject;
  };

  GradientMaterial.prototype.getClassName = function () {
    return "GradientMaterial";
  }; // Statics


  GradientMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new GradientMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serialize("maxSimultaneousLights")], GradientMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], GradientMaterial.prototype, "maxSimultaneousLights", void 0);

  __decorate([serializeAsColor3()], GradientMaterial.prototype, "topColor", void 0);

  __decorate([serialize()], GradientMaterial.prototype, "topColorAlpha", void 0);

  __decorate([serializeAsColor3()], GradientMaterial.prototype, "bottomColor", void 0);

  __decorate([serialize()], GradientMaterial.prototype, "bottomColorAlpha", void 0);

  __decorate([serialize()], GradientMaterial.prototype, "offset", void 0);

  __decorate([serialize()], GradientMaterial.prototype, "scale", void 0);

  __decorate([serialize()], GradientMaterial.prototype, "smoothness", void 0);

  __decorate([serialize("disableLighting")], GradientMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], GradientMaterial.prototype, "disableLighting", void 0);

  return GradientMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.GradientMaterial"] = GradientMaterial;

var name$9 = 'gridPixelShader';
var shader$8 = "#extension GL_OES_standard_derivatives : enable\n#define SQRT2 1.41421356\n#define PI 3.14159\nprecision highp float;\nuniform vec3 mainColor;\nuniform vec3 lineColor;\nuniform vec4 gridControl;\nuniform vec3 gridOffset;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogFragmentDeclaration>\n\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform sampler2D opacitySampler;\nuniform vec2 vOpacityInfos;\n#endif\nfloat getVisibility(float position) {\n\nfloat majorGridFrequency=gridControl.y;\nif (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n{\nreturn 1.0;\n}\nreturn gridControl.z;\n}\nfloat getAnisotropicAttenuation(float differentialLength) {\nconst float maxNumberOfLines=10.0;\nreturn clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);\n}\nfloat isPointOnLine(float position,float differentialLength) {\nfloat fractionPartOfPosition=position-floor(position+0.5);\nfractionPartOfPosition/=differentialLength;\nfractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);\nfloat result=0.5+0.5*cos(fractionPartOfPosition*PI);\nreturn result;\n}\nfloat contributionOnAxis(float position) {\nfloat differentialLength=length(vec2(dFdx(position),dFdy(position)));\ndifferentialLength*=SQRT2;\n\nfloat result=isPointOnLine(position,differentialLength);\n\nfloat visibility=getVisibility(position);\nresult*=visibility;\n\nfloat anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);\nresult*=anisotropicAttenuation;\nreturn result;\n}\nfloat normalImpactOnAxis(float x) {\nfloat normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);\nreturn normalImpact;\n}\nvoid main(void) {\n\nfloat gridRatio=gridControl.x;\nvec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;\n\nfloat x=contributionOnAxis(gridPos.x);\nfloat y=contributionOnAxis(gridPos.y);\nfloat z=contributionOnAxis(gridPos.z);\n\nvec3 normal=normalize(vNormal);\nx*=normalImpactOnAxis(normal.x);\ny*=normalImpactOnAxis(normal.y);\nz*=normalImpactOnAxis(normal.z);\n\nfloat grid=clamp(x+y+z,0.,1.);\n\nvec3 color=mix(mainColor,lineColor,grid);\n#ifdef FOG\n#include<fogFragment>\n#endif\nfloat opacity=1.0;\n#ifdef TRANSPARENT\nopacity=clamp(grid,0.08,gridControl.w*grid);\n#endif\n#ifdef OPACITY\nopacity*=texture2D(opacitySampler,vOpacityUV).a;\n#endif\n\ngl_FragColor=vec4(color.rgb,opacity);\n#ifdef TRANSPARENT\n#ifdef PREMULTIPLYALPHA\ngl_FragColor.rgb*=opacity;\n#endif\n#else\n#endif\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$9] = shader$8;

var name$a = 'gridVertexShader';
var shader$9 = "precision highp float;\n\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#include<instancesDeclaration>\n\nuniform mat4 projection;\nuniform mat4 view;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogVertexDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\nvoid main(void) {\n#include<instancesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\n#include<fogVertex>\nvec4 cameraSpacePosition=view*worldPos;\ngl_Position=projection*cameraSpacePosition;\n#ifdef OPACITY\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\nif (vOpacityInfos.x == 0.)\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\nvPosition=position;\nvNormal=normal;\n}";
Effect.ShadersStore[name$a] = shader$9;

var GridMaterialDefines = function (_super) {
  __extends(GridMaterialDefines, _super);

  function GridMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.OPACITY = false;
    _this.TRANSPARENT = false;
    _this.FOG = false;
    _this.PREMULTIPLYALPHA = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.INSTANCES = false;
    _this.THIN_INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return GridMaterialDefines;
}(MaterialDefines);
/**
 * The grid materials allows you to wrap any shape with a grid.
 * Colors are customizable.
 */


var GridMaterial = function (_super) {
  __extends(GridMaterial, _super);
  /**
   * constructor
   * @param name The name given to the material in order to identify it afterwards.
   * @param scene The scene the material is used in.
   */


  function GridMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;
    /**
     * Main color of the grid (e.g. between lines)
     */


    _this.mainColor = Color3.Black();
    /**
     * Color of the grid lines.
     */

    _this.lineColor = Color3.Teal();
    /**
     * The scale of the grid compared to unit.
     */

    _this.gridRatio = 1.0;
    /**
     * Allows setting an offset for the grid lines.
     */

    _this.gridOffset = Vector3.Zero();
    /**
     * The frequency of thicker lines.
     */

    _this.majorUnitFrequency = 10;
    /**
     * The visibility of minor units in the grid.
     */

    _this.minorUnitVisibility = 0.33;
    /**
     * The grid opacity outside of the lines.
     */

    _this.opacity = 1.0;
    /**
     * Determine RBG output is premultiplied by alpha value.
     */

    _this.preMultiplyAlpha = false;
    _this._gridControl = new Vector4(_this.gridRatio, _this.majorUnitFrequency, _this.minorUnitVisibility, _this.opacity);
    return _this;
  }
  /**
   * Returns wehter or not the grid requires alpha blending.
   */


  GridMaterial.prototype.needAlphaBlending = function () {
    return this.opacity < 1.0 || this._opacityTexture && this._opacityTexture.isReady();
  };

  GridMaterial.prototype.needAlphaBlendingForMesh = function (mesh) {
    return this.needAlphaBlending();
  };

  GridMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new GridMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    if (defines.TRANSPARENT !== this.opacity < 1.0) {
      defines.TRANSPARENT = !defines.TRANSPARENT;
      defines.markAsUnprocessed();
    }

    if (defines.PREMULTIPLYALPHA != this.preMultiplyAlpha) {
      defines.PREMULTIPLYALPHA = !defines.PREMULTIPLYALPHA;
      defines.markAsUnprocessed();
    } // Textures


    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
          if (!this._opacityTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.OPACITY = true;
          }
        }
      }
    }

    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, false, this.fogEnabled, false, defines); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, scene.getEngine(), defines, !!useInstances); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Attributes

      MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, false);
      var attribs = [VertexBuffer.PositionKind, VertexBuffer.NormalKind];

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Defines

      var join = defines.toString();
      subMesh.setEffect(scene.getEngine().createEffect("grid", attribs, ["projection", "mainColor", "lineColor", "gridControl", "gridOffset", "vFogInfos", "vFogColor", "world", "view", "opacityMatrix", "vOpacityInfos"], ["opacitySampler"], join, undefined, this.onCompiled, this.onError), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  GridMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    if (!defines.INSTANCES || defines.THIN_INSTANCE) {
      this.bindOnlyWorldMatrix(world);
    }

    this._activeEffect.setMatrix("view", scene.getViewMatrix());

    this._activeEffect.setMatrix("projection", scene.getProjectionMatrix()); // Uniforms


    if (this._mustRebind(scene, effect)) {
      this._activeEffect.setColor3("mainColor", this.mainColor);

      this._activeEffect.setColor3("lineColor", this.lineColor);

      this._activeEffect.setVector3("gridOffset", this.gridOffset);

      this._gridControl.x = this.gridRatio;
      this._gridControl.y = Math.round(this.majorUnitFrequency);
      this._gridControl.z = this.minorUnitVisibility;
      this._gridControl.w = this.opacity;

      this._activeEffect.setVector4("gridControl", this._gridControl);

      if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
        this._activeEffect.setTexture("opacitySampler", this._opacityTexture);

        this._activeEffect.setFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level);

        this._activeEffect.setMatrix("opacityMatrix", this._opacityTexture.getTextureMatrix());
      }
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };
  /**
   * Dispose the material and its associated resources.
   * @param forceDisposeEffect will also dispose the used effect when true
   */


  GridMaterial.prototype.dispose = function (forceDisposeEffect) {
    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  GridMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new GridMaterial(name, _this.getScene());
    }, this);
  };

  GridMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.GridMaterial";
    return serializationObject;
  };

  GridMaterial.prototype.getClassName = function () {
    return "GridMaterial";
  };

  GridMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new GridMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsColor3()], GridMaterial.prototype, "mainColor", void 0);

  __decorate([serializeAsColor3()], GridMaterial.prototype, "lineColor", void 0);

  __decorate([serialize()], GridMaterial.prototype, "gridRatio", void 0);

  __decorate([serializeAsColor3()], GridMaterial.prototype, "gridOffset", void 0);

  __decorate([serialize()], GridMaterial.prototype, "majorUnitFrequency", void 0);

  __decorate([serialize()], GridMaterial.prototype, "minorUnitVisibility", void 0);

  __decorate([serialize()], GridMaterial.prototype, "opacity", void 0);

  __decorate([serialize()], GridMaterial.prototype, "preMultiplyAlpha", void 0);

  __decorate([serializeAsTexture("opacityTexture")], GridMaterial.prototype, "_opacityTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], GridMaterial.prototype, "opacityTexture", void 0);

  return GridMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.GridMaterial"] = GridMaterial;

var name$b = 'lavaPixelShader';
var shader$a = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n\nuniform float time;\nuniform float speed;\nuniform float movingSpeed;\nuniform vec3 fogColor;\nuniform sampler2D noiseTexture;\nuniform float fogDensity;\n\nvarying float noise;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nfloat random( vec3 scale,float seed ){\nreturn fract( sin( dot( gl_FragCoord.xyz+seed,scale ) )*43758.5453+seed ) ;\n}\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\n\nvec4 noiseTex=texture2D( noiseTexture,vDiffuseUV );\nvec2 T1=vDiffuseUV+vec2( 1.5,-1.5 )*time*0.02;\nvec2 T2=vDiffuseUV+vec2( -0.5,2.0 )*time*0.01*speed;\nT1.x+=noiseTex.x*2.0;\nT1.y+=noiseTex.y*2.0;\nT2.x-=noiseTex.y*0.2+time*0.001*movingSpeed;\nT2.y+=noiseTex.z*0.2+time*0.002*movingSpeed;\nfloat p=texture2D( noiseTexture,T1*3.0 ).a;\nvec4 lavaColor=texture2D( diffuseSampler,T2*4.0);\nvec4 temp=lavaColor*( vec4( p,p,p,p )*2. )+( lavaColor*lavaColor-0.1 );\nbaseColor=temp;\nfloat depth=gl_FragCoord.z*4.0;\nconst float LOG2=1.442695;\nfloat fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2 );\nfogFactor=1.0-clamp( fogFactor,0.0,1.0 );\nbaseColor=mix( baseColor,vec4( fogColor,baseColor.w ),fogFactor );\ndiffuseColor=baseColor.rgb;\n\n\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef UNLIT\nvec3 diffuseBase=vec3(1.,1.,1.);\n#else\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0]\n#include<lightFragment>[1]\n#include<lightFragment>[2]\n#include<lightFragment>[3]\n#endif\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$b] = shader$a;

var name$c = 'lavaVertexShader';
var shader$b = "precision highp float;\n\nuniform float time;\nuniform float lowFrequencySpeed;\n\nvarying float noise;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n\n\nvec3 mod289(vec3 x)\n{\nreturn x-floor(x*(1.0/289.0))*289.0;\n}\nvec4 mod289(vec4 x)\n{\nreturn x-floor(x*(1.0/289.0))*289.0;\n}\nvec4 permute(vec4 x)\n{\nreturn mod289(((x*34.0)+1.0)*x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\nreturn 1.79284291400159-0.85373472095314*r;\n}\nvec3 fade(vec3 t) {\nreturn t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat pnoise(vec3 P,vec3 rep)\n{\nvec3 Pi0=mod(floor(P),rep);\nvec3 Pi1=mod(Pi0+vec3(1.0),rep);\nPi0=mod289(Pi0);\nPi1=mod289(Pi1);\nvec3 Pf0=fract(P);\nvec3 Pf1=Pf0-vec3(1.0);\nvec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);\nvec4 iy=vec4(Pi0.yy,Pi1.yy);\nvec4 iz0=Pi0.zzzz;\nvec4 iz1=Pi1.zzzz;\nvec4 ixy=permute(permute(ix)+iy);\nvec4 ixy0=permute(ixy+iz0);\nvec4 ixy1=permute(ixy+iz1);\nvec4 gx0=ixy0*(1.0/7.0);\nvec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;\ngx0=fract(gx0);\nvec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);\nvec4 sz0=step(gz0,vec4(0.0));\ngx0-=sz0*(step(0.0,gx0)-0.5);\ngy0-=sz0*(step(0.0,gy0)-0.5);\nvec4 gx1=ixy1*(1.0/7.0);\nvec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;\ngx1=fract(gx1);\nvec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);\nvec4 sz1=step(gz1,vec4(0.0));\ngx1-=sz1*(step(0.0,gx1)-0.5);\ngy1-=sz1*(step(0.0,gy1)-0.5);\nvec3 g000=vec3(gx0.x,gy0.x,gz0.x);\nvec3 g100=vec3(gx0.y,gy0.y,gz0.y);\nvec3 g010=vec3(gx0.z,gy0.z,gz0.z);\nvec3 g110=vec3(gx0.w,gy0.w,gz0.w);\nvec3 g001=vec3(gx1.x,gy1.x,gz1.x);\nvec3 g101=vec3(gx1.y,gy1.y,gz1.y);\nvec3 g011=vec3(gx1.z,gy1.z,gz1.z);\nvec3 g111=vec3(gx1.w,gy1.w,gz1.w);\nvec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\ng000*=norm0.x;\ng010*=norm0.y;\ng100*=norm0.z;\ng110*=norm0.w;\nvec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\ng001*=norm1.x;\ng011*=norm1.y;\ng101*=norm1.z;\ng111*=norm1.w;\nfloat n000=dot(g000,Pf0);\nfloat n100=dot(g100,vec3(Pf1.x,Pf0.yz));\nfloat n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));\nfloat n110=dot(g110,vec3(Pf1.xy,Pf0.z));\nfloat n001=dot(g001,vec3(Pf0.xy,Pf1.z));\nfloat n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));\nfloat n011=dot(g011,vec3(Pf0.x,Pf1.yz));\nfloat n111=dot(g111,Pf1);\nvec3 fade_xyz=fade(Pf0);\nvec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\nvec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);\nfloat n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);\nreturn 2.2*n_xyz;\n}\n\nfloat turbulence( vec3 p ) {\nfloat w=100.0;\nfloat t=-.5;\nfor (float f=1.0 ; f<=10.0 ; f++ ){\nfloat power=pow( 2.0,f );\nt+=abs( pnoise( vec3( power*p ),vec3( 10.0,10.0,10.0 ) )/power );\n}\nreturn t;\n}\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\n#ifdef NORMAL\n\nnoise=10.0*-.10*turbulence( .5*normal+time*1.15 );\n\nfloat b=lowFrequencySpeed*5.0*pnoise( 0.05*position +vec3(time*1.025),vec3( 100.0 ) );\n\nfloat displacement =-1.5*noise+b;\n\nvec3 newPosition=position+normal*displacement;\ngl_Position=viewProjection*finalWorld*vec4( newPosition,1.0 );\nvec4 worldPos=finalWorld*vec4(newPosition,1.0);\nvPositionW=vec3(worldPos);\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}";
Effect.ShadersStore[name$c] = shader$b;

var LavaMaterialDefines = function (_super) {
  __extends(LavaMaterialDefines, _super);

  function LavaMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.LIGHT0 = false;
    _this.LIGHT1 = false;
    _this.LIGHT2 = false;
    _this.LIGHT3 = false;
    _this.SPOTLIGHT0 = false;
    _this.SPOTLIGHT1 = false;
    _this.SPOTLIGHT2 = false;
    _this.SPOTLIGHT3 = false;
    _this.HEMILIGHT0 = false;
    _this.HEMILIGHT1 = false;
    _this.HEMILIGHT2 = false;
    _this.HEMILIGHT3 = false;
    _this.DIRLIGHT0 = false;
    _this.DIRLIGHT1 = false;
    _this.DIRLIGHT2 = false;
    _this.DIRLIGHT3 = false;
    _this.POINTLIGHT0 = false;
    _this.POINTLIGHT1 = false;
    _this.POINTLIGHT2 = false;
    _this.POINTLIGHT3 = false;
    _this.SHADOW0 = false;
    _this.SHADOW1 = false;
    _this.SHADOW2 = false;
    _this.SHADOW3 = false;
    _this.SHADOWS = false;
    _this.SHADOWESM0 = false;
    _this.SHADOWESM1 = false;
    _this.SHADOWESM2 = false;
    _this.SHADOWESM3 = false;
    _this.SHADOWPOISSON0 = false;
    _this.SHADOWPOISSON1 = false;
    _this.SHADOWPOISSON2 = false;
    _this.SHADOWPOISSON3 = false;
    _this.SHADOWPCF0 = false;
    _this.SHADOWPCF1 = false;
    _this.SHADOWPCF2 = false;
    _this.SHADOWPCF3 = false;
    _this.SHADOWPCSS0 = false;
    _this.SHADOWPCSS1 = false;
    _this.SHADOWPCSS2 = false;
    _this.SHADOWPCSS3 = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.UNLIT = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return LavaMaterialDefines;
}(MaterialDefines);

var LavaMaterial = function (_super) {
  __extends(LavaMaterial, _super);

  function LavaMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.speed = 1;
    _this.movingSpeed = 1;
    _this.lowFrequencySpeed = 1;
    _this.fogDensity = 0.15;
    _this._lastTime = 0;
    _this.diffuseColor = new Color3(1, 1, 1);
    _this._disableLighting = false;
    _this._unlit = false;
    _this._maxSimultaneousLights = 4;
    _this._scaledDiffuse = new Color3();
    return _this;
  }

  LavaMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  LavaMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  LavaMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  LavaMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new LavaMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
          if (!this._diffuseTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.DIFFUSE = true;
          }
        }
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = true;
    MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "lava";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix", "time", "speed", "movingSpeed", "fogColor", "fogDensity", "lowFrequencySpeed"];
      var samplers = ["diffuseSampler", "noiseTexture"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  LavaMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect;
    defines.UNLIT = this._unlit; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this.diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this.diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this.diffuseTexture.coordinatesIndex, this.diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this.diffuseTexture.getTextureMatrix());
      }

      if (this.noiseTexture) {
        this._activeEffect.setTexture("noiseTexture", this.noiseTexture);
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this._scaledDiffuse, this.alpha * mesh.visibility);

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);
    this._lastTime += scene.getEngine().getDeltaTime();

    this._activeEffect.setFloat("time", this._lastTime * this.speed / 1000);

    if (!this.fogColor) {
      this.fogColor = Color3.Black();
    }

    this._activeEffect.setColor3("fogColor", this.fogColor);

    this._activeEffect.setFloat("fogDensity", this.fogDensity);

    this._activeEffect.setFloat("lowFrequencySpeed", this.lowFrequencySpeed);

    this._activeEffect.setFloat("movingSpeed", this.movingSpeed);

    this._afterBind(mesh, this._activeEffect);
  };

  LavaMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
      results.push(this.diffuseTexture);
    }

    if (this.noiseTexture && this.noiseTexture.animations && this.noiseTexture.animations.length > 0) {
      results.push(this.noiseTexture);
    }

    return results;
  };

  LavaMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    return activeTextures;
  };

  LavaMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this.diffuseTexture === texture) {
      return true;
    }

    return false;
  };

  LavaMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.diffuseTexture) {
      this.diffuseTexture.dispose();
    }

    if (this.noiseTexture) {
      this.noiseTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  LavaMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new LavaMaterial(name, _this.getScene());
    }, this);
  };

  LavaMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.LavaMaterial";
    return serializationObject;
  };

  LavaMaterial.prototype.getClassName = function () {
    return "LavaMaterial";
  }; // Statics


  LavaMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new LavaMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("diffuseTexture")], LavaMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], LavaMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsTexture()], LavaMaterial.prototype, "noiseTexture", void 0);

  __decorate([serializeAsColor3()], LavaMaterial.prototype, "fogColor", void 0);

  __decorate([serialize()], LavaMaterial.prototype, "speed", void 0);

  __decorate([serialize()], LavaMaterial.prototype, "movingSpeed", void 0);

  __decorate([serialize()], LavaMaterial.prototype, "lowFrequencySpeed", void 0);

  __decorate([serialize()], LavaMaterial.prototype, "fogDensity", void 0);

  __decorate([serializeAsColor3()], LavaMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize("disableLighting")], LavaMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], LavaMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("unlit")], LavaMaterial.prototype, "_unlit", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], LavaMaterial.prototype, "unlit", void 0);

  __decorate([serialize("maxSimultaneousLights")], LavaMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], LavaMaterial.prototype, "maxSimultaneousLights", void 0);

  return LavaMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.LavaMaterial"] = LavaMaterial;

var name$d = 'mixPixelShader';
var shader$c = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform sampler2D mixMap1Sampler;\nuniform vec2 vTextureInfos;\n#ifdef MIXMAP2\nuniform sampler2D mixMap2Sampler;\n#endif\nuniform sampler2D diffuse1Sampler;\nuniform sampler2D diffuse2Sampler;\nuniform sampler2D diffuse3Sampler;\nuniform sampler2D diffuse4Sampler;\nuniform vec2 diffuse1Infos;\nuniform vec2 diffuse2Infos;\nuniform vec2 diffuse3Infos;\nuniform vec2 diffuse4Infos;\n#ifdef MIXMAP2\nuniform sampler2D diffuse5Sampler;\nuniform sampler2D diffuse6Sampler;\nuniform sampler2D diffuse7Sampler;\nuniform sampler2D diffuse8Sampler;\nuniform vec2 diffuse5Infos;\nuniform vec2 diffuse6Infos;\nuniform vec2 diffuse7Infos;\nuniform vec2 diffuse8Infos;\n#endif\n#endif\n\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 finalMixColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n#ifdef MIXMAP2\nvec4 mixColor2=vec4(1.,1.,1.,1.);\n#endif\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef DIFFUSE\nvec4 mixColor=texture2D(mixMap1Sampler,vTextureUV);\n#include<depthPrePass>\nmixColor.rgb*=vTextureInfos.y;\nvec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);\nvec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);\nvec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);\nvec4 diffuse4Color=texture2D(diffuse4Sampler,vTextureUV*diffuse4Infos);\ndiffuse1Color.rgb*=mixColor.r;\ndiffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,mixColor.g);\ndiffuse3Color.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,mixColor.b);\nfinalMixColor.rgb=mix(diffuse3Color.rgb,diffuse4Color.rgb,1.0-mixColor.a);\n#ifdef MIXMAP2\nmixColor=texture2D(mixMap2Sampler,vTextureUV);\nmixColor.rgb*=vTextureInfos.y;\nvec4 diffuse5Color=texture2D(diffuse5Sampler,vTextureUV*diffuse5Infos);\nvec4 diffuse6Color=texture2D(diffuse6Sampler,vTextureUV*diffuse6Infos);\nvec4 diffuse7Color=texture2D(diffuse7Sampler,vTextureUV*diffuse7Infos);\nvec4 diffuse8Color=texture2D(diffuse8Sampler,vTextureUV*diffuse8Infos);\ndiffuse5Color.rgb=mix(finalMixColor.rgb,diffuse5Color.rgb,mixColor.r);\ndiffuse6Color.rgb=mix(diffuse5Color.rgb,diffuse6Color.rgb,mixColor.g);\ndiffuse7Color.rgb=mix(diffuse6Color.rgb,diffuse7Color.rgb,mixColor.b);\nfinalMixColor.rgb=mix(diffuse7Color.rgb,diffuse8Color.rgb,1.0-mixColor.a);\n#endif\n#endif\n#ifdef VERTEXCOLOR\nfinalMixColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor*finalMixColor.rgb,0.0,1.0);\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";
Effect.ShadersStore[name$d] = shader$c;

var name$e = 'mixVertexShader';
var shader$d = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform mat4 textureMatrix;\nuniform vec2 vTextureInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vTextureInfos.x == 0.)\n{\nvTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$e] = shader$d;

var MixMaterialDefines = function (_super) {
  __extends(MixMaterialDefines, _super);

  function MixMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.SPECULARTERM = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.MIXMAP2 = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return MixMaterialDefines;
}(MaterialDefines);

var MixMaterial = function (_super) {
  __extends(MixMaterial, _super);

  function MixMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;
    /**
     * Uniforms
     */


    _this.diffuseColor = new Color3(1, 1, 1);
    _this.specularColor = new Color3(0, 0, 0);
    _this.specularPower = 64;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  MixMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  MixMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  MixMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  MixMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new MixMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (scene.texturesEnabled) {
      if (!this._mixTexture1 || !this._mixTexture1.isReady()) {
        return false;
      }

      defines._needUVs = true;

      if (MaterialFlags.DiffuseTextureEnabled) {
        if (!this._diffuseTexture1 || !this._diffuseTexture1.isReady()) {
          return false;
        }

        defines.DIFFUSE = true;

        if (!this._diffuseTexture2 || !this._diffuseTexture2.isReady()) {
          return false;
        }

        if (!this._diffuseTexture3 || !this._diffuseTexture3.isReady()) {
          return false;
        }

        if (!this._diffuseTexture4 || !this._diffuseTexture4.isReady()) {
          return false;
        }

        if (this._mixTexture2) {
          if (!this._mixTexture2.isReady()) {
            return false;
          }

          defines.MIXMAP2 = true;

          if (!this._diffuseTexture5 || !this._diffuseTexture5.isReady()) {
            return false;
          }

          if (!this._diffuseTexture6 || !this._diffuseTexture6.isReady()) {
            return false;
          }

          if (!this._diffuseTexture7 || !this._diffuseTexture7.isReady()) {
            return false;
          }

          if (!this._diffuseTexture8 || !this._diffuseTexture8.isReady()) {
            return false;
          }
        }
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "mix";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor", "vFogInfos", "vFogColor", "pointSize", "vTextureInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "textureMatrix", "diffuse1Infos", "diffuse2Infos", "diffuse3Infos", "diffuse4Infos", "diffuse5Infos", "diffuse6Infos", "diffuse7Infos", "diffuse8Infos"];
      var samplers = ["mixMap1Sampler", "mixMap2Sampler", "diffuse1Sampler", "diffuse2Sampler", "diffuse3Sampler", "diffuse4Sampler", "diffuse5Sampler", "diffuse6Sampler", "diffuse7Sampler", "diffuse8Sampler"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  MixMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this._mixTexture1) {
        this._activeEffect.setTexture("mixMap1Sampler", this._mixTexture1);

        this._activeEffect.setFloat2("vTextureInfos", this._mixTexture1.coordinatesIndex, this._mixTexture1.level);

        this._activeEffect.setMatrix("textureMatrix", this._mixTexture1.getTextureMatrix());

        if (MaterialFlags.DiffuseTextureEnabled) {
          if (this._diffuseTexture1) {
            this._activeEffect.setTexture("diffuse1Sampler", this._diffuseTexture1);

            this._activeEffect.setFloat2("diffuse1Infos", this._diffuseTexture1.uScale, this._diffuseTexture1.vScale);
          }

          if (this._diffuseTexture2) {
            this._activeEffect.setTexture("diffuse2Sampler", this._diffuseTexture2);

            this._activeEffect.setFloat2("diffuse2Infos", this._diffuseTexture2.uScale, this._diffuseTexture2.vScale);
          }

          if (this._diffuseTexture3) {
            this._activeEffect.setTexture("diffuse3Sampler", this._diffuseTexture3);

            this._activeEffect.setFloat2("diffuse3Infos", this._diffuseTexture3.uScale, this._diffuseTexture3.vScale);
          }

          if (this._diffuseTexture4) {
            this._activeEffect.setTexture("diffuse4Sampler", this._diffuseTexture4);

            this._activeEffect.setFloat2("diffuse4Infos", this._diffuseTexture4.uScale, this._diffuseTexture4.vScale);
          }
        }
      }

      if (this._mixTexture2) {
        this._activeEffect.setTexture("mixMap2Sampler", this._mixTexture2);

        if (MaterialFlags.DiffuseTextureEnabled) {
          if (this._diffuseTexture5) {
            this._activeEffect.setTexture("diffuse5Sampler", this._diffuseTexture5);

            this._activeEffect.setFloat2("diffuse5Infos", this._diffuseTexture5.uScale, this._diffuseTexture5.vScale);
          }

          if (this._diffuseTexture6) {
            this._activeEffect.setTexture("diffuse6Sampler", this._diffuseTexture6);

            this._activeEffect.setFloat2("diffuse6Infos", this._diffuseTexture6.uScale, this._diffuseTexture6.vScale);
          }

          if (this._diffuseTexture7) {
            this._activeEffect.setTexture("diffuse7Sampler", this._diffuseTexture7);

            this._activeEffect.setFloat2("diffuse7Infos", this._diffuseTexture7.uScale, this._diffuseTexture7.vScale);
          }

          if (this._diffuseTexture8) {
            this._activeEffect.setTexture("diffuse8Sampler", this._diffuseTexture8);

            this._activeEffect.setFloat2("diffuse8Infos", this._diffuseTexture8.uScale, this._diffuseTexture8.vScale);
          }
        }
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

    if (defines.SPECULARTERM) {
      this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
    }

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  MixMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this._mixTexture1 && this._mixTexture1.animations && this._mixTexture1.animations.length > 0) {
      results.push(this._mixTexture1);
    }

    if (this._mixTexture2 && this._mixTexture2.animations && this._mixTexture2.animations.length > 0) {
      results.push(this._mixTexture2);
    }

    return results;
  };

  MixMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this); // Mix map 1


    if (this._mixTexture1) {
      activeTextures.push(this._mixTexture1);
    }

    if (this._diffuseTexture1) {
      activeTextures.push(this._diffuseTexture1);
    }

    if (this._diffuseTexture2) {
      activeTextures.push(this._diffuseTexture2);
    }

    if (this._diffuseTexture3) {
      activeTextures.push(this._diffuseTexture3);
    }

    if (this._diffuseTexture4) {
      activeTextures.push(this._diffuseTexture4);
    } // Mix map 2


    if (this._mixTexture2) {
      activeTextures.push(this._mixTexture2);
    }

    if (this._diffuseTexture5) {
      activeTextures.push(this._diffuseTexture5);
    }

    if (this._diffuseTexture6) {
      activeTextures.push(this._diffuseTexture6);
    }

    if (this._diffuseTexture7) {
      activeTextures.push(this._diffuseTexture7);
    }

    if (this._diffuseTexture8) {
      activeTextures.push(this._diffuseTexture8);
    }

    return activeTextures;
  };

  MixMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    } // Mix map 1


    if (this._mixTexture1 === texture) {
      return true;
    }

    if (this._diffuseTexture1 === texture) {
      return true;
    }

    if (this._diffuseTexture2 === texture) {
      return true;
    }

    if (this._diffuseTexture3 === texture) {
      return true;
    }

    if (this._diffuseTexture4 === texture) {
      return true;
    } // Mix map 2


    if (this._mixTexture2 === texture) {
      return true;
    }

    if (this._diffuseTexture5 === texture) {
      return true;
    }

    if (this._diffuseTexture6 === texture) {
      return true;
    }

    if (this._diffuseTexture7 === texture) {
      return true;
    }

    if (this._diffuseTexture8 === texture) {
      return true;
    }

    return false;
  };

  MixMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this._mixTexture1) {
      this._mixTexture1.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  MixMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new MixMaterial(name, _this.getScene());
    }, this);
  };

  MixMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.MixMaterial";
    return serializationObject;
  };

  MixMaterial.prototype.getClassName = function () {
    return "MixMaterial";
  }; // Statics


  MixMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new MixMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("mixTexture1")], MixMaterial.prototype, "_mixTexture1", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "mixTexture1", void 0);

  __decorate([serializeAsTexture("mixTexture2")], MixMaterial.prototype, "_mixTexture2", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "mixTexture2", void 0);

  __decorate([serializeAsTexture("diffuseTexture1")], MixMaterial.prototype, "_diffuseTexture1", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture1", void 0);

  __decorate([serializeAsTexture("diffuseTexture2")], MixMaterial.prototype, "_diffuseTexture2", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture2", void 0);

  __decorate([serializeAsTexture("diffuseTexture3")], MixMaterial.prototype, "_diffuseTexture3", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture3", void 0);

  __decorate([serializeAsTexture("diffuseTexture4")], MixMaterial.prototype, "_diffuseTexture4", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture4", void 0);

  __decorate([serializeAsTexture("diffuseTexture1")], MixMaterial.prototype, "_diffuseTexture5", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture5", void 0);

  __decorate([serializeAsTexture("diffuseTexture2")], MixMaterial.prototype, "_diffuseTexture6", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture6", void 0);

  __decorate([serializeAsTexture("diffuseTexture3")], MixMaterial.prototype, "_diffuseTexture7", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture7", void 0);

  __decorate([serializeAsTexture("diffuseTexture4")], MixMaterial.prototype, "_diffuseTexture8", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], MixMaterial.prototype, "diffuseTexture8", void 0);

  __decorate([serializeAsColor3()], MixMaterial.prototype, "diffuseColor", void 0);

  __decorate([serializeAsColor3()], MixMaterial.prototype, "specularColor", void 0);

  __decorate([serialize()], MixMaterial.prototype, "specularPower", void 0);

  __decorate([serialize("disableLighting")], MixMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], MixMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], MixMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], MixMaterial.prototype, "maxSimultaneousLights", void 0);

  return MixMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.MixMaterial"] = MixMaterial;

var name$f = 'normalPixelShader';
var shader$e = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef LIGHTING\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#endif\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef NORMAL\nbaseColor=mix(baseColor,vec4(vNormalW,1.0),0.5);\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\n#ifdef LIGHTING\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0]\n#include<lightFragment>[1]\n#include<lightFragment>[2]\n#include<lightFragment>[3]\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n#else\nvec3 finalDiffuse=baseColor.rgb;\n#endif\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$f] = shader$e;

var name$g = 'normalVertexShader';
var shader$f = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$g] = shader$f;

var NormalMaterialDefines = function (_super) {
  __extends(NormalMaterialDefines, _super);

  function NormalMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.LIGHT0 = false;
    _this.LIGHT1 = false;
    _this.LIGHT2 = false;
    _this.LIGHT3 = false;
    _this.SPOTLIGHT0 = false;
    _this.SPOTLIGHT1 = false;
    _this.SPOTLIGHT2 = false;
    _this.SPOTLIGHT3 = false;
    _this.HEMILIGHT0 = false;
    _this.HEMILIGHT1 = false;
    _this.HEMILIGHT2 = false;
    _this.HEMILIGHT3 = false;
    _this.DIRLIGHT0 = false;
    _this.DIRLIGHT1 = false;
    _this.DIRLIGHT2 = false;
    _this.DIRLIGHT3 = false;
    _this.POINTLIGHT0 = false;
    _this.POINTLIGHT1 = false;
    _this.POINTLIGHT2 = false;
    _this.POINTLIGHT3 = false;
    _this.SHADOW0 = false;
    _this.SHADOW1 = false;
    _this.SHADOW2 = false;
    _this.SHADOW3 = false;
    _this.SHADOWS = false;
    _this.SHADOWESM0 = false;
    _this.SHADOWESM1 = false;
    _this.SHADOWESM2 = false;
    _this.SHADOWESM3 = false;
    _this.SHADOWPOISSON0 = false;
    _this.SHADOWPOISSON1 = false;
    _this.SHADOWPOISSON2 = false;
    _this.SHADOWPOISSON3 = false;
    _this.SHADOWPCF0 = false;
    _this.SHADOWPCF1 = false;
    _this.SHADOWPCF2 = false;
    _this.SHADOWPCF3 = false;
    _this.SHADOWPCSS0 = false;
    _this.SHADOWPCSS1 = false;
    _this.SHADOWPCSS2 = false;
    _this.SHADOWPCSS3 = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.LIGHTING = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return NormalMaterialDefines;
}(MaterialDefines);

var NormalMaterial = function (_super) {
  __extends(NormalMaterial, _super);

  function NormalMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  NormalMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  NormalMaterial.prototype.needAlphaBlendingForMesh = function (mesh) {
    return this.needAlphaBlending() || mesh.visibility < 1.0;
  };

  NormalMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  NormalMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  NormalMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new NormalMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
          if (!this._diffuseTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.DIFFUSE = true;
          }
        }
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = true;
    MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);
    defines.LIGHTING = !this._disableLighting; // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines);
      var shaderName = "normal";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix"];
      var samplers = ["diffuseSampler"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: 4
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  NormalMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this.diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this.diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this.diffuseTexture.coordinatesIndex, this.diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this.diffuseTexture.getTextureMatrix());
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility); // Lights


    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  NormalMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
      results.push(this.diffuseTexture);
    }

    return results;
  };

  NormalMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    return activeTextures;
  };

  NormalMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this.diffuseTexture === texture) {
      return true;
    }

    return false;
  };

  NormalMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.diffuseTexture) {
      this.diffuseTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  NormalMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new NormalMaterial(name, _this.getScene());
    }, this);
  };

  NormalMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.NormalMaterial";
    return serializationObject;
  };

  NormalMaterial.prototype.getClassName = function () {
    return "NormalMaterial";
  }; // Statics


  NormalMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new NormalMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("diffuseTexture")], NormalMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], NormalMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsColor3()], NormalMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize("disableLighting")], NormalMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], NormalMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], NormalMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], NormalMaterial.prototype, "maxSimultaneousLights", void 0);

  return NormalMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.NormalMaterial"] = NormalMaterial;

var name$h = 'shadowOnlyPixelShader';
var shader$g = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform float alpha;\nuniform vec3 shadowColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#include<lightFragment>[0..1]\n\nvec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$h] = shader$g;

var name$i = 'shadowOnlyVertexShader';
var shader$h = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$i] = shader$h;

var ShadowOnlyMaterialDefines = function (_super) {
  __extends(ShadowOnlyMaterialDefines, _super);

  function ShadowOnlyMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return ShadowOnlyMaterialDefines;
}(MaterialDefines);

var ShadowOnlyMaterial = function (_super) {
  __extends(ShadowOnlyMaterial, _super);

  function ShadowOnlyMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this._needAlphaBlending = true;
    _this.shadowColor = Color3.Black();
    return _this;
  }

  ShadowOnlyMaterial.prototype.needAlphaBlending = function () {
    return this._needAlphaBlending;
  };

  ShadowOnlyMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  ShadowOnlyMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  };

  Object.defineProperty(ShadowOnlyMaterial.prototype, "activeLight", {
    get: function () {
      return this._activeLight;
    },
    set: function (light) {
      this._activeLight = light;
    },
    enumerable: false,
    configurable: true
  });

  ShadowOnlyMaterial.prototype._getFirstShadowLightForMesh = function (mesh) {
    for (var _i = 0, _a = mesh.lightSources; _i < _a.length; _i++) {
      var light = _a[_i];

      if (light.shadowEnabled) {
        return light;
      }
    }

    return null;
  }; // Methods


  ShadowOnlyMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    var _a;

    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new ShadowOnlyMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Ensure that active light is the first shadow light

    if (this._activeLight) {
      for (var _i = 0, _b = mesh.lightSources; _i < _b.length; _i++) {
        var light = _b[_i];

        if (light.shadowEnabled) {
          if (this._activeLight === light) {
            break; // We are good
          }

          var lightPosition = mesh.lightSources.indexOf(this._activeLight);

          if (lightPosition !== -1) {
            mesh.lightSources.splice(lightPosition, 1);
            mesh.lightSources.splice(0, 0, this._activeLight);
          }

          break;
        }
      }
    }

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);
    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);
    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, 1);
    var shadowGenerator = (_a = this._getFirstShadowLightForMesh(mesh)) === null || _a === void 0 ? void 0 : _a.getShadowGenerator();
    this._needAlphaBlending = true;

    if (shadowGenerator && shadowGenerator.getClassName && shadowGenerator.getClassName() === 'CascadedShadowGenerator') {
      var csg = shadowGenerator;
      this._needAlphaBlending = !csg.autoCalcDepthBounds;
    } // Attribs


    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, 1);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines);
      var shaderName = "shadowOnly";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "alpha", "shadowColor", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6"];
      var samplers = new Array();
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: 1
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: 1
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  ShadowOnlyMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Clip plane
      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      this._activeEffect.setFloat("alpha", this.alpha);

      this._activeEffect.setColor3("shadowColor", this.shadowColor);

      MaterialHelper.BindEyePosition(effect, scene);
    } // Lights


    if (scene.lightsEnabled) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, 1);

      var light = this._getFirstShadowLightForMesh(mesh);

      if (light) {
        // Make sure the uniforms for this light will be rebound for other materials using this light when rendering the current frame.
        // Indeed, there is an optimization in Light that binds the light uniforms only once per frame for a given light (if using ubo).
        // Doing this way assumes that all uses of this light are the same, meaning all parameters passed to Light._bindLlight
        // are the same, notably useSpecular. However, isReadyForSubMesh (see above) is passing false for this parameter, which may not be
        // the value the other materials may pass.
        light._renderId = -1;
      }
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE || defines["SHADOWCSM0"]) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  ShadowOnlyMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new ShadowOnlyMaterial(name, _this.getScene());
    }, this);
  };

  ShadowOnlyMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.ShadowOnlyMaterial";
    return serializationObject;
  };

  ShadowOnlyMaterial.prototype.getClassName = function () {
    return "ShadowOnlyMaterial";
  }; // Statics


  ShadowOnlyMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new ShadowOnlyMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  return ShadowOnlyMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.ShadowOnlyMaterial"] = ShadowOnlyMaterial;

var name$j = 'simplePixelShader';
var shader$i = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\nfloat glossiness=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}";
Effect.ShadersStore[name$j] = shader$i;

var name$k = 'simpleVertexShader';
var shader$j = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x == 0.)\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$k] = shader$j;

var SimpleMaterialDefines = function (_super) {
  __extends(SimpleMaterialDefines, _super);

  function SimpleMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return SimpleMaterialDefines;
}(MaterialDefines);

var SimpleMaterial = function (_super) {
  __extends(SimpleMaterial, _super);

  function SimpleMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  SimpleMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  SimpleMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  SimpleMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  SimpleMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new SimpleMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
          if (!this._diffuseTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.DIFFUSE = true;
          }
        }
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines);
      var shaderName = "simple";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vFogInfos", "vFogColor", "pointSize", "vDiffuseInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "diffuseMatrix"];
      var samplers = ["diffuseSampler"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this._maxSimultaneousLights - 1
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  SimpleMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this._diffuseTexture && MaterialFlags.DiffuseTextureEnabled) {
        this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);

        this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);

        this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility); // Lights


    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  SimpleMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0) {
      results.push(this._diffuseTexture);
    }

    return results;
  };

  SimpleMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTexture) {
      activeTextures.push(this._diffuseTexture);
    }

    return activeTextures;
  };

  SimpleMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this.diffuseTexture === texture) {
      return true;
    }

    return false;
  };

  SimpleMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this._diffuseTexture) {
      this._diffuseTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  SimpleMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new SimpleMaterial(name, _this.getScene());
    }, this);
  };

  SimpleMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.SimpleMaterial";
    return serializationObject;
  };

  SimpleMaterial.prototype.getClassName = function () {
    return "SimpleMaterial";
  }; // Statics


  SimpleMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new SimpleMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("diffuseTexture")], SimpleMaterial.prototype, "_diffuseTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], SimpleMaterial.prototype, "diffuseTexture", void 0);

  __decorate([serializeAsColor3("diffuse")], SimpleMaterial.prototype, "diffuseColor", void 0);

  __decorate([serialize("disableLighting")], SimpleMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], SimpleMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], SimpleMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], SimpleMaterial.prototype, "maxSimultaneousLights", void 0);

  return SimpleMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.SimpleMaterial"] = SimpleMaterial;

var name$l = 'skyPixelShader';
var shader$k = "precision highp float;\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\nuniform vec3 cameraPosition;\nuniform vec3 cameraOffset;\nuniform float luminance;\nuniform float turbidity;\nuniform float rayleigh;\nuniform float mieCoefficient;\nuniform float mieDirectionalG;\nuniform vec3 sunPosition;\n\n#include<fogFragmentDeclaration>\n\nconst float e=2.71828182845904523536028747135266249775724709369995957;\nconst float pi=3.141592653589793238462643383279502884197169;\nconst float n=1.0003;\nconst float N=2.545E25;\nconst float pn=0.035;\nconst vec3 lambda=vec3(680E-9,550E-9,450E-9);\nconst vec3 K=vec3(0.686,0.678,0.666);\nconst float v=4.0;\nconst float rayleighZenithLength=8.4E3;\nconst float mieZenithLength=1.25E3;\nconst vec3 up=vec3(0.0,1.0,0.0);\nconst float EE=1000.0;\nconst float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;\nconst float cutoffAngle=pi/1.95;\nconst float steepness=1.5;\nvec3 totalRayleigh(vec3 lambda)\n{\nreturn (8.0*pow(pi,3.0)*pow(pow(n,2.0)-1.0,2.0)*(6.0+3.0*pn))/(3.0*N*pow(lambda,vec3(4.0))*(6.0-7.0*pn));\n}\nvec3 simplifiedRayleigh()\n{\nreturn 0.0005/vec3(94,40,18);\n}\nfloat rayleighPhase(float cosTheta)\n{\nreturn (3.0/(16.0*pi))*(1.0+pow(cosTheta,2.0));\n}\nvec3 totalMie(vec3 lambda,vec3 K,float T)\n{\nfloat c=(0.2*T )*10E-18;\nreturn 0.434*c*pi*pow((2.0*pi)/lambda,vec3(v-2.0))*K;\n}\nfloat hgPhase(float cosTheta,float g)\n{\nreturn (1.0/(4.0*pi))*((1.0-pow(g,2.0))/pow(1.0-2.0*g*cosTheta+pow(g,2.0),1.5));\n}\nfloat sunIntensity(float zenithAngleCos)\n{\nreturn EE*max(0.0,1.0-exp((-(cutoffAngle-acos(zenithAngleCos))/steepness)));\n}\nfloat A=0.15;\nfloat B=0.50;\nfloat C=0.10;\nfloat D=0.20;\nfloat EEE=0.02;\nfloat F=0.30;\nfloat W=1000.0;\nvec3 Uncharted2Tonemap(vec3 x)\n{\nreturn ((x*(A*x+C*B)+D*EEE)/(x*(A*x+B)+D*F))-EEE/F;\n}\nvoid main(void) {\n\n#include<clipPlaneFragment>\n\nfloat sunfade=1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);\nfloat rayleighCoefficient=rayleigh-(1.0*(1.0-sunfade));\nvec3 sunDirection=normalize(sunPosition);\nfloat sunE=sunIntensity(dot(sunDirection,up));\nvec3 betaR=simplifiedRayleigh()*rayleighCoefficient;\nvec3 betaM=totalMie(lambda,K,turbidity)*mieCoefficient;\nfloat zenithAngle=acos(max(0.0,dot(up,normalize(vPositionW-cameraPosition+cameraOffset))));\nfloat sR=rayleighZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));\nfloat sM=mieZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));\nvec3 Fex=exp(-(betaR*sR+betaM*sM));\nfloat cosTheta=dot(normalize(vPositionW-cameraPosition),sunDirection);\nfloat rPhase=rayleighPhase(cosTheta*0.5+0.5);\nvec3 betaRTheta=betaR*rPhase;\nfloat mPhase=hgPhase(cosTheta,mieDirectionalG);\nvec3 betaMTheta=betaM*mPhase;\nvec3 Lin=pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*(1.0-Fex),vec3(1.5));\nLin*=mix(vec3(1.0),pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up,sunDirection),5.0),0.0,1.0));\nvec3 direction=normalize(vPositionW-cameraPosition);\nfloat theta=acos(direction.y);\nfloat phi=atan(direction.z,direction.x);\nvec2 uv=vec2(phi,theta)/vec2(2.0*pi,pi)+vec2(0.5,0.0);\nvec3 L0=vec3(0.1)*Fex;\nfloat sundisk=smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);\nL0+=(sunE*19000.0*Fex)*sundisk;\nvec3 whiteScale=1.0/Uncharted2Tonemap(vec3(W));\nvec3 texColor=(Lin+L0);\ntexColor*=0.04 ;\ntexColor+=vec3(0.0,0.001,0.0025)*0.3;\nfloat g_fMaxLuminance=1.0;\nfloat fLumScaled=0.1/luminance;\nfloat fLumCompressed=(fLumScaled*(1.0+(fLumScaled/(g_fMaxLuminance*g_fMaxLuminance))))/(1.0+fLumScaled);\nfloat ExposureBias=fLumCompressed;\nvec3 curr=Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);\n\n\n\nvec3 retColor=curr*whiteScale;\n\n\nfloat alpha=1.0;\n#ifdef VERTEXCOLOR\nretColor.rgb*=vColor.rgb;\n#endif\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n\nvec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);\n\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";
Effect.ShadersStore[name$l] = shader$k;

var name$m = 'skyVertexShader';
var shader$l = "precision highp float;\n\nattribute vec3 position;\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n\nuniform mat4 world;\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\nvoid main(void) {\ngl_Position=viewProjection*world*vec4(position,1.0);\nvec4 worldPos=world*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$m] = shader$l;

/** @hidden */

var SkyMaterialDefines = function (_super) {
  __extends(SkyMaterialDefines, _super);

  function SkyMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return SkyMaterialDefines;
}(MaterialDefines);
/**
 * This is the sky material which allows to create dynamic and texture free effects for skyboxes.
 * @see https://doc.babylonjs.com/extensions/sky
 */


var SkyMaterial = function (_super) {
  __extends(SkyMaterial, _super);
  /**
   * Instantiates a new sky material.
   * This material allows to create dynamic and texture free
   * effects for skyboxes by taking care of the atmosphere state.
   * @see https://doc.babylonjs.com/extensions/sky
   * @param name Define the name of the material in the scene
   * @param scene Define the scene the material belong to
   */


  function SkyMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;
    /**
     * Defines the overall luminance of sky in interval ]0, 1[.
     */


    _this.luminance = 1.0;
    /**
    * Defines the amount (scattering) of haze as opposed to molecules in atmosphere.
    */

    _this.turbidity = 10.0;
    /**
     * Defines the sky appearance (light intensity).
     */

    _this.rayleigh = 2.0;
    /**
     * Defines the mieCoefficient in interval [0, 0.1] which affects the property .mieDirectionalG.
     */

    _this.mieCoefficient = 0.005;
    /**
     * Defines the amount of haze particles following the Mie scattering theory.
     */

    _this.mieDirectionalG = 0.8;
    /**
     * Defines the distance of the sun according to the active scene camera.
     */

    _this.distance = 500;
    /**
     * Defines the sun inclination, in interval [-0.5, 0.5]. When the inclination is not 0, the sun is said
     * "inclined".
     */

    _this.inclination = 0.49;
    /**
     * Defines the solar azimuth in interval [0, 1]. The azimuth is the angle in the horizontal plan between
     * an object direction and a reference direction.
     */

    _this.azimuth = 0.25;
    /**
     * Defines the sun position in the sky on (x,y,z). If the property .useSunPosition is set to false, then
     * the property is overriden by the inclination and the azimuth and can be read at any moment.
     */

    _this.sunPosition = new Vector3(0, 100, 0);
    /**
     * Defines if the sun position should be computed (inclination and azimuth) according to the given
     * .sunPosition property.
     */

    _this.useSunPosition = false;
    /**
     * Defines an offset vector used to get a horizon offset.
     * @example skyMaterial.cameraOffset.y = camera.globalPosition.y // Set horizon relative to 0 on the Y axis
     */

    _this.cameraOffset = Vector3.Zero(); // Private members

    _this._cameraPosition = Vector3.Zero();
    return _this;
  }
  /**
   * Specifies if the material will require alpha blending
   * @returns a boolean specifying if alpha blending is needed
   */


  SkyMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };
  /**
   * Specifies if this material should be rendered in alpha test mode
   * @returns false as the sky material doesn't need alpha testing.
   */


  SkyMaterial.prototype.needAlphaTesting = function () {
    return false;
  };
  /**
   * Get the texture used for alpha test purpose.
   * @returns null as the sky material has no texture.
   */


  SkyMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  };
  /**
   * Get if the submesh is ready to be used and all its information available.
   * Child classes can use it to update shaders
   * @param mesh defines the mesh to check
   * @param subMesh defines which submesh to check
   * @param useInstances specifies that instances should be used
   * @returns a boolean indicating that the submesh is ready or not
   */


  SkyMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new SkyMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, false, defines); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, false); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      var shaderName = "sky";
      var join = defines.toString();
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, attribs, ["world", "viewProjection", "view", "vFogInfos", "vFogColor", "pointSize", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "luminance", "turbidity", "rayleigh", "mieCoefficient", "mieDirectionalG", "sunPosition", "cameraPosition", "cameraOffset"], [], join, fallbacks, this.onCompiled, this.onError), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };
  /**
   * Binds the submesh to this material by preparing the effect and shader to draw
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh containing the submesh
   * @param subMesh defines the submesh to bind the material to
   */


  SkyMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());

    if (this._mustRebind(scene, effect)) {
      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect); // Sky

    var camera = scene.activeCamera;

    if (camera) {
      var cameraWorldMatrix = camera.getWorldMatrix();
      this._cameraPosition.x = cameraWorldMatrix.m[12];
      this._cameraPosition.y = cameraWorldMatrix.m[13];
      this._cameraPosition.z = cameraWorldMatrix.m[14];

      this._activeEffect.setVector3("cameraPosition", this._cameraPosition);
    }

    this._activeEffect.setVector3("cameraOffset", this.cameraOffset);

    if (this.luminance > 0) {
      this._activeEffect.setFloat("luminance", this.luminance);
    }

    this._activeEffect.setFloat("turbidity", this.turbidity);

    this._activeEffect.setFloat("rayleigh", this.rayleigh);

    this._activeEffect.setFloat("mieCoefficient", this.mieCoefficient);

    this._activeEffect.setFloat("mieDirectionalG", this.mieDirectionalG);

    if (!this.useSunPosition) {
      var theta = Math.PI * (this.inclination - 0.5);
      var phi = 2 * Math.PI * (this.azimuth - 0.5);
      this.sunPosition.x = this.distance * Math.cos(phi);
      this.sunPosition.y = this.distance * Math.sin(phi) * Math.sin(theta);
      this.sunPosition.z = this.distance * Math.sin(phi) * Math.cos(theta);
    }

    this._activeEffect.setVector3("sunPosition", this.sunPosition);

    this._afterBind(mesh, this._activeEffect);
  };
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */


  SkyMaterial.prototype.getAnimatables = function () {
    return [];
  };
  /**
   * Disposes the material
   * @param forceDisposeEffect specifies if effects should be forcefully disposed
   */


  SkyMaterial.prototype.dispose = function (forceDisposeEffect) {
    _super.prototype.dispose.call(this, forceDisposeEffect);
  };
  /**
   * Makes a duplicate of the material, and gives it a new name
   * @param name defines the new name for the duplicated material
   * @returns the cloned material
   */


  SkyMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new SkyMaterial(name, _this.getScene());
    }, this);
  };
  /**
   * Serializes this material in a JSON representation
   * @returns the serialized material object
   */


  SkyMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.SkyMaterial";
    return serializationObject;
  };
  /**
   * Gets the current class name of the material e.g. "SkyMaterial"
   * Mainly use in serialization.
   * @returns the class name
   */


  SkyMaterial.prototype.getClassName = function () {
    return "SkyMaterial";
  };
  /**
   * Creates a sky material from parsed material data
   * @param source defines the JSON representation of the material
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a new sky material
   */


  SkyMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new SkyMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serialize()], SkyMaterial.prototype, "luminance", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "turbidity", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "rayleigh", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "mieCoefficient", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "mieDirectionalG", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "distance", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "inclination", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "azimuth", void 0);

  __decorate([serializeAsVector3()], SkyMaterial.prototype, "sunPosition", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "useSunPosition", void 0);

  __decorate([serialize()], SkyMaterial.prototype, "cameraOffset", void 0);

  return SkyMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.SkyMaterial"] = SkyMaterial;

var name$n = 'terrainPixelShader';
var shader$m = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform sampler2D textureSampler;\nuniform vec2 vTextureInfos;\nuniform sampler2D diffuse1Sampler;\nuniform sampler2D diffuse2Sampler;\nuniform sampler2D diffuse3Sampler;\nuniform vec2 diffuse1Infos;\nuniform vec2 diffuse2Infos;\nuniform vec2 diffuse3Infos;\n#endif\n#ifdef BUMP\nuniform sampler2D bump1Sampler;\nuniform sampler2D bump2Sampler;\nuniform sampler2D bump3Sampler;\n#endif\n\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\n\n#ifdef BUMP\n#extension GL_OES_standard_derivatives : enable\n\nmat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv)\n{\n\nvec3 dp1=dFdx(p);\nvec3 dp2=dFdy(p);\nvec2 duv1=dFdx(uv);\nvec2 duv2=dFdy(uv);\n\nvec3 dp2perp=cross(dp2,normal);\nvec3 dp1perp=cross(normal,dp1);\nvec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;\nvec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;\n\nfloat invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));\nreturn mat3(tangent*invmax,binormal*invmax,normal);\n}\nvec3 perturbNormal(vec3 viewDir,vec3 mixColor)\n{\nvec3 bump1Color=texture2D(bump1Sampler,vTextureUV*diffuse1Infos).xyz;\nvec3 bump2Color=texture2D(bump2Sampler,vTextureUV*diffuse2Infos).xyz;\nvec3 bump3Color=texture2D(bump3Sampler,vTextureUV*diffuse3Infos).xyz;\nbump1Color.rgb*=mixColor.r;\nbump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);\nvec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);\nmap=map*255./127.-128./127.;\nmat3 TBN=cotangent_frame(vNormalW*vTextureInfos.y,-viewDir,vTextureUV);\nreturn normalize(TBN*map);\n}\n#endif\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef DIFFUSE\nbaseColor=texture2D(textureSampler,vTextureUV);\n#if defined(BUMP) && defined(DIFFUSE)\nnormalW=perturbNormal(viewDirectionW,baseColor.rgb);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vTextureInfos.y;\nvec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);\nvec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);\nvec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);\ndiffuse1Color.rgb*=baseColor.r;\ndiffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);\nbaseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor*baseColor.rgb,0.0,1.0);\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";
Effect.ShadersStore[name$n] = shader$m;

var name$o = 'terrainVertexShader';
var shader$n = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform mat4 textureMatrix;\nuniform vec2 vTextureInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vTextureInfos.x == 0.)\n{\nvTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$o] = shader$n;

var TerrainMaterialDefines = function (_super) {
  __extends(TerrainMaterialDefines, _super);

  function TerrainMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSE = false;
    _this.BUMP = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.SPECULARTERM = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return TerrainMaterialDefines;
}(MaterialDefines);

var TerrainMaterial = function (_super) {
  __extends(TerrainMaterial, _super);

  function TerrainMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.diffuseColor = new Color3(1, 1, 1);
    _this.specularColor = new Color3(0, 0, 0);
    _this.specularPower = 64;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  TerrainMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  TerrainMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  TerrainMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  TerrainMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new TerrainMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (scene.texturesEnabled) {
      if (!this.mixTexture || !this.mixTexture.isReady()) {
        return false;
      }

      defines._needUVs = true;

      if (MaterialFlags.DiffuseTextureEnabled) {
        if (!this.diffuseTexture1 || !this.diffuseTexture1.isReady()) {
          return false;
        }

        if (!this.diffuseTexture2 || !this.diffuseTexture2.isReady()) {
          return false;
        }

        if (!this.diffuseTexture3 || !this.diffuseTexture3.isReady()) {
          return false;
        }

        defines.DIFFUSE = true;
      }

      if (this.bumpTexture1 && this.bumpTexture2 && this.bumpTexture3 && MaterialFlags.BumpTextureEnabled) {
        if (!this.bumpTexture1.isReady()) {
          return false;
        }

        if (!this.bumpTexture2.isReady()) {
          return false;
        }

        if (!this.bumpTexture3.isReady()) {
          return false;
        }

        defines._needNormals = true;
        defines.BUMP = true;
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "terrain";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor", "vFogInfos", "vFogColor", "pointSize", "vTextureInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "textureMatrix", "diffuse1Infos", "diffuse2Infos", "diffuse3Infos"];
      var samplers = ["textureSampler", "diffuse1Sampler", "diffuse2Sampler", "diffuse3Sampler", "bump1Sampler", "bump2Sampler", "bump3Sampler"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  TerrainMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this.mixTexture) {
        this._activeEffect.setTexture("textureSampler", this._mixTexture);

        this._activeEffect.setFloat2("vTextureInfos", this._mixTexture.coordinatesIndex, this._mixTexture.level);

        this._activeEffect.setMatrix("textureMatrix", this._mixTexture.getTextureMatrix());

        if (MaterialFlags.DiffuseTextureEnabled) {
          if (this._diffuseTexture1) {
            this._activeEffect.setTexture("diffuse1Sampler", this._diffuseTexture1);

            this._activeEffect.setFloat2("diffuse1Infos", this._diffuseTexture1.uScale, this._diffuseTexture1.vScale);
          }

          if (this._diffuseTexture2) {
            this._activeEffect.setTexture("diffuse2Sampler", this._diffuseTexture2);

            this._activeEffect.setFloat2("diffuse2Infos", this._diffuseTexture2.uScale, this._diffuseTexture2.vScale);
          }

          if (this._diffuseTexture3) {
            this._activeEffect.setTexture("diffuse3Sampler", this._diffuseTexture3);

            this._activeEffect.setFloat2("diffuse3Infos", this._diffuseTexture3.uScale, this._diffuseTexture3.vScale);
          }
        }

        if (MaterialFlags.BumpTextureEnabled && scene.getEngine().getCaps().standardDerivatives) {
          if (this._bumpTexture1) {
            this._activeEffect.setTexture("bump1Sampler", this._bumpTexture1);
          }

          if (this._bumpTexture2) {
            this._activeEffect.setTexture("bump2Sampler", this._bumpTexture2);
          }

          if (this._bumpTexture3) {
            this._activeEffect.setTexture("bump3Sampler", this._bumpTexture3);
          }
        }
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

    if (defines.SPECULARTERM) {
      this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
    }

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  TerrainMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.mixTexture && this.mixTexture.animations && this.mixTexture.animations.length > 0) {
      results.push(this.mixTexture);
    }

    return results;
  };

  TerrainMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._mixTexture) {
      activeTextures.push(this._mixTexture);
    }

    if (this._diffuseTexture1) {
      activeTextures.push(this._diffuseTexture1);
    }

    if (this._diffuseTexture2) {
      activeTextures.push(this._diffuseTexture2);
    }

    if (this._diffuseTexture3) {
      activeTextures.push(this._diffuseTexture3);
    }

    if (this._bumpTexture1) {
      activeTextures.push(this._bumpTexture1);
    }

    if (this._bumpTexture2) {
      activeTextures.push(this._bumpTexture2);
    }

    if (this._bumpTexture3) {
      activeTextures.push(this._bumpTexture3);
    }

    return activeTextures;
  };

  TerrainMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this._mixTexture === texture) {
      return true;
    }

    if (this._diffuseTexture1 === texture) {
      return true;
    }

    if (this._diffuseTexture2 === texture) {
      return true;
    }

    if (this._diffuseTexture3 === texture) {
      return true;
    }

    if (this._bumpTexture1 === texture) {
      return true;
    }

    if (this._bumpTexture2 === texture) {
      return true;
    }

    if (this._bumpTexture3 === texture) {
      return true;
    }

    return false;
  };

  TerrainMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.mixTexture) {
      this.mixTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  TerrainMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new TerrainMaterial(name, _this.getScene());
    }, this);
  };

  TerrainMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.TerrainMaterial";
    return serializationObject;
  };

  TerrainMaterial.prototype.getClassName = function () {
    return "TerrainMaterial";
  }; // Statics


  TerrainMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new TerrainMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture("mixTexture")], TerrainMaterial.prototype, "_mixTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "mixTexture", void 0);

  __decorate([serializeAsTexture("diffuseTexture1")], TerrainMaterial.prototype, "_diffuseTexture1", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "diffuseTexture1", void 0);

  __decorate([serializeAsTexture("diffuseTexture2")], TerrainMaterial.prototype, "_diffuseTexture2", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "diffuseTexture2", void 0);

  __decorate([serializeAsTexture("diffuseTexture3")], TerrainMaterial.prototype, "_diffuseTexture3", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "diffuseTexture3", void 0);

  __decorate([serializeAsTexture("bumpTexture1")], TerrainMaterial.prototype, "_bumpTexture1", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "bumpTexture1", void 0);

  __decorate([serializeAsTexture("bumpTexture2")], TerrainMaterial.prototype, "_bumpTexture2", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "bumpTexture2", void 0);

  __decorate([serializeAsTexture("bumpTexture3")], TerrainMaterial.prototype, "_bumpTexture3", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TerrainMaterial.prototype, "bumpTexture3", void 0);

  __decorate([serializeAsColor3()], TerrainMaterial.prototype, "diffuseColor", void 0);

  __decorate([serializeAsColor3()], TerrainMaterial.prototype, "specularColor", void 0);

  __decorate([serialize()], TerrainMaterial.prototype, "specularPower", void 0);

  __decorate([serialize("disableLighting")], TerrainMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], TerrainMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], TerrainMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], TerrainMaterial.prototype, "maxSimultaneousLights", void 0);

  return TerrainMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.TerrainMaterial"] = TerrainMaterial;

var name$p = 'triplanarPixelShader';
var shader$o = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\nuniform sampler2D diffuseSamplerX;\n#ifdef BUMPX\nuniform sampler2D normalSamplerX;\n#endif\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\nuniform sampler2D diffuseSamplerY;\n#ifdef BUMPY\nuniform sampler2D normalSamplerY;\n#endif\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\nuniform sampler2D diffuseSamplerZ;\n#ifdef BUMPZ\nuniform sampler2D normalSamplerZ;\n#endif\n#endif\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(0.,0.,0.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=tangentSpace[2];\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\nvec4 baseNormal=vec4(0.0,0.0,0.0,1.0);\nnormalW*=normalW;\n#ifdef DIFFUSEX\nbaseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;\n#ifdef BUMPX\nbaseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;\n#endif\n#endif\n#ifdef DIFFUSEY\nbaseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;\n#ifdef BUMPY\nbaseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;\n#endif\n#endif\n#ifdef DIFFUSEZ\nbaseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;\n#ifdef BUMPZ\nbaseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;\n#endif\n#endif\n#ifdef NORMAL\nnormalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n}\n";
Effect.ShadersStore[name$p] = shader$o;

var name$q = 'triplanarVertexShader';
var shader$p = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\n#endif\nuniform float tileSize;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void)\n{\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\ngl_Position=viewProjection*worldPos;\nvPositionW=vec3(worldPos);\n#ifdef DIFFUSEX\nvTextureUVX=worldPos.zy/tileSize;\n#endif\n#ifdef DIFFUSEY\nvTextureUVY=worldPos.xz/tileSize;\n#endif\n#ifdef DIFFUSEZ\nvTextureUVZ=worldPos.xy/tileSize;\n#endif\n#ifdef NORMAL\n\nvec3 xtan=vec3(0,0,1);\nvec3 xbin=vec3(0,1,0);\nvec3 ytan=vec3(1,0,0);\nvec3 ybin=vec3(0,0,1);\nvec3 ztan=vec3(1,0,0);\nvec3 zbin=vec3(0,1,0);\nvec3 normalizedNormal=normalize(normal);\nnormalizedNormal*=normalizedNormal;\nvec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);\nvec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);\nworldTangent=(world*vec4(worldTangent,1.0)).xyz;\nworldBinormal=(world*vec4(worldBinormal,1.0)).xyz;\nvec3 worldNormal=(world*vec4(normalize(normal),1.0)).xyz;\ntangentSpace[0]=worldTangent;\ntangentSpace[1]=worldBinormal;\ntangentSpace[2]=worldNormal;\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
Effect.ShadersStore[name$q] = shader$p;

var TriPlanarMaterialDefines = function (_super) {
  __extends(TriPlanarMaterialDefines, _super);

  function TriPlanarMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.DIFFUSEX = false;
    _this.DIFFUSEY = false;
    _this.DIFFUSEZ = false;
    _this.BUMPX = false;
    _this.BUMPY = false;
    _this.BUMPZ = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.SPECULARTERM = false;
    _this.NORMAL = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return TriPlanarMaterialDefines;
}(MaterialDefines);

var TriPlanarMaterial = function (_super) {
  __extends(TriPlanarMaterial, _super);

  function TriPlanarMaterial(name, scene) {
    var _this = _super.call(this, name, scene) || this;

    _this.tileSize = 1;
    _this.diffuseColor = new Color3(1, 1, 1);
    _this.specularColor = new Color3(0.2, 0.2, 0.2);
    _this.specularPower = 64;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    return _this;
  }

  TriPlanarMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  TriPlanarMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  TriPlanarMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  }; // Methods


  TriPlanarMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new TriPlanarMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      if (scene.texturesEnabled) {
        if (MaterialFlags.DiffuseTextureEnabled) {
          var textures = [this.diffuseTextureX, this.diffuseTextureY, this.diffuseTextureZ];
          var textureDefines = ["DIFFUSEX", "DIFFUSEY", "DIFFUSEZ"];

          for (var i = 0; i < textures.length; i++) {
            if (textures[i]) {
              if (!textures[i].isReady()) {
                return false;
              } else {
                defines[textureDefines[i]] = true;
              }
            }
          }
        }

        if (MaterialFlags.BumpTextureEnabled) {
          var textures = [this.normalTextureX, this.normalTextureY, this.normalTextureZ];
          var textureDefines = ["BUMPX", "BUMPY", "BUMPZ"];

          for (var i = 0; i < textures.length; i++) {
            if (textures[i]) {
              if (!textures[i].isReady()) {
                return false;
              } else {
                defines[textureDefines[i]] = true;
              }
            }
          }
        }
      }
    } // Misc.


    MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines); // Lights

    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting); // Values that need to be evaluated on every frame

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false); // Attribs

    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Get correct effect

    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      }

      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess; //Attributes

      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "triplanar";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor", "vFogInfos", "vFogColor", "pointSize", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "tileSize"];
      var samplers = ["diffuseSamplerX", "diffuseSamplerY", "diffuseSamplerZ", "normalSamplerX", "normalSamplerY", "normalSamplerZ"];
      var uniformBuffers = new Array();
      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this.maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  TriPlanarMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    this._activeEffect.setFloat("tileSize", this.tileSize);

    if (scene.getCachedMaterial() !== this) {
      // Textures
      if (this.diffuseTextureX) {
        this._activeEffect.setTexture("diffuseSamplerX", this.diffuseTextureX);
      }

      if (this.diffuseTextureY) {
        this._activeEffect.setTexture("diffuseSamplerY", this.diffuseTextureY);
      }

      if (this.diffuseTextureZ) {
        this._activeEffect.setTexture("diffuseSamplerZ", this.diffuseTextureZ);
      }

      if (this.normalTextureX) {
        this._activeEffect.setTexture("normalSamplerX", this.normalTextureX);
      }

      if (this.normalTextureY) {
        this._activeEffect.setTexture("normalSamplerY", this.normalTextureY);
      }

      if (this.normalTextureZ) {
        this._activeEffect.setTexture("normalSamplerZ", this.normalTextureZ);
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

    if (defines.SPECULARTERM) {
      this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
    }

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

    this._afterBind(mesh, this._activeEffect);
  };

  TriPlanarMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.mixTexture && this.mixTexture.animations && this.mixTexture.animations.length > 0) {
      results.push(this.mixTexture);
    }

    return results;
  };

  TriPlanarMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._diffuseTextureX) {
      activeTextures.push(this._diffuseTextureX);
    }

    if (this._diffuseTextureY) {
      activeTextures.push(this._diffuseTextureY);
    }

    if (this._diffuseTextureZ) {
      activeTextures.push(this._diffuseTextureZ);
    }

    if (this._normalTextureX) {
      activeTextures.push(this._normalTextureX);
    }

    if (this._normalTextureY) {
      activeTextures.push(this._normalTextureY);
    }

    if (this._normalTextureZ) {
      activeTextures.push(this._normalTextureZ);
    }

    return activeTextures;
  };

  TriPlanarMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this._diffuseTextureX === texture) {
      return true;
    }

    if (this._diffuseTextureY === texture) {
      return true;
    }

    if (this._diffuseTextureZ === texture) {
      return true;
    }

    if (this._normalTextureX === texture) {
      return true;
    }

    if (this._normalTextureY === texture) {
      return true;
    }

    if (this._normalTextureZ === texture) {
      return true;
    }

    return false;
  };

  TriPlanarMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.mixTexture) {
      this.mixTexture.dispose();
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  TriPlanarMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new TriPlanarMaterial(name, _this.getScene());
    }, this);
  };

  TriPlanarMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.TriPlanarMaterial";
    return serializationObject;
  };

  TriPlanarMaterial.prototype.getClassName = function () {
    return "TriPlanarMaterial";
  }; // Statics


  TriPlanarMaterial.Parse = function (source, scene, rootUrl) {
    return SerializationHelper.Parse(function () {
      return new TriPlanarMaterial(source.name, scene);
    }, source, scene, rootUrl);
  };

  __decorate([serializeAsTexture()], TriPlanarMaterial.prototype, "mixTexture", void 0);

  __decorate([serializeAsTexture("diffuseTextureX")], TriPlanarMaterial.prototype, "_diffuseTextureX", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "diffuseTextureX", void 0);

  __decorate([serializeAsTexture("diffuseTexturY")], TriPlanarMaterial.prototype, "_diffuseTextureY", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "diffuseTextureY", void 0);

  __decorate([serializeAsTexture("diffuseTextureZ")], TriPlanarMaterial.prototype, "_diffuseTextureZ", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "diffuseTextureZ", void 0);

  __decorate([serializeAsTexture("normalTextureX")], TriPlanarMaterial.prototype, "_normalTextureX", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "normalTextureX", void 0);

  __decorate([serializeAsTexture("normalTextureY")], TriPlanarMaterial.prototype, "_normalTextureY", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "normalTextureY", void 0);

  __decorate([serializeAsTexture("normalTextureZ")], TriPlanarMaterial.prototype, "_normalTextureZ", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], TriPlanarMaterial.prototype, "normalTextureZ", void 0);

  __decorate([serialize()], TriPlanarMaterial.prototype, "tileSize", void 0);

  __decorate([serializeAsColor3()], TriPlanarMaterial.prototype, "diffuseColor", void 0);

  __decorate([serializeAsColor3()], TriPlanarMaterial.prototype, "specularColor", void 0);

  __decorate([serialize()], TriPlanarMaterial.prototype, "specularPower", void 0);

  __decorate([serialize("disableLighting")], TriPlanarMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], TriPlanarMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], TriPlanarMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], TriPlanarMaterial.prototype, "maxSimultaneousLights", void 0);

  return TriPlanarMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.TriPlanarMaterial"] = TriPlanarMaterial;

var name$r = 'waterPixelShader';
var shader$q = "#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\nprecision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<helperFunctions>\n#include<imageProcessingDeclaration>\n#include<imageProcessingFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef BUMP\nvarying vec2 vNormalUV;\nvarying vec2 vNormalUV2;\nuniform sampler2D normalSampler;\nuniform vec2 vNormalInfos;\n#endif\nuniform sampler2D refractionSampler;\nuniform sampler2D reflectionSampler;\n\nconst float LOG2=1.442695;\nuniform vec3 cameraPosition;\nuniform vec4 waterColor;\nuniform float colorBlendFactor;\nuniform vec4 waterColor2;\nuniform float colorBlendFactor2;\nuniform float bumpHeight;\nuniform float time;\n\nvarying vec3 vRefractionMapTexCoord;\nvarying vec3 vReflectionMapTexCoord;\nvarying vec3 vPosition;\n#include<clipPlaneFragmentDeclaration>\n#include<logDepthDeclaration>\n\n#include<fogFragmentDeclaration>\nvoid main(void) {\n\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n\nfloat alpha=vDiffuseColor.a;\n#ifdef BUMP\n#ifdef BUMPSUPERIMPOSE\nbaseColor=0.6*texture2D(normalSampler,vNormalUV)+0.4*texture2D(normalSampler,vec2(vNormalUV2.x,vNormalUV2.y));\n#else\nbaseColor=texture2D(normalSampler,vNormalUV);\n#endif\nvec3 bumpColor=baseColor.rgb;\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\nbaseColor.rgb*=vNormalInfos.y;\n#else\nvec3 bumpColor=vec3(1.0);\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\n#ifdef NORMAL\nvec2 perturbation=bumpHeight*(baseColor.rg-0.5);\n#ifdef BUMPAFFECTSREFLECTION\nvec3 normalW=normalize(vNormalW+vec3(perturbation.x*8.0,0.0,perturbation.y*8.0));\nif (normalW.y<0.0) {\nnormalW.y=-normalW.y;\n}\n#else\nvec3 normalW=normalize(vNormalW);\n#endif\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\nvec2 perturbation=bumpHeight*(vec2(1.0,1.0)-0.5);\n#endif\n#ifdef FRESNELSEPARATE\n#ifdef REFLECTION\n\nvec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation*0.5,0.0,1.0);\nvec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);\n#ifdef IS_REFRACTION_LINEAR\nrefractiveColor.rgb=toGammaSpace(refractiveColor.rgb);\n#endif\nvec2 projectedReflectionTexCoords=clamp(vec2(\nvReflectionMapTexCoord.x/vReflectionMapTexCoord.z+perturbation.x*0.3,\nvReflectionMapTexCoord.y/vReflectionMapTexCoord.z+perturbation.y\n),0.0,1.0);\nvec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);\n#ifdef IS_REFLECTION_LINEAR\nreflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);\n#endif\nvec3 upVector=vec3(0.0,1.0,0.0);\nfloat fresnelTerm=clamp(abs(pow(dot(viewDirectionW,upVector),3.0)),0.05,0.65);\nfloat IfresnelTerm=1.0-fresnelTerm;\nrefractiveColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*refractiveColor;\nreflectiveColor=IfresnelTerm*colorBlendFactor2*waterColor+(1.0-colorBlendFactor2*IfresnelTerm)*reflectiveColor;\nvec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*IfresnelTerm;\nbaseColor=combinedColor;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\nvec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\n#else\n#ifdef REFLECTION\n\nvec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation,0.0,1.0);\nvec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);\n#ifdef IS_REFRACTION_LINEAR\nrefractiveColor.rgb=toGammaSpace(refractiveColor.rgb);\n#endif\nvec2 projectedReflectionTexCoords=clamp(vReflectionMapTexCoord.xy/vReflectionMapTexCoord.z+perturbation,0.0,1.0);\nvec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);\n#ifdef IS_REFLECTION_LINEAR\nreflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);\n#endif\nvec3 upVector=vec3(0.0,1.0,0.0);\nfloat fresnelTerm=max(dot(viewDirectionW,upVector),0.0);\nvec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*(1.0-fresnelTerm);\nbaseColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*combinedColor;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularBase=vec3(0.,0.,0.);\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\nvec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\n#endif\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<logDepthFragment>\n#include<fogFragment>\n\n\n#ifdef IMAGEPROCESSINGPOSTPROCESS\ncolor.rgb=toLinearSpace(color.rgb);\n#elif defined(IMAGEPROCESSING)\ncolor.rgb=toLinearSpace(color.rgb);\ncolor=applyImageProcessing(color);\n#endif\ngl_FragColor=color;\n}\n";
Effect.ShadersStore[name$r] = shader$q;

var name$s = 'waterVertexShader';
var shader$r = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef BUMP\nvarying vec2 vNormalUV;\n#ifdef BUMPSUPERIMPOSE\nvarying vec2 vNormalUV2;\n#endif\nuniform mat4 normalMatrix;\nuniform vec2 vNormalInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<logDepthDeclaration>\n\nuniform mat4 worldReflectionViewProjection;\nuniform vec2 windDirection;\nuniform float waveLength;\nuniform float time;\nuniform float windForce;\nuniform float waveHeight;\nuniform float waveSpeed;\nuniform float waveCount;\n\nvarying vec3 vPosition;\nvarying vec3 vRefractionMapTexCoord;\nvarying vec3 vReflectionMapTexCoord;\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef BUMP\nif (vNormalInfos.x == 0.)\n{\nvNormalUV=vec2(normalMatrix*vec4((uv*1.0)/waveLength+time*windForce*windDirection,1.0,0.0));\n#ifdef BUMPSUPERIMPOSE\nvNormalUV2=vec2(normalMatrix*vec4((uv*0.721)/waveLength+time*1.2*windForce*windDirection,1.0,0.0));\n#endif\n}\nelse\n{\nvNormalUV=vec2(normalMatrix*vec4((uv2*1.0)/waveLength+time*windForce*windDirection ,1.0,0.0));\n#ifdef BUMPSUPERIMPOSE\nvNormalUV2=vec2(normalMatrix*vec4((uv2*0.721)/waveLength+time*1.2*windForce*windDirection ,1.0,0.0));\n#endif\n}\n#endif\n\n#include<clipPlaneVertex>\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\nfloat finalWaveCount=1.0/(waveCount*0.5);\nvec3 p=position;\nfloat newY=(sin(((p.x/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.x*5.0)\n+(cos(((p.z/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.y*5.0);\np.y+=abs(newY);\ngl_Position=viewProjection*finalWorld*vec4(p,1.0);\n#ifdef REFLECTION\nworldPos=viewProjection*finalWorld*vec4(p,1.0);\n\nvPosition=position;\nvRefractionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);\nvRefractionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);\nvRefractionMapTexCoord.z=worldPos.w;\nworldPos=worldReflectionViewProjection*vec4(position,1.0);\nvReflectionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);\nvReflectionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);\nvReflectionMapTexCoord.z=worldPos.w;\n#endif\n#include<logDepthVertex>\n}\n";
Effect.ShadersStore[name$s] = shader$r;

var WaterMaterialDefines = function (_super) {
  __extends(WaterMaterialDefines, _super);

  function WaterMaterialDefines() {
    var _this = _super.call(this) || this;

    _this.BUMP = false;
    _this.REFLECTION = false;
    _this.CLIPPLANE = false;
    _this.CLIPPLANE2 = false;
    _this.CLIPPLANE3 = false;
    _this.CLIPPLANE4 = false;
    _this.CLIPPLANE5 = false;
    _this.CLIPPLANE6 = false;
    _this.ALPHATEST = false;
    _this.DEPTHPREPASS = false;
    _this.POINTSIZE = false;
    _this.FOG = false;
    _this.NORMAL = false;
    _this.UV1 = false;
    _this.UV2 = false;
    _this.VERTEXCOLOR = false;
    _this.VERTEXALPHA = false;
    _this.NUM_BONE_INFLUENCERS = 0;
    _this.BonesPerMesh = 0;
    _this.INSTANCES = false;
    _this.SPECULARTERM = false;
    _this.LOGARITHMICDEPTH = false;
    _this.FRESNELSEPARATE = false;
    _this.BUMPSUPERIMPOSE = false;
    _this.BUMPAFFECTSREFLECTION = false;
    _this.IMAGEPROCESSING = false;
    _this.VIGNETTE = false;
    _this.VIGNETTEBLENDMODEMULTIPLY = false;
    _this.VIGNETTEBLENDMODEOPAQUE = false;
    _this.TONEMAPPING = false;
    _this.TONEMAPPING_ACES = false;
    _this.CONTRAST = false;
    _this.EXPOSURE = false;
    _this.COLORCURVES = false;
    _this.COLORGRADING = false;
    _this.COLORGRADING3D = false;
    _this.SAMPLER3DGREENDEPTH = false;
    _this.SAMPLER3DBGRMAP = false;
    _this.IMAGEPROCESSINGPOSTPROCESS = false;

    _this.rebuild();

    return _this;
  }

  return WaterMaterialDefines;
}(MaterialDefines);

var WaterMaterial = function (_super) {
  __extends(WaterMaterial, _super);
  /**
  * Constructor
  */


  function WaterMaterial(name, scene, renderTargetSize) {
    if (renderTargetSize === void 0) {
      renderTargetSize = new Vector2(512, 512);
    }

    var _this = _super.call(this, name, scene) || this;

    _this.renderTargetSize = renderTargetSize;
    _this.diffuseColor = new Color3(1, 1, 1);
    _this.specularColor = new Color3(0, 0, 0);
    _this.specularPower = 64;
    _this._disableLighting = false;
    _this._maxSimultaneousLights = 4;
    /**
     * Defines the wind force.
     */

    _this.windForce = 6;
    /**
     * Defines the direction of the wind in the plane (X, Z).
     */

    _this.windDirection = new Vector2(0, 1);
    /**
     * Defines the height of the waves.
     */

    _this.waveHeight = 0.4;
    /**
     * Defines the bump height related to the bump map.
     */

    _this.bumpHeight = 0.4;
    /**
     * Defines wether or not: to add a smaller moving bump to less steady waves.
     */

    _this._bumpSuperimpose = false;
    /**
     * Defines wether or not color refraction and reflection differently with .waterColor2 and .colorBlendFactor2. Non-linear (physically correct) fresnel.
     */

    _this._fresnelSeparate = false;
    /**
     * Defines wether or not bump Wwves modify the reflection.
     */

    _this._bumpAffectsReflection = false;
    /**
     * Defines the water color blended with the refraction (near).
     */

    _this.waterColor = new Color3(0.1, 0.1, 0.6);
    /**
     * Defines the blend factor related to the water color.
     */

    _this.colorBlendFactor = 0.2;
    /**
     * Defines the water color blended with the reflection (far).
     */

    _this.waterColor2 = new Color3(0.1, 0.1, 0.6);
    /**
     * Defines the blend factor related to the water color (reflection, far).
     */

    _this.colorBlendFactor2 = 0.2;
    /**
     * Defines the maximum length of a wave.
     */

    _this.waveLength = 0.1;
    /**
     * Defines the waves speed.
     */

    _this.waveSpeed = 1.0;
    /**
     * Defines the number of times waves are repeated. This is typically used to adjust waves count according to the ground's size where the material is applied on.
     */

    _this.waveCount = 20;
    /**
     * Sets or gets whether or not automatic clipping should be enabled or not. Setting to true will save performances and
     * will avoid calculating useless pixels in the pixel shader of the water material.
     */

    _this.disableClipPlane = false;
    _this._renderTargets = new SmartArray(16);
    /*
    * Private members
    */

    _this._mesh = null;
    _this._reflectionTransform = Matrix.Zero();
    _this._lastTime = 0;
    _this._lastDeltaTime = 0;

    _this._createRenderTargets(scene, renderTargetSize); // Create render targets


    _this.getRenderTargetTextures = function () {
      _this._renderTargets.reset();

      _this._renderTargets.push(_this._reflectionRTT);

      _this._renderTargets.push(_this._refractionRTT);

      return _this._renderTargets;
    };

    _this._imageProcessingConfiguration = _this.getScene().imageProcessingConfiguration;

    if (_this._imageProcessingConfiguration) {
      _this._imageProcessingObserver = _this._imageProcessingConfiguration.onUpdateParameters.add(function () {
        _this._markAllSubMeshesAsImageProcessingDirty();
      });
    }

    return _this;
  }

  Object.defineProperty(WaterMaterial.prototype, "hasRenderTargetTextures", {
    /**
     * Gets a boolean indicating that current material needs to register RTT
     */
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WaterMaterial.prototype, "useLogarithmicDepth", {
    get: function () {
      return this._useLogarithmicDepth;
    },
    set: function (value) {
      this._useLogarithmicDepth = value && this.getScene().getEngine().getCaps().fragmentDepthSupported;

      this._markAllSubMeshesAsMiscDirty();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WaterMaterial.prototype, "refractionTexture", {
    // Get / Set
    get: function () {
      return this._refractionRTT;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WaterMaterial.prototype, "reflectionTexture", {
    get: function () {
      return this._reflectionRTT;
    },
    enumerable: false,
    configurable: true
  }); // Methods

  WaterMaterial.prototype.addToRenderList = function (node) {
    if (this._refractionRTT && this._refractionRTT.renderList) {
      this._refractionRTT.renderList.push(node);
    }

    if (this._reflectionRTT && this._reflectionRTT.renderList) {
      this._reflectionRTT.renderList.push(node);
    }
  };

  WaterMaterial.prototype.enableRenderTargets = function (enable) {
    var refreshRate = enable ? 1 : 0;

    if (this._refractionRTT) {
      this._refractionRTT.refreshRate = refreshRate;
    }

    if (this._reflectionRTT) {
      this._reflectionRTT.refreshRate = refreshRate;
    }
  };

  WaterMaterial.prototype.getRenderList = function () {
    return this._refractionRTT ? this._refractionRTT.renderList : [];
  };

  Object.defineProperty(WaterMaterial.prototype, "renderTargetsEnabled", {
    get: function () {
      return !(this._refractionRTT && this._refractionRTT.refreshRate === 0);
    },
    enumerable: false,
    configurable: true
  });

  WaterMaterial.prototype.needAlphaBlending = function () {
    return this.alpha < 1.0;
  };

  WaterMaterial.prototype.needAlphaTesting = function () {
    return false;
  };

  WaterMaterial.prototype.getAlphaTestTexture = function () {
    return null;
  };

  WaterMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
    if (this.isFrozen) {
      if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
        return true;
      }
    }

    if (!subMesh._materialDefines) {
      subMesh._materialDefines = new WaterMaterialDefines();
    }

    var defines = subMesh._materialDefines;
    var scene = this.getScene();

    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }

    var engine = scene.getEngine(); // Textures

    if (defines._areTexturesDirty) {
      defines._needUVs = false;

      if (scene.texturesEnabled) {
        if (this.bumpTexture && MaterialFlags.BumpTextureEnabled) {
          if (!this.bumpTexture.isReady()) {
            return false;
          } else {
            defines._needUVs = true;
            defines.BUMP = true;
          }
        }

        if (MaterialFlags.ReflectionTextureEnabled) {
          defines.REFLECTION = true;
        }
      }
    }

    MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);
    MaterialHelper.PrepareDefinesForMisc(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);

    if (defines._areMiscDirty) {
      if (this._fresnelSeparate) {
        defines.FRESNELSEPARATE = true;
      }

      if (this._bumpSuperimpose) {
        defines.BUMPSUPERIMPOSE = true;
      }

      if (this._bumpAffectsReflection) {
        defines.BUMPAFFECTSREFLECTION = true;
      }
    } // Lights


    defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, true, this._maxSimultaneousLights, this._disableLighting); // Image processing

    if (defines._areImageProcessingDirty && this._imageProcessingConfiguration) {
      if (!this._imageProcessingConfiguration.isReady()) {
        return false;
      }

      this._imageProcessingConfiguration.prepareDefines(defines);

      defines.IS_REFLECTION_LINEAR = this.reflectionTexture != null && !this.reflectionTexture.gammaSpace;
      defines.IS_REFRACTION_LINEAR = this.refractionTexture != null && !this.refractionTexture.gammaSpace;
    } // Attribs


    MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true); // Configure this

    this._mesh = mesh;

    if (this._waitingRenderList) {
      for (var i = 0; i < this._waitingRenderList.length; i++) {
        this.addToRenderList(scene.getNodeByID(this._waitingRenderList[i]));
      }

      this._waitingRenderList = null;
    } // Get correct effect


    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial(); // Fallbacks

      var fallbacks = new EffectFallbacks();

      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }

      if (defines.LOGARITHMICDEPTH) {
        fallbacks.addFallback(0, "LOGARITHMICDEPTH");
      }

      MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

      if (defines.NUM_BONE_INFLUENCERS > 0) {
        fallbacks.addCPUSkinningFallback(0, mesh);
      } //Attributes


      var attribs = [VertexBuffer.PositionKind];

      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }

      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }

      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }

      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }

      MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
      MaterialHelper.PrepareAttributesForInstances(attribs, defines); // Legacy browser patch

      var shaderName = "water";
      var join = defines.toString();
      var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor", "vFogInfos", "vFogColor", "pointSize", "vNormalInfos", "mBones", "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "vClipPlane5", "vClipPlane6", "normalMatrix", "logarithmicDepthConstant", // Water
      "worldReflectionViewProjection", "windDirection", "waveLength", "time", "windForce", "cameraPosition", "bumpHeight", "waveHeight", "waterColor", "waterColor2", "colorBlendFactor", "colorBlendFactor2", "waveSpeed", "waveCount"];
      var samplers = ["normalSampler", // Water
      "refractionSampler", "reflectionSampler"];
      var uniformBuffers = new Array();

      if (ImageProcessingConfiguration) {
        ImageProcessingConfiguration.PrepareUniforms(uniforms, defines);
        ImageProcessingConfiguration.PrepareSamplers(samplers, defines);
      }

      MaterialHelper.PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: defines,
        maxSimultaneousLights: this.maxSimultaneousLights
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers: samplers,
        defines: join,
        fallbacks: fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: {
          maxSimultaneousLights: this._maxSimultaneousLights
        }
      }, engine), defines);
    }

    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }

    defines._renderId = scene.getRenderId();
    subMesh.effect._wasPreviouslyReady = true;
    return true;
  };

  WaterMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
    var scene = this.getScene();
    var defines = subMesh._materialDefines;

    if (!defines) {
      return;
    }

    var effect = subMesh.effect;

    if (!effect || !this._mesh) {
      return;
    }

    this._activeEffect = effect; // Matrices

    this.bindOnlyWorldMatrix(world);

    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix()); // Bones


    MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

    if (this._mustRebind(scene, effect)) {
      // Textures
      if (this.bumpTexture && MaterialFlags.BumpTextureEnabled) {
        this._activeEffect.setTexture("normalSampler", this.bumpTexture);

        this._activeEffect.setFloat2("vNormalInfos", this.bumpTexture.coordinatesIndex, this.bumpTexture.level);

        this._activeEffect.setMatrix("normalMatrix", this.bumpTexture.getTextureMatrix());
      } // Clip plane


      MaterialHelper.BindClipPlane(this._activeEffect, scene); // Point size

      if (this.pointsCloud) {
        this._activeEffect.setFloat("pointSize", this.pointSize);
      }

      MaterialHelper.BindEyePosition(effect, scene);
    }

    this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

    if (defines.SPECULARTERM) {
      this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
    }

    if (scene.lightsEnabled && !this.disableLighting) {
      MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
    } // View


    if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
      this._activeEffect.setMatrix("view", scene.getViewMatrix());
    } // Fog


    MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect); // Log. depth

    MaterialHelper.BindLogDepth(defines, this._activeEffect, scene); // Water

    if (MaterialFlags.ReflectionTextureEnabled) {
      this._activeEffect.setTexture("refractionSampler", this._refractionRTT);

      this._activeEffect.setTexture("reflectionSampler", this._reflectionRTT);
    }

    var wrvp = this._mesh.getWorldMatrix().multiply(this._reflectionTransform).multiply(scene.getProjectionMatrix()); // Add delta time. Prevent adding delta time if it hasn't changed.


    var deltaTime = scene.getEngine().getDeltaTime();

    if (deltaTime !== this._lastDeltaTime) {
      this._lastDeltaTime = deltaTime;
      this._lastTime += this._lastDeltaTime;
    }

    this._activeEffect.setMatrix("worldReflectionViewProjection", wrvp);

    this._activeEffect.setVector2("windDirection", this.windDirection);

    this._activeEffect.setFloat("waveLength", this.waveLength);

    this._activeEffect.setFloat("time", this._lastTime / 100000);

    this._activeEffect.setFloat("windForce", this.windForce);

    this._activeEffect.setFloat("waveHeight", this.waveHeight);

    this._activeEffect.setFloat("bumpHeight", this.bumpHeight);

    this._activeEffect.setColor4("waterColor", this.waterColor, 1.0);

    this._activeEffect.setFloat("colorBlendFactor", this.colorBlendFactor);

    this._activeEffect.setColor4("waterColor2", this.waterColor2, 1.0);

    this._activeEffect.setFloat("colorBlendFactor2", this.colorBlendFactor2);

    this._activeEffect.setFloat("waveSpeed", this.waveSpeed);

    this._activeEffect.setFloat("waveCount", this.waveCount); // image processing


    if (this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess) {
      this._imageProcessingConfiguration.bind(this._activeEffect);
    }

    this._afterBind(mesh, this._activeEffect);
  };

  WaterMaterial.prototype._createRenderTargets = function (scene, renderTargetSize) {
    var _this = this; // Render targets


    this._refractionRTT = new RenderTargetTexture(name + "_refraction", {
      width: renderTargetSize.x,
      height: renderTargetSize.y
    }, scene, false, true);
    this._refractionRTT.wrapU = Constants.TEXTURE_MIRROR_ADDRESSMODE;
    this._refractionRTT.wrapV = Constants.TEXTURE_MIRROR_ADDRESSMODE;
    this._refractionRTT.ignoreCameraViewport = true;
    this._reflectionRTT = new RenderTargetTexture(name + "_reflection", {
      width: renderTargetSize.x,
      height: renderTargetSize.y
    }, scene, false, true);
    this._reflectionRTT.wrapU = Constants.TEXTURE_MIRROR_ADDRESSMODE;
    this._reflectionRTT.wrapV = Constants.TEXTURE_MIRROR_ADDRESSMODE;
    this._reflectionRTT.ignoreCameraViewport = true;
    var isVisible;
    var clipPlane = null;
    var savedViewMatrix;
    var mirrorMatrix = Matrix.Zero();

    this._refractionRTT.onBeforeRender = function () {
      if (_this._mesh) {
        isVisible = _this._mesh.isVisible;
        _this._mesh.isVisible = false;
      } // Clip plane


      if (!_this.disableClipPlane) {
        clipPlane = scene.clipPlane;
        var positiony = _this._mesh ? _this._mesh.position.y : 0.0;
        scene.clipPlane = Plane.FromPositionAndNormal(new Vector3(0, positiony + 0.05, 0), new Vector3(0, 1, 0));
      }
    };

    this._refractionRTT.onAfterRender = function () {
      if (_this._mesh) {
        _this._mesh.isVisible = isVisible;
      } // Clip plane


      if (!_this.disableClipPlane) {
        scene.clipPlane = clipPlane;
      }
    };

    this._reflectionRTT.onBeforeRender = function () {
      if (_this._mesh) {
        isVisible = _this._mesh.isVisible;
        _this._mesh.isVisible = false;
      } // Clip plane


      if (!_this.disableClipPlane) {
        clipPlane = scene.clipPlane;
        var positiony = _this._mesh ? _this._mesh.position.y : 0.0;
        scene.clipPlane = Plane.FromPositionAndNormal(new Vector3(0, positiony - 0.05, 0), new Vector3(0, -1, 0));
        Matrix.ReflectionToRef(scene.clipPlane, mirrorMatrix);
      } // Transform


      savedViewMatrix = scene.getViewMatrix();
      mirrorMatrix.multiplyToRef(savedViewMatrix, _this._reflectionTransform);
      scene.setTransformMatrix(_this._reflectionTransform, scene.getProjectionMatrix());
      scene.getEngine().cullBackFaces = false;
      scene._mirroredCameraPosition = Vector3.TransformCoordinates(scene.activeCamera.position, mirrorMatrix);
    };

    this._reflectionRTT.onAfterRender = function () {
      if (_this._mesh) {
        _this._mesh.isVisible = isVisible;
      } // Clip plane


      scene.clipPlane = clipPlane; // Transform

      scene.setTransformMatrix(savedViewMatrix, scene.getProjectionMatrix());
      scene.getEngine().cullBackFaces = true;
      scene._mirroredCameraPosition = null;
    };
  };

  WaterMaterial.prototype.getAnimatables = function () {
    var results = [];

    if (this.bumpTexture && this.bumpTexture.animations && this.bumpTexture.animations.length > 0) {
      results.push(this.bumpTexture);
    }

    if (this._reflectionRTT && this._reflectionRTT.animations && this._reflectionRTT.animations.length > 0) {
      results.push(this._reflectionRTT);
    }

    if (this._refractionRTT && this._refractionRTT.animations && this._refractionRTT.animations.length > 0) {
      results.push(this._refractionRTT);
    }

    return results;
  };

  WaterMaterial.prototype.getActiveTextures = function () {
    var activeTextures = _super.prototype.getActiveTextures.call(this);

    if (this._bumpTexture) {
      activeTextures.push(this._bumpTexture);
    }

    return activeTextures;
  };

  WaterMaterial.prototype.hasTexture = function (texture) {
    if (_super.prototype.hasTexture.call(this, texture)) {
      return true;
    }

    if (this._bumpTexture === texture) {
      return true;
    }

    return false;
  };

  WaterMaterial.prototype.dispose = function (forceDisposeEffect) {
    if (this.bumpTexture) {
      this.bumpTexture.dispose();
    }

    var index = this.getScene().customRenderTargets.indexOf(this._refractionRTT);

    if (index != -1) {
      this.getScene().customRenderTargets.splice(index, 1);
    }

    index = -1;
    index = this.getScene().customRenderTargets.indexOf(this._reflectionRTT);

    if (index != -1) {
      this.getScene().customRenderTargets.splice(index, 1);
    }

    if (this._reflectionRTT) {
      this._reflectionRTT.dispose();
    }

    if (this._refractionRTT) {
      this._refractionRTT.dispose();
    } // Remove image-processing observer


    if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
      this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
    }

    _super.prototype.dispose.call(this, forceDisposeEffect);
  };

  WaterMaterial.prototype.clone = function (name) {
    var _this = this;

    return SerializationHelper.Clone(function () {
      return new WaterMaterial(name, _this.getScene());
    }, this);
  };

  WaterMaterial.prototype.serialize = function () {
    var serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.WaterMaterial";
    serializationObject.renderList = [];

    if (this._refractionRTT && this._refractionRTT.renderList) {
      for (var i = 0; i < this._refractionRTT.renderList.length; i++) {
        serializationObject.renderList.push(this._refractionRTT.renderList[i].id);
      }
    }

    return serializationObject;
  };

  WaterMaterial.prototype.getClassName = function () {
    return "WaterMaterial";
  }; // Statics


  WaterMaterial.Parse = function (source, scene, rootUrl) {
    var mat = SerializationHelper.Parse(function () {
      return new WaterMaterial(source.name, scene);
    }, source, scene, rootUrl);
    mat._waitingRenderList = source.renderList;
    return mat;
  };

  WaterMaterial.CreateDefaultMesh = function (name, scene) {
    var mesh = Mesh.CreateGround(name, 512, 512, 32, scene, false);
    return mesh;
  };

  __decorate([serializeAsTexture("bumpTexture")], WaterMaterial.prototype, "_bumpTexture", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsTexturesDirty")], WaterMaterial.prototype, "bumpTexture", void 0);

  __decorate([serializeAsColor3()], WaterMaterial.prototype, "diffuseColor", void 0);

  __decorate([serializeAsColor3()], WaterMaterial.prototype, "specularColor", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "specularPower", void 0);

  __decorate([serialize("disableLighting")], WaterMaterial.prototype, "_disableLighting", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], WaterMaterial.prototype, "disableLighting", void 0);

  __decorate([serialize("maxSimultaneousLights")], WaterMaterial.prototype, "_maxSimultaneousLights", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsLightsDirty")], WaterMaterial.prototype, "maxSimultaneousLights", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "windForce", void 0);

  __decorate([serializeAsVector2()], WaterMaterial.prototype, "windDirection", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "waveHeight", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "bumpHeight", void 0);

  __decorate([serialize("bumpSuperimpose")], WaterMaterial.prototype, "_bumpSuperimpose", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsMiscDirty")], WaterMaterial.prototype, "bumpSuperimpose", void 0);

  __decorate([serialize("fresnelSeparate")], WaterMaterial.prototype, "_fresnelSeparate", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsMiscDirty")], WaterMaterial.prototype, "fresnelSeparate", void 0);

  __decorate([serialize("bumpAffectsReflection")], WaterMaterial.prototype, "_bumpAffectsReflection", void 0);

  __decorate([expandToProperty("_markAllSubMeshesAsMiscDirty")], WaterMaterial.prototype, "bumpAffectsReflection", void 0);

  __decorate([serializeAsColor3()], WaterMaterial.prototype, "waterColor", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "colorBlendFactor", void 0);

  __decorate([serializeAsColor3()], WaterMaterial.prototype, "waterColor2", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "colorBlendFactor2", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "waveLength", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "waveSpeed", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "waveCount", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "disableClipPlane", void 0);

  __decorate([serialize()], WaterMaterial.prototype, "useLogarithmicDepth", null);

  return WaterMaterial;
}(PushMaterial);
_TypeStore.RegisteredTypes["BABYLON.WaterMaterial"] = WaterMaterial;

export { ShadowOnlyMaterial };
