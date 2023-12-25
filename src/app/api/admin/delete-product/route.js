import { ConnectDB } from "@/database/Connection";
import product from "@/model/Product";
import { NextResponse } from "next/server";

ConnectDB();
export const dynamic = "force-dynamic";

export async function DELETE (req) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        if(!id) {
            return NextResponse.json({message: 'Product Id Required', status: 500, success: false})
        }
        const deleteProduct = await product.findByIdAndDelete(id);
        if(deleteProduct) {
            return NextResponse.json({message: 'Product Delete Successfully', status: 200, success: true});
        } else {
            return NextResponse.json({message: 'Fail to Delete Product', status: 500, success: false});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error while deleting admin Product", status: 500, success: false})
    }
}