import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BasicPagination from "../../comon/pagination"
import ItemFilter from '../../comon/itemFilter'
import Modal from "../modal/modal"
import style from "./theCharacters.module.css"


export default function TheCharacters() {
    const [state,setState]=useState([])
    const [page,setPage]=useState(1)
    const [pagesCount,setPagesCount]=useState(1)

    const [species,setSpecies]=useState("All")
    const [speciesUnique,setSpeciesUnique]=useState()

    const [status,setStatus]=useState("All")
    const [statusUnique,setStatusUnique]=useState()

    const [gender,setGender]=useState("All")
    const [genderUnique,setGenderUnique]=useState()

    const [stateFilter,setStateFilter]=useState([])

    const [modalActive,setModalActive]=useState(false)

    const[modalItem,setModalItem]=useState()

    function onPageChange(pageCount) {
        setPage(pageCount)
    }

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(respons=>{
            setState([...respons.data.results])
            setPagesCount(respons.data.info.pages)
        })
    },[page])

    useEffect(() => {
        let b=[...state]
        let a=new Set (b.map(item=>item["species"]))
        let c=new Set (b.map(item=>item["status"]))
        let d=new Set (b.map(item=>item["gender"]))

        setSpeciesUnique(["All",...a])
        setStatusUnique(["All",...c])
        setGenderUnique(["All",...d])
    }, [state])

    useEffect(() => {
        let a={
            species,
            status,
            gender
        }
        setStateFilter(ItemFilter(state,a))
    }, [species,status,gender,state])

    return (
        <div className={style.container}>
            
            <h3>The Characters</h3>

            <div className={style.containerSelect}>

                <div className={style.selectSpecies}>

                    <h3>Species select</h3>
                    
                    <select name="select" onChange={event => { setSpecies(event.target.value) }}>
                        {
                            speciesUnique!=undefined&&speciesUnique.length>0?speciesUnique.map(item=>(
                                    <option value={item}>{item}</option>
                        )):"Data has not been loaded yet"
                        }
                    </select>

                </div>

                <div className={style.selectStatus}>

                    <h3>Status select</h3>

                    <select name="select" onChange={event => { setStatus(event.target.value) }}>
                        {
                            statusUnique!=undefined&&statusUnique.length>0?statusUnique.map(item=>(
                                    <option value={item}>{item}</option>
                        )):"Data has not been loaded yet"
                        }
                    </select>

                </div>

                <div className={style.selectGender}>

                    <h3>Gender select</h3>

                    <select name="select" onChange={event => { setGender(event.target.value) }}>
                        {
                            genderUnique!=undefined&&genderUnique.length>0?genderUnique.map(item=>(
                                    <option value={item}>{item}</option>
                        )):"Data has not been loaded yet"
                        }
                    </select>

                </div>

            </div>

            <div className={style.containerMain}>
                {   
                    stateFilter!=undefined&&stateFilter.length>0?stateFilter.map(item=>(
                        <div key={item.id} className={style.mainContent}
                            onClick={()=>{
                                setModalActive(true)
                                setModalItem([item.image,item.name,item.status,item.species,
                                item.type,item.location.name,item.origin.name,item.origin.url])
                            }}
                        >
                            <img src={item.image?item.image:"https://rickandmortyapi.com/api/character/avatar/19.jpeg"}/>

                            <div className={style.person}>

                                <div className={style.name}>
                                    {item.name}
                                    <div className={style.originName}>{item.originName}</div>
                                </div>

                                <div className={style.status}>
                                    <div className={item.status==="Alive"?style.statusAlive:style.statusDead}></div> {item.status}-{item.species}
                                </div>

                                <div className={style.type}>
                                    <span>Type</span>
                                    <div>{item.type?item.type:"   unknown"}</div>
                                </div>

                                <div className={style.location}>
                                    <span>Last known location</span>
                                    <div>{item.location.name?item.location.name:"   unknown"}</div>
                                </div>
                                
                            </div>

                        </div>

                    )):"Data has not been loaded yet"
                }
            </div>
            
            <BasicPagination pagesCount={pagesCount} onPageChange={onPageChange}/>

            {modalActive?<Modal modalActive={modalActive} setModalActive={setModalActive} modalItemCharacters={modalItem} />:null}
        
        </div>    
    )
}
