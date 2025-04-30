"use client";
import TableLoader from '@/components/Loader/TableLoader';
import { useUserTouchQuery } from '@/Redux/Api/touchApi';
import React from 'react';

const page = () => {

    const { result, isLoading } = useUserTouchQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            isLoading: isLoading
        })

    })
    return (
        <div className="overflow-x-auto p-10">
            {
                isLoading ?
                    <TableLoader columns={5}></TableLoader>
                    :
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border">Serial</th>
                                <th className="px-4 py-2 border">Name</th>
                                {/* <th className="px-4 py-2 border">Order Id</th> */}
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Role</th>
                            </tr>
                        </thead>
                        <tbody aria-colspan={15}>
                            {
                                result?.map((item: any, index: number) => (
                                    <tr key={index} className="border-b text-center">
                                        <td className="px-4 text-nowrap py-2">{index + 1}</td>
                                        <td>{item?.name || "N/A"}</td>
                                        <td>${item.email ?? 0}</td>
                                        <td>{item.phone || "N/A"}</td>
                                        <td>{item.role || "N/A"}</td>
                                        {/* <td className="px-4 py-2">{item.total_tickets}</td>
                        <td className="px-4 py-2">{item.date}</td> */}

                                        {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            }

        </div>
    );
};

export default page;