import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, switchMap, catchError, retry } from "rxjs/operators";
import servicesList from "./actionCreators/servicesList";
import servicesDetails from "./actionCreators/servicesDetails";

export const servicesListEpic = action$ => action$.pipe(
  ofType("services-list request-initiate"),
  switchMap(
    () => ajax.getJSON(process.env.REACT_APP_BACKEND_URL).pipe(
      retry(1),
      map(json => servicesList.requestSucceeded(json)),
      catchError(e => of(servicesList.requestFailed(e)))
    )
  )
);

export const servicesDetailsEpic = action$ => action$.pipe(
  ofType("services-details load-initiate"),
  map(act => act.payload.id),
  switchMap(
    id => ajax.getJSON(process.env.REACT_APP_BACKEND_URL + "/" + +id).pipe(
      retry(1),
      map(json => servicesDetails.loadSucceeded(id, json)),
      catchError(e => of(servicesDetails.loadFailed(id, e)))
    )
  )
);