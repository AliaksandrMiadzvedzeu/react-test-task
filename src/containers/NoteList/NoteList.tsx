import React, { Component, createRef } from "react";
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
        if (this.props.filter === "completed") {
          return value.done;
        } else if (this.props.filter === "waiting") {
          return !value.done;
        } else if (this.props.filter === "all") return true;
      })
      .map((note, index) => {
        return (
          <tr key={note.id}>
            <th scope="row">{index + 1}</th>
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
                  {note.done ? "completed" : "waiting"}
                </label>
              </div>
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
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={this.props.setFilter.bind(this, "all")}
                checked={this.props.filter === "all"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                All
              </label>
            </div>
            <br />
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={this.props.setFilter.bind(this, "completed")}
                checked={this.props.filter === "completed"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Completed
              </label>
            </div>

            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onChange={this.props.setFilter.bind(this, "waiting")}
                checked={this.props.filter === "waiting"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Waiting
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
