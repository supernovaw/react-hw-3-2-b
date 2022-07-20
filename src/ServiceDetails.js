import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ServiceDetails.css";
import useStateAccess from "./state/useStateAccess";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const id = +useParams().id;
  const { servicesDetails, loadServiceDetails } = useStateAccess();
  useEffect(() => { loadServiceDetails(id) }, []);
  const detailsEntry = servicesDetails.find(obj => obj.id === id);
  if (!detailsEntry) return; // this is the render before an uninitialised entry appears (with fetched: undefined & loading: true)

  const fetched = detailsEntry.fetched;
  const status = detailsEntry.status;
  const displayLoading = status.loading;
  const displayError = !!status.error;
  const displayItem = !displayLoading && !displayError;

  const renderError = () => <div>
    Error ({status.error.message})
    <button onClick={() => loadServiceDetails(id)}>Retry</button>
  </div>

  const renderItem = () => <div>
    <h3>{fetched.name}</h3>
    <div>{"₴" + fetched.price}</div>
    <div>{fetched.content}</div>
  </div>

  return (
    <div className="ServiceDetails">
      <button className="go-back" onClick={e => navigate("/")}>Go Back</button>
      {displayLoading && <div>Loading…</div>}
      {displayError && renderError()}
      {displayItem && renderItem()}
    </div>
  );
};

export default ServiceDetails;
