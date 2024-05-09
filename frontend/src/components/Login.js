import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { clientLoginThunk } from '../redux/slices/clientLoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {

    let { register, handleSubmit } = useForm()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const { isPending, currentClient, errStatus, errMsg, loginStatus } = useSelector((state) => state.clientLogin)

    function handleFormSubmit(clientCred) {
        //console.log(clientCred)
        let actionObj = clientLoginThunk(clientCred)
        dispatch(actionObj)
    }


    useEffect(() => {
        if (loginStatus === true) {
            console.log(currentClient.clientType)
            if (currentClient.clientType === 'client') {
                navigate('/client-home')
            }
            if (currentClient.clientType === 'eatery') {
                navigate('/eatery-home')
            }
        }
    }, [loginStatus])

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-lg-4 col-md-6 col-sm-6'>
                    <div className="card-title text-center border-bottom">
                        <h2 className="p-3">Login</h2>
                    </div>
                    <div className='card-body mt-2 p-2 text-center'>
                        {
                            errStatus === true && <p className='text-danger'>{errMsg}</p>
                        }
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            {/*clientType*/}
                            <div className='p-2'>
                                <label className='form-check-label me-3' htmlFor='clientType'>Login as : </label>
                                <div className='form-check form-check-inline'>
                                    <input type="radio" className='form-check-input' id='client' value="client" {...register("clientType", { required: "Client type is required" })} />
                                    <label htmlFor="client" className='form-check-label'>Client</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input type="radio" className='form-check-input' id='eatery' value="eatery" {...register("clientType")} />
                                    <label htmlFor="eatery" className='form-check-label'>Eatery</label>
                                </div>
                            </div>
                            {/*clientName*/}
                            <div className='p-2 mt-2'>
                                <input type='text' className='' id="clientName" placeholder='Clientname' {...register("clientName", { required: true })} />
                            </div>
                            {/* password */}
                            <div className='p-2 mt-2'>
                                <input type='password' className='' id="password" placeholder='Password' {...register("password", { required: true })} />
                            </div>
                            {/* Submit */}
                            <div className='p-2 mt-2'>
                                <button className='btn btn-success'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login