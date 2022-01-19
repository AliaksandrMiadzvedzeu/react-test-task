import React, { Component } from "react";
import classes from "../NoteList/NoteList.module.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  addNote,
  changeNote,
  fetchNotes,
  saveNotes,
} from "../../store/actions/note";
import { IAction } from "../../interfaces/IAction";
import { INote } from "../../interfaces/INote";
import { INoteState } from "../../store/reducers/note";
import { connect, MapStateToPropsParam } from "react-redux";
import { IState } from "../../store/reducers/rootReducer";
import Loader from "../../components/UI/Loader/Loader";

interface State {
  fontSize: number;
}

interface OwnProps {
  textColor: string;
}

interface DispatchProps {
  fetchNotes: (userId: string) => void;
  saveNotes: (userId: string, updatedNotes: Array<INote>) => void;
  changeNote: (note: INote) => void;
  addNote: (note: INote) => void;
}

interface StateProps {
  userId: string;
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  message: string;
  filter: string;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(state: IState): StateProps {
  return {
    userId: state.auth.email,
    notes: state.note.notes,
    updatedNotes: state.note.updatedNotes,
    loading: state.note.loading,
    message: state.note.message,
    filter: state.note.filter,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<INoteState, {}, AnyAction>
): DispatchProps {
  return {
    fetchNotes: (userId: string) => dispatch(fetchNotes(userId)),
    saveNotes: (userId: string, updatedNotes: Array<INote>) =>
      dispatch(saveNotes(userId, updatedNotes)),
    changeNote: (note: INote) => dispatch(changeNote(note)),
    addNote: (note: INote) => dispatch(addNote(note)),
  };
}

class NoteList extends Component<Props, State> {
  constructor(prop: Props) {
    super(prop);
    this.state = {
      fontSize: 12,
    };
  }

  componentDidMount() {
    this.props.fetchNotes("1");
  }

  // renderNotes() {
  //   return this.props.notes.map((quiz) => {
  //     return (
  //       <li key={quiz.id}>
  //         <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
  //       </li>
  //     );
  //   });
  // }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {/*{this.props.loading && this.props.notes.length !== 0 ? (*/}
          {/*  <Loader />*/}
          {/*) : (*/}
          {/*  <ul>{this.renderNotes()}</ul>*/}
          {/*)}*/}
        </div>
        <div>
          <textarea value={"1111"} />
          {/*<input type="button" value="Save JSON" onClick={saveNotes} />*/}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
