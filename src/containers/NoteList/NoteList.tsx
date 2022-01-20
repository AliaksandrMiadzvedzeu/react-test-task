import React, { Component } from "react";
import classes from "../NoteList/NoteList.module.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  addNote,
  changeNote,
  fetchNotes,
  saveNotes,
} from "../../store/notes/actions";
import { INote } from "../../interfaces/INote";
import { connect, MapStateToPropsParam } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { ApplicationState } from "../../store";
import { NoteState } from "../../store/notes/reducers";

interface State {
  fontSize: number;
}

interface OwnProps {
  userId: string;
}

interface DispatchProps {
  fetchNotes: (userId: string) => void;
  saveNotes: (userId: string, updatedNotes: Array<INote>) => void;
  changeNote: (note: INote) => void;
  addNote: (text: string) => void;
}

interface StateProps {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  message: string;
  filter: string;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    notes: state.note.notes,
    updatedNotes: state.note.updatedNotes,
    loading: state.note.loading,
    message: state.note.message,
    filter: state.note.filter,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<ApplicationState, {}, AnyAction>
): DispatchProps {
  return {
    fetchNotes: (userId: string) => dispatch(fetchNotes(userId)),
    saveNotes: (userId: string, updatedNotes: Array<INote>) =>
      dispatch(saveNotes(userId, updatedNotes)),
    changeNote: (note: INote) => dispatch(changeNote(note)),
    addNote: (text: string) => dispatch(addNote(text)),
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
    this.props.fetchNotes(this.props.userId);
  }

  renderNotes() {
    return this.props.updatedNotes.map((note) => {
      return <li key={note.id}>{note.text}</li>;
    });
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading && this.props.updatedNotes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderNotes()}</ul>
          )}
        </div>
        <div>
          {/*<textarea value={"1111"} />*/}
          <input
            type="button"
            value="Add note"
            onClick={(e) => {
              this.props.addNote("AAAAAAAAAA");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
