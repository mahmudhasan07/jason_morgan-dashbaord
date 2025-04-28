'use client'
import React, { useState } from 'react';
import { motion } from "motion/react"
// import { useGetAllTransactionQuery } from '../Redux/Api/transaction';
import loader from '@/assests/loader.json'
import Lottie from 'lottie-react';
import Loader from '../Loader/Loader';
import { useGetAllTransactionQuery } from '@/Redux/Api/transaction';

const TransactionTable = () => {
  const [page, setPage] = useState<number>(1);
    const limit = 20;
    const { data: paymentTable, isLoading } = useGetAllTransactionQuery({page, limit})

    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const today = new Date().toISOString().split("T")[0]

    console.log("paymentTable", paymentTable);


    const totalPages = paymentTable && Math.ceil(paymentTable?.data?.length / itemsPerPage);
    const button = paymentTable && [...Array(totalPages).keys()];
    const currentPageData = paymentTable?.data && paymentTable?.data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    console.log("currentPageData", currentPageData);


 

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Serial</th>
                        <th className="px-4 py-2 border">User Name</th>
                        {/* <th className="px-4 py-2 border">Order Id</th> */}
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Admin Profit</th>
                        <th className="px-4 py-2 border">Service Name</th>
                        {/* <th className="px-4 py-2 border">Total Ticket</th>
                        <th className="px-4 py-2 border">Event Date</th> */}
                        <th className="px-4 py-2 border">Service date&time</th>
                        <th className="px-4 py-2 border">Paid</th>
                    </tr>
                </thead>
                <tbody aria-colspan={15}>
                    {isLoading ?
                        <tr>
                            <td colSpan={7} className='text-center'>
                                <Loader className={`w-36`}></Loader>
                            </td>
                        </tr>
                        :
                        currentPageData?.map((item: any, index: number) => (
                            <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                <td className="px-4 text-nowrap py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{item.User?.name || "N/A"}</td>
                                <td>${item.amount ?? 0}</td>
                                <td>${parseFloat((item.amount * 0.06).toString()).toFixed(2) ?? 0}</td>
                                <td>{item.bookingDetails?.Service?.name || "N/A"}</td>
                                <td>{item.bookingDetails?.bookingDate || "N/A"} at {item.bookingDetails?.bookingTime || "N/A"}</td>
                                <td>{item.bookingDetails?.isPaid ? "Yes" : "No"}</td>
                                {/* <td className="px-4 py-2">{item.total_tickets}</td>
                            <td className="px-4 py-2">{item.date}</td> */}

                                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                            </motion.tr>
                        ))}
                </tbody>
            </table>

            <div className="flex justify-center gap-5 mt-5">
                {
                    button && button.map((item: string, index: number) =>
                        <button onClick={() => setPage(index + 1)} className='border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold' key={index}>{item + 1}</button>)
                }
            </div>
        </div>
    );
};

export default TransactionTable;

