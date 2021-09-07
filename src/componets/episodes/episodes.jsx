import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BasicPagination from "../../comon/pagination"
import ItemFilter from '../../comon/itemFilter'
import Modal from "../modal/modal"
import style from "./episodes.module.css"
import Table from '../Table/table'


export default function Episodes() {
    const [state,setState]=useState([])
    const [page,setPage]=useState(1)
    const [pagesCount,setPagesCount]=useState(1)

    const [name,setName]=useState("All")
    const [nameUnique,setNameUnique]=useState()

    const [stateFilter,setStateFilter]=useState([])

    const [modalActive,setModalActive]=useState(false)
    const [modalItem,setModalItem]=useState()

    function onPageChange(pageCount) {
        setPage(pageCount)
    }

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
        .then(respons=>{
            setState([...respons.data.results])
            setPagesCount(respons.data.info.pages)
        })
    },[page])

    useEffect(() => {
        let b=[...state]
        let a=new Set (b.map(item=>item["name"]))
        setNameUnique(["All",...a])
    }, [state])

    useEffect(() => {
        let a={
            name
        }
        setStateFilter(ItemFilter(state,a))
    }, [name,state])

    return (
        <div className={style.container}>

            <h3>Episodes</h3>
    
            <div className={style.containerSelect}>

                <h3>Name select</h3>

                <select name="select" onChange={event => {setName(event.target.value)}}>
                    {
                        nameUnique!=undefined&&nameUnique.length>0?nameUnique.map(item=>(
                                <option value={item}>{item}</option>
                    )):"Data has not been loaded yet"
                    }
                </select>

            </div>
            
            <Table stateEpisodes={stateFilter} setModalActive={setModalActive} setModalItem={setModalItem}/>  

            <BasicPagination pagesCount={pagesCount} onPageChange={onPageChange}/>

            {modalActive?<Modal modalActive={modalActive} setModalActive={setModalActive}  modalItemEpisodes={modalItem} />:null}
        
        </div>
    )
}

