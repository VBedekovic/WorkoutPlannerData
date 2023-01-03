import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: {
    nickname: string,
    name: string,
    picture: string,
    updated_at: string,
    email: string,
    email_verified: boolean,
    sub: string,
    sid: string
  } = {
    nickname: "null",
    name: "null",
    picture: "null",
    updated_at: "null",
    email: "null",
    email_verified: false,
    sub: "null",
    sid: "null"
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (respone) => {
        this.userData = respone.body ? respone.body : 
          {
            nickname: "null",
            name: "null",
            picture: "null",
            updated_at: "null",
            email: "null",
            email_verified: false,
            sub: "null",
            sid: "null"
          }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.router.navigate(["/401"])
        }
        console.log(error)
      }
    })
  }

}
