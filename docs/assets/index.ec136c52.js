import{ag as ze,_ as Ue,ah as ut,l as Ve,ai as He,aj as M,ak as vt,w as ge,aa as at,al as Ae,am as P,an as Ie,ao as pe,ap as je,aq as ce,ar as ct,as as rt,g as $e,k as si,at as li,K as fi,au as Xt,f as zt,V as Ke,av as ui,aw as Wt,d as ci,Q as Kt,e as $t,ax as hi,M as qt,ay as Yt,a6 as Qt,n as Gt,az as Jt,aA as di,aB as vi,o as pi,A as mi,aC as gi,aD as ei,aE as Ht,p as yi,aF as xi,H as Ti,ae as Zt,af as ti,ad as jt}from"./vendor.3896ac18.js";var Si="cellPixelShader",Ei=`precision highp float;

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
}`;ze.ShadersStore[Si]=Ei;var Pi="cellVertexShader",Ci=`precision highp float;

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
`;ze.ShadersStore[Pi]=Ci;var _i=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.NDOTL=!0,e.CUSTOMUSERLIGHTING=!0,e.CELLBASIC=!0,e.DEPTHPREPASS=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),wi=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d._computeHighLevel=!1,d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new _i);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled&&this._diffuseTexture&&He.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(t.CELLBASIC=!this.computeHighLevel,M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="cell",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],h=["diffuseSampler"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights-1}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this._diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this._maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},a.prototype.hasTexture=function(e){return I.prototype.hasTexture.call(this,e)?!0:this._diffuseTexture===e},a.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.getClassName=function(){return"CellMaterial"},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.CellMaterial",e},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([je("diffuse")],a.prototype,"diffuseColor",void 0),P([ce("computeHighLevel")],a.prototype,"_computeHighLevel",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"computeHighLevel",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.CellMaterial",wi);var Ai=function(){function I(){}return I}(),Fi=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.CustomParts=new Ai,d.customShaderNameResolve=d.Builder,d.FragmentShader=$e.ShadersStore.defaultPixelShader,d.VertexShader=$e.ShadersStore.defaultVertexShader,d}return a.prototype.AttachAfterBind=function(e,o){if(this._newUniformInstances)for(var d in this._newUniformInstances){var t=d.toString().split("-");t[0]=="vec2"?o.setVector2(t[1],this._newUniformInstances[d]):t[0]=="vec3"?o.setVector3(t[1],this._newUniformInstances[d]):t[0]=="vec4"?o.setVector4(t[1],this._newUniformInstances[d]):t[0]=="mat4"?o.setMatrix(t[1],this._newUniformInstances[d]):t[0]=="float"&&o.setFloat(t[1],this._newUniformInstances[d])}if(this._newSamplerInstances)for(var d in this._newSamplerInstances){var t=d.toString().split("-");t[0]=="sampler2D"&&this._newSamplerInstances[d].isReady&&this._newSamplerInstances[d].isReady()&&o.setTexture(t[1],this._newSamplerInstances[d])}},a.prototype.ReviewUniform=function(e,o){if(e=="uniform"&&this._newUniforms)for(var d=0;d<this._newUniforms.length;d++)this._customUniform[d].indexOf("sampler")==-1&&o.push(this._newUniforms[d]);if(e=="sampler"&&this._newUniforms)for(var d=0;d<this._newUniforms.length;d++)this._customUniform[d].indexOf("sampler")!=-1&&o.push(this._newUniforms[d]);return o},a.prototype.Builder=function(e,o,d,t,i,r){var l=this;if(r&&this._customAttributes&&this._customAttributes.length>0&&r.push.apply(r,this._customAttributes),this.ReviewUniform("uniform",o),this.ReviewUniform("sampler",t),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,a.ShaderIndexer++;var u="custom_"+a.ShaderIndexer,s=this._afterBind.bind(this);return this._afterBind=function(n,f){if(!!f){l.AttachAfterBind(n,f);try{s(n,f)}catch{}}},$e.ShadersStore[u+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&($e.ShadersStore[u+"VertexShader"]=$e.ShadersStore[u+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),$e.ShadersStore[u+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE",this.CustomParts.Fragment_Custom_Diffuse?this.CustomParts.Fragment_Custom_Diffuse:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&($e.ShadersStore[u+"PixelShader"]=$e.ShadersStore[u+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=u,u},a.prototype.AddUniform=function(e,o,d){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),d&&(o.indexOf("sampler")!=-1?this._newSamplerInstances[o+"-"+e]=d:this._newUniformInstances[o+"-"+e]=d),this._customUniform.push("uniform "+o+" "+e+";"),this._newUniforms.push(e),this},a.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},a.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},a.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},a.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},a.prototype.Fragment_Custom_Diffuse=function(e){return this.CustomParts.Fragment_Custom_Diffuse=e.replace("result","diffuseColor"),this},a.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},a.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},a.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},a.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},a.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},a.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},a.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},a.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},a.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},a.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},a.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},a.ShaderIndexer=1,a}(si);rt("BABYLON.CustomMaterial",Fi);var bi=function(){function I(){}return I}(),Ri=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.CustomParts=new bi,d.customShaderNameResolve=d.Builder,d.FragmentShader=$e.ShadersStore.pbrPixelShader,d.VertexShader=$e.ShadersStore.pbrVertexShader,d.FragmentShader=d.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g,$e.IncludesShadersStore.pbrBlockAlbedoOpacity),d.FragmentShader=d.FragmentShader.replace(/#include<pbrBlockReflectivity>/g,$e.IncludesShadersStore.pbrBlockReflectivity),d.FragmentShader=d.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g,$e.IncludesShadersStore.pbrBlockFinalColorComposition),d}return a.prototype.AttachAfterBind=function(e,o){if(this._newUniformInstances)for(var d in this._newUniformInstances){var t=d.toString().split("-");t[0]=="vec2"?o.setVector2(t[1],this._newUniformInstances[d]):t[0]=="vec3"?o.setVector3(t[1],this._newUniformInstances[d]):t[0]=="vec4"?o.setVector4(t[1],this._newUniformInstances[d]):t[0]=="mat4"?o.setMatrix(t[1],this._newUniformInstances[d]):t[0]=="float"&&o.setFloat(t[1],this._newUniformInstances[d])}if(this._newSamplerInstances)for(var d in this._newSamplerInstances){var t=d.toString().split("-");t[0]=="sampler2D"&&this._newSamplerInstances[d].isReady&&this._newSamplerInstances[d].isReady()&&o.setTexture(t[1],this._newSamplerInstances[d])}},a.prototype.ReviewUniform=function(e,o){if(e=="uniform"&&this._newUniforms)for(var d=0;d<this._newUniforms.length;d++)this._customUniform[d].indexOf("sampler")==-1&&o.push(this._newUniforms[d]);if(e=="sampler"&&this._newUniforms)for(var d=0;d<this._newUniforms.length;d++)this._customUniform[d].indexOf("sampler")!=-1&&o.push(this._newUniforms[d]);return o},a.prototype.Builder=function(e,o,d,t,i,r,l){var u=this;if(l){var s=l.processFinalCode;l.processFinalCode=function(h,c){if(h==="vertex")return s?s(h,c):c;var v=new li(c);return v.inlineToken="#define pbr_inline",v.processCode(),s?s(h,v.code):v.code}}if(r&&this._customAttributes&&this._customAttributes.length>0&&r.push.apply(r,this._customAttributes),this.ReviewUniform("uniform",o),this.ReviewUniform("sampler",t),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,a.ShaderIndexer++;var n="custom_"+a.ShaderIndexer,f=this._afterBind.bind(this);return this._afterBind=function(h,c){if(!!c){u.AttachAfterBind(h,c);try{f(h,c)}catch{}}},$e.ShadersStore[n+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&($e.ShadersStore[n+"VertexShader"]=$e.ShadersStore[n+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),$e.ShadersStore[n+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_ALBEDO",this.CustomParts.Fragment_Custom_Albedo?this.CustomParts.Fragment_Custom_Albedo:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS",this.CustomParts.Fragment_Custom_MetallicRoughness?this.CustomParts.Fragment_Custom_MetallicRoughness:"").replace("#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE",this.CustomParts.Fragment_Custom_MicroSurface?this.CustomParts.Fragment_Custom_MicroSurface:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION",this.CustomParts.Fragment_Before_FinalColorComposition?this.CustomParts.Fragment_Before_FinalColorComposition:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:""),this.CustomParts.Fragment_Before_Fog&&($e.ShadersStore[n+"PixelShader"]=$e.ShadersStore[n+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=n,n},a.prototype.AddUniform=function(e,o,d){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),d&&(o.indexOf("sampler")!=-1?this._newSamplerInstances[o+"-"+e]=d:this._newUniformInstances[o+"-"+e]=d),this._customUniform.push("uniform "+o+" "+e+";"),this._newUniforms.push(e),this},a.prototype.AddAttribute=function(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this},a.prototype.Fragment_Begin=function(e){return this.CustomParts.Fragment_Begin=e,this},a.prototype.Fragment_Definitions=function(e){return this.CustomParts.Fragment_Definitions=e,this},a.prototype.Fragment_MainBegin=function(e){return this.CustomParts.Fragment_MainBegin=e,this},a.prototype.Fragment_Custom_Albedo=function(e){return this.CustomParts.Fragment_Custom_Albedo=e.replace("result","surfaceAlbedo"),this},a.prototype.Fragment_Custom_Alpha=function(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this},a.prototype.Fragment_Before_Lights=function(e){return this.CustomParts.Fragment_Before_Lights=e,this},a.prototype.Fragment_Custom_MetallicRoughness=function(e){return this.CustomParts.Fragment_Custom_MetallicRoughness=e,this},a.prototype.Fragment_Custom_MicroSurface=function(e){return this.CustomParts.Fragment_Custom_MicroSurface=e,this},a.prototype.Fragment_Before_Fog=function(e){return this.CustomParts.Fragment_Before_Fog=e,this},a.prototype.Fragment_Before_FinalColorComposition=function(e){return this.CustomParts.Fragment_Before_FinalColorComposition=e,this},a.prototype.Fragment_Before_FragColor=function(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this},a.prototype.Vertex_Begin=function(e){return this.CustomParts.Vertex_Begin=e,this},a.prototype.Vertex_Definitions=function(e){return this.CustomParts.Vertex_Definitions=e,this},a.prototype.Vertex_MainBegin=function(e){return this.CustomParts.Vertex_MainBegin=e,this},a.prototype.Vertex_Before_PositionUpdated=function(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this},a.prototype.Vertex_Before_NormalUpdated=function(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this},a.prototype.Vertex_After_WorldPosComputed=function(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this},a.prototype.Vertex_MainEnd=function(e){return this.CustomParts.Vertex_MainEnd=e,this},a.ShaderIndexer=1,a}(fi);rt("BABYLON.PBRCustomMaterial",Ri);var Li="firePixelShader",Mi=`precision highp float;

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
}`;ze.ShadersStore[Li]=Mi;var Ii="fireVertexShader",Ni=`precision highp float;

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
`;ze.ShadersStore[Ii]=Ni;var Bi=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.UV1=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.BonesPerMesh=0,e.NUM_BONE_INFLUENCERS=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Oi=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d.speed=1,d._scaledDiffuse=new Ve,d._lastTime=0,d}return a.prototype.needAlphaBlending=function(){return!1},a.prototype.needAlphaTesting=function(){return!0},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Bi);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,this._diffuseTexture&&He.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(t.ALPHATEST=!!this._opacityTexture,t._areMiscDirty&&(t.POINTSIZE=this.pointsCloud||i.forcePointsCloud,t.FOG=i.fogEnabled&&e.applyFog&&i.fogMode!==at.FOGMODE_NONE&&this.fogEnabled),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!1,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.UV1&&u.push(ge.UVKind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="fire",n=t.toString();o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:["world","view","viewProjection","vEyePosition","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed"],uniformBuffersNames:[],samplers:["diffuseSampler","distortionSampler","opacitySampler"],defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:null,maxSimultaneousLights:4,transformFeedbackVaryings:null},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this._diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix()),this._activeEffect.setTexture("distortionSampler",this._distortionTexture),this._activeEffect.setTexture("opacitySampler",this._opacityTexture)),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*o.visibility),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._lastTime+=t.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime),this._activeEffect.setFloat("speed",this.speed),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._distortionTexture&&this._distortionTexture.animations&&this._distortionTexture.animations.length>0&&e.push(this._distortionTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),this._distortionTexture&&e.push(this._distortionTexture),this._opacityTexture&&e.push(this._opacityTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this._diffuseTexture===e||this._distortionTexture===e||this._opacityTexture===e)},a.prototype.getClassName=function(){return"FireMaterial"},a.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),this._distortionTexture&&this._distortionTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=I.prototype.serialize.call(this);return e.customType="BABYLON.FireMaterial",e.diffuseColor=this.diffuseColor.asArray(),e.speed=this.speed,this._diffuseTexture&&(e._diffuseTexture=this._diffuseTexture.serialize()),this._distortionTexture&&(e._distortionTexture=this._distortionTexture.serialize()),this._opacityTexture&&(e._opacityTexture=this._opacityTexture.serialize()),e},a.Parse=function(e,o,d){var t=new a(e.name,o);return t.diffuseColor=Ve.FromArray(e.diffuseColor),t.speed=e.speed,t.alpha=e.alpha,t.id=e.id,Xt.AddTagsTo(t,e.tags),t.backFaceCulling=e.backFaceCulling,t.wireframe=e.wireframe,e._diffuseTexture&&(t._diffuseTexture=zt.Parse(e._diffuseTexture,o,d)),e._distortionTexture&&(t._distortionTexture=zt.Parse(e._distortionTexture,o,d)),e._opacityTexture&&(t._opacityTexture=zt.Parse(e._opacityTexture,o,d)),t},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([Ie("distortionTexture")],a.prototype,"_distortionTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"distortionTexture",void 0),P([Ie("opacityTexture")],a.prototype,"_opacityTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"opacityTexture",void 0),P([je("diffuse")],a.prototype,"diffuseColor",void 0),P([ce()],a.prototype,"speed",void 0),a}(ct);rt("BABYLON.FireMaterial",Oi);var Di="furPixelShader",Vi=`precision highp float;

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
}`;ze.ShadersStore[Di]=Vi;var Ui="furVertexShader",zi=`precision highp float;

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
`;ze.ShadersStore[Ui]=zi;var Wi=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.HEIGHTMAP=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.HIGHLEVEL=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Gi=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d.furLength=1,d.furAngle=0,d.furColor=new Ve(.44,.21,.02),d.furOffset=0,d.furSpacing=12,d.furGravity=new Ke(0,0,0),d.furSpeed=100,d.furDensity=20,d.furOcclusion=0,d._disableLighting=!1,d._maxSimultaneousLights=4,d.highLevelFur=!0,d._furTime=0,d}return Object.defineProperty(a.prototype,"furTime",{get:function(){return this._furTime},set:function(e){this._furTime=e},enumerable:!1,configurable:!0}),a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.updateFur=function(){for(var e=1;e<this._meshes.length;e++){var o=this._meshes[e].material;o.furLength=this.furLength,o.furAngle=this.furAngle,o.furGravity=this.furGravity,o.furSpacing=this.furSpacing,o.furSpeed=this.furSpeed,o.furColor=this.furColor,o.diffuseTexture=this.diffuseTexture,o.furTexture=this.furTexture,o.highLevelFur=this.highLevelFur,o.furTime=this.furTime,o.furDensity=this.furDensity}},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Wi);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&i.texturesEnabled){if(this.diffuseTexture&&He.DiffuseTextureEnabled)if(this.diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(this.heightTexture&&r.getCaps().maxVertexTextureImageUnits)if(this.heightTexture.isReady())t._needUVs=!0,t.HEIGHTMAP=!0;else return!1}if(this.highLevelFur!==t.HIGHLEVEL&&(t.HIGHLEVEL=!0,t.markAsUnprocessed()),M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="fur",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","furLength","furAngle","furColor","furOffset","furGravity","furTime","furSpacing","furDensity","furOcclusion"],h=["diffuseSampler","heightTexture","furTexture"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),t.getCachedMaterial()!==this&&(this._diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),this._heightTexture&&this._activeEffect.setTexture("heightTexture",this._heightTexture),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._activeEffect.setFloat("furLength",this.furLength),this._activeEffect.setFloat("furAngle",this.furAngle),this._activeEffect.setColor4("furColor",this.furColor,1),this.highLevelFur&&(this._activeEffect.setVector3("furGravity",this.furGravity),this._activeEffect.setFloat("furOffset",this.furOffset),this._activeEffect.setFloat("furSpacing",this.furSpacing),this._activeEffect.setFloat("furDensity",this.furDensity),this._activeEffect.setFloat("furOcclusion",this.furOcclusion),this._furTime+=this.getScene().getEngine().getDeltaTime()/this.furSpeed,this._activeEffect.setFloat("furTime",this._furTime),this._activeEffect.setTexture("furTexture",this.furTexture)),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.heightTexture&&this.heightTexture.animations&&this.heightTexture.animations.length>0&&e.push(this.heightTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),this._heightTexture&&e.push(this._heightTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this.diffuseTexture===e||this._heightTexture===e)},a.prototype.dispose=function(e){if(this.diffuseTexture&&this.diffuseTexture.dispose(),this._meshes)for(var o=1;o<this._meshes.length;o++){var d=this._meshes[o].material;d&&d.dispose(e),this._meshes[o].dispose()}I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.FurMaterial",this._meshes&&(e.sourceMeshName=this._meshes[0].name,e.quality=this._meshes.length),e},a.prototype.getClassName=function(){return"FurMaterial"},a.Parse=function(e,o,d){var t=Ae.Parse(function(){return new a(e.name,o)},e,o,d);return e.sourceMeshName&&t.highLevelFur&&o.executeWhenReady(function(){var i=o.getMeshByName(e.sourceMeshName);if(i){var r=a.GenerateTexture("Fur Texture",o);t.furTexture=r,a.FurifyMesh(i,e.quality)}}),t},a.GenerateTexture=function(e,o){for(var d=new ui("FurTexture "+e,256,o,!0),t=d.getContext(),i=0;i<2e4;++i)t.fillStyle="rgba(255, "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", 1)",t.fillRect(Math.random()*d.getSize().width,Math.random()*d.getSize().height,2,2);return d.update(!1),d.wrapU=zt.WRAP_ADDRESSMODE,d.wrapV=zt.WRAP_ADDRESSMODE,d},a.FurifyMesh=function(e,o){var d=[e],t=e.material,i;if(!(t instanceof a))throw"The material of the source mesh must be a Fur Material";for(i=1;i<o;i++){var r=new a(t.name+i,e.getScene());e.getScene().materials.pop(),Xt.EnableFor(r),Xt.AddTagsTo(r,"furShellMaterial"),r.furLength=t.furLength,r.furAngle=t.furAngle,r.furGravity=t.furGravity,r.furSpacing=t.furSpacing,r.furSpeed=t.furSpeed,r.furColor=t.furColor,r.diffuseTexture=t.diffuseTexture,r.furOffset=i/o,r.furTexture=t.furTexture,r.highLevelFur=t.highLevelFur,r.furTime=t.furTime,r.furDensity=t.furDensity;var l=e.clone(e.name+i);l.material=r,l.skeleton=e.skeleton,l.position=Ke.Zero(),d.push(l)}for(i=1;i<d.length;i++)d[i].parent=e;return e.material._meshes=d,d},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([Ie("heightTexture")],a.prototype,"_heightTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"heightTexture",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([ce()],a.prototype,"furLength",void 0),P([ce()],a.prototype,"furAngle",void 0),P([je()],a.prototype,"furColor",void 0),P([ce()],a.prototype,"furOffset",void 0),P([ce()],a.prototype,"furSpacing",void 0),P([Wt()],a.prototype,"furGravity",void 0),P([ce()],a.prototype,"furSpeed",void 0),P([ce()],a.prototype,"furDensity",void 0),P([ce()],a.prototype,"furOcclusion",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),P([ce()],a.prototype,"highLevelFur",void 0),P([ce()],a.prototype,"furTime",null),a}(ct);rt("BABYLON.FurMaterial",Gi);var Hi="gradientPixelShader",ki=`precision highp float;

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
`;ze.ShadersStore[Hi]=ki;var Xi="gradientVertexShader",qi=`precision highp float;

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
`;ze.ShadersStore[Xi]=qi;var Yi=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.EMISSIVE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Zi=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d._maxSimultaneousLights=4,d.topColor=new Ve(1,0,0),d.topColorAlpha=1,d.bottomColor=new Ve(0,0,1),d.bottomColorAlpha=1,d.offset=0,d.scale=1,d.smoothness=1,d._disableLighting=!1,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1||this.topColorAlpha<1||this.bottomColorAlpha<1},a.prototype.needAlphaTesting=function(){return!0},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Yi);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),t.EMISSIVE=this._disableLighting,M.PrepareDefinesForAttributes(e,t,!1,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="gradient",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","topColor","bottomColor","offset","smoothness","scale"],h=[],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:4}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,r),this._mustRebind(t,r)&&(M.BindClipPlane(r,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._activeEffect.setColor4("topColor",this.topColor,this.topColorAlpha),this._activeEffect.setColor4("bottomColor",this.bottomColor,this.bottomColorAlpha),this._activeEffect.setFloat("offset",this.offset),this._activeEffect.setFloat("scale",this.scale),this._activeEffect.setFloat("smoothness",this.smoothness),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){return[]},a.prototype.dispose=function(e){I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.GradientMaterial",e},a.prototype.getClassName=function(){return"GradientMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),P([je()],a.prototype,"topColor",void 0),P([ce()],a.prototype,"topColorAlpha",void 0),P([je()],a.prototype,"bottomColor",void 0),P([ce()],a.prototype,"bottomColorAlpha",void 0),P([ce()],a.prototype,"offset",void 0),P([ce()],a.prototype,"scale",void 0),P([ce()],a.prototype,"smoothness",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),a}(ct);rt("BABYLON.GradientMaterial",Zi);var ji="gridPixelShader",Ki=`#extension GL_OES_standard_derivatives : enable
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
}`;ze.ShadersStore[ji]=Ki;var $i="gridVertexShader",Qi=`precision highp float;

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
}`;ze.ShadersStore[$i]=Qi;var Ji=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.OPACITY=!1,e.TRANSPARENT=!1,e.FOG=!1,e.PREMULTIPLYALPHA=!1,e.UV1=!1,e.UV2=!1,e.INSTANCES=!1,e.THIN_INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),en=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.mainColor=Ve.Black(),d.lineColor=Ve.Teal(),d.gridRatio=1,d.gridOffset=Ke.Zero(),d.majorUnitFrequency=10,d.minorUnitVisibility=.33,d.opacity=1,d.preMultiplyAlpha=!1,d._gridControl=new ci(d.gridRatio,d.majorUnitFrequency,d.minorUnitVisibility,d.opacity),d}return a.prototype.needAlphaBlending=function(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()},a.prototype.needAlphaBlendingForMesh=function(e){return e.visibility<1||this.needAlphaBlending()},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Ji);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;if(t.TRANSPARENT!==this.opacity<1&&(t.TRANSPARENT=!t.TRANSPARENT,t.markAsUnprocessed()),t.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(t.PREMULTIPLYALPHA=!t.PREMULTIPLYALPHA,t.markAsUnprocessed()),t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled&&this._opacityTexture&&He.OpacityTextureEnabled))if(this._opacityTexture.isReady())t._needUVs=!0,t.OPACITY=!0;else return!1;if(M.PrepareDefinesForMisc(e,i,!1,!1,this.fogEnabled,!1,t),M.PrepareDefinesForFrameBoundValues(i,i.getEngine(),t,!!d),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial(),M.PrepareDefinesForAttributes(e,t,!1,!1);var r=[ge.PositionKind,ge.NormalKind];t.UV1&&r.push(ge.UVKind),t.UV2&&r.push(ge.UV2Kind),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess,M.PrepareAttributesForInstances(r,t);var l=t.toString();o.setEffect(i.getEngine().createEffect("grid",r,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility"],["opacitySampler"],l,void 0,this.onCompiled,this.onError),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this._activeEffect.setFloat("visibility",o.visibility),(!i.INSTANCES||i.THIN_INSTANCE)&&this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",t.getViewMatrix()),this._activeEffect.setMatrix("projection",t.getProjectionMatrix()),this._mustRebind(t,r)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&He.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix()))),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.dispose=function(e){I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.GridMaterial",e},a.prototype.getClassName=function(){return"GridMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([je()],a.prototype,"mainColor",void 0),P([je()],a.prototype,"lineColor",void 0),P([ce()],a.prototype,"gridRatio",void 0),P([Wt()],a.prototype,"gridOffset",void 0),P([ce()],a.prototype,"majorUnitFrequency",void 0),P([ce()],a.prototype,"minorUnitVisibility",void 0),P([ce()],a.prototype,"opacity",void 0),P([ce()],a.prototype,"preMultiplyAlpha",void 0),P([Ie("opacityTexture")],a.prototype,"_opacityTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"opacityTexture",void 0),a}(ct);rt("BABYLON.GridMaterial",en);var tn="lavaPixelShader",nn=`precision highp float;

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
}`;ze.ShadersStore[tn]=nn;var rn="lavaVertexShader",on=`precision highp float;

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
}`;ze.ShadersStore[rn]=on;var an=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.LIGHT0=!1,e.LIGHT1=!1,e.LIGHT2=!1,e.LIGHT3=!1,e.SPOTLIGHT0=!1,e.SPOTLIGHT1=!1,e.SPOTLIGHT2=!1,e.SPOTLIGHT3=!1,e.HEMILIGHT0=!1,e.HEMILIGHT1=!1,e.HEMILIGHT2=!1,e.HEMILIGHT3=!1,e.DIRLIGHT0=!1,e.DIRLIGHT1=!1,e.DIRLIGHT2=!1,e.DIRLIGHT3=!1,e.POINTLIGHT0=!1,e.POINTLIGHT1=!1,e.POINTLIGHT2=!1,e.POINTLIGHT3=!1,e.SHADOW0=!1,e.SHADOW1=!1,e.SHADOW2=!1,e.SHADOW3=!1,e.SHADOWS=!1,e.SHADOWESM0=!1,e.SHADOWESM1=!1,e.SHADOWESM2=!1,e.SHADOWESM3=!1,e.SHADOWPOISSON0=!1,e.SHADOWPOISSON1=!1,e.SHADOWPOISSON2=!1,e.SHADOWPOISSON3=!1,e.SHADOWPCF0=!1,e.SHADOWPCF1=!1,e.SHADOWPCF2=!1,e.SHADOWPCF3=!1,e.SHADOWPCSS0=!1,e.SHADOWPCSS1=!1,e.SHADOWPCSS2=!1,e.SHADOWPCSS3=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.UNLIT=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),sn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.speed=1,d.movingSpeed=1,d.lowFrequencySpeed=1,d.fogDensity=.15,d._lastTime=0,d.diffuseColor=new Ve(1,1,1),d._disableLighting=!1,d._unlit=!1,d._maxSimultaneousLights=4,d._scaledDiffuse=new Ve,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new an);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled&&this._diffuseTexture&&He.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=!0,M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="lava",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix","time","speed","movingSpeed","fogColor","fogDensity","lowFrequencySpeed"],h=["diffuseSampler","noiseTexture"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,i.UNLIT=this._unlit,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this.diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),this.noiseTexture&&this._activeEffect.setTexture("noiseTexture",this.noiseTexture),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*o.visibility),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._lastTime+=t.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime*this.speed/1e3),this.fogColor||(this.fogColor=Ve.Black()),this._activeEffect.setColor3("fogColor",this.fogColor),this._activeEffect.setFloat("fogDensity",this.fogDensity),this._activeEffect.setFloat("lowFrequencySpeed",this.lowFrequencySpeed),this._activeEffect.setFloat("movingSpeed",this.movingSpeed),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.noiseTexture&&this.noiseTexture.animations&&this.noiseTexture.animations.length>0&&e.push(this.noiseTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},a.prototype.dispose=function(e){this.diffuseTexture&&this.diffuseTexture.dispose(),this.noiseTexture&&this.noiseTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.LavaMaterial",e},a.prototype.getClassName=function(){return"LavaMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([Ie()],a.prototype,"noiseTexture",void 0),P([je()],a.prototype,"fogColor",void 0),P([ce()],a.prototype,"speed",void 0),P([ce()],a.prototype,"movingSpeed",void 0),P([ce()],a.prototype,"lowFrequencySpeed",void 0),P([ce()],a.prototype,"fogDensity",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("unlit")],a.prototype,"_unlit",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"unlit",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.LavaMaterial",sn);var ln="mixPixelShader",fn=`precision highp float;

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
`;ze.ShadersStore[ln]=fn;var un="mixVertexShader",cn=`precision highp float;

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
`;ze.ShadersStore[un]=cn;var hn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.MIXMAP2=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),dn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d.specularColor=new Ve(0,0,0),d.specularPower=64,d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new hn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(i.texturesEnabled&&(!this._mixTexture1||!this._mixTexture1.isReady()||(t._needUVs=!0,He.DiffuseTextureEnabled&&(!this._diffuseTexture1||!this._diffuseTexture1.isReady()||(t.DIFFUSE=!0,!this._diffuseTexture2||!this._diffuseTexture2.isReady())||!this._diffuseTexture3||!this._diffuseTexture3.isReady()||!this._diffuseTexture4||!this._diffuseTexture4.isReady()||this._mixTexture2&&(!this._mixTexture2.isReady()||(t.MIXMAP2=!0,!this._diffuseTexture5||!this._diffuseTexture5.isReady())||!this._diffuseTexture6||!this._diffuseTexture6.isReady()||!this._diffuseTexture7||!this._diffuseTexture7.isReady()||!this._diffuseTexture8||!this._diffuseTexture8.isReady())))))return!1;if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="mix",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos","diffuse4Infos","diffuse5Infos","diffuse6Infos","diffuse7Infos","diffuse8Infos"],h=["mixMap1Sampler","mixMap2Sampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","diffuse4Sampler","diffuse5Sampler","diffuse6Sampler","diffuse7Sampler","diffuse8Sampler"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this._mixTexture1&&(this._activeEffect.setTexture("mixMap1Sampler",this._mixTexture1),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture1.coordinatesIndex,this._mixTexture1.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture1.getTextureMatrix()),He.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale)),this._diffuseTexture4&&(this._activeEffect.setTexture("diffuse4Sampler",this._diffuseTexture4),this._activeEffect.setFloat2("diffuse4Infos",this._diffuseTexture4.uScale,this._diffuseTexture4.vScale)))),this._mixTexture2&&(this._activeEffect.setTexture("mixMap2Sampler",this._mixTexture2),He.DiffuseTextureEnabled&&(this._diffuseTexture5&&(this._activeEffect.setTexture("diffuse5Sampler",this._diffuseTexture5),this._activeEffect.setFloat2("diffuse5Infos",this._diffuseTexture5.uScale,this._diffuseTexture5.vScale)),this._diffuseTexture6&&(this._activeEffect.setTexture("diffuse6Sampler",this._diffuseTexture6),this._activeEffect.setFloat2("diffuse6Infos",this._diffuseTexture6.uScale,this._diffuseTexture6.vScale)),this._diffuseTexture7&&(this._activeEffect.setTexture("diffuse7Sampler",this._diffuseTexture7),this._activeEffect.setFloat2("diffuse7Infos",this._diffuseTexture7.uScale,this._diffuseTexture7.vScale)),this._diffuseTexture8&&(this._activeEffect.setTexture("diffuse8Sampler",this._diffuseTexture8),this._activeEffect.setFloat2("diffuse8Infos",this._diffuseTexture8.uScale,this._diffuseTexture8.vScale)))),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this._mixTexture1&&this._mixTexture1.animations&&this._mixTexture1.animations.length>0&&e.push(this._mixTexture1),this._mixTexture2&&this._mixTexture2.animations&&this._mixTexture2.animations.length>0&&e.push(this._mixTexture2),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._mixTexture1&&e.push(this._mixTexture1),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._diffuseTexture4&&e.push(this._diffuseTexture4),this._mixTexture2&&e.push(this._mixTexture2),this._diffuseTexture5&&e.push(this._diffuseTexture5),this._diffuseTexture6&&e.push(this._diffuseTexture6),this._diffuseTexture7&&e.push(this._diffuseTexture7),this._diffuseTexture8&&e.push(this._diffuseTexture8),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this._mixTexture1===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._diffuseTexture4===e||this._mixTexture2===e||this._diffuseTexture5===e||this._diffuseTexture6===e||this._diffuseTexture7===e||this._diffuseTexture8===e)},a.prototype.dispose=function(e){this._mixTexture1&&this._mixTexture1.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.MixMaterial",e},a.prototype.getClassName=function(){return"MixMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("mixTexture1")],a.prototype,"_mixTexture1",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"mixTexture1",void 0),P([Ie("mixTexture2")],a.prototype,"_mixTexture2",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"mixTexture2",void 0),P([Ie("diffuseTexture1")],a.prototype,"_diffuseTexture1",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture1",void 0),P([Ie("diffuseTexture2")],a.prototype,"_diffuseTexture2",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture2",void 0),P([Ie("diffuseTexture3")],a.prototype,"_diffuseTexture3",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture3",void 0),P([Ie("diffuseTexture4")],a.prototype,"_diffuseTexture4",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture4",void 0),P([Ie("diffuseTexture1")],a.prototype,"_diffuseTexture5",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture5",void 0),P([Ie("diffuseTexture2")],a.prototype,"_diffuseTexture6",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture6",void 0),P([Ie("diffuseTexture3")],a.prototype,"_diffuseTexture7",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture7",void 0),P([Ie("diffuseTexture4")],a.prototype,"_diffuseTexture8",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture8",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([je()],a.prototype,"specularColor",void 0),P([ce()],a.prototype,"specularPower",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.MixMaterial",dn);var vn="normalPixelShader",pn=`precision highp float;

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
}`;ze.ShadersStore[vn]=pn;var mn="normalVertexShader",gn=`precision highp float;

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
`;ze.ShadersStore[mn]=gn;var yn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.LIGHT0=!1,e.LIGHT1=!1,e.LIGHT2=!1,e.LIGHT3=!1,e.SPOTLIGHT0=!1,e.SPOTLIGHT1=!1,e.SPOTLIGHT2=!1,e.SPOTLIGHT3=!1,e.HEMILIGHT0=!1,e.HEMILIGHT1=!1,e.HEMILIGHT2=!1,e.HEMILIGHT3=!1,e.DIRLIGHT0=!1,e.DIRLIGHT1=!1,e.DIRLIGHT2=!1,e.DIRLIGHT3=!1,e.POINTLIGHT0=!1,e.POINTLIGHT1=!1,e.POINTLIGHT2=!1,e.POINTLIGHT3=!1,e.SHADOW0=!1,e.SHADOW1=!1,e.SHADOW2=!1,e.SHADOW3=!1,e.SHADOWS=!1,e.SHADOWESM0=!1,e.SHADOWESM1=!1,e.SHADOWESM2=!1,e.SHADOWESM3=!1,e.SHADOWPOISSON0=!1,e.SHADOWPOISSON1=!1,e.SHADOWPOISSON2=!1,e.SHADOWPOISSON3=!1,e.SHADOWPCF0=!1,e.SHADOWPCF1=!1,e.SHADOWPCF2=!1,e.SHADOWPCF3=!1,e.SHADOWPCSS0=!1,e.SHADOWPCSS1=!1,e.SHADOWPCSS2=!1,e.SHADOWPCSS3=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.LIGHTING=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),xn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaBlendingForMesh=function(e){return this.needAlphaBlending()||e.visibility<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new yn);var t=o.materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled&&this._diffuseTexture&&He.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=!0,M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),t.LIGHTING=!this._disableLighting,M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="normal",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],h=["diffuseSampler"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:4}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this.diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},a.prototype.dispose=function(e){this.diffuseTexture&&this.diffuseTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.NormalMaterial",e},a.prototype.getClassName=function(){return"NormalMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.NormalMaterial",xn);var Tn="shadowOnlyPixelShader",Sn=`precision highp float;

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
}`;ze.ShadersStore[Tn]=Sn;var En="shadowOnlyVertexShader",Pn=`precision highp float;

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
`;ze.ShadersStore[En]=Pn;var Cn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),ii=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d._needAlphaBlending=!0,d.shadowColor=Ve.Black(),d}return a.prototype.needAlphaBlending=function(){return this._needAlphaBlending},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},Object.defineProperty(a.prototype,"activeLight",{get:function(){return this._activeLight},set:function(e){this._activeLight=e},enumerable:!1,configurable:!0}),a.prototype._getFirstShadowLightForMesh=function(e){for(var o=0,d=e.lightSources;o<d.length;o++){var t=d[o];if(t.shadowEnabled)return t}return null},a.prototype.isReadyForSubMesh=function(e,o,d){var t;if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Cn);var i=o._materialDefines,r=this.getScene();if(this._isReadyForSubMesh(o))return!0;var l=r.getEngine();if(this._activeLight)for(var u=0,s=e.lightSources;u<s.length;u++){var n=s[u];if(n.shadowEnabled){if(this._activeLight===n)break;var f=e.lightSources.indexOf(this._activeLight);f!==-1&&(e.lightSources.splice(f,1),e.lightSources.splice(0,0,this._activeLight));break}}M.PrepareDefinesForFrameBoundValues(r,l,i,!!d),M.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=M.PrepareDefinesForLights(r,e,i,!1,1);var h=(t=this._getFirstShadowLightForMesh(e))===null||t===void 0?void 0:t.getShadowGenerator();if(this._needAlphaBlending=!0,h&&h.getClassName&&h.getClassName()==="CascadedShadowGenerator"){var c=h;this._needAlphaBlending=!c.autoCalcDepthBounds}if(M.PrepareDefinesForAttributes(e,i,!1,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();var v=new vt;i.FOG&&v.addFallback(1,"FOG"),M.HandleFallbacksForShadows(i,v,1),i.NUM_BONE_INFLUENCERS>0&&v.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;var p=[ge.PositionKind];i.NORMAL&&p.push(ge.NormalKind),M.PrepareAttributesForBones(p,e,i,v),M.PrepareAttributesForInstances(p,i);var m="shadowOnly",g=i.toString(),S=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6"],y=new Array,w=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:S,uniformBuffersNames:w,samplers:y,defines:i,maxSimultaneousLights:1}),o.setEffect(r.getEngine().createEffect(m,{attributes:p,uniformsNames:S,uniformBuffersNames:w,samplers:y,defines:g,fallbacks:v,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},l),i,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(i._renderId=r.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;if(!!r){if(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),t.bindEyePosition(r)),t.lightsEnabled){M.BindLights(t,o,this._activeEffect,i,1);var l=this._getFirstShadowLightForMesh(o);l&&(l._renderId=-1)}(t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE||i.SHADOWCSM0)&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect)}}},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.ShadowOnlyMaterial",e},a.prototype.getClassName=function(){return"ShadowOnlyMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},a}(ct);rt("BABYLON.ShadowOnlyMaterial",ii);var _n="simplePixelShader",wn=`precision highp float;

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
}`;ze.ShadersStore[_n]=wn;var An="simpleVertexShader",Fn=`precision highp float;

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
`;ze.ShadersStore[An]=Fn;var bn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Rn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new bn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled&&this._diffuseTexture&&He.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())t._needUVs=!0,t.DIFFUSE=!0;else return!1;if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="simple",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","diffuseMatrix"],h=["diffuseSampler"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights-1}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this._diffuseTexture&&He.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTexture&&e.push(this._diffuseTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this.diffuseTexture===e)},a.prototype.dispose=function(e){this._diffuseTexture&&this._diffuseTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.SimpleMaterial",e},a.prototype.getClassName=function(){return"SimpleMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("diffuseTexture")],a.prototype,"_diffuseTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture",void 0),P([je("diffuse")],a.prototype,"diffuseColor",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.SimpleMaterial",Rn);var Ln="skyPixelShader",Mn=`precision highp float;

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
`;ze.ShadersStore[Ln]=Mn;var In="skyVertexShader",Nn=`precision highp float;

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
`;ze.ShadersStore[In]=Nn;var Bn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.POINTSIZE=!1,e.FOG=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),On=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.luminance=1,d.turbidity=10,d.rayleigh=2,d.mieCoefficient=.005,d.mieDirectionalG=.8,d.distance=500,d.inclination=.49,d.azimuth=.25,d.sunPosition=new Ke(0,100,0),d.useSunPosition=!1,d.cameraOffset=Ke.Zero(),d.up=Ke.Up(),d._cameraPosition=Ke.Zero(),d._skyOrientation=new Kt,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Bn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,!1,t),M.PrepareDefinesForAttributes(e,t,!0,!1),t.IMAGEPROCESSINGPOSTPROCESS!==i.imageProcessingConfiguration.applyByPostProcess&&t.markAsMiscDirty(),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var r=new vt;t.FOG&&r.addFallback(1,"FOG"),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var l=[ge.PositionKind];t.VERTEXCOLOR&&l.push(ge.ColorKind);var u="sky",s=t.toString();o.setEffect(i.getEngine().createEffect(u,l,["world","viewProjection","view","vFogInfos","vFogColor","pointSize","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset","up"],[],s,r,this.onCompiled,this.onError),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;if(!!r){this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),this._mustRebind(t,r)&&(M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize)),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect);var l=t.activeCamera;if(l){var u=l.getWorldMatrix();this._cameraPosition.x=u.m[12],this._cameraPosition.y=u.m[13],this._cameraPosition.z=u.m[14],this._activeEffect.setVector3("cameraPosition",this._cameraPosition)}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this._activeEffect.setVector3("up",this.up),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){var s=Math.PI*(this.inclination-.5),n=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(n)*Math.cos(s),this.sunPosition.y=this.distance*Math.sin(-s),this.sunPosition.z=this.distance*Math.sin(n)*Math.cos(s),Kt.FromUnitVectorsToRef(Ke.UpReadOnly,this.up,this._skyOrientation),this.sunPosition.rotateByQuaternionToRef(this._skyOrientation,this.sunPosition)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(o,this._activeEffect)}}},a.prototype.getAnimatables=function(){return[]},a.prototype.dispose=function(e){I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.SkyMaterial",e},a.prototype.getClassName=function(){return"SkyMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([ce()],a.prototype,"luminance",void 0),P([ce()],a.prototype,"turbidity",void 0),P([ce()],a.prototype,"rayleigh",void 0),P([ce()],a.prototype,"mieCoefficient",void 0),P([ce()],a.prototype,"mieDirectionalG",void 0),P([ce()],a.prototype,"distance",void 0),P([ce()],a.prototype,"inclination",void 0),P([ce()],a.prototype,"azimuth",void 0),P([Wt()],a.prototype,"sunPosition",void 0),P([ce()],a.prototype,"useSunPosition",void 0),P([Wt()],a.prototype,"cameraOffset",void 0),P([Wt()],a.prototype,"up",void 0),a}(ct);rt("BABYLON.SkyMaterial",On);var Dn="terrainPixelShader",Vn=`precision highp float;

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
`;ze.ShadersStore[Dn]=Vn;var Un="terrainVertexShader",zn=`precision highp float;

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
`;ze.ShadersStore[Un]=zn;var Wn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSE=!1,e.BUMP=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Gn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.diffuseColor=new Ve(1,1,1),d.specularColor=new Ve(0,0,0),d.specularPower=64,d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Wn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(i.texturesEnabled){if(!this.mixTexture||!this.mixTexture.isReady())return!1;if(t._needUVs=!0,He.DiffuseTextureEnabled){if(!this.diffuseTexture1||!this.diffuseTexture1.isReady()||!this.diffuseTexture2||!this.diffuseTexture2.isReady()||!this.diffuseTexture3||!this.diffuseTexture3.isReady())return!1;t.DIFFUSE=!0}if(this.bumpTexture1&&this.bumpTexture2&&this.bumpTexture3&&He.BumpTextureEnabled){if(!this.bumpTexture1.isReady()||!this.bumpTexture2.isReady()||!this.bumpTexture3.isReady())return!1;t._needNormals=!0,t.BUMP=!0}}if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var l=new vt;t.FOG&&l.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,l,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&l.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var u=[ge.PositionKind];t.NORMAL&&u.push(ge.NormalKind),t.UV1&&u.push(ge.UVKind),t.UV2&&u.push(ge.UV2Kind),t.VERTEXCOLOR&&u.push(ge.ColorKind),M.PrepareAttributesForBones(u,e,t,l),M.PrepareAttributesForInstances(u,t);var s="terrain",n=t.toString(),f=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos"],h=["textureSampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","bump1Sampler","bump2Sampler","bump3Sampler"],c=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(s,{attributes:u,uniformsNames:f,uniformBuffersNames:c,samplers:h,defines:n,fallbacks:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this.mixTexture&&(this._activeEffect.setTexture("textureSampler",this._mixTexture),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture.coordinatesIndex,this._mixTexture.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture.getTextureMatrix()),He.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale))),He.BumpTextureEnabled&&t.getEngine().getCaps().standardDerivatives&&(this._bumpTexture1&&this._activeEffect.setTexture("bump1Sampler",this._bumpTexture1),this._bumpTexture2&&this._activeEffect.setTexture("bump2Sampler",this._bumpTexture2),this._bumpTexture3&&this._activeEffect.setTexture("bump3Sampler",this._bumpTexture3))),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._mixTexture&&e.push(this._mixTexture),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._bumpTexture1&&e.push(this._bumpTexture1),this._bumpTexture2&&e.push(this._bumpTexture2),this._bumpTexture3&&e.push(this._bumpTexture3),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this._mixTexture===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._bumpTexture1===e||this._bumpTexture2===e||this._bumpTexture3===e)},a.prototype.dispose=function(e){this.mixTexture&&this.mixTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.TerrainMaterial",e},a.prototype.getClassName=function(){return"TerrainMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie("mixTexture")],a.prototype,"_mixTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"mixTexture",void 0),P([Ie("diffuseTexture1")],a.prototype,"_diffuseTexture1",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture1",void 0),P([Ie("diffuseTexture2")],a.prototype,"_diffuseTexture2",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture2",void 0),P([Ie("diffuseTexture3")],a.prototype,"_diffuseTexture3",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTexture3",void 0),P([Ie("bumpTexture1")],a.prototype,"_bumpTexture1",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"bumpTexture1",void 0),P([Ie("bumpTexture2")],a.prototype,"_bumpTexture2",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"bumpTexture2",void 0),P([Ie("bumpTexture3")],a.prototype,"_bumpTexture3",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"bumpTexture3",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([je()],a.prototype,"specularColor",void 0),P([ce()],a.prototype,"specularPower",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.TerrainMaterial",Gn);var Hn="triplanarPixelShader",kn=`precision highp float;

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
`;ze.ShadersStore[Hn]=kn;var Xn="triplanarVertexShader",qn=`precision highp float;

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
`;ze.ShadersStore[Xn]=qn;var Yn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.DIFFUSEX=!1,e.DIFFUSEY=!1,e.DIFFUSEZ=!1,e.BUMPX=!1,e.BUMPY=!1,e.BUMPZ=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.SPECULARTERM=!1,e.NORMAL=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),Zn=function(I){Ue(a,I);function a(e,o){var d=I.call(this,e,o)||this;return d.tileSize=1,d.diffuseColor=new Ve(1,1,1),d.specularColor=new Ve(.2,.2,.2),d.specularPower=64,d._disableLighting=!1,d._maxSimultaneousLights=4,d}return a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Yn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&i.texturesEnabled){if(He.DiffuseTextureEnabled){for(var l=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],u=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"],s=0;s<l.length;s++)if(l[s])if(l[s].isReady())t[u[s]]=!0;else return!1}if(He.BumpTextureEnabled){for(var l=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],u=["BUMPX","BUMPY","BUMPZ"],s=0;s<l.length;s++)if(l[s])if(l[s].isReady())t[u[s]]=!0;else return!1}}if(M.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._needNormals=M.PrepareDefinesForLights(i,e,t,!1,this._maxSimultaneousLights,this._disableLighting),M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForAttributes(e,t,!0,!0),t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var n=new vt;t.FOG&&n.addFallback(1,"FOG"),M.HandleFallbacksForShadows(t,n,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&n.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess;var f=[ge.PositionKind];t.NORMAL&&f.push(ge.NormalKind),t.VERTEXCOLOR&&f.push(ge.ColorKind),M.PrepareAttributesForBones(f,e,t,n),M.PrepareAttributesForInstances(f,t);var h="triplanar",c=t.toString(),v=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","tileSize"],p=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ"],m=new Array;M.PrepareUniformsAndSamplersList({uniformsNames:v,uniformBuffersNames:m,samplers:p,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(h,{attributes:f,uniformsNames:v,uniformBuffersNames:m,samplers:p,defines:c,fallbacks:n,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;!r||(this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._activeEffect.setFloat("tileSize",this.tileSize),t.getCachedMaterial()!==this&&(this.diffuseTextureX&&this._activeEffect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._activeEffect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._activeEffect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._activeEffect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._activeEffect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._activeEffect.setTexture("normalSamplerZ",this.normalTextureZ),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),this._afterBind(o,this._activeEffect))}},a.prototype.getAnimatables=function(){var e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._diffuseTextureX&&e.push(this._diffuseTextureX),this._diffuseTextureY&&e.push(this._diffuseTextureY),this._diffuseTextureZ&&e.push(this._diffuseTextureZ),this._normalTextureX&&e.push(this._normalTextureX),this._normalTextureY&&e.push(this._normalTextureY),this._normalTextureZ&&e.push(this._normalTextureZ),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this._diffuseTextureX===e||this._diffuseTextureY===e||this._diffuseTextureZ===e||this._normalTextureX===e||this._normalTextureY===e||this._normalTextureZ===e)},a.prototype.dispose=function(e){this.mixTexture&&this.mixTexture.dispose(),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);return e.customType="BABYLON.TriPlanarMaterial",e},a.prototype.getClassName=function(){return"TriPlanarMaterial"},a.Parse=function(e,o,d){return Ae.Parse(function(){return new a(e.name,o)},e,o,d)},P([Ie()],a.prototype,"mixTexture",void 0),P([Ie("diffuseTextureX")],a.prototype,"_diffuseTextureX",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTextureX",void 0),P([Ie("diffuseTexturY")],a.prototype,"_diffuseTextureY",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTextureY",void 0),P([Ie("diffuseTextureZ")],a.prototype,"_diffuseTextureZ",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"diffuseTextureZ",void 0),P([Ie("normalTextureX")],a.prototype,"_normalTextureX",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"normalTextureX",void 0),P([Ie("normalTextureY")],a.prototype,"_normalTextureY",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"normalTextureY",void 0),P([Ie("normalTextureZ")],a.prototype,"_normalTextureZ",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"normalTextureZ",void 0),P([ce()],a.prototype,"tileSize",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([je()],a.prototype,"specularColor",void 0),P([ce()],a.prototype,"specularPower",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),a}(ct);rt("BABYLON.TriPlanarMaterial",Zn);var jn="waterPixelShader",Kn=`#ifdef LOGARITHMICDEPTH
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
`;ze.ShadersStore[jn]=Kn;var $n="waterVertexShader",Qn=`precision highp float;

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
`;ze.ShadersStore[$n]=Qn;var Jn=function(I){Ue(a,I);function a(){var e=I.call(this)||this;return e.BUMP=!1,e.REFLECTION=!1,e.CLIPPLANE=!1,e.CLIPPLANE2=!1,e.CLIPPLANE3=!1,e.CLIPPLANE4=!1,e.CLIPPLANE5=!1,e.CLIPPLANE6=!1,e.ALPHATEST=!1,e.DEPTHPREPASS=!1,e.POINTSIZE=!1,e.FOG=!1,e.NORMAL=!1,e.UV1=!1,e.UV2=!1,e.VERTEXCOLOR=!1,e.VERTEXALPHA=!1,e.NUM_BONE_INFLUENCERS=0,e.BonesPerMesh=0,e.INSTANCES=!1,e.SPECULARTERM=!1,e.LOGARITHMICDEPTH=!1,e.USE_REVERSE_DEPTHBUFFER=!1,e.FRESNELSEPARATE=!1,e.BUMPSUPERIMPOSE=!1,e.BUMPAFFECTSREFLECTION=!1,e.IMAGEPROCESSING=!1,e.VIGNETTE=!1,e.VIGNETTEBLENDMODEMULTIPLY=!1,e.VIGNETTEBLENDMODEOPAQUE=!1,e.TONEMAPPING=!1,e.TONEMAPPING_ACES=!1,e.CONTRAST=!1,e.EXPOSURE=!1,e.COLORCURVES=!1,e.COLORGRADING=!1,e.COLORGRADING3D=!1,e.SAMPLER3DGREENDEPTH=!1,e.SAMPLER3DBGRMAP=!1,e.IMAGEPROCESSINGPOSTPROCESS=!1,e.rebuild(),e}return a}(ut),er=function(I){Ue(a,I);function a(e,o,d){d===void 0&&(d=new $t(512,512));var t=I.call(this,e,o)||this;return t.renderTargetSize=d,t.diffuseColor=new Ve(1,1,1),t.specularColor=new Ve(0,0,0),t.specularPower=64,t._disableLighting=!1,t._maxSimultaneousLights=4,t.windForce=6,t.windDirection=new $t(0,1),t.waveHeight=.4,t.bumpHeight=.4,t._bumpSuperimpose=!1,t._fresnelSeparate=!1,t._bumpAffectsReflection=!1,t.waterColor=new Ve(.1,.1,.6),t.colorBlendFactor=.2,t.waterColor2=new Ve(.1,.1,.6),t.colorBlendFactor2=.2,t.waveLength=.1,t.waveSpeed=1,t.waveCount=20,t.disableClipPlane=!1,t._renderTargets=new hi(16),t._mesh=null,t._reflectionTransform=qt.Zero(),t._lastTime=0,t._lastDeltaTime=0,t._createRenderTargets(o,d),t.getRenderTargetTextures=function(){return t._renderTargets.reset(),t._renderTargets.push(t._reflectionRTT),t._renderTargets.push(t._refractionRTT),t._renderTargets},t._imageProcessingConfiguration=t.getScene().imageProcessingConfiguration,t._imageProcessingConfiguration&&(t._imageProcessingObserver=t._imageProcessingConfiguration.onUpdateParameters.add(function(){t._markAllSubMeshesAsImageProcessingDirty()})),t}return Object.defineProperty(a.prototype,"hasRenderTargetTextures",{get:function(){return!0},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"useLogarithmicDepth",{get:function(){return this._useLogarithmicDepth},set:function(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported,this._markAllSubMeshesAsMiscDirty()},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"refractionTexture",{get:function(){return this._refractionRTT},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"reflectionTexture",{get:function(){return this._reflectionRTT},enumerable:!1,configurable:!0}),a.prototype.addToRenderList=function(e){this._refractionRTT&&this._refractionRTT.renderList&&this._refractionRTT.renderList.push(e),this._reflectionRTT&&this._reflectionRTT.renderList&&this._reflectionRTT.renderList.push(e)},a.prototype.enableRenderTargets=function(e){var o=e?1:0;this._refractionRTT&&(this._refractionRTT.refreshRate=o),this._reflectionRTT&&(this._reflectionRTT.refreshRate=o)},a.prototype.getRenderList=function(){return this._refractionRTT?this._refractionRTT.renderList:[]},Object.defineProperty(a.prototype,"renderTargetsEnabled",{get:function(){return!(this._refractionRTT&&this._refractionRTT.refreshRate===0)},enumerable:!1,configurable:!0}),a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.isReadyForSubMesh=function(e,o,d){if(this.isFrozen&&o.effect&&o.effect._wasPreviouslyReady)return!0;o._materialDefines||(o.materialDefines=new Jn);var t=o._materialDefines,i=this.getScene();if(this._isReadyForSubMesh(o))return!0;var r=i.getEngine();if(t._areTexturesDirty&&(t._needUVs=!1,i.texturesEnabled)){if(this.bumpTexture&&He.BumpTextureEnabled)if(this.bumpTexture.isReady())t._needUVs=!0,t.BUMP=!0;else return!1;He.ReflectionTextureEnabled&&(t.REFLECTION=!0)}if(M.PrepareDefinesForFrameBoundValues(i,r,t,!!d),M.PrepareDefinesForMisc(e,i,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),t),t._areMiscDirty&&(this._fresnelSeparate&&(t.FRESNELSEPARATE=!0),this._bumpSuperimpose&&(t.BUMPSUPERIMPOSE=!0),this._bumpAffectsReflection&&(t.BUMPAFFECTSREFLECTION=!0)),t._needNormals=M.PrepareDefinesForLights(i,e,t,!0,this._maxSimultaneousLights,this._disableLighting),t._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(t),t.IS_REFLECTION_LINEAR=this.reflectionTexture!=null&&!this.reflectionTexture.gammaSpace,t.IS_REFRACTION_LINEAR=this.refractionTexture!=null&&!this.refractionTexture.gammaSpace}if(M.PrepareDefinesForAttributes(e,t,!0,!0),this._mesh=e,this._waitingRenderList){for(var l=0;l<this._waitingRenderList.length;l++)this.addToRenderList(i.getNodeById(this._waitingRenderList[l]));this._waitingRenderList=null}if(t.isDirty){t.markAsProcessed(),i.resetCachedMaterial();var u=new vt;t.FOG&&u.addFallback(1,"FOG"),t.LOGARITHMICDEPTH&&u.addFallback(0,"LOGARITHMICDEPTH"),M.HandleFallbacksForShadows(t,u,this.maxSimultaneousLights),t.NUM_BONE_INFLUENCERS>0&&u.addCPUSkinningFallback(0,e);var s=[ge.PositionKind];t.NORMAL&&s.push(ge.NormalKind),t.UV1&&s.push(ge.UVKind),t.UV2&&s.push(ge.UV2Kind),t.VERTEXCOLOR&&s.push(ge.ColorKind),M.PrepareAttributesForBones(s,e,t,u),M.PrepareAttributesForInstances(s,t);var n="water",f=t.toString(),h=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vNormalInfos","mBones","vClipPlane","vClipPlane2","vClipPlane3","vClipPlane4","vClipPlane5","vClipPlane6","normalMatrix","logarithmicDepthConstant","worldReflectionViewProjection","windDirection","waveLength","time","windForce","cameraPosition","bumpHeight","waveHeight","waterColor","waterColor2","colorBlendFactor","colorBlendFactor2","waveSpeed","waveCount"],c=["normalSampler","refractionSampler","reflectionSampler"],v=new Array;Yt&&(Yt.PrepareUniforms(h,t),Yt.PrepareSamplers(c,t)),M.PrepareUniformsAndSamplersList({uniformsNames:h,uniformBuffersNames:v,samplers:c,defines:t,maxSimultaneousLights:this.maxSimultaneousLights}),o.setEffect(i.getEngine().createEffect(n,{attributes:s,uniformsNames:h,uniformBuffersNames:v,samplers:c,defines:f,fallbacks:u,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights}},r),t,this._materialContext)}return!o.effect||!o.effect.isReady()?!1:(t._renderId=i.getRenderId(),o.effect._wasPreviouslyReady=!0,!0)},a.prototype.bindForSubMesh=function(e,o,d){var t=this.getScene(),i=d._materialDefines;if(!!i){var r=d.effect;if(!(!r||!this._mesh)){this._activeEffect=r,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",t.getTransformMatrix()),M.BindBonesParameters(o,this._activeEffect),this._mustRebind(t,r)&&(this.bumpTexture&&He.BumpTextureEnabled&&(this._activeEffect.setTexture("normalSampler",this.bumpTexture),this._activeEffect.setFloat2("vNormalInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._activeEffect.setMatrix("normalMatrix",this.bumpTexture.getTextureMatrix())),M.BindClipPlane(this._activeEffect,t),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),t.bindEyePosition(r)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*o.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),t.lightsEnabled&&!this.disableLighting&&M.BindLights(t,o,this._activeEffect,i,this.maxSimultaneousLights),t.fogEnabled&&o.applyFog&&t.fogMode!==at.FOGMODE_NONE&&this._activeEffect.setMatrix("view",t.getViewMatrix()),M.BindFogParameters(t,o,this._activeEffect),M.BindLogDepth(i,this._activeEffect,t),He.ReflectionTextureEnabled&&(this._activeEffect.setTexture("refractionSampler",this._refractionRTT),this._activeEffect.setTexture("reflectionSampler",this._reflectionRTT));var l=this._mesh.getWorldMatrix().multiply(this._reflectionTransform).multiply(t.getProjectionMatrix()),u=t.getEngine().getDeltaTime();u!==this._lastDeltaTime&&(this._lastDeltaTime=u,this._lastTime+=this._lastDeltaTime),this._activeEffect.setMatrix("worldReflectionViewProjection",l),this._activeEffect.setVector2("windDirection",this.windDirection),this._activeEffect.setFloat("waveLength",this.waveLength),this._activeEffect.setFloat("time",this._lastTime/1e5),this._activeEffect.setFloat("windForce",this.windForce),this._activeEffect.setFloat("waveHeight",this.waveHeight),this._activeEffect.setFloat("bumpHeight",this.bumpHeight),this._activeEffect.setColor4("waterColor",this.waterColor,1),this._activeEffect.setFloat("colorBlendFactor",this.colorBlendFactor),this._activeEffect.setColor4("waterColor2",this.waterColor2,1),this._activeEffect.setFloat("colorBlendFactor2",this.colorBlendFactor2),this._activeEffect.setFloat("waveSpeed",this.waveSpeed),this._activeEffect.setFloat("waveCount",this.waveCount),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect),this._afterBind(o,this._activeEffect)}}},a.prototype._createRenderTargets=function(e,o){var d=this;this._refractionRTT=new Qt(name+"_refraction",{width:o.x,height:o.y},e,!1,!0),this._refractionRTT.wrapU=Gt.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.wrapV=Gt.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.ignoreCameraViewport=!0,this._reflectionRTT=new Qt(name+"_reflection",{width:o.x,height:o.y},e,!1,!0),this._reflectionRTT.wrapU=Gt.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.wrapV=Gt.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.ignoreCameraViewport=!0;var t,i=null,r,l=qt.Zero();this._refractionRTT.onBeforeRender=function(){if(d._mesh&&(t=d._mesh.isVisible,d._mesh.isVisible=!1),!d.disableClipPlane){i=e.clipPlane;var u=d._mesh?d._mesh.position.y:0;e.clipPlane=Jt.FromPositionAndNormal(new Ke(0,u+.05,0),new Ke(0,1,0))}},this._refractionRTT.onAfterRender=function(){d._mesh&&(d._mesh.isVisible=t),d.disableClipPlane||(e.clipPlane=i)},this._reflectionRTT.onBeforeRender=function(){if(d._mesh&&(t=d._mesh.isVisible,d._mesh.isVisible=!1),!d.disableClipPlane){i=e.clipPlane;var u=d._mesh?d._mesh.position.y:0;e.clipPlane=Jt.FromPositionAndNormal(new Ke(0,u-.05,0),new Ke(0,-1,0)),qt.ReflectionToRef(e.clipPlane,l)}r=e.getViewMatrix(),l.multiplyToRef(r,d._reflectionTransform),e.setTransformMatrix(d._reflectionTransform,e.getProjectionMatrix()),e.getEngine().cullBackFaces=!1,e._mirroredCameraPosition=Ke.TransformCoordinates(e.activeCamera.position,l)},this._reflectionRTT.onAfterRender=function(){d._mesh&&(d._mesh.isVisible=t),e.clipPlane=i,e.setTransformMatrix(r,e.getProjectionMatrix()),e.getEngine().cullBackFaces=null,e._mirroredCameraPosition=null}},a.prototype.getAnimatables=function(){var e=[];return this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&e.push(this.bumpTexture),this._reflectionRTT&&this._reflectionRTT.animations&&this._reflectionRTT.animations.length>0&&e.push(this._reflectionRTT),this._refractionRTT&&this._refractionRTT.animations&&this._refractionRTT.animations.length>0&&e.push(this._refractionRTT),e},a.prototype.getActiveTextures=function(){var e=I.prototype.getActiveTextures.call(this);return this._bumpTexture&&e.push(this._bumpTexture),e},a.prototype.hasTexture=function(e){return!!(I.prototype.hasTexture.call(this,e)||this._bumpTexture===e)},a.prototype.dispose=function(e){this.bumpTexture&&this.bumpTexture.dispose();var o=this.getScene().customRenderTargets.indexOf(this._refractionRTT);o!=-1&&this.getScene().customRenderTargets.splice(o,1),o=-1,o=this.getScene().customRenderTargets.indexOf(this._reflectionRTT),o!=-1&&this.getScene().customRenderTargets.splice(o,1),this._reflectionRTT&&this._reflectionRTT.dispose(),this._refractionRTT&&this._refractionRTT.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),I.prototype.dispose.call(this,e)},a.prototype.clone=function(e){var o=this;return Ae.Clone(function(){return new a(e,o.getScene())},this)},a.prototype.serialize=function(){var e=Ae.Serialize(this);if(e.customType="BABYLON.WaterMaterial",e.renderList=[],this._refractionRTT&&this._refractionRTT.renderList)for(var o=0;o<this._refractionRTT.renderList.length;o++)e.renderList.push(this._refractionRTT.renderList[o].id);return e},a.prototype.getClassName=function(){return"WaterMaterial"},a.Parse=function(e,o,d){var t=Ae.Parse(function(){return new a(e.name,o)},e,o,d);return t._waitingRenderList=e.renderList,t},a.CreateDefaultMesh=function(e,o){var d=di(e,{width:512,height:512,subdivisions:32,updatable:!1},o);return d},P([Ie("bumpTexture")],a.prototype,"_bumpTexture",void 0),P([pe("_markAllSubMeshesAsTexturesDirty")],a.prototype,"bumpTexture",void 0),P([je()],a.prototype,"diffuseColor",void 0),P([je()],a.prototype,"specularColor",void 0),P([ce()],a.prototype,"specularPower",void 0),P([ce("disableLighting")],a.prototype,"_disableLighting",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"disableLighting",void 0),P([ce("maxSimultaneousLights")],a.prototype,"_maxSimultaneousLights",void 0),P([pe("_markAllSubMeshesAsLightsDirty")],a.prototype,"maxSimultaneousLights",void 0),P([ce()],a.prototype,"windForce",void 0),P([vi()],a.prototype,"windDirection",void 0),P([ce()],a.prototype,"waveHeight",void 0),P([ce()],a.prototype,"bumpHeight",void 0),P([ce("bumpSuperimpose")],a.prototype,"_bumpSuperimpose",void 0),P([pe("_markAllSubMeshesAsMiscDirty")],a.prototype,"bumpSuperimpose",void 0),P([ce("fresnelSeparate")],a.prototype,"_fresnelSeparate",void 0),P([pe("_markAllSubMeshesAsMiscDirty")],a.prototype,"fresnelSeparate",void 0),P([ce("bumpAffectsReflection")],a.prototype,"_bumpAffectsReflection",void 0),P([pe("_markAllSubMeshesAsMiscDirty")],a.prototype,"bumpAffectsReflection",void 0),P([je()],a.prototype,"waterColor",void 0),P([ce()],a.prototype,"colorBlendFactor",void 0),P([je()],a.prototype,"waterColor2",void 0),P([ce()],a.prototype,"colorBlendFactor2",void 0),P([ce()],a.prototype,"waveLength",void 0),P([ce()],a.prototype,"waveSpeed",void 0),P([ce()],a.prototype,"waveCount",void 0),P([ce()],a.prototype,"disableClipPlane",void 0),P([ce()],a.prototype,"useLogarithmicDepth",null),a}(ct);rt("BABYLON.WaterMaterial",er);function kt(I){throw new Error('Could not dynamically require "'+I+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ni={exports:{}};(function(I,a){(function(e){I.exports=e()})(function(){return function e(o,d,t){function i(u,s){if(!d[u]){if(!o[u]){var n=typeof kt=="function"&&kt;if(!s&&n)return n(u,!0);if(r)return r(u,!0);throw new Error("Cannot find module '"+u+"'")}var f=d[u]={exports:{}};o[u][0].call(f.exports,function(h){var c=o[u][1][h];return i(c||h)},f,f.exports,e,o,d,t)}return d[u].exports}for(var r=typeof kt=="function"&&kt,l=0;l<t.length;l++)i(t[l]);return i}({1:[function(e,o,d){o.exports={name:"cannon",version:"0.6.2",description:"A lightweight 3D physics engine written in JavaScript.",homepage:"https://github.com/schteppe/cannon.js",author:"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",keywords:["cannon.js","cannon","physics","engine","3d"],main:"./build/cannon.js",engines:{node:"*"},repository:{type:"git",url:"https://github.com/schteppe/cannon.js.git"},bugs:{url:"https://github.com/schteppe/cannon.js/issues"},licenses:[{type:"MIT"}],devDependencies:{jshint:"latest","uglify-js":"latest",nodeunit:"^0.9.0",grunt:"~0.4.0","grunt-contrib-jshint":"~0.1.1","grunt-contrib-nodeunit":"^0.4.1","grunt-contrib-concat":"~0.1.3","grunt-contrib-uglify":"^0.5.1","grunt-browserify":"^2.1.4","grunt-contrib-yuidoc":"^0.5.2",browserify:"*"},dependencies:{}}},{}],2:[function(e,o,d){o.exports={version:e("../package.json").version,AABB:e("./collision/AABB"),ArrayCollisionMatrix:e("./collision/ArrayCollisionMatrix"),Body:e("./objects/Body"),Box:e("./shapes/Box"),Broadphase:e("./collision/Broadphase"),Constraint:e("./constraints/Constraint"),ContactEquation:e("./equations/ContactEquation"),Narrowphase:e("./world/Narrowphase"),ConeTwistConstraint:e("./constraints/ConeTwistConstraint"),ContactMaterial:e("./material/ContactMaterial"),ConvexPolyhedron:e("./shapes/ConvexPolyhedron"),Cylinder:e("./shapes/Cylinder"),DistanceConstraint:e("./constraints/DistanceConstraint"),Equation:e("./equations/Equation"),EventTarget:e("./utils/EventTarget"),FrictionEquation:e("./equations/FrictionEquation"),GSSolver:e("./solver/GSSolver"),GridBroadphase:e("./collision/GridBroadphase"),Heightfield:e("./shapes/Heightfield"),HingeConstraint:e("./constraints/HingeConstraint"),LockConstraint:e("./constraints/LockConstraint"),Mat3:e("./math/Mat3"),Material:e("./material/Material"),NaiveBroadphase:e("./collision/NaiveBroadphase"),ObjectCollisionMatrix:e("./collision/ObjectCollisionMatrix"),Pool:e("./utils/Pool"),Particle:e("./shapes/Particle"),Plane:e("./shapes/Plane"),PointToPointConstraint:e("./constraints/PointToPointConstraint"),Quaternion:e("./math/Quaternion"),Ray:e("./collision/Ray"),RaycastVehicle:e("./objects/RaycastVehicle"),RaycastResult:e("./collision/RaycastResult"),RigidVehicle:e("./objects/RigidVehicle"),RotationalEquation:e("./equations/RotationalEquation"),RotationalMotorEquation:e("./equations/RotationalMotorEquation"),SAPBroadphase:e("./collision/SAPBroadphase"),SPHSystem:e("./objects/SPHSystem"),Shape:e("./shapes/Shape"),Solver:e("./solver/Solver"),Sphere:e("./shapes/Sphere"),SplitSolver:e("./solver/SplitSolver"),Spring:e("./objects/Spring"),Trimesh:e("./shapes/Trimesh"),Vec3:e("./math/Vec3"),Vec3Pool:e("./utils/Vec3Pool"),World:e("./world/World")}},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(e,o,d){var t=e("../math/Vec3");e("../utils/Utils"),o.exports=i;function i(u){u=u||{},this.lowerBound=new t,u.lowerBound&&this.lowerBound.copy(u.lowerBound),this.upperBound=new t,u.upperBound&&this.upperBound.copy(u.upperBound)}var r=new t;i.prototype.setFromPoints=function(u,s,n,f){var h=this.lowerBound,c=this.upperBound,v=n;h.copy(u[0]),v&&v.vmult(h,h),c.copy(h);for(var p=1;p<u.length;p++){var m=u[p];v&&(v.vmult(m,r),m=r),m.x>c.x&&(c.x=m.x),m.x<h.x&&(h.x=m.x),m.y>c.y&&(c.y=m.y),m.y<h.y&&(h.y=m.y),m.z>c.z&&(c.z=m.z),m.z<h.z&&(h.z=m.z)}return s&&(s.vadd(h,h),s.vadd(c,c)),f&&(h.x-=f,h.y-=f,h.z-=f,c.x+=f,c.y+=f,c.z+=f),this},i.prototype.copy=function(u){return this.lowerBound.copy(u.lowerBound),this.upperBound.copy(u.upperBound),this},i.prototype.clone=function(){return new i().copy(this)},i.prototype.extend=function(u){var s=u.lowerBound.x;this.lowerBound.x>s&&(this.lowerBound.x=s);var n=u.upperBound.x;this.upperBound.x<n&&(this.upperBound.x=n);var s=u.lowerBound.y;this.lowerBound.y>s&&(this.lowerBound.y=s);var n=u.upperBound.y;this.upperBound.y<n&&(this.upperBound.y=n);var s=u.lowerBound.z;this.lowerBound.z>s&&(this.lowerBound.z=s);var n=u.upperBound.z;this.upperBound.z<n&&(this.upperBound.z=n)},i.prototype.overlaps=function(u){var s=this.lowerBound,n=this.upperBound,f=u.lowerBound,h=u.upperBound;return(f.x<=n.x&&n.x<=h.x||s.x<=h.x&&h.x<=n.x)&&(f.y<=n.y&&n.y<=h.y||s.y<=h.y&&h.y<=n.y)&&(f.z<=n.z&&n.z<=h.z||s.z<=h.z&&h.z<=n.z)},i.prototype.contains=function(u){var s=this.lowerBound,n=this.upperBound,f=u.lowerBound,h=u.upperBound;return s.x<=f.x&&n.x>=h.x&&s.y<=f.y&&n.y>=h.y&&s.z<=f.z&&n.z>=h.z},i.prototype.getCorners=function(u,s,n,f,h,c,v,p){var m=this.lowerBound,g=this.upperBound;u.copy(m),s.set(g.x,m.y,m.z),n.set(g.x,g.y,m.z),f.set(m.x,g.y,g.z),h.set(g.x,m.y,m.z),c.set(m.x,g.y,m.z),v.set(m.x,m.y,g.z),p.copy(g)};var l=[new t,new t,new t,new t,new t,new t,new t,new t];i.prototype.toLocalFrame=function(u,s){var n=l,f=n[0],h=n[1],c=n[2],v=n[3],p=n[4],m=n[5],g=n[6],S=n[7];this.getCorners(f,h,c,v,p,m,g,S);for(var y=0;y!==8;y++){var w=n[y];u.pointToLocal(w,w)}return s.setFromPoints(n)},i.prototype.toWorldFrame=function(u,s){var n=l,f=n[0],h=n[1],c=n[2],v=n[3],p=n[4],m=n[5],g=n[6],S=n[7];this.getCorners(f,h,c,v,p,m,g,S);for(var y=0;y!==8;y++){var w=n[y];u.pointToWorld(w,w)}return s.setFromPoints(n)}},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(e,o,d){o.exports=t;function t(){this.matrix=[]}t.prototype.get=function(i,r){if(i=i.index,r=r.index,r>i){var l=r;r=i,i=l}return this.matrix[(i*(i+1)>>1)+r-1]},t.prototype.set=function(i,r,l){if(i=i.index,r=r.index,r>i){var u=r;r=i,i=u}this.matrix[(i*(i+1)>>1)+r-1]=l?1:0},t.prototype.reset=function(){for(var i=0,r=this.matrix.length;i!==r;i++)this.matrix[i]=0},t.prototype.setNumObjects=function(i){this.matrix.length=i*(i-1)>>1}},{}],5:[function(e,o,d){var t=e("../objects/Body"),i=e("../math/Vec3"),r=e("../math/Quaternion");e("../shapes/Shape"),e("../shapes/Plane"),o.exports=l;function l(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}l.prototype.collisionPairs=function(v,p,m){throw new Error("collisionPairs not implemented for this BroadPhase class!")};var u=t.STATIC|t.KINEMATIC;l.prototype.needBroadphaseCollision=function(v,p){return!((v.collisionFilterGroup&p.collisionFilterMask)==0||(p.collisionFilterGroup&v.collisionFilterMask)==0||((v.type&u)!=0||v.sleepState===t.SLEEPING)&&((p.type&u)!=0||p.sleepState===t.SLEEPING))},l.prototype.intersectionTest=function(v,p,m,g){this.useBoundingBoxes?this.doBoundingBoxBroadphase(v,p,m,g):this.doBoundingSphereBroadphase(v,p,m,g)};var s=new i;new i,new r,new i,l.prototype.doBoundingSphereBroadphase=function(v,p,m,g){var S=s;p.position.vsub(v.position,S);var y=Math.pow(v.boundingRadius+p.boundingRadius,2),w=S.norm2();w<y&&(m.push(v),g.push(p))},l.prototype.doBoundingBoxBroadphase=function(v,p,m,g){v.aabbNeedsUpdate&&v.computeAABB(),p.aabbNeedsUpdate&&p.computeAABB(),v.aabb.overlaps(p.aabb)&&(m.push(v),g.push(p))};var n={keys:[]},f=[],h=[];l.prototype.makePairsUnique=function(v,p){for(var m=n,g=f,S=h,y=v.length,w=0;w!==y;w++)g[w]=v[w],S[w]=p[w];v.length=0,p.length=0;for(var w=0;w!==y;w++){var X=g[w].id,he=S[w].id,V=X<he?X+","+he:he+","+X;m[V]=w,m.keys.push(V)}for(var w=0;w!==m.keys.length;w++){var V=m.keys.pop(),q=m[V];v.push(g[q]),p.push(S[q]),delete m[V]}},l.prototype.setWorld=function(v){};var c=new i;l.boundingSphereCheck=function(v,p){var m=c;return v.position.vsub(p.position,m),Math.pow(v.shape.boundingSphereRadius+p.shape.boundingSphereRadius,2)>m.norm2()},l.prototype.aabbQuery=function(v,p,m){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(e,o,d){o.exports=l;var t=e("./Broadphase"),i=e("../math/Vec3"),r=e("../shapes/Shape");function l(s,n,f,h,c){t.apply(this),this.nx=f||10,this.ny=h||10,this.nz=c||10,this.aabbMin=s||new i(100,100,100),this.aabbMax=n||new i(-100,-100,-100);var v=this.nx*this.ny*this.nz;if(v<=0)throw"GridBroadphase: Each dimension's n must be >0";this.bins=[],this.binLengths=[],this.bins.length=v,this.binLengths.length=v;for(var p=0;p<v;p++)this.bins[p]=[],this.binLengths[p]=0}l.prototype=new t,l.prototype.constructor=l;var u=new i;new i,l.prototype.collisionPairs=function(s,n,f){var h=s.numObjects(),c=s.bodies,v=this.aabbMax,p=this.aabbMin,m=this.nx,g=this.ny,S=this.nz,y=g*S,w=S,X=1,he=v.x,V=v.y,q=v.z,N=p.x,_=p.y,L=p.z,j=m/(he-N),re=g/(V-_),te=S/(q-L),ye=(he-N)/m,B=(V-_)/g,F=(q-L)/S,Q=Math.sqrt(ye*ye+B*B+F*F)*.5,G=r.types,C=G.SPHERE,O=G.PLANE;G.BOX,G.COMPOUND,G.CONVEXPOLYHEDRON;for(var E=this.bins,T=this.binLengths,x=this.bins.length,A=0;A!==x;A++)T[A]=0;var k=Math.ceil,p=Math.min,v=Math.max;function z(Ct,Rt,_t,St,pt,Mt,Lt){var Et=(Ct-N)*j|0,xt=(Rt-_)*re|0,ht=(_t-L)*te|0,Pt=k((St-N)*j),Tt=k((pt-_)*re),ot=k((Mt-L)*te);Et<0?Et=0:Et>=m&&(Et=m-1),xt<0?xt=0:xt>=g&&(xt=g-1),ht<0?ht=0:ht>=S&&(ht=S-1),Pt<0?Pt=0:Pt>=m&&(Pt=m-1),Tt<0?Tt=0:Tt>=g&&(Tt=g-1),ot<0?ot=0:ot>=S&&(ot=S-1),Et*=y,xt*=w,ht*=X,Pt*=y,Tt*=w,ot*=X;for(var It=Et;It<=Pt;It+=y)for(var Nt=xt;Nt<=Tt;Nt+=w)for(var Bt=ht;Bt<=ot;Bt+=X){var Vt=It+Nt+Bt;E[Vt][T[Vt]++]=Lt}}for(var A=0;A!==h;A++){var b=c[A],W=b.shape;switch(W.type){case C:var K=b.position.x,me=b.position.y,de=b.position.z,ue=W.radius;z(K-ue,me-ue,de-ue,K+ue,me+ue,de+ue,b);break;case O:W.worldNormalNeedsUpdate&&W.computeWorldNormal(b.quaternion);var H=W.worldNormal,J=N+ye*.5-b.position.x,Ne=_+B*.5-b.position.y,Ee=L+F*.5-b.position.z,We=u;We.set(J,Ne,Ee);for(var Te=0,Le=0;Te!==m;Te++,Le+=y,We.y=Ne,We.x+=ye)for(var Fe=0,De=0;Fe!==g;Fe++,De+=w,We.z=Ee,We.y+=B)for(var ke=0,Be=0;ke!==S;ke++,Be+=X,We.z+=F)if(We.dot(H)<Q){var Ye=Le+De+Be;E[Ye][T[Ye]++]=b}break;default:b.aabbNeedsUpdate&&b.computeAABB(),z(b.aabb.lowerBound.x,b.aabb.lowerBound.y,b.aabb.lowerBound.z,b.aabb.upperBound.x,b.aabb.upperBound.y,b.aabb.upperBound.z,b);break}}for(var A=0;A!==x;A++){var et=T[A];if(et>1)for(var Me=E[A],Te=0;Te!==et;Te++)for(var b=Me[Te],Fe=0;Fe!==Te;Fe++){var it=Me[Fe];this.needBroadphaseCollision(b,it)&&this.intersectionTest(b,it,n,f)}}this.makePairsUnique(n,f)}},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(e,o,d){o.exports=r;var t=e("./Broadphase"),i=e("./AABB");function r(){t.apply(this)}r.prototype=new t,r.prototype.constructor=r,r.prototype.collisionPairs=function(l,u,s){var n=l.bodies,f=n.length,h,c,v,p;for(h=0;h!==f;h++)for(c=0;c!==h;c++)v=n[h],p=n[c],!!this.needBroadphaseCollision(v,p)&&this.intersectionTest(v,p,u,s)},new i,r.prototype.aabbQuery=function(l,u,s){s=s||[];for(var n=0;n<l.bodies.length;n++){var f=l.bodies[n];f.aabbNeedsUpdate&&f.computeAABB(),f.aabb.overlaps(u)&&s.push(f)}return s}},{"./AABB":3,"./Broadphase":5}],8:[function(e,o,d){o.exports=t;function t(){this.matrix={}}t.prototype.get=function(i,r){if(i=i.id,r=r.id,r>i){var l=r;r=i,i=l}return i+"-"+r in this.matrix},t.prototype.set=function(i,r,l){if(i=i.id,r=r.id,r>i){var u=r;r=i,i=u}l?this.matrix[i+"-"+r]=!0:delete this.matrix[i+"-"+r]},t.prototype.reset=function(){this.matrix={}},t.prototype.setNumObjects=function(i){}},{}],9:[function(e,o,d){o.exports=n;var t=e("../math/Vec3"),i=e("../math/Quaternion"),r=e("../math/Transform");e("../shapes/ConvexPolyhedron"),e("../shapes/Box");var l=e("../collision/RaycastResult"),u=e("../shapes/Shape"),s=e("../collision/AABB");function n(E,T){this.from=E?E.clone():new t,this.to=T?T.clone():new t,this._direction=new t,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=n.ANY,this.result=new l,this.hasHit=!1,this.callback=function(x){}}n.prototype.constructor=n,n.CLOSEST=1,n.ANY=2,n.ALL=4;var f=new s,h=[];n.prototype.intersectWorld=function(E,T){return this.mode=T.mode||n.ANY,this.result=T.result||new l,this.skipBackfaces=!!T.skipBackfaces,this.collisionFilterMask=typeof T.collisionFilterMask!="undefined"?T.collisionFilterMask:-1,this.collisionFilterGroup=typeof T.collisionFilterGroup!="undefined"?T.collisionFilterGroup:-1,T.from&&this.from.copy(T.from),T.to&&this.to.copy(T.to),this.callback=T.callback||function(){},this.hasHit=!1,this.result.reset(),this._updateDirection(),this.getAABB(f),h.length=0,E.broadphase.aabbQuery(E,f,h),this.intersectBodies(h),this.hasHit};var c=new t,v=new t;n.pointInTriangle=p;function p(E,T,x,A){A.vsub(T,G),x.vsub(T,c),E.vsub(T,v);var k=G.dot(G),z=G.dot(c),b=G.dot(v),W=c.dot(c),K=c.dot(v),me,de;return(me=W*b-z*K)>=0&&(de=k*K-z*b)>=0&&me+de<k*W-z*z}var m=new t,g=new i;n.prototype.intersectBody=function(E,T){T&&(this.result=T,this._updateDirection());var x=this.checkCollisionResponse;if(!(x&&!E.collisionResponse)&&!((this.collisionFilterGroup&E.collisionFilterMask)==0||(E.collisionFilterGroup&this.collisionFilterMask)==0))for(var A=m,k=g,z=0,b=E.shapes.length;z<b;z++){var W=E.shapes[z];if(!(x&&!W.collisionResponse)&&(E.quaternion.mult(E.shapeOrientations[z],k),E.quaternion.vmult(E.shapeOffsets[z],A),A.vadd(E.position,A),this.intersectShape(W,k,A,E),this.result._shouldStop))break}},n.prototype.intersectBodies=function(E,T){T&&(this.result=T,this._updateDirection());for(var x=0,A=E.length;!this.result._shouldStop&&x<A;x++)this.intersectBody(E[x])},n.prototype._updateDirection=function(){this.to.vsub(this.from,this._direction),this._direction.normalize()},n.prototype.intersectShape=function(E,T,x,A){var k=this.from,z=O(k,this._direction,x);if(!(z>E.boundingSphereRadius)){var b=this[E.type];b&&b.call(this,E,T,x,A)}},new t,new t;var S=new t,y=new t,w=new t,X=new t;new t,new l,n.prototype.intersectBox=function(E,T,x,A){return this.intersectConvex(E.convexPolyhedronRepresentation,T,x,A)},n.prototype[u.types.BOX]=n.prototype.intersectBox,n.prototype.intersectPlane=function(E,T,x,A){var k=this.from,z=this.to,b=this._direction,W=new t(0,0,1);T.vmult(W,W);var K=new t;k.vsub(x,K);var me=K.dot(W);z.vsub(x,K);var de=K.dot(W);if(!(me*de>0)&&!(k.distanceTo(z)<me)){var ue=W.dot(b);if(!(Math.abs(ue)<this.precision)){var H=new t,J=new t,Ne=new t;k.vsub(x,H);var Ee=-W.dot(H)/ue;b.scale(Ee,J),k.vadd(J,Ne),this.reportIntersection(W,Ne,E,A,-1)}}},n.prototype[u.types.PLANE]=n.prototype.intersectPlane,n.prototype.getAABB=function(E){var T=this.to,x=this.from;E.lowerBound.x=Math.min(T.x,x.x),E.lowerBound.y=Math.min(T.y,x.y),E.lowerBound.z=Math.min(T.z,x.z),E.upperBound.x=Math.max(T.x,x.x),E.upperBound.y=Math.max(T.y,x.y),E.upperBound.z=Math.max(T.z,x.z)};var he={faceList:[0]};n.prototype.intersectHeightfield=function(E,T,x,A){E.data,E.elementSize;var k=new t,z=new n(this.from,this.to);r.pointToLocalFrame(x,T,z.from,z.from),r.pointToLocalFrame(x,T,z.to,z.to);var b=[],W=null,K=null,me=null,de=null,ue=E.getIndexOfPosition(z.from.x,z.from.y,b,!1);if(ue&&(W=b[0],K=b[1],me=b[0],de=b[1]),ue=E.getIndexOfPosition(z.to.x,z.to.y,b,!1),ue&&((W===null||b[0]<W)&&(W=b[0]),(me===null||b[0]>me)&&(me=b[0]),(K===null||b[1]<K)&&(K=b[1]),(de===null||b[1]>de)&&(de=b[1])),W!==null){var H=[];E.getRectMinMax(W,K,me,de,H),H[0],H[1];for(var J=W;J<=me;J++)for(var Ne=K;Ne<=de;Ne++){if(this.result._shouldStop||(E.getConvexTrianglePillar(J,Ne,!1),r.pointToWorldFrame(x,T,E.pillarOffset,k),this.intersectConvex(E.pillarConvex,T,k,A,he),this.result._shouldStop))return;E.getConvexTrianglePillar(J,Ne,!0),r.pointToWorldFrame(x,T,E.pillarOffset,k),this.intersectConvex(E.pillarConvex,T,k,A,he)}}},n.prototype[u.types.HEIGHTFIELD]=n.prototype.intersectHeightfield;var V=new t,q=new t;n.prototype.intersectSphere=function(E,T,x,A){var k=this.from,z=this.to,b=E.radius,W=Math.pow(z.x-k.x,2)+Math.pow(z.y-k.y,2)+Math.pow(z.z-k.z,2),K=2*((z.x-k.x)*(k.x-x.x)+(z.y-k.y)*(k.y-x.y)+(z.z-k.z)*(k.z-x.z)),me=Math.pow(k.x-x.x,2)+Math.pow(k.y-x.y,2)+Math.pow(k.z-x.z,2)-Math.pow(b,2),de=Math.pow(K,2)-4*W*me,ue=V,H=q;if(!(de<0))if(de===0)k.lerp(z,de,ue),ue.vsub(x,H),H.normalize(),this.reportIntersection(H,ue,E,A,-1);else{var J=(-K-Math.sqrt(de))/(2*W),Ne=(-K+Math.sqrt(de))/(2*W);if(J>=0&&J<=1&&(k.lerp(z,J,ue),ue.vsub(x,H),H.normalize(),this.reportIntersection(H,ue,E,A,-1)),this.result._shouldStop)return;Ne>=0&&Ne<=1&&(k.lerp(z,Ne,ue),ue.vsub(x,H),H.normalize(),this.reportIntersection(H,ue,E,A,-1))}},n.prototype[u.types.SPHERE]=n.prototype.intersectSphere;var N=new t;new t,new t;var _=new t;n.prototype.intersectConvex=function(T,x,A,k,z){for(var b=N,W=_,K=z&&z.faceList||null,me=T.faces,de=T.vertices,ue=T.faceNormals,H=this._direction,J=this.from,Ne=this.to,Ee=J.distanceTo(Ne),We=K?K.length:me.length,Te=this.result,Le=0;!Te._shouldStop&&Le<We;Le++){var Fe=K?K[Le]:Le,De=me[Fe],ke=ue[Fe],Be=x,Ye=A;W.copy(de[De[0]]),Be.vmult(W,W),W.vadd(Ye,W),W.vsub(J,W),Be.vmult(ke,b);var et=H.dot(b);if(!(Math.abs(et)<this.precision)){var Me=b.dot(W)/et;if(!(Me<0)){H.mult(Me,S),S.vadd(J,S),y.copy(de[De[0]]),Be.vmult(y,y),Ye.vadd(y,y);for(var it=1;!Te._shouldStop&&it<De.length-1;it++){w.copy(de[De[it]]),X.copy(de[De[it+1]]),Be.vmult(w,w),Be.vmult(X,X),Ye.vadd(w,w),Ye.vadd(X,X);var Ct=S.distanceTo(J);!(p(S,y,w,X)||p(S,w,y,X))||Ct>Ee||this.reportIntersection(b,S,T,k,Fe)}}}}},n.prototype[u.types.CONVEXPOLYHEDRON]=n.prototype.intersectConvex;var L=new t,j=new t,re=new t,te=new t,ye=new t,B=new t;new s;var F=[],Q=new r;n.prototype.intersectTrimesh=function(T,x,A,k,z){var b=L,W=F,K=Q,me=_,de=j,ue=re,H=te,J=B,Ne=ye;z&&z.faceList;var Ee=T.indices;T.vertices,T.faceNormals;var We=this.from,Te=this.to,Le=this._direction;K.position.copy(A),K.quaternion.copy(x),r.vectorToLocalFrame(A,x,Le,de),r.pointToLocalFrame(A,x,We,ue),r.pointToLocalFrame(A,x,Te,H);var Fe=ue.distanceSquared(H);T.tree.rayQuery(this,K,W);for(var De=0,ke=W.length;!this.result._shouldStop&&De!==ke;De++){var Be=W[De];T.getNormal(Be,b),T.getVertex(Ee[Be*3],y),y.vsub(ue,me);var Ye=de.dot(b),et=b.dot(me)/Ye;if(!(et<0)){de.scale(et,S),S.vadd(ue,S),T.getVertex(Ee[Be*3+1],w),T.getVertex(Ee[Be*3+2],X);var Me=S.distanceSquared(ue);!(p(S,w,y,X)||p(S,y,w,X))||Me>Fe||(r.vectorToWorldFrame(x,b,Ne),r.pointToWorldFrame(A,x,S,J),this.reportIntersection(Ne,J,T,k,Be))}}W.length=0},n.prototype[u.types.TRIMESH]=n.prototype.intersectTrimesh,n.prototype.reportIntersection=function(E,T,x,A,k){var z=this.from,b=this.to,W=z.distanceTo(T),K=this.result;if(!(this.skipBackfaces&&E.dot(this._direction)>0))switch(K.hitFaceIndex=typeof k!="undefined"?k:-1,this.mode){case n.ALL:this.hasHit=!0,K.set(z,b,E,T,x,A,W),K.hasHit=!0,this.callback(K);break;case n.CLOSEST:(W<K.distance||!K.hasHit)&&(this.hasHit=!0,K.hasHit=!0,K.set(z,b,E,T,x,A,W));break;case n.ANY:this.hasHit=!0,K.hasHit=!0,K.set(z,b,E,T,x,A,W),K._shouldStop=!0;break}};var G=new t,C=new t;function O(E,T,x){x.vsub(E,G);var A=G.dot(T);T.mult(A,C),C.vadd(E,C);var k=x.distanceTo(C);return k}},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(e,o,d){var t=e("../math/Vec3");o.exports=i;function i(){this.rayFromWorld=new t,this.rayToWorld=new t,this.hitNormalWorld=new t,this.hitPointWorld=new t,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1}i.prototype.reset=function(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1},i.prototype.abort=function(){this._shouldStop=!0},i.prototype.set=function(r,l,u,s,n,f,h){this.rayFromWorld.copy(r),this.rayToWorld.copy(l),this.hitNormalWorld.copy(u),this.hitPointWorld.copy(s),this.shape=n,this.body=f,this.distance=h}},{"../math/Vec3":30}],11:[function(e,o,d){e("../shapes/Shape");var t=e("../collision/Broadphase");o.exports=i;function i(r){t.apply(this),this.axisList=[],this.world=null,this.axisIndex=0;var l=this.axisList;this._addBodyHandler=function(u){l.push(u.body)},this._removeBodyHandler=function(u){var s=l.indexOf(u.body);s!==-1&&l.splice(s,1)},r&&this.setWorld(r)}i.prototype=new t,i.prototype.setWorld=function(r){this.axisList.length=0;for(var l=0;l<r.bodies.length;l++)this.axisList.push(r.bodies[l]);r.removeEventListener("addBody",this._addBodyHandler),r.removeEventListener("removeBody",this._removeBodyHandler),r.addEventListener("addBody",this._addBodyHandler),r.addEventListener("removeBody",this._removeBodyHandler),this.world=r,this.dirty=!0},i.insertionSortX=function(r){for(var l=1,u=r.length;l<u;l++){for(var s=r[l],n=l-1;n>=0&&!(r[n].aabb.lowerBound.x<=s.aabb.lowerBound.x);n--)r[n+1]=r[n];r[n+1]=s}return r},i.insertionSortY=function(r){for(var l=1,u=r.length;l<u;l++){for(var s=r[l],n=l-1;n>=0&&!(r[n].aabb.lowerBound.y<=s.aabb.lowerBound.y);n--)r[n+1]=r[n];r[n+1]=s}return r},i.insertionSortZ=function(r){for(var l=1,u=r.length;l<u;l++){for(var s=r[l],n=l-1;n>=0&&!(r[n].aabb.lowerBound.z<=s.aabb.lowerBound.z);n--)r[n+1]=r[n];r[n+1]=s}return r},i.prototype.collisionPairs=function(r,l,u){var s=this.axisList,n=s.length,f=this.axisIndex,h,c;for(this.dirty&&(this.sortList(),this.dirty=!1),h=0;h!==n;h++){var v=s[h];for(c=h+1;c<n;c++){var p=s[c];if(!!this.needBroadphaseCollision(v,p)){if(!i.checkBounds(v,p,f))break;this.intersectionTest(v,p,l,u)}}}},i.prototype.sortList=function(){for(var r=this.axisList,l=this.axisIndex,u=r.length,s=0;s!==u;s++){var n=r[s];n.aabbNeedsUpdate&&n.computeAABB()}l===0?i.insertionSortX(r):l===1?i.insertionSortY(r):l===2&&i.insertionSortZ(r)},i.checkBounds=function(r,l,u){var s,n;u===0?(s=r.position.x,n=l.position.x):u===1?(s=r.position.y,n=l.position.y):u===2&&(s=r.position.z,n=l.position.z);var f=r.boundingRadius,h=l.boundingRadius,c=s+f,v=n-h;return v<c},i.prototype.autoDetectAxis=function(){for(var r=0,l=0,u=0,s=0,n=0,f=0,h=this.axisList,c=h.length,v=1/c,p=0;p!==c;p++){var m=h[p],g=m.position.x;r+=g,l+=g*g;var S=m.position.y;u+=S,s+=S*S;var y=m.position.z;n+=y,f+=y*y}var w=l-r*r*v,X=s-u*u*v,he=f-n*n*v;w>X?w>he?this.axisIndex=0:this.axisIndex=2:X>he?this.axisIndex=1:this.axisIndex=2},i.prototype.aabbQuery=function(r,l,u){u=u||[],this.dirty&&(this.sortList(),this.dirty=!1);var s=this.axisIndex,n="x";s===1&&(n="y"),s===2&&(n="z");var f=this.axisList;l.lowerBound[n],l.upperBound[n];for(var h=0;h<f.length;h++){var c=f[h];c.aabbNeedsUpdate&&c.computeAABB(),c.aabb.overlaps(l)&&u.push(c)}return u}},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(e,o,d){o.exports=u,e("./Constraint");var t=e("./PointToPointConstraint"),i=e("../equations/ConeEquation"),r=e("../equations/RotationalEquation");e("../equations/ContactEquation");var l=e("../math/Vec3");function u(s,n,f){f=f||{};var h=typeof f.maxForce!="undefined"?f.maxForce:1e6,c=f.pivotA?f.pivotA.clone():new l,v=f.pivotB?f.pivotB.clone():new l;this.axisA=f.axisA?f.axisA.clone():new l,this.axisB=f.axisB?f.axisB.clone():new l,t.call(this,s,c,n,v,h),this.collideConnected=!!f.collideConnected,this.angle=typeof f.angle!="undefined"?f.angle:0;var p=this.coneEquation=new i(s,n,f),m=this.twistEquation=new r(s,n,f);this.twistAngle=typeof f.twistAngle!="undefined"?f.twistAngle:0,p.maxForce=0,p.minForce=-h,m.maxForce=0,m.minForce=-h,this.equations.push(p,m)}u.prototype=new t,u.constructor=u,new l,new l,u.prototype.update=function(){var s=this.bodyA,n=this.bodyB,f=this.coneEquation,h=this.twistEquation;t.prototype.update.call(this),s.vectorToWorldFrame(this.axisA,f.axisA),n.vectorToWorldFrame(this.axisB,f.axisB),this.axisA.tangents(h.axisA,h.axisA),s.vectorToWorldFrame(h.axisA,h.axisA),this.axisB.tangents(h.axisB,h.axisB),n.vectorToWorldFrame(h.axisB,h.axisB),f.angle=this.angle,h.maxAngle=this.twistAngle}},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(e,o,d){o.exports=i;var t=e("../utils/Utils");function i(r,l,u){u=t.defaults(u,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=r,this.bodyB=l,this.id=i.idCounter++,this.collideConnected=u.collideConnected,u.wakeUpBodies&&(r&&r.wakeUp(),l&&l.wakeUp())}i.prototype.update=function(){throw new Error("method update() not implmemented in this Constraint subclass!")},i.prototype.enable=function(){for(var r=this.equations,l=0;l<r.length;l++)r[l].enabled=!0},i.prototype.disable=function(){for(var r=this.equations,l=0;l<r.length;l++)r[l].enabled=!1},i.idCounter=0},{"../utils/Utils":53}],14:[function(e,o,d){o.exports=r;var t=e("./Constraint"),i=e("../equations/ContactEquation");function r(l,u,s,n){t.call(this,l,u),typeof s=="undefined"&&(s=l.position.distanceTo(u.position)),typeof n=="undefined"&&(n=1e6),this.distance=s;var f=this.distanceEquation=new i(l,u);this.equations.push(f),f.minForce=-n,f.maxForce=n}r.prototype=new t,r.prototype.update=function(){var l=this.bodyA,u=this.bodyB,s=this.distanceEquation,n=this.distance*.5,f=s.ni;u.position.vsub(l.position,f),f.normalize(),f.mult(n,s.ri),f.mult(-n,s.rj)}},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(e,o,d){o.exports=u,e("./Constraint");var t=e("./PointToPointConstraint"),i=e("../equations/RotationalEquation"),r=e("../equations/RotationalMotorEquation");e("../equations/ContactEquation");var l=e("../math/Vec3");function u(f,h,c){c=c||{};var v=typeof c.maxForce!="undefined"?c.maxForce:1e6,p=c.pivotA?c.pivotA.clone():new l,m=c.pivotB?c.pivotB.clone():new l;t.call(this,f,p,h,m,v);var g=this.axisA=c.axisA?c.axisA.clone():new l(1,0,0);g.normalize();var S=this.axisB=c.axisB?c.axisB.clone():new l(1,0,0);S.normalize();var y=this.rotationalEquation1=new i(f,h,c),w=this.rotationalEquation2=new i(f,h,c),X=this.motorEquation=new r(f,h,v);X.enabled=!1,this.equations.push(y,w,X)}u.prototype=new t,u.constructor=u,u.prototype.enableMotor=function(){this.motorEquation.enabled=!0},u.prototype.disableMotor=function(){this.motorEquation.enabled=!1},u.prototype.setMotorSpeed=function(f){this.motorEquation.targetVelocity=f},u.prototype.setMotorMaxForce=function(f){this.motorEquation.maxForce=f,this.motorEquation.minForce=-f};var s=new l,n=new l;u.prototype.update=function(){var f=this.bodyA,h=this.bodyB,c=this.motorEquation,v=this.rotationalEquation1,p=this.rotationalEquation2,m=s,g=n,S=this.axisA,y=this.axisB;t.prototype.update.call(this),f.quaternion.vmult(S,m),h.quaternion.vmult(y,g),m.tangents(v.axisA,p.axisA),v.axisB.copy(g),p.axisB.copy(g),this.motorEquation.enabled&&(f.quaternion.vmult(this.axisA,c.axisA),h.quaternion.vmult(this.axisB,c.axisB))}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(e,o,d){o.exports=l,e("./Constraint");var t=e("./PointToPointConstraint"),i=e("../equations/RotationalEquation");e("../equations/RotationalMotorEquation"),e("../equations/ContactEquation");var r=e("../math/Vec3");function l(u,s,n){n=n||{};var f=typeof n.maxForce!="undefined"?n.maxForce:1e6,h=new r,c=new r,v=new r;u.position.vadd(s.position,v),v.scale(.5,v),s.pointToLocalFrame(v,c),u.pointToLocalFrame(v,h),t.call(this,u,h,s,c,f);var p=this.rotationalEquation1=new i(u,s,n),m=this.rotationalEquation2=new i(u,s,n),g=this.rotationalEquation3=new i(u,s,n);this.equations.push(p,m,g)}l.prototype=new t,l.constructor=l,new r,new r,l.prototype.update=function(){var u=this.bodyA,s=this.bodyB;this.motorEquation;var n=this.rotationalEquation1,f=this.rotationalEquation2,h=this.rotationalEquation3;t.prototype.update.call(this),u.vectorToWorldFrame(r.UNIT_X,n.axisA),s.vectorToWorldFrame(r.UNIT_Y,n.axisB),u.vectorToWorldFrame(r.UNIT_Y,f.axisA),s.vectorToWorldFrame(r.UNIT_Z,f.axisB),u.vectorToWorldFrame(r.UNIT_Z,h.axisA),s.vectorToWorldFrame(r.UNIT_X,h.axisB)}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(e,o,d){o.exports=l;var t=e("./Constraint"),i=e("../equations/ContactEquation"),r=e("../math/Vec3");function l(u,s,n,f,h){t.call(this,u,n),h=typeof h!="undefined"?h:1e6,this.pivotA=s?s.clone():new r,this.pivotB=f?f.clone():new r;var c=this.equationX=new i(u,n),v=this.equationY=new i(u,n),p=this.equationZ=new i(u,n);this.equations.push(c,v,p),c.minForce=v.minForce=p.minForce=-h,c.maxForce=v.maxForce=p.maxForce=h,c.ni.set(1,0,0),v.ni.set(0,1,0),p.ni.set(0,0,1)}l.prototype=new t,l.prototype.update=function(){var u=this.bodyA,s=this.bodyB,n=this.equationX,f=this.equationY,h=this.equationZ;u.quaternion.vmult(this.pivotA,n.ri),s.quaternion.vmult(this.pivotB,n.rj),f.ri.copy(n.ri),f.rj.copy(n.rj),h.ri.copy(n.ri),h.rj.copy(n.rj)}},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(e,o,d){o.exports=r;var t=e("../math/Vec3");e("../math/Mat3");var i=e("./Equation");function r(s,n,f){f=f||{};var h=typeof f.maxForce!="undefined"?f.maxForce:1e6;i.call(this,s,n,-h,h),this.axisA=f.axisA?f.axisA.clone():new t(1,0,0),this.axisB=f.axisB?f.axisB.clone():new t(0,1,0),this.angle=typeof f.angle!="undefined"?f.angle:0}r.prototype=new i,r.prototype.constructor=r;var l=new t,u=new t;r.prototype.computeB=function(s){var n=this.a,f=this.b,h=this.axisA,c=this.axisB,v=l,p=u,m=this.jacobianElementA,g=this.jacobianElementB;h.cross(c,v),c.cross(h,p),m.rotational.copy(p),g.rotational.copy(v);var S=Math.cos(this.angle)-h.dot(c),y=this.computeGW(),w=this.computeGiMf(),X=-S*n-y*f-s*w;return X}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(e,o,d){o.exports=r;var t=e("./Equation"),i=e("../math/Vec3");e("../math/Mat3");function r(p,m,g){g=typeof g!="undefined"?g:1e6,t.call(this,p,m,0,g),this.restitution=0,this.ri=new i,this.rj=new i,this.ni=new i}r.prototype=new t,r.prototype.constructor=r;var l=new i,u=new i,s=new i;r.prototype.computeB=function(p){var m=this.a,g=this.b,S=this.bi,y=this.bj,w=this.ri,X=this.rj,he=l,V=u,q=S.velocity,N=S.angularVelocity;S.force,S.torque;var _=y.velocity,L=y.angularVelocity;y.force,y.torque;var j=s,re=this.jacobianElementA,te=this.jacobianElementB,ye=this.ni;w.cross(ye,he),X.cross(ye,V),ye.negate(re.spatial),he.negate(re.rotational),te.spatial.copy(ye),te.rotational.copy(V),j.copy(y.position),j.vadd(X,j),j.vsub(S.position,j),j.vsub(w,j);var B=ye.dot(j),F=this.restitution+1,Q=F*_.dot(ye)-F*q.dot(ye)+L.dot(V)-N.dot(he),G=this.computeGiMf(),C=-B*m-Q*g-p*G;return C};var n=new i,f=new i,h=new i,c=new i,v=new i;r.prototype.getImpactVelocityAlongNormal=function(){var p=n,m=f,g=h,S=c,y=v;return this.bi.position.vadd(this.ri,g),this.bj.position.vadd(this.rj,S),this.bi.getVelocityAtWorldPoint(g,p),this.bj.getVelocityAtWorldPoint(S,m),p.vsub(m,y),this.ni.dot(y)}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(e,o,d){o.exports=r;var t=e("../math/JacobianElement"),i=e("../math/Vec3");function r(v,p,m,g){this.id=r.id++,this.minForce=typeof m=="undefined"?-1e6:m,this.maxForce=typeof g=="undefined"?1e6:g,this.bi=v,this.bj=p,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new t,this.jacobianElementB=new t,this.enabled=!0,this.setSpookParams(1e7,4,1/60)}r.prototype.constructor=r,r.id=0,r.prototype.setSpookParams=function(v,p,m){var g=p,S=v,y=m;this.a=4/(y*(1+4*g)),this.b=4*g/(1+4*g),this.eps=4/(y*y*S*(1+4*g))},r.prototype.computeB=function(v,p,m){var g=this.computeGW(),S=this.computeGq(),y=this.computeGiMf();return-S*v-g*p-y*m},r.prototype.computeGq=function(){var v=this.jacobianElementA,p=this.jacobianElementB,m=this.bi,g=this.bj,S=m.position,y=g.position;return v.spatial.dot(S)+p.spatial.dot(y)};var l=new i;r.prototype.computeGW=function(){var v=this.jacobianElementA,p=this.jacobianElementB,m=this.bi,g=this.bj,S=m.velocity,y=g.velocity,w=m.angularVelocity||l,X=g.angularVelocity||l;return v.multiplyVectors(S,w)+p.multiplyVectors(y,X)},r.prototype.computeGWlambda=function(){var v=this.jacobianElementA,p=this.jacobianElementB,m=this.bi,g=this.bj,S=m.vlambda,y=g.vlambda,w=m.wlambda||l,X=g.wlambda||l;return v.multiplyVectors(S,w)+p.multiplyVectors(y,X)};var u=new i,s=new i,n=new i,f=new i;r.prototype.computeGiMf=function(){var v=this.jacobianElementA,p=this.jacobianElementB,m=this.bi,g=this.bj,S=m.force,y=m.torque,w=g.force,X=g.torque,he=m.invMassSolve,V=g.invMassSolve;return m.invInertiaWorldSolve?m.invInertiaWorldSolve.vmult(y,n):n.set(0,0,0),g.invInertiaWorldSolve?g.invInertiaWorldSolve.vmult(X,f):f.set(0,0,0),S.mult(he,u),w.mult(V,s),v.multiplyVectors(u,n)+p.multiplyVectors(s,f)};var h=new i;r.prototype.computeGiMGt=function(){var v=this.jacobianElementA,p=this.jacobianElementB,m=this.bi,g=this.bj,S=m.invMassSolve,y=g.invMassSolve,w=m.invInertiaWorldSolve,X=g.invInertiaWorldSolve,he=S+y;return w&&(w.vmult(v.rotational,h),he+=h.dot(v.rotational)),X&&(X.vmult(p.rotational,h),he+=h.dot(p.rotational)),he};var c=new i;new i,new i,new i,new i,new i,r.prototype.addToWlambda=function(v){var p=this.jacobianElementA,m=this.jacobianElementB,g=this.bi,S=this.bj,y=c;p.spatial.mult(g.invMassSolve*v,y),g.vlambda.vadd(y,g.vlambda),m.spatial.mult(S.invMassSolve*v,y),S.vlambda.vadd(y,S.vlambda),g.invInertiaWorldSolve&&(g.invInertiaWorldSolve.vmult(p.rotational,y),y.mult(v,y),g.wlambda.vadd(y,g.wlambda)),S.invInertiaWorldSolve&&(S.invInertiaWorldSolve.vmult(m.rotational,y),y.mult(v,y),S.wlambda.vadd(y,S.wlambda))},r.prototype.computeC=function(){return this.computeGiMGt()+this.eps}},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(e,o,d){o.exports=r;var t=e("./Equation"),i=e("../math/Vec3");e("../math/Mat3");function r(s,n,f){t.call(this,s,n,-f,f),this.ri=new i,this.rj=new i,this.t=new i}r.prototype=new t,r.prototype.constructor=r;var l=new i,u=new i;r.prototype.computeB=function(s){this.a;var n=this.b;this.bi,this.bj;var f=this.ri,h=this.rj,c=l,v=u,p=this.t;f.cross(p,c),h.cross(p,v);var m=this.jacobianElementA,g=this.jacobianElementB;p.negate(m.spatial),c.negate(m.rotational),g.spatial.copy(p),g.rotational.copy(v);var S=this.computeGW(),y=this.computeGiMf(),w=-S*n-s*y;return w}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(e,o,d){o.exports=r;var t=e("../math/Vec3");e("../math/Mat3");var i=e("./Equation");function r(s,n,f){f=f||{};var h=typeof f.maxForce!="undefined"?f.maxForce:1e6;i.call(this,s,n,-h,h),this.axisA=f.axisA?f.axisA.clone():new t(1,0,0),this.axisB=f.axisB?f.axisB.clone():new t(0,1,0),this.maxAngle=Math.PI/2}r.prototype=new i,r.prototype.constructor=r;var l=new t,u=new t;r.prototype.computeB=function(s){var n=this.a,f=this.b,h=this.axisA,c=this.axisB,v=l,p=u,m=this.jacobianElementA,g=this.jacobianElementB;h.cross(c,v),c.cross(h,p),m.rotational.copy(p),g.rotational.copy(v);var S=Math.cos(this.maxAngle)-h.dot(c),y=this.computeGW(),w=this.computeGiMf(),X=-S*n-y*f-s*w;return X}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(e,o,d){o.exports=r;var t=e("../math/Vec3");e("../math/Mat3");var i=e("./Equation");function r(l,u,s){s=typeof s!="undefined"?s:1e6,i.call(this,l,u,-s,s),this.axisA=new t,this.axisB=new t,this.targetVelocity=0}r.prototype=new i,r.prototype.constructor=r,r.prototype.computeB=function(l){this.a;var u=this.b;this.bi,this.bj;var s=this.axisA,n=this.axisB,f=this.jacobianElementA,h=this.jacobianElementB;f.rotational.copy(s),n.negate(h.rotational);var c=this.computeGW()-this.targetVelocity,v=this.computeGiMf(),p=-c*u-l*v;return p}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(e,o,d){var t=e("../utils/Utils");o.exports=i;function i(r,l,u){u=t.defaults(u,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=i.idCounter++,this.materials=[r,l],this.friction=u.friction,this.restitution=u.restitution,this.contactEquationStiffness=u.contactEquationStiffness,this.contactEquationRelaxation=u.contactEquationRelaxation,this.frictionEquationStiffness=u.frictionEquationStiffness,this.frictionEquationRelaxation=u.frictionEquationRelaxation}i.idCounter=0},{"../utils/Utils":53}],25:[function(e,o,d){o.exports=t;function t(i){var r="";i=i||{},typeof i=="string"?(r=i,i={}):typeof i=="object"&&(r=""),this.name=r,this.id=t.idCounter++,this.friction=typeof i.friction!="undefined"?i.friction:-1,this.restitution=typeof i.restitution!="undefined"?i.restitution:-1}t.idCounter=0},{}],26:[function(e,o,d){o.exports=i;var t=e("./Vec3");function i(){this.spatial=new t,this.rotational=new t}i.prototype.multiplyElement=function(r){return r.spatial.dot(this.spatial)+r.rotational.dot(this.rotational)},i.prototype.multiplyVectors=function(r,l){return r.dot(this.spatial)+l.dot(this.rotational)}},{"./Vec3":30}],27:[function(e,o,d){o.exports=i;var t=e("./Vec3");function i(r){r?this.elements=r:this.elements=[0,0,0,0,0,0,0,0,0]}i.prototype.identity=function(){var r=this.elements;r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=1,r[5]=0,r[6]=0,r[7]=0,r[8]=1},i.prototype.setZero=function(){var r=this.elements;r[0]=0,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=0,r[6]=0,r[7]=0,r[8]=0},i.prototype.setTrace=function(r){var l=this.elements;l[0]=r.x,l[4]=r.y,l[8]=r.z},i.prototype.getTrace=function(r){var r=r||new t,l=this.elements;r.x=l[0],r.y=l[4],r.z=l[8]},i.prototype.vmult=function(r,l){l=l||new t;var u=this.elements,s=r.x,n=r.y,f=r.z;return l.x=u[0]*s+u[1]*n+u[2]*f,l.y=u[3]*s+u[4]*n+u[5]*f,l.z=u[6]*s+u[7]*n+u[8]*f,l},i.prototype.smult=function(r){for(var l=0;l<this.elements.length;l++)this.elements[l]*=r},i.prototype.mmult=function(r,l){for(var u=l||new i,s=0;s<3;s++)for(var n=0;n<3;n++){for(var f=0,h=0;h<3;h++)f+=r.elements[s+h*3]*this.elements[h+n*3];u.elements[s+n*3]=f}return u},i.prototype.scale=function(r,l){l=l||new i;for(var u=this.elements,s=l.elements,n=0;n!==3;n++)s[3*n+0]=r.x*u[3*n+0],s[3*n+1]=r.y*u[3*n+1],s[3*n+2]=r.z*u[3*n+2];return l},i.prototype.solve=function(r,l){l=l||new t;for(var u=3,s=4,n=[],f=0;f<u*s;f++)n.push(0);var f,h;for(f=0;f<3;f++)for(h=0;h<3;h++)n[f+s*h]=this.elements[f+3*h];n[3+4*0]=r.x,n[3+4*1]=r.y,n[3+4*2]=r.z;var c=3,v=c,p,m=4,g;do{if(f=v-c,n[f+s*f]===0){for(h=f+1;h<v;h++)if(n[f+s*h]!==0){p=m;do g=m-p,n[g+s*f]+=n[g+s*h];while(--p);break}}if(n[f+s*f]!==0)for(h=f+1;h<v;h++){var S=n[f+s*h]/n[f+s*f];p=m;do g=m-p,n[g+s*h]=g<=f?0:n[g+s*h]-n[g+s*f]*S;while(--p)}}while(--c);if(l.z=n[2*s+3]/n[2*s+2],l.y=(n[1*s+3]-n[1*s+2]*l.z)/n[1*s+1],l.x=(n[0*s+3]-n[0*s+2]*l.z-n[0*s+1]*l.y)/n[0*s+0],isNaN(l.x)||isNaN(l.y)||isNaN(l.z)||l.x===1/0||l.y===1/0||l.z===1/0)throw"Could not solve equation! Got x=["+l.toString()+"], b=["+r.toString()+"], A=["+this.toString()+"]";return l},i.prototype.e=function(r,l,u){if(u===void 0)return this.elements[l+3*r];this.elements[l+3*r]=u},i.prototype.copy=function(r){for(var l=0;l<r.elements.length;l++)this.elements[l]=r.elements[l];return this},i.prototype.toString=function(){for(var r="",l=",",u=0;u<9;u++)r+=this.elements[u]+l;return r},i.prototype.reverse=function(r){r=r||new i;for(var l=3,u=6,s=[],n=0;n<l*u;n++)s.push(0);var n,f;for(n=0;n<3;n++)for(f=0;f<3;f++)s[n+u*f]=this.elements[n+3*f];s[3+6*0]=1,s[3+6*1]=0,s[3+6*2]=0,s[4+6*0]=0,s[4+6*1]=1,s[4+6*2]=0,s[5+6*0]=0,s[5+6*1]=0,s[5+6*2]=1;var h=3,c=h,v,p=u,m;do{if(n=c-h,s[n+u*n]===0){for(f=n+1;f<c;f++)if(s[n+u*f]!==0){v=p;do m=p-v,s[m+u*n]+=s[m+u*f];while(--v);break}}if(s[n+u*n]!==0)for(f=n+1;f<c;f++){var g=s[n+u*f]/s[n+u*n];v=p;do m=p-v,s[m+u*f]=m<=n?0:s[m+u*f]-s[m+u*n]*g;while(--v)}}while(--h);n=2;do{f=n-1;do{var g=s[n+u*f]/s[n+u*n];v=u;do m=u-v,s[m+u*f]=s[m+u*f]-s[m+u*n]*g;while(--v)}while(f--)}while(--n);n=2;do{var g=1/s[n+u*n];v=u;do m=u-v,s[m+u*n]=s[m+u*n]*g;while(--v)}while(n--);n=2;do{f=2;do{if(m=s[l+f+u*n],isNaN(m)||m===1/0)throw"Could not reverse! A=["+this.toString()+"]";r.e(n,f,m)}while(f--)}while(n--);return r},i.prototype.setRotationFromQuaternion=function(r){var l=r.x,u=r.y,s=r.z,n=r.w,f=l+l,h=u+u,c=s+s,v=l*f,p=l*h,m=l*c,g=u*h,S=u*c,y=s*c,w=n*f,X=n*h,he=n*c,V=this.elements;return V[3*0+0]=1-(g+y),V[3*0+1]=p-he,V[3*0+2]=m+X,V[3*1+0]=p+he,V[3*1+1]=1-(v+y),V[3*1+2]=S-w,V[3*2+0]=m-X,V[3*2+1]=S+w,V[3*2+2]=1-(v+g),this},i.prototype.transpose=function(r){r=r||new i;for(var l=r.elements,u=this.elements,s=0;s!==3;s++)for(var n=0;n!==3;n++)l[3*s+n]=u[3*n+s];return r}},{"./Vec3":30}],28:[function(e,o,d){o.exports=i;var t=e("./Vec3");function i(f,h,c,v){this.x=f!==void 0?f:0,this.y=h!==void 0?h:0,this.z=c!==void 0?c:0,this.w=v!==void 0?v:1}i.prototype.set=function(f,h,c,v){this.x=f,this.y=h,this.z=c,this.w=v},i.prototype.toString=function(){return this.x+","+this.y+","+this.z+","+this.w},i.prototype.toArray=function(){return[this.x,this.y,this.z,this.w]},i.prototype.setFromAxisAngle=function(f,h){var c=Math.sin(h*.5);this.x=f.x*c,this.y=f.y*c,this.z=f.z*c,this.w=Math.cos(h*.5)},i.prototype.toAxisAngle=function(f){f=f||new t,this.normalize();var h=2*Math.acos(this.w),c=Math.sqrt(1-this.w*this.w);return c<.001?(f.x=this.x,f.y=this.y,f.z=this.z):(f.x=this.x/c,f.y=this.y/c,f.z=this.z/c),[f,h]};var r=new t,l=new t;i.prototype.setFromVectors=function(f,h){if(f.isAntiparallelTo(h)){var c=r,v=l;f.tangents(c,v),this.setFromAxisAngle(c,Math.PI)}else{var p=f.cross(h);this.x=p.x,this.y=p.y,this.z=p.z,this.w=Math.sqrt(Math.pow(f.norm(),2)*Math.pow(h.norm(),2))+f.dot(h),this.normalize()}};var u=new t,s=new t,n=new t;i.prototype.mult=function(f,h){h=h||new i;var c=this.w,v=u,p=s,m=n;return v.set(this.x,this.y,this.z),p.set(f.x,f.y,f.z),h.w=c*f.w-v.dot(p),v.cross(p,m),h.x=c*p.x+f.w*v.x+m.x,h.y=c*p.y+f.w*v.y+m.y,h.z=c*p.z+f.w*v.z+m.z,h},i.prototype.inverse=function(f){var h=this.x,c=this.y,v=this.z,p=this.w;f=f||new i,this.conjugate(f);var m=1/(h*h+c*c+v*v+p*p);return f.x*=m,f.y*=m,f.z*=m,f.w*=m,f},i.prototype.conjugate=function(f){return f=f||new i,f.x=-this.x,f.y=-this.y,f.z=-this.z,f.w=this.w,f},i.prototype.normalize=function(){var f=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);f===0?(this.x=0,this.y=0,this.z=0,this.w=0):(f=1/f,this.x*=f,this.y*=f,this.z*=f,this.w*=f)},i.prototype.normalizeFast=function(){var f=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;f===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=f,this.y*=f,this.z*=f,this.w*=f)},i.prototype.vmult=function(f,h){h=h||new t;var c=f.x,v=f.y,p=f.z,m=this.x,g=this.y,S=this.z,y=this.w,w=y*c+g*p-S*v,X=y*v+S*c-m*p,he=y*p+m*v-g*c,V=-m*c-g*v-S*p;return h.x=w*y+V*-m+X*-S-he*-g,h.y=X*y+V*-g+he*-m-w*-S,h.z=he*y+V*-S+w*-g-X*-m,h},i.prototype.copy=function(f){return this.x=f.x,this.y=f.y,this.z=f.z,this.w=f.w,this},i.prototype.toEuler=function(f,h){h=h||"YZX";var c,v,p,m=this.x,g=this.y,S=this.z,y=this.w;switch(h){case"YZX":var w=m*g+S*y;if(w>.499&&(c=2*Math.atan2(m,y),v=Math.PI/2,p=0),w<-.499&&(c=-2*Math.atan2(m,y),v=-Math.PI/2,p=0),isNaN(c)){var X=m*m,he=g*g,V=S*S;c=Math.atan2(2*g*y-2*m*S,1-2*he-2*V),v=Math.asin(2*w),p=Math.atan2(2*m*y-2*g*S,1-2*X-2*V)}break;default:throw new Error("Euler order "+h+" not supported yet.")}f.y=c,f.z=v,f.x=p},i.prototype.setFromEuler=function(f,h,c,v){v=v||"XYZ";var p=Math.cos(f/2),m=Math.cos(h/2),g=Math.cos(c/2),S=Math.sin(f/2),y=Math.sin(h/2),w=Math.sin(c/2);return v==="XYZ"?(this.x=S*m*g+p*y*w,this.y=p*y*g-S*m*w,this.z=p*m*w+S*y*g,this.w=p*m*g-S*y*w):v==="YXZ"?(this.x=S*m*g+p*y*w,this.y=p*y*g-S*m*w,this.z=p*m*w-S*y*g,this.w=p*m*g+S*y*w):v==="ZXY"?(this.x=S*m*g-p*y*w,this.y=p*y*g+S*m*w,this.z=p*m*w+S*y*g,this.w=p*m*g-S*y*w):v==="ZYX"?(this.x=S*m*g-p*y*w,this.y=p*y*g+S*m*w,this.z=p*m*w-S*y*g,this.w=p*m*g+S*y*w):v==="YZX"?(this.x=S*m*g+p*y*w,this.y=p*y*g+S*m*w,this.z=p*m*w-S*y*g,this.w=p*m*g-S*y*w):v==="XZY"&&(this.x=S*m*g-p*y*w,this.y=p*y*g-S*m*w,this.z=p*m*w+S*y*g,this.w=p*m*g+S*y*w),this},i.prototype.clone=function(){return new i(this.x,this.y,this.z,this.w)}},{"./Vec3":30}],29:[function(e,o,d){var t=e("./Vec3"),i=e("./Quaternion");o.exports=r;function r(u){u=u||{},this.position=new t,u.position&&this.position.copy(u.position),this.quaternion=new i,u.quaternion&&this.quaternion.copy(u.quaternion)}var l=new i;r.pointToLocalFrame=function(u,s,n,f){var f=f||new t;return n.vsub(u,f),s.conjugate(l),l.vmult(f,f),f},r.prototype.pointToLocal=function(u,s){return r.pointToLocalFrame(this.position,this.quaternion,u,s)},r.pointToWorldFrame=function(u,s,n,f){var f=f||new t;return s.vmult(n,f),f.vadd(u,f),f},r.prototype.pointToWorld=function(u,s){return r.pointToWorldFrame(this.position,this.quaternion,u,s)},r.prototype.vectorToWorldFrame=function(u,s){var s=s||new t;return this.quaternion.vmult(u,s),s},r.vectorToWorldFrame=function(u,s,n){return u.vmult(s,n),n},r.vectorToLocalFrame=function(u,s,n,f){var f=f||new t;return s.w*=-1,s.vmult(n,f),s.w*=-1,f}},{"./Quaternion":28,"./Vec3":30}],30:[function(e,o,d){o.exports=i;var t=e("./Mat3");function i(s,n,f){this.x=s||0,this.y=n||0,this.z=f||0}i.ZERO=new i(0,0,0),i.UNIT_X=new i(1,0,0),i.UNIT_Y=new i(0,1,0),i.UNIT_Z=new i(0,0,1),i.prototype.cross=function(s,n){var f=s.x,h=s.y,c=s.z,v=this.x,p=this.y,m=this.z;return n=n||new i,n.x=p*c-m*h,n.y=m*f-v*c,n.z=v*h-p*f,n},i.prototype.set=function(s,n,f){return this.x=s,this.y=n,this.z=f,this},i.prototype.setZero=function(){this.x=this.y=this.z=0},i.prototype.vadd=function(s,n){if(n)n.x=s.x+this.x,n.y=s.y+this.y,n.z=s.z+this.z;else return new i(this.x+s.x,this.y+s.y,this.z+s.z)},i.prototype.vsub=function(s,n){if(n)n.x=this.x-s.x,n.y=this.y-s.y,n.z=this.z-s.z;else return new i(this.x-s.x,this.y-s.y,this.z-s.z)},i.prototype.crossmat=function(){return new t([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])},i.prototype.normalize=function(){var s=this.x,n=this.y,f=this.z,h=Math.sqrt(s*s+n*n+f*f);if(h>0){var c=1/h;this.x*=c,this.y*=c,this.z*=c}else this.x=0,this.y=0,this.z=0;return h},i.prototype.unit=function(s){s=s||new i;var n=this.x,f=this.y,h=this.z,c=Math.sqrt(n*n+f*f+h*h);return c>0?(c=1/c,s.x=n*c,s.y=f*c,s.z=h*c):(s.x=1,s.y=0,s.z=0),s},i.prototype.norm=function(){var s=this.x,n=this.y,f=this.z;return Math.sqrt(s*s+n*n+f*f)},i.prototype.length=i.prototype.norm,i.prototype.norm2=function(){return this.dot(this)},i.prototype.lengthSquared=i.prototype.norm2,i.prototype.distanceTo=function(s){var n=this.x,f=this.y,h=this.z,c=s.x,v=s.y,p=s.z;return Math.sqrt((c-n)*(c-n)+(v-f)*(v-f)+(p-h)*(p-h))},i.prototype.distanceSquared=function(s){var n=this.x,f=this.y,h=this.z,c=s.x,v=s.y,p=s.z;return(c-n)*(c-n)+(v-f)*(v-f)+(p-h)*(p-h)},i.prototype.mult=function(s,n){n=n||new i;var f=this.x,h=this.y,c=this.z;return n.x=s*f,n.y=s*h,n.z=s*c,n},i.prototype.scale=i.prototype.mult,i.prototype.dot=function(s){return this.x*s.x+this.y*s.y+this.z*s.z},i.prototype.isZero=function(){return this.x===0&&this.y===0&&this.z===0},i.prototype.negate=function(s){return s=s||new i,s.x=-this.x,s.y=-this.y,s.z=-this.z,s};var r=new i,l=new i;i.prototype.tangents=function(s,n){var f=this.norm();if(f>0){var h=r,c=1/f;h.set(this.x*c,this.y*c,this.z*c);var v=l;Math.abs(h.x)<.9?(v.set(1,0,0),h.cross(v,s)):(v.set(0,1,0),h.cross(v,s)),h.cross(s,n)}else s.set(1,0,0),n.set(0,1,0)},i.prototype.toString=function(){return this.x+","+this.y+","+this.z},i.prototype.toArray=function(){return[this.x,this.y,this.z]},i.prototype.copy=function(s){return this.x=s.x,this.y=s.y,this.z=s.z,this},i.prototype.lerp=function(s,n,f){var h=this.x,c=this.y,v=this.z;f.x=h+(s.x-h)*n,f.y=c+(s.y-c)*n,f.z=v+(s.z-v)*n},i.prototype.almostEquals=function(s,n){return n===void 0&&(n=1e-6),!(Math.abs(this.x-s.x)>n||Math.abs(this.y-s.y)>n||Math.abs(this.z-s.z)>n)},i.prototype.almostZero=function(s){return s===void 0&&(s=1e-6),!(Math.abs(this.x)>s||Math.abs(this.y)>s||Math.abs(this.z)>s)};var u=new i;i.prototype.isAntiparallelTo=function(s,n){return this.negate(u),u.almostEquals(s,n)},i.prototype.clone=function(){return new i(this.x,this.y,this.z)}},{"./Mat3":27}],31:[function(e,o,d){o.exports=n;var t=e("../utils/EventTarget");e("../shapes/Shape");var i=e("../math/Vec3"),r=e("../math/Mat3"),l=e("../math/Quaternion");e("../material/Material");var u=e("../collision/AABB"),s=e("../shapes/Box");function n(_){_=_||{},t.apply(this),this.id=n.idCounter++,this.world=null,this.preStep=null,this.postStep=null,this.vlambda=new i,this.collisionFilterGroup=typeof _.collisionFilterGroup=="number"?_.collisionFilterGroup:1,this.collisionFilterMask=typeof _.collisionFilterMask=="number"?_.collisionFilterMask:1,this.collisionResponse=!0,this.position=new i,_.position&&this.position.copy(_.position),this.previousPosition=new i,this.initPosition=new i,this.velocity=new i,_.velocity&&this.velocity.copy(_.velocity),this.initVelocity=new i,this.force=new i;var L=typeof _.mass=="number"?_.mass:0;this.mass=L,this.invMass=L>0?1/L:0,this.material=_.material||null,this.linearDamping=typeof _.linearDamping=="number"?_.linearDamping:.01,this.type=L<=0?n.STATIC:n.DYNAMIC,typeof _.type==typeof n.STATIC&&(this.type=_.type),this.allowSleep=typeof _.allowSleep!="undefined"?_.allowSleep:!0,this.sleepState=0,this.sleepSpeedLimit=typeof _.sleepSpeedLimit!="undefined"?_.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof _.sleepTimeLimit!="undefined"?_.sleepTimeLimit:1,this.timeLastSleepy=0,this._wakeUpAfterNarrowphase=!1,this.torque=new i,this.quaternion=new l,_.quaternion&&this.quaternion.copy(_.quaternion),this.initQuaternion=new l,this.angularVelocity=new i,_.angularVelocity&&this.angularVelocity.copy(_.angularVelocity),this.initAngularVelocity=new i,this.interpolatedPosition=new i,this.interpolatedQuaternion=new l,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new i,this.invInertia=new i,this.invInertiaWorld=new r,this.invMassSolve=0,this.invInertiaSolve=new i,this.invInertiaWorldSolve=new r,this.fixedRotation=typeof _.fixedRotation!="undefined"?_.fixedRotation:!1,this.angularDamping=typeof _.angularDamping!="undefined"?_.angularDamping:.01,this.aabb=new u,this.aabbNeedsUpdate=!0,this.wlambda=new i,_.shape&&this.addShape(_.shape),this.updateMassProperties()}n.prototype=new t,n.prototype.constructor=n,n.DYNAMIC=1,n.STATIC=2,n.KINEMATIC=4,n.AWAKE=0,n.SLEEPY=1,n.SLEEPING=2,n.idCounter=0,n.prototype.wakeUp=function(){var _=this.sleepState;this.sleepState=0,_===n.SLEEPING&&this.dispatchEvent({type:"wakeup"})},n.prototype.sleep=function(){this.sleepState=n.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0)},n.sleepyEvent={type:"sleepy"},n.sleepEvent={type:"sleep"},n.prototype.sleepTick=function(_){if(this.allowSleep){var L=this.sleepState,j=this.velocity.norm2()+this.angularVelocity.norm2(),re=Math.pow(this.sleepSpeedLimit,2);L===n.AWAKE&&j<re?(this.sleepState=n.SLEEPY,this.timeLastSleepy=_,this.dispatchEvent(n.sleepyEvent)):L===n.SLEEPY&&j>re?this.wakeUp():L===n.SLEEPY&&_-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(n.sleepEvent))}},n.prototype.updateSolveMassProperties=function(){this.sleepState===n.SLEEPING||this.type===n.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))},n.prototype.pointToLocalFrame=function(_,L){var L=L||new i;return _.vsub(this.position,L),this.quaternion.conjugate().vmult(L,L),L},n.prototype.vectorToLocalFrame=function(_,L){var L=L||new i;return this.quaternion.conjugate().vmult(_,L),L},n.prototype.pointToWorldFrame=function(_,L){var L=L||new i;return this.quaternion.vmult(_,L),L.vadd(this.position,L),L},n.prototype.vectorToWorldFrame=function(_,L){var L=L||new i;return this.quaternion.vmult(_,L),L};var f=new i,h=new l;n.prototype.addShape=function(_,L,j){var re=new i,te=new l;return L&&re.copy(L),j&&te.copy(j),this.shapes.push(_),this.shapeOffsets.push(re),this.shapeOrientations.push(te),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,this},n.prototype.updateBoundingRadius=function(){for(var _=this.shapes,L=this.shapeOffsets,j=_.length,re=0,te=0;te!==j;te++){var ye=_[te];ye.updateBoundingSphereRadius();var B=L[te].norm(),F=ye.boundingSphereRadius;B+F>re&&(re=B+F)}this.boundingRadius=re};var c=new u;n.prototype.computeAABB=function(){for(var _=this.shapes,L=this.shapeOffsets,j=this.shapeOrientations,re=_.length,te=f,ye=h,B=this.quaternion,F=this.aabb,Q=c,G=0;G!==re;G++){var C=_[G];j[G].mult(B,ye),ye.vmult(L[G],te),te.vadd(this.position,te),C.calculateWorldAABB(te,ye,Q.lowerBound,Q.upperBound),G===0?F.copy(Q):F.extend(Q)}this.aabbNeedsUpdate=!1};var v=new r,p=new r;new r,n.prototype.updateInertiaWorld=function(_){var L=this.invInertia;if(!(L.x===L.y&&L.y===L.z&&!_)){var j=v,re=p;j.setRotationFromQuaternion(this.quaternion),j.transpose(re),j.scale(L,j),j.mmult(re,this.invInertiaWorld)}};var m=new i,g=new i;n.prototype.applyForce=function(_,L){if(this.type===n.DYNAMIC){var j=m;L.vsub(this.position,j);var re=g;j.cross(_,re),this.force.vadd(_,this.force),this.torque.vadd(re,this.torque)}};var S=new i,y=new i;n.prototype.applyLocalForce=function(_,L){if(this.type===n.DYNAMIC){var j=S,re=y;this.vectorToWorldFrame(_,j),this.pointToWorldFrame(L,re),this.applyForce(j,re)}};var w=new i,X=new i,he=new i;n.prototype.applyImpulse=function(_,L){if(this.type===n.DYNAMIC){var j=w;L.vsub(this.position,j);var re=X;re.copy(_),re.mult(this.invMass,re),this.velocity.vadd(re,this.velocity);var te=he;j.cross(_,te),this.invInertiaWorld.vmult(te,te),this.angularVelocity.vadd(te,this.angularVelocity)}};var V=new i,q=new i;n.prototype.applyLocalImpulse=function(_,L){if(this.type===n.DYNAMIC){var j=V,re=q;this.vectorToWorldFrame(_,j),this.pointToWorldFrame(L,re),this.applyImpulse(j,re)}};var N=new i;n.prototype.updateMassProperties=function(){var _=N;this.invMass=this.mass>0?1/this.mass:0;var L=this.inertia,j=this.fixedRotation;this.computeAABB(),_.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),s.calculateInertia(_,this.mass,L),this.invInertia.set(L.x>0&&!j?1/L.x:0,L.y>0&&!j?1/L.y:0,L.z>0&&!j?1/L.z:0),this.updateInertiaWorld(!0)},n.prototype.getVelocityAtWorldPoint=function(_,L){var j=new i;return _.vsub(this.position,j),this.angularVelocity.cross(j,L),this.velocity.vadd(L,L),L}},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(e,o,d){e("./Body");var t=e("../math/Vec3"),i=e("../math/Quaternion");e("../collision/RaycastResult");var r=e("../collision/Ray"),l=e("../objects/WheelInfo");o.exports=u;function u(B){this.chassisBody=B.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof B.indexRightAxis!="undefined"?B.indexRightAxis:1,this.indexForwardAxis=typeof B.indexForwardAxis!="undefined"?B.indexForwardAxis:0,this.indexUpAxis=typeof B.indexUpAxis!="undefined"?B.indexUpAxis:2}new t,new t,new t;var s=new t,n=new t,f=new t;new r,u.prototype.addWheel=function(B){B=B||{};var F=new l(B),Q=this.wheelInfos.length;return this.wheelInfos.push(F),Q},u.prototype.setSteeringValue=function(B,F){var Q=this.wheelInfos[F];Q.steering=B},new t,u.prototype.applyEngineForce=function(B,F){this.wheelInfos[F].engineForce=B},u.prototype.setBrake=function(B,F){this.wheelInfos[F].brake=B},u.prototype.addToWorld=function(B){this.constraints,B.add(this.chassisBody);var F=this;this.preStepCallback=function(){F.updateVehicle(B.dt)},B.addEventListener("preStep",this.preStepCallback),this.world=B},u.prototype.getVehicleAxisWorld=function(B,F){F.set(B===0?1:0,B===1?1:0,B===2?1:0),this.chassisBody.vectorToWorldFrame(F,F)},u.prototype.updateVehicle=function(B){for(var F=this.wheelInfos,Q=F.length,G=this.chassisBody,C=0;C<Q;C++)this.updateWheelTransform(C);this.currentVehicleSpeedKmHour=3.6*G.velocity.norm();var O=new t;this.getVehicleAxisWorld(this.indexForwardAxis,O),O.dot(G.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(var C=0;C<Q;C++)this.castRay(F[C]);this.updateSuspension(B);for(var E=new t,T=new t,C=0;C<Q;C++){var x=F[C],A=x.suspensionForce;A>x.maxSuspensionForce&&(A=x.maxSuspensionForce),x.raycastResult.hitNormalWorld.scale(A*B,E),x.raycastResult.hitPointWorld.vsub(G.position,T),G.applyImpulse(E,x.raycastResult.hitPointWorld)}this.updateFriction(B);var k=new t,z=new t,b=new t;for(C=0;C<Q;C++){var x=F[C];G.getVelocityAtWorldPoint(x.chassisConnectionPointWorld,b);var W=1;switch(this.indexUpAxis){case 1:W=-1;break}if(x.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,z);var K=z.dot(x.raycastResult.hitNormalWorld);x.raycastResult.hitNormalWorld.scale(K,k),z.vsub(k,z);var me=z.dot(b);x.deltaRotation=W*me*B/x.radius}(x.sliding||!x.isInContact)&&x.engineForce!==0&&x.useCustomSlidingRotationalSpeed&&(x.deltaRotation=(x.engineForce>0?1:-1)*x.customSlidingRotationalSpeed*B),Math.abs(x.brake)>Math.abs(x.engineForce)&&(x.deltaRotation=0),x.rotation+=x.deltaRotation,x.deltaRotation*=.99}},u.prototype.updateSuspension=function(B){for(var F=this.chassisBody,Q=F.mass,G=this.wheelInfos,C=G.length,O=0;O<C;O++){var E=G[O];if(E.isInContact){var T,x=E.suspensionRestLength,A=E.suspensionLength,k=x-A;T=E.suspensionStiffness*k*E.clippedInvContactDotSuspension;var z=E.suspensionRelativeVelocity,b;z<0?b=E.dampingCompression:b=E.dampingRelaxation,T-=b*z,E.suspensionForce=T*Q,E.suspensionForce<0&&(E.suspensionForce=0)}else E.suspensionForce=0}},u.prototype.removeFromWorld=function(B){this.constraints,B.remove(this.chassisBody),B.removeEventListener("preStep",this.preStepCallback),this.world=null};var h=new t,c=new t;u.prototype.castRay=function(B){var F=h,Q=c;this.updateWheelTransformWorld(B);var G=this.chassisBody,C=-1,O=B.suspensionRestLength+B.radius;B.directionWorld.scale(O,F);var E=B.chassisConnectionPointWorld;E.vadd(F,Q);var T=B.raycastResult;T.reset();var x=G.collisionResponse;G.collisionResponse=!1,this.world.rayTest(E,Q,T),G.collisionResponse=x;var A=T.body;if(B.raycastResult.groundObject=0,A){C=T.distance,B.raycastResult.hitNormalWorld=T.hitNormalWorld,B.isInContact=!0;var k=T.distance;B.suspensionLength=k-B.radius;var z=B.suspensionRestLength-B.maxSuspensionTravel,b=B.suspensionRestLength+B.maxSuspensionTravel;B.suspensionLength<z&&(B.suspensionLength=z),B.suspensionLength>b&&(B.suspensionLength=b,B.raycastResult.reset());var W=B.raycastResult.hitNormalWorld.dot(B.directionWorld),K=new t;G.getVelocityAtWorldPoint(B.raycastResult.hitPointWorld,K);var me=B.raycastResult.hitNormalWorld.dot(K);if(W>=-.1)B.suspensionRelativeVelocity=0,B.clippedInvContactDotSuspension=1/.1;else{var de=-1/W;B.suspensionRelativeVelocity=me*de,B.clippedInvContactDotSuspension=de}}else B.suspensionLength=B.suspensionRestLength+0*B.maxSuspensionTravel,B.suspensionRelativeVelocity=0,B.directionWorld.scale(-1,B.raycastResult.hitNormalWorld),B.clippedInvContactDotSuspension=1;return C},u.prototype.updateWheelTransformWorld=function(B){B.isInContact=!1;var F=this.chassisBody;F.pointToWorldFrame(B.chassisConnectionPointLocal,B.chassisConnectionPointWorld),F.vectorToWorldFrame(B.directionLocal,B.directionWorld),F.vectorToWorldFrame(B.axleLocal,B.axleWorld)},u.prototype.updateWheelTransform=function(B){var F=s,Q=n,G=f,C=this.wheelInfos[B];this.updateWheelTransformWorld(C),C.directionLocal.scale(-1,F),Q.copy(C.axleLocal),F.cross(Q,G),G.normalize(),Q.normalize();var O=C.steering,E=new i;E.setFromAxisAngle(F,O);var T=new i;T.setFromAxisAngle(Q,C.rotation);var x=C.worldTransform.quaternion;this.chassisBody.quaternion.mult(E,x),x.mult(T,x),x.normalize();var A=C.worldTransform.position;A.copy(C.directionWorld),A.scale(C.suspensionLength,A),A.vadd(C.chassisConnectionPointWorld,A)};var v=[new t(1,0,0),new t(0,1,0),new t(0,0,1)];u.prototype.getWheelTransformWorld=function(B){return this.wheelInfos[B].worldTransform};var p=new t,m=[],g=[],S=1;u.prototype.updateFriction=function(B){for(var F=p,Q=this.wheelInfos,G=Q.length,C=this.chassisBody,O=g,E=m,T=0;T<G;T++){var x=Q[T],A=x.raycastResult.body;x.sideImpulse=0,x.forwardImpulse=0,O[T]||(O[T]=new t),E[T]||(E[T]=new t)}for(var T=0;T<G;T++){var x=Q[T],A=x.raycastResult.body;if(A){var k=E[T],z=this.getWheelTransformWorld(T);z.vectorToWorldFrame(v[this.indexRightAxis],k);var b=x.raycastResult.hitNormalWorld,W=k.dot(b);b.scale(W,F),k.vsub(F,k),k.normalize(),b.cross(k,O[T]),O[T].normalize(),x.sideImpulse=ye(C,x.raycastResult.hitPointWorld,A,x.raycastResult.hitPointWorld,k),x.sideImpulse*=S}}var K=1,me=.5;this.sliding=!1;for(var T=0;T<G;T++){var x=Q[T],A=x.raycastResult.body,de=0;if(x.slipInfo=1,A){var ue=0,H=x.brake?x.brake:ue;de=he(C,A,x.raycastResult.hitPointWorld,O[T],H),de+=x.engineForce*B;var J=H/de;x.slipInfo*=J}if(x.forwardImpulse=0,x.skidInfo=1,A){x.skidInfo=1;var Ne=x.suspensionForce*B*x.frictionSlip,Ee=Ne,We=Ne*Ee;x.forwardImpulse=de;var Te=x.forwardImpulse*me,Le=x.sideImpulse*K,Fe=Te*Te+Le*Le;if(x.sliding=!1,Fe>We){this.sliding=!0,x.sliding=!0;var J=Ne/Math.sqrt(Fe);x.skidInfo*=J}}}if(this.sliding)for(var T=0;T<G;T++){var x=Q[T];x.sideImpulse!==0&&x.skidInfo<1&&(x.forwardImpulse*=x.skidInfo,x.sideImpulse*=x.skidInfo)}for(var T=0;T<G;T++){var x=Q[T],De=new t;if(De.copy(x.raycastResult.hitPointWorld),x.forwardImpulse!==0){var ke=new t;O[T].scale(x.forwardImpulse,ke),C.applyImpulse(ke,De)}if(x.sideImpulse!==0){var A=x.raycastResult.body,Be=new t;Be.copy(x.raycastResult.hitPointWorld);var Ye=new t;E[T].scale(x.sideImpulse,Ye),C.pointToLocalFrame(De,De),De["xyz"[this.indexUpAxis]]*=x.rollInfluence,C.pointToWorldFrame(De,De),C.applyImpulse(Ye,De),Ye.scale(-1,Ye),A.applyImpulse(Ye,Be)}}};var y=new t,w=new t,X=new t;function he(B,F,Q,G,C){var O=0,E=Q,T=y,x=w,A=X;B.getVelocityAtWorldPoint(E,T),F.getVelocityAtWorldPoint(E,x),T.vsub(x,A);var k=G.dot(A),z=L(B,Q,G),b=L(F,Q,G),W=1,K=W/(z+b);return O=-k*K,C<O&&(O=C),O<-C&&(O=-C),O}var V=new t,q=new t,N=new t,_=new t;function L(B,F,Q){var G=V,C=q,O=N,E=_;return F.vsub(B.position,G),G.cross(Q,C),B.invInertiaWorld.vmult(C,E),E.cross(G,O),B.invMass+Q.dot(O)}var j=new t,re=new t,te=new t;function ye(B,F,Q,G,C,O){var E=C.norm2();if(E>1.1)return 0;var T=j,x=re,A=te;B.getVelocityAtWorldPoint(F,T),Q.getVelocityAtWorldPoint(G,x),T.vsub(x,A);var k=C.dot(A),z=.2,b=1/(B.invMass+Q.invMass),O=-z*k*b;return O}},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(e,o,d){var t=e("./Body"),i=e("../shapes/Sphere"),r=e("../shapes/Box"),l=e("../math/Vec3"),u=e("../constraints/HingeConstraint");o.exports=s;function s(h){if(this.wheelBodies=[],this.coordinateSystem=typeof h.coordinateSystem=="undefined"?new l(1,2,3):h.coordinateSystem.clone(),this.chassisBody=h.chassisBody,!this.chassisBody){var c=new r(new l(5,2,.5));this.chassisBody=new t(1,c)}this.constraints=[],this.wheelAxes=[],this.wheelForces=[]}s.prototype.addWheel=function(h){h=h||{};var c=h.body;c||(c=new t(1,new i(1.2))),this.wheelBodies.push(c),this.wheelForces.push(0),new l;var v=typeof h.position!="undefined"?h.position.clone():new l,p=new l;this.chassisBody.pointToWorldFrame(v,p),c.position.set(p.x,p.y,p.z);var m=typeof h.axis!="undefined"?h.axis.clone():new l(0,1,0);this.wheelAxes.push(m);var g=new u(this.chassisBody,c,{pivotA:v,axisA:m,pivotB:l.ZERO,axisB:m,collideConnected:!1});return this.constraints.push(g),this.wheelBodies.length-1},s.prototype.setSteeringValue=function(h,c){var v=this.wheelAxes[c],p=Math.cos(h),m=Math.sin(h),g=v.x,S=v.y;this.constraints[c].axisA.set(p*g-m*S,m*g+p*S,0)},s.prototype.setMotorSpeed=function(h,c){var v=this.constraints[c];v.enableMotor(),v.motorTargetVelocity=h},s.prototype.disableMotor=function(h){var c=this.constraints[h];c.disableMotor()};var n=new l;s.prototype.setWheelForce=function(h,c){this.wheelForces[c]=h},s.prototype.applyWheelForce=function(h,c){var v=this.wheelAxes[c],p=this.wheelBodies[c],m=p.torque;v.scale(h,n),p.vectorToWorldFrame(n,n),m.vadd(n,m)},s.prototype.addToWorld=function(h){for(var c=this.constraints,v=this.wheelBodies.concat([this.chassisBody]),p=0;p<v.length;p++)h.add(v[p]);for(var p=0;p<c.length;p++)h.addConstraint(c[p]);h.addEventListener("preStep",this._update.bind(this))},s.prototype._update=function(){for(var h=this.wheelForces,c=0;c<h.length;c++)this.applyWheelForce(h[c],c)},s.prototype.removeFromWorld=function(h){for(var c=this.constraints,v=this.wheelBodies.concat([this.chassisBody]),p=0;p<v.length;p++)h.remove(v[p]);for(var p=0;p<c.length;p++)h.removeConstraint(c[p])};var f=new l;s.prototype.getWheelSpeed=function(h){var c=this.wheelAxes[h],v=this.wheelBodies[h],p=v.angularVelocity;return this.chassisBody.vectorToWorldFrame(c,f),p.dot(f)}},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(e,o,d){o.exports=i,e("../shapes/Shape");var t=e("../math/Vec3");e("../math/Quaternion"),e("../shapes/Particle"),e("../objects/Body"),e("../material/Material");function i(){this.particles=[],this.density=1,this.smoothingRadius=1,this.speedOfSound=1,this.viscosity=.01,this.eps=1e-6,this.pressures=[],this.densities=[],this.neighbors=[]}i.prototype.add=function(c){this.particles.push(c),this.neighbors.length<this.particles.length&&this.neighbors.push([])},i.prototype.remove=function(c){var v=this.particles.indexOf(c);v!==-1&&(this.particles.splice(v,1),this.neighbors.length>this.particles.length&&this.neighbors.pop())};var r=new t;i.prototype.getNeighbors=function(c,v){for(var p=this.particles.length,m=c.id,g=this.smoothingRadius*this.smoothingRadius,S=r,y=0;y!==p;y++){var w=this.particles[y];w.position.vsub(c.position,S),m!==w.id&&S.norm2()<g&&v.push(w)}};var l=new t,u=new t,s=new t,n=new t,f=new t,h=new t;i.prototype.update=function(){for(var c=this.particles.length,v=l,p=this.speedOfSound,m=this.eps,g=0;g!==c;g++){var S=this.particles[g],y=this.neighbors[g];y.length=0,this.getNeighbors(S,y),y.push(this.particles[g]);for(var w=y.length,X=0,he=0;he!==w;he++){S.position.vsub(y[he].position,v);var V=v.norm(),q=this.w(V);X+=y[he].mass*q}this.densities[g]=X,this.pressures[g]=p*p*(this.densities[g]-this.density)}for(var N=u,_=s,L=n,j=f,re=h,g=0;g!==c;g++){var te=this.particles[g];N.set(0,0,0),_.set(0,0,0);for(var ye,B,y=this.neighbors[g],w=y.length,he=0;he!==w;he++){var F=y[he];te.position.vsub(F.position,j);var Q=j.norm();ye=-F.mass*(this.pressures[g]/(this.densities[g]*this.densities[g]+m)+this.pressures[he]/(this.densities[he]*this.densities[he]+m)),this.gradw(j,L),L.mult(ye,L),N.vadd(L,N),F.velocity.vsub(te.velocity,re),re.mult(1/(1e-4+this.densities[g]*this.densities[he])*this.viscosity*F.mass,re),B=this.nablaw(Q),re.mult(B,re),_.vadd(re,_)}_.mult(te.mass,_),N.mult(te.mass,N),te.force.vadd(_,te.force),te.force.vadd(N,te.force)}},i.prototype.w=function(c){var v=this.smoothingRadius;return 315/(64*Math.PI*Math.pow(v,9))*Math.pow(v*v-c*c,3)},i.prototype.gradw=function(c,v){var p=c.norm(),m=this.smoothingRadius;c.mult(945/(32*Math.PI*Math.pow(m,9))*Math.pow(m*m-p*p,2),v)},i.prototype.nablaw=function(c){var v=this.smoothingRadius,p=945/(32*Math.PI*Math.pow(v,9))*(v*v-c*c)*(7*c*c-3*v*v);return p}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(e,o,d){var t=e("../math/Vec3");o.exports=i;function i(g,S,y){y=y||{},this.restLength=typeof y.restLength=="number"?y.restLength:1,this.stiffness=y.stiffness||100,this.damping=y.damping||1,this.bodyA=g,this.bodyB=S,this.localAnchorA=new t,this.localAnchorB=new t,y.localAnchorA&&this.localAnchorA.copy(y.localAnchorA),y.localAnchorB&&this.localAnchorB.copy(y.localAnchorB),y.worldAnchorA&&this.setWorldAnchorA(y.worldAnchorA),y.worldAnchorB&&this.setWorldAnchorB(y.worldAnchorB)}i.prototype.setWorldAnchorA=function(g){this.bodyA.pointToLocalFrame(g,this.localAnchorA)},i.prototype.setWorldAnchorB=function(g){this.bodyB.pointToLocalFrame(g,this.localAnchorB)},i.prototype.getWorldAnchorA=function(g){this.bodyA.pointToWorldFrame(this.localAnchorA,g)},i.prototype.getWorldAnchorB=function(g){this.bodyB.pointToWorldFrame(this.localAnchorB,g)};var r=new t,l=new t,u=new t,s=new t,n=new t,f=new t,h=new t,c=new t,v=new t,p=new t,m=new t;i.prototype.applyForce=function(){var g=this.stiffness,S=this.damping,y=this.restLength,w=this.bodyA,X=this.bodyB,he=r,V=l,q=u,N=s,_=m,L=n,j=f,re=h,te=c,ye=v,B=p;this.getWorldAnchorA(L),this.getWorldAnchorB(j),L.vsub(w.position,re),j.vsub(X.position,te),j.vsub(L,he);var F=he.norm();V.copy(he),V.normalize(),X.velocity.vsub(w.velocity,q),X.angularVelocity.cross(te,_),q.vadd(_,q),w.angularVelocity.cross(re,_),q.vsub(_,q),V.mult(-g*(F-y)-S*q.dot(V),N),w.force.vsub(N,w.force),X.force.vadd(N,X.force),re.cross(N,ye),te.cross(N,B),w.torque.vsub(ye,w.torque),X.torque.vadd(B,X.torque)}},{"../math/Vec3":30}],36:[function(e,o,d){var t=e("../math/Vec3"),i=e("../math/Transform"),r=e("../collision/RaycastResult"),l=e("../utils/Utils");o.exports=u;function u(f){f=l.defaults(f,{chassisConnectionPointLocal:new t,chassisConnectionPointWorld:new t,directionLocal:new t,directionWorld:new t,axleLocal:new t,axleWorld:new t,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:1e4,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=f.maxSuspensionTravel,this.customSlidingRotationalSpeed=f.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=f.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=f.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=f.chassisConnectionPointWorld.clone(),this.directionLocal=f.directionLocal.clone(),this.directionWorld=f.directionWorld.clone(),this.axleLocal=f.axleLocal.clone(),this.axleWorld=f.axleWorld.clone(),this.suspensionRestLength=f.suspensionRestLength,this.suspensionMaxLength=f.suspensionMaxLength,this.radius=f.radius,this.suspensionStiffness=f.suspensionStiffness,this.dampingCompression=f.dampingCompression,this.dampingRelaxation=f.dampingRelaxation,this.frictionSlip=f.frictionSlip,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=f.rollInfluence,this.maxSuspensionForce=f.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=f.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new r,this.worldTransform=new i,this.isInContact=!1}var s=new t,n=new t,s=new t;u.prototype.updateWheel=function(f){var h=this.raycastResult;if(this.isInContact){var c=h.hitNormalWorld.dot(h.directionWorld);h.hitPointWorld.vsub(f.position,n),f.getVelocityAtWorldPoint(n,s);var v=h.hitNormalWorld.dot(s);if(c>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{var p=-1/c;this.suspensionRelativeVelocity=v*p,this.clippedInvContactDotSuspension=p}}else h.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,h.directionWorld.scale(-1,h.hitNormalWorld),this.clippedInvContactDotSuspension=1}},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(e,o,d){o.exports=l;var t=e("./Shape"),i=e("../math/Vec3"),r=e("./ConvexPolyhedron");function l(n){t.call(this),this.type=t.types.BOX,this.halfExtents=n,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}l.prototype=new t,l.prototype.constructor=l,l.prototype.updateConvexPolyhedronRepresentation=function(){var n=this.halfExtents.x,f=this.halfExtents.y,h=this.halfExtents.z,c=i,v=[new c(-n,-f,-h),new c(n,-f,-h),new c(n,f,-h),new c(-n,f,-h),new c(-n,-f,h),new c(n,-f,h),new c(n,f,h),new c(-n,f,h)],p=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]];new c(0,0,1),new c(0,1,0),new c(1,0,0);var m=new r(v,p);this.convexPolyhedronRepresentation=m,m.material=this.material},l.prototype.calculateLocalInertia=function(n,f){return f=f||new i,l.calculateInertia(this.halfExtents,n,f),f},l.calculateInertia=function(n,f,h){var c=n;h.x=1/12*f*(2*c.y*2*c.y+2*c.z*2*c.z),h.y=1/12*f*(2*c.x*2*c.x+2*c.z*2*c.z),h.z=1/12*f*(2*c.y*2*c.y+2*c.x*2*c.x)},l.prototype.getSideNormals=function(n,f){var h=n,c=this.halfExtents;if(h[0].set(c.x,0,0),h[1].set(0,c.y,0),h[2].set(0,0,c.z),h[3].set(-c.x,0,0),h[4].set(0,-c.y,0),h[5].set(0,0,-c.z),f!==void 0)for(var v=0;v!==h.length;v++)f.vmult(h[v],h[v]);return h},l.prototype.volume=function(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z},l.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.halfExtents.norm()};var u=new i;new i,l.prototype.forEachWorldCorner=function(n,f,h){for(var c=this.halfExtents,v=[[c.x,c.y,c.z],[-c.x,c.y,c.z],[-c.x,-c.y,c.z],[-c.x,-c.y,-c.z],[c.x,-c.y,-c.z],[c.x,c.y,-c.z],[-c.x,c.y,-c.z],[c.x,-c.y,c.z]],p=0;p<v.length;p++)u.set(v[p][0],v[p][1],v[p][2]),f.vmult(u,u),n.vadd(u,u),h(u.x,u.y,u.z)};var s=[new i,new i,new i,new i,new i,new i,new i,new i];l.prototype.calculateWorldAABB=function(n,f,h,c){var v=this.halfExtents;s[0].set(v.x,v.y,v.z),s[1].set(-v.x,v.y,v.z),s[2].set(-v.x,-v.y,v.z),s[3].set(-v.x,-v.y,-v.z),s[4].set(v.x,-v.y,-v.z),s[5].set(v.x,v.y,-v.z),s[6].set(-v.x,v.y,-v.z),s[7].set(v.x,-v.y,v.z);var p=s[0];f.vmult(p,p),n.vadd(p,p),c.copy(p),h.copy(p);for(var m=1;m<8;m++){var p=s[m];f.vmult(p,p),n.vadd(p,p);var g=p.x,S=p.y,y=p.z;g>c.x&&(c.x=g),S>c.y&&(c.y=S),y>c.z&&(c.z=y),g<h.x&&(h.x=g),S<h.y&&(h.y=S),y<h.z&&(h.z=y)}}},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(e,o,d){o.exports=l;var t=e("./Shape"),i=e("../math/Vec3");e("../math/Quaternion");var r=e("../math/Transform");function l(C,O,E){t.call(this),this.type=t.types.CONVEXPOLYHEDRON,this.vertices=C||[],this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.faces=O||[],this.faceNormals=[],this.computeNormals(),this.worldFaceNormalsNeedsUpdate=!0,this.worldFaceNormals=[],this.uniqueEdges=[],this.uniqueAxes=E?E.slice():null,this.computeEdges(),this.updateBoundingSphereRadius()}l.prototype=new t,l.prototype.constructor=l;var u=new i;l.prototype.computeEdges=function(){var C=this.faces,O=this.vertices;O.length;var E=this.uniqueEdges;E.length=0;for(var T=u,x=0;x!==C.length;x++)for(var A=C[x],k=A.length,z=0;z!==k;z++){var b=(z+1)%k;O[A[z]].vsub(O[A[b]],T),T.normalize();for(var W=!1,K=0;K!==E.length;K++)if(E[K].almostEquals(T)||E[K].almostEquals(T)){W=!0;break}W||E.push(T.clone())}},l.prototype.computeNormals=function(){this.faceNormals.length=this.faces.length;for(var C=0;C<this.faces.length;C++){for(var O=0;O<this.faces[C].length;O++)if(!this.vertices[this.faces[C][O]])throw new Error("Vertex "+this.faces[C][O]+" not found!");var E=this.faceNormals[C]||new i;this.getFaceNormal(C,E),E.negate(E),this.faceNormals[C]=E;var T=this.vertices[this.faces[C][0]];if(E.dot(T)<0){console.error(".faceNormals["+C+"] = Vec3("+E.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");for(var O=0;O<this.faces[C].length;O++)console.warn(".vertices["+this.faces[C][O]+"] = Vec3("+this.vertices[this.faces[C][O]].toString()+")")}}};var s=new i,n=new i;l.computeNormal=function(C,O,E,T){O.vsub(C,n),E.vsub(O,s),s.cross(n,T),T.isZero()||T.normalize()},l.prototype.getFaceNormal=function(C,O){var E=this.faces[C],T=this.vertices[E[0]],x=this.vertices[E[1]],A=this.vertices[E[2]];return l.computeNormal(T,x,A,O)};var f=new i;l.prototype.clipAgainstHull=function(C,O,E,T,x,A,k,z,b){for(var W=f,K=-1,me=-Number.MAX_VALUE,de=0;de<E.faces.length;de++){W.copy(E.faceNormals[de]),x.vmult(W,W);var ue=W.dot(A);ue>me&&(me=ue,K=de)}for(var H=[],J=E.faces[K],Ne=J.length,Ee=0;Ee<Ne;Ee++){var We=E.vertices[J[Ee]],Te=new i;Te.copy(We),x.vmult(Te,Te),T.vadd(Te,Te),H.push(Te)}K>=0&&this.clipFaceAgainstHull(A,C,O,H,k,z,b)};var h=new i,c=new i,v=new i,p=new i,m=new i,g=new i;l.prototype.findSeparatingAxis=function(C,O,E,T,x,A,k,z){var b=h,W=c,K=v,me=p,de=m,ue=g,H=Number.MAX_VALUE,J=this;if(J.uniqueAxes)for(var Ee=0;Ee!==J.uniqueAxes.length;Ee++){E.vmult(J.uniqueAxes[Ee],b);var Te=J.testSepAxis(b,C,O,E,T,x);if(Te===!1)return!1;Te<H&&(H=Te,A.copy(b))}else for(var Ne=k?k.length:J.faces.length,Ee=0;Ee<Ne;Ee++){var We=k?k[Ee]:Ee;b.copy(J.faceNormals[We]),E.vmult(b,b);var Te=J.testSepAxis(b,C,O,E,T,x);if(Te===!1)return!1;Te<H&&(H=Te,A.copy(b))}if(C.uniqueAxes)for(var Ee=0;Ee!==C.uniqueAxes.length;Ee++){x.vmult(C.uniqueAxes[Ee],W);var Te=J.testSepAxis(W,C,O,E,T,x);if(Te===!1)return!1;Te<H&&(H=Te,A.copy(W))}else for(var Le=z?z.length:C.faces.length,Ee=0;Ee<Le;Ee++){var We=z?z[Ee]:Ee;W.copy(C.faceNormals[We]),x.vmult(W,W);var Te=J.testSepAxis(W,C,O,E,T,x);if(Te===!1)return!1;Te<H&&(H=Te,A.copy(W))}for(var Fe=0;Fe!==J.uniqueEdges.length;Fe++){E.vmult(J.uniqueEdges[Fe],me);for(var De=0;De!==C.uniqueEdges.length;De++)if(x.vmult(C.uniqueEdges[De],de),me.cross(de,ue),!ue.almostZero()){ue.normalize();var ke=J.testSepAxis(ue,C,O,E,T,x);if(ke===!1)return!1;ke<H&&(H=ke,A.copy(ue))}}return T.vsub(O,K),K.dot(A)>0&&A.negate(A),!0};var S=[],y=[];l.prototype.testSepAxis=function(C,O,E,T,x,A){var k=this;l.project(k,C,E,T,S),l.project(O,C,x,A,y);var z=S[0],b=S[1],W=y[0],K=y[1];if(z<K||W<b)return!1;var me=z-K,de=W-b,ue=me<de?me:de;return ue};var w=new i,X=new i;l.prototype.calculateLocalInertia=function(C,O){this.computeLocalAABB(w,X);var E=X.x-w.x,T=X.y-w.y,x=X.z-w.z;O.x=1/12*C*(2*T*2*T+2*x*2*x),O.y=1/12*C*(2*E*2*E+2*x*2*x),O.z=1/12*C*(2*T*2*T+2*E*2*E)},l.prototype.getPlaneConstantOfFace=function(C){var O=this.faces[C],E=this.faceNormals[C],T=this.vertices[O[0]],x=-E.dot(T);return x};var he=new i,V=new i,q=new i,N=new i,_=new i,L=new i,j=new i,re=new i;l.prototype.clipFaceAgainstHull=function(C,O,E,T,x,A,k){for(var z=he,b=V,W=q,K=N,me=_,de=L,ue=j,H=re,J=this,Ne=[],Ee=T,We=Ne,Te=-1,Le=Number.MAX_VALUE,Fe=0;Fe<J.faces.length;Fe++){z.copy(J.faceNormals[Fe]),E.vmult(z,z);var De=z.dot(C);De<Le&&(Le=De,Te=Fe)}if(!(Te<0)){var ke=J.faces[Te];ke.connectedFaces=[];for(var Be=0;Be<J.faces.length;Be++)for(var Ye=0;Ye<J.faces[Be].length;Ye++)ke.indexOf(J.faces[Be][Ye])!==-1&&Be!==Te&&ke.connectedFaces.indexOf(Be)===-1&&ke.connectedFaces.push(Be);Ee.length;for(var et=ke.length,Me=0;Me<et;Me++){var it=J.vertices[ke[Me]],Ct=J.vertices[ke[(Me+1)%et]];it.vsub(Ct,b),W.copy(b),E.vmult(W,W),O.vadd(W,W),K.copy(this.faceNormals[Te]),E.vmult(K,K),O.vadd(K,K),W.cross(K,me),me.negate(me),de.copy(it),E.vmult(de,de),O.vadd(de,de),-de.dot(me);var St;{var Rt=ke.connectedFaces[Me];ue.copy(this.faceNormals[Rt]);var _t=this.getPlaneConstantOfFace(Rt);H.copy(ue),E.vmult(H,H);var St=_t-H.dot(O)}for(this.clipFaceAgainstPlane(Ee,We,H,St);Ee.length;)Ee.shift();for(;We.length;)Ee.push(We.shift())}ue.copy(this.faceNormals[Te]);var _t=this.getPlaneConstantOfFace(Te);H.copy(ue),E.vmult(H,H);for(var St=_t-H.dot(O),Be=0;Be<Ee.length;Be++){var pt=H.dot(Ee[Be])+St;if(pt<=x&&(console.log("clamped: depth="+pt+" to minDist="+(x+"")),pt=x),pt<=A){var Mt=Ee[Be];if(pt<=0){var Lt={point:Mt,normal:H,depth:pt};k.push(Lt)}}}}},l.prototype.clipFaceAgainstPlane=function(C,O,E,T){var x,A,k=C.length;if(k<2)return O;var z=C[C.length-1],b=C[0];x=E.dot(z)+T;for(var W=0;W<k;W++){if(b=C[W],A=E.dot(b)+T,x<0)if(A<0){var K=new i;K.copy(b),O.push(K)}else{var K=new i;z.lerp(b,x/(x-A),K),O.push(K)}else if(A<0){var K=new i;z.lerp(b,x/(x-A),K),O.push(K),O.push(b)}z=b,x=A}return O},l.prototype.computeWorldVertices=function(C,O){for(var E=this.vertices.length;this.worldVertices.length<E;)this.worldVertices.push(new i);for(var T=this.vertices,x=this.worldVertices,A=0;A!==E;A++)O.vmult(T[A],x[A]),C.vadd(x[A],x[A]);this.worldVerticesNeedsUpdate=!1},new i,l.prototype.computeLocalAABB=function(C,O){var E=this.vertices.length,T=this.vertices;C.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),O.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(var x=0;x<E;x++){var A=T[x];A.x<C.x?C.x=A.x:A.x>O.x&&(O.x=A.x),A.y<C.y?C.y=A.y:A.y>O.y&&(O.y=A.y),A.z<C.z?C.z=A.z:A.z>O.z&&(O.z=A.z)}},l.prototype.computeWorldFaceNormals=function(C){for(var O=this.faceNormals.length;this.worldFaceNormals.length<O;)this.worldFaceNormals.push(new i);for(var E=this.faceNormals,T=this.worldFaceNormals,x=0;x!==O;x++)C.vmult(E[x],T[x]);this.worldFaceNormalsNeedsUpdate=!1},l.prototype.updateBoundingSphereRadius=function(){for(var C=0,O=this.vertices,E=0,T=O.length;E!==T;E++){var x=O[E].norm2();x>C&&(C=x)}this.boundingSphereRadius=Math.sqrt(C)};var te=new i;l.prototype.calculateWorldAABB=function(C,O,E,T){for(var x=this.vertices.length,A=this.vertices,k,z,b,W,K,me,de=0;de<x;de++){te.copy(A[de]),O.vmult(te,te),C.vadd(te,te);var ue=te;ue.x<k||k===void 0?k=ue.x:(ue.x>W||W===void 0)&&(W=ue.x),ue.y<z||z===void 0?z=ue.y:(ue.y>K||K===void 0)&&(K=ue.y),ue.z<b||b===void 0?b=ue.z:(ue.z>me||me===void 0)&&(me=ue.z)}E.set(k,z,b),T.set(W,K,me)},l.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},l.prototype.getAveragePointLocal=function(C){C=C||new i;for(var O=this.vertices.length,E=this.vertices,T=0;T<O;T++)C.vadd(E[T],C);return C.mult(1/O,C),C},l.prototype.transformAllPoints=function(C,O){var E=this.vertices.length,T=this.vertices;if(O){for(var x=0;x<E;x++){var A=T[x];O.vmult(A,A)}for(var x=0;x<this.faceNormals.length;x++){var A=this.faceNormals[x];O.vmult(A,A)}}if(C)for(var x=0;x<E;x++){var A=T[x];A.vadd(C,A)}};var ye=new i,B=new i,F=new i;l.prototype.pointIsInside=function(C){var O=this.vertices.length,E=this.vertices,T=this.faces,x=this.faceNormals,A=null,k=this.faces.length,z=ye;this.getAveragePointLocal(z);for(var b=0;b<k;b++){this.faces[b].length;var O=x[b],W=E[T[b][0]],K=B;C.vsub(W,K);var me=O.dot(K),de=F;z.vsub(W,de);var ue=O.dot(de);if(me<0&&ue>0||me>0&&ue<0)return!1}return A?1:-1},new i;var Q=new i,G=new i;l.project=function(C,O,E,T,x){var A=C.vertices.length,k=Q,z=0,b=0,W=G,K=C.vertices;W.setZero(),r.vectorToLocalFrame(E,T,O,k),r.pointToLocalFrame(E,T,W,W);var me=W.dot(k);b=z=K[0].dot(k);for(var de=1;de<A;de++){var ue=K[de].dot(k);ue>z&&(z=ue),ue<b&&(b=ue)}if(b-=me,z-=me,b>z){var H=b;b=z,z=H}x[0]=z,x[1]=b}},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(e,o,d){o.exports=l;var t=e("./Shape"),i=e("../math/Vec3");e("../math/Quaternion");var r=e("./ConvexPolyhedron");function l(u,s,n,f){var h=f,c=[],v=[],p=[],m=[],g=[],S=Math.cos,y=Math.sin;c.push(new i(s*S(0),s*y(0),-n*.5)),m.push(0),c.push(new i(u*S(0),u*y(0),n*.5)),g.push(1);for(var w=0;w<h;w++){var X=2*Math.PI/h*(w+1),he=2*Math.PI/h*(w+.5);w<h-1?(c.push(new i(s*S(X),s*y(X),-n*.5)),m.push(2*w+2),c.push(new i(u*S(X),u*y(X),n*.5)),g.push(2*w+3),p.push([2*w+2,2*w+3,2*w+1,2*w])):p.push([0,1,2*w+1,2*w]),(h%2==1||w<h/2)&&v.push(new i(S(he),y(he),0))}p.push(g),v.push(new i(0,0,1));for(var V=[],w=0;w<m.length;w++)V.push(m[m.length-w-1]);p.push(V),this.type=t.types.CONVEXPOLYHEDRON,r.call(this,c,p,v)}l.prototype=new r},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(e,o,d){var t=e("./Shape"),i=e("./ConvexPolyhedron"),r=e("../math/Vec3"),l=e("../utils/Utils");o.exports=u;function u(s,n){n=l.defaults(n,{maxValue:null,minValue:null,elementSize:1}),this.data=s,this.maxValue=n.maxValue,this.minValue=n.minValue,this.elementSize=n.elementSize,n.minValue===null&&this.updateMinValue(),n.maxValue===null&&this.updateMaxValue(),this.cacheEnabled=!0,t.call(this),this.pillarConvex=new i,this.pillarOffset=new r,this.type=t.types.HEIGHTFIELD,this.updateBoundingSphereRadius(),this._cachedPillars={}}u.prototype=new t,u.prototype.update=function(){this._cachedPillars={}},u.prototype.updateMinValue=function(){for(var s=this.data,n=s[0][0],f=0;f!==s.length;f++)for(var h=0;h!==s[f].length;h++){var c=s[f][h];c<n&&(n=c)}this.minValue=n},u.prototype.updateMaxValue=function(){for(var s=this.data,n=s[0][0],f=0;f!==s.length;f++)for(var h=0;h!==s[f].length;h++){var c=s[f][h];c>n&&(n=c)}this.maxValue=n},u.prototype.setHeightValueAtIndex=function(s,n,f){var h=this.data;h[s][n]=f,this.clearCachedConvexTrianglePillar(s,n,!1),s>0&&(this.clearCachedConvexTrianglePillar(s-1,n,!0),this.clearCachedConvexTrianglePillar(s-1,n,!1)),n>0&&(this.clearCachedConvexTrianglePillar(s,n-1,!0),this.clearCachedConvexTrianglePillar(s,n-1,!1)),n>0&&s>0&&this.clearCachedConvexTrianglePillar(s-1,n-1,!0)},u.prototype.getRectMinMax=function(s,n,f,h,c){c=c||[];for(var v=this.data,p=this.minValue,m=s;m<=f;m++)for(var g=n;g<=h;g++){var S=v[m][g];S>p&&(p=S)}c[0]=this.minValue,c[1]=p},u.prototype.getIndexOfPosition=function(s,n,f,h){var c=this.elementSize,v=this.data,p=Math.floor(s/c),m=Math.floor(n/c);return f[0]=p,f[1]=m,h&&(p<0&&(p=0),m<0&&(m=0),p>=v.length-1&&(p=v.length-1),m>=v[0].length-1&&(m=v[0].length-1)),!(p<0||m<0||p>=v.length-1||m>=v[0].length-1)},u.prototype.getHeightAt=function(s,n,f){var h=[];this.getIndexOfPosition(s,n,h,f);var c=[];return this.getRectMinMax(h[0],h[1]+1,h[0],h[1]+1,c),(c[0]+c[1])/2},u.prototype.getCacheConvexTrianglePillarKey=function(s,n,f){return s+"_"+n+"_"+(f?1:0)},u.prototype.getCachedConvexTrianglePillar=function(s,n,f){return this._cachedPillars[this.getCacheConvexTrianglePillarKey(s,n,f)]},u.prototype.setCachedConvexTrianglePillar=function(s,n,f,h,c){this._cachedPillars[this.getCacheConvexTrianglePillarKey(s,n,f)]={convex:h,offset:c}},u.prototype.clearCachedConvexTrianglePillar=function(s,n,f){delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(s,n,f)]},u.prototype.getConvexTrianglePillar=function(s,n,f){var h=this.pillarConvex,c=this.pillarOffset;if(this.cacheEnabled){var v=this.getCachedConvexTrianglePillar(s,n,f);if(v){this.pillarConvex=v.convex,this.pillarOffset=v.offset;return}h=new i,c=new r,this.pillarConvex=h,this.pillarOffset=c}var v=this.data,p=this.elementSize,m=h.faces;h.vertices.length=6;for(var g=0;g<6;g++)h.vertices[g]||(h.vertices[g]=new r);m.length=5;for(var g=0;g<5;g++)m[g]||(m[g]=[]);var S=h.vertices,y=(Math.min(v[s][n],v[s+1][n],v[s][n+1],v[s+1][n+1])-this.minValue)/2+this.minValue;f?(c.set((s+.75)*p,(n+.75)*p,y),S[0].set(.25*p,.25*p,v[s+1][n+1]-y),S[1].set(-.75*p,.25*p,v[s][n+1]-y),S[2].set(.25*p,-.75*p,v[s+1][n]-y),S[3].set(.25*p,.25*p,-y-1),S[4].set(-.75*p,.25*p,-y-1),S[5].set(.25*p,-.75*p,-y-1),m[0][0]=0,m[0][1]=1,m[0][2]=2,m[1][0]=5,m[1][1]=4,m[1][2]=3,m[2][0]=2,m[2][1]=5,m[2][2]=3,m[2][3]=0,m[3][0]=3,m[3][1]=4,m[3][2]=1,m[3][3]=0,m[4][0]=1,m[4][1]=4,m[4][2]=5,m[4][3]=2):(c.set((s+.25)*p,(n+.25)*p,y),S[0].set(-.25*p,-.25*p,v[s][n]-y),S[1].set(.75*p,-.25*p,v[s+1][n]-y),S[2].set(-.25*p,.75*p,v[s][n+1]-y),S[3].set(-.25*p,-.25*p,-y-1),S[4].set(.75*p,-.25*p,-y-1),S[5].set(-.25*p,.75*p,-y-1),m[0][0]=0,m[0][1]=1,m[0][2]=2,m[1][0]=5,m[1][1]=4,m[1][2]=3,m[2][0]=0,m[2][1]=2,m[2][2]=5,m[2][3]=3,m[3][0]=1,m[3][1]=0,m[3][2]=3,m[3][3]=4,m[4][0]=4,m[4][1]=5,m[4][2]=2,m[4][3]=1),h.computeNormals(),h.computeEdges(),h.updateBoundingSphereRadius(),this.setCachedConvexTrianglePillar(s,n,f,h,c)},u.prototype.calculateLocalInertia=function(s,n){return n=n||new r,n.set(0,0,0),n},u.prototype.volume=function(){return Number.MAX_VALUE},u.prototype.calculateWorldAABB=function(s,n,f,h){f.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),h.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)},u.prototype.updateBoundingSphereRadius=function(){var s=this.data,n=this.elementSize;this.boundingSphereRadius=new r(s.length*n,s[0].length*n,Math.max(Math.abs(this.maxValue),Math.abs(this.minValue))).norm()}},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(e,o,d){o.exports=r;var t=e("./Shape"),i=e("../math/Vec3");function r(){t.call(this),this.type=t.types.PARTICLE}r.prototype=new t,r.prototype.constructor=r,r.prototype.calculateLocalInertia=function(l,u){return u=u||new i,u.set(0,0,0),u},r.prototype.volume=function(){return 0},r.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=0},r.prototype.calculateWorldAABB=function(l,u,s,n){s.copy(l),n.copy(l)}},{"../math/Vec3":30,"./Shape":43}],42:[function(e,o,d){o.exports=r;var t=e("./Shape"),i=e("../math/Vec3");function r(){t.call(this),this.type=t.types.PLANE,this.worldNormal=new i,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}r.prototype=new t,r.prototype.constructor=r,r.prototype.computeWorldNormal=function(u){var s=this.worldNormal;s.set(0,0,1),u.vmult(s,s),this.worldNormalNeedsUpdate=!1},r.prototype.calculateLocalInertia=function(u,s){return s=s||new i,s},r.prototype.volume=function(){return Number.MAX_VALUE};var l=new i;r.prototype.calculateWorldAABB=function(u,s,n,f){l.set(0,0,1),s.vmult(l,l);var h=Number.MAX_VALUE;n.set(-h,-h,-h),f.set(h,h,h),l.x===1&&(f.x=u.x),l.y===1&&(f.y=u.y),l.z===1&&(f.z=u.z),l.x===-1&&(n.x=u.x),l.y===-1&&(n.y=u.y),l.z===-1&&(n.z=u.z)},r.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=Number.MAX_VALUE}},{"../math/Vec3":30,"./Shape":43}],43:[function(e,o,d){o.exports=t;var t=e("./Shape");e("../math/Vec3"),e("../math/Quaternion"),e("../material/Material");function t(){this.id=t.idCounter++,this.type=0,this.boundingSphereRadius=0,this.collisionResponse=!0,this.material=null}t.prototype.constructor=t,t.prototype.updateBoundingSphereRadius=function(){throw"computeBoundingSphereRadius() not implemented for shape type "+this.type},t.prototype.volume=function(){throw"volume() not implemented for shape type "+this.type},t.prototype.calculateLocalInertia=function(i,r){throw"calculateLocalInertia() not implemented for shape type "+this.type},t.idCounter=0,t.types={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(e,o,d){o.exports=r;var t=e("./Shape"),i=e("../math/Vec3");function r(l){if(t.call(this),this.radius=l!==void 0?Number(l):1,this.type=t.types.SPHERE,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}r.prototype=new t,r.prototype.constructor=r,r.prototype.calculateLocalInertia=function(l,u){u=u||new i;var s=2*l*this.radius*this.radius/5;return u.x=s,u.y=s,u.z=s,u},r.prototype.volume=function(){return 4*Math.PI*this.radius/3},r.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.radius},r.prototype.calculateWorldAABB=function(l,u,s,n){for(var f=this.radius,h=["x","y","z"],c=0;c<h.length;c++){var v=h[c];s[v]=l[v]-f,n[v]=l[v]+f}}},{"../math/Vec3":30,"./Shape":43}],45:[function(e,o,d){o.exports=s;var t=e("./Shape"),i=e("../math/Vec3");e("../math/Quaternion");var r=e("../math/Transform"),l=e("../collision/AABB"),u=e("../utils/Octree");function s(V,q){t.call(this),this.type=t.types.TRIMESH,this.vertices=new Float32Array(V),this.indices=new Int16Array(q),this.normals=new Float32Array(q.length),this.aabb=new l,this.edges=null,this.scale=new i(1,1,1),this.tree=new u,this.updateEdges(),this.updateNormals(),this.updateAABB(),this.updateBoundingSphereRadius(),this.updateTree()}s.prototype=new t,s.prototype.constructor=s;var n=new i;s.prototype.updateTree=function(){var V=this.tree;V.reset(),V.aabb.copy(this.aabb);var q=this.scale;V.aabb.lowerBound.x*=1/q.x,V.aabb.lowerBound.y*=1/q.y,V.aabb.lowerBound.z*=1/q.z,V.aabb.upperBound.x*=1/q.x,V.aabb.upperBound.y*=1/q.y,V.aabb.upperBound.z*=1/q.z;for(var N=new l,_=new i,L=new i,j=new i,re=[_,L,j],te=0;te<this.indices.length/3;te++){var ye=te*3;this._getUnscaledVertex(this.indices[ye],_),this._getUnscaledVertex(this.indices[ye+1],L),this._getUnscaledVertex(this.indices[ye+2],j),N.setFromPoints(re),V.insert(N,te)}V.removeEmptyNodes()};var f=new l;s.prototype.getTrianglesInAABB=function(V,q){f.copy(V);var N=this.scale,_=N.x,L=N.y,j=N.z,re=f.lowerBound,te=f.upperBound;return re.x/=_,re.y/=L,re.z/=j,te.x/=_,te.y/=L,te.z/=j,this.tree.aabbQuery(f,q)},s.prototype.setScale=function(V){var q=this.scale.x===this.scale.y===this.scale.z,N=V.x===V.y===V.z;q&&N||this.updateNormals(),this.scale.copy(V),this.updateAABB(),this.updateBoundingSphereRadius()},s.prototype.updateNormals=function(){for(var V=n,q=this.normals,N=0;N<this.indices.length/3;N++){var _=N*3,L=this.indices[_],j=this.indices[_+1],re=this.indices[_+2];this.getVertex(L,m),this.getVertex(j,g),this.getVertex(re,S),s.computeNormal(g,m,S,V),q[_]=V.x,q[_+1]=V.y,q[_+2]=V.z}},s.prototype.updateEdges=function(){for(var V={},q=function(ye,B){var F=L<j?L+"_"+j:j+"_"+L;V[F]=!0},N=0;N<this.indices.length/3;N++){var _=N*3,L=this.indices[_],j=this.indices[_+1];this.indices[_+2],q(),q(),q()}var re=Object.keys(V);this.edges=new Int16Array(re.length*2);for(var N=0;N<re.length;N++){var te=re[N].split("_");this.edges[2*N]=parseInt(te[0],10),this.edges[2*N+1]=parseInt(te[1],10)}},s.prototype.getEdgeVertex=function(V,q,N){var _=this.edges[V*2+(q?1:0)];this.getVertex(_,N)};var h=new i,c=new i;s.prototype.getEdgeVector=function(V,q){var N=h,_=c;this.getEdgeVertex(V,0,N),this.getEdgeVertex(V,1,_),_.vsub(N,q)};var v=new i,p=new i;s.computeNormal=function(V,q,N,_){q.vsub(V,p),N.vsub(q,v),v.cross(p,_),_.isZero()||_.normalize()};var m=new i,g=new i,S=new i;s.prototype.getVertex=function(V,q){var N=this.scale;return this._getUnscaledVertex(V,q),q.x*=N.x,q.y*=N.y,q.z*=N.z,q},s.prototype._getUnscaledVertex=function(V,q){var N=V*3,_=this.vertices;return q.set(_[N],_[N+1],_[N+2])},s.prototype.getWorldVertex=function(V,q,N,_){return this.getVertex(V,_),r.pointToWorldFrame(q,N,_,_),_},s.prototype.getTriangleVertices=function(V,q,N,_){var L=V*3;this.getVertex(this.indices[L],q),this.getVertex(this.indices[L+1],N),this.getVertex(this.indices[L+2],_)},s.prototype.getNormal=function(V,q){var N=V*3;return q.set(this.normals[N],this.normals[N+1],this.normals[N+2])};var y=new l;s.prototype.calculateLocalInertia=function(V,q){this.computeLocalAABB(y);var N=y.upperBound.x-y.lowerBound.x,_=y.upperBound.y-y.lowerBound.y,L=y.upperBound.z-y.lowerBound.z;return q.set(1/12*V*(2*_*2*_+2*L*2*L),1/12*V*(2*N*2*N+2*L*2*L),1/12*V*(2*_*2*_+2*N*2*N))};var w=new i;s.prototype.computeLocalAABB=function(V){var q=V.lowerBound,N=V.upperBound,_=this.vertices.length;this.vertices;var L=w;this.getVertex(0,L),q.copy(L),N.copy(L);for(var j=0;j!==_;j++)this.getVertex(j,L),L.x<q.x?q.x=L.x:L.x>N.x&&(N.x=L.x),L.y<q.y?q.y=L.y:L.y>N.y&&(N.y=L.y),L.z<q.z?q.z=L.z:L.z>N.z&&(N.z=L.z)},s.prototype.updateAABB=function(){this.computeLocalAABB(this.aabb)},s.prototype.updateBoundingSphereRadius=function(){for(var V=0,q=this.vertices,N=new i,_=0,L=q.length/3;_!==L;_++){this.getVertex(_,N);var j=N.norm2();j>V&&(V=j)}this.boundingSphereRadius=Math.sqrt(V)},new i;var X=new r,he=new l;s.prototype.calculateWorldAABB=function(V,q,N,_){var L=X,j=he;L.position=V,L.quaternion=q,this.aabb.toWorldFrame(L,j),N.copy(j.lowerBound),_.copy(j.upperBound)},s.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},s.createTorus=function(V,q,N,_,L){V=V||1,q=q||.5,N=N||8,_=_||6,L=L||Math.PI*2;for(var j=[],re=[],te=0;te<=N;te++)for(var ye=0;ye<=_;ye++){var B=ye/_*L,F=te/N*Math.PI*2,Q=(V+q*Math.cos(F))*Math.cos(B),G=(V+q*Math.cos(F))*Math.sin(B),C=q*Math.sin(F);j.push(Q,G,C)}for(var te=1;te<=N;te++)for(var ye=1;ye<=_;ye++){var O=(_+1)*te+ye-1,E=(_+1)*(te-1)+ye-1,T=(_+1)*(te-1)+ye,x=(_+1)*te+ye;re.push(O,E,x),re.push(E,T,x)}return new s(j,re)}},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(e,o,d){o.exports=i,e("../math/Vec3"),e("../math/Quaternion");var t=e("./Solver");function i(){t.call(this),this.iterations=10,this.tolerance=1e-7}i.prototype=new t;var r=[],l=[],u=[];i.prototype.solve=function(s,n){var f=0,h=this.iterations,c=this.tolerance*this.tolerance,v=this.equations,p=v.length,m=n.bodies,g=m.length,S=s,y,w,X,he,V,q;if(p!==0)for(var N=0;N!==g;N++)m[N].updateSolveMassProperties();var _=l,L=u,j=r;_.length=p,L.length=p,j.length=p;for(var N=0;N!==p;N++){var re=v[N];j[N]=0,L[N]=re.computeB(S),_[N]=1/re.computeC()}if(p!==0){for(var N=0;N!==g;N++){var te=m[N],ye=te.vlambda,B=te.wlambda;ye.set(0,0,0),B&&B.set(0,0,0)}for(f=0;f!==h;f++){he=0;for(var F=0;F!==p;F++){var re=v[F];y=L[F],w=_[F],q=j[F],V=re.computeGWlambda(),X=w*(y-V-re.eps*q),q+X<re.minForce?X=re.minForce-q:q+X>re.maxForce&&(X=re.maxForce-q),j[F]+=X,he+=X>0?X:-X,re.addToWlambda(X)}if(he*he<c)break}for(var N=0;N!==g;N++){var te=m[N],Q=te.velocity,G=te.angularVelocity;Q.vadd(te.vlambda,Q),G&&G.vadd(te.wlambda,G)}}return f}},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(e,o,d){o.exports=t;function t(){this.equations=[]}t.prototype.solve=function(i,r){return 0},t.prototype.addEquation=function(i){i.enabled&&this.equations.push(i)},t.prototype.removeEquation=function(i){var r=this.equations,l=r.indexOf(i);l!==-1&&r.splice(l,1)},t.prototype.removeAllEquations=function(){this.equations.length=0}},{}],48:[function(e,o,d){o.exports=r,e("../math/Vec3"),e("../math/Quaternion");var t=e("./Solver"),i=e("../objects/Body");function r(m){for(t.call(this),this.iterations=10,this.tolerance=1e-7,this.subsolver=m,this.nodes=[],this.nodePool=[];this.nodePool.length<128;)this.nodePool.push(this.createNode())}r.prototype=new t;var l=[],u=[],s={bodies:[]},n=i.STATIC;function f(m){for(var g=m.length,S=0;S!==g;S++){var y=m[S];if(!y.visited&&!(y.body.type&n))return y}return!1}var h=[];function c(m,g,S,y){for(h.push(m),m.visited=!0,g(m,S,y);h.length;)for(var w=h.pop(),X;X=f(w.children);)X.visited=!0,g(X,S,y),h.push(X)}function v(m,g,S){g.push(m.body);for(var y=m.eqs.length,w=0;w!==y;w++){var X=m.eqs[w];S.indexOf(X)===-1&&S.push(X)}}r.prototype.createNode=function(){return{body:null,children:[],eqs:[],visited:!1}},r.prototype.solve=function(m,g){for(var S=l,y=this.nodePool,w=g.bodies,X=this.equations,he=X.length,V=w.length,q=this.subsolver;y.length<V;)y.push(this.createNode());S.length=V;for(var N=0;N<V;N++)S[N]=y[N];for(var N=0;N!==V;N++){var _=S[N];_.body=w[N],_.children.length=0,_.eqs.length=0,_.visited=!1}for(var L=0;L!==he;L++){var j=X[L],N=w.indexOf(j.bi),re=w.indexOf(j.bj),te=S[N],ye=S[re];te.children.push(ye),te.eqs.push(j),ye.children.push(te),ye.eqs.push(j)}var B,F=0,Q=u;q.tolerance=this.tolerance,q.iterations=this.iterations;for(var G=s;B=f(S);){Q.length=0,G.bodies.length=0,c(B,v,G.bodies,Q);var C=Q.length;Q=Q.sort(p);for(var N=0;N!==C;N++)q.addEquation(Q[N]);q.solve(m,G),q.removeAllEquations(),F++}return F};function p(m,g){return g.id-m.id}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(e,o,d){var t=function(){};o.exports=t,t.prototype={constructor:t,addEventListener:function(i,r){this._listeners===void 0&&(this._listeners={});var l=this._listeners;return l[i]===void 0&&(l[i]=[]),l[i].indexOf(r)===-1&&l[i].push(r),this},hasEventListener:function(i,r){if(this._listeners===void 0)return!1;var l=this._listeners;return l[i]!==void 0&&l[i].indexOf(r)!==-1},removeEventListener:function(i,r){if(this._listeners===void 0)return this;var l=this._listeners;if(l[i]===void 0)return this;var u=l[i].indexOf(r);return u!==-1&&l[i].splice(u,1),this},dispatchEvent:function(i){if(this._listeners===void 0)return this;var r=this._listeners,l=r[i.type];if(l!==void 0){i.target=this;for(var u=0,s=l.length;u<s;u++)l[u].call(this,i)}return this}}},{}],50:[function(e,o,d){var t=e("../collision/AABB"),i=e("../math/Vec3");o.exports=l;function r(n){n=n||{},this.root=n.root||null,this.aabb=n.aabb?n.aabb.clone():new t,this.data=[],this.children=[]}function l(n,f){f=f||{},f.root=null,f.aabb=n,r.call(this,f),this.maxDepth=typeof f.maxDepth!="undefined"?f.maxDepth:8}l.prototype=new r,r.prototype.reset=function(n,f){this.children.length=this.data.length=0},r.prototype.insert=function(n,f,h){var c=this.data;if(h=h||0,!this.aabb.contains(n))return!1;var v=this.children;if(h<(this.maxDepth||this.root.maxDepth)){var p=!1;v.length||(this.subdivide(),p=!0);for(var m=0;m!==8;m++)if(v[m].insert(n,f,h+1))return!0;p&&(v.length=0)}return c.push(f),!0};var u=new i;r.prototype.subdivide=function(){var n=this.aabb,f=n.lowerBound,h=n.upperBound,c=this.children;c.push(new r({aabb:new t({lowerBound:new i(0,0,0)})}),new r({aabb:new t({lowerBound:new i(1,0,0)})}),new r({aabb:new t({lowerBound:new i(1,1,0)})}),new r({aabb:new t({lowerBound:new i(1,1,1)})}),new r({aabb:new t({lowerBound:new i(0,1,1)})}),new r({aabb:new t({lowerBound:new i(0,0,1)})}),new r({aabb:new t({lowerBound:new i(1,0,1)})}),new r({aabb:new t({lowerBound:new i(0,1,0)})})),h.vsub(f,u),u.scale(.5,u);for(var v=this.root||this,p=0;p!==8;p++){var m=c[p];m.root=v;var g=m.aabb.lowerBound;g.x*=u.x,g.y*=u.y,g.z*=u.z,g.vadd(f,g),g.vadd(u,m.aabb.upperBound)}},r.prototype.aabbQuery=function(n,f){this.data,this.children;for(var h=[this];h.length;){var c=h.pop();c.aabb.overlaps(n)&&Array.prototype.push.apply(f,c.data),Array.prototype.push.apply(h,c.children)}return f};var s=new t;r.prototype.rayQuery=function(n,f,h){return n.getAABB(s),s.toLocalFrame(f,s),this.aabbQuery(s,h),h},r.prototype.removeEmptyNodes=function(){for(var n=[this];n.length;){for(var f=n.pop(),h=f.children.length-1;h>=0;h--)f.children[h].data.length||f.children.splice(h,1);Array.prototype.push.apply(n,f.children)}}},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(e,o,d){o.exports=t;function t(){this.objects=[],this.type=Object}t.prototype.release=function(){for(var i=arguments.length,r=0;r!==i;r++)this.objects.push(arguments[r])},t.prototype.get=function(){return this.objects.length===0?this.constructObject():this.objects.pop()},t.prototype.constructObject=function(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}},{}],52:[function(e,o,d){o.exports=t;function t(){this.data={keys:[]}}t.prototype.get=function(i,r){if(i>r){var l=r;r=i,i=l}return this.data[i+"-"+r]},t.prototype.set=function(i,r,l){if(i>r){var u=r;r=i,i=u}var s=i+"-"+r;this.get(i,r)||this.data.keys.push(s),this.data[s]=l},t.prototype.reset=function(){for(var i=this.data,r=i.keys;r.length>0;){var l=r.pop();delete i[l]}}},{}],53:[function(e,o,d){function t(){}o.exports=t,t.defaults=function(i,r){i=i||{};for(var l in r)l in i||(i[l]=r[l]);return i}},{}],54:[function(e,o,d){o.exports=r;var t=e("../math/Vec3"),i=e("./Pool");function r(){i.call(this),this.type=t}r.prototype=new i,r.prototype.constructObject=function(){return new t}},{"../math/Vec3":30,"./Pool":51}],55:[function(e,o,d){o.exports=c;var t=e("../collision/AABB"),i=e("../shapes/Shape"),r=e("../collision/Ray"),l=e("../math/Vec3"),u=e("../math/Transform");e("../shapes/ConvexPolyhedron");var s=e("../math/Quaternion");e("../solver/Solver");var n=e("../utils/Vec3Pool"),f=e("../equations/ContactEquation"),h=e("../equations/FrictionEquation");function c(D){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new n,this.world=D,this.currentContactMaterial=null,this.enableFrictionReduction=!1}c.prototype.createContactEquation=function(D,U,Y,Z,Pe,fe){var ie;this.contactPointPool.length?(ie=this.contactPointPool.pop(),ie.bi=D,ie.bj=U):ie=new f(D,U),ie.enabled=D.collisionResponse&&U.collisionResponse&&Y.collisionResponse&&Z.collisionResponse;var se=this.currentContactMaterial;ie.restitution=se.restitution,ie.setSpookParams(se.contactEquationStiffness,se.contactEquationRelaxation,this.world.dt);var R=Y.material||D.material,ne=Z.material||U.material;return R&&ne&&R.restitution>=0&&ne.restitution>=0&&(ie.restitution=R.restitution*ne.restitution),ie.si=Pe||Y,ie.sj=fe||Z,ie},c.prototype.createFrictionEquationsFromContact=function(D,U){var Y=D.bi,Z=D.bj,Pe=D.si,fe=D.sj,ie=this.world,se=this.currentContactMaterial,R=se.friction,ne=Pe.material||Y.material,le=fe.material||Z.material;if(ne&&le&&ne.friction>=0&&le.friction>=0&&(R=ne.friction*le.friction),R>0){var ve=R*ie.gravity.length(),oe=Y.invMass+Z.invMass;oe>0&&(oe=1/oe);var ee=this.frictionEquationPool,ae=ee.length?ee.pop():new h(Y,Z,ve*oe),xe=ee.length?ee.pop():new h(Y,Z,ve*oe);return ae.bi=xe.bi=Y,ae.bj=xe.bj=Z,ae.minForce=xe.minForce=-ve*oe,ae.maxForce=xe.maxForce=ve*oe,ae.ri.copy(D.ri),ae.rj.copy(D.rj),xe.ri.copy(D.ri),xe.rj.copy(D.rj),D.ni.tangents(ae.t,xe.t),ae.setSpookParams(se.frictionEquationStiffness,se.frictionEquationRelaxation,ie.dt),xe.setSpookParams(se.frictionEquationStiffness,se.frictionEquationRelaxation,ie.dt),ae.enabled=xe.enabled=D.enabled,U.push(ae,xe),!0}return!1};var v=new l,p=new l,m=new l;c.prototype.createFrictionFromAverage=function(D){var U=this.result[this.result.length-1];if(!(!this.createFrictionEquationsFromContact(U,this.frictionResult)||D===1)){var Y=this.frictionResult[this.frictionResult.length-2],Z=this.frictionResult[this.frictionResult.length-1];v.setZero(),p.setZero(),m.setZero();var Pe=U.bi;U.bj;for(var fe=0;fe!==D;fe++)U=this.result[this.result.length-1-fe],U.bodyA!==Pe?(v.vadd(U.ni,v),p.vadd(U.ri,p),m.vadd(U.rj,m)):(v.vsub(U.ni,v),p.vadd(U.rj,p),m.vadd(U.ri,m));var ie=1/D;p.scale(ie,Y.ri),m.scale(ie,Y.rj),Z.ri.copy(Y.ri),Z.rj.copy(Y.rj),v.normalize(),v.tangents(Y.t,Z.t)}};var g=new l,S=new l,y=new s,w=new s;c.prototype.getContacts=function(D,U,Y,Z,Pe,fe,ie){this.contactPointPool=Pe,this.frictionEquationPool=ie,this.result=Z,this.frictionResult=fe;for(var se=y,R=w,ne=g,le=S,ve=0,oe=D.length;ve!==oe;ve++){var ee=D[ve],ae=U[ve],xe=null;ee.material&&ae.material&&(xe=Y.getContactMaterial(ee.material,ae.material)||null);for(var _e=0;_e<ee.shapes.length;_e++){ee.quaternion.mult(ee.shapeOrientations[_e],se),ee.quaternion.vmult(ee.shapeOffsets[_e],ne),ne.vadd(ee.position,ne);for(var $=ee.shapes[_e],we=0;we<ae.shapes.length;we++){ae.quaternion.mult(ae.shapeOrientations[we],R),ae.quaternion.vmult(ae.shapeOffsets[we],le),le.vadd(ae.position,le);var be=ae.shapes[we];if(!(ne.distanceTo(le)>$.boundingSphereRadius+be.boundingSphereRadius)){var Ze=null;$.material&&be.material&&(Ze=Y.getContactMaterial($.material,be.material)||null),this.currentContactMaterial=Ze||xe||Y.defaultContactMaterial;var Re=this[$.type|be.type];Re&&($.type<be.type?Re.call(this,$,be,ne,le,se,R,ee,ae,$,be):Re.call(this,be,$,le,ne,R,se,ae,ee,$,be))}}}}},c.prototype[i.types.BOX|i.types.BOX]=c.prototype.boxBox=function(D,U,Y,Z,Pe,fe,ie,se){D.convexPolyhedronRepresentation.material=D.material,U.convexPolyhedronRepresentation.material=U.material,D.convexPolyhedronRepresentation.collisionResponse=D.collisionResponse,U.convexPolyhedronRepresentation.collisionResponse=U.collisionResponse,this.convexConvex(D.convexPolyhedronRepresentation,U.convexPolyhedronRepresentation,Y,Z,Pe,fe,ie,se,D,U)},c.prototype[i.types.BOX|i.types.CONVEXPOLYHEDRON]=c.prototype.boxConvex=function(D,U,Y,Z,Pe,fe,ie,se){D.convexPolyhedronRepresentation.material=D.material,D.convexPolyhedronRepresentation.collisionResponse=D.collisionResponse,this.convexConvex(D.convexPolyhedronRepresentation,U,Y,Z,Pe,fe,ie,se,D,U)},c.prototype[i.types.BOX|i.types.PARTICLE]=c.prototype.boxParticle=function(D,U,Y,Z,Pe,fe,ie,se){D.convexPolyhedronRepresentation.material=D.material,D.convexPolyhedronRepresentation.collisionResponse=D.collisionResponse,this.convexParticle(D.convexPolyhedronRepresentation,U,Y,Z,Pe,fe,ie,se,D,U)},c.prototype[i.types.SPHERE]=c.prototype.sphereSphere=function(D,U,Y,Z,Pe,fe,ie,se){var R=this.createContactEquation(ie,se,D,U);Z.vsub(Y,R.ni),R.ni.normalize(),R.ri.copy(R.ni),R.rj.copy(R.ni),R.ri.mult(D.radius,R.ri),R.rj.mult(-U.radius,R.rj),R.ri.vadd(Y,R.ri),R.ri.vsub(ie.position,R.ri),R.rj.vadd(Z,R.rj),R.rj.vsub(se.position,R.rj),this.result.push(R),this.createFrictionEquationsFromContact(R,this.frictionResult)};var X=new l,he=new l,V=new l;c.prototype[i.types.PLANE|i.types.TRIMESH]=c.prototype.planeTrimesh=function(D,U,Y,Z,Pe,fe,ie,se){var R=new l,ne=X;ne.set(0,0,1),Pe.vmult(ne,ne);for(var le=0;le<U.vertices.length/3;le++){U.getVertex(le,R);var ve=new l;ve.copy(R),u.pointToWorldFrame(Z,fe,ve,R);var oe=he;R.vsub(Y,oe);var ee=ne.dot(oe);if(ee<=0){var ae=this.createContactEquation(ie,se,D,U);ae.ni.copy(ne);var xe=V;ne.scale(oe.dot(ne),xe),R.vsub(xe,xe),ae.ri.copy(xe),ae.ri.vsub(ie.position,ae.ri),ae.rj.copy(R),ae.rj.vsub(se.position,ae.rj),this.result.push(ae),this.createFrictionEquationsFromContact(ae,this.frictionResult)}}};var q=new l,N=new l;new l;var _=new l,L=new l,j=new l,re=new l,te=new l,ye=new l,B=new l,F=new l,Q=new l,G=new l,C=new l,O=new t,E=[];c.prototype[i.types.SPHERE|i.types.TRIMESH]=c.prototype.sphereTrimesh=function(D,U,Y,Z,Pe,fe,ie,se){var R=j,ne=re,le=te,ve=ye,oe=B,ee=F,ae=O,xe=L,_e=N,$=E;u.pointToLocalFrame(Z,fe,Y,oe);var we=D.radius;ae.lowerBound.set(oe.x-we,oe.y-we,oe.z-we),ae.upperBound.set(oe.x+we,oe.y+we,oe.z+we),U.getTrianglesInAABB(ae,$);for(var be=_,Ze=D.radius*D.radius,Re=0;Re<$.length;Re++)for(var Oe=0;Oe<3;Oe++)if(U.getVertex(U.indices[$[Re]*3+Oe],be),be.vsub(oe,_e),_e.norm2()<=Ze){xe.copy(be),u.pointToWorldFrame(Z,fe,xe,be),be.vsub(Y,_e);var Se=this.createContactEquation(ie,se,D,U);Se.ni.copy(_e),Se.ni.normalize(),Se.ri.copy(Se.ni),Se.ri.scale(D.radius,Se.ri),Se.ri.vadd(Y,Se.ri),Se.ri.vsub(ie.position,Se.ri),Se.rj.copy(be),Se.rj.vsub(se.position,Se.rj),this.result.push(Se),this.createFrictionEquationsFromContact(Se,this.frictionResult)}for(var Re=0;Re<$.length;Re++)for(var Oe=0;Oe<3;Oe++){U.getVertex(U.indices[$[Re]*3+Oe],R),U.getVertex(U.indices[$[Re]*3+(Oe+1)%3],ne),ne.vsub(R,le),oe.vsub(ne,ee);var mt=ee.dot(le);oe.vsub(R,ee);var gt=ee.dot(le);if(gt>0&&mt<0){oe.vsub(R,ee),ve.copy(le),ve.normalize(),gt=ee.dot(ve),ve.scale(gt,ee),ee.vadd(R,ee);var st=ee.distanceTo(oe);if(st<D.radius){var Se=this.createContactEquation(ie,se,D,U);ee.vsub(oe,Se.ni),Se.ni.normalize(),Se.ni.scale(D.radius,Se.ri),u.pointToWorldFrame(Z,fe,ee,ee),ee.vsub(se.position,Se.rj),u.vectorToWorldFrame(fe,Se.ni,Se.ni),u.vectorToWorldFrame(fe,Se.ri,Se.ri),this.result.push(Se),this.createFrictionEquationsFromContact(Se,this.frictionResult)}}}for(var wt=Q,lt=G,Ge=C,At=q,Re=0,Xe=$.length;Re!==Xe;Re++){U.getTriangleVertices($[Re],wt,lt,Ge),U.getNormal($[Re],At),oe.vsub(wt,ee);var st=ee.dot(At);if(At.scale(st,ee),oe.vsub(ee,ee),st=ee.distanceTo(oe),r.pointInTriangle(ee,wt,lt,Ge)&&st<D.radius){var Se=this.createContactEquation(ie,se,D,U);ee.vsub(oe,Se.ni),Se.ni.normalize(),Se.ni.scale(D.radius,Se.ri),u.pointToWorldFrame(Z,fe,ee,ee),ee.vsub(se.position,Se.rj),u.vectorToWorldFrame(fe,Se.ni,Se.ni),u.vectorToWorldFrame(fe,Se.ri,Se.ri),this.result.push(Se),this.createFrictionEquationsFromContact(Se,this.frictionResult)}}$.length=0};var T=new l,x=new l;c.prototype[i.types.SPHERE|i.types.PLANE]=c.prototype.spherePlane=function(D,U,Y,Z,Pe,fe,ie,se){var R=this.createContactEquation(ie,se,D,U);if(R.ni.set(0,0,1),fe.vmult(R.ni,R.ni),R.ni.negate(R.ni),R.ni.normalize(),R.ni.mult(D.radius,R.ri),Y.vsub(Z,T),R.ni.mult(R.ni.dot(T),x),T.vsub(x,R.rj),-T.dot(R.ni)<=D.radius){var ne=R.ri,le=R.rj;ne.vadd(Y,ne),ne.vsub(ie.position,ne),le.vadd(Z,le),le.vsub(se.position,le),this.result.push(R),this.createFrictionEquationsFromContact(R,this.frictionResult)}};var A=new l,k=new l,z=new l;function b(D,U,Y){for(var Z=null,Pe=D.length,fe=0;fe!==Pe;fe++){var ie=D[fe],se=A;D[(fe+1)%Pe].vsub(ie,se);var R=k;se.cross(U,R);var ne=z;Y.vsub(ie,ne);var le=R.dot(ne);if(Z===null||le>0&&Z===!0||le<=0&&Z===!1){Z===null&&(Z=le>0);continue}else return!1}return!0}var W=new l,K=new l,me=new l,de=new l,ue=[new l,new l,new l,new l,new l,new l],H=new l,J=new l,Ne=new l,Ee=new l;c.prototype[i.types.SPHERE|i.types.BOX]=c.prototype.sphereBox=function(D,U,Y,Z,Pe,fe,ie,se){var R=this.v3pool,ne=ue;Y.vsub(Z,W),U.getSideNormals(ne,fe);for(var le=D.radius,ve=!1,oe=J,ee=Ne,ae=Ee,xe=null,_e=0,$=0,we=0,be=null,Ze=0,Re=ne.length;Ze!==Re&&ve===!1;Ze++){var Oe=K;Oe.copy(ne[Ze]);var Se=Oe.norm();Oe.normalize();var mt=W.dot(Oe);if(mt<Se+le&&mt>0){var gt=me,st=de;gt.copy(ne[(Ze+1)%3]),st.copy(ne[(Ze+2)%3]);var wt=gt.norm(),lt=st.norm();gt.normalize(),st.normalize();var Ge=W.dot(gt),At=W.dot(st);if(Ge<wt&&Ge>-wt&&At<lt&&At>-lt){var Je=Math.abs(mt-Se-le);(be===null||Je<be)&&(be=Je,$=Ge,we=At,xe=Se,oe.copy(Oe),ee.copy(gt),ae.copy(st),_e++)}}}if(_e){ve=!0;var Ce=this.createContactEquation(ie,se,D,U);oe.mult(-le,Ce.ri),Ce.ni.copy(oe),Ce.ni.negate(Ce.ni),oe.mult(xe,oe),ee.mult($,ee),oe.vadd(ee,oe),ae.mult(we,ae),oe.vadd(ae,Ce.rj),Ce.ri.vadd(Y,Ce.ri),Ce.ri.vsub(ie.position,Ce.ri),Ce.rj.vadd(Z,Ce.rj),Ce.rj.vsub(se.position,Ce.rj),this.result.push(Ce),this.createFrictionEquationsFromContact(Ce,this.frictionResult)}for(var Xe=R.get(),Ft=H,ft=0;ft!==2&&!ve;ft++)for(var nt=0;nt!==2&&!ve;nt++)for(var tt=0;tt!==2&&!ve;tt++)if(Xe.set(0,0,0),ft?Xe.vadd(ne[0],Xe):Xe.vsub(ne[0],Xe),nt?Xe.vadd(ne[1],Xe):Xe.vsub(ne[1],Xe),tt?Xe.vadd(ne[2],Xe):Xe.vsub(ne[2],Xe),Z.vadd(Xe,Ft),Ft.vsub(Y,Ft),Ft.norm2()<le*le){ve=!0;var Ce=this.createContactEquation(ie,se,D,U);Ce.ri.copy(Ft),Ce.ri.normalize(),Ce.ni.copy(Ce.ri),Ce.ri.mult(le,Ce.ri),Ce.rj.copy(Xe),Ce.ri.vadd(Y,Ce.ri),Ce.ri.vsub(ie.position,Ce.ri),Ce.rj.vadd(Z,Ce.rj),Ce.rj.vsub(se.position,Ce.rj),this.result.push(Ce),this.createFrictionEquationsFromContact(Ce,this.frictionResult)}R.release(Xe),Xe=null;for(var yt=R.get(),bt=R.get(),Ce=R.get(),dt=R.get(),Je=R.get(),Ot=ne.length,ft=0;ft!==Ot&&!ve;ft++)for(var nt=0;nt!==Ot&&!ve;nt++)if(ft%3!=nt%3){ne[nt].cross(ne[ft],yt),yt.normalize(),ne[ft].vadd(ne[nt],bt),Ce.copy(Y),Ce.vsub(bt,Ce),Ce.vsub(Z,Ce);var Dt=Ce.dot(yt);yt.mult(Dt,dt);for(var tt=0;tt===ft%3||tt===nt%3;)tt++;Je.copy(Y),Je.vsub(dt,Je),Je.vsub(bt,Je),Je.vsub(Z,Je);var oi=Math.abs(Dt),ai=Je.norm();if(oi<ne[tt].norm()&&ai<le){ve=!0;var qe=this.createContactEquation(ie,se,D,U);bt.vadd(dt,qe.rj),qe.rj.copy(qe.rj),Je.negate(qe.ni),qe.ni.normalize(),qe.ri.copy(qe.rj),qe.ri.vadd(Z,qe.ri),qe.ri.vsub(Y,qe.ri),qe.ri.normalize(),qe.ri.mult(le,qe.ri),qe.ri.vadd(Y,qe.ri),qe.ri.vsub(ie.position,qe.ri),qe.rj.vadd(Z,qe.rj),qe.rj.vsub(se.position,qe.rj),this.result.push(qe),this.createFrictionEquationsFromContact(qe,this.frictionResult)}}R.release(yt,bt,Ce,dt,Je)};var We=new l,Te=new l,Le=new l,Fe=new l,De=new l,ke=new l,Be=new l,Ye=new l,et=new l,Me=new l;c.prototype[i.types.SPHERE|i.types.CONVEXPOLYHEDRON]=c.prototype.sphereConvex=function(D,U,Y,Z,Pe,fe,ie,se){var R=this.v3pool;Y.vsub(Z,We);for(var ne=U.faceNormals,le=U.faces,ve=U.vertices,oe=D.radius,ee=0;ee!==ve.length;ee++){var ae=ve[ee],xe=De;fe.vmult(ae,xe),Z.vadd(xe,xe);var _e=Fe;if(xe.vsub(Y,_e),_e.norm2()<oe*oe){we=!0;var $=this.createContactEquation(ie,se,D,U);$.ri.copy(_e),$.ri.normalize(),$.ni.copy($.ri),$.ri.mult(oe,$.ri),xe.vsub(Z,$.rj),$.ri.vadd(Y,$.ri),$.ri.vsub(ie.position,$.ri),$.rj.vadd(Z,$.rj),$.rj.vsub(se.position,$.rj),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult);return}}for(var we=!1,ee=0,be=le.length;ee!==be&&we===!1;ee++){var Ze=ne[ee],Re=le[ee],Oe=ke;fe.vmult(Ze,Oe);var Se=Be;fe.vmult(ve[Re[0]],Se),Se.vadd(Z,Se);var mt=Ye;Oe.mult(-oe,mt),Y.vadd(mt,mt);var gt=et;mt.vsub(Se,gt);var st=gt.dot(Oe),wt=Me;if(Y.vsub(Se,wt),st<0&&wt.dot(Oe)>0){for(var lt=[],Ge=0,At=Re.length;Ge!==At;Ge++){var Xe=R.get();fe.vmult(ve[Re[Ge]],Xe),Z.vadd(Xe,Xe),lt.push(Xe)}if(b(lt,Oe,Y)){we=!0;var $=this.createContactEquation(ie,se,D,U);Oe.mult(-oe,$.ri),Oe.negate($.ni);var Ft=R.get();Oe.mult(-st,Ft);var ft=R.get();Oe.mult(-oe,ft),Y.vsub(Z,$.rj),$.rj.vadd(ft,$.rj),$.rj.vadd(Ft,$.rj),$.rj.vadd(Z,$.rj),$.rj.vsub(se.position,$.rj),$.ri.vadd(Y,$.ri),$.ri.vsub(ie.position,$.ri),R.release(Ft),R.release(ft),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult);for(var Ge=0,nt=lt.length;Ge!==nt;Ge++)R.release(lt[Ge]);return}else for(var Ge=0;Ge!==Re.length;Ge++){var tt=R.get(),yt=R.get();fe.vmult(ve[Re[(Ge+1)%Re.length]],tt),fe.vmult(ve[Re[(Ge+2)%Re.length]],yt),Z.vadd(tt,tt),Z.vadd(yt,yt);var bt=Te;yt.vsub(tt,bt);var Ce=Le;bt.unit(Ce);var dt=R.get(),Je=R.get();Y.vsub(tt,Je);var Ot=Je.dot(Ce);Ce.mult(Ot,dt),dt.vadd(tt,dt);var Dt=R.get();if(dt.vsub(Y,Dt),Ot>0&&Ot*Ot<bt.norm2()&&Dt.norm2()<oe*oe){var $=this.createContactEquation(ie,se,D,U);dt.vsub(Z,$.rj),dt.vsub(Y,$.ni),$.ni.normalize(),$.ni.mult(oe,$.ri),$.rj.vadd(Z,$.rj),$.rj.vsub(se.position,$.rj),$.ri.vadd(Y,$.ri),$.ri.vsub(ie.position,$.ri),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult);for(var Ge=0,nt=lt.length;Ge!==nt;Ge++)R.release(lt[Ge]);R.release(tt),R.release(yt),R.release(dt),R.release(Dt),R.release(Je);return}R.release(tt),R.release(yt),R.release(dt),R.release(Dt),R.release(Je)}for(var Ge=0,nt=lt.length;Ge!==nt;Ge++)R.release(lt[Ge])}}},new l,new l,c.prototype[i.types.PLANE|i.types.BOX]=c.prototype.planeBox=function(D,U,Y,Z,Pe,fe,ie,se){U.convexPolyhedronRepresentation.material=U.material,U.convexPolyhedronRepresentation.collisionResponse=U.collisionResponse,this.planeConvex(D,U.convexPolyhedronRepresentation,Y,Z,Pe,fe,ie,se)};var it=new l,Ct=new l,Rt=new l,_t=new l;c.prototype[i.types.PLANE|i.types.CONVEXPOLYHEDRON]=c.prototype.planeConvex=function(D,U,Y,Z,Pe,fe,ie,se){var R=it,ne=Ct;ne.set(0,0,1),Pe.vmult(ne,ne);for(var le=0,ve=Rt,oe=0;oe!==U.vertices.length;oe++){R.copy(U.vertices[oe]),fe.vmult(R,R),Z.vadd(R,R),R.vsub(Y,ve);var ee=ne.dot(ve);if(ee<=0){var ae=this.createContactEquation(ie,se,D,U),xe=_t;ne.mult(ne.dot(ve),xe),R.vsub(xe,xe),xe.vsub(Y,ae.ri),ae.ni.copy(ne),R.vsub(Z,ae.rj),ae.ri.vadd(Y,ae.ri),ae.ri.vsub(ie.position,ae.ri),ae.rj.vadd(Z,ae.rj),ae.rj.vsub(se.position,ae.rj),this.result.push(ae),le++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(ae,this.frictionResult)}}this.enableFrictionReduction&&le&&this.createFrictionFromAverage(le)};var St=new l,pt=new l;c.prototype[i.types.CONVEXPOLYHEDRON]=c.prototype.convexConvex=function(D,U,Y,Z,Pe,fe,ie,se,R,ne,le,ve){var oe=St;if(!(Y.distanceTo(Z)>D.boundingSphereRadius+U.boundingSphereRadius)&&D.findSeparatingAxis(U,Y,Pe,Z,fe,oe,le,ve)){var ee=[],ae=pt;D.clipAgainstHull(Y,Pe,U,Z,fe,oe,-100,100,ee);for(var xe=0,_e=0;_e!==ee.length;_e++){var $=this.createContactEquation(ie,se,D,U,R,ne),we=$.ri,be=$.rj;oe.negate($.ni),ee[_e].normal.negate(ae),ae.mult(ee[_e].depth,ae),ee[_e].point.vadd(ae,we),be.copy(ee[_e].point),we.vsub(Y,we),be.vsub(Z,be),we.vadd(Y,we),we.vsub(ie.position,we),be.vadd(Z,be),be.vsub(se.position,be),this.result.push($),xe++,this.enableFrictionReduction||this.createFrictionEquationsFromContact($,this.frictionResult)}this.enableFrictionReduction&&xe&&this.createFrictionFromAverage(xe)}};var Mt=new l,Lt=new l,Et=new l;c.prototype[i.types.PLANE|i.types.PARTICLE]=c.prototype.planeParticle=function(D,U,Y,Z,Pe,fe,ie,se){var R=Mt;R.set(0,0,1),ie.quaternion.vmult(R,R);var ne=Lt;Z.vsub(ie.position,ne);var le=R.dot(ne);if(le<=0){var ve=this.createContactEquation(se,ie,U,D);ve.ni.copy(R),ve.ni.negate(ve.ni),ve.ri.set(0,0,0);var oe=Et;R.mult(R.dot(Z),oe),Z.vsub(oe,oe),ve.rj.copy(oe),this.result.push(ve),this.createFrictionEquationsFromContact(ve,this.frictionResult)}};var xt=new l;c.prototype[i.types.PARTICLE|i.types.SPHERE]=c.prototype.sphereParticle=function(D,U,Y,Z,Pe,fe,ie,se){var R=xt;R.set(0,0,1),Z.vsub(Y,R);var ne=R.norm2();if(ne<=D.radius*D.radius){var le=this.createContactEquation(se,ie,U,D);R.normalize(),le.rj.copy(R),le.rj.mult(D.radius,le.rj),le.ni.copy(R),le.ni.negate(le.ni),le.ri.set(0,0,0),this.result.push(le),this.createFrictionEquationsFromContact(le,this.frictionResult)}};var ht=new s,Pt=new l;new l;var Tt=new l,ot=new l,It=new l;c.prototype[i.types.PARTICLE|i.types.CONVEXPOLYHEDRON]=c.prototype.convexParticle=function(D,U,Y,Z,Pe,fe,ie,se){var R=-1,ne=Tt,le=It,ve=null,oe=Pt;if(oe.copy(Z),oe.vsub(Y,oe),Pe.conjugate(ht),ht.vmult(oe,oe),D.pointIsInside(oe)){D.worldVerticesNeedsUpdate&&D.computeWorldVertices(Y,Pe),D.worldFaceNormalsNeedsUpdate&&D.computeWorldFaceNormals(Pe);for(var ee=0,ae=D.faces.length;ee!==ae;ee++){var xe=[D.worldVertices[D.faces[ee][0]]],_e=D.worldFaceNormals[ee];Z.vsub(xe[0],ot);var $=-_e.dot(ot);(ve===null||Math.abs($)<Math.abs(ve))&&(ve=$,R=ee,ne.copy(_e))}if(R!==-1){var we=this.createContactEquation(se,ie,U,D);ne.mult(ve,le),le.vadd(Z,le),le.vsub(Y,le),we.rj.copy(le),ne.negate(we.ni),we.ri.set(0,0,0);var be=we.ri,Ze=we.rj;be.vadd(Z,be),be.vsub(se.position,be),Ze.vadd(Y,Ze),Ze.vsub(ie.position,Ze),this.result.push(we),this.createFrictionEquationsFromContact(we,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}},c.prototype[i.types.BOX|i.types.HEIGHTFIELD]=c.prototype.boxHeightfield=function(D,U,Y,Z,Pe,fe,ie,se){D.convexPolyhedronRepresentation.material=D.material,D.convexPolyhedronRepresentation.collisionResponse=D.collisionResponse,this.convexHeightfield(D.convexPolyhedronRepresentation,U,Y,Z,Pe,fe,ie,se)};var Nt=new l,Bt=new l,Vt=[0];c.prototype[i.types.CONVEXPOLYHEDRON|i.types.HEIGHTFIELD]=c.prototype.convexHeightfield=function(D,U,Y,Z,Pe,fe,ie,se){var R=U.data,ne=U.elementSize,le=D.boundingSphereRadius,ve=Bt,oe=Vt,ee=Nt;u.pointToLocalFrame(Z,fe,Y,ee);var ae=Math.floor((ee.x-le)/ne)-1,xe=Math.ceil((ee.x+le)/ne)+1,_e=Math.floor((ee.y-le)/ne)-1,$=Math.ceil((ee.y+le)/ne)+1;if(!(xe<0||$<0||ae>R.length||_e>R[0].length)){ae<0&&(ae=0),xe<0&&(xe=0),_e<0&&(_e=0),$<0&&($=0),ae>=R.length&&(ae=R.length-1),xe>=R.length&&(xe=R.length-1),$>=R[0].length&&($=R[0].length-1),_e>=R[0].length&&(_e=R[0].length-1);var we=[];U.getRectMinMax(ae,_e,xe,$,we);var be=we[0],Ze=we[1];if(!(ee.z-le>Ze||ee.z+le<be))for(var Re=ae;Re<xe;Re++)for(var Oe=_e;Oe<$;Oe++)U.getConvexTrianglePillar(Re,Oe,!1),u.pointToWorldFrame(Z,fe,U.pillarOffset,ve),Y.distanceTo(ve)<U.pillarConvex.boundingSphereRadius+D.boundingSphereRadius&&this.convexConvex(D,U.pillarConvex,Y,ve,Pe,fe,ie,se,null,null,oe,null),U.getConvexTrianglePillar(Re,Oe,!0),u.pointToWorldFrame(Z,fe,U.pillarOffset,ve),Y.distanceTo(ve)<U.pillarConvex.boundingSphereRadius+D.boundingSphereRadius&&this.convexConvex(D,U.pillarConvex,Y,ve,Pe,fe,ie,se,null,null,oe,null)}};var Ut=new l,Qe=new l;c.prototype[i.types.SPHERE|i.types.HEIGHTFIELD]=c.prototype.sphereHeightfield=function(D,U,Y,Z,Pe,fe,ie,se){var R=U.data,ne=D.radius,le=U.elementSize,ve=Qe,oe=Ut;u.pointToLocalFrame(Z,fe,Y,oe);var ee=Math.floor((oe.x-ne)/le)-1,ae=Math.ceil((oe.x+ne)/le)+1,xe=Math.floor((oe.y-ne)/le)-1,_e=Math.ceil((oe.y+ne)/le)+1;if(!(ae<0||_e<0||ee>R.length||_e>R[0].length)){ee<0&&(ee=0),ae<0&&(ae=0),xe<0&&(xe=0),_e<0&&(_e=0),ee>=R.length&&(ee=R.length-1),ae>=R.length&&(ae=R.length-1),_e>=R[0].length&&(_e=R[0].length-1),xe>=R[0].length&&(xe=R[0].length-1);var $=[];U.getRectMinMax(ee,xe,ae,_e,$);var we=$[0],be=$[1];if(!(oe.z-ne>be||oe.z+ne<we))for(var Ze=this.result,Re=ee;Re<ae;Re++)for(var Oe=xe;Oe<_e;Oe++){var Se=Ze.length;U.getConvexTrianglePillar(Re,Oe,!1),u.pointToWorldFrame(Z,fe,U.pillarOffset,ve),Y.distanceTo(ve)<U.pillarConvex.boundingSphereRadius+D.boundingSphereRadius&&this.sphereConvex(D,U.pillarConvex,Y,ve,Pe,fe,ie,se),U.getConvexTrianglePillar(Re,Oe,!0),u.pointToWorldFrame(Z,fe,U.pillarOffset,ve),Y.distanceTo(ve)<U.pillarConvex.boundingSphereRadius+D.boundingSphereRadius&&this.sphereConvex(D,U.pillarConvex,Y,ve,Pe,fe,ie,se);var mt=Ze.length-Se;if(mt>2)return}}}},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(e,o,d){o.exports=y;var t=e("../shapes/Shape"),i=e("../math/Vec3"),r=e("../math/Quaternion"),l=e("../solver/GSSolver");e("../utils/Vec3Pool"),e("../equations/ContactEquation"),e("../equations/FrictionEquation");var u=e("./Narrowphase"),s=e("../utils/EventTarget"),n=e("../collision/ArrayCollisionMatrix"),f=e("../material/Material"),h=e("../material/ContactMaterial"),c=e("../objects/Body"),v=e("../utils/TupleDictionary"),p=e("../collision/RaycastResult"),m=e("../collision/AABB"),g=e("../collision/Ray"),S=e("../collision/NaiveBroadphase");function y(){s.apply(this),this.dt=-1,this.allowSleep=!1,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=0,this.quatNormalizeFast=!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new i,this.broadphase=new S,this.bodies=[],this.solver=new l,this.constraints=[],this.narrowphase=new u(this),this.collisionMatrix=new n,this.collisionMatrixPrevious=new n,this.materials=[],this.contactmaterials=[],this.contactMaterialTable=new v,this.defaultMaterial=new f("default"),this.defaultContactMaterial=new h(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null}}y.prototype=new s,new m;var w=new g;if(y.prototype.getContactMaterial=function(F,Q){return this.contactMaterialTable.get(F.id,Q.id)},y.prototype.numObjects=function(){return this.bodies.length},y.prototype.collisionMatrixTick=function(){var F=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=F,this.collisionMatrix.reset()},y.prototype.add=y.prototype.addBody=function(F){this.bodies.indexOf(F)===-1&&(F.index=this.bodies.length,this.bodies.push(F),F.world=this,F.initPosition.copy(F.position),F.initVelocity.copy(F.velocity),F.timeLastSleepy=this.time,F instanceof c&&(F.initAngularVelocity.copy(F.angularVelocity),F.initQuaternion.copy(F.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=F,this.dispatchEvent(this.addBodyEvent))},y.prototype.addConstraint=function(F){this.constraints.push(F)},y.prototype.removeConstraint=function(F){var Q=this.constraints.indexOf(F);Q!==-1&&this.constraints.splice(Q,1)},y.prototype.rayTest=function(F,Q,G){G instanceof p?this.raycastClosest(F,Q,{skipBackfaces:!0},G):this.raycastAll(F,Q,{skipBackfaces:!0},G)},y.prototype.raycastAll=function(F,Q,G,C){return G.mode=g.ALL,G.from=F,G.to=Q,G.callback=C,w.intersectWorld(this,G)},y.prototype.raycastAny=function(F,Q,G,C){return G.mode=g.ANY,G.from=F,G.to=Q,G.result=C,w.intersectWorld(this,G)},y.prototype.raycastClosest=function(F,Q,G,C){return G.mode=g.CLOSEST,G.from=F,G.to=Q,G.result=C,w.intersectWorld(this,G)},y.prototype.remove=function(F){F.world=null;var Q=this.bodies.length-1,G=this.bodies,C=G.indexOf(F);if(C!==-1){G.splice(C,1);for(var O=0;O!==G.length;O++)G[O].index=O;this.collisionMatrix.setNumObjects(Q),this.removeBodyEvent.body=F,this.dispatchEvent(this.removeBodyEvent)}},y.prototype.removeBody=y.prototype.remove,y.prototype.addMaterial=function(F){this.materials.push(F)},y.prototype.addContactMaterial=function(F){this.contactmaterials.push(F),this.contactMaterialTable.set(F.materials[0].id,F.materials[1].id,F)},typeof performance=="undefined"&&(performance={}),!performance.now){var X=Date.now();performance.timing&&performance.timing.navigationStart&&(X=performance.timing.navigationStart),performance.now=function(){return Date.now()-X}}var he=new i;y.prototype.step=function(F,Q,G){if(G=G||10,Q=Q||0,Q===0)this.internalStep(F),this.time+=F;else{var C=Math.floor((this.time+Q)/F)-Math.floor(this.time/F);C=Math.min(C,G);for(var O=performance.now(),E=0;E!==C&&(this.internalStep(F),!(performance.now()-O>F*1e3));E++);this.time+=Q;for(var T=this.time%F,x=T/F,A=he,k=this.bodies,z=0;z!==k.length;z++){var b=k[z];b.type!==c.STATIC&&b.sleepState!==c.SLEEPING?(b.position.vsub(b.previousPosition,A),A.scale(x,A),b.position.vadd(A,b.interpolatedPosition)):(b.interpolatedPosition.copy(b.position),b.interpolatedQuaternion.copy(b.quaternion))}}};var V={type:"postStep"},q={type:"preStep"},N={type:"collide",body:null,contact:null},_=[],L=[],j=[],re=[];new i,new i,new i,new i,new i,new i,new i,new i,new i,new r;var te=new r,ye=new r,B=new i;y.prototype.internalStep=function(F){this.dt=F;var Q=this.contacts,G=j,C=re,O=this.numObjects(),E=this.bodies,T=this.solver,x=this.gravity,A=this.doProfiling,k=this.profile,z=c.DYNAMIC,b,W=this.constraints,K=L;x.norm();var me=x.x,de=x.y,ue=x.z,H=0;for(A&&(b=performance.now()),H=0;H!==O;H++){var J=E[H];if(J.type&z){var Ne=J.force,Ee=J.mass;Ne.x+=Ee*me,Ne.y+=Ee*de,Ne.z+=Ee*ue}}for(var H=0,We=this.subsystems.length;H!==We;H++)this.subsystems[H].update();A&&(b=performance.now()),G.length=0,C.length=0,this.broadphase.collisionPairs(this,G,C),A&&(k.broadphase=performance.now()-b);var Te=W.length;for(H=0;H!==Te;H++){var Le=W[H];if(!Le.collideConnected)for(var Fe=G.length-1;Fe>=0;Fe-=1)(Le.bodyA===G[Fe]&&Le.bodyB===C[Fe]||Le.bodyB===G[Fe]&&Le.bodyA===C[Fe])&&(G.splice(Fe,1),C.splice(Fe,1))}this.collisionMatrixTick(),A&&(b=performance.now());var De=_,ke=Q.length;for(H=0;H!==ke;H++)De.push(Q[H]);Q.length=0;var Be=this.frictionEquations.length;for(H=0;H!==Be;H++)K.push(this.frictionEquations[H]);this.frictionEquations.length=0,this.narrowphase.getContacts(G,C,this,Q,De,this.frictionEquations,K),A&&(k.narrowphase=performance.now()-b),A&&(b=performance.now());for(var H=0;H<this.frictionEquations.length;H++)T.addEquation(this.frictionEquations[H]);for(var Ye=Q.length,et=0;et!==Ye;et++){var Le=Q[et],J=Le.bi,Me=Le.bj;Le.si,Le.sj;var it;if(J.material&&Me.material?it=this.getContactMaterial(J.material,Me.material)||this.defaultContactMaterial:it=this.defaultContactMaterial,it.friction,J.material&&Me.material&&(J.material.friction>=0&&Me.material.friction>=0&&J.material.friction*Me.material.friction,J.material.restitution>=0&&Me.material.restitution>=0&&(Le.restitution=J.material.restitution*Me.material.restitution)),T.addEquation(Le),J.allowSleep&&J.type===c.DYNAMIC&&J.sleepState===c.SLEEPING&&Me.sleepState===c.AWAKE&&Me.type!==c.STATIC){var Ct=Me.velocity.norm2()+Me.angularVelocity.norm2(),Rt=Math.pow(Me.sleepSpeedLimit,2);Ct>=Rt*2&&(J._wakeUpAfterNarrowphase=!0)}if(Me.allowSleep&&Me.type===c.DYNAMIC&&Me.sleepState===c.SLEEPING&&J.sleepState===c.AWAKE&&J.type!==c.STATIC){var _t=J.velocity.norm2()+J.angularVelocity.norm2(),St=Math.pow(J.sleepSpeedLimit,2);_t>=St*2&&(Me._wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(J,Me,!0),this.collisionMatrixPrevious.get(J,Me)||(N.body=Me,N.contact=Le,J.dispatchEvent(N),N.body=J,Me.dispatchEvent(N))}for(A&&(k.makeContactConstraints=performance.now()-b,b=performance.now()),H=0;H!==O;H++){var J=E[H];J._wakeUpAfterNarrowphase&&(J.wakeUp(),J._wakeUpAfterNarrowphase=!1)}var Te=W.length;for(H=0;H!==Te;H++){var Le=W[H];Le.update();for(var Fe=0,pt=Le.equations.length;Fe!==pt;Fe++){var Mt=Le.equations[Fe];T.addEquation(Mt)}}T.solve(F,this),A&&(k.solve=performance.now()-b),T.removeAllEquations();var Lt=Math.pow;for(H=0;H!==O;H++){var J=E[H];if(J.type&z){var Et=Lt(1-J.linearDamping,F),xt=J.velocity;xt.mult(Et,xt);var ht=J.angularVelocity;if(ht){var Pt=Lt(1-J.angularDamping,F);ht.mult(Pt,ht)}}}for(this.dispatchEvent(q),H=0;H!==O;H++){var J=E[H];J.preStep&&J.preStep.call(J)}A&&(b=performance.now());var Tt=te,ot=ye,It=this.stepnumber,Nt=c.DYNAMIC|c.KINEMATIC,Bt=It%(this.quatNormalizeSkip+1)==0,Vt=this.quatNormalizeFast,Ut=F*.5;for(t.types.PLANE,t.types.CONVEXPOLYHEDRON,H=0;H!==O;H++){var Qe=E[H],D=Qe.force,U=Qe.torque;if(Qe.type&Nt&&Qe.sleepState!==c.SLEEPING){var Y=Qe.velocity,Z=Qe.angularVelocity,Pe=Qe.position,fe=Qe.quaternion,ie=Qe.invMass,se=Qe.invInertiaWorld;Y.x+=D.x*ie*F,Y.y+=D.y*ie*F,Y.z+=D.z*ie*F,Qe.angularVelocity&&(se.vmult(U,B),B.mult(F,B),B.vadd(Z,Z)),Pe.x+=Y.x*F,Pe.y+=Y.y*F,Pe.z+=Y.z*F,Qe.angularVelocity&&(Tt.set(Z.x,Z.y,Z.z,0),Tt.mult(fe,ot),fe.x+=Ut*ot.x,fe.y+=Ut*ot.y,fe.z+=Ut*ot.z,fe.w+=Ut*ot.w,Bt&&(Vt?fe.normalizeFast():fe.normalize())),Qe.aabb&&(Qe.aabbNeedsUpdate=!0),Qe.updateInertiaWorld&&Qe.updateInertiaWorld()}}for(this.clearForces(),this.broadphase.dirty=!0,A&&(k.integrate=performance.now()-b),this.time+=F,this.stepnumber+=1,this.dispatchEvent(V),H=0;H!==O;H++){var J=E[H],R=J.postStep;R&&R.call(J)}if(this.allowSleep)for(H=0;H!==O;H++)E[H].sleepTick(this.time)},y.prototype.clearForces=function(){for(var F=this.bodies,Q=F.length,G=0;G!==Q;G++){var C=F[G];C.force,C.torque,C.force.set(0,0,0),C.torque.set(0,0,0)}}},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])(2)})})(ni);var tr=ni.exports;window.CANNON=tr;function or(I,a){I.enableOfflineSupport=!1,pi.AllowMatricesInterpolation=!0;var e=new at(I);const o=new mi("Camera",Math.PI/6,Math.PI/4,50,Ke.Zero(),e);o.setTarget(Ke.Zero()),e.enablePhysics(null,new gi),e.clearColor=Ve.White().toColor4();const d=ei.CreateGround("ground",{width:1e3,height:1e3},e);d.receiveShadows=!0,d.material=new ii("groundMat",e),d.physicsImpostor=new Ht(d,Ht.BoxImpostor,{mass:0,restitution:.1},e);var t=new yi("directionalLight",new Ke(-1,-1,-1),e);t.position=new Ke(0,10,0),t.radius=10,t.specular=Ve.Black();var i=new xi(1024,t);i.setDarkness(.9),i.shadowMaxZ=100;var r=new Ti("hemisphericLight",new Ke(1,1,1),e);r.intensity=.8,r.specular=Ve.Black(),ir(e,d,i);var l=!1,u=null;e.onPointerObservable.add(h=>{switch(h.type){case jt.POINTERDOWN:l=!0;break;case jt.POINTERUP:l=!1,u=null;break;case jt.POINTERMOVE:if(l){var c=e.pick(e.pointerX,e.pointerY,p=>p===d);const v=c==null?void 0:c.pickedPoint;if(u&&v){const p=v.subtract(u);e.meshes.forEach(m=>{m.position.subtract(v).length()<3&&m.applyImpulse(p.scale(7),m.absolutePosition)})}u=v}break}});function s(){e.debugLayer.show()}function n(){o.attachControl(a,!1)}const f={debug:s,enableCamera:n};return console.debug("hax",f),Object.assign(window,{hax:f}),e}async function ir(I,a,e){for(var o=0;o<100;o++){const d=nr(I,a);e.addShadowCaster(d.mesh,!0),await ri(10)}}function nr(I,a){const e=new Ve;Ve.HSVtoRGBToRef(Math.random()*360,.5,1,e);const o=ei.CreateBox("cube",{size:1,faceColors:[e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4()]},I);o.receiveShadows=!0,o.position.set(Math.random()*100-50,2,Math.random()*100-50),o.physicsImpostor=new Ht(o,Ht.BoxImpostor,{mass:1,restitution:.5},I);function d(l){o.applyImpulse(l.normalize().scale(2),o.getAbsolutePosition().addInPlaceFromFloats(0,.5,0))}const t=[Ke.Forward(),Ke.Backward(),Ke.Left(),Ke.Right()];async function i(){for(;;){if(r)if(Math.random()<.25){const l=o.position.scale(-1);d(l)}else{const l=t[Math.trunc(Math.random()*t.length)];d(l)}await ri(Math.random()*50+50)}}i();var r=!1;return o.actionManager=new Zt(I),o.actionManager.registerAction(new ti({trigger:Zt.OnIntersectionEnterTrigger,parameter:a},()=>{r=!0})),o.actionManager.registerAction(new ti({trigger:Zt.OnIntersectionExitTrigger,parameter:a},()=>{r=!1})),{mesh:o,move:d}}function ri(I){return new Promise(a=>setTimeout(a,I))}export{or as createScene};
