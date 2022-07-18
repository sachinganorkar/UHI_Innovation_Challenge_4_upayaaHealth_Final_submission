/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import { withSSRContext, API } from "aws-amplify";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

function triageRequest(pk: string | number) {
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
      sk: "triage",
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

function triageResult(pk: string | number, type: string, details: any) {
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

function TriageForm({ id }: number) {
  const [content, setContent] = useState(null as any);

  useEffect(() => {
    triageRequest(id)
      // @ts-expect-error promise
      .then((d) => JSON.parse(d.data.getSummaryById.content))
      .then(setContent);
  }, []);

  return (
    <div className="questionForm">
      {content && (
        <Form
          formId="1"
          formObj={content}
          onSubmit={({ answers }, { completeForm }) => {
            const status = answers.status.value[0];
            const gender = answers.status.value[0];
            const selection = answers.symptom.value.split("::");
            const symptom = parseInt(selection[0], 10) + 1;
            const name = answers.patientName.value;
            const age = answers.patientAge.value;

            // console.log(answers);
            const patientInfo = {
              name: {
                label: `Patient's name`,
                value: name,
              },
              age: {
                label: `Patient's age`,
                value: age,
              },
              gender: {
                label: `Patient's gender`,
                value: gender,
              },
            };

            const result = {
              patientInfo,
              status,
              symptom,
              selection,
            };

            completeForm();
            if (status === "nonemergency") {
              Promise.all([
                triageResult(id, "department", { name, symptom, patientInfo }),
                triageResult(id, "triageResult", result),
              ]).then(() => Router.push(`/walkthrough?id=${id}`));
            }
            triageResult(id, "triageResult", result).then(() =>
              Router.push(`/walkthrough?id=${id}`, undefined, { shallow: true })
            );

            // Complete form
            // completeForm();
            // if (status === "nonemergency" && symptom && name) {
            //   Router.push(`/department?name=${name}&option=${symptom}`);
            // }
          }}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(TriageForm), {
  ssr: false,
});
