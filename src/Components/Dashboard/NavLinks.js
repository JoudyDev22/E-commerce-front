import { faPlus, faUsers,faCartShopping,faTruckFast } from '@fortawesome/free-solid-svg-icons';

export const links=[
    {
        name:"Users",
        path:"users",
        icon:faUsers,
        role:"1995"
    },
    {
        name:"Add User",
        path:"user/adduser",
        icon:faPlus,
        role:"1995"
    },
    {
        name:"Categories",
        path:"categories",
        icon:faCartShopping,
        role:["1995",'1999']
    },
    {
        name:"Add Category",
        path:"addcat",
        icon:faPlus,
        role:["1995",'1999']
    },
    {
        name:"Products",
        path:"products",
        icon:faTruckFast,
        role:["1995",'1999']
    },
    {
        name:"Add Product",
        path:"addpro",
        icon:faPlus,
        role:["1995",'1999']
    },
]