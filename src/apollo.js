import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"

const TOKEN = "token"
const DARK_MODE = "DARK_MODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token)
    isLoggedInVar(true)
}

export const logUserOut = () => {
    localStorage.removeItem(TOKEN)
    isLoggedInVar(false)
    window.location.reload()
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)))

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled")
    darkModeVar(true)
}

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE)
    darkModeVar(false)
}

export const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === "production"
            ? "https://still-cliffs-03052-e61131a19821.herokuapp.com/graphql"
            : "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
})
