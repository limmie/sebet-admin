import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import LukmanSanawTable from './LukmanSanawTableGizli';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Lukman = () =>{

    const [ brands,setBrands] = useState([]);
    const [ kategoriya, setKategoriya] = useState([]);
    const [ products, setProducts] = useState([]);

    useEffect(()=>{
        getBrands();
        getKategoriyas();
        getProducts();
    },[])

    const getProducts = ()=>{
        axiosInstance.get("/admin/products/non-active").then((data)=>{
                console.log(data.data);
                setProducts(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getBrands = ()=>{
        axiosInstance.get("/admin/brands").then((data)=>{
            console.log(data.data);
            setBrands(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getKategoriyas = ()=>{
        axiosInstance.get("/admin/categories").then((data)=>{
            console.log(data.data);
            setKategoriya(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={600}
            className='lukman-gosh--drawer'
            title="Haryt Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
            <SurujiYagdayy getProducts={getProducts} brands={[ brands,setBrands]} kategoriya={[kategoriya,setKategoriya]} onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                <LukmanFilter GoshButton={GoshButton}/>
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ products, setProducts]} getProducts={getProducts} />
            </div>
        </div>
    );
};

export default Lukman; 