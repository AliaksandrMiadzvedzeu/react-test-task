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
} from "./actionTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { INote } from "../../interfaces/INote";
import { IAction } from "../../interfaces/IAction";
import { INoteState } from "../reducers/note";

export function fetchNotes(
  userId: string
): ThunkAction<Promise<void>, INoteState, {}, IAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, IAction>,
    getState
  ): Promise<void> => {
    //const { userId } = getState();
    dispatch(fetchNotesStart());
    try {
      const response = await axios_user.get(
        `/users/${userId.replace(".", "^")}.json`
      );

      const notes: Array<INote> = [];
      response.data.notes.forEach((item: INote, index: number) => {
        notes.push({
          id: index,
          text: item.text,
          done: item.done,
        });
      });

      dispatch(fetchNotesSuccess(notes));
    } catch (e) {
      dispatch(fetchNotesError((e as Error).toString()));
    }
  };
}

export function saveNotes(
  userId: string,
  updatedNotes: Array<INote>
): ThunkAction<Promise<void>, INoteState, {}, IAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, IAction>,
    getState
  ): Promise<void> => {
    //const { userId } = getState();
    dispatch(saveNotesStart("Saving data..."));
    try {
      await axios_user.put(`/users/${userId.replace(".", "^")}.json/data/`, {
        updatedNotes,
      });

      dispatch(saveNotesSuccess(updatedNotes));
    } catch (e) {
      dispatch(saveNotesError((e as Error).toString()));
    }
  };
}

export function changeNote(
  note: INote
): ThunkAction<void, INoteState, {}, IAction> {
  return (dispatch: ThunkDispatch<INoteState, {}, IAction>, getState): void => {
    const { updatedNotes } = getState();
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
): ThunkAction<void, INoteState, {}, IAction> {
  return (dispatch: ThunkDispatch<INoteState, {}, IAction>, getState): void => {
    const { updatedNotes } = getState();
    updatedNotes.push(note);
    dispatch({
      type: ADD_NOTE,
      updatedNotes,
    });
  };
}

export function fetchNotesStart(): IAction {
  return {
    type: FETCH_NOTES_START,
  };
}

export function fetchNotesSuccess(notes: Array<INote>) {
  return {
    type: FETCH_NOTES_SUCCESS,
    notes,
  };
}

export function fetchNotesError(e: string) {
  return {
    type: FETCH_NOTES_ERROR,
    message: e,
  };
}

export function saveNotesStart(message: string): IAction {
  return {
    type: SAVE_NOTES_START,
    message,
  };
}

export function saveNotesSuccess(updatedNotes: Array<INote>): IAction {
  return {
    type: SAVE_NOTES_SUCCESS,
    updatedNotes,
  };
}

export function saveNotesError(message: string): IAction {
  return {
    type: SAVE_NOTES_ERROR,
    message,
  };
}

export function setFilter(filter: string): IAction {
  return {
    type: SET_FILTER,
    filter,
  };
}

//
//
//
//
// export function quizSetState(answerState, results) {
//   return {
//     type: QUIZ_SET_STATE,
//     answerState,
//     results,
//   };
// }
//
// export function finishQuiz() {
//   return {
//     type: FINISH_QUIZ,
//   };
// }
//
// export function quizNextQuestion(number) {
//   return {
//     type: QUIZ_NEXT_QUESTION,
//     number,
//   };
// }
//
// export function retryQuiz() {
//   return {
//     type: QUIZ_RETRY,
//   };
// }
//
// export function quizAnswerClick(answerId) {
//   return (dispatch, getState) => {
//     const state = getState().quiz;
//
//     if (state.answerState) {
//       const key = Object.keys(state.answerState)[0];
//       if (state.answerState[key] === "success") {
//         return;
//       }
//     }
//
//     const question = state.quiz[state.activeQuestion];
//     const results = state.results;
//
//     if (question.rightAnswerId === answerId) {
//       if (!results[question.id]) {
//         results[question.id] = "success";
//       }
//
//       dispatch(quizSetState({ [answerId]: "success" }, results));
//
//       const timeout = window.setTimeout(() => {
//         if (isQuizFinished(state)) {
//           dispatch(finishQuiz());
//         } else {
//           dispatch(quizNextQuestion(state.activeQuestion + 1));
//         }
//         window.clearTimeout(timeout);
//       }, 1000);
//     } else {
//       results[question.id] = "error";
//       dispatch(quizSetState({ [answerId]: "error" }, results));
//     }
//   };
// }
//
// function isQuizFinished(state) {
//   return state.activeQuestion + 1 === state.quiz.length;
// }
