import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FIREBASE_DB } from '../FireBase.config';
// Define message type
interface Message {
  id: string;
  text: string;
  sender: string;
  senderId: string;
  senderPhoto?: string;
  senderEmail?: string;
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
}

const useMessages = (): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(FIREBASE_DB, 'messages'), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      }));

      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  return messages;
};

export default useMessages;
