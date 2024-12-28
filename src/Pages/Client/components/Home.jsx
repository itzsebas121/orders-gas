import React from "react";
import CurrentOrders from "./CurrentOrders";
import NewOrder from "./NewOrder";
import './Home.css'
const Home = () => {
    return (
        <div className="home">

            <CurrentOrders/>
            <NewOrder></NewOrder>
        </div>
    );
}
export default Home;