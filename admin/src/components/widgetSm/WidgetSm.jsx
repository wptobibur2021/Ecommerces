import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {userRequest} from "../../Hooks/useRequestMethods";
import useNotification from "../../Hooks/useNotification";

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  const {errorNotify} = useNotification()
  useEffect(()=>{
    const getUser = async () =>{
      try{
        await userRequest.get('/user/all?new=true').then(res=>{
          setUsers(res.data)
        })
      }catch (e) {
        errorNotify(e.message)
      }
    }
    getUser()
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((user)=>(
            <li className="widgetSmListItem" key={user._id}>
              <img
                  src={user.img || "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" }
                  alt={user.fullname}
                  className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.fullname}</span>
                <span className="widgetSmUserTitle">Software Engineer</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
        ))}
      </ul>
    </div>
  );
}
