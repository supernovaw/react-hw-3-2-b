const actionBase = "services-list ";

const requestInitiate = () => ({ type: actionBase + "request-initiate" });
const requestFailed = error => ({ type: actionBase + "request-failed", payload: { error } });
const requestSucceeded = list => ({ type: actionBase + "request-succeeded", payload: { list } });

export default {
  requestInitiate,
  requestFailed,
  requestSucceeded
};