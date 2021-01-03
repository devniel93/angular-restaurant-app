import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {

    this.dishService.getFeaturedDish()
      //.then((dish) => this.dish = dish); // Using Promises
      .subscribe((dish) => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess); // Using RxJs

    this.promotionService.getFeaturedPromotion()
        //.then((promotion) => this.promotion = promotion);
        .subscribe((promotion) => this.promotion = promotion,
        errmess => this.promotionErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
        //.then((leader) => this.leader = leader)
        .subscribe((leader) => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
        
  }

}
