/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Tab } from "@headlessui/react";
import classNames from "clsx";

function History() {
  return (
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Personal History
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="history"
              name="history"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Social History</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="shistory"
              name="shistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Past Medical History
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="phistory"
              name="phistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Past Surgical History
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="phistory"
              name="phistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Travel History</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="thistory"
              name="thistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Medication History
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="mhistory"
              name="mhistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Allergies</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <textarea
              id="phistory"
              name="phistory"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder=""
              defaultValue=""
            />
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Consultation() {
  return (
    <div className="bg-gray-100 p-4">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Presentations
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <fieldset>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Pain or discomfort
                        </label>
                        <p className="text-gray-500">
                          In the upper middle part of the abdomen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Felling of uncomfortable fullness
                        </label>
                        <p className="text-gray-500">Soon after eating</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Nausea / vomiting
                        </label>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Reflux-like symptions
                        </label>
                        <p className="text-gray-500">
                          Heartburn or acid regurgitation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Bloating / belching / flatulence
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="others"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Others, if any specify
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="others"
                          name="others"
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          defaultValue=""
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="others"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Remark
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="others"
                          name="others"
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DyspepsiaForm() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <Tab.Group>
        <div className="px-4 py-5 sm:flex sm:px-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Dyspepsia
            </h3>
            <ul className="mt-1 max-w-2xl text-sm text-gray-500">
              <li>
                <strong>Patient Name: </strong>Mahesh
              </li>
              <li>
                <strong>Age:</strong> 32 years
              </li>
            </ul>
          </div>
          <Tab.List className="flex space-x-1 rounded-xl p-0.5">
            {[
              "History",
              "Consultation",
              "Medication",
              "Follow Up Consultation",
            ].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <History />
          </Tab.Panel>
          <Tab.Panel>
            <Consultation />
          </Tab.Panel>
          <Tab.Panel>Medication</Tab.Panel>
          <Tab.Panel>Follow Up Consultation</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default DyspepsiaForm;
