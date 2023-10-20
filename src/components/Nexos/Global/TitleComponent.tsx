type Title = {
    title?: string,
    align?: string,
    subtitle?: string,
    description?: string,
}
export const TitleComponent = ({ title = "", align = 'left', subtitle = "", description = "" }: Title) => {
    return (
        <>
            <div className={`mt-4 mb-3 text-${align}`}>
                {title && (
                    <h2 className="text-uppercase p-0 m-0 fw-bold" >{title}</h2>
                )}
                {subtitle && (
                    <h4 className={`text-${align} text-uppercase`} >{subtitle}</h4>
                )}
                {description && (
                    <p className={`text-${align} text-uppercase`} >{description}</p>
                )}
            </div>
        </>
    )
}