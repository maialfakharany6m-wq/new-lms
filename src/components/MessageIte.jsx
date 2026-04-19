import { useEffect, useState } from "react";
import { db, auth } from "../api/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

export default function Chat({ courseId }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!courseId) return;

    const q = query(
      collection(db, "chats", courseId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => d.data()));
    });

    return () => unsub();
  }, [courseId]);

  const sendMessage = async () => {
    if (!msg) return;

    await addDoc(collection(db, "chats", courseId, "messages"), {
      text: msg,
      senderId: auth.currentUser.uid,
      createdAt: new Date()
    });

    setMsg("");
  };

  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-white/10">

      <h2 className="font-bold mb-3">💬 Chat</h2>

      {/* messages */}
      <div className="h-[200px] overflow-y-auto mb-3 space-y-2">

        {messages.map((m, i) => (
          <div
            key={i}
            className="text-sm bg-[#1f2937] p-2 rounded"
          >
            {m.text}
          </div>
        ))}

      </div>

      {/* input */}
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="w-full p-2 bg-[#1f2937] rounded mb-2"
        placeholder="Write message..."
      />

      <button
        onClick={sendMessage}
        className="bg-yellow-500 text-black px-3 py-1 rounded"
      >
        Send
      </button>

    </div>
  );
}