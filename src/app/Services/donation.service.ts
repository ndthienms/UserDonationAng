import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  readonly baseUrl = 'http://localhost:5178/api/donation';

  constructor(private http: HttpClient) { }

  CreatePaymentUrl(request: any) {
    return this.http.post(this.baseUrl + '/CreatePaymentUrl/', request,
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
