const SomeText = () => {
  return (
    <div className="grid gap-2.5">
      <h1 className="bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent">
        UHI - Hackathon
      </h1>
      <p className="text-sm text-gray-500">
        <strong>
          Challenge 4: Enable Triaging and Clinical Support Systems:
        </strong>
        The objective of this challenge is to build:
        <ul>
          <li>A tool which enables triaging based on symptoms entered</li>
          <li>
            A tool which analyses structured records and provides insights and
            suggestions
          </li>
        </ul>
      </p>
    </div>
  );
};

export default SomeText;
