import { Directive, ElementRef, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { GravityComponent } from './gravity.component';
import Matter from 'matter-js';

@Directive({
  selector: '[appMatterBody]',
  standalone: true,
})
export class MatterBodyDirective implements OnInit, OnDestroy {
  @Input() matterBodyOptions: Matter.IBodyDefinition = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
  };
  @Input() x?: number | string;
  @Input() y?: number | string;
  @Input() angle?: number;
  @Input() className?: string;

  public elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private gravityComponent: GravityComponent = inject(GravityComponent);

  ngOnInit(): void {
    this.gravityComponent.registerBody(this);
    if(this.className) {
        this.elementRef.nativeElement.classList.add(...this.className.split(' '));
    }
  }

  ngOnDestroy(): void {
    this.gravityComponent.unregisterBody(this);
  }
}
