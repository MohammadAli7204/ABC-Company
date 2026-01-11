import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DotBackgroundComponent } from '../../components/dot-background/dot-background.component';
import { NgOptimizedImage } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact.component';
import { RouterLink } from '@angular/router';
import { AnimatedButtonComponent } from '../../components/ui/animated-button/animated-button.component';

@Component({
  selector: 'app-services-page',
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DotBackgroundComponent, NgOptimizedImage, ContactComponent, RouterLink, AnimatedButtonComponent],
})
export class ServicesComponent {
  services = signal([
    {
      title: 'Product Consulting',
      description: 'Strategically position your product in the market with deep business and user insights and market expertise.',
      imageUrl: 'https://picsum.photos/seed/product-consulting/600/400'
    },
    {
      title: 'Legacy System Migration',
      description: 'Seamlessly transform outdated systems for improved agility, scalability, and performance.',
      imageUrl: 'https://picsum.photos/seed/legacy-migration/600/400'
    },
    {
      title: 'Automated Teams',
      description: 'Drive productivity with fully autonomous development teams, ideal for scalable solutions.',
      imageUrl: 'https://picsum.photos/seed/automated-teams/600/400'
    },
    {
      title: 'Engineering Consulting',
      description: 'Overcome challenges and foster innovation with expert guidance from leading engineering professionals.',
      imageUrl: 'https://picsum.photos/seed/engineering-consulting/600/400'
    },
    {
      title: 'ERP Implementation',
      description: 'Leverage our customized ERP solutions to optimize and streamline your operations at scale.',
      imageUrl: 'https://picsum.photos/seed/erp-implementation/600/400'
    },
    {
      title: 'Cybersecurity Services',
      description: 'Safeguard your digital assets with industry-leading security protocols and proactive vulnerability assessments.',
      imageUrl: 'https://picsum.photos/seed/cybersecurity/600/400'
    }
  ]);
}
