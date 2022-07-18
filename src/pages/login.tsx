/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
import { Auth, withSSRContext } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export async function getServerSideProps({ req, res }: any) {
  const { Auth } = withSSRContext({ req });
  try {
    await Auth.currentAuthenticatedUser();
    res.writeHead(302, { Location: "/gettingstarted" });
    res.end();
  } catch (err) {
    // console.log("Error, user not authenticated")
  }
  return { props: {} };
}

export default function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm();

  const [userPool, setUserPool] = useState(null);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const cognitoUserPool = await Auth.signIn({
        username: data.username,
        password: data.password,
      });

      if (cognitoUserPool.challengeName === "NEW_PASSWORD_REQUIRED") {
        setUserPool(cognitoUserPool);
        // console.log("Change Password")
        // await Auth.changePassword(userInfo, 'Password', 'Password@123')
      } else {
        await router.push("/gettingstarted");
      }
    } catch (err) {
      // window.__error = err
      // if (err.code === "UserNotFoundException") {
      //   setError("username", { type: "Custom", message: err.message });
      // } else {
      //   // if (err.code === '' 'NotAuthorizedException')

      // }
      setError("password", { type: "Custom", message: err.message });
    }
  };

  const handleNewPasswordSubmit = async (data: any) => {
    await Auth.completeNewPassword(userPool, data.newPassword);
    await router.push("/gettingstarted");
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center">UHI - Hackathon</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {userPool ? (
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleNewPasswordSubmit)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="newPassword" className="sr-only">
                  New Password
                </label>
                <input
                  {...register("newPassword", { required: true })}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && errors.password.message && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Set New Password
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  id="username"
                  name="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Username"
                />
                {errors.username && errors.username.message && (
                  <p className="text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && errors.password.message && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
