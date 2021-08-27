import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getOrders = props.getOrders;

    const columns = [
        {
            title:"Order No",
            dataIndex:"id"
        },
        
        {
            title:"Umumy baha",
            dataIndex:"total_price"
        },
        {
            title:"Zakaz status",
            render:(text,record)=>(
                <div> 
                    { record && record.status==0 && <div>Garaşylýar</div>}
                    {record && record.status==1 && <div>Kabul edildi</div>}
                    {record && record.status==2 && <div>Gowşuryldy</div>}
                    {record && record.status==3 && <div>Ýatyryldy</div>}
                </div>
            )
        },
        {
            title:"Zakaz Salgy",
            render:(text,record)=>(
                
                <div>
                     <p>{record.address}</p>
                 </div>
            )
        },
        {
            title:"wagty",
            render:(text,record)=>(
                <div>
                    {record.delivery_time == 11 && <div>Şu gün 9:00 - 12:00</div>}
                    {record.delivery_time == 12 && <div>Şu gün 12:00 - 15:00</div>}
                    {record.delivery_time == 13 && <div>Şu gün 18:00 - 21:00</div>}

                    {record.delivery_time == 21 && <div>Ertir 9:00 - 12:00</div>}
                    {record.delivery_time == 22 && <div>Ertir 12:00 - 15:00</div>}
                    {record.delivery_time == 23 && <div>Ertir 18:00 - 21:00</div>}
                </div>
            )
        },
        {
            title:"Ulanyjy",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.user && record.user.user_name} </h3> 
                     <p>{record.user && record.user.user_phone}</p>
                 </div>
            )
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const [details,setDetails] = useState(null);

    const DeleteOrder = (event)=>{
        console.log(event.order_id);
        axiosInstance.delete("/admin/orders/order-products/delete/"+event.order_id).then((data)=>{
            message.success("successfully");
            getOrders();
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setEmaglumat(event);
    console.log("maglumat",emaglumat)
    
}

const ShowInformation = (event)=>{
    setInfo(!info);
    console.log(event);
    setDetails(event);
    if(event && event.order_id){
        axiosInstance.get("admin/orders/order-products/"+event.order_id).then((data)=>{
            setMaglumat(data.data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    

}




    return(
        <div className='LukmanTable'>
                <Drawer
                    width={500}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                        { details && <table border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={details && details.address}>
                            <td>Address </td>
                            <td>{details && details.address} </td>
                            </tr>
                            <tr className="modalLi" key={details && details.status}>
                            <td>Status </td>
                            <td>{details && details.status} </td>
                            </tr>
                            <tr className="modalLi" key={details && details.total_price}>
                            <td>Umumy Baha </td>
                            <td>{details && details.total_price} </td>
                            </tr>
                            {maglumat && maglumat.map((product,i)=>{
                                    return <React.Fragment>
                                     <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt No</td>
                                    <td>{product.product_code} </td>
                                    </tr>
                                    <tr className="modalLi" key={`name${i}`}>
                                    <td>{i+1}) Haryt ady</td>
                                    <td>{product.product_name_tm} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt Sany</td>
                                    <td>{product.quantity} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) Haryt Suraty</td>
                                    <td> <img style={{width:"100px",height:"100px",objectFit:"contain"}} src={BASE_URL+"/"+product.product_image} alt="product Surat" /> </td>
                                    </tr>
                                    </React.Fragment>
                            })}
                        </table>}
                </Drawer>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} order={[emaglumat,setEmaglumat]} getOrders={getOrders}/>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;