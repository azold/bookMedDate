import produce from "immer";
import {createReducer} from "redux-act";

import IAvailableServices from "../../contracts/AvailableServices";
import { fakeAvailableServices } from "../../fakeData/fakeAvailableServices";
import IDatetimeSlot from "../../contracts/DatetimeSlot";
import { resolve } from "dns";
import * as ActionTypes from "../../constants/actionTypes";
import { receiveServices, serviceReservationCancelled, serviceClicked, serviceReservationSaved } from "../action/availableServicesAction";

export interface IAvailableServiceState{
    availableServices: IAvailableServices[];
    selectedServiceId: number | undefined;
    selectedTimeSlot: IDatetimeSlot | undefined;
    isModalOpened: boolean;
}

const initialState: IAvailableServiceState = {
    availableServices: [],
    selectedServiceId: undefined,
    selectedTimeSlot: undefined,
    isModalOpened: false
};

let fakeData: IAvailableServices[] = [];
const fakeDataPromise = new fakeAvailableServices().generateData().then((res: IAvailableServices[]) => {fakeData = res});
const availableServices = fakeData;

const availableTableReducer = createReducer<IAvailableServiceState>({}, initialState);

availableTableReducer.on(receiveServices, (state) => produce(state, (draft) => {
    const availableServices = fakeData;
    draft.availableServices = availableServices,
    draft.selectedServiceId = undefined,
    draft.selectedTimeSlot = undefined,
    draft.isModalOpened = false
}));

availableTableReducer.on(serviceReservationCancelled, (state) => produce(state, (draft) => {
    draft.availableServices = fakeData,
    draft.selectedServiceId = undefined,
    draft.selectedTimeSlot = undefined,
    draft.isModalOpened = false
}));

availableTableReducer.on(serviceClicked, (state, payload) => produce(state, (draft) => {
    const availableServices = fakeData;
    draft.availableServices = availableServices,
    draft.selectedServiceId = payload.selectedServiceId,
    draft.selectedTimeSlot = undefined,
    draft.isModalOpened = true
}));

availableTableReducer.on(serviceReservationSaved, (state, payload) => produce(state, (draft) => {
    const availableServices = fakeData.slice();
    const booked = {
        service: availableServices[payload.selectedServiceId].service,
        availableDateTimeSlots: availableServices[payload.selectedServiceId].availableDateTimeSlots,
        openHours: availableServices[payload.selectedServiceId].openHours,
        isBooked: true
    };

    availableServices.splice(payload.selectedServiceId, 1, booked);

    draft.availableServices = availableServices,
    draft.selectedServiceId = payload.selectedServiceId,
    draft.selectedTimeSlot = payload.timeSlot,
    draft.isModalOpened = false
}));

export default availableTableReducer;
