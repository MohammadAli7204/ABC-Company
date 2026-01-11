import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ClientsComponent {
  clients = signal([
    { name: 'Boltshift', logo: 'zap' },
    { name: 'Lightbox', logo: 'box' },
    { name: 'FeatherDev', logo: 'feather' },
    { name: 'Spherule', logo: 'circle-dot' },
    { name: 'GlobalBank', logo: 'landmark' },
    { name: 'Nietzsche', logo: 'sun' },
  ]);
}