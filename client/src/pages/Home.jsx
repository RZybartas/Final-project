import { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { useAuth } from "../hooks/useAuth";
import { FcCalendar } from 'react-icons/fc';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";



export const Home = () => {
    const [events, setEvents] = useState();
    const { token } = useAuth();
    const navigate = useNavigate();


    
    
    useEffect(() => {
        const fecthEvents = async () => {
            const res = await Api.getEvents(token);
            setEvents(res);
        };
        
        fecthEvents()
    }, [setEvents, token]);
    
    if (!events) {
        return <div>Loading</div>
    }
    return (
        <div>
        <h1 className="page-title">Events</h1>
            <div className="container">
                {
                    events.map((ev) => (
                        <div className="event__card" key={ev.id}>
                            <img className="event__img" src={ev.img_url} alt={ev.title} />
                            <div>
                                <h2 className="event__title">{ev.title}</h2>
                                <h3 className="event__city"> <FaMapMarkerAlt />{ev.city} {ev.place} </h3>
                                
                                <p className="event__date"><FcCalendar /> {ev.event_date} </p>
                                <button 
                                    className="event__btn"
                                    onClick={() => navigate(`/reservation/${ev.id}`)}
                                >
                                    Reservation
                                </button>
                            </div>
                        </div>
                    ))
                },
            </div>
        </div>
    )
};

