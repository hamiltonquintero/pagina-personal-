// ==========================================================================
// HAMILTON QUINTERO GARCÍA — SPATIAL GLASS & DEPTH 3D ENGINE
// High-performance vanilla engine: 3D Hero Canvas, Card Tilt, Cotizador & Vault
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. LIVE TELEMETRY CLOCK (UTC-5 Manizales, Colombia)
  // --------------------------------------------------------------------------
  const clockEl = document.getElementById('live-clock');
  function updateTelemetryClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      clockEl.textContent = `${timeStr} COT`;
    } catch {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} COT`;
    }
  }
  updateTelemetryClock();
  setInterval(updateTelemetryClock, 1000);

  // --------------------------------------------------------------------------
  // 2. THEME SWITCHER (Dark Deep Obsidian <-> Light Spatial Glass)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  function applyTheme(targetTheme) {
    htmlEl.setAttribute('data-theme', targetTheme);
    localStorage.setItem('hq_theme', targetTheme);
  }

  function toggleTheme() {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Tema espacial cambiado a: ${next === 'dark' ? 'Oscuro (Obsidian)' : 'Claro (Glass)'}`);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 4. LIVING 3D NEURAL NETWORK BACKGROUND (ORGANIC SYNAPTIC WEB)
  // High-density 3D biological neural mesh with undulating axons, action potentials & cascades
  // --------------------------------------------------------------------------
  (function initLivingNeuralBackground() {
    const canvas = document.getElementById('spatial-neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animId = null;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 3D Neural Nodes Construction
    const numNeurons = Math.min(105, Math.max(55, Math.floor(window.innerWidth / 18)));
    const neurons = [];
    const spreadZ = 520;

    for (let i = 0; i < numNeurons; i++) {
      const isHub = i < Math.floor(numNeurons * 0.15); // 15% are Cortical Hubs
      neurons.push({
        baseX: (Math.random() - 0.5) * (width * 1.35),
        baseY: (Math.random() - 0.5) * (height * 1.35),
        baseZ: (Math.random() - 0.5) * spreadZ * 2,
        x: 0, y: 0, z: 0,
        projX: 0, projY: 0, scale: 1, alpha: 1,
        // Harmonic 3D wave fields for continuous fluid organic breathing
        freqX: 0.0007 + Math.random() * 0.0008,
        freqY: 0.0006 + Math.random() * 0.0008,
        freqZ: 0.0008 + Math.random() * 0.0008,
        ampX: 45 + Math.random() * 55,
        ampY: 40 + Math.random() * 50,
        ampZ: 50 + Math.random() * 60,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        isHub,
        baseR: isHub ? 4.2 : 2.0,
        charge: 0, // Electric discharge state [0..1]
        coronaR: 0,
        lastFiredTime: 0
      });
    }

    // Synaptic Action Potentials (Traveling Electric Sparks)
    const maxPulses = 24;
    const pulses = [];

    // Mouse Interaction
    const mouse = { x: -9999, y: -9999, targetX: 0, targetY: 0, isDown: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetX = (e.clientX - width / 2) * 0.0003;
      mouse.targetY = (e.clientY - height / 2) * 0.0003;
    }, { passive: true });

    // Click triggers massive synaptic shockwave
    window.addEventListener('pointerdown', (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      // Trigger all neurons within radius
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const dist = Math.hypot(n.projX - clickX, n.projY - clickY);
        if (dist < 320) {
          n.charge = 1.0;
          n.coronaR = 25;
          // Spawn outgoing pulses
          spawnPulsesFromNode(i, 2);
        }
      }
    });

    function spawnPulsesFromNode(sourceIdx, count = 1) {
      if (pulses.length >= maxPulses) return;
      const source = neurons[sourceIdx];
      // Find connected neighbors
      for (let j = 0; j < neurons.length && count > 0; j++) {
        if (j === sourceIdx) continue;
        const target = neurons[j];
        const d3d = Math.hypot(source.x - target.x, source.y - target.y, source.z - target.z);
        if (d3d < 230) {
          pulses.push({
            from: sourceIdx,
            to: j,
            t: 0,
            speed: 0.018 + Math.random() * 0.022,
            isHot: Math.random() > 0.4
          });
          count--;
        }
      }
    }

    // 3D Camera & Rotation
    const cameraDist = 480;
    let camRotY = 0;
    let camRotX = 0;

    function renderNeuralNetwork(time) {
      ctx.clearRect(0, 0, width, height);

      const isDark = (htmlEl.getAttribute('data-theme') || 'dark') === 'dark';
      const centerX = width / 2;
      const centerY = height / 2;

      // Smooth camera drift + subtle mouse influence
      camRotY += 0.0007 + mouse.targetX * 0.05;
      camRotX += (mouse.targetY * 0.7 - camRotX) * 0.04;

      const cosY = Math.cos(camRotY), sinY = Math.sin(camRotY);
      const cosX = Math.cos(camRotX), sinX = Math.sin(camRotX);

      // 1. Update 3D Positions with Organic Harmonic Wave Undulation
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Fluid organic floating wave field
        const waveX = Math.sin(time * n.freqX + n.phaseX) * n.ampX;
        const waveY = Math.cos(time * n.freqY + n.phaseY) * n.ampY;
        const waveZ = Math.sin(time * n.freqZ + n.phaseZ) * n.ampZ;

        let curX = n.baseX + waveX;
        let curY = n.baseY + waveY;
        let curZ = n.baseZ + waveZ;

        // 3D Rotation
        const x1 = curX * cosY + curZ * sinY;
        const z1 = -curX * sinY + curZ * cosY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = curY * sinX + z1 * cosX;

        n.x = x1;
        n.y = y2;
        n.z = z2;

        // Perspective Projection
        const depth = z2 + cameraDist;
        if (depth > 20) {
          const fovScale = cameraDist / depth;
          n.projX = centerX + x1 * fovScale;
          n.projY = centerY + y2 * fovScale;
          n.scale = fovScale;
          n.alpha = Math.max(0.12, Math.min(0.95, (z2 + spreadZ) / (spreadZ * 2)));
        } else {
          n.scale = 0;
        }

        // Decay electrical discharge
        if (n.charge > 0.01) {
          n.charge *= 0.92;
          n.coronaR += 0.8;
        } else {
          n.charge = 0;
          n.coronaR = 0;
        }

        // Mouse proximity stimulation
        const mDist = Math.hypot(n.projX - mouse.x, n.projY - mouse.y);
        if (mDist < 130 && time - n.lastFiredTime > 600) {
          n.charge = 1.0;
          n.lastFiredTime = time;
          spawnPulsesFromNode(i, 1);
        }
      }

      // Spontaneous autonomous hub firing to keep action potentials constantly circulating
      if (pulses.length < 14 && Math.random() < 0.12) {
        const randomHubIdx = Math.floor(Math.random() * Math.min(16, neurons.length));
        neurons[randomHubIdx].charge = 1.0;
        spawnPulsesFromNode(randomHubIdx, 2);
      }

      // 2. Draw Synaptic Axons (Living Undulating Fibers)
      ctx.lineWidth = 1;
      const links = [];

      for (let i = 0; i < neurons.length; i++) {
        const na = neurons[i];
        if (na.scale <= 0) continue;

        for (let j = i + 1; j < neurons.length; j++) {
          const nb = neurons[j];
          if (nb.scale <= 0) continue;

          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dz = na.z - nb.z;
          const d3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d3d < 225) {
            const linkAlpha = (1 - d3d / 225) * Math.min(na.alpha, nb.alpha);
            const isCharged = na.charge > 0.15 || nb.charge > 0.15;
            const extraGlow = Math.max(na.charge, nb.charge);

            // Undulating curved axon midpoint
            const midX = (na.projX + nb.projX) / 2;
            const midY = (na.projY + nb.projY) / 2;
            const waveOffset = Math.sin(time * 0.002 + (i + j)) * 8;
            const ctrlX = midX - (nb.projY - na.projY) * 0.06 + waveOffset;
            const ctrlY = midY + (nb.projX - na.projX) * 0.06 + waveOffset;

            ctx.beginPath();
            ctx.moveTo(na.projX, na.projY);
            ctx.quadraticCurveTo(ctrlX, ctrlY, nb.projX, nb.projY);

            if (isDark) {
              if (isCharged) {
                ctx.strokeStyle = `rgba(0, 242, 254, ${Math.min(0.85, linkAlpha * 0.6 + extraGlow * 0.4)})`;
                ctx.lineWidth = 1.6;
              } else {
                ctx.strokeStyle = `rgba(139, 92, 246, ${linkAlpha * 0.28})`;
                ctx.lineWidth = 1;
              }
            } else {
              if (isCharged) {
                ctx.strokeStyle = `rgba(2, 132, 199, ${Math.min(0.8, linkAlpha * 0.6 + extraGlow * 0.4)})`;
                ctx.lineWidth = 1.6;
              } else {
                ctx.strokeStyle = `rgba(124, 58, 237, ${linkAlpha * 0.25})`;
                ctx.lineWidth = 1;
              }
            }
            ctx.stroke();

            links.push({ a: i, b: j, ctrlX, ctrlY });
          }
        }
      }

      // 3. Update & Draw Action Potentials (Electric Synaptic Sparks)
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;

        const na = neurons[pulse.from];
        const nb = neurons[pulse.to];

        if (!na || !nb || na.scale <= 0 || nb.scale <= 0) {
          pulses.splice(p, 1);
          continue;
        }

        // Interpolate along curved Bezier axon
        const t = pulse.t;
        const midX = (na.projX + nb.projX) / 2;
        const midY = (na.projY + nb.projY) / 2;
        const ctrlX = midX - (nb.projY - na.projY) * 0.06;
        const ctrlY = midY + (nb.projX - na.projX) * 0.06;

        const curPx = (1 - t) * (1 - t) * na.projX + 2 * (1 - t) * t * ctrlX + t * t * nb.projX;
        const curPy = (1 - t) * (1 - t) * na.projY + 2 * (1 - t) * t * ctrlY + t * t * nb.projY;

        // Spark rendering
        const sparkR = pulse.isHot ? 3.5 : 2.5;
        ctx.beginPath();
        ctx.arc(curPx, curPy, sparkR * na.scale, 0, Math.PI * 2);
        const sparkColor = pulse.isHot ? '#ffffff' : '#00f2fe';
        ctx.fillStyle = sparkColor;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Arrived at target neuron -> Cascade discharge!
        if (pulse.t >= 1.0) {
          nb.charge = 1.0;
          nb.coronaR = 18;
          pulses.splice(p, 1);

          // 55% chance to propagate cascade through other outgoing axons
          if (Math.random() < 0.55 && pulses.length < maxPulses) {
            spawnPulsesFromNode(pulse.to, 1);
          }
        }
      }

      // 4. Draw Neurons & Expanding Discharge Coronas
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        if (n.scale <= 0) continue;

        const r = Math.max(1.4, n.baseR * n.scale);

        // Expanding Synaptic Corona Shockwave
        if (n.charge > 0.05) {
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, r + n.coronaR * n.scale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 242, 254, ${n.charge * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Neuron Body
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, r, 0, Math.PI * 2);

        if (n.charge > 0.2) {
          // Fired state (Bright discharge)
          ctx.fillStyle = isDark ? '#ffffff' : '#00f2fe';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (n.isHub) {
          // Cortical Hub (Deep Cyan/Purple with halo)
          ctx.fillStyle = isDark ? '#00f2fe' : '#0284c7';
          ctx.shadowColor = isDark ? '#00f2fe' : '#0284c7';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Interneuron (Subtle violet/blue)
          const alpha = n.alpha;
          ctx.fillStyle = isDark ? `rgba(139, 92, 246, ${alpha})` : `rgba(124, 58, 237, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(renderNeuralNetwork);
    }

    animId = requestAnimationFrame(renderNeuralNetwork);
  })();

  // --------------------------------------------------------------------------
  // 4B. INTERACTIVE 3D HOLOGRAPHIC CORE & 3D FIGURES (Desarrollo, Ciberseguridad, Redes & IA)
  // --------------------------------------------------------------------------
  (function initSpatial3DFigures() {
    // Math 3D Engine Utilities
    function rotate3D(x, y, z, rx, ry, rz = 0) {
      // Y-Rotation
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // X-Rotation
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Z-Rotation
      if (rz !== 0) {
        const cosZ = Math.cos(rz), sinZ = Math.sin(rz);
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;
        return [x3, y3, z2];
      }
      return [x1, y2, z2];
    }

    function project3D(x, y, z, cx, cy, fov = 340) {
      const depth = fov + z;
      if (depth <= 15) return null;
      const scale = fov / depth;
      return [cx + x * scale, cy + y * scale, scale, z];
    }

    // Geometry 1: Dev Tesseract (4D Hypercube + Orbiting Code Tokens)
    const tesseractOuter = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];
    const tesseractInner = tesseractOuter.map(v => [v[0] * 0.52, v[1] * 0.52, v[2] * 0.52]);
    const tesseractOuterEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    const devRunes = ['</>', '{ }', '0101', 'API', 'SQL', 'λ'];

    function drawDevModel(ctx, w, h, rx, ry, scale, isMini = false, time = 0) {
      const cx = w / 2;
      const cy = h / 2;
      const rOuter = scale * 0.95;
      const rInner = scale * 0.95;

      const pOuter = tesseractOuter.map(v => {
        const [x, y, z] = rotate3D(v[0] * rOuter, v[1] * rOuter, v[2] * rOuter, rx, ry);
        return project3D(x, y, z, cx, cy);
      });

      const pInner = tesseractInner.map(v => {
        const [x, y, z] = rotate3D(v[0] * rInner, v[1] * rInner, v[2] * rInner, rx, ry);
        return project3D(x, y, z, cx, cy);
      });

      // Draw Struts connecting outer to inner (Hypercube 4D Projection)
      ctx.lineWidth = isMini ? 1 : 1.2;
      for (let i = 0; i < 8; i++) {
        const o = pOuter[i];
        const n = pInner[i];
        if (o && n) {
          ctx.beginPath();
          ctx.moveTo(o[0], o[1]);
          ctx.lineTo(n[0], n[1]);
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
          ctx.stroke();
        }
      }

      // Draw Inner Cube
      ctx.lineWidth = isMini ? 1 : 1.4;
      for (const [a, b] of tesseractOuterEdges) {
        const pa = pInner[a];
        const pb = pInner[b];
        if (pa && pb) {
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.stroke();
        }
      }

      // Draw Outer Cube
      ctx.lineWidth = isMini ? 1.4 : 2;
      for (const [a, b] of tesseractOuterEdges) {
        const pa = pOuter[a];
        const pb = pOuter[b];
        if (pa && pb) {
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.9)';
          ctx.stroke();
        }
      }

      // Outer Vertices with Neon Glow
      for (const p of pOuter) {
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p[0], p[1], Math.max(1.8, 3.2 * p[2]), 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = isMini ? 4 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Orbiting Code Runes (If Main Holo-Pod)
      if (!isMini) {
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const orbitR = scale * 1.45;

        for (let i = 0; i < devRunes.length; i++) {
          const angle = time * 0.0015 + (i * Math.PI * 2) / devRunes.length;
          const ox = Math.cos(angle) * orbitR;
          const oz = Math.sin(angle) * orbitR;
          const oy = Math.sin(angle * 2) * (scale * 0.35);

          const [tx, ty, tz] = rotate3D(ox, oy, oz, rx * 0.6, ry * 0.6);
          const proj = project3D(tx, ty, tz, cx, cy);
          if (proj) {
            const alpha = Math.max(0.25, Math.min(1, (tz + orbitR) / (orbitR * 2)));
            ctx.fillStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
            ctx.shadowBlur = 6;
            ctx.fillText(devRunes[i], proj[0], proj[1]);
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    // Geometry 2: Cybersecurity (Icosahedron Shield & Geodesic Defense Vault)
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoNorm = Math.sqrt(1 + phi * phi);
    const icoBaseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(v => [v[0] / icoNorm, v[1] / icoNorm, v[2] / icoNorm]);

    const icoFaces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    function drawSecModel(ctx, w, h, rx, ry, scale, isMini = false, time = 0) {
      const cx = w / 2;
      const cy = h / 2;
      const r = scale * 0.85;

      const rotatedVertices = icoBaseVertices.map(v => {
        const [x, y, z] = rotate3D(v[0] * r, v[1] * r, v[2] * r, rx, ry);
        const proj = project3D(x, y, z, cx, cy);
        return { x, y, z, proj };
      });

      // Sort faces by depth Z (Painter's Algorithm)
      const sortedFaces = icoFaces.map(face => {
        const v0 = rotatedVertices[face[0]];
        const v1 = rotatedVertices[face[1]];
        const v2 = rotatedVertices[face[2]];
        const avgZ = (v0.z + v1.z + v2.z) / 3;

        // Face Normal Z to detect facing orientation
        const abX = v1.x - v0.x, abY = v1.y - v0.y, abZ = v1.z - v0.z;
        const acX = v2.x - v0.x, acY = v2.y - v0.y, acZ = v2.z - v0.z;
        const normZ = abX * acY - abY * acX;

        return { face, avgZ, normZ };
      }).sort((a, b) => a.avgZ - b.avgZ);

      // Render triangular volumetric faces
      for (const { face, normZ } of sortedFaces) {
        const p0 = rotatedVertices[face[0]].proj;
        const p1 = rotatedVertices[face[1]].proj;
        const p2 = rotatedVertices[face[2]].proj;

        if (p0 && p1 && p2) {
          const isFacing = normZ > 0;
          ctx.beginPath();
          ctx.moveTo(p0[0], p0[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.closePath();

          if (isFacing) {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.16)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.85)';
            ctx.lineWidth = isMini ? 1.2 : 1.6;
          } else {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // Orbital Defense Radar Ring
      const ringR = scale * 1.35;
      const numRingSteps = 36;
      const ringAngle = time * 0.002;
      ctx.beginPath();
      for (let i = 0; i <= numRingSteps; i++) {
        const theta = (i / numRingSteps) * Math.PI * 2;
        const qx = Math.cos(theta) * ringR;
        const qz = Math.sin(theta) * ringR;
        const [tx, ty, tz] = rotate3D(qx, Math.sin(theta + ringAngle) * 15, qz, rx + 0.45, ry + 0.3);
        const proj = project3D(tx, ty, tz, cx, cy);
        if (proj) {
          if (i === 0) ctx.moveTo(proj[0], proj[1]);
          else ctx.lineTo(proj[0], proj[1]);
        }
      }
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = isMini ? 1 : 1.4;
      ctx.stroke();

      // Pulsing Security Beacon in Center
      const beaconPulse = Math.sin(time * 0.006) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 3 + beaconPulse * (isMini ? 3 : 5), 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Geometry 3: Cisco Networking (Octahedron Mesh + Real-time Packet Routing)
    const netBaseNodes = [
      [0, 0, 0],        // 0: Core Switch Hub
      [0, -1, 0],       // 1: Router North
      [0, 1, 0],        // 2: Router South
      [1, 0, 0],        // 3: Router East
      [-1, 0, 0],       // 4: Router West
      [0, 0, 1],        // 5: Router Front
      [0, 0, -1],       // 6: Router Back
      [0.75, -0.75, 0.4], // 7: Leaf AP
      [-0.75, -0.75, -0.4],// 8: Leaf Server
      [0.75, 0.75, -0.4], // 9: Leaf DB
      [-0.75, 0.75, 0.4]  // 10: Leaf Firewall
    ];

    const netEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 3], [3, 2], [2, 4], [4, 1],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [6, 1], [6, 2], [6, 3], [6, 4],
      [1, 7], [1, 8], [2, 9], [2, 10]
    ];

    const netPackets = [
      { edgeIdx: 0, t: 0.1, speed: 0.015, color: '#00f2fe' },
      { edgeIdx: 2, t: 0.5, speed: 0.02, color: '#10b981' },
      { edgeIdx: 7, t: 0.8, speed: 0.018, color: '#38bdf8' },
      { edgeIdx: 11, t: 0.3, speed: 0.022, color: '#00f2fe' },
      { edgeIdx: 15, t: 0.6, speed: 0.016, color: '#10b981' },
      { edgeIdx: 18, t: 0.4, speed: 0.025, color: '#38bdf8' }
    ];

    function drawNetModel(ctx, w, h, rx, ry, scale, isMini = false, time = 0) {
      const cx = w / 2;
      const cy = h / 2;
      const r = scale * 0.95;

      const pNodes = netBaseNodes.map((v, idx) => {
        const [x, y, z] = rotate3D(v[0] * r, v[1] * r, v[2] * r, rx, ry);
        const proj = project3D(x, y, z, cx, cy);
        return { x, y, z, proj, isCore: idx === 0, isRouter: idx >= 1 && idx <= 6 };
      });

      // Draw Network Links
      ctx.lineWidth = isMini ? 1 : 1.3;
      for (const [a, b] of netEdges) {
        const pa = pNodes[a].proj;
        const pb = pNodes[b].proj;
        if (pa && pb) {
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = (a === 0 || b === 0) ? 'rgba(56, 189, 248, 0.65)' : 'rgba(56, 189, 248, 0.25)';
          ctx.stroke();
        }
      }

      // Draw Real-time Data Packets flowing along links
      for (const pkt of netPackets) {
        pkt.t += pkt.speed;
        if (pkt.t >= 1) {
          pkt.t = 0;
          // Jump to another connected edge
          pkt.edgeIdx = Math.floor(Math.random() * netEdges.length);
        }

        const [a, b] = netEdges[pkt.edgeIdx];
        const pa = pNodes[a].proj;
        const pb = pNodes[b].proj;
        if (pa && pb) {
          const px = pa[0] + (pb[0] - pa[0]) * pkt.t;
          const py = pa[1] + (pb[1] - pa[1]) * pkt.t;

          ctx.beginPath();
          ctx.arc(px, py, isMini ? 2 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = pkt.color;
          ctx.shadowColor = pkt.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      for (let i = 0; i < pNodes.length; i++) {
        const node = pNodes[i];
        if (!node.proj) continue;
        const [nx, ny, nscale] = node.proj;

        ctx.beginPath();
        if (node.isCore) {
          // Central Core Switch
          const s = (isMini ? 4 : 7) * nscale;
          ctx.rect(nx - s, ny - s, s * 2, s * 2);
          ctx.fillStyle = '#0284c7';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (node.isRouter) {
          // Perimeter Routers
          ctx.arc(nx, ny, (isMini ? 2.5 : 4.5) * nscale, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.fill();
        } else {
          // Satellite leaves
          ctx.arc(nx, ny, (isMini ? 1.8 : 3) * nscale, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
        }
      }
    }

    // Geometry 4: Artificial Intelligence (Neural Synaptic Sphere & Synapses)
    const numNeurons = 20;
    const aiNeurons = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numNeurons; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const y = 1 - (i / (numNeurons - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const x = Math.cos(theta) * rad;
      const z = Math.sin(theta) * rad;
      aiNeurons.push([x, y, z]);
    }

    const aiSynapses = [];
    for (let i = 0; i < numNeurons; i++) {
      for (let j = i + 1; j < numNeurons; j++) {
        const dx = aiNeurons[i][0] - aiNeurons[j][0];
        const dy = aiNeurons[i][1] - aiNeurons[j][1];
        const dz = aiNeurons[i][2] - aiNeurons[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 1.1) {
          aiSynapses.push([i, j]);
        }
      }
    }

    function drawAiModel(ctx, w, h, rx, ry, scale, isMini = false, time = 0) {
      const cx = w / 2;
      const cy = h / 2;
      const r = scale * 0.9;

      const pNeurons = aiNeurons.map(v => {
        const [x, y, z] = rotate3D(v[0] * r, v[1] * r, v[2] * r, rx, ry);
        const proj = project3D(x, y, z, cx, cy);
        return { x, y, z, proj };
      });

      // Synaptic dendrites
      ctx.lineWidth = isMini ? 0.9 : 1.2;
      for (const [a, b] of aiSynapses) {
        const pa = pNeurons[a].proj;
        const pb = pNeurons[b].proj;
        if (pa && pb) {
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
          ctx.stroke();
        }
      }

      // Action Potentials (Sparks firing along synapses)
      const numSparks = 4;
      for (let s = 0; s < numSparks; s++) {
        const synIdx = Math.floor((time * 0.001 + s * 7) % aiSynapses.length);
        const [a, b] = aiSynapses[synIdx];
        const pa = pNeurons[a].proj;
        const pb = pNeurons[b].proj;
        if (pa && pb) {
          const t = (Math.sin(time * 0.005 + s) + 1) / 2;
          const sx = pa[0] + (pb[0] - pa[0]) * t;
          const sy = pa[1] + (pb[1] - pa[1]) * t;

          ctx.beginPath();
          ctx.arc(sx, sy, isMini ? 2 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Neurons
      for (const n of pNeurons) {
        if (!n.proj) continue;
        const [nx, ny, nscale] = n.proj;
        ctx.beginPath();
        ctx.arc(nx, ny, (isMini ? 2.5 : 4) * nscale, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // --- CONTROLLER 1: MAIN INTERACTIVE HERO HOLOGRAM POD ---
    const holoCanvas = document.getElementById('holo-core-canvas');
    const holoTabs = document.querySelectorAll('#holo-model-tabs .holo-tab');
    const holoModelName = document.getElementById('holo-model-name');
    const holoStatDesc = document.getElementById('holo-stat-desc');

    const holoMeta = {
      dev: {
        title: "Cubo de Código · Tesseract 4D",
        desc: "Lógica de Software &middot; 32 Aristas &middot; Glifos Orbitantes",
        led: "#00f2fe"
      },
      sec: {
        title: "Escudo Criptográfico · Bóveda Geodésica",
        desc: "Defensa Activa &middot; 20 Caras &middot; Anillo Orbital de Barrera",
        led: "#8b5cf6"
      },
      net: {
        title: "Topología Cisco · Conmutación Octaédrica",
        desc: "Red Corporativa &middot; Concurrencia k6 &middot; Enrutamiento en Vivo",
        led: "#38bdf8"
      },
      ai: {
        title: "Núcleo Sináptico · Red Neuronal 3D",
        desc: "Inferencia Local &middot; Axones Activos &middot; Potenciales de Acción",
        led: "#f59e0b"
      }
    };

    let activeModel = 'dev';
    let holoRotX = 0.25;
    let holoRotY = 0.35;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let holoAnimId = null;

    if (holoCanvas) {
      const hCtx = holoCanvas.getContext('2d');

      // Pointer drag interaction
      holoCanvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        holoCanvas.setPointerCapture(e.pointerId);
      });

      holoCanvas.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        holoRotY += dx * 0.008;
        holoRotX += dy * 0.008;
        lastX = e.clientX;
        lastY = e.clientY;
      });

      const stopDrag = () => { isDragging = false; };
      holoCanvas.addEventListener('pointerup', stopDrag);
      holoCanvas.addEventListener('pointercancel', stopDrag);

      // Model Tab Switching
      holoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-model');
          if (!target || target === activeModel) return;

          holoTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          activeModel = target;

          const meta = holoMeta[target];
          if (meta) {
            if (holoModelName) {
              holoModelName.innerHTML = `<span class="hud-status-led" style="background:${meta.led}; box-shadow:0 0 8px ${meta.led}"></span><strong>${meta.title}</strong>`;
            }
            if (holoStatDesc) {
              holoStatDesc.innerHTML = meta.desc;
            }
          }
        });
      });

      function renderMainHolo(t) {
        hCtx.clearRect(0, 0, holoCanvas.width, holoCanvas.height);

        // Continuous gentle auto-spin when not dragging
        if (!isDragging) {
          holoRotY += 0.007;
          holoRotX = Math.sin(t * 0.001) * 0.15;
        }

        const scale = 85;
        if (activeModel === 'dev') {
          drawDevModel(hCtx, holoCanvas.width, holoCanvas.height, holoRotX, holoRotY, scale, false, t);
        } else if (activeModel === 'sec') {
          drawSecModel(hCtx, holoCanvas.width, holoCanvas.height, holoRotX, holoRotY, scale, false, t);
        } else if (activeModel === 'net') {
          drawNetModel(hCtx, holoCanvas.width, holoCanvas.height, holoRotX, holoRotY, scale, false, t);
        } else if (activeModel === 'ai') {
          drawAiModel(hCtx, holoCanvas.width, holoCanvas.height, holoRotX, holoRotY, scale, false, t);
        }

        holoAnimId = requestAnimationFrame(renderMainHolo);
      }
      holoAnimId = requestAnimationFrame(renderMainHolo);
    }

    // --- CONTROLLER 2: MINI 3D CANVASES IN SOLUTION SLABS ---
    const slabCanvases = [
      { id: 'canvas-slab-dev', draw: drawDevModel },
      { id: 'canvas-slab-sec', draw: drawSecModel },
      { id: 'canvas-slab-net', draw: drawNetModel },
      { id: 'canvas-slab-ai', draw: drawAiModel }
    ];

    const activeSlabEngines = [];

    slabCanvases.forEach(({ id, draw }) => {
      const c = document.getElementById(id);
      if (!c) return;
      const ctx = c.getContext('2d');
      activeSlabEngines.push({
        canvas: c,
        ctx,
        draw,
        rotX: 0.2,
        rotY: 0
      });
    });

    let miniAnimId = null;
    let isSlabSectionVisible = true;

    function renderMiniSlabs(t) {
      if (!isSlabSectionVisible) return;

      for (const item of activeSlabEngines) {
        item.rotY += 0.012;
        item.ctx.clearRect(0, 0, item.canvas.width, item.canvas.height);
        item.draw(item.ctx, item.canvas.width, item.canvas.height, item.rotX, item.rotY, 38, true, t);
      }

      miniAnimId = requestAnimationFrame(renderMiniSlabs);
    }

    if (activeSlabEngines.length > 0) {
      const solSection = document.getElementById('soluciones');
      const slabObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isSlabSectionVisible = entry.isIntersecting;
          if (isSlabSectionVisible) {
            cancelAnimationFrame(miniAnimId);
            miniAnimId = requestAnimationFrame(renderMiniSlabs);
          }
        });
      }, { threshold: 0.05 });

      slabObserver.observe(solSection || activeSlabEngines[0].canvas);
      miniAnimId = requestAnimationFrame(renderMiniSlabs);
    }
  })();

  // --------------------------------------------------------------------------
  // 5. CARD 3D TILT ENGINE & AMBIENT SPOTLIGHT
  // --------------------------------------------------------------------------
  const tiltElements = document.querySelectorAll('[data-tilt]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    tiltElements.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS mouse coordinates for radial ambient glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute tilt angles (max 7 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = (-deltaY * 6).toFixed(2);
        const rotateY = (deltaX * 6).toFixed(2);

        card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. MONOLITH TABS SWITCHER (23 LEYES DE RENDIMIENTO)
  // --------------------------------------------------------------------------
  const monolithTabs = document.querySelectorAll('.monolith-tab-btn');
  const monolithPanels = document.querySelectorAll('.monolith-panel');

  monolithTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-monolith');
      if (!targetId) return;

      monolithTabs.forEach(t => t.classList.remove('active'));
      monolithPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. COTIZADOR EXPRESS INTERACTIVO (DYNAMIC SCOPE ENGINE & WHATSAPP URL)
  // --------------------------------------------------------------------------
  const estTypeInputs = document.querySelectorAll('input[name="est_type"]');
  const estFeatInputs = document.querySelectorAll('input[name="est_feat"]');
  const estScopeInputs = document.querySelectorAll('input[name="est_scope"]');

  const escArch = document.getElementById('esc-arch');
  const escTime = document.getElementById('esc-time');
  const escDeliverables = document.getElementById('esc-deliverables');
  const escWhatsappBtn = document.getElementById('esc-whatsapp-btn');

  const archSpecs = {
    software: {
      title: "Sistema de Software Empresarial / Inventario & Kardex",
      arch: "Node.js / Express 5 + SQLite / MySQL + Arquitectura Monolítica Modular + JWT RBAC",
      baseDays: 24,
      deliverables: [
        "Código fuente 100% propiedad de tu organización (cero dependencias huérfanas).",
        "Base de datos relacional normalizada con índices de rendimiento B-Tree.",
        "Módulo de salidas por carrito, trazabilidad y Kardex en tiempo real.",
        "Manual de usuario para operadores y dossier formal de arquitectura.",
        "Puesta en marcha asistida en tu red interna o servidor corporativo."
      ]
    },
    pwa: {
      title: "PWA Comercial / E-Commerce con Pedidos WhatsApp",
      arch: "PWA Offline-First (HTML5/ServiceWorker) + Netlify Edge + WebSockets / WhatsApp Dispatcher",
      baseDays: 16,
      deliverables: [
        "PWA instalable en iOS y Android con caché offline completa.",
        "Tiempo de primer byte y carga garantizado menor a 300 milisegundos.",
        "Enrutamiento automatizado de pedidos hacia WhatsApp sin comisiones a apps.",
        "SEO técnico avanzado con marcado estructurado Schema.org.",
        "Panel liviano para edición inmediata de catálogo, stock y precios."
      ]
    },
    security: {
      title: "Auditoría de Ciberseguridad & Hardening Institucional",
      arch: "Hardening Nginx/Apache + Cabeceras HSTS/CSP Grado A + DMARC Quarantine + WAF",
      baseDays: 10,
      deliverables: [
        "Calificación Grado A verificable en SecurityHeaders.com.",
        "Alineación DNS: Configuración estricta de registros DMARC, SPF y DKIM.",
        "Auditoría técnica de transparencia MinTIC (ITA) y reporte de remediaciones.",
        "Implementación de 2FA en panel de administración y reglas de firewall WAF.",
        "Informe ejecutivo formal de postura defensiva y hallazgos corregidos."
      ]
    },
    infra: {
      title: "Infraestructura Cisco, Redes & Migración Cloud",
      arch: "Router Cisco 2901 + Trunking VLANs + Segmentación Cámaras IP + cPanel Cloud",
      baseDays: 12,
      deliverables: [
        "Configuración y optimización de Router Cisco (IOS), switch perimetral y APs.",
        "Segmentación lógica de subredes para datos, cámaras de vigilancia y telefonía.",
        "Migración masiva de buzones corporativos con cero pérdida de correos.",
        "Plano topológico de red documentado con direccionamiento estático.",
        "Pruebas de latencia, estabilidad y contingencia ante cortes de enlace."
      ]
    },
    ai: {
      title: "Automatización con IA Local (Whisper / Groq / Scripts)",
      arch: "Python 3.11 + faster-whisper (CPU local) + pyannote.audio + Groq LLaMA 3.3 70B ($0 APIs)",
      baseDays: 14,
      deliverables: [
        "Pipeline automatizado de transcripción local precisa sin costos por minuto.",
        "Diarización de hablantes con pyannote.audio para separar interlocutores.",
        "Generador de actas formales y síntesis ejecutiva estructurada en Word (.docx).",
        "Script ejecutable con un solo comando optimizado para hardware existente.",
        "Documentación técnica de parámetros y flujos de automatización."
      ]
    }
  };

  const featureLabels = {
    qr: "Placas & Trazabilidad con Códigos QR Dinámicos",
    telegram: "Alertas Automatizadas a Telegram / WhatsApp",
    desktop: "Instalador de Escritorio (.exe) con Electron",
    auth: "Autenticación con Roles (RBAC) & Auditoría",
    reports: "Generación Automática de Reportes en PDF / Word / Excel"
  };

  function updateCotizador() {
    // 1. Get selected type
    const selectedTypeInput = document.querySelector('input[name="est_type"]:checked');
    const selectedType = selectedTypeInput ? selectedTypeInput.value : 'software';
    const typeData = archSpecs[selectedType] || archSpecs.software;

    // Update active class on type items
    estTypeInputs.forEach(input => {
      const item = input.closest('.est-option-item');
      if (item) item.classList.toggle('active', input.checked);
    });

    // 2. Get selected features
    const selectedFeats = [];
    estFeatInputs.forEach(input => {
      const item = input.closest('.est-option-item');
      if (item) item.classList.toggle('active', input.checked);
      if (input.checked) {
        selectedFeats.push(input.value);
      }
    });

    // 3. Get selected scope
    const selectedScopeInput = document.querySelector('input[name="est_scope"]:checked');
    const selectedScope = selectedScopeInput ? selectedScopeInput.value : 'standard';

    estScopeInputs.forEach(input => {
      const item = input.closest('.est-option-item');
      if (item) item.classList.toggle('active', input.checked);
    });

    // 4. Calculate Architecture & Time
    let finalArch = typeData.arch;
    if (selectedFeats.includes('desktop') && selectedType !== 'infra' && selectedType !== 'security') {
      finalArch += " + Electron Desktop Wrapper (.exe)";
    }
    if (selectedFeats.includes('telegram')) {
      finalArch += " + Webhook Telegram/WhatsApp";
    }

    let estimatedTimeStr = "3 a 5 semanas hábiles";
    if (selectedScope === 'mvp') {
      estimatedTimeStr = "1 a 2 semanas hábiles (MVP priorizado)";
    } else if (selectedScope === 'urgent') {
      estimatedTimeStr = "3 a 7 días hábiles (Intervención de choque)";
    } else {
      if (selectedType === 'software') estimatedTimeStr = "3 a 5 semanas hábiles";
      else if (selectedType === 'pwa') estimatedTimeStr = "2 a 3 semanas hábiles";
      else if (selectedType === 'security') estimatedTimeStr = "1 a 2 semanas hábiles";
      else if (selectedType === 'infra') estimatedTimeStr = "1 a 2 semanas hábiles";
      else if (selectedType === 'ai') estimatedTimeStr = "2 a 3 semanas hábiles";
    }

    // 5. Update UI values
    if (escArch) escArch.textContent = finalArch;
    if (escTime) escTime.textContent = estimatedTimeStr;

    if (escDeliverables) {
      const featDeliverables = [];
      if (selectedFeats.includes('qr')) featDeliverables.push("Generador y validador de códigos QR dinámicos para placas.");
      if (selectedFeats.includes('reports')) featDeliverables.push("Plantillas de exportación ejecutiva en PDF, Excel y Word.");

      const fullList = [...typeData.deliverables, ...featDeliverables];
      escDeliverables.innerHTML = fullList.map(item => `<li>${item}</li>`).join('');
    }

    // 6. Build dynamic WhatsApp link
    if (escWhatsappBtn) {
      const featsListText = selectedFeats.map(f => `• ${featureLabels[f] || f}`).join('\n');
      const waMessage =
        `¡Hola Hamilton! 👋 Estuve cotizando en tu sitio web interactivo y configuré la siguiente propuesta técnica:

*Proyecto Requerido:* ${typeData.title}
*Alcance:* ${selectedScope.toUpperCase()} (${estimatedTimeStr})
*Módulos Clave Seleccionados:*
${featsListText || '• Configuración estándar'}

*Arquitectura Sugerida:*
${finalArch}

Me gustaría conversar sobre esta propuesta y validar disponibilidad técnica.`;

      const encodedUrl = `https://wa.me/573146384647?text=${encodeURIComponent(waMessage)}`;
      escWhatsappBtn.setAttribute('href', encodedUrl);
    }
  }

  // Bind change listeners
  [...estTypeInputs, ...estFeatInputs, ...estScopeInputs].forEach(input => {
    input.addEventListener('change', updateCotizador);
  });
  updateCotizador();

  // --------------------------------------------------------------------------
  // 8. THE VAULT (SEARCH & PILL FILTERS ACROSS 22 PROJECTS)
  // --------------------------------------------------------------------------
  const vaultInput = document.getElementById('vault-search-input');
  const vaultPills = document.querySelectorAll('.v-pill');
  const vaultRows = document.querySelectorAll('#vault-table tbody tr');

  function filterVault() {
    const query = (vaultInput ? vaultInput.value : '').toLowerCase().trim();
    const activePill = document.querySelector('.v-pill.active');
    const filterCat = activePill ? activePill.getAttribute('data-vfilter') : 'all';

    let visibleCount = 0;

    vaultRows.forEach(row => {
      const cat = row.getAttribute('data-cat') || '';
      const name = (row.getAttribute('data-name') || '').toLowerCase();
      const tech = (row.getAttribute('data-tech') || '').toLowerCase();

      const matchesCat = (filterCat === 'all' || cat.split(' ').includes(filterCat));
      const matchesQuery = !query || name.includes(query) || tech.includes(query);

      if (matchesCat && matchesQuery) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (vaultInput) {
    vaultInput.addEventListener('input', filterVault);
  }

  vaultPills.forEach(pill => {
    pill.addEventListener('click', () => {
      vaultPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterVault();
    });
  });

  // --------------------------------------------------------------------------
  // 9. PROJECT DETAILS INSPECTION MODAL (FULL 22-PROJECT DOSSIER)
  // --------------------------------------------------------------------------
  const inspectModal = document.getElementById('inspect-modal');
  const inspectModalClose = document.getElementById('modal-close');
  const inspectModalCode = document.getElementById('modal-code');
  const inspectModalContent = document.getElementById('modal-content');

  const projectDetailsDB = {
    inventrack: {
      code: "SYS-INV-2.0",
      title: "InvenTrack v2.0 (Sistema de Inventario & Almacén)",
      meta: "Promueve Más S.A.S. / Gobernación de Caldas · Octubre 2026",
      desc: "Desarrollado para gestionar de punta a punta el inventario de repuestos, lubricantes y consumibles de maquinaria pesada. Cuenta con salida de elementos mediante carrito de despacho, log de auditoría inmutable, bot de Telegram con alertas de stock mínimo, manuales formales de usuario e instalador de escritorio en Electron.",
      stack: ["Node.js", "Express", "Socket.IO", "SQLite", "MySQL", "Electron", "JWT", "SheetJS", "pdfMake"]
    },
    e14: {
      code: "SYS-E14-PWA",
      title: "Sistema de Testigos Electorales E-14 (Mesas en Vivo)",
      meta: "Piloto Funcional · 2.551 Mesas · 27 Municipios",
      desc: "Plataforma offline-first de alta concurrencia diseñada para capturar, comprimir y transmitir formularios electorales en minutos. Emplea compresión en Canvas local (reducción de 8MB a ~380KB) para mitigar el ancho de banda y sincronización en vivo mediante WebSockets probada con pruebas de carga k6.",
      stack: ["Node.js 20", "Express 5", "Socket.IO", "Canvas API", "IndexedDB", "k6 Load Testing"]
    },
    promueveplus: {
      code: "SYS-ACT-QR",
      title: "Promueve+ (Gestión de Activos Fijos con QR)",
      meta: "Producción Activa · Hosting Dedicado",
      desc: "Digitalización y trazabilidad del patrimonio institucional mediante códigos QR y registro fotográfico. Migrado desde Supabase a infraestructura privada con MariaDB 10.11 y PHP 8.4 con API intermedia de sincronización.",
      stack: ["PHP 8.4", "MariaDB 10.11", "REST API", "Códigos QR", "cPanel"]
    },
    vialtrack: {
      code: "SYS-VIAL-AI",
      title: "VialTrack (Telemetría GPS & IA Groq)",
      meta: "Cumplimiento PESV · Res. 1068 de 2015",
      desc: "Procesa la telemetría satelital de más de 30 vehículos pesados, detecta excesos de velocidad según la normativa nacional y genera narrativas técnicas de auditoría explicativas asistidas por IA (Groq LLaMA).",
      stack: ["Groq LLM", "Node.js", "R Statistics", "GPS Telemetry", "Excel Automation"]
    },
    ahumados: {
      code: "PWA-BARBAROS",
      title: "Ahumados Bárbaros (PWA Gastronómica)",
      meta: "Producción Activa · ahumadosbarbaros.com · Netlify",
      desc: "Plataforma de pedidos directos y carta digital interactiva para restaurante de BBQ artesanal con dos sedes (Chipre y La Francia). Desarrollada como PWA offline-first con Service Worker, tiempo de carga garantizado <300ms, marcado SEO con Schema.org y enrutamiento automatizado de pedidos hacia WhatsApp sin comisiones a apps de terceros.",
      stack: ["HTML5 PWA", "CSS3 Moderno", "JavaScript ES6+", "Service Worker", "WhatsApp API", "Netlify Edge", "Schema.org"]
    },
    outfit: {
      code: "APP-OUTFIT-WEATHER",
      title: "¿Qué me pongo mañana? (Outfit & Clima)",
      meta: "MVP Full-Stack · React + Node.js + OpenWeather",
      desc: "Aplicación web que resuelve la decisión diaria de vestuario recomendando combinaciones del guardarropa basadas en el pronóstico meteorológico del día siguiente. Integra autenticación JWT, almacenamiento de prendas por nivel de abrigo, filtro por ocasión y consumo seguro de la API de OpenWeather desde el backend.",
      stack: ["React", "Vite", "Node.js", "Express", "SQLite", "OpenWeatherMap API", "JWT", "Multer"]
    },
    aguinaldo: {
      code: "APP-AGUINALDO-DERANGEMENT",
      title: "Aguinaldo Navideño (Amigo Secreto con Desarreglos)",
      meta: "Producción Festiva · Noviembre 2026",
      desc: "Sistema web interactivo para sorteos de Amigo Secreto implementando un algoritmo matemático de desarreglo (P(i) != i) con backtracking aleatorio para respetar restricciones familiares sin bloqueos. Cuenta con animaciones festivas, cajas de regalo 3D interactivas, efectos de sonido festivos con Web Audio API y enlaces mágicos cifrados para compartir por WhatsApp.",
      stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Web Audio API", "Desarreglos Matemáticos", "Cifrado Ligero"]
    },
    simuladorbanco: {
      code: "CORE-CS-BANK-QUEUE",
      title: "Simulador Bancario C# (.NET 10)",
      meta: "Estructuras de Datos Nativas & POO Estricta",
      desc: "Simulador de colas de atención bancaria programado en C# (.NET 10) implementando estructuras de datos fundamentales desde cero sin colecciones genéricas del framework: Colas FIFO con nodos enlazados, Pilas LIFO para rollback y auditoría transaccional, y Listas Enlazadas para clientes, aplicando principios SOLID.",
      stack: ["C#", ".NET 10.0", "Colas FIFO Nativas", "Pilas LIFO Nativas", "Listas Enlazadas", "POO & SOLID"]
    },
    nexum: {
      code: "BI-NEXUM-LEOMAS",
      title: "Consultoría LeoMás (Nexum Data Consulting)",
      meta: "Business Intelligence & SQL Avanzado · U. de Manizales",
      desc: "Auditoría relacional y consultoría analítica para Librería LeoMás. Incluye diseño y normalización de modelo DER, formulación de consultas analíticas complejas con subconsultas y ventanas, segmentación de clientes RFM, pipeline automatizado de reportes ejecutivos en Word con Python (docx/matplotlib) y sustentación corporativa en formato APA 7.",
      stack: ["MySQL / MariaDB", "SQL Analítico Avanzado", "Modelado DER", "Python docx & Matplotlib", "APA 7", "Executive Deck"]
    },
    actas: {
      code: "AI-ACTAS-WHISPER",
      title: "Generador de Actas con IA & Diarización",
      meta: "Herramienta Interna · Costo Recurrente Cero",
      desc: "Pipeline local automatizado que convierte audios de reuniones corporativas de 2 a 3 horas en actas formales en Word: transcripción precisa con faster-whisper en CPU, diarización de hablantes con pyannote.audio, asignación a funcionarios institucionales, síntesis ejecutiva con Groq (LLaMA 3.3 70B) y generación de documento .docx institucional.",
      stack: ["Python 3.11", "faster-whisper", "pyannote.audio", "Groq LLaMA 3.3 70B", "python-docx", "ffmpeg"]
    },
    tiktok: {
      code: "MEDIA-TIKTOK-SEC",
      title: "Pipeline de Video & TikTok Ciberseguridad",
      meta: "Automatización de Contenido & Canva App SDK",
      desc: "Suite de desarrollo en Python para la generación programática de contenido educativo sobre ciberseguridad, shodan, Wi-Fi cracking y hardening web. Incluye orquestación de escenas con MoviePy y FFmpeg, síntesis de voz TTS, generación de carruseles de Instagram y una aplicación integrada con el SDK oficial de Canva.",
      stack: ["Python", "MoviePy", "FFmpeg", "TTS Voice Engine", "Canva App SDK", "TypeScript", "Ciberseguridad"]
    },
    mapa: {
      code: "SYS-MAP-GEO",
      title: "Mapa de Maquinaria en Caldas",
      meta: "En Diseño & Piloto · Gobernación de Caldas",
      desc: "Módulo web independiente que conecta la API del proveedor de rastreo satelital con un mapa cartográfico interactivo que ubica los combos de maquinaria amarilla en todo el departamento de Caldas en tiempo real.",
      stack: ["PHP", "REST GPS API", "Leaflet Maps", "Elementor Integration"]
    },
    mantenimiento: {
      code: "SYS-MANT-CHK",
      title: "Mantenimientos Preventivos & CheckList",
      meta: "Producción Activa · Talleres",
      desc: "Herramienta móvil para inspecciones pre-operacionales de maquinaria y control de intervenciones mecánicas preventivas, con historiales por hoja de vida y alertas de consumibles.",
      stack: ["PHP", "MySQL", "Mobile Checklist", "Reportes PDF"]
    },
    billar: {
      code: "APP-BILLAR-LIVE",
      title: "App Billar (Torneos en Tiempo Real)",
      meta: "Plataforma Deportiva Web",
      desc: "Sistema integral de torneos deportivos con generación algorítmica de brackets, inscripciones de jugadores, marcadores en vivo y estadísticas de juego.",
      stack: ["React", "Vite", "TypeScript", "Node.js", "Prisma ORM", "WebSockets"]
    },
    makia: {
      code: "APP-MAKIA-BARBER",
      title: "Proyecto Makia Barber",
      meta: "Comercial & Reservas",
      desc: "Plataforma web para barbería con catálogo interactivo de servicios, gestión de turnos y agendamiento directo vinculado a WhatsApp.",
      stack: ["JavaScript ES6", "HTML5", "CSS3", "WhatsApp API", "UI Glassmorphism"]
    },
    nando: {
      code: "SHOP-NANDO-ECOM",
      title: "Tienda Nando (E-Commerce)",
      meta: "Comercio Electrónico",
      desc: "Tienda virtual con catálogo categorizado de productos, carrito de compras persistente en cliente y checkout estructurado para envíos directos.",
      stack: ["React", "State Management", "CSS Grid", "E-Commerce Checkout"]
    },
    univet: {
      code: "MED-UNIVET-ZOO",
      title: "UNI.VET.ZOO (Gestión Veterinaria)",
      meta: "Gestión Médica y Clínica",
      desc: "Aplicación para control de consultas médicas veterinarias, historias clínicas de pacientes, seguimiento de tratamientos y generación de fórmulas en PDF.",
      stack: ["SQL Relacional", "Backend Logic", "CRUD Clínico", "Reportes PDF"]
    },
    hardening: {
      code: "SEC-HARDENING-MINTIC",
      title: "Hardening Web & Security Headers",
      meta: "ColCERT / MinTIC · Grado A",
      desc: "Remediación integral de seguridad en sitio institucional: calificación A en SecurityHeaders.com, DMARC en modo cuarentena, 2FA en cPanel, WAF Wordfence y accesibilidad WAVE (Res. 1519 de 2020).",
      stack: ["Security Headers", "DMARC", "SPF", "cPanel 2FA", "ISO 27001", "WAVE MinTIC"]
    },
    phishing: {
      code: "SEC-GOPHISH-KALI",
      title: "Laboratorio de Phishing Ético",
      meta: "Simulación Controlada · Kali Linux",
      desc: "Campaña de concientización y simulación de phishing con GoPhish sobre Kali Linux para entrenar y evaluar a más de 25 funcionarios institucionales.",
      stack: ["GoPhish", "Kali Linux", "Ingeniería Social", "Capacitación TI"]
    },
    cisco: {
      code: "NET-CISCO-2901",
      title: "Infraestructura Cisco & Migración Cloud",
      meta: "Red de Oficina & Correo Corporativo",
      desc: "Instalación de red de dos pisos con router Cisco 2901, fibra óptica, videovigilancia IP y migración de 10 cuentas de correo (~19 GB) a hosting dedicado sin caída de servicio.",
      stack: ["Cisco 2901", "Fibra Óptica", "ONT Bridge", "cPanel", "DNS .gov.co"]
    },
    econometria: {
      code: "DATA-R-ECON",
      title: "Econometría: TPM vs Inflación Colombia",
      meta: "Investigación Académica · Quarto HTML",
      desc: "Script reproducible en R con pruebas de raíz unitaria ADF, errores Newey-West y modelos dinámicos para estudiar la transmisión de tasas de interés del Banco de la República.",
      stack: ["R Statistics", "Quarto", "Time Series", "ADF Test", "HTML Reproducible"]
    },
    novatech: {
      code: "SEC-NOVATECH-RBAC",
      title: "Auditoría de Control de Acceso NovaTech",
      meta: "Matemáticas Discretas · U. de Manizales",
      desc: "Informe técnico en 7 etapas analizando matrices de permisos, principio de mínimo privilegio y formalización de roles en sistemas corporativos.",
      stack: ["RBAC", "Matemáticas Discretas", "Matrices de Permisos"]
    }
  };

  function openProjectModal(detailKey) {
    const item = projectDetailsDB[detailKey];
    if (!item || !inspectModal) return;

    if (inspectModalCode) inspectModalCode.textContent = item.code;
    if (inspectModalContent) {
      inspectModalContent.innerHTML = `
        <h3 style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-bottom:6px;">${item.title}</h3>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); display:block; margin-bottom:18px;">${item.meta}</span>
        
        <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.65; margin-bottom:24px;">${item.desc}</p>
        
        <div style="margin-bottom:28px;">
          <strong style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:10px;">Stack Tecnológico Verificado:</strong>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${item.stack.map(s => `<span style="font-family:var(--font-mono); font-size:0.76rem; background:rgba(255,255,255,0.05); color:var(--text-primary); border:1px solid var(--border-glass); padding:4px 10px; border-radius:6px;">${s}</span>`).join('')}
          </div>
        </div>

        <a href="https://wa.me/573146384647?text=Hola%20Hamilton%2C%20quisiera%20consultar%20sobre%20la%20ficha%20t%C3%A9cnica%20de%20${encodeURIComponent(item.title)}" target="_blank" rel="noopener" class="spatial-btn primary full-w">
          <span>Consultar o Cotizar esta Solución por WhatsApp &rarr;</span>
        </a>
      `;
    }

    inspectModal.classList.add('open');
  }

  function closeProjectModal() {
    if (inspectModal) inspectModal.classList.remove('open');
  }

  // Bind click triggers for inspection
  document.querySelectorAll('.inspect-trigger-btn, .table-inspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const detailKey = btn.getAttribute('data-detail');
      if (detailKey) openProjectModal(detailKey);
    });
  });

  if (inspectModalClose) inspectModalClose.addEventListener('click', closeProjectModal);
  if (inspectModal) {
    inspectModal.addEventListener('click', (e) => {
      if (e.target === inspectModal) closeProjectModal();
    });
  }

  // --------------------------------------------------------------------------
  // 10. CV DOWNLOAD SELECTOR MODAL
  // --------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const openCvBtn = document.getElementById('open-cv-modal-btn');
  const closeCvBtn = document.getElementById('cv-modal-close');

  function openCvModal() {
    if (cvModal) cvModal.classList.add('open');
  }
  function closeCvModal() {
    if (cvModal) cvModal.classList.remove('open');
  }

  if (openCvBtn) openCvBtn.addEventListener('click', openCvModal);
  if (closeCvBtn) closeCvBtn.addEventListener('click', closeCvModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }

  // --------------------------------------------------------------------------
  // 11. COMMAND PALETTE (RAYCAST ⌘K / CTRL+K)
  // --------------------------------------------------------------------------
  const cmdkModal = document.getElementById('cmdk-modal');
  const cmdkInput = document.getElementById('cmdk-input');
  const cmdkResults = document.getElementById('cmdk-results');
  const openCmdkBtn = document.getElementById('open-cmdk-btn');
  const closeCmdkBtn = document.getElementById('cmdk-esc-btn');

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const cmdkActions = [
    // Navigation
    { group: "Navegación Espacial", icon: "✨", title: "Ir al Showroom 3D", desc: "4 plataformas insignia con perspectiva 3D", action: () => scrollToSection('showroom') },
    { group: "Navegación Espacial", icon: "💼", title: "Ir a Soluciones Comerciales", desc: "Software, Ciberseguridad, Redes e IA", action: () => scrollToSection('soluciones') },
    { group: "Navegación Espacial", icon: "⚡", title: "Ir a 23 Leyes de Rendimiento", desc: "Los 4 monolitos de escalabilidad técnica", action: () => scrollToSection('monolitos') },
    { group: "Navegación Espacial", icon: "🗄️", title: "Ir a La Bóveda (22 Proyectos)", desc: "Archivo indexado completo", action: () => scrollToSection('vault') },
    { group: "Navegación Espacial", icon: "🧮", title: "Ir al Cotizador Express", desc: "Calcula arquitectura y tiempos en vivo", action: () => scrollToSection('cotizador') },
    { group: "Navegación Espacial", icon: "💬", title: "Ir a Contacto & WhatsApp", desc: "Canales de comunicación directa", action: () => scrollToSection('contacto') },

    // Featured Projects
    { group: "Fichas de Proyectos", icon: "📦", title: "InvenTrack v2.0", desc: "Kardex de taller & maquinaria Gobernación", action: () => openProjectModal('inventrack') },
    { group: "Fichas de Proyectos", icon: "🗳️", title: "Sistema Electoral E-14", desc: "PWA Offline-first para 2.551 mesas", action: () => openProjectModal('e14') },
    { group: "Fichas de Proyectos", icon: "🍖", title: "Ahumados Bárbaros PWA", desc: "E-Commerce gastronómico sin comisiones", action: () => openProjectModal('ahumados') },
    { group: "Fichas de Proyectos", icon: "🎙️", title: "Generador de Actas con IA", desc: "Whisper local, diarización & Groq", action: () => openProjectModal('actas') },
    { group: "Fichas de Proyectos", icon: "🏷️", title: "Promueve+ Activos QR", desc: "Control patrimonial de bienes con QR", action: () => openProjectModal('promueveplus') },
    { group: "Fichas de Proyectos", icon: "🛰️", title: "VialTrack & IA Groq", desc: "Telemetría de velocidad PESV", action: () => openProjectModal('vialtrack') },
    { group: "Fichas de Proyectos", icon: "🛡️", title: "Hardening Web Grado A", desc: "SecurityHeaders & DMARC institucional", action: () => openProjectModal('hardening') },
    { group: "Fichas de Proyectos", icon: "🖧", title: "Red Cisco 2901 & Fibra", desc: "Topología empresarial & migración correo", action: () => openProjectModal('cisco') },

    // Document Downloads
    { group: "Documentación TI", icon: "📄", title: "Descargar CV Full-Stack Developer (PDF)", desc: "PHP 8.4, Node.js, Express, React, SQL", action: () => window.open('cv-hamilton-fullstack.pdf', '_blank') },
    { group: "Documentación TI", icon: "📄", title: "Descargar CV Automatización & Procesos (PDF)", desc: "Digitalización de inventarios, scripts e IA", action: () => window.open('cv-hamilton-automatizacion.pdf', '_blank') },
    { group: "Documentación TI", icon: "📄", title: "Descargar CV Redes Cisco & Soporte TI (PDF)", desc: "Cisco IOS, fibra óptica, cPanel y helpdesk", action: () => window.open('cv-hamilton-sistemas-ti.pdf', '_blank') },
    { group: "Documentación TI", icon: "📄", title: "Descargar CV Formato ATS Estándar (PDF)", desc: "Optimizado para filtros automáticos de RRHH", action: () => window.open('cv-hamilton-ats.pdf', '_blank') },

    // Utilities
    { group: "Acciones Rápidas", icon: "📱", title: "Iniciar Chat en WhatsApp", desc: "+57 314 638 4647", action: () => window.open('https://wa.me/573146384647?text=Hola%20Hamilton%2C%20quisiera%20conversar%20sobre%20un%20proyecto', '_blank') },
    { group: "Acciones Rápidas", icon: "✉️", title: "Copiar Correo Profesional", desc: "hamiltonquintero462@gmail.com", action: () => { navigator.clipboard.writeText('hamiltonquintero462@gmail.com'); showToast('Correo copiado: hamiltonquintero462@gmail.com'); } },
    { group: "Acciones Rápidas", icon: "🌓", title: "Alternar Tema Claro / Oscuro", desc: "Cambia la paleta de iluminación", action: toggleTheme }
  ];

  let cmdkFiltered = [];
  let cmdkSelectedIndex = 0;

  function renderCmdk(query = '') {
    const q = query.toLowerCase().trim();
    cmdkFiltered = cmdkActions.filter(item =>
      !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );

    if (!cmdkResults) return;
    cmdkResults.innerHTML = '';

    if (cmdkFiltered.length === 0) {
      cmdkResults.innerHTML = `<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:0.88rem;">No se encontraron comandos o proyectos para "${query}"</div>`;
      return;
    }

    cmdkSelectedIndex = 0;
    let lastGroup = '';

    cmdkFiltered.forEach((item, index) => {
      if (item.group !== lastGroup) {
        lastGroup = item.group;
        const groupEl = document.createElement('div');
        groupEl.style.cssText = 'padding:8px 14px 4px; font-family:var(--font-mono); font-size:0.7rem; color:var(--neon-cyan); letter-spacing:0.08em; text-transform:uppercase;';
        groupEl.textContent = lastGroup;
        cmdkResults.appendChild(groupEl);
      }

      const row = document.createElement('div');
      row.className = `cmdk-item ${index === cmdkSelectedIndex ? 'selected' : ''}`;
      row.innerHTML = `
        <div class="cmdk-item-left">
          <span class="cmdk-icon">${item.icon}</span>
          <div>
            <strong>${item.title}</strong>
            <span style="display:block; font-size:0.75rem; color:var(--text-muted);">${item.desc}</span>
          </div>
        </div>
        <span class="cmdk-badge">Enter &crarr;</span>
      `;

      row.addEventListener('click', () => {
        closeCmdk();
        item.action();
      });

      cmdkResults.appendChild(row);
    });
  }

  function openCmdk() {
    if (!cmdkModal) return;
    cmdkModal.classList.add('open');
    if (cmdkInput) {
      cmdkInput.value = '';
      cmdkInput.focus();
    }
    renderCmdk('');
  }

  function closeCmdk() {
    if (cmdkModal) cmdkModal.classList.remove('open');
  }

  if (openCmdkBtn) openCmdkBtn.addEventListener('click', openCmdk);
  if (closeCmdkBtn) closeCmdkBtn.addEventListener('click', closeCmdk);
  if (cmdkModal) {
    cmdkModal.addEventListener('click', (e) => {
      if (e.target === cmdkModal) closeCmdk();
    });
  }

  if (cmdkInput) {
    cmdkInput.addEventListener('input', (e) => {
      renderCmdk(e.target.value);
    });
  }

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K and ESC)
  window.addEventListener('keydown', (e) => {
    // Toggle Command Palette
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdkModal && cmdkModal.classList.contains('open')) {
        closeCmdk();
      } else {
        openCmdk();
      }
      return;
    }

    // Close on Escape
    if (e.key === 'Escape') {
      closeCmdk();
      closeCvModal();
      closeProjectModal();
    }

    // Arrow navigation inside Cmd+K
    if (cmdkModal && cmdkModal.classList.contains('open')) {
      const items = cmdkResults ? cmdkResults.querySelectorAll('.cmdk-item') : [];
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdkSelectedIndex = (cmdkSelectedIndex + 1) % items.length;
        items.forEach((it, idx) => it.classList.toggle('selected', idx === cmdkSelectedIndex));
        items[cmdkSelectedIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdkSelectedIndex = (cmdkSelectedIndex - 1 + items.length) % items.length;
        items.forEach((it, idx) => it.classList.toggle('selected', idx === cmdkSelectedIndex));
        items[cmdkSelectedIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (cmdkFiltered[cmdkSelectedIndex]) {
          closeCmdk();
          cmdkFiltered[cmdkSelectedIndex].action();
        }
      }
    }
  });

  // --------------------------------------------------------------------------
  // 12. CONTACT FORM DISPATCH TO WHATSAPP
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('c-name')?.value || '').trim();
      const contact = (document.getElementById('c-contact')?.value || '').trim();
      const type = document.getElementById('c-type')?.value || 'Desarrollo de Software';
      const msg = (document.getElementById('c-msg')?.value || '').trim();

      const text =
        `¡Hola Hamilton! 👋

*Nombre o Empresa:* ${name}
*Canal de Contacto:* ${contact}
*Área de Interés:* ${type}

*Detalles del Proyecto / Operación:*
${msg}

(Enviado desde el formulario de tu portafolio web)`;

      const waUrl = `https://wa.me/573146384647?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      showToast('Abriendo WhatsApp directo...');
    });
  }

  // --------------------------------------------------------------------------
  // 13. MOBILE MENU BURGER
  // --------------------------------------------------------------------------
  const hudBurger = document.getElementById('hud-burger');
  const hudNav = document.getElementById('hud-nav');
  if (hudBurger && hudNav) {
    hudBurger.addEventListener('click', () => {
      const isVisible = hudNav.style.display === 'flex';
      hudNav.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        hudNav.style.flexDirection = 'column';
        hudNav.style.position = 'absolute';
        hudNav.style.top = '70px';
        hudNav.style.left = '16px';
        hudNav.style.right = '16px';
        hudNav.style.background = 'var(--bg-surface-elevated)';
        hudNav.style.padding = '18px';
        hudNav.style.borderRadius = 'var(--radius-lg)';
        hudNav.style.border = '1px solid var(--border-glass-strong)';
        hudNav.style.boxShadow = 'var(--shadow-spatial-lg)';
      }
    });

    hudNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          hudNav.style.display = 'none';
        }
      });
    });
  }

});
