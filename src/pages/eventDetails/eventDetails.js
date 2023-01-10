import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../../components/hooks/useFetch";
import { v4 as uuidv4 } from 'uuid';
import './eventDetails.css'

const EventDetails = () =>{
    const {id, event:{home,away,draw}, date} = useLocation().state
    const [state,setState] = useState('')
    const [checked, setCheced] = useState(true)
    const navigate = useNavigate();
    const bidId = uuidv4()
    const {request} = useFetch();

    const submit = (e) =>{
        e.preventDefault()
        let body = {
            id: bidId,
            event:{
                eventid: id,
                match: `${home.name} - ${away.name}`,
                win: state.name,
                coefficient: state.coefficient
            }
        }
    request("http://localhost:3001/bids","POST",  JSON.stringify(body))
        .then(data => {
            navigate(`/`,{state:data})
        })
    }
    const inputTached = (bid) =>{
        setState(bid)
        setCheced(false)
    }
    return (
        <div className='details'>
            
            <div className='details-block'>
                <div className='details-team'>{home.name}</div>
                <div className='details-time'>
                    <span>{date.when}</span>
                    <span>{date.time}</span>
                </div>
                <div className='details-team'>{away.name}</div>
                
            </div>
            <form onSubmit={e=>submit(e)} className='details-form'>
                    <div className='form-group'>
                        <div  className='form-item'>
                            <span className='form-coef'> x{home.coefficient}</span>
                            <input className='form-input' 
                                   onChange={()=>inputTached(home)} 
                                   type="radio" 
                                   id="home"
                                   name="bid" 
                                   value={home.coefficient}/>
                            <label className='form-label' htmlFor="home">на победу хозяев</label>
                        </div>
                        <div className='form-item'>
                            <span className='form-coef'> x{draw.coefficient}</span>
                            <input className='form-input' 
                                   onChange={()=>inputTached(draw)} 
                                   type="radio" 
                                   id="draw"
                                   name="bid" 
                                   value={draw.coefficient}/>
                            <label className='form-label' htmlFor="draw">на ничью</label>
                        </div>
                        <div className='form-item'>
                            <span className='form-coef'> x{away.coefficient}</span>
                            <input className='form-input' 
                                   onChange={()=>inputTached(away)} 
                                   type="radio" 
                                   id="away"
                                   name="bid" 
                                   value={away.coefficient}/>
                            <label className='form-label' htmlFor="away">на победу гостей</label>
                        </div>
                    </div>
                <div>
                    <button disabled={checked} className='form-btn' type="submit">Сделать ставку</button>
                </div>
            </form>
        </div>
    )
}

export default EventDetails;