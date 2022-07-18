/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Tab, RadioGroup, Listbox, Transition } from "@headlessui/react";
import { withSSRContext, API } from "aws-amplify";
import classNames from "clsx";
// import { debounce } from "lodash";
import { useEffect, useState, Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import InputNumber from "lib/components/inputNumber";
// import useDebounce from "lib/hooks/debounceHook";

function assessmentRequest(pk: string | number) {
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
      sk: "assessment",
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
}

function assessmentResult(pk: string | number, type: string, details: any) {
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

const Input = ({ value, onChange, type, error, ...rest }: any) => {
  switch (type) {
    case "text":
      return (
        <input
          className={classNames(
            "mt-1 block w-full rounded-md border p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
            error ? "border-red-300" : "border-gray-300"
          )}
          placeholder={rest?.placeholder}
          onChange={onChange}
          value={value}
        />
      );
    case "textarea":
      return (
        <textarea
          className={classNames(
            "mt-1 block w-full rounded-md border p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
            error ? "border-red-300" : "border-gray-300"
          )}
          placeholder={rest?.placeholder}
          onChange={onChange}
          value={value}
        />
      );
    case "number":
      return (
        <div className="flex items-start items-center py-2">
          <InputNumber
            className={classNames(
              "mt-1 block rounded-md border p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              error ? "border-red-300" : "border-gray-300",
              rest?.unit ? "" : "w-full"
            )}
            placeholder={rest?.placeholder}
            onChange={onChange}
            value={value}
            step={rest?.step || 0.1}
          />
          <div className="ml-3 text-sm">
            <label
              className={classNames(
                "font-medium",
                error ? "text-red-300" : "text-gray-700"
              )}
            >
              {rest?.unit}
            </label>
          </div>
        </div>
      );
    case "radio":
      return (
        <RadioGroup value={value} onChange={onChange}>
          <div className="space-y-2">
            {rest?.options.map((e: string) => (
              <RadioGroup.Option
                key={e}
                value={e}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-500"
                      : ""
                  }
              ${
                checked
                  ? "bg-blue-400 bg-opacity-75 text-white"
                  : error
                  ? "bg-red-100"
                  : "bg-white"
              }
                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {e}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      );
    case "dropdown":
      return (
        <div className="relative">
          <Listbox
            value={value || []}
            onChange={onChange}
            multiple={rest?.multiple || false}
          >
            <Listbox.Button
              className={classNames(
                "relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm",
                error ? "bg-red-100" : "bg-white"
              )}
            >
              <span className="block truncate">
                {value && Array.isArray(value) && value.length
                  ? value.join(", ")
                  : value || rest?.placeholder}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {rest?.options.map((e: string) => (
                  <Listbox.Option
                    key={e}
                    value={e}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                  >
                    {e}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-start py-2">
          <div
            className={classNames(
              "flex h-5 items-center rounded p-0.5",
              error ? "bg-red-300" : ""
            )}
          >
            <input
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
              type="checkbox"
              className={classNames(
                "h-4 w-4 rounded text-blue-600 focus:ring-blue-500",
                error ? "border-red-300" : "border-gray-300"
              )}
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">
              {rest?.checkboxLabel}
            </label>
            <p className="text-gray-500">{rest?.checkboxTip}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const Fields = ({
  name,
  elementNames = [],
  elements = [],
  addLabel = "Add",
  removeLabel = "Remove",
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
        className="p-2 text-blue-400"
        type="button"
        onClick={() => {
          // console.log('Append');
          append(
            elementNames.reduce((a: any, c: any) => ({ ...a, [c]: "" }), {})
          );
        }}
      >
        {addLabel}
      </button>
      <div>
        {fields.map((f, idx) => {
          return (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
              {elementNames.map((e: any, i: number) => (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    {elements[i].label}
                  </span>
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
                </div>
              ))}
              <button
                className="p-2 text-blue-400"
                type="button"
                onClick={() => {
                  remove(idx);
                }}
              >
                {removeLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function Layout1({ details, watchDetails, onChange }: any) {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // manually triggering to highlight error
    handleSubmit(() => {})();
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (watchDetails && watchDetails.length && name) {
        watchDetails.forEach((obj: any) => {
          if (obj.name === name && value[name] === obj.trigger) {
            setValue(obj.update.name, obj.update.value);
          }
        });
      }
      if (onChange) {
        onChange(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form>
      <button type="submit">Submit</button>
      <dl className="bg-white px-8 py-6">
        {Object.keys(details).map((key, index) => (
          <div
            className={classNames(
              "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            )}
          >
            <dt className="text-sm font-medium text-gray-500">
              {details[key].label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {details[key].type === "fields" ? (
                <Fields
                  name={key}
                  control={control}
                  defaultValue={details[key].defaultValue}
                  elements={Object.values(details[key].fields)}
                  elementNames={Object.keys(details[key].fields)}
                  addLabel={details[key].addLabel || "Add"}
                  removeLabel={details[key].removeLabel || "Remove"}
                />
              ) : (
                <Controller
                  name={key}
                  control={control}
                  rules={details[key].rules}
                  defaultValue={details[key].defaultValue}
                  render={({ field }) => (
                    <div>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors[key]}
                        {...details[key]}
                      />
                    </div>
                  )}
                />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </form>
  );
}

function Layout2({ details, watchDetails, onChange }: any) {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // manually triggering to highlight error
    handleSubmit(() => {})();
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (watchDetails && watchDetails.length && name) {
        watchDetails.forEach((obj: any) => {
          if (obj.name === name && value[name] === obj.trigger) {
            setValue(obj.update.name, obj.update.value);
          }
        });
      }
      if (onChange) {
        onChange(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form>
      {details.map((section: any) => (
        <div className="mt-10">
          <div className="md:grid md:grid-cols-6 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {section.sectionLabel}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {section.sectionDescription}
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-5 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-5 gap-6">
                    {Object.keys(section.details).map((key) => {
                      if (section.details[key].type === "label") {
                        return (
                          <h3 className="block text-lg font-medium text-gray-900">
                            {section.details[key].label}
                          </h3>
                        );
                      }
                      return (
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            {section.details[key].label}
                          </label>
                          <Controller
                            name={key}
                            control={control}
                            rules={section.details[key].rules}
                            defaultValue={section.details[key].defaultValue}
                            render={({ field }) => (
                              <div>
                                <Input
                                  value={field.value}
                                  onChange={field.onChange}
                                  error={!!errors[key]}
                                  {...section.details[key]}
                                />
                              </div>
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}

function AssessmentForm({ id }: any) {
  const [formValues, setFormValues] = useState({});

  const [form, setForm] = useState(null as any);

  useEffect(() => {
    assessmentRequest(id)
      // @ts-expect-error promise
      .then((d) => {
        // console.log(d);
        return JSON.parse(d.data.getSummaryById.content);
      })
      .then(setForm);
  }, []);

  useEffect(() => {
    const handleTabClose = (event: any) => {
      event.preventDefault();

      // console.log("beforeunload event triggered");
      assessmentResult(id, "assessmentResult", formValues);

      // eslint-disable-next-line no-param-reassign
      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 sm:rounded-lg">
      {form && (
        <Tab.Group
          onChange={() => {
            // console.log(formValues);
            assessmentResult(id, "assessmentResult", formValues);
          }}
        >
          <div className="bg-white px-8 py-6 shadow">
            <div className="m-auto max-w-6xl sm:flex">
              <div className="flex-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {form.diagnosis}{" "}
                  {form.alias && (
                    <span className="text-sm font-light">
                      &frasl; {form.alias}
                    </span>
                  )}
                </h3>
                {form.conceptId && (
                  <p className="text-sm font-light">{form.conceptId}</p>
                )}
                {form.patientDetails && (
                  <div className="mt-1 table border-separate text-sm text-gray-500">
                    <div className="table-row-group">
                      {Object.keys(form.patientDetails).map((key) => (
                        <div className="table-row">
                          <div className="table-cell opacity-50">
                            {form.patientDetails[key].label}
                          </div>
                          <div className="table-cell px-3">
                            {form.patientDetails[key].value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex-1" />
                <Tab.List className="flex space-x-1 rounded-xl p-4 align-middle">
                  {Object.keys(form.tab).map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg p-2 text-sm font-medium leading-5 text-slate-700",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-slate-400 hover:bg-white/[0.12] hover:text-blue-500"
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <div className="flex-1" />
              </div>
            </div>
          </div>
          <Tab.Panels className="m-auto my-4 max-w-6xl sm:rounded-lg">
            {Object.keys(form.tab).map((tab) => {
              return (
                <Tab.Panel unmount={false}>
                  {
                    // @ts-expect-error any
                    {
                      layout1: (
                        <Layout1
                          details={form.tab[tab].form}
                          watchDetails={form.tab[tab].watch}
                          onChange={(values: any) => {
                            // console.log(values);
                            setFormValues(
                              Object.assign(formValues, {
                                [tab]: values,
                              })
                            );
                          }}
                        />
                      ),
                      layout2: (
                        <Layout2
                          details={form.tab[tab].form}
                          watchDetails={form.tab[tab].watch}
                          onChange={(values: any) => {
                            // console.log(values);
                            setFormValues(
                              Object.assign(formValues, {
                                [tab]: values,
                              })
                            );
                          }}
                        />
                      ),
                    }[form.tab[tab].type]
                  }
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}

export default AssessmentForm;

/*

*/
