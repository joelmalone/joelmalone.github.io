import{W as E,n as o,s as _,o as c,aB as I,p as u,C as y,ar as l,aa as v,at as W,au as H,S as w,t as A,R as D,aG as V,a8 as L,cp as he,J as re,V as G,q as Se,Q as ve,cO as Ee,d as pe,aQ as Ce,h as ue,aM as de,e as ge}from"./runBabylonPlaygroundScene-32a4afbd.js";import{V as B,M as P,E as k,S as Pe,T as ie,q as Ae}from"./linesBuilder-a2dae4c1.js";import{h as ye}from"./pbrMaterial-34e2fd30.js";import{D as Ne}from"./dynamicTexture-7393bdcd.js";import{C as ne}from"./directionalLight-d037032f.js";import{b as _e}from"./blurPostProcess-f61d1d3e.js";function ae(T,e,t,s){let i=s,r=0,n="";for(;i<t.length;){const f=t.charAt(i);if(n)f===n?n==='"'||n==="'"?t.charAt(i-1)!=="\\"&&(n=""):n="":n==="*/"&&f==="*"&&i+1<t.length&&(t.charAt(i+1)==="/"&&(n=""),n===""&&i++);else switch(f){case T:r++;break;case e:r--;break;case'"':case"'":case"`":n=f;break;case"/":if(i+1<t.length){const a=t.charAt(i+1);a==="/"?n=`
`:a==="*"&&(n="*/")}break}if(i++,r===0)break}return r===0?i-1:-1}function Te(T,e){for(;e<T.length;){const t=T[e];if(t!==" "&&t!==`
`&&t!=="\r"&&t!=="	"&&t!==`
`&&t!==" ")break;e++}return e}function ce(T){const e=T.charCodeAt(0);return e>=48&&e<=57||e>=65&&e<=90||e>=97&&e<=122||e==95}function xe(T){let e=0,t="",s=!1;const i=[];for(;e<T.length;){const r=T.charAt(e);if(t)r===t?t==='"'||t==="'"?(T.charAt(e-1)!=="\\"&&(t=""),i.push(r)):(t="",s=!1):t==="*/"&&r==="*"&&e+1<T.length?(T.charAt(e+1)==="/"&&(t=""),t===""&&(s=!1,e++)):s||i.push(r);else{switch(r){case'"':case"'":case"`":t=r;break;case"/":if(e+1<T.length){const n=T.charAt(e+1);n==="/"?(t=`
`,s=!0):n==="*"&&(t="*/",s=!0)}break}s||i.push(r)}e++}return i.join("")}function Fe(T,e,t){for(;e>=0&&T.charAt(e)!==t;)e--;return e}function Ie(T){return T.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}class le{get code(){return this._sourceCode}constructor(e,t=20){this.debug=!1,this._sourceCode=e,this._numMaxIterations=t,this._functionDescr=[],this.inlineToken="#define inline"}processCode(){this.debug&&console.log(`Start inlining process (code size=${this._sourceCode.length})...`),this._collectFunctions(),this._processInlining(this._numMaxIterations),this.debug&&console.log("End of inlining process.")}_collectFunctions(){let e=0;for(;e<this._sourceCode.length;){const t=this._sourceCode.indexOf(this.inlineToken,e);if(t<0)break;const s=this._sourceCode.indexOf("(",t+this.inlineToken.length);if(s<0){this.debug&&console.warn(`Could not find the opening parenthesis after the token. startIndex=${e}`),e=t+this.inlineToken.length;continue}const i=le._RegexpFindFunctionNameAndType.exec(this._sourceCode.substring(t+this.inlineToken.length,s));if(!i){this.debug&&console.warn(`Could not extract the name/type of the function from: ${this._sourceCode.substring(t+this.inlineToken.length,s)}`),e=t+this.inlineToken.length;continue}const[r,n]=[i[3],i[4]],f=ae("(",")",this._sourceCode,s);if(f<0){this.debug&&console.warn(`Could not extract the parameters the function '${n}' (type=${r}). funcParamsStartIndex=${s}`),e=t+this.inlineToken.length;continue}const a=this._sourceCode.substring(s+1,f),d=Te(this._sourceCode,f+1);if(d===this._sourceCode.length){this.debug&&console.warn(`Could not extract the body of the function '${n}' (type=${r}). funcParamsEndIndex=${f}`),e=t+this.inlineToken.length;continue}const h=ae("{","}",this._sourceCode,d);if(h<0){this.debug&&console.warn(`Could not extract the body of the function '${n}' (type=${r}). funcBodyStartIndex=${d}`),e=t+this.inlineToken.length;continue}const m=this._sourceCode.substring(d,h+1),g=xe(a).split(","),p=[];for(let q=0;q<g.length;++q){const J=g[q].trim(),ee=J.lastIndexOf(" ");ee>=0&&p.push(J.substring(ee+1))}r!=="void"&&p.push("return"),this._functionDescr.push({name:n,type:r,parameters:p,body:m,callIndex:0}),e=h+1;const X=t>0?this._sourceCode.substring(0,t):"",Y=h+1<this._sourceCode.length-1?this._sourceCode.substring(h+1):"";this._sourceCode=X+Y,e-=h+1-t}this.debug&&console.log(`Collect functions: ${this._functionDescr.length} functions found. functionDescr=`,this._functionDescr)}_processInlining(e=20){for(;e-->=0&&this._replaceFunctionCallsByCode(););return this.debug&&console.log(`numMaxIterations is ${e} after inlining process`),e>=0}_replaceFunctionCallsByCode(){let e=!1;for(const t of this._functionDescr){const{name:s,type:i,parameters:r,body:n}=t;let f=0;for(;f<this._sourceCode.length;){const a=this._sourceCode.indexOf(s,f);if(a<0)break;if(a===0||ce(this._sourceCode.charAt(a-1))){f=a+s.length;continue}const d=Te(this._sourceCode,a+s.length);if(d===this._sourceCode.length||this._sourceCode.charAt(d)!=="("){f=a+s.length;continue}const h=ae("(",")",this._sourceCode,d);if(h<0){this.debug&&console.warn(`Could not extract the parameters of the function call. Function '${s}' (type=${i}). callParamsStartIndex=${d}`),f=a+s.length;continue}const m=this._sourceCode.substring(d+1,h),p=(U=>{const Q=[];let K=0,oe=0;for(;K<U.length;){if(U.charAt(K)==="("){const me=ae("(",")",U,K);if(me<0)return null;K=me}else U.charAt(K)===","&&(Q.push(U.substring(oe,K)),oe=K+1);K++}return oe<K&&Q.push(U.substring(oe,K)),Q})(xe(m));if(p===null){this.debug&&console.warn(`Invalid function call: can't extract the parameters of the function call. Function '${s}' (type=${i}). callParamsStartIndex=${d}, callParams=`+m),f=a+s.length;continue}const X=[];for(let U=0;U<p.length;++U){const Q=p[U].trim();X.push(Q)}const Y=i!=="void"?s+"_"+t.callIndex++:null;if(Y&&X.push(Y+" ="),X.length!==r.length){this.debug&&console.warn(`Invalid function call: not the same number of parameters for the call than the number expected by the function. Function '${s}' (type=${i}). function parameters=${r}, call parameters=${X}`),f=a+s.length;continue}f=h+1;const q=this._replaceNames(n,r,X);let J=a>0?this._sourceCode.substring(0,a):"";const ee=h+1<this._sourceCode.length-1?this._sourceCode.substring(h+1):"";if(Y){const U=Fe(this._sourceCode,a-1,`
`);J=this._sourceCode.substring(0,U+1);const Q=this._sourceCode.substring(U+1,a);this._sourceCode=J+i+" "+Y+`;
`+q+`
`+Q+Y+ee,this.debug&&console.log(`Replace function call by code. Function '${s}' (type=${i}). injectDeclarationIndex=${U}, call parameters=${X}`)}else this._sourceCode=J+q+ee,f+=q.length-(h+1-a),this.debug&&console.log(`Replace function call by code. Function '${s}' (type=${i}). functionCallIndex=${a}, call parameters=${X}`);e=!0}}return e}_replaceNames(e,t,s){for(let i=0;i<t.length;++i){const r=new RegExp(Ie(t[i]),"g"),n=t[i].length,f=s[i];e=e.replace(r,(a,...d)=>{const h=d[0];return ce(e.charAt(h-1))||ce(e.charAt(h+n))?t[i]:f})}return e}}le._RegexpFindFunctionNameAndType=/((\s+?)(\w+)\s+(\w+)\s*?)$/;const Le="imageProcessingCompatibility",Oe=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;E.IncludesShadersStore[Le]=Oe;const Re="cellPixelShader",De=`precision highp float;
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;
vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[Re]=De;const be="cellVertexShader",Me=`precision highp float;
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
#include<bakedVertexAnimationDeclaration>
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
if (vDiffuseInfos.x==0.)
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
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[be]=Me;class Ue extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.NDOTL=!0,this.CUSTOMUSERLIGHTING=!0,this.CELLBASIC=!0,this.DEPTHPREPASS=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class z extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this._computeHighLevel=!1,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Ue);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.CELLBASIC=!this.computeHighLevel,l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="cell",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix"],g=["diffuseSampler"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights-1}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),H(this._activeEffect,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this._maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return super.hasTexture(e)?!0:this._diffuseTexture===e}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),super.dispose(e)}getClassName(){return"CellMaterial"}clone(e){return A.Clone(()=>new z(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.CellMaterial",e}static Parse(e,t,s){return A.Parse(()=>new z(e.name,t),e,t,s)}}o([_("diffuseTexture")],z.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],z.prototype,"diffuseTexture",void 0);o([I("diffuse")],z.prototype,"diffuseColor",void 0);o([u("computeHighLevel")],z.prototype,"_computeHighLevel",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],z.prototype,"computeHighLevel",void 0);o([u("disableLighting")],z.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],z.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],z.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],z.prototype,"maxSimultaneousLights",void 0);D("BABYLON.CellMaterial",z);class tt{constructor(){}}class we{constructor(){}}class te extends Pe{AttachAfterBind(e,t){if(this._newUniformInstances)for(const s in this._newUniformInstances){const i=s.toString().split("-");i[0]=="vec2"?t.setVector2(i[1],this._newUniformInstances[s]):i[0]=="vec3"?t.setVector3(i[1],this._newUniformInstances[s]):i[0]=="vec4"?t.setVector4(i[1],this._newUniformInstances[s]):i[0]=="mat4"?t.setMatrix(i[1],this._newUniformInstances[s]):i[0]=="float"&&t.setFloat(i[1],this._newUniformInstances[s])}if(this._newSamplerInstances)for(const s in this._newSamplerInstances){const i=s.toString().split("-");i[0]=="sampler2D"&&this._newSamplerInstances[s].isReady&&this._newSamplerInstances[s].isReady()&&t.setTexture(i[1],this._newSamplerInstances[s])}}ReviewUniform(e,t){if(e=="uniform"&&this._newUniforms)for(let s=0;s<this._newUniforms.length;s++)this._customUniform[s].indexOf("sampler")==-1&&t.push(this._newUniforms[s].replace(/\[\d*\]/g,""));if(e=="sampler"&&this._newUniforms)for(let s=0;s<this._newUniforms.length;s++)this._customUniform[s].indexOf("sampler")!=-1&&t.push(this._newUniforms[s].replace(/\[\d*\]/g,""));return t}Builder(e,t,s,i,r,n){if(n&&this._customAttributes&&this._customAttributes.length>0&&n.push(...this._customAttributes),this.ReviewUniform("uniform",t),this.ReviewUniform("sampler",i),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,te.ShaderIndexer++;const f="custom_"+te.ShaderIndexer,a=this._afterBind.bind(this);return this._afterBind=(d,h)=>{if(h){this.AttachAfterBind(d,h);try{a(d,h)}catch{}}},L.ShadersStore[f+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(L.ShadersStore[f+"VertexShader"]=L.ShadersStore[f+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),L.ShadersStore[f+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE",this.CustomParts.Fragment_Custom_Diffuse?this.CustomParts.Fragment_Custom_Diffuse:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:"").replace("#define CUSTOM_FRAGMENT_MAIN_END",this.CustomParts.Fragment_MainEnd?this.CustomParts.Fragment_MainEnd:""),this.CustomParts.Fragment_Before_Fog&&(L.ShadersStore[f+"PixelShader"]=L.ShadersStore[f+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=f,f}constructor(e,t){super(e,t),this.CustomParts=new we,this.customShaderNameResolve=this.Builder,this.FragmentShader=L.ShadersStore.defaultPixelShader,this.VertexShader=L.ShadersStore.defaultVertexShader}AddUniform(e,t,s){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),s&&(t.indexOf("sampler")!=-1?this._newSamplerInstances[t+"-"+e]=s:this._newUniformInstances[t+"-"+e]=s),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this}AddAttribute(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this}Fragment_Begin(e){return this.CustomParts.Fragment_Begin=e,this}Fragment_Definitions(e){return this.CustomParts.Fragment_Definitions=e,this}Fragment_MainBegin(e){return this.CustomParts.Fragment_MainBegin=e,this}Fragment_MainEnd(e){return this.CustomParts.Fragment_MainEnd=e,this}Fragment_Custom_Diffuse(e){return this.CustomParts.Fragment_Custom_Diffuse=e.replace("result","diffuseColor"),this}Fragment_Custom_Alpha(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this}Fragment_Before_Lights(e){return this.CustomParts.Fragment_Before_Lights=e,this}Fragment_Before_Fog(e){return this.CustomParts.Fragment_Before_Fog=e,this}Fragment_Before_FragColor(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this}Vertex_Begin(e){return this.CustomParts.Vertex_Begin=e,this}Vertex_Definitions(e){return this.CustomParts.Vertex_Definitions=e,this}Vertex_MainBegin(e){return this.CustomParts.Vertex_MainBegin=e,this}Vertex_Before_PositionUpdated(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this}Vertex_Before_NormalUpdated(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this}Vertex_After_WorldPosComputed(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this}Vertex_MainEnd(e){return this.CustomParts.Vertex_MainEnd=e,this}}te.ShaderIndexer=1;D("BABYLON.CustomMaterial",te);class Ve{constructor(){}}class se extends ye{AttachAfterBind(e,t){if(this._newUniformInstances)for(const s in this._newUniformInstances){const i=s.toString().split("-");i[0]=="vec2"?t.setVector2(i[1],this._newUniformInstances[s]):i[0]=="vec3"?t.setVector3(i[1],this._newUniformInstances[s]):i[0]=="vec4"?t.setVector4(i[1],this._newUniformInstances[s]):i[0]=="mat4"?t.setMatrix(i[1],this._newUniformInstances[s]):i[0]=="float"&&t.setFloat(i[1],this._newUniformInstances[s])}if(this._newSamplerInstances)for(const s in this._newSamplerInstances){const i=s.toString().split("-");i[0]=="sampler2D"&&this._newSamplerInstances[s].isReady&&this._newSamplerInstances[s].isReady()&&t.setTexture(i[1],this._newSamplerInstances[s])}}ReviewUniform(e,t){if(e=="uniform"&&this._newUniforms)for(let s=0;s<this._newUniforms.length;s++)this._customUniform[s].indexOf("sampler")==-1&&t.push(this._newUniforms[s].replace(/\[\d*\]/g,""));if(e=="sampler"&&this._newUniforms)for(let s=0;s<this._newUniforms.length;s++)this._customUniform[s].indexOf("sampler")!=-1&&t.push(this._newUniforms[s].replace(/\[\d*\]/g,""));return t}Builder(e,t,s,i,r,n,f){if(f){const h=f.processFinalCode;f.processFinalCode=(m,g)=>{if(m==="vertex")return h?h(m,g):g;const p=new le(g);return p.inlineToken="#define pbr_inline",p.processCode(),h?h(m,p.code):p.code}}if(n&&this._customAttributes&&this._customAttributes.length>0&&n.push(...this._customAttributes),this.ReviewUniform("uniform",t),this.ReviewUniform("sampler",i),this._isCreatedShader)return this._createdShaderName;this._isCreatedShader=!1,se.ShaderIndexer++;const a="custom_"+se.ShaderIndexer,d=this._afterBind.bind(this);return this._afterBind=(h,m)=>{if(m){this.AttachAfterBind(h,m);try{d(h,m)}catch{}}},L.ShadersStore[a+"VertexShader"]=this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN",this.CustomParts.Vertex_Begin?this.CustomParts.Vertex_Begin:"").replace("#define CUSTOM_VERTEX_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Vertex_Definitions?this.CustomParts.Vertex_Definitions:"")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN",this.CustomParts.Vertex_MainBegin?this.CustomParts.Vertex_MainBegin:"").replace("#define CUSTOM_VERTEX_UPDATE_POSITION",this.CustomParts.Vertex_Before_PositionUpdated?this.CustomParts.Vertex_Before_PositionUpdated:"").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL",this.CustomParts.Vertex_Before_NormalUpdated?this.CustomParts.Vertex_Before_NormalUpdated:"").replace("#define CUSTOM_VERTEX_MAIN_END",this.CustomParts.Vertex_MainEnd?this.CustomParts.Vertex_MainEnd:""),this.CustomParts.Vertex_After_WorldPosComputed&&(L.ShadersStore[a+"VertexShader"]=L.ShadersStore[a+"VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS",this.CustomParts.Vertex_After_WorldPosComputed)),L.ShadersStore[a+"PixelShader"]=this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN",this.CustomParts.Fragment_Begin?this.CustomParts.Fragment_Begin:"").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN",this.CustomParts.Fragment_MainBegin?this.CustomParts.Fragment_MainBegin:"").replace("#define CUSTOM_FRAGMENT_DEFINITIONS",(this._customUniform?this._customUniform.join(`
`):"")+(this.CustomParts.Fragment_Definitions?this.CustomParts.Fragment_Definitions:"")).replace("#define CUSTOM_FRAGMENT_UPDATE_ALBEDO",this.CustomParts.Fragment_Custom_Albedo?this.CustomParts.Fragment_Custom_Albedo:"").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA",this.CustomParts.Fragment_Custom_Alpha?this.CustomParts.Fragment_Custom_Alpha:"").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS",this.CustomParts.Fragment_Before_Lights?this.CustomParts.Fragment_Before_Lights:"").replace("#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS",this.CustomParts.Fragment_Custom_MetallicRoughness?this.CustomParts.Fragment_Custom_MetallicRoughness:"").replace("#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE",this.CustomParts.Fragment_Custom_MicroSurface?this.CustomParts.Fragment_Custom_MicroSurface:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION",this.CustomParts.Fragment_Before_FinalColorComposition?this.CustomParts.Fragment_Before_FinalColorComposition:"").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",this.CustomParts.Fragment_Before_FragColor?this.CustomParts.Fragment_Before_FragColor:"").replace("#define CUSTOM_FRAGMENT_MAIN_END",this.CustomParts.Fragment_MainEnd?this.CustomParts.Fragment_MainEnd:""),this.CustomParts.Fragment_Before_Fog&&(L.ShadersStore[a+"PixelShader"]=L.ShadersStore[a+"PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG",this.CustomParts.Fragment_Before_Fog)),this._isCreatedShader=!0,this._createdShaderName=a,a}constructor(e,t){super(e,t),this.CustomParts=new Ve,this.customShaderNameResolve=this.Builder,this.FragmentShader=L.ShadersStore.pbrPixelShader,this.VertexShader=L.ShadersStore.pbrVertexShader,this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g,L.IncludesShadersStore.pbrBlockAlbedoOpacity),this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockReflectivity>/g,L.IncludesShadersStore.pbrBlockReflectivity),this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g,L.IncludesShadersStore.pbrBlockFinalColorComposition)}AddUniform(e,t,s){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),s&&(t.indexOf("sampler")!=-1?this._newSamplerInstances[t+"-"+e]=s:this._newUniformInstances[t+"-"+e]=s),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this}AddAttribute(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this}Fragment_Begin(e){return this.CustomParts.Fragment_Begin=e,this}Fragment_Definitions(e){return this.CustomParts.Fragment_Definitions=e,this}Fragment_MainBegin(e){return this.CustomParts.Fragment_MainBegin=e,this}Fragment_Custom_Albedo(e){return this.CustomParts.Fragment_Custom_Albedo=e.replace("result","surfaceAlbedo"),this}Fragment_Custom_Alpha(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this}Fragment_Before_Lights(e){return this.CustomParts.Fragment_Before_Lights=e,this}Fragment_Custom_MetallicRoughness(e){return this.CustomParts.Fragment_Custom_MetallicRoughness=e,this}Fragment_Custom_MicroSurface(e){return this.CustomParts.Fragment_Custom_MicroSurface=e,this}Fragment_Before_Fog(e){return this.CustomParts.Fragment_Before_Fog=e,this}Fragment_Before_FinalColorComposition(e){return this.CustomParts.Fragment_Before_FinalColorComposition=e,this}Fragment_Before_FragColor(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this}Fragment_MainEnd(e){return this.CustomParts.Fragment_MainEnd=e,this}Vertex_Begin(e){return this.CustomParts.Vertex_Begin=e,this}Vertex_Definitions(e){return this.CustomParts.Vertex_Definitions=e,this}Vertex_MainBegin(e){return this.CustomParts.Vertex_MainBegin=e,this}Vertex_Before_PositionUpdated(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this}Vertex_Before_NormalUpdated(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this}Vertex_After_WorldPosComputed(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this}Vertex_MainEnd(e){return this.CustomParts.Vertex_MainEnd=e,this}}se.ShaderIndexer=1;D("BABYLON.PBRCustomMaterial",se);const Be="firePixelShader",Ge=`precision highp float;uniform vec4 vEyePosition;varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
uniform sampler2D distortionSampler;uniform sampler2D opacitySampler;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;varying vec2 vDistortionCoords2;varying vec2 vDistortionCoords3;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
vec4 bx2(vec4 x)
{return vec4(2.0)*x-vec4(1.0);}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);float alpha=1.0;
#ifdef DIFFUSE
const float distortionAmount0 =0.092;const float distortionAmount1 =0.092;const float distortionAmount2 =0.092;vec2 heightAttenuation=vec2(0.3,0.39);vec4 noise0=texture2D(distortionSampler,vDistortionCoords1);vec4 noise1=texture2D(distortionSampler,vDistortionCoords2);vec4 noise2=texture2D(distortionSampler,vDistortionCoords3);vec4 noiseSum=bx2(noise0)*distortionAmount0+bx2(noise1)*distortionAmount1+bx2(noise2)*distortionAmount2;vec4 perturbedBaseCoords=vec4(vDiffuseUV,0.0,1.0)+noiseSum*(vDiffuseUV.y*heightAttenuation.x+heightAttenuation.y);vec4 opacityColor=texture2D(opacitySampler,perturbedBaseCoords.xy);
#ifdef ALPHATEST
if (opacityColor.r<0.1)
discard;
#endif
#include<depthPrePass>
baseColor=texture2D(diffuseSampler,perturbedBaseCoords.xy)*2.0;baseColor*=opacityColor;baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(1.0,1.0,1.0);
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec4 color=vec4(baseColor.rgb,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[Be]=Ge;const ze="fireVertexShader",We=`precision highp float;attribute vec3 position;
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
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
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
uniform float time;uniform float speed;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;varying vec2 vDistortionCoords2;varying vec2 vDistortionCoords3;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef DIFFUSE
vDiffuseUV=uv;vDiffuseUV.y-=0.2;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#ifdef DIFFUSE
vec3 layerSpeed=vec3(-0.2,-0.52,-0.1)*speed;vDistortionCoords1.x=uv.x;vDistortionCoords1.y=uv.y+layerSpeed.x*time/1000.0;vDistortionCoords2.x=uv.x;vDistortionCoords2.y=uv.y+layerSpeed.y*time/1000.0;vDistortionCoords3.x=uv.x;vDistortionCoords3.y=uv.y+layerSpeed.z*time/1000.0;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[ze]=We;class He extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.UV1=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.BonesPerMesh=0,this.NUM_BONE_INFLUENCERS=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class j extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this.speed=1,this._scaledDiffuse=new y,this._lastTime=0}needAlphaBlending(){return!1}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new He);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.ALPHATEST=!!this._opacityTexture,i._areMiscDirty&&(i.POINTSIZE=this.pointsCloud||r.forcePointsCloud,i.FOG=r.fogEnabled&&e.applyFog&&r.fogMode!==w.FOGMODE_NONE&&this.fogEnabled),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!1,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.UV1&&a.push(v.UVKind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="fire",h=["world","view","viewProjection","vEyePosition","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","time","speed"];W(h);const m=i.toString();t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:h,uniformBuffersNames:[],samplers:["diffuseSampler","distortionSampler","opacitySampler"],defines:m,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:null,maxSimultaneousLights:4,transformFeedbackVaryings:null},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene();if(!s.materialDefines)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix()),this._activeEffect.setTexture("distortionSampler",this._distortionTexture),this._activeEffect.setTexture("opacitySampler",this._opacityTexture)),H(this._activeEffect,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._lastTime+=i.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime),this._activeEffect.setFloat("speed",this.speed),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._distortionTexture&&this._distortionTexture.animations&&this._distortionTexture.animations.length>0&&e.push(this._distortionTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),this._distortionTexture&&e.push(this._distortionTexture),this._opacityTexture&&e.push(this._opacityTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._diffuseTexture===e||this._distortionTexture===e||this._opacityTexture===e)}getClassName(){return"FireMaterial"}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),this._distortionTexture&&this._distortionTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new j(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.FireMaterial",e.diffuseColor=this.diffuseColor.asArray(),e.speed=this.speed,this._diffuseTexture&&(e._diffuseTexture=this._diffuseTexture.serialize()),this._distortionTexture&&(e._distortionTexture=this._distortionTexture.serialize()),this._opacityTexture&&(e._opacityTexture=this._opacityTexture.serialize()),e}static Parse(e,t,s){const i=new j(e.name,t);return i.diffuseColor=y.FromArray(e.diffuseColor),i.speed=e.speed,i.alpha=e.alpha,i.id=e.id,he.AddTagsTo(i,e.tags),i.backFaceCulling=e.backFaceCulling,i.wireframe=e.wireframe,e._diffuseTexture&&(i._diffuseTexture=ie.Parse(e._diffuseTexture,t,s)),e._distortionTexture&&(i._distortionTexture=ie.Parse(e._distortionTexture,t,s)),e._opacityTexture&&(i._opacityTexture=ie.Parse(e._opacityTexture,t,s)),i}}o([_("diffuseTexture")],j.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],j.prototype,"diffuseTexture",void 0);o([_("distortionTexture")],j.prototype,"_distortionTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],j.prototype,"distortionTexture",void 0);o([_("opacityTexture")],j.prototype,"_opacityTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],j.prototype,"opacityTexture",void 0);o([I("diffuse")],j.prototype,"diffuseColor",void 0);o([u()],j.prototype,"speed",void 0);D("BABYLON.FireMaterial",j);const ke="furPixelShader",Xe=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;uniform vec4 furColor;uniform float furLength;varying vec3 vPositionW;varying float vfur_length;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#ifdef HIGHLEVEL
uniform float furOffset;uniform float furOcclusion;uniform sampler2D furTexture;varying vec2 vFurUV;
#endif
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<fogFragmentDeclaration>
#include<clipPlaneFragmentDeclaration>
float Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=furColor;vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
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
vec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));if (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {discard;}
float occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);baseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);
#ifdef HIGHLEVEL
vec4 color=vec4(finalDiffuse,alpha);
#else
float r=vfur_length/furLength*0.5;vec4 color=vec4(finalDiffuse*(0.5+r),alpha);
#endif
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[ke]=Xe;const je="furVertexShader",$e=`precision highp float;attribute vec3 position;attribute vec3 normal;
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
#include<bakedVertexAnimationDeclaration>
uniform float furLength;uniform float furAngle;
#ifdef HIGHLEVEL
uniform float furOffset;uniform vec3 furGravity;uniform float furTime;uniform float furSpacing;uniform float furDensity;
#endif
#ifdef HEIGHTMAP
uniform sampler2D heightTexture;
#endif
#ifdef HIGHLEVEL
varying vec2 vFurUV;
#endif
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
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
float Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
vec3 tangent1=vec3(normal.y,-normal.x,0);vec3 tangent2=vec3(-normal.z,0,normal.x);r=Rand(tangent1*r);float J=(2.0+4.0*r);r=Rand(tangent2*r);float K=(2.0+2.0*r);tangent1=tangent1*J+tangent2*K;tangent1=normalize(tangent1);vec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);
#ifdef HIGHLEVEL
vec3 forceDirection=vec3(0.0,0.0,0.0);forceDirection.x=sin(furTime+position.x*0.05)*0.2;forceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;forceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;vec3 displacement=vec3(0.0,0.0,0.0);displacement=furGravity+forceDirection;float displacementFactor=pow(furOffset,3.0);vec3 aNormal=normal;aNormal.xyz+=displacement*displacementFactor;newPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);
#endif
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
gl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);vec4 worldPos=finalWorld*vec4(newPosition,1.0);vPositionW=vec3(worldPos);
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
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
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[je]=$e;class Ze extends V{constructor(){super(),this.DIFFUSE=!1,this.HEIGHTMAP=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.HIGHLEVEL=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class C extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this.furLength=1,this.furAngle=0,this.furColor=new y(.44,.21,.02),this.furOffset=0,this.furSpacing=12,this.furGravity=new G(0,0,0),this.furSpeed=100,this.furDensity=20,this.furOcclusion=0,this._disableLighting=!1,this._maxSimultaneousLights=4,this.highLevelFur=!0,this._furTime=0}get furTime(){return this._furTime}set furTime(e){this._furTime=e}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}updateFur(){for(let e=1;e<this._meshes.length;e++){const t=this._meshes[e].material;t.furLength=this.furLength,t.furAngle=this.furAngle,t.furGravity=this.furGravity,t.furSpacing=this.furSpacing,t.furSpeed=this.furSpeed,t.furColor=this.furColor,t.diffuseTexture=this.diffuseTexture,t.furTexture=this.furTexture,t.highLevelFur=this.highLevelFur,t.furTime=this.furTime,t.furDensity=this.furDensity}}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Ze);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&r.texturesEnabled){if(this.diffuseTexture&&P.DiffuseTextureEnabled)if(this.diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(this.heightTexture&&n.getCaps().maxVertexTextureImageUnits)if(this.heightTexture.isReady())i._needUVs=!0,i.HEIGHTMAP=!0;else return!1}if(this.highLevelFur!==i.HIGHLEVEL&&(i.HIGHLEVEL=!0,i.markAsUnprocessed()),l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="fur",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","furLength","furAngle","furColor","furOffset","furGravity","furTime","furSpacing","furDensity","furOcclusion"];W(m);const g=["diffuseSampler","heightTexture","furTexture"],p=new Array;l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),i.getCachedMaterial()!==this&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),this._heightTexture&&this._activeEffect.setTexture("heightTexture",this._heightTexture),H(this._activeEffect,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._activeEffect.setFloat("furLength",this.furLength),this._activeEffect.setFloat("furAngle",this.furAngle),this._activeEffect.setColor4("furColor",this.furColor,1),this.highLevelFur&&(this._activeEffect.setVector3("furGravity",this.furGravity),this._activeEffect.setFloat("furOffset",this.furOffset),this._activeEffect.setFloat("furSpacing",this.furSpacing),this._activeEffect.setFloat("furDensity",this.furDensity),this._activeEffect.setFloat("furOcclusion",this.furOcclusion),this._furTime+=this.getScene().getEngine().getDeltaTime()/this.furSpeed,this._activeEffect.setFloat("furTime",this._furTime),this._activeEffect.setTexture("furTexture",this.furTexture)),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.heightTexture&&this.heightTexture.animations&&this.heightTexture.animations.length>0&&e.push(this.heightTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),this._heightTexture&&e.push(this._heightTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e||this._heightTexture===e)}dispose(e){if(this.diffuseTexture&&this.diffuseTexture.dispose(),this._meshes)for(let t=1;t<this._meshes.length;t++){const s=this._meshes[t].material;s&&s.dispose(e),this._meshes[t].dispose()}super.dispose(e)}clone(e){return A.Clone(()=>new C(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.FurMaterial",this._meshes&&(e.sourceMeshName=this._meshes[0].name,e.quality=this._meshes.length),e}getClassName(){return"FurMaterial"}static Parse(e,t,s){const i=A.Parse(()=>new C(e.name,t),e,t,s);return e.sourceMeshName&&i.highLevelFur&&t.executeWhenReady(()=>{const r=t.getMeshByName(e.sourceMeshName);if(r){const n=C.GenerateTexture("Fur Texture",t);i.furTexture=n,C.FurifyMesh(r,e.quality)}}),i}static GenerateTexture(e,t){const s=new Ne("FurTexture "+e,256,t,!0),i=s.getContext();for(let r=0;r<2e4;++r)i.fillStyle="rgba(255, "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", 1)",i.fillRect(Math.random()*s.getSize().width,Math.random()*s.getSize().height,2,2);return s.update(!1),s.wrapU=ie.WRAP_ADDRESSMODE,s.wrapV=ie.WRAP_ADDRESSMODE,s}static FurifyMesh(e,t){const s=[e],i=e.material;let r;if(!(i instanceof C))throw"The material of the source mesh must be a Fur Material";for(r=1;r<t;r++){const n=new C(i.name+r,e.getScene());e.getScene().materials.pop(),he.EnableFor(n),he.AddTagsTo(n,"furShellMaterial"),n.furLength=i.furLength,n.furAngle=i.furAngle,n.furGravity=i.furGravity,n.furSpacing=i.furSpacing,n.furSpeed=i.furSpeed,n.furColor=i.furColor,n.diffuseTexture=i.diffuseTexture,n.furOffset=r/t,n.furTexture=i.furTexture,n.highLevelFur=i.highLevelFur,n.furTime=i.furTime,n.furDensity=i.furDensity;const f=e.clone(e.name+r);f.material=n,f.skeleton=e.skeleton,f.position=G.Zero(),s.push(f)}for(r=1;r<s.length;r++)s[r].parent=e;return e.material._meshes=s,s}}o([_("diffuseTexture")],C.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],C.prototype,"diffuseTexture",void 0);o([_("heightTexture")],C.prototype,"_heightTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],C.prototype,"heightTexture",void 0);o([I()],C.prototype,"diffuseColor",void 0);o([u()],C.prototype,"furLength",void 0);o([u()],C.prototype,"furAngle",void 0);o([I()],C.prototype,"furColor",void 0);o([u()],C.prototype,"furOffset",void 0);o([u()],C.prototype,"furSpacing",void 0);o([re()],C.prototype,"furGravity",void 0);o([u()],C.prototype,"furSpeed",void 0);o([u()],C.prototype,"furDensity",void 0);o([u()],C.prototype,"furOcclusion",void 0);o([u("disableLighting")],C.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],C.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],C.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],C.prototype,"maxSimultaneousLights",void 0);o([u()],C.prototype,"highLevelFur",void 0);o([u()],C.prototype,"furTime",null);D("BABYLON.FurMaterial",C);const Ye="gradientPixelShader",Ke=`precision highp float;
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;
vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[Ye]=Ke;const qe="gradientVertexShader",Qe=`precision highp float;
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
#include<bakedVertexAnimationDeclaration>
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[qe]=Qe;class Je extends V{constructor(){super(),this.EMISSIVE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class b extends B{constructor(e,t){super(e,t),this._maxSimultaneousLights=4,this.topColor=new y(1,0,0),this.topColorAlpha=1,this.bottomColor=new y(0,0,1),this.bottomColorAlpha=1,this.offset=0,this.scale=1,this.smoothness=1,this._disableLighting=!1}needAlphaBlending(){return this.alpha<1||this.topColorAlpha<1||this.bottomColorAlpha<1}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Je);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),i.EMISSIVE=this._disableLighting,l.PrepareDefinesForAttributes(e,i,!1,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="gradient",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","mBones","topColor","bottomColor","offset","smoothness","scale"];W(m);const g=[],p=new Array;l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:4}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,n),this._mustRebind(i,n)&&(H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._activeEffect.setColor4("topColor",this.topColor,this.topColorAlpha),this._activeEffect.setColor4("bottomColor",this.bottomColor,this.bottomColorAlpha),this._activeEffect.setFloat("offset",this.offset),this._activeEffect.setFloat("scale",this.scale),this._activeEffect.setFloat("smoothness",this.smoothness),this._afterBind(t,this._activeEffect))}getAnimatables(){return[]}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new b(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GradientMaterial",e}getClassName(){return"GradientMaterial"}static Parse(e,t,s){return A.Parse(()=>new b(e.name,t),e,t,s)}}o([u("maxSimultaneousLights")],b.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],b.prototype,"maxSimultaneousLights",void 0);o([I()],b.prototype,"topColor",void 0);o([u()],b.prototype,"topColorAlpha",void 0);o([I()],b.prototype,"bottomColor",void 0);o([u()],b.prototype,"bottomColorAlpha",void 0);o([u()],b.prototype,"offset",void 0);o([u()],b.prototype,"scale",void 0);o([u()],b.prototype,"smoothness",void 0);o([u("disableLighting")],b.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],b.prototype,"disableLighting",void 0);D("BABYLON.GradientMaterial",b);const ei="gridPixelShader",ii=`#extension GL_OES_standard_derivatives : enable
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
if (floor(position+0.5)==floor(position/majorGridFrequency+0.5)*majorGridFrequency)
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
float gridRatio=gridControl.x;
vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;
float x=contributionOnAxis(gridPos.x);
float y=contributionOnAxis(gridPos.y);
float z=contributionOnAxis(gridPos.z);
vec3 normal=normalize(vNormal);
x*=normalImpactOnAxis(normal.x);
y*=normalImpactOnAxis(normal.y);
z*=normalImpactOnAxis(normal.z);
#ifdef MAX_LINE 
float grid=clamp(max(max(x,y),z),0.,1.);
#else
float grid=clamp(x+y+z,0.,1.);
#endif
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
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[ei]=ii;const ti="gridVertexShader",si=`precision highp float;
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
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
if (vOpacityInfos.x==0.)
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
#define CUSTOM_VERTEX_MAIN_END
}`;E.ShadersStore[ti]=si;class ri extends V{constructor(){super(),this.OPACITY=!1,this.TRANSPARENT=!1,this.FOG=!1,this.PREMULTIPLYALPHA=!1,this.MAX_LINE=!1,this.UV1=!1,this.UV2=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class M extends B{constructor(e,t){super(e,t),this.mainColor=y.Black(),this.lineColor=y.Teal(),this.gridRatio=1,this.gridOffset=G.Zero(),this.majorUnitFrequency=10,this.minorUnitVisibility=.33,this.opacity=1,this.preMultiplyAlpha=!1,this.useMaxLine=!1,this._gridControl=new Se(this.gridRatio,this.majorUnitFrequency,this.minorUnitVisibility,this.opacity)}needAlphaBlending(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()}needAlphaBlendingForMesh(e){return e.visibility<1||this.needAlphaBlending()}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new ri);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(i.TRANSPARENT!==this.opacity<1&&(i.TRANSPARENT=!i.TRANSPARENT,i.markAsUnprocessed()),i.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(i.PREMULTIPLYALPHA=!i.PREMULTIPLYALPHA,i.markAsUnprocessed()),i.MAX_LINE!==this.useMaxLine&&(i.MAX_LINE=!i.MAX_LINE,i.markAsUnprocessed()),i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled&&this._opacityTexture&&P.OpacityTextureEnabled))if(this._opacityTexture.isReady())i._needUVs=!0,i.OPACITY=!0;else return!1;if(l.PrepareDefinesForMisc(e,r,!1,!1,this.fogEnabled,!1,i),l.PrepareDefinesForFrameBoundValues(r,r.getEngine(),this,i,!!s),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial(),l.PrepareDefinesForAttributes(e,i,!1,!1);const n=[v.PositionKind,v.NormalKind];i.UV1&&n.push(v.UVKind),i.UV2&&n.push(v.UV2Kind),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess,l.PrepareAttributesForInstances(n,i);const f=i.toString();t.setEffect(r.getEngine().createEffect("grid",n,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility"],["opacitySampler"],f,void 0,this.onCompiled,this.onError),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this._activeEffect.setFloat("visibility",t.visibility),(!r.INSTANCES||r.THIN_INSTANCE)&&this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",i.getViewMatrix()),this._activeEffect.setMatrix("projection",i.getProjectionMatrix()),this._mustRebind(i,n)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&P.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix()))),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new M(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GridMaterial",e}getClassName(){return"GridMaterial"}static Parse(e,t,s){return A.Parse(()=>new M(e.name,t),e,t,s)}}o([I()],M.prototype,"mainColor",void 0);o([I()],M.prototype,"lineColor",void 0);o([u()],M.prototype,"gridRatio",void 0);o([re()],M.prototype,"gridOffset",void 0);o([u()],M.prototype,"majorUnitFrequency",void 0);o([u()],M.prototype,"minorUnitVisibility",void 0);o([u()],M.prototype,"opacity",void 0);o([u()],M.prototype,"preMultiplyAlpha",void 0);o([u()],M.prototype,"useMaxLine",void 0);o([_("opacityTexture")],M.prototype,"_opacityTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],M.prototype,"opacityTexture",void 0);D("BABYLON.GridMaterial",M);const oi="lavaPixelShader",ni=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;varying vec3 vPositionW;uniform float time;uniform float speed;uniform float movingSpeed;uniform vec3 fogColor;uniform sampler2D noiseTexture;uniform float fogDensity;varying float noise;
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
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
float random( vec3 scale,float seed ){return fract( sin( dot( gl_FragCoord.xyz+seed,scale ) )*43758.5453+seed ) ;}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
vec4 noiseTex=texture2D( noiseTexture,vDiffuseUV );vec2 T1=vDiffuseUV+vec2( 1.5,-1.5 )*time *0.02;vec2 T2=vDiffuseUV+vec2( -0.5,2.0 )*time*0.01*speed;T1.x+=noiseTex.x*2.0;T1.y+=noiseTex.y*2.0;T2.x-=noiseTex.y*0.2+time*0.001*movingSpeed;T2.y+=noiseTex.z*0.2+time*0.002*movingSpeed;float p=texture2D( noiseTexture,T1*3.0 ).a;vec4 lavaColor=texture2D( diffuseSampler,T2*4.0);vec4 temp=lavaColor*( vec4( p,p,p,p )*2. )+( lavaColor*lavaColor-0.1 );baseColor=temp;float depth=gl_FragCoord.z*4.0;const float LOG2=1.442695;float fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2 );fogFactor=1.0-clamp( fogFactor,0.0,1.0 );baseColor=mix( baseColor,vec4( fogColor,baseColor.w ),fogFactor );diffuseColor=baseColor.rgb;
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
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;
#include<lightFragment>[0]
#include<lightFragment>[1]
#include<lightFragment>[2]
#include<lightFragment>[3]
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[oi]=ni;const ai="lavaVertexShader",fi=`precision highp float;uniform float time;uniform float lowFrequencySpeed;varying float noise;attribute vec3 position;
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
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
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
/* NOISE FUNCTIONS */
vec3 mod289(vec3 x)
{return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x)
{return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x)
{return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r)
{return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float pnoise(vec3 P,vec3 rep)
{vec3 Pi0=mod(floor(P),rep); 
vec3 Pi1=mod(Pi0+vec3(1.0),rep); 
Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P); 
vec3 Pf1=Pf0-vec3(1.0); 
vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);vec4 gx0=ixy0*(1.0/7.0);vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1*(1.0/7.0);vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}
/* END FUNCTION */
float turbulence( vec3 p ) {float w=100.0;float t=-.5;for (float f=1.0 ; f<=10.0 ; f++ ){float power=pow( 2.0,f );t+=abs( pnoise( vec3( power*p ),vec3( 10.0,10.0,10.0 ) )/power );}
return t;}
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
#ifdef NORMAL
noise=10.0* -.10*turbulence( .5*normal+time*1.15 );float b=lowFrequencySpeed*5.0*pnoise( 0.05*position +vec3(time*1.025),vec3( 100.0 ) );float displacement=- 1.5*noise+b;vec3 newPosition=position+normal*displacement;gl_Position=viewProjection*finalWorld*vec4( newPosition,1.0 );vec4 worldPos=finalWorld*vec4(newPosition,1.0);vPositionW=vec3(worldPos);vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}`;E.ShadersStore[ai]=fi;class li extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.LIGHT0=!1,this.LIGHT1=!1,this.LIGHT2=!1,this.LIGHT3=!1,this.SPOTLIGHT0=!1,this.SPOTLIGHT1=!1,this.SPOTLIGHT2=!1,this.SPOTLIGHT3=!1,this.HEMILIGHT0=!1,this.HEMILIGHT1=!1,this.HEMILIGHT2=!1,this.HEMILIGHT3=!1,this.DIRLIGHT0=!1,this.DIRLIGHT1=!1,this.DIRLIGHT2=!1,this.DIRLIGHT3=!1,this.POINTLIGHT0=!1,this.POINTLIGHT1=!1,this.POINTLIGHT2=!1,this.POINTLIGHT3=!1,this.SHADOW0=!1,this.SHADOW1=!1,this.SHADOW2=!1,this.SHADOW3=!1,this.SHADOWS=!1,this.SHADOWESM0=!1,this.SHADOWESM1=!1,this.SHADOWESM2=!1,this.SHADOWESM3=!1,this.SHADOWPOISSON0=!1,this.SHADOWPOISSON1=!1,this.SHADOWPOISSON2=!1,this.SHADOWPOISSON3=!1,this.SHADOWPCF0=!1,this.SHADOWPCF1=!1,this.SHADOWPCF2=!1,this.SHADOWPCF3=!1,this.SHADOWPCSS0=!1,this.SHADOWPCSS1=!1,this.SHADOWPCSS2=!1,this.SHADOWPCSS3=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.UNLIT=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class O extends B{constructor(e,t){super(e,t),this.speed=1,this.movingSpeed=1,this.lowFrequencySpeed=1,this.fogDensity=.15,this._lastTime=0,this.diffuseColor=new y(1,1,1),this._disableLighting=!1,this._unlit=!1,this._maxSimultaneousLights=4,this._scaledDiffuse=new y}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new li);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="lava",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","time","speed","movingSpeed","fogColor","fogDensity","lowFrequencySpeed"];W(m);const g=["diffuseSampler","noiseTexture"],p=new Array;l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,r.UNLIT=this._unlit,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this.diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),this.noiseTexture&&this._activeEffect.setTexture("noiseTexture",this.noiseTexture),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._lastTime+=i.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime*this.speed/1e3),this.fogColor||(this.fogColor=y.Black()),this._activeEffect.setColor3("fogColor",this.fogColor),this._activeEffect.setFloat("fogDensity",this.fogDensity),this._activeEffect.setFloat("lowFrequencySpeed",this.lowFrequencySpeed),this._activeEffect.setFloat("movingSpeed",this.movingSpeed),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.noiseTexture&&this.noiseTexture.animations&&this.noiseTexture.animations.length>0&&e.push(this.noiseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this.diffuseTexture&&this.diffuseTexture.dispose(),this.noiseTexture&&this.noiseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new O(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.LavaMaterial",e}getClassName(){return"LavaMaterial"}static Parse(e,t,s){return A.Parse(()=>new O(e.name,t),e,t,s)}}o([_("diffuseTexture")],O.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],O.prototype,"diffuseTexture",void 0);o([_()],O.prototype,"noiseTexture",void 0);o([I()],O.prototype,"fogColor",void 0);o([u()],O.prototype,"speed",void 0);o([u()],O.prototype,"movingSpeed",void 0);o([u()],O.prototype,"lowFrequencySpeed",void 0);o([u()],O.prototype,"fogDensity",void 0);o([I()],O.prototype,"diffuseColor",void 0);o([u("disableLighting")],O.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],O.prototype,"disableLighting",void 0);o([u("unlit")],O.prototype,"_unlit",void 0);o([c("_markAllSubMeshesAsLightsDirty")],O.prototype,"unlit",void 0);o([u("maxSimultaneousLights")],O.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],O.prototype,"maxSimultaneousLights",void 0);D("BABYLON.LavaMaterial",O);const ui="mixPixelShader",di=`precision highp float;
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[ui]=di;const ci="mixVertexShader",hi=`precision highp float;attribute vec3 position;
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
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform mat4 textureMatrix;uniform vec2 vTextureInfos;
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
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
if (vTextureInfos.x==0.)
{vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));}
else
{vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[ci]=hi;class mi extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.MIXMAP2=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class S extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this.specularColor=new y(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new mi);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(r.texturesEnabled&&(!this._mixTexture1||!this._mixTexture1.isReady()||(i._needUVs=!0,P.DiffuseTextureEnabled&&(!this._diffuseTexture1||!this._diffuseTexture1.isReady()||(i.DIFFUSE=!0,!this._diffuseTexture2||!this._diffuseTexture2.isReady())||!this._diffuseTexture3||!this._diffuseTexture3.isReady()||!this._diffuseTexture4||!this._diffuseTexture4.isReady()||this._mixTexture2&&(!this._mixTexture2.isReady()||(i.MIXMAP2=!0,!this._diffuseTexture5||!this._diffuseTexture5.isReady())||!this._diffuseTexture6||!this._diffuseTexture6.isReady()||!this._diffuseTexture7||!this._diffuseTexture7.isReady()||!this._diffuseTexture8||!this._diffuseTexture8.isReady())))))return!1;if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="mix",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos","diffuse4Infos","diffuse5Infos","diffuse6Infos","diffuse7Infos","diffuse8Infos"],g=["mixMap1Sampler","mixMap2Sampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","diffuse4Sampler","diffuse5Sampler","diffuse6Sampler","diffuse7Sampler","diffuse8Sampler"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this._mixTexture1&&(this._activeEffect.setTexture("mixMap1Sampler",this._mixTexture1),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture1.coordinatesIndex,this._mixTexture1.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture1.getTextureMatrix()),P.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale)),this._diffuseTexture4&&(this._activeEffect.setTexture("diffuse4Sampler",this._diffuseTexture4),this._activeEffect.setFloat2("diffuse4Infos",this._diffuseTexture4.uScale,this._diffuseTexture4.vScale)))),this._mixTexture2&&(this._activeEffect.setTexture("mixMap2Sampler",this._mixTexture2),P.DiffuseTextureEnabled&&(this._diffuseTexture5&&(this._activeEffect.setTexture("diffuse5Sampler",this._diffuseTexture5),this._activeEffect.setFloat2("diffuse5Infos",this._diffuseTexture5.uScale,this._diffuseTexture5.vScale)),this._diffuseTexture6&&(this._activeEffect.setTexture("diffuse6Sampler",this._diffuseTexture6),this._activeEffect.setFloat2("diffuse6Infos",this._diffuseTexture6.uScale,this._diffuseTexture6.vScale)),this._diffuseTexture7&&(this._activeEffect.setTexture("diffuse7Sampler",this._diffuseTexture7),this._activeEffect.setFloat2("diffuse7Infos",this._diffuseTexture7.uScale,this._diffuseTexture7.vScale)),this._diffuseTexture8&&(this._activeEffect.setTexture("diffuse8Sampler",this._diffuseTexture8),this._activeEffect.setFloat2("diffuse8Infos",this._diffuseTexture8.uScale,this._diffuseTexture8.vScale)))),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),r.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this._mixTexture1&&this._mixTexture1.animations&&this._mixTexture1.animations.length>0&&e.push(this._mixTexture1),this._mixTexture2&&this._mixTexture2.animations&&this._mixTexture2.animations.length>0&&e.push(this._mixTexture2),e}getActiveTextures(){const e=super.getActiveTextures();return this._mixTexture1&&e.push(this._mixTexture1),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._diffuseTexture4&&e.push(this._diffuseTexture4),this._mixTexture2&&e.push(this._mixTexture2),this._diffuseTexture5&&e.push(this._diffuseTexture5),this._diffuseTexture6&&e.push(this._diffuseTexture6),this._diffuseTexture7&&e.push(this._diffuseTexture7),this._diffuseTexture8&&e.push(this._diffuseTexture8),e}hasTexture(e){return!!(super.hasTexture(e)||this._mixTexture1===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._diffuseTexture4===e||this._mixTexture2===e||this._diffuseTexture5===e||this._diffuseTexture6===e||this._diffuseTexture7===e||this._diffuseTexture8===e)}dispose(e){this._mixTexture1&&this._mixTexture1.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new S(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.MixMaterial",e}getClassName(){return"MixMaterial"}static Parse(e,t,s){return A.Parse(()=>new S(e.name,t),e,t,s)}}o([_("mixTexture1")],S.prototype,"_mixTexture1",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"mixTexture1",void 0);o([_("mixTexture2")],S.prototype,"_mixTexture2",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"mixTexture2",void 0);o([_("diffuseTexture1")],S.prototype,"_diffuseTexture1",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture1",void 0);o([_("diffuseTexture2")],S.prototype,"_diffuseTexture2",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture2",void 0);o([_("diffuseTexture3")],S.prototype,"_diffuseTexture3",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture3",void 0);o([_("diffuseTexture4")],S.prototype,"_diffuseTexture4",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture4",void 0);o([_("diffuseTexture1")],S.prototype,"_diffuseTexture5",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture5",void 0);o([_("diffuseTexture2")],S.prototype,"_diffuseTexture6",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture6",void 0);o([_("diffuseTexture3")],S.prototype,"_diffuseTexture7",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture7",void 0);o([_("diffuseTexture4")],S.prototype,"_diffuseTexture8",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture8",void 0);o([I()],S.prototype,"diffuseColor",void 0);o([I()],S.prototype,"specularColor",void 0);o([u()],S.prototype,"specularPower",void 0);o([u("disableLighting")],S.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],S.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],S.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],S.prototype,"maxSimultaneousLights",void 0);D("BABYLON.MixMaterial",S);const vi="normalPixelShader",pi=`precision highp float;
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
vec3 finalDiffuse= baseColor.rgb;
#endif
vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[vi]=pi;const gi="normalVertexShader",_i=`precision highp float;
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
#include<bakedVertexAnimationDeclaration>
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
if (vDiffuseInfos.x==0.)
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
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[gi]=_i;class Ti extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.LIGHT0=!1,this.LIGHT1=!1,this.LIGHT2=!1,this.LIGHT3=!1,this.SPOTLIGHT0=!1,this.SPOTLIGHT1=!1,this.SPOTLIGHT2=!1,this.SPOTLIGHT3=!1,this.HEMILIGHT0=!1,this.HEMILIGHT1=!1,this.HEMILIGHT2=!1,this.HEMILIGHT3=!1,this.DIRLIGHT0=!1,this.DIRLIGHT1=!1,this.DIRLIGHT2=!1,this.DIRLIGHT3=!1,this.POINTLIGHT0=!1,this.POINTLIGHT1=!1,this.POINTLIGHT2=!1,this.POINTLIGHT3=!1,this.SHADOW0=!1,this.SHADOW1=!1,this.SHADOW2=!1,this.SHADOW3=!1,this.SHADOWS=!1,this.SHADOWESM0=!1,this.SHADOWESM1=!1,this.SHADOWESM2=!1,this.SHADOWESM3=!1,this.SHADOWPOISSON0=!1,this.SHADOWPOISSON1=!1,this.SHADOWPOISSON2=!1,this.SHADOWPOISSON3=!1,this.SHADOWPCF0=!1,this.SHADOWPCF1=!1,this.SHADOWPCF2=!1,this.SHADOWPCF3=!1,this.SHADOWPCSS0=!1,this.SHADOWPCSS1=!1,this.SHADOWPCSS2=!1,this.SHADOWPCSS3=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.LIGHTING=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class $ extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaBlendingForMesh(e){return this.needAlphaBlending()||e.visibility<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Ti);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),i.LIGHTING=!this._disableLighting,l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="normal",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix"],g=["diffuseSampler"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:4}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this.diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this.diffuseTexture&&this.diffuseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new $(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.NormalMaterial",e}getClassName(){return"NormalMaterial"}static Parse(e,t,s){return A.Parse(()=>new $(e.name,t),e,t,s)}}o([_("diffuseTexture")],$.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],$.prototype,"diffuseTexture",void 0);o([I()],$.prototype,"diffuseColor",void 0);o([u("disableLighting")],$.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],$.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],$.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],$.prototype,"maxSimultaneousLights",void 0);D("BABYLON.NormalMaterial",$);const xi="shadowOnlyPixelShader",Si=`precision highp float;
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[xi]=Si;const Ei="shadowOnlyVertexShader",Ci=`precision highp float;
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[Ei]=Ci;class Pi extends V{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class fe extends B{constructor(e,t){super(e,t),this._needAlphaBlending=!0,this.shadowColor=y.Black()}needAlphaBlending(){return this._needAlphaBlending}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}get activeLight(){return this._activeLight}set activeLight(e){this._activeLight=e}_getFirstShadowLightForMesh(e){for(const t of e.lightSources)if(t.shadowEnabled)return t;return null}isReadyForSubMesh(e,t,s){var i;if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Pi);const r=t.materialDefines,n=this.getScene();if(this._isReadyForSubMesh(t))return!0;const f=n.getEngine();if(this._activeLight){for(const d of e.lightSources)if(d.shadowEnabled){if(this._activeLight===d)break;const h=e.lightSources.indexOf(this._activeLight);h!==-1&&(e.lightSources.splice(h,1),e.lightSources.splice(0,0,this._activeLight));break}}l.PrepareDefinesForFrameBoundValues(n,f,this,r,!!s),l.PrepareDefinesForMisc(e,n,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),r),r._needNormals=l.PrepareDefinesForLights(n,e,r,!1,1);const a=(i=this._getFirstShadowLightForMesh(e))===null||i===void 0?void 0:i.getShadowGenerator();if(this._needAlphaBlending=!0,a&&a.getClassName&&a.getClassName()==="CascadedShadowGenerator"){const d=a;this._needAlphaBlending=!d.autoCalcDepthBounds}if(l.PrepareDefinesForAttributes(e,r,!1,!0),r.isDirty){r.markAsProcessed(),n.resetCachedMaterial();const d=new k;r.FOG&&d.addFallback(1,"FOG"),l.HandleFallbacksForShadows(r,d,1),r.NUM_BONE_INFLUENCERS>0&&d.addCPUSkinningFallback(0,e),r.IMAGEPROCESSINGPOSTPROCESS=n.imageProcessingConfiguration.applyByPostProcess;const h=[v.PositionKind];r.NORMAL&&h.push(v.NormalKind),l.PrepareAttributesForBones(h,e,r,d),l.PrepareAttributesForInstances(h,r);const m="shadowOnly",g=r.toString(),p=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones"],X=new Array,Y=new Array;W(p),l.PrepareUniformsAndSamplersList({uniformsNames:p,uniformBuffersNames:Y,samplers:X,defines:r,maxSimultaneousLights:1}),t.setEffect(n.getEngine().createEffect(m,{attributes:h,uniformsNames:p,uniformBuffersNames:Y,samplers:X,defines:g,fallbacks:d,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},f),r,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(r._renderId=n.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;if(n){if(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),i.bindEyePosition(n)),i.lightsEnabled){l.BindLights(i,t,this._activeEffect,r,1);const f=this._getFirstShadowLightForMesh(t);f&&(f._renderId=-1)}(i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE||r.SHADOWCSM0)&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect)}}clone(e){return A.Clone(()=>new fe(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.ShadowOnlyMaterial",e}getClassName(){return"ShadowOnlyMaterial"}static Parse(e,t,s){return A.Parse(()=>new fe(e.name,t),e,t,s)}}D("BABYLON.ShadowOnlyMaterial",fe);const Ai="simplePixelShader",yi=`precision highp float;
uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;
vec4 color=vec4(finalDiffuse,alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;E.ShadersStore[Ai]=yi;const Ni="simpleVertexShader",Fi=`precision highp float;
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
#include<bakedVertexAnimationDeclaration>
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
if (vDiffuseInfos.x==0.)
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
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[Ni]=Fi;class Ii extends V{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class Z extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Ii);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="simple",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix"],g=["diffuseSampler"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights-1}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new Z(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.SimpleMaterial",e}getClassName(){return"SimpleMaterial"}static Parse(e,t,s){return A.Parse(()=>new Z(e.name,t),e,t,s)}}o([_("diffuseTexture")],Z.prototype,"_diffuseTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],Z.prototype,"diffuseTexture",void 0);o([I("diffuse")],Z.prototype,"diffuseColor",void 0);o([u("disableLighting")],Z.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],Z.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],Z.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],Z.prototype,"maxSimultaneousLights",void 0);D("BABYLON.SimpleMaterial",Z);const Li="skyPixelShader",Oi=`precision highp float;
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
#if DITHER
#include<helperFunctions>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
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
/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
float alpha=1.0;
#ifdef VERTEXCOLOR
retColor.rgb*=vColor.rgb;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#if DITHER
retColor.rgb+=dither(gl_FragCoord.xy,0.5);
#endif
vec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[Li]=Oi;const Ri="skyVertexShader",Di=`precision highp float;
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
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
gl_Position=viewProjection*world*vec4(position,1.0);
vec4 worldPos=world*vec4(position,1.0);
vPositionW=vec3(worldPos);
#include<clipPlaneVertex>
#include<fogVertex>
#ifdef VERTEXCOLOR
vColor=color;
#endif
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[Ri]=Di;class bi extends V{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.DITHER=!1,this.rebuild()}}class R extends B{constructor(e,t){super(e,t),this.luminance=1,this.turbidity=10,this.rayleigh=2,this.mieCoefficient=.005,this.mieDirectionalG=.8,this.distance=500,this.inclination=.49,this.azimuth=.25,this.sunPosition=new G(0,100,0),this.useSunPosition=!1,this.cameraOffset=G.Zero(),this.up=G.Up(),this.dithering=!1,this._cameraPosition=G.Zero(),this._skyOrientation=new ve}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady)return!0;t.materialDefines||(t.materialDefines=new bi);const s=t.materialDefines,i=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(l.PrepareDefinesForMisc(e,i,!1,this.pointsCloud,this.fogEnabled,!1,s),l.PrepareDefinesForAttributes(e,s,!0,!1),s.IMAGEPROCESSINGPOSTPROCESS!==i.imageProcessingConfiguration.applyByPostProcess&&s.markAsMiscDirty(),s.DITHER!==this.dithering&&s.markAsMiscDirty(),s.isDirty){s.markAsProcessed(),i.resetCachedMaterial();const r=new k;s.FOG&&r.addFallback(1,"FOG"),s.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess,s.DITHER=this.dithering;const n=[v.PositionKind];s.VERTEXCOLOR&&n.push(v.ColorKind);const f="sky",a=["world","viewProjection","view","vFogInfos","vFogColor","pointSize","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset","up"];W(a);const d=s.toString();t.setEffect(i.getEngine().createEffect(f,n,a,[],d,r,this.onCompiled,this.onError),s,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(s._renderId=i.getRenderId(),t.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(e,t,s){const i=this.getScene();if(!s.materialDefines)return;const n=s.effect;if(!n)return;this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),this._mustRebind(i,n)&&(H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize)),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect);const f=i.activeCamera;if(f){const a=f.getWorldMatrix();this._cameraPosition.x=a.m[12],this._cameraPosition.y=a.m[13],this._cameraPosition.z=a.m[14],this._activeEffect.setVector3("cameraPosition",this._cameraPosition)}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this._activeEffect.setVector3("up",this.up),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){const a=Math.PI*(this.inclination-.5),d=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(d)*Math.cos(a),this.sunPosition.y=this.distance*Math.sin(-a),this.sunPosition.z=this.distance*Math.sin(d)*Math.cos(a),ve.FromUnitVectorsToRef(G.UpReadOnly,this.up,this._skyOrientation),this.sunPosition.rotateByQuaternionToRef(this._skyOrientation,this.sunPosition)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(t,this._activeEffect)}getAnimatables(){return[]}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new R(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.SkyMaterial",e}getClassName(){return"SkyMaterial"}static Parse(e,t,s){return A.Parse(()=>new R(e.name,t),e,t,s)}}o([u()],R.prototype,"luminance",void 0);o([u()],R.prototype,"turbidity",void 0);o([u()],R.prototype,"rayleigh",void 0);o([u()],R.prototype,"mieCoefficient",void 0);o([u()],R.prototype,"mieDirectionalG",void 0);o([u()],R.prototype,"distance",void 0);o([u()],R.prototype,"inclination",void 0);o([u()],R.prototype,"azimuth",void 0);o([re()],R.prototype,"sunPosition",void 0);o([u()],R.prototype,"useSunPosition",void 0);o([re()],R.prototype,"cameraOffset",void 0);o([re()],R.prototype,"up",void 0);o([u()],R.prototype,"dithering",void 0);D("BABYLON.SkyMaterial",R);const Mi="terrainPixelShader",Ui=`precision highp float;
uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[Mi]=Ui;const wi="terrainVertexShader",Vi=`precision highp float;attribute vec3 position;
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
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform mat4 textureMatrix;uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
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
if (vTextureInfos.x==0.)
{vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));}
else
{vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[wi]=Vi;class Bi extends V{constructor(){super(),this.DIFFUSE=!1,this.BUMP=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class N extends B{constructor(e,t){super(e,t),this.diffuseColor=new y(1,1,1),this.specularColor=new y(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Bi);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(r.texturesEnabled){if(!this.mixTexture||!this.mixTexture.isReady())return!1;if(i._needUVs=!0,P.DiffuseTextureEnabled){if(!this.diffuseTexture1||!this.diffuseTexture1.isReady()||!this.diffuseTexture2||!this.diffuseTexture2.isReady()||!this.diffuseTexture3||!this.diffuseTexture3.isReady())return!1;i.DIFFUSE=!0}if(this.bumpTexture1&&this.bumpTexture2&&this.bumpTexture3&&P.BumpTextureEnabled){if(!this.bumpTexture1.isReady()||!this.bumpTexture2.isReady()||!this.bumpTexture3.isReady())return!1;i._needNormals=!0,i.BUMP=!0}}if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="terrain",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos"],g=["textureSampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","bump1Sampler","bump2Sampler","bump3Sampler"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this.mixTexture&&(this._activeEffect.setTexture("textureSampler",this._mixTexture),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture.coordinatesIndex,this._mixTexture.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture.getTextureMatrix()),P.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale))),P.BumpTextureEnabled&&i.getEngine().getCaps().standardDerivatives&&(this._bumpTexture1&&this._activeEffect.setTexture("bump1Sampler",this._bumpTexture1),this._bumpTexture2&&this._activeEffect.setTexture("bump2Sampler",this._bumpTexture2),this._bumpTexture3&&this._activeEffect.setTexture("bump3Sampler",this._bumpTexture3))),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),r.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._mixTexture&&e.push(this._mixTexture),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._bumpTexture1&&e.push(this._bumpTexture1),this._bumpTexture2&&e.push(this._bumpTexture2),this._bumpTexture3&&e.push(this._bumpTexture3),e}hasTexture(e){return!!(super.hasTexture(e)||this._mixTexture===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._bumpTexture1===e||this._bumpTexture2===e||this._bumpTexture3===e)}dispose(e){this.mixTexture&&this.mixTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new N(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.TerrainMaterial",e}getClassName(){return"TerrainMaterial"}static Parse(e,t,s){return A.Parse(()=>new N(e.name,t),e,t,s)}}o([_("mixTexture")],N.prototype,"_mixTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"mixTexture",void 0);o([_("diffuseTexture1")],N.prototype,"_diffuseTexture1",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture1",void 0);o([_("diffuseTexture2")],N.prototype,"_diffuseTexture2",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture2",void 0);o([_("diffuseTexture3")],N.prototype,"_diffuseTexture3",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture3",void 0);o([_("bumpTexture1")],N.prototype,"_bumpTexture1",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture1",void 0);o([_("bumpTexture2")],N.prototype,"_bumpTexture2",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture2",void 0);o([_("bumpTexture3")],N.prototype,"_bumpTexture3",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture3",void 0);o([I()],N.prototype,"diffuseColor",void 0);o([I()],N.prototype,"specularColor",void 0);o([u()],N.prototype,"specularPower",void 0);o([u("disableLighting")],N.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],N.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],N.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],N.prototype,"maxSimultaneousLights",void 0);D("BABYLON.TerrainMaterial",N);const Gi="triplanarPixelShader",zi=`precision highp float;
uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[Gi]=zi;const Wi="triplanarVertexShader",Hi=`precision highp float;
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
mat3 normalWorld=mat3(world);
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
worldTangent=normalize((normalWorld*worldTangent).xyz);
worldBinormal=normalize((normalWorld*worldBinormal).xyz);
vec3 worldNormal=normalize((normalWorld*normalize(normal)).xyz);
tangentSpace[0]=worldTangent;
tangentSpace[1]=worldBinormal;
tangentSpace[2]=worldNormal;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[Wi]=Hi;class ki extends V{constructor(){super(),this.DIFFUSEX=!1,this.DIFFUSEY=!1,this.DIFFUSEZ=!1,this.BUMPX=!1,this.BUMPY=!1,this.BUMPZ=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.NONUNIFORMSCALING=!1,this.rebuild()}}class F extends B{constructor(e,t){super(e,t),this.tileSize=1,this.diffuseColor=new y(1,1,1),this.specularColor=new y(.2,.2,.2),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new ki);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&r.texturesEnabled){if(P.DiffuseTextureEnabled){const f=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],a=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"];for(let d=0;d<f.length;d++)if(f[d])if(f[d].isReady())i[a[d]]=!0;else return!1}if(P.BumpTextureEnabled){const f=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],a=["BUMPX","BUMPY","BUMPZ"];for(let d=0;d<f.length;d++)if(f[d])if(f[d].isReady())i[a[d]]=!0;else return!1}}if(l.PrepareDefinesForMisc(e,r,!1,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=l.PrepareDefinesForLights(r,e,i,!1,this._maxSimultaneousLights,this._disableLighting),l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForAttributes(e,i,!0,!0),i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess;const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="triplanar",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","tileSize"],g=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ"],p=new Array;W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;n&&(this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._activeEffect.setFloat("tileSize",this.tileSize),i.getCachedMaterial()!==this&&(this.diffuseTextureX&&this._activeEffect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._activeEffect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._activeEffect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._activeEffect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._activeEffect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._activeEffect.setTexture("normalSamplerZ",this.normalTextureZ),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),r.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),this._afterBind(t,this._activeEffect))}getAnimatables(){const e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTextureX&&e.push(this._diffuseTextureX),this._diffuseTextureY&&e.push(this._diffuseTextureY),this._diffuseTextureZ&&e.push(this._diffuseTextureZ),this._normalTextureX&&e.push(this._normalTextureX),this._normalTextureY&&e.push(this._normalTextureY),this._normalTextureZ&&e.push(this._normalTextureZ),e}hasTexture(e){return!!(super.hasTexture(e)||this._diffuseTextureX===e||this._diffuseTextureY===e||this._diffuseTextureZ===e||this._normalTextureX===e||this._normalTextureY===e||this._normalTextureZ===e)}dispose(e){this.mixTexture&&this.mixTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new F(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.TriPlanarMaterial",e}getClassName(){return"TriPlanarMaterial"}static Parse(e,t,s){return A.Parse(()=>new F(e.name,t),e,t,s)}}o([_()],F.prototype,"mixTexture",void 0);o([_("diffuseTextureX")],F.prototype,"_diffuseTextureX",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"diffuseTextureX",void 0);o([_("diffuseTexturY")],F.prototype,"_diffuseTextureY",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"diffuseTextureY",void 0);o([_("diffuseTextureZ")],F.prototype,"_diffuseTextureZ",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"diffuseTextureZ",void 0);o([_("normalTextureX")],F.prototype,"_normalTextureX",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"normalTextureX",void 0);o([_("normalTextureY")],F.prototype,"_normalTextureY",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"normalTextureY",void 0);o([_("normalTextureZ")],F.prototype,"_normalTextureZ",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],F.prototype,"normalTextureZ",void 0);o([u()],F.prototype,"tileSize",void 0);o([I()],F.prototype,"diffuseColor",void 0);o([I()],F.prototype,"specularColor",void 0);o([u()],F.prototype,"specularPower",void 0);o([u("disableLighting")],F.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],F.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],F.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],F.prototype,"maxSimultaneousLights",void 0);D("BABYLON.TriPlanarMaterial",F);const Xi="waterPixelShader",ji=`#ifdef LOGARITHMICDEPTH
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
#define CUSTOM_FRAGMENT_MAIN_END
}
`;E.ShadersStore[Xi]=ji;const $i="waterVertexShader",Zi=`precision highp float;
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
#include<bakedVertexAnimationDeclaration>
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<logDepthDeclaration>
uniform mat4 reflectionViewProjection;
uniform vec2 windDirection;
uniform float waveLength;
uniform float time;
uniform float windForce;
uniform float waveHeight;
uniform float waveSpeed;
uniform float waveCount;
varying vec3 vRefractionMapTexCoord;
varying vec3 vReflectionMapTexCoord;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
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
if (vNormalInfos.x==0.)
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
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
float finalWaveCount=1.0/(waveCount*0.5);
#ifdef USE_WORLD_COORDINATES
vec3 p=worldPos.xyz;
#else
vec3 p=position;
#endif
float newY=(sin(((p.x/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.x*5.0)
+ (cos(((p.z/finalWaveCount)+ time*waveSpeed))*waveHeight*windDirection.y*5.0);
p.y+=abs(newY);
#ifdef USE_WORLD_COORDINATES
gl_Position=viewProjection*vec4(p,1.0);
#else
gl_Position=viewProjection*finalWorld*vec4(p,1.0);
#endif
#ifdef REFLECTION
vRefractionMapTexCoord.x=0.5*(gl_Position.w+gl_Position.x);
vRefractionMapTexCoord.y=0.5*(gl_Position.w+gl_Position.y);
vRefractionMapTexCoord.z=gl_Position.w;
worldPos=reflectionViewProjection*finalWorld*vec4(position,1.0);
vReflectionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);
vReflectionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);
vReflectionMapTexCoord.z=worldPos.w;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;E.ShadersStore[$i]=Zi;class Yi extends V{constructor(){super(),this.BUMP=!1,this.REFLECTION=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.SPECULARTERM=!1,this.LOGARITHMICDEPTH=!1,this.USE_REVERSE_DEPTHBUFFER=!1,this.FRESNELSEPARATE=!1,this.BUMPSUPERIMPOSE=!1,this.BUMPAFFECTSREFLECTION=!1,this.USE_WORLD_COORDINATES=!1,this.IMAGEPROCESSING=!1,this.VIGNETTE=!1,this.VIGNETTEBLENDMODEMULTIPLY=!1,this.VIGNETTEBLENDMODEOPAQUE=!1,this.TONEMAPPING=!1,this.TONEMAPPING_ACES=!1,this.CONTRAST=!1,this.EXPOSURE=!1,this.COLORCURVES=!1,this.COLORGRADING=!1,this.COLORGRADING3D=!1,this.SAMPLER3DGREENDEPTH=!1,this.SAMPLER3DBGRMAP=!1,this.DITHER=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class x extends B{get hasRenderTargetTextures(){return!0}constructor(e,t,s=new pe(512,512)){super(e,t),this.renderTargetSize=s,this.diffuseColor=new y(1,1,1),this.specularColor=new y(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4,this.windForce=6,this.windDirection=new pe(0,1),this.waveHeight=.4,this.bumpHeight=.4,this._bumpSuperimpose=!1,this._fresnelSeparate=!1,this._bumpAffectsReflection=!1,this.waterColor=new y(.1,.1,.6),this.colorBlendFactor=.2,this.waterColor2=new y(.1,.1,.6),this.colorBlendFactor2=.2,this.waveLength=.1,this.waveSpeed=1,this.waveCount=20,this.disableClipPlane=!1,this._useWorldCoordinatesForWaveDeformation=!1,this._renderTargets=new Ce(16),this._mesh=null,this._reflectionTransform=ue.Zero(),this._lastTime=0,this._lastDeltaTime=0,this._createRenderTargets(this.getScene(),s),this.getRenderTargetTextures=()=>(this._renderTargets.reset(),this._renderTargets.push(this._reflectionRTT),this._renderTargets.push(this._refractionRTT),this._renderTargets),this._imageProcessingConfiguration=this.getScene().imageProcessingConfiguration,this._imageProcessingConfiguration&&(this._imageProcessingObserver=this._imageProcessingConfiguration.onUpdateParameters.add(()=>{this._markAllSubMeshesAsImageProcessingDirty()}))}get useLogarithmicDepth(){return this._useLogarithmicDepth}set useLogarithmicDepth(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported,this._markAllSubMeshesAsMiscDirty()}get refractionTexture(){return this._refractionRTT}get reflectionTexture(){return this._reflectionRTT}addToRenderList(e){this._refractionRTT&&this._refractionRTT.renderList&&this._refractionRTT.renderList.push(e),this._reflectionRTT&&this._reflectionRTT.renderList&&this._reflectionRTT.renderList.push(e)}enableRenderTargets(e){const t=e?1:0;this._refractionRTT&&(this._refractionRTT.refreshRate=t),this._reflectionRTT&&(this._reflectionRTT.refreshRate=t)}getRenderList(){return this._refractionRTT?this._refractionRTT.renderList:[]}get renderTargetsEnabled(){return!(this._refractionRTT&&this._refractionRTT.refreshRate===0)}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,s){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===s)return!0;t.materialDefines||(t.materialDefines=new Yi);const i=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;const n=r.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,r.texturesEnabled)){if(this.bumpTexture&&P.BumpTextureEnabled)if(this.bumpTexture.isReady())i._needUVs=!0,i.BUMP=!0;else return!1;P.ReflectionTextureEnabled&&(i.REFLECTION=!0)}if(l.PrepareDefinesForFrameBoundValues(r,n,this,i,!!s),l.PrepareDefinesForMisc(e,r,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._areMiscDirty&&(i.FRESNELSEPARATE=this._fresnelSeparate,i.BUMPSUPERIMPOSE=this._bumpSuperimpose,i.BUMPAFFECTSREFLECTION=this._bumpAffectsReflection,i.USE_WORLD_COORDINATES=this._useWorldCoordinatesForWaveDeformation),i._needNormals=l.PrepareDefinesForLights(r,e,i,!0,this._maxSimultaneousLights,this._disableLighting),i._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(i),i.IS_REFLECTION_LINEAR=this.reflectionTexture!=null&&!this.reflectionTexture.gammaSpace,i.IS_REFRACTION_LINEAR=this.refractionTexture!=null&&!this.refractionTexture.gammaSpace}if(l.PrepareDefinesForAttributes(e,i,!0,!0),this._mesh=e,this._waitingRenderList){for(let f=0;f<this._waitingRenderList.length;f++)this.addToRenderList(r.getNodeById(this._waitingRenderList[f]));this._waitingRenderList=null}if(i.isDirty){i.markAsProcessed(),r.resetCachedMaterial();const f=new k;i.FOG&&f.addFallback(1,"FOG"),i.LOGARITHMICDEPTH&&f.addFallback(0,"LOGARITHMICDEPTH"),l.HandleFallbacksForShadows(i,f,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&f.addCPUSkinningFallback(0,e);const a=[v.PositionKind];i.NORMAL&&a.push(v.NormalKind),i.UV1&&a.push(v.UVKind),i.UV2&&a.push(v.UV2Kind),i.VERTEXCOLOR&&a.push(v.ColorKind),l.PrepareAttributesForBones(a,e,i,f),l.PrepareAttributesForInstances(a,i);const d="water",h=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vNormalInfos","mBones","normalMatrix","logarithmicDepthConstant","reflectionViewProjection","windDirection","waveLength","time","windForce","cameraPosition","bumpHeight","waveHeight","waterColor","waterColor2","colorBlendFactor","colorBlendFactor2","waveSpeed","waveCount"],g=["normalSampler","refractionSampler","reflectionSampler"],p=new Array;de&&(de.PrepareUniforms(m,i),de.PrepareSamplers(g,i)),W(m),l.PrepareUniformsAndSamplersList({uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(r.getEngine().createEffect(d,{attributes:a,uniformsNames:m,uniformBuffersNames:p,samplers:g,defines:h,fallbacks:f,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights}},n),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=r.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,t,s){const i=this.getScene(),r=s.materialDefines;if(!r)return;const n=s.effect;if(!n||!this._mesh)return;this._activeEffect=n,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",i.getTransformMatrix()),l.BindBonesParameters(t,this._activeEffect),this._mustRebind(i,n)&&(this.bumpTexture&&P.BumpTextureEnabled&&(this._activeEffect.setTexture("normalSampler",this.bumpTexture),this._activeEffect.setFloat2("vNormalInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._activeEffect.setMatrix("normalMatrix",this.bumpTexture.getTextureMatrix())),H(n,this,i),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),i.bindEyePosition(n)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),r.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),i.lightsEnabled&&!this.disableLighting&&l.BindLights(i,t,this._activeEffect,r,this.maxSimultaneousLights),i.fogEnabled&&t.applyFog&&i.fogMode!==w.FOGMODE_NONE&&this._activeEffect.setMatrix("view",i.getViewMatrix()),l.BindFogParameters(i,t,this._activeEffect),l.BindLogDepth(r,this._activeEffect,i),P.ReflectionTextureEnabled&&(this._activeEffect.setTexture("refractionSampler",this._refractionRTT),this._activeEffect.setTexture("reflectionSampler",this._reflectionRTT));const f=this._reflectionTransform.multiply(i.getProjectionMatrix()),a=i.getEngine().getDeltaTime();a!==this._lastDeltaTime&&(this._lastDeltaTime=a,this._lastTime+=this._lastDeltaTime),this._activeEffect.setMatrix("reflectionViewProjection",f),this._activeEffect.setVector2("windDirection",this.windDirection),this._activeEffect.setFloat("waveLength",this.waveLength),this._activeEffect.setFloat("time",this._lastTime/1e5),this._activeEffect.setFloat("windForce",this.windForce),this._activeEffect.setFloat("waveHeight",this.waveHeight),this._activeEffect.setFloat("bumpHeight",this.bumpHeight),this._activeEffect.setColor4("waterColor",this.waterColor,1),this._activeEffect.setFloat("colorBlendFactor",this.colorBlendFactor),this._activeEffect.setColor4("waterColor2",this.waterColor2,1),this._activeEffect.setFloat("colorBlendFactor2",this.colorBlendFactor2),this._activeEffect.setFloat("waveSpeed",this.waveSpeed),this._activeEffect.setFloat("waveCount",this.waveCount),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect),this._afterBind(t,this._activeEffect)}_createRenderTargets(e,t){this._refractionRTT=new _e(name+"_refraction",{width:t.x,height:t.y},e,!1,!0),this._refractionRTT.wrapU=ne.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.wrapV=ne.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.ignoreCameraViewport=!0,this._reflectionRTT=new _e(name+"_reflection",{width:t.x,height:t.y},e,!1,!0),this._reflectionRTT.wrapU=ne.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.wrapV=ne.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.ignoreCameraViewport=!0;let s,i=null,r;const n=ue.Zero();this._refractionRTT.onBeforeRender=()=>{if(this._mesh&&(s=this._mesh.isVisible,this._mesh.isVisible=!1),!this.disableClipPlane){i=e.clipPlane;const f=this._mesh?this._mesh.absolutePosition.y:0;e.clipPlane=ge.FromPositionAndNormal(new G(0,f+.05,0),new G(0,1,0))}},this._refractionRTT.onAfterRender=()=>{this._mesh&&(this._mesh.isVisible=s),this.disableClipPlane||(e.clipPlane=i)},this._reflectionRTT.onBeforeRender=()=>{if(this._mesh&&(s=this._mesh.isVisible,this._mesh.isVisible=!1),!this.disableClipPlane){i=e.clipPlane;const f=this._mesh?this._mesh.absolutePosition.y:0;e.clipPlane=ge.FromPositionAndNormal(new G(0,f-.05,0),new G(0,-1,0)),ue.ReflectionToRef(e.clipPlane,n)}r=e.getViewMatrix(),n.multiplyToRef(r,this._reflectionTransform),e.setTransformMatrix(this._reflectionTransform,e.getProjectionMatrix()),e._mirroredCameraPosition=G.TransformCoordinates(e.activeCamera.position,n)},this._reflectionRTT.onAfterRender=()=>{this._mesh&&(this._mesh.isVisible=s),e.clipPlane=i,e.setTransformMatrix(r,e.getProjectionMatrix()),e._mirroredCameraPosition=null}}getAnimatables(){const e=[];return this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&e.push(this.bumpTexture),this._reflectionRTT&&this._reflectionRTT.animations&&this._reflectionRTT.animations.length>0&&e.push(this._reflectionRTT),this._refractionRTT&&this._refractionRTT.animations&&this._refractionRTT.animations.length>0&&e.push(this._refractionRTT),e}getActiveTextures(){const e=super.getActiveTextures();return this._bumpTexture&&e.push(this._bumpTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._bumpTexture===e)}dispose(e){this.bumpTexture&&this.bumpTexture.dispose();let t=this.getScene().customRenderTargets.indexOf(this._refractionRTT);t!=-1&&this.getScene().customRenderTargets.splice(t,1),t=-1,t=this.getScene().customRenderTargets.indexOf(this._reflectionRTT),t!=-1&&this.getScene().customRenderTargets.splice(t,1),this._reflectionRTT&&this._reflectionRTT.dispose(),this._refractionRTT&&this._refractionRTT.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),super.dispose(e)}clone(e){return A.Clone(()=>new x(e,this.getScene()),this)}serialize(){const e=super.serialize();if(e.customType="BABYLON.WaterMaterial",e.renderList=[],this._refractionRTT&&this._refractionRTT.renderList)for(let t=0;t<this._refractionRTT.renderList.length;t++)e.renderList.push(this._refractionRTT.renderList[t].id);return e}getClassName(){return"WaterMaterial"}static Parse(e,t,s){const i=A.Parse(()=>new x(e.name,t),e,t,s);return i._waitingRenderList=e.renderList,i}static CreateDefaultMesh(e,t){return Ae(e,{width:512,height:512,subdivisions:32,updatable:!1},t)}}o([_("bumpTexture")],x.prototype,"_bumpTexture",void 0);o([c("_markAllSubMeshesAsTexturesDirty")],x.prototype,"bumpTexture",void 0);o([I()],x.prototype,"diffuseColor",void 0);o([I()],x.prototype,"specularColor",void 0);o([u()],x.prototype,"specularPower",void 0);o([u("disableLighting")],x.prototype,"_disableLighting",void 0);o([c("_markAllSubMeshesAsLightsDirty")],x.prototype,"disableLighting",void 0);o([u("maxSimultaneousLights")],x.prototype,"_maxSimultaneousLights",void 0);o([c("_markAllSubMeshesAsLightsDirty")],x.prototype,"maxSimultaneousLights",void 0);o([u()],x.prototype,"windForce",void 0);o([Ee()],x.prototype,"windDirection",void 0);o([u()],x.prototype,"waveHeight",void 0);o([u()],x.prototype,"bumpHeight",void 0);o([u("bumpSuperimpose")],x.prototype,"_bumpSuperimpose",void 0);o([c("_markAllSubMeshesAsMiscDirty")],x.prototype,"bumpSuperimpose",void 0);o([u("fresnelSeparate")],x.prototype,"_fresnelSeparate",void 0);o([c("_markAllSubMeshesAsMiscDirty")],x.prototype,"fresnelSeparate",void 0);o([u("bumpAffectsReflection")],x.prototype,"_bumpAffectsReflection",void 0);o([c("_markAllSubMeshesAsMiscDirty")],x.prototype,"bumpAffectsReflection",void 0);o([I()],x.prototype,"waterColor",void 0);o([u()],x.prototype,"colorBlendFactor",void 0);o([I()],x.prototype,"waterColor2",void 0);o([u()],x.prototype,"colorBlendFactor2",void 0);o([u()],x.prototype,"waveLength",void 0);o([u()],x.prototype,"waveSpeed",void 0);o([u()],x.prototype,"waveCount",void 0);o([u()],x.prototype,"disableClipPlane",void 0);o([u("useWorldCoordinatesForWaveDeformation")],x.prototype,"_useWorldCoordinatesForWaveDeformation",void 0);o([c("_markAllSubMeshesAsMiscDirty")],x.prototype,"useWorldCoordinatesForWaveDeformation",void 0);o([u()],x.prototype,"useLogarithmicDepth",null);D("BABYLON.WaterMaterial",x);export{z as C,j as F,b as G,O as L,S as M,$ as N,se as P,xe as R,fe as S,N as T,x as W,le as a,te as b,tt as c,C as d,M as e,Ve as f,we as g,Z as h,R as i,F as j};
