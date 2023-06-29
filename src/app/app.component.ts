import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
  title = 'app-selector';
  response = '';

  public ping(request: string) {
    console.log("start ping");
    window.electronAPI.ping(request)
    .then((result: string) => {
        console.log("success ping");
        this.response = result;
      })
      .catch((error: Error) => {
        this.response = error.message;
        console.error(error);
      });
  }
}
