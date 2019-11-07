import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { IUser } from '../models/User';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private service: UserService) {

  }

  ngOnInit(): void {

  }
}
