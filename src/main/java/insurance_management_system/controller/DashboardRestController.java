package insurance_management_system.controller;

import insurance_management_system.dto.DashboardResponse;
import insurance_management_system.repository.CustomerRepository;
import insurance_management_system.repository.PolicyRepository;
import insurance_management_system.repository.LeadRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardRestController {

    private final CustomerRepository customerRepository;
    private final PolicyRepository policyRepository;
    private final LeadRepository leadRepository;

    public DashboardRestController(CustomerRepository customerRepository,
                                   PolicyRepository policyRepository,
                                   LeadRepository leadRepository) {

        this.customerRepository = customerRepository;
        this.policyRepository = policyRepository;
        this.leadRepository = leadRepository;
    }

    @GetMapping
    public DashboardResponse getDashboardData() {

        return new DashboardResponse(

                customerRepository.count(),

                policyRepository.count(),

                leadRepository.count()

        );

    }

}