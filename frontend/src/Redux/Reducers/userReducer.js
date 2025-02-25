import * as actions from "../ActionTypes";

let defaultState = [];

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      return { ...state, data: action.payload };

    // case actions.GET_INTRO_MESSAGES:
    //   return { ...state, introMessage: action.payload };

    // case actions.GET_OPTIONS_MESSAGES:
    //   return { ...state, options: action.payload };

    // case actions.GET_OPTIONS:
    //   return { ...state, subOptions: action.payload };

    // case actions.UPDATE_SUB_OPTION:
    //   return { ...state, updatedOptions: action.payload };
      
    //   case actions.UPDATE_SUB_OPTIONS:
    //     return { ...state, updateSubOption: action.payload };
        
    //     case actions.UPDATE_SOLUTION:
    //       console.log('action.payload', action.payload)
    //       return { ...state, solution: action.payload };
          
            //   case actions.CLEAR_STATE:
            //     return defaultState;

    default:
      return state;
  }
};

export default userReducer;