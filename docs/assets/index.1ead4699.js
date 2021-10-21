import{ag as E,_ as C,ah as I,l as S,ai as y,aj as f,ak as N,w as h,aa as O,al as T,am as a,an as P,ao as v,ap as F,aq as c,ar as b,as as R,g as D,k as re,at as oe,K as ae,au as G,f as V,V as A,av as se,aw as U,d as fe,Q as $,e as q,ax as le,M as W,ay as H,a6 as Q,n as B,az as J,aA as ue,aB as de,o as ce,A as ve,aC as he,aD as ee,aE as z,p as pe,aF as me,H as ge,ae as X,af as ie,ad as k}from"./vendor.a6be2030.js";import{C as xe}from"./cannon.df6abc6b.js";var _e="cellPixelShader",Te=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>

vec3 computeCustomDiffuseLighting(lightingInfo info,vec3 diffuseBase,float shadow)
{
diffuseBase=info.diffuse*shadow;
#ifdef CELLBASIC
float level=1.0;
if (info.ndl<0.5)
level=0.5;
diffuseBase.rgb*vec3(level,level,level);
#else
float ToonThresholds[4];
ToonThresholds[0]=0.95;
ToonThresholds[1]=0.5;
ToonThresholds[2]=0.2;
ToonThresholds[3]=0.03;
float ToonBrightnessLevels[5];
ToonBrightnessLevels[0]=1.0;
ToonBrightnessLevels[1]=0.8;
ToonBrightnessLevels[2]=0.6;
ToonBrightnessLevels[3]=0.35;
ToonBrightnessLevels[4]=0.2;
if (info.ndl>ToonThresholds[0])
{
diffuseBase.rgb*=ToonBrightnessLevels[0];
}
else if (info.ndl>ToonThresholds[1])
{
diffuseBase.rgb*=ToonBrightnessLevels[1];
}
else if (info.ndl>ToonThresholds[2])
{
diffuseBase.rgb*=ToonBrightnessLevels[2];
}
else if (info.ndl>ToonThresholds[3])
{
diffuseBase.rgb*=ToonBrightnessLevels[3];
}
else
{
diffuseBase.rgb*=ToonBrightnessLevels[4];
}
#endif
return max(diffuseBase,vec3(0.2));
}
void main(void)
{
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif

lightingInfo info;
vec3 diffuseBase=vec3(0.,0.,0.);
float shadow=1.;
float glossiness=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;

vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[_e]=Te;var Pe="cellVertexShader",Se=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[Pe]=Se;var Ce=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.NDOTL=!0,e.CUSTOMUSERLIGHTING=!0,e.CELLBASIC=!0,e.DEPTHPREPASS=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),Ee=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r._computeHighLevel=!1,r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Ce);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&y.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.CELLBASIC=!this.computeHighLevel,f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="cell",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],g=["diffuseSampler"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights-1}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this._diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this._maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},t.prototype.hasTexture=function(e){return l.prototype.hasTexture.call(this,e)?!0:this._diffuseTexture===e},t.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.getClassName=function(){return"CellMaterial"},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.CellMaterial",e},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([F("diffuse")],t.prototype,"diffuseColor",void 0),a([c("computeHighLevel")],t.prototype,"_computeHighLevel",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"computeHighLevel",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.CellMaterial",Ee);var ye=function(){function l(){}return l}(),Le=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.CustomParts=new ye,r.customShaderNameResolve=r.Builder,r.FragmentShader=D.ShadersStore.defaultPixelShader,r.VertexShader=D.ShadersStore.defaultVertexShader,r}return t.prototype.AttachAfterBind=function(e,n){if(this._newUniformInstances)for(var r in this._newUniformInstances){var i=r.toString().split("-");i[0]=="vec2"?n.setVector2(i[1],this._newUniformInstances[r]):i[0]=="vec3"?n.setVector3(i[1],this._newUniformInstances[r]):i[0]=="vec4"?n.setVector4(i[1],this._newUniformInstances[r]):i[0]=="mat4"?n.setMatrix(i[1],this._newUniformInstances[r]):i[0]=="float"&&n.setFloat(i[1],this._newUniformInstances[r])}if(this._newSamplerInstances)for(var r in this._newSamplerInstances){var i=r.toString().split("-");i[0]=="sampler2D"&&this._newSamplerInstances[r].isReady&&this._newSamplerInstances[r].isReady()&&n.setTexture(i[1],this._newSamplerInstances[r])}},t.prototype.ReviewUniform=function(e,n){if(e=="uniform"&&this._newUniforms)for(var r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")==-1&&n.push(this._newUniforms[r]);if(e=="sampler"&&this._newUniforms)for(var r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")!=-1&&n.push(this._newUniforms[r]);return n},t.prototype.Builder=function(e,n,r,i,o,s){var d=this;if(s&&this._customAttributes&&this._customAttributes.length>0&&s.push.apply(s,this._customAttributes),this.ReviewUniform("uniform",n),this.ReviewUniform("sampler",i),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,t.ShaderIndexer++;var u="custom_"+t.ShaderIndexer,p=this._afterBind.bind(this);return this._afterBind=function(m,x){if(!!x){d.AttachAfterBind(m,x);try{p(m,x)}catch{}}},D.ShadersStore[u+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(D.ShadersStore[u+"VertexShader"]=D.ShadersStore[u+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),D.ShadersStore[u+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE",this.CustomParts.Fragment_Custom_Diffuse?this.CustomParts.Fragment_Custom_Diffuse:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&(D.ShadersStore[u+"PixelShader"]=D.ShadersStore[u+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=u,u},t.prototype.AddUniform=function(e,n,r){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),r&&(n.indexOf("sampler")!=-1?this._newSamplerInstances[n+"-"+e]=r:this._newUniformInstances[n+"-"+e]=r),this._customUniform.push("uniform "+n+" "+e+";"),this._newUniforms.push(e),this},t.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},t.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},t.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},t.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},t.prototype.Fragment_Custom_Diffuse=function(e){return this.CustomParts.Fragment_Custom_Diffuse=e.replace("result","diffuseColor"),this},t.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},t.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},t.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},t.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},t.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},t.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},t.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},t.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},t.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},t.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},t.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},t.ShaderIndexer=1,t}(re);R("BABYLON.CustomMaterial",Le);var Fe=function(){function l(){}return l}(),Ae=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.CustomParts=new Fe,r.customShaderNameResolve=r.Builder,r.FragmentShader=D.ShadersStore.pbrPixelShader,r.VertexShader=D.ShadersStore.pbrVertexShader,r.FragmentShader=r.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g,D.IncludesShadersStore.pbrBlockAlbedoOpacity),r.FragmentShader=r.FragmentShader.replace(/#include<pbrBlockReflectivity>/g,D.IncludesShadersStore.pbrBlockReflectivity),r.FragmentShader=r.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g,D.IncludesShadersStore.pbrBlockFinalColorComposition),r}return t.prototype.AttachAfterBind=function(e,n){if(this._newUniformInstances)for(var r in this._newUniformInstances){var i=r.toString().split("-");i[0]=="vec2"?n.setVector2(i[1],this._newUniformInstances[r]):i[0]=="vec3"?n.setVector3(i[1],this._newUniformInstances[r]):i[0]=="vec4"?n.setVector4(i[1],this._newUniformInstances[r]):i[0]=="mat4"?n.setMatrix(i[1],this._newUniformInstances[r]):i[0]=="float"&&n.setFloat(i[1],this._newUniformInstances[r])}if(this._newSamplerInstances)for(var r in this._newSamplerInstances){var i=r.toString().split("-");i[0]=="sampler2D"&&this._newSamplerInstances[r].isReady&&this._newSamplerInstances[r].isReady()&&n.setTexture(i[1],this._newSamplerInstances[r])}},t.prototype.ReviewUniform=function(e,n){if(e=="uniform"&&this._newUniforms)for(var r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")==-1&&n.push(this._newUniforms[r]);if(e=="sampler"&&this._newUniforms)for(var r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")!=-1&&n.push(this._newUniforms[r]);return n},t.prototype.Builder=function(e,n,r,i,o,s,d){var u=this;if(d){var p=d.processFinalCode;d.processFinalCode=function(g,_){if(g==="vertex")return p?p(g,_):_;var L=new oe(_);return L.inlineToken="#define pbr_inline",L.processCode(),p?p(g,L.code):L.code}}if(s&&this._customAttributes&&this._customAttributes.length>0&&s.push.apply(s,this._customAttributes),this.ReviewUniform("uniform",n),this.ReviewUniform("sampler",i),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,t.ShaderIndexer++;var m="custom_"+t.ShaderIndexer,x=this._afterBind.bind(this);return this._afterBind=function(g,_){if(!!_){u.AttachAfterBind(g,_);try{x(g,_)}catch{}}},D.ShadersStore[m+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(D.ShadersStore[m+"VertexShader"]=D.ShadersStore[m+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),D.ShadersStore[m+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_ALBEDO",this.CustomParts.Fragment_Custom_Albedo?this.CustomParts.Fragment_Custom_Albedo:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS",this.CustomParts.Fragment_Custom_MetallicRoughness?this.CustomParts.Fragment_Custom_MetallicRoughness:"").replace("#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE",this.CustomParts.Fragment_Custom_MicroSurface?this.CustomParts.Fragment_Custom_MicroSurface:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION",this.CustomParts.Fragment_Before_FinalColorComposition?this.CustomParts.Fragment_Before_FinalColorComposition:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&(D.ShadersStore[m+"PixelShader"]=D.ShadersStore[m+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=m,m},t.prototype.AddUniform=function(e,n,r){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),r&&(n.indexOf("sampler")!=-1?this._newSamplerInstances[n+"-"+e]=r:this._newUniformInstances[n+"-"+e]=r),this._customUniform.push("uniform "+n+" "+e+";"),this._newUniforms.push(e),this},t.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},t.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},t.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},t.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},t.prototype.Fragment_Custom_Albedo=function(e){return this.CustomParts.Fragment_Custom_Albedo=e.replace("result","surfaceAlbedo"),this},t.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},t.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},t.prototype.Fragment_Custom_MetallicRoughness=function(e){return this.CustomParts.Fragment_Custom_MetallicRoughness=e,this},t.prototype.Fragment_Custom_MicroSurface=function(e){return this.CustomParts.Fragment_Custom_MicroSurface=e,this},t.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},t.prototype.Fragment_Before_FinalColorComposition=function(e){return this.CustomParts.Fragment_Before_FinalColorComposition=e,this},t.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},t.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},t.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},t.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},t.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},t.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},t.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},t.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},t.ShaderIndexer=1,t}(ae);R("BABYLON.PBRCustomMaterial",Ae);var De="firePixelShader",Re=`precision highp float;

uniform vec4 vEyePosition;

varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif

uniform sampler2D distortionSampler;
uniform sampler2D opacitySampler;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;
varying vec2 vDistortionCoords2;
varying vec2 vDistortionCoords3;
#endif
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
vec4 bx2(vec4 x)
{
return vec4(2.0)*x-vec4(1.0);
}
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);

float alpha=1.0;
#ifdef DIFFUSE

const float distortionAmount0=0.092;
const float distortionAmount1=0.092;
const float distortionAmount2=0.092;
vec2 heightAttenuation=vec2(0.3,0.39);
vec4 noise0=texture2D(distortionSampler,vDistortionCoords1);
vec4 noise1=texture2D(distortionSampler,vDistortionCoords2);
vec4 noise2=texture2D(distortionSampler,vDistortionCoords3);
vec4 noiseSum=bx2(noise0)*distortionAmount0+bx2(noise1)*distortionAmount1+bx2(noise2)*distortionAmount2;
vec4 perturbedBaseCoords=vec4(vDiffuseUV,0.0,1.0)+noiseSum*(vDiffuseUV.y*heightAttenuation.x+heightAttenuation.y);
vec4 opacityColor=texture2D(opacitySampler,perturbedBaseCoords.xy);
#ifdef ALPHATEST
if (opacityColor.r<0.1)
discard;
#endif
#include<depthPrePass>
baseColor=texture2D(diffuseSampler,perturbedBaseCoords.xy)*2.0;
baseColor*=opacityColor;
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

vec3 diffuseBase=vec3(1.0,1.0,1.0);
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif

vec4 color=vec4(baseColor.rgb,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[De]=Re;var Oe="fireVertexShader",Ie=`precision highp float;

attribute vec3 position;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>

uniform float time;
uniform float speed;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;
varying vec2 vDistortionCoords2;
varying vec2 vDistortionCoords3;
#endif
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);

#ifdef DIFFUSE
vDiffuseUV=uv;
vDiffuseUV.y-=0.2;
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
#ifdef DIFFUSE

vec3 layerSpeed=vec3(-0.2,-0.52,-0.1)*speed;
vDistortionCoords1.x=uv.x;
vDistortionCoords1.y=uv.y+layerSpeed.x*time/1000.0;
vDistortionCoords2.x=uv.x;
vDistortionCoords2.y=uv.y+layerSpeed.y*time/1000.0;
vDistortionCoords3.x=uv.x;
vDistortionCoords3.y=uv.y+layerSpeed.z*time/1000.0;
#endif
}
`;E.ShadersStore[Oe]=Ie;var be=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.UV1=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.BonesPerMesh=0,e.NUM_BONE_INFLUENCERS=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),Ne=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r.speed=1,r._scaledDiffuse=new S,r._lastTime=0,r}return t.prototype.needAlphaBlending=function(){return!1},t.prototype.needAlphaTesting=function(){return!0},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new be);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,this._diffuseTexture&&y.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.ALPHATEST=!!this._opacityTexture,i._areMiscDirty&&(i.POINTSIZE=this.pointsCloud||o.forcePointsCloud,i.FOG=o.fogEnabled&&e.applyFog&&o.fogMode!==O.FOGMODE_NONE&&this.fogEnabled),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!1,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.UV1&&u.push(h.UVKind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="fire",m=i.toString();n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:["world","view","viewProjection","vEyePosition","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed"],uniformBuffersNames:[],samplers:["diffuseSampler","distortionSampler","opacitySampler"],defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:null,maxSimultaneousLights:4,transformFeedbackVaryings:null},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this._diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix()),this._activeEffect.setTexture("distortionSampler",this._distortionTexture),this._activeEffect.setTexture("opacitySampler",this._opacityTexture)),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*n.visibility),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._lastTime+=i.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime),this._activeEffect.setFloat("speed",this.speed),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._distortionTexture&&this._distortionTexture.animations&&this._distortionTexture.animations.length>0&&e.push(this._distortionTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),this._distortionTexture&&e.push(this._distortionTexture),this._opacityTexture&&e.push(this._opacityTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this._diffuseTexture===e||this._distortionTexture===e||this._opacityTexture===e)},t.prototype.getClassName=function(){return"FireMaterial"},t.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),this._distortionTexture&&this._distortionTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=l.prototype.serialize.call(this);return e.customType="BABYLON.FireMaterial",e.diffuseColor=this.diffuseColor.asArray(),e.speed=this.speed,this._diffuseTexture&&(e._diffuseTexture=this._diffuseTexture.serialize()),this._distortionTexture&&(e._distortionTexture=this._distortionTexture.serialize()),this._opacityTexture&&(e._opacityTexture=this._opacityTexture.serialize()),e},t.Parse=function(e,n,r){var i=new t(e.name,n);return i.diffuseColor=S.FromArray(e.diffuseColor),i.speed=e.speed,i.alpha=e.alpha,i.id=e.id,G.AddTagsTo(i,e.tags),i.backFaceCulling=e.backFaceCulling,i.wireframe=e.wireframe,e._diffuseTexture&&(i._diffuseTexture=V.Parse(e._diffuseTexture,n,r)),e._distortionTexture&&(i._distortionTexture=V.Parse(e._distortionTexture,n,r)),e._opacityTexture&&(i._opacityTexture=V.Parse(e._opacityTexture,n,r)),i},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([P("distortionTexture")],t.prototype,"_distortionTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"distortionTexture",void 0),a([P("opacityTexture")],t.prototype,"_opacityTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"opacityTexture",void 0),a([F("diffuse")],t.prototype,"diffuseColor",void 0),a([c()],t.prototype,"speed",void 0),t}(b);R("BABYLON.FireMaterial",Ne);var Me="furPixelShader",we=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

uniform vec4 furColor;
uniform float furLength;
varying vec3 vPositionW;
varying float vfur_length;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif

#ifdef HIGHLEVEL
uniform float furOffset;
uniform float furOcclusion;
uniform sampler2D furTexture;
varying vec2 vFurUV;
#endif
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<fogFragmentDeclaration>
#include<clipPlaneFragmentDeclaration>
float Rand(vec3 rv) {
float x=dot(rv,vec3(12.9898,78.233,24.65487));
return fract(sin(x)*43758.5453);
}
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=furColor;
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor*=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef HIGHLEVEL

vec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));
if (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {
discard;
}
float occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);
baseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);

#ifdef HIGHLEVEL
vec4 color=vec4(finalDiffuse,alpha);
#else
float r=vfur_length/furLength*0.5;
vec4 color=vec4(finalDiffuse*(0.5+r),alpha);
#endif
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[Me]=we;var Ve="furVertexShader",Ue=`precision highp float;

attribute vec3 position;
attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

uniform float furLength;
uniform float furAngle;
#ifdef HIGHLEVEL
uniform float furOffset;
uniform vec3 furGravity;
uniform float furTime;
uniform float furSpacing;
uniform float furDensity;
#endif
#ifdef HEIGHTMAP
uniform sampler2D heightTexture;
#endif
#ifdef HIGHLEVEL
varying vec2 vFurUV;
#endif
#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
varying float vfur_length;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
float Rand(vec3 rv) {
float x=dot(rv,vec3(12.9898,78.233,24.65487));
return fract(sin(x)*43758.5453);
}
void main(void) {
#include<instancesVertex>
#include<bonesVertex>

float r=Rand(position);
#ifdef HEIGHTMAP
#if __VERSION__>100
vfur_length=furLength*texture(heightTexture,uv).x;
#else
vfur_length=furLength*texture2D(heightTexture,uv).r;
#endif
#else
vfur_length=(furLength*r);
#endif
vec3 tangent1=vec3(normal.y,-normal.x,0);
vec3 tangent2=vec3(-normal.z,0,normal.x);
r=Rand(tangent1*r);
float J=(2.0+4.0*r);
r=Rand(tangent2*r);
float K=(2.0+2.0*r);
tangent1=tangent1*J+tangent2*K;
tangent1=normalize(tangent1);
vec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);
#ifdef HIGHLEVEL

vec3 forceDirection=vec3(0.0,0.0,0.0);
forceDirection.x=sin(furTime+position.x*0.05)*0.2;
forceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;
forceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;
vec3 displacement=vec3(0.0,0.0,0.0);
displacement=furGravity+forceDirection;
float displacementFactor=pow(furOffset,3.0);
vec3 aNormal=normal;
aNormal.xyz+=displacement*displacementFactor;
newPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);
#endif
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

gl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);
vec4 worldPos=finalWorld*vec4(newPosition,1.0);
vPositionW=vec3(worldPos);

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
}
#ifdef HIGHLEVEL
vFurUV=vDiffuseUV*furDensity;
#endif
#else
#ifdef HIGHLEVEL
vFurUV=uv*furDensity;
#endif
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[Ve]=Ue;var Be=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.HEIGHTMAP=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.HIGHLEVEL=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),ze=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r.furLength=1,r.furAngle=0,r.furColor=new S(.44,.21,.02),r.furOffset=0,r.furSpacing=12,r.furGravity=new A(0,0,0),r.furSpeed=100,r.furDensity=20,r.furOcclusion=0,r._disableLighting=!1,r._maxSimultaneousLights=4,r.highLevelFur=!0,r._furTime=0,r}return Object.defineProperty(t.prototype,"furTime",{get:function(){return this._furTime},set:function(e){this._furTime=e},enumerable:!1,configurable:!0}),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.updateFur=function(){for(var e=1;e<this._meshes.length;e++){var n=this._meshes[e].material;n.furLength=this.furLength,n.furAngle=this.furAngle,n.furGravity=this.furGravity,n.furSpacing=this.furSpacing,n.furSpeed=this.furSpeed,n.furColor=this.furColor,n.diffuseTexture=this.diffuseTexture,n.furTexture=this.furTexture,n.highLevelFur=this.highLevelFur,n.furTime=this.furTime,n.furDensity=this.furDensity}},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Be);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&o.texturesEnabled){if(this.diffuseTexture&&y.DiffuseTextureEnabled)if(this.diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(this.heightTexture&&s.getCaps().maxVertexTextureImageUnits)if(this.heightTexture.isReady())i._needUVs=!0,i.HEIGHTMAP=!0;else return!1}if(this.highLevelFur!==i.HIGHLEVEL&&(i.HIGHLEVEL=!0,i.markAsUnprocessed()),f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="fur",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","furLength","furAngle","furColor","furOffset","furGravity","furTime","furSpacing","furDensity","furOcclusion"],g=["diffuseSampler","heightTexture","furTexture"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),i.getCachedMaterial()!==this&&(this._diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),this._heightTexture&&this._activeEffect.setTexture("heightTexture",this._heightTexture),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._activeEffect.setFloat("furLength",this.furLength),this._activeEffect.setFloat("furAngle",this.furAngle),this._activeEffect.setColor4("furColor",this.furColor,1),this.highLevelFur&&(this._activeEffect.setVector3("furGravity",this.furGravity),this._activeEffect.setFloat("furOffset",this.furOffset),this._activeEffect.setFloat("furSpacing",this.furSpacing),this._activeEffect.setFloat("furDensity",this.furDensity),this._activeEffect.setFloat("furOcclusion",this.furOcclusion),this._furTime+=this.getScene().getEngine().getDeltaTime()/this.furSpeed,this._activeEffect.setFloat("furTime",this._furTime),this._activeEffect.setTexture("furTexture",this.furTexture)),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.heightTexture&&this.heightTexture.animations&&this.heightTexture.animations.length>0&&e.push(this.heightTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),this._heightTexture&&e.push(this._heightTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this.diffuseTexture===e||this._heightTexture===e)},t.prototype.dispose=function(e){if(this.diffuseTexture&&this.diffuseTexture.dispose(),this._meshes)for(var n=1;n<this._meshes.length;n++){var r=this._meshes[n].material;r&&r.dispose(e),this._meshes[n].dispose()}l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.FurMaterial",this._meshes&&(e.sourceMeshName=this._meshes[0].name,e.quality=this._meshes.length),e},t.prototype.getClassName=function(){return"FurMaterial"},t.Parse=function(e,n,r){var i=T.Parse(function(){return new t(e.name,n)},e,n,r);return e.sourceMeshName&&i.highLevelFur&&n.executeWhenReady(function(){var o=n.getMeshByName(e.sourceMeshName);if(o){var s=t.GenerateTexture("Fur Texture",n);i.furTexture=s,t.FurifyMesh(o,e.quality)}}),i},t.GenerateTexture=function(e,n){for(var r=new se("FurTexture "+e,256,n,!0),i=r.getContext(),o=0;o<2e4;++o)i.fillStyle="rgba(255, "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", 1)",i.fillRect(Math.random()*r.getSize().width,Math.random()*r.getSize().height,2,2);return r.update(!1),r.wrapU=V.WRAP_ADDRESSMODE,r.wrapV=V.WRAP_ADDRESSMODE,r},t.FurifyMesh=function(e,n){var r=[e],i=e.material,o;if(!(i instanceof t))throw"The material of the source mesh must be a Fur Material";for(o=1;o<n;o++){var s=new t(i.name+o,e.getScene());e.getScene().materials.pop(),G.EnableFor(s),G.AddTagsTo(s,"furShellMaterial"),s.furLength=i.furLength,s.furAngle=i.furAngle,s.furGravity=i.furGravity,s.furSpacing=i.furSpacing,s.furSpeed=i.furSpeed,s.furColor=i.furColor,s.diffuseTexture=i.diffuseTexture,s.furOffset=o/n,s.furTexture=i.furTexture,s.highLevelFur=i.highLevelFur,s.furTime=i.furTime,s.furDensity=i.furDensity;var d=e.clone(e.name+o);d.material=s,d.skeleton=e.skeleton,d.position=A.Zero(),r.push(d)}for(o=1;o<r.length;o++)r[o].parent=e;return e.material._meshes=r,r},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([P("heightTexture")],t.prototype,"_heightTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"heightTexture",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([c()],t.prototype,"furLength",void 0),a([c()],t.prototype,"furAngle",void 0),a([F()],t.prototype,"furColor",void 0),a([c()],t.prototype,"furOffset",void 0),a([c()],t.prototype,"furSpacing",void 0),a([U()],t.prototype,"furGravity",void 0),a([c()],t.prototype,"furSpeed",void 0),a([c()],t.prototype,"furDensity",void 0),a([c()],t.prototype,"furOcclusion",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),a([c()],t.prototype,"highLevelFur",void 0),a([c()],t.prototype,"furTime",null),t}(b);R("BABYLON.FurMaterial",ze);var Ge="gradientPixelShader",We=`precision highp float;

uniform vec4 vEyePosition;

uniform vec4 topColor;
uniform vec4 bottomColor;
uniform float offset;
uniform float scale;
uniform float smoothness;

varying vec3 vPositionW;
varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
void main(void) {
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
float h=vPosition.y*scale+offset;
float mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));
vec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));

vec3 diffuseColor=baseColor.rgb;

float alpha=baseColor.a;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif

#ifdef EMISSIVE
vec3 diffuseBase=baseColor.rgb;
#else
vec3 diffuseBase=vec3(0.,0.,0.);
#endif
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;

vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}
`;E.ShadersStore[Ge]=We;var He="gradientVertexShader",Xe=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
vPosition=position;
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[He]=Xe;var ke=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.EMISSIVE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),je=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r._maxSimultaneousLights=4,r.topColor=new S(1,0,0),r.topColorAlpha=1,r.bottomColor=new S(0,0,1),r.bottomColorAlpha=1,r.offset=0,r.scale=1,r.smoothness=1,r._disableLighting=!1,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1||this.topColorAlpha<1||this.bottomColorAlpha<1},t.prototype.needAlphaTesting=function(){return!0},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new ke);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),i.EMISSIVE=this._disableLighting,f.PrepareDefinesForAttributes(e,i,!1,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="gradient",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","topColor","bottomColor","offset","smoothness","scale"],g=[],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:4}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,s),this._mustRebind(i,s)&&(f.BindClipPlane(s,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._activeEffect.setColor4("topColor",this.topColor,this.topColorAlpha),this._activeEffect.setColor4("bottomColor",this.bottomColor,this.bottomColorAlpha),this._activeEffect.setFloat("offset",this.offset),this._activeEffect.setFloat("scale",this.scale),this._activeEffect.setFloat("smoothness",this.smoothness),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){return[]},t.prototype.dispose=function(e){l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.GradientMaterial",e},t.prototype.getClassName=function(){return"GradientMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),a([F()],t.prototype,"topColor",void 0),a([c()],t.prototype,"topColorAlpha",void 0),a([F()],t.prototype,"bottomColor",void 0),a([c()],t.prototype,"bottomColorAlpha",void 0),a([c()],t.prototype,"offset",void 0),a([c()],t.prototype,"scale",void 0),a([c()],t.prototype,"smoothness",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),t}(b);R("BABYLON.GradientMaterial",je);var Ze="gridPixelShader",Ye=`#extension GL_OES_standard_derivatives : enable
#define SQRT2 1.41421356
#define PI 3.14159
precision highp float;
uniform float visibility;
uniform vec3 mainColor;
uniform vec3 lineColor;
uniform vec4 gridControl;
uniform vec3 gridOffset;

varying vec3 vPosition;
varying vec3 vNormal;
#include<fogFragmentDeclaration>

#ifdef OPACITY
varying vec2 vOpacityUV;
uniform sampler2D opacitySampler;
uniform vec2 vOpacityInfos;
#endif
float getDynamicVisibility(float position) {

float majorGridFrequency=gridControl.y;
if (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)
{
return 1.0;
}
return gridControl.z;
}
float getAnisotropicAttenuation(float differentialLength) {
const float maxNumberOfLines=10.0;
return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);
}
float isPointOnLine(float position,float differentialLength) {
float fractionPartOfPosition=position-floor(position+0.5);
fractionPartOfPosition/=differentialLength;
fractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);
float result=0.5+0.5*cos(fractionPartOfPosition*PI);
return result;
}
float contributionOnAxis(float position) {
float differentialLength=length(vec2(dFdx(position),dFdy(position)));
differentialLength*=SQRT2;

float result=isPointOnLine(position,differentialLength);

float dynamicVisibility=getDynamicVisibility(position);
result*=dynamicVisibility;

float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);
result*=anisotropicAttenuation;
return result;
}
float normalImpactOnAxis(float x) {
float normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);
return normalImpact;
}
void main(void) {

float gridRatio=gridControl.x;
vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;

float x=contributionOnAxis(gridPos.x);
float y=contributionOnAxis(gridPos.y);
float z=contributionOnAxis(gridPos.z);

vec3 normal=normalize(vNormal);
x*=normalImpactOnAxis(normal.x);
y*=normalImpactOnAxis(normal.y);
z*=normalImpactOnAxis(normal.z);

float grid=clamp(x+y+z,0.,1.);

vec3 color=mix(mainColor,lineColor,grid);
#ifdef FOG
#include<fogFragment>
#endif
float opacity=1.0;
#ifdef TRANSPARENT
opacity=clamp(grid,0.08,gridControl.w*grid);
#endif
#ifdef OPACITY
opacity*=texture2D(opacitySampler,vOpacityUV).a;
#endif

gl_FragColor=vec4(color.rgb,opacity*visibility);
#ifdef TRANSPARENT
#ifdef PREMULTIPLYALPHA
gl_FragColor.rgb*=opacity;
#endif
#else
#endif
#include<imageProcessingCompatibility>
}`;E.ShadersStore[Ze]=Ye;var Ke="gridVertexShader",$e=`precision highp float;

attribute vec3 position;
attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#include<instancesDeclaration>

uniform mat4 projection;
uniform mat4 view;

varying vec3 vPosition;
varying vec3 vNormal;
#include<fogVertexDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;
uniform mat4 opacityMatrix;
uniform vec2 vOpacityInfos;
#endif
void main(void) {
#include<instancesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
#include<fogVertex>
vec4 cameraSpacePosition=view*worldPos;
gl_Position=projection*cameraSpacePosition;
#ifdef OPACITY
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
if (vOpacityInfos.x == 0.)
{
vOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));
}
else
{
vOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));
}
#endif
vPosition=position;
vNormal=normal;
}`;E.ShadersStore[Ke]=$e;var qe=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.OPACITY=!1,e.TRANSPARENT=!1,e.FOG=!1,e.PREMULTIPLYALPHA=!1,e.UV1=!1,e.UV2=!1,e.INSTANCES=!1,e.THIN_INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),Qe=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.mainColor=S.Black(),r.lineColor=S.Teal(),r.gridRatio=1,r.gridOffset=A.Zero(),r.majorUnitFrequency=10,r.minorUnitVisibility=.33,r.opacity=1,r.preMultiplyAlpha=!1,r._gridControl=new fe(r.gridRatio,r.majorUnitFrequency,r.minorUnitVisibility,r.opacity),r}return t.prototype.needAlphaBlending=function(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()},t.prototype.needAlphaBlendingForMesh=function(e){return e.visibility<1||this.needAlphaBlending()},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new qe);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;if(i.TRANSPARENT!==this.opacity<1&&(i.TRANSPARENT=!i.TRANSPARENT,i.markAsUnprocessed()),i.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(i.PREMULTIPLYALPHA=!i.PREMULTIPLYALPHA,i.markAsUnprocessed()),i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._opacityTexture&&y.OpacityTextureEnabled))if(this._opacityTexture.isReady())i._needUVs=!0,i.OPACITY=!0;else return!1;if(f.PrepareDefinesForMisc(e,o,!1,!1,this.fogEnabled,!1,i),f.PrepareDefinesForFrameBoundValues(o,o.getEngine(),i,!!r),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial(),f.PrepareDefinesForAttributes(e,i,!1,!1);var s=[h.PositionKind,h.NormalKind];i.UV1&&s.push(h.UVKind),i.UV2&&s.push(h.UV2Kind),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess,f.PrepareAttributesForInstances(s,i);var d=i.toString();n.setEffect(o.getEngine().createEffect("grid",s,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility"],["opacitySampler"],d,void 0,this.onCompiled,this.onError),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this._activeEffect.setFloat("visibility",n.visibility),(!o.INSTANCES||o.THIN_INSTANCE)&&this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",i.getViewMatrix()),this._activeEffect.setMatrix("projection",i.getProjectionMatrix()),this._mustRebind(i,s)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&y.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix()))),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.dispose=function(e){l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.GridMaterial",e},t.prototype.getClassName=function(){return"GridMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([F()],t.prototype,"mainColor",void 0),a([F()],t.prototype,"lineColor",void 0),a([c()],t.prototype,"gridRatio",void 0),a([U()],t.prototype,"gridOffset",void 0),a([c()],t.prototype,"majorUnitFrequency",void 0),a([c()],t.prototype,"minorUnitVisibility",void 0),a([c()],t.prototype,"opacity",void 0),a([c()],t.prototype,"preMultiplyAlpha",void 0),a([P("opacityTexture")],t.prototype,"_opacityTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"opacityTexture",void 0),t}(b);R("BABYLON.GridMaterial",Qe);var Je="lavaPixelShader",ei=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

varying vec3 vPositionW;

uniform float time;
uniform float speed;
uniform float movingSpeed;
uniform vec3 fogColor;
uniform sampler2D noiseTexture;
uniform float fogDensity;

varying float noise;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
float random( vec3 scale,float seed ){
return fract( sin( dot( gl_FragCoord.xyz+seed,scale ) )*43758.5453+seed ) ;
}
void main(void) {
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef DIFFUSE

vec4 noiseTex=texture2D( noiseTexture,vDiffuseUV );
vec2 T1=vDiffuseUV+vec2( 1.5,-1.5 )*time*0.02;
vec2 T2=vDiffuseUV+vec2( -0.5,2.0 )*time*0.01*speed;
T1.x+=noiseTex.x*2.0;
T1.y+=noiseTex.y*2.0;
T2.x-=noiseTex.y*0.2+time*0.001*movingSpeed;
T2.y+=noiseTex.z*0.2+time*0.002*movingSpeed;
float p=texture2D( noiseTexture,T1*3.0 ).a;
vec4 lavaColor=texture2D( diffuseSampler,T2*4.0);
vec4 temp=lavaColor*( vec4( p,p,p,p )*2. )+( lavaColor*lavaColor-0.1 );
baseColor=temp;
float depth=gl_FragCoord.z*4.0;
const float LOG2=1.442695;
float fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2 );
fogFactor=1.0-clamp( fogFactor,0.0,1.0 );
baseColor=mix( baseColor,vec4( fogColor,baseColor.w ),fogFactor );
diffuseColor=baseColor.rgb;


#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef UNLIT
vec3 diffuseBase=vec3(1.,1.,1.);
#else

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#include<lightFragment>[0]
#include<lightFragment>[1]
#include<lightFragment>[2]
#include<lightFragment>[3]
#endif
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;

vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[Je]=ei;var ii="lavaVertexShader",ti=`precision highp float;

uniform float time;
uniform float lowFrequencySpeed;

varying float noise;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]



vec3 mod289(vec3 x)
{
return x-floor(x*(1.0/289.0))*289.0;
}
vec4 mod289(vec4 x)
{
return x-floor(x*(1.0/289.0))*289.0;
}
vec4 permute(vec4 x)
{
return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r)
{
return 1.79284291400159-0.85373472095314*r;
}
vec3 fade(vec3 t) {
return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float pnoise(vec3 P,vec3 rep)
{
vec3 Pi0=mod(floor(P),rep);
vec3 Pi1=mod(Pi0+vec3(1.0),rep);
Pi0=mod289(Pi0);
Pi1=mod289(Pi1);
vec3 Pf0=fract(P);
vec3 Pf1=Pf0-vec3(1.0);
vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
vec4 iy=vec4(Pi0.yy,Pi1.yy);
vec4 iz0=Pi0.zzzz;
vec4 iz1=Pi1.zzzz;
vec4 ixy=permute(permute(ix)+iy);
vec4 ixy0=permute(ixy+iz0);
vec4 ixy1=permute(ixy+iz1);
vec4 gx0=ixy0*(1.0/7.0);
vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;
gx0=fract(gx0);
vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
vec4 sz0=step(gz0,vec4(0.0));
gx0-=sz0*(step(0.0,gx0)-0.5);
gy0-=sz0*(step(0.0,gy0)-0.5);
vec4 gx1=ixy1*(1.0/7.0);
vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;
gx1=fract(gx1);
vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
vec4 sz1=step(gz1,vec4(0.0));
gx1-=sz1*(step(0.0,gx1)-0.5);
gy1-=sz1*(step(0.0,gy1)-0.5);
vec3 g000=vec3(gx0.x,gy0.x,gz0.x);
vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
vec3 g010=vec3(gx0.z,gy0.z,gz0.z);
vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
vec3 g001=vec3(gx1.x,gy1.x,gz1.x);
vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
vec3 g011=vec3(gx1.z,gy1.z,gz1.z);
vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
g000*=norm0.x;
g010*=norm0.y;
g100*=norm0.z;
g110*=norm0.w;
vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
g001*=norm1.x;
g011*=norm1.y;
g101*=norm1.z;
g111*=norm1.w;
float n000=dot(g000,Pf0);
float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));
float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
float n001=dot(g001,vec3(Pf0.xy,Pf1.z));
float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
float n011=dot(g011,vec3(Pf0.x,Pf1.yz));
float n111=dot(g111,Pf1);
vec3 fade_xyz=fade(Pf0);
vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);
return 2.2*n_xyz;
}

float turbulence( vec3 p ) {
float w=100.0;
float t=-.5;
for (float f=1.0 ; f<=10.0 ; f++ ){
float power=pow( 2.0,f );
t+=abs( pnoise( vec3( power*p ),vec3( 10.0,10.0,10.0 ) )/power );
}
return t;
}
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
#ifdef NORMAL

noise=10.0*-.10*turbulence( .5*normal+time*1.15 );

float b=lowFrequencySpeed*5.0*pnoise( 0.05*position +vec3(time*1.025),vec3( 100.0 ) );

float displacement =-1.5*noise+b;

vec3 newPosition=position+normal*displacement;
gl_Position=viewProjection*finalWorld*vec4( newPosition,1.0 );
vec4 worldPos=finalWorld*vec4(newPosition,1.0);
vPositionW=vec3(worldPos);
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}`;E.ShadersStore[ii]=ti;var ni=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.LIGHT0=!1,e.LIGHT1=!1,e.LIGHT2=!1,e.LIGHT3=!1,e.SPOTLIGHT0=!1,e.SPOTLIGHT1=!1,e.SPOTLIGHT2=!1,e.SPOTLIGHT3=!1,e.HEMILIGHT0=!1,e.HEMILIGHT1=!1,e.HEMILIGHT2=!1,e.HEMILIGHT3=!1,e.DIRLIGHT0=!1,e.DIRLIGHT1=!1,e.DIRLIGHT2=!1,e.DIRLIGHT3=!1,e.POINTLIGHT0=!1,e.POINTLIGHT1=!1,e.POINTLIGHT2=!1,e.POINTLIGHT3=!1,e.SHADOW0=!1,e.SHADOW1=!1,e.SHADOW2=!1,e.SHADOW3=!1,e.SHADOWS=!1,e.SHADOWESM0=!1,e.SHADOWESM1=!1,e.SHADOWESM2=!1,e.SHADOWESM3=!1,e.SHADOWPOISSON0=!1,e.SHADOWPOISSON1=!1,e.SHADOWPOISSON2=!1,e.SHADOWPOISSON3=!1,e.SHADOWPCF0=!1,e.SHADOWPCF1=!1,e.SHADOWPCF2=!1,e.SHADOWPCF3=!1,e.SHADOWPCSS0=!1,e.SHADOWPCSS1=!1,e.SHADOWPCSS2=!1,e.SHADOWPCSS3=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.UNLIT=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),ri=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.speed=1,r.movingSpeed=1,r.lowFrequencySpeed=1,r.fogDensity=.15,r._lastTime=0,r.diffuseColor=new S(1,1,1),r._disableLighting=!1,r._unlit=!1,r._maxSimultaneousLights=4,r._scaledDiffuse=new S,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new ni);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&y.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="lava",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed","movingSpeed","fogColor","fogDensity","lowFrequencySpeed"],g=["diffuseSampler","noiseTexture"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,o.UNLIT=this._unlit,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this.diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),this.noiseTexture&&this._activeEffect.setTexture("noiseTexture",this.noiseTexture),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*n.visibility),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._lastTime+=i.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime*this.speed/1e3),this.fogColor||(this.fogColor=S.Black()),this._activeEffect.setColor3("fogColor",this.fogColor),this._activeEffect.setFloat("fogDensity",this.fogDensity),this._activeEffect.setFloat("lowFrequencySpeed",this.lowFrequencySpeed),this._activeEffect.setFloat("movingSpeed",this.movingSpeed),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.noiseTexture&&this.noiseTexture.animations&&this.noiseTexture.animations.length>0&&e.push(this.noiseTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},t.prototype.dispose=function(e){this.diffuseTexture&&this.diffuseTexture.dispose(),this.noiseTexture&&this.noiseTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.LavaMaterial",e},t.prototype.getClassName=function(){return"LavaMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([P()],t.prototype,"noiseTexture",void 0),a([F()],t.prototype,"fogColor",void 0),a([c()],t.prototype,"speed",void 0),a([c()],t.prototype,"movingSpeed",void 0),a([c()],t.prototype,"lowFrequencySpeed",void 0),a([c()],t.prototype,"fogDensity",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("unlit")],t.prototype,"_unlit",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"unlit",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.LavaMaterial",ri);var oi="mixPixelShader",ai=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]

#ifdef DIFFUSE
varying vec2 vTextureUV;
uniform sampler2D mixMap1Sampler;
uniform vec2 vTextureInfos;
#ifdef MIXMAP2
uniform sampler2D mixMap2Sampler;
#endif
uniform sampler2D diffuse1Sampler;
uniform sampler2D diffuse2Sampler;
uniform sampler2D diffuse3Sampler;
uniform sampler2D diffuse4Sampler;
uniform vec2 diffuse1Infos;
uniform vec2 diffuse2Infos;
uniform vec2 diffuse3Infos;
uniform vec2 diffuse4Infos;
#ifdef MIXMAP2
uniform sampler2D diffuse5Sampler;
uniform sampler2D diffuse6Sampler;
uniform sampler2D diffuse7Sampler;
uniform sampler2D diffuse8Sampler;
uniform vec2 diffuse5Infos;
uniform vec2 diffuse6Infos;
uniform vec2 diffuse7Infos;
uniform vec2 diffuse8Infos;
#endif
#endif

#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 finalMixColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;
#ifdef MIXMAP2
vec4 mixColor2=vec4(1.,1.,1.,1.);
#endif
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif

float alpha=vDiffuseColor.a;

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef DIFFUSE
vec4 mixColor=texture2D(mixMap1Sampler,vTextureUV);
#include<depthPrePass>
mixColor.rgb*=vTextureInfos.y;
vec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);
vec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);
vec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);
vec4 diffuse4Color=texture2D(diffuse4Sampler,vTextureUV*diffuse4Infos);
diffuse1Color.rgb*=mixColor.r;
diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,mixColor.g);
diffuse3Color.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,mixColor.b);
finalMixColor.rgb=mix(diffuse3Color.rgb,diffuse4Color.rgb,1.0-mixColor.a);
#ifdef MIXMAP2
mixColor=texture2D(mixMap2Sampler,vTextureUV);
mixColor.rgb*=vTextureInfos.y;
vec4 diffuse5Color=texture2D(diffuse5Sampler,vTextureUV*diffuse5Infos);
vec4 diffuse6Color=texture2D(diffuse6Sampler,vTextureUV*diffuse6Infos);
vec4 diffuse7Color=texture2D(diffuse7Sampler,vTextureUV*diffuse7Infos);
vec4 diffuse8Color=texture2D(diffuse8Sampler,vTextureUV*diffuse8Infos);
diffuse5Color.rgb=mix(finalMixColor.rgb,diffuse5Color.rgb,mixColor.r);
diffuse6Color.rgb=mix(diffuse5Color.rgb,diffuse6Color.rgb,mixColor.g);
diffuse7Color.rgb=mix(diffuse6Color.rgb,diffuse7Color.rgb,mixColor.b);
finalMixColor.rgb=mix(diffuse7Color.rgb,diffuse8Color.rgb,1.0-mixColor.a);
#endif
#endif
#ifdef VERTEXCOLOR
finalMixColor.rgb*=vColor.rgb;
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor*finalMixColor.rgb,0.0,1.0);

vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}
`;E.ShadersStore[oi]=ai;var si="mixVertexShader",fi=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;
uniform mat4 textureMatrix;
uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vTextureInfos.x == 0.)
{
vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));
}
else
{
vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[si]=fi;var li=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.MIXMAP2=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),ui=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r.specularColor=new S(0,0,0),r.specularPower=64,r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new li);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(o.texturesEnabled&&(!this._mixTexture1||!this._mixTexture1.isReady()||(i._needUVs=!0,y.DiffuseTextureEnabled&&(!this._diffuseTexture1||!this._diffuseTexture1.isReady()||(i.DIFFUSE=!0,!this._diffuseTexture2||!this._diffuseTexture2.isReady())||!this._diffuseTexture3||!this._diffuseTexture3.isReady()||!this._diffuseTexture4||!this._diffuseTexture4.isReady()||this._mixTexture2&&(!this._mixTexture2.isReady()||(i.MIXMAP2=!0,!this._diffuseTexture5||!this._diffuseTexture5.isReady())||!this._diffuseTexture6||!this._diffuseTexture6.isReady()||!this._diffuseTexture7||!this._diffuseTexture7.isReady()||!this._diffuseTexture8||!this._diffuseTexture8.isReady())))))return!1;if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="mix",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos","diffuse4Infos","diffuse5Infos","diffuse6Infos","diffuse7Infos","diffuse8Infos"],g=["mixMap1Sampler","mixMap2Sampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","diffuse4Sampler","diffuse5Sampler","diffuse6Sampler","diffuse7Sampler","diffuse8Sampler"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this._mixTexture1&&(this._activeEffect.setTexture("mixMap1Sampler",this._mixTexture1),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture1.coordinatesIndex,this._mixTexture1.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture1.getTextureMatrix()),y.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale)),this._diffuseTexture4&&(this._activeEffect.setTexture("diffuse4Sampler",this._diffuseTexture4),this._activeEffect.setFloat2("diffuse4Infos",this._diffuseTexture4.uScale,this._diffuseTexture4.vScale)))),this._mixTexture2&&(this._activeEffect.setTexture("mixMap2Sampler",this._mixTexture2),y.DiffuseTextureEnabled&&(this._diffuseTexture5&&(this._activeEffect.setTexture("diffuse5Sampler",this._diffuseTexture5),this._activeEffect.setFloat2("diffuse5Infos",this._diffuseTexture5.uScale,this._diffuseTexture5.vScale)),this._diffuseTexture6&&(this._activeEffect.setTexture("diffuse6Sampler",this._diffuseTexture6),this._activeEffect.setFloat2("diffuse6Infos",this._diffuseTexture6.uScale,this._diffuseTexture6.vScale)),this._diffuseTexture7&&(this._activeEffect.setTexture("diffuse7Sampler",this._diffuseTexture7),this._activeEffect.setFloat2("diffuse7Infos",this._diffuseTexture7.uScale,this._diffuseTexture7.vScale)),this._diffuseTexture8&&(this._activeEffect.setTexture("diffuse8Sampler",this._diffuseTexture8),this._activeEffect.setFloat2("diffuse8Infos",this._diffuseTexture8.uScale,this._diffuseTexture8.vScale)))),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._mixTexture1&&this._mixTexture1.animations&&this._mixTexture1.animations.length>0&&e.push(this._mixTexture1),this._mixTexture2&&this._mixTexture2.animations&&this._mixTexture2.animations.length>0&&e.push(this._mixTexture2),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._mixTexture1&&e.push(this._mixTexture1),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._diffuseTexture4&&e.push(this._diffuseTexture4),this._mixTexture2&&e.push(this._mixTexture2),this._diffuseTexture5&&e.push(this._diffuseTexture5),this._diffuseTexture6&&e.push(this._diffuseTexture6),this._diffuseTexture7&&e.push(this._diffuseTexture7),this._diffuseTexture8&&e.push(this._diffuseTexture8),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this._mixTexture1===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._diffuseTexture4===e||this._mixTexture2===e||this._diffuseTexture5===e||this._diffuseTexture6===e||this._diffuseTexture7===e||this._diffuseTexture8===e)},t.prototype.dispose=function(e){this._mixTexture1&&this._mixTexture1.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.MixMaterial",e},t.prototype.getClassName=function(){return"MixMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("mixTexture1")],t.prototype,"_mixTexture1",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture1",void 0),a([P("mixTexture2")],t.prototype,"_mixTexture2",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture2",void 0),a([P("diffuseTexture1")],t.prototype,"_diffuseTexture1",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture1",void 0),a([P("diffuseTexture2")],t.prototype,"_diffuseTexture2",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture2",void 0),a([P("diffuseTexture3")],t.prototype,"_diffuseTexture3",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture3",void 0),a([P("diffuseTexture4")],t.prototype,"_diffuseTexture4",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture4",void 0),a([P("diffuseTexture1")],t.prototype,"_diffuseTexture5",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture5",void 0),a([P("diffuseTexture2")],t.prototype,"_diffuseTexture6",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture6",void 0),a([P("diffuseTexture3")],t.prototype,"_diffuseTexture7",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture7",void 0),a([P("diffuseTexture4")],t.prototype,"_diffuseTexture8",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture8",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([F()],t.prototype,"specularColor",void 0),a([c()],t.prototype,"specularPower",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.MixMaterial",ui);var di="normalPixelShader",ci=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef LIGHTING

#include<helperFunctions>

#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#endif

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
void main(void) {
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef NORMAL
baseColor=mix(baseColor,vec4(vNormalW,1.0),0.5);
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif

#ifdef LIGHTING
vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#include<lightFragment>[0]
#include<lightFragment>[1]
#include<lightFragment>[2]
#include<lightFragment>[3]
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;
#else
vec3 finalDiffuse=baseColor.rgb;
#endif

vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[di]=ci;var vi="normalVertexShader",hi=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[vi]=hi;var pi=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.LIGHT0=!1,e.LIGHT1=!1,e.LIGHT2=!1,e.LIGHT3=!1,e.SPOTLIGHT0=!1,e.SPOTLIGHT1=!1,e.SPOTLIGHT2=!1,e.SPOTLIGHT3=!1,e.HEMILIGHT0=!1,e.HEMILIGHT1=!1,e.HEMILIGHT2=!1,e.HEMILIGHT3=!1,e.DIRLIGHT0=!1,e.DIRLIGHT1=!1,e.DIRLIGHT2=!1,e.DIRLIGHT3=!1,e.POINTLIGHT0=!1,e.POINTLIGHT1=!1,e.POINTLIGHT2=!1,e.POINTLIGHT3=!1,e.SHADOW0=!1,e.SHADOW1=!1,e.SHADOW2=!1,e.SHADOW3=!1,e.SHADOWS=!1,e.SHADOWESM0=!1,e.SHADOWESM1=!1,e.SHADOWESM2=!1,e.SHADOWESM3=!1,e.SHADOWPOISSON0=!1,e.SHADOWPOISSON1=!1,e.SHADOWPOISSON2=!1,e.SHADOWPOISSON3=!1,e.SHADOWPCF0=!1,e.SHADOWPCF1=!1,e.SHADOWPCF2=!1,e.SHADOWPCF3=!1,e.SHADOWPCSS0=!1,e.SHADOWPCSS1=!1,e.SHADOWPCSS2=!1,e.SHADOWPCSS3=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.LIGHTING=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),mi=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaBlendingForMesh=function(e){return this.needAlphaBlending()||e.visibility<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new pi);var i=n.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&y.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),i.LIGHTING=!this._disableLighting,f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="normal",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],g=["diffuseSampler"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:4}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this.diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},t.prototype.dispose=function(e){this.diffuseTexture&&this.diffuseTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.NormalMaterial",e},t.prototype.getClassName=function(){return"NormalMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.NormalMaterial",mi);var gi="shadowOnlyPixelShader",xi=`precision highp float;

uniform vec4 vEyePosition;
uniform float alpha;
uniform vec3 shadowColor;

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
void main(void) {
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#include<lightFragment>[0..1]

vec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[gi]=xi;var _i="shadowOnlyVertexShader",Ti=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[_i]=Ti;var Pi=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),te=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r._needAlphaBlending=!0,r.shadowColor=S.Black(),r}return t.prototype.needAlphaBlending=function(){return this._needAlphaBlending},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},Object.defineProperty(t.prototype,"activeLight",{get:function(){return this._activeLight},set:function(e){this._activeLight=e},enumerable:!1,configurable:!0}),t.prototype._getFirstShadowLightForMesh=function(e){for(var n=0,r=e.lightSources;n<r.length;n++){var i=r[n];if(i.shadowEnabled)return i}return null},t.prototype.isReadyForSubMesh=function(e,n,r){var i;if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Pi);var o=n._materialDefines,s=this.getScene();if(this._isReadyForSubMesh(n))return!0;var d=s.getEngine();if(this._activeLight)for(var u=0,p=e.lightSources;u<p.length;u++){var m=p[u];if(m.shadowEnabled){if(this._activeLight===m)break;var x=e.lightSources.indexOf(this._activeLight);x!==-1&&(e.lightSources.splice(x,1),e.lightSources.splice(0,0,this._activeLight));break}}f.PrepareDefinesForFrameBoundValues(s,d,o,!!r),f.PrepareDefinesForMisc(e,s,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),o),o._needNormals=f.PrepareDefinesForLights(s,e,o,!1,1);var g=(i=this._getFirstShadowLightForMesh(e))===null||i===void 0?void 0:i.getShadowGenerator();if(this._needAlphaBlending=!0,g&&g.getClassName&&g.getClassName()==="CascadedShadowGenerator"){var _=g;this._needAlphaBlending=!_.autoCalcDepthBounds}if(f.PrepareDefinesForAttributes(e,o,!1,!0),o.isDirty){o.markAsProcessed(),s.resetCachedMaterial();var L=new N;o.FOG&&L.addFallback(1,"FOG"),f.HandleFallbacksForShadows(o,L,1),o.NUM_BONE_INFLUENCERS>0&&L.addCPUSkinningFallback(0,e),o.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;var M=[h.PositionKind];o.NORMAL&&M.push(h.NormalKind),f.PrepareAttributesForBones(M,e,o,L),f.PrepareAttributesForInstances(M,o);var w="shadowOnly",j=o.toString(),Z=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6"],Y=new Array,K=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:Z,uniformBuffersNames:K,samplers:Y,defines:o,maxSimultaneousLights:1}),n.setEffect(s.getEngine().createEffect(w,{attributes:M,uniformsNames:Z,uniformBuffersNames:K,samplers:Y,defines:j,fallbacks:L,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},d),o,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(o._renderId=s.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;if(!!s){if(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),i.bindEyePosition(s)),i.lightsEnabled){f.BindLights(i,n,this._activeEffect,o,1);var d=this._getFirstShadowLightForMesh(n);d&&(d._renderId=-1)}(i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE||o.SHADOWCSM0)&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect)}}},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.ShadowOnlyMaterial",e},t.prototype.getClassName=function(){return"ShadowOnlyMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},t}(b);R("BABYLON.ShadowOnlyMaterial",te);var Si="simplePixelShader",Ci=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>
void main(void) {
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;

vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}`;E.ShadersStore[Si]=Ci;var Ei="simpleVertexShader",yi=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[Ei]=yi;var Li=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),Fi=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Li);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&y.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="simple",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],g=["diffuseSampler"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights-1}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this._diffuseTexture&&y.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},t.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.SimpleMaterial",e},t.prototype.getClassName=function(){return"SimpleMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("diffuseTexture")],t.prototype,"_diffuseTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture",void 0),a([F("diffuse")],t.prototype,"diffuseColor",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.SimpleMaterial",Fi);var Ai="skyPixelShader",Di=`precision highp float;

varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneFragmentDeclaration>

uniform vec3 cameraPosition;
uniform vec3 cameraOffset;
uniform vec3 up;
uniform float luminance;
uniform float turbidity;
uniform float rayleigh;
uniform float mieCoefficient;
uniform float mieDirectionalG;
uniform vec3 sunPosition;

#include<fogFragmentDeclaration>

const float e=2.71828182845904523536028747135266249775724709369995957;
const float pi=3.141592653589793238462643383279502884197169;
const float n=1.0003;
const float N=2.545E25;
const float pn=0.035;
const vec3 lambda=vec3(680E-9,550E-9,450E-9);
const vec3 K=vec3(0.686,0.678,0.666);
const float v=4.0;
const float rayleighZenithLength=8.4E3;
const float mieZenithLength=1.25E3;
const float EE=1000.0;
const float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;
const float cutoffAngle=pi/1.95;
const float steepness=1.5;
vec3 totalRayleigh(vec3 lambda)
{
return (8.0*pow(pi,3.0)*pow(pow(n,2.0)-1.0,2.0)*(6.0+3.0*pn))/(3.0*N*pow(lambda,vec3(4.0))*(6.0-7.0*pn));
}
vec3 simplifiedRayleigh()
{
return 0.0005/vec3(94,40,18);
}
float rayleighPhase(float cosTheta)
{
return (3.0/(16.0*pi))*(1.0+pow(cosTheta,2.0));
}
vec3 totalMie(vec3 lambda,vec3 K,float T)
{
float c=(0.2*T )*10E-18;
return 0.434*c*pi*pow((2.0*pi)/lambda,vec3(v-2.0))*K;
}
float hgPhase(float cosTheta,float g)
{
return (1.0/(4.0*pi))*((1.0-pow(g,2.0))/pow(1.0-2.0*g*cosTheta+pow(g,2.0),1.5));
}
float sunIntensity(float zenithAngleCos)
{
return EE*max(0.0,1.0-exp((-(cutoffAngle-acos(zenithAngleCos))/steepness)));
}
float A=0.15;
float B=0.50;
float C=0.10;
float D=0.20;
float EEE=0.02;
float F=0.30;
float W=1000.0;
vec3 Uncharted2Tonemap(vec3 x)
{
return ((x*(A*x+C*B)+D*EEE)/(x*(A*x+B)+D*F))-EEE/F;
}
void main(void) {

#include<clipPlaneFragment>

float sunfade=1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);
float rayleighCoefficient=rayleigh-(1.0*(1.0-sunfade));
vec3 sunDirection=normalize(sunPosition);
float sunE=sunIntensity(dot(sunDirection,up));
vec3 betaR=simplifiedRayleigh()*rayleighCoefficient;
vec3 betaM=totalMie(lambda,K,turbidity)*mieCoefficient;
float zenithAngle=acos(max(0.0,dot(up,normalize(vPositionW-cameraPosition+cameraOffset))));
float sR=rayleighZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));
float sM=mieZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));
vec3 Fex=exp(-(betaR*sR+betaM*sM));
float cosTheta=dot(normalize(vPositionW-cameraPosition),sunDirection);
float rPhase=rayleighPhase(cosTheta*0.5+0.5);
vec3 betaRTheta=betaR*rPhase;
float mPhase=hgPhase(cosTheta,mieDirectionalG);
vec3 betaMTheta=betaM*mPhase;
vec3 Lin=pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*(1.0-Fex),vec3(1.5));
Lin*=mix(vec3(1.0),pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up,sunDirection),5.0),0.0,1.0));
vec3 direction=normalize(vPositionW-cameraPosition);
float theta=acos(direction.y);
float phi=atan(direction.z,direction.x);
vec2 uv=vec2(phi,theta)/vec2(2.0*pi,pi)+vec2(0.5,0.0);
vec3 L0=vec3(0.1)*Fex;
float sundisk=smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);
L0+=(sunE*19000.0*Fex)*sundisk;
vec3 whiteScale=1.0/Uncharted2Tonemap(vec3(W));
vec3 texColor=(Lin+L0);
texColor*=0.04 ;
texColor+=vec3(0.0,0.001,0.0025)*0.3;
float g_fMaxLuminance=1.0;
float fLumScaled=0.1/luminance;
float fLumCompressed=(fLumScaled*(1.0+(fLumScaled/(g_fMaxLuminance*g_fMaxLuminance))))/(1.0+fLumScaled);
float ExposureBias=fLumCompressed;
vec3 curr=Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);



vec3 retColor=curr*whiteScale;


float alpha=1.0;
#ifdef VERTEXCOLOR
retColor.rgb*=vColor.rgb;
#endif
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif

vec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);

#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}
`;E.ShadersStore[Ai]=Di;var Ri="skyVertexShader",Oi=`precision highp float;

attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif

uniform mat4 world;
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
void main(void) {
gl_Position=viewProjection*world*vec4(position,1.0);
vec4 worldPos=world*vec4(position,1.0);
vPositionW=vec3(worldPos);

#include<clipPlaneVertex>

#include<fogVertex>

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[Ri]=Oi;var Ii=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.POINTSIZE=!1,e.FOG=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),bi=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.luminance=1,r.turbidity=10,r.rayleigh=2,r.mieCoefficient=.005,r.mieDirectionalG=.8,r.distance=500,r.inclination=.49,r.azimuth=.25,r.sunPosition=new A(0,100,0),r.useSunPosition=!1,r.cameraOffset=A.Zero(),r.up=A.Up(),r._cameraPosition=A.Zero(),r._skyOrientation=new $,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Ii);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,!1,i),f.PrepareDefinesForAttributes(e,i,!0,!1),i.IMAGEPROCESSINGPOSTPROCESS!==o.imageProcessingConfiguration.applyByPostProcess&&i.markAsMiscDirty(),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var s=new N;i.FOG&&s.addFallback(1,"FOG"),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var d=[h.PositionKind];i.VERTEXCOLOR&&d.push(h.ColorKind);var u="sky",p=i.toString();n.setEffect(o.getEngine().createEffect(u,d,["world","viewProjection","view","vFogInfos","vFogColor","pointSize","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset","up"],[],p,s,this.onCompiled,this.onError),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;if(!!s){this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),this._mustRebind(i,s)&&(f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize)),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect);var d=i.activeCamera;if(d){var u=d.getWorldMatrix();this._cameraPosition.x=u.m[12],this._cameraPosition.y=u.m[13],this._cameraPosition.z=u.m[14],this._activeEffect.setVector3("cameraPosition",this._cameraPosition)}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this._activeEffect.setVector3("up",this.up),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){var p=Math.PI*(this.inclination-.5),m=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(m)*Math.cos(p),this.sunPosition.y=this.distance*Math.sin(-p),this.sunPosition.z=this.distance*Math.sin(m)*Math.cos(p),$.FromUnitVectorsToRef(A.UpReadOnly,this.up,this._skyOrientation),this.sunPosition.rotateByQuaternionToRef(this._skyOrientation,this.sunPosition)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(n,this._activeEffect)}}},t.prototype.getAnimatables=function(){return[]},t.prototype.dispose=function(e){l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.SkyMaterial",e},t.prototype.getClassName=function(){return"SkyMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([c()],t.prototype,"luminance",void 0),a([c()],t.prototype,"turbidity",void 0),a([c()],t.prototype,"rayleigh",void 0),a([c()],t.prototype,"mieCoefficient",void 0),a([c()],t.prototype,"mieDirectionalG",void 0),a([c()],t.prototype,"distance",void 0),a([c()],t.prototype,"inclination",void 0),a([c()],t.prototype,"azimuth",void 0),a([U()],t.prototype,"sunPosition",void 0),a([c()],t.prototype,"useSunPosition",void 0),a([U()],t.prototype,"cameraOffset",void 0),a([U()],t.prototype,"up",void 0),t}(b);R("BABYLON.SkyMaterial",bi);var Ni="terrainPixelShader",Mi=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]

#ifdef DIFFUSE
varying vec2 vTextureUV;
uniform sampler2D textureSampler;
uniform vec2 vTextureInfos;
uniform sampler2D diffuse1Sampler;
uniform sampler2D diffuse2Sampler;
uniform sampler2D diffuse3Sampler;
uniform vec2 diffuse1Infos;
uniform vec2 diffuse2Infos;
uniform vec2 diffuse3Infos;
#endif
#ifdef BUMP
uniform sampler2D bump1Sampler;
uniform sampler2D bump2Sampler;
uniform sampler2D bump3Sampler;
#endif

#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>

#include<fogFragmentDeclaration>

#ifdef BUMP
#extension GL_OES_standard_derivatives : enable

mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv)
{

vec3 dp1=dFdx(p);
vec3 dp2=dFdy(p);
vec2 duv1=dFdx(uv);
vec2 duv2=dFdy(uv);

vec3 dp2perp=cross(dp2,normal);
vec3 dp1perp=cross(normal,dp1);
vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;
vec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;

float invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));
return mat3(tangent*invmax,binormal*invmax,normal);
}
vec3 perturbNormal(vec3 viewDir,vec3 mixColor)
{
vec3 bump1Color=texture2D(bump1Sampler,vTextureUV*diffuse1Infos).xyz;
vec3 bump2Color=texture2D(bump2Sampler,vTextureUV*diffuse2Infos).xyz;
vec3 bump3Color=texture2D(bump3Sampler,vTextureUV*diffuse3Infos).xyz;
bump1Color.rgb*=mixColor.r;
bump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);
vec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);
map=map*255./127.-128./127.;
mat3 TBN=cotangent_frame(vNormalW*vTextureInfos.y,-viewDir,vTextureUV);
return normalize(TBN*map);
}
#endif
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif

float alpha=vDiffuseColor.a;

#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef DIFFUSE
baseColor=texture2D(textureSampler,vTextureUV);
#if defined(BUMP) && defined(DIFFUSE)
normalW=perturbNormal(viewDirectionW,baseColor.rgb);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vTextureInfos.y;
vec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);
vec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);
vec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);
diffuse1Color.rgb*=baseColor.r;
diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);
baseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor*baseColor.rgb,0.0,1.0);

vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}
`;E.ShadersStore[Ni]=Mi;var wi="terrainVertexShader",Vi=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;
uniform mat4 textureMatrix;
uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vTextureInfos.x == 0.)
{
vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));
}
else
{
vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[wi]=Vi;var Ui=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSE=!1,e.BUMP=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),Bi=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.diffuseColor=new S(1,1,1),r.specularColor=new S(0,0,0),r.specularPower=64,r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Ui);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(o.texturesEnabled){if(!this.mixTexture||!this.mixTexture.isReady())return!1;if(i._needUVs=!0,y.DiffuseTextureEnabled){if(!this.diffuseTexture1||!this.diffuseTexture1.isReady()||!this.diffuseTexture2||!this.diffuseTexture2.isReady()||!this.diffuseTexture3||!this.diffuseTexture3.isReady())return!1;i.DIFFUSE=!0}if(this.bumpTexture1&&this.bumpTexture2&&this.bumpTexture3&&y.BumpTextureEnabled){if(!this.bumpTexture1.isReady()||!this.bumpTexture2.isReady()||!this.bumpTexture3.isReady())return!1;i._needNormals=!0,i.BUMP=!0}}if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var d=new N;i.FOG&&d.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,d,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var u=[h.PositionKind];i.NORMAL&&u.push(h.NormalKind),i.UV1&&u.push(h.UVKind),i.UV2&&u.push(h.UV2Kind),i.VERTEXCOLOR&&u.push(h.ColorKind),f.PrepareAttributesForBones(u,e,i,d),f.PrepareAttributesForInstances(u,i);var p="terrain",m=i.toString(),x=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos"],g=["textureSampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","bump1Sampler","bump2Sampler","bump3Sampler"],_=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(p,{attributes:u,uniformsNames:x,uniformBuffersNames:_,samplers:g,defines:m,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this.mixTexture&&(this._activeEffect.setTexture("textureSampler",this._mixTexture),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture.coordinatesIndex,this._mixTexture.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture.getTextureMatrix()),y.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale))),y.BumpTextureEnabled&&i.getEngine().getCaps().standardDerivatives&&(this._bumpTexture1&&this._activeEffect.setTexture("bump1Sampler",this._bumpTexture1),this._bumpTexture2&&this._activeEffect.setTexture("bump2Sampler",this._bumpTexture2),this._bumpTexture3&&this._activeEffect.setTexture("bump3Sampler",this._bumpTexture3))),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._mixTexture&&e.push(this._mixTexture),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._bumpTexture1&&e.push(this._bumpTexture1),this._bumpTexture2&&e.push(this._bumpTexture2),this._bumpTexture3&&e.push(this._bumpTexture3),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this._mixTexture===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._bumpTexture1===e||this._bumpTexture2===e||this._bumpTexture3===e)},t.prototype.dispose=function(e){this.mixTexture&&this.mixTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.TerrainMaterial",e},t.prototype.getClassName=function(){return"TerrainMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P("mixTexture")],t.prototype,"_mixTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"mixTexture",void 0),a([P("diffuseTexture1")],t.prototype,"_diffuseTexture1",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture1",void 0),a([P("diffuseTexture2")],t.prototype,"_diffuseTexture2",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture2",void 0),a([P("diffuseTexture3")],t.prototype,"_diffuseTexture3",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTexture3",void 0),a([P("bumpTexture1")],t.prototype,"_bumpTexture1",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture1",void 0),a([P("bumpTexture2")],t.prototype,"_bumpTexture2",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture2",void 0),a([P("bumpTexture3")],t.prototype,"_bumpTexture3",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture3",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([F()],t.prototype,"specularColor",void 0),a([c()],t.prototype,"specularPower",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.TerrainMaterial",Bi);var zi="triplanarPixelShader",Gi=`precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif

varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]

#ifdef DIFFUSEX
varying vec2 vTextureUVX;
uniform sampler2D diffuseSamplerX;
#ifdef BUMPX
uniform sampler2D normalSamplerX;
#endif
#endif
#ifdef DIFFUSEY
varying vec2 vTextureUVY;
uniform sampler2D diffuseSamplerY;
#ifdef BUMPY
uniform sampler2D normalSamplerY;
#endif
#endif
#ifdef DIFFUSEZ
varying vec2 vTextureUVZ;
uniform sampler2D diffuseSamplerZ;
#ifdef BUMPZ
uniform sampler2D normalSamplerZ;
#endif
#endif
#ifdef NORMAL
varying mat3 tangentSpace;
#endif
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(0.,0.,0.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;

#ifdef NORMAL
vec3 normalW=tangentSpace[2];
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec4 baseNormal=vec4(0.0,0.0,0.0,1.0);
normalW*=normalW;
#ifdef DIFFUSEX
baseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;
#ifdef BUMPX
baseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;
#endif
#endif
#ifdef DIFFUSEY
baseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;
#ifdef BUMPY
baseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;
#endif
#endif
#ifdef DIFFUSEZ
baseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;
#ifdef BUMPZ
baseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;
#endif
#endif
#ifdef NORMAL
normalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularBase=vec3(0.,0.,0.);
vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;

vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
}
`;E.ShadersStore[zi]=Gi;var Wi="triplanarVertexShader",Hi=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef DIFFUSEX
varying vec2 vTextureUVX;
#endif
#ifdef DIFFUSEY
varying vec2 vTextureUVY;
#endif
#ifdef DIFFUSEZ
varying vec2 vTextureUVZ;
#endif
uniform float tileSize;
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying mat3 tangentSpace;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
void main(void)
{
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef DIFFUSEX
vTextureUVX=worldPos.zy/tileSize;
#endif
#ifdef DIFFUSEY
vTextureUVY=worldPos.xz/tileSize;
#endif
#ifdef DIFFUSEZ
vTextureUVZ=worldPos.xy/tileSize;
#endif
#ifdef NORMAL

vec3 xtan=vec3(0,0,1);
vec3 xbin=vec3(0,1,0);
vec3 ytan=vec3(1,0,0);
vec3 ybin=vec3(0,0,1);
vec3 ztan=vec3(1,0,0);
vec3 zbin=vec3(0,1,0);
vec3 normalizedNormal=normalize(normal);
normalizedNormal*=normalizedNormal;
vec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);
vec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);
worldTangent=(world*vec4(worldTangent,0.0)).xyz;
worldBinormal=(world*vec4(worldBinormal,0.0)).xyz;
vec3 worldNormal=(world*vec4(normalize(normal),0.0)).xyz;
tangentSpace[0]=worldTangent;
tangentSpace[1]=worldBinormal;
tangentSpace[2]=worldNormal;
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
}
`;E.ShadersStore[Wi]=Hi;var Xi=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.DIFFUSEX=!1,e.DIFFUSEY=!1,e.DIFFUSEZ=!1,e.BUMPX=!1,e.BUMPY=!1,e.BUMPZ=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),ki=function(l){C(t,l);function t(e,n){var r=l.call(this,e,n)||this;return r.tileSize=1,r.diffuseColor=new S(1,1,1),r.specularColor=new S(.2,.2,.2),r.specularPower=64,r._disableLighting=!1,r._maxSimultaneousLights=4,r}return t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new Xi);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&o.texturesEnabled){if(y.DiffuseTextureEnabled){for(var d=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],u=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"],p=0;p<d.length;p++)if(d[p])if(d[p].isReady())i[u[p]]=!0;else return!1}if(y.BumpTextureEnabled){for(var d=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],u=["BUMPX","BUMPY","BUMPZ"],p=0;p<d.length;p++)if(d[p])if(d[p].isReady())i[u[p]]=!0;else return!1}}if(f.PrepareDefinesForMisc(e,o,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=f.PrepareDefinesForLights(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var m=new N;i.FOG&&m.addFallback(1,"FOG"),f.HandleFallbacksForShadows(i,m,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&m.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;var x=[h.PositionKind];i.NORMAL&&x.push(h.NormalKind),i.VERTEXCOLOR&&x.push(h.ColorKind),f.PrepareAttributesForBones(x,e,i,m),f.PrepareAttributesForInstances(x,i);var g="triplanar",_=i.toString(),L=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","tileSize"],M=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ"],w=new Array;f.PrepareUniformsAndSamplersList({uniformsNames:L,uniformBuffersNames:w,samplers:M,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(g,{attributes:x,uniformsNames:L,uniformBuffersNames:w,samplers:M,defines:_,fallbacks:m,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;!s||(this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._activeEffect.setFloat("tileSize",this.tileSize),i.getCachedMaterial()!==this&&(this.diffuseTextureX&&this._activeEffect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._activeEffect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._activeEffect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._activeEffect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._activeEffect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._activeEffect.setTexture("normalSamplerZ",this.normalTextureZ),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),this._afterBind(n,this._activeEffect))}},t.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._diffuseTextureX&&e.push(this._diffuseTextureX),this._diffuseTextureY&&e.push(this._diffuseTextureY),this._diffuseTextureZ&&e.push(this._diffuseTextureZ),this._normalTextureX&&e.push(this._normalTextureX),this._normalTextureY&&e.push(this._normalTextureY),this._normalTextureZ&&e.push(this._normalTextureZ),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this._diffuseTextureX===e||this._diffuseTextureY===e||this._diffuseTextureZ===e||this._normalTextureX===e||this._normalTextureY===e||this._normalTextureZ===e)},t.prototype.dispose=function(e){this.mixTexture&&this.mixTexture.dispose(),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);return e.customType="BABYLON.TriPlanarMaterial",e},t.prototype.getClassName=function(){return"TriPlanarMaterial"},t.Parse=function(e,n,r){return T.Parse(function(){return new t(e.name,n)},e,n,r)},a([P()],t.prototype,"mixTexture",void 0),a([P("diffuseTextureX")],t.prototype,"_diffuseTextureX",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureX",void 0),a([P("diffuseTexturY")],t.prototype,"_diffuseTextureY",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureY",void 0),a([P("diffuseTextureZ")],t.prototype,"_diffuseTextureZ",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"diffuseTextureZ",void 0),a([P("normalTextureX")],t.prototype,"_normalTextureX",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureX",void 0),a([P("normalTextureY")],t.prototype,"_normalTextureY",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureY",void 0),a([P("normalTextureZ")],t.prototype,"_normalTextureZ",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"normalTextureZ",void 0),a([c()],t.prototype,"tileSize",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([F()],t.prototype,"specularColor",void 0),a([c()],t.prototype,"specularPower",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),t}(b);R("BABYLON.TriPlanarMaterial",ki);var ji="waterPixelShader",Zi=`#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
precision highp float;

uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>
#include<imageProcessingDeclaration>
#include<imageProcessingFunctions>

#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>

#ifdef BUMP
varying vec2 vNormalUV;
#ifdef BUMPSUPERIMPOSE
varying vec2 vNormalUV2;
#endif
uniform sampler2D normalSampler;
uniform vec2 vNormalInfos;
#endif
uniform sampler2D refractionSampler;
uniform sampler2D reflectionSampler;

const float LOG2=1.442695;
uniform vec3 cameraPosition;
uniform vec4 waterColor;
uniform float colorBlendFactor;
uniform vec4 waterColor2;
uniform float colorBlendFactor2;
uniform float bumpHeight;
uniform float time;

varying vec3 vRefractionMapTexCoord;
varying vec3 vReflectionMapTexCoord;
varying vec3 vPosition;
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>

#include<fogFragmentDeclaration>
void main(void) {

#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);

vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;

float alpha=vDiffuseColor.a;
#ifdef BUMP
#ifdef BUMPSUPERIMPOSE
baseColor=0.6*texture2D(normalSampler,vNormalUV)+0.4*texture2D(normalSampler,vec2(vNormalUV2.x,vNormalUV2.y));
#else
baseColor=texture2D(normalSampler,vNormalUV);
#endif
vec3 bumpColor=baseColor.rgb;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
baseColor.rgb*=vNormalInfos.y;
#else
vec3 bumpColor=vec3(1.0);
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif

#ifdef NORMAL
vec2 perturbation=bumpHeight*(baseColor.rg-0.5);
#ifdef BUMPAFFECTSREFLECTION
vec3 normalW=normalize(vNormalW+vec3(perturbation.x*8.0,0.0,perturbation.y*8.0));
if (normalW.y<0.0) {
normalW.y=-normalW.y;
}
#else
vec3 normalW=normalize(vNormalW);
#endif
#else
vec3 normalW=vec3(1.0,1.0,1.0);
vec2 perturbation=bumpHeight*(vec2(1.0,1.0)-0.5);
#endif
#ifdef FRESNELSEPARATE
#ifdef REFLECTION

vec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation*0.5,0.0,1.0);
vec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);
#ifdef IS_REFRACTION_LINEAR
refractiveColor.rgb=toGammaSpace(refractiveColor.rgb);
#endif
vec2 projectedReflectionTexCoords=clamp(vec2(
vReflectionMapTexCoord.x/vReflectionMapTexCoord.z+perturbation.x*0.3,
vReflectionMapTexCoord.y/vReflectionMapTexCoord.z+perturbation.y
),0.0,1.0);
vec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);
#ifdef IS_REFLECTION_LINEAR
reflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);
#endif
vec3 upVector=vec3(0.0,1.0,0.0);
float fresnelTerm=clamp(abs(pow(dot(viewDirectionW,upVector),3.0)),0.05,0.65);
float IfresnelTerm=1.0-fresnelTerm;
refractiveColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*refractiveColor;
reflectiveColor=IfresnelTerm*colorBlendFactor2*waterColor+(1.0-colorBlendFactor2*IfresnelTerm)*reflectiveColor;
vec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*IfresnelTerm;
baseColor=combinedColor;
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularBase=vec3(0.,0.,0.);
vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
#else
#ifdef REFLECTION

vec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation,0.0,1.0);
vec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);
#ifdef IS_REFRACTION_LINEAR
refractiveColor.rgb=toGammaSpace(refractiveColor.rgb);
#endif
vec2 projectedReflectionTexCoords=clamp(vReflectionMapTexCoord.xy/vReflectionMapTexCoord.z+perturbation,0.0,1.0);
vec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);
#ifdef IS_REFLECTION_LINEAR
reflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);
#endif
vec3 upVector=vec3(0.0,1.0,0.0);
float fresnelTerm=max(dot(viewDirectionW,upVector),0.0);
vec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*(1.0-fresnelTerm);
baseColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*combinedColor;
#endif

vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularBase=vec3(0.,0.,0.);
vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);
#ifdef VERTEXALPHA
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
#endif

vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<logDepthFragment>
#include<fogFragment>


#ifdef IMAGEPROCESSINGPOSTPROCESS
color.rgb=toLinearSpace(color.rgb);
#elif defined(IMAGEPROCESSING)
color.rgb=toLinearSpace(color.rgb);
color=applyImageProcessing(color);
#endif
gl_FragColor=color;
}
`;E.ShadersStore[ji]=Zi;var Yi="waterVertexShader",Ki=`precision highp float;

attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>

#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef BUMP
varying vec2 vNormalUV;
#ifdef BUMPSUPERIMPOSE
varying vec2 vNormalUV2;
#endif
uniform mat4 normalMatrix;
uniform vec2 vNormalInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif

varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<logDepthDeclaration>

uniform mat4 worldReflectionViewProjection;
uniform vec2 windDirection;
uniform float waveLength;
uniform float time;
uniform float windForce;
uniform float waveHeight;
uniform float waveSpeed;
uniform float waveCount;

varying vec3 vPosition;
varying vec3 vRefractionMapTexCoord;
varying vec3 vReflectionMapTexCoord;
void main(void) {
#include<instancesVertex>
#include<bonesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif

#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef BUMP
if (vNormalInfos.x == 0.)
{
vNormalUV=vec2(normalMatrix*vec4((uv*1.0)/waveLength+time*windForce*windDirection,1.0,0.0));
#ifdef BUMPSUPERIMPOSE
vNormalUV2=vec2(normalMatrix*vec4((uv*0.721)/waveLength+time*1.2*windForce*windDirection,1.0,0.0));
#endif
}
else
{
vNormalUV=vec2(normalMatrix*vec4((uv2*1.0)/waveLength+time*windForce*windDirection ,1.0,0.0));
#ifdef BUMPSUPERIMPOSE
vNormalUV2=vec2(normalMatrix*vec4((uv2*0.721)/waveLength+time*1.2*windForce*windDirection ,1.0,0.0));
#endif
}
#endif

#include<clipPlaneVertex>

#include<fogVertex>

#include<shadowsVertex>[0..maxSimultaneousLights]

#ifdef VERTEXCOLOR
vColor=color;
#endif

#ifdef POINTSIZE
gl_PointSize=pointSize;
#endif
float finalWaveCount=1.0/(waveCount*0.5);
vec3 p=position;
float newY=(sin(((p.x/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.x*5.0)
+(cos(((p.z/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.y*5.0);
p.y+=abs(newY);
gl_Position=viewProjection*finalWorld*vec4(p,1.0);
#ifdef REFLECTION
worldPos=viewProjection*finalWorld*vec4(p,1.0);

vPosition=position;
vRefractionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);
vRefractionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);
vRefractionMapTexCoord.z=worldPos.w;
worldPos=worldReflectionViewProjection*vec4(position,1.0);
vReflectionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);
vReflectionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);
vReflectionMapTexCoord.z=worldPos.w;
#endif
#include<logDepthVertex>
}
`;E.ShadersStore[Yi]=Ki;var $i=function(l){C(t,l);function t(){var e=l.call(this)||this;return e.BUMP=!1,e.REFLECTION=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.SPECULARTERM=!1,e.LOGARITHMICDEPTH=!1,e.USE_REVERSE_DEPTHBUFFER=!1,e.FRESNELSEPARATE=!1,e.BUMPSUPERIMPOSE=!1,e.BUMPAFFECTSREFLECTION=!1,e.IMAGEPROCESSING=!1,e.VIGNETTE=!1,e.VIGNETTEBLENDMODEMULTIPLY=!1,e.VIGNETTEBLENDMODEOPAQUE=!1,e.TONEMAPPING=!1,e.TONEMAPPING_ACES=!1,e.CONTRAST=!1,e.EXPOSURE=!1,e.COLORCURVES=!1,e.COLORGRADING=!1,e.COLORGRADING3D=!1,e.SAMPLER3DGREENDEPTH=!1,e.SAMPLER3DBGRMAP=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return t}(I),qi=function(l){C(t,l);function t(e,n,r){r===void 0&&(r=new q(512,512));var i=l.call(this,e,n)||this;return i.renderTargetSize=r,i.diffuseColor=new S(1,1,1),i.specularColor=new S(0,0,0),i.specularPower=64,i._disableLighting=!1,i._maxSimultaneousLights=4,i.windForce=6,i.windDirection=new q(0,1),i.waveHeight=.4,i.bumpHeight=.4,i._bumpSuperimpose=!1,i._fresnelSeparate=!1,i._bumpAffectsReflection=!1,i.waterColor=new S(.1,.1,.6),i.colorBlendFactor=.2,i.waterColor2=new S(.1,.1,.6),i.colorBlendFactor2=.2,i.waveLength=.1,i.waveSpeed=1,i.waveCount=20,i.disableClipPlane=!1,i._renderTargets=new le(16),i._mesh=null,i._reflectionTransform=W.Zero(),i._lastTime=0,i._lastDeltaTime=0,i._createRenderTargets(n,r),i.getRenderTargetTextures=function(){return i._renderTargets.reset(),i._renderTargets.push(i._reflectionRTT),i._renderTargets.push(i._refractionRTT),i._renderTargets},i._imageProcessingConfiguration=i.getScene().imageProcessingConfiguration,i._imageProcessingConfiguration&&(i._imageProcessingObserver=i._imageProcessingConfiguration.onUpdateParameters.add(function(){i._markAllSubMeshesAsImageProcessingDirty()})),i}return Object.defineProperty(t.prototype,"hasRenderTargetTextures",{get:function(){return!0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"useLogarithmicDepth",{get:function(){return this._useLogarithmicDepth},set:function(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported,this._markAllSubMeshesAsMiscDirty()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"refractionTexture",{get:function(){return this._refractionRTT},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"reflectionTexture",{get:function(){return this._reflectionRTT},enumerable:!1,configurable:!0}),t.prototype.addToRenderList=function(e){this._refractionRTT&&this._refractionRTT.renderList&&this._refractionRTT.renderList.push(e),this._reflectionRTT&&this._reflectionRTT.renderList&&this._reflectionRTT.renderList.push(e)},t.prototype.enableRenderTargets=function(e){var n=e?1:0;this._refractionRTT&&(this._refractionRTT.refreshRate=n),this._reflectionRTT&&(this._reflectionRTT.refreshRate=n)},t.prototype.getRenderList=function(){return this._refractionRTT?this._refractionRTT.renderList:[]},Object.defineProperty(t.prototype,"renderTargetsEnabled",{get:function(){return!(this._refractionRTT&&this._refractionRTT.refreshRate===0)},enumerable:!1,configurable:!0}),t.prototype.needAlphaBlending=function(){return this.alpha<1},t.prototype.needAlphaTesting=function(){return!1},t.prototype.getAlphaTestTexture=function(){return null},t.prototype.isReadyForSubMesh=function(e,n,r){if(this.isFrozen&&n.effect&&n.effect._wasPreviouslyReady)return!0;n._materialDefines||(n.materialDefines=new $i);var i=n._materialDefines,o=this.getScene();if(this._isReadyForSubMesh(n))return!0;var s=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled)){if(this.bumpTexture&&y.BumpTextureEnabled)if(this.bumpTexture.isReady())i._needUVs=!0,i.BUMP=!0;else return!1;y.ReflectionTextureEnabled&&(i.REFLECTION=!0)}if(f.PrepareDefinesForFrameBoundValues(o,s,i,!!r),f.PrepareDefinesForMisc(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._areMiscDirty&&(this._fresnelSeparate&&(i.FRESNELSEPARATE=!0),this._bumpSuperimpose&&(i.BUMPSUPERIMPOSE=!0),this._bumpAffectsReflection&&(i.BUMPAFFECTSREFLECTION=!0)),i._needNormals=f.PrepareDefinesForLights(o,e,i,!0,this._maxSimultaneousLights,this._disableLighting),i._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(i),i.IS_REFLECTION_LINEAR=this.reflectionTexture!=null&&!this.reflectionTexture.gammaSpace,i.IS_REFRACTION_LINEAR=this.refractionTexture!=null&&!this.refractionTexture.gammaSpace}if(f.PrepareDefinesForAttributes(e,i,!0,!0),this._mesh=e,this._waitingRenderList){for(var d=0;d<this._waitingRenderList.length;d++)this.addToRenderList(o.getNodeById(this._waitingRenderList[d]));this._waitingRenderList=null}if(i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();var u=new N;i.FOG&&u.addFallback(1,"FOG"),i.LOGARITHMICDEPTH&&u.addFallback(0,"LOGARITHMICDEPTH"),f.HandleFallbacksForShadows(i,u,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&u.addCPUSkinningFallback(0,e);var p=[h.PositionKind];i.NORMAL&&p.push(h.NormalKind),i.UV1&&p.push(h.UVKind),i.UV2&&p.push(h.UV2Kind),i.VERTEXCOLOR&&p.push(h.ColorKind),f.PrepareAttributesForBones(p,e,i,u),f.PrepareAttributesForInstances(p,i);var m="water",x=i.toString(),g=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vNormalInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","normalMatrix","logarithmicDepthConstant","worldReflectionViewProjection","windDirection","waveLength","time","windForce","cameraPosition","bumpHeight","waveHeight","waterColor","waterColor2","colorBlendFactor","colorBlendFactor2","waveSpeed","waveCount"],_=["normalSampler","refractionSampler","reflectionSampler"],L=new Array;H&&(H.PrepareUniforms(g,i),H.PrepareSamplers(_,i)),f.PrepareUniformsAndSamplersList({uniformsNames:g,uniformBuffersNames:L,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),n.setEffect(o.getEngine().createEffect(m,{attributes:p,uniformsNames:g,uniformBuffersNames:L,samplers:_,defines:x,fallbacks:u,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights}},s),i,this._materialContext)}return!n.effect||!n.effect.isReady()?!1:(i._renderId=o.getRenderId(),n.effect._wasPreviouslyReady=!0,!0)},t.prototype.bindForSubMesh=function(e,n,r){var i=this.getScene(),o=r._materialDefines;if(!!o){var s=r.effect;if(!(!s||!this._mesh)){this._activeEffect=s,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),f.BindBonesParameters(n,this._activeEffect),this._mustRebind(i,s)&&(this.bumpTexture&&y.BumpTextureEnabled&&(this._activeEffect.setTexture("normalSampler",this.bumpTexture),this._activeEffect.setFloat2("vNormalInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._activeEffect.setMatrix("normalMatrix",this.bumpTexture.getTextureMatrix())),f.BindClipPlane(this._activeEffect,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(s)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*n.visibility),o.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&f.BindLights(i,n,this._activeEffect,o,this.maxSimultaneousLights),i.fogEnabled&&n.applyFog&&i.fogMode!==O.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),f.BindFogParameters(i,n,this._activeEffect),f.BindLogDepth(o,this._activeEffect,i),y.ReflectionTextureEnabled&&(this._activeEffect.setTexture("refractionSampler",this._refractionRTT),this._activeEffect.setTexture("reflectionSampler",this._reflectionRTT));var d=this._mesh.getWorldMatrix().multiply(this._reflectionTransform).multiply(i.getProjectionMatrix()),u=i.getEngine().getDeltaTime();u!==this._lastDeltaTime&&(this._lastDeltaTime=u,this._lastTime+=this._lastDeltaTime),this._activeEffect.setMatrix("worldReflectionViewProjection",d),this._activeEffect.setVector2("windDirection",this.windDirection),this._activeEffect.setFloat("waveLength",this.waveLength),this._activeEffect.setFloat("time",this._lastTime/1e5),this._activeEffect.setFloat("windForce",this.windForce),this._activeEffect.setFloat("waveHeight",this.waveHeight),this._activeEffect.setFloat("bumpHeight",this.bumpHeight),this._activeEffect.setColor4("waterColor",this.waterColor,1),this._activeEffect.setFloat("colorBlendFactor",this.colorBlendFactor),this._activeEffect.setColor4("waterColor2",this.waterColor2,1),this._activeEffect.setFloat("colorBlendFactor2",this.colorBlendFactor2),this._activeEffect.setFloat("waveSpeed",this.waveSpeed),this._activeEffect.setFloat("waveCount",this.waveCount),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect),this._afterBind(n,this._activeEffect)}}},t.prototype._createRenderTargets=function(e,n){var r=this;this._refractionRTT=new Q(name+"_refraction",{width:n.x,height:n.y},e,!1,!0),this._refractionRTT.wrapU=B.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.wrapV=B.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.ignoreCameraViewport=!0,this._reflectionRTT=new Q(name+"_reflection",{width:n.x,height:n.y},e,!1,!0),this._reflectionRTT.wrapU=B.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.wrapV=B.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.ignoreCameraViewport=!0;var i,o=null,s,d=W.Zero();this._refractionRTT.onBeforeRender=function(){if(r._mesh&&(i=r._mesh.isVisible,r._mesh.isVisible=!1),!r.disableClipPlane){o=e.clipPlane;var u=r._mesh?r._mesh.position.y:0;e.clipPlane=J.FromPositionAndNormal(new A(0,u+.05,0),new A(0,1,0))}},this._refractionRTT.onAfterRender=function(){r._mesh&&(r._mesh.isVisible=i),r.disableClipPlane||(e.clipPlane=o)},this._reflectionRTT.onBeforeRender=function(){if(r._mesh&&(i=r._mesh.isVisible,r._mesh.isVisible=!1),!r.disableClipPlane){o=e.clipPlane;var u=r._mesh?r._mesh.position.y:0;e.clipPlane=J.FromPositionAndNormal(new A(0,u-.05,0),new A(0,-1,0)),W.ReflectionToRef(e.clipPlane,d)}s=e.getViewMatrix(),d.multiplyToRef(s,r._reflectionTransform),e.setTransformMatrix(r._reflectionTransform,e.getProjectionMatrix()),e.getEngine().cullBackFaces=!1,e._mirroredCameraPosition=A.TransformCoordinates(e.activeCamera.position,d)},this._reflectionRTT.onAfterRender=function(){r._mesh&&(r._mesh.isVisible=i),e.clipPlane=o,e.setTransformMatrix(s,e.getProjectionMatrix()),e.getEngine().cullBackFaces=null,e._mirroredCameraPosition=null}},t.prototype.getAnimatables=function(){var e=[];return this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&e.push(this.bumpTexture),this._reflectionRTT&&this._reflectionRTT.animations&&this._reflectionRTT.animations.length>0&&e.push(this._reflectionRTT),this._refractionRTT&&this._refractionRTT.animations&&this._refractionRTT.animations.length>0&&e.push(this._refractionRTT),e},t.prototype.getActiveTextures=function(){var e=l.prototype.getActiveTextures.call(this);return this._bumpTexture&&e.push(this._bumpTexture),e},t.prototype.hasTexture=function(e){return!!(l.prototype.hasTexture.call(this,e)||this._bumpTexture===e)},t.prototype.dispose=function(e){this.bumpTexture&&this.bumpTexture.dispose();var n=this.getScene().customRenderTargets.indexOf(this._refractionRTT);n!=-1&&this.getScene().customRenderTargets.splice(n,1),n=-1,n=this.getScene().customRenderTargets.indexOf(this._reflectionRTT),n!=-1&&this.getScene().customRenderTargets.splice(n,1),this._reflectionRTT&&this._reflectionRTT.dispose(),this._refractionRTT&&this._refractionRTT.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),l.prototype.dispose.call(this,e)},t.prototype.clone=function(e){var n=this;return T.Clone(function(){return new t(e,n.getScene())},this)},t.prototype.serialize=function(){var e=T.Serialize(this);if(e.customType="BABYLON.WaterMaterial",e.renderList=[],this._refractionRTT&&this._refractionRTT.renderList)for(var n=0;n<this._refractionRTT.renderList.length;n++)e.renderList.push(this._refractionRTT.renderList[n].id);return e},t.prototype.getClassName=function(){return"WaterMaterial"},t.Parse=function(e,n,r){var i=T.Parse(function(){return new t(e.name,n)},e,n,r);return i._waitingRenderList=e.renderList,i},t.CreateDefaultMesh=function(e,n){var r=ue(e,{width:512,height:512,subdivisions:32,updatable:!1},n);return r},a([P("bumpTexture")],t.prototype,"_bumpTexture",void 0),a([v("_markAllSubMeshesAsTexturesDirty")],t.prototype,"bumpTexture",void 0),a([F()],t.prototype,"diffuseColor",void 0),a([F()],t.prototype,"specularColor",void 0),a([c()],t.prototype,"specularPower",void 0),a([c("disableLighting")],t.prototype,"_disableLighting",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"disableLighting",void 0),a([c("maxSimultaneousLights")],t.prototype,"_maxSimultaneousLights",void 0),a([v("_markAllSubMeshesAsLightsDirty")],t.prototype,"maxSimultaneousLights",void 0),a([c()],t.prototype,"windForce",void 0),a([de()],t.prototype,"windDirection",void 0),a([c()],t.prototype,"waveHeight",void 0),a([c()],t.prototype,"bumpHeight",void 0),a([c("bumpSuperimpose")],t.prototype,"_bumpSuperimpose",void 0),a([v("_markAllSubMeshesAsMiscDirty")],t.prototype,"bumpSuperimpose",void 0),a([c("fresnelSeparate")],t.prototype,"_fresnelSeparate",void 0),a([v("_markAllSubMeshesAsMiscDirty")],t.prototype,"fresnelSeparate",void 0),a([c("bumpAffectsReflection")],t.prototype,"_bumpAffectsReflection",void 0),a([v("_markAllSubMeshesAsMiscDirty")],t.prototype,"bumpAffectsReflection",void 0),a([F()],t.prototype,"waterColor",void 0),a([c()],t.prototype,"colorBlendFactor",void 0),a([F()],t.prototype,"waterColor2",void 0),a([c()],t.prototype,"colorBlendFactor2",void 0),a([c()],t.prototype,"waveLength",void 0),a([c()],t.prototype,"waveSpeed",void 0),a([c()],t.prototype,"waveCount",void 0),a([c()],t.prototype,"disableClipPlane",void 0),a([c()],t.prototype,"useLogarithmicDepth",null),t}(b);R("BABYLON.WaterMaterial",qi);window.CANNON=xe;function tt(l,t){l.enableOfflineSupport=!1,ce.AllowMatricesInterpolation=!0;var e=new O(l);const n=new ve("Camera",Math.PI/6,Math.PI/4,50,A.Zero(),e);n.setTarget(A.Zero()),e.enablePhysics(null,new he),e.clearColor=S.White().toColor4();const r=ee.CreateGround("ground",{width:1e3,height:1e3},e);r.receiveShadows=!0,r.material=new te("groundMat",e),r.physicsImpostor=new z(r,z.BoxImpostor,{mass:0,restitution:.1},e);var i=new pe("directionalLight",new A(-1,-1,-1),e);i.position=new A(0,10,0),i.radius=10,i.specular=S.Black();var o=new me(1024,i);o.setDarkness(.9),o.shadowMaxZ=100;var s=new ge("hemisphericLight",new A(1,1,1),e);s.intensity=.8,s.specular=S.Black(),Qi(e,r,o);var d=!1,u=null;e.onPointerObservable.add(g=>{switch(g.type){case k.POINTERDOWN:d=!0;break;case k.POINTERUP:d=!1,u=null;break;case k.POINTERMOVE:if(d){var _=e.pick(e.pointerX,e.pointerY,M=>M===r);const L=_==null?void 0:_.pickedPoint;if(u&&L){const M=L.subtract(u);e.meshes.forEach(w=>{w.position.subtract(L).length()<3&&w.applyImpulse(M.scale(7),w.absolutePosition)})}u=L}break}});function p(){e.debugLayer.show()}function m(){n.attachControl(t,!1)}const x={debug:p,enableCamera:m};return console.debug("hax",x),Object.assign(window,{hax:x}),e}async function Qi(l,t,e){for(var n=0;n<100;n++){const r=Ji(l,t);e.addShadowCaster(r.mesh,!0),await ne(10)}}function Ji(l,t){const e=new S;S.HSVtoRGBToRef(Math.random()*360,.5,1,e);const n=ee.CreateBox("cube",{size:1,faceColors:[e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4()]},l);n.receiveShadows=!0,n.position.set(Math.random()*100-50,2,Math.random()*100-50),n.physicsImpostor=new z(n,z.BoxImpostor,{mass:1,restitution:.5},l);function r(d){n.applyImpulse(d.normalize().scale(2),n.getAbsolutePosition().addInPlaceFromFloats(0,.5,0))}const i=[A.Forward(),A.Backward(),A.Left(),A.Right()];async function o(){for(;;){if(s)if(Math.random()<.25){const d=n.position.scale(-1);r(d)}else{const d=i[Math.trunc(Math.random()*i.length)];r(d)}await ne(Math.random()*50+50)}}o();var s=!1;return n.actionManager=new X(l),n.actionManager.registerAction(new ie({trigger:X.OnIntersectionEnterTrigger,parameter:t},()=>{s=!0})),n.actionManager.registerAction(new ie({trigger:X.OnIntersectionExitTrigger,parameter:t},()=>{s=!1})),{mesh:n,move:r}}function ne(l){return new Promise(t=>setTimeout(t,l))}export{tt as createScene};
