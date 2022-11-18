import React, { useEffect, useState } from 'react'
import { getCars } from "../../../api/car";
import ListCar from '../../../components/AdminComponents/Cars/ListCars';


export default function Car() {

    const [cars, setCar] = useState([])
    const [reloadCar, setReloadCar] = useState(false)

    useEffect(() => {
        getCars().then((response)=>{
            setCar(response.cars)
        });
        setReloadCar(false)
    }, [reloadCar])
    

    return (
        <div>
            
            <ListCar
            cars={cars}
            setReloadCar={setReloadCar}
            />
        </div>
    )
}