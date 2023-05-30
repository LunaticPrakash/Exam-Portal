package com.project.examportalbackend.configurations;

import com.project.examportalbackend.services.implementation.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors();
        http.csrf().disable()
                .authorizeRequests()

                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/login").permitAll()

                .antMatchers(HttpMethod.POST, "/api/category/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/category/**").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/category/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/category/**").hasAuthority("ADMIN")

                .antMatchers(HttpMethod.POST, "/api/quiz/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/quiz/**").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/quiz/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/quiz/**").hasAuthority("ADMIN")

                .antMatchers(HttpMethod.POST, "/api/question/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/question/**").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/question/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/question/**").hasAuthority("ADMIN")

                .antMatchers(HttpMethod.POST, "/api/quizResult/**").hasAuthority("USER")
                .antMatchers(HttpMethod.GET, "/api/quizResult/all/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/quizResult/**").hasAnyAuthority("USER", "ADMIN")

                .anyRequest().denyAll()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        ;

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
    }
}
