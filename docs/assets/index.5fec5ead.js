import{E as w,A as h,V as u}from"./vendor.a6be2030.js";const v=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}};v();const E="modulepreload",l={},y="/",a=function(i,n){return!n||n.length===0?i():Promise.all(n.map(r=>{if(r=`${y}${r}`,r in l)return;l[r]=!0;const e=r.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${o}`))return;const s=document.createElement("link");if(s.rel=e?"stylesheet":E,e||(s.as="script",s.crossOrigin=""),s.href=r,document.head.appendChild(s),e)return new Promise((_,m)=>{s.addEventListener("load",_),s.addEventListener("error",m)})})).then(()=>i())},p=1;function g(t,i){const n=t.getContext("2d");if(!n)throw new Error;const r=i(n,t);function e(){t.width=t.clientWidth/p,t.height=t.clientHeight/p,r.draw()}return window.addEventListener("resize",e),e(),r.draw(),()=>{console.log("Shutting down Canvas-based app."),window.removeEventListener("resize",e),r.dispose()}}function L(t,i){const n=new w(t,!0);try{let r=function(){n.resize()};n.displayLoadingUI();const e=i(n,t);return e.cameras[0]||x(t,e),n.runRenderLoop(function(){e.render()}),window.addEventListener("resize",r),()=>{console.log("Shutting down Babylon scene."),n.stopRenderLoop(),window.removeEventListener("resize",r),e.dispose(),n.dispose()}}finally{n.hideLoadingUI()}}function x(t,i){const n=new h("Camera",Math.PI/6,Math.PI/4,20,u.Zero(),i);return n.attachControl(t,!1),n.setTarget(u.Zero()),n}function A(t){switch(t){case"./apps/animated-player-character/index.ts":return a(()=>import("./index.760f9231.js"),["assets/index.760f9231.js","assets/vendor.a6be2030.js"]);case"./apps/chladni/index.ts":return a(()=>import("./index.d42d0a7f.js"),[]);case"./apps/cubes/index.ts":return a(()=>import("./index.1ead4699.js"),["assets/index.1ead4699.js","assets/vendor.a6be2030.js","assets/cannon.df6abc6b.js"]);case"./apps/image-based-lighting/index.ts":return a(()=>import("./index.5efbb6fa.js"),["assets/index.5efbb6fa.js","assets/vendor.a6be2030.js","assets/cannon.df6abc6b.js"]);case"./apps/welcome/index.ts":return a(()=>import("./index.a0c6c032.js"),["assets/index.a0c6c032.js","assets/vendor.a6be2030.js"]);default:return new Promise(function(i,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+t)))})}}function b(t){switch(t){case"./apps/animated-player-character/index.ts":return a(()=>import("./index.760f9231.js"),["assets/index.760f9231.js","assets/vendor.a6be2030.js"]);case"./apps/chladni/index.ts":return a(()=>import("./index.d42d0a7f.js"),[]);case"./apps/cubes/index.ts":return a(()=>import("./index.1ead4699.js"),["assets/index.1ead4699.js","assets/vendor.a6be2030.js","assets/cannon.df6abc6b.js"]);case"./apps/image-based-lighting/index.ts":return a(()=>import("./index.5efbb6fa.js"),["assets/index.5efbb6fa.js","assets/vendor.a6be2030.js","assets/cannon.df6abc6b.js"]);case"./apps/welcome/index.ts":return a(()=>import("./index.a0c6c032.js"),["assets/index.a0c6c032.js","assets/vendor.a6be2030.js"]);default:return new Promise(function(i,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+t)))})}}var c=null;f(document.querySelector("canvas"),"welcome");async function P(t,i){if(!t)throw new Error;if(!i)throw new Error;d();const r=(await b(`./apps/${i}/index.ts`)).startCanvasApp;c=g(t,r)}async function f(t,i){if(!t)throw new Error;if(!i)throw new Error;d();const r=(await A(`./apps/${i}/index.ts`)).createScene;c=L(t,r)}function d(){c&&c(),c=null}document.addEventListener("slide-activated",t=>{var o;const i=t.target.querySelector("canvas"),n=(o=t.detail)==null?void 0:o.dataset,{canvas:r,babylon:e}=n;r?P(i,r):e&&f(i,e)});document.addEventListener("slide-deactivated",d);
