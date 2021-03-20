package com.raasalgul.exception;

public class TopicNotFound extends Exception{
public String error;
public String errorMsg;
public TopicNotFound()
{
	
}
public TopicNotFound(String error, String errorMsg) {
	super();
	this.error = error;
	this.errorMsg = errorMsg;
}
/**
 * @return the error
 */
public String getError() {
	return error;
}
/**
 * @param error the error to set
 */
public void setError(String error) {
	this.error = error;
}
/**
 * @return the errorMsg
 */
public String getErrorMsg() {
	return errorMsg;
}
/**
 * @param errorMsg the errorMsg to set
 */
public void setErrorMsg(String errorMsg) {
	this.errorMsg = errorMsg;
}

}
