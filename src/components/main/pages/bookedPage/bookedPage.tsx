import * as React from "react";
import * as ReactDOM from "react-dom";
import { menuClicked } from "../../../../store/action/navigationAction";
import { IPageState } from "../../../../store/reducers/pageReducer";
import BookedTableComponent from "./bookedTable/bookedTable";
import { IBookedServiceState } from "../../../../store/reducers/bookedTableReducer";
import { IBookedServices } from "../../../../contracts/BookedServices";

interface IDispatchProps {
    bookedServicesData: IBookedServiceState;
    receiveBookedServices(): IBookedServices[];
    bookedServiceClicked(id: number): void;
    bookedServiceDeleted(id: number): void;
}


export default class BookedPage extends React.PureComponent<IDispatchProps>{        
    public render(): JSX.Element {

        return (
            <BookedTableComponent {...this.props}/>
        );      
    }

}
