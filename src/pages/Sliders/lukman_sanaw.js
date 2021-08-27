import React,{useEffect, useState} from 'react';

import {Drawer} from 'antd';
import "antd/dist/antd.css";

import LukmanFilter from './lukmanFilter'; 
import StatusGosh from './StatusGosh';
import LukmanSanawTable from './LukmanSanawTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Lukman = () =>{

    const [ data, setData ] = useState([]);

    useEffect(()=>{
        getStatuses();
    },[])

    

    const getStatuses = ()=>{
        axiosInstance.get("/admin/banners").then((data)=>{
            console.log(data.data);
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [state,setState] = useState(false);

    const GoshButton = ()=>{
        setState(true);
    }
    const Close=()=>{
        setState(false)
         }
    
    return(
        <div className="lukman">
             
            <Drawer
            width={500}
            className='lukman-gosh--drawer'
            title="Status Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
              <StatusGosh getStatuses={getStatuses}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                <LukmanFilter GoshButton={GoshButton} />
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ data, setData]} getStatuses={getStatuses} />
            </div>
        </div>
    );
};

export default Lukman; 