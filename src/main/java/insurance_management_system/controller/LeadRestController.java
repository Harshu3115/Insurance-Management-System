package insurance_management_system.controller;

import insurance_management_system.entity.Lead;
import insurance_management_system.service.LeadService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
public class LeadRestController {

    private final LeadService leadService;

    public LeadRestController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @GetMapping("/{id}")
    public Lead getLead(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }

    @PostMapping
    public Lead saveLead(@RequestBody Lead lead) {
        return leadService.saveLead(lead);
    }

    @PutMapping("/{id}")
    public Lead updateLead(@PathVariable Long id,
                           @RequestBody Lead lead) {
        return leadService.updateLead(id, lead);
    }

    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
    }
}