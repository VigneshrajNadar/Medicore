import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { reload } from "firebase/auth";
const Cart1 = () => {
  const [details, setDetails] = useState([]);
  function getdata() {
    let data = JSON.parse(localStorage.getItem("cart") || "[]");
    // If data is not an array, make it an array or set to []
    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }
    setDetails(data);
  }
 
  console.log(details)
  useEffect(() => {
    getdata();
  }, []);

  function Delete(details, index) {
    details.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(details));
    window.location.reload();
  }

  const [Cost, setCost] = useState(0);
let TotalCost1=Math.ceil(Cost + Cost / 10 + Cost / 30)
  const handleCost = () => {
    let ans = 0;
    details.map((item) => (ans += (item.quantity || 1) * (item.price || item.Cost || 0)));
    setCost(ans);
    console.log(Cost);
  
  };

    function TotalCost(){
      localStorage.setItem("Cost", JSON.stringify( TotalCost1 ));
    }


  useEffect(() => {
    handleCost();
  });

  const handleChange = (item, d) => {
    const ind = details.indexOf(item);
    const arr = details;
    arr[ind].quantity = (arr[ind].quantity || 1) + d;

    if (arr[ind].quantity === 0) arr[ind].quantity = 1;
    setDetails([...arr]);
    localStorage.setItem("cart", JSON.stringify(arr));
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div style={{ display: "flex" }}>
        <FontAwesomeIcon
          icon={faCartShopping}
          style={{
            fontSize: "22px",
            padding: "15px",
            paddingLeft: "50px",
            color: "rgb(13, 77, 104)",
          }}
        />
        <h3>My Cart</h3>
      </div>

      <hr />
      <div style={{ display: "flex" }}>
        <FontAwesomeIcon
          icon={faLocationDot}
          style={{
            fontSize: "26px",
            padding: "15px",
            paddingLeft: "50px",
            color: "rgb(13, 77, 104)",
          }}
        />
        <p className="p">Add address to confirm item availability</p>
        <h4 style={{ color: "#ff960d", paddingLeft: "110px" }}></h4>
      </div>

      <hr />

      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "70%" }}>
        
          {(Array.isArray(details) ? details : []).map((item, index) => {
            return (
              <div>
                <div style={{ width: "160%" }}>
                  <div className="Cart_page">
                    {/* <hr /> */}
                    <div style={{ disaplay: "flex", width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          color: "rgb(13, 77, 104)",
                          fontSize: "18px",
                          paddingLeft: "10px",
                          width: "90%",
                        }}
                      >
                        <div style={{ width: "80%", display: "flex" }}>
                          <img className="img" src={item.image || item.url} alt="" />
                          <p style={{ paddingLeft: "50px" }}>
                            <b>{item.name || item.Name}</b>
                          </p>
                        </div>

                        <div style={{ width: "20%", marginLeft: "50px" }}>
                          <button
                            className="remove_btn"
                            onClick={() => Delete(details, index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="plus" style={{ display: "flex" }}>
                        <button onClick={() => handleChange(item, 1)}>+</button>
                        <button>{item.quantity || 1}</button>
                        <button onClick={() => handleChange(item, -1)}>
                          -
                        </button>
                        <h3 style={{ paddingLeft: "30px" }}>
                          MRP Rs.{item.price || item.Cost}
                        </h3>
                      </div>
                    </div>
                
                  </div>
                </div>
              </div>
            );
          })}
          <h3 style={{ paddingLeft: "40px" }}>Total Cost : {Cost}</h3>
        </div>

        <div className="Right_cartPage">
          <h3 style={{ fontSize: "21px" }}>CART BREAKDOWN</h3>
          <hr />
          <hr />
          <h3 style={{ paddingLeft: "40px" }}>Total Cost : {Cost}</h3>
          <p style={{ paddingLeft: "40px", color: "rgb(13, 77, 104)" }}>
            Tax Amount : Rs.{Cost / 10}
          </p>
          <p style={{ paddingLeft: "40px", color: "rgb(13, 77, 104)" }}>
            Delivary Charges : Rs.{Cost / 20}
          </p>
          <hr />

          <h3 style={{ fontSize: "22px", paddingLeft: "40px" }}>
            Amount To pay : Rs. {Math.ceil(Cost + Cost / 10 + Cost / 30)}
          </h3>
             <Link to="/payment">
             <button  onClick={ TotalCost()} className="payment1">Proceed To Payment</button>
             </Link>
        
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Cart1;
