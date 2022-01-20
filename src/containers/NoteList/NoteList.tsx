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
  textColor: string;
}

interface DispatchProps {
  fetchNotes: () => void;
  saveNotes: () => void;
  changeNote: (note: INote) => void;
  addNote: (note: INote) => void;
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
    fetchNotes: () => dispatch(fetchNotes()),
    saveNotes: () => dispatch(saveNotes()),
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
    this.props.fetchNotes();
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
              const note: INote = {
                id: "id" + this.props.updatedNotes.length,
                text: "House",
                done: false,
              };
              this.props.addNote(note);
            }}
          />
          <input
            type="button"
            value="Save"
            onClick={(e) => {
              this.props.saveNotes();
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
