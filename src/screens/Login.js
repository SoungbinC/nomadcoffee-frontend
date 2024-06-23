import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import AuthLayout from "../components/auth/AuthLayout"
import BottomBox from "../components/auth/BottomBox"
import Button from "../components/auth/Button"
import FormBox from "../components/auth/FormBox"
import FormError from "../components/auth/FormError"
import Input from "../components/Input"
import Separator from "../components/auth/Separator"
import PageTitle from "../components/PageTitle"
import routes from "../routes"
import { gql, useMutation } from "@apollo/client"
import { logUserIn } from "../apollo"

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`

function Login() {
    const {
        register,
        handleSubmit,
        errors,
        formState,
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
    })
    const onCompleted = (data) => {
        const {
            login: { ok, error, token },
        } = data
        console.log(data)
        if (!ok) {
            return setError("result", {
                message: error,
            })
        }
        console.log(token)
        if (token) {
            logUserIn(token)
        }
    }
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    })

    const onSubmitValid = (data) => {
        if (loading) {
            return
        }
        const { username, password } = getValues()
        login({
            variables: { username, password },
        })
    }
    const clearLoginError = () => {
        clearErrors("result")
    }

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Username should be longer than 5 chars.",
                            },
                        })}
                        onChange={clearLoginError}
                        name="username"
                        type="text"
                        placeholder="Username"
                        haserror={errors?.username?.message}
                    />
                    <FormError message={errors?.username?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required.",
                        })}
                        onChange={clearLoginError}
                        name="password"
                        type="current_password"
                        placeholder="password"
                        haserror={errors?.password?.message}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading}
                    />
                    <FormError message={errors?.result?.message} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signup}
            />
        </AuthLayout>
    )
}
export default Login
