interface Props {
  label?: string
  className?: string
}

export function ImgPlaceholder({ label, className = '' }: Props) {
  return (
    <div
      className={`bg-gray-200 flex items-center justify-center text-gray-400 text-sm text-center p-4 ${className}`}
    >
      {label && <span className="max-w-[180px] leading-snug">{label}</span>}
    </div>
  )
}
