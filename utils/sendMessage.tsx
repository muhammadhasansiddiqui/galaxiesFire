import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../FireBase.config';

interface UserType {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
}

const sendMessage = async (text: string, user: UserType): Promise<void> => {
  if (!text.trim()) return;

  try {
    await addDoc(collection(FIREBASE_DB, 'messages'), {
      text,
      sender: user.displayName || user.email.split('@')[0],
      senderId: user.uid,
      senderPhoto: user.photoURL || '',
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export default sendMessage;
