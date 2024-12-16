import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../Services/campaign.service';
import { CampaignStatisticsService } from '../../../Services/campaign-statistics.service';
import { ImageCampaignService } from '../../../Services/image-campaign.service';
import { DonationService } from '../../../Services/donation.service';
import { RateCampaignService } from '../../../Services/rate-campaign.service';
import { SharedService } from '../../../Shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { HttpEventType } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-campaign-detail-organiser',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './campaign-detail-organiser.component.html',
  styleUrl: './campaign-detail-organiser.component.css'
})
export class CampaignDetailOrganiserComponent implements OnInit {
  constructor(private campaignService: CampaignService,
    private campaignStatisticsService: CampaignStatisticsService,
    private imageCampaignService: ImageCampaignService,
    private donationService: DonationService,
    private rateCampaignService: RateCampaignService,
    public sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  // SignalR Hub
  hubConnection: signalR.HubConnection | any;

  userId: any;

  campaign: any;
  donatedTotal: number = 0;
  expensedTotal: number = 0;
  transferedTotal: number = 0;
  images1: Array<any> = [];
  images2: Array<any> = [];
  images3: Array<any> = [];
  pageIndexImages1: number = 0;
  pageIndexImages2: number = 0;
  pageIndexImages3: number = 0;
  requestImages1: boolean = true;
  requestImages2: boolean = true;
  requestImages3: boolean = true;

  donationPageIndex: number = 0;
  donationResponse: any;
  donationRequest: boolean = true;
  donationList: Array<any> = [];
  donationSearchForm: FormGroup = new FormGroup({});

  ratingPageIndex: number = 0;
  ratingResponse: any;
  ratingRequest: boolean = true;
  ratingList: Array<any> = [];


  ngOnInit(): void {

    this.userId = localStorage.getItem("userid");

    this.GetCampaign();
    this.GetTotal();
    this.GetImages(1);
    this.GetImages(2);
    this.GetImages(3);

    this.InitDonationSearch();
    this.GetDonationList();

    this.GetRatingList();

    this.StartConnection();
    this.Listener();
  }

  // SignalR Hub
  StartConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5178/donationhub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch((err: any) => console.log(err))
  }

  Listener() {
    var id = this.route.snapshot.paramMap.get('id');
    var campaignId: number = +id!;

    this.hubConnection.on("Campaign:" + campaignId, (response: any) => {
      this.donatedTotal = response.campaignDonationTotal;
      console.log(response);
    })
  }

  GetCampaign() {
    var id = this.route.snapshot.paramMap.get('id');
    var campaignId: number = +id!;
    console.log(campaignId);
    this.campaignService.GetById(campaignId).subscribe(
      (res: any) => {
        if (res.type === HttpEventType.Response) {
          this.campaign = res.body
          console.log(res);
          console.log(this.campaign);

          this.ReviewRating();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  UpdateCampaign(campaign:any){
    this.sharedService.campaign = campaign;
    this.router.navigateByUrl('/organiser/campaign/addedit');
  }

  GetTotal() {
    var id = this.route.snapshot.paramMap.get('id');
    var campaignId: number = +id!;
    this.campaignStatisticsService.GetById(campaignId).subscribe(
      (res: any) => {
        if (res.type === HttpEventType.Response) {
          this.donatedTotal = res.body.totalDonationAmount;
          this.expensedTotal = res.body.totalExpendedAmount;
          this.transferedTotal = res.body.totalTransferredAmount;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  GetImages(campaignStatusId: number) {
    let request: boolean = false;
    let pageIndex: number = 0;

    var id = this.route.snapshot.paramMap.get('id');
    var campaignId: number = +id!;

    if (campaignStatusId == 1) {
      if (this.requestImages1) {
        request = this.requestImages1;
        this.pageIndexImages1 += 1;
        pageIndex = this.pageIndexImages1;
      }
    }
    else if (campaignStatusId == 2) {
      if (this.requestImages2) {
        request = this.requestImages2;
        this.pageIndexImages2 += 1;
        pageIndex = this.pageIndexImages2;
      }
    } else {
      if (this.requestImages3) {
        request = this.requestImages3;
        this.pageIndexImages3 += 1;
        pageIndex = this.pageIndexImages3;
      }
    }

    if (request) {
      this.imageCampaignService.GetAll(pageIndex, campaignId, campaignStatusId).subscribe(
        (res: any) => {
          let response = res.body.$values;
          if (response.length < 8) {
            if (campaignStatusId == 1) {
              this.requestImages1 = false;
            }
            else if (campaignStatusId == 2) {
              this.requestImages2 = false;
            } else {
              this.requestImages3 = false;
            }
          }

          if (campaignStatusId == 1) {
            this.images1 = this.images1.concat(response);
          }
          else if (campaignStatusId == 2) {
            this.images2 = this.images2.concat(response);
          } else {
            this.images3 = this.images3.concat(response);
          }
          // this.campaignList = this.campaignList.concat(this.response);
          // console.log(res);
          // console.log(this.campaignList);
          // console.log(this.pageIndex)
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  FilterDonationSubmit() {
    this.donationRequest = true;
    this.donationSearchForm.value.pageindex = 0;
    this.donationList = [];
    this.GetDonationList();
  }

  GetDonationList() {
    if (this.donationRequest) {
      // this.donationSearchForm.value.pageindex += 1;
      this.donationSearchForm.get("pageindex")?.setValue(this.donationSearchForm.value.pageindex += 1);
      console.log(this.donationSearchForm.value.pageindex);

      var id = this.route.snapshot.paramMap.get('id');
      var campaignId: number = +id!;

      this.donationService.GetSearchedListByCampaignId(campaignId, this.donationSearchForm.value).subscribe(
        (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.donationResponse = res.body.$values;
            if (this.donationResponse.length < 10) {
              this.donationRequest = false;
            }
            this.donationList = this.donationList.concat(this.donationResponse);
            console.log(res);
            console.log(this.donationList);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  private InitDonationSearch(): void {
    this.donationSearchForm = new FormGroup({
      'fromdate': new FormControl("", Validators.required),
      'todate': new FormControl("", Validators.required),
      'donor': new FormControl("", Validators.required),
      'orderby': new FormControl("", Validators.required),
      'pageindex': new FormControl(0, Validators.required),
    });
  }

  GetRatingList() {
    if (this.ratingRequest) {
      this.ratingPageIndex += 1;

      var id = this.route.snapshot.paramMap.get('id');
      var campaignId: number = +id!;

      this.rateCampaignService.GetListByCampaignId(campaignId, this.ratingPageIndex).subscribe(
        (res: any) => {
          this.ratingResponse = res.body.$values;
          if (this.ratingResponse.length < 5) {
            this.ratingRequest = false;
          }
          this.ratingList = this.ratingList.concat(this.ratingResponse);
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  ExportDonationFile() {

  }

  ExportExpenseFile() {

  }

  // ----- Design -----
  ViewImage() {
    console.log("hello");
  }

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
      this.donationSearchForm.get("orderby")?.setValue("asc");
      // this.donationSearchForm.value.orderby = "asc";
    }
    else if (command == "decreasing") {
      textBox.value = "Đóng góp giảm dần";
      this.donationSearchForm.get("orderby")?.setValue("desc");
      // this.donationSearchForm.value.orderby = "desc";
    }
  }

  ReviewRating() {
    let allStar = document.querySelectorAll('.reviews .review .rating .star')

    console.log(allStar);
    for (let i = 0; i < this.campaign.ratedByRecipient; i++) {
      if (i <= this.campaign.ratedByRecipient - 1) {
        allStar[i].classList.replace('bi-star', 'bi-star-fill')
      } else {
        // allStar[i].style.setProperty('--i', click)
        // click++
      }
    }
  }
}