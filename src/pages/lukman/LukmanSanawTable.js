import React,{useState} from 'react';

import {Button,Space,message,Table,Input,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled } from '@ant-design/icons';

import ProductEdit from './ProductEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;

    const getProducts = props.getProducts;
    console.log("data",data);
    const columns = [
        {
            title:"Haryt Code",
            dataIndex:"product_code"
        },
        {
            title:"Haryt Surat",
            dataIndex:"surat",
            render:(text,record)=>(
                <div>
                    <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.product_image} alt="Haryt Surat"/>
                </div>
            )
        },
        {
            title:"Haryt Ady",
            dataIndex:"product_name_tm",
        },
        {
            title:"Description",
            dataIndex:"product_description_tm"
        },
        {
            title:"Baha",
            dataIndex:"product_price"
        },
        {
            title:"Kone baha",
            dataIndex:"product_price_old"
        },
        {
            title:"Üýtgetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowSurat(record)}>Surat</Button>
                    <Button type='primary'shape='round'onClick={()=>MoreInformation(record)}>Goşmaça</Button>
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan gizlemek isleýärsinizmi?"
                        onConfirm={()=>Gizle(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  >Gizle</Button>                 
               
                    </Popconfirm>
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
    const [showSurat,setShowSurat] = useState(false);
    const [surat,setSurat] = useState();
    const [sur,setSur] = useState(null);

    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [description_tm,setDescription_tm] = useState();
    const [description_ru,setDescription_ru] = useState();
    const [price, setPrice] = useState();
    const [ product_code,setProduct_code] = useState();
    const [ sany,setSany] = useState();
    const [price_old,setPrice_old] = useState();
    const [tmt_price_old,setTmt_price_old] = useState();
    const [tmt_price,setTmt_price] = useState();
    const [usd_price_old,setUsd_price_old] = useState();
    const [usd_price,setUsd_price] = useState();
    const [product_id, setProduct_id] = useState();

    const [product_discount,setProduct_discount] = useState()


    const ShowSurat = (event)=>{
        setShowSurat(!showSurat);
        if(event){
        setSurat(event.product_image);
        setProduct_id(event.product_id);
        }

    }

    const Gizle = (event)=>{
        console.log(event);
        axiosInstance.patch("admin/products/edit-status/"+event.product_id,{
            isActive:false
        }).then((data)=>{
            message.success("successfully")
            getProducts()
        }).catch((err)=>{
            console.log(err);
        });
    }

    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/admin/products/delete/"+event.product_id).then((data)=>{
            console.log(data.data);
            message.success("successfully");
            getProducts()
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
    setName_tm(event.product_name_tm);
    setName_ru(event.product_name_ru);
    setDescription_tm(event.product_description_tm);
    setDescription_ru(event.product_description_ru);
    setPrice(event.product_price);
    setProduct_code(event.product_code);
    setPrice_old(event.product_price_old);
    setTmt_price_old(event.product_price_tmt_old);
    setTmt_price(event.product_price_tmt);
    setUsd_price_old(event.product_price_usd_old);
    setUsd_price(event.product_price_usd);
    setProduct_id(event.product_id);
    setProduct_discount(event.product_discount);
    setSany(event.product_stock.stock_quantity);
    }
}
const inputChangeHandler=(event)=>{
  console.log(event.target.name);
  let name=event.target.name;
  let value=event.target.value;

  setMaglumat({
      ...maglumat,
      [name]:value
  })            
}
const saveData = (event)=>{
    setData([
        ...data,
        maglumat
    ]);
    setEdit(false);
};


const EditSurat = async(e)=>{
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
       

      axiosInstance.post("admin/products/upload-image/"+e,{
       photo: newImg
      })
      .then((data)=>{
        console.log(data.data);
        message.success("successfully!");
       getProducts()
        
      })
      .catch((err)=>{
        console.log(err)
      })
}


const EditProduct = async(product_id)=>{
      
    axiosInstance.patch("/admin/products/edit/"+product_id,{
      product_code: product_code,
      product_name_tm: name_tm,
      product_name_ru: name_ru,
      product_description_tm: description_tm,
      product_description_ru: description_ru,
    //   product_price:price,
    //   product_price_old:price_old,
      product_price_tmt: tmt_price,
    //   product_price_tmt_old: tmt_price_old,
      product_price_usd: usd_price,
      product_discount: product_discount,
      stock:{
        stock_quantity:sany,
      }
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully");
      getProducts();
    }).catch((err)=>{
      console.log(err);
    })
  
   
  }

    return(
        <div className='LukmanTable'>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Goşmça Maglumat"
                placement="right"
                onClose={()=>MoreInformation()}
                visible={showInfo}>
                    { maglumat &&
                    <table border="1" className="goshmacha--ul">
                    <tr className="modalLi" key={maglumat && maglumat.id}>
                    <td>Haryt Code </td>
                    <td>{maglumat && maglumat.product_code} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.id}>
                    <td>Stock </td>
                    <td>{maglumat && maglumat.product_stock && maglumat.product_stock.stock_quantity} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_name_tm}>
                    <td>Ady tm </td>
                    <td>{maglumat &&  maglumat.product_name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_name_ru}>
                    <td>Ady ru </td>
                    <td>{maglumat &&  maglumat.product_name_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_description_tm}>
                    <td>Description tm </td>
                    <td>{maglumat &&  maglumat.product_description_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_description_ru}>
                    <td>Description ru </td>
                    <td>{maglumat &&  maglumat.product_description_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.product_price)}>
                    <td>Baha</td>
                    <td>{maglumat &&  JSON.stringify(maglumat.product_price)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.product_price_old)}>
                    <td>öňki baha </td>
                    <td>{maglumat &&  JSON.stringify(maglumat.product_price_old)}</td>
                    </tr>
                    {/* <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.product_price_tmt)}>
                    <td>Baha Tmt </td>
                    <td>{maglumat &&  JSON.stringify(maglumat.product_price_tmt)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_price_tmt_old}>
                    <td>öňki Tmt baha</td>
                    <td>{maglumat &&  maglumat.product_price_tmt_old}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_price_usd}>
                    <td>Usd baha </td>
                    <td>{maglumat &&  maglumat.product_price_usd}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.product_price_usd_old}>
                    <td>öňki Usd baha </td>
                    <td>{maglumat &&  maglumat.product_price_usd_old}</td>
                    </tr> */}
                    <tr className="modalLi" key={maglumat && maglumat.product_discount}>
                    <td>Product Discount </td>
                    <td>{maglumat  && maglumat.product_discount}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.categoryId }>
                    <td>Kategoriýa</td>
                    <td>{maglumat && maglumat.category && maglumat.category.category_name_tm }</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.categoryId }>
                    <td>SubKategoriýa</td>
                    <td>{maglumat && maglumat.subcategory && maglumat.subcategory.subcategory_name_tm }</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.brandId }>
                    <td>Brand</td>
                    <td>{maglumat && maglumat.brand && maglumat.brand.brand_name_tm  }</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.createdAt }>
                    <td>Haryt Surat</td>
                    <td>{maglumat && <img style={{width:"50px",height:"50px",margin:"0 30px",objectFit:"cover"}} src={BASE_URL+"/"+maglumat.product_image} alt="haryt surat" />   }</td>
                    </tr>
            
            
            
          </table>
}
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowSurat()}
                visible={showSurat}>
                    <input type="file" onChange={(e)=>setSur(e.target.files[0])}  />
                    <img style={{width:"450px",height:"400px",margin:"10px auto",objectFit:"cover"}} src={BASE_URL+"/"+surat} alt="product Surat"/>
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <Button style={{width:"40%"}} onClick={()=>EditSurat(product_id)} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Hasaba al</Button>
                        <Button style={{width:"40%"}} onClick={ShowSurat} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                    </div>
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
                    <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />
                    <Input value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore='Description tm'  className='suruji-yagdayy--input' />
                    <Input value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore='Description ru'  className='suruji-yagdayy--input' />
                    <Input value={product_code} onChange={(e)=>{setProduct_code(e.target.value)}} addonBefore='Code'  className='suruji-yagdayy--input' />
                    <Input value={sany} onChange={(e)=>{setSany(e.target.value)}} addonBefore='Stock'  className='suruji-yagdayy--input' />
                    <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore='Baha'  className='suruji-yagdayy--input' />
                    {/* <Input value={price_old} onChange={(e)=>{setPrice_old(e.target.value)}} addonBefore='öňki Baha'  className='suruji-yagdayy--input' /> */}
                    <Input value={tmt_price} onChange={(e)=>{setTmt_price(e.target.value)}} addonBefore='tmt Baha'  className='suruji-yagdayy--input' />
                    {/* <Input value={tmt_price_old} onChange={(e)=>{setTmt_price_old(e.target.value)}} addonBefore='öňki tmt Baha'  className='suruji-yagdayy--input' /> */}
                    <Input value={usd_price} onChange={(e)=>{setUsd_price(e.target.value)}} addonBefore='usd Baha'  className='suruji-yagdayy--input' />
                    <Input value={product_discount} onChange={(e)=>{setProduct_discount(e.target.value)}} addonBefore='Prasent Skitga'  className='suruji-yagdayy--input' />

                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <Button style={{width:"40%"}} onClick={()=>EditProduct(product_id)} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Hasaba al</Button>
                        <Button style={{width:"40%"}} onClick={ShowDrawer} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
                    </div>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;