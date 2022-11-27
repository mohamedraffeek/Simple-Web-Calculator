import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  current_result: string = '0';
  operand1: number = 0;
  operand2: number = 0;
  op: string = '';
  clear: boolean = false;
  dot: boolean = false;
  lock_equal1: boolean = false;
  lock_equal2: boolean = false;
  special_operand: number = 0;
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  update_display(input: string){
    if(this.lock_equal2 == true){
      this.dot = false;
    }
    this.lock_equal2 = false;
    if(this.clear){
      this.current_result = input;
      this.clear = false;
      return;
    }
    if(this.current_result.length > 12) return;
    if(this.current_result == '0') this.current_result = input;
    else this.current_result += input;
  }

  erase_one_number(){
    if(this.current_result.length == 1 || this.current_result.length == 0){
      this.current_result = '0';
      return;
    }
    this.current_result = this.current_result.substring(0, this.current_result.length - 1);
  }

  clear_all(){
    this.current_result = '0';
    this.operand1 = 0;
    this.operand2 = 0;
    this.op = '';
    this.clear = false;
    this.dot = false;
    this.lock_equal1 = false;
    this.lock_equal2 = false;
  }

  dot_pressed(){
    if(this.dot) return;
    else this.current_result += '.', this.dot = true;
  }

  operator_pressed(op: string){
    if(this.op != ''){
      this.operand2 = parseFloat(this.current_result);
      this.http.post<string>(`http://localhost:8080/operate/${this.op}/${this.operand1}/${this.operand2}`, JSON)
      .subscribe(result => {
        this.current_result = result.toString();
        if(this.current_result.length > 12){
          this.current_result = this.current_result.substring(0, 12);
        }
        if(parseFloat(this.current_result) > 99999999999){
          this.clear_all();
          this.current_result = 'E';
        }
        this.operand1 = parseFloat(result.toString());
        this.operand2 = 0;
      });
      if(this.operand2 == 0 && this.op == '/'){
        this.clear_all();
        this.current_result = 'E';
      }
      this.clear = true;
      this.lock_equal1 = true;
      this.lock_equal2 = true;
    }
    this.lock_equal1 = false;
    this.operand1 = parseFloat(this.current_result);
    this.op = op;
    this.clear = true;
    this.dot = false;
  }

  switch_sign(){
    if(this.current_result == '0') return;
    if(this.current_result[0] != '-') this.current_result = '-' + this.current_result;
    else this.current_result = this.current_result.substring(1, this.current_result.length);
  }

  special(special_op: string){
    this.special_operand = parseFloat(this.current_result);
    this.http.post<string>(`http://localhost:8080/operate/${special_op}/${this.special_operand}`, JSON)
    .subscribe(result => {
      this.current_result = result.toString();
      if(this.current_result.length > 12){
        this.current_result = this.current_result.substring(0, 12);
      }
      if(parseFloat(this.current_result) > 99999999999){
        this.clear_all();
        this.current_result = 'E';
        this.clear = true;
      }
      if(this.op == ''){
        this.operand1 = parseFloat(result.toString());
      }else{
        this.operand2 = parseFloat(result.toString());
      }
    });
    if(this.special_operand == 0 && special_op == 'inverse' || this.special_operand < 0 && special_op == 'sqrt'){
      this.clear_all();
      this.current_result = 'E';
      this.clear = true;
    }
    this.clear = true;
  }

  equal_pressed(){
    if(this.lock_equal1 || this.lock_equal2) return;
    this.operand2 = parseFloat(this.current_result);
    this.http.post<string>(`http://localhost:8080/operate/${this.op}/${this.operand1}/${this.operand2}`, JSON, httpOptions)
    .subscribe(result => {
      this.current_result = result.toString();
      if(this.current_result.length > 12){
        this.current_result = this.current_result.substring(0, 12);
      }
      if(parseFloat(this.current_result) > 99999999999){
        this.clear_all();
        this.current_result = 'E';
      }
      this.operand1 = parseFloat(result.toString());
      this.operand2 = 0;
    });
    if(this.operand2 == 0 && this.op == '/'){
      this.clear_all();
      this.current_result = 'E';
    }
    this.clear = true;
    this.op = '';
    this.lock_equal1 = true;
    this.lock_equal2 = true;
    this.dot = true;
  }

}
