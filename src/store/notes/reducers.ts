import {
  FETCH_NOTES_START,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  SAVE_NOTES_SUCCESS,
  SAVE_NOTES_ERROR,
  CHANGE_NOTE,
  SET_FILTER,
  ADD_NOTE,
  REMOVE_NOTE,
  NoteAction,
} from "./actionTypes";
import { Reducer } from "redux";

export interface State {
  reducer: NoteState;
}

export interface INote {
  id: string;
  text: string;
  done: boolean;
}

export interface NoteState {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  errorMessage: string;
  filter: string;
}

const initialState: NoteState = {
  notes: new Array<INote>(),
  updatedNotes: new Array<INote>(),
  loading: false,
  errorMessage: "",
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
        errorMessage: "",
        notes: [...action.notes],
        updatedNotes: [...action.notes],
        filter: "all",
      };
    case FETCH_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      };

    case SAVE_NOTES_SUCCESS:
      return {
        ...state,
        notes: [...action.updatedNotes],
        errorMessage: "",
      };
    case SAVE_NOTES_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case CHANGE_NOTE:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...action.updatedNotes],
      };
    case ADD_NOTE:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...state.updatedNotes, action.note],
      };
    case SET_FILTER:
      return {
        ...state,
        errorMessage: "",
        filter: action.filter,
      };
    case REMOVE_NOTE:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...action.updatedNotes],
      };
    default:
      return state;
  }
};

export default reducer;
