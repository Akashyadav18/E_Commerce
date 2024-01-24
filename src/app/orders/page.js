"use client"

import { GlobalContext } from "@/context/Index"
import { getAllOrdersForUser } from "@/services/order";
import { useContext, useEffect } from "react"
import toast from "react-hot-toast";

export default function Orders () {

    const {user, pageLevelLoader, setPageLevelLoader, allOrdersForUser, setAllOrdersForUser} = useContext(GlobalContext);

    async function extractAllOrders () {
        setPageLevelLoader(true);
        const res = await getAllOrdersForUser(user?._id);
        if(res.success) {
            setPageLevelLoader(false);
            setAllOrdersForUser(res.data);
            toast.success(res.message, {position: "top-center"});
        } else {
            setPageLevelLoader(false);
            toast.success(res.message, {position: "top-center"});
        }
    }

    useEffect(() => {
        if(user !== null) extractAllOrders();
    }, [user]);

    console.log("AllOrders :",allOrdersForUser);

    return (
        <section>Your all Orders</section>
    )
}