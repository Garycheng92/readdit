import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, GET_TWEETS } from "../actions/types";

const initialState = {
  //Make a request and store all profile data here
  profile: null,
  //Profile Listing page
  profiles: [],
  tweets: [],
  loading: true,
  error: {}

}

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
      case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        tweets: [],
        loading: false
      }
      case GET_TWEETS:
      return {
        ...state,
        tweets: payload,
        loading: false
      }
        default:
          return state;
  }
}