import React from 'react'
import { ReserveForm } from '../components/ReserveForm';
import { ParticipantsList } from '../components/ParticipantsList';


export const Reservation = () => {
    

    return (
        <>
            <h1 className='page-title'>Reservation</h1>
            <ReserveForm />
            <div>
                <ParticipantsList />
            </div>
        </>
    )
}
