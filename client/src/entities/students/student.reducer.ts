import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, ICrudGetAllAction, ICrudGetAction } from '../../shared/reducers/action-type.util';

import { IStudent, defaultValue } from '../../shared/model/student.model';
import { IError, ILinks } from '../../shared/reducers/interfaces';
import parseHeaderForLinks from '../../shared/parseHeaderForLinks';

export const ACTION_TYPES = {
	FETCH_STUDENT_LIST: 'student/FETCH_STUDENT_LIST',
	FETCH_STUDENT: 'student/FETCH_STUDENT',
	ADD_STUDENT: 'student/ADD_STUDENT',
	UPDATE_STUDENT: 'student/UPDATE_STUDENT',
	DELETE_STUDENT: 'student/DELETE_STUDENT',
	CHECKED_STUDENT: 'student/CHECKED_STUDENT',
	DELETE_BATCH_STUDENT: 'student/DELETE_BATCH_STUDENT',
	RESET: 'student/RESET',
};

const initialState = {
	loading: false,
	updating: false,
	updateSuccess: false,
	errorMessage: null as IError | null,
	entities: [] as ReadonlyArray<IStudent>,
	entity: defaultValue,
	links: { next: 0 } as ILinks,
	totalItems: 0,
	checked: {} as { [key: string]: boolean }
};

export type StudentState = Readonly<typeof initialState>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: StudentState = initialState, action: any): StudentState => {
	switch (action.type) {
		case REQUEST(ACTION_TYPES.FETCH_STUDENT_LIST):
		case REQUEST(ACTION_TYPES.FETCH_STUDENT):
			return {
				...state,
				errorMessage: null,
				updateSuccess: false,
				loading: true,
				checked: {}
			};
		case REQUEST(ACTION_TYPES.ADD_STUDENT):
		case REQUEST(ACTION_TYPES.UPDATE_STUDENT):
		case REQUEST(ACTION_TYPES.DELETE_STUDENT):
		case REQUEST(ACTION_TYPES.DELETE_BATCH_STUDENT):
			return {
				...state,
				errorMessage: null,
				updateSuccess: false,
				updating: true,
				checked: {}
			};
		case FAILURE(ACTION_TYPES.FETCH_STUDENT_LIST):
		case FAILURE(ACTION_TYPES.FETCH_STUDENT):
		case FAILURE(ACTION_TYPES.ADD_STUDENT):
		case FAILURE(ACTION_TYPES.UPDATE_STUDENT):
		case FAILURE(ACTION_TYPES.DELETE_STUDENT):
		case FAILURE(ACTION_TYPES.DELETE_BATCH_STUDENT):
			return {
				...state,
				loading: false,
				updating: false,
				updateSuccess: false,
				errorMessage: action.payload,
			};
		case SUCCESS(ACTION_TYPES.FETCH_STUDENT_LIST): {
			const links = parseHeaderForLinks(action.payload.headers.link);
			const entities: IStudent[] = action.payload.data ?? [];
			const checked: { [key: string]: boolean } = {};
			entities.map(({ _id }) => {
				if (typeof _id === 'string')
					checked[_id] = false;
			})
			return {
				...state,
				loading: false,
				links,
				entities,
				checked,
				totalItems: parseInt(action.payload.headers['x-total-count'], 10),
			};
		}
		case SUCCESS(ACTION_TYPES.FETCH_STUDENT):
			return {
				...state,
				loading: false,
				entity: action.payload.data,
			};
		case SUCCESS(ACTION_TYPES.ADD_STUDENT):
		case SUCCESS(ACTION_TYPES.UPDATE_STUDENT):
		case SUCCESS(ACTION_TYPES.DELETE_STUDENT):
		case SUCCESS(ACTION_TYPES.DELETE_BATCH_STUDENT):
			return {
				...state,
				updating: false,
				updateSuccess: true,
			};
		case ACTION_TYPES.CHECKED_STUDENT:
			return {
				...state,
				checked: { ...state.checked, [action.payload.id]: action.payload.checked }
			}
		case ACTION_TYPES.RESET:
			return {
				...initialState,
			};
		default:
			return state;
	}
}

const apiUrl = 'students';

// Actions

export const getEntities: ICrudGetAllAction<IStudent> = (page = 1) => {
	const requestUrl = `${apiUrl}?page=${page}`;
	return {
		type: ACTION_TYPES.FETCH_STUDENT_LIST,
		payload: axios.get<IStudent>(`${requestUrl}&cacheBuster=${new Date().getTime()}`),
	};
};

export const getEntity: ICrudGetAction<IStudent> = id => {
	const requestUrl = `${apiUrl}/${id}`;
	return {
		type: ACTION_TYPES.FETCH_STUDENT,
		payload: axios.get<IStudent>(requestUrl),
	};
};

export const updateStudent = (id: any, model: any) => {
	const requestUrl = `${apiUrl}/${id}`;
	return {
		type: ACTION_TYPES.UPDATE_STUDENT,
		payload: axios.put<any>(requestUrl, model),
	};
};

export const createStudent = (model: any) => {
	const requestUrl = apiUrl;
	return {
		type: ACTION_TYPES.ADD_STUDENT,
		payload: axios.post<any>(requestUrl, model),
	};
};

export const deleteStudent = (id: any) => {
	const requestUrl = `${apiUrl}/${id}`;
	return {
		type: ACTION_TYPES.DELETE_STUDENT,
		payload: axios.delete<any>(requestUrl),
	};
};

export const deleteBatchStudent = (model: any) => {
	const requestUrl = `${apiUrl}/deletemany`;
	return {
		type: ACTION_TYPES.DELETE_BATCH_STUDENT,
		payload: axios.post<any>(requestUrl, model),
	};
};

export const checkedStudent = (id: any, checked: boolean) => {
	return {
		type: ACTION_TYPES.CHECKED_STUDENT,
		payload: { id, checked }
	}
}

export const reset = () => ({
	type: ACTION_TYPES.RESET,
});