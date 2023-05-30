package com.project.examportalbackend;

import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.repository.RoleRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class ExamPortalBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalBackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initializer(RoleRepository roleRepository) {
		return args -> roleRepository.saveAll(Arrays.asList(
				Role.builder().roleName("USER").roleDescription("Default Role provided to each user").build(),
				Role.builder().roleName("ADMIN").roleDescription("Superuser, who has access for all functionality").build()));
	}
}
