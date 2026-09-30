import { useState,useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data,setData] = useState(null);
  const [membership,setMembership] = useState([])
  const [planMember,setPlanMember]= useState("")
  const navigate = useNavigate();
  const {id} = useParams();
  

  const handleSwitchBtn = async() => {
      let statuss = status === "Active" ? "Pending" : "Active";
      await axios.post(`http://localhost:4000/members/change-status/${id}`,{status:statuss},{withCredentials:true}).then((response)=>{

          toast.success("Status Changed")

      }).catch(err=>{
          toast.error("Something Went Wrong")
          console.log(err);

      })
      setStatus(statuss);
  }

  const isDateInPast = (inputDate) => {
      const today = new Date(); // Get the current date
      const givenDate = new Date(inputDate); // Convert the input to a Date object
    
      return givenDate < today; // Check if the given date is before today
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/members/get-member/${id}`, { withCredentials: true });
      const member = response.data.member;
      setData(member);
      setStatus(member.status)
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error fetching member details"); 
      console.error("Error fetching member details:", error);
    }
  };

  const fetchMembership = async () => {
      await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((res) => {
          setMembership(res.data.membership);
          setPlanMember(res.data.membership[0]._id);
          if(res.data.membership.length===0){
              toast.error("No Membership Plans Available")}
  
          toast.success(res.data.membership.length+" Membership Fetched Successfully")
      }).catch(err => {
          console.log(err);
          toast.error("Failed to fetch membership details")
      })
  };

  const handleOnChangeSelect =(event)=>{
    let value = event.target.value;
    setPlanMember(value);
  }
  // console.log(planMember)

  const handleRenewSaveBtn = async()=>{
    await axios.put(`http://localhost:4000/members/update-member-plan/${id}`,{membership:planMember},{ withCredentials: true }).then((res)=>{
      setData(res.data.member)
      toast.success(res.data.message)
    })
  }

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);


  return (
    <div className="w-3/4 text-black p-5">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>

      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              src={data?.profilePic}
              className="w-full mx-auto"
            />
          </div>

          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name : {data?.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address : {data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date : {data?.createdAt?.slice(0,10).split('-').reverse().join('-')}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date : {data?.nextBillDate?.slice(0,10).split('-').reverse().join('-')}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status :{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => {
                  handleSwitchBtn();
                }}
              />
            </div>

            {
            isDateInPast(data?.nextBillDate) && 
              <div onClick={() => {if (status === "Pending") return;setRenew((prev) => !prev);}}
                className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${renew && status === "Active" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white" : null}`}>
                Renew
              </div>
            }


            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className="my-5">
                    <div>Membership</div>

                    <select value={planMember} onChange={handleOnChangeSelect} className="w-full border-2 p-2 rounded-lg">
                      {
                        membership.map((item,index)=>{
                          return(
                            <option key={index} value={item._id}>{item.months} Months Membership</option>
                          )
                        })

                      }
                    </select>
                  </div>

                  <div onClick={()=>{handleRenewSaveBtn()}}className="mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Save
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />  
    </div>
  );
};

export default MemberDetail;
