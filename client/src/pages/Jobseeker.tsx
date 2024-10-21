import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket';

interface Agency {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
}

const AgencyDetails: React.FC = () => {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobSeekerStatus, setJobSeekerStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchAgencyDetails = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const userId = localStorage.getItem("user");

        const response = await axios.get(
          `http://localhost:4000/users/agencydetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const agencyData = response.data;
        setAgency(agencyData);
        setJobSeekerStatus(agencyData.status);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Error fetching agency details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyDetails();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-lg text-red-600">Error: {error}</div>;

  const userId = localStorage.getItem("user");
  const roomId = `${agency?.id}:${userId}`;
  console.log("Room ID:", roomId);

  function handleChat() {
    socket.emit("joinRoom", roomId);
    navigate(`/chatroom/${roomId}`);
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Agency Details</h2>
      <div className="mb-4">
        <h5 className="text-lg font-semibold">
          {agency?.firstname} {agency?.lastname}
        </h5>
        <p className="text-gray-700">
          <strong>Email:</strong> {agency?.email}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {agency?.phone}
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <button
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
          onClick={handleChat}
        >
          Click to Chat
        </button>

        {jobSeekerStatus === "accepted" && (
          <button
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
            onClick={() => navigate(`/chatroom/${userId}`)}
          >
            Click to Chat
          </button>
        )}
        
        {jobSeekerStatus === "pending" && (
          <button
            disabled
            className="w-full py-2 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed"
          >
            Chat (Pending)
          </button>
        )}
        {jobSeekerStatus === "denied" && null}
      </div>

      <div className="mt-6 text-center">
        <button
          className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AgencyDetails;
