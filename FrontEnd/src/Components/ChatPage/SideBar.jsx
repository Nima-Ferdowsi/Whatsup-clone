import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SideBarChats from "./SIdeBarChats";
import { useSelector, useDispatch } from "react-redux";
import { getRooms } from "./../../action/rooms";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { getUsers } from "./../../action/userList";
import { server } from "../../config/config.json";
import { getLocal } from "../../utils/localstorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withRouter } from 'react-router-dom';

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
  const [sidebarContentType, setSidebarContentType] = useState(true);
  const [diffrentUsers, setDiffrent] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const rooms = useSelector((state) => state.roomReducer);
  const user = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  console.log(rooms);

  useEffect(async () => {
    //get rooms
    await dispatch(getRooms());
    //get users
    await dispatch(getUsers());

    const data = getLocal("user");
    //login when page loaded because users room shoud update
    if (data) {
      login({ email: data.result.email, pass: data.result.pass });
    }
  }, []);

  useEffect(() => {
    //show me other users not me in add new room section
    const me = getLocal('user').result._id;
    const news = user.filter((elem) => elem._id !== me);
    setDiffrent(news);
  }, [user]);

  useEffect(() => {
setTimeout(() => {
  const userData = getLocal("user");
  const data = userData.result.room.map((elem) => {
    const filtered = rooms.filter((item) => item.roomId === elem);
    return filtered;
  });
  setMyRooms(data);
}, 1000);
 
  }, [rooms]);

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const logout=()=>{
    localStorage.removeItem('user')
    props.history.push('/login')
  }
  return (
    <div className="sidebar" ref={props.sidebarRef}>
      <div className="sidebar-header">
        <Avatar />
        <div className="header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon onClick={openMenu} />
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <StyledMenuItem onClick={logout}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="LOGOUT" />
              </StyledMenuItem>
            </StyledMenu>
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchIcon />
          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>

      <div className="sidebar-chats">
        {sidebarContentType === true
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
                  types="users"
                  setOpen={setSidebarContentType}
                />
              );
            })}
        <Fab
          onClick={() => setSidebarContentType(!sidebarContentType)}
          aria-label="add"
          className="add-chat"
          ref={props.addChatBtn}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
