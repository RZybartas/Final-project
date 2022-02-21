import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Api } from "../services/Api";

export const ReserveForm = () => {
    const { token } = useAuth();
    const {id} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const reserved = new FormData(e.target);
            const [firstname, surname, email, dob] = reserved.values();
            const reserve = await Api.addReserve({ event_id: id, firstname, surname, email, dob}, token);

            if(reserve.err) throw new Error(reserve.err)
            alert('Reservation added succesfully');
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='reservation__container' onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='FirstName'
                name='firstname'
                className='reservation__input'
            />

            <input 
                type='text'
                placeholder='Surname'
                name='surname'
                className='reservation__input'
            />

            <input 
                type='email'
                placeholder='Email'
                name='email'
                className='reservation__input'
            />

            <input 
                type='date'
                name='dob'
                className='reservation__input'
            />

            <button
                type='submit'
                className='reservation__btn'
            >
                Reservate
            </button>
        </form>
    
    )
}