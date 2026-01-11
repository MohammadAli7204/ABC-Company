import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DotBackgroundComponent } from '../../components/dot-background/dot-background.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { RouterLink } from '@angular/router';
import { TimelineComponent, TimelineEntry } from '../../components/ui/timeline/timeline.component';
import { AnimatedButtonComponent } from '../../components/ui/animated-button/animated-button.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgOptimizedImage, DotBackgroundComponent, ContactComponent, RouterLink, TimelineComponent, AnimatedButtonComponent]
})
export class AboutComponent {
  timelineData = signal<TimelineEntry[]>([
    {
      title: '2017',
      description: 'ABC Company was founded with a vision to provide innovative engineering solutions to startups, focusing on reliability and affordability.',
    },
    {
      title: '2018',
      description: 'We diversified our offerings to include legacy system migrations and ERP implementations, catering to small and medium-sized businesses.',
    },
    {
      title: '2019',
      description: 'ABC Company expanded its reach by serving clients across multiple countries, building strong partnerships with multinational corporations.',
    },
    {
      title: '2020',
      description: 'We introduced fully autonomous development teams, enabling clients to scale their projects with ease and efficiency.',
    },
    {
      title: '2021',
      description: 'To address growing digital threats, we added comprehensive cybersecurity services, safeguarding our clients\' assets worldwide.',
    },
    {
      title: '2023',
      description: 'With over 300 successful projects delivered globally, we solidified our reputation as a leading provider of tailored engineering solutions.',
    },
    {
      title: '2024',
      description: 'ABC Company continues to innovate, serving startups, SMBs, and enterprises with a focus on scalable solutions, global collaboration, and unmatched reliability.',
    }
  ]);

  values = signal([
    { title: 'Innovation', description: 'Pioneering solutions tailored to your unique needs.', imageUrl: 'https://picsum.photos/seed/innovation/500/300' },
    { title: 'Reliability', description: 'Delivering on promises with precision and excellence.', imageUrl: 'https://picsum.photos/seed/reliability/500/300' },
    { title: 'Collaboration', description: 'Partnering with clients to achieve shared success.', imageUrl: 'https://picsum.photos/seed/collaboration/500/300' },
    { title: 'Integrity', description: 'Building trust through transparency and accountability.', imageUrl: 'https://picsum.photos/seed/integrity/500/300' }
  ]);

  teamMembers = signal([
    { src: 'https://avatars.githubusercontent.com/u/47919550?v=4', name: 'Meschac Irung', role: 'Frontend Engineer', twitter: 'MeschacIrung' },
    { src: 'https://avatars.githubusercontent.com/u/31113941?v=4', name: 'Bernard Ngandu', role: 'Backend Developer', twitter: 'bernard-ngandu' },
    { src: 'https://avatars.githubusercontent.com/u/68236786?v=4', name: 'Theo Balick', role: 'UI/UX Designer', twitter: 'theoblr' },
    { src: 'https://avatars.githubusercontent.com/u/99137927?v=4', name: 'Glodie Lukose', role: 'Project Manager', twitter: 'glodielukose' },
    { src: 'https://avatars.githubusercontent.com/u/12345678?v=4', name: 'Sarah Johnson', role: 'DevOps Engineer', twitter: 'sarahjohnson' },
    { src: 'https://avatars.githubusercontent.com/u/23456789?v=4', name: 'Michael Chen', role: 'QA Specialist', twitter: 'michaelchen' },
    { src: 'https://avatars.githubusercontent.com/u/34567890?v=4', name: 'Aisha Patel', role: 'Data Scientist', twitter: 'aishapatel' },
    { src: 'https://avatars.githubusercontent.com/u/45678901?v=4', name: 'Carlos Rodriguez', role: 'Product Manager', twitter: 'carlosrodriguez' },
    { src: 'https://avatars.githubusercontent.com/u/56789012?v=4', name: 'Emma Wilson', role: 'Content Strategist', twitter: 'emmawilson' },
  ]);

  joinUsItems = signal([
    { title: 'Inclusive Environment', description: 'We celebrate diversity and foster a culture of respect and collaboration', imageUrl: 'https://picsum.photos/seed/inclusive/500/300' },
    { title: 'Flexible Work Options', description: 'Work remotely, on-site, or in a hybrid setup that suits your lifestyle.', imageUrl: 'https://picsum.photos/seed/flexible/500/300' },
    { title: 'Recognition & Rewards', description: 'Your contributions are valued, and we celebrate achievements big and small.', imageUrl: 'https://picsum.photos/seed/rewards/500/300' }
  ]);
}