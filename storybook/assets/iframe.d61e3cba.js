var me=Object.defineProperty;var N=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable;var I=(e,t,r)=>t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,L=(e,t)=>{for(var r in t||(t={}))pe.call(t,r)&&I(e,r,t[r]);if(N)for(var r of N(t))ve.call(t,r)&&I(e,r,t[r]);return e};import{e as A,o as G,w as he,g as ge,c as P,a as _e,R as xe,G as be,F as ye,A as we,T as R,b as Se,u as Ae,V as k,m as Re,s as Te,d as Be,f as Me,t as Ee,r as v,h as Fe,i as $e,j as H,k as z,l as Ue,n as Oe,D as Ne,p as T,q as V,v as j,x as W,y as Y,z as x,B as m,C as b,E as Ie,H as C,I as S,J as Le,K as Z,L as Pe,M as ke,N as Ce,O as De,P as qe,Q as Ge,S as He,U as ze,W as Ve,X as je,Y as We,Z as Ye,_ as Ze,$ as Xe,a0 as Ke,a1 as D,a2 as Je,a3 as Qe,a4 as et,a5 as tt,a6 as rt,a7 as nt,a8 as ot,a9 as at,aa as st,ab as it,ac as ct,ad as lt,ae as ut,af as dt,ag as ft,ah as mt}from"./vendor.6eee0e10.js";const pt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}};pt();const vt={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}};var ht=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",parameters:vt});function q(e,t,r){const o=e.createShader(t);if(o===null)return A("Shader could not be created");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){const n=e.getShaderInfoLog(o);return e.deleteShader(o),A(`Shader could not be compiled. Log: ${n}`)}return G(o)}function X(e,t,r){const o=q(e,e.VERTEX_SHADER,t),n=q(e,e.FRAGMENT_SHADER,r);if(o.isErr||n.isErr){const c=["Error during shader creation.",o.isErr?o.error:"",n.isErr?n.error:""];return A(c.join(" "))}const i=e.createProgram();return i===null?A("Error during program creation"):(e.attachShader(i,o.value),e.attachShader(i,n.value),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?G(i):A(`Error during program linking: ${e.getProgramInfoLog(i)}`))}var gt=`precision highp float;\r
\r
uniform vec2 iResolution;\r
uniform vec2 iMouse;\r
uniform float iTime;\r
uniform float iBrightness;\r
uniform float iCoronaFactor;\r
uniform float iSphereRadius;\r
uniform float iTotalRadius;\r
uniform float iGlowFactor;\r
\r
uniform sampler2D iChannel0;\r
\r
float snoise(vec3 uv, float res) { // by trisomie21\r
    const vec3 s = vec3(1e0, 1e2, 1e4);\r
\r
    uv *= res;\r
\r
    vec3 uv0 = floor(mod(uv, res)) * s;\r
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;\r
\r
    vec3 f = fract(uv);\r
    f = f * f * (3.0 - 2.0 * f);\r
\r
    vec4 v = vec4(\r
        uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,\r
        uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z\r
    );\r
\r
    vec4 r = fract(sin(v * 1e-3) * 1e5);\r
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
\r
    r = fract(sin((v + uv1.z - uv0.z) * 1e-3) * 1e5);\r
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
\r
    return mix(r0, r1, f.z) * 2.0 - 1.0;\r
}\r
\r
float rng(in vec2 pos) {\r
    return fract(sin(pos.y + pos.x * 78.233) * 43758.5453) * 2.0 - 1.0;\r
}\r
\r
float perlin(in float pos) {\r
    float a = rng(vec2(floor(pos), 1.0));\r
    float b = rng(vec2(ceil(pos), 1.0));\r
\r
    float a_x = rng(vec2(floor(pos), 2.0));\r
    float b_x = rng(vec2(ceil(pos), 2.0));\r
\r
    a += a_x * fract(pos);\r
    b += b_x * (fract(pos) - 1.0);\r
\r
    return a + (b - a) * smoothstep(0.0, 1.0, fract(pos));\r
}\r
\r
#define SMOOTH_PERLIN_PARAMS_SIZE     2.0,  4.0,  8.0, 16.0, 32.0, 64.0\r
#define SMOOTH_PERLIN_PARAMS_ANGLE_0  3.0,  3.0,  3.0,  6.0, 10.0, 50.0\r
#define SMOOTH_PERLIN_PARAMS_ANGLE_1  50.0, 10.0, 6.0,  3.0,  3.0,  3.0\r
\r
float smoothPerlin(float offset, float a, float b, float c, float d, float e, float f) {\r
    return (sin(offset * a) * b + tan(offset * c) * d + cos(offset * e) * f) / (b + d + f);\r
}\r
\r
float tanh(float x) {\r
    return (exp(2.0 * x) - 1.0) / (exp(2.0 * x) + 1.0);\r
}\r
\r
vec3 orange		= vec3(0.8, 0.65, 0.3);\r
vec3 orangeRed  = vec3(0.8, 0.35, 0.1);\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    float radius	 = (0.24 + iBrightness * 0.2) * iSphereRadius;\r
    float invRadius  = 1.0 / radius;\r
\r
    float time	 = iTime * 0.1;\r
    float aspect = iResolution.x / iResolution.y;\r
    vec2 uv		 = fragCoord.xy / (iResolution.xy * iTotalRadius);\r
    vec2 p 		 = (-0.5 / iTotalRadius) + uv;\r
    p.x *= aspect;\r
\r
    float fade	= pow(length(2.0 * p), 0.5);\r
    float fVal1	= 1.0 - fade;\r
    float fVal2	= 1.0 - fade;\r
\r
    float angle	= atan(p.x, p.y) / 6.2832;\r
    float dist	= length(p);\r
    vec3 coord	= vec3(angle, dist, time * 0.1);\r
\r
    float newTime1 = abs(snoise(coord + vec3(0.0, -time * (0.35 + iBrightness * 0.001), time * 0.015), 15.0));\r
    float newTime2 = abs(snoise(coord + vec3(0.0, -time * (0.15 + iBrightness * 0.001), time * 0.015), 45.0));\r
    for(int i=1; i<=7; i++) {\r
        float power = pow(2.0, float(i + 1));\r
        fVal1 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2), (power * 10.0 * (newTime1 + 1.0)));\r
        fVal2 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2), (power * 25.0 * (newTime2 + 1.0)));\r
    }\r
\r
    float corona  = pow(fVal1 * max(1.1 - fade, 0.0), 2.0) * 50.0;\r
    corona		 += pow(fVal2 * max(1.1 - fade, 0.0), 2.0) * 50.0;\r
    corona		 *= 1.2 - newTime1;\r
\r
    vec2 sp = (-1.0 / iTotalRadius) + 2.0 * uv;\r
    sp.x *= aspect;\r
    sp *= 2.0 - iBrightness;\r
    float r = dot(sp, sp);\r
    float f = (1.0 - sqrt(abs(1.0 - r))) / r + iBrightness * 0.5;\r
\r
    vec3 starSphere	= vec3(0.0);\r
\r
    float distInRadiusFactor = clamp(floor(radius / dist), 0.0, 1.0);\r
\r
    corona *= max(pow(dist * invRadius * max(0.0, iGlowFactor), 24.0) * distInRadiusFactor, 1.0);\r
    vec2 baseUv = sp.xy * f;\r
\r
    float textureSizeModifier1 = pow(smoothPerlin(time * 0.15, SMOOTH_PERLIN_PARAMS_SIZE), 1.5);\r
\r
    float texture0Angle = smoothPerlin(time / 10.0, SMOOTH_PERLIN_PARAMS_ANGLE_0);\r
    float texture1Angle = smoothPerlin(time / 12.50, SMOOTH_PERLIN_PARAMS_ANGLE_1);\r
\r
    vec3 starTexture0 = texture2D(iChannel0, baseUv + normalize(vec2(sin(texture0Angle), cos(texture0Angle)))).rgb * 0.5;\r
\r
    starSphere = sqrt(starTexture0 * 0.3) * distInRadiusFactor;\r
\r
    float starGlow = min(max(1.0 - dist * (1.0 - iBrightness), 0.0), 1.0);\r
    fragColor.rgb  = vec3(f * (0.75 + iBrightness * 0.3) * orange) * iGlowFactor * 2.2 + starSphere * iGlowFactor +  corona * orange * max(iCoronaFactor, 0.0) + starGlow * orangeRed;\r
    fragColor.a	   = (-tanh((dist * 2.5)) + 1.0) / 2.0;\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
`,_t=`attribute vec4 a_position;\r
\r
void main() {\r
    gl_Position = a_position;\r
}\r
`;const xt=5,bt=["vsco2-piano-mf","explosion"],K=e=>{e.triggerAttack("C4",`+${1+Math.random()*.1-.05}`),e.triggerAttack("G4",`+${1+Math.random()*.1-.05}`);const t=6+Math.random()*6;e.triggerAttack("C4",`+${t+Math.random()*.1-.05}`),e.triggerAttack("A4",`+${t+Math.random()*.1-.05}`);const r=t+1+Math.random()*4;Math.random()<.9&&(e.triggerAttack("C4",`+${r+Math.random()*.1-.05}`),e.triggerAttack("F4",`+${r+Math.random()*.1-.05}`));const n=new Date().getMinutes();Math.random()<n/60&&e.triggerAttack("C6",`+${1+Math.random()}`),Math.random()<.2&&e.triggerAttack("E6",`+${1+Math.random()*t}`),Math.random()<n%3/3&&e.triggerAttack("A6",`+${t+Math.random()}`),Math.random()<(60-n)/60&&e.triggerAttack("C7",`+${r+Math.random()}`),R.scheduleOnce(()=>{K(e)},`+${r+Math.random()*10+5}`)},yt=async({sampleLibrary:e,onProgress:t})=>{const r=await e.request(ge(),bt),o=await Promise.all([P({samplesByNote:r["vsco2-piano-mf"],pitchShift:-12}),P({samplesByNote:r["vsco2-piano-mf"],pitchShift:-24})]),n=[];r.explosion&&(r.explosion[0].reverse=!0);const i=await _e({samples:r,sampleLibrary:e,sourceInstrumentName:"explosion",renderedInstrumentName:"lullaby__explosion",getDestination:()=>new xe(15).toDestination().generate(),onProgress:l=>t==null?void 0:t(l/2+.5)}),c=new be(.05),s=new ye(200).connect(c),d=i.get(0),a=()=>{const l=new Se(d).set({playbackRate:Math.random()*.1+.05,fadeOut:3,onended:()=>{const p=n.indexOf(l);p>-1&&n.splice(p,1)}}).connect(s);n.push(l),l.start(),R.scheduleOnce(()=>{a()},`+${Math.random()*100+60}`)};return[()=>{o.forEach(l=>l.dispose()),n.forEach(l=>l.dispose()),i.dispose()},({destination:l})=>{c.connect(l);const p=o.map(f=>{const h=new we(.01*Math.random()+.005).connect(l);return h.start(),f.connect(h),K(f),h});return a(),()=>{o.forEach(f=>{f.releaseAll(0)}),n.forEach(f=>{f.stop(0)}),p.forEach(f=>{f.dispose()})}}]};var wt=he(yt,{gain:xt});const J=Ae(()=>({music:new k(0).toDestination(),soundEffects:new k(0).toDestination()}));var Q=(e=>(e.PLAYING="playing",e.PAUSED="paused",e.STOPPED="stopped",e))(Q||{});async function St(){const{music:e}=J(),t=Re(),r=Te({format:"ogg",host:"/universatorial-extractination/samples"}),o=Be({sampleIndex:r,provider:t}),[n,i]=await wt({context:Me,sampleLibrary:o,destination:Ee(e)});let c=null;const s=v("stopped");function d(){s.value="playing",c===null&&(c=i()),R.start()}function a(){s.value="paused",R.stop()}function u(){s.value="stopped",R.cancel(),typeof c!="undefined"&&(c==null||c())}return{play:d,pause:a,stop:u,musicState:s}}const At={volumes:{music:1,soundEffects:1,master:1},shaderSuperSamplingFactor:1},ee=Fe("settings",()=>{const e=$e("settings",At),t=H(e.value);z(t,Ue(()=>{e.value=t},1e3));let r=!1;function o(){r||(Oe().then(()=>Rt(t)),r=!0)}return{state:t,initializeMusic:o}});async function Rt(e){const t=J(),{play:r,pause:o,musicState:n}=await St();z(e.volumes,async()=>{t.music.volume.value=-20+20*e.volumes.music,Ne.volume.value=-50+35*e.volumes.master,e.volumes.music>0&&e.volumes.master>0&&n.value!==Q.PLAYING&&r(),(e.volumes.music===0||e.volumes.master===0)&&o()},{immediate:!0})}var B=(e,t)=>{const r=e.__vccOpts||e;for(const[o,n]of t)r[o]=n;return r};const Tt=["width","height"],te=T({props:{speedFactor:{default:1},brightness:{default:0},coronaFactor:{default:1},sphereRadius:{default:1},totalRadius:{default:1},glowFactor:{default:1}},setup(e){const t=e,r=v(),{width:o,height:n}=V(r);v();const i=ee(),c=j(()=>Math.max(Math.pow(t.speedFactor+10,2)/100,.01));return W(()=>{let s=!0;Y(()=>{s=!1});const d=r.value.getContext("webgl");if(d===null)return;const a=d,u=X(a,_t,gt);if(u.isErr)return console.error(u.error);const y=a.getAttribLocation(u.value,"a_position"),l=a.getUniformLocation(u.value,"iResolution"),p=a.getUniformLocation(u.value,"iTime"),f=a.getUniformLocation(u.value,"iBrightness"),h=a.getUniformLocation(u.value,"iCoronaFactor"),w=a.getUniformLocation(u.value,"iSphereRadius"),de=a.getUniformLocation(u.value,"iTotalRadius"),fe=a.getUniformLocation(u.value,"iGlowFactor"),E=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,E),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),a.STATIC_DRAW);const F=v(0),$=v(0);function U(O){if(!s){console.log("stopping rendering star :(");return}$.value+=(O-F.value)*c.value,F.value=O,a.viewport(0,0,a.canvas.width,a.canvas.height),a.useProgram(u.value),a.enableVertexAttribArray(y),a.bindBuffer(a.ARRAY_BUFFER,E),a.vertexAttribPointer(y,2,a.FLOAT,!1,0,0),a.uniform2f(l,a.canvas.width,a.canvas.height),a.uniform1f(p,m($)/1e3),a.uniform1f(f,t.brightness),a.uniform1f(h,t.coronaFactor),a.uniform1f(w,t.sphereRadius),a.uniform1f(de,t.totalRadius),a.uniform1f(fe,t.glowFactor),a.drawArrays(a.TRIANGLES,0,6),requestAnimationFrame(U)}requestAnimationFrame(U)}),(s,d)=>(b(),x("canvas",{ref_key:"canvas",ref:r,width:m(o)*m(i).state.shaderSuperSamplingFactor,height:m(n)*m(i).state.shaderSuperSamplingFactor},null,8,Tt))}});var re=B(te,[["__scopeId","data-v-2f3d345a"]]);te.__docgenInfo={exportName:"default",displayName:"Star",description:"",tags:{},props:[{name:"speedFactor",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"brightness",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"coronaFactor",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"sphereRadius",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"totalRadius",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"glowFactor",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}}]};var Bt={parameters:{storySource:{source:`import { reactive } from "vue"

import Star from "./Star.vue"

export default {
  title: "Shaders/Star",
  component: Star,
}

const param = (value: number, min: number, max: number) =>
  reactive({ value, min, max })

// storybook remounts the component on every control value change
// this means it's best to implement our own control system for now
const paramRow = (name: string, key: string, step: number) => \`
  <tr>
    <td>\${name}</td>
    <td><input type="number" v-model.number="\${key}.min" /></td>
    <td><input type="range" v-model.number="\${key}.value" :min="\${key}.min" :max="\${key}.max" step="\${step}" /></td>
    <td><input type="number" v-model.number="\${key}.max" /></td>
    <td>{{ \${key}.value }}</td>
  </tr>
\`

const Template = (args: never) => ({
  components: { Star },
  setup: () => ({
    args,
    width: param(1000, 256, 1920),
    height: param(600, 256, 1920),
    speedFactor: param(0, -10, 20),
    brightness: param(0, 0, 1),
    coronaFactor: param(1, 0, 5),
    sphereRadius: param(1, 0, 1),
    totalRadius: param(1, 0, 2),
    glowFactor: param(1, 0, 2),
  }),
  template: \`
    Based on <a href="https://www.shadertoy.com/view/4dXGR4">https://www.shadertoy.com/view/4dXGR4</a><br />
    <div :style="{ width: \\\`\\\${width.value}px\\\`, height: \\\`\\\${height.value}px\\\` }">
      <star
        :speed-factor="speedFactor.value"
        :brightness="brightness.value"
        :corona-factor="coronaFactor.value"
        :sphere-radius="sphereRadius.value"
        :total-radius="totalRadius.value"
        :glow-factor="glowFactor.value"
      />
    </div>
    <br />
    <table>
      <thead>
      <tr>
        <th>variable</th>
        <th>min</th>
        <th></th>
        <th>max</th>
        <th>value</th>
      </tr>
      </thead>
      \${paramRow("Width", "width", 1)}
      \${paramRow("Height", "height", 1)}
      \${paramRow("Speed factor", "speedFactor", 0.01)}
      \${paramRow("Brightness", "brightness", 0.01)}
      \${paramRow("Corona factor", "coronaFactor", 0.01)}
      \${paramRow("Sphere radius", "sphereRadius", 0.01)}
      \${paramRow("Total radius", "totalRadius", 0.01)}
      \${paramRow("Glow factor", "glowFactor", 0.01)}
    </table>
  \`,
})

export const Default = Template.bind({})
`,locationsMap:{default:{startLoc:{col:17,line:25},endLoc:{col:2,line:71},startBody:{col:17,line:25},endBody:{col:2,line:71}}}}},title:"Shaders/Star",component:re};const g=(e,t,r)=>H({value:e,min:t,max:r}),_=(e,t,r)=>`
  <tr>
    <td>${e}</td>
    <td><input type="number" v-model.number="${t}.min" /></td>
    <td><input type="range" v-model.number="${t}.value" :min="${t}.min" :max="${t}.max" step="${r}" /></td>
    <td><input type="number" v-model.number="${t}.max" /></td>
    <td>{{ ${t}.value }}</td>
  </tr>
`,Mt=e=>({components:{Star:re},setup:()=>({args:e,width:g(1e3,256,1920),height:g(600,256,1920),speedFactor:g(0,-10,20),brightness:g(0,0,1),coronaFactor:g(1,0,5),sphereRadius:g(1,0,1),totalRadius:g(1,0,2),glowFactor:g(1,0,2)}),template:`
    Based on <a href="https://www.shadertoy.com/view/4dXGR4">https://www.shadertoy.com/view/4dXGR4</a><br />
    <div :style="{ width: \`\${width.value}px\`, height: \`\${height.value}px\` }">
      <star
        :speed-factor="speedFactor.value"
        :brightness="brightness.value"
        :corona-factor="coronaFactor.value"
        :sphere-radius="sphereRadius.value"
        :total-radius="totalRadius.value"
        :glow-factor="glowFactor.value"
      />
    </div>
    <br />
    <table>
      <thead>
      <tr>
        <th>variable</th>
        <th>min</th>
        <th></th>
        <th>max</th>
        <th>value</th>
      </tr>
      </thead>
      ${_("Width","width",1)}
      ${_("Height","height",1)}
      ${_("Speed factor","speedFactor",.01)}
      ${_("Brightness","brightness",.01)}
      ${_("Corona factor","coronaFactor",.01)}
      ${_("Sphere radius","sphereRadius",.01)}
      ${_("Total radius","totalRadius",.01)}
      ${_("Glow factor","glowFactor",.01)}
    </table>
  `}),Et=Mt.bind({}),Ft=["Default"];var $t=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Bt,Default:Et,__namedExportsOrder:Ft});const Ut={class:"ui-box-border"},Ot=Ie('<div class="borders" data-v-28242d9c><svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" data-v-28242d9c><path d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500" vector-effect="non-scaling-stroke" data-v-28242d9c></path></svg><svg class="highlight" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" data-v-28242d9c><path d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500" vector-effect="non-scaling-stroke" data-v-28242d9c></path></svg></div>',1),Nt=[Ot],ne=T({props:{animated:{type:Boolean,default:!0}},setup(e){return v("#444444"),(t,r)=>(b(),x("div",Ut,Nt))}});var M=B(ne,[["__scopeId","data-v-28242d9c"]]);ne.__docgenInfo={exportName:"default",displayName:"UiBoxBorder",description:"",tags:{},props:[{name:"animated",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}]};const It={class:"ui-box"},Lt={class:"content"},oe=T({props:{opacity:{default:1}},setup(e){return(t,r)=>(b(),x("div",It,[C("div",{class:"border",style:Le({opacity:e.opacity})},[S(M,{class:"top left"}),S(M,{class:"top right"}),S(M,{class:"bottom left"}),S(M,{class:"bottom right"})],4),C("div",Lt,[Z(t.$slots,"default",{},void 0,!0)])]))}});var ae=B(oe,[["__scopeId","data-v-21577d29"]]);oe.__docgenInfo={exportName:"default",displayName:"UiBox",description:"",tags:{},props:[{name:"opacity",required:!0,type:{name:"number"},defaultValue:{func:!1,value:"1"}}],slots:[{name:"default"}]};var Pt={parameters:{storySource:{source:`import UiBox from "./UiBox.vue"

export default {
  title: "UI/Box",
  component: UiBox,
}

const Template = (args: never) => ({
  setup: () => ({ args }),
  components: { UiBox },
  template: \`<ui-box><span>Some very interesting content</span></ui-box>\`,
})

export const Default = Template.bind({})
`,locationsMap:{default:{startLoc:{col:17,line:8},endLoc:{col:2,line:12},startBody:{col:17,line:8},endBody:{col:2,line:12}}}}},title:"UI/Box",component:ae};const kt=e=>({setup:()=>({args:e}),components:{UiBox:ae},template:"<ui-box><span>Some very interesting content</span></ui-box>"}),Ct=kt.bind({}),Dt=["Default"];var qt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Pt,Default:Ct,__namedExportsOrder:Dt});const Gt={HiLogout:ke,HiDocumentText:Ce,HiDownload:De,HiUpload:qe,HiSolidLightningBolt:Ge,HiSolidChip:He,HiLightningBolt:ze,HiChip:Ve,HiChevronLeft:je,IoSettings:We};Pe(...Object.values(Gt));const Ht={key:0,class:"icon"},se=T({props:{icon:null,type:{default:"primary"}},setup(e){const t=e,r=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g,"$1-$2").toLowerCase(),o=j(()=>r(t.icon||""));return(n,i)=>(b(),x("button",{class:Xe(["ui-button",e.type])},[e.icon?(b(),x("span",Ht,[S(m(Ye),{name:m(o)},null,8,["name"])])):Ze("",!0),Z(n.$slots,"default",{},void 0,!0)],2))}});var ie=B(se,[["__scopeId","data-v-daa88b22"]]);se.__docgenInfo={exportName:"default",displayName:"UiButton",description:"",tags:{},props:[{name:"icon",required:!1,type:{name:"PossibleIcons"}},{name:"type",required:!1,type:{name:"union",elements:[{name:'"primary"'},{name:'"secondary"'}]},defaultValue:{func:!1,value:'"primary"'}}],slots:[{name:"default"}]};var zt={parameters:{storySource:{source:`import UiButton from "./UiButton.vue"
import { action } from "@storybook/addon-actions"

export default {
  title: "UI/Button",
  component: UiButton,
}

const Template = (args: never) => ({
  setup: () => ({ args, click: action("click") }),
  components: { UiButton },
  template: \`<ui-button @click="click">Click me!</ui-button>\`,
})

export const Default = Template.bind({})
`,locationsMap:{default:{startLoc:{col:17,line:9},endLoc:{col:2,line:13},startBody:{col:17,line:9},endBody:{col:2,line:13}}}}},title:"UI/Button",component:ie};const Vt=e=>({setup:()=>({args:e,click:Ke("click")}),components:{UiButton:ie},template:'<ui-button @click="click">Click me!</ui-button>'}),jt=Vt.bind({}),Wt=["Default"];var Yt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:zt,Default:jt,__namedExportsOrder:Wt}),Zt=`precision highp float;\r
\r
uniform vec2 iResolution;\r
uniform vec2 iMouse;\r
uniform float iTime;\r
\r
float field(in vec3 p, float s) {\r
    float strength = 7.0 + 0.03 * log(1.0e-6 + fract(sin(iTime) * 4373.11));\r
    float accum = s / 4.0;\r
    float prev = 0.0;\r
    float tw = 0.0;\r
    for (int i = 0; i < 26; ++i) {\r
        float mag = dot(p, p);\r
        p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);\r
        float w = exp(-float(i) / 7.0);\r
        accum += w * exp(-strength * pow(abs(mag - prev), 2.2));\r
        tw += w;\r
        prev = mag;\r
    }\r
    return max(0.0, 5.0 * accum / tw - 0.7);\r
}\r
\r
float field2(in vec3 p, float s) {\r
    float strength = 7.0 + 0.03 * log(1.0e-6 + fract(sin(iTime) * 4373.11));\r
    float accum = s / 4.;\r
    float prev = 0.0;\r
    float tw = 0.0;\r
    for (int i = 0; i < 18; ++i) {\r
        float mag = dot(p, p);\r
        p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);\r
        float w = exp(-float(i) / 7.0);\r
        accum += w * exp(-strength * pow(abs(mag - prev), 2.2));\r
        tw += w;\r
        prev = mag;\r
    }\r
    return max(0.0, 5.0 * accum / tw - 0.7);\r
}\r
\r
vec3 nrand3(vec2 co) {\r
    vec3 a = fract(cos(co.x * 8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));\r
    vec3 b = fract(sin(co.x * 0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));\r
    vec3 c = mix(a, b, 0.5);\r
    return c;\r
}\r
\r
#define SMOOTH_NOISE_PARAMS0   2.0,  4.0,  8.0, 16.0, 32.0, 64.0\r
#define SMOOTH_NOISE_PARAMS1   3.0,  3.0,  3.0,  6.0, 10.0, 50.0\r
#define SMOOTH_NOISE_PARAMS2  50.0, 10.0,  6.0,  3.0,  3.0,  3.0\r
#define SMOOTH_NOISE_PARAMS3  60.0, 15.0,  3.0,  3.0,  8.0,  9.0\r
\r
float smoothNoise(float offset, float a, float b, float c, float d, float e, float f) {\r
    return cos(offset) * (sin(offset * a) * b + tan(offset * c) * d + cos(offset * e) * f) / (b + d + f);\r
}\r
\r
float freqs[4];\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = 2.0 * fragCoord.xy / iResolution.xy - 1.0;\r
    vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);\r
    vec3 p = vec3(uvs / 4.0, 0) + vec3(1.0, -1.3, 0.0);\r
    p += 0.2 * vec3(sin(iTime / 16.0), sin(iTime / 12.0),  sin(iTime / 128.0));\r
\r
    freqs[0] = smoothNoise(iTime * 1.0e-3, SMOOTH_NOISE_PARAMS0);\r
    freqs[1] = smoothNoise(iTime * 1.0e-3, SMOOTH_NOISE_PARAMS1);\r
    freqs[2] = smoothNoise(iTime * 1.0e-3, SMOOTH_NOISE_PARAMS2);\r
    freqs[3] = smoothNoise(iTime * 1.0e-3, SMOOTH_NOISE_PARAMS3);\r
\r
    float t = field(p, freqs[2]);\r
    float v = (1.0 - exp((abs(uv.x) - 1.0) * 6.0)) * (1.0 - exp((abs(uv.y) - 1.0) * 6.0));\r
\r
    vec3 p2 = vec3(uvs / (4.0 + sin(iTime * 0.11) * 0.2 + 0.2 + sin(iTime * 0.15) * 0.3 + 0.4), 1.5) + vec3(2.0, -1.3, -1.0);\r
    p2 += 0.25 * vec3(sin(iTime / 160.0), sin(iTime / 120.0),  sin(iTime / 1280.0));\r
    float t2 = field2(p2, freqs[3]);\r
    vec4 c2 = mix(0.4, 1.0, v) * vec4(1.3 * t2 * t2 * t2, 1.8 * t2 * t2 ,t2 * freqs[0], t2) * freqs[3];\r
\r
    vec2 seed = p.xy * 2.0;\r
    seed = floor(seed * iResolution.x);\r
    vec3 rnd = nrand3(seed);\r
    vec4 starcolor = vec4(pow(rnd.y, 40.0));\r
\r
    vec2 seed2 = p2.xy * 2.0;\r
    seed2 = floor(seed2 * iResolution.x);\r
    vec3 rnd2 = nrand3(seed2);\r
    starcolor += vec4(pow(rnd2.y, 40.0));\r
\r
    fragColor = mix(freqs[3] - 0.3, 1.0, v) * vec4(1.5 * freqs[2] * t * t * t, 1.2 * freqs[1] * t * t, freqs[3] * t, 1.0) + c2 + starcolor;\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
`,Xt=`attribute vec4 a_position;\r
\r
void main() {\r
    gl_Position = a_position;\r
}\r
`;const Kt=["width","height"],ce=T({setup(e){const t=v(),{width:r,height:o}=V(t),n=ee();return W(async()=>{let i=!0;Y(()=>{i=!1});const c=t.value.getContext("webgl");if(c===null)return;const s=c,d=X(s,Xt,Zt);if(d.isErr)return console.error(d.error);const a=s.getAttribLocation(d.value,"a_position"),u=s.getUniformLocation(d.value,"iResolution"),y=s.getUniformLocation(d.value,"iTime"),l=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,l),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),s.STATIC_DRAW);const p=v(0),f=v(0);function h(w){!i||(f.value+=w-p.value,p.value=w,s.viewport(0,0,s.canvas.width,s.canvas.height),s.useProgram(d.value),s.enableVertexAttribArray(a),s.bindBuffer(s.ARRAY_BUFFER,l),s.vertexAttribPointer(a,2,s.FLOAT,!1,0,0),s.uniform2f(u,s.canvas.width,s.canvas.height),s.uniform1f(y,w/1e5),s.drawArrays(s.TRIANGLES,0,6),requestAnimationFrame(h))}requestAnimationFrame(h)}),(i,c)=>(b(),x("canvas",{ref_key:"canvas",ref:t,width:m(r)*m(n).state.shaderSuperSamplingFactor,height:m(o)*m(n).state.shaderSuperSamplingFactor},null,8,Kt))}});var le=B(ce,[["__scopeId","data-v-1556fbd8"]]);ce.__docgenInfo={exportName:"default",displayName:"Universe",description:"",tags:{}};var Jt={parameters:{storySource:{source:`import Universe from "@/components/Universe.vue"

export default {
  title: "Shaders/Universe",
  component: Universe,
}

const Template = (args: never) => ({
  setup: () => ({ args }),
  components: { Universe },
  template: \`
    Based on <a href="https://www.shadertoy.com/view/MslGWN">https://www.shadertoy.com/view/MslGWN</a>
    <div style="width: 800px; height: 800px; background: black">
      <universe />
    </div>
  \`,
})

export const Default = Template.bind({})
`,locationsMap:{default:{startLoc:{col:17,line:8},endLoc:{col:2,line:17},startBody:{col:17,line:8},endBody:{col:2,line:17}}}}},title:"Shaders/Universe",component:le};const Qt=e=>({setup:()=>({args:e}),components:{Universe:le},template:`
    Based on <a href="https://www.shadertoy.com/view/MslGWN">https://www.shadertoy.com/view/MslGWN</a>
    <div style="width: 800px; height: 800px; background: black">
      <universe />
    </div>
  `}),er=Qt.bind({}),tr=["Default"];var rr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Jt,Default:er,__namedExportsOrder:tr});const nr=[ot,at,st,it,ct,lt,ut,dt,ft,mt,ht];nr.forEach(e=>{Object.keys(e).forEach(t=>{const r=e[t];switch(t){case"args":case"argTypes":return rt.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(r));case"decorators":return r.forEach(o=>tt(o,!1));case"loaders":return r.forEach(o=>et(o,!1));case"parameters":return D(L({},r),!1);case"argTypesEnhancers":return r.forEach(o=>Qe(o));case"argsEnhancers":return r.forEach(o=>Je(o));case"globals":case"globalTypes":{const o={};return o[t]=r,D(o,!1)}case"decorateStory":case"renderToDOM":return null;default:return console.log(t+" was not supported :( !")}})});function ue(e){return{"/home/timon/projects/universatorial-extractination/src/components/Star.stories.ts":$t,"/home/timon/projects/universatorial-extractination/src/components/ui/UiBox.stories.ts":qt,"/home/timon/projects/universatorial-extractination/src/components/ui/UiButton.stories.ts":Yt,"/home/timon/projects/universatorial-extractination/src/components/Universe.stories.ts":rr}[e]}Object.assign(ue,{keys:()=>["/home/timon/projects/universatorial-extractination/src/components/Star.stories.ts","/home/timon/projects/universatorial-extractination/src/components/ui/UiBox.stories.ts","/home/timon/projects/universatorial-extractination/src/components/ui/UiButton.stories.ts","/home/timon/projects/universatorial-extractination/src/components/Universe.stories.ts"],resolve:e=>({"/home/timon/projects/universatorial-extractination/src/components/Star.stories.ts":"./src/components/Star.stories.ts","/home/timon/projects/universatorial-extractination/src/components/ui/UiBox.stories.ts":"./src/components/ui/UiBox.stories.ts","/home/timon/projects/universatorial-extractination/src/components/ui/UiButton.stories.ts":"./src/components/ui/UiButton.stories.ts","/home/timon/projects/universatorial-extractination/src/components/Universe.stories.ts":"./src/components/Universe.stories.ts"})[e]});nt(ue,{hot:!1},!1);
//# sourceMappingURL=iframe.d61e3cba.js.map
