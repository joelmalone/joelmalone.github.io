import{W as R,O as V,V as S,h as b,ca as Y,d as q,ad as ne,ar as L,au as te,aa as x,as as se,at as ie,av as Q,f as Z,X as ae,c1 as oe,E as he,L as de,aN as le,k as ce,l as X}from"./runBabylonPlaygroundScene-32a4afbd.js";import{T as A,L as J,E as ue}from"./linesBuilder-a2dae4c1.js";import{b as z,B as G,P as j}from"./blurPostProcess-f61d1d3e.js";const fe="bayerDitherFunctions",_e=`float bayerDither2(vec2 _P) {
return mod(2.0*_P.y+_P.x+1.0,4.0);
}
float bayerDither4(vec2 _P) {
vec2 P1=mod(_P,2.0); 
vec2 P2=floor(0.5*mod(_P,4.0)); 
return 4.0*bayerDither2(P1)+bayerDither2(P2);
}
float bayerDither8(vec2 _P) {
vec2 P1=mod(_P,2.0); 
vec2 P2=floor(0.5 *mod(_P,4.0)); 
vec2 P4=floor(0.25*mod(_P,8.0)); 
return 4.0*(4.0*bayerDither2(P1)+bayerDither2(P2))+bayerDither2(P4);
}
`;R.IncludesShadersStore[fe]=_e;const pe="shadowMapFragmentExtraDeclaration",me=`#if SM_FLOAT==0
#include<packingFunctions>
#endif
#if SM_SOFTTRANSPARENTSHADOW==1
#include<bayerDitherFunctions>
uniform float softTransparentShadowSM;
#endif
varying float vDepthMetricSM;
#if SM_USEDISTANCE==1
uniform vec3 lightDataSM;
varying vec3 vPositionWSM;
#endif
uniform vec3 biasAndScaleSM;
uniform vec2 depthValuesSM;
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
varying float zSM;
#endif
`;R.IncludesShadersStore[pe]=me;const ge="shadowMapFragment",Me=`float depthSM=vDepthMetricSM;
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
#if SM_USEDISTANCE==1
depthSM=(length(vPositionWSM-lightDataSM)+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
depthSM=(-zSM+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
depthSM=(zSM+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#endif
#ifdef USE_REVERSE_DEPTHBUFFER
gl_FragDepth=clamp(1.0-depthSM,0.0,1.0);
#else
gl_FragDepth=clamp(depthSM,0.0,1.0); 
#endif
#elif SM_USEDISTANCE==1
depthSM=(length(vPositionWSM-lightDataSM)+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#if SM_ESM==1
depthSM=clamp(exp(-min(87.,biasAndScaleSM.z*depthSM)),0.,1.);
#endif
#if SM_FLOAT==1
gl_FragColor=vec4(depthSM,1.0,1.0,1.0);
#else
gl_FragColor=pack(depthSM);
#endif
return;`;R.IncludesShadersStore[ge]=Me;const Se="shadowMapPixelShader",Ee=`#include<shadowMapFragmentExtraDeclaration>
#ifdef ALPHATEXTURE
varying vec2 vUV;
uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
#ifdef ALPHATEXTURE
float alphaFromAlphaTexture=texture2D(diffuseSampler,vUV).a;
#ifdef ALPHATESTVALUE
if (alphaFromAlphaTexture<ALPHATESTVALUE)
discard;
#endif
#endif
#if SM_SOFTTRANSPARENTSHADOW==1
#ifdef ALPHATEXTURE
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alphaFromAlphaTexture) discard;
#else
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM) discard;
#endif
#endif
#include<shadowMapFragment>
}`;R.ShadersStore[Se]=Ee;const xe="sceneVertexDeclaration",Te=`uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;
uniform mat4 projection;
uniform vec4 vEyePosition;
`;R.IncludesShadersStore[xe]=Te;const Ce="meshVertexDeclaration",Ae=`uniform mat4 world;
uniform float visibility;
`;R.IncludesShadersStore[Ce]=Ae;const Re="shadowMapVertexDeclaration",Pe=`#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;R.IncludesShadersStore[Re]=Pe;const De="shadowMapUboDeclaration",be=`layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;R.IncludesShadersStore[De]=be;const ve="shadowMapVertexExtraDeclaration",we=`#if SM_NORMALBIAS==1
uniform vec3 lightDataSM;
#endif
uniform vec3 biasAndScaleSM;
uniform vec2 depthValuesSM;
varying float vDepthMetricSM;
#if SM_USEDISTANCE==1
varying vec3 vPositionWSM;
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
varying float zSM;
#endif
`;R.IncludesShadersStore[ve]=we;const Fe="shadowMapVertexNormalBias",Ie=`#if SM_NORMALBIAS==1
#if SM_DIRECTIONINLIGHTDATA==1
vec3 worldLightDirSM=normalize(-lightDataSM.xyz);
#else
vec3 directionToLightSM=lightDataSM.xyz-worldPos.xyz;
vec3 worldLightDirSM=normalize(directionToLightSM);
#endif
float ndlSM=dot(vNormalW,worldLightDirSM);
float sinNLSM=sqrt(1.0-ndlSM*ndlSM);
float normalBiasSM=biasAndScaleSM.y*sinNLSM;
worldPos.xyz-=vNormalW*normalBiasSM;
#endif
`;R.IncludesShadersStore[Fe]=Ie;const Be="shadowMapVertexMetric",Le=`#if SM_USEDISTANCE==1
vPositionWSM=worldPos.xyz;
#endif
#if SM_DEPTHTEXTURE==1
#ifdef IS_NDC_HALF_ZRANGE
#define BIASFACTOR 0.5
#else
#define BIASFACTOR 1.0
#endif
#ifdef USE_REVERSE_DEPTHBUFFER
gl_Position.z-=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#else
gl_Position.z+=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#endif
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
zSM=gl_Position.z;
gl_Position.z=0.0;
#elif SM_USEDISTANCE==0
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetricSM=(-gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
vDepthMetricSM=(gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#endif
`;R.IncludesShadersStore[Be]=Le;const Oe="shadowMapVertexShader",Ne=`attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef INSTANCES
attribute vec4 world0;
attribute vec4 world1;
attribute vec4 world2;
attribute vec4 world3;
#endif
#include<helperFunctions>
#include<__decl__shadowMapVertex>
#ifdef ALPHATEXTURE
varying vec2 vUV;
uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#include<shadowMapVertexExtraDeclaration>
#include<clipPlaneVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#ifdef NORMAL
mat3 normWorldSM=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vec3 vNormalW=normalUpdated/vec3(dot(normWorldSM[0],normWorldSM[0]),dot(normWorldSM[1],normWorldSM[1]),dot(normWorldSM[2],normWorldSM[2]));
vNormalW=normalize(normWorldSM*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normWorldSM=transposeMat3(inverseMat3(normWorldSM));
#endif
vec3 vNormalW=normalize(normWorldSM*normalUpdated);
#endif
#endif
#include<shadowMapVertexNormalBias>
gl_Position=viewProjection*worldPos;
#include<shadowMapVertexMetric>
#ifdef ALPHATEXTURE
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
#include<clipPlaneVertex>
}`;R.ShadersStore[Oe]=Ne;const Ue="depthBoxBlurPixelShader",ye=`varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec2 screenSize;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
vec4 colorDepth=vec4(0.0);
for (int x=-OFFSET; x<=OFFSET; x++)
for (int y=-OFFSET; y<=OFFSET; y++)
colorDepth+=texture2D(textureSampler,vUV+vec2(x,y)/screenSize);
gl_FragColor=(colorDepth/float((OFFSET*2+1)*(OFFSET*2+1)));
}`;R.ShadersStore[Ue]=ye;const Ve="shadowMapFragmentSoftTransparentShadow",ze=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alpha) discard;
#endif
`;R.IncludesShadersStore[Ve]=ze;class o{get bias(){return this._bias}set bias(e){this._bias=e}get normalBias(){return this._normalBias}set normalBias(e){this._normalBias=e}get blurBoxOffset(){return this._blurBoxOffset}set blurBoxOffset(e){this._blurBoxOffset!==e&&(this._blurBoxOffset=e,this._disposeBlurPostProcesses())}get blurScale(){return this._blurScale}set blurScale(e){this._blurScale!==e&&(this._blurScale=e,this._disposeBlurPostProcesses())}get blurKernel(){return this._blurKernel}set blurKernel(e){this._blurKernel!==e&&(this._blurKernel=e,this._disposeBlurPostProcesses())}get useKernelBlur(){return this._useKernelBlur}set useKernelBlur(e){this._useKernelBlur!==e&&(this._useKernelBlur=e,this._disposeBlurPostProcesses())}get depthScale(){return this._depthScale!==void 0?this._depthScale:this._light.getDepthScale()}set depthScale(e){this._depthScale=e}_validateFilter(e){return e}get filter(){return this._filter}set filter(e){if(e=this._validateFilter(e),this._light.needCube()){if(e===o.FILTER_BLUREXPONENTIALSHADOWMAP){this.useExponentialShadowMap=!0;return}else if(e===o.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP){this.useCloseExponentialShadowMap=!0;return}else if(e===o.FILTER_PCF||e===o.FILTER_PCSS){this.usePoissonSampling=!0;return}}if((e===o.FILTER_PCF||e===o.FILTER_PCSS)&&!this._scene.getEngine()._features.supportShadowSamplers){this.usePoissonSampling=!0;return}this._filter!==e&&(this._filter=e,this._disposeBlurPostProcesses(),this._applyFilterValues(),this._light._markMeshesAsLightDirty())}get usePoissonSampling(){return this.filter===o.FILTER_POISSONSAMPLING}set usePoissonSampling(e){const t=this._validateFilter(o.FILTER_POISSONSAMPLING);!e&&this.filter!==o.FILTER_POISSONSAMPLING||(this.filter=e?t:o.FILTER_NONE)}get useExponentialShadowMap(){return this.filter===o.FILTER_EXPONENTIALSHADOWMAP}set useExponentialShadowMap(e){const t=this._validateFilter(o.FILTER_EXPONENTIALSHADOWMAP);!e&&this.filter!==o.FILTER_EXPONENTIALSHADOWMAP||(this.filter=e?t:o.FILTER_NONE)}get useBlurExponentialShadowMap(){return this.filter===o.FILTER_BLUREXPONENTIALSHADOWMAP}set useBlurExponentialShadowMap(e){const t=this._validateFilter(o.FILTER_BLUREXPONENTIALSHADOWMAP);!e&&this.filter!==o.FILTER_BLUREXPONENTIALSHADOWMAP||(this.filter=e?t:o.FILTER_NONE)}get useCloseExponentialShadowMap(){return this.filter===o.FILTER_CLOSEEXPONENTIALSHADOWMAP}set useCloseExponentialShadowMap(e){const t=this._validateFilter(o.FILTER_CLOSEEXPONENTIALSHADOWMAP);!e&&this.filter!==o.FILTER_CLOSEEXPONENTIALSHADOWMAP||(this.filter=e?t:o.FILTER_NONE)}get useBlurCloseExponentialShadowMap(){return this.filter===o.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP}set useBlurCloseExponentialShadowMap(e){const t=this._validateFilter(o.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP);!e&&this.filter!==o.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP||(this.filter=e?t:o.FILTER_NONE)}get usePercentageCloserFiltering(){return this.filter===o.FILTER_PCF}set usePercentageCloserFiltering(e){const t=this._validateFilter(o.FILTER_PCF);!e&&this.filter!==o.FILTER_PCF||(this.filter=e?t:o.FILTER_NONE)}get filteringQuality(){return this._filteringQuality}set filteringQuality(e){this._filteringQuality!==e&&(this._filteringQuality=e,this._disposeBlurPostProcesses(),this._applyFilterValues(),this._light._markMeshesAsLightDirty())}get useContactHardeningShadow(){return this.filter===o.FILTER_PCSS}set useContactHardeningShadow(e){const t=this._validateFilter(o.FILTER_PCSS);!e&&this.filter!==o.FILTER_PCSS||(this.filter=e?t:o.FILTER_NONE)}get contactHardeningLightSizeUVRatio(){return this._contactHardeningLightSizeUVRatio}set contactHardeningLightSizeUVRatio(e){this._contactHardeningLightSizeUVRatio=e}get darkness(){return this._darkness}set darkness(e){this.setDarkness(e)}getDarkness(){return this._darkness}setDarkness(e){return e>=1?this._darkness=1:e<=0?this._darkness=0:this._darkness=e,this}get transparencyShadow(){return this._transparencyShadow}set transparencyShadow(e){this.setTransparencyShadow(e)}setTransparencyShadow(e){return this._transparencyShadow=e,this}getShadowMap(){return this._shadowMap}getShadowMapForRendering(){return this._shadowMap2?this._shadowMap2:this._shadowMap}getClassName(){return o.CLASSNAME}addShadowCaster(e,t=!0){if(!this._shadowMap)return this;if(this._shadowMap.renderList||(this._shadowMap.renderList=[]),this._shadowMap.renderList.indexOf(e)===-1&&this._shadowMap.renderList.push(e),t)for(const s of e.getChildMeshes())this._shadowMap.renderList.indexOf(s)===-1&&this._shadowMap.renderList.push(s);return this}removeShadowCaster(e,t=!0){if(!this._shadowMap||!this._shadowMap.renderList)return this;const s=this._shadowMap.renderList.indexOf(e);if(s!==-1&&this._shadowMap.renderList.splice(s,1),t)for(const i of e.getChildren())this.removeShadowCaster(i);return this}getLight(){return this._light}_getCamera(){var e;return(e=this._camera)!==null&&e!==void 0?e:this._scene.activeCamera}get mapSize(){return this._mapSize}set mapSize(e){this._mapSize=e,this._light._markMeshesAsLightDirty(),this.recreateShadowMap()}constructor(e,t,s,i){this.onBeforeShadowMapRenderObservable=new V,this.onAfterShadowMapRenderObservable=new V,this.onBeforeShadowMapRenderMeshObservable=new V,this.onAfterShadowMapRenderMeshObservable=new V,this._bias=5e-5,this._normalBias=0,this._blurBoxOffset=1,this._blurScale=2,this._blurKernel=1,this._useKernelBlur=!1,this._filter=o.FILTER_NONE,this._filteringQuality=o.QUALITY_HIGH,this._contactHardeningLightSizeUVRatio=.1,this._darkness=0,this._transparencyShadow=!1,this.enableSoftTransparentShadow=!1,this.useOpacityTextureForTransparentShadow=!1,this.frustumEdgeFalloff=0,this.forceBackFacesOnly=!1,this._lightDirection=S.Zero(),this._viewMatrix=b.Zero(),this._projectionMatrix=b.Zero(),this._transformMatrix=b.Zero(),this._cachedPosition=new S(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cachedDirection=new S(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._currentFaceIndex=0,this._currentFaceIndexCache=0,this._defaultTextureMatrix=b.Identity(),this._mapSize=e,this._light=t,this._scene=t.getScene(),this._camera=i??null;let r=t._shadowGenerators;r||(r=t._shadowGenerators=new Map),r.set(this._camera,this),this.id=t.id,this._useUBO=this._scene.getEngine().supportsUniformBuffers,this._useUBO&&(this._sceneUBOs=[],this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for Shadow Generator (light "${this._light.name}")`))),o._SceneComponentInitialization(this._scene);const n=this._scene.getEngine().getCaps();s?n.textureFloatRender&&n.textureFloatLinearFiltering?this._textureType=1:n.textureHalfFloatRender&&n.textureHalfFloatLinearFiltering?this._textureType=2:this._textureType=0:n.textureHalfFloatRender&&n.textureHalfFloatLinearFiltering?this._textureType=2:n.textureFloatRender&&n.textureFloatLinearFiltering?this._textureType=1:this._textureType=0,this._initializeGenerator(),this._applyFilterValues()}_initializeGenerator(){this._light._markMeshesAsLightDirty(),this._initializeShadowMap()}_createTargetRenderTexture(){const e=this._scene.getEngine();e._features.supportDepthStencilTexture?(this._shadowMap=new z(this._light.name+"_shadowMap",this._mapSize,this._scene,!1,!0,this._textureType,this._light.needCube(),void 0,!1,!1),this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer?516:513,!0)):this._shadowMap=new z(this._light.name+"_shadowMap",this._mapSize,this._scene,!1,!0,this._textureType,this._light.needCube()),this._shadowMap.noPrePassRenderer=!0}_initializeShadowMap(){if(this._createTargetRenderTexture(),this._shadowMap===null)return;this._shadowMap.wrapU=A.CLAMP_ADDRESSMODE,this._shadowMap.wrapV=A.CLAMP_ADDRESSMODE,this._shadowMap.anisotropicFilteringLevel=1,this._shadowMap.updateSamplingMode(A.BILINEAR_SAMPLINGMODE),this._shadowMap.renderParticles=!1,this._shadowMap.ignoreCameraViewport=!0,this._storedUniqueId&&(this._shadowMap.uniqueId=this._storedUniqueId),this._shadowMap.customRenderFunction=this._renderForShadowMap.bind(this),this._shadowMap.customIsReadyFunction=()=>!0;const e=this._scene.getEngine();this._shadowMap.onBeforeBindObservable.add(()=>{var i;this._currentSceneUBO=this._scene.getSceneUniformBuffer(),(i=e._debugPushGroup)===null||i===void 0||i.call(e,`shadow map generation for pass id ${e.currentRenderPassId}`,1)}),this._shadowMap.onBeforeRenderObservable.add(i=>{this._sceneUBOs&&this._scene.setSceneUniformBuffer(this._sceneUBOs[0]),this._currentFaceIndex=i,this._filter===o.FILTER_PCF&&e.setColorWrite(!1),this.getTransformMatrix(),this._scene.setTransformMatrix(this._viewMatrix,this._projectionMatrix),this._useUBO&&(this._scene.getSceneUniformBuffer().unbindEffect(),this._scene.finalizeSceneUbo())}),this._shadowMap.onAfterUnbindObservable.add(()=>{var i,r;if(this._sceneUBOs&&this._scene.setSceneUniformBuffer(this._currentSceneUBO),this._scene.updateTransformMatrix(),this._filter===o.FILTER_PCF&&e.setColorWrite(!0),!this.useBlurExponentialShadowMap&&!this.useBlurCloseExponentialShadowMap){(i=e._debugPopGroup)===null||i===void 0||i.call(e,1);return}const n=this.getShadowMapForRendering();n&&(this._scene.postProcessManager.directRender(this._blurPostProcesses,n.renderTarget,!0),e.unBindFramebuffer(n.renderTarget,!0),(r=e._debugPopGroup)===null||r===void 0||r.call(e,1))});const t=new Z(0,0,0,0),s=new Z(1,1,1,1);this._shadowMap.onClearObservable.add(i=>{this._filter===o.FILTER_PCF?i.clear(s,!1,!0,!1):this.useExponentialShadowMap||this.useBlurExponentialShadowMap?i.clear(t,!0,!0,!1):i.clear(s,!0,!0,!1)}),this._shadowMap.onResizeObservable.add(i=>{this._storedUniqueId=this._shadowMap.uniqueId,this._mapSize=i.getRenderSize(),this._light._markMeshesAsLightDirty(),this.recreateShadowMap()});for(let i=Y.MIN_RENDERINGGROUPS;i<Y.MAX_RENDERINGGROUPS;i++)this._shadowMap.setRenderingAutoClearDepthStencil(i,!1)}_initializeBlurRTTAndPostProcesses(){const e=this._scene.getEngine(),t=this._mapSize/this.blurScale;(!this.useKernelBlur||this.blurScale!==1)&&(this._shadowMap2=new z(this._light.name+"_shadowMap2",t,this._scene,!1,!0,this._textureType,void 0,void 0,!1),this._shadowMap2.wrapU=A.CLAMP_ADDRESSMODE,this._shadowMap2.wrapV=A.CLAMP_ADDRESSMODE,this._shadowMap2.updateSamplingMode(A.BILINEAR_SAMPLINGMODE)),this.useKernelBlur?(this._kernelBlurXPostprocess=new G(this._light.name+"KernelBlurX",new q(1,0),this.blurKernel,1,null,A.BILINEAR_SAMPLINGMODE,e,!1,this._textureType),this._kernelBlurXPostprocess.width=t,this._kernelBlurXPostprocess.height=t,this._kernelBlurXPostprocess.externalTextureSamplerBinding=!0,this._kernelBlurXPostprocess.onApplyObservable.add(s=>{s.setTexture("textureSampler",this._shadowMap)}),this._kernelBlurYPostprocess=new G(this._light.name+"KernelBlurY",new q(0,1),this.blurKernel,1,null,A.BILINEAR_SAMPLINGMODE,e,!1,this._textureType),this._kernelBlurXPostprocess.autoClear=!1,this._kernelBlurYPostprocess.autoClear=!1,this._textureType===0&&(this._kernelBlurXPostprocess.packedFloat=!0,this._kernelBlurYPostprocess.packedFloat=!0),this._blurPostProcesses=[this._kernelBlurXPostprocess,this._kernelBlurYPostprocess]):(this._boxBlurPostprocess=new j(this._light.name+"DepthBoxBlur","depthBoxBlur",["screenSize","boxOffset"],[],1,null,A.BILINEAR_SAMPLINGMODE,e,!1,"#define OFFSET "+this._blurBoxOffset,this._textureType),this._boxBlurPostprocess.externalTextureSamplerBinding=!0,this._boxBlurPostprocess.onApplyObservable.add(s=>{s.setFloat2("screenSize",t,t),s.setTexture("textureSampler",this._shadowMap)}),this._boxBlurPostprocess.autoClear=!1,this._blurPostProcesses=[this._boxBlurPostprocess])}_renderForShadowMap(e,t,s,i){let r;if(i.length)for(r=0;r<i.length;r++)this._renderSubMeshForShadowMap(i.data[r]);for(r=0;r<e.length;r++)this._renderSubMeshForShadowMap(e.data[r]);for(r=0;r<t.length;r++)this._renderSubMeshForShadowMap(t.data[r]);if(this._transparencyShadow)for(r=0;r<s.length;r++)this._renderSubMeshForShadowMap(s.data[r],!0);else for(r=0;r<s.length;r++)s.data[r].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate=!1}_bindCustomEffectForRenderSubMeshForShadowMap(e,t,s){t.setMatrix("viewProjection",this.getTransformMatrix())}_renderSubMeshForShadowMap(e,t=!1){var s,i;const r=e.getRenderingMesh(),n=e.getEffectiveMesh(),a=this._scene,d=a.getEngine(),c=e.getMaterial();if(n._internalAbstractMeshDataInfo._isActiveIntermediate=!1,!c||e.verticesCount===0||e._renderId===a.getRenderId())return;const u=n._getWorldMatrixDeterminant()<0;let h=(s=r.overrideMaterialSideOrientation)!==null&&s!==void 0?s:c.sideOrientation;u&&(h=h===0?1:0);const f=h===0;d.setState(c.backFaceCulling,void 0,void 0,f,c.cullBackFaces);const m=r._getInstancesRenderList(e._id,!!e.getReplacementMesh());if(m.mustReturn)return;const p=d.getCaps().instancedArrays&&(m.visibleInstances[e._id]!==null&&m.visibleInstances[e._id]!==void 0||r.hasThinInstances);if(!(this.customAllowRendering&&!this.customAllowRendering(e)))if(this.isReady(e,p,t)){e._renderId=a.getRenderId();const l=c.shadowDepthWrapper,g=(i=l==null?void 0:l.getEffect(e,this,d.currentRenderPassId))!==null&&i!==void 0?i:e._getDrawWrapper(),_=ne.GetEffect(g);d.enableEffect(g),p||r._bind(e,_,c.fillMode),this.getTransformMatrix(),_.setFloat3("biasAndScaleSM",this.bias,this.normalBias,this.depthScale),this.getLight().getTypeID()===J.LIGHTTYPEID_DIRECTIONALLIGHT?_.setVector3("lightDataSM",this._cachedDirection):_.setVector3("lightDataSM",this._cachedPosition);const M=this._getCamera();if(M&&_.setFloat2("depthValuesSM",this.getLight().getDepthMinZ(M),this.getLight().getDepthMinZ(M)+this.getLight().getDepthMaxZ(M)),t&&this.enableSoftTransparentShadow&&_.setFloat("softTransparentShadowSM",n.visibility*c.alpha),l)e._setMainDrawWrapperOverride(g),l.standalone?l.baseMaterial.bindForSubMesh(n.getWorldMatrix(),r,e):c.bindForSubMesh(n.getWorldMatrix(),r,e),e._setMainDrawWrapperOverride(null);else{if(this._opacityTexture&&(_.setTexture("diffuseSampler",this._opacityTexture),_.setMatrix("diffuseMatrix",this._opacityTexture.getTextureMatrix()||this._defaultTextureMatrix)),r.useBones&&r.computeBonesUsingShaders&&r.skeleton){const C=r.skeleton;if(C.isUsingTextureForMatrices){const F=C.getTransformMatrixTexture(r);if(!F)return;_.setTexture("boneSampler",F),_.setFloat("boneTextureWidth",4*(C.bones.length+1))}else _.setMatrices("mBones",C.getTransformMatrices(r))}L.BindMorphTargetParameters(r,_),r.morphTargetManager&&r.morphTargetManager.isUsingTextureForTargets&&r.morphTargetManager._bind(_),te(_,c,a)}!this._useUBO&&!l&&this._bindCustomEffectForRenderSubMeshForShadowMap(e,_,n),L.BindSceneUniformBuffer(_,this._scene.getSceneUniformBuffer()),this._scene.getSceneUniformBuffer().bindUniformBuffer();const v=n.getWorldMatrix();p&&(n.getMeshUniformBuffer().bindToEffect(_,"Mesh"),n.transferToEffect(v)),this.forceBackFacesOnly&&d.setState(!0,0,!1,!0,c.cullBackFaces),this.onBeforeShadowMapRenderMeshObservable.notifyObservers(r),this.onBeforeShadowMapRenderObservable.notifyObservers(_),r._processRendering(n,e,_,c.fillMode,m,p,(C,F)=>{n!==r&&!C?(r.getMeshUniformBuffer().bindToEffect(_,"Mesh"),r.transferToEffect(F)):(n.getMeshUniformBuffer().bindToEffect(_,"Mesh"),n.transferToEffect(C?F:v))}),this.forceBackFacesOnly&&d.setState(!0,0,!1,!1,c.cullBackFaces),this.onAfterShadowMapRenderObservable.notifyObservers(_),this.onAfterShadowMapRenderMeshObservable.notifyObservers(r)}else this._shadowMap&&this._shadowMap.resetRefreshCounter()}_applyFilterValues(){this._shadowMap&&(this.filter===o.FILTER_NONE||this.filter===o.FILTER_PCSS?this._shadowMap.updateSamplingMode(A.NEAREST_SAMPLINGMODE):this._shadowMap.updateSamplingMode(A.BILINEAR_SAMPLINGMODE))}forceCompilation(e,t){const s=Object.assign({useInstances:!1},t),i=this.getShadowMap();if(!i){e&&e(this);return}const r=i.renderList;if(!r){e&&e(this);return}const n=new Array;for(const c of r)n.push(...c.subMeshes);if(n.length===0){e&&e(this);return}let a=0;const d=()=>{var c,u;if(!(!this._scene||!this._scene.getEngine())){for(;this.isReady(n[a],s.useInstances,(u=(c=n[a].getMaterial())===null||c===void 0?void 0:c.needAlphaBlendingForMesh(n[a].getMesh()))!==null&&u!==void 0?u:!1);)if(a++,a>=n.length){e&&e(this);return}setTimeout(d,16)}};d()}forceCompilationAsync(e){return new Promise(t=>{this.forceCompilation(()=>{t()},e)})}_isReadyCustomDefines(e,t,s){}_prepareShadowDefines(e,t,s,i){s.push("#define SM_LIGHTTYPE_"+this._light.getClassName().toUpperCase()),s.push("#define SM_FLOAT "+(this._textureType!==0?"1":"0")),s.push("#define SM_ESM "+(this.useExponentialShadowMap||this.useBlurExponentialShadowMap?"1":"0")),s.push("#define SM_DEPTHTEXTURE "+(this.usePercentageCloserFiltering||this.useContactHardeningShadow?"1":"0"));const r=e.getMesh();return s.push("#define SM_NORMALBIAS "+(this.normalBias&&r.isVerticesDataPresent(x.NormalKind)?"1":"0")),s.push("#define SM_DIRECTIONINLIGHTDATA "+(this.getLight().getTypeID()===J.LIGHTTYPEID_DIRECTIONALLIGHT?"1":"0")),s.push("#define SM_USEDISTANCE "+(this._light.needCube()?"1":"0")),s.push("#define SM_SOFTTRANSPARENTSHADOW "+(this.enableSoftTransparentShadow&&i?"1":"0")),this._isReadyCustomDefines(s,e,t),s}isReady(e,t,s){var i;const r=e.getMaterial(),n=r==null?void 0:r.shadowDepthWrapper;if(this._opacityTexture=null,!r)return!1;const a=[];if(this._prepareShadowDefines(e,t,a,s),n){if(!n.isReadyForSubMesh(e,a,this,t,this._scene.getEngine().currentRenderPassId))return!1}else{const d=e._getDrawWrapper(void 0,!0);let c=d.effect,u=d.defines;const h=[x.PositionKind],f=e.getMesh();this.normalBias&&f.isVerticesDataPresent(x.NormalKind)&&(h.push(x.NormalKind),a.push("#define NORMAL"),f.nonUniformScaling&&a.push("#define NONUNIFORMSCALING"));const m=r.needAlphaTesting();if((m||r.needAlphaBlending())&&(this.useOpacityTextureForTransparentShadow?this._opacityTexture=r.opacityTexture:this._opacityTexture=r.getAlphaTestTexture(),this._opacityTexture)){if(!this._opacityTexture.isReady())return!1;const M=(i=r.alphaCutOff)!==null&&i!==void 0?i:o.DEFAULT_ALPHA_CUTOFF;a.push("#define ALPHATEXTURE"),m&&a.push(`#define ALPHATESTVALUE ${M}${M%1===0?".":""}`),f.isVerticesDataPresent(x.UVKind)&&(h.push(x.UVKind),a.push("#define UV1")),f.isVerticesDataPresent(x.UV2Kind)&&this._opacityTexture.coordinatesIndex===1&&(h.push(x.UV2Kind),a.push("#define UV2"))}const p=new ue;if(f.useBones&&f.computeBonesUsingShaders&&f.skeleton){h.push(x.MatricesIndicesKind),h.push(x.MatricesWeightsKind),f.numBoneInfluencers>4&&(h.push(x.MatricesIndicesExtraKind),h.push(x.MatricesWeightsExtraKind));const M=f.skeleton;a.push("#define NUM_BONE_INFLUENCERS "+f.numBoneInfluencers),f.numBoneInfluencers>0&&p.addCPUSkinningFallback(0,f),M.isUsingTextureForMatrices?a.push("#define BONETEXTURE"):a.push("#define BonesPerMesh "+(M.bones.length+1))}else a.push("#define NUM_BONE_INFLUENCERS 0");const l=f.morphTargetManager;let g=0;if(l&&l.numInfluencers>0&&(a.push("#define MORPHTARGETS"),g=l.numInfluencers,a.push("#define NUM_MORPH_INFLUENCERS "+g),l.isUsingTextureForTargets&&a.push("#define MORPHTARGETS_TEXTURE"),L.PrepareAttributesForMorphTargetsInfluencers(h,f,g)),se(r,this._scene,a),t&&(a.push("#define INSTANCES"),L.PushAttributesForInstances(h),e.getRenderingMesh().hasThinInstances&&a.push("#define THIN_INSTANCES")),this.customShaderOptions&&this.customShaderOptions.defines)for(const M of this.customShaderOptions.defines)a.indexOf(M)===-1&&a.push(M);const _=a.join(`
`);if(u!==_){u=_;let M="shadowMap";const v=["world","mBones","viewProjection","diffuseMatrix","lightDataSM","depthValuesSM","biasAndScaleSM","morphTargetInfluences","boneTextureWidth","softTransparentShadowSM","morphTargetTextureInfo","morphTargetTextureIndices"],C=["diffuseSampler","boneSampler","morphTargets"],F=["Scene","Mesh"];if(ie(v),this.customShaderOptions){if(M=this.customShaderOptions.shaderName,this.customShaderOptions.attributes)for(const w of this.customShaderOptions.attributes)h.indexOf(w)===-1&&h.push(w);if(this.customShaderOptions.uniforms)for(const w of this.customShaderOptions.uniforms)v.indexOf(w)===-1&&v.push(w);if(this.customShaderOptions.samplers)for(const w of this.customShaderOptions.samplers)C.indexOf(w)===-1&&C.push(w)}const B=this._scene.getEngine();c=B.createEffect(M,{attributes:h,uniformsNames:v,uniformBuffersNames:F,samplers:C,defines:_,fallbacks:p,onCompiled:null,onError:null,indexParameters:{maxSimultaneousMorphTargets:g}},B),d.setEffect(c,u)}if(!c.isReady())return!1}return(this.useBlurExponentialShadowMap||this.useBlurCloseExponentialShadowMap)&&(!this._blurPostProcesses||!this._blurPostProcesses.length)&&this._initializeBlurRTTAndPostProcesses(),!(this._kernelBlurXPostprocess&&!this._kernelBlurXPostprocess.isReady()||this._kernelBlurYPostprocess&&!this._kernelBlurYPostprocess.isReady()||this._boxBlurPostprocess&&!this._boxBlurPostprocess.isReady())}prepareDefines(e,t){const s=this._scene,i=this._light;!s.shadowsEnabled||!i.shadowEnabled||(e["SHADOW"+t]=!0,this.useContactHardeningShadow?(e["SHADOWPCSS"+t]=!0,this._filteringQuality===o.QUALITY_LOW?e["SHADOWLOWQUALITY"+t]=!0:this._filteringQuality===o.QUALITY_MEDIUM&&(e["SHADOWMEDIUMQUALITY"+t]=!0)):this.usePercentageCloserFiltering?(e["SHADOWPCF"+t]=!0,this._filteringQuality===o.QUALITY_LOW?e["SHADOWLOWQUALITY"+t]=!0:this._filteringQuality===o.QUALITY_MEDIUM&&(e["SHADOWMEDIUMQUALITY"+t]=!0)):this.usePoissonSampling?e["SHADOWPOISSON"+t]=!0:this.useExponentialShadowMap||this.useBlurExponentialShadowMap?e["SHADOWESM"+t]=!0:(this.useCloseExponentialShadowMap||this.useBlurCloseExponentialShadowMap)&&(e["SHADOWCLOSEESM"+t]=!0),i.needCube()&&(e["SHADOWCUBE"+t]=!0))}bindShadowLight(e,t){const s=this._light;if(!this._scene.shadowsEnabled||!s.shadowEnabled)return;const r=this._getCamera();if(!r)return;const n=this.getShadowMap();n&&(s.needCube()||t.setMatrix("lightMatrix"+e,this.getTransformMatrix()),this._filter===o.FILTER_PCF?(t.setDepthStencilTexture("shadowSampler"+e,this.getShadowMapForRendering()),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),n.getSize().width,1/n.getSize().width,this.frustumEdgeFalloff,e)):this._filter===o.FILTER_PCSS?(t.setDepthStencilTexture("shadowSampler"+e,this.getShadowMapForRendering()),t.setTexture("depthSampler"+e,this.getShadowMapForRendering()),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),1/n.getSize().width,this._contactHardeningLightSizeUVRatio*n.getSize().width,this.frustumEdgeFalloff,e)):(t.setTexture("shadowSampler"+e,this.getShadowMapForRendering()),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),this.blurScale/n.getSize().width,this.depthScale,this.frustumEdgeFalloff,e)),s._uniformBuffer.updateFloat2("depthValues",this.getLight().getDepthMinZ(r),this.getLight().getDepthMinZ(r)+this.getLight().getDepthMaxZ(r),e))}getTransformMatrix(){const e=this._scene;if(this._currentRenderId===e.getRenderId()&&this._currentFaceIndexCache===this._currentFaceIndex)return this._transformMatrix;this._currentRenderId=e.getRenderId(),this._currentFaceIndexCache=this._currentFaceIndex;let t=this._light.position;if(this._light.computeTransformedInformation()&&(t=this._light.transformedPosition),S.NormalizeToRef(this._light.getShadowDirection(this._currentFaceIndex),this._lightDirection),Math.abs(S.Dot(this._lightDirection,S.Up()))===1&&(this._lightDirection.z=1e-13),this._light.needProjectionMatrixCompute()||!this._cachedPosition||!this._cachedDirection||!t.equals(this._cachedPosition)||!this._lightDirection.equals(this._cachedDirection)){this._cachedPosition.copyFrom(t),this._cachedDirection.copyFrom(this._lightDirection),b.LookAtLHToRef(t,t.add(this._lightDirection),S.Up(),this._viewMatrix);const s=this.getShadowMap();if(s){const i=s.renderList;i&&this._light.setShadowProjectionMatrix(this._projectionMatrix,this._viewMatrix,i)}this._viewMatrix.multiplyToRef(this._projectionMatrix,this._transformMatrix)}return this._transformMatrix}recreateShadowMap(){const e=this._shadowMap;if(!e)return;const t=e.renderList;if(this._disposeRTTandPostProcesses(),this._initializeGenerator(),this.filter=this._filter,this._applyFilterValues(),t){this._shadowMap.renderList||(this._shadowMap.renderList=[]);for(const s of t)this._shadowMap.renderList.push(s)}else this._shadowMap.renderList=null}_disposeBlurPostProcesses(){this._shadowMap2&&(this._shadowMap2.dispose(),this._shadowMap2=null),this._boxBlurPostprocess&&(this._boxBlurPostprocess.dispose(),this._boxBlurPostprocess=null),this._kernelBlurXPostprocess&&(this._kernelBlurXPostprocess.dispose(),this._kernelBlurXPostprocess=null),this._kernelBlurYPostprocess&&(this._kernelBlurYPostprocess.dispose(),this._kernelBlurYPostprocess=null),this._blurPostProcesses=[]}_disposeRTTandPostProcesses(){this._shadowMap&&(this._shadowMap.dispose(),this._shadowMap=null),this._disposeBlurPostProcesses()}_disposeSceneUBOs(){if(this._sceneUBOs){for(const e of this._sceneUBOs)e.dispose();this._sceneUBOs=[]}}dispose(){if(this._disposeRTTandPostProcesses(),this._disposeSceneUBOs(),this._light){if(this._light._shadowGenerators){const e=this._light._shadowGenerators.entries();for(let t=e.next();t.done!==!0;t=e.next()){const[s,i]=t.value;i===this&&this._light._shadowGenerators.delete(s)}this._light._shadowGenerators.size===0&&(this._light._shadowGenerators=null)}this._light._markMeshesAsLightDirty()}this.onBeforeShadowMapRenderMeshObservable.clear(),this.onBeforeShadowMapRenderObservable.clear(),this.onAfterShadowMapRenderMeshObservable.clear(),this.onAfterShadowMapRenderObservable.clear()}serialize(){var e;const t={},s=this.getShadowMap();if(!s)return t;if(t.className=this.getClassName(),t.lightId=this._light.id,t.cameraId=(e=this._camera)===null||e===void 0?void 0:e.id,t.id=this.id,t.mapSize=s.getRenderSize(),t.forceBackFacesOnly=this.forceBackFacesOnly,t.darkness=this.getDarkness(),t.transparencyShadow=this._transparencyShadow,t.frustumEdgeFalloff=this.frustumEdgeFalloff,t.bias=this.bias,t.normalBias=this.normalBias,t.usePercentageCloserFiltering=this.usePercentageCloserFiltering,t.useContactHardeningShadow=this.useContactHardeningShadow,t.contactHardeningLightSizeUVRatio=this.contactHardeningLightSizeUVRatio,t.filteringQuality=this.filteringQuality,t.useExponentialShadowMap=this.useExponentialShadowMap,t.useBlurExponentialShadowMap=this.useBlurExponentialShadowMap,t.useCloseExponentialShadowMap=this.useBlurExponentialShadowMap,t.useBlurCloseExponentialShadowMap=this.useBlurExponentialShadowMap,t.usePoissonSampling=this.usePoissonSampling,t.depthScale=this.depthScale,t.blurBoxOffset=this.blurBoxOffset,t.blurKernel=this.blurKernel,t.blurScale=this.blurScale,t.useKernelBlur=this.useKernelBlur,t.renderList=[],s.renderList)for(let i=0;i<s.renderList.length;i++){const r=s.renderList[i];t.renderList.push(r.id)}return t}static Parse(e,t,s){const i=t.getLightById(e.lightId),r=e.cameraId!==void 0?t.getCameraById(e.cameraId):null,n=s?s(e.mapSize,i,r):new o(e.mapSize,i,void 0,r),a=n.getShadowMap();for(let d=0;d<e.renderList.length;d++)t.getMeshesById(e.renderList[d]).forEach(function(u){a&&(a.renderList||(a.renderList=[]),a.renderList.push(u))});return e.id!==void 0&&(n.id=e.id),n.forceBackFacesOnly=!!e.forceBackFacesOnly,e.darkness!==void 0&&n.setDarkness(e.darkness),e.transparencyShadow&&n.setTransparencyShadow(!0),e.frustumEdgeFalloff!==void 0&&(n.frustumEdgeFalloff=e.frustumEdgeFalloff),e.bias!==void 0&&(n.bias=e.bias),e.normalBias!==void 0&&(n.normalBias=e.normalBias),e.usePercentageCloserFiltering?n.usePercentageCloserFiltering=!0:e.useContactHardeningShadow?n.useContactHardeningShadow=!0:e.usePoissonSampling?n.usePoissonSampling=!0:e.useExponentialShadowMap?n.useExponentialShadowMap=!0:e.useBlurExponentialShadowMap?n.useBlurExponentialShadowMap=!0:e.useCloseExponentialShadowMap?n.useCloseExponentialShadowMap=!0:e.useBlurCloseExponentialShadowMap?n.useBlurCloseExponentialShadowMap=!0:e.useVarianceShadowMap?n.useExponentialShadowMap=!0:e.useBlurVarianceShadowMap&&(n.useBlurExponentialShadowMap=!0),e.contactHardeningLightSizeUVRatio!==void 0&&(n.contactHardeningLightSizeUVRatio=e.contactHardeningLightSizeUVRatio),e.filteringQuality!==void 0&&(n.filteringQuality=e.filteringQuality),e.depthScale&&(n.depthScale=e.depthScale),e.blurScale&&(n.blurScale=e.blurScale),e.blurBoxOffset&&(n.blurBoxOffset=e.blurBoxOffset),e.useKernelBlur&&(n.useKernelBlur=e.useKernelBlur),e.blurKernel&&(n.blurKernel=e.blurKernel),n}}o.CLASSNAME="ShadowGenerator";o.FILTER_NONE=0;o.FILTER_EXPONENTIALSHADOWMAP=1;o.FILTER_POISSONSAMPLING=2;o.FILTER_BLUREXPONENTIALSHADOWMAP=3;o.FILTER_CLOSEEXPONENTIALSHADOWMAP=4;o.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP=5;o.FILTER_PCF=6;o.FILTER_PCSS=7;o.QUALITY_HIGH=0;o.QUALITY_MEDIUM=1;o.QUALITY_LOW=2;o.DEFAULT_ALPHA_CUTOFF=.5;o._SceneComponentInitialization=D=>{throw Q("ShadowGeneratorSceneComponent")};const He="depthPixelShader",We=`#ifdef ALPHATEST
varying vec2 vUV;
uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
varying float vDepthMetric;
#ifdef PACKED
#include<packingFunctions>
#endif
#ifdef STORE_CAMERASPACE_Z
varying vec4 vViewPos;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
#ifdef STORE_CAMERASPACE_Z
#ifdef PACKED
gl_FragColor=pack(vViewPos.z);
#else
gl_FragColor=vec4(vViewPos.z,0.0,0.0,1.0);
#endif
#else
#ifdef NONLINEARDEPTH
#ifdef PACKED
gl_FragColor=pack(gl_FragCoord.z);
#else
gl_FragColor=vec4(gl_FragCoord.z,0.0,0.0,0.0);
#endif
#else
#ifdef PACKED
gl_FragColor=pack(vDepthMetric);
#else
gl_FragColor=vec4(vDepthMetric,0.0,0.0,1.0);
#endif
#endif
#endif
}`;R.ShadersStore[He]=We;const ke="depthVertexShader",Ze=`attribute vec3 position;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;
uniform vec2 depthValues;
#if defined(ALPHATEST) || defined(NEED_UV)
varying vec2 vUV;
uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#ifdef STORE_CAMERASPACE_Z
uniform mat4 view;
varying vec4 vViewPos;
#endif
varying float vDepthMetric;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#include<clipPlaneVertex>
gl_Position=viewProjection*worldPos;
#ifdef STORE_CAMERASPACE_Z
vViewPos=view*worldPos;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric=((-gl_Position.z+depthValues.x)/(depthValues.y));
#else
vDepthMetric=((gl_Position.z+depthValues.x)/(depthValues.y));
#endif
#endif
#if defined(ALPHATEST) || defined(BASIC_RENDER)
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
}
`;R.ShadersStore[ke]=Ze;class K{setMaterialForRendering(e,t){this._depthMap.setMaterialForRendering(e,t)}constructor(e,t=1,s=null,i=!1,r=A.TRILINEAR_SAMPLINGMODE,n=!1,a){this.enabled=!0,this.forceDepthWriteTransparentMeshes=!1,this.useOnlyInActiveCamera=!1,this.reverseCulling=!1,this._scene=e,this._storeNonLinearDepth=i,this._storeCameraSpaceZ=n,this.isPacked=t===0,this.isPacked?this.clearColor=new Z(1,1,1,1):this.clearColor=new Z(n?1e8:1,0,0,1),K._SceneComponentInitialization(this._scene);const d=e.getEngine();this._camera=s,r!==A.NEAREST_SAMPLINGMODE&&(t===1&&!d._caps.textureFloatLinearFiltering&&(r=A.NEAREST_SAMPLINGMODE),t===2&&!d._caps.textureHalfFloatLinearFiltering&&(r=A.NEAREST_SAMPLINGMODE));const c=this.isPacked||!d._features.supportExtendedTextureFormats?5:6;this._depthMap=new z(a??"DepthRenderer",{width:d.getRenderWidth(),height:d.getRenderHeight()},this._scene,!1,!0,t,!1,r,void 0,void 0,void 0,c),this._depthMap.wrapU=A.CLAMP_ADDRESSMODE,this._depthMap.wrapV=A.CLAMP_ADDRESSMODE,this._depthMap.refreshRate=1,this._depthMap.renderParticles=!1,this._depthMap.renderList=null,this._depthMap.noPrePassRenderer=!0,this._depthMap.activeCamera=this._camera,this._depthMap.ignoreCameraViewport=!0,this._depthMap.useCameraPostProcesses=!1,this._depthMap.onClearObservable.add(h=>{h.clear(this.clearColor,!0,!0,!0)}),this._depthMap.onBeforeBindObservable.add(()=>{var h;(h=d._debugPushGroup)===null||h===void 0||h.call(d,"depth renderer",1)}),this._depthMap.onAfterUnbindObservable.add(()=>{var h;(h=d._debugPopGroup)===null||h===void 0||h.call(d,1)}),this._depthMap.customIsReadyFunction=(h,f,m)=>{if((m||f===0)&&h.subMeshes)for(let p=0;p<h.subMeshes.length;++p){const l=h.subMeshes[p],g=l.getRenderingMesh(),_=g._getInstancesRenderList(l._id,!!l.getReplacementMesh()),M=d.getCaps().instancedArrays&&(_.visibleInstances[l._id]!==null&&_.visibleInstances[l._id]!==void 0||g.hasThinInstances);if(!this.isReady(l,M))return!1}return!0};const u=h=>{var f,m;const p=h.getRenderingMesh(),l=h.getEffectiveMesh(),g=this._scene,_=g.getEngine(),M=h.getMaterial();if(l._internalAbstractMeshDataInfo._isActiveIntermediate=!1,!M||l.infiniteDistance||M.disableDepthWrite||h.verticesCount===0||h._renderId===g.getRenderId())return;const v=l._getWorldMatrixDeterminant()<0;let C=(f=p.overrideMaterialSideOrientation)!==null&&f!==void 0?f:M.sideOrientation;v&&(C=C===0?1:0);const F=C===0;_.setState(M.backFaceCulling,0,!1,F,this.reverseCulling?!M.cullBackFaces:M.cullBackFaces);const B=p._getInstancesRenderList(h._id,!!h.getReplacementMesh());if(B.mustReturn)return;const w=_.getCaps().instancedArrays&&(B.visibleInstances[h._id]!==null&&B.visibleInstances[h._id]!==void 0||p.hasThinInstances),N=this._camera||g.activeCamera;if(this.isReady(h,w)&&N){h._renderId=g.getRenderId();const U=(m=l._internalAbstractMeshDataInfo._materialForRenderPass)===null||m===void 0?void 0:m[_.currentRenderPassId];let y=h._getDrawWrapper();!y&&U&&(y=U._getDrawWrapper());const re=N.mode===ae.ORTHOGRAPHIC_CAMERA;if(!y)return;const P=y.effect;_.enableEffect(y),w||p._bind(h,P,M.fillMode),U?U.bindForSubMesh(l.getWorldMatrix(),l,h):(P.setMatrix("viewProjection",g.getTransformMatrix()),P.setMatrix("world",l.getWorldMatrix()),this._storeCameraSpaceZ&&P.setMatrix("view",g.getViewMatrix()));let H,$;if(re?(H=!_.useReverseDepthBuffer&&_.isNDCHalfZRange?0:1,$=_.useReverseDepthBuffer&&_.isNDCHalfZRange?0:1):(H=_.useReverseDepthBuffer&&_.isNDCHalfZRange?N.minZ:_.isNDCHalfZRange?0:N.minZ,$=_.useReverseDepthBuffer&&_.isNDCHalfZRange?0:N.maxZ),P.setFloat2("depthValues",H,H+$),!U){if(M.needAlphaTesting()){const I=M.getAlphaTestTexture();I&&(P.setTexture("diffuseSampler",I),P.setMatrix("diffuseMatrix",I.getTextureMatrix()))}if(p.useBones&&p.computeBonesUsingShaders&&p.skeleton){const I=p.skeleton;if(I.isUsingTextureForMatrices){const W=I.getTransformMatrixTexture(p);if(!W)return;P.setTexture("boneSampler",W),P.setFloat("boneTextureWidth",4*(I.bones.length+1))}else P.setMatrices("mBones",I.getTransformMatrices(p))}te(P,M,g),L.BindMorphTargetParameters(p,P),p.morphTargetManager&&p.morphTargetManager.isUsingTextureForTargets&&p.morphTargetManager._bind(P)}p._processRendering(l,h,P,M.fillMode,B,w,(I,W)=>P.setMatrix("world",W))}};this._depthMap.customRenderFunction=(h,f,m,p)=>{let l;if(p.length)for(l=0;l<p.length;l++)u(p.data[l]);for(l=0;l<h.length;l++)u(h.data[l]);for(l=0;l<f.length;l++)u(f.data[l]);if(this.forceDepthWriteTransparentMeshes)for(l=0;l<m.length;l++)u(m.data[l]);else for(l=0;l<m.length;l++)m.data[l].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate=!1}}isReady(e,t){var s;const i=this._scene.getEngine(),r=e.getMesh(),n=r.getScene(),a=(s=r._internalAbstractMeshDataInfo._materialForRenderPass)===null||s===void 0?void 0:s[i.currentRenderPassId];if(a)return a.isReadyForSubMesh(r,e,t);const d=e.getMaterial();if(!d||d.disableDepthWrite)return!1;const c=[],u=[x.PositionKind];if(d&&d.needAlphaTesting()&&d.getAlphaTestTexture()&&(c.push("#define ALPHATEST"),r.isVerticesDataPresent(x.UVKind)&&(u.push(x.UVKind),c.push("#define UV1")),r.isVerticesDataPresent(x.UV2Kind)&&(u.push(x.UV2Kind),c.push("#define UV2"))),r.useBones&&r.computeBonesUsingShaders){u.push(x.MatricesIndicesKind),u.push(x.MatricesWeightsKind),r.numBoneInfluencers>4&&(u.push(x.MatricesIndicesExtraKind),u.push(x.MatricesWeightsExtraKind)),c.push("#define NUM_BONE_INFLUENCERS "+r.numBoneInfluencers),c.push("#define BonesPerMesh "+(r.skeleton?r.skeleton.bones.length+1:0));const g=e.getRenderingMesh().skeleton;g!=null&&g.isUsingTextureForMatrices&&c.push("#define BONETEXTURE")}else c.push("#define NUM_BONE_INFLUENCERS 0");const h=r.morphTargetManager;let f=0;h&&h.numInfluencers>0&&(f=h.numInfluencers,c.push("#define MORPHTARGETS"),c.push("#define NUM_MORPH_INFLUENCERS "+f),h.isUsingTextureForTargets&&c.push("#define MORPHTARGETS_TEXTURE"),L.PrepareAttributesForMorphTargetsInfluencers(u,r,f)),t&&(c.push("#define INSTANCES"),L.PushAttributesForInstances(u),e.getRenderingMesh().hasThinInstances&&c.push("#define THIN_INSTANCES")),this._storeNonLinearDepth&&c.push("#define NONLINEARDEPTH"),this._storeCameraSpaceZ&&c.push("#define STORE_CAMERASPACE_Z"),this.isPacked&&c.push("#define PACKED"),se(d,n,c);const m=e._getDrawWrapper(void 0,!0),p=m.defines,l=c.join(`
`);if(p!==l){const g=["world","mBones","boneTextureWidth","viewProjection","view","diffuseMatrix","depthValues","morphTargetInfluences","morphTargetTextureInfo","morphTargetTextureIndices"];ie(g),m.setEffect(i.createEffect("depth",u,g,["diffuseSampler","morphTargets","boneSampler"],l,void 0,void 0,void 0,{maxSimultaneousMorphTargets:f}),l)}return m.effect.isReady()}getDepthMap(){return this._depthMap}dispose(){const e=[];for(const t in this._scene._depthRenderer)this._scene._depthRenderer[t]===this&&e.push(t);if(e.length>0){this._depthMap.dispose();for(const t of e)delete this._scene._depthRenderer[t]}}}K._SceneComponentInitialization=D=>{throw Q("DepthRendererSceneComponent")};const Xe="minmaxReduxPixelShader",Ke=`varying vec2 vUV;
uniform sampler2D textureSampler;
#if defined(INITIAL)
uniform sampler2D sourceTexture;
uniform vec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*(texSize-1.0));
float f1=texelFetch(sourceTexture,coord,0).r;
float f2=texelFetch(sourceTexture,coord+ivec2(1,0),0).r;
float f3=texelFetch(sourceTexture,coord+ivec2(1,1),0).r;
float f4=texelFetch(sourceTexture,coord+ivec2(0,1),0).r;
float minz=min(min(min(f1,f2),f3),f4);
#ifdef DEPTH_REDUX
float maxz=max(max(max(sign(1.0-f1)*f1,sign(1.0-f2)*f2),sign(1.0-f3)*f3),sign(1.0-f4)*f4);
#else
float maxz=max(max(max(f1,f2),f3),f4);
#endif
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(MAIN)
uniform vec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*(texSize-1.0));
vec2 f1=texelFetch(textureSampler,coord,0).rg;
vec2 f2=texelFetch(textureSampler,coord+ivec2(1,0),0).rg;
vec2 f3=texelFetch(textureSampler,coord+ivec2(1,1),0).rg;
vec2 f4=texelFetch(textureSampler,coord+ivec2(0,1),0).rg;
float minz=min(min(min(f1.x,f2.x),f3.x),f4.x);
float maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(ONEBEFORELAST)
uniform ivec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*vec2(texSize-1));
vec2 f1=texelFetch(textureSampler,coord % texSize,0).rg;
vec2 f2=texelFetch(textureSampler,(coord+ivec2(1,0)) % texSize,0).rg;
vec2 f3=texelFetch(textureSampler,(coord+ivec2(1,1)) % texSize,0).rg;
vec2 f4=texelFetch(textureSampler,(coord+ivec2(0,1)) % texSize,0).rg;
float minz=min(f1.x,f2.x);
float maxz=max(f1.y,f2.y);
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(LAST)
void main(void)
{
glFragColor=vec4(0.);
if (true) { 
discard;
}
}
#endif
`;R.ShadersStore[Xe]=Ke;class $e{constructor(e){this.onAfterReductionPerformed=new V,this._forceFullscreenViewport=!0,this._activated=!1,this._camera=e,this._postProcessManager=new oe(e.getScene()),this._onContextRestoredObserver=e.getEngine().onContextRestoredObservable.add(()=>{this._postProcessManager._rebuild()})}get sourceTexture(){return this._sourceTexture}setSourceTexture(e,t,s=2,i=!0){if(e===this._sourceTexture)return;this.dispose(!1),this._sourceTexture=e,this._reductionSteps=[],this._forceFullscreenViewport=i;const r=this._camera.getScene(),n=new j("Initial reduction phase","minmaxRedux",["texSize"],["sourceTexture"],1,null,1,r.getEngine(),!1,"#define INITIAL"+(t?`
#define DEPTH_REDUX`:""),s,void 0,void 0,void 0,7);n.autoClear=!1,n.forceFullscreenViewport=i;let a=this._sourceTexture.getRenderWidth(),d=this._sourceTexture.getRenderHeight();n.onApply=((u,h)=>f=>{f.setTexture("sourceTexture",this._sourceTexture),f.setFloat2("texSize",u,h)})(a,d),this._reductionSteps.push(n);let c=1;for(;a>1||d>1;){a=Math.max(Math.round(a/2),1),d=Math.max(Math.round(d/2),1);const u=new j("Reduction phase "+c,"minmaxRedux",["texSize"],null,{width:a,height:d},null,1,r.getEngine(),!1,"#define "+(a==1&&d==1?"LAST":a==1||d==1?"ONEBEFORELAST":"MAIN"),s,void 0,void 0,void 0,7);if(u.autoClear=!1,u.forceFullscreenViewport=i,u.onApply=((h,f)=>m=>{h==1||f==1?m.setInt2("texSize",h,f):m.setFloat2("texSize",h,f)})(a,d),this._reductionSteps.push(u),c++,a==1&&d==1){const h=(f,m,p)=>{const l=new Float32Array(4*f*m),g={min:0,max:0};return()=>{r.getEngine()._readTexturePixels(p.inputTexture.texture,f,m,-1,0,l,!1),g.min=l[0],g.max=l[1],this.onAfterReductionPerformed.notifyObservers(g)}};u.onAfterRenderObservable.add(h(a,d,u))}}}get refreshRate(){return this._sourceTexture?this._sourceTexture.refreshRate:-1}set refreshRate(e){this._sourceTexture&&(this._sourceTexture.refreshRate=e)}get activated(){return this._activated}activate(){this._onAfterUnbindObserver||!this._sourceTexture||(this._onAfterUnbindObserver=this._sourceTexture.onAfterUnbindObservable.add(()=>{var e,t;const s=this._camera.getScene().getEngine();(e=s._debugPushGroup)===null||e===void 0||e.call(s,"min max reduction",1),this._reductionSteps[0].activate(this._camera),this._postProcessManager.directRender(this._reductionSteps,this._reductionSteps[0].inputTexture,this._forceFullscreenViewport),s.unBindFramebuffer(this._reductionSteps[0].inputTexture,!1),(t=s._debugPopGroup)===null||t===void 0||t.call(s,1)}),this._activated=!0)}deactivate(){!this._onAfterUnbindObserver||!this._sourceTexture||(this._sourceTexture.onAfterUnbindObservable.remove(this._onAfterUnbindObserver),this._onAfterUnbindObserver=null,this._activated=!1)}dispose(e=!0){if(e&&(this.onAfterReductionPerformed.clear(),this._onContextRestoredObserver&&(this._camera.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver),this._onContextRestoredObserver=null)),this.deactivate(),this._reductionSteps){for(let t=0;t<this._reductionSteps.length;++t)this._reductionSteps[t].dispose();this._reductionSteps=null}this._postProcessManager&&e&&this._postProcessManager.dispose(),this._sourceTexture=null}}class je extends $e{get depthRenderer(){return this._depthRenderer}constructor(e){super(e)}setDepthRenderer(e=null,t=2,s=!0){const i=this._camera.getScene();this._depthRenderer&&(delete i._depthRenderer[this._depthRendererId],this._depthRenderer.dispose(),this._depthRenderer=null),e===null&&(i._depthRenderer||(i._depthRenderer={}),e=this._depthRenderer=new K(i,t,this._camera,!1,1),e.enabled=!1,this._depthRendererId="minmax"+this._camera.id,i._depthRenderer[this._depthRendererId]=e),super.setSourceTexture(e.getDepthMap(),!0,t,s)}setSourceTexture(e,t,s=2,i=!0){super.setSourceTexture(e,t,s,i)}activate(){this._depthRenderer&&(this._depthRenderer.enabled=!0),super.activate()}deactivate(){super.deactivate(),this._depthRenderer&&(this._depthRenderer.enabled=!1)}dispose(e=!0){if(super.dispose(e),this._depthRenderer&&e){const t=this._depthRenderer.getDepthMap().getScene();t&&delete t._depthRenderer[this._depthRendererId],this._depthRenderer.dispose(),this._depthRenderer=null}}}const ee=S.Up(),Qe=S.Zero(),E=new S,O=new S,k=new b;class T extends o{_validateFilter(e){return e===o.FILTER_NONE||e===o.FILTER_PCF||e===o.FILTER_PCSS?e:(console.error('Unsupported filter "'+e+'"!'),o.FILTER_NONE)}get numCascades(){return this._numCascades}set numCascades(e){e=Math.min(Math.max(e,T.MIN_CASCADES_COUNT),T.MAX_CASCADES_COUNT),e!==this._numCascades&&(this._numCascades=e,this.recreateShadowMap(),this._recreateSceneUBOs())}get freezeShadowCastersBoundingInfo(){return this._freezeShadowCastersBoundingInfo}set freezeShadowCastersBoundingInfo(e){this._freezeShadowCastersBoundingInfoObservable&&e&&(this._scene.onBeforeRenderObservable.remove(this._freezeShadowCastersBoundingInfoObservable),this._freezeShadowCastersBoundingInfoObservable=null),!this._freezeShadowCastersBoundingInfoObservable&&!e&&(this._freezeShadowCastersBoundingInfoObservable=this._scene.onBeforeRenderObservable.add(this._computeShadowCastersBoundingInfo.bind(this))),this._freezeShadowCastersBoundingInfo=e,e&&this._computeShadowCastersBoundingInfo()}_computeShadowCastersBoundingInfo(){if(this._scbiMin.copyFromFloats(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._scbiMax.copyFromFloats(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE),this._shadowMap&&this._shadowMap.renderList){const e=this._shadowMap.renderList;for(let s=0;s<e.length;s++){const i=e[s];if(!i)continue;const r=i.getBoundingInfo(),n=r.boundingBox;this._scbiMin.minimizeInPlace(n.minimumWorld),this._scbiMax.maximizeInPlace(n.maximumWorld)}const t=this._scene.meshes;for(let s=0;s<t.length;s++){const i=t[s];if(!i||!i.isVisible||!i.isEnabled||!i.receiveShadows)continue;const r=i.getBoundingInfo(),n=r.boundingBox;this._scbiMin.minimizeInPlace(n.minimumWorld),this._scbiMax.maximizeInPlace(n.maximumWorld)}}this._shadowCastersBoundingInfo.reConstruct(this._scbiMin,this._scbiMax)}get shadowCastersBoundingInfo(){return this._shadowCastersBoundingInfo}set shadowCastersBoundingInfo(e){this._shadowCastersBoundingInfo=e}setMinMaxDistance(e,t){this._minDistance===e&&this._maxDistance===t||(e>t&&(e=0,t=1),e<0&&(e=0),t>1&&(t=1),this._minDistance=e,this._maxDistance=t,this._breaksAreDirty=!0)}get minDistance(){return this._minDistance}get maxDistance(){return this._maxDistance}getClassName(){return T.CLASSNAME}getCascadeMinExtents(e){return e>=0&&e<this._numCascades?this._cascadeMinExtents[e]:null}getCascadeMaxExtents(e){return e>=0&&e<this._numCascades?this._cascadeMaxExtents[e]:null}get shadowMaxZ(){return this._getCamera()?this._shadowMaxZ:0}set shadowMaxZ(e){const t=this._getCamera();if(!t){this._shadowMaxZ=e;return}this._shadowMaxZ===e||e<t.minZ||e>t.maxZ||(this._shadowMaxZ=e,this._light._markMeshesAsLightDirty(),this._breaksAreDirty=!0)}get debug(){return this._debug}set debug(e){this._debug=e,this._light._markMeshesAsLightDirty()}get depthClamp(){return this._depthClamp}set depthClamp(e){this._depthClamp=e}get cascadeBlendPercentage(){return this._cascadeBlendPercentage}set cascadeBlendPercentage(e){this._cascadeBlendPercentage=e,this._light._markMeshesAsLightDirty()}get lambda(){return this._lambda}set lambda(e){const t=Math.min(Math.max(e,0),1);this._lambda!=t&&(this._lambda=t,this._breaksAreDirty=!0)}getCascadeViewMatrix(e){return e>=0&&e<this._numCascades?this._viewMatrices[e]:null}getCascadeProjectionMatrix(e){return e>=0&&e<this._numCascades?this._projectionMatrices[e]:null}getCascadeTransformMatrix(e){return e>=0&&e<this._numCascades?this._transformMatrices[e]:null}setDepthRenderer(e){this._depthRenderer=e,this._depthReducer&&this._depthReducer.setDepthRenderer(this._depthRenderer)}get autoCalcDepthBounds(){return this._autoCalcDepthBounds}set autoCalcDepthBounds(e){const t=this._getCamera();if(t){if(this._autoCalcDepthBounds=e,!e){this._depthReducer&&this._depthReducer.deactivate(),this.setMinMaxDistance(0,1);return}this._depthReducer||(this._depthReducer=new je(t),this._depthReducer.onAfterReductionPerformed.add(s=>{let i=s.min,r=s.max;i>=r&&(i=0,r=1),(i!=this._minDistance||r!=this._maxDistance)&&this.setMinMaxDistance(i,r)}),this._depthReducer.setDepthRenderer(this._depthRenderer)),this._depthReducer.activate()}}get autoCalcDepthBoundsRefreshRate(){var e,t,s;return(s=(t=(e=this._depthReducer)===null||e===void 0?void 0:e.depthRenderer)===null||t===void 0?void 0:t.getDepthMap().refreshRate)!==null&&s!==void 0?s:-1}set autoCalcDepthBoundsRefreshRate(e){var t;!((t=this._depthReducer)===null||t===void 0)&&t.depthRenderer&&(this._depthReducer.depthRenderer.getDepthMap().refreshRate=e)}splitFrustum(){this._breaksAreDirty=!0}_splitFrustum(){const e=this._getCamera();if(!e)return;const t=e.minZ,s=e.maxZ||this._shadowMaxZ,i=s-t,r=this._minDistance,n=this._shadowMaxZ<s&&this._shadowMaxZ>=t?Math.min((this._shadowMaxZ-t)/(s-t),this._maxDistance):this._maxDistance,a=t+r*i,d=t+n*i,c=d-a,u=d/a;for(let h=0;h<this._cascades.length;++h){const f=(h+1)/this._numCascades,m=a*u**f,p=a+c*f,l=this._lambda*(m-p)+p;this._cascades[h].prevBreakDistance=h===0?r:this._cascades[h-1].breakDistance,this._cascades[h].breakDistance=(l-t)/i,this._viewSpaceFrustumsZ[h]=l,this._frustumLengths[h]=(this._cascades[h].breakDistance-this._cascades[h].prevBreakDistance)*i}this._breaksAreDirty=!1}_computeMatrices(){const e=this._scene;if(!this._getCamera())return;S.NormalizeToRef(this._light.getShadowDirection(0),this._lightDirection),Math.abs(S.Dot(this._lightDirection,S.Up()))===1&&(this._lightDirection.z=1e-13),this._cachedDirection.copyFrom(this._lightDirection);const s=e.getEngine().useReverseDepthBuffer;for(let i=0;i<this._numCascades;++i){this._computeFrustumInWorldSpace(i),this._computeCascadeFrustum(i),this._cascadeMaxExtents[i].subtractToRef(this._cascadeMinExtents[i],E),this._frustumCenter[i].addToRef(this._lightDirection.scale(this._cascadeMinExtents[i].z),this._shadowCameraPos[i]),b.LookAtLHToRef(this._shadowCameraPos[i],this._frustumCenter[i],ee,this._viewMatrices[i]);let r=0,n=E.z;const a=this._shadowCastersBoundingInfo;a.update(this._viewMatrices[i]),n=Math.min(n,a.boundingBox.maximumWorld.z),!this._depthClamp||this.filter===o.FILTER_PCSS?r=Math.min(r,a.boundingBox.minimumWorld.z):r=Math.max(r,a.boundingBox.minimumWorld.z),b.OrthoOffCenterLHToRef(this._cascadeMinExtents[i].x,this._cascadeMaxExtents[i].x,this._cascadeMinExtents[i].y,this._cascadeMaxExtents[i].y,s?n:r,s?r:n,this._projectionMatrices[i],e.getEngine().isNDCHalfZRange),this._cascadeMinExtents[i].z=r,this._cascadeMaxExtents[i].z=n,this._viewMatrices[i].multiplyToRef(this._projectionMatrices[i],this._transformMatrices[i]),S.TransformCoordinatesToRef(Qe,this._transformMatrices[i],E),E.scaleInPlace(this._mapSize/2),O.copyFromFloats(Math.round(E.x),Math.round(E.y),Math.round(E.z)),O.subtractInPlace(E).scaleInPlace(2/this._mapSize),b.TranslationToRef(O.x,O.y,0,k),this._projectionMatrices[i].multiplyToRef(k,this._projectionMatrices[i]),this._viewMatrices[i].multiplyToRef(this._projectionMatrices[i],this._transformMatrices[i]),this._transformMatrices[i].copyToArray(this._transformMatricesAsArray,i*16)}}_computeFrustumInWorldSpace(e){const t=this._getCamera();if(!t)return;const s=this._cascades[e].prevBreakDistance,i=this._cascades[e].breakDistance,r=this._scene.getEngine().isNDCHalfZRange;t.getViewMatrix();const n=t.maxZ===0,a=t.maxZ;n&&(t.maxZ=this._shadowMaxZ,t.getProjectionMatrix(!0));const d=b.Invert(t.getTransformationMatrix());n&&(t.maxZ=a,t.getProjectionMatrix(!0));const c=this._scene.getEngine().useReverseDepthBuffer?4:0;for(let u=0;u<T._FrustumCornersNDCSpace.length;++u)E.copyFrom(T._FrustumCornersNDCSpace[(u+c)%T._FrustumCornersNDCSpace.length]),r&&E.z===-1&&(E.z=0),S.TransformCoordinatesToRef(E,d,this._frustumCornersWorldSpace[e][u]);for(let u=0;u<T._FrustumCornersNDCSpace.length/2;++u)E.copyFrom(this._frustumCornersWorldSpace[e][u+4]).subtractInPlace(this._frustumCornersWorldSpace[e][u]),O.copyFrom(E).scaleInPlace(s),E.scaleInPlace(i),E.addInPlace(this._frustumCornersWorldSpace[e][u]),this._frustumCornersWorldSpace[e][u+4].copyFrom(E),this._frustumCornersWorldSpace[e][u].addInPlace(O)}_computeCascadeFrustum(e){if(this._cascadeMinExtents[e].copyFromFloats(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cascadeMaxExtents[e].copyFromFloats(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE),this._frustumCenter[e].copyFromFloats(0,0,0),!!this._getCamera()){for(let s=0;s<this._frustumCornersWorldSpace[e].length;++s)this._frustumCenter[e].addInPlace(this._frustumCornersWorldSpace[e][s]);if(this._frustumCenter[e].scaleInPlace(1/this._frustumCornersWorldSpace[e].length),this.stabilizeCascades){let s=0;for(let i=0;i<this._frustumCornersWorldSpace[e].length;++i){const r=this._frustumCornersWorldSpace[e][i].subtractToRef(this._frustumCenter[e],E).length();s=Math.max(s,r)}s=Math.ceil(s*16)/16,this._cascadeMaxExtents[e].copyFromFloats(s,s,s),this._cascadeMinExtents[e].copyFromFloats(-s,-s,-s)}else{const s=this._frustumCenter[e];this._frustumCenter[e].addToRef(this._lightDirection,E),b.LookAtLHToRef(s,E,ee,k);for(let i=0;i<this._frustumCornersWorldSpace[e].length;++i)S.TransformCoordinatesToRef(this._frustumCornersWorldSpace[e][i],k,E),this._cascadeMinExtents[e].minimizeInPlace(E),this._cascadeMaxExtents[e].maximizeInPlace(E)}}}_recreateSceneUBOs(){if(this._disposeSceneUBOs(),this._sceneUBOs)for(let e=0;e<this._numCascades;++e)this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for CSM Shadow Generator (light "${this._light.name}" cascade #${e})`))}static get IsSupported(){const e=he.LastCreatedEngine;return e?e._features.supportCSM:!1}constructor(e,t,s,i){if(!T.IsSupported){de.Error("CascadedShadowMap is not supported by the current engine.");return}super(e,t,s,i),this.usePercentageCloserFiltering=!0}_initializeGenerator(){var e,t,s,i,r,n,a,d,c,u,h,f,m,p,l,g,_,M,v,C;this.penumbraDarkness=(e=this.penumbraDarkness)!==null&&e!==void 0?e:1,this._numCascades=(t=this._numCascades)!==null&&t!==void 0?t:T.DEFAULT_CASCADES_COUNT,this.stabilizeCascades=(s=this.stabilizeCascades)!==null&&s!==void 0?s:!1,this._freezeShadowCastersBoundingInfoObservable=(i=this._freezeShadowCastersBoundingInfoObservable)!==null&&i!==void 0?i:null,this.freezeShadowCastersBoundingInfo=(r=this.freezeShadowCastersBoundingInfo)!==null&&r!==void 0?r:!1,this._scbiMin=(n=this._scbiMin)!==null&&n!==void 0?n:new S(0,0,0),this._scbiMax=(a=this._scbiMax)!==null&&a!==void 0?a:new S(0,0,0),this._shadowCastersBoundingInfo=(d=this._shadowCastersBoundingInfo)!==null&&d!==void 0?d:new le(new S(0,0,0),new S(0,0,0)),this._breaksAreDirty=(c=this._breaksAreDirty)!==null&&c!==void 0?c:!0,this._minDistance=(u=this._minDistance)!==null&&u!==void 0?u:0,this._maxDistance=(h=this._maxDistance)!==null&&h!==void 0?h:1,this._currentLayer=(f=this._currentLayer)!==null&&f!==void 0?f:0,this._shadowMaxZ=(l=(m=this._shadowMaxZ)!==null&&m!==void 0?m:(p=this._getCamera())===null||p===void 0?void 0:p.maxZ)!==null&&l!==void 0?l:1e4,this._debug=(g=this._debug)!==null&&g!==void 0?g:!1,this._depthClamp=(_=this._depthClamp)!==null&&_!==void 0?_:!0,this._cascadeBlendPercentage=(M=this._cascadeBlendPercentage)!==null&&M!==void 0?M:.1,this._lambda=(v=this._lambda)!==null&&v!==void 0?v:.5,this._autoCalcDepthBounds=(C=this._autoCalcDepthBounds)!==null&&C!==void 0?C:!1,this._recreateSceneUBOs(),super._initializeGenerator()}_createTargetRenderTexture(){const e=this._scene.getEngine(),t={width:this._mapSize,height:this._mapSize,layers:this.numCascades};this._shadowMap=new z(this._light.name+"_CSMShadowMap",t,this._scene,!1,!0,this._textureType,!1,void 0,!1,!1,void 0),this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer?516:513,!0),this._shadowMap.noPrePassRenderer=!0}_initializeShadowMap(){if(super._initializeShadowMap(),this._shadowMap===null)return;this._transformMatricesAsArray=new Float32Array(this._numCascades*16),this._viewSpaceFrustumsZ=new Array(this._numCascades),this._frustumLengths=new Array(this._numCascades),this._lightSizeUVCorrection=new Array(this._numCascades*2),this._depthCorrection=new Array(this._numCascades),this._cascades=[],this._viewMatrices=[],this._projectionMatrices=[],this._transformMatrices=[],this._cascadeMinExtents=[],this._cascadeMaxExtents=[],this._frustumCenter=[],this._shadowCameraPos=[],this._frustumCornersWorldSpace=[];for(let t=0;t<this._numCascades;++t){this._cascades[t]={prevBreakDistance:0,breakDistance:0},this._viewMatrices[t]=b.Zero(),this._projectionMatrices[t]=b.Zero(),this._transformMatrices[t]=b.Zero(),this._cascadeMinExtents[t]=new S,this._cascadeMaxExtents[t]=new S,this._frustumCenter[t]=new S,this._shadowCameraPos[t]=new S,this._frustumCornersWorldSpace[t]=new Array(T._FrustumCornersNDCSpace.length);for(let s=0;s<T._FrustumCornersNDCSpace.length;++s)this._frustumCornersWorldSpace[t][s]=new S}const e=this._scene.getEngine();this._shadowMap.onBeforeBindObservable.clear(),this._shadowMap.onBeforeRenderObservable.clear(),this._shadowMap.onBeforeRenderObservable.add(t=>{this._sceneUBOs&&this._scene.setSceneUniformBuffer(this._sceneUBOs[t]),this._currentLayer=t,this._filter===o.FILTER_PCF&&e.setColorWrite(!1),this._scene.setTransformMatrix(this.getCascadeViewMatrix(t),this.getCascadeProjectionMatrix(t)),this._useUBO&&(this._scene.getSceneUniformBuffer().unbindEffect(),this._scene.finalizeSceneUbo())}),this._shadowMap.onBeforeBindObservable.add(()=>{var t;this._currentSceneUBO=this._scene.getSceneUniformBuffer(),(t=e._debugPushGroup)===null||t===void 0||t.call(e,`cascaded shadow map generation for pass id ${e.currentRenderPassId}`,1),this._breaksAreDirty&&this._splitFrustum(),this._computeMatrices()}),this._splitFrustum()}_bindCustomEffectForRenderSubMeshForShadowMap(e,t){t.setMatrix("viewProjection",this.getCascadeTransformMatrix(this._currentLayer))}_isReadyCustomDefines(e){e.push("#define SM_DEPTHCLAMP "+(this._depthClamp&&this._filter!==o.FILTER_PCSS?"1":"0"))}prepareDefines(e,t){super.prepareDefines(e,t);const s=this._scene,i=this._light;if(!s.shadowsEnabled||!i.shadowEnabled)return;e["SHADOWCSM"+t]=!0,e["SHADOWCSMDEBUG"+t]=this.debug,e["SHADOWCSMNUM_CASCADES"+t]=this.numCascades,e["SHADOWCSM_RIGHTHANDED"+t]=s.useRightHandedSystem;const r=this._getCamera();r&&this._shadowMaxZ<=(r.maxZ||this._shadowMaxZ)&&(e["SHADOWCSMUSESHADOWMAXZ"+t]=!0),this.cascadeBlendPercentage===0&&(e["SHADOWCSMNOBLEND"+t]=!0)}bindShadowLight(e,t){const s=this._light;if(!this._scene.shadowsEnabled||!s.shadowEnabled)return;const r=this._getCamera();if(!r)return;const n=this.getShadowMap();if(!n)return;const a=n.getSize().width;if(t.setMatrices("lightMatrix"+e,this._transformMatricesAsArray),t.setArray("viewFrustumZ"+e,this._viewSpaceFrustumsZ),t.setFloat("cascadeBlendFactor"+e,this.cascadeBlendPercentage===0?1e4:1/this.cascadeBlendPercentage),t.setArray("frustumLengths"+e,this._frustumLengths),this._filter===o.FILTER_PCF)t.setDepthStencilTexture("shadowSampler"+e,n),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),a,1/a,this.frustumEdgeFalloff,e);else if(this._filter===o.FILTER_PCSS){for(let d=0;d<this._numCascades;++d)this._lightSizeUVCorrection[d*2+0]=d===0?1:(this._cascadeMaxExtents[0].x-this._cascadeMinExtents[0].x)/(this._cascadeMaxExtents[d].x-this._cascadeMinExtents[d].x),this._lightSizeUVCorrection[d*2+1]=d===0?1:(this._cascadeMaxExtents[0].y-this._cascadeMinExtents[0].y)/(this._cascadeMaxExtents[d].y-this._cascadeMinExtents[d].y),this._depthCorrection[d]=d===0?1:(this._cascadeMaxExtents[d].z-this._cascadeMinExtents[d].z)/(this._cascadeMaxExtents[0].z-this._cascadeMinExtents[0].z);t.setDepthStencilTexture("shadowSampler"+e,n),t.setTexture("depthSampler"+e,n),t.setArray2("lightSizeUVCorrection"+e,this._lightSizeUVCorrection),t.setArray("depthCorrection"+e,this._depthCorrection),t.setFloat("penumbraDarkness"+e,this.penumbraDarkness),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),1/a,this._contactHardeningLightSizeUVRatio*a,this.frustumEdgeFalloff,e)}else t.setTexture("shadowSampler"+e,n),s._uniformBuffer.updateFloat4("shadowsInfo",this.getDarkness(),a,1/a,this.frustumEdgeFalloff,e);s._uniformBuffer.updateFloat2("depthValues",this.getLight().getDepthMinZ(r),this.getLight().getDepthMinZ(r)+this.getLight().getDepthMaxZ(r),e)}getTransformMatrix(){return this.getCascadeTransformMatrix(0)}dispose(){super.dispose(),this._freezeShadowCastersBoundingInfoObservable&&(this._scene.onBeforeRenderObservable.remove(this._freezeShadowCastersBoundingInfoObservable),this._freezeShadowCastersBoundingInfoObservable=null),this._depthReducer&&(this._depthReducer.dispose(),this._depthReducer=null)}serialize(){const e=super.serialize(),t=this.getShadowMap();if(!t)return e;if(e.numCascades=this._numCascades,e.debug=this._debug,e.stabilizeCascades=this.stabilizeCascades,e.lambda=this._lambda,e.cascadeBlendPercentage=this.cascadeBlendPercentage,e.depthClamp=this._depthClamp,e.autoCalcDepthBounds=this.autoCalcDepthBounds,e.shadowMaxZ=this._shadowMaxZ,e.penumbraDarkness=this.penumbraDarkness,e.freezeShadowCastersBoundingInfo=this._freezeShadowCastersBoundingInfo,e.minDistance=this.minDistance,e.maxDistance=this.maxDistance,e.renderList=[],t.renderList)for(let s=0;s<t.renderList.length;s++){const i=t.renderList[s];e.renderList.push(i.id)}return e}static Parse(e,t){const s=o.Parse(e,t,(i,r,n)=>new T(i,r,void 0,n));return e.numCascades!==void 0&&(s.numCascades=e.numCascades),e.debug!==void 0&&(s.debug=e.debug),e.stabilizeCascades!==void 0&&(s.stabilizeCascades=e.stabilizeCascades),e.lambda!==void 0&&(s.lambda=e.lambda),e.cascadeBlendPercentage!==void 0&&(s.cascadeBlendPercentage=e.cascadeBlendPercentage),e.depthClamp!==void 0&&(s.depthClamp=e.depthClamp),e.autoCalcDepthBounds!==void 0&&(s.autoCalcDepthBounds=e.autoCalcDepthBounds),e.shadowMaxZ!==void 0&&(s.shadowMaxZ=e.shadowMaxZ),e.penumbraDarkness!==void 0&&(s.penumbraDarkness=e.penumbraDarkness),e.freezeShadowCastersBoundingInfo!==void 0&&(s.freezeShadowCastersBoundingInfo=e.freezeShadowCastersBoundingInfo),e.minDistance!==void 0&&e.maxDistance!==void 0&&s.setMinMaxDistance(e.minDistance,e.maxDistance),s}}T._FrustumCornersNDCSpace=[new S(-1,1,-1),new S(1,1,-1),new S(1,-1,-1),new S(-1,-1,-1),new S(-1,1,1),new S(1,1,1),new S(1,-1,1),new S(-1,-1,1)];T.CLASSNAME="CascadedShadowGenerator";T.DEFAULT_CASCADES_COUNT=4;T.MIN_CASCADES_COUNT=2;T.MAX_CASCADES_COUNT=4;T._SceneComponentInitialization=D=>{throw Q("ShadowGeneratorSceneComponent")};ce.AddParser(X.NAME_SHADOWGENERATOR,(D,e)=>{if(D.shadowGenerators!==void 0&&D.shadowGenerators!==null)for(let t=0,s=D.shadowGenerators.length;t<s;t++){const i=D.shadowGenerators[t];i.className===T.CLASSNAME?T.Parse(i,e):o.Parse(i,e)}});class Ye{constructor(e){this.name=X.NAME_SHADOWGENERATOR,this.scene=e}register(){this.scene._gatherRenderTargetsStage.registerStep(X.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR,this,this._gatherRenderTargets)}rebuild(){}serialize(e){e.shadowGenerators=[];const t=this.scene.lights;for(const s of t){const i=s.getShadowGenerators();if(i){const r=i.values();for(let n=r.next();n.done!==!0;n=r.next()){const a=n.value;e.shadowGenerators.push(a.serialize())}}}}addFromContainer(e){}removeFromContainer(e,t){}dispose(){}_gatherRenderTargets(e){const t=this.scene;if(this.scene.shadowsEnabled)for(let s=0;s<t.lights.length;s++){const i=t.lights[s],r=i.getShadowGenerators();if(i.isEnabled()&&i.shadowEnabled&&r){const n=r.values();for(let a=n.next();a.done!==!0;a=n.next()){const c=a.value.getShadowMap();t.textures.indexOf(c)!==-1&&e.push(c)}}}}}o._SceneComponentInitialization=D=>{let e=D._getComponent(X.NAME_SHADOWGENERATOR);e||(e=new Ye(D),D._addComponent(e))};export{T as C,K as D,$e as M,o as S,je as a,Ye as b};
