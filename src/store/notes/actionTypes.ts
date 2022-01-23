import { Action } from "redux";
import { INote } from "./reducers";

export const FETCH_NOTES_START = "FETCH_NOTES_START";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_ERROR = "FETCH_NOTES_ERROR";
export const SAVE_NOTES_SUCCESS = "SAVE_NOTES_SUCCESS";
export const SAVE_NOTES_ERROR = "SAVE_NOTES_ERROR";
export const CHANGE_NOTE = "CHANGE_NOTE";
export const SET_FILTER = "SET_FILTER";
export const ADD_NOTE = "ADD_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export interface FetchNotesStartAction extends Action {
  type: "FETCH_NOTES_START";
}

export interface FetchNotesSuccessAction extends Action {
  type: "FETCH_NOTES_SUCCESS";
  notes: Array<INote>;
}

export interface FetchNotesErrorAction extends Action {
  type: "FETCH_NOTES_ERROR";
  errorMessage: string;
}

export interface SaveNotesSuccessAction extends Action {
  type: "SAVE_NOTES_SUCCESS";
  updatedNotes: Array<INote>;
}

export interface SaveNotesErrorAction extends Action {
  type: "SAVE_NOTES_ERROR";
  errorMessage: string;
}

export interface ChangeNoteAction extends Action {
  type: "CHANGE_NOTE";
  updatedNotes: Array<INote>;
}

export interface AddNoteAction extends Action {
  type: "ADD_NOTE";
  note: INote;
}

export interface SetFilterAction extends Action {
  type: "SET_FILTER";
  filter: string;
}

export interface RemoveNoteAction extends Action {
  type: "REMOVE_NOTE";
  updatedNotes: Array<INote>;
}

export type NoteAction =
  | FetchNotesStartAction
  | FetchNotesSuccessAction
  | FetchNotesErrorAction
  | SaveNotesSuccessAction
  | SaveNotesErrorAction
  | ChangeNoteAction
  | AddNoteAction
  | SetFilterAction
  | RemoveNoteAction;
