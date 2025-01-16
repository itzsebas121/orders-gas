import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavigatorBar from "../../components/Navigator-Bar";
import HomeDistributor from "./Components/Home/HomeDistributor";
import HistoryDistributor from "./Components/History/HistoryDistributor";
import { useAuth } from "../../components/Auth";
import Loading from "../../components/Loading";
const Distributor = () => {
    const [Distributor, setDistributor] = React.useState([]);
    const { verifyToken, user } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        verifyToken();
        const distribuidorTk = localStorage.getItem('token');
        if (distribuidorTk) {
            const userjs = JSON.parse(atob(distribuidorTk.split('.')[1]));
            setDistributor(userjs)
            setLoading(false);
        }
    }, []);
    if (loading)
        return (<Loading />)
    return (
        <div className='container'>
            <NavigatorBar Home={"/Distributor/HomeDistributor"} History={"/Distributor/HistoryDistributor"} />
            <div className='container-dashboard'>
                <Routes>
                    <Route index element={<HomeDistributor user={Distributor} />} />
                    <Route path='/HomeDistributor' element={<HomeDistributor user={Distributor} />} />
                    <Route path='/HistoryDistributor' element={<HistoryDistributor user={Distributor} />} />
                </Routes>
            </div>
        </div>
    );

}
export default Distributor;