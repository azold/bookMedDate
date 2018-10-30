import { IPageState } from "./reducers/pageReducer";
import { IAvailableServiceState } from "./reducers/availableTableReducer";
import { IBookedServiceState } from "./reducers/bookedTableReducer";

export default interface IAppState {
    pageReducer: IPageState
    availableTableReducer: IAvailableServiceState
    bookedTableReducer: IBookedServiceState
}
