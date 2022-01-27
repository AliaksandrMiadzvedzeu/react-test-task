import React, { Component } from "react";
import { FilterTypes } from "./FilterTypes";
import { INote } from "../../store/notes/reducers";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { changeNote, removeNote } from "../../store/notes/actions";
import { connect } from "react-redux";
import { NoteAction } from "../../store/notes/actionTypes";

interface OwnProps {
  getFilteredNotes: (filter: string) => Array<INote>;
}

interface DispatchProps {
  removeNote: (id: string) => void;
  changeNote: (id: string) => void;
}
interface StateProps {
  updatedNotes: Array<INote>;
  filter: string;
}

type Props = StateProps & DispatchProps & OwnProps;

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    filter: state.note.filter,
    updatedNotes: state.note.updatedNotes,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<ApplicationState, unknown, NoteAction>
): DispatchProps {
  return {
    changeNote: (id: string) => dispatch(changeNote(id)),
    removeNote: (id: string) => dispatch(removeNote(id)),
  };
}

class NoteTable extends Component<Props> {
  renderNotes() {
    return this.props.getFilteredNotes(this.props.filter).map((note) => {
      return (
        <tr key={"note-" + note.id}>
          <td>
            <span style={{ wordBreak: "break-word" }}>{note.text} </span>
          </td>
          <td>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={"flexCheckChecked" + note.id}
                checked={!note.done}
                onChange={() => this.props.changeNote(note.id)}
              />
              <label
                className="form-check-label"
                htmlFor={"flexCheckChecked" + note.id}
              >
                {note.done ? FilterTypes.COMPLETED : FilterTypes.WAITING}
              </label>
            </div>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary"
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
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "80%" }} scope="col">
              Note
            </th>
            <th style={{ width: "110px" }} scope="col">
              Status
            </th>
            <th style={{ width: "10%" }} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{this.renderNotes()}</tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTable);
