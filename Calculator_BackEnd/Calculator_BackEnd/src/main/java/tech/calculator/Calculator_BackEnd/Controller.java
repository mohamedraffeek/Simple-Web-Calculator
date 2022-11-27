package tech.calculator.Calculator_BackEnd;

import org.springframework.web.bind.annotation.*;
import tech.calculator.Calculator_BackEnd.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/operate")
public class Controller {

    CalculatorService service = new CalculatorService();

    @PostMapping("/+/{num1}/{num2}")
    public String add(@PathVariable("num1") double num1, @PathVariable("num2") double num2){
        double result = service.add(num1, num2);
        return result + "";
    }
    @PostMapping("/-/{num1}/{num2}")
    public String sub(@PathVariable("num1") double num1, @PathVariable("num2") double num2){
        double result = service.sub(num1, num2);
        return result + "";
    }
    @PostMapping("/*/{num1}/{num2}")
    public String mul(@PathVariable("num1") double num1, @PathVariable("num2") double num2){
        double result = service.mul(num1, num2);
        return result + "";
    }
    @PostMapping("///{num1}/{num2}")
    public String div(@PathVariable("num1") double num1, @PathVariable("num2") double num2){
        if(num2 == 0) return "Can't divide by zero";
        double result = service.div(num1, num2);
        return result + "";
    }
    @PostMapping("/percent/{num}")
    public String percent(@PathVariable("num") double num){
        double result = service.percent(num);
        return result + "";
    }
    @PostMapping("/inverse/{num}")
    public String inverse(@PathVariable("num") double num){
        if(num == 0) return "Can't divide by zero";
        double result = service.inverse(num);
        return result + "";
    }
    @PostMapping("/square/{num}")
    public String square(@PathVariable("num") double num){
        double result = service.square(num);
        return result + "";
    }
    @PostMapping("/sqrt/{num}")
    public String sqrt(@PathVariable("num") double num){
        if(num < 0) return "Negative root detected";
        double result = service.sqrt(num);
        return result + "";
    }
}
