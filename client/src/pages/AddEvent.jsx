import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Api } from "../services/Api";


export const AddEvent = () => {
    const { token } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const event = new FormData(e.target);
            const [img_url, title, city, place, event_date] = event.values();
            const events = await Api.addEvent({img_url, title, city, place, event_date }, token);
            console.log(event)
            if(events.err) throw new Error(events.err)
            alert('Event added succesfully');
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='reservation__container' onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Img Url'
                name='img_url'
                className='reservation__input'
            />

            <input 
                type='text'
                placeholder='Title'
                name='title'
                className='reservation__input'
            />

            <input 
                type='text'
                placeholder='City'
                name='city'
                className='reservation__input'
            />

            <input 
                type='text'
                name='place'
                placeholder="Place"
                className='reservation__input'
            />

            <input 
                type='date'
                name='event_date'
                className='reservation__input'
            />

            <button
                type='submit'
                className='reservation__btn'
            >
                Add Event
            </button>
        </form>
    
    )
}

