import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';

@Component({
  selector: 'app-container-scroll',
  templateUrl: './container-scroll.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()'
  }
})
export class ContainerScrollComponent implements AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  isMobile = signal(false);
  
  rotate = signal(20);
  scale = signal(1.05);
  translate = signal(0);
  
  ngAfterViewInit(): void {
    setTimeout(() => this.onResize(), 0);
  }

  onResize(): void {
    this.isMobile.set(window.innerWidth <= 768);
    this.updateScale();
    this.onScroll();
  }

  private updateScale(): void {
     const [start, _] = this.isMobile() ? [0.7, 0.9] : [1.05, 1];
     this.scale.set(start);
  }

  onScroll(): void {
    if (!this.containerRef) return;
    
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const scrollY = window.scrollY;

    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate progress from when the top of the container hits the top of the viewport
    // to when the bottom of the container hits the bottom of the viewport.
    const start = containerTop - viewportHeight;
    const end = containerTop + containerHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, (scrollY - start) / (containerHeight)));

    const [startScale, endScale] = this.isMobile() ? [0.7, 0.9] : [1.05, 1];
    
    this.rotate.set(20 * (1 - progress));
    this.scale.set(startScale + (endScale - startScale) * progress);
    this.translate.set(-100 * progress);
  }
}