import React from "react";

function ToyForm() {
  const [name ,setName] =useState('');
  const [image ,setImage]= useState('');
  function handleSubmit(e){
    e.preventDefault();
    //create new toy object with likes set to 0
    const newToy={
      name,
      image,
      likes:0
    };
    //call the function passed from parent to add the toy
    onAddToy(newToy);
    //cleaar form inputs
    setName('');
    setImage('');
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        name="name"
        placeholder="toy's name"
       value={name}
       onChange={e =>setName(e.target.value)}
       required
       />
       <input
       type="text"
       name="image"
       placeholder="toy's image url"
       value={image}
       onchange={e =>setImage(e.target.value)}
       required
       />
       <button type="submit">Add Toy</button>

      </form>
    </div>
  );
}

export default ToyForm;
