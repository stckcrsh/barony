export const ACTION_LOGGER = (reducer: any) => {
	return function(state: any, action: any) {
		let start = new Date();
		let nextState = reducer(state, action);
		let end = new Date();
		let time = end.getTime() - start.getTime();
		console.log({
			[action.type]: action.payload,
			'prevState': state,
			'nextState': nextState,
			'started': start,
			'ended': end,
			'execution': time / 1000
		});
		return nextState;
	};
};