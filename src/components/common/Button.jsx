import React from 'react'

export default function Button({
    children,
    type = 'button',
    className = '',
    ...props
}) {
    return (
        <button className={`btn btn-soft transition-all duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}