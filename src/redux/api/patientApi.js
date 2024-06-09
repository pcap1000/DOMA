// import { tagTypes } from "../tag-types"
// import { baseApi } from "./baseApi"
// const PAT_URL = '/patient'

// export const patientApi = baseApi.injectEndpoints({
//     endpoints: (build) => ({
//         getPatient: build.query({
//             query: (id) => ({
//                 url: `${PAT_URL}/${id}`,
//                 method: 'GET',
//             }),
//             providesTags: [tagTypes.patient]
//         }),
//         updatePatient: build.mutation({
//             query: ({ data, id }) => ({
//                 url: `${PAT_URL}/${id}`,
//                 method: 'PATCH',
//                 data: data,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }),
//             invalidatesTags: [tagTypes.patient]
//         })
//     })
// })

// export const { useGetPatientQuery, useUpdatePatientMutation } = patientApi

import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PAT_URL = '/patient';

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatients: build.query({
            query: () => ({
                url: `${PAT_URL}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: tagTypes.patient, id: arg }],
        }),
        updatePatient: build.mutation({
            query: ({ data, id }) => ({
                url: `${PAT_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.patient]
        })
    })
});

export const { useGetPatientsQuery, useGetPatientQuery, useUpdatePatientMutation } = patientApi;