"use client"

import React, { Fragment, useContext } from 'react'
import CommonModal from '../CommonModel'
import { GlobalContext } from '@/context/Index'

const CartModel = () => {

    const {showCartModal, setShowCartModal} = useContext(GlobalContext);

  return (
    <div>
        <CommonModal showButtons={true} 
        show={showCartModal} setShow={setShowCartModal} 
        buttonComponent={
            <Fragment>
                <button>Go To Cart</button>
                <button>Check Out</button>
            </Fragment>
        }/>  
    </div>
  )
}

export default CartModel
