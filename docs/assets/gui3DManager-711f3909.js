import{l as Rs,m as Bs,i as Cs,W as Ai,U as os}from"./utilityLayerRenderer-fefda23f.js";import{h as Ct,V as c,O as x,S as rs,M as li,P as D,Q as S,a6 as ei,X as Li,v as p,T as ne,x as qi,g as si,ao as pt,a9 as ki,C as E,z as Ss,E as Ht,j as _t,l as ge,W as ot,d as K,f as z,ad as Ms,aa as B,n,L as Hi,t as q,p as l,aA as as,R as k,Y as ti,K as ws,aD as Es,D as Os,aF as Ds,q as lt,o as xi,aB as ns,ap as ls,J as Oe,s as Fs,ar as G,aG as le,bs as Qi,aE as Zi,a7 as pi,A as He}from"./runBabylonPlaygroundScene-32a4afbd.js";import{P as $i}from"./physicsImpostor-3dac248c.js";import{S as re}from"./sceneLoader-f06775c7.js";import{l as Ns}from"./meshBuilder-ad173be8.js";import{j as De}from"./havokPlugin-66927be8.js";import{f as se,L as Ei,T as V,a as Bt,S as ii,V as _e,E as be,d as As,H as Ls}from"./linesBuilder-a2dae4c1.js";import{C as Gt}from"./directionalLight-d037032f.js";import{R as Ji}from"./blurPostProcess-f61d1d3e.js";import{D as _s}from"./dynamicTexture-7393bdcd.js";import{A as ts}from"./animationGroup-a96e107c.js";class hs{get delay(){return this.fadeInDelay}set delay(t){this.fadeInDelay=t,this.fadeOutDelay=t}constructor(){this.fadeInDelay=0,this.fadeOutDelay=0,this.fadeInTime=300,this.fadeOutTime=300,this._millisecondsPerFrame=1e3/60,this._hovered=!1,this._hoverValue=0,this._ownerNode=null,this._delay=0,this._time=300,this._update=()=>{if(this._ownerNode){if(this._hoverValue+=this._hovered?this._millisecondsPerFrame:-this._millisecondsPerFrame,this._setAllVisibility(this._ownerNode,(this._hoverValue-this._delay)/this._time),this._ownerNode.visibility>1){if(this._setAllVisibility(this._ownerNode,1),this._hoverValue>this._time){this._hoverValue=this._time,this._detachObserver();return}}else if(this._ownerNode.visibility<0&&(this._setAllVisibility(this._ownerNode,0),this._hoverValue<0)){this._hoverValue=0,this._detachObserver();return}this._attachObserver()}}}get name(){return"FadeInOut"}init(){}attach(t){this._ownerNode=t,this._setAllVisibility(this._ownerNode,0)}detach(){this._ownerNode=null}fadeIn(t=!0){this._delay=t?this.fadeInDelay:this.fadeOutDelay,this._time=t?this.fadeInTime:this.fadeOutTime,this._detachObserver(),!(this._ownerNode&&(t&&this._ownerNode.visibility>=1||!t&&this._ownerNode.visibility<=0))&&(this._hovered=t,this._hovered||(this._delay*=-1),this._ownerNode.visibility>=1?this._hoverValue=this._time:this._ownerNode.visibility<=0&&(this._hoverValue=0),this._update())}fadeOut(){this.fadeIn(!1)}_setAllVisibility(t,e){t.visibility=e,t.getChildMeshes().forEach(i=>{this._setAllVisibility(i,e)})}_attachObserver(){var t;this._onBeforeRenderObserver||(this._onBeforeRenderObserver=(t=this._ownerNode)===null||t===void 0?void 0:t.getScene().onBeforeRenderObservable.add(this._update))}_detachObserver(){var t;this._onBeforeRenderObserver&&((t=this._ownerNode)===null||t===void 0||t.getScene().onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._onBeforeRenderObserver=null)}}class Q{static _RemoveAndStorePivotPoint(t){t&&Q._PivotCached===0&&(t.getPivotPointToRef(Q._OldPivotPoint),Q._PivotPostMultiplyPivotMatrix=t._postMultiplyPivotMatrix,Q._OldPivotPoint.equalsToFloats(0,0,0)||(t.setPivotMatrix(Ct.IdentityReadOnly),Q._OldPivotPoint.subtractToRef(t.getPivotPoint(),Q._PivotTranslation),Q._PivotTmpVector.copyFromFloats(1,1,1),Q._PivotTmpVector.subtractInPlace(t.scaling),Q._PivotTmpVector.multiplyInPlace(Q._PivotTranslation),t.position.addInPlace(Q._PivotTmpVector))),Q._PivotCached++}static _RestorePivotPoint(t){t&&!Q._OldPivotPoint.equalsToFloats(0,0,0)&&Q._PivotCached===1&&(t.setPivotPoint(Q._OldPivotPoint),t._postMultiplyPivotMatrix=Q._PivotPostMultiplyPivotMatrix,Q._PivotTmpVector.copyFromFloats(1,1,1),Q._PivotTmpVector.subtractInPlace(t.scaling),Q._PivotTmpVector.multiplyInPlace(Q._PivotTranslation),t.position.subtractInPlace(Q._PivotTmpVector)),this._PivotCached--}}Q._PivotCached=0;Q._OldPivotPoint=new c;Q._PivotTranslation=new c;Q._PivotTmpVector=new c;Q._PivotPostMultiplyPivotMatrix=!1;class Tt{get currentDraggingPointerID(){return this.currentDraggingPointerId}set currentDraggingPointerID(t){this.currentDraggingPointerId=t}set enabled(t){t!=this._enabled&&this.onEnabledObservable.notifyObservers(t),this._enabled=t}get enabled(){return this._enabled}get options(){return this._options}set options(t){this._options=t}constructor(t){this._useAlternatePickedPointAboveMaxDragAngleDragSpeed=-1.1,this._activeDragButton=-1,this.maxDragAngle=0,this.dragButtons=[0,1,2],this._useAlternatePickedPointAboveMaxDragAngle=!1,this.currentDraggingPointerId=-1,this.dragging=!1,this.dragDeltaRatio=.2,this.updateDragPlane=!0,this._debugMode=!1,this._moving=!1,this.onDragObservable=new x,this.onDragStartObservable=new x,this.onDragEndObservable=new x,this.onEnabledObservable=new x,this.moveAttached=!0,this._enabled=!0,this.startAndReleaseDragOnPointerEvents=!0,this.detachCameraControls=!0,this.useObjectOrientationForDragging=!0,this.validateDrag=i=>!0,this._tmpVector=new c(0,0,0),this._alternatePickedPoint=new c(0,0,0),this._worldDragAxis=new c(0,0,0),this._targetPosition=new c(0,0,0),this._attachedToElement=!1,this._startDragRay=new Ji(new c,new c),this._lastPointerRay={},this._dragDelta=new c,this._pointA=new c(0,0,0),this._pointC=new c(0,0,0),this._localAxis=new c(0,0,0),this._lookAt=new c(0,0,0),this._options=t||{};let e=0;if(this._options.dragAxis&&e++,this._options.dragPlaneNormal&&e++,e>1)throw"Multiple drag modes specified in dragBehavior options. Only one expected"}get name(){return"PointerDrag"}init(){}attach(t,e){this._scene=t.getScene(),t.isNearGrabbable=!0,this.attachedNode=t,Tt._PlaneScene||(this._debugMode?Tt._PlaneScene=this._scene:(Tt._PlaneScene=new rs(this._scene.getEngine(),{virtual:!0}),Tt._PlaneScene.detachControl(),this._scene.onDisposeObservable.addOnce(()=>{Tt._PlaneScene.dispose(),Tt._PlaneScene=null}))),this._dragPlane=se("pointerDragPlane",{size:this._debugMode?1:1e4,updatable:!1,sideOrientation:li.DOUBLESIDE},Tt._PlaneScene),this.lastDragPosition=new c(0,0,0);const i=e||(s=>this.attachedNode==s||s.isDescendantOf(this.attachedNode));this._pointerObserver=this._scene.onPointerObservable.add(s=>{if(!this.enabled){this._attachedToElement&&this.releaseDrag();return}if(s.type==D.POINTERDOWN)this.startAndReleaseDragOnPointerEvents&&!this.dragging&&s.pickInfo&&s.pickInfo.hit&&s.pickInfo.pickedMesh&&s.pickInfo.pickedPoint&&s.pickInfo.ray&&i(s.pickInfo.pickedMesh)&&this._activeDragButton===-1&&this.dragButtons.indexOf(s.event.button)!==-1&&(this._activeDragButton=s.event.button,this._activePointerInfo=s,this._startDrag(s.event.pointerId,s.pickInfo.ray,s.pickInfo.pickedPoint));else if(s.type==D.POINTERUP)this.startAndReleaseDragOnPointerEvents&&this.currentDraggingPointerId==s.event.pointerId&&(this._activeDragButton===s.event.button||this._activeDragButton===-1)&&this.releaseDrag();else if(s.type==D.POINTERMOVE){const o=s.event.pointerId;if(this.currentDraggingPointerId===Tt._AnyMouseId&&o!==Tt._AnyMouseId){const r=s.event;(r.pointerType==="mouse"||!this._scene.getEngine().hostInformation.isMobile&&r instanceof MouseEvent)&&(this._lastPointerRay[this.currentDraggingPointerId]&&(this._lastPointerRay[o]=this._lastPointerRay[this.currentDraggingPointerId],delete this._lastPointerRay[this.currentDraggingPointerId]),this.currentDraggingPointerId=o)}this._lastPointerRay[o]||(this._lastPointerRay[o]=new Ji(new c,new c)),s.pickInfo&&s.pickInfo.ray&&(this._lastPointerRay[o].origin.copyFrom(s.pickInfo.ray.origin),this._lastPointerRay[o].direction.copyFrom(s.pickInfo.ray.direction),this.currentDraggingPointerId==o&&this.dragging&&this._moveDrag(s.pickInfo.ray))}}),this._beforeRenderObserver=this._scene.onBeforeRenderObservable.add(()=>{if(this._moving&&this.moveAttached){let s=!1;Q._RemoveAndStorePivotPoint(this.attachedNode),this._targetPosition.subtractToRef(this.attachedNode.absolutePosition,this._tmpVector),this._tmpVector.scaleInPlace(this.dragDeltaRatio),this.attachedNode.getAbsolutePosition().addToRef(this._tmpVector,this._tmpVector),this.validateDrag(this._tmpVector)&&(this.attachedNode.setAbsolutePosition(this._tmpVector),s=!0),Q._RestorePivotPoint(this.attachedNode),s&&this.attachedNode.computeWorldMatrix()}})}releaseDrag(){if(this.dragging&&(this.dragging=!1,this.onDragEndObservable.notifyObservers({dragPlanePoint:this.lastDragPosition,pointerId:this.currentDraggingPointerId,pointerInfo:this._activePointerInfo})),this.currentDraggingPointerId=-1,this._activeDragButton=-1,this._activePointerInfo=null,this._moving=!1,this.detachCameraControls&&this._attachedToElement&&this._scene.activeCamera&&!this._scene.activeCamera.leftCamera){if(this._scene.activeCamera.getClassName()==="ArcRotateCamera"){const t=this._scene.activeCamera;t.attachControl(t.inputs?t.inputs.noPreventDefault:!0,t._useCtrlForPanning,t._panningMouseButton)}else this._scene.activeCamera.attachControl(this._scene.activeCamera.inputs?this._scene.activeCamera.inputs.noPreventDefault:!0);this._attachedToElement=!1}}startDrag(t=Tt._AnyMouseId,e,i){this._startDrag(t,e,i);let s=this._lastPointerRay[t];t===Tt._AnyMouseId&&(s=this._lastPointerRay[Object.keys(this._lastPointerRay)[0]]),s&&this._moveDrag(s)}_startDrag(t,e,i){if(!this._scene.activeCamera||this.dragging||!this.attachedNode)return;Q._RemoveAndStorePivotPoint(this.attachedNode),e?(this._startDragRay.direction.copyFrom(e.direction),this._startDragRay.origin.copyFrom(e.origin)):(this._startDragRay.origin.copyFrom(this._scene.activeCamera.position),this.attachedNode.getWorldMatrix().getTranslationToRef(this._tmpVector),this._tmpVector.subtractToRef(this._scene.activeCamera.position,this._startDragRay.direction)),this._updateDragPlanePosition(this._startDragRay,i||this._tmpVector);const s=this._pickWithRayOnDragPlane(this._startDragRay);s?(this.dragging=!0,this.currentDraggingPointerId=t,this.lastDragPosition.copyFrom(s),this.onDragStartObservable.notifyObservers({dragPlanePoint:s,pointerId:this.currentDraggingPointerId,pointerInfo:this._activePointerInfo}),this._targetPosition.copyFrom(this.attachedNode.getAbsolutePosition()),this.detachCameraControls&&this._scene.activeCamera&&this._scene.activeCamera.inputs&&!this._scene.activeCamera.leftCamera&&(this._scene.activeCamera.inputs.attachedToElement?(this._scene.activeCamera.detachControl(),this._attachedToElement=!0):this._attachedToElement=!1)):this.releaseDrag(),Q._RestorePivotPoint(this.attachedNode)}_moveDrag(t){this._moving=!0;const e=this._pickWithRayOnDragPlane(t);if(e){Q._RemoveAndStorePivotPoint(this.attachedNode),this.updateDragPlane&&this._updateDragPlanePosition(t,e);let i=0;this._options.dragAxis?(this.useObjectOrientationForDragging?c.TransformCoordinatesToRef(this._options.dragAxis,this.attachedNode.getWorldMatrix().getRotationMatrix(),this._worldDragAxis):this._worldDragAxis.copyFrom(this._options.dragAxis),e.subtractToRef(this.lastDragPosition,this._tmpVector),i=c.Dot(this._tmpVector,this._worldDragAxis),this._worldDragAxis.scaleToRef(i,this._dragDelta)):(i=this._dragDelta.length(),e.subtractToRef(this.lastDragPosition,this._dragDelta)),this._targetPosition.addInPlace(this._dragDelta),this.onDragObservable.notifyObservers({dragDistance:i,delta:this._dragDelta,dragPlanePoint:e,dragPlaneNormal:this._dragPlane.forward,pointerId:this.currentDraggingPointerId,pointerInfo:this._activePointerInfo}),this.lastDragPosition.copyFrom(e),Q._RestorePivotPoint(this.attachedNode)}}_pickWithRayOnDragPlane(t){if(!t)return null;let e=Math.acos(c.Dot(this._dragPlane.forward,t.direction));if(e>Math.PI/2&&(e=Math.PI-e),this.maxDragAngle>0&&e>this.maxDragAngle)if(this._useAlternatePickedPointAboveMaxDragAngle){this._tmpVector.copyFrom(t.direction),this.attachedNode.absolutePosition.subtractToRef(t.origin,this._alternatePickedPoint),this._alternatePickedPoint.normalize(),this._alternatePickedPoint.scaleInPlace(this._useAlternatePickedPointAboveMaxDragAngleDragSpeed*c.Dot(this._alternatePickedPoint,this._tmpVector)),this._tmpVector.addInPlace(this._alternatePickedPoint);const s=c.Dot(this._dragPlane.forward,this._tmpVector);return this._dragPlane.forward.scaleToRef(-s,this._alternatePickedPoint),this._alternatePickedPoint.addInPlace(this._tmpVector),this._alternatePickedPoint.addInPlace(this.attachedNode.absolutePosition),this._alternatePickedPoint}else return null;const i=Tt._PlaneScene.pickWithRay(t,s=>s==this._dragPlane);return i&&i.hit&&i.pickedMesh&&i.pickedPoint?i.pickedPoint:null}_updateDragPlanePosition(t,e){this._pointA.copyFrom(e),this._options.dragAxis?(this.useObjectOrientationForDragging?c.TransformCoordinatesToRef(this._options.dragAxis,this.attachedNode.getWorldMatrix().getRotationMatrix(),this._localAxis):this._localAxis.copyFrom(this._options.dragAxis),t.origin.subtractToRef(this._pointA,this._pointC),this._pointC.normalize(),Math.abs(c.Dot(this._localAxis,this._pointC))>.999?Math.abs(c.Dot(c.UpReadOnly,this._pointC))>.999?this._lookAt.copyFrom(c.Right()):this._lookAt.copyFrom(c.UpReadOnly):(c.CrossToRef(this._localAxis,this._pointC,this._lookAt),c.CrossToRef(this._localAxis,this._lookAt,this._lookAt),this._lookAt.normalize()),this._dragPlane.position.copyFrom(this._pointA),this._pointA.addToRef(this._lookAt,this._lookAt),this._dragPlane.lookAt(this._lookAt)):this._options.dragPlaneNormal?(this.useObjectOrientationForDragging?c.TransformCoordinatesToRef(this._options.dragPlaneNormal,this.attachedNode.getWorldMatrix().getRotationMatrix(),this._localAxis):this._localAxis.copyFrom(this._options.dragPlaneNormal),this._dragPlane.position.copyFrom(this._pointA),this._pointA.addToRef(this._localAxis,this._lookAt),this._dragPlane.lookAt(this._lookAt)):(this._dragPlane.position.copyFrom(this._pointA),this._dragPlane.lookAt(t.origin)),this._dragPlane.position.copyFrom(this.attachedNode.getAbsolutePosition()),this._dragPlane.computeWorldMatrix(!0)}detach(){this._lastPointerRay={},this.attachedNode&&(this.attachedNode.isNearGrabbable=!1),this._pointerObserver&&this._scene.onPointerObservable.remove(this._pointerObserver),this._beforeRenderObserver&&this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver),this._dragPlane&&this._dragPlane.dispose(),this.releaseDrag()}}Tt._AnyMouseId=-2;class Zt{constructor(){this._attachedToElement=!1,this._virtualMeshesInfo={},this._tmpVector=new c,this._tmpQuaternion=new S,this._dragType={NONE:0,DRAG:1,DRAG_WITH_CONTROLLER:2,NEAR_DRAG:3},this._moving=!1,this._dragging=this._dragType.NONE,this.draggableMeshes=null,this.zDragFactor=3,this.currentDraggingPointerIds=[],this.detachCameraControls=!0,this.onDragStartObservable=new x,this.onDragObservable=new x,this.onDragEndObservable=new x,this.allowMultiPointer=!0}get currentDraggingPointerId(){return this.currentDraggingPointerIds[0]!==void 0?this.currentDraggingPointerIds[0]:-1}set currentDraggingPointerId(t){this.currentDraggingPointerIds[0]=t}get currentDraggingPointerID(){return this.currentDraggingPointerId}set currentDraggingPointerID(t){this.currentDraggingPointerId=t}get name(){return"BaseSixDofDrag"}get isMoving(){return this._moving}init(){}get _pointerCamera(){return this._scene.cameraToUseForPointers?this._scene.cameraToUseForPointers:this._scene.activeCamera}_createVirtualMeshInfo(){const t=new ei("",Zt._virtualScene);t.rotationQuaternion=new S;const e=new ei("",Zt._virtualScene);e.rotationQuaternion=new S;const i=new ei("",Zt._virtualScene);return i.rotationQuaternion=new S,{dragging:!1,moving:!1,dragMesh:t,originMesh:e,pivotMesh:i,startingPivotPosition:new c,startingPivotOrientation:new S,startingPosition:new c,startingOrientation:new S,lastOriginPosition:new c,lastDragPosition:new c}}_resetVirtualMeshesPosition(){for(let t=0;t<this.currentDraggingPointerIds.length;t++)this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].pivotMesh.position.copyFrom(this._ownerNode.getAbsolutePivotPoint()),this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].pivotMesh.rotationQuaternion.copyFrom(this._ownerNode.rotationQuaternion),this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].startingPivotPosition.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].pivotMesh.position),this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].startingPivotOrientation.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].pivotMesh.rotationQuaternion),this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].startingPosition.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].dragMesh.position),this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].startingOrientation.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[t]].dragMesh.rotationQuaternion)}_pointerUpdate2D(t,e,i){this._pointerCamera&&this._pointerCamera.cameraRigMode==Li.RIG_MODE_NONE&&!this._pointerCamera._isLeftCamera&&!this._pointerCamera._isRightCamera&&(t.origin.copyFrom(this._pointerCamera.globalPosition),i=0);const s=this._virtualMeshesInfo[e],o=p.Vector3[0];t.origin.subtractToRef(s.lastOriginPosition,o),s.lastOriginPosition.copyFrom(t.origin);const r=-c.Dot(o,t.direction);s.originMesh.addChild(s.dragMesh),s.originMesh.addChild(s.pivotMesh),this._applyZOffset(s.dragMesh,r,i),this._applyZOffset(s.pivotMesh,r,i),s.originMesh.position.copyFrom(t.origin);const a=p.Vector3[0];t.origin.addToRef(t.direction,a),s.originMesh.lookAt(a),s.originMesh.removeChild(s.dragMesh),s.originMesh.removeChild(s.pivotMesh)}_pointerUpdateXR(t,e,i,s){const o=this._virtualMeshesInfo[i];if(o.originMesh.position.copyFrom(t.position),this._dragging===this._dragType.NEAR_DRAG&&e?o.originMesh.rotationQuaternion.copyFrom(e.rotationQuaternion):o.originMesh.rotationQuaternion.copyFrom(t.rotationQuaternion),o.pivotMesh.computeWorldMatrix(!0),o.dragMesh.computeWorldMatrix(!0),s!==0){const r=p.Vector3[0],a=p.Vector3[1];r.copyFrom(this._pointerCamera.getForwardRay().direction),o.originMesh.position.subtractToRef(o.lastOriginPosition,a),o.lastOriginPosition.copyFrom(o.originMesh.position);const _=a.length();a.normalize();const h=p.Vector3[2],d=p.Vector3[3];o.dragMesh.absolutePosition.subtractToRef(this._pointerCamera.globalPosition,h),o.dragMesh.absolutePosition.subtractToRef(o.originMesh.position,d);const u=d.length();h.normalize(),d.normalize();let b=Math.abs(c.Dot(a,d))*c.Dot(a,r)*s*_*u;const w=.01;b<0&&w-u>b&&(b=Math.min(w-u,0)),d.scaleInPlace(b),d.addToRef(o.pivotMesh.absolutePosition,this._tmpVector),o.pivotMesh.setAbsolutePosition(this._tmpVector),d.addToRef(o.dragMesh.absolutePosition,this._tmpVector),o.dragMesh.setAbsolutePosition(this._tmpVector)}}attach(t){this._ownerNode=t,this._scene=this._ownerNode.getScene(),Zt._virtualScene||(Zt._virtualScene=new rs(this._scene.getEngine(),{virtual:!0}),Zt._virtualScene.detachControl());const e=i=>this._ownerNode===i||i.isDescendantOf(this._ownerNode)&&(!this.draggableMeshes||this.draggableMeshes.indexOf(i)!==-1);this._pointerObserver=this._scene.onPointerObservable.add(i=>{const s=i.event.pointerId;this._virtualMeshesInfo[s]||(this._virtualMeshesInfo[s]=this._createVirtualMeshInfo());const o=this._virtualMeshesInfo[s],r=i.event.pointerType==="xr-near";if(i.type==D.POINTERDOWN){if(!o.dragging&&i.pickInfo&&i.pickInfo.hit&&i.pickInfo.pickedMesh&&i.pickInfo.pickedPoint&&i.pickInfo.ray&&(!r||i.pickInfo.aimTransform)&&e(i.pickInfo.pickedMesh)){if(!this.allowMultiPointer&&this.currentDraggingPointerIds.length>0)return;this._pointerCamera&&this._pointerCamera.cameraRigMode===Li.RIG_MODE_NONE&&!this._pointerCamera._isLeftCamera&&!this._pointerCamera._isRightCamera&&i.pickInfo.ray.origin.copyFrom(this._pointerCamera.globalPosition),this._ownerNode.computeWorldMatrix(!0);const a=this._virtualMeshesInfo[s];r?(this._dragging=i.pickInfo.originMesh?this._dragType.NEAR_DRAG:this._dragType.DRAG_WITH_CONTROLLER,a.originMesh.position.copyFrom(i.pickInfo.aimTransform.position),this._dragging===this._dragType.NEAR_DRAG&&i.pickInfo.gripTransform?a.originMesh.rotationQuaternion.copyFrom(i.pickInfo.gripTransform.rotationQuaternion):a.originMesh.rotationQuaternion.copyFrom(i.pickInfo.aimTransform.rotationQuaternion)):(this._dragging=this._dragType.DRAG,a.originMesh.position.copyFrom(i.pickInfo.ray.origin)),a.lastOriginPosition.copyFrom(a.originMesh.position),a.dragMesh.position.copyFrom(i.pickInfo.pickedPoint),a.lastDragPosition.copyFrom(i.pickInfo.pickedPoint),a.pivotMesh.position.copyFrom(this._ownerNode.getAbsolutePivotPoint()),a.pivotMesh.rotationQuaternion.copyFrom(this._ownerNode.absoluteRotationQuaternion),a.startingPosition.copyFrom(a.dragMesh.position),a.startingPivotPosition.copyFrom(a.pivotMesh.position),a.startingOrientation.copyFrom(a.dragMesh.rotationQuaternion),a.startingPivotOrientation.copyFrom(a.pivotMesh.rotationQuaternion),r?(a.originMesh.addChild(a.dragMesh),a.originMesh.addChild(a.pivotMesh)):a.originMesh.lookAt(a.dragMesh.position),a.dragging=!0,this.currentDraggingPointerIds.indexOf(s)===-1&&this.currentDraggingPointerIds.push(s),this.detachCameraControls&&this._pointerCamera&&!this._pointerCamera.leftCamera&&(this._pointerCamera.inputs&&this._pointerCamera.inputs.attachedToElement?(this._pointerCamera.detachControl(),this._attachedToElement=!0):this._attachedToElement=!1),this._targetDragStart(a.pivotMesh.position,a.pivotMesh.rotationQuaternion,s),this.onDragStartObservable.notifyObservers({position:a.pivotMesh.position})}}else if(i.type==D.POINTERUP||i.type==D.POINTERDOUBLETAP){const a=this.currentDraggingPointerIds.indexOf(s);o.dragging=!1,a!==-1&&(this.currentDraggingPointerIds.splice(a,1),this.currentDraggingPointerIds.length===0&&(this._moving=!1,this._dragging=this._dragType.NONE,this.detachCameraControls&&this._attachedToElement&&this._pointerCamera&&!this._pointerCamera.leftCamera&&(this._reattachCameraControls(),this._attachedToElement=!1)),o.originMesh.removeChild(o.dragMesh),o.originMesh.removeChild(o.pivotMesh),this._targetDragEnd(s),this.onDragEndObservable.notifyObservers({}))}else if(i.type==D.POINTERMOVE&&this.currentDraggingPointerIds.indexOf(s)!==-1&&o.dragging&&i.pickInfo&&(i.pickInfo.ray||i.pickInfo.aimTransform)){let _=this.zDragFactor;(this.currentDraggingPointerIds.length>1||i.pickInfo.originMesh)&&(_=0),this._ownerNode.computeWorldMatrix(!0),r?this._pointerUpdateXR(i.pickInfo.aimTransform,i.pickInfo.gripTransform,s,_):this._pointerUpdate2D(i.pickInfo.ray,s,_),this._tmpQuaternion.copyFrom(o.startingPivotOrientation),this._tmpQuaternion.x=-this._tmpQuaternion.x,this._tmpQuaternion.y=-this._tmpQuaternion.y,this._tmpQuaternion.z=-this._tmpQuaternion.z,o.pivotMesh.absoluteRotationQuaternion.multiplyToRef(this._tmpQuaternion,this._tmpQuaternion),o.pivotMesh.absolutePosition.subtractToRef(o.startingPivotPosition,this._tmpVector),this.onDragObservable.notifyObservers({delta:this._tmpVector,position:o.pivotMesh.position,pickInfo:i.pickInfo}),this._targetDrag(this._tmpVector,this._tmpQuaternion,s),o.lastDragPosition.copyFrom(o.dragMesh.absolutePosition),this._moving=!0}})}_applyZOffset(t,e,i){t.position.z-=t.position.z<1?e*i:e*i*t.position.z,t.position.z<0&&(t.position.z=0)}_targetDragStart(t,e,i){}_targetDrag(t,e,i){}_targetDragEnd(t){}_reattachCameraControls(){if(this._pointerCamera)if(this._pointerCamera.getClassName()==="ArcRotateCamera"){const t=this._pointerCamera;t.attachControl(t.inputs?t.inputs.noPreventDefault:!0,t._useCtrlForPanning,t._panningMouseButton)}else this._pointerCamera.attachControl(this._pointerCamera.inputs?this._pointerCamera.inputs.noPreventDefault:!0)}detach(){this._scene&&(this.detachCameraControls&&this._attachedToElement&&this._pointerCamera&&!this._pointerCamera.leftCamera&&(this._reattachCameraControls(),this._attachedToElement=!1),this._scene.onPointerObservable.remove(this._pointerObserver));for(const t in this._virtualMeshesInfo)this._virtualMeshesInfo[t].originMesh.dispose(),this._virtualMeshesInfo[t].dragMesh.dispose();this.onDragEndObservable.clear(),this.onDragObservable.clear(),this.onDragStartObservable.clear()}}class ks extends Zt{constructor(){super(...arguments),this._sceneRenderObserver=null,this._targetPosition=new c(0,0,0),this._targetOrientation=new S,this._targetScaling=new c(1,1,1),this._startingPosition=new c(0,0,0),this._startingOrientation=new S,this._startingScaling=new c(1,1,1),this.onPositionChangedObservable=new x,this.dragDeltaRatio=.2,this.rotateDraggedObject=!0,this.rotateAroundYOnly=!1,this.rotateWithMotionController=!0,this.disableMovement=!1,this.faceCameraOnDragStart=!1}get name(){return"SixDofDrag"}attach(t){super.attach(t),t.isNearGrabbable=!0,this._virtualTransformNode=new ne("virtual_sixDof",Zt._virtualScene),this._virtualTransformNode.rotationQuaternion=S.Identity(),this._sceneRenderObserver=t.getScene().onBeforeRenderObservable.add(()=>{if(this.currentDraggingPointerIds.length===1&&this._moving&&!this.disableMovement){const e=t.parent;t.setParent(null),t.position.addInPlace(this._targetPosition.subtract(t.position).scale(this.dragDeltaRatio)),this.onPositionChangedObservable.notifyObservers({position:t.absolutePosition}),(!e||e.scaling&&!e.scaling.isNonUniformWithinEpsilon(.001))&&S.SlerpToRef(t.rotationQuaternion,this._targetOrientation,this.dragDeltaRatio,t.rotationQuaternion),t.setParent(e)}})}_getPositionOffsetAround(t,e,i){const s=p.Matrix[0],o=p.Matrix[1],r=p.Matrix[2],a=p.Matrix[3],_=p.Matrix[4];return Ct.TranslationToRef(t.x,t.y,t.z,s),Ct.TranslationToRef(-t.x,-t.y,-t.z,o),Ct.FromQuaternionToRef(i,r),Ct.ScalingToRef(e,e,e,a),o.multiplyToRef(r,_),_.multiplyToRef(a,_),_.multiplyToRef(s,_),_.getTranslation()}_onePointerPositionUpdated(t,e){p.Vector3[0].setAll(0),this._dragging===this._dragType.DRAG?this.rotateDraggedObject&&(this.rotateAroundYOnly?S.RotationYawPitchRollToRef(e.toEulerAngles().y,0,0,p.Quaternion[0]):p.Quaternion[0].copyFrom(e),p.Quaternion[0].multiplyToRef(this._startingOrientation,this._targetOrientation)):(this._dragging===this._dragType.NEAR_DRAG||this._dragging===this._dragType.DRAG_WITH_CONTROLLER&&this.rotateWithMotionController)&&e.multiplyToRef(this._startingOrientation,this._targetOrientation),this._targetPosition.copyFrom(this._startingPosition).addInPlace(t)}_twoPointersPositionUpdated(){const t=this._virtualMeshesInfo[this.currentDraggingPointerIds[0]].startingPosition,e=this._virtualMeshesInfo[this.currentDraggingPointerIds[1]].startingPosition,i=p.Vector3[0];t.addToRef(e,i),i.scaleInPlace(.5);const s=p.Vector3[1];e.subtractToRef(t,s);const o=this._virtualMeshesInfo[this.currentDraggingPointerIds[0]].dragMesh.absolutePosition,r=this._virtualMeshesInfo[this.currentDraggingPointerIds[1]].dragMesh.absolutePosition,a=p.Vector3[2];o.addToRef(r,a),a.scaleInPlace(.5);const _=p.Vector3[3];r.subtractToRef(o,_);const h=_.length()/s.length(),d=a.subtract(i),u=S.FromEulerAngles(0,c.GetAngleBetweenVectorsOnPlane(s.normalize(),_.normalize(),c.UpReadOnly),0),m=this._ownerNode.parent;this._ownerNode.setParent(null);const b=this._getPositionOffsetAround(i.subtract(this._virtualTransformNode.getAbsolutePivotPoint()),h,u);this._virtualTransformNode.rotationQuaternion.multiplyToRef(u,this._ownerNode.rotationQuaternion),this._virtualTransformNode.scaling.scaleToRef(h,this._ownerNode.scaling),this._virtualTransformNode.position.addToRef(d.addInPlace(b),this._ownerNode.position),this.onPositionChangedObservable.notifyObservers({position:this._ownerNode.position}),this._ownerNode.setParent(m)}_targetDragStart(){const t=this.currentDraggingPointerIds.length,e=this._ownerNode.parent;this._ownerNode.rotationQuaternion||(this._ownerNode.rotationQuaternion=S.RotationYawPitchRoll(this._ownerNode.rotation.y,this._ownerNode.rotation.x,this._ownerNode.rotation.z));const i=this._ownerNode.getAbsolutePivotPoint();if(this._ownerNode.setParent(null),t===1){if(this._targetPosition.copyFrom(this._ownerNode.position),this._targetOrientation.copyFrom(this._ownerNode.rotationQuaternion),this._targetScaling.copyFrom(this._ownerNode.scaling),this.faceCameraOnDragStart&&this._scene.activeCamera){const s=p.Vector3[0];this._scene.activeCamera.position.subtractToRef(i,s),s.normalize();const o=p.Quaternion[0];this._scene.useRightHandedSystem?S.FromLookDirectionRHToRef(s,new c(0,1,0),o):S.FromLookDirectionLHToRef(s,new c(0,1,0),o),o.normalize(),S.RotationYawPitchRollToRef(o.toEulerAngles().y,0,0,p.Quaternion[0]),this._targetOrientation.copyFrom(p.Quaternion[0])}this._startingPosition.copyFrom(this._targetPosition),this._startingOrientation.copyFrom(this._targetOrientation),this._startingScaling.copyFrom(this._targetScaling)}else t===2&&(this._virtualTransformNode.setPivotPoint(new c(0,0,0),qi.LOCAL),this._virtualTransformNode.position.copyFrom(this._ownerNode.position),this._virtualTransformNode.scaling.copyFrom(this._ownerNode.scaling),this._virtualTransformNode.rotationQuaternion.copyFrom(this._ownerNode.rotationQuaternion),this._virtualTransformNode.setPivotPoint(i,qi.WORLD),this._resetVirtualMeshesPosition());this._ownerNode.setParent(e)}_targetDrag(t,e){this.currentDraggingPointerIds.length===1?this._onePointerPositionUpdated(t,e):this.currentDraggingPointerIds.length===2&&this._twoPointersPositionUpdated()}_targetDragEnd(){if(this.currentDraggingPointerIds.length===1){this._resetVirtualMeshesPosition();const t=this.faceCameraOnDragStart;this.faceCameraOnDragStart=!1,this._targetDragStart(),this.faceCameraOnDragStart=t}}detach(){super.detach(),this._ownerNode&&(this._ownerNode.isNearGrabbable=!1,this._ownerNode.getScene().onBeforeRenderObservable.remove(this._sceneRenderObserver)),this._virtualTransformNode&&this._virtualTransformNode.dispose()}}class Qs{constructor(){this._attachPointLocalOffset=new c,this._workingPosition=new c,this._workingQuaternion=new S,this._lastTick=-1,this._hit=!1,this.hitNormalOffset=.05,this.meshes=[],this.interpolatePose=!0,this.lerpTime=250,this.keepOrientationVertical=!0,this.enabled=!0,this.maxStickingDistance=.8}get name(){return"SurfaceMagnetism"}init(){}attach(t,e){this._attachedMesh=t,this._scene=e||t.getScene(),this._attachedMesh.rotationQuaternion||(this._attachedMesh.rotationQuaternion=S.RotationYawPitchRoll(this._attachedMesh.rotation.y,this._attachedMesh.rotation.x,this._attachedMesh.rotation.z)),this.updateAttachPoint(),this._workingPosition.copyFrom(this._attachedMesh.position),this._workingQuaternion.copyFrom(this._attachedMesh.rotationQuaternion),this._addObservables()}detach(){this._attachedMesh=null,this._removeObservables()}_getTargetPose(t){if(!this._attachedMesh)return null;if(t&&t.hit){const e=t.getNormal(!0,!0),i=t.pickedPoint;if(!e||!i)return null;e.normalize();const s=p.Vector3[0];return s.copyFrom(e),s.scaleInPlace(this.hitNormalOffset),s.addInPlace(i),this._attachedMesh.parent&&(p.Matrix[0].copyFrom(this._attachedMesh.parent.getWorldMatrix()).invert(),c.TransformNormalToRef(s,p.Matrix[0],s)),{position:s,quaternion:S.RotationYawPitchRoll(-Math.atan2(e.x,-e.z),this.keepOrientationVertical?0:Math.atan2(e.y,Math.sqrt(e.z*e.z+e.x*e.x)),0)}}return null}updateAttachPoint(){this._getAttachPointOffsetToRef(this._attachPointLocalOffset)}findAndUpdateTarget(t){if(this._hit=!1,!t.ray)return!1;const e=t.ray.intersectsMeshes(this.meshes)[0];if(this._attachedMesh&&e&&e.hit&&e.pickedMesh){const i=this._getTargetPose(e);i&&c.Distance(this._attachedMesh.position,i.position)<this.maxStickingDistance&&(this._workingPosition.copyFrom(i.position),this._workingQuaternion.copyFrom(i.quaternion),this._hit=!0)}return this._hit}_getAttachPointOffsetToRef(t){if(!this._attachedMesh){t.setAll(0);return}const e=p.Quaternion[0];e.copyFrom(this._attachedMesh.rotationQuaternion),this._attachedMesh.rotationQuaternion.copyFromFloats(0,0,0,1),this._attachedMesh.computeWorldMatrix();const i=this._attachedMesh.getHierarchyBoundingVectors(),s=p.Vector3[0];i.max.addToRef(i.min,s),s.scaleInPlace(.5),s.z=i.max.z;const o=p.Matrix[0];this._attachedMesh.getWorldMatrix().invertToRef(o),c.TransformCoordinatesToRef(s,o,t),this._attachedMesh.rotationQuaternion.copyFrom(e)}_updateTransformToGoal(t){if(!this._attachedMesh||!this._hit)return;const e=this._attachedMesh.parent;this._attachedMesh.setParent(null);const i=p.Vector3[0];if(c.TransformNormalToRef(this._attachPointLocalOffset,this._attachedMesh.getWorldMatrix(),i),!this.interpolatePose){this._attachedMesh.position.copyFrom(this._workingPosition).subtractInPlace(i),this._attachedMesh.rotationQuaternion.copyFrom(this._workingQuaternion);return}const s=new c;c.SmoothToRef(this._attachedMesh.position,this._workingPosition,t,this.lerpTime,s),this._attachedMesh.position.copyFrom(s);const o=new S;o.copyFrom(this._attachedMesh.rotationQuaternion),S.SmoothToRef(o,this._workingQuaternion,t,this.lerpTime,this._attachedMesh.rotationQuaternion),this._attachedMesh.setParent(e)}_addObservables(){this._pointerObserver=this._scene.onPointerObservable.add(t=>{this.enabled&&t.type==D.POINTERMOVE&&t.pickInfo&&this.findAndUpdateTarget(t.pickInfo)}),this._lastTick=Date.now(),this._onBeforeRender=this._scene.onBeforeRenderObservable.add(()=>{const t=Date.now();this._updateTransformToGoal(t-this._lastTick),this._lastTick=t})}_removeObservables(){this._scene.onPointerObservable.remove(this._pointerObserver),this._scene.onBeforeRenderObservable.remove(this._onBeforeRender),this._pointerObserver=null,this._onBeforeRender=null}}class Vs{constructor(){this._tmpQuaternion=new S,this._tmpVectors=[new c,new c,new c,new c,new c,new c,new c],this._tmpMatrix=new Ct,this._tmpInvertView=new Ct,this._tmpForward=new c,this._tmpNodeForward=new c,this._tmpPosition=new c,this._workingPosition=new c,this._workingQuaternion=new S,this._lastTick=-1,this._recenterNextUpdate=!0,this.interpolatePose=!0,this.lerpTime=500,this.ignoreCameraPitchAndRoll=!1,this.pitchOffset=15,this.maxViewVerticalDegrees=30,this.maxViewHorizontalDegrees=30,this.orientToCameraDeadzoneDegrees=60,this.ignoreDistanceClamp=!1,this.ignoreAngleClamp=!1,this.verticalMaxDistance=0,this.defaultDistance=.8,this.maximumDistance=2,this.minimumDistance=.3,this.useFixedVerticalOffset=!1,this.fixedVerticalOffset=0,this._enabled=!0}get followedCamera(){return this._followedCamera||this._scene.activeCamera}set followedCamera(t){this._followedCamera=t}get name(){return"Follow"}init(){}attach(t,e){this._scene=t.getScene(),this.attachedNode=t,e&&(this.followedCamera=e),this._addObservables()}detach(){this.attachedNode=null,this._removeObservables()}recenter(){this._recenterNextUpdate=!0}_angleBetweenVectorAndPlane(t,e){return this._tmpVectors[0].copyFrom(t),t=this._tmpVectors[0],this._tmpVectors[1].copyFrom(e),e=this._tmpVectors[1],t.normalize(),e.normalize(),Math.PI/2-Math.acos(c.Dot(t,e))}_length2D(t){return Math.sqrt(t.x*t.x+t.z*t.z)}_distanceClamp(t,e=!1){let i=this.minimumDistance,s=this.maximumDistance;const o=this.defaultDistance,r=this._tmpVectors[0];r.copyFrom(t);let a=r.length();if(r.normalizeFromLength(a),this.ignoreCameraPitchAndRoll){i=this._length2D(r)*i,s=this._length2D(r)*s;const h=this._length2D(t);r.scaleInPlace(a/h),a=h}let _=a;return e?_=o:_=si.Clamp(a,i,s),t.copyFrom(r).scaleInPlace(_),a!==_}_applyVerticalClamp(t){this.verticalMaxDistance!==0&&(t.y=si.Clamp(t.y,-this.verticalMaxDistance,this.verticalMaxDistance))}_toOrientationQuatToRef(t,e){S.RotationYawPitchRollToRef(Math.atan2(t.x,t.z),Math.atan2(t.y,Math.sqrt(t.z*t.z+t.x*t.x)),0,e)}_applyPitchOffset(t){const e=this._tmpVectors[0],i=this._tmpVectors[1];e.copyFromFloats(0,0,this._scene.useRightHandedSystem?-1:1),i.copyFromFloats(1,0,0),c.TransformNormalToRef(e,t,e),e.y=0,e.normalize(),c.TransformNormalToRef(i,t,i),S.RotationAxisToRef(i,this.pitchOffset*Math.PI/180,this._tmpQuaternion),e.rotateByQuaternionToRef(this._tmpQuaternion,e),this._toOrientationQuatToRef(e,this._tmpQuaternion),this._tmpQuaternion.toRotationMatrix(this._tmpMatrix),t.copyFrom(this._tmpMatrix)}_angularClamp(t,e){const i=this._tmpVectors[5];i.copyFromFloats(0,0,this._scene.useRightHandedSystem?-1:1);const s=this._tmpVectors[6];s.copyFromFloats(1,0,0),c.TransformNormalToRef(i,t,i),c.TransformNormalToRef(s,t,s);const o=c.UpReadOnly;if(e.length()<pt)return!1;let a=!1;const _=this._tmpQuaternion;if(this.ignoreCameraPitchAndRoll){const u=c.GetAngleBetweenVectorsOnPlane(e,i,s);S.RotationAxisToRef(s,u,_),e.rotateByQuaternionToRef(_,e)}else{const u=-c.GetAngleBetweenVectorsOnPlane(e,i,s),m=this.maxViewVerticalDegrees*Math.PI/180*.5;u<-m?(S.RotationAxisToRef(s,-u-m,_),e.rotateByQuaternionToRef(_,e),a=!0):u>m&&(S.RotationAxisToRef(s,-u+m,_),e.rotateByQuaternionToRef(_,e),a=!0)}const h=this._angleBetweenVectorAndPlane(e,s)*(this._scene.useRightHandedSystem?-1:1),d=this.maxViewHorizontalDegrees*Math.PI/180*.5;return h<-d?(S.RotationAxisToRef(o,-h-d,_),e.rotateByQuaternionToRef(_,e),a=!0):h>d&&(S.RotationAxisToRef(o,-h+d,_),e.rotateByQuaternionToRef(_,e),a=!0),a}_orientationClamp(t,e){var i;const s=this._tmpVectors[0];s.copyFrom(t).scaleInPlace(-1).normalize();const o=this._tmpVectors[1],r=this._tmpVectors[2];o.copyFromFloats(0,1,0),c.CrossToRef(s,o,r);const a=r.length();a<pt||(r.normalizeFromLength(a),c.CrossToRef(r,s,o),!((i=this.attachedNode)===null||i===void 0)&&i.getScene().useRightHandedSystem?S.FromLookDirectionRHToRef(s,o,e):S.FromLookDirectionLHToRef(s,o,e))}_passedOrientationDeadzone(t,e){const i=this._tmpVectors[5];return i.copyFrom(t),i.normalize(),Math.abs(c.GetAngleBetweenVectorsOnPlane(e,i,c.UpReadOnly))*180/Math.PI>this.orientToCameraDeadzoneDegrees}_updateLeashing(t){if(this.attachedNode&&this._enabled){const e=this.attachedNode.parent;this.attachedNode.setParent(null);const i=this.attachedNode.getWorldMatrix(),s=this._workingPosition,o=this._workingQuaternion,r=this.attachedNode.getPivotPoint(),a=this._tmpInvertView;a.copyFrom(t.getViewMatrix()),a.invert(),c.TransformCoordinatesToRef(r,i,s);const _=this._tmpPosition;_.copyFromFloats(0,0,0),c.TransformCoordinatesToRef(_,i,_),_.scaleInPlace(-1).subtractInPlace(r),s.subtractInPlace(t.globalPosition),this.ignoreCameraPitchAndRoll&&this._applyPitchOffset(a);let h=!1;const d=this._tmpForward;d.copyFromFloats(0,0,this._scene.useRightHandedSystem?-1:1),c.TransformNormalToRef(d,a,d);const u=this._tmpNodeForward;if(u.copyFromFloats(0,0,this._scene.useRightHandedSystem?-1:1),c.TransformNormalToRef(u,i,u),this._recenterNextUpdate)s.copyFrom(d).scaleInPlace(this.defaultDistance);else if(this.ignoreAngleClamp){const b=s.length();s.copyFrom(d).scaleInPlace(b)}else h=this._angularClamp(a,s);let m=!1;this.ignoreDistanceClamp||(m=this._distanceClamp(s,h),this._applyVerticalClamp(s)),this.useFixedVerticalOffset&&(s.y=_.y-t.globalPosition.y+this.fixedVerticalOffset),(h||m||this._passedOrientationDeadzone(s,u)||this._recenterNextUpdate)&&this._orientationClamp(s,o),this._workingPosition.subtractInPlace(r),this._recenterNextUpdate=!1,this.attachedNode.setParent(e)}}_updateTransformToGoal(t){if(!this.attachedNode||!this.followedCamera||!this._enabled)return;this.attachedNode.rotationQuaternion||(this.attachedNode.rotationQuaternion=S.Identity());const e=this.attachedNode.parent;if(this.attachedNode.setParent(null),!this.interpolatePose){this.attachedNode.position.copyFrom(this.followedCamera.globalPosition).addInPlace(this._workingPosition),this.attachedNode.rotationQuaternion.copyFrom(this._workingQuaternion);return}const i=new c;i.copyFrom(this.attachedNode.position).subtractInPlace(this.followedCamera.globalPosition),c.SmoothToRef(i,this._workingPosition,t,this.lerpTime,i),i.addInPlace(this.followedCamera.globalPosition),this.attachedNode.position.copyFrom(i);const s=new S;s.copyFrom(this.attachedNode.rotationQuaternion),S.SmoothToRef(s,this._workingQuaternion,t,this.lerpTime,this.attachedNode.rotationQuaternion),this.attachedNode.setParent(e)}_addObservables(){this._lastTick=Date.now(),this._onBeforeRender=this._scene.onBeforeRenderObservable.add(()=>{if(!this.followedCamera)return;const t=Date.now();this._updateLeashing(this.followedCamera),this._updateTransformToGoal(t-this._lastTick),this._lastTick=t})}_removeObservables(){this._onBeforeRender&&this._scene.onBeforeRenderObservable.remove(this._onBeforeRender)}}var me;(function(g){g.WRIST="wrist",g.THUMB="thumb",g.INDEX="index",g.MIDDLE="middle",g.RING="ring",g.LITTLE="little"})(me||(me={}));var v;(function(g){g.WRIST="wrist",g.THUMB_METACARPAL="thumb-metacarpal",g.THUMB_PHALANX_PROXIMAL="thumb-phalanx-proximal",g.THUMB_PHALANX_DISTAL="thumb-phalanx-distal",g.THUMB_TIP="thumb-tip",g.INDEX_FINGER_METACARPAL="index-finger-metacarpal",g.INDEX_FINGER_PHALANX_PROXIMAL="index-finger-phalanx-proximal",g.INDEX_FINGER_PHALANX_INTERMEDIATE="index-finger-phalanx-intermediate",g.INDEX_FINGER_PHALANX_DISTAL="index-finger-phalanx-distal",g.INDEX_FINGER_TIP="index-finger-tip",g.MIDDLE_FINGER_METACARPAL="middle-finger-metacarpal",g.MIDDLE_FINGER_PHALANX_PROXIMAL="middle-finger-phalanx-proximal",g.MIDDLE_FINGER_PHALANX_INTERMEDIATE="middle-finger-phalanx-intermediate",g.MIDDLE_FINGER_PHALANX_DISTAL="middle-finger-phalanx-distal",g.MIDDLE_FINGER_TIP="middle-finger-tip",g.RING_FINGER_METACARPAL="ring-finger-metacarpal",g.RING_FINGER_PHALANX_PROXIMAL="ring-finger-phalanx-proximal",g.RING_FINGER_PHALANX_INTERMEDIATE="ring-finger-phalanx-intermediate",g.RING_FINGER_PHALANX_DISTAL="ring-finger-phalanx-distal",g.RING_FINGER_TIP="ring-finger-tip",g.PINKY_FINGER_METACARPAL="pinky-finger-metacarpal",g.PINKY_FINGER_PHALANX_PROXIMAL="pinky-finger-phalanx-proximal",g.PINKY_FINGER_PHALANX_INTERMEDIATE="pinky-finger-phalanx-intermediate",g.PINKY_FINGER_PHALANX_DISTAL="pinky-finger-phalanx-distal",g.PINKY_FINGER_TIP="pinky-finger-tip"})(v||(v={}));const zt=[v.WRIST,v.THUMB_METACARPAL,v.THUMB_PHALANX_PROXIMAL,v.THUMB_PHALANX_DISTAL,v.THUMB_TIP,v.INDEX_FINGER_METACARPAL,v.INDEX_FINGER_PHALANX_PROXIMAL,v.INDEX_FINGER_PHALANX_INTERMEDIATE,v.INDEX_FINGER_PHALANX_DISTAL,v.INDEX_FINGER_TIP,v.MIDDLE_FINGER_METACARPAL,v.MIDDLE_FINGER_PHALANX_PROXIMAL,v.MIDDLE_FINGER_PHALANX_INTERMEDIATE,v.MIDDLE_FINGER_PHALANX_DISTAL,v.MIDDLE_FINGER_TIP,v.RING_FINGER_METACARPAL,v.RING_FINGER_PHALANX_PROXIMAL,v.RING_FINGER_PHALANX_INTERMEDIATE,v.RING_FINGER_PHALANX_DISTAL,v.RING_FINGER_TIP,v.PINKY_FINGER_METACARPAL,v.PINKY_FINGER_PHALANX_PROXIMAL,v.PINKY_FINGER_PHALANX_INTERMEDIATE,v.PINKY_FINGER_PHALANX_DISTAL,v.PINKY_FINGER_TIP],zs={[me.WRIST]:[v.WRIST],[me.THUMB]:[v.THUMB_METACARPAL,v.THUMB_PHALANX_PROXIMAL,v.THUMB_PHALANX_DISTAL,v.THUMB_TIP],[me.INDEX]:[v.INDEX_FINGER_METACARPAL,v.INDEX_FINGER_PHALANX_PROXIMAL,v.INDEX_FINGER_PHALANX_INTERMEDIATE,v.INDEX_FINGER_PHALANX_DISTAL,v.INDEX_FINGER_TIP],[me.MIDDLE]:[v.MIDDLE_FINGER_METACARPAL,v.MIDDLE_FINGER_PHALANX_PROXIMAL,v.MIDDLE_FINGER_PHALANX_INTERMEDIATE,v.MIDDLE_FINGER_PHALANX_DISTAL,v.MIDDLE_FINGER_TIP],[me.RING]:[v.RING_FINGER_METACARPAL,v.RING_FINGER_PHALANX_PROXIMAL,v.RING_FINGER_PHALANX_INTERMEDIATE,v.RING_FINGER_PHALANX_DISTAL,v.RING_FINGER_TIP],[me.LITTLE]:[v.PINKY_FINGER_METACARPAL,v.PINKY_FINGER_PHALANX_PROXIMAL,v.PINKY_FINGER_PHALANX_INTERMEDIATE,v.PINKY_FINGER_PHALANX_DISTAL,v.PINKY_FINGER_TIP]};class Hs{get handMesh(){return this._handMesh}getHandPartMeshes(t){return zs[t].map(e=>this._jointMeshes[zt.indexOf(e)])}getJointMesh(t){return this._jointMeshes[zt.indexOf(t)]}constructor(t,e,i,s,o=!1,r=!1,a=1){this.xrController=t,this._jointMeshes=e,this._handMesh=i,this.rigMapping=s,this._leftHandedMeshes=o,this._jointsInvisible=r,this._jointScaleFactor=a,this._jointTransforms=new Array(zt.length),this._jointTransformMatrices=new Float32Array(zt.length*16),this._tempJointMatrix=new Ct,this._jointRadii=new Float32Array(zt.length),this._scene=e[0].getScene();for(let _=0;_<this._jointTransforms.length;_++){const h=this._jointTransforms[_]=new ne(zt[_],this._scene);h.rotationQuaternion=new S,e[_].rotationQuaternion=new S}i&&this.setHandMesh(i,s),this.xrController.motionController&&(this.xrController.motionController.rootMesh?this.xrController.motionController.rootMesh.setEnabled(!1):this.xrController.motionController.onModelLoadedObservable.add(_=>{_.rootMesh&&_.rootMesh.setEnabled(!1)})),this.xrController.onMotionControllerInitObservable.add(_=>{_.onModelLoadedObservable.add(h=>{h.rootMesh&&h.rootMesh.setEnabled(!1)}),_.rootMesh&&_.rootMesh.setEnabled(!1)})}setHandMesh(t,e){if(this._handMesh=t,t.alwaysSelectAsActiveMesh=!0,t.getChildMeshes().forEach(i=>i.alwaysSelectAsActiveMesh=!0),this._handMesh.skeleton){const i=this._handMesh.skeleton;zt.forEach((s,o)=>{const r=i.getBoneIndexByName(e?e[s]:s);r!==-1&&i.bones[r].linkTransformNode(this._jointTransforms[o])})}}updateFromXRFrame(t,e){const i=this.xrController.inputSource.hand;if(!i)return;const s=i,o=zt.map(a=>s[a]||i.get(a));let r=!1;if(t.fillPoses&&t.fillJointRadii)r=t.fillPoses(o,e,this._jointTransformMatrices)&&t.fillJointRadii(o,this._jointRadii);else if(t.getJointPose){r=!0;for(let a=0;a<o.length;a++){const _=t.getJointPose(o[a],e);if(_)this._jointTransformMatrices.set(_.transform.matrix,a*16),this._jointRadii[a]=_.radius||.008;else{r=!1;break}}}r&&(zt.forEach((a,_)=>{const h=this._jointTransforms[_];Ct.FromArrayToRef(this._jointTransformMatrices,_*16,this._tempJointMatrix),this._tempJointMatrix.decompose(void 0,h.rotationQuaternion,h.position);const d=this._jointRadii[_]*this._jointScaleFactor,u=this._jointMeshes[_];u.isVisible=!this._handMesh&&!this._jointsInvisible,u.position.copyFrom(h.position),u.rotationQuaternion.copyFrom(h.rotationQuaternion),u.scaling.setAll(d),this._scene.useRightHandedSystem||(u.position.z*=-1,u.rotationQuaternion.z*=-1,u.rotationQuaternion.w*=-1,this._leftHandedMeshes&&this._handMesh&&(h.position.z*=-1,h.rotationQuaternion.z*=-1,h.rotationQuaternion.w*=-1))}),this._handMesh&&(this._handMesh.isVisible=!0))}dispose(){this._handMesh&&(this._handMesh.isVisible=!1)}}class L extends Bs{static _GenerateTrackedJointMeshes(t){const e={};return["left","right"].map(i=>{var s,o,r,a,_;const h=[],d=((s=t.jointMeshes)===null||s===void 0?void 0:s.sourceMesh)||Ns("jointParent",L._ICOSPHERE_PARAMS);d.isVisible=!!(!((o=t.jointMeshes)===null||o===void 0)&&o.keepOriginalVisible);for(let u=0;u<zt.length;++u){let m=d.createInstance(`${i}-handJoint-${u}`);if(!((r=t.jointMeshes)===null||r===void 0)&&r.onHandJointMeshGenerated){const b=t.jointMeshes.onHandJointMeshGenerated(m,u,i);b&&b!==m&&(m.dispose(),m=b)}if(m.isPickable=!1,!((a=t.jointMeshes)===null||a===void 0)&&a.enablePhysics){const b=((_=t.jointMeshes)===null||_===void 0?void 0:_.physicsProps)||{};m.scaling.setAll(.02);const w=b.impostorType!==void 0?b.impostorType:$i.SphereImpostor;m.physicsImpostor=new $i(m,w,Object.assign({mass:0},b))}m.rotationQuaternion=new S,m.isVisible=!1,h.push(m)}e[i]=h}),{left:e.left,right:e.right}}static _GenerateDefaultHandMeshesAsync(t,e){return new Promise(async i=>{var s,o,r,a,_;const h={};!((o=(s=L._RightHandGLB)===null||s===void 0?void 0:s.meshes[1])===null||o===void 0)&&o.isDisposed()&&(L._RightHandGLB=null),!((a=(r=L._LeftHandGLB)===null||r===void 0?void 0:r.meshes[1])===null||a===void 0)&&a.isDisposed()&&(L._LeftHandGLB=null);const d=!!(L._RightHandGLB&&L._LeftHandGLB),u=await Promise.all([L._RightHandGLB||re.ImportMeshAsync("",L.DEFAULT_HAND_MODEL_BASE_URL,L.DEFAULT_HAND_MODEL_RIGHT_FILENAME,t),L._LeftHandGLB||re.ImportMeshAsync("",L.DEFAULT_HAND_MODEL_BASE_URL,L.DEFAULT_HAND_MODEL_LEFT_FILENAME,t)]);L._RightHandGLB=u[0],L._LeftHandGLB=u[1];const m=new Cs("handShader",t,{emitComments:!1});await m.loadAsync(L.DEFAULT_HAND_MODEL_SHADER_URL),m.needDepthPrePass=!0,m.transparencyMode=ki.MATERIAL_ALPHABLEND,m.alphaMode=2,m.build(!1);const b=Object.assign({base:E.FromInts(116,63,203),fresnel:E.FromInts(149,102,229),fingerColor:E.FromInts(177,130,255),tipFresnel:E.FromInts(220,200,255)},(_=e==null?void 0:e.handMeshes)===null||_===void 0?void 0:_.customColors),w={base:m.getBlockByName("baseColor"),fresnel:m.getBlockByName("fresnelColor"),fingerColor:m.getBlockByName("fingerColor"),tipFresnel:m.getBlockByName("tipFresnelColor")};w.base.value=b.base,w.fresnel.value=b.fresnel,w.fingerColor.value=b.fingerColor,w.tipFresnel.value=b.tipFresnel,["left","right"].forEach(ut=>{const kt=ut=="left"?L._LeftHandGLB:L._RightHandGLB;if(!kt)throw new Error("Could not load hand model");const bt=kt.meshes[1];bt._internalAbstractMeshDataInfo._computeBonesUsingShaders=!0,bt.material=m.clone(`${ut}HandShaderClone`,!0),bt.isVisible=!1,h[ut]=bt,!d&&!t.useRightHandedSystem&&kt.meshes[1].rotate(Ss.Y,Math.PI)}),m.dispose(),i({left:h.left,right:h.right})})}static _GenerateDefaultHandMeshRigMapping(t){const e=t=="right"?"R":"L";return{[v.WRIST]:`wrist_${e}`,[v.THUMB_METACARPAL]:`thumb_metacarpal_${e}`,[v.THUMB_PHALANX_PROXIMAL]:`thumb_proxPhalanx_${e}`,[v.THUMB_PHALANX_DISTAL]:`thumb_distPhalanx_${e}`,[v.THUMB_TIP]:`thumb_tip_${e}`,[v.INDEX_FINGER_METACARPAL]:`index_metacarpal_${e}`,[v.INDEX_FINGER_PHALANX_PROXIMAL]:`index_proxPhalanx_${e}`,[v.INDEX_FINGER_PHALANX_INTERMEDIATE]:`index_intPhalanx_${e}`,[v.INDEX_FINGER_PHALANX_DISTAL]:`index_distPhalanx_${e}`,[v.INDEX_FINGER_TIP]:`index_tip_${e}`,[v.MIDDLE_FINGER_METACARPAL]:`middle_metacarpal_${e}`,[v.MIDDLE_FINGER_PHALANX_PROXIMAL]:`middle_proxPhalanx_${e}`,[v.MIDDLE_FINGER_PHALANX_INTERMEDIATE]:`middle_intPhalanx_${e}`,[v.MIDDLE_FINGER_PHALANX_DISTAL]:`middle_distPhalanx_${e}`,[v.MIDDLE_FINGER_TIP]:`middle_tip_${e}`,[v.RING_FINGER_METACARPAL]:`ring_metacarpal_${e}`,[v.RING_FINGER_PHALANX_PROXIMAL]:`ring_proxPhalanx_${e}`,[v.RING_FINGER_PHALANX_INTERMEDIATE]:`ring_intPhalanx_${e}`,[v.RING_FINGER_PHALANX_DISTAL]:`ring_distPhalanx_${e}`,[v.RING_FINGER_TIP]:`ring_tip_${e}`,[v.PINKY_FINGER_METACARPAL]:`little_metacarpal_${e}`,[v.PINKY_FINGER_PHALANX_PROXIMAL]:`little_proxPhalanx_${e}`,[v.PINKY_FINGER_PHALANX_INTERMEDIATE]:`little_intPhalanx_${e}`,[v.PINKY_FINGER_PHALANX_DISTAL]:`little_distPhalanx_${e}`,[v.PINKY_FINGER_TIP]:`little_tip_${e}`}}isCompatible(){return typeof XRHand<"u"}getHandByControllerId(t){return this._attachedHands[t]}getHandByHandedness(t){return t=="none"?null:this._trackingHands[t]}constructor(t,e){super(t),this.options=e,this._attachedHands={},this._trackingHands={left:null,right:null},this._handResources={jointMeshes:null,handMeshes:null,rigMappings:null},this.onHandAddedObservable=new x,this.onHandRemovedObservable=new x,this._attachHand=o=>{var r,a,_;if(!o.inputSource.hand||o.inputSource.handedness=="none"||!this._handResources.jointMeshes)return;const h=o.inputSource.handedness,d=new Hs(o,this._handResources.jointMeshes[h],this._handResources.handMeshes&&this._handResources.handMeshes[h],this._handResources.rigMappings&&this._handResources.rigMappings[h],(r=this.options.handMeshes)===null||r===void 0?void 0:r.meshesUseLeftHandedCoordinates,(a=this.options.jointMeshes)===null||a===void 0?void 0:a.invisible,(_=this.options.jointMeshes)===null||_===void 0?void 0:_.scaleFactor);this._attachedHands[o.uniqueId]=d,this._trackingHands[h]=d,this.onHandAddedObservable.notifyObservers(d)},this._detachHand=o=>{this._detachHandById(o.uniqueId)},this.xrNativeFeatureName="hand-tracking";const s=e.jointMeshes;if(s&&(typeof s.disableDefaultHandMesh<"u"&&(e.handMeshes=e.handMeshes||{},e.handMeshes.disableDefaultMeshes=s.disableDefaultHandMesh),typeof s.handMeshes<"u"&&(e.handMeshes=e.handMeshes||{},e.handMeshes.customMeshes=s.handMeshes),typeof s.leftHandedSystemMeshes<"u"&&(e.handMeshes=e.handMeshes||{},e.handMeshes.meshesUseLeftHandedCoordinates=s.leftHandedSystemMeshes),typeof s.rigMapping<"u")){e.handMeshes=e.handMeshes||{};const o={},r={};[[s.rigMapping.left,o],[s.rigMapping.right,r]].forEach(a=>{const _=a[0],h=a[1];_.forEach((d,u)=>{h[zt[u]]=d})}),e.handMeshes.customRigMappings={left:o,right:r}}}attach(){var t,e,i,s;return super.attach()?(this._handResources={jointMeshes:L._GenerateTrackedJointMeshes(this.options),handMeshes:((t=this.options.handMeshes)===null||t===void 0?void 0:t.customMeshes)||null,rigMappings:((e=this.options.handMeshes)===null||e===void 0?void 0:e.customRigMappings)||null},!(!((i=this.options.handMeshes)===null||i===void 0)&&i.customMeshes)&&!(!((s=this.options.handMeshes)===null||s===void 0)&&s.disableDefaultMeshes)&&L._GenerateDefaultHandMeshesAsync(Ht.LastCreatedScene,this.options).then(o=>{var r,a;this._handResources.handMeshes=o,this._handResources.rigMappings={left:L._GenerateDefaultHandMeshRigMapping("left"),right:L._GenerateDefaultHandMeshRigMapping("right")},(r=this._trackingHands.left)===null||r===void 0||r.setHandMesh(this._handResources.handMeshes.left,this._handResources.rigMappings.left),(a=this._trackingHands.right)===null||a===void 0||a.setHandMesh(this._handResources.handMeshes.right,this._handResources.rigMappings.right)}),this.options.xrInput.controllers.forEach(this._attachHand),this._addNewAttachObserver(this.options.xrInput.onControllerAddedObservable,this._attachHand),this._addNewAttachObserver(this.options.xrInput.onControllerRemovedObservable,this._detachHand),!0):!1}_onXRFrame(t){var e,i;(e=this._trackingHands.left)===null||e===void 0||e.updateFromXRFrame(t,this._xrSessionManager.referenceSpace),(i=this._trackingHands.right)===null||i===void 0||i.updateFromXRFrame(t,this._xrSessionManager.referenceSpace)}_detachHandById(t){var e;const i=this.getHandByControllerId(t);if(i){const s=i.xrController.inputSource.handedness=="left"?"left":"right";((e=this._trackingHands[s])===null||e===void 0?void 0:e.xrController.uniqueId)===t&&(this._trackingHands[s]=null),this.onHandRemovedObservable.notifyObservers(i),i.dispose(),delete this._attachedHands[t]}}detach(){return super.detach()?(Object.keys(this._attachedHands).forEach(t=>this._detachHandById(t)),!0):!1}dispose(){var t;super.dispose(),this.onHandAddedObservable.clear(),this.onHandRemovedObservable.clear(),this._handResources.handMeshes&&!(!((t=this.options.handMeshes)===null||t===void 0)&&t.customMeshes)&&(this._handResources.handMeshes.left.dispose(),this._handResources.handMeshes.right.dispose(),L._RightHandGLB=null,L._LeftHandGLB=null),this._handResources.jointMeshes&&(this._handResources.jointMeshes.left.forEach(e=>e.dispose()),this._handResources.jointMeshes.right.forEach(e=>e.dispose()))}}L.Name=Ai.HAND_TRACKING;L.Version=1;L.DEFAULT_HAND_MODEL_BASE_URL="https://assets.babylonjs.com/meshes/HandMeshes/";L.DEFAULT_HAND_MODEL_RIGHT_FILENAME="r_hand_rhs.glb";L.DEFAULT_HAND_MODEL_LEFT_FILENAME="l_hand_rhs.glb";L.DEFAULT_HAND_MODEL_SHADER_URL="https://assets.babylonjs.com/meshes/HandMeshes/handsShader.json";L._ICOSPHERE_PARAMS={radius:.5,flat:!1,subdivisions:2};L._RightHandGLB=null;L._LeftHandGLB=null;Rs.AddWebXRFeature(L.Name,(g,t)=>()=>new L(g,t),L.Version,!1);var Me;(function(g){g[g.ABOVE_FINGER_TIPS=0]="ABOVE_FINGER_TIPS",g[g.RADIAL_SIDE=1]="RADIAL_SIDE",g[g.ULNAR_SIDE=2]="ULNAR_SIDE",g[g.BELOW_WRIST=3]="BELOW_WRIST"})(Me||(Me={}));var pe;(function(g){g[g.LOOK_AT_CAMERA=0]="LOOK_AT_CAMERA",g[g.HAND_ROTATION=1]="HAND_ROTATION"})(pe||(pe={}));var we;(function(g){g[g.ALWAYS_VISIBLE=0]="ALWAYS_VISIBLE",g[g.PALM_UP=1]="PALM_UP",g[g.GAZE_FOCUS=2]="GAZE_FOCUS",g[g.PALM_AND_GAZE=3]="PALM_AND_GAZE"})(we||(we={}));class vr{constructor(){this._sceneRenderObserver=null,this._zoneAxis={},this.handConstraintVisibility=we.PALM_AND_GAZE,this.palmUpStrictness=.95,this.gazeProximityRadius=.15,this.targetOffset=.1,this.targetZone=Me.ULNAR_SIDE,this.zoneOrientationMode=pe.HAND_ROTATION,this.nodeOrientationMode=pe.HAND_ROTATION,this.handedness="none",this.lerpTime=100,this._zoneAxis[Me.ABOVE_FINGER_TIPS]=new c(0,1,0),this._zoneAxis[Me.RADIAL_SIDE]=new c(-1,0,0),this._zoneAxis[Me.ULNAR_SIDE]=new c(1,0,0),this._zoneAxis[Me.BELOW_WRIST]=new c(0,-1,0)}get name(){return"HandConstraint"}enable(){this._node.setEnabled(!0)}disable(){this._node.setEnabled(!1)}_getHandPose(){if(!this._handTracking)return null;let t;if(this.handedness==="none"?t=this._handTracking.getHandByHandedness("left")||this._handTracking.getHandByHandedness("right"):t=this._handTracking.getHandByHandedness(this.handedness),t){const e=t.getJointMesh(v.PINKY_FINGER_METACARPAL),i=t.getJointMesh(v.MIDDLE_FINGER_METACARPAL),s=t.getJointMesh(v.WRIST);if(s&&i&&e){const o={position:i.absolutePosition,quaternion:new S,id:t.xrController.uniqueId},r=p.Vector3[0],a=p.Vector3[1],_=p.Vector3[2];return r.copyFrom(i.absolutePosition).subtractInPlace(s.absolutePosition).normalize(),a.copyFrom(e.absolutePosition).subtractInPlace(i.absolutePosition).normalize(),c.CrossToRef(r,a,a),c.CrossToRef(a,r,_),S.FromLookDirectionLHToRef(a,r,o.quaternion),o}}return null}init(){}attach(t){this._node=t,this._scene=t.getScene(),this._node.rotationQuaternion||(this._node.rotationQuaternion=S.RotationYawPitchRoll(this._node.rotation.y,this._node.rotation.x,this._node.rotation.z));let e=Date.now();this._sceneRenderObserver=this._scene.onBeforeRenderObservable.add(()=>{const i=this._getHandPose();if(this._node.reservedDataStore=this._node.reservedDataStore||{},this._node.reservedDataStore.nearInteraction=this._node.reservedDataStore.nearInteraction||{},this._node.reservedDataStore.nearInteraction.excludedControllerId=null,i){const s=p.Vector3[0],o=this._scene.activeCamera;s.copyFrom(this._zoneAxis[this.targetZone]);const r=p.Quaternion[0];if(o&&(this.zoneOrientationMode===pe.LOOK_AT_CAMERA||this.nodeOrientationMode===pe.LOOK_AT_CAMERA)){const d=p.Vector3[1];d.copyFrom(o.position).subtractInPlace(i.position).normalize(),this._scene.useRightHandedSystem?S.FromLookDirectionRHToRef(d,c.UpReadOnly,r):S.FromLookDirectionLHToRef(d,c.UpReadOnly,r)}this.zoneOrientationMode===pe.HAND_ROTATION?i.quaternion.toRotationMatrix(p.Matrix[0]):r.toRotationMatrix(p.Matrix[0]),c.TransformNormalToRef(s,p.Matrix[0],s),s.scaleInPlace(this.targetOffset);const a=p.Vector3[2],_=p.Quaternion[1];a.copyFrom(i.position).addInPlace(s),this.nodeOrientationMode===pe.HAND_ROTATION?_.copyFrom(i.quaternion):_.copyFrom(r);const h=Date.now()-e;c.SmoothToRef(this._node.position,a,h,this.lerpTime,this._node.position),S.SmoothToRef(this._node.rotationQuaternion,_,h,this.lerpTime,this._node.rotationQuaternion),this._node.reservedDataStore.nearInteraction.excludedControllerId=i.id}this._setVisibility(i),e=Date.now()})}_setVisibility(t){let e=!0,i=!0;const s=this._scene.activeCamera;if(s){const o=s.getForwardRay();if(this.handConstraintVisibility===we.GAZE_FOCUS||this.handConstraintVisibility===we.PALM_AND_GAZE){i=!1;let r;this._eyeTracking&&(r=this._eyeTracking.getEyeGaze()),r=r||o;const a=p.Vector3[0];t?t.position.subtractToRef(r.origin,a):this._node.getAbsolutePosition().subtractToRef(r.origin,a);const _=c.Dot(a,r.direction),h=_*_;_>0&&a.lengthSquared()-h<this.gazeProximityRadius*this.gazeProximityRadius&&(i=!0)}if((this.handConstraintVisibility===we.PALM_UP||this.handConstraintVisibility===we.PALM_AND_GAZE)&&(e=!1,t)){const r=p.Vector3[0];c.LeftHandedForwardReadOnly.rotateByQuaternionToRef(t.quaternion,r),c.Dot(r,o.direction)>this.palmUpStrictness*2-1&&(e=!0)}}this._node.setEnabled(e&&i)}detach(){this._scene.onBeforeRenderObservable.remove(this._sceneRenderObserver)}linkToXRExperience(t){const e=t.featuresManager?t.featuresManager:t;if(!e)_t.Error("XR features manager must be available or provided directly for the Hand Menu to work");else{try{this._eyeTracking=e.getEnabledFeature(Ai.EYE_TRACKING)}catch{}try{this._handTracking=e.getEnabledFeature(Ai.HAND_TRACKING)}catch{_t.Error("Hand tracking must be enabled for the Hand Menu to work")}}}}var bi;(function(g){g[g.Origin=0]="Origin",g[g.Pivot=1]="Pivot"})(bi||(bi={}));var vi;(function(g){g[g.World=0]="World",g[g.Local=1]="Local"})(vi||(vi={}));class Ee{set scaleRatio(t){this._scaleRatio=t}get scaleRatio(){return this._scaleRatio}get isHovered(){return this._isHovered}get attachedMesh(){return this._attachedMesh}set attachedMesh(t){this._attachedMesh=t,t&&(this._attachedNode=t),this._rootMesh.setEnabled(!!t),this._attachedNodeChanged(t)}get attachedNode(){return this._attachedNode}set attachedNode(t){this._attachedNode=t,this._attachedMesh=null,this._rootMesh.setEnabled(!!t),this._attachedNodeChanged(t)}setCustomMesh(t){if(t.getScene()!=this.gizmoLayer.utilityLayerScene)throw"When setting a custom mesh on a gizmo, the custom meshes scene must be the same as the gizmos (eg. gizmo.gizmoLayer.utilityLayerScene)";this._rootMesh.getChildMeshes().forEach(e=>{e.dispose()}),t.parent=this._rootMesh,this._customMeshSet=!0}set updateGizmoRotationToMatchAttachedMesh(t){this._updateGizmoRotationToMatchAttachedMesh=t}get updateGizmoRotationToMatchAttachedMesh(){return this._updateGizmoRotationToMatchAttachedMesh}set updateGizmoPositionToMatchAttachedMesh(t){this._updateGizmoPositionToMatchAttachedMesh=t}get updateGizmoPositionToMatchAttachedMesh(){return this._updateGizmoPositionToMatchAttachedMesh}set anchorPoint(t){this._anchorPoint=t}get anchorPoint(){return this._anchorPoint}set coordinatesMode(t){this._coordinatesMode=t;const e=t==vi.Local;this.updateGizmoRotationToMatchAttachedMesh=e,this.updateGizmoPositionToMatchAttachedMesh=e}get coordinatesMode(){return this._coordinatesMode}set updateScale(t){this._updateScale=t}get updateScale(){return this._updateScale}_attachedNodeChanged(t){}constructor(t=os.DefaultUtilityLayer){this.gizmoLayer=t,this._attachedMesh=null,this._attachedNode=null,this._customRotationQuaternion=null,this._scaleRatio=1,this._isHovered=!1,this._customMeshSet=!1,this._updateGizmoRotationToMatchAttachedMesh=!0,this._updateGizmoPositionToMatchAttachedMesh=!0,this._anchorPoint=bi.Origin,this._updateScale=!0,this._coordinatesMode=vi.Local,this._interactionsEnabled=!0,this._rightHandtoLeftHandMatrix=Ct.RotationY(Math.PI),this._rootMesh=new li("gizmoRootNode",t.utilityLayerScene),this._rootMesh.rotationQuaternion=S.Identity(),this._beforeRenderObserver=this.gizmoLayer.utilityLayerScene.onBeforeRenderObservable.add(()=>{this._update()})}get customRotationQuaternion(){return this._customRotationQuaternion}set customRotationQuaternion(t){this._customRotationQuaternion=t}_update(){if(this.attachedNode){let t=this.attachedNode;if(this.attachedMesh&&(t=this.attachedMesh||this.attachedNode),this.updateGizmoPositionToMatchAttachedMesh)if(this.anchorPoint==bi.Pivot&&t.getAbsolutePivotPoint){const e=t.getAbsolutePivotPoint();this._rootMesh.position.copyFrom(e)}else{const e=t.getWorldMatrix().getRow(3),i=e?e.toVector3():new c(0,0,0);this._rootMesh.position.copyFrom(i)}if(this.updateGizmoRotationToMatchAttachedMesh){const i=t._isMesh||t.getClassName()==="AbstractMesh"||t.getClassName()==="TransformNode"||t.getClassName()==="InstancedMesh"?t:void 0;t.getWorldMatrix().decompose(void 0,this._rootMesh.rotationQuaternion,void 0,Ee.PreserveScaling?i:void 0)}else this._customRotationQuaternion?this._rootMesh.rotationQuaternion.copyFrom(this._customRotationQuaternion):this._rootMesh.rotationQuaternion.set(0,0,0,1);if(this.updateScale){const e=this.gizmoLayer.utilityLayerScene.activeCamera;let i=e.globalPosition;e.devicePosition&&(i=e.devicePosition),this._rootMesh.position.subtractToRef(i,p.Vector3[0]);let s=this.scaleRatio;if(e.mode==Li.ORTHOGRAPHIC_CAMERA){if(e.orthoTop&&e.orthoBottom){const o=e.orthoTop-e.orthoBottom;s*=o}}else{const o=e.getScene().useRightHandedSystem?c.RightHandedForwardReadOnly:c.LeftHandedForwardReadOnly,r=e.getDirection(o);s*=c.Dot(p.Vector3[0],r)}this._rootMesh.scaling.setAll(s),t._getWorldMatrixDeterminant()<0&&!Ee.PreserveScaling&&(this._rootMesh.scaling.y*=-1)}else this._rootMesh.scaling.setAll(this.scaleRatio)}}_handlePivot(){const t=this._attachedNode;t.isUsingPivotMatrix&&t.isUsingPivotMatrix()&&t.position&&t.getWorldMatrix().setTranslation(t.position)}_matrixChanged(){if(this._attachedNode)if(this._attachedNode._isCamera){const t=this._attachedNode;let e,i;if(t.parent){const o=p.Matrix[1];t.parent._worldMatrix.invertToRef(o),this._attachedNode._worldMatrix.multiplyToRef(o,p.Matrix[0]),e=p.Matrix[0]}else e=this._attachedNode._worldMatrix;if(t.getScene().useRightHandedSystem?(this._rightHandtoLeftHandMatrix.multiplyToRef(e,p.Matrix[1]),i=p.Matrix[1]):i=e,i.decompose(p.Vector3[1],p.Quaternion[0],p.Vector3[0]),this._attachedNode.getClassName()==="FreeCamera"||this._attachedNode.getClassName()==="FlyCamera"||this._attachedNode.getClassName()==="ArcFollowCamera"||this._attachedNode.getClassName()==="TargetCamera"||this._attachedNode.getClassName()==="TouchCamera"||this._attachedNode.getClassName()==="UniversalCamera"){const o=this._attachedNode;o.rotation=p.Quaternion[0].toEulerAngles(),o.rotationQuaternion&&(o.rotationQuaternion.copyFrom(p.Quaternion[0]),o.rotationQuaternion.normalize())}t.position.copyFrom(p.Vector3[0])}else if(this._attachedNode._isMesh||this._attachedNode.getClassName()==="AbstractMesh"||this._attachedNode.getClassName()==="TransformNode"||this._attachedNode.getClassName()==="InstancedMesh"){const t=this._attachedNode;if(t.parent){const e=p.Matrix[0],i=p.Matrix[1];t.parent.getWorldMatrix().invertToRef(e),this._attachedNode.getWorldMatrix().multiplyToRef(e,i),i.decompose(p.Vector3[0],p.Quaternion[0],t.position,Ee.PreserveScaling?t:void 0)}else this._attachedNode._worldMatrix.decompose(p.Vector3[0],p.Quaternion[0],t.position,Ee.PreserveScaling?t:void 0);p.Vector3[0].scaleInPlace(1/t.scalingDeterminant),t.scaling.copyFrom(p.Vector3[0]),t.billboardMode||(t.rotationQuaternion?(t.rotationQuaternion.copyFrom(p.Quaternion[0]),t.rotationQuaternion.normalize()):t.rotation=p.Quaternion[0].toEulerAngles())}else if(this._attachedNode.getClassName()==="Bone"){const t=this._attachedNode,e=t.getParent();if(e){const i=p.Matrix[0],s=p.Matrix[1];e.getFinalMatrix().invertToRef(i),t.getFinalMatrix().multiplyToRef(i,s),t.getLocalMatrix().copyFrom(s)}else t.getLocalMatrix().copyFrom(t.getFinalMatrix());t.markAsDirty()}else{const t=this._attachedNode;if(t.getTypeID){const e=t.getTypeID();if(e===Ei.LIGHTTYPEID_DIRECTIONALLIGHT||e===Ei.LIGHTTYPEID_SPOTLIGHT||e===Ei.LIGHTTYPEID_POINTLIGHT){const i=t.parent;if(i){const s=p.Matrix[0],o=p.Matrix[1];i.getWorldMatrix().invertToRef(s),t.getWorldMatrix().multiplyToRef(s,o),o.decompose(void 0,p.Quaternion[0],p.Vector3[0])}else this._attachedNode._worldMatrix.decompose(void 0,p.Quaternion[0],p.Vector3[0]);t.position=new c(p.Vector3[0].x,p.Vector3[0].y,p.Vector3[0].z),t.direction&&(t.direction=new c(t.direction.x,t.direction.y,t.direction.z))}}}}_setGizmoMeshMaterial(t,e){t&&t.forEach(i=>{i.material=e,i.color&&(i.color=e.diffuseColor)})}static GizmoAxisPointerObserver(t,e){let i=!1;return t.utilityLayerScene.onPointerObservable.add(o=>{var r,a;if(o.pickInfo){if(o.type===D.POINTERMOVE){if(i)return;e.forEach(_=>{var h,d;if(_.colliderMeshes&&_.gizmoMeshes){const u=((h=_.colliderMeshes)===null||h===void 0?void 0:h.indexOf((d=o==null?void 0:o.pickInfo)===null||d===void 0?void 0:d.pickedMesh))!=-1,m=_.dragBehavior.enabled?u||_.active?_.hoverMaterial:_.material:_.disableMaterial;_.gizmoMeshes.forEach(b=>{b.material=m,b.color&&(b.color=m.diffuseColor)})}})}if(o.type===D.POINTERDOWN&&e.has((r=o.pickInfo.pickedMesh)===null||r===void 0?void 0:r.parent)){i=!0;const _=e.get((a=o.pickInfo.pickedMesh)===null||a===void 0?void 0:a.parent);_.active=!0,e.forEach(h=>{var d,u;const b=(((d=h.colliderMeshes)===null||d===void 0?void 0:d.indexOf((u=o==null?void 0:o.pickInfo)===null||u===void 0?void 0:u.pickedMesh))!=-1||h.active)&&h.dragBehavior.enabled?h.hoverMaterial:h.disableMaterial;h.gizmoMeshes.forEach(w=>{w.material=b,w.color&&(w.color=b.diffuseColor)})})}o.type===D.POINTERUP&&e.forEach(_=>{_.active=!1,i=!1,_.gizmoMeshes.forEach(h=>{h.material=_.dragBehavior.enabled?_.material:_.disableMaterial,h.color&&(h.color=_.material.diffuseColor)})})}})}dispose(){this._rootMesh.dispose(),this._beforeRenderObserver&&this.gizmoLayer.utilityLayerScene.onBeforeRenderObservable.remove(this._beforeRenderObserver)}}Ee.PreserveScaling=!1;class Lt{}Lt.COPY=1;Lt.CUT=2;Lt.PASTE=3;class Oi{constructor(t,e){this.type=t,this.event=e}static GetTypeFromCharacter(t){switch(t){case 67:return Lt.COPY;case 86:return Lt.PASTE;case 88:return Lt.CUT;default:return-1}}}class Ws{constructor(t){this.name=ge.NAME_LAYER,this.scene=t||Ht.LastCreatedScene,this.scene&&(this._engine=this.scene.getEngine(),this.scene.layers=new Array)}register(){this.scene._beforeCameraDrawStage.registerStep(ge.STEP_BEFORECAMERADRAW_LAYER,this,this._drawCameraBackground),this.scene._afterCameraDrawStage.registerStep(ge.STEP_AFTERCAMERADRAW_LAYER,this,this._drawCameraForegroundWithPostProcessing),this.scene._afterCameraPostProcessStage.registerStep(ge.STEP_AFTERCAMERAPOSTPROCESS_LAYER,this,this._drawCameraForegroundWithoutPostProcessing),this.scene._beforeRenderTargetDrawStage.registerStep(ge.STEP_BEFORERENDERTARGETDRAW_LAYER,this,this._drawRenderTargetBackground),this.scene._afterRenderTargetDrawStage.registerStep(ge.STEP_AFTERRENDERTARGETDRAW_LAYER,this,this._drawRenderTargetForegroundWithPostProcessing),this.scene._afterRenderTargetPostProcessStage.registerStep(ge.STEP_AFTERRENDERTARGETPOSTPROCESS_LAYER,this,this._drawRenderTargetForegroundWithoutPostProcessing)}rebuild(){const t=this.scene.layers;for(const e of t)e._rebuild()}dispose(){const t=this.scene.layers;for(;t.length;)t[0].dispose()}_draw(t){const e=this.scene.layers;if(e.length){this._engine.setDepthBuffer(!1);for(const i of e)t(i)&&i.render();this._engine.setDepthBuffer(!0)}}_drawCameraPredicate(t,e,i,s){return!t.renderOnlyInRenderTargetTextures&&t.isBackground===e&&t.applyPostProcess===i&&(t.layerMask&s)!==0}_drawCameraBackground(t){this._draw(e=>this._drawCameraPredicate(e,!0,!0,t.layerMask))}_drawCameraForegroundWithPostProcessing(t){this._draw(e=>this._drawCameraPredicate(e,!1,!0,t.layerMask))}_drawCameraForegroundWithoutPostProcessing(t){this._draw(e=>this._drawCameraPredicate(e,!1,!1,t.layerMask))}_drawRenderTargetPredicate(t,e,i,s,o){return t.renderTargetTextures.length>0&&t.isBackground===e&&t.applyPostProcess===i&&t.renderTargetTextures.indexOf(o)>-1&&(t.layerMask&s)!==0}_drawRenderTargetBackground(t){this._draw(e=>this._drawRenderTargetPredicate(e,!0,!0,this.scene.activeCamera.layerMask,t))}_drawRenderTargetForegroundWithPostProcessing(t){this._draw(e=>this._drawRenderTargetPredicate(e,!1,!0,this.scene.activeCamera.layerMask,t))}_drawRenderTargetForegroundWithoutPostProcessing(t){this._draw(e=>this._drawRenderTargetPredicate(e,!1,!1,this.scene.activeCamera.layerMask,t))}addFromContainer(t){t.layers&&t.layers.forEach(e=>{this.scene.layers.push(e)})}removeFromContainer(t,e=!1){t.layers&&t.layers.forEach(i=>{const s=this.scene.layers.indexOf(i);s!==-1&&this.scene.layers.splice(s,1),e&&i.dispose()})}}const Gs="layerPixelShader",Us=`varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec4 color;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
vec4 baseColor=texture2D(textureSampler,vUV);
#ifdef LINEAR
baseColor.rgb=toGammaSpace(baseColor.rgb);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
gl_FragColor=baseColor*color;
#define CUSTOM_FRAGMENT_MAIN_END
}`;ot.ShadersStore[Gs]=Us;const Ys="layerVertexShader",Xs=`attribute vec2 position;
uniform vec2 scale;
uniform vec2 offset;
uniform mat4 textureMatrix;
varying vec2 vUV;
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec2 shiftedPosition=position*scale+offset;
vUV=vec2(textureMatrix*vec4(shiftedPosition*madd+madd,1.0,0.0));
gl_Position=vec4(shiftedPosition,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;ot.ShadersStore[Ys]=Xs;class Ks{set applyPostProcess(t){this._applyPostProcess=t}get applyPostProcess(){return this.isBackground||this._applyPostProcess}set onDispose(t){this._onDisposeObserver&&this.onDisposeObservable.remove(this._onDisposeObserver),this._onDisposeObserver=this.onDisposeObservable.add(t)}set onBeforeRender(t){this._onBeforeRenderObserver&&this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._onBeforeRenderObserver=this.onBeforeRenderObservable.add(t)}set onAfterRender(t){this._onAfterRenderObserver&&this.onAfterRenderObservable.remove(this._onAfterRenderObserver),this._onAfterRenderObserver=this.onAfterRenderObservable.add(t)}constructor(t,e,i,s,o){this.name=t,this._applyPostProcess=!0,this.scale=new K(1,1),this.offset=new K(0,0),this.alphaBlendingMode=2,this.layerMask=268435455,this.renderTargetTextures=[],this.renderOnlyInRenderTargetTextures=!1,this.isEnabled=!0,this._vertexBuffers={},this.onDisposeObservable=new x,this.onBeforeRenderObservable=new x,this.onAfterRenderObservable=new x,this.texture=e?new V(e,i,!0):null,this.isBackground=s===void 0?!0:s,this.color=o===void 0?new z(1,1,1,1):o,this._scene=i||Ht.LastCreatedScene;let r=this._scene._getComponent(ge.NAME_LAYER);r||(r=new Ws(this._scene),this._scene._addComponent(r)),this._scene.layers.push(this);const a=this._scene.getEngine();this._drawWrapper=new Ms(a);const _=[];_.push(1,1),_.push(-1,1),_.push(-1,-1),_.push(1,-1);const h=new B(a,_,B.PositionKind,!1,!1,2);this._vertexBuffers[B.PositionKind]=h,this._createIndexBuffer()}_createIndexBuffer(){const t=this._scene.getEngine(),e=[];e.push(0),e.push(1),e.push(2),e.push(0),e.push(2),e.push(3),this._indexBuffer=t.createIndexBuffer(e)}_rebuild(){const t=this._vertexBuffers[B.PositionKind];t&&t._rebuild(),this._createIndexBuffer()}isReady(){var t;const e=this._scene.getEngine();let i="";this.alphaTest&&(i="#define ALPHATEST"),this.texture&&!this.texture.gammaSpace&&(i+=`\r
#define LINEAR`),this._previousDefines!==i&&(this._previousDefines=i,this._drawWrapper.effect=e.createEffect("layer",[B.PositionKind],["textureMatrix","color","scale","offset"],["textureSampler"],i));const s=this._drawWrapper.effect;return(s==null?void 0:s.isReady())&&((t=this.texture)===null||t===void 0?void 0:t.isReady())}render(){if(!this.isEnabled)return;const t=this._scene.getEngine();if(!this.isReady())return;const e=this._drawWrapper.effect;this.onBeforeRenderObservable.notifyObservers(this),t.enableEffect(this._drawWrapper),t.setState(!1),e.setTexture("textureSampler",this.texture),e.setMatrix("textureMatrix",this.texture.getTextureMatrix()),e.setFloat4("color",this.color.r,this.color.g,this.color.b,this.color.a),e.setVector2("offset",this.offset),e.setVector2("scale",this.scale),t.bindBuffers(this._vertexBuffers,this._indexBuffer,e),this.alphaTest?t.drawElementsType(ki.TriangleFillMode,0,6):(t.setAlphaMode(this.alphaBlendingMode),t.drawElementsType(ki.TriangleFillMode,0,6),t.setAlphaMode(0)),this.onAfterRenderObservable.notifyObservers(this)}dispose(){const t=this._vertexBuffers[B.PositionKind];t&&(t.dispose(),this._vertexBuffers[B.PositionKind]=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null),this.texture&&(this.texture.dispose(),this.texture=null),this.renderTargetTextures=[];const e=this._scene.layers.indexOf(this);this._scene.layers.splice(e,1),this.onDisposeObservable.notifyObservers(this),this.onDisposeObservable.clear(),this.onAfterRenderObservable.clear(),this.onBeforeRenderObservable.clear()}}class Fe{constructor(t,e,i){if(this._pluginData=void 0,!i)throw new Error("Missing scene parameter for constraint constructor.");const s=i.getPhysicsEngine();if(!s)throw new Error("No Physics Engine available.");if(s.getPluginVersion()!=2)throw new Error("Plugin version is incorrect. Expected version 2.");const o=s.getPhysicsPlugin();if(!o)throw new Error("No Physics Plugin available.");this._physicsPlugin=o,this._options=e,this._type=t}get type(){return this._type}get options(){return this._options}set isEnabled(t){this._physicsPlugin.setEnabled(this,t)}get isEnabled(){return this._physicsPlugin.getEnabled(this)}set isCollisionsEnabled(t){this._physicsPlugin.setCollisionsEnabled(this,t)}get isCollisionsEnabled(){return this._physicsPlugin.getCollisionsEnabled(this)}dispose(){this._physicsPlugin.disposeConstraint(this)}}class Pr{}class Ir extends Fe{constructor(t,e,i){super(De.SIX_DOF,t,i),this.limits=e}setAxisFriction(t,e){this._physicsPlugin.setAxisFriction(this,t,e)}getAxisFriction(t){return this._physicsPlugin.getAxisFriction(this,t)}setAxisMode(t,e){this._physicsPlugin.setAxisMode(this,t,e)}getAxisMode(t){return this._physicsPlugin.getAxisMode(this,t)}setAxisMinLimit(t,e){this._physicsPlugin.setAxisMinLimit(this,t,e)}getAxisMinLimit(t){return this._physicsPlugin.getAxisMinLimit(this,t)}setAxisMaxLimit(t,e){this._physicsPlugin.setAxisMaxLimit(this,t,e)}getAxisMaxLimit(t){return this._physicsPlugin.getAxisMaxLimit(this,t)}setAxisMotorType(t,e){this._physicsPlugin.setAxisMotorType(this,t,e)}getAxisMotorType(t){return this._physicsPlugin.getAxisMotorType(this,t)}setAxisMotorTarget(t,e){this._physicsPlugin.setAxisMotorTarget(this,t,e)}getAxisMotorTarget(t){return this._physicsPlugin.getAxisMotorTarget(this,t)}setAxisMotorMaxForce(t,e){this._physicsPlugin.setAxisMotorMaxForce(this,t,e)}getAxisMotorMaxForce(t){return this._physicsPlugin.getAxisMotorMaxForce(this,t)}}class xr extends Fe{constructor(t,e,i,s,o){super(De.BALL_AND_SOCKET,{pivotA:t,pivotB:e,axisA:i,axisB:s},o)}}class yr extends Fe{constructor(t,e){super(De.DISTANCE,{maxDistance:t},e)}}class Tr extends Fe{constructor(t,e,i,s,o){super(De.HINGE,{pivotA:t,pivotB:e,axisA:i,axisB:s},o)}}class Rr extends Fe{constructor(t,e,i,s,o){super(De.SLIDER,{pivotA:t,pivotB:e,axisA:i,axisB:s},o)}}class Br extends Fe{constructor(t,e,i,s,o){super(De.LOCK,{pivotA:t,pivotB:e,axisA:i,axisB:s},o)}}class Cr extends Fe{constructor(t,e,i,s,o){super(De.PRISMATIC,{pivotA:t,pivotB:e,axisA:i,axisB:s},o)}}class R{constructor(t,e=R.UNITMODE_PIXEL,i=!0){this.negativeValueAllowed=i,this._value=1,this._unit=R.UNITMODE_PIXEL,this.ignoreAdaptiveScaling=!1,this.onChangedObservable=new x,this._value=t,this._unit=e,this._originalUnit=e}get isPercentage(){return this._unit===R.UNITMODE_PERCENTAGE}get isPixel(){return this._unit===R.UNITMODE_PIXEL}get internalValue(){return this._value}get value(){return this._value}set value(t){t!==this._value&&(this._value=t,this.onChangedObservable.notifyObservers())}get unit(){return this._unit}set unit(t){t!==this._unit&&(this._unit=t,this.onChangedObservable.notifyObservers())}getValueInPixel(t,e){return this.isPixel?this.getValue(t):this.getValue(t)*e}updateInPlace(t,e=R.UNITMODE_PIXEL){return(this.value!==t||this.unit!==e)&&(this._value=t,this._unit=e,this.onChangedObservable.notifyObservers()),this}getValue(t){if(t&&!this.ignoreAdaptiveScaling&&this.unit!==R.UNITMODE_PERCENTAGE){let e=0,i=0;if(t.idealWidth&&(e=Math.ceil(this._value*t.getSize().width/t.idealWidth)),t.idealHeight&&(i=Math.ceil(this._value*t.getSize().height/t.idealHeight)),t.useSmallestIdeal&&t.idealWidth&&t.idealHeight)return window.innerWidth<window.innerHeight?e:i;if(t.idealWidth)return e;if(t.idealHeight)return i}return this._value}toString(t,e){switch(this._unit){case R.UNITMODE_PERCENTAGE:{const i=this.getValue(t)*100;return(e?i.toFixed(e):i)+"%"}case R.UNITMODE_PIXEL:{const i=this.getValue(t);return(e?i.toFixed(e):i)+"px"}}return this._unit.toString()}fromString(t){const e=R._Regex.exec(t.toString());if(!e||e.length===0)return!1;let i=parseFloat(e[1]),s=this._originalUnit;if(this.negativeValueAllowed||i<0&&(i=0),e.length===4)switch(e[3]){case"px":s=R.UNITMODE_PIXEL;break;case"%":s=R.UNITMODE_PERCENTAGE,i/=100;break}return i===this._value&&s===this._unit?!1:(this._value=i,this._unit=s,this.onChangedObservable.notifyObservers(),!0)}static get UNITMODE_PERCENTAGE(){return R._UNITMODE_PERCENTAGE}static get UNITMODE_PIXEL(){return R._UNITMODE_PIXEL}}R._Regex=/(^-?\d*(\.\d+)?)(%|px)?/;R._UNITMODE_PERCENTAGE=0;R._UNITMODE_PIXEL=1;const We=[new K(0,0),new K(0,0),new K(0,0),new K(0,0)],Je=[new K(0,0),new K(0,0),new K(0,0),new K(0,0)],ee=new K(0,0),Se=new K(0,0);class st{constructor(t,e,i,s){this.left=t,this.top=e,this.width=i,this.height=s}copyFrom(t){this.left=t.left,this.top=t.top,this.width=t.width,this.height=t.height}copyFromFloats(t,e,i,s){this.left=t,this.top=e,this.width=i,this.height=s}static CombineToRef(t,e,i){const s=Math.min(t.left,e.left),o=Math.min(t.top,e.top),r=Math.max(t.left+t.width,e.left+e.width),a=Math.max(t.top+t.height,e.top+e.height);i.left=s,i.top=o,i.width=r-s,i.height=a-o}addAndTransformToRef(t,e,i,s,o,r){const a=this.left+e,_=this.top+i,h=this.width+s,d=this.height+o;We[0].copyFromFloats(a,_),We[1].copyFromFloats(a+h,_),We[2].copyFromFloats(a+h,_+d),We[3].copyFromFloats(a,_+d),ee.copyFromFloats(Number.MAX_VALUE,Number.MAX_VALUE),Se.copyFromFloats(0,0);for(let u=0;u<4;u++)t.transformCoordinates(We[u].x,We[u].y,Je[u]),ee.x=Math.floor(Math.min(ee.x,Je[u].x)),ee.y=Math.floor(Math.min(ee.y,Je[u].y)),Se.x=Math.ceil(Math.max(Se.x,Je[u].x)),Se.y=Math.ceil(Math.max(Se.y,Je[u].y));r.left=ee.x,r.top=ee.y,r.width=Se.x-ee.x,r.height=Se.y-ee.y}transformToRef(t,e){this.addAndTransformToRef(t,0,0,0,0,e)}isEqualsTo(t){return!(this.left!==t.left||this.top!==t.top||this.width!==t.width||this.height!==t.height)}static Empty(){return new st(0,0,0,0)}}class Di extends K{constructor(t,e=0){super(t.x,t.y),this.buttonIndex=e}}class A{constructor(t,e,i,s,o,r){this.m=new Float32Array(6),this.fromValues(t,e,i,s,o,r)}fromValues(t,e,i,s,o,r){return this.m[0]=t,this.m[1]=e,this.m[2]=i,this.m[3]=s,this.m[4]=o,this.m[5]=r,this}determinant(){return this.m[0]*this.m[3]-this.m[1]*this.m[2]}invertToRef(t){const e=this.m[0],i=this.m[1],s=this.m[2],o=this.m[3],r=this.m[4],a=this.m[5],_=this.determinant();if(_<pt*pt)return t.m[0]=0,t.m[1]=0,t.m[2]=0,t.m[3]=0,t.m[4]=0,t.m[5]=0,this;const h=1/_,d=s*a-o*r,u=i*r-e*a;return t.m[0]=o*h,t.m[1]=-i*h,t.m[2]=-s*h,t.m[3]=e*h,t.m[4]=d*h,t.m[5]=u*h,this}multiplyToRef(t,e){const i=this.m[0],s=this.m[1],o=this.m[2],r=this.m[3],a=this.m[4],_=this.m[5],h=t.m[0],d=t.m[1],u=t.m[2],m=t.m[3],b=t.m[4],w=t.m[5];return e.m[0]=i*h+s*u,e.m[1]=i*d+s*m,e.m[2]=o*h+r*u,e.m[3]=o*d+r*m,e.m[4]=a*h+_*u+b,e.m[5]=a*d+_*m+w,this}transformCoordinates(t,e,i){return i.x=t*this.m[0]+e*this.m[2]+this.m[4],i.y=t*this.m[1]+e*this.m[3]+this.m[5],this}static Identity(){return new A(1,0,0,1,0,0)}static IdentityToRef(t){t.m[0]=1,t.m[1]=0,t.m[2]=0,t.m[3]=1,t.m[4]=0,t.m[5]=0}static TranslationToRef(t,e,i){i.fromValues(1,0,0,1,t,e)}static ScalingToRef(t,e,i){i.fromValues(t,0,0,e,0,0)}static RotationToRef(t,e){const i=Math.sin(t),s=Math.cos(t);e.fromValues(s,i,-i,s,0,0)}static ComposeToRef(t,e,i,s,o,r,a){A.TranslationToRef(t,e,A._TempPreTranslationMatrix),A.ScalingToRef(s,o,A._TempScalingMatrix),A.RotationToRef(i,A._TempRotationMatrix),A.TranslationToRef(-t,-e,A._TempPostTranslationMatrix),A._TempPreTranslationMatrix.multiplyToRef(A._TempScalingMatrix,A._TempCompose0),A._TempCompose0.multiplyToRef(A._TempRotationMatrix,A._TempCompose1),r?(A._TempCompose1.multiplyToRef(A._TempPostTranslationMatrix,A._TempCompose2),A._TempCompose2.multiplyToRef(r,a)):A._TempCompose1.multiplyToRef(A._TempPostTranslationMatrix,a)}}A._TempPreTranslationMatrix=A.Identity();A._TempPostTranslationMatrix=A.Identity();A._TempRotationMatrix=A.Identity();A._TempScalingMatrix=A.Identity();A._TempCompose0=A.Identity();A._TempCompose1=A.Identity();A._TempCompose2=A.Identity();class Wi{static Round(t,e=Wi.DefaultRoundingPrecision){return Math.round(t*e)/e}}Wi.DefaultRoundingPrecision=100;class f{get isReadOnly(){return this._isReadOnly}set isReadOnly(t){this._isReadOnly=t}get transformedMeasure(){return this._evaluatedMeasure}set clipChildren(t){this._clipChildren=t}get clipChildren(){return this._clipChildren}set clipContent(t){this._clipContent=t}get clipContent(){return this._clipContent}get shadowOffsetX(){return this._shadowOffsetX}set shadowOffsetX(t){this._shadowOffsetX!==t&&(this._shadowOffsetX=t,this._markAsDirty())}get shadowOffsetY(){return this._shadowOffsetY}set shadowOffsetY(t){this._shadowOffsetY!==t&&(this._shadowOffsetY=t,this._markAsDirty())}get shadowBlur(){return this._shadowBlur}set shadowBlur(t){this._shadowBlur!==t&&(this._previousShadowBlur=this._shadowBlur,this._shadowBlur=t,this._markAsDirty())}get shadowColor(){return this._shadowColor}set shadowColor(t){this._shadowColor!==t&&(this._shadowColor=t,this._markAsDirty())}get typeName(){return this._getTypeName()}getClassName(){return this._getTypeName()}set accessibilityTag(t){this._accessibilityTag=t,this.onAccessibilityTagChangedObservable.notifyObservers(t)}get accessibilityTag(){return this._accessibilityTag}get host(){return this._host}get fontOffset(){return this._fontOffset}set fontOffset(t){this._fontOffset=t}get alpha(){return this._alpha}set alpha(t){this._alpha!==t&&(this._alphaSet=!0,this._alpha=t,this._markAsDirty())}get highlightLineWidth(){return this._highlightLineWidth}set highlightLineWidth(t){this._highlightLineWidth!==t&&(this._highlightLineWidth=t,this._markAsDirty())}get isHighlighted(){return this._isHighlighted}set isHighlighted(t){this._isHighlighted!==t&&(this._isHighlighted=t,this._markAsDirty())}get highlightColor(){return this._highlightColor}set highlightColor(t){this._highlightColor!==t&&(this._highlightColor=t,this._markAsDirty())}get scaleX(){return this._scaleX}set scaleX(t){this._scaleX!==t&&(this._scaleX=t,this._markAsDirty(),this._markMatrixAsDirty())}get scaleY(){return this._scaleY}set scaleY(t){this._scaleY!==t&&(this._scaleY=t,this._markAsDirty(),this._markMatrixAsDirty())}get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this._markAsDirty(),this._markMatrixAsDirty())}get transformCenterY(){return this._transformCenterY}set transformCenterY(t){this._transformCenterY!==t&&(this._transformCenterY=t,this._markAsDirty(),this._markMatrixAsDirty())}get transformCenterX(){return this._transformCenterX}set transformCenterX(t){this._transformCenterX!==t&&(this._transformCenterX=t,this._markAsDirty(),this._markMatrixAsDirty())}get horizontalAlignment(){return this._horizontalAlignment}set horizontalAlignment(t){this._horizontalAlignment!==t&&(this._horizontalAlignment=t,this._markAsDirty())}get verticalAlignment(){return this._verticalAlignment}set verticalAlignment(t){this._verticalAlignment!==t&&(this._verticalAlignment=t,this._markAsDirty())}set fixedRatio(t){this._fixedRatio!==t&&(this._fixedRatio=t,this._markAsDirty())}get fixedRatio(){return this._fixedRatio}set fixedRatioMasterIsWidth(t){this._fixedRatioMasterIsWidth!==t&&(this._fixedRatioMasterIsWidth=t,this._markAsDirty())}get fixedRatioMasterIsWidth(){return this._fixedRatioMasterIsWidth}get width(){return this._width.toString(this._host)}set width(t){this._fixedRatioMasterIsWidth=!0,this._width.toString(this._host)!==t&&this._width.fromString(t)&&this._markAsDirty()}get widthInPixels(){return this._width.getValueInPixel(this._host,this._cachedParentMeasure.width)}set widthInPixels(t){isNaN(t)||(this._fixedRatioMasterIsWidth=!0,this.width=t+"px")}get height(){return this._height.toString(this._host)}set height(t){this._fixedRatioMasterIsWidth=!1,this._height.toString(this._host)!==t&&this._height.fromString(t)&&this._markAsDirty()}get heightInPixels(){return this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)}set heightInPixels(t){isNaN(t)||(this._fixedRatioMasterIsWidth=!1,this.height=t+"px")}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily!==t&&(this._fontFamily=t,this._resetFontCache())}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle!==t&&(this._fontStyle=t,this._resetFontCache())}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight!==t&&(this._fontWeight=t,this._resetFontCache())}get style(){return this._style}set style(t){this._style&&(this._style.onChangedObservable.remove(this._styleObserver),this._styleObserver=null),this._style=t,this._style&&(this._styleObserver=this._style.onChangedObservable.add(()=>{this._markAsDirty(),this._resetFontCache()})),this._markAsDirty(),this._resetFontCache()}get _isFontSizeInPercentage(){return this._fontSize.isPercentage}get fontSizeInPixels(){const t=this._style?this._style._fontSize:this._fontSize;return t.isPixel?t.getValue(this._host):t.getValueInPixel(this._host,this._tempParentMeasure.height||this._cachedParentMeasure.height)}set fontSizeInPixels(t){isNaN(t)||(this.fontSize=t+"px")}get fontSize(){return this._fontSize.toString(this._host)}set fontSize(t){this._fontSize.toString(this._host)!==t&&this._fontSize.fromString(t)&&(this._markAsDirty(),this._resetFontCache())}get color(){return this._color}set color(t){this._color!==t&&(this._color=t,this._markAsDirty())}get gradient(){return this._gradient}set gradient(t){this._gradient!==t&&(this._gradient=t,this._markAsDirty())}get zIndex(){return this._zIndex}set zIndex(t){this.zIndex!==t&&(this._zIndex=t,this.parent&&this.parent._reOrderControl(this))}get notRenderable(){return this._doNotRender}set notRenderable(t){this._doNotRender!==t&&(this._doNotRender=t,this._markAsDirty())}get isVisible(){return this._isVisible}set isVisible(t){this._isVisible!==t&&(this._isVisible=t,this._markAsDirty(!0),this.onIsVisibleChangedObservable.notifyObservers(t))}get isDirty(){return this._isDirty}get linkedMesh(){return this._linkedMesh}get descendantsOnlyPadding(){return this._descendantsOnlyPadding}set descendantsOnlyPadding(t){this._descendantsOnlyPadding!==t&&(this._descendantsOnlyPadding=t,this._markAsDirty())}get paddingLeft(){return this._paddingLeft.toString(this._host)}set paddingLeft(t){this._paddingLeft.fromString(t)&&this._markAsDirty()}get paddingLeftInPixels(){return this._paddingLeft.getValueInPixel(this._host,this._cachedParentMeasure.width)}set paddingLeftInPixels(t){isNaN(t)||(this.paddingLeft=t+"px")}get _paddingLeftInPixels(){return this._descendantsOnlyPadding?0:this.paddingLeftInPixels}get paddingRight(){return this._paddingRight.toString(this._host)}set paddingRight(t){this._paddingRight.fromString(t)&&this._markAsDirty()}get paddingRightInPixels(){return this._paddingRight.getValueInPixel(this._host,this._cachedParentMeasure.width)}set paddingRightInPixels(t){isNaN(t)||(this.paddingRight=t+"px")}get _paddingRightInPixels(){return this._descendantsOnlyPadding?0:this.paddingRightInPixels}get paddingTop(){return this._paddingTop.toString(this._host)}set paddingTop(t){this._paddingTop.fromString(t)&&this._markAsDirty()}get paddingTopInPixels(){return this._paddingTop.getValueInPixel(this._host,this._cachedParentMeasure.height)}set paddingTopInPixels(t){isNaN(t)||(this.paddingTop=t+"px")}get _paddingTopInPixels(){return this._descendantsOnlyPadding?0:this.paddingTopInPixels}get paddingBottom(){return this._paddingBottom.toString(this._host)}set paddingBottom(t){this._paddingBottom.fromString(t)&&this._markAsDirty()}get paddingBottomInPixels(){return this._paddingBottom.getValueInPixel(this._host,this._cachedParentMeasure.height)}set paddingBottomInPixels(t){isNaN(t)||(this.paddingBottom=t+"px")}get _paddingBottomInPixels(){return this._descendantsOnlyPadding?0:this.paddingBottomInPixels}get left(){return this._left.toString(this._host)}set left(t){this._left.fromString(t)&&this._markAsDirty()}get leftInPixels(){return this._left.getValueInPixel(this._host,this._cachedParentMeasure.width)}set leftInPixels(t){isNaN(t)||(this.left=t+"px")}get top(){return this._top.toString(this._host)}set top(t){this._top.fromString(t)&&this._markAsDirty()}get topInPixels(){return this._top.getValueInPixel(this._host,this._cachedParentMeasure.height)}set topInPixels(t){isNaN(t)||(this.top=t+"px")}get linkOffsetX(){return this._linkOffsetX.toString(this._host)}set linkOffsetX(t){this._linkOffsetX.fromString(t)&&this._markAsDirty()}get linkOffsetXInPixels(){return this._linkOffsetX.getValueInPixel(this._host,this._cachedParentMeasure.width)}set linkOffsetXInPixels(t){isNaN(t)||(this.linkOffsetX=t+"px")}get linkOffsetY(){return this._linkOffsetY.toString(this._host)}set linkOffsetY(t){this._linkOffsetY.fromString(t)&&this._markAsDirty()}get linkOffsetYInPixels(){return this._linkOffsetY.getValueInPixel(this._host,this._cachedParentMeasure.height)}set linkOffsetYInPixels(t){isNaN(t)||(this.linkOffsetY=t+"px")}get centerX(){return this._currentMeasure.left+this._currentMeasure.width/2}get centerY(){return this._currentMeasure.top+this._currentMeasure.height/2}get isEnabled(){return this._isEnabled}set isEnabled(t){if(this._isEnabled===t)return;this._isEnabled=t,this._markAsDirty();const e=i=>{if(i.host){for(const s in i.host._lastControlOver)i===this.host._lastControlOver[s]&&(i._onPointerOut(i,null,!0),delete i.host._lastControlOver[s]);i.children!==void 0&&i.children.forEach(e)}};e(this)}get disabledColor(){return this._disabledColor}set disabledColor(t){this._disabledColor!==t&&(this._disabledColor=t,this._markAsDirty())}get disabledColorItem(){return this._disabledColorItem}set disabledColorItem(t){this._disabledColorItem!==t&&(this._disabledColorItem=t,this._markAsDirty())}constructor(t){this.name=t,this._alpha=1,this._alphaSet=!1,this._zIndex=0,this._currentMeasure=st.Empty(),this._tempPaddingMeasure=st.Empty(),this._fontFamily="Arial",this._fontStyle="",this._fontWeight="",this._fontSize=new R(18,R.UNITMODE_PIXEL,!1),this._width=new R(1,R.UNITMODE_PERCENTAGE,!1),this._height=new R(1,R.UNITMODE_PERCENTAGE,!1),this._color="",this._style=null,this._horizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,this._verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,this._isDirty=!0,this._wasDirty=!1,this._tempParentMeasure=st.Empty(),this._prevCurrentMeasureTransformedIntoGlobalSpace=st.Empty(),this._cachedParentMeasure=st.Empty(),this._descendantsOnlyPadding=!1,this._paddingLeft=new R(0),this._paddingRight=new R(0),this._paddingTop=new R(0),this._paddingBottom=new R(0),this._left=new R(0),this._top=new R(0),this._scaleX=1,this._scaleY=1,this._rotation=0,this._transformCenterX=.5,this._transformCenterY=.5,this._transformMatrix=A.Identity(),this._invertTransformMatrix=A.Identity(),this._transformedPosition=K.Zero(),this._isMatrixDirty=!0,this._isVisible=!0,this._isHighlighted=!1,this._highlightColor="#4affff",this._highlightLineWidth=2,this._fontSet=!1,this._dummyVector2=K.Zero(),this._downCount=0,this._enterCount=-1,this._doNotRender=!1,this._downPointerIds={},this._evaluatedMeasure=new st(0,0,0,0),this._evaluatedParentMeasure=new st(0,0,0,0),this._isEnabled=!0,this._disabledColor="#9a9a9a",this._disabledColorItem="#6a6a6a",this._isReadOnly=!1,this._gradient=null,this._rebuildLayout=!1,this._customData={},this._isClipped=!1,this._automaticSize=!1,this.metadata=null,this.isHitTestVisible=!0,this.isPointerBlocker=!1,this.isFocusInvisible=!1,this._clipChildren=!0,this._clipContent=!0,this.useBitmapCache=!1,this._shadowOffsetX=0,this._shadowOffsetY=0,this._shadowBlur=0,this._previousShadowBlur=0,this._shadowColor="black",this.hoverCursor="",this._linkOffsetX=new R(0),this._linkOffsetY=new R(0),this._accessibilityTag=null,this.onAccessibilityTagChangedObservable=new x,this.onWheelObservable=new x,this.onPointerMoveObservable=new x,this.onPointerOutObservable=new x,this.onPointerDownObservable=new x,this.onPointerUpObservable=new x,this.onPointerClickObservable=new x,this.onPointerEnterObservable=new x,this.onDirtyObservable=new x,this.onBeforeDrawObservable=new x,this.onAfterDrawObservable=new x,this.onDisposeObservable=new x,this.onIsVisibleChangedObservable=new x,this._fixedRatio=0,this._fixedRatioMasterIsWidth=!0,this.animations=null,this._tmpMeasureA=new st(0,0,0,0)}_getTypeName(){return"Control"}getAscendantOfClass(t){return this.parent?this.parent.getClassName()===t?this.parent:this.parent.getAscendantOfClass(t):null}markAsDirty(t=!1){this._markAsDirty(t)}markAllAsDirty(){this._markAllAsDirty()}_resetFontCache(){this._fontSet=!0,this._markAsDirty()}isAscendant(t){return this.parent?this.parent===t?!0:this.parent.isAscendant(t):!1}getLocalCoordinates(t){const e=K.Zero();return this.getLocalCoordinatesToRef(t,e),e}getLocalCoordinatesToRef(t,e){return e.x=t.x-this._currentMeasure.left,e.y=t.y-this._currentMeasure.top,this}getParentLocalCoordinates(t){const e=K.Zero();return e.x=t.x-this._cachedParentMeasure.left,e.y=t.y-this._cachedParentMeasure.top,e}moveToVector3(t,e){if(!this._host||this.parent!==this._host._rootContainer){_t.Error("Cannot move a control to a vector3 if the control is not at root level");return}this.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP;const i=this._host._getGlobalViewport(),s=c.Project(t,Ct.IdentityReadOnly,e.getTransformMatrix(),i);if(this._moveToProjectedPosition(s),s.z<0||s.z>1){this.notRenderable=!0;return}this.notRenderable=!1}getDescendantsToRef(t,e=!1,i){}getDescendants(t,e){const i=new Array;return this.getDescendantsToRef(i,t,e),i}linkWithMesh(t){if(!this._host||this.parent&&this.parent!==this._host._rootContainer){t&&_t.Error("Cannot link a control to a mesh if the control is not at root level");return}const e=this._host._linkedControls.indexOf(this);if(e!==-1){this._linkedMesh=t,t||this._host._linkedControls.splice(e,1);return}else if(!t)return;this.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._linkedMesh=t,this._host._linkedControls.push(this)}setPadding(t,e,i,s){const o=t,r=e??o,a=i??o,_=s??r;this.paddingTop=o,this.paddingRight=r,this.paddingBottom=a,this.paddingLeft=_}setPaddingInPixels(t,e,i,s){const o=t,r=e??o,a=i??o,_=s??r;this.paddingTopInPixels=o,this.paddingRightInPixels=r,this.paddingBottomInPixels=a,this.paddingLeftInPixels=_}_moveToProjectedPosition(t){var e;const i=this._left.getValue(this._host),s=this._top.getValue(this._host),o=(e=this.parent)===null||e===void 0?void 0:e._currentMeasure;o&&this._processMeasures(o,this._host.getContext());let r=t.x+this._linkOffsetX.getValue(this._host)-this._currentMeasure.width/2,a=t.y+this._linkOffsetY.getValue(this._host)-this._currentMeasure.height/2;const _=this._left.ignoreAdaptiveScaling&&this._top.ignoreAdaptiveScaling;_&&(Math.abs(r-i)<.5&&(r=i),Math.abs(a-s)<.5&&(a=s)),!(!_&&i===r&&s===a)&&(this.left=r+"px",this.top=a+"px",this._left.ignoreAdaptiveScaling=!0,this._top.ignoreAdaptiveScaling=!0,this._markAsDirty())}_offsetLeft(t){this._isDirty=!0,this._currentMeasure.left+=t}_offsetTop(t){this._isDirty=!0,this._currentMeasure.top+=t}_markMatrixAsDirty(){this._isMatrixDirty=!0,this._flagDescendantsAsMatrixDirty()}_flagDescendantsAsMatrixDirty(){}_intersectsRect(t,e){return this._transform(e),!(this._evaluatedMeasure.left>=t.left+t.width||this._evaluatedMeasure.top>=t.top+t.height||this._evaluatedMeasure.left+this._evaluatedMeasure.width<=t.left||this._evaluatedMeasure.top+this._evaluatedMeasure.height<=t.top)}_computeAdditionnalOffsetX(){return 0}_computeAdditionnalOffsetY(){return 0}invalidateRect(){if(this._transform(),this.host&&this.host.useInvalidateRectOptimization){this._currentMeasure.transformToRef(this._transformMatrix,this._tmpMeasureA),st.CombineToRef(this._tmpMeasureA,this._prevCurrentMeasureTransformedIntoGlobalSpace,this._tmpMeasureA);const t=this.shadowOffsetX,e=this.shadowOffsetY,i=Math.max(this._previousShadowBlur,this.shadowBlur),s=Math.min(Math.min(t,0)-i*2,0),o=Math.max(Math.max(t,0)+i*2,0),r=Math.min(Math.min(e,0)-i*2,0),a=Math.max(Math.max(e,0)+i*2,0),_=this._computeAdditionnalOffsetX(),h=this._computeAdditionnalOffsetY();this.host.invalidateRect(Math.floor(this._tmpMeasureA.left+s-_),Math.floor(this._tmpMeasureA.top+r-h),Math.ceil(this._tmpMeasureA.left+this._tmpMeasureA.width+o+_),Math.ceil(this._tmpMeasureA.top+this._tmpMeasureA.height+a+h))}}_markAsDirty(t=!1){!this._isVisible&&!t||(this._isDirty=!0,this._markMatrixAsDirty(),this._host&&this._host.markAsDirty())}_markAllAsDirty(){this._markAsDirty(),this._font&&this._prepareFont()}_link(t){this._host=t,this._host&&(this.uniqueId=this._host.getScene().getUniqueId())}_transform(t){if(!this._isMatrixDirty&&this._scaleX===1&&this._scaleY===1&&this._rotation===0)return;const e=this._currentMeasure.width*this._transformCenterX+this._currentMeasure.left,i=this._currentMeasure.height*this._transformCenterY+this._currentMeasure.top;t&&(t.translate(e,i),t.rotate(this._rotation),t.scale(this._scaleX,this._scaleY),t.translate(-e,-i)),(this._isMatrixDirty||this._cachedOffsetX!==e||this._cachedOffsetY!==i)&&(this._cachedOffsetX=e,this._cachedOffsetY=i,this._isMatrixDirty=!1,this._flagDescendantsAsMatrixDirty(),A.ComposeToRef(-e,-i,this._rotation,this._scaleX,this._scaleY,this.parent?this.parent._transformMatrix:null,this._transformMatrix),this._transformMatrix.invertToRef(this._invertTransformMatrix),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure))}_renderHighlight(t){this.isHighlighted&&(t.save(),t.strokeStyle=this._highlightColor,t.lineWidth=this._highlightLineWidth,this._renderHighlightSpecific(t),t.restore())}_renderHighlightSpecific(t){t.strokeRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)}_getColor(t){return this.gradient?this.gradient.getCanvasGradient(t):this.color}_applyStates(t){this._isFontSizeInPercentage&&(this._fontSet=!0),this._host&&this._host.useSmallestIdeal&&!this._font&&(this._fontSet=!0),this._fontSet&&(this._prepareFont(),this._fontSet=!1),this._font&&(t.font=this._font),(this._color||this.gradient)&&(t.fillStyle=this._getColor(t)),f.AllowAlphaInheritance?t.globalAlpha*=this._alpha:this._alphaSet&&(t.globalAlpha=this.parent&&!this.parent.renderToIntermediateTexture?this.parent.alpha*this._alpha:this._alpha)}_layout(t,e){if(!this.isDirty&&(!this.isVisible||this.notRenderable))return!1;if(this._isDirty||!this._cachedParentMeasure.isEqualsTo(t)){this.host._numLayoutCalls++,this._currentMeasure.addAndTransformToRef(this._transformMatrix,-this._paddingLeftInPixels|0,-this._paddingTopInPixels|0,this._paddingRightInPixels|0,this._paddingBottomInPixels|0,this._prevCurrentMeasureTransformedIntoGlobalSpace),e.save(),this._applyStates(e);let i=0;do this._rebuildLayout=!1,this._processMeasures(t,e),i++;while(this._rebuildLayout&&i<3);i>=3&&Hi.Error(`Layout cycle detected in GUI (Control name=${this.name}, uniqueId=${this.uniqueId})`),e.restore(),this.invalidateRect(),this._evaluateClippingState(t)}return this._wasDirty=this._isDirty,this._isDirty=!1,!0}_processMeasures(t,e){this._tempPaddingMeasure.copyFrom(t),this.parent&&this.parent.descendantsOnlyPadding&&(this._tempPaddingMeasure.left+=this.parent.paddingLeftInPixels,this._tempPaddingMeasure.top+=this.parent.paddingTopInPixels,this._tempPaddingMeasure.width-=this.parent.paddingLeftInPixels+this.parent.paddingRightInPixels,this._tempPaddingMeasure.height-=this.parent.paddingTopInPixels+this.parent.paddingBottomInPixels),this._currentMeasure.copyFrom(this._tempPaddingMeasure),this._preMeasure(this._tempPaddingMeasure,e),this._measure(),this._computeAlignment(this._tempPaddingMeasure,e),this._currentMeasure.left=this._currentMeasure.left|0,this._currentMeasure.top=this._currentMeasure.top|0,this._currentMeasure.width=this._currentMeasure.width|0,this._currentMeasure.height=this._currentMeasure.height|0,this._additionalProcessing(this._tempPaddingMeasure,e),this._cachedParentMeasure.copyFrom(this._tempPaddingMeasure),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure),this.onDirtyObservable.hasObservers()&&this.onDirtyObservable.notifyObservers(this)}_evaluateClippingState(t){if(this._transform(),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure),this.parent&&this.parent.clipChildren){if(t.transformToRef(this.parent._transformMatrix,this._evaluatedParentMeasure),this._evaluatedMeasure.left>this._evaluatedParentMeasure.left+this._evaluatedParentMeasure.width){this._isClipped=!0;return}if(this._evaluatedMeasure.left+this._evaluatedMeasure.width<this._evaluatedParentMeasure.left){this._isClipped=!0;return}if(this._evaluatedMeasure.top>this._evaluatedParentMeasure.top+this._evaluatedParentMeasure.height){this._isClipped=!0;return}if(this._evaluatedMeasure.top+this._evaluatedMeasure.height<this._evaluatedParentMeasure.top){this._isClipped=!0;return}}this._isClipped=!1}_measure(){this._width.isPixel?this._currentMeasure.width=this._width.getValue(this._host):this._currentMeasure.width*=this._width.getValue(this._host),this._height.isPixel?this._currentMeasure.height=this._height.getValue(this._host):this._currentMeasure.height*=this._height.getValue(this._host),this._fixedRatio!==0&&(this._fixedRatioMasterIsWidth?this._currentMeasure.height=this._currentMeasure.width*this._fixedRatio:this._currentMeasure.width=this._currentMeasure.height*this._fixedRatio)}_computeAlignment(t,e){const i=this._currentMeasure.width,s=this._currentMeasure.height,o=t.width,r=t.height;let a=0,_=0;switch(this.horizontalAlignment){case f.HORIZONTAL_ALIGNMENT_LEFT:a=0;break;case f.HORIZONTAL_ALIGNMENT_RIGHT:a=o-i;break;case f.HORIZONTAL_ALIGNMENT_CENTER:a=(o-i)/2;break}switch(this.verticalAlignment){case f.VERTICAL_ALIGNMENT_TOP:_=0;break;case f.VERTICAL_ALIGNMENT_BOTTOM:_=r-s;break;case f.VERTICAL_ALIGNMENT_CENTER:_=(r-s)/2;break}this.descendantsOnlyPadding||(this._paddingLeft.isPixel?(this._currentMeasure.left+=this._paddingLeft.getValue(this._host),this._currentMeasure.width-=this._paddingLeft.getValue(this._host)):(this._currentMeasure.left+=o*this._paddingLeft.getValue(this._host),this._currentMeasure.width-=o*this._paddingLeft.getValue(this._host)),this._paddingRight.isPixel?this._currentMeasure.width-=this._paddingRight.getValue(this._host):this._currentMeasure.width-=o*this._paddingRight.getValue(this._host),this._paddingTop.isPixel?(this._currentMeasure.top+=this._paddingTop.getValue(this._host),this._currentMeasure.height-=this._paddingTop.getValue(this._host)):(this._currentMeasure.top+=r*this._paddingTop.getValue(this._host),this._currentMeasure.height-=r*this._paddingTop.getValue(this._host)),this._paddingBottom.isPixel?this._currentMeasure.height-=this._paddingBottom.getValue(this._host):this._currentMeasure.height-=r*this._paddingBottom.getValue(this._host)),this._left.isPixel?this._currentMeasure.left+=this._left.getValue(this._host):this._currentMeasure.left+=o*this._left.getValue(this._host),this._top.isPixel?this._currentMeasure.top+=this._top.getValue(this._host):this._currentMeasure.top+=r*this._top.getValue(this._host),this._currentMeasure.left+=a,this._currentMeasure.top+=_}_preMeasure(t,e){}_additionalProcessing(t,e){}_clipForChildren(t){}_clip(t,e){if(t.beginPath(),f._ClipMeasure.copyFrom(this._currentMeasure),e){e.transformToRef(this._invertTransformMatrix,this._tmpMeasureA);const i=new st(0,0,0,0);i.left=Math.max(this._tmpMeasureA.left,this._currentMeasure.left),i.top=Math.max(this._tmpMeasureA.top,this._currentMeasure.top),i.width=Math.min(this._tmpMeasureA.left+this._tmpMeasureA.width,this._currentMeasure.left+this._currentMeasure.width)-i.left,i.height=Math.min(this._tmpMeasureA.top+this._tmpMeasureA.height,this._currentMeasure.top+this._currentMeasure.height)-i.top,f._ClipMeasure.copyFrom(i)}if(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY){const i=this.shadowOffsetX,s=this.shadowOffsetY,o=this.shadowBlur,r=Math.min(Math.min(i,0)-o*2,0),a=Math.max(Math.max(i,0)+o*2,0),_=Math.min(Math.min(s,0)-o*2,0),h=Math.max(Math.max(s,0)+o*2,0);t.rect(f._ClipMeasure.left+r,f._ClipMeasure.top+_,f._ClipMeasure.width+a-r,f._ClipMeasure.height+h-_)}else t.rect(f._ClipMeasure.left,f._ClipMeasure.top,f._ClipMeasure.width,f._ClipMeasure.height);t.clip()}_render(t,e){return!this.isVisible||this.notRenderable||this._isClipped?(this._isDirty=!1,!1):(this.host._numRenderCalls++,t.save(),this._applyStates(t),this._transform(t),this.clipContent&&this._clip(t,e),this.onBeforeDrawObservable.hasObservers()&&this.onBeforeDrawObservable.notifyObservers(this),this.useBitmapCache&&!this._wasDirty&&this._cacheData?t.putImageData(this._cacheData,this._currentMeasure.left,this._currentMeasure.top):this._draw(t,e),this.useBitmapCache&&this._wasDirty&&(this._cacheData=t.getImageData(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._renderHighlight(t),this.onAfterDrawObservable.hasObservers()&&this.onAfterDrawObservable.notifyObservers(this),t.restore(),!0)}_draw(t,e){}contains(t,e){return this._invertTransformMatrix.transformCoordinates(t,e,this._transformedPosition),t=this._transformedPosition.x,e=this._transformedPosition.y,t<this._currentMeasure.left||t>this._currentMeasure.left+this._currentMeasure.width||e<this._currentMeasure.top||e>this._currentMeasure.top+this._currentMeasure.height?!1:(this.isPointerBlocker&&(this._host._shouldBlockPointer=!0),!0)}_processPicking(t,e,i,s,o,r,a,_){return!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this._doNotRender||!this.contains(t,e)?!1:(this._processObservables(s,t,e,i,o,r,a,_),!0)}_onPointerMove(t,e,i,s){this.onPointerMoveObservable.notifyObservers(e,-1,t,this,s)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerMove(t,e,i,s)}_onPointerEnter(t,e){return!this._isEnabled||this._enterCount>0?!1:(this._enterCount===-1&&(this._enterCount=0),this._enterCount++,this.onPointerEnterObservable.notifyObservers(this,-1,t,this,e)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerEnter(t,e),!0)}_onPointerOut(t,e,i=!1){if(!i&&(!this._isEnabled||t===this))return;this._enterCount=0;let s=!0;t.isAscendant(this)||(s=this.onPointerOutObservable.notifyObservers(this,-1,t,this,e)),s&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerOut(t,e,i)}_onPointerDown(t,e,i,s,o){return this._onPointerEnter(this,o),this._downCount!==0?!1:(this._downCount++,this._downPointerIds[i]=!0,this.onPointerDownObservable.notifyObservers(new Di(e,s),-1,t,this,o)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerDown(t,e,i,s,o),o&&this.uniqueId!==this._host.rootContainer.uniqueId&&this._host._capturedPointerIds.add(o.event.pointerId),!0)}_onPointerUp(t,e,i,s,o,r){if(!this._isEnabled)return;this._downCount=0,delete this._downPointerIds[i];let a=o;o&&(this._enterCount>0||this._enterCount===-1)&&(a=this.onPointerClickObservable.notifyObservers(new Di(e,s),-1,t,this,r)),this.onPointerUpObservable.notifyObservers(new Di(e,s),-1,t,this,r)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerUp(t,e,i,s,a,r),r&&this.uniqueId!==this._host.rootContainer.uniqueId&&this._host._capturedPointerIds.delete(r.event.pointerId)}_forcePointerUp(t=null){if(t!==null)this._onPointerUp(this,K.Zero(),t,0,!0);else for(const e in this._downPointerIds)this._onPointerUp(this,K.Zero(),+e,0,!0)}_onWheelScroll(t,e){if(!this._isEnabled)return;this.onWheelObservable.notifyObservers(new K(t,e))&&this.parent!=null&&this.parent._onWheelScroll(t,e)}_onCanvasBlur(){}_processObservables(t,e,i,s,o,r,a,_){if(!this._isEnabled)return!1;if(this._dummyVector2.copyFromFloats(e,i),t===D.POINTERMOVE){this._onPointerMove(this,this._dummyVector2,o,s);const h=this._host._lastControlOver[o];return h&&h!==this&&h._onPointerOut(this,s),h!==this&&this._onPointerEnter(this,s),this._host._lastControlOver[o]=this,!0}return t===D.POINTERDOWN?(this._onPointerDown(this,this._dummyVector2,o,r,s),this._host._registerLastControlDown(this,o),this._host._lastPickedControl=this,!0):t===D.POINTERUP?(this._host._lastControlDown[o]&&this._host._lastControlDown[o]._onPointerUp(this,this._dummyVector2,o,r,!0,s),delete this._host._lastControlDown[o],!0):t===D.POINTERWHEEL&&this._host._lastControlOver[o]?(this._host._lastControlOver[o]._onWheelScroll(a,_),!0):!1}_prepareFont(){!this._font&&!this._fontSet||(this._style?this._font=this._style.fontStyle+" "+this._style.fontWeight+" "+this.fontSizeInPixels+"px "+this._style.fontFamily:this._font=this._fontStyle+" "+this._fontWeight+" "+this.fontSizeInPixels+"px "+this._fontFamily,this._fontOffset=f._GetFontOffset(this._font),this.getDescendants().forEach(t=>t._markAllAsDirty()))}clone(t){const e={};this.serialize(e);const i=_t.Instantiate("BABYLON.GUI."+e.className),s=new i;return s.parse(e,t),s}parse(t,e){return q.Parse(()=>this,t,null),this.name=t.name,this._parseFromContent(t,e??this._host),this}serialize(t){q.Serialize(this,t),t.name=this.name,t.className=this.getClassName(),this._prepareFont(),this._font&&(t.fontFamily=this._fontFamily,t.fontSize=this.fontSize,t.fontWeight=this.fontWeight,t.fontStyle=this.fontStyle),this._gradient&&(t.gradient={},this._gradient.serialize(t.gradient)),q.AppendSerializedAnimations(this,t)}_parseFromContent(t,e){var i,s;if(t.fontFamily&&(this.fontFamily=t.fontFamily),t.fontSize&&(this.fontSize=t.fontSize),t.fontWeight&&(this.fontWeight=t.fontWeight),t.fontStyle&&(this.fontStyle=t.fontStyle),t.gradient){const o=_t.Instantiate("BABYLON.GUI."+t.gradient.className);this._gradient=new o,(i=this._gradient)===null||i===void 0||i.parse(t.gradient)}if(t.animations){this.animations=[];for(let o=0;o<t.animations.length;o++){const r=t.animations[o],a=as("BABYLON.Animation");a&&this.animations.push(a.Parse(r))}t.autoAnimate&&this._host&&this._host.getScene()&&this._host.getScene().beginAnimation(this,t.autoAnimateFrom,t.autoAnimateTo,t.autoAnimateLoop,t.autoAnimateSpeed||1)}this.fixedRatioMasterIsWidth=(s=t.fixedRatioMasterIsWidth)!==null&&s!==void 0?s:this.fixedRatioMasterIsWidth}dispose(){this.onDirtyObservable.clear(),this.onBeforeDrawObservable.clear(),this.onAfterDrawObservable.clear(),this.onPointerDownObservable.clear(),this.onPointerEnterObservable.clear(),this.onPointerMoveObservable.clear(),this.onPointerOutObservable.clear(),this.onPointerUpObservable.clear(),this.onPointerClickObservable.clear(),this.onWheelObservable.clear(),this._styleObserver&&this._style&&(this._style.onChangedObservable.remove(this._styleObserver),this._styleObserver=null),this.parent&&(this.parent.removeControl(this),this.parent=null),this._host&&this._host._linkedControls.indexOf(this)>-1&&this.linkWithMesh(null),this.onDisposeObservable.notifyObservers(this),this.onDisposeObservable.clear()}static get HORIZONTAL_ALIGNMENT_LEFT(){return f._HORIZONTAL_ALIGNMENT_LEFT}static get HORIZONTAL_ALIGNMENT_RIGHT(){return f._HORIZONTAL_ALIGNMENT_RIGHT}static get HORIZONTAL_ALIGNMENT_CENTER(){return f._HORIZONTAL_ALIGNMENT_CENTER}static get VERTICAL_ALIGNMENT_TOP(){return f._VERTICAL_ALIGNMENT_TOP}static get VERTICAL_ALIGNMENT_BOTTOM(){return f._VERTICAL_ALIGNMENT_BOTTOM}static get VERTICAL_ALIGNMENT_CENTER(){return f._VERTICAL_ALIGNMENT_CENTER}static _GetFontOffset(t){if(f._FontHeightSizes[t])return f._FontHeightSizes[t];const e=Ht.LastCreatedEngine;if(!e)throw new Error("Invalid engine. Unable to create a canvas.");const i=e.getFontOffset(t);return f._FontHeightSizes[t]=i,i}static Parse(t,e){const i=_t.Instantiate("BABYLON.GUI."+t.className),s=q.Parse(()=>new i,t,null);return s.name=t.name,s._parseFromContent(t,e),s}static drawEllipse(t,e,i,s,o){o.translate(t,e),o.scale(i,s),o.beginPath(),o.arc(0,0,1,0,2*Math.PI),o.closePath(),o.scale(1/i,1/s),o.translate(-t,-e)}isReady(){return!0}}f.AllowAlphaInheritance=!1;f._ClipMeasure=new st(0,0,0,0);f._HORIZONTAL_ALIGNMENT_LEFT=0;f._HORIZONTAL_ALIGNMENT_RIGHT=1;f._HORIZONTAL_ALIGNMENT_CENTER=2;f._VERTICAL_ALIGNMENT_TOP=0;f._VERTICAL_ALIGNMENT_BOTTOM=1;f._VERTICAL_ALIGNMENT_CENTER=2;f._FontHeightSizes={};f.AddHeader=()=>{};n([l()],f.prototype,"metadata",void 0);n([l()],f.prototype,"isHitTestVisible",void 0);n([l()],f.prototype,"isPointerBlocker",void 0);n([l()],f.prototype,"isFocusInvisible",void 0);n([l()],f.prototype,"clipChildren",null);n([l()],f.prototype,"clipContent",null);n([l()],f.prototype,"useBitmapCache",void 0);n([l()],f.prototype,"shadowOffsetX",null);n([l()],f.prototype,"shadowOffsetY",null);n([l()],f.prototype,"shadowBlur",null);n([l()],f.prototype,"shadowColor",null);n([l()],f.prototype,"hoverCursor",void 0);n([l()],f.prototype,"fontOffset",null);n([l()],f.prototype,"alpha",null);n([l()],f.prototype,"scaleX",null);n([l()],f.prototype,"scaleY",null);n([l()],f.prototype,"rotation",null);n([l()],f.prototype,"transformCenterY",null);n([l()],f.prototype,"transformCenterX",null);n([l()],f.prototype,"horizontalAlignment",null);n([l()],f.prototype,"verticalAlignment",null);n([l()],f.prototype,"fixedRatio",null);n([l()],f.prototype,"fixedRatioMasterIsWidth",null);n([l()],f.prototype,"width",null);n([l()],f.prototype,"height",null);n([l()],f.prototype,"style",null);n([l()],f.prototype,"color",null);n([l()],f.prototype,"gradient",null);n([l()],f.prototype,"zIndex",null);n([l()],f.prototype,"notRenderable",null);n([l()],f.prototype,"isVisible",null);n([l()],f.prototype,"descendantsOnlyPadding",null);n([l()],f.prototype,"paddingLeft",null);n([l()],f.prototype,"paddingRight",null);n([l()],f.prototype,"paddingTop",null);n([l()],f.prototype,"paddingBottom",null);n([l()],f.prototype,"left",null);n([l()],f.prototype,"top",null);n([l()],f.prototype,"linkOffsetX",null);n([l()],f.prototype,"linkOffsetY",null);n([l()],f.prototype,"isEnabled",null);n([l()],f.prototype,"disabledColor",null);n([l()],f.prototype,"disabledColorItem",null);n([l()],f.prototype,"overlapGroup",void 0);n([l()],f.prototype,"overlapDeltaMultiplier",void 0);k("BABYLON.GUI.Control",f);class yt extends f{get renderToIntermediateTexture(){return this._renderToIntermediateTexture}set renderToIntermediateTexture(t){this._renderToIntermediateTexture!==t&&(this._renderToIntermediateTexture=t,this._markAsDirty())}get adaptHeightToChildren(){return this._adaptHeightToChildren}set adaptHeightToChildren(t){this._adaptHeightToChildren!==t&&(this._adaptHeightToChildren=t,t&&(this.height="100%"),this._markAsDirty())}get adaptWidthToChildren(){return this._adaptWidthToChildren}set adaptWidthToChildren(t){this._adaptWidthToChildren!==t&&(this._adaptWidthToChildren=t,t&&(this.width="100%"),this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(t){this._backgroundGradient!==t&&(this._backgroundGradient=t,this._markAsDirty())}get children(){return this._children}get isReadOnly(){return this._isReadOnly}set isReadOnly(t){this._isReadOnly=t;for(const e of this._children)e.isReadOnly=t}constructor(t){super(t),this.name=t,this._children=new Array,this._measureForChildren=st.Empty(),this._background="",this._backgroundGradient=null,this._adaptWidthToChildren=!1,this._adaptHeightToChildren=!1,this._renderToIntermediateTexture=!1,this._intermediateTexture=null,this.logLayoutCycleErrors=!1,this.maxLayoutCycle=3,this.onControlAddedObservable=new x,this.onControlRemovedObservable=new x,this._inverseTransformMatrix=A.Identity(),this._inverseMeasure=new st(0,0,0,0)}_getTypeName(){return"Container"}_flagDescendantsAsMatrixDirty(){for(const t of this.children)t._isClipped=!1,t._markMatrixAsDirty()}getChildByName(t){for(const e of this.children)if(e.name===t)return e;return null}getChildByType(t,e){for(const i of this.children)if(i.typeName===e)return i;return null}containsControl(t){return this.children.indexOf(t)!==-1}addControl(t){return t?this._children.indexOf(t)!==-1?this:(t._link(this._host),t._markAllAsDirty(),this._reOrderControl(t),this._markAsDirty(),this.onControlAddedObservable.notifyObservers(t),this):this}clearControls(){const t=this.children.slice();for(const e of t)this.removeControl(e);return this}removeControl(t){const e=this._children.indexOf(t);return e!==-1&&(this._children.splice(e,1),t.parent=null),t.linkWithMesh(null),this._host&&this._host._cleanControlAfterRemoval(t),this._markAsDirty(),this.onControlRemovedObservable.notifyObservers(t),this}_reOrderControl(t){const e=t.linkedMesh;this.removeControl(t);let i=!1;for(let s=0;s<this._children.length;s++)if(this._children[s].zIndex>t.zIndex){this._children.splice(s,0,t),i=!0;break}i||this._children.push(t),t.parent=this,e&&t.linkWithMesh(e),this._markAsDirty()}_offsetLeft(t){super._offsetLeft(t);for(const e of this._children)e._offsetLeft(t)}_offsetTop(t){super._offsetTop(t);for(const e of this._children)e._offsetTop(t)}_markAllAsDirty(){super._markAllAsDirty();for(let t=0;t<this._children.length;t++)this._children[t]._markAllAsDirty()}_getBackgroundColor(t){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(t):this._background}_localDraw(t){(this._background||this._backgroundGradient)&&(t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),t.fillStyle=this._getBackgroundColor(t),t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height),t.restore())}_link(t){super._link(t);for(const e of this._children)e._link(t)}_beforeLayout(){}_processMeasures(t,e){(this._isDirty||!this._cachedParentMeasure.isEqualsTo(t))&&(super._processMeasures(t,e),this._evaluateClippingState(t),this._renderToIntermediateTexture&&(this._intermediateTexture&&this._host.getScene()!=this._intermediateTexture.getScene()&&(this._intermediateTexture.dispose(),this._intermediateTexture=null),this._intermediateTexture?this._intermediateTexture.scaleTo(this._currentMeasure.width,this._currentMeasure.height):(this._intermediateTexture=new _s("",{width:this._currentMeasure.width,height:this._currentMeasure.height},this._host.getScene(),!1,V.NEAREST_SAMPLINGMODE,Gt.TEXTUREFORMAT_RGBA,!1),this._intermediateTexture.hasAlpha=!0)))}_layout(t,e){var i,s;if(!this.isDirty&&(!this.isVisible||this.notRenderable))return!1;this.host._numLayoutCalls++,this._isDirty&&this._currentMeasure.transformToRef(this._transformMatrix,this._prevCurrentMeasureTransformedIntoGlobalSpace);let o=0;e.save(),this._applyStates(e),this._beforeLayout();do{let r=-1,a=-1;if(this._rebuildLayout=!1,this._processMeasures(t,e),!this._isClipped){for(const _ of this._children)_._tempParentMeasure.copyFrom(this._measureForChildren),_._layout(this._measureForChildren,e)&&_.isVisible&&!_.notRenderable&&(this.adaptWidthToChildren&&_._width.isPixel&&(r=Math.max(r,_._currentMeasure.width+_._paddingLeftInPixels+_._paddingRightInPixels)),this.adaptHeightToChildren&&_._height.isPixel&&(a=Math.max(a,_._currentMeasure.height+_._paddingTopInPixels+_._paddingBottomInPixels)));this.adaptWidthToChildren&&r>=0&&(r+=this.paddingLeftInPixels+this.paddingRightInPixels,this.width!==r+"px"&&((i=this.parent)===null||i===void 0||i._markAsDirty(),this.width=r+"px",this._width.ignoreAdaptiveScaling=!0,this._rebuildLayout=!0)),this.adaptHeightToChildren&&a>=0&&(a+=this.paddingTopInPixels+this.paddingBottomInPixels,this.height!==a+"px"&&((s=this.parent)===null||s===void 0||s._markAsDirty(),this.height=a+"px",this._height.ignoreAdaptiveScaling=!0,this._rebuildLayout=!0)),this._postMeasure()}o++}while(this._rebuildLayout&&o<this.maxLayoutCycle);return o>=3&&this.logLayoutCycleErrors&&Hi.Error(`Layout cycle detected in GUI (Container name=${this.name}, uniqueId=${this.uniqueId})`),e.restore(),this._isDirty&&(this.invalidateRect(),this._isDirty=!1),!0}_postMeasure(){}_draw(t,e){const i=this._renderToIntermediateTexture&&this._intermediateTexture,s=i?this._intermediateTexture.getContext():t;i&&(s.save(),s.translate(-this._currentMeasure.left,-this._currentMeasure.top),e?(this._transformMatrix.invertToRef(this._inverseTransformMatrix),e.transformToRef(this._inverseTransformMatrix,this._inverseMeasure),s.clearRect(this._inverseMeasure.left,this._inverseMeasure.top,this._inverseMeasure.width,this._inverseMeasure.height)):s.clearRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._localDraw(s),t.save(),this.clipChildren&&this._clipForChildren(s);for(const o of this._children)e&&!o._intersectsRect(e)||o._render(s,e);i&&(s.restore(),t.save(),t.globalAlpha=this.alpha,t.drawImage(s.canvas,this._currentMeasure.left,this._currentMeasure.top),t.restore()),t.restore()}getDescendantsToRef(t,e=!1,i){if(this.children)for(let s=0;s<this.children.length;s++){const o=this.children[s];(!i||i(o))&&t.push(o),e||o.getDescendantsToRef(t,!1,i)}}_processPicking(t,e,i,s,o,r,a,_){if(!this._isEnabled||!this.isVisible||this.notRenderable)return!1;const h=super.contains(t,e);if(!h&&this.clipChildren)return!1;for(let d=this._children.length-1;d>=0;d--){const u=this._children[d];if(u._processPicking(t,e,i,s,o,r,a,_))return u.hoverCursor&&this._host._changeCursor(u.hoverCursor),!0}return!h||!this.isHitTestVisible?!1:this._processObservables(s,t,e,i,o,r,a,_)}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._measureForChildren.copyFrom(this._currentMeasure)}serialize(t){if(super.serialize(t),this.backgroundGradient&&(t.backgroundGradient={},this.backgroundGradient.serialize(t.backgroundGradient)),!!this.children.length){t.children=[];for(const e of this.children){const i={};e.serialize(i),t.children.push(i)}}}dispose(){var t;super.dispose();for(let e=this.children.length-1;e>=0;e--)this.children[e].dispose();(t=this._intermediateTexture)===null||t===void 0||t.dispose()}_parseFromContent(t,e){var i;if(super._parseFromContent(t,e),this._link(e),t.backgroundGradient){const s=_t.Instantiate("BABYLON.GUI."+t.backgroundGradient.className);this._backgroundGradient=new s,(i=this._backgroundGradient)===null||i===void 0||i.parse(t.backgroundGradient)}if(t.children)for(const s of t.children)this.addControl(f.Parse(s,e))}isReady(){for(const t of this.children)if(!t.isReady())return!1;return!0}}n([l()],yt.prototype,"renderToIntermediateTexture",null);n([l()],yt.prototype,"maxLayoutCycle",void 0);n([l()],yt.prototype,"adaptHeightToChildren",null);n([l()],yt.prototype,"adaptWidthToChildren",null);n([l()],yt.prototype,"background",null);n([l()],yt.prototype,"backgroundGradient",null);k("BABYLON.GUI.Container",yt);class gt extends yt{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get cornerRadius(){return this._cornerRadius[0]}set cornerRadius(t){t<0&&(t=0),!(this._cornerRadius[0]===t&&this._cornerRadius[1]===t&&this._cornerRadius[2]===t&&this._cornerRadius[3]===t)&&(this._cornerRadius[0]=this._cornerRadius[1]=this._cornerRadius[2]=this._cornerRadius[3]=t,this._markAsDirty())}get cornerRadiusX(){return this._cornerRadius[0]}set cornerRadiusX(t){this._cornerRadius[0]!==t&&(this._cornerRadius[0]=t)}get cornerRadiusY(){return this._cornerRadius[1]}set cornerRadiusY(t){this._cornerRadius[1]!==t&&(this._cornerRadius[1]=t)}get cornerRadiusZ(){return this._cornerRadius[2]}set cornerRadiusZ(t){this._cornerRadius[2]!==t&&(this._cornerRadius[2]=t)}get cornerRadiusW(){return this._cornerRadius[3]}set cornerRadiusW(t){this._cornerRadius[3]!==t&&(this._cornerRadius[3]=t)}constructor(t){super(t),this.name=t,this._thickness=1,this._cornerRadius=[0,0,0,0],this._cachedRadius=[0,0,0,0]}_getTypeName(){return"Rectangle"}_computeAdditionnalOffsetX(){return this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?1:0}_computeAdditionnalOffsetY(){return this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?1:0}_getRectangleFill(t){return this._getBackgroundColor(t)}_localDraw(t){t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),(this._background||this._backgroundGradient)&&(t.fillStyle=this._getRectangleFill(t),this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?(this._drawRoundedRect(t,this._thickness/2),t.fill()):t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._thickness&&((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),(this.color||this.gradient)&&(t.strokeStyle=this.gradient?this.gradient.getCanvasGradient(t):this.color),t.lineWidth=this._thickness,this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?(this._drawRoundedRect(t,this._thickness/2),t.stroke()):t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness)),t.restore()}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._measureForChildren.width-=2*this._thickness,this._measureForChildren.height-=2*this._thickness,this._measureForChildren.left+=this._thickness,this._measureForChildren.top+=this._thickness}_drawRoundedRect(t,e=0){const i=this._currentMeasure.left+e,s=this._currentMeasure.top+e,o=this._currentMeasure.width-e*2,r=this._currentMeasure.height-e*2;for(let a=0;a<this._cornerRadius.length;a++)this._cachedRadius[a]=Math.abs(Math.min(r/2,Math.min(o/2,this._cornerRadius[a])));t.beginPath(),t.moveTo(i+this._cachedRadius[0],s),t.lineTo(i+o-this._cachedRadius[1],s),t.arc(i+o-this._cachedRadius[1],s+this._cachedRadius[1],this._cachedRadius[1],3*Math.PI/2,Math.PI*2),t.lineTo(i+o,s+r-this._cachedRadius[2]),t.arc(i+o-this._cachedRadius[2],s+r-this._cachedRadius[2],this._cachedRadius[2],0,Math.PI/2),t.lineTo(i+this._cachedRadius[3],s+r),t.arc(i+this._cachedRadius[3],s+r-this._cachedRadius[3],this._cachedRadius[3],Math.PI/2,Math.PI),t.lineTo(i,s+this._cachedRadius[0]),t.arc(i+this._cachedRadius[0],s+this._cachedRadius[0],this._cachedRadius[0],Math.PI,3*Math.PI/2),t.closePath()}_clipForChildren(t){(this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0)&&(this._drawRoundedRect(t,this._thickness),t.clip())}}n([l()],gt.prototype,"thickness",null);n([l()],gt.prototype,"cornerRadius",null);n([l()],gt.prototype,"cornerRadiusX",null);n([l()],gt.prototype,"cornerRadiusY",null);n([l()],gt.prototype,"cornerRadiusZ",null);n([l()],gt.prototype,"cornerRadiusW",null);k("BABYLON.GUI.Rectangle",gt);var oe;(function(g){g[g.Clip=0]="Clip",g[g.WordWrap=1]="WordWrap",g[g.Ellipsis=2]="Ellipsis",g[g.WordWrapEllipsis=3]="WordWrapEllipsis"})(oe||(oe={}));class U extends f{get lines(){return this._lines}get resizeToFit(){return this._resizeToFit}set resizeToFit(t){this._resizeToFit!==t&&(this._resizeToFit=t,this._resizeToFit&&(this._width.ignoreAdaptiveScaling=!0,this._height.ignoreAdaptiveScaling=!0),this._markAsDirty())}get textWrapping(){return this._textWrapping}set textWrapping(t){this._textWrapping!==t&&(this._textWrapping=+t,this._markAsDirty())}get text(){return this._text}set text(t){this._text!==t&&(this._text=t+"",this._markAsDirty(),this.onTextChangedObservable.notifyObservers(this))}get textHorizontalAlignment(){return this._textHorizontalAlignment}set textHorizontalAlignment(t){this._textHorizontalAlignment!==t&&(this._textHorizontalAlignment=t,this._markAsDirty())}get textVerticalAlignment(){return this._textVerticalAlignment}set textVerticalAlignment(t){this._textVerticalAlignment!==t&&(this._textVerticalAlignment=t,this._markAsDirty())}set lineSpacing(t){this._lineSpacing.fromString(t)&&this._markAsDirty()}get lineSpacing(){return this._lineSpacing.toString(this._host)}get outlineWidth(){return this._outlineWidth}set outlineWidth(t){this._outlineWidth!==t&&(this._outlineWidth=t,this._markAsDirty())}get underline(){return this._underline}set underline(t){this._underline!==t&&(this._underline=t,this._markAsDirty())}get lineThrough(){return this._lineThrough}set lineThrough(t){this._lineThrough!==t&&(this._lineThrough=t,this._markAsDirty())}get applyOutlineToUnderline(){return this._applyOutlineToUnderline}set applyOutlineToUnderline(t){this._applyOutlineToUnderline!==t&&(this._applyOutlineToUnderline=t,this._markAsDirty())}get outlineColor(){return this._outlineColor}set outlineColor(t){this._outlineColor!==t&&(this._outlineColor=t,this._markAsDirty())}get wordDivider(){return this._wordDivider}set wordDivider(t){this._wordDivider!==t&&(this._wordDivider=t,this._markAsDirty())}get forceResizeWidth(){return this._forceResizeWidth}set forceResizeWidth(t){this._forceResizeWidth!==t&&(this._forceResizeWidth=t,this._markAsDirty())}constructor(t,e=""){super(t),this.name=t,this._text="",this._textWrapping=oe.Clip,this._textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,this._textVerticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,this._resizeToFit=!1,this._lineSpacing=new R(0),this._outlineWidth=0,this._outlineColor="white",this._underline=!1,this._lineThrough=!1,this._wordDivider=" ",this._forceResizeWidth=!1,this._applyOutlineToUnderline=!1,this.onTextChangedObservable=new x,this.onLinesReadyObservable=new x,this._linesTemp=[],this.text=e}_getTypeName(){return"TextBlock"}_processMeasures(t,e){(!this._fontOffset||this.isDirty)&&(this._fontOffset=f._GetFontOffset(e.font)),super._processMeasures(t,e),this._lines=this._breakLines(this._currentMeasure.width,this._currentMeasure.height,e),this.onLinesReadyObservable.notifyObservers(this);let i=0;for(let s=0;s<this._lines.length;s++){const o=this._lines[s];o.width>i&&(i=o.width)}if(this._resizeToFit){if(this._textWrapping===oe.Clip||this._forceResizeWidth){const o=Math.ceil(this._paddingLeftInPixels)+Math.ceil(this._paddingRightInPixels)+Math.ceil(i);o!==this._width.getValueInPixel(this._host,this._tempParentMeasure.width)&&(this._width.updateInPlace(o,R.UNITMODE_PIXEL),this._rebuildLayout=!0)}let s=this._paddingTopInPixels+this._paddingBottomInPixels+this._fontOffset.height*this._lines.length|0;if(this._lines.length>0&&this._lineSpacing.internalValue!==0){let o=0;this._lineSpacing.isPixel?o=this._lineSpacing.getValue(this._host):o=this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height),s+=(this._lines.length-1)*o}s!==this._height.internalValue&&(this._height.updateInPlace(s,R.UNITMODE_PIXEL),this._rebuildLayout=!0)}}_drawText(t,e,i,s){const o=this._currentMeasure.width;let r=0;switch(this._textHorizontalAlignment){case f.HORIZONTAL_ALIGNMENT_LEFT:r=0;break;case f.HORIZONTAL_ALIGNMENT_RIGHT:r=o-e;break;case f.HORIZONTAL_ALIGNMENT_CENTER:r=(o-e)/2;break}(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(s.shadowColor=this.shadowColor,s.shadowBlur=this.shadowBlur,s.shadowOffsetX=this.shadowOffsetX,s.shadowOffsetY=this.shadowOffsetY),this.outlineWidth&&s.strokeText(t,this._currentMeasure.left+r,i),s.fillText(t,this._currentMeasure.left+r,i),this._underline&&this._drawLine(this._currentMeasure.left+r,i+3,this._currentMeasure.left+r+e,i+3,s),this._lineThrough&&this._drawLine(this._currentMeasure.left+r,i-this.fontSizeInPixels/3,this._currentMeasure.left+r+e,i-this.fontSizeInPixels/3,s)}_drawLine(t,e,i,s,o){if(o.beginPath(),o.lineWidth=Math.round(this.fontSizeInPixels*.05),o.moveTo(t,e),o.lineTo(i,s),this.outlineWidth&&this.applyOutlineToUnderline)o.stroke(),o.fill();else{const r=o.strokeStyle;o.strokeStyle=o.fillStyle,o.stroke(),o.strokeStyle=r}o.closePath()}_draw(t){t.save(),this._applyStates(t),this._renderLines(t),t.restore()}_applyStates(t){super._applyStates(t),this.outlineWidth&&(t.lineWidth=this.outlineWidth,t.strokeStyle=this.outlineColor,t.lineJoin="miter",t.miterLimit=2)}_breakLines(t,e,i){this._linesTemp.length=0;const s=this.text.split(`
`);if(this._textWrapping===oe.Ellipsis)for(const o of s)this._linesTemp.push(this._parseLineEllipsis(o,t,i));else if(this._textWrapping===oe.WordWrap)for(const o of s)this._linesTemp.push(...this._parseLineWordWrap(o,t,i));else if(this._textWrapping===oe.WordWrapEllipsis)for(const o of s)this._linesTemp.push(...this._parseLineWordWrapEllipsis(o,t,e,i));else for(const o of s)this._linesTemp.push(this._parseLine(o,i));return this._linesTemp}_parseLine(t="",e){return{text:t,width:this._getTextMetricsWidth(e.measureText(t))}}_getCharsToRemove(t,e,i){const s=t>e?t-e:0,o=t/i;return Math.max(Math.floor(s/o),1)}_parseLineEllipsis(t="",e,i){let s=this._getTextMetricsWidth(i.measureText(t)),o=this._getCharsToRemove(s,e,t.length);const r=Array.from&&Array.from(t);if(r)for(;r.length&&s>e;)r.splice(r.length-o,o),t=`${r.join("")}…`,s=this._getTextMetricsWidth(i.measureText(t)),o=this._getCharsToRemove(s,e,t.length);else{for(;t.length>2&&s>e;)t=t.slice(0,-o),s=this._getTextMetricsWidth(i.measureText(t+"…")),o=this._getCharsToRemove(s,e,t.length);t+="…"}return{text:t,width:s}}_getTextMetricsWidth(t){return t.actualBoundingBoxLeft!==void 0?Math.abs(t.actualBoundingBoxLeft)+Math.abs(t.actualBoundingBoxRight):t.width}_parseLineWordWrap(t="",e,i){const s=[],o=this.wordSplittingFunction?this.wordSplittingFunction(t):t.split(this._wordDivider);let r=this._getTextMetricsWidth(i.measureText(t));for(let a=0;a<o.length;a++){const _=a>0?t+this._wordDivider+o[a]:o[0],h=this._getTextMetricsWidth(i.measureText(_));h>e&&a>0?(s.push({text:t,width:r}),t=o[a],r=this._getTextMetricsWidth(i.measureText(t))):(r=h,t=_)}return s.push({text:t,width:r}),s}_parseLineWordWrapEllipsis(t="",e,i,s){const o=this._parseLineWordWrap(t,e,s);for(let r=1;r<=o.length;r++)if(this._computeHeightForLinesOf(r)>i&&r>1){const _=o[r-2],h=o[r-1];o[r-2]=this._parseLineEllipsis(_.text+this._wordDivider+h.text,e,s);const d=o.length-r+1;for(let u=0;u<d;u++)o.pop();return o}return o}_renderLines(t){if(!this._fontOffset||!this._lines)return;const e=this._currentMeasure.height;let i=0;switch(this._textVerticalAlignment){case f.VERTICAL_ALIGNMENT_TOP:i=this._fontOffset.ascent;break;case f.VERTICAL_ALIGNMENT_BOTTOM:i=e-this._fontOffset.height*(this._lines.length-1)-this._fontOffset.descent;break;case f.VERTICAL_ALIGNMENT_CENTER:i=this._fontOffset.ascent+(e-this._fontOffset.height*this._lines.length)/2;break}i+=this._currentMeasure.top;for(let s=0;s<this._lines.length;s++){const o=this._lines[s];s!==0&&this._lineSpacing.internalValue!==0&&(this._lineSpacing.isPixel?i+=this._lineSpacing.getValue(this._host):i=i+this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)),this._drawText(o.text,o.width,i,t),i+=this._fontOffset.height}}_computeHeightForLinesOf(t){let e=this._paddingTopInPixels+this._paddingBottomInPixels+this._fontOffset.height*t;if(t>0&&this._lineSpacing.internalValue!==0){let i=0;this._lineSpacing.isPixel?i=this._lineSpacing.getValue(this._host):i=this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height),e+=(t-1)*i}return e}computeExpectedHeight(){var t;if(this.text&&this.widthInPixels){const e=(t=Ht.LastCreatedEngine)===null||t===void 0?void 0:t.createCanvas(0,0).getContext("2d");if(e){this._applyStates(e),this._fontOffset||(this._fontOffset=f._GetFontOffset(e.font));const i=this._lines?this._lines:this._breakLines(this.widthInPixels-this._paddingLeftInPixels-this._paddingRightInPixels,this.heightInPixels-this._paddingTopInPixels-this._paddingBottomInPixels,e);return this._computeHeightForLinesOf(i.length)}}return 0}dispose(){super.dispose(),this.onTextChangedObservable.clear()}}n([l()],U.prototype,"resizeToFit",null);n([l()],U.prototype,"textWrapping",null);n([l()],U.prototype,"text",null);n([l()],U.prototype,"textHorizontalAlignment",null);n([l()],U.prototype,"textVerticalAlignment",null);n([l()],U.prototype,"lineSpacing",null);n([l()],U.prototype,"outlineWidth",null);n([l()],U.prototype,"underline",null);n([l()],U.prototype,"lineThrough",null);n([l()],U.prototype,"applyOutlineToUnderline",null);n([l()],U.prototype,"outlineColor",null);n([l()],U.prototype,"wordDivider",null);n([l()],U.prototype,"forceResizeWidth",null);k("BABYLON.GUI.TextBlock",U);class C extends f{get isLoaded(){return this._loaded}isReady(){return this.isLoaded}get detectPointerOnOpaqueOnly(){return this._detectPointerOnOpaqueOnly}set detectPointerOnOpaqueOnly(t){this._detectPointerOnOpaqueOnly!==t&&(this._detectPointerOnOpaqueOnly=t)}get sliceLeft(){return this._sliceLeft}set sliceLeft(t){this._sliceLeft!==t&&(this._sliceLeft=t,this._markAsDirty())}get sliceRight(){return this._sliceRight}set sliceRight(t){this._sliceRight!==t&&(this._sliceRight=t,this._markAsDirty())}get sliceTop(){return this._sliceTop}set sliceTop(t){this._sliceTop!==t&&(this._sliceTop=t,this._markAsDirty())}get sliceBottom(){return this._sliceBottom}set sliceBottom(t){this._sliceBottom!==t&&(this._sliceBottom=t,this._markAsDirty())}get sourceLeft(){return this._sourceLeft}set sourceLeft(t){this._sourceLeft!==t&&(this._sourceLeft=t,this._markAsDirty())}get sourceTop(){return this._sourceTop}set sourceTop(t){this._sourceTop!==t&&(this._sourceTop=t,this._markAsDirty())}get sourceWidth(){return this._sourceWidth}set sourceWidth(t){this._sourceWidth!==t&&(this._sourceWidth=t,this._markAsDirty())}get sourceHeight(){return this._sourceHeight}set sourceHeight(t){this._sourceHeight!==t&&(this._sourceHeight=t,this._markAsDirty())}get imageWidth(){return this._imageWidth}get imageHeight(){return this._imageHeight}get populateNinePatchSlicesFromImage(){return this._populateNinePatchSlicesFromImage}set populateNinePatchSlicesFromImage(t){this._populateNinePatchSlicesFromImage!==t&&(this._populateNinePatchSlicesFromImage=t,this._populateNinePatchSlicesFromImage&&this._loaded&&this._extractNinePatchSliceDataFromImage())}get isSVG(){return this._isSVG}get svgAttributesComputationCompleted(){return this._svgAttributesComputationCompleted}get autoScale(){return this._autoScale}set autoScale(t){this._autoScale!==t&&(this._autoScale=t,t&&this._loaded&&this.synchronizeSizeWithContent())}get stretch(){return this._stretch}set stretch(t){this._stretch!==t&&(this._stretch=t,this._markAsDirty())}_rotate90(t,e=!1){var i,s;const o=this._domImage.width,r=this._domImage.height,a=((s=(i=this._host)===null||i===void 0?void 0:i.getScene())===null||s===void 0?void 0:s.getEngine())||Ht.LastCreatedEngine;if(!a)throw new Error("Invalid engine. Unable to create a canvas.");const _=a.createCanvas(r,o),h=_.getContext("2d");h.translate(_.width/2,_.height/2),h.rotate(t*Math.PI/2),h.drawImage(this._domImage,0,0,o,r,-o/2,-r/2,o,r);const d=_.toDataURL("image/jpg"),u=new C(this.name+"rotated",d);return e&&(u._stretch=this._stretch,u._autoScale=this._autoScale,u._cellId=this._cellId,u._cellWidth=t%1?this._cellHeight:this._cellWidth,u._cellHeight=t%1?this._cellWidth:this._cellHeight),this._handleRotationForSVGImage(this,u,t),this._imageDataCache.data=null,u}_handleRotationForSVGImage(t,e,i){t._isSVG&&(t._svgAttributesComputationCompleted?(this._rotate90SourceProperties(t,e,i),this._markAsDirty()):t.onSVGAttributesComputedObservable.addOnce(()=>{this._rotate90SourceProperties(t,e,i),this._markAsDirty()}))}_rotate90SourceProperties(t,e,i){let s=t.sourceLeft,o=t.sourceTop,r=t.domImage.width,a=t.domImage.height,_=s,h=o,d=t.sourceWidth,u=t.sourceHeight;if(i!=0){const m=i<0?-1:1;i=i%4;for(let b=0;b<Math.abs(i);++b)_=-(o-a/2)*m+a/2,h=(s-r/2)*m+r/2,[d,u]=[u,d],i<0?h-=u:_-=d,s=_,o=h,[r,a]=[a,r]}e.sourceLeft=_,e.sourceTop=h,e.sourceWidth=d,e.sourceHeight=u}_extractNinePatchSliceDataFromImage(){var t,e;const i=this._domImage.width,s=this._domImage.height;if(!this._workingCanvas){const _=((e=(t=this._host)===null||t===void 0?void 0:t.getScene())===null||e===void 0?void 0:e.getEngine())||Ht.LastCreatedEngine;if(!_)throw new Error("Invalid engine. Unable to create a canvas.");this._workingCanvas=_.createCanvas(i,s)}const r=this._workingCanvas.getContext("2d");r.drawImage(this._domImage,0,0,i,s);const a=r.getImageData(0,0,i,s);this._sliceLeft=-1,this._sliceRight=-1;for(let _=0;_<i;_++){const h=a.data[_*4+3];if(h>127&&this._sliceLeft===-1){this._sliceLeft=_;continue}if(h<127&&this._sliceLeft>-1){this._sliceRight=_;break}}this._sliceTop=-1,this._sliceBottom=-1;for(let _=0;_<s;_++){const h=a.data[_*i*4+3];if(h>127&&this._sliceTop===-1){this._sliceTop=_;continue}if(h<127&&this._sliceTop>-1){this._sliceBottom=_;break}}}set domImage(t){this._domImage=t,this._loaded=!1,this._imageDataCache.data=null,this._domImage.width?this._onImageLoaded():this._domImage.onload=()=>{this._onImageLoaded()}}get domImage(){return this._domImage}_onImageLoaded(){this._imageDataCache.data=null,this._imageWidth=this._domImage.width,this._imageHeight=this._domImage.height,this._loaded=!0,this._populateNinePatchSlicesFromImage&&this._extractNinePatchSliceDataFromImage(),this._autoScale&&this.synchronizeSizeWithContent(),this.onImageLoadedObservable.notifyObservers(this),this._markAsDirty()}get source(){return this._source}static ResetImageCache(){C.SourceImgCache.clear()}_removeCacheUsage(t){const e=t&&C.SourceImgCache.get(t);e&&(e.timesUsed-=1,e.timesUsed===0&&C.SourceImgCache.delete(t))}set source(t){var e,i;if(this._source===t)return;this._removeCacheUsage(this._source),this._loaded=!1,this._source=t,this._imageDataCache.data=null,t&&(t=this._svgCheck(t));const s=((i=(e=this._host)===null||e===void 0?void 0:e.getScene())===null||i===void 0?void 0:i.getEngine())||Ht.LastCreatedEngine;if(!s)throw new Error("Invalid engine. Unable to create a canvas.");if(t&&C.SourceImgCache.has(t)){const o=C.SourceImgCache.get(t);this._domImage=o.img,o.timesUsed+=1,o.loaded?this._onImageLoaded():o.waitingForLoadCallback.push(this._onImageLoaded.bind(this));return}this._domImage=s.createCanvasImage(),t&&C.SourceImgCache.set(t,{img:this._domImage,timesUsed:1,loaded:!1,waitingForLoadCallback:[this._onImageLoaded.bind(this)]}),this._domImage.onload=()=>{if(t){const o=C.SourceImgCache.get(t);if(o){o.loaded=!0;for(const r of o.waitingForLoadCallback)r();o.waitingForLoadCallback.length=0;return}}this._onImageLoaded()},t&&(_t.SetCorsBehavior(t,this._domImage),_t.SetReferrerPolicyBehavior(this.referrerPolicy,this._domImage),this._domImage.src=t)}_svgCheck(t){if(window.SVGSVGElement&&t.search(/.svg#/gi)!==-1&&t.indexOf("#")===t.lastIndexOf("#")){this._isSVG=!0;const e=t.split("#")[0],i=t.split("#")[1],s=document.body.querySelector('object[data="'+e+'"]');if(s){const o=s.contentDocument;if(o&&o.documentElement){const r=o.documentElement.getAttribute("viewBox"),a=Number(o.documentElement.getAttribute("width")),_=Number(o.documentElement.getAttribute("height"));if(o.getElementById(i)&&r&&a&&_)return this._getSVGAttribs(s,i),t}s.addEventListener("load",()=>{this._getSVGAttribs(s,i)})}else{const o=document.createElement("object");o.data=e,o.type="image/svg+xml",o.width="0%",o.height="0%",document.body.appendChild(o),o.onload=()=>{const r=document.body.querySelector('object[data="'+e+'"]');r&&this._getSVGAttribs(r,i)}}return e}else return t}_getSVGAttribs(t,e){const i=t.contentDocument;if(i&&i.documentElement){const s=i.documentElement.getAttribute("viewBox"),o=Number(i.documentElement.getAttribute("width")),r=Number(i.documentElement.getAttribute("height")),a=i.getElementById(e);if(s&&o&&r&&a){const _=Number(s.split(" ")[2]),h=Number(s.split(" ")[3]),d=a.getBBox();let u=1,m=1,b=0,w=0;const ut=a.transform.baseVal.consolidate().matrix;a.transform&&a.transform.baseVal.consolidate()&&(u=ut.a,m=ut.d,b=ut.e,w=ut.f),this.sourceLeft=(u*d.x+b)*o/_,this.sourceTop=(m*d.y+w)*r/h,this.sourceWidth=d.width*u*(o/_),this.sourceHeight=d.height*m*(r/h),this._svgAttributesComputationCompleted=!0,this.onSVGAttributesComputedObservable.notifyObservers(this)}}}get cellWidth(){return this._cellWidth}set cellWidth(t){this._cellWidth!==t&&(this._cellWidth=t,this._markAsDirty())}get cellHeight(){return this._cellHeight}set cellHeight(t){this._cellHeight!==t&&(this._cellHeight=t,this._markAsDirty())}get cellId(){return this._cellId}set cellId(t){this._cellId!==t&&(this._cellId=t,this._markAsDirty())}constructor(t,e=null){super(t),this.name=t,this._workingCanvas=null,this._loaded=!1,this._stretch=C.STRETCH_FILL,this._autoScale=!1,this._sourceLeft=0,this._sourceTop=0,this._sourceWidth=0,this._sourceHeight=0,this._svgAttributesComputationCompleted=!1,this._isSVG=!1,this._cellWidth=0,this._cellHeight=0,this._cellId=-1,this._populateNinePatchSlicesFromImage=!1,this._imageDataCache={data:null,key:""},this.onImageLoadedObservable=new x,this.onSVGAttributesComputedObservable=new x,this.source=e}contains(t,e){if(!super.contains(t,e))return!1;if(!this._detectPointerOnOpaqueOnly||!this._workingCanvas)return!0;const i=this._currentMeasure.width|0,s=this._currentMeasure.height|0,o=i+"_"+s;let r=this._imageDataCache.data;if(!r||this._imageDataCache.key!==o){const h=this._workingCanvas.getContext("2d");this._imageDataCache.data=r=h.getImageData(0,0,i,s).data,this._imageDataCache.key=o}return t=t-this._currentMeasure.left|0,e=e-this._currentMeasure.top|0,r[(t+e*i)*4+3]>0}_getTypeName(){return"Image"}synchronizeSizeWithContent(){this._loaded&&(this.width=this._domImage.width+"px",this.height=this._domImage.height+"px")}_processMeasures(t,e){if(this._loaded)switch(this._stretch){case C.STRETCH_NONE:break;case C.STRETCH_FILL:break;case C.STRETCH_UNIFORM:break;case C.STRETCH_NINE_PATCH:break;case C.STRETCH_EXTEND:this._autoScale&&this.synchronizeSizeWithContent(),this.parent&&this.parent.parent&&(this.parent.adaptWidthToChildren=!0,this.parent.adaptHeightToChildren=!0);break}super._processMeasures(t,e)}_prepareWorkingCanvasForOpaqueDetection(){var t,e;if(!this._detectPointerOnOpaqueOnly)return;const i=this._currentMeasure.width,s=this._currentMeasure.height;if(!this._workingCanvas){const a=((e=(t=this._host)===null||t===void 0?void 0:t.getScene())===null||e===void 0?void 0:e.getEngine())||Ht.LastCreatedEngine;if(!a)throw new Error("Invalid engine. Unable to create a canvas.");this._workingCanvas=a.createCanvas(i,s)}this._workingCanvas.getContext("2d").clearRect(0,0,i,s)}_drawImage(t,e,i,s,o,r,a,_,h){if(t.drawImage(this._domImage,e,i,s,o,r,a,_,h),!this._detectPointerOnOpaqueOnly)return;t=this._workingCanvas.getContext("2d"),t.drawImage(this._domImage,e,i,s,o,r-this._currentMeasure.left,a-this._currentMeasure.top,_,h)}_draw(t){t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY);let e,i,s,o;if(this.cellId==-1)e=this._sourceLeft,i=this._sourceTop,s=this._sourceWidth?this._sourceWidth:this._imageWidth,o=this._sourceHeight?this._sourceHeight:this._imageHeight;else{const r=this._domImage.naturalWidth/this.cellWidth,a=this.cellId/r>>0,_=this.cellId%r;e=this.cellWidth*_,i=this.cellHeight*a,s=this.cellWidth,o=this.cellHeight}if(this._prepareWorkingCanvasForOpaqueDetection(),this._applyStates(t),this._loaded)switch(this._stretch){case C.STRETCH_NONE:this._drawImage(t,e,i,s,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case C.STRETCH_FILL:this._drawImage(t,e,i,s,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case C.STRETCH_UNIFORM:{const r=this._currentMeasure.width/s,a=this._currentMeasure.height/o,_=Math.min(r,a),h=(this._currentMeasure.width-s*_)/2,d=(this._currentMeasure.height-o*_)/2;this._drawImage(t,e,i,s,o,this._currentMeasure.left+h,this._currentMeasure.top+d,s*_,o*_);break}case C.STRETCH_EXTEND:this._drawImage(t,e,i,s,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case C.STRETCH_NINE_PATCH:this._renderNinePatch(t);break}t.restore()}_renderNinePatch(t){const e=this._sliceLeft,i=this._sliceTop,s=this._imageHeight-this._sliceBottom,o=this._imageWidth-this._sliceRight,r=this._sliceRight-this._sliceLeft,a=this._sliceBottom-this._sliceTop,_=this._currentMeasure.width-o-e+2,h=this._currentMeasure.height-s-i+2,d=this._currentMeasure.left+e-1,u=this._currentMeasure.top+i-1,m=this._currentMeasure.left+this._currentMeasure.width-o,b=this._currentMeasure.top+this._currentMeasure.height-s;this._drawImage(t,0,0,e,i,this._currentMeasure.left,this._currentMeasure.top,e,i),t.clearRect(d,this._currentMeasure.top,_,i),this._drawImage(t,this._sliceLeft,0,r,i,d,this._currentMeasure.top,_,i),t.clearRect(m,this._currentMeasure.top,o,i),this._drawImage(t,this._sliceRight,0,o,i,m,this._currentMeasure.top,o,i),t.clearRect(this._currentMeasure.left,u,e,h),this._drawImage(t,0,this._sliceTop,e,a,this._currentMeasure.left,u,e,h),t.clearRect(d,u,_,h),this._drawImage(t,this._sliceLeft,this._sliceTop,r,a,d,u,_,h),t.clearRect(m,u,o,h),this._drawImage(t,this._sliceRight,this._sliceTop,o,a,m,u,o,h),t.clearRect(this._currentMeasure.left,b,e,s),this._drawImage(t,0,this._sliceBottom,e,s,this._currentMeasure.left,b,e,s),t.clearRect(d,b,_,s),this._drawImage(t,this.sliceLeft,this._sliceBottom,r,s,d,b,_,s),t.clearRect(m,b,o,s),this._drawImage(t,this._sliceRight,this._sliceBottom,o,s,m,b,o,s)}dispose(){super.dispose(),this.onImageLoadedObservable.clear(),this.onSVGAttributesComputedObservable.clear(),this._removeCacheUsage(this._source)}}C.SourceImgCache=new Map;C.STRETCH_NONE=0;C.STRETCH_FILL=1;C.STRETCH_UNIFORM=2;C.STRETCH_EXTEND=3;C.STRETCH_NINE_PATCH=4;n([l()],C.prototype,"detectPointerOnOpaqueOnly",null);n([l()],C.prototype,"sliceLeft",null);n([l()],C.prototype,"sliceRight",null);n([l()],C.prototype,"sliceTop",null);n([l()],C.prototype,"sliceBottom",null);n([l()],C.prototype,"sourceLeft",null);n([l()],C.prototype,"sourceTop",null);n([l()],C.prototype,"sourceWidth",null);n([l()],C.prototype,"sourceHeight",null);n([l()],C.prototype,"populateNinePatchSlicesFromImage",null);n([l()],C.prototype,"autoScale",null);n([l()],C.prototype,"stretch",null);n([l()],C.prototype,"source",null);n([l()],C.prototype,"cellWidth",null);n([l()],C.prototype,"cellHeight",null);n([l()],C.prototype,"cellId",null);k("BABYLON.GUI.Image",C);class qt extends gt{get image(){return this._image}get textBlock(){return this._textBlock}constructor(t){super(t),this.name=t,this.delegatePickingToChildren=!1,this.thickness=1,this.isPointerBlocker=!0;let e=null;this.pointerEnterAnimation=()=>{e=this.alpha,this.alpha-=.1},this.pointerOutAnimation=()=>{e!==null&&(this.alpha=e)},this.pointerDownAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05}}_getTypeName(){return"Button"}_processPicking(t,e,i,s,o,r,a,_){if(!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this.notRenderable||!super.contains(t,e))return!1;if(this.delegatePickingToChildren){let h=!1;for(let d=this._children.length-1;d>=0;d--){const u=this._children[d];if(u.isEnabled&&u.isHitTestVisible&&u.isVisible&&!u.notRenderable&&u.contains(t,e)){h=!0;break}}if(!h)return!1}return this._processObservables(s,t,e,i,o,r,a,_),!0}_onPointerEnter(t,e){return super._onPointerEnter(t,e)?(!this.isReadOnly&&this.pointerEnterAnimation&&this.pointerEnterAnimation(),!0):!1}_onPointerOut(t,e,i=!1){!this.isReadOnly&&this.pointerOutAnimation&&this.pointerOutAnimation(),super._onPointerOut(t,e,i)}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(!this.isReadOnly&&this.pointerDownAnimation&&this.pointerDownAnimation(),!0):!1}_getRectangleFill(t){return this.isEnabled?this._getBackgroundColor(t):this._disabledColor}_onPointerUp(t,e,i,s,o,r){!this.isReadOnly&&this.pointerUpAnimation&&this.pointerUpAnimation(),super._onPointerUp(t,e,i,s,o,r)}serialize(t){super.serialize(t),this._textBlock&&(t.textBlockName=this._textBlock.name),this._image&&(t.imageName=this._image.name)}_parseFromContent(t,e){super._parseFromContent(t,e),t.textBlockName&&(this._textBlock=this.getChildByName(t.textBlockName)),t.imageName&&(this._image=this.getChildByName(t.imageName))}static CreateImageButton(t,e,i){const s=new this(t),o=new U(t+"_button",e);o.textWrapping=!0,o.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,o.paddingLeft="20%",s.addControl(o);const r=new C(t+"_icon",i);return r.width="20%",r.stretch=C.STRETCH_UNIFORM,r.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,s.addControl(r),s._image=r,s._textBlock=o,s}static CreateImageOnlyButton(t,e){const i=new this(t),s=new C(t+"_icon",e);return s.stretch=C.STRETCH_FILL,s.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,i.addControl(s),i._image=s,i}static CreateSimpleButton(t,e){const i=new this(t),s=new U(t+"_button",e);return s.textWrapping=!0,s.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,i.addControl(s),i._textBlock=s,i}static CreateImageWithCenterTextButton(t,e,i){const s=new this(t),o=new C(t+"_icon",i);o.stretch=C.STRETCH_FILL,s.addControl(o);const r=new U(t+"_button",e);return r.textWrapping=!0,r.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,s.addControl(r),s._image=o,s._textBlock=r,s}}k("BABYLON.GUI.Button",qt);class Ot extends yt{get isVertical(){return this._isVertical}set isVertical(t){this._isVertical!==t&&(this._isVertical=t,this._markAsDirty())}get spacing(){return this._spacing}set spacing(t){this._spacing!==t&&(this._spacing=t,this._markAsDirty())}set width(t){this._doNotTrackManualChanges||(this._manualWidth=!0),this._width.toString(this._host)!==t&&this._width.fromString(t)&&this._markAsDirty()}get width(){return this._width.toString(this._host)}set height(t){this._doNotTrackManualChanges||(this._manualHeight=!0),this._height.toString(this._host)!==t&&this._height.fromString(t)&&this._markAsDirty()}get height(){return this._height.toString(this._host)}constructor(t){super(t),this.name=t,this._isVertical=!0,this._manualWidth=!1,this._manualHeight=!1,this._doNotTrackManualChanges=!1,this._spacing=0,this.ignoreLayoutWarnings=!1}_getTypeName(){return"StackPanel"}_preMeasure(t,e){for(const i of this._children)this._isVertical?i.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP:i.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT;super._preMeasure(t,e)}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._measureForChildren.copyFrom(t),this._measureForChildren.left=this._currentMeasure.left,this._measureForChildren.top=this._currentMeasure.top,(!this.isVertical||this._manualWidth)&&(this._measureForChildren.width=this._currentMeasure.width),(this.isVertical||this._manualHeight)&&(this._measureForChildren.height=this._currentMeasure.height)}_postMeasure(){let t=0,e=0;const i=this._children.length;for(let r=0;r<i;r++){const a=this._children[r];!a.isVisible||a.notRenderable||(this._isVertical?(a.top!==e+"px"&&(a.top=e+"px",this._rebuildLayout=!0,a._top.ignoreAdaptiveScaling=!0),a._height.isPercentage&&!a._automaticSize?this.ignoreLayoutWarnings||_t.Warn(`Control (Name:${a.name}, UniqueId:${a.uniqueId}) is using height in percentage mode inside a vertical StackPanel`):e+=a._currentMeasure.height+a._paddingTopInPixels+a._paddingBottomInPixels+(r<i-1?this._spacing:0)):(a.left!==t+"px"&&(a.left=t+"px",this._rebuildLayout=!0,a._left.ignoreAdaptiveScaling=!0),a._width.isPercentage&&!a._automaticSize&&a.getClassName()==="TextBlock"&&a.textWrapping!==oe.Clip&&!a.forceResizeWidth?this.ignoreLayoutWarnings||_t.Warn(`Control (Name:${a.name}, UniqueId:${a.uniqueId}) is using width in percentage mode inside a horizontal StackPanel`):t+=a._currentMeasure.width+a._paddingLeftInPixels+a._paddingRightInPixels+(r<i-1?this._spacing:0)))}t+=this._paddingLeftInPixels+this._paddingRightInPixels,e+=this._paddingTopInPixels+this._paddingBottomInPixels,this._doNotTrackManualChanges=!0;let s=!1,o=!1;if((!this._manualHeight||this.adaptHeightToChildren)&&this._isVertical){const r=this.height;this.height=e+"px",o=r!==this.height||!this._height.ignoreAdaptiveScaling}if((!this._manualWidth||this.adaptWidthToChildren)&&!this._isVertical){const r=this.width;this.width=t+"px",s=r!==this.width||!this._width.ignoreAdaptiveScaling}o&&(this._height.ignoreAdaptiveScaling=!0),s&&(this._width.ignoreAdaptiveScaling=!0),this._doNotTrackManualChanges=!1,(s||o)&&(this._rebuildLayout=!0),super._postMeasure()}serialize(t){super.serialize(t),t.manualWidth=this._manualWidth,t.manualHeight=this._manualHeight}_parseFromContent(t,e){this._manualWidth=t.manualWidth,this._manualHeight=t.manualHeight,super._parseFromContent(t,e)}}n([l()],Ot.prototype,"ignoreLayoutWarnings",void 0);n([l()],Ot.prototype,"isVertical",null);n([l()],Ot.prototype,"spacing",null);n([l()],Ot.prototype,"width",null);n([l()],Ot.prototype,"height",null);k("BABYLON.GUI.StackPanel",Ot);class Ne extends f{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get checkSizeRatio(){return this._checkSizeRatio}set checkSizeRatio(t){t=Math.max(Math.min(1,t),0),this._checkSizeRatio!==t&&(this._checkSizeRatio=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get isChecked(){return this._isChecked}set isChecked(t){this._isChecked!==t&&(this._isChecked=t,this._markAsDirty(),this.onIsCheckedChangedObservable.notifyObservers(t))}constructor(t){super(t),this.name=t,this._isChecked=!1,this._background="black",this._checkSizeRatio=.8,this._thickness=1,this.onIsCheckedChangedObservable=new x,this.isPointerBlocker=!0}_getTypeName(){return"Checkbox"}_draw(t){t.save(),this._applyStates(t);const e=this._currentMeasure.width-this._thickness,i=this._currentMeasure.height-this._thickness;if((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,e,i),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this._isChecked){t.fillStyle=this._isEnabled?this.color:this._disabledColorItem;const s=e*this._checkSizeRatio,o=i*this._checkSizeRatio;t.fillRect(this._currentMeasure.left+this._thickness/2+(e-s)/2,this._currentMeasure.top+this._thickness/2+(i-o)/2,s,o)}t.strokeStyle=this.color,t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,e,i),t.restore()}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(this.isReadOnly||(this.isChecked=!this.isChecked),!0):!1}static AddCheckBoxWithHeader(t,e){const i=new Ot;i.isVertical=!1,i.height="30px";const s=new Ne;s.width="20px",s.height="20px",s.isChecked=!0,s.color="green",s.onIsCheckedChangedObservable.add(e),i.addControl(s);const o=new U;return o.text=t,o.width="180px",o.paddingLeft="5px",o.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,o.color="white",i.addControl(o),i}}n([l()],Ne.prototype,"thickness",null);n([l()],Ne.prototype,"checkSizeRatio",null);n([l()],Ne.prototype,"background",null);n([l()],Ne.prototype,"isChecked",null);k("BABYLON.GUI.Checkbox",Ne);class Vi{get text(){return this._characters?this._characters.join(""):this._text}set text(t){this._text=t,this._characters=Array.from&&Array.from(t)}get length(){return this._characters?this._characters.length:this._text.length}removePart(t,e,i){if(this._text=this._text.slice(0,t)+(i||"")+this._text.slice(e),this._characters){const s=i?Array.from(i):[];this._characters.splice(t,e-t,...s)}}charAt(t){return this._characters?this._characters[t]:this._text.charAt(t)}substr(t,e){if(this._characters){isNaN(t)?t=0:t>=0?t=Math.min(t,this._characters.length):t=this._characters.length+Math.max(t,-this._characters.length),e===void 0?e=this._characters.length-t:(isNaN(e)||e<0)&&(e=0);const i=[];for(;--e>=0;)i[e]=this._characters[t+e];return i.join("")}return this._text.substr(t,e)}substring(t,e){if(this._characters){isNaN(t)?t=0:t>this._characters.length?t=this._characters.length:t<0&&(t=0),e===void 0?e=this._characters.length:isNaN(e)?e=0:e>this._characters.length?e=this._characters.length:e<0&&(e=0);const i=[];let s=0;for(;t<e;)i[s++]=this._characters[t++];return i.join("")}return this._text.substring(t,e)}isWord(t){const e=/\w/g;return this._characters?this._characters[t].search(e)!==-1:this._text.search(e)!==-1}}class j extends f{get maxWidth(){return this._maxWidth.toString(this._host)}get maxWidthInPixels(){return this._maxWidth.getValueInPixel(this._host,this._cachedParentMeasure.width)}set maxWidth(t){this._maxWidth.toString(this._host)!==t&&this._maxWidth.fromString(t)&&this._markAsDirty()}get highligherOpacity(){return this._highligherOpacity}set highligherOpacity(t){this._highligherOpacity!==t&&(this._highligherOpacity=t,this._markAsDirty())}get onFocusSelectAll(){return this._onFocusSelectAll}set onFocusSelectAll(t){this._onFocusSelectAll!==t&&(this._onFocusSelectAll=t,this._markAsDirty())}get textHighlightColor(){return this._textHighlightColor}set textHighlightColor(t){this._textHighlightColor!==t&&(this._textHighlightColor=t,this._markAsDirty())}get margin(){return this._margin.toString(this._host)}get marginInPixels(){return this._margin.getValueInPixel(this._host,this._cachedParentMeasure.width)}set margin(t){this._margin.toString(this._host)!==t&&this._margin.fromString(t)&&this._markAsDirty()}get autoStretchWidth(){return this._autoStretchWidth}set autoStretchWidth(t){this._autoStretchWidth!==t&&(this._autoStretchWidth=t,this._markAsDirty())}get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get focusedBackground(){return this._focusedBackground}set focusedBackground(t){this._focusedBackground!==t&&(this._focusedBackground=t,this._markAsDirty())}get focusedColor(){return this._focusedColor}set focusedColor(t){this._focusedColor!==t&&(this._focusedColor=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get placeholderColor(){return this._placeholderColor}set placeholderColor(t){this._placeholderColor!==t&&(this._placeholderColor=t,this._markAsDirty())}get placeholderText(){return this._placeholderText}set placeholderText(t){this._placeholderText!==t&&(this._placeholderText=t,this._markAsDirty())}get deadKey(){return this._deadKey}set deadKey(t){this._deadKey=t}get highlightedText(){return this._highlightedText}set highlightedText(t){this._highlightedText!==t&&(this._highlightedText=t,this._markAsDirty())}get addKey(){return this._addKey}set addKey(t){this._addKey=t}get currentKey(){return this._currentKey}set currentKey(t){this._currentKey=t}get text(){return this._textWrapper.text}set text(t){const e=t.toString();this._textWrapper||(this._textWrapper=new Vi),this._textWrapper.text!==e&&(this._textWrapper.text=e,this._textHasChanged())}_textHasChanged(){this._markAsDirty(),this.onTextChangedObservable.notifyObservers(this)}get width(){return this._width.toString(this._host)}set width(t){this._width.toString(this._host)!==t&&(this._width.fromString(t)&&this._markAsDirty(),this.autoStretchWidth=!1)}constructor(t,e=""){super(t),this.name=t,this._placeholderText="",this._background="#222222",this._focusedBackground="#000000",this._focusedColor="white",this._placeholderColor="gray",this._thickness=1,this._margin=new R(10,R.UNITMODE_PIXEL),this._autoStretchWidth=!0,this._maxWidth=new R(1,R.UNITMODE_PERCENTAGE,!1),this._isFocused=!1,this._blinkIsEven=!1,this._cursorOffset=0,this._deadKey=!1,this._addKey=!0,this._currentKey="",this._isTextHighlightOn=!1,this._textHighlightColor="#d5e0ff",this._highligherOpacity=.4,this._highlightedText="",this._startHighlightIndex=0,this._endHighlightIndex=0,this._cursorIndex=-1,this._onFocusSelectAll=!1,this._isPointerDown=!1,this.promptMessage="Please enter text:",this.disableMobilePrompt=!1,this.onTextChangedObservable=new x,this.onBeforeKeyAddObservable=new x,this.onFocusObservable=new x,this.onBlurObservable=new x,this.onTextHighlightObservable=new x,this.onTextCopyObservable=new x,this.onTextCutObservable=new x,this.onTextPasteObservable=new x,this.onKeyboardEventProcessedObservable=new x,this.text=e,this.isPointerBlocker=!0}onBlur(){this._isFocused=!1,this._scrollLeft=null,this._cursorOffset=0,clearTimeout(this._blinkTimeout),this._markAsDirty(),this.onBlurObservable.notifyObservers(this),this._host.unRegisterClipboardEvents(),this._onClipboardObserver&&this._host.onClipboardObservable.remove(this._onClipboardObserver);const t=this._host.getScene();this._onPointerDblTapObserver&&t&&t.onPointerObservable.remove(this._onPointerDblTapObserver)}onFocus(){if(!this._isEnabled)return;if(this._scrollLeft=null,this._isFocused=!0,this._blinkIsEven=!1,this._cursorOffset=0,this._markAsDirty(),this.onFocusObservable.notifyObservers(this),this._focusedBy==="touch"&&!this.disableMobilePrompt){const e=prompt(this.promptMessage);e!==null&&(this.text=e),this._host.focusedControl=null;return}this._host.registerClipboardEvents(),this._onClipboardObserver=this._host.onClipboardObservable.add(e=>{switch(e.type){case Lt.COPY:this._onCopyText(e.event),this.onTextCopyObservable.notifyObservers(this);break;case Lt.CUT:this._onCutText(e.event),this.onTextCutObservable.notifyObservers(this);break;case Lt.PASTE:this._onPasteText(e.event),this.onTextPasteObservable.notifyObservers(this);break;default:return}});const t=this._host.getScene();t&&(this._onPointerDblTapObserver=t.onPointerObservable.add(e=>{this._isFocused&&e.type===D.POINTERDOUBLETAP&&this._processDblClick(e)})),this._onFocusSelectAll&&this._selectAllText()}focus(){this._host.moveFocusToControl(this)}blur(){this._host.focusedControl=null}_getTypeName(){return"InputText"}keepsFocusWith(){return this._connectedVirtualKeyboard?[this._connectedVirtualKeyboard]:null}processKey(t,e,i){var s;if(!this.isReadOnly&&!(i&&(i.ctrlKey||i.metaKey)&&(t===67||t===86||t===88))){if(i&&(i.ctrlKey||i.metaKey)&&t===65){this._selectAllText(),i.preventDefault();return}switch(t){case 32:e=" ";break;case 191:i&&i.preventDefault();break;case 8:if(this._textWrapper.text&&this._textWrapper.length>0){if(this.isTextHighlightOn){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this._blinkIsEven=!1,i&&i.preventDefault();return}if(this._cursorOffset===0)this.text=this._textWrapper.substr(0,this._textWrapper.length-1);else{const o=this._textWrapper.length-this._cursorOffset;o>0&&(this._textWrapper.removePart(o-1,o),this._textHasChanged())}}i&&i.preventDefault();return;case 46:if(this.isTextHighlightOn){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,i&&i.preventDefault();return}if(this._textWrapper.text&&this._textWrapper.length>0&&this._cursorOffset>0){const o=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(o,o+1),this._textHasChanged(),this._cursorOffset--}i&&i.preventDefault();return;case 13:this._host.focusedControl=null,this.isTextHighlightOn=!1;return;case 35:this._cursorOffset=0,this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._markAsDirty();return;case 36:this._cursorOffset=this._textWrapper.length,this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._markAsDirty();return;case 37:if(this._cursorOffset++,this._cursorOffset>this._textWrapper.length&&(this._cursorOffset=this._textWrapper.length),i&&i.shiftKey){if(this._blinkIsEven=!1,i.ctrlKey||i.metaKey){if(!this.isTextHighlightOn){if(this._textWrapper.length===this._cursorOffset)return;this._endHighlightIndex=this._textWrapper.length-this._cursorOffset+1}this._startHighlightIndex=0,this._cursorIndex=this._textWrapper.length-this._endHighlightIndex,this._cursorOffset=this._textWrapper.length,this.isTextHighlightOn=!0,this._markAsDirty();return}this.isTextHighlightOn?this._cursorIndex===-1&&(this._cursorIndex=this._textWrapper.length-this._endHighlightIndex,this._cursorOffset=this._startHighlightIndex===0?this._textWrapper.length:this._textWrapper.length-this._startHighlightIndex+1):(this.isTextHighlightOn=!0,this._cursorIndex=this._cursorOffset>=this._textWrapper.length?this._textWrapper.length:this._cursorOffset-1),this._cursorIndex<this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset):this._cursorIndex>this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex):this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn&&(this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this.isTextHighlightOn=!1),i&&(i.ctrlKey||i.metaKey)&&(this._cursorOffset=this._textWrapper.length,i.preventDefault()),this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._cursorIndex=-1,this._markAsDirty();return;case 39:if(this._cursorOffset--,this._cursorOffset<0&&(this._cursorOffset=0),i&&i.shiftKey){if(this._blinkIsEven=!1,i.ctrlKey||i.metaKey){if(!this.isTextHighlightOn){if(this._cursorOffset===0)return;this._startHighlightIndex=this._textWrapper.length-this._cursorOffset-1}this._endHighlightIndex=this._textWrapper.length,this.isTextHighlightOn=!0,this._cursorIndex=this._textWrapper.length-this._startHighlightIndex,this._cursorOffset=0,this._markAsDirty();return}this.isTextHighlightOn?this._cursorIndex===-1&&(this._cursorIndex=this._textWrapper.length-this._startHighlightIndex,this._cursorOffset=this._textWrapper.length===this._endHighlightIndex?0:this._textWrapper.length-this._endHighlightIndex-1):(this.isTextHighlightOn=!0,this._cursorIndex=this._cursorOffset<=0?0:this._cursorOffset+1),this._cursorIndex<this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset):this._cursorIndex>this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex):this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn&&(this._cursorOffset=this._textWrapper.length-this._endHighlightIndex,this.isTextHighlightOn=!1),i&&(i.ctrlKey||i.metaKey)&&(this._cursorOffset=0,i.preventDefault()),this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._cursorIndex=-1,this._markAsDirty();return}if(t===32&&(e=(s=i==null?void 0:i.key)!==null&&s!==void 0?s:" "),this._deadKey=e==="Dead",e&&(t===-1||t===32||t===34||t===39||t>47&&t<64||t>64&&t<91||t>159&&t<193||t>218&&t<223||t>95&&t<112)&&(this._currentKey=e,this.onBeforeKeyAddObservable.notifyObservers(this),e=this._currentKey,this._addKey&&!this._deadKey))if(this.isTextHighlightOn)this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex,e),this._textHasChanged(),this._cursorOffset=this._textWrapper.length-(this._startHighlightIndex+1),this.isTextHighlightOn=!1,this._blinkIsEven=!1,this._markAsDirty();else if(this._cursorOffset===0)this.text+=this._deadKey&&(i!=null&&i.key)?i.key:e;else{const o=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(o,o,e),this._textHasChanged()}}}_updateValueFromCursorIndex(t){if(this._blinkIsEven=!1,this._cursorIndex===-1)this._cursorIndex=t;else if(this._cursorIndex<this._cursorOffset)this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset;else if(this._cursorIndex>this._cursorOffset)this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex;else{this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn=!0,this._markAsDirty()}_processDblClick(t){this._startHighlightIndex=this._textWrapper.length-this._cursorOffset,this._endHighlightIndex=this._startHighlightIndex;let e,i;do i=this._endHighlightIndex<this._textWrapper.length&&this._textWrapper.isWord(this._endHighlightIndex)?++this._endHighlightIndex:0,e=this._startHighlightIndex>0&&this._textWrapper.isWord(this._startHighlightIndex-1)?--this._startHighlightIndex:0;while(e||i);this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this.isTextHighlightOn=!0,this._clickedCoordinate=null,this._blinkIsEven=!0,this._cursorIndex=-1,this._markAsDirty()}_selectAllText(){this._blinkIsEven=!0,this.isTextHighlightOn=!0,this._startHighlightIndex=0,this._endHighlightIndex=this._textWrapper.length,this._cursorOffset=this._textWrapper.length,this._cursorIndex=-1,this._markAsDirty()}processKeyboard(t){this.processKey(t.keyCode,t.key,t),this.onKeyboardEventProcessedObservable.notifyObservers(t)}_onCopyText(t){this.isTextHighlightOn=!1;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch{}this._host.clipboardData=this._highlightedText}_onCutText(t){if(this._highlightedText){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch{}this._host.clipboardData=this._highlightedText,this._highlightedText=""}}_onPasteText(t){let e="";t.clipboardData&&t.clipboardData.types.indexOf("text/plain")!==-1?e=t.clipboardData.getData("text/plain"):e=this._host.clipboardData;const i=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(i,i,e),this._textHasChanged()}_draw(t){t.save(),this._applyStates(t),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._isFocused?this._focusedBackground&&(t.fillStyle=this._isEnabled?this._focusedBackground:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)):this._background&&(t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),(!this._fontOffset||this._wasDirty)&&(this._fontOffset=f._GetFontOffset(t.font));const e=this._currentMeasure.left+this._margin.getValueInPixel(this._host,this._tempParentMeasure.width);this.color&&(t.fillStyle=this.color);let i=this._beforeRenderText(this._textWrapper);!this._isFocused&&!this._textWrapper.text&&this._placeholderText&&(i=new Vi,i.text=this._placeholderText,this._placeholderColor&&(t.fillStyle=this._placeholderColor)),this._textWidth=t.measureText(i.text).width;const s=this._margin.getValueInPixel(this._host,this._tempParentMeasure.width)*2;this._autoStretchWidth&&(this.width=Math.min(this._maxWidth.getValueInPixel(this._host,this._tempParentMeasure.width),this._textWidth+s)+"px",this._autoStretchWidth=!0);const o=this._fontOffset.ascent+(this._currentMeasure.height-this._fontOffset.height)/2,r=this._width.getValueInPixel(this._host,this._tempParentMeasure.width)-s;if(t.save(),t.beginPath(),t.rect(e,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,r+2,this._currentMeasure.height),t.clip(),this._isFocused&&this._textWidth>r){const a=e-this._textWidth+r;this._scrollLeft||(this._scrollLeft=a)}else this._scrollLeft=e;if(t.fillText(i.text,this._scrollLeft,this._currentMeasure.top+o),this._isFocused){if(this._clickedCoordinate){const _=this._scrollLeft+this._textWidth-this._clickedCoordinate;let h=0;this._cursorOffset=0;let d=0;do this._cursorOffset&&(d=Math.abs(_-h)),this._cursorOffset++,h=t.measureText(i.substr(i.length-this._cursorOffset,this._cursorOffset)).width;while(h<_&&i.length>=this._cursorOffset);Math.abs(_-h)>d&&this._cursorOffset--,this._blinkIsEven=!1,this._clickedCoordinate=null}if(!this._blinkIsEven){const a=i.substr(i.length-this._cursorOffset),_=t.measureText(a).width;let h=this._scrollLeft+this._textWidth-_;h<e?(this._scrollLeft+=e-h,h=e,this._markAsDirty()):h>e+r&&(this._scrollLeft+=e+r-h,h=e+r,this._markAsDirty()),this.isTextHighlightOn||t.fillRect(h,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,2,this._fontOffset.height)}if(clearTimeout(this._blinkTimeout),this._blinkTimeout=setTimeout(()=>{this._blinkIsEven=!this._blinkIsEven,this._markAsDirty()},500),this.isTextHighlightOn){clearTimeout(this._blinkTimeout);const a=t.measureText(i.substring(this._startHighlightIndex)).width;let _=this._scrollLeft+this._textWidth-a;this._highlightedText=i.substring(this._startHighlightIndex,this._endHighlightIndex);let h=t.measureText(i.substring(this._startHighlightIndex,this._endHighlightIndex)).width;_<e&&(h=h-(e-_),h||(h=t.measureText(i.charAt(i.length-this._cursorOffset)).width),_=e),t.globalAlpha=this._highligherOpacity,t.fillStyle=this._textHighlightColor,t.fillRect(_,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,h,this._fontOffset.height),t.globalAlpha=1}}t.restore(),this._thickness&&(this._isFocused?this.focusedColor&&(t.strokeStyle=this.focusedColor):this.color&&(t.strokeStyle=this.color),t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness)),t.restore()}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?this.isReadOnly?!0:(this._clickedCoordinate=e.x,this.isTextHighlightOn=!1,this._highlightedText="",this._cursorIndex=-1,this._isPointerDown=!0,this._host._capturingControl[i]=this,this._focusedBy=o.event.pointerType,this._host.focusedControl===this?(clearTimeout(this._blinkTimeout),this._markAsDirty(),!0):this._isEnabled?(this._host.focusedControl=this,!0):!1):!1}_onPointerMove(t,e,i,s){this._host.focusedControl===this&&this._isPointerDown&&!this.isReadOnly&&(this._clickedCoordinate=e.x,this._markAsDirty(),this._updateValueFromCursorIndex(this._cursorOffset)),super._onPointerMove(t,e,i,s)}_onPointerUp(t,e,i,s,o){this._isPointerDown=!1,delete this._host._capturingControl[i],super._onPointerUp(t,e,i,s,o)}_beforeRenderText(t){return t}set isTextHighlightOn(t){this._isTextHighlightOn!==t&&(t&&this.onTextHighlightObservable.notifyObservers(this),this._isTextHighlightOn=t)}get isTextHighlightOn(){return this._isTextHighlightOn}dispose(){super.dispose(),this.onBlurObservable.clear(),this.onFocusObservable.clear(),this.onTextChangedObservable.clear(),this.onTextCopyObservable.clear(),this.onTextCutObservable.clear(),this.onTextPasteObservable.clear(),this.onTextHighlightObservable.clear(),this.onKeyboardEventProcessedObservable.clear()}}n([l()],j.prototype,"promptMessage",void 0);n([l()],j.prototype,"disableMobilePrompt",void 0);n([l()],j.prototype,"maxWidth",null);n([l()],j.prototype,"highligherOpacity",null);n([l()],j.prototype,"onFocusSelectAll",null);n([l()],j.prototype,"textHighlightColor",null);n([l()],j.prototype,"margin",null);n([l()],j.prototype,"autoStretchWidth",null);n([l()],j.prototype,"thickness",null);n([l()],j.prototype,"focusedBackground",null);n([l()],j.prototype,"focusedColor",null);n([l()],j.prototype,"background",null);n([l()],j.prototype,"placeholderColor",null);n([l()],j.prototype,"placeholderText",null);n([l()],j.prototype,"deadKey",null);n([l()],j.prototype,"text",null);n([l()],j.prototype,"width",null);k("BABYLON.GUI.InputText",j);class xt extends yt{set clipContent(t){this._clipContent=t;for(const e in this._cells)this._cells[e].clipContent=t}get clipContent(){return this._clipContent}set clipChildren(t){this._clipChildren=t;for(const e in this._cells)this._cells[e].clipChildren=t}get clipChildren(){return this._clipChildren}get columnCount(){return this._columnDefinitions.length}get rowCount(){return this._rowDefinitions.length}get children(){return this._childControls}get cells(){return this._cells}getRowDefinition(t){return t<0||t>=this._rowDefinitions.length?null:this._rowDefinitions[t]}getColumnDefinition(t){return t<0||t>=this._columnDefinitions.length?null:this._columnDefinitions[t]}addRowDefinition(t,e=!1){return this._rowDefinitions.push(new R(t,e?R.UNITMODE_PIXEL:R.UNITMODE_PERCENTAGE)),this._rowDefinitionObservers.push(this._rowDefinitions[this.rowCount-1].onChangedObservable.add(()=>this._markAsDirty())),this._markAsDirty(),this}addColumnDefinition(t,e=!1){return this._columnDefinitions.push(new R(t,e?R.UNITMODE_PIXEL:R.UNITMODE_PERCENTAGE)),this._columnDefinitionObservers.push(this._columnDefinitions[this.columnCount-1].onChangedObservable.add(()=>this._markAsDirty())),this._markAsDirty(),this}setRowDefinition(t,e,i=!1){if(t<0||t>=this._rowDefinitions.length)return this;const s=this._rowDefinitions[t];return s&&s.isPixel===i&&s.value===e?this:(this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]),this._rowDefinitions[t]=new R(e,i?R.UNITMODE_PIXEL:R.UNITMODE_PERCENTAGE),this._rowDefinitionObservers[t]=this._rowDefinitions[t].onChangedObservable.add(()=>this._markAsDirty()),this._markAsDirty(),this)}setColumnDefinition(t,e,i=!1){if(t<0||t>=this._columnDefinitions.length)return this;const s=this._columnDefinitions[t];return s&&s.isPixel===i&&s.value===e?this:(this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]),this._columnDefinitions[t]=new R(e,i?R.UNITMODE_PIXEL:R.UNITMODE_PERCENTAGE),this._columnDefinitionObservers[t]=this._columnDefinitions[t].onChangedObservable.add(()=>this._markAsDirty()),this._markAsDirty(),this)}getChildrenAt(t,e){const i=this._cells[`${t}:${e}`];return i?i.children:null}getChildCellInfo(t){return t._tag}_removeCell(t,e){if(t){super.removeControl(t);for(const i of t.children){const s=this._childControls.indexOf(i);s!==-1&&this._childControls.splice(s,1)}delete this._cells[e]}}_offsetCell(t,e){if(this._cells[e]){this._cells[t]=this._cells[e];for(const i of this._cells[t].children)i._tag=t;delete this._cells[e]}}removeColumnDefinition(t){if(t<0||t>=this._columnDefinitions.length)return this;for(let e=0;e<this._rowDefinitions.length;e++){const i=`${e}:${t}`,s=this._cells[i];this._removeCell(s,i)}for(let e=0;e<this._rowDefinitions.length;e++)for(let i=t+1;i<this._columnDefinitions.length;i++){const s=`${e}:${i-1}`,o=`${e}:${i}`;this._offsetCell(s,o)}return this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]),this._columnDefinitions.splice(t,1),this._columnDefinitionObservers.splice(t,1),this._markAsDirty(),this}removeRowDefinition(t){if(t<0||t>=this._rowDefinitions.length)return this;for(let e=0;e<this._columnDefinitions.length;e++){const i=`${t}:${e}`,s=this._cells[i];this._removeCell(s,i)}for(let e=0;e<this._columnDefinitions.length;e++)for(let i=t+1;i<this._rowDefinitions.length;i++){const s=`${i-1}:${e}`,o=`${i}:${e}`;this._offsetCell(s,o)}return this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]),this._rowDefinitions.splice(t,1),this._rowDefinitionObservers.splice(t,1),this._markAsDirty(),this}addControl(t,e=0,i=0){if(this._rowDefinitions.length===0&&this.addRowDefinition(1,!1),this._columnDefinitions.length===0&&this.addColumnDefinition(1,!1),this._childControls.indexOf(t)!==-1)return _t.Warn(`Control (Name:${t.name}, UniqueId:${t.uniqueId}) is already associated with this grid. You must remove it before reattaching it`),this;const s=Math.min(e,this._rowDefinitions.length-1),o=Math.min(i,this._columnDefinitions.length-1),r=`${s}:${o}`;let a=this._cells[r];return a||(a=new yt(r),this._cells[r]=a,a.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,a.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,a.clipContent=this.clipContent,a.clipChildren=this.clipChildren,super.addControl(a)),a.addControl(t),this._childControls.push(t),t._tag=r,t.parent=this,this._markAsDirty(),this}removeControl(t){const e=this._childControls.indexOf(t);e!==-1&&this._childControls.splice(e,1);const i=this._cells[t._tag];return i&&(i.removeControl(t),t._tag=null),this._markAsDirty(),this}constructor(t){super(t),this.name=t,this._rowDefinitions=new Array,this._rowDefinitionObservers=[],this._columnDefinitions=new Array,this._columnDefinitionObservers=[],this._cells={},this._childControls=new Array}_getTypeName(){return"Grid"}_getGridDefinitions(t){const e=[],i=[],s=[],o=[];let r=this._currentMeasure.width,a=0,_=this._currentMeasure.height,h=0,d=0;for(const b of this._rowDefinitions){if(b.isPixel){const w=b.getValue(this._host);_-=w,i[d]=w}else h+=b.value;d++}let u=0;d=0;for(const b of this._rowDefinitions){if(o.push(u),b.isPixel)u+=b.getValue(this._host);else{const w=Math.round(b.value/h*_);u+=w,i[d]=w}d++}d=0;for(const b of this._columnDefinitions){if(b.isPixel){const w=b.getValue(this._host);r-=w,e[d]=w}else a+=b.value;d++}let m=0;d=0;for(const b of this._columnDefinitions){if(s.push(m),b.isPixel)m+=b.getValue(this._host);else{const w=Math.round(b.value/a*r);m+=w,e[d]=w}d++}t(s,o,e,i)}_additionalProcessing(t,e){this._getGridDefinitions((i,s,o,r)=>{for(const a in this._cells){if(!Object.prototype.hasOwnProperty.call(this._cells,a))continue;const _=a.split(":"),h=parseInt(_[0]),d=parseInt(_[1]),u=this._cells[a];u.leftInPixels=i[d],u.topInPixels=s[h],u.widthInPixels=o[d],u.heightInPixels=r[h],u._left.ignoreAdaptiveScaling=!0,u._top.ignoreAdaptiveScaling=!0,u._width.ignoreAdaptiveScaling=!0,u._height.ignoreAdaptiveScaling=!0}}),super._additionalProcessing(t,e)}_flagDescendantsAsMatrixDirty(){for(const t in this._cells){if(!Object.prototype.hasOwnProperty.call(this._cells,t))continue;this._cells[t]._markMatrixAsDirty()}}_renderHighlightSpecific(t){super._renderHighlightSpecific(t),this._getGridDefinitions((e,i,s,o)=>{for(let r=0;r<e.length;r++){const a=this._currentMeasure.left+e[r]+s[r];t.beginPath(),t.moveTo(a,this._currentMeasure.top),t.lineTo(a,this._currentMeasure.top+this._currentMeasure.height),t.stroke()}for(let r=0;r<i.length;r++){const a=this._currentMeasure.top+i[r]+o[r];t.beginPath(),t.moveTo(this._currentMeasure.left,a),t.lineTo(this._currentMeasure.left+this._currentMeasure.width,a),t.stroke()}}),t.restore()}dispose(){super.dispose();for(const t of this._childControls)t.dispose();for(let t=0;t<this._rowDefinitions.length;t++)this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]);for(let t=0;t<this._columnDefinitions.length;t++)this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]);this._rowDefinitionObservers.length=0,this._rowDefinitions.length=0,this._columnDefinitionObservers.length=0,this._columnDefinitions.length=0,this._cells={},this._childControls.length=0}serialize(t){super.serialize(t),t.columnCount=this.columnCount,t.rowCount=this.rowCount,t.columns=[],t.rows=[],t.tags=[];for(let e=0;e<this.columnCount;++e){const i=this.getColumnDefinition(e),s={value:i==null?void 0:i.getValue(this.host),unit:i==null?void 0:i.unit};t.columns.push(s)}for(let e=0;e<this.rowCount;++e){const i=this.getRowDefinition(e),s={value:i==null?void 0:i.getValue(this.host),unit:i==null?void 0:i.unit};t.rows.push(s)}this.children.forEach(e=>{t.tags.push(e._tag)})}_parseFromContent(t,e){super._parseFromContent(t,e);const i=[];this.children.forEach(s=>{i.push(s)}),this.removeRowDefinition(0),this.removeColumnDefinition(0);for(let s=0;s<t.columnCount;++s){const o=t.columns[s].value,r=t.columns[s].unit;this.addColumnDefinition(o,r===1)}for(let s=0;s<t.rowCount;++s){const o=t.rows[s].value,r=t.rows[s].unit;this.addRowDefinition(o,r===1)}for(let s=0;s<i.length;++s){const o=t.tags[s];let r=parseInt(o.substring(0,o.search(":")));isNaN(r)&&(r=0);let a=parseInt(o.substring(o.search(":")+1));isNaN(a)&&(a=0),this.addControl(i[s],r,a)}}}n([l()],xt.prototype,"clipContent",null);k("BABYLON.GUI.Grid",xt);class Rt extends f{get value(){return this._value}set value(t){this._value.equals(t)||(this._value.copyFrom(t),this._value.toHSVToRef(this._tmpColor),this._h=this._tmpColor.r,this._s=Math.max(this._tmpColor.g,1e-5),this._v=Math.max(this._tmpColor.b,1e-5),this._markAsDirty(),this._value.r<=Rt._Epsilon&&(this._value.r=0),this._value.g<=Rt._Epsilon&&(this._value.g=0),this._value.b<=Rt._Epsilon&&(this._value.b=0),this._value.r>=1-Rt._Epsilon&&(this._value.r=1),this._value.g>=1-Rt._Epsilon&&(this._value.g=1),this._value.b>=1-Rt._Epsilon&&(this._value.b=1),this.onValueChangedObservable.notifyObservers(this._value))}get width(){return this._width.toString(this._host)}set width(t){this._width.toString(this._host)!==t&&this._width.fromString(t)&&(this._width.getValue(this._host)===0&&(t="1px",this._width.fromString(t)),this._height.fromString(t),this._markAsDirty())}get height(){return this._height.toString(this._host)}set height(t){this._height.toString(this._host)!==t&&this._height.fromString(t)&&(this._height.getValue(this._host)===0&&(t="1px",this._height.fromString(t)),this._width.fromString(t),this._markAsDirty())}get size(){return this.width}set size(t){this.width=t}constructor(t){super(t),this.name=t,this._value=E.Red(),this._tmpColor=new E,this._pointerStartedOnSquare=!1,this._pointerStartedOnWheel=!1,this._squareLeft=0,this._squareTop=0,this._squareSize=0,this._h=360,this._s=1,this._v=1,this._lastPointerDownId=-1,this.onValueChangedObservable=new x,this._pointerIsDown=!1,this.value=new E(.88,.1,.1),this.size="200px",this.isPointerBlocker=!0}_getTypeName(){return"ColorPicker"}_preMeasure(t){t.width<t.height?this._currentMeasure.height=t.width:this._currentMeasure.width=t.height}_updateSquareProps(){const t=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,e=t*.2,s=(t-e)*2/Math.sqrt(2),o=t-s*.5;this._squareLeft=this._currentMeasure.left+o,this._squareTop=this._currentMeasure.top+o,this._squareSize=s}_drawGradientSquare(t,e,i,s,o,r){const a=r.createLinearGradient(e,i,s+e,i);a.addColorStop(0,"#fff"),a.addColorStop(1,"hsl("+t+", 100%, 50%)"),r.fillStyle=a,r.fillRect(e,i,s,o);const _=r.createLinearGradient(e,i,e,o+i);_.addColorStop(0,"rgba(0,0,0,0)"),_.addColorStop(1,"#000"),r.fillStyle=_,r.fillRect(e,i,s,o)}_drawCircle(t,e,i,s){s.beginPath(),s.arc(t,e,i+1,0,2*Math.PI,!1),s.lineWidth=3,s.strokeStyle="#333333",s.stroke(),s.beginPath(),s.arc(t,e,i,0,2*Math.PI,!1),s.lineWidth=3,s.strokeStyle="#ffffff",s.stroke()}_createColorWheelCanvas(t,e){const i=Ht.LastCreatedEngine;if(!i)throw new Error("Invalid engine. Unable to create a canvas.");const s=i.createCanvas(t*2,t*2),o=s.getContext("2d"),r=o.getImageData(0,0,t*2,t*2),a=r.data,_=this._tmpColor,h=t*t,d=t-e,u=d*d;for(let m=-t;m<t;m++)for(let b=-t;b<t;b++){const w=m*m+b*b;if(w>h||w<u)continue;const ut=Math.sqrt(w),kt=Math.atan2(b,m);E.HSVtoRGBToRef(kt*180/Math.PI+180,ut/t,1,_);const bt=(m+t+(b+t)*2*t)*4;a[bt]=_.r*255,a[bt+1]=_.g*255,a[bt+2]=_.b*255;let $t=(ut-d)/(t-d),Yt=.2;const je=.2,_i=.04,ft=50,X=150;t<ft?Yt=je:t>X?Yt=_i:Yt=(_i-je)*(t-ft)/(X-ft)+je,$t=(ut-d)/(t-d),$t<Yt?a[bt+3]=255*($t/Yt):$t>1-Yt?a[bt+3]=255*(1-($t-(1-Yt))/Yt):a[bt+3]=255}return o.putImageData(r,0,0),s}_draw(t){t.save(),this._applyStates(t);const e=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,i=e*.2,s=this._currentMeasure.left,o=this._currentMeasure.top;(!this._colorWheelCanvas||this._colorWheelCanvas.width!=e*2)&&(this._colorWheelCanvas=this._createColorWheelCanvas(e,i)),this._updateSquareProps(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY,t.fillRect(this._squareLeft,this._squareTop,this._squareSize,this._squareSize)),t.drawImage(this._colorWheelCanvas,s,o),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this._drawGradientSquare(this._h,this._squareLeft,this._squareTop,this._squareSize,this._squareSize,t);let r=this._squareLeft+this._squareSize*this._s,a=this._squareTop+this._squareSize*(1-this._v);this._drawCircle(r,a,e*.04,t);const _=e-i*.5;r=s+e+Math.cos((this._h-180)*Math.PI/180)*_,a=o+e+Math.sin((this._h-180)*Math.PI/180)*_,this._drawCircle(r,a,i*.35,t),t.restore()}_updateValueFromPointer(t,e){if(this._pointerStartedOnWheel){const i=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,s=i+this._currentMeasure.left,o=i+this._currentMeasure.top;this._h=Math.atan2(e-o,t-s)*180/Math.PI+180}else this._pointerStartedOnSquare&&(this._updateSquareProps(),this._s=(t-this._squareLeft)/this._squareSize,this._v=1-(e-this._squareTop)/this._squareSize,this._s=Math.min(this._s,1),this._s=Math.max(this._s,Rt._Epsilon),this._v=Math.min(this._v,1),this._v=Math.max(this._v,Rt._Epsilon));E.HSVtoRGBToRef(this._h,this._s,this._v,this._tmpColor),this.value=this._tmpColor}_isPointOnSquare(t,e){this._updateSquareProps();const i=this._squareLeft,s=this._squareTop,o=this._squareSize;return t>=i&&t<=i+o&&e>=s&&e<=s+o}_isPointOnWheel(t,e){const i=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,s=i+this._currentMeasure.left,o=i+this._currentMeasure.top,r=i*.2,a=i-r,_=i*i,h=a*a,d=t-s,u=e-o,m=d*d+u*u;return m<=_&&m>=h}_onPointerDown(t,e,i,s,o){if(!super._onPointerDown(t,e,i,s,o))return!1;if(this.isReadOnly)return!0;this._pointerIsDown=!0,this._pointerStartedOnSquare=!1,this._pointerStartedOnWheel=!1,this._invertTransformMatrix.transformCoordinates(e.x,e.y,this._transformedPosition);const r=this._transformedPosition.x,a=this._transformedPosition.y;return this._isPointOnSquare(r,a)?this._pointerStartedOnSquare=!0:this._isPointOnWheel(r,a)&&(this._pointerStartedOnWheel=!0),this._updateValueFromPointer(r,a),this._host._capturingControl[i]=this,this._lastPointerDownId=i,!0}_onPointerMove(t,e,i,s){if(i==this._lastPointerDownId){if(!this.isReadOnly){this._invertTransformMatrix.transformCoordinates(e.x,e.y,this._transformedPosition);const o=this._transformedPosition.x,r=this._transformedPosition.y;this._pointerIsDown&&this._updateValueFromPointer(o,r)}super._onPointerMove(t,e,i,s)}}_onPointerUp(t,e,i,s,o,r){this._pointerIsDown=!1,delete this._host._capturingControl[i],super._onPointerUp(t,e,i,s,o,r)}_onCanvasBlur(){this._forcePointerUp(),super._onCanvasBlur()}static ShowPickerDialogAsync(t,e){return new Promise(i=>{e.pickerWidth=e.pickerWidth||"640px",e.pickerHeight=e.pickerHeight||"400px",e.headerHeight=e.headerHeight||"35px",e.lastColor=e.lastColor||"#000000",e.swatchLimit=e.swatchLimit||20,e.numSwatchesPerLine=e.numSwatchesPerLine||10;const s=e.swatchLimit/e.numSwatchesPerLine,o=parseFloat(e.pickerWidth)/e.numSwatchesPerLine,r=Math.floor(o*.25),a=r*(e.numSwatchesPerLine+1),_=Math.floor((parseFloat(e.pickerWidth)-a)/e.numSwatchesPerLine),h=_*s+r*(s+1),d=(parseInt(e.pickerHeight)+h+Math.floor(_*.25)).toString()+"px",u="#c0c0c0",m="#535353",b="#414141",w="515151",ut="#555555",kt="#454545",bt="#404040",$t=E.FromHexString("#dddddd"),Yt=$t.r+$t.g+$t.b,je="#aaaaaa",_i="#ffffff";let ft,X;const Ui=["R","G","B"],Pe="#454545",Ie="#f0f0f0";let xe,Z,he=!1,$,St,O;const Qt=new xt;if(Qt.name="Dialog Container",Qt.width=e.pickerWidth,e.savedColors){Qt.height=d;const P=parseInt(e.pickerHeight)/parseInt(d);Qt.addRowDefinition(P,!1),Qt.addRowDefinition(1-P,!1)}else Qt.height=e.pickerHeight,Qt.addRowDefinition(1,!1);if(t.addControl(Qt),e.savedColors){Z=new xt,Z.name="Swatch Drawer",Z.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,Z.background=m,Z.width=e.pickerWidth;const P=e.savedColors.length/e.numSwatchesPerLine;let M;P==0?M=0:M=P+1,Z.height=(_*P+M*r).toString()+"px",Z.top=Math.floor(_*.25).toString()+"px";for(let I=0;I<Math.ceil(e.savedColors.length/e.numSwatchesPerLine)*2+1;I++)I%2!=0?Z.addRowDefinition(_,!0):Z.addRowDefinition(r,!0);for(let I=0;I<e.numSwatchesPerLine*2+1;I++)I%2!=0?Z.addColumnDefinition(_,!0):Z.addColumnDefinition(r,!0);Qt.addControl(Z,1,0)}const ce=new xt;ce.name="Picker Panel",ce.height=e.pickerHeight;const Yi=parseInt(e.headerHeight)/parseInt(e.pickerHeight),hi=[Yi,1-Yi];ce.addRowDefinition(hi[0],!1),ce.addRowDefinition(hi[1],!1),Qt.addControl(ce,0,0);const Jt=new gt;Jt.name="Dialogue Header Bar",Jt.background="#cccccc",Jt.thickness=0,ce.addControl(Jt,0,0);const ht=qt.CreateSimpleButton("closeButton","a");ht.fontFamily="coreglyphs";const Ti=E.FromHexString(Jt.background),Xi=new E(1-Ti.r,1-Ti.g,1-Ti.b);ht.color=Xi.toHexString(),ht.fontSize=Math.floor(parseInt(e.headerHeight)*.6),ht.textBlock.textVerticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,ht.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_RIGHT,ht.height=ht.width=e.headerHeight,ht.background=Jt.background,ht.thickness=0,ht.pointerDownAnimation=()=>{},ht.pointerUpAnimation=()=>{ht.background=Jt.background},ht.pointerEnterAnimation=()=>{ht.color=Jt.background,ht.background="red"},ht.pointerOutAnimation=()=>{ht.color=Xi.toHexString(),ht.background=Jt.background},ht.onPointerClickObservable.add(()=>{Si(At.background)}),ce.addControl(ht,0,0);const de=new xt;de.name="Dialogue Body",de.background=m;const ci=[.4375,.5625];de.addRowDefinition(1,!1),de.addColumnDefinition(ci[0],!1),de.addColumnDefinition(ci[1],!1),ce.addControl(de,1,0);const ye=new xt;ye.name="Picker Grid",ye.addRowDefinition(.85,!1),ye.addRowDefinition(.15,!1),de.addControl(ye,0,0);const Mt=new Rt;Mt.name="GUI Color Picker",e.pickerHeight<e.pickerWidth?Mt.width=.89:Mt.height=.89,Mt.value=E.FromHexString(e.lastColor),Mt.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,Mt.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,Mt.onPointerDownObservable.add(()=>{O=Mt.name,St="",Dt(!1)}),Mt.onValueChangedObservable.add(function(P){O==Mt.name&&Vt(P,Mt.name)}),ye.addControl(Mt,0,0);const Te=new xt;Te.name="Dialogue Right Half",Te.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT;const di=[.514,.486];Te.addRowDefinition(di[0],!1),Te.addRowDefinition(di[1],!1),de.addControl(Te,1,1);const Re=new xt;Re.name="Swatches and Buttons";const ui=[.417,.583];Re.addRowDefinition(1,!1),Re.addColumnDefinition(ui[0],!1),Re.addColumnDefinition(ui[1],!1),Te.addControl(Re,0,0);const Xt=new xt;Xt.name="New and Current Swatches";const qe=[.04,.16,.64,.16];Xt.addRowDefinition(qe[0],!1),Xt.addRowDefinition(qe[1],!1),Xt.addRowDefinition(qe[2],!1),Xt.addRowDefinition(qe[3],!1),Re.addControl(Xt,0,0);const Be=new xt;Be.name="Active Swatches",Be.width=.67,Be.addRowDefinition(.5,!1),Be.addRowDefinition(.5,!1),Xt.addControl(Be,2,0);const vs=Math.floor(parseInt(e.pickerWidth)*ci[1]*ui[0]*.11),Ps=Math.floor(parseInt(e.pickerHeight)*hi[1]*di[0]*qe[1]*.5);let fi;e.pickerWidth>e.pickerHeight?fi=Ps:fi=vs;const Ze=new U;Ze.text="new",Ze.name="New Color Label",Ze.color=u,Ze.fontSize=fi,Xt.addControl(Ze,1,0);const te=new gt;te.name="New Color Swatch",te.background=e.lastColor,te.thickness=0,Be.addControl(te,0,0);const At=qt.CreateSimpleButton("currentSwatch","");At.background=e.lastColor,At.thickness=0,At.onPointerClickObservable.add(()=>{const P=E.FromHexString(At.background);Vt(P,At.name),Dt(!1)}),At.pointerDownAnimation=()=>{},At.pointerUpAnimation=()=>{},At.pointerEnterAnimation=()=>{},At.pointerOutAnimation=()=>{},Be.addControl(At,1,0);const Le=new gt;Le.name="Swatch Outline",Le.width=.67,Le.thickness=2,Le.color=bt,Le.isHitTestVisible=!1,Xt.addControl(Le,2,0);const $e=new U;$e.name="Current Color Label",$e.text="current",$e.color=u,$e.fontSize=fi,Xt.addControl($e,3,0);const Kt=new xt;Kt.name="Button Grid",Kt.height=.8;const gi=1/3;Kt.addRowDefinition(gi,!1),Kt.addRowDefinition(gi,!1),Kt.addRowDefinition(gi,!1),Re.addControl(Kt,0,1);const Ce=Math.floor(parseInt(e.pickerWidth)*ci[1]*ui[1]*.67).toString()+"px",ke=Math.floor(parseInt(e.pickerHeight)*hi[1]*di[0]*(parseFloat(Kt.height.toString())/100)*gi*.7).toString()+"px";parseFloat(Ce)>parseFloat(ke)?ft=Math.floor(parseFloat(ke)*.45):ft=Math.floor(parseFloat(Ce)*.11);const vt=qt.CreateSimpleButton("butOK","OK");vt.width=Ce,vt.height=ke,vt.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,vt.thickness=2,vt.color=u,vt.fontSize=ft,vt.background=m,vt.onPointerEnterObservable.add(()=>{vt.background=b}),vt.onPointerOutObservable.add(()=>{vt.background=m}),vt.pointerDownAnimation=()=>{vt.background=w},vt.pointerUpAnimation=()=>{vt.background=b},vt.onPointerClickObservable.add(()=>{Dt(!1),Si(te.background)}),Kt.addControl(vt,0,0);const Pt=qt.CreateSimpleButton("butCancel","Cancel");Pt.width=Ce,Pt.height=ke,Pt.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,Pt.thickness=2,Pt.color=u,Pt.fontSize=ft,Pt.background=m,Pt.onPointerEnterObservable.add(()=>{Pt.background=b}),Pt.onPointerOutObservable.add(()=>{Pt.background=m}),Pt.pointerDownAnimation=()=>{Pt.background=w},Pt.pointerUpAnimation=()=>{Pt.background=b},Pt.onPointerClickObservable.add(()=>{Dt(!1),Si(At.background)}),Kt.addControl(Pt,1,0),e.savedColors&&($=qt.CreateSimpleButton("butSave","Save"),$.width=Ce,$.height=ke,$.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,$.thickness=2,$.fontSize=ft,e.savedColors.length<e.swatchLimit?($.color=u,$.background=m):Ci($,!0),$.onPointerEnterObservable.add(()=>{e.savedColors&&e.savedColors.length<e.swatchLimit&&($.background=b)}),$.onPointerOutObservable.add(()=>{e.savedColors&&e.savedColors.length<e.swatchLimit&&($.background=m)}),$.pointerDownAnimation=()=>{e.savedColors&&e.savedColors.length<e.swatchLimit&&($.background=w)},$.pointerUpAnimation=()=>{e.savedColors&&e.savedColors.length<e.swatchLimit&&($.background=b)},$.onPointerClickObservable.add(()=>{e.savedColors&&(e.savedColors.length==0&&Bi(!0),e.savedColors.length<e.swatchLimit&&Ri(te.background,$),Dt(!1))}),e.savedColors.length>0&&Bi(!0),Kt.addControl($,2,0));const ue=new xt;ue.name="Dialog Lower Right",ue.addRowDefinition(.02,!1),ue.addRowDefinition(.63,!1),ue.addRowDefinition(.21,!1),ue.addRowDefinition(.14,!1),Te.addControl(ue,1,0);const Qe=E.FromHexString(e.lastColor),It=new xt;It.name="RGB Values",It.width=.82,It.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,It.addRowDefinition(1/3,!1),It.addRowDefinition(1/3,!1),It.addRowDefinition(1/3,!1),It.addColumnDefinition(.1,!1),It.addColumnDefinition(.2,!1),It.addColumnDefinition(.7,!1),ue.addControl(It,1,0);for(let P=0;P<Ui.length;P++){const M=new U;M.text=Ui[P],M.color=u,M.fontSize=ft,It.addControl(M,P,0)}const rt=new j;rt.width=.83,rt.height=.72,rt.name="rIntField",rt.fontSize=ft,rt.text=(Qe.r*255).toString(),rt.color=Ie,rt.background=Pe,rt.onFocusObservable.add(()=>{O=rt.name,St=rt.text,Dt(!1)}),rt.onBlurObservable.add(()=>{rt.text==""&&(rt.text="0"),Ve(rt,"r"),O==rt.name&&(O="")}),rt.onTextChangedObservable.add(()=>{O==rt.name&&Ve(rt,"r")}),It.addControl(rt,0,1);const at=new j;at.width=.83,at.height=.72,at.name="gIntField",at.fontSize=ft,at.text=(Qe.g*255).toString(),at.color=Ie,at.background=Pe,at.onFocusObservable.add(()=>{O=at.name,St=at.text,Dt(!1)}),at.onBlurObservable.add(()=>{at.text==""&&(at.text="0"),Ve(at,"g"),O==at.name&&(O="")}),at.onTextChangedObservable.add(()=>{O==at.name&&Ve(at,"g")}),It.addControl(at,1,1);const nt=new j;nt.width=.83,nt.height=.72,nt.name="bIntField",nt.fontSize=ft,nt.text=(Qe.b*255).toString(),nt.color=Ie,nt.background=Pe,nt.onFocusObservable.add(()=>{O=nt.name,St=nt.text,Dt(!1)}),nt.onBlurObservable.add(()=>{nt.text==""&&(nt.text="0"),Ve(nt,"b"),O==nt.name&&(O="")}),nt.onTextChangedObservable.add(()=>{O==nt.name&&Ve(nt,"b")}),It.addControl(nt,2,1);const J=new j;J.width=.95,J.height=.72,J.name="rDecField",J.fontSize=ft,J.text=Qe.r.toString(),J.color=Ie,J.background=Pe,J.onFocusObservable.add(()=>{O=J.name,St=J.text,Dt(!1)}),J.onBlurObservable.add(()=>{(parseFloat(J.text)==0||J.text=="")&&(J.text="0",ze(J,"r")),O==J.name&&(O="")}),J.onTextChangedObservable.add(()=>{O==J.name&&ze(J,"r")}),It.addControl(J,0,2);const tt=new j;tt.width=.95,tt.height=.72,tt.name="gDecField",tt.fontSize=ft,tt.text=Qe.g.toString(),tt.color=Ie,tt.background=Pe,tt.onFocusObservable.add(()=>{O=tt.name,St=tt.text,Dt(!1)}),tt.onBlurObservable.add(()=>{(parseFloat(tt.text)==0||tt.text=="")&&(tt.text="0",ze(tt,"g")),O==tt.name&&(O="")}),tt.onTextChangedObservable.add(()=>{O==tt.name&&ze(tt,"g")}),It.addControl(tt,1,2);const et=new j;et.width=.95,et.height=.72,et.name="bDecField",et.fontSize=ft,et.text=Qe.b.toString(),et.color=Ie,et.background=Pe,et.onFocusObservable.add(()=>{O=et.name,St=et.text,Dt(!1)}),et.onBlurObservable.add(()=>{(parseFloat(et.text)==0||et.text=="")&&(et.text="0",ze(et,"b")),O==et.name&&(O="")}),et.onTextChangedObservable.add(()=>{O==et.name&&ze(et,"b")}),It.addControl(et,2,2);const fe=new xt;fe.name="Hex Value",fe.width=.82,fe.addRowDefinition(1,!1),fe.addColumnDefinition(.1,!1),fe.addColumnDefinition(.9,!1),ue.addControl(fe,2,0);const mi=new U;mi.text="#",mi.color=u,mi.fontSize=ft,fe.addControl(mi,0,0);const H=new j;H.width=.96,H.height=.72,H.name="hexField",H.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,H.fontSize=ft;const Is=e.lastColor.split("#");H.text=Is[1],H.color=Ie,H.background=Pe,H.onFocusObservable.add(()=>{O=H.name,St=H.text,Dt(!1)}),H.onBlurObservable.add(()=>{if(H.text.length==3){const P=H.text.split("");H.text=P[0]+P[0]+P[1]+P[1]+P[2]+P[2]}H.text==""&&(H.text="000000",Vt(E.FromHexString(H.text),"b")),O==H.name&&(O="")}),H.onTextChangedObservable.add(()=>{let P=H.text;const M=/[^0-9A-F]/i.test(P);if((H.text.length>6||M)&&O==H.name)H.text=St;else{if(H.text.length<6){const I=6-H.text.length;for(let wt=0;wt<I;wt++)P="0"+P}if(H.text.length==3){const I=H.text.split("");P=I[0]+I[0]+I[1]+I[1]+I[2]+I[2]}P="#"+P,O==H.name&&(St=H.text,Vt(E.FromHexString(P),H.name))}}),fe.addControl(H,0,1),e.savedColors&&e.savedColors.length>0&&Ri("",$);function Vt(P,M){O=M;const I=P.toHexString();if(te.background=I,rt.name!=O&&(rt.text=Math.floor(P.r*255).toString()),at.name!=O&&(at.text=Math.floor(P.g*255).toString()),nt.name!=O&&(nt.text=Math.floor(P.b*255).toString()),J.name!=O&&(J.text=P.r.toString()),tt.name!=O&&(tt.text=P.g.toString()),et.name!=O&&(et.text=P.b.toString()),H.name!=O){const wt=I.split("#");H.text=wt[1]}Mt.name!=O&&(Mt.value=P)}function Ve(P,M){let I=P.text;if(/[^0-9]/g.test(I)){P.text=St;return}else I!=""&&(Math.floor(parseInt(I))<0?I="0":Math.floor(parseInt(I))>255?I="255":isNaN(parseInt(I))&&(I="0")),O==P.name&&(St=I);if(I!=""){I=parseInt(I).toString(),P.text=I;const it=E.FromHexString(te.background);O==P.name&&(M=="r"?Vt(new E(parseInt(I)/255,it.g,it.b),P.name):M=="g"?Vt(new E(it.r,parseInt(I)/255,it.b),P.name):Vt(new E(it.r,it.g,parseInt(I)/255),P.name))}}function ze(P,M){let I=P.text;if(/[^0-9.]/g.test(I)){P.text=St;return}else I!=""&&I!="."&&parseFloat(I)!=0&&(parseFloat(I)<0?I="0.0":parseFloat(I)>1?I="1.0":isNaN(parseFloat(I))&&(I="0.0")),O==P.name&&(St=I);I!=""&&I!="."&&parseFloat(I)!=0?(I=parseFloat(I).toString(),P.text=I):I="0.0";const it=E.FromHexString(te.background);O==P.name&&(M=="r"?Vt(new E(parseFloat(I),it.g,it.b),P.name):M=="g"?Vt(new E(it.r,parseFloat(I),it.b),P.name):Vt(new E(it.r,it.g,parseFloat(I)),P.name))}function xs(P){e.savedColors&&e.savedColors.splice(P,1),e.savedColors&&e.savedColors.length==0&&(Bi(!1),he=!1)}function ys(){if(e.savedColors&&e.savedColors[xe]){let P;he?P="b":P="";const M=qt.CreateSimpleButton("Swatch_"+xe,P);M.fontFamily="coreglyphs";const I=E.FromHexString(e.savedColors[xe]);I.r+I.g+I.b>Yt?M.color=je:M.color=_i,M.fontSize=Math.floor(_*.7),M.textBlock.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,M.height=M.width=_.toString()+"px",M.background=e.savedColors[xe],M.thickness=2;const it=xe;return M.pointerDownAnimation=()=>{M.thickness=4},M.pointerUpAnimation=()=>{M.thickness=3},M.pointerEnterAnimation=()=>{M.thickness=3},M.pointerOutAnimation=()=>{M.thickness=2},M.onPointerClickObservable.add(()=>{he?(xs(it),Ri("",$)):e.savedColors&&Vt(E.FromHexString(e.savedColors[it]),M.name)}),M}else return null}function Dt(P){P!==void 0&&(he=P);let M;if(he){for(let I=0;I<Z.children.length;I++)M=Z.children[I],M.textBlock.text="b";X!==void 0&&(X.textBlock.text="Done")}else{for(let I=0;I<Z.children.length;I++)M=Z.children[I],M.textBlock.text="";X!==void 0&&(X.textBlock.text="Edit")}}function Ri(P,M){if(e.savedColors){P!=""&&e.savedColors.push(P),xe=0,Z.clearControls();const I=Math.ceil(e.savedColors.length/e.numSwatchesPerLine);let wt;if(I==0?wt=0:wt=I+1,Z.rowCount!=I+wt){const it=Z.rowCount;for(let jt=0;jt<it;jt++)Z.removeRowDefinition(0);for(let jt=0;jt<I+wt;jt++)jt%2?Z.addRowDefinition(_,!0):Z.addRowDefinition(r,!0)}Z.height=(_*I+wt*r).toString()+"px";for(let it=1,jt=1;it<I+wt;it+=2,jt++){let Mi;e.savedColors.length>jt*e.numSwatchesPerLine?Mi=e.numSwatchesPerLine:Mi=e.savedColors.length-(jt-1)*e.numSwatchesPerLine;const Ts=Math.min(Math.max(Mi,0),e.numSwatchesPerLine);for(let wi=0,Ki=1;wi<Ts;wi++){if(wi>e.numSwatchesPerLine)continue;const ji=ys();if(ji!=null)Z.addControl(ji,it,Ki),Ki+=2,xe++;else continue}}e.savedColors.length>=e.swatchLimit?Ci(M,!0):Ci(M,!1)}}function Bi(P){P?(X=qt.CreateSimpleButton("butEdit","Edit"),X.width=Ce,X.height=ke,X.left=Math.floor(parseInt(Ce)*.1).toString()+"px",X.top=(parseFloat(X.left)*-1).toString()+"px",X.verticalAlignment=f.VERTICAL_ALIGNMENT_BOTTOM,X.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,X.thickness=2,X.color=u,X.fontSize=ft,X.background=m,X.onPointerEnterObservable.add(()=>{X.background=b}),X.onPointerOutObservable.add(()=>{X.background=m}),X.pointerDownAnimation=()=>{X.background=w},X.pointerUpAnimation=()=>{X.background=b},X.onPointerClickObservable.add(()=>{he?he=!1:he=!0,Dt()}),ye.addControl(X,1,0)):ye.removeControl(X)}function Ci(P,M){M?(P.color=ut,P.background=kt):(P.color=u,P.background=m)}function Si(P){e.savedColors&&e.savedColors.length>0?i({savedColors:e.savedColors,pickedColor:P}):i({pickedColor:P}),t.removeControl(Qt)}})}}Rt._Epsilon=1e-6;n([l()],Rt.prototype,"value",null);n([l()],Rt.prototype,"width",null);n([l()],Rt.prototype,"height",null);n([l()],Rt.prototype,"size",null);k("BABYLON.GUI.ColorPicker",Rt);class cs extends yt{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}constructor(t){super(t),this.name=t,this._thickness=1}_getTypeName(){return"Ellipse"}_localDraw(t){t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),f.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._thickness/2,this._currentMeasure.height/2-this._thickness/2,t),(this._backgroundGradient||this._background)&&(t.fillStyle=this._getBackgroundColor(t),t.fill()),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this._thickness&&(this.color&&(t.strokeStyle=this.color),t.lineWidth=this._thickness,t.stroke()),t.restore()}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._measureForChildren.width-=2*this._thickness,this._measureForChildren.height-=2*this._thickness,this._measureForChildren.left+=this._thickness,this._measureForChildren.top+=this._thickness}_clipForChildren(t){f.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2,this._currentMeasure.height/2,t),t.clip()}_renderHighlightSpecific(t){f.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._highlightLineWidth/2,this._currentMeasure.height/2-this._highlightLineWidth/2,t),t.stroke()}}n([l()],cs.prototype,"thickness",null);k("BABYLON.GUI.Ellipse",cs);class js extends qt{constructor(t){super(t),this.name=t,this.focusedColor=null,this._isFocused=!1,this._unfocusedColor=null,this.onFocusObservable=new x,this.onBlurObservable=new x,this.onKeyboardEventProcessedObservable=new x,this._unfocusedColor=this.color}onBlur(){this._isFocused&&(this._isFocused=!1,this.focusedColor&&this._unfocusedColor!=null&&(this.color=this._unfocusedColor),this.onBlurObservable.notifyObservers(this))}onFocus(){this._isFocused=!0,this.focusedColor&&(this._unfocusedColor=this.color,this.color=this.focusedColor),this.onFocusObservable.notifyObservers(this)}keepsFocusWith(){return null}focus(){this._host.moveFocusToControl(this)}blur(){this._host.focusedControl=null}processKeyboard(t){this.onKeyboardEventProcessedObservable.notifyObservers(t,-1,this)}_onPointerDown(t,e,i,s,o){return this.isReadOnly||this.focus(),super._onPointerDown(t,e,i,s,o)}displose(){super.dispose(),this.onBlurObservable.clear(),this.onFocusObservable.clear(),this.onKeyboardEventProcessedObservable.clear()}}k("BABYLON.GUI.FocusableButton",js);class Ge extends j{get outlineWidth(){return this._outlineWidth}set outlineWidth(t){this._outlineWidth!==t&&(this._outlineWidth=t,this._markAsDirty())}get outlineColor(){return this._outlineColor}set outlineColor(t){this._outlineColor!==t&&(this._outlineColor=t,this._markAsDirty())}get autoStretchHeight(){return this._autoStretchHeight}set autoStretchHeight(t){this._autoStretchHeight!==t&&(this._autoStretchHeight=t,this._markAsDirty())}set height(t){this.fixedRatioMasterIsWidth=!1,this._height.toString(this._host)!==t&&(this._height.fromString(t)&&this._markAsDirty(),this._autoStretchHeight=!1)}get maxHeight(){return this._maxHeight.toString(this._host)}get maxHeightInPixels(){return this._maxHeight.getValueInPixel(this._host,this._cachedParentMeasure.height)}set maxHeight(t){this._maxHeight.toString(this._host)!==t&&this._maxHeight.fromString(t)&&this._markAsDirty()}constructor(t,e=""){super(t),this.name=t,this._textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._textVerticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._lineSpacing=new R(0),this._outlineWidth=0,this._outlineColor="white",this._maxHeight=new R(1,R.UNITMODE_PERCENTAGE,!1),this.onLinesReadyObservable=new x,this.text=e,this.isPointerBlocker=!0,this.onLinesReadyObservable.add(()=>this._updateCursorPosition()),this._highlightCursorInfo={initialStartIndex:-1,initialRelativeStartIndex:-1,initialLineIndex:-1},this._cursorInfo={globalStartIndex:0,globalEndIndex:0,relativeEndIndex:0,relativeStartIndex:0,currentLineIndex:0}}_getTypeName(){return"InputTextArea"}processKeyboard(t){this.alternativeProcessKey(t.code,t.key,t),this.onKeyboardEventProcessedObservable.notifyObservers(t)}alternativeProcessKey(t,e,i){if(!(i&&(i.ctrlKey||i.metaKey)&&(t==="KeyC"||t==="KeyV"||t==="KeyX"))){switch(t){case"KeyA":if(i&&(i.ctrlKey||i.metaKey)){this._selectAllText(),i.preventDefault();return}break;case"Period":i&&i.shiftKey&&i.preventDefault();break;case"Backspace":!this._isTextHighlightOn&&this._cursorInfo.globalStartIndex>0&&(this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex--),this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,i&&i.preventDefault(),this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();break;case"Delete":!this._isTextHighlightOn&&this._cursorInfo.globalEndIndex<this.text.length&&(this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex+1),this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,i&&i.preventDefault(),this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();break;case"Enter":this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,`
`),this._cursorInfo.globalStartIndex++,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();return;case"End":this._cursorInfo.globalStartIndex=this.text.length,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._markAsDirty();return;case"Home":this._cursorInfo.globalStartIndex=0,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._markAsDirty();return;case"ArrowLeft":if(this._markAsDirty(),i&&i.shiftKey){(i.ctrlKey||i.metaKey)&&(this._cursorInfo.globalStartIndex-=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex),this._isTextHighlightOn?this._cursorInfo.globalEndIndex>this._highlightCursorInfo.initialStartIndex?this._cursorInfo.globalEndIndex--:this._cursorInfo.globalStartIndex--:(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex--,this._isTextHighlightOn=!0),this._blinkIsEven=!0,i.preventDefault();return}this._isTextHighlightOn?this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex:i&&(i.ctrlKey||i.metaKey)?(this._cursorInfo.globalStartIndex-=this._cursorInfo.relativeStartIndex,i.preventDefault()):this._cursorInfo.globalStartIndex>0&&this._cursorInfo.globalStartIndex--,this._blinkIsEven=!1,this._isTextHighlightOn=!1;return;case"ArrowRight":if(this._markAsDirty(),i&&i.shiftKey){if(i.ctrlKey||i.metaKey){const s=this._lines[this._cursorInfo.currentLineIndex].text.length-this._cursorInfo.relativeEndIndex-1;this._cursorInfo.globalEndIndex+=s,this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex}this._isTextHighlightOn?this._cursorInfo.globalStartIndex<this._highlightCursorInfo.initialStartIndex?this._cursorInfo.globalStartIndex++:this._cursorInfo.globalEndIndex++:(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex++,this._isTextHighlightOn=!0),this._blinkIsEven=!0,i.preventDefault();return}if(this._isTextHighlightOn)this._cursorInfo.globalStartIndex=this._cursorInfo.globalEndIndex;else if(i&&(i.ctrlKey||i.metaKey)){const s=this._lines[this._cursorInfo.currentLineIndex].text.length-this._cursorInfo.relativeEndIndex;this._cursorInfo.globalStartIndex+=s}else this._cursorInfo.globalStartIndex<this.text.length&&this._cursorInfo.globalStartIndex++;this._blinkIsEven=!1,this._isTextHighlightOn=!1;return;case"ArrowUp":if(this._blinkIsEven=!1,i&&(i.shiftKey?(this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex),this._isTextHighlightOn=!0,this._blinkIsEven=!0):this._isTextHighlightOn=!1,i.preventDefault()),this._cursorInfo.currentLineIndex===0)this._cursorInfo.globalStartIndex=0;else{const s=this._lines[this._cursorInfo.currentLineIndex],o=this._lines[this._cursorInfo.currentLineIndex-1];let r=0,a=0;!this._isTextHighlightOn||this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(r=this._cursorInfo.globalStartIndex,a=this._cursorInfo.relativeStartIndex):(r=this._cursorInfo.globalEndIndex,a=this._cursorInfo.relativeEndIndex);const _=s.text.substr(0,a),h=this._contextForBreakLines.measureText(_).width;let d=0,u=0;r-=a,r-=o.text.length+o.lineEnding.length;let m=0;for(;d<h&&m<o.text.length;)r++,m++,u=Math.abs(h-d),d=this._contextForBreakLines.measureText(o.text.substr(0,m)).width;Math.abs(h-d)>u&&m>0&&r--,this._isTextHighlightOn?this._cursorInfo.currentLineIndex<=this._highlightCursorInfo.initialLineIndex?(this._cursorInfo.globalStartIndex=r,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeEndIndex=this._highlightCursorInfo.initialRelativeStartIndex):this._cursorInfo.globalEndIndex=r:this._cursorInfo.globalStartIndex=r}this._markAsDirty();return;case"ArrowDown":if(this._blinkIsEven=!1,i&&(i.shiftKey?(this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex),this._isTextHighlightOn=!0,this._blinkIsEven=!0):this._isTextHighlightOn=!1,i.preventDefault()),this._cursorInfo.currentLineIndex===this._lines.length-1)this._cursorInfo.globalStartIndex=this.text.length;else{const s=this._lines[this._cursorInfo.currentLineIndex],o=this._lines[this._cursorInfo.currentLineIndex+1];let r=0,a=0;!this._isTextHighlightOn||this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(r=this._cursorInfo.globalStartIndex,a=this._cursorInfo.relativeStartIndex):(r=this._cursorInfo.globalEndIndex,a=this._cursorInfo.relativeEndIndex);const _=s.text.substr(0,a),h=this._contextForBreakLines.measureText(_).width;let d=0,u=0;r+=s.text.length-a+s.lineEnding.length;let m=0;for(;d<h&&m<o.text.length;)r++,m++,u=Math.abs(h-d),d=this._contextForBreakLines.measureText(o.text.substr(0,m)).width;Math.abs(h-d)>u&&m>0&&r--,this._isTextHighlightOn?this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(this._cursorInfo.globalStartIndex=r,this._cursorInfo.globalStartIndex>this._cursorInfo.globalEndIndex&&(this._cursorInfo.globalEndIndex+=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex=this._cursorInfo.globalEndIndex-this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex-=this._cursorInfo.globalStartIndex)):(this._cursorInfo.globalEndIndex=r,this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex):this._cursorInfo.globalStartIndex=r}this._markAsDirty();return}(e==null?void 0:e.length)===1&&(i==null||i.preventDefault(),this._currentKey=e,this.onBeforeKeyAddObservable.notifyObservers(this),e=this._currentKey,this._addKey&&(this._isTextHighlightOn=!1,this._blinkIsEven=!1,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,e),this._cursorInfo.globalStartIndex+=e.length,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._textHasChanged()))}}_parseLineWordWrap(t="",e,i){const s=[],o=t.split(" ");let r=0;for(let a=0;a<o.length;a++){const _=a>0?t+" "+o[a]:o[0],d=i.measureText(_).width;if(d>e){a>0&&(r=i.measureText(t).width,s.push({text:t,width:r,lineEnding:" "})),t=o[a];let u="";t.split("").map(m=>{i.measureText(u+m).width>e&&(s.push({text:u,width:i.measureText(u).width,lineEnding:`
`}),u=""),u+=m}),t=u,r=i.measureText(t).width}else r=d,t=_}return s.push({text:t,width:r,lineEnding:" "}),s}_breakLines(t,e){const i=[],s=this.text.split(`
`);if(this.clipContent)for(const o of s)i.push(...this._parseLineWordWrap(o,t,e));else for(const o of s)i.push(this._parseLine(o,e));return i[i.length-1].lineEnding=`
`,i}_parseLine(t="",e){return{text:t,width:e.measureText(t).width,lineEnding:" "}}_preMeasure(t,e){(!this._fontOffset||this._wasDirty)&&(this._fontOffset=f._GetFontOffset(e.font));let i=this._beforeRenderText(this._textWrapper).text;!this._isFocused&&!this.text&&this._placeholderText&&(i=this._placeholderText,this._placeholderColor&&(e.fillStyle=this._placeholderColor)),this._textWidth=e.measureText(i).width;const s=this._margin.getValueInPixel(this._host,t.width)*2;if(this._autoStretchWidth){const r=i.split(`
`).reduce((_,h)=>{const d=e.measureText(h).width,u=e.measureText(_).width;return d>u?h:_},""),a=e.measureText(r).width;this.width=Math.min(this._maxWidth.getValueInPixel(this._host,t.width),a+s)+"px",this.autoStretchWidth=!0}if(this._availableWidth=this._width.getValueInPixel(this._host,t.width)-s,this._lines=this._breakLines(this._availableWidth,e),this._contextForBreakLines=e,this._autoStretchHeight){const r=this._lines.length*this._fontOffset.height+this._margin.getValueInPixel(this._host,t.height)*2;this.height=Math.min(this._maxHeight.getValueInPixel(this._host,t.height),r)+"px",this._autoStretchHeight=!0}if(this._availableHeight=this._height.getValueInPixel(this._host,t.height)-s,this._isFocused){this._cursorInfo.currentLineIndex=0;let o=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length,r=0;for(;r+o<=this._cursorInfo.globalStartIndex;)r+=o,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,o=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length)}}_computeScroll(){if(this._clipTextLeft=this._currentMeasure.left+this._margin.getValueInPixel(this._host,this._cachedParentMeasure.width),this._clipTextTop=this._currentMeasure.top+this._margin.getValueInPixel(this._host,this._cachedParentMeasure.height),this._isFocused&&this._lines[this._cursorInfo.currentLineIndex].width>this._availableWidth){const t=this._clipTextLeft-this._lines[this._cursorInfo.currentLineIndex].width+this._availableWidth;this._scrollLeft||(this._scrollLeft=t)}else this._scrollLeft=this._clipTextLeft;if(this._isFocused&&!this._autoStretchHeight){const t=(this._cursorInfo.currentLineIndex+1)*this._fontOffset.height,e=this._clipTextTop-t;this._scrollTop||(this._scrollTop=e)}else this._scrollTop=this._clipTextTop}_additionalProcessing(){this.highlightedText="",this.onLinesReadyObservable.notifyObservers(this)}_drawText(t,e,i,s){const o=this._currentMeasure.width;let r=this._scrollLeft;switch(this._textHorizontalAlignment){case f.HORIZONTAL_ALIGNMENT_LEFT:r+=0;break;case f.HORIZONTAL_ALIGNMENT_RIGHT:r+=o-e;break;case f.HORIZONTAL_ALIGNMENT_CENTER:r+=(o-e)/2;break}(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(s.shadowColor=this.shadowColor,s.shadowBlur=this.shadowBlur,s.shadowOffsetX=this.shadowOffsetX,s.shadowOffsetY=this.shadowOffsetY),this.outlineWidth&&s.strokeText(t,this._currentMeasure.left+r,i),s.fillText(t,r,i)}_onCopyText(t){this._isTextHighlightOn=!1;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch{}this._host.clipboardData=this._highlightedText}_onCutText(t){if(this._highlightedText){try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch{}this._host.clipboardData=this._highlightedText,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._textHasChanged()}}_onPasteText(t){let e="";t.clipboardData&&t.clipboardData.types.indexOf("text/plain")!==-1?e=t.clipboardData.getData("text/plain"):e=this._host.clipboardData,this._isTextHighlightOn=!1,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,e);const i=e.length-(this._cursorInfo.globalEndIndex-this._cursorInfo.globalStartIndex);this._cursorInfo.globalStartIndex+=i,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._textHasChanged()}_draw(t){var e,i;this._computeScroll(),this._scrollLeft=(e=this._scrollLeft)!==null&&e!==void 0?e:0,this._scrollTop=(i=this._scrollTop)!==null&&i!==void 0?i:0,t.save(),this._applyStates(t),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._isFocused?this._focusedBackground&&(t.fillStyle=this._isEnabled?this._focusedBackground:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)):this._background&&(t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this.color&&(t.fillStyle=this.color);const s=this._currentMeasure.height,o=this._currentMeasure.width;let r=0;switch(this._textVerticalAlignment){case f.VERTICAL_ALIGNMENT_TOP:r=this._fontOffset.ascent;break;case f.VERTICAL_ALIGNMENT_BOTTOM:r=s-this._fontOffset.height*(this._lines.length-1)-this._fontOffset.descent;break;case f.VERTICAL_ALIGNMENT_CENTER:r=this._fontOffset.ascent+(s-this._fontOffset.height*this._lines.length)/2;break}t.save(),t.beginPath(),t.fillStyle=this.fontStyle,t.rect(this._clipTextLeft,this._clipTextTop,this._availableWidth+2,this._availableHeight+2),t.clip(),r+=this._scrollTop;for(let a=0;a<this._lines.length;a++){const _=this._lines[a];a!==0&&this._lineSpacing.internalValue!==0&&(this._lineSpacing.isPixel?r+=this._lineSpacing.getValue(this._host):r=r+this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)),this._drawText(_.text,_.width,r,t),r+=this._fontOffset.height}if(t.restore(),this._isFocused){if(!this._blinkIsEven||this._isTextHighlightOn){let a=this._scrollLeft+t.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0,this._cursorInfo.relativeStartIndex)).width;a<this._clipTextLeft?(this._scrollLeft+=this._clipTextLeft-a,a=this._clipTextLeft,this._markAsDirty()):a>this._clipTextLeft+this._availableWidth&&(this._scrollLeft+=this._clipTextLeft+this._availableWidth-a,a=this._clipTextLeft+this._availableWidth,this._markAsDirty());let _=this._scrollTop+this._cursorInfo.currentLineIndex*this._fontOffset.height;_<this._clipTextTop?(this._scrollTop+=this._clipTextTop-_,_=this._clipTextTop,this._markAsDirty()):_+this._fontOffset.height>this._clipTextTop+this._availableHeight&&(this._scrollTop+=this._clipTextTop+this._availableHeight-_-this._fontOffset.height,_=this._clipTextTop+this._availableHeight-this._fontOffset.height,this._markAsDirty()),this._isTextHighlightOn||t.fillRect(a,_,2,this._fontOffset.height)}if(this._resetBlinking(),this._isTextHighlightOn){clearTimeout(this._blinkTimeout),this._highlightedText=this.text.substring(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),t.globalAlpha=this._highligherOpacity,t.fillStyle=this._textHighlightColor;const a=Math.min(this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialLineIndex),_=Math.max(this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialLineIndex);let h=this._scrollTop+a*this._fontOffset.height;for(let d=a;d<=_;d++){const u=this._lines[d];let m=this._scrollLeft;switch(this._textHorizontalAlignment){case f.HORIZONTAL_ALIGNMENT_LEFT:m+=0;break;case f.HORIZONTAL_ALIGNMENT_RIGHT:m+=o-u.width;break;case f.HORIZONTAL_ALIGNMENT_CENTER:m+=(o-u.width)/2;break}const b=d===a?this._cursorInfo.relativeStartIndex:0,w=d===_?this._cursorInfo.relativeEndIndex:u.text.length,ut=t.measureText(u.text.substr(0,b)).width,kt=u.text.substring(b,w),bt=t.measureText(kt).width;t.fillRect(m+ut,h,bt,this._fontOffset.height),h+=this._fontOffset.height}this._cursorInfo.globalEndIndex===this._cursorInfo.globalStartIndex&&this._resetBlinking()}}t.restore(),this._thickness&&(this._isFocused?this.focusedColor&&(t.strokeStyle=this.focusedColor):this.color&&(t.strokeStyle=this.color),t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness))}_resetBlinking(){clearTimeout(this._blinkTimeout),this._blinkTimeout=setTimeout(()=>{this._blinkIsEven=!this._blinkIsEven,this._markAsDirty()},500)}_applyStates(t){super._applyStates(t),this.outlineWidth&&(t.lineWidth=this.outlineWidth,t.strokeStyle=this.outlineColor)}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(this._clickedCoordinateX=e.x,this._clickedCoordinateY=e.y,this._isTextHighlightOn=!1,this._highlightedText="",this._isPointerDown=!0,this._host._capturingControl[i]=this,this._host.focusedControl===this?(clearTimeout(this._blinkTimeout),this._markAsDirty(),!0):this._isEnabled?(this._host.focusedControl=this,!0):!1):!1}_onPointerMove(t,e,i,s){s.event.movementX===0&&s.event.movementY===0||(this._host.focusedControl===this&&this._isPointerDown&&(this._clickedCoordinateX=e.x,this._clickedCoordinateY=e.y,this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._isTextHighlightOn=!0),this._markAsDirty()),super._onPointerMove(t,e,i,s))}_updateCursorPosition(){var t;if(this._isFocused)if(this._clickedCoordinateX&&this._clickedCoordinateY){this._isTextHighlightOn||(this._cursorInfo={globalStartIndex:0,globalEndIndex:0,relativeStartIndex:0,relativeEndIndex:0,currentLineIndex:0});let e=0,i=0;const s=this._clickedCoordinateY-this._scrollTop,o=Math.floor(s/this._fontOffset.height);this._cursorInfo.currentLineIndex=Math.min(Math.max(o,0),this._lines.length-1);let r=0;const a=this._clickedCoordinateX-((t=this._scrollLeft)!==null&&t!==void 0?t:0);let _=0;for(let h=0;h<this._cursorInfo.currentLineIndex;h++){const d=this._lines[h];e+=d.text.length+d.lineEnding.length}for(;r<a&&this._lines[this._cursorInfo.currentLineIndex].text.length>i;)i++,_=Math.abs(a-r),r=this._contextForBreakLines.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0,i)).width;Math.abs(a-r)>_&&i>0&&i--,e+=i,this._isTextHighlightOn?e<this._highlightCursorInfo.initialStartIndex?(this._cursorInfo.globalStartIndex=e,this._cursorInfo.relativeStartIndex=i,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeEndIndex=this._highlightCursorInfo.initialRelativeStartIndex):(this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeStartIndex=this._highlightCursorInfo.initialRelativeStartIndex,this._cursorInfo.globalEndIndex=e,this._cursorInfo.relativeEndIndex=i):(this._cursorInfo.globalStartIndex=e,this._cursorInfo.relativeStartIndex=i,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.relativeEndIndex=this._cursorInfo.relativeStartIndex),this._blinkIsEven=this._isTextHighlightOn,this._clickedCoordinateX=null,this._clickedCoordinateY=null}else{this._cursorInfo.relativeStartIndex=0,this._cursorInfo.currentLineIndex=0;let e=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length,i=0;for(;i+e<=this._cursorInfo.globalStartIndex;)i+=e,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,e=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length);if(this._cursorInfo.relativeStartIndex=this._cursorInfo.globalStartIndex-i,this._highlightCursorInfo.initialStartIndex!==-1&&this._cursorInfo.globalStartIndex>=this._highlightCursorInfo.initialStartIndex){for(;i+e<=this._cursorInfo.globalEndIndex;)i+=e,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,e=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length);this._cursorInfo.relativeEndIndex=this._cursorInfo.globalEndIndex-i}else this._isTextHighlightOn||(this._cursorInfo.relativeEndIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex)}}_updateValueFromCursorIndex(t){}_processDblClick(t){let e,i;do e=this._cursorInfo.globalStartIndex>0&&this._textWrapper.isWord(this._cursorInfo.globalStartIndex-1)?--this._cursorInfo.globalStartIndex:0,i=this._cursorInfo.globalEndIndex<this._textWrapper.length&&this._textWrapper.isWord(this._cursorInfo.globalEndIndex)?++this._cursorInfo.globalEndIndex:0;while(e||i);this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this.onTextHighlightObservable.notifyObservers(this),this._isTextHighlightOn=!0,this._blinkIsEven=!0,this._markAsDirty()}_selectAllText(){this._isTextHighlightOn=!0,this._blinkIsEven=!0,this._highlightCursorInfo={initialStartIndex:0,initialRelativeStartIndex:0,initialLineIndex:0},this._cursorInfo={globalStartIndex:0,globalEndIndex:this._textWrapper.length,relativeEndIndex:this._lines[this._lines.length-1].text.length,relativeStartIndex:0,currentLineIndex:this._lines.length-1},this._markAsDirty()}dipose(){super.dispose(),this.onLinesReadyObservable.clear()}}n([l()],Ge.prototype,"autoStretchHeight",null);n([l()],Ge.prototype,"maxHeight",null);k("BABYLON.GUI.InputTextArea",Ge);class qs extends j{_getTypeName(){return"InputPassword"}_beforeRenderText(t){const e=new Vi;let i="";for(let s=0;s<t.length;s++)i+="•";return e.text=i,e}}k("BABYLON.GUI.InputPassword",qs);class Ae extends f{get dash(){return this._dash}set dash(t){this._dash!==t&&(this._dash=t,this._markAsDirty())}get connectedControl(){return this._connectedControl}set connectedControl(t){this._connectedControl!==t&&(this._connectedControlDirtyObserver&&this._connectedControl&&(this._connectedControl.onDirtyObservable.remove(this._connectedControlDirtyObserver),this._connectedControlDirtyObserver=null),t&&(this._connectedControlDirtyObserver=t.onDirtyObservable.add(()=>this._markAsDirty())),this._connectedControl=t,this._markAsDirty())}get x1(){return this._x1.toString(this._host)}set x1(t){this._x1.toString(this._host)!==t&&this._x1.fromString(t)&&this._markAsDirty()}get y1(){return this._y1.toString(this._host)}set y1(t){this._y1.toString(this._host)!==t&&this._y1.fromString(t)&&this._markAsDirty()}get x2(){return this._x2.toString(this._host)}set x2(t){this._x2.toString(this._host)!==t&&this._x2.fromString(t)&&this._markAsDirty()}get y2(){return this._y2.toString(this._host)}set y2(t){this._y2.toString(this._host)!==t&&this._y2.fromString(t)&&this._markAsDirty()}get lineWidth(){return this._lineWidth}set lineWidth(t){this._lineWidth!==t&&(this._lineWidth=t,this._markAsDirty())}set horizontalAlignment(t){}set verticalAlignment(t){}get _effectiveX2(){return(this._connectedControl?this._connectedControl.centerX:0)+this._x2.getValue(this._host)}get _effectiveY2(){return(this._connectedControl?this._connectedControl.centerY:0)+this._y2.getValue(this._host)}constructor(t){super(t),this.name=t,this._lineWidth=1,this._x1=new R(0),this._y1=new R(0),this._x2=new R(0),this._y2=new R(0),this._dash=new Array,this._automaticSize=!0,this.isHitTestVisible=!1,this._horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._verticalAlignment=f.VERTICAL_ALIGNMENT_TOP}_getTypeName(){return"Line"}_draw(t){t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._applyStates(t),t.strokeStyle=this._getColor(t),t.lineWidth=this._lineWidth,t.setLineDash(this._dash),t.beginPath(),t.moveTo(this._cachedParentMeasure.left+this._x1.getValue(this._host),this._cachedParentMeasure.top+this._y1.getValue(this._host)),t.lineTo(this._cachedParentMeasure.left+this._effectiveX2,this._cachedParentMeasure.top+this._effectiveY2),t.stroke(),t.restore()}_measure(){this._currentMeasure.width=Math.abs(this._x1.getValue(this._host)-this._effectiveX2)+this._lineWidth,this._currentMeasure.height=Math.abs(this._y1.getValue(this._host)-this._effectiveY2)+this._lineWidth}_computeAlignment(t){this._currentMeasure.left=t.left+Math.min(this._x1.getValue(this._host),this._effectiveX2)-this._lineWidth/2,this._currentMeasure.top=t.top+Math.min(this._y1.getValue(this._host),this._effectiveY2)-this._lineWidth/2}moveToVector3(t,e,i=!1){if(!this._host||this.parent!==this._host._rootContainer){_t.Error("Cannot move a control to a vector3 if the control is not at root level");return}const s=this._host._getGlobalViewport(),o=c.Project(t,Ct.IdentityReadOnly,e.getTransformMatrix(),s);if(this._moveToProjectedPosition(o,i),o.z<0||o.z>1){this.notRenderable=!0;return}this.notRenderable=!1}_moveToProjectedPosition(t,e=!1){const i=t.x+this._linkOffsetX.getValue(this._host)+"px",s=t.y+this._linkOffsetY.getValue(this._host)+"px";e?(this.x2=i,this.y2=s,this._x2.ignoreAdaptiveScaling=!0,this._y2.ignoreAdaptiveScaling=!0):(this.x1=i,this.y1=s,this._x1.ignoreAdaptiveScaling=!0,this._y1.ignoreAdaptiveScaling=!0)}}n([l()],Ae.prototype,"dash",null);n([l()],Ae.prototype,"x1",null);n([l()],Ae.prototype,"y1",null);n([l()],Ae.prototype,"x2",null);n([l()],Ae.prototype,"y2",null);n([l()],Ae.prototype,"lineWidth",null);k("BABYLON.GUI.Line",Ae);class es{constructor(t){this._multiLine=t,this._x=new R(0),this._y=new R(0),this._point=new c(0,0,0)}get x(){return this._x.toString(this._multiLine._host)}set x(t){this._x.toString(this._multiLine._host)!==t&&this._x.fromString(t)&&this._multiLine._markAsDirty()}get y(){return this._y.toString(this._multiLine._host)}set y(t){this._y.toString(this._multiLine._host)!==t&&this._y.fromString(t)&&this._multiLine._markAsDirty()}get control(){return this._control}set control(t){this._control!==t&&(this._control&&this._controlObserver&&(this._control.onDirtyObservable.remove(this._controlObserver),this._controlObserver=null),this._control=t,this._control&&(this._controlObserver=this._control.onDirtyObservable.add(this._multiLine.onPointUpdate)),this._multiLine._markAsDirty())}get mesh(){return this._mesh}set mesh(t){this._mesh!==t&&(this._mesh&&this._meshObserver&&this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver),this._mesh=t,this._mesh&&(this._meshObserver=this._mesh.getScene().onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate)),this._multiLine._markAsDirty())}resetLinks(){this.control=null,this.mesh=null}translate(){return this._point=this._translatePoint(),this._point}_translatePoint(){if(this._mesh!=null)return this._multiLine._host.getProjectedPositionWithZ(this._mesh.getBoundingInfo().boundingSphere.center,this._mesh.getWorldMatrix());if(this._control!=null)return new c(this._control.centerX,this._control.centerY,1-pt);{const t=this._multiLine._host,e=this._x.getValueInPixel(t,Number(t._canvas.width)),i=this._y.getValueInPixel(t,Number(t._canvas.height));return new c(e,i,1-pt)}}dispose(){this.resetLinks()}}class ds extends f{constructor(t){super(t),this.name=t,this._lineWidth=1,this.onPointUpdate=()=>{this._markAsDirty()},this._automaticSize=!0,this.isHitTestVisible=!1,this._horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._dash=[],this._points=[]}get dash(){return this._dash}set dash(t){this._dash!==t&&(this._dash=t,this._markAsDirty())}getAt(t){return this._points[t]||(this._points[t]=new es(this)),this._points[t]}add(...t){return t.map(e=>this.push(e))}push(t){const e=this.getAt(this._points.length);return t==null||(t instanceof ei?e.mesh=t:t instanceof f?e.control=t:t.x!=null&&t.y!=null&&(e.x=t.x,e.y=t.y)),e}remove(t){let e;if(t instanceof es){if(e=this._points.indexOf(t),e===-1)return}else e=t;const i=this._points[e];i&&(i.dispose(),this._points.splice(e,1))}reset(){for(;this._points.length>0;)this.remove(this._points.length-1)}resetLinks(){this._points.forEach(t=>{t!=null&&t.resetLinks()})}get lineWidth(){return this._lineWidth}set lineWidth(t){this._lineWidth!==t&&(this._lineWidth=t,this._markAsDirty())}set horizontalAlignment(t){}set verticalAlignment(t){}_getTypeName(){return"MultiLine"}_draw(t){t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._applyStates(t),t.strokeStyle=this.color,t.lineWidth=this._lineWidth,t.setLineDash(this._dash),t.beginPath();let e=!0,i;this._points.forEach(s=>{s&&(e?(t.moveTo(s._point.x,s._point.y),e=!1):s._point.z<1&&i.z<1?t.lineTo(s._point.x,s._point.y):t.moveTo(s._point.x,s._point.y),i=s._point)}),t.stroke(),t.restore()}_additionalProcessing(){this._minX=null,this._minY=null,this._maxX=null,this._maxY=null,this._points.forEach(t=>{t&&(t.translate(),(this._minX==null||t._point.x<this._minX)&&(this._minX=t._point.x),(this._minY==null||t._point.y<this._minY)&&(this._minY=t._point.y),(this._maxX==null||t._point.x>this._maxX)&&(this._maxX=t._point.x),(this._maxY==null||t._point.y>this._maxY)&&(this._maxY=t._point.y))}),this._minX==null&&(this._minX=0),this._minY==null&&(this._minY=0),this._maxX==null&&(this._maxX=0),this._maxY==null&&(this._maxY=0)}_measure(){this._minX==null||this._maxX==null||this._minY==null||this._maxY==null||(this._currentMeasure.width=Math.abs(this._maxX-this._minX)+this._lineWidth,this._currentMeasure.height=Math.abs(this._maxY-this._minY)+this._lineWidth)}_computeAlignment(){this._minX==null||this._minY==null||(this._currentMeasure.left=this._minX-this._lineWidth/2,this._currentMeasure.top=this._minY-this._lineWidth/2)}dispose(){this.reset(),super.dispose()}}n([l()],ds.prototype,"dash",null);k("BABYLON.GUI.MultiLine",ds);class ve extends f{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get checkSizeRatio(){return this._checkSizeRatio}set checkSizeRatio(t){t=Math.max(Math.min(1,t),0),this._checkSizeRatio!==t&&(this._checkSizeRatio=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get isChecked(){return this._isChecked}set isChecked(t){this._isChecked!==t&&(this._isChecked=t,this._markAsDirty(),this.onIsCheckedChangedObservable.notifyObservers(t),this._isChecked&&this._host&&this._host.executeOnAllControls(e=>{if(e===this||e.group===void 0)return;const i=e;i.group===this.group&&(i.isChecked=!1)}))}constructor(t){super(t),this.name=t,this._isChecked=!1,this._background="black",this._checkSizeRatio=.8,this._thickness=1,this.group="",this.onIsCheckedChangedObservable=new x,this.isPointerBlocker=!0}_getTypeName(){return"RadioButton"}_draw(t){t.save(),this._applyStates(t);const e=this._currentMeasure.width-this._thickness,i=this._currentMeasure.height-this._thickness;if((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),f.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._thickness/2,this._currentMeasure.height/2-this._thickness/2,t),t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fill(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),t.strokeStyle=this.color,t.lineWidth=this._thickness,t.stroke(),this._isChecked){t.fillStyle=this._isEnabled?this.color:this._disabledColor;const s=e*this._checkSizeRatio,o=i*this._checkSizeRatio;f.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,s/2-this._thickness/2,o/2-this._thickness/2,t),t.fill()}t.restore()}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(this.isReadOnly||this.isChecked||(this.isChecked=!0),!0):!1}static AddRadioButtonWithHeader(t,e,i,s){const o=new Ot;o.isVertical=!1,o.height="30px";const r=new ve;r.width="20px",r.height="20px",r.isChecked=i,r.color="green",r.group=e,r.onIsCheckedChangedObservable.add(_=>s(r,_)),o.addControl(r);const a=new U;return a.text=t,a.width="180px",a.paddingLeft="5px",a.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,a.color="white",o.addControl(a),o}}n([l()],ve.prototype,"thickness",null);n([l()],ve.prototype,"group",void 0);n([l()],ve.prototype,"checkSizeRatio",null);n([l()],ve.prototype,"background",null);n([l()],ve.prototype,"isChecked",null);k("BABYLON.GUI.RadioButton",ve);class Nt extends f{get displayThumb(){return this._displayThumb}set displayThumb(t){this._displayThumb!==t&&(this._displayThumb=t,this._markAsDirty())}get step(){return this._step}set step(t){this._step!==t&&(this._step=t,this._markAsDirty())}get barOffset(){return this._barOffset.toString(this._host)}get barOffsetInPixels(){return this._barOffset.getValueInPixel(this._host,this._cachedParentMeasure.width)}set barOffset(t){this._barOffset.toString(this._host)!==t&&this._barOffset.fromString(t)&&this._markAsDirty()}get thumbWidth(){return this._thumbWidth.toString(this._host)}get thumbWidthInPixels(){return this._thumbWidth.getValueInPixel(this._host,this._cachedParentMeasure.width)}set thumbWidth(t){this._thumbWidth.toString(this._host)!==t&&this._thumbWidth.fromString(t)&&this._markAsDirty()}get minimum(){return this._minimum}set minimum(t){this._minimum!==t&&(this._minimum=t,this._markAsDirty(),this.value=Math.max(Math.min(this.value,this._maximum),this._minimum))}get maximum(){return this._maximum}set maximum(t){this._maximum!==t&&(this._maximum=t,this._markAsDirty(),this.value=Math.max(Math.min(this.value,this._maximum),this._minimum))}get value(){return this._value}set value(t){t=Math.max(Math.min(t,this._maximum),this._minimum),this._value!==t&&(this._value=t,this._markAsDirty(),this.onValueChangedObservable.notifyObservers(this._value))}get isVertical(){return this._isVertical}set isVertical(t){this._isVertical!==t&&(this._isVertical=t,this._markAsDirty())}get isThumbClamped(){return this._isThumbClamped}set isThumbClamped(t){this._isThumbClamped!==t&&(this._isThumbClamped=t,this._markAsDirty())}constructor(t){super(t),this.name=t,this._thumbWidth=new R(20,R.UNITMODE_PIXEL,!1),this._minimum=0,this._maximum=100,this._value=50,this._isVertical=!1,this._barOffset=new R(5,R.UNITMODE_PIXEL,!1),this._isThumbClamped=!1,this._displayThumb=!0,this._step=0,this._lastPointerDownId=-1,this._effectiveBarOffset=0,this.onValueChangedObservable=new x,this._pointerIsDown=!1,this.isPointerBlocker=!0}_getTypeName(){return"BaseSlider"}_getThumbPosition(){return this.isVertical?(this.maximum-this.value)/(this.maximum-this.minimum)*this._backgroundBoxLength:(this.value-this.minimum)/(this.maximum-this.minimum)*this._backgroundBoxLength}_getThumbThickness(t){let e=0;switch(t){case"circle":this._thumbWidth.isPixel?e=Math.max(this._thumbWidth.getValue(this._host),this._backgroundBoxThickness):e=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host);break;case"rectangle":this._thumbWidth.isPixel?e=Math.min(this._thumbWidth.getValue(this._host),this._backgroundBoxThickness):e=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host)}return e}_prepareRenderingData(t){if(this._effectiveBarOffset=0,this._renderLeft=this._currentMeasure.left,this._renderTop=this._currentMeasure.top,this._renderWidth=this._currentMeasure.width,this._renderHeight=this._currentMeasure.height,this._backgroundBoxLength=Math.max(this._currentMeasure.width,this._currentMeasure.height),this._backgroundBoxThickness=Math.min(this._currentMeasure.width,this._currentMeasure.height),this._effectiveThumbThickness=this._getThumbThickness(t),this.displayThumb&&(this._backgroundBoxLength-=this._effectiveThumbThickness),this.isVertical&&this._currentMeasure.height<this._currentMeasure.width){console.error("Height should be greater than width");return}this._barOffset.isPixel?this._effectiveBarOffset=Math.min(this._barOffset.getValue(this._host),this._backgroundBoxThickness):this._effectiveBarOffset=this._backgroundBoxThickness*this._barOffset.getValue(this._host),this._backgroundBoxThickness-=this._effectiveBarOffset*2,this.isVertical?(this._renderLeft+=this._effectiveBarOffset,!this.isThumbClamped&&this.displayThumb&&(this._renderTop+=this._effectiveThumbThickness/2),this._renderHeight=this._backgroundBoxLength,this._renderWidth=this._backgroundBoxThickness):(this._renderTop+=this._effectiveBarOffset,!this.isThumbClamped&&this.displayThumb&&(this._renderLeft+=this._effectiveThumbThickness/2),this._renderHeight=this._backgroundBoxThickness,this._renderWidth=this._backgroundBoxLength)}_updateValueFromPointer(t,e){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(t,e,this._transformedPosition),t=this._transformedPosition.x,e=this._transformedPosition.y);let i;this._isVertical?i=this._minimum+(1-(e-this._currentMeasure.top)/this._currentMeasure.height)*(this._maximum-this._minimum):i=this._minimum+(t-this._currentMeasure.left)/this._currentMeasure.width*(this._maximum-this._minimum),this.value=this._step?Math.round(i/this._step)*this._step:i}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(this.isReadOnly||(this._pointerIsDown=!0,this._updateValueFromPointer(e.x,e.y),this._host._capturingControl[i]=this,this._lastPointerDownId=i),!0):!1}_onPointerMove(t,e,i,s){i==this._lastPointerDownId&&(this._pointerIsDown&&!this.isReadOnly&&this._updateValueFromPointer(e.x,e.y),super._onPointerMove(t,e,i,s))}_onPointerUp(t,e,i,s,o){this._pointerIsDown=!1,delete this._host._capturingControl[i],super._onPointerUp(t,e,i,s,o)}_onCanvasBlur(){this._forcePointerUp(),super._onCanvasBlur()}}n([l()],Nt.prototype,"displayThumb",null);n([l()],Nt.prototype,"step",null);n([l()],Nt.prototype,"barOffset",null);n([l()],Nt.prototype,"thumbWidth",null);n([l()],Nt.prototype,"minimum",null);n([l()],Nt.prototype,"maximum",null);n([l()],Nt.prototype,"value",null);n([l()],Nt.prototype,"isVertical",null);n([l()],Nt.prototype,"isThumbClamped",null);class Xe extends Nt{get displayValueBar(){return this._displayValueBar}set displayValueBar(t){this._displayValueBar!==t&&(this._displayValueBar=t,this._markAsDirty())}get borderColor(){return this._borderColor}set borderColor(t){this._borderColor!==t&&(this._borderColor=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(t){this._backgroundGradient!==t&&(this._backgroundGradient=t,this._markAsDirty())}get thumbColor(){return this._thumbColor}set thumbColor(t){this._thumbColor!==t&&(this._thumbColor=t,this._markAsDirty())}get isThumbCircle(){return this._isThumbCircle}set isThumbCircle(t){this._isThumbCircle!==t&&(this._isThumbCircle=t,this._markAsDirty())}constructor(t){super(t),this.name=t,this._background="black",this._borderColor="white",this._thumbColor="",this._isThumbCircle=!1,this._displayValueBar=!0,this._backgroundGradient=null}_getTypeName(){return"Slider"}_getBackgroundColor(t){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(t):this._background}_draw(t){t.save(),this._applyStates(t),this._prepareRenderingData(this.isThumbCircle?"circle":"rectangle");let e=this._renderLeft,i=this._renderTop;const s=this._renderWidth,o=this._renderHeight;let r=0;this.isThumbClamped&&this.isThumbCircle?(this.isVertical?i+=this._effectiveThumbThickness/2:e+=this._effectiveThumbThickness/2,r=this._backgroundBoxThickness/2):r=(this._effectiveThumbThickness-this._effectiveBarOffset)/2,(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY);const a=this._getThumbPosition();t.fillStyle=this._getBackgroundColor(t),this.isVertical?this.isThumbClamped?this.isThumbCircle?(t.beginPath(),t.arc(e+this._backgroundBoxThickness/2,i,r,Math.PI,2*Math.PI),t.fill(),t.fillRect(e,i,s,o)):t.fillRect(e,i,s,o+this._effectiveThumbThickness):t.fillRect(e,i,s,o):this.isThumbClamped?this.isThumbCircle?(t.beginPath(),t.arc(e+this._backgroundBoxLength,i+this._backgroundBoxThickness/2,r,0,2*Math.PI),t.fill(),t.fillRect(e,i,s,o)):t.fillRect(e,i,s+this._effectiveThumbThickness,o):t.fillRect(e,i,s,o),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),t.fillStyle=this._getColor(t),this._displayValueBar&&(this.isVertical?this.isThumbClamped?this.isThumbCircle?(t.beginPath(),t.arc(e+this._backgroundBoxThickness/2,i+this._backgroundBoxLength,r,0,2*Math.PI),t.fill(),t.fillRect(e,i+a,s,o-a)):t.fillRect(e,i+a,s,o-a+this._effectiveThumbThickness):t.fillRect(e,i+a,s,o-a):(this.isThumbClamped&&this.isThumbCircle&&(t.beginPath(),t.arc(e,i+this._backgroundBoxThickness/2,r,0,2*Math.PI),t.fill()),t.fillRect(e,i,a,o))),t.fillStyle=this._thumbColor||this._getColor(t),this.displayThumb&&((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._isThumbCircle?(t.beginPath(),this.isVertical?t.arc(e+this._backgroundBoxThickness/2,i+a,r,0,2*Math.PI):t.arc(e+a,i+this._backgroundBoxThickness/2,r,0,2*Math.PI),t.fill(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),t.strokeStyle=this._borderColor,t.stroke()):(this.isVertical?t.fillRect(e-this._effectiveBarOffset,this._currentMeasure.top+a,this._currentMeasure.width,this._effectiveThumbThickness):t.fillRect(this._currentMeasure.left+a,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),t.strokeStyle=this._borderColor,this.isVertical?t.strokeRect(e-this._effectiveBarOffset,this._currentMeasure.top+a,this._currentMeasure.width,this._effectiveThumbThickness):t.strokeRect(this._currentMeasure.left+a,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height))),t.restore()}serialize(t){super.serialize(t),this.backgroundGradient&&(t.backgroundGradient={},this.backgroundGradient.serialize(t.backgroundGradient))}_parseFromContent(t,e){if(super._parseFromContent(t,e),t.backgroundGradient){const i=_t.Instantiate("BABYLON.GUI."+t.backgroundGradient.className);this.backgroundGradient=new i,this.backgroundGradient.parse(t.backgroundGradient)}}}n([l()],Xe.prototype,"displayValueBar",null);n([l()],Xe.prototype,"borderColor",null);n([l()],Xe.prototype,"background",null);n([l()],Xe.prototype,"thumbColor",null);n([l()],Xe.prototype,"isThumbCircle",null);k("BABYLON.GUI.Slider",Xe);class Zs extends yt{get freezeControls(){return this._freezeControls}set freezeControls(t){if(this._freezeControls===t)return;t||this._restoreMeasures(),this._freezeControls=!1;const e=this.host.getSize(),i=e.width,s=e.height,o=this.host.getContext(),r=new st(0,0,i,s);this.host._numLayoutCalls=0,this.host._rootContainer._layout(r,o),t&&(this._updateMeasures(),this._useBuckets()&&this._makeBuckets()),this._freezeControls=t,this.host.markAsDirty()}get bucketWidth(){return this._bucketWidth}get bucketHeight(){return this._bucketHeight}setBucketSizes(t,e){this._bucketWidth=t,this._bucketHeight=e,this._useBuckets()?this._freezeControls&&this._makeBuckets():this._buckets={}}_useBuckets(){return this._bucketWidth>0&&this._bucketHeight>0}_makeBuckets(){this._buckets={},this._bucketLen=Math.ceil(this.widthInPixels/this._bucketWidth),this._dispatchInBuckets(this._children),this._oldLeft=null,this._oldTop=null}_dispatchInBuckets(t){for(let e=0;e<t.length;++e){const i=t[e],s=Math.max(0,Math.floor((i._customData._origLeft-this._customData.origLeft)/this._bucketWidth)),o=Math.floor((i._customData._origLeft-this._customData.origLeft+i._currentMeasure.width-1)/this._bucketWidth),r=Math.floor((i._customData._origTop-this._customData.origTop+i._currentMeasure.height-1)/this._bucketHeight);let a=Math.max(0,Math.floor((i._customData._origTop-this._customData.origTop)/this._bucketHeight));for(;a<=r;){for(let _=s;_<=o;++_){const h=a*this._bucketLen+_;let d=this._buckets[h];d||(d=[],this._buckets[h]=d),d.push(i)}a++}i instanceof yt&&i._children.length>0&&this._dispatchInBuckets(i._children)}}_updateMeasures(){const t=this.leftInPixels|0,e=this.topInPixels|0;this._measureForChildren.left-=t,this._measureForChildren.top-=e,this._currentMeasure.left-=t,this._currentMeasure.top-=e,this._customData.origLeftForChildren=this._measureForChildren.left,this._customData.origTopForChildren=this._measureForChildren.top,this._customData.origLeft=this._currentMeasure.left,this._customData.origTop=this._currentMeasure.top,this._updateChildrenMeasures(this._children,t,e)}_updateChildrenMeasures(t,e,i){for(let s=0;s<t.length;++s){const o=t[s];o._currentMeasure.left-=e,o._currentMeasure.top-=i,o._customData._origLeft=o._currentMeasure.left,o._customData._origTop=o._currentMeasure.top,o instanceof yt&&o._children.length>0&&this._updateChildrenMeasures(o._children,e,i)}}_restoreMeasures(){const t=this.leftInPixels|0,e=this.topInPixels|0;this._measureForChildren.left=this._customData.origLeftForChildren+t,this._measureForChildren.top=this._customData.origTopForChildren+e,this._currentMeasure.left=this._customData.origLeft+t,this._currentMeasure.top=this._customData.origTop+e}constructor(t){super(t),this._freezeControls=!1,this._bucketWidth=0,this._bucketHeight=0,this._buckets={}}_getTypeName(){return"ScrollViewerWindow"}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._parentMeasure=t,this._measureForChildren.left=this._currentMeasure.left,this._measureForChildren.top=this._currentMeasure.top,this._measureForChildren.width=t.width,this._measureForChildren.height=t.height}_layout(t,e){return this._freezeControls?(this.invalidateRect(),!1):super._layout(t,e)}_scrollChildren(t,e,i){for(let s=0;s<t.length;++s){const o=t[s];o._currentMeasure.left=o._customData._origLeft+e,o._currentMeasure.top=o._customData._origTop+i,o._isClipped=!1,o instanceof yt&&o._children.length>0&&this._scrollChildren(o._children,e,i)}}_scrollChildrenWithBuckets(t,e,i,s){const o=Math.max(0,Math.floor(-t/this._bucketWidth)),r=Math.floor((-t+this._parentMeasure.width-1)/this._bucketWidth),a=Math.floor((-e+this._parentMeasure.height-1)/this._bucketHeight);let _=Math.max(0,Math.floor(-e/this._bucketHeight));for(;_<=a;){for(let h=o;h<=r;++h){const d=_*this._bucketLen+h,u=this._buckets[d];if(u)for(let m=0;m<u.length;++m){const b=u[m];b._currentMeasure.left=b._customData._origLeft+i,b._currentMeasure.top=b._customData._origTop+s,b._isClipped=!1}}_++}}_draw(t,e){if(!this._freezeControls){super._draw(t,e);return}this._localDraw(t),this.clipChildren&&this._clipForChildren(t);const i=this.leftInPixels|0,s=this.topInPixels|0;this._useBuckets()?this._oldLeft!==null&&this._oldTop!==null?(this._scrollChildrenWithBuckets(this._oldLeft,this._oldTop,i,s),this._scrollChildrenWithBuckets(i,s,i,s)):this._scrollChildren(this._children,i,s):this._scrollChildren(this._children,i,s),this._oldLeft=i,this._oldTop=s;for(const o of this._children)o._intersectsRect(this._parentMeasure)&&o._render(t,this._parentMeasure)}_postMeasure(){if(this._freezeControls){super._postMeasure();return}let t=this.parentClientWidth,e=this.parentClientHeight;for(const i of this.children)!i.isVisible||i.notRenderable||(i.horizontalAlignment===f.HORIZONTAL_ALIGNMENT_CENTER&&i._offsetLeft(this._currentMeasure.left-i._currentMeasure.left),i.verticalAlignment===f.VERTICAL_ALIGNMENT_CENTER&&i._offsetTop(this._currentMeasure.top-i._currentMeasure.top),t=Math.max(t,i._currentMeasure.left-this._currentMeasure.left+i._currentMeasure.width+i.paddingRightInPixels),e=Math.max(e,i._currentMeasure.top-this._currentMeasure.top+i._currentMeasure.height+i.paddingBottomInPixels));this._currentMeasure.width!==t&&(this._width.updateInPlace(t,R.UNITMODE_PIXEL),this._currentMeasure.width=t,this._rebuildLayout=!0,this._isDirty=!0),this._currentMeasure.height!==e&&(this._height.updateInPlace(e,R.UNITMODE_PIXEL),this._currentMeasure.height=e,this._rebuildLayout=!0,this._isDirty=!0),super._postMeasure()}}class Ye extends Nt{get borderColor(){return this._borderColor}set borderColor(t){this._borderColor!==t&&(this._borderColor=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(t){this._backgroundGradient!==t&&(this._backgroundGradient=t,this._markAsDirty())}get invertScrollDirection(){return this._invertScrollDirection}set invertScrollDirection(t){this._invertScrollDirection=t}constructor(t){super(t),this.name=t,this._background="black",this._borderColor="white",this._tempMeasure=new st(0,0,0,0),this._invertScrollDirection=!1,this._backgroundGradient=null}_getTypeName(){return"Scrollbar"}_getThumbThickness(){let t=0;return this._thumbWidth.isPixel?t=this._thumbWidth.getValue(this._host):t=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host),t}_getBackgroundColor(t){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(t):this._background}_draw(t){t.save(),this._applyStates(t),this._prepareRenderingData("rectangle");const e=this._renderLeft,i=this._getThumbPosition();t.fillStyle=this._getBackgroundColor(t),t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height),t.fillStyle=this._getColor(t),this.isVertical?(this._tempMeasure.left=e-this._effectiveBarOffset,this._tempMeasure.top=this._currentMeasure.top+i,this._tempMeasure.width=this._currentMeasure.width,this._tempMeasure.height=this._effectiveThumbThickness):(this._tempMeasure.left=this._currentMeasure.left+i,this._tempMeasure.top=this._currentMeasure.top,this._tempMeasure.width=this._effectiveThumbThickness,this._tempMeasure.height=this._currentMeasure.height),t.fillRect(this._tempMeasure.left,this._tempMeasure.top,this._tempMeasure.width,this._tempMeasure.height),t.restore()}_updateValueFromPointer(t,e){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(t,e,this._transformedPosition),t=this._transformedPosition.x,e=this._transformedPosition.y);const i=this._invertScrollDirection?-1:1;this._first&&(this._first=!1,this._originX=t,this._originY=e,(t<this._tempMeasure.left||t>this._tempMeasure.left+this._tempMeasure.width||e<this._tempMeasure.top||e>this._tempMeasure.top+this._tempMeasure.height)&&(this.isVertical?this.value=this.minimum+(1-(e-this._currentMeasure.top)/this._currentMeasure.height)*(this.maximum-this.minimum):this.value=this.minimum+(t-this._currentMeasure.left)/this._currentMeasure.width*(this.maximum-this.minimum)));let s=0;this.isVertical?s=-((e-this._originY)/(this._currentMeasure.height-this._effectiveThumbThickness)):s=(t-this._originX)/(this._currentMeasure.width-this._effectiveThumbThickness),this.value+=i*s*(this.maximum-this.minimum),this._originX=t,this._originY=e}_onPointerDown(t,e,i,s,o){return this._first=!0,super._onPointerDown(t,e,i,s,o)}serialize(t){super.serialize(t),this.backgroundGradient&&(t.backgroundGradient={},this.backgroundGradient.serialize(t.backgroundGradient))}_parseFromContent(t,e){if(super._parseFromContent(t,e),t.backgroundGradient){const i=_t.Instantiate("BABYLON.GUI."+t.backgroundGradient.className);this.backgroundGradient=new i,this.backgroundGradient.parse(t.backgroundGradient)}}}n([l()],Ye.prototype,"borderColor",null);n([l()],Ye.prototype,"background",null);n([l()],Ye.prototype,"invertScrollDirection",null);k("BABYLON.GUI.Scrollbar",Ye);class Pi extends Nt{get invertScrollDirection(){return this._invertScrollDirection}set invertScrollDirection(t){this._invertScrollDirection=t}get backgroundImage(){return this._backgroundBaseImage}set backgroundImage(t){this._backgroundBaseImage!==t&&(this._backgroundBaseImage=t,this.isVertical&&this.num90RotationInVerticalMode!==0?t.isLoaded?(this._backgroundImage=t._rotate90(this.num90RotationInVerticalMode,!0),this._markAsDirty()):t.onImageLoadedObservable.addOnce(()=>{const e=t._rotate90(this.num90RotationInVerticalMode,!0);this._backgroundImage=e,e.isLoaded||e.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()}):(this._backgroundImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()))}get thumbImage(){return this._thumbBaseImage}set thumbImage(t){this._thumbBaseImage!==t&&(this._thumbBaseImage=t,this.isVertical&&this.num90RotationInVerticalMode!==0?t.isLoaded?(this._thumbImage=t._rotate90(-this.num90RotationInVerticalMode,!0),this._markAsDirty()):t.onImageLoadedObservable.addOnce(()=>{const e=t._rotate90(-this.num90RotationInVerticalMode,!0);this._thumbImage=e,e.isLoaded||e.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()}):(this._thumbImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()))}get thumbLength(){return this._thumbLength}set thumbLength(t){this._thumbLength!==t&&(this._thumbLength=t,this._markAsDirty())}get thumbHeight(){return this._thumbHeight}set thumbHeight(t){this._thumbLength!==t&&(this._thumbHeight=t,this._markAsDirty())}get barImageHeight(){return this._barImageHeight}set barImageHeight(t){this._barImageHeight!==t&&(this._barImageHeight=t,this._markAsDirty())}constructor(t){super(t),this.name=t,this._thumbLength=.5,this._thumbHeight=1,this._barImageHeight=1,this._tempMeasure=new st(0,0,0,0),this._invertScrollDirection=!1,this.num90RotationInVerticalMode=1}_getTypeName(){return"ImageScrollBar"}_getThumbThickness(){let t=0;return this._thumbWidth.isPixel?t=this._thumbWidth.getValue(this._host):t=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host),t}_draw(t){t.save(),this._applyStates(t),this._prepareRenderingData("rectangle");const e=this._getThumbPosition(),i=this._renderLeft,s=this._renderTop,o=this._renderWidth,r=this._renderHeight;this._backgroundImage&&(this._tempMeasure.copyFromFloats(i,s,o,r),this.isVertical?(this._tempMeasure.copyFromFloats(i+o*(1-this._barImageHeight)*.5,this._currentMeasure.top,o*this._barImageHeight,r),this._tempMeasure.height+=this._effectiveThumbThickness,this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure)):(this._tempMeasure.copyFromFloats(this._currentMeasure.left,s+r*(1-this._barImageHeight)*.5,o,r*this._barImageHeight),this._tempMeasure.width+=this._effectiveThumbThickness,this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure)),this._backgroundImage._draw(t)),this.isVertical?this._tempMeasure.copyFromFloats(i-this._effectiveBarOffset+this._currentMeasure.width*(1-this._thumbHeight)*.5,this._currentMeasure.top+e,this._currentMeasure.width*this._thumbHeight,this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(this._currentMeasure.left+e,this._currentMeasure.top+this._currentMeasure.height*(1-this._thumbHeight)*.5,this._effectiveThumbThickness,this._currentMeasure.height*this._thumbHeight),this._thumbImage&&(this._thumbImage._currentMeasure.copyFrom(this._tempMeasure),this._thumbImage._draw(t)),t.restore()}_updateValueFromPointer(t,e){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(t,e,this._transformedPosition),t=this._transformedPosition.x,e=this._transformedPosition.y);const i=this._invertScrollDirection?-1:1;this._first&&(this._first=!1,this._originX=t,this._originY=e,(t<this._tempMeasure.left||t>this._tempMeasure.left+this._tempMeasure.width||e<this._tempMeasure.top||e>this._tempMeasure.top+this._tempMeasure.height)&&(this.isVertical?this.value=this.minimum+(1-(e-this._currentMeasure.top)/this._currentMeasure.height)*(this.maximum-this.minimum):this.value=this.minimum+(t-this._currentMeasure.left)/this._currentMeasure.width*(this.maximum-this.minimum)));let s=0;this.isVertical?s=-((e-this._originY)/(this._currentMeasure.height-this._effectiveThumbThickness)):s=(t-this._originX)/(this._currentMeasure.width-this._effectiveThumbThickness),this.value+=i*s*(this.maximum-this.minimum),this._originX=t,this._originY=e}_onPointerDown(t,e,i,s,o){return this._first=!0,super._onPointerDown(t,e,i,s,o)}}n([l()],Pi.prototype,"num90RotationInVerticalMode",void 0);n([l()],Pi.prototype,"invertScrollDirection",null);class Ke extends gt{get horizontalBar(){return this._horizontalBar}get verticalBar(){return this._verticalBar}addControl(t){return t?(this._window.addControl(t),this):this}removeControl(t){return this._window.removeControl(t),this}get children(){return this._window.children}_flagDescendantsAsMatrixDirty(){for(const t of this._children)t._markMatrixAsDirty()}get freezeControls(){return this._window.freezeControls}set freezeControls(t){this._window.freezeControls=t}get bucketWidth(){return this._window.bucketWidth}get bucketHeight(){return this._window.bucketHeight}setBucketSizes(t,e){this._window.setBucketSizes(t,e)}get forceHorizontalBar(){return this._forceHorizontalBar}set forceHorizontalBar(t){this._grid.setRowDefinition(1,t?this._barSize:0,!0),this._horizontalBar.isVisible=t,this._forceHorizontalBar=t}get forceVerticalBar(){return this._forceVerticalBar}set forceVerticalBar(t){this._grid.setColumnDefinition(1,t?this._barSize:0,!0),this._verticalBar.isVisible=t,this._forceVerticalBar=t}constructor(t,e){super(t),this._barSize=20,this._pointerIsOver=!1,this._wheelPrecision=.05,this._thumbLength=.5,this._thumbHeight=1,this._barImageHeight=1,this._horizontalBarImageHeight=1,this._verticalBarImageHeight=1,this._oldWindowContentsWidth=0,this._oldWindowContentsHeight=0,this._forceHorizontalBar=!1,this._forceVerticalBar=!1,this._useImageBar=e||!1,this.onDirtyObservable.add(()=>{this._horizontalBarSpace.color=this.color,this._verticalBarSpace.color=this.color,this._dragSpace.color=this.color}),this.onPointerEnterObservable.add(()=>{this._pointerIsOver=!0}),this.onPointerOutObservable.add(()=>{this._pointerIsOver=!1}),this._grid=new xt,this._useImageBar?(this._horizontalBar=new Pi,this._verticalBar=new Pi):(this._horizontalBar=new Ye,this._verticalBar=new Ye),this._window=new Zs("scrollViewer_window"),this._window.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._window.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._grid.addColumnDefinition(1),this._grid.addColumnDefinition(0,!0),this._grid.addRowDefinition(1),this._grid.addRowDefinition(0,!0),super.addControl(this._grid),this._grid.addControl(this._window,0,0),this._verticalBarSpace=new gt,this._verticalBarSpace.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._verticalBarSpace.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._verticalBarSpace.thickness=1,this._grid.addControl(this._verticalBarSpace,0,1),this._addBar(this._verticalBar,this._verticalBarSpace,!0,Math.PI),this._horizontalBarSpace=new gt,this._horizontalBarSpace.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._horizontalBarSpace.verticalAlignment=f.VERTICAL_ALIGNMENT_TOP,this._horizontalBarSpace.thickness=1,this._grid.addControl(this._horizontalBarSpace,1,0),this._addBar(this._horizontalBar,this._horizontalBarSpace,!1,0),this._dragSpace=new gt,this._dragSpace.thickness=1,this._grid.addControl(this._dragSpace,1,1),this._useImageBar||(this.barColor="grey",this.barBackground="transparent")}resetWindow(){this._window.width="100%",this._window.height="100%"}_getTypeName(){return"ScrollViewer"}_buildClientSizes(){const t=this.host.idealRatio;this._window.parentClientWidth=this._currentMeasure.width-(this._verticalBar.isVisible||this.forceVerticalBar?this._barSize*t:0)-2*this.thickness,this._window.parentClientHeight=this._currentMeasure.height-(this._horizontalBar.isVisible||this.forceHorizontalBar?this._barSize*t:0)-2*this.thickness,this._clientWidth=this._window.parentClientWidth,this._clientHeight=this._window.parentClientHeight}_additionalProcessing(t,e){super._additionalProcessing(t,e),this._buildClientSizes()}_postMeasure(){super._postMeasure(),this._updateScroller(),this._setWindowPosition(!1)}get wheelPrecision(){return this._wheelPrecision}set wheelPrecision(t){this._wheelPrecision!==t&&(t<0&&(t=0),t>1&&(t=1),this._wheelPrecision=t)}get scrollBackground(){return this._horizontalBarSpace.background}set scrollBackground(t){this._horizontalBarSpace.background!==t&&(this._horizontalBarSpace.background=t,this._verticalBarSpace.background=t)}get barColor(){return this._barColor}set barColor(t){this._barColor!==t&&(this._barColor=t,this._horizontalBar.color=t,this._verticalBar.color=t)}get thumbImage(){return this._barImage}set thumbImage(t){if(this._barImage===t)return;this._barImage=t;const e=this._horizontalBar,i=this._verticalBar;e.thumbImage=t,i.thumbImage=t}get horizontalThumbImage(){return this._horizontalBarImage}set horizontalThumbImage(t){if(this._horizontalBarImage===t)return;this._horizontalBarImage=t;const e=this._horizontalBar;e.thumbImage=t}get verticalThumbImage(){return this._verticalBarImage}set verticalThumbImage(t){if(this._verticalBarImage===t)return;this._verticalBarImage=t;const e=this._verticalBar;e.thumbImage=t}get barSize(){return this._barSize}set barSize(t){this._barSize!==t&&(this._barSize=t,this._markAsDirty(),this._horizontalBar.isVisible&&this._grid.setRowDefinition(1,this._barSize,!0),this._verticalBar.isVisible&&this._grid.setColumnDefinition(1,this._barSize,!0))}get thumbLength(){return this._thumbLength}set thumbLength(t){if(this._thumbLength===t)return;t<=0&&(t=.1),t>1&&(t=1),this._thumbLength=t;const e=this._horizontalBar,i=this._verticalBar;e.thumbLength=t,i.thumbLength=t,this._markAsDirty()}get thumbHeight(){return this._thumbHeight}set thumbHeight(t){if(this._thumbHeight===t)return;t<=0&&(t=.1),t>1&&(t=1),this._thumbHeight=t;const e=this._horizontalBar,i=this._verticalBar;e.thumbHeight=t,i.thumbHeight=t,this._markAsDirty()}get barImageHeight(){return this._barImageHeight}set barImageHeight(t){if(this._barImageHeight===t)return;t<=0&&(t=.1),t>1&&(t=1),this._barImageHeight=t;const e=this._horizontalBar,i=this._verticalBar;e.barImageHeight=t,i.barImageHeight=t,this._markAsDirty()}get horizontalBarImageHeight(){return this._horizontalBarImageHeight}set horizontalBarImageHeight(t){if(this._horizontalBarImageHeight===t)return;t<=0&&(t=.1),t>1&&(t=1),this._horizontalBarImageHeight=t;const e=this._horizontalBar;e.barImageHeight=t,this._markAsDirty()}get verticalBarImageHeight(){return this._verticalBarImageHeight}set verticalBarImageHeight(t){if(this._verticalBarImageHeight===t)return;t<=0&&(t=.1),t>1&&(t=1),this._verticalBarImageHeight=t;const e=this._verticalBar;e.barImageHeight=t,this._markAsDirty()}get barBackground(){return this._barBackground}set barBackground(t){if(this._barBackground===t)return;this._barBackground=t;const e=this._horizontalBar,i=this._verticalBar;e.background=t,i.background=t,this._dragSpace.background=t}get barImage(){return this._barBackgroundImage}set barImage(t){this._barBackgroundImage=t;const e=this._horizontalBar,i=this._verticalBar;e.backgroundImage=t,i.backgroundImage=t}get horizontalBarImage(){return this._horizontalBarBackgroundImage}set horizontalBarImage(t){this._horizontalBarBackgroundImage=t;const e=this._horizontalBar;e.backgroundImage=t}get verticalBarImage(){return this._verticalBarBackgroundImage}set verticalBarImage(t){this._verticalBarBackgroundImage=t;const e=this._verticalBar;e.backgroundImage=t}_setWindowPosition(t=!0){const e=this.host.idealRatio,i=this._window._currentMeasure.width,s=this._window._currentMeasure.height;if(!t&&this._oldWindowContentsWidth===i&&this._oldWindowContentsHeight===s)return;this._oldWindowContentsWidth=i,this._oldWindowContentsHeight=s;const o=this._clientWidth-i,r=this._clientHeight-s,a=this._horizontalBar.value/e*o+"px",_=this._verticalBar.value/e*r+"px";a!==this._window.left&&(this._window.left=a,this.freezeControls||(this._rebuildLayout=!0)),_!==this._window.top&&(this._window.top=_,this.freezeControls||(this._rebuildLayout=!0))}_updateScroller(){const t=this._window._currentMeasure.width,e=this._window._currentMeasure.height;this._horizontalBar.isVisible&&t<=this._clientWidth&&!this.forceHorizontalBar?(this._grid.setRowDefinition(1,0,!0),this._horizontalBar.isVisible=!1,this._horizontalBar.value=0,this._rebuildLayout=!0):!this._horizontalBar.isVisible&&(t>this._clientWidth||this.forceHorizontalBar)&&(this._grid.setRowDefinition(1,this._barSize,!0),this._horizontalBar.isVisible=!0,this._rebuildLayout=!0),this._verticalBar.isVisible&&e<=this._clientHeight&&!this.forceVerticalBar?(this._grid.setColumnDefinition(1,0,!0),this._verticalBar.isVisible=!1,this._verticalBar.value=0,this._rebuildLayout=!0):!this._verticalBar.isVisible&&(e>this._clientHeight||this.forceVerticalBar)&&(this._grid.setColumnDefinition(1,this._barSize,!0),this._verticalBar.isVisible=!0,this._rebuildLayout=!0),this._buildClientSizes();const i=this.host.idealRatio;this._horizontalBar.thumbWidth=this._thumbLength*.9*(this._clientWidth/i)+"px",this._verticalBar.thumbWidth=this._thumbLength*.9*(this._clientHeight/i)+"px"}_link(t){super._link(t),this._attachWheel()}_addBar(t,e,i,s){t.paddingLeft=0,t.width="100%",t.height="100%",t.barOffset=0,t.value=0,t.maximum=1,t.horizontalAlignment=f.HORIZONTAL_ALIGNMENT_CENTER,t.verticalAlignment=f.VERTICAL_ALIGNMENT_CENTER,t.isVertical=i,t.rotation=s,t.isVisible=!1,e.addControl(t),t.onValueChangedObservable.add(()=>{this._setWindowPosition()})}_attachWheel(){!this._host||this._onWheelObserver||(this._onWheelObserver=this.onWheelObservable.add(t=>{!this._pointerIsOver||this.isReadOnly||(this._verticalBar.isVisible==!0&&(t.y<0&&this._verticalBar.value>0?this._verticalBar.value-=this._wheelPrecision:t.y>0&&this._verticalBar.value<this._verticalBar.maximum&&(this._verticalBar.value+=this._wheelPrecision)),this._horizontalBar.isVisible==!0&&(t.x<0&&this._horizontalBar.value<this._horizontalBar.maximum?this._horizontalBar.value+=this._wheelPrecision:t.x>0&&this._horizontalBar.value>0&&(this._horizontalBar.value-=this._wheelPrecision)))}))}_renderHighlightSpecific(t){this.isHighlighted&&(super._renderHighlightSpecific(t),this._grid._renderHighlightSpecific(t),t.restore())}dispose(){this.onWheelObservable.remove(this._onWheelObserver),this._onWheelObserver=null,super.dispose()}}n([l()],Ke.prototype,"wheelPrecision",null);n([l()],Ke.prototype,"scrollBackground",null);n([l()],Ke.prototype,"barColor",null);n([l()],Ke.prototype,"barSize",null);n([l()],Ke.prototype,"barBackground",null);k("BABYLON.GUI.ScrollViewer",Ke);class $s extends gt{get group(){return this._group}set group(t){this._group!==t&&(this._group=t)}get isActive(){return this._isActive}set isActive(t){var e,i;this._isActive!==t&&(this._isActive=t,this._isActive?(e=this.toActiveAnimation)===null||e===void 0||e.call(this):(i=this.toInactiveAnimation)===null||i===void 0||i.call(this),this._markAsDirty(),this.onIsActiveChangedObservable.notifyObservers(t),this._isActive&&this._host&&this._group&&this._host.executeOnAllControls(s=>{if(s.typeName==="ToggleButton"){if(s===this)return;const o=s;o.group===this.group&&(o.isActive=!1)}}))}constructor(t,e){super(t),this.name=t,this.onIsActiveChangedObservable=new x,this.delegatePickingToChildren=!1,this._isActive=!1,this.group=e??"",this.thickness=0,this.isPointerBlocker=!0;let i=null;this.toActiveAnimation=()=>{this.thickness=1},this.toInactiveAnimation=()=>{this.thickness=0},this.pointerEnterActiveAnimation=()=>{i=this.alpha,this.alpha-=.1},this.pointerOutActiveAnimation=()=>{i!==null&&(this.alpha=i)},this.pointerDownActiveAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpActiveAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05},this.pointerEnterInactiveAnimation=()=>{i=this.alpha,this.alpha-=.1},this.pointerOutInactiveAnimation=()=>{i!==null&&(this.alpha=i)},this.pointerDownInactiveAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpInactiveAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05}}_getTypeName(){return"ToggleButton"}_processPicking(t,e,i,s,o,r,a,_){if(!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this.notRenderable||!super.contains(t,e))return!1;if(this.delegatePickingToChildren){let h=!1;for(let d=this._children.length-1;d>=0;d--){const u=this._children[d];if(u.isEnabled&&u.isHitTestVisible&&u.isVisible&&!u.notRenderable&&u.contains(t,e)){h=!0;break}}if(!h)return!1}return this._processObservables(s,t,e,i,o,r,a,_),!0}_onPointerEnter(t,e){return super._onPointerEnter(t,e)?(this.isReadOnly||(this._isActive?this.pointerEnterActiveAnimation&&this.pointerEnterActiveAnimation():this.pointerEnterInactiveAnimation&&this.pointerEnterInactiveAnimation()),!0):!1}_onPointerOut(t,e,i=!1){this.isReadOnly||(this._isActive?this.pointerOutActiveAnimation&&this.pointerOutActiveAnimation():this.pointerOutInactiveAnimation&&this.pointerOutInactiveAnimation()),super._onPointerOut(t,e,i)}_onPointerDown(t,e,i,s,o){return super._onPointerDown(t,e,i,s,o)?(this.isReadOnly||(this._isActive?this.pointerDownActiveAnimation&&this.pointerDownActiveAnimation():this.pointerDownInactiveAnimation&&this.pointerDownInactiveAnimation()),!0):!1}_onPointerUp(t,e,i,s,o,r){this.isReadOnly||(this._isActive?this.pointerUpActiveAnimation&&this.pointerUpActiveAnimation():this.pointerUpInactiveAnimation&&this.pointerUpInactiveAnimation()),super._onPointerUp(t,e,i,s,o,r)}}k("BABYLON.GUI.ToggleButton",$s);class Sr{}class Gi extends Ot{constructor(){super(...arguments),this.onKeyPressObservable=new x,this.defaultButtonWidth="40px",this.defaultButtonHeight="40px",this.defaultButtonPaddingLeft="2px",this.defaultButtonPaddingRight="2px",this.defaultButtonPaddingTop="2px",this.defaultButtonPaddingBottom="2px",this.defaultButtonColor="#DDD",this.defaultButtonBackground="#070707",this.shiftButtonColor="#7799FF",this.selectedShiftThickness=1,this.shiftState=0,this._currentlyConnectedInputText=null,this._connectedInputTexts=[],this._onKeyPressObserver=null}_getTypeName(){return"VirtualKeyboard"}_createKey(t,e){const i=qt.CreateSimpleButton(t,t);return i.width=e&&e.width?e.width:this.defaultButtonWidth,i.height=e&&e.height?e.height:this.defaultButtonHeight,i.color=e&&e.color?e.color:this.defaultButtonColor,i.background=e&&e.background?e.background:this.defaultButtonBackground,i.paddingLeft=e&&e.paddingLeft?e.paddingLeft:this.defaultButtonPaddingLeft,i.paddingRight=e&&e.paddingRight?e.paddingRight:this.defaultButtonPaddingRight,i.paddingTop=e&&e.paddingTop?e.paddingTop:this.defaultButtonPaddingTop,i.paddingBottom=e&&e.paddingBottom?e.paddingBottom:this.defaultButtonPaddingBottom,i.thickness=0,i.isFocusInvisible=!0,i.shadowColor=this.shadowColor,i.shadowBlur=this.shadowBlur,i.shadowOffsetX=this.shadowOffsetX,i.shadowOffsetY=this.shadowOffsetY,i.onPointerUpObservable.add(()=>{this.onKeyPressObservable.notifyObservers(t)}),i}addKeysRow(t,e){const i=new Ot;i.isVertical=!1,i.isFocusInvisible=!0;let s=null;for(let o=0;o<t.length;o++){let r=null;e&&e.length===t.length&&(r=e[o]);const a=this._createKey(t[o],r);(!s||a.heightInPixels>s.heightInPixels)&&(s=a),i.addControl(a)}i.height=s?s.height:this.defaultButtonHeight,this.addControl(i)}applyShiftState(t){if(this.children)for(let e=0;e<this.children.length;e++){const i=this.children[e];if(!i||!i.children)continue;const s=i;for(let o=0;o<s.children.length;o++){const r=s.children[o];if(!r||!r.children[0])continue;const a=r.children[0];a.text==="⇧"&&(r.color=t?this.shiftButtonColor:this.defaultButtonColor,r.thickness=t>1?this.selectedShiftThickness:0),a.text=t>0?a.text.toUpperCase():a.text.toLowerCase()}}}get connectedInputText(){return this._currentlyConnectedInputText}connect(t){if(this._connectedInputTexts.some(o=>o.input===t))return;this._onKeyPressObserver===null&&(this._onKeyPressObserver=this.onKeyPressObservable.add(o=>{if(this._currentlyConnectedInputText){switch(this._currentlyConnectedInputText._host.focusedControl=this._currentlyConnectedInputText,o){case"⇧":this.shiftState++,this.shiftState>2&&(this.shiftState=0),this.applyShiftState(this.shiftState);return;case"←":this._currentlyConnectedInputText instanceof Ge?this._currentlyConnectedInputText.alternativeProcessKey("Backspace"):this._currentlyConnectedInputText.processKey(8);return;case"↵":this._currentlyConnectedInputText instanceof Ge?this._currentlyConnectedInputText.alternativeProcessKey("Enter"):this._currentlyConnectedInputText.processKey(13);return}this._currentlyConnectedInputText instanceof Ge?this._currentlyConnectedInputText.alternativeProcessKey("",this.shiftState?o.toUpperCase():o):this._currentlyConnectedInputText.processKey(-1,this.shiftState?o.toUpperCase():o),this.shiftState===1&&(this.shiftState=0,this.applyShiftState(this.shiftState))}})),this.isVisible=!1,this._currentlyConnectedInputText=t,t._connectedVirtualKeyboard=this;const i=t.onFocusObservable.add(()=>{this._currentlyConnectedInputText=t,t._connectedVirtualKeyboard=this,this.isVisible=!0}),s=t.onBlurObservable.add(()=>{t._connectedVirtualKeyboard=null,this._currentlyConnectedInputText=null,this.isVisible=!1});this._connectedInputTexts.push({input:t,onBlurObserver:s,onFocusObserver:i})}disconnect(t){if(t){const e=this._connectedInputTexts.filter(i=>i.input===t);e.length===1&&(this._removeConnectedInputObservables(e[0]),this._connectedInputTexts=this._connectedInputTexts.filter(i=>i.input!==t),this._currentlyConnectedInputText===t&&(this._currentlyConnectedInputText=null))}else this._connectedInputTexts.forEach(e=>{this._removeConnectedInputObservables(e)}),this._connectedInputTexts.length=0;this._connectedInputTexts.length===0&&(this._currentlyConnectedInputText=null,this.onKeyPressObservable.remove(this._onKeyPressObserver),this._onKeyPressObserver=null)}_removeConnectedInputObservables(t){t.input._connectedVirtualKeyboard=null,t.input.onFocusObservable.remove(t.onFocusObserver),t.input.onBlurObservable.remove(t.onBlurObserver)}dispose(){super.dispose(),this.disconnect()}static CreateDefaultLayout(t){const e=new Gi(t);return e.addKeysRow(["1","2","3","4","5","6","7","8","9","0","←"]),e.addKeysRow(["q","w","e","r","t","y","u","i","o","p"]),e.addKeysRow(["a","s","d","f","g","h","j","k","l",";","'","↵"]),e.addKeysRow(["⇧","z","x","c","v","b","n","m",",",".","/"]),e.addKeysRow([" "],[{width:"200px"}]),e}_parseFromContent(t,e){super._parseFromContent(t,e);for(const i of this.children)if(i.getClassName()==="StackPanel"){const s=i;for(const o of s.children)o.getClassName()==="Button"&&o.name&&o.onPointerUpObservable.add(()=>{this.onKeyPressObservable.notifyObservers(o.name)})}}}k("BABYLON.GUI.VirtualKeyboard",Gi);class Ut extends f{get displayMinorLines(){return this._displayMinorLines}set displayMinorLines(t){this._displayMinorLines!==t&&(this._displayMinorLines=t,this._markAsDirty())}get displayMajorLines(){return this._displayMajorLines}set displayMajorLines(t){this._displayMajorLines!==t&&(this._displayMajorLines=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get cellWidth(){return this._cellWidth}set cellWidth(t){this._cellWidth=t,this._markAsDirty()}get cellHeight(){return this._cellHeight}set cellHeight(t){this._cellHeight=t,this._markAsDirty()}get minorLineTickness(){return this._minorLineTickness}set minorLineTickness(t){this._minorLineTickness=t,this._markAsDirty()}get minorLineColor(){return this._minorLineColor}set minorLineColor(t){this._minorLineColor=t,this._markAsDirty()}get majorLineTickness(){return this._majorLineTickness}set majorLineTickness(t){this._majorLineTickness=t,this._markAsDirty()}get majorLineColor(){return this._majorLineColor}set majorLineColor(t){this._majorLineColor=t,this._markAsDirty()}get majorLineFrequency(){return this._majorLineFrequency}set majorLineFrequency(t){this._majorLineFrequency=t,this._markAsDirty()}constructor(t){super(t),this.name=t,this._cellWidth=20,this._cellHeight=20,this._minorLineTickness=1,this._minorLineColor="DarkGray",this._majorLineTickness=2,this._majorLineColor="White",this._majorLineFrequency=5,this._background="Black",this._displayMajorLines=!0,this._displayMinorLines=!0}_draw(t){if(t.save(),this._applyStates(t),this._isEnabled){this._background&&(t.fillStyle=this._background,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height));const e=this._currentMeasure.width/this._cellWidth,i=this._currentMeasure.height/this._cellHeight,s=this._currentMeasure.left+this._currentMeasure.width/2,o=this._currentMeasure.top+this._currentMeasure.height/2;if(this._displayMinorLines){t.strokeStyle=this._minorLineColor,t.lineWidth=this._minorLineTickness;for(let r=-e/2+1;r<e/2;r++){const a=s+r*this.cellWidth;t.beginPath(),t.moveTo(a,this._currentMeasure.top),t.lineTo(a,this._currentMeasure.top+this._currentMeasure.height),t.stroke()}for(let r=-i/2+1;r<i/2;r++){const a=o+r*this.cellHeight;t.beginPath(),t.moveTo(this._currentMeasure.left,a),t.lineTo(this._currentMeasure.left+this._currentMeasure.width,a),t.stroke()}}if(this._displayMajorLines){t.strokeStyle=this._majorLineColor,t.lineWidth=this._majorLineTickness;for(let r=-e/2+this._majorLineFrequency;r<e/2;r+=this._majorLineFrequency){const a=s+r*this.cellWidth;t.beginPath(),t.moveTo(a,this._currentMeasure.top),t.lineTo(a,this._currentMeasure.top+this._currentMeasure.height),t.stroke()}for(let r=-i/2+this._majorLineFrequency;r<i/2;r+=this._majorLineFrequency){const a=o+r*this.cellHeight;t.moveTo(this._currentMeasure.left,a),t.lineTo(this._currentMeasure.left+this._currentMeasure.width,a),t.closePath(),t.stroke()}}}t.restore()}_getTypeName(){return"DisplayGrid"}}n([l()],Ut.prototype,"displayMinorLines",null);n([l()],Ut.prototype,"displayMajorLines",null);n([l()],Ut.prototype,"background",null);n([l()],Ut.prototype,"cellWidth",null);n([l()],Ut.prototype,"cellHeight",null);n([l()],Ut.prototype,"minorLineTickness",null);n([l()],Ut.prototype,"minorLineColor",null);n([l()],Ut.prototype,"majorLineTickness",null);n([l()],Ut.prototype,"majorLineColor",null);n([l()],Ut.prototype,"majorLineFrequency",null);k("BABYLON.GUI.DisplayGrid",Ut);class us extends Nt{get displayThumb(){return this._displayThumb&&this.thumbImage!=null}set displayThumb(t){this._displayThumb!==t&&(this._displayThumb=t,this._markAsDirty())}get backgroundImage(){return this._backgroundImage}set backgroundImage(t){this._backgroundImage!==t&&(this._backgroundImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}get valueBarImage(){return this._valueBarImage}set valueBarImage(t){this._valueBarImage!==t&&(this._valueBarImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}get thumbImage(){return this._thumbImage}set thumbImage(t){this._thumbImage!==t&&(this._thumbImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}constructor(t){super(t),this.name=t,this._tempMeasure=new st(0,0,0,0)}_getTypeName(){return"ImageBasedSlider"}_draw(t){t.save(),this._applyStates(t),this._prepareRenderingData("rectangle");const e=this._getThumbPosition(),i=this._renderLeft,s=this._renderTop,o=this._renderWidth,r=this._renderHeight;this._backgroundImage&&(this._tempMeasure.copyFromFloats(i,s,o,r),this.isThumbClamped&&this.displayThumb&&(this.isVertical?this._tempMeasure.height+=this._effectiveThumbThickness:this._tempMeasure.width+=this._effectiveThumbThickness),this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure),this._backgroundImage._draw(t)),this._valueBarImage&&(this.isVertical?this.isThumbClamped&&this.displayThumb?this._tempMeasure.copyFromFloats(i,s+e,o,r-e+this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(i,s+e,o,r-e):this.isThumbClamped&&this.displayThumb?this._tempMeasure.copyFromFloats(i,s,e+this._effectiveThumbThickness/2,r):this._tempMeasure.copyFromFloats(i,s,e,r),this._valueBarImage._currentMeasure.copyFrom(this._tempMeasure),this._valueBarImage._draw(t)),this.displayThumb&&(this.isVertical?this._tempMeasure.copyFromFloats(i-this._effectiveBarOffset,this._currentMeasure.top+e,this._currentMeasure.width,this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(this._currentMeasure.left+e,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height),this._thumbImage._currentMeasure.copyFrom(this._tempMeasure),this._thumbImage._draw(t)),t.restore()}serialize(t){super.serialize(t);const e={},i={},s={};this.backgroundImage.serialize(e),this.thumbImage.serialize(i),this.valueBarImage.serialize(s),t.backgroundImage=e,t.thumbImage=i,t.valueBarImage=s}_parseFromContent(t,e){super._parseFromContent(t,e),this.backgroundImage=C.Parse(t.backgroundImage,e),this.thumbImage=C.Parse(t.thumbImage,e),this.valueBarImage=C.Parse(t.valueBarImage,e)}}n([l()],us.prototype,"displayThumb",null);k("BABYLON.GUI.ImageBasedSlider",us);const Mr="Statics";f.AddHeader=function(g,t,e,i){const s=new Ot("panel"),o=i?i.isHorizontal:!0,r=i?i.controlFirst:!0;s.isVertical=!o;const a=new U("header");return a.text=t,a.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,o?a.width=e:a.height=e,r?(s.addControl(g),s.addControl(a),a.paddingLeft="5px"):(s.addControl(a),s.addControl(g),a.paddingRight="5px"),a.shadowBlur=g.shadowBlur,a.shadowColor=g.shadowColor,a.shadowOffsetX=g.shadowOffsetX,a.shadowOffsetY=g.shadowOffsetY,s};class fs{constructor(){this._colorStops=[],this._gradientDirty=!0}_addColorStopsToCanvasGradient(){for(const t of this._colorStops)this._canvasGradient.addColorStop(t.offset,t.color)}getCanvasGradient(t){return(this._gradientDirty||this._context!==t)&&(this._context=t,this._canvasGradient=this._createCanvasGradient(t),this._addColorStopsToCanvasGradient(),this._gradientDirty=!1),this._canvasGradient}addColorStop(t,e){this._colorStops.push({offset:t,color:e}),this._gradientDirty=!0}removeColorStop(t){this._colorStops=this._colorStops.filter(e=>e.offset!==t),this._gradientDirty=!0}clearColorStops(){this._colorStops=[],this._gradientDirty=!0}get colorStops(){return this._colorStops}getClassName(){return"BaseGradient"}serialize(t){t.colorStops=this._colorStops,t.className=this.getClassName()}parse(t){this._colorStops=t.colorStops}}class Js extends fs{constructor(t,e,i,s){super(),this._x0=t??0,this._y0=e??0,this._x1=i??0,this._y1=s??0}_createCanvasGradient(t){return t.createLinearGradient(this._x0,this._y0,this._x1,this._y1)}get x0(){return this._x0}get x1(){return this._x1}get y0(){return this._y0}get y1(){return this._y1}getClassName(){return"LinearGradient"}serialize(t){super.serialize(t),t.x0=this._x0,t.y0=this._y0,t.x1=this._x1,t.y1=this._y1}parse(t){super.parse(t),this._x0=t.x0,this._y0=t.y0,this._x1=t.x1,this._y1=t.y1}}k("BABYLON.GUI.LinearGradient",Js);class to extends fs{constructor(t,e,i,s,o,r){super(),this._x0=t??0,this._y0=e??0,this._r0=i??0,this._x1=s??0,this._y1=o??0,this._r1=r??0}_createCanvasGradient(t){return t.createRadialGradient(this._x0,this._y0,this._r0,this._x1,this._y1,this._r1)}get x0(){return this._x0}get x1(){return this._x1}get y0(){return this._y0}get y1(){return this._y1}get r0(){return this._r0}get r1(){return this._r1}getClassName(){return"RadialGradient"}serialize(t){super.serialize(t),t.x0=this._x0,t.y0=this._y0,t.r0=this._r0,t.x1=this._x1,t.y1=this._y1,t.r1=this._r1}parse(t){super.parse(t),this._x0=t.x0,this._y0=t.y0,this._r0=t.r0,this._x1=t.x1,this._y1=t.y1,this._r1=t.r1}}k("BABYLON.GUI.RadialGradient",to);class eo{constructor(t){this._fontFamily="Arial",this._fontStyle="",this._fontWeight="",this._fontSize=new R(18,R.UNITMODE_PIXEL,!1),this.onChangedObservable=new x,this._host=t}get fontSize(){return this._fontSize.toString(this._host)}set fontSize(t){this._fontSize.toString(this._host)!==t&&this._fontSize.fromString(t)&&this.onChangedObservable.notifyObservers(this)}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily!==t&&(this._fontFamily=t,this.onChangedObservable.notifyObservers(this))}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle!==t&&(this._fontStyle=t,this.onChangedObservable.notifyObservers(this))}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight!==t&&(this._fontWeight=t,this.onChangedObservable.notifyObservers(this))}dispose(){this.onChangedObservable.clear()}}class ct extends _s{get numLayoutCalls(){return this._numLayoutCalls}get numRenderCalls(){return this._numRenderCalls}get renderScale(){return this._renderScale}set renderScale(t){t!==this._renderScale&&(this._renderScale=t,this._onResize())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this.markAsDirty())}get idealWidth(){return this._idealWidth}set idealWidth(t){this._idealWidth!==t&&(this._idealWidth=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get idealHeight(){return this._idealHeight}set idealHeight(t){this._idealHeight!==t&&(this._idealHeight=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get useSmallestIdeal(){return this._useSmallestIdeal}set useSmallestIdeal(t){this._useSmallestIdeal!==t&&(this._useSmallestIdeal=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get renderAtIdealSize(){return this._renderAtIdealSize}set renderAtIdealSize(t){this._renderAtIdealSize!==t&&(this._renderAtIdealSize=t,this._onResize())}get idealRatio(){let t=0,e=0;return this._idealWidth&&(t=this.getSize().width/this._idealWidth),this._idealHeight&&(e=this.getSize().height/this._idealHeight),this._useSmallestIdeal&&this._idealWidth&&this._idealHeight?window.innerWidth<window.innerHeight?t:e:this._idealWidth?t:this._idealHeight?e:1}get layer(){return this._layerToDispose}get rootContainer(){return this._rootContainer}getChildren(){return[this._rootContainer]}getDescendants(t,e){return this._rootContainer.getDescendants(t,e)}getControlsByType(t){return this._rootContainer.getDescendants(!1,e=>e.typeName===t)}getControlByName(t){return this._getControlByKey("name",t)}_getControlByKey(t,e){return this._rootContainer.getDescendants().find(i=>i[t]===e)||null}get focusedControl(){return this._focusedControl}set focusedControl(t){this._focusedControl!=t&&(this._focusedControl&&this._focusedControl.onBlur(),t&&t.onFocus(),this._focusedControl=t)}get isForeground(){return this.layer?!this.layer.isBackground:!0}set isForeground(t){this.layer&&this.layer.isBackground!==!t&&(this.layer.isBackground=!t)}get clipboardData(){return this._clipboardData}set clipboardData(t){this._clipboardData=t}constructor(t,e=0,i=0,s,o=!1,r=V.NEAREST_SAMPLINGMODE,a=!0){super(t,{width:e,height:i},s,o,r,Gt.TEXTUREFORMAT_RGBA,a),this.onGuiReadyObservable=new x,this._isDirty=!1,this._rootContainer=new yt("root"),this._lastControlOver={},this._lastControlDown={},this._capturingControl={},this._linkedControls=new Array,this._isFullscreen=!1,this._fullscreenViewport=new ti(0,0,1,1),this._idealWidth=0,this._idealHeight=0,this._useSmallestIdeal=!1,this._renderAtIdealSize=!1,this._blockNextFocusCheck=!1,this._renderScale=1,this._cursorChanged=!1,this._defaultMousePointerId=0,this._rootChildrenHaveChanged=!1,this._capturedPointerIds=new Set,this._numLayoutCalls=0,this._numRenderCalls=0,this._clipboardData="",this.onClipboardObservable=new x,this.onControlPickedObservable=new x,this.onBeginLayoutObservable=new x,this.onEndLayoutObservable=new x,this.onBeginRenderObservable=new x,this.onEndRenderObservable=new x,this.premulAlpha=!1,this.applyYInversionOnUpdate=!0,this.checkPointerEveryFrame=!1,this._useInvalidateRectOptimization=!0,this._invalidatedRectangle=null,this._clearMeasure=new st(0,0,0,0),this._onClipboardCopy=_=>{const h=_,d=new Oi(Lt.COPY,h);this.onClipboardObservable.notifyObservers(d),h.preventDefault()},this._onClipboardCut=_=>{const h=_,d=new Oi(Lt.CUT,h);this.onClipboardObservable.notifyObservers(d),h.preventDefault()},this._onClipboardPaste=_=>{const h=_,d=new Oi(Lt.PASTE,h);this.onClipboardObservable.notifyObservers(d),h.preventDefault()},this.parseContent=this.parseSerializedObject,s=this.getScene(),!(!s||!this._texture)&&(this.applyYInversionOnUpdate=a,this._rootElement=s.getEngine().getInputElement(),this._renderObserver=s.onBeforeCameraRenderObservable.add(_=>this._checkUpdate(_)),this._controlAddedObserver=this._rootContainer.onControlAddedObservable.add(_=>{_&&(this._rootChildrenHaveChanged=!0)}),this._controlRemovedObserver=this._rootContainer.onControlRemovedObservable.add(_=>{_&&(this._rootChildrenHaveChanged=!0)}),this._preKeyboardObserver=s.onPreKeyboardObservable.add(_=>{this._focusedControl&&(_.type===ws.KEYDOWN&&this._focusedControl.processKeyboard(_.event),_.skipOnPointerObservable=!0)}),this._rootContainer._link(this),this.hasAlpha=!0,(!e||!i)&&(this._resizeObserver=s.getEngine().onResizeObservable.add(()=>this._onResize()),this._onResize()),this._texture.isReady=!0)}getClassName(){return"AdvancedDynamicTexture"}executeOnAllControls(t,e){e||(e=this._rootContainer),t(e);for(const i of e.children){if(i.children){this.executeOnAllControls(t,i);continue}t(i)}}get useInvalidateRectOptimization(){return this._useInvalidateRectOptimization}set useInvalidateRectOptimization(t){this._useInvalidateRectOptimization=t}invalidateRect(t,e,i,s){if(this._useInvalidateRectOptimization)if(!this._invalidatedRectangle)this._invalidatedRectangle=new st(t,e,i-t+1,s-e+1);else{const o=Math.ceil(Math.max(this._invalidatedRectangle.left+this._invalidatedRectangle.width-1,i)),r=Math.ceil(Math.max(this._invalidatedRectangle.top+this._invalidatedRectangle.height-1,s));this._invalidatedRectangle.left=Math.floor(Math.min(this._invalidatedRectangle.left,t)),this._invalidatedRectangle.top=Math.floor(Math.min(this._invalidatedRectangle.top,e)),this._invalidatedRectangle.width=o-this._invalidatedRectangle.left+1,this._invalidatedRectangle.height=r-this._invalidatedRectangle.top+1}}markAsDirty(){this._isDirty=!0}createStyle(){return new eo(this)}addControl(t){return this._rootContainer.addControl(t),this}removeControl(t){return this._rootContainer.removeControl(t),this}moveToNonOverlappedPosition(t,e=1,i=1){let s;if(Array.isArray(t))s=t;else{const o=this.getDescendants(!0);s=t===void 0?o.filter(r=>r.overlapGroup!==void 0):o.filter(r=>r.overlapGroup===t)}s.forEach(o=>{var r;let a=K.Zero();const _=new K(o.centerX,o.centerY);s.forEach(h=>{if(o!==h&&ct._Overlaps(o,h)){const d=_.subtract(new K(h.centerX,h.centerY)),u=d.length();u>0&&(a=a.add(d.normalize().scale(i/u)))}}),a.length()>0&&(a=a.normalize().scale(e*((r=o.overlapDeltaMultiplier)!==null&&r!==void 0?r:1)),o.linkOffsetXInPixels+=a.x,o.linkOffsetYInPixels+=a.y)})}dispose(){const t=this.getScene();t&&(this._rootElement=null,t.onBeforeCameraRenderObservable.remove(this._renderObserver),this._resizeObserver&&t.getEngine().onResizeObservable.remove(this._resizeObserver),this._prePointerObserver&&t.onPrePointerObservable.remove(this._prePointerObserver),this._sceneRenderObserver&&t.onBeforeRenderObservable.remove(this._sceneRenderObserver),this._pointerObserver&&t.onPointerObservable.remove(this._pointerObserver),this._preKeyboardObserver&&t.onPreKeyboardObservable.remove(this._preKeyboardObserver),this._canvasPointerOutObserver&&t.getEngine().onCanvasPointerOutObservable.remove(this._canvasPointerOutObserver),this._canvasBlurObserver&&t.getEngine().onCanvasBlurObservable.remove(this._canvasBlurObserver),this._controlAddedObserver&&this._rootContainer.onControlAddedObservable.remove(this._controlAddedObserver),this._controlRemovedObserver&&this._rootContainer.onControlRemovedObservable.remove(this._controlRemovedObserver),this._layerToDispose&&(this._layerToDispose.texture=null,this._layerToDispose.dispose(),this._layerToDispose=null),this._rootContainer.dispose(),this.onClipboardObservable.clear(),this.onControlPickedObservable.clear(),this.onBeginRenderObservable.clear(),this.onEndRenderObservable.clear(),this.onBeginLayoutObservable.clear(),this.onEndLayoutObservable.clear(),this.onGuiReadyObservable.clear(),super.dispose())}_onResize(){const t=this.getScene();if(!t)return;const e=t.getEngine(),i=this.getSize();let s=e.getRenderWidth()*this._renderScale,o=e.getRenderHeight()*this._renderScale;this._renderAtIdealSize&&(this._idealWidth?(o=o*this._idealWidth/s,s=this._idealWidth):this._idealHeight&&(s=s*this._idealHeight/o,o=this._idealHeight)),(i.width!==s||i.height!==o)&&(this.scaleTo(s,o),this.markAsDirty(),(this._idealWidth||this._idealHeight)&&this._rootContainer._markAllAsDirty()),this.invalidateRect(0,0,i.width-1,i.height-1)}_getGlobalViewport(){const t=this.getSize(),e=this._fullscreenViewport.toGlobal(t.width,t.height),i=Math.round(e.width*(1/this.rootContainer.scaleX)),s=Math.round(e.height*(1/this.rootContainer.scaleY));return e.x+=(e.width-i)/2,e.y+=(e.height-s)/2,e.width=i,e.height=s,e}getProjectedPosition(t,e){const i=this.getProjectedPositionWithZ(t,e);return new K(i.x,i.y)}getProjectedPositionWithZ(t,e){const i=this.getScene();if(!i)return c.Zero();const s=this._getGlobalViewport(),o=c.Project(t,e,i.getTransformMatrix(),s);return new c(o.x,o.y,o.z)}_checkUpdate(t,e){if(!(this._layerToDispose&&!(t.layerMask&this._layerToDispose.layerMask))){if(this._isFullscreen&&this._linkedControls.length){const i=this.getScene();if(!i)return;const s=this._getGlobalViewport();for(const o of this._linkedControls){if(!o.isVisible)continue;const r=o._linkedMesh;if(!r||r.isDisposed()){_t.SetImmediate(()=>{o.linkWithMesh(null)});continue}const a=r.getBoundingInfo?r.getBoundingInfo().boundingSphere.center:c.ZeroReadOnly,_=c.Project(a,r.getWorldMatrix(),i.getTransformMatrix(),s);if(_.z<0||_.z>1){o.notRenderable=!0;continue}o.notRenderable=!1,this.useInvalidateRectOptimization&&o.invalidateRect(),o._moveToProjectedPosition(_)}}!this._isDirty&&!this._rootContainer.isDirty||(this._isDirty=!1,this._render(e),e||this.update(this.applyYInversionOnUpdate,this.premulAlpha,ct.AllowGPUOptimizations))}}_render(t){var e;const i=this.getSize(),s=i.width,o=i.height,r=this.getContext();if(r.font="18px Arial",r.strokeStyle="white",this.onGuiReadyObservable.hasObservers()&&this._checkGuiIsReady(),this._rootChildrenHaveChanged){const _=(e=this.getScene())===null||e===void 0?void 0:e.activeCamera;_&&(this._rootChildrenHaveChanged=!1,this._checkUpdate(_,!0))}this.onBeginLayoutObservable.notifyObservers(this);const a=new st(0,0,s,o);this._numLayoutCalls=0,this._rootContainer._layout(a,r),this.onEndLayoutObservable.notifyObservers(this),this._isDirty=!1,!t&&(this._invalidatedRectangle?this._clearMeasure.copyFrom(this._invalidatedRectangle):this._clearMeasure.copyFromFloats(0,0,s,o),r.clearRect(this._clearMeasure.left,this._clearMeasure.top,this._clearMeasure.width,this._clearMeasure.height),this._background&&(r.save(),r.fillStyle=this._background,r.fillRect(this._clearMeasure.left,this._clearMeasure.top,this._clearMeasure.width,this._clearMeasure.height),r.restore()),this.onBeginRenderObservable.notifyObservers(this),this._numRenderCalls=0,this._rootContainer._render(r,this._invalidatedRectangle),this.onEndRenderObservable.notifyObservers(this),this._invalidatedRectangle=null)}_changeCursor(t){this._rootElement&&(this._rootElement.style.cursor=t,this._cursorChanged=!0)}_registerLastControlDown(t,e){this._lastControlDown[e]=t,this.onControlPickedObservable.notifyObservers(t)}_doPicking(t,e,i,s,o,r,a,_){const h=this.getScene();if(!h)return;const d=h.getEngine(),u=this.getSize();if(this._isFullscreen){const m=h.cameraToUseForPointers||h.activeCamera;if(!m)return;const b=m.viewport;t=t*(u.width/(d.getRenderWidth()*b.width)),e=e*(u.height/(d.getRenderHeight()*b.height))}if(this._capturingControl[o]){this._capturingControl[o].isPointerBlocker&&(this._shouldBlockPointer=!0),this._capturingControl[o]._processObservables(s,t,e,i,o,r);return}this._cursorChanged=!1,this._rootContainer._processPicking(t,e,i,s,o,r,a,_)||(h.doNotHandleCursors||this._changeCursor(""),s===D.POINTERMOVE&&this._lastControlOver[o]&&(this._lastControlOver[o]._onPointerOut(this._lastControlOver[o],i),delete this._lastControlOver[o])),!this._cursorChanged&&!h.doNotHandleCursors&&this._changeCursor(""),this._manageFocus()}_cleanControlAfterRemovalFromList(t,e){for(const i in t){if(!Object.prototype.hasOwnProperty.call(t,i))continue;t[i]===e&&delete t[i]}}_cleanControlAfterRemoval(t){this._cleanControlAfterRemovalFromList(this._lastControlDown,t),this._cleanControlAfterRemovalFromList(this._lastControlOver,t)}pick(t,e,i=null){this._isFullscreen&&this._scene&&this._translateToPicking(this._scene,new ti(0,0,0,0),i,t,e)}_translateToPicking(t,e,i,s=t.pointerX,o=t.pointerY){const r=t.cameraToUseForPointers||t.activeCamera,a=t.getEngine(),_=t.cameraToUseForPointers;if(!r)e.x=0,e.y=0,e.width=a.getRenderWidth(),e.height=a.getRenderHeight();else if(r.rigCameras.length){const u=new ti(0,0,1,1);r.rigCameras.forEach(m=>{m.viewport.toGlobalToRef(a.getRenderWidth(),a.getRenderHeight(),u);const b=s/a.getHardwareScalingLevel()-u.x,w=o/a.getHardwareScalingLevel()-(a.getRenderHeight()-u.y-u.height);b<0||w<0||s>u.width||o>u.height||(t.cameraToUseForPointers=m,e.x=u.x,e.y=u.y,e.width=u.width,e.height=u.height)})}else r.viewport.toGlobalToRef(a.getRenderWidth(),a.getRenderHeight(),e);const h=s/a.getHardwareScalingLevel()-e.x,d=o/a.getHardwareScalingLevel()-(a.getRenderHeight()-e.y-e.height);if(this._shouldBlockPointer=!1,i){const u=i.event.pointerId||this._defaultMousePointerId;this._doPicking(h,d,i,i.type,u,i.event.button,i.event.deltaX,i.event.deltaY),(this._shouldBlockPointer||this._capturingControl[u])&&(i.skipOnPointerObservable=!0)}else this._doPicking(h,d,null,D.POINTERMOVE,this._defaultMousePointerId,0);t.cameraToUseForPointers=_}attach(){const t=this.getScene();if(!t)return;const e=new ti(0,0,0,0);this._prePointerObserver=t.onPrePointerObservable.add(i=>{if(!(t.isPointerCaptured(i.event.pointerId)&&i.type===D.POINTERUP&&!this._capturedPointerIds.has(i.event.pointerId))&&!(i.type!==D.POINTERMOVE&&i.type!==D.POINTERUP&&i.type!==D.POINTERDOWN&&i.type!==D.POINTERWHEEL)){if(i.type===D.POINTERMOVE){if(t.isPointerCaptured(i.event.pointerId))return;i.event.pointerId&&(this._defaultMousePointerId=i.event.pointerId)}this._translateToPicking(t,e,i)}}),this._attachPickingToSceneRender(t,()=>this._translateToPicking(t,e,null),!1),this._attachToOnPointerOut(t),this._attachToOnBlur(t)}registerClipboardEvents(){self.addEventListener("copy",this._onClipboardCopy,!1),self.addEventListener("cut",this._onClipboardCut,!1),self.addEventListener("paste",this._onClipboardPaste,!1)}unRegisterClipboardEvents(){self.removeEventListener("copy",this._onClipboardCopy),self.removeEventListener("cut",this._onClipboardCut),self.removeEventListener("paste",this._onClipboardPaste)}_transformUvs(t){const e=this.getTextureMatrix();let i;if(e.isIdentityAs3x2())i=t;else{const s=p.Matrix[0];e.getRowToRef(0,p.Vector4[0]),e.getRowToRef(1,p.Vector4[1]),e.getRowToRef(2,p.Vector4[2]);const o=p.Vector4[0],r=p.Vector4[1],a=p.Vector4[2];s.setRowFromFloats(0,o.x,o.y,0,0),s.setRowFromFloats(1,r.x,r.y,0,0),s.setRowFromFloats(2,0,0,1,0),s.setRowFromFloats(3,a.x,a.y,0,1),i=p.Vector2[0],K.TransformToRef(t,s,i)}if((this.wrapU===V.WRAP_ADDRESSMODE||this.wrapU===V.MIRROR_ADDRESSMODE)&&i.x>1){let s=i.x-Math.trunc(i.x);this.wrapU===V.MIRROR_ADDRESSMODE&&Math.trunc(i.x)%2===1&&(s=1-s),i.x=s}if((this.wrapV===V.WRAP_ADDRESSMODE||this.wrapV===V.MIRROR_ADDRESSMODE)&&i.y>1){let s=i.y-Math.trunc(i.y);this.wrapV===V.MIRROR_ADDRESSMODE&&Math.trunc(i.x)%2===1&&(s=1-s),i.y=s}return i}attachToMesh(t,e=!0){const i=this.getScene();i&&(this._pointerObserver&&i.onPointerObservable.remove(this._pointerObserver),this._pointerObserver=i.onPointerObservable.add(s=>{if(s.type!==D.POINTERMOVE&&s.type!==D.POINTERUP&&s.type!==D.POINTERDOWN&&s.type!==D.POINTERWHEEL)return;s.type===D.POINTERMOVE&&s.event.pointerId&&(this._defaultMousePointerId=s.event.pointerId);const o=s.event.pointerId||this._defaultMousePointerId;if(s.pickInfo&&s.pickInfo.hit&&s.pickInfo.pickedMesh===t){let r=s.pickInfo.getTextureCoordinates();if(r){r=this._transformUvs(r);const a=this.getSize();this._doPicking(r.x*a.width,(this.applyYInversionOnUpdate?1-r.y:r.y)*a.height,s,s.type,o,s.event.button,s.event.deltaX,s.event.deltaY)}}else if(s.type===D.POINTERUP){if(this._lastControlDown[o]&&this._lastControlDown[o]._forcePointerUp(o),delete this._lastControlDown[o],this.focusedControl){const r=this.focusedControl.keepsFocusWith();let a=!0;if(r)for(const _ of r){if(this===_._host)continue;const h=_._host;if(h._lastControlOver[o]&&h._lastControlOver[o].isAscendant(_)){a=!1;break}}a&&(this.focusedControl=null)}}else s.type===D.POINTERMOVE&&(this._lastControlOver[o]&&this._lastControlOver[o]._onPointerOut(this._lastControlOver[o],s,!0),delete this._lastControlOver[o])}),t.enablePointerMoveEvents=e,this._attachPickingToSceneRender(i,()=>{const s=this._defaultMousePointerId,o=i==null?void 0:i.pick(i.pointerX,i.pointerY);if(o&&o.hit&&o.pickedMesh===t){let r=o.getTextureCoordinates();if(r){r=this._transformUvs(r);const a=this.getSize();this._doPicking(r.x*a.width,(this.applyYInversionOnUpdate?1-r.y:r.y)*a.height,null,D.POINTERMOVE,s,0)}}else this._lastControlOver[s]&&this._lastControlOver[s]._onPointerOut(this._lastControlOver[s],null,!0),delete this._lastControlOver[s]},!0),this._attachToOnPointerOut(i),this._attachToOnBlur(i))}moveFocusToControl(t){this.focusedControl=t,this._lastPickedControl=t,this._blockNextFocusCheck=!0}_manageFocus(){if(this._blockNextFocusCheck){this._blockNextFocusCheck=!1,this._lastPickedControl=this._focusedControl;return}if(this._focusedControl&&this._focusedControl!==this._lastPickedControl){if(this._lastPickedControl.isFocusInvisible)return;this.focusedControl=null}}_attachPickingToSceneRender(t,e,i){this._sceneRenderObserver=t.onBeforeRenderObservable.add(()=>{this.checkPointerEveryFrame&&(this._linkedControls.length>0||i)&&e()})}_attachToOnPointerOut(t){this._canvasPointerOutObserver=t.getEngine().onCanvasPointerOutObservable.add(e=>{this._lastControlOver[e.pointerId]&&this._lastControlOver[e.pointerId]._onPointerOut(this._lastControlOver[e.pointerId],null),delete this._lastControlOver[e.pointerId],this._lastControlDown[e.pointerId]&&this._lastControlDown[e.pointerId]!==this._capturingControl[e.pointerId]&&(this._lastControlDown[e.pointerId]._forcePointerUp(e.pointerId),delete this._lastControlDown[e.pointerId])})}_attachToOnBlur(t){this._canvasBlurObserver=t.getEngine().onCanvasBlurObservable.add(()=>{Object.entries(this._lastControlDown).forEach(([,e])=>{e._onCanvasBlur()}),this.focusedControl=null,this._lastControlDown={}})}serializeContent(){const t=this.getSize(),e={root:{},width:t.width,height:t.height};return this._rootContainer.serialize(e.root),e}parseSerializedObject(t,e){if(this._rootContainer=f.Parse(t.root,this),e){const i=t.width,s=t.height;typeof i=="number"&&typeof s=="number"&&i>=0&&s>=0?this.scaleTo(i,s):this.scaleTo(1920,1080)}}clone(t){const e=this.getScene();if(!e)return this;const i=this.getSize(),s=this.serializeContent(),o=new ct(t??"Clone of "+this.name,i.width,i.height,e,!this.noMipmap,this.samplingMode);return o.parseSerializedObject(s),o}static async ParseFromSnippetAsync(t,e,i){const s=i??ct.CreateFullscreenUI("ADT from snippet");if(t==="_BLANK")return s;const o=await ct._LoadURLContentAsync(ct.SnippetUrl+"/"+t.replace(/#/g,"/"),!0);return s.parseSerializedObject(o,e),s}parseFromSnippetAsync(t,e){return ct.ParseFromSnippetAsync(t,e,this)}static async ParseFromFileAsync(t,e,i){const s=i??ct.CreateFullscreenUI("ADT from URL"),o=await ct._LoadURLContentAsync(t);return s.parseSerializedObject(o,e),s}parseFromURLAsync(t,e){return ct.ParseFromFileAsync(t,e,this)}static _LoadURLContentAsync(t,e=!1){return t===""?Promise.reject("No URL provided"):new Promise((i,s)=>{const o=new Es;o.addEventListener("readystatechange",()=>{if(o.readyState==4)if(o.status==200){let r;if(e){const _=JSON.parse(JSON.parse(o.responseText).jsonPayload);r=_.encodedGui?new TextDecoder("utf-8").decode(Os(_.encodedGui)):_.gui}else r=o.responseText;const a=JSON.parse(r);i(a)}else s("Unable to load")}),o.open("GET",t),o.send()})}static _Overlaps(t,e){return!(t.centerX>e.centerX+e.widthInPixels||t.centerX+t.widthInPixels<e.centerX||t.centerY+t.heightInPixels<e.centerY||t.centerY>e.centerY+e.heightInPixels)}static CreateForMesh(t,e=1024,i=1024,s=!0,o=!1,r,a=this._CreateMaterial){const _=Ds(),h=new ct(`AdvancedDynamicTexture for ${t.name} [${_}]`,e,i,t.getScene(),!0,V.TRILINEAR_SAMPLINGMODE,r);return a(t,_,h,o),h.attachToMesh(t,s),h}static _CreateMaterial(t,e,i,s){const o=as("BABYLON.StandardMaterial");if(!o)throw"StandardMaterial needs to be imported before as it contains a side-effect required by your code.";const r=new o(`AdvancedDynamicTextureMaterial for ${t.name} [${e}]`,t.getScene());r.backFaceCulling=!1,r.diffuseColor=E.Black(),r.specularColor=E.Black(),s?(r.diffuseTexture=i,r.emissiveTexture=i,i.hasAlpha=!0):(r.emissiveTexture=i,r.opacityTexture=i),t.material=r}static CreateForMeshTexture(t,e=1024,i=1024,s=!0,o){const r=new ct(t.name+" AdvancedDynamicTexture",e,i,t.getScene(),!0,V.TRILINEAR_SAMPLINGMODE,o);return r.attachToMesh(t,s),r}static CreateFullscreenUI(t,e=!0,i=null,s=V.BILINEAR_SAMPLINGMODE,o=!1){const r=new ct(t,0,0,i,!1,s),a=r.getScene(),_=new Ks(t+"_layer",null,a,!e);if(_.texture=r,r._layerToDispose=_,r._isFullscreen=!0,o&&a){const h=1/a.getEngine().getHardwareScalingLevel();r._rootContainer.scaleX=h,r._rootContainer.scaleY=h}return r.attach(),r}scale(t){super.scale(t),this.markAsDirty()}scaleTo(t,e){super.scaleTo(t,e),this.markAsDirty()}_checkGuiIsReady(){this.guiIsReady()&&(this.onGuiReadyObservable.notifyObservers(this),this.onGuiReadyObservable.clear())}guiIsReady(){return this._rootContainer.isReady()}}ct.SnippetUrl=Gt.SnippetUrl;ct.AllowGPUOptimizations=!0;class Fi extends c{constructor(t,e=0){super(t.x,t.y,t.z),this.buttonIndex=e}}class yi{get position(){return this._node?this._node.position:c.Zero()}set position(t){this._node&&(this._node.position=t)}get scaling(){return this._node?this._node.scaling:new c(1,1,1)}set scaling(t){this._node&&(this._isScaledByManager=!1,this._node.scaling=t)}get behaviors(){return this._behaviors}addBehavior(t){if(this._behaviors.indexOf(t)!==-1)return this;t.init();const i=this._host.scene;return i.isLoading?i.onDataLoadedObservable.addOnce(()=>{t.attach(this)}):t.attach(this),this._behaviors.push(t),this}removeBehavior(t){const e=this._behaviors.indexOf(t);return e===-1?this:(this._behaviors[e].detach(),this._behaviors.splice(e,1),this)}getBehaviorByName(t){for(const e of this._behaviors)if(e.name===t)return e;return null}get isVisible(){return this._isVisible}set isVisible(t){if(this._isVisible===t)return;this._isVisible=t;const e=this.mesh;e&&e.setEnabled(t)}constructor(t){this.name=t,this._downCount=0,this._enterCount=-1,this._downPointerIds={},this._isVisible=!0,this._isScaledByManager=!1,this.onPointerMoveObservable=new x,this.onPointerOutObservable=new x,this.onPointerDownObservable=new x,this.onPointerUpObservable=new x,this.onPointerClickObservable=new x,this.onPointerEnterObservable=new x,this._behaviors=new Array}get typeName(){return this._getTypeName()}getClassName(){return this._getTypeName()}_getTypeName(){return"Control3D"}get node(){return this._node}get mesh(){return this._node instanceof ei?this._node:null}linkToTransformNode(t){return this._node&&(this._node.parent=t),this}_prepareNode(t){if(!this._node){if(this._node=this._createNode(t),!this.node)return;this._injectGUI3DReservedDataStore(this.node).control=this;const e=this.mesh;e&&(e.isPickable=!0,this._affectMaterial(e))}}_injectGUI3DReservedDataStore(t){var e,i;return t.reservedDataStore=(e=t.reservedDataStore)!==null&&e!==void 0?e:{},t.reservedDataStore.GUI3D=(i=t.reservedDataStore.GUI3D)!==null&&i!==void 0?i:{},t.reservedDataStore.GUI3D}_createNode(t){return null}_affectMaterial(t){t.material=null}_isTouchButton3D(t){return t._generatePointerEventType!==void 0}_onPointerMove(t,e){this.onPointerMoveObservable.notifyObservers(e,-1,t,this)}_onPointerEnter(t){return this._enterCount===-1&&(this._enterCount=0),this._enterCount++,this._enterCount>1?!1:(this.onPointerEnterObservable.notifyObservers(this,-1,t,this),this.pointerEnterAnimation&&this.pointerEnterAnimation(),!0)}_onPointerOut(t){this._enterCount--,!(this._enterCount>0)&&(this._enterCount=0,this.onPointerOutObservable.notifyObservers(this,-1,t,this),this.pointerOutAnimation&&this.pointerOutAnimation())}_onPointerDown(t,e,i,s){return this._downCount++,this._downPointerIds[i]=this._downPointerIds[i]+1||1,this._downCount!==1?!1:(this.onPointerDownObservable.notifyObservers(new Fi(e,s),-1,t,this),this.pointerDownAnimation&&this.pointerDownAnimation(),!0)}_onPointerUp(t,e,i,s,o){if(this._downCount--,this._downPointerIds[i]--,this._downPointerIds[i]<=0&&delete this._downPointerIds[i],this._downCount<0){this._downCount=0;return}this._downCount==0&&(o&&(this._enterCount>0||this._enterCount===-1)&&this.onPointerClickObservable.notifyObservers(new Fi(e,s),-1,t,this),this.onPointerUpObservable.notifyObservers(new Fi(e,s),-1,t,this),this.pointerUpAnimation&&this.pointerUpAnimation())}forcePointerUp(t=null){if(t!==null)this._onPointerUp(this,c.Zero(),t,0,!0);else{for(const e in this._downPointerIds)this._onPointerUp(this,c.Zero(),+e,0,!0);this._downCount>0&&(this._downCount=1,this._onPointerUp(this,c.Zero(),0,0,!0))}}_processObservables(t,e,i,s,o){if(this._isTouchButton3D(this)&&i&&(t=this._generatePointerEventType(t,i,this._downCount)),t===D.POINTERMOVE){this._onPointerMove(this,e);const r=this._host._lastControlOver[s];return r&&r!==this&&r._onPointerOut(this),r!==this&&this._onPointerEnter(this),this._host._lastControlOver[s]=this,!0}return t===D.POINTERDOWN?(this._onPointerDown(this,e,s,o),this._host._lastControlDown[s]=this,this._host._lastPickedControl=this,!0):t===D.POINTERUP||t===D.POINTERDOUBLETAP?(this._host._lastControlDown[s]&&this._host._lastControlDown[s]._onPointerUp(this,e,s,o,!0),delete this._host._lastControlDown[s],!0):!1}_disposeNode(){this._node&&(this._node.dispose(),this._node=null)}dispose(){this.onPointerDownObservable.clear(),this.onPointerEnterObservable.clear(),this.onPointerMoveObservable.clear(),this.onPointerOutObservable.clear(),this.onPointerUpObservable.clear(),this.onPointerClickObservable.clear(),this._disposeNode();for(const t of this._behaviors)t.detach()}}class gs extends yi{constructor(){super(...arguments),this._contentResolution=512,this._contentScaleRatio=2}get content(){return this._content}set content(t){this._content=t,!(!t||!this._host||!this._host.utilityLayer)&&(this._facadeTexture?this._facadeTexture.rootContainer.clearControls():(this._facadeTexture=new ct("Facade",this._contentResolution,this._contentResolution,this._host.utilityLayer.utilityLayerScene,!0,V.TRILINEAR_SAMPLINGMODE),this._setFacadeTextureScaling(),this._facadeTexture.premulAlpha=!0),this._facadeTexture.addControl(t),this._applyFacade(this._facadeTexture))}_setFacadeTextureScaling(){var t;this._facadeTexture&&(this._facadeTexture.rootContainer.scaleX=this._contentScaleRatio,this._facadeTexture.rootContainer.scaleY=(t=this._contentScaleRatioY)!==null&&t!==void 0?t:this._contentScaleRatio)}get contentResolution(){return this._contentResolution}set contentResolution(t){this._contentResolution!==t&&(this._contentResolution=t,this._resetContent())}_disposeFacadeTexture(){this._facadeTexture&&(this._facadeTexture.dispose(),this._facadeTexture=null)}_resetContent(){this._disposeFacadeTexture(),this.content=this._content}_applyFacade(t){}}class io extends gs{constructor(t){super(t)}_getTypeName(){return"AbstractButton3D"}_createNode(t){return new ne("button"+this.name,t)}}class so extends io{constructor(t,e){super(t),this._options={width:1,height:1,depth:.08,...e},this.pointerEnterAnimation=()=>{this.mesh&&(this._currentMaterial.emissiveColor=E.Red())},this.pointerOutAnimation=()=>{this._currentMaterial.emissiveColor=E.Black()},this.pointerDownAnimation=()=>{this.mesh&&this.mesh.scaling.scaleInPlace(.95)},this.pointerUpAnimation=()=>{this.mesh&&this.mesh.scaling.scaleInPlace(1/.95)}}_applyFacade(t){this._currentMaterial.emissiveTexture=t}_getTypeName(){return"Button3D"}_createNode(t){const e=new Array(6);for(let s=0;s<6;s++)e[s]=new lt(0,0,0,0);t.useRightHandedSystem?e[0].copyFromFloats(1,0,0,1):e[1].copyFromFloats(0,0,1,1);const i=Bt(this.name+"_rootMesh",{width:this._options.width,height:this._options.height,depth:this._options.depth,faceUV:e,wrap:!0},t);return this._contentScaleRatioY=this._contentScaleRatio*this._options.width/this._options.height,this._setFacadeTextureScaling(),i}_affectMaterial(t){const e=new ii(this.name+"Material",t.getScene());e.specularColor=E.Black(),t.material=e,this._currentMaterial=e,this._resetContent()}dispose(){super.dispose(),this._disposeFacadeTexture(),this._currentMaterial&&this._currentMaterial.dispose()}}class ae extends yi{get children(){return this._children}get blockLayout(){return this._blockLayout}set blockLayout(t){this._blockLayout!==t&&(this._blockLayout=t,this._blockLayout||this._arrangeChildren())}constructor(t){super(t),this._blockLayout=!1,this._children=new Array}updateLayout(){return this._arrangeChildren(),this}containsControl(t){return this._children.indexOf(t)!==-1}addControl(t){return this._children.indexOf(t)!==-1?this:(t.parent=this,t._host=this._host,this._children.push(t),this._host.utilityLayer&&(t._prepareNode(this._host.utilityLayer.utilityLayerScene),t.node&&(t.node.parent=this.node),this.blockLayout||this._arrangeChildren()),this)}_arrangeChildren(){}_createNode(t){return new ne("ContainerNode",t)}removeControl(t){const e=this._children.indexOf(t);return e!==-1&&(this._children.splice(e,1),t.parent=null,t._disposeNode()),this}_getTypeName(){return"Container3D"}dispose(){for(const t of this._children)t.dispose();this._children.length=0,super.dispose()}}ae.UNSET_ORIENTATION=0;ae.FACEORIGIN_ORIENTATION=1;ae.FACEORIGINREVERSED_ORIENTATION=2;ae.FACEFORWARD_ORIENTATION=3;ae.FACEFORWARDREVERSED_ORIENTATION=4;class oo extends ae{get orientation(){return this._orientation}set orientation(t){this._orientation!==t&&(this._orientation=t,_t.SetImmediate(()=>{this._arrangeChildren()}))}get columns(){return this._columns}set columns(t){this._columns!==t&&(this._columns=t,this._rowThenColum=!0,_t.SetImmediate(()=>{this._arrangeChildren()}))}get rows(){return this._rows}set rows(t){this._rows!==t&&(this._rows=t,this._rowThenColum=!1,_t.SetImmediate(()=>{this._arrangeChildren()}))}constructor(t){super(t),this._columns=10,this._rows=0,this._rowThenColum=!0,this._orientation=ae.FACEORIGIN_ORIENTATION,this.margin=0}_arrangeChildren(){this._cellWidth=0,this._cellHeight=0;let t=0,e=0,i=0;const s=Ct.Invert(this.node.computeWorldMatrix(!0));for(const h of this._children){if(!h.mesh)continue;i++,h.mesh.computeWorldMatrix(!0);const d=h.mesh.getHierarchyBoundingVectors(),u=p.Vector3[0],m=p.Vector3[1];d.max.subtractToRef(d.min,m),m.scaleInPlace(.5),c.TransformNormalToRef(m,s,u),this._cellWidth=Math.max(this._cellWidth,u.x*2),this._cellHeight=Math.max(this._cellHeight,u.y*2)}this._cellWidth+=this.margin*2,this._cellHeight+=this.margin*2,this._rowThenColum?(e=this._columns,t=Math.ceil(i/this._columns)):(t=this._rows,e=Math.ceil(i/this._rows));const o=e*.5*this._cellWidth,r=t*.5*this._cellHeight,a=[];let _=0;if(this._rowThenColum)for(let h=0;h<t;h++)for(let d=0;d<e&&(a.push(new c(d*this._cellWidth-o+this._cellWidth/2,h*this._cellHeight-r+this._cellHeight/2,0)),_++,!(_>i));d++);else for(let h=0;h<e;h++)for(let d=0;d<t&&(a.push(new c(h*this._cellWidth-o+this._cellWidth/2,d*this._cellHeight-r+this._cellHeight/2,0)),_++,!(_>i));d++);_=0;for(const h of this._children)h.mesh&&(this._mapGridNode(h,a[_]),_++);this._finalProcessing()}_finalProcessing(){}}const ro="fluentVertexShader",ao=`precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 world;
uniform mat4 viewProjection;
varying vec2 vUV;
#ifdef BORDER
varying vec2 scaleInfo;
uniform float borderWidth;
uniform vec3 scaleFactor;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;
#endif
void main(void) {
vUV=uv;
#ifdef BORDER
vec3 scale=scaleFactor;
float minScale=min(min(scale.x,scale.y),scale.z);
float maxScale=max(max(scale.x,scale.y),scale.z);
float minOverMiddleScale=minScale/(scale.x+scale.y+scale.z-minScale-maxScale);
float areaYZ=scale.y*scale.z;
float areaXZ=scale.x*scale.z;
float areaXY=scale.x*scale.y;
float scaledBorderWidth=borderWidth; 
if (abs(normal.x)==1.0) 
{
scale.x=scale.y;
scale.y=scale.z;
if (areaYZ>areaXZ && areaYZ>areaXY)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
else if (abs(normal.y)==1.0) 
{
scale.x=scale.z;
if (areaXZ>areaXY && areaXZ>areaYZ)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
else 
{
if (areaXY>areaYZ && areaXY>areaXZ)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
float scaleRatio=min(scale.x,scale.y)/max(scale.x,scale.y);
if (scale.x>scale.y)
{
scaleInfo.x=1.0-(scaledBorderWidth*scaleRatio);
scaleInfo.y=1.0-scaledBorderWidth;
}
else
{
scaleInfo.x=1.0-scaledBorderWidth;
scaleInfo.y=1.0-(scaledBorderWidth*scaleRatio);
} 
#endif 
vec4 worldPos=world*vec4(position,1.0);
#ifdef HOVERLIGHT
worldPosition=worldPos.xyz;
#endif
gl_Position=viewProjection*worldPos;
}
`;ot.ShadersStore[ro]=ao;const no="fluentPixelShader",lo=`precision highp float;
varying vec2 vUV;
uniform vec4 albedoColor;
#ifdef INNERGLOW
uniform vec4 innerGlowColor;
#endif
#ifdef BORDER
varying vec2 scaleInfo;
uniform float edgeSmoothingValue;
uniform float borderMinValue;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;
uniform vec3 hoverPosition;
uniform vec4 hoverColor;
uniform float hoverRadius;
#endif
#ifdef TEXTURE
uniform sampler2D albedoSampler;
uniform mat4 textureMatrix;
vec2 finalUV;
#endif
void main(void) {
vec3 albedo=albedoColor.rgb;
float alpha=albedoColor.a;
#ifdef TEXTURE
finalUV=vec2(textureMatrix*vec4(vUV,1.0,0.0));
albedo=texture2D(albedoSampler,finalUV).rgb;
#endif
#ifdef HOVERLIGHT
float pointToHover=(1.0-clamp(length(hoverPosition-worldPosition)/hoverRadius,0.,1.))*hoverColor.a;
albedo=clamp(albedo+hoverColor.rgb*pointToHover,0.,1.);
#else
float pointToHover=1.0;
#endif
#ifdef BORDER 
float borderPower=10.0;
float inverseBorderPower=1.0/borderPower;
vec3 borderColor=albedo*borderPower;
vec2 distanceToEdge;
distanceToEdge.x=abs(vUV.x-0.5)*2.0;
distanceToEdge.y=abs(vUV.y-0.5)*2.0;
float borderValue=max(smoothstep(scaleInfo.x-edgeSmoothingValue,scaleInfo.x+edgeSmoothingValue,distanceToEdge.x),
smoothstep(scaleInfo.y-edgeSmoothingValue,scaleInfo.y+edgeSmoothingValue,distanceToEdge.y));
borderColor=borderColor*borderValue*max(borderMinValue*inverseBorderPower,pointToHover); 
albedo+=borderColor;
alpha=max(alpha,borderValue);
#endif
#ifdef INNERGLOW
vec2 uvGlow=(vUV-vec2(0.5,0.5))*(innerGlowColor.a*2.0);
uvGlow=uvGlow*uvGlow;
uvGlow=uvGlow*uvGlow;
albedo+=mix(vec3(0.0,0.0,0.0),innerGlowColor.rgb,uvGlow.x+uvGlow.y); 
#endif
gl_FragColor=vec4(albedo,alpha);
}`;ot.ShadersStore[no]=lo;class _o extends le{constructor(){super(),this.INNERGLOW=!1,this.BORDER=!1,this.HOVERLIGHT=!1,this.TEXTURE=!1,this.rebuild()}}class dt extends _e{constructor(t,e){super(t,e),this.innerGlowColorIntensity=.5,this.innerGlowColor=new E(1,1,1),this.albedoColor=new E(.3,.35,.4),this.renderBorders=!1,this.borderWidth=.5,this.edgeSmoothingValue=.02,this.borderMinValue=.1,this.renderHoverLight=!1,this.hoverRadius=.01,this.hoverColor=new z(.3,.3,.3,1),this.hoverPosition=c.Zero()}needAlphaBlending(){return this.alpha!==1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new _o);const i=this.getScene(),s=e.materialDefines;if(!this.checkReadyOnEveryCall&&e.effect&&s._renderId===i.getRenderId())return!0;if(s._areTexturesDirty)if(s.INNERGLOW=this.innerGlowColorIntensity>0,s.BORDER=this.renderBorders,s.HOVERLIGHT=this.renderHoverLight,this._albedoTexture)if(this._albedoTexture.isReadyOrNotBlocking())s.TEXTURE=!0;else return!1;else s.TEXTURE=!1;const o=i.getEngine();if(s.isDirty){s.markAsProcessed(),i.resetCachedMaterial();const r=[B.PositionKind];r.push(B.NormalKind),r.push(B.UVKind);const a="fluent",_=["world","viewProjection","innerGlowColor","albedoColor","borderWidth","edgeSmoothingValue","scaleFactor","borderMinValue","hoverColor","hoverPosition","hoverRadius","textureMatrix"],h=["albedoSampler"],d=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:_,uniformBuffersNames:d,samplers:h,defines:s,maxSimultaneousLights:4});const u=s.toString();e.setEffect(i.getEngine().createEffect(a,{attributes:r,uniformsNames:_,uniformBuffersNames:d,samplers:h,defines:u,fallbacks:null,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),s,this._materialContext)}return!e.effect||!e.effect.isReady()?!1:(s._renderId=i.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){const s=this.getScene(),o=i.materialDefines;if(!o)return;const r=i.effect;if(r){if(this._activeEffect=r,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._mustRebind(s,r)&&(this._activeEffect.setColor4("albedoColor",this.albedoColor,this.alpha),o.INNERGLOW&&this._activeEffect.setColor4("innerGlowColor",this.innerGlowColor,this.innerGlowColorIntensity),o.BORDER&&(this._activeEffect.setFloat("borderWidth",this.borderWidth),this._activeEffect.setFloat("edgeSmoothingValue",this.edgeSmoothingValue),this._activeEffect.setFloat("borderMinValue",this.borderMinValue),e.getBoundingInfo().boundingBox.extendSize.multiplyToRef(e.scaling,p.Vector3[0]),this._activeEffect.setVector3("scaleFactor",p.Vector3[0])),o.HOVERLIGHT&&(this._activeEffect.setDirectColor4("hoverColor",this.hoverColor),this._activeEffect.setFloat("hoverRadius",this.hoverRadius),this._activeEffect.setVector3("hoverPosition",this.hoverPosition)),o.TEXTURE&&this._albedoTexture)){this._activeEffect.setTexture("albedoSampler",this._albedoTexture);const a=this._albedoTexture.getTextureMatrix();this._activeEffect.setMatrix("textureMatrix",a)}this._afterBind(e,this._activeEffect)}}getActiveTextures(){return super.getActiveTextures()}hasTexture(t){return!!super.hasTexture(t)}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new dt(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.GUI.FluentMaterial",t}getClassName(){return"FluentMaterial"}static Parse(t,e,i){return q.Parse(()=>new dt(t.name,e),t,e,i)}}n([l(),xi("_markAllSubMeshesAsTexturesDirty")],dt.prototype,"innerGlowColorIntensity",void 0);n([ns()],dt.prototype,"innerGlowColor",void 0);n([ns()],dt.prototype,"albedoColor",void 0);n([l(),xi("_markAllSubMeshesAsTexturesDirty")],dt.prototype,"renderBorders",void 0);n([l()],dt.prototype,"borderWidth",void 0);n([l()],dt.prototype,"edgeSmoothingValue",void 0);n([l()],dt.prototype,"borderMinValue",void 0);n([l(),xi("_markAllSubMeshesAsTexturesDirty")],dt.prototype,"renderHoverLight",void 0);n([l()],dt.prototype,"hoverRadius",void 0);n([ls()],dt.prototype,"hoverColor",void 0);n([Oe()],dt.prototype,"hoverPosition",void 0);n([Fs("albedoTexture")],dt.prototype,"_albedoTexture",void 0);n([xi("_markAllSubMeshesAsTexturesAndMiscDirty")],dt.prototype,"albedoTexture",void 0);k("BABYLON.GUI.FluentMaterial",dt);class Ue extends oo{get backPlateMargin(){return this._backPlateMargin}set backPlateMargin(t){this._backPlateMargin=t,this._children.length>=1&&(this.children.forEach(e=>{this._updateCurrentMinMax(e.position)}),this._updateMargins())}_createNode(t){const e=new li(`menu_${this.name}`,t);return this._backPlate=Bt("backPlate"+this.name,{size:1},t),this._backPlate.parent=e,e}_affectMaterial(t){this._backPlateMaterial=new dt(this.name+"backPlateMaterial",t.getScene()),this._backPlateMaterial.albedoColor=new E(.08,.15,.55),this._backPlateMaterial.renderBorders=!0,this._backPlateMaterial.renderHoverLight=!0,this._pickedPointObserver=this._host.onPickedPointChangedObservable.add(e=>{e?(this._backPlateMaterial.hoverPosition=e,this._backPlateMaterial.hoverColor.a=1):this._backPlateMaterial.hoverColor.a=0}),this._backPlate.material=this._backPlateMaterial}_mapGridNode(t,e){t.mesh&&(t.position=e.clone(),this._updateCurrentMinMax(e))}_finalProcessing(){this._updateMargins()}_updateCurrentMinMax(t){this._currentMin||(this._currentMin=t.clone(),this._currentMax=t.clone()),this._currentMin.minimizeInPlace(t),this._currentMax.maximizeInPlace(t)}_updateMargins(){if(this._children.length>0){this._currentMin.addInPlaceFromFloats(-this._cellWidth/2,-this._cellHeight/2,0),this._currentMax.addInPlaceFromFloats(this._cellWidth/2,this._cellHeight/2,0);const t=this._currentMax.subtract(this._currentMin);this._backPlate.scaling.x=t.x+this._cellWidth*this.backPlateMargin,this._backPlate.scaling.y=t.y+this._cellHeight*this.backPlateMargin,this._backPlate.scaling.z=.001;for(let e=0;e<this._children.length;e++)this._children[e].position.subtractInPlace(this._currentMin).subtractInPlace(t.scale(.5)),this._children[e].position.z-=.01}this._currentMin=null,this._currentMax=null}constructor(t){super(t),this._backPlateMargin=1.25}addButton(t){const e=this.blockLayout;return e||(this.blockLayout=!0),super.addControl(t),t.isBackplateVisible=!1,t.scaling.scaleInPlace(Ue.MENU_BUTTON_SCALE),e||(this.blockLayout=!1),this}addControl(t){return Hi.Warn("TouchHolographicMenu can only contain buttons. Please use the method `addButton` instead."),this}dispose(){super.dispose(),this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver)}}Ue.MENU_BUTTON_SCALE=1;const ho="fluentBackplatePixelShader",co=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform float _Angle_;
uniform float _Fade_Out_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform sampler2D _Iridescent_Map_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
void Round_Rect_Fragment_B31(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{
float d=length(max(abs(UV)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
float g=min(Rect_Parms.z,Rect_Parms.w);
float dgrad=max(fwidth(g)*Filter_Width,0.00001);
float Inside_Rect=clamp(g/dgrad,0.0,1.0);
float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);
Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;
}
void Blob_Fragment_B71(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void Line_Fragment_B48(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{
float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);
Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);
}
void Scale_RGB_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Conditional_Float_B38(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void main()
{
float R_Q72;
float G_Q72;
float B_Q72;
float A_Q72;
R_Q72=vColor.r; G_Q72=vColor.g; B_Q72=vColor.b; A_Q72=vColor.a;
vec4 Blob_Color_Q71;
#if BLOB_ENABLE
float k1=dot(vExtra2.xy,vExtra2.xy);
float k2=dot(vExtra3.xy,vExtra3.xy);
vec3 closer=k1<k2 ? vec3(k1,vExtra2.z,vExtra2.w) : vec3(k2,vExtra3.z,vExtra3.w);
Blob_Color_Q71=closer.z*texture(_Blob_Texture_,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
#else
Blob_Color_Q71=vec4(0,0,0,0);
#endif
vec4 Line_Color_Q48;
Line_Fragment_B48(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q48);
float X_Q67;
float Y_Q67;
X_Q67=vUV.x;
Y_Q67=vUV.y;
vec3 Incident_Q66=normalize(vPosition-cameraPosition);
vec3 Reflected_Q60=reflect(Incident_Q66,vBinormal);
float Product_Q63=Y_Q67*_Vertical_Offset_;
float Dot_Q68=dot(Incident_Q66, Reflected_Q60);
float Dot_Q57=dot(vNormal, Incident_Q66);
float Result_Q38;
Conditional_Float_B38(_Reflected_,Dot_Q68,Dot_Q57,Result_Q38);
float Product_Q64=Result_Q38*_Frequency_;
float Sum_Q69=Product_Q64+1.0;
float Product_Q70=Sum_Q69*0.5;
float Sum_Q62=Product_Q63+Product_Q70;
float FractF_Q59=fract(Sum_Q62);
vec2 Vec2_Q65=vec2(FractF_Q59,0.5);
vec4 Color_Q58;
#if IRIDESCENT_MAP_ENABLE
Color_Q58=texture(_Iridescent_Map_,Vec2_Q65);
#else
Color_Q58=vec4(0,0,0,0);
#endif
vec4 Result_Q54;
Scale_RGB_B54(Color_Q58,_Iridescence_Edge_Intensity_,Result_Q54);
vec4 Result_Q55;
Scale_RGB_B54(Color_Q58,_Iridescence_Intensity_,Result_Q55);
vec4 Base_And_Iridescent_Q53;
Base_And_Iridescent_Q53=Line_Color_Q48+vec4(Result_Q54.rgb,0.0);
vec4 Base_And_Iridescent_Q56;
Base_And_Iridescent_Q56=_Base_Color_+vec4(Result_Q55.rgb,0.0);
vec4 Result_Q52=Base_And_Iridescent_Q53; Result_Q52.a=1.0;
vec4 Result_Q35=Blob_Color_Q71+(1.0-Blob_Color_Q71.a)*Base_And_Iridescent_Q56;
vec4 Color_Q31;
Round_Rect_Fragment_B31(R_Q72,G_Q72,Result_Q52,_Filter_Width_,vUV,1.0,vExtra1,Result_Q35,Color_Q31);
vec4 Result_Q47=_Fade_Out_*Color_Q31;
vec4 Out_Color=Result_Q47;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[ho]=co;const uo="fluentBackplateVertexShader",fo=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform float _Angle_;
uniform float _Fade_Out_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform sampler2D _Iridescent_Map_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B115(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void PickDir_B140(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{
float a=Degrees*3.14159/180.0;
Dir=cos(a)*DirX+sin(a)*DirY;
}
void Round_Rect_Vertex_B139(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV)
{
Scale_XY=vec2(Anisotropy,1.0);
Line_UV=(UV-vec2(0.5,0.5));
Rect_UV=Line_UV*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);
Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;
}
void Line_Vertex_B135(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{
float angle2=(Rate*Time)*2.0*3.1416;
float sinAngle2=sin(angle2);
float cosAngle2=cos(angle2);
vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;
Line_Vertex.x=0.0;
Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;
Line_Vertex.z=0.0; 
}
void Blob_Vertex_B180(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob=Blob_Position;
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B129(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
New_UV=center+r2*(UV-2.0*center+0.5);
New_P=vec3(New_UV-0.5,P.z);
Radial_Gradient=1.0-length(delta)*2.0;
Radial_Dir=vec3(delta*r2,0.0);
}
void Object_To_World_Dir_B132(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void RelativeOrAbsoluteDetail_B147(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{
float scale=Absolute_Measurements ? 1.0/Height : 1.0;
Radius=Nominal_Radius*scale;
Line_Width=Nominal_LineWidth*scale;
}
void Edge_AA_Vertex_B130(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{
vec3 I=(Eye-Position_World);
vec3 T=(world* vec4(Tangent,0.0)).xyz;
float g=(dot(T,I)<0.0) ? 0.0 : 1.0;
if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;
Gradient2=Position_Object.z>0.0 ? 1.0 : g;
} else {
Gradient1=g+(1.0-g)*(Radial_Gradient);
Gradient2=1.0;
}
}
void Pick_Radius_B144(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void main()
{
vec3 Nrm_World_Q128;
Nrm_World_Q128=normalize((world*vec4(normal,0.0)).xyz);
vec3 Tangent_World_Q131;
vec3 Tangent_World_N_Q131;
float Tangent_Length_Q131;
Tangent_World_Q131=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q131=length(Tangent_World_Q131);
Tangent_World_N_Q131=Tangent_World_Q131/Tangent_Length_Q131;
vec3 Binormal_World_Q132;
vec3 Binormal_World_N_Q132;
float Binormal_Length_Q132;
Object_To_World_Dir_B132(vec3(0,1,0),Binormal_World_Q132,Binormal_World_N_Q132,Binormal_Length_Q132);
float Anisotropy_Q133=Tangent_Length_Q131/Binormal_Length_Q132;
vec3 Result_Q177;
Result_Q177=mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(_Use_Global_Left_Index_));
vec3 Result_Q178;
Result_Q178=mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(_Use_Global_Right_Index_));
float Result_Q144;
Pick_Radius_B144(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q144);
vec3 Dir_Q140;
PickDir_B140(_Angle_,Tangent_World_N_Q131,Binormal_World_N_Q132,Dir_Q140);
float Radius_Q147;
float Line_Width_Q147;
RelativeOrAbsoluteDetail_B147(Result_Q144,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q132,Radius_Q147,Line_Width_Q147);
vec4 Out_Color_Q145=vec4(Radius_Q147,Line_Width_Q147,0,1);
vec3 New_P_Q129;
vec2 New_UV_Q129;
float Radial_Gradient_Q129;
vec3 Radial_Dir_Q129;
Move_Verts_B129(Anisotropy_Q133,position,Radius_Q147,New_P_Q129,New_UV_Q129,Radial_Gradient_Q129,Radial_Dir_Q129);
vec3 Pos_World_Q115;
Object_To_World_Pos_B115(New_P_Q129,Pos_World_Q115);
vec4 Blob_Info_Q180;
#if BLOB_ENABLE
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q177,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q180);
#else
Blob_Info_Q180=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q181;
#if BLOB_ENABLE_2
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q178,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q181);
#else
Blob_Info_Q181=vec4(0,0,0,0);
#endif
float Gradient1_Q130;
float Gradient2_Q130;
#if SMOOTH_EDGES
Edge_AA_Vertex_B130(Pos_World_Q115,position,normal,cameraPosition,Radial_Gradient_Q129,Radial_Dir_Q129,tangent,Gradient1_Q130,Gradient2_Q130);
#else
Gradient1_Q130=1.0;
Gradient2_Q130=1.0;
#endif
vec2 Rect_UV_Q139;
vec4 Rect_Parms_Q139;
vec2 Scale_XY_Q139;
vec2 Line_UV_Q139;
Round_Rect_Vertex_B139(New_UV_Q129,Radius_Q147,0.0,Anisotropy_Q133,Gradient1_Q130,Gradient2_Q130,Rect_UV_Q139,Rect_Parms_Q139,Scale_XY_Q139,Line_UV_Q139);
vec3 Line_Vertex_Q135;
Line_Vertex_B135(Scale_XY_Q139,Line_UV_Q139,0.0,_Rate_,_Highlight_Transform_,Line_Vertex_Q135);
vec3 Position=Pos_World_Q115;
vec3 Normal=Dir_Q140;
vec2 UV=Rect_UV_Q139;
vec3 Tangent=Line_Vertex_Q135;
vec3 Binormal=Nrm_World_Q128;
vec4 Color=Out_Color_Q145;
vec4 Extra1=Rect_Parms_Q139;
vec4 Extra2=Blob_Info_Q180;
vec4 Extra3=Blob_Info_Q181;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;ot.ShadersStore[uo]=fo;class go extends le{constructor(){super(),this.BLOB_ENABLE=!0,this.BLOB_ENABLE_2=!0,this.SMOOTH_EDGES=!0,this.IRIDESCENT_MAP_ENABLE=!0,this._needNormals=!0,this.rebuild()}}class W extends _e{constructor(t,e){super(t,e),this.radius=.03,this.lineWidth=.01,this.absoluteSizes=!1,this._filterWidth=1,this.baseColor=new z(.0392157,.0666667,.207843,1),this.lineColor=new z(.14902,.133333,.384314,1),this.blobIntensity=.98,this.blobFarSize=.04,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.08,this.blobNearSize=.22,this.blobPulse=0,this.blobFade=0,this.blobNearSize2=.22,this.blobPulse2=0,this.blobFade2=0,this._rate=.135,this.highlightColor=new z(.98,.98,.98,1),this.highlightWidth=.25,this._highlightTransform=new lt(1,1,0,0),this._highlight=1,this.iridescenceIntensity=0,this.iridescenceEdgeIntensity=1,this._angle=-45,this.fadeOut=1,this._reflected=!0,this._frequency=1,this._verticalOffset=0,this.globalLeftIndexTipPosition=c.Zero(),this._globalLeftIndexTipPosition4=lt.Zero(),this.globalRightIndexTipPosition=c.Zero(),this._globalRightIndexTipPosition4=lt.Zero(),this.alphaMode=Gt.ALPHA_DISABLE,this.backFaceCulling=!1,this._blobTexture=new V(W.BLOB_TEXTURE_URL,this.getScene(),!0,!1,V.NEAREST_SAMPLINGMODE),this._iridescentMap=new V(W.IM_TEXTURE_URL,this.getScene(),!0,!1,V.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new go);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="fluentBackplate",h=i.toString(),d=["world","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Absolute_Sizes_","_Filter_Width_","_Base_Color_","_Line_Color_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Rate_","_Highlight_Color_","_Highlight_Width_","_Highlight_Transform_","_Highlight_","_Iridescence_Intensity_","_Iridescence_Edge_Intensity_","_Angle_","_Fade_Out_","_Reflected_","_Frequency_","_Vertical_Offset_","_Iridescent_Map_","_Use_Global_Left_Index_","_Use_Global_Right_Index_","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position"],u=["_Blob_Texture_","_Iridescent_Map_"],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i,this._materialContext)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){var s,o;if(!i.materialDefines)return;const a=i.effect;a&&(this._activeEffect=a,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",(o=(s=this.getScene().activeCamera)===null||s===void 0?void 0:s.position)!==null&&o!==void 0?o:c.ZeroReadOnly),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Base_Color_",this.baseColor),this._activeEffect.setDirectColor4("_Line_Color_",this.lineColor),this._activeEffect.setFloat("_Radius_Top_Left_",1),this._activeEffect.setFloat("_Radius_Top_Right_",1),this._activeEffect.setFloat("_Radius_Bottom_Left_",1),this._activeEffect.setFloat("_Radius_Bottom_Right_",1),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setFloat("_Rate_",this._rate),this._activeEffect.setDirectColor4("_Highlight_Color_",this.highlightColor),this._activeEffect.setFloat("_Highlight_Width_",this.highlightWidth),this._activeEffect.setVector4("_Highlight_Transform_",this._highlightTransform),this._activeEffect.setFloat("_Highlight_",this._highlight),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setFloat("_Iridescence_Edge_Intensity_",this.iridescenceEdgeIntensity),this._activeEffect.setFloat("_Angle_",this._angle),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._activeEffect.setFloat("_Reflected_",this._reflected?1:0),this._activeEffect.setFloat("_Frequency_",this._frequency),this._activeEffect.setFloat("_Vertical_Offset_",this._verticalOffset),this._activeEffect.setTexture("_Iridescent_Map_",this._iridescentMap),this._activeEffect.setFloat("_Use_Global_Left_Index_",1),this._activeEffect.setFloat("_Use_Global_Right_Index_",1),this._globalLeftIndexTipPosition4.set(this.globalLeftIndexTipPosition.x,this.globalLeftIndexTipPosition.y,this.globalLeftIndexTipPosition.z,1),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this._globalLeftIndexTipPosition4),this._globalRightIndexTipPosition4.set(this.globalRightIndexTipPosition.x,this.globalRightIndexTipPosition.y,this.globalRightIndexTipPosition.z,1),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this._globalRightIndexTipPosition4),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._blobTexture.dispose(),this._iridescentMap.dispose()}clone(t){return q.Clone(()=>new W(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.FluentBackplateMaterial",t}getClassName(){return"FluentBackplateMaterial"}static Parse(t,e,i){return q.Parse(()=>new W(t.name,e),t,e,i)}}W.BLOB_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-blob.png";W.IM_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-iridescence.png";n([l()],W.prototype,"radius",void 0);n([l()],W.prototype,"lineWidth",void 0);n([l()],W.prototype,"absoluteSizes",void 0);n([l()],W.prototype,"baseColor",void 0);n([l()],W.prototype,"lineColor",void 0);n([l()],W.prototype,"blobIntensity",void 0);n([l()],W.prototype,"blobFarSize",void 0);n([l()],W.prototype,"blobNearDistance",void 0);n([l()],W.prototype,"blobFarDistance",void 0);n([l()],W.prototype,"blobFadeLength",void 0);n([l()],W.prototype,"blobNearSize",void 0);n([l()],W.prototype,"blobPulse",void 0);n([l()],W.prototype,"blobFade",void 0);n([l()],W.prototype,"blobNearSize2",void 0);n([l()],W.prototype,"blobPulse2",void 0);n([l()],W.prototype,"blobFade2",void 0);n([l()],W.prototype,"highlightColor",void 0);n([l()],W.prototype,"highlightWidth",void 0);n([l()],W.prototype,"iridescenceIntensity",void 0);n([l()],W.prototype,"iridescenceEdgeIntensity",void 0);n([l()],W.prototype,"fadeOut",void 0);n([Oe()],W.prototype,"globalLeftIndexTipPosition",void 0);n([Oe()],W.prototype,"globalRightIndexTipPosition",void 0);k("BABYLON.GUI.FluentBackplateMaterial",W);class oi extends yi{set renderingGroupId(t){this._model.renderingGroupId=t}get renderingGroupId(){return this._model.renderingGroupId}get material(){return this._material}get shareMaterials(){return this._shareMaterials}constructor(t,e=!0){super(t),this._shareMaterials=e}_getTypeName(){return"HolographicBackplate"}_createNode(t){var e;const i=Bt(((e=this.name)!==null&&e!==void 0?e:"HolographicBackplate")+"_CollisionMesh",{width:1,height:1,depth:1},t);return i.isPickable=!0,i.visibility=0,re.ImportMeshAsync(void 0,oi.MODEL_BASE_URL,oi.MODEL_FILENAME,t).then(s=>{const o=s.meshes[1];o.name=`${this.name}_frontPlate`,o.isPickable=!1,o.parent=i,this._material&&(o.material=this._material),this._model=o}),i}_createMaterial(t){this._material=new W(this.name+" Material",t.getScene())}_affectMaterial(t){this._shareMaterials?this._host._touchSharedMaterials.fluentBackplateMaterial?this._material=this._host._touchSharedMaterials.fluentBackplateMaterial:(this._createMaterial(t),this._host._touchSharedMaterials.fluentBackplateMaterial=this._material):this._createMaterial(t)}dispose(){super.dispose(),this.shareMaterials||this._material.dispose(),this._model.dispose()}}oi.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";oi.MODEL_FILENAME="mrtk-fluent-backplate.glb";const mo="fluentButtonPixelShader",po=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
uniform float _Edge_Width_;
uniform vec4 _Edge_Color_;
uniform bool _Relative_Width_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Active_Face_Dir_;
uniform vec3 _Active_Face_Up_;
uniform bool Enable_Fade;
uniform float _Fade_Width_;
uniform bool _Smooth_Active_Face_;
uniform bool _Show_Frame_;
uniform bool _Use_Blob_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Holo_Edge_Fragment_B35(
vec4 Edges,
float Edge_Width,
out float NotEdge)
{
vec2 c=vec2(min(Edges.r,Edges.g),min(Edges.b,Edges.a));
vec2 df=fwidth(c)*Edge_Width;
vec2 g=clamp(c/df,0.0,1.0);
NotEdge=g.x*g.y;
}
void Blob_Fragment_B39(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{
float k=dot(UV,UV);
Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));
}
vec2 FilterStep(vec2 Edge,vec2 X)
{
vec2 dX=max(fwidth(X),vec2(0.00001,0.00001));
return clamp( (X+dX-max(Edge,X-dX))/(dX*2.0),0.0,1.0);
}
void Wireframe_Fragment_B59(
vec3 Widths,
vec2 UV,
float Proximity,
vec4 Edge_Color,
out vec4 Wireframe)
{
vec2 c=min(UV,vec2(1.0,1.0)-UV);
vec2 g=FilterStep(Widths.xy*0.5,c); 
Wireframe=(1.0-min(g.x,g.y))*Proximity*Edge_Color;
}
void Proximity_B53(
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec3 Position,
vec3 Show_Selection,
vec4 Extra1,
float Dist_To_Face,
float Intensity,
out float Proximity)
{
vec2 delta1=Extra1.xy;
vec2 delta2=Extra1.zw;
float d2=sqrt(min(dot(delta1,delta1),dot(delta2,delta2))+Dist_To_Face*Dist_To_Face);
Proximity=Intensity*Proximity_Max_Intensity*(1.0-clamp(d2/Proximity_Near_Radius,0.0,1.0))*(1.0-Show_Selection.x)+Show_Selection.x;
}
void To_XYZ_B46(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void main()
{
float NotEdge_Q35;
#if ENABLE_FADE
Holo_Edge_Fragment_B35(vColor,_Fade_Width_,NotEdge_Q35);
#else
NotEdge_Q35=1.0;
#endif
vec4 Blob_Color_Q39;
float k=dot(vUV,vUV);
vec2 blobTextureCoord=vec2(vec2(sqrt(k),vTangent.x).x,1.0-vec2(sqrt(k),vTangent.x).y);
vec4 blobColor=mix(vec4(1.0,1.0,1.0,1.0)*step(1.0-vTangent.x,clamp(sqrt(k)+0.1,0.0,1.0)),texture(_Blob_Texture_,blobTextureCoord),float(_Use_Blob_Texture_));
Blob_Color_Q39=vTangent.y*blobColor*(1.0-clamp(k,0.0,1.0));
float Is_Quad_Q24;
Is_Quad_Q24=vNormal.z;
vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));
vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));
float X_Q46;
float Y_Q46;
float Z_Q46;
To_XYZ_B46(vBinormal,X_Q46,Y_Q46,Z_Q46);
float Proximity_Q53;
Proximity_B53(Blob_Position_Q41,Blob_Position_Q42,_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vPosition,vBinormal,vExtra1,Y_Q46,Z_Q46,Proximity_Q53);
vec4 Wireframe_Q59;
Wireframe_Fragment_B59(vNormal,vUV,Proximity_Q53,_Edge_Color_,Wireframe_Q59);
vec4 Wire_Or_Blob_Q23=mix(Wireframe_Q59,Blob_Color_Q39,Is_Quad_Q24);
vec4 Result_Q22;
Result_Q22=mix(Wire_Or_Blob_Q23,vec4(0.3,0.3,0.3,0.3),float(_Show_Frame_));
vec4 Final_Color_Q37=NotEdge_Q35*Result_Q22;
vec4 Out_Color=Final_Color_Q37;
float Clip_Threshold=0.0;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[mo]=po;const bo="fluentButtonVertexShader",vo=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform float _Edge_Width_;
uniform vec4 _Edge_Color_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Active_Face_Dir_;
uniform vec3 _Active_Face_Up_;
uniform bool _Enable_Fade_;
uniform float _Fade_Width_;
uniform bool _Smooth_Active_Face_;
uniform bool _Show_Frame_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
void Blob_Vertex_B47(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
vec3 Active_Face_Center,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info)
{
float blobSize,fadeIn;
vec3 Hit_Position;
Blob_Info=vec3(0.0,0.0,0.0);
float Hit_Distance=dot(Blob_Position-Face_Center,Normal);
Hit_Position=Blob_Position-Hit_Distance*Normal;
float absD=abs(Hit_Distance);
float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);
float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);
float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;
blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;
Blob_Info.x=lerpVal*0.5+0.5;
Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;
Blob_Info.x*=(1.0-Blob_Pulse);
vec3 delta=Hit_Position-Face_Center;
vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));
vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;
vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);
vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;
vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;
Out_Position=mix(Position,blobCorner,Vx_Color.rrr);
Out_UV=mix(In_UV,blobUV,Vx_Color.rr);
}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{
vec3 delta=blobPosition-position;
vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));
vdistance=abs(dot(delta,dir));
return xy;
}
void Proximity_Vertex_B66(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Up,
out vec4 Extra1,
out float Distance_To_Face,
out float Intensity)
{
vec3 Active_Face_Dir_X=normalize(cross(Active_Face_Dir,Up));
vec3 Active_Face_Dir_Y=cross(Active_Face_Dir,Active_Face_Dir_X);
float distz1,distz2;
Extra1.xy=ProjectProximity(Blob_Position,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz1)/Relative_Scale;
Extra1.zw=ProjectProximity(Blob_Position_2,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz2)/Relative_Scale;
Distance_To_Face=dot(Active_Face_Dir,Position-Active_Face_Center);
Intensity=1.0-clamp(min(distz1,distz2)/Proximity_Far_Distance,0.0,1.0);
}
void Holo_Edge_Vertex_B44(
vec3 Incident,
vec3 Normal,
vec2 UV,
vec3 Tangent,
vec3 Bitangent,
bool Smooth_Active_Face,
float Active,
out vec4 Holo_Edges)
{
float NdotI=dot(Incident,Normal);
vec2 flip=(UV-vec2(0.5,0.5));
float udot=dot(Incident,Tangent)*flip.x*NdotI;
float uval=1.0-float(udot>0.0);
float vdot=-dot(Incident,Bitangent)*flip.y*NdotI;
float vval=1.0-float(vdot>0.0);
float Smooth_And_Active=step(1.0,float(Smooth_Active_Face && Active>0.0));
uval=mix(uval,max(1.0,uval),Smooth_And_Active); 
vval=mix(vval,max(1.0,vval),Smooth_And_Active);
Holo_Edges=vec4(1.0,1.0,1.0,1.0)-vec4(uval*UV.x,uval*(1.0-UV.x),vval*UV.y,vval*(1.0-UV.y));
}
void Object_To_World_Pos_B13(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Choose_Blob_B38(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{
Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;
float b1=float(Blob_Enable_1);
float b2=float(Blob_Enable_2);
Blob_Enable=b1+(b2-b1)*Vx_Color.g;
Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;
Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;
Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;
Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;
}
void Wireframe_Vertex_B51(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Edge_Width,
vec2 Face_Size,
out vec3 Wire_Vx_Pos,
out vec2 UV,
out vec2 Widths)
{
Widths.xy=Edge_Width/Face_Size;
float x=dot(Position,Tangent);
float y=dot(Position,Bitangent);
float dx=0.5-abs(x);
float newx=(0.5-dx*Widths.x*2.0)*sign(x);
float dy=0.5-abs(y);
float newy=(0.5-dy*Widths.y*2.0)*sign(y);
Wire_Vx_Pos=Normal*0.5+newx*Tangent+newy*Bitangent;
UV.x=dot(Wire_Vx_Pos,Tangent)+0.5;
UV.y=dot(Wire_Vx_Pos,Bitangent)+0.5;
}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{
return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));
}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{
vec3 delta=blobPosition-faceCenter;
float absD=abs(dot(delta,normal));
float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);
vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));
vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;
vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);
return selectPulse.x*selectPulse.y*fadeIn;
}
void Selection_Vertex_B48(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{
float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float Active=max(0.0,dot(Active_Face_Dir,Normal));
Show_Selection=mix(max(select1,select2),1.0,Selected)*Active;
}
void Proximity_Visibility_B54(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Input_Width,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
out float Width)
{
vec3 boxEdges=(world*vec4(vec3(0.5,0.5,0.5),0.0)).xyz;
float boxMaxSize=length(boxEdges);
float d1=dot(Proximity_Center-Active_Face_Center,Active_Face_Dir);
vec3 blob1=Proximity_Center-d1*Active_Face_Dir;
float d2=dot(Proximity_Center_2-Active_Face_Center,Active_Face_Dir);
vec3 blob2=Proximity_Center_2-d2*Active_Face_Dir;
vec3 delta1=blob1-Active_Face_Center;
vec3 delta2=blob2-Active_Face_Center;
float dist1=dot(delta1,delta1);
float dist2=dot(delta2,delta2);
float nearestProxDist=sqrt(min(dist1,dist2));
Width=Input_Width*(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));
}
void Object_To_World_Dir_B67(
vec3 Dir_Object,
out vec3 Dir_World)
{
Dir_World=(world*vec4(Dir_Object,0.0)).xyz;
}
void main()
{
vec3 Active_Face_Center_Q49;
Active_Face_Center_Q49=(world*vec4(_Active_Face_Dir_*0.5,1.0)).xyz;
vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));
vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));
vec3 Active_Face_Dir_Q64=normalize((world*vec4(_Active_Face_Dir_,0.0)).xyz);
float Relative_Scale_Q57;
#if RELATIVE_WIDTH
Relative_Scale_Q57=length((world*vec4(vec3(0,1,0),0.0)).xyz);
#else
Relative_Scale_Q57=1.0;
#endif
vec3 Tangent_World_Q30;
Tangent_World_Q30=(world*vec4(tangent,0.0)).xyz;
vec3 Binormal_World_Q31;
Binormal_World_Q31=(world*vec4((cross(normal,tangent)),0.0)).xyz;
vec3 Normal_World_Q60;
Normal_World_Q60=(world*vec4(normal,0.0)).xyz;
vec3 Result_Q18=0.5*normal;
vec3 Dir_World_Q67;
Object_To_World_Dir_B67(_Active_Face_Up_,Dir_World_Q67);
float Product_Q56=_Edge_Width_*Relative_Scale_Q57;
vec3 Normal_World_N_Q29=normalize(Normal_World_Q60);
vec3 Tangent_World_N_Q28=normalize(Tangent_World_Q30);
vec3 Binormal_World_N_Q32=normalize(Binormal_World_Q31);
vec3 Position_Q38;
float Near_Size_Q38;
float Inner_Fade_Q38;
float Blob_Enable_Q38;
float Fade_Q38;
float Pulse_Q38;
Choose_Blob_B38(color,Blob_Position_Q41,Blob_Position_Q42,_Blob_Enable_,_Blob_Enable_2_,_Blob_Near_Size_,_Blob_Near_Size_2_,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q38,Near_Size_Q38,Inner_Fade_Q38,Blob_Enable_Q38,Fade_Q38,Pulse_Q38);
vec3 Face_Center_Q33;
Face_Center_Q33=(world*vec4(Result_Q18,1.0)).xyz;
vec2 Face_Size_Q50=vec2(length(Tangent_World_Q30),length(Binormal_World_Q31));
float Show_Selection_Q48;
Selection_Vertex_B48(Blob_Position_Q41,Blob_Position_Q42,Face_Center_Q33,Face_Size_Q50,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,Active_Face_Dir_Q64,Show_Selection_Q48);
vec3 Normalized_Q72=normalize(Dir_World_Q67);
float Active_Q34=max(0.0,dot(Active_Face_Dir_Q64,Normal_World_N_Q29));
float Width_Q54;
Proximity_Visibility_B54(Show_Selection_Q48,Blob_Position_Q41,Blob_Position_Q42,Product_Q56,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Active_Face_Center_Q49,Active_Face_Dir_Q64,Width_Q54);
vec3 Wire_Vx_Pos_Q51;
vec2 UV_Q51;
vec2 Widths_Q51;
Wireframe_Vertex_B51(position,normal,tangent,(cross(normal,tangent)),Width_Q54,Face_Size_Q50,Wire_Vx_Pos_Q51,UV_Q51,Widths_Q51);
vec3 Vec3_Q27=vec3(Widths_Q51.x,Widths_Q51.y,color.r);
vec3 Pos_World_Q13;
Object_To_World_Pos_B13(Wire_Vx_Pos_Q51,Pos_World_Q13);
vec3 Incident_Q36=normalize(Pos_World_Q13-cameraPosition);
vec3 Out_Position_Q47;
vec2 Out_UV_Q47;
vec3 Blob_Info_Q47;
Blob_Vertex_B47(Pos_World_Q13,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,Position_Q38,_Blob_Intensity_,Near_Size_Q38,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q33,Face_Size_Q50,UV_Q51,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q38,Active_Face_Center_Q49,Pulse_Q38,Fade_Q38,Blob_Enable_Q38,Out_Position_Q47,Out_UV_Q47,Blob_Info_Q47);
vec4 Extra1_Q66;
float Distance_To_Face_Q66;
float Intensity_Q66;
Proximity_Vertex_B66(Blob_Position_Q41,Blob_Position_Q42,Active_Face_Center_Q49,Active_Face_Dir_Q64,Pos_World_Q13,_Proximity_Far_Distance_,Relative_Scale_Q57,_Proximity_Anisotropy_,Normalized_Q72,Extra1_Q66,Distance_To_Face_Q66,Intensity_Q66);
vec4 Holo_Edges_Q44;
Holo_Edge_Vertex_B44(Incident_Q36,Normal_World_N_Q29,uv,Tangent_World_Q30,Binormal_World_Q31,_Smooth_Active_Face_,Active_Q34,Holo_Edges_Q44);
vec3 Vec3_Q19=vec3(Show_Selection_Q48,Distance_To_Face_Q66,Intensity_Q66);
vec3 Position=Out_Position_Q47;
vec2 UV=Out_UV_Q47;
vec3 Tangent=Blob_Info_Q47;
vec3 Binormal=Vec3_Q19;
vec3 Normal=Vec3_Q27;
vec4 Extra1=Extra1_Q66;
vec4 Color=Holo_Edges_Q44;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
}`;ot.ShadersStore[bo]=vo;class Po extends le{constructor(){super(),this.RELATIVE_WIDTH=!0,this.ENABLE_FADE=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class F extends _e{constructor(t,e){super(t,e),this.edgeWidth=.04,this.edgeColor=new z(.592157,.592157,.592157,1),this.proximityMaxIntensity=.45,this.proximityFarDistance=.16,this.proximityNearRadius=1.5,this.proximityAnisotropy=1,this.selectionFuzz=.5,this.selected=0,this.selectionFade=0,this.selectionFadeSize=.3,this.selectedDistance=.08,this.selectedFadeLength=.08,this.blobIntensity=.5,this.blobFarSize=.05,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.08,this.leftBlobEnable=!0,this.leftBlobNearSize=.025,this.leftBlobPulse=0,this.leftBlobFade=1,this.leftBlobInnerFade=.01,this.rightBlobEnable=!0,this.rightBlobNearSize=.025,this.rightBlobPulse=0,this.rightBlobFade=1,this.rightBlobInnerFade=.01,this.activeFaceDir=new c(0,0,-1),this.activeFaceUp=new c(0,1,0),this.enableFade=!0,this.fadeWidth=1.5,this.smoothActiveFace=!0,this.showFrame=!1,this.useBlobTexture=!0,this.globalLeftIndexTipPosition=c.Zero(),this.globalRightIndexTipPosition=c.Zero(),this.alphaMode=Gt.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1,this._blobTexture=new V(F.BLOB_TEXTURE_URL,this.getScene(),!0,!1,V.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!0}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new Po);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!0,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="fluentButton",h=i.toString(),d=["world","viewProjection","cameraPosition","_Edge_Width_","_Edge_Color_","_Relative_Width_","_Proximity_Max_Intensity_","_Proximity_Far_Distance_","_Proximity_Near_Radius_","_Proximity_Anisotropy_","_Selection_Fuzz_","_Selected_","_Selection_Fade_","_Selection_Fade_Size_","_Selected_Distance_","_Selected_Fade_Length_","_Blob_Enable_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Inner_Fade_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Enable_2_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Inner_Fade_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Active_Face_Dir_","_Active_Face_Up_","_Enable_Fade_","_Fade_Width_","_Smooth_Active_Face_","_Show_Frame_","_Use_Blob_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],u=["_Blob_Texture_"],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i,this._materialContext)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){const s=this.getScene();if(!i.materialDefines)return;const r=i.effect;r&&(this._activeEffect=r,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",s.activeCamera.position),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Edge_Width_",this.edgeWidth),this._activeEffect.setColor4("_Edge_Color_",new E(this.edgeColor.r,this.edgeColor.g,this.edgeColor.b),this.edgeColor.a),this._activeEffect.setFloat("_Proximity_Max_Intensity_",this.proximityMaxIntensity),this._activeEffect.setFloat("_Proximity_Far_Distance_",this.proximityFarDistance),this._activeEffect.setFloat("_Proximity_Near_Radius_",this.proximityNearRadius),this._activeEffect.setFloat("_Proximity_Anisotropy_",this.proximityAnisotropy),this._activeEffect.setFloat("_Selection_Fuzz_",this.selectionFuzz),this._activeEffect.setFloat("_Selected_",this.selected),this._activeEffect.setFloat("_Selection_Fade_",this.selectionFade),this._activeEffect.setFloat("_Selection_Fade_Size_",this.selectionFadeSize),this._activeEffect.setFloat("_Selected_Distance_",this.selectedDistance),this._activeEffect.setFloat("_Selected_Fade_Length_",this.selectedFadeLength),this._activeEffect.setFloat("_Blob_Enable_",this.leftBlobEnable?1:0),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.leftBlobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Inner_Fade_",this.leftBlobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_",this.leftBlobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.leftBlobFade),this._activeEffect.setFloat("_Blob_Enable_2_",this.rightBlobEnable?1:0),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.rightBlobNearSize),this._activeEffect.setFloat("_Blob_Inner_Fade_2_",this.rightBlobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_2_",this.rightBlobPulse),this._activeEffect.setFloat("_Blob_Fade_2_",this.rightBlobFade),this._activeEffect.setVector3("_Active_Face_Dir_",this.activeFaceDir),this._activeEffect.setVector3("_Active_Face_Up_",this.activeFaceUp),this._activeEffect.setFloat("_Fade_Width_",this.fadeWidth),this._activeEffect.setFloat("_Smooth_Active_Face_",this.smoothActiveFace?1:0),this._activeEffect.setFloat("_Show_Frame_",this.showFrame?1:0),this._activeEffect.setFloat("_Use_Blob_Texture_",this.useBlobTexture?1:0),this._activeEffect.setFloat("Use_Global_Left_Index",1),this._activeEffect.setFloat("Use_Global_Right_Index",1),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",new lt(this.globalLeftIndexTipPosition.x,this.globalLeftIndexTipPosition.y,this.globalLeftIndexTipPosition.z,1)),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",new lt(this.globalRightIndexTipPosition.x,this.globalRightIndexTipPosition.y,this.globalRightIndexTipPosition.z,1)),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new F(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.FluentButtonMaterial",t}getClassName(){return"FluentButtonMaterial"}static Parse(t,e,i){return q.Parse(()=>new F(t.name,e),t,e,i)}}F.BLOB_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-button-blob.png";n([l()],F.prototype,"edgeWidth",void 0);n([ls()],F.prototype,"edgeColor",void 0);n([l()],F.prototype,"proximityMaxIntensity",void 0);n([l()],F.prototype,"proximityFarDistance",void 0);n([l()],F.prototype,"proximityNearRadius",void 0);n([l()],F.prototype,"proximityAnisotropy",void 0);n([l()],F.prototype,"selectionFuzz",void 0);n([l()],F.prototype,"selected",void 0);n([l()],F.prototype,"selectionFade",void 0);n([l()],F.prototype,"selectionFadeSize",void 0);n([l()],F.prototype,"selectedDistance",void 0);n([l()],F.prototype,"selectedFadeLength",void 0);n([l()],F.prototype,"blobIntensity",void 0);n([l()],F.prototype,"blobFarSize",void 0);n([l()],F.prototype,"blobNearDistance",void 0);n([l()],F.prototype,"blobFarDistance",void 0);n([l()],F.prototype,"blobFadeLength",void 0);n([l()],F.prototype,"leftBlobEnable",void 0);n([l()],F.prototype,"leftBlobNearSize",void 0);n([l()],F.prototype,"leftBlobPulse",void 0);n([l()],F.prototype,"leftBlobFade",void 0);n([l()],F.prototype,"leftBlobInnerFade",void 0);n([l()],F.prototype,"rightBlobEnable",void 0);n([l()],F.prototype,"rightBlobNearSize",void 0);n([l()],F.prototype,"rightBlobPulse",void 0);n([l()],F.prototype,"rightBlobFade",void 0);n([l()],F.prototype,"rightBlobInnerFade",void 0);n([Oe()],F.prototype,"activeFaceDir",void 0);n([Oe()],F.prototype,"activeFaceUp",void 0);n([l()],F.prototype,"enableFade",void 0);n([l()],F.prototype,"fadeWidth",void 0);n([l()],F.prototype,"smoothActiveFace",void 0);n([l()],F.prototype,"showFrame",void 0);n([l()],F.prototype,"useBlobTexture",void 0);n([Oe()],F.prototype,"globalLeftIndexTipPosition",void 0);n([Oe()],F.prototype,"globalRightIndexTipPosition",void 0);k("BABYLON.GUI.FluentButtonMaterial",F);class ms extends so{constructor(t,e){super(t),this._isNearPressed=!1,this._interactionSurfaceHeight=0,this._isToggleButton=!1,this._toggleState=!1,this._toggleButtonCallback=()=>{this._onToggle(!this._toggleState)},this.onToggleObservable=new x,this.collidableFrontDirection=c.Zero(),e&&(this.collisionMesh=e)}get isActiveNearInteraction(){return this._isNearPressed}set collidableFrontDirection(t){if(this._collidableFrontDirection=t.normalize(),this._collisionMesh){const e=p.Matrix[0];e.copyFrom(this._collisionMesh.getWorldMatrix()),e.invert(),c.TransformNormalToRef(this._collidableFrontDirection,e,this._collidableFrontDirection),this._collidableFrontDirection.normalize()}}get collidableFrontDirection(){if(this._collisionMesh){const t=p.Vector3[0];return c.TransformNormalToRef(this._collidableFrontDirection,this._collisionMesh.getWorldMatrix(),t),t.normalize()}return this._collidableFrontDirection}set collisionMesh(t){var e;this._collisionMesh&&(this._collisionMesh.isNearPickable=!1,!((e=this._collisionMesh.reservedDataStore)===null||e===void 0)&&e.GUI3D&&(this._collisionMesh.reservedDataStore.GUI3D={}),this._collisionMesh.getChildMeshes().forEach(i=>{var s;i.isNearPickable=!1,!((s=i.reservedDataStore)===null||s===void 0)&&s.GUI3D&&(i.reservedDataStore.GUI3D={})})),this._collisionMesh=t,this._injectGUI3DReservedDataStore(this._collisionMesh).control=this,this._collisionMesh.isNearPickable=!0,this._collisionMesh.getChildMeshes().forEach(i=>{this._injectGUI3DReservedDataStore(i).control=this,i.isNearPickable=!0}),this.collidableFrontDirection=t.forward}set isToggleButton(t){t!==this._isToggleButton&&(this._isToggleButton=t,t?this.onPointerUpObservable.add(this._toggleButtonCallback):(this.onPointerUpObservable.removeCallback(this._toggleButtonCallback),this._toggleState&&this._onToggle(!1)))}get isToggleButton(){return this._isToggleButton}set isToggled(t){this._isToggleButton&&this._toggleState!==t&&this._onToggle(t)}get isToggled(){return this._toggleState}_onToggle(t){this._toggleState=t,this.onToggleObservable.notifyObservers(t)}_isInteractionInFrontOfButton(t){return this._getInteractionHeight(t,this._collisionMesh.getAbsolutePosition())>0}getPressDepth(t){if(!this._isNearPressed)return 0;const e=this._getInteractionHeight(t,this._collisionMesh.getAbsolutePosition());return this._interactionSurfaceHeight-e}_getInteractionHeight(t,e){const i=this.collidableFrontDirection;if(i.length()===0)return c.Distance(t,e);const s=c.Dot(e,i);return c.Dot(t,i)-s}_generatePointerEventType(t,e,i){if(t===D.POINTERDOWN||t===D.POINTERMOVE)if(this._isInteractionInFrontOfButton(e))this._isNearPressed=!0,this._interactionSurfaceHeight=this._getInteractionHeight(e,this._collisionMesh.getAbsolutePosition());else return D.POINTERMOVE;if(t===D.POINTERUP){if(i==0)return D.POINTERMOVE;this._isNearPressed=!1}return t}_getTypeName(){return"TouchButton3D"}_createNode(t){return super._createNode(t)}dispose(){super.dispose(),this.onPointerUpObservable.removeCallback(this._toggleButtonCallback),this.onToggleObservable.clear(),this._collisionMesh&&this._collisionMesh.dispose()}}let ri=class zi extends ms{_disposeTooltip(){this._tooltipFade=null,this._tooltipTextBlock&&this._tooltipTextBlock.dispose(),this._tooltipTexture&&this._tooltipTexture.dispose(),this._tooltipMesh&&this._tooltipMesh.dispose(),this.onPointerEnterObservable.remove(this._tooltipHoverObserver),this.onPointerOutObservable.remove(this._tooltipOutObserver)}set renderingGroupId(t){this._backPlate.renderingGroupId=t,this._textPlate.renderingGroupId=t,this._frontPlate.renderingGroupId=t,this._tooltipMesh&&(this._tooltipMesh.renderingGroupId=t)}get renderingGroupId(){return this._backPlate.renderingGroupId}get mesh(){return this._backPlate}set tooltipText(t){if(!t){this._disposeTooltip();return}if(!this._tooltipFade){const e=this._backPlate._scene.useRightHandedSystem;this._tooltipMesh=se("",{size:1},this._backPlate._scene);const i=se("",{size:1,sideOrientation:li.DOUBLESIDE},this._backPlate._scene),s=new ii("",this._backPlate._scene);s.diffuseColor=E.FromHexString("#212121"),i.material=s,i.isPickable=!1,this._tooltipMesh.addChild(i),i.position=c.Forward(e).scale(.05),this._tooltipMesh.scaling.y=1/3,this._tooltipMesh.position=c.Up().scale(.7).add(c.Forward(e).scale(-.15)),this._tooltipMesh.isPickable=!1,this._tooltipMesh.parent=this._backPlate,this._tooltipTexture=ct.CreateForMesh(this._tooltipMesh),this._tooltipTextBlock=new U,this._tooltipTextBlock.scaleY=3,this._tooltipTextBlock.color="white",this._tooltipTextBlock.fontSize=130,this._tooltipTexture.addControl(this._tooltipTextBlock),this._tooltipFade=new hs,this._tooltipFade.delay=500,this._tooltipMesh.addBehavior(this._tooltipFade),this._tooltipHoverObserver=this.onPointerEnterObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!0)}),this._tooltipOutObserver=this.onPointerOutObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!1)})}this._tooltipTextBlock&&(this._tooltipTextBlock.text=t)}get tooltipText(){return this._tooltipTextBlock?this._tooltipTextBlock.text:null}get text(){return this._text}set text(t){this._text!==t&&(this._text=t,this._rebuildContent())}get imageUrl(){return this._imageUrl}set imageUrl(t){this._imageUrl!==t&&(this._imageUrl=t,this._rebuildContent())}get backMaterial(){return this._backMaterial}get frontMaterial(){return this._frontMaterial}get plateMaterial(){return this._plateMaterial}get shareMaterials(){return this._shareMaterials}set isBackplateVisible(t){this.mesh&&this._backMaterial&&(t&&!this._isBackplateVisible?this._backPlate.visibility=1:!t&&this._isBackplateVisible&&(this._backPlate.visibility=0)),this._isBackplateVisible=t}constructor(t,e=!0){super(t),this._shareMaterials=!0,this._isBackplateVisible=!0,this._frontPlateDepth=.5,this._backPlateDepth=.04,this._backplateColor=new E(.08,.15,.55),this._backplateToggledColor=new E(.25,.4,.95),this._shareMaterials=e,this.pointerEnterAnimation=()=>{this._frontMaterial.leftBlobEnable=!0,this._frontMaterial.rightBlobEnable=!0},this.pointerOutAnimation=()=>{this._frontMaterial.leftBlobEnable=!1,this._frontMaterial.rightBlobEnable=!1},this.pointerDownAnimation=()=>{this._frontPlate&&!this.isActiveNearInteraction&&(this._frontPlate.scaling.z=this._frontPlateDepth*.2,this._frontPlate.position=c.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-.2*this._frontPlateDepth)/2),this._textPlate.position=c.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+.2*this._frontPlateDepth)/2))},this.pointerUpAnimation=()=>{this._frontPlate&&(this._frontPlate.scaling.z=this._frontPlateDepth,this._frontPlate.position=c.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-this._frontPlateDepth)/2),this._textPlate.position=c.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+this._frontPlateDepth)/2))},this.onPointerMoveObservable.add(i=>{if(this._frontPlate&&this.isActiveNearInteraction){const s=c.Zero();if(this._backPlate.getWorldMatrix().decompose(s,void 0,void 0)){let o=this._getInteractionHeight(i,this._backPlate.getAbsolutePosition())/s.z;o=si.Clamp(o-this._backPlateDepth/2,.2*this._frontPlateDepth,this._frontPlateDepth),this._frontPlate.scaling.z=o,this._frontPlate.position=c.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-o)/2),this._textPlate.position=c.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+o)/2)}}}),this._pointerHoverObserver=this.onPointerMoveObservable.add(i=>{this._frontMaterial.globalLeftIndexTipPosition=i})}_getTypeName(){return"TouchHolographicButton"}_rebuildContent(){this._disposeFacadeTexture();const t=new Ot;if(t.isVertical=!0,Qi.IsDocumentAvailable()&&document.createElement&&this._imageUrl){const e=new C;e.source=this._imageUrl,e.paddingTop="40px",e.height="180px",e.width="100px",e.paddingBottom="40px",t.addControl(e)}if(this._text){const e=new U;e.text=this._text,e.color="white",e.height="30px",e.fontSize=24,t.addControl(e)}this.content=t}_createNode(t){var e;this.name=(e=this.name)!==null&&e!==void 0?e:"TouchHolographicButton";const i=Bt(`${this.name}_collisionMesh`,{width:1,height:1,depth:this._frontPlateDepth},t);i.isPickable=!0,i.isNearPickable=!0,i.visibility=0,i.position=c.Forward(t.useRightHandedSystem).scale(-this._frontPlateDepth/2),re.ImportMeshAsync(void 0,zi.MODEL_BASE_URL,zi.MODEL_FILENAME,t).then(o=>{const r=Bt("${this.name}_alphaMesh",{width:1,height:1,depth:1},t);r.isPickable=!1,r.material=new ii("${this.name}_alphaMesh_material",t),r.material.alpha=.15;const a=o.meshes[1];a.name=`${this.name}_frontPlate`,a.isPickable=!1,a.scaling.z=this._frontPlateDepth,r.parent=a,a.parent=i,this._frontMaterial&&(a.material=this._frontMaterial),this._frontPlate=a}),this._backPlate=Bt(`${this.name}_backPlate`,{width:1,height:1,depth:this._backPlateDepth},t),this._backPlate.position=c.Forward(t.useRightHandedSystem).scale(this._backPlateDepth/2),this._backPlate.isPickable=!1,this._textPlate=super._createNode(t),this._textPlate.name=`${this.name}_textPlate`,this._textPlate.isPickable=!1,this._textPlate.position=c.Forward(t.useRightHandedSystem).scale(-this._frontPlateDepth/2),this._backPlate.addChild(i),this._backPlate.addChild(this._textPlate);const s=new ne("{this.name}_root",t);return this._backPlate.setParent(s),this.collisionMesh=i,this.collidableFrontDirection=this._backPlate.forward.negate(),s}_applyFacade(t){this._plateMaterial.emissiveTexture=t,this._plateMaterial.opacityTexture=t,this._plateMaterial.diffuseColor=new E(.4,.4,.4)}_createBackMaterial(t){this._backMaterial=new dt(this.name+"backPlateMaterial",t.getScene()),this._backMaterial.albedoColor=this._backplateColor,this._backMaterial.renderBorders=!0,this._backMaterial.renderHoverLight=!1}_createFrontMaterial(t){this._frontMaterial=new F(this.name+"Front Material",t.getScene())}_createPlateMaterial(t){this._plateMaterial=new ii(this.name+"Plate Material",t.getScene()),this._plateMaterial.specularColor=E.Black()}_onToggle(t){this._backMaterial&&(t?this._backMaterial.albedoColor=this._backplateToggledColor:this._backMaterial.albedoColor=this._backplateColor),super._onToggle(t)}_affectMaterial(t){this._shareMaterials?(this._host._touchSharedMaterials.backFluentMaterial?this._backMaterial=this._host._touchSharedMaterials.backFluentMaterial:(this._createBackMaterial(t),this._host._touchSharedMaterials.backFluentMaterial=this._backMaterial),this._host._touchSharedMaterials.frontFluentMaterial?this._frontMaterial=this._host._touchSharedMaterials.frontFluentMaterial:(this._createFrontMaterial(t),this._host._touchSharedMaterials.frontFluentMaterial=this._frontMaterial)):(this._createBackMaterial(t),this._createFrontMaterial(t)),this._createPlateMaterial(t),this._backPlate.material=this._backMaterial,this._textPlate.material=this._plateMaterial,this._isBackplateVisible||(this._backPlate.visibility=0),this._frontPlate&&(this._frontPlate.material=this._frontMaterial),this._rebuildContent()}dispose(){super.dispose(),this._disposeTooltip(),this.onPointerMoveObservable.remove(this._pointerHoverObserver),this.shareMaterials||(this._backMaterial.dispose(),this._frontMaterial.dispose(),this._plateMaterial.dispose(),this._pickedPointObserver&&(this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._pickedPointObserver=null))}};ri.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";ri.MODEL_FILENAME="mrtk-fluent-button.glb";class ps{constructor(){this.followBehaviorEnabled=!1,this.sixDofDragBehaviorEnabled=!0,this.surfaceMagnetismBehaviorEnabled=!0,this._followBehavior=new Vs,this._sixDofDragBehavior=new ks,this._surfaceMagnetismBehavior=new Qs}get name(){return"Default"}get followBehavior(){return this._followBehavior}get sixDofDragBehavior(){return this._sixDofDragBehavior}get surfaceMagnetismBehavior(){return this._surfaceMagnetismBehavior}init(){}attach(t,e,i){this._scene=t.getScene(),this.attachedNode=t,this._addObservables(),this._followBehavior.attach(t),this._sixDofDragBehavior.attach(t),this._sixDofDragBehavior.draggableMeshes=e||null,this._sixDofDragBehavior.faceCameraOnDragStart=!0,this._surfaceMagnetismBehavior.attach(t,this._scene),i&&(this._surfaceMagnetismBehavior.meshes=i),this._surfaceMagnetismBehavior.enabled=!1}detach(){this.attachedNode=null,this._removeObservables(),this._followBehavior.detach(),this._sixDofDragBehavior.detach(),this._surfaceMagnetismBehavior.detach()}_addObservables(){this._onBeforeRenderObserver=this._scene.onBeforeRenderObservable.add(()=>{this._followBehavior._enabled=!this._sixDofDragBehavior.isMoving&&this.followBehaviorEnabled}),this._onDragObserver=this._sixDofDragBehavior.onDragObservable.add(t=>{this._sixDofDragBehavior.disableMovement=this._surfaceMagnetismBehavior.findAndUpdateTarget(t.pickInfo)})}_removeObservables(){this._scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._sixDofDragBehavior.onDragObservable.remove(this._onDragObserver)}}const Io="handleVertexShader",xo=`precision highp float;
attribute vec3 position;
uniform vec3 positionOffset;
uniform mat4 worldViewProjection;
uniform float scale;
void main(void) {
vec4 vPos=vec4((vec3(position)+positionOffset)*scale,1.0);
gl_Position=worldViewProjection*vPos;
}`;ot.ShadersStore[Io]=xo;const yo="handlePixelShader",To=`uniform vec3 color;
void main(void) {
gl_FragColor=vec4(color,1.0);
}`;ot.ShadersStore[yo]=To;class Ro extends As{get hover(){return this._hover}set hover(t){this._hover=t,this._updateInterpolationTarget()}get drag(){return this._drag}set drag(t){this._drag=t,this._updateInterpolationTarget()}constructor(t,e){super(t,e,"handle",{attributes:["position"],uniforms:["worldViewProjection","color","scale","positionOffset"],needAlphaBlending:!1,needAlphaTesting:!1}),this._hover=!1,this._drag=!1,this._color=new E,this._scale=1,this._lastTick=-1,this.animationLength=100,this.hoverColor=new E(0,.467,.84),this.baseColor=new E(1,1,1),this.hoverScale=.75,this.baseScale=.35,this.dragScale=.55,this._positionOffset=c.Zero(),this._updateInterpolationTarget(),this._lastTick=Date.now(),this._onBeforeRender=this.getScene().onBeforeRenderObservable.add(()=>{const i=Date.now(),s=i-this._lastTick,o=this._targetScale-this._scale,r=Zi.Color3[0].copyFrom(this._targetColor).subtractToRef(this._color,Zi.Color3[0]);this._scale=this._scale+o*s/this.animationLength,r.scaleToRef(s/this.animationLength,r),this._color.addToRef(r,this._color),this.setColor3("color",this._color),this.setFloat("scale",this._scale),this.setVector3("positionOffset",this._positionOffset),this._lastTick=i})}_updateInterpolationTarget(){this.drag?(this._targetColor=this.hoverColor,this._targetScale=this.dragScale):this.hover?(this._targetColor=this.hoverColor,this._targetScale=this.hoverScale):(this._targetColor=this.baseColor,this._targetScale=this.baseScale)}dispose(){super.dispose(),this.getScene().onBeforeRenderObservable.remove(this._onBeforeRender)}}var ie;(function(g){g[g.IDLE=0]="IDLE",g[g.HOVER=1]="HOVER",g[g.DRAG=2]="DRAG"})(ie||(ie={}));class bs{get state(){return this._state}get gizmo(){return this._gizmo}set hover(t){t?this._state|=ie.HOVER:this._state&=~ie.HOVER,this._updateMaterial()}set drag(t){t?this._state|=ie.DRAG:this._state&=~ie.DRAG,this._updateMaterial()}constructor(t,e){this._state=ie.IDLE,this._materials=[],this._scene=e,this._gizmo=t,this.node=this.createNode(),this.node.reservedDataStore={handle:this}}_createMaterial(t){const e=new Ro("handle",this._scene);return t&&(e._positionOffset=t),e}_updateMaterial(){const t=this._state;for(const e of this._materials)e.hover=!1,e.drag=!1;if(t&ie.DRAG)for(const e of this._materials)e.drag=!0;else if(t&ie.HOVER)for(const e of this._materials)e.hover=!0}setDragBehavior(t,e,i){const s=new Zt;this._dragBehavior=s,this._dragStartObserver=s.onDragStartObservable.add(t),this._draggingObserver=s.onDragObservable.add(e),this._dragEndObserver=s.onDragEndObservable.add(i),this._dragBehavior.attach(this.node)}dispose(){this._dragBehavior.onDragStartObservable.remove(this._dragStartObserver),this._dragBehavior.onDragObservable.remove(this._draggingObserver),this._dragBehavior.onDragEndObservable.remove(this._dragEndObserver),this._dragBehavior.detach();for(const t of this._materials)t.dispose();this.node.dispose()}}class Bo extends bs{createNode(){const t=Bt("sideVert",{width:1,height:10,depth:.1},this._scene),e=new ne("side",this._scene);t.parent=e;const i=this._createMaterial();return t.material=i,t.isNearGrabbable=!0,this._materials.push(i),e}}class Co extends bs{createNode(){const t=Bt("angleHor",{width:3,height:1,depth:.1},this._scene),e=Bt("angleVert",{width:1,height:3,depth:.1},this._scene),i=new ne("angle",this._scene);return t.parent=i,e.parent=i,t.material=this._createMaterial(new c(1,0,0)),e.material=this._createMaterial(new c(0,1,0)),e.isNearGrabbable=!0,t.isNearGrabbable=!0,this._materials.push(t.material),this._materials.push(e.material),i}}class So extends Ee{set attachedSlate(t){t?(this.attachedMesh=t.mesh,this.updateBoundingBox(),this._pickedPointObserver=t._host.onPickingObservable.add(e=>{if(this._handleHovered&&(!e||e.parent!==this._handleHovered.node)&&(this._handleHovered.hover=!1,this._handleHovered=null),e&&e.parent&&e.parent.reservedDataStore&&e.parent.reservedDataStore.handle){const i=e.parent.reservedDataStore.handle;i.gizmo===this&&(this._handleHovered=i,this._handleHovered.hover=!0)}})):this._attachedSlate&&this._attachedSlate._host.onPickingObservable.remove(this._pickedPointObserver),this._attachedSlate=t}get attachedSlate(){return this._attachedSlate}constructor(t){super(t),this._boundingDimensions=new c(0,0,0),this._renderObserver=null,this._tmpQuaternion=new S,this._tmpVector=new c(0,0,0),this._corners=[],this._sides=[],this._boundingBoxGizmo={min:new c,max:new c},this._margin=.35,this._handleSize=.075,this._attachedSlate=null,this._existingSlateScale=new c,this.fixedScreenSize=!1,this.fixedScreenSizeDistanceFactor=10,this._createNode(),this.updateScale=!1,this._renderObserver=this.gizmoLayer.originalScene.onBeforeRenderObservable.add(()=>{this.attachedMesh&&!this._existingSlateScale.equals(this.attachedMesh.scaling)&&this.updateBoundingBox()})}_createNode(){this._handlesParent=new ne("handlesParent",this.gizmoLayer.utilityLayerScene),this._handlesParent.rotationQuaternion=S.Identity();const t=[{dimensions:new c(-1,-1,0),origin:new c(1,0,0)},{dimensions:new c(1,-1,0),origin:new c(0,0,0)},{dimensions:new c(1,1,0),origin:new c(0,1,0)},{dimensions:new c(-1,1,0),origin:new c(1,1,0)}];for(let e=0;e<4;e++){const i=new Co(this,this.gizmoLayer.utilityLayerScene);this._corners.push(i),i.node.rotation.z=Math.PI/2*e,i.node.parent=this._handlesParent,this._assignDragBehaviorCorners(i,(s,o,r,a)=>this._moveHandle(s,o,r,a,!0),t[e])}for(let e=0;e<4;e++){const i=new Bo(this,this.gizmoLayer.utilityLayerScene);this._sides.push(i),i.node.rotation.z=Math.PI/2*e,i.node.parent=this._handlesParent,this._assignDragBehaviorSides(i,e%2===0?new c(0,1,0):new c(1,0,0))}this._handlesParent.parent=this._rootMesh}_keepAspectRatio(t,e,i=!1){const s=p.Vector3[0];s.copyFromFloats(e,1,0).normalize(),i&&(s.y*=-1);const o=c.Dot(t,s);t.copyFrom(s).scaleInPlace(o)}_clampDimensions(t,e,i,s=!1){const o=p.Vector3[0];o.copyFrom(t).multiplyInPlace(i);const r=p.Vector3[1];if(r.copyFromFloats(Math.max(this._attachedSlate.minDimensions.x,o.x+e.x),Math.max(this._attachedSlate.minDimensions.y,o.y+e.y),0),s){const a=e.x/e.y;r.x=Math.max(r.x,r.y*a),r.y=Math.max(r.y,r.x/a)}o.copyFrom(r).subtractInPlace(e),t.x=Math.sign(t.x)*Math.abs(o.x),t.y=Math.sign(t.y)*Math.abs(o.y)}_moveHandle(t,e,i,s,o){if(!this._attachedSlate)return;if(o){const _=e.x/e.y;this._keepAspectRatio(i,_,s.dimensions.x*s.dimensions.y<0)}this._clampDimensions(i,e,s.dimensions,o);const r=p.Vector3[0],a=p.Vector3[1];r.copyFrom(i).multiplyInPlace(s.origin),a.copyFrom(i).multiplyInPlace(s.dimensions),this._attachedSlate.origin.copyFrom(t).addInPlace(r),this._attachedSlate.dimensions.set(e.x+a.x,e.y+a.y)}_assignDragBehaviorCorners(t,e,i){const s=new c,o=new c,r=new c,a=new Ct,_=new c,h=(b,w,ut,kt)=>{b.subtractToRef(ut,p.Vector3[0]);const bt=c.Dot(p.Vector3[0],w);p.Vector3[1].copyFrom(w).scaleInPlace(bt),p.Vector3[0].subtractInPlace(p.Vector3[1]),p.Vector3[0].addToRef(ut,kt)},d=b=>{this.attachedSlate&&this.attachedMesh&&(s.set(this.attachedSlate.dimensions.x,this.attachedSlate.dimensions.y,pt),o.copyFrom(this.attachedSlate.origin),r.copyFrom(b.position),a.copyFrom(this.attachedMesh.computeWorldMatrix(!0)),a.invert(),this.attachedSlate._followButton.isToggled=!1,c.TransformNormalToRef(c.Forward(),this.attachedMesh.getWorldMatrix(),_),_.normalize(),this._handleHovered&&(this._handleDragged=this._handleHovered,this._handleDragged.drag=!0))},u=b=>{this.attachedSlate&&this.attachedMesh&&(h(b.position,_,r,this._tmpVector),this._tmpVector.subtractInPlace(r),c.TransformNormalToRef(this._tmpVector,a,this._tmpVector),e(o,s,this._tmpVector,i),this.attachedSlate._positionElements(),this.updateBoundingBox())},m=()=>{this.attachedSlate&&this.attachedNode&&(this.attachedSlate._updatePivot(),this._handleDragged&&(this._handleDragged.drag=!1,this._handleDragged=null))};t.setDragBehavior(d,u,m)}_assignDragBehaviorSides(t,e){const i=new S,s=new c,o=new c,r=new c,a=new c,_=u=>{this.attachedSlate&&this.attachedMesh&&(i.copyFrom(this.attachedMesh.rotationQuaternion),s.copyFrom(u.position),r.copyFrom(this.attachedMesh.getAbsolutePivotPoint()),o.copyFrom(s).subtractInPlace(r).normalize(),this.attachedSlate._followButton.isToggled=!1,c.TransformNormalToRef(e,this.attachedMesh.getWorldMatrix(),a),a.normalize(),this._handleHovered&&(this._handleDragged=this._handleHovered,this._handleDragged.drag=!0))},h=u=>{if(this.attachedSlate&&this.attachedMesh){this._tmpVector.copyFrom(u.position),this._tmpVector.subtractInPlace(r),this._tmpVector.normalize();const m=-c.GetAngleBetweenVectorsOnPlane(this._tmpVector,o,a);S.RotationAxisToRef(e,m,this._tmpQuaternion),i.multiplyToRef(this._tmpQuaternion,this.attachedMesh.rotationQuaternion)}},d=()=>{this.attachedSlate&&this.attachedNode&&(this.attachedSlate._updatePivot(),this._handleDragged&&(this._handleDragged.drag=!1,this._handleDragged=null))};t.setDragBehavior(_,h,d)}_attachedNodeChanged(t){t&&this.updateBoundingBox()}updateBoundingBox(){if(this.attachedMesh){Q._RemoveAndStorePivotPoint(this.attachedMesh);const t=this.attachedMesh.parent;this.attachedMesh.setParent(null),this._update(),this.attachedMesh.rotationQuaternion||(this.attachedMesh.rotationQuaternion=S.RotationYawPitchRoll(this.attachedMesh.rotation.y,this.attachedMesh.rotation.x,this.attachedMesh.rotation.z)),this._tmpQuaternion.copyFrom(this.attachedMesh.rotationQuaternion),this._tmpVector.copyFrom(this.attachedMesh.position),this.attachedMesh.rotationQuaternion.set(0,0,0,1),this.attachedMesh.position.set(0,0,0);const e=this.attachedMesh.getHierarchyBoundingVectors();e.max.subtractToRef(e.min,this._boundingDimensions),this._boundingBoxGizmo.min=e.min,this._boundingBoxGizmo.max=e.max,this._updateHandlesPosition(),this._updateHandlesScaling(),this.attachedMesh.rotationQuaternion.copyFrom(this._tmpQuaternion),this.attachedMesh.position.copyFrom(this._tmpVector),Q._RestorePivotPoint(this.attachedMesh),this.attachedMesh.setParent(t),this.attachedMesh.computeWorldMatrix(!0),this._existingSlateScale.copyFrom(this.attachedMesh.scaling)}}_updateHandlesPosition(){const t=this._boundingBoxGizmo.min.clone(),e=this._boundingBoxGizmo.max.clone(),i=this._corners[0].node.scaling.length();t.x-=this._margin*i,t.y-=this._margin*i,e.x+=this._margin*i,e.y+=this._margin*i;const s=t.add(e).scaleInPlace(.5);this._corners[0].node.position.copyFromFloats(t.x,t.y,0),this._corners[1].node.position.copyFromFloats(e.x,t.y,0),this._corners[2].node.position.copyFromFloats(e.x,e.y,0),this._corners[3].node.position.copyFromFloats(t.x,e.y,0),this._sides[0].node.position.copyFromFloats(t.x,s.y,0),this._sides[1].node.position.copyFromFloats(s.x,t.y,0),this._sides[2].node.position.copyFromFloats(e.x,s.y,0),this._sides[3].node.position.copyFromFloats(s.x,e.y,0)}_updateHandlesScaling(){if(this._attachedSlate&&this._attachedSlate.mesh){const t=this._attachedSlate.mesh.scaling.x*this._attachedSlate.dimensions.x,e=this._attachedSlate.mesh.scaling.y*this._attachedSlate.dimensions.y,i=Math.min(t,e)*this._handleSize;for(let s=0;s<this._corners.length;s++)this._corners[s].node.scaling.setAll(i);for(let s=0;s<this._sides.length;s++)this._sides[s].node.scaling.setAll(i)}}_update(){if(super._update(),!!this.gizmoLayer.utilityLayerScene.activeCamera&&this._attachedSlate&&this._attachedSlate.mesh){if(this.fixedScreenSize){this._attachedSlate.mesh.absolutePosition.subtractToRef(this.gizmoLayer.utilityLayerScene.activeCamera.position,this._tmpVector);const t=this._handleSize*this._tmpVector.length()/this.fixedScreenSizeDistanceFactor;for(let e=0;e<this._corners.length;e++)this._corners[e].node.scaling.set(t,t,t);for(let e=0;e<this._sides.length;e++)this._sides[e].node.scaling.set(t,t,t)}this._updateHandlesPosition()}}dispose(){this.gizmoLayer.originalScene.onBeforeRenderObservable.remove(this._renderObserver),super.dispose();for(const t of this._corners)t.dispose();for(const t of this._sides)t.dispose()}}class Ft extends gs{get defaultBehavior(){return this._defaultBehavior}get dimensions(){return this._dimensions}set dimensions(t){let e=1;if(t.x<this.minDimensions.x||t.y<this.minDimensions.y){const i=t.x/t.y;this.minDimensions.x/this.minDimensions.y>i?e=this.minDimensions.x/t.x:e=this.minDimensions.y/t.y}this._dimensions.copyFrom(t).scaleInPlace(e),this._updatePivot(),this._positionElements()}get titleBarHeight(){return this._titleBarHeight}set titleBarHeight(t){this._titleBarHeight=t}set renderingGroupId(t){this._titleBar.renderingGroupId=t,this._titleBarTitle.renderingGroupId=t,this._contentPlate.renderingGroupId=t,this._backPlate.renderingGroupId=t}get renderingGroupId(){return this._titleBar.renderingGroupId}set title(t){this._titleText=t,this._titleTextComponent&&(this._titleTextComponent.text=t)}get title(){return this._titleText}constructor(t){super(t),this.titleBarMargin=.005,this.origin=new c(0,0,0),this._dimensions=new K(21.875,12.5),this._titleBarHeight=.625,this._titleText="",this._contentScaleRatio=1,this.minDimensions=new K(15.625,6.25),this.defaultDimensions=this._dimensions.clone(),this._followButton=new ri("followButton"+this.name),this._followButton.isToggleButton=!0,this._closeButton=new ri("closeButton"+this.name),this._contentViewport=new ti(0,0,1,1),this._contentDragBehavior=new Tt({dragPlaneNormal:new c(0,0,-1)})}_applyFacade(t){this._contentMaterial.albedoTexture=t,this._resetContentPositionAndZoom(),this._applyContentViewport(),t.attachToMesh(this._contentPlate,!0)}_addControl(t){t._host=this._host,this._host.utilityLayer&&t._prepareNode(this._host.utilityLayer.utilityLayerScene)}_getTypeName(){return"HolographicSlate"}_positionElements(){const t=this._followButton,e=this._closeButton,i=this._titleBar,s=this._titleBarTitle,o=this._contentPlate,r=this._backPlate;if(t&&e&&i){e.scaling.setAll(this.titleBarHeight),t.scaling.setAll(this.titleBarHeight),e.position.copyFromFloats(this.dimensions.x-this.titleBarHeight/2,-this.titleBarHeight/2,0).addInPlace(this.origin),t.position.copyFromFloats(this.dimensions.x-3*this.titleBarHeight/2,-this.titleBarHeight/2,0).addInPlace(this.origin);const a=this.dimensions.y-this.titleBarHeight-this.titleBarMargin,_=o.getScene().useRightHandedSystem;i.scaling.set(this.dimensions.x,this.titleBarHeight,pt),s.scaling.set(this.dimensions.x-2*this.titleBarHeight,this.titleBarHeight,pt),o.scaling.copyFromFloats(this.dimensions.x,a,pt),r.scaling.copyFromFloats(this.dimensions.x,a,pt),i.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight/2),0).addInPlace(this.origin),s.position.copyFromFloats(this.dimensions.x/2-this.titleBarHeight,-(this.titleBarHeight/2),_?pt:-pt).addInPlace(this.origin),o.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight+this.titleBarMargin+a/2),0).addInPlace(this.origin),r.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight+this.titleBarMargin+a/2),_?-pt:pt).addInPlace(this.origin),this._titleTextComponent.host.scaleTo(Ft._DEFAULT_TEXT_RESOLUTION_Y*s.scaling.x/s.scaling.y,Ft._DEFAULT_TEXT_RESOLUTION_Y);const h=this.dimensions.x/a;this._contentViewport.width=this._contentScaleRatio,this._contentViewport.height=this._contentScaleRatio/h,this._applyContentViewport(),this._gizmo&&this._gizmo.updateBoundingBox()}}_applyContentViewport(){var t;if(!((t=this._contentPlate)===null||t===void 0)&&t.material&&this._contentPlate.material.albedoTexture){const e=this._contentPlate.material.albedoTexture;e.uScale=this._contentScaleRatio,e.vScale=this._contentScaleRatio/this._contentViewport.width*this._contentViewport.height,e.uOffset=this._contentViewport.x,e.vOffset=this._contentViewport.y}}_resetContentPositionAndZoom(){this._contentViewport.x=0,this._contentViewport.y=1-this._contentViewport.height/this._contentViewport.width,this._contentScaleRatio=1}_updatePivot(){if(!this.mesh)return;const t=new c(this.dimensions.x*.5,-this.dimensions.y*.5,pt);t.addInPlace(this.origin),t.z=0;const e=new c(0,0,0);c.TransformCoordinatesToRef(e,this.mesh.computeWorldMatrix(!0),e),this.mesh.setPivotPoint(t);const i=new c(0,0,0);c.TransformCoordinatesToRef(i,this.mesh.computeWorldMatrix(!0),i),this.mesh.position.addInPlace(e).subtractInPlace(i)}_createNode(t){const e=new li("slate_"+this.name,t);this._titleBar=Bt("titleBar_"+this.name,{size:1},t),this._titleBarTitle=se("titleText_"+this.name,{size:1},t),this._titleBarTitle.parent=e,this._titleBarTitle.isPickable=!1;const i=ct.CreateForMesh(this._titleBarTitle);if(this._titleTextComponent=new U("titleText_"+this.name,this._titleText),this._titleTextComponent.textWrapping=oe.Ellipsis,this._titleTextComponent.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,this._titleTextComponent.color="white",this._titleTextComponent.fontSize=Ft._DEFAULT_TEXT_RESOLUTION_Y/2,this._titleTextComponent.paddingLeft=Ft._DEFAULT_TEXT_RESOLUTION_Y/4,i.addControl(this._titleTextComponent),t.useRightHandedSystem){const r=new lt(0,0,1,1);this._contentPlate=se("contentPlate_"+this.name,{size:1,sideOrientation:pi.BACKSIDE,frontUVs:r},t),this._backPlate=se("backPlate_"+this.name,{size:1,sideOrientation:pi.FRONTSIDE},t)}else{const r=new lt(0,0,1,1);this._contentPlate=se("contentPlate_"+this.name,{size:1,sideOrientation:pi.FRONTSIDE,frontUVs:r},t),this._backPlate=se("backPlate_"+this.name,{size:1,sideOrientation:pi.BACKSIDE},t)}this._titleBar.parent=e,this._titleBar.isNearGrabbable=!0,this._contentPlate.parent=e,this._backPlate.parent=e,this._attachContentPlateBehavior(),this._addControl(this._followButton),this._addControl(this._closeButton);const s=this._followButton,o=this._closeButton;return s.node.parent=e,o.node.parent=e,this._positionElements(),this._followButton.imageUrl=Ft.ASSETS_BASE_URL+Ft.FOLLOW_ICON_FILENAME,this._closeButton.imageUrl=Ft.ASSETS_BASE_URL+Ft.CLOSE_ICON_FILENAME,this._followButton.isBackplateVisible=!1,this._closeButton.isBackplateVisible=!1,this._followButton.onToggleObservable.add(r=>{this._defaultBehavior.followBehaviorEnabled=r,this._defaultBehavior.followBehaviorEnabled&&this._defaultBehavior.followBehavior.recenter()}),this._closeButton.onPointerClickObservable.add(()=>{this.dispose()}),e.rotationQuaternion=S.Identity(),e.isVisible=!1,e}_attachContentPlateBehavior(){this._contentDragBehavior.attach(this._contentPlate),this._contentDragBehavior.moveAttached=!1,this._contentDragBehavior.useObjectOrientationForDragging=!0,this._contentDragBehavior.updateDragPlane=!1;const t=new c,e=new c,i=new c,s=new c,o=new K;let r,a;this._contentDragBehavior.onDragStartObservable.add(h=>{this.node&&(r=this._contentViewport.clone(),a=this.node.computeWorldMatrix(!0),t.copyFrom(h.dragPlanePoint),e.set(this.dimensions.x,this.dimensions.y,pt),e.y-=this.titleBarHeight+this.titleBarMargin,c.TransformNormalToRef(e,a,e),i.copyFromFloats(0,1,0),c.TransformNormalToRef(i,a,i),s.copyFromFloats(1,0,0),c.TransformNormalToRef(s,a,s),i.normalize(),i.scaleInPlace(1/c.Dot(i,e)),s.normalize(),s.scaleInPlace(1/c.Dot(s,e)))});const _=new c;this._contentDragBehavior.onDragObservable.add(h=>{_.copyFrom(h.dragPlanePoint),_.subtractInPlace(t),o.copyFromFloats(c.Dot(_,s),c.Dot(_,i)),this._contentViewport.x=si.Clamp(r.x-_.x,0,1-this._contentViewport.width*this._contentScaleRatio),this._contentViewport.y=si.Clamp(r.y-_.y,0,1-this._contentViewport.height*this._contentScaleRatio),this._applyContentViewport()})}_affectMaterial(t){this._titleBarMaterial=new W(`${this.name} plateMaterial`,t.getScene()),this._contentMaterial=new dt(`${this.name} contentMaterial`,t.getScene()),this._contentMaterial.renderBorders=!0,this._backMaterial=new W(`${this.name} backPlate`,t.getScene()),this._backMaterial.lineWidth=pt,this._backMaterial.radius=.005,this._backMaterial.backFaceCulling=!0,this._titleBar.material=this._titleBarMaterial,this._contentPlate.material=this._contentMaterial,this._backPlate.material=this._backMaterial,this._resetContent(),this._applyContentViewport()}_prepareNode(t){super._prepareNode(t),this._gizmo=new So(this._host.utilityLayer),this._gizmo.attachedSlate=this,this._defaultBehavior=new ps,this._defaultBehavior.attach(this.node,[this._titleBar]),this._defaultBehavior.sixDofDragBehavior.onDragStartObservable.add(()=>{this._followButton.isToggled=!1}),this._positionChangedObserver=this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.add(()=>{this._gizmo.updateBoundingBox()}),this._updatePivot(),this.resetDefaultAspectAndPose(!1)}resetDefaultAspectAndPose(t=!0){if(!this._host||!this._host.utilityLayer||!this.node)return;const e=this._host.utilityLayer.utilityLayerScene,i=e.activeCamera;if(i){const s=i.getWorldMatrix(),o=c.TransformNormal(c.Backward(e.useRightHandedSystem),s);this.origin.setAll(0),this._gizmo.updateBoundingBox();const r=this.node.getAbsolutePivotPoint();this.node.position.copyFrom(i.position).subtractInPlace(o).subtractInPlace(r),this.node.rotationQuaternion=S.FromLookDirectionLH(o,new c(0,1,0)),t&&(this.dimensions=this.defaultDimensions)}}dispose(){super.dispose(),this._titleBarMaterial.dispose(),this._contentMaterial.dispose(),this._titleBar.dispose(),this._titleBarTitle.dispose(),this._contentPlate.dispose(),this._backPlate.dispose(),this._followButton.dispose(),this._closeButton.dispose(),this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.remove(this._positionChangedObserver),this._defaultBehavior.detach(),this._gizmo.dispose(),this._contentDragBehavior.detach()}}Ft.ASSETS_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";Ft.CLOSE_ICON_FILENAME="IconClose.png";Ft.FOLLOW_ICON_FILENAME="IconFollowMe.png";Ft._DEFAULT_TEXT_RESOLUTION_Y=102.4;class ai extends Ue{get defaultBehavior(){return this._defaultBehavior}get isPinned(){return this._isPinned}set isPinned(t){if(this._pinButton.isToggled!==t){this._pinButton.isToggled=t;return}this._isPinned=t,t?this._defaultBehavior.followBehaviorEnabled=!1:this._defaultBehavior.followBehaviorEnabled=!0}_createPinButton(t){const e=new ri("pin"+this.name,!1);return e.imageUrl=ai._ASSETS_BASE_URL+ai._PIN_ICON_FILENAME,e.parent=this,e._host=this._host,e.isToggleButton=!0,e.onToggleObservable.add(i=>{this.isPinned=i}),this._host.utilityLayer&&(e._prepareNode(this._host.utilityLayer.utilityLayerScene),e.scaling.scaleInPlace(Ue.MENU_BUTTON_SCALE),e.node&&(e.node.parent=t)),e}_createNode(t){const e=super._createNode(t);return this._pinButton=this._createPinButton(e),this.isPinned=!1,this._defaultBehavior.attach(e,[this._backPlate]),this._defaultBehavior.followBehavior.ignoreCameraPitchAndRoll=!0,this._defaultBehavior.followBehavior.pitchOffset=-15,this._defaultBehavior.followBehavior.minimumDistance=.3,this._defaultBehavior.followBehavior.defaultDistance=.4,this._defaultBehavior.followBehavior.maximumDistance=.6,this._backPlate.isNearGrabbable=!0,e.isVisible=!1,e}_finalProcessing(){super._finalProcessing(),this._pinButton.position.copyFromFloats((this._backPlate.scaling.x+Ue.MENU_BUTTON_SCALE)/2,this._backPlate.scaling.y/2,0)}constructor(t){super(t),this._isPinned=!1,this._defaultBehavior=new ps,this._dragObserver=this._defaultBehavior.sixDofDragBehavior.onDragObservable.add(()=>{this.isPinned=!0}),this.backPlateMargin=1}dispose(){super.dispose(),this._defaultBehavior.sixDofDragBehavior.onDragObservable.remove(this._dragObserver),this._defaultBehavior.detach()}}ai._ASSETS_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";ai._PIN_ICON_FILENAME="IconPin.png";const Mo="mrdlSliderBarPixelShader",wo=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform vec4 Global_Left_Index_Middle_Position;
uniform vec4 Global_Right_Index_Middle_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Blob_Fragment_B30(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void FastLinearTosRGB_B42(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Scale_RGB_B59(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Fragment_Main_B121(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{
float theta=Sun_Theta*2.0*3.14159;
float phi=Sun_Phi*3.14159;
vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));
float NdotL=max(dot(lightDir,Normal),0.0);
vec3 R=reflect(Incident,Normal);
float RdotL=max(0.0,dot(R,lightDir));
float specular=pow(RdotL,Shininess);
specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);
vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;
}
void Bulge_B79(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{
vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));
vec3 B=(cross(Normal,Tangent));
float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;
k=sin(k*3.14159*0.5);
k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));
New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;
New_Normal=Enabled ? New_Normal : Normal;
}
void SSS_B77(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{
float NdotI=abs(dot(Normal,Incident));
float BdotI=abs(dot(ButtonN,Incident));
Result=(abs(NdotI-BdotI)); 
}
void FingerOcclusion_B67(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void FingerOcclusion_B68(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void Scale_Color_B91(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void From_HSV_B73(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{
vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);
Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);
Color.a=Alpha;
}
void Fast_Fresnel_B122(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{
float d=max(-dot(Incident,Normal),0.0);
Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(.01-d,Power);
Transmit=1.0-Reflect;
}
void Mapped_Environment_B51(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{
Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
}
vec4 SampleEnv_Bid50(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{
float k=pow(abs(D.y),exponent);
vec4 C;
if (D.y>0.0) {
C=mix(H,S,k);
} else {
C=mix(H,G,k); 
}
return C;
}
void Sky_Environment_B50(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{
Reflected_Color=SampleEnv_Bid50(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);
Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
}
void Min_Segment_Distance_B65(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{
vec3 u=P1-P0;
vec3 v=Q1-Q0;
vec3 w=P0-Q0;
float a=dot(u,u);
float b=dot(u,v);
float c=dot(v,v);
float d=dot(u,w);
float e=dot(v,w);
float D=a*c-b*b;
float sD=D;
float tD=D;
float sc,sN,tc,tN;
if (D<0.00001) {
sN=0.0;
sD=1.0;
tN=e;
tD=c;
} else {
sN=(b*e-c*d);
tN=(a*e-b*d);
if (sN<0.0) {
sN=0.0;
tN=e;
tD=c;
} else if (sN>sD) {
sN=sD;
tN=e+b;
tD=c;
}
}
if (tN<0.0) {
tN=0.0;
if (-d<0.0) {
sN=0.0;
} else if (-d>a) {
sN=sD;
} else {
sN=-d;
sD=a;
}
} else if (tN>tD) {
tN=tD;
if ((-d+b)<0.0) {
sN=0.0;
} else if ((-d+b)>a) {
sN=sD;
} else {
sN=(-d+b);
sD=a;
}
}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;
tc=abs(tN)<0.000001 ? 0.0 : tN/tD;
NearP=P0+sc*u;
NearQ=Q0+tc*v;
Distance=distance(NearP,NearQ);
}
void To_XYZ_B74(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Finger_Positions_B64(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{
Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);
Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);
Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);
Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);
}
void VaryHSV_B108(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{
HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));
}
void Remap_Range_B114(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void To_HSV_B75(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{
vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);
vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);
vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);
float d=q.x-min(q.w,q.y);
float e=1.0e-10;
Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));
Saturation=d/(q.x+e);
Value=q.x;
Alpha=Color.a;
HSV=vec3(Hue,Saturation,Value);
}
void Code_B110(
float X,
out float Result)
{
Result=(acos(X)/3.14159-0.5)*2.0;
}
void Rim_Light_B132(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{
vec3 R=reflect(Incident,Normal);
float RdotF=dot(R,Front);
float RdotL=sqrt(1.0-RdotF*RdotF);
vec2 UV=vec2(R.y*0.5+0.5,0.5);
vec4 Color=texture(Texture,UV);
Result=Color;
}
void main()
{
vec4 Blob_Color_Q30;
#if BLOB_ENABLE
Blob_Fragment_B30(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q30);
#else
Blob_Color_Q30=vec4(0,0,0,0);
#endif
vec3 Incident_Q39=normalize(vPosition-cameraPosition);
vec3 Normalized_Q38=normalize(vNormal);
vec3 Normalized_Q71=normalize(vTangent);
vec4 Color_Q83;
#if DECAL_ENABLE
Color_Q83=texture(_Decal_,vUV);
#else
Color_Q83=vec4(0,0,0,0);
#endif
float X_Q90;
float Y_Q90;
float Z_Q90;
float W_Q90;
X_Q90=vExtra1.x;
Y_Q90=vExtra1.y;
Z_Q90=vExtra1.z;
W_Q90=vExtra1.w;
vec4 Linear_Q43;
Linear_Q43.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);
Linear_Q43.a=_Sky_Color_.a;
vec4 Linear_Q44;
Linear_Q44.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);
Linear_Q44.a=_Horizon_Color_.a;
vec4 Linear_Q45;
Linear_Q45.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);
Linear_Q45.a=_Ground_Color_.a;
vec3 Left_Index_Q64;
vec3 Right_Index_Q64;
vec3 Left_Index_Middle_Q64;
vec3 Right_Index_Middle_Q64;
Finger_Positions_B64(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q64,Right_Index_Q64,Left_Index_Middle_Q64,Right_Index_Middle_Q64);
vec4 Linear_Q46;
Linear_Q46.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);
Linear_Q46.a=_Albedo_.a;
vec3 Normalized_Q107=normalize(vBinormal);
vec3 Incident_Q70=normalize(vPosition-cameraPosition);
vec3 New_Normal_Q79;
Bulge_B79(_Bulge_Enabled_,Normalized_Q38,Normalized_Q71,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q79);
float Result_Q77;
SSS_B77(vBinormal,New_Normal_Q79,Incident_Q39,Result_Q77);
vec4 Result_Q91;
Scale_Color_B91(Color_Q83,X_Q90,Result_Q91);
float Transmit_Q122;
float Reflect_Q122;
Fast_Fresnel_B122(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q79,Incident_Q39,Transmit_Q122,Reflect_Q122);
float Product_Q125=Y_Q90*Y_Q90;
vec3 NearP_Q65;
vec3 NearQ_Q65;
float Distance_Q65;
Min_Segment_Distance_B65(Left_Index_Q64,Left_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q65,NearQ_Q65,Distance_Q65);
vec3 NearP_Q63;
vec3 NearQ_Q63;
float Distance_Q63;
Min_Segment_Distance_B65(Right_Index_Q64,Right_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q63,NearQ_Q63,Distance_Q63);
vec3 Reflected_Q47=reflect(Incident_Q39,New_Normal_Q79);
vec4 Product_Q103=Linear_Q46*vec4(1,1,1,1);
vec4 Result_Q132;
Rim_Light_B132(Normalized_Q107,Normalized_Q38,Incident_Q70,_Rim_Intensity_,_Rim_Texture_,Result_Q132);
float Dot_Q72=dot(Incident_Q70, Normalized_Q71);
float MaxAB_Q123=max(Reflect_Q122,Product_Q125);
float NotInShadow_Q67;
#if OCCLUSION_ENABLED
FingerOcclusion_B67(_Width_,Distance_Q65,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q65,_Clip_Fade_,NotInShadow_Q67);
#else
NotInShadow_Q67=1.0;
#endif
float NotInShadow_Q68;
#if OCCLUSION_ENABLED
FingerOcclusion_B68(_Width_,Distance_Q63,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q63,_Clip_Fade_,NotInShadow_Q68);
#else
NotInShadow_Q68=1.0;
#endif
vec4 Reflected_Color_Q51;
vec4 Indirect_Diffuse_Q51;
#if ENV_ENABLE
Mapped_Environment_B51(_Reflection_Map_,_Indirect_Environment_,Reflected_Q47,Reflected_Color_Q51,Indirect_Diffuse_Q51);
#else
Reflected_Color_Q51=vec4(0,0,0,1);
Indirect_Diffuse_Q51=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q50;
vec4 Indirect_Color_Q50;
#if SKY_ENABLED
Sky_Environment_B50(New_Normal_Q79,Reflected_Q47,Linear_Q43,Linear_Q44,Linear_Q45,_Horizon_Power_,Reflected_Color_Q50,Indirect_Color_Q50);
#else
Reflected_Color_Q50=vec4(0,0,0,1);
Indirect_Color_Q50=vec4(0,0,0,1);
#endif
float Hue_Q75;
float Saturation_Q75;
float Value_Q75;
float Alpha_Q75;
vec3 HSV_Q75;
To_HSV_B75(Product_Q103,Hue_Q75,Saturation_Q75,Value_Q75,Alpha_Q75,HSV_Q75);
float Hue_Q127;
float Saturation_Q127;
float Value_Q127;
float Alpha_Q127;
vec3 HSV_Q127;
To_HSV_B75(Result_Q132,Hue_Q127,Saturation_Q127,Value_Q127,Alpha_Q127,HSV_Q127);
float Result_Q110;
Code_B110(Dot_Q72,Result_Q110);
float AbsA_Q76=abs(Result_Q110);
float MinAB_Q58=min(NotInShadow_Q67,NotInShadow_Q68);
vec4 Sum_Q48=Reflected_Color_Q51+Reflected_Color_Q50;
vec4 Sum_Q49=Indirect_Diffuse_Q51+Indirect_Color_Q50;
vec3 HSV_Out_Q126;
VaryHSV_B108(HSV_Q127,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q126);
float Out_Q114;
Remap_Range_B114(-1.0,1.0,0.0,1.0,Result_Q110,Out_Q114);
float Product_Q106;
Product_Q106=AbsA_Q76*_Hue_Shift_;
float X_Q128;
float Y_Q128;
float Z_Q128;
To_XYZ_B74(HSV_Out_Q126,X_Q128,Y_Q128,Z_Q128);
vec2 Vec2_Q112=vec2(Out_Q114,0.5);
vec3 HSV_Out_Q108;
VaryHSV_B108(HSV_Q75,Product_Q106,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q108);
vec4 Color_Q129;
From_HSV_B73(X_Q128,Y_Q128,Z_Q128,0.0,Color_Q129);
vec4 Color_Q111;
#if IRIDESCENCE_ENABLED
Color_Q111=texture(_Iridescence_Texture_,Vec2_Q112);
#else
Color_Q111=vec4(0,0,0,0);
#endif
float X_Q74;
float Y_Q74;
float Z_Q74;
To_XYZ_B74(HSV_Out_Q108,X_Q74,Y_Q74,Z_Q74);
vec4 Result_Q131=_Rim_Intensity_*Color_Q129;
vec4 Result_Q113=_Iridescence_Intensity_*Color_Q111;
vec4 Color_Q73;
From_HSV_B73(X_Q74,Y_Q74,Z_Q74,0.0,Color_Q73);
vec4 Result_Q84=Result_Q91+(1.0-Result_Q91.a)*Color_Q73;
vec4 Result_Q121;
Fragment_Main_B121(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q79,Result_Q84,MaxAB_Q123,_Shininess_,Incident_Q39,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q48,Sum_Q49,_Sharpness_,Result_Q77,_Subsurface_,vec4(0,0,0,0),Result_Q131,Result_Q113,Result_Q121);
vec4 Result_Q59;
Scale_RGB_B59(Result_Q121,MinAB_Q58,Result_Q59);
vec4 sRGB_Q42;
FastLinearTosRGB_B42(Result_Q59,sRGB_Q42);
vec4 Result_Q31=Blob_Color_Q30+(1.0-Blob_Color_Q30.a)*sRGB_Q42;
vec4 Result_Q40=Result_Q31; Result_Q40.a=1.0;
vec4 Out_Color=Result_Q40;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[Mo]=wo;const Eo="mrdlSliderBarVertexShader",Oo=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Object_To_World_Normal_B32(
vec3 Nrm_Object,
out vec3 Nrm_World)
{
Nrm_World=(vec4(Nrm_Object,0.0)).xyz;
}
void Blob_Vertex_B23(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Blob_Vertex_B24(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B130(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
float deltad=(length(delta)*2.0);
float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;
float innerd=clamp(deltad*2.0,0.0,1.0);
float outerd=clamp(deltad*2.0-1.0,0.0,1.0);
float bevelAngle=outerd*3.14159*0.5;
float sinb=sin(bevelAngle);
float cosb=cos(bevelAngle);
float beveld=(1.0-f)*innerd+f*sinb;
float br=outerd;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
float dir=P.z<0.0001 ? 1.0 : -1.0;
New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);
New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);
Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);
Radial_Dir=vec3(delta*r2,0.0);
vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);
New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;
}
void Object_To_World_Dir_B60(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{
Normal_World=(world*vec4(Dir_Object,0.0)).xyz;
Normal_Length=length(Normal_World);
Normal_World_N=Normal_World/Normal_Length;
}
void To_XYZ_B78(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Conditional_Float_B93(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Object_To_World_Dir_B28(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void Pick_Radius_B69(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Conditional_Float_B36(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Greater_Than_B37(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{
Greater_Than=Left>Right;
Not_Greater_Than=!Greater_Than;
}
void Remap_Range_B105(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void main()
{
vec2 XY_Q85;
XY_Q85=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);
vec3 Tangent_World_Q27;
vec3 Tangent_World_N_Q27;
float Tangent_Length_Q27;
Tangent_World_Q27=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q27=length(Tangent_World_Q27);
Tangent_World_N_Q27=Tangent_World_Q27/Tangent_Length_Q27;
vec3 Normal_World_Q60;
vec3 Normal_World_N_Q60;
float Normal_Length_Q60;
Object_To_World_Dir_B60(vec3(0,0,1),Normal_World_Q60,Normal_World_N_Q60,Normal_Length_Q60);
float X_Q78;
float Y_Q78;
float Z_Q78;
To_XYZ_B78(position,X_Q78,Y_Q78,Z_Q78);
vec3 Nrm_World_Q26;
Nrm_World_Q26=normalize((world*vec4(normal,0.0)).xyz);
vec3 Binormal_World_Q28;
vec3 Binormal_World_N_Q28;
float Binormal_Length_Q28;
Object_To_World_Dir_B28(vec3(0,1,0),Binormal_World_Q28,Binormal_World_N_Q28,Binormal_Length_Q28);
float Anisotropy_Q29=Tangent_Length_Q27/Binormal_Length_Q28;
float Result_Q69;
Pick_Radius_B69(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q69);
float Anisotropy_Q53=Binormal_Length_Q28/Normal_Length_Q60;
bool Not_Greater_Than_Q37;
bool Greater_Than_Q37;
Greater_Than_B37(Z_Q78,0.0,Not_Greater_Than_Q37,Greater_Than_Q37);
vec4 Linear_Q101;
Linear_Q101.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);
Linear_Q101.a=_Left_Color_.a;
vec4 Linear_Q102;
Linear_Q102.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);
Linear_Q102.a=_Right_Color_.a;
vec3 Difference_Q61=vec3(0,0,0)-Normal_World_N_Q60;
vec4 Out_Color_Q34=vec4(X_Q78,Y_Q78,Z_Q78,1);
float Result_Q36;
Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_,_Bevel_Front_,Result_Q36);
float Result_Q94;
Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q94);
vec3 New_P_Q130;
vec2 New_UV_Q130;
float Radial_Gradient_Q130;
vec3 Radial_Dir_Q130;
vec3 New_Normal_Q130;
Move_Verts_B130(Anisotropy_Q29,position,Result_Q69,Result_Q36,normal,Anisotropy_Q53,Result_Q94,New_P_Q130,New_UV_Q130,Radial_Gradient_Q130,Radial_Dir_Q130,New_Normal_Q130);
float X_Q98;
float Y_Q98;
X_Q98=New_UV_Q130.x;
Y_Q98=New_UV_Q130.y;
vec3 Pos_World_Q12;
Object_To_World_Pos_B12(New_P_Q130,Pos_World_Q12);
vec3 Nrm_World_Q32;
Object_To_World_Normal_B32(New_Normal_Q130,Nrm_World_Q32);
vec4 Blob_Info_Q23;
#if BLOB_ENABLE
Blob_Vertex_B23(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q23);
#else
Blob_Info_Q23=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q24;
#if BLOB_ENABLE_2
Blob_Vertex_B24(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q24);
#else
Blob_Info_Q24=vec4(0,0,0,0);
#endif
float Out_Q105;
Remap_Range_B105(0.0,1.0,0.0,1.0,X_Q98,Out_Q105);
float X_Q86;
float Y_Q86;
float Z_Q86;
To_XYZ_B78(Nrm_World_Q32,X_Q86,Y_Q86,Z_Q86);
vec4 Color_At_T_Q97=mix(Linear_Q101,Linear_Q102,Out_Q105);
float Minus_F_Q87=-Z_Q86;
float R_Q99;
float G_Q99;
float B_Q99;
float A_Q99;
R_Q99=Color_At_T_Q97.r; G_Q99=Color_At_T_Q97.g; B_Q99=Color_At_T_Q97.b; A_Q99=Color_At_T_Q97.a;
float ClampF_Q88=clamp(0.0,Minus_F_Q87,1.0);
float Result_Q93;
Conditional_Float_B93(_Decal_Front_Only_,ClampF_Q88,1.0,Result_Q93);
vec4 Vec4_Q89=vec4(Result_Q93,Radial_Gradient_Q130,G_Q99,B_Q99);
vec3 Position=Pos_World_Q12;
vec3 Normal=Nrm_World_Q32;
vec2 UV=XY_Q85;
vec3 Tangent=Tangent_World_N_Q27;
vec3 Binormal=Difference_Q61;
vec4 Color=Out_Color_Q34;
vec4 Extra1=Vec4_Q89;
vec4 Extra2=Blob_Info_Q23;
vec4 Extra3=Blob_Info_Q24;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;ot.ShadersStore[Eo]=Oo;class Do extends le{constructor(){super(),this.SKY_ENABLED=!0,this.BLOB_ENABLE_2=!0,this.IRIDESCENCE_ENABLED=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class y extends _e{constructor(t,e){super(t,e),this.radius=.6,this.bevelFront=.6,this.bevelFrontStretch=.077,this.bevelBack=0,this.bevelBackStretch=0,this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this.bulgeEnabled=!1,this.bulgeHeight=-.323,this.bulgeRadius=.73,this.sunIntensity=1.102,this.sunTheta=.76,this.sunPhi=.526,this.indirectDiffuse=.658,this.albedo=new z(.0117647,.505882,.996078,1),this.specular=0,this.shininess=10,this.sharpness=0,this.subsurface=0,this.leftGradientColor=new z(.0117647,.505882,.996078,1),this.rightGradientColor=new z(.0117647,.505882,.996078,1),this.reflection=.749,this.frontReflect=0,this.edgeReflect=.09,this.power=8.13,this.skyColor=new z(.0117647,.964706,.996078,1),this.horizonColor=new z(.0117647,.333333,.996078,1),this.groundColor=new z(0,.254902,.996078,1),this.horizonPower=1,this.width=.02,this.fuzz=.5,this.minFuzz=.001,this.clipFade=.01,this.hueShift=0,this.saturationShift=0,this.valueShift=0,this.blobPosition=new c(0,0,.1),this.blobIntensity=.5,this.blobNearSize=.01,this.blobFarSize=.03,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.576,this.blobPulse=0,this.blobFade=1,this.blobPosition2=new c(.2,0,.1),this.blobNearSize2=.01,this.blobPulse2=0,this.blobFade2=1,this.blobTexture=new V("",this.getScene()),this.leftIndexPosition=new c(0,0,1),this.rightIndexPosition=new c(-1,-1,-1),this.leftIndexMiddlePosition=new c(0,0,0),this.rightIndexMiddlePosition=new c(0,0,0),this.decalScaleXY=new K(1.5,1.5),this.decalFrontOnly=!0,this.rimIntensity=.287,this.rimHueShift=0,this.rimSaturationShift=0,this.rimValueShift=-1,this.iridescenceIntensity=0,this.useGlobalLeftIndex=1,this.useGlobalRightIndex=1,this.globalLeftIndexTipProximity=0,this.globalRightIndexTipProximity=0,this.globalLeftIndexTipPosition=new lt(.5,0,-.55,1),this.globaRightIndexTipPosition=new lt(0,0,0,1),this.globalLeftThumbTipPosition=new lt(.5,0,-.55,1),this.globalRightThumbTipPosition=new lt(0,0,0,1),this.globalLeftIndexMiddlePosition=new lt(.5,0,-.55,1),this.globalRightIndexMiddlePosition=new lt(0,0,0,1),this.alphaMode=Gt.ALPHA_DISABLE,this.backFaceCulling=!1,this._blueGradientTexture=new V(y.BLUE_GRADIENT_TEXTURE_URL,this.getScene(),!0,!1,V.NEAREST_SAMPLINGMODE),this._decalTexture=new V("",this.getScene()),this._reflectionMapTexture=new V("",this.getScene()),this._indirectEnvTexture=new V("",this.getScene())}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new Do);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlSliderBar",h=i.toString(),d=["world","viewProjection","cameraPosition","_Radius_","_Bevel_Front_","_Bevel_Front_Stretch_","_Bevel_Back_","_Bevel_Back_Stretch_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Bulge_Enabled_","_Bulge_Height_","_Bulge_Radius_","_Sun_Intensity_","_Sun_Theta_","_Sun_Phi_","_Indirect_Diffuse_","_Albedo_","_Specular_","_Shininess_","_Sharpness_","_Subsurface_","_Left_Color_","_Right_Color_","_Reflection_","_Front_Reflect_","_Edge_Reflect_","_Power_","_Sky_Color_","_Horizon_Color_","_Ground_Color_","_Horizon_Power_","_Reflection_Map_","_Indirect_Environment_","_Width_","_Fuzz_","_Min_Fuzz_","_Clip_Fade_","_Hue_Shift_","_Saturation_Shift_","_Value_Shift_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Left_Index_Pos_","_Right_Index_Pos_","_Left_Index_Middle_Pos_","_Right_Index_Middle_Pos_","_Decal_","_Decal_Scale_XY_","_Decal_Front_Only_","_Rim_Intensity_","_Rim_Texture_","_Rim_Hue_Shift_","_Rim_Saturation_Shift_","_Rim_Value_Shift_","_Iridescence_Intensity_","_Iridescence_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Middle_Position;","Global_Right_Index_Middle_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],u=["_Rim_Texture_","_Iridescence_Texture_"],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i,this._materialContext)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){if(!i.materialDefines)return;const o=i.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Bevel_Front_",this.bevelFront),this._activeEffect.setFloat("_Bevel_Front_Stretch_",this.bevelFrontStretch),this._activeEffect.setFloat("_Bevel_Back_",this.bevelBack),this._activeEffect.setFloat("_Bevel_Back_Stretch_",this.bevelBackStretch),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Bulge_Enabled_",this.bulgeEnabled?1:0),this._activeEffect.setFloat("_Bulge_Height_",this.bulgeHeight),this._activeEffect.setFloat("_Bulge_Radius_",this.bulgeRadius),this._activeEffect.setFloat("_Sun_Intensity_",this.sunIntensity),this._activeEffect.setFloat("_Sun_Theta_",this.sunTheta),this._activeEffect.setFloat("_Sun_Phi_",this.sunPhi),this._activeEffect.setFloat("_Indirect_Diffuse_",this.indirectDiffuse),this._activeEffect.setDirectColor4("_Albedo_",this.albedo),this._activeEffect.setFloat("_Specular_",this.specular),this._activeEffect.setFloat("_Shininess_",this.shininess),this._activeEffect.setFloat("_Sharpness_",this.sharpness),this._activeEffect.setFloat("_Subsurface_",this.subsurface),this._activeEffect.setDirectColor4("_Left_Color_",this.leftGradientColor),this._activeEffect.setDirectColor4("_Right_Color_",this.rightGradientColor),this._activeEffect.setFloat("_Reflection_",this.reflection),this._activeEffect.setFloat("_Front_Reflect_",this.frontReflect),this._activeEffect.setFloat("_Edge_Reflect_",this.edgeReflect),this._activeEffect.setFloat("_Power_",this.power),this._activeEffect.setDirectColor4("_Sky_Color_",this.skyColor),this._activeEffect.setDirectColor4("_Horizon_Color_",this.horizonColor),this._activeEffect.setDirectColor4("_Ground_Color_",this.groundColor),this._activeEffect.setFloat("_Horizon_Power_",this.horizonPower),this._activeEffect.setTexture("_Reflection_Map_",this._reflectionMapTexture),this._activeEffect.setTexture("_Indirect_Environment_",this._indirectEnvTexture),this._activeEffect.setFloat("_Width_",this.width),this._activeEffect.setFloat("_Fuzz_",this.fuzz),this._activeEffect.setFloat("_Min_Fuzz_",this.minFuzz),this._activeEffect.setFloat("_Clip_Fade_",this.clipFade),this._activeEffect.setFloat("_Hue_Shift_",this.hueShift),this._activeEffect.setFloat("_Saturation_Shift_",this.saturationShift),this._activeEffect.setFloat("_Value_Shift_",this.valueShift),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this.blobTexture),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setVector3("_Left_Index_Pos_",this.leftIndexPosition),this._activeEffect.setVector3("_Right_Index_Pos_",this.rightIndexPosition),this._activeEffect.setVector3("_Left_Index_Middle_Pos_",this.leftIndexMiddlePosition),this._activeEffect.setVector3("_Right_Index_Middle_Pos_",this.rightIndexMiddlePosition),this._activeEffect.setTexture("_Decal_",this._decalTexture),this._activeEffect.setVector2("_Decal_Scale_XY_",this.decalScaleXY),this._activeEffect.setFloat("_Decal_Front_Only_",this.decalFrontOnly?1:0),this._activeEffect.setFloat("_Rim_Intensity_",this.rimIntensity),this._activeEffect.setTexture("_Rim_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("_Rim_Hue_Shift_",this.rimHueShift),this._activeEffect.setFloat("_Rim_Saturation_Shift_",this.rimSaturationShift),this._activeEffect.setFloat("_Rim_Value_Shift_",this.rimValueShift),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setTexture("_Iridescence_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("Use_Global_Left_Index",this.useGlobalLeftIndex),this._activeEffect.setFloat("Use_Global_Right_Index",this.useGlobalRightIndex),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this.globalLeftIndexTipPosition),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this.globaRightIndexTipPosition),this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position",this.globalLeftThumbTipPosition),this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position",this.globalRightThumbTipPosition),this._activeEffect.setVector4("Global_Left_Index_Middle_Position",this.globalLeftIndexMiddlePosition),this._activeEffect.setVector4("Global_Right_Index_Middle_Position",this.globalRightIndexMiddlePosition),this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity",this.globalLeftIndexTipProximity),this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity",this.globalRightIndexTipProximity),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._reflectionMapTexture.dispose(),this._indirectEnvTexture.dispose(),this._blueGradientTexture.dispose(),this._decalTexture.dispose()}clone(t){return q.Clone(()=>new y(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLSliderBarMaterial",t}getClassName(){return"MRDLSliderBarMaterial"}static Parse(t,e,i){return q.Parse(()=>new y(t.name,e),t,e,i)}}y.BLUE_GRADIENT_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png";n([l()],y.prototype,"radius",void 0);n([l()],y.prototype,"bevelFront",void 0);n([l()],y.prototype,"bevelFrontStretch",void 0);n([l()],y.prototype,"bevelBack",void 0);n([l()],y.prototype,"bevelBackStretch",void 0);n([l()],y.prototype,"radiusTopLeft",void 0);n([l()],y.prototype,"radiusTopRight",void 0);n([l()],y.prototype,"radiusBottomLeft",void 0);n([l()],y.prototype,"radiusBottomRight",void 0);n([l()],y.prototype,"bulgeEnabled",void 0);n([l()],y.prototype,"bulgeHeight",void 0);n([l()],y.prototype,"bulgeRadius",void 0);n([l()],y.prototype,"sunIntensity",void 0);n([l()],y.prototype,"sunTheta",void 0);n([l()],y.prototype,"sunPhi",void 0);n([l()],y.prototype,"indirectDiffuse",void 0);n([l()],y.prototype,"albedo",void 0);n([l()],y.prototype,"specular",void 0);n([l()],y.prototype,"shininess",void 0);n([l()],y.prototype,"sharpness",void 0);n([l()],y.prototype,"subsurface",void 0);n([l()],y.prototype,"leftGradientColor",void 0);n([l()],y.prototype,"rightGradientColor",void 0);n([l()],y.prototype,"reflection",void 0);n([l()],y.prototype,"frontReflect",void 0);n([l()],y.prototype,"edgeReflect",void 0);n([l()],y.prototype,"power",void 0);n([l()],y.prototype,"skyColor",void 0);n([l()],y.prototype,"horizonColor",void 0);n([l()],y.prototype,"groundColor",void 0);n([l()],y.prototype,"horizonPower",void 0);n([l()],y.prototype,"width",void 0);n([l()],y.prototype,"fuzz",void 0);n([l()],y.prototype,"minFuzz",void 0);n([l()],y.prototype,"clipFade",void 0);n([l()],y.prototype,"hueShift",void 0);n([l()],y.prototype,"saturationShift",void 0);n([l()],y.prototype,"valueShift",void 0);n([l()],y.prototype,"blobPosition",void 0);n([l()],y.prototype,"blobIntensity",void 0);n([l()],y.prototype,"blobNearSize",void 0);n([l()],y.prototype,"blobFarSize",void 0);n([l()],y.prototype,"blobNearDistance",void 0);n([l()],y.prototype,"blobFarDistance",void 0);n([l()],y.prototype,"blobFadeLength",void 0);n([l()],y.prototype,"blobPulse",void 0);n([l()],y.prototype,"blobFade",void 0);n([l()],y.prototype,"blobPosition2",void 0);n([l()],y.prototype,"blobNearSize2",void 0);n([l()],y.prototype,"blobPulse2",void 0);n([l()],y.prototype,"blobFade2",void 0);n([l()],y.prototype,"blobTexture",void 0);n([l()],y.prototype,"leftIndexPosition",void 0);n([l()],y.prototype,"rightIndexPosition",void 0);n([l()],y.prototype,"leftIndexMiddlePosition",void 0);n([l()],y.prototype,"rightIndexMiddlePosition",void 0);n([l()],y.prototype,"decalScaleXY",void 0);n([l()],y.prototype,"decalFrontOnly",void 0);n([l()],y.prototype,"rimIntensity",void 0);n([l()],y.prototype,"rimHueShift",void 0);n([l()],y.prototype,"rimSaturationShift",void 0);n([l()],y.prototype,"rimValueShift",void 0);n([l()],y.prototype,"iridescenceIntensity",void 0);k("BABYLON.GUI.MRDLSliderBarMaterial",y);const Fo="mrdlSliderThumbPixelShader",No=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform vec4 Global_Left_Index_Middle_Position;
uniform vec4 Global_Right_Index_Middle_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Blob_Fragment_B180(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void FastLinearTosRGB_B192(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Scale_RGB_B209(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Fragment_Main_B271(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{
float theta=Sun_Theta*2.0*3.14159;
float phi=Sun_Phi*3.14159;
vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));
float NdotL=max(dot(lightDir,Normal),0.0);
vec3 R=reflect(Incident,Normal);
float RdotL=max(0.0,dot(R,lightDir));
float specular=pow(RdotL,Shininess);
specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);
vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;
}
void Bulge_B229(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{
vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));
vec3 B=(cross(Normal,Tangent));
float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;
k=sin(k*3.14159*0.5);
k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));
New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;
New_Normal=Enabled ? New_Normal : Normal;
}
void SSS_B227(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{
float NdotI=abs(dot(Normal,Incident));
float BdotI=abs(dot(ButtonN,Incident));
Result=(abs(NdotI-BdotI)); 
}
void FingerOcclusion_B217(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void FingerOcclusion_B218(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void Scale_Color_B241(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void From_HSV_B223(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{
vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);
Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);
Color.a=Alpha;
}
void Fast_Fresnel_B272(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{
float d=max(-dot(Incident,Normal),0.0);
Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(1.0-d,Power);
Transmit=1.0-Reflect;
}
void Mapped_Environment_B201(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{
Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
}
vec4 SampleEnv_Bid200(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{
float k=pow(abs(D.y),exponent);
vec4 C;
if (D.y>0.0) {
C=mix(H,S,k);
} else {
C=mix(H,G,k); 
}
return C;
}
void Sky_Environment_B200(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{
Reflected_Color=SampleEnv_Bid200(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);
Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
}
void Min_Segment_Distance_B215(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{
vec3 u=P1-P0;
vec3 v=Q1-Q0;
vec3 w=P0-Q0;
float a=dot(u,u);
float b=dot(u,v);
float c=dot(v,v);
float d=dot(u,w);
float e=dot(v,w);
float D=a*c-b*b;
float sD=D;
float tD=D;
float sc,sN,tc,tN;
if (D<0.00001) {
sN=0.0;
sD=1.0;
tN=e;
tD=c;
} else {
sN=(b*e-c*d);
tN=(a*e-b*d);
if (sN<0.0) {
sN=0.0;
tN=e;
tD=c;
} else if (sN>sD) {
sN=sD;
tN=e+b;
tD=c;
}
}
if (tN<0.0) {
tN=0.0;
if (-d<0.0) {
sN=0.0;
} else if (-d>a) {
sN=sD;
} else {
sN=-d;
sD=a;
}
} else if (tN>tD) {
tN=tD;
if ((-d+b)<0.0) {
sN=0.0;
} else if ((-d+b)>a) {
sN=sD;
} else {
sN=(-d+b);
sD=a;
}
}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;
tc=abs(tN)<0.000001 ? 0.0 : tN/tD;
NearP=P0+sc*u;
NearQ=Q0+tc*v;
Distance=distance(NearP,NearQ);
}
void To_XYZ_B224(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Finger_Positions_B214(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{
Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);
Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);
Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);
Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);
}
void VaryHSV_B258(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{
HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));
}
void Remap_Range_B264(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void To_HSV_B225(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{
vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);
vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);
vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);
float d=q.x-min(q.w,q.y);
float e=1.0e-10;
Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));
Saturation=d/(q.x+e);
Value=q.x;
Alpha=Color.a;
HSV=vec3(Hue,Saturation,Value);
}
void Code_B260(
float X,
out float Result)
{
Result=(acos(X)/3.14159-0.5)*2.0;
}
void Rim_Light_B282(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{
vec3 R=reflect(Incident,Normal);
float RdotF=dot(R,Front);
float RdotL=sqrt(1.0-RdotF*RdotF);
vec2 UV=vec2(R.y*0.5+0.5,0.5);
vec4 Color=texture(Texture,UV);
Result=Color;
}
void main()
{
vec4 Blob_Color_Q180;
#if BLOB_ENABLE
Blob_Fragment_B180(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q180);
#else
Blob_Color_Q180=vec4(0,0,0,0);
#endif
vec3 Incident_Q189=normalize(vPosition-cameraPosition);
vec3 Normalized_Q188=normalize(vNormal);
vec3 Normalized_Q221=normalize(vTangent);
vec4 Color_Q233;
#if DECAL_ENABLE
Color_Q233=texture(_Decal_,vUV);
#else
Color_Q233=vec4(0,0,0,0);
#endif
float X_Q240;
float Y_Q240;
float Z_Q240;
float W_Q240;
X_Q240=vExtra1.x;
Y_Q240=vExtra1.y;
Z_Q240=vExtra1.z;
W_Q240=vExtra1.w;
vec4 Linear_Q193;
Linear_Q193.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);
Linear_Q193.a=_Sky_Color_.a;
vec4 Linear_Q194;
Linear_Q194.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);
Linear_Q194.a=_Horizon_Color_.a;
vec4 Linear_Q195;
Linear_Q195.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);
Linear_Q195.a=_Ground_Color_.a;
vec3 Left_Index_Q214;
vec3 Right_Index_Q214;
vec3 Left_Index_Middle_Q214;
vec3 Right_Index_Middle_Q214;
Finger_Positions_B214(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q214,Right_Index_Q214,Left_Index_Middle_Q214,Right_Index_Middle_Q214);
vec4 Linear_Q196;
Linear_Q196.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);
Linear_Q196.a=_Albedo_.a;
vec3 Normalized_Q257=normalize(vBinormal);
vec3 Incident_Q220=normalize(vPosition-cameraPosition);
vec3 New_Normal_Q229;
Bulge_B229(_Bulge_Enabled_,Normalized_Q188,Normalized_Q221,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q229);
float Result_Q227;
SSS_B227(vBinormal,New_Normal_Q229,Incident_Q189,Result_Q227);
vec4 Result_Q241;
Scale_Color_B241(Color_Q233,X_Q240,Result_Q241);
float Transmit_Q272;
float Reflect_Q272;
Fast_Fresnel_B272(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q229,Incident_Q189,Transmit_Q272,Reflect_Q272);
float Product_Q275=Y_Q240*Y_Q240;
vec3 NearP_Q215;
vec3 NearQ_Q215;
float Distance_Q215;
Min_Segment_Distance_B215(Left_Index_Q214,Left_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q215,NearQ_Q215,Distance_Q215);
vec3 NearP_Q213;
vec3 NearQ_Q213;
float Distance_Q213;
Min_Segment_Distance_B215(Right_Index_Q214,Right_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q213,NearQ_Q213,Distance_Q213);
vec3 Reflected_Q197=reflect(Incident_Q189,New_Normal_Q229);
vec4 Product_Q253=Linear_Q196*vec4(1,1,1,1);
vec4 Result_Q282;
Rim_Light_B282(Normalized_Q257,Normalized_Q188,Incident_Q220,_Rim_Intensity_,_Rim_Texture_,Result_Q282);
float Dot_Q222=dot(Incident_Q220, Normalized_Q221);
float MaxAB_Q273=max(Reflect_Q272,Product_Q275);
float NotInShadow_Q217;
#if OCCLUSION_ENABLED
FingerOcclusion_B217(_Width_,Distance_Q215,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q215,_Clip_Fade_,NotInShadow_Q217);
#else
NotInShadow_Q217=1.0;
#endif
float NotInShadow_Q218;
#if OCCLUSION_ENABLED
FingerOcclusion_B218(_Width_,Distance_Q213,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q213,_Clip_Fade_,NotInShadow_Q218);
#else
NotInShadow_Q218=1.0;
#endif
vec4 Reflected_Color_Q201;
vec4 Indirect_Diffuse_Q201;
#if ENV_ENABLE
Mapped_Environment_B201(_Reflection_Map_,_Indirect_Environment_,Reflected_Q197,Reflected_Color_Q201,Indirect_Diffuse_Q201);
#else
Reflected_Color_Q201=vec4(0,0,0,1);
Indirect_Diffuse_Q201=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q200;
vec4 Indirect_Color_Q200;
#if SKY_ENABLED
Sky_Environment_B200(New_Normal_Q229,Reflected_Q197,Linear_Q193,Linear_Q194,Linear_Q195,_Horizon_Power_,Reflected_Color_Q200,Indirect_Color_Q200);
#else
Reflected_Color_Q200=vec4(0,0,0,1);
Indirect_Color_Q200=vec4(0,0,0,1);
#endif
float Hue_Q225;
float Saturation_Q225;
float Value_Q225;
float Alpha_Q225;
vec3 HSV_Q225;
To_HSV_B225(Product_Q253,Hue_Q225,Saturation_Q225,Value_Q225,Alpha_Q225,HSV_Q225);
float Hue_Q277;
float Saturation_Q277;
float Value_Q277;
float Alpha_Q277;
vec3 HSV_Q277;
To_HSV_B225(Result_Q282,Hue_Q277,Saturation_Q277,Value_Q277,Alpha_Q277,HSV_Q277);
float Result_Q260;
Code_B260(Dot_Q222,Result_Q260);
float AbsA_Q226=abs(Result_Q260);
float MinAB_Q208=min(NotInShadow_Q217,NotInShadow_Q218);
vec4 Sum_Q198=Reflected_Color_Q201+Reflected_Color_Q200;
vec4 Sum_Q199=Indirect_Diffuse_Q201+Indirect_Color_Q200;
vec3 HSV_Out_Q276;
VaryHSV_B258(HSV_Q277,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q276);
float Out_Q264;
Remap_Range_B264(-1.0,1.0,0.0,1.0,Result_Q260,Out_Q264);
float Product_Q256;
Product_Q256=AbsA_Q226*_Hue_Shift_;
float X_Q278;
float Y_Q278;
float Z_Q278;
To_XYZ_B224(HSV_Out_Q276,X_Q278,Y_Q278,Z_Q278);
vec2 Vec2_Q262=vec2(Out_Q264,0.5);
vec3 HSV_Out_Q258;
VaryHSV_B258(HSV_Q225,Product_Q256,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q258);
vec4 Color_Q279;
From_HSV_B223(X_Q278,Y_Q278,Z_Q278,0.0,Color_Q279);
vec4 Color_Q261;
#if IRIDESCENCE_ENABLED
Color_Q261=texture(_Iridescence_Texture_,Vec2_Q262);
#else
Color_Q261=vec4(0,0,0,0);
#endif
float X_Q224;
float Y_Q224;
float Z_Q224;
To_XYZ_B224(HSV_Out_Q258,X_Q224,Y_Q224,Z_Q224);
vec4 Result_Q281=_Rim_Intensity_*Color_Q279;
vec4 Result_Q263=_Iridescence_Intensity_*Color_Q261;
vec4 Color_Q223;
From_HSV_B223(X_Q224,Y_Q224,Z_Q224,0.0,Color_Q223);
vec4 Result_Q234=Result_Q241+(1.0-Result_Q241.a)*Color_Q223;
vec4 Result_Q271;
Fragment_Main_B271(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q229,Result_Q234,MaxAB_Q273,_Shininess_,Incident_Q189,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q198,Sum_Q199,_Sharpness_,Result_Q227,_Subsurface_,vec4(0,0,0,0),Result_Q281,Result_Q263,Result_Q271);
vec4 Result_Q209;
Scale_RGB_B209(Result_Q271,MinAB_Q208,Result_Q209);
vec4 sRGB_Q192;
FastLinearTosRGB_B192(Result_Q209,sRGB_Q192);
vec4 Result_Q181=Blob_Color_Q180+(1.0-Blob_Color_Q180.a)*sRGB_Q192;
vec4 Result_Q190=Result_Q181; Result_Q190.a=1.0;
vec4 Out_Color=Result_Q190;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[Fo]=No;const Ao="mrdlSliderThumbVertexShader",Lo=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B162(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Object_To_World_Normal_B182(
vec3 Nrm_Object,
out vec3 Nrm_World)
{
Nrm_World=(vec4(Nrm_Object,0.0)).xyz;
}
void Blob_Vertex_B173(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Blob_Vertex_B174(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B280(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
float deltad=(length(delta)*2.0);
float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;
float innerd=clamp(deltad*2.0,0.0,1.0);
float outerd=clamp(deltad*2.0-1.0,0.0,1.0);
float bevelAngle=outerd*3.14159*0.5;
float sinb=sin(bevelAngle);
float cosb=cos(bevelAngle);
float beveld=(1.0-f)*innerd+f*sinb;
float br=outerd;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
float dir=P.z<0.0001 ? 1.0 : -1.0;
New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);
New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);
Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);
Radial_Dir=vec3(delta*r2,0.0);
vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);
New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;
}
void Object_To_World_Dir_B210(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{
Normal_World=(world*vec4(Dir_Object,0.0)).xyz;
Normal_Length=length(Normal_World);
Normal_World_N=Normal_World/Normal_Length;
}
void To_XYZ_B228(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Conditional_Float_B243(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Object_To_World_Dir_B178(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void Pick_Radius_B219(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Conditional_Float_B186(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Greater_Than_B187(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{
Greater_Than=Left>Right;
Not_Greater_Than=!Greater_Than;
}
void Remap_Range_B255(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void main()
{
vec2 XY_Q235;
XY_Q235=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);
vec3 Tangent_World_Q177;
vec3 Tangent_World_N_Q177;
float Tangent_Length_Q177;
Tangent_World_Q177=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q177=length(Tangent_World_Q177);
Tangent_World_N_Q177=Tangent_World_Q177/Tangent_Length_Q177;
vec3 Normal_World_Q210;
vec3 Normal_World_N_Q210;
float Normal_Length_Q210;
Object_To_World_Dir_B210(vec3(0,0,1),Normal_World_Q210,Normal_World_N_Q210,Normal_Length_Q210);
float X_Q228;
float Y_Q228;
float Z_Q228;
To_XYZ_B228(position,X_Q228,Y_Q228,Z_Q228);
vec3 Nrm_World_Q176;
Nrm_World_Q176=normalize((world*vec4(normal,0.0)).xyz);
vec3 Binormal_World_Q178;
vec3 Binormal_World_N_Q178;
float Binormal_Length_Q178;
Object_To_World_Dir_B178(vec3(0,1,0),Binormal_World_Q178,Binormal_World_N_Q178,Binormal_Length_Q178);
float Anisotropy_Q179=Tangent_Length_Q177/Binormal_Length_Q178;
float Result_Q219;
Pick_Radius_B219(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q219);
float Anisotropy_Q203=Binormal_Length_Q178/Normal_Length_Q210;
bool Not_Greater_Than_Q187;
bool Greater_Than_Q187;
Greater_Than_B187(Z_Q228,0.0,Not_Greater_Than_Q187,Greater_Than_Q187);
vec4 Linear_Q251;
Linear_Q251.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);
Linear_Q251.a=_Left_Color_.a;
vec4 Linear_Q252;
Linear_Q252.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);
Linear_Q252.a=_Right_Color_.a;
vec3 Difference_Q211=vec3(0,0,0)-Normal_World_N_Q210;
vec4 Out_Color_Q184=vec4(X_Q228,Y_Q228,Z_Q228,1);
float Result_Q186;
Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_,_Bevel_Front_,Result_Q186);
float Result_Q244;
Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q244);
vec3 New_P_Q280;
vec2 New_UV_Q280;
float Radial_Gradient_Q280;
vec3 Radial_Dir_Q280;
vec3 New_Normal_Q280;
Move_Verts_B280(Anisotropy_Q179,position,Result_Q219,Result_Q186,normal,Anisotropy_Q203,Result_Q244,New_P_Q280,New_UV_Q280,Radial_Gradient_Q280,Radial_Dir_Q280,New_Normal_Q280);
float X_Q248;
float Y_Q248;
X_Q248=New_UV_Q280.x;
Y_Q248=New_UV_Q280.y;
vec3 Pos_World_Q162;
Object_To_World_Pos_B162(New_P_Q280,Pos_World_Q162);
vec3 Nrm_World_Q182;
Object_To_World_Normal_B182(New_Normal_Q280,Nrm_World_Q182);
vec4 Blob_Info_Q173;
#if BLOB_ENABLE
Blob_Vertex_B173(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q173);
#else
Blob_Info_Q173=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q174;
#if BLOB_ENABLE_2
Blob_Vertex_B174(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q174);
#else
Blob_Info_Q174=vec4(0,0,0,0);
#endif
float Out_Q255;
Remap_Range_B255(0.0,1.0,0.0,1.0,X_Q248,Out_Q255);
float X_Q236;
float Y_Q236;
float Z_Q236;
To_XYZ_B228(Nrm_World_Q182,X_Q236,Y_Q236,Z_Q236);
vec4 Color_At_T_Q247=mix(Linear_Q251,Linear_Q252,Out_Q255);
float Minus_F_Q237=-Z_Q236;
float R_Q249;
float G_Q249;
float B_Q249;
float A_Q249;
R_Q249=Color_At_T_Q247.r; G_Q249=Color_At_T_Q247.g; B_Q249=Color_At_T_Q247.b; A_Q249=Color_At_T_Q247.a;
float ClampF_Q238=clamp(0.0,Minus_F_Q237,1.0);
float Result_Q243;
Conditional_Float_B243(_Decal_Front_Only_,ClampF_Q238,1.0,Result_Q243);
vec4 Vec4_Q239=vec4(Result_Q243,Radial_Gradient_Q280,G_Q249,B_Q249);
vec3 Position=Pos_World_Q162;
vec3 Normal=Nrm_World_Q182;
vec2 UV=XY_Q235;
vec3 Tangent=Tangent_World_N_Q177;
vec3 Binormal=Difference_Q211;
vec4 Color=Out_Color_Q184;
vec4 Extra1=Vec4_Q239;
vec4 Extra2=Blob_Info_Q173;
vec4 Extra3=Blob_Info_Q174;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;ot.ShadersStore[Ao]=Lo;class ko extends le{constructor(){super(),this.SKY_ENABLED=!0,this.BLOB_ENABLE_2=!0,this.IRIDESCENCE_ENABLED=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class T extends _e{constructor(t,e){super(t,e),this.radius=.157,this.bevelFront=.065,this.bevelFrontStretch=.077,this.bevelBack=.031,this.bevelBackStretch=0,this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this.bulgeEnabled=!1,this.bulgeHeight=-.323,this.bulgeRadius=.73,this.sunIntensity=2,this.sunTheta=.937,this.sunPhi=.555,this.indirectDiffuse=1,this.albedo=new z(.0117647,.505882,.996078,1),this.specular=0,this.shininess=10,this.sharpness=0,this.subsurface=.31,this.leftGradientColor=new z(.0117647,.505882,.996078,1),this.rightGradientColor=new z(.0117647,.505882,.996078,1),this.reflection=.749,this.frontReflect=0,this.edgeReflect=.09,this.power=8.1,this.skyColor=new z(.0117647,.960784,.996078,1),this.horizonColor=new z(.0117647,.333333,.996078,1),this.groundColor=new z(0,.254902,.996078,1),this.horizonPower=1,this.width=.02,this.fuzz=.5,this.minFuzz=.001,this.clipFade=.01,this.hueShift=0,this.saturationShift=0,this.valueShift=0,this.blobPosition=new c(0,0,.1),this.blobIntensity=.5,this.blobNearSize=.01,this.blobFarSize=.03,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.576,this.blobPulse=0,this.blobFade=1,this.blobPosition2=new c(.2,0,.1),this.blobNearSize2=.01,this.blobPulse2=0,this.blobFade2=1,this.blobTexture=new V("",this.getScene()),this.leftIndexPosition=new c(0,0,1),this.rightIndexPosition=new c(-1,-1,-1),this.leftIndexMiddlePosition=new c(0,0,0),this.rightIndexMiddlePosition=new c(0,0,0),this.decalScaleXY=new K(1.5,1.5),this.decalFrontOnly=!0,this.rimIntensity=.287,this.rimHueShift=0,this.rimSaturationShift=0,this.rimValueShift=-1,this.iridescenceIntensity=0,this.useGlobalLeftIndex=1,this.useGlobalRightIndex=1,this.globalLeftIndexTipProximity=0,this.globalRightIndexTipProximity=0,this.globalLeftIndexTipPosition=new lt(.5,0,-.55,1),this.globaRightIndexTipPosition=new lt(0,0,0,1),this.globalLeftThumbTipPosition=new lt(.5,0,-.55,1),this.globalRightThumbTipPosition=new lt(0,0,0,1),this.globalLeftIndexMiddlePosition=new lt(.5,0,-.55,1),this.globalRightIndexMiddlePosition=new lt(0,0,0,1),this.alphaMode=Gt.ALPHA_DISABLE,this.backFaceCulling=!1,this._blueGradientTexture=new V(T.BLUE_GRADIENT_TEXTURE_URL,e,!0,!1,V.NEAREST_SAMPLINGMODE),this._decalTexture=new V("",this.getScene()),this._reflectionMapTexture=new V("",this.getScene()),this._indirectEnvTexture=new V("",this.getScene())}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new ko);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlSliderThumb",h=i.toString(),d=["world","viewProjection","cameraPosition","_Radius_","_Bevel_Front_","_Bevel_Front_Stretch_","_Bevel_Back_","_Bevel_Back_Stretch_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Bulge_Enabled_","_Bulge_Height_","_Bulge_Radius_","_Sun_Intensity_","_Sun_Theta_","_Sun_Phi_","_Indirect_Diffuse_","_Albedo_","_Specular_","_Shininess_","_Sharpness_","_Subsurface_","_Left_Color_","_Right_Color_","_Reflection_","_Front_Reflect_","_Edge_Reflect_","_Power_","_Sky_Color_","_Horizon_Color_","_Ground_Color_","_Horizon_Power_","_Reflection_Map_","_Indirect_Environment_","_Width_","_Fuzz_","_Min_Fuzz_","_Clip_Fade_","_Hue_Shift_","_Saturation_Shift_","_Value_Shift_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Left_Index_Pos_","_Right_Index_Pos_","_Left_Index_Middle_Pos_","_Right_Index_Middle_Pos_","_Decal_","_Decal_Scale_XY_","_Decal_Front_Only_","_Rim_Intensity_","_Rim_Texture_","_Rim_Hue_Shift_","_Rim_Saturation_Shift_","_Rim_Value_Shift_","_Iridescence_Intensity_","_Iridescence_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Middle_Position;","Global_Right_Index_Middle_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],u=["_Rim_Texture_","_Iridescence_Texture_"],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){if(!i.materialDefines)return;const o=i.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Bevel_Front_",this.bevelFront),this._activeEffect.setFloat("_Bevel_Front_Stretch_",this.bevelFrontStretch),this._activeEffect.setFloat("_Bevel_Back_",this.bevelBack),this._activeEffect.setFloat("_Bevel_Back_Stretch_",this.bevelBackStretch),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Bulge_Enabled_",this.bulgeEnabled?1:0),this._activeEffect.setFloat("_Bulge_Height_",this.bulgeHeight),this._activeEffect.setFloat("_Bulge_Radius_",this.bulgeRadius),this._activeEffect.setFloat("_Sun_Intensity_",this.sunIntensity),this._activeEffect.setFloat("_Sun_Theta_",this.sunTheta),this._activeEffect.setFloat("_Sun_Phi_",this.sunPhi),this._activeEffect.setFloat("_Indirect_Diffuse_",this.indirectDiffuse),this._activeEffect.setDirectColor4("_Albedo_",this.albedo),this._activeEffect.setFloat("_Specular_",this.specular),this._activeEffect.setFloat("_Shininess_",this.shininess),this._activeEffect.setFloat("_Sharpness_",this.sharpness),this._activeEffect.setFloat("_Subsurface_",this.subsurface),this._activeEffect.setDirectColor4("_Left_Color_",this.leftGradientColor),this._activeEffect.setDirectColor4("_Right_Color_",this.rightGradientColor),this._activeEffect.setFloat("_Reflection_",this.reflection),this._activeEffect.setFloat("_Front_Reflect_",this.frontReflect),this._activeEffect.setFloat("_Edge_Reflect_",this.edgeReflect),this._activeEffect.setFloat("_Power_",this.power),this._activeEffect.setDirectColor4("_Sky_Color_",this.skyColor),this._activeEffect.setDirectColor4("_Horizon_Color_",this.horizonColor),this._activeEffect.setDirectColor4("_Ground_Color_",this.groundColor),this._activeEffect.setFloat("_Horizon_Power_",this.horizonPower),this._activeEffect.setTexture("_Reflection_Map_",this._reflectionMapTexture),this._activeEffect.setTexture("_Indirect_Environment_",this._indirectEnvTexture),this._activeEffect.setFloat("_Width_",this.width),this._activeEffect.setFloat("_Fuzz_",this.fuzz),this._activeEffect.setFloat("_Min_Fuzz_",this.minFuzz),this._activeEffect.setFloat("_Clip_Fade_",this.clipFade),this._activeEffect.setFloat("_Hue_Shift_",this.hueShift),this._activeEffect.setFloat("_Saturation_Shift_",this.saturationShift),this._activeEffect.setFloat("_Value_Shift_",this.valueShift),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this.blobTexture),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setVector3("_Left_Index_Pos_",this.leftIndexPosition),this._activeEffect.setVector3("_Right_Index_Pos_",this.rightIndexPosition),this._activeEffect.setVector3("_Left_Index_Middle_Pos_",this.leftIndexMiddlePosition),this._activeEffect.setVector3("_Right_Index_Middle_Pos_",this.rightIndexMiddlePosition),this._activeEffect.setTexture("_Decal_",this._decalTexture),this._activeEffect.setVector2("_Decal_Scale_XY_",this.decalScaleXY),this._activeEffect.setFloat("_Decal_Front_Only_",this.decalFrontOnly?1:0),this._activeEffect.setFloat("_Rim_Intensity_",this.rimIntensity),this._activeEffect.setTexture("_Rim_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("_Rim_Hue_Shift_",this.rimHueShift),this._activeEffect.setFloat("_Rim_Saturation_Shift_",this.rimSaturationShift),this._activeEffect.setFloat("_Rim_Value_Shift_",this.rimValueShift),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setTexture("_Iridescence_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("Use_Global_Left_Index",this.useGlobalLeftIndex),this._activeEffect.setFloat("Use_Global_Right_Index",this.useGlobalRightIndex),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this.globalLeftIndexTipPosition),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this.globaRightIndexTipPosition),this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position",this.globalLeftThumbTipPosition),this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position",this.globalRightThumbTipPosition),this._activeEffect.setVector4("Global_Left_Index_Middle_Position",this.globalLeftIndexMiddlePosition),this._activeEffect.setVector4("Global_Right_Index_Middle_Position",this.globalRightIndexMiddlePosition),this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity",this.globalLeftIndexTipProximity),this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity",this.globalRightIndexTipProximity),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._reflectionMapTexture.dispose(),this._indirectEnvTexture.dispose(),this._blueGradientTexture.dispose(),this._decalTexture.dispose()}clone(t){return q.Clone(()=>new T(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLSliderThumbMaterial",t}getClassName(){return"MRDLSliderThumbMaterial"}static Parse(t,e,i){return q.Parse(()=>new T(t.name,e),t,e,i)}}T.BLUE_GRADIENT_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png";n([l()],T.prototype,"radius",void 0);n([l()],T.prototype,"bevelFront",void 0);n([l()],T.prototype,"bevelFrontStretch",void 0);n([l()],T.prototype,"bevelBack",void 0);n([l()],T.prototype,"bevelBackStretch",void 0);n([l()],T.prototype,"radiusTopLeft",void 0);n([l()],T.prototype,"radiusTopRight",void 0);n([l()],T.prototype,"radiusBottomLeft",void 0);n([l()],T.prototype,"radiusBottomRight",void 0);n([l()],T.prototype,"bulgeEnabled",void 0);n([l()],T.prototype,"bulgeHeight",void 0);n([l()],T.prototype,"bulgeRadius",void 0);n([l()],T.prototype,"sunIntensity",void 0);n([l()],T.prototype,"sunTheta",void 0);n([l()],T.prototype,"sunPhi",void 0);n([l()],T.prototype,"indirectDiffuse",void 0);n([l()],T.prototype,"albedo",void 0);n([l()],T.prototype,"specular",void 0);n([l()],T.prototype,"shininess",void 0);n([l()],T.prototype,"sharpness",void 0);n([l()],T.prototype,"subsurface",void 0);n([l()],T.prototype,"leftGradientColor",void 0);n([l()],T.prototype,"rightGradientColor",void 0);n([l()],T.prototype,"reflection",void 0);n([l()],T.prototype,"frontReflect",void 0);n([l()],T.prototype,"edgeReflect",void 0);n([l()],T.prototype,"power",void 0);n([l()],T.prototype,"skyColor",void 0);n([l()],T.prototype,"horizonColor",void 0);n([l()],T.prototype,"groundColor",void 0);n([l()],T.prototype,"horizonPower",void 0);n([l()],T.prototype,"width",void 0);n([l()],T.prototype,"fuzz",void 0);n([l()],T.prototype,"minFuzz",void 0);n([l()],T.prototype,"clipFade",void 0);n([l()],T.prototype,"hueShift",void 0);n([l()],T.prototype,"saturationShift",void 0);n([l()],T.prototype,"valueShift",void 0);n([l()],T.prototype,"blobPosition",void 0);n([l()],T.prototype,"blobIntensity",void 0);n([l()],T.prototype,"blobNearSize",void 0);n([l()],T.prototype,"blobFarSize",void 0);n([l()],T.prototype,"blobNearDistance",void 0);n([l()],T.prototype,"blobFarDistance",void 0);n([l()],T.prototype,"blobFadeLength",void 0);n([l()],T.prototype,"blobPulse",void 0);n([l()],T.prototype,"blobFade",void 0);n([l()],T.prototype,"blobPosition2",void 0);n([l()],T.prototype,"blobNearSize2",void 0);n([l()],T.prototype,"blobPulse2",void 0);n([l()],T.prototype,"blobFade2",void 0);n([l()],T.prototype,"blobTexture",void 0);n([l()],T.prototype,"leftIndexPosition",void 0);n([l()],T.prototype,"rightIndexPosition",void 0);n([l()],T.prototype,"leftIndexMiddlePosition",void 0);n([l()],T.prototype,"rightIndexMiddlePosition",void 0);n([l()],T.prototype,"decalScaleXY",void 0);n([l()],T.prototype,"decalFrontOnly",void 0);n([l()],T.prototype,"rimIntensity",void 0);n([l()],T.prototype,"rimHueShift",void 0);n([l()],T.prototype,"rimSaturationShift",void 0);n([l()],T.prototype,"rimValueShift",void 0);n([l()],T.prototype,"iridescenceIntensity",void 0);k("BABYLON.GUI.MRDLSliderThumbMaterial",T);const Qo="mrdlBackplatePixelShader",Vo=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vExtra1;
varying vec4 vExtra2;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform vec4 _Iridescence_Tint_;
uniform sampler2D _Iridescent_Map_;
uniform float _Angle_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform vec4 _Gradient_Color_;
uniform vec4 _Top_Left_;
uniform vec4 _Top_Right_;
uniform vec4 _Bottom_Left_;
uniform vec4 _Bottom_Right_;
uniform float _Edge_Width_;
uniform float _Edge_Power_;
uniform float _Line_Gradient_Blend_;
uniform float _Fade_Out_;
void FastLinearTosRGB_B353(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Round_Rect_Fragment_B332(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{
float d=length(max(abs(UV)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
float g=min(Rect_Parms.z,Rect_Parms.w);
float dgrad=max(fwidth(g)*Filter_Width,0.00001);
float Inside_Rect=clamp(g/dgrad,0.0,1.0);
float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);
Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;
}
void Iridescence_B343(
vec3 Position,
vec3 Normal,
vec2 UV,
vec3 Axis,
vec3 Eye,
vec4 Tint,
sampler2D Texture,
bool Reflected,
float Frequency,
float Vertical_Offset,
out vec4 Color)
{
vec3 i=normalize(Position-Eye);
vec3 r=reflect(i,Normal);
float idota=dot(i,Axis);
float idotr=dot(i,r);
float x=Reflected ? idotr : idota;
vec2 xy;
xy.x=fract((x*Frequency+1.0)*0.5+UV.y*Vertical_Offset);
xy.y=0.5;
Color=texture(Texture,xy);
Color.rgb*=Tint.rgb;
}
void Scale_RGB_B346(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Scale_RGB_B344(
float Scalar,
vec4 Color,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Line_Fragment_B362(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{
float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);
Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);
}
void Edge_B356(
vec4 RectParms,
float Radius,
float Line_Width,
vec2 UV,
float Edge_Width,
float Edge_Power,
out float Result)
{
float d=length(max(abs(UV)-RectParms.xy,0.0));
float edge=1.0-clamp((1.0-d/(Radius-Line_Width))/Edge_Width,0.0,1.0);
Result=pow(edge,Edge_Power);
}
void Gradient_B355(
vec4 Gradient_Color,
vec4 Top_Left,
vec4 Top_Right,
vec4 Bottom_Left,
vec4 Bottom_Right,
vec2 UV,
out vec4 Result)
{
vec3 top=Top_Left.rgb+(Top_Right.rgb-Top_Left.rgb)*UV.x;
vec3 bottom=Bottom_Left.rgb+(Bottom_Right.rgb-Bottom_Left.rgb)*UV.x;
Result.rgb=Gradient_Color.rgb*(bottom+(top-bottom)*UV.y);
Result.a=1.0;
}
void main()
{
float X_Q338;
float Y_Q338;
float Z_Q338;
float W_Q338;
X_Q338=vExtra2.x;
Y_Q338=vExtra2.y;
Z_Q338=vExtra2.z;
W_Q338=vExtra2.w;
vec4 Color_Q343;
#if IRIDESCENCE_ENABLE
Iridescence_B343(vPosition,vNormal,vUV,vBinormal,cameraPosition,_Iridescence_Tint_,_Iridescent_Map_,_Reflected_,_Frequency_,_Vertical_Offset_,Color_Q343);
#else
Color_Q343=vec4(0,0,0,0);
#endif
vec4 Result_Q344;
Scale_RGB_B344(_Iridescence_Intensity_,Color_Q343,Result_Q344);
vec4 Line_Color_Q362;
Line_Fragment_B362(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q362);
float Result_Q356;
#if EDGE_ONLY
Edge_B356(vExtra1,Z_Q338,W_Q338,vUV,_Edge_Width_,_Edge_Power_,Result_Q356);
#else
Result_Q356=1.0;
#endif
vec2 Vec2_Q339=vec2(X_Q338,Y_Q338);
vec4 Result_Q355;
Gradient_B355(_Gradient_Color_,_Top_Left_,_Top_Right_,_Bottom_Left_,_Bottom_Right_,Vec2_Q339,Result_Q355);
vec4 Linear_Q348;
Linear_Q348.rgb=clamp(Result_Q355.rgb*Result_Q355.rgb,0.0,1.0);
Linear_Q348.a=Result_Q355.a;
vec4 Result_Q346;
Scale_RGB_B346(Linear_Q348,Result_Q356,Result_Q346);
vec4 Sum_Q345=Result_Q346+Result_Q344;
vec4 Color_At_T_Q347=mix(Line_Color_Q362,Result_Q346,_Line_Gradient_Blend_);
vec4 Base_And_Iridescent_Q350;
Base_And_Iridescent_Q350=_Base_Color_+vec4(Sum_Q345.rgb,0.0);
vec4 Sum_Q349=Color_At_T_Q347+_Iridescence_Edge_Intensity_*Color_Q343;
vec4 Result_Q351=Sum_Q349; Result_Q351.a=1.0;
vec4 Color_Q332;
Round_Rect_Fragment_B332(Z_Q338,W_Q338,Result_Q351,_Filter_Width_,vUV,1.0,vExtra1,Base_And_Iridescent_Q350,Color_Q332);
vec4 Result_Q354=_Fade_Out_*Color_Q332;
vec4 sRGB_Q353;
FastLinearTosRGB_B353(Result_Q354,sRGB_Q353);
vec4 Out_Color=sRGB_Q353;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[Qo]=Vo;const zo="mrdlBackplateVertexShader",Ho=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec3 tangent;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform vec4 _Iridescence_Tint_;
uniform sampler2D _Iridescent_Map_;
uniform float _Angle_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform vec4 _Gradient_Color_;
uniform vec4 _Top_Left_;
uniform vec4 _Top_Right_;
uniform vec4 _Bottom_Left_;
uniform vec4 _Bottom_Right_;
uniform float _Edge_Width_;
uniform float _Edge_Power_;
uniform float _Line_Gradient_Blend_;
uniform float _Fade_Out_;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vExtra1;
varying vec4 vExtra2;
void Object_To_World_Pos_B314(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Round_Rect_Vertex_B357(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
vec3 Normal,
vec4 Color_Scale_Translate,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV,
out vec2 Color_UV_Info)
{
Scale_XY=vec2(Anisotropy,1.0);
Line_UV=(UV-vec2(0.5,0.5));
Rect_UV=Line_UV*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);
Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;
Color_UV_Info=(Line_UV+vec2(0.5,0.5))*Color_Scale_Translate.xy+Color_Scale_Translate.zw;
}
void Line_Vertex_B333(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{
float angle2=(Rate*Time)*2.0*3.1416;
float sinAngle2=sin(angle2);
float cosAngle2=cos(angle2);
vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;
Line_Vertex.x=0.0;
Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;
Line_Vertex.z=0.0; 
}
void PickDir_B334(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{
float a=Degrees*3.14159/180.0;
Dir=cos(a)*DirX+sin(a)*DirY;
}
void Move_Verts_B327(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
New_UV=center+r2*(UV-2.0*center+0.5);
New_P=vec3(New_UV-0.5,P.z);
Radial_Gradient=1.0-length(delta)*2.0;
Radial_Dir=vec3(delta*r2,0.0);
}
void Pick_Radius_B336(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Edge_AA_Vertex_B328(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{
vec3 I=(Eye-Position_World);
vec3 T=(vec4(Tangent,0.0)).xyz;
float g=(dot(T,I)<0.0) ? 0.0 : 1.0;
if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;
Gradient2=Position_Object.z>0.0 ? 1.0 : g;
} else {
Gradient1=g+(1.0-g)*(Radial_Gradient);
Gradient2=1.0;
}
}
void Object_To_World_Dir_B330(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void RelativeOrAbsoluteDetail_B341(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{
float scale=Absolute_Measurements ? 1.0/Height : 1.0;
Radius=Nominal_Radius*scale;
Line_Width=Nominal_LineWidth*scale;
}
void main()
{
vec3 Nrm_World_Q326;
Nrm_World_Q326=normalize((world*vec4(normal,0.0)).xyz);
vec3 Tangent_World_Q329;
vec3 Tangent_World_N_Q329;
float Tangent_Length_Q329;
Tangent_World_Q329=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q329=length(Tangent_World_Q329);
Tangent_World_N_Q329=Tangent_World_Q329/Tangent_Length_Q329;
vec3 Binormal_World_Q330;
vec3 Binormal_World_N_Q330;
float Binormal_Length_Q330;
Object_To_World_Dir_B330(vec3(0,1,0),Binormal_World_Q330,Binormal_World_N_Q330,Binormal_Length_Q330);
float Radius_Q341;
float Line_Width_Q341;
RelativeOrAbsoluteDetail_B341(_Radius_,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q330,Radius_Q341,Line_Width_Q341);
vec3 Dir_Q334;
PickDir_B334(_Angle_,Tangent_World_N_Q329,Binormal_World_N_Q330,Dir_Q334);
float Result_Q336;
Pick_Radius_B336(Radius_Q341,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q336);
float Anisotropy_Q331=Tangent_Length_Q329/Binormal_Length_Q330;
vec4 Out_Color_Q337=vec4(Result_Q336,Line_Width_Q341,0,1);
vec3 New_P_Q327;
vec2 New_UV_Q327;
float Radial_Gradient_Q327;
vec3 Radial_Dir_Q327;
Move_Verts_B327(Anisotropy_Q331,position,Result_Q336,New_P_Q327,New_UV_Q327,Radial_Gradient_Q327,Radial_Dir_Q327);
vec3 Pos_World_Q314;
Object_To_World_Pos_B314(New_P_Q327,Pos_World_Q314);
float Gradient1_Q328;
float Gradient2_Q328;
#if SMOOTH_EDGES
Edge_AA_Vertex_B328(Pos_World_Q314,position,normal,cameraPosition,Radial_Gradient_Q327,Radial_Dir_Q327,tangent,Gradient1_Q328,Gradient2_Q328);
#else
Gradient1_Q328=1.0;
Gradient2_Q328=1.0;
#endif
vec2 Rect_UV_Q357;
vec4 Rect_Parms_Q357;
vec2 Scale_XY_Q357;
vec2 Line_UV_Q357;
vec2 Color_UV_Info_Q357;
Round_Rect_Vertex_B357(New_UV_Q327,Result_Q336,0.0,Anisotropy_Q331,Gradient1_Q328,Gradient2_Q328,normal,vec4(1,1,0,0),Rect_UV_Q357,Rect_Parms_Q357,Scale_XY_Q357,Line_UV_Q357,Color_UV_Info_Q357);
vec3 Line_Vertex_Q333;
Line_Vertex_B333(Scale_XY_Q357,Line_UV_Q357,(20.0),_Rate_,_Highlight_Transform_,Line_Vertex_Q333);
float X_Q359;
float Y_Q359;
X_Q359=Color_UV_Info_Q357.x;
Y_Q359=Color_UV_Info_Q357.y;
vec4 Vec4_Q358=vec4(X_Q359,Y_Q359,Result_Q336,Line_Width_Q341);
vec3 Position=Pos_World_Q314;
vec3 Normal=Nrm_World_Q326;
vec2 UV=Rect_UV_Q357;
vec3 Tangent=Line_Vertex_Q333;
vec3 Binormal=Dir_Q334;
vec4 Color=Out_Color_Q337;
vec4 Extra1=Rect_Parms_Q357;
vec4 Extra2=Vec4_Q358;
vec4 Extra3=vec4(0,0,0,0);
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vExtra1=Extra1;
vExtra2=Extra2;
}`;ot.ShadersStore[zo]=Ho;class Wo extends le{constructor(){super(),this.IRIDESCENCE_ENABLE=!0,this.SMOOTH_EDGES=!0,this._needNormals=!0,this.rebuild()}}class Y extends _e{constructor(t,e){super(t,e),this.radius=.3,this.lineWidth=.003,this.absoluteSizes=!1,this._filterWidth=1,this.baseColor=new z(0,0,0,1),this.lineColor=new z(.2,.262745,.4,1),this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this._rate=0,this.highlightColor=new z(.239216,.435294,.827451,1),this.highlightWidth=0,this._highlightTransform=new lt(1,1,0,0),this._highlight=1,this.iridescenceIntensity=.45,this.iridescenceEdgeIntensity=1,this.iridescenceTint=new z(1,1,1,1),this._angle=-45,this.fadeOut=1,this._reflected=!0,this._frequency=1,this._verticalOffset=0,this.gradientColor=new z(.74902,.74902,.74902,1),this.topLeftGradientColor=new z(.00784314,.294118,.580392,1),this.topRightGradientColor=new z(.305882,0,1,1),this.bottomLeftGradientColor=new z(.133333,.258824,.992157,1),this.bottomRightGradientColor=new z(.176471,.176471,.619608,1),this.edgeWidth=.5,this.edgePower=1,this.edgeLineGradientBlend=.5,this.alphaMode=Gt.ALPHA_DISABLE,this.backFaceCulling=!1,this._iridescentMapTexture=new V(Y.IRIDESCENT_MAP_TEXTURE_URL,this.getScene(),!0,!1,V.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new Wo);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlBackplate",h=i.toString(),d=["world","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Absolute_Sizes_","_Filter_Width_","_Base_Color_","_Line_Color_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Rate_","_Highlight_Color_","_Highlight_Width_","_Highlight_Transform_","_Highlight_","_Iridescence_Intensity_","_Iridescence_Edge_Intensity_","_Iridescence_Tint_","_Iridescent_Map_","_Angle_","_Reflected_","_Frequency_","_Vertical_Offset_","_Gradient_Color_","_Top_Left_","_Top_Right_","_Bottom_Left_","_Bottom_Right_","_Edge_Width_","_Edge_Power_","_Line_Gradient_Blend_","_Fade_Out_"],u=["_Iridescent_Map_"],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){if(!i.materialDefines)return;const o=i.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Base_Color_",this.baseColor),this._activeEffect.setDirectColor4("_Line_Color_",this.lineColor),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Rate_",this._rate),this._activeEffect.setDirectColor4("_Highlight_Color_",this.highlightColor),this._activeEffect.setFloat("_Highlight_Width_",this.highlightWidth),this._activeEffect.setVector4("_Highlight_Transform_",this._highlightTransform),this._activeEffect.setFloat("_Highlight_",this._highlight),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setFloat("_Iridescence_Edge_Intensity_",this.iridescenceEdgeIntensity),this._activeEffect.setDirectColor4("_Iridescence_Tint_",this.iridescenceTint),this._activeEffect.setTexture("_Iridescent_Map_",this._iridescentMapTexture),this._activeEffect.setFloat("_Angle_",this._angle),this._activeEffect.setFloat("_Reflected_",this._reflected?1:0),this._activeEffect.setFloat("_Frequency_",this._frequency),this._activeEffect.setFloat("_Vertical_Offset_",this._verticalOffset),this._activeEffect.setDirectColor4("_Gradient_Color_",this.gradientColor),this._activeEffect.setDirectColor4("_Top_Left_",this.topLeftGradientColor),this._activeEffect.setDirectColor4("_Top_Right_",this.topRightGradientColor),this._activeEffect.setDirectColor4("_Bottom_Left_",this.bottomLeftGradientColor),this._activeEffect.setDirectColor4("_Bottom_Right_",this.bottomRightGradientColor),this._activeEffect.setFloat("_Edge_Width_",this.edgeWidth),this._activeEffect.setFloat("_Edge_Power_",this.edgePower),this._activeEffect.setFloat("_Line_Gradient_Blend_",this.edgeLineGradientBlend),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new Y(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLBackplateMaterial",t}getClassName(){return"MRDLBackplateMaterial"}static Parse(t,e,i){return q.Parse(()=>new Y(t.name,e),t,e,i)}}Y.IRIDESCENT_MAP_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-backplate-iridescence.png";n([l()],Y.prototype,"radius",void 0);n([l()],Y.prototype,"lineWidth",void 0);n([l()],Y.prototype,"absoluteSizes",void 0);n([l()],Y.prototype,"baseColor",void 0);n([l()],Y.prototype,"lineColor",void 0);n([l()],Y.prototype,"radiusTopLeft",void 0);n([l()],Y.prototype,"radiusTopRight",void 0);n([l()],Y.prototype,"radiusBottomLeft",void 0);n([l()],Y.prototype,"radiusBottomRight",void 0);n([l()],Y.prototype,"highlightColor",void 0);n([l()],Y.prototype,"highlightWidth",void 0);n([l()],Y.prototype,"iridescenceIntensity",void 0);n([l()],Y.prototype,"iridescenceEdgeIntensity",void 0);n([l()],Y.prototype,"iridescenceTint",void 0);n([l()],Y.prototype,"fadeOut",void 0);n([l()],Y.prototype,"gradientColor",void 0);n([l()],Y.prototype,"topLeftGradientColor",void 0);n([l()],Y.prototype,"topRightGradientColor",void 0);n([l()],Y.prototype,"bottomLeftGradientColor",void 0);n([l()],Y.prototype,"bottomRightGradientColor",void 0);n([l()],Y.prototype,"edgeWidth",void 0);n([l()],Y.prototype,"edgePower",void 0);n([l()],Y.prototype,"edgeLineGradientBlend",void 0);k("BABYLON.GUI.MRDLBackplateMaterial",Y);const is=0,Go=100,Uo=50,ss=0,Ni=1,Yo=.2;class ni extends yi{constructor(t,e){super(t),this.onValueChangedObservable=new x,this._sliderBackplateVisible=e||!1,this._minimum=is,this._maximum=Go,this._step=ss,this._value=Uo}get mesh(){return this.node?this._sliderThumb:null}get minimum(){return this._minimum}set minimum(t){this._minimum!==t&&(this._minimum=Math.max(t,is),this._value=Math.max(Math.min(this._value,this._maximum),this._minimum))}get maximum(){return this._maximum}set maximum(t){this._maximum!==t&&(this._maximum=Math.max(t,this._minimum),this._value=Math.max(Math.min(this._value,this._maximum),this._minimum))}get step(){return this._step}set step(t){this._step!==t&&(this._step=Math.max(Math.min(t,this._maximum-this._minimum),ss))}get value(){return this._value}set value(t){this._value!==t&&(this._value=Math.max(Math.min(t,this._maximum),this._minimum),this._sliderThumb&&(this._sliderThumb.position.x=this._convertToPosition(this.value)),this.onValueChangedObservable.notifyObservers(this._value))}get start(){return this.node?this._sliderBar.position.x-this._sliderBar.scaling.x/2:-Ni/2}get end(){return this.node?this._sliderBar.position.x+this._sliderBar.scaling.x/2:Ni/2}get sliderBarMaterial(){return this._sliderBarMaterial}get sliderThumbMaterial(){return this._sliderThumbMaterial}get sliderBackplateMaterial(){return this._sliderBackplateMaterial}set isVisible(t){var e;this._isVisible!==t&&(this._isVisible=t,(e=this.node)===null||e===void 0||e.setEnabled(t))}_createNode(t){const e=Bt(`${this.name}_sliderbackplate`,{width:1,height:1,depth:1},t);return e.isPickable=!1,e.visibility=0,e.scaling=new c(1,.5,.8),re.ImportMeshAsync(void 0,ni.MODEL_BASE_URL,ni.MODEL_FILENAME,t).then(i=>{i.meshes.forEach(a=>{a.isPickable=!1});const s=i.meshes[1],o=i.meshes[1].clone(`${this.name}_sliderbar`,e),r=i.meshes[1].clone(`${this.name}_sliderthumb`,e);s.visibility=0,this._sliderBackplateVisible&&(s.visibility=1,s.name=`${this.name}_sliderbackplate`,s.scaling.x=1,s.scaling.z=.2,s.parent=e,this._sliderBackplateMaterial&&(s.material=this._sliderBackplateMaterial),this._sliderBackplate=s),o&&(o.parent=e,o.position.z=-.1,o.scaling=new c(Ni-Yo,.04,.3),this._sliderBarMaterial&&(o.material=this._sliderBarMaterial),this._sliderBar=o),r&&(r.parent=e,r.isPickable=!0,r.position.z=-.115,r.scaling=new c(.025,.3,.6),r.position.x=this._convertToPosition(this.value),r.addBehavior(this._createBehavior()),this._sliderThumbMaterial&&(r.material=this._sliderThumbMaterial),this._sliderThumb=r),this._injectGUI3DReservedDataStore(e).control=this,e.getChildMeshes().forEach(a=>{this._injectGUI3DReservedDataStore(a).control=this})}),this._affectMaterial(e),e}_affectMaterial(t){var e,i,s;this._sliderBackplateMaterial=(e=this._sliderBackplateMaterial)!==null&&e!==void 0?e:new Y(`${this.name}_sliderbackplate_material`,t.getScene()),this._sliderBarMaterial=(i=this._sliderBarMaterial)!==null&&i!==void 0?i:new y(`${this.name}_sliderbar_material`,t.getScene()),this._sliderThumbMaterial=(s=this._sliderThumbMaterial)!==null&&s!==void 0?s:new T(`${this.name}_sliderthumb_material`,t.getScene())}_createBehavior(){const t=new Tt({dragAxis:c.Right()});return t.moveAttached=!1,t.onDragStartObservable.add(()=>{this._draggedPosition=this._sliderThumb.position.x}),t.onDragObservable.add(e=>{this._draggedPosition+=e.dragDistance/this.scaling.x,this.value=this._convertToValue(this._draggedPosition)}),t}_convertToPosition(t){const e=(t-this.minimum)/(this.maximum-this.minimum)*(this.end-this.start)+this.start;return Math.min(Math.max(e,this.start),this.end)}_convertToValue(t){let e=(t-this.start)/(this.end-this.start)*(this.maximum-this.minimum);return e=this.step?Math.round(e/this.step)*this.step:e,Math.max(Math.min(this.minimum+e,this._maximum),this._minimum)}dispose(){var t,e,i,s,o,r;super.dispose(),(t=this._sliderBar)===null||t===void 0||t.dispose(),(e=this._sliderThumb)===null||e===void 0||e.dispose(),(i=this._sliderBarMaterial)===null||i===void 0||i.dispose(),(s=this._sliderThumbMaterial)===null||s===void 0||s.dispose(),(o=this._sliderBackplate)===null||o===void 0||o.dispose(),(r=this._sliderBackplateMaterial)===null||r===void 0||r.dispose()}}ni.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";ni.MODEL_FILENAME="mrtk-fluent-backplate.glb";class wr extends ae{get isVertical(){return this._isVertical}set isVertical(t){this._isVertical!==t&&(this._isVertical=t,_t.SetImmediate(()=>{this._arrangeChildren()}))}constructor(t=!1){super(),this._isVertical=!1,this.margin=.1,this._isVertical=t}_arrangeChildren(){let t=0,e=0,i=0;const s=[],o=Ct.Invert(this.node.computeWorldMatrix(!0));for(const _ of this._children){if(!_.mesh)continue;i++,_.mesh.computeWorldMatrix(!0),_.mesh.getWorldMatrix().multiplyToRef(o,p.Matrix[0]);const h=_.mesh.getBoundingInfo().boundingBox,d=c.TransformNormal(h.extendSize,p.Matrix[0]);s.push(d),this._isVertical?e+=d.y:t+=d.x}this._isVertical?e+=(i-1)*this.margin/2:t+=(i-1)*this.margin/2;let r;this._isVertical?r=-e:r=-t;let a=0;for(const _ of this._children){if(!_.mesh)continue;i--;const h=s[a++];this._isVertical?(_.position.y=r+h.y,_.position.x=0,r+=h.y*2):(_.position.x=r+h.x,_.position.y=0,r+=h.x*2),r+=i>0?this.margin:0}}}const Xo="mrdlBackglowPixelShader",Ko=`uniform vec3 cameraPosition;
varying vec3 vNormal;
varying vec2 vUV;
uniform float _Bevel_Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Tuning_Motion_;
uniform float _Motion_;
uniform float _Max_Intensity_;
uniform float _Intensity_Fade_In_Exponent_;
uniform float _Outer_Fuzz_Start_;
uniform float _Outer_Fuzz_End_;
uniform vec4 _Color_;
uniform vec4 _Inner_Color_;
uniform float _Blend_Exponent_;
uniform float _Falloff_;
uniform float _Bias_;
float BiasFunc(float b,float v) {
return pow(v,log(clamp(b,0.001,0.999))/log(0.5));
}
void Fuzzy_Round_Rect_B33(
float Size_X,
float Size_Y,
float Radius_X,
float Radius_Y,
float Line_Width,
vec2 UV,
float Outer_Fuzz,
float Max_Outer_Fuzz,
out float Rect_Distance,
out float Inner_Distance)
{
vec2 halfSize=vec2(Size_X,Size_Y)*0.5;
vec2 r=max(min(vec2(Radius_X,Radius_Y),halfSize),vec2(0.001,0.001));
float radius=min(r.x,r.y)-Max_Outer_Fuzz;
vec2 v=abs(UV);
vec2 nearestp=min(v,halfSize-r);
float d=distance(nearestp,v);
Inner_Distance=clamp(1.0-(radius-d)/Line_Width,0.0,1.0);
Rect_Distance=clamp(1.0-(d-radius)/Outer_Fuzz,0.0,1.0)*Inner_Distance;
}
void main()
{
float X_Q42;
float Y_Q42;
X_Q42=vNormal.x;
Y_Q42=vNormal.y;
float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);
float Sqrt_F_Q27=sqrt(MaxAB_Q24);
float Power_Q43=pow(MaxAB_Q24,_Intensity_Fade_In_Exponent_);
float Value_At_T_Q26=mix(_Outer_Fuzz_Start_,_Outer_Fuzz_End_,Sqrt_F_Q27);
float Product_Q23=_Max_Intensity_*Power_Q43;
float Rect_Distance_Q33;
float Inner_Distance_Q33;
Fuzzy_Round_Rect_B33(X_Q42,Y_Q42,_Bevel_Radius_,_Bevel_Radius_,_Line_Width_,vUV,Value_At_T_Q26,_Outer_Fuzz_Start_,Rect_Distance_Q33,Inner_Distance_Q33);
float Power_Q44=pow(Inner_Distance_Q33,_Blend_Exponent_);
float Result_Q45=pow(BiasFunc(_Bias_,Rect_Distance_Q33),_Falloff_);
vec4 Color_At_T_Q25=mix(_Inner_Color_,_Color_,Power_Q44);
float Product_Q22=Result_Q45*Product_Q23;
vec4 Result_Q28=Product_Q22*Color_At_T_Q25;
vec4 Out_Color=Result_Q28;
float Clip_Threshold=0.0;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[Xo]=Ko;const jo="mrdlBackglowVertexShader",qo=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
uniform float _Bevel_Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Tuning_Motion_;
uniform float _Motion_;
uniform float _Max_Intensity_;
uniform float _Intensity_Fade_In_Exponent_;
uniform float _Outer_Fuzz_Start_;
uniform float _Outer_Fuzz_End_;
uniform vec4 _Color_;
uniform vec4 _Inner_Color_;
uniform float _Blend_Exponent_;
uniform float _Falloff_;
uniform float _Bias_;
varying vec3 vNormal;
varying vec2 vUV;
void main()
{
vec3 Dir_World_Q41=(world*vec4(tangent,0.0)).xyz;
vec3 Dir_World_Q40=(world*vec4((cross(normal,tangent)),0.0)).xyz;
float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);
float Length_Q16=length(Dir_World_Q41);
float Length_Q17=length(Dir_World_Q40);
bool Greater_Than_Q37=MaxAB_Q24>0.0;
vec3 Sizes_Q35;
vec2 XY_Q35;
Sizes_Q35=(_Absolute_Sizes_ ? vec3(Length_Q16,Length_Q17,0) : vec3(Length_Q16/Length_Q17,1,0));
XY_Q35=(uv-vec2(0.5,0.5))*Sizes_Q35.xy;
vec3 Result_Q38=Greater_Than_Q37 ? position : vec3(0,0,0);
vec3 Pos_World_Q39=(world*vec4(Result_Q38,1.0)).xyz;
vec3 Position=Pos_World_Q39;
vec3 Normal=Sizes_Q35;
vec2 UV=XY_Q35;
vec3 Tangent=vec3(0,0,0);
vec3 Binormal=vec3(0,0,0);
vec4 Color=vec4(1,1,1,1);
gl_Position=viewProjection*vec4(Position,1);
vNormal=Normal;
vUV=UV;
}`;ot.ShadersStore[jo]=qo;class Zo extends le{constructor(){super(),this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class mt extends _e{constructor(t,e){super(t,e),this.bevelRadius=.16,this.lineWidth=.16,this.absoluteSizes=!1,this.tuningMotion=0,this.motion=1,this.maxIntensity=.7,this.intensityFadeInExponent=2,this.outerFuzzStart=.04,this.outerFuzzEnd=.04,this.color=new z(.682353,.698039,1,1),this.innerColor=new z(.356863,.392157,.796078,1),this.blendExponent=1.5,this.falloff=2,this.bias=.5,this.alphaMode=Gt.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new Zo);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlBackglow",h=i.toString(),d=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Bevel_Radius_","_Line_Width_","_Absolute_Sizes_","_Tuning_Motion_","_Motion_","_Max_Intensity_","_Intensity_Fade_In_Exponent_","_Outer_Fuzz_Start_","_Outer_Fuzz_End_","_Color_","_Inner_Color_","_Blend_Exponent_","_Falloff_","_Bias_"],u=[],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){const s=this.getScene();if(!i.materialDefines)return;const r=i.effect;r&&(this._activeEffect=r,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",s.activeCamera.position),this._activeEffect.setFloat("_Bevel_Radius_",this.bevelRadius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Tuning_Motion_",this.tuningMotion),this._activeEffect.setFloat("_Motion_",this.motion),this._activeEffect.setFloat("_Max_Intensity_",this.maxIntensity),this._activeEffect.setFloat("_Intensity_Fade_In_Exponent_",this.intensityFadeInExponent),this._activeEffect.setFloat("_Outer_Fuzz_Start_",this.outerFuzzStart),this._activeEffect.setFloat("_Outer_Fuzz_End_",this.outerFuzzEnd),this._activeEffect.setDirectColor4("_Color_",this.color),this._activeEffect.setDirectColor4("_Inner_Color_",this.innerColor),this._activeEffect.setFloat("_Blend_Exponent_",this.blendExponent),this._activeEffect.setFloat("_Falloff_",this.falloff),this._activeEffect.setFloat("_Bias_",this.bias),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new mt(t,this.getScene()),this)}serialize(){const t=q.Serialize(this);return t.customType="BABYLON.MRDLBackglowMaterial",t}getClassName(){return"MRDLBackglowMaterial"}static Parse(t,e,i){return q.Parse(()=>new mt(t.name,e),t,e,i)}}n([l()],mt.prototype,"bevelRadius",void 0);n([l()],mt.prototype,"lineWidth",void 0);n([l()],mt.prototype,"absoluteSizes",void 0);n([l()],mt.prototype,"tuningMotion",void 0);n([l()],mt.prototype,"motion",void 0);n([l()],mt.prototype,"maxIntensity",void 0);n([l()],mt.prototype,"intensityFadeInExponent",void 0);n([l()],mt.prototype,"outerFuzzStart",void 0);n([l()],mt.prototype,"outerFuzzEnd",void 0);n([l()],mt.prototype,"color",void 0);n([l()],mt.prototype,"innerColor",void 0);n([l()],mt.prototype,"blendExponent",void 0);n([l()],mt.prototype,"falloff",void 0);n([l()],mt.prototype,"bias",void 0);k("BABYLON.GUI.MRDLBackglowMaterial",mt);const $o="mrdlFrontplatePixelShader",Jo=`uniform vec3 cameraPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Relative_To_Height_;
uniform float _Filter_Width_;
uniform vec4 _Edge_Color_;
uniform float _Fade_Out_;
uniform bool _Smooth_Edges_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform float _Blob_Pulse_Max_Size_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Gaze_Intensity_;
uniform float _Gaze_Focus_;
uniform sampler2D _Blob_Texture_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
void Scale_Color_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void Scale_RGB_B50(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Proximity_Fragment_B51(
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec4 Deltas,
float Show_Selection,
float Distance_Fade1,
float Distance_Fade2,
float Strength,
out float Proximity)
{
float proximity1=(1.0-clamp(length(Deltas.xy)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade1;
float proximity2=(1.0-clamp(length(Deltas.zw)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade2;
Proximity=Strength*(Proximity_Max_Intensity*max(proximity1,proximity2) *(1.0-Show_Selection)+Show_Selection);
}
void Blob_Fragment_B56(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{
float k=dot(UV,UV);
Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));
}
void Round_Rect_Fragment_B61(
float Radius,
vec4 Line_Color,
float Filter_Width,
float Line_Visibility,
vec4 Fill_Color,
bool Smooth_Edges,
vec4 Rect_Parms,
out float Inside_Rect)
{
float d=length(max(abs(Rect_Parms.zw)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
Inside_Rect=Smooth_Edges ? clamp((Radius-d)/dx,0.0,1.0) : 1.0-step(Radius,d);
}
void main()
{
float Is_Quad_Q53;
Is_Quad_Q53=vNormal.z;
vec4 Blob_Color_Q56;
Blob_Fragment_B56(vUV,vTangent,_Blob_Texture_,Blob_Color_Q56);
float X_Q52;
float Y_Q52;
float Z_Q52;
float W_Q52;
X_Q52=vExtra3.x;
Y_Q52=vExtra3.y;
Z_Q52=vExtra3.z;
W_Q52=vExtra3.w;
float Proximity_Q51;
Proximity_Fragment_B51(_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vExtra2,X_Q52,Y_Q52,Z_Q52,1.0,Proximity_Q51);
float Inside_Rect_Q61;
Round_Rect_Fragment_B61(W_Q52,vec4(1,1,1,1),_Filter_Width_,1.0,vec4(0,0,0,0),_Smooth_Edges_,vExtra1,Inside_Rect_Q61);
vec4 Result_Q50;
Scale_RGB_B50(_Edge_Color_,Proximity_Q51,Result_Q50);
vec4 Result_Q47=Inside_Rect_Q61*Blob_Color_Q56;
vec4 Color_At_T_Q48=mix(Result_Q50,Result_Q47,Is_Quad_Q53);
vec4 Result_Q54;
Scale_Color_B54(Color_At_T_Q48,_Fade_Out_,Result_Q54);
vec4 Out_Color=Result_Q54;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;ot.ShadersStore[$o]=Jo;const tr="mrdlFrontplateVertexShader",er=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Relative_To_Height_;
uniform float _Filter_Width_;
uniform vec4 _Edge_Color_;
uniform float _Fade_Out_;
uniform bool _Smooth_Edges_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform float _Blob_Pulse_Max_Size_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Gaze_Intensity_;
uniform float _Gaze_Focus_;
uniform sampler2D _Blob_Texture_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Blob_Vertex_B40(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
float DistanceOffset,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info,
out vec2 Blob_Relative_UV)
{
float blobSize,fadeIn;
vec3 Hit_Position;
Blob_Info=vec3(0.0,0.0,0.0);
float Hit_Distance=dot(Blob_Position-Face_Center,Normal)+DistanceOffset*Blob_Far_Distance;
Hit_Position=Blob_Position-Hit_Distance*Normal;
float absD=abs(Hit_Distance);
float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);
float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);
float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;
blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;
Blob_Info.x=lerpVal*0.5+0.5;
Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;
Blob_Info.x*=(1.0-Blob_Pulse);
vec3 delta=Hit_Position-Face_Center;
vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));
vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;
vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);
vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;
vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;
Out_Position=mix(Position,blobCorner,Vx_Color.rrr);
Out_UV=mix(In_UV,blobUV,Vx_Color.rr);
Blob_Relative_UV=blobClipped/Face_Size.y;
}
void Round_Rect_Vertex_B36(
vec2 UV,
vec3 Tangent,
vec3 Binormal,
float Radius,
float Anisotropy,
vec2 Blob_Center_UV,
out vec2 Rect_UV,
out vec2 Scale_XY,
out vec4 Rect_Parms)
{
Scale_XY=vec2(Anisotropy,1.0);
Rect_UV=(UV-vec2(0.5,0.5))*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius);
Rect_Parms.zw=Blob_Center_UV;
}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{
vec3 delta=blobPosition-position;
vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));
vdistance=abs(dot(delta,dir));
return xy;
}
void Proximity_Vertex_B33(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Normal,
vec3 Tangent,
vec3 Binormal,
out vec4 Extra,
out float Distance_To_Face,
out float Distance_Fade1,
out float Distance_Fade2)
{
float distz1,distz2;
Extra.xy=ProjectProximity(Blob_Position,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz1)/Relative_Scale;
Extra.zw=ProjectProximity(Blob_Position_2,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz2)/Relative_Scale;
Distance_To_Face=dot(Normal,Position-Face_Center);
Distance_Fade1=1.0-clamp(distz1/Proximity_Far_Distance,0.0,1.0);
Distance_Fade2=1.0-clamp(distz2/Proximity_Far_Distance,0.0,1.0);
}
void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Choose_Blob_B27(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{
Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;
float b1=Blob_Enable_1 ? 1.0 : 0.0;
float b2=Blob_Enable_2 ? 1.0 : 0.0;
Blob_Enable=b1+(b2-b1)*Vx_Color.g;
Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;
Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;
Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;
Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;
}
void Move_Verts_B32(
vec2 UV,
float Radius,
float Anisotropy,
float Line_Width,
float Visible,
out vec3 New_P,
out vec2 New_UV)
{
vec2 xy=2.0*UV-vec2(0.5,0.5);
vec2 center=clamp(xy,0.0,1.0);
vec2 delta=2.0*(xy-center);
float deltaLength=length(delta);
vec2 aniso=vec2(1.0/Anisotropy,1.0);
center=(center-vec2(0.5,0.5))*(1.0-2.0*Radius*aniso);
New_UV=vec2((2.0-2.0*deltaLength)*Visible,0.0);
float deltaRadius= (Radius-Line_Width*New_UV.x);
New_P.xy=(center+deltaRadius/deltaLength *aniso*delta);
New_P.z=0.0;
}
void Object_To_World_Dir_B14(
vec3 Dir_Object,
out vec3 Binormal_World)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
}
void Proximity_Visibility_B55(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Face_Center,
vec3 Normal,
vec2 Face_Size,
float Gaze,
out float Width)
{
float boxMaxSize=length(Face_Size)*0.5;
float d1=dot(Proximity_Center-Face_Center,Normal);
vec3 blob1=Proximity_Center-d1*Normal;
float d2=dot(Proximity_Center_2-Face_Center,Normal);
vec3 blob2=Proximity_Center_2-d2*Normal;
vec3 delta1=blob1-Face_Center;
vec3 delta2=blob2-Face_Center;
float dist1=dot(delta1,delta1);
float dist2=dot(delta2,delta2);
float nearestProxDist=sqrt(min(dist1,dist2));
Width=(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));
Width=max(Gaze,Width);
}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{
return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));
}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{
vec3 delta=blobPosition-faceCenter;
float absD=abs(dot(delta,normal));
float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);
vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));
vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;
vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);
return selectPulse.x*selectPulse.y*fadeIn;
}
void Selection_Vertex_B31(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{
float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
Show_Selection=mix(max(select1,select2),1.0,Selected);
}
void main()
{
vec3 Vec3_Q29=vec3(vec2(0,0).x,vec2(0,0).y,color.r);
vec3 Nrm_World_Q24;
Nrm_World_Q24=normalize((world*vec4(normal,0.0)).xyz);
vec3 Face_Center_Q30;
Face_Center_Q30=(world*vec4(vec3(0,0,0),1.0)).xyz;
vec3 Tangent_World_Q13;
Tangent_World_Q13=(world*vec4(tangent,0.0)).xyz;
vec3 Result_Q42;
Result_Q42=_Use_Global_Left_Index_ ? Global_Left_Index_Tip_Position.xyz : _Blob_Position_;
vec3 Result_Q43;
Result_Q43=_Use_Global_Right_Index_ ? Global_Right_Index_Tip_Position.xyz : _Blob_Position_2_;
float Value_At_T_Q58=mix(_Blob_Near_Size_,_Blob_Pulse_Max_Size_,_Blob_Pulse_);
float Value_At_T_Q59=mix(_Blob_Near_Size_2_,_Blob_Pulse_Max_Size_,_Blob_Pulse_2_);
vec3 Cross_Q70=cross(normal,tangent);
float Product_Q45=_Gaze_Intensity_*_Gaze_Focus_;
float Step_Q46=step(0.0001,Product_Q45);
vec3 Tangent_World_N_Q15=normalize(Tangent_World_Q13);
vec3 Position_Q27;
float Near_Size_Q27;
float Inner_Fade_Q27;
float Blob_Enable_Q27;
float Fade_Q27;
float Pulse_Q27;
Choose_Blob_B27(color,Result_Q42,Result_Q43,_Blob_Enable_,_Blob_Enable_2_,Value_At_T_Q58,Value_At_T_Q59,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q27,Near_Size_Q27,Inner_Fade_Q27,Blob_Enable_Q27,Fade_Q27,Pulse_Q27);
vec3 Binormal_World_Q14;
Object_To_World_Dir_B14(Cross_Q70,Binormal_World_Q14);
float Anisotropy_Q21=length(Tangent_World_Q13)/length(Binormal_World_Q14);
vec3 Binormal_World_N_Q16=normalize(Binormal_World_Q14);
vec2 Face_Size_Q35;
float ScaleY_Q35;
Face_Size_Q35=vec2(length(Tangent_World_Q13),length(Binormal_World_Q14));
ScaleY_Q35=Face_Size_Q35.y;
float Out_Radius_Q38;
float Out_Line_Width_Q38;
Out_Radius_Q38=_Relative_To_Height_ ? _Radius_ : _Radius_/ScaleY_Q35;
Out_Line_Width_Q38=_Relative_To_Height_ ? _Line_Width_ : _Line_Width_/ScaleY_Q35;
float Show_Selection_Q31;
Selection_Vertex_B31(Result_Q42,Result_Q43,Face_Center_Q30,Face_Size_Q35,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,vec3(0,0,-1),Show_Selection_Q31);
float MaxAB_Q41=max(Show_Selection_Q31,Product_Q45);
float Width_Q55;
Proximity_Visibility_B55(Show_Selection_Q31,Result_Q42,Result_Q43,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Face_Center_Q30,Nrm_World_Q24,Face_Size_Q35,Step_Q46,Width_Q55);
vec3 New_P_Q32;
vec2 New_UV_Q32;
Move_Verts_B32(uv,Out_Radius_Q38,Anisotropy_Q21,Out_Line_Width_Q38,Width_Q55,New_P_Q32,New_UV_Q32);
vec3 Pos_World_Q12;
Object_To_World_Pos_B12(New_P_Q32,Pos_World_Q12);
vec3 Out_Position_Q40;
vec2 Out_UV_Q40;
vec3 Blob_Info_Q40;
vec2 Blob_Relative_UV_Q40;
Blob_Vertex_B40(Pos_World_Q12,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Position_Q27,_Blob_Intensity_,Near_Size_Q27,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q30,Face_Size_Q35,New_UV_Q32,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q27,Pulse_Q27,Fade_Q27,Blob_Enable_Q27,0.0,Out_Position_Q40,Out_UV_Q40,Blob_Info_Q40,Blob_Relative_UV_Q40);
vec2 Rect_UV_Q36;
vec2 Scale_XY_Q36;
vec4 Rect_Parms_Q36;
Round_Rect_Vertex_B36(New_UV_Q32,Tangent_World_Q13,Binormal_World_Q14,Out_Radius_Q38,Anisotropy_Q21,Blob_Relative_UV_Q40,Rect_UV_Q36,Scale_XY_Q36,Rect_Parms_Q36);
vec4 Extra_Q33;
float Distance_To_Face_Q33;
float Distance_Fade1_Q33;
float Distance_Fade2_Q33;
Proximity_Vertex_B33(Result_Q42,Result_Q43,Face_Center_Q30,Pos_World_Q12,_Proximity_Far_Distance_,1.0,_Proximity_Anisotropy_,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Extra_Q33,Distance_To_Face_Q33,Distance_Fade1_Q33,Distance_Fade2_Q33);
vec4 Vec4_Q37=vec4(MaxAB_Q41,Distance_Fade1_Q33,Distance_Fade2_Q33,Out_Radius_Q38);
vec3 Position=Out_Position_Q40;
vec3 Normal=Vec3_Q29;
vec2 UV=Out_UV_Q40;
vec3 Tangent=Blob_Info_Q40;
vec3 Binormal=vec3(0,0,0);
vec4 Color=vec4(1,1,1,1);
vec4 Extra1=Rect_Parms_Q36;
vec4 Extra2=Extra_Q33;
vec4 Extra3=Vec4_Q37;
gl_Position=viewProjection*vec4(Position,1);
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;ot.ShadersStore[tr]=er;class ir extends le{constructor(){super(),this.SMOOTH_EDGES=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class N extends _e{constructor(t,e){super(t,e),this.radius=.12,this.lineWidth=.01,this.relativeToHeight=!1,this._filterWidth=1,this.edgeColor=new z(.53,.53,.53,1),this.blobEnable=!0,this.blobPosition=new c(100,100,100),this.blobIntensity=.5,this.blobNearSize=.032,this.blobFarSize=.048,this.blobNearDistance=.008,this.blobFarDistance=.064,this.blobFadeLength=.04,this.blobInnerFade=.01,this.blobPulse=0,this.blobFade=1,this.blobPulseMaxSize=.05,this.blobEnable2=!0,this.blobPosition2=new c(10,10.1,-.6),this.blobNearSize2=.008,this.blobInnerFade2=.1,this.blobPulse2=0,this.blobFade2=1,this.gazeIntensity=.8,this.gazeFocus=0,this.selectionFuzz=.5,this.selected=1,this.selectionFade=.2,this.selectionFadeSize=0,this.selectedDistance=.08,this.selectedFadeLength=.08,this.proximityMaxIntensity=.45,this.proximityFarDistance=.16,this.proximityNearRadius=.016,this.proximityAnisotropy=1,this.useGlobalLeftIndex=!0,this.useGlobalRightIndex=!0,this.fadeOut=1,this.alphaMode=Gt.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1,this._blobTexture=new V(N.BLOB_TEXTURE_URL,e,!0,!1,V.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new ir);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!1,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlFrontplate",h=i.toString(),d=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Relative_To_Height_","_Filter_Width_","_Edge_Color_","_Fade_Out_","_Smooth_Edges_","_Blob_Enable_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Inner_Fade_","_Blob_Pulse_","_Blob_Fade_","_Blob_Pulse_Max_Size_","_Blob_Enable_2_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Inner_Fade_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Gaze_Intensity_","_Gaze_Focus_","_Blob_Texture_","_Selection_Fuzz_","_Selected_","_Selection_Fade_","_Selection_Fade_Size_","_Selected_Distance_","_Selected_Fade_Length_","_Proximity_Max_Intensity_","_Proximity_Far_Distance_","_Proximity_Near_Radius_","_Proximity_Anisotropy_","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","_Use_Global_Left_Index_","_Use_Global_Right_Index_"],u=[],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){const s=this.getScene();if(!i.materialDefines)return;const r=i.effect;r&&(this._activeEffect=r,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",s.activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Relative_To_Height_",this.relativeToHeight?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Edge_Color_",this.edgeColor),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._activeEffect.setFloat("_Blob_Enable_",this.blobEnable?1:0),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Inner_Fade_",this.blobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setFloat("_Blob_Pulse_Max_Size_",this.blobPulseMaxSize),this._activeEffect.setFloat("_Blob_Enable_2_",this.blobEnable2?1:0),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Inner_Fade_2_",this.blobInnerFade2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setFloat("_Gaze_Intensity_",this.gazeIntensity),this._activeEffect.setFloat("_Gaze_Focus_",this.gazeFocus),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Selection_Fuzz_",this.selectionFuzz),this._activeEffect.setFloat("_Selected_",this.selected),this._activeEffect.setFloat("_Selection_Fade_",this.selectionFade),this._activeEffect.setFloat("_Selection_Fade_Size_",this.selectionFadeSize),this._activeEffect.setFloat("_Selected_Distance_",this.selectedDistance),this._activeEffect.setFloat("_Selected_Fade_Length_",this.selectedFadeLength),this._activeEffect.setFloat("_Proximity_Max_Intensity_",this.proximityMaxIntensity),this._activeEffect.setFloat("_Proximity_Far_Distance_",this.proximityFarDistance),this._activeEffect.setFloat("_Proximity_Near_Radius_",this.proximityNearRadius),this._activeEffect.setFloat("_Proximity_Anisotropy_",this.proximityAnisotropy),this._activeEffect.setFloat("_Use_Global_Left_Index_",this.useGlobalLeftIndex?1:0),this._activeEffect.setFloat("_Use_Global_Right_Index_",this.useGlobalRightIndex?1:0),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new N(t,this.getScene()),this)}serialize(){const t=q.Serialize(this);return t.customType="BABYLON.MRDLFrontplateMaterial",t}getClassName(){return"MRDLFrontplateMaterial"}static Parse(t,e,i){return q.Parse(()=>new N(t.name,e),t,e,i)}}N.BLOB_TEXTURE_URL="";n([l()],N.prototype,"radius",void 0);n([l()],N.prototype,"lineWidth",void 0);n([l()],N.prototype,"relativeToHeight",void 0);n([l()],N.prototype,"edgeColor",void 0);n([l()],N.prototype,"blobEnable",void 0);n([l()],N.prototype,"blobPosition",void 0);n([l()],N.prototype,"blobIntensity",void 0);n([l()],N.prototype,"blobNearSize",void 0);n([l()],N.prototype,"blobFarSize",void 0);n([l()],N.prototype,"blobNearDistance",void 0);n([l()],N.prototype,"blobFarDistance",void 0);n([l()],N.prototype,"blobFadeLength",void 0);n([l()],N.prototype,"blobInnerFade",void 0);n([l()],N.prototype,"blobPulse",void 0);n([l()],N.prototype,"blobFade",void 0);n([l()],N.prototype,"blobPulseMaxSize",void 0);n([l()],N.prototype,"blobEnable2",void 0);n([l()],N.prototype,"blobPosition2",void 0);n([l()],N.prototype,"blobNearSize2",void 0);n([l()],N.prototype,"blobInnerFade2",void 0);n([l()],N.prototype,"blobPulse2",void 0);n([l()],N.prototype,"blobFade2",void 0);n([l()],N.prototype,"gazeIntensity",void 0);n([l()],N.prototype,"gazeFocus",void 0);n([l()],N.prototype,"selectionFuzz",void 0);n([l()],N.prototype,"selected",void 0);n([l()],N.prototype,"selectionFade",void 0);n([l()],N.prototype,"selectionFadeSize",void 0);n([l()],N.prototype,"selectedDistance",void 0);n([l()],N.prototype,"selectedFadeLength",void 0);n([l()],N.prototype,"proximityMaxIntensity",void 0);n([l()],N.prototype,"proximityFarDistance",void 0);n([l()],N.prototype,"proximityNearRadius",void 0);n([l()],N.prototype,"proximityAnisotropy",void 0);n([l()],N.prototype,"useGlobalLeftIndex",void 0);n([l()],N.prototype,"useGlobalRightIndex",void 0);k("BABYLON.GUI.MRDLFrontplateMaterial",N);const sr="mrdlInnerquadPixelShader",or=`uniform vec3 cameraPosition;
varying vec2 vUV;
varying vec3 vTangent;
uniform vec4 _Color_;
uniform float _Radius_;
uniform bool _Fixed_Radius_;
uniform float _Filter_Width_;
uniform float _Glow_Fraction_;
uniform float _Glow_Max_;
uniform float _Glow_Falloff_;
float FilterStep_Bid194(float edge,float x,float filterWidth)
{
float dx=max(1.0E-5,fwidth(x)*filterWidth);
return max((x+dx*0.5-max(edge,x-dx*0.5))/dx,0.0);
}
void Round_Rect_B194(
float Size_X,
float Size_Y,
float Radius,
vec4 Rect_Color,
float Filter_Width,
vec2 UV,
float Glow_Fraction,
float Glow_Max,
float Glow_Falloff,
out vec4 Color)
{
vec2 halfSize=vec2(Size_X,Size_Y)*0.5;
vec2 r=max(min(vec2(Radius,Radius),halfSize),vec2(0.01,0.01));
vec2 v=abs(UV);
vec2 nearestp=min(v,halfSize-r);
vec2 delta=(v-nearestp)/max(vec2(0.01,0.01),r);
float Distance=length(delta);
float insideRect=1.0-FilterStep_Bid194(1.0-Glow_Fraction,Distance,Filter_Width);
float glow=clamp((1.0-Distance)/Glow_Fraction,0.0,1.0);
glow=pow(glow,Glow_Falloff);
Color=Rect_Color*max(insideRect,glow*Glow_Max);
}
void main()
{
float X_Q192;
float Y_Q192;
float Z_Q192;
X_Q192=vTangent.x;
Y_Q192=vTangent.y;
Z_Q192=vTangent.z;
vec4 Color_Q194;
Round_Rect_B194(X_Q192,1.0,Y_Q192,_Color_,_Filter_Width_,vUV,_Glow_Fraction_,_Glow_Max_,_Glow_Falloff_,Color_Q194);
vec4 Out_Color=Color_Q194;
float Clip_Threshold=0.0;
gl_FragColor=Out_Color;
}
`;ot.ShadersStore[sr]=or;const rr="mrdlInnerquadVertexShader",ar=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform vec4 _Color_;
uniform float _Radius_;
uniform bool _Fixed_Radius_;
uniform float _Filter_Width_;
uniform float _Glow_Fraction_;
uniform float _Glow_Max_;
uniform float _Glow_Falloff_;
varying vec2 vUV;
varying vec3 vTangent;
void main()
{
vec3 Pos_World_Q189;
Pos_World_Q189=(world*vec4(position,1.0)).xyz;
vec3 Dir_World_Q190;
Dir_World_Q190=(world*vec4(tangent,0.0)).xyz;
vec3 Dir_World_Q191;
Dir_World_Q191=(world*vec4((cross(normal,tangent)),0.0)).xyz;
float Length_Q180=length(Dir_World_Q190);
float Length_Q181=length(Dir_World_Q191);
float Quotient_Q184=Length_Q180/Length_Q181;
float Quotient_Q195=_Radius_/Length_Q181;
vec2 Result_Q193;
Result_Q193=vec2((uv.x-0.5)*Length_Q180/Length_Q181,(uv.y-0.5));
float Result_Q198=_Fixed_Radius_ ? Quotient_Q195 : _Radius_;
vec3 Vec3_Q183=vec3(Quotient_Q184,Result_Q198,0);
vec3 Position=Pos_World_Q189;
vec3 Normal=vec3(0,0,0);
vec2 UV=Result_Q193;
vec3 Tangent=Vec3_Q183;
vec3 Binormal=vec3(0,0,0);
vec4 Color=color;
gl_Position=viewProjection*vec4(Position,1);
vUV=UV;
vTangent=Tangent;
}
`;ot.ShadersStore[rr]=ar;class nr extends le{constructor(){super(),this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class Wt extends _e{constructor(t,e){super(t,e),this.color=new z(1,1,1,.05),this.radius=.12,this.fixedRadius=!0,this._filterWidth=1,this.glowFraction=0,this.glowMax=.5,this.glowFalloff=2,this.alphaMode=Gt.ALPHA_COMBINE,this.backFaceCulling=!1}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,e){if(this.isFrozen&&e.effect&&e.effect._wasPreviouslyReady)return!0;e.materialDefines||(e.materialDefines=new nr);const i=e.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(e))return!0;const o=s.getEngine();if(G.PrepareDefinesForAttributes(t,i,!0,!1),i.isDirty){i.markAsProcessed(),s.resetCachedMaterial();const r=new be;i.FOG&&r.addFallback(1,"FOG"),G.HandleFallbacksForShadows(i,r),i.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess;const a=[B.PositionKind];i.NORMAL&&a.push(B.NormalKind),i.UV1&&a.push(B.UVKind),i.UV2&&a.push(B.UV2Kind),i.VERTEXCOLOR&&a.push(B.ColorKind),i.TANGENT&&a.push(B.TangentKind),G.PrepareAttributesForInstances(a,i);const _="mrdlInnerquad",h=i.toString(),d=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Color_","_Radius_","_Fixed_Radius_","_Filter_Width_","_Glow_Fraction_","_Glow_Max_","_Glow_Falloff_"],u=[],m=new Array;G.PrepareUniformsAndSamplersList({uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:i,maxSimultaneousLights:4}),e.setEffect(s.getEngine().createEffect(_,{attributes:a,uniformsNames:d,uniformBuffersNames:m,samplers:u,defines:h,fallbacks:r,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},o),i)}return!e.effect||!e.effect.isReady()?!1:(i._renderId=s.getRenderId(),e.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,e,i){const s=this.getScene();if(!i.materialDefines)return;const r=i.effect;r&&(this._activeEffect=r,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",s.activeCamera.position),this._activeEffect.setDirectColor4("_Color_",this.color),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Fixed_Radius_",this.fixedRadius?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setFloat("_Glow_Fraction_",this.glowFraction),this._activeEffect.setFloat("_Glow_Max_",this.glowMax),this._activeEffect.setFloat("_Glow_Falloff_",this.glowFalloff),this._afterBind(e,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return q.Clone(()=>new Wt(t,this.getScene()),this)}serialize(){const t=q.Serialize(this);return t.customType="BABYLON.MRDLInnerquadMaterial",t}getClassName(){return"MRDLInnerquadMaterial"}static Parse(t,e,i){return q.Parse(()=>new Wt(t.name,e),t,e,i)}}n([l()],Wt.prototype,"color",void 0);n([l()],Wt.prototype,"radius",void 0);n([l()],Wt.prototype,"fixedRadius",void 0);n([l()],Wt.prototype,"glowFraction",void 0);n([l()],Wt.prototype,"glowMax",void 0);n([l()],Wt.prototype,"glowFalloff",void 0);k("BABYLON.GUI.MRDLInnerquadMaterial",Wt);class Et extends ms{_disposeTooltip(){this._tooltipFade=null,this._tooltipTextBlock&&this._tooltipTextBlock.dispose(),this._tooltipTexture&&this._tooltipTexture.dispose(),this._tooltipMesh&&this._tooltipMesh.dispose(),this.onPointerEnterObservable.remove(this._tooltipHoverObserver),this.onPointerOutObservable.remove(this._tooltipOutObserver)}set renderingGroupId(t){this._backPlate.renderingGroupId=t,this._textPlate.renderingGroupId=t,this._frontPlate.renderingGroupId=t,this._backGlow.renderingGroupId=t,this._innerQuad.renderingGroupId=t,this._tooltipMesh&&(this._tooltipMesh.renderingGroupId=t)}get renderingGroupId(){return this._backPlate.renderingGroupId}get mesh(){return this._backPlate}set tooltipText(t){if(!t){this._disposeTooltip();return}if(!this._tooltipFade){const e=this._backPlate._scene.useRightHandedSystem;this._tooltipMesh=se("",{size:1},this._backPlate._scene),this._tooltipMesh.position=c.Down().scale(.7).add(c.Forward(e).scale(-.15)),this._tooltipMesh.isPickable=!1,this._tooltipMesh.parent=this._frontPlateCollisionMesh,this._tooltipTexture=ct.CreateForMesh(this._tooltipMesh);const i=new gt;i.height=.25,i.width=.8,i.cornerRadius=25,i.color="#ffffff",i.thickness=20,i.background="#060668",this._tooltipTexture.addControl(i),this._tooltipTextBlock=new U,this._tooltipTextBlock.color="white",this._tooltipTextBlock.fontSize=100,this._tooltipTexture.addControl(this._tooltipTextBlock),this._tooltipFade=new hs,this._tooltipFade.delay=500,this._tooltipMesh.addBehavior(this._tooltipFade),this._tooltipHoverObserver=this.onPointerEnterObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!0)}),this._tooltipOutObserver=this.onPointerOutObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!1)})}this._tooltipTextBlock&&(this._tooltipTextBlock.text=t)}get tooltipText(){var t;return((t=this._tooltipTextBlock)===null||t===void 0?void 0:t.text)||null}get text(){return this._text}set text(t){this._text!==t&&(this._text=t,this._rebuildContent())}get subtext(){return this._subtext}set subtext(t){this._subtext!==t&&(this._subtext=t,this._rebuildContent())}get imageUrl(){return this._imageUrl}set imageUrl(t){this._imageUrl!==t&&(this._imageUrl=t,this._rebuildContent())}get backMaterial(){return this._backMaterial}get frontMaterial(){return this._frontMaterial}get backGlowMaterial(){return this._backGlowMaterial}get innerQuadMaterial(){return this._innerQuadMaterial}get plateMaterial(){return this._plateMaterial}get shareMaterials(){return this._shareMaterials}set isBackplateVisible(t){this.mesh&&this._backMaterial&&(t&&!this._isBackplateVisible?this._backPlate.visibility=1:!t&&this._isBackplateVisible&&(this._backPlate.visibility=0)),this._isBackplateVisible=t}constructor(t,e=!0){super(t),this.width=1,this.height=1,this.radius=.14,this.textSizeInPixels=18,this.imageSizeInPixels=40,this.plateMaterialColor=new E(.4,.4,.4),this.frontPlateDepth=.2,this.backPlateDepth=.04,this.backGlowOffset=.1,this.flatPlaneDepth=.001,this.innerQuadRadius=this.radius-.04,this.innerQuadColor=new z(0,0,0,0),this.innerQuadToggledColor=new z(.5197843,.6485234,.9607843,.6),this.innerQuadHoverColor=new z(1,1,1,.05),this.innerQuadToggledHoverColor=new z(.5197843,.6485234,.9607843,1),this._isBackplateVisible=!0,this._shareMaterials=!0,this._shareMaterials=e,this.pointerEnterAnimation=()=>{this._frontPlate&&this._textPlate&&!this.isToggleButton&&this._performEnterExitAnimation(1),this.isToggleButton&&this._innerQuadMaterial&&(this.isToggled?this._innerQuadMaterial.color=this.innerQuadToggledHoverColor:this._innerQuadMaterial.color=this.innerQuadHoverColor)},this.pointerOutAnimation=()=>{this._frontPlate&&this._textPlate&&!this.isToggleButton&&this._performEnterExitAnimation(-.8),this.isToggleButton&&this._innerQuadMaterial&&this._onToggle(this.isToggled)},this.pointerDownAnimation=()=>{},this.pointerUpAnimation=()=>{},this._pointerClickObserver=this.onPointerClickObservable.add(()=>{this._frontPlate&&this._backGlow&&!this.isActiveNearInteraction&&this._performClickAnimation(),this.isToggleButton&&this._innerQuadMaterial&&this._onToggle(this.isToggled)}),this._pointerEnterObserver=this.onPointerEnterObservable.add(()=>{this.pointerEnterAnimation()}),this._pointerOutObserver=this.onPointerOutObservable.add(()=>{this.pointerOutAnimation()}),this._toggleObserver=this.onToggleObservable.add(i=>{i?this._innerQuadMaterial.color=this.innerQuadToggledColor:this._innerQuadMaterial.color=this.innerQuadColor})}_getTypeName(){return"TouchHolographicButton"}_rebuildContent(){let t;this._getAspectRatio()<=1?t=this._alignContentVertically():t=this._alignContentHorizontally(),this.content=t}_getAspectRatio(){return this.width/this.height}_alignContentVertically(){const t=new Ot;if(t.isVertical=!0,Qi.IsDocumentAvailable()&&document.createElement&&this._imageUrl){const e=new C;e.source=this._imageUrl,e.heightInPixels=180,e.widthInPixels=100,e.paddingTopInPixels=40,e.paddingBottomInPixels=40,t.addControl(e)}if(this._text){const e=new U;e.text=this._text,e.color="white",e.heightInPixels=30,e.fontSize=24,t.addControl(e)}return t}_alignContentHorizontally(){let t=240;const e=15,i=new gt;i.widthInPixels=t,i.heightInPixels=t,i.color="transparent",i.setPaddingInPixels(e,e,e,e),t-=e*2;const s=new Ot;if(s.isVertical=!1,s.scaleY=this._getAspectRatio(),Qi.IsDocumentAvailable()&&document.createElement&&this._imageUrl){const o=new gt(`${this.name}_image`);o.widthInPixels=this.imageSizeInPixels,o.heightInPixels=this.imageSizeInPixels,o.color="transparent",t-=this.imageSizeInPixels;const r=new C;r.source=this._imageUrl,o.addControl(r),s.addControl(o)}if(this._text){const o=new U(`${this.name}_text`);if(o.text=this._text,o.color="white",o.fontSize=this.textSizeInPixels,o.widthInPixels=t,this._imageUrl&&(o.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,o.paddingLeftInPixels=e),this._subtext){const r=new xt;r.addColumnDefinition(1),r.addRowDefinition(.5),r.addRowDefinition(.5),r.widthInPixels=t,r.heightInPixels=45;const a=new U(`${this.name}_subtext`);a.text=this._subtext,a.color="#EEEEEEAB",a.fontSize=this.textSizeInPixels*.75,a.fontWeight="600",this._imageUrl&&(a.textHorizontalAlignment=f.HORIZONTAL_ALIGNMENT_LEFT,a.paddingLeftInPixels=e),r.addControl(o,0),r.addControl(a,1),s.addControl(r)}else s.addControl(o)}return i.addControl(s),i}_createNode(t){var e;this.name=(e=this.name)!==null&&e!==void 0?e:"TouchHolographicButton";const i=this._createBackPlate(t),s=this._createFrontPlate(t),o=this._createInnerQuad(t),r=this._createBackGlow(t);this._frontPlateCollisionMesh=s,this._textPlate=super._createNode(t),this._textPlate.name=`${this.name}_textPlate`,this._textPlate.isPickable=!1,this._textPlate.scaling.x=this.width,this._textPlate.parent=s,this._backPlate=i,this._backPlate.position=c.Forward(t.useRightHandedSystem).scale(this.backPlateDepth/2),this._backPlate.isPickable=!1,this._backPlate.addChild(s),this._backPlate.addChild(o),r&&this._backPlate.addChild(r);const a=new ne(`${this.name}_root`,t);return this._backPlate.setParent(a),this.collisionMesh=s,this.collidableFrontDirection=this._backPlate.forward.negate(),a}_createBackPlate(t){const e=Bt(`${this.name}_backPlate`,{},t);return e.isPickable=!1,e.visibility=0,e.scaling.z=.2,re.ImportMeshAsync(void 0,Et.MRTK_ASSET_BASE_URL,Et.BACKPLATE_MODEL_FILENAME,t).then(i=>{const s=i.meshes[1];s.visibility=0,this._isBackplateVisible&&(s.visibility=1,s.name=`${this.name}_backPlate`,s.isPickable=!1,s.scaling.x=this.width,s.scaling.y=this.height,s.parent=e),this._backMaterial&&(s.material=this._backMaterial),this._backPlate=s}),e}_createFrontPlate(t){const e=Bt(`${this.name}_frontPlate`,{width:this.width,height:this.height,depth:this.frontPlateDepth},t);return e.isPickable=!0,e.isNearPickable=!0,e.visibility=0,e.position=c.Forward(t.useRightHandedSystem).scale((this.backPlateDepth-this.frontPlateDepth)/2),re.ImportMeshAsync(void 0,Et.MRTK_ASSET_BASE_URL,Et.FRONTPLATE_MODEL_FILENAME,t).then(i=>{const s=Bt(`${this.name}_collisionPlate`,{width:this.width,height:this.height},t);s.isPickable=!1,s.scaling.z=this.frontPlateDepth,s.visibility=0,s.parent=e,this._collisionPlate=s;const o=i.meshes[1];o.name=`${this.name}_frontPlate`,o.isPickable=!1,o.scaling.x=this.width-this.backGlowOffset,o.scaling.y=this.height-this.backGlowOffset,o.position=c.Forward(t.useRightHandedSystem).scale(-.5),o.parent=s,this.isToggleButton&&(o.visibility=0),this._frontMaterial&&(o.material=this._frontMaterial),this._textPlate.scaling.x=1,this._textPlate.parent=o,this._frontPlate=o}),e}_createInnerQuad(t){const e=Bt(`${this.name}_innerQuad`,{},t);return e.isPickable=!1,e.visibility=0,e.scaling.z=this.flatPlaneDepth,e.position.z+=this.backPlateDepth/2-this.flatPlaneDepth,re.ImportMeshAsync(void 0,Et.MRTK_ASSET_BASE_URL,Et.INNERQUAD_MODEL_FILENAME,t).then(i=>{const s=i.meshes[1];s.name=`${this.name}_innerQuad`,s.isPickable=!1,s.scaling.x=this.width-this.backGlowOffset,s.scaling.y=this.height-this.backGlowOffset,s.parent=e,this._innerQuadMaterial&&(s.material=this._innerQuadMaterial),this._innerQuad=s}),e}_createBackGlow(t){if(this.isToggleButton)return;const e=Bt(`${this.name}_backGlow`,{},t);return e.isPickable=!1,e.visibility=0,e.scaling.z=this.flatPlaneDepth,e.position.z+=this.backPlateDepth/2-this.flatPlaneDepth*2,re.ImportMeshAsync(void 0,Et.MRTK_ASSET_BASE_URL,Et.BACKGLOW_MODEL_FILENAME,t).then(i=>{const s=i.meshes[1];s.name=`${this.name}_backGlow`,s.isPickable=!1,s.scaling.x=this.width-this.backGlowOffset,s.scaling.y=this.height-this.backGlowOffset,s.parent=e,this._backGlowMaterial&&(s.material=this._backGlowMaterial),this._backGlow=s}),e}_applyFacade(t){this._plateMaterial.emissiveTexture=t,this._plateMaterial.opacityTexture=t,this._plateMaterial.diffuseColor=this.plateMaterialColor}_performClickAnimation(){const e=new ts("Click Animation Group"),i=[{name:"backGlowMotion",mesh:this._backGlow,property:"material.motion",keys:[{frame:0,values:[0,0,0]},{frame:20,values:[1,.0144,.0144]},{frame:40,values:[.0027713229489760476,0,0]},{frame:45,values:[.0027713229489760476]}]},{name:"_collisionPlateZSlide",mesh:this._collisionPlate,property:"position.z",keys:[{frame:0,values:[0,0,0]},{frame:20,values:[c.Forward(this._collisionPlate._scene.useRightHandedSystem).scale(this.frontPlateDepth/2).z,0,0]},{frame:40,values:[0,.005403332496794331]},{frame:45,values:[0]}]},{name:"_collisionPlateZScale",mesh:this._collisionPlate,property:"scaling.z",keys:[{frame:0,values:[this.frontPlateDepth,0,0]},{frame:20,values:[this.backPlateDepth,0,0]},{frame:40,values:[this.frontPlateDepth,.0054]},{frame:45,values:[this.frontPlateDepth]}]}];for(const s of i){const o=new He(s.name,s.property,60,He.ANIMATIONTYPE_FLOAT,He.ANIMATIONLOOPMODE_CYCLE),r=[];for(const a of s.keys)r.push({frame:a.frame,value:a.values[0],inTangent:a.values[1],outTangent:a.values[2],interpolation:a.values[3]});o.setKeys(r),s.mesh&&e.addTargetedAnimation(o,s.mesh)}e.normalize(0,45),e.speedRatio=1,e.play()}_performEnterExitAnimation(t){const i=new ts("Enter Exit Animation Group"),s=[{name:"frontPlateFadeOut",mesh:this._frontPlate,property:"material.fadeOut",keys:[{frame:0,values:[0,0,.025045314830017686,0]},{frame:40,values:[1.00205599570012,.025045314830017686,0,0]}]},{name:"textPlateZSlide",mesh:this._textPlate,property:"position.z",keys:[{frame:0,values:[0,0,0]},{frame:40,values:[c.Forward(this._textPlate._scene.useRightHandedSystem).scale(-.15).z,0,0]}]}];for(const o of s){const r=new He(o.name,o.property,60,He.ANIMATIONTYPE_FLOAT,He.ANIMATIONLOOPMODE_CYCLE),a=[];for(const _ of o.keys)a.push({frame:_.frame,value:_.values[0],inTangent:_.values[1],outTangent:_.values[2],interpolation:_.values[3]});r.setKeys(a),o.mesh&&i.addTargetedAnimation(r,o.mesh)}i.normalize(0,45),i.speedRatio=t,i.play()}_createBackMaterial(t){var e;this._backMaterial=(e=this._backMaterial)!==null&&e!==void 0?e:new Y(this.name+"backPlateMaterial",t.getScene()),this._backMaterial.absoluteSizes=!0,this._backMaterial.radius=this.radius,this._backMaterial.lineWidth=.02}_createFrontMaterial(t){var e;this._frontMaterial=(e=this._frontMaterial)!==null&&e!==void 0?e:new N(this.name+"Front Material",t.getScene()),this.frontMaterial.radius=this.innerQuadRadius,this.frontMaterial.fadeOut=0}_createBackGlowMaterial(t){var e;const i=this.radius+.04;this._backGlowMaterial=(e=this._backGlowMaterial)!==null&&e!==void 0?e:new mt(this.name+"Back Glow Material",t.getScene()),this._backGlowMaterial.bevelRadius=i,this._backGlowMaterial.lineWidth=i,this._backGlowMaterial.motion=0}_createInnerQuadMaterial(t){var e;this._innerQuadMaterial=(e=this._innerQuadMaterial)!==null&&e!==void 0?e:new Wt("inner_quad",t.getScene()),this._innerQuadMaterial.radius=this.innerQuadRadius,this.isToggleButton&&(this._innerQuadMaterial.color=this.innerQuadColor)}_createPlateMaterial(t){var e;this._plateMaterial=(e=this._plateMaterial)!==null&&e!==void 0?e:new ii(this.name+"Plate Material",t.getScene()),this._plateMaterial.specularColor=E.Black()}_onToggle(t){super._onToggle(t)}_affectMaterial(t){this._shareMaterials?(this._host._touchSharedMaterials.mrdlBackplateMaterial?this._backMaterial=this._host._touchSharedMaterials.mrdlBackplateMaterial:(this._createBackMaterial(t),this._host._touchSharedMaterials.mrdlBackplateMaterial=this._backMaterial),this._host._touchSharedMaterials.mrdlFrontplateMaterial?this._frontMaterial=this._host._touchSharedMaterials.mrdlFrontplateMaterial:(this._createFrontMaterial(t),this._host._touchSharedMaterials.mrdlFrontplateMaterial=this._frontMaterial),this._host._touchSharedMaterials.mrdlBackglowMaterial?this._backGlowMaterial=this._host._touchSharedMaterials.mrdlBackglowMaterial:(this._createBackGlowMaterial(t),this._host._touchSharedMaterials.mrdlBackglowMaterial=this._backGlowMaterial),this._host._touchSharedMaterials.mrdlInnerQuadMaterial?this._innerQuadMaterial=this._host._touchSharedMaterials.mrdlInnerQuadMaterial:(this._createInnerQuadMaterial(t),this._host._touchSharedMaterials.mrdlInnerQuadMaterial=this._innerQuadMaterial)):(this._createBackMaterial(t),this._createFrontMaterial(t),this._createBackGlowMaterial(t),this._createInnerQuadMaterial(t)),this._createPlateMaterial(t),this._backPlate.material=this._backMaterial,this._textPlate.material=this._plateMaterial,this._isBackplateVisible||(this._backPlate.visibility=0),this._frontPlate&&(this._frontPlate.material=this._frontMaterial),this._backGlow&&(this._backGlow.material=this._backGlowMaterial),this._innerQuad&&(this._innerQuad.material=this._innerQuadMaterial),this._rebuildContent()}dispose(){super.dispose(),this._disposeTooltip(),this.onPointerClickObservable.remove(this._pointerClickObserver),this.onPointerEnterObservable.remove(this._pointerEnterObserver),this.onPointerOutObservable.remove(this._pointerOutObserver),this.onToggleObservable.remove(this._toggleObserver),this.shareMaterials||(this._backMaterial.dispose(),this._frontMaterial.dispose(),this._plateMaterial.dispose(),this._backGlowMaterial.dispose(),this._innerQuadMaterial.dispose(),this._pickedPointObserver&&(this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._pickedPointObserver=null))}}Et.MRTK_ASSET_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/";Et.FRONTPLATE_MODEL_FILENAME="mrtk-fluent-frontplate.glb";Et.BACKPLATE_MODEL_FILENAME="mrtk-fluent-backplate.glb";Et.BACKGLOW_MODEL_FILENAME="mrtk-fluent-button.glb";Et.INNERQUAD_MODEL_FILENAME="SlateProximity.glb";class Ii{get scene(){return this._scene}get utilityLayer(){return this._utilityLayer}get controlScaling(){return this._customControlScaling}set controlScaling(t){if(this._customControlScaling!==t&&t>0){const e=t/this._customControlScaling;this._customControlScaling=t,this._rootContainer.children.forEach(i=>{i.scaling.scaleInPlace(e),t!==1&&(i._isScaledByManager=!0)})}}get useRealisticScaling(){return this.controlScaling===Ii.MRTK_REALISTIC_SCALING}set useRealisticScaling(t){this.controlScaling=t?Ii.MRTK_REALISTIC_SCALING:1}constructor(t){this._customControlScaling=1,this._lastControlOver={},this._lastControlDown={},this.onPickedPointChangedObservable=new x,this.onPickingObservable=new x,this._sharedMaterials={},this._touchSharedMaterials={},this._scene=t||Ht.LastCreatedScene,this._sceneDisposeObserver=this._scene.onDisposeObservable.add(()=>{this._sceneDisposeObserver=null,this._utilityLayer=null,this.dispose()}),this._utilityLayer=os._CreateDefaultUtilityLayerFromScene(this._scene),this._utilityLayer.onlyCheckPointerDownEvents=!1,this._utilityLayer.pickUtilitySceneFirst=!1,this._utilityLayer.mainSceneTrackerPredicate=i=>{var s,o,r;return i&&((r=(o=(s=i.reservedDataStore)===null||s===void 0?void 0:s.GUI3D)===null||o===void 0?void 0:o.control)===null||r===void 0?void 0:r._node)},this._rootContainer=new ae("RootContainer"),this._rootContainer._host=this;const e=this._utilityLayer.utilityLayerScene;this._pointerOutObserver=this._utilityLayer.onPointerOutObservable.add(i=>{this._handlePointerOut(i,!0)}),this._pointerObserver=e.onPointerObservable.add(i=>{this._doPicking(i)}),this._utilityLayer.utilityLayerScene.autoClear=!1,this._utilityLayer.utilityLayerScene.autoClearDepthAndStencil=!1,new Ls("hemi",c.Up(),this._utilityLayer.utilityLayerScene)}_handlePointerOut(t,e){const i=this._lastControlOver[t];i&&(i._onPointerOut(i),delete this._lastControlOver[t]),e&&this._lastControlDown[t]&&(this._lastControlDown[t].forcePointerUp(),delete this._lastControlDown[t]),this.onPickedPointChangedObservable.notifyObservers(null)}_doPicking(t){var e,i,s;if(!this._utilityLayer||!this._utilityLayer.shouldRender||!this._utilityLayer.utilityLayerScene.activeCamera)return!1;const o=t.event,r=o.pointerId||0,a=o.button,_=t.pickInfo;if(_&&this.onPickingObservable.notifyObservers(_.pickedMesh),!_||!_.hit)return this._handlePointerOut(r,t.type===D.POINTERUP),!1;_.pickedPoint&&this.onPickedPointChangedObservable.notifyObservers(_.pickedPoint);const h=(i=(e=_.pickedMesh.reservedDataStore)===null||e===void 0?void 0:e.GUI3D)===null||i===void 0?void 0:i.control;return h&&!h._processObservables(t.type,_.pickedPoint,((s=_.originMesh)===null||s===void 0?void 0:s.position)||null,r,a)&&t.type===D.POINTERMOVE&&(this._lastControlOver[r]&&this._lastControlOver[r]._onPointerOut(this._lastControlOver[r]),delete this._lastControlOver[r]),t.type===D.POINTERUP&&(this._lastControlDown[o.pointerId]&&(this._lastControlDown[o.pointerId].forcePointerUp(),delete this._lastControlDown[o.pointerId]),(o.pointerType==="touch"||o.pointerType==="xr"&&this._scene.getEngine().hostInformation.isMobile)&&this._handlePointerOut(r,!1)),!0}get rootContainer(){return this._rootContainer}containsControl(t){return this._rootContainer.containsControl(t)}addControl(t){return this._rootContainer.addControl(t),this._customControlScaling!==1&&(t.scaling.scaleInPlace(this._customControlScaling),t._isScaledByManager=!0),this}removeControl(t){return this._rootContainer.removeControl(t),t._isScaledByManager&&(t.scaling.scaleInPlace(1/this._customControlScaling),t._isScaledByManager=!1),this}dispose(){this._rootContainer.dispose();for(const e in this._sharedMaterials)Object.prototype.hasOwnProperty.call(this._sharedMaterials,e)&&this._sharedMaterials[e].dispose();this._sharedMaterials={};for(const e in this._touchSharedMaterials)Object.prototype.hasOwnProperty.call(this._touchSharedMaterials,e)&&this._touchSharedMaterials[e].dispose();this._touchSharedMaterials={},this._pointerOutObserver&&this._utilityLayer&&(this._utilityLayer.onPointerOutObservable.remove(this._pointerOutObserver),this._pointerOutObserver=null),this.onPickedPointChangedObservable.clear(),this.onPickingObservable.clear();const t=this._utilityLayer?this._utilityLayer.utilityLayerScene:null;t&&this._pointerObserver&&(t.onPointerObservable.remove(this._pointerObserver),this._pointerObserver=null),this._scene&&this._sceneDisposeObserver&&(this._scene.onDisposeObservable.remove(this._sceneDisposeObserver),this._sceneDisposeObserver=null),this._utilityLayer&&this._utilityLayer.dispose()}}Ii.MRTK_REALISTIC_SCALING=.032;export{qt as $,Ne as A,so as B,Lt as C,yr as D,Xe as E,hs as F,Ii as G,vr as H,gt as I,yt as J,oo as K,Ks as L,ae as M,Ue as N,ct as O,Tt as P,C as Q,ve as R,wr as S,U as T,dt as U,Fi as V,Hs as W,ms as X,io as Y,fs as Z,Nt as _,Ee as a,Rt as a0,yi as a1,Co as a2,Ut as a3,cs as a4,W as a5,F as a6,_o as a7,js as a8,bs as a9,So as aA,ni as aB,eo as aC,Vi as aD,oe as aE,$s as aF,ri as aG,Et as aH,R as aI,Di as aJ,Gi as aK,Mr as aL,xt as aa,Ro as ab,ie as ac,oi as ad,Ft as ae,us as af,Pi as ag,qs as ah,j as ai,Ge as aj,Sr as ak,Ae as al,Js as am,Y as an,y as ao,T as ap,Wi as aq,A as ar,st as as,ds as at,es as au,ai as av,to as aw,Ye as ax,Ke as ay,Bo as az,Q as b,vi as c,ks as d,xr as e,Zt as f,Oi as g,Vs as h,bi as i,pe as j,we as k,Me as l,me as m,Tr as n,Ws as o,Br as p,Ir as q,Pr as r,Fe as s,Cr as t,Rr as u,Qs as v,v as w,L as x,Ot as y,f as z};
