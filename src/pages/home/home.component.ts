import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExpertiseComponent } from '../../components/expertise/expertise.component';
import { ImpactComponent } from '../../components/impact/impact.component';
import { SuccessStoriesComponent } from '../../components/success-stories/success-stories.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { RouterLink } from '@angular/router';
import { ContainerScrollComponent } from '../../components/ui/container-scroll/container-scroll.component';
import { ThreadTrackingHeroComponent } from '../../components/thread-tracking-hero/thread-tracking-hero.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ExpertiseComponent,
    ImpactComponent,
    SuccessStoriesComponent,
    FaqComponent,
    ContactComponent,
    RouterLink,
    ContainerScrollComponent,
    ThreadTrackingHeroComponent
  ]
})
export class HomeComponent {
  reasons = signal([
    {
      title: 'Pioneering Research',
      description: 'Our solutions are backed by cutting-edge research from our dedicated AI labs.',
      icon: 'flask-conical'
    },
    {
      title: 'Scalable AI Infrastructure',
      description: 'We build robust, scalable systems ready to handle enterprise-level data and processing.',
      icon: 'network'
    },
    {
      title: 'Ethical AI Framework',
      description: 'We are committed to developing responsible and transparent AI that you can trust.',
      icon: 'shield'
    }
  ]);
}