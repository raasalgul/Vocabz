//package com.raasalgul.service;
//
//import java.util.Optional;
//
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.raasalgul.bean.CustomUserDetails;
//import com.raasalgul.dto.Users;
//import com.raasalgul.exception.GenericException;
//import com.raasalgul.repository.UsersRepository;
//
//@Service
//public class CustomUserDetailService implements UserDetailsService{
//
//	@Autowired
//	private UsersRepository userRepository;
//	@Autowired
//	private SequenceGeneratorService sequenceGeneratorService;
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		Optional<Users> optionalUsers=userRepository.findByUserName(username);
//		try {
//			optionalUsers
//			.orElseThrow(()->new GenericException("CustomUserDetailService.class", "Username not found"));
//		} catch (GenericException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return optionalUsers.map(CustomUserDetails::new).get();
//	}
//    public String signUpService(Users users) throws GenericException
//    {
//    	JSONObject json=new JSONObject();
//    	try {
//    		users.setUserId(String.valueOf(sequenceGeneratorService.generateSequence(users.SEQUENCE_NAME)));
//    		userRepository.save(users);
//    		System.out.println(users);
//    		json.accumulate("status", "sucess");
//    		return json.toString();
//    	}catch(Exception e) {
//    		throw new GenericException(e+"", e.getMessage());
//    	}
//    }
//}
