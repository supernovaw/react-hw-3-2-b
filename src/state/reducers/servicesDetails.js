const actionBase = "services-details ";

const statusIdle = error => ({ status: { loading: false, error } });
const statusWait = (___) => ({ status: { loading: true, error: null } });

// each state entry has its own status
export default (state = [], { type, payload }) => {
  if (!type.startsWith(actionBase)) return state;
  if (payload.id == null) { console.error("can't proceed in services-details without an id in payload!", { payload }); return state; }
  const subAction = type.substring(actionBase.length);

  let item = { id: payload.id };

  if (subAction === "load-succeeded" && (payload.id !== payload.item.id))
    console.error("fetched id " + payload.id + " but received id: " + payload.item.id + "!", payload.item);

  switch (subAction) {
/**/ case "load-initiate": item = { id: payload.id, ...statusWait() }; break;
/**/   case "load-failed": item = { id: payload.id, ...statusIdle(payload.error) }; break;
/**/case "load-succeeded": item = { id: payload.id, ...statusIdle(), fetched: payload.item }; break;

    default: console.error("unrecognized " + subAction + "subaction '" + subAction + "'!"); return state;
  }
  const filteredState = state.filter(obj => obj.id !== payload.id);
  return [...filteredState, item]
};