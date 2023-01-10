import { useEffect,useState } from 'react';
import { useFetch} from '../../components/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Preloader from './../preloader/preloader';
import './eventList.css';
const EventList = ({url, title}) =>{
    const [state,setState] = useState('')
    const {request, isLoading} = useFetch();
    const navigate = useNavigate();
    useEffect(() => {
        request(`http://localhost:3001/${url}`)
            .then(data => setState(data))
    }, []);
    const onLink = (item) =>{
        navigate(`/eventdetails/${item.id}`,{state:item})
    }
    return (
        <>
        {isLoading && <Preloader/>}
        {!isLoading && state && <ul className="event-list">
            <li className='event-title'> <span>{title}</span></li>
                {state.map(item=> {
                    return(
                        <li onClick={()=> onLink(item)} key={item.id} className='event-item'>
                                <div className='event_block big'>
                                    <div className='team'>{item.event.home.name} - {item.event.away.name}</div>
                                </div>
                                <div className='event_block'>
                                    <div className='time_caption'>{item.date.when}</div>
                                    <div className='time_caption'>{item.date.time}</div>
                                </div>
                                
                            
                        </li>
                    )
                })
                }
                
            </ul>}
        </>
        
    )
}
export default EventList;