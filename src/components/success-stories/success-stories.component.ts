import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink]
})
export class SuccessStoriesComponent {
  stories = signal([
    {
      title: 'Streamlined Operations with Custom ERP',
      text: 'ABC Company delivered exactly what we needed—a scalable and secure ERP system that streamlined our operations. Their team’s professionalism and expertise were evident every step of the way.',
      author: 'Manager, Global Retail Company'
    },
    {
      title: 'MVP Delivered Ahead of Schedule',
      text: 'As a startup, we were looking for a reliable partner to build our MVP. ABC Company exceeded our expectations, delivering a bug-free product ahead of schedule. Their team felt like an extension of ours!',
      author: 'Founder, FinTech Startup'
    },
    {
      title: 'Seamless Legacy System Migration',
      text: 'The legacy system migration ABC Company handled for us was seamless. We were impressed with their attention to detail, proactive communication, and ability to complete the project with zero downtime.',
      author: 'CTO, Healthcare Enterprise'
    }
  ]);
}