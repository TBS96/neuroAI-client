import React from 'react'

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-green-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`btn btn-soft transition-all duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}