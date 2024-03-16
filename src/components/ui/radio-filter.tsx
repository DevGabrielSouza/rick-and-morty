"use client";

interface RadioFilterProps {
  id: string;
  name: string;
  label: string;
  form: any;
}

export function RadioFilter({ id, name, label, form }: RadioFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={id}
        {...form.register(name)}
        className="peer h-4 w-4 border-gray-300 rounded text-sky-500 focus:ring-sky-500"
      />

      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
