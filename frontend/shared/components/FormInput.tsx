import {ChangeEvent, FC} from "react";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {cn} from "@/lib/utils";

interface FormInputProps {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    nameHTML: string;
    labelText?: string;
    type: "email" | "password" | "number" | "text";
    className?: string;
}

export const FormInput: FC<FormInputProps> = (
    {
        value,
        onChange,
        nameHTML,
        labelText,
        type = "text",
        className
    }
) => {
    return <div className="flex row space-y-1">
        { labelText && <Label htmlFor={nameHTML}>{labelText}</Label>}
        <Input onChange={onChange} type={type} name={nameHTML} className={cn("bg-background",className)} value={value} />
    </div>
}