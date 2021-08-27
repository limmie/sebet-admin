import { lazy } from "react";

// export const Users = lazy(() => import("./users/users"));  //old version
export const Users = lazy(()=>import('./users/users/ulanyjylar'));
export const NotFound = lazy(() => import("./404/404"));

export const Doctor = lazy(() => import("./lukman/lukman"));
export const Doctor_Sanaw=lazy(()=>import('./lukman/lukman_sanaw'));
export const GizliHarytlar = lazy(()=>import("./lukman/GizliHarytlar"));
export const Drivers = lazy(()=>import('./drivers/surujiler'));
export const Markets = lazy(()=>import('./ugrukdyryjy/yolHaty'));
export const YolHatyBermek = lazy(()=>import('./ugrukdyryjy/yolHatyBer'));
export const SubCategory = lazy(()=>import("./subCategory/yolHatyBer"));
export const Mehanik = lazy(()=>import('./mehanik/mehanik'));
export const Mehanik_Sanaw = lazy(()=>import('./mehanik/Sanaw/mehanik_sanaw'));
export const UlanyjyHereket = lazy(()=>import('./ulanyjy Hereket/ulanyjyHereket'));
export const Garaz = lazy(()=>import('./garaz/garaz'));
export const UlanyjyGornush = lazy(()=>import('./ulanyjy Gornush/ulanyjyGornush'));
export const Login = lazy(()=>import('./login/login'));

export const Orders = lazy(()=>import('./Orders/lukman'));
export const OrderStatus = lazy(()=>import('./Orders/lukman_sanaw'));
export const Slider = lazy(()=>import('./Sliders/lukman_sanaw'));
export const Config = lazy(()=>import('./config/lukman_sanaw'));
export const Admin = lazy(()=>import('./users/users/admin'));

export const Hasabat = lazy(()=>import('./hasabat/hasabat'));


