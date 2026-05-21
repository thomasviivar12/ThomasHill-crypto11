// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC39kwMyETNvaHY-KezEKkOZV427s60vs",
  authDomain: "adminpanel-55a5c.firebaseapp.com",
  projectId: "adminpanel-55a5c",
  storageBucket: "adminpanel-55a5c.firebasestorage.app",
  messagingSenderId: "356063021629",
  appId: "1:356063021629:web:d980b168b69b1de701b854"
};

// Initialize Firebase (only if not already initialized)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Auth instance
const auth = firebase.auth();

// Get Firestore instance
const db = firebase.firestore();

// Firebase Helper Functions
async function signUpUser(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log("User signed up:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error.message);
    alert(error.message);
    throw error;
  }
}

async function signInUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log("User signed in:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error.message);
    alert(error.message);
    throw error;
  }
}

async function signOutUser() {
  try {
    await auth.signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error.message);
    alert(error.message);
  }
}

function onAuthStateChange(callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in:", user.email);
      callback(user);
    } else {
      console.log("User is signed out");
      callback(null);
    }
  });
}

function getCurrentUser() {
  return auth.currentUser;
}

// Get user crypto balances
async function getUserBalances(uid) {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      return {
        bitcoin: data.balances?.bitcoin || 0,
        ethereum: data.balances?.ethereum || 0,
        usdt: data.balances?.usdt || 0,
        bnb: data.balances?.bnb || 0,
        usdc: data.balances?.usdc || 0,
        xrp: data.balances?.xrp || 0,
        ada: data.balances?.ada || 0,
        sol: data.balances?.sol || 0,
        doge: data.balances?.doge || 0,
        matic: data.balances?.matic || 0,
        dot: data.balances?.dot || 0,
        avax: data.balances?.avax || 0,
        link: data.balances?.link || 0,
        usdBalance: data.balance || 0
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching balances:", error);
    return null;
  }
}
