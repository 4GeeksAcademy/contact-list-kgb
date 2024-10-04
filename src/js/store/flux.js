const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            selectedContact: null,
            agenda: null, // Ensure this is set appropriately later
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
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            setAgenda: (agenda) => {
                setStore({ agenda });
            },
            getAgenda: async () => {
                const { agenda } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return;  
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch agenda contacts.");
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (e) {
                    console.error("Error fetching agenda contacts:", e);
                }
            },
            addContact: async (contact) => {
                const { agenda, contacts } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return;  
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    if (!response.ok) {
                        throw new Error("Failed to add contact.");
                    }
                    const data = await response.json();
                    setStore({ contacts: [...contacts, data] });
                } catch (e) {
                    console.error("Error adding contact:", e);
                }
            },
            deleteContact: async (id) => {
                const { agenda, contacts } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return;  
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete contact.");
                    }
                    const newContacts = contacts.filter(contact => contact.id !== id);
                    setStore({ contacts: newContacts });
                } catch (e) {
                    console.error("Error deleting contact:", e);
                }
            },
            editContact: async (id, editContact) => {
                const { agenda, contacts } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return;  
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(editContact)
                    });
                    if (!response.ok) {
                        throw new Error("Failed to edit contact.");
                    }
                    const data = await response.json();
                    const editContacts = contacts.map(contact =>
                        contact.id === id ? data : contact
                    );
                    setStore({ contacts: editContacts });
                } catch (e) {
                    console.error("Error editing contact:", e);
                }
            },
            getContact: async (id) => {
                const { agenda } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return; 
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch contact.");
                    }
                    const data = await response.json();
                    setStore({ selectedContact: data });
                } catch (e) {
                    console.error("Error fetching contact:", e);
                }
            },
            getContacts: async () => {
                const { agenda } = getStore();
                if (!agenda) {
                    console.error("Agenda is not defined.");
                    return; 
                }

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch contacts.");
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (e) {
                    console.error("Error fetching contacts:", e);
                }
            },
            setDemo: (demo) => {
                setStore({ demo });
            }
        }
    };
};

export default getState;
