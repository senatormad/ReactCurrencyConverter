import chroma from "chroma-js";

export const colourStyles = {
    control: styles => ({
        ...styles,
        backgroundColor: 'white',
        '&:hover': { borderColor: '#44318D' },
        border: '1px solid lightgray',
        boxShadow: 'none',
    }),
    option: (styles, { isDisabled, isFocused, isOptionSelected }) => {
        const bgColor = chroma('#44318D')
        return {
            ...styles,
            backgroundColor: isOptionSelected
                ? null
                : isOptionSelected
                    ? bgColor.css()
                    : isFocused
                        ? bgColor.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? '#ccc'
                : isOptionSelected
                    ? chroma.contrast(bgColor, 'white') > 2
                        ? 'white'
                        : 'black'
                    : bgColor,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isOptionSelected ? bgColor : bgColor.alpha(0.3).css()),
            },
        };
    },
    input: styles => ({ ...styles }),
    placeholder: styles => ({ ...styles }),
    singleValue: (styles, { data }) => ({ ...styles }),
};
