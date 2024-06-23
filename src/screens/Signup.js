import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import AuthLayout from "../components/auth/AuthLayout"
import BottomBox from "../components/auth/BottomBox"
import Button from "../components/auth/Button"
import FormBox from "../components/auth/FormBox"
import Input from "../components/Input"
import PageTitle from "../components/PageTitle"
import { FatLink } from "../components/shared"
import routes from "../routes"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $name: String!
        $password: String!
    ) {
        createAccount(
            username: $username
            email: $email
            name: $name
            password: $password
        ) {
            ok
            error
        }
    }
`

function SignUp() {
    const navigate = useNavigate()
    const onCompleted = (data) => {
        const {
            createAccount: { ok },
        } = data

        if (!ok) {
            return
        }
        navigate(routes.home)
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    })
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange",
    })
    const onSubmitValid = (data) => {
        if (loading) {
            return
        }
        createAccount({
            variables: {
                ...data,
            },
        })
    }
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("firstName", {
                            required: "First Name is required.",
                        })}
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                    />
                    <Input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                    />
                    <Input
                        {...register("email", {
                            required: "Email is required.",
                        })}
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                    <Input
                        {...register("username", {
                            required: "Username is required.",
                        })}
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        {...register("password", {
                            required: "Password is required.",
                        })}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                linkText="Log in"
                link={routes.home}
            />
        </AuthLayout>
    )
}
export default SignUp
