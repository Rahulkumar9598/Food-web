"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../store/slices/userSlice";

const AuthProvider = ({ children }) => {

    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log("token from the authproviders", token)

        if (!token) {
            return;
        }

        const getUser = async () => {

            try {
                console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggg")

                const response = await axios.get(
                    "http://localhost:3000/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response, " this is response from AuthProvider")

                if (response.data.success) {

                    dispatch(
                        setUser(response.data.result)
                    );

                } else {

                    localStorage.removeItem("token");
                    dispatch(logoutUser());

                }

            } catch (error) {
                console.log("AUTH ERROR:", error.response?.data);
                console.log("STATUS:", error.response?.status);
                console.log("FULL ERROR:", error);
                console.log(
                    "AUTH ERROR:",
                    error
                );

                localStorage.removeItem("token");

                dispatch(logoutUser());
            }
        };

        getUser();

    }, [dispatch]);

    return children;
};

export default AuthProvider;