import axios from "axios";
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
  FetchNotesStartAction,
  FetchNotesSuccessAction,
  FetchNotesErrorAction,
  SaveNotesSuccessAction,
  SaveNotesErrorAction,
  SetFilterAction,
  NoteAction,
} from "./actionTypes";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../index";
import { INote } from "./reducers";
import { encodeEmail } from "../../lib/encodeEmail";

export function fetchNotes(): ThunkAction<
  Promise<void>,
  ApplicationState,
  unknown,
  NoteAction
> {
  return async (
    dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>,
    getState
  ): Promise<void> => {
    const { email } = getState().auth;
    dispatch(fetchNotesStart());
    try {
      const response = await axios.get(
        `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json`
      );

      const notes: Array<INote> = [];
      let counter = 0;
      if (response.data != null) {
        for (const value of Object.values(response.data)) {
          notes.push({
            id: "id" + counter++,
            text: (value as INote).text,
            done: (value as INote).done,
          });
        }
      }
      dispatch(fetchNotesSuccess(notes));
    } catch (error) {
      dispatch(
        fetchNotesError("Error occurred. It appears something is broken.")
      );
      console.error("An unexpected error happened:", error);
    }
  };
}

export function saveNotes(): ThunkAction<
  Promise<void>,
  ApplicationState,
  unknown,
  NoteAction
> {
  return async (
    dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>,
    getState
  ): Promise<void> => {
    const { email } = getState().auth;
    const { updatedNotes } = getState().note;

    try {
      const data: any = {};
      let counter = 0;
      for (const item of updatedNotes) {
        item.id = "id" + counter; //update old item because new item can have a bug with id
        data[item.id] = { text: item.text, done: item.done };
        counter++;
      }
      await axios.put(
        `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json/`,
        data
      );

      dispatch(saveNotesSuccess(updatedNotes));
    } catch (error) {
      dispatch(saveNotesError("Something went wrong. Try again!"));
      console.error("An unexpected error happened:", error);
    }
  };
}

export function changeNote(
  id: string
): ThunkAction<void, ApplicationState, unknown, NoteAction> {
  return (
    dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>,
    getState
  ): void => {
    const { updatedNotes } = getState().note;
    updatedNotes.forEach((item, index) => {
      if (item.id === id) {
        updatedNotes[index] = {
          id: item.id,
          text: item.text,
          done: !item.done,
        };
      }
    });

    dispatch({
      type: CHANGE_NOTE,
      updatedNotes,
    });
  };
}

export function addNote(
  note: INote
): ThunkAction<void, ApplicationState, unknown, NoteAction> {
  return (
    dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>
  ): void => {
    dispatch({
      type: ADD_NOTE,
      note,
    });
  };
}

export function setFilter(filter: string): SetFilterAction {
  return {
    type: SET_FILTER,
    filter,
  };
}

export function removeNote(
  id: string
): ThunkAction<void, ApplicationState, unknown, NoteAction> {
  return (
    dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>,
    getState
  ): void => {
    const { updatedNotes } = getState().note;
    for (const item of updatedNotes) {
      if (item.id === id) {
        const index = updatedNotes.indexOf(item);
        updatedNotes.splice(index, 1);
        break;
      }
    }
    dispatch({
      type: REMOVE_NOTE,
      updatedNotes,
    });
  };
}

export function fetchNotesStart(): FetchNotesStartAction {
  return {
    type: FETCH_NOTES_START,
  };
}

export function fetchNotesSuccess(
  notes: Array<INote>
): FetchNotesSuccessAction {
  return {
    type: FETCH_NOTES_SUCCESS,
    notes,
  };
}

export function fetchNotesError(errorMessage: string): FetchNotesErrorAction {
  return {
    type: FETCH_NOTES_ERROR,
    errorMessage,
  };
}

export function saveNotesSuccess(
  updatedNotes: Array<INote>
): SaveNotesSuccessAction {
  return {
    type: SAVE_NOTES_SUCCESS,
    updatedNotes,
  };
}

export function saveNotesError(errorMessage: string): SaveNotesErrorAction {
  return {
    type: SAVE_NOTES_ERROR,
    errorMessage,
  };
}
