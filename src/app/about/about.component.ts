import { Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  aboutErrMess: string;

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      //.then((leaders) => this.leaders = leaders); // Using Promises
      .subscribe((leaders) => this.leaders = leaders,
      errmess => this.aboutErrMess = <any>errmess); // Using RxJs
  }

}
