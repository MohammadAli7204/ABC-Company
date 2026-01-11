import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DotBackgroundComponent } from '../../components/dot-background/dot-background.component';
import { NgOptimizedImage } from '@angular/common';
import { ContactComponent as SharedContactComponent } from '../../components/contact/contact.component';
import { RouterLink } from '@angular/router';
import { AnimatedButtonComponent } from '../../components/ui/animated-button/animated-button.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, DotBackgroundComponent, NgOptimizedImage, SharedContactComponent, RouterLink, AnimatedButtonComponent],
})
export class ContactComponent {
  contactForm = (inject(FormBuilder) as FormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    service: ['Select Service', Validators.required],
    budget: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  services = ['Legacy System Migration', 'ERP Implementation', 'Engineering Consulting', 'Product Consulting'];

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // Here you would typically send the form data to a server
    }
  }
}
