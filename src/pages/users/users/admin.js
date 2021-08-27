import React,{useState,useEffect} from 'react';
import { Button,Input, message } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './admin.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';


const Admin =(props)=>{
    const [Gosh,setGosh]=useState(false);

    const [username,setUsername]=useState();
    const [newPassword,setNewPassword]=useState();
    const [newPasswordConfirm,setNewPasswordConfirm]=useState();
    
    const Update = ()=>{
        axiosInstance.post("admin/update-me",{
            username:username ,
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm
        }).then((data)=>{
            console.log(data.data);
            message.success("successfully updated!");
            setUsername();
            setNewPassword();
            setNewPasswordConfirm();
        }).catch((err)=>{
            console.log(err);
            setUsername();
            setNewPassword();
            setNewPasswordConfirm();
        })
    }
    
    return(
        <div className='admin'>
            <Input value={username} onChange={(e)=>setUsername(e.target.value)} className="adminInput" addonBefore="User Name" />
            <Input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="adminInput" addonBefore="New Password" />
            <Input value={newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)} className="adminInput" addonBefore="New Password Confirm" />
            <Button onClick={Update} className="adminButton" type="primary">Update</Button>

        </div>
    );
};

export default Admin;