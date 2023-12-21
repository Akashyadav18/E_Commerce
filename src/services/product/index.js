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