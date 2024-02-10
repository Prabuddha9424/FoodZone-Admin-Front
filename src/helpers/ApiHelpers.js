import axiosInstance from "../config/axiosInstance.js";

/*********************** admin user API ****************************/
export async function AddAdminUser(data){
    return await axiosInstance.post(`/admin/create`,data);
}
export async function loginAdminUser(data){
    return await axiosInstance.post(`/admin/login`,data);
}
export async function getAllAdminUsers(){
    return await axiosInstance.get(`/admin/find-all`);
}
export async function updateAdminUsers(id,data){
    return await axiosInstance.put(`/admin/update/${id}`,data);
}
export async function deleteAdminUsers(id){
    return await axiosInstance.delete(`/admin/delete-by-id/${id}`);
}

/*********************** customer API ****************************/
export async function getAllCustomers(){
    return await axiosInstance.get(`/customers/find-all`);
}
export async function deleteCustomers(id){
    return await axiosInstance.delete(`/customers/delete-by-id/${id}`);
}
export async function countAllCustomers(){
    return await axiosInstance.get(`/customers/count-all`);
}
/*********************** Food Items API ****************************/
export async function AddProduct(data){
    return await axiosInstance.post(`/products/create`,data);
}
export async function getAllProducts(){
    return await axiosInstance.get(`/products/find-all`);
}
export async function deleteProduct(id){
    return await axiosInstance.delete(`/products/delete-by-id/${id}`);
}
export async function updateProduct(id,data){
    return await axiosInstance.put(`/products/update/${id}`,data);
}
export async function countAllProducts(){
    return await axiosInstance.get(`/products/count-all`);
}
/*********************** Orders API ****************************/
export async function getAllOrders(){
    return await axiosInstance.get(`/orders/find-all`);
}
export async function deleteOrder(id){
    return await axiosInstance.delete(`/orders/delete-by-id/${id}`);
}
export async function updateOrder(id,data){
    return await axiosInstance.put(`/orders/update/${id}`,data);
}
export async function countAllOrders(){
    return await axiosInstance.get(`/orders/count-all`);
}