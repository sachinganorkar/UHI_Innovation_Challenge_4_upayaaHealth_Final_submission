/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { RadioGroup, Listbox } from "@headlessui/react";
import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import InputNumber from "lib/components/inputNumber";

const dynamicForm: any = {
  firstName: {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  lastName: {
    label: "Last Name",
    type: "textarea",
    placeholder: "Enter your last name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  age: {
    label: "age",
    type: "number",
    placeholder: "Enter your age",
    defaultValue: "",
    step: 0.5,
    min: 10,
    max: 100,
    rules: {
      required: true,
    },
  },
  gender: {
    label: "Gender",
    type: "radio",
    options: ["male", "female"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  profession: {
    label: "Profession",
    type: "dropdown",
    options: ["Frontend Developer", "Backend Developer", "Devops Engineer"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  agree: {
    type: "checkbox",
    label: "",
    checkboxLabel: "I hereby agree to the terms.",
    defaultValue: true,
    rules: {
      required: true,
    },
  },
  drugs: {
    type: "fields",
    label: "",
    defaultValue: [{ firstName: "", lastName: "" }],
    fields: {
      firstName: {
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        defaultValue: "",
        rules: {
          required: true,
        },
      },
      lastName: {
        label: "Last Name",
        type: "textarea",
        placeholder: "Enter your last name",
        defaultValue: "",
        rules: {
          required: true,
        },
      },
      age: {
        label: "age",
        type: "number",
        placeholder: "Enter your age",
        defaultValue: "",
        step: 0.5,
        min: 10,
        max: 100,
        rules: {
          required: true,
        },
      },
    },
  },
};

const Input = ({ value, onChange, type, ...rest }: any) => {
  switch (type) {
    case "text":
      return (
        <input
          placeholder={rest?.placeholder}
          onChange={onChange}
          value={value}
        />
      );
    case "textarea":
      return (
        <textarea
          placeholder={rest?.placeholder}
          onChange={onChange}
          value={value}
        />
      );
    case "number":
      return (
        <InputNumber
          placeholder={rest?.placeholder}
          onChange={onChange}
          value={value}
          step={rest?.step || 0.1}
        />
      );
    case "radio":
      return (
        <RadioGroup value={value} onChange={onChange}>
          {rest?.options.map((e: string) => (
            <RadioGroup.Option key={e} value={e}>
              {({ checked }) => (
                <span className={checked ? "bg-blue-200" : ""}>{e}</span>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      );
    case "dropdown":
      return (
        <Listbox value={value || []} onChange={onChange}>
          <Listbox.Button>
            {value && isArray(value) && value.length
              ? value.join(", ")
              : value || "Select Option"}
          </Listbox.Button>
          <Listbox.Options>
            {rest?.options.map((e: string) => (
              <Listbox.Option key={e} value={e}>
                {e}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      );

    case "checkbox":
      return (
        <input
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      );

    default:
      return null;
  }
};

const Fields = ({
  name,
  elementNames = [],
  elements = [],
  control, // defaultValue,
}: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  // console.log(fields);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // console.log('Append');
          append(
            elementNames.reduce((a: any, c: any) => ({ ...a, [c]: "" }), {})
          );
        }}
      >
        append
      </button>
      <button
        type="button"
        onClick={() => {
          remove();
        }}
      >
        delete
      </button>
      {fields.map((f, idx) => {
        return elementNames.map((e: any, i: number) => (
          <Controller
            key={`${f.id}_${i}`}
            name={`${name}.${idx}.${elementNames[i]}`}
            control={control}
            rules={elements[i].rules}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                {...elements[i]}
              />
            )}
          />
        ));
      })}
    </div>
  );
};

const Error = ({ children }: any) => <p style={{ color: "red" }}>{children}</p>;

const onSubmit = (data: any) => console.log(data);

const DynamicForm = ({ setFormValues }: any) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "agree" && value[name]) {
        setValue("gender", "male");
      }
      if (setFormValues) {
        setFormValues(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formInputs = Object.keys(dynamicForm).map((e) => {
    const { rules, defaultValue, label, type, fields } = dynamicForm[e];

    return (
      <section key={e}>
        <label>{label}</label>
        {type === "fields" ? (
          <Fields
            name={e}
            control={control}
            defaultValue={defaultValue}
            elements={Object.values(fields)}
            elementNames={Object.keys(fields)}
          />
        ) : (
          <Controller
            name={e}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <div>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  {...dynamicForm[e]}
                />
              </div>
            )}
          />
        )}
        {errors[e] && <Error>This field is required</Error>}
      </section>
    );
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="wrapper">
      <h1>Dynamic Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="e-success">
            Success
          </button>
        </div>
      </form>
    </div>
  );
};

function HOC() {
  const [formValues, setFormValues] = useState({});
  console.log("FORM VALUES ", formValues);
  return (
    <div>
      <DynamicForm
        setFormValues={(values: any) => {
          setFormValues(values);
        }}
      />
    </div>
  );
}

export default HOC;
