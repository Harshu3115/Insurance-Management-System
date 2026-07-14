package insurance_management_system.service.impl;

import insurance_management_system.entity.Policy;
import insurance_management_system.repository.PolicyRepository;
import insurance_management_system.service.PolicyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository repository;

    public PolicyServiceImpl(PolicyRepository repository) {
        this.repository = repository;
    }

    @Override
    public Policy savePolicy(Policy policy) {
        return repository.save(policy);
    }

    @Override
    public List<Policy> getAllPolicies() {
        return repository.findAll();
    }

    @Override
    public Policy getPolicyById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Policy updatePolicy(Long id, Policy policy) {
        policy.setPolicyId(id);
        return repository.save(policy);
    }

    @Override
    public void deletePolicy(Long id) {
        repository.deleteById(id);
    }
}