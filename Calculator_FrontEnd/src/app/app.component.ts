import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator_FrontEnd';
  current: string = '';
  parentFunction(recieved: any){
    this.current = recieved;
  }
  data = {
    sent: this.current
  }
}
