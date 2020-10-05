import firebaseConfig from '../../firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";

// firebase initialize
export const initializeLoginFrameworkFirebase = () => {
    firebase.initializeApp(firebaseConfig);
}

// for google sign in
export const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
        const {displayName, email, photoURL} = res.user;
        const loggedInUser = {
            isSignedIn: true,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            admin: false,
            error: '',
          };
        return loggedInUser;
    })
    .catch(function(error) {
        const loggedInUser = {
            isSignedIn: false,
            displayName: '',
            email: '',
            photoURL: '',
            admin: false,
            error: error.message
          };
        return loggedInUser;
    });
}

// for creating or register an admin
export const adminEmailRegister = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const signUpResponse = {
            success: true,
            error: '',
          };
        return signUpResponse
    })
    .catch(function(error) {
        const signUpResponse = {
            success: false,
            error: error.message,
          };
        return signUpResponse
      });
}

//for logging in the admin
export const adminEmailLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    const {displayName, email, photoURL} = res.user;
    const loggedInUser = {
        isSignedIn: true,
        displayName: displayName,
        email: email,
        photoURL: photoURL || 'https://i.ibb.co/3M1LjjY/default-user.png', //for setting default admin image
        admin: true,
        error: '',
      };
    return loggedInUser;
})
.catch(function(error) {
    const loggedInUser = {
        isSignedIn: false,
        displayName: '',
        email: '',
        photoURL: '',
        admin: false,
        error: error.message
      };
    return loggedInUser;
});
}

// for update the created admin user name
export const adminUpdateUser = (fullName) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: fullName,
    }).then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    });
}

//for user sign out
export const userSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
        const loggedInUser = {
            isSignedIn: false,
            displayName: '',
            email: '',
            photoURL: '',
            admin: false,
            error: '',
          };
        return loggedInUser;
    })
    .catch(function(error) {
        const loggedInUser = {
            error: error.message
          };
        return loggedInUser;
    });
}