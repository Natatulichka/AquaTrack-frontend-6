const Icon = ({ id, width, height, className = '', fillColor }) => {
    return (
        <svg
            className={`${className}`}
            style={{ bacground: 'transparent' }}
            width={width}
            height={height}
            aria-hidden='true'
        >
            <use
                style={{ fill: `${fillColor}` }}
                href={`/sprite.svh#icon-${id}`}
            ></use>
        </svg>
    );
};

export default Icon;