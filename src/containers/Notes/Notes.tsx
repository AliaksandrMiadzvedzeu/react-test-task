import React, { Component } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import classes from "./Notes.module.css";
import {
  addNote,
  fetchNotes,
  saveNotes,
  setFilter,
} from "../../store/notes/actions";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { ApplicationState } from "../../store";
import { INote } from "../../store/notes/reducers";
import { isEqual } from "../../lib/isEqual";
import { FilterTypes } from "./FilterTypes";
import NoteTable from "./NoteTable";

interface State {
  newNoteText: string;
}

interface DispatchProps {
  fetchNotes: () => void;
  saveNotes: () => void;
  addNote: (note: INote) => void;
  setFilter: (filter: string) => void;
}

interface StateProps {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  message: string;
  filter: string;
}

type Props = StateProps & DispatchProps;

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
    addNote: (note: INote) => dispatch(addNote(note)),
    setFilter: (filter: string) => dispatch(setFilter(filter)),
  };
}

class Notes extends Component<Props, State> {
  noteCounter: number = 0; //This counter uses to make unique id when we are creating new note.

  constructor(props: Props) {
    super(props);
    this.state = {
      newNoteText: "",
    };
  }

  getFilteredNotes = (filter: string): Array<INote> => {
    return this.props.updatedNotes.filter((value) => {
      if (filter === FilterTypes.COMPLETED) {
        return value.done;
      } else if (filter === FilterTypes.WAITING) {
        return !value.done;
      }
      return true;
    });
  };

  onAddNoteHandler = () => {
    const note: INote = {
      id: "id" + (this.props.notes.length + this.noteCounter),
      text: this.state.newNoteText,
      done: false,
    };
    this.props.addNote(note);
    this.setState({ newNoteText: "" });
    this.noteCounter++;
  };

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const completedNotesCount = this.getFilteredNotes("completed").length;

    return (
      <div className="d-flex justify-content-center flex-grow-1 pt-5">
        <div className="w-100 px-sm-5">
          <h2 className="text-center mb-3">Notes</h2>

          <div className="container d-flex justify-content-center">
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={this.props.setFilter.bind(this, FilterTypes.All)}
                checked={this.props.filter === FilterTypes.All}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                All ({this.props.updatedNotes.length})
              </label>
            </div>
            <br />
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={this.props.setFilter.bind(
                  this,
                  FilterTypes.COMPLETED
                )}
                checked={this.props.filter === FilterTypes.COMPLETED}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Completed ({completedNotesCount})
              </label>
            </div>

            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onChange={this.props.setFilter.bind(this, FilterTypes.WAITING)}
                checked={this.props.filter === FilterTypes.WAITING}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Waiting ({this.props.updatedNotes.length - completedNotesCount})
              </label>
            </div>
          </div>

          <br />

          {this.props.loading ? (
            <Loader />
          ) : (
            <NoteTable getFilteredNotes={this.getFilteredNotes} />
          )}

          <br />
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Text of note"
              aria-label="Text of note"
              aria-describedby="button-addon2"
              maxLength={100}
              value={this.state.newNoteText}
              onChange={(e) => this.setState({ newNoteText: e.target.value })}
            />
            <div className="input-group-append">
              <button
                className={"btn " + classes.btnWarning}
                type="button"
                id="button-addon2"
                onClick={this.onAddNoteHandler}
                disabled={this.state.newNoteText.trim().length === 0}
              >
                Add note
              </button>
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <button
              type="button"
              onClick={this.props.saveNotes.bind(this)}
              className={"btn " + classes.btnWarning + " " + classes.saveButton}
              disabled={isEqual(this.props.notes, this.props.updatedNotes)}
            >
              Save notes
            </button>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
