import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined,PlusCircleOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";

const YolHatyTable = (props) => {
  
// geting all data from database with api
  const [data, setData] = props.data;
  const [sub,setSub] = useState([]);
  const getData = props.getData;
  const getBrands = props.getBrands;
  const [brands, setBrands] = useState([]);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    
    {
      title: "SubKategoriýa Ady tm",
      dataIndex: "subcategory_name_tm",
      
    },
    {
      title: "SubKategoriýa Ady ru",
      dataIndex: "subcategory_name_tm",
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            Goşmaça
          </Button> */}
          
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText="Howwa"
            cancelText="Ýok"
          >
             <Button
              type="primary"
              shape="round"
              danger
              // onClick={}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
            
         
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ tel, setTel ] = useState(false);
  const [ img, setImg ] = useState(false);
  const [brandsShow,setBrandsShow] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ name_tm, setName_tm ] = useState();
  const [ name_ru, setName_ru ] = useState();
  const [ name_en, setName_en ] = useState();
  const [ market , setMarket ] = useState();
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    let market_id=event.MarketId;
    axiosInstance.delete("/admin/sub-categories/delete/"+event.subcategory_id).then((duta)=>{
      message.success("successfully")
      // getData();
      let dat = data.filter((da)=>{
        return da.subcategory_id != event.subcategory_id
      });
      console.log(dat);
      setData(dat);
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
 
  
  const ShowDrawer = async(event) => {
    setEdit(!edit);
      setMaglumat(event)
  };

  const ShowBrands = async(event)=>{
    setBrandsShow(!brandsShow);
    
  }

  const inputChangeHandler = (event) => {
    console.log(event.target.name);
    let name = event.target.name;
    let value = event.target.value;

    setMaglumat({
      ...maglumat,
      [name]: value,
    });
  };
  
 
  
  const saveData = (event) => {
    console.log(event.subcategory_id);
    axiosInstance.patch("/admin/sub-categories/edit/"+event.subcategory_id,{
      // category_id:
      subcategory_name_tm:event.subcategory_name_tm,
      subcategory_name_ru:event.subcategory_name_ru,
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully");
    }).catch((err)=>{
      console.log("errrorrr",err);
    })
  };

 

  

  return (
    <div className="yolHatyTable">
     
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div className="DrawerButtons">
            <Button
              className="DrawerButton"
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowDrawer()}
            >
              Goý bolsun
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              Üýtget <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
        <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name="subcategory_name_tm"
            value={maglumat && maglumat.subcategory_name_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name="subcategory_name_ru"
            value={maglumat && maglumat.subcategory_name_ru}
            onChange={inputChangeHandler}
          />
          
        </div>
      </Drawer>

      

      
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
