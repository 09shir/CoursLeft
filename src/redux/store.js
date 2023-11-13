import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './board';
import refreshReducer from './refresh';

export default configureStore({
    reducer: {
        boardCounter: boardReducer,
        refreshBoard: refreshReducer
    }

});