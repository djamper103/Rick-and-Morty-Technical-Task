import React from 'react'
import style from "./modal.module.css"

export default function Modal({modalActive, setModalActive ,modalItemCharacters=[],modalItemEpisodes=[],modalItemLocations=[]}) {

    const[image,nameModal,status,species,typeCharacters,locationName,originName]=[...modalItemCharacters]
    const[nameEpisodes,air_date,episode]=[...modalItemEpisodes]
    const[nameLocations,typeLocations,dimension]=[...modalItemLocations]
    
    return (
        <div className={modalActive?style.containerActive:style.container} onClick={()=>setModalActive(false)}>

            <div className={style.content} onClick={(e)=>e.stopPropagation()}>
                {
                    modalItemCharacters.length>0?
                    
                        <div className={style.mainContent}>

                            <img src={image}/>

                            <div className={style.person}>

                                <div className={style.name}>
                                    {nameModal}
                                    <div className={style.originName}>{originName}</div>
                                </div>

                                <div className={style.status}>
                                    <div className={status==="Alive"?style.statusAlive:style.statusDead}></div> {status}-{species}
                                </div>

                                <div className={style.type}>
                                    <span>Type</span>
                                    <div>{typeCharacters?typeCharacters:"   unknown"}</div>
                                </div>

                                <div className={style.location}>
                                    <span>Last known location</span>
                                    <div>{locationName?locationName:"   unknown"}</div>
                                </div>

                            </div>
                    
                        </div>

                    :modalItemEpisodes.length>0?

                        <div className={style.item}>

                            <div>
                                <span>Episode:</span>{episode} 
                            </div>

                            <div>
                                <span>Date:</span>{air_date}
                            </div>

                            <div>
                                <span>Locations:</span>{nameEpisodes} 
                            </div>

                        </div>

                    :modalItemLocations.length>0?

                        <div className={style.item}>

                            <div>
                                <span>Name Locations:</span>{nameLocations}
                            </div>

                            <div>
                                <span>Type:</span>{typeLocations}
                            </div>

                            <div>
                                <span>Dimension:</span>{dimension} 
                            </div>

                        </div>

                    :"Data has not been loaded yet"

                }
            </div>

        </div>
    )
}
