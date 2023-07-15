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
  constructor(
    private productServices: ProductService,
    private WishlistService: WishlistService
  ) {}
  // this is filter for language
  searchLanguage: string = 'all';
  searchBinding: string = 'all';
  searchPrice: any = 'all';

  // this is get Product Image from API
  ngOnInit(): void {
    this.fetchCardsFromApi();
  }
  fetchCardsFromApi() {
    this.productServices.getProducts().subscribe((data: any) => {
      this.productImg = data;
    });
  }
  // active class add and remove
  wishlistToggle(event: any) {
    const cardElement = event.srcElement;
    const activeClass = cardElement.classList.contains('CardWishList');

    const wishlistData = {
      wishlistCount: true,
    };

    if (activeClass) {
      cardElement.classList.remove('CardWishList');
      const removeWishCount = document.querySelectorAll('.CardWishList').length;
      wishlistData.wishlistCount = Boolean (removeWishCount);
      this.WishlistService.setWishlistCount(removeWishCount);
      this.WishlistService.getWishlistCount();

      this.WishlistService.removeWishlist(wishlistData).subscribe(
        (res) => {
          this.WishlistService.setWishlistCount(removeWishCount);
          this.WishlistService.getWishlistCount();
          console.log('un wishlist', this.WishlistService.getWishlistCount());
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      cardElement.classList.add('CardWishList');
      const addWishCount = document.querySelectorAll('.CardWishList').length;
      wishlistData.wishlistCount = Boolean(addWishCount);
      this.WishlistService.addWishlist(wishlistData).subscribe(
        (res) => {
          this.WishlistService.setWishlistCount(addWishCount);
          this.WishlistService.getWishlistCount();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
