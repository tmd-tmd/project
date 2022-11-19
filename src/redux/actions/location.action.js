import { createAction } from "@reduxjs/toolkit";

import { REQUEST, LOCATION_ACTION } from "../constants";

export const getCityListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_CITY_LIST)
);
export const getDistrictListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)
);
export const getWardListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_WARD_LIST)
);
