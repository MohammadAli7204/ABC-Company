import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink]
})
export class ExpertiseComponent {
  expertiseItems = signal([
    {
      title: 'AI Product Strategy',
      description: 'We help you define and build AI-powered products that deliver real value and dominate the market.',
      icon: 'brain-circuit'
    },
    {
      title: 'AI Integration Services',
      description: 'Seamlessly integrate intelligent automation and machine learning into your existing systems.',
      icon: 'combine'
    },
    {
      title: 'Autonomous Agent Development',
      description: 'Create smart, autonomous agents that drive productivity and revolutionize your operations.',
      icon: 'bot-message-square'
    },
    {
      title: 'ML Engineering Consulting',
      description: 'Leverage our expert guidance to build robust, scalable, and production-ready machine learning systems.',
      icon: 'sliders-horizontal'
    },
    {
      title: 'AI-Powered Automation',
      description: 'Deploy intelligent automation solutions to streamline complex business processes and workflows.',
      icon: 'database-zap'
    },
    {
      title: 'AI-Enhanced Security',
      description: 'Protect your digital assets with predictive threat intelligence and AI-driven security protocols.',
      icon: 'shield-check'
    }
  ]);
}