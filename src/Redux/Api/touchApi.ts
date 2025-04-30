import baseApi from "./baseApi";

const touch = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userTouch: build.query({
            query: ({ lang, role }) => ({
                url: `/touch/`,
                method: 'GET'
            }),
            providesTags: ["complains"]
        }),
    }
    )
})

export const { useUserTouchQuery} = touch