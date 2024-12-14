import { Component, OnInit } from '@angular/core';
import { OrganiserService } from '../../../Services/organiser.service';
import { SharedService } from '../../../Shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private organiserService: OrganiserService,
    public sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  username: string | null = null;
  userava: string | null = null;
  organiserId: number = -1;
  organiser:any;

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.organiserId = +id!;

    this.GetProfile();
  }

  GetProfile() {
    this.organiserService.GetById(this.organiserId).subscribe(
      (res: any) => {
        this.organiser = res.body
        console.log(res)
      },
      err => {
        console.log(err);
      }
    )
  }
}
