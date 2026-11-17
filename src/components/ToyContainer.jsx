import React, { useEffect,useState } from "react";
import ToyCard from "./ToyCard";
import {API_URL} from "./API";
function ToyContainer() {
  const [toys, setToys]=useState([]);
  useEffect(()=>{
    fetch(API_URL)
.then(response=>response.json())
.then(data =>setToys(data))
.catch(error=>console.error("error fetching toys"))
    
  },[]);
 function handleAddToy(newToy) {
    // POST request to backend to save the new toy
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(savedToy => {
        // Update state with the newly saved toy
        setToys([...toys, savedToy]);
      })
      .catch(error => console.error('Error adding toy:', error));
  }

  return (
    <>
    <ToyForm onAddToy={handleAddToy} />
    <div id="toy-collection">{toys.map(toy =>(<ToyCard key={toy.id} toy={toy} />))}</div>
  </>
  );
}

export default ToyContainer;
