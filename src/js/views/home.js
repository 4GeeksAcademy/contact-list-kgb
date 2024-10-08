import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/contacts";

export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="container">
			<div className="d-flex justify-content-end">
				<Link to="add-contact">
					<button className="btn btn-success my-3">Add new contact.</button>
				</Link>
			</div>
				<div id="contacts" className="panel-collapse collapse show mb-5" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts && store.contacts.length > 0 ? (
							store.contacts.map((contact, index) => (
								<ContactCard key={index} contact={contact} />
							))
						) : (
							<li className="list-group-item">No contacts available.</li>
						)}
					</ul>
				</div>
		</div>
	);
};
