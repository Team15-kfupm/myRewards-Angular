import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {v4 as uuidv4} from 'uuid';
import {randomBytes} from 'crypto';

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

async function CustomCashierLogin(ownerEmail: string) {
  try {
    const querySnapshot = await firestore.collection('users')
      .where('email', '==', ownerEmail)
      .where('role', '==', 'bo')
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return {success: false, error: "Does not exist"};
    }

    const ownerUid = querySnapshot.docs[0].id;
    const cashierQuerySnapshot = await firestore.collection('cashiers')
      .where('ownerUid', '==', ownerUid)
      .limit(1)
      .get();

    if (cashierQuerySnapshot.empty) {
      const result = await registerCashier(ownerUid);
      if (result.success) {
        const cashierCredential = await admin.auth().createCustomToken(result.uid!);
        return {success: true, cashierCredential};
      } else {
        return {success: false, error: "Cannot create new cashier"};
      }
    }

    const cashier = cashierQuerySnapshot.docs[0].data();
    const cashierCredential = await admin.auth().createCustomToken(cashier.cashierUid);
    return {success: true, cashierCredential};
  } catch (error) {
    console.error(error);
    return {success: false, error: "User not found"};
  }
}

export const generateCashierOTP = functions.https.onCall(async (data: { email: string }, context) => {
  try {
    const otp = Math.floor(100000 + randomBytes(3).readUIntBE(0, 3) % 900000).toString(); // generate a random 6-digit number
    await firestore.collection('temps/otp/cashiers')
      .doc().set({
        email: data.email,
        otp: otp,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    return {success: true};
  } catch (error) {
    console.error(error);
    return {success: false, error: "User not found"};
  }
});

export const scheduledDeleteOutDatedCashierOTP = functions.pubsub
  .schedule('every 30 minutes').onRun(async (context) => {
    const querySnapshot = await firestore.collection('temps/otp/cashiers')
      .where('createdAt', '<',
        new Date(admin.firestore.Timestamp.now().toDate().getTime() - 3 * 60 * 1000
        ));
    querySnapshot.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  });

export const cashierLoginWithOTP = functions.https.onCall(async (data: { email: string, otp: string }, context) => {
  try {
    const querySnapshot = await firestore.collection('temps/otp/cashiers')
      .where('email', '==', data.email)
      .where('otp', '==', data.otp)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return {success: false, error: "Incorrect OTP"};
    } else if (querySnapshot.docs[0].data().createdAt.toDate().getTime() < new Date(admin.firestore.Timestamp.now().toDate().getTime() - 3 * 60 * 1000).getTime()) {
      return {success: false, error: "OTP is expired"};
    }
    return await CustomCashierLogin(data.email);
  } catch (error) {
    console.error(error);
    return {success: false, error: "Where is an error with the OTP verification system"};
  }
});
