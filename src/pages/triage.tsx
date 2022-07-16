/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
// @ts-nocheck
import dynamic from "next/dynamic";
import Router from "next/router";
import { Form } from "lib/form/core";
import { registerCoreBlocks } from "lib/form/utils";

registerCoreBlocks();

const options = [
  [
    "Fever",
    "Cough",
    "Cold",
    "Breathing difficulty",
    "Fever - continous",
    "Fever - intermittent",
    "Fever - remittent",
    "Fever - evening raise of temparature",
    "Fever - low grade",
  ],
  [
    "Nausea",
    "Vomiting",
    "Gas / Bloating/ Flatulence",
    "Constipation",
    "Belching",
    "Diarrhea /loose motion",
    "Stomach Pain",
    "Abdomen Pain",
    "Hiccups",
    "Dyspepsia",
    "Pallor",
    "Stomatitis",
    "Burning sensation in chest",
    "Altered Bowel Habits",
    "weight gain",
    "weight loss",
  ],
  [
    "Palpitations",
    "Chest Pain",
    "Hypertension Pre-existing",
    "Lipid problems Pre-existing",
    "Pre-existing heart disease condition",
    "Chest Pain",
    "Palpitations",
    "Swelling of the feet",
    "Swelling of legs",
    "Shortness of Breath",
    "Syncope",
    "Dizziness",
  ],
  [
    "Headache",
    "Migraine",
    "Epilepsy",
    "Stroke Aftercare",
    "Insomnia / Sleep loss",
    "Dementia / Memory loss",
  ],
  [
    "Knee Pain",
    "Backache",
    "Neck Pain",
    "Fractures",
    "Osteoporosis Pre-existing",
    "Knee pain",
    "Multi joint pain",
    "Neck pain",
    "Non specific myalgia",
    "Pain of the feet",
    "Shoulder pain",
    "Small joint pain",
    "Swelling of right leg",
    "Ankle pain",
    "Back pain",
    "Cramps",
    "Calf pain",
    "Elbow pain",
    "Foot pain",
    "Hip pain",
    "Heel pain",
    "Hand pain",
    "Joint stiffness",
    "Joint swelling",
    "Swelling of left leg",
    "Lower limb pain",
    "Upper limb pain",
    "Wrist pain",
  ],
  [
    "Patches on skin",
    "General Itching",
    "3.Rashes",
    "Dandruff",
    "Hair loss",
    "Skin Infections",
    "Rash",
    "Skin lesions",
    "Acne vulgaris",
    "Allergic rash",
    "Boils",
    "Cracked foot",
    "Dandruff",
    "Dermatitis",
    "Dry skin",
    "Papules",
    "Peeling skin",
    "Psoriasis",
    "Pustules",
    "Urticaria",
    "Ulcer",
    "Vitigo",
    "Wart",
    "Warts",
    "Wheels",
    "Xanthalesma",
    "Eczema",
    "Erythema",
    "Erythrasma",
    "Fungal rash",
    "Hyperpigmentation",
    "Hypopigmentation",
    "Itching",
    "Intetrigo",
    "Mole",
  ],
  [
    "White DIscharge",
    "Menstrual Disorders",
    "Menopause",
    "Family Planning advice",
    "Heavy periods",
    "Painful periods",
    "Irregular periods",
    "Scanty periods",
    "Missed discharge",
    "Spotting",
    "Intermenstructural bleeding",
    "Post- Menopausal bleeding",
    "Post coital bleeding",
    "Vaginal discharge",
    "Vaginal irritation",
    "Vaginal swelling",
    "Cervical polyp",
    "Fibroid",
    "Poly systic ovarian syndrome",
    "Poly systic ovarian disease",
    "Pregnant",
    "Infertility",
  ],
  ["Pregnancy", "Post Natal Problems"],
  [
    "Psychological complaints",
    "Anxiety diagnosed",
    "Depression diagnosed",
    "Psychosis",
    "Addictions",
    "Alcohol dependance",
    "Sexual Disorders",
    "Marital counseling",
    "Schizophrenia",
    "Mania",
    "Phobias",
    "Stress related problems",
    "Chronic Tiredness",
  ],
  [
    "Diabetes",
    "Obesity",
    "Hypothyroidism",
    "Hyperthyroidism",
    "weight loss",
    "Fatigue",
    "weight gain",
  ],
  [
    "Pain in throat",
    "Pain in ear",
    "Loss of hearing",
    "Ringing in ear",
    "Ear discharge",
    "Bleeding from nose",
    "Voice problem",
    "Ear pain",
    "Ear discharge",
    "Itching of ears",
    "Ear wax",
    "Blocked ear (s)",
    "Tinnitus",
    "Hearing loss",
    "Vertigo",
    "Deviated nasal septum",
    "Throat irritation",
    "Submental swelling",
    "Parotid swelling",
    "Mastoid swelling",
    "Maxillary swelling",
    "Frontal swelling",
    "Facial swelling",
    "Thyroid swelling",
    "Goitre",
    "Post nasal drip",
    "Sinisitis",
    "Allergic rhinitis",
    "Snoring",
    "Sleep apnoea",
    "Sore throat",
    "Change in voice",
    "Hoarseness of voice",
    "Summandibular swelling",
  ],
  [
    "Stye",
    "Foreign body in eye",
    "Loss of vision",
    "Watering of eye(s)",
    "Itching of eye(s)",
    "Eye discharge",
    "Stye",
    "Cataract",
    "Pterygium",
    "Pinguecula",
    "Corneal opacity",
    "Foreign body in eye(s)",
    "Poor acuity",
    "Visual disturbance",
    "Burning of eyes",
    "Blurring of vision",
    "Flashes",
    "Floaters",
    "Photophobia",
    "Loss of vision",
    "Eye pain",
    "Redness of eye(s)",
  ],
  [
    "Urinary problems",
    "Blood in Urine",
    "Urinary Tract Infections",
    "Thin stream of urine",
    "Slow stream of urine",
    "Reduced urine output",
    "Urinary incontinence",
    "Haematuria",
    "Renal colic",
    "Sexual dysfunction",
    "High coloured urine",
    "Urethral discharge",
    "Urinary symptoms",
    "Frequency of urination",
    "Burning/painful micturition",
    "Urinary urgency",
    "Urinary hesitancy",
    "Urinary dribbling",
    "Urinary overflow",
  ],
  [
    "Cough",
    "Asthma diagnosed",
    "Tuberculosis diagnosed",
    "COPD diagnosed",
    "Emphysema diagnosed",
    "Breathing difficulty",
  ],
  [
    "Immunisation",
    "Jaundice in children",
    "Epilepsy in children",
    "Bed wetting",
    "Child not gaining weight",
    "Diarrhea / loose motion",
    "vomiting",
    "Fever in children",
  ],
  [
    "Lump",
    "Swelling in private parts",
    "Bleeding from anus",
    "Pain around anal region",
    "Breast lump",
    "Varicose Veins",
  ],
  [
    "Gum Swelling",
    "Halitosis",
    "Coated tongue",
    "Fissured tongue",
    "Black tongue",
    "Tongue ulcers",
    "Leukoplakia",
    "Mouth ulcers",
  ],
];

const choices = options
  .map((o, i: number) => {
    return o.map((l: string) => ({
      label: l,
      value: `${i}::${l}`,
    }));
  })
  .reduce((a, c) => a.concat(c), [])
  .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

function TriageForm() {
  return (
    <div className="questionForm">
      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: "short-text",
              id: "patientName",
              attributes: {
                required: true,
                label: "Guest's name",
              },
            },
            {
              name: "number",
              id: "patientAge",
              attributes: {
                required: true,
                label: "{{field:patientName}}'s age?",
              },
            },
            {
              name: "multiple-choice",
              id: "patientGender",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "{{field:patientName}}'s gender?",
                choices: [
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ],
              },
            },
            {
              name: "multiple-choice",
              id: "status",
              attributes: {
                required: true,
                multiple: false,
                verticalAlign: false,
                label: "{{field:patientName}}'s status?",
                choices: [
                  {
                    label: "Emergency",
                    value: "emergency",
                  },
                  {
                    label: "Non Emergency",
                    value: "nonemergency",
                  },
                ],
              },
            },
            {
              name: "dropdown",
              id: "symptom",
              attributes: {
                required: true,
                label: "Please select the sympton",
                choices,
              },
            },
          ],
        }}
        onSubmit={({ answers }, { completeForm }) => {
          const status = answers.status.value[0];
          const symptom =
            parseInt(answers.symptom.value.split("::")[0], 10) + 1;
          const name = answers.patientName.value;
          // Complete form
          completeForm();
          if (status === "nonemergency" && symptom && name) {
            Router.push(`/department?name=${name}&option=${symptom}`);
          }
        }}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(TriageForm), {
  ssr: false,
});
