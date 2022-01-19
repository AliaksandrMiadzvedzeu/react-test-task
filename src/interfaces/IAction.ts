import { INote } from "./INote";

export interface IAction {
  type: string;
  notes?: Array<INote>;
  updatedNotes?: Array<INote>;
  filterUpdatedNotes?: Array<INote>;
  filter?: string;
  message?: string;
}
