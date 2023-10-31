import { NextResponse } from "next/server";
import { addDoc, collection, getCountFromServer, getFirestore } from "firebase/firestore";
import { app } from "@/firebaseconfig";

const db = getFirestore(app);

export const POST = async (
  req: Request,
  res: Response
) => {
  const order = await req.json()
  //Try to add data to a Firestore collection
  try {
    const coll = collection(db, "orders");
    const snapshot = await getCountFromServer(coll);
    const orderNo = (snapshot.data().count) + 1
    const docRef = await addDoc(collection(db, "orders"), { ...order, orderNo: orderNo });
    // console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({ message: 'Order Successfully received', orderNo: orderNo })
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ message: 'Error adding document' })
  }
}
