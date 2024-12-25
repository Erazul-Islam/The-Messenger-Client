/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use server"

import axiosInstance from "../providers/axiosinstance"


export const addCommentService = async (createdBy: string) => {
    try {
        const response = await axiosInstance.post(`/group/create-group/${createdBy}`)

        return response.data
    } catch (err) {
        console.log(err)
    }
}