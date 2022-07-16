/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import dynamic from "next/dynamic";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

const options = {
  set1: ["Fever clinic", "General medicine"],
  set2: ["Gastroenterology", "General Medicine"],
  set3: ["General Medicine", "Cardiology"],
  set4: ["General medicine", "Neurology"],
  set5: ["Orthopedics"],
  set6: ["Skin/ Dermatology"],
  set7: ["Gynecology"],
  set8: ["Obstetrics"],
  set9: ["Psychiatry"],
  set10: ["General medicine", "endocrinology"],
  set11: ["ENT"],
  set12: ["Ophthalmology"],
  set13: ["Urology", "Nephrology"],
  set14: ["Pulmonology"],
  set15: ["Pediatrics"],
  set16: ["Surgery"],
  set17: ["Oral and Dental"],
};

// pass Options here
export async function getServerSideProps({ query }) {
  if (
    query.name &&
    query.option &&
    parseInt(query.option, 10) <= 17 &&
    parseInt(query.option, 10) >= 1
  ) {
    return {
      props: {
        name: query.name,
        options: options[`set${query.option}`],
      }, // will be passed to the page component as props
    };
  }

  return {
    redirect: {
      destination: "/404",
      permanent: true,
    },
  };
}

function DepartmentForm(props) {
  return (
    <div className="questionForm">
      <Form
        formId="2"
        formObj={{
          blocks: [
            {
              name: "number",
              id: "patientMobile",
              attributes: {
                required: true,
                label: `${props.name}'s Mobile number`,
              },
            },
            {
              name: "multiple-choice",
              id: "department",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "Direct To Department",
                choices: props.options.map((o: string) => ({
                  label: o,
                  value: o,
                })),
              },
            },
          ],
        }}
        onSubmit={(_, { completeForm }) => {
          completeForm();
          // console.log(data);
        }}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(DepartmentForm), {
  ssr: false,
});
