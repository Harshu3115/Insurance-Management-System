package insurance_management_system.service;

import insurance_management_system.dto.LoginRequest;
import insurance_management_system.dto.LoginResponse;

public interface UserService {

    LoginResponse login(LoginRequest request);

}