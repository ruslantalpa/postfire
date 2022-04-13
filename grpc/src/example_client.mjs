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
    host: 'localhost:8443',
    ssl: true
});


(async () => {

   

    const todosRef = db.collection('todos');
    const query = todosRef.where('todo', '==', 'item_1')
    
    console.log('running the query once =================');
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });

    // console.log('running the snapshot 1 =================');
    // const query_completed = todosRef.where('completed', '==', true);
    // query_completed.onSnapshot(r => {
    //     console.log('new completed');
    //     r.forEach(function(doc) {
    //         console.log(doc.data());
    //     });
    //     console.log(`Received query snapshot of size ${r.size}`);
    // }, err => {
    //     console.log(`Encountered error: ${err}`);
    // });

    // const today = (new Date()).toISOString().split('T')[0];
    // console.log('running the snapshot 2 =================');
    // const query_active = todosRef.where('completed', '==', false).where('createTime', '>=', today);
    // query_active.onSnapshot(r => {
    //     console.log('new active');
    //     r.forEach(function(doc) {
    //         console.log(doc.data());
    //     });
    //     console.log(`Received query snapshot of size ${r.size}`);
    // }, err => {
    //     console.log(`Encountered error: ${err}`);
    // });

   

    // setTimeout(async function(){
    //     console.log('updating one document ==============');
    //     await db.collection('cities').doc('LA').update({capital: true});
    // }, 5000);
    
    
})();