package insurance_management_system.dto;

public class DashboardResponse {

    private long customerCount;
    private long policyCount;
    private long leadCount;

    public DashboardResponse() {
    }

    public DashboardResponse(long customerCount, long policyCount, long leadCount) {
        this.customerCount = customerCount;
        this.policyCount = policyCount;
        this.leadCount = leadCount;
    }

    public long getCustomerCount() {
        return customerCount;
    }

    public void setCustomerCount(long customerCount) {
        this.customerCount = customerCount;
    }

    public long getPolicyCount() {
        return policyCount;
    }

    public void setPolicyCount(long policyCount) {
        this.policyCount = policyCount;
    }

    public long getLeadCount() {
        return leadCount;
    }

    public void setLeadCount(long leadCount) {
        this.leadCount = leadCount;
    }
}