import Cookies from 'js-cookie'

export const createNewOrder = async (formData) => {
    try {
        const res = await fetch('/api/orders/create-order', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                Authentication: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("Creating New Order",error);
    }
}

export const getAllOrdersForUser = async (id) => {
    try {
        const res = await fetch(`/api/orders/get-all-orders?id=${id}`, {
            method: 'GET',
            headers: { 
                Authentication: `Bearer ${Cookies.get('token')}`,
            }
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("Getting All Orders for User",error);
    }
}

export const getOrderDetails = async (id) => {
    try {
        const res = await fetch(`/api/orders/order-details?id=${id}`, {
            method: 'GET',
            headers: {
                Authentication: `Bearer ${Cookies.get('token')}`,
            }
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("",error);
    }
}