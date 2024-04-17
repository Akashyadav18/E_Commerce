import Cookies from 'js-cookie'

export const addToCart = async (formData) => {
    try {
        const res = await fetch("http://localhost:3000/api/cart/add-to-cart", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authentication: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getAllCartItems = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/cart/all-cart-items?id=${id}`, {
            method: "GET",
            headers: {
                Authentication: `Bearer ${Cookies.get("token")}`
            }
        });
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const deleteFromCart = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/cart/delete-from-cart?id=${id}`, {
            method: 'DELETE',
            headers: { 
                Authentication: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}