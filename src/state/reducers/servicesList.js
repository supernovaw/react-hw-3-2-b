const actionBase = "services-list ";

const statusIdle = error => ({ status: { loading: false, error } });
const statusWait = (___) => ({ status: { loading: true, error: null } });

const defaultState = {
  ...statusIdle(),
  list: []
};

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(actionBase)) return state;
  const subAction = type.substring(actionBase.length);

  switch (subAction) {
/**/ case "request-initiate": return { ...state, ...statusWait() };
/**/   case "request-failed": return { ...state, ...statusIdle(payload.error) };
/**/case "request-succeeded": return { ...state, ...statusIdle(), list: payload.list };
  }

  console.error("unrecognized " + subAction + "subaction '" + subAction + "'!");
  return state;
};