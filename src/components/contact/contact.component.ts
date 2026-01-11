import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgOptimizedImage]
})
export class ContactComponent {
  contactItems = signal([
    {
      icon: 'mail',
      title: 'Email Us',
      detail: 'contact@abccompany.com',
      imageUrl: 'https://picsum.photos/seed/mail-illustration/500/350'
    },
    {
      icon: 'phone',
      title: 'Call Us',
      detail: '+1 (XXX) XXX-XXXX',
      imageUrl: 'https://picsum.photos/seed/phone-illustration/500/350'
    },
    {
      icon: 'map-pin',
      title: 'Visit Us',
      detail: '123, Main Road, London, UK.',
      imageUrl: 'https://picsum.photos/seed/visit-illustration/500/350'
    }
  ]);
}