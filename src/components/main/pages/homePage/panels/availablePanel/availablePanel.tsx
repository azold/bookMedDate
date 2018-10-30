import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';
import { ServicesPanel } from "../../../../../../constants/panelConstants"; 

export default class AvailablePanelComponent extends React.Component{

    public render(): JSX.Element {

        return (
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{ServicesPanel.title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div className="col-md-6">
                        <p>
                            {ServicesPanel.details}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img className="img-responsive" src="./images/Services.png"/>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
