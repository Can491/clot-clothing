import React from 'react';

import { GroupContainer, FormInputContainer, FormInputLabel } from "./form-input.styles";


/*label这个属性并不是input标签所有的，整个FormInput component包含了input和label两个标签
如果程序员在frominput植入了label就会有相应的效果，否则只是一个reusable的input标签 */
export const FormInput = ({ handleChange, label, ...otherProps }) => (
    <GroupContainer>
        <FormInputContainer onChange={handleChange} {...otherProps} />
        {
            label ?
                (<FormInputLabel className={otherProps.value.length ? 'shrink' : ''} >
                    {label}
                </FormInputLabel>) :
                null
        }
    </GroupContainer>
    //判断label是否存在(是否植入),如果有就会相应的form-input-label的scss效果，如果有输入值，会有shrink效果
)