import React from 'react'
import { useParams } from 'react-router-dom';
import { ReserveForm } from '../components/ReserveForm';
import { useAuth } from '../hooks/useAuth'
import { Api } from '../services/Api';

export const Reservation = () => {
    // const { token } = useAuth();
    // const {id} = useParams();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     try {
    //         const reserved = new FormData(e.target);
    //         const [firstname, surname, email, dob] = reserved.values();
    //         const reserve = await Api.addReserve({ event_id: id, firstname, surname, email, dob}, token);

    //         if(reserve.err) throw new Error(reserve.err)
    //         alert('Reservation added succesfully');
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <h1 className='page-title'>Reservation</h1>
            <ReserveForm />
        </>
    )
}
