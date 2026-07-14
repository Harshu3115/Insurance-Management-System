package insurance_management_system.service;

import insurance_management_system.entity.Lead;
import java.util.List;

public interface LeadService {

    Lead saveLead(Lead lead);

    List<Lead> getAllLeads();

    Lead getLeadById(Long id);

    Lead updateLead(Long id, Lead lead);

    void deleteLead(Long id);
}