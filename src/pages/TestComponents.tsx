import SelectField from "@/components/formity/fields/select-field";

const SelectDemo = () => {

  return (
    <div className="flex gap-4">
      <SelectField
        key={1}
        placeholder="Select an option"
        endpoint="https://mis.alfapcsmax.com/admtramites/public/api/puestos"
        fetchConfig={
          {
            responseKey: 'data',
            labelKey: 'nombre',
            valueKey: 'id',
          }
        }
      />
    </div>
  )
}

export default SelectDemo;