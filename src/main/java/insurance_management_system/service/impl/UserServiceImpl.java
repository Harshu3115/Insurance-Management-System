package insurance_management_system.service.impl;

import insurance_management_system.dto.LoginRequest;
import insurance_management_system.dto.LoginResponse;
import insurance_management_system.entity.User;
import insurance_management_system.repository.UserRepository;
import insurance_management_system.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return new LoginResponse("Invalid Username", null, null);
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse("Invalid Password", null, null);
        }

        String token = UUID.randomUUID().toString();

        user.setAuthToken(token);

        userRepository.save(user);

        return new LoginResponse(
                "Login Successful",
                token,
                user.getRole()
        );
    }
}