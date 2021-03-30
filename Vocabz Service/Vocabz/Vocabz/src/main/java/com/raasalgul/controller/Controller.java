package com.raasalgul.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raasalgul.bean.CardStatus;
import com.raasalgul.bean.Deck;
import com.raasalgul.bean.DeckCardsInfo;
import com.raasalgul.bean.ERole;
import com.raasalgul.dto.DailyStats;
import com.raasalgul.dto.Role;
import com.raasalgul.dto.Users;
import com.raasalgul.exception.GenericException;
import com.raasalgul.payload.request.LoginRequest;
import com.raasalgul.payload.request.SignupRequest;
import com.raasalgul.payload.response.JwtResponse;
import com.raasalgul.payload.response.MessageResponse;
import com.raasalgul.repository.RoleRepository;
import com.raasalgul.repository.UsersRepository;
import com.raasalgul.security.jwt.JwtUtils;
import com.raasalgul.security.services.UserDetailsImpl;
import com.raasalgul.service.CardService;
//import com.raasalgul.service.CustomUserDetailService;
import com.raasalgul.service.DeckService;
import com.raasalgul.service.UpdateService;

@CrossOrigin
@RestController
@RequestMapping("/vocabz-home")
public class Controller {
	@Autowired
	DeckService deckService;
	@Autowired
	CardService cardService;
	@Autowired
	UpdateService updateService;
//	@Autowired
//	CustomUserDetailService customUserDetailService;
	@RequestMapping("/decks/get-all")
	public Set<Deck> getAllDecks() throws GenericException
	{
		return deckService.getAllDecks();
	}
	@GetMapping("/decks/card/{deck}")
	public DeckCardsInfo getDailyUpdateTasks(@PathVariable String deck) throws GenericException
	{
		return deckService.getCardsOfDeck(deck);
	}
	@PostMapping("/card/status-update")
	public CardStatus cardStatusUpdate(@RequestBody CardStatus cardStatus) throws GenericException
	{
		return cardService.cardStatusUpdate(cardStatus);
	}
	@DeleteMapping("/card/delete")
	public DailyStats cardDelete(@RequestBody DeckCardsInfo deck) throws GenericException
	{
		return cardService.cardDelete(deck);
	}
	@DeleteMapping("deck/delete/{deck}")
	public String deckDelete(@PathVariable String deck) throws GenericException
	{
		return deckService.deckDelete(deck);
	}
	@PostMapping("update/add-edit")
	public DeckCardsInfo updateDeckCardInfo(@RequestBody DeckCardsInfo deckCardInfo) throws GenericException
	{
		return updateService.updateDeckCardInfo(deckCardInfo);
	}
//	@PostMapping("/sign-up")
//	public String securedHello(@RequestBody Users users) throws GenericException
//	{
//		return customUserDetailService.signUpService(users);
//	}
	
}