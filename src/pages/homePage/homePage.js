import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import EventList from '../../components/eventList/eventList';
import './homePage.css'

const HomePage = () =>{
    const [match, setMatch] = useState('')
    const [win, setWin] = useState('')
    const {pathname, state} = useLocation()
    const navigate = useNavigate();

    let clearBid;
    const bidsd = () =>{
        clearBid = setTimeout(()=>{
                        setMatch('')
                        setWin('')
                    },5000)
    }
    useEffect(()=>{
        if(state){
            bidsd()
            setMatch(state.event.match)
            setWin(state.event.win)
            navigate(pathname, { replace: true })
        }
        return () => clearTimeout(clearBid)
    },[])
    return (
        <div className='home'>
            {match && <div className='bid'>
                <span className='bid-text'>Спасибо, ваша ставка</span>
                <span className='bid-text'>{`матч ${match}`}</span>
                <span className='bid-text'>{`ставка на ${win}`}</span>
                <span className='bid-text'>{`принята`}</span>
                </div>}
            <EventList url={'current'} title={'Текущее событие'}/>
            <EventList url={'future'} title={'Предстоящее событие'}/>
            
        </div>
    )
}

export default HomePage