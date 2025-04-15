"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./dataSpacex.module.css";
export default function fairingsSpace() {

const url = "https://api.spacexdata.com/v4/launches/"; //link API externa
const [Launcher, setLauncher] = useState([]);
const [loading, SetLoading] = useState(true);
const [error, setError] = useState(null); 
useEffect(() => {
 const FairingSpaceX = async () => {
  try {
    SetLoading(true)
    const response = await axios.get(url); 
    setLauncher(response.data);
    SetLoading(false)
  } catch (error) {
    console.log("Erro ao buscar dados na API");
    setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
    SetLoading(false)
  } 
 }
 FairingSpaceX();
}, [])
  
if (loading) {
  return (
    <div className= {styles.loading}>
     Carregando dados...
    </div>
  )
}

if (error) {
  return (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  );
}


  return (
    <div className={styles.container}>
      <h1>Dados de Lancaçamentos SpaceX</h1>
      <div className={styles.grid}>
        {Launcher.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.links.patch.small} alt="" />
            <h2>{item.name}</h2>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}