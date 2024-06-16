import { Box, Button, Tab, Tabs } from "@mui/material";
import { ResumeDefinition, SkillsHierarchical } from "@types";
import { useState } from "react";
import CreateSection from "./CreateSection";
import CustomTabPanel from "./CustomTabPanel";

type WithSectionsProps = {
    content: SkillsHierarchical;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const WithSections = ({ content, setCurrentResume }: WithSectionsProps) => {
    const [isSectionModalOpened, setIsSectionModalOpened] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

    return (
        <>
        {isSectionModalOpened && <CreateSection setTabValue={setTabValue} setCurrentResume={setCurrentResume} isModalOpened={isSectionModalOpened} setIsModalOpened={setIsSectionModalOpened} />}
        
        <Button sx={{ marginTop: '20px' }} variant='contained' color="info" onClick={() => setIsSectionModalOpened(true)}>{'Create new section'}</Button>
        <Box sx={{ borderColor: 'divider', borderBottom: 1, marginTop: '20px'}}>
            <Tabs value={tabValue} onChange={handleChange}>
                {
                content && Object.keys(content).map((section, index) => {
                        return (
                            <Tab key={index} label={section} />
                        )
                    })
                }
            </Tabs>
        </Box>
        {Object.keys(content).map((section, index) => {
            return (
                <CustomTabPanel section={section} key={index} skills={content[section]} setCurrentResume={setCurrentResume} index={index} value={tabValue} />
            )
        })}
        </>
    )
}

export default WithSections;