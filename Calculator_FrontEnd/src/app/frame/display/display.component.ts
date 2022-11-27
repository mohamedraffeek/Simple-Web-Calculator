import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input() view = "0";
  @Input() operand1 = "";
  @Input() operand2 = "";
  @Input() op = "+";

  constructor() {
  }

  ngOnInit(): void {
  }


}
