import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';

interface ThreadSegment {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-thread-tracking-hero',
  standalone: true,
  imports: [RouterLink, ClientsComponent],
  templateUrl: './thread-tracking-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadTrackingHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private mouse = { x: 0, y: 0 };
  private segments: ThreadSegment[] = [];
  private animationFrameId?: number;
  private windAngle = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Defer initialization to ensure the view is fully rendered
      setTimeout(() => this.initCanvas(), 0);
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  private initCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    const numSegments = 50;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    this.segments = Array.from({ length: numSegments }, (_, i) => ({
      x: centerX + (i - numSegments / 2) * 5,
      y: centerY,
      vx: 0,
      vy: 0,
    }));

    this.mouse = { x: centerX, y: centerY };

    window.addEventListener('mousemove', this.handleMouseMove);

    this.animate();
  }
  
  private handleMouseMove = (e: MouseEvent) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
  };

  private resizeCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
  };

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    const AIR_RESISTANCE = 0.98;
    const SEGMENT_STIFFNESS = 0.5;
    const MAX_VELOCITY = 12;
    const WIND_STRENGTH = 0.05;
    const SEGMENT_LENGTH = 15;
    const STRETCH_DAMPING = 0.8;

    this.windAngle += 0.02;
    const windX = Math.cos(this.windAngle) * WIND_STRENGTH;
    const windY = Math.sin(this.windAngle * 0.7) * WIND_STRENGTH;

    this.segments[0].x = this.mouse.x;
    this.segments[0].y = this.mouse.y;

    for (let i = 1; i < this.segments.length; i++) {
      const current = this.segments[i];
      const previous = this.segments[i - 1];

      const dx = previous.x - current.x;
      const dy = previous.y - current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const stretch = distance - SEGMENT_LENGTH;
        const force = stretch * SEGMENT_STIFFNESS;
        
        current.vx += (dx / distance) * force;
        current.vy += (dy / distance) * force;
      }

      current.vx += windX * (1 + i * 0.02);
      current.vy += windY * (1 + i * 0.02);

      current.vx *= AIR_RESISTANCE * STRETCH_DAMPING;
      current.vy *= AIR_RESISTANCE * STRETCH_DAMPING;

      const speed = Math.sqrt(current.vx * current.vx + current.vy * current.vy);
      if (speed > MAX_VELOCITY) {
        current.vx = (current.vx / speed) * MAX_VELOCITY;
        current.vy = (current.vy / speed) * MAX_VELOCITY;
      }

      current.x += current.vx;
      current.y += current.vy;
    }

    ctx.beginPath();
    ctx.moveTo(this.mouse.x, this.mouse.y);

    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }

    const gradient = ctx.createLinearGradient(
      this.mouse.x, this.mouse.y,
      this.segments[this.segments.length - 1].x, this.segments[this.segments.length - 1].y
    );
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.6)');
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.4)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
    ctx.stroke();
    ctx.shadowBlur = 0;

    this.segments.forEach((segment, i) => {
      const size = 3 - (i / this.segments.length) * 2;
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? 'rgba(59, 130, 246, 1)' : 'rgba(96, 165, 250, 0.8)';
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
    ctx.fill();

    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}
