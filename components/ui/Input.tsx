type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  required?: boolean
}

export function Input({ label, type = 'text', placeholder, name, id, required }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-small font-semibold text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="px-4 py-2 rounded-md border border-border bg-surface text-foreground placeholder:text-muted text-body focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  )
}
