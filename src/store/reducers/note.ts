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
} from "../actions/actionTypes";
import { INote } from "../../interfaces/INote";
import { IAction } from "../../interfaces/IAction";

export interface INoteState {
  //userId: string;
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  message: string;
  filter: string;
}

const initialState: INoteState = {
  notes: new Array<INote>(),
  updatedNotes: new Array<INote>(),
  loading: false,
  message: "",
  filter: "all",
};

export default function noteReducer(
  state = initialState,
  action: IAction
): INoteState {
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
        updatedNotes: action.updatedNotes || [],
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.filter || "",
      };
    default:
      return state;
  }
}

// const initialState = {
//   quizes: [],
//   loading: false,
//   error: null,
//   results: {},
//   isFinished: false,
//   activeQuestion: 0,
//   answerState: null,
//   quiz: null,
// };

/*
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    default:
      return state;
  }
}
*/
