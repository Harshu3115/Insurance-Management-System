package insurance_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import insurance_management_system.entity.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}