import React, { useContext } from "react"; // #1
import { Context } from "../store/appContext"; // #2
import { Link } from "react-router-dom";
import iconImage from "../../img/icon-image.png";

export const ContactCard = ({ contact }) => {
	const { store, actions } = useContext(Context); // #3

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			actions.deleteContact(contact.id);
		}
	};

	return (
		<li className="list-group-item">
			<div className="row w-100 align-items-center">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img
						src={iconImage}
						alt="user profile icon"
						width="110"
						className="rounded-circle mx-auto d-block img-fluid"
					/>
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className="float-end">
						<Link to={`/edit-contact/${contact.id}`}>
							<button className="btn">
								<i className="fas fa-pencil-alt mr-3"></i>
							</button>
						</Link>
						<button className="btn" id="deleteButton" onClick={handleDelete}>
							<i className="fas fa-trash-alt"></i>
						</button>
					</div>

					<div className="text-start">
						<label className="name lead fw-bold">{contact.name}</label>
						<br />
						<i className="fas fa-map-marker-alt text-muted me-3"></i>
						<span className="text-muted">{contact.address}</span>
						<br />
						<span className="fa fa-phone fa-fw text-muted me-2" data-toggle="tooltip" title=""></span>
						<span className="text-muted small">{contact.phone}</span>
						<br />
						<span className="fa fa-envelope fa-fw text-muted me-2" data-toggle="tooltip" title=""></span>
						<span className="text-muted small text-truncate">{contact.email}</span>
					</div>
				</div>
			</div>
		</li>
	);
};
