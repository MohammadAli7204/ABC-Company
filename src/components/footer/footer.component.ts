import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  sections = signal([
    {
      title: "Product",
      links: [
        { name: "Overview", href: "/services" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Consulting", href: "/services" },
        { name: "Features", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Team", href: "/about" },
        { name: "Blog", href: "/contact" },
        { name: "Careers", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "/contact" },
        { name: "Contact", href: "/contact" },
        { name: "Advertise", href: "/contact" },
        { name: "Privacy", href: "/about" },
      ],
    },
  ]);

  socialLinks = signal([
    { icon: 'instagram', href: "https://instagram.com", label: "Instagram" },
    { icon: 'facebook', href: "https://facebook.com", label: "Facebook" },
    { icon: 'twitter', href: "https://twitter.com", label: "Twitter" },
    { icon: 'linkedin', href: "https://linkedin.com", label: "LinkedIn" },
    { icon: 'github', href: "https://github.com", label: "GitHub" },
    { icon: 'youtube', href: "https://youtube.com", label: "YouTube" }
  ]);
  
  legalLinks = signal([
    { name: "Terms and Conditions", href: "/about" },
    { name: "Privacy Policy", href: "/about" },
  ]);
}