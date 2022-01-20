import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SideBarChats from "./SIdeBarChats";
import { useSelector, useDispatch } from "react-redux";
import { getRooms, newRooms } from "./../../Rx/action/rooms";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { getUsers } from "./../../Rx/action/userList";
import { server } from "../../config/config.json";
import { getLocal } from "../../utils/localstorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withRouter } from "react-router-dom";
import UploadModal from "./uploadAvatarModal";
import DropDown from "./../common/dropdown/DropDown";
import DropDownItem from "./../common/dropdown/DropDownItem";
import Switch from "@material-ui/core/Switch";
import { changeTheme } from "./../../Rx/action/theme";
const login = (user) => {
  fetch(`${server}/login`, {
    method: "Post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      if (data.status === 404) {
        toast.error(data.result);
      }
    })
    .catch((err) => toast.error("There is error from the server sorry!"));
};

const Sidebar = (props) => {
  const theme = useSelector((state) => state.theme);

  //state to change content(true:rooms , false: user)
  const [sidebarContentType, setSidebarContentType] = useState(true);

  // userList state for all users except current user
  const [diffrentUsers, setDiffrent] = useState([]);

  // state for myrooms
  const { myRooms, setMyRooms } = props;
  console.log(myRooms);
  // state for set myrooms

  const [search, setSearch] = useState("");

  // state for all rooms in the db

  const rooms = useSelector((state) => state.roomReducer);

  const users = useSelector((state) => state.userList);

  const [openUpload, setUpload] = useState(false);

  const dispatch = useDispatch();

  let avatar;
  //user that loged in that is in localstorage
  const user = getLocal("user");

  useEffect(async () => {
    //get all rooms in DB
    await dispatch(getRooms());
    //get users
    await dispatch(getUsers());

    //login when page loaded because users room shoud update
    if (user) {
      login({ email: user.result.email, pass: user.result.pass });
    }
  }, []);

  useEffect(() => {
    //show me other users not me in add new room section
    const me = user.result._id;
    const otherUsers = users.filter((elem) => elem._id !== me);
    setDiffrent(otherUsers);
  }, [users]);

  useEffect(() => {
    //show me my rooms
    setTimeout(() => {
      const userData = getLocal("user");
      const data = userData.result.room.map((elem) => {
        const filtered = rooms.filter((item) => item.roomId === elem);
        return filtered;
      });
      setMyRooms(data);
    }, 1);
  }, [rooms]);
  const searchRooms = () => {
    if (
      typeof myRooms[0] !== "undefined" &&
      myRooms[0].length > 0 &&
      typeof myRooms[0][0].users !== "undefined"
    ) {
      if (search != "") {
        const storage = JSON.parse(localStorage.getItem("user"));

        let f = [];
        myRooms.map((elem) => {
          console.log(elem);
          const index = elem[0].users.findIndex(
            (elem) => elem.id !== storage.result._id
          );
          if (elem[0].users[index].user.includes(search)) {
            f.push(elem);
          }
        });
        setMyRooms(f);
      }
    }
    if (search == "") {
      console.log("hi");
      const userData = getLocal("user");
      const data = userData.result.room.map((elem) => {
        const filtered = rooms.filter((item) => item.roomId === elem);
        return filtered;
      });
      setMyRooms(data);
    }
  };
  useEffect(() => {
    if (sidebarContentType == true) {
      searchRooms();
    } else {
      if (search != "") {
        const data = diffrentUsers.filter((elem) =>
          elem.firstname.includes(search)
        );

        setDiffrent(data);
      } else {
        const me = user.result._id;
        const otherUsers = users.filter((elem) => elem._id !== me);
        setDiffrent(otherUsers);
      }
    }
  }, [search]);

  console.log(myRooms);
  console.log(diffrentUsers);

  let fabClass = "";
  if (sidebarContentType === false) {
    fabClass = "back";
  } else {
    fabClass = "";
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  //logout
  const logout = () => {
    localStorage.removeItem("user");
    props.history.push("/login");
  };
  return (
    <div className="sidebar" ref={props.sidebarRef}>
      <div className={`${theme.color} sidebar-header`}>
        <Avatar src={`${server}/uploads/${user.result.avatar}`} />
        <div className="header-right">
          <Switch
            checked={theme.switch}
            onChange={() => dispatch(changeTheme())}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <IconButton className={theme.color}>
            <DonutLargeIcon />
          </IconButton>

          <IconButton className={theme.color}>
            <ChatIcon />
          </IconButton>

          <IconButton className={theme.color} style={{ position: "relative" }}>
            <MoreVertIcon style={{ position: "absolute" }} onClick={openMenu} />
            <DropDown
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <DropDownItem onClick={logout}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="LOGOUT" />
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  setUpload(true);
                  closeMenu();
                }}
              >
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Avatar" />
              </DropDownItem>
            </DropDown>
          </IconButton>
        </div>
      </div>

      <div className={`${theme.color} sidebar-search`}>
        <div className={`${theme.color} sidebar-search-container `}>
          <SearchIcon className={theme.color} />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search or start new chat"
          />
        </div>
      </div>

      <div className={` ${theme.color} sidebar-chats`}>
        {sidebarContentType
          ? myRooms.map((elem) => {
              return (
                <SideBarChats
                  title={elem}
                  types="chat"
                  openChat={props.openChat}
                />
              );
            })
          : diffrentUsers.map((elem) => {
              return (
                <SideBarChats
                  title={elem.firstname}
                  id={elem._id}
                  avatar={elem.avatar}
                  types="users"
                  setOpen={setSidebarContentType}
                />
              );
            })}
        <Fab
          onClick={() => setSidebarContentType(!sidebarContentType)}
          aria-label="add"
          className={`add-chat ${fabClass}`}
          ref={props.addChatBtn}
        >
          {fabClass == "" ? <AddIcon /> : <RemoveIcon />}
        </Fab>
      </div>
      <UploadModal open={openUpload} close={setUpload} />
    </div>
  );
};

export default withRouter(Sidebar);
