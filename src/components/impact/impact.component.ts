import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ImpactComponent {
  stats = signal([
    { value: '95%', label: 'Client Satisfaction Rate' },
    { value: '300+', label: 'Successful Projects Delivered' },
    { value: '40%', label: 'Faster MVP Delivery' },
    { value: '10+', label: 'Years of Combined Expertise' },
  ]);
}