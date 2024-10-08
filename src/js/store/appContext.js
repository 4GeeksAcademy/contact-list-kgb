import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Initialize the context
export const Context = React.createContext(null);

// This function injects the global store to any component
const injectContext = (PassedComponent) => {
	const StoreWrapper = (props) => {
		// Initialize state with store and actions from flux.js
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: (updatedStore) =>
					setState({
						store: { ...state.store, ...updatedStore },  // Correct way to update the store without mutating it
						actions: { ...state.actions }
					})
			})
		);

		// useEffect to load the default agenda and perform other initial tasks
		useEffect(() => {
			state.actions.getAgenda();
		}, [])	
		// Provide the state (store and actions) to all children components via Context
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
