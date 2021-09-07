import React,{useState,useEffect} from 'react';
import {v4 as uuidv4} from "uuid"
import Draggable from 'react-draggable';
import style from "./mywatchlist.module.css"


export default function MyWatchList() {

    const[item,setItem]=useState('')
    const[item1,setItem1]=useState('')
    const[itemCheckBox,setItemCheckBox]=useState(false)

    const[items,setItems]=useState(
        JSON.parse(localStorage.getItem("items"))||[]
    )

    useEffect(() => {
        localStorage.setItem("items",JSON.stringify(items))
    }, [items])

    function  newItem() {
        if(item.trim()!==""){
            const newItem={
                id:uuidv4(),
                item,
                itemCheckBox,
                defaultPos:{
                    x:0,
                    y:20
                }
            }
            setItems(items=>[...items,newItem])
            setItem1(items=>[...items,newItem])
            setItem('')
        }else{
            alert("Enter something...")
            setItem('')
        }
    }

//?
    // useEffect(() => {
    //     if(item1){
    //         let a=item1.filter(el=>{
    //             el.itemCheckBox=itemCheckBox
    //             return el
    //         })
    //         console.log(a)
    //         setItems([...a])
    //     }

    // }, [itemCheckBox])

    function deleteListItem(id) {
        setItems(items.filter(el=>el.id!=id))
    }

    function updatePos(data,index) {
        const newArray=[...items]
        newArray[index].defaultPos={x:data.x,y:data.y}
        setItems(newArray)
    }

    function keyPress(event) {
        const code=event.keyCode || event.which
        if(code===13){
            newItem()
        }
    }

    return (
        <div className={style.container}>

            <h3>My Watch List : {items.length}</h3>

            <div>

                <input 
                    type="text"
                    value={item}
                    onChange={e=>setItem(e.target.value)}
                    placeholder="Enter episode..."
                    onKeyPress={e=>keyPress(e)}
                />
                
                <button onClick={newItem}>Сохранить</button>

            </div>
            {
                items?items.map((el,index)=>{
                    return(

                    <Draggable
                        key={el.id} defaultPosition={el.defaultPos} onStop={(el,data)=>updatePos(data,index)}
                    >
                        <div className={style.mainContent}>

                            <span>
                                {el.item}
                            </span>

                            <div>

                                <input type="checkbox"
                                value={el.itemCheckBox} 
                                onClick={()=>{
                                setItemCheckBox(!itemCheckBox)
                                }}></input>

                                <button onClick={()=>deleteListItem(el.id)} className={style.deleteItem}>
                                    X
                                </button>

                            </div>

                        </div>

                    </Draggable>
                    
                    )
                }):"Enter something..."
            }
    </div>
    )
}
