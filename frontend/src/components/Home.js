import React from 'react'
import { useSelector } from 'react-redux'
import ClientHome from './ClientHome'
import EateryHome from './EateryHome'

function Home() {

    const { isPending, currentClient, errStatus, errMsg, loginStatus } = useSelector((state) => state.clientLogin)



    return (
        <div>
            <div className='container-fluid'>
                {
                    loginStatus == true ? (
                        <>
                        {
                            currentClient === 'client' ? (
                                <ClientHome />
                            ) :
                            ( <EateryHome/> )
                        }
                        </> ) : (<ClientHome/>)
                }
            </div>
        </div>
    );
}

export default Home