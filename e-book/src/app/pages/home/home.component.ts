import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;
  productImg: any;
  wishlistCount: boolean = false;
  count: number = 0;
  item:any;
  removeWishlist: any;
  constructor(
    private productServices: ProductService,
    private WishlistService: WishlistService,
    private http:HttpClient
  ) { }
  // this is filter for language
  searchLanguage: string = 'all';
  searchBinding: string = 'all';
  searchPrice: any = 'all';


  ngOnInit(): void {
    this.fetchCardsFromApi();
  }
  // this is get Product Image from API
  fetchCardsFromApi() {
    this.productServices.getProducts().subscribe((data: any) => {
      this.productImg = data;
    });
  }

  // active class add and remove
  wishlistToggle(event: any, item:any) {
    const cardElement = event.srcElement;
    const activeClass = cardElement.classList.contains('CardWishList');

    if (activeClass) {
      cardElement.classList.remove('CardWishList');
      this.count--; 
      this.WishlistService.removeWishlist(item).subscribe((data) => { 
      console.log(data)
      }, (error) => { 
        console.log(error)
      });
    } else {
      cardElement.classList.add('CardWishList');
      this.count++
      this.WishlistService.addWishlist({ count: this.count }).subscribe((res) => {
        // console.log("Added to Wish List =", this.count);
      })
    }
  }
}
