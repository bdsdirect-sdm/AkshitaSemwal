import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSeekers: React.FC = () => {
  const [jobSeekers, setJobSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const[status, setStatus] = useState("");
  const[id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobSeekers = async () => {
      const token = localStorage.getItem("authToken");
      console.log("TOKEN::::::::::::::",token)
      try {
        const response = await axios.get(
          "http://localhost:4000/users/jobseekers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setId(response.data.jobSeekers[0].id);
        setJobSeekers(response.data.jobSeekers);
        console.log("DATAAA", response.data.jobSeekers)
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching job seekers");
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekers();
  }, []);

  async function handleStatus(values: string, jobSeekerId: number) {
    setStatus(values);
    console.log("values",values)
    await axios.put(
      `http://localhost:4000/users/${jobSeekerId}`,{status:values}
    );
  }

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Seekers List</h2>
      <ul className="list-group">
        {jobSeekers?.map((jobSeeker: any) => (
          <li
            key={jobSeeker.id}
            className="list-group-item d-flex align-items-center"
          >
            <img
              src={`http://localhost:4000/${jobSeeker.photopath}`}
              alt={`${jobSeeker.firstname} ${jobSeeker.lastname}'s Profile`}
              className="rounded-circle me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h5>
                {jobSeeker.firstname} {jobSeeker.lastname}
              </h5>
              <p className="mb-0">{jobSeeker.email}</p>
              <p className="mb-0">{jobSeeker.hobbies}</p>
              <p className="mb-0">{jobSeeker.phone}</p>
              <p className="mb-0">Status: {jobSeeker.status}</p>
            </div>
            {
              jobSeeker.status !== "null" ? 
                <select onChange={async (event) => {
                    const selectedValue = event.target.value;
                    await handleStatus(selectedValue, jobSeeker.id); 
                  }}>
                    <option value="pending">Select</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                    <option value="declined">Decline</option>
                  </select>
                  : null
            }
            

            { jobSeeker.status === "accepted" ? ( 
              <button onClick={() => navigate(`/chatroom/${jobSeeker.id}-${id}`)}>
                Chat
              </button>
              ): ( null)}

          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default JobSeekers;

//if accept, then chatroom enabled for jobseeker
