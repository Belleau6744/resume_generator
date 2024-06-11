import { Button } from "@mui/material";

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SelectTemplateButton = ({ onClick }: Props) => {

    const handleOnClick = (e) => {
        onClick(e);
    }

    return (
        <Button 
            variant='contained' 
            onClick={handleOnClick}
            sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            }} 
            size='large' 
        >Select Tempalte</Button>
    )
}

export default SelectTemplateButton;