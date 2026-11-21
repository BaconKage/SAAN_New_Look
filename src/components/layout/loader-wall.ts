/**
 * The loading screen as an LED video wall being assembled.
 *
 * The screen is divided into LED cabinets. Each cabinet flies in from depth,
 * tilted and already playing content, and locks into place; the seams flash and
 * close into one seamless wall the size of the visitor's screen. The wall then
 * writes "SAAN" LED by LED and the camera dives into one lit LED.
 *
 * Every cabinet is a quad with a true perspective transform. It always shows
 * its own slice of the final wall, so the picture lines up the moment the
 * cabinets lock together. The word is rasterised at exactly one texel per LED.
 *
 * Raw WebGL1. The caller drives time; see `update`.
 */

const VERT = `
attribute vec2 aPos;
uniform vec2 uRes;
uniform vec4 uRect;     // target rect in buffer px: x, y (from bottom), w, h
uniform vec3 uRot;      // radians around x, y, z
uniform vec3 uOffset;   // px; negative z is away from the viewer
uniform float uFocal;
uniform float uZoom;
uniform vec2 uFocus;
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

  // Perspective around the screen centre, then the camera dive around uFocus.
  vec2 sc = uRes * 0.5;
  float s = uFocal / max(uFocal - p.z, 1.0);
  vec2 screen = sc + (p.xy - sc) * s;
  screen = uFocus + (screen - uFocus) * uZoom;
  vec2 clip = screen / uRes * 2.0 - 1.0;
  // Hand the depth to the GPU as w so the LED grid stays perspective-correct.
  float w = 1.0 / s;
  gl_Position = vec4(clip * w, 0.0, w);
}
`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 vUv;
uniform vec2 uGrid;
uniform vec2 uPanelLed;
uniform vec2 uPanelSize;
uniform float uTime;
uniform sampler2D uText;
uniform float uHasText;
uniform float uReveal;
uniform float uFlash;
uniform float uSeam;
uniform float uSeamGlow;
uniform float uImpact;
uniform float uLit;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 L = uPanelLed + vUv * uPanelSize;   // position in LEDs across the whole wall
  vec2 cell = floor(L);
  vec2 local = fract(L) - 0.5;
  vec2 g = (cell + 0.5) / uGrid;
  float h = hash(cell);
  float t = uTime;

  // Live content: drifting amber plasma and a refresh band, in wall space.
  float pl = vnoise(cell * 0.045 + vec2(t * 0.16, -t * 0.06)) * 0.6 + vnoise(cell * 0.12 - vec2(t * 0.1, t * 0.18)) * 0.4;
  float amb = 0.08 + 0.3 * smoothstep(0.38, 0.88, pl);
  amb += 0.14 * exp(-pow((g.y - fract(1.0 - t * 0.3)) * 14.0, 2.0));
  amb *= 0.82 + 0.18 * sin(t * 2.3 + h * 40.0);
  amb += uImpact * (0.3 + 0.2 * h);
  // Dim the background once the word starts writing so it stands out.
  amb *= (1.0 - 0.4 * uReveal) * (1.0 - 0.6 * uFlash);

  // "SAAN", written left to right; each LED sparks white as it switches on.
  float txt = uHasText * smoothstep(0.28, 0.72, texture2D(uText, vec2(g.x, 1.0 - g.y)).r);
  float thr = g.x * 0.8 + h * 0.16;
  float r = uReveal * 0.97;
  float lit = smoothstep(thr - 0.01, thr + 0.02, r);
  float spark = lit * (1.0 - smoothstep(thr + 0.02, thr + 0.11, r));

  vec3 amber = vec3(0.878, 0.541, 0.0);
  vec3 hot = vec3(1.0, 0.9, 0.68);
  vec3 col = amber * amb;
  // Kept below 1.0 so the LED centre stays amber instead of clipping to yellow.
  vec3 word = mix(amber * 0.62, hot, max(spark, uFlash));
  col = mix(col, word, txt * lit) * uLit;

  // LED geometry. When a cabinet is far away its LEDs shrink below a pixel,
  // so fade to their average colour instead of shimmering.
  float px = max(fwidth(L.x), fwidth(L.y));
  vec2 q = abs(local) - 0.2;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.1;
  float emitter = 1.0 - smoothstep(-0.03, 0.05 + px, d);
  float bloom = exp(-dot(local, local) * 7.0) * 0.55;
  vec3 body = vec3(0.022, 0.023, 0.027) * (1.0 - smoothstep(-0.05, 0.08, d));
  vec3 led = body + col * (emitter * 1.35 + bloom);
  led = mix(led, vec3(0.022) + col * 0.8, smoothstep(0.35, 0.9, px));

  // Cabinet frame: dark seams while assembling, an amber flash as they lock.
  vec2 e2 = min(L - uPanelLed, uPanelLed + uPanelSize - L);
  float edge = min(e2.x, e2.y);
  float bez = 1.0 - smoothstep(0.0, 0.5 + px * 1.5, edge);
  led = mix(led, vec3(0.055, 0.058, 0.064), bez * uSeam);
  led += vec3(1.0, 0.62, 0.05) * bez * uSeamGlow;

  gl_FragColor = vec4(led, 1.0);
}
`;

type U =
  | 'uRes'
  | 'uRect'
  | 'uRot'
  | 'uOffset'
  | 'uFocal'
  | 'uZoom'
  | 'uFocus'
  | 'uGrid'
  | 'uPanelLed'
  | 'uPanelSize'
  | 'uTime'
  | 'uText'
  | 'uHasText'
  | 'uReveal'
  | 'uFlash'
  | 'uSeam'
  | 'uSeamGlow'
  | 'uImpact'
  | 'uLit';

interface Panel {
  ix: number;
  iy: number;
  delay: number;
  dur: number;
  from: { x: number; y: number; z: number; rx: number; ry: number; rz: number };
  /** Live values for the current frame. */
  now: {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    impact: number;
    lit: number;
  };
}

/** Small seeded RNG so every load assembles the same way. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Timeline, in seconds. Keep the whole thing near three seconds. */
export const TIMELINE = {
  assemble: 1.35,
  lockEnd: 1.75,
  revealStart: 1.5,
  revealEnd: 2.2,
  flashEnd: 2.38,
  diveStart: 2.38,
  diveEnd: 2.95,
  done: 2.6,
  fadeStart: 2.68,
  end: 3.0,
};

export class AssemblyWall {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private buffer: WebGLBuffer | null;
  private u: Record<U, WebGLUniformLocation | null>;
  private textTex: WebGLTexture | null = null;
  private family = 'sans-serif';
  private panels: Panel[] = [];
  private pitch = 8;
  private cols = 3;
  private rows = 2;
  private cab = { x: 1, y: 1 };
  private grid = { x: 1, y: 1 };
  private origin = { x: 0, y: 0 };

  private seam = 1;
  private seamGlow = 0;
  private reveal = 0;
  private flash = 0;
  private zoom = 1;
  private focus = { x: 0, y: 0 };

  constructor(private canvas: HTMLCanvasElement) {
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
      'uZoom',
      'uFocus',
      'uGrid',
      'uPanelLed',
      'uPanelSize',
      'uTime',
      'uText',
      'uHasText',
      'uReveal',
      'uFlash',
      'uSeam',
      'uSeamGlow',
      'uImpact',
      'uLit',
    ];
    this.u = Object.fromEntries(
      names.map((n) => [n, gl.getUniformLocation(program, n)])
    ) as Record<U, WebGLUniformLocation | null>;
    gl.uniform1i(this.u.uText, 0);
    this.resize();
  }

  /** Sizes the buffer, splits the screen into cabinets and plans each flight. */
  resize() {
    const mobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = Math.max(1, Math.round(this.canvas.clientWidth * dpr));
    const H = Math.max(1, Math.round(this.canvas.clientHeight * dpr));
    this.canvas.width = W;
    this.canvas.height = H;
    this.gl.viewport(0, 0, W, H);

    this.pitch = Math.max(4, Math.round((mobile ? 6 : 8) * dpr));
    const cssW = W / dpr;
    const cssH = H / dpr;
    const target = mobile ? 185 : 290;
    this.cols = Math.min(8, Math.max(2, Math.round(cssW / target)));
    this.rows = Math.min(6, Math.max(2, Math.round(cssH / target)));
    const P = this.pitch;
    this.cab = {
      x: Math.ceil(Math.ceil(W / P) / this.cols),
      y: Math.ceil(Math.ceil(H / P) / this.rows),
    };
    this.grid = { x: this.cab.x * this.cols, y: this.cab.y * this.rows };
    this.origin = {
      x: (W - this.grid.x * P) / 2,
      y: (H - this.grid.y * P) / 2,
    };
    this.focus = { x: W / 2, y: H / 2 };

    // Flight plans: each cabinet starts deep in the scene, pushed outward and tilted.
    const rand = rng(7);
    this.panels = [];
    for (let iy = 0; iy < this.rows; iy++) {
      for (let ix = 0; ix < this.cols; ix++) {
        const cxp = this.origin.x + (ix + 0.5) * this.cab.x * P - W / 2;
        const cyp = this.origin.y + (iy + 0.5) * this.cab.y * P - H / 2;
        let ang = Math.atan2(cyp, cxp);
        if (Math.hypot(cxp, cyp) < Math.min(W, H) * 0.12)
          ang = rand() * Math.PI * 2;
        const push = Math.max(W, H) * (0.55 + rand() * 0.45);
        this.panels.push({
          ix,
          iy,
          delay: rand() * 0.5,
          dur: 0.78 + rand() * 0.07,
          from: {
            x: Math.cos(ang) * push,
            y: Math.sin(ang) * push,
            z: -(H * 1.6 + rand() * H * 2.4),
            rx: (rand() - 0.5) * 1.8,
            ry: (rand() - 0.5) * 2.2,
            rz: (rand() - 0.5) * 0.9,
          },
          now: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, impact: 0, lit: 0 },
        });
      }
    }
    if (this.textTex) this.buildText(this.family);
  }

  /**
   * Draws "SAAN" with the logo's speed lines at one texel per LED, uploads it,
   * and picks a lit LED near the middle of the word as the dive target.
   */
  buildText(family: string) {
    this.family = family;
    const cols = this.grid.x;
    const rows = this.grid.y;
    const c = document.createElement('canvas');
    c.width = cols;
    c.height = rows;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cols, rows);
    ctx.fillStyle = '#fff';
    const setFont = (px: number) => {
      ctx.font = `italic 900 ${px}px ${family}`;
      try {
        ctx.fontStretch = 'expanded';
      } catch {
        /* older browsers: normal width */
      }
    };
    setFont(100);
    const w100 = ctx.measureText('SAAN').width || 300;
    const landscape = cols > rows;
    const size = Math.min(
      rows * (landscape ? 0.42 : 0.16),
      ((cols * (landscape ? 0.62 : 0.74)) / w100) * 100
    );
    setFont(size);
    const m = ctx.measureText('SAAN');
    const asc = m.actualBoundingBoxAscent || size * 0.72;
    const desc = m.actualBoundingBoxDescent || 0;
    const capH = asc + desc;

    // Speed lines from the logo, to the left of the word.
    const lh = Math.max(1, Math.round(capH * 0.1));
    const gap = Math.max(1, Math.round(capH * 0.11));
    const lineW = capH * 0.85;
    const total = lineW + capH * 0.18 + m.width;
    const x0 = Math.round((cols - total) / 2);
    const baseline = Math.round(rows / 2 + capH / 2 - desc);
    const midY = baseline - capH / 2;
    [0.55, 1, 0.38].forEach((f, i) => {
      const y = Math.round(midY - (lh * 1.5 + gap) + i * (lh + gap));
      const len = Math.round(lineW * f);
      ctx.globalAlpha = i === 1 ? 1 : 0.75;
      ctx.fillRect(Math.round(x0 + lineW - len), y, len, lh);
    });
    ctx.globalAlpha = 1;
    const tx = x0 + lineW + capH * 0.18;
    ctx.fillText('SAAN', tx, baseline);

    const gl = this.gl;
    if (!this.textTex) this.textTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);

    // Dive target: the lit LED closest to the centre of the word.
    const data = ctx.getImageData(0, 0, cols, rows).data;
    const cx = tx + m.width / 2;
    let best = { d: Infinity, col: Math.round(cx), row: Math.round(midY) };
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (data[(row * cols + col) * 4]! < 200) continue;
        const dd = (col - cx) ** 2 + (row - midY) ** 2;
        if (dd < best.d) best = { d: dd, col, row };
      }
    }
    this.focus = {
      x: this.origin.x + (best.col + 0.5) * this.pitch,
      y: this.origin.y + (rows - 1 - best.row + 0.5) * this.pitch,
    };
  }

  /** Advances every value to timeline time `t` (seconds). */
  update(t: number) {
    const T = TIMELINE;
    for (const p of this.panels) {
      const k = clamp01((t - p.delay) / p.dur);
      const e = easeOut(k);
      const inv = 1 - e;
      p.now.x = p.from.x * inv;
      p.now.y = p.from.y * inv;
      p.now.z = p.from.z * inv;
      p.now.rx = p.from.rx * inv;
      p.now.ry = p.from.ry * inv;
      p.now.rz = p.from.rz * inv;
      p.now.lit = 0.55 + 0.45 * smooth(0, 0.35, k);
      const since = t - (p.delay + p.dur);
      p.now.impact = since >= 0 ? Math.exp(-since * 9) : 0;
    }
    this.seam = 1 - smooth(T.assemble + 0.1, T.lockEnd, t);
    this.seamGlow =
      smooth(T.assemble - 0.05, T.assemble + 0.08, t) *
      (1 - smooth(T.assemble + 0.1, T.lockEnd, t));
    this.reveal = smooth(T.revealStart, T.revealEnd, t);
    const flashIn = smooth(T.revealEnd, T.flashEnd, t);
    this.flash = flashIn * (1 - 0.8 * smooth(T.diveStart, T.diveEnd, t));
    const dive = clamp01((t - T.diveStart) / (T.diveEnd - T.diveStart));
    this.zoom = 1 + Math.pow(dive, 3) * 140;
  }

  render(time: number) {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    gl.useProgram(this.program);
    gl.clearColor(0.031, 0.035, 0.043, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (this.textTex) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textTex);
    }
    const W = this.canvas.width;
    const H = this.canvas.height;
    const P = this.pitch;
    gl.uniform2f(this.u.uRes, W, H);
    gl.uniform1f(this.u.uFocal, H * 1.4);
    gl.uniform1f(this.u.uZoom, this.zoom);
    gl.uniform2f(this.u.uFocus, this.focus.x, this.focus.y);
    gl.uniform2f(this.u.uGrid, this.grid.x, this.grid.y);
    gl.uniform2f(this.u.uPanelSize, this.cab.x, this.cab.y);
    gl.uniform1f(this.u.uTime, time / 1000);
    gl.uniform1f(this.u.uHasText, this.textTex ? 1 : 0);
    gl.uniform1f(this.u.uReveal, this.reveal);
    gl.uniform1f(this.u.uFlash, this.flash);
    gl.uniform1f(this.u.uSeam, this.seam);
    gl.uniform1f(this.u.uSeamGlow, this.seamGlow);

    // Far cabinets first so nearer ones draw over them.
    const order = [...this.panels].sort((a, b) => a.now.z - b.now.z);
    for (const p of order) {
      gl.uniform4f(
        this.u.uRect,
        this.origin.x + p.ix * this.cab.x * P,
        this.origin.y + p.iy * this.cab.y * P,
        this.cab.x * P,
        this.cab.y * P
      );
      gl.uniform3f(this.u.uRot, p.now.rx, p.now.ry, p.now.rz);
      gl.uniform3f(this.u.uOffset, p.now.x, p.now.y, p.now.z);
      gl.uniform2f(this.u.uPanelLed, p.ix * this.cab.x, p.iy * this.cab.y);
      gl.uniform1f(this.u.uImpact, p.now.impact);
      gl.uniform1f(this.u.uLit, p.now.lit);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  destroy() {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    if (this.textTex) gl.deleteTexture(this.textTex);
    if (this.buffer) gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
  }
}
