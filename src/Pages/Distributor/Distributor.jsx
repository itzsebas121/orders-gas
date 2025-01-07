import React from "react";
import Map from "../../components/Map";
const Distributor = () => {
    return (
        <div className="container-Map" style={{ width: "100%", height: "500px" }}>

            <Map locationStart={"-1.387892, -78.601601"} locationEnd={"-1.2717417178200208, -78.6260109"} />
        </div>
    );

}
export default Distributor;