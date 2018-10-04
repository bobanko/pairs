import { TIMER_STOP, TIMER_TICK, TIMER_START } from "../actions";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case TIMER_START:
    case TIMER_TICK:
      return action.value;

    case TIMER_STOP:
    default:
      return state;
  }
};

export default reducer;
