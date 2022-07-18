/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import { withSSRContext, API } from "aws-amplify";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

function departmentRequest(pk: string | number) {
  const query = `
    query getData($pk: String!, $sk: String!) {
      getSummaryById(pk: $pk, sk: $sk) {
        content
      }
    }
  `;

  return API.graphql({
    query,
    variables: {
      pk,
      sk: "department",
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

function departmentResult(pk: string | number, type: string, details: any) {
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
        type,
        ...details,
      }),
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

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
function DepartmentForm({ id }: any) {
  const [content, setContent] = useState(null as any);

  useEffect(() => {
    departmentRequest(id)
      // @ts-expect-error promise
      .then((d) => {
        // console.log(d);
        return JSON.parse(d.data.getSummaryById.content);
      })
      .then(setContent);
  }, []);

  return (
    <div className="questionForm">
      {content && (
        <Form
          formId="2"
          formObj={content}
          onSubmit={({ answers }, { completeForm }) => {
            completeForm();
            const number = answers.patientMobile.value;
            const department = answers.department.value[0];
            const selection = answers.selection.value[0];

            const result = {
              patientInfo: content.patientInfo,
              number,
              department,
              selection,
            };

            Promise.all([
              departmentResult(id, "assessment", result),
              departmentResult(id, "departmentResult", result),
            ]).then(() => Router.push(`/walkthrough?id=${id}`));
          }}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(DepartmentForm), {
  ssr: false,
});
