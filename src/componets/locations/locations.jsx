import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BasicPagination from "../../comon/pagination"
import ItemFilter from '../../comon/itemFilter'
import Modal from "../modal/modal"
import style from "./location.module.css"
import Table from "../Table/table"


export default function Locations() {

    const [state,setState]=useState([])
    const [page,setPage]=useState(1)
    const [pagesCount,setPagesCount]=useState(1)

    const [name,setName]=useState("All")
    const [nameUnique,setNameUnique]=useState()

    const [type,setType]=useState("All")
    const [typeUnique,setTypeUnique]=useState()

    const [stateFilter,setStateFilter]=useState([])

    const [modalActive,setModalActive]=useState(false)
    const [modalItem,setModalItem]=useState()

    function onPageChange(pageCount) {
        setPage(pageCount)
    }

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/location?page=${page}`)
        .then(respons=>{
            setState([...respons.data.results])
            setPagesCount(respons.data.info.pages)
        })
    },[page])

    useEffect(() => {
        let b=[...state]
        let a=new Set (b.map(item=>item["name"]))
        let c=new Set (b.map(item=>item["type"]))

        setTypeUnique(["All",...c])
        setNameUnique(["All",...a])
    }, [state])

    useEffect(() => {
        let a={
            name,
            type
        }
        setStateFilter(ItemFilter(state,a))
    }, [name,type,state])

    return (
        <div className={style.container}>

            <h3>Locations</h3>

            <div className={style.containerSelect}>

                <div className={style.selectName}>

                    <h3>Name select</h3>
                    
                    <select name="select" onChange={event => {setName(event.target.value)}}>
                        {
                            nameUnique!=undefined&&nameUnique.length>0?nameUnique.map(item=>(
                                    <option value={item}>{item}</option>
                        )):"Data has not been loaded yet"
                        }
                    </select>

                </div>

                <div className={style.selectType}>

                    <h3>Type select</h3>
                    
                    <select name="select" onChange={event => {setType(event.target.value)}}>
                        {
                            typeUnique!=undefined&&typeUnique.length>0?typeUnique.map(item=>(
                                    <option value={item}>{item}</option>
                        )):"Data has not been loaded yet"
                        }
                    </select>

                </div>
            
            </div>

            <Table stateLocation={stateFilter} setModalActive={setModalActive} setModalItem={setModalItem}/>
        
            <BasicPagination pagesCount={pagesCount} onPageChange={onPageChange}/>

            {modalActive?<Modal modalActive={modalActive} setModalActive={setModalActive}  modalItemLocations={modalItem} />:null}
        
        </div>    
    )
}