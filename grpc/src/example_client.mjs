import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const config = {
    apiKey: 'firebase-dummy-key',
    projectId: 'dummy-project-id'
};
firebase.initializeApp(config);
//firebase.firestore.setLogLevel('debug');

const db = firebase.firestore();
db.settings({
    host: 'localhost:6789',
    ssl: false
});


(async () => {

   

    const todos = db.collection('todos');
    const query = todos.where('todo', '==', 'item_1')
    
    console.log('running the query once =================');
    const snapshot = await query.get();
    
    let todo_id = null;
    if (snapshot.empty) {
      console.log('No matching documents.');
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      todo_id = doc.id
    });

    console.log('running the snapshot 1 =================');
    const query_completed = todos.where('completed', '==', true);
    query_completed.onSnapshot(r => {
      console.log(`====== new data for snapshot 1 (${r.size} items)`);
        r.forEach(function(doc) {
            console.log(doc.data());
        });
        console.log(`======`);
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    const today = (new Date()).toISOString().split('T')[0];
    console.log('running the snapshot 2 =================');
    const query_active = todos.where('completed', '==', false).where('createTime', '>=', today);
    query_active.onSnapshot(r => {
        console.log(`====== new data for snapshot 2 (${r.size} items)`);
        r.forEach(function(doc) {
            console.log(doc.data());
        });
        console.log(`======`);
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

   

    setTimeout(async function(){
        console.log(`===== updating one document (id = ${todo_id})`);
        await todos.doc(`${todo_id}`).update({completed: true});
    }, 5000);

    setTimeout(async function(){
      console.log(`===== updating one document (id = ${todo_id})`);
      await todos.doc(`${todo_id}`).update({completed: false});
  }, 10000);
    
    
})();