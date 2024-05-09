import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Signin() {

    let { register, handleSubmit } = useForm()
    let [err, setErr] = useState('')
    let navigate = useNavigate()

    async function onSigninFormSubmit(data) {
        //console.log(data)
        let res
        if (data.clientType == 'client') {
            res = await axios.post('http://localhost:4000/client-api/client-reg', data)
        }
        if (data.clientType == 'eatery') {
            res = await axios.post('http://localhost:4000/eatery-api/eatery-reg', data)
        }
        if (res.data.message === "A Client created" || res.data.message === "An Eatery created") {
            //navigate to login page
            navigate('/login')
        }
        else {
            setErr(res.data.message)
        }
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-lg-4 col-md-6 col-sm-6'>
                    <div className="card-title text-center border-bottom">
                        <h2 className="p-3">Signin</h2>
                    </div>
                    <div className='card-body mt-2 p-2 text-center'>
                        {/* if client or eatery already present */}
                        {
                            (err.length != 0) && <p className='text-danger'>{err}</p>
                        }
                        <form onSubmit={handleSubmit(onSigninFormSubmit)}>
                            {/*clientType*/}
                            <div className='p-2'>
                                <label className='form-check-label me-3' htmlFor='client'>Register as : </label>
                                <div className='form-check form-check-inline'>
                                    <input type="radio" className='form-check-input' id='client' value="client" {...register("clientType", { required: "Client type is required" })} />
                                    <label htmlFor="client" className='form-check-label'>Client</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input type="radio" className='form-check-input' id='eatery' value="eatery" {...register("clientType")} />
                                    <label htmlFor="client" className='form-check-label'>Eatery</label>
                                </div>
                                <div>
                                </div>
                                {/*clientName*/}
                                <div className='p-2 mt-2'>
                                    <input type='text' className='' id="clientName" placeholder='Clientname' {...register("clientName", { required: true })} />
                                </div>
                                {/*mailid*/}
                                <div className='p-2 mt-2'>
                                    <input type='email' className='' id="mail" placeholder='Email' {...register("mail", { required: true })} />
                                </div>
                                {/* Address */}
                                <select className='form-select-sm w-50 mx-auto' aria-label='Default select' {...register("address", {required : "Address Required"})}>
                                    <option selected disabled>Address</option>
                                    <option value="mba">MBA</option>
                                    <option value = "annapurna">Annapurna</option>
                                </select>
                                {/* password */}
                                <div className='p-2 mt-2'>
                                    <input type='password' className='' id="password" placeholder='Password' {...register("password", { required: true })} />
                                </div>
                                <div className='p-2 mt-2'>
                                    <button className='btn btn-success'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin