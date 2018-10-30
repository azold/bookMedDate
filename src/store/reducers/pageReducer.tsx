import produce from "immer";
import {createReducer} from "redux-act";
import { menuClicked } from "../action/navigationAction";

export interface IPageState{
    selectedMenuId: number;  // 0 ->home
}

const initialState: IPageState = {
    selectedMenuId: 0
};

const pageReducer = createReducer<IPageState>({}, initialState);

pageReducer.on(menuClicked, (state, payload) => produce(state, (draft) => {
    draft.selectedMenuId = payload;
}));


export default pageReducer;
