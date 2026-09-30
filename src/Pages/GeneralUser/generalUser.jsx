import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/MemberCard/memberCard';
import { getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire,expired,inActiveMembers } from './data';

const GeneralUser = () => {
    const [header, setHeader] = useState("");
    const [data, setData] = useState([]);
   

    const functionCall = async (func) => {
        switch (func) {

            case "monthlyJoined":

                setHeader("Monthly Joined Members");
                let datas = await getMonthlyJoined();
                setData(datas.members);
                break;

            case "threeDayExpire":

                setHeader("Expring In 3 Days Members")
                let datas1 = await threeDayExpire();
                setData(datas1.members);
                break;

            case "fourToSevenDayExpire":
             let datas2 = await fourToSevenDaysExpire();
                setData(datas2.members);
                setHeader("Expring In 4-7 Days Members")
                break;

            case "expired":
                let datas3 = await expired();
                setData(datas3.members);
                setHeader("Expired Members")
                break;

            case "inactiveMembers":
                let datas4 = await inActiveMembers();
                setData(datas4.members);
                setHeader("InActive Members")
                break;

        }
    }

     useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func)
    }, [])

    return (
        <div className='text-black p-5 w-3/4 flex-col'>

            <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
                <Link to={'/dashboard'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                    <ArrowBackIcon /> Back To Dashboard
                </Link>
            </div>

            <div className='mt-5 text-xl text-slate-900'>
                {header}
            </div>

            <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]'>
                {/* <MemberCard /> */}
               {
                data.map((item, index) => {
                    return (
                        <MemberCard key={index} item={item} />
                    )
                })
               }
            </div>

        </div>
    )
}

export default GeneralUser