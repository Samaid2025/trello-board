import { createAction } from "redux-actions"

export const addBoard = createAction("ADD_BOARD");
export const addColumn = createAction("ADD_COLUMN");
export const addCard = createAction("ADD_CARD");
export const dragEnd = createAction("DRAG_END");
export const editCard = createAction('EDIT_CARD');
export const addLabel = createAction("ADD_LABEL");