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
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "/contact" },
        { name: "Contact", href: "/contact" },
        { name: "Advertise", href: "#" },
        { name: "Privacy", href: "#" },
      ],
    },
  ]);

  socialLinks = signal([
    { icon: 'instagram', href: "#", label: "Instagram" },
    { icon: 'facebook', href: "#", label: "Facebook" },
    { icon: 'twitter', href: "#", label: "Twitter" },
    { icon: 'linkedin', href: "#", label: "LinkedIn" },
    { icon: 'github', href: "#", label: "GitHub" },
    { icon: 'youtube', href: "#", label: "YouTube" }
  ]);
  
  legalLinks = signal([
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ]);
}