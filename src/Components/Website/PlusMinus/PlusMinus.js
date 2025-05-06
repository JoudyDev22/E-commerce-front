import { Button, FormControl, InputGroup } from "react-bootstrap";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export default function PlusMinus(props){
    const[btn,setbtn]=useState(1)
    //changecount
    useEffect(()=>{
        props.setcount(btn)
        if(props.changecount){
            props.changecount(props.id,btn)
        }
    },[btn])

    //show count in navbar plusMinus
    useEffect(()=>{
        if(props.count){
            setbtn(props.count)
        }
    },[props.count])
    
    return(
        <div>
        < InputGroup style={{ maxWidth: '160px' }}>
        <Button
        variant="danger"
        onClick={(e)=>{
            if(btn>0){
                setbtn((prev)=> prev -1)
            }else{
                setbtn(0)
            }
        }
        }
        >
        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
        </Button>
        <FormControl
        type="number"
        min={1}
        max={100}
        value={btn}
        onChange={(e)=>{
            if(e.target.value>0){
                setbtn(e.target.value)
            }else{
                setbtn(0)
            }
        }}
        className="text-center"
        />
        <Button
        style={{backgroundColor:"green",border:"none"}}
        onClick={(e)=>setbtn((prev) => ++prev)}
        >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
    </InputGroup>
        </div>
    )
}