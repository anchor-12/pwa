import firebase from 'firebase/compat/app'
import 'firebase/compat/database';

const oDB = firebase.initializeApp({
    databaseURL: "https://pwa-to-do-94a73-default-rtdb.asia-southeast1.firebasedatabase.app"
}).database();

export const oTodosinDB = oDB.ref('todos');