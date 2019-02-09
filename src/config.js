import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBtklAJ3LniqGDapAvQ5NoPUN58TwNpjYQ",
  authDomain: "lifetrack-27cd1.firebaseapp.com",
  databaseURL: "https://lifetrack-27cd1.firebaseio.com",
  projectId: "lifetrack-27cd1",
  storageBucket: "lifetrack-27cd1.appspot.com",
  messagingSenderId: "396651915566",
};

export const firebaseApp = Firebase.initializeApp(config);