import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {v4 as uuidv4} from 'uuid';

admin.initializeApp({
  serviceAccountId: 'myrewards-e3b0c@appspot.gserviceaccount.com'
});
const firestore = admin.firestore();
firestore.settings({ignoreUndefinedProperties: true});

interface User {
  email: string;
  password: string;
}

interface Owner {
  ownerUid: string;
  organizationName: string;
  passphrase: string;
}

interface Cashier {
  cashierUid: string;
  ownerUid: string;
}

exports.registerOwner = functions.https.onCall(async (data: User, context) => {
  const {email, password} = data;
  try {
    const result = await registerUser(email, 'bo', password);
    if (result.success) {
      const uid = result.userRecord!.uid;
      const owner: Owner = {
        ownerUid: uid,
        organizationName: 'Example Organization Name',
        passphrase: 'admin',
      };
      await firestore.collection('owners').doc(uid).set(owner);
      return {success: true, uid};
    } else {
      return {success: false, error: 'Registration failed'};
    }
  } catch (error) {
    console.error(`Error registering new owner: ${error}`);
    return {success: false, error};
  }
});


async function registerUser(email: string, role: string, password: string) {
  try {

    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      emailVerified: true, // for development purposes only
      email,
      password, // Set the user's password during registration
    });

    // Create a new Firestore document for the user with the specified role
    const userDocRef = firestore.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`New user registered with email: ${email} and role: ${role}`);

    return {success: true, userRecord: userRecord};
  } catch (error) {
    console.error(`Error registering new user: ${error}`);
    return {success: false, error};
  }
}


async function registerCashier(ownerUid: string) {
  try {
    const email = `${uuidv4()}@myRewards.com`; // create a unique email address for the user

    const result = await registerUser(
      email,
      'cashier',
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    );

    if (result.success) {
      const uid = result.userRecord!.uid;
      const cashier: Cashier = {
        cashierUid: uid,
        ownerUid: ownerUid,
      };
      await firestore.collection('cashiers').doc(uid).set(cashier);
      return {success: true, uid};
    } else {
      return {success: false, error: 'Registration failed'};
    }
  } catch (error) {
    console.error(`Error registering new cashier: ${error}`);
    return {success: false, error};
  }
}

export const cashierLogin = functions.https.onCall(async (data: { passphrase: string }, context) => {
  try {
    const querySnapshot = await firestore.collection('owners')
      .where('passphrase', '==', data.passphrase)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return {success: false, error: "Incorrect passphrase"};
    }

    const owner: Owner = querySnapshot.docs[0].data() as Owner;
    const cashierQuerySnapshot = await firestore.collection('cashiers')
      .where('ownerUid', '==', owner.ownerUid)
      .limit(1)
      .get();

    if (cashierQuerySnapshot.empty) {
      const result = await registerCashier(owner.ownerUid);
      if (result.success) {
        const cashierCredential = await admin.auth().createCustomToken(result.uid!);
        return {success: true, cashierCredential};
      } else {
        return {success: false,error: "Cannot create new cashier"};
      }
    }

    const cashier = cashierQuerySnapshot.docs[0].data();
    const cashierCredential = await admin.auth().createCustomToken(cashier.cashierUid);
    return {success: true,cashierCredential};
  } catch (error) {
    console.error(error);
    return {success: false,error: "User not found"};
  }
});
