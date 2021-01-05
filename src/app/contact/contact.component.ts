import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  errMess: string;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  showLoading = false;
  visibility = 'shown';
  visibilitySubmission = 'hidden';
  showFormFeedback = true;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages =  {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters long'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long',
      'maxlength': 'Last name cannot be more than 25 characters long'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in a valid format.'
    }
  };

  constructor(private feedbackService: FeedbackService,
    private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });


    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages

  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) {
      return;
    }

    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedbackCopy = this.feedbackForm.value;
    console.log(this.feedbackCopy);
    this.showFormFeedback = false;
    this.visibility = 'hidden'; 
    this.showLoading = true;

    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => {
        if(feedback) {
          this.feedback = feedback; 
          this.feedbackCopy = feedback;
          
          this.showLoading = false; 
          this.visibilitySubmission = 'shown'; 

          setTimeout(() => {
            this.visibilitySubmission = 'hidden'; 
            this.showFormFeedback = true;
            this.visibility = 'shown';              
          }, 5000);
        }
      },
      errmess => {
        this.feedback = null; 
        this.feedbackCopy = null;
        this.errMess = <any>errmess;
      }
    );

    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
  }

}
