/*
  Authors : bunchdevelopers (Rahul Jograna)
  Website : https://bunchdevelopers.com/
  App Name : ionic6Template Pack
  This App Template Source code is licensed as per the
  terms found in the Website https://bunchdevelopers.com/license
  Copyright and Good Faith Purchasers © 2021-present bunchdevelopers.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-friend',
  templateUrl: './my-friend.page.html',
  styleUrls: ['./my-friend.page.scss'],
})
export class MyFriendPage implements OnInit {

  constructor(
    private router: Router,
    private NavCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.NavCtrl.back();
  }
  onSearch() {
    this.router.navigate(['search-profile']);
  }
  onProfile() {
    this.router.navigate(['profile-timeline']);
  }

}