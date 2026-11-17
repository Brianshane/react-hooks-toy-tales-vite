
import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0
    };

    onAddToy(newToy);

    setName("");
    setImage("");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Toy's name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Toy's image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
        />

        <button type="submit">Add Toy</button>
      </form>
    </div>
  );
}

export default ToyForm;
