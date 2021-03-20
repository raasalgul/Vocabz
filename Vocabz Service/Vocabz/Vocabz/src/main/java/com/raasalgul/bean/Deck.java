package com.raasalgul.bean;

import java.time.LocalDateTime;

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
public class Deck {
public String deckName;
public LocalDateTime addedDate;
@Override
public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((deckName == null) ? 0 : deckName.hashCode());
	return result;
}
@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	Deck other = (Deck) obj;
	if (deckName == null) {
		if (other.deckName != null)
			return false;
	} else if (!deckName.equals(other.deckName))
		return false;
	return true;
}


}
