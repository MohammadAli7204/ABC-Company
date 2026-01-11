import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DotBackgroundComponent } from '../../components/dot-background/dot-background.component';
import { NgOptimizedImage } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact.component';
import { RouterLink } from '@angular/router';
import { AnimatedButtonComponent } from '../../components/ui/animated-button/animated-button.component';

@Component({
  selector: 'app-case-studies-page',
  templateUrl: './case-studies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DotBackgroundComponent, NgOptimizedImage, ContactComponent, RouterLink, AnimatedButtonComponent],
})
export class CaseStudiesComponent {
  caseStudies = signal([
    {
      title: 'Seamless Legacy System Migration for a Healthcare Enterprise',
      challenge: 'The client’s outdated legacy system was hindering performance, scalability, and integration with modern healthcare platforms, creating operational bottlenecks.',
      solution: 'We developed a custom migration strategy, ensuring zero downtime and data integrity. Our team re-architected the application for the cloud, integrated it with modern APIs, and provided comprehensive training.',
      imageUrl: 'https://picsum.photos/seed/healthcare-case-study/600/400',
    },
    {
      title: 'Accelerating MVP Development for a FinTech Startup',
      challenge: 'A FinTech startup needed to launch a stable and secure MVP within a tight timeframe to attract investors and validate their business model in a competitive market.',
      solution: 'Our agile team delivered a bug-free MVP in just 12 weeks. We built a scalable architecture, integrated third-party payment gateways, and ensured compliance with financial regulations from day one.',
      imageUrl: 'https://picsum.photos/seed/fintech-case-study/600/400',
    },
    {
      title: 'Scalable ERP Implementation for a Retail Chain',
      challenge: 'A growing retail chain struggled with fragmented systems for inventory, sales, and customer management, leading to inefficiencies and impacting their bottom line.',
      solution: 'We implemented a centralized ERP solution, integrating inventory, sales, and CRM data. The new system provided real-time insights, automated key processes, and improved the overall customer experience.',
      imageUrl: 'https://picsum.photos/seed/retail-case-study/600/400',
    }
  ]);
}
