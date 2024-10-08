const getState = ({ getStore, getActions, setStore }) => {
    const user = "patient";
    return {
        store: {
            contacts: [],
            selectedContact: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            // Sets the agenda and ensures that the store is updated with the new agenda value.
            addAgenda: async() => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json",
                        body: JSON.stringify({})    
    
                        }
                    }) 
                    if (!response.ok) throw {status: response.status, statusText: response.statustext}
                  console.log("User added successfully");
                  getActions().getAgenda();
                } catch (error) {
                    console.error("Adding user fail.", error);
                }
                
            },

            // Fetch agenda contacts only if agenda is defined
            getAgenda: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`);
                    if (!response.ok) throw {status: response.status, statusText: response.statustext}
                    console.log("Response from API", response)
                    const data = await response.json(); 
                    console.log("response.jsonified", data)
                    setStore({ contacts: data.contacts }); // Ensure correct path to contacts
                } catch (error) {
                    console.error("Error fetching agenda contacts:", error);
                    if (error.status === 404) getActions().addAgenda()
                }
            },

            // Adds a contact to the agenda. Ensure the agenda is defined before making API calls.
            addContact: async (contact) => {
                const store = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });

                    if (response.status === 422) {
                        const errorData = await response.json();
                        console.error("Validation Error: ", errorData.detail);
                        return;
                    }

                    if (!response.ok) {
                        throw new Error("Failed to add contact.");
                    }
                    const data = await response.json();
                    getActions().getAgenda();
                } catch (e) {
                    console.error("Error adding contact:", e);
                }
            },

            // Deletes a contact by id. Ensures agenda is defined before proceeding.
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete contact.");
                    }
                    getActions().getAgenda();
                } catch (e) {
                    console.error("Error deleting contact:", e);
                }
            },

            // Edits a contact by id. Ensures agenda is defined before making the API call.
            editContact: async (id, editContact) => {
                const { agenda, contacts } = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(editContact)
                    });
                    if (response.status === 422) {
                        const errorData = await response.json();
                        console.error("Validation Error: ", errorData.detail);
                        return;
                    }

                    if (!response.ok) {
                        throw new Error("Failed to edit contact.");
                    }

                    const data = await response.json();
                    getActions().getAgenda();
                } catch (e) {
                    console.error("Error editing contact:", e);
                }
            },  

            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            // Sets a demo object in the store
            setDemo: (demo) => {
                setStore({ demo });
            }
        }
    };
};

export default getState;
