"""Renders the nORMvis hero background loop (abstract digital network).

Original artwork generated procedurally, so it carries no third-party license.
Output: public/assets/videos/hero-background.mp4 and hero-poster.jpg
Requires (tooling only, not site dependencies): numpy, pillow, imageio-ffmpeg
Run: python3 tools/generate-hero-video.py
"""
import math, os, random, subprocess
import numpy as np
from PIL import Image, ImageDraw
import imageio_ffmpeg

W, H, FPS, DUR, S = 1280, 720, 24, 10, 2
N = FPS * DUR
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'videos')
rnd = random.Random(7)

# soft light-blue / violet background
y, x = np.mgrid[0:H, 0:W]
base, blue, vio = np.array([247, 249, 252.]), np.array([224, 234, 252.]), np.array([234, 228, 252.])
d1 = np.exp(-(((x - W * .82) / (W * .45)) ** 2 + ((y - H * .25) / (H * .7)) ** 2))
d2 = np.exp(-(((x - W * .55) / (W * .4)) ** 2 + ((y - H * .95) / (H * .5)) ** 2))
bg = (base + (blue - base) * d1[..., None] * .9 + (vio - base) * d2[..., None] * .7).clip(0, 255).astype('uint8')
bg_big = Image.fromarray(bg).resize((W * S, H * S), Image.BILINEAR).convert('RGBA')

nodes = []
for _ in range(78):
    nodes.append(dict(x=W * (0.08 + 0.9 * rnd.random() ** 0.75), y=H * (0.08 + 0.84 * rnd.random()),
                      ax=rnd.uniform(14, 46), ay=rnd.uniform(14, 46), kx=rnd.choice([1, 1, 2]), ky=rnd.choice([1, 2]),
                      px=rnd.random(), py=rnd.random(), r=rnd.uniform(2, 4.2), v=rnd.random() < .18))

def pos_at(t):
    return [(n['x'] + n['ax'] * math.sin(2 * math.pi * (n['kx'] * t + n['px'])),
             n['y'] + n['ay'] * math.cos(2 * math.pi * (n['ky'] * t + n['py']))) for n in nodes]

p0 = pos_at(0)
pairs = [(i, j) for i in range(len(nodes)) for j in range(i + 1, len(nodes)) if math.dist(p0[i], p0[j]) < 150]
pulses = [(*rnd.choice(pairs), rnd.choice([1, 2]), rnd.random()) for _ in range(18)]
LINK = 190

def frame(k):
    t = k / N
    pos = pos_at(t)
    layer = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            dist = math.dist(pos[i], pos[j])
            if dist < LINK:
                a = int(120 * (1 - dist / LINK) ** 1.3)
                d.line([(pos[i][0] * S, pos[i][1] * S), (pos[j][0] * S, pos[j][1] * S)], fill=(36, 91, 219, a), width=S)
    for n, (px, py) in zip(nodes, pos):
        c = (112, 72, 232) if n['v'] else (36, 91, 219)
        r = n['r'] * S
        d.ellipse([px * S - r * 3, py * S - r * 3, px * S + r * 3, py * S + r * 3], fill=c + (26,))
        d.ellipse([px * S - r, py * S - r, px * S + r, py * S + r], fill=c + (215,))
    for i, j, m, ph in pulses:
        if math.dist(pos[i], pos[j]) < LINK + 10:
            s = (m * t + ph) % 1
            qx = (pos[i][0] + (pos[j][0] - pos[i][0]) * s) * S
            qy = (pos[i][1] + (pos[j][1] - pos[i][1]) * s) * S
            d.ellipse([qx - 9 * S, qy - 9 * S, qx + 9 * S, qy + 9 * S], fill=(36, 91, 219, 45))
            d.ellipse([qx - 3 * S, qy - 3 * S, qx + 3 * S, qy + 3 * S], fill=(36, 91, 219, 235))
    return Image.alpha_composite(bg_big, layer).convert('RGB').resize((W, H), Image.LANCZOS)

os.makedirs(OUT, exist_ok=True)
frame(0).save(os.path.join(OUT, 'hero-poster.jpg'), quality=78, optimize=True, progressive=True)
cmd = [imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
       '-r', str(FPS), '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p',
       '-movflags', '+faststart', os.path.join(OUT, 'hero-background.mp4')]
p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
for k in range(N):
    p.stdin.write(frame(k).tobytes())
    if k % 24 == 0: print('frame', k, flush=True)
p.stdin.close(); p.wait()
print('done')
