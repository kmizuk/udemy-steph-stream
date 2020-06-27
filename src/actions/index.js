import streams from "../apis/streams";
import { SIGN_IN, SIGN_OUT } from "./types";
import { formValueSelector, formValues } from "redux-form";

export const signIn = (userId) => {
  //action creater
  return {
    //action
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispach) => {
  const response = await streams.post("/streams", formValues);
};
