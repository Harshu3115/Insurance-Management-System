package insurance_management_system.controller;

import insurance_management_system.dto.LoginRequest;
import insurance_management_system.dto.LoginResponse;
import insurance_management_system.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return userService.login(request);

    }

}