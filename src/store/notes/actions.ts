import axios_user from "../../axios/axios-user";
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
  FetchNotesStartAction,
  FetchNotesSuccessAction,
  FetchNotesErrorAction,
  SaveNotesStartAction,
  SaveNotesSuccessAction,
  SaveNotesErrorAction,
  ChangeNoteAction,
  AddNoteAction,
  SetFilterAction,
} from "./actionTypes";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { INote } from "../../interfaces/INote";
import { AnyAction } from "redux";
import { ApplicationState } from "../index";

export function fetchNotes(): ThunkAction<
  Promise<void>,
  ApplicationState,
  {},
  AnyAction
> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    const { email } = getState().auth;
    dispatch(fetchNotesStart());
    try {
      const response = await axios_user.get(
        `/users/${email.replace(".", "^")}/data.json`
      );

      const notes: Array<INote> = [];
      for (const [key, value] of Object.entries(response.data)) {
        notes.push({
          id: key,
          text: (value as INote).text,
          done: (value as INote).done,
        });
      }
      dispatch(fetchNotesSuccess(notes));
    } catch (e) {
      dispatch(fetchNotesError((e as Error).toString()));
    }
  };
}

export function saveNotes(): ThunkAction<
  Promise<void>,
  ApplicationState,
  {},
  AnyAction
> {
  return async (
    dispatch: ThunkDispatch<{}, {}, NoteAction>,
    getState
  ): Promise<void> => {
    const { email } = getState().auth;
    const { updatedNotes } = getState().note;

    dispatch(saveNotesStart("Saving data..."));
    try {
      const data: any = {};
      for (const item of updatedNotes) {
        data[item.id] = { text: item.text, done: item.done };
      }
      await axios_user.put(
        `/users/${email.replace(".", "^")}/data.json/`,
        data
      );

      dispatch(saveNotesSuccess(updatedNotes));
    } catch (e) {
      dispatch(saveNotesError((e as Error).toString()));
    }
  };
}

export function changeNote(
  note: INote
): ThunkAction<void, ApplicationState, {}, AnyAction> {
  return (
    dispatch: ThunkDispatch<ApplicationState, {}, AnyAction>,
    getState
  ): void => {
    const { updatedNotes } = getState().note;
    for (const item of updatedNotes) {
      if (item.id === note.id) {
        item.done = note.done;
      }
    }
    dispatch({
      type: CHANGE_NOTE,
      updatedNotes,
    });
  };
}

export function addNote(
  note: INote
): ThunkAction<void, ApplicationState, {}, AnyAction> {
  return (dispatch: ThunkDispatch<ApplicationState, {}, AnyAction>): void => {
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

export function fetchNotesError(e: string): FetchNotesErrorAction {
  return {
    type: FETCH_NOTES_ERROR,
    message: e,
  };
}

export function saveNotesStart(message: string): SaveNotesStartAction {
  return {
    type: SAVE_NOTES_START,
    message,
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

export function saveNotesError(message: string): SaveNotesErrorAction {
  return {
    type: SAVE_NOTES_ERROR,
    message,
  };
}

export type NoteAction =
  | FetchNotesStartAction
  | FetchNotesSuccessAction
  | FetchNotesErrorAction
  | SaveNotesStartAction
  | SaveNotesSuccessAction
  | SaveNotesErrorAction
  | ChangeNoteAction
  | AddNoteAction
  | SetFilterAction;
