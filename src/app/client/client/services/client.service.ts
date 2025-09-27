import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../basic/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.baseHref;
  get_all_ads_url = environment.baseHref + environment.get_all_ads_url;
  search_ad_url = environment.baseHref + environment.search_ad_url;
  book_service_url = environment.baseHref + environment.book_service_url;
  get_ad_url = environment.baseHref + environment.get_ad_url;
  my_bookings_url = environment.baseHref + environment.my_bookings_url;
  review_client_url = environment.baseHref + environment.review_client_url;

  constructor(private http: HttpClient) { }



  // getAllAds(): Observable<any> {
  //   const url = `${this.get_all_ads_url}`;
  //   const token = localStorage.getItem('token'); // or sessionStorage if that’s where you store it
  //
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  //
  //   return this.http.get<any>(url, { headers });
  // }

  getAllAds(): Observable<any> {
    const url = `${this.get_all_ads_url}`;
    return this.http.get<any>(url,
      {
      headers: this.createAuthorizationHeader()
    }

    )
  }


  searchAdByName(name: any): Observable<any> {
    const url = `${this.search_ad_url}/${name}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  getAdDetailsByAdId(adId: any): Observable<any> {
    const url = `${this.get_ad_url}/${adId}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  bookService(bookDTO: any): Observable<any> {

    const url = `${this.book_service_url}`;
    return this.http.post<any>(url, bookDTO,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  getMyBookings(): Observable<any> {
    const userId = UserStorageService.getUserId();

    const url = `${this.my_bookings_url}/${userId}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }


  giveReview(reviewDTO: any): Observable<any> {

    const url = `${this.review_client_url}`;
    return this.http.post<any>(url, reviewDTO,


      // {
      // headers: this.createAuthorizationHeader()}
    );
  }



  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

}
