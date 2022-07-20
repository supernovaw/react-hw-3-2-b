import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesPage.css";
import useStateAccess from "./state/useStateAccess";

const ServicesPage = () => {
  const { servicesList, requestServicesList } = useStateAccess();
  const list = servicesList.list;
  const navigate = useNavigate();
  useEffect(() => { if (!list || !list.length) requestServicesList() }, []);

  const displayLoading = servicesList.status.loading;
  const displayError = !!servicesList.status.error;
  const displayList = !displayLoading && !displayError;

  const renderError = () => <div>
    Error ({servicesList.status.error.message})
    <button onClick={() => requestServicesList()}>Retry</button>
  </div>

  const renderList = () => <div className="services-list">
    {list.map(srv => <div key={srv.id} onClick={() => navigate("/" + +srv.id + "/details")}>
      {srv.name + " (₴" + srv.price + ")"}
    </div>)}
  </div>

  return (
    <div className="ServicesPage">
      {displayLoading && <div>Loading…</div>}
      {displayError && renderError()}
      {displayList && renderList()}
    </div>
  );
};

export default ServicesPage;
