package com.raasalgul.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.ObjectId;
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
@Document(collection="DailyStats")
public class DailyStats{
	public ObjectId _id;
	public String userId;
	public String deck;
	public String card;
	public String meaning;
	public List<Status> status;
	public LocalDateTime addedLogon;
	public LocalDate addedDate;
	}
