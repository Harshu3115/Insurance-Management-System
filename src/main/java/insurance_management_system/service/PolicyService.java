package insurance_management_system.service;

import insurance_management_system.entity.Policy;
import java.util.List;

public interface PolicyService {

    Policy savePolicy(Policy policy);

    List<Policy> getAllPolicies();

    Policy getPolicyById(Long id);

    Policy updatePolicy(Long id, Policy policy);

    void deletePolicy(Long id);
}