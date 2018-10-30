import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import IAppState from "../../store/appState";
import { menuClicked } from "../../store/action/navigationAction";
import { IPageState } from "../../store/reducers/pageReducer";

interface INavigationProps {
    menuClicked(id: number): number;
    selectedMenuId: number;
}

interface IDispatchProps {
    menuClicked(id: number): number;
}

const mapStateToProps = (state: IAppState, ownProps: {}): IPageState => {
    return {
        selectedMenuId: state.pageReducer.selectedMenuId
    };
};

const mapDispatchToProps = (dispatch: any) => ({
   menuClicked: (id: number) => dispatch(menuClicked(id)) 
});

export default class Navigation extends React.PureComponent<INavigationProps & IDispatchProps>{

    public render(): JSX.Element {
        this.decorateSelectedElement(this.props.selectedMenuId);
        return (
            <Navbar>
                <Nav>
                    <NavItem eventKey={0} href="#" onSelect={this.clickonMenu.bind(this)} id="home" className="active">
                        Home
                    </NavItem>
                    <NavItem eventKey={1} href="#" onSelect={this.clickonMenu.bind(this)} id="booked">
                        Booked dates
                    </NavItem>
                    <NavItem eventKey={2} href="#" onSelect={this.clickonMenu.bind(this)} id="available">
                        Available services
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }

    private clickonMenu(id: number): void {        
        console.log("clicked menu item: " + id);
        this.decorateSelectedElement(id);
        this.props.menuClicked(id);
    }

    private decorateSelectedElement(id: number) {
        const elements = document.getElementsByTagName("li");

        for (let i=0; i < elements.length; i++) {

            if ((elements[i] !== elements[id]) && (elements[i].classList.contains("active"))){
                 elements[i].classList.remove("active"); 
            }
            elements[id].classList.add("active");
        }
        
    }
}

