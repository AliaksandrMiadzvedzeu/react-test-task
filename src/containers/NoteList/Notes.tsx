import React, { Component } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import classes from "./Notes.module.css";

import {
  addNote,
  changeNote,
  fetchNotes,
  removeNote,
  saveNotes,
  setFilter,
} from "../../store/notes/actions";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { ApplicationState } from "../../store";
import { INote } from "../../store/notes/reducers";
import { isEqual } from "../../lib/isEqual";

export enum FilterType {
  All = "all",
  WAITING = "waiting",
  COMPLETED = "completed",
}

interface State {
  newNoteText: string;
}

interface OwnProps {
  textColor: string;
}

interface DispatchProps {
  fetchNotes: () => void;
  saveNotes: () => void;
  changeNote: (id: string) => void;
  addNote: (note: INote) => void;
  setFilter: (filter: string) => void;
  removeNote: (id: string) => void;
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
    changeNote: (id: string) => dispatch(changeNote(id)),
    addNote: (note: INote) => dispatch(addNote(note)),
    setFilter: (filter: string) => dispatch(setFilter(filter)),
    removeNote: (id: string) => dispatch(removeNote(id)),
  };
}

class Notes extends Component<Props, State> {
  noteCounter: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      newNoteText: "",
    };
  }

  getFilteredNotes(filter: string): Array<INote> {
    return this.props.updatedNotes.filter((value) => {
      if (filter === FilterType.COMPLETED) {
        return value.done;
      } else if (filter === FilterType.WAITING) {
        return !value.done;
      }
      return true;
    });
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  renderNotes() {
    return this.getFilteredNotes(this.props.filter).map((note, index) => {
      return (
        <tr key={note.id}>
          <td>{note.text}</td>
          <td>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked={!note.done}
                onChange={() => this.props.changeNote(note.id)}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {note.done ? FilterType.COMPLETED : FilterType.WAITING}
              </label>
            </div>
          </td>
          <td>
            <button
              type="button"
              className={"btn " + classes.btnPrimary}
              onClick={() => this.props.removeNote(note.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const completedNotesCount = this.getFilteredNotes("completed").length;

    return (
      <div className="d-flex justify-content-center flex-grow-1 pt-5">
        <div className="w-100 px-sm-5" style={{ color: this.props.textColor }}>
          <h2 className="text-center mb-3">Notes</h2>

          <div className="container d-flex justify-content-center">
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={this.props.setFilter.bind(this, FilterType.All)}
                checked={this.props.filter === FilterType.All}
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
                onChange={this.props.setFilter.bind(this, FilterType.COMPLETED)}
                checked={this.props.filter === FilterType.COMPLETED}
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
                onChange={this.props.setFilter.bind(this, FilterType.WAITING)}
                checked={this.props.filter === FilterType.WAITING}
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "80%" }} scope="col">
                    Note
                  </th>
                  <th style={{ width: "10%" }} scope="col">
                    Status
                  </th>
                  <th style={{ width: "10%" }} scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderNotes()}</tbody>
            </table>
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
                onClick={() => {
                  if (this.state.newNoteText.length > 0) {
                    const note: INote = {
                      id: "id" + (this.props.notes.length + this.noteCounter),
                      text: this.state.newNoteText,
                      done: false,
                    };
                    this.props.addNote(note);
                    this.setState({ newNoteText: "" });
                    this.noteCounter++;
                  }
                }}
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
              disabled={isEqual<INote>(
                this.props.notes,
                this.props.updatedNotes
              )}
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
