import { all, takeEvery, call, put, delay } from 'redux-saga/effects';
import {
  fetchUsersSucess,
  fetchUsersFailure
} from './slice';

// API USERS:  https://jsonplaceholder.typicode.com/users
import axios from 'axios';

function* fetchUsers() {

  try {
    yield delay(2000);
    const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users")
    yield put(fetchUsersSucess(response.data));
    
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
    
  }

}

export default all([
  takeEvery("user/fetchUsers", fetchUsers)
]);