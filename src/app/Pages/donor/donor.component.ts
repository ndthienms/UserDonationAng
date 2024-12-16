import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-donor',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css'
})
export class DonorComponent implements OnInit {


  constructor(private router: Router) {

  }

  username: string | null = null;
  userava: string | null = null;

  ngOnInit(): void {
    // Convert res to base64
    if (localStorage.getItem('token') != null) {
      let base64 = localStorage.getItem('token')!.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }

      var payLoad = JSON.parse(decodeURIComponent(escape(window.atob(base64!.split('.')[1]))));
      var userRole = payLoad['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      var userId = payLoad['Id'];

      if (userRole == "donor") {
        this.router.navigateByUrl('/');
      }
      else if (userRole == "organiser") {
        this.router.navigateByUrl('/organiser/profile/' + userId);
      }
      else if (userRole == "recipient") {
        this.router.navigateByUrl('/recipient');
      }
      else {
        this.Logout();
      }
    }

    let first_topic_icon = document.querySelector(".first-topic-icon");
    first_topic_icon?.classList.add("active");
  }

  ProfileOpen() {
    let profile = document.querySelector(".profile");
    let notification = document.querySelector(".notifications");

    profile?.classList.toggle("active");
    notification?.classList.remove("active");
  }

  NotificationOpen() {
    let profile = document.querySelector(".profile");
    let notification = document.querySelector(".notifications");

    notification?.classList.toggle("active");
    profile?.classList.remove("active");
  }

  ActiveTopic(event: any) {
    let topicIcons = document.querySelectorAll(".topic-icon");
    topicIcons.forEach(item => {
      item.classList.remove("active");
      if (item == event.target.parentElement) {
        item.classList.add("active");
      }
    })
  }

  Loggedin() {
    if (localStorage.getItem('token')) {
      this.username = localStorage.getItem('username');
      this.userava = localStorage.getItem('userava')
    }

    return localStorage.getItem('token');
  }

  Logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("userava");
    localStorage.removeItem("userid")
    localStorage.removeItem("token");
  }
}
