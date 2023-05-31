import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { 
  table:any;
  constructor(private http: HttpClient,) {}
  ngOnInit() { 
    this.http.get<any>(environment.userApi + 'user').subscribe((data =>{
      console.log(data)
      // this.table = data;
      if(data === true) {
        this.table.append('<tr><td></td></tr>');
      }
    }))
    
  }


}