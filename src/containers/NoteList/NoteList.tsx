import React, { Component, createRef, useRef } from "react";
import classes from "../NoteList/NoteList.module.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  addNote,
  changeNote,
  fetchNotes,
  saveNotes,
  setFilter,
} from "../../store/notes/actions";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { ApplicationState } from "../../store";
import { INote } from "../../store/notes/reducers";

interface State {
  fontSize: number;
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
  };
}

class NoteList extends Component<Props, State> {
  newNoteInput = createRef<HTMLInputElement>();

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
    return this.props.updatedNotes
      .filter((value) => {
        if (this.props.filter === "fulfilled") {
          return value.done;
        } else if (this.props.filter === "no_fulfilled") {
          return !value.done;
        } else if (this.props.filter === "all") return true;
      })
      .map((note, index) => {
        return (
          <tr key={note.id} onClick={() => this.props.changeNote(note.id)}>
            <th scope="row">{index + 1}</th>
            <td>{note.text}</td>
            <td>
              <span>{String(note.done)}</span>
            </td>
          </tr>
        );
      });
  }

  render() {
    return (
      <div className="container" style={{ width: "100%" }}>
        <br />
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <h1 className="display-6 text-center">Notes</h1>

          <br />

          <div className="container d-flex justify-content-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className="btn btn-secondary active"
                style={{ minWidth: "120px" }}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  checked
                  onClick={this.props.setFilter.bind(this, "all")}
                />
                All
              </label>
              <label
                className="btn btn-secondary"
                style={{ minWidth: "120px" }}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  onClick={this.props.setFilter.bind(this, "fulfilled")}
                />
                Completed
              </label>
              <label
                className="btn btn-secondary"
                style={{ minWidth: "120px" }}
              >
                <input
                  type="radio"
                  name="options"
                  id="option3"
                  onClick={this.props.setFilter.bind(this, "no_fulfilled")}
                />
                Current
              </label>
            </div>
          </div>
          <br />
          {this.props.loading && this.props.updatedNotes.length !== 0 ? (
            <Loader />
          ) : (
            <table className="table table-striped">
              <col style={{ width: "10%" }} />
              <col style={{ width: "80%" }} />
              <col style={{ width: "10%" }} />
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Note</th>
                  <th scope="col">Status</th>
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
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              ref={this.newNoteInput}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-danger"
                type="button"
                id="button-addon2"
                onClick={() => {
                  let new_text = this.newNoteInput.current?.value || "";
                  const note: INote = {
                    id: "id" + this.props.updatedNotes.length,
                    text: new_text,
                    done: false,
                  };
                  this.props.addNote(note);
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
              className="btn btn-secondary"
              onClick={this.props.saveNotes.bind(this)}
              style={{ width: "200px" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
