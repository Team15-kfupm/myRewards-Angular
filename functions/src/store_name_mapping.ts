import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import natural from 'natural';

const levenshtein = natural.LevenshteinDistance;
const { JaroWinklerDistance } = natural;

interface Transaction {
  storeName: string;
  // add other properties here if necessary
}

interface Store {
  storeName: string;
  // add other properties here if necessary
}

function cleanStoreName(storeName: string): string {
  storeName = storeName.toLowerCase();
  storeName = storeName.replace(/[^\w\s]/gi, '').trim();
  return storeName;
}

function findClosestStoreName(
  transactionStoreName: string,
  registeredStoreNames: string[],
): string | null {
  transactionStoreName = cleanStoreName(transactionStoreName);
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestStoreName: string | null = null;
  for (let i = 0; i < registeredStoreNames.length; i++) {
    let registeredStoreName = cleanStoreName(registeredStoreNames[i]);
    let distance = levenshtein(transactionStoreName, registeredStoreName);
    if (distance < minDistance) {
      minDistance = distance;
      closestStoreName = registeredStoreNames[i];
    }
  }
  return closestStoreName;
}

export const checkStoreName = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate((snapshot, context) => {
    const transaction: Transaction = snapshot.data() as Transaction;
    const transactionStoreName = transaction.storeName;
    const storesRef = admin.firestore().collection('stores');
    const query = storesRef.orderBy('storeName');

    return query.get().then((querySnapshot) => {
      const registeredStoreNames: string[] = [];
      querySnapshot.forEach((doc) => {
        registeredStoreNames.push(doc.data().storeName);
      });
      const closestStoreName = findClosestStoreName(
        transactionStoreName,
        registeredStoreNames,
      );
      if (closestStoreName) {
        const similarity = JaroWinklerDistance(
          cleanStoreName(closestStoreName),
          transactionStoreName,
        );
        if (similarity > 0.85) {
          return snapshot.ref.set(
            {
              storeName: closestStoreName,
            },
            { merge: true },
          );
        }
      }
      return null;
    });
  });