import Link from 'next/link';
import React from 'react'

const page = ({ params }:{ params: { orderNo: string } }) => {
  return (
    <>
      <div className="flex flex-col items-center m-auto">
        <h2 className="text-3xl font-bold tracking-tight">
          Thanks for you order!
        </h2>
        your order number is {params.orderNo}
      </div>
      <Link className="underline" href={"/pizza"}>
        Order more pizza...
      </Link>
    </>
  );
}

export default page