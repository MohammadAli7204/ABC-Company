import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  navItems = signal([
    { label: 'Home', routerLink: '/', exact: true },
    { label: 'About Us', routerLink: '/about', exact: false },
    { label: 'Case Studies', routerLink: '/case-studies', exact: false },
    { label: 'Services', routerLink: '/services', exact: false },
    { label: 'Contact Us', routerLink: '/contact', exact: false },
  ]);
}