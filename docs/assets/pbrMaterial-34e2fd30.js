import{W as p,i as ve,t as oe,R as Se,V as C,v as N,C as F,g as W,cr as Ee,j as ge,n as a,p as f,o as n,aG as K,s as O,aB as X,ar as h,cO as Me,d as Oe,aa as Q,a9 as ie,q as Le,aQ as De,bP as de,L as Fe,at as xe,aM as ue,aE as ee,au as Pe,S as be,cM as ye}from"./runBabylonPlaygroundScene-32a4afbd.js";import{T as L,B as me,i as Z,M as c,V as Ue,D as Be,a0 as Re,E as Ge}from"./linesBuilder-a2dae4c1.js";import{P as le,b as He}from"./blurPostProcess-f61d1d3e.js";const Ve="passCubePixelShader",ke=`varying vec2 vUV;
uniform samplerCube textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
vec2 uv=vUV*2.0-1.0;
#ifdef POSITIVEX
gl_FragColor=textureCube(textureSampler,vec3(1.001,uv.y,uv.x));
#endif
#ifdef NEGATIVEX
gl_FragColor=textureCube(textureSampler,vec3(-1.001,uv.y,uv.x));
#endif
#ifdef POSITIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,1.001,uv.x));
#endif
#ifdef NEGATIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,-1.001,uv.x));
#endif
#ifdef POSITIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,1.001));
#endif
#ifdef NEGATIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,-1.001));
#endif
}`;p.ShadersStore[Ve]=ke;class ae extends le{getClassName(){return"PassPostProcess"}constructor(e,t,i=null,o,d,s,I=0,R=!1){super(e,"pass",null,null,t,i,o,d,s,void 0,I,void 0,null,R)}static _Parse(e,t,i,o){return oe.Parse(()=>new ae(e.name,e.options,t,e.renderTargetSamplingMode,e._engine,e.reusable),e,i,o)}}Se("BABYLON.PassPostProcess",ae);class _e extends le{get face(){return this._face}set face(e){if(!(e<0||e>5))switch(this._face=e,this._face){case 0:this.updateEffect("#define POSITIVEX");break;case 1:this.updateEffect("#define NEGATIVEX");break;case 2:this.updateEffect("#define POSITIVEY");break;case 3:this.updateEffect("#define NEGATIVEY");break;case 4:this.updateEffect("#define POSITIVEZ");break;case 5:this.updateEffect("#define NEGATIVEZ");break}}getClassName(){return"PassCubePostProcess"}constructor(e,t,i=null,o,d,s,I=0,R=!1){super(e,"passCube",null,null,t,i,o,d,s,"#define POSITIVEX",I,void 0,null,R),this._face=0}static _Parse(e,t,i,o){return oe.Parse(()=>new _e(e.name,e.options,t,e.renderTargetSamplingMode,e._engine,e.reusable),e,i,o)}}ve._RescalePostProcessFactory=E=>new ae("rescale",1,null,2,E,!1,0);const k=[Math.sqrt(1/(4*Math.PI)),-Math.sqrt(3/(4*Math.PI)),Math.sqrt(3/(4*Math.PI)),-Math.sqrt(3/(4*Math.PI)),Math.sqrt(15/(4*Math.PI)),-Math.sqrt(15/(4*Math.PI)),Math.sqrt(5/(16*Math.PI)),-Math.sqrt(15/(4*Math.PI)),Math.sqrt(15/(16*Math.PI))],Xe=[()=>1,E=>E.y,E=>E.z,E=>E.x,E=>E.x*E.y,E=>E.y*E.z,E=>3*E.z*E.z-1,E=>E.x*E.z,E=>E.x*E.x-E.y*E.y],Y=(E,e)=>k[E]*Xe[E](e),z=[Math.PI,2*Math.PI/3,2*Math.PI/3,2*Math.PI/3,Math.PI/4,Math.PI/4,Math.PI/4,Math.PI/4,Math.PI/4];class te{constructor(){this.preScaled=!1,this.l00=C.Zero(),this.l1_1=C.Zero(),this.l10=C.Zero(),this.l11=C.Zero(),this.l2_2=C.Zero(),this.l2_1=C.Zero(),this.l20=C.Zero(),this.l21=C.Zero(),this.l22=C.Zero()}addLight(e,t,i){N.Vector3[0].set(t.r,t.g,t.b);const o=N.Vector3[0],d=N.Vector3[1];o.scaleToRef(i,d),d.scaleToRef(Y(0,e),N.Vector3[2]),this.l00.addInPlace(N.Vector3[2]),d.scaleToRef(Y(1,e),N.Vector3[2]),this.l1_1.addInPlace(N.Vector3[2]),d.scaleToRef(Y(2,e),N.Vector3[2]),this.l10.addInPlace(N.Vector3[2]),d.scaleToRef(Y(3,e),N.Vector3[2]),this.l11.addInPlace(N.Vector3[2]),d.scaleToRef(Y(4,e),N.Vector3[2]),this.l2_2.addInPlace(N.Vector3[2]),d.scaleToRef(Y(5,e),N.Vector3[2]),this.l2_1.addInPlace(N.Vector3[2]),d.scaleToRef(Y(6,e),N.Vector3[2]),this.l20.addInPlace(N.Vector3[2]),d.scaleToRef(Y(7,e),N.Vector3[2]),this.l21.addInPlace(N.Vector3[2]),d.scaleToRef(Y(8,e),N.Vector3[2]),this.l22.addInPlace(N.Vector3[2])}scaleInPlace(e){this.l00.scaleInPlace(e),this.l1_1.scaleInPlace(e),this.l10.scaleInPlace(e),this.l11.scaleInPlace(e),this.l2_2.scaleInPlace(e),this.l2_1.scaleInPlace(e),this.l20.scaleInPlace(e),this.l21.scaleInPlace(e),this.l22.scaleInPlace(e)}convertIncidentRadianceToIrradiance(){this.l00.scaleInPlace(z[0]),this.l1_1.scaleInPlace(z[1]),this.l10.scaleInPlace(z[2]),this.l11.scaleInPlace(z[3]),this.l2_2.scaleInPlace(z[4]),this.l2_1.scaleInPlace(z[5]),this.l20.scaleInPlace(z[6]),this.l21.scaleInPlace(z[7]),this.l22.scaleInPlace(z[8])}convertIrradianceToLambertianRadiance(){this.scaleInPlace(1/Math.PI)}preScaleForRendering(){this.preScaled=!0,this.l00.scaleInPlace(k[0]),this.l1_1.scaleInPlace(k[1]),this.l10.scaleInPlace(k[2]),this.l11.scaleInPlace(k[3]),this.l2_2.scaleInPlace(k[4]),this.l2_1.scaleInPlace(k[5]),this.l20.scaleInPlace(k[6]),this.l21.scaleInPlace(k[7]),this.l22.scaleInPlace(k[8])}updateFromArray(e){return C.FromArrayToRef(e[0],0,this.l00),C.FromArrayToRef(e[1],0,this.l1_1),C.FromArrayToRef(e[2],0,this.l10),C.FromArrayToRef(e[3],0,this.l11),C.FromArrayToRef(e[4],0,this.l2_2),C.FromArrayToRef(e[5],0,this.l2_1),C.FromArrayToRef(e[6],0,this.l20),C.FromArrayToRef(e[7],0,this.l21),C.FromArrayToRef(e[8],0,this.l22),this}updateFromFloatsArray(e){return C.FromFloatsToRef(e[0],e[1],e[2],this.l00),C.FromFloatsToRef(e[3],e[4],e[5],this.l1_1),C.FromFloatsToRef(e[6],e[7],e[8],this.l10),C.FromFloatsToRef(e[9],e[10],e[11],this.l11),C.FromFloatsToRef(e[12],e[13],e[14],this.l2_2),C.FromFloatsToRef(e[15],e[16],e[17],this.l2_1),C.FromFloatsToRef(e[18],e[19],e[20],this.l20),C.FromFloatsToRef(e[21],e[22],e[23],this.l21),C.FromFloatsToRef(e[24],e[25],e[26],this.l22),this}static FromArray(e){return new te().updateFromArray(e)}static FromPolynomial(e){const t=new te;return t.l00=e.xx.scale(.376127).add(e.yy.scale(.376127)).add(e.zz.scale(.376126)),t.l1_1=e.y.scale(.977204),t.l10=e.z.scale(.977204),t.l11=e.x.scale(.977204),t.l2_2=e.xy.scale(1.16538),t.l2_1=e.yz.scale(1.16538),t.l20=e.zz.scale(1.34567).subtract(e.xx.scale(.672834)).subtract(e.yy.scale(.672834)),t.l21=e.zx.scale(1.16538),t.l22=e.xx.scale(1.16538).subtract(e.yy.scale(1.16538)),t.l1_1.scaleInPlace(-1),t.l11.scaleInPlace(-1),t.l2_1.scaleInPlace(-1),t.l21.scaleInPlace(-1),t.scaleInPlace(Math.PI),t}}class se{constructor(){this.x=C.Zero(),this.y=C.Zero(),this.z=C.Zero(),this.xx=C.Zero(),this.yy=C.Zero(),this.zz=C.Zero(),this.xy=C.Zero(),this.yz=C.Zero(),this.zx=C.Zero()}get preScaledHarmonics(){return this._harmonics||(this._harmonics=te.FromPolynomial(this)),this._harmonics.preScaled||this._harmonics.preScaleForRendering(),this._harmonics}addAmbient(e){N.Vector3[0].copyFromFloats(e.r,e.g,e.b);const t=N.Vector3[0];this.xx.addInPlace(t),this.yy.addInPlace(t),this.zz.addInPlace(t)}scaleInPlace(e){this.x.scaleInPlace(e),this.y.scaleInPlace(e),this.z.scaleInPlace(e),this.xx.scaleInPlace(e),this.yy.scaleInPlace(e),this.zz.scaleInPlace(e),this.yz.scaleInPlace(e),this.zx.scaleInPlace(e),this.xy.scaleInPlace(e)}updateFromHarmonics(e){return this._harmonics=e,this.x.copyFrom(e.l11),this.x.scaleInPlace(1.02333).scaleInPlace(-1),this.y.copyFrom(e.l1_1),this.y.scaleInPlace(1.02333).scaleInPlace(-1),this.z.copyFrom(e.l10),this.z.scaleInPlace(1.02333),this.xx.copyFrom(e.l00),N.Vector3[0].copyFrom(e.l20).scaleInPlace(.247708),N.Vector3[1].copyFrom(e.l22).scaleInPlace(.429043),this.xx.scaleInPlace(.886277).subtractInPlace(N.Vector3[0]).addInPlace(N.Vector3[1]),this.yy.copyFrom(e.l00),this.yy.scaleInPlace(.886277).subtractInPlace(N.Vector3[0]).subtractInPlace(N.Vector3[1]),this.zz.copyFrom(e.l00),N.Vector3[0].copyFrom(e.l20).scaleInPlace(.495417),this.zz.scaleInPlace(.886277).addInPlace(N.Vector3[0]),this.yz.copyFrom(e.l2_1),this.yz.scaleInPlace(.858086).scaleInPlace(-1),this.zx.copyFrom(e.l21),this.zx.scaleInPlace(.858086).scaleInPlace(-1),this.xy.copyFrom(e.l2_2),this.xy.scaleInPlace(.858086),this.scaleInPlace(1/Math.PI),this}static FromHarmonics(e){return new se().updateFromHarmonics(e)}static FromArray(e){const t=new se;return C.FromArrayToRef(e[0],0,t.x),C.FromArrayToRef(e[1],0,t.y),C.FromArrayToRef(e[2],0,t.z),C.FromArrayToRef(e[3],0,t.xx),C.FromArrayToRef(e[4],0,t.yy),C.FromArrayToRef(e[5],0,t.zz),C.FromArrayToRef(e[6],0,t.yz),C.FromArrayToRef(e[7],0,t.zx),C.FromArrayToRef(e[8],0,t.xy),t}}const we="rgbdDecodePixelShader",Ye=`varying vec2 vUV;
uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);
}`;p.ShadersStore[we]=Ye;function ze(E,e,t,i=!0){const o=E.getScene(),d=o.getEngine(),s=new He("resized"+E.name,{width:e,height:t},o,!E.noMipmap,!0,E._texture.type,!1,E.samplingMode,!1);s.wrapU=E.wrapU,s.wrapV=E.wrapV,s.uOffset=E.uOffset,s.vOffset=E.vOffset,s.uScale=E.uScale,s.vScale=E.vScale,s.uAng=E.uAng,s.vAng=E.vAng,s.wAng=E.wAng,s.coordinatesIndex=E.coordinatesIndex,s.level=E.level,s.anisotropicFilteringLevel=E.anisotropicFilteringLevel,s._texture.isReady=!1,E.wrapU=L.CLAMP_ADDRESSMODE,E.wrapV=L.CLAMP_ADDRESSMODE;const I=new ae("pass",1,null,i?L.BILINEAR_SAMPLINGMODE:L.NEAREST_SAMPLINGMODE,d,!1,0);return I.externalTextureSamplerBinding=!0,I.getEffect().executeWhenCompiled(()=>{I.onApply=function(A){A.setTexture("textureSampler",E)};const R=s.renderTarget;R&&(o.postProcessManager.directRender([I],R),d.unBindFramebuffer(R),s.disposeFramebufferObjects(),I.dispose(),s.getInternalTexture().isReady=!0)}),s}function pe(E,e,t,i,o,d,s,I){const R=e.getEngine();return e.isReady=!1,o=o??e.samplingMode,i=i??e.type,d=d??e.format,s=s??e.width,I=I??e.height,i===-1&&(i=0),new Promise(A=>{const l=new le("postprocess",E,null,null,1,null,o,R,!1,void 0,i,void 0,null,!1,d);l.externalTextureSamplerBinding=!0;const S=R.createRenderTargetTexture({width:s,height:I},{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:o,type:i,format:d});l.getEffect().executeWhenCompiled(()=>{l.onApply=_=>{_._bindTexture("textureSampler",e),_.setFloat2("scale",1,1)},t.postProcessManager.directRender([l],S,!0),R.restoreDefaultFramebuffer(),R._releaseTexture(e),l&&l.dispose(),S._swapAndDie(e),e.type=i,e.format=5,e.isReady=!0,A(e)})})}let ne,he;function Qe(E){ne||(ne=new Float32Array(1),he=new Int32Array(ne.buffer)),ne[0]=E;const e=he[0];let t=e>>16&32768,i=e>>12&2047;const o=e>>23&255;return o<103?t:o>142?(t|=31744,t|=(o==255?0:1)&&e&8388607,t):o<113?(i|=2048,t|=(i>>114-o)+(i>>113-o&1),t):(t|=o-112<<10|i>>1,t+=i&1,t)}function We(E){const e=(E&32768)>>15,t=(E&31744)>>10,i=E&1023;return t===0?(e?-1:1)*Math.pow(2,-14)*(i/Math.pow(2,10)):t==31?i?NaN:(e?-1:1)*(1/0):(e?-1:1)*Math.pow(2,t-15)*(1+i/Math.pow(2,10))}const Fi={CreateResizedCopy:ze,ApplyPostProcess:pe,ToHalfFloat:Qe,FromHalfFloat:We};class Ie{static ExpandRGBDTexture(e){const t=e._texture;if(!t||!e.isRGBD)return;const i=t.getEngine(),o=i.getCaps(),d=t.isReady;let s=!1;o.textureHalfFloatRender&&o.textureHalfFloatLinearFiltering?(s=!0,t.type=2):o.textureFloatRender&&o.textureFloatLinearFiltering&&(s=!0,t.type=1),s&&(t.isReady=!1,t._isRGBD=!1,t.invertY=!1);const I=()=>{if(s){const R=new le("rgbdDecode","rgbdDecode",null,null,1,null,3,i,!1,void 0,t.type,void 0,null,!1);R.externalTextureSamplerBinding=!0;const A=i.createRenderTargetTexture(t.width,{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:t.samplingMode,type:t.type,format:5});R.getEffect().executeWhenCompiled(()=>{R.onApply=l=>{l._bindTexture("textureSampler",t),l.setFloat2("scale",1,1)},e.getScene().postProcessManager.directRender([R],A,!0),i.restoreDefaultFramebuffer(),i._releaseTexture(t),R&&R.dispose(),A._swapAndDie(t),t.isReady=!0})}};d?I():e.onLoadObservable.addOnce(I)}static EncodeTextureToRGBD(e,t,i=0){return pe("rgbdEncode",e,t,i,1,5)}}class q{constructor(e,t,i,o){this.name=e,this.worldAxisForNormal=t,this.worldAxisForFileX=i,this.worldAxisForFileY=o}}class ce{static ConvertCubeMapTextureToSphericalPolynomial(e){var t;if(!e.isCube)return null;(t=e.getScene())===null||t===void 0||t.getEngine().flushFramebuffer();const i=e.getSize().width,o=e.readPixels(0,void 0,void 0,!1),d=e.readPixels(1,void 0,void 0,!1);let s,I;e.isRenderTarget?(s=e.readPixels(3,void 0,void 0,!1),I=e.readPixels(2,void 0,void 0,!1)):(s=e.readPixels(2,void 0,void 0,!1),I=e.readPixels(3,void 0,void 0,!1));const R=e.readPixels(4,void 0,void 0,!1),A=e.readPixels(5,void 0,void 0,!1),l=e.gammaSpace,S=5;let _=0;return(e.textureType==1||e.textureType==2)&&(_=1),new Promise(m=>{Promise.all([d,o,s,I,R,A]).then(([r,T,g,b,P,B])=>{const U={size:i,right:T,left:r,up:g,down:b,front:P,back:B,format:S,type:_,gammaSpace:l};m(this.ConvertCubeMapToSphericalPolynomial(U))})})}static _AreaElement(e,t){return Math.atan2(e*t,Math.sqrt(e*e+t*t+1))}static ConvertCubeMapToSphericalPolynomial(e){const t=new te;let i=0;const o=2/e.size,d=o,s=.5*o,I=s-1;for(let _=0;_<6;_++){const m=this._FileFaces[_],r=e[m.name];let T=I;const g=e.format===5?4:3;for(let b=0;b<e.size;b++){let P=I;for(let B=0;B<e.size;B++){const U=m.worldAxisForFileX.scale(P).add(m.worldAxisForFileY.scale(T)).add(m.worldAxisForNormal);U.normalize();const re=this._AreaElement(P-s,T-s)-this._AreaElement(P-s,T+s)-this._AreaElement(P+s,T-s)+this._AreaElement(P+s,T+s);let G=r[b*e.size*g+B*g+0],H=r[b*e.size*g+B*g+1],V=r[b*e.size*g+B*g+2];isNaN(G)&&(G=0),isNaN(H)&&(H=0),isNaN(V)&&(V=0),e.type===0&&(G/=255,H/=255,V/=255),e.gammaSpace&&(G=Math.pow(W.Clamp(G),Ee),H=Math.pow(W.Clamp(H),Ee),V=Math.pow(W.Clamp(V),Ee));const $=this.MAX_HDRI_VALUE;if(this.PRESERVE_CLAMPED_COLORS){const Te=Math.max(G,H,V);if(Te>$){const fe=$/Te;G*=fe,H*=fe,V*=fe}}else G=W.Clamp(G,0,$),H=W.Clamp(H,0,$),V=W.Clamp(V,0,$);const Ne=new F(G,H,V);t.addLight(U,Ne,re),i+=re,P+=o}T+=d}}const S=4*Math.PI*6/6/i;return t.scaleInPlace(S),t.convertIncidentRadianceToIrradiance(),t.convertIrradianceToLambertianRadiance(),se.FromHarmonics(t)}}ce._FileFaces=[new q("right",new C(1,0,0),new C(0,0,-1),new C(0,-1,0)),new q("left",new C(-1,0,0),new C(0,0,1),new C(0,-1,0)),new q("up",new C(0,1,0),new C(1,0,0),new C(0,0,1)),new q("down",new C(0,-1,0),new C(1,0,0),new C(0,0,-1)),new q("front",new C(0,0,1),new C(1,0,0),new C(0,-1,0)),new q("back",new C(0,0,-1),new C(-1,0,0),new C(0,-1,0))];ce.MAX_HDRI_VALUE=4096;ce.PRESERVE_CLAMPED_COLORS=!1;me.prototype.forceSphericalPolynomialsRecompute=function(){this._texture&&(this._texture._sphericalPolynomial=null,this._texture._sphericalPolynomialPromise=null,this._texture._sphericalPolynomialComputed=!1)};Object.defineProperty(me.prototype,"sphericalPolynomial",{get:function(){if(this._texture){if(this._texture._sphericalPolynomial||this._texture._sphericalPolynomialComputed)return this._texture._sphericalPolynomial;if(this._texture.isReady)return this._texture._sphericalPolynomialPromise||(this._texture._sphericalPolynomialPromise=ce.ConvertCubeMapTextureToSphericalPolynomial(this),this._texture._sphericalPolynomialPromise===null?this._texture._sphericalPolynomialComputed=!0:this._texture._sphericalPolynomialPromise.then(E=>{this._texture._sphericalPolynomial=E,this._texture._sphericalPolynomialComputed=!0})),null}return null},set:function(E){this._texture&&(this._texture._sphericalPolynomial=E)},enumerable:!0,configurable:!0});const Ke="data:image/png;base64,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";let qe=0;const Ae=E=>{if(!E.environmentBRDFTexture){const e=E.useDelayedTextureLoading;E.useDelayedTextureLoading=!1;const t=E._blockEntityCollection;E._blockEntityCollection=!1;const i=L.CreateFromBase64String(Ke,"EnvironmentBRDFTexture"+qe++,E,!0,!1,L.BILINEAR_SAMPLINGMODE);E._blockEntityCollection=t;const o=E.getEngine().getLoadedTexturesCache(),d=o.indexOf(i.getInternalTexture());d!==-1&&o.splice(d,1),i.isRGBD=!0,i.wrapU=L.CLAMP_ADDRESSMODE,i.wrapV=L.CLAMP_ADDRESSMODE,E.environmentBRDFTexture=i,E.useDelayedTextureLoading=e,Ie.ExpandRGBDTexture(i);const s=E.getEngine().onContextRestoredObservable.add(()=>{i.isRGBD=!0;const I=()=>{i.isReady()?Ie.ExpandRGBDTexture(i):ge.SetImmediate(I)};I()});E.onDisposeObservable.add(()=>{E.getEngine().onContextRestoredObservable.remove(s)})}return E.environmentBRDFTexture},xi={GetEnvironmentBRDFTexture:Ae};class Je extends K{constructor(){super(...arguments),this.BRDF_V_HEIGHT_CORRELATED=!1,this.MS_BRDF_ENERGY_CONSERVATION=!1,this.SPHERICAL_HARMONICS=!1,this.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION=!1}}class x extends Z{_markAllSubMeshesAsMiscDirty(){this._internalMarkAllSubMeshesAsMiscDirty()}constructor(e,t=!0){super(e,"PBRBRDF",90,new Je,t),this._useEnergyConservation=x.DEFAULT_USE_ENERGY_CONSERVATION,this.useEnergyConservation=x.DEFAULT_USE_ENERGY_CONSERVATION,this._useSmithVisibilityHeightCorrelated=x.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED,this.useSmithVisibilityHeightCorrelated=x.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED,this._useSphericalHarmonics=x.DEFAULT_USE_SPHERICAL_HARMONICS,this.useSphericalHarmonics=x.DEFAULT_USE_SPHERICAL_HARMONICS,this._useSpecularGlossinessInputEnergyConservation=x.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION,this.useSpecularGlossinessInputEnergyConservation=x.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION,this._internalMarkAllSubMeshesAsMiscDirty=e._dirtyCallbacks[16],this._enable(!0)}prepareDefines(e){e.BRDF_V_HEIGHT_CORRELATED=this._useSmithVisibilityHeightCorrelated,e.MS_BRDF_ENERGY_CONSERVATION=this._useEnergyConservation&&this._useSmithVisibilityHeightCorrelated,e.SPHERICAL_HARMONICS=this._useSphericalHarmonics,e.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION=this._useSpecularGlossinessInputEnergyConservation}getClassName(){return"PBRBRDFConfiguration"}}x.DEFAULT_USE_ENERGY_CONSERVATION=!0;x.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED=!0;x.DEFAULT_USE_SPHERICAL_HARMONICS=!0;x.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION=!0;a([f(),n("_markAllSubMeshesAsMiscDirty")],x.prototype,"useEnergyConservation",void 0);a([f(),n("_markAllSubMeshesAsMiscDirty")],x.prototype,"useSmithVisibilityHeightCorrelated",void 0);a([f(),n("_markAllSubMeshesAsMiscDirty")],x.prototype,"useSphericalHarmonics",void 0);a([f(),n("_markAllSubMeshesAsMiscDirty")],x.prototype,"useSpecularGlossinessInputEnergyConservation",void 0);const Ze="pbrFragmentDeclaration",je=`uniform vec4 vEyePosition;
uniform vec3 vReflectionColor;
uniform vec4 vAlbedoColor;
uniform vec4 vLightingIntensity;
uniform vec4 vReflectivityColor;
uniform vec4 vMetallicReflectanceFactors;
uniform vec3 vEmissiveColor;
uniform float visibility;
uniform vec3 vAmbientColor;
#ifdef ALBEDO
uniform vec2 vAlbedoInfos;
#endif
#ifdef AMBIENT
uniform vec4 vAmbientInfos;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform vec2 vTangentSpaceParams;
#endif
#ifdef OPACITY
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
#endif
#ifdef REFLECTIVITY
uniform vec3 vReflectivityInfos;
#endif
#ifdef MICROSURFACEMAP
uniform vec2 vMicroSurfaceSamplerInfos;
#endif
#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(SS_REFRACTION) || defined(PREPASS)
uniform mat4 view;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#ifdef REALTIME_FILTERING
uniform vec2 vReflectionFilteringInfo;
#endif
uniform mat4 reflectionMatrix;
uniform vec3 vReflectionMicrosurfaceInfos;
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;
uniform vec3 vReflectionSize; 
#endif
#endif
#if defined(SS_REFRACTION) && defined(SS_USE_LOCAL_REFRACTIONMAP_CUBIC)
uniform vec3 vRefractionPosition;
uniform vec3 vRefractionSize; 
#endif
#ifdef CLEARCOAT
uniform vec2 vClearCoatParams;
uniform vec4 vClearCoatRefractionParams;
#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)
uniform vec4 vClearCoatInfos;
#endif
#ifdef CLEARCOAT_TEXTURE
uniform mat4 clearCoatMatrix;
#endif
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS
uniform mat4 clearCoatRoughnessMatrix;
#endif
#ifdef CLEARCOAT_BUMP
uniform vec2 vClearCoatBumpInfos;
uniform vec2 vClearCoatTangentSpaceParams;
uniform mat4 clearCoatBumpMatrix;
#endif
#ifdef CLEARCOAT_TINT
uniform vec4 vClearCoatTintParams;
uniform float clearCoatColorAtDistance;
#ifdef CLEARCOAT_TINT_TEXTURE
uniform vec2 vClearCoatTintInfos;
uniform mat4 clearCoatTintMatrix;
#endif
#endif
#endif
#ifdef IRIDESCENCE
uniform vec4 vIridescenceParams;
#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)
uniform vec4 vIridescenceInfos;
#endif
#ifdef IRIDESCENCE_TEXTURE
uniform mat4 iridescenceMatrix;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
uniform mat4 iridescenceThicknessMatrix;
#endif
#endif
#ifdef ANISOTROPIC
uniform vec3 vAnisotropy;
#ifdef ANISOTROPIC_TEXTURE
uniform vec2 vAnisotropyInfos;
uniform mat4 anisotropyMatrix;
#endif
#endif
#ifdef SHEEN
uniform vec4 vSheenColor;
#ifdef SHEEN_ROUGHNESS
uniform float vSheenRoughness;
#endif
#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)
uniform vec4 vSheenInfos;
#endif
#ifdef SHEEN_TEXTURE
uniform mat4 sheenMatrix;
#endif
#ifdef SHEEN_TEXTURE_ROUGHNESS
uniform mat4 sheenRoughnessMatrix;
#endif
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
uniform vec4 vRefractionMicrosurfaceInfos;
uniform vec4 vRefractionInfos;
uniform mat4 refractionMatrix;
#ifdef REALTIME_FILTERING
uniform vec2 vRefractionFilteringInfo;
#endif
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
uniform vec2 vThicknessInfos;
uniform mat4 thicknessMatrix;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
uniform vec2 vRefractionIntensityInfos;
uniform mat4 refractionIntensityMatrix;
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
uniform vec2 vTranslucencyIntensityInfos;
uniform mat4 translucencyIntensityMatrix;
#endif
uniform vec2 vThicknessParam;
uniform vec3 vDiffusionDistance;
uniform vec4 vTintColor;
uniform vec3 vSubSurfaceIntensity;
#endif
#ifdef PREPASS
#ifdef SS_SCATTERING
uniform float scatteringDiffusionProfile;
#endif
#endif
#if DEBUGMODE>0
uniform vec2 vDebugMode;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#include<decalFragmentDeclaration>
#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
uniform vec3 vSphericalL00;
uniform vec3 vSphericalL1_1;
uniform vec3 vSphericalL10;
uniform vec3 vSphericalL11;
uniform vec3 vSphericalL2_2;
uniform vec3 vSphericalL2_1;
uniform vec3 vSphericalL20;
uniform vec3 vSphericalL21;
uniform vec3 vSphericalL22;
#else
uniform vec3 vSphericalX;
uniform vec3 vSphericalY;
uniform vec3 vSphericalZ;
uniform vec3 vSphericalXX_ZZ;
uniform vec3 vSphericalYY_ZZ;
uniform vec3 vSphericalZZ;
uniform vec3 vSphericalXY;
uniform vec3 vSphericalYZ;
uniform vec3 vSphericalZX;
#endif
#endif
#define ADDITIONAL_FRAGMENT_DECLARATION
`;p.IncludesShadersStore[Ze]=je;const $e="pbrUboDeclaration",et=`layout(std140,column_major) uniform;
uniform Material {
vec2 vAlbedoInfos;
vec4 vAmbientInfos;
vec2 vOpacityInfos;
vec2 vEmissiveInfos;
vec2 vLightmapInfos;
vec3 vReflectivityInfos;
vec2 vMicroSurfaceSamplerInfos;
vec2 vReflectionInfos;
vec2 vReflectionFilteringInfo;
vec3 vReflectionPosition;
vec3 vReflectionSize;
vec3 vBumpInfos;
mat4 albedoMatrix;
mat4 ambientMatrix;
mat4 opacityMatrix;
mat4 emissiveMatrix;
mat4 lightmapMatrix;
mat4 reflectivityMatrix;
mat4 microSurfaceSamplerMatrix;
mat4 bumpMatrix;
vec2 vTangentSpaceParams;
mat4 reflectionMatrix;
vec3 vReflectionColor;
vec4 vAlbedoColor;
vec4 vLightingIntensity;
vec3 vReflectionMicrosurfaceInfos;
float pointSize;
vec4 vReflectivityColor;
vec3 vEmissiveColor;
vec3 vAmbientColor;
vec2 vDebugMode;
vec4 vMetallicReflectanceFactors;
vec2 vMetallicReflectanceInfos;
mat4 metallicReflectanceMatrix;
vec2 vReflectanceInfos;
mat4 reflectanceMatrix;
vec3 vSphericalL00;
vec3 vSphericalL1_1;
vec3 vSphericalL10;
vec3 vSphericalL11;
vec3 vSphericalL2_2;
vec3 vSphericalL2_1;
vec3 vSphericalL20;
vec3 vSphericalL21;
vec3 vSphericalL22;
vec3 vSphericalX;
vec3 vSphericalY;
vec3 vSphericalZ;
vec3 vSphericalXX_ZZ;
vec3 vSphericalYY_ZZ;
vec3 vSphericalZZ;
vec3 vSphericalXY;
vec3 vSphericalYZ;
vec3 vSphericalZX;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;p.IncludesShadersStore[$e]=et;const tt="pbrFragmentExtraDeclaration",it=`varying vec3 vPositionW;
#if DEBUGMODE>0
varying vec4 vClipSpacePosition;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#ifdef NORMAL
varying vec3 vNormalW;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vec3 vEnvironmentIrradiance;
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
`;p.IncludesShadersStore[tt]=it;const at="samplerFragmentAlternateDeclaration",rt=`#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying vec2 v_VARYINGNAME_UV;
#endif
#endif
`;p.IncludesShadersStore[at]=rt;const nt="pbrFragmentSamplersDeclaration",ot=`#include<samplerFragmentDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_SAMPLERNAME_,albedo)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)
#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)
#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)
#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_SAMPLERNAME_,reflectivity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_SAMPLERNAME_,microSurface)
#include<samplerFragmentDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_SAMPLERNAME_,metallicReflectance)
#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_SAMPLERNAME_,reflectance)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_SAMPLERNAME_,decal)
#ifdef CLEARCOAT
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_SAMPLERNAME_,clearCoat)
#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL)
uniform sampler2D clearCoatRoughnessSampler;
#endif
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_SAMPLERNAME_,clearCoatBump)
#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_SAMPLERNAME_,clearCoatTint)
#endif
#ifdef IRIDESCENCE
#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_SAMPLERNAME_,iridescence)
#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_SAMPLERNAME_,iridescenceThickness)
#endif
#ifdef SHEEN
#include<samplerFragmentDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_SAMPLERNAME_,sheen)
#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)
#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL)
uniform sampler2D sheenRoughnessSampler;
#endif
#endif
#ifdef ANISOTROPIC
#include<samplerFragmentDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_SAMPLERNAME_,anisotropy)
#endif
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
#define sampleReflection(s,c) textureCube(s,c)
uniform samplerCube reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube reflectionSamplerLow;
uniform samplerCube reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform samplerCube irradianceSampler;
#endif
#else
#define sampleReflection(s,c) texture2D(s,c)
uniform sampler2D reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D reflectionSamplerLow;
uniform sampler2D reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform sampler2D irradianceSampler;
#endif
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#endif
#ifdef ENVIRONMENTBRDF
uniform sampler2D environmentBrdfSampler;
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
#ifdef SS_REFRACTIONMAP_3D
#define sampleRefraction(s,c) textureCube(s,c)
uniform samplerCube refractionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleRefractionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube refractionSamplerLow;
uniform samplerCube refractionSamplerHigh;
#endif
#else
#define sampleRefraction(s,c) texture2D(s,c)
uniform sampler2D refractionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleRefractionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D refractionSamplerLow;
uniform sampler2D refractionSamplerHigh;
#endif
#endif
#endif
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_SAMPLERNAME_,thickness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_SAMPLERNAME_,refractionIntensity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_SAMPLERNAME_,translucencyIntensity)
#endif
`;p.IncludesShadersStore[nt]=ot;const st="subSurfaceScatteringFunctions",lt=`bool testLightingForSSS(float diffusionProfile)
{
return diffusionProfile<1.;
}`;p.IncludesShadersStore[st]=lt;const ct="importanceSampling",ft=`vec3 hemisphereCosSample(vec2 u) {
float phi=2.*PI*u.x;
float cosTheta2=1.-u.y;
float cosTheta=sqrt(cosTheta2);
float sinTheta=sqrt(1.-cosTheta2);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}
vec3 hemisphereImportanceSampleDggx(vec2 u,float a) {
float phi=2.*PI*u.x;
float cosTheta2=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));
float cosTheta=sqrt(cosTheta2);
float sinTheta=sqrt(1.-cosTheta2);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}
vec3 hemisphereImportanceSampleDCharlie(vec2 u,float a) { 
float phi=2.*PI*u.x;
float sinTheta=pow(u.y,a/(2.*a+1.));
float cosTheta=sqrt(1.-sinTheta*sinTheta);
return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);
}`;p.IncludesShadersStore[ct]=ft;const Et="pbrHelperFunctions",dt=`#define RECIPROCAL_PI2 0.15915494
#define RECIPROCAL_PI 0.31830988618
#define MINIMUMVARIANCE 0.0005
float convertRoughnessToAverageSlope(float roughness)
{
return square(roughness)+MINIMUMVARIANCE;
}
float fresnelGrazingReflectance(float reflectance0) {
float reflectance90=saturate(reflectance0*25.0);
return reflectance90;
}
vec2 getAARoughnessFactors(vec3 normalVector) {
#ifdef SPECULARAA
vec3 nDfdx=dFdx(normalVector.xyz);
vec3 nDfdy=dFdy(normalVector.xyz);
float slopeSquare=max(dot(nDfdx,nDfdx),dot(nDfdy,nDfdy));
float geometricRoughnessFactor=pow(saturate(slopeSquare),0.333);
float geometricAlphaGFactor=sqrt(slopeSquare);
geometricAlphaGFactor*=0.75;
return vec2(geometricRoughnessFactor,geometricAlphaGFactor);
#else
return vec2(0.);
#endif
}
#ifdef ANISOTROPIC
#ifdef ANISOTROPIC_LEGACY
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {
float alphaT=max(alphaG*(1.0+anisotropy),MINIMUMVARIANCE);
float alphaB=max(alphaG*(1.0-anisotropy),MINIMUMVARIANCE);
return vec2(alphaT,alphaB);
}
vec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy,float roughness) {
vec3 anisotropicFrameDirection=anisotropy>=0.0 ? B : T;
vec3 anisotropicFrameTangent=cross(normalize(anisotropicFrameDirection),V);
vec3 anisotropicFrameNormal=cross(anisotropicFrameTangent,anisotropicFrameDirection);
vec3 anisotropicNormal=normalize(mix(N,anisotropicFrameNormal,abs(anisotropy)));
return anisotropicNormal;
}
#else
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {
float alphaT=max(mix(alphaG,1.0,anisotropy*anisotropy),MINIMUMVARIANCE);
float alphaB=max(alphaG,MINIMUMVARIANCE);
return vec2(alphaT,alphaB);
}
vec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy,float roughness) {
vec3 bentNormal=cross(B,V);
bentNormal=normalize(cross(bentNormal,B));
float a=square(square(1.0-anisotropy*(1.0-roughness)));
bentNormal=normalize(mix(bentNormal,N,a));
return bentNormal;
}
#endif
#endif
#if defined(CLEARCOAT) || defined(SS_REFRACTION)
vec3 cocaLambert(vec3 alpha,float distance) {
return exp(-alpha*distance);
}
vec3 cocaLambert(float NdotVRefract,float NdotLRefract,vec3 alpha,float thickness) {
return cocaLambert(alpha,(thickness*((NdotLRefract+NdotVRefract)/(NdotLRefract*NdotVRefract))));
}
vec3 computeColorAtDistanceInMedia(vec3 color,float distance) {
return -log(color)/distance;
}
vec3 computeClearCoatAbsorption(float NdotVRefract,float NdotLRefract,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {
vec3 clearCoatAbsorption=mix(vec3(1.0),
cocaLambert(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness),
clearCoatIntensity);
return clearCoatAbsorption;
}
#endif
#ifdef MICROSURFACEAUTOMATIC
float computeDefaultMicroSurface(float microSurface,vec3 reflectivityColor)
{
const float kReflectivityNoAlphaWorkflow_SmoothnessMax=0.95;
float reflectivityLuminance=getLuminance(reflectivityColor);
float reflectivityLuma=sqrt(reflectivityLuminance);
microSurface=reflectivityLuma*kReflectivityNoAlphaWorkflow_SmoothnessMax;
return microSurface;
}
#endif
`;p.IncludesShadersStore[Et]=dt;const ut="harmonicsFunctions",At=`#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
vec3 computeEnvironmentIrradiance(vec3 normal) {
return vSphericalL00
+ vSphericalL1_1*(normal.y)
+ vSphericalL10*(normal.z)
+ vSphericalL11*(normal.x)
+ vSphericalL2_2*(normal.y*normal.x)
+ vSphericalL2_1*(normal.y*normal.z)
+ vSphericalL20*((3.0*normal.z*normal.z)-1.0)
+ vSphericalL21*(normal.z*normal.x)
+ vSphericalL22*(normal.x*normal.x-(normal.y*normal.y));
}
#else
vec3 computeEnvironmentIrradiance(vec3 normal) {
float Nx=normal.x;
float Ny=normal.y;
float Nz=normal.z;
vec3 C1=vSphericalZZ.rgb;
vec3 Cx=vSphericalX.rgb;
vec3 Cy=vSphericalY.rgb;
vec3 Cz=vSphericalZ.rgb;
vec3 Cxx_zz=vSphericalXX_ZZ.rgb;
vec3 Cyy_zz=vSphericalYY_ZZ.rgb;
vec3 Cxy=vSphericalXY.rgb;
vec3 Cyz=vSphericalYZ.rgb;
vec3 Czx=vSphericalZX.rgb;
vec3 a1=Cyy_zz*Ny+Cy;
vec3 a2=Cyz*Nz+a1;
vec3 b1=Czx*Nz+Cx;
vec3 b2=Cxy*Ny+b1;
vec3 b3=Cxx_zz*Nx+b2;
vec3 t1=Cz *Nz+C1;
vec3 t2=a2 *Ny+t1;
vec3 t3=b3 *Nx+t2;
return t3;
}
#endif
#endif
`;p.IncludesShadersStore[ut]=At;const Tt="pbrDirectLightingSetupFunctions",Rt=`struct preLightingInfo
{
vec3 lightOffset;
float lightDistanceSquared;
float lightDistance;
float attenuation;
vec3 L;
vec3 H;
float NdotV;
float NdotLUnclamped;
float NdotL;
float VdotH;
float roughness;
#ifdef IRIDESCENCE
float iridescenceIntensity;
#endif
};
preLightingInfo computePointAndSpotPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.lightOffset=lightData.xyz-vPositionW;
result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);
result.lightDistance=sqrt(result.lightDistanceSquared);
result.L=normalize(result.lightOffset);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeDirectionalPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.lightDistance=length(-lightData.xyz);
result.L=normalize(-lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
result.NdotLUnclamped=dot(N,result.L);
result.NdotL=saturateEps(result.NdotLUnclamped);
return result;
}
preLightingInfo computeHemisphericPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {
preLightingInfo result;
result.NdotL=dot(N,lightData.xyz)*0.5+0.5;
result.NdotL=saturateEps(result.NdotL);
result.NdotLUnclamped=result.NdotL;
#ifdef SPECULARTERM
result.L=normalize(lightData.xyz);
result.H=normalize(V+result.L);
result.VdotH=saturate(dot(V,result.H));
#endif
return result;
}`;p.IncludesShadersStore[Tt]=Rt;const ht="pbrDirectLightingFalloffFunctions",It=`float computeDistanceLightFalloff_Standard(vec3 lightOffset,float range)
{
return max(0.,1.0-length(lightOffset)/range);
}
float computeDistanceLightFalloff_Physical(float lightDistanceSquared)
{
return 1.0/maxEps(lightDistanceSquared);
}
float computeDistanceLightFalloff_GLTF(float lightDistanceSquared,float inverseSquaredRange)
{
float lightDistanceFalloff=1.0/maxEps(lightDistanceSquared);
float factor=lightDistanceSquared*inverseSquaredRange;
float attenuation=saturate(1.0-factor*factor);
attenuation*=attenuation;
lightDistanceFalloff*=attenuation;
return lightDistanceFalloff;
}
float computeDistanceLightFalloff(vec3 lightOffset,float lightDistanceSquared,float range,float inverseSquaredRange)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDistanceLightFalloff_Physical(lightDistanceSquared);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDistanceLightFalloff_GLTF(lightDistanceSquared,inverseSquaredRange);
#else
return computeDistanceLightFalloff_Standard(lightOffset,range);
#endif
}
float computeDirectionalLightFalloff_Standard(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent)
{
float falloff=0.0;
float cosAngle=maxEps(dot(-lightDirection,directionToLightCenterW));
if (cosAngle>=cosHalfAngle)
{
falloff=max(0.,pow(cosAngle,exponent));
}
return falloff;
}
float computeDirectionalLightFalloff_Physical(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle)
{
const float kMinusLog2ConeAngleIntensityRatio=6.64385618977; 
float concentrationKappa=kMinusLog2ConeAngleIntensityRatio/(1.0-cosHalfAngle);
vec4 lightDirectionSpreadSG=vec4(-lightDirection*concentrationKappa,-concentrationKappa);
float falloff=exp2(dot(vec4(directionToLightCenterW,1.0),lightDirectionSpreadSG));
return falloff;
}
float computeDirectionalLightFalloff_GLTF(vec3 lightDirection,vec3 directionToLightCenterW,float lightAngleScale,float lightAngleOffset)
{
float cd=dot(-lightDirection,directionToLightCenterW);
float falloff=saturate(cd*lightAngleScale+lightAngleOffset);
falloff*=falloff;
return falloff;
}
float computeDirectionalLightFalloff(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent,float lightAngleScale,float lightAngleOffset)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDirectionalLightFalloff_Physical(lightDirection,directionToLightCenterW,cosHalfAngle);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDirectionalLightFalloff_GLTF(lightDirection,directionToLightCenterW,lightAngleScale,lightAngleOffset);
#else
return computeDirectionalLightFalloff_Standard(lightDirection,directionToLightCenterW,cosHalfAngle,exponent);
#endif
}`;p.IncludesShadersStore[ht]=It;const Ct="pbrBRDFFunctions",St=`#define FRESNEL_MAXIMUM_ON_ROUGH 0.25
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
return 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);
}
#endif
#ifdef ENVIRONMENTBRDF
vec3 getBRDFLookup(float NdotV,float perceptualRoughness) {
vec2 UV=vec2(NdotV,perceptualRoughness);
vec4 brdfLookup=texture2D(environmentBrdfSampler,UV);
#ifdef ENVIRONMENTBRDF_RGBD
brdfLookup.rgb=fromRGBD(brdfLookup.rgba);
#endif
return brdfLookup.rgb;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;
#endif
return reflectance;
}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;
#endif
return reflectance;
}
#endif
/* NOT USED
#if defined(SHEEN) && defined(SHEEN_SOFTER)
float getBRDFLookupCharlieSheen(float NdotV,float perceptualRoughness)
{
float c=1.0-NdotV;
float c3=c*c*c;
return 0.65584461*c3+1.0/(4.16526551+exp(-7.97291361*perceptualRoughness+6.33516894));
}
#endif
*/
#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)
vec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)
{
float weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);
return reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));
}
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
/**
* The sheen BRDF not containing F can be easily stored in the blue channel of the BRDF texture.
* The blue channel contains DCharlie*VAshikhmin*NdotL as a lokkup table
*/
vec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {
vec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;
return sheenEnvironmentReflectance;
}
#endif
vec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
float fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)
{
return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);
}
#ifdef CLEARCOAT
vec3 getR0RemappedForClearCoat(vec3 f0) {
#ifdef CLEARCOAT_DEFAULTIOR
#ifdef MOBILE
return saturate(f0*(f0*0.526868+0.529324)-0.0482256);
#else
return saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);
#endif
#else
vec3 s=sqrt(f0);
vec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);
return square(t);
#endif
}
#endif
#ifdef IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(
3.2404542,-0.9692660, 0.0556434,
-1.5371385, 1.8760108,-0.2040259,
-0.4985314, 0.0415560, 1.0572252
);
vec3 getIORTfromAirToSurfaceR0(vec3 f0) {
vec3 sqrtF0=sqrt(f0);
return (1.+sqrtF0)/(1.-sqrtF0);
}
vec3 getR0fromIORs(vec3 iorT,float iorI) {
return square((iorT-vec3(iorI))/(iorT+vec3(iorI)));
}
float getR0fromIORs(float iorT,float iorI) {
return square((iorT-iorI)/(iorT+iorI));
}
vec3 evalSensitivity(float opd,vec3 shift) {
float phase=2.0*PI*opd*1.0e-9;
const vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);
const vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);
const vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);
vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-square(phase)*var);
xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*square(phase));
xyz/=1.0685e-7;
vec3 srgb=XYZ_TO_REC709*xyz;
return srgb;
}
vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0) {
vec3 I=vec3(1.0);
float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));
float sinTheta2Sq=square(outsideIOR/iridescenceIOR)*(1.0-square(cosTheta1));
float cosTheta2Sq=1.0-sinTheta2Sq;
if (cosTheta2Sq<0.0) {
return I;
}
float cosTheta2=sqrt(cosTheta2Sq);
float R0=getR0fromIORs(iridescenceIOR,outsideIOR);
float R12=fresnelSchlickGGX(cosTheta1,R0,1.);
float R21=R12;
float T121=1.0-R12;
float phi12=0.0;
if (iridescenceIOR<outsideIOR) phi12=PI;
float phi21=PI-phi12;
vec3 baseIOR=getIORTfromAirToSurfaceR0(clamp(baseF0,0.0,0.9999)); 
vec3 R1=getR0fromIORs(baseIOR,iridescenceIOR);
vec3 R23=fresnelSchlickGGX(cosTheta2,R1,vec3(1.));
vec3 phi23=vec3(0.0);
if (baseIOR[0]<iridescenceIOR) phi23[0]=PI;
if (baseIOR[1]<iridescenceIOR) phi23[1]=PI;
if (baseIOR[2]<iridescenceIOR) phi23[2]=PI;
float opd=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;
vec3 phi=vec3(phi21)+phi23;
vec3 R123=clamp(R12*R23,1e-5,0.9999);
vec3 r123=sqrt(R123);
vec3 Rs=square(T121)*R23/(vec3(1.0)-R123);
vec3 C0=R12+Rs;
I=C0;
vec3 Cm=Rs-T121;
for (int m=1; m<=2; ++m)
{
Cm*=r123;
vec3 Sm=2.0*evalSensitivity(float(m)*opd,float(m)*phi);
I+=Cm*Sm;
}
return max(I,vec3(0.0));
}
#endif
float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)
{
float a2=square(alphaG);
float d=NdotH*NdotH*(a2-1.0)+1.0;
return a2/(PI*d*d);
}
#ifdef SHEEN
float normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)
{
float invR=1./alphaG;
float cos2h=NdotH*NdotH;
float sin2h=1.-cos2h;
return (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);
}
#endif
#ifdef ANISOTROPIC
float normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {
float a2=alphaTB.x*alphaTB.y;
vec3 v=vec3(alphaTB.y*TdotH,alphaTB.x *BdotH,a2*NdotH);
float v2=dot(v,v);
float w2=a2/v2;
return a2*w2*w2*RECIPROCAL_PI;
}
#endif
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {
#ifdef MOBILE
float GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);
float GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);
return 0.5/(GGXV+GGXL);
#else
float a2=alphaG*alphaG;
float GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);
float GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);
return 0.5/(GGXV+GGXL);
#endif
}
#else
float smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)
{
#ifdef MOBILE
return 1.0/(dot+alphaG+(1.0-alphaG)*dot ));
#else
float alphaSquared=alphaG*alphaG;
return 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));
#endif
}
float smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)
{
float visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);
return visibility;
}
#endif
#ifdef ANISOTROPIC
float smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {
float lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));
float lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));
float v=0.5/(lambdaV+lambdaL);
return v;
}
#endif
#ifdef CLEARCOAT
float visibility_Kelemen(float VdotH) {
return 0.25/(VdotH*VdotH); 
}
#endif
#ifdef SHEEN
float visibility_Ashikhmin(float NdotL,float NdotV)
{
return 1./(4.*(NdotL+NdotV-NdotL*NdotV));
}
/* NOT USED
#ifdef SHEEN_SOFTER
float l(float x,float alphaG)
{
float oneMinusAlphaSq=(1.0-alphaG)*(1.0-alphaG);
float a=mix(21.5473,25.3245,oneMinusAlphaSq);
float b=mix(3.82987,3.32435,oneMinusAlphaSq);
float c=mix(0.19823,0.16801,oneMinusAlphaSq);
float d=mix(-1.97760,-1.27393,oneMinusAlphaSq);
float e=mix(-4.32054,-4.85967,oneMinusAlphaSq);
return a/(1.0+b*pow(x,c))+d*x+e;
}
float lambdaSheen(float cosTheta,float alphaG)
{
return abs(cosTheta)<0.5 ? exp(l(cosTheta,alphaG)) : exp(2.0*l(0.5,alphaG)-l(1.0-cosTheta,alphaG));
}
float visibility_CharlieSheen(float NdotL,float NdotV,float alphaG)
{
float G=1.0/(1.0+lambdaSheen(NdotV,alphaG)+lambdaSheen(NdotL,alphaG));
return G/(4.0*NdotV*NdotL);
}
#endif
*/
#endif
float diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {
float diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));
float diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));
float diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;
float fresnel =
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);
return fresnel/PI;
}
#ifdef SS_TRANSLUCENCY
vec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {
vec3 S=1./maxEps(diffusionDistance);
vec3 temp=exp((-0.333333333*thickness)*S);
return tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);
}
float computeWrappedDiffuseNdotL(float NdotL,float w) {
float t=1.0+w;
float invt2=1.0/square(t);
return saturate((NdotL+w)*invt2);
}
#endif
`;p.IncludesShadersStore[Ct]=St;const mt="hdrFilteringFunctions",_t=`#ifdef NUM_SAMPLES
#if NUM_SAMPLES>0
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
float radicalInverse_VdC(uint bits) 
{
bits=(bits<<16u) | (bits>>16u);
bits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);
bits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);
bits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);
bits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);
return float(bits)*2.3283064365386963e-10; 
}
vec2 hammersley(uint i,uint N)
{
return vec2(float(i)/float(N),radicalInverse_VdC(i));
}
#else
float vanDerCorpus(int n,int base)
{
float invBase=1.0/float(base);
float denom =1.0;
float result =0.0;
for(int i=0; i<32; ++i)
{
if(n>0)
{
denom =mod(float(n),2.0);
result+=denom*invBase;
invBase=invBase/2.0;
n =int(float(n)/2.0);
}
}
return result;
}
vec2 hammersley(int i,int N)
{
return vec2(float(i)/float(N),vanDerCorpus(i,2));
}
#endif
float log4(float x) {
return log2(x)/2.;
}
const float NUM_SAMPLES_FLOAT=float(NUM_SAMPLES);
const float NUM_SAMPLES_FLOAT_INVERSED=1./NUM_SAMPLES_FLOAT;
const float K=4.;
#define inline
vec3 irradiance(samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{
vec3 n=normalize(inputN);
vec3 result=vec3(0.0);
vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);
tangent=normalize(cross(tangent,n));
vec3 bitangent=cross(n,tangent);
mat3 tbn=mat3(tangent,bitangent,n);
float maxLevel=filteringInfo.y;
float dim0=filteringInfo.x;
float omegaP=(4.*PI)/(6.*dim0*dim0);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{
vec2 Xi=hammersley(i,NUM_SAMPLES);
vec3 Ls=hemisphereCosSample(Xi);
Ls=normalize(Ls);
vec3 Ns=vec3(0.,0.,1.);
float NoL=dot(Ns,Ls);
if (NoL>0.) {
float pdf_inversed=PI/NoL;
float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;
float l=log4(omegaS)-log4(omegaP)+log4(K);
float mipLevel=clamp(l,0.0,maxLevel);
vec3 c=textureCubeLodEXT(inputTexture,tbn*Ls,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c;
}
}
result=result*NUM_SAMPLES_FLOAT_INVERSED;
return result;
}
#define inline
vec3 radiance(float alphaG,samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{
vec3 n=normalize(inputN);
if (alphaG==0.) {
vec3 c=textureCube(inputTexture,n).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
return c;
} else {
vec3 result=vec3(0.);
vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);
tangent=normalize(cross(tangent,n));
vec3 bitangent=cross(n,tangent);
mat3 tbn=mat3(tangent,bitangent,n);
float maxLevel=filteringInfo.y;
float dim0=filteringInfo.x;
float omegaP=(4.*PI)/(6.*dim0*dim0);
float weight=0.;
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{
vec2 Xi=hammersley(i,NUM_SAMPLES);
vec3 H=hemisphereImportanceSampleDggx(Xi,alphaG);
float NoV=1.;
float NoH=H.z;
float NoH2=H.z*H.z;
float NoL=2.*NoH2-1.;
vec3 L=vec3(2.*NoH*H.x,2.*NoH*H.y,NoL);
L=normalize(L);
if (NoL>0.) {
float pdf_inversed=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);
float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;
float l=log4(omegaS)-log4(omegaP)+log4(K);
float mipLevel=clamp(float(l),0.0,maxLevel);
weight+=NoL;
vec3 c=textureCubeLodEXT(inputTexture,tbn*L,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c*NoL;
}
}
result=result/weight;
return result;
}
}
#endif
#endif
`;p.IncludesShadersStore[mt]=_t;const pt="pbrDirectLightingFunctions",Nt=`#define CLEARCOATREFLECTANCE90 1.0
struct lightingInfo
{
vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef CLEARCOAT
vec4 clearCoat;
#endif
#ifdef SHEEN
vec3 sheen;
#endif
};
float adjustRoughnessFromLightProperties(float roughness,float lightRadius,float lightDistance) {
#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)
float lightRoughness=lightRadius/lightDistance;
float totalRoughness=saturate(lightRoughness+roughness);
return totalRoughness;
#else
return roughness;
#endif
}
vec3 computeHemisphericDiffuseLighting(preLightingInfo info,vec3 lightColor,vec3 groundColor) {
return mix(groundColor,lightColor,info.NdotL);
}
vec3 computeDiffuseLighting(preLightingInfo info,vec3 lightColor) {
float diffuseTerm=diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*info.attenuation*info.NdotL*lightColor;
}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){
vec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);
strq/=strq.w;
vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;
return toLinearSpace(textureColor);
}
#ifdef SS_TRANSLUCENCY
vec3 computeDiffuseAndTransmittedLighting(preLightingInfo info,vec3 lightColor,vec3 transmittance) {
float NdotL=absEps(info.NdotLUnclamped);
float wrapNdotL=computeWrappedDiffuseNdotL(NdotL,0.02);
float trAdapt=step(0.,info.NdotLUnclamped);
vec3 transmittanceNdotL=mix(transmittance*wrapNdotL,vec3(wrapNdotL),trAdapt);
float diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);
return diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;
}
#endif
#ifdef SPECULARTERM
vec3 computeSpecularLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);
#else
float smithVisibility=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);
#endif
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef ANISOTROPIC
vec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float TdotH=dot(T,info.H);
float BdotH=dot(B,info.H);
float TdotV=dot(T,V);
float BdotV=dot(B,V);
float TdotL=dot(T,info.L);
float BdotL=dot(B,info.L);
float alphaG=convertRoughnessToAverageSlope(info.roughness);
vec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);
alphaTB=max(alphaTB,square(geometricRoughnessFactor));
vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);
float smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);
vec3 specTerm=fresnel*distribution*smithVisibility;
return specTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
#ifdef CLEARCOAT
vec4 computeClearCoatLighting(preLightingInfo info,vec3 Ncc,float geometricRoughnessFactor,float clearCoatIntensity,vec3 lightColor) {
float NccdotL=saturateEps(dot(Ncc,info.L));
float NccdotH=saturateEps(dot(Ncc,info.H));
float clearCoatRoughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
float fresnel=fresnelSchlickGGX(info.VdotH,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnel*=clearCoatIntensity;
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);
float kelemenVisibility=visibility_Kelemen(info.VdotH);
float clearCoatTerm=fresnel*distribution*kelemenVisibility;
return vec4(
clearCoatTerm*info.attenuation*NccdotL*lightColor,
1.0-fresnel
);
}
vec3 computeClearCoatLightingAbsorption(float NdotVRefract,vec3 L,vec3 Ncc,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {
vec3 LRefract=-refract(L,Ncc,vClearCoatRefractionParams.y);
float NdotLRefract=saturateEps(dot(Ncc,LRefract));
vec3 absorption=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);
return absorption;
}
#endif
#ifdef SHEEN
vec3 computeSheenLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {
float NdotH=saturateEps(dot(N,info.H));
float roughness=max(info.roughness,geometricRoughnessFactor);
float alphaG=convertRoughnessToAverageSlope(roughness);
float fresnel=1.;
float distribution=normalDistributionFunction_CharlieSheen(NdotH,alphaG);
/*#ifdef SHEEN_SOFTER
float visibility=visibility_CharlieSheen(info.NdotL,info.NdotV,alphaG);
#else */
float visibility=visibility_Ashikhmin(info.NdotL,info.NdotV);
/* #endif */
float sheenTerm=fresnel*distribution*visibility;
return sheenTerm*info.attenuation*info.NdotL*lightColor;
}
#endif
`;p.IncludesShadersStore[pt]=Nt;const vt="pbrIBLFunctions",gt=`#if defined(REFLECTION) || defined(SS_REFRACTION)
float getLodFromAlphaG(float cubeMapDimensionPixels,float microsurfaceAverageSlope) {
float microsurfaceAverageSlopeTexels=cubeMapDimensionPixels*microsurfaceAverageSlope;
float lod=log2(microsurfaceAverageSlopeTexels);
return lod;
}
float getLinearLodFromRoughness(float cubeMapDimensionPixels,float roughness) {
float lod=log2(cubeMapDimensionPixels)*roughness;
return lod;
}
#endif
#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)
float environmentRadianceOcclusion(float ambientOcclusion,float NdotVUnclamped) {
float temp=NdotVUnclamped+ambientOcclusion;
return saturate(square(temp)-1.0+ambientOcclusion);
}
#endif
#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)
float environmentHorizonOcclusion(vec3 view,vec3 normal,vec3 geometricNormal) {
vec3 reflection=reflect(view,normal);
float temp=saturate(1.0+1.1*dot(reflection,geometricNormal));
return square(temp);
}
#endif
#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)
#define UNPACK_LOD(x) (1.0-x)*255.0
float getLodFromAlphaG(float cubeMapDimensionPixels,float alphaG,float NdotV) {
float microsurfaceAverageSlope=alphaG;
microsurfaceAverageSlope*=sqrt(abs(NdotV));
return getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);
}
#endif
`;p.IncludesShadersStore[vt]=gt;const Mt="pbrBlockAlbedoOpacity",Ot=`struct albedoOpacityOutParams
{
vec3 surfaceAlbedo;
float alpha;
};
#define pbr_inline
void albedoOpacityBlock(
in vec4 vAlbedoColor,
#ifdef ALBEDO
in vec4 albedoTexture,
in vec2 albedoInfos,
#endif
#ifdef OPACITY
in vec4 opacityMap,
in vec2 vOpacityInfos,
#endif
#ifdef DETAIL
in vec4 detailColor,
in vec4 vDetailInfos,
#endif
#ifdef DECAL
in vec4 decalColor,
in vec4 vDecalInfos,
#endif
out albedoOpacityOutParams outParams
)
{
vec3 surfaceAlbedo=vAlbedoColor.rgb;
float alpha=vAlbedoColor.a;
#ifdef ALBEDO
#if defined(ALPHAFROMALBEDO) || defined(ALPHATEST)
alpha*=albedoTexture.a;
#endif
#ifdef GAMMAALBEDO
surfaceAlbedo*=toLinearSpace(albedoTexture.rgb);
#else
surfaceAlbedo*=albedoTexture.rgb;
#endif
surfaceAlbedo*=albedoInfos.y;
#endif
#include<decalFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
surfaceAlbedo*=vColor.rgb;
#endif
#ifdef DETAIL
float detailAlbedo=2.0*mix(0.5,detailColor.r,vDetailInfos.y);
surfaceAlbedo.rgb=surfaceAlbedo.rgb*detailAlbedo*detailAlbedo; 
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALBEDO
#ifdef OPACITY
#ifdef OPACITYRGB
alpha=getLuminance(opacityMap.rgb);
#else
alpha*=opacityMap.a;
#endif
alpha*=vOpacityInfos.y;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#if !defined(SS_LINKREFRACTIONTOTRANSPARENCY) && !defined(ALPHAFRESNEL)
#ifdef ALPHATEST 
#if DEBUGMODE != 88
if (alpha<ALPHATESTVALUE)
discard;
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
#endif
outParams.surfaceAlbedo=surfaceAlbedo;
outParams.alpha=alpha;
}
`;p.IncludesShadersStore[Mt]=Ot;const Lt="pbrBlockReflectivity",Dt=`struct reflectivityOutParams
{
float microSurface;
float roughness;
vec3 surfaceReflectivityColor;
#ifdef METALLICWORKFLOW
vec3 surfaceAlbedo;
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
vec3 ambientOcclusionColor;
#endif
#if DEBUGMODE>0
vec4 surfaceMetallicColorMap;
vec4 surfaceReflectivityColorMap;
vec2 metallicRoughness;
vec3 metallicF0;
#endif
};
#define pbr_inline
void reflectivityBlock(
in vec4 vReflectivityColor,
#ifdef METALLICWORKFLOW
in vec3 surfaceAlbedo,
in vec4 metallicReflectanceFactors,
#endif
#ifdef REFLECTIVITY
in vec3 reflectivityInfos,
in vec4 surfaceMetallicOrReflectivityColorMap,
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
in vec3 ambientOcclusionColorIn,
#endif
#ifdef MICROSURFACEMAP
in vec4 microSurfaceTexel,
#endif
#ifdef DETAIL
in vec4 detailColor,
in vec4 vDetailInfos,
#endif
out reflectivityOutParams outParams
)
{
float microSurface=vReflectivityColor.a;
vec3 surfaceReflectivityColor=vReflectivityColor.rgb;
#ifdef METALLICWORKFLOW
vec2 metallicRoughness=surfaceReflectivityColor.rg;
#ifdef REFLECTIVITY
#if DEBUGMODE>0
outParams.surfaceMetallicColorMap=surfaceMetallicOrReflectivityColorMap;
#endif
#ifdef AOSTOREINMETALMAPRED
vec3 aoStoreInMetalMap=vec3(surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r);
outParams.ambientOcclusionColor=mix(ambientOcclusionColorIn,aoStoreInMetalMap,reflectivityInfos.z);
#endif
#ifdef METALLNESSSTOREINMETALMAPBLUE
metallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.b;
#else
metallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.r;
#endif
#ifdef ROUGHNESSSTOREINMETALMAPALPHA
metallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.a;
#else
#ifdef ROUGHNESSSTOREINMETALMAPGREEN
metallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.g;
#endif
#endif
#endif
#ifdef DETAIL
float detailRoughness=mix(0.5,detailColor.b,vDetailInfos.w);
float loLerp=mix(0.,metallicRoughness.g,detailRoughness*2.);
float hiLerp=mix(metallicRoughness.g,1.,(detailRoughness-0.5)*2.);
metallicRoughness.g=mix(loLerp,hiLerp,step(detailRoughness,0.5));
#endif
#ifdef MICROSURFACEMAP
metallicRoughness.g*=microSurfaceTexel.r;
#endif
#if DEBUGMODE>0
outParams.metallicRoughness=metallicRoughness;
#endif
#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS
microSurface=1.0-metallicRoughness.g;
vec3 baseColor=surfaceAlbedo;
#ifdef FROSTBITE_REFLECTANCE
outParams.surfaceAlbedo=baseColor.rgb*(1.0-metallicRoughness.r);
surfaceReflectivityColor=mix(0.16*reflectance*reflectance,baseColor,metallicRoughness.r);
#else
vec3 metallicF0=metallicReflectanceFactors.rgb;
#if DEBUGMODE>0
outParams.metallicF0=metallicF0;
#endif
outParams.surfaceAlbedo=mix(baseColor.rgb*(1.0-metallicF0),vec3(0.,0.,0.),metallicRoughness.r);
surfaceReflectivityColor=mix(metallicF0,baseColor,metallicRoughness.r);
#endif
#else
#ifdef REFLECTIVITY
surfaceReflectivityColor*=surfaceMetallicOrReflectivityColorMap.rgb;
#if DEBUGMODE>0
outParams.surfaceReflectivityColorMap=surfaceMetallicOrReflectivityColorMap;
#endif
#ifdef MICROSURFACEFROMREFLECTIVITYMAP
microSurface*=surfaceMetallicOrReflectivityColorMap.a;
microSurface*=reflectivityInfos.z;
#else
#ifdef MICROSURFACEAUTOMATIC
microSurface*=computeDefaultMicroSurface(microSurface,surfaceReflectivityColor);
#endif
#ifdef MICROSURFACEMAP
microSurface*=microSurfaceTexel.r;
#endif
#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE
#endif
#endif
#endif
microSurface=saturate(microSurface);
float roughness=1.-microSurface;
outParams.microSurface=microSurface;
outParams.roughness=roughness;
outParams.surfaceReflectivityColor=surfaceReflectivityColor;
}
`;p.IncludesShadersStore[Lt]=Dt;const Ft="pbrBlockAmbientOcclusion",xt=`struct ambientOcclusionOutParams
{
vec3 ambientOcclusionColor;
#if DEBUGMODE>0
vec3 ambientOcclusionColorMap;
#endif
};
#define pbr_inline
void ambientOcclusionBlock(
#ifdef AMBIENT
in vec3 ambientOcclusionColorMap_,
in vec4 vAmbientInfos,
#endif
out ambientOcclusionOutParams outParams
)
{
vec3 ambientOcclusionColor=vec3(1.,1.,1.);
#ifdef AMBIENT
vec3 ambientOcclusionColorMap=ambientOcclusionColorMap_*vAmbientInfos.y;
#ifdef AMBIENTINGRAYSCALE
ambientOcclusionColorMap=vec3(ambientOcclusionColorMap.r,ambientOcclusionColorMap.r,ambientOcclusionColorMap.r);
#endif
ambientOcclusionColor=mix(ambientOcclusionColor,ambientOcclusionColorMap,vAmbientInfos.z);
#if DEBUGMODE>0
outParams.ambientOcclusionColorMap=ambientOcclusionColorMap;
#endif
#endif
outParams.ambientOcclusionColor=ambientOcclusionColor;
}
`;p.IncludesShadersStore[Ft]=xt;const Pt="pbrBlockAlphaFresnel",bt=`#ifdef ALPHAFRESNEL
#if defined(ALPHATEST) || defined(ALPHABLEND)
struct alphaFresnelOutParams
{
float alpha;
};
#define pbr_inline
void alphaFresnelBlock(
in vec3 normalW,
in vec3 viewDirectionW,
in float alpha,
in float microSurface,
out alphaFresnelOutParams outParams
)
{
float opacityPerceptual=alpha;
#ifdef LINEARALPHAFRESNEL
float opacity0=opacityPerceptual;
#else
float opacity0=opacityPerceptual*opacityPerceptual;
#endif
float opacity90=fresnelGrazingReflectance(opacity0);
vec3 normalForward=faceforward(normalW,-viewDirectionW,normalW);
outParams.alpha=getReflectanceFromAnalyticalBRDFLookup_Jones(saturate(dot(viewDirectionW,normalForward)),vec3(opacity0),vec3(opacity90),sqrt(microSurface)).x;
#ifdef ALPHATEST
if (outParams.alpha<ALPHATESTVALUE)
discard;
#ifndef ALPHABLEND
outParams.alpha=1.0;
#endif
#endif
}
#endif
#endif
`;p.IncludesShadersStore[Pt]=bt;const yt="pbrBlockAnisotropic",Ut=`#ifdef ANISOTROPIC
struct anisotropicOutParams
{
float anisotropy;
vec3 anisotropicTangent;
vec3 anisotropicBitangent;
vec3 anisotropicNormal;
#if DEBUGMODE>0
vec3 anisotropyMapData;
#endif
};
#define pbr_inline
void anisotropicBlock(
in vec3 vAnisotropy,
in float roughness,
#ifdef ANISOTROPIC_TEXTURE
in vec3 anisotropyMapData,
#endif
in mat3 TBN,
in vec3 normalW,
in vec3 viewDirectionW,
out anisotropicOutParams outParams
)
{
float anisotropy=vAnisotropy.b;
vec3 anisotropyDirection=vec3(vAnisotropy.xy,0.);
#ifdef ANISOTROPIC_TEXTURE
anisotropy*=anisotropyMapData.b;
#if DEBUGMODE>0
outParams.anisotropyMapData=anisotropyMapData;
#endif
anisotropyMapData.rg=anisotropyMapData.rg*2.0-1.0;
#ifdef ANISOTROPIC_LEGACY
anisotropyDirection.rg*=anisotropyMapData.rg;
#else
anisotropyDirection.xy=mat2(anisotropyDirection.x,anisotropyDirection.y,-anisotropyDirection.y,anisotropyDirection.x)*normalize(anisotropyMapData.rg);
#endif
#endif
mat3 anisoTBN=mat3(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));
vec3 anisotropicTangent=normalize(anisoTBN*anisotropyDirection);
vec3 anisotropicBitangent=normalize(cross(anisoTBN[2],anisotropicTangent));
outParams.anisotropy=anisotropy;
outParams.anisotropicTangent=anisotropicTangent;
outParams.anisotropicBitangent=anisotropicBitangent;
outParams.anisotropicNormal=getAnisotropicBentNormals(anisotropicTangent,anisotropicBitangent,normalW,viewDirectionW,anisotropy,roughness);
}
#endif
`;p.IncludesShadersStore[yt]=Ut;const Bt="pbrBlockReflection",Gt=`#ifdef REFLECTION
struct reflectionOutParams
{
vec4 environmentRadiance;
vec3 environmentIrradiance;
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords;
#else
vec2 reflectionCoords;
#endif
#ifdef SS_TRANSLUCENCY
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
vec3 irradianceVector;
#endif
#endif
#endif
};
#define pbr_inline
void createReflectionCoords(
in vec3 vPositionW,
in vec3 normalW,
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#ifdef REFLECTIONMAP_3D
out vec3 reflectionCoords
#else
out vec2 reflectionCoords
#endif
)
{
#ifdef ANISOTROPIC
vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),anisotropicOut.anisotropicNormal);
#else
vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
reflectionCoords=reflectionVector;
#else
reflectionCoords=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0-reflectionCoords.y;
#endif
}
#define pbr_inline
#define inline
void sampleReflectionTexture(
in float alphaG,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
const vec3 reflectionCoords,
#else
in sampler2D reflectionSampler,
const vec2 reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
out vec4 environmentRadiance
)
{
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
#ifdef LODBASEDMICROSFURACE
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef LODINREFLECTIONALPHA
float automaticReflectionLOD=UNPACK_LOD(sampleReflection(reflectionSampler,reflectionCoords).a);
float requestedReflectionLOD=max(automaticReflectionLOD,reflectionLOD);
#else
float requestedReflectionLOD=reflectionLOD;
#endif
#ifdef REALTIME_FILTERING
environmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);
#else
environmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#endif
#else
float lodReflectionNormalized=saturate(reflectionLOD/log2(vReflectionMicrosurfaceInfos.x));
float lodReflectionNormalizedDoubled=lodReflectionNormalized*2.0;
vec4 environmentMid=sampleReflection(reflectionSampler,reflectionCoords);
if (lodReflectionNormalizedDoubled<1.0){
environmentRadiance=mix(
sampleReflection(reflectionSamplerHigh,reflectionCoords),
environmentMid,
lodReflectionNormalizedDoubled
);
} else {
environmentRadiance=mix(
environmentMid,
sampleReflection(reflectionSamplerLow,reflectionCoords),
lodReflectionNormalizedDoubled-1.0
);
}
#endif
#ifdef RGBDREFLECTION
environmentRadiance.rgb=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
environmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);
#endif
environmentRadiance.rgb*=vReflectionInfos.x;
environmentRadiance.rgb*=vReflectionColor.rgb;
}
#define pbr_inline
#define inline
void reflectionBlock(
in vec3 vPositionW,
in vec3 normalW,
in float alphaG,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
in float NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
in float roughness,
#endif
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
#else
in sampler2D reflectionSampler,
#endif
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
in vec3 vEnvironmentIrradiance,
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
in mat4 reflectionMatrix,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
in samplerCube irradianceSampler,
#else
in sampler2D irradianceSampler,
#endif
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
out reflectionOutParams outParams
)
{
vec4 environmentRadiance=vec4(0.,0.,0.,0.);
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=vec3(0.);
#else
vec2 reflectionCoords=vec2(0.);
#endif
createReflectionCoords(
vPositionW,
normalW,
#ifdef ANISOTROPIC
anisotropicOut,
#endif
reflectionCoords
);
sampleReflectionTexture(
alphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
roughness,
#endif
#ifdef REFLECTIONMAP_3D
reflectionSampler,
reflectionCoords,
#else
reflectionSampler,
reflectionCoords,
#endif
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentRadiance
);
vec3 environmentIrradiance=vec3(0.,0.,0.);
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradiance;
#else
#ifdef ANISOTROPIC
vec3 irradianceVector=vec3(reflectionMatrix*vec4(anisotropicOut.anisotropicNormal,0)).xyz;
#else
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#ifdef SS_TRANSLUCENCY
outParams.irradianceVector=irradianceVector;
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
vec4 environmentIrradiance4=sampleReflection(irradianceSampler,reflectionCoords);
environmentIrradiance=environmentIrradiance4.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradiance4);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);
#endif
#endif
environmentIrradiance*=vReflectionColor.rgb;
outParams.environmentRadiance=environmentRadiance;
outParams.environmentIrradiance=environmentIrradiance;
outParams.reflectionCoords=reflectionCoords;
}
#endif
`;p.IncludesShadersStore[Bt]=Gt;const Ht="pbrBlockSheen",Vt=`#ifdef SHEEN
struct sheenOutParams
{
float sheenIntensity;
vec3 sheenColor;
float sheenRoughness;
#ifdef SHEEN_LINKWITHALBEDO
vec3 surfaceAlbedo;
#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
float sheenAlbedoScaling;
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
vec3 finalSheenRadianceScaled;
#endif
#if DEBUGMODE>0
vec4 sheenMapData;
vec3 sheenEnvironmentReflectance;
#endif
};
#define pbr_inline
#define inline
void sheenBlock(
in vec4 vSheenColor,
#ifdef SHEEN_ROUGHNESS
in float vSheenRoughness,
#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
in vec4 sheenMapRoughnessData,
#endif
#endif
in float roughness,
#ifdef SHEEN_TEXTURE
in vec4 sheenMapData,
in float sheenMapLevel,
#endif
in float reflectance,
#ifdef SHEEN_LINKWITHALBEDO
in vec3 baseColor,
in vec3 surfaceAlbedo,
#endif
#ifdef ENVIRONMENTBRDF
in float NdotV,
in vec3 environmentBrdf,
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
in vec2 AARoughnessFactors,
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
in vec3 reflectionCoords,
#else
in sampler2D reflectionSampler,
in vec2 reflectionCoords,
#endif
in float NdotVUnclamped,
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
in float seo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
in float eho,
#endif
#endif
out sheenOutParams outParams
)
{
float sheenIntensity=vSheenColor.a;
#ifdef SHEEN_TEXTURE
#if DEBUGMODE>0
outParams.sheenMapData=sheenMapData;
#endif
#endif
#ifdef SHEEN_LINKWITHALBEDO
float sheenFactor=pow5(1.0-sheenIntensity);
vec3 sheenColor=baseColor.rgb*(1.0-sheenFactor);
float sheenRoughness=sheenIntensity;
outParams.surfaceAlbedo=surfaceAlbedo*sheenFactor;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#else
vec3 sheenColor=vSheenColor.rgb;
#ifdef SHEEN_TEXTURE
#ifdef SHEEN_GAMMATEXTURE
sheenColor.rgb*=toLinearSpace(sheenMapData.rgb);
#else
sheenColor.rgb*=sheenMapData.rgb;
#endif
sheenColor.rgb*=sheenMapLevel;
#endif
#ifdef SHEEN_ROUGHNESS
float sheenRoughness=vSheenRoughness;
#ifdef SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE
#if defined(SHEEN_TEXTURE)
sheenRoughness*=sheenMapData.a;
#endif
#elif defined(SHEEN_TEXTURE_ROUGHNESS)
#ifdef SHEEN_TEXTURE_ROUGHNESS_IDENTICAL
sheenRoughness*=sheenMapData.a;
#else
sheenRoughness*=sheenMapRoughnessData.a;
#endif
#endif
#else
float sheenRoughness=roughness;
#ifdef SHEEN_TEXTURE
sheenIntensity*=sheenMapData.a;
#endif
#endif
#if !defined(SHEEN_ALBEDOSCALING)
sheenIntensity*=(1.-reflectance);
#endif
sheenColor*=sheenIntensity;
#endif
#ifdef ENVIRONMENTBRDF
/*#ifdef SHEEN_SOFTER
vec3 environmentSheenBrdf=vec3(0.,0.,getBRDFLookupCharlieSheen(NdotV,sheenRoughness));
#else*/
#ifdef SHEEN_ROUGHNESS
vec3 environmentSheenBrdf=getBRDFLookup(NdotV,sheenRoughness);
#else
vec3 environmentSheenBrdf=environmentBrdf;
#endif
/*#endif*/
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
float sheenAlphaG=convertRoughnessToAverageSlope(sheenRoughness);
#ifdef SPECULARAA
sheenAlphaG+=AARoughnessFactors.y;
#endif
vec4 environmentSheenRadiance=vec4(0.,0.,0.,0.);
sampleReflectionTexture(
sheenAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
sheenRoughness,
#endif
reflectionSampler,
reflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentSheenRadiance
);
vec3 sheenEnvironmentReflectance=getSheenReflectanceFromBRDFLookup(sheenColor,environmentSheenBrdf);
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
sheenEnvironmentReflectance*=seo;
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
sheenEnvironmentReflectance*=eho;
#endif
#if DEBUGMODE>0
outParams.sheenEnvironmentReflectance=sheenEnvironmentReflectance;
#endif
outParams.finalSheenRadianceScaled=
environmentSheenRadiance.rgb *
sheenEnvironmentReflectance *
vLightingIntensity.z;
#endif
#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
outParams.sheenAlbedoScaling=1.0-sheenIntensity*max(max(sheenColor.r,sheenColor.g),sheenColor.b)*environmentSheenBrdf.b;
#endif
outParams.sheenIntensity=sheenIntensity;
outParams.sheenColor=sheenColor;
outParams.sheenRoughness=sheenRoughness;
}
#endif
`;p.IncludesShadersStore[Ht]=Vt;const kt="pbrBlockClearcoat",Xt=`struct clearcoatOutParams
{
vec3 specularEnvironmentR0;
float conservationFactor;
vec3 clearCoatNormalW;
vec2 clearCoatAARoughnessFactors;
float clearCoatIntensity;
float clearCoatRoughness;
#ifdef REFLECTION
vec3 finalClearCoatRadianceScaled;
#endif
#ifdef CLEARCOAT_TINT
vec3 absorption;
float clearCoatNdotVRefract;
vec3 clearCoatColor;
float clearCoatThickness;
#endif
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
vec3 energyConservationFactorClearCoat;
#endif
#if DEBUGMODE>0
mat3 TBNClearCoat;
vec2 clearCoatMapData;
vec4 clearCoatTintMapData;
vec4 environmentClearCoatRadiance;
float clearCoatNdotV;
vec3 clearCoatEnvironmentReflectance;
#endif
};
#ifdef CLEARCOAT
#define pbr_inline
#define inline
void clearcoatBlock(
in vec3 vPositionW,
in vec3 geometricNormalW,
in vec3 viewDirectionW,
in vec2 vClearCoatParams,
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
in vec4 clearCoatMapRoughnessData,
#endif
in vec3 specularEnvironmentR0,
#ifdef CLEARCOAT_TEXTURE
in vec2 clearCoatMapData,
#endif
#ifdef CLEARCOAT_TINT
in vec4 vClearCoatTintParams,
in float clearCoatColorAtDistance,
in vec4 vClearCoatRefractionParams,
#ifdef CLEARCOAT_TINT_TEXTURE
in vec4 clearCoatTintMapData,
#endif
#endif
#ifdef CLEARCOAT_BUMP
in vec2 vClearCoatBumpInfos,
in vec4 clearCoatBumpMapData,
in vec2 vClearCoatBumpUV,
#if defined(TANGENT) && defined(NORMAL)
in mat3 vTBN,
#else
in vec2 vClearCoatTangentSpaceParams,
#endif
#ifdef OBJECTSPACE_NORMALMAP
in mat4 normalMatrix,
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
in vec3 faceNormal,
#endif
#ifdef REFLECTION
in vec3 vReflectionMicrosurfaceInfos,
in vec2 vReflectionInfos,
in vec3 vReflectionColor,
in vec4 vLightingIntensity,
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSampler,
#else
in sampler2D reflectionSampler,
#endif
#ifndef LODBASEDMICROSFURACE
#ifdef REFLECTIONMAP_3D
in samplerCube reflectionSamplerLow,
in samplerCube reflectionSamplerHigh,
#else
in sampler2D reflectionSamplerLow,
in sampler2D reflectionSamplerHigh,
#endif
#endif
#ifdef REALTIME_FILTERING
in vec2 vReflectionFilteringInfo,
#endif
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
in float ambientMonochrome,
#endif
#endif
#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)
in float frontFacingMultiplier,
#endif
out clearcoatOutParams outParams
)
{
float clearCoatIntensity=vClearCoatParams.x;
float clearCoatRoughness=vClearCoatParams.y;
#ifdef CLEARCOAT_TEXTURE
clearCoatIntensity*=clearCoatMapData.x;
#ifdef CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE
clearCoatRoughness*=clearCoatMapData.y;
#endif
#if DEBUGMODE>0
outParams.clearCoatMapData=clearCoatMapData;
#endif
#endif
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL
clearCoatRoughness*=clearCoatMapData.y;
#else
clearCoatRoughness*=clearCoatMapRoughnessData.y;
#endif
#endif
outParams.clearCoatIntensity=clearCoatIntensity;
outParams.clearCoatRoughness=clearCoatRoughness;
#ifdef CLEARCOAT_TINT
vec3 clearCoatColor=vClearCoatTintParams.rgb;
float clearCoatThickness=vClearCoatTintParams.a;
#ifdef CLEARCOAT_TINT_TEXTURE
#ifdef CLEARCOAT_TINT_GAMMATEXTURE
clearCoatColor*=toLinearSpace(clearCoatTintMapData.rgb);
#else
clearCoatColor*=clearCoatTintMapData.rgb;
#endif
clearCoatThickness*=clearCoatTintMapData.a;
#if DEBUGMODE>0
outParams.clearCoatTintMapData=clearCoatTintMapData;
#endif
#endif
outParams.clearCoatColor=computeColorAtDistanceInMedia(clearCoatColor,clearCoatColorAtDistance);
outParams.clearCoatThickness=clearCoatThickness;
#endif
#ifdef CLEARCOAT_REMAP_F0
vec3 specularEnvironmentR0Updated=getR0RemappedForClearCoat(specularEnvironmentR0);
#else
vec3 specularEnvironmentR0Updated=specularEnvironmentR0;
#endif
outParams.specularEnvironmentR0=mix(specularEnvironmentR0,specularEnvironmentR0Updated,clearCoatIntensity);
vec3 clearCoatNormalW=geometricNormalW;
#ifdef CLEARCOAT_BUMP
#ifdef NORMALXYSCALE
float clearCoatNormalScale=1.0;
#else
float clearCoatNormalScale=vClearCoatBumpInfos.y;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBNClearCoat=vTBN;
#else
vec2 TBNClearCoatUV=vClearCoatBumpUV*frontFacingMultiplier;
mat3 TBNClearCoat=cotangent_frame(clearCoatNormalW*clearCoatNormalScale,vPositionW,TBNClearCoatUV,vClearCoatTangentSpaceParams);
#endif
#if DEBUGMODE>0
outParams.TBNClearCoat=TBNClearCoat;
#endif
#ifdef OBJECTSPACE_NORMALMAP
clearCoatNormalW=normalize(clearCoatBumpMapData.xyz *2.0-1.0);
clearCoatNormalW=normalize(mat3(normalMatrix)*clearCoatNormalW);
#else
clearCoatNormalW=perturbNormal(TBNClearCoat,clearCoatBumpMapData.xyz,vClearCoatBumpInfos.y);
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
clearCoatNormalW*=sign(dot(clearCoatNormalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
clearCoatNormalW=clearCoatNormalW*frontFacingMultiplier;
#endif
outParams.clearCoatNormalW=clearCoatNormalW;
outParams.clearCoatAARoughnessFactors=getAARoughnessFactors(clearCoatNormalW.xyz);
float clearCoatNdotVUnclamped=dot(clearCoatNormalW,viewDirectionW);
float clearCoatNdotV=absEps(clearCoatNdotVUnclamped);
#if DEBUGMODE>0
outParams.clearCoatNdotV=clearCoatNdotV;
#endif
#ifdef CLEARCOAT_TINT
vec3 clearCoatVRefract=refract(-viewDirectionW,clearCoatNormalW,vClearCoatRefractionParams.y);
outParams.clearCoatNdotVRefract=absEps(dot(clearCoatNormalW,clearCoatVRefract));
#endif
#if defined(ENVIRONMENTBRDF) && (!defined(REFLECTIONMAP_SKYBOX) || defined(MS_BRDF_ENERGY_CONSERVATION))
vec3 environmentClearCoatBrdf=getBRDFLookup(clearCoatNdotV,clearCoatRoughness);
#endif
#if defined(REFLECTION)
float clearCoatAlphaG=convertRoughnessToAverageSlope(clearCoatRoughness);
#ifdef SPECULARAA
clearCoatAlphaG+=outParams.clearCoatAARoughnessFactors.y;
#endif
vec4 environmentClearCoatRadiance=vec4(0.,0.,0.,0.);
vec3 clearCoatReflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),clearCoatNormalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
clearCoatReflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
vec3 clearCoatReflectionCoords=clearCoatReflectionVector;
#else
vec2 clearCoatReflectionCoords=clearCoatReflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
clearCoatReflectionCoords/=clearCoatReflectionVector.z;
#endif
clearCoatReflectionCoords.y=1.0-clearCoatReflectionCoords.y;
#endif
sampleReflectionTexture(
clearCoatAlphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
clearCoatNdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
clearCoatRoughness,
#endif
reflectionSampler,
clearCoatReflectionCoords,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
environmentClearCoatRadiance
);
#if DEBUGMODE>0
outParams.environmentClearCoatRadiance=environmentClearCoatRadiance;
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 clearCoatEnvironmentReflectance=getReflectanceFromBRDFLookup(vec3(vClearCoatRefractionParams.x),environmentClearCoatBrdf);
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float clearCoatEho=environmentHorizonOcclusion(-viewDirectionW,clearCoatNormalW,geometricNormalW);
clearCoatEnvironmentReflectance*=clearCoatEho;
#endif
#endif
#endif
#else
vec3 clearCoatEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(clearCoatNdotV,vec3(1.),vec3(1.),sqrt(1.-clearCoatRoughness));
#endif
clearCoatEnvironmentReflectance*=clearCoatIntensity;
#if DEBUGMODE>0
outParams.clearCoatEnvironmentReflectance=clearCoatEnvironmentReflectance;
#endif
outParams.finalClearCoatRadianceScaled=
environmentClearCoatRadiance.rgb *
clearCoatEnvironmentReflectance *
vLightingIntensity.z;
#endif
#if defined(CLEARCOAT_TINT)
outParams.absorption=computeClearCoatAbsorption(outParams.clearCoatNdotVRefract,outParams.clearCoatNdotVRefract,outParams.clearCoatColor,clearCoatThickness,clearCoatIntensity);
#endif
float fresnelIBLClearCoat=fresnelSchlickGGX(clearCoatNdotV,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);
fresnelIBLClearCoat*=clearCoatIntensity;
outParams.conservationFactor=(1.-fresnelIBLClearCoat);
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
outParams.energyConservationFactorClearCoat=getEnergyConservationFactor(outParams.specularEnvironmentR0,environmentClearCoatBrdf);
#endif
}
#endif
`;p.IncludesShadersStore[kt]=Xt;const wt="pbrBlockIridescence",Yt=`struct iridescenceOutParams
{
float iridescenceIntensity;
float iridescenceIOR;
float iridescenceThickness;
vec3 specularEnvironmentR0;
};
#ifdef IRIDESCENCE
#define pbr_inline
#define inline
void iridescenceBlock(
in vec4 vIridescenceParams,
in float viewAngle,
in vec3 specularEnvironmentR0,
#ifdef IRIDESCENCE_TEXTURE
in vec2 iridescenceMapData,
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
in vec2 iridescenceThicknessMapData,
#endif
#ifdef CLEARCOAT
in float NdotVUnclamped,
#ifdef CLEARCOAT_TEXTURE
in vec2 clearCoatMapData,
#endif
#endif
out iridescenceOutParams outParams
)
{
float iridescenceIntensity=vIridescenceParams.x;
float iridescenceIOR=vIridescenceParams.y;
float iridescenceThicknessMin=vIridescenceParams.z;
float iridescenceThicknessMax=vIridescenceParams.w;
float iridescenceThicknessWeight=1.;
#ifdef IRIDESCENCE_TEXTURE
iridescenceIntensity*=iridescenceMapData.x;
#ifdef IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE
iridescenceThicknessWeight=iridescenceMapData.g;
#endif
#endif
#if defined(IRIDESCENCE_THICKNESS_TEXTURE)
iridescenceThicknessWeight=iridescenceThicknessMapData.g;
#endif
float iridescenceThickness=mix(iridescenceThicknessMin,iridescenceThicknessMax,iridescenceThicknessWeight);
float topIor=1.; 
#ifdef CLEARCOAT
float clearCoatIntensity=vClearCoatParams.x;
#ifdef CLEARCOAT_TEXTURE
clearCoatIntensity*=clearCoatMapData.x;
#endif
topIor=mix(1.0,vClearCoatRefractionParams.w-1.,clearCoatIntensity);
viewAngle=sqrt(1.0+square(1.0/topIor)*(square(NdotVUnclamped)-1.0));
#endif
vec3 iridescenceFresnel=evalIridescence(topIor,iridescenceIOR,viewAngle,iridescenceThickness,specularEnvironmentR0);
outParams.specularEnvironmentR0=mix(specularEnvironmentR0,iridescenceFresnel,iridescenceIntensity);
outParams.iridescenceIntensity=iridescenceIntensity;
outParams.iridescenceThickness=iridescenceThickness;
outParams.iridescenceIOR=iridescenceIOR;
}
#endif
`;p.IncludesShadersStore[wt]=Yt;const zt="pbrBlockSubSurface",Qt=`struct subSurfaceOutParams
{
vec3 specularEnvironmentReflectance;
#ifdef SS_REFRACTION
vec3 finalRefraction;
vec3 surfaceAlbedo;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
float alpha;
#endif
#ifdef REFLECTION
float refractionFactorForIrradiance;
#endif
#endif
#ifdef SS_TRANSLUCENCY
vec3 transmittance;
float translucencyIntensity;
#ifdef REFLECTION
vec3 refractionIrradiance;
#endif
#endif
#if DEBUGMODE>0
vec4 thicknessMap;
vec4 environmentRefraction;
vec3 refractionTransmittance;
#endif
};
#ifdef SUBSURFACE
#define pbr_inline
#define inline
void subSurfaceBlock(
in vec3 vSubSurfaceIntensity,
in vec2 vThicknessParam,
in vec4 vTintColor,
in vec3 normalW,
in vec3 specularEnvironmentReflectance,
#ifdef SS_THICKNESSANDMASK_TEXTURE
in vec4 thicknessMap,
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
in vec4 refractionIntensityMap,
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
in vec4 translucencyIntensityMap,
#endif
#ifdef REFLECTION
#ifdef SS_TRANSLUCENCY
in mat4 reflectionMatrix,
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
in vec3 irradianceVector_,
#endif
#if defined(REALTIME_FILTERING)
in samplerCube reflectionSampler,
in vec2 vReflectionFilteringInfo,
#endif
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
in samplerCube irradianceSampler,
#else
in sampler2D irradianceSampler,
#endif
#endif
#endif
#endif
#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)
in vec3 surfaceAlbedo,
#endif
#ifdef SS_REFRACTION
in vec3 vPositionW,
in vec3 viewDirectionW,
in mat4 view,
in vec4 vRefractionInfos,
in mat4 refractionMatrix,
in vec4 vRefractionMicrosurfaceInfos,
in vec4 vLightingIntensity,
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
in float alpha,
#endif
#ifdef SS_LODINREFRACTIONALPHA
in float NdotVUnclamped,
#endif
#ifdef SS_LINEARSPECULARREFRACTION
in float roughness,
#endif
in float alphaG,
#ifdef SS_REFRACTIONMAP_3D
in samplerCube refractionSampler,
#ifndef LODBASEDMICROSFURACE
in samplerCube refractionSamplerLow,
in samplerCube refractionSamplerHigh,
#endif
#else
in sampler2D refractionSampler,
#ifndef LODBASEDMICROSFURACE
in sampler2D refractionSamplerLow,
in sampler2D refractionSamplerHigh,
#endif
#endif
#ifdef ANISOTROPIC
in anisotropicOutParams anisotropicOut,
#endif
#ifdef REALTIME_FILTERING
in vec2 vRefractionFilteringInfo,
#endif
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
in vec3 refractionPosition,
in vec3 refractionSize,
#endif
#endif
#ifdef SS_TRANSLUCENCY
in vec3 vDiffusionDistance,
#endif
out subSurfaceOutParams outParams
)
{
outParams.specularEnvironmentReflectance=specularEnvironmentReflectance;
#ifdef SS_REFRACTION
float refractionIntensity=vSubSurfaceIntensity.x;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
refractionIntensity*=(1.0-alpha);
outParams.alpha=1.0;
#endif
#endif
#ifdef SS_TRANSLUCENCY
float translucencyIntensity=vSubSurfaceIntensity.y;
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
#if defined(SS_USE_GLTF_TEXTURES)
float thickness=thicknessMap.g*vThicknessParam.y+vThicknessParam.x;
#else
float thickness=thicknessMap.r*vThicknessParam.y+vThicknessParam.x;
#endif
#if DEBUGMODE>0
outParams.thicknessMap=thicknessMap;
#endif
#ifdef SS_MASK_FROM_THICKNESS_TEXTURE
#if defined(SS_REFRACTION) && defined(SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE)
#if defined(SS_USE_GLTF_TEXTURES)
refractionIntensity*=thicknessMap.r;
#else
refractionIntensity*=thicknessMap.g;
#endif
#endif
#if defined(SS_TRANSLUCENCY) && defined(SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE)
translucencyIntensity*=thicknessMap.b;
#endif
#endif
#else
float thickness=vThicknessParam.y;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
#ifdef SS_USE_GLTF_TEXTURES
refractionIntensity*=refractionIntensityMap.r;
#else
refractionIntensity*=refractionIntensityMap.g;
#endif
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
translucencyIntensity*=translucencyIntensityMap.b;
#endif
#ifdef SS_TRANSLUCENCY
thickness=maxEps(thickness);
vec3 transmittance=transmittanceBRDF_Burley(vTintColor.rgb,vDiffusionDistance,thickness);
transmittance*=translucencyIntensity;
outParams.transmittance=transmittance;
outParams.translucencyIntensity=translucencyIntensity;
#endif
#ifdef SS_REFRACTION
vec4 environmentRefraction=vec4(0.,0.,0.,0.);
#ifdef ANISOTROPIC
vec3 refractionVector=refract(-viewDirectionW,anisotropicOut.anisotropicNormal,vRefractionInfos.y);
#else
vec3 refractionVector=refract(-viewDirectionW,normalW,vRefractionInfos.y);
#endif
#ifdef SS_REFRACTIONMAP_OPPOSITEZ
refractionVector.z*=-1.0;
#endif
#ifdef SS_REFRACTIONMAP_3D
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
refractionVector=parallaxCorrectNormal(vPositionW,refractionVector,refractionSize,refractionPosition);
#endif
refractionVector.y=refractionVector.y*vRefractionInfos.w;
vec3 refractionCoords=refractionVector;
refractionCoords=vec3(refractionMatrix*vec4(refractionCoords,0));
#else
#ifdef SS_USE_THICKNESS_AS_DEPTH
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*thickness,1.0)));
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));
#endif
vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;
refractionCoords.y=1.0-refractionCoords.y;
#endif
#ifdef SS_HAS_THICKNESS
float ior=vRefractionInfos.y;
#else
float ior=vRefractionMicrosurfaceInfos.w;
#endif
#ifdef SS_LODINREFRACTIONALPHA
float refractionAlphaG=alphaG;
refractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG,NdotVUnclamped);
#elif defined(SS_LINEARSPECULARREFRACTION)
float refractionRoughness=alphaG;
refractionRoughness=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLinearLodFromRoughness(vRefractionMicrosurfaceInfos.x,refractionRoughness);
#else
float refractionAlphaG=alphaG;
refractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));
float refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG);
#endif
#ifdef LODBASEDMICROSFURACE
refractionLOD=refractionLOD*vRefractionMicrosurfaceInfos.y+vRefractionMicrosurfaceInfos.z;
#ifdef SS_LODINREFRACTIONALPHA
float automaticRefractionLOD=UNPACK_LOD(sampleRefraction(refractionSampler,refractionCoords).a);
float requestedRefractionLOD=max(automaticRefractionLOD,refractionLOD);
#else
float requestedRefractionLOD=refractionLOD;
#endif
#if defined(REALTIME_FILTERING) && defined(SS_REFRACTIONMAP_3D)
environmentRefraction=vec4(radiance(alphaG,refractionSampler,refractionCoords,vRefractionFilteringInfo),1.0);
#else
environmentRefraction=sampleRefractionLod(refractionSampler,refractionCoords,requestedRefractionLOD);
#endif
#else
float lodRefractionNormalized=saturate(refractionLOD/log2(vRefractionMicrosurfaceInfos.x));
float lodRefractionNormalizedDoubled=lodRefractionNormalized*2.0;
vec4 environmentRefractionMid=sampleRefraction(refractionSampler,refractionCoords);
if (lodRefractionNormalizedDoubled<1.0){
environmentRefraction=mix(
sampleRefraction(refractionSamplerHigh,refractionCoords),
environmentRefractionMid,
lodRefractionNormalizedDoubled
);
} else {
environmentRefraction=mix(
environmentRefractionMid,
sampleRefraction(refractionSamplerLow,refractionCoords),
lodRefractionNormalizedDoubled-1.0
);
}
#endif
#ifdef SS_RGBDREFRACTION
environmentRefraction.rgb=fromRGBD(environmentRefraction);
#endif
#ifdef SS_GAMMAREFRACTION
environmentRefraction.rgb=toLinearSpace(environmentRefraction.rgb);
#endif
environmentRefraction.rgb*=vRefractionInfos.x;
#endif
#ifdef SS_REFRACTION
vec3 refractionTransmittance=vec3(refractionIntensity);
#ifdef SS_THICKNESSANDMASK_TEXTURE
vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);
refractionTransmittance*=cocaLambert(volumeAlbedo,thickness);
#elif defined(SS_LINKREFRACTIONTOTRANSPARENCY)
float maxChannel=max(max(surfaceAlbedo.r,surfaceAlbedo.g),surfaceAlbedo.b);
vec3 volumeAlbedo=saturate(maxChannel*surfaceAlbedo);
environmentRefraction.rgb*=volumeAlbedo;
#else
vec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);
refractionTransmittance*=cocaLambert(volumeAlbedo,vThicknessParam.y);
#endif
#ifdef SS_ALBEDOFORREFRACTIONTINT
environmentRefraction.rgb*=surfaceAlbedo.rgb;
#endif
outParams.surfaceAlbedo=surfaceAlbedo*(1.-refractionIntensity);
#ifdef REFLECTION
outParams.refractionFactorForIrradiance=(1.-refractionIntensity);
#endif
#ifdef UNUSED_MULTIPLEBOUNCES
vec3 bounceSpecularEnvironmentReflectance=(2.0*specularEnvironmentReflectance)/(1.0+specularEnvironmentReflectance);
outParams.specularEnvironmentReflectance=mix(bounceSpecularEnvironmentReflectance,specularEnvironmentReflectance,refractionIntensity);
#endif
refractionTransmittance*=1.0-outParams.specularEnvironmentReflectance;
#if DEBUGMODE>0
outParams.refractionTransmittance=refractionTransmittance;
#endif
outParams.finalRefraction=environmentRefraction.rgb*refractionTransmittance*vLightingIntensity.z;
#if DEBUGMODE>0
outParams.environmentRefraction=environmentRefraction;
#endif
#endif
#if defined(REFLECTION) && defined(SS_TRANSLUCENCY)
#if defined(NORMAL) && defined(USESPHERICALINVERTEX) || !defined(USESPHERICALFROMREFLECTIONMAP)
vec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#else
vec3 irradianceVector=irradianceVector_;
#endif
#if defined(USESPHERICALFROMREFLECTIONMAP)
#if defined(REALTIME_FILTERING)
vec3 refractionIrradiance=irradiance(reflectionSampler,-irradianceVector,vReflectionFilteringInfo);
#else
vec3 refractionIrradiance=computeEnvironmentIrradiance(-irradianceVector);
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
vec3 irradianceCoords=irradianceVector;
#else
vec2 irradianceCoords=irradianceVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
irradianceCoords/=irradianceVector.z;
#endif
irradianceCoords.y=1.0-irradianceCoords.y;
#endif
vec4 refractionIrradiance=sampleReflection(irradianceSampler,-irradianceCoords);
#ifdef RGBDREFLECTION
refractionIrradiance.rgb=fromRGBD(refractionIrradiance);
#endif
#ifdef GAMMAREFLECTION
refractionIrradiance.rgb=toLinearSpace(refractionIrradiance.rgb);
#endif
#else
vec4 refractionIrradiance=vec4(0.);
#endif
refractionIrradiance.rgb*=transmittance;
#ifdef SS_ALBEDOFORTRANSLUCENCYTINT
refractionIrradiance.rgb*=surfaceAlbedo.rgb;
#endif
outParams.refractionIrradiance=refractionIrradiance.rgb;
#endif
}
#endif
`;p.IncludesShadersStore[zt]=Qt;const Wt="pbrBlockNormalGeometric",Kt=`vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#endif
vec3 geometricNormalW=normalW;
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
geometricNormalW=gl_FrontFacing ? geometricNormalW : -geometricNormalW;
#endif
`;p.IncludesShadersStore[Wt]=Kt;const qt="pbrBlockNormalFinal",Jt=`#if defined(FORCENORMALFORWARD) && defined(NORMAL)
vec3 faceNormal=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#if defined(TWOSIDEDLIGHTING)
faceNormal=gl_FrontFacing ? faceNormal : -faceNormal;
#endif
normalW*=sign(dot(normalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
normalW=gl_FrontFacing ? normalW : -normalW;
#endif
`;p.IncludesShadersStore[qt]=Jt;const Zt="pbrBlockLightmapInit",jt=`#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
#ifdef GAMMALIGHTMAP
lightmapColor.rgb=toLinearSpace(lightmapColor.rgb);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif
`;p.IncludesShadersStore[Zt]=jt;const $t="pbrBlockGeometryInfo",ei=`float NdotVUnclamped=dot(normalW,viewDirectionW);
float NdotV=absEps(NdotVUnclamped);
float alphaG=convertRoughnessToAverageSlope(roughness);
vec2 AARoughnessFactors=getAARoughnessFactors(normalW.xyz);
#ifdef SPECULARAA
alphaG+=AARoughnessFactors.y;
#endif
#if defined(ENVIRONMENTBRDF)
vec3 environmentBrdf=getBRDFLookup(NdotV,roughness);
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
#ifdef AMBIENTINGRAYSCALE
float ambientMonochrome=aoOut.ambientOcclusionColor.r;
#else
float ambientMonochrome=getLuminance(aoOut.ambientOcclusionColor);
#endif
float seo=environmentRadianceOcclusion(ambientMonochrome,NdotVUnclamped);
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
float eho=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif
`;p.IncludesShadersStore[$t]=ei;const ti="pbrBlockReflectance0",ii=`float reflectance=max(max(reflectivityOut.surfaceReflectivityColor.r,reflectivityOut.surfaceReflectivityColor.g),reflectivityOut.surfaceReflectivityColor.b);
vec3 specularEnvironmentR0=reflectivityOut.surfaceReflectivityColor.rgb;
#ifdef METALLICWORKFLOW
vec3 specularEnvironmentR90=vec3(metallicReflectanceFactors.a);
#else 
vec3 specularEnvironmentR90=vec3(1.0,1.0,1.0);
#endif
#ifdef ALPHAFRESNEL
float reflectance90=fresnelGrazingReflectance(reflectance);
specularEnvironmentR90=specularEnvironmentR90*reflectance90;
#endif
`;p.IncludesShadersStore[ti]=ii;const ai="pbrBlockReflectance",ri=`#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
vec3 specularEnvironmentReflectance=getReflectanceFromBRDFLookup(clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,environmentBrdf);
#ifdef RADIANCEOCCLUSION
specularEnvironmentReflectance*=seo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
specularEnvironmentReflectance*=eho;
#endif
#endif
#endif
#else
vec3 specularEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,sqrt(microSurface));
#endif
#ifdef CLEARCOAT
specularEnvironmentReflectance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
specularEnvironmentReflectance*=clearcoatOut.absorption;
#endif
#endif
`;p.IncludesShadersStore[ai]=ri;const ni="pbrBlockDirectLighting",oi=`vec3 diffuseBase=vec3(0.,0.,0.);
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#ifdef CLEARCOAT
vec3 clearCoatBase=vec3(0.,0.,0.);
#endif
#ifdef SHEEN
vec3 sheenBase=vec3(0.,0.,0.);
#endif
preLightingInfo preInfo;
lightingInfo info;
float shadow=1.; 
#if defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
vec3 absorption=vec3(0.);
#endif
`;p.IncludesShadersStore[ni]=oi;const si="pbrBlockFinalLitComponents",li=`#if defined(ENVIRONMENTBRDF)
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 energyConservationFactor=getEnergyConservationFactor(clearcoatOut.specularEnvironmentR0,environmentBrdf);
#endif
#endif
#ifndef METALLICWORKFLOW
#ifdef SPECULAR_GLOSSINESS_ENERGY_CONSERVATION
surfaceAlbedo.rgb=(1.-reflectance)*surfaceAlbedo.rgb;
#endif
#endif
#if defined(SHEEN) && defined(SHEEN_ALBEDOSCALING) && defined(ENVIRONMENTBRDF)
surfaceAlbedo.rgb=sheenOut.sheenAlbedoScaling*surfaceAlbedo.rgb;
#endif
#ifdef REFLECTION
vec3 finalIrradiance=reflectionOut.environmentIrradiance;
#if defined(CLEARCOAT)
finalIrradiance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
finalIrradiance*=clearcoatOut.absorption;
#endif
#endif
#if defined(SS_REFRACTION)
finalIrradiance*=subSurfaceOut.refractionFactorForIrradiance;
#endif
#if defined(SS_TRANSLUCENCY)
finalIrradiance*=(1.0-subSurfaceOut.translucencyIntensity);
finalIrradiance+=subSurfaceOut.refractionIrradiance;
#endif
finalIrradiance*=surfaceAlbedo.rgb;
finalIrradiance*=vLightingIntensity.z;
finalIrradiance*=aoOut.ambientOcclusionColor;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase;
finalSpecular=max(finalSpecular,0.0);
vec3 finalSpecularScaled=finalSpecular*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalSpecularScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalSpecularScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif
#ifdef REFLECTION
vec3 finalRadiance=reflectionOut.environmentRadiance.rgb;
finalRadiance*=subSurfaceOut.specularEnvironmentReflectance;
vec3 finalRadianceScaled=finalRadiance*vLightingIntensity.z;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalRadianceScaled*=energyConservationFactor;
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)
finalRadianceScaled*=sheenOut.sheenAlbedoScaling;
#endif
#endif
#ifdef SHEEN
vec3 finalSheen=sheenBase*sheenOut.sheenColor;
finalSheen=max(finalSheen,0.0);
vec3 finalSheenScaled=finalSheen*vLightingIntensity.x*vLightingIntensity.w;
#if defined(CLEARCOAT) && defined(REFLECTION) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
sheenOut.finalSheenRadianceScaled*=clearcoatOut.absorption;
#endif
#endif
#endif
#ifdef CLEARCOAT
vec3 finalClearCoat=clearCoatBase;
finalClearCoat=max(finalClearCoat,0.0);
vec3 finalClearCoatScaled=finalClearCoat*vLightingIntensity.x*vLightingIntensity.w;
#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)
finalClearCoatScaled*=clearcoatOut.energyConservationFactorClearCoat;
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction*=clearcoatOut.conservationFactor;
#ifdef CLEARCOAT_TINT
subSurfaceOut.finalRefraction*=clearcoatOut.absorption;
#endif
#endif
#endif
#ifdef ALPHABLEND
float luminanceOverAlpha=0.0;
#if defined(REFLECTION) && defined(RADIANCEOVERALPHA)
luminanceOverAlpha+=getLuminance(finalRadianceScaled);
#if defined(CLEARCOAT)
luminanceOverAlpha+=getLuminance(clearcoatOut.finalClearCoatRadianceScaled);
#endif
#endif
#if defined(SPECULARTERM) && defined(SPECULAROVERALPHA)
luminanceOverAlpha+=getLuminance(finalSpecularScaled);
#endif
#if defined(CLEARCOAT) && defined(CLEARCOATOVERALPHA)
luminanceOverAlpha+=getLuminance(finalClearCoatScaled);
#endif
#if defined(RADIANCEOVERALPHA) || defined(SPECULAROVERALPHA) || defined(CLEARCOATOVERALPHA)
alpha=saturate(alpha+luminanceOverAlpha*luminanceOverAlpha);
#endif
#endif
`;p.IncludesShadersStore[si]=li;const ci="pbrBlockFinalUnlitComponents",fi=`vec3 finalDiffuse=diffuseBase;
finalDiffuse*=surfaceAlbedo.rgb;
finalDiffuse=max(finalDiffuse,0.0);
finalDiffuse*=vLightingIntensity.x;
vec3 finalAmbient=vAmbientColor;
finalAmbient*=surfaceAlbedo.rgb;
vec3 finalEmissive=vEmissiveColor;
#ifdef EMISSIVE
vec3 emissiveColorTex=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb;
#ifdef GAMMAEMISSIVE
finalEmissive*=toLinearSpace(emissiveColorTex.rgb);
#else
finalEmissive*=emissiveColorTex.rgb;
#endif
finalEmissive*= vEmissiveInfos.y;
#endif
finalEmissive*=vLightingIntensity.y;
#ifdef AMBIENT
vec3 ambientOcclusionForDirectDiffuse=mix(vec3(1.),aoOut.ambientOcclusionColor,vAmbientInfos.w);
#else
vec3 ambientOcclusionForDirectDiffuse=aoOut.ambientOcclusionColor;
#endif
finalAmbient*=aoOut.ambientOcclusionColor;
finalDiffuse*=ambientOcclusionForDirectDiffuse;
`;p.IncludesShadersStore[ci]=fi;const Ei="pbrBlockFinalColorComposition",di=`vec4 finalColor=vec4(
#ifndef UNLIT
#ifdef REFLECTION
finalIrradiance +
#endif
#ifdef SPECULARTERM
finalSpecularScaled +
#endif
#ifdef SHEEN
finalSheenScaled +
#endif
#ifdef CLEARCOAT
finalClearCoatScaled +
#endif
#ifdef REFLECTION
finalRadianceScaled +
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
sheenOut.finalSheenRadianceScaled +
#endif
#ifdef CLEARCOAT
clearcoatOut.finalClearCoatRadianceScaled +
#endif
#endif
#ifdef SS_REFRACTION
subSurfaceOut.finalRefraction +
#endif
#endif
finalAmbient +
finalDiffuse,
alpha);
#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
finalColor.rgb*=lightmapColor.rgb;
#else
finalColor.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
finalColor.rgb+=finalEmissive;
#define CUSTOM_FRAGMENT_BEFORE_FOG
finalColor=max(finalColor,0.0);
`;p.IncludesShadersStore[Ei]=di;const ui="pbrBlockImageProcessing",Ai=`#if defined(IMAGEPROCESSINGPOSTPROCESS) || defined(SS_SCATTERING)
#if !defined(SKIPFINALCOLORCLAMP)
finalColor.rgb=clamp(finalColor.rgb,0.,30.0);
#endif
#else
finalColor=applyImageProcessing(finalColor);
#endif
finalColor.a*=visibility;
#ifdef PREMULTIPLYALPHA
finalColor.rgb*=finalColor.a;
#endif
`;p.IncludesShadersStore[ui]=Ai;const Ti="pbrDebug",Ri=`#if DEBUGMODE>0
if (vClipSpacePosition.x/vClipSpacePosition.w>=vDebugMode.x) {
#if DEBUGMODE==1
gl_FragColor.rgb=vPositionW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==2 && defined(NORMAL)
gl_FragColor.rgb=vNormalW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==3 && defined(BUMP) || DEBUGMODE==3 && defined(PARALLAX) || DEBUGMODE==3 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==4 && defined(BUMP) || DEBUGMODE==4 && defined(PARALLAX) || DEBUGMODE==4 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==5
gl_FragColor.rgb=normalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==6 && defined(MAINUV1)
gl_FragColor.rgb=vec3(vMainUV1,0.0);
#elif DEBUGMODE==7 && defined(MAINUV2)
gl_FragColor.rgb=vec3(vMainUV2,0.0);
#elif DEBUGMODE==8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==10 && defined(CLEARCOAT)
gl_FragColor.rgb=clearcoatOut.clearCoatNormalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==11 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicNormal;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==12 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicTangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==13 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicBitangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==20 && defined(ALBEDO)
gl_FragColor.rgb=albedoTexture.rgb;
#elif DEBUGMODE==21 && defined(AMBIENT)
gl_FragColor.rgb=aoOut.ambientOcclusionColorMap.rgb;
#elif DEBUGMODE==22 && defined(OPACITY)
gl_FragColor.rgb=opacityMap.rgb;
#elif DEBUGMODE==23 && defined(EMISSIVE)
gl_FragColor.rgb=emissiveColorTex.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==24 && defined(LIGHTMAP)
gl_FragColor.rgb=lightmapColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceMetallicColorMap.rgb;
#elif DEBUGMODE==26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceReflectivityColorMap.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatMapData.rg,0.0);
#elif DEBUGMODE==28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
gl_FragColor.rgb=clearcoatOut.clearCoatTintMapData.rgb;
#elif DEBUGMODE==29 && defined(SHEEN) && defined(SHEEN_TEXTURE)
gl_FragColor.rgb=sheenOut.sheenMapData.rgb;
#elif DEBUGMODE==30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)
gl_FragColor.rgb=anisotropicOut.anisotropyMapData.rgb;
#elif DEBUGMODE==31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)
gl_FragColor.rgb=subSurfaceOut.thicknessMap.rgb;
#elif DEBUGMODE==40 && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.environmentRefraction.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==41 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==42 && defined(CLEARCOAT) && defined(REFLECTION)
gl_FragColor.rgb=clearcoatOut.environmentClearCoatRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==50
gl_FragColor.rgb=diffuseBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==51 && defined(SPECULARTERM)
gl_FragColor.rgb=specularBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==52 && defined(CLEARCOAT)
gl_FragColor.rgb=clearCoatBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==53 && defined(SHEEN)
gl_FragColor.rgb=sheenBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==54 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentIrradiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==60
gl_FragColor.rgb=surfaceAlbedo.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==61
gl_FragColor.rgb=clearcoatOut.specularEnvironmentR0;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==62 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=vec3(reflectivityOut.metallicRoughness.r);
#elif DEBUGMODE==71 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.metallicF0;
#elif DEBUGMODE==63
gl_FragColor.rgb=vec3(roughness);
#elif DEBUGMODE==64
gl_FragColor.rgb=vec3(alphaG);
#elif DEBUGMODE==65
gl_FragColor.rgb=vec3(NdotV);
#elif DEBUGMODE==66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
gl_FragColor.rgb=clearcoatOut.clearCoatColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==67 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatRoughness);
#elif DEBUGMODE==68 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatNdotV);
#elif DEBUGMODE==69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)
gl_FragColor.rgb=subSurfaceOut.transmittance;
#elif DEBUGMODE==70 && defined(SUBSURFACE) && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.refractionTransmittance;
#elif DEBUGMODE==72
gl_FragColor.rgb=vec3(microSurface);
#elif DEBUGMODE==73
gl_FragColor.rgb=vAlbedoColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==74 && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=vReflectivityColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==75
gl_FragColor.rgb=vEmissiveColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==80 && defined(RADIANCEOCCLUSION)
gl_FragColor.rgb=vec3(seo);
#elif DEBUGMODE==81 && defined(HORIZONOCCLUSION)
gl_FragColor.rgb=vec3(eho);
#elif DEBUGMODE==82 && defined(MS_BRDF_ENERGY_CONSERVATION)
gl_FragColor.rgb=vec3(energyConservationFactor);
#elif DEBUGMODE==83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=specularEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=clearcoatOut.clearCoatEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==85 && defined(SHEEN) && defined(REFLECTION)
gl_FragColor.rgb=sheenOut.sheenEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==86 && defined(ALPHABLEND)
gl_FragColor.rgb=vec3(luminanceOverAlpha);
#elif DEBUGMODE==87
gl_FragColor.rgb=vec3(alpha);
#elif DEBUGMODE==88 && defined(ALBEDO)
gl_FragColor.rgb=vec3(albedoTexture.a);
#else
float stripeWidth=30.;
float stripePos=floor((gl_FragCoord.x+gl_FragCoord.y)/stripeWidth);
float whichColor=mod(stripePos,2.);
vec3 color1=vec3(.6,.2,.2);
vec3 color2=vec3(.3,.1,.1);
gl_FragColor.rgb=mix(color1,color2,whichColor);
#endif
gl_FragColor.rgb*=vDebugMode.y;
#ifdef DEBUGMODE_NORMALIZE
gl_FragColor.rgb=normalize(gl_FragColor.rgb)*0.5+0.5;
#endif
#ifdef DEBUGMODE_GAMMA
gl_FragColor.rgb=toGammaSpace(gl_FragColor.rgb);
#endif
gl_FragColor.a=1.0;
#ifdef PREPASS
gl_FragData[0]=toLinearSpace(gl_FragColor); 
gl_FragData[1]=vec4(0.,0.,0.,0.); 
#endif
return;
}
#endif
`;p.IncludesShadersStore[Ti]=Ri;const hi="pbrPixelShader",Ii=`#if defined(BUMP) || !defined(NORMAL) || defined(FORCENORMALFORWARD) || defined(SPECULARAA) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef LODBASEDMICROSFURACE
#extension GL_EXT_shader_texture_lod : enable
#endif
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
precision highp float;
#include<oitDeclaration>
#ifndef FROMLINEARSPACE
#define FROMLINEARSPACE
#endif
#include<__decl__pbrFragment>
#include<pbrFragmentExtraDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<pbrFragmentSamplersDeclaration>
#include<imageProcessingDeclaration>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#include<helperFunctions>
#include<subSurfaceScatteringFunctions>
#include<importanceSampling>
#include<pbrHelperFunctions>
#include<imageProcessingFunctions>
#include<shadowsFragmentFunctions>
#include<harmonicsFunctions>
#include<pbrDirectLightingSetupFunctions>
#include<pbrDirectLightingFalloffFunctions>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
#include<pbrDirectLightingFunctions>
#include<pbrIBLFunctions>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#ifdef REFLECTION
#include<reflectionFunction>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<pbrBlockAlbedoOpacity>
#include<pbrBlockReflectivity>
#include<pbrBlockAmbientOcclusion>
#include<pbrBlockAlphaFresnel>
#include<pbrBlockAnisotropic>
#include<pbrBlockReflection>
#include<pbrBlockSheen>
#include<pbrBlockClearcoat>
#include<pbrBlockIridescence>
#include<pbrBlockSubSurface>
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#include<pbrBlockNormalGeometric>
#include<bumpFragment>
#include<pbrBlockNormalFinal>
albedoOpacityOutParams albedoOpacityOut;
#ifdef ALBEDO
vec4 albedoTexture=texture2D(albedoSampler,vAlbedoUV+uvOffset);
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);
#endif
#ifdef DECAL
vec4 decalColor=texture2D(decalSampler,vDecalUV+uvOffset);
#endif
albedoOpacityBlock(
vAlbedoColor,
#ifdef ALBEDO
albedoTexture,
vAlbedoInfos,
#endif
#ifdef OPACITY
opacityMap,
vOpacityInfos,
#endif
#ifdef DETAIL
detailColor,
vDetailInfos,
#endif
#ifdef DECAL
decalColor,
vDecalInfos,
#endif
albedoOpacityOut
);
vec3 surfaceAlbedo=albedoOpacityOut.surfaceAlbedo;
float alpha=albedoOpacityOut.alpha;
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
#include<depthPrePass>
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
ambientOcclusionOutParams aoOut;
#ifdef AMBIENT
vec3 ambientOcclusionColorMap=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb;
#endif
ambientOcclusionBlock(
#ifdef AMBIENT
ambientOcclusionColorMap,
vAmbientInfos,
#endif
aoOut
);
#include<pbrBlockLightmapInit>
#ifdef UNLIT
vec3 diffuseBase=vec3(1.,1.,1.);
#else
vec3 baseColor=surfaceAlbedo;
reflectivityOutParams reflectivityOut;
#if defined(REFLECTIVITY)
vec4 surfaceMetallicOrReflectivityColorMap=texture2D(reflectivitySampler,vReflectivityUV+uvOffset);
vec4 baseReflectivity=surfaceMetallicOrReflectivityColorMap;
#ifndef METALLICWORKFLOW
#ifdef REFLECTIVITY_GAMMA
surfaceMetallicOrReflectivityColorMap=toLinearSpace(surfaceMetallicOrReflectivityColorMap);
#endif
surfaceMetallicOrReflectivityColorMap.rgb*=vReflectivityInfos.y;
#endif
#endif
#if defined(MICROSURFACEMAP)
vec4 microSurfaceTexel=texture2D(microSurfaceSampler,vMicroSurfaceSamplerUV+uvOffset)*vMicroSurfaceSamplerInfos.y;
#endif
#ifdef METALLICWORKFLOW
vec4 metallicReflectanceFactors=vMetallicReflectanceFactors;
#ifdef REFLECTANCE
vec4 reflectanceFactorsMap=texture2D(reflectanceSampler,vReflectanceUV+uvOffset);
#ifdef REFLECTANCE_GAMMA
reflectanceFactorsMap=toLinearSpace(reflectanceFactorsMap);
#endif
metallicReflectanceFactors.rgb*=reflectanceFactorsMap.rgb;
#endif
#ifdef METALLIC_REFLECTANCE
vec4 metallicReflectanceFactorsMap=texture2D(metallicReflectanceSampler,vMetallicReflectanceUV+uvOffset);
#ifdef METALLIC_REFLECTANCE_GAMMA
metallicReflectanceFactorsMap=toLinearSpace(metallicReflectanceFactorsMap);
#endif
#ifndef METALLIC_REFLECTANCE_USE_ALPHA_ONLY
metallicReflectanceFactors.rgb*=metallicReflectanceFactorsMap.rgb;
#endif
metallicReflectanceFactors*=metallicReflectanceFactorsMap.a;
#endif
#endif
reflectivityBlock(
vReflectivityColor,
#ifdef METALLICWORKFLOW
surfaceAlbedo,
metallicReflectanceFactors,
#endif
#ifdef REFLECTIVITY
vReflectivityInfos,
surfaceMetallicOrReflectivityColorMap,
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
aoOut.ambientOcclusionColor,
#endif
#ifdef MICROSURFACEMAP
microSurfaceTexel,
#endif
#ifdef DETAIL
detailColor,
vDetailInfos,
#endif
reflectivityOut
);
float microSurface=reflectivityOut.microSurface;
float roughness=reflectivityOut.roughness;
#ifdef METALLICWORKFLOW
surfaceAlbedo=reflectivityOut.surfaceAlbedo;
#endif
#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)
aoOut.ambientOcclusionColor=reflectivityOut.ambientOcclusionColor;
#endif
#ifdef ALPHAFRESNEL
#if defined(ALPHATEST) || defined(ALPHABLEND)
alphaFresnelOutParams alphaFresnelOut;
alphaFresnelBlock(
normalW,
viewDirectionW,
alpha,
microSurface,
alphaFresnelOut
);
alpha=alphaFresnelOut.alpha;
#endif
#endif
#include<pbrBlockGeometryInfo>
#ifdef ANISOTROPIC
anisotropicOutParams anisotropicOut;
#ifdef ANISOTROPIC_TEXTURE
vec3 anisotropyMapData=texture2D(anisotropySampler,vAnisotropyUV+uvOffset).rgb*vAnisotropyInfos.y;
#endif
anisotropicBlock(
vAnisotropy,
roughness,
#ifdef ANISOTROPIC_TEXTURE
anisotropyMapData,
#endif
TBN,
normalW,
viewDirectionW,
anisotropicOut
);
#endif
#ifdef REFLECTION
reflectionOutParams reflectionOut;
#ifndef USE_CUSTOM_REFLECTION
reflectionBlock(
vPositionW,
normalW,
alphaG,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
#ifdef ANISOTROPIC
anisotropicOut,
#endif
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
NdotVUnclamped,
#endif
#ifdef LINEARSPECULARREFLECTION
roughness,
#endif
reflectionSampler,
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
vEnvironmentIrradiance,
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
reflectionMatrix,
#endif
#endif
#ifdef USEIRRADIANCEMAP
irradianceSampler,
#endif
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
reflectionOut
);
#else
#define CUSTOM_REFLECTION
#endif
#endif
#include<pbrBlockReflectance0>
#ifdef SHEEN
sheenOutParams sheenOut;
#ifdef SHEEN_TEXTURE
vec4 sheenMapData=texture2D(sheenSampler,vSheenUV+uvOffset);
#endif
#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
vec4 sheenMapRoughnessData=texture2D(sheenRoughnessSampler,vSheenRoughnessUV+uvOffset)*vSheenInfos.w;
#endif
sheenBlock(
vSheenColor,
#ifdef SHEEN_ROUGHNESS
vSheenRoughness,
#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)
sheenMapRoughnessData,
#endif
#endif
roughness,
#ifdef SHEEN_TEXTURE
sheenMapData,
vSheenInfos.y,
#endif
reflectance,
#ifdef SHEEN_LINKWITHALBEDO
baseColor,
surfaceAlbedo,
#endif
#ifdef ENVIRONMENTBRDF
NdotV,
environmentBrdf,
#endif
#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)
AARoughnessFactors,
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
vLightingIntensity,
reflectionSampler,
reflectionOut.reflectionCoords,
NdotVUnclamped,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)
seo,
#endif
#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
eho,
#endif
#endif
sheenOut
);
#ifdef SHEEN_LINKWITHALBEDO
surfaceAlbedo=sheenOut.surfaceAlbedo;
#endif
#endif
#ifdef CLEARCOAT
#ifdef CLEARCOAT_TEXTURE
vec2 clearCoatMapData=texture2D(clearCoatSampler,vClearCoatUV+uvOffset).rg*vClearCoatInfos.y;
#endif
#endif
#ifdef IRIDESCENCE
iridescenceOutParams iridescenceOut;
#ifdef IRIDESCENCE_TEXTURE
vec2 iridescenceMapData=texture2D(iridescenceSampler,vIridescenceUV+uvOffset).rg*vIridescenceInfos.y;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
vec2 iridescenceThicknessMapData=texture2D(iridescenceThicknessSampler,vIridescenceThicknessUV+uvOffset).rg*vIridescenceInfos.w;
#endif
iridescenceBlock(
vIridescenceParams,
NdotV,
specularEnvironmentR0,
#ifdef IRIDESCENCE_TEXTURE
iridescenceMapData,
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
iridescenceThicknessMapData,
#endif
#ifdef CLEARCOAT
NdotVUnclamped,
#ifdef CLEARCOAT_TEXTURE
clearCoatMapData,
#endif
#endif
iridescenceOut
);
float iridescenceIntensity=iridescenceOut.iridescenceIntensity;
specularEnvironmentR0=iridescenceOut.specularEnvironmentR0;
#endif
clearcoatOutParams clearcoatOut;
#ifdef CLEARCOAT
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
vec4 clearCoatMapRoughnessData=texture2D(clearCoatRoughnessSampler,vClearCoatRoughnessUV+uvOffset)*vClearCoatInfos.w;
#endif
#if defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
vec4 clearCoatTintMapData=texture2D(clearCoatTintSampler,vClearCoatTintUV+uvOffset);
#endif
#ifdef CLEARCOAT_BUMP
vec4 clearCoatBumpMapData=texture2D(clearCoatBumpSampler,vClearCoatBumpUV+uvOffset);
#endif
clearcoatBlock(
vPositionW,
geometricNormalW,
viewDirectionW,
vClearCoatParams,
#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)
clearCoatMapRoughnessData,
#endif
specularEnvironmentR0,
#ifdef CLEARCOAT_TEXTURE
clearCoatMapData,
#endif
#ifdef CLEARCOAT_TINT
vClearCoatTintParams,
clearCoatColorAtDistance,
vClearCoatRefractionParams,
#ifdef CLEARCOAT_TINT_TEXTURE
clearCoatTintMapData,
#endif
#endif
#ifdef CLEARCOAT_BUMP
vClearCoatBumpInfos,
clearCoatBumpMapData,
vClearCoatBumpUV,
#if defined(TANGENT) && defined(NORMAL)
vTBN,
#else
vClearCoatTangentSpaceParams,
#endif
#ifdef OBJECTSPACE_NORMALMAP
normalMatrix,
#endif
#endif
#if defined(FORCENORMALFORWARD) && defined(NORMAL)
faceNormal,
#endif
#ifdef REFLECTION
vReflectionMicrosurfaceInfos,
vReflectionInfos,
vReflectionColor,
vLightingIntensity,
reflectionSampler,
#ifndef LODBASEDMICROSFURACE
reflectionSamplerLow,
reflectionSamplerHigh,
#endif
#ifdef REALTIME_FILTERING
vReflectionFilteringInfo,
#endif
#endif
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef RADIANCEOCCLUSION
ambientMonochrome,
#endif
#endif
#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)
(gl_FrontFacing ? 1. : -1.),
#endif
clearcoatOut
);
#else
clearcoatOut.specularEnvironmentR0=specularEnvironmentR0;
#endif
#include<pbrBlockReflectance>
subSurfaceOutParams subSurfaceOut;
#ifdef SUBSURFACE
#ifdef SS_THICKNESSANDMASK_TEXTURE
vec4 thicknessMap=texture2D(thicknessSampler,vThicknessUV+uvOffset);
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
vec4 refractionIntensityMap=texture2D(refractionIntensitySampler,vRefractionIntensityUV+uvOffset);
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
vec4 translucencyIntensityMap=texture2D(translucencyIntensitySampler,vTranslucencyIntensityUV+uvOffset);
#endif
subSurfaceBlock(
vSubSurfaceIntensity,
vThicknessParam,
vTintColor,
normalW,
specularEnvironmentReflectance,
#ifdef SS_THICKNESSANDMASK_TEXTURE
thicknessMap,
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
refractionIntensityMap,
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
translucencyIntensityMap,
#endif
#ifdef REFLECTION
#ifdef SS_TRANSLUCENCY
reflectionMatrix,
#ifdef USESPHERICALFROMREFLECTIONMAP
#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)
reflectionOut.irradianceVector,
#endif
#if defined(REALTIME_FILTERING)
reflectionSampler,
vReflectionFilteringInfo,
#endif
#endif
#ifdef USEIRRADIANCEMAP
irradianceSampler,
#endif
#endif
#endif
#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)
surfaceAlbedo,
#endif
#ifdef SS_REFRACTION
vPositionW,
viewDirectionW,
view,
vRefractionInfos,
refractionMatrix,
vRefractionMicrosurfaceInfos,
vLightingIntensity,
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
alpha,
#endif
#ifdef SS_LODINREFRACTIONALPHA
NdotVUnclamped,
#endif
#ifdef SS_LINEARSPECULARREFRACTION
roughness,
#endif
alphaG,
refractionSampler,
#ifndef LODBASEDMICROSFURACE
refractionSamplerLow,
refractionSamplerHigh,
#endif
#ifdef ANISOTROPIC
anisotropicOut,
#endif
#ifdef REALTIME_FILTERING
vRefractionFilteringInfo,
#endif
#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC
vRefractionPosition,
vRefractionSize,
#endif
#endif
#ifdef SS_TRANSLUCENCY
vDiffusionDistance,
#endif
subSurfaceOut
);
#ifdef SS_REFRACTION
surfaceAlbedo=subSurfaceOut.surfaceAlbedo;
#ifdef SS_LINKREFRACTIONTOTRANSPARENCY
alpha=subSurfaceOut.alpha;
#endif
#endif
#else
subSurfaceOut.specularEnvironmentReflectance=specularEnvironmentReflectance;
#endif
#include<pbrBlockDirectLighting>
#include<lightFragment>[0..maxSimultaneousLights]
#include<pbrBlockFinalLitComponents>
#endif 
#include<pbrBlockFinalUnlitComponents>
#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION
#include<pbrBlockFinalColorComposition>
#include<logDepthFragment>
#include<fogFragment>(color,finalColor)
#include<pbrBlockImageProcessing>
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
float writeGeometryInfo=finalColor.a>0.4 ? 1.0 : 0.0;
#ifdef PREPASS_POSITION
gl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);
#endif
#ifdef PREPASS_VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;
vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;
vec2 velocity=abs(a-b);
velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;
gl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_ALBEDO_SQRT
vec3 sqAlbedo=sqrt(surfaceAlbedo); 
#endif
#ifdef PREPASS_IRRADIANCE
vec3 irradiance=finalDiffuse;
#ifndef UNLIT
#ifdef REFLECTION
irradiance+=finalIrradiance;
#endif
#endif
#ifdef SS_SCATTERING
gl_FragData[0]=vec4(finalColor.rgb-irradiance,finalColor.a); 
irradiance/=sqAlbedo;
#else
gl_FragData[0]=finalColor; 
float scatteringDiffusionProfile=255.;
#endif
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(clamp(irradiance,vec3(0.),vec3(1.)),writeGeometryInfo*scatteringDiffusionProfile/255.); 
#else
gl_FragData[0]=vec4(finalColor.rgb,finalColor.a);
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_NORMAL
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalize((view*vec4(normalW,0.0)).rgb),writeGeometryInfo); 
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(sqAlbedo,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#ifndef UNLIT
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(specularEnvironmentR0,microSurface)*writeGeometryInfo;
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4( 0.0,0.0,0.0,1.0 )*writeGeometryInfo;
#endif
#endif
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=finalColor;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {
frontColor.rgb+=finalColor.rgb*finalColor.a*alphaMultiplier;
frontColor.a=1.0-alphaMultiplier*(1.0-finalColor.a);
} else {
backColor+=finalColor;
}
#endif
#include<pbrDebug>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;p.ShadersStore[hi]=Ii;const Ci="pbrVertexDeclaration",Si=`uniform mat4 view;
uniform mat4 viewProjection;
#ifdef ALBEDO
uniform mat4 albedoMatrix;
uniform vec2 vAlbedoInfos;
#endif
#ifdef AMBIENT
uniform mat4 ambientMatrix;
uniform vec4 vAmbientInfos;
#endif
#ifdef OPACITY
uniform mat4 opacityMatrix;
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
uniform mat4 emissiveMatrix;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
uniform mat4 lightmapMatrix;
#endif
#ifdef REFLECTIVITY 
uniform vec3 vReflectivityInfos;
uniform mat4 reflectivityMatrix;
#endif
#ifdef METALLIC_REFLECTANCE
uniform vec2 vMetallicReflectanceInfos;
uniform mat4 metallicReflectanceMatrix;
#endif
#ifdef REFLECTANCE
uniform vec2 vReflectanceInfos;
uniform mat4 reflectanceMatrix;
#endif
#ifdef MICROSURFACEMAP
uniform vec2 vMicroSurfaceSamplerInfos;
uniform mat4 microSurfaceSamplerMatrix;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform mat4 bumpMatrix;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
uniform mat4 reflectionMatrix;
#endif
#ifdef CLEARCOAT
#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)
uniform vec4 vClearCoatInfos;
#endif
#ifdef CLEARCOAT_TEXTURE
uniform mat4 clearCoatMatrix;
#endif
#ifdef CLEARCOAT_TEXTURE_ROUGHNESS
uniform mat4 clearCoatRoughnessMatrix;
#endif
#ifdef CLEARCOAT_BUMP
uniform vec2 vClearCoatBumpInfos;
uniform mat4 clearCoatBumpMatrix;
#endif
#ifdef CLEARCOAT_TINT_TEXTURE
uniform vec2 vClearCoatTintInfos;
uniform mat4 clearCoatTintMatrix;
#endif
#endif
#ifdef IRIDESCENCE
#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)
uniform vec4 vIridescenceInfos;
#endif
#ifdef IRIDESCENCE_TEXTURE
uniform mat4 iridescenceMatrix;
#endif
#ifdef IRIDESCENCE_THICKNESS_TEXTURE
uniform mat4 iridescenceThicknessMatrix;
#endif
#endif
#ifdef ANISOTROPIC
#ifdef ANISOTROPIC_TEXTURE
uniform vec2 vAnisotropyInfos;
uniform mat4 anisotropyMatrix;
#endif
#endif
#ifdef SHEEN
#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)
uniform vec4 vSheenInfos;
#endif
#ifdef SHEEN_TEXTURE
uniform mat4 sheenMatrix;
#endif
#ifdef SHEEN_TEXTURE_ROUGHNESS
uniform mat4 sheenRoughnessMatrix;
#endif
#endif
#ifdef SUBSURFACE
#ifdef SS_REFRACTION
uniform vec4 vRefractionInfos;
uniform mat4 refractionMatrix;
#endif
#ifdef SS_THICKNESSANDMASK_TEXTURE
uniform vec2 vThicknessInfos;
uniform mat4 thicknessMatrix;
#endif
#ifdef SS_REFRACTIONINTENSITY_TEXTURE
uniform vec2 vRefractionIntensityInfos;
uniform mat4 refractionIntensityMatrix;
#endif
#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE
uniform vec2 vTranslucencyIntensityInfos;
uniform mat4 translucencyIntensityMatrix;
#endif
#endif
#ifdef NORMAL
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
uniform vec3 vSphericalL00;
uniform vec3 vSphericalL1_1;
uniform vec3 vSphericalL10;
uniform vec3 vSphericalL11;
uniform vec3 vSphericalL2_2;
uniform vec3 vSphericalL2_1;
uniform vec3 vSphericalL20;
uniform vec3 vSphericalL21;
uniform vec3 vSphericalL22;
#else
uniform vec3 vSphericalX;
uniform vec3 vSphericalY;
uniform vec3 vSphericalZ;
uniform vec3 vSphericalXX_ZZ;
uniform vec3 vSphericalYY_ZZ;
uniform vec3 vSphericalZZ;
uniform vec3 vSphericalXY;
uniform vec3 vSphericalYZ;
uniform vec3 vSphericalZX;
#endif
#endif
#endif
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
uniform mat4 detailMatrix;
#endif
#include<decalVertexDeclaration>
#define ADDITIONAL_VERTEX_DECLARATION
`;p.IncludesShadersStore[Ci]=Si;const mi="pbrVertexShader",_i=`precision highp float;
#include<__decl__pbrVertex>
#define CUSTOM_VERTEX_BEGIN
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef TANGENT
attribute vec4 tangent;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#include<uvAttributeDeclaration>[2..7]
#include<mainUVVaryingDeclaration>[1..7]
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<prePassVertexDeclaration>
#include<samplerVertexDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo)
#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity)
#include<samplerVertexDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler)
#include<samplerVertexDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance)
#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance)
#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)
#ifdef CLEARCOAT
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump)
#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint)
#endif
#ifdef IRIDESCENCE
#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence)
#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness)
#endif
#ifdef SHEEN
#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen)
#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)
#endif
#ifdef ANISOTROPIC
#include<samplerVertexDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy)
#endif
#ifdef SUBSURFACE
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness)
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity)
#include<samplerVertexDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity)
#endif
varying vec3 vPositionW;
#if DEBUGMODE>0
varying vec4 vClipSpacePosition;
#endif
#ifdef NORMAL
varying vec3 vNormalW;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vec3 vEnvironmentIrradiance;
#include<harmonicsFunctions>
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<bumpVertexDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#include<logDepthDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec3 positionUpdated=position;
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#ifdef TANGENT
vec4 tangentUpdated=tangent;
#endif
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
vPositionUVW=positionUpdated;
#endif
#define CUSTOM_VERTEX_UPDATE_POSITION
#define CUSTOM_VERTEX_UPDATE_NORMAL
#include<instancesVertex>
#if defined(PREPASS) && defined(PREPASS_VELOCITY) && !defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
vPositionW=vec3(worldPos);
#include<prePassVertex>
#ifdef NORMAL
mat3 normalWorld=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));
vNormalW=normalize(normalWorld*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
vNormalW=normalize(normalWorld*normalUpdated);
#endif
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
vec3 reflectionVector=vec3(reflectionMatrix*vec4(vNormalW,0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
vEnvironmentIrradiance=computeEnvironmentIrradiance(reflectionVector);
#endif
#endif
#define CUSTOM_VERTEX_UPDATE_WORLDPOS
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {
gl_Position=viewProjection*worldPos;
} else {
gl_Position=viewProjectionR*worldPos;
}
#else
gl_Position=viewProjection*worldPos;
#endif
#if DEBUGMODE>0
vClipSpacePosition=gl_Position;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
vDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));
#endif
#ifndef UV1
vec2 uvUpdated=vec2(0.,0.);
#endif
#ifdef MAINUV1
vMainUV1=uvUpdated;
#endif
#include<uvVariableDeclaration>[2..7]
#include<samplerVertexImplementation>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_MATRIXNAME_,albedo,_INFONAME_,AlbedoInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_MATRIXNAME_,reflectivity,_INFONAME_,ReflectivityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_MATRIXNAME_,microSurfaceSampler,_INFONAME_,MicroSurfaceSamplerInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_MATRIXNAME_,metallicReflectance,_INFONAME_,MetallicReflectanceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_MATRIXNAME_,reflectance,_INFONAME_,ReflectanceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)
#ifdef CLEARCOAT
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_MATRIXNAME_,clearCoat,_INFONAME_,ClearCoatInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness,_MATRIXNAME_,clearCoatRoughness,_INFONAME_,ClearCoatInfos.z)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_MATRIXNAME_,clearCoatBump,_INFONAME_,ClearCoatBumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_MATRIXNAME_,clearCoatTint,_INFONAME_,ClearCoatTintInfos.x)
#endif
#ifdef IRIDESCENCE
#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_MATRIXNAME_,iridescence,_INFONAME_,IridescenceInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_MATRIXNAME_,iridescenceThickness,_INFONAME_,IridescenceInfos.z)
#endif
#ifdef SHEEN
#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.z)
#endif
#ifdef ANISOTROPIC
#include<samplerVertexImplementation>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_MATRIXNAME_,anisotropy,_INFONAME_,AnisotropyInfos.x)
#endif
#ifdef SUBSURFACE
#include<samplerVertexImplementation>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_MATRIXNAME_,thickness,_INFONAME_,ThicknessInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_MATRIXNAME_,refractionIntensity,_INFONAME_,RefractionIntensityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_MATRIXNAME_,translucencyIntensity,_INFONAME_,TranslucencyIntensityInfos.x)
#endif
#include<bumpVertex>
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}`;p.ShadersStore[mi]=_i;class pi extends K{constructor(){super(...arguments),this.CLEARCOAT=!1,this.CLEARCOAT_DEFAULTIOR=!1,this.CLEARCOAT_TEXTURE=!1,this.CLEARCOAT_TEXTURE_ROUGHNESS=!1,this.CLEARCOAT_TEXTUREDIRECTUV=0,this.CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV=0,this.CLEARCOAT_BUMP=!1,this.CLEARCOAT_BUMPDIRECTUV=0,this.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,this.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=!1,this.CLEARCOAT_REMAP_F0=!1,this.CLEARCOAT_TINT=!1,this.CLEARCOAT_TINT_TEXTURE=!1,this.CLEARCOAT_TINT_TEXTUREDIRECTUV=0,this.CLEARCOAT_TINT_GAMMATEXTURE=!1}}class D extends Z{_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}constructor(e,t=!0){super(e,"PBRClearCoat",100,new pi,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.roughness=0,this._indexOfRefraction=D._DefaultIndexOfRefraction,this.indexOfRefraction=D._DefaultIndexOfRefraction,this._texture=null,this.texture=null,this._useRoughnessFromMainTexture=!0,this.useRoughnessFromMainTexture=!0,this._textureRoughness=null,this.textureRoughness=null,this._remapF0OnInterfaceChange=!0,this.remapF0OnInterfaceChange=!0,this._bumpTexture=null,this.bumpTexture=null,this._isTintEnabled=!1,this.isTintEnabled=!1,this.tintColor=F.White(),this.tintColorAtDistance=1,this.tintThickness=1,this._tintTexture=null,this.tintTexture=null,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}isReadyForSubMesh(e,t,i){if(!this._isEnabled)return!0;const o=this._material._disableBumpMap;return!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.ClearCoatTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._textureRoughness&&c.ClearCoatTextureEnabled&&!this._textureRoughness.isReadyOrNotBlocking()||i.getCaps().standardDerivatives&&this._bumpTexture&&c.ClearCoatBumpTextureEnabled&&!o&&!this._bumpTexture.isReady()||this._isTintEnabled&&this._tintTexture&&c.ClearCoatTintTextureEnabled&&!this._tintTexture.isReadyOrNotBlocking()))}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.CLEARCOAT=!0,e.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=this._useRoughnessFromMainTexture,e.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=this._texture!==null&&this._texture._texture===((i=this._textureRoughness)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._textureRoughness),e.CLEARCOAT_REMAP_F0=this._remapF0OnInterfaceChange,e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.ClearCoatTextureEnabled?h.PrepareDefinesForMergedUV(this._texture,e,"CLEARCOAT_TEXTURE"):e.CLEARCOAT_TEXTURE=!1,this._textureRoughness&&c.ClearCoatTextureEnabled?h.PrepareDefinesForMergedUV(this._textureRoughness,e,"CLEARCOAT_TEXTURE_ROUGHNESS"):e.CLEARCOAT_TEXTURE_ROUGHNESS=!1,this._bumpTexture&&c.ClearCoatBumpTextureEnabled?h.PrepareDefinesForMergedUV(this._bumpTexture,e,"CLEARCOAT_BUMP"):e.CLEARCOAT_BUMP=!1,e.CLEARCOAT_DEFAULTIOR=this._indexOfRefraction===D._DefaultIndexOfRefraction,this._isTintEnabled?(e.CLEARCOAT_TINT=!0,this._tintTexture&&c.ClearCoatTintTextureEnabled?(h.PrepareDefinesForMergedUV(this._tintTexture,e,"CLEARCOAT_TINT_TEXTURE"),e.CLEARCOAT_TINT_GAMMATEXTURE=this._tintTexture.gammaSpace):e.CLEARCOAT_TINT_TEXTURE=!1):(e.CLEARCOAT_TINT=!1,e.CLEARCOAT_TINT_TEXTURE=!1))):(e.CLEARCOAT=!1,e.CLEARCOAT_TEXTURE=!1,e.CLEARCOAT_TEXTURE_ROUGHNESS=!1,e.CLEARCOAT_BUMP=!1,e.CLEARCOAT_TINT=!1,e.CLEARCOAT_TINT_TEXTURE=!1,e.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,e.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL=!1,e.CLEARCOAT_DEFAULTIOR=!1,e.CLEARCOAT_TEXTUREDIRECTUV=0,e.CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV=0,e.CLEARCOAT_BUMPDIRECTUV=0,e.CLEARCOAT_REMAP_F0=!1,e.CLEARCOAT_TINT_TEXTUREDIRECTUV=0,e.CLEARCOAT_TINT_GAMMATEXTURE=!1)}bindForSubMesh(e,t,i,o){var d,s,I,R,A,l,S,_;if(!this._isEnabled)return;const m=o.materialDefines,r=this._material.isFrozen,T=this._material._disableBumpMap,g=this._material._invertNormalMapX,b=this._material._invertNormalMapY,P=m.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL;if(!e.useUbo||!r||!e.isSync){P&&c.ClearCoatTextureEnabled?(e.updateFloat4("vClearCoatInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),h.BindTextureMatrix(this._texture,e,"clearCoat")):(this._texture||this._textureRoughness)&&c.ClearCoatTextureEnabled&&(e.updateFloat4("vClearCoatInfos",(s=(d=this._texture)===null||d===void 0?void 0:d.coordinatesIndex)!==null&&s!==void 0?s:0,(R=(I=this._texture)===null||I===void 0?void 0:I.level)!==null&&R!==void 0?R:0,(l=(A=this._textureRoughness)===null||A===void 0?void 0:A.coordinatesIndex)!==null&&l!==void 0?l:0,(_=(S=this._textureRoughness)===null||S===void 0?void 0:S.level)!==null&&_!==void 0?_:0),this._texture&&h.BindTextureMatrix(this._texture,e,"clearCoat"),this._textureRoughness&&!P&&!m.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE&&h.BindTextureMatrix(this._textureRoughness,e,"clearCoatRoughness")),this._bumpTexture&&i.getCaps().standardDerivatives&&c.ClearCoatTextureEnabled&&!T&&(e.updateFloat2("vClearCoatBumpInfos",this._bumpTexture.coordinatesIndex,this._bumpTexture.level),h.BindTextureMatrix(this._bumpTexture,e,"clearCoatBump"),t._mirroredCameraPosition?e.updateFloat2("vClearCoatTangentSpaceParams",g?1:-1,b?1:-1):e.updateFloat2("vClearCoatTangentSpaceParams",g?-1:1,b?-1:1)),this._tintTexture&&c.ClearCoatTintTextureEnabled&&(e.updateFloat2("vClearCoatTintInfos",this._tintTexture.coordinatesIndex,this._tintTexture.level),h.BindTextureMatrix(this._tintTexture,e,"clearCoatTint")),e.updateFloat2("vClearCoatParams",this.intensity,this.roughness);const B=1-this._indexOfRefraction,U=1+this._indexOfRefraction,re=Math.pow(-B/U,2),G=1/this._indexOfRefraction;e.updateFloat4("vClearCoatRefractionParams",re,G,B,U),this._isTintEnabled&&(e.updateFloat4("vClearCoatTintParams",this.tintColor.r,this.tintColor.g,this.tintColor.b,Math.max(1e-5,this.tintThickness)),e.updateFloat("clearCoatColorAtDistance",Math.max(1e-5,this.tintColorAtDistance)))}t.texturesEnabled&&(this._texture&&c.ClearCoatTextureEnabled&&e.setTexture("clearCoatSampler",this._texture),this._textureRoughness&&!P&&!m.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE&&c.ClearCoatTextureEnabled&&e.setTexture("clearCoatRoughnessSampler",this._textureRoughness),this._bumpTexture&&i.getCaps().standardDerivatives&&c.ClearCoatBumpTextureEnabled&&!T&&e.setTexture("clearCoatBumpSampler",this._bumpTexture),this._isTintEnabled&&this._tintTexture&&c.ClearCoatTintTextureEnabled&&e.setTexture("clearCoatTintSampler",this._tintTexture))}hasTexture(e){return this._texture===e||this._textureRoughness===e||this._bumpTexture===e||this._tintTexture===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._textureRoughness&&e.push(this._textureRoughness),this._bumpTexture&&e.push(this._bumpTexture),this._tintTexture&&e.push(this._tintTexture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._textureRoughness&&this._textureRoughness.animations&&this._textureRoughness.animations.length>0&&e.push(this._textureRoughness),this._bumpTexture&&this._bumpTexture.animations&&this._bumpTexture.animations.length>0&&e.push(this._bumpTexture),this._tintTexture&&this._tintTexture.animations&&this._tintTexture.animations.length>0&&e.push(this._tintTexture)}dispose(e){var t,i,o,d;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._textureRoughness)===null||i===void 0||i.dispose(),(o=this._bumpTexture)===null||o===void 0||o.dispose(),(d=this._tintTexture)===null||d===void 0||d.dispose())}getClassName(){return"PBRClearCoatConfiguration"}addFallbacks(e,t,i){return e.CLEARCOAT_BUMP&&t.addFallback(i++,"CLEARCOAT_BUMP"),e.CLEARCOAT_TINT&&t.addFallback(i++,"CLEARCOAT_TINT"),e.CLEARCOAT&&t.addFallback(i++,"CLEARCOAT"),i}getSamplers(e){e.push("clearCoatSampler","clearCoatRoughnessSampler","clearCoatBumpSampler","clearCoatTintSampler")}getUniforms(){return{ubo:[{name:"vClearCoatParams",size:2,type:"vec2"},{name:"vClearCoatRefractionParams",size:4,type:"vec4"},{name:"vClearCoatInfos",size:4,type:"vec4"},{name:"clearCoatMatrix",size:16,type:"mat4"},{name:"clearCoatRoughnessMatrix",size:16,type:"mat4"},{name:"vClearCoatBumpInfos",size:2,type:"vec2"},{name:"vClearCoatTangentSpaceParams",size:2,type:"vec2"},{name:"clearCoatBumpMatrix",size:16,type:"mat4"},{name:"vClearCoatTintParams",size:4,type:"vec4"},{name:"clearCoatColorAtDistance",size:1,type:"float"},{name:"vClearCoatTintInfos",size:2,type:"vec2"},{name:"clearCoatTintMatrix",size:16,type:"mat4"}]}}}D._DefaultIndexOfRefraction=1.5;a([f(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"isEnabled",void 0);a([f()],D.prototype,"intensity",void 0);a([f()],D.prototype,"roughness",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"indexOfRefraction",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"texture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"useRoughnessFromMainTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"textureRoughness",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"remapF0OnInterfaceChange",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"bumpTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"isTintEnabled",void 0);a([X()],D.prototype,"tintColor",void 0);a([f()],D.prototype,"tintColorAtDistance",void 0);a([f()],D.prototype,"tintThickness",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],D.prototype,"tintTexture",void 0);class Ni extends K{constructor(){super(...arguments),this.IRIDESCENCE=!1,this.IRIDESCENCE_TEXTURE=!1,this.IRIDESCENCE_TEXTUREDIRECTUV=0,this.IRIDESCENCE_THICKNESS_TEXTURE=!1,this.IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV=0,this.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=!1}}class y extends Z{_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}constructor(e,t=!0){super(e,"PBRIridescence",110,new Ni,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.minimumThickness=y._DefaultMinimumThickness,this.maximumThickness=y._DefaultMaximumThickness,this.indexOfRefraction=y._DefaultIndexOfRefraction,this._texture=null,this.texture=null,this._thicknessTexture=null,this.thicknessTexture=null,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.IridescenceTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._thicknessTexture&&c.IridescenceTextureEnabled&&!this._thicknessTexture.isReadyOrNotBlocking())):!0}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.IRIDESCENCE=!0,e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=this._texture!==null&&this._texture._texture===((i=this._thicknessTexture)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._thicknessTexture),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.IridescenceTextureEnabled?h.PrepareDefinesForMergedUV(this._texture,e,"IRIDESCENCE_TEXTURE"):e.IRIDESCENCE_TEXTURE=!1,!e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&this._thicknessTexture&&c.IridescenceTextureEnabled?h.PrepareDefinesForMergedUV(this._thicknessTexture,e,"IRIDESCENCE_THICKNESS_TEXTURE"):e.IRIDESCENCE_THICKNESS_TEXTURE=!1)):(e.IRIDESCENCE=!1,e.IRIDESCENCE_TEXTURE=!1,e.IRIDESCENCE_THICKNESS_TEXTURE=!1,e.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE=!1,e.IRIDESCENCE_TEXTUREDIRECTUV=0,e.IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV=0)}bindForSubMesh(e,t,i,o){var d,s,I,R,A,l,S,_;if(!this._isEnabled)return;const m=o.materialDefines,r=this._material.isFrozen,T=m.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE;(!e.useUbo||!r||!e.isSync)&&(T&&c.IridescenceTextureEnabled?(e.updateFloat4("vIridescenceInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),h.BindTextureMatrix(this._texture,e,"iridescence")):(this._texture||this._thicknessTexture)&&c.IridescenceTextureEnabled&&(e.updateFloat4("vIridescenceInfos",(s=(d=this._texture)===null||d===void 0?void 0:d.coordinatesIndex)!==null&&s!==void 0?s:0,(R=(I=this._texture)===null||I===void 0?void 0:I.level)!==null&&R!==void 0?R:0,(l=(A=this._thicknessTexture)===null||A===void 0?void 0:A.coordinatesIndex)!==null&&l!==void 0?l:0,(_=(S=this._thicknessTexture)===null||S===void 0?void 0:S.level)!==null&&_!==void 0?_:0),this._texture&&h.BindTextureMatrix(this._texture,e,"iridescence"),this._thicknessTexture&&!T&&!m.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&h.BindTextureMatrix(this._thicknessTexture,e,"iridescenceThickness")),e.updateFloat4("vIridescenceParams",this.intensity,this.indexOfRefraction,this.minimumThickness,this.maximumThickness)),t.texturesEnabled&&(this._texture&&c.IridescenceTextureEnabled&&e.setTexture("iridescenceSampler",this._texture),this._thicknessTexture&&!T&&!m.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE&&c.IridescenceTextureEnabled&&e.setTexture("iridescenceThicknessSampler",this._thicknessTexture))}hasTexture(e){return this._texture===e||this._thicknessTexture===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._thicknessTexture&&e.push(this._thicknessTexture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._thicknessTexture&&this._thicknessTexture.animations&&this._thicknessTexture.animations.length>0&&e.push(this._thicknessTexture)}dispose(e){var t,i;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._thicknessTexture)===null||i===void 0||i.dispose())}getClassName(){return"PBRIridescenceConfiguration"}addFallbacks(e,t,i){return e.IRIDESCENCE&&t.addFallback(i++,"IRIDESCENCE"),i}getSamplers(e){e.push("iridescenceSampler","iridescenceThicknessSampler")}getUniforms(){return{ubo:[{name:"vIridescenceParams",size:4,type:"vec4"},{name:"vIridescenceInfos",size:4,type:"vec4"},{name:"iridescenceMatrix",size:16,type:"mat4"},{name:"iridescenceThicknessMatrix",size:16,type:"mat4"}]}}}y._DefaultMinimumThickness=100;y._DefaultMaximumThickness=400;y._DefaultIndexOfRefraction=1.3;a([f(),n("_markAllSubMeshesAsTexturesDirty")],y.prototype,"isEnabled",void 0);a([f()],y.prototype,"intensity",void 0);a([f()],y.prototype,"minimumThickness",void 0);a([f()],y.prototype,"maximumThickness",void 0);a([f()],y.prototype,"indexOfRefraction",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],y.prototype,"texture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],y.prototype,"thicknessTexture",void 0);class vi extends K{constructor(){super(...arguments),this.ANISOTROPIC=!1,this.ANISOTROPIC_TEXTURE=!1,this.ANISOTROPIC_TEXTUREDIRECTUV=0,this.ANISOTROPIC_LEGACY=!1,this.MAINUV1=!1}}class j extends Z{set angle(e){this.direction.x=Math.cos(e),this.direction.y=Math.sin(e)}get angle(){return Math.atan2(this.direction.y,this.direction.x)}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}_markAllSubMeshesAsMiscDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsMiscDirty()}constructor(e,t=!0){super(e,"PBRAnisotropic",110,new vi,t),this._isEnabled=!1,this.isEnabled=!1,this.intensity=1,this.direction=new Oe(1,0),this._texture=null,this.texture=null,this._legacy=!1,this.legacy=!1,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1],this._internalMarkAllSubMeshesAsMiscDirty=e._dirtyCallbacks[16]}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&this._texture&&c.AnisotropicTextureEnabled&&!this._texture.isReadyOrNotBlocking()):!0}prepareDefinesBeforeAttributes(e,t,i){this._isEnabled?(e.ANISOTROPIC=this._isEnabled,this._isEnabled&&!i.isVerticesDataPresent(Q.TangentKind)&&(e._needUVs=!0,e.MAINUV1=!0),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.AnisotropicTextureEnabled?h.PrepareDefinesForMergedUV(this._texture,e,"ANISOTROPIC_TEXTURE"):e.ANISOTROPIC_TEXTURE=!1),e._areMiscDirty&&(e.ANISOTROPIC_LEGACY=this._legacy)):(e.ANISOTROPIC=!1,e.ANISOTROPIC_TEXTURE=!1,e.ANISOTROPIC_TEXTUREDIRECTUV=0,e.ANISOTROPIC_LEGACY=!1)}bindForSubMesh(e,t){if(!this._isEnabled)return;const i=this._material.isFrozen;(!e.useUbo||!i||!e.isSync)&&(this._texture&&c.AnisotropicTextureEnabled&&(e.updateFloat2("vAnisotropyInfos",this._texture.coordinatesIndex,this._texture.level),h.BindTextureMatrix(this._texture,e,"anisotropy")),e.updateFloat3("vAnisotropy",this.direction.x,this.direction.y,this.intensity)),t.texturesEnabled&&this._texture&&c.AnisotropicTextureEnabled&&e.setTexture("anisotropySampler",this._texture)}hasTexture(e){return this._texture===e}getActiveTextures(e){this._texture&&e.push(this._texture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture)}dispose(e){e&&this._texture&&this._texture.dispose()}getClassName(){return"PBRAnisotropicConfiguration"}addFallbacks(e,t,i){return e.ANISOTROPIC&&t.addFallback(i++,"ANISOTROPIC"),i}getSamplers(e){e.push("anisotropySampler")}getUniforms(){return{ubo:[{name:"vAnisotropy",size:3,type:"vec3"},{name:"vAnisotropyInfos",size:2,type:"vec2"},{name:"anisotropyMatrix",size:16,type:"mat4"}]}}parse(e,t,i){super.parse(e,t,i),e.legacy===void 0&&(this.legacy=!0)}}a([f(),n("_markAllSubMeshesAsTexturesDirty")],j.prototype,"isEnabled",void 0);a([f()],j.prototype,"intensity",void 0);a([Me()],j.prototype,"direction",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],j.prototype,"texture",void 0);a([f(),n("_markAllSubMeshesAsMiscDirty")],j.prototype,"legacy",void 0);class gi extends K{constructor(){super(...arguments),this.SHEEN=!1,this.SHEEN_TEXTURE=!1,this.SHEEN_GAMMATEXTURE=!1,this.SHEEN_TEXTURE_ROUGHNESS=!1,this.SHEEN_TEXTUREDIRECTUV=0,this.SHEEN_TEXTURE_ROUGHNESSDIRECTUV=0,this.SHEEN_LINKWITHALBEDO=!1,this.SHEEN_ROUGHNESS=!1,this.SHEEN_ALBEDOSCALING=!1,this.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,this.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=!1}}class w extends Z{_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}constructor(e,t=!0){super(e,"Sheen",120,new gi,t),this._isEnabled=!1,this.isEnabled=!1,this._linkSheenWithAlbedo=!1,this.linkSheenWithAlbedo=!1,this.intensity=1,this.color=F.White(),this._texture=null,this.texture=null,this._useRoughnessFromMainTexture=!0,this.useRoughnessFromMainTexture=!0,this._roughness=null,this.roughness=null,this._textureRoughness=null,this.textureRoughness=null,this._albedoScaling=!1,this.albedoScaling=!1,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}isReadyForSubMesh(e,t){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.SheenTextureEnabled&&!this._texture.isReadyOrNotBlocking()||this._textureRoughness&&c.SheenTextureEnabled&&!this._textureRoughness.isReadyOrNotBlocking())):!0}prepareDefinesBeforeAttributes(e,t){var i;this._isEnabled?(e.SHEEN=!0,e.SHEEN_LINKWITHALBEDO=this._linkSheenWithAlbedo,e.SHEEN_ROUGHNESS=this._roughness!==null,e.SHEEN_ALBEDOSCALING=this._albedoScaling,e.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=this._useRoughnessFromMainTexture,e.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=this._texture!==null&&this._texture._texture===((i=this._textureRoughness)===null||i===void 0?void 0:i._texture)&&this._texture.checkTransformsAreIdentical(this._textureRoughness),e._areTexturesDirty&&t.texturesEnabled&&(this._texture&&c.SheenTextureEnabled?(h.PrepareDefinesForMergedUV(this._texture,e,"SHEEN_TEXTURE"),e.SHEEN_GAMMATEXTURE=this._texture.gammaSpace):e.SHEEN_TEXTURE=!1,this._textureRoughness&&c.SheenTextureEnabled?h.PrepareDefinesForMergedUV(this._textureRoughness,e,"SHEEN_TEXTURE_ROUGHNESS"):e.SHEEN_TEXTURE_ROUGHNESS=!1)):(e.SHEEN=!1,e.SHEEN_TEXTURE=!1,e.SHEEN_TEXTURE_ROUGHNESS=!1,e.SHEEN_LINKWITHALBEDO=!1,e.SHEEN_ROUGHNESS=!1,e.SHEEN_ALBEDOSCALING=!1,e.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE=!1,e.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL=!1,e.SHEEN_GAMMATEXTURE=!1,e.SHEEN_TEXTUREDIRECTUV=0,e.SHEEN_TEXTURE_ROUGHNESSDIRECTUV=0)}bindForSubMesh(e,t,i,o){var d,s,I,R,A,l,S,_;if(!this._isEnabled)return;const m=o.materialDefines,r=this._material.isFrozen,T=m.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL;(!e.useUbo||!r||!e.isSync)&&(T&&c.SheenTextureEnabled?(e.updateFloat4("vSheenInfos",this._texture.coordinatesIndex,this._texture.level,-1,-1),h.BindTextureMatrix(this._texture,e,"sheen")):(this._texture||this._textureRoughness)&&c.SheenTextureEnabled&&(e.updateFloat4("vSheenInfos",(s=(d=this._texture)===null||d===void 0?void 0:d.coordinatesIndex)!==null&&s!==void 0?s:0,(R=(I=this._texture)===null||I===void 0?void 0:I.level)!==null&&R!==void 0?R:0,(l=(A=this._textureRoughness)===null||A===void 0?void 0:A.coordinatesIndex)!==null&&l!==void 0?l:0,(_=(S=this._textureRoughness)===null||S===void 0?void 0:S.level)!==null&&_!==void 0?_:0),this._texture&&h.BindTextureMatrix(this._texture,e,"sheen"),this._textureRoughness&&!T&&!m.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE&&h.BindTextureMatrix(this._textureRoughness,e,"sheenRoughness")),e.updateFloat4("vSheenColor",this.color.r,this.color.g,this.color.b,this.intensity),this._roughness!==null&&e.updateFloat("vSheenRoughness",this._roughness)),t.texturesEnabled&&(this._texture&&c.SheenTextureEnabled&&e.setTexture("sheenSampler",this._texture),this._textureRoughness&&!T&&!m.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE&&c.SheenTextureEnabled&&e.setTexture("sheenRoughnessSampler",this._textureRoughness))}hasTexture(e){return this._texture===e||this._textureRoughness===e}getActiveTextures(e){this._texture&&e.push(this._texture),this._textureRoughness&&e.push(this._textureRoughness)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture),this._textureRoughness&&this._textureRoughness.animations&&this._textureRoughness.animations.length>0&&e.push(this._textureRoughness)}dispose(e){var t,i;e&&((t=this._texture)===null||t===void 0||t.dispose(),(i=this._textureRoughness)===null||i===void 0||i.dispose())}getClassName(){return"PBRSheenConfiguration"}addFallbacks(e,t,i){return e.SHEEN&&t.addFallback(i++,"SHEEN"),i}getSamplers(e){e.push("sheenSampler","sheenRoughnessSampler")}getUniforms(){return{ubo:[{name:"vSheenColor",size:4,type:"vec4"},{name:"vSheenRoughness",size:1,type:"float"},{name:"vSheenInfos",size:4,type:"vec4"},{name:"sheenMatrix",size:16,type:"mat4"},{name:"sheenRoughnessMatrix",size:16,type:"mat4"}]}}}a([f(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"isEnabled",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"linkSheenWithAlbedo",void 0);a([f()],w.prototype,"intensity",void 0);a([X()],w.prototype,"color",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"texture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"useRoughnessFromMainTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"roughness",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"textureRoughness",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],w.prototype,"albedoScaling",void 0);class Mi extends K{constructor(){super(...arguments),this.SUBSURFACE=!1,this.SS_REFRACTION=!1,this.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,this.SS_TRANSLUCENCY=!1,this.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,this.SS_SCATTERING=!1,this.SS_THICKNESSANDMASK_TEXTURE=!1,this.SS_THICKNESSANDMASK_TEXTUREDIRECTUV=0,this.SS_HAS_THICKNESS=!1,this.SS_REFRACTIONINTENSITY_TEXTURE=!1,this.SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV=0,this.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,this.SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV=0,this.SS_REFRACTIONMAP_3D=!1,this.SS_REFRACTIONMAP_OPPOSITEZ=!1,this.SS_LODINREFRACTIONALPHA=!1,this.SS_GAMMAREFRACTION=!1,this.SS_RGBDREFRACTION=!1,this.SS_LINEARSPECULARREFRACTION=!1,this.SS_LINKREFRACTIONTOTRANSPARENCY=!1,this.SS_ALBEDOFORREFRACTIONTINT=!1,this.SS_ALBEDOFORTRANSLUCENCYTINT=!1,this.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,this.SS_USE_THICKNESS_AS_DEPTH=!1,this.SS_MASK_FROM_THICKNESS_TEXTURE=!1,this.SS_USE_GLTF_TEXTURES=!1}}class M extends Z{get scatteringDiffusionProfile(){return this._scene.subSurfaceConfiguration?this._scene.subSurfaceConfiguration.ssDiffusionProfileColors[this._scatteringDiffusionProfileIndex]:null}set scatteringDiffusionProfile(e){this._scene.enableSubSurfaceForPrePass()&&e&&(this._scatteringDiffusionProfileIndex=this._scene.subSurfaceConfiguration.addDiffusionProfile(e))}get volumeIndexOfRefraction(){return this._volumeIndexOfRefraction>=1?this._volumeIndexOfRefraction:this._indexOfRefraction}set volumeIndexOfRefraction(e){e>=1?this._volumeIndexOfRefraction=e:this._volumeIndexOfRefraction=-1}_markAllSubMeshesAsTexturesDirty(){this._enable(this._isRefractionEnabled||this._isTranslucencyEnabled||this._isScatteringEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}_markScenePrePassDirty(){this._internalMarkAllSubMeshesAsTexturesDirty(),this._internalMarkScenePrePassDirty()}constructor(e,t=!0){super(e,"PBRSubSurface",130,new Mi,t),this._isRefractionEnabled=!1,this.isRefractionEnabled=!1,this._isTranslucencyEnabled=!1,this.isTranslucencyEnabled=!1,this._isScatteringEnabled=!1,this.isScatteringEnabled=!1,this._scatteringDiffusionProfileIndex=0,this.refractionIntensity=1,this.translucencyIntensity=1,this.useAlbedoToTintRefraction=!1,this.useAlbedoToTintTranslucency=!1,this._thicknessTexture=null,this.thicknessTexture=null,this._refractionTexture=null,this.refractionTexture=null,this._indexOfRefraction=1.5,this.indexOfRefraction=1.5,this._volumeIndexOfRefraction=-1,this._invertRefractionY=!1,this.invertRefractionY=!1,this._linkRefractionWithTransparency=!1,this.linkRefractionWithTransparency=!1,this.minimumThickness=0,this.maximumThickness=1,this.useThicknessAsDepth=!1,this.tintColor=F.White(),this.tintColorAtDistance=1,this.diffusionDistance=F.White(),this._useMaskFromThicknessTexture=!1,this.useMaskFromThicknessTexture=!1,this._refractionIntensityTexture=null,this.refractionIntensityTexture=null,this._translucencyIntensityTexture=null,this.translucencyIntensityTexture=null,this._useGltfStyleTextures=!1,this.useGltfStyleTextures=!1,this._scene=e.getScene(),this.registerForExtraEvents=!0,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1],this._internalMarkScenePrePassDirty=e._dirtyCallbacks[32]}isReadyForSubMesh(e,t){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return!0;if(e._areTexturesDirty&&t.texturesEnabled){if(this._thicknessTexture&&c.ThicknessTextureEnabled&&!this._thicknessTexture.isReadyOrNotBlocking())return!1;const i=this._getRefractionTexture(t);if(i&&c.RefractionTextureEnabled&&!i.isReadyOrNotBlocking())return!1}return!0}prepareDefinesBeforeAttributes(e,t){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled){e.SUBSURFACE=!1,e.SS_TRANSLUCENCY=!1,e.SS_SCATTERING=!1,e.SS_REFRACTION=!1,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_THICKNESSANDMASK_TEXTURE=!1,e.SS_THICKNESSANDMASK_TEXTUREDIRECTUV=0,e.SS_HAS_THICKNESS=!1,e.SS_REFRACTIONINTENSITY_TEXTURE=!1,e.SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV=0,e.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,e.SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV=0,e.SS_REFRACTIONMAP_3D=!1,e.SS_REFRACTIONMAP_OPPOSITEZ=!1,e.SS_LODINREFRACTIONALPHA=!1,e.SS_GAMMAREFRACTION=!1,e.SS_RGBDREFRACTION=!1,e.SS_LINEARSPECULARREFRACTION=!1,e.SS_LINKREFRACTIONTOTRANSPARENCY=!1,e.SS_ALBEDOFORREFRACTIONTINT=!1,e.SS_ALBEDOFORTRANSLUCENCYTINT=!1,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,e.SS_USE_THICKNESS_AS_DEPTH=!1,e.SS_MASK_FROM_THICKNESS_TEXTURE=!1,e.SS_USE_GLTF_TEXTURES=!1;return}if(e._areTexturesDirty){e.SUBSURFACE=!0,e.SS_TRANSLUCENCY=this._isTranslucencyEnabled,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_SCATTERING=this._isScatteringEnabled,e.SS_THICKNESSANDMASK_TEXTURE=!1,e.SS_REFRACTIONINTENSITY_TEXTURE=!1,e.SS_TRANSLUCENCYINTENSITY_TEXTURE=!1,e.SS_HAS_THICKNESS=!1,e.SS_MASK_FROM_THICKNESS_TEXTURE=!1,e.SS_USE_GLTF_TEXTURES=!1,e.SS_REFRACTION=!1,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=!1,e.SS_REFRACTIONMAP_3D=!1,e.SS_GAMMAREFRACTION=!1,e.SS_RGBDREFRACTION=!1,e.SS_LINEARSPECULARREFRACTION=!1,e.SS_REFRACTIONMAP_OPPOSITEZ=!1,e.SS_LODINREFRACTIONALPHA=!1,e.SS_LINKREFRACTIONTOTRANSPARENCY=!1,e.SS_ALBEDOFORREFRACTIONTINT=!1,e.SS_ALBEDOFORTRANSLUCENCYTINT=!1,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=!1,e.SS_USE_THICKNESS_AS_DEPTH=!1;const i=!!this._thicknessTexture&&!!this._refractionIntensityTexture&&this._refractionIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture)&&this._refractionIntensityTexture._texture===this._thicknessTexture._texture,o=!!this._thicknessTexture&&!!this._translucencyIntensityTexture&&this._translucencyIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture)&&this._translucencyIntensityTexture._texture===this._thicknessTexture._texture,d=(i||!this._refractionIntensityTexture)&&(o||!this._translucencyIntensityTexture);if(e._areTexturesDirty&&t.texturesEnabled&&(this._thicknessTexture&&c.ThicknessTextureEnabled&&h.PrepareDefinesForMergedUV(this._thicknessTexture,e,"SS_THICKNESSANDMASK_TEXTURE"),this._refractionIntensityTexture&&c.RefractionIntensityTextureEnabled&&!d&&h.PrepareDefinesForMergedUV(this._refractionIntensityTexture,e,"SS_REFRACTIONINTENSITY_TEXTURE"),this._translucencyIntensityTexture&&c.TranslucencyIntensityTextureEnabled&&!d&&h.PrepareDefinesForMergedUV(this._translucencyIntensityTexture,e,"SS_TRANSLUCENCYINTENSITY_TEXTURE")),e.SS_HAS_THICKNESS=this.maximumThickness-this.minimumThickness!==0,e.SS_MASK_FROM_THICKNESS_TEXTURE=(this._useMaskFromThicknessTexture||!!this._refractionIntensityTexture||!!this._translucencyIntensityTexture)&&d,e.SS_USE_GLTF_TEXTURES=this._useGltfStyleTextures,e.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE=(this._useMaskFromThicknessTexture||!!this._refractionIntensityTexture)&&d,e.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE=(this._useMaskFromThicknessTexture||!!this._translucencyIntensityTexture)&&d,this._isRefractionEnabled&&t.texturesEnabled){const s=this._getRefractionTexture(t);s&&c.RefractionTextureEnabled&&(e.SS_REFRACTION=!0,e.SS_REFRACTIONMAP_3D=s.isCube,e.SS_GAMMAREFRACTION=s.gammaSpace,e.SS_RGBDREFRACTION=s.isRGBD,e.SS_LINEARSPECULARREFRACTION=s.linearSpecularLOD,e.SS_REFRACTIONMAP_OPPOSITEZ=this._scene.useRightHandedSystem&&s.isCube?!s.invertZ:s.invertZ,e.SS_LODINREFRACTIONALPHA=s.lodLevelInAlpha,e.SS_LINKREFRACTIONTOTRANSPARENCY=this._linkRefractionWithTransparency,e.SS_ALBEDOFORREFRACTIONTINT=this.useAlbedoToTintRefraction,e.SS_USE_LOCAL_REFRACTIONMAP_CUBIC=s.isCube&&s.boundingBoxSize,e.SS_USE_THICKNESS_AS_DEPTH=this.useThicknessAsDepth)}this._isTranslucencyEnabled&&(e.SS_ALBEDOFORTRANSLUCENCYTINT=this.useAlbedoToTintTranslucency)}}hardBindForSubMesh(e,t,i,o){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return;o.getRenderingMesh().getWorldMatrix().decompose(N.Vector3[0]);const d=Math.max(Math.abs(N.Vector3[0].x),Math.abs(N.Vector3[0].y),Math.abs(N.Vector3[0].z));e.updateFloat2("vThicknessParam",this.minimumThickness*d,(this.maximumThickness-this.minimumThickness)*d)}bindForSubMesh(e,t,i,o){if(!this._isRefractionEnabled&&!this._isTranslucencyEnabled&&!this._isScatteringEnabled)return;const d=o.materialDefines,s=this._material.isFrozen,I=this._material.realTimeFiltering,R=d.LODBASEDMICROSFURACE,A=this._getRefractionTexture(t);if(!e.useUbo||!s||!e.isSync){if(this._thicknessTexture&&c.ThicknessTextureEnabled&&(e.updateFloat2("vThicknessInfos",this._thicknessTexture.coordinatesIndex,this._thicknessTexture.level),h.BindTextureMatrix(this._thicknessTexture,e,"thickness")),this._refractionIntensityTexture&&c.RefractionIntensityTextureEnabled&&d.SS_REFRACTIONINTENSITY_TEXTURE&&(e.updateFloat2("vRefractionIntensityInfos",this._refractionIntensityTexture.coordinatesIndex,this._refractionIntensityTexture.level),h.BindTextureMatrix(this._refractionIntensityTexture,e,"refractionIntensity")),this._translucencyIntensityTexture&&c.TranslucencyIntensityTextureEnabled&&d.SS_TRANSLUCENCYINTENSITY_TEXTURE&&(e.updateFloat2("vTranslucencyIntensityInfos",this._translucencyIntensityTexture.coordinatesIndex,this._translucencyIntensityTexture.level),h.BindTextureMatrix(this._translucencyIntensityTexture,e,"translucencyIntensity")),A&&c.RefractionTextureEnabled){e.updateMatrix("refractionMatrix",A.getRefractionTextureMatrix());let l=1;A.isCube||A.depth&&(l=A.depth);const S=A.getSize().width,_=this.volumeIndexOfRefraction;if(e.updateFloat4("vRefractionInfos",A.level,1/_,l,this._invertRefractionY?-1:1),e.updateFloat4("vRefractionMicrosurfaceInfos",S,A.lodGenerationScale,A.lodGenerationOffset,1/this.indexOfRefraction),I&&e.updateFloat2("vRefractionFilteringInfo",S,W.Log2(S)),A.boundingBoxSize){const m=A;e.updateVector3("vRefractionPosition",m.boundingBoxPosition),e.updateVector3("vRefractionSize",m.boundingBoxSize)}}this._isScatteringEnabled&&e.updateFloat("scatteringDiffusionProfile",this._scatteringDiffusionProfileIndex),e.updateColor3("vDiffusionDistance",this.diffusionDistance),e.updateFloat4("vTintColor",this.tintColor.r,this.tintColor.g,this.tintColor.b,Math.max(1e-5,this.tintColorAtDistance)),e.updateFloat3("vSubSurfaceIntensity",this.refractionIntensity,this.translucencyIntensity,0)}t.texturesEnabled&&(this._thicknessTexture&&c.ThicknessTextureEnabled&&e.setTexture("thicknessSampler",this._thicknessTexture),this._refractionIntensityTexture&&c.RefractionIntensityTextureEnabled&&d.SS_REFRACTIONINTENSITY_TEXTURE&&e.setTexture("refractionIntensitySampler",this._refractionIntensityTexture),this._translucencyIntensityTexture&&c.TranslucencyIntensityTextureEnabled&&d.SS_TRANSLUCENCYINTENSITY_TEXTURE&&e.setTexture("translucencyIntensitySampler",this._translucencyIntensityTexture),A&&c.RefractionTextureEnabled&&(R?e.setTexture("refractionSampler",A):(e.setTexture("refractionSampler",A._lodTextureMid||A),e.setTexture("refractionSamplerLow",A._lodTextureLow||A),e.setTexture("refractionSamplerHigh",A._lodTextureHigh||A))))}_getRefractionTexture(e){return this._refractionTexture?this._refractionTexture:this._isRefractionEnabled?e.environmentTexture:null}get disableAlphaBlending(){return this._isRefractionEnabled&&this._linkRefractionWithTransparency}fillRenderTargetTextures(e){c.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget&&e.push(this._refractionTexture)}hasTexture(e){return this._thicknessTexture===e||this._refractionTexture===e}hasRenderTargetTextures(){return!!(c.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget)}getActiveTextures(e){this._thicknessTexture&&e.push(this._thicknessTexture),this._refractionTexture&&e.push(this._refractionTexture)}getAnimatables(e){this._thicknessTexture&&this._thicknessTexture.animations&&this._thicknessTexture.animations.length>0&&e.push(this._thicknessTexture),this._refractionTexture&&this._refractionTexture.animations&&this._refractionTexture.animations.length>0&&e.push(this._refractionTexture)}dispose(e){e&&(this._thicknessTexture&&this._thicknessTexture.dispose(),this._refractionTexture&&this._refractionTexture.dispose())}getClassName(){return"PBRSubSurfaceConfiguration"}addFallbacks(e,t,i){return e.SS_SCATTERING&&t.addFallback(i++,"SS_SCATTERING"),e.SS_TRANSLUCENCY&&t.addFallback(i++,"SS_TRANSLUCENCY"),i}getSamplers(e){e.push("thicknessSampler","refractionIntensitySampler","translucencyIntensitySampler","refractionSampler","refractionSamplerLow","refractionSamplerHigh")}getUniforms(){return{ubo:[{name:"vRefractionMicrosurfaceInfos",size:4,type:"vec4"},{name:"vRefractionFilteringInfo",size:2,type:"vec2"},{name:"vTranslucencyIntensityInfos",size:2,type:"vec2"},{name:"vRefractionInfos",size:4,type:"vec4"},{name:"refractionMatrix",size:16,type:"mat4"},{name:"vThicknessInfos",size:2,type:"vec2"},{name:"vRefractionIntensityInfos",size:2,type:"vec2"},{name:"thicknessMatrix",size:16,type:"mat4"},{name:"refractionIntensityMatrix",size:16,type:"mat4"},{name:"translucencyIntensityMatrix",size:16,type:"mat4"},{name:"vThicknessParam",size:2,type:"vec2"},{name:"vDiffusionDistance",size:3,type:"vec3"},{name:"vTintColor",size:4,type:"vec4"},{name:"vSubSurfaceIntensity",size:3,type:"vec3"},{name:"vRefractionPosition",size:3,type:"vec3"},{name:"vRefractionSize",size:3,type:"vec3"},{name:"scatteringDiffusionProfile",size:1,type:"float"}]}}}a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"isRefractionEnabled",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"isTranslucencyEnabled",void 0);a([f(),n("_markScenePrePassDirty")],M.prototype,"isScatteringEnabled",void 0);a([f()],M.prototype,"_scatteringDiffusionProfileIndex",void 0);a([f()],M.prototype,"refractionIntensity",void 0);a([f()],M.prototype,"translucencyIntensity",void 0);a([f()],M.prototype,"useAlbedoToTintRefraction",void 0);a([f()],M.prototype,"useAlbedoToTintTranslucency",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"thicknessTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"refractionTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"indexOfRefraction",void 0);a([f()],M.prototype,"_volumeIndexOfRefraction",void 0);a([n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"volumeIndexOfRefraction",null);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"invertRefractionY",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"linkRefractionWithTransparency",void 0);a([f()],M.prototype,"minimumThickness",void 0);a([f()],M.prototype,"maximumThickness",void 0);a([f()],M.prototype,"useThicknessAsDepth",void 0);a([X()],M.prototype,"tintColor",void 0);a([f()],M.prototype,"tintColorAtDistance",void 0);a([X()],M.prototype,"diffusionDistance",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"useMaskFromThicknessTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"refractionIntensityTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"translucencyIntensityTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],M.prototype,"useGltfStyleTextures",void 0);const J={effect:null,subMesh:null};class Ce extends K{constructor(e){super(e),this.PBR=!0,this.NUM_SAMPLES="0",this.REALTIME_FILTERING=!1,this.MAINUV1=!1,this.MAINUV2=!1,this.MAINUV3=!1,this.MAINUV4=!1,this.MAINUV5=!1,this.MAINUV6=!1,this.UV1=!1,this.UV2=!1,this.UV3=!1,this.UV4=!1,this.UV5=!1,this.UV6=!1,this.ALBEDO=!1,this.GAMMAALBEDO=!1,this.ALBEDODIRECTUV=0,this.VERTEXCOLOR=!1,this.BAKED_VERTEX_ANIMATION_TEXTURE=!1,this.AMBIENT=!1,this.AMBIENTDIRECTUV=0,this.AMBIENTINGRAYSCALE=!1,this.OPACITY=!1,this.VERTEXALPHA=!1,this.OPACITYDIRECTUV=0,this.OPACITYRGB=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.ALPHABLEND=!1,this.ALPHAFROMALBEDO=!1,this.ALPHATESTVALUE="0.5",this.SPECULAROVERALPHA=!1,this.RADIANCEOVERALPHA=!1,this.ALPHAFRESNEL=!1,this.LINEARALPHAFRESNEL=!1,this.PREMULTIPLYALPHA=!1,this.EMISSIVE=!1,this.EMISSIVEDIRECTUV=0,this.GAMMAEMISSIVE=!1,this.REFLECTIVITY=!1,this.REFLECTIVITY_GAMMA=!1,this.REFLECTIVITYDIRECTUV=0,this.SPECULARTERM=!1,this.MICROSURFACEFROMREFLECTIVITYMAP=!1,this.MICROSURFACEAUTOMATIC=!1,this.LODBASEDMICROSFURACE=!1,this.MICROSURFACEMAP=!1,this.MICROSURFACEMAPDIRECTUV=0,this.METALLICWORKFLOW=!1,this.ROUGHNESSSTOREINMETALMAPALPHA=!1,this.ROUGHNESSSTOREINMETALMAPGREEN=!1,this.METALLNESSSTOREINMETALMAPBLUE=!1,this.AOSTOREINMETALMAPRED=!1,this.METALLIC_REFLECTANCE=!1,this.METALLIC_REFLECTANCE_GAMMA=!1,this.METALLIC_REFLECTANCEDIRECTUV=0,this.METALLIC_REFLECTANCE_USE_ALPHA_ONLY=!1,this.REFLECTANCE=!1,this.REFLECTANCE_GAMMA=!1,this.REFLECTANCEDIRECTUV=0,this.ENVIRONMENTBRDF=!1,this.ENVIRONMENTBRDF_RGBD=!1,this.NORMAL=!1,this.TANGENT=!1,this.BUMP=!1,this.BUMPDIRECTUV=0,this.OBJECTSPACE_NORMALMAP=!1,this.PARALLAX=!1,this.PARALLAXOCCLUSION=!1,this.NORMALXYSCALE=!0,this.LIGHTMAP=!1,this.LIGHTMAPDIRECTUV=0,this.USELIGHTMAPASSHADOWMAP=!1,this.GAMMALIGHTMAP=!1,this.RGBDLIGHTMAP=!1,this.REFLECTION=!1,this.REFLECTIONMAP_3D=!1,this.REFLECTIONMAP_SPHERICAL=!1,this.REFLECTIONMAP_PLANAR=!1,this.REFLECTIONMAP_CUBIC=!1,this.USE_LOCAL_REFLECTIONMAP_CUBIC=!1,this.REFLECTIONMAP_PROJECTION=!1,this.REFLECTIONMAP_SKYBOX=!1,this.REFLECTIONMAP_EXPLICIT=!1,this.REFLECTIONMAP_EQUIRECTANGULAR=!1,this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,this.INVERTCUBICMAP=!1,this.USESPHERICALFROMREFLECTIONMAP=!1,this.USEIRRADIANCEMAP=!1,this.USESPHERICALINVERTEX=!1,this.REFLECTIONMAP_OPPOSITEZ=!1,this.LODINREFLECTIONALPHA=!1,this.GAMMAREFLECTION=!1,this.RGBDREFLECTION=!1,this.LINEARSPECULARREFLECTION=!1,this.RADIANCEOCCLUSION=!1,this.HORIZONOCCLUSION=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.INSTANCESCOLOR=!1,this.PREPASS=!1,this.PREPASS_IRRADIANCE=!1,this.PREPASS_IRRADIANCE_INDEX=-1,this.PREPASS_ALBEDO_SQRT=!1,this.PREPASS_ALBEDO_SQRT_INDEX=-1,this.PREPASS_DEPTH=!1,this.PREPASS_DEPTH_INDEX=-1,this.PREPASS_NORMAL=!1,this.PREPASS_NORMAL_INDEX=-1,this.PREPASS_POSITION=!1,this.PREPASS_POSITION_INDEX=-1,this.PREPASS_VELOCITY=!1,this.PREPASS_VELOCITY_INDEX=-1,this.PREPASS_REFLECTIVITY=!1,this.PREPASS_REFLECTIVITY_INDEX=-1,this.SCENE_MRT_COUNT=0,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.BONETEXTURE=!1,this.BONES_VELOCITY_ENABLED=!1,this.NONUNIFORMSCALING=!1,this.MORPHTARGETS=!1,this.MORPHTARGETS_NORMAL=!1,this.MORPHTARGETS_TANGENT=!1,this.MORPHTARGETS_UV=!1,this.NUM_MORPH_INFLUENCERS=0,this.MORPHTARGETS_TEXTURE=!1,this.IMAGEPROCESSING=!1,this.VIGNETTE=!1,this.VIGNETTEBLENDMODEMULTIPLY=!1,this.VIGNETTEBLENDMODEOPAQUE=!1,this.TONEMAPPING=!1,this.TONEMAPPING_ACES=!1,this.CONTRAST=!1,this.COLORCURVES=!1,this.COLORGRADING=!1,this.COLORGRADING3D=!1,this.SAMPLER3DGREENDEPTH=!1,this.SAMPLER3DBGRMAP=!1,this.DITHER=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.EXPOSURE=!1,this.MULTIVIEW=!1,this.ORDER_INDEPENDENT_TRANSPARENCY=!1,this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS=!1,this.USEPHYSICALLIGHTFALLOFF=!1,this.USEGLTFLIGHTFALLOFF=!1,this.TWOSIDEDLIGHTING=!1,this.SHADOWFLOAT=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.LOGARITHMICDEPTH=!1,this.CAMERA_ORTHOGRAPHIC=!1,this.CAMERA_PERSPECTIVE=!1,this.FORCENORMALFORWARD=!1,this.SPECULARAA=!1,this.UNLIT=!1,this.DEBUGMODE=0,this.rebuild()}reset(){super.reset(),this.ALPHATESTVALUE="0.5",this.PBR=!0,this.NORMALXYSCALE=!0}}class v extends Ue{get realTimeFiltering(){return this._realTimeFiltering}set realTimeFiltering(e){this._realTimeFiltering=e,this.markAsDirty(1)}get realTimeFilteringQuality(){return this._realTimeFilteringQuality}set realTimeFilteringQuality(e){this._realTimeFilteringQuality=e,this.markAsDirty(1)}get canRenderToMRT(){return!0}_attachImageProcessingConfiguration(e){e!==this._imageProcessingConfiguration&&(this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),e?this._imageProcessingConfiguration=e:this._imageProcessingConfiguration=this.getScene().imageProcessingConfiguration,this._imageProcessingConfiguration&&(this._imageProcessingObserver=this._imageProcessingConfiguration.onUpdateParameters.add(()=>{this._markAllSubMeshesAsImageProcessingDirty()})))}constructor(e,t){super(e,t),this._directIntensity=1,this._emissiveIntensity=1,this._environmentIntensity=1,this._specularIntensity=1,this._lightingInfos=new Le(this._directIntensity,this._emissiveIntensity,this._environmentIntensity,this._specularIntensity),this._disableBumpMap=!1,this._albedoTexture=null,this._ambientTexture=null,this._ambientTextureStrength=1,this._ambientTextureImpactOnAnalyticalLights=v.DEFAULT_AO_ON_ANALYTICAL_LIGHTS,this._opacityTexture=null,this._reflectionTexture=null,this._emissiveTexture=null,this._reflectivityTexture=null,this._metallicTexture=null,this._metallic=null,this._roughness=null,this._metallicF0Factor=1,this._metallicReflectanceColor=F.White(),this._useOnlyMetallicFromMetallicReflectanceTexture=!1,this._metallicReflectanceTexture=null,this._reflectanceTexture=null,this._microSurfaceTexture=null,this._bumpTexture=null,this._lightmapTexture=null,this._ambientColor=new F(0,0,0),this._albedoColor=new F(1,1,1),this._reflectivityColor=new F(1,1,1),this._reflectionColor=new F(1,1,1),this._emissiveColor=new F(0,0,0),this._microSurface=.9,this._useLightmapAsShadowmap=!1,this._useHorizonOcclusion=!0,this._useRadianceOcclusion=!0,this._useAlphaFromAlbedoTexture=!1,this._useSpecularOverAlpha=!0,this._useMicroSurfaceFromReflectivityMapAlpha=!1,this._useRoughnessFromMetallicTextureAlpha=!0,this._useRoughnessFromMetallicTextureGreen=!1,this._useMetallnessFromMetallicTextureBlue=!1,this._useAmbientOcclusionFromMetallicTextureRed=!1,this._useAmbientInGrayScale=!1,this._useAutoMicroSurfaceFromReflectivityMap=!1,this._lightFalloff=v.LIGHTFALLOFF_PHYSICAL,this._useRadianceOverAlpha=!0,this._useObjectSpaceNormalMap=!1,this._useParallax=!1,this._useParallaxOcclusion=!1,this._parallaxScaleBias=.05,this._disableLighting=!1,this._maxSimultaneousLights=4,this._invertNormalMapX=!1,this._invertNormalMapY=!1,this._twoSidedLighting=!1,this._alphaCutOff=.4,this._forceAlphaTest=!1,this._useAlphaFresnel=!1,this._useLinearAlphaFresnel=!1,this._environmentBRDFTexture=null,this._forceIrradianceInFragment=!1,this._realTimeFiltering=!1,this._realTimeFilteringQuality=8,this._forceNormalForward=!1,this._enableSpecularAntiAliasing=!1,this._imageProcessingObserver=null,this._renderTargets=new De(16),this._globalAmbientColor=new F(0,0,0),this._useLogarithmicDepth=!1,this._unlit=!1,this._debugMode=0,this.debugMode=0,this.debugLimit=-1,this.debugFactor=1,this._cacheHasRenderTargetTextures=!1,this.brdf=new x(this),this.clearCoat=new D(this),this.iridescence=new y(this),this.anisotropy=new j(this),this.sheen=new w(this),this.subSurface=new M(this),this.detailMap=new Be(this),this._attachImageProcessingConfiguration(null),this.getRenderTargetTextures=()=>(this._renderTargets.reset(),c.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget&&this._renderTargets.push(this._reflectionTexture),this._eventInfo.renderTargets=this._renderTargets,this._callbackPluginEventFillRenderTargetTextures(this._eventInfo),this._renderTargets),this._environmentBRDFTexture=Ae(this.getScene()),this.prePassConfiguration=new Re}get hasRenderTargetTextures(){return c.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget?!0:this._cacheHasRenderTargetTextures}get isPrePassCapable(){return!this.disableDepthWrite}getClassName(){return"PBRBaseMaterial"}get useLogarithmicDepth(){return this._useLogarithmicDepth}set useLogarithmicDepth(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported}get _disableAlphaBlending(){var e;return this._transparencyMode===v.PBRMATERIAL_OPAQUE||this._transparencyMode===v.PBRMATERIAL_ALPHATEST||((e=this.subSurface)===null||e===void 0?void 0:e.disableAlphaBlending)}needAlphaBlending(){return this._disableAlphaBlending?!1:this.alpha<1||this._opacityTexture!=null||this._shouldUseAlphaFromAlbedoTexture()}needAlphaTesting(){var e;return this._forceAlphaTest?!0:!((e=this.subSurface)===null||e===void 0)&&e.disableAlphaBlending?!1:this._hasAlphaChannel()&&(this._transparencyMode==null||this._transparencyMode===v.PBRMATERIAL_ALPHATEST)}_shouldUseAlphaFromAlbedoTexture(){return this._albedoTexture!=null&&this._albedoTexture.hasAlpha&&this._useAlphaFromAlbedoTexture&&this._transparencyMode!==v.PBRMATERIAL_OPAQUE}_hasAlphaChannel(){return this._albedoTexture!=null&&this._albedoTexture.hasAlpha||this._opacityTexture!=null}getAlphaTestTexture(){return this._albedoTexture}isReadyForSubMesh(e,t,i){var o;if(this._uniformBufferLayoutBuilt||this.buildUniformLayout(),t.effect&&this.isFrozen&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===i)return!0;t.materialDefines||(this._callbackPluginEventGeneric(de.GetDefineNames,this._eventInfo),t.materialDefines=new Ce(this._eventInfo.defineNames));const d=t.materialDefines;if(this._isReadyForSubMesh(t))return!0;const s=this.getScene(),I=s.getEngine();if(d._areTexturesDirty&&(this._eventInfo.hasRenderTargetTextures=!1,this._callbackPluginEventHasRenderTargetTextures(this._eventInfo),this._cacheHasRenderTargetTextures=this._eventInfo.hasRenderTargetTextures,s.texturesEnabled)){if(this._albedoTexture&&c.DiffuseTextureEnabled&&!this._albedoTexture.isReadyOrNotBlocking()||this._ambientTexture&&c.AmbientTextureEnabled&&!this._ambientTexture.isReadyOrNotBlocking()||this._opacityTexture&&c.OpacityTextureEnabled&&!this._opacityTexture.isReadyOrNotBlocking())return!1;const _=this._getReflectionTexture();if(_&&c.ReflectionTextureEnabled){if(!_.isReadyOrNotBlocking())return!1;if(_.irradianceTexture){if(!_.irradianceTexture.isReadyOrNotBlocking())return!1}else if(!_.sphericalPolynomial&&(!((o=_.getInternalTexture())===null||o===void 0)&&o._sphericalPolynomialPromise))return!1}if(this._lightmapTexture&&c.LightmapTextureEnabled&&!this._lightmapTexture.isReadyOrNotBlocking()||this._emissiveTexture&&c.EmissiveTextureEnabled&&!this._emissiveTexture.isReadyOrNotBlocking())return!1;if(c.SpecularTextureEnabled){if(this._metallicTexture){if(!this._metallicTexture.isReadyOrNotBlocking())return!1}else if(this._reflectivityTexture&&!this._reflectivityTexture.isReadyOrNotBlocking())return!1;if(this._metallicReflectanceTexture&&!this._metallicReflectanceTexture.isReadyOrNotBlocking()||this._reflectanceTexture&&!this._reflectanceTexture.isReadyOrNotBlocking()||this._microSurfaceTexture&&!this._microSurfaceTexture.isReadyOrNotBlocking())return!1}if(I.getCaps().standardDerivatives&&this._bumpTexture&&c.BumpTextureEnabled&&!this._disableBumpMap&&!this._bumpTexture.isReady()||this._environmentBRDFTexture&&c.ReflectionTextureEnabled&&!this._environmentBRDFTexture.isReady())return!1}if(this._eventInfo.isReadyForSubMesh=!0,this._eventInfo.defines=d,this._eventInfo.subMesh=t,this._callbackPluginEventIsReadyForSubMesh(this._eventInfo),!this._eventInfo.isReadyForSubMesh||d._areImageProcessingDirty&&this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.isReady())return!1;!I.getCaps().standardDerivatives&&!e.isVerticesDataPresent(Q.NormalKind)&&(e.createNormals(!0),Fe.Warn("PBRMaterial: Normals have been created for the mesh: "+e.name));const R=t.effect,A=d._areLightsDisposed;let l=this._prepareEffect(e,d,this.onCompiled,this.onError,i,null,t.getRenderingMesh().hasThinInstances),S=!1;if(l)if(this._onEffectCreatedObservable&&(J.effect=l,J.subMesh=t,this._onEffectCreatedObservable.notifyObservers(J)),this.allowShaderHotSwapping&&R&&!l.isReady()){if(l=R,d.markAsUnprocessed(),S=this.isFrozen,A)return d._areLightsDisposed=!0,!1}else s.resetCachedMaterial(),t.setEffect(l,d,this._materialContext);return!t.effect||!t.effect.isReady()?!1:(d._renderId=s.getRenderId(),t.effect._wasPreviouslyReady=!S,t.effect._wasPreviouslyUsingInstances=!!i,this._checkScenePerformancePriority(),!0)}isMetallicWorkflow(){return!!(this._metallic!=null||this._roughness!=null||this._metallicTexture)}_prepareEffect(e,t,i=null,o=null,d=null,s=null,I){if(this._prepareDefines(e,t,d,s,I),!t.isDirty)return null;t.markAsProcessed();const A=this.getScene().getEngine(),l=new Ge;let S=0;t.USESPHERICALINVERTEX&&l.addFallback(S++,"USESPHERICALINVERTEX"),t.FOG&&l.addFallback(S,"FOG"),t.SPECULARAA&&l.addFallback(S,"SPECULARAA"),t.POINTSIZE&&l.addFallback(S,"POINTSIZE"),t.LOGARITHMICDEPTH&&l.addFallback(S,"LOGARITHMICDEPTH"),t.PARALLAX&&l.addFallback(S,"PARALLAX"),t.PARALLAXOCCLUSION&&l.addFallback(S++,"PARALLAXOCCLUSION"),t.ENVIRONMENTBRDF&&l.addFallback(S++,"ENVIRONMENTBRDF"),t.TANGENT&&l.addFallback(S++,"TANGENT"),t.BUMP&&l.addFallback(S++,"BUMP"),S=h.HandleFallbacksForShadows(t,l,this._maxSimultaneousLights,S++),t.SPECULARTERM&&l.addFallback(S++,"SPECULARTERM"),t.USESPHERICALFROMREFLECTIONMAP&&l.addFallback(S++,"USESPHERICALFROMREFLECTIONMAP"),t.USEIRRADIANCEMAP&&l.addFallback(S++,"USEIRRADIANCEMAP"),t.LIGHTMAP&&l.addFallback(S++,"LIGHTMAP"),t.NORMAL&&l.addFallback(S++,"NORMAL"),t.AMBIENT&&l.addFallback(S++,"AMBIENT"),t.EMISSIVE&&l.addFallback(S++,"EMISSIVE"),t.VERTEXCOLOR&&l.addFallback(S++,"VERTEXCOLOR"),t.MORPHTARGETS&&l.addFallback(S++,"MORPHTARGETS"),t.MULTIVIEW&&l.addFallback(0,"MULTIVIEW");const _=[Q.PositionKind];t.NORMAL&&_.push(Q.NormalKind),t.TANGENT&&_.push(Q.TangentKind);for(let U=1;U<=6;++U)t["UV"+U]&&_.push(`uv${U===1?"":U}`);t.VERTEXCOLOR&&_.push(Q.ColorKind),t.INSTANCESCOLOR&&_.push(Q.ColorInstanceKind),h.PrepareAttributesForBones(_,e,t,l),h.PrepareAttributesForInstances(_,t),h.PrepareAttributesForMorphTargets(_,e,t),h.PrepareAttributesForBakedVertexAnimation(_,e,t);let m="pbr";const r=["world","view","viewProjection","vEyePosition","vLightsType","vAmbientColor","vAlbedoColor","vReflectivityColor","vMetallicReflectanceFactors","vEmissiveColor","visibility","vReflectionColor","vFogInfos","vFogColor","pointSize","vAlbedoInfos","vAmbientInfos","vOpacityInfos","vReflectionInfos","vReflectionPosition","vReflectionSize","vEmissiveInfos","vReflectivityInfos","vReflectionFilteringInfo","vMetallicReflectanceInfos","vReflectanceInfos","vMicroSurfaceSamplerInfos","vBumpInfos","vLightmapInfos","mBones","albedoMatrix","ambientMatrix","opacityMatrix","reflectionMatrix","emissiveMatrix","reflectivityMatrix","normalMatrix","microSurfaceSamplerMatrix","bumpMatrix","lightmapMatrix","metallicReflectanceMatrix","reflectanceMatrix","vLightingIntensity","logarithmicDepthConstant","vSphericalX","vSphericalY","vSphericalZ","vSphericalXX_ZZ","vSphericalYY_ZZ","vSphericalZZ","vSphericalXY","vSphericalYZ","vSphericalZX","vSphericalL00","vSphericalL1_1","vSphericalL10","vSphericalL11","vSphericalL2_2","vSphericalL2_1","vSphericalL20","vSphericalL21","vSphericalL22","vReflectionMicrosurfaceInfos","vTangentSpaceParams","boneTextureWidth","vDebugMode","morphTargetTextureInfo","morphTargetTextureIndices"],T=["albedoSampler","reflectivitySampler","ambientSampler","emissiveSampler","bumpSampler","lightmapSampler","opacitySampler","reflectionSampler","reflectionSamplerLow","reflectionSamplerHigh","irradianceSampler","microSurfaceSampler","environmentBrdfSampler","boneSampler","metallicReflectanceSampler","reflectanceSampler","morphTargets","oitDepthSampler","oitFrontColorSampler"],g=["Material","Scene","Mesh"];this._eventInfo.fallbacks=l,this._eventInfo.fallbackRank=S,this._eventInfo.defines=t,this._eventInfo.uniforms=r,this._eventInfo.attributes=_,this._eventInfo.samplers=T,this._eventInfo.uniformBuffersNames=g,this._eventInfo.customCode=void 0,this._eventInfo.mesh=e,this._callbackPluginEventGeneric(de.PrepareEffect,this._eventInfo),Re.AddUniforms(r),xe(r),ue&&(ue.PrepareUniforms(r,t),ue.PrepareSamplers(T,t)),h.PrepareUniformsAndSamplersList({uniformsNames:r,uniformBuffersNames:g,samplers:T,defines:t,maxSimultaneousLights:this._maxSimultaneousLights});const b={};this.customShaderNameResolve&&(m=this.customShaderNameResolve(m,r,g,T,t,_,b));const P=t.toString(),B=A.createEffect(m,{attributes:_,uniformsNames:r,uniformBuffersNames:g,samplers:T,defines:P,fallbacks:l,onCompiled:i,onError:o,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights,maxSimultaneousMorphTargets:t.NUM_MORPH_INFLUENCERS},processFinalCode:b.processFinalCode,processCodeAfterIncludes:this._eventInfo.customCode,multiTarget:t.PREPASS},A);return this._eventInfo.customCode=void 0,B}_prepareDefines(e,t,i=null,o=null,d=!1){var s;const I=this.getScene(),R=I.getEngine();h.PrepareDefinesForLights(I,e,t,!0,this._maxSimultaneousLights,this._disableLighting),t._needNormals=!0,h.PrepareDefinesForMultiview(I,t);const A=this.needAlphaBlendingForMesh(e)&&this.getScene().useOrderIndependentTransparency;if(h.PrepareDefinesForPrePass(I,t,this.canRenderToMRT&&!A),h.PrepareDefinesForOIT(I,t,A),t.METALLICWORKFLOW=this.isMetallicWorkflow(),t._areTexturesDirty){t._needUVs=!1;for(let l=1;l<=6;++l)t["MAINUV"+l]=!1;if(I.texturesEnabled){t.ALBEDODIRECTUV=0,t.AMBIENTDIRECTUV=0,t.OPACITYDIRECTUV=0,t.EMISSIVEDIRECTUV=0,t.REFLECTIVITYDIRECTUV=0,t.MICROSURFACEMAPDIRECTUV=0,t.METALLIC_REFLECTANCEDIRECTUV=0,t.REFLECTANCEDIRECTUV=0,t.BUMPDIRECTUV=0,t.LIGHTMAPDIRECTUV=0,R.getCaps().textureLOD&&(t.LODBASEDMICROSFURACE=!0),this._albedoTexture&&c.DiffuseTextureEnabled?(h.PrepareDefinesForMergedUV(this._albedoTexture,t,"ALBEDO"),t.GAMMAALBEDO=this._albedoTexture.gammaSpace):t.ALBEDO=!1,this._ambientTexture&&c.AmbientTextureEnabled?(h.PrepareDefinesForMergedUV(this._ambientTexture,t,"AMBIENT"),t.AMBIENTINGRAYSCALE=this._useAmbientInGrayScale):t.AMBIENT=!1,this._opacityTexture&&c.OpacityTextureEnabled?(h.PrepareDefinesForMergedUV(this._opacityTexture,t,"OPACITY"),t.OPACITYRGB=this._opacityTexture.getAlphaFromRGB):t.OPACITY=!1;const l=this._getReflectionTexture();if(l&&c.ReflectionTextureEnabled){switch(t.REFLECTION=!0,t.GAMMAREFLECTION=l.gammaSpace,t.RGBDREFLECTION=l.isRGBD,t.LODINREFLECTIONALPHA=l.lodLevelInAlpha,t.LINEARSPECULARREFLECTION=l.linearSpecularLOD,this.realTimeFiltering&&this.realTimeFilteringQuality>0?(t.NUM_SAMPLES=""+this.realTimeFilteringQuality,R._features.needTypeSuffixInShaderConstants&&(t.NUM_SAMPLES=t.NUM_SAMPLES+"u"),t.REALTIME_FILTERING=!0):t.REALTIME_FILTERING=!1,t.INVERTCUBICMAP=l.coordinatesMode===L.INVCUBIC_MODE,t.REFLECTIONMAP_3D=l.isCube,t.REFLECTIONMAP_OPPOSITEZ=t.REFLECTIONMAP_3D&&this.getScene().useRightHandedSystem?!l.invertZ:l.invertZ,t.REFLECTIONMAP_CUBIC=!1,t.REFLECTIONMAP_EXPLICIT=!1,t.REFLECTIONMAP_PLANAR=!1,t.REFLECTIONMAP_PROJECTION=!1,t.REFLECTIONMAP_SKYBOX=!1,t.REFLECTIONMAP_SPHERICAL=!1,t.REFLECTIONMAP_EQUIRECTANGULAR=!1,t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,l.coordinatesMode){case L.EXPLICIT_MODE:t.REFLECTIONMAP_EXPLICIT=!0;break;case L.PLANAR_MODE:t.REFLECTIONMAP_PLANAR=!0;break;case L.PROJECTION_MODE:t.REFLECTIONMAP_PROJECTION=!0;break;case L.SKYBOX_MODE:t.REFLECTIONMAP_SKYBOX=!0;break;case L.SPHERICAL_MODE:t.REFLECTIONMAP_SPHERICAL=!0;break;case L.EQUIRECTANGULAR_MODE:t.REFLECTIONMAP_EQUIRECTANGULAR=!0;break;case L.FIXED_EQUIRECTANGULAR_MODE:t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!0;break;case L.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!0;break;case L.CUBIC_MODE:case L.INVCUBIC_MODE:default:t.REFLECTIONMAP_CUBIC=!0,t.USE_LOCAL_REFLECTIONMAP_CUBIC=!!l.boundingBoxSize;break}l.coordinatesMode!==L.SKYBOX_MODE&&(l.irradianceTexture?(t.USEIRRADIANCEMAP=!0,t.USESPHERICALFROMREFLECTIONMAP=!1):l.isCube&&(t.USESPHERICALFROMREFLECTIONMAP=!0,t.USEIRRADIANCEMAP=!1,this._forceIrradianceInFragment||this.realTimeFiltering||R.getCaps().maxVaryingVectors<=8?t.USESPHERICALINVERTEX=!1:t.USESPHERICALINVERTEX=!0))}else t.REFLECTION=!1,t.REFLECTIONMAP_3D=!1,t.REFLECTIONMAP_SPHERICAL=!1,t.REFLECTIONMAP_PLANAR=!1,t.REFLECTIONMAP_CUBIC=!1,t.USE_LOCAL_REFLECTIONMAP_CUBIC=!1,t.REFLECTIONMAP_PROJECTION=!1,t.REFLECTIONMAP_SKYBOX=!1,t.REFLECTIONMAP_EXPLICIT=!1,t.REFLECTIONMAP_EQUIRECTANGULAR=!1,t.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,t.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,t.INVERTCUBICMAP=!1,t.USESPHERICALFROMREFLECTIONMAP=!1,t.USEIRRADIANCEMAP=!1,t.USESPHERICALINVERTEX=!1,t.REFLECTIONMAP_OPPOSITEZ=!1,t.LODINREFLECTIONALPHA=!1,t.GAMMAREFLECTION=!1,t.RGBDREFLECTION=!1,t.LINEARSPECULARREFLECTION=!1;if(this._lightmapTexture&&c.LightmapTextureEnabled?(h.PrepareDefinesForMergedUV(this._lightmapTexture,t,"LIGHTMAP"),t.USELIGHTMAPASSHADOWMAP=this._useLightmapAsShadowmap,t.GAMMALIGHTMAP=this._lightmapTexture.gammaSpace,t.RGBDLIGHTMAP=this._lightmapTexture.isRGBD):t.LIGHTMAP=!1,this._emissiveTexture&&c.EmissiveTextureEnabled?(h.PrepareDefinesForMergedUV(this._emissiveTexture,t,"EMISSIVE"),t.GAMMAEMISSIVE=this._emissiveTexture.gammaSpace):t.EMISSIVE=!1,c.SpecularTextureEnabled){if(this._metallicTexture?(h.PrepareDefinesForMergedUV(this._metallicTexture,t,"REFLECTIVITY"),t.ROUGHNESSSTOREINMETALMAPALPHA=this._useRoughnessFromMetallicTextureAlpha,t.ROUGHNESSSTOREINMETALMAPGREEN=!this._useRoughnessFromMetallicTextureAlpha&&this._useRoughnessFromMetallicTextureGreen,t.METALLNESSSTOREINMETALMAPBLUE=this._useMetallnessFromMetallicTextureBlue,t.AOSTOREINMETALMAPRED=this._useAmbientOcclusionFromMetallicTextureRed,t.REFLECTIVITY_GAMMA=!1):this._reflectivityTexture?(h.PrepareDefinesForMergedUV(this._reflectivityTexture,t,"REFLECTIVITY"),t.MICROSURFACEFROMREFLECTIVITYMAP=this._useMicroSurfaceFromReflectivityMapAlpha,t.MICROSURFACEAUTOMATIC=this._useAutoMicroSurfaceFromReflectivityMap,t.REFLECTIVITY_GAMMA=this._reflectivityTexture.gammaSpace):t.REFLECTIVITY=!1,this._metallicReflectanceTexture||this._reflectanceTexture){const S=this._metallicReflectanceTexture!==null&&this._metallicReflectanceTexture._texture===((s=this._reflectanceTexture)===null||s===void 0?void 0:s._texture)&&this._metallicReflectanceTexture.checkTransformsAreIdentical(this._reflectanceTexture);t.METALLIC_REFLECTANCE_USE_ALPHA_ONLY=this._useOnlyMetallicFromMetallicReflectanceTexture&&!S,this._metallicReflectanceTexture?(h.PrepareDefinesForMergedUV(this._metallicReflectanceTexture,t,"METALLIC_REFLECTANCE"),t.METALLIC_REFLECTANCE_GAMMA=this._metallicReflectanceTexture.gammaSpace):t.METALLIC_REFLECTANCE=!1,this._reflectanceTexture&&!S&&(!this._metallicReflectanceTexture||this._metallicReflectanceTexture&&this._useOnlyMetallicFromMetallicReflectanceTexture)?(h.PrepareDefinesForMergedUV(this._reflectanceTexture,t,"REFLECTANCE"),t.REFLECTANCE_GAMMA=this._reflectanceTexture.gammaSpace):t.REFLECTANCE=!1}else t.METALLIC_REFLECTANCE=!1,t.REFLECTANCE=!1;this._microSurfaceTexture?h.PrepareDefinesForMergedUV(this._microSurfaceTexture,t,"MICROSURFACEMAP"):t.MICROSURFACEMAP=!1}else t.REFLECTIVITY=!1,t.MICROSURFACEMAP=!1;R.getCaps().standardDerivatives&&this._bumpTexture&&c.BumpTextureEnabled&&!this._disableBumpMap?(h.PrepareDefinesForMergedUV(this._bumpTexture,t,"BUMP"),this._useParallax&&this._albedoTexture&&c.DiffuseTextureEnabled?(t.PARALLAX=!0,t.PARALLAXOCCLUSION=!!this._useParallaxOcclusion):t.PARALLAX=!1,t.OBJECTSPACE_NORMALMAP=this._useObjectSpaceNormalMap):(t.BUMP=!1,t.PARALLAX=!1,t.PARALLAXOCCLUSION=!1,t.OBJECTSPACE_NORMALMAP=!1),this._environmentBRDFTexture&&c.ReflectionTextureEnabled?(t.ENVIRONMENTBRDF=!0,t.ENVIRONMENTBRDF_RGBD=this._environmentBRDFTexture.isRGBD):(t.ENVIRONMENTBRDF=!1,t.ENVIRONMENTBRDF_RGBD=!1),this._shouldUseAlphaFromAlbedoTexture()?t.ALPHAFROMALBEDO=!0:t.ALPHAFROMALBEDO=!1}t.SPECULAROVERALPHA=this._useSpecularOverAlpha,this._lightFalloff===v.LIGHTFALLOFF_STANDARD?(t.USEPHYSICALLIGHTFALLOFF=!1,t.USEGLTFLIGHTFALLOFF=!1):this._lightFalloff===v.LIGHTFALLOFF_GLTF?(t.USEPHYSICALLIGHTFALLOFF=!1,t.USEGLTFLIGHTFALLOFF=!0):(t.USEPHYSICALLIGHTFALLOFF=!0,t.USEGLTFLIGHTFALLOFF=!1),t.RADIANCEOVERALPHA=this._useRadianceOverAlpha,!this.backFaceCulling&&this._twoSidedLighting?t.TWOSIDEDLIGHTING=!0:t.TWOSIDEDLIGHTING=!1,t.SPECULARAA=R.getCaps().standardDerivatives&&this._enableSpecularAntiAliasing}(t._areTexturesDirty||t._areMiscDirty)&&(t.ALPHATESTVALUE=`${this._alphaCutOff}${this._alphaCutOff%1===0?".":""}`,t.PREMULTIPLYALPHA=this.alphaMode===7||this.alphaMode===8,t.ALPHABLEND=this.needAlphaBlendingForMesh(e),t.ALPHAFRESNEL=this._useAlphaFresnel||this._useLinearAlphaFresnel,t.LINEARALPHAFRESNEL=this._useLinearAlphaFresnel),t._areImageProcessingDirty&&this._imageProcessingConfiguration&&this._imageProcessingConfiguration.prepareDefines(t),t.FORCENORMALFORWARD=this._forceNormalForward,t.RADIANCEOCCLUSION=this._useRadianceOcclusion,t.HORIZONOCCLUSION=this._useHorizonOcclusion,t._areMiscDirty&&(h.PrepareDefinesForMisc(e,I,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e)||this._forceAlphaTest,t),t.UNLIT=this._unlit||(this.pointsCloud||this.wireframe)&&!e.isVerticesDataPresent(Q.NormalKind),t.DEBUGMODE=this._debugMode),h.PrepareDefinesForFrameBoundValues(I,R,this,t,!!i,o,d),this._eventInfo.defines=t,this._eventInfo.mesh=e,this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo),h.PrepareDefinesForAttributes(e,t,!0,!0,!0,this._transparencyMode!==v.PBRMATERIAL_OPAQUE),this._callbackPluginEventPrepareDefines(this._eventInfo)}forceCompilation(e,t,i){const o=Object.assign({clipPlane:!1,useInstances:!1},i);this._uniformBufferLayoutBuilt||this.buildUniformLayout(),this._callbackPluginEventGeneric(de.GetDefineNames,this._eventInfo);const d=new Ce(this._eventInfo.defineNames),s=this._prepareEffect(e,d,void 0,void 0,o.useInstances,o.clipPlane,e.hasThinInstances);this._onEffectCreatedObservable&&(J.effect=s,J.subMesh=null,this._onEffectCreatedObservable.notifyObservers(J)),s.isReady()?t&&t(this):s.onCompileObservable.add(()=>{t&&t(this)})}buildUniformLayout(){const e=this._uniformBuffer;e.addUniform("vAlbedoInfos",2),e.addUniform("vAmbientInfos",4),e.addUniform("vOpacityInfos",2),e.addUniform("vEmissiveInfos",2),e.addUniform("vLightmapInfos",2),e.addUniform("vReflectivityInfos",3),e.addUniform("vMicroSurfaceSamplerInfos",2),e.addUniform("vReflectionInfos",2),e.addUniform("vReflectionFilteringInfo",2),e.addUniform("vReflectionPosition",3),e.addUniform("vReflectionSize",3),e.addUniform("vBumpInfos",3),e.addUniform("albedoMatrix",16),e.addUniform("ambientMatrix",16),e.addUniform("opacityMatrix",16),e.addUniform("emissiveMatrix",16),e.addUniform("lightmapMatrix",16),e.addUniform("reflectivityMatrix",16),e.addUniform("microSurfaceSamplerMatrix",16),e.addUniform("bumpMatrix",16),e.addUniform("vTangentSpaceParams",2),e.addUniform("reflectionMatrix",16),e.addUniform("vReflectionColor",3),e.addUniform("vAlbedoColor",4),e.addUniform("vLightingIntensity",4),e.addUniform("vReflectionMicrosurfaceInfos",3),e.addUniform("pointSize",1),e.addUniform("vReflectivityColor",4),e.addUniform("vEmissiveColor",3),e.addUniform("vAmbientColor",3),e.addUniform("vDebugMode",2),e.addUniform("vMetallicReflectanceFactors",4),e.addUniform("vMetallicReflectanceInfos",2),e.addUniform("metallicReflectanceMatrix",16),e.addUniform("vReflectanceInfos",2),e.addUniform("reflectanceMatrix",16),e.addUniform("vSphericalL00",3),e.addUniform("vSphericalL1_1",3),e.addUniform("vSphericalL10",3),e.addUniform("vSphericalL11",3),e.addUniform("vSphericalL2_2",3),e.addUniform("vSphericalL2_1",3),e.addUniform("vSphericalL20",3),e.addUniform("vSphericalL21",3),e.addUniform("vSphericalL22",3),e.addUniform("vSphericalX",3),e.addUniform("vSphericalY",3),e.addUniform("vSphericalZ",3),e.addUniform("vSphericalXX_ZZ",3),e.addUniform("vSphericalYY_ZZ",3),e.addUniform("vSphericalZZ",3),e.addUniform("vSphericalXY",3),e.addUniform("vSphericalYZ",3),e.addUniform("vSphericalZX",3),super.buildUniformLayout()}bindForSubMesh(e,t,i){var o,d,s,I;const R=this.getScene(),A=i.materialDefines;if(!A)return;const l=i.effect;if(!l)return;this._activeEffect=l,t.getMeshUniformBuffer().bindToEffect(l,"Mesh"),t.transferToEffect(e);const S=R.getEngine();this._uniformBuffer.bindToEffect(l,"Material"),this.prePassConfiguration.bindForSubMesh(this._activeEffect,R,t,e,this.isFrozen),this._eventInfo.subMesh=i,this._callbackPluginEventHardBindForSubMesh(this._eventInfo),A.OBJECTSPACE_NORMALMAP&&(e.toNormalMatrix(this._normalMatrix),this.bindOnlyNormalMatrix(this._normalMatrix));const _=l._forceRebindOnNextCall||this._mustRebind(R,l,t.visibility);h.BindBonesParameters(t,this._activeEffect,this.prePassConfiguration);let m=null;const r=this._uniformBuffer;if(_){if(this.bindViewProjection(l),m=this._getReflectionTexture(),!r.useUbo||!this.isFrozen||!r.isSync||l._forceRebindOnNextCall){if(R.texturesEnabled){if(this._albedoTexture&&c.DiffuseTextureEnabled&&(r.updateFloat2("vAlbedoInfos",this._albedoTexture.coordinatesIndex,this._albedoTexture.level),h.BindTextureMatrix(this._albedoTexture,r,"albedo")),this._ambientTexture&&c.AmbientTextureEnabled&&(r.updateFloat4("vAmbientInfos",this._ambientTexture.coordinatesIndex,this._ambientTexture.level,this._ambientTextureStrength,this._ambientTextureImpactOnAnalyticalLights),h.BindTextureMatrix(this._ambientTexture,r,"ambient")),this._opacityTexture&&c.OpacityTextureEnabled&&(r.updateFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),h.BindTextureMatrix(this._opacityTexture,r,"opacity")),m&&c.ReflectionTextureEnabled){if(r.updateMatrix("reflectionMatrix",m.getReflectionTextureMatrix()),r.updateFloat2("vReflectionInfos",m.level,0),m.boundingBoxSize){const T=m;r.updateVector3("vReflectionPosition",T.boundingBoxPosition),r.updateVector3("vReflectionSize",T.boundingBoxSize)}if(this.realTimeFiltering){const T=m.getSize().width;r.updateFloat2("vReflectionFilteringInfo",T,W.Log2(T))}if(!A.USEIRRADIANCEMAP){const T=m.sphericalPolynomial;if(A.USESPHERICALFROMREFLECTIONMAP&&T)if(A.SPHERICAL_HARMONICS){const g=T.preScaledHarmonics;r.updateVector3("vSphericalL00",g.l00),r.updateVector3("vSphericalL1_1",g.l1_1),r.updateVector3("vSphericalL10",g.l10),r.updateVector3("vSphericalL11",g.l11),r.updateVector3("vSphericalL2_2",g.l2_2),r.updateVector3("vSphericalL2_1",g.l2_1),r.updateVector3("vSphericalL20",g.l20),r.updateVector3("vSphericalL21",g.l21),r.updateVector3("vSphericalL22",g.l22)}else r.updateFloat3("vSphericalX",T.x.x,T.x.y,T.x.z),r.updateFloat3("vSphericalY",T.y.x,T.y.y,T.y.z),r.updateFloat3("vSphericalZ",T.z.x,T.z.y,T.z.z),r.updateFloat3("vSphericalXX_ZZ",T.xx.x-T.zz.x,T.xx.y-T.zz.y,T.xx.z-T.zz.z),r.updateFloat3("vSphericalYY_ZZ",T.yy.x-T.zz.x,T.yy.y-T.zz.y,T.yy.z-T.zz.z),r.updateFloat3("vSphericalZZ",T.zz.x,T.zz.y,T.zz.z),r.updateFloat3("vSphericalXY",T.xy.x,T.xy.y,T.xy.z),r.updateFloat3("vSphericalYZ",T.yz.x,T.yz.y,T.yz.z),r.updateFloat3("vSphericalZX",T.zx.x,T.zx.y,T.zx.z)}r.updateFloat3("vReflectionMicrosurfaceInfos",m.getSize().width,m.lodGenerationScale,m.lodGenerationOffset)}this._emissiveTexture&&c.EmissiveTextureEnabled&&(r.updateFloat2("vEmissiveInfos",this._emissiveTexture.coordinatesIndex,this._emissiveTexture.level),h.BindTextureMatrix(this._emissiveTexture,r,"emissive")),this._lightmapTexture&&c.LightmapTextureEnabled&&(r.updateFloat2("vLightmapInfos",this._lightmapTexture.coordinatesIndex,this._lightmapTexture.level),h.BindTextureMatrix(this._lightmapTexture,r,"lightmap")),c.SpecularTextureEnabled&&(this._metallicTexture?(r.updateFloat3("vReflectivityInfos",this._metallicTexture.coordinatesIndex,this._metallicTexture.level,this._ambientTextureStrength),h.BindTextureMatrix(this._metallicTexture,r,"reflectivity")):this._reflectivityTexture&&(r.updateFloat3("vReflectivityInfos",this._reflectivityTexture.coordinatesIndex,this._reflectivityTexture.level,1),h.BindTextureMatrix(this._reflectivityTexture,r,"reflectivity")),this._metallicReflectanceTexture&&(r.updateFloat2("vMetallicReflectanceInfos",this._metallicReflectanceTexture.coordinatesIndex,this._metallicReflectanceTexture.level),h.BindTextureMatrix(this._metallicReflectanceTexture,r,"metallicReflectance")),this._reflectanceTexture&&A.REFLECTANCE&&(r.updateFloat2("vReflectanceInfos",this._reflectanceTexture.coordinatesIndex,this._reflectanceTexture.level),h.BindTextureMatrix(this._reflectanceTexture,r,"reflectance")),this._microSurfaceTexture&&(r.updateFloat2("vMicroSurfaceSamplerInfos",this._microSurfaceTexture.coordinatesIndex,this._microSurfaceTexture.level),h.BindTextureMatrix(this._microSurfaceTexture,r,"microSurfaceSampler"))),this._bumpTexture&&S.getCaps().standardDerivatives&&c.BumpTextureEnabled&&!this._disableBumpMap&&(r.updateFloat3("vBumpInfos",this._bumpTexture.coordinatesIndex,this._bumpTexture.level,this._parallaxScaleBias),h.BindTextureMatrix(this._bumpTexture,r,"bump"),R._mirroredCameraPosition?r.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?1:-1,this._invertNormalMapY?1:-1):r.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?-1:1,this._invertNormalMapY?-1:1))}if(this.pointsCloud&&r.updateFloat("pointSize",this.pointSize),A.METALLICWORKFLOW){ee.Color3[0].r=this._metallic===void 0||this._metallic===null?1:this._metallic,ee.Color3[0].g=this._roughness===void 0||this._roughness===null?1:this._roughness,r.updateColor4("vReflectivityColor",ee.Color3[0],1);const T=(d=(o=this.subSurface)===null||o===void 0?void 0:o._indexOfRefraction)!==null&&d!==void 0?d:1.5,g=1,b=Math.pow((T-g)/(T+g),2);this._metallicReflectanceColor.scaleToRef(b*this._metallicF0Factor,ee.Color3[0]);const P=this._metallicF0Factor;r.updateColor4("vMetallicReflectanceFactors",ee.Color3[0],P)}else r.updateColor4("vReflectivityColor",this._reflectivityColor,this._microSurface);r.updateColor3("vEmissiveColor",c.EmissiveTextureEnabled?this._emissiveColor:F.BlackReadOnly),r.updateColor3("vReflectionColor",this._reflectionColor),!A.SS_REFRACTION&&(!((s=this.subSurface)===null||s===void 0)&&s._linkRefractionWithTransparency)?r.updateColor4("vAlbedoColor",this._albedoColor,1):r.updateColor4("vAlbedoColor",this._albedoColor,this.alpha),this._lightingInfos.x=this._directIntensity,this._lightingInfos.y=this._emissiveIntensity,this._lightingInfos.z=this._environmentIntensity*R.environmentIntensity,this._lightingInfos.w=this._specularIntensity,r.updateVector4("vLightingIntensity",this._lightingInfos),R.ambientColor.multiplyToRef(this._ambientColor,this._globalAmbientColor),r.updateColor3("vAmbientColor",this._globalAmbientColor),r.updateFloat2("vDebugMode",this.debugLimit,this.debugFactor)}R.texturesEnabled&&(this._albedoTexture&&c.DiffuseTextureEnabled&&r.setTexture("albedoSampler",this._albedoTexture),this._ambientTexture&&c.AmbientTextureEnabled&&r.setTexture("ambientSampler",this._ambientTexture),this._opacityTexture&&c.OpacityTextureEnabled&&r.setTexture("opacitySampler",this._opacityTexture),m&&c.ReflectionTextureEnabled&&(A.LODBASEDMICROSFURACE?r.setTexture("reflectionSampler",m):(r.setTexture("reflectionSampler",m._lodTextureMid||m),r.setTexture("reflectionSamplerLow",m._lodTextureLow||m),r.setTexture("reflectionSamplerHigh",m._lodTextureHigh||m)),A.USEIRRADIANCEMAP&&r.setTexture("irradianceSampler",m.irradianceTexture)),A.ENVIRONMENTBRDF&&r.setTexture("environmentBrdfSampler",this._environmentBRDFTexture),this._emissiveTexture&&c.EmissiveTextureEnabled&&r.setTexture("emissiveSampler",this._emissiveTexture),this._lightmapTexture&&c.LightmapTextureEnabled&&r.setTexture("lightmapSampler",this._lightmapTexture),c.SpecularTextureEnabled&&(this._metallicTexture?r.setTexture("reflectivitySampler",this._metallicTexture):this._reflectivityTexture&&r.setTexture("reflectivitySampler",this._reflectivityTexture),this._metallicReflectanceTexture&&r.setTexture("metallicReflectanceSampler",this._metallicReflectanceTexture),this._reflectanceTexture&&A.REFLECTANCE&&r.setTexture("reflectanceSampler",this._reflectanceTexture),this._microSurfaceTexture&&r.setTexture("microSurfaceSampler",this._microSurfaceTexture)),this._bumpTexture&&S.getCaps().standardDerivatives&&c.BumpTextureEnabled&&!this._disableBumpMap&&r.setTexture("bumpSampler",this._bumpTexture)),this.getScene().useOrderIndependentTransparency&&this.needAlphaBlendingForMesh(t)&&this.getScene().depthPeelingRenderer.bind(l),this._eventInfo.subMesh=i,this._callbackPluginEventBindForSubMesh(this._eventInfo),Pe(this._activeEffect,this,R),this.bindEyePosition(l)}else R.getEngine()._features.needToAlwaysBindUniformBuffers&&(this._needToBindSceneUbo=!0);(_||!this.isFrozen)&&(R.lightsEnabled&&!this._disableLighting&&h.BindLights(R,t,this._activeEffect,A,this._maxSimultaneousLights),(R.fogEnabled&&t.applyFog&&R.fogMode!==be.FOGMODE_NONE||m||t.receiveShadows||A.PREPASS)&&this.bindView(l),h.BindFogParameters(R,t,this._activeEffect,!0),A.NUM_MORPH_INFLUENCERS&&h.BindMorphTargetParameters(t,this._activeEffect),A.BAKED_VERTEX_ANIMATION_TEXTURE&&((I=t.bakedVertexAnimationManager)===null||I===void 0||I.bind(l,A.INSTANCES)),this._imageProcessingConfiguration.bind(this._activeEffect),h.BindLogDepth(A,this._activeEffect,R)),this._afterBind(t,this._activeEffect),r.update()}getAnimatables(){const e=super.getAnimatables();return this._albedoTexture&&this._albedoTexture.animations&&this._albedoTexture.animations.length>0&&e.push(this._albedoTexture),this._ambientTexture&&this._ambientTexture.animations&&this._ambientTexture.animations.length>0&&e.push(this._ambientTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),this._reflectionTexture&&this._reflectionTexture.animations&&this._reflectionTexture.animations.length>0&&e.push(this._reflectionTexture),this._emissiveTexture&&this._emissiveTexture.animations&&this._emissiveTexture.animations.length>0&&e.push(this._emissiveTexture),this._metallicTexture&&this._metallicTexture.animations&&this._metallicTexture.animations.length>0?e.push(this._metallicTexture):this._reflectivityTexture&&this._reflectivityTexture.animations&&this._reflectivityTexture.animations.length>0&&e.push(this._reflectivityTexture),this._bumpTexture&&this._bumpTexture.animations&&this._bumpTexture.animations.length>0&&e.push(this._bumpTexture),this._lightmapTexture&&this._lightmapTexture.animations&&this._lightmapTexture.animations.length>0&&e.push(this._lightmapTexture),this._metallicReflectanceTexture&&this._metallicReflectanceTexture.animations&&this._metallicReflectanceTexture.animations.length>0&&e.push(this._metallicReflectanceTexture),this._reflectanceTexture&&this._reflectanceTexture.animations&&this._reflectanceTexture.animations.length>0&&e.push(this._reflectanceTexture),this._microSurfaceTexture&&this._microSurfaceTexture.animations&&this._microSurfaceTexture.animations.length>0&&e.push(this._microSurfaceTexture),e}_getReflectionTexture(){return this._reflectionTexture?this._reflectionTexture:this.getScene().environmentTexture}getActiveTextures(){const e=super.getActiveTextures();return this._albedoTexture&&e.push(this._albedoTexture),this._ambientTexture&&e.push(this._ambientTexture),this._opacityTexture&&e.push(this._opacityTexture),this._reflectionTexture&&e.push(this._reflectionTexture),this._emissiveTexture&&e.push(this._emissiveTexture),this._reflectivityTexture&&e.push(this._reflectivityTexture),this._metallicTexture&&e.push(this._metallicTexture),this._metallicReflectanceTexture&&e.push(this._metallicReflectanceTexture),this._reflectanceTexture&&e.push(this._reflectanceTexture),this._microSurfaceTexture&&e.push(this._microSurfaceTexture),this._bumpTexture&&e.push(this._bumpTexture),this._lightmapTexture&&e.push(this._lightmapTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._albedoTexture===e||this._ambientTexture===e||this._opacityTexture===e||this._reflectionTexture===e||this._emissiveTexture===e||this._reflectivityTexture===e||this._metallicTexture===e||this._metallicReflectanceTexture===e||this._reflectanceTexture===e||this._microSurfaceTexture===e||this._bumpTexture===e||this._lightmapTexture===e)}setPrePassRenderer(){var e;if(!(!((e=this.subSurface)===null||e===void 0)&&e.isScatteringEnabled))return!1;const t=this.getScene().enableSubSurfaceForPrePass();return t&&(t.enabled=!0),!0}dispose(e,t){var i,o,d,s,I,R,A,l,S,_,m,r;t&&(this._environmentBRDFTexture&&this.getScene().environmentBRDFTexture!==this._environmentBRDFTexture&&this._environmentBRDFTexture.dispose(),(i=this._albedoTexture)===null||i===void 0||i.dispose(),(o=this._ambientTexture)===null||o===void 0||o.dispose(),(d=this._opacityTexture)===null||d===void 0||d.dispose(),(s=this._reflectionTexture)===null||s===void 0||s.dispose(),(I=this._emissiveTexture)===null||I===void 0||I.dispose(),(R=this._metallicTexture)===null||R===void 0||R.dispose(),(A=this._reflectivityTexture)===null||A===void 0||A.dispose(),(l=this._bumpTexture)===null||l===void 0||l.dispose(),(S=this._lightmapTexture)===null||S===void 0||S.dispose(),(_=this._metallicReflectanceTexture)===null||_===void 0||_.dispose(),(m=this._reflectanceTexture)===null||m===void 0||m.dispose(),(r=this._microSurfaceTexture)===null||r===void 0||r.dispose()),this._renderTargets.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),super.dispose(e,t)}}v.PBRMATERIAL_OPAQUE=ie.MATERIAL_OPAQUE;v.PBRMATERIAL_ALPHATEST=ie.MATERIAL_ALPHATEST;v.PBRMATERIAL_ALPHABLEND=ie.MATERIAL_ALPHABLEND;v.PBRMATERIAL_ALPHATESTANDBLEND=ie.MATERIAL_ALPHATESTANDBLEND;v.DEFAULT_AO_ON_ANALYTICAL_LIGHTS=0;v.LIGHTFALLOFF_PHYSICAL=0;v.LIGHTFALLOFF_GLTF=1;v.LIGHTFALLOFF_STANDARD=2;a([ye()],v.prototype,"_imageProcessingConfiguration",void 0);a([n("_markAllSubMeshesAsMiscDirty")],v.prototype,"debugMode",void 0);a([f()],v.prototype,"useLogarithmicDepth",null);class u extends v{get refractionTexture(){return this.subSurface.refractionTexture}set refractionTexture(e){this.subSurface.refractionTexture=e,e?this.subSurface.isRefractionEnabled=!0:this.subSurface.linkRefractionWithTransparency||(this.subSurface.isRefractionEnabled=!1)}get indexOfRefraction(){return this.subSurface.indexOfRefraction}set indexOfRefraction(e){this.subSurface.indexOfRefraction=e}get invertRefractionY(){return this.subSurface.invertRefractionY}set invertRefractionY(e){this.subSurface.invertRefractionY=e}get linkRefractionWithTransparency(){return this.subSurface.linkRefractionWithTransparency}set linkRefractionWithTransparency(e){this.subSurface.linkRefractionWithTransparency=e,e&&(this.subSurface.isRefractionEnabled=!0)}get usePhysicalLightFalloff(){return this._lightFalloff===v.LIGHTFALLOFF_PHYSICAL}set usePhysicalLightFalloff(e){e!==this.usePhysicalLightFalloff&&(this._markAllSubMeshesAsTexturesDirty(),e?this._lightFalloff=v.LIGHTFALLOFF_PHYSICAL:this._lightFalloff=v.LIGHTFALLOFF_STANDARD)}get useGLTFLightFalloff(){return this._lightFalloff===v.LIGHTFALLOFF_GLTF}set useGLTFLightFalloff(e){e!==this.useGLTFLightFalloff&&(this._markAllSubMeshesAsTexturesDirty(),e?this._lightFalloff=v.LIGHTFALLOFF_GLTF:this._lightFalloff=v.LIGHTFALLOFF_STANDARD)}get imageProcessingConfiguration(){return this._imageProcessingConfiguration}set imageProcessingConfiguration(e){this._attachImageProcessingConfiguration(e),this._markAllSubMeshesAsTexturesDirty()}get cameraColorCurvesEnabled(){return this.imageProcessingConfiguration.colorCurvesEnabled}set cameraColorCurvesEnabled(e){this.imageProcessingConfiguration.colorCurvesEnabled=e}get cameraColorGradingEnabled(){return this.imageProcessingConfiguration.colorGradingEnabled}set cameraColorGradingEnabled(e){this.imageProcessingConfiguration.colorGradingEnabled=e}get cameraToneMappingEnabled(){return this._imageProcessingConfiguration.toneMappingEnabled}set cameraToneMappingEnabled(e){this._imageProcessingConfiguration.toneMappingEnabled=e}get cameraExposure(){return this._imageProcessingConfiguration.exposure}set cameraExposure(e){this._imageProcessingConfiguration.exposure=e}get cameraContrast(){return this._imageProcessingConfiguration.contrast}set cameraContrast(e){this._imageProcessingConfiguration.contrast=e}get cameraColorGradingTexture(){return this._imageProcessingConfiguration.colorGradingTexture}set cameraColorGradingTexture(e){this._imageProcessingConfiguration.colorGradingTexture=e}get cameraColorCurves(){return this._imageProcessingConfiguration.colorCurves}set cameraColorCurves(e){this._imageProcessingConfiguration.colorCurves=e}constructor(e,t){super(e,t),this.directIntensity=1,this.emissiveIntensity=1,this.environmentIntensity=1,this.specularIntensity=1,this.disableBumpMap=!1,this.ambientTextureStrength=1,this.ambientTextureImpactOnAnalyticalLights=u.DEFAULT_AO_ON_ANALYTICAL_LIGHTS,this.metallicF0Factor=1,this.metallicReflectanceColor=F.White(),this.useOnlyMetallicFromMetallicReflectanceTexture=!1,this.ambientColor=new F(0,0,0),this.albedoColor=new F(1,1,1),this.reflectivityColor=new F(1,1,1),this.reflectionColor=new F(1,1,1),this.emissiveColor=new F(0,0,0),this.microSurface=1,this.useLightmapAsShadowmap=!1,this.useAlphaFromAlbedoTexture=!1,this.forceAlphaTest=!1,this.alphaCutOff=.4,this.useSpecularOverAlpha=!0,this.useMicroSurfaceFromReflectivityMapAlpha=!1,this.useRoughnessFromMetallicTextureAlpha=!0,this.useRoughnessFromMetallicTextureGreen=!1,this.useMetallnessFromMetallicTextureBlue=!1,this.useAmbientOcclusionFromMetallicTextureRed=!1,this.useAmbientInGrayScale=!1,this.useAutoMicroSurfaceFromReflectivityMap=!1,this.useRadianceOverAlpha=!0,this.useObjectSpaceNormalMap=!1,this.useParallax=!1,this.useParallaxOcclusion=!1,this.parallaxScaleBias=.05,this.disableLighting=!1,this.forceIrradianceInFragment=!1,this.maxSimultaneousLights=4,this.invertNormalMapX=!1,this.invertNormalMapY=!1,this.twoSidedLighting=!1,this.useAlphaFresnel=!1,this.useLinearAlphaFresnel=!1,this.environmentBRDFTexture=null,this.forceNormalForward=!1,this.enableSpecularAntiAliasing=!1,this.useHorizonOcclusion=!0,this.useRadianceOcclusion=!0,this.unlit=!1,this._environmentBRDFTexture=Ae(this.getScene())}getClassName(){return"PBRMaterial"}clone(e,t=!0,i=""){const o=oe.Clone(()=>new u(e,this.getScene()),this,{cloneTexturesOnlyOnce:t});return o.id=e,o.name=e,this.stencil.copyTo(o.stencil),this._clonePlugins(o,i),o}serialize(){const e=super.serialize();return e.customType="BABYLON.PBRMaterial",e}static Parse(e,t,i){const o=oe.Parse(()=>new u(e.name,t),e,t,i);return e.stencil&&o.stencil.parse(e.stencil,t,i),ie._parsePlugins(e,o,t,i),e.clearCoat&&o.clearCoat.parse(e.clearCoat,t,i),e.anisotropy&&o.anisotropy.parse(e.anisotropy,t,i),e.brdf&&o.brdf.parse(e.brdf,t,i),e.sheen&&o.sheen.parse(e.sheen,t,i),e.subSurface&&o.subSurface.parse(e.subSurface,t,i),e.iridescence&&o.iridescence.parse(e.iridescence,t,i),o}}u.PBRMATERIAL_OPAQUE=v.PBRMATERIAL_OPAQUE;u.PBRMATERIAL_ALPHATEST=v.PBRMATERIAL_ALPHATEST;u.PBRMATERIAL_ALPHABLEND=v.PBRMATERIAL_ALPHABLEND;u.PBRMATERIAL_ALPHATESTANDBLEND=v.PBRMATERIAL_ALPHATESTANDBLEND;u.DEFAULT_AO_ON_ANALYTICAL_LIGHTS=v.DEFAULT_AO_ON_ANALYTICAL_LIGHTS;a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"directIntensity",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"emissiveIntensity",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"environmentIntensity",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"specularIntensity",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"disableBumpMap",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"albedoTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"ambientTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"ambientTextureStrength",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"ambientTextureImpactOnAnalyticalLights",void 0);a([O(),n("_markAllSubMeshesAsTexturesAndMiscDirty")],u.prototype,"opacityTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"reflectionTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"emissiveTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"reflectivityTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"metallicTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"metallic",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"roughness",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"metallicF0Factor",void 0);a([X(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"metallicReflectanceColor",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useOnlyMetallicFromMetallicReflectanceTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"metallicReflectanceTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"reflectanceTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"microSurfaceTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"bumpTexture",void 0);a([O(),n("_markAllSubMeshesAsTexturesDirty",null)],u.prototype,"lightmapTexture",void 0);a([X("ambient"),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"ambientColor",void 0);a([X("albedo"),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"albedoColor",void 0);a([X("reflectivity"),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"reflectivityColor",void 0);a([X("reflection"),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"reflectionColor",void 0);a([X("emissive"),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"emissiveColor",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"microSurface",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useLightmapAsShadowmap",void 0);a([f(),n("_markAllSubMeshesAsTexturesAndMiscDirty")],u.prototype,"useAlphaFromAlbedoTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesAndMiscDirty")],u.prototype,"forceAlphaTest",void 0);a([f(),n("_markAllSubMeshesAsTexturesAndMiscDirty")],u.prototype,"alphaCutOff",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useSpecularOverAlpha",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useMicroSurfaceFromReflectivityMapAlpha",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useRoughnessFromMetallicTextureAlpha",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useRoughnessFromMetallicTextureGreen",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useMetallnessFromMetallicTextureBlue",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useAmbientOcclusionFromMetallicTextureRed",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useAmbientInGrayScale",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useAutoMicroSurfaceFromReflectivityMap",void 0);a([f()],u.prototype,"usePhysicalLightFalloff",null);a([f()],u.prototype,"useGLTFLightFalloff",null);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useRadianceOverAlpha",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useObjectSpaceNormalMap",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useParallax",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useParallaxOcclusion",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"parallaxScaleBias",void 0);a([f(),n("_markAllSubMeshesAsLightsDirty")],u.prototype,"disableLighting",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"forceIrradianceInFragment",void 0);a([f(),n("_markAllSubMeshesAsLightsDirty")],u.prototype,"maxSimultaneousLights",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"invertNormalMapX",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"invertNormalMapY",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"twoSidedLighting",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useAlphaFresnel",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useLinearAlphaFresnel",void 0);a([n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"environmentBRDFTexture",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"forceNormalForward",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"enableSpecularAntiAliasing",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useHorizonOcclusion",void 0);a([f(),n("_markAllSubMeshesAsTexturesDirty")],u.prototype,"useRadianceOcclusion",void 0);a([f(),n("_markAllSubMeshesAsMiscDirty")],u.prototype,"unlit",void 0);Se("BABYLON.PBRMaterial",u);export{pe as A,xi as B,ce as C,We as F,Ae as G,vi as M,ae as P,Ie as R,te as S,Qe as T,D as a,y as b,v as c,j as d,x as e,w as f,M as g,u as h,se as i,ze as j,pi as k,Ni as l,gi as m,Mi as n,Ce as o,_e as p,Fi as q};
