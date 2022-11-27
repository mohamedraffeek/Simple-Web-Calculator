import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  }), responseType: 'string'
};

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  current_result: string = '0';
  true_result: string = '0';
  operand1: number = 0;
  operand2: number = 0;
  op: string = '';
  clear: boolean = false;
  dot: boolean = false;
  lock_equal1: boolean = false;
  lock_equal2: boolean = false;
  special_operand: number = 0;
  @Output() newViewEvent = new EventEmitter<string>;
  @Output() newOperand1Event = new EventEmitter<string>;
  @Output() newOperand2Event = new EventEmitter<string>;
  @Output() newOpEvent = new EventEmitter<string>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  sendView(){
    this.newViewEvent.emit(this.current_result);
  }
  


  update_display(input: string){
    if(this.lock_equal2 == true){
      this.dot = false;
    }
    this.lock_equal2 = false;
    if(this.clear){
      this.current_result = input;
      this.true_result = input;
      this.clear = false;
      return;
    }
    if(this.current_result.length > 22) return;
    if(this.current_result == '0') this.current_result = input, this.true_result = input;
    else this.current_result += input, this.true_result += input;
  }

  erase_one_number(){
    if(this.current_result.length == 1 || this.current_result.length == 0){
      this.current_result = '0';
      this.true_result = '0';
      return;
    }
    this.current_result = this.current_result.substring(0, this.current_result.length - 1);
    this.true_result = this.true_result.substring(0, this.true_result.length - 1);
  }

  clear_all(){
    this.current_result = '0';
    this.true_result = '0';
    this.operand1 = 0;
    this.operand2 = 0;
    this.op = '';
    this.clear = false;
    this.dot = false;
    this.lock_equal1 = false;
    this.lock_equal2 = false;
    this.newOperand1Event.emit('');
    this.newOperand2Event.emit('');
    this.newOpEvent.emit('');
  }

  dot_pressed(){
    if(this.clear){
      this.current_result = '0.';
      this.true_result = this.current_result;
      this.dot = true;
      this.clear = false;
      return;
    }
    if(this.dot) return;
    else this.current_result += '.', this.true_result = this.current_result, this.dot = true;
  }

  operator_pressed(op: string){
    if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
      this.clear_all();
      return;
    }
    if(this.op != ''){
      this.operand2 = parseFloat(this.true_result);
      this.http.post<string>(`http://localhost:8080/operate/${this.op}/${this.operand1}/${this.operand2}`, JSON, httpOptions)
      .subscribe(result => {
        this.current_result = result.toString();
        this.true_result = result.toString();
        this.newOperand1Event.emit((parseFloat(this.current_result) * 1).toString());
        this.newOpEvent.emit(op);
        this.newOperand2Event.emit('');
        if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
          this.newViewEvent.emit(this.current_result);
          return;
        }
        if(this.current_result == "Infinity"){
          this.current_result = "Number is out of bound";
          this.newViewEvent.emit(this.current_result);
          return;
        }
        this.current_result = (parseFloat(this.current_result) * 1).toString()
        this.newViewEvent.emit(this.current_result);
        this.operand1 = parseFloat(result.toString());
        this.operand2 = 0;
      });
      this.clear = true;
      this.lock_equal1 = true;
      this.lock_equal2 = true;
    }else{
      this.newOperand1Event.emit(this.current_result);
      this.newOpEvent.emit(op);
      this.newOperand2Event.emit('');
    }
    this.lock_equal1 = false;
    this.operand1 = parseFloat(this.true_result);
    this.op = op;
    this.clear = true;
    this.dot = false;
  }

  switch_sign(){
    if(this.current_result == '0' || this.current_result == 'E') return;
    if(this.current_result[0] != '-') this.current_result = '-' + this.current_result, this.true_result = this.current_result;
    else this.current_result = this.current_result.substring(1, this.current_result.length), this.true_result = this.current_result;
  }

  special(special_op: string){
    if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
      this.clear_all();
      return;
    }
    this.special_operand = parseFloat(this.true_result);
    this.newOperand1Event.emit('');
    this.newOperand2Event.emit(this.special_operand.toString());
    this.newOpEvent.emit(special_op + " of");
    this.http.post<string>(`http://localhost:8080/operate/${special_op}/${this.special_operand}`, JSON, httpOptions)
    .subscribe(result => {
      this.current_result = result.toString();
      this.true_result = result.toString();
      if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
        this.newViewEvent.emit(this.current_result);
        return;
      }
      if(this.current_result == "Infinity"){
        this.current_result = "Number is out of bound";
        this.newViewEvent.emit(this.current_result);
        return;
      }
      this.current_result = (parseFloat(this.current_result) * 1).toString()
      this.newViewEvent.emit(this.current_result);
      if(this.op == ''){
        this.operand1 = parseFloat(result.toString());
      }else{
        this.operand2 = parseFloat(result.toString());
      }
    });
    this.lock_equal1 = true;
    this.lock_equal2 = true;
    this.clear = true;
  }

  equal_pressed(){
    if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
      this.clear_all();
      return;
    }
    if(this.lock_equal1 || this.lock_equal2) return;
    this.operand2 = parseFloat(this.true_result);
    this.newOperand1Event.emit(this.operand1.toString());
    this.newOperand2Event.emit(this.operand2.toString() + ' =');
    this.newOpEvent.emit(this.op);
    this.http.post<string>(`http://localhost:8080/operate/${this.op}/${this.operand1}/${this.operand2}`, JSON, httpOptions)
    .subscribe(result => {
      this.current_result = result.toString();
      this.true_result = result.toString();
      if(this.current_result == "Can't divide by zero" || this.current_result == "Negative root detected"){
        this.newViewEvent.emit(this.current_result);
        return;
      }
      if(this.current_result == "Infinity"){
        this.current_result = "Number is out of bound";
        this.newViewEvent.emit(this.current_result);
        return;
      }
      this.current_result = (parseFloat(this.current_result) * 1).toString()
      this.newViewEvent.emit(this.current_result);
      this.operand1 = parseFloat(result);
      this.operand2 = 0;
    });
    this.clear = true;
    this.op = '';
    this.lock_equal1 = true;
    this.lock_equal2 = true;
    this.dot = true;
  }
}
