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
}
