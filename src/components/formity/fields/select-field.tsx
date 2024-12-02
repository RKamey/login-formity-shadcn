import * as React from "react";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroupConfig {
  label?: string
  options: SelectOption[]
}

interface FetchConfig {
  responseKey?: string
  labelKey?: string
  valueKey?: string
}

interface SelectFieldProps {
  placeholder?: string
  className?: string
  width?: string
  staticOptions?: SelectOption[] | SelectGroupConfig[]
  fetchOptions?: () => Promise<unknown>
  endpoint?: string
  fetchConfig?: FetchConfig
  onValueChange?: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  disabled?: boolean
}

/**
 * Custom select component with support for fetching options from an API.
 * 
 * @param {string} [placeholder="Select an option"] - Placeholder text for the select.
 * @param {string} [className] - Additional CSS or Tailwind classes to apply to the select.
 * @param {string} [width="w-[180px]"] - Width of the select (e.g., Tailwind classes or CSS styles).
 * @param {SelectOption[] | SelectGroupConfig[]} [staticOptions=[]] - Static options to display in the select.
 * @param {() => Promise<unknown>} [fetchOptions] - Function to fetch options from an API.
 * @param {string} [endpoint] - API endpoint to fetch options from.
 * @param {FetchConfig} [fetchConfig] - Configuration object for fetching options, including keys for mapping response data.
 * @param {(value: string | string[]) => void} [onValueChange] - Callback function triggered when the selected value changes.
 * @param {boolean} [multiple=false] - Whether the select should allow multiple selections.
 * @param {boolean} [searchable=false] - Whether the select should allow searching within options.
 * @param {boolean} [disabled=false] - Whether the select should be disabled.
 * @returns {React.ReactElement} - The custom select component.
 * 
 * @example
 * <SelectField
 *   placeholder="Select an option"
 *   endpoint="https://api.example.com/options"
 *   fetchConfig={{
 *     responseKey: 'data',
 *     labelKey: 'name',
 *     valueKey: 'id',
 *   }}
 *   onValueChange={(value) => console.log(value)}
 * />
*/
export default function SelectField({
  placeholder = "Select an option",
  className,
  width = "w-[180px]",
  staticOptions = [],
  fetchOptions,
  endpoint,
  fetchConfig = {
    responseKey: 'data',
    labelKey: 'label',
    valueKey: 'value',
  },
  onValueChange,
  multiple = false,
  searchable = false,
  disabled = false
}: SelectFieldProps): React.ReactElement {
  const [options, setOptions] = useState<SelectOption[] | SelectGroupConfig[]>(staticOptions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // ----[ Effects ]----

  // Fetch options logic
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true)
        let fetchedOptions: SelectOption[] = [];

        if (endpoint) {
          try {
            const response: AxiosResponse = await axios.get(endpoint)

            const responseData = fetchConfig.responseKey && response.data
              ? (response.data as Record<string, unknown>)[fetchConfig.responseKey] ?? response.data
              : response.data;

            fetchedOptions = mapFetchedDataToOptions(responseData);
          } catch (err) {
            setError('Failed to fetch options')
            console.error(err)
          }
        } else if (fetchOptions) {
          try {
            const data = await fetchOptions()
            fetchedOptions = mapFetchedDataToOptions(data)
          } catch (err) {
            setError('Failed to fetch options')
            console.error(err)
          }
        } else {
          return
        }

        if (fetchedOptions.length > 0) {
          setOptions(fetchedOptions)
        }
      } catch (err) {
        setError('Failed to fetch options')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (endpoint || fetchOptions) {
      loadOptions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, fetchOptions, fetchConfig])

  const mapFetchedDataToOptions = (data: unknown): SelectOption[] => {
    try {
      // Handle case where data might be undefined or not an array
      if (!data) {
        console.warn('No data provided to mapFetchedDataToOptions');
        return [];
      }

      // Ensure data is an array
      const dataArray = Array.isArray(data) ? data : [data];

      return dataArray.map(item => {
        // Safely extract value and label
        const value = fetchConfig.valueKey 
          ? String(item[fetchConfig.valueKey] ?? item.id ?? item.value ?? '') 
          : String(item.id ?? item.value ?? '');

        const label = fetchConfig.labelKey 
          ? String(item[fetchConfig.labelKey] ?? item.name ?? item.label ?? value)
          : String(item.name ?? item.label ?? value);

        return { value, label };
      }).filter(option => option.value !== ''); // Remove empty options
    } catch (err) {
      console.error('Error in mapFetchedDataToOptions:', err);
      return [];
    }
  }

  // Flatten options for easier searching and processing
  const flattenedOptions = React.useMemo(() => {
    return options.flatMap(group => 
      'options' in group 
        ? group.options 
        : [group]
    )
  }, [options])

  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return flattenedOptions
    
    return flattenedOptions.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [flattenedOptions, searchTerm, searchable])

  // Handle value change
  const handleValueChange = (value: string) => {
    let newSelectedValues: string[]

    if (multiple) {
      // Toggle selection for multiple select
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
    } else {
      newSelectedValues = [value]
    }

    setSelectedValues(newSelectedValues)

    // Call onValueChange if provided
    if (onValueChange) {
      onValueChange(multiple ? newSelectedValues : newSelectedValues[0])
    }
  }

  // Render options with search and multiple select support
  const renderOptions = () => {
    if (loading) return <SelectItem value="loading">Loading...</SelectItem>
    if (error) return <SelectItem value="error">{error}</SelectItem>

    // Searchable input
    const searchInput = searchable ? (
      <div className="p-2">
        <Input 
          placeholder="Search options..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
    ) : null

    // Render filtered and grouped options
    return (
      <>
        {searchInput}
        {filteredOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {multiple && (
              <input 
                type="checkbox" 
                checked={selectedValues.includes(option.value)}
                className="mr-2"
                readOnly
              />
            )}
            {option.label}
          </SelectItem>
        ))}
      </>
    )
  }

  return (
    <Select 
      disabled={disabled}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className={`${width} ${className}`}>
        <SelectValue placeholder={placeholder}>
          {multiple 
            ? selectedValues.length > 0 
              ? `${selectedValues.length} selected`
              : placeholder
            : undefined
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {renderOptions()}
      </SelectContent>
    </Select>
  )
}
