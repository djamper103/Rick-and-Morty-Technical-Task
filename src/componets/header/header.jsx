import React from "react"
import { NavLink } from "react-router-dom";
import style from "./header.module.css"


export default function Header(){

    return(
            <div className={style.container}>
            
                <div>
                    <img src={"https://media.cdn.adultswim.com/uploads/20210428/21428161947-rick-and-morty-logo-png.png"}/>
                </div>

                <NavLink to="/theCharacters">The Characters</NavLink>
                <NavLink to="/episodes">Episodes</NavLink>
                <NavLink to="/locations">Locations</NavLink>
                <NavLink to="/mywatchlist">My watch list</NavLink>  

            </div>
    )
}