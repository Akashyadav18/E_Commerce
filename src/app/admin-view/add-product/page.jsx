"use client"

import InputComponents from '@/components/FormElements/InputComponents'
import SelectComponents from '@/components/FormElements/SelectComponents'
import TileComponent from '@/components/FormElements/TileComponents'
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from '@/utils'
import React, { useContext, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addNewProduct } from '@/services/product'
import { GlobalContext } from '@/context/Index'
import toast from 'react-hot-toast'
import ComponentLevelLoader from '@/components/Loader/componentLevel'
import { useRouter } from 'next/navigation'

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`
}

async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on('state_changed', (snapshot) => { }, (error) => {
      console.log(error);
      reject(error);
    }, () => {
      getDownloadURL(uploadImage.snapshot.ref)
        .then(downloadUrl => resolve(downloadUrl))
        .catch(error => reject(error));
    })
  })
}

const initialFormData = {
  name: '',
  description: '',
  price: 0,
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  imageUrl: '',
  priceDrop: 0
}

const AdminAddNewProduct = () => {

  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const { componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);

  async function handleImage(e) {
    console.log(e.target.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(e.target.files[0]);
    if (extractImageUrl !== '') {
      setFormData({ ...formData, imageUrl: extractImageUrl });
    }
  }

  function handleTileClick(getCurrentItem) {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === getCurrentItem.id);
    if (index === -1) {
      copySizes.push(getCurrentItem)
    } else {
      copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id)
    }

    setFormData({ ...formData, sizes: copySizes })
  }

  async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: '' });
    const res = await addNewProduct(formData);
    console.log(res);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.success(res.message, { position: "top-center" });
      setFormData(initialFormData);
      setTimeout(() => {
        router.push("/admin-view/all-products")
      }, 1000)
    } else {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.error(res.message, { position: "top-center" });
      setFormData(initialFormData);
    }
  }

  return (
    <div className='w-full mt-3'>
      <div className='flex flex-col justify-start items-start p-10 shadow-md'>
        <div className='w-full space-y-8'>
          <input accept='image/*' max="1000000" type='file' onChange={handleImage} />
          <div className='flex gap-2 flex-col'>
            <label>Available size</label>
            <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes} />
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 mt-4'>
          {
            adminAddProductformControls.map((controlItem) => (
              controlItem.componentType === 'input' ?
                <InputComponents value={formData[controlItem.id]} onChange={(e) => { setFormData({ ...formData, [controlItem.id]: e.target.value }) }} key={controlItem.id} type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label} />
                :
                controlItem.componentType === 'select' ?
                  <SelectComponents value={formData[controlItem.id]} onChange={(e) => { setFormData({ ...formData, [controlItem.id]: e.target.value }) }} key={controlItem.id} label={controlItem.label} options={controlItem.options} />
                  : null
            ))
          }
          <button onClick={handleAddProduct} className='py-2 border border-black text-center hover:bg-black hover:text-white'>
          {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader text={"Adding Product"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading} />
            ): (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAddNewProduct
