import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  NgZone,
  input,
} from '@angular/core';
import Matter from 'matter-js';
import decomp from 'poly-decomp';
import { debounce } from 'lodash-es';
import { MatterBodyDirective } from './matter-body.directive';

const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events, Query, Common } = Matter;

@Component({
  selector: 'app-gravity',
  standalone: true,
  template: `<div #canvas class="absolute top-0 left-0 w-full h-full"><ng-content></ng-content></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'className()'
  }
})
export class GravityComponent implements AfterViewInit, OnDestroy {
  gravity = input({ x: 0, y: 1 });
  debug = input(false);
  grabCursor = input(true);
  resetOnResize = input(true);
  addTopWall = input(true);
  autoStart = input(true);
  className = input('');

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLDivElement>;

  private engine!: Matter.Engine;
  private renderer!: Matter.Render;
  private runner!: Matter.Runner;
  private mouseConstraint!: Matter.MouseConstraint;
  private frameId?: number;
  private isRunning = false;
  private mouseDown = false;
  
  private bodiesMap = new Map<MatterBodyDirective, Matter.Body>();

  constructor(private zone: NgZone) {
    Common.setDecomp(decomp);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initializeRenderer();
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      this.clearRenderer();
    });
  }

  registerBody(directive: MatterBodyDirective): void {
    const element = directive.elementRef.nativeElement;
    if (!this.canvasRef) return;

    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();

    const angle = (directive.angle ?? 0) * (Math.PI / 180);

    const x = this.calculatePosition(directive.x, canvasRect.width, width);
    const y = this.calculatePosition(directive.y, canvasRect.height, height);
    
    const options = {
        ...directive.matterBodyOptions,
        angle: angle,
        render: {
            visible: this.debug()
        }
    };
    
    const body = Bodies.rectangle(x, y, width, height, options);

    World.add(this.engine.world, [body]);
    this.bodiesMap.set(directive, body);
  }
  
  unregisterBody(directive: MatterBodyDirective): void {
    const body = this.bodiesMap.get(directive);
    if (body) {
      World.remove(this.engine.world, body);
      this.bodiesMap.delete(directive);
    }
  }

  private calculatePosition(value: string | number | undefined, containerSize: number, elementSize: number): number {
    if (typeof value === 'string' && value.endsWith('%')) {
      const percentage = parseFloat(value) / 100;
      return containerSize * percentage;
    }
    return typeof value === 'number' ? value : elementSize - containerSize + elementSize / 2;
  }
  
  private initializeRenderer(): void {
    const canvasEl = this.canvasRef.nativeElement;
    const { offsetWidth, offsetHeight } = canvasEl;

    this.engine = Engine.create();
    this.engine.gravity.x = this.gravity().x;
    this.engine.gravity.y = this.gravity().y;

    this.renderer = Render.create({
      element: canvasEl,
      engine: this.engine,
      options: {
        width: offsetWidth,
        height: offsetHeight,
        wireframes: false,
        background: '#00000000',
      },
    });
    
    this.setupWalls(offsetWidth, offsetHeight);
    this.setupMouse();
    
    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);
    Render.run(this.renderer);
    
    if (this.autoStart()) {
      this.startEngine();
    }

    if (this.resetOnResize()) {
      window.addEventListener('resize', this.debouncedResize);
    }
  }

  private setupWalls(width: number, height: number): void {
      const wallOptions = { isStatic: true, friction: 1, render: { visible: this.debug() } };
      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, wallOptions), // Floor
        Bodies.rectangle(width + 10, height / 2, 20, height, wallOptions), // Right wall
        Bodies.rectangle(-10, height / 2, 20, height, wallOptions), // Left wall
      ];
      if (this.addTopWall()) {
        walls.push(Bodies.rectangle(width / 2, -10, width, 20, wallOptions)); // Top wall
      }
      World.add(this.engine.world, walls);
  }

  private setupMouse(): void {
      const mouse = Mouse.create(this.renderer.canvas);
      this.renderer.mouse = mouse;
      this.mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: this.debug() } },
      });
      World.add(this.engine.world, this.mouseConstraint);
      
      if(this.grabCursor()){
        this.setupCursorEvents();
      }
  }
  
  private setupCursorEvents(): void {
    const canvasEl = this.canvasRef.nativeElement;
    const touchingMouse = () => Query.point(this.engine.world.bodies, this.mouseConstraint.mouse.position).length > 0;

    Events.on(this.engine, 'beforeUpdate', () => {
        if (!this.mouseDown && !touchingMouse()) {
            canvasEl.style.cursor = 'default';
        } else if (touchingMouse()) {
            canvasEl.style.cursor = this.mouseDown ? 'grabbing' : 'grab';
        }
    });

    canvasEl.addEventListener('mousedown', () => {
        this.mouseDown = true;
        canvasEl.style.cursor = touchingMouse() ? 'grabbing' : 'default';
    });
    canvasEl.addEventListener('mouseup', () => {
        this.mouseDown = false;
        canvasEl.style.cursor = touchingMouse() ? 'grab' : 'default';
    });
  }

  private updateElements = (): void => {
    this.bodiesMap.forEach((body, directive) => {
      const { x, y } = body.position;
      const rotation = body.angle * (180 / Math.PI);
      const element = directive.elementRef.nativeElement;
      element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
    });
    this.frameId = requestAnimationFrame(this.updateElements);
  };
  
  private clearRenderer(): void {
      if (this.frameId) cancelAnimationFrame(this.frameId);
      window.removeEventListener('resize', this.debouncedResize);
      if (this.renderer) {
        if (this.renderer.mouse) {
          Mouse.clearSourceEvents(this.renderer.mouse);
        }
        Render.stop(this.renderer);
        this.renderer.canvas.remove();
      }
      if (this.runner) Runner.stop(this.runner);
      if (this.engine) {
        World.clear(this.engine.world, false);
        Engine.clear(this.engine);
      }
      this.bodiesMap.clear();
  }
  
  private handleResize = (): void => {
    if (!this.canvasRef) return;
    this.clearRenderer();
    this.initializeRenderer();
  };
  
  private debouncedResize = debounce(this.handleResize, 500);

  startEngine(): void {
    if (this.isRunning) return;
    this.runner.enabled = true;
    this.frameId = requestAnimationFrame(this.updateElements);
    this.isRunning = true;
  }
  
  stopEngine(): void {
    if (!this.isRunning) return;
    if (this.runner) this.runner.enabled = false;
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.isRunning = false;
  }
}