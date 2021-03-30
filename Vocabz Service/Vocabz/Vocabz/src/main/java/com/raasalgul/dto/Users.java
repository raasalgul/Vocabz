package com.raasalgul.dto;


import java.util.HashSet;
import java.util.Set;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="Users")
public class Users {
@Transient
public static final String SEQUENCE_NAME = "users_sequence";
@Id
public String userId;
public String email;
public String password;
public String userName;
public String firstName;
public String lastName;
public boolean active;
@DBRef
private Set<Role> roles = new HashSet<>();

public Users(String email, String password,String username,String firstName, String lastName, boolean active) {
    this.userName = username;
    this.email = email;
    this.password = password;
    this.firstName=firstName;
    this.lastName=lastName;
    this.active=active;
  }
}
