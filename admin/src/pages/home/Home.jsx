import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect, useMemo, useState} from "react";
import {userRequest} from "../../Hooks/useRequestMethods";

export default function Home() {
    const [userStats, setUserStats] = useState([])
    const MONTHS = useMemo(
        ()=>[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    )
    useEffect(()=>{
        try{
            userRequest.get('/user/stats').then(res=>{
                res.data.map(item=>{
                    setUserStats(prev=>[
                        ...prev,
                        {name: MONTHS[item._id-1], "Active User": item.total}
                    ])
                })
            })
        }catch (e) {
            console.log(e.message)
        }
    },[MONTHS])
    console.log('Stats: ', userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
