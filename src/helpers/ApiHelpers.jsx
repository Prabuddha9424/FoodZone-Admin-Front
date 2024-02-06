import axios from "axios";
const url='http://localhost:3000/api/v1'
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