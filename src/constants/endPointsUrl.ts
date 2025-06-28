export const adminEndPoint = {
    LOGIN: "/admin/auth/login",
    REGISTER: "/admin/auth/register",
    GETALLSTORE: "/admin/store/all?page=1&limit=10",
    BLOCKRESTAURANT: (id: string, isActive: boolean) =>
    `/admin/store/${id}/status?isActive=${isActive}`,
}