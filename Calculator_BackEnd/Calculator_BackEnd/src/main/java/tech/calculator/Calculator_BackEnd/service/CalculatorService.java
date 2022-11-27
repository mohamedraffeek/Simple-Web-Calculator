package tech.calculator.Calculator_BackEnd.service;

import org.springframework.stereotype.Service;
import java.lang.Math;
import java.io.*;

@Service
public class CalculatorService {
    public double add(double num1, double num2) { return num1 + num2; }
    public double sub(double num1, double num2) { return num1 - num2; }
    public double mul(double num1, double num2) { return num1 * num2; }
    public double div(double num1, double num2) { return num1 / num2; }


    public double percent(double num) { return num / 100; }
    public double inverse(double num) { return 1 / num; }
    public double square(double num) { return num * num; }
    public double sqrt(double num) { return Math.sqrt(num); }
}
