/**
 * The hero as a wall of live LED cabinets.
 *
 * The screen is tiled with LED cabinets, each showing its slice of the current
 * scene as glowing LEDs in SAAN amber. To change scene, the cabinets flip over
 * in a wave, each one pushed back and turned, with the next scene on its back,
 * so the panels themselves form each new picture. Near the pointer, cabinets
 * lift and tilt slightly so the wall reads as real hardware.
 *
 * Raw WebGL1: one quad per cabinet with a true perspective transform.
 */

import imageLoader from '@/lib/image-loader';

const VERT = `
attribute vec2 aPos;
uniform vec2 uRes;
uniform vec4 uRect;     // target rect in buffer px: x, y (from bottom), w, h
uniform vec3 uRot;      // radians around x, y, z
uniform vec3 uOffset;   // px; negative z is away from the viewer
uniform float uFocal;
varying vec2 vUv;

void main() {
  vUv = aPos;
  vec3 p = vec3((aPos - 0.5) * uRect.zw, 0.0);
  float cx = cos(uRot.x), sx = sin(uRot.x);
  float cy = cos(uRot.y), sy = sin(uRot.y);
  float cz = cos(uRot.z), sz = sin(uRot.z);
  p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
  p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
  p = vec3(p.x * cz - p.y * sz, p.x * sz + p.y * cz, p.z);
  p += vec3(uRect.xy + uRect.zw * 0.5 + uOffset.xy, uOffset.z);

  vec2 sc = uRes * 0.5;
  float s = uFocal / max(uFocal - p.z, 1.0);
  vec2 clip = (sc + (p.xy - sc) * s) / uRes * 2.0 - 1.0;
  float w = 1.0 / s;  // perspective-correct LED grid
  gl_Position = vec4(clip * w, 0.0, w);
}
`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 vUv;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec2 uSizeA;
uniform vec2 uSizeB;
uniform vec2 uWall;
uniform vec2 uGrid;
uniform vec2 uPanelLed;
uniform vec2 uPanelSize;
uniform vec2 uRes;
uniform float uAxis;     // 0: flips around y, 1: flips around x
uniform float uTime;
uniform float uIntro;
uniform float uSeam;
uniform float uGlow;
uniform float uLift;

vec2 cover(vec2 uv, vec2 size) {
  float rs = uWall.x / uWall.y;
  float ri = size.x / size.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
// Pull every scene toward the SAAN logo amber (#E08A00) so the wall reads as one brand.
vec3 grade(vec3 c) {
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  l = smoothstep(0.03, 0.92, l);
  vec3 amber = vec3(1.0, 0.62, 0.05);
  vec3 tint = mix(amber * l * 1.3, vec3(1.0, 0.9, 0.66) * l * 1.08, smoothstep(0.55, 1.0, l));
  return mix(tint, c * (0.55 + 0.7 * l), 0.22);
}

void main() {
  // The back of a turned cabinet carries the next scene, un-mirrored.
  bool back = !gl_FrontFacing;
  vec2 uv = vUv;
  if (back) {
    if (uAxis < 0.5) uv.x = 1.0 - uv.x;
    else uv.y = 1.0 - uv.y;
  }
  vec2 L = uPanelLed + uv * uPanelSize;
  vec2 cell = floor(L);
  vec2 local = fract(L) - 0.5;
  vec2 g = (cell + 0.5) / uGrid;
  vec2 suv = vec2(g.x, 1.0 - g.y);
  vec3 src = back ? texture2D(uB, cover(suv, uSizeB)).rgb : texture2D(uA, cover(suv, uSizeA)).rgb;
  vec3 col = grade(src) * (1.0 + uLift);
  col += vec3(1.0, 0.7, 0.2) * uGlow;

  // Power-on sweep.
  float introThr = g.x * 0.75 + hash(cell + 3.1) * 0.25;
  col *= smoothstep(introThr - 0.03, introThr + 0.03, uIntro * 1.06);

  // LED geometry, fading to the average colour when LEDs get smaller than a pixel.
  float px = max(fwidth(L.x), fwidth(L.y));
  vec2 q = abs(local) - 0.2;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.1;
  float emitter = 1.0 - smoothstep(-0.03, 0.05 + px, d);
  float bloom = exp(-dot(local, local) * 8.0) * 0.5;
  vec3 body = vec3(0.028, 0.03, 0.034) * (1.0 - smoothstep(-0.05, 0.08, d));
  vec3 led = body + col * (emitter * 1.3 + bloom);
  led = mix(led, vec3(0.025) + col * 0.78, smoothstep(0.35, 0.9, px));
  led *= 0.93 + 0.07 * sin(g.y * 4.0 - uTime * 0.9);

  // Cabinet frame, visible while a cabinet is moving.
  vec2 e2 = min(L - uPanelLed, uPanelLed + uPanelSize - L);
  float edge = min(e2.x, e2.y);
  float bez = 1.0 - smoothstep(0.0, 0.5 + px * 1.5, edge);
  led = mix(led, vec3(0.055, 0.058, 0.064), bez * uSeam);

  vec2 vv = gl_FragCoord.xy / uRes - 0.5;
  led *= 1.0 - dot(vv, vv) * 0.85;
  gl_FragColor = vec4(led, 1.0);
}
`;

export interface SceneImage {
  src: string;
  w: number;
  h: number;
}

type U =
  | 'uRes'
  | 'uRect'
  | 'uRot'
  | 'uOffset'
  | 'uFocal'
  | 'uA'
  | 'uB'
  | 'uSizeA'
  | 'uSizeB'
  | 'uWall'
  | 'uGrid'
  | 'uPanelLed'
  | 'uPanelSize'
  | 'uAxis'
  | 'uTime'
  | 'uIntro'
  | 'uSeam'
  | 'uGlow'
  | 'uLift';

interface Cabinet {
  ix: number;
  iy: number;
  /** 0 to 1: when this cabinet starts flipping within a transition. */
  order: number;
  axis: 0 | 1;
  dir: 1 | -1;
  /** Smoothed pointer response. */
  tiltX: number;
  tiltY: number;
  lift: number;
  z: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export class LedRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private buffer: WebGLBuffer | null;
  private u: Record<U, WebGLUniformLocation | null>;
  private textures: (WebGLTexture | null)[] = [];
  private sizes: [number, number][] = [];
  private loading = new Map<number, Promise<void>>();
  private current = 0;
  private next = 0;
  private dpr = 1;
  private pitch = 9;
  private cab = { x: 1, y: 1 };
  private grid = { x: 1, y: 1 };
  private origin = { x: 0, y: 0 };
  private cabinets: Cabinet[] = [];
  private pointer = { x: 0, y: 0, inside: false };

  /** 0 to 1 across a scene change. */
  progress = 0;
  /** 0 to 1 power-on sweep. */
  intro = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private scenes: SceneImage[],
    private opts: { pitch: number }
  ) {
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl || gl.isContextLost()) throw new Error('WebGL unavailable');
    if (!gl.getExtension('OES_standard_derivatives'))
      throw new Error('Derivatives unavailable');
    this.gl = gl;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(s) ?? 'compile failed');
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');
    this.program = program;
    gl.useProgram(program);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const names: U[] = [
      'uRes',
      'uRect',
      'uRot',
      'uOffset',
      'uFocal',
      'uA',
      'uB',
      'uSizeA',
      'uSizeB',
      'uWall',
      'uGrid',
      'uPanelLed',
      'uPanelSize',
      'uAxis',
      'uTime',
      'uIntro',
      'uSeam',
      'uGlow',
      'uLift',
    ];
    this.u = Object.fromEntries(
      names.map((n) => [n, gl.getUniformLocation(program, n)])
    ) as Record<U, WebGLUniformLocation | null>;
    gl.uniform1i(this.u.uA, 0);
    gl.uniform1i(this.u.uB, 1);

    this.textures = scenes.map(() => null);
    this.sizes = scenes.map((s) => [s.w, s.h]);
    this.resize();
  }

  /** Loads scene `i`. `img` can be the page's own <img>, so each photo downloads once. */
  load(i: number, img?: HTMLImageElement): Promise<void> {
    if (this.textures[i]) return Promise.resolve();
    const existing = this.loading.get(i);
    if (existing) return existing;
    const p = new Promise<void>((resolve, reject) => {
      const done = (el: HTMLImageElement) => {
        const gl = this.gl;
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, el);
        this.textures[i] = tex;
        if (el.naturalWidth)
          this.sizes[i] = [el.naturalWidth, el.naturalHeight];
        resolve();
      };
      const fetchOwn = () => {
        const el = new Image();
        el.decoding = 'async';
        el.onload = () => done(el);
        el.onerror = () => reject(new Error(`failed to load scene ${i}`));
        el.src = this.optimisedUrl(this.scenes[i]!.src);
      };
      if (!img) return fetchOwn();
      if (img.complete && img.naturalWidth) return done(img);
      img.addEventListener('load', () => done(img), { once: true });
      img.addEventListener('error', fetchOwn, { once: true });
    });
    this.loading.set(i, p);
    return p;
  }

  private optimisedUrl(src: string) {
    // Both widths are in image-sizes.json, so the pre-resized file exists.
    const w = this.canvas.clientWidth * this.dpr > 1300 ? 1920 : 1080;
    return imageLoader({ src, width: w });
  }

  /** Begins a change to scene `i`. Animate `progress` from 0 to 1, then call `commit`. */
  prepare(i: number) {
    this.next = i;
    this.progress = 0;
  }

  commit() {
    this.current = this.next;
    this.progress = 0;
  }

  /** Pointer in client coordinates; `inside` false eases the wall flat again. */
  setPointer(clientX: number, clientY: number, inside: boolean) {
    const r = this.canvas.getBoundingClientRect();
    this.pointer.x =
      (clientX - r.left) * (this.canvas.width / Math.max(1, r.width));
    this.pointer.y =
      (r.bottom - clientY) * (this.canvas.height / Math.max(1, r.height));
    this.pointer.inside = inside;
  }

  leave() {
    this.pointer.inside = false;
  }

  resize() {
    const mobile = window.innerWidth < 768;
    this.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 2 : 1.75);
    const W = Math.max(1, Math.round(this.canvas.clientWidth * this.dpr));
    const H = Math.max(1, Math.round(this.canvas.clientHeight * this.dpr));
    if (this.canvas.width !== W || this.canvas.height !== H) {
      this.canvas.width = W;
      this.canvas.height = H;
    }
    this.gl.viewport(0, 0, W, H);

    this.pitch = Math.max(
      3,
      Math.round((mobile ? this.opts.pitch * 0.8 : this.opts.pitch) * this.dpr)
    );
    const cssW = W / this.dpr;
    const cssH = H / this.dpr;
    const target = mobile ? 170 : 250;
    const cols = Math.min(9, Math.max(2, Math.round(cssW / target)));
    const rows = Math.min(7, Math.max(2, Math.round(cssH / target)));
    const P = this.pitch;
    this.cab = {
      x: Math.ceil(Math.ceil(W / P) / cols),
      y: Math.ceil(Math.ceil(H / P) / rows),
    };
    this.grid = { x: this.cab.x * cols, y: this.cab.y * rows };
    this.origin = {
      x: (W - this.grid.x * P) / 2,
      y: (H - this.grid.y * P) / 2,
    };

    // Flip order: a diagonal wave from top-left with a little jitter; axes alternate.
    this.cabinets = [];
    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < cols; ix++) {
        const diag =
          (ix / Math.max(1, cols - 1)) * 0.65 +
          ((rows - 1 - iy) / Math.max(1, rows - 1)) * 0.35;
        const jitter = ((ix * 73 + iy * 151) % 17) / 17;
        this.cabinets.push({
          ix,
          iy,
          order: clamp01(diag * 0.85 + jitter * 0.15),
          axis: (ix + iy) % 2 === 0 ? 0 : 1,
          dir: (ix * 7 + iy * 3) % 2 === 0 ? 1 : -1,
          tiltX: 0,
          tiltY: 0,
          lift: 0,
          z: 0,
        });
      }
    }
  }

  render(time: number) {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    const a = this.textures[this.current];
    const b = this.textures[this.next] ?? a;
    if (!a) return;

    gl.useProgram(this.program);
    gl.clearColor(0.031, 0.035, 0.043, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, b!);

    const W = this.canvas.width;
    const H = this.canvas.height;
    const P = this.pitch;
    const cw = this.cab.x * P;
    const ch = this.cab.y * P;
    const sa = this.sizes[this.current]!;
    const sb = this.sizes[this.next] ?? sa;
    gl.uniform2f(this.u.uSizeA, sa[0], sa[1]);
    gl.uniform2f(this.u.uSizeB, sb[0], sb[1]);
    gl.uniform2f(this.u.uRes, W, H);
    gl.uniform1f(this.u.uFocal, H * 1.5);
    gl.uniform2f(this.u.uWall, this.grid.x * P, this.grid.y * P);
    gl.uniform2f(this.u.uGrid, this.grid.x, this.grid.y);
    gl.uniform2f(this.u.uPanelSize, this.cab.x, this.cab.y);
    gl.uniform1f(this.u.uTime, time / 1000);
    gl.uniform1f(this.u.uIntro, this.intro);

    const spread = 0.55;
    const reach = Math.max(cw, ch) * 2.2;
    const frames = this.cabinets.map((c) => {
      const cx = this.origin.x + (c.ix + 0.5) * cw;
      const cy = this.origin.y + (c.iy + 0.5) * ch;

      // Scene change: each cabinet pushes back, turns over and returns.
      const f = easeInOut(
        clamp01((this.progress - c.order * spread) / (1 - spread))
      );
      const arc = Math.sin(Math.PI * f);
      const flip = Math.PI * f * c.dir;

      // Pointer: nearby cabinets lift and tilt away from the cursor, like pressing up through the wall.
      const dx = (cx - this.pointer.x) / reach;
      const dy = (cy - this.pointer.y) / reach;
      const near = this.pointer.inside
        ? Math.exp(-(dx * dx + dy * dy) * 2.2)
        : 0;
      c.tiltY += (Math.max(-1, Math.min(1, dx)) * 0.22 * near - c.tiltY) * 0.1;
      c.tiltX += (-Math.max(-1, Math.min(1, dy)) * 0.22 * near - c.tiltX) * 0.1;
      c.lift += (near - c.lift) * 0.1;

      c.z = -arc * Math.max(cw, ch) * 0.9 + c.lift * Math.max(cw, ch) * 0.18;
      return {
        c,
        cx,
        cy,
        rx: c.tiltX + (c.axis === 1 ? flip : 0),
        ry: c.tiltY + (c.axis === 0 ? flip : 0),
        z: c.z,
        seam: Math.max(arc, Math.min(1, c.lift * 1.4)),
        glow: Math.pow(arc, 3) * 0.35,
      };
    });

    // Far cabinets first so nearer ones draw over them.
    frames.sort((p, q) => p.z - q.z);
    for (const fr of frames) {
      gl.uniform4f(this.u.uRect, fr.cx - cw / 2, fr.cy - ch / 2, cw, ch);
      gl.uniform3f(this.u.uRot, fr.rx, fr.ry, 0);
      gl.uniform3f(this.u.uOffset, 0, 0, fr.z);
      gl.uniform2f(
        this.u.uPanelLed,
        fr.c.ix * this.cab.x,
        fr.c.iy * this.cab.y
      );
      gl.uniform1f(this.u.uAxis, fr.c.axis);
      gl.uniform1f(this.u.uSeam, fr.seam);
      gl.uniform1f(this.u.uGlow, fr.glow);
      gl.uniform1f(this.u.uLift, fr.c.lift * 0.25);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  /** True while any cabinet is still easing back from the pointer. */
  isSettling() {
    return this.cabinets.some(
      (c) =>
        Math.abs(c.lift) > 0.002 ||
        Math.abs(c.tiltX) > 0.0005 ||
        Math.abs(c.tiltY) > 0.0005
    );
  }

  /** Frees GPU resources. The context itself is left to the browser to collect. */
  destroy() {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    this.textures.forEach((t) => t && gl.deleteTexture(t));
    this.textures = [];
    if (this.buffer) gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
  }
}
