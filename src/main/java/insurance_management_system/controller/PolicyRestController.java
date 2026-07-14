package insurance_management_system.controller;

import insurance_management_system.entity.Policy;
import insurance_management_system.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyRestController {

    private final PolicyService policyService;

    public PolicyRestController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @PostMapping
    public Policy savePolicy(@RequestBody Policy policy) {
        return policyService.savePolicy(policy);
    }
    
    @GetMapping("/{id}")
    public Policy getPolicy(@PathVariable Long id){

        return policyService.getPolicyById(id);

    }

    @PutMapping("/{id}")
    public Policy updatePolicy(@PathVariable Long id,
                               @RequestBody Policy policy) {
        return policyService.updatePolicy(id, policy);
    }

    @DeleteMapping("/{id}")
    public void deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
    }
}