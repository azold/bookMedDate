import {createAction} from "redux-act";
import { fakeAvailableServices } from "../../fakeData/fakeAvailableServices";
import IAvailableServices from "../../contracts/AvailableServices";
import IDatetimeSlot from "../../contracts/DatetimeSlot";
import * as ActionTypes from "../../constants/actionTypes";

const receiveServices = createAction("Receive available services");

const serviceReservationCancelled = createAction("Service reservation cancelled");

const serviceClicked = createAction("Service clicked", (selectedServiceId: number) => ({
    selectedServiceId
}));

const serviceReservationSaved = createAction("Service clicked", (selectedServiceId: number, timeSlot: IDatetimeSlot ) => ({
    selectedServiceId,
    timeSlot
}));

export {
    receiveServices,
    serviceReservationCancelled,
    serviceClicked,
    serviceReservationSaved
}
