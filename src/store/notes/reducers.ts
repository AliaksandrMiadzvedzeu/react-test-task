import {
  FETCH_NOTES_START,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  SAVE_NOTES_START,
  SAVE_NOTES_SUCCESS,
  SAVE_NOTES_ERROR,
  CHANGE_NOTE,
  SET_FILTER,
  ADD_NOTE,
} from "./actionTypes";
import { INote } from "../../interfaces/INote";
import { Reducer } from "redux";
import { NoteAction } from "./actions";

export interface State {
  reducer: NoteState;
}

export interface NoteState {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  message: string;
  filter: string;
}

const initialState: NoteState = {
  notes: new Array<INote>(),
  updatedNotes: new Array<INote>(),
  loading: false,
  message: "",
  filter: "all",
};

export const reducer: Reducer<NoteState, NoteAction> = (
  state = initialState,
  action
): NoteState => {
  switch (action.type) {
    case FETCH_NOTES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.notes || [],
        updatedNotes: action.notes || [],
        filter: "all",
      };
    case FETCH_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        message: action.message || "",
      };

    case SAVE_NOTES_START:
      return {
        ...state,
        message: action.message || "",
      };
    case SAVE_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.updatedNotes || [],
        message: "",
      };
    case SAVE_NOTES_ERROR:
      return {
        ...state,
        message: action.message || "",
      };
    case CHANGE_NOTE:
      return {
        ...state,
        updatedNotes: action.updatedNotes || [],
      };
    case ADD_NOTE:
      return {
        ...state,
        updatedNotes: [...state.updatedNotes, action.note],
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter || "",
      };
    default:
      return state;
  }
};

export default reducer;

// export default combineReducers<State>({
//   reducer,
// });
