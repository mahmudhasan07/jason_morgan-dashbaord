import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["logIn"]
        }),
        allUsers: build.query({
            query: ({ page, limit, email, activeTab }) => ({
                url: `/admin?page=${page}&limit=${limit}&email=${email}&role=${activeTab}`,
                method: "GET"
            }),
            providesTags: ["allUsers"]
        }),

        singleUser: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "GET"
            })
        }),

        allCreators: build.query({
            query: ({ page, limit, email }) => ({
                url: `/user/creator-user-all?page=${page}&limit=${limit}&email=${email}`,
                method: "GET"
            }),
            providesTags: ["allCreators"]
        }),
        userStatusUpdate: build.mutation({
            query: (data) => {
                return {
                    url: `/user/toggle-user_status/${data?.id}`,
                    method: "PUT",
                }
            },
            invalidatesTags: ["allCreators", "allUsers"]
        })
    }),
})


export const { useLoginUserMutation, useAllCreatorsQuery, useAllUsersQuery, useUserStatusUpdateMutation, useSingleUserQuery } = userApi