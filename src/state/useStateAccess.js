import { useDispatch, useSelector } from "react-redux";
import servicesList from "./actionCreators/servicesList";
import servicesDetails from "./actionCreators/servicesDetails";

export default () => {
  const dispatch = useDispatch();
  return {
    servicesList: useSelector(s => s.servicesList),
    servicesDetails: useSelector(s => s.servicesDetails),
    requestServicesList: () => dispatch(servicesList.requestInitiate()),
    loadServiceDetails: id => dispatch(servicesDetails.loadInitiate(id))
  };
};