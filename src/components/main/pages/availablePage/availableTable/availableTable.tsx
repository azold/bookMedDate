import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Table } from 'react-bootstrap';
import { ServicesTableHeader } from "../../../../../constants/tableConstants"; 
import AvailableServices from "../../../../../contracts/AvailableServices";
import { IAvailableServiceState } from "../../../../../store/reducers/availableTableReducer";
import availableTableReducer from "../../../../../store/reducers/availableTableReducer";
import IDatetimeSlot from '../../../../../contracts/DatetimeSlot';
import { IServicesBase } from '../../../../../contracts/ServiceBase';
import BaseModalComponent from "../../../modal/modal";

interface IDispatchProps {
    availableServicesData: IAvailableServiceState;
    receiveServices(): AvailableServices[];
    serviceClicked(id: number): void;
    serviceReservationCancelled(): void;
    serviceReservationSaved(selectedServiceId: number, timeSlotId: IDatetimeSlot): void;
    serviceBooked(selectedService: IServicesBase, timeSlot: IDatetimeSlot): void;
}

export default class AvailableTableComponent extends React.PureComponent<IDispatchProps>{

    public componentWillMount(): void {
        this.props.receiveServices();
    }

    private show: boolean = false;
    public render(): JSX.Element {        

        let content = <div>
                        <p>Loading...</p>;
                      </div>;
        if (this.props.availableServicesData.availableServices !== undefined && this.props.availableServicesData.availableServices.length > 0) {
            const headerRows = this.generateTableHeaders();    
            const bodyRows = this.generateTableBody(this.props.availableServicesData.availableServices);

            content = <div>
                        <Table striped responsive hover>
                            <thead>
                                {headerRows}
                            </thead>
                            <tbody>
                                {bodyRows}
                            </tbody>                    
                        </Table>
                        <BaseModalComponent {...this.props} />
                      </div>;
        }

        return (
            <div className="col-md-12">
                {content}
            </div>
        );
    }

    private generateTableHeaders(): JSX.Element {

        var keys = Object.keys( ServicesTableHeader );    
        const headers:{ [key: string] : string; } = {...ServicesTableHeader};
        const cols: JSX.Element[] = [];

        for (let i = 0; i < keys.length; i++) {
            let key = "cellheader " + i;
            let text = headers[keys[i]];     
            cols.push(<th key={key}>{text}</th>);    
        }

        return <tr key="header">{cols}</tr>;
    }

    private generateTableBody(data: AvailableServices[]): JSX.Element[] {

        const rows: JSX.Element[] = [];
        var colCount = Object.keys( ServicesTableHeader ).length;       

        for (let i = 0; i < data.length; i++) {
            const cols: JSX.Element[] = [];
            const id = data[i].service.serviceId;
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{data[i].service.serviceName}</td>);  
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{data[i].service.doctor}</td>);
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{data[i].openHours.from.format("HH:mm")} - {data[i].openHours.to.format("HH:mm")}</td>);
            let referral = data[i].service.referral ? <input id="checkBox" type="checkbox" checked disabled/> : <input id="checkBox" type="checkbox" disabled/>;
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{referral}</td>);  

            let preReq = "-";
            if (data[i].service.prerequiredServieId !== undefined) {
                preReq = data.filter(x => x.service.serviceId == data[i].service.prerequiredServieId)[0].service.serviceName;
            }
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{preReq}</td>); 

            let row = <tr key={this.guid()}>{cols}</tr>;
            rows.push(row);
        }

        return rows;
    }

    private showModal(id: number): any {        
        console.log("clicked service item: " + id);
        this.props.serviceClicked(id);
    }

    private guid(): string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4(): string {
        const result = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

        return result;
    }
}
