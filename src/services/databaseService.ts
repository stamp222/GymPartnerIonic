import firebase from 'firebase';

export class DataBaseService {

    singup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
        firebase.auth().signOut();
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }
}