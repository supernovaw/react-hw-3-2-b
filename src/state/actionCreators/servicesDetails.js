const actionBase = "services-details ";

const loadInitiate = id => ({ type: actionBase + "load-initiate", payload: { id } });
const loadFailed = (id, error) => ({ type: actionBase + "load-failed", payload: { id, error } });
const loadSucceeded = (id, item) => ({ type: actionBase + "load-succeeded", payload: { id, item } });

export default {
  loadInitiate,
  loadFailed,
  loadSucceeded
};