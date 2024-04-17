import Cookies from 'js-cookie'

export const addNewAddress = async (formData) => {
    try {
        const res = await fetch("http://localhost:3000/api/address/add-new-address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authentication: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),    
        });
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const fetchAllAddresses = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/address/get-all-address?id=${id}`, {
            method: 'GET',
            headers: {
                Authentication: `Bearer ${Cookies.get("token")}`
            },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async (formData) => {
    try {
        const res = await fetch("http://localhost:3000/api/address/update-address", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authentication: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/address/delete-address?id=${id}`, {
            method: "DELETE",
            headers: {
                Authentication: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}