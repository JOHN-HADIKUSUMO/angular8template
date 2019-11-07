import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { IUser } from '../models/User';

@Component({
  selector: 'wish',
  templateUrl: './wish.component.html'
})
export class WishComponent implements OnInit {
  constructor(private service: UserService) {

  }

  ngOnInit(): void {

  }
}
