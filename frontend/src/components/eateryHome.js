import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axiosWithToken from "../axiosWithToken";
import getAxiosWithToken from "../axiosWithToken";

function EateryHome() {

  const { isPending, currentClient, errStatus, errMsg, loginStatus } =
    useSelector((state) => state.clientLogin);
  let [foods, setFoods] = useState([]);
  let [foodErr, setFoodErr] = useState('');
  let { register, handleSubmit } = useForm()

  let axiosWithToken = getAxiosWithToken()

  const getFoods = async () => {
    let res = await axiosWithToken.get(
      `http://localhost:4000/eatery-api/food/${currentClient.clientName}`
    );
    setFoods(res.data.payload);
    //console.log(currentClient)
  };

  async function foodFormSubmit(data) {
    data.foodid = Date.now()
    data.eateryName = currentClient.clientName
    data.status = true

    let res = await axiosWithToken.post('http://localhost:4000/eatery-api/new-food', data)
    if (res.data.message === "food already exists") {
      setFoodErr(res.data.message)
    }
  }

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div>
      {/* MODAL */}
      <div>
        <div className="modal fade" id="addFoodItem" tabindex="-1" role="dialog" aria-labelledby="addFoodLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addFoodLabel">Create New Food Item</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(foodFormSubmit)}>
                  {/* Error Message */}
                  {
                    foodErr.length !== 0 && <p className="text-danger">{foodErr}</p>
                  }
                  {/* Food name */}
                  <div class="form-group">
                    <label for="foodname" className="col-form-label">Food Name:</label>
                    <input type="text" className="form-control" id="foodname" {...register("foodname", { required: "Food name required" })} />
                  </div>
                  {/* About Food */}
                  <div className="form-group">
                    <label for="foodsub" className="col-form-label">About Food:</label>
                    <input type="text" class="form-control" id="foodsub" {...register("foodsub", { required: "Food name required", maxLength: 15 })} />
                  </div>
                  {/* Food seg - veg/non veg */}
                  <select className='form-select-sm w-50 mx-auto' aria-label='Default select' {...register("foodseg", { required: "Food seg Required" })}>
                    <option selected disabled>Food Seg</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non Veg</option>
                  </select>
                  {/*Food type - pack/custom */}
                  <select className='form-select-sm w-50 mx-auto' aria-label='Default select' {...register("foodtype", { required: "Food type Required" })}>
                    <option selected disabled>Food Type</option>
                    <option value="pack">Pack</option>
                    <option value="custom">Custome made</option>
                  </select>
                  {/*Foodcat - juice,icecream,noodles,momos,omlet,chat */}
                  <select className='form-select-sm w-50 mx-auto' aria-label='Default select' {...register("foodcat", { required: "Food Category Required" })}>
                    <option selected disabled>Food Category</option>
                    <option value="icecream">Ice cream</option>
                    <option value="juice">Juice</option>
                    <option value="noodles">noodle</option>
                    <option value="momos">Momos</option>
                    <option value="omlet">Omlet</option>
                    <option value="chat">Chat</option>
                    <option value="rice">Rice</option>
                    <option value="beverage">Beverage</option>
                  </select>
                  {/*Food qty */}
                  <div class="form-group">
                    <label for="foodqty" className="col-form-label">Food Quantity:</label>
                    <input type="number" className="form-control" id="foodqty" {...register("foodqty", { required: "Food Quantity required" , min : 0 })} />
                  </div>
                  {/* Food cost */}
                  <div class="form-group">
                    <label for="foodcost" className="col-form-label">Food Cost:</label>
                    <input type="number" className="form-control" id="foodcost" {...register("foodcost", { required: "Food Cost required" , min : 0})} />
                  </div>
                  <div >
                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                    <button type="submit" className="btn btn-primary">Add Item</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="fs-2 text-seconday">Eatery name</div>
        <div className="fs-4"> Hello {currentClient.clientName.toUpperCase()}
          <sub className="text-secondary"><small>(<strong>{currentClient.address.toUpperCase()}</strong>)</small></sub>
        </div>
      </div>

      <hr className="me-4 ms-4" style={{ height: "2px", borderWidth: "0", color: "green", backgroundColor: "gray", }} />

      <div classname="row cols-sm-1 cols-md-2 cols-lg-4">
        {foods.map((food) => (
          <div className="">
          </div>
        ))}
      </div>

      <div className="container-fluid d-flex justify-content-end me-3 mb-2">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addFoodItem">Add Food Item</button>
      </div>
    </div>
  );
}

export default EateryHome;
