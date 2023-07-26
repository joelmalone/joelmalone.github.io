import{a9 as ce,h as W,cj as st,n as u,aF as Vt,O as ze,E as Ce,t as q,p as g,s as oe,bg as j,cP as at,V as y,v as Y,u as Bt,cR as Gt,e as zt,av as We,R as ke,aA as lt,i as $,W as A,bP as fe,o as w,ar as O,aG as ft,C as K,aQ as Wt,aM as we,at as ct,au as dt,S as He,aB as _e,cL as Pe,aa as k,M as F,a6 as kt,j as Ie,L as Ve,T as Ht,w as Yt,aX as J,U as ye,ak as $t,aE as Ne,a7 as U,J as jt,f as Me,q as Re,z as Zt,d as De,ao as qt,as as Qt,Q as Kt,aD as nt,cv as Jt}from"./runBabylonPlaygroundScene-32a4afbd.js";class ot{constructor(){this.previousWorldMatrices={},this.previousBones={}}static AddUniforms(e){e.push("previousWorld","previousViewProjection","mPreviousBones")}static AddSamplers(e){}bindForSubMesh(e,t,i,s,r){if(t.prePassRenderer&&t.prePassRenderer.enabled&&t.prePassRenderer.currentRTisSceneRT&&t.prePassRenderer.getIndex(2)!==-1){this.previousWorldMatrices[i.uniqueId]||(this.previousWorldMatrices[i.uniqueId]=s.clone()),this.previousViewProjection||(this.previousViewProjection=t.getTransformMatrix().clone(),this.currentViewProjection=t.getTransformMatrix().clone());const l=t.getEngine();this.currentViewProjection.updateFlag!==t.getTransformMatrix().updateFlag?(this._lastUpdateFrameId=l.frameId,this.previousViewProjection.copyFrom(this.currentViewProjection),this.currentViewProjection.copyFrom(t.getTransformMatrix())):this._lastUpdateFrameId!==l.frameId&&(this._lastUpdateFrameId=l.frameId,this.previousViewProjection.copyFrom(this.currentViewProjection)),e.setMatrix("previousWorld",this.previousWorldMatrices[i.uniqueId]),e.setMatrix("previousViewProjection",this.previousViewProjection),this.previousWorldMatrices[i.uniqueId]=s.clone()}}}class ht extends ce{constructor(e,t,i=!0){super(e,t),this._normalMatrix=new W,this._storeEffectOnSubMeshes=i}getEffect(){return this._storeEffectOnSubMeshes?this._activeEffect:super.getEffect()}isReady(e,t){return e?!this._storeEffectOnSubMeshes||!e.subMeshes||e.subMeshes.length===0?!0:this.isReadyForSubMesh(e,e.subMeshes[0],t):!1}_isReadyForSubMesh(e){const t=e.materialDefines;return!!(!this.checkReadyOnEveryCall&&e.effect&&t&&t._renderId===this.getScene().getRenderId())}bindOnlyWorldMatrix(e){this._activeEffect.setMatrix("world",e)}bindOnlyNormalMatrix(e){this._activeEffect.setMatrix("normalMatrix",e)}bind(e,t){t&&this.bindForSubMesh(e,t,t.subMeshes[0])}_afterBind(e,t=null){super._afterBind(e,t),this.getScene()._cachedEffect=t,t&&(t._forceRebindOnNextCall=!1)}_mustRebind(e,t,i=1){return e.isCachedMaterialInvalid(this,t,i)}dispose(e,t,i){this._activeEffect=void 0,super.dispose(e,t,i)}}class Ye{get wrapU(){return this._wrapU}set wrapU(e){this._wrapU=e}get wrapV(){return this._wrapV}set wrapV(e){this._wrapV=e}get coordinatesMode(){return 0}get isCube(){return this._texture?this._texture.isCube:!1}set isCube(e){this._texture&&(this._texture.isCube=e)}get is3D(){return this._texture?this._texture.is3D:!1}set is3D(e){this._texture&&(this._texture.is3D=e)}get is2DArray(){return this._texture?this._texture.is2DArray:!1}set is2DArray(e){this._texture&&(this._texture.is2DArray=e)}getClassName(){return"ThinTexture"}static _IsRenderTargetWrapper(e){return(e==null?void 0:e._shareDepth)!==void 0}constructor(e){this._wrapU=1,this._wrapV=1,this.wrapR=1,this.anisotropicFilteringLevel=4,this.delayLoadState=0,this._texture=null,this._engine=null,this._cachedSize=st.Zero(),this._cachedBaseSize=st.Zero(),this._initialSamplingMode=2,this._texture=Ye._IsRenderTargetWrapper(e)?e.texture:e,this._texture&&(this._engine=this._texture.getEngine())}isReady(){return this.delayLoadState===4?(this.delayLoad(),!1):this._texture?this._texture.isReady:!1}delayLoad(){}getInternalTexture(){return this._texture}getSize(){if(this._texture){if(this._texture.width)return this._cachedSize.width=this._texture.width,this._cachedSize.height=this._texture.height,this._cachedSize;if(this._texture._size)return this._cachedSize.width=this._texture._size,this._cachedSize.height=this._texture._size,this._cachedSize}return this._cachedSize}getBaseSize(){return!this.isReady()||!this._texture?(this._cachedBaseSize.width=0,this._cachedBaseSize.height=0,this._cachedBaseSize):this._texture._size?(this._cachedBaseSize.width=this._texture._size,this._cachedBaseSize.height=this._texture._size,this._cachedBaseSize):(this._cachedBaseSize.width=this._texture.baseWidth,this._cachedBaseSize.height=this._texture.baseHeight,this._cachedBaseSize)}get samplingMode(){return this._texture?this._texture.samplingMode:this._initialSamplingMode}updateSamplingMode(e){this._texture&&this._engine&&this._engine.updateTextureSamplingMode(e,this._texture)}releaseInternalTexture(){this._texture&&(this._texture.dispose(),this._texture=null)}dispose(){this._texture&&(this.releaseInternalTexture(),this._engine=null)}}class G extends Ye{set hasAlpha(e){this._hasAlpha!==e&&(this._hasAlpha=e,this._scene&&this._scene.markAllMaterialsAsDirty(1,t=>t.hasTexture(this)))}get hasAlpha(){return this._hasAlpha}set getAlphaFromRGB(e){this._getAlphaFromRGB!==e&&(this._getAlphaFromRGB=e,this._scene&&this._scene.markAllMaterialsAsDirty(1,t=>t.hasTexture(this)))}get getAlphaFromRGB(){return this._getAlphaFromRGB}set coordinatesIndex(e){this._coordinatesIndex!==e&&(this._coordinatesIndex=e,this._scene&&this._scene.markAllMaterialsAsDirty(1,t=>t.hasTexture(this)))}get coordinatesIndex(){return this._coordinatesIndex}set coordinatesMode(e){this._coordinatesMode!==e&&(this._coordinatesMode=e,this._scene&&this._scene.markAllMaterialsAsDirty(1,t=>t.hasTexture(this)))}get coordinatesMode(){return this._coordinatesMode}get wrapU(){return this._wrapU}set wrapU(e){this._wrapU=e}get wrapV(){return this._wrapV}set wrapV(e){this._wrapV=e}get isCube(){return this._texture?this._texture.isCube:this._isCube}set isCube(e){this._texture?this._texture.isCube=e:this._isCube=e}get is3D(){return this._texture?this._texture.is3D:!1}set is3D(e){this._texture&&(this._texture.is3D=e)}get is2DArray(){return this._texture?this._texture.is2DArray:!1}set is2DArray(e){this._texture&&(this._texture.is2DArray=e)}get gammaSpace(){if(this._texture)this._texture._gammaSpace===null&&(this._texture._gammaSpace=this._gammaSpace);else return this._gammaSpace;return this._texture._gammaSpace&&!this._texture._useSRGBBuffer}set gammaSpace(e){if(this._texture){if(this._texture._gammaSpace===e)return;this._texture._gammaSpace=e}else{if(this._gammaSpace===e)return;this._gammaSpace=e}this._markAllSubMeshesAsTexturesDirty()}get isRGBD(){return this._texture!=null&&this._texture._isRGBD}set isRGBD(e){this._texture&&(this._texture._isRGBD=e)}get noMipmap(){return!1}get lodGenerationOffset(){return this._texture?this._texture._lodGenerationOffset:0}set lodGenerationOffset(e){this._texture&&(this._texture._lodGenerationOffset=e)}get lodGenerationScale(){return this._texture?this._texture._lodGenerationScale:0}set lodGenerationScale(e){this._texture&&(this._texture._lodGenerationScale=e)}get linearSpecularLOD(){return this._texture?this._texture._linearSpecularLOD:!1}set linearSpecularLOD(e){this._texture&&(this._texture._linearSpecularLOD=e)}get irradianceTexture(){return this._texture?this._texture._irradianceTexture:null}set irradianceTexture(e){this._texture&&(this._texture._irradianceTexture=e)}get uid(){return this._uid||(this._uid=Vt()),this._uid}toString(){return this.name}getClassName(){return"BaseTexture"}set onDispose(e){this._onDisposeObserver&&this.onDisposeObservable.remove(this._onDisposeObserver),this._onDisposeObserver=this.onDisposeObservable.add(e)}get isBlocking(){return!0}get loadingError(){return this._loadingError}get errorObject(){return this._errorObject}constructor(e,t=null){super(null),this.metadata=null,this.reservedDataStore=null,this._hasAlpha=!1,this._getAlphaFromRGB=!1,this.level=1,this._coordinatesIndex=0,this.optimizeUVAllocation=!0,this._coordinatesMode=0,this.wrapR=1,this.anisotropicFilteringLevel=G.DEFAULT_ANISOTROPIC_FILTERING_LEVEL,this._isCube=!1,this._gammaSpace=!0,this.invertZ=!1,this.lodLevelInAlpha=!1,this.isRenderTarget=!1,this._prefiltered=!1,this._forceSerialize=!1,this.animations=new Array,this.onDisposeObservable=new ze,this._onDisposeObserver=null,this._scene=null,this._uid=null,this._parentContainer=null,this._loadingError=!1,e?G._IsScene(e)?this._scene=e:this._engine=e:this._scene=Ce.LastCreatedScene,this._scene&&(this.uniqueId=this._scene.getUniqueId(),this._scene.addTexture(this),this._engine=this._scene.getEngine()),this._texture=t,this._uid=null}getScene(){return this._scene}_getEngine(){return this._engine}checkTransformsAreIdentical(e){return e!==null}getTextureMatrix(){return W.IdentityReadOnly}getReflectionTextureMatrix(){return W.IdentityReadOnly}getRefractionTextureMatrix(){return this.getReflectionTextureMatrix()}isReadyOrNotBlocking(){return!this.isBlocking||this.isReady()||this.loadingError}scale(e){}get canRescale(){return!1}_getFromCache(e,t,i,s,r,l){const n=this._getEngine();if(!n)return null;const h=n._getUseSRGBBuffer(!!r,t),f=n.getLoadedTexturesCache();for(let c=0;c<f.length;c++){const a=f[c];if((r===void 0||h===a._useSRGBBuffer)&&(s===void 0||s===a.invertY)&&a.url===e&&a.generateMipMaps===!t&&(!i||i===a.samplingMode)&&(l===void 0||l===a.isCube))return a.incrementReferences(),a}return null}_rebuild(){}clone(){return null}get textureType(){return this._texture&&this._texture.type!==void 0?this._texture.type:0}get textureFormat(){return this._texture&&this._texture.format!==void 0?this._texture.format:5}_markAllSubMeshesAsTexturesDirty(){const e=this.getScene();e&&e.markAllMaterialsAsDirty(1)}readPixels(e=0,t=0,i=null,s=!0,r=!1,l=0,n=0,h=Number.MAX_VALUE,f=Number.MAX_VALUE){if(!this._texture)return null;const c=this._getEngine();if(!c)return null;const a=this.getSize();let d=a.width,p=a.height;t!==0&&(d=d/Math.pow(2,t),p=p/Math.pow(2,t),d=Math.round(d),p=Math.round(p)),h=Math.min(d,h),f=Math.min(p,f);try{return this._texture.isCube?c._readTexturePixels(this._texture,h,f,e,t,i,s,r,l,n):c._readTexturePixels(this._texture,h,f,-1,t,i,s,r,l,n)}catch{return null}}_readPixelsSync(e=0,t=0,i=null,s=!0,r=!1){if(!this._texture)return null;const l=this.getSize();let n=l.width,h=l.height;const f=this._getEngine();if(!f)return null;t!=0&&(n=n/Math.pow(2,t),h=h/Math.pow(2,t),n=Math.round(n),h=Math.round(h));try{return this._texture.isCube?f._readTexturePixelsSync(this._texture,n,h,e,t,i,s,r):f._readTexturePixelsSync(this._texture,n,h,-1,t,i,s,r)}catch{return null}}get _lodTextureHigh(){return this._texture?this._texture._lodTextureHigh:null}get _lodTextureMid(){return this._texture?this._texture._lodTextureMid:null}get _lodTextureLow(){return this._texture?this._texture._lodTextureLow:null}dispose(){if(this._scene){this._scene.stopAnimation&&this._scene.stopAnimation(this),this._scene.removePendingData(this);const e=this._scene.textures.indexOf(this);if(e>=0&&this._scene.textures.splice(e,1),this._scene.onTextureRemovedObservable.notifyObservers(this),this._scene=null,this._parentContainer){const t=this._parentContainer.textures.indexOf(this);t>-1&&this._parentContainer.textures.splice(t,1),this._parentContainer=null}}this.onDisposeObservable.notifyObservers(this),this.onDisposeObservable.clear(),this.metadata=null,super.dispose()}serialize(e=!1){if(!this.name&&!e)return null;const t=q.Serialize(this);return q.AppendSerializedAnimations(this,t),t}static WhenAllReady(e,t){let i=e.length;if(i===0){t();return}for(let s=0;s<e.length;s++){const r=e[s];if(r.isReady())--i===0&&t();else{const l=r.onLoadObservable;l?l.addOnce(()=>{--i===0&&t()}):--i===0&&t()}}}static _IsScene(e){return e.getClassName()==="Scene"}}G.DEFAULT_ANISOTROPIC_FILTERING_LEVEL=4;u([g()],G.prototype,"uniqueId",void 0);u([g()],G.prototype,"name",void 0);u([g()],G.prototype,"metadata",void 0);u([g("hasAlpha")],G.prototype,"_hasAlpha",void 0);u([g("getAlphaFromRGB")],G.prototype,"_getAlphaFromRGB",void 0);u([g()],G.prototype,"level",void 0);u([g("coordinatesIndex")],G.prototype,"_coordinatesIndex",void 0);u([g()],G.prototype,"optimizeUVAllocation",void 0);u([g("coordinatesMode")],G.prototype,"_coordinatesMode",void 0);u([g()],G.prototype,"wrapU",null);u([g()],G.prototype,"wrapV",null);u([g()],G.prototype,"wrapR",void 0);u([g()],G.prototype,"anisotropicFilteringLevel",void 0);u([g()],G.prototype,"isCube",null);u([g()],G.prototype,"is3D",null);u([g()],G.prototype,"is2DArray",null);u([g()],G.prototype,"gammaSpace",null);u([g()],G.prototype,"invertZ",void 0);u([g()],G.prototype,"lodLevelInAlpha",void 0);u([g()],G.prototype,"lodGenerationOffset",null);u([g()],G.prototype,"lodGenerationScale",null);u([g()],G.prototype,"linearSpecularLOD",null);u([oe()],G.prototype,"irradianceTexture",null);u([g()],G.prototype,"isRenderTarget",void 0);function $e(o,e,t=!1){const i=e.width,s=e.height;if(o instanceof Float32Array){let f=o.byteLength/o.BYTES_PER_ELEMENT;const c=new Uint8Array(f);for(;--f>=0;){let a=o[f];a<0?a=0:a>1&&(a=1),c[f]=a*255}o=c}const r=document.createElement("canvas");r.width=i,r.height=s;const l=r.getContext("2d");if(!l)return null;const n=l.createImageData(i,s);if(n.data.set(o),l.putImageData(n,0,0),t){const f=document.createElement("canvas");f.width=i,f.height=s;const c=f.getContext("2d");return c?(c.translate(0,s),c.scale(1,-1),c.drawImage(r,0,0),f.toDataURL("image/png")):null}return r.toDataURL("image/png")}function ut(o,e=0,t=0){const i=o.getInternalTexture();if(!i)return null;const s=o._readPixelsSync(e,t);return s?$e(s,o.getSize(),i.invertY):null}async function mt(o,e=0,t=0){const i=o.getInternalTexture();if(!i)return null;const s=await o.readPixels(e,t);return s?$e(s,o.getSize(),i.invertY):null}const Rs={GenerateBase64StringFromPixelData:$e,GenerateBase64StringFromTexture:ut,GenerateBase64StringFromTextureAsync:mt};class v extends G{get noMipmap(){return this._noMipmap}get mimeType(){return this._mimeType}set isBlocking(e){this._isBlocking=e}get isBlocking(){return this._isBlocking}get invertY(){return this._invertY}constructor(e,t,i,s,r=v.TRILINEAR_SAMPLINGMODE,l=null,n=null,h=null,f=!1,c,a,d,p,E){var S,x,I,C,_,T,R,X,M;super(t),this.url=null,this.uOffset=0,this.vOffset=0,this.uScale=1,this.vScale=1,this.uAng=0,this.vAng=0,this.wAng=0,this.uRotationCenter=.5,this.vRotationCenter=.5,this.wRotationCenter=.5,this.homogeneousRotationInUVTransform=!1,this.inspectableCustomProperties=null,this._noMipmap=!1,this._invertY=!1,this._rowGenerationMatrix=null,this._cachedTextureMatrix=null,this._projectionModeMatrix=null,this._t0=null,this._t1=null,this._t2=null,this._cachedUOffset=-1,this._cachedVOffset=-1,this._cachedUScale=0,this._cachedVScale=0,this._cachedUAng=-1,this._cachedVAng=-1,this._cachedWAng=-1,this._cachedReflectionProjectionMatrixId=-1,this._cachedURotationCenter=-1,this._cachedVRotationCenter=-1,this._cachedWRotationCenter=-1,this._cachedHomogeneousRotationInUVTransform=!1,this._cachedReflectionTextureMatrix=null,this._cachedReflectionUOffset=-1,this._cachedReflectionVOffset=-1,this._cachedReflectionUScale=0,this._cachedReflectionVScale=0,this._cachedReflectionCoordinatesMode=-1,this._buffer=null,this._deleteBuffer=!1,this._format=null,this._delayedOnLoad=null,this._delayedOnError=null,this.onLoadObservable=new ze,this._isBlocking=!0,this.name=e||"",this.url=e;let N,P=!1,V=null;typeof i=="object"&&i!==null?(N=(S=i.noMipmap)!==null&&S!==void 0?S:!1,s=(x=i.invertY)!==null&&x!==void 0?x:!j.UseOpenGLOrientationForUV,r=(I=i.samplingMode)!==null&&I!==void 0?I:v.TRILINEAR_SAMPLINGMODE,l=(C=i.onLoad)!==null&&C!==void 0?C:null,n=(_=i.onError)!==null&&_!==void 0?_:null,h=(T=i.buffer)!==null&&T!==void 0?T:null,f=(R=i.deleteBuffer)!==null&&R!==void 0?R:!1,c=i.format,a=i.mimeType,d=i.loaderOptions,p=i.creationFlags,P=(X=i.useSRGBBuffer)!==null&&X!==void 0?X:!1,V=(M=i.internalTexture)!==null&&M!==void 0?M:null):N=!!i,this._noMipmap=N,this._invertY=s===void 0?!j.UseOpenGLOrientationForUV:s,this._initialSamplingMode=r,this._buffer=h,this._deleteBuffer=f,this._mimeType=a,this._loaderOptions=d,this._creationFlags=p,this._useSRGBBuffer=P,this._forcedExtension=E,c&&(this._format=c);const z=this.getScene(),B=this._getEngine();if(!B)return;B.onBeforeTextureInitObservable.notifyObservers(this);const le=()=>{this._texture&&(this._texture._invertVScale&&(this.vScale*=-1,this.vOffset+=1),this._texture._cachedWrapU!==null&&(this.wrapU=this._texture._cachedWrapU,this._texture._cachedWrapU=null),this._texture._cachedWrapV!==null&&(this.wrapV=this._texture._cachedWrapV,this._texture._cachedWrapV=null),this._texture._cachedWrapR!==null&&(this.wrapR=this._texture._cachedWrapR,this._texture._cachedWrapR=null)),this.onLoadObservable.hasObservers()&&this.onLoadObservable.notifyObservers(this),l&&l(),!this.isBlocking&&z&&z.resetCachedMaterial()},he=(H,ue)=>{this._loadingError=!0,this._errorObject={message:H,exception:ue},n&&n(H,ue),v.OnTextureLoadErrorObservable.notifyObservers(this)};if(!this.url&&!V){this._delayedOnLoad=le,this._delayedOnError=he;return}if(this._texture=V??this._getFromCache(this.url,N,r,this._invertY,P),this._texture)if(this._texture.isReady)at.SetImmediate(()=>le());else{const H=this._texture.onLoadedObservable.add(le);this._texture.onErrorObservable.add(ue=>{var Z;he(ue.message,ue.exception),(Z=this._texture)===null||Z===void 0||Z.onLoadedObservable.remove(H)})}else if(!z||!z.useDelayedTextureLoading){try{this._texture=B.createTexture(this.url,N,this._invertY,z,r,le,he,this._buffer,void 0,this._format,this._forcedExtension,a,d,p,P)}catch(H){throw he("error loading",H),H}f&&(this._buffer=null)}else this.delayLoadState=4,this._delayedOnLoad=le,this._delayedOnError=he}updateURL(e,t=null,i,s){this.url&&(this.releaseInternalTexture(),this.getScene().markAllMaterialsAsDirty(1)),(!this.name||this.name.startsWith("data:"))&&(this.name=e),this.url=e,this._buffer=t,this._forcedExtension=s,this.delayLoadState=4,i&&(this._delayedOnLoad=i),this.delayLoad()}delayLoad(){if(this.delayLoadState!==4)return;const e=this.getScene();e&&(this.delayLoadState=1,this._texture=this._getFromCache(this.url,this._noMipmap,this.samplingMode,this._invertY,this._useSRGBBuffer),this._texture?this._delayedOnLoad&&(this._texture.isReady?at.SetImmediate(this._delayedOnLoad):this._texture.onLoadedObservable.add(this._delayedOnLoad)):(this._texture=e.getEngine().createTexture(this.url,this._noMipmap,this._invertY,e,this.samplingMode,this._delayedOnLoad,this._delayedOnError,this._buffer,null,this._format,this._forcedExtension,this._mimeType,this._loaderOptions,this._creationFlags,this._useSRGBBuffer),this._deleteBuffer&&(this._buffer=null)),this._delayedOnLoad=null,this._delayedOnError=null)}_prepareRowForTextureGeneration(e,t,i,s){e*=this._cachedUScale,t*=this._cachedVScale,e-=this.uRotationCenter*this._cachedUScale,t-=this.vRotationCenter*this._cachedVScale,i-=this.wRotationCenter,y.TransformCoordinatesFromFloatsToRef(e,t,i,this._rowGenerationMatrix,s),s.x+=this.uRotationCenter*this._cachedUScale+this._cachedUOffset,s.y+=this.vRotationCenter*this._cachedVScale+this._cachedVOffset,s.z+=this.wRotationCenter}checkTransformsAreIdentical(e){return e!==null&&this.uOffset===e.uOffset&&this.vOffset===e.vOffset&&this.uScale===e.uScale&&this.vScale===e.vScale&&this.uAng===e.uAng&&this.vAng===e.vAng&&this.wAng===e.wAng}getTextureMatrix(e=1){if(this.uOffset===this._cachedUOffset&&this.vOffset===this._cachedVOffset&&this.uScale*e===this._cachedUScale&&this.vScale===this._cachedVScale&&this.uAng===this._cachedUAng&&this.vAng===this._cachedVAng&&this.wAng===this._cachedWAng&&this.uRotationCenter===this._cachedURotationCenter&&this.vRotationCenter===this._cachedVRotationCenter&&this.wRotationCenter===this._cachedWRotationCenter&&this.homogeneousRotationInUVTransform===this._cachedHomogeneousRotationInUVTransform)return this._cachedTextureMatrix;this._cachedUOffset=this.uOffset,this._cachedVOffset=this.vOffset,this._cachedUScale=this.uScale*e,this._cachedVScale=this.vScale,this._cachedUAng=this.uAng,this._cachedVAng=this.vAng,this._cachedWAng=this.wAng,this._cachedURotationCenter=this.uRotationCenter,this._cachedVRotationCenter=this.vRotationCenter,this._cachedWRotationCenter=this.wRotationCenter,this._cachedHomogeneousRotationInUVTransform=this.homogeneousRotationInUVTransform,(!this._cachedTextureMatrix||!this._rowGenerationMatrix)&&(this._cachedTextureMatrix=W.Zero(),this._rowGenerationMatrix=new W,this._t0=y.Zero(),this._t1=y.Zero(),this._t2=y.Zero()),W.RotationYawPitchRollToRef(this.vAng,this.uAng,this.wAng,this._rowGenerationMatrix),this.homogeneousRotationInUVTransform?(W.TranslationToRef(-this._cachedURotationCenter,-this._cachedVRotationCenter,-this._cachedWRotationCenter,Y.Matrix[0]),W.TranslationToRef(this._cachedURotationCenter,this._cachedVRotationCenter,this._cachedWRotationCenter,Y.Matrix[1]),W.ScalingToRef(this._cachedUScale,this._cachedVScale,0,Y.Matrix[2]),W.TranslationToRef(this._cachedUOffset,this._cachedVOffset,0,Y.Matrix[3]),Y.Matrix[0].multiplyToRef(this._rowGenerationMatrix,this._cachedTextureMatrix),this._cachedTextureMatrix.multiplyToRef(Y.Matrix[1],this._cachedTextureMatrix),this._cachedTextureMatrix.multiplyToRef(Y.Matrix[2],this._cachedTextureMatrix),this._cachedTextureMatrix.multiplyToRef(Y.Matrix[3],this._cachedTextureMatrix),this._cachedTextureMatrix.setRowFromFloats(2,this._cachedTextureMatrix.m[12],this._cachedTextureMatrix.m[13],this._cachedTextureMatrix.m[14],1)):(this._prepareRowForTextureGeneration(0,0,0,this._t0),this._prepareRowForTextureGeneration(1,0,0,this._t1),this._prepareRowForTextureGeneration(0,1,0,this._t2),this._t1.subtractInPlace(this._t0),this._t2.subtractInPlace(this._t0),W.FromValuesToRef(this._t1.x,this._t1.y,this._t1.z,0,this._t2.x,this._t2.y,this._t2.z,0,this._t0.x,this._t0.y,this._t0.z,0,0,0,0,1,this._cachedTextureMatrix));const t=this.getScene();return t?(this.optimizeUVAllocation&&t.markAllMaterialsAsDirty(1,i=>i.hasTexture(this)),this._cachedTextureMatrix):this._cachedTextureMatrix}getReflectionTextureMatrix(){const e=this.getScene();if(!e)return this._cachedReflectionTextureMatrix;if(this.uOffset===this._cachedReflectionUOffset&&this.vOffset===this._cachedReflectionVOffset&&this.uScale===this._cachedReflectionUScale&&this.vScale===this._cachedReflectionVScale&&this.coordinatesMode===this._cachedReflectionCoordinatesMode)if(this.coordinatesMode===v.PROJECTION_MODE){if(this._cachedReflectionProjectionMatrixId===e.getProjectionMatrix().updateFlag)return this._cachedReflectionTextureMatrix}else return this._cachedReflectionTextureMatrix;this._cachedReflectionTextureMatrix||(this._cachedReflectionTextureMatrix=W.Zero()),this._projectionModeMatrix||(this._projectionModeMatrix=W.Zero());const t=this._cachedReflectionCoordinatesMode!==this.coordinatesMode;switch(this._cachedReflectionUOffset=this.uOffset,this._cachedReflectionVOffset=this.vOffset,this._cachedReflectionUScale=this.uScale,this._cachedReflectionVScale=this.vScale,this._cachedReflectionCoordinatesMode=this.coordinatesMode,this.coordinatesMode){case v.PLANAR_MODE:{W.IdentityToRef(this._cachedReflectionTextureMatrix),this._cachedReflectionTextureMatrix[0]=this.uScale,this._cachedReflectionTextureMatrix[5]=this.vScale,this._cachedReflectionTextureMatrix[12]=this.uOffset,this._cachedReflectionTextureMatrix[13]=this.vOffset;break}case v.PROJECTION_MODE:{W.FromValuesToRef(.5,0,0,0,0,-.5,0,0,0,0,0,0,.5,.5,1,1,this._projectionModeMatrix);const i=e.getProjectionMatrix();this._cachedReflectionProjectionMatrixId=i.updateFlag,i.multiplyToRef(this._projectionModeMatrix,this._cachedReflectionTextureMatrix);break}default:W.IdentityToRef(this._cachedReflectionTextureMatrix);break}return t&&e.markAllMaterialsAsDirty(1,i=>i.getActiveTextures().indexOf(this)!==-1),this._cachedReflectionTextureMatrix}clone(){const e={noMipmap:this._noMipmap,invertY:this._invertY,samplingMode:this.samplingMode,onLoad:void 0,onError:void 0,buffer:this._texture?this._texture._buffer:void 0,deleteBuffer:this._deleteBuffer,format:this.textureFormat,mimeType:this.mimeType,loaderOptions:this._loaderOptions,creationFlags:this._creationFlags,useSRGBBuffer:this._useSRGBBuffer};return q.Clone(()=>new v(this._texture?this._texture.url:null,this.getScene(),e),this)}serialize(){var e,t;const i=this.name;v.SerializeBuffers||this.name.startsWith("data:")&&(this.name=""),this.name.startsWith("data:")&&this.url===this.name&&(this.url="");const s=super.serialize(v._SerializeInternalTextureUniqueId);return s?((v.SerializeBuffers||v.ForceSerializeBuffers)&&(typeof this._buffer=="string"&&this._buffer.substr(0,5)==="data:"?(s.base64String=this._buffer,s.name=s.name.replace("data:","")):this.url&&this.url.startsWith("data:")&&this._buffer instanceof Uint8Array?s.base64String="data:image/png;base64,"+Bt(this._buffer):(v.ForceSerializeBuffers||this.url&&this.url.startsWith("blob:")||this._forceSerialize)&&(s.base64String=!this._engine||this._engine._features.supportSyncTextureRead?ut(this):mt(this))),s.invertY=this._invertY,s.samplingMode=this.samplingMode,s._creationFlags=this._creationFlags,s._useSRGBBuffer=this._useSRGBBuffer,v._SerializeInternalTextureUniqueId&&(s.internalTextureUniqueId=(t=(e=this._texture)===null||e===void 0?void 0:e.uniqueId)!==null&&t!==void 0?t:void 0),this.name=i,s):null}getClassName(){return"Texture"}dispose(){super.dispose(),this.onLoadObservable.clear(),this._delayedOnLoad=null,this._delayedOnError=null,this._buffer=null}static Parse(e,t,i){if(e.customType){const f=Gt.Instantiate(e.customType).Parse(e,t,i);return e.samplingMode&&f.updateSamplingMode&&f._samplingMode&&f._samplingMode!==e.samplingMode&&f.updateSamplingMode(e.samplingMode),f}if(e.isCube&&!e.isRenderTarget)return v._CubeTextureParser(e,t,i);const s=e.internalTextureUniqueId!==void 0;if(!e.name&&!e.isRenderTarget&&!s)return null;let r;if(s){const h=t.getEngine().getLoadedTexturesCache();for(const f of h)if(f.uniqueId===e.internalTextureUniqueId){r=f;break}}const l=h=>{var f;if(h&&h._texture&&(h._texture._cachedWrapU=null,h._texture._cachedWrapV=null,h._texture._cachedWrapR=null),e.samplingMode){const c=e.samplingMode;h&&h.samplingMode!==c&&h.updateSamplingMode(c)}if(h&&e.animations)for(let c=0;c<e.animations.length;c++){const a=e.animations[c],d=lt("BABYLON.Animation");d&&h.animations.push(d.Parse(a))}s&&!r&&((f=h==null?void 0:h._texture)===null||f===void 0||f._setUniqueId(e.internalTextureUniqueId))};return q.Parse(()=>{var h,f,c;let a=!0;if(e.noMipmap&&(a=!1),e.mirrorPlane){const d=v._CreateMirror(e.name,e.renderTargetSize,t,a);return d._waitingRenderList=e.renderList,d.mirrorPlane=zt.FromArray(e.mirrorPlane),l(d),d}else if(e.isRenderTarget){let d=null;if(e.isCube){if(t.reflectionProbes)for(let p=0;p<t.reflectionProbes.length;p++){const E=t.reflectionProbes[p];if(E.name===e.name)return E.cubeTexture}}else d=v._CreateRenderTargetTexture(e.name,e.renderTargetSize,t,a,(h=e._creationFlags)!==null&&h!==void 0?h:0),d._waitingRenderList=e.renderList;return l(d),d}else{let d;if(e.base64String&&!r)d=v.CreateFromBase64String(e.base64String,e.base64String,t,!a,e.invertY,e.samplingMode,()=>{l(d)},(f=e._creationFlags)!==null&&f!==void 0?f:0,(c=e._useSRGBBuffer)!==null&&c!==void 0?c:!1),d.name=e.name;else{let p;e.name&&(e.name.indexOf("://")>0||e.name.startsWith("data:"))?p=e.name:p=i+e.name,e.url&&(e.url.startsWith("data:")||v.UseSerializedUrlIfAny)&&(p=e.url);const E={noMipmap:!a,invertY:e.invertY,samplingMode:e.samplingMode,onLoad:()=>{l(d)},internalTexture:r};d=new v(p,t,E)}return d}},e,t)}static CreateFromBase64String(e,t,i,s,r,l=v.TRILINEAR_SAMPLINGMODE,n=null,h=null,f=5,c){return new v("data:"+t,i,s,r,l,n,h,e,!1,f,void 0,void 0,c)}static LoadFromDataString(e,t,i,s=!1,r,l=!0,n=v.TRILINEAR_SAMPLINGMODE,h=null,f=null,c=5,a){return e.substr(0,5)!=="data:"&&(e="data:"+e),new v(e,i,r,l,n,h,f,t,s,c,void 0,void 0,a)}}v.SerializeBuffers=!0;v.ForceSerializeBuffers=!1;v.OnTextureLoadErrorObservable=new ze;v._SerializeInternalTextureUniqueId=!1;v._CubeTextureParser=(o,e,t)=>{throw We("CubeTexture")};v._CreateMirror=(o,e,t,i)=>{throw We("MirrorTexture")};v._CreateRenderTargetTexture=(o,e,t,i,s)=>{throw We("RenderTargetTexture")};v.NEAREST_SAMPLINGMODE=1;v.NEAREST_NEAREST_MIPLINEAR=8;v.BILINEAR_SAMPLINGMODE=2;v.LINEAR_LINEAR_MIPNEAREST=11;v.TRILINEAR_SAMPLINGMODE=3;v.LINEAR_LINEAR_MIPLINEAR=3;v.NEAREST_NEAREST_MIPNEAREST=4;v.NEAREST_LINEAR_MIPNEAREST=5;v.NEAREST_LINEAR_MIPLINEAR=6;v.NEAREST_LINEAR=7;v.NEAREST_NEAREST=1;v.LINEAR_NEAREST_MIPNEAREST=9;v.LINEAR_NEAREST_MIPLINEAR=10;v.LINEAR_LINEAR=2;v.LINEAR_NEAREST=12;v.EXPLICIT_MODE=0;v.SPHERICAL_MODE=1;v.PLANAR_MODE=2;v.CUBIC_MODE=3;v.PROJECTION_MODE=4;v.SKYBOX_MODE=5;v.INVCUBIC_MODE=6;v.EQUIRECTANGULAR_MODE=7;v.FIXED_EQUIRECTANGULAR_MODE=8;v.FIXED_EQUIRECTANGULAR_MIRRORED_MODE=9;v.CLAMP_ADDRESSMODE=0;v.WRAP_ADDRESSMODE=1;v.MIRROR_ADDRESSMODE=2;v.UseSerializedUrlIfAny=!1;u([g()],v.prototype,"url",void 0);u([g()],v.prototype,"uOffset",void 0);u([g()],v.prototype,"vOffset",void 0);u([g()],v.prototype,"uScale",void 0);u([g()],v.prototype,"vScale",void 0);u([g()],v.prototype,"uAng",void 0);u([g()],v.prototype,"vAng",void 0);u([g()],v.prototype,"wAng",void 0);u([g()],v.prototype,"uRotationCenter",void 0);u([g()],v.prototype,"vRotationCenter",void 0);u([g()],v.prototype,"wRotationCenter",void 0);u([g()],v.prototype,"homogeneousRotationInUVTransform",void 0);u([g()],v.prototype,"isBlocking",null);ke("BABYLON.Texture",v);q._TextureParser=v.Parse;class b{static get DiffuseTextureEnabled(){return this._DiffuseTextureEnabled}static set DiffuseTextureEnabled(e){this._DiffuseTextureEnabled!==e&&(this._DiffuseTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get DetailTextureEnabled(){return this._DetailTextureEnabled}static set DetailTextureEnabled(e){this._DetailTextureEnabled!==e&&(this._DetailTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get DecalMapEnabled(){return this._DecalMapEnabled}static set DecalMapEnabled(e){this._DecalMapEnabled!==e&&(this._DecalMapEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get AmbientTextureEnabled(){return this._AmbientTextureEnabled}static set AmbientTextureEnabled(e){this._AmbientTextureEnabled!==e&&(this._AmbientTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get OpacityTextureEnabled(){return this._OpacityTextureEnabled}static set OpacityTextureEnabled(e){this._OpacityTextureEnabled!==e&&(this._OpacityTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get ReflectionTextureEnabled(){return this._ReflectionTextureEnabled}static set ReflectionTextureEnabled(e){this._ReflectionTextureEnabled!==e&&(this._ReflectionTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get EmissiveTextureEnabled(){return this._EmissiveTextureEnabled}static set EmissiveTextureEnabled(e){this._EmissiveTextureEnabled!==e&&(this._EmissiveTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get SpecularTextureEnabled(){return this._SpecularTextureEnabled}static set SpecularTextureEnabled(e){this._SpecularTextureEnabled!==e&&(this._SpecularTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get BumpTextureEnabled(){return this._BumpTextureEnabled}static set BumpTextureEnabled(e){this._BumpTextureEnabled!==e&&(this._BumpTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get LightmapTextureEnabled(){return this._LightmapTextureEnabled}static set LightmapTextureEnabled(e){this._LightmapTextureEnabled!==e&&(this._LightmapTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get RefractionTextureEnabled(){return this._RefractionTextureEnabled}static set RefractionTextureEnabled(e){this._RefractionTextureEnabled!==e&&(this._RefractionTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get ColorGradingTextureEnabled(){return this._ColorGradingTextureEnabled}static set ColorGradingTextureEnabled(e){this._ColorGradingTextureEnabled!==e&&(this._ColorGradingTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get FresnelEnabled(){return this._FresnelEnabled}static set FresnelEnabled(e){this._FresnelEnabled!==e&&(this._FresnelEnabled=e,$.MarkAllMaterialsAsDirty(4))}static get ClearCoatTextureEnabled(){return this._ClearCoatTextureEnabled}static set ClearCoatTextureEnabled(e){this._ClearCoatTextureEnabled!==e&&(this._ClearCoatTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get ClearCoatBumpTextureEnabled(){return this._ClearCoatBumpTextureEnabled}static set ClearCoatBumpTextureEnabled(e){this._ClearCoatBumpTextureEnabled!==e&&(this._ClearCoatBumpTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get ClearCoatTintTextureEnabled(){return this._ClearCoatTintTextureEnabled}static set ClearCoatTintTextureEnabled(e){this._ClearCoatTintTextureEnabled!==e&&(this._ClearCoatTintTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get SheenTextureEnabled(){return this._SheenTextureEnabled}static set SheenTextureEnabled(e){this._SheenTextureEnabled!==e&&(this._SheenTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get AnisotropicTextureEnabled(){return this._AnisotropicTextureEnabled}static set AnisotropicTextureEnabled(e){this._AnisotropicTextureEnabled!==e&&(this._AnisotropicTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get ThicknessTextureEnabled(){return this._ThicknessTextureEnabled}static set ThicknessTextureEnabled(e){this._ThicknessTextureEnabled!==e&&(this._ThicknessTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get RefractionIntensityTextureEnabled(){return this._ThicknessTextureEnabled}static set RefractionIntensityTextureEnabled(e){this._RefractionIntensityTextureEnabled!==e&&(this._RefractionIntensityTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get TranslucencyIntensityTextureEnabled(){return this._ThicknessTextureEnabled}static set TranslucencyIntensityTextureEnabled(e){this._TranslucencyIntensityTextureEnabled!==e&&(this._TranslucencyIntensityTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}static get IridescenceTextureEnabled(){return this._IridescenceTextureEnabled}static set IridescenceTextureEnabled(e){this._IridescenceTextureEnabled!==e&&(this._IridescenceTextureEnabled=e,$.MarkAllMaterialsAsDirty(1))}}b._DiffuseTextureEnabled=!0;b._DetailTextureEnabled=!0;b._DecalMapEnabled=!0;b._AmbientTextureEnabled=!0;b._OpacityTextureEnabled=!0;b._ReflectionTextureEnabled=!0;b._EmissiveTextureEnabled=!0;b._SpecularTextureEnabled=!0;b._BumpTextureEnabled=!0;b._LightmapTextureEnabled=!0;b._RefractionTextureEnabled=!0;b._ColorGradingTextureEnabled=!0;b._FresnelEnabled=!0;b._ClearCoatTextureEnabled=!0;b._ClearCoatBumpTextureEnabled=!0;b._ClearCoatTintTextureEnabled=!0;b._SheenTextureEnabled=!0;b._AnisotropicTextureEnabled=!0;b._ThicknessTextureEnabled=!0;b._RefractionIntensityTextureEnabled=!0;b._TranslucencyIntensityTextureEnabled=!0;b._IridescenceTextureEnabled=!0;const ei="decalFragmentDeclaration",ti=`#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`;A.IncludesShadersStore[ei]=ti;const ii="defaultFragmentDeclaration",ri=`uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
uniform vec3 vEmissiveColor;
uniform vec3 vAmbientColor;
uniform float visibility;
#ifdef DIFFUSE
uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform vec2 vAmbientInfos;
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
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform vec2 vTangentSpaceParams;
#endif
#ifdef ALPHATEST
uniform float alphaCutOff;
#endif
#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(REFRACTION) || defined(PREPASS)
uniform mat4 view;
#endif
#ifdef REFRACTION
uniform vec4 vRefractionInfos;
#ifndef REFRACTIONMAP_3D
uniform mat4 refractionMatrix;
#endif
#ifdef REFRACTIONFRESNEL
uniform vec4 refractionLeftColor;
uniform vec4 refractionRightColor;
#endif
#if defined(USE_LOCAL_REFRACTIONMAP_CUBIC) && defined(REFRACTIONMAP_3D)
uniform vec3 vRefractionPosition;
uniform vec3 vRefractionSize; 
#endif
#endif
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;
#endif
#ifdef DIFFUSEFRESNEL
uniform vec4 diffuseLeftColor;
uniform vec4 diffuseRightColor;
#endif
#ifdef OPACITYFRESNEL
uniform vec4 opacityParts;
#endif
#ifdef EMISSIVEFRESNEL
uniform vec4 emissiveLeftColor;
uniform vec4 emissiveRightColor;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#if defined(REFLECTIONMAP_PLANAR) || defined(REFLECTIONMAP_CUBIC) || defined(REFLECTIONMAP_PROJECTION) || defined(REFLECTIONMAP_EQUIRECTANGULAR) || defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_SKYBOX)
uniform mat4 reflectionMatrix;
#endif
#ifndef REFLECTIONMAP_SKYBOX
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;
uniform vec3 vReflectionSize; 
#endif
#endif
#ifdef REFLECTIONFRESNEL
uniform vec4 reflectionLeftColor;
uniform vec4 reflectionRightColor;
#endif
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#include<decalFragmentDeclaration>
#define ADDITIONAL_FRAGMENT_DECLARATION
`;A.IncludesShadersStore[ii]=ri;const si="sceneUboDeclaration",ai=`layout(std140,column_major) uniform;
uniform Scene {
mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;
mat4 projection;
vec4 vEyePosition;
};
`;A.IncludesShadersStore[si]=ai;const ni="meshUboDeclaration",oi=`#ifdef WEBGL2
uniform mat4 world;
uniform float visibility;
#else
layout(std140,column_major) uniform;
uniform Mesh
{
mat4 world;
float visibility;
};
#endif
#define WORLD_UBO
`;A.IncludesShadersStore[ni]=oi;const li="defaultUboDeclaration",fi=`layout(std140,column_major) uniform;
uniform Material
{
vec4 diffuseLeftColor;
vec4 diffuseRightColor;
vec4 opacityParts;
vec4 reflectionLeftColor;
vec4 reflectionRightColor;
vec4 refractionLeftColor;
vec4 refractionRightColor;
vec4 emissiveLeftColor;
vec4 emissiveRightColor;
vec2 vDiffuseInfos;
vec2 vAmbientInfos;
vec2 vOpacityInfos;
vec2 vReflectionInfos;
vec3 vReflectionPosition;
vec3 vReflectionSize;
vec2 vEmissiveInfos;
vec2 vLightmapInfos;
vec2 vSpecularInfos;
vec3 vBumpInfos;
mat4 diffuseMatrix;
mat4 ambientMatrix;
mat4 opacityMatrix;
mat4 reflectionMatrix;
mat4 emissiveMatrix;
mat4 lightmapMatrix;
mat4 specularMatrix;
mat4 bumpMatrix;
vec2 vTangentSpaceParams;
float pointSize;
float alphaCutOff;
mat4 refractionMatrix;
vec4 vRefractionInfos;
vec3 vRefractionPosition;
vec3 vRefractionSize;
vec4 vSpecularColor;
vec3 vEmissiveColor;
vec4 vDiffuseColor;
vec3 vAmbientColor;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;A.IncludesShadersStore[li]=fi;const ci="prePassDeclaration",di=`#ifdef PREPASS
#extension GL_EXT_draw_buffers : require
layout(location=0) out highp vec4 glFragData[{X}];highp vec4 gl_FragColor;
#ifdef PREPASS_DEPTH
varying highp vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
varying highp vec4 vCurrentPosition;varying highp vec4 vPreviousPosition;
#endif
#endif
`;A.IncludesShadersStore[ci]=di;const hi="oitDeclaration",ui=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#extension GL_EXT_draw_buffers : require
layout(location=0) out vec2 depth; 
layout(location=1) out vec4 frontColor;
layout(location=2) out vec4 backColor;
#define MAX_DEPTH 99999.0
highp vec4 gl_FragColor;
uniform sampler2D oitDepthSampler;
uniform sampler2D oitFrontColorSampler;
#endif
`;A.IncludesShadersStore[hi]=ui;const mi="mainUVVaryingDeclaration",pi=`#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;A.IncludesShadersStore[mi]=pi;const vi="helperFunctions",_i=`const float PI=3.1415926535897932384626433832795;
const float HALF_MIN=5.96046448e-08; 
const float LinearEncodePowerApprox=2.2;
const float GammaEncodePowerApprox=1.0/LinearEncodePowerApprox;
const vec3 LuminanceEncodeApprox=vec3(0.2126,0.7152,0.0722);
const float Epsilon=0.0000001;
#define saturate(x) clamp(x,0.0,1.0)
#define absEps(x) abs(x)+Epsilon
#define maxEps(x) max(x,Epsilon)
#define saturateEps(x) clamp(x,Epsilon,1.0)
mat3 transposeMat3(mat3 inMatrix) {
vec3 i0=inMatrix[0];
vec3 i1=inMatrix[1];
vec3 i2=inMatrix[2];
mat3 outMatrix=mat3(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);
return outMatrix;
}
mat3 inverseMat3(mat3 inMatrix) {
float a00=inMatrix[0][0],a01=inMatrix[0][1],a02=inMatrix[0][2];
float a10=inMatrix[1][0],a11=inMatrix[1][1],a12=inMatrix[1][2];
float a20=inMatrix[2][0],a21=inMatrix[2][1],a22=inMatrix[2][2];
float b01=a22*a11-a12*a21;
float b11=-a22*a10+a12*a20;
float b21=a21*a10-a11*a20;
float det=a00*b01+a01*b11+a02*b21;
return mat3(b01,(-a22*a01+a02*a21),(a12*a01-a02*a11),
b11,(a22*a00-a02*a20),(-a12*a00+a02*a10),
b21,(-a21*a00+a01*a20),(a11*a00-a01*a10))/det;
}
#if USE_EXACT_SRGB_CONVERSIONS
vec3 toLinearSpaceExact(vec3 color)
{
vec3 nearZeroSection=0.0773993808*color;
vec3 remainingSection=pow(0.947867299*(color+vec3(0.055)),vec3(2.4));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.04045)));
#else
return
vec3(
color.r<=0.04045 ? nearZeroSection.r : remainingSection.r,
color.g<=0.04045 ? nearZeroSection.g : remainingSection.g,
color.b<=0.04045 ? nearZeroSection.b : remainingSection.b);
#endif
}
vec3 toGammaSpaceExact(vec3 color)
{
vec3 nearZeroSection=12.92*color;
vec3 remainingSection=1.055*pow(color,vec3(0.41666))-vec3(0.055);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.0031308)));
#else
return
vec3(
color.r<=0.0031308 ? nearZeroSection.r : remainingSection.r,
color.g<=0.0031308 ? nearZeroSection.g : remainingSection.g,
color.b<=0.0031308 ? nearZeroSection.b : remainingSection.b);
#endif
}
#endif
float toLinearSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=0.0773993808*color;
float remainingSection=pow(0.947867299*(color+0.055),2.4);
return color<=0.04045 ? nearZeroSection : remainingSection;
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
vec3 toLinearSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3(LinearEncodePowerApprox));
#endif
}
vec4 toLinearSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(LinearEncodePowerApprox)),color.a);
#endif
}
float toGammaSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=12.92*color;
float remainingSection=1.055*pow(color,0.41666)-0.055;
return color<=0.0031308 ? nearZeroSection : remainingSection;
#else
return pow(color,GammaEncodePowerApprox);
#endif
}
vec3 toGammaSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3(GammaEncodePowerApprox));
#endif
}
vec4 toGammaSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(GammaEncodePowerApprox)),color.a);
#endif
}
float square(float value)
{
return value*value;
}
vec3 square(vec3 value)
{
return value*value;
}
float pow5(float value) {
float sq=value*value;
return sq*sq*value;
}
float getLuminance(vec3 color)
{
return clamp(dot(color,LuminanceEncodeApprox),0.,1.);
}
float getRand(vec2 seed) {
return fract(sin(dot(seed.xy ,vec2(12.9898,78.233)))*43758.5453);
}
float dither(vec2 seed,float varianceAmount) {
float rand=getRand(seed);
float normVariance=varianceAmount/255.0;
float dither=mix(-normVariance,normVariance,rand);
return dither;
}
const float rgbdMaxRange=255.0;
vec4 toRGBD(vec3 color) {
float maxRGB=maxEps(max(color.r,max(color.g,color.b)));
float D =max(rgbdMaxRange/maxRGB,1.);
D =clamp(floor(D)/255.0,0.,1.);
vec3 rgb=color.rgb*D;
rgb=toGammaSpace(rgb);
return vec4(clamp(rgb,0.,1.),D); 
}
vec3 fromRGBD(vec4 rgbd) {
rgbd.rgb=toLinearSpace(rgbd.rgb);
return rgbd.rgb/rgbd.a;
}
vec3 parallaxCorrectNormal( vec3 vertexPos,vec3 origVec,vec3 cubeSize,vec3 cubePos ) {
vec3 invOrigVec=vec3(1.0,1.0,1.0)/origVec;
vec3 halfSize=cubeSize*0.5;
vec3 intersecAtMaxPlane=(cubePos+halfSize-vertexPos)*invOrigVec;
vec3 intersecAtMinPlane=(cubePos-halfSize-vertexPos)*invOrigVec;
vec3 largestIntersec=max(intersecAtMaxPlane,intersecAtMinPlane);
float distance=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);
vec3 intersectPositionWS=vertexPos+origVec*distance;
return intersectPositionWS-cubePos;
}
`;A.IncludesShadersStore[vi]=_i;const gi="lightFragmentDeclaration",Ei=`#ifdef LIGHT{X}
uniform vec4 vLightData{X};
uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float cascadeBlendFactor{X};
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
uniform highp sampler2DArray depthSampler{X};
uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);
vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X};
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};
uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};
uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};
uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};
uniform sampler2D projectionLightSampler{X};
#endif
#endif
`;A.IncludesShadersStore[gi]=Ei;const Si="lightUboDeclaration",xi=`#ifdef LIGHT{X}
uniform Light{X}
{
vec4 vLightData;
vec4 vLightDiffuse;
vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;
vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;
vec2 depthValues;
} light{X};
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};
uniform sampler2D projectionLightSampler{X};
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float cascadeBlendFactor{X};
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
uniform highp sampler2DArray depthSampler{X};
uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);
vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X}; 
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};
uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;A.IncludesShadersStore[Si]=xi;const Ti="lightsFragmentFunctions",Ai=`struct lightingInfo
{
vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef NDOTL
float ndl;
#endif
};
lightingInfo computeLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {
lightingInfo result;
vec3 lightVectorW;
float attenuation=1.0;
if (lightData.w==0.)
{
vec3 direction=lightData.xyz-vPositionW;
attenuation=max(0.,1.0-length(direction)/range);
lightVectorW=normalize(direction);
}
else
{
lightVectorW=normalize(-lightData.xyz);
}
float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor*attenuation;
#endif
return result;
}
lightingInfo computeSpotLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec4 lightDirection,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {
lightingInfo result;
vec3 direction=lightData.xyz-vPositionW;
vec3 lightVectorW=normalize(direction);
float attenuation=max(0.,1.0-length(direction)/range);
float cosAngle=max(0.,dot(lightDirection.xyz,-lightVectorW));
if (cosAngle>=lightDirection.w)
{
cosAngle=max(0.,pow(cosAngle,lightData.w));
attenuation*=cosAngle;
float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor*attenuation;
#endif
return result;
}
result.diffuse=vec3(0.);
#ifdef SPECULARTERM
result.specular=vec3(0.);
#endif
#ifdef NDOTL
result.ndl=0.;
#endif
return result;
}
lightingInfo computeHemisphericLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,vec3 groundColor,float glossiness) {
lightingInfo result;
float ndl=dot(vNormal,lightData.xyz)*0.5+0.5;
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=mix(groundColor,diffuseColor,ndl);
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightData.xyz);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor;
#endif
return result;
}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){
vec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);
strq/=strq.w;
vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;
return textureColor;
}`;A.IncludesShadersStore[Ti]=Ai;const Ii="shadowsFragmentFunctions",Ci=`#ifdef SHADOWS
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define TEXTUREFUNC(s,c,l) texture2DLodEXT(s,c,l)
#else
#define TEXTUREFUNC(s,c,b) texture2D(s,c,b)
#endif
#ifndef SHADOWFLOAT
float unpack(vec4 color)
{
const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);
return dot(color,bit_shift);
}
#endif
float computeFallOff(float value,vec2 clipSpace,float frustumEdgeFalloff)
{
float mask=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));
return mix(value,1.0,mask);
}
#define inline
float computeShadowCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadow=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadow=textureCube(shadowSampler,directionToLight).x;
#endif
return depth>shadow ? darkness : 1.0;
}
#define inline
float computeShadowWithPoissonSamplingCube(vec3 lightPosition,samplerCube shadowSampler,float mapSize,float darkness,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
float visibility=1.;
vec3 poissonDisk[4];
poissonDisk[0]=vec3(-1.0,1.0,-1.0);
poissonDisk[1]=vec3(1.0,-1.0,-1.0);
poissonDisk[2]=vec3(-1.0,-1.0,-1.0);
poissonDisk[3]=vec3(1.0,-1.0,1.0);
#ifndef SHADOWFLOAT
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) visibility-=0.25;
#else
if (textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) visibility-=0.25;
#endif
return min(1.0,visibility+darkness);
}
#define inline
float computeShadowWithESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness); 
return esm;
}
#define inline
float computeShadowWithCloseESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return esm;
}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define inline
float computeShadowCSM(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
vec3 uvLayer=vec3(uv.x,uv.y,layer);
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(texture2D(shadowSampler,uvLayer));
#else
float shadow=texture2D(shadowSampler,uvLayer).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
#endif
#define inline
float computeShadow(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadow=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
}
#define inline
float computeShadowWithPoissonSampling(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float mapSize,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
float visibility=1.;
vec2 poissonDisk[4];
poissonDisk[0]=vec2(-0.94201624,-0.39906216);
poissonDisk[1]=vec2(0.94558609,-0.76890725);
poissonDisk[2]=vec2(-0.094184101,-0.92938870);
poissonDisk[3]=vec2(0.34495938,0.29387760);
#ifndef SHADOWFLOAT
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
#else
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
#endif
return computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithCloseESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0); 
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#ifdef IS_NDC_HALF_ZRANGE
#define ZINCLIP clipSpace.z
#else
#define ZINCLIP uvDepth.z
#endif
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define GREATEST_LESS_THAN_ONE 0.99999994
#define inline
float computeShadowWithCSMPCF1(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float shadow=texture2D(shadowSampler,uvDepthLayer);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithCSMPCF3(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithCSMPCF5(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[1]),layer,uvDepth.z));
shadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[2]),layer,uvDepth.z));
shadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[2]),layer,uvDepth.z));
shadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[2]),layer,uvDepth.z));
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithPCF1(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
float shadow=TEXTUREFUNC(shadowSampler,uvDepth,0.);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCF3(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);
shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);
shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);
shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCF5(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);
shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);
shadow+=uvw2.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[0]),uvDepth.z),0.);
shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);
shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);
shadow+=uvw2.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[1]),uvDepth.z),0.);
shadow+=uvw0.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[2]),uvDepth.z),0.);
shadow+=uvw1.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[2]),uvDepth.z),0.);
shadow+=uvw2.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[2]),uvDepth.z),0.);
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
const vec3 PoissonSamplers32[64]=vec3[64](
vec3(0.06407013,0.05409927,0.),
vec3(0.7366577,0.5789394,0.),
vec3(-0.6270542,-0.5320278,0.),
vec3(-0.4096107,0.8411095,0.),
vec3(0.6849564,-0.4990818,0.),
vec3(-0.874181,-0.04579735,0.),
vec3(0.9989998,0.0009880066,0.),
vec3(-0.004920578,-0.9151649,0.),
vec3(0.1805763,0.9747483,0.),
vec3(-0.2138451,0.2635818,0.),
vec3(0.109845,0.3884785,0.),
vec3(0.06876755,-0.3581074,0.),
vec3(0.374073,-0.7661266,0.),
vec3(0.3079132,-0.1216763,0.),
vec3(-0.3794335,-0.8271583,0.),
vec3(-0.203878,-0.07715034,0.),
vec3(0.5912697,0.1469799,0.),
vec3(-0.88069,0.3031784,0.),
vec3(0.5040108,0.8283722,0.),
vec3(-0.5844124,0.5494877,0.),
vec3(0.6017799,-0.1726654,0.),
vec3(-0.5554981,0.1559997,0.),
vec3(-0.3016369,-0.3900928,0.),
vec3(-0.5550632,-0.1723762,0.),
vec3(0.925029,0.2995041,0.),
vec3(-0.2473137,0.5538505,0.),
vec3(0.9183037,-0.2862392,0.),
vec3(0.2469421,0.6718712,0.),
vec3(0.3916397,-0.4328209,0.),
vec3(-0.03576927,-0.6220032,0.),
vec3(-0.04661255,0.7995201,0.),
vec3(0.4402924,0.3640312,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.)
);
const vec3 PoissonSamplers64[64]=vec3[64](
vec3(-0.613392,0.617481,0.),
vec3(0.170019,-0.040254,0.),
vec3(-0.299417,0.791925,0.),
vec3(0.645680,0.493210,0.),
vec3(-0.651784,0.717887,0.),
vec3(0.421003,0.027070,0.),
vec3(-0.817194,-0.271096,0.),
vec3(-0.705374,-0.668203,0.),
vec3(0.977050,-0.108615,0.),
vec3(0.063326,0.142369,0.),
vec3(0.203528,0.214331,0.),
vec3(-0.667531,0.326090,0.),
vec3(-0.098422,-0.295755,0.),
vec3(-0.885922,0.215369,0.),
vec3(0.566637,0.605213,0.),
vec3(0.039766,-0.396100,0.),
vec3(0.751946,0.453352,0.),
vec3(0.078707,-0.715323,0.),
vec3(-0.075838,-0.529344,0.),
vec3(0.724479,-0.580798,0.),
vec3(0.222999,-0.215125,0.),
vec3(-0.467574,-0.405438,0.),
vec3(-0.248268,-0.814753,0.),
vec3(0.354411,-0.887570,0.),
vec3(0.175817,0.382366,0.),
vec3(0.487472,-0.063082,0.),
vec3(-0.084078,0.898312,0.),
vec3(0.488876,-0.783441,0.),
vec3(0.470016,0.217933,0.),
vec3(-0.696890,-0.549791,0.),
vec3(-0.149693,0.605762,0.),
vec3(0.034211,0.979980,0.),
vec3(0.503098,-0.308878,0.),
vec3(-0.016205,-0.872921,0.),
vec3(0.385784,-0.393902,0.),
vec3(-0.146886,-0.859249,0.),
vec3(0.643361,0.164098,0.),
vec3(0.634388,-0.049471,0.),
vec3(-0.688894,0.007843,0.),
vec3(0.464034,-0.188818,0.),
vec3(-0.440840,0.137486,0.),
vec3(0.364483,0.511704,0.),
vec3(0.034028,0.325968,0.),
vec3(0.099094,-0.308023,0.),
vec3(0.693960,-0.366253,0.),
vec3(0.678884,-0.204688,0.),
vec3(0.001801,0.780328,0.),
vec3(0.145177,-0.898984,0.),
vec3(0.062655,-0.611866,0.),
vec3(0.315226,-0.604297,0.),
vec3(-0.780145,0.486251,0.),
vec3(-0.371868,0.882138,0.),
vec3(0.200476,0.494430,0.),
vec3(-0.494552,-0.711051,0.),
vec3(0.612476,0.705252,0.),
vec3(-0.578845,-0.768792,0.),
vec3(-0.772454,-0.090976,0.),
vec3(0.504440,0.372295,0.),
vec3(0.155736,0.065157,0.),
vec3(0.391522,0.849605,0.),
vec3(-0.620106,-0.328104,0.),
vec3(0.789239,-0.419965,0.),
vec3(-0.545396,0.538133,0.),
vec3(-0.178564,-0.596057,0.)
);
#define inline
float computeShadowWithCSMPCSS(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=texture2D(depthSampler,vec3(uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer)).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
float avgBlockerDepth=sumBlockerDepth/numBlocker;
float AAOffset=shadowMapSizeInverse*10.;
float penumbraRatio=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);
vec4 filterRadius=vec4(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec4 offset=vec4(poissonSamplers[i],0.);
offset=vec4(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);
shadow+=texture2D(shadowSampler,uvDepthLayer+offset*filterRadius);
}
shadow/=float(pcfTapCount);
shadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));
shadow=mix(darkness,1.,shadow);
if (numBlocker<1.0) {
return 1.0;
}
else
{
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCSS(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=TEXTUREFUNC(depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy),0.).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
if (numBlocker<1.0) {
return 1.0;
}
else
{
float avgBlockerDepth=sumBlockerDepth/numBlocker;
float AAOffset=shadowMapSizeInverse*10.;
float penumbraRatio=((depthMetric-avgBlockerDepth)+AAOffset);
float filterRadius=penumbraRatio*lightSizeUV*shadowMapSizeInverse;
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec3 offset=poissonSamplers[i];
offset=vec3(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);
shadow+=TEXTUREFUNC(shadowSampler,uvDepth+offset*filterRadius,0.);
}
shadow/=float(pcfTapCount);
shadow=mix(shadow,1.,depthMetric-avgBlockerDepth);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
}
#define inline
float computeShadowWithPCSS16(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS32(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS64(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);
}
#define inline
float computeShadowWithCSMPCSS16(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS32(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS64(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#endif
#endif
`;A.IncludesShadersStore[Ii]=Ci;const Mi="samplerFragmentDeclaration",Ri=`#ifdef _DEFINENAME_
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
uniform sampler2D _SAMPLERNAME_Sampler;
#endif
`;A.IncludesShadersStore[Mi]=Ri;const Di="fresnelFunction",Pi=`#ifdef FRESNEL
float computeFresnelTerm(vec3 viewDirection,vec3 worldNormal,float bias,float power)
{
float fresnelTerm=pow(bias+abs(dot(viewDirection,worldNormal)),power);
return clamp(fresnelTerm,0.,1.);
}
#endif
`;A.IncludesShadersStore[Di]=Pi;const bi="reflectionFunction",Li=`vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{
float lon=atan(direction.z,direction.x);
float lat=acos(direction.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(s,t,0); 
}
vec3 computeMirroredFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{
float lon=atan(direction.z,direction.x);
float lat=acos(direction.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(1.0-s,t,0); 
}
vec3 computeEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 cameraToVertex=normalize(worldPos.xyz-eyePosition);
vec3 r=normalize(reflect(cameraToVertex,worldNormal));
r=vec3(reflectionMatrix*vec4(r,0));
float lon=atan(r.z,r.x);
float lat=acos(r.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(s,t,0);
}
vec3 computeSphericalCoords(vec4 worldPos,vec3 worldNormal,mat4 view,mat4 reflectionMatrix)
{
vec3 viewDir=normalize(vec3(view*worldPos));
vec3 viewNormal=normalize(vec3(view*vec4(worldNormal,0.0)));
vec3 r=reflect(viewDir,viewNormal);
r=vec3(reflectionMatrix*vec4(r,0));
r.z=r.z-1.0;
float m=2.0*length(r);
return vec3(r.x/m+0.5,1.0-r.y/m-0.5,0);
}
vec3 computePlanarCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 viewDir=worldPos.xyz-eyePosition;
vec3 coords=normalize(reflect(viewDir,worldNormal));
return vec3(reflectionMatrix*vec4(coords,1));
}
vec3 computeCubicCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 viewDir=normalize(worldPos.xyz-eyePosition);
vec3 coords=reflect(viewDir,worldNormal);
coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;
}
vec3 computeCubicLocalCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix,vec3 reflectionSize,vec3 reflectionPosition)
{
vec3 viewDir=normalize(worldPos.xyz-eyePosition);
vec3 coords=reflect(viewDir,worldNormal);
coords=parallaxCorrectNormal(worldPos.xyz,coords,reflectionSize,reflectionPosition);
coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;
}
vec3 computeProjectionCoords(vec4 worldPos,mat4 view,mat4 reflectionMatrix)
{
return vec3(reflectionMatrix*(view*worldPos));
}
vec3 computeSkyBoxCoords(vec3 positionW,mat4 reflectionMatrix)
{
return vec3(reflectionMatrix*vec4(positionW,1.));
}
#ifdef REFLECTION
vec3 computeReflectionCoords(vec4 worldPos,vec3 worldNormal)
{
#ifdef REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);
return computeMirroredFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);
return computeFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR
return computeEquirectangularCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SPHERICAL
return computeSphericalCoords(worldPos,worldNormal,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_PLANAR
return computePlanarCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_CUBIC
#ifdef USE_LOCAL_REFLECTIONMAP_CUBIC
return computeCubicLocalCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix,vReflectionSize,vReflectionPosition);
#else
return computeCubicCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#endif
#ifdef REFLECTIONMAP_PROJECTION
return computeProjectionCoords(worldPos,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SKYBOX
return computeSkyBoxCoords(vPositionUVW,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_EXPLICIT
return vec3(0,0,0);
#endif
}
#endif
`;A.IncludesShadersStore[bi]=Li;const Ni="imageProcessingDeclaration",yi=`#ifdef EXPOSURE
uniform float exposureLinear;
#endif
#ifdef CONTRAST
uniform float contrast;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vec2 vInverseScreenSize;
#endif
#ifdef VIGNETTE
uniform vec4 vignetteSettings1;
uniform vec4 vignetteSettings2;
#endif
#ifdef COLORCURVES
uniform vec4 vCameraColorCurveNegative;
uniform vec4 vCameraColorCurveNeutral;
uniform vec4 vCameraColorCurvePositive;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
uniform highp sampler3D txColorTransform;
#else
uniform sampler2D txColorTransform;
#endif
uniform vec4 colorTransformSettings;
#endif
#ifdef DITHER
uniform float ditherIntensity;
#endif
`;A.IncludesShadersStore[Ni]=yi;const Oi="imageProcessingFunctions",Fi=`#if defined(COLORGRADING) && !defined(COLORGRADING3D)
/** 
* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.
* sampler3dSetting.x=textureOffset (0.5/textureSize).
* sampler3dSetting.y=textureSize.
*/
#define inline
vec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)
{
float sliceSize=2.0*sampler3dSetting.x; 
#ifdef SAMPLER3DGREENDEPTH
float sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;
#else
float sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;
#endif
float sliceInteger=floor(sliceContinuous);
float sliceFraction=sliceContinuous-sliceInteger;
#ifdef SAMPLER3DGREENDEPTH
vec2 sliceUV=color.rb;
#else
vec2 sliceUV=color.rg;
#endif
sliceUV.x*=sliceSize;
sliceUV.x+=sliceInteger*sliceSize;
sliceUV=saturate(sliceUV);
vec4 slice0Color=texture2D(colorTransform,sliceUV);
sliceUV.x+=sliceSize;
sliceUV=saturate(sliceUV);
vec4 slice1Color=texture2D(colorTransform,sliceUV);
vec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);
#ifdef SAMPLER3DBGRMAP
color.rgb=result.rgb;
#else
color.rgb=result.bgr;
#endif
return color;
}
#endif
#ifdef TONEMAPPING_ACES
const mat3 ACESInputMat=mat3(
vec3(0.59719,0.07600,0.02840),
vec3(0.35458,0.90834,0.13383),
vec3(0.04823,0.01566,0.83777)
);
const mat3 ACESOutputMat=mat3(
vec3( 1.60475,-0.10208,-0.00327),
vec3(-0.53108, 1.10813,-0.07276),
vec3(-0.07367,-0.00605, 1.07602)
);
vec3 RRTAndODTFit(vec3 v)
{
vec3 a=v*(v+0.0245786)-0.000090537;
vec3 b=v*(0.983729*v+0.4329510)+0.238081;
return a/b;
}
vec3 ACESFitted(vec3 color)
{
color=ACESInputMat*color;
color=RRTAndODTFit(color);
color=ACESOutputMat*color;
color=saturate(color);
return color;
}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
vec4 applyImageProcessing(vec4 result) {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
#ifdef EXPOSURE
result.rgb*=exposureLinear;
#endif
#ifdef VIGNETTE
vec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;
viewportXY=viewportXY*2.0-1.0;
vec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);
float vignetteTerm=dot(vignetteXY1,vignetteXY1);
float vignette=pow(vignetteTerm,vignetteSettings2.w);
vec3 vignetteColor=vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
vec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);
result.rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
result.rgb=mix(vignetteColor,result.rgb,vignette);
#endif
#endif
#ifdef TONEMAPPING
#ifdef TONEMAPPING_ACES
result.rgb=ACESFitted(result.rgb);
#else
const float tonemappingCalibration=1.590579;
result.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);
#endif
#endif
result.rgb=toGammaSpace(result.rgb);
result.rgb=saturate(result.rgb);
#ifdef CONTRAST
vec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);
if (contrast<1.0) {
result.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);
} else {
result.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);
}
#endif
#ifdef COLORGRADING
vec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;
#ifdef COLORGRADING3D
vec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;
#else
vec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;
#endif
result.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);
#endif
#ifdef COLORCURVES
float luma=getLuminance(result.rgb);
vec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));
vec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;
result.rgb*=colorCurve.rgb;
result.rgb=mix(vec3(luma),result.rgb,colorCurve.a);
#endif
#ifdef DITHER
float rand=getRand(gl_FragCoord.xy*vInverseScreenSize);
float dither=mix(-ditherIntensity,ditherIntensity,rand);
result.rgb=saturate(result.rgb+vec3(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return result;
}`;A.IncludesShadersStore[Oi]=Fi;const wi="bumpFragmentMainFunctions",Ui=`#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat4 normalMatrix;
#if defined(WEBGL2) || defined(WEBGPU)
mat4 toNormalMatrix(mat4 wMatrix)
{
mat4 ret=inverse(wMatrix);
ret=transpose(ret);
ret[0][3]=0.;
ret[1][3]=0.;
ret[2][3]=0.;
ret[3]=vec4(0.,0.,0.,1.);
return ret;
}
#else
mat4 toNormalMatrix(mat4 m)
{
float
a00=m[0][0],a01=m[0][1],a02=m[0][2],a03=m[0][3],
a10=m[1][0],a11=m[1][1],a12=m[1][2],a13=m[1][3],
a20=m[2][0],a21=m[2][1],a22=m[2][2],a23=m[2][3],
a30=m[3][0],a31=m[3][1],a32=m[3][2],a33=m[3][3],
b00=a00*a11-a01*a10,
b01=a00*a12-a02*a10,
b02=a00*a13-a03*a10,
b03=a01*a12-a02*a11,
b04=a01*a13-a03*a11,
b05=a02*a13-a03*a12,
b06=a20*a31-a21*a30,
b07=a20*a32-a22*a30,
b08=a20*a33-a23*a30,
b09=a21*a32-a22*a31,
b10=a21*a33-a23*a31,
b11=a22*a33-a23*a32,
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;
mat4 mi=mat4(
a11*b11-a12*b10+a13*b09,
a02*b10-a01*b11-a03*b09,
a31*b05-a32*b04+a33*b03,
a22*b04-a21*b05-a23*b03,
a12*b08-a10*b11-a13*b07,
a00*b11-a02*b08+a03*b07,
a32*b02-a30*b05-a33*b01,
a20*b05-a22*b02+a23*b01,
a10*b10-a11*b08+a13*b06,
a01*b08-a00*b10-a03*b06,
a30*b04-a31*b02+a33*b00,
a21*b02-a20*b04-a23*b00,
a11*b07-a10*b09-a12*b06,
a00*b09-a01*b07+a02*b06,
a31*b01-a30*b03-a32*b00,
a20*b03-a21*b01+a22*b00)/det;
return mat4(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);
}
#endif
#endif
vec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)
{
#ifdef NORMALXYSCALE
normal=normalize(normal*vec3(scale,scale,1.0));
#endif
return normalize(cotangentFrame*normal);
}
vec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)
{
return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);
}
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)
{
vec3 dp1=dFdx(p);
vec3 dp2=dFdy(p);
vec2 duv1=dFdx(uv);
vec2 duv2=dFdy(uv);
vec3 dp2perp=cross(dp2,normal);
vec3 dp1perp=cross(normal,dp1);
vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;
vec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;
tangent*=tangentSpaceParams.x;
bitangent*=tangentSpaceParams.y;
float det=max(dot(tangent,tangent),dot(bitangent,bitangent));
float invmax=det==0.0 ? 0.0 : inversesqrt(det);
return mat3(tangent*invmax,bitangent*invmax,normal);
}
#endif
`;A.IncludesShadersStore[wi]=Ui;const Xi="bumpFragmentFunctions",Vi=`#if defined(BUMP)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(BUMP) && defined(PARALLAX)
const float minSamples=4.;
const float maxSamples=15.;
const int iMaxSamples=15;
vec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {
float parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;
parallaxLimit*=parallaxScale;
vec2 vOffsetDir=normalize(vViewDirCoT.xy);
vec2 vMaxOffset=vOffsetDir*parallaxLimit;
float numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));
float stepSize=1.0/numSamples;
float currRayHeight=1.0;
vec2 vCurrOffset=vec2(0,0);
vec2 vLastOffset=vec2(0,0);
float lastSampledHeight=1.0;
float currSampledHeight=1.0;
bool keepWorking=true;
for (int i=0; i<iMaxSamples; i++)
{
currSampledHeight=texture2D(bumpSampler,texCoord+vCurrOffset).w;
if (!keepWorking)
{
}
else if (currSampledHeight>currRayHeight)
{
float delta1=currSampledHeight-currRayHeight;
float delta2=(currRayHeight+stepSize)-lastSampledHeight;
float ratio=delta1/(delta1+delta2);
vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;
keepWorking=false;
}
else
{
currRayHeight-=stepSize;
vLastOffset=vCurrOffset;
vCurrOffset+=stepSize*vMaxOffset;
lastSampledHeight=currSampledHeight;
}
}
return vCurrOffset;
}
vec2 parallaxOffset(vec3 viewDir,float heightScale)
{
float height=texture2D(bumpSampler,vBumpUV).w;
vec2 texCoordOffset=heightScale*viewDir.xy*height;
return -texCoordOffset;
}
#endif
`;A.IncludesShadersStore[Xi]=Vi;const Bi="clipPlaneFragmentDeclaration",Gi=`#ifdef CLIPPLANE
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
varying float fClipDistance6;
#endif
`;A.IncludesShadersStore[Bi]=Gi;const zi="logDepthDeclaration",Wi=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;
varying float vFragmentDepth;
#endif
`;A.IncludesShadersStore[zi]=Wi;const ki="fogFragmentDeclaration",Hi=`#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828
uniform vec4 vFogInfos;
uniform vec3 vFogColor;
varying vec3 vFogDistance;
float CalcFogFactor()
{
float fogCoeff=1.0;
float fogStart=vFogInfos.y;
float fogEnd=vFogInfos.z;
float fogDensity=vFogInfos.w;
float fogDistance=length(vFogDistance);
if (FOGMODE_LINEAR==vFogInfos.x)
{
fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);
}
else if (FOGMODE_EXP==vFogInfos.x)
{
fogCoeff=1.0/pow(E,fogDistance*fogDensity);
}
else if (FOGMODE_EXP2==vFogInfos.x)
{
fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);
}
return clamp(fogCoeff,0.0,1.0);
}
#endif
`;A.IncludesShadersStore[ki]=Hi;const Yi="clipPlaneFragment",$i=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fClipDistance>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE2
else if (fClipDistance2>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE3
else if (fClipDistance3>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE4
else if (fClipDistance4>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE5
else if (fClipDistance5>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE6
else if (fClipDistance6>0.0)
{
discard;
}
#endif
`;A.IncludesShadersStore[Yi]=$i;const ji="bumpFragment",Zi=`vec2 uvOffset=vec2(0.0,0.0);
#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
float normalScale=1.0;
#elif defined(BUMP)
float normalScale=vBumpInfos.y;
#else
float normalScale=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#elif defined(BUMP)
vec2 TBNUV=gl_FrontFacing ? vBumpUV : -vBumpUV;
mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);
#else
vec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;
mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));
#endif
#elif defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#else
vec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;
mat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));
#endif
#endif
#ifdef PARALLAX
mat3 invTBN=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
uvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,vBumpUV,vBumpInfos.z);
#else
uvOffset=parallaxOffset(invTBN*viewDirectionW,vBumpInfos.z);
#endif
#endif
#ifdef DETAIL
vec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);
vec2 detailNormalRG=detailColor.wy*2.0-1.0;
float detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));
vec3 detailNormal=vec3(detailNormalRG,detailNormalB);
#endif
#ifdef BUMP
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(texture2D(bumpSampler,vBumpUV).xyz *2.0-1.0);
normalW=normalize(mat3(normalMatrix)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,texture2D(bumpSampler,vBumpUV+uvOffset).xyz,vBumpInfos.y);
#else
vec3 bumpNormal=texture2D(bumpSampler,vBumpUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal.xy*=vDetailInfos.z;
vec3 blendedNormal=normalize(vec3(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal.xy*=vDetailInfos.z;
bumpNormal+=vec3(0.0,0.0,1.0);
detailNormal*=vec3(-1.0,-1.0,1.0);
vec3 blendedNormal=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,vBumpInfos.y);
#endif
#elif defined(DETAIL)
detailNormal.xy*=vDetailInfos.z;
normalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);
#endif
`;A.IncludesShadersStore[ji]=Zi;const qi="decalFragment",Qi=`#ifdef DECAL
#ifdef GAMMADECAL
decalColor.rgb=toLinearSpace(decalColor.rgb);
#endif
#ifdef DECAL_SMOOTHALPHA
decalColor.a*=decalColor.a;
#endif
surfaceAlbedo.rgb=mix(surfaceAlbedo.rgb,decalColor.rgb,decalColor.a);
#endif
`;A.IncludesShadersStore[qi]=Qi;const Ki="depthPrePass",Ji=`#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);
return;
#endif
`;A.IncludesShadersStore[Ki]=Ji;const er="lightFragment",tr=`#ifdef LIGHT{X}
#if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})
#else
#ifdef PBR
#ifdef SPOTLIGHT{X}
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(POINTLIGHT{X})
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(HEMILIGHT{X})
preInfo=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(DIRLIGHT{X})
preInfo=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#endif
preInfo.NdotV=NdotV;
#ifdef SPOTLIGHT{X}
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);
preInfo.attenuation*=computeDirectionalLightFalloff_GLTF(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);
preInfo.attenuation*=computeDirectionalLightFalloff_Physical(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);
preInfo.attenuation*=computeDirectionalLightFalloff_Standard(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
preInfo.attenuation*=computeDirectionalLightFalloff(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#endif
#elif defined(POINTLIGHT{X})
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
#endif
#else
preInfo.attenuation=1.0;
#endif
#ifdef HEMILIGHT{X}
preInfo.roughness=roughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(roughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#ifdef IRIDESCENCE
preInfo.iridescenceIntensity=iridescenceIntensity;
#endif
#ifdef HEMILIGHT{X}
info.diffuse=computeHemisphericDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb,light{X}.vLightGround);
#elif defined(SS_TRANSLUCENCY)
info.diffuse=computeDiffuseAndTransmittedLighting(preInfo,light{X}.vLightDiffuse.rgb,subSurfaceOut.transmittance);
#else
info.diffuse=computeDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb);
#endif
#ifdef SPECULARTERM
#ifdef ANISOTROPIC
info.specular=computeAnisotropicSpecularLighting(preInfo,viewDirectionW,normalW,anisotropicOut.anisotropicTangent,anisotropicOut.anisotropicBitangent,anisotropicOut.anisotropy,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#else
info.specular=computeSpecularLighting(preInfo,normalW,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#endif
#ifdef SHEEN
#ifdef SHEEN_LINKWITHALBEDO
preInfo.roughness=sheenOut.sheenIntensity;
#else
#ifdef HEMILIGHT{X}
preInfo.roughness=sheenOut.sheenRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(sheenOut.sheenRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#endif
info.sheen=computeSheenLighting(preInfo,normalW,sheenOut.sheenColor,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#ifdef CLEARCOAT
#ifdef HEMILIGHT{X}
preInfo.roughness=clearcoatOut.clearCoatRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(clearcoatOut.clearCoatRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
info.clearCoat=computeClearCoatLighting(preInfo,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatAARoughnessFactors.x,clearcoatOut.clearCoatIntensity,light{X}.vLightDiffuse.rgb);
#ifdef CLEARCOAT_TINT
absorption=computeClearCoatLightingAbsorption(clearcoatOut.clearCoatNdotVRefract,preInfo.L,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatColor,clearcoatOut.clearCoatThickness,clearcoatOut.clearCoatIntensity);
info.diffuse*=absorption;
#ifdef SPECULARTERM
info.specular*=absorption;
#endif
#endif
info.diffuse*=info.clearCoat.w;
#ifdef SPECULARTERM
info.specular*=info.clearCoat.w;
#endif
#ifdef SHEEN
info.sheen*=info.clearCoat.w;
#endif
#endif
#else
#ifdef SPOTLIGHT{X}
info=computeSpotLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDirection,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#elif defined(HEMILIGHT{X})
info=computeHemisphericLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightGround,glossiness);
#elif defined(POINTLIGHT{X}) || defined(DIRLIGHT{X})
info=computeLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#endif
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
info.diffuse*=computeProjectionTextureDiffuseLighting(projectionLightSampler{X},textureProjectionMatrix{X});
#endif
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) 
{
#ifdef SHADOWCSM_RIGHTHANDED{X}
diff{X}=viewFrustumZ{X}[i]+vPositionFromCamera{X}.z;
#else
diff{X}=viewFrustumZ{X}[i]-vPositionFromCamera{X}.z;
#endif
if (diff{X}>=0.) {
index{X}=i;
break;
}
}
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
if (index{X}>=0)
#endif
{
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
shadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
shadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=vec3(shadow)*vCascadeColorsMultiplier{X}[index{X}];
#endif
#ifndef SHADOWCSMNOBLEND{X}
float frustumLength=frustumLengths{X}[index{X}];
float diffRatio=clamp(diff{X}/frustumLength,0.,1.)*cascadeBlendFactor{X};
if (index{X}<(SHADOWCSMNUM_CASCADES{X}-1) && diffRatio<1.)
{
index{X}+=1;
float nextShadow=0.;
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
nextShadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
nextShadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
nextShadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
shadow=mix(nextShadow,shadow,diffRatio);
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=mix(vec3(nextShadow)*vCascadeColorsMultiplier{X}[index{X}],shadowDebug{X},diffRatio);
#endif
}
#endif
}
#elif defined(SHADOWCLOSEESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithCloseESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithCloseESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPOISSON{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithPoissonSamplingCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadowWithPoissonSampling(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCF1(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCF3(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCF5(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCSS16(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCSS32(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCSS64(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#else
#if defined(SHADOWCUBE{X})
shadow=computeShadowCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadow(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#endif
#ifdef SHADOWONLY
#ifndef SHADOWINUSE
#define SHADOWINUSE
#endif
globalShadow+=shadow;
shadowLightCount+=1.0;
#endif
#else
shadow=1.;
#endif
#ifndef SHADOWONLY
#ifdef CUSTOMUSERLIGHTING
diffuseBase+=computeCustomDiffuseLighting(info,diffuseBase,shadow);
#ifdef SPECULARTERM
specularBase+=computeCustomSpecularLighting(info,specularBase,shadow);
#endif
#elif defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X})
diffuseBase+=lightmapColor.rgb*shadow;
#ifdef SPECULARTERM
#ifndef LIGHTMAPNOSPECULAR{X}
specularBase+=info.specular*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef CLEARCOAT
#ifndef LIGHTMAPNOSPECULAR{X}
clearCoatBase+=info.clearCoat.rgb*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef SHEEN
#ifndef LIGHTMAPNOSPECULAR{X}
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#else
#ifdef SHADOWCSMDEBUG{X}
diffuseBase+=info.diffuse*shadowDebug{X};
#else 
diffuseBase+=info.diffuse*shadow;
#endif
#ifdef SPECULARTERM
specularBase+=info.specular*shadow;
#endif
#ifdef CLEARCOAT
clearCoatBase+=info.clearCoat.rgb*shadow;
#endif
#ifdef SHEEN
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#endif
#endif
`;A.IncludesShadersStore[er]=tr;const ir="logDepthFragment",rr=`#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;A.IncludesShadersStore[ir]=rr;const sr="fogFragment",ar=`#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;A.IncludesShadersStore[sr]=ar;const nr="oitFragment",or=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
float fragDepth=gl_FragCoord.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
uint halfFloat=packHalf2x16(vec2(fragDepth));
vec2 full=unpackHalf2x16(halfFloat);
fragDepth=full.x;
#endif
ivec2 fragCoord=ivec2(gl_FragCoord.xy);
vec2 lastDepth=texelFetch(oitDepthSampler,fragCoord,0).rg;
vec4 lastFrontColor=texelFetch(oitFrontColorSampler,fragCoord,0);
depth.rg=vec2(-MAX_DEPTH);
frontColor=lastFrontColor;
backColor=vec4(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
float furthestDepth=-lastDepth.x;
float nearestDepth=lastDepth.y;
#else
float nearestDepth=-lastDepth.x;
float furthestDepth=lastDepth.y;
#endif
float alphaMultiplier=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return;
}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
depth.rg=vec2(-fragDepth,fragDepth);
return;
}
#endif
`;A.IncludesShadersStore[nr]=or;const lr="defaultPixelShader",fr=`#include<__decl__defaultFragment>
#if defined(BUMP) || !defined(NORMAL)
#extension GL_OES_standard_derivatives : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
#include<oitDeclaration>
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#define RECIPROCAL_PI2 0.15915494
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<samplerFragmentDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_SAMPLERNAME_,diffuse)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)
#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)
#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_SAMPLERNAME_,decal)
#ifdef REFRACTION
#ifdef REFRACTIONMAP_3D
uniform samplerCube refractionCubeSampler;
#else
uniform sampler2D refraction2DSampler;
#endif
#endif
#if defined(SPECULARTERM)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_SAMPLERNAME_,specular)
#endif
#include<fresnelFunction>
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
uniform samplerCube reflectionCubeSampler;
#else
uniform sampler2D reflection2DSampler;
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#include<reflectionFunction>
#endif
#include<imageProcessingDeclaration>
#include<imageProcessingFunctions>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
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
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(-cross(dFdx(vPositionW),dFdy(vPositionW)));
#endif
#include<bumpFragment>
#ifdef TWOSIDEDLIGHTING
normalW=gl_FrontFacing ? normalW : -normalW;
#endif
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV+uvOffset);
#if defined(ALPHATEST) && !defined(ALPHATEST_AFTERALLALPHACOMPUTATIONS)
if (baseColor.a<alphaCutOff)
discard;
#endif
#ifdef ALPHAFROMDIFFUSE
alpha*=baseColor.a;
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef DECAL
vec4 decalColor=texture2D(decalSampler,vDecalUV+uvOffset);
#include<decalFragment>(surfaceAlbedo,baseColor,GAMMADECAL,_GAMMADECAL_NOTUSED_)
#endif
#include<depthPrePass>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
#ifdef DETAIL
baseColor.rgb=baseColor.rgb*2.0*mix(0.5,detailColor.r,vDetailInfos.y);
#endif
#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE
vec3 baseAmbientColor=vec3(1.,1.,1.);
#ifdef AMBIENT
baseAmbientColor=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb*vAmbientInfos.y;
#endif
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularColor=vSpecularColor.rgb;
#ifdef SPECULAR
vec4 specularMapColor=texture2D(specularSampler,vSpecularUV+uvOffset);
specularColor=specularMapColor.rgb;
#ifdef GLOSSINESS
glossiness=glossiness*specularMapColor.a;
#endif
#endif
#else
float glossiness=0.;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
float shadow=1.;
#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec4 refractionColor=vec4(0.,0.,0.,1.);
#ifdef REFRACTION
vec3 refractionVector=normalize(refract(-viewDirectionW,normalW,vRefractionInfos.y));
#ifdef REFRACTIONMAP_3D
#ifdef USE_LOCAL_REFRACTIONMAP_CUBIC
refractionVector=parallaxCorrectNormal(vPositionW,refractionVector,vRefractionSize,vRefractionPosition);
#endif
refractionVector.y=refractionVector.y*vRefractionInfos.w;
vec4 refractionLookup=textureCube(refractionCubeSampler,refractionVector);
if (dot(refractionVector,viewDirectionW)<1.0) {
refractionColor=refractionLookup;
}
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));
vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;
refractionCoords.y=1.0-refractionCoords.y;
refractionColor=texture2D(refraction2DSampler,refractionCoords);
#endif
#ifdef RGBDREFRACTION
refractionColor.rgb=fromRGBD(refractionColor);
#endif
#ifdef IS_REFRACTION_LINEAR
refractionColor.rgb=toGammaSpace(refractionColor.rgb);
#endif
refractionColor.rgb*=vRefractionInfos.x;
#endif
vec4 reflectionColor=vec4(0.,0.,0.,1.);
#ifdef REFLECTION
vec3 vReflectionUVW=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
vReflectionUVW.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
#ifdef ROUGHNESS
float bias=vReflectionInfos.y;
#ifdef SPECULARTERM
#ifdef SPECULAR
#ifdef GLOSSINESS
bias*=(1.0-specularMapColor.a);
#endif
#endif
#endif
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW,bias);
#else
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW);
#endif
#else
vec2 coords=vReflectionUVW.xy;
#ifdef REFLECTIONMAP_PROJECTION
coords/=vReflectionUVW.z;
#endif
coords.y=1.0-coords.y;
reflectionColor=texture2D(reflection2DSampler,coords);
#endif
#ifdef RGBDREFLECTION
reflectionColor.rgb=fromRGBD(reflectionColor);
#endif
#ifdef IS_REFLECTION_LINEAR
reflectionColor.rgb=toGammaSpace(reflectionColor.rgb);
#endif
reflectionColor.rgb*=vReflectionInfos.x;
#ifdef REFLECTIONFRESNEL
float reflectionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,reflectionRightColor.a,reflectionLeftColor.a);
#ifdef REFLECTIONFRESNELFROMSPECULAR
#ifdef SPECULARTERM
reflectionColor.rgb*=specularColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#endif
#endif
#ifdef REFRACTIONFRESNEL
float refractionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,refractionRightColor.a,refractionLeftColor.a);
refractionColor.rgb*=refractionLeftColor.rgb*(1.0-refractionFresnelTerm)+refractionFresnelTerm*refractionRightColor.rgb;
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);
#ifdef OPACITYRGB
opacityMap.rgb=opacityMap.rgb*vec3(0.3,0.59,0.11);
alpha*=(opacityMap.x+opacityMap.y+opacityMap.z)* vOpacityInfos.y;
#else
alpha*=opacityMap.a*vOpacityInfos.y;
#endif
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef OPACITYFRESNEL
float opacityFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,opacityParts.z,opacityParts.w);
alpha+=opacityParts.x*(1.0-opacityFresnelTerm)+opacityFresnelTerm*opacityParts.y;
#endif
#ifdef ALPHATEST
#ifdef ALPHATEST_AFTERALLALPHACOMPUTATIONS
if (alpha<alphaCutOff)
discard;
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
vec3 emissiveColor=vEmissiveColor;
#ifdef EMISSIVE
emissiveColor+=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb*vEmissiveInfos.y;
#endif
#ifdef EMISSIVEFRESNEL
float emissiveFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,emissiveRightColor.a,emissiveLeftColor.a);
emissiveColor*=emissiveLeftColor.rgb*(1.0-emissiveFresnelTerm)+emissiveFresnelTerm*emissiveRightColor.rgb;
#endif
#ifdef DIFFUSEFRESNEL
float diffuseFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,diffuseRightColor.a,diffuseLeftColor.a);
diffuseBase*=diffuseLeftColor.rgb*(1.0-diffuseFresnelTerm)+diffuseFresnelTerm*diffuseRightColor.rgb;
#endif
#ifdef EMISSIVEASILLUMINATION
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
#ifdef LINKEMISSIVEWITHDIFFUSE
vec3 finalDiffuse=clamp((diffuseBase+emissiveColor)*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+emissiveColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#endif
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#ifdef SPECULAROVERALPHA
alpha=clamp(alpha+dot(finalSpecular,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#else
vec3 finalSpecular=vec3(0.0);
#endif
#ifdef REFLECTIONOVERALPHA
alpha=clamp(alpha+dot(reflectionColor.rgb,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#ifdef EMISSIVEASILLUMINATION
vec4 color=vec4(clamp(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+emissiveColor+refractionColor.rgb,0.0,1.0),alpha);
#else
vec4 color=vec4(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+refractionColor.rgb,alpha);
#endif
#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
color.rgb*=lightmapColor.rgb;
#else
color.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
#define CUSTOM_FRAGMENT_BEFORE_FOG
color.rgb=max(color.rgb,0.);
#include<logDepthFragment>
#include<fogFragment>
#ifdef IMAGEPROCESSINGPOSTPROCESS
color.rgb=toLinearSpace(color.rgb);
#else
#ifdef IMAGEPROCESSING
color.rgb=toLinearSpace(color.rgb);
color=applyImageProcessing(color);
#endif
#endif
color.a*=visibility;
#ifdef PREMULTIPLYALPHA
color.rgb*=color.a;
#endif
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
float writeGeometryInfo=color.a>0.4 ? 1.0 : 0.0;
gl_FragData[0]=color; 
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
#ifdef PREPASS_IRRADIANCE
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_NORMAL
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalize((view*vec4(normalW,0.0)).rgb),writeGeometryInfo); 
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#if defined(SPECULARTERM)
#if defined(SPECULAR)
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularMapColor))*writeGeometryInfo; 
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularColor),1.0)*writeGeometryInfo;
#endif
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(0.0,0.0,0.0,1.0)*writeGeometryInfo;
#endif
#endif
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=color;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {
frontColor.rgb+=color.rgb*color.a*alphaMultiplier;
frontColor.a=1.0-alphaMultiplier*(1.0-color.a);
} else {
backColor+=color;
}
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;A.ShadersStore[lr]=fr;const cr="decalVertexDeclaration",dr=`#ifdef DECAL
uniform vec4 vDecalInfos;
uniform mat4 decalMatrix;
#endif
`;A.IncludesShadersStore[cr]=dr;const hr="defaultVertexDeclaration",ur=`uniform mat4 viewProjection;
uniform mat4 view;
#ifdef DIFFUSE
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform mat4 ambientMatrix;
uniform vec2 vAmbientInfos;
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
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;
uniform mat4 specularMatrix;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform mat4 bumpMatrix;
#endif
#ifdef REFLECTION
uniform mat4 reflectionMatrix;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
uniform mat4 detailMatrix;
#endif
#include<decalVertexDeclaration>
#define ADDITIONAL_VERTEX_DECLARATION
`;A.IncludesShadersStore[hr]=ur;const mr="uvAttributeDeclaration",pr=`#ifdef UV{X}
attribute vec2 uv{X};
#endif
`;A.IncludesShadersStore[mr]=pr;const vr="bonesDeclaration",_r=`#if NUM_BONE_INFLUENCERS>0
attribute vec4 matricesIndices;
attribute vec4 matricesWeights;
#if NUM_BONE_INFLUENCERS>4
attribute vec4 matricesIndicesExtra;
attribute vec4 matricesWeightsExtra;
#endif
#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#ifdef BONETEXTURE
uniform sampler2D boneSampler;
uniform float boneTextureWidth;
#else
uniform mat4 mBones[BonesPerMesh];
#ifdef BONES_VELOCITY_ENABLED
uniform mat4 mPreviousBones[BonesPerMesh];
#endif
#endif
#ifdef BONETEXTURE
#define inline
mat4 readMatrixFromRawSampler(sampler2D smp,float index)
{
float offset=index *4.0;
float dx=1.0/boneTextureWidth;
vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),0.));
vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),0.));
vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),0.));
vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),0.));
return mat4(m0,m1,m2,m3);
}
#endif
#endif
#endif
`;A.IncludesShadersStore[vr]=_r;const gr="bakedVertexAnimationDeclaration",Er=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
uniform float bakedVertexAnimationTime;
uniform vec2 bakedVertexAnimationTextureSizeInverted;
uniform vec4 bakedVertexAnimationSettings;
uniform sampler2D bakedVertexAnimationTexture;
#ifdef INSTANCES
attribute vec4 bakedVertexAnimationSettingsInstanced;
#endif
#define inline
mat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)
{
float offset=index*4.0;
float frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;
float dx=bakedVertexAnimationTextureSizeInverted.x;
vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));
vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));
vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));
vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));
return mat4(m0,m1,m2,m3);
}
#endif
`;A.IncludesShadersStore[gr]=Er;const Sr="instancesDeclaration",xr=`#ifdef INSTANCES
attribute vec4 world0;
attribute vec4 world1;
attribute vec4 world2;
attribute vec4 world3;
#ifdef INSTANCESCOLOR
attribute vec4 instanceColor;
#endif
#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
attribute vec4 previousWorld0;
attribute vec4 previousWorld1;
attribute vec4 previousWorld2;
attribute vec4 previousWorld3;
#ifdef THIN_INSTANCES
uniform mat4 previousWorld;
#endif
#endif
#else
#if !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
uniform mat4 previousWorld;
#endif
#endif
`;A.IncludesShadersStore[Sr]=xr;const Tr="prePassVertexDeclaration",Ar=`#ifdef PREPASS
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
uniform mat4 previousViewProjection;
varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
#endif
#endif
`;A.IncludesShadersStore[Tr]=Ar;const Ir="samplerVertexDeclaration",Cr=`#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
varying vec2 v_VARYINGNAME_UV;
#endif
`;A.IncludesShadersStore[Ir]=Cr;const Mr="bumpVertexDeclaration",Rr=`#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#endif
`;A.IncludesShadersStore[Mr]=Rr;const Dr="clipPlaneVertexDeclaration",Pr=`#ifdef CLIPPLANE
uniform vec4 vClipPlane;
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
uniform vec4 vClipPlane2;
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
uniform vec4 vClipPlane3;
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
uniform vec4 vClipPlane4;
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
uniform vec4 vClipPlane5;
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
uniform vec4 vClipPlane6;
varying float fClipDistance6;
#endif
`;A.IncludesShadersStore[Dr]=Pr;const br="fogVertexDeclaration",Lr=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`;A.IncludesShadersStore[br]=Lr;const Nr="lightVxFragmentDeclaration",yr=`#ifdef LIGHT{X}
uniform vec4 vLightData{X};
uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};
uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};
uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#endif
`;A.IncludesShadersStore[Nr]=yr;const Or="lightVxUboDeclaration",Fr=`#ifdef LIGHT{X}
uniform Light{X}
{
vec4 vLightData;
vec4 vLightDiffuse;
vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;
vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;
vec2 depthValues;
} light{X};
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;A.IncludesShadersStore[Or]=Fr;const wr="morphTargetsVertexGlobalDeclaration",Ur=`#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
precision mediump sampler2DArray; 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];
uniform vec3 morphTargetTextureInfo;
uniform sampler2DArray morphTargets;
vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
float y=floor(vertexIndex/morphTargetTextureInfo.y);
float x=vertexIndex-y*morphTargetTextureInfo.y;
vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);
return texture(morphTargets,textureUV).xyz;
}
#endif
#endif
`;A.IncludesShadersStore[wr]=Ur;const Xr="morphTargetsVertexDeclaration",Vr=`#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
attribute vec3 position{X};
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#endif
#endif
`;A.IncludesShadersStore[Xr]=Vr;const Br="morphTargetsVertexGlobal",Gr=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;A.IncludesShadersStore[Br]=Gr;const zr="morphTargetsVertex",Wr=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE 
vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;
positionUpdated+=(readVector3FromRawSampler({X},vertexID)-position)*morphTargetInfluences[{X}];
vertexID+=1.0;
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler({X},vertexID) -normal)*morphTargetInfluences[{X}];
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler({X},vertexID).xy-uv)*morphTargetInfluences[{X}];
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler({X},vertexID) -tangent.xyz)*morphTargetInfluences[{X}];
#endif
#else
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;A.IncludesShadersStore[zr]=Wr;const kr="instancesVertex",Hr=`#ifdef INSTANCES
mat4 finalWorld=mat4(world0,world1,world2,world3);
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,previousWorld2,previousWorld3);
#endif
#ifdef THIN_INSTANCES
finalWorld=world*finalWorld;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
finalPreviousWorld=previousWorld*finalPreviousWorld;
#endif
#endif
#else
mat4 finalWorld=world;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=previousWorld;
#endif
#endif
`;A.IncludesShadersStore[kr]=Hr;const Yr="bonesVertex",$r=`#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#if NUM_BONE_INFLUENCERS>0
mat4 influence;
#ifdef BONETEXTURE
influence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];
#endif
#else
influence=mBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=mBones[int(matricesIndices[1])]*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=mBones[int(matricesIndices[2])]*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=mBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
#endif
finalWorld=finalWorld*influence;
#endif
#endif
`;A.IncludesShadersStore[Yr]=$r;const jr="bakedVertexAnimation",Zr=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
{
#ifdef INSTANCES
#define BVASNAME bakedVertexAnimationSettingsInstanced
#else
#define BVASNAME bakedVertexAnimationSettings
#endif
float VATStartFrame=BVASNAME.x;
float VATEndFrame=BVASNAME.y;
float VATOffsetFrame=BVASNAME.z;
float VATSpeed=BVASNAME.w;
float totalFrames=VATEndFrame-VATStartFrame+1.0;
float time=bakedVertexAnimationTime*VATSpeed/totalFrames;
float frameCorrection=time<1.0 ? 0.0 : 1.0;
float numOfFrames=totalFrames-frameCorrection;
float VATFrameNum=fract(time)*numOfFrames;
VATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);
VATFrameNum=floor(VATFrameNum);
VATFrameNum+=VATStartFrame+frameCorrection;
mat4 VATInfluence;
VATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];
#endif
finalWorld=finalWorld*VATInfluence;
}
#endif
`;A.IncludesShadersStore[jr]=Zr;const qr="prePassVertex",Qr=`#ifdef PREPASS_DEPTH
vViewPos=(view*worldPos).rgb;
#endif
#if defined(PREPASS_VELOCITY) && defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*worldPos;
#if NUM_BONE_INFLUENCERS>0
mat4 previousInfluence;
previousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
previousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];
#endif 
#if NUM_BONE_INFLUENCERS>2
previousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];
#endif 
#if NUM_BONE_INFLUENCERS>3
previousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif 
#if NUM_BONE_INFLUENCERS>5
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif 
#if NUM_BONE_INFLUENCERS>6
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif 
#if NUM_BONE_INFLUENCERS>7
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
vPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);
#else
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#endif
`;A.IncludesShadersStore[qr]=Qr;const Kr="uvVariableDeclaration",Jr=`#if !defined(UV{X}) && defined(MAINUV{X})
vec2 uv{X}=vec2(0.,0.);
#endif
#ifdef MAINUV{X}
vMainUV{X}=uv{X};
#endif
`;A.IncludesShadersStore[Kr]=Jr;const es="samplerVertexImplementation",ts=`#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
if (v_INFONAME_==0.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uvUpdated,1.0,0.0));
}
#ifdef UV2
else if (v_INFONAME_==1.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv2,1.0,0.0));
}
#endif
#ifdef UV3
else if (v_INFONAME_==2.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv3,1.0,0.0));
}
#endif
#ifdef UV4
else if (v_INFONAME_==3.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv4,1.0,0.0));
}
#endif
#ifdef UV5
else if (v_INFONAME_==4.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv5,1.0,0.0));
}
#endif
#ifdef UV6
else if (v_INFONAME_==5.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv6,1.0,0.0));
}
#endif
#endif
`;A.IncludesShadersStore[es]=ts;const is="bumpVertex",rs=`#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);
vec3 tbnTangent=normalize(tangentUpdated.xyz);
vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;
vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;A.IncludesShadersStore[is]=rs;const ss="clipPlaneVertex",as=`#ifdef CLIPPLANE
fClipDistance=dot(worldPos,vClipPlane);
#endif
#ifdef CLIPPLANE2
fClipDistance2=dot(worldPos,vClipPlane2);
#endif
#ifdef CLIPPLANE3
fClipDistance3=dot(worldPos,vClipPlane3);
#endif
#ifdef CLIPPLANE4
fClipDistance4=dot(worldPos,vClipPlane4);
#endif
#ifdef CLIPPLANE5
fClipDistance5=dot(worldPos,vClipPlane5);
#endif
#ifdef CLIPPLANE6
fClipDistance6=dot(worldPos,vClipPlane6);
#endif
`;A.IncludesShadersStore[ss]=as;const ns="fogVertex",os=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;A.IncludesShadersStore[ns]=os;const ls="shadowsVertex",fs=`#ifdef SHADOWS
#if defined(SHADOWCSM{X})
vPositionFromCamera{X}=view*worldPos;
for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) {
vPositionFromLight{X}[i]=lightMatrix{X}[i]*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}[i]=(-vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}[i]=(vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
}
#elif defined(SHADOW{X}) && !defined(SHADOWCUBE{X})
vPositionFromLight{X}=lightMatrix{X}*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}=(-vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}=(vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
#endif
#endif
`;A.IncludesShadersStore[ls]=fs;const cs="vertexColorMixing",ds=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vColor=vec4(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vColor*=color;
#else
vColor.rgb*=color.rgb;
#endif
#endif
#ifdef INSTANCESCOLOR
vColor*=instanceColor;
#endif
#endif
`;A.IncludesShadersStore[cs]=ds;const hs="pointCloudVertex",us=`#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;A.IncludesShadersStore[hs]=us;const ms="logDepthVertex",ps=`#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;
gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;A.IncludesShadersStore[ms]=ps;const vs="defaultVertexShader",_s=`#include<__decl__defaultVertex>
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
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<prePassVertexDeclaration>
#include<mainUVVaryingDeclaration>[1..7]
#include<samplerVertexDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse)
#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
#if defined(SPECULARTERM)
#include<samplerVertexDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular)
#endif
#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
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
vPositionW=vec3(worldPos);
#include<prePassVertex>
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
#include<samplerVertexImplementation>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_MATRIXNAME_,diffuse,_INFONAME_,DiffuseInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
#if defined(SPECULARTERM)
#include<samplerVertexImplementation>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_MATRIXNAME_,specular,_INFONAME_,SpecularInfos.x)
#endif
#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)
#include<bumpVertex>
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#include<pointCloudVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;A.ShadersStore[vs]=_s;class pt{constructor(){this._defines={},this._currentRank=32,this._maxRank=-1,this._mesh=null}unBindMesh(){this._mesh=null}addFallback(e,t){this._defines[e]||(e<this._currentRank&&(this._currentRank=e),e>this._maxRank&&(this._maxRank=e),this._defines[e]=new Array),this._defines[e].push(t)}addCPUSkinningFallback(e,t){this._mesh=t,e<this._currentRank&&(this._currentRank=e),e>this._maxRank&&(this._maxRank=e)}get hasMoreFallbacks(){return this._currentRank<=this._maxRank}reduce(e,t){if(this._mesh&&this._mesh.computeBonesUsingShaders&&this._mesh.numBoneInfluencers>0){this._mesh.computeBonesUsingShaders=!1,e=e.replace("#define NUM_BONE_INFLUENCERS "+this._mesh.numBoneInfluencers,"#define NUM_BONE_INFLUENCERS 0"),t._bonesComputationForcedToCPU=!0;const i=this._mesh.getScene();for(let s=0;s<i.meshes.length;s++){const r=i.meshes[s];if(!r.material){!this._mesh.material&&r.computeBonesUsingShaders&&r.numBoneInfluencers>0&&(r.computeBonesUsingShaders=!1);continue}if(!(!r.computeBonesUsingShaders||r.numBoneInfluencers===0)){if(r.material.getEffect()===t)r.computeBonesUsingShaders=!1;else if(r.subMeshes){for(const l of r.subMeshes)if(l.effect===t){r.computeBonesUsingShaders=!1;break}}}}}else{const i=this._defines[this._currentRank];if(i)for(let s=0;s<i.length;s++)e=e.replace("#define "+i[s],"");this._currentRank++}return e}}const gs=new RegExp("^([gimus]+)!");class me{constructor(e){this._plugins=[],this._activePlugins=[],this._activePluginsForExtraEvents=[],this._material=e,this._scene=e.getScene(),this._engine=this._scene.getEngine()}_addPlugin(e){for(let s=0;s<this._plugins.length;++s)if(this._plugins[s].name===e.name)return!1;if(this._material._uniformBufferLayoutBuilt)throw`The plugin "${e.name}" can't be added to the material "${this._material.name}" because this material has already been used for rendering! Please add plugins to materials before any rendering with this material occurs.`;const t=e.getClassName();me._MaterialPluginClassToMainDefine[t]||(me._MaterialPluginClassToMainDefine[t]="MATERIALPLUGIN_"+ ++me._MaterialPluginCounter),this._material._callbackPluginEventGeneric=this._handlePluginEvent.bind(this),this._plugins.push(e),this._plugins.sort((s,r)=>s.priority-r.priority),this._codeInjectionPoints={};const i={};i[me._MaterialPluginClassToMainDefine[t]]={type:"boolean",default:!0};for(const s of this._plugins)s.collectDefines(i),this._collectPointNames("vertex",s.getCustomCode("vertex")),this._collectPointNames("fragment",s.getCustomCode("fragment"));return this._defineNamesFromPlugins=i,!0}_activatePlugin(e){this._activePlugins.indexOf(e)===-1&&(this._activePlugins.push(e),this._activePlugins.sort((t,i)=>t.priority-i.priority),this._material._callbackPluginEventIsReadyForSubMesh=this._handlePluginEventIsReadyForSubMesh.bind(this),this._material._callbackPluginEventPrepareDefinesBeforeAttributes=this._handlePluginEventPrepareDefinesBeforeAttributes.bind(this),this._material._callbackPluginEventPrepareDefines=this._handlePluginEventPrepareDefines.bind(this),this._material._callbackPluginEventBindForSubMesh=this._handlePluginEventBindForSubMesh.bind(this),e.registerForExtraEvents&&(this._activePluginsForExtraEvents.push(e),this._activePluginsForExtraEvents.sort((t,i)=>t.priority-i.priority),this._material._callbackPluginEventHasRenderTargetTextures=this._handlePluginEventHasRenderTargetTextures.bind(this),this._material._callbackPluginEventFillRenderTargetTextures=this._handlePluginEventFillRenderTargetTextures.bind(this),this._material._callbackPluginEventHardBindForSubMesh=this._handlePluginEventHardBindForSubMesh.bind(this)))}getPlugin(e){for(let t=0;t<this._plugins.length;++t)if(this._plugins[t].name===e)return this._plugins[t];return null}_handlePluginEventIsReadyForSubMesh(e){let t=!0;for(const i of this._activePlugins)t=t&&i.isReadyForSubMesh(e.defines,this._scene,this._engine,e.subMesh);e.isReadyForSubMesh=t}_handlePluginEventPrepareDefinesBeforeAttributes(e){for(const t of this._activePlugins)t.prepareDefinesBeforeAttributes(e.defines,this._scene,e.mesh)}_handlePluginEventPrepareDefines(e){for(const t of this._activePlugins)t.prepareDefines(e.defines,this._scene,e.mesh)}_handlePluginEventHardBindForSubMesh(e){for(const t of this._activePluginsForExtraEvents)t.hardBindForSubMesh(this._material._uniformBuffer,this._scene,this._engine,e.subMesh)}_handlePluginEventBindForSubMesh(e){for(const t of this._activePlugins)t.bindForSubMesh(this._material._uniformBuffer,this._scene,this._engine,e.subMesh)}_handlePluginEventHasRenderTargetTextures(e){let t=!1;for(const i of this._activePluginsForExtraEvents)if(t=i.hasRenderTargetTextures(),t)break;e.hasRenderTargetTextures=t}_handlePluginEventFillRenderTargetTextures(e){for(const t of this._activePluginsForExtraEvents)t.fillRenderTargetTextures(e.renderTargets)}_handlePluginEvent(e,t){var i;switch(e){case fe.GetActiveTextures:{const s=t;for(const r of this._activePlugins)r.getActiveTextures(s.activeTextures);break}case fe.GetAnimatables:{const s=t;for(const r of this._activePlugins)r.getAnimatables(s.animatables);break}case fe.HasTexture:{const s=t;let r=!1;for(const l of this._activePlugins)if(r=l.hasTexture(s.texture),r)break;s.hasTexture=r;break}case fe.Disposed:{const s=t;for(const r of this._plugins)r.dispose(s.forceDisposeTextures);break}case fe.GetDefineNames:{const s=t;s.defineNames=this._defineNamesFromPlugins;break}case fe.PrepareEffect:{const s=t;for(const r of this._activePlugins)s.fallbackRank=r.addFallbacks(s.defines,s.fallbacks,s.fallbackRank),r.getAttributes(s.attributes,this._scene,s.mesh);this._uniformList.length>0&&s.uniforms.push(...this._uniformList),this._samplerList.length>0&&s.samplers.push(...this._samplerList),this._uboList.length>0&&s.uniformBuffersNames.push(...this._uboList),s.customCode=this._injectCustomCode(s.customCode);break}case fe.PrepareUniformBuffer:{const s=t;this._uboDeclaration="",this._vertexDeclaration="",this._fragmentDeclaration="",this._uniformList=[],this._samplerList=[],this._uboList=[];for(const r of this._plugins){const l=r.getUniforms();if(l){if(l.ubo)for(const n of l.ubo){if(n.size&&n.type){const h=(i=n.arraySize)!==null&&i!==void 0?i:0;s.ubo.addUniform(n.name,n.size,h),this._uboDeclaration+=`${n.type} ${n.name}${h>0?`[${h}]`:""};\r
`}this._uniformList.push(n.name)}l.vertex&&(this._vertexDeclaration+=l.vertex+`\r
`),l.fragment&&(this._fragmentDeclaration+=l.fragment+`\r
`)}r.getSamplers(this._samplerList),r.getUniformBuffersNames(this._uboList)}break}}}_collectPointNames(e,t){if(t)for(const i in t)this._codeInjectionPoints[e]||(this._codeInjectionPoints[e]={}),this._codeInjectionPoints[e][i]=!0}_injectCustomCode(e){return(t,i)=>{var s;e&&(i=e(t,i)),this._uboDeclaration&&(i=i.replace("#define ADDITIONAL_UBO_DECLARATION",this._uboDeclaration)),this._vertexDeclaration&&(i=i.replace("#define ADDITIONAL_VERTEX_DECLARATION",this._vertexDeclaration)),this._fragmentDeclaration&&(i=i.replace("#define ADDITIONAL_FRAGMENT_DECLARATION",this._fragmentDeclaration));const r=(s=this._codeInjectionPoints)===null||s===void 0?void 0:s[t];if(!r)return i;for(let l in r){let n="";for(const h of this._activePlugins){const f=h.getCustomCode(t);f!=null&&f[l]&&(n+=f[l]+`\r
`)}if(n.length>0)if(l.charAt(0)==="!"){l=l.substring(1);let h="g";if(l.charAt(0)==="!")h="",l=l.substring(1);else{const d=gs.exec(l);d&&d.length>=2&&(h=d[1],l=l.substring(h.length+1))}h.indexOf("g")<0&&(h+="g");const f=i,c=new RegExp(l,h);let a=c.exec(f);for(;a!==null;){let d=n;for(let p=0;p<a.length;++p)d=d.replace("$"+p,a[p]);i=i.replace(a[0],d),a=c.exec(f)}}else{const h="#define "+l;i=i.replace(h,`\r
`+n+`\r
`+h)}}return i}}}me._MaterialPluginClassToMainDefine={};me._MaterialPluginCounter=0;Ce.OnEnginesDisposedObservable.add(()=>{vt()});const pe=[];let Be=!1,Ge=null;function Ds(o,e){Be||(Ge=ce.OnEventObservable.add(i=>{for(const[,s]of pe)s(i)},fe.Created),Be=!0);const t=pe.filter(([i,s])=>i===o);t.length>0?t[0][1]=e:pe.push([o,e])}function Ps(o){for(let e=0;e<pe.length;++e)if(pe[e][0]===o)return pe.splice(e,1),pe.length===0&&vt(),!0;return!1}function vt(){pe.length=0,Be=!1,ce.OnEventObservable.remove(Ge),Ge=null}class Oe{_enable(e){e&&this._pluginManager._activatePlugin(this)}constructor(e,t,i,s,r=!0,l=!1){this.priority=500,this.registerForExtraEvents=!1,this._material=e,this.name=t,this.priority=i,e.pluginManager||(e.pluginManager=new me(e),e.onDisposeObservable.add(()=>{e.pluginManager=void 0})),this._pluginDefineNames=s,this._pluginManager=e.pluginManager,r&&this._pluginManager._addPlugin(this),l&&this._enable(!0),this.markAllDefinesAsDirty=e._dirtyCallbacks[63]}getClassName(){return"MaterialPluginBase"}isReadyForSubMesh(e,t,i,s){return!0}hardBindForSubMesh(e,t,i,s){}bindForSubMesh(e,t,i,s){}dispose(e){}getCustomCode(e){return null}collectDefines(e){if(this._pluginDefineNames)for(const t of Object.keys(this._pluginDefineNames)){if(t[0]==="_")continue;const i=typeof this._pluginDefineNames[t];e[t]={type:i==="number"?"number":i==="string"?"string":i==="boolean"?"boolean":"object",default:this._pluginDefineNames[t]}}}prepareDefinesBeforeAttributes(e,t,i){}prepareDefines(e,t,i){}hasTexture(e){return!1}hasRenderTargetTextures(){return!1}fillRenderTargetTextures(e){}getActiveTextures(e){}getAnimatables(e){}addFallbacks(e,t,i){return i}getSamplers(e){}getAttributes(e,t,i){}getUniformBuffersNames(e){}getUniforms(){return{}}copyTo(e){q.Clone(()=>e,this)}serialize(){return q.Serialize(this)}parse(e,t,i){q.Parse(()=>this,e,t,i)}}u([g()],Oe.prototype,"name",void 0);u([g()],Oe.prototype,"priority",void 0);u([g()],Oe.prototype,"registerForExtraEvents",void 0);class Es extends ft{constructor(){super(...arguments),this.DETAIL=!1,this.DETAILDIRECTUV=0,this.DETAIL_NORMALBLENDMETHOD=0}}class ge extends Oe{_markAllSubMeshesAsTexturesDirty(){this._enable(this._isEnabled),this._internalMarkAllSubMeshesAsTexturesDirty()}constructor(e,t=!0){super(e,"DetailMap",140,new Es,t),this._texture=null,this.diffuseBlendLevel=1,this.roughnessBlendLevel=1,this.bumpLevel=1,this._normalBlendMethod=ce.MATERIAL_NORMALBLENDMETHOD_WHITEOUT,this._isEnabled=!1,this.isEnabled=!1,this._internalMarkAllSubMeshesAsTexturesDirty=e._dirtyCallbacks[1]}isReadyForSubMesh(e,t,i){return this._isEnabled?!(e._areTexturesDirty&&t.texturesEnabled&&i.getCaps().standardDerivatives&&this._texture&&b.DetailTextureEnabled&&!this._texture.isReady()):!0}prepareDefines(e,t){if(this._isEnabled){e.DETAIL_NORMALBLENDMETHOD=this._normalBlendMethod;const i=t.getEngine();e._areTexturesDirty&&(i.getCaps().standardDerivatives&&this._texture&&b.DetailTextureEnabled&&this._isEnabled?(O.PrepareDefinesForMergedUV(this._texture,e,"DETAIL"),e.DETAIL_NORMALBLENDMETHOD=this._normalBlendMethod):e.DETAIL=!1)}else e.DETAIL=!1}bindForSubMesh(e,t){if(!this._isEnabled)return;const i=this._material.isFrozen;(!e.useUbo||!i||!e.isSync)&&this._texture&&b.DetailTextureEnabled&&(e.updateFloat4("vDetailInfos",this._texture.coordinatesIndex,this.diffuseBlendLevel,this.bumpLevel,this.roughnessBlendLevel),O.BindTextureMatrix(this._texture,e,"detail")),t.texturesEnabled&&this._texture&&b.DetailTextureEnabled&&e.setTexture("detailSampler",this._texture)}hasTexture(e){return this._texture===e}getActiveTextures(e){this._texture&&e.push(this._texture)}getAnimatables(e){this._texture&&this._texture.animations&&this._texture.animations.length>0&&e.push(this._texture)}dispose(e){var t;e&&((t=this._texture)===null||t===void 0||t.dispose())}getClassName(){return"DetailMapConfiguration"}getSamplers(e){e.push("detailSampler")}getUniforms(){return{ubo:[{name:"vDetailInfos",size:4,type:"vec4"},{name:"detailMatrix",size:16,type:"mat4"}]}}}u([oe("detailTexture"),w("_markAllSubMeshesAsTexturesDirty")],ge.prototype,"texture",void 0);u([g()],ge.prototype,"diffuseBlendLevel",void 0);u([g()],ge.prototype,"roughnessBlendLevel",void 0);u([g()],ge.prototype,"bumpLevel",void 0);u([g(),w("_markAllSubMeshesAsTexturesDirty")],ge.prototype,"normalBlendMethod",void 0);u([g(),w("_markAllSubMeshesAsTexturesDirty")],ge.prototype,"isEnabled",void 0);const Ue={effect:null,subMesh:null};class Ss extends ft{constructor(e){super(e),this.MAINUV1=!1,this.MAINUV2=!1,this.MAINUV3=!1,this.MAINUV4=!1,this.MAINUV5=!1,this.MAINUV6=!1,this.DIFFUSE=!1,this.DIFFUSEDIRECTUV=0,this.BAKED_VERTEX_ANIMATION_TEXTURE=!1,this.AMBIENT=!1,this.AMBIENTDIRECTUV=0,this.OPACITY=!1,this.OPACITYDIRECTUV=0,this.OPACITYRGB=!1,this.REFLECTION=!1,this.EMISSIVE=!1,this.EMISSIVEDIRECTUV=0,this.SPECULAR=!1,this.SPECULARDIRECTUV=0,this.BUMP=!1,this.BUMPDIRECTUV=0,this.PARALLAX=!1,this.PARALLAXOCCLUSION=!1,this.SPECULAROVERALPHA=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.ALPHAFROMDIFFUSE=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.DIFFUSEFRESNEL=!1,this.OPACITYFRESNEL=!1,this.REFLECTIONFRESNEL=!1,this.REFRACTIONFRESNEL=!1,this.EMISSIVEFRESNEL=!1,this.FRESNEL=!1,this.NORMAL=!1,this.TANGENT=!1,this.UV1=!1,this.UV2=!1,this.UV3=!1,this.UV4=!1,this.UV5=!1,this.UV6=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.BONETEXTURE=!1,this.BONES_VELOCITY_ENABLED=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.INSTANCESCOLOR=!1,this.GLOSSINESS=!1,this.ROUGHNESS=!1,this.EMISSIVEASILLUMINATION=!1,this.LINKEMISSIVEWITHDIFFUSE=!1,this.REFLECTIONFRESNELFROMSPECULAR=!1,this.LIGHTMAP=!1,this.LIGHTMAPDIRECTUV=0,this.OBJECTSPACE_NORMALMAP=!1,this.USELIGHTMAPASSHADOWMAP=!1,this.REFLECTIONMAP_3D=!1,this.REFLECTIONMAP_SPHERICAL=!1,this.REFLECTIONMAP_PLANAR=!1,this.REFLECTIONMAP_CUBIC=!1,this.USE_LOCAL_REFLECTIONMAP_CUBIC=!1,this.USE_LOCAL_REFRACTIONMAP_CUBIC=!1,this.REFLECTIONMAP_PROJECTION=!1,this.REFLECTIONMAP_SKYBOX=!1,this.REFLECTIONMAP_EXPLICIT=!1,this.REFLECTIONMAP_EQUIRECTANGULAR=!1,this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED=!1,this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED=!1,this.REFLECTIONMAP_OPPOSITEZ=!1,this.INVERTCUBICMAP=!1,this.LOGARITHMICDEPTH=!1,this.REFRACTION=!1,this.REFRACTIONMAP_3D=!1,this.REFLECTIONOVERALPHA=!1,this.TWOSIDEDLIGHTING=!1,this.SHADOWFLOAT=!1,this.MORPHTARGETS=!1,this.MORPHTARGETS_NORMAL=!1,this.MORPHTARGETS_TANGENT=!1,this.MORPHTARGETS_UV=!1,this.NUM_MORPH_INFLUENCERS=0,this.MORPHTARGETS_TEXTURE=!1,this.NONUNIFORMSCALING=!1,this.PREMULTIPLYALPHA=!1,this.ALPHATEST_AFTERALLALPHACOMPUTATIONS=!1,this.ALPHABLEND=!0,this.PREPASS=!1,this.PREPASS_IRRADIANCE=!1,this.PREPASS_IRRADIANCE_INDEX=-1,this.PREPASS_ALBEDO_SQRT=!1,this.PREPASS_ALBEDO_SQRT_INDEX=-1,this.PREPASS_DEPTH=!1,this.PREPASS_DEPTH_INDEX=-1,this.PREPASS_NORMAL=!1,this.PREPASS_NORMAL_INDEX=-1,this.PREPASS_POSITION=!1,this.PREPASS_POSITION_INDEX=-1,this.PREPASS_VELOCITY=!1,this.PREPASS_VELOCITY_INDEX=-1,this.PREPASS_REFLECTIVITY=!1,this.PREPASS_REFLECTIVITY_INDEX=-1,this.SCENE_MRT_COUNT=0,this.RGBDLIGHTMAP=!1,this.RGBDREFLECTION=!1,this.RGBDREFRACTION=!1,this.IMAGEPROCESSING=!1,this.VIGNETTE=!1,this.VIGNETTEBLENDMODEMULTIPLY=!1,this.VIGNETTEBLENDMODEOPAQUE=!1,this.TONEMAPPING=!1,this.TONEMAPPING_ACES=!1,this.CONTRAST=!1,this.COLORCURVES=!1,this.COLORGRADING=!1,this.COLORGRADING3D=!1,this.SAMPLER3DGREENDEPTH=!1,this.SAMPLER3DBGRMAP=!1,this.DITHER=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.MULTIVIEW=!1,this.ORDER_INDEPENDENT_TRANSPARENCY=!1,this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS=!1,this.CAMERA_ORTHOGRAPHIC=!1,this.CAMERA_PERSPECTIVE=!1,this.IS_REFLECTION_LINEAR=!1,this.IS_REFRACTION_LINEAR=!1,this.EXPOSURE=!1,this.rebuild()}setReflectionMode(e){const t=["REFLECTIONMAP_CUBIC","REFLECTIONMAP_EXPLICIT","REFLECTIONMAP_PLANAR","REFLECTIONMAP_PROJECTION","REFLECTIONMAP_PROJECTION","REFLECTIONMAP_SKYBOX","REFLECTIONMAP_SPHERICAL","REFLECTIONMAP_EQUIRECTANGULAR","REFLECTIONMAP_EQUIRECTANGULAR_FIXED","REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED"];for(const i of t)this[i]=i===e}}class m extends ht{get imageProcessingConfiguration(){return this._imageProcessingConfiguration}set imageProcessingConfiguration(e){this._attachImageProcessingConfiguration(e),this._markAllSubMeshesAsTexturesDirty()}_attachImageProcessingConfiguration(e){e!==this._imageProcessingConfiguration&&(this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),e?this._imageProcessingConfiguration=e:this._imageProcessingConfiguration=this.getScene().imageProcessingConfiguration,this._imageProcessingConfiguration&&(this._imageProcessingObserver=this._imageProcessingConfiguration.onUpdateParameters.add(()=>{this._markAllSubMeshesAsImageProcessingDirty()})))}get isPrePassCapable(){return!this.disableDepthWrite}get cameraColorCurvesEnabled(){return this.imageProcessingConfiguration.colorCurvesEnabled}set cameraColorCurvesEnabled(e){this.imageProcessingConfiguration.colorCurvesEnabled=e}get cameraColorGradingEnabled(){return this.imageProcessingConfiguration.colorGradingEnabled}set cameraColorGradingEnabled(e){this.imageProcessingConfiguration.colorGradingEnabled=e}get cameraToneMappingEnabled(){return this._imageProcessingConfiguration.toneMappingEnabled}set cameraToneMappingEnabled(e){this._imageProcessingConfiguration.toneMappingEnabled=e}get cameraExposure(){return this._imageProcessingConfiguration.exposure}set cameraExposure(e){this._imageProcessingConfiguration.exposure=e}get cameraContrast(){return this._imageProcessingConfiguration.contrast}set cameraContrast(e){this._imageProcessingConfiguration.contrast=e}get cameraColorGradingTexture(){return this._imageProcessingConfiguration.colorGradingTexture}set cameraColorGradingTexture(e){this._imageProcessingConfiguration.colorGradingTexture=e}get cameraColorCurves(){return this._imageProcessingConfiguration.colorCurves}set cameraColorCurves(e){this._imageProcessingConfiguration.colorCurves=e}get canRenderToMRT(){return!0}constructor(e,t){super(e,t),this._diffuseTexture=null,this._ambientTexture=null,this._opacityTexture=null,this._reflectionTexture=null,this._emissiveTexture=null,this._specularTexture=null,this._bumpTexture=null,this._lightmapTexture=null,this._refractionTexture=null,this.ambientColor=new K(0,0,0),this.diffuseColor=new K(1,1,1),this.specularColor=new K(1,1,1),this.emissiveColor=new K(0,0,0),this.specularPower=64,this._useAlphaFromDiffuseTexture=!1,this._useEmissiveAsIllumination=!1,this._linkEmissiveWithDiffuse=!1,this._useSpecularOverAlpha=!1,this._useReflectionOverAlpha=!1,this._disableLighting=!1,this._useObjectSpaceNormalMap=!1,this._useParallax=!1,this._useParallaxOcclusion=!1,this.parallaxScaleBias=.05,this._roughness=0,this.indexOfRefraction=.98,this.invertRefractionY=!0,this.alphaCutOff=.4,this._useLightmapAsShadowmap=!1,this._useReflectionFresnelFromSpecular=!1,this._useGlossinessFromSpecularMapAlpha=!1,this._maxSimultaneousLights=4,this._invertNormalMapX=!1,this._invertNormalMapY=!1,this._twoSidedLighting=!1,this._renderTargets=new Wt(16),this._worldViewProjectionMatrix=W.Zero(),this._globalAmbientColor=new K(0,0,0),this._cacheHasRenderTargetTextures=!1,this.detailMap=new ge(this),this._attachImageProcessingConfiguration(null),this.prePassConfiguration=new ot,this.getRenderTargetTextures=()=>(this._renderTargets.reset(),m.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget&&this._renderTargets.push(this._reflectionTexture),m.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget&&this._renderTargets.push(this._refractionTexture),this._eventInfo.renderTargets=this._renderTargets,this._callbackPluginEventFillRenderTargetTextures(this._eventInfo),this._renderTargets)}get hasRenderTargetTextures(){return m.ReflectionTextureEnabled&&this._reflectionTexture&&this._reflectionTexture.isRenderTarget||m.RefractionTextureEnabled&&this._refractionTexture&&this._refractionTexture.isRenderTarget?!0:this._cacheHasRenderTargetTextures}getClassName(){return"StandardMaterial"}get useLogarithmicDepth(){return this._useLogarithmicDepth}set useLogarithmicDepth(e){this._useLogarithmicDepth=e&&this.getScene().getEngine().getCaps().fragmentDepthSupported,this._markAllSubMeshesAsMiscDirty()}needAlphaBlending(){return this._disableAlphaBlending?!1:this.alpha<1||this._opacityTexture!=null||this._shouldUseAlphaFromDiffuseTexture()||this._opacityFresnelParameters&&this._opacityFresnelParameters.isEnabled}needAlphaTesting(){return this._forceAlphaTest?!0:this._hasAlphaChannel()&&(this._transparencyMode==null||this._transparencyMode===ce.MATERIAL_ALPHATEST)}_shouldUseAlphaFromDiffuseTexture(){return this._diffuseTexture!=null&&this._diffuseTexture.hasAlpha&&this._useAlphaFromDiffuseTexture&&this._transparencyMode!==ce.MATERIAL_OPAQUE}_hasAlphaChannel(){return this._diffuseTexture!=null&&this._diffuseTexture.hasAlpha||this._opacityTexture!=null}getAlphaTestTexture(){return this._diffuseTexture}isReadyForSubMesh(e,t,i=!1){if(this._uniformBufferLayoutBuilt||this.buildUniformLayout(),t.effect&&this.isFrozen&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===i)return!0;t.materialDefines||(this._callbackPluginEventGeneric(fe.GetDefineNames,this._eventInfo),t.materialDefines=new Ss(this._eventInfo.defineNames));const s=this.getScene(),r=t.materialDefines;if(this._isReadyForSubMesh(t))return!0;const l=s.getEngine();r._needNormals=O.PrepareDefinesForLights(s,e,r,!0,this._maxSimultaneousLights,this._disableLighting),O.PrepareDefinesForMultiview(s,r);const n=this.needAlphaBlendingForMesh(e)&&this.getScene().useOrderIndependentTransparency;if(O.PrepareDefinesForPrePass(s,r,this.canRenderToMRT&&!n),O.PrepareDefinesForOIT(s,r,n),r._areTexturesDirty){this._eventInfo.hasRenderTargetTextures=!1,this._callbackPluginEventHasRenderTargetTextures(this._eventInfo),this._cacheHasRenderTargetTextures=this._eventInfo.hasRenderTargetTextures,r._needUVs=!1;for(let f=1;f<=6;++f)r["MAINUV"+f]=!1;if(s.texturesEnabled){if(r.DIFFUSEDIRECTUV=0,r.BUMPDIRECTUV=0,r.AMBIENTDIRECTUV=0,r.OPACITYDIRECTUV=0,r.EMISSIVEDIRECTUV=0,r.SPECULARDIRECTUV=0,r.LIGHTMAPDIRECTUV=0,this._diffuseTexture&&m.DiffuseTextureEnabled)if(this._diffuseTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._diffuseTexture,r,"DIFFUSE");else return!1;else r.DIFFUSE=!1;if(this._ambientTexture&&m.AmbientTextureEnabled)if(this._ambientTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._ambientTexture,r,"AMBIENT");else return!1;else r.AMBIENT=!1;if(this._opacityTexture&&m.OpacityTextureEnabled)if(this._opacityTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._opacityTexture,r,"OPACITY"),r.OPACITYRGB=this._opacityTexture.getAlphaFromRGB;else return!1;else r.OPACITY=!1;if(this._reflectionTexture&&m.ReflectionTextureEnabled)if(this._reflectionTexture.isReadyOrNotBlocking()){switch(r._needNormals=!0,r.REFLECTION=!0,r.ROUGHNESS=this._roughness>0,r.REFLECTIONOVERALPHA=this._useReflectionOverAlpha,r.INVERTCUBICMAP=this._reflectionTexture.coordinatesMode===v.INVCUBIC_MODE,r.REFLECTIONMAP_3D=this._reflectionTexture.isCube,r.REFLECTIONMAP_OPPOSITEZ=r.REFLECTIONMAP_3D&&this.getScene().useRightHandedSystem?!this._reflectionTexture.invertZ:this._reflectionTexture.invertZ,r.RGBDREFLECTION=this._reflectionTexture.isRGBD,this._reflectionTexture.coordinatesMode){case v.EXPLICIT_MODE:r.setReflectionMode("REFLECTIONMAP_EXPLICIT");break;case v.PLANAR_MODE:r.setReflectionMode("REFLECTIONMAP_PLANAR");break;case v.PROJECTION_MODE:r.setReflectionMode("REFLECTIONMAP_PROJECTION");break;case v.SKYBOX_MODE:r.setReflectionMode("REFLECTIONMAP_SKYBOX");break;case v.SPHERICAL_MODE:r.setReflectionMode("REFLECTIONMAP_SPHERICAL");break;case v.EQUIRECTANGULAR_MODE:r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR");break;case v.FIXED_EQUIRECTANGULAR_MODE:r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR_FIXED");break;case v.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:r.setReflectionMode("REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED");break;case v.CUBIC_MODE:case v.INVCUBIC_MODE:default:r.setReflectionMode("REFLECTIONMAP_CUBIC");break}r.USE_LOCAL_REFLECTIONMAP_CUBIC=!!this._reflectionTexture.boundingBoxSize}else return!1;else r.REFLECTION=!1,r.REFLECTIONMAP_OPPOSITEZ=!1;if(this._emissiveTexture&&m.EmissiveTextureEnabled)if(this._emissiveTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._emissiveTexture,r,"EMISSIVE");else return!1;else r.EMISSIVE=!1;if(this._lightmapTexture&&m.LightmapTextureEnabled)if(this._lightmapTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._lightmapTexture,r,"LIGHTMAP"),r.USELIGHTMAPASSHADOWMAP=this._useLightmapAsShadowmap,r.RGBDLIGHTMAP=this._lightmapTexture.isRGBD;else return!1;else r.LIGHTMAP=!1;if(this._specularTexture&&m.SpecularTextureEnabled)if(this._specularTexture.isReadyOrNotBlocking())O.PrepareDefinesForMergedUV(this._specularTexture,r,"SPECULAR"),r.GLOSSINESS=this._useGlossinessFromSpecularMapAlpha;else return!1;else r.SPECULAR=!1;if(s.getEngine().getCaps().standardDerivatives&&this._bumpTexture&&m.BumpTextureEnabled){if(this._bumpTexture.isReady())O.PrepareDefinesForMergedUV(this._bumpTexture,r,"BUMP"),r.PARALLAX=this._useParallax,r.PARALLAXOCCLUSION=this._useParallaxOcclusion;else return!1;r.OBJECTSPACE_NORMALMAP=this._useObjectSpaceNormalMap}else r.BUMP=!1,r.PARALLAX=!1,r.PARALLAXOCCLUSION=!1;if(this._refractionTexture&&m.RefractionTextureEnabled)if(this._refractionTexture.isReadyOrNotBlocking())r._needUVs=!0,r.REFRACTION=!0,r.REFRACTIONMAP_3D=this._refractionTexture.isCube,r.RGBDREFRACTION=this._refractionTexture.isRGBD,r.USE_LOCAL_REFRACTIONMAP_CUBIC=!!this._refractionTexture.boundingBoxSize;else return!1;else r.REFRACTION=!1;r.TWOSIDEDLIGHTING=!this._backFaceCulling&&this._twoSidedLighting}else r.DIFFUSE=!1,r.AMBIENT=!1,r.OPACITY=!1,r.REFLECTION=!1,r.EMISSIVE=!1,r.LIGHTMAP=!1,r.BUMP=!1,r.REFRACTION=!1;r.ALPHAFROMDIFFUSE=this._shouldUseAlphaFromDiffuseTexture(),r.EMISSIVEASILLUMINATION=this._useEmissiveAsIllumination,r.LINKEMISSIVEWITHDIFFUSE=this._linkEmissiveWithDiffuse,r.SPECULAROVERALPHA=this._useSpecularOverAlpha,r.PREMULTIPLYALPHA=this.alphaMode===7||this.alphaMode===8,r.ALPHATEST_AFTERALLALPHACOMPUTATIONS=this.transparencyMode!==null,r.ALPHABLEND=this.transparencyMode===null||this.needAlphaBlendingForMesh(e)}if(this._eventInfo.isReadyForSubMesh=!0,this._eventInfo.defines=r,this._eventInfo.subMesh=t,this._callbackPluginEventIsReadyForSubMesh(this._eventInfo),!this._eventInfo.isReadyForSubMesh)return!1;if(r._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(r),r.IS_REFLECTION_LINEAR=this.reflectionTexture!=null&&!this.reflectionTexture.gammaSpace,r.IS_REFRACTION_LINEAR=this.refractionTexture!=null&&!this.refractionTexture.gammaSpace}r._areFresnelDirty&&(m.FresnelEnabled?(this._diffuseFresnelParameters||this._opacityFresnelParameters||this._emissiveFresnelParameters||this._refractionFresnelParameters||this._reflectionFresnelParameters)&&(r.DIFFUSEFRESNEL=this._diffuseFresnelParameters&&this._diffuseFresnelParameters.isEnabled,r.OPACITYFRESNEL=this._opacityFresnelParameters&&this._opacityFresnelParameters.isEnabled,r.REFLECTIONFRESNEL=this._reflectionFresnelParameters&&this._reflectionFresnelParameters.isEnabled,r.REFLECTIONFRESNELFROMSPECULAR=this._useReflectionFresnelFromSpecular,r.REFRACTIONFRESNEL=this._refractionFresnelParameters&&this._refractionFresnelParameters.isEnabled,r.EMISSIVEFRESNEL=this._emissiveFresnelParameters&&this._emissiveFresnelParameters.isEnabled,r._needNormals=!0,r.FRESNEL=!0):r.FRESNEL=!1),O.PrepareDefinesForMisc(e,s,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e)||this._forceAlphaTest,r),O.PrepareDefinesForFrameBoundValues(s,l,this,r,i,null,t.getRenderingMesh().hasThinInstances),this._eventInfo.defines=r,this._eventInfo.mesh=e,this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo),O.PrepareDefinesForAttributes(e,r,!0,!0,!0),this._callbackPluginEventPrepareDefines(this._eventInfo);let h=!1;if(r.isDirty){const f=r._areLightsDisposed;r.markAsProcessed();const c=new pt;r.REFLECTION&&c.addFallback(0,"REFLECTION"),r.SPECULAR&&c.addFallback(0,"SPECULAR"),r.BUMP&&c.addFallback(0,"BUMP"),r.PARALLAX&&c.addFallback(1,"PARALLAX"),r.PARALLAXOCCLUSION&&c.addFallback(0,"PARALLAXOCCLUSION"),r.SPECULAROVERALPHA&&c.addFallback(0,"SPECULAROVERALPHA"),r.FOG&&c.addFallback(1,"FOG"),r.POINTSIZE&&c.addFallback(0,"POINTSIZE"),r.LOGARITHMICDEPTH&&c.addFallback(0,"LOGARITHMICDEPTH"),O.HandleFallbacksForShadows(r,c,this._maxSimultaneousLights),r.SPECULARTERM&&c.addFallback(0,"SPECULARTERM"),r.DIFFUSEFRESNEL&&c.addFallback(1,"DIFFUSEFRESNEL"),r.OPACITYFRESNEL&&c.addFallback(2,"OPACITYFRESNEL"),r.REFLECTIONFRESNEL&&c.addFallback(3,"REFLECTIONFRESNEL"),r.EMISSIVEFRESNEL&&c.addFallback(4,"EMISSIVEFRESNEL"),r.FRESNEL&&c.addFallback(4,"FRESNEL"),r.MULTIVIEW&&c.addFallback(0,"MULTIVIEW");const a=[k.PositionKind];r.NORMAL&&a.push(k.NormalKind),r.TANGENT&&a.push(k.TangentKind);for(let T=1;T<=6;++T)r["UV"+T]&&a.push(`uv${T===1?"":T}`);r.VERTEXCOLOR&&a.push(k.ColorKind),O.PrepareAttributesForBones(a,e,r,c),O.PrepareAttributesForInstances(a,r),O.PrepareAttributesForMorphTargets(a,e,r),O.PrepareAttributesForBakedVertexAnimation(a,e,r);let d="default";const p=["world","view","viewProjection","vEyePosition","vLightsType","vAmbientColor","vDiffuseColor","vSpecularColor","vEmissiveColor","visibility","vFogInfos","vFogColor","pointSize","vDiffuseInfos","vAmbientInfos","vOpacityInfos","vReflectionInfos","vEmissiveInfos","vSpecularInfos","vBumpInfos","vLightmapInfos","vRefractionInfos","mBones","diffuseMatrix","ambientMatrix","opacityMatrix","reflectionMatrix","emissiveMatrix","specularMatrix","bumpMatrix","normalMatrix","lightmapMatrix","refractionMatrix","diffuseLeftColor","diffuseRightColor","opacityParts","reflectionLeftColor","reflectionRightColor","emissiveLeftColor","emissiveRightColor","refractionLeftColor","refractionRightColor","vReflectionPosition","vReflectionSize","vRefractionPosition","vRefractionSize","logarithmicDepthConstant","vTangentSpaceParams","alphaCutOff","boneTextureWidth","morphTargetTextureInfo","morphTargetTextureIndices"],E=["diffuseSampler","ambientSampler","opacitySampler","reflectionCubeSampler","reflection2DSampler","emissiveSampler","specularSampler","bumpSampler","lightmapSampler","refractionCubeSampler","refraction2DSampler","boneSampler","morphTargets","oitDepthSampler","oitFrontColorSampler"],S=["Material","Scene","Mesh"];this._eventInfo.fallbacks=c,this._eventInfo.fallbackRank=0,this._eventInfo.defines=r,this._eventInfo.uniforms=p,this._eventInfo.attributes=a,this._eventInfo.samplers=E,this._eventInfo.uniformBuffersNames=S,this._eventInfo.customCode=void 0,this._eventInfo.mesh=e,this._callbackPluginEventGeneric(fe.PrepareEffect,this._eventInfo),ot.AddUniforms(p),we&&(we.PrepareUniforms(p,r),we.PrepareSamplers(E,r)),O.PrepareUniformsAndSamplersList({uniformsNames:p,uniformBuffersNames:S,samplers:E,defines:r,maxSimultaneousLights:this._maxSimultaneousLights}),ct(p);const x={};this.customShaderNameResolve&&(d=this.customShaderNameResolve(d,p,S,E,r,a,x));const I=r.toString(),C=t.effect;let _=s.getEngine().createEffect(d,{attributes:a,uniformsNames:p,uniformBuffersNames:S,samplers:E,defines:I,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights,maxSimultaneousMorphTargets:r.NUM_MORPH_INFLUENCERS},processFinalCode:x.processFinalCode,processCodeAfterIncludes:this._eventInfo.customCode,multiTarget:r.PREPASS},l);if(this._eventInfo.customCode=void 0,_)if(this._onEffectCreatedObservable&&(Ue.effect=_,Ue.subMesh=t,this._onEffectCreatedObservable.notifyObservers(Ue)),this.allowShaderHotSwapping&&C&&!_.isReady()){if(_=C,r.markAsUnprocessed(),h=this.isFrozen,f)return r._areLightsDisposed=!0,!1}else s.resetCachedMaterial(),t.setEffect(_,r,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(r._renderId=s.getRenderId(),t.effect._wasPreviouslyReady=!h,t.effect._wasPreviouslyUsingInstances=i,this._checkScenePerformancePriority(),!0)}buildUniformLayout(){const e=this._uniformBuffer;e.addUniform("diffuseLeftColor",4),e.addUniform("diffuseRightColor",4),e.addUniform("opacityParts",4),e.addUniform("reflectionLeftColor",4),e.addUniform("reflectionRightColor",4),e.addUniform("refractionLeftColor",4),e.addUniform("refractionRightColor",4),e.addUniform("emissiveLeftColor",4),e.addUniform("emissiveRightColor",4),e.addUniform("vDiffuseInfos",2),e.addUniform("vAmbientInfos",2),e.addUniform("vOpacityInfos",2),e.addUniform("vReflectionInfos",2),e.addUniform("vReflectionPosition",3),e.addUniform("vReflectionSize",3),e.addUniform("vEmissiveInfos",2),e.addUniform("vLightmapInfos",2),e.addUniform("vSpecularInfos",2),e.addUniform("vBumpInfos",3),e.addUniform("diffuseMatrix",16),e.addUniform("ambientMatrix",16),e.addUniform("opacityMatrix",16),e.addUniform("reflectionMatrix",16),e.addUniform("emissiveMatrix",16),e.addUniform("lightmapMatrix",16),e.addUniform("specularMatrix",16),e.addUniform("bumpMatrix",16),e.addUniform("vTangentSpaceParams",2),e.addUniform("pointSize",1),e.addUniform("alphaCutOff",1),e.addUniform("refractionMatrix",16),e.addUniform("vRefractionInfos",4),e.addUniform("vRefractionPosition",3),e.addUniform("vRefractionSize",3),e.addUniform("vSpecularColor",4),e.addUniform("vEmissiveColor",3),e.addUniform("vDiffuseColor",4),e.addUniform("vAmbientColor",3),super.buildUniformLayout()}bindForSubMesh(e,t,i){var s;const r=this.getScene(),l=i.materialDefines;if(!l)return;const n=i.effect;if(!n)return;this._activeEffect=n,t.getMeshUniformBuffer().bindToEffect(n,"Mesh"),t.transferToEffect(e),this._uniformBuffer.bindToEffect(n,"Material"),this.prePassConfiguration.bindForSubMesh(this._activeEffect,r,t,e,this.isFrozen),this._eventInfo.subMesh=i,this._callbackPluginEventHardBindForSubMesh(this._eventInfo),l.OBJECTSPACE_NORMALMAP&&(e.toNormalMatrix(this._normalMatrix),this.bindOnlyNormalMatrix(this._normalMatrix));const h=n._forceRebindOnNextCall||this._mustRebind(r,n,t.visibility);O.BindBonesParameters(t,n);const f=this._uniformBuffer;if(h){if(this.bindViewProjection(n),!f.useUbo||!this.isFrozen||!f.isSync||n._forceRebindOnNextCall){if(m.FresnelEnabled&&l.FRESNEL&&(this.diffuseFresnelParameters&&this.diffuseFresnelParameters.isEnabled&&(f.updateColor4("diffuseLeftColor",this.diffuseFresnelParameters.leftColor,this.diffuseFresnelParameters.power),f.updateColor4("diffuseRightColor",this.diffuseFresnelParameters.rightColor,this.diffuseFresnelParameters.bias)),this.opacityFresnelParameters&&this.opacityFresnelParameters.isEnabled&&f.updateColor4("opacityParts",new K(this.opacityFresnelParameters.leftColor.toLuminance(),this.opacityFresnelParameters.rightColor.toLuminance(),this.opacityFresnelParameters.bias),this.opacityFresnelParameters.power),this.reflectionFresnelParameters&&this.reflectionFresnelParameters.isEnabled&&(f.updateColor4("reflectionLeftColor",this.reflectionFresnelParameters.leftColor,this.reflectionFresnelParameters.power),f.updateColor4("reflectionRightColor",this.reflectionFresnelParameters.rightColor,this.reflectionFresnelParameters.bias)),this.refractionFresnelParameters&&this.refractionFresnelParameters.isEnabled&&(f.updateColor4("refractionLeftColor",this.refractionFresnelParameters.leftColor,this.refractionFresnelParameters.power),f.updateColor4("refractionRightColor",this.refractionFresnelParameters.rightColor,this.refractionFresnelParameters.bias)),this.emissiveFresnelParameters&&this.emissiveFresnelParameters.isEnabled&&(f.updateColor4("emissiveLeftColor",this.emissiveFresnelParameters.leftColor,this.emissiveFresnelParameters.power),f.updateColor4("emissiveRightColor",this.emissiveFresnelParameters.rightColor,this.emissiveFresnelParameters.bias))),r.texturesEnabled){if(this._diffuseTexture&&m.DiffuseTextureEnabled&&(f.updateFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),O.BindTextureMatrix(this._diffuseTexture,f,"diffuse")),this._ambientTexture&&m.AmbientTextureEnabled&&(f.updateFloat2("vAmbientInfos",this._ambientTexture.coordinatesIndex,this._ambientTexture.level),O.BindTextureMatrix(this._ambientTexture,f,"ambient")),this._opacityTexture&&m.OpacityTextureEnabled&&(f.updateFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),O.BindTextureMatrix(this._opacityTexture,f,"opacity")),this._hasAlphaChannel()&&f.updateFloat("alphaCutOff",this.alphaCutOff),this._reflectionTexture&&m.ReflectionTextureEnabled&&(f.updateFloat2("vReflectionInfos",this._reflectionTexture.level,this.roughness),f.updateMatrix("reflectionMatrix",this._reflectionTexture.getReflectionTextureMatrix()),this._reflectionTexture.boundingBoxSize)){const c=this._reflectionTexture;f.updateVector3("vReflectionPosition",c.boundingBoxPosition),f.updateVector3("vReflectionSize",c.boundingBoxSize)}if(this._emissiveTexture&&m.EmissiveTextureEnabled&&(f.updateFloat2("vEmissiveInfos",this._emissiveTexture.coordinatesIndex,this._emissiveTexture.level),O.BindTextureMatrix(this._emissiveTexture,f,"emissive")),this._lightmapTexture&&m.LightmapTextureEnabled&&(f.updateFloat2("vLightmapInfos",this._lightmapTexture.coordinatesIndex,this._lightmapTexture.level),O.BindTextureMatrix(this._lightmapTexture,f,"lightmap")),this._specularTexture&&m.SpecularTextureEnabled&&(f.updateFloat2("vSpecularInfos",this._specularTexture.coordinatesIndex,this._specularTexture.level),O.BindTextureMatrix(this._specularTexture,f,"specular")),this._bumpTexture&&r.getEngine().getCaps().standardDerivatives&&m.BumpTextureEnabled&&(f.updateFloat3("vBumpInfos",this._bumpTexture.coordinatesIndex,1/this._bumpTexture.level,this.parallaxScaleBias),O.BindTextureMatrix(this._bumpTexture,f,"bump"),r._mirroredCameraPosition?f.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?1:-1,this._invertNormalMapY?1:-1):f.updateFloat2("vTangentSpaceParams",this._invertNormalMapX?-1:1,this._invertNormalMapY?-1:1)),this._refractionTexture&&m.RefractionTextureEnabled){let c=1;if(this._refractionTexture.isCube||(f.updateMatrix("refractionMatrix",this._refractionTexture.getReflectionTextureMatrix()),this._refractionTexture.depth&&(c=this._refractionTexture.depth)),f.updateFloat4("vRefractionInfos",this._refractionTexture.level,this.indexOfRefraction,c,this.invertRefractionY?-1:1),this._refractionTexture.boundingBoxSize){const a=this._refractionTexture;f.updateVector3("vRefractionPosition",a.boundingBoxPosition),f.updateVector3("vRefractionSize",a.boundingBoxSize)}}}this.pointsCloud&&f.updateFloat("pointSize",this.pointSize),l.SPECULARTERM&&f.updateColor4("vSpecularColor",this.specularColor,this.specularPower),f.updateColor3("vEmissiveColor",m.EmissiveTextureEnabled?this.emissiveColor:K.BlackReadOnly),f.updateColor4("vDiffuseColor",this.diffuseColor,this.alpha),r.ambientColor.multiplyToRef(this.ambientColor,this._globalAmbientColor),f.updateColor3("vAmbientColor",this._globalAmbientColor)}r.texturesEnabled&&(this._diffuseTexture&&m.DiffuseTextureEnabled&&n.setTexture("diffuseSampler",this._diffuseTexture),this._ambientTexture&&m.AmbientTextureEnabled&&n.setTexture("ambientSampler",this._ambientTexture),this._opacityTexture&&m.OpacityTextureEnabled&&n.setTexture("opacitySampler",this._opacityTexture),this._reflectionTexture&&m.ReflectionTextureEnabled&&(this._reflectionTexture.isCube?n.setTexture("reflectionCubeSampler",this._reflectionTexture):n.setTexture("reflection2DSampler",this._reflectionTexture)),this._emissiveTexture&&m.EmissiveTextureEnabled&&n.setTexture("emissiveSampler",this._emissiveTexture),this._lightmapTexture&&m.LightmapTextureEnabled&&n.setTexture("lightmapSampler",this._lightmapTexture),this._specularTexture&&m.SpecularTextureEnabled&&n.setTexture("specularSampler",this._specularTexture),this._bumpTexture&&r.getEngine().getCaps().standardDerivatives&&m.BumpTextureEnabled&&n.setTexture("bumpSampler",this._bumpTexture),this._refractionTexture&&m.RefractionTextureEnabled&&(this._refractionTexture.isCube?n.setTexture("refractionCubeSampler",this._refractionTexture):n.setTexture("refraction2DSampler",this._refractionTexture))),this.getScene().useOrderIndependentTransparency&&this.needAlphaBlendingForMesh(t)&&this.getScene().depthPeelingRenderer.bind(n),this._eventInfo.subMesh=i,this._callbackPluginEventBindForSubMesh(this._eventInfo),dt(n,this,r),this.bindEyePosition(n)}else r.getEngine()._features.needToAlwaysBindUniformBuffers&&(this._needToBindSceneUbo=!0);(h||!this.isFrozen)&&(r.lightsEnabled&&!this._disableLighting&&O.BindLights(r,t,n,l,this._maxSimultaneousLights),(r.fogEnabled&&t.applyFog&&r.fogMode!==He.FOGMODE_NONE||this._reflectionTexture||this._refractionTexture||t.receiveShadows||l.PREPASS)&&this.bindView(n),O.BindFogParameters(r,t,n),l.NUM_MORPH_INFLUENCERS&&O.BindMorphTargetParameters(t,n),l.BAKED_VERTEX_ANIMATION_TEXTURE&&((s=t.bakedVertexAnimationManager)===null||s===void 0||s.bind(n,l.INSTANCES)),this.useLogarithmicDepth&&O.BindLogDepth(l,n,r),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect)),this._afterBind(t,this._activeEffect),f.update()}getAnimatables(){const e=super.getAnimatables();return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._ambientTexture&&this._ambientTexture.animations&&this._ambientTexture.animations.length>0&&e.push(this._ambientTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),this._reflectionTexture&&this._reflectionTexture.animations&&this._reflectionTexture.animations.length>0&&e.push(this._reflectionTexture),this._emissiveTexture&&this._emissiveTexture.animations&&this._emissiveTexture.animations.length>0&&e.push(this._emissiveTexture),this._specularTexture&&this._specularTexture.animations&&this._specularTexture.animations.length>0&&e.push(this._specularTexture),this._bumpTexture&&this._bumpTexture.animations&&this._bumpTexture.animations.length>0&&e.push(this._bumpTexture),this._lightmapTexture&&this._lightmapTexture.animations&&this._lightmapTexture.animations.length>0&&e.push(this._lightmapTexture),this._refractionTexture&&this._refractionTexture.animations&&this._refractionTexture.animations.length>0&&e.push(this._refractionTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),this._ambientTexture&&e.push(this._ambientTexture),this._opacityTexture&&e.push(this._opacityTexture),this._reflectionTexture&&e.push(this._reflectionTexture),this._emissiveTexture&&e.push(this._emissiveTexture),this._specularTexture&&e.push(this._specularTexture),this._bumpTexture&&e.push(this._bumpTexture),this._lightmapTexture&&e.push(this._lightmapTexture),this._refractionTexture&&e.push(this._refractionTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._diffuseTexture===e||this._ambientTexture===e||this._opacityTexture===e||this._reflectionTexture===e||this._emissiveTexture===e||this._specularTexture===e||this._bumpTexture===e||this._lightmapTexture===e||this._refractionTexture===e)}dispose(e,t){var i,s,r,l,n,h,f,c,a;t&&((i=this._diffuseTexture)===null||i===void 0||i.dispose(),(s=this._ambientTexture)===null||s===void 0||s.dispose(),(r=this._opacityTexture)===null||r===void 0||r.dispose(),(l=this._reflectionTexture)===null||l===void 0||l.dispose(),(n=this._emissiveTexture)===null||n===void 0||n.dispose(),(h=this._specularTexture)===null||h===void 0||h.dispose(),(f=this._bumpTexture)===null||f===void 0||f.dispose(),(c=this._lightmapTexture)===null||c===void 0||c.dispose(),(a=this._refractionTexture)===null||a===void 0||a.dispose()),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),super.dispose(e,t)}clone(e,t=!0,i=""){const s=q.Clone(()=>new m(e,this.getScene()),this,{cloneTexturesOnlyOnce:t});return s.name=e,s.id=e,this.stencil.copyTo(s.stencil),this._clonePlugins(s,i),s}static Parse(e,t,i){const s=q.Parse(()=>new m(e.name,t),e,t,i);return e.stencil&&s.stencil.parse(e.stencil,t,i),ce._parsePlugins(e,s,t,i),s}static get DiffuseTextureEnabled(){return b.DiffuseTextureEnabled}static set DiffuseTextureEnabled(e){b.DiffuseTextureEnabled=e}static get DetailTextureEnabled(){return b.DetailTextureEnabled}static set DetailTextureEnabled(e){b.DetailTextureEnabled=e}static get AmbientTextureEnabled(){return b.AmbientTextureEnabled}static set AmbientTextureEnabled(e){b.AmbientTextureEnabled=e}static get OpacityTextureEnabled(){return b.OpacityTextureEnabled}static set OpacityTextureEnabled(e){b.OpacityTextureEnabled=e}static get ReflectionTextureEnabled(){return b.ReflectionTextureEnabled}static set ReflectionTextureEnabled(e){b.ReflectionTextureEnabled=e}static get EmissiveTextureEnabled(){return b.EmissiveTextureEnabled}static set EmissiveTextureEnabled(e){b.EmissiveTextureEnabled=e}static get SpecularTextureEnabled(){return b.SpecularTextureEnabled}static set SpecularTextureEnabled(e){b.SpecularTextureEnabled=e}static get BumpTextureEnabled(){return b.BumpTextureEnabled}static set BumpTextureEnabled(e){b.BumpTextureEnabled=e}static get LightmapTextureEnabled(){return b.LightmapTextureEnabled}static set LightmapTextureEnabled(e){b.LightmapTextureEnabled=e}static get RefractionTextureEnabled(){return b.RefractionTextureEnabled}static set RefractionTextureEnabled(e){b.RefractionTextureEnabled=e}static get ColorGradingTextureEnabled(){return b.ColorGradingTextureEnabled}static set ColorGradingTextureEnabled(e){b.ColorGradingTextureEnabled=e}static get FresnelEnabled(){return b.FresnelEnabled}static set FresnelEnabled(e){b.FresnelEnabled=e}}u([oe("diffuseTexture")],m.prototype,"_diffuseTexture",void 0);u([w("_markAllSubMeshesAsTexturesAndMiscDirty")],m.prototype,"diffuseTexture",void 0);u([oe("ambientTexture")],m.prototype,"_ambientTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"ambientTexture",void 0);u([oe("opacityTexture")],m.prototype,"_opacityTexture",void 0);u([w("_markAllSubMeshesAsTexturesAndMiscDirty")],m.prototype,"opacityTexture",void 0);u([oe("reflectionTexture")],m.prototype,"_reflectionTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"reflectionTexture",void 0);u([oe("emissiveTexture")],m.prototype,"_emissiveTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"emissiveTexture",void 0);u([oe("specularTexture")],m.prototype,"_specularTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"specularTexture",void 0);u([oe("bumpTexture")],m.prototype,"_bumpTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"bumpTexture",void 0);u([oe("lightmapTexture")],m.prototype,"_lightmapTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"lightmapTexture",void 0);u([oe("refractionTexture")],m.prototype,"_refractionTexture",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"refractionTexture",void 0);u([_e("ambient")],m.prototype,"ambientColor",void 0);u([_e("diffuse")],m.prototype,"diffuseColor",void 0);u([_e("specular")],m.prototype,"specularColor",void 0);u([_e("emissive")],m.prototype,"emissiveColor",void 0);u([g()],m.prototype,"specularPower",void 0);u([g("useAlphaFromDiffuseTexture")],m.prototype,"_useAlphaFromDiffuseTexture",void 0);u([w("_markAllSubMeshesAsTexturesAndMiscDirty")],m.prototype,"useAlphaFromDiffuseTexture",void 0);u([g("useEmissiveAsIllumination")],m.prototype,"_useEmissiveAsIllumination",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useEmissiveAsIllumination",void 0);u([g("linkEmissiveWithDiffuse")],m.prototype,"_linkEmissiveWithDiffuse",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"linkEmissiveWithDiffuse",void 0);u([g("useSpecularOverAlpha")],m.prototype,"_useSpecularOverAlpha",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useSpecularOverAlpha",void 0);u([g("useReflectionOverAlpha")],m.prototype,"_useReflectionOverAlpha",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useReflectionOverAlpha",void 0);u([g("disableLighting")],m.prototype,"_disableLighting",void 0);u([w("_markAllSubMeshesAsLightsDirty")],m.prototype,"disableLighting",void 0);u([g("useObjectSpaceNormalMap")],m.prototype,"_useObjectSpaceNormalMap",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useObjectSpaceNormalMap",void 0);u([g("useParallax")],m.prototype,"_useParallax",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useParallax",void 0);u([g("useParallaxOcclusion")],m.prototype,"_useParallaxOcclusion",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useParallaxOcclusion",void 0);u([g()],m.prototype,"parallaxScaleBias",void 0);u([g("roughness")],m.prototype,"_roughness",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"roughness",void 0);u([g()],m.prototype,"indexOfRefraction",void 0);u([g()],m.prototype,"invertRefractionY",void 0);u([g()],m.prototype,"alphaCutOff",void 0);u([g("useLightmapAsShadowmap")],m.prototype,"_useLightmapAsShadowmap",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useLightmapAsShadowmap",void 0);u([Pe("diffuseFresnelParameters")],m.prototype,"_diffuseFresnelParameters",void 0);u([w("_markAllSubMeshesAsFresnelDirty")],m.prototype,"diffuseFresnelParameters",void 0);u([Pe("opacityFresnelParameters")],m.prototype,"_opacityFresnelParameters",void 0);u([w("_markAllSubMeshesAsFresnelAndMiscDirty")],m.prototype,"opacityFresnelParameters",void 0);u([Pe("reflectionFresnelParameters")],m.prototype,"_reflectionFresnelParameters",void 0);u([w("_markAllSubMeshesAsFresnelDirty")],m.prototype,"reflectionFresnelParameters",void 0);u([Pe("refractionFresnelParameters")],m.prototype,"_refractionFresnelParameters",void 0);u([w("_markAllSubMeshesAsFresnelDirty")],m.prototype,"refractionFresnelParameters",void 0);u([Pe("emissiveFresnelParameters")],m.prototype,"_emissiveFresnelParameters",void 0);u([w("_markAllSubMeshesAsFresnelDirty")],m.prototype,"emissiveFresnelParameters",void 0);u([g("useReflectionFresnelFromSpecular")],m.prototype,"_useReflectionFresnelFromSpecular",void 0);u([w("_markAllSubMeshesAsFresnelDirty")],m.prototype,"useReflectionFresnelFromSpecular",void 0);u([g("useGlossinessFromSpecularMapAlpha")],m.prototype,"_useGlossinessFromSpecularMapAlpha",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"useGlossinessFromSpecularMapAlpha",void 0);u([g("maxSimultaneousLights")],m.prototype,"_maxSimultaneousLights",void 0);u([w("_markAllSubMeshesAsLightsDirty")],m.prototype,"maxSimultaneousLights",void 0);u([g("invertNormalMapX")],m.prototype,"_invertNormalMapX",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"invertNormalMapX",void 0);u([g("invertNormalMapY")],m.prototype,"_invertNormalMapY",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"invertNormalMapY",void 0);u([g("twoSidedLighting")],m.prototype,"_twoSidedLighting",void 0);u([w("_markAllSubMeshesAsTexturesDirty")],m.prototype,"twoSidedLighting",void 0);u([g()],m.prototype,"useLogarithmicDepth",null);ke("BABYLON.StandardMaterial",m);He.DefaultMaterialFactory=o=>new m("default material",o);F._instancedMeshFactory=(o,e)=>{const t=new _t(o,e);if(e.instancedBuffers){t.instancedBuffers={};for(const i in e.instancedBuffers)t.instancedBuffers[i]=e.instancedBuffers[i]}return t};class _t extends kt{constructor(e,t){super(e,t.getScene()),this._indexInSourceMeshInstanceArray=-1,this._distanceToCamera=0,t.addInstance(this),this._sourceMesh=t,this._unIndexed=t._unIndexed,this.position.copyFrom(t.position),this.rotation.copyFrom(t.rotation),this.scaling.copyFrom(t.scaling),t.rotationQuaternion&&(this.rotationQuaternion=t.rotationQuaternion.clone()),this.animations=t.animations.slice();for(const i of t.getAnimationRanges())i!=null&&this.createAnimationRange(i.name,i.from,i.to);this.infiniteDistance=t.infiniteDistance,this.setPivotMatrix(t.getPivotMatrix()),this.refreshBoundingInfo(!0,!0),this._syncSubMeshes()}getClassName(){return"InstancedMesh"}get lightSources(){return this._sourceMesh._lightSources}_resyncLightSources(){}_resyncLightSource(){}_removeLightSource(){}get receiveShadows(){return this._sourceMesh.receiveShadows}set receiveShadows(e){var t;((t=this._sourceMesh)===null||t===void 0?void 0:t.receiveShadows)!==e&&Ie.Warn("Setting receiveShadows on an instanced mesh has no effect")}get material(){return this._sourceMesh.material}set material(e){var t;((t=this._sourceMesh)===null||t===void 0?void 0:t.material)!==e&&Ie.Warn("Setting material on an instanced mesh has no effect")}get visibility(){return this._sourceMesh.visibility}set visibility(e){var t;((t=this._sourceMesh)===null||t===void 0?void 0:t.visibility)!==e&&Ie.Warn("Setting visibility on an instanced mesh has no effect")}get skeleton(){return this._sourceMesh.skeleton}set skeleton(e){var t;((t=this._sourceMesh)===null||t===void 0?void 0:t.skeleton)!==e&&Ie.Warn("Setting skeleton on an instanced mesh has no effect")}get renderingGroupId(){return this._sourceMesh.renderingGroupId}set renderingGroupId(e){!this._sourceMesh||e===this._sourceMesh.renderingGroupId||Ve.Warn("Note - setting renderingGroupId of an instanced mesh has no effect on the scene")}getTotalVertices(){return this._sourceMesh?this._sourceMesh.getTotalVertices():0}getTotalIndices(){return this._sourceMesh.getTotalIndices()}get sourceMesh(){return this._sourceMesh}createInstance(e){return this._sourceMesh.createInstance(e)}isReady(e=!1){return this._sourceMesh.isReady(e,!0)}getVerticesData(e,t,i){return this._sourceMesh.getVerticesData(e,t,i)}setVerticesData(e,t,i,s){return this.sourceMesh&&this.sourceMesh.setVerticesData(e,t,i,s),this.sourceMesh}updateVerticesData(e,t,i,s){return this.sourceMesh&&this.sourceMesh.updateVerticesData(e,t,i,s),this.sourceMesh}setIndices(e,t=null){return this.sourceMesh&&this.sourceMesh.setIndices(e,t),this.sourceMesh}isVerticesDataPresent(e){return this._sourceMesh.isVerticesDataPresent(e)}getIndices(){return this._sourceMesh.getIndices()}get _positions(){return this._sourceMesh._positions}refreshBoundingInfo(e=!1,t=!1){if(this.hasBoundingInfo&&this.getBoundingInfo().isLocked)return this;const i=this._sourceMesh.geometry?this._sourceMesh.geometry.boundingBias:null;return this._refreshBoundingInfo(this._sourceMesh._getPositionData(e,t),i),this}_preActivate(){return this._currentLOD&&this._currentLOD._preActivate(),this}_activate(e,t){if(super._activate(e,t),this._sourceMesh.subMeshes||Ve.Warn("Instances should only be created for meshes with geometry."),this._currentLOD){if(this._currentLOD._getWorldMatrixDeterminant()>=0!=this._getWorldMatrixDeterminant()>=0)return this._internalAbstractMeshDataInfo._actAsRegularMesh=!0,!0;if(this._internalAbstractMeshDataInfo._actAsRegularMesh=!1,this._currentLOD._registerInstanceForRenderId(this,e),t){if(!this._currentLOD._internalAbstractMeshDataInfo._isActiveIntermediate)return this._currentLOD._internalAbstractMeshDataInfo._onlyForInstancesIntermediate=!0,!0}else if(!this._currentLOD._internalAbstractMeshDataInfo._isActive)return this._currentLOD._internalAbstractMeshDataInfo._onlyForInstances=!0,!0}return!1}_postActivate(){this._sourceMesh.edgesShareWithInstances&&this._sourceMesh._edgesRenderer&&this._sourceMesh._edgesRenderer.isEnabled&&this._sourceMesh._renderingGroup?(this._sourceMesh._renderingGroup._edgesRenderers.pushNoDuplicate(this._sourceMesh._edgesRenderer),this._sourceMesh._edgesRenderer.customInstances.push(this.getWorldMatrix())):this._edgesRenderer&&this._edgesRenderer.isEnabled&&this._sourceMesh._renderingGroup&&this._sourceMesh._renderingGroup._edgesRenderers.push(this._edgesRenderer)}getWorldMatrix(){if(this._currentLOD&&this._currentLOD.billboardMode!==Ht.BILLBOARDMODE_NONE&&this._currentLOD._masterMesh!==this){this._billboardWorldMatrix||(this._billboardWorldMatrix=new W);const e=this._currentLOD._masterMesh;return this._currentLOD._masterMesh=this,Y.Vector3[7].copyFrom(this._currentLOD.position),this._currentLOD.position.set(0,0,0),this._billboardWorldMatrix.copyFrom(this._currentLOD.computeWorldMatrix(!0)),this._currentLOD.position.copyFrom(Y.Vector3[7]),this._currentLOD._masterMesh=e,this._billboardWorldMatrix}return super.getWorldMatrix()}get isAnInstance(){return!0}getLOD(e){if(!e)return this;const t=this.sourceMesh.getLODLevels();if(!t||t.length===0)this._currentLOD=this.sourceMesh;else{const i=this.getBoundingInfo();this._currentLOD=this.sourceMesh.getLOD(e,i.boundingSphere)}return this._currentLOD}_preActivateForIntermediateRendering(e){return this.sourceMesh._preActivateForIntermediateRendering(e)}_syncSubMeshes(){if(this.releaseSubMeshes(),this._sourceMesh.subMeshes)for(let e=0;e<this._sourceMesh.subMeshes.length;e++)this._sourceMesh.subMeshes[e].clone(this,this._sourceMesh);return this}_generatePointsArray(){return this._sourceMesh._generatePointsArray()}_updateBoundingInfo(){return this.hasBoundingInfo?this.getBoundingInfo().update(this.worldMatrixFromCache):this.buildBoundingInfo(this.absolutePosition,this.absolutePosition,this.worldMatrixFromCache),this._updateSubMeshesBoundingInfo(this.worldMatrixFromCache),this}clone(e,t=null,i,s){const r=(s||this._sourceMesh).createInstance(e);if(Yt.DeepCopy(this,r,["name","subMeshes","uniqueId","parent","lightSources","receiveShadows","material","visibility","skeleton","sourceMesh","isAnInstance","facetNb","isFacetDataEnabled","isBlocked","useBones","hasInstances","collider","edgesRenderer","forward","up","right","absolutePosition","absoluteScaling","absoluteRotationQuaternion","isWorldMatrixFrozen","nonUniformScaling","behaviors","worldMatrixFromCache","hasThinInstances","hasBoundingInfo"],[]),this.refreshBoundingInfo(),t&&(r.parent=t),!i)for(let l=0;l<this.getScene().meshes.length;l++){const n=this.getScene().meshes[l];n.parent===this&&n.clone(n.name,r)}return r.computeWorldMatrix(!0),this.onClonedObservable.notifyObservers(r),r}dispose(e,t=!1){this._sourceMesh.removeInstance(this),super.dispose(e,t)}_serializeAsParent(e){super._serializeAsParent(e),e.parentId=this._sourceMesh.uniqueId,e.parentInstanceIndex=this._indexInSourceMeshInstanceArray}instantiateHierarchy(e=null,t,i){const s=this.clone("Clone of "+(this.name||this.id),e||this.parent,!0,t&&t.newSourcedMesh);s&&i&&i(this,s);for(const r of this.getChildTransformNodes(!0))r.instantiateHierarchy(s,t,i);return s}}F.prototype.registerInstancedBuffer=function(o,e){var t,i;if((i=(t=this._userInstancedBuffersStorage)===null||t===void 0?void 0:t.vertexBuffers[o])===null||i===void 0||i.dispose(),!this.instancedBuffers){this.instancedBuffers={};for(const s of this.instances)s.instancedBuffers={};this._userInstancedBuffersStorage||(this._userInstancedBuffersStorage={data:{},vertexBuffers:{},strides:{},sizes:{},vertexArrayObjects:this.getEngine().getCaps().vertexArrayObject?{}:void 0})}this.instancedBuffers[o]=null,this._userInstancedBuffersStorage.strides[o]=e,this._userInstancedBuffersStorage.sizes[o]=e*32,this._userInstancedBuffersStorage.data[o]=new Float32Array(this._userInstancedBuffersStorage.sizes[o]),this._userInstancedBuffersStorage.vertexBuffers[o]=new k(this.getEngine(),this._userInstancedBuffersStorage.data[o],o,!0,!1,e,!0);for(const s of this.instances)s.instancedBuffers[o]=null;this._invalidateInstanceVertexArrayObject(),this._markSubMeshesAsAttributesDirty()};F.prototype._processInstancedBuffers=function(o,e){const t=o?o.length:0;for(const i in this.instancedBuffers){let s=this._userInstancedBuffersStorage.sizes[i];const r=this._userInstancedBuffersStorage.strides[i],l=(t+1)*r;for(;s<l;)s*=2;this._userInstancedBuffersStorage.data[i].length!=s&&(this._userInstancedBuffersStorage.data[i]=new Float32Array(s),this._userInstancedBuffersStorage.sizes[i]=s,this._userInstancedBuffersStorage.vertexBuffers[i]&&(this._userInstancedBuffersStorage.vertexBuffers[i].dispose(),this._userInstancedBuffersStorage.vertexBuffers[i]=null));const n=this._userInstancedBuffersStorage.data[i];let h=0;if(e){const f=this.instancedBuffers[i];f.toArray?f.toArray(n,h):f.copyToArray?f.copyToArray(n,h):n[h]=f,h+=r}for(let f=0;f<t;f++){const a=o[f].instancedBuffers[i];a.toArray?a.toArray(n,h):a.copyToArray?a.copyToArray(n,h):n[h]=a,h+=r}this._userInstancedBuffersStorage.vertexBuffers[i]?this._userInstancedBuffersStorage.vertexBuffers[i].updateDirectly(n,0):(this._userInstancedBuffersStorage.vertexBuffers[i]=new k(this.getEngine(),this._userInstancedBuffersStorage.data[i],i,!0,!1,r,!0),this._invalidateInstanceVertexArrayObject())}};F.prototype._invalidateInstanceVertexArrayObject=function(){if(!(!this._userInstancedBuffersStorage||this._userInstancedBuffersStorage.vertexArrayObjects===void 0)){for(const o in this._userInstancedBuffersStorage.vertexArrayObjects)this.getEngine().releaseVertexArrayObject(this._userInstancedBuffersStorage.vertexArrayObjects[o]);this._userInstancedBuffersStorage.vertexArrayObjects={}}};F.prototype._disposeInstanceSpecificData=function(){for(this._instanceDataStorage.instancesBuffer&&(this._instanceDataStorage.instancesBuffer.dispose(),this._instanceDataStorage.instancesBuffer=null);this.instances.length;)this.instances[0].dispose();for(const o in this.instancedBuffers)this._userInstancedBuffersStorage.vertexBuffers[o]&&this._userInstancedBuffersStorage.vertexBuffers[o].dispose();this._invalidateInstanceVertexArrayObject(),this.instancedBuffers={}};class L extends ye{get range(){return this._range}set range(e){this._range=e,this._inverseSquaredRange=1/(this.range*this.range)}get intensityMode(){return this._intensityMode}set intensityMode(e){this._intensityMode=e,this._computePhotometricScale()}get radius(){return this._radius}set radius(e){this._radius=e,this._computePhotometricScale()}get shadowEnabled(){return this._shadowEnabled}set shadowEnabled(e){this._shadowEnabled!==e&&(this._shadowEnabled=e,this._markMeshesAsLightDirty())}get includedOnlyMeshes(){return this._includedOnlyMeshes}set includedOnlyMeshes(e){this._includedOnlyMeshes=e,this._hookArrayForIncludedOnly(e)}get excludedMeshes(){return this._excludedMeshes}set excludedMeshes(e){this._excludedMeshes=e,this._hookArrayForExcluded(e)}get excludeWithLayerMask(){return this._excludeWithLayerMask}set excludeWithLayerMask(e){this._excludeWithLayerMask=e,this._resyncMeshes()}get includeOnlyWithLayerMask(){return this._includeOnlyWithLayerMask}set includeOnlyWithLayerMask(e){this._includeOnlyWithLayerMask=e,this._resyncMeshes()}get lightmapMode(){return this._lightmapMode}set lightmapMode(e){this._lightmapMode!==e&&(this._lightmapMode=e,this._markMeshesAsLightDirty())}constructor(e,t){super(e,t),this.diffuse=new K(1,1,1),this.specular=new K(1,1,1),this.falloffType=L.FALLOFF_DEFAULT,this.intensity=1,this._range=Number.MAX_VALUE,this._inverseSquaredRange=0,this._photometricScale=1,this._intensityMode=L.INTENSITYMODE_AUTOMATIC,this._radius=1e-5,this.renderPriority=0,this._shadowEnabled=!0,this._excludeWithLayerMask=0,this._includeOnlyWithLayerMask=0,this._lightmapMode=0,this._shadowGenerators=null,this._excludedMeshesIds=new Array,this._includedOnlyMeshesIds=new Array,this._isLight=!0,this.getScene().addLight(this),this._uniformBuffer=new $t(this.getScene().getEngine(),void 0,void 0,e),this._buildUniformLayout(),this.includedOnlyMeshes=new Array,this.excludedMeshes=new Array,this._resyncMeshes()}transferTexturesToEffect(e,t){return this}_bindLight(e,t,i,s,r=!0){var l;const n=e.toString();let h=!1;if(this._uniformBuffer.bindToEffect(i,"Light"+n),this._renderId!==t.getRenderId()||this._lastUseSpecular!==s||!this._uniformBuffer.useUbo){this._renderId=t.getRenderId(),this._lastUseSpecular=s;const f=this.getScaledIntensity();this.transferToEffect(i,n),this.diffuse.scaleToRef(f,Ne.Color3[0]),this._uniformBuffer.updateColor4("vLightDiffuse",Ne.Color3[0],this.range,n),s&&(this.specular.scaleToRef(f,Ne.Color3[1]),this._uniformBuffer.updateColor4("vLightSpecular",Ne.Color3[1],this.radius,n)),h=!0}if(this.transferTexturesToEffect(i,n),t.shadowsEnabled&&this.shadowEnabled&&r){const f=(l=this.getShadowGenerator(t.activeCamera))!==null&&l!==void 0?l:this.getShadowGenerator();f&&(f.bindShadowLight(n,i),h=!0)}h?this._uniformBuffer.update():this._uniformBuffer.bindUniformBuffer()}getClassName(){return"Light"}toString(e){let t="Name: "+this.name;if(t+=", type: "+["Point","Directional","Spot","Hemispheric"][this.getTypeID()],this.animations)for(let i=0;i<this.animations.length;i++)t+=", animation[0]: "+this.animations[i].toString(e);return t}_syncParentEnabledState(){super._syncParentEnabledState(),this.isDisposed()||this._resyncMeshes()}setEnabled(e){super.setEnabled(e),this._resyncMeshes()}getShadowGenerator(e=null){var t;return this._shadowGenerators===null?null:(t=this._shadowGenerators.get(e))!==null&&t!==void 0?t:null}getShadowGenerators(){return this._shadowGenerators}getAbsolutePosition(){return y.Zero()}canAffectMesh(e){return e?!(this.includedOnlyMeshes&&this.includedOnlyMeshes.length>0&&this.includedOnlyMeshes.indexOf(e)===-1||this.excludedMeshes&&this.excludedMeshes.length>0&&this.excludedMeshes.indexOf(e)!==-1||this.includeOnlyWithLayerMask!==0&&!(this.includeOnlyWithLayerMask&e.layerMask)||this.excludeWithLayerMask!==0&&this.excludeWithLayerMask&e.layerMask):!0}dispose(e,t=!1){if(this._shadowGenerators){const i=this._shadowGenerators.values();for(let s=i.next();s.done!==!0;s=i.next())s.value.dispose();this._shadowGenerators=null}if(this.getScene().stopAnimation(this),this._parentContainer){const i=this._parentContainer.lights.indexOf(this);i>-1&&this._parentContainer.lights.splice(i,1),this._parentContainer=null}for(const i of this.getScene().meshes)i._removeLightSource(this,!0);this._uniformBuffer.dispose(),this.getScene().removeLight(this),super.dispose(e,t)}getTypeID(){return 0}getScaledIntensity(){return this._photometricScale*this.intensity}clone(e,t=null){const i=L.GetConstructorFromName(this.getTypeID(),e,this.getScene());if(!i)return null;const s=q.Clone(i,this);return e&&(s.name=e),t&&(s.parent=t),s.setEnabled(this.isEnabled()),this.onClonedObservable.notifyObservers(s),s}serialize(){const e=q.Serialize(this);return e.uniqueId=this.uniqueId,e.type=this.getTypeID(),this.parent&&this.parent._serializeAsParent(e),this.excludedMeshes.length>0&&(e.excludedMeshesIds=[],this.excludedMeshes.forEach(t=>{e.excludedMeshesIds.push(t.id)})),this.includedOnlyMeshes.length>0&&(e.includedOnlyMeshesIds=[],this.includedOnlyMeshes.forEach(t=>{e.includedOnlyMeshesIds.push(t.id)})),q.AppendSerializedAnimations(this,e),e.ranges=this.serializeAnimationRanges(),e.isEnabled=this.isEnabled(),e}static GetConstructorFromName(e,t,i){const s=ye.Construct("Light_Type_"+e,t,i);return s||null}static Parse(e,t){const i=L.GetConstructorFromName(e.type,e.name,t);if(!i)return null;const s=q.Parse(i,e,t);if(e.excludedMeshesIds&&(s._excludedMeshesIds=e.excludedMeshesIds),e.includedOnlyMeshesIds&&(s._includedOnlyMeshesIds=e.includedOnlyMeshesIds),e.parentId!==void 0&&(s._waitingParentId=e.parentId),e.parentInstanceIndex!==void 0&&(s._waitingParentInstanceIndex=e.parentInstanceIndex),e.falloffType!==void 0&&(s.falloffType=e.falloffType),e.lightmapMode!==void 0&&(s.lightmapMode=e.lightmapMode),e.animations){for(let r=0;r<e.animations.length;r++){const l=e.animations[r],n=lt("BABYLON.Animation");n&&s.animations.push(n.Parse(l))}ye.ParseAnimationRanges(s,e,t)}return e.autoAnimate&&t.beginAnimation(s,e.autoAnimateFrom,e.autoAnimateTo,e.autoAnimateLoop,e.autoAnimateSpeed||1),e.isEnabled!==void 0&&s.setEnabled(e.isEnabled),s}_hookArrayForExcluded(e){const t=e.push;e.push=(...s)=>{const r=t.apply(e,s);for(const l of s)l._resyncLightSource(this);return r};const i=e.splice;e.splice=(s,r)=>{const l=i.apply(e,[s,r]);for(const n of l)n._resyncLightSource(this);return l};for(const s of e)s._resyncLightSource(this)}_hookArrayForIncludedOnly(e){const t=e.push;e.push=(...s)=>{const r=t.apply(e,s);return this._resyncMeshes(),r};const i=e.splice;e.splice=(s,r)=>{const l=i.apply(e,[s,r]);return this._resyncMeshes(),l},this._resyncMeshes()}_resyncMeshes(){for(const e of this.getScene().meshes)e._resyncLightSource(this)}_markMeshesAsLightDirty(){for(const e of this.getScene().meshes)e.lightSources.indexOf(this)!==-1&&e._markSubMeshesAsLightDirty()}_computePhotometricScale(){this._photometricScale=this._getPhotometricScale(),this.getScene().resetCachedMaterial()}_getPhotometricScale(){let e=0;const t=this.getTypeID();let i=this.intensityMode;switch(i===L.INTENSITYMODE_AUTOMATIC&&(t===L.LIGHTTYPEID_DIRECTIONALLIGHT?i=L.INTENSITYMODE_ILLUMINANCE:i=L.INTENSITYMODE_LUMINOUSINTENSITY),t){case L.LIGHTTYPEID_POINTLIGHT:case L.LIGHTTYPEID_SPOTLIGHT:switch(i){case L.INTENSITYMODE_LUMINOUSPOWER:e=1/(4*Math.PI);break;case L.INTENSITYMODE_LUMINOUSINTENSITY:e=1;break;case L.INTENSITYMODE_LUMINANCE:e=this.radius*this.radius;break}break;case L.LIGHTTYPEID_DIRECTIONALLIGHT:switch(i){case L.INTENSITYMODE_ILLUMINANCE:e=1;break;case L.INTENSITYMODE_LUMINANCE:{let s=this.radius;s=Math.max(s,.001),e=2*Math.PI*(1-Math.cos(s));break}}break;case L.LIGHTTYPEID_HEMISPHERICLIGHT:e=1;break}return e}_reorderLightsInScene(){const e=this.getScene();this._renderPriority!=0&&(e.requireLightSorting=!0),this.getScene().sortLightsByPriority()}}L.FALLOFF_DEFAULT=J.FALLOFF_DEFAULT;L.FALLOFF_PHYSICAL=J.FALLOFF_PHYSICAL;L.FALLOFF_GLTF=J.FALLOFF_GLTF;L.FALLOFF_STANDARD=J.FALLOFF_STANDARD;L.LIGHTMAP_DEFAULT=J.LIGHTMAP_DEFAULT;L.LIGHTMAP_SPECULAR=J.LIGHTMAP_SPECULAR;L.LIGHTMAP_SHADOWSONLY=J.LIGHTMAP_SHADOWSONLY;L.INTENSITYMODE_AUTOMATIC=J.INTENSITYMODE_AUTOMATIC;L.INTENSITYMODE_LUMINOUSPOWER=J.INTENSITYMODE_LUMINOUSPOWER;L.INTENSITYMODE_LUMINOUSINTENSITY=J.INTENSITYMODE_LUMINOUSINTENSITY;L.INTENSITYMODE_ILLUMINANCE=J.INTENSITYMODE_ILLUMINANCE;L.INTENSITYMODE_LUMINANCE=J.INTENSITYMODE_LUMINANCE;L.LIGHTTYPEID_POINTLIGHT=J.LIGHTTYPEID_POINTLIGHT;L.LIGHTTYPEID_DIRECTIONALLIGHT=J.LIGHTTYPEID_DIRECTIONALLIGHT;L.LIGHTTYPEID_SPOTLIGHT=J.LIGHTTYPEID_SPOTLIGHT;L.LIGHTTYPEID_HEMISPHERICLIGHT=J.LIGHTTYPEID_HEMISPHERICLIGHT;u([_e()],L.prototype,"diffuse",void 0);u([_e()],L.prototype,"specular",void 0);u([g()],L.prototype,"falloffType",void 0);u([g()],L.prototype,"intensity",void 0);u([g()],L.prototype,"range",null);u([g()],L.prototype,"intensityMode",null);u([g()],L.prototype,"radius",null);u([g()],L.prototype,"_renderPriority",void 0);u([w("_reorderLightsInScene")],L.prototype,"renderPriority",void 0);u([g("shadowEnabled")],L.prototype,"_shadowEnabled",void 0);u([g("excludeWithLayerMask")],L.prototype,"_excludeWithLayerMask",void 0);u([g("includeOnlyWithLayerMask")],L.prototype,"_includeOnlyWithLayerMask",void 0);u([g("lightmapMode")],L.prototype,"_lightmapMode",void 0);function gt(o){const e=[],t=[],i=[],s=[],r=o.width||o.size||1,l=o.height||o.size||1,n=o.sideOrientation===0?0:o.sideOrientation||U.DEFAULTSIDE,h=r/2,f=l/2;t.push(-h,-f,0),i.push(0,0,-1),s.push(0,j.UseOpenGLOrientationForUV?1:0),t.push(h,-f,0),i.push(0,0,-1),s.push(1,j.UseOpenGLOrientationForUV?1:0),t.push(h,f,0),i.push(0,0,-1),s.push(1,j.UseOpenGLOrientationForUV?0:1),t.push(-h,f,0),i.push(0,0,-1),s.push(0,j.UseOpenGLOrientationForUV?0:1),e.push(0),e.push(1),e.push(2),e.push(0),e.push(2),e.push(3),U._ComputeSides(n,t,e,i,s,o.frontUVs,o.backUVs);const c=new U;return c.indices=e,c.positions=t,c.normals=i,c.uvs=s,c}function Et(o,e={},t=null){const i=new F(o,t);return e.sideOrientation=F._GetDefaultSideOrientation(e.sideOrientation),i._originalBuilderSideOrientation=e.sideOrientation,gt(e).applyToMesh(i,e.updatable),e.sourcePlane&&(i.translate(e.sourcePlane.normal,-e.sourcePlane.d),i.setDirection(e.sourcePlane.normal.scale(-1))),i}const bs={CreatePlane:Et};U.CreatePlane=gt;F.CreatePlane=(o,e,t,i,s)=>Et(o,{size:e,width:e,height:e,sideOrientation:s,updatable:i},t);ye.AddNodeConstructor("Light_Type_3",(o,e)=>()=>new je(o,y.Zero(),e));class je extends L{constructor(e,t,i){super(e,i),this.groundColor=new K(0,0,0),this.direction=t||y.Up()}_buildUniformLayout(){this._uniformBuffer.addUniform("vLightData",4),this._uniformBuffer.addUniform("vLightDiffuse",4),this._uniformBuffer.addUniform("vLightSpecular",4),this._uniformBuffer.addUniform("vLightGround",3),this._uniformBuffer.addUniform("shadowsInfo",3),this._uniformBuffer.addUniform("depthValues",2),this._uniformBuffer.create()}getClassName(){return"HemisphericLight"}setDirectionToTarget(e){return this.direction=y.Normalize(e.subtract(y.Zero())),this.direction}getShadowGenerator(){return null}transferToEffect(e,t){const i=y.Normalize(this.direction);return this._uniformBuffer.updateFloat4("vLightData",i.x,i.y,i.z,0,t),this._uniformBuffer.updateColor3("vLightGround",this.groundColor.scale(this.intensity),t),this}transferToNodeMaterialEffect(e,t){const i=y.Normalize(this.direction);return e.setFloat3(t,i.x,i.y,i.z),this}computeWorldMatrix(){return this._worldMatrix||(this._worldMatrix=W.Identity()),this._worldMatrix}getTypeID(){return L.LIGHTTYPEID_HEMISPHERICLIGHT}prepareLightSpecificDefines(e,t){e["HEMILIGHT"+t]=!0}}u([_e()],je.prototype,"groundColor",void 0);u([jt()],je.prototype,"direction",void 0);function St(o){const e=o.height||2;let t=o.diameterTop===0?0:o.diameterTop||o.diameter||1,i=o.diameterBottom===0?0:o.diameterBottom||o.diameter||1;t=t||1e-5,i=i||1e-5;const s=o.tessellation||24,r=o.subdivisions||1,l=!!o.hasRings,n=!!o.enclose,h=o.cap===0?0:o.cap||F.CAP_ALL,f=o.arc&&(o.arc<=0||o.arc>1)?1:o.arc||1,c=o.sideOrientation===0?0:o.sideOrientation||U.DEFAULTSIDE,a=o.faceUV||new Array(3),d=o.faceColors,p=f!==1&&n?2:0,E=l?r:1,S=2+(1+p)*E;let x;for(x=0;x<S;x++)d&&d[x]===void 0&&(d[x]=new Me(1,1,1,1));for(x=0;x<S;x++)a&&a[x]===void 0&&(a[x]=new Re(0,0,1,1));const I=new Array,C=new Array,_=new Array,T=new Array,R=new Array,X=Math.PI*2*f/s;let M,N,P;const V=(i-t)/2/e,z=y.Zero(),B=y.Zero(),le=y.Zero(),he=y.Zero(),H=y.Zero(),ue=Zt.Y;let Z,ee,Te,Ze=1,D=1,Ae=0,Q=0;for(Z=0;Z<=r;Z++)for(N=Z/r,P=(N*(t-i)+i)/2,Ze=l&&Z!==0&&Z!==r?2:1,Te=0;Te<Ze;Te++){for(l&&(D+=Te),n&&(D+=2*Te),ee=0;ee<=s;ee++)M=ee*X,z.x=Math.cos(-M)*P,z.y=-e/2+N*e,z.z=Math.sin(-M)*P,t===0&&Z===r?(B.x=_[_.length-(s+1)*3],B.y=_[_.length-(s+1)*3+1],B.z=_[_.length-(s+1)*3+2]):(B.x=z.x,B.z=z.z,B.y=Math.sqrt(B.x*B.x+B.z*B.z)*V,B.normalize()),ee===0&&(le.copyFrom(z),he.copyFrom(B)),C.push(z.x,z.y,z.z),_.push(B.x,B.y,B.z),l?Q=Ae!==D?a[D].y:a[D].w:Q=a[D].y+(a[D].w-a[D].y)*N,T.push(a[D].x+(a[D].z-a[D].x)*ee/s,j.UseOpenGLOrientationForUV?1-Q:Q),d&&R.push(d[D].r,d[D].g,d[D].b,d[D].a);f!==1&&n&&(C.push(z.x,z.y,z.z),C.push(0,z.y,0),C.push(0,z.y,0),C.push(le.x,le.y,le.z),y.CrossToRef(ue,B,H),H.normalize(),_.push(H.x,H.y,H.z,H.x,H.y,H.z),y.CrossToRef(he,ue,H),H.normalize(),_.push(H.x,H.y,H.z,H.x,H.y,H.z),l?Q=Ae!==D?a[D+1].y:a[D+1].w:Q=a[D+1].y+(a[D+1].w-a[D+1].y)*N,T.push(a[D+1].x,j.UseOpenGLOrientationForUV?1-Q:Q),T.push(a[D+1].z,j.UseOpenGLOrientationForUV?1-Q:Q),l?Q=Ae!==D?a[D+2].y:a[D+2].w:Q=a[D+2].y+(a[D+2].w-a[D+2].y)*N,T.push(a[D+2].x,j.UseOpenGLOrientationForUV?1-Q:Q),T.push(a[D+2].z,j.UseOpenGLOrientationForUV?1-Q:Q),d&&(R.push(d[D+1].r,d[D+1].g,d[D+1].b,d[D+1].a),R.push(d[D+1].r,d[D+1].g,d[D+1].b,d[D+1].a),R.push(d[D+2].r,d[D+2].g,d[D+2].b,d[D+2].a),R.push(d[D+2].r,d[D+2].g,d[D+2].b,d[D+2].a))),Ae!==D&&(Ae=D)}const Le=f!==1&&n?s+4:s;for(Z=0,D=0;D<r;D++){let te=0,re=0,se=0,de=0;for(ee=0;ee<s;ee++)te=Z*(Le+1)+ee,re=(Z+1)*(Le+1)+ee,se=Z*(Le+1)+(ee+1),de=(Z+1)*(Le+1)+(ee+1),I.push(te,re,se),I.push(de,se,re);f!==1&&n&&(I.push(te+2,re+2,se+2),I.push(de+2,se+2,re+2),I.push(te+4,re+4,se+4),I.push(de+4,se+4,re+4)),Z=l?Z+2:Z+1}const qe=te=>{const re=te?t/2:i/2;if(re===0)return;let se,de,ae;const ie=te?a[S-1]:a[0];let ne=null;d&&(ne=te?d[S-1]:d[0]);const Se=C.length/3,Qe=te?e/2:-e/2,Fe=new y(0,Qe,0);C.push(Fe.x,Fe.y,Fe.z),_.push(0,te?1:-1,0);const Ke=ie.y+(ie.w-ie.y)*.5;T.push(ie.x+(ie.z-ie.x)*.5,j.UseOpenGLOrientationForUV?1-Ke:Ke),ne&&R.push(ne.r,ne.g,ne.b,ne.a);const Je=new De(.5,.5);for(ae=0;ae<=s;ae++){se=Math.PI*2*ae*f/s;const et=Math.cos(-se),tt=Math.sin(-se);de=new y(et*re,Qe,tt*re);const it=new De(et*Je.x+.5,tt*Je.y+.5);C.push(de.x,de.y,de.z),_.push(0,te?1:-1,0);const rt=ie.y+(ie.w-ie.y)*it.y;T.push(ie.x+(ie.z-ie.x)*it.x,j.UseOpenGLOrientationForUV?1-rt:rt),ne&&R.push(ne.r,ne.g,ne.b,ne.a)}for(ae=0;ae<s;ae++)te?(I.push(Se),I.push(Se+(ae+2)),I.push(Se+(ae+1))):(I.push(Se),I.push(Se+(ae+1)),I.push(Se+(ae+2)))};(h===F.CAP_START||h===F.CAP_ALL)&&qe(!1),(h===F.CAP_END||h===F.CAP_ALL)&&qe(!0),U._ComputeSides(c,C,I,_,T,o.frontUVs,o.backUVs);const Ee=new U;return Ee.indices=I,Ee.positions=C,Ee.normals=_,Ee.uvs=T,d&&(Ee.colors=R),Ee}function xt(o,e={},t){const i=new F(o,t);return e.sideOrientation=F._GetDefaultSideOrientation(e.sideOrientation),i._originalBuilderSideOrientation=e.sideOrientation,St(e).applyToMesh(i,e.updatable),i}const Ls={CreateCylinder:xt};U.CreateCylinder=St;F.CreateCylinder=(o,e,t,i,s,r,l,n,h)=>((l===void 0||!(l instanceof He))&&(l!==void 0&&(h=n||F.DEFAULTSIDE,n=l),l=r,r=1),xt(o,{height:e,diameterTop:t,diameterBottom:i,tessellation:s,subdivisions:r,sideOrientation:h,updatable:n},l));function Tt(o){const e=[],t=[],i=[],s=[],r=o.diameter||1,l=o.thickness||.5,n=o.tessellation||16,h=o.sideOrientation===0?0:o.sideOrientation||U.DEFAULTSIDE,f=n+1;for(let a=0;a<=n;a++){const d=a/n,p=a*Math.PI*2/n-Math.PI/2,E=W.Translation(r/2,0,0).multiply(W.RotationY(p));for(let S=0;S<=n;S++){const x=1-S/n,I=S*Math.PI*2/n+Math.PI,C=Math.cos(I),_=Math.sin(I);let T=new y(C,_,0),R=T.scale(l/2);const X=new De(d,x);R=y.TransformCoordinates(R,E),T=y.TransformNormal(T,E),t.push(R.x,R.y,R.z),i.push(T.x,T.y,T.z),s.push(X.x,j.UseOpenGLOrientationForUV?1-X.y:X.y);const M=(a+1)%f,N=(S+1)%f;e.push(a*f+S),e.push(a*f+N),e.push(M*f+S),e.push(a*f+N),e.push(M*f+N),e.push(M*f+S)}}U._ComputeSides(h,t,e,i,s,o.frontUVs,o.backUVs);const c=new U;return c.indices=e,c.positions=t,c.normals=i,c.uvs=s,c}function At(o,e={},t){const i=new F(o,t);return e.sideOrientation=F._GetDefaultSideOrientation(e.sideOrientation),i._originalBuilderSideOrientation=e.sideOrientation,Tt(e).applyToMesh(i,e.updatable),i}const Ns={CreateTorus:At};U.CreateTorus=Tt;F.CreateTorus=(o,e,t,i,s,r,l)=>At(o,{diameter:e,thickness:t,tessellation:i,sideOrientation:l,updatable:r},s);F._GroundMeshParser=(o,e)=>be.Parse(o,e);class be extends F{constructor(e,t){super(e,t),this.generateOctree=!1}getClassName(){return"GroundMesh"}get subdivisions(){return Math.min(this._subdivisionsX,this._subdivisionsY)}get subdivisionsX(){return this._subdivisionsX}get subdivisionsY(){return this._subdivisionsY}optimize(e,t=32){this._subdivisionsX=e,this._subdivisionsY=e,this.subdivide(e);const i=this;i.createOrUpdateSubmeshesOctree&&i.createOrUpdateSubmeshesOctree(t)}getHeightAtCoordinates(e,t){const i=this.getWorldMatrix(),s=Y.Matrix[5];i.invertToRef(s);const r=Y.Vector3[8];if(y.TransformCoordinatesFromFloatsToRef(e,0,t,s,r),e=r.x,t=r.z,e<this._minX||e>=this._maxX||t<=this._minZ||t>this._maxZ)return this.position.y;(!this._heightQuads||this._heightQuads.length==0)&&(this._initHeightQuads(),this._computeHeightQuads());const l=this._getFacetAt(e,t),n=-(l.x*e+l.z*t+l.w)/l.y;return y.TransformCoordinatesFromFloatsToRef(0,n,0,i,r),r.y}getNormalAtCoordinates(e,t){const i=new y(0,1,0);return this.getNormalAtCoordinatesToRef(e,t,i),i}getNormalAtCoordinatesToRef(e,t,i){const s=this.getWorldMatrix(),r=Y.Matrix[5];s.invertToRef(r);const l=Y.Vector3[8];if(y.TransformCoordinatesFromFloatsToRef(e,0,t,r,l),e=l.x,t=l.z,e<this._minX||e>this._maxX||t<this._minZ||t>this._maxZ)return this;(!this._heightQuads||this._heightQuads.length==0)&&(this._initHeightQuads(),this._computeHeightQuads());const n=this._getFacetAt(e,t);return y.TransformNormalFromFloatsToRef(n.x,n.y,n.z,s,i),this}updateCoordinateHeights(){return(!this._heightQuads||this._heightQuads.length==0)&&this._initHeightQuads(),this._computeHeightQuads(),this}_getFacetAt(e,t){const i=Math.floor((e+this._maxX)*this._subdivisionsX/this._width),s=Math.floor(-(t+this._maxZ)*this._subdivisionsY/this._height+this._subdivisionsY),r=this._heightQuads[s*this._subdivisionsX+i];let l;return t<r.slope.x*e+r.slope.y?l=r.facet1:l=r.facet2,l}_initHeightQuads(){const e=this._subdivisionsX,t=this._subdivisionsY;this._heightQuads=new Array;for(let i=0;i<t;i++)for(let s=0;s<e;s++){const r={slope:De.Zero(),facet1:new Re(0,0,0,0),facet2:new Re(0,0,0,0)};this._heightQuads[i*e+s]=r}return this}_computeHeightQuads(){const e=this.getVerticesData(k.PositionKind);if(!e)return this;const t=Y.Vector3[3],i=Y.Vector3[2],s=Y.Vector3[1],r=Y.Vector3[0],l=Y.Vector3[4],n=Y.Vector3[5],h=Y.Vector3[6],f=Y.Vector3[7],c=Y.Vector3[8];let a=0,d=0,p=0,E=0,S=0,x=0,I=0;const C=this._subdivisionsX,_=this._subdivisionsY;for(let T=0;T<_;T++)for(let R=0;R<C;R++){a=R*3,d=T*(C+1)*3,p=(T+1)*(C+1)*3,t.x=e[d+a],t.y=e[d+a+1],t.z=e[d+a+2],i.x=e[d+a+3],i.y=e[d+a+4],i.z=e[d+a+5],s.x=e[p+a],s.y=e[p+a+1],s.z=e[p+a+2],r.x=e[p+a+3],r.y=e[p+a+4],r.z=e[p+a+5],E=(r.z-t.z)/(r.x-t.x),S=t.z-E*t.x,i.subtractToRef(t,l),s.subtractToRef(t,n),r.subtractToRef(t,h),y.CrossToRef(h,n,f),y.CrossToRef(l,h,c),f.normalize(),c.normalize(),x=-(f.x*t.x+f.y*t.y+f.z*t.z),I=-(c.x*i.x+c.y*i.y+c.z*i.z);const X=this._heightQuads[T*C+R];X.slope.copyFromFloats(E,S),X.facet1.copyFromFloats(f.x,f.y,f.z,x),X.facet2.copyFromFloats(c.x,c.y,c.z,I)}return this}serialize(e){super.serialize(e),e.subdivisionsX=this._subdivisionsX,e.subdivisionsY=this._subdivisionsY,e.minX=this._minX,e.maxX=this._maxX,e.minZ=this._minZ,e.maxZ=this._maxZ,e.width=this._width,e.height=this._height}static Parse(e,t){const i=new be(e.name,t);return i._subdivisionsX=e.subdivisionsX||1,i._subdivisionsY=e.subdivisionsY||1,i._minX=e.minX,i._maxX=e.maxX,i._minZ=e.minZ,i._maxZ=e.maxZ,i._width=e.width,i._height=e.height,i}}function It(o){const e=[],t=[],i=[],s=[];let r,l;const n=o.width||1,h=o.height||1,f=o.subdivisionsX||o.subdivisions||1,c=o.subdivisionsY||o.subdivisions||1;for(r=0;r<=c;r++)for(l=0;l<=f;l++){const d=new y(l*n/f-n/2,0,(c-r)*h/c-h/2),p=new y(0,1,0);t.push(d.x,d.y,d.z),i.push(p.x,p.y,p.z),s.push(l/f,j.UseOpenGLOrientationForUV?r/c:1-r/c)}for(r=0;r<c;r++)for(l=0;l<f;l++)e.push(l+1+(r+1)*(f+1)),e.push(l+1+r*(f+1)),e.push(l+r*(f+1)),e.push(l+(r+1)*(f+1)),e.push(l+1+(r+1)*(f+1)),e.push(l+r*(f+1));const a=new U;return a.indices=e,a.positions=t,a.normals=i,a.uvs=s,a}function Ct(o){const e=o.xmin!==void 0&&o.xmin!==null?o.xmin:-1,t=o.zmin!==void 0&&o.zmin!==null?o.zmin:-1,i=o.xmax!==void 0&&o.xmax!==null?o.xmax:1,s=o.zmax!==void 0&&o.zmax!==null?o.zmax:1,r=o.subdivisions||{w:1,h:1},l=o.precision||{w:1,h:1},n=new Array,h=new Array,f=new Array,c=new Array;let a,d,p,E;r.h=r.h<1?1:r.h,r.w=r.w<1?1:r.w,l.w=l.w<1?1:l.w,l.h=l.h<1?1:l.h;const S={w:(i-e)/r.w,h:(s-t)/r.h};function x(C,_,T,R){const X=h.length/3,M=l.w+1;for(a=0;a<l.h;a++)for(d=0;d<l.w;d++){const V=[X+d+a*M,X+(d+1)+a*M,X+(d+1)+(a+1)*M,X+d+(a+1)*M];n.push(V[1]),n.push(V[2]),n.push(V[3]),n.push(V[0]),n.push(V[1]),n.push(V[3])}const N=y.Zero(),P=new y(0,1,0);for(a=0;a<=l.h;a++)for(N.z=a*(R-_)/l.h+_,d=0;d<=l.w;d++)N.x=d*(T-C)/l.w+C,N.y=0,h.push(N.x,N.y,N.z),f.push(P.x,P.y,P.z),c.push(d/l.w,a/l.h)}for(p=0;p<r.h;p++)for(E=0;E<r.w;E++)x(e+E*S.w,t+p*S.h,e+(E+1)*S.w,t+(p+1)*S.h);const I=new U;return I.indices=n,I.positions=h,I.normals=f,I.uvs=c,I}function Mt(o){const e=[],t=[],i=[],s=[];let r,l;const n=o.colorFilter||new K(.3,.59,.11),h=o.alphaFilter||0;let f=!1;if(o.minHeight>o.maxHeight){f=!0;const a=o.maxHeight;o.maxHeight=o.minHeight,o.minHeight=a}for(r=0;r<=o.subdivisions;r++)for(l=0;l<=o.subdivisions;l++){const a=new y(l*o.width/o.subdivisions-o.width/2,0,(o.subdivisions-r)*o.height/o.subdivisions-o.height/2),d=(a.x+o.width/2)/o.width*(o.bufferWidth-1)|0,p=(1-(a.z+o.height/2)/o.height)*(o.bufferHeight-1)|0,E=(d+p*o.bufferWidth)*4;let S=o.buffer[E]/255,x=o.buffer[E+1]/255,I=o.buffer[E+2]/255;const C=o.buffer[E+3]/255;f&&(S=1-S,x=1-x,I=1-I);const _=S*n.r+x*n.g+I*n.b;C>=h?a.y=o.minHeight+(o.maxHeight-o.minHeight)*_:a.y=o.minHeight-qt,t.push(a.x,a.y,a.z),i.push(0,0,0),s.push(l/o.subdivisions,1-r/o.subdivisions)}for(r=0;r<o.subdivisions;r++)for(l=0;l<o.subdivisions;l++){const a=l+1+(r+1)*(o.subdivisions+1),d=l+1+r*(o.subdivisions+1),p=l+r*(o.subdivisions+1),E=l+(r+1)*(o.subdivisions+1),S=t[a*3+1]>=o.minHeight,x=t[d*3+1]>=o.minHeight,I=t[p*3+1]>=o.minHeight;S&&x&&I&&(e.push(a),e.push(d),e.push(p)),t[E*3+1]>=o.minHeight&&S&&I&&(e.push(E),e.push(a),e.push(p))}U.ComputeNormals(t,e,i);const c=new U;return c.indices=e,c.positions=t,c.normals=i,c.uvs=s,c}function Rt(o,e={},t){const i=new be(o,t);return i._setReady(!1),i._subdivisionsX=e.subdivisionsX||e.subdivisions||1,i._subdivisionsY=e.subdivisionsY||e.subdivisions||1,i._width=e.width||1,i._height=e.height||1,i._maxX=i._width/2,i._maxZ=i._height/2,i._minX=-i._maxX,i._minZ=-i._maxZ,It(e).applyToMesh(i,e.updatable),i._setReady(!0),i}function Dt(o,e,t=null){const i=new F(o,t);return Ct(e).applyToMesh(i,e.updatable),i}function Pt(o,e,t={},i=null){const s=t.width||10,r=t.height||10,l=t.subdivisions||1,n=t.minHeight||0,h=t.maxHeight||1,f=t.colorFilter||new K(.3,.59,.11),c=t.alphaFilter||0,a=t.updatable,d=t.onReady;i=i||Ce.LastCreatedScene;const p=new be(o,i);p._subdivisionsX=l,p._subdivisionsY=l,p._width=s,p._height=r,p._maxX=p._width/2,p._maxZ=p._height/2,p._minX=-p._maxX,p._minZ=-p._maxZ,p._setReady(!1);const E=S=>{const x=S.width,I=S.height;if(i.isDisposed)return;const C=i==null?void 0:i.getEngine().resizeImageBitmap(S,x,I);Mt({width:s,height:r,subdivisions:l,minHeight:n,maxHeight:h,colorFilter:f,buffer:C,bufferWidth:x,bufferHeight:I,alphaFilter:c}).applyToMesh(p,a),d&&d(p),p._setReady(!0)};return Ie.LoadImage(e,E,()=>{},i.offlineProvider),p}const ys={CreateGround:Rt,CreateGroundFromHeightMap:Pt,CreateTiledGround:Dt};U.CreateGround=It;U.CreateTiledGround=Ct;U.CreateGroundFromHeightMap=Mt;F.CreateGround=(o,e,t,i,s,r)=>Rt(o,{width:e,height:t,subdivisions:i,updatable:r},s);F.CreateTiledGround=(o,e,t,i,s,r,l,n,h)=>Dt(o,{xmin:e,zmin:t,xmax:i,zmax:s,subdivisions:r,precision:l,updatable:h},n);F.CreateGroundFromHeightMap=(o,e,t,i,s,r,l,n,h,f,c)=>Pt(o,e,{width:t,height:i,subdivisions:s,minHeight:r,maxHeight:l,updatable:h,onReady:f,alphaFilter:c},n);function bt(o){let t=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23];const i=[0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0],s=[];let r=[];const l=o.width||o.size||1,n=o.height||o.size||1,h=o.depth||o.size||1,f=o.wrap||!1;let c=o.topBaseAt===void 0?1:o.topBaseAt,a=o.bottomBaseAt===void 0?0:o.bottomBaseAt;c=(c+4)%4,a=(a+4)%4;const d=[2,0,3,1],p=[2,0,1,3];let E=d[c],S=p[a],x=[1,-1,1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,1,1,-1,1,-1,-1,1,-1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,1,1,-1,1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,-1,-1,-1,1];if(f){t=[2,3,0,2,0,1,4,5,6,4,6,7,9,10,11,9,11,8,12,14,15,12,13,14],x=[-1,1,1,1,1,1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,1,1,1,1,1,-1,1,-1,-1,1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1];let M=[[1,1,1],[-1,1,1],[-1,1,-1],[1,1,-1]],N=[[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,-1,-1]];const P=[17,18,19,16],V=[22,23,20,21];for(;E>0;)M.unshift(M.pop()),P.unshift(P.pop()),E--;for(;S>0;)N.unshift(N.pop()),V.unshift(V.pop()),S--;M=M.flat(),N=N.flat(),x=x.concat(M).concat(N),t.push(P[0],P[2],P[3],P[0],P[1],P[2]),t.push(V[0],V[2],V[3],V[0],V[1],V[2])}const I=[l/2,n/2,h/2];r=x.reduce((M,N,P)=>M.concat(N*I[P%3]),[]);const C=o.sideOrientation===0?0:o.sideOrientation||U.DEFAULTSIDE,_=o.faceUV||new Array(6),T=o.faceColors,R=[];for(let M=0;M<6;M++)_[M]===void 0&&(_[M]=new Re(0,0,1,1)),T&&T[M]===void 0&&(T[M]=new Me(1,1,1,1));for(let M=0;M<6;M++)if(s.push(_[M].z,j.UseOpenGLOrientationForUV?1-_[M].w:_[M].w),s.push(_[M].x,j.UseOpenGLOrientationForUV?1-_[M].w:_[M].w),s.push(_[M].x,j.UseOpenGLOrientationForUV?1-_[M].y:_[M].y),s.push(_[M].z,j.UseOpenGLOrientationForUV?1-_[M].y:_[M].y),T)for(let N=0;N<4;N++)R.push(T[M].r,T[M].g,T[M].b,T[M].a);U._ComputeSides(C,r,t,i,s,o.frontUVs,o.backUVs);const X=new U;if(X.indices=t,X.positions=r,X.normals=i,X.uvs=s,T){const M=C===U.DOUBLESIDE?R.concat(R):R;X.colors=M}return X}function Lt(o,e={},t=null){const i=new F(o,t);return e.sideOrientation=F._GetDefaultSideOrientation(e.sideOrientation),i._originalBuilderSideOrientation=e.sideOrientation,bt(e).applyToMesh(i,e.updatable),i}const Os={CreateBox:Lt};U.CreateBox=bt;F.CreateBox=(o,e,t=null,i,s)=>Lt(o,{size:e,sideOrientation:s,updatable:i},t);function Nt(o){const e=o.segments||32,t=o.diameterX||o.diameter||1,i=o.diameterY||o.diameter||1,s=o.diameterZ||o.diameter||1,r=o.arc&&(o.arc<=0||o.arc>1)?1:o.arc||1,l=o.slice&&o.slice<=0?1:o.slice||1,n=o.sideOrientation===0?0:o.sideOrientation||U.DEFAULTSIDE,h=!!o.dedupTopBottomIndices,f=new y(t/2,i/2,s/2),c=2+e,a=2*c,d=[],p=[],E=[],S=[];for(let I=0;I<=c;I++){const C=I/c,_=C*Math.PI*l;for(let T=0;T<=a;T++){const R=T/a,X=R*Math.PI*2*r,M=W.RotationZ(-_),N=W.RotationY(X),P=y.TransformCoordinates(y.Up(),M),V=y.TransformCoordinates(P,N),z=V.multiply(f),B=V.divide(f).normalize();p.push(z.x,z.y,z.z),E.push(B.x,B.y,B.z),S.push(R,j.UseOpenGLOrientationForUV?1-C:C)}if(I>0){const T=p.length/3;for(let R=T-2*(a+1);R+a+2<T;R++)h?(I>1&&(d.push(R),d.push(R+1),d.push(R+a+1)),(I<c||l<1)&&(d.push(R+a+1),d.push(R+1),d.push(R+a+2))):(d.push(R),d.push(R+1),d.push(R+a+1),d.push(R+a+1),d.push(R+1),d.push(R+a+2))}}U._ComputeSides(n,p,d,E,S,o.frontUVs,o.backUVs);const x=new U;return x.indices=d,x.positions=p,x.normals=E,x.uvs=S,x}function yt(o,e={},t=null){const i=new F(o,t);return e.sideOrientation=F._GetDefaultSideOrientation(e.sideOrientation),i._originalBuilderSideOrientation=e.sideOrientation,Nt(e).applyToMesh(i,e.updatable),i}const Fs={CreateSphere:yt};U.CreateSphere=Nt;F.CreateSphere=(o,e,t,i,s,r)=>yt(o,{segments:e,diameterX:t,diameterY:t,diameterZ:t,sideOrientation:r,updatable:s},i);const Xe={effect:null,subMesh:null};class ve extends ht{constructor(e,t,i,s={},r=!0){super(e,t,r),this._textures={},this._textureArrays={},this._externalTextures={},this._floats={},this._ints={},this._uints={},this._floatsArrays={},this._colors3={},this._colors3Arrays={},this._colors4={},this._colors4Arrays={},this._vectors2={},this._vectors3={},this._vectors4={},this._quaternions={},this._quaternionsArrays={},this._matrices={},this._matrixArrays={},this._matrices3x3={},this._matrices2x2={},this._vectors2Arrays={},this._vectors3Arrays={},this._vectors4Arrays={},this._uniformBuffers={},this._textureSamplers={},this._storageBuffers={},this._cachedWorldViewMatrix=new W,this._cachedWorldViewProjectionMatrix=new W,this._multiview=!1,this._materialHelperNeedsPreviousMatrices=!1,this._shaderPath=i,this._options=Object.assign({needAlphaBlending:!1,needAlphaTesting:!1,attributes:["position","normal","uv"],uniforms:["worldViewProjection"],uniformBuffers:[],samplers:[],externalTextures:[],samplerObjects:[],storageBuffers:[],defines:[],useClipPlane:!1},s)}get shaderPath(){return this._shaderPath}set shaderPath(e){this._shaderPath=e}get options(){return this._options}get isMultiview(){return this._multiview}getClassName(){return"ShaderMaterial"}needAlphaBlending(){return this.alpha<1||this._options.needAlphaBlending}needAlphaTesting(){return this._options.needAlphaTesting}_checkUniform(e){this._options.uniforms.indexOf(e)===-1&&this._options.uniforms.push(e)}setTexture(e,t){return this._options.samplers.indexOf(e)===-1&&this._options.samplers.push(e),this._textures[e]=t,this}setTextureArray(e,t){return this._options.samplers.indexOf(e)===-1&&this._options.samplers.push(e),this._checkUniform(e),this._textureArrays[e]=t,this}setExternalTexture(e,t){return this._options.externalTextures.indexOf(e)===-1&&this._options.externalTextures.push(e),this._externalTextures[e]=t,this}setFloat(e,t){return this._checkUniform(e),this._floats[e]=t,this}setInt(e,t){return this._checkUniform(e),this._ints[e]=t,this}setUInt(e,t){return this._checkUniform(e),this._uints[e]=t,this}setFloats(e,t){return this._checkUniform(e),this._floatsArrays[e]=t,this}setColor3(e,t){return this._checkUniform(e),this._colors3[e]=t,this}setColor3Array(e,t){return this._checkUniform(e),this._colors3Arrays[e]=t.reduce((i,s)=>(s.toArray(i,i.length),i),[]),this}setColor4(e,t){return this._checkUniform(e),this._colors4[e]=t,this}setColor4Array(e,t){return this._checkUniform(e),this._colors4Arrays[e]=t.reduce((i,s)=>(s.toArray(i,i.length),i),[]),this}setVector2(e,t){return this._checkUniform(e),this._vectors2[e]=t,this}setVector3(e,t){return this._checkUniform(e),this._vectors3[e]=t,this}setVector4(e,t){return this._checkUniform(e),this._vectors4[e]=t,this}setQuaternion(e,t){return this._checkUniform(e),this._quaternions[e]=t,this}setQuaternionArray(e,t){return this._checkUniform(e),this._quaternionsArrays[e]=t.reduce((i,s)=>(s.toArray(i,i.length),i),[]),this}setMatrix(e,t){return this._checkUniform(e),this._matrices[e]=t,this}setMatrices(e,t){this._checkUniform(e);const i=new Float32Array(t.length*16);for(let s=0;s<t.length;s++)t[s].copyToArray(i,s*16);return this._matrixArrays[e]=i,this}setMatrix3x3(e,t){return this._checkUniform(e),this._matrices3x3[e]=t,this}setMatrix2x2(e,t){return this._checkUniform(e),this._matrices2x2[e]=t,this}setArray2(e,t){return this._checkUniform(e),this._vectors2Arrays[e]=t,this}setArray3(e,t){return this._checkUniform(e),this._vectors3Arrays[e]=t,this}setArray4(e,t){return this._checkUniform(e),this._vectors4Arrays[e]=t,this}setUniformBuffer(e,t){return this._options.uniformBuffers.indexOf(e)===-1&&this._options.uniformBuffers.push(e),this._uniformBuffers[e]=t,this}setTextureSampler(e,t){return this._options.samplerObjects.indexOf(e)===-1&&this._options.samplerObjects.push(e),this._textureSamplers[e]=t,this}setStorageBuffer(e,t){return this._options.storageBuffers.indexOf(e)===-1&&this._options.storageBuffers.push(e),this._storageBuffers[e]=t,this}setDefine(e,t){const i=e.trimEnd()+" ",s=this.options.defines.findIndex(r=>r===e||r.startsWith(i));return s>=0&&this.options.defines.splice(s,1),(typeof t!="boolean"||t)&&this.options.defines.push(i+t),this}isReadyForSubMesh(e,t,i){return this.isReady(e,i,t)}isReady(e,t,i){var s,r,l,n;const h=i&&this._storeEffectOnSubMeshes;if(this.isFrozen)if(h){if(i.effect&&i.effect._wasPreviouslyReady)return!0}else{const P=this._drawWrapper.effect;if(P&&P._wasPreviouslyReady&&P._wasPreviouslyUsingInstances===t)return!0}const f=this.getScene(),c=f.getEngine(),a=[],d=[],p=new pt;let E=this._shaderPath,S=this._options.uniforms,x=this._options.uniformBuffers,I=this._options.samplers;c.getCaps().multiview&&f.activeCamera&&f.activeCamera.outputRenderTarget&&f.activeCamera.outputRenderTarget.getViewCount()>1&&(this._multiview=!0,a.push("#define MULTIVIEW"),this._options.uniforms.indexOf("viewProjection")!==-1&&this._options.uniforms.indexOf("viewProjectionR")===-1&&this._options.uniforms.push("viewProjectionR"));for(let P=0;P<this._options.defines.length;P++){const V=this._options.defines[P].indexOf("#define")===0?this._options.defines[P]:`#define ${this._options.defines[P]}`;a.push(V)}for(let P=0;P<this._options.attributes.length;P++)d.push(this._options.attributes[P]);if(e&&e.isVerticesDataPresent(k.ColorKind)&&(d.push(k.ColorKind),a.push("#define VERTEXCOLOR")),t&&(a.push("#define INSTANCES"),O.PushAttributesForInstances(d,this._materialHelperNeedsPreviousMatrices),e!=null&&e.hasThinInstances&&(a.push("#define THIN_INSTANCES"),e&&e.isVerticesDataPresent(k.ColorInstanceKind)&&(d.push(k.ColorInstanceKind),a.push("#define INSTANCESCOLOR")))),e&&e.useBones&&e.computeBonesUsingShaders&&e.skeleton){d.push(k.MatricesIndicesKind),d.push(k.MatricesWeightsKind),e.numBoneInfluencers>4&&(d.push(k.MatricesIndicesExtraKind),d.push(k.MatricesWeightsExtraKind));const P=e.skeleton;a.push("#define NUM_BONE_INFLUENCERS "+e.numBoneInfluencers),p.addCPUSkinningFallback(0,e),P.isUsingTextureForMatrices?(a.push("#define BONETEXTURE"),this._options.uniforms.indexOf("boneTextureWidth")===-1&&this._options.uniforms.push("boneTextureWidth"),this._options.samplers.indexOf("boneSampler")===-1&&this._options.samplers.push("boneSampler")):(a.push("#define BonesPerMesh "+(P.bones.length+1)),this._options.uniforms.indexOf("mBones")===-1&&this._options.uniforms.push("mBones"))}else a.push("#define NUM_BONE_INFLUENCERS 0");let C=0;const _=e?e.morphTargetManager:null;if(_){const P=_.supportsUVs&&a.indexOf("#define UV1")!==-1,V=_.supportsTangents&&a.indexOf("#define TANGENT")!==-1,z=_.supportsNormals&&a.indexOf("#define NORMAL")!==-1;C=_.numInfluencers,P&&a.push("#define MORPHTARGETS_UV"),V&&a.push("#define MORPHTARGETS_TANGENT"),z&&a.push("#define MORPHTARGETS_NORMAL"),C>0&&a.push("#define MORPHTARGETS"),_.isUsingTextureForTargets&&(a.push("#define MORPHTARGETS_TEXTURE"),this._options.uniforms.indexOf("morphTargetTextureIndices")===-1&&this._options.uniforms.push("morphTargetTextureIndices"),this._options.samplers.indexOf("morphTargets")===-1&&this._options.samplers.push("morphTargets")),a.push("#define NUM_MORPH_INFLUENCERS "+C);for(let B=0;B<C;B++)d.push(k.PositionKind+B),z&&d.push(k.NormalKind+B),V&&d.push(k.TangentKind+B),P&&d.push(k.UVKind+"_"+B);C>0&&(S=S.slice(),S.push("morphTargetInfluences"),S.push("morphTargetTextureInfo"),S.push("morphTargetTextureIndices"))}else a.push("#define NUM_MORPH_INFLUENCERS 0");if(e){const P=e.bakedVertexAnimationManager;P&&P.isEnabled&&(a.push("#define BAKED_VERTEX_ANIMATION_TEXTURE"),this._options.uniforms.indexOf("bakedVertexAnimationSettings")===-1&&this._options.uniforms.push("bakedVertexAnimationSettings"),this._options.uniforms.indexOf("bakedVertexAnimationTextureSizeInverted")===-1&&this._options.uniforms.push("bakedVertexAnimationTextureSizeInverted"),this._options.uniforms.indexOf("bakedVertexAnimationTime")===-1&&this._options.uniforms.push("bakedVertexAnimationTime"),this._options.samplers.indexOf("bakedVertexAnimationTexture")===-1&&this._options.samplers.push("bakedVertexAnimationTexture")),O.PrepareAttributesForBakedVertexAnimation(d,e,a)}for(const P in this._textures)if(!this._textures[P].isReady())return!1;e&&this._shouldTurnAlphaTestOn(e)&&a.push("#define ALPHATEST"),this._options.useClipPlane!==!1&&(ct(S),Qt(this,f,a)),this.customShaderNameResolve&&(S=S.slice(),x=x.slice(),I=I.slice(),E=this.customShaderNameResolve(E,S,x,I,a,d));const T=h?i._getDrawWrapper():this._drawWrapper,R=(s=T==null?void 0:T.effect)!==null&&s!==void 0?s:null,X=(r=T==null?void 0:T.defines)!==null&&r!==void 0?r:null,M=a.join(`
`);let N=R;return X!==M&&(N=c.createEffect(E,{attributes:d,uniformsNames:S,uniformBuffersNames:x,samplers:I,defines:M,fallbacks:p,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousMorphTargets:C},shaderLanguage:this._options.shaderLanguage},c),h?i.setEffect(N,M,this._materialContext):T&&T.setEffect(N,M),this._onEffectCreatedObservable&&(Xe.effect=N,Xe.subMesh=(l=i??(e==null?void 0:e.subMeshes[0]))!==null&&l!==void 0?l:null,this._onEffectCreatedObservable.notifyObservers(Xe))),N._wasPreviouslyUsingInstances=!!t,!((n=!(N!=null&&N.isReady()))!==null&&n!==void 0)||n?!1:(R!==N&&f.resetCachedMaterial(),N._wasPreviouslyReady=!0,!0)}bindOnlyWorldMatrix(e,t){const i=this.getScene(),s=t??this.getEffect();s&&(this._options.uniforms.indexOf("world")!==-1&&s.setMatrix("world",e),this._options.uniforms.indexOf("worldView")!==-1&&(e.multiplyToRef(i.getViewMatrix(),this._cachedWorldViewMatrix),s.setMatrix("worldView",this._cachedWorldViewMatrix)),this._options.uniforms.indexOf("worldViewProjection")!==-1&&(e.multiplyToRef(i.getTransformMatrix(),this._cachedWorldViewProjectionMatrix),s.setMatrix("worldViewProjection",this._cachedWorldViewProjectionMatrix)))}bindForSubMesh(e,t,i){var s;this.bind(e,t,(s=i._drawWrapperOverride)===null||s===void 0?void 0:s.effect,i)}bind(e,t,i,s){var r;const l=s&&this._storeEffectOnSubMeshes,n=i??(l?s.effect:this.getEffect());if(!n)return;this._activeEffect=n,this.bindOnlyWorldMatrix(e,i);const h=this._options.uniformBuffers;let f=!1;if(n&&h&&h.length>0&&this.getScene().getEngine().supportsUniformBuffers)for(let a=0;a<h.length;++a)switch(h[a]){case"Mesh":t&&(t.getMeshUniformBuffer().bindToEffect(n,"Mesh"),t.transferToEffect(e));break;case"Scene":O.BindSceneUniformBuffer(n,this.getScene().getSceneUniformBuffer()),this.getScene().finalizeSceneUbo(),f=!0;break}const c=t&&l?this._mustRebind(this.getScene(),n,t.visibility):this.getScene().getCachedMaterial()!==this;if(n&&c){!f&&this._options.uniforms.indexOf("view")!==-1&&n.setMatrix("view",this.getScene().getViewMatrix()),!f&&this._options.uniforms.indexOf("projection")!==-1&&n.setMatrix("projection",this.getScene().getProjectionMatrix()),!f&&this._options.uniforms.indexOf("viewProjection")!==-1&&(n.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._multiview&&n.setMatrix("viewProjectionR",this.getScene()._transformMatrixR)),this.getScene().activeCamera&&this._options.uniforms.indexOf("cameraPosition")!==-1&&n.setVector3("cameraPosition",this.getScene().activeCamera.globalPosition),O.BindBonesParameters(t,n),dt(n,this,this.getScene());let a;for(a in this._textures)n.setTexture(a,this._textures[a]);for(a in this._textureArrays)n.setTextureArray(a,this._textureArrays[a]);for(a in this._externalTextures)n.setExternalTexture(a,this._externalTextures[a]);for(a in this._ints)n.setInt(a,this._ints[a]);for(a in this._uints)n.setUInt(a,this._uints[a]);for(a in this._floats)n.setFloat(a,this._floats[a]);for(a in this._floatsArrays)n.setArray(a,this._floatsArrays[a]);for(a in this._colors3)n.setColor3(a,this._colors3[a]);for(a in this._colors3Arrays)n.setArray3(a,this._colors3Arrays[a]);for(a in this._colors4){const d=this._colors4[a];n.setFloat4(a,d.r,d.g,d.b,d.a)}for(a in this._colors4Arrays)n.setArray4(a,this._colors4Arrays[a]);for(a in this._vectors2)n.setVector2(a,this._vectors2[a]);for(a in this._vectors3)n.setVector3(a,this._vectors3[a]);for(a in this._vectors4)n.setVector4(a,this._vectors4[a]);for(a in this._quaternions)n.setQuaternion(a,this._quaternions[a]);for(a in this._matrices)n.setMatrix(a,this._matrices[a]);for(a in this._matrixArrays)n.setMatrices(a,this._matrixArrays[a]);for(a in this._matrices3x3)n.setMatrix3x3(a,this._matrices3x3[a]);for(a in this._matrices2x2)n.setMatrix2x2(a,this._matrices2x2[a]);for(a in this._vectors2Arrays)n.setArray2(a,this._vectors2Arrays[a]);for(a in this._vectors3Arrays)n.setArray3(a,this._vectors3Arrays[a]);for(a in this._vectors4Arrays)n.setArray4(a,this._vectors4Arrays[a]);for(a in this._quaternionsArrays)n.setArray4(a,this._quaternionsArrays[a]);for(a in this._uniformBuffers){const d=this._uniformBuffers[a].getBuffer();d&&n.bindUniformBuffer(d,a)}for(a in this._textureSamplers)n.setTextureSampler(a,this._textureSamplers[a]);for(a in this._storageBuffers)n.setStorageBuffer(a,this._storageBuffers[a])}if(n&&t&&(c||!this.isFrozen)){const a=t.morphTargetManager;a&&a.numInfluencers>0&&O.BindMorphTargetParameters(t,n);const d=t.bakedVertexAnimationManager;d&&d.isEnabled&&((r=t.bakedVertexAnimationManager)===null||r===void 0||r.bind(n,!!n._wasPreviouslyUsingInstances))}this._afterBind(t,n)}getActiveTextures(){const e=super.getActiveTextures();for(const t in this._textures)e.push(this._textures[t]);for(const t in this._textureArrays){const i=this._textureArrays[t];for(let s=0;s<i.length;s++)e.push(i[s])}return e}hasTexture(e){if(super.hasTexture(e))return!0;for(const t in this._textures)if(this._textures[t]===e)return!0;for(const t in this._textureArrays){const i=this._textureArrays[t];for(let s=0;s<i.length;s++)if(i[s]===e)return!0}return!1}clone(e){const t=q.Clone(()=>new ve(e,this.getScene(),this._shaderPath,this._options,this._storeEffectOnSubMeshes),this);t.name=e,t.id=e,typeof t._shaderPath=="object"&&(t._shaderPath=Object.assign({},t._shaderPath)),this._options=Object.assign({},this._options),Object.keys(this._options).forEach(i=>{const s=this._options[i];Array.isArray(s)&&(this._options[i]=s.slice(0))}),this.stencil.copyTo(t.stencil);for(const i in this._textures)t.setTexture(i,this._textures[i]);for(const i in this._textureArrays)t.setTextureArray(i,this._textureArrays[i]);for(const i in this._externalTextures)t.setExternalTexture(i,this._externalTextures[i]);for(const i in this._ints)t.setInt(i,this._ints[i]);for(const i in this._uints)t.setUInt(i,this._uints[i]);for(const i in this._floats)t.setFloat(i,this._floats[i]);for(const i in this._floatsArrays)t.setFloats(i,this._floatsArrays[i]);for(const i in this._colors3)t.setColor3(i,this._colors3[i]);for(const i in this._colors3Arrays)t._colors3Arrays[i]=this._colors3Arrays[i];for(const i in this._colors4)t.setColor4(i,this._colors4[i]);for(const i in this._colors4Arrays)t._colors4Arrays[i]=this._colors4Arrays[i];for(const i in this._vectors2)t.setVector2(i,this._vectors2[i]);for(const i in this._vectors3)t.setVector3(i,this._vectors3[i]);for(const i in this._vectors4)t.setVector4(i,this._vectors4[i]);for(const i in this._quaternions)t.setQuaternion(i,this._quaternions[i]);for(const i in this._quaternionsArrays)t._quaternionsArrays[i]=this._quaternionsArrays[i];for(const i in this._matrices)t.setMatrix(i,this._matrices[i]);for(const i in this._matrixArrays)t._matrixArrays[i]=this._matrixArrays[i].slice();for(const i in this._matrices3x3)t.setMatrix3x3(i,this._matrices3x3[i]);for(const i in this._matrices2x2)t.setMatrix2x2(i,this._matrices2x2[i]);for(const i in this._vectors2Arrays)t.setArray2(i,this._vectors2Arrays[i]);for(const i in this._vectors3Arrays)t.setArray3(i,this._vectors3Arrays[i]);for(const i in this._vectors4Arrays)t.setArray4(i,this._vectors4Arrays[i]);for(const i in this._uniformBuffers)t.setUniformBuffer(i,this._uniformBuffers[i]);for(const i in this._textureSamplers)t.setTextureSampler(i,this._textureSamplers[i]);for(const i in this._storageBuffers)t.setStorageBuffer(i,this._storageBuffers[i]);return t}dispose(e,t,i){if(t){let s;for(s in this._textures)this._textures[s].dispose();for(s in this._textureArrays){const r=this._textureArrays[s];for(let l=0;l<r.length;l++)r[l].dispose()}}this._textures={},super.dispose(e,t,i)}serialize(){const e=q.Serialize(this);e.customType="BABYLON.ShaderMaterial",e.uniqueId=this.uniqueId,e.options=this._options,e.shaderPath=this._shaderPath,e.storeEffectOnSubMeshes=this._storeEffectOnSubMeshes;let t;e.stencil=this.stencil.serialize(),e.textures={};for(t in this._textures)e.textures[t]=this._textures[t].serialize();e.textureArrays={};for(t in this._textureArrays){e.textureArrays[t]=[];const i=this._textureArrays[t];for(let s=0;s<i.length;s++)e.textureArrays[t].push(i[s].serialize())}e.ints={};for(t in this._ints)e.ints[t]=this._ints[t];e.uints={};for(t in this._uints)e.uints[t]=this._uints[t];e.floats={};for(t in this._floats)e.floats[t]=this._floats[t];e.FloatArrays={};for(t in this._floatsArrays)e.FloatArrays[t]=this._floatsArrays[t];e.colors3={};for(t in this._colors3)e.colors3[t]=this._colors3[t].asArray();e.colors3Arrays={};for(t in this._colors3Arrays)e.colors3Arrays[t]=this._colors3Arrays[t];e.colors4={};for(t in this._colors4)e.colors4[t]=this._colors4[t].asArray();e.colors4Arrays={};for(t in this._colors4Arrays)e.colors4Arrays[t]=this._colors4Arrays[t];e.vectors2={};for(t in this._vectors2)e.vectors2[t]=this._vectors2[t].asArray();e.vectors3={};for(t in this._vectors3)e.vectors3[t]=this._vectors3[t].asArray();e.vectors4={};for(t in this._vectors4)e.vectors4[t]=this._vectors4[t].asArray();e.quaternions={};for(t in this._quaternions)e.quaternions[t]=this._quaternions[t].asArray();e.matrices={};for(t in this._matrices)e.matrices[t]=this._matrices[t].asArray();e.matrixArray={};for(t in this._matrixArrays)e.matrixArray[t]=this._matrixArrays[t];e.matrices3x3={};for(t in this._matrices3x3)e.matrices3x3[t]=this._matrices3x3[t];e.matrices2x2={};for(t in this._matrices2x2)e.matrices2x2[t]=this._matrices2x2[t];e.vectors2Arrays={};for(t in this._vectors2Arrays)e.vectors2Arrays[t]=this._vectors2Arrays[t];e.vectors3Arrays={};for(t in this._vectors3Arrays)e.vectors3Arrays[t]=this._vectors3Arrays[t];e.vectors4Arrays={};for(t in this._vectors4Arrays)e.vectors4Arrays[t]=this._vectors4Arrays[t];e.quaternionsArrays={};for(t in this._quaternionsArrays)e.quaternionsArrays[t]=this._quaternionsArrays[t];return e}static Parse(e,t,i){const s=q.Parse(()=>new ve(e.name,t,e.shaderPath,e.options,e.storeEffectOnSubMeshes),e,t,i);let r;e.stencil&&s.stencil.parse(e.stencil,t,i);for(r in e.textures)s.setTexture(r,v.Parse(e.textures[r],t,i));for(r in e.textureArrays){const l=e.textureArrays[r],n=new Array;for(let h=0;h<l.length;h++)n.push(v.Parse(l[h],t,i));s.setTextureArray(r,n)}for(r in e.ints)s.setInt(r,e.ints[r]);for(r in e.uints)s.setUInt(r,e.uints[r]);for(r in e.floats)s.setFloat(r,e.floats[r]);for(r in e.floatsArrays)s.setFloats(r,e.floatsArrays[r]);for(r in e.colors3)s.setColor3(r,K.FromArray(e.colors3[r]));for(r in e.colors3Arrays){const l=e.colors3Arrays[r].reduce((n,h,f)=>(f%3===0?n.push([h]):n[n.length-1].push(h),n),[]).map(n=>K.FromArray(n));s.setColor3Array(r,l)}for(r in e.colors4)s.setColor4(r,Me.FromArray(e.colors4[r]));for(r in e.colors4Arrays){const l=e.colors4Arrays[r].reduce((n,h,f)=>(f%4===0?n.push([h]):n[n.length-1].push(h),n),[]).map(n=>Me.FromArray(n));s.setColor4Array(r,l)}for(r in e.vectors2)s.setVector2(r,De.FromArray(e.vectors2[r]));for(r in e.vectors3)s.setVector3(r,y.FromArray(e.vectors3[r]));for(r in e.vectors4)s.setVector4(r,Re.FromArray(e.vectors4[r]));for(r in e.quaternions)s.setQuaternion(r,Kt.FromArray(e.quaternions[r]));for(r in e.matrices)s.setMatrix(r,W.FromArray(e.matrices[r]));for(r in e.matrixArray)s._matrixArrays[r]=new Float32Array(e.matrixArray[r]);for(r in e.matrices3x3)s.setMatrix3x3(r,e.matrices3x3[r]);for(r in e.matrices2x2)s.setMatrix2x2(r,e.matrices2x2[r]);for(r in e.vectors2Arrays)s.setArray2(r,e.vectors2Arrays[r]);for(r in e.vectors3Arrays)s.setArray3(r,e.vectors3Arrays[r]);for(r in e.vectors4Arrays)s.setArray4(r,e.vectors4Arrays[r]);for(r in e.quaternionsArrays)s.setArray4(r,e.quaternionsArrays[r]);return s}static ParseFromFileAsync(e,t,i,s=""){return new Promise((r,l)=>{const n=new nt;n.addEventListener("readystatechange",()=>{if(n.readyState==4)if(n.status==200){const h=JSON.parse(n.responseText),f=this.Parse(h,i||Ce.LastCreatedScene,s);e&&(f.name=e),r(f)}else l("Unable to load the ShaderMaterial")}),n.open("GET",t),n.send()})}static ParseFromSnippetAsync(e,t,i=""){return new Promise((s,r)=>{const l=new nt;l.addEventListener("readystatechange",()=>{if(l.readyState==4)if(l.status==200){const n=JSON.parse(JSON.parse(l.responseText).jsonPayload),h=JSON.parse(n.shaderMaterial),f=this.Parse(h,t||Ce.LastCreatedScene,i);f.snippetId=e,s(f)}else r("Unable to load the snippet "+e)}),l.open("GET",this.SnippetUrl+"/"+e.replace(/#/g,"/")),l.send()})}}ve.SnippetUrl="https://snippet.babylonjs.com";ve.CreateFromSnippetAsync=ve.ParseFromSnippetAsync;ke("BABYLON.ShaderMaterial",ve);const xs="colorPixelShader",Ts=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vec4 vColor;
#else
uniform vec4 color;
#endif
#include<clipPlaneFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
gl_FragColor=vColor;
#else
gl_FragColor=color;
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}`;A.ShadersStore[xs]=Ts;const As="colorVertexShader",Is=`attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {
gl_Position=viewProjection*worldPos;
} else {
gl_Position=viewProjectionR*worldPos;
}
#else
gl_Position=viewProjection*worldPos;
#endif
#include<clipPlaneVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`;A.ShadersStore[As]=Is;F._LinesMeshParser=(o,e)=>xe.Parse(o,e);class xe extends F{_isShaderMaterial(e){return e.getClassName()==="ShaderMaterial"}constructor(e,t=null,i=null,s=null,r,l,n,h){super(e,t,i,s,r),this.useVertexColor=l,this.useVertexAlpha=n,this.color=new K(1,1,1),this.alpha=1,s&&(this.color=s.color.clone(),this.alpha=s.alpha,this.useVertexColor=s.useVertexColor,this.useVertexAlpha=s.useVertexAlpha),this.intersectionThreshold=.1;const f=[],c={attributes:[k.PositionKind],uniforms:["world","viewProjection"],needAlphaBlending:!0,defines:f,useClipPlane:null};n===!1?c.needAlphaBlending=!1:c.defines.push("#define VERTEXALPHA"),l?(c.defines.push("#define VERTEXCOLOR"),c.attributes.push(k.ColorKind)):(c.uniforms.push("color"),this._color4=new Me),h?this.material=h:(this.material=new ve("colorShader",this.getScene(),"color",c,!1),this.material.doNotSerialize=!0)}isReady(){return this._lineMaterial.isReady(this,!!this._userInstancedBuffersStorage)?super.isReady():!1}getClassName(){return"LinesMesh"}get material(){return this._lineMaterial}set material(e){this._lineMaterial=e,this._lineMaterial.fillMode=ce.LineListDrawMode}get checkCollisions(){return!1}set checkCollisions(e){}_bind(e,t){if(!this._geometry)return this;const i=this.isUnIndexed?null:this._geometry.getIndexBuffer();if(this._userInstancedBuffersStorage?this._geometry._bind(t,i,this._userInstancedBuffersStorage.vertexBuffers,this._userInstancedBuffersStorage.vertexArrayObjects):this._geometry._bind(t,i),!this.useVertexColor&&this._isShaderMaterial(this._lineMaterial)){const{r:s,g:r,b:l}=this.color;this._color4.set(s,r,l,this.alpha),this._lineMaterial.setColor4("color",this._color4)}return this}_draw(e,t,i){if(!this._geometry||!this._geometry.getVertexBuffers()||!this._unIndexed&&!this._geometry.getIndexBuffer())return this;const s=this.getScene().getEngine();return this._unIndexed?s.drawArraysType(ce.LineListDrawMode,e.verticesStart,e.verticesCount,i):s.drawElementsType(ce.LineListDrawMode,e.indexStart,e.indexCount,i),this}dispose(e,t=!1,i){i||this._lineMaterial.dispose(!1,!1,!0),super.dispose(e)}clone(e,t=null,i){return new xe(e,this.getScene(),t,this,i)}createInstance(e){const t=new Cs(e,this);if(this.instancedBuffers){t.instancedBuffers={};for(const i in this.instancedBuffers)t.instancedBuffers[i]=this.instancedBuffers[i]}return t}serialize(e){super.serialize(e),e.color=this.color.asArray(),e.alpha=this.alpha}static Parse(e,t){const i=new xe(e.name,t);return i.color=K.FromArray(e.color),i.alpha=e.alpha,i}}class Cs extends _t{constructor(e,t){super(e,t),this.intersectionThreshold=t.intersectionThreshold}getClassName(){return"InstancedLinesMesh"}}function Ot(o){const e=[],t=[],i=o.lines,s=o.colors,r=[];let l=0;for(let h=0;h<i.length;h++){const f=i[h];for(let c=0;c<f.length;c++){if(t.push(f[c].x,f[c].y,f[c].z),s){const a=s[h];r.push(a[c].r,a[c].g,a[c].b,a[c].a)}c>0&&(e.push(l-1),e.push(l)),l++}}const n=new U;return n.indices=e,n.positions=t,s&&(n.colors=r),n}function Ft(o){const e=o.dashSize||3,t=o.gapSize||1,i=o.dashNb||200,s=o.points,r=new Array,l=new Array,n=y.Zero();let h=0,f=0,c=0,a=0,d=0,p=0,E=0;for(E=0;E<s.length-1;E++)s[E+1].subtractToRef(s[E],n),h+=n.length();for(c=h/i,a=e*c/(e+t),E=0;E<s.length-1;E++){s[E+1].subtractToRef(s[E],n),f=Math.floor(n.length()/c),n.normalize();for(let x=0;x<f;x++)d=c*x,r.push(s[E].x+d*n.x,s[E].y+d*n.y,s[E].z+d*n.z),r.push(s[E].x+(d+a)*n.x,s[E].y+(d+a)*n.y,s[E].z+(d+a)*n.z),l.push(p,p+1),p+=2}const S=new U;return S.positions=r,S.indices=l,S}function wt(o,e,t){const i=e.instance,s=e.lines,r=e.colors;if(i){const f=i.getVerticesData(k.PositionKind);let c,a;r&&(c=i.getVerticesData(k.ColorKind));let d=0,p=0;for(let E=0;E<s.length;E++){const S=s[E];for(let x=0;x<S.length;x++)f[d]=S[x].x,f[d+1]=S[x].y,f[d+2]=S[x].z,r&&c&&(a=r[E],c[p]=a[x].r,c[p+1]=a[x].g,c[p+2]=a[x].b,c[p+3]=a[x].a,p+=4),d+=3}return i.updateVerticesData(k.PositionKind,f,!1,!1),r&&c&&i.updateVerticesData(k.ColorKind,c,!1,!1),i}const l=!!r,n=new xe(o,t,null,void 0,void 0,l,e.useVertexAlpha,e.material);return Ot(e).applyToMesh(n,e.updatable),n}function Ut(o,e,t=null){const i=e.colors?[e.colors]:null;return wt(o,{lines:[e.points],updatable:e.updatable,instance:e.instance,colors:i,useVertexAlpha:e.useVertexAlpha,material:e.material},t)}function Xt(o,e,t=null){const i=e.points,s=e.instance,r=e.gapSize||1,l=e.dashSize||3;if(s){const f=c=>{const a=y.Zero(),d=c.length/6;let p=0,E=0,S=0,x=0,I=0,C=0,_=0,T=0;for(_=0;_<i.length-1;_++)i[_+1].subtractToRef(i[_],a),p+=a.length();S=p/d;const R=s._creationDataStorage.dashSize,X=s._creationDataStorage.gapSize;for(x=R*S/(R+X),_=0;_<i.length-1;_++)for(i[_+1].subtractToRef(i[_],a),E=Math.floor(a.length()/S),a.normalize(),T=0;T<E&&C<c.length;)I=S*T,c[C]=i[_].x+I*a.x,c[C+1]=i[_].y+I*a.y,c[C+2]=i[_].z+I*a.z,c[C+3]=i[_].x+(I+x)*a.x,c[C+4]=i[_].y+(I+x)*a.y,c[C+5]=i[_].z+(I+x)*a.z,C+=6,T++;for(;C<c.length;)c[C]=i[_].x,c[C+1]=i[_].y,c[C+2]=i[_].z,C+=3};return(e.dashNb||e.dashSize||e.gapSize||e.useVertexAlpha||e.material)&&Ve.Warn("You have used an option other than points with the instance option. Please be aware that these other options will be ignored."),s.updateMeshPositions(f,!1),s}const n=new xe(o,t,null,void 0,void 0,void 0,e.useVertexAlpha,e.material);return Ft(e).applyToMesh(n,e.updatable),n._creationDataStorage=new Jt,n._creationDataStorage.dashSize=l,n._creationDataStorage.gapSize=r,n}const ws={CreateDashedLines:Xt,CreateLineSystem:wt,CreateLines:Ut};U.CreateLineSystem=Ot;U.CreateDashedLines=Ft;F.CreateLines=(o,e,t=null,i=!1,s=null)=>Ut(o,{points:e,updatable:i,instance:s},t);F.CreateDashedLines=(o,e,t,i,s,r=null,l,n)=>Xt(o,{points:e,dashSize:t,gapSize:i,dashNb:s,updatable:l,instance:n},r);export{Ps as $,Ls as A,G as B,xt as C,ge as D,pt as E,ut as F,$e as G,je as H,Cs as I,mt as J,ys as K,L,b as M,be as N,_t as O,ws as P,Es as Q,me as R,m as S,v as T,bs as U,ht as V,Ds as W,Fs as X,Ss as Y,Ns as Z,vt as _,Lt as a,ot as a0,yt as b,Ut as c,ve as d,wt as e,Et as f,At as g,Ye as h,Oe as i,bt as j,xe as k,Os as l,Rs as m,St as n,Xt as o,Ft as p,Rt as q,Pt as r,Mt as s,It as t,Ot as u,gt as v,Nt as w,Dt as x,Ct as y,Tt as z};
