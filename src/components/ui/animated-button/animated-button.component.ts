import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animated-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (routerLink()) {
      <a [routerLink]="routerLink()" class="group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors h-11 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2">
        <span class="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          {{ text() }}
        </span>
        <i class="absolute right-1 top-1 bottom-1 rounded-md z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </i>
      </a>
    } @else {
      <button 
        [type]="type()" 
        [disabled]="disabled()" 
        class="group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors h-11 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500">
        <span class="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          {{ text() }}
        </span>
        <i class="absolute right-1 top-1 bottom-1 rounded-md z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </i>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedButtonComponent {
  text = input.required<string>();
  routerLink = input<string | any[] | null | undefined>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
}
