#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 _st, float _pct){
  return  smoothstep( _pct-0.02, _pct, _st.y) -
          smoothstep( _pct, _pct+0.02, _st.y);
}

float gain(float x, float k) {
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

float parabola( float x, float k ) {
    return pow( 4.0*x*(1.0-x), k );
}

float karateKid(float x, float k) {
    return pow(abs(x * exp(PI)), abs(k * - 2.)) / PI;
}

float kungfuMan(float x, float k) {
    return pow((sin( x ) + abs( tan(x) ) + 1.), k);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;

    // float y = sin(st.x * PI + (u_time * 2.)) / PI + 1.;
    // float y = gain(st.x, u_time * PI) / PI + 1.;
    // float y = karateKid(st.x, sin(u_time * PI));
    float y = kungfuMan(sin(st.x * PI), sin(st.y * PI * sin(u_time * 4.))) / (PI / 2.5);

    vec3 color = vec3(y / 2., parabola(st.x, 1.), cos(gain(st.y, gain(st.y, u_time * 20.))));

    // Plot a line
    float pct = plot(st,y / 2.);
    color = (1.0-pct)*color+pct*vec3(0.8078, 1.0, 0.1059);

	gl_FragColor = vec4(color, 1.0);
}