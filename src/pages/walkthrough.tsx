/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import { withSSRContext, API } from "aws-amplify";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function summaryRequest(pk: string | number) {
  const query = `
    query listInfo($pk: String, $query: String) {
      listInfo(pk: $pk, query: $query) {
        sk
      }
    }
  `;

  return API.graphql({
    query,
    variables: {
      pk,
      query: "",
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getServerSideProps({ req, query }: any) {
  const { Auth } = withSSRContext({ req });

  // console.log(query)
  // redirect if no query for param found

  if (!query.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }

  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();

    return {
      props: {
        token,
        authenticated: true,
        username: user.username,
        id: query.id,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}

function GettingStarted({ id }: any) {
  // const router = useRouter();
  const [list, setList] = useState([] as any);
  useEffect(() => {
    summaryRequest(id)
      // @ts-expect-error promise
      .then((data: any) => data.data.listInfo.map((i: any) => i.sk))
      .then(setList);
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Applicant Walkthrough
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Please complete the forms to demonstrate the workflow.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {list.includes("triage") && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/triage?id=${id}`}>Triage Form</Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                This is form filled at reception
              </dd>
            </div>
          )}
          {list.includes("triageResult") && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/jsonView?type=triageResult&id=${id}`}>
                  Triage Result
                </Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Result of the Traige form
              </dd>
            </div>
          )}
          {list.includes("department") && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/department?id=${id}`}>Department Form</Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                This is form filled by nurse in the particular department
              </dd>
            </div>
          )}
          {list.includes("departmentResult") && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/jsonView?type=departmentResult&id=${id}`}>
                  Department Result
                </Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Result of the form stored
              </dd>
            </div>
          )}
          {list.includes("assessment") && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/assessment?id=${id}`}>Assessment Form</Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                This is form filled by Doctor
              </dd>
            </div>
          )}
          {list.includes("assessmentResult") && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link href={`/jsonView?type=assessmentResult&id=${id}`}>
                  Assessment Result
                </Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Result of the Assessment stored
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default GettingStarted;
