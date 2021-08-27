import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    const getOrders = props.getOrders;
    const [emaglumat,setEmaglumat] =  props.order;
    const [status,setStatus ] = useState([]);
    const [statusId,setStatusId] = useState();
    console.log("orders",emaglumat);

    

    const Uytget=()=>{
        axiosInstance.post("admin/orders/change-order-status/"+emaglumat.order_id,{
            status:statusId
        }).then((data)=>{
            console.log(data.data);
            getOrders();
            setStatusId(null);
            props.onClick()
        }).catch((err)=>{
            console.log(err);
            setStatusId(null);
        })
    }
    
    const onChangeS = (value)=>{
        console.log(value,emaglumat.id);
        setStatusId(value);
        
    }
    

 
      

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
                {/* <h1 style={{width:"90%"}}>{emaglumat && emaglumat.status }</h1> */}
                    {emaglumat && emaglumat.status==0 && <h1 style={{width:"90%"}}>Garaşylýar</h1>}
                    {emaglumat && emaglumat.status==1 && <h1 style={{width:"90%"}}>Kabul edildi</h1>}
                    {emaglumat && emaglumat.status==2 && <h1 style={{width:"90%"}}>Gowşuryldy</h1>}
                    {emaglumat && emaglumat.status==3 && <h1 style={{width:"90%"}}>Ýatyryldy</h1>}
                <Select
                    style={{width:"90%"}}
                    className='suruji-yagdayy--input' 
                    // className="yolHaty-gozle--input"
                    showSearch
                    // style={{ width: 200 }}
                    placeholder="Status üýtget"
                    optionFilterProp="children"
                    value={statusId}
                    onChange={onChangeS}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={0}>Garaşylýar</Option>
                    <Option value={1}>Kabul edildi</Option>
                    <Option value={2}>Gowşuryldy</Option>
                    <Option value={3}>Ýatyryldy</Option>
              
                  </Select>

                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Unit üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsun</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;