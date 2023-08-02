import {React,useState} from "react";
import { AppBar,Box, Toolbar,Typography,Tabs,Tab } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import {ThemeProvider,createTheme} from "@mui/material";
import '../App.css';
import {Link,useNavigate} from 'react-router-dom';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#212121', // black 계열의 색상으로 설정
        },
    },
    typography:{
        fontFamily: "'Handjet', cursive"
    },

});

function NavBar() {
    const [value, setValue] = useState(0);

    let navigator = useNavigate();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{flexGow: 1,}}>
                <AppBar enableColorOnDark position="static">
                    <Toolbar>
                        <AdbIcon sx={{ m: 2, fontSize:50 }} />
                        <Typography
                            className="Handjet"
                            variant="h3"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                            SHOP
                        </Typography>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs indicatorColor="secondary" sx={{
                                ml: 1, '& .MuiTab-root': {
                                    fontSize: '1.2rem',
                                },
                            }} value={value} onChange={handleChange} textColor="inherit">
                                <Tab label="HomePage" onClick={()=>{navigator('/')}} />

                                <Tab label="Detail" onClick={()=>{navigator('/detail')}} />
                                {/* <Tab label="Item Three" /> */}
                            </Tabs>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>    
    );
}

export default NavBar;
