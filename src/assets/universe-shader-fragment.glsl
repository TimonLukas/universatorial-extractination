precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

float field(in vec3 p, float s) {
    float strength = 7.0 + 0.03 * log(1.0e-6 + fract(sin(iTime) * 4373.11));
    float accum = s / 4.0;
    float prev = 0.0;
    float tw = 0.0;
    for (int i = 0; i < 26; ++i) {
        float mag = dot(p, p);
        p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);
        float w = exp(-float(i) / 7.0);
        accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
        tw += w;
        prev = mag;
    }
    return max(0.0, 5.0 * accum / tw - 0.7);
}

float field2(in vec3 p, float s) {
    float strength = 7.0 + 0.03 * log(1.0e-6 + fract(sin(iTime) * 4373.11));
    float accum = s / 4.;
    float prev = 0.0;
    float tw = 0.0;
    for (int i = 0; i < 18; ++i) {
        float mag = dot(p, p);
        p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);
        float w = exp(-float(i) / 7.0);
        accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
        tw += w;
        prev = mag;
    }
    return max(0.0, 5.0 * accum / tw - 0.7);
}

vec3 nrand3(vec2 co) {
    vec3 a = fract(cos(co.x * 8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
    vec3 b = fract(sin(co.x * 0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
    vec3 c = mix(a, b, 0.5);
    return c;
}

#define SMOOTH_PERLIN_PARAMS0   2.0,  4.0,  8.0, 16.0, 32.0, 64.0
#define SMOOTH_PERLIN_PARAMS1   3.0,  3.0,  3.0,  6.0, 10.0, 50.0
#define SMOOTH_PERLIN_PARAMS2  50.0, 10.0,  6.0,  3.0,  3.0,  3.0
#define SMOOTH_PERLIN_PARAMS3  60.0, 60.0,  3.0,  3.0,  8.0,  9.0

float smoothPerlin(float offset, float a, float b, float c, float d, float e, float f) {
    return (sin(offset * a) * b + tan(offset * c) * d + cos(offset * e) * f) / (b + d + f);
}

float freqs[4];

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = 2.0 * fragCoord.xy / iResolution.xy - 1.0;
    vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);
    vec3 p = vec3(uvs / 4.0, 0) + vec3(1.0, -1.3, 0.0);
    p += 0.2 * vec3(sin(iTime / 16.0), sin(iTime / 12.0),  sin(iTime / 128.0));

    freqs[0] = smoothPerlin(iTime * 1.0e-4, SMOOTH_PERLIN_PARAMS0);
    freqs[1] = smoothPerlin(iTime * 1.0e-4, SMOOTH_PERLIN_PARAMS1);
    freqs[2] = smoothPerlin(iTime * 1.0e-4, SMOOTH_PERLIN_PARAMS2);
    freqs[3] = smoothPerlin(iTime * 1.0e-4, SMOOTH_PERLIN_PARAMS3);

    float t = field(p, freqs[2]);
    float v = (1.0 - exp((abs(uv.x) - 1.0) * 6.0)) * (1.0 - exp((abs(uv.y) - 1.0) * 6.0));

    vec3 p2 = vec3(uvs / (4.0 + sin(iTime * 0.11) * 0.2 + 0.2 + sin(iTime * 0.15) * 0.3 + 0.4), 1.5) + vec3(2.0, -1.3, -1.0);
    p2 += 0.25 * vec3(sin(iTime / 160.0), sin(iTime / 120.0),  sin(iTime / 1280.0));
    float t2 = field2(p2, freqs[3]);
    vec4 c2 = mix(0.4, 1.0, v) * vec4(1.3 * t2 * t2 * t2, 1.8 * t2 * t2 ,t2 * freqs[0], t2) * freqs[3];

    vec2 seed = p.xy * 2.0;
    seed = floor(seed * iResolution.x);
    vec3 rnd = nrand3(seed);
    vec4 starcolor = vec4(pow(rnd.y, 40.0));

    vec2 seed2 = p2.xy * 2.0;
    seed2 = floor(seed2 * iResolution.x);
    vec3 rnd2 = nrand3(seed2);
    starcolor += vec4(pow(rnd2.y, 40.0));

    fragColor = mix(freqs[3] - 0.3, 1.0, v) * vec4(1.5 * freqs[2] * t * t * t, 1.2 * freqs[1] * t * t, freqs[3] * t, 1.0) + c2 + starcolor;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
