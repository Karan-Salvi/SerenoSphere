import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const API_BASE_URL = `${BACKEND_URL}/api`;

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/sessions`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    getPublicSessions: builder.query({
      query: () => "/",
      providesTags: ["Session"],
    }),
    getMySessions: builder.query({
      query: () => "/my-sessions",
      providesTags: ["Session"],
    }),
    getMySession: builder.query({
      query: (id) => `/my-sessions/${id}`,
      providesTags: ["Session"],
    }),
    saveDraft: builder.mutation({
      query: (sessionData) => ({
        url: "/my-sessions/save-draft",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["Session"],
    }),
    publishSession: builder.mutation({
      query: (sessionData) => ({
        url: "/my-sessions/publish",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["Session"],
    }),
    updateSession: builder.mutation({
      query: ({ id, ...sessionData }) => ({
        url: `/my-sessions/${id}`,
        method: "PUT",
        body: sessionData,
      }),
      invalidatesTags: ["Session"],
    }),
    deleteSession: builder.mutation({
      query: (id) => ({
        url: `/my-sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useGetPublicSessionsQuery,
  useGetMySessionsQuery,
  useGetMySessionQuery,
  useSaveDraftMutation,
  usePublishSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApi;
