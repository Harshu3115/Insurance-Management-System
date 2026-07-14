package insurance_management_system.service.impl;

import insurance_management_system.entity.Lead;
import insurance_management_system.repository.LeadRepository;
import insurance_management_system.service.LeadService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository repository;

    public LeadServiceImpl(LeadRepository repository) {
        this.repository = repository;
    }

    @Override
    public Lead saveLead(Lead lead) {
        return repository.save(lead);
    }

    @Override
    public List<Lead> getAllLeads() {
        return repository.findAll();
    }

    @Override
    public Lead getLeadById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Lead updateLead(Long id, Lead lead) {
        lead.setLeadId(id);
        return repository.save(lead);
    }

    @Override
    public void deleteLead(Long id) {
        repository.deleteById(id);
    }
}