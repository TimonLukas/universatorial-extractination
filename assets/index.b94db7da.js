var Ze=Object.defineProperty,Xe=Object.defineProperties;var Je=Object.getOwnPropertyDescriptors;var xe=Object.getOwnPropertySymbols;var Qe=Object.prototype.hasOwnProperty,et=Object.prototype.propertyIsEnumerable;var we=(e,t,r)=>t in e?Ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Y=(e,t)=>{for(var r in t||(t={}))Qe.call(t,r)&&we(e,r,t[r]);if(xe)for(var r of xe(t))et.call(t,r)&&we(e,r,t[r]);return e},ie=(e,t)=>Xe(e,Je(t));import{d as E,r as b,o as p,c as S,a as tt,b as u,e as v,n as ce,f as H,w as rt,H as nt,g as ot,h as st,i as at,j as it,k as ct,l as lt,m as ut,p as dt,I as ft,q as $,s as g,u as n,t as le,v as de,x as re,y as L,z as vt,A,B as R,C as pt,D as mt,E as fe,F as ve,G as ne,J as oe,K as z,L as Oe,M as _t,N as gt,O as Ee,P as ht,R as yt,Q as bt,S as St,T as xt,U as j,V as wt,W,X as Ae,Y as Et,Z as At,_ as Rt,$ as Tt,a0 as Nt,a1 as It,a2 as Mt,a3 as pe,a4 as $t,a5 as Ct,a6 as Ot,a7 as T,a8 as w,a9 as ue,aa as ee,ab as Ft,ac as Ut,ad as Fe,ae as Lt,af as Bt,ag as Pt,ah as Dt,ai as Ue,aj as Gt,ak as kt,al as Le,am as Ht,an as Vt,ao as Yt,ap as qt,aq as zt,ar as jt}from"./vendor.652f54a1.js";const Kt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}};Kt();var O=(e,t)=>{const r=e.__vccOpts||e;for(const[a,s]of t)r[a]=s;return r};const Wt={class:"ui-box-border"},Zt=tt('<div class="borders" data-v-28242d9c><svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" data-v-28242d9c><path d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500" vector-effect="non-scaling-stroke" data-v-28242d9c></path></svg><svg class="highlight" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" data-v-28242d9c><path d="M -100,100 l 100,0 l 0,-100 l 100,0 l 0,-500" vector-effect="non-scaling-stroke" data-v-28242d9c></path></svg></div>',1),Xt=[Zt],Jt=E({props:{animated:{type:Boolean,default:!0}},setup(e){return b("#444444"),(t,r)=>(p(),S("div",Wt,Xt))}});var Z=O(Jt,[["__scopeId","data-v-28242d9c"]]);const Qt={class:"ui-box"},er={class:"content"},tr=E({props:{opacity:{default:1}},setup(e){return(t,r)=>(p(),S("div",Qt,[u("div",{class:"border",style:ce({opacity:e.opacity})},[v(Z,{class:"top left"}),v(Z,{class:"top right"}),v(Z,{class:"bottom left"}),v(Z,{class:"bottom right"})],4),u("div",er,[H(t.$slots,"default",{},void 0,!0)])]))}});var me=O(tr,[["__scopeId","data-v-21577d29"]]);const rr={HiLogout:nt,HiDocumentText:ot,HiDownload:st,HiUpload:at,HiSolidLightningBolt:it,HiSolidChip:ct,HiLightningBolt:lt,HiChip:ut,HiChevronLeft:dt,IoSettings:ft};rt(...Object.values(rr));const nr={key:0,class:"icon"},or=E({props:{icon:null,type:{default:"primary"}},setup(e){const t=e,r=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g,"$1-$2").toLowerCase(),a=g(()=>r(t.icon||""));return(s,o)=>(p(),S("button",{class:de(["ui-button",e.type])},[e.icon?(p(),S("span",nr,[v(n($),{name:n(a)},null,8,["name"])])):le("",!0),H(s.$slots,"default",{},void 0,!0)],2))}});var P=O(or,[["__scopeId","data-v-daa88b22"]]);const sr={class:"tabs"},ar={class:"content"},ir=E({props:{index:null},setup(e){const t=e,r=b(),a=re("--switcher-index",r);return L(()=>t.index,()=>{a.value=`${t.index}`}),(s,o)=>(p(),S("div",{class:"ui-content-switcher-box",ref_key:"switcher",ref:r},[u("div",sr,[H(s.$slots,"tabs")]),u("div",ar,[H(s.$slots,"content")])],512))}});const cr={class:"ui-slider"},X=E({props:{label:null,modelValue:null,min:{default:0},max:{default:1},step:{default:.01},unit:null,type:null,formatter:null},emits:["update:modelValue"],setup(e,{emit:t}){const r=e,a=b(),s=g(()=>{var i;return(i=a.value)==null?void 0:i.$el}),o=vt(r,"modelValue",t),l=g(()=>r.type==="percentage"?i=>`${Math.round(i*100)}%`:typeof r.formatter!="undefined"?r.formatter:i=>`${i}`),c=g(()=>l.value(o.value)),d=re("--tooltip-size",s);return L(o,()=>{d.value=(()=>{switch(c.value.length){case 3:return"2.25rem";case 4:return"2.5rem";case 5:return"2.75rem"}return"2rem"})()}),(i,f)=>(p(),S("div",cr,[u("label",null,[A(R(e.label)+":",1),u("span",null,R(n(c)),1)]),v(n(mt),{modelValue:n(o),"onUpdate:modelValue":f[0]||(f[0]=y=>pt(o)?o.value=y:null),min:e.min,max:e.max,interval:e.step,"tooltip-formatter":n(l),ref_key:"slider",ref:a},null,8,["modelValue","min","max","interval","tooltip-formatter"])]))}}),se=Symbol("game-provide-key"),lr=["width","height"],ur=E({setup(e){const r=b(),{width:a,height:s}=fe(r),o=ve(se),l=b(15);return ne(()=>{const c=b(!0);if(typeof r.value=="undefined")throw new Error("Canvas is not available?!");const d=r.value.getContext("2d");function i(){d.clearRect(0,0,n(a),n(s)),d.fillStyle="black",d.fillRect((.5-.25)*a.value-l.value/2,.5*s.value-l.value/2,l.value,l.value),d.fillStyle="red",d.fillRect((.5-.25)*a.value-l.value/2+6,.5*s.value-l.value/2+6,3,3),d.fillStyle="black",o==null||o.state.droneLifetimes.forEach(f=>{const y=-(.5*(n(o==null?void 0:o.droneLifetime)-f))/1e3,_=Math.min(Math.tanh(f/n(o==null?void 0:o.droneLifetime))+.25,1);d.fillRect((.5-Math.cos(y)*.25*_)*a.value,.5*s.value-Math.sin(y)*.25*_*a.value,3,3)}),c.value&&requestAnimationFrame(i)}i(),oe(()=>{c.value=!1})}),(c,d)=>(p(),S("canvas",{class:"drones",ref_key:"canvas",ref:r,width:n(a),height:n(s)},null,8,lr))}});function Re(e,t,r){const a=e.createShader(t);if(a===null)return z("Shader could not be created");if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){const s=e.getShaderInfoLog(a);return e.deleteShader(a),z(`Shader could not be compiled. Log: ${s}`)}return Oe(a)}function Be(e,t,r){const a=Re(e,e.VERTEX_SHADER,t),s=Re(e,e.FRAGMENT_SHADER,r);if(a.isErr||s.isErr){const l=["Error during shader creation.",a.isErr?a.error:"",s.isErr?s.error:""];return z(l.join(" "))}const o=e.createProgram();return o===null?z("Error during program creation"):(e.attachShader(o,a.value),e.attachShader(o,s.value),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?Oe(o):z(`Error during program linking: ${e.getProgramInfoLog(o)}`))}var dr=`precision highp float;\r
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
`,fr=`attribute vec4 a_position;\r
\r
void main() {\r
    gl_Position = a_position;\r
}\r
`;const vr=5,pr=["vsco2-piano-mf","explosion"],Pe=e=>{e.triggerAttack("C4",`+${1+Math.random()*.1-.05}`),e.triggerAttack("G4",`+${1+Math.random()*.1-.05}`);const t=6+Math.random()*6;e.triggerAttack("C4",`+${t+Math.random()*.1-.05}`),e.triggerAttack("A4",`+${t+Math.random()*.1-.05}`);const r=t+1+Math.random()*4;Math.random()<.9&&(e.triggerAttack("C4",`+${r+Math.random()*.1-.05}`),e.triggerAttack("F4",`+${r+Math.random()*.1-.05}`));const s=new Date().getMinutes();Math.random()<s/60&&e.triggerAttack("C6",`+${1+Math.random()}`),Math.random()<.2&&e.triggerAttack("E6",`+${1+Math.random()*t}`),Math.random()<s%3/3&&e.triggerAttack("A6",`+${t+Math.random()}`),Math.random()<(60-s)/60&&e.triggerAttack("C7",`+${r+Math.random()}`),j.scheduleOnce(()=>{Pe(e)},`+${r+Math.random()*10+5}`)},mr=async({sampleLibrary:e,onProgress:t})=>{const r=await e.request(gt(),pr),a=await Promise.all([Ee({samplesByNote:r["vsco2-piano-mf"],pitchShift:-12}),Ee({samplesByNote:r["vsco2-piano-mf"],pitchShift:-24})]),s=[];r.explosion&&(r.explosion[0].reverse=!0);const o=await ht({samples:r,sampleLibrary:e,sourceInstrumentName:"explosion",renderedInstrumentName:"lullaby__explosion",getDestination:()=>new yt(15).toDestination().generate(),onProgress:_=>t==null?void 0:t(_/2+.5)}),l=new bt(.05),c=new St(200).connect(l),d=o.get(0),i=()=>{const _=new wt(d).set({playbackRate:Math.random()*.1+.05,fadeOut:3,onended:()=>{const m=s.indexOf(_);m>-1&&s.splice(m,1)}}).connect(c);s.push(_),_.start(),j.scheduleOnce(()=>{i()},`+${Math.random()*100+60}`)};return[()=>{a.forEach(_=>_.dispose()),s.forEach(_=>_.dispose()),o.dispose()},({destination:_})=>{l.connect(_);const m=a.map(x=>{const M=new xt(.01*Math.random()+.005).connect(_);return M.start(),x.connect(M),Pe(x),M});return i(),()=>{a.forEach(x=>{x.releaseAll(0)}),s.forEach(x=>{x.stop(0)}),m.forEach(x=>{x.dispose()})}}]};var _r=_t(mr,{gain:vr});const De=W(()=>({music:new Ae(0).toDestination(),soundEffects:new Ae(0).toDestination()}));var Ge=(e=>(e.PLAYING="playing",e.PAUSED="paused",e.STOPPED="stopped",e))(Ge||{});async function gr(){const{music:e}=De(),t=Et(),r=At({format:"ogg",host:"/universatorial-extractination/samples"}),a=Rt({sampleIndex:r,provider:t}),[s,o]=await _r({context:Tt,sampleLibrary:a,destination:Nt(e)});let l=null;const c=b("stopped");function d(){c.value="playing",l===null&&(l=o()),j.start()}function i(){c.value="paused",j.stop()}function f(){c.value="stopped",j.cancel(),typeof l!="undefined"&&(l==null||l())}return{play:d,pause:i,stop:f,musicState:c}}const hr={volumes:{music:1,soundEffects:1,master:1},shaderSuperSamplingFactor:1},ae=It("settings",()=>{const e=Mt("settings",hr),t=pe(e.value);L(t,$t(()=>{e.value=t},1e3));let r=!1;function a(){r||(Ct().then(()=>yr(t)),r=!0)}return{state:t,initializeMusic:a}});async function yr(e){const t=De(),{play:r,pause:a,musicState:s}=await gr();L(e.volumes,async()=>{t.music.volume.value=-20+20*e.volumes.music,Ot.volume.value=-50+35*e.volumes.master,e.volumes.music>0&&e.volumes.master>0&&s.value!==Ge.PLAYING&&r(),(e.volumes.music===0||e.volumes.master===0)&&a()},{immediate:!0})}const br=["width","height"],Sr=E({props:{speedFactor:{default:1},brightness:{default:0},coronaFactor:{default:1},sphereRadius:{default:1},totalRadius:{default:1},glowFactor:{default:1}},setup(e){const t=e,r=b(),{width:a,height:s}=fe(r);b();const o=ae(),l=g(()=>Math.max(Math.pow(t.speedFactor+10,2)/100,.01));return ne(()=>{let c=!0;oe(()=>{c=!1});const d=r.value.getContext("webgl");if(d===null)return;const i=d,f=Be(i,fr,dr);if(f.isErr)return console.error(f.error);const y=i.getAttribLocation(f.value,"a_position"),_=i.getUniformLocation(f.value,"iResolution"),m=i.getUniformLocation(f.value,"iTime"),x=i.getUniformLocation(f.value,"iBrightness"),M=i.getUniformLocation(f.value,"iCoronaFactor"),G=i.getUniformLocation(f.value,"iSphereRadius"),Ke=i.getUniformLocation(f.value,"iTotalRadius"),We=i.getUniformLocation(f.value,"iGlowFactor"),ge=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,ge),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),i.STATIC_DRAW);const he=b(0),ye=b(0);function be(Se){if(!c){console.log("stopping rendering star :(");return}ye.value+=(Se-he.value)*l.value,he.value=Se,i.viewport(0,0,i.canvas.width,i.canvas.height),i.useProgram(f.value),i.enableVertexAttribArray(y),i.bindBuffer(i.ARRAY_BUFFER,ge),i.vertexAttribPointer(y,2,i.FLOAT,!1,0,0),i.uniform2f(_,i.canvas.width,i.canvas.height),i.uniform1f(m,n(ye)/1e3),i.uniform1f(x,t.brightness),i.uniform1f(M,t.coronaFactor),i.uniform1f(G,t.sphereRadius),i.uniform1f(Ke,t.totalRadius),i.uniform1f(We,t.glowFactor),i.drawArrays(i.TRIANGLES,0,6),requestAnimationFrame(be)}requestAnimationFrame(be)}),(c,d)=>(p(),S("canvas",{ref_key:"canvas",ref:r,width:n(a)*n(o).state.shaderSuperSamplingFactor,height:n(s)*n(o).state.shaderSuperSamplingFactor},null,8,br))}});var xr=O(Sr,[["__scopeId","data-v-2f3d345a"]]),wr=`precision highp float;\r
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
`,Er=`attribute vec4 a_position;\r
\r
void main() {\r
    gl_Position = a_position;\r
}\r
`;const Ar=["width","height"],Rr=E({setup(e){const t=b(),{width:r,height:a}=fe(t),s=ae();return ne(async()=>{let o=!0;oe(()=>{o=!1});const l=t.value.getContext("webgl");if(l===null)return;const c=l,d=Be(c,Er,wr);if(d.isErr)return console.error(d.error);const i=c.getAttribLocation(d.value,"a_position"),f=c.getUniformLocation(d.value,"iResolution"),y=c.getUniformLocation(d.value,"iTime"),_=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,_),c.bufferData(c.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),c.STATIC_DRAW);const m=b(0),x=b(0);function M(G){!o||(x.value+=G-m.value,m.value=G,c.viewport(0,0,c.canvas.width,c.canvas.height),c.useProgram(d.value),c.enableVertexAttribArray(i),c.bindBuffer(c.ARRAY_BUFFER,_),c.vertexAttribPointer(i,2,c.FLOAT,!1,0,0),c.uniform2f(f,c.canvas.width,c.canvas.height),c.uniform1f(y,G/1e5),c.drawArrays(c.TRIANGLES,0,6),requestAnimationFrame(M))}requestAnimationFrame(M)}),(o,l)=>(p(),S("canvas",{ref_key:"canvas",ref:t,width:n(r)*n(s).state.shaderSuperSamplingFactor,height:n(a)*n(s).state.shaderSuperSamplingFactor},null,8,Ar))}});var Tr=O(Rr,[["__scopeId","data-v-1556fbd8"]]);const Te=(e,t)=>Math.floor(e*Math.pow(10,t))/Math.pow(10,t),D=e=>{const t=n(e);if(t===0)return"0.00";if(t<1e3)return Te(t,2).toFixed(2);const r=Math.floor(Math.log10(t)),a=t/Math.pow(10,r);return`${Te(a,3).toFixed(3)}e${r}`};const Nr={class:"bonus"},Ir=E({props:{upgrade:null},setup(e){const t=e,r=g(()=>{const{type:a,target:s,value:o}=t.upgrade;return`${a==="base"?"Increase":"Multiply"} ${a==="base"?"base":"total"} ${s} income by ${D(o)}`});return(a,s)=>(p(),S("div",Nr,R(n(r)),1))}});var Mr=O(Ir,[["__scopeId","data-v-08a15c1d"]]),h=(e=>(e.THOUGHTS="Thought",e.ENERGY="Energy",e))(h||{});const V=Object.values(h);const $r={class:"cost"},Cr={class:"number"},Or={class:"icon"},Fr=E({props:{cost:null},setup(e){return(t,r)=>(p(),S("div",$r,[u("div",Cr,R(n(D)(e.cost.amount)),1),u("div",Or,[e.cost.currency===n(h).ENERGY?(p(),T(n($),{key:0,name:"hi-solid-lightning-bolt",title:"Energy",fill:"yellow"})):le("",!0),e.cost.currency===n(h).THOUGHTS?(p(),T(n($),{key:1,name:"hi-solid-chip",title:"Thoughts",fill:"cyan"})):le("",!0)])]))}});var Ur=O(Fr,[["__scopeId","data-v-10e32432"]]);const Lr={class:"content"},Br={class:"name"},Pr={class:"description"},Dr={class:"cost"},Gr=E({props:{upgrade:null},setup(e){const t=ve(se);return(r,a)=>(p(),T(n(P),{class:"upgrade-tile",disabled:n(t)?!n(n(t).upgrades.buyableUpgrades).includes(e.upgrade):!1},{default:w(()=>[u("div",Lr,[u("div",Br,R(e.upgrade.name),1),u("div",Pr,R(e.upgrade.description),1)]),u("div",Dr,[(p(!0),S(ee,null,ue(e.upgrade.baseCost,s=>(p(),T(Ur,{key:e.upgrade.id,cost:s},null,8,["cost"]))),128)),v(Mr,{upgrade:e.upgrade},null,8,["upgrade"])])]),_:1},8,["disabled"]))}});var Ne=O(Gr,[["__scopeId","data-v-fb18d37a"]]);function ke(e){const t=b(0),r=b(!1);function a(){if(!r.value)return;const l=Ut(e);if(typeof l=="undefined")return;const c=l.parentNode,d=Array.from((c==null?void 0:c.children)||[]);t.value=d.indexOf(l)}const{stop:s}=Ft(e,a,{childList:!0}),o=L(()=>e,a);return ne(()=>{r.value=!0,a()}),oe(()=>{s(),o()}),t}const kr=E({props:{active:{type:Boolean}},setup(e){const t=b(),r=ke(t),a=re("--nth",t);return L(r,()=>{a.value=`${r.value}`},{immediate:!0}),(s,o)=>(p(),S("div",{class:de(["ui-content-switcher-tab",{active:e.active}]),ref_key:"tab",ref:t},[H(s.$slots,"default",{},void 0,!0)],2))}});var Ie=O(kr,[["__scopeId","data-v-1f3cc052"]]);const Hr=E({props:{opacity:{default:1}},setup(e){const t=b(),r=ke(t),a=re("--nth",t);return L(r,()=>{a.value=`${r.value}`},{immediate:!0}),(s,o)=>(p(),T(me,{class:"ui-content-switcher-tab-box",opacity:e.opacity,ref_key:"box",ref:t},{default:w(()=>[H(s.$slots,"default",{},void 0,!0)]),_:3},8,["opacity"]))}});var Me=O(Hr,[["__scopeId","data-v-1310a2e6"]]),C=(e=>(e.DRONE="Drone",e))(C||{});const B=Object.values(C),Vr=(e,t)=>({currency:e,amount:t}),U=(...e)=>e.map(([t,r])=>Vr(t,r)),He=(e,t)=>r=>ie(Y({},r),{[e]:t});He("category",h.ENERGY);He("category",h.THOUGHTS);const J=(e,t,r,a,s,o)=>ie(Y({},o),{id:e,category:t,type:r,targetType:a,target:s});var Ve=(e=>(e[e._001_DRONES=0]="_001_DRONES",e))(Ve||{});const Yr=[{id:0,cost:U([h.ENERGY,1])}];const Ye=e=>(Pt("data-v-c5ac0caa"),e=e(),Dt(),e),qr={class:"ui"},zr={class:"ui-elements"},jr={class:"resources"},Kr={class:"column"},Wr={class:"row"},Zr={class:"number"},Xr={class:"number per-second"},Jr={class:"row"},Qr={class:"number"},en={class:"number per-second"},tn={class:"drones"},rn={class:"row"},nn={class:"stats"},on=Ye(()=>u("div",{class:"name"},"Drones",-1)),sn={class:"amount"},an={class:"life"},cn=A("Buy 1 drone"),ln=Ye(()=>u("br",null,null,-1)),un=E({setup(e){const t=$e(N.MAIN,N.SETTINGS),r=$e(N.SETTINGS,N.MAIN),a=g(()=>({"to-settings":t.value,"from-settings":r.value}));Fe();const s=b(0),o=ve(se),l={energy:g(()=>o?n(o.upgrades.revealedUpgrades).filter(c=>c.category===h.ENERGY):[]),thought:g(()=>o?n(o.upgrades.revealedUpgrades).filter(c=>c.category===h.THOUGHTS):[])};return(c,d)=>(p(),S("div",{class:de(["view main",n(a)])},[u("div",qr,[v(n(me),{class:"top",opacity:.75},{default:w(()=>{var i,f,y,_,m,x,M;return[u("div",zr,[u("div",jr,[u("div",Kr,[u("div",Wr,[v(n($),{name:"hi-solid-lightning-bolt",title:"Energy",fill:"yellow",scale:1.5},null,8,["scale"]),u("span",Zr,R(n(D)(((i=n(o))==null?void 0:i.state.currencies[n(h).ENERGY])||0)),1),u("span",Xr,"("+R(n(D)(((f=n(o))==null?void 0:f.totalProductions.currencies[n(h).ENERGY])||0))+"/s)",1)]),u("div",Jr,[v(n($),{name:"hi-solid-chip",title:"Thoughts",fill:"cyan",scale:1.5},null,8,["scale"]),u("span",Qr,R(n(D)(((y=n(o))==null?void 0:y.state.currencies[n(h).THOUGHTS])||0)),1),u("span",en,"("+R(n(D)(((_=n(o))==null?void 0:_.totalProductions.currencies[n(h).THOUGHTS])||0))+"/s)",1)])])]),Lt(u("div",tn,[u("div",rn,[u("div",nn,[on,u("div",sn,"Active: "+R(((m=n(o))==null?void 0:m.state.generators[n(C).DRONE].bought)||0),1),u("div",an,"Base life: "+R(Math.round(n(((x=n(o))==null?void 0:x.droneLifetime)||0))/1e3)+"s",1)]),v(n(P),{onClick:d[0]||(d[0]=G=>n(o)&&n(o).actions.buyDrone()),disabled:!n(o)||n(o).state.currencies[n(h).ENERGY]<n(o).prices.generators[n(C).DRONE][n(h).ENERGY]},{default:w(()=>[cn,ln,A(R(n(o)&&n(D)(n(o).prices.generators[n(C).DRONE][n(h).ENERGY])),1),v(n($),{name:"hi-solid-lightning-bolt",fill:"yellow",scale:.8},null,8,["scale"])]),_:1},8,["disabled"])])],512),[[Bt,(M=n(o))==null?void 0:M.state.goalsAchieved.has(n(Ve)._001_DRONES)]])])]}),_:1}),v(n(ir),{class:"right",index:s.value},{tabs:w(()=>[v(Ie,{onClick:d[1]||(d[1]=i=>s.value=0),active:s.value===0},{default:w(()=>[l.energy.value.length>0?(p(),T(n($),{key:0,name:"hi-solid-lightning-bolt",fill:"yellow",scale:2})):(p(),T(n($),{key:1,name:"hi-lightning-bolt",fill:"yellow",scale:2}))]),_:1},8,["active"]),v(Ie,{onClick:d[2]||(d[2]=i=>s.value=1),active:s.value===1},{default:w(()=>[l.thought.value.length>0?(p(),T(n($),{key:0,name:"hi-solid-chip",fill:"cyan",scale:2})):(p(),T(n($),{key:1,name:"hi-chip",fill:"cyan",scale:2}))]),_:1},8,["active"])]),content:w(()=>[v(Me,{opacity:.75},{default:w(()=>[(p(!0),S(ee,null,ue(l.energy.value,i=>(p(),T(n(Ne),{key:i.id,upgrade:i,onClick:f=>n(o)&&n(o).actions.buyUpgrade(i.id)},null,8,["upgrade","onClick"]))),128))]),_:1}),v(Me,{opacity:.75},{default:w(()=>[(p(!0),S(ee,null,ue(l.thought.value,i=>(p(),T(n(Ne),{key:i.id,upgrade:i,onClick:f=>n(o)&&n(o).actions.buyUpgrade(i.id)},null,8,["upgrade","onClick"]))),128))]),_:1})]),_:1},8,["index"]),v(n($),{class:"settings",name:"io-settings",onClick:d[3]||(d[3]=i=>c.$router.push({name:n(N).SETTINGS})),fill:"white",animation:"spin",speed:"slow",hover:!0,scale:3,title:"Settings"})])],2))}});var dn=O(un,[["__scopeId","data-v-c5ac0caa"]]);const fn={class:"view"},vn={key:0,class:"credits-box-content"},pn=u("h1",null,"Credits",-1),mn={class:"credits"},_n=u("div",{class:"row"},[u("h3",null,"Star shader"),u("div",{class:"text"},[A("Based on"),u("a",{href:"https://www.shadertoy.com/view/4dXGR4",target:"_blank"},[u("b",null,"Main Sequence Star"),A(" by "),u("b",null,"flight404"),A(" on "),u("i",null,"Shadertoy")])])],-1),gn=u("div",{class:"row"},[u("h3",null,"Universe shader"),u("div",{class:"text"},[A("Based on"),u("a",{href:"https://www.shadertoy.com/view/MslGWN",target:"_blank"},[u("b",null,"Simplicity Galaxy"),A(" by "),u("b",null,"CBS"),A(" on "),u("i",null,"Shadertoy")])])],-1),hn=u("div",{class:"row"},[u("h3",null,"Music"),u("div",{class:"text"},[A("Generative music using"),u("a",{href:"https://generative.fm/",target:"_blank"},[u("b",null,"generative.fm")])])],-1),yn={class:"row gap"},bn=A("Back"),Sn={key:1,class:"settings-box-content"},xn=u("h1",null,"Settings",-1),wn={class:"settings"},En={class:"row"},An=A("Export save"),Rn=A("Import save"),Tn={class:"row gap"},Nn={class:"row"},In={class:"row"},Mn={class:"row"},$n={class:"row gap"},Cn=A("Credits"),On={class:"row"},Fn=A("Close"),Un=E({setup(e){const t=b(!1),r=ae(),a=Fe();return(s,o)=>(p(),S("div",fn,[v(n(me),{class:"settings-box",opacity:.9},{default:w(()=>[v(Ue,{name:"fade-slide"},{default:w(()=>[t.value?(p(),S("div",vn,[pn,u("div",mn,[_n,gn,hn,u("div",yn,[v(n(P),{icon:"HiChevronLeft",onClick:o[0]||(o[0]=l=>t.value=!1),type:"secondary"},{default:w(()=>[bn]),_:1})])])])):(p(),S("div",Sn,[xn,u("div",wn,[u("div",En,[v(n(P),{icon:"HiUpload"},{default:w(()=>[An]),_:1}),v(n(P),{icon:"HiDownload"},{default:w(()=>[Rn]),_:1})]),u("div",Tn,[v(n(X),{type:"percentage",modelValue:n(r).state.volumes.music,"onUpdate:modelValue":o[1]||(o[1]=l=>n(r).state.volumes.music=l),label:"Music volume",unit:"%"},null,8,["modelValue"])]),u("div",Nn,[v(n(X),{type:"percentage",modelValue:n(r).state.volumes.soundEffects,"onUpdate:modelValue":o[2]||(o[2]=l=>n(r).state.volumes.soundEffects=l),label:"Sound effect volume",unit:"%"},null,8,["modelValue"])]),u("div",In,[v(n(X),{type:"percentage",modelValue:n(r).state.volumes.master,"onUpdate:modelValue":o[3]||(o[3]=l=>n(r).state.volumes.master=l),label:"Master volume",unit:"%"},null,8,["modelValue"])]),u("div",Mn,[v(n(X),{type:"percentage",modelValue:n(r).state.shaderSuperSamplingFactor,"onUpdate:modelValue":o[4]||(o[4]=l=>n(r).state.shaderSuperSamplingFactor=l),label:"Shader supersampling",unit:"%",min:.5,max:1.5},null,8,["modelValue","max"])]),u("div",$n,[v(n(P),{icon:"HiDocumentText",onClick:o[5]||(o[5]=l=>t.value=!0)},{default:w(()=>[Cn]),_:1})]),u("div",On,[v(n(P),{icon:"HiLogout",onClick:o[6]||(o[6]=l=>n(a).push({name:n(N).MAIN})),type:"secondary"},{default:w(()=>[Fn]),_:1})])])]))]),_:1})]),_:1})]))}});var N=(e=>(e.MAIN="main",e.SETTINGS="settings",e.NOT_FOUND="not-found",e))(N||{});const Ln=Object.values(N),Bn=Gt({history:kt(),routes:[{path:"/",name:"main",component:dn},{path:"/settings",name:"settings",component:Un}]}),Pn=W(()=>{const e=Le(),t=pe({previous:[],current:e.matched});return L(()=>e.matched,()=>{t.previous=t.current,t.current=e.matched}),t}),Dn=W(()=>g(()=>{const t=Le().matched.find(r=>Ln.includes(r.name));return typeof t=="undefined"?N.NOT_FOUND:t.name})),$e=W((e,t)=>{const r=Pn();return g(()=>r.previous.some(a=>a.name===e)&&r.current.some(a=>a.name===t))}),Gn=()=>({currencies:{[h.ENERGY]:0,[h.THOUGHTS]:0},generators:{[C.DRONE]:{bought:0,generated:0}},upgradesBought:new Set,upgradesRevealed:new Set,goalsAchieved:new Set,droneLifetimes:[]}),kn=1.5,te={[C.DRONE]:{name:"Drone",baseCost:[{currency:h.ENERGY,amount:1}],costCoefficient:kn,production:[{type:"currencies",target:h.THOUGHTS,amount:.01},{type:"currencies",target:h.ENERGY,amount:.1}]}};var q=(e=>(e[e._001_START_THINKING=0]="_001_START_THINKING",e[e._002_INITIAL_ENERGY=1]="_002_INITIAL_ENERGY",e[e._003_DRONE_EFFICIENCY_1=2]="_003_DRONE_EFFICIENCY_1",e[e._004_DRONE_LIFETIME_1=3]="_004_DRONE_LIFETIME_1",e))(q||{});function I(e){return Object.fromEntries(e)}const{ENERGY:k,THOUGHTS:F}=h,K=[J(q._001_START_THINKING,k,"base","total",F,{name:"Start thinking",description:"You are...?",revealAfter:U([k,0]),baseCost:U([k,0]),value:.1}),J(q._002_INITIAL_ENERGY,F,"base","total",k,{name:"Initial energy",description:"Start collecting some energy",revealAfter:U([F,0]),baseCost:U([F,1]),value:.1}),J(q._003_DRONE_EFFICIENCY_1,F,"multiplier","generator",C.DRONE,{name:"Drone efficiency I",description:"Better drones!",revealAfter:U([F,2.5]),baseCost:U([F,5]),value:2}),J(q._004_DRONE_LIFETIME_1,F,"multiplier","special","droneLifetime",{name:"Drone lifetime I",description:"Let them live just a bit longer",revealAfter:U([F,5],[k,10]),baseCost:U([k,25],[F,10]),value:2})],Hn=I(K.map(e=>[e.id,e]));K.filter(e=>e.targetType==="total"),K.filter(e=>e.targetType==="generator"),K.filter(e=>e.targetType==="special");const qe=(e,t,r)=>{const a=Object.keys(e),s=t.filter(l=>!a.includes(l)),o=I(s.map(l=>[l,r]));return Y(Y({},e),o)},Vn=e=>({generators:I(B.map(t=>[t,qe(I(te[t].baseCost.map(r=>[r.currency,g(()=>n(r.amount)*Math.pow(te[t].costCoefficient,n(e.generators[t].bought)))])),V,0)]))}),Yn=e=>({generators:I(B.map(t=>[t,g(()=>1)]))}),qn=15e3,Ce=(e,t)=>g(()=>Object.values(e.generators).reduce((r,a)=>r+n(a)[t],0)),Q=(e,t,r,a)=>{let s={base:0,multiplier:1}[t];for(const o of e)o.type===t&&o.targetType===r&&o.target===a&&(t==="base"?s+=o.value:t==="multiplier"&&(s*=o.value));return s},zn=e=>({base:{generators:I(B.map(t=>[t,g(()=>Q(e.upgradesBought.values(),"base","generator",t))])),currencies:I(V.map(t=>[t,g(()=>Q(e.upgradesBought.values(),"base","total",t))]))},multiplier:{generators:I(B.map(t=>[t,g(()=>Q(e.upgradesBought.values(),"multiplier","generator",t))])),currencies:I(V.map(t=>[t,g(()=>Q(e.upgradesBought.values(),"multiplier","total",t))]))}}),jn=[...B,...V],Kn=(e,t)=>{const r=zn(e),a={generators:I(B.map(c=>[c,g(()=>{const d=te[c],i=e.generators[c],f=n(i.generated)+n(i.bought),y=I(d.production.map(_=>[_.target,(_.amount+n(r.base.generators[c]))*f*n(r.multiplier.generators[c])*n(t.generators[c])]));return qe(y,jn,0)})]))},s=I(B.map(c=>[c,g(()=>(Ce(a,c).value+r.base.generators[c].value)*r.multiplier.generators[c].value)])),o=I(V.map(c=>[c,g(()=>(Ce(a,c).value+r.base.currencies[c].value)*r.multiplier.currencies[c].value)]));return{droneLifetime:g(()=>{let c=1,d=1;for(const i of e.upgradesBought)i.targetType==="special"&&i.target==="droneLifetime"&&(i.type==="base"?c+=i.value:i.type==="multiplier"&&(d*=i.value));return qn*c*d}),generatorProductions:a,totalProductions:{generators:s,currencies:o}}},Wn=e=>{const t=g(()=>K.filter(s=>!e.upgradesBought.has(s))),r=g(()=>t.value.filter(s=>s.revealAfter.every(o=>e.currencies[o.currency]>=n(o.amount)))),a=g(()=>r.value.filter(s=>s.baseCost.every(o=>e.currencies[o.currency]>=n(o.amount))));return L(r,()=>{r.value.forEach(s=>e.upgradesRevealed.add(s))},{immediate:!0}),{buyableUpgrades:a,revealedUpgrades:r}},Zn=e=>{const t=Vn(e),r=Yn(),{generatorProductions:a,totalProductions:s,droneLifetime:o}=Kn(e,r),l=Wn(e);return{prices:t,bonuses:r,generatorProductions:a,totalProductions:s,droneLifetime:o,upgrades:l}},_e=(e,t)=>t.every(r=>e[r.currency]>=n(r.amount)),ze=(e,t)=>Array.isArray(t)?t.forEach(r=>{e[r.currency]-=n(r.amount)}):Object.entries(t).forEach(([r,a])=>{e[r]-=n(a)}),Xn=e=>t=>{const r=Hn[t];!_e(e.currencies,r.baseCost)||(e.upgradesBought.add(r),ze(e.currencies,r.baseCost))},Jn=(e,t,r)=>()=>{const a=te[C.DRONE];!_e(e.currencies,a.baseCost)||(e.droneLifetimes.push(n(t)),ze(e.currencies,r.generators[C.DRONE]))},Qn=20,eo=()=>{const e=pe(Gn()),{prices:t,bonuses:r,generatorProductions:a,totalProductions:s,droneLifetime:o,upgrades:l}=Zn(e),c=g(()=>Object.values(Yr).filter(f=>!e.goalsAchieved.has(f.id)));let d=Date.now();const i=()=>{const f=Date.now()-d,y=f/1e3;d=Date.now(),e.generators[C.DRONE].bought=e.droneLifetimes.length,V.forEach(m=>{e.currencies[m]+=n(s.currencies[m])*y}),B.forEach(m=>{e.generators[m].generated+=n(s.generators[m])*y}),e.droneLifetimes.map((m,x)=>x).filter(m=>(e.droneLifetimes[m]-=f,e.droneLifetimes[m]<0)).sort((m,x)=>x-m).forEach(m=>e.droneLifetimes.splice(m,1)),c.value.filter(m=>_e(e.currencies,m.cost)).forEach(m=>e.goalsAchieved.add(m.id));const _=Date.now()-d;setTimeout(i,1e3/Qn-_)};return i(),{state:e,droneLifetime:o,prices:t,bonuses:r,generatorProductions:a,totalProductions:s,upgrades:l,actions:{buyUpgrade:Xn(e),buyDrone:Jn(e,o,t)}}};var to=W(eo);const ro=E({setup(e){const t=ae(),r=Dn(),a=to();Ht(se,a);const s=g(()=>{switch(r.value){case N.MAIN:return"scale(1.25)";case N.SETTINGS:return"scale(1.01)"}return""}),o=g(()=>{switch(r.value){case N.MAIN:return"scale(1)";case N.SETTINGS:return"scale(0.01)"}return""});function l(){t.initializeMusic()}return(c,d)=>{const i=Vt("router-view");return p(),S(ee,null,[u("div",{class:"background",style:ce({transform:n(s)})},[v(n(Tr))],4),u("div",{class:"star",style:ce({transform:n(o)})},[v(n(xr),{"total-radius":.5,brightness:0,"speed-factor":-2},null,8,["total-radius"]),v(n(ur))],4),u("div",{class:"content",onClick:l},[v(i,null,{default:w(({Component:f,route:y})=>[v(Ue,{name:"view-change"},{default:w(()=>[(p(),T(qt,null,[(p(),T(Yt(f),{key:y.name}))],1024))]),_:2},1024)]),_:1})])],64)}}}),je=zt(ro);je.use(jt()).use(Bn);je.mount("#app");
