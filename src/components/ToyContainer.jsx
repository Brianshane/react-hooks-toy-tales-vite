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



  return (
    <div id="toy-collection">{toys.map(toy =>(<ToyCard key={toy.id} toy={toy} />))}</div>
  );
}

export default ToyContainer;
