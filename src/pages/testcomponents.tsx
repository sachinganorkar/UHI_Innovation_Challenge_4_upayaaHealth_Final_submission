/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import dynamic from "next/dynamic";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

function TestForm() {
  return (
    <div className="questionForm">
      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: "short-text",
              id: "shorttext",
              attributes: {
                required: true,
                label: "Short Text",
              },
            },
            {
              name: "date",
              id: "date",
              attributes: {
                required: true,
                label: "Date!",
              },
            },
            {
              name: "number",
              id: "number",
              attributes: {
                required: true,
                label: "Great {{field:shorttext}}, can you type your age?",
              },
            },
            {
              name: "multiple-choice",
              id: "multiplechoices",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "Multiple Choices?",
                choices: [
                  {
                    label: "Option 1",
                    value: "option1",
                  },
                  {
                    label: "Option 2",
                    value: "option2",
                  },
                  {
                    label: "Option 3",
                    value: "option3",
                  },
                  {
                    label: "Option 4",
                    value: "option4",
                  },
                ],
              },
            },
            {
              name: "long-text",
              id: "longtext",
              attributes: {
                required: true,
                label: "Long Text!",
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

export default dynamic(() => Promise.resolve(TestForm), {
  ssr: false,
});
