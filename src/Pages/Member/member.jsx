import React, { useEffect, useState } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MemberCard from '../../Components/MemberCard/memberCard';
import Modal from '../../Components/Modal/modal';
import AddmemberShip from '../../Components/Addmembership/addmemberShip';
import Addmembers from '../../Components/Addmembers/addmembers';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Member = () => {
     const [addMembership, setAddmemberShip] = useState(false);
    const [addMember, setAddmember] = useState(false)
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchModeOn, setIsSearchModeOn] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);

    const [startFrom, setSTartFrom] = useState(0);
    const [endTo, setEndTo] = useState(9);
    const [totalData, setTotalData] = useState(0);
    const [limit, setLimit] = useState(9);

    const [noOfPage, setNoOfPage] = useState(0);

   
    const fetchData = async (skip, limits) => {
        axios.get(`http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true }).then((res) => {
            // console.log(res);
            setData(res.data.members);
            toast.success(res.data.members.length + " Members Fetched Successfully")
            let totalData = res.data.totalMembers;
            setTotalData(totalData);
            setData(res.data.members);

            let extraPage = totalData % limit === 0 ? 0 : 1;
            let totalPage = parseInt(totalData / limit) + extraPage;
            setNoOfPage(totalPage);

            if (totalData === 0) {
                setSTartFrom(-1);
                setEndTo(0);
            } else if (totalData < 10) {
                setSTartFrom(0);
                setEndTo(totalData);
            }
        }).catch(err => {
            // console.log(err);
            toast.error("Failed to fetch members details")
        })
       
    }


    const handleMemberShip = () => {
        setAddmemberShip(prev => !prev);
    }

     const handleMembers = () => {
        setAddmember(prev => !prev);
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            let currPage = currentPage - 1;
            setCurrentPage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9);
            setSTartFrom(from);
            setEndTo(to);
             let skipValue = skip-9;
            setSkip(skipValue);
            fetchData(skipValue, 9);
        }
    }

    const handleNext = () => {
        if (currentPage !== noOfPage) {
            let currPage = currentPage + 1;
            setCurrentPage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9);
            if (to > totalData) {
                to = totalData;
            }
            setSTartFrom(from);
            setEndTo(to);
            let skipValue = skip+9;
            setSkip(skipValue);
            fetchData(skipValue, 9);
        }
    }

    const handleSearchData = async()=>{
    if(search!=="" ){
        setIsSearchModeOn(true);
        await axios.get(`http://localhost:4000/members/searched-members?searchTerm=${search}`,{withCredentials:true}).then(response=>{
            console.log(response)
            setData(response.data.members);
            setTotalData(response.data.totalMembers);
            toast.success(response.data.members.length+" Members Fetched Successfully")
        }).catch(err=>{
            console.log(err);
            toast.error("Technical Fault")
        })
    }else{
        if(isSearchModeOn){
            window.location.reload();
        }else{
            toast.error("Please Enter Name or Mobile No to Search")
        }
    }
}


 useEffect(() => {
        fetchData(0, 9);
    }, [])


  return (
    <div className='text-black p-5 w-3/4 h-screen'>

      {/* block for banner */}
      <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>

        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'onClick={() => handleMembers()}>Add member <FitnessCenterIcon/> </div>
        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={() => handleMemberShip()}>Membership <AddIcon/> </div>

      </div>

        {/* block for back to dashboard button */}
        <Link to={'/dashboard'}><ArrowBackIcon /> Back to Dashboard </Link>

         <div className='mt-5 w-1/2 flex gap-2'>
                <input type='text' value={search} onChange={(e)=>{setSearch(e.target.value)}} className='border-2 w-full p-2 rounded-lg' placeholder='Search By Name or Mobile No' />
                <div onClick={()=>{handleSearchData()}} className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'><SearchIcon /></div>
            </div>

            <div className='mt-5 text-xl flex justify-between text-slate-900'>
                <div>{isSearchModeOn ? `Total Members ${totalData}` : null}</div>
               {
                !isSearchModeOn? <div className='flex gap-5'>
                    <div>{startFrom+1} - {endTo} of {totalData} Members</div>
                    <div className={ `w-8 h-8 cursor-pointer  flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-100 text-grey-400' : 'bg-gray-200'}`} onClick={() => { handlePrev() }}> <ChevronLeftIcon/> </div>
                    <div className={ `w-8 h-8 cursor-pointer  flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noOfPage ? 'bg-gray-100 text-grey-400' : 'bg-gray-200'}`} onClick={() => { handleNext() }}><ChevronRightIcon/></div>
                </div> : null
               }
            </div>

    <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]'>

        {/* div for Member card */}
        {/* <div className='bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer'>
                <div className='w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full'>
                    <img className='w-full h-full rounded-full' src="http://res.cloudinary.com/dhlklhfgj/image/upload/v1727796565/sduu4dh2lzowc6abiv9z.jpg" alt="Profile Pic" />
                    <CircleIcon className='absolute top-0 left-0' sx={{color:"greenyellow"}}/>
                </div>

                <div className='mx-auto mt-5 text-center text-xl font-semibold font-mono'>
                    {"Shubham Kumar"}
                </div>
                <div className='mx-auto mt-2 text-center text-xl font-mono'>
                    {"+91 " + "7295086518"}
                </div>
                <div className='mx-auto mt-2 text-center text-xl font-mono'>
                    Next Bill Date : {"31-12-2024"}
                </div>
        </div> */}
      {
        data.map((item, index) => {
            return (
                <MemberCard key={index} item={item} />
            )
        })
      }


    </div>

    {addMembership && <Modal header="Add Membership" handleClose={handleMemberShip} content={<AddmemberShip    handleClose={handleMemberShip}/>} />}
    {addMember && <Modal header="Add New Member" handleClose={handleMembers} content={<Addmembers/>} />}
      <ToastContainer />
    </div>
  )
}

export default Member