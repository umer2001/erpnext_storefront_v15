import { useSelect } from "@refinedev/core";
import Select from "react-select";
import { Input } from "./ui/input";

type CountrySelectProps = {
  name: string;
  onChange: (value: any) => void;
  value: any;
};

const CountrySelect: React.FC<CountrySelectProps> = ({
  name,
  onChange,
  value,
  ...props
}) => {
  const { options, onSearch, overtime } = useSelect({
    resource: "Country",
    dataProviderName: "frappeeProvider",
    optionLabel: "name",
    optionValue: "name",
    searchField: "name",
    overtimeOptions: {
      interval: 100,
    },
  });

  return (
    <Select
      classNamePrefix="select"
      placeholder="Country"
      isLoading={overtime.elapsedTime !== undefined}
      loadingMessage={() =>
        options.length === 0 ? "No results" : "Loading..."
      }
      value={
        value === undefined
          ? ""
          : options.find((option) => option.value === value) ?? {
              value: value,
              label: value,
            }
      }
      options={options}
      onInputChange={onSearch}
      onChange={onChange}
      name={name}
      {...props}
    />
  );
};

export default CountrySelect;
