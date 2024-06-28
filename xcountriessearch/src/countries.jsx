import { useEffect, useState } from "react";
import styles from "./countryCard.module.css";




function CountryCard({name,flagImage,flagAltImage}){
    return(
        <div className={styles.countryCard}>
         <img src={flagImage} alt={flagAltImage}/>
         <h2>{name}</h2>
        </div>
    )
}

function Countries(){

    const apiEndPoint="https://restcountries.com/v3.1/all";
    const [countries,setCountries]=useState([]);
    const [search,setSearch]=useState("");

    async function fetchData(){
        try{
            const res=await fetch(apiEndPoint);
            const data=res.json();
             console.log("data:",data);
            setCountries(data);
            return data;
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    
    const filteredCountries = Array.isArray(countries)
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];
    return (
        <div style={{
            display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"
        }}>
            <div style={{margin:"20px",padding:"20px"}}>
            <input style={{width:"600px",height:"25px"}} type="text" placeholder="Search for countries" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {filteredCountries.map((country)=>(<CountryCard name={country.name.common} flagImage={country.flags.png} flagAltImage={country.flags.alt}/>))}


        </div>
    )
}
export default Countries;