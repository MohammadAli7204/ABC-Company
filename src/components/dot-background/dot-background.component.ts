import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-dot-background',
  template: `<canvas #canvas class="absolute top-0 left-0 w-full h-full outline-none"></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '(window:resize)': 'onResize()',
    '(document:pointermove)': 'onPointerMove($event)'
  }
})
export class DotBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private material!: THREE.ShaderMaterial;
  private clock = new THREE.Clock();
  private animationFrameId: number | null = null;
  
  // For mouse trail
  private trailCanvas!: HTMLCanvasElement;
  private trailContext!: CanvasRenderingContext2D;
  private trailTexture!: THREE.CanvasTexture;
  private mouse = new THREE.Vector2(-1, -1);
  private lastMousePosition = new THREE.Vector2(-1, -1);

  ngAfterViewInit(): void {
    this.initThree();
    this.initTrailTexture();
    this.createMesh();
    this.handleResize();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
    this.material.dispose();
    this.trailTexture.dispose();
  }

  onResize(): void {
    this.handleResize();
  }

  onPointerMove(event: PointerEvent): void {
     this.mouse.x = (event.clientX / window.innerWidth);
     this.mouse.y = 1.0 - (event.clientY / window.innerHeight);
  }

  private initThree(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
  }
  
  private initTrailTexture(): void {
    this.trailCanvas = document.createElement('canvas');
    this.trailCanvas.width = 512;
    this.trailCanvas.height = 512;
    this.trailContext = this.trailCanvas.getContext('2d')!;
    this.trailContext.fillStyle = 'black';
    this.trailContext.fillRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
    this.trailTexture = new THREE.CanvasTexture(this.trailCanvas);
  }

  private createMesh(): void {
    const vertexShader = /* glsl */ `
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;
    const fragmentShader = /* glsl */ `
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 dotColor;
      uniform vec3 bgColor;
      uniform sampler2D mouseTrail;
      uniform float rotation;
      uniform float gridSize;
      uniform float dotOpacity;

      vec2 rotate(vec2 uv, float angle) {
          float s = sin(angle);
          float c = cos(angle);
          mat2 rotationMatrix = mat2(c, -s, s, c);
          return rotationMatrix * (uv - 0.5) + 0.5;
      }

      vec2 coverUv(vec2 uv) {
        vec2 s = resolution.xy / max(resolution.x, resolution.y);
        vec2 newUv = (uv - 0.5) * s + 0.5;
        return clamp(newUv, 0.0, 1.0);
      }

      float sdfCircle(vec2 p, float r) {
          return length(p - 0.5) - r;
      }

      void main() {
        vec2 screenUv = gl_FragCoord.xy / resolution;
        vec2 uv = coverUv(screenUv);

        vec2 rotatedUv = rotate(uv, rotation);

        // Create a grid
        vec2 gridUv = fract(rotatedUv * gridSize);
        vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

        // Screen mask
        float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
        vec2 centerDisplace = vec2(0.7, 1.1);
        float circleMaskCenter = length(uv - centerDisplace);
        float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
        
        float combinedMask = screenMask * circleMaskFromCenter;
        float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

        // Mouse trail effect
        float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
        
        float scaleInfluence = max(mouseInfluence * 0.5, circleAnimatedMask * 0.3);

        // Create dots with animated scale, influenced by mouse
        float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);

        float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));

        float smoothDot = smoothstep(0.05, 0.0, sdfDot);

        float opacityInfluence = max(mouseInfluence * 50.0, circleAnimatedMask * 0.5);

        // Mix background color with dot color
        vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

        gl_FragColor = vec4(composition, 1.0);
      }
    `;
    
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        dotColor: { value: new THREE.Color('#e1e1e1') },
        bgColor: { value: new THREE.Color('#F4F5F5') },
        mouseTrail: { value: this.trailTexture },
        rotation: { value: 0 },
        gridSize: { value: 100 },
        dotOpacity: { value: 0.15 },
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);
  }

  private handleResize(): void {
    const { width, height } = this.canvasRef.nativeElement.getBoundingClientRect();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (this.material) {
      this.material.uniforms.resolution.value.set(
        width * window.devicePixelRatio, 
        height * window.devicePixelRatio
      );
    }
  }

  private updateTrailTexture(): void {
    this.trailContext.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.trailContext.fillRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
    
    if (this.mouse.x > -1 && this.lastMousePosition.distanceTo(this.mouse) > 0.001) {
        const x = this.mouse.x * this.trailCanvas.width;
        const y = this.mouse.y * this.trailCanvas.height;
        const radius = this.trailCanvas.width * 0.1;
        
        const gradient = this.trailContext.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
        
        this.trailContext.fillStyle = gradient;
        this.trailContext.beginPath();
        this.trailContext.arc(x, y, radius, 0, Math.PI * 2);
        this.trailContext.fill();
        
        this.lastMousePosition.copy(this.mouse);
    }

    this.trailTexture.needsUpdate = true;
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.material.uniforms.time.value = this.clock.getElapsedTime();
    this.updateTrailTexture();
    this.renderer.render(this.scene, this.camera);
  };
}