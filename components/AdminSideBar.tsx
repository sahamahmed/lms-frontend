'use client'

import React from 'react';
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
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreateIcon from '@mui/icons-material/Create';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CategoryIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { RiOrderPlayFill } from 'react-icons/ri';
import ThemeSwitcher from '@/utils/theme-switcher';
import { IoNotificationsOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

const drawerWidth = 230;

const AdminSideBar = () => {
    const {user} = useSelector((state: any) => state.auth)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const pathname = usePathname()

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
        <div className='dark:text-white dark:bg-slate-900 bg-[#bfcbd3] text-slate-900 '>
            <Toolbar className=" m-0 px-4 text-2xl font-semibold">
                E Learning
            </Toolbar>
            <Divider className="bg-white m-0 p-0" />

            <List className=" m-0 p-0">
                <ListItem disablePadding className='w-full'>
                        <div className='flex flex-col gap-1 justify-center items-center w-full mt-2'>
                            <ListItemIcon><Image height={200} width={200} src={user?.avatar?.url || '/user.png' } alt="Admin Icon" className='w-24 h-24 rounded-full' /></ListItemIcon>
                            <ListItemText primary={user?.name} />
                            <ListItemText primary="~ Admin" />
                        </div>
                </ListItem>
            </List>

            <List className="">
                {[
                    { text: "Dashboard", href: "/admin/dashboard", icon: <DashboardIcon /> },
                    { text: "Users", href: "/admin/users", icon: <GroupIcon /> },
                    { text: "Invoices", href: "/admin/invoices", icon: <ReceiptIcon /> },
                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white m-0 p-0" />

            <List className="">
                {[
                    { text: "Create Course", href: "/admin/create-course", icon: <CreateIcon /> },
                    { text: "Live Courses", href: "/admin/courses", icon: <LiveTvIcon /> },
                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white m-0 p-0" />

            <List className="">
                {[
                    { text: "Hero", href: "/admin/hero", icon: <HomeIcon /> },
                    { text: "FAQ", href: "/admin/faq", icon: <StarIcon /> },
                    { text: "Categories", href: "/admin/categories", icon: <CategoryIcon /> },
                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white m-0 p-0" />



            <List className="">
                {[
                    { text: "Manage Team", href: "/admin/team", icon: <GroupIcon /> },
                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white m-0 p-0" />

            <List className="">
                {[
                    { text: "Courses Analytics", href: "/admin/courses-analytics", icon: <AnalyticsIcon /> },
                    { text: "Order Analytics", href: "/admin/courses-analytics", icon: <RiOrderPlayFill /> },
                    { text: "User Analytics", href: "/admin/courses-analytics", icon: <RiOrderPlayFill /> }

                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.href}>
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider className="bg-white m-0 p-0" />

            <List className="">
                {[
                    { text: "Settings", href: "/admin/settings", icon: <VideoSettingsIcon /> },
                    { text: "Logout", href: "/admin/logout", icon: <HistoryIcon /> },
                ].map((item, index) => (
                    <ListItem key={index} disablePadding className={pathname === item.href ? 'bg-blue-500 text-white' : ''}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
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
                <Toolbar className="bg-[#bfcbd3] dark:bg-slate-900  ">
                    <div className="flex items-center justify-end gap-4 w-full mx-auto mr-8">
                        <ThemeSwitcher />
                        <IoNotificationsOutline className="dark:text-white text-2xl" />
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
}

export default AdminSideBar;
