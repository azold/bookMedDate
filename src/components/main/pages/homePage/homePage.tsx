import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BookedPanel, ServicesPanel } from "../../../../constants/panelConstants"; 
import AvailablePanelComponent from "./panels/availablePanel/availablePanel";
import BookedPanelComponent from "./panels/bookedPanel/bookedPanel";
import { menuClicked } from "../../../../store/action/navigationAction";
import { IPageState } from "../../../../store/reducers/pageReducer";
import IAppState from "../../../../store/appState";
import AvailableServices from "../../../../contracts/AvailableServices";
import { serviceClicked, receiveServices } from "../../../../store/action/availableServicesAction";
import { IAvailableServiceState } from "../../../../store/reducers/availableTableReducer";

interface IHomeProps {
    selectedMenuId: number;
}

 interface IDispatchProps {
    menuClicked(id: number): number;
}

export default class HomePage extends React.PureComponent<IDispatchProps & IHomeProps>{        

    public render(): JSX.Element {

        return (
            <div className="col-md-12">
                <div className="col-md-6" id="1" onClick={this.clickonMenu.bind(this)}><BookedPanelComponent /></div>
                <div className="col-md-6" id="2" onClick={this.clickonMenu.bind(this)}><AvailablePanelComponent /></div>
            </div>
        );       
    }

    private clickonMenu(event: any): any {        
        const id = Number(event.target.offsetParent.id);
        console.log("clicked menu item: " + id);
        this.props.menuClicked(id);
    }

}

