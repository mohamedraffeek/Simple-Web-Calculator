import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  newView: string = "0";
  constructor() { }

  ngOnInit(): void {
  }

  updateView(recieved: string){
    this.newView = recieved;
  }

}
