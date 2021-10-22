import{o as N,aa as R,A as S,V as A,aC as I,aG as B,aH as g,M as P,aD as d,l as i,aE as m,ae as M,af as k}from"./vendor.a6be2030.js";import{C as E}from"./cannon.df6abc6b.js";var O="/assets/environment-sunset.c2974e07.env",D="/assets/environment-night.3d44195a.env",j="/assets/environment-river.5d3cfdcc.env",G="/assets/environment-noon.9375f108.env";window.CANNON=E;function Y(o,r){o.enableOfflineSupport=!1,N.AllowMatricesInterpolation=!0;var e=new R(o);const a=new S("Camera",75*Math.PI/180,75*Math.PI/180,20,new A(0,2.5,0),e);a.attachControl(r),e.enablePhysics(null,new I);const l=[O,D,j,G].map(s=>{const t=new B(s,e);return{skybox:e.createDefaultSkybox(t,!0,1e4,.1),texture:t}});var u=new g("pedestalMaterial",e);u.metallic=0,u.roughness=.5;var C=new g("cubesMaterial",e);C.metallic=.1,C.roughness=.5,f(0);function f(s){for(var t=0;t<l.length;t++){const{skybox:n}=l[t];n.setEnabled(t===s%l.length)}const{texture:c}=l[s%l.length];e.environmentTexture=c}var h=0;e.onBeforeRenderObservable.add(()=>{h+=o.getDeltaTime()/1e3/3;for(const{skybox:t,texture:c}of l)t.rotation.set(0,-h,0),c.setReflectionTextureMatrix(P.RotationY(h))});const b=d.CreateCylinder("cylinder",{diameter:15,faceColors:[new i(.01,.01,.01).toColor4(),new i(.01,.01,.01).toColor4(),new i(.01,.01,.01).toColor4()]},e);b.material=u,b.physicsImpostor=new m(b,m.CylinderImpostor,{mass:0,restitution:.2},e);const v=d.CreateCylinder("cylinder",{diameter:10,height:10,faceColors:[new i(0,0,0).toColor4(),new i(0,0,0).toColor4(),new i(0,0,0).toColor4()]},e);v.material=u,v.position.set(0,-5,0),V(e,C),l.map(({skybox:s},t,{length:c})=>{const n=d.CreateSphere("cube-button",{diameter:.9},e);n.parent=a,n.position.set(-1.5+3*t/(c-1),3,10),n.material=s.material,n.renderingGroupId=1,n.actionManager=new M(e),n.actionManager.registerAction(new k(M.OnPickTrigger,()=>f(t)));var p=0;e.onBeforeRenderObservable.add(()=>{const T=s.isEnabled()?10:3;p+=o.getDeltaTime()/1e3/10*T,n.rotation.set(0,-p,0)})});function y(){e.debugLayer.show()}function x(){a.attachControl(r,!1)}const w={debug:y,enableCamera:x};return console.debug("hax",w),Object.assign(window,{hax:w}),e}async function V(o,r){for(var e=0;e<100;e++)H(o,r),await z(10)}function H(o,r){const e=new i;i.HSVtoRGBToRef(Math.random()*360,.5,1,e);const a=d.CreateBox("cube",{size:1,faceColors:[e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4(),e.toColor4()]},o);return a.material=r,a.position.set(Math.random()*5-2.5,25+Math.random()*25,Math.random()*5-2.5),a.physicsImpostor=new m(a,m.BoxImpostor,{mass:1,restitution:.5},o),a}function z(o){return new Promise(r=>setTimeout(r,o))}export{Y as createScene};