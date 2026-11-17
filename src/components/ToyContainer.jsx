
import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";
import { API_URL } from "./API";

function ToyContainer({ showForm }) {
  const [toys, setToys] = useState([]);

  // GET: Fetch all toys
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys");
        }
        return response.json();
      })
      .then(data => setToys(data))
      .catch(error => console.error(error));
  }, []);

  // POST: Add a toy
  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to add toy");
        }
        return response.json();
      })
      .then(savedToy => {
        setToys(previousToys => [...previousToys, savedToy]);
      })
      .catch(error => console.error(error));
  }

  // PATCH: Like a toy
  function handleLike(id, likes) {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to like toy");
        }
        return response.json();
      })
      .then(updatedToy => {
        setToys(previousToys =>
          previousToys.map(toy =>
            toy.id === id ? updatedToy : toy
          )
        );
      })
      .catch(error => console.error(error));
  }

  // DELETE: Remove a toy
  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }

        setToys(previousToys =>
          previousToys.filter(toy => toy.id !== id)
        );
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {showForm && <ToyForm onAddToy={handleAddToy} />}

      <div id="toy-collection">
        {toys.map(toy => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default ToyContainer;
