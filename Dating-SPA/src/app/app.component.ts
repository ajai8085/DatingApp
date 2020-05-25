import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating-SPA';
  values: any;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

}
