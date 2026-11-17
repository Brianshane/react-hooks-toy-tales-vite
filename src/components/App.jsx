import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import { API_URL } from "./API";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET: load toys when the app loads
  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch toys");
        return r.json();
      })
      .then(setToys)
      .catch(console.error);
  }, []);

  // POST: add a toy (called by ToyForm)
  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to add toy");
        return r.json();
      })
      .then((savedToy) => setToys((prev) => [...prev, savedToy]))
      .catch(console.error);
  }

  // PATCH: like a toy
  function handleLike(id, likes) {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to like toy");
        return r.json();
      })
      .then((updated) =>
        setToys((prev) => prev.map((t) => (t.id === id ? updated : t)))
      )
      .catch(console.error);
  }

  // DELETE: remove a toy
  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete toy");
        setToys((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(console.error);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={() => setShowForm((show) => !show)}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;