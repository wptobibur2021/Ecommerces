import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {useEffect, useState} from "react";
import {userRequest} from "../../Hooks/useRequestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [per, setPer] = useState(0)
  useEffect(()=>{
    try{
      userRequest.get('order/income').then(res=>{
        setIncome(res.data);
        console.log('Total index 0 : ', res.data[0], 'Total Index of 1: ', res.data[1])
        setPer((res.data[1].total * 100)/ res.data[0].total - 100);
      })
    }catch (e) {
        console.log(e.message)
    }
  },[])
  console.log('income: ', income, 'Per: ', per)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(per)}% {per < 0 ? (<ArrowDownward  className="featuredIcon negative"/>) : (<ArrowUpward className="featuredIcon"/>)}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
