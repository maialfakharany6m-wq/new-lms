import { useState } from "react";
import { useParams } from "react-router-dom";
import { storage, db, auth } from "../../api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function AssignmentUpload() {
  const { id } = useParams();

  const [file, setFile] = useState(null);

  const submit = async () => {
    const fileRef = ref(storage, `assignments/${file.name}`);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, "courses", id, "assignments"), {
      studentId: auth.currentUser.uid,
      fileUrl: url,
      status: "pending",
      createdAt: new Date()
    });

    alert("Submitted!");
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-2xl mb-4">📤 Upload Assignment</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={submit}
        className="bg-yellow-500 text-black px-4 py-2 mt-4"
      >
        Submit
      </button>

    </div>
  );
}