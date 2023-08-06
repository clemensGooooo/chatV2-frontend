import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
        <div>

            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Site
                    </Typography>
                    <Link to={"/dashboard"}>
                        <Button color="inherit" sx={{
                            color: "white"
                        }}>go to dashboard</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className="section1">

                <img src="https://placehold.co/800x300.png" />
                <h1>Lorem Ipsum</h1>
                <section>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </section>
            </div>
        </div>
    )
}