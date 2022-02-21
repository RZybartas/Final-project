import { useNavigate,  useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Api } from "../services/Api";


export const ModalUpdate = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const reserved = new FormData(e.target);
            const [event_id, firstname, surname, email, dob] = reserved.values();
            const reserve = await Api.update({ event_id, firstname, surname, email, dob}, id, token);

            if(reserve.err) throw new Error(reserve.err)

            alert('Reservation updated succesfully');
            navigate(`/reservation/${event_id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className='page-title'>Update</h1>
            <form className='reservation__container' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Event Id'
                    name='event_id'
                    className='reservation__input'
                />

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
                    Update
                </button>
            </form>
            
        </>
    )
}
