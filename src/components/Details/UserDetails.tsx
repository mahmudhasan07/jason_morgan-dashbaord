"use client";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";


interface UserDetail { id: string, businessName: string, businessAddress: string, startDay: string, endDay: string, startTime: string, endTime: string }

const UserDetails: React.FC = () => {
    const { id } = useParams();
    console.log("User ID:", id); // Debugging ID

    const { user, loading } = useSingleUserQuery(id, {
        selectFromResult: ({ data, isLoading }) => {
            console.log("Fetched User Data:", data); // Debugging API Response
            return {
                user: data?.data,
                loading: isLoading,
            };
        },
    });

    if (loading) return <Loader className="w-40 mx-auto" />;
    if (!user) return <p className="text-center text-red-500">⚠️ User not found or API error!</p>;

    console.log(user);


    return (
        <div className="container mx-auto p-4">
            {/* User Info */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
                {
                    loading ?
                        <Loader className="w-20 mx-auto"></Loader>
                        :
                        user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={80}
                                height={80}
                                className="rounded-full w-20 h-20 object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}
                <div>
                    <h2 className="text-xl font-semibold">{user.name || "No Name"}</h2>
                    <p className="text-gray-500">{user.email || "No Email"}</p>
                    <p className="text-sm text-blue-600 font-medium">
                        Role: {user.role || "No Role"}
                    </p>
                </div>
            </div>

            {/* Business Profile */}
            {user.BusinessProfile ? (
                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Business Profile</h3>
                    <div key={user.BusinessProfile.id} className="border-b pb-3 mb-3">
                        <Image src={user.BusinessProfile?.image} alt="profile images" height={150} width={150} className="rounded-full"></Image>
                        <h4 className="text-md font-medium">{user.BusinessProfile?.businessName || "No Name"}</h4>
                        <p className="text-gray-500">{user.BusinessProfile?.businessAddress || "No Address"}</p>
                        <p className="text-sm text-gray-600">
                            Open: {user.BusinessProfile?.startDay} - {user.BusinessProfile?.endDay} ({user.BusinessProfile?.startTime} - {user.BusinessProfile?.endTime})
                        </p>
                    </div>
                </div>
            ) : (
                <p className="mt-6 text-gray-400">No Business Profile Found</p>
            )}

            {/* Services */}
            {user?.BusinessProfile?.Service?.length > 0 ? (
                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            loading ?
                                <Loader className="w-20 mx-auto"></Loader>
                                :
                                user?.BusinessProfile?.Service.map((service: any) => {
                                    const averageRating =
                                        service.Review?.length > 0
                                            ? (
                                                service.Review.reduce((sum: number, r: any) => sum + r.rating, 0) /
                                                service.Review.length
                                            ).toFixed(1)
                                            : "No reviews";

                                    return (
                                        <div key={service.id} className="border rounded-lg p-4 shadow">
                                            {
                                                loading ?
                                                    <Loader className="w-20 mx-auto"></Loader>
                                                    :
                                                    service.image ? (
                                                        <Image
                                                            src={service.image}
                                                            alt={service.name}
                                                            width={200}
                                                            height={150}
                                                            className="rounded-lg object-cover w-full h-40"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-500">No Image</span>
                                                        </div>
                                                    )}
                                            <h4 className="text-md font-medium mt-2">{service.name || "No Name"}</h4>
                                            <p className="text-gray-500 text-sm">{service.description || "No Description"}</p>
                                            <p className="text-gray-700 font-bold">${service.price || "0.00"}</p>
                                            {service.discountPrice > 0 && (
                                                <p className="text-green-600 text-sm">
                                                    Discount Price: ${service.discountPrice}
                                                </p>
                                            )}
                                            <p className="text-yellow-500 text-sm">Rating: {averageRating}</p>
                                        </div>
                                    );
                                })}
                    </div>
                </div>
            ) : (
                <p className="mt-6 text-gray-400">No Services Found</p>
            )}
        </div>
    );
};

export default UserDetails;
