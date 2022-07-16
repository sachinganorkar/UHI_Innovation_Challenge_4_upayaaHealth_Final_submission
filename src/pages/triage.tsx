/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import dynamic from "next/dynamic";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

function TriageForm() {
  return (
    <div className="questionForm">
      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: "short-text",
              id: "kd12edg",
              attributes: {
                required: true,
                label: "Let's start with your name",
              },
            },
            {
              name: "short-text",
              id: "kd12edss",
              attributes: {
                required: true,
                label: "Let's start with your age",
              },
            },
            {
              name: "date",
              id: "a213rsew",
              attributes: {
                required: true,
                label: "Please type your birth of date!",
              },
            },
            {
              name: "number",
              id: "wer3qdkdb",
              attributes: {
                required: true,
                label: "Great {{field:kd12edg}}, can you type your age?",
              },
            },
            {
              name: "multiple-choice",
              id: "gqr1294c",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "Which subjects do you love the most?",
                choices: [
                  {
                    label: "Physics",
                    value: "physics",
                  },
                  {
                    label: "Math",
                    value: "math",
                  },
                  {
                    label: "English",
                    value: "english",
                  },
                  {
                    label: "Biology",
                    value: "biology",
                  },
                ],
              },
            },
            {
              name: "long-text",
              id: "m35612edg",
              attributes: {
                required: true,
                label: "Type a brief about yourself!",
              },
            },
          ],
        }}
        onSubmit={() => {
          // console.log(data);
        }}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(TriageForm), {
  ssr: false,
});
