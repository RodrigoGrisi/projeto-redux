import { all, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects';
import {
  fetchUsersSucess,
  fetchUsersFailure,
  fetchUserByIdSucess,
  fetchUserByIdFailure,
} from './slice';

// API USERS:  https://jsonplaceholder.typicode.com/users
import axios from 'axios';

function* fetchUsers() {

  try {
    const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users")
    yield put(fetchUsersSucess(response.data));

  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// USAR O * PARA ENTENDER QUE ELA É UMA GENERATOR ASSIM COMO UM ASYNC
function* fetchUserById(action) {

  const userId = action.payload;

  try {
    yield delay(1000);
    const response = yield call(axios.get,
      `https://jsonplaceholder.typicode.com/users/${userId}`)
    yield put(fetchUserByIdSucess(response.data))
  } catch (error) {
    yield put(fetchUserByIdFailure(error.message))

  }
}

export default all([
  takeLatest("user/fetchUsers", fetchUsers),
  takeEvery("user/fetchUserById", fetchUserById)
]);