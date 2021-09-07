import React,{useState,useEffect} from 'react'
import style from "./table.module.css"


export default function Table({stateEpisodes,stateLocation,setModalActive,setModalItem}) {

    const [state,setState]=useState([])

    useEffect(()=>{
        if(stateEpisodes){
            setState([...stateEpisodes])
        }else if(stateLocation){
            setState([...stateLocation])
        }
    },[stateEpisodes,stateLocation])
    
    return (
        <div className={style.table}>

            <table className={style.table}>

                <thead>

                <tr>

                    <th >
                        Name
                    </th>

                    <th>
                        {stateEpisodes?"Date":"Type"}
                    </th>

                    <th>
                        {stateEpisodes?"Episode":"Dimension"}
                    </th> 
                    
                </tr>

                </thead>

                <tbody>
                
                {   
                    state!=undefined&&state.length>0?state.map(item=>(
                        stateEpisodes?
                        <>

                            <tr key={item.id}  onClick={()=>{
                                setModalActive(true)
                                setModalItem([item.name,item.air_date,item.episode])
                                }}>

                                    <td>{item.name}</td>
                                    
                                    <td>{item.air_date}</td>
                                    
                                    <td>{item.episode}</td>

                            </tr>

                        </>:
                        <>

                            <tr key={item.id}  onClick={()=>{
                                setModalActive(true)
                                setModalItem([item.name,item.type,item.dimension])
                                }}>

                                    <td>{item.name}</td>
                                    
                                    <td>{item.type}</td>
                                    
                                    <td>{item.dimension}</td>
                                    
                            </tr>

                        </>
                    )):"Data has not been loaded yet"
                }

                </tbody>
            </table>
        </div>
    )
}
