export const createStateTransition = onNextState =>
  void onNextState() || (nextState => void onNextState(nextState) || nextState);
