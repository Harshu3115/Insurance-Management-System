package insurance_management_system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import insurance_management_system.entity.Customer;
import insurance_management_system.entity.Policy;

@Controller
public class PageController {

    @GetMapping("/")
    public String login() {
        return "login";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/customers")
    public String customers() {
        return "customers";
    }
    
    @GetMapping("/customer-form")
    public String customerForm(Model model) {

        model.addAttribute("customer", new Customer());

        return "customer-form";
    }

    @GetMapping("/policies")
    public String policies() {
        return "policies";
    }
    
    @GetMapping("/lead-form")
    public String leadForm() {

        return "lead-form";

    }
    @GetMapping("/policy-form")
    public String policyForm(Model model){

        model.addAttribute("policy", new Policy());

        return "policy-form";

    }
    @GetMapping("/leads")
    public String leads() {
        return "leads";
    }
    
    @GetMapping("/reports")
    public String reports() {

        return "reports";   // report.html

    }
}