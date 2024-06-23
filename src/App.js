import { ApolloProvider, useReactiveVar } from "@apollo/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import { client, darkModeVar, isLoggedInVar } from "./apollo"
import { ThemeProvider } from "styled-components"
import { darkTheme, lightTheme, GlobalStyles } from "./styles"
import SignUp from "./screens/Signup"
import routes from "./routes"
import { HelmetProvider } from "react-helmet-async"

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar)
    const darkMode = useReactiveVar(darkModeVar)
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Routes>
                            <Route
                                path={routes.home}
                                element={isLoggedIn ? <Home /> : <Login />}
                            />
                            {!isLoggedIn && (
                                <Route
                                    path={routes.signup}
                                    element={<SignUp />}
                                />
                            )}{" "}
                            <Route
                                path="/nomad"
                                element={
                                    <h1>nomad corders</h1> &&
                                    (!isLoggedIn ? "plz login" : null)
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    )
}

export default App
