import React from 'react';
import { useForm } from 'react-hook-form';

const DataForm = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const procesarFormulario = (data,e) => {
        e.preventDefault();
       //      console.log(data);
        
        getLocation(data);
    }

           const getLocation = async (data) => {
             const  { latitud,longitud}= data;
               const latValue=parseFloat(latitud);
              const longValue=parseFloat(longitud);
              try {
               
                 const response = await fetch(`https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${latValue}&longitude=${longValue}`);
                 const date= await response.json();
                 
                 
                 console.log(date);

               } catch {
                throw new Error('could not data climate');
              }
             };
    return (
        <>
            <h1>FORM</h1>
            <form onSubmit={handleSubmit(procesarFormulario)}> 
            <input
                type="text"
                name="namecity"
                className="input-dir"
                placeholder="Ingrese Nombre Ciudad"
                {...register('nameCity', {
                    required: 'Debe ingresar un Nombre',
                })}
            /> 
     <br></br>
     <br></br>
                <input
                    name="longitud"
                  
                    className="input-dir"
                    placeholder="Ingrese longitud"
                    {...register('longitud', {
                      required: 'Debe ingresar un longitud',
                    })}
                />
                <span className="text">
                    {errors?.longitud?.message}
                </span>

                <br></br>
                <br></br>

                <input
                    name="latitud"
                    
                    className="input-dir"
                    placeholder="Ingrese latitud"
                    {...register('latitud', {
                        required: 'Debe ingresar un latitud',
                    })}
                />
                
                <span className="text">
                    {errors?.latitud?.message}
                </span>
<br></br>

                <button 
                    type="submit" 
                    className="btn"
                   
                    >
                Agregar
                </button>
            </form>
        </>
    );
}
 
export default DataForm;

