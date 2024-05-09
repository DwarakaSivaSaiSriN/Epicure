import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosWithToken from "../axiosWithToken";
import getAxiosWithToken from "../axiosWithToken";

function ClientHome() {

  const { isPending, currentClient, errStatus, errMsg, loginStatus } =
    useSelector((state) => state.clientLogin);
  let [eateriesList, setEateriesList] = useState([]);

  let axiosWithToken = getAxiosWithToken()

  const getEateries = async () => {
    let res = await axiosWithToken.get(
      "http://localhost:4000/eatery-api/eateries"
    );
    setEateriesList(res.data.payload);
    //console.log(res.data.payload);
  };

  useEffect(() => {
    getEateries();
  }, []);

  return (
    <div>
      <div classname="row row-cols-1">
        {eateriesList.map((eatery) => (
          <div>
            <div className="row row-cols-1 row-cols-sm-2 me-4 ms-4 mt-3 bg-light fs-4">
              <div className="text-start ">{eatery.clientName}</div>
              <div className="text-end ">{eatery.address.toUpperCase()}</div>
            </div>
            <hr className = "me-4 ms-4" style={{ height: "2px", borderWidth: "0", color: "green", backgroundColor: "gray", }} />
            {/* <div className="row row-cols-sm-1 row-cols-mg-2 row-cols-lg-4"></div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientHome;
