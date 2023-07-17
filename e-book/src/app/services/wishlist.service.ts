import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistCount: number = 0 ;
  wishlists: any;
  wishlistNumber:any; 
  constructor(private http:HttpClient) {}
  // this is add count wishlist 
  setWishlistCount(count: any): void { 
    this.wishlistCount = count;
  }
  // this is show count wishlist 
  getWishlistCount(): any  {
    return this.wishlistCount ;
  }
  getWishCount() {
    return this.http.get(environment.apiPath + 'wishlist',)
  }
  // store wishlist 
  addWishlist(data:any) { 
    return this.http.post(environment.apiPath +'wishlist', data);
  } 
  removeWishlist(item: any): Observable<any> {
    const url = `${environment.apiPath}/${item}`;
    return this.http.delete(url);
  }
}
