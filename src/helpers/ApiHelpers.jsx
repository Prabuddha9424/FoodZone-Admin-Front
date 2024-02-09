import axios from "axios";
const url='http://localhost:3000/api/v1'

/*********************** admin user API ****************************/
export async function AddAdminUser(data){
    return await axios.post(`${url}/admin/create`,data);
}
export async function getAllAdminUsers(){
    return await axios.get(`${url}/admin/find-all`);
}
export async function updateAdminUsers(id,data){
    return await axios.put(`${url}/admin/update/${id}`,data);
}
export async function deleteAdminUsers(id){
    return await axios.delete(`${url}/admin/delete-by-id/${id}`);
}

/*********************** customer API ****************************/
export async function getAllCustomers(){
    return await axios.get(`${url}/customers/find-all`);
}
export async function deleteCustomers(id){
    return await axios.delete(`${url}/customers/delete-by-id/${id}`);
}
export async function countAllCustomers(){
    return await axios.get(`${url}/customers/count-all`);
}
/*********************** Food Items API ****************************/
export async function AddProduct(data){
    return await axios.post(`${url}/products/create`,data);
}
export async function getAllProducts(){
    return await axios.get(`${url}/products/find-all`);
}
export async function deleteProduct(id){
    return await axios.delete(`${url}/products/delete-by-id/${id}`);
}
export async function updateProduct(id,data){
    return await axios.put(`${url}/products/update/${id}`,data);
}
export async function countAllProducts(){
    return await axios.get(`${url}/products/count-all`);
}
/*********************** Orders API ****************************/
export async function getAllOrders(){
    return await axios.get(`${url}/orders/find-all`);
}
export async function deleteOrder(id){
    return await axios.delete(`${url}/orders/delete-by-id/${id}`);
}
export async function updateOrder(id,data){
    return await axios.put(`${url}/orders/update/${id}`,data);
}
export async function countAllOrders(){
    return await axios.get(`${url}/orders/count-all`);
}