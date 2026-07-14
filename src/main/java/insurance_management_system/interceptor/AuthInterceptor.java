package insurance_management_system.interceptor;

import insurance_management_system.entity.User;
import insurance_management_system.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final UserRepository userRepository;

    public AuthInterceptor(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        String token = request.getHeader("X-Auth-Token");

        if (token == null || token.isEmpty()) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "Missing X-Auth-Token");
            return false;
        }

        Optional<User> user = userRepository.findByAuthToken(token);

        if (user.isEmpty()) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "Invalid Token");
            return false;
        }

        if ("DELETE".equalsIgnoreCase(request.getMethod())
                && !"ADMIN".equalsIgnoreCase(user.get().getRole())) {

            response.sendError(HttpServletResponse.SC_FORBIDDEN,
                    "Only ADMIN can delete");
            return false;
        }

        return true;
    }
}