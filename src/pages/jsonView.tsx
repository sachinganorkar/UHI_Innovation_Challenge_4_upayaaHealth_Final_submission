/* eslint-disable sonarjs/no-gratuitous-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import { withSSRContext, API } from "aws-amplify";
import dynamic from "next/dynamic";
// import Router from "next/router";
import { useEffect, useState } from "react";
// import ReactJson from "react-json-view";
// import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

registerCoreBlocks();

function jsonRequest(pk: string | number, type: string) {
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
      sk: type,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

export async function getServerSideProps({ req, query }: any) {
  const { Auth } = withSSRContext({ req });

  // console.log(query)
  // redirect if no query for param found

  if (!(query.id && query.type)) {
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
        type: query.type,
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

function JsonView({ id, type }: any) {
  const [content, setContent] = useState(null as any);

  useEffect(() => {
    jsonRequest(id, type)
      // @ts-expect-error promise
      .then((d) => JSON.parse(d.data.getSummaryById.content))
      .then(setContent);
  }, []);

  if (content !== null) {
    return (
      <div className="questionForm">
        {content && <DynamicReactJson src={content || {}} />}
      </div>
    );
  }
  return <div>Loading ...</div>;
}

export default dynamic(() => Promise.resolve(JsonView), {
  ssr: false,
});
