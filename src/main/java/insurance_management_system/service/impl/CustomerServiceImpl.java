package insurance_management_system.service.impl;

import insurance_management_system.entity.Customer;
import insurance_management_system.repository.CustomerRepository;
import insurance_management_system.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return repository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        customer.setCustomerId(id);
        return repository.save(customer);
    }

    @Override
    public void deleteCustomer(Long id) {
        repository.deleteById(id);
    }
}