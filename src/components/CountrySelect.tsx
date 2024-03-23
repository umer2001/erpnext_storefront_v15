import { useSelect } from "@refinedev/core";
import Select from "react-select";

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
      isLoading={overtime.elapsedTime !== undefined}
      loadingMessage={() =>
        options.length === 0 ? "No results" : "Loading..."
      }
      value={options.find((option) => option.value === value)}
      options={options}
      onInputChange={onSearch}
      onChange={onChange}
      name={name}
      {...props}
    />
  );
};

export default CountrySelect;
