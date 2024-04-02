import React from 'react';
import { BsChatFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaPhoneSquareAlt, FaUser } from "react-icons/fa";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#F24E1E",
        },
        secondary: {
            main: "#36373A",
        }
    },
});

export default function TabBar() {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    return (
        <ThemeProvider theme={theme}>
            <BottomNavigation
                showLabels={true}
                sx={{ width: '100%', height: '10%', position: 'absolute', bottom: 0, background: '#1B1B1B' }}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>

                <BottomNavigationAction
                    label="Cá nhân"
                    value="chat"
                    onClick={() => navigate("/chat")}
                    icon={<BsChatFill
                        style={{
                            fontSize: '32',
                            margin: '10',
                            // color: '#36373A'
                        }} />}
                />

                <BottomNavigationAction
                    label="Nhóm"
                    value="chatGroup"
                    onClick={() => navigate("/chatGroup")}
                    icon={<HiUsers
                        style={{
                            fontSize: '35',
                            margin: '10',
                            // color: '#36373A'
                        }} />}
                />

                <BottomNavigationAction
                    label="Danh bạ"
                    value="friend"
                    onClick={() => navigate("/friend")}
                    icon={<FaPhoneSquareAlt
                        style={{
                            fontSize: '35',
                            margin: '10',
                            // color: '#36373A'
                        }} />} />

                <BottomNavigationAction
                    label="Tài khoản"
                    value="profile"
                    onClick={() => navigate("/profile")}
                    icon={<FaUser
                        style={{
                            fontSize: '35',
                            margin: '10',
                            // color: '#36373A'
                        }} />} />
            </BottomNavigation>
        </ThemeProvider>
    )
}
