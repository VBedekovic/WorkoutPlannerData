import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.checkAuth().subscribe({
      next: (respone) => {
        this.loggedIn = respone.body ? respone.body : false
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  refreshFiles() {
    this.userService.refreshFiles().subscribe({
      next: (response) => {
        alert("Refresh successful!")
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
