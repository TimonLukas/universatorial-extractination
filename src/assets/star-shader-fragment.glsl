precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float iBrightness;
uniform float iCoronaFactor;
uniform float iSphereRadius;
uniform float iTotalRadius;
uniform float iGlowFactor;

uniform sampler2D iChannel0;

float snoise(vec3 uv, float res) { // by trisomie21
    const vec3 s = vec3(1e0, 1e2, 1e4);

    uv *= res;

    vec3 uv0 = floor(mod(uv, res)) * s;
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;

    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(
        uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
        uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z
    );

    vec4 r = fract(sin(v * 1e-3) * 1e5);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 1e-3) * 1e5);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

float rng(in vec2 pos) {
    return fract(sin(pos.y + pos.x * 78.233) * 43758.5453) * 2.0 - 1.0;
}

float perlin(in float pos) {
    float a = rng(vec2(floor(pos), 1.0));
    float b = rng(vec2(ceil(pos), 1.0));

    float a_x = rng(vec2(floor(pos), 2.0));
    float b_x = rng(vec2(ceil(pos), 2.0));

    a += a_x * fract(pos);
    b += b_x * (fract(pos) - 1.0);

    return a + (b - a) * smoothstep(0.0, 1.0, fract(pos));
}

#define SMOOTH_PERLIN_PARAMS_SIZE     2.0,  4.0,  8.0, 16.0, 32.0, 64.0
#define SMOOTH_PERLIN_PARAMS_ANGLE_0  3.0,  3.0,  3.0,  6.0, 10.0, 50.0
#define SMOOTH_PERLIN_PARAMS_ANGLE_1  50.0, 10.0, 6.0,  3.0,  3.0,  3.0

float smoothPerlin(float offset, float a, float b, float c, float d, float e, float f) {
    return (sin(offset * a) * b + tan(offset * c) * d + cos(offset * e) * f) / (b + d + f);
}

float tanh(float x) {
    return (exp(2.0 * x) - 1.0) / (exp(2.0 * x) + 1.0);
}

vec3 orange		= vec3(0.8, 0.65, 0.3);
vec3 orangeRed  = vec3(0.8, 0.35, 0.1);

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float radius	 = (0.24 + iBrightness * 0.2) * iSphereRadius;
    float invRadius  = 1.0 / radius;

    float time	 = iTime * 0.1;
    float aspect = iResolution.x / iResolution.y;
    vec2 uv		 = fragCoord.xy / (iResolution.xy * iTotalRadius);
    vec2 p 		 = (-0.5 / iTotalRadius) + uv;
    p.x *= aspect;

    float fade	= pow(length(2.0 * p), 0.5);
    float fVal1	= 1.0 - fade;
    float fVal2	= 1.0 - fade;

    float angle	= atan(p.x, p.y) / 6.2832;
    float dist	= length(p);
    vec3 coord	= vec3(angle, dist, time * 0.1);

    float newTime1 = abs(snoise(coord + vec3(0.0, -time * (0.35 + iBrightness * 0.001), time * 0.015), 15.0));
    float newTime2 = abs(snoise(coord + vec3(0.0, -time * (0.15 + iBrightness * 0.001), time * 0.015), 45.0));
    for(int i=1; i<=7; i++) {
        float power = pow(2.0, float(i + 1));
        fVal1 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2), (power * 10.0 * (newTime1 + 1.0)));
        fVal2 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2), (power * 25.0 * (newTime2 + 1.0)));
    }

    float corona  = pow(fVal1 * max(1.1 - fade, 0.0), 2.0) * 50.0;
    corona		 += pow(fVal2 * max(1.1 - fade, 0.0), 2.0) * 50.0;
    corona		 *= 1.2 - newTime1;

    vec2 sp = (-1.0 / iTotalRadius) + 2.0 * uv;
    sp.x *= aspect;
    sp *= 2.0 - iBrightness;
    float r = dot(sp, sp);
    float f = (1.0 - sqrt(abs(1.0 - r))) / r + iBrightness * 0.5;

    vec3 starSphere	= vec3(0.0);

    float distInRadiusFactor = clamp(floor(radius / dist), 0.0, 1.0);

    corona *= max(pow(dist * invRadius * max(0.0, iGlowFactor), 24.0) * distInRadiusFactor, 1.0);
    vec2 baseUv = sp.xy * f;

    float textureSizeModifier1 = pow(smoothPerlin(time * 0.15, SMOOTH_PERLIN_PARAMS_SIZE), 1.5);

    float texture0Angle = smoothPerlin(time / 10.0, SMOOTH_PERLIN_PARAMS_ANGLE_0);
    float texture1Angle = smoothPerlin(time / 12.50, SMOOTH_PERLIN_PARAMS_ANGLE_1);

    vec3 starTexture0 = texture2D(iChannel0, baseUv + normalize(vec2(sin(texture0Angle), cos(texture0Angle)))).rgb * 0.5;

    starSphere = sqrt(starTexture0 * 0.3) * distInRadiusFactor;

    float starGlow = min(max(1.0 - dist * (1.0 - iBrightness), 0.0), 1.0);
    fragColor.rgb  = vec3(f * (0.75 + iBrightness * 0.3) * orange) * iGlowFactor * 2.2 + starSphere * iGlowFactor +  corona * orange * max(iCoronaFactor, 0.0) + starGlow * orangeRed;
    fragColor.a	   = (-tanh((dist * 2.5)) + 1.0) / 2.0;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
