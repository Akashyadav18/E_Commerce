import Cookies from 'js-cookie'


export const addNewProduct = async(formData) => {
    try {
        const response = await fetch('/api/admin/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authentication: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllAdminProducts = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/admin/all-products`, {
            method: 'GET',
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
        
    } catch (error) {
        console.log("Error while getting admin products", error);
    }
}

export const updateAProduct = async (formData) => {
    try {
        const res = await fetch('/api/admin/update-product', {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                Authentication: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("Error while updating product", error);
    }
}

export const deleteAProduct = async (id) => {
    try {
        const res = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: "DELETE",
            headers: {
                Authentication: `Bearer ${Cookies.get("token")}`,
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error white deleting product", error);
    }
}

export const productByCategory = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/client/product-by-category?id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export const productById = async (id) => {
    try {
        const res = await fetch(`/api/client/product-by-id?id=${id}`, {
            method: 'GET',
            cache: "no-store"
        });
        const data = await res.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}