// Web Audio API Organic Ambient Sound Generator for Casa Botánica

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentMode: 'off' | 'breeze' | 'rain' | 'fireplace' = 'off';
  private nodes: (AudioNode | number)[] = [];
  private intervalId: number | null = null;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.nodes.forEach((n) => {
      if (typeof n === 'number') {
        window.clearTimeout(n);
      } else {
        try {
          if ('stop' in n && typeof (n as AudioScheduledSourceNode).stop === 'function') {
            (n as AudioScheduledSourceNode).stop();
          }
          n.disconnect();
        } catch {
          // ignore
        }
      }
    });
    this.nodes = [];
    this.currentMode = 'off';
  }

  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter approximation for soothing tone
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  public playBreeze() {
    this.initContext();
    this.stop();
    if (!this.ctx || !this.masterGain) return;
    this.currentMode = 'breeze';

    // 1. Wind noise layer
    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      // Modulate wind frequency slowly
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      this.nodes.push(lfo, lfoGain);

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(breezeGain);
      breezeGain.connect(this.masterGain);
      noise.start();
      this.nodes.push(noise, filter, breezeGain);
    }

    // 2. Chime notes in peaceful pentatonic scale (E4, G4, A4, B4, D5)
    const chimes = [329.63, 392.00, 440.00, 493.88, 587.33, 659.25];
    const triggerChime = () => {
      if (this.currentMode !== 'breeze' || !this.ctx || !this.masterGain) return;
      const freq = chimes[Math.floor(Math.random() * chimes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 3.3);
    };

    this.intervalId = window.setInterval(() => {
      if (Math.random() > 0.35) {
        triggerChime();
      }
    }, 2800);
  }

  public playRain() {
    this.initContext();
    this.stop();
    if (!this.ctx || !this.masterGain) return;
    this.currentMode = 'rain';

    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.24, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(rainGain);
      rainGain.connect(this.masterGain);
      noise.start();
      this.nodes.push(noise, filter, rainGain);
    }

    // Occasional leaf droplet
    const triggerDroplet = () => {
      if (this.currentMode !== 'rain' || !this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      const startFreq = 1200 + Math.random() * 800;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    };

    this.intervalId = window.setInterval(() => {
      triggerDroplet();
    }, 700);
  }

  public playFireplace() {
    this.initContext();
    this.stop();
    if (!this.ctx || !this.masterGain) return;
    this.currentMode = 'fireplace';

    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      const humGain = this.ctx.createGain();
      humGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(humGain);
      humGain.connect(this.masterGain);
      noise.start();
      this.nodes.push(noise, filter, humGain);
    }

    // Wood pops and crackles
    const triggerPop = () => {
      if (this.currentMode !== 'fireplace' || !this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(80 + Math.random() * 300, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.04);
    };

    this.intervalId = window.setInterval(() => {
      if (Math.random() > 0.4) {
        triggerPop();
      }
    }, 250);
  }

  public getCurrentMode() {
    return this.currentMode;
  }
}

export const ambianceAudio = new AmbientSoundEngine();
