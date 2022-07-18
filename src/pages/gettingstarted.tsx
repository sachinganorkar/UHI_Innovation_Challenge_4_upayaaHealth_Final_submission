/* eslint-disable react/button-has-type */
import { withSSRContext, API } from "aws-amplify";
import { useRouter } from "next/router";
// import { useEffect } from "react";

// function summaryRequest(pk: string | number) {
//   const query = `
//     query listInfo($pk: String, $query: String) {
//       listInfo(pk: $pk, query: $query) {
//         sk
//       }
//     }
//   `;

//   return API.graphql({
//     query,
//     variables: {
//       pk,
//       query: "",
//     },
//     authMode: "AMAZON_COGNITO_USER_POOLS",
//   });
// }

function createFlow(pk: string | number) {
  const query = `
    mutation createFlow($pk: String!, $content: String!) {
      createSummary(pk: $pk, content: $content) {
        pk
      }
    }
  `;
  return API.graphql({
    query,
    variables: {
      pk,
      content: JSON.stringify({
        type: "triage",
      }),
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getServerSideProps({ req }: any) {
  const { Auth } = withSSRContext({ req });

  // console.log(query)
  // redirect if no query for param found

  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();

    return {
      props: {
        token,
        authenticated: true,
        username: user.username,
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

function GettingStarted() {
  const router = useRouter();

  return (
    <div className="max-w-4xl p-10">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Challenge 4- 2 Problem statements
          </h2>
          <ul className="mt-4 flex flex-col text-sm text-gray-500 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <li className="py-4">
              <strong>Triage Tool</strong>
            </li>
            <li className="py-4">
              <strong>Assumptions-</strong> Based on earlier work experience in
              handling primary care units across India and operational points of
              minimal time for a front end health worker at a public health
              facility of patient load of 100 -200 have put symptoms/ conditions
              and departments which cover 60-70% match.
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={async () => {
          const id = new Date().getTime();
          // console.log(id);
          await createFlow(id);
          router.push(`/walkthrough?id=${id}`);
        }}
        type="button"
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Walkthrough Flow
      </button>
    </div>
  );
}

export default GettingStarted;
