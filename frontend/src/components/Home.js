import React from 'react'

function Home() {

    function setSearchQuery(data) {
        console.log(data)
    }

    return (
        <div className='container text-center'>
            <div className='container text-center text-dark'>
                <h1>HELLO</h1>
            </div>
            {/* Search box */}
            <div className="input-box mt-3 ">
                <input type="search" name="searchitem" id="searchitem" className="search-input" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Item" />
            </div>
        </div>
    );
}

export default Home