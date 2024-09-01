"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import HistoryIcon from "@mui/icons-material/History";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreateIcon from "@mui/icons-material/Create";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { RiOrderPlayFill } from "react-icons/ri";
import ThemeSwitcher from "@/utils/theme-switcher";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import "/app.css";
import { getSocket, initSocket } from "@/utils/socket";
import { useGetNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationApi";
import {format} from 'timeago.js'
const drawerWidth = 230;

const AdminSideBar = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [notifications, setNotifications] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [audio] = useState(new Audio("/notifi.mp3"));
    const pathname = usePathname();
    let socket = getSocket()
    const {data, refetch} = useGetNotificationsQuery(undefined, {refetchOnMountOrArgChange: true})
    const [updateNotificationStatus, {isSuccess}] = useUpdateNotificationStatusMutation()

    const notificationSound = () => {
        audio.play()
    }

   useEffect(() => {
         if(data){
             setNotifications(data.notifications.filter((notification: any) => notification.status === "unread"))
         }
         if(isSuccess){
            refetch()
         }
         audio.load()
    } , [data, isSuccess])

    useEffect(()=> {
        if (socket) {
            socket.on("newNotification", (data: any) => {
                refetch()
                notificationSound()
            }
            )
        }
    },[socket])

    const handleNotificationStatus = (id: string, event: React.MouseEvent) => {
        event.stopPropagation()
        updateNotificationStatus(id)
    }

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div className="dark:text-slate-200 dark:bg-[var(--darkbg)] bg-[var(--lightest)] text-slate-900 ">
            <Toolbar className=" m-0 px-4 text-2xl font-semibold">E Learning</Toolbar>
            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className=" m-0 p-0">
                <ListItem disablePadding className="w-full">
                    <div className="flex flex-col gap-1 justify-center items-center w-full mt-2">
                        <ListItemIcon>
                            <Image
                                height={200}
                                width={200}
                                src={user?.avatar?.url || "/user.png"}
                                alt="Admin Icon"
                                className="w-24 h-24 rounded-full"
                            />
                        </ListItemIcon>
                        <ListItemText primary={user?.name} />
                        <ListItemText primary="~ Admin" />
                    </div>
                </ListItem>
            </List>

            <List className="">
                {[
                    {
                        text: "Dashboard",
                        href: "/admin",
                        icon: <DashboardIcon />,
                    },
                    { text: "Users", href: "/admin/users", icon: <GroupIcon /> },
                    { text: "Invoices", href: "/admin/orders", icon: <ReceiptIcon /> },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className="">
                {[
                    {
                        text: "Create Course",
                        href: "/admin/create-course",
                        icon: <CreateIcon className=" dark:text-slate-300" />,
                    },
                    {
                        text: "Live Courses",
                        href: "/admin/courses",
                        icon: <LiveTvIcon />,
                    },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className="">
                {[
                    { text: "Hero", href: "/admin/hero", icon: <HomeIcon /> },
                    { text: "FAQ", href: "/admin/faq", icon: <StarIcon /> },
                    {
                        text: "Categories",
                        href: "/admin/categories",
                        icon: <CategoryIcon />,
                    },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className="">
                {[
                    { text: "Manage Team", href: "/admin/team", icon: <GroupIcon /> },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className="">
                {[
                    {
                        text: "Courses Analytics",
                        href: "/admin/course-analytics",
                        icon: <AnalyticsIcon />,
                    },
                    {
                        text: "Order Analytics",
                        href: "/admin/order-analytics",
                        icon: <RiOrderPlayFill />,
                    },
                    {
                        text: "User Analytics",
                        href: "/admin/user-analytics",
                        icon: <RiOrderPlayFill />,
                    },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-gray-300 dark:bg-gray-700  m-0 p-0" />

            <List className="">
                {[
                    { text: "Logout", href: "/admin/logout", icon: <HistoryIcon /> },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={
                            pathname === item.href
                                ? "bg-[#7c40b99f]  dark:bg-[#5544666c] text-white"
                                : ""
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon className="dark:text-slate-300">
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className=" bg-[var(--lightest)] dark:bg-[var(--darkbg)] text-black dark:text-white ">
                    <div className="flex items-center text-[var(--darker)] justify-end gap-4 w-full mx-auto mr-8">
                        <ThemeSwitcher />
                        <div className="relative cursor-pointer" onClick={() => setOpen((prev) => !prev )}>
                            <IoNotificationsOutline className="dark:text-slate-300 text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-cyan-400 rounded-full w-5 h-5 text-[12px] flex items-center justify-center ">
                                {notifications && notifications.length}
                            </span>
                            {
                              notifications.length > 0 &&  open && (
                                    <div className="absolute w-[360px] right-0 h-[65vh] z-10 overflow-y-scroll px-3 py-4  dark:bg-slate-700 bg-slate-300 shadow-xl text-black dark:text-white rounded-sm ">
                                        <h1 className="text-center text-lg font-bold p-3">Notifications</h1>
                                        {
                                            notifications && notifications.map((notification: any) => (
                                                <div key={notification._id} className="p-3 border dark:bg-slate-800 bg-white shadow-lg rounded-lg my-2">
                                                    <div className="flex justify-between">
                                                        <h1 className="font-semibold">{notification.title}</h1>
                                                        <button onClick={(event) => handleNotificationStatus(notification._id, event)} className="text-green-500 text-sm px-2 ">Mark as Read</button>
                                                    </div>
                                                    <p>{notification.message}</p>
                                                    <p className="flex justify-end dark:text-slate-400 text-sm text-slate-700">{format(notification.createdAt)} </p>
                                                </div>
                                            ))

                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

export default AdminSideBar;
