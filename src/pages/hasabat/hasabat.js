import react, { useEffect, useState } from "react";
import { Button, DatePicker, message, Space } from 'antd';

import "./hasabat.css";
import { axiosInstance } from "../../utils/axiosIntance";


const { RangePicker } = DatePicker;

const Hasabat = ()=>{

    const [data,setData] = useState();
    const [mail,setMail] = useState(false);
    const [aralyk,setAralyk] = useState();

    const GetMonth = ()=>{
        message.success("Ayyn hasabaty alyndy");
        getData();

    }

    const GetDay = ()=>{
        message.success("Gunun hasabaty alyndy");
        getData();
    }

    const GetDayInterval = (e)=>{
       if(e){ console.log("1-nji ",e[0]._d);
        console.log("2-nji ",e[1]._d);
        axiosInstance.post("admin/statistics/during",{
            from:e[0]._d,
            until:e[1]._d,
            email: mail,
        }).then((data)=>{
            setAralyk(data.data);
            console.log(data.data)
        }).catch((err)=>{
            console.log(err);
        })}
        
    }


    useEffect(()=>{
        getData()
    },[])

    const getGunler = ()=>{
        
    }
    const getData = ()=>{
        axiosInstance.get("admin/statistics").then((data)=>{
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className="hasbat-page">
            <div className="hasabat-ay">
                <h1>Aýyň hasabaty</h1>
                <h2>{data && data.month} manat</h2>
                <h3>Ähli Zakazlar: {data && data.monthOrders.all}</h3>
                <h3 style={{color:"green"}}>Gowşurlan zakazlar: {data && data.monthOrders.done}</h3>
                <Button onClick={()=>GetMonth()} type="primary" shape="round">Täzele</Button>
            </div>
            
            <div className="hasabat-ay">
                <h1>Hepdäniň hasabaty</h1>
                <h2>{data && data.week} manat</h2>
                <h3>Ähli Zakazlar: plança</h3>
                <h3 style={{color:"green"}}>Gowşurlan zakazlar: plança</h3>
                <Button onClick={()=>GetMonth()} type="primary" shape="round">Täzele</Button>

            </div>
            <div className="hasabat-ay">
                <h1>Günüň hasabaty</h1>
                <h2>{data && data.today} manat</h2>
                <h3>Ähli Zakazlar: {data && data.todayOrders.all}</h3>
                <h3 style={{color:"green"}}>Gowşurlan zakazlar: {data && data.todayOrders.done}</h3>
                <Button onClick={()=>GetDay()} type="primary" shape="round">Täzele</Button>
            </div>
            <div className="hasabat-ay">
                <h1>Günleriň aralygy hasabat</h1>
                <h2>{aralyk && aralyk.stats} manat</h2>
                <input style={{width:"15px",height:"15px"}} onChange={()=>setMail(!mail)} id="mail" type="checkbox"  />
                <label style={{fontSize:"20px",fontWeight:"450",marginLeft:"10px",marginBottom:"10px"}} for="mail">Gmail ugratmalymy?</label>
                <br></br>
                <RangePicker style={{marginTop:"10px"}}  onChange={(value)=>GetDayInterval(value)}  />
            </div>
        </div>
    )
}

export default Hasabat;