import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.css'
})
export class CampaignDetailComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

  ViewImage() {
    console.log("hello");
  }

  // ----- Design -----
  TabOnClick(id: number) {
    let tabs = document.querySelectorAll(".tabs button");
    let tabContents = document.querySelectorAll(".tab-content .tab-content-div");

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[id].classList.add("active");
    tabs[id].classList.add("active");
  }

  SortDropDown() {
    var dropdown = document.querySelector(".dropdown");
    dropdown?.classList.toggle("active");
  }

  ChangeOption(command: string) {
    var textBox = <HTMLInputElement>document.querySelector(".text-box");

    if (command == "ascending") {
      textBox.value = "Đóng góp tăng dần";
    }
    else if (command == "decreasing") {
      textBox.value = "Đóng góp giảm dần";
    }
  }

  StartChange(rateNum: number) {
    const allStar = document.querySelectorAll('.rating .star')
    const ratingValue = <HTMLInputElement>document.querySelector('.rating input')

    allStar.forEach(i => {
      i.classList.replace('bi-star-fill', 'bi-star')
      i.classList.remove('active')
    })

    for (let i = 0; i < allStar.length; i++) {
      if (i <= rateNum - 1) {
        allStar[i].classList.replace('bi-star', 'bi-star-fill')
        allStar[i].classList.add('active')
      } else {
        // allStar[i].style.setProperty('--i', click)
        // click++
      }
    }

    // allStar.forEach((item, idx) => {
    //   item.addEventListener('click', function () {
    //     let click = 0
    //     ratingValue.value = idx + 1

    //     allStar.forEach(i => {
    //       i.classList.replace('bi-star-fill', 'bi-star')
    //       i.classList.remove('active')
    //     })
    //     for (let i = 0; i < allStar.length; i++) {
    //       if (i <= idx) {
    //         allStar[i].classList.replace('bi-star', 'bi-star-fill')
    //         allStar[i].classList.add('active')
    //       } else {
    //         allStar[i].style.setProperty('--i', click)
    //         click++
    //       }
    //     }
    //   })
    // })
  }
}
