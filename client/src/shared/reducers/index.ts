import { combineReducers } from 'redux';

import student, { StudentState } from '../../entities/students/student.reducer';

export interface IRootState {
  readonly student?: StudentState;
}

const rootReducer = combineReducers<IRootState>({
  student,
});

export default rootReducer;
