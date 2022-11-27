import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  newView: string = "0";
  newOperand1: string = "";
  newOperand2: string = "";
  newOp: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  updateView(recievedView: string){
    this.newView = recievedView;
  }
  updateOperand1(recievedOperand1: string){
    this.newOperand1 = recievedOperand1;
  }
  updateOperand2(recievedOperand2: string){
    this.newOperand2 = recievedOperand2;
  }
  updateOp(recievedOp: string){
    this.newOp = recievedOp;
  }

}
