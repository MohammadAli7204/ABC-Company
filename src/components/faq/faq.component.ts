import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FaqComponent {
  faqs = signal([
    {
      question: 'What industries do you serve?',
      answer: 'We serve clients across industries, including technology, healthcare, finance, retail, and more.'
    },
    {
      question: 'Can your solutions scale with my business?',
      answer: 'Absolutely. Scalability is at the core of our solutions. We design systems that grow with your business, ensuring long-term performance and reliability.'
    },
    {
      question: 'How do you ensure security and reliability?',
      answer: 'We follow industry best practices for security, including regular audits, vulnerability assessments, and compliance checks. Our infrastructure is designed for high availability and fault tolerance.'
    },
    {
      question: 'Do you offer dedicated teams for ongoing projects?',
      answer: 'Yes, we provide dedicated development teams that function as an extension of your own. This model ensures deep integration, clear communication, and consistent progress.'
    }
  ]);

  openIndex = signal<number | null>(0);

  toggleFaq(index: number) {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}