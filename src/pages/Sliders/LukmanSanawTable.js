import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm,Input} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled } from '@ant-design/icons';

import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const [surat,setSurat]=useState(false);
    const [banner, setBanner ] = useState();
    const [sur,setSur]=useState();
    const [link,setLink] = useState();
    const getStatuses = props.getStatuses;
    
    const columns = [
        {
            title:"Slider No",
            dataIndex:"id"
        },
        {
            title:"Link",
            dataIndex:"banner_url",
        },
        {
            title:"Slider Surat",
            dataIndex:"photo_url",
            render:(text,record)=>(
                <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.banner_image} alt="Banner surat"/>
            )
        },
        {
            title:"Üýtgetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Button type='primary'shape='round'onClick={()=>ShowSurat(record)} >Surat</Button>

                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("admin/banners/delete/"+event.banner_id).then((data)=>{
            console.log(data.data);
            message.success("successfully!");
            getStatuses()
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    const MoreInformation = async(event)=>{
        console.log("maglummat",event);
        setShowInfo(!showInfo);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    if(event){
        await setLink (event.banner_url);
        await setMaglumat(event);
    }
    
}

const ShowSurat = (event)=>{
    setSurat(!surat);
    setBanner(event)
    console.log(event);

}

const UpdateSurat = async(e)=>{
    console.log("eee::",e,sur)

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });

      let newImg = {
            img_name:sur.name,
            img:await toBase64(sur)
          }
       

      axiosInstance.post("admin/banners/upload-image/"+e.banner_id,{
       photo: newImg
      })
      .then((data)=>{
        console.log(data.data);
       getStatuses()
        
      })
      .catch((err)=>{
        console.log(err)
      })
      
}



const BannerEdit = (e)=>{
    axiosInstance.patch("/admin/banners/edit/"+e.banner_id,{
        brand_url:link
    }).then((data)=>{
        console.log(data.data);
        // getStatuses();
    }).catch((err)=>{
        console.log("eroorr with banner edit",err);
    })
}


    return(
        <div className='LukmanTable'>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                        <div className='suruji-yagdayy'>
                            <form className='suruji-yagdayy--form' >
                                <Input style={{width:"90%"}} value={link} onChange={(e)=>{setLink(e.target.value)}} addonBefore='Slider Link'  className='suruji-yagdayy--input' />
                                   
                                   <Button onClick={BannerEdit(maglumat)} shape='round' type='primary' className='suruji-yagdayy--button'>Üýtget</Button>
                                   <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
                            </form>
                        </div>                
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Surat Üýtgetmek"
                placement="right"
                onClose={()=>ShowSurat()}
                visible={surat}>
                             <div className="yolHatyTable--uytgetmeler">
                                <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between"}}>
                                <input
                                    className="suruji-uytget--input"
                                    style={{width:"80%"}}
                                    type="file"
                                    onChange={(e)=>setSur(e.target.files[0])}
                                    />
                                    <Button
                                    type="primary"
                                    shape="round"
                                    onClick={()=>UpdateSurat(banner)}

                                    >
                                    Üýtget
                                    </Button>
                                    </div>
                                {banner &&  <img src={BASE_URL+"/"+banner.banner_image} alt="Brand Surat" style={{width:"450px",height:"500px",objectFit:"contain"}} />}
                                
                                </div>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;