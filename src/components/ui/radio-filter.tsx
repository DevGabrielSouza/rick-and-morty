'use client'

interface RadioFilterProps {
    id: string
    name: string
    value: string
    label: string
    form: any
    checked?: boolean
}

export function RadioFilter({
    id,
    name,
    value,
    label,
    form,
    checked,
}: RadioFilterProps) {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                defaultChecked={checked}
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
    )
}
