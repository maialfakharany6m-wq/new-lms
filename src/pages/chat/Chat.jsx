import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export default function Chat() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 🔥 FETCH CHAT MESSAGES (REAL TIME)
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map(d => ({
          id: d.id,
          ...d.data()
        }))
      );
    });

    return () => unsub();
  }, []);

  // 💬 SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, "chats"), {
      senderId: auth.currentUser.uid,
      message,
      createdAt: serverTimestamp(),
      participants: [auth.currentUser.uid], // later we extend
      courseId: "general"
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        💬 LMS Chat
      </h1>

      {/* CHAT BOX */}
      <div className="h-[500px] overflow-y-auto bg-white/5 p-4 rounded-xl border border-white/10 mb-4">

        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-3 flex ${
              m.senderId === auth.currentUser.uid
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div className="bg-white/10 px-4 py-2 rounded-xl max-w-[60%]">
              {m.message}
            </div>

          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="flex gap-2">

        <input
          className="flex-1 p-3 rounded bg-white/10 border border-white/10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black px-6 rounded font-bold"
        >
          Send
        </button>

      </div>

    </div>
  );
}