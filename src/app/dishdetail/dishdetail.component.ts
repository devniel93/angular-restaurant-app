import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  dishcommentForm: FormGroup;
  comment: Comment;
  @ViewChild('fform') dishcommentFormDirective;

  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
  };

  validationMessages =  {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required.'
    },
    'rating': {
      'required': 'Rating is required.'
    }

  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
  } 

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];
    //this.dishService.getDish(id)
      //.then((dish) => this.dish = dish); // Using Promises

      // Using RxJs
      this.dishService.getDishIds()
        .subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
        .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }); 
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.dishcommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required]],
      rating: [5, [Validators.required]]
    });

    this.dishcommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.dishcommentForm) {
      return;
    }

    const form = this.dishcommentForm;
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
    this.comment = this.dishcommentForm.value;
    
    // set date 
    var d = new Date().toISOString();
    this.comment.date = d;

    console.log(this.comment);
    
    // push to comments list
    this.dish.comments.push(this.comment);

    this.dishcommentFormDirective.resetForm();
    this.dishcommentForm.reset({
      'author': '',
      'comment': '',
      'rating': '5'
    });
    
  }

}
