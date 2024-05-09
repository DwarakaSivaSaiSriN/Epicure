import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosWithToken  from "../axiosWithToken";
import getAxiosWithToken from "../axiosWithToken";

function EateryHome() {
  const { isPending, currentClient, errStatus, errMsg, loginStatus } =
    useSelector((state) => state.clientLogin);
  let [eatery, setEatery] = useState([]);

  let axiosWithToken = getAxiosWithToken()

  const getEateries = async () => {
    let res = await axiosWithToken.get(
      `get http://localhost:4000/eatery-api/${currentClient.clientName}`
    );
    setEatery(res.data.payload);
    //console.log(res.data.payload);
  };

  useEffect(() => {
    getEateries();
  }, []);

  return <div>EateryHome</div>;
}

export default EateryHome;
