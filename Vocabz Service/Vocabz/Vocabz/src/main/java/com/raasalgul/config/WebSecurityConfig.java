package com.raasalgul.config;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//import com.raasalgul.repository.DailyStatsRepository;
//import com.raasalgul.repository.UsersRepository;
//import com.raasalgul.service.CustomUserDetailService;
//
//@Configuration
//@EnableWebSecurity
//@EnableJpaRepositories(basePackageClasses= {UsersRepository.class,DailyStatsRepository.class})
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
//	
//	@Autowired
//	private CustomUserDetailService userDetailsService;
//	
//@Override
//protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//	auth.userDetailsService(userDetailsService)
//	.passwordEncoder(getPasswordEncoder());
//}
//
//@Override
//protected void configure(HttpSecurity http) throws Exception {
//	http.csrf().disable();
//	http.authorizeRequests()
//	.antMatchers("/vocabz-home/sign-up").permitAll()
//	.antMatchers("/vocabz-home/**","/","index","/css/*,/js/*").authenticated()
//	.anyRequest().permitAll()
//	.and().formLogin().permitAll()
//	.defaultSuccessUrl("/vocabz-home/decks/get-all",true)
//	.and()
//	.logout()
//	.logoutUrl("/logout")
//	.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
//	.clearAuthentication(true)
//	.invalidateHttpSession(true)
//	.deleteCookies("JSESSIONID");
////	.logoutSuccessUrl("/login");
//}
//
//private PasswordEncoder getPasswordEncoder() {
//	return new PasswordEncoder() {
//	@Override
//	public String encode(CharSequence charSequence) {
//		return charSequence.toString();
//	}
//	@Override
//	public boolean matches(CharSequence charSequence,String s) {
//		return true;
//	}
//	};
//}
//}


//-----------------------------------------------------------------------------

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

import com.raasalgul.security.jwt.AuthEntryPointJwt;
import com.raasalgul.security.jwt.AuthTokenFilter;
import com.raasalgul.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// securedEnabled = true,
		// jsr250Enabled = true,
		prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

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
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
			.antMatchers("/vocabz-home**").permitAll()
			.anyRequest().authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}