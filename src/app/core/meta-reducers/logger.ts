export const ACTION_LOGGER = (reducer: any) => {
	return function(state: any, action: any) {
		console.log(`Action: ${action.type}`, action);
		let nextState = reducer(state, action);
		console.log('State:', nextState);
		return nextState;
	};
};