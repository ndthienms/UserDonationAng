import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  readonly baseUrl = 'http://localhost:5178/api/Campaign';

  constructor(private http: HttpClient) { }

  GetSearchedListByUser(pageIndex: any, searchForm: any) {
    return this.http.post(this.baseUrl + '/GetSearchedListByUser/' + pageIndex, searchForm,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      },
    );
  }

  GetSearchedListByOrganiser(pageIndex: any, searchForm: any) {
    return this.http.post(this.baseUrl + '/GetSearchedListByOrganiser/' + pageIndex, searchForm,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      },
    );
  }

  GetById(campaignId: any) {
    return this.http.get(this.baseUrl + '/GetById/' + campaignId,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      },
    );
  }

  Add(cuFormData: any) {
    return this.http.post(this.baseUrl + '/Add', cuFormData,
      {
        reportProgress: true,
        observe: 'events'
      },
    );
  }

  Update(campaignId: any, cuFormData: any) {
    return this.http.put(this.baseUrl + '/Update/' + campaignId, cuFormData,
      {
        reportProgress: true,
        observe: 'events'
      },
    );
  }
}
