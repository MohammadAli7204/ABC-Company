import { ChangeDetectionStrategy, Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, input, signal, effect, untracked } from '@angular/core';

export interface TimelineEntry {
  title: string;
  description: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class TimelineComponent implements AfterViewInit {
  data = input.required<TimelineEntry[]>();

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('timeline') timelineRef!: ElementRef<HTMLDivElement>;

  height = signal(0);
  heightTransform = signal(0);
  opacityTransform = signal(0);

  ngAfterViewInit(): void {
    // Set initial height after view is initialized to get correct dimensions
    setTimeout(() => this.updateHeight(), 0);
  }

  private updateHeight(): void {
    if (this.timelineRef) {
      this.height.set(this.timelineRef.nativeElement.offsetHeight);
    }
  }

  onScroll(): void {
    if (!this.containerRef || !this.height()) return;

    const target = this.containerRef.nativeElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate scroll progress (from 0 to 1)
    const viewportHeight = window.innerHeight;
    const startOffset = viewportHeight * 0.1; // start when 10% of the element is visible
    const endOffset = viewportHeight * 0.5;   // end when 50% of the element is visible

    const start = rect.top - viewportHeight + startOffset;
    const end = rect.bottom - endOffset;
    
    // Ensure we don't divide by zero
    if (end - start <= 0) return;

    const progress = Math.max(0, Math.min(1, (0 - start) / (end - start)));

    this.heightTransform.set(progress * this.height());

    // Fade in animation for the line
    const opacityProgress = Math.max(0, Math.min(1, (progress - 0) / 0.1));
    this.opacityTransform.set(opacityProgress);
  }
}